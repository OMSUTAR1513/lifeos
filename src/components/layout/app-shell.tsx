"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { BarChart3, CreditCard, LayoutDashboard, Menu, Settings, Sparkles, Subtitles, X } from "lucide-react";
import { useState } from "react";
import { cn } from "@/lib/utils";
import { UserMenu } from "./user-menu";

const navItems = [
  { href: "/", label: "Dashboard", icon: LayoutDashboard },
  { href: "/expenses", label: "Expenses", icon: CreditCard },
  { href: "/subscriptions", label: "Subscriptions", icon: Subtitles },
  { href: "/insights", label: "Insights", icon: Sparkles },
  { href: "/settings", label: "Settings", icon: Settings },
];

export function AppShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <div className="min-h-screen bg-[radial-gradient(circle_at_top_left,_rgba(99,102,241,0.16),_transparent_32%),linear-gradient(135deg,_#f8faff_0%,_#f3f6ff_100%)] text-slate-900">
      <div className="mx-auto flex min-h-screen max-w-7xl flex-col px-4 py-4 sm:px-6 lg:px-8">
        <header className="mb-4 rounded-3xl border border-slate-200/70 bg-white/80 px-4 py-3 shadow-sm backdrop-blur xl:hidden">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-semibold text-slate-900">LifeOS</p>
              <p className="text-xs text-slate-500">Personal finance command center</p>
            </div>
            <div className="flex items-center gap-2">
              <UserMenu />
              <button
                type="button"
                onClick={() => setMobileMenuOpen((open) => !open)}
                className="rounded-full border border-slate-200 bg-slate-50 p-2 text-slate-700"
                aria-label="Toggle navigation"
              >
                {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
              </button>
            </div>
          </div>
          {mobileMenuOpen ? (
            <nav className="mt-4 space-y-1">
              {navItems.map((item) => {
                const Icon = item.icon;
                const isActive = pathname === item.href;

                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={cn(
                      "flex items-center gap-3 rounded-2xl px-3 py-2 text-sm font-medium transition",
                      isActive
                        ? "bg-slate-900 text-white shadow-sm"
                        : "text-slate-600 hover:bg-slate-100 hover:text-slate-900"
                    )}
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    <Icon className="h-4 w-4" />
                    {item.label}
                  </Link>
                );
              })}
            </nav>
          ) : null}
        </header>

        <div className="flex flex-1 gap-4 lg:gap-6">
          <aside className="hidden w-72 shrink-0 rounded-[28px] border border-slate-200/70 bg-white/70 p-5 shadow-[0_24px_80px_-32px_rgba(15,23,42,0.25)] backdrop-blur xl:flex xl:flex-col">
            <div className="mb-8 flex items-center justify-between gap-3">
              <div className="flex items-center gap-3">
                <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-slate-900 text-white">
                  <BarChart3 className="h-5 w-5" />
                </div>
                <div>
                  <p className="text-lg font-semibold text-slate-900">LifeOS</p>
                  <p className="text-sm text-slate-500">AI finance overview</p>
                </div>
              </div>
              <UserMenu />
            </div>

            <nav className="space-y-1">
              {navItems.map((item) => {
                const Icon = item.icon;
                const isActive = pathname === item.href;

                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={cn(
                      "flex items-center gap-3 rounded-2xl px-3 py-3 text-sm font-medium transition",
                      isActive
                        ? "bg-slate-900 text-white shadow-sm"
                        : "text-slate-600 hover:bg-slate-100 hover:text-slate-900"
                    )}
                  >
                    <Icon className="h-4 w-4" />
                    {item.label}
                  </Link>
                );
              })}
            </nav>

            <div className="mt-auto rounded-3xl border border-slate-200 bg-slate-950 p-4 text-white">
              <p className="text-sm font-semibold">Next up</p>
              <p className="mt-1 text-sm text-slate-300">Receipt scanning and smart insights are on the roadmap.</p>
            </div>
          </aside>

          <main className="flex-1 rounded-[32px] border border-slate-200/70 bg-white/80 p-4 shadow-[0_24px_80px_-32px_rgba(15,23,42,0.2)] backdrop-blur sm:p-6 lg:p-8">
            {children}
          </main>
        </div>
      </div>
    </div>
  );
}
