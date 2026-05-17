"use client";

import { useRouter } from "next/navigation";
import { Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { LineBadge } from "@/components/LineBadge";
import { useApp } from "@/context/AppContext";

export function ActiveScreen() {
  const router = useRouter();
  const { selectedStation } = useApp();

  return (
    <div>
      <h1 className="text-2xl font-bold">탐험 진행 중</h1>
      <p className="mt-2 text-sm text-white/55">
        역 근처에서 방문한 식당, 카페, 장소를 하나씩 남겨보세요.
      </p>
      <Card className="mt-6 border-white/10 bg-white/8 text-white shadow-2xl backdrop-blur">
        <CardContent className="p-6">
          {selectedStation ? (
            <>
              <LineBadge lineName={selectedStation.lineName} lineColor={selectedStation.lineColor} />
              <div className="mt-4 text-4xl font-black">{selectedStation.name}역</div>
              <div className="mt-3 text-sm text-white/55">시작 시간 · 오늘 오후 2:30</div>
              <div className="mt-8 rounded-3xl bg-white/10 p-4 text-sm leading-6 text-white/70">
                MVP에서는 장소 검색 API 없이 직접 장소명을 입력합니다. 나중에 카카오/네이버/구글 장소
                검색 API를 붙일 수 있는 구조예요.
              </div>
            </>
          ) : (
            <div className="text-white/60">먼저 랜덤 역을 선택해주세요.</div>
          )}
          <Button
            onClick={() => router.push("/create")}
            disabled={!selectedStation}
            className="mt-6 h-12 w-full rounded-2xl bg-white text-black hover:bg-white/90 disabled:opacity-40"
          >
            <Plus className="mr-2" size={18} /> 방문 장소 리뷰 작성하기
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
