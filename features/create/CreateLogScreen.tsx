"use client";

import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { Camera, ChevronDown, ImagePlus, Plus, Search, Star, Trash2, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { LineBadge } from "@/components/LineBadge";
import { useApp } from "@/context/AppContext";
import { placeTypes } from "@/mock/config";
import { createExploration } from "@/services/explorationService";
import { getStations } from "@/services/stationService";
import type { PlaceReview, Station } from "@/types";

const makePlace = (): PlaceReview => ({
  id: `draft-${Date.now()}`,
  name: "",
  type: "cafe",
  typeLabel: "카페",
  memo: "",
  rating: 5,
  photos: [],
});

export function CreateLogScreen() {
  const router = useRouter();
  const { selectedStation, setSelectedStation, setExplorations } = useApp();
  const [allStations, setAllStations] = useState<Station[]>([]);
  const [stationQuery, setStationQuery] = useState("");
  const [isPickingStation, setIsPickingStation] = useState(!selectedStation);

  useEffect(() => {
    getStations().then(setAllStations).catch(console.error);
  }, []);

  useEffect(() => {
    if (!selectedStation) setIsPickingStation(true);
  }, [selectedStation]);

  const filteredStations = stationQuery.trim()
    ? allStations.filter((s) =>
        s.name.includes(stationQuery.trim()) ||
        s.lines.some((l) => l.lineName.includes(stationQuery.trim()))
      )
    : allStations.slice(0, 20);

  const pickStation = (station: Station) => {
    setSelectedStation(station);
    setIsPickingStation(false);
    setStationQuery("");
  };
  const [summaryMemo, setSummaryMemo] = useState("");
  const [explorationPhotos, setExplorationPhotos] = useState<string[]>([]);
  const [places, setPlaces] = useState<PlaceReview[]>([
    { ...makePlace(), id: "draft-1", type: "restaurant", typeLabel: "식당" },
  ]);

  const explorationPhotoRef = useRef<HTMLInputElement>(null);
  const placePhotoRef = useRef<HTMLInputElement>(null);
  const activePlaceId = useRef<string | null>(null);

  const updatePlace = (id: string, patch: Partial<PlaceReview>) =>
    setPlaces((prev) => prev.map((p) => (p.id === id ? { ...p, ...patch } : p)));

  const addPlace = () => setPlaces((prev) => prev.length >= 5 ? prev : [...prev, makePlace()]);

  const removePlace = (id: string) =>
    setPlaces((prev) => (prev.length === 1 ? prev : prev.filter((p) => p.id !== id)));

  const handleExplorationPhotos = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) return;
    const urls = Array.from(e.target.files).map((f) => URL.createObjectURL(f));
    setExplorationPhotos((prev) => [...prev, ...urls].slice(0, 3));
    e.target.value = "";
  };

  const removeExplorationPhoto = (i: number) =>
    setExplorationPhotos((prev) => prev.filter((_, idx) => idx !== i));

  const handlePlacePhotos = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files || !activePlaceId.current) return;
    const id = activePlaceId.current;
    const [file] = Array.from(e.target.files);
    if (!file) return;
    const url = URL.createObjectURL(file);
    setPlaces((prev) =>
      prev.map((p) => (p.id === id && p.photos.length === 0 ? { ...p, photos: [url] } : p))
    );
    e.target.value = "";
  };

  const removePlacePhoto = (placeId: string, i: number) =>
    setPlaces((prev) =>
      prev.map((p) => (p.id === placeId ? { ...p, photos: p.photos.filter((_, idx) => idx !== i) } : p))
    );

  const openPlacePhotoPicker = (placeId: string) => {
    activePlaceId.current = placeId;
    placePhotoRef.current?.click();
  };

  const save = async () => {
    if (!selectedStation) return;
    const exploration = await createExploration(selectedStation, summaryMemo, places);
    exploration.photos = explorationPhotos;
    setExplorations((prev) => [exploration, ...prev]);
    router.push("/logs");
  };

  return (
    <div>
      <h1 className="text-2xl font-bold">탐험 기록 작성</h1>
      <p className="mt-2 text-sm text-slate-500 dark:text-white/55">
        한 번의 역 탐험 안에 여러 장소 리뷰를 남길 수 있어요.
      </p>

      {/* Exploration card */}
      <Card className="mt-6 border-black/8 bg-white dark:border-white/10 dark:bg-white/8">
        <CardContent className="p-5">
          {/* Station selector */}
          {isPickingStation ? (
            <div>
              <p className="mb-3 text-sm font-semibold text-slate-700 dark:text-white/80">탐험할 역 선택</p>
              <div className="relative mb-3">
                <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 dark:text-white/35" />
                <input
                  value={stationQuery}
                  onChange={(e) => setStationQuery(e.target.value)}
                  placeholder="역 이름 검색"
                  className="h-10 w-full rounded-2xl border border-black/10 bg-black/3 pl-8 pr-4 text-sm text-slate-900 outline-none placeholder:text-slate-400 dark:border-white/10 dark:bg-black/30 dark:text-white dark:placeholder:text-white/35"
                />
              </div>
              <div className="max-h-48 overflow-y-auto rounded-2xl border border-black/8 dark:border-white/10">
                {filteredStations.map((station) => (
                  <button
                    key={station.id}
                    onClick={() => pickStation(station)}
                    className="flex w-full items-center justify-between px-4 py-3 text-sm transition hover:bg-black/5 dark:hover:bg-white/8 [&:not(:last-child)]:border-b [&:not(:last-child)]:border-black/5 dark:[&:not(:last-child)]:border-white/8"
                  >
                    <span className="font-medium text-slate-900 dark:text-white">{station.name}역</span>
                    <div className="flex gap-1">
                      {station.lines.map((l) => (
                        <LineBadge key={l.lineId} lineName={l.lineName} lineColor={l.lineColor} />
                      ))}
                    </div>
                  </button>
                ))}
                {filteredStations.length === 0 && (
                  <p className="px-4 py-6 text-center text-sm text-slate-400 dark:text-white/35">검색 결과가 없어요</p>
                )}
              </div>
            </div>
          ) : (
            <div className="flex items-center justify-between">
              <div className="text-lg font-semibold">
                {selectedStation ? `${selectedStation.name}역 탐험` : "선택된 역 없음"}
              </div>
              <div className="flex items-center gap-2">
                {selectedStation && (
                  <div className="flex gap-1">
                    {selectedStation.lines.map((l) => (
                      <LineBadge key={l.lineId} lineName={l.lineName} lineColor={l.lineColor} />
                    ))}
                  </div>
                )}
                <button
                  onClick={() => setIsPickingStation(true)}
                  className="flex items-center gap-0.5 rounded-full bg-black/5 px-2.5 py-1.5 text-xs text-slate-500 transition hover:bg-black/10 dark:bg-white/10 dark:text-white/55 dark:hover:bg-white/15"
                >
                  변경 <ChevronDown size={12} />
                </button>
              </div>
            </div>
          )}

          {/* Exploration photos + memo — only after station is chosen */}
          {!isPickingStation && (
            <>
              <div className="mt-5">
                <input
                  ref={explorationPhotoRef}
                  type="file"
                  accept="image/*"
                  multiple
                  className="hidden"
                  onChange={handleExplorationPhotos}
                />
                <div className="flex gap-2 overflow-x-auto pb-1">
                  {explorationPhotos.map((url, i) => (
                    <div key={i} className="relative h-24 w-24 shrink-0 overflow-hidden rounded-2xl">
                      <img src={url} className="h-full w-full object-cover" alt="" />
                      <button
                        onClick={() => removeExplorationPhoto(i)}
                        className="absolute right-1 top-1 rounded-full bg-black/60 p-0.5 text-white"
                      >
                        <X size={12} />
                      </button>
                    </div>
                  ))}
                  {explorationPhotos.length < 3 && (
                    <button
                      onClick={() => explorationPhotoRef.current?.click()}
                      className="flex h-24 w-24 shrink-0 flex-col items-center justify-center gap-1 rounded-2xl border border-dashed border-black/15 bg-black/3 text-slate-400 dark:border-white/20 dark:bg-white/5 dark:text-white/40"
                    >
                      <Camera size={20} />
                      <span className="text-[11px]">사진 추가</span>
                    </button>
                  )}
                </div>
              </div>

              <textarea
                value={summaryMemo}
                onChange={(e) => setSummaryMemo(e.target.value)}
                placeholder="오늘 이 역 근처는 어떤 느낌이었나요?"
                className="mt-4 h-24 w-full resize-none rounded-3xl border border-black/10 bg-black/3 p-4 text-sm text-slate-900 outline-none placeholder:text-slate-400 dark:border-white/10 dark:bg-black/30 dark:text-white dark:placeholder:text-white/35"
              />
            </>
          )}
        </CardContent>
      </Card>

      {/* Place list + save — only when station is selected */}
      {!isPickingStation && selectedStation && (
        <>
          <div className="mt-6 flex items-center justify-between">
            <h2 className="text-lg font-semibold">방문 장소 <span className="text-sm font-normal text-slate-400 dark:text-white/40">{places.length}/5</span></h2>
            {places.length < 5 && (
              <button
                onClick={addPlace}
                className="inline-flex items-center gap-1 rounded-full bg-slate-900 px-3 py-2 text-xs font-medium text-white dark:bg-white dark:text-black"
              >
                <Plus size={14} /> 장소 추가
              </button>
            )}
          </div>

          <input
            ref={placePhotoRef}
            type="file"
            accept="image/*"
            multiple
            className="hidden"
            onChange={handlePlacePhotos}
          />

          <div className="mt-4 space-y-4">
            {places.map((place, index) => (
              <Card key={place.id} className="border-black/8 bg-white dark:border-white/10 dark:bg-white/8">
                <CardContent className="px-5 pb-5">
                  <div className="flex justify-end">
                    <button
                      onClick={() => removePlace(place.id)}
                      disabled={places.length === 1}
                      className="rounded-full bg-black/5 p-2 text-slate-400 disabled:opacity-30 dark:bg-white/10 dark:text-white/45"
                    >
                      <Trash2 size={15} />
                    </button>
                  </div>
                  <div className="mt-2 flex items-center justify-between">
                    <div className="text-sm font-semibold text-slate-500 dark:text-white/75">장소 {index + 1}</div>
                    <div className="flex gap-0.5">
                      {[1, 2, 3, 4, 5].map((n) => (
                        <button
                          key={n}
                          onClick={() => updatePlace(place.id, { rating: n })}
                          className={n <= place.rating ? "text-yellow-500 dark:text-yellow-200" : "text-slate-300 dark:text-white/25"}
                        >
                          <Star fill="currentColor" size={16} />
                        </button>
                      ))}
                    </div>
                  </div>

                  <input
                    value={place.name}
                    onChange={(e) => updatePlace(place.id, { name: e.target.value })}
                    placeholder="장소명 입력"
                    className="mt-4 h-12 w-full rounded-2xl border border-black/10 bg-black/3 px-4 text-sm text-slate-900 outline-none placeholder:text-slate-400 dark:border-white/10 dark:bg-black/30 dark:text-white dark:placeholder:text-white/35"
                  />

                  <div className="mt-3 flex gap-2 overflow-x-auto pb-1">
                    {placeTypes.map((type) => {
                      const Icon = type.icon;
                      const active = place.type === type.key;
                      return (
                        <button
                          key={type.key}
                          onClick={() => updatePlace(place.id, { type: type.key, typeLabel: type.label })}
                          className={`inline-flex shrink-0 items-center gap-1 rounded-full px-3 py-2 text-xs transition ${
                            active
                              ? "bg-slate-900 text-white dark:bg-white dark:text-black"
                              : "bg-black/5 text-slate-600 dark:bg-white/10 dark:text-white/65"
                          }`}
                        >
                          <Icon size={13} /> {type.label}
                        </button>
                      );
                    })}
                  </div>

                  {/* Place photos */}
                  <div className="mt-4 flex gap-2 overflow-x-auto pb-1">
                    {place.photos.map((url, i) => (
                      <div key={i} className="relative h-20 w-20 shrink-0 overflow-hidden rounded-xl">
                        <img src={url} className="h-full w-full object-cover" alt="" />
                        <button
                          onClick={() => removePlacePhoto(place.id, i)}
                          className="absolute right-1 top-1 rounded-full bg-black/60 p-0.5 text-white"
                        >
                          <X size={11} />
                        </button>
                      </div>
                    ))}
                    {place.photos.length === 0 && (
                      <button
                        onClick={() => openPlacePhotoPicker(place.id)}
                        className="flex h-20 w-20 shrink-0 flex-col items-center justify-center gap-1 rounded-xl border border-dashed border-black/15 bg-black/3 text-slate-400 dark:border-white/20 dark:bg-white/5 dark:text-white/40"
                      >
                        <ImagePlus size={18} />
                        <span className="text-[10px]">사진</span>
                      </button>
                    )}
                  </div>

                  <textarea
                    value={place.memo}
                    onChange={(e) => updatePlace(place.id, { memo: e.target.value })}
                    placeholder="이 장소는 어땠나요?"
                    className="mt-4 h-24 w-full resize-none rounded-3xl border border-black/10 bg-black/3 p-4 text-sm text-slate-900 outline-none placeholder:text-slate-400 dark:border-white/10 dark:bg-black/30 dark:text-white dark:placeholder:text-white/35"
                  />
                </CardContent>
              </Card>
            ))}
          </div>

          <Button
            onClick={save}
            className="mt-6 h-12 w-full rounded-2xl bg-slate-900 text-white hover:bg-slate-800 dark:bg-white dark:text-black dark:hover:bg-white/90"
          >
            탐험 기록 저장하기
          </Button>
        </>
      )}
    </div>
  );
}
