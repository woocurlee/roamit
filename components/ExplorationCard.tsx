import { MapPin, Star } from "lucide-react";
import { LineBadge } from "@/components/LineBadge";
import { PlaceTypeBadge } from "@/components/PlaceTypeBadge";
import type { Exploration } from "@/types";

type Props = {
  exploration: Exploration;
};

export function ExplorationCard({ exploration }: Props) {
  return (
    <div className="overflow-hidden rounded-3xl bg-white shadow-sm dark:bg-[#1C1C1E]">
      {exploration.photos[0] && (
        <div
          className="h-36 w-full bg-cover bg-center"
          style={{ backgroundImage: `url(${exploration.photos[0]})` }}
        />
      )}
      <div className="p-4">
        <div className="flex items-start justify-between gap-2">
          <div>
            <div className="text-[16px] font-semibold">{exploration.stationName}역 탐험</div>
            <div className="mt-0.5 flex items-center gap-1 text-[12px] text-[#8E8E93]">
              <MapPin size={11} /> 방문 장소 {exploration.places.length}개
            </div>
          </div>
          <LineBadge lineName={exploration.lineName} lineColor={exploration.lineColor} />
        </div>

        <p className="mt-3 line-clamp-2 text-[14px] leading-6 text-[#3C3C43] dark:text-white/70">
          {exploration.summaryMemo}
        </p>

        <div className="mt-3 space-y-2">
          {exploration.places.slice(0, 2).map((place) => (
            <div key={place.id} className="rounded-xl bg-[#F2F2F7] p-3 dark:bg-[#2C2C2E]">
              <div className="truncate text-[13px] font-medium">{place.name}</div>
              <div className="mt-1 flex items-center gap-2">
                <PlaceTypeBadge typeLabel={place.typeLabel} />
                <span className="flex items-center gap-0.5 text-[11px] text-yellow-500">
                  <Star size={11} fill="currentColor" /> {place.rating}
                </span>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-3 flex items-center justify-between text-[12px] text-[#8E8E93]">
          <span>{exploration.visitedAt}</span>
          {exploration.places.length > 2 && <span>외 {exploration.places.length - 2}곳</span>}
        </div>
      </div>
    </div>
  );
}
