"use client";

import { useRouter } from "next/navigation";
import { ChevronRight, Shuffle, TrainFront, Compass, Star } from "lucide-react";
import { useApp } from "@/context/AppContext";

export function HomeScreen() {
  const router = useRouter();
  const { explorations } = useApp();
  const stationCount = new Set(explorations.map((e) => e.stationId)).size;
  const placeCount = explorations.reduce((sum, e) => sum + e.places.length, 0);

  const stats = [
    { label: "방문한 역", value: String(stationCount), unit: "개", icon: TrainFront, color: "#3182F6" },
    { label: "탐험 기록", value: String(explorations.length), unit: "회", icon: Compass, color: "#34C759" },
    { label: "장소 리뷰", value: String(placeCount), unit: "개", icon: Star, color: "#FF9500" },
  ];

  return (
    <div className="space-y-4 py-4">
      {/* CTA Hero Card */}
      <div className="relative overflow-hidden rounded-3xl">
        <img
          src="https://lh3.googleusercontent.com/aida-public/AB6AXuDe33Lu5WL4uRDVuuQ9qNaK-5bn90LwTuffCTSfjVHypBMY9MhDwyPTg7bR4mt_e4hWLbPT5ynf8WUuNK2mjh5WshD4w0T-W3GxDuVOWYV2ix7ZrQLUGUpCTkRv-1k7rO1FdNGGfb3UA7nn0LQIrVTS-9cQQ3x8rht54YF1O9hfYdfTcHwYVwvJsqwi0qUVStSsCrwnlJdh3TX_8nKOWizJoa2zg4WoxOnaCkIwr7Ex_3x-TegL4HjV5GLvQbDIMhzKs30dcJ9U"
          alt="Seoul Night View"
          className="h-52 w-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 p-5">
          <p className="text-[13px] font-medium text-white/70">오늘 밤, 서울의 새로운 곳으로</p>
          <h2 className="mt-1 text-[22px] font-bold leading-tight text-white">
            어디서 내려볼까요?
          </h2>
          <button
            onClick={() => router.push("/random")}
            className="mt-4 flex items-center gap-2 rounded-2xl bg-[#3182F6] px-5 py-2.5 text-[15px] font-semibold text-white active:opacity-80"
          >
            <Shuffle size={16} />
            랜덤 역 뽑기
          </button>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-3 gap-2">
        {stats.map(({ label, value, unit, icon: Icon, color }) => (
          <div
            key={label}
            className="flex flex-col gap-1.5 rounded-2xl bg-white p-4 shadow-sm dark:bg-[#1C1C1E]"
          >
            <Icon size={18} style={{ color }} />
            <div>
              <div className="flex items-baseline gap-0.5">
                <span className="text-[24px] font-bold leading-none text-[#1C1C1E] dark:text-white">{value}</span>
                <span className="text-[12px] text-[#8E8E93]">{unit}</span>
              </div>
              <p className="mt-1 text-[11px] text-[#8E8E93]">{label}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Recent Logs */}
      <div className="rounded-3xl bg-white shadow-sm dark:bg-[#1C1C1E]">
        <div className="flex items-center justify-between px-4 pt-4 pb-2">
          <span className="text-[15px] font-semibold">최근 탐험 기록</span>
          <button
            onClick={() => router.push("/logs")}
            className="flex items-center gap-0.5 text-[13px] text-[#3182F6]"
          >
            전체보기 <ChevronRight size={14} />
          </button>
        </div>

        <div className="divide-y divide-[#F2F2F7] dark:divide-[#38383A]">
          {explorations.slice(0, 3).map((e) => (
            <div key={e.id} className="flex items-center gap-3 px-4 py-3">
              <div className="h-12 w-12 shrink-0 overflow-hidden rounded-xl bg-[#F2F2F7] dark:bg-[#2C2C2E]">
                {e.photos[0] && (
                  <img src={e.photos[0]} alt={e.stationName} className="h-full w-full object-cover" />
                )}
              </div>
              <div className="flex-1 min-w-0">
                <p className="truncate text-[14px] font-semibold">{e.stationName}역 탐험</p>
                <p className="mt-0.5 text-[12px] text-[#8E8E93]">
                  {e.visitedAt} · 장소 {e.places.length}곳
                </p>
              </div>
              <ChevronRight size={16} className="shrink-0 text-[#C7C7CC] dark:text-[#48484A]" />
            </div>
          ))}
          {explorations.length === 0 && (
            <div className="px-4 py-8 text-center">
              <p className="text-[14px] text-[#8E8E93]">아직 탐험 기록이 없어요</p>
              <p className="mt-1 text-[12px] text-[#C7C7CC]">첫 번째 역을 뽑아보세요!</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
