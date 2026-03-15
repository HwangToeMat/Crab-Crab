# Service Plan: Real-time Crypto Sentiment Analyzer (SentiCrypto)

## 1. 개요
소셜 미디어 및 뉴스 기사 데이터를 실시간으로 분석하여 암호화폐에 대한 시장의 감성(긍정/부정)을 수치화하고 시각화하는 마이크로서비스입니다.

## 2. 핵심 기능
- **데이터 수집**: 외부 뉴스 API 및 SNS 크롤링을 통한 실시간 데이터 확보.
- **감성 분석**: 자연어 처리(NLP) 라이브러리를 사용한 감성 점수(Sentiment Score) 계산.
- **API 제공**: 분석 결과를 외부 서비스에서 활용할 수 있도록 REST API 엔드포인트 제공.
- **대시보드**: (추후 확장) 간단한 웹 기반 시각화 대시보드.

## 3. 기술 스택
- **Language**: Python 3.9+
- **Framework**: FastAPI (High-performance API)
- **Library**: `textblob`, `nltk` (NLP), `requests` (API Call)
- **Infrastructure**: Docker (Containerization)

## 4. 작업 브랜치 전략
- `feature/senticrypto-analyzer-v1-planning`: 기획 및 설계 (현재)
- `feature/senticrypto-analyzer-v1-development`: 핵심 로직 구현
- `feature/senticrypto-analyzer-v1-qa`: 테스트 및 품질 검증

## 5. 단계별 목표
- [x] Phase 1: 트렌드 분석 및 기획 확정
- [ ] Phase 2: 기본 API 서버 및 데이터 수집 모듈 구현
- [ ] Phase 3: 감성 분석 엔진 통합
- [ ] Phase 4: 최종 QA 및 main 머지
