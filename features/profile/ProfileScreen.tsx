"use client";

import { ChevronRight, TrainFront, Compass, Star, Trophy } from "lucide-react";
import Link from "next/link";
import { useApp } from "@/context/AppContext";
import { badges } from "@/mock/badges";

export function ProfileScreen() {
  const { explorations } = useApp();
  const stationCount = new Set(explorations.map((e) => e.stationId)).size;
  const placeCount = explorations.reduce((sum, e) => sum + e.places.length, 0);
  const badgeCount = badges.filter((b) => !b.locked).length;

  const statItems = [
    { label: "방문한 역", value: String(stationCount), unit: "개", icon: TrainFront, color: "#3182F6" },
    { label: "탐험 기록", value: String(explorations.length), unit: "회", icon: Compass, color: "#34C759" },
    { label: "장소 리뷰", value: String(placeCount), unit: "개", icon: Star, color: "#FF9500" },
    { label: "획득 뱃지", value: String(badgeCount), unit: "개", icon: Trophy, color: "#AF52DE" },
  ];

  return (
    <div className="space-y-4 py-4">
      {/* Profile Hero */}
      <div className="flex flex-col items-center rounded-3xl bg-white py-6 shadow-sm dark:bg-[#1C1C1E]">
        <div className="h-20 w-20 overflow-hidden rounded-full ring-2 ring-[#3182F6]/20">
          <img
            src="https://lh3.googleusercontent.com/aida-public/AB6AXuDpJT9yFMsnDqqSy-6AQqAfj7wdqJRE3nr4bxgzFDpjlI0p2XpKv1VriQd7_OMzcY3lO40J-GtYZIMIuc451i0F3yuxWWGp7sqZW-u6y-FkCzQT7OBoUFJiYwvZAPsbRvh-5WuTXNzUxeHngybeymof5mhpGz-OmQkkFiyIyVKf2VHLzGQ3mAT5wN7U9bZpe_tjXP72zVQnEQNzlbBSgTbwbVZcnPjWt-aCdd8cOmOEva--lWfs9XIZ4a4Q0hhaMA5_3enKp8j-"
            alt="프로필"
            className="h-full w-full object-cover"
          />
        </div>
        <div className="mt-3 text-center">
          <h2 className="text-[20px] font-bold">정우</h2>
          <p className="mt-0.5 text-[13px] text-[#8E8E93]">도시의 밤을 기록하는 서울 방랑자</p>
          <span className="mt-2 inline-block rounded-full bg-[#3182F6]/10 px-3 py-1 text-[12px] font-semibold text-[#3182F6]">
            Premium Explorer
          </span>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 gap-2">
        {statItems.map(({ label, value, unit, icon: Icon, color }) => (
          <div
            key={label}
            className="flex items-center gap-3 rounded-2xl bg-white p-4 shadow-sm dark:bg-[#1C1C1E]"
          >
            <div
              className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl"
              style={{ backgroundColor: `${color}18` }}
            >
              <Icon size={20} style={{ color }} />
            </div>
            <div>
              <div className="flex items-baseline gap-0.5">
                <span className="text-[20px] font-bold">{value}</span>
                <span className="text-[12px] text-[#8E8E93]">{unit}</span>
              </div>
              <p className="text-[11px] text-[#8E8E93]">{label}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Badges */}
      <div className="rounded-3xl bg-white shadow-sm dark:bg-[#1C1C1E]">
        <div className="flex items-center justify-between px-4 pt-4 pb-3">
          <span className="text-[15px] font-semibold">획득한 뱃지</span>
          <Link href="/badges" className="text-[13px] text-[#3182F6]">전체 보기</Link>
        </div>
        <div className="grid grid-cols-4 gap-3 px-4 pb-4">
          {badges.filter((b) => !b.locked).slice(0, 4).map(({ id, label, desc, icon: Icon, color, bg }) => (
            <div key={id} className="flex flex-col items-center gap-1.5 text-center">
              <div
                className="flex h-14 w-14 items-center justify-center rounded-2xl"
                style={{ background: bg }}
              >
                <Icon size={24} style={{ color }} />
              </div>
              <span className="text-[11px] font-semibold leading-tight">{label}</span>
              <span className="text-[10px] text-[#8E8E93] leading-tight">{desc}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Recent Explorations */}
      <div className="rounded-3xl bg-white shadow-sm dark:bg-[#1C1C1E]">
        <div className="px-4 pt-4 pb-2">
          <span className="text-[15px] font-semibold">최근 탐험 기록</span>
        </div>
        <div className="divide-y divide-[#F2F2F7] dark:divide-[#38383A]">
          {explorations.map((e) => (
            <div key={e.id} className="flex items-center gap-3 px-4 py-3">
              <div className="h-10 w-10 shrink-0 overflow-hidden rounded-xl bg-[#F2F2F7] dark:bg-[#2C2C2E]">
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
        </div>
      </div>
    </div>
  );
}
