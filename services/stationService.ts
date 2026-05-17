import { stations } from "@/mock/stations";
import type { Station } from "@/types";

export function getStations(): Station[] {
  return stations;
}

export function filterStations(excludeVisited: boolean, lineId: string): Station[] {
  return stations.filter(
    (s) => (!excludeVisited || !s.visited) && (lineId === "all" || s.lineId === lineId),
  );
}

export function getRandomStation(pool: Station[]): Station {
  return pool[Math.floor(Math.random() * pool.length)];
}
