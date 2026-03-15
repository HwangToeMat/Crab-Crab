# 🛡️ Crab-Shield (꽃게방패) PRD

## 1. 프로젝트 개요
- **서비스명:** Crab-Shield (꽃게방패)
- **한줄 설명:** AI 기반 실시간 스미싱 문자 분석 및 개인정보 보호 모니터링 서비스
- **핵심 가치:** "당신의 디지털 영토를 꽃게처럼 단단하게 보호합니다."

## 2. 주요 기능
- **AI 스미싱 탐지:** 수신된 문자/링크의 위험도를 Gemini API를 통해 실시간 분석.
- **개인정보 유출 진단:** 사용자의 이메일이나 전화번호가 다크웹 등에 유출되었는지 가상 모의 점검.
- **안전 대시보드:** 현재 사용자의 디지털 보안 상태를 시각화하여 제공.

## 3. 기술 스택
- **Backend:** Python (FastAPI)
- **Frontend:** HTML5, Vanilla CSS, JS (Interactive UI)
- **AI:** Google Gemini API (Natural Language Understanding)
- **Infrastructure:** Docker, docker-compose

## 4. 로드맵
- **Phase 1-2:** 핵심 탐지 엔진 및 대시보드 UI 개발
- **Phase 3-4:** 10회 검증 루프 및 안정화
- **Phase 5:** AI 연동 고도화 (유출 경로 추적 및 대응 시나리오 생성)
