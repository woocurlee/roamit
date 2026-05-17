import { Trophy, User } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { StatCard } from "@/components/StatCard";
import type { Exploration } from "@/types";

const badges = ["첫 탐험", "5개 역 방문", "10개 역 방문", "한 노선 3개 역 방문"];

type Props = {
  explorations: Exploration[];
};

export function ProfileScreen({ explorations }: Props) {
  const placeCount = explorations.reduce((sum, e) => sum + e.places.length, 0);

  return (
    <div>
      <div className="rounded-[2rem] border border-white/10 bg-white/8 p-6 text-center shadow-2xl backdrop-blur">
        <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-white text-black">
          <User size={34} />
        </div>
        <h1 className="mt-4 text-2xl font-bold">정우</h1>
        <p className="mt-1 text-sm text-white/55">도시와 장소를 천천히 수집하는 중</p>
      </div>
      <div className="mt-5 grid grid-cols-3 gap-3">
        <StatCard label="탐험" value={explorations.length} />
        <StatCard label="방문 역" value="2" />
        <StatCard label="장소" value={placeCount} />
      </div>
      <h2 className="mt-8 text-lg font-semibold">뱃지</h2>
      <div className="mt-4 grid grid-cols-2 gap-3">
        {badges.map((badge, idx) => (
          <Card
            key={badge}
            className={`border-white/10 ${idx === 0 ? "bg-emerald-400/15" : "bg-white/8"} text-white shadow-xl backdrop-blur`}
          >
            <CardContent className="p-4">
              <Trophy className={idx === 0 ? "text-emerald-200" : "text-white/35"} />
              <div className="mt-3 text-sm font-semibold">{badge}</div>
              <div className="mt-1 text-xs text-white/45">{idx === 0 ? "달성 완료" : "아직 잠김"}</div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
