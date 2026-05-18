import type { Station } from "@/types";

export async function getStations(): Promise<Station[]> {
  const res = await fetch("/api/stations");
  if (!res.ok) throw new Error("Failed to fetch stations");
  return res.json();
}

export function filterStations(stations: Station[], excludeVisited: boolean, lineId: string): Station[] {
  return stations.filter(
    (s) => (!excludeVisited || !s.visited) && (lineId === "all" || s.lines.some((l) => l.lineId === lineId)),
  );
}

export function getRandomStation(pool: Station[]): Station {
  return pool[Math.floor(Math.random() * pool.length)];
}
