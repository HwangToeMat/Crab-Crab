# 🦀 Crab-Infinity (꽃게 인피니티) PRD v1.0

## 1. 프로젝트 개요
- **서비스 명:** Crab-Infinity (꽃게 인피니티)
- **목적:** 꽃게팀 v2.0 생태계 내 모든 서비스의 통합 조율 및 지능형 관리 (AI Command Center).
- **대상:** 꽃게팀 서비스 생태계를 운영하는 관리자 및 통합 지능이 필요한 사용자.

## 2. 핵심 가치 (Core Value)
- **Orchestration:** 개별 AI 서비스 간의 데이터 및 워크플로우를 유기적으로 연결.
- **Intelligence:** Gemini API를 통한 생태계 전체의 맥락 파악 및 의사결정 지원.
- **Trust:** 실시간 보안 모니터링 및 상태 검증을 통한 시스템 무결성 보장.

## 3. 주요 기능 (Features)
### 3.1. Nexus Dashboard (통합 대시보드)
- `config/state/state.json` 및 각 서비스별 `README.md`, `logs`를 분석하여 전체 생태계 현황 시각화.
- 서비스별 가동 상태(Health Check) 실시간 표시.

### 3.2. Infinity Brain (중앙 지능)
- Gemini API 기반의 멀티 에이전트 조율기.
- 사용자의 복잡한 요구사항을 분석하여 `work-crab`(기획), `crab-shield`(보안) 등에 업무 할당.

### 3.3. Guardian System (신뢰 보증)
- 전 서비스의 코드 변경 이력 및 보안 스캔 결과 통합 관리.
- 이상 징후 발견 시 즉시 경고 및 자동 롤백 제안.

## 4. 기술 스택
- **Backend:** Python (FastAPI) - 고성능 비동기 API 처리.
- **Frontend:** Vanilla JS / CSS - 가볍고 빠른 반응형 웹 대시보드.
- **AI Engine:** Google Gemini API - 고도화된 추론 및 텍스트 분석.
- **Infrastructure:** Docker & Docker-Compose - 즉시 실행 가능한 환경.

## 5. 로드맵
- **Phase 1:** 기획 및 PRD 확정 (현재)
- **Phase 2:** 백엔드(상태 수집기) 및 프론트엔드(대시보드) MVP 개발
- **Phase 3:** Gemini API 연동 및 10회 진화 루프 가동
- **Phase 4:** 통합 리포트 작성 및 배포
