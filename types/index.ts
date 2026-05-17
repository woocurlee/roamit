export type Station = {
  id: string;
  name: string;
  lineId: string;
  lineName: string;
  lineColor: string;
  visited: boolean;
};

export type PlaceReview = {
  id: string;
  name: string;
  type: string;
  typeLabel: string;
  memo: string;
  rating: number;
  priceRange: string;
};

export type Exploration = {
  id: string;
  stationId: string;
  stationName: string;
  lineName: string;
  lineColor: string;
  summaryMemo: string;
  visitedAt: string;
  coverPhoto: string;
  places: PlaceReview[];
};
