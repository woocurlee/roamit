import { MapPin, Star } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { LineBadge } from "@/components/LineBadge";
import { PlaceTypeBadge } from "@/components/PlaceTypeBadge";
import type { Exploration } from "@/types";

type Props = {
  exploration: Exploration;
};

export function ExplorationCard({ exploration }: Props) {
  return (
    <Card className="overflow-hidden border-black/8 bg-white text-slate-900 shadow-sm dark:border-white/10 dark:bg-white/8 dark:text-white dark:shadow-xl">
      <div
        className="h-36 w-full bg-cover bg-center"
        style={{ backgroundImage: `url(${exploration.coverPhoto})` }}
      />
      <CardContent className="p-4">
        <div className="flex items-center justify-between">
          <div>
            <div className="text-lg font-semibold">{exploration.stationName}역 탐험</div>
            <div className="mt-1 flex items-center gap-1 text-xs text-slate-400 dark:text-white/45">
              <MapPin size={12} /> 방문 장소 {exploration.places.length}개
            </div>
          </div>
          <LineBadge lineName={exploration.lineName} lineColor={exploration.lineColor} />
        </div>
        <p className="mt-3 line-clamp-2 text-sm leading-6 text-slate-600 dark:text-white/70">
          {exploration.summaryMemo}
        </p>

        <div className="mt-4 space-y-2">
          {exploration.places.slice(0, 2).map((place) => (
            <div key={place.id} className="rounded-2xl bg-black/5 p-3 dark:bg-black/25">
              <div className="min-w-0">
                <div className="truncate text-sm font-medium">{place.name}</div>
                <div className="mt-1 flex items-center gap-2">
                  <PlaceTypeBadge typeLabel={place.typeLabel} />
                  <span className="flex items-center gap-1 text-[11px] text-yellow-500 dark:text-yellow-200">
                    <Star size={12} fill="currentColor" /> {place.rating}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-4 flex items-center justify-between text-xs text-slate-400 dark:text-white/50">
          <span>{exploration.visitedAt}</span>
          <span>{exploration.places.length > 2 ? `외 ${exploration.places.length - 2}곳` : ""}</span>
        </div>
      </CardContent>
    </Card>
  );
}
