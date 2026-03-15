# 🦀 꽃게팀 하이퍼-프로덕트(Hyper-Product) 기술 표준 가이드

본 가이드는 모든 꽃게팀 서비스의 고도화 시 준수해야 할 최상위 기술 표준입니다.

## 1. 백엔드 아키텍처 (Modular Backend)
- **Framework**: FastAPI (Python) 또는 Express (Node.js) 권장.
- **Structure**: 
  - `routes/`: API 엔드포인트 정의.
  - `services/`: 비즈니스 로직 처리.
  - `models/`: DB 스키마 및 모델 정의.
  - `schemas/`: 데이터 검증 및 직렬화.
- **Database**: SQLite를 기본으로 하되, 복합 관계형 데이터(1:N, N:M)를 명확히 설계.
- **Real-time**: WebSocket 엔드포인트를 통한 실시간 데이터 동기화 기능 포함.

## 2. 프론트엔드 UX/UI (Advanced Frontend)
- **Multi-Page**: SPA 내 라우팅 또는 별도 HTML 파일을 통해 복합적인 유저 시나리오 대응.
- **Theme**: Deep Blue (#0F172A), Electric Purple (#7C3AED), Neon Cyan (#22D3EE) 테마 적용.
- **Component**: 
  - 실시간 알림 토스트, 로딩 스켈레톤, 인터랙티브 차트/그래프 포함.
  - 모바일 최적화 및 하단 네비게이션 필수.

## 3. AI 및 보안 (Intelligence & Security)
- **AI**: Gemini API를 활용한 도메인 특화 지능형 기능 (단순 챗봇 이상).
- **Security**: JWT 토큰 인증 및 .env를 통한 API 키 보안 관리.

## 4. 인프라 (Launch Ready)
- 서비스별 독립적인 `docker-compose.yml` 및 `Dockerfile` 최적화.
- 로컬 개발 환경과 배포 환경의 일관성 유지.
