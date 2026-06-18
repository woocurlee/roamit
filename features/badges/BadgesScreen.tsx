"use client";

import { useRouter } from "next/navigation";
import { ChevronLeft } from "lucide-react";
import { badges } from "@/mock/badges";

export function BadgesScreen() {
  const router = useRouter();
  const acquired = badges.filter((b) => !b.locked);
  const locked = badges.filter((b) => b.locked);

  return (
    <div className="space-y-4 py-4">
      <div className="flex items-center gap-3">
        <button
          onClick={() => router.back()}
          className="flex h-8 w-8 items-center justify-center rounded-full bg-[#F2F2F7] text-[#3182F6] dark:bg-[#2C2C2E]"
        >
          <ChevronLeft size={18} />
        </button>
        <h1 className="text-[22px] font-bold">뱃지</h1>
      </div>

      <div className="rounded-2xl bg-white px-4 py-3 shadow-sm dark:bg-[#1C1C1E]">
        <p className="text-[14px] text-[#8E8E93]">
          <span className="font-semibold text-[#1C1C1E] dark:text-white">{acquired.length}개</span> 획득 ·{" "}
          <span className="font-semibold text-[#1C1C1E] dark:text-white">{locked.length}개</span> 미획득
        </p>
      </div>

      {/* Acquired */}
      <div className="rounded-3xl bg-white shadow-sm dark:bg-[#1C1C1E]">
        <div className="px-4 pt-4 pb-3">
          <span className="text-[13px] font-semibold text-[#8E8E93]">획득 완료</span>
        </div>
        <div className="grid grid-cols-3 gap-4 px-4 pb-4">
          {acquired.map(({ id, label, desc, icon: Icon, color, bg }) => (
            <div key={id} className="flex flex-col items-center gap-2 text-center">
              <div
                className="flex h-16 w-16 items-center justify-center rounded-2xl"
                style={{ background: bg }}
              >
                <Icon size={28} style={{ color }} />
              </div>
              <div>
                <p className="text-[13px] font-semibold">{label}</p>
                <p className="mt-0.5 text-[11px] text-[#8E8E93]">{desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Locked */}
      <div className="rounded-3xl bg-white shadow-sm dark:bg-[#1C1C1E]">
        <div className="px-4 pt-4 pb-3">
          <span className="text-[13px] font-semibold text-[#8E8E93]">미획득</span>
        </div>
        <div className="grid grid-cols-3 gap-4 px-4 pb-4">
          {locked.map(({ id, label, desc, icon: Icon, hidden }) => (
            <div key={id} className="flex flex-col items-center gap-2 text-center opacity-35">
              <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-[#F2F2F7] dark:bg-[#2C2C2E]">
                <Icon size={28} className="text-[#8E8E93]" />
              </div>
              <div>
                <p className="text-[13px] font-semibold">{label}</p>
                <p className="mt-0.5 text-[11px] text-[#8E8E93]">{hidden ? "???" : desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
