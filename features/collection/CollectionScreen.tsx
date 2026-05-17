"use client";

import { Lock } from "lucide-react";

const lineGroups = [
  { line: "2호선", lineNum: "2", color: "#00A84D", glowColor: "rgba(0,168,77,0.4)", total: 51, visited: 15 },
  { line: "4호선", lineNum: "4", color: "#00A5DE", glowColor: "rgba(0,165,222,0.4)", total: 44, visited: 32 },
  { line: "5호선", lineNum: "5", color: "#996CAC", glowColor: "rgba(153,108,172,0.4)", total: 52, visited: 8 },
  { line: "6호선", lineNum: "6", color: "#CD7C2F", glowColor: "rgba(205,124,47,0.4)", total: 38, visited: 3 },
];

const visitedBadges = [
  {
    name: "성수역",
    line: "2",
    color: "#00A84D",
    img: "https://lh3.googleusercontent.com/aida-public/AB6AXuDiSdSiJ-8auXLEteAT7ygMeFpKEwCF-P_WONtg3R-7dtnPjzqXnqGYGvy05XL59myprYImhMKKzGo2CZz0phz7Y_77FSwY211OMKC7AR-W-soyuhY-_i3MnHRk1VXHHuDRpHiDwp5kq1XxLESQenF1UTFLcB--rz79SPGNqSbH-qsIFpUxQz9WfRjMCrw4yUQxstzVpOcUfvn_e99DghjV26zgjM7oDKJ1sNL5_ZP_azMmniz4BKt6jDGl3jgx72TMGxy1ju4w",
  },
  {
    name: "을지로3가",
    line: "5",
    color: "#996CAC",
    img: "https://lh3.googleusercontent.com/aida-public/AB6AXuAMG40G-FTSHPf2Cgkcjqx1_2OrdjG0Sqd_OA3cWT_Jn8uBdkdL-Ace6Z0CyYa26i2sAOqyY8yfgEBmzuEuEmHUO_FisLXTWs0H999mPQJzE35tJ_4FkKzIRBe-OA8CumdPprOAHVHx8QCrq8ENtgltlc72ZezRyXjfC5iypJzHYzcXH7o4tXBadGEKdh3nfsYKwrxQJuF4mfDzyWpZ-hCQk3osF_HhYrZxkw7aOmmWFggNmKIHvzkCUnLs38Ax0AidIf9ytphy",
  },
];

const LOCKED_COUNT = 4;

export function CollectionScreen() {
  const totalVisited = lineGroups.reduce((sum, l) => sum + l.visited, 0);
  const totalStations = lineGroups.reduce((sum, l) => sum + l.total, 0);
  const completion = Math.round((totalVisited / totalStations) * 100);

  return (
    <div>
      {/* Hero */}
      <section className="mb-10">
        <span className="mb-3 inline-block text-[11px] font-semibold uppercase tracking-widest text-[#aac7ff]">
          Adventure Progress
        </span>
        <h2 className="font-heading text-[26px] font-semibold tracking-tight">나의 컬렉션</h2>
        <p className="mt-2 text-sm leading-relaxed text-slate-500 dark:text-white/50">
          서울의 밤을 가로지르는 여정. 수집된 스테이션 뱃지와 노선별 정복도를 확인하세요.
        </p>
      </section>

      {/* Line Progress Grid */}
      <section className="mb-10 grid grid-cols-1 gap-4 md:grid-cols-2">
        {lineGroups.map((line) => {
          const percent = Math.round((line.visited / line.total) * 100);
          return (
            <div
              key={line.line}
              className="group relative overflow-hidden rounded-2xl border border-black/5 bg-white/60 p-6 backdrop-blur-xl dark:border-white/5 dark:bg-[#1e2024]/60"
            >
              <div className="pointer-events-none absolute -right-3 -top-3 font-heading text-8xl font-bold opacity-5 group-hover:opacity-10 transition-opacity"
                style={{ color: line.color }}>
                {line.lineNum}
              </div>
              <div className="mb-4 flex items-end justify-between">
                <div>
                  <span className="mb-1 block text-[11px] font-semibold uppercase tracking-widest"
                    style={{ color: line.color }}>
                    Line {line.lineNum}
                  </span>
                  <h3 className="font-heading text-lg font-semibold">{line.line}</h3>
                </div>
                <span className="text-xs text-slate-400 dark:text-white/40">
                  {line.visited} / {line.total}
                </span>
              </div>
              <div className="h-2 w-full overflow-hidden rounded-full bg-black/8 dark:bg-white/10">
                <div
                  className="h-full rounded-full transition-all duration-700"
                  style={{
                    width: `${percent}%`,
                    backgroundColor: line.color,
                    boxShadow: `0 0 8px ${line.glowColor}`,
                  }}
                />
              </div>
              <div className="mt-3 text-xs text-slate-400 dark:text-white/40">{percent}% 완성</div>
            </div>
          );
        })}
      </section>

      {/* Badge Collection */}
      <section>
        <div className="mb-6 flex items-center justify-between">
          <h3 className="font-semibold">수집된 스테이션 뱃지</h3>
          <button className="text-xs text-[#aac7ff]">전체 보기</button>
        </div>
        <div className="grid grid-cols-3 gap-4 sm:grid-cols-4 md:grid-cols-6">
          {visitedBadges.map((badge) => (
            <div key={badge.name} className="flex flex-col items-center gap-2">
              <div className="group relative aspect-square w-full">
                <div className="absolute inset-0 rounded-full border border-black/5 bg-white/60 backdrop-blur-xl dark:border-white/5 dark:bg-[#1e2024]/60" />
                <img
                  src={badge.img}
                  alt={badge.name}
                  className="absolute inset-0 h-full w-full rounded-full object-cover p-2 opacity-70 transition-opacity duration-300 group-hover:opacity-100"
                />
                <div
                  className="pointer-events-none absolute inset-0 rounded-full border-2"
                  style={{ borderColor: `${badge.color}60` }}
                />
                <span
                  className="absolute -bottom-1 left-1/2 -translate-x-1/2 rounded-full px-2 py-0.5 text-[10px] font-bold text-white"
                  style={{ backgroundColor: badge.color }}
                >
                  L{badge.line}
                </span>
              </div>
              <span className="text-center text-[11px] font-medium text-slate-600 dark:text-white/60">{badge.name}</span>
            </div>
          ))}
          {Array.from({ length: LOCKED_COUNT }).map((_, i) => (
            <div key={i} className="flex flex-col items-center gap-2 opacity-40">
              <div className="relative aspect-square w-full rounded-full border border-dashed border-black/20 bg-black/5 backdrop-blur-xl dark:border-white/20 dark:bg-white/5 flex items-center justify-center">
                <Lock size={20} className="text-slate-400 dark:text-white/40" />
              </div>
              <span className="text-center text-[11px] font-medium text-slate-400 dark:text-white/40">???</span>
            </div>
          ))}
        </div>
      </section>

      {/* Overall Stats */}
      <section className="mt-10">
        <div className="flex flex-col gap-6 rounded-2xl border border-black/5 bg-white/60 p-6 backdrop-blur-xl dark:border-white/5 dark:bg-[#1e2024]/60 md:flex-row md:items-center md:justify-between">
          <div>
            <h4 className="font-heading font-semibold">당신의 수집 등급</h4>
            <p className="mt-1 text-sm text-slate-500 dark:text-white/50">
              현재 {totalVisited}개의 스테이션을 발견했습니다.
            </p>
          </div>
          <div className="flex items-center justify-center gap-6">
            <div className="flex flex-col items-center">
              <span className="font-heading text-2xl font-bold text-[#aac7ff]">{completion}%</span>
              <span className="text-[10px] font-semibold uppercase tracking-widest text-slate-400 dark:text-white/40">Completion</span>
            </div>
            <div className="h-8 w-px bg-black/10 dark:bg-white/10" />
            <div className="flex flex-col items-center">
              <span className="font-heading text-2xl font-bold text-[#68df6e]">Expert</span>
              <span className="text-[10px] font-semibold uppercase tracking-widest text-slate-400 dark:text-white/40">Rank</span>
            </div>
          </div>
          <button
            className="rounded-full px-6 py-3 text-sm font-semibold text-[#002f64] transition-opacity hover:opacity-90 active:scale-95"
            style={{
              backgroundColor: "#aac7ff",
              boxShadow: "0 4px 20px rgba(170,199,255,0.3)",
            }}
          >
            리워드 확인하기
          </button>
        </div>
      </section>
    </div>
  );
}
