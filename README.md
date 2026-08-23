# Roamit

서울 지하철역을 랜덤으로 뽑아 근처 동네를 탐험하고, 방문한 장소를 기록하는 모바일 앱입니다.

## 핵심 흐름

**랜덤 역 뽑기 → 탐험 시작 → 장소 리뷰 작성 → 탐험 기록 저장 → 역 수집**

## 기술 스택

- **Next.js 16** (App Router) · **React 19** · **TypeScript**
- **Tailwind CSS v4** · **shadcn/ui** (radix-nova)
- **Framer Motion**
- **백엔드:** 별도 `roamit-api` 프로젝트의 **NestJS · Prisma · PostgreSQL**

## 시작하기

```bash
npm install
npm run dev
```

`http://localhost:3000` 에서 확인할 수 있습니다.

## 주요 명령어

```bash
npm run dev      # 개발 서버 실행
npm run build    # 프로덕션 빌드
npm run lint     # ESLint 실행
```

## 프로젝트 구조

```
types/          # 도메인 타입 (Station, Exploration, PlaceReview)
mock/           # 목 데이터 및 앱 설정
services/       # 서비스 레이어 (stationService, explorationService)
components/     # 공유 UI 컴포넌트 (AppShell, ExplorationCard 등)
features/       # 화면 단위 컴포넌트
  home/         # 홈
  random/       # 랜덤 역 뽑기
  active/       # 탐험 진행 중
  create/       # 탐험 기록 작성
  logs/         # 탐험 기록 목록
  collection/   # 역 수집 현황
  profile/      # 내 정보
app/            # Next.js App Router 진입점
```

## 현재 MVP 범위

현재 화면 대부분은 목 데이터로 동작하며 서비스 레이어를 통해 API로 전환하는 중입니다. 별도 `roamit-api` 프로젝트에 역 목록/무작위 역 API가 구현되어 있고, 인증과 탐험 기록 API는 구현 예정입니다. GPS 검증, 지도 연동, 소셜 기능은 아직 지원하지 않습니다.
