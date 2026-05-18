import type { Station } from "@/types";

export const stations: Station[] = [
  { id: "s1", name: "성수", lines: [{ lineId: "2", lineName: "2호선", lineColor: "#00A84D" }], visited: true },
  { id: "s2", name: "망원", lines: [{ lineId: "6", lineName: "6호선", lineColor: "#CD7C2F" }], visited: false },
  { id: "s3", name: "을지로3가", lines: [{ lineId: "2", lineName: "2호선", lineColor: "#00A84D" }, { lineId: "3", lineName: "3호선", lineColor: "#EF7C1C" }], visited: true },
  { id: "s4", name: "혜화", lines: [{ lineId: "4", lineName: "4호선", lineColor: "#00A5DE" }], visited: false },
  { id: "s5", name: "연남", lines: [{ lineId: "G", lineName: "경의중앙", lineColor: "#77C4A3" }], visited: false },
  { id: "s6", name: "합정", lines: [{ lineId: "2", lineName: "2호선", lineColor: "#00A84D" }, { lineId: "6", lineName: "6호선", lineColor: "#CD7C2F" }], visited: false },
  { id: "s7", name: "공덕", lines: [{ lineId: "5", lineName: "5호선", lineColor: "#996CAC" }, { lineId: "6", lineName: "6호선", lineColor: "#CD7C2F" }, { lineId: "A", lineName: "공항철도", lineColor: "#0065B3" }], visited: false },
  { id: "s8", name: "녹사평", lines: [{ lineId: "6", lineName: "6호선", lineColor: "#CD7C2F" }], visited: false },
  { id: "s9", name: "사당", lines: [{ lineId: "2", lineName: "2호선", lineColor: "#00A84D" }, { lineId: "4", lineName: "4호선", lineColor: "#00A5DE" }], visited: false },
];
