"use client";

import { ExplorationCard } from "@/components/ExplorationCard";
import { useApp } from "@/context/AppContext";

export function LogsScreen() {
  const { explorations } = useApp();

  return (
    <div className="space-y-4 py-4">
      <div>
        <h1 className="text-[22px] font-bold">탐험 기록</h1>
        <p className="mt-1 text-[14px] text-[#8E8E93]">역마다 남긴 장소 리뷰와 여행 일지</p>
      </div>
      <div className="space-y-3">
        {explorations.map((e) => (
          <ExplorationCard key={e.id} exploration={e} />
        ))}
        {explorations.length === 0 && (
          <div className="rounded-3xl bg-white py-12 text-center shadow-sm dark:bg-[#1C1C1E]">
            <p className="text-[14px] text-[#8E8E93]">아직 탐험 기록이 없어요</p>
          </div>
        )}
      </div>
    </div>
  );
}
