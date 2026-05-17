"use client";

import { useMemo, useState } from "react";
import { motion } from "framer-motion";
import { Play, RotateCcw, Train } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { LineBadge } from "@/components/LineBadge";
import { filterStations, getRandomStation, getStations } from "@/services/stationService";
import type { Station } from "@/types";

type Props = {
  selectedStation: Station | null;
  setSelectedStation: (station: Station) => void;
  setCurrentTab: (tab: string) => void;
};

export function RandomScreen({ selectedStation, setSelectedStation, setCurrentTab }: Props) {
  const [isRolling, setIsRolling] = useState(false);
  const [excludeVisited, setExcludeVisited] = useState(true);
  const [lineFilter, setLineFilter] = useState("all");

  const availableStations = useMemo(
    () => filterStations(excludeVisited, lineFilter),
    [excludeVisited, lineFilter],
  );

  const pickStation = () => {
    setIsRolling(true);
    setTimeout(() => {
      const pool = availableStations.length ? availableStations : getStations();
      setSelectedStation(getRandomStation(pool));
      setIsRolling(false);
    }, 700);
  };

  return (
    <div>
      <h1 className="text-2xl font-bold">랜덤 역 뽑기</h1>
      <p className="mt-2 text-sm text-white/55">오늘은 어디에서 내려볼까요?</p>

      <Card className="mt-6 border-white/10 bg-white/8 text-white shadow-2xl backdrop-blur">
        <CardContent className="p-5">
          <div className="flex gap-2 overflow-x-auto pb-2">
            {["all", "2", "4", "5", "6", "G"].map((line) => (
              <button
                key={line}
                onClick={() => setLineFilter(line)}
                className={`shrink-0 rounded-full px-4 py-2 text-sm ${
                  lineFilter === line ? "bg-white text-black" : "bg-white/10 text-white/65"
                }`}
              >
                {line === "all" ? "전체" : `${line}호선`}
              </button>
            ))}
          </div>
          <button
            onClick={() => setExcludeVisited(!excludeVisited)}
            className="mt-3 rounded-full bg-white/10 px-4 py-2 text-sm text-white/70"
          >
            {excludeVisited ? "방문한 역 제외 중" : "방문한 역 포함"}
          </button>
        </CardContent>
      </Card>

      <Card className="mt-5 overflow-hidden border-white/10 bg-gradient-to-br from-white/12 to-white/5 text-white shadow-2xl backdrop-blur">
        <CardContent className="p-7 text-center">
          <motion.div
            animate={isRolling ? { rotate: 360 } : { rotate: 0 }}
            transition={{ duration: 0.7 }}
            className="mx-auto flex h-20 w-20 items-center justify-center rounded-full border border-white/10 bg-white/10"
          >
            <Train size={34} />
          </motion.div>
          <div className="mt-6 text-sm text-white/50">오늘의 목적지</div>
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
            className="mt-8 h-12 w-full rounded-2xl bg-white text-black hover:bg-white/90"
          >
            <RotateCcw className="mr-2" size={18} /> {selectedStation ? "다시 뽑기" : "역 뽑기"}
          </Button>
          <Button
            disabled={!selectedStation || isRolling}
            onClick={() => setCurrentTab("active")}
            className="mt-3 h-12 w-full rounded-2xl bg-emerald-400 text-black hover:bg-emerald-300 disabled:opacity-40"
          >
            <Play className="mr-2" size={18} /> 탐험 시작하기
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
