@AGENTS.md

# CLAUDE.md

## 프로젝트 개요

이 프로젝트의 이름은 **Roamit**입니다.

Roamit은 모바일 우선의 서울 지하철 탐험 앱입니다.

사용자는:
- 지하철역을 랜덤으로 뽑고
- 주변 동네를 탐험하며
- 탐험 로그를 작성하고
- 하나의 탐험 안에서 여러 장소 리뷰를 추가합니다

이 앱은 다음이 **아닙니다**:
- 네비게이션 앱
- 음식점 추천 플랫폼
- 소셜 미디어 서비스

핵심 경험:
- 랜덤성
- 도시 탐험
- 감성적인 여행 일기
- 방문한 역 컬렉팅
- 가벼운 게임화(gamification)

---

# 기술 스택

- Next.js App Router
- React
- TypeScript
- TailwindCSS
- shadcn/ui
- Framer Motion

미래 대비:
- Zustand
- TanStack Query

별도 백엔드 (`../roamit-api`):
- NestJS
- Prisma
- PostgreSQL
- Google OAuth2 + JWT (예정)

---

# 프로덕트 방향성

앱은 다음과 같은 느낌이어야 합니다:
- 시네마틱
- 모던
- 미니멀
- 아늑함
- 탐험 중심

UI는 다음을 닮아야 합니다:
- 현대적인 여행 앱
- 도시 탐험 저널
- 컬렉션 기반 모바일 앱

다음은 피하세요:
- 기업용 대시보드 UI
- 복잡하게 뒤엉킨 레이아웃
- 배달 앱 느낌의 디자인
- 지나치게 화려한 게임 UI

---

# UX 우선순위

가장 높은 우선순위:
1. 모바일 UX 품질
2. 탐험 플로우
3. 감성적 몰입감
4. 컬렉션 동기부여
5. 빠른 인터랙션

중요한 플로우:

랜덤 역 뽑기
→ 탐험 시작
→ 장소 리뷰 추가
→ 탐험 저장
→ 탐험 기록 보기

---

# 현재 MVP 범위

구현됨 또는 계획됨:

- 홈 화면
- 랜덤 역 선택기
- 탐험 플로우
- 탐험 로그
- 탐험당 복수 장소 리뷰
- 컬렉션/진행도 화면
- 프로필 화면
- 배지 시스템
- 목업 데이터 아키텍처

미구현:
- 인증 및 탐험 기록 API
- GPS 인증
- 소셜 기능
- AI 추천
- 트렌딩 시스템
- 실제 지도 연동

---

# 아키텍처 목표

코드베이스는 향후 확장성을 고려해 구조화되어야 합니다.

권장 구조:

src/
features/
components/
services/
hooks/
utils/
types/
mock/

다음을 피하세요:
- 거대한 단일 파일 컴포넌트
- UI 내부에서 목업 데이터 직접 사용
- 강하게 결합된 상태 관리

서비스 레이어 추상화를 사용하세요.

예시:
- getStations()
- getRandomStation()
- getExplorations()
- createExploration()
- getUserStats()

---

# 데이터 모델

## Station (역)
하나의 역은 여러 노선을 운행할 수 있습니다(환승역). `lines`는 항상 비어있지 않은 배열입니다.

```
Station
- id
- name
- lines: StationLine[]   ← 해당 역을 지나는 노선별 항목
- visited

StationLine
- lineId
- lineName
- lineColor
```

## Exploration (탐험)
단일 역 방문의 스냅샷. `lineName`/`lineColor`는 기록 시점의 대표 노선입니다(역의 `lines` 중 첫 번째 항목).

```
Exploration
- id
- stationId
- stationName
- lineName       ← 대표 노선 (스냅샷)
- lineColor
- summaryMemo
- visitedAt
- photos: string[]
- places: PlaceReview[]
```

## PlaceReview (장소 리뷰)
탐험 내에서 방문한 하나의 장소.

```
PlaceReview
- id
- name
- type
- typeLabel
- memo
- rating
- photos: string[]
```

---

# 개발 가이드라인

- 항상 모바일 우선
- 컴포넌트는 작게 유지
- 재사용 가능한 UI 패턴 사용
- TypeScript 타입을 적극 활용
- 거대한 단일 컴포넌트보다 조합(composition) 선호
- 애니메이션은 절제되게
- 시각적 일관성 유지
- 다크 모드 지원 유지

---

# 중요 사항

이 MVP는 다음이 없어도 즐거운 경험을 줄 수 있어야 합니다:
- 백엔드 연결 없이도 목 데이터로 실행 가능
- 소셜 데이터 없음
- 추천 시스템 없음

이 프로덕트는 우선 개인 탐험 일기로서 동작해야 합니다.

집중할 것:
- 부드러운 UX
- 기분 좋은 인터랙션
- 탐험적 분위기
- 낮은 마찰의 로깅
