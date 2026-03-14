# [세미나] Gemini CLI & 꽃게팀: LLM 에이전트 기반 자율 개발 프로세스 구축 사례 (Detailed)

본 문서는 Gemini CLI를 통해 구축된 **'꽃게팀(CrabTeam)'** 프로젝트의 기술적 배경, 에이전트별 상세 설정 및 자율 진화 워크플로우를 팀원들과 공유하기 위해 작성되었습니다.

---

## 1. 꽃게팀 에이전트 상세 프로필 (The CrabTeam Agents)

꽃게팀은 단순한 자동화 툴이 아닌, **'역할 기반 협업(Role-Based Collaboration)'** 모델을 따릅니다. 각 에이전트는 독립된 설정 파일(`.md`)을 통해 고유의 페르소나와 제약사항을 가집니다.

### 1.1 전략 및 기획 그룹 (Strategic Planning)
| 에이전트명 | 상세 특징 및 역할 | 설정 파일 링크 |
| :--- | :--- | :--- |
| **Trend Analyst** | 한국 시장 특화 트렌드 분석가. 검색 데이터와 소셜 감성을 기반으로 '팔릴 만한' 서비스 소스 발굴. | [trend_analyst.md](./agents/trend_analyst.md) |
| **Service Planner** | PM 페르소나. 트렌드를 PRD로 구체화하며, 타겟 오디언스 및 MVP 기능을 정의함. | [service_planner.md](./agents/service_planner.md) |
| **Strategy Lead** | 프로젝트의 전략적 방향성 결정 및 기획안 최종 승인. 비즈니스 가치 극대화에 초점. | [strategy_lead.md](./agents/strategy_lead.md) |

### 1.2 설계 및 디자인 그룹 (Design & Architecture)
| 에이전트명 | 상세 특징 및 역할 | 설정 파일 링크 |
| :--- | :--- | :--- |
| **Tech Architect** | 기술 스택 선정 및 시스템 설계. FastAPI, DB 스키마 등 기술적 근간 마련. | [tech_architect.md](./agents/tech_architect.md) |
| **UI/UX Designer** | 디자인 토큰(색상, 폰트, 간격) 정의 및 사용자 여정 설계. 모던한 감각의 UI 가이드 제공. | [ui_ux_designer.md](./agents/ui_ux_designer.md) |

### 1.3 구현 및 인프라 그룹 (Builders)
| 에이전트명 | 상세 특징 및 역할 | 설정 파일 링크 |
| :--- | :--- | :--- |
| **Backend Dev** | FastAPI 기반의 비즈니스 로직 및 AI 분석 API 구현 담당. | [backend_dev.md](./agents/backend_dev.md) |
| **Frontend Dev** | React/Vanilla JS를 활용한 UI 구현 및 API 연동 담당. | [frontend_dev.md](./agents/frontend_dev.md) |
| **DevOps Infra** | Docker 컨테이너화 및 CI/CD 인프라 구축 가이드 제공. | [devops_infra.md](./agents/devops_infra.md) |

### 1.4 검증 및 품질 그룹 (Validation & QA)
| 에이전트명 | 상세 특징 및 역할 | 설정 파일 링크 |
| :--- | :--- | :--- |
| **Global Validator** | **팀의 최고 감시자.** 모든 결과물의 논리적 일관성과 시스템 무결성을 체크함. | [global_validator.md](./agents/global_validator.md) |
| **QA Specialist** | 기능적 무결성 테스트. 버그 발견 및 사용자 시나리오 기반의 품질 검증. | [qa_specialist.md](./agents/qa_specialist.md) |
| **User Persona Group** | **10인의 가상 페르소나.** (학생부터 은퇴자까지) 사용자 입장에서의 '날 것'의 피드백 제공. | [user_persona_group.md](./agents/user_persona_group.md) |
| **Consumer Insight Expert** | 페르소나들의 감정적 피드백을 기술적/전략적 요구사항으로 정제하여 전달. | [consumer_insight_expert.md](./agents/consumer_insight_expert.md) |

### 1.5 서비스 진화 그룹 (Post-Launch Evolution)
| 에이전트명 | 상세 특징 및 역할 | 설정 파일 링크 |
| :--- | :--- | :--- |
| **Evolution Director** | **신규 추가된 총괄 에이전트.** 서비스 출시 후 4대 소스(고객, 전문가, 리서치, 경쟁사)를 기반으로 고도화 주도. | [evolution_director.md](./agents/evolution_director.md) |

---

## 2. 왜 이렇게 많은 에이전트를 두었는가? (The Philosophy)

### 2.1 "Chain of Thought"를 통한 완결성 확보
- 한 명의 LLM이 모든 일을 하면 편향되거나 단순한 결과가 나올 수 있습니다.
- 꽃게팀은 **[기획 -> 검증 -> 설계 -> 개발 -> 10회 검증 -> 10회 진화]**의 체인을 형성하여, 각 단계마다 전문가 에이전트가 서로의 작업을 '비판적'으로 검토하도록 설계되었습니다.

### 2.2 실무 조직의 R&R 이식
- 우리 실제 팀의 R&R(Role & Responsibility)을 에이전트 설정 파일(`.md`)에 고스란히 이식했습니다.
- 이를 통해 LLM이 작성한 코드가 아닌, **'우리 팀의 컨벤션을 아는 동료'**가 짠 코드처럼 느껴지도록 유도했습니다.

---

## 3. 핵심 워크플로우: 자율 진화 사이클 (Evolution Cycles)

출시 후 **"꽃게팀 진화개시"** 명령어가 입력되면 실행되는 **'Phase 5: Continuous Evolution'**의 로직은 다음과 같습니다.

### 3.1 4대 데이터 소스 기반의 의사결정
1. **고객 의견 (Customer)**: Persona Group의 실제 고충(Pain Point) 수집.
2. **팀내 전문가 (Internal)**: 아키텍트의 성능 최적화 제안 및 디자이너의 심미성 피드백.
3. **인터넷 정보 (Research)**: 2026년 한국 IT 트렌드(Agentic AI, Feelconomy) 자동 검색 및 반영.
4. **경쟁 서비스 (Competitor)**: 경쟁사 'Mood-Connect' 등의 벤치마킹을 통한 기능 차별화.

### 3.2 10회 이상 반복의 가치
- 사이클 1-2에서는 데이터 구조를 잡고, 사이클 5-6에서는 소셜 기능을 넣고, 사이클 9-10에서는 성능과 애니메이션을 다듬었습니다.
- **결과**: "꽃게메이트"는 초기 '단순 큐레이션' 앱에서 '감정 데이터 자산화 및 소셜 네트워크' 서비스로 스스로 진화했습니다.

---

## 4. 우리 팀에 주는 시사점 (Takeaways for Our Team)

1. **에이전틱 워크플로우 도입 가능성**: 코드 리뷰, 테스트 코드 생성, 문서화 등 반복적이고 전문성이 필요한 영역에 이러한 '역할 기반 에이전트'를 도입하여 생산성을 극대화할 수 있습니다.
2. **자율적 개선 루프**: 개발자가 매번 지시하지 않아도, 미리 정의된 '진화 로직'에 따라 시스템이 스스로 개선점을 찾아내고 제안하는 프로세스의 효용성을 확인했습니다.
3. **프롬프트 엔지니어링의 자산화**: 각 에이전트 설정 파일(`agents/*.md`)은 우리 팀의 지식 자산입니다. 팀의 성장과 함께 이 설정 파일들도 계속해서 정교해질 것입니다.

---
**발표 팁**: 
- `agents/evolution_director.md` 파일을 열어보여주며 'Trigger Command' 설정을 설명해 보세요.
- `services/crab-mate/backend/main.py`의 진화 전/후 커밋 로그(`git log`)를 비교하여 보여주면 더욱 설득력이 있습니다.
