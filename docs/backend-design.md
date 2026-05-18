# Roamit 백엔드 설계

## 전체 아키텍처

```
[Next.js 프론트엔드]
        ↓
[Next.js BFF - /app/api]   ← 인증 토큰 관리, 응답 가공
        ↓
      Nginx (맥미니)
        ├── /api/**      → Spring Boot (비즈니스 로직)
        └── /uploads/**  → 로컬 파일 디렉토리 (static serving)
                ↓
           MongoDB (맥미니)
```

---

## 기술 스택

| 레이어 | 기술 |
|--------|------|
| 프론트엔드 | Next.js (App Router) |
| BFF | Next.js Route Handlers |
| API 서버 | Kotlin + Spring Boot |
| DB | MongoDB |
| 인증 | Kakao OAuth2 + JWT |
| 파일 저장 | 맥미니 로컬 디렉토리 + Nginx static serving |
| 리버스 프록시 | Nginx |

---

## MongoDB 컬렉션 설계

### users
```json
{
  "_id": "ObjectId",
  "kakaoId": "string",
  "nickname": "string",
  "profileImage": "string | null",
  "createdAt": "Date"
}
```

### stations
정적 데이터. 서버 시작 시 seed.

```json
{
  "_id": "string",
  "name": "string",
  "lines": [
    {
      "lineId": "string",
      "lineName": "string",
      "lineColor": "string"
    }
  ]
}
```

### explorations
```json
{
  "_id": "ObjectId",
  "userId": "ObjectId",
  "stationId": "string",
  "stationName": "string",
  "lines": [
    {
      "lineId": "string",
      "lineName": "string",
      "lineColor": "string"
    }
  ],
  "summaryMemo": "string",
  "visitedAt": "Date",
  "photos": ["string"],
  "places": [
    {
      "id": "string",
      "name": "string",
      "type": "string",
      "typeLabel": "string",
      "memo": "string",
      "rating": "number",
      "photos": ["string"]
    }
  ],
  "createdAt": "Date"
}
```

> `lines`는 기록 시점의 역 호선 스냅샷. 역 데이터가 바뀌어도 기록은 보존.

### 방문 여부
별도 컬렉션 없이 explorations에서 파생.
`userId + stationId`로 exploration이 존재하면 방문한 역.

---

## API 설계

### 인증

| Method | Spring Boot | 설명 |
|--------|-------------|------|
| GET | `/auth/kakao` | 카카오 OAuth2 시작 |
| GET | `/auth/kakao/callback` | 콜백 처리 → JWT 발급 |
| POST | `/auth/refresh` | access token 재발급 |
| DELETE | `/auth/logout` | refresh token 무효화 |

### 역

| Method | Spring Boot | 설명 |
|--------|-------------|------|
| GET | `/stations` | 전체 역 목록 (유저의 방문 여부 포함) |

### 탐험 기록

| Method | Spring Boot | 설명 |
|--------|-------------|------|
| GET | `/explorations` | 내 탐험 목록 |
| POST | `/explorations` | 탐험 저장 |
| GET | `/explorations/:id` | 탐험 상세 |
| DELETE | `/explorations/:id` | 탐험 삭제 |

### 파일 업로드

| Method | Spring Boot | 설명 |
|--------|-------------|------|
| POST | `/photos/upload` | 사진 업로드 → URL 반환 |

**파일 저장 방식**
- Spring Boot가 multipart 파일을 받아 맥미니 로컬 디렉토리에 저장
- 저장 경로: `/var/roamit/uploads/{userId}/{uuid}.jpg`
- 반환 URL: `https://도메인/uploads/{userId}/{uuid}.jpg`
- Nginx가 `/uploads/**` 경로를 해당 디렉토리로 직접 서빙
- Spring Boot는 파일 서빙에 관여하지 않음

### 프로필 / 통계

| Method | Spring Boot | 설명 |
|--------|-------------|------|
| GET | `/profile/me` | 내 프로필 |
| GET | `/profile/stats` | 탐험 통계 (총 거리, 연속 일수 등) |

---

## 어드민

Spring Boot 내부에 Thymeleaf + HTMX로 구성. 별도 프론트 세팅 없음.

**경로**: `/admin/**`
**인증**: Spring Security 세션 기반 (JWT와 별도 분리)

**기능**
- 뱃지 CRUD (조건, 아이콘, 색상 설정)
- 역 데이터 조회/수정
- 유저 목록 조회

---

## BFF 역할 (Next.js /app/api)

- Spring Boot API 호출 후 응답을 프론트 타입에 맞게 가공
- access token을 Authorization 헤더에 주입 (프론트는 토큰 직접 관리 안 함)
- refresh token은 httpOnly 쿠키로 관리

```
프론트 → BFF /api/explorations
           → Spring Boot /explorations (Authorization: Bearer <token>)
           ← 응답 가공 후 반환
```

---

## 인증 플로우

```
1. 프론트 → BFF /api/auth/kakao
2. BFF → 카카오 OAuth 페이지로 redirect
3. 카카오 → BFF /api/auth/callback?code=xxx
4. BFF → Spring Boot /auth/kakao/callback { code }
5. Spring Boot → 카카오 토큰 교환 → 유저 조회/생성 → JWT 발급
6. Spring Boot → BFF { accessToken, refreshToken }
7. BFF → refreshToken을 httpOnly 쿠키에 저장
        → accessToken을 메모리(또는 세션)에 보관
8. 이후 API 요청: BFF가 accessToken 헤더에 주입
```

### JWT 구성
- **access token**: 만료 1시간, userId 포함
- **refresh token**: 만료 30일, DB에 저장 (로그아웃 시 무효화 가능)

---

## 미결 사항

- [x] 사진 저장: Nginx static serving (`/uploads/**` → 로컬 디렉토리)
- [x] 역 데이터: ODsay API 또는 data.go.kr에서 1회 수집 → JSON 정제 → 서버 시작 시 MongoDB seed. 이후 외부 API 의존 없이 DB에서만 조회.
- [x] refresh token rotation 미적용. 만료 기간(30일) 내 재사용. 추후 보안 요구사항 생기면 추가.
- [x] 어드민: Spring Boot + Thymeleaf + HTMX. `/admin/**` 경로, Spring Security 세션 인증으로 JWT와 분리.
- [x] 뱃지: 탐험 저장 시점에 서버에서 조건 체크 → 달성 시 users 컬렉션에 저장 → 프로필 조회 시 DB에서 읽어옴. 조건 타입은 Spring Boot enum으로 관리, 어드민에서 선택. 새 조건 타입 추가 시 로직 구현 후 배포 필요.
