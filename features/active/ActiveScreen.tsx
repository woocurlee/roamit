"use client";

import { useRouter } from "next/navigation";
import { Plus } from "lucide-react";
import { LineBadge } from "@/components/LineBadge";
import { useApp } from "@/context/AppContext";

export function ActiveScreen() {
  const router = useRouter();
  const { selectedStation } = useApp();

  return (
    <div className="space-y-4 py-4">
      <div>
        <h1 className="text-[22px] font-bold">탐험 진행 중</h1>
        <p className="mt-1 text-[14px] text-[#8E8E93]">방문한 식당, 카페, 장소를 하나씩 남겨보세요.</p>
      </div>

      <div className="rounded-3xl bg-white shadow-sm dark:bg-[#1C1C1E]">
        <div className="p-5">
          {selectedStation ? (
            <>
              <div className="flex flex-wrap gap-1.5">
                {selectedStation.lines.map((l) => (
                  <LineBadge key={l.lineId} lineName={l.lineName} lineColor={l.lineColor} />
                ))}
              </div>
              <div className="mt-3 text-[36px] font-black">{selectedStation.name}역</div>
              <div className="mt-2 text-[13px] text-[#8E8E93]">시작 시간 · 오늘 오후 2:30</div>
              <div className="mt-5 rounded-2xl bg-[#F2F2F7] p-4 text-[13px] leading-6 text-[#8E8E93] dark:bg-[#2C2C2E]">
                MVP에서는 장소 검색 API 없이 직접 장소명을 입력합니다. 나중에 카카오/네이버/구글 장소
                검색 API를 붙일 수 있는 구조예요.
              </div>
            </>
          ) : (
            <div className="py-4 text-[14px] text-[#8E8E93]">먼저 랜덤 역을 선택해주세요.</div>
          )}
          <button
            onClick={() => router.push("/create")}
            disabled={!selectedStation}
            className="mt-5 flex h-12 w-full items-center justify-center gap-2 rounded-2xl bg-[#3182F6] text-[15px] font-semibold text-white active:opacity-80 disabled:opacity-35"
          >
            <Plus size={18} /> 방문 장소 리뷰 작성하기
          </button>
        </div>
      </div>
    </div>
  );
}
