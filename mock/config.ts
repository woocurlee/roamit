import { BookOpen, Coffee, Home, Map, Shuffle, Store, Trees, User, Utensils } from "lucide-react";
import type React from "react";

type IconComponent = React.ComponentType<{ size?: number; className?: string }>;

export const placeTypes: { key: string; label: string; icon: IconComponent }[] = [
  { key: "restaurant", label: "식당", icon: Utensils },
  { key: "cafe", label: "카페", icon: Coffee },
  { key: "shop", label: "상점", icon: Store },
  { key: "walk", label: "산책", icon: Trees },
];

export const tabs: { key: string; label: string; icon: IconComponent }[] = [
  { key: "home", label: "홈", icon: Home },
  { key: "random", label: "뽑기", icon: Shuffle },
  { key: "logs", label: "기록", icon: BookOpen },
  { key: "collection", label: "수집", icon: Map },
  { key: "profile", label: "내 정보", icon: User },
];
