# [세미나] 멀티 에이전트 자율 협업 시스템(CrabTeam) 구축 및 실무 적용 사례

![CrabTeam Logo](crabteam.png)

본 문서는 LLM 에이전트들이 복합적인 역할을 수행하며 소프트웨어 생명주기(SDLC) 전체를 자율적으로 리드하는 **'꽃게팀(CrabTeam)'**의 시스템 설계와 운영 로직을 상세히 기술합니다.

---

## 0. 꽃게팀의 결과물들 (Service Showcase)

"이런 에이전트들이 모여서 실제로 무엇을 만드는가?"에 대한 답입니다. 꽃게팀은 기획부터 고도화까지 자율적으로 수행하며 다음과 같은 서비스들을 탄생시켰습니다.

### 🦀 [꽃게메이트 (Crab-Mate)](./services/crab-mate/)
- **한줄 소개**: "오늘 당신의 기분에 딱 맞는 메이트를 찾아보세요."
- **핵심 기술**: FastAPI + AI Sentiment Analysis + Vanilla JS
- **특징**: 사용자의 일기/텍스트를 분석하여 5가지 감정 상태를 도출하고, 그에 맞는 힐링 액티비티를 추천합니다. '진화 감독관'에 의해 익명 응원 메시지와 감정 히스토리 시각화 기능이 추가되었습니다.

### 🦀 [꽃게케어 (Crab-Crab-Care)](./services/crab-crab-care/)
- **한줄 소개**: "부모님의 안전을 AI가 지킵니다."
- **핵심 기술**: Python Backend + Vision Analysis
- **특징**: 시니어 사용자의 활동 데이터를 분석하여 낙상 위험이나 이상 징후를 감지하는 실버 케어 솔루션입니다. 따뜻한 오렌지색 톤의 접근성 높은 UI가 특징입니다.

### 🦀 [소소행 (Soso-Haeng)](./services/soso-haeng/)
- **한줄 소개**: "일상 속 작은 성취가 모여 큰 행복이 됩니다."
- **핵심 기술**: Node.js Backend + Interactive Web
- **특징**: 바쁜 현대인들을 위해 매일 작지만 확실한 행복(미션)을 제안하고 성취감을 관리해주는 라이프스타일 앱입니다.

---

## 1. 시스템 설계 철학: 왜 '멀티 에이전트'인가?

단일 LLM에게 모든 작업을 맡기는 대신, 전문화된 페르소나를 가진 여러 에이전트를 배치한 이유는 **'상호 견제와 균형(Checks and Balances)'**을 통해 결과물의 신뢰도를 확보하기 위함입니다.

### 1.1 Chain of Thought의 확장
- 단일 프롬프트가 아닌, 에이전트 간의 **'대화와 합의'**를 통해 복잡한 문제를 해결합니다.
- 기획 에이전트가 제안한 내용을 기술 설계 에이전트가 검토하고, 검증 에이전트가 논리적 결함을 찾아내는 구조입니다.

### 1.2 지식의 파편화 방지 (Context Specialization)
- 각 에이전트는 자신에게 필요한 컨텍스트(디자인 가이드, 코딩 컨벤션, 인프라 제약 등)에만 집중하여 고품질의 출력을 얻습니다.

---

## 2. 에이전트별 페르소나 및 내부 로직 상세 (Deep Dive)

모든 에이전트는 `agents/*.md` 설정 파일을 통해 자신의 **'행동 강령'**을 주입받습니다.

### 2.1 전략 및 통찰 그룹
- **Trend Analyst**: [설정 파일](./agents/trend_analyst.md) - 시장 트렌드 분석 및 기회 요인 도출.
- **Service Planner (PM)**: [설정 파일](./agents/service_planner.md) - PRD 작성 및 MVP 기능 정의.
- **Strategy Lead**: [설정 파일](./agents/strategy_lead.md) - 비즈니스 가치 검증 및 최종 승인.

### 2.2 기술 설계 및 구현 그룹
- **Tech Architect**: [설정 파일](./agents/tech_architect.md) - 시스템 아키텍처 설계 및 DB 스키마 정의.
- **UI/UX Designer**: [설정 파일](./agents/ui_ux_designer.md) - 디자인 토큰 정의 및 사용자 여정 설계.
- **Backend Dev**: [설정 파일](./agents/backend_dev.md) - FastAPI/Node.js 등 서버 로직 구현.
- **Frontend Dev**: [설정 파일](./agents/frontend_dev.md) - React/Vanilla JS UI 및 API 연동.

### 2.3 품질 및 거버넌스 그룹 (중요)
- **Global Validator**: [설정 파일](./agents/global_validator.md) - **팀 내 최고 권위자.** 논리적 모순 제거 및 무결성 체크.
- **User Persona Group (10 Critics)**: [설정 파일](./agents/user_persona_group.md) - 10인의 가상 사용자 피드백 제공.
- **Consumer Insight Expert**: [설정 파일](./agents/consumer_insight_expert.md) - 사용자 피드백을 기술 요구사항으로 정제.
- **QA Specialist**: [설정 파일](./agents/qa_specialist.md) - 기능적 무결성 테스트 수행.

### 2.4 서비스 진화 그룹
- **Evolution Director**: [설정 파일](./agents/evolution_director.md) - 출시 후 4대 소스 기반의 서비스 고도화 주도.

---

## 3. 자율 개선의 투명성: 사이클 리포트 (Cycle Reports)

꽃게팀 프로젝트의 가장 흥미로운 지점 중 하나는 **'모든 개선 과정의 투명한 기록'**입니다. `outputs/cycle_reports/` 디렉토리에는 매 루프(Loop)마다 에이전트들이 나눈 대화와 결정이 문서화되어 있습니다.

### 3.1 리포트 아카이브 (Cycle History)
- [Cycle 01 Report](./outputs/cycle_reports/cycle_01_report.md) - 초기 UI/UX 개선
- [Cycle 05 Report](./outputs/cycle_reports/cycle_05_report.md) - 소셜 연결 기능 도입
- [Cycle 10 Report](./outputs/cycle_reports/cycle_10_report.md) - 최종 폴리싱 및 성능 최적화

### 3.2 리포트의 가치 (Why it matters)
- **이력 추적(Traceability)**: "이 기능은 왜 추가되었지?"에 대한 답을 과거 리포트에서 즉시 찾을 수 있습니다.
- **에이전트 책임성(Accountability)**: 각 결정이 어떤 에이전트의 제안이었는지 명확히 기록되어 시스템의 신뢰도를 높입니다.

---

## 4. 진화 감독관(Evolution Director)의 메커니즘

출시 후 **"꽃게팀 진화개시"** 명령어가 떨어지면 가동되는 **'자가 개선 시스템'**입니다. 진화 감독관은 단순히 코드를 고치는 것이 아니라, **외부 리서치, 사용자 피드백, 기술적 부채, 비즈니스 목표**를 합성하여 자율적인 피보팅(Pivoting)을 결정합니다.

---

## 5. 기술적 시사점 및 미래 전망

1. **Chain of Agents 패턴**: 산출물이 다음 에이전트의 가이드라인이 되어 환각을 억제하고 자정 작용을 일으킵니다.
2. **개발 환경의 변화**: 이제 개발자는 직접 코딩보다 **'에이전트의 페르소나 설계'**와 **'워크플로우 오케스트레이션'**에 집중하게 될 것입니다.
3. **결론**: 꽃게팀 프로젝트는 LLM 에이전트가 스스로 사고하고 기록하며 진화하는 **'진정한 팀 동료'**로서 기능할 수 있음을 증명했습니다.

---
**발표 팁**: 
- `agents/` 디렉토리의 설정 파일들을 열어 구체적인 프롬프트 구조를 보여주세요.
- `services/` 폴더 내의 각 서비스 README를 통해 에이전트가 기획한 '서비스 비전'을 공유하세요.
- `outputs/cycle_reports/`를 통해 에이전트들이 서로를 견제하며 고도화하는 과정을 증명해 보세요.
