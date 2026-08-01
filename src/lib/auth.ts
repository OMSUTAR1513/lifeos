import { createHmac, randomUUID, timingSafeEqual } from "crypto";
import { mkdir, readFile, writeFile } from "fs/promises";
import { cookies } from "next/headers";
import path from "path";
import bcrypt from "bcryptjs";

export const runtime = "nodejs";

const dataDirectory = path.join(process.cwd(), "src", "data");
const usersFilePath = path.join(dataDirectory, "users.json");
const sessionsFilePath = path.join(dataDirectory, "sessions.json");
const SESSION_DURATION_MS = 1000 * 60 * 60 * 24 * 7;
const AUTH_SECRET = process.env.AUTH_SECRET || "dev-secret-change-me";

type UserRecord = {
  id: string;
  name: string;
  email: string;
  password: string;
};

type SessionRecord = {
  id: string;
  userId: string;
  expiresAt: number;
};

export type SessionUser = {
  id: string;
  name: string;
  email: string;
};

async function readJsonFile<T>(filePath: string, fallback: T): Promise<T> {
  try {
    const file = await readFile(filePath, "utf8");
    return JSON.parse(file) as T;
  } catch {
    return fallback;
  }
}

async function writeJsonFile(filePath: string, data: unknown) {
  await mkdir(path.dirname(filePath), { recursive: true });
  await writeFile(filePath, JSON.stringify(data, null, 2));
}

function createSignedToken(value: string) {
  const signature = createHmac("sha256", AUTH_SECRET).update(value).digest("hex");
  return `${value}.${signature}`;
}

function verifySignedToken(token: string) {
  const separatorIndex = token.lastIndexOf(".");

  if (separatorIndex === -1) {
    return null;
  }

  const value = token.slice(0, separatorIndex);
  const incomingSignature = token.slice(separatorIndex + 1);
  const expectedSignature = createHmac("sha256", AUTH_SECRET).update(value).digest("hex");

  if (incomingSignature.length !== expectedSignature.length) {
    return null;
  }

  const incomingBuffer = Buffer.from(incomingSignature);
  const expectedBuffer = Buffer.from(expectedSignature);

  return timingSafeEqual(incomingBuffer, expectedBuffer) ? value : null;
}

async function getUsers(): Promise<UserRecord[]> {
  return readJsonFile<UserRecord[]>(usersFilePath, []);
}

async function saveUsers(users: UserRecord[]) {
  await writeJsonFile(usersFilePath, users);
}

async function getSessions(): Promise<SessionRecord[]> {
  return readJsonFile<SessionRecord[]>(sessionsFilePath, []);
}

async function saveSessions(sessions: SessionRecord[]) {
  await writeJsonFile(sessionsFilePath, sessions);
}

export async function registerUser(name: string, email: string, password: string) {
  const users = await getUsers();
  const existing = users.find((item) => item.email.toLowerCase() === email.toLowerCase());

  if (existing) {
    throw new Error("User already exists");
  }

  const hashedPassword = await bcrypt.hash(password, 10);
  const newUser: UserRecord = {
    id: randomUUID(),
    name,
    email: email.toLowerCase(),
    password: hashedPassword,
  };

  users.push(newUser);
  await saveUsers(users);

  return { id: newUser.id, name: newUser.name, email: newUser.email };
}

export async function loginUser(email: string, password: string) {
  const users = await getUsers();
  const user = users.find((item) => item.email.toLowerCase() === email.toLowerCase());

  if (!user) {
    return null;
  }

  const isValidPassword = await bcrypt.compare(password, user.password);

  if (!isValidPassword) {
    return null;
  }

  const sessionId = randomUUID();
  const sessions = await getSessions();
  sessions.push({
    id: sessionId,
    userId: user.id,
    expiresAt: Date.now() + SESSION_DURATION_MS,
  });

  await saveSessions(sessions);

  return {
    user: { id: user.id, name: user.name, email: user.email },
    token: createSignedToken(sessionId),
  };
}

export async function auth() {
  const cookieStore = await cookies();
  const cookieValue = cookieStore.get("lifeos-session")?.value;

  if (!cookieValue) {
    return null;
  }

  const sessionId = verifySignedToken(cookieValue);

  if (!sessionId) {
    return null;
  }

  const sessions = await getSessions();
  const session = sessions.find((item) => item.id === sessionId);

  if (!session || session.expiresAt < Date.now()) {
    return null;
  }

  const users = await getUsers();
  const user = users.find((item) => item.id === session.userId);

  if (!user) {
    return null;
  }

  return { id: user.id, name: user.name, email: user.email } satisfies SessionUser;
}

export async function logoutSession(token?: string) {
  const cookieStore = await cookies();
  cookieStore.set("lifeos-session", "", {
    httpOnly: true,
    path: "/",
    maxAge: 0,
    sameSite: "lax",
  });

  if (!token) {
    return;
  }

  const sessionId = verifySignedToken(token);

  if (!sessionId) {
    return;
  }

  const sessions = await getSessions();
  const filteredSessions = sessions.filter((item) => item.id !== sessionId);
  await saveSessions(filteredSessions);
}

export async function setSessionCookie(token: string) {
  const cookieStore = await cookies();
  cookieStore.set("lifeos-session", token, {
    httpOnly: true,
    path: "/",
    maxAge: 60 * 60 * 24 * 7,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
  });
}
