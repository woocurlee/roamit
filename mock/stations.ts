import type { Station } from "@/types";

export const stations: Station[] = [
  { id: "s1", name: "성수", lineId: "2", lineName: "2호선", lineColor: "#00A84D", visited: true },
  { id: "s2", name: "망원", lineId: "6", lineName: "6호선", lineColor: "#CD7C2F", visited: false },
  { id: "s3", name: "을지로3가", lineId: "2", lineName: "2호선", lineColor: "#00A84D", visited: true },
  { id: "s4", name: "혜화", lineId: "4", lineName: "4호선", lineColor: "#00A5DE", visited: false },
  { id: "s5", name: "연남", lineId: "G", lineName: "경의중앙", lineColor: "#77C4A3", visited: false },
  { id: "s6", name: "합정", lineId: "2", lineName: "2호선", lineColor: "#00A84D", visited: false },
  { id: "s7", name: "공덕", lineId: "5", lineName: "5호선", lineColor: "#996CAC", visited: false },
  { id: "s8", name: "녹사평", lineId: "6", lineName: "6호선", lineColor: "#CD7C2F", visited: false },
];
