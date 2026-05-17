"use client";

import { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { Play, RotateCcw, Train } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { LineBadge } from "@/components/LineBadge";
import { useApp } from "@/context/AppContext";
import { filterStations, getRandomStation, getStations } from "@/services/stationService";
import type { Station } from "@/types";

export function RandomScreen() {
  const router = useRouter();
  const { selectedStation, setSelectedStation } = useApp();
  const [stations, setStations] = useState<Station[]>([]);
  const [isRolling, setIsRolling] = useState(false);
  const [excludeVisited, setExcludeVisited] = useState(true);
  const [lineFilter, setLineFilter] = useState("all");

  useEffect(() => {
    getStations().then(setStations).catch(console.error);
  }, []);

  const availableStations = useMemo(
    () => filterStations(stations, excludeVisited, lineFilter),
    [stations, excludeVisited, lineFilter],
  );

  const pickStation = () => {
    setIsRolling(true);
    setTimeout(() => {
      const pool = availableStations.length ? availableStations : stations;
      if (pool.length) setSelectedStation(getRandomStation(pool));
      setIsRolling(false);
    }, 700);
  };

  return (
    <div>
      <h1 className="text-2xl font-bold">랜덤 역 뽑기</h1>
      <p className="mt-2 text-sm text-slate-500 dark:text-white/55">오늘은 어디에서 내려볼까요?</p>

      <Card className="mt-6 border-black/8 bg-white dark:border-white/10 dark:bg-white/8">
        <CardContent className="p-5">
          <div className="flex gap-2 overflow-x-auto pb-2">
            {["all", "2", "4", "5", "6", "G"].map((line) => (
              <button
                key={line}
                onClick={() => setLineFilter(line)}
                className={`shrink-0 rounded-full px-4 py-2 text-sm transition ${
                  lineFilter === line
                    ? "bg-slate-900 text-white dark:bg-white dark:text-black"
                    : "bg-black/5 text-slate-600 dark:bg-white/10 dark:text-white/65"
                }`}
              >
                {line === "all" ? "전체" : `${line}호선`}
              </button>
            ))}
          </div>
          <button
            onClick={() => setExcludeVisited(!excludeVisited)}
            className="mt-3 rounded-full bg-black/5 px-4 py-2 text-sm text-slate-600 dark:bg-white/10 dark:text-white/70"
          >
            {excludeVisited ? "방문한 역 제외 중" : "방문한 역 포함"}
          </button>
        </CardContent>
      </Card>

      <Card className="mt-5 overflow-hidden border-black/8 dark:border-white/10 dark:bg-gradient-to-br dark:from-white/12 dark:to-white/5">
        <CardContent className="p-7 text-center">
          <motion.div
            animate={isRolling ? { rotate: 360 } : { rotate: 0 }}
            transition={{ duration: 0.7 }}
            className="mx-auto flex h-20 w-20 items-center justify-center rounded-full border border-black/8 bg-black/5 dark:border-white/10 dark:bg-white/10"
          >
            <Train size={34} />
          </motion.div>
          <div className="mt-6 text-sm text-slate-400 dark:text-white/50">오늘의 목적지</div>
          <motion.div
            key={selectedStation?.id ?? "empty"}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            className="mt-2 text-4xl font-black tracking-tight"
          >
            {isRolling ? "선택 중..." : selectedStation ? `${selectedStation.name}역` : "아직 없음"}
          </motion.div>
          {selectedStation && !isRolling && (
            <div className="mt-4">
              <LineBadge lineName={selectedStation.lineName} lineColor={selectedStation.lineColor} />
            </div>
          )}

          <Button
            onClick={pickStation}
            className="mt-8 h-12 w-full rounded-2xl bg-slate-900 text-white hover:bg-slate-800 dark:bg-white dark:text-black dark:hover:bg-white/90"
          >
            <RotateCcw className="mr-2" size={18} /> {selectedStation ? "다시 뽑기" : "역 뽑기"}
          </Button>
          <Button
            disabled={!selectedStation || isRolling}
            onClick={() => router.push("/explore")}
            className="mt-3 h-12 w-full rounded-2xl bg-emerald-500 text-white hover:bg-emerald-600 disabled:opacity-40 dark:bg-emerald-400 dark:text-black dark:hover:bg-emerald-300"
          >
            <Play className="mr-2" size={18} /> 탐험 시작하기
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
