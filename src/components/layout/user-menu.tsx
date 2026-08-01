"use client";

import Link from "next/link";
import { ChevronDown, LogOut, User } from "lucide-react";
import { useState } from "react";
import { useRouter } from "next/navigation";

export function UserMenu() {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [userName, setUserName] = useState("User");
  const [userEmail, setUserEmail] = useState("");

  useState(() => {
    const sessionUser = document.cookie
      .split(";")
      .map((item) => item.trim())
      .find((item) => item.startsWith("lifeos-session="));

    if (sessionUser) {
      const payload = sessionUser.split("=")[1];
      if (payload) {
        const raw = atob(payload);
        try {
          const parsed = JSON.parse(raw);
          setUserName(parsed.name || parsed.email || "User");
          setUserEmail(parsed.email || "");
        } catch {
          setUserName("User");
        }
      }
    }
  });

  return (
    <div className="relative">
      <button
        type="button"
        onClick={() => setOpen((value) => !value)}
        className="flex items-center gap-2 rounded-full border border-slate-200 bg-white px-3 py-2 text-sm font-medium text-slate-700 shadow-sm"
      >
        <div className="flex h-8 w-8 items-center justify-center rounded-full bg-slate-900 text-white">
          <User className="h-4 w-4" />
        </div>
        <span className="hidden sm:inline">{userName}</span>
        <ChevronDown className="h-4 w-4" />
      </button>

      {open ? (
        <div className="absolute right-0 mt-2 w-48 rounded-2xl border border-slate-200 bg-white p-2 shadow-lg">
          <div className="rounded-xl bg-slate-50 px-3 py-2 text-sm text-slate-600">
            <p className="font-medium text-slate-900">{userName}</p>
            <p className="truncate">{userEmail}</p>
          </div>
          <Link
            href="/settings"
            className="mt-2 flex items-center gap-2 rounded-xl px-3 py-2 text-sm text-slate-700 hover:bg-slate-100"
            onClick={() => setOpen(false)}
          >
            <User className="h-4 w-4" />
            Profile
          </Link>
          <button
            type="button"
            onClick={async () => {
              await fetch("/api/logout", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({}) });
              document.cookie = "lifeos-session=; path=/; max-age=0";
              router.replace("/login");
            }}
            className="flex w-full items-center gap-2 rounded-xl px-3 py-2 text-left text-sm text-slate-700 hover:bg-slate-100"
          >
            <LogOut className="h-4 w-4" />
            Logout
          </button>
        </div>
      ) : null}
    </div>
  );
}
