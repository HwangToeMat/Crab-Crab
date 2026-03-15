# Service Plan: EcoCharge Optimizer (EcoCharge)

## 1. 개요
전력망 부하 데이터와 재생 에너지 생산 예측치를 분석하여, 전기차(EV) 사용자가 가장 친환경적이면서도 전력망에 부담을 주지 않는 최적의 충전 시간을 제안하는 마이크로서비스입니다.

## 2. 핵심 기능
- **그리드 데이터 분석**: 전력망 부하 상태(Peak/Off-peak) 분석.
- **재생 에너지 예측**: 태양광 및 풍력 발전 효율 기반의 친환경 에너지 점수 산출.
- **충전 스케줄링**: 사용자 설정(희망 완료 시간)에 맞춘 최적 충전 슬롯 추천 API.
- **탄소 절감액 계산**: 최적 충전 시 절감되는 탄소 배출량 수치화.

## 3. 기술 스택
- **Language**: Python 3.9+
- **Framework**: FastAPI
- **Library**: `pandas` (Data processing), `scikit-learn` (Basic model), `pydantic`
- **Infrastructure**: Docker

## 4. 작업 브랜치 전략
- `feature/eco-charge-optimizer-task002-planning`: 기획 및 설계 (현재)
- `feature/eco-charge-optimizer-task002-development`: 최적화 알고리즘 및 API 구현
- `feature/eco-charge-optimizer-task002-qa`: 시나리오 테스트 및 검증

## 5. 단계별 목표
- [x] Phase 1: 트렌드 분석 및 기획 확정
- [ ] Phase 2: 최적화 알고리즘(Optimizer Engine) 구현
- [ ] Phase 3: 추천 API 엔드포인트 개발
- [ ] Phase 4: 최종 QA 및 main 머지
