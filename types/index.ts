export type StationLine = {
  lineId: string;
  lineName: string;
  lineColor: string;
};

export type Station = {
  id: string;
  name: string;
  lines: StationLine[];
  visited: boolean;
};

export type PlaceReview = {
  id: string;
  name: string;
  type: string;
  typeLabel: string;
  memo: string;
  rating: number;
  photos: string[];
};

export type Exploration = {
  id: string;
  stationId: string;
  stationName: string;
  lineName: string;
  lineColor: string;
  summaryMemo: string;
  visitedAt: string;
  photos: string[];
  places: PlaceReview[];
};
