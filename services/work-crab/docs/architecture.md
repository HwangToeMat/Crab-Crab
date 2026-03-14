# Architecture: Work-Crab (워크크랩)

## 1. 기술 스택 (Tech Stack)
- **Frontend**: React.js (Hooks, Context API).
- **Backend**: Python FastAPI.
- **Database**: SQLite (SQLAlchemy ORM).
- **External APIs**: OpenAI API (for sentiment analysis & task prioritization).

## 2. 데이터 모델 (Data Model)
### 2.1. User Table
- `id` (PK), `name`, `start_time`, `end_time`, `created_at`.

### 2.2. Task Table
- `id` (PK), `user_id` (FK), `title`, `description`, `priority` (High, Mid, Low), `estimated_time` (min), `actual_time` (min), `status` (Todo, InProgress, Done), `created_at`.

### 2.3. Diary Table
- `id` (PK), `user_id` (FK), `content`, `emotion_score` (-1 to 1), `created_at`.

## 3. API 엔드포인트 (Endpoints)
- `POST /tasks`: 작업 추가.
- `GET /tasks`: 오늘 할 일 목록 조회.
- `PATCH /tasks/{id}`: 작업 상태 업데이트.
- `POST /diary`: 감정 일기 작성 및 감정 분석 요청.
- `GET /burnout-status`: 현재 활력 지수 계산 결과 반환.

## 4. 시스템 흐름 (System Flow)
1. **Frontend**: React 앱이 백엔드에 사용자 데이터를 요청.
2. **Backend**: FastAPI가 DB에서 할 일 및 일기 데이터를 조회하여 비즈니스 로직 수행.
3. **AI Integration**: 일기 작성 시 FastAPI가 OpenAI에 분석 요청 후 결과 저장.
4. **Task Prioritization**: 등록된 작업을 바탕으로 AI가 우선순위 자동 조정 알고리즘 실행.
