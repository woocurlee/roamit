"use client";

import type { ReactNode } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ThemeToggle } from "@/components/ThemeToggle";
import { tabs } from "@/mock/config";

type Props = {
  children: ReactNode;
};

export function AppShell({ children }: Props) {
  const pathname = usePathname();

  return (
    <div className="min-h-screen bg-[#F7F8FC] text-slate-900 dark:bg-[#090B12] dark:text-white">
      <div className="fixed inset-0 overflow-hidden">
        <div className="absolute -left-24 -top-24 h-72 w-72 rounded-full bg-emerald-500/10 blur-3xl dark:bg-emerald-500/20" />
        <div className="absolute right-[-80px] top-40 h-72 w-72 rounded-full bg-sky-500/8 blur-3xl dark:bg-sky-500/15" />
        <div className="absolute bottom-0 left-1/3 h-72 w-72 rounded-full bg-purple-500/8 blur-3xl dark:bg-purple-500/10" />
      </div>

      <div className="fixed right-5 top-5 z-50">
        <ThemeToggle />
      </div>

      <main className="relative mx-auto min-h-screen max-w-md px-5 pb-28 pt-6">
        {children}
      </main>

      <nav className="fixed bottom-4 left-1/2 z-50 w-[calc(100%-32px)] max-w-md -translate-x-1/2 rounded-3xl border border-black/8 bg-white/85 px-2 py-2 shadow-2xl backdrop-blur-xl dark:border-white/10 dark:bg-black/60">
        <div className="grid grid-cols-5 gap-1">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            const active = pathname === tab.href;
            return (
              <Link
                key={tab.key}
                href={tab.href}
                className={`flex flex-col items-center justify-center rounded-2xl py-2 text-[11px] transition ${
                  active
                    ? "bg-slate-900 text-white dark:bg-white dark:text-black"
                    : "text-slate-500 hover:bg-black/5 hover:text-slate-900 dark:text-white/55 dark:hover:bg-white/10 dark:hover:text-white"
                }`}
              >
                <Icon size={18} />
                <span className="mt-1">{tab.label}</span>
              </Link>
            );
          })}
        </div>
      </nav>
    </div>
  );
}
