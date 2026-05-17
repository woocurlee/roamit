"use client";

import { ExplorationCard } from "@/components/ExplorationCard";
import { useApp } from "@/context/AppContext";

export function LogsScreen() {
  const { explorations } = useApp();

  return (
    <div>
      <h1 className="text-2xl font-bold">탐험 기록</h1>
      <p className="mt-2 text-sm text-slate-500 dark:text-white/55">역마다 남긴 장소 리뷰와 개인 여행 일지</p>
      <div className="mt-6 space-y-4">
        {explorations.map((e) => (
          <ExplorationCard key={e.id} exploration={e} />
        ))}
      </div>
    </div>
  );
}
