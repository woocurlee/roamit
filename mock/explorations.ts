import type { Exploration } from "@/types";

export const initialExplorations: Exploration[] = [
  {
    id: "e1",
    stationId: "s1",
    stationName: "성수",
    lineName: "2호선",
    lineColor: "#00A84D",
    summaryMemo: "골목마다 작은 카페와 편집샵이 숨어 있어서 천천히 걷기 좋았다.",
    visitedAt: "2026.05.12",
    coverPhoto: "https://images.unsplash.com/photo-1519608487953-e999c86e7455?q=80&w=900&auto=format&fit=crop",
    places: [
      {
        id: "p1",
        name: "포인트 오브 뷰",
        type: "shop",
        typeLabel: "상점",
        memo: "문구와 소품 구경하기 좋은 곳. 조용히 둘러보기 좋았다.",
        rating: 4,
        priceRange: "₩₩",
      },
      {
        id: "p2",
        name: "골목 카페",
        type: "cafe",
        typeLabel: "카페",
        memo: "창가 자리가 좋고 혼자 쉬기 편했다.",
        rating: 4,
        priceRange: "₩₩",
      },
    ],
  },
  {
    id: "e2",
    stationId: "s3",
    stationName: "을지로3가",
    lineName: "2호선",
    lineColor: "#00A84D",
    summaryMemo: "오래된 간판과 조명이 섞인 분위기가 생각보다 좋았다.",
    visitedAt: "2026.05.09",
    coverPhoto: "https://images.unsplash.com/photo-1493246507139-91e8fad9978e?q=80&w=900&auto=format&fit=crop",
    places: [
      {
        id: "p3",
        name: "노포 골목집",
        type: "restaurant",
        typeLabel: "식당",
        memo: "혼밥하기엔 살짝 북적이지만 음식은 만족스러웠다.",
        rating: 5,
        priceRange: "₩",
      },
    ],
  },
];
