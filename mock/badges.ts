import { Train, Moon, Camera, Map, Coffee, Star, Flame, Zap, Award, Clock, Compass, Heart, Lock } from "lucide-react";
import type { LucideIcon } from "lucide-react";

export type Badge = {
  id: string;
  label: string;
  desc: string;
  icon: LucideIcon;
  color: string;
  bg: string;
  locked: boolean;
  hidden?: boolean;
};

export const badges: Badge[] = [
  {
    id: "first_explorer",
    label: "첫 발걸음",
    desc: "첫 탐험 기록 완료",
    icon: Compass,
    color: "#68df6e",
    bg: "rgba(104,223,110,0.12)",
    locked: false,
  },
  {
    id: "night_wanderer",
    label: "밤거리의 방랑자",
    desc: "심야 탐험 10회 완료",
    icon: Moon,
    color: "#aac7ff",
    bg: "rgba(170,199,255,0.12)",
    locked: false,
  },
  {
    id: "metro_mania",
    label: "메트로 매니아",
    desc: "모든 호선 탑승 완료",
    icon: Train,
    color: "#ffb692",
    bg: "rgba(255,182,146,0.12)",
    locked: false,
  },
  {
    id: "photo_eye",
    label: "도시의 시선",
    desc: "사진 100장 기록",
    icon: Camera,
    color: "#68df6e",
    bg: "rgba(104,223,110,0.12)",
    locked: false,
  },
  {
    id: "cafe_lover",
    label: "카페 투어러",
    desc: "카페 20곳 방문",
    icon: Coffee,
    color: "#ffb692",
    bg: "rgba(255,182,146,0.12)",
    locked: false,
  },
  {
    id: "hot_streak",
    label: "탐험 열정",
    desc: "7일 연속 탐험",
    icon: Flame,
    color: "#ff6b6b",
    bg: "rgba(255,107,107,0.12)",
    locked: false,
  },
  {
    id: "speed_explorer",
    label: "번개 탐험가",
    desc: "하루 3곳 이상 탐험",
    icon: Zap,
    color: "#aac7ff",
    bg: "rgba(170,199,255,0.12)",
    locked: true,
    hidden: true,
  },
  {
    id: "map_collector",
    label: "지도 수집가",
    desc: "10개 구 탐험 완료",
    icon: Map,
    color: "#68df6e",
    bg: "rgba(104,223,110,0.12)",
    locked: true,
  },
  {
    id: "five_star",
    label: "별점 부자",
    desc: "별점 5점 리뷰 50개",
    icon: Star,
    color: "#ffd700",
    bg: "rgba(255,215,0,0.12)",
    locked: true,
  },
  {
    id: "early_bird",
    label: "새벽 탐험가",
    desc: "오전 6시 이전 탐험 5회",
    icon: Clock,
    color: "#ffb692",
    bg: "rgba(255,182,146,0.12)",
    locked: true,
  },
  {
    id: "top_explorer",
    label: "탐험 마스터",
    desc: "탐험 기록 50회 달성",
    icon: Award,
    color: "#aac7ff",
    bg: "rgba(170,199,255,0.12)",
    locked: true,
  },
  {
    id: "local_lover",
    label: "동네 애정러",
    desc: "같은 역 5회 재방문",
    icon: Heart,
    color: "#ff6b6b",
    bg: "rgba(255,107,107,0.12)",
    locked: true,
  },
  {
    id: "first_class",
    label: "퍼스트 클래스",
    desc: "모든 뱃지 달성",
    icon: Lock,
    color: "#ffffff",
    bg: "rgba(255,255,255,0.05)",
    locked: true,
    hidden: true,
  },
];
