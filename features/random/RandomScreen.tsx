"use client";

import { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { Play, RotateCcw, Train } from "lucide-react";
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

  const lineOptions = [
    { value: "all", label: "전체" },
    { value: "2", label: "2호선" },
    { value: "4", label: "4호선" },
    { value: "5", label: "5호선" },
    { value: "6", label: "6호선" },
    { value: "G", label: "경의중앙" },
  ];

  return (
    <div className="space-y-4 py-4">
      <div>
        <h1 className="text-[22px] font-bold">랜덤 역 뽑기</h1>
        <p className="mt-1 text-[14px] text-[#8E8E93]">오늘은 어디에서 내려볼까요?</p>
      </div>

      {/* Filters */}
      <div className="rounded-2xl bg-white shadow-sm dark:bg-[#1C1C1E]">
        <div className="p-4">
          <p className="mb-3 text-[13px] font-semibold text-[#8E8E93]">호선 선택</p>
          <div className="flex gap-2 overflow-x-auto pb-1 scrollbar-none">
            {lineOptions.map((opt) => (
              <button
                key={opt.value}
                onClick={() => setLineFilter(opt.value)}
                className={`shrink-0 rounded-full px-4 py-1.5 text-[13px] font-medium transition-colors ${
                  lineFilter === opt.value
                    ? "bg-[#3182F6] text-white"
                    : "bg-[#F2F2F7] text-[#1C1C1E] dark:bg-[#2C2C2E] dark:text-white"
                }`}
              >
                {opt.label}
              </button>
            ))}
          </div>
        </div>
        <div className="border-t border-[#F2F2F7] px-4 py-3 dark:border-[#38383A]">
          <button
            onClick={() => setExcludeVisited(!excludeVisited)}
            className="flex w-full items-center justify-between"
          >
            <span className="text-[14px]">방문한 역 제외</span>
            <div
              className={`relative h-6 w-11 rounded-full transition-colors ${
                excludeVisited ? "bg-[#34C759]" : "bg-[#E5E5EA] dark:bg-[#39393D]"
              }`}
            >
              <div
                className={`absolute top-0.5 h-5 w-5 rounded-full bg-white shadow-sm transition-transform ${
                  excludeVisited ? "translate-x-5" : "translate-x-0.5"
                }`}
              />
            </div>
          </button>
        </div>
      </div>

      {/* Result Card */}
      <div className="rounded-3xl bg-white px-6 py-8 shadow-sm dark:bg-[#1C1C1E] text-center">
        <motion.div
          animate={isRolling ? { rotate: 360 } : { rotate: 0 }}
          transition={{ duration: 0.7 }}
          className="mx-auto mb-5 flex h-16 w-16 items-center justify-center rounded-2xl bg-[#F2F2F7] dark:bg-[#2C2C2E]"
        >
          <Train size={28} className="text-[#3182F6]" />
        </motion.div>

        <p className="text-[13px] text-[#8E8E93]">오늘의 목적지</p>
        <motion.div
          key={selectedStation?.id ?? "empty"}
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          className="mt-2 text-[36px] font-black tracking-tight"
        >
          {isRolling ? "선택 중..." : selectedStation ? `${selectedStation.name}역` : "아직 없음"}
        </motion.div>

        {selectedStation && !isRolling && (
          <div className="mt-3 flex flex-wrap justify-center gap-1.5">
            {selectedStation.lines.map((l) => (
              <LineBadge key={l.lineId} lineName={l.lineName} lineColor={l.lineColor} />
            ))}
          </div>
        )}

        <div className="mt-7 flex flex-col gap-2.5">
          <button
            onClick={pickStation}
            className="flex h-12 w-full items-center justify-center gap-2 rounded-2xl bg-[#3182F6] text-[15px] font-semibold text-white active:opacity-80"
          >
            <RotateCcw size={16} />
            {selectedStation ? "다시 뽑기" : "역 뽑기"}
          </button>
          <button
            disabled={!selectedStation || isRolling}
            onClick={() => router.push("/explore")}
            className="flex h-12 w-full items-center justify-center gap-2 rounded-2xl bg-[#34C759] text-[15px] font-semibold text-white active:opacity-80 disabled:opacity-35"
          >
            <Play size={16} />
            탐험 시작하기
          </button>
        </div>
      </div>
    </div>
  );
}
