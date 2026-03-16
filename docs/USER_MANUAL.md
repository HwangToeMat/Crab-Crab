# 📋 꽃게팀(CrabTeam) 운영 가이드 (User Manual)

본 문서는 사용자가 꽃게팀 시스템을 효율적으로 운영하고 가동하기 위한 최신 매뉴얼입니다.

## 1. 서버 구성 및 포트 정보
꽃게팀 V2.0은 다중 마이크로서비스 아키텍처를 채택하고 있습니다.

| 서비스 구성 | 기술 스택 | 기본 포트 | URL |
| :--- | :--- | :--- | :--- |
| **통합 프론트엔드 (Nexus)** | React + Vite | **5173** | `http://localhost:5173` |
| **메인 백엔드 (Nexus)** | Spring Boot | **8080** | `http://localhost:8080` |
| **지능형 분석 서버 (God-Crab)** | Python + FastAPI | **8000** | `http://localhost:8000` |

## 2. 서버 수동 가동 방법 (Local 실행)
Docker 환경이 불안정할 경우 아래 순서대로 직접 실행하세요.

### Step 1: Python 분석 서버 (God-Crab)
```bash
cd services/god-crab/backend
python main.py
```

### Step 2: Spring Boot 메인 서버 (Nexus)
```bash
cd services/crab-nexus/backend
./gradlew bootRun
```

### Step 3: 통합 프론트엔드 (Nexus)
```bash
cd services/crab-nexus/frontend
npm run dev
```

## 3. 사용자 지시 가이드
꽃게팀은 특정 키워드(Trigger)를 통해 전체 워크플로우를 가동합니다.

| 지시어 | 설명 |
| :--- | :--- |
| **"꽃게팀 작업개시 [아이디어]"** | Phase 1~4를 자율적으로 완수 (기획부터 최종 보고까지) |
| **"꽃게팀 진화개시 [서비스명]"** | Phase 5를 수행 (V2.0 고도화, AI 연동 등) |
| **"꽃게팀 무한진화개시 [아이디어]"** | Phase 1~5 전 과정을 멈춤 없이 완수 (Full Cycle) |

### 💡 팁
- **포트 충돌:** 만약 포트가 이미 사용 중이라면, 각 설정 파일(application.yml, vite.config.js 등)에서 포트를 변경하세요.
- **AI 연동:** 모든 백엔드 서버 가동 전 `.env` 파일에 `GEMINI_API_KEY`가 설정되어 있는지 반드시 확인하세요.
