# Work-Crab (워크크랩) 서비스 구축 계획

## 1. 개요 (Overview)
- **서비스 명**: Work-Crab (워크크랩)
- **슬로건**: "게으르지 않게, 하지만 지치지 않게. 당신의 갓생 파트너"
- **핵심 가치**: 효율적인 작업 관리와 실시간 번아웃 방지 알림을 통한 지속 가능한 생산성 향상.

## 2. Phase 1: 연구 및 기획 (Foundations)
### 2.1. 시장 트렌드 분석 (Trend Analyst)
- **트렌드**: '갓생살기' (God-Saeng) - MZ세대를 중심으로 규칙적이고 생산적인 삶을 지향하는 문화가 확산됨.
- **문제점**: 과도한 계획과 실행으로 인한 조기 번아웃(Burnout) 현상 증가.
- **기회**: 단순히 일을 잘하는 도구가 아닌, '어떻게 잘 쉴 것인가'를 함께 고민해주는 지능형 비서에 대한 수요가 높음.

### 2.2. 제품 요구사항 정의 (Service Planner - PRD)
- **타겟 유저**: 2030 직장인 및 프리랜서, 자기계발에 관심이 많은 대학생.
- **핵심 기능 (MVP)**:
  1. AI 작업 우선순위 자동 설정 (중요도/긴급도 기반).
  2. '집중 모드' 및 정기적인 '번아웃 방지 휴식' 알림.
  3. 일일 생산성 및 심리 상태 리포트.
  4. 간단한 감정 일기 작성 및 감정 분석.

### 2.3. UI/UX 디자인 방향 (UI/UX Designer)
- **비주얼 아이덴티티**: 안정감을 주는 딥 블루와 활기찬 크랩 오렌지 포인트 컬러.
- **디자인 톤**: 깔끔하고 직관적인 대시보드 형태, 사용자 친화적인 마이크로 인터랙션.
- **주요 화면**: 대시보드 (할 일 목록 + 휴식 상태), 통계 리포트, 감정 일기.

### 2.4. 기술 아키텍처 (Tech Architect)
- **Tech Stack**:
  - **Frontend**: React (Modern & Responsive UI).
  - **Backend**: FastAPI (Python 기반의 빠른 API 및 AI 통합 용이성).
  - **Database**: SQLite (초기 MVP 개발 속도 중시).
  - **AI Engine**: 단순 Rule-based Logic + OpenAI API (감정 분석 및 우선순위 추천).

## 3. Phase 2: 구현 (Implementation)
- **Backend**: FastAPI 기반 API 구축, 작업 관리 및 휴식 알고리즘 구현.
- **Frontend**: React 기반 반응형 웹 인터페이스 구축.
- **Integration**: 프론트엔드-백엔드 연동 및 기본 AI 모델 통합.

## 4. Phase 3: 10회 검증 루프 (Verification Loop)
- **방법**: 10명의 가상 페르소나(Persona)를 통한 피드백 수집 및 10단계 개선 루프 수행.
- **기록**: 각 사이클 완료 시 `feat: Cycle [N] - [Description]` 형식으로 커밋.

## 5. Phase 4: 최종 문서화 및 인도 (Finalization)
- `outputs/service_report_work-crab.md` 생성 및 최종 커밋.

## 검증 계획 (Verification)
- **단위 테스트**: 백엔드 API 기능 검증 (Pytest).
- **통합 테스트**: 프론트엔드-백엔드 데이터 흐름 확인.
- **UI/UX 리뷰**: 가이드라인 준수 여부 확인.
