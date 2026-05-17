import type { Exploration, PlaceReview, Station } from "@/types";

export function normalizePlaces(places: PlaceReview[]): PlaceReview[] {
  return places.map((place, index) => ({
    ...place,
    id: `p-${Date.now()}-${index}`,
    name: place.name || `방문 장소 ${index + 1}`,
    memo: place.memo || "짧게 둘러본 장소. 다음에 다시 기록해보기.",
  }));
}

export function createExploration(
  station: Station,
  summaryMemo: string,
  places: PlaceReview[],
): Exploration {
  const normalized = normalizePlaces(places);
  return {
    id: `e${Date.now()}`,
    stationId: station.id,
    stationName: station.name,
    lineName: station.lineName,
    lineColor: station.lineColor,
    summaryMemo: summaryMemo || `${station.name}역 근처에서 ${normalized.length}곳을 둘러봤다.`,
    visitedAt: "2026.05.17",
    coverPhoto:
      "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?q=80&w=900&auto=format&fit=crop",
    places: normalized,
  };
}
