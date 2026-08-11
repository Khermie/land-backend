# TerraMatch — full-stack project

This mirrors the original repo layout: backend and frontend live
together under `land-backend/terramatch-backend/`.

- **`land-backend/terramatch-backend/`** — Spring Boot backend.
  Setup, running, and the full API reference are in this folder's
  `README.md`. What changed in this integration pass and why is in
  `CHANGELOG_INTEGRATION.md`.
- **`land-backend/terramatch-backend/front/`** — React/Vite frontend.
  Setup and running are in this folder's `README.md`. What's actually
  connected to the real backend vs. still running on local/demo data
  (and why) is in `FRONTEND_INTEGRATION_NOTES.md` — read this before
  assuming a given screen is fully wired up.

Quick start: run the backend first (it needs `DB_PASSWORD` and
`JWT_SECRET` set — see its README), then the frontend (`npm install &&
npm run dev`, with `.env` already pointing at
`http://localhost:8082`).
