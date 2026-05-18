"use client";

import { ChevronRight, Moon, Train, Camera, Lock, TrainFront, Compass, Star, Trophy } from "lucide-react";
import { useApp } from "@/context/AppContext";

const badges = [
  {
    label: "밤거리의 방랑자",
    desc: "심야 탐험 10회 완료",
    icon: Moon,
    color: "#68df6e",
    bg: "rgba(104,223,110,0.12)",
    locked: false,
  },
  {
    label: "메트로 매니아",
    desc: "모든 호선 탑승 완료",
    icon: Train,
    color: "#aac7ff",
    bg: "rgba(170,199,255,0.12)",
    locked: false,
  },
  {
    label: "도시의 시선",
    desc: "포토스팟 50회 방문",
    icon: Camera,
    color: "#ffb692",
    bg: "rgba(255,182,146,0.12)",
    locked: false,
  },
  {
    label: "퍼스트 클래스",
    desc: "탐험 거리 1,000km 달성",
    icon: Lock,
    color: "#ffffff",
    bg: "rgba(255,255,255,0.05)",
    locked: true,
  },
];

export function ProfileScreen() {
  const { explorations } = useApp();
  const stationCount = new Set(explorations.map((e) => e.stationId)).size;
  const placeCount = explorations.reduce((sum, e) => sum + e.places.length, 0);
  const badgeCount = badges.filter((b) => !b.locked).length;

  const statItems = [
    { label: "방문한 역", value: String(stationCount), unit: "개", icon: TrainFront, color: "#aac7ff" },
    { label: "탐험 기록", value: String(explorations.length), unit: "회", icon: Compass, color: "#68df6e" },
    { label: "장소 리뷰", value: String(placeCount), unit: "개", icon: Star, color: "#ffb692" },
    { label: "획득 뱃지", value: String(badgeCount), unit: "개", icon: Trophy, color: "#aac7ff" },
  ];

  return (
    <div>
      {/* Hero */}
      <section className="relative mb-10">
        <div className="pointer-events-none absolute -left-10 -top-10 h-60 w-60 rounded-full bg-[#aac7ff]/10 blur-[80px]" />
        <div className="relative z-10 flex flex-col items-center gap-6 md:flex-row md:items-end">
          <div className="relative h-32 w-32 shrink-0">
            <div className="h-full w-full overflow-hidden rounded-full border-2 border-[#aac7ff]/20 bg-[#1e2024] p-1">
              <img
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuDpJT9yFMsnDqqSy-6AQqAfj7wdqJRE3nr4bxgzFDpjlI0p2XpKv1VriQd7_OMzcY3lO40J-GtYZIMIuc451i0F3yuxWWGp7sqZW-u6y-FkCzQT7OBoUFJiYwvZAPsbRvh-5WuTXNzUxeHngybeymof5mhpGz-OmQkkFiyIyVKf2VHLzGQ3mAT5wN7U9bZpe_tjXP72zVQnEQNzlbBSgTbwbVZcnPjWt-aCdd8cOmOEva--lWfs9XIZ4a4Q0hhaMA5_3enKp8j-"
                alt="프로필"
                className="h-full w-full rounded-full object-cover"
              />
            </div>
          </div>
          <div className="text-center md:text-left">
            <span className="mb-2 block text-[11px] font-semibold uppercase tracking-widest text-blue-600 dark:text-[#aac7ff]">
              Premium Explorer
            </span>
            <h2 className="font-heading text-[26px] font-semibold leading-tight">
              정우{" "}
              <span className="text-blue-400 dark:text-[#aac7ff]/70">탐험가</span>
            </h2>
            <p className="mt-1 text-sm text-slate-500 dark:text-white/50">도시의 밤을 기록하는 서울의 방랑자</p>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="mb-10 grid grid-cols-2 gap-3 md:grid-cols-4">
        {statItems.map(({ label, value, unit, icon: Icon, color }) => (
          <div
            key={label}
            className="flex flex-col gap-1 rounded-2xl border border-black/5 bg-white/60 p-4 backdrop-blur-xl dark:border-white/5 dark:bg-[#1e2024]/60"
          >
            <Icon size={20} style={{ color, filter: `drop-shadow(0 0 5px ${color}60)` }} className="mb-1" />
            <span className="text-[10px] font-semibold uppercase tracking-widest text-slate-400 dark:text-white/40">
              {label}
            </span>
            <div className="flex items-baseline gap-1">
              <span className="font-heading text-2xl font-bold text-slate-900 dark:text-white">{value}</span>
              <span className="text-xs text-slate-400 dark:text-white/40">{unit}</span>
            </div>
          </div>
        ))}
      </section>

      {/* Badges */}
      <section className="mb-10">
        <div className="mb-5 flex items-center justify-between">
          <h3 className="font-semibold">획득한 뱃지</h3>
          <button className="text-xs text-blue-600 dark:text-[#aac7ff]">전체 보기</button>
        </div>
        <div className="grid grid-cols-2 gap-3 md:grid-cols-4">
          {badges.map(({ label, desc, icon: Icon, color, bg, locked }) => (
            <div
              key={label}
              className={`flex flex-col items-center rounded-2xl border border-black/5 bg-white/60 p-4 text-center backdrop-blur-xl transition-all duration-300 dark:border-white/5 dark:bg-[#1e2024]/60 ${
                locked ? "opacity-40 grayscale" : "hover:dark:bg-[#1e2024]/80"
              }`}
            >
              <div
                className="mb-3 flex h-14 w-14 items-center justify-center rounded-full transition-transform duration-300 hover:scale-110"
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

      {/* Recent Logs */}
      <section>
        <h3 className="mb-5 font-semibold">최근 탐험 기록</h3>
        <div className="space-y-3">
          {explorations.map((e) => (
            <div
              key={e.id}
              className="flex items-center gap-4 rounded-2xl border border-black/5 bg-white/60 p-4 backdrop-blur-xl dark:border-white/5 dark:bg-[#1e2024]/60"
            >
              <div className="h-12 w-12 shrink-0 overflow-hidden rounded-xl bg-black/5 dark:bg-white/5">
                {e.photos[0] && (
                  <img src={e.photos[0]} alt={e.stationName} className="h-full w-full object-cover" />
                )}
              </div>
              <div className="flex-1 min-w-0">
                <h4 className="text-sm font-semibold truncate">{e.stationName}역 탐험</h4>
                <p className="mt-0.5 text-[11px] text-slate-400 dark:text-white/40">
                  {e.visitedAt} · 장소 {e.places.length}곳
                </p>
              </div>
              <ChevronRight size={16} className="shrink-0 text-slate-300 dark:text-white/30" />
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
