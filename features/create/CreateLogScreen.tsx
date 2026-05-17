"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Camera, Plus, Star, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { LineBadge } from "@/components/LineBadge";
import { useApp } from "@/context/AppContext";
import { placeTypes } from "@/mock/config";
import { createExploration } from "@/services/explorationService";
import type { PlaceReview } from "@/types";

const makePlace = (): PlaceReview => ({
  id: `draft-${Date.now()}`,
  name: "",
  type: "cafe",
  typeLabel: "카페",
  memo: "",
  rating: 4,
  priceRange: "₩₩",
});

export function CreateLogScreen() {
  const router = useRouter();
  const { selectedStation, setExplorations } = useApp();
  const [summaryMemo, setSummaryMemo] = useState("");
  const [places, setPlaces] = useState<PlaceReview[]>([
    { ...makePlace(), id: "draft-1", type: "restaurant", typeLabel: "식당" },
  ]);

  const updatePlace = (id: string, patch: Partial<PlaceReview>) =>
    setPlaces((prev) => prev.map((p) => (p.id === id ? { ...p, ...patch } : p)));

  const addPlace = () => setPlaces((prev) => [...prev, makePlace()]);

  const removePlace = (id: string) =>
    setPlaces((prev) => (prev.length === 1 ? prev : prev.filter((p) => p.id !== id)));

  const save = async () => {
    if (!selectedStation) return;
    const exploration = await createExploration(selectedStation, summaryMemo, places);
    setExplorations((prev) => [exploration, ...prev]);
    router.push("/logs");
  };

  return (
    <div>
      <h1 className="text-2xl font-bold">탐험 기록 작성</h1>
      <p className="mt-2 text-sm text-white/55">한 번의 역 탐험 안에 여러 장소 리뷰를 남길 수 있어요.</p>

      <Card className="mt-6 border-white/10 bg-white/8 text-white shadow-2xl backdrop-blur">
        <CardContent className="p-5">
          <div className="flex items-center justify-between">
            <div className="text-lg font-semibold">
              {selectedStation ? `${selectedStation.name}역 탐험` : "선택된 역 없음"}
            </div>
            {selectedStation && (
              <LineBadge lineName={selectedStation.lineName} lineColor={selectedStation.lineColor} />
            )}
          </div>

          <div className="mt-5 flex h-36 items-center justify-center rounded-3xl border border-dashed border-white/20 bg-white/5 text-white/55">
            <div className="text-center">
              <Camera className="mx-auto mb-2" />
              <div className="text-sm">대표 사진 추가</div>
            </div>
          </div>

          <textarea
            value={summaryMemo}
            onChange={(e) => setSummaryMemo(e.target.value)}
            placeholder="오늘 이 역 근처는 어떤 느낌이었나요?"
            className="mt-5 h-24 w-full resize-none rounded-3xl border border-white/10 bg-black/30 p-4 text-sm text-white outline-none placeholder:text-white/35"
          />
        </CardContent>
      </Card>

      <div className="mt-6 flex items-center justify-between">
        <h2 className="text-lg font-semibold">방문 장소</h2>
        <button
          onClick={addPlace}
          className="inline-flex items-center gap-1 rounded-full bg-white px-3 py-2 text-xs font-medium text-black"
        >
          <Plus size={14} /> 장소 추가
        </button>
      </div>

      <div className="mt-4 space-y-4">
        {places.map((place, index) => (
          <Card key={place.id} className="border-white/10 bg-white/8 text-white shadow-xl backdrop-blur">
            <CardContent className="p-5">
              <div className="flex items-center justify-between">
                <div className="text-sm font-semibold text-white/75">장소 {index + 1}</div>
                <button
                  onClick={() => removePlace(place.id)}
                  disabled={places.length === 1}
                  className="rounded-full bg-white/10 p-2 text-white/45 disabled:opacity-30"
                >
                  <Trash2 size={15} />
                </button>
              </div>

              <input
                value={place.name}
                onChange={(e) => updatePlace(place.id, { name: e.target.value })}
                placeholder="장소명 입력"
                className="mt-4 h-12 w-full rounded-2xl border border-white/10 bg-black/30 px-4 text-sm text-white outline-none placeholder:text-white/35"
              />

              <div className="mt-3 flex gap-2 overflow-x-auto pb-1">
                {placeTypes.map((type) => {
                  const Icon = type.icon;
                  const active = place.type === type.key;
                  return (
                    <button
                      key={type.key}
                      onClick={() => updatePlace(place.id, { type: type.key, typeLabel: type.label })}
                      className={`inline-flex shrink-0 items-center gap-1 rounded-full px-3 py-2 text-xs ${
                        active ? "bg-white text-black" : "bg-white/10 text-white/65"
                      }`}
                    >
                      <Icon size={13} /> {type.label}
                    </button>
                  );
                })}
              </div>

              <textarea
                value={place.memo}
                onChange={(e) => updatePlace(place.id, { memo: e.target.value })}
                placeholder="이 장소는 어땠나요?"
                className="mt-4 h-24 w-full resize-none rounded-3xl border border-white/10 bg-black/30 p-4 text-sm text-white outline-none placeholder:text-white/35"
              />

              <div className="mt-4 flex items-center justify-between">
                <div>
                  <div className="mb-2 text-xs text-white/50">만족도</div>
                  <div className="flex gap-1">
                    {[1, 2, 3, 4, 5].map((n) => (
                      <button
                        key={n}
                        onClick={() => updatePlace(place.id, { rating: n })}
                        className={n <= place.rating ? "text-yellow-200" : "text-white/25"}
                      >
                        <Star fill="currentColor" size={20} />
                      </button>
                    ))}
                  </div>
                </div>
                <div>
                  <div className="mb-2 text-xs text-white/50">가격대</div>
                  <select
                    value={place.priceRange}
                    onChange={(e) => updatePlace(place.id, { priceRange: e.target.value })}
                    className="h-10 rounded-2xl border border-white/10 bg-black/40 px-3 text-sm text-white outline-none"
                  >
                    <option>₩</option>
                    <option>₩₩</option>
                    <option>₩₩₩</option>
                  </select>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <Button
        onClick={save}
        disabled={!selectedStation}
        className="mt-6 h-12 w-full rounded-2xl bg-white text-black hover:bg-white/90 disabled:opacity-40"
      >
        탐험 기록 저장하기
      </Button>
    </div>
  );
}
