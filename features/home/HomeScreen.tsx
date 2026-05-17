"use client";

import { useRouter } from "next/navigation";
import { ChevronRight, Shuffle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ExplorationCard } from "@/components/ExplorationCard";
import { StatCard } from "@/components/StatCard";
import { useApp } from "@/context/AppContext";

export function HomeScreen() {
  const router = useRouter();
  const { explorations } = useApp();
  const placeCount = explorations.reduce((sum, e) => sum + e.places.length, 0);

  return (
    <div>
      <div className="mb-6 flex items-center justify-between">
        <div>
          <div className="text-sm text-slate-500 dark:text-white/55">오늘도 새로운 동네로</div>
          <h1 className="mt-1 text-3xl font-bold tracking-tight">Roamit</h1>
        </div>
        <div className="rounded-full border border-black/10 bg-black/5 px-3 py-2 text-xs text-slate-600 dark:border-white/10 dark:bg-white/10 dark:text-white/70">
          서울 탐험
        </div>
      </div>

      <Card className="overflow-hidden border-black/8 bg-white text-slate-900 shadow-sm dark:border-white/10 dark:bg-white/10 dark:text-white dark:shadow-2xl">
        <CardContent className="relative p-6">
          <div className="absolute right-5 top-5 h-24 w-24 rounded-full border border-black/8 dark:border-white/10" />
          <div className="absolute right-12 top-12 h-36 w-36 rounded-full border border-black/5 dark:border-white/5" />
          <p className="text-sm text-emerald-600 dark:text-emerald-200">역을 뽑고, 근처 장소를 기록해보세요</p>
          <h2 className="mt-3 text-3xl font-bold leading-tight">
            낯선 역에서
            <br />
            오늘의 장소를 찾아요.
          </h2>
          <Button
            onClick={() => router.push("/random")}
            className="mt-7 h-12 w-full rounded-2xl bg-slate-900 text-white hover:bg-slate-800 dark:bg-white dark:text-black dark:hover:bg-white/90"
          >
            <Shuffle className="mr-2" size={18} /> 랜덤 역 뽑기
          </Button>
        </CardContent>
      </Card>

      <div className="mt-5 grid grid-cols-3 gap-3">
        <StatCard label="방문한 역" value="2" />
        <StatCard label="탐험 기록" value={explorations.length} />
        <StatCard label="장소 리뷰" value={placeCount} />
      </div>

      <div className="mt-8 flex items-center justify-between">
        <h3 className="text-lg font-semibold">최근 탐험</h3>
        <button
          onClick={() => router.push("/logs")}
          className="flex items-center text-sm text-slate-500 dark:text-white/55"
        >
          전체보기 <ChevronRight size={16} />
        </button>
      </div>
      <div className="mt-4 space-y-4">
        {explorations.slice(0, 2).map((e) => (
          <ExplorationCard key={e.id} exploration={e} />
        ))}
      </div>
    </div>
  );
}
