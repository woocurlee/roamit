"use client";

import { Lock } from "lucide-react";
import { useApp } from "@/context/AppContext";
import { stations } from "@/mock/stations";
import type { StationLine } from "@/types";

export function CollectionScreen() {
  const { explorations } = useApp();
  const visitedStationIds = new Set(explorations.map((e) => e.stationId));

  const lineMap = new Map<string, { line: StationLine; total: number; visited: number }>();
  stations.forEach((station) => {
    station.lines.forEach((line) => {
      if (!lineMap.has(line.lineId)) {
        lineMap.set(line.lineId, { line, total: 0, visited: 0 });
      }
      const entry = lineMap.get(line.lineId)!;
      entry.total += 1;
      if (visitedStationIds.has(station.id)) entry.visited += 1;
    });
  });
  const lineGroups = Array.from(lineMap.values());

  const visitedStations = stations.filter((s) => visitedStationIds.has(s.id));
  const lockedCount = Math.min(4, stations.length - visitedStations.length);

  const totalVisited = visitedStationIds.size;
  const totalStations = stations.length;
  const completion = totalStations > 0 ? Math.round((totalVisited / totalStations) * 100) : 0;

  return (
    <div className="space-y-4 py-4">
      <div>
        <h1 className="text-[22px] font-bold">나의 컬렉션</h1>
        <p className="mt-1 text-[14px] text-[#8E8E93]">수집된 역 뱃지와 노선별 정복도</p>
      </div>

      {/* Overall progress */}
      <div className="rounded-3xl bg-[#3182F6] p-5 text-white shadow-sm">
        <p className="text-[13px] font-medium text-white/70">전체 달성률</p>
        <div className="mt-1 flex items-baseline gap-2">
          <span className="text-[40px] font-black">{completion}%</span>
          <span className="text-[14px] text-white/70">{totalVisited} / {totalStations} 역</span>
        </div>
        <div className="mt-4 h-2 w-full overflow-hidden rounded-full bg-white/20">
          <div
            className="h-full rounded-full bg-white transition-all duration-700"
            style={{ width: `${completion}%` }}
          />
        </div>
      </div>

      {/* Line Progress */}
      <div className="rounded-3xl bg-white shadow-sm dark:bg-[#1C1C1E]">
        <div className="px-4 pt-4 pb-2">
          <span className="text-[15px] font-semibold">호선별 정복도</span>
        </div>
        <div className="divide-y divide-[#F2F2F7] dark:divide-[#38383A]">
          {lineGroups.map(({ line, total, visited }) => {
            const percent = total > 0 ? Math.round((visited / total) * 100) : 0;
            return (
              <div key={line.lineId} className="px-4 py-3.5">
                <div className="mb-2 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span
                      className="flex h-6 w-6 items-center justify-center rounded-full text-[11px] font-bold text-white"
                      style={{ backgroundColor: line.lineColor }}
                    >
                      {line.lineId}
                    </span>
                    <span className="text-[14px] font-medium">{line.lineName}</span>
                  </div>
                  <span className="text-[13px] text-[#8E8E93]">
                    {visited}/{total}개 · {percent}%
                  </span>
                </div>
                <div className="h-1.5 w-full overflow-hidden rounded-full bg-[#F2F2F7] dark:bg-[#2C2C2E]">
                  <div
                    className="h-full rounded-full transition-all duration-700"
                    style={{ width: `${percent}%`, backgroundColor: line.lineColor }}
                  />
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Station Badge Collection */}
      <div className="rounded-3xl bg-white shadow-sm dark:bg-[#1C1C1E]">
        <div className="px-4 pt-4 pb-3">
          <span className="text-[15px] font-semibold">수집한 역 뱃지</span>
        </div>
        <div className="grid grid-cols-4 gap-3 px-4 pb-4 sm:grid-cols-5">
          {visitedStations.map((station) => (
            <div key={station.id} className="flex flex-col items-center gap-1.5">
              <div
                className="relative flex aspect-square w-full items-center justify-center rounded-2xl"
                style={{ backgroundColor: `${station.lines[0].lineColor}18` }}
              >
                <span className="text-center text-[11px] font-bold leading-tight text-[#1C1C1E] dark:text-white px-1">
                  {station.name}
                </span>
                <div className="absolute -bottom-1 left-1/2 flex -translate-x-1/2 gap-0.5">
                  {station.lines.map((l) => (
                    <span
                      key={l.lineId}
                      className="rounded-full px-1 py-px text-[8px] font-bold text-white"
                      style={{ backgroundColor: l.lineColor }}
                    >
                      {l.lineId}
                    </span>
                  ))}
                </div>
              </div>
              <span className="text-center text-[10px] text-[#8E8E93]">{station.name}</span>
            </div>
          ))}
          {Array.from({ length: lockedCount }).map((_, i) => (
            <div key={i} className="flex flex-col items-center gap-1.5 opacity-30">
              <div className="flex aspect-square w-full items-center justify-center rounded-2xl border-2 border-dashed border-[#C7C7CC] dark:border-[#48484A]">
                <Lock size={16} className="text-[#8E8E93]" />
              </div>
              <span className="text-[10px] text-[#8E8E93]">???</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
