# Roamit 백엔드 설계

백엔드는 프론트엔드와 분리된 [`roamit-api`](https://github.com/woocurlee/roamit-api) 프로젝트에서 개발한다.

## 전체 아키텍처

```text
[Next.js 프론트엔드: roamit]
              ↓ HTTP/JSON
[NestJS API 서버: roamit-api]
              ↓ Prisma
         [PostgreSQL]
```

개발 환경의 API 문서는 백엔드 서버 실행 후 `http://localhost:3000/api-docs`에서 확인할 수 있다.

---

## 기술 스택

| 레이어 | 기술 |
|---|---|
| 프론트엔드 | Next.js App Router |
| API 서버 | TypeScript + NestJS |
| ORM | Prisma |
| DB | PostgreSQL |
| 인증 | Google OAuth2 + 자체 JWT |
| API 문서 | Swagger (OpenAPI) |

---

## 데이터 모델

관계형 데이터베이스를 기준으로 다음 모델을 사용한다.

| 영역 | 모델 | 역할 |
|---|---|---|
| 사용자/인증 | `User` | 사용자 프로필 |
| 사용자/인증 | `Account` | Google OAuth 계정 연결 |
| 사용자/인증 | `Session` | refresh token 해시와 만료/폐기 상태 |
| 지하철 | `Line` | 노선명, 영문명, 색상, 대표 노선 우선순위 |
| 지하철 | `Station` | 역명과 영문 slug 기반 ID |
| 지하철 | `StationLine` | 역과 노선의 N:M 관계 |
| 탐험 | `Exploration` | 단일 역 방문 기록과 당시 역/노선 스냅샷 |
| 탐험 | `PlaceReview` | 탐험 중 방문한 장소 리뷰 |

방문 여부는 별도 테이블에 저장하지 않고 사용자와 역에 연결된 `Exploration` 존재 여부로 계산한다.

상세 스키마와 제약 조건은 백엔드의 [`docs/DATABASE.md`](https://github.com/woocurlee/roamit-api/blob/main/docs/DATABASE.md)를 기준으로 한다.

---

## API 설계

### 인증

| Method | 경로 | 설명 |
|---|---|---|
| GET | `/auth/google` | Google OAuth 시작 |
| GET | `/auth/google/callback` | OAuth 콜백 처리 및 JWT 발급 |
| POST | `/auth/refresh` | refresh token 회전 및 access token 재발급 |
| POST | `/auth/logout` | 현재 refresh token 무효화 |

### 역

| Method | 경로 | 설명 |
|---|---|---|
| GET | `/stations` | 전체 역과 각 역의 노선 목록 조회 |
| GET | `/stations/random` | 무작위 역 한 개 조회 |

`Station.lines`는 노선의 `priority` 오름차순이며 첫 번째 항목을 대표 노선으로 사용한다.

### 탐험 기록

| Method | 경로 | 설명 |
|---|---|---|
| GET | `/explorations` | 내 탐험 목록을 최근 방문순으로 조회 |
| POST | `/explorations` | 장소 리뷰를 포함한 탐험 기록 생성 |
| GET | `/explorations/:id` | 장소 리뷰를 포함한 탐험 상세 조회 |
| POST | `/explorations/:id/places` | 기존 탐험에 장소 리뷰 추가 |

### 사용자

| Method | 경로 | 설명 |
|---|---|---|
| GET | `/me` | 현재 로그인한 사용자 프로필 |
| GET | `/me/stats` | 방문 역 수와 탐험 진행도 조회 |

---

## 인증 원칙

- access token은 서버에 저장하지 않는 짧은 수명의 JWT로 사용한다.
- refresh token은 클라이언트의 `httpOnly`, `Secure`, `SameSite` 쿠키로 전달한다.
- 서버에는 refresh token 원문 대신 해시를 `Session`에 저장한다.
- refresh 요청마다 token rotation을 적용하고 로그아웃 시 세션을 폐기한다.

---

## 현재 구현 상태

구현 완료:

- NestJS, Prisma, PostgreSQL 기본 구성
- 전체 데이터 모델과 마이그레이션
- 2·3호선 역/노선 시드 데이터
- `GET /stations`
- `GET /stations/random`
- Swagger 문서와 역 API 단위 테스트

구현 예정:

- Google OAuth 및 JWT 인증
- 탐험/장소 리뷰 API
- 사용자 프로필과 통계 API
- 사진 업로드 및 운영 배포 구성

백엔드의 구현 상태와 실행 방법은 [`roamit-api/README.md`](https://github.com/woocurlee/roamit-api/blob/main/README.md)를 함께 참고한다.
