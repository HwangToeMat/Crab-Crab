# 🦀 꽃게팀(CrabTeam) v2.0 통합 마스터 가이드라인

본 문서는 꽃게팀 시스템의 모든 에이전트가 준수해야 할 최상위 지침(Source of Truth)입니다.

## 1. 핵심 철학 (Core Philosophy)
- **자율 진화(Autonomous Evolution):** 꽃게팀은 기획부터 배포, 보안 감사까지 인간의 개입 없이 스스로 의사결정하고 완수한다.
- **신뢰 보증(Trust Assurance):** 10회 이상의 검증 루프와 보안 에이전트의 감사를 통과한 코드만을 최종 결과물로 인정한다.
- **한국어 우선(Korean First):** 모든 보고와 소통, 주석의 핵심 설명은 한국어를 기본으로 한다.

## 2. 워크플로우 단계 (Phase 1-5)
1. **Phase 1: 기획(Planning):** 트렌드 분석 및 페르소나 기반 요구사항 정의. (`trend_analyst`, `service_planner` 주도)
2. **Phase 2: 설계 및 개발(Dev):** 아키텍처 설계, 코드 구현, Docker 환경 구축. (`tech_architect`, `backend_dev`, `frontend_dev` 주도)
3. **Phase 3: 10회 검증 루프(Verification):** QA 스페셜리스트 주도 하에 10회의 단위/통합 테스트 및 리포팅. (`qa_specialist`, `global_validator` 주도)
4. **Phase 4: 보고 및 통합(Reporting):** 최종 리포트 작성 및 main 브랜치 직접 머지/푸시. (PR 생략)
5. **Phase 5: 진화(Evolution):** AI 연동 고도화, 신뢰 보증 시스템 가동. (`evolution_director` 주도)

**[무한 진화 규칙]** 
- `"꽃게팀 무한진화개시"` 트리거 수신 시, Phase 4 완료 즉시 자동으로 Phase 5를 가동한다.
- 모든 상태값은 `config/state/state.json`에 실시간으로 기록되어 단계 간 누락 없는 정보 전달을 보장한다.

## 3. 에이전트 상호작용 및 바통 터치 규칙
- **State 기반 통신:** 모든 에이전트는 `config/state/state.json`을 통해 현재 진행 상황을 공유한다.
- **Handover Protocol:** 각 단계 완료 시 `global_validator`의 승인을 득한 후 다음 에이전트에게 제어권을 넘긴다.
- **Conflict Resolution:** 지침 충돌 시 본 `MASTER_GUIDELINE.md`를 최상위 권위로 인정한다.

## 4. 코드 및 커밋 규정
- **주석:** 중요한 로직에는 반드시 작업 의도를 담은 한국어 코멘트를 추가한다.
- **커밋 메시지:** `feat({service}): {description}` 형식을 유지하며, 상세 사유를 포함한다.
- **브랜치:** `feature/{service}-{v2_evo}-{step}` 명명 규칙을 준수하며, 작업 완료 시 즉시 main에 머지한다. (PR 생략)

## 5. 인프라 및 보안
- 모든 서비스는 즉시 실행 가능한 `Dockerfile`과 `docker-compose.yml`을 포함해야 한다.
- 보안 에이전트는 모든 배포 전 취약점 스캔(`Audit`)을 수행한다.
