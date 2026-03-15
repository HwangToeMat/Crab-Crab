# System Architecture: Mood-Ge (무드게)

## 1. Tech Stack
- **Frontend**: React (Vite) + Vanilla CSS.
- **Backend**: FastAPI (Python 3.10+).
- **Database**: SQLite (Local file-based for prototype).
- **Validation**: Pydantic for API schemas.
- **Development Environment**: Docker.

## 2. API Design (MVP)
- `GET /api/v1/moods`: Retrieve mood history.
- `POST /api/v1/moods`: Log daily mood.
- `GET /api/v1/challenges`: Get today's 3 micro-challenges.
- `PATCH /api/v1/challenges/{id}/complete`: Mark a challenge as done.
- `GET /api/v1/stats`: Calculate burnout recovery level and streak.

## 3. Data Model (SQLite)
- `users`: id, username, joined_at.
- `mood_logs`: id, user_id, mood_score, note, created_at.
- `challenges`: id, title, category, is_active.
- `user_challenges`: id, user_id, challenge_id, completed_at.

## 4. Deployment Strategy
- Single-container Dockerized application for rapid local testing and handover.
- Automated testing via `pytest` for backend and `Jest` for frontend (basic unit tests).
