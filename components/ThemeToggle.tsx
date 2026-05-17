"use client";

import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";

export function ThemeToggle() {
  const { theme, setTheme } = useTheme();

  return (
    <button
      onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
      className="rounded-full border border-black/10 bg-black/5 p-2 text-slate-600 transition hover:bg-black/10 dark:border-white/10 dark:bg-white/10 dark:text-white/70 dark:hover:bg-white/15"
      aria-label="테마 변경"
    >
      <Sun size={16} className="hidden dark:block" />
      <Moon size={16} className="block dark:hidden" />
    </button>
  );
}
