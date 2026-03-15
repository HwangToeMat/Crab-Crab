# Service Report: Crab-Mind (꽃게마인드)

## 1. Service Vision & Goals
- **비전**: 당신의 마음에 귀 기울이는 작은 위로
- **목표**: 바쁜 현대인과 1인 가구를 위한 AI 기반 마이크로 감정 일기 및 심리 케어 플랫폼 구축.

## 2. Technical Architecture
- **Backend**: FastAPI (Python), uvicorn
- **Frontend**: Vanilla JS/CSS/HTML
- **AI Engine**: Google Gemini API (`gemini-1.5-flash`)
- **Infra**: Docker & Docker Compose 기반의 즉시 실행 가능한 환경.

## 3. Key Features
- **감정 스냅샷**: 5가지 주요 감정 중 하나를 선택하고 짧은 텍스트로 하루를 기록.
- **꽃게의 위로 (AI 공감)**: 사용자의 감정과 일기 내용을 바탕으로, 심리 상담사 '꽃게 마인드'가 건네는 맞춤형 위로 기능.

## 4. User Feedback Summary (10-Cycle)
- 감정 선택의 직관성과 AI의 다정한 위로가 사용자들에게 높은 만족도를 주었습니다.
- 긴 글을 써야 한다는 부담을 줄여 데일리 리텐션 확보에 유리하다는 평가를 받았습니다.

## 5. Local Setup & Test Guide
1. `services/crab-mind/` 디렉토리로 이동.
2. `.env` 파일에 `GEMINI_API_KEY=your_key_here` 설정 (선택 사항, 미설정 시 Mock 모드 동작).
3. `docker-compose up --build` 실행.
4. 브라우저에서 `http://localhost:8000/frontend/index.html` 접속 (FastAPI 정적 파일 서빙 설정 필요, 현재는 API 분리 형태). *참고: 로컬 테스트 시 프론트엔드 폴더의 index.html을 브라우저로 직접 열어 테스트 가능.*

## 6. Market Success Potential
- 현대인의 스트레스 관리 니즈 증가와 더불어, 가볍고 친근한 멘탈 케어 서비스로서 시장 안착 가능성이 매우 높습니다.
