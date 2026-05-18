@AGENTS.md

# CLAUDE.md

## Project Overview

This project is called **Roamit**.

Roamit is a mobile-first Seoul subway exploration app.

Users:
- randomly pick subway stations
- explore nearby neighborhoods
- create exploration logs
- add multiple place reviews within a single exploration

The app is NOT:
- a navigation app
- a restaurant recommendation platform
- a social media service

The core experience is:
- randomness
- urban exploration
- emotional travel journaling
- collecting visited stations
- lightweight gamification

---

# Tech Stack

- Next.js App Router
- React
- TypeScript
- TailwindCSS
- shadcn/ui
- Framer Motion

Future-ready:
- Zustand
- TanStack Query
- PostgreSQL
- Prisma
- Backend API integration

---

# Product Direction

The application should feel:
- cinematic
- modern
- minimal
- cozy
- exploration-focused

The UI should resemble:
- modern travel apps
- urban exploration journals
- collection-based mobile apps

Avoid:
- enterprise dashboard UI
- cluttered layouts
- food delivery app aesthetics
- overly colorful gaming UI

---

# UX Priorities

Highest priority:
1. Mobile UX quality
2. Exploration flow
3. Emotional engagement
4. Collection motivation
5. Fast interaction

Important flow:

Random Station
→ Start Exploration
→ Add Place Reviews
→ Save Exploration
→ View Exploration History

---

# Current MVP Scope

Implemented or planned:

- Home screen
- Random station picker
- Exploration flow
- Exploration logs
- Multiple place reviews per exploration
- Collection/progress screen
- Profile screen
- Badge system
- Mock data architecture

Not implemented yet:
- backend APIs
- authentication
- GPS verification
- social features
- AI recommendations
- trending systems
- real map integrations

---

# Architecture Goals

The codebase should be structured for future scalability.

Preferred structure:

src/
features/
components/
services/
hooks/
utils/
types/
mock/

Avoid:
- giant single-file components
- direct mock data usage inside UI
- tightly coupled state

Use service layer abstraction.

Examples:
- getStations()
- getRandomStation()
- getExplorations()
- createExploration()
- getUserStats()

---

# Data Model

## Station
A station can serve multiple lines (환승역). `lines` is always a non-empty array.

```
Station
- id
- name
- lines: StationLine[]   ← one entry per line passing through
- visited

StationLine
- lineId
- lineName
- lineColor
```

## Exploration
Snapshot of a single station visit. `lineName`/`lineColor` are the representative line at the time of recording (first entry of the station's `lines`).

```
Exploration
- id
- stationId
- stationName
- lineName       ← representative line (snapshot)
- lineColor
- summaryMemo
- visitedAt
- photos: string[]
- places: PlaceReview[]
```

## PlaceReview
One visited location within an exploration.

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

# Development Guidelines

- Mobile-first always
- Keep components small
- Use reusable UI patterns
- Use TypeScript types aggressively
- Prefer composition over large monolithic components
- Keep animations subtle
- Preserve visual consistency
- Maintain dark mode support

---

# Important Notes

This MVP should still feel enjoyable even with:
- no backend
- no social data
- no recommendation system

The product should work as a personal exploration journal first.

Focus on:
- smooth UX
- delightful interactions
- exploration atmosphere
- low friction logging