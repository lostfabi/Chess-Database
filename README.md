# Chess Database

A personal chess management app to track your tournaments and games. Store, replay, and analyze your chess games in one place.
For more information on features see: [GitHub Pages](https://lostfabi.github.io/Chess-Database/)

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

## CI Pipeline

The repository uses GitHub Actions for linting, documentation, and automated doc updates.

### AI-Powered Doc Tracking

On every push to `main`, a pipeline job uses the [Claude Code CLI](https://github.com/anthropics/claude-code) to analyze the git diff and automatically update the feature tracking files in `docs/`:

| File | Purpose |
| --- | --- |
| `docs/Implemented_Features.md` | Features whose implementation is complete |
| `docs/In_Progress.md` | Features partially implemented or actively being worked on |
| `docs/Planed_Features.md` | Planned features not yet started |

Claude reads the diff of each push, determines what changed, and moves or adds entries across the three files accordingly. The result is committed back to `main` automatically.

To use this in your own fork, add your Anthropic API key as a repository secret named `ANTHROPIC_API_KEY` under **Settings → Secrets and variables → Actions**.

## Getting Started

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.