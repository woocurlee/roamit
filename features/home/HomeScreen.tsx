"use client";

import { useRouter } from "next/navigation";
import { ChevronRight, Shuffle, TrainFront, Compass, Star, Clock } from "lucide-react";
import { useApp } from "@/context/AppContext";

export function HomeScreen() {
  const router = useRouter();
  const { explorations } = useApp();
  const placeCount = explorations.reduce((sum, e) => sum + e.places.length, 0);

  const stats = [
    { label: "방문한 역", value: "2", color: "#aac7ff", icon: TrainFront },
    { label: "탐험 기록", value: String(explorations.length), color: "#68df6e", icon: Compass },
    { label: "장소 리뷰", value: String(placeCount), color: "#ffb692", icon: Star },
    { label: "총 탐험 시간", value: "14h", color: "#aac7ff", icon: Clock },
  ];

  return (
    <div>
      {/* Hero */}
      <section className="-mx-5 -mt-20 relative flex min-h-[60vh] flex-col justify-end overflow-hidden px-6 pb-10 pt-20 lg:-mx-10 lg:px-10">
        <img
          src="https://lh3.googleusercontent.com/aida-public/AB6AXuDe33Lu5WL4uRDVuuQ9qNaK-5bn90LwTuffCTSfjVHypBMY9MhDwyPTg7bR4mt_e4hWLbPT5ynf8WUuNK2mjh5WshD4w0T-W3GxDuVOWYV2ix7ZrQLUGUpCTkRv-1k7rO1FdNGGfb3UA7nn0LQIrVTS-9cQQ3x8rht54YF1O9hfYdfTcHwYVwvJsqwi0qUVStSsCrwnlJdh3TX_8nKOWizJoa2zg4WoxOnaCkIwr7Ex_3x-TegL4HjV5GLvQbDIMhzKs30dcJ9U"
          alt="Seoul Night View"
          className="absolute inset-0 h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#111317] via-[#111317]/50 to-transparent" />
        <div className="relative z-10">
          <span className="mb-5 inline-block rounded-full border border-[#aac7ff]/25 bg-[#aac7ff]/10 px-3 py-1 text-[11px] font-semibold uppercase tracking-widest text-[#aac7ff]">
            City Explorer
          </span>
          <h2 className="mb-3 font-heading text-[26px] font-semibold leading-snug tracking-tight text-slate-900 dark:text-white">
            오늘 밤, 서울의<br />새로운 맥박을 찾아보세요.
          </h2>
          <p className="mb-8 text-sm leading-relaxed text-slate-500 dark:text-white/50">
            목적지 없는 여정이 가장 특별한 이야기를 만듭니다.
          </p>
          <button
            onClick={() => router.push("/random")}
            className="flex items-center gap-3 rounded-2xl bg-[#aac7ff] px-7 py-4 text-base font-semibold text-[#002f64] transition-opacity hover:opacity-90 active:scale-95"
            style={{ boxShadow: "0 0 28px rgba(170,199,255,0.4)" }}
          >
            <Shuffle size={18} />
            랜덤 역 뽑기
          </button>
        </div>
      </section>

      {/* Stats */}
      <section className="mt-8">
        <h3 className="mb-4 text-sm font-semibold uppercase tracking-widest text-slate-400 dark:text-white/40">
          나의 탐험 통계
        </h3>
        <div className="grid grid-cols-2 gap-3 md:grid-cols-4">
          {stats.map(({ label, value, color, icon: Icon }) => (
            <div
              key={label}
              className="flex flex-col gap-2 rounded-2xl border border-black/5 bg-white/60 p-4 backdrop-blur-xl dark:border-white/5 dark:bg-[#1e2024]/60"
            >
              <Icon size={20} style={{ color, filter: `drop-shadow(0 0 6px ${color}60)` }} />
              <div>
                <p className="mb-1 text-[10px] font-semibold uppercase tracking-widest text-slate-400 dark:text-white/40">
                  {label}
                </p>
                <p className="font-heading text-3xl font-bold text-slate-900 dark:text-white">{value}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Recent Logs */}
      <section className="mt-10 pb-4">
        <div className="mb-5 flex items-end justify-between">
          <div>
            <h3 className="font-semibold text-slate-900 dark:text-white">최근 탐험 로그</h3>
            <p className="mt-0.5 text-[11px] text-slate-400 dark:text-white/40">당신이 남긴 서울의 흔적들</p>
          </div>
          <button
            onClick={() => router.push("/logs")}
            className="flex items-center text-xs text-[#aac7ff]"
          >
            전체보기 <ChevronRight size={14} />
          </button>
        </div>
        <div className="space-y-3">
          {explorations.slice(0, 2).map((e) => (
            <div
              key={e.id}
              className="group flex gap-4 rounded-3xl border border-black/5 bg-white/60 p-4 backdrop-blur-xl dark:border-white/5 dark:bg-[#1e2024]/60"
            >
              <div className="relative h-24 w-24 shrink-0 overflow-hidden rounded-2xl bg-black/5 dark:bg-white/5">
                {e.coverPhoto && (
                  <img
                    src={e.coverPhoto}
                    alt={e.stationName}
                    className="h-full w-full object-cover grayscale transition-all duration-500 group-hover:grayscale-0"
                  />
                )}
              </div>
              <div className="flex min-w-0 flex-1 flex-col justify-center">
                <div className="mb-1 flex items-start justify-between">
                  <h4 className="font-semibold text-sm text-slate-900 dark:text-white">{e.stationName}역</h4>
                  <span className="ml-2 shrink-0 text-[11px] text-slate-400 dark:text-white/40">{e.visitedAt}</span>
                </div>
                <p className="line-clamp-2 text-xs leading-relaxed text-slate-500 dark:text-white/50">
                  {e.summaryMemo}
                </p>
                <div className="mt-2 flex flex-wrap gap-1.5">
                  {e.places.slice(0, 2).map((p) => (
                    <span
                      key={p.id}
                      className="rounded bg-black/5 px-2 py-0.5 text-[10px] font-semibold text-slate-500 dark:bg-white/5 dark:text-white/40"
                    >
                      #{p.type}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
