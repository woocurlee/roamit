import type { Exploration, PlaceReview, Station } from "@/types";

export async function getExplorations(): Promise<Exploration[]> {
  const res = await fetch("/api/explorations");
  if (!res.ok) throw new Error("Failed to fetch explorations");
  return res.json();
}

export async function createExploration(
  station: Station,
  summaryMemo: string,
  places: PlaceReview[],
): Promise<Exploration> {
  const normalized = normalizePlaces(places);
  const now = new Date();
  const visitedAt = `${now.getFullYear()}.${String(now.getMonth() + 1).padStart(2, "0")}.${String(now.getDate()).padStart(2, "0")}`;

  const exploration: Exploration = {
    id: `e${Date.now()}`,
    stationId: station.id,
    stationName: station.name,
    lineName: station.lines[0].lineName,
    lineColor: station.lines[0].lineColor,
    summaryMemo: summaryMemo || `${station.name}역 근처에서 ${normalized.length}곳을 둘러봤다.`,
    visitedAt,
    photos: [],
    places: normalized,
  };

  const res = await fetch("/api/explorations", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(exploration),
  });
  if (!res.ok) throw new Error("Failed to create exploration");
  return res.json();
}

function normalizePlaces(places: PlaceReview[]): PlaceReview[] {
  return places.map((place, index) => ({
    ...place,
    id: `p-${Date.now()}-${index}`,
    name: place.name || `방문 장소 ${index + 1}`,
    memo: place.memo || "짧게 둘러본 장소. 다음에 다시 기록해보기.",
  }));
}
