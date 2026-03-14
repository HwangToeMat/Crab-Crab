# System Design: God-Crab (갓게)

## 1. Tech Stack Selection
-   **Frontend**: React (TypeScript) for a responsive and interactive UI. Vanilla CSS for styling.
-   **Backend**: Node.js (Express) - Fast, lightweight, and suitable for a task-oriented MVP.
-   **Database**: SQLite (local/initial) or MongoDB (scalable) - Focused on JSON-like habit data.
-   **Authentication**: Simple JWT-based auth or LocalStorage for the prototype.

## 2. Architecture Overview
-   **Monolithic Service**: To ensure rapid development for the MVP phase.
-   **API First**: Clean separation between frontend and backend.

## 3. API Endpoints (Draft)
-   `GET /api/tasks`: Get all tasks for the user.
-   `POST /api/tasks`: Create a new task.
-   `PATCH /api/tasks/:id`: Mark task as complete/incomplete.
-   `GET /api/crab/status`: Get current crab evolution level and assets.
-   `POST /api/auth/login`: User authentication.

## 4. Database Schema (Draft)
-   **User**: `id`, `username`, `email`, `password_hash`, `crab_level`, `experience_points`.
-   **Task**: `id`, `user_id`, `title`, `description`, `category`, `is_completed`, `created_at`, `completed_at`.
-   **HabitTemplate**: `id`, `title`, `icon`, `suggested_frequency`.

---
**Prepared by**: Tech Architect
**Date**: 2026-03-14
