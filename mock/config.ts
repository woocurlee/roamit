import { BookOpen, Coffee, Home, Map, Shuffle, Store, Trees, User, Utensils, Ticket } from "lucide-react";
import type React from "react";

type IconComponent = React.ComponentType<{ size?: number; className?: string; strokeWidth?: number }>;

export const placeTypes: { key: string; label: string; icon: IconComponent }[] = [
  { key: "restaurant", label: "식당", icon: Utensils },
  { key: "cafe", label: "카페", icon: Coffee },
  { key: "shop", label: "상점", icon: Store },
  { key: "walk", label: "산책", icon: Trees },
  { key: "exhibition", label: "전시/공연", icon: Ticket },
];

export const tabs: { key: string; label: string; icon: IconComponent; href: string }[] = [
  { key: "home", label: "홈", icon: Home, href: "/" },
  { key: "random", label: "뽑기", icon: Shuffle, href: "/random" },
  { key: "logs", label: "기록", icon: BookOpen, href: "/logs" },
  { key: "collection", label: "수집", icon: Map, href: "/collection" },
  { key: "profile", label: "내 정보", icon: User, href: "/profile" },
];
