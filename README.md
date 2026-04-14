# Chess Database

A personal chess management app to track your tournaments and games. Store, replay, and analyze your chess games in one place.

## Features

- **Tournament management** — create, edit, and delete tournaments with status tracking (upcoming, ongoing, completed)
- **Game logging** — record games with player names, results, and full PGN notation
- **Game replay** — step through moves on an interactive board
- **Analysis board** — analyze positions with an interactive chessboard
- **Authentication** — secure login and registration with session management

## Tech Stack

- **Framework:** Next.js 15 (App Router)
- **Language:** TypeScript
- **Database:** PostgreSQL via Supabase
- **Auth:** NextAuth v5
- **Chess:** chess.js + react-chessboard
- **Styling:** Tailwind CSS v4
- **Validation:** Zod

## Getting Started

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.