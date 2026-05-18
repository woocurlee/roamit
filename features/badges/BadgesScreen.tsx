"use client";

import { useRouter } from "next/navigation";
import { ChevronLeft } from "lucide-react";
import { badges } from "@/mock/badges";

export function BadgesScreen() {
  const router = useRouter();
  const acquired = badges.filter((b) => !b.locked);
  const locked = badges.filter((b) => b.locked);

  return (
    <div>
      <div className="mb-6 flex items-center gap-3">
        <button
          onClick={() => router.back()}
          className="rounded-full bg-black/5 p-2 text-slate-500 transition hover:bg-black/10 dark:bg-white/10 dark:text-white/55 dark:hover:bg-white/15"
        >
          <ChevronLeft size={18} />
        </button>
        <h1 className="text-2xl font-bold">획득한 뱃지</h1>
      </div>

      <p className="mb-8 text-sm text-slate-500 dark:text-white/50">
        <span className="font-semibold text-slate-900 dark:text-white">{acquired.length}개</span> 획득 ·{" "}
        <span className="font-semibold text-slate-900 dark:text-white">{locked.length}개</span> 미획득
      </p>

      {/* Acquired */}
      <section className="mb-10">
        <h2 className="mb-4 text-sm font-semibold uppercase tracking-widest text-slate-400 dark:text-white/40">
          획득 완료
        </h2>
        <div className="grid grid-cols-2 gap-3 md:grid-cols-4">
          {acquired.map(({ id, label, desc, icon: Icon, color, bg }) => (
            <div
              key={id}
              className="flex flex-col items-center rounded-2xl border border-black/5 bg-white/60 p-4 text-center backdrop-blur-xl transition-all duration-300 dark:border-white/5 dark:bg-[#1e2024]/60"
            >
              <div
                className="mb-3 flex h-14 w-14 items-center justify-center rounded-full"
                style={{ background: bg }}
              >
                <Icon size={26} style={{ color }} />
              </div>
              <span className="text-sm font-semibold text-slate-900 dark:text-white">{label}</span>
              <span className="mt-1 text-[10px] text-slate-400 dark:text-white/40">{desc}</span>
            </div>
          ))}
        </div>
      </section>

      {/* Locked */}
      <section>
        <h2 className="mb-4 text-sm font-semibold uppercase tracking-widest text-slate-400 dark:text-white/40">
          미획득
        </h2>
        <div className="grid grid-cols-2 gap-3 md:grid-cols-4">
          {locked.map(({ id, label, desc, icon: Icon, hidden }) => (
            <div
              key={id}
              className="flex flex-col items-center rounded-2xl border border-black/5 bg-white/60 p-4 text-center opacity-40 grayscale backdrop-blur-xl dark:border-white/5 dark:bg-[#1e2024]/60"
            >
              <div className="mb-3 flex h-14 w-14 items-center justify-center rounded-full bg-black/5 dark:bg-white/5">
                <Icon size={26} className="text-slate-400 dark:text-white/40" />
              </div>
              <span className="text-sm font-semibold text-slate-900 dark:text-white">{label}</span>
              <span className="mt-1 text-[10px] text-slate-400 dark:text-white/40">
                {hidden ? "???" : desc}
              </span>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
