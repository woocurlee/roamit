"use client";

import type { ReactNode } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Train } from "lucide-react";
import { ThemeToggle } from "@/components/ThemeToggle";
import { tabs } from "@/mock/config";

type Props = {
  children: ReactNode;
};

export function AppShell({ children }: Props) {
  const pathname = usePathname();

  return (
    <div className="min-h-screen bg-[#F2F2F7] text-[#1C1C1E] dark:bg-black dark:text-white">
      <header className="fixed left-0 right-0 top-0 z-50 flex h-14 items-center justify-between border-b border-[#C6C6C8]/60 bg-[#F2F2F7]/90 px-4 backdrop-blur-xl dark:border-[#38383A] dark:bg-black/90">
        <Link href="/" className="flex items-center gap-2">
          <Train size={18} className="text-[#3182F6]" />
          <span className="text-[17px] font-bold tracking-tight text-[#3182F6]">Roamit</span>
        </Link>
        <ThemeToggle />
      </header>

      <main className="relative mx-auto min-h-screen max-w-lg px-4 pb-24 pt-14">
        {children}
      </main>

      <nav className="fixed bottom-0 left-0 right-0 z-50 border-t border-[#C6C6C8]/60 bg-[#F2F2F7]/90 backdrop-blur-xl dark:border-[#38383A] dark:bg-black/90">
        <div className="mx-auto flex max-w-lg">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            const active = pathname === tab.href;
            return (
              <Link
                key={tab.key}
                href={tab.href}
                className={`flex flex-1 flex-col items-center justify-center gap-0.5 py-2 transition-colors ${
                  active ? "text-[#3182F6]" : "text-[#8E8E93]"
                }`}
              >
                <Icon size={22} strokeWidth={active ? 2.5 : 1.5} />
                <span className={`text-[10px] ${active ? "font-semibold" : "font-medium"}`}>{tab.label}</span>
              </Link>
            );
          })}
        </div>
        <div className="h-[env(safe-area-inset-bottom)]" />
      </nav>
    </div>
  );
}
