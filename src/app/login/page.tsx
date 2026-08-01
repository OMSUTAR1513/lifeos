import { redirect } from "next/navigation";
import { LoginForm } from "@/components/auth/login-form";
import { auth } from "@/lib/auth";

export default async function LoginPage() {
  const session = await auth();

  if (session) {
    redirect("/");
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-[radial-gradient(circle_at_top_left,_rgba(99,102,241,0.2),_transparent_34%),linear-gradient(135deg,_#f8faff_0%,_#f3f6ff_100%)] px-4 py-10">
      <div className="w-full max-w-md rounded-[28px] border border-slate-200 bg-white p-8 shadow-[0_24px_80px_-32px_rgba(15,23,42,0.25)]">
        <div className="mb-6">
          <p className="text-sm font-semibold uppercase tracking-[0.24em] text-indigo-600">LifeOS</p>
          <h1 className="mt-2 text-3xl font-semibold text-slate-900">Welcome back</h1>
          <p className="mt-2 text-sm text-slate-600">Sign in to continue managing your life admin in one place.</p>
        </div>
        <LoginForm />
      </div>
    </div>
  );
}
