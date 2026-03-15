# Senticrypto-analyzer Hyper-Spec: 심리 분석 기반 암호화폐 지능형 투자 보조

## 1. Service Identity
**"The Pulse of Digital Finance"**
Senticrypto-analyzer는 차트 분석을 넘어, 전 세계 SNS, 뉴스, 커뮤니티의 거대한 '심리 데이터(Sentiment Data)'를 AI로 실시간 분석하여 암호화폐 시장의 흐름을 예측하는 '지능형 투자 심리 분석 플랫폼'입니다. 공포와 탐욕의 지수를 정량화하여 유저가 뇌동매매를 피하고 데이터 기반의 합리적 투자를 하도록 돕습니다.

## 2. Persona Pain Points (CrabTeam 10인 페르소나 그룹)
- **User Persona Group**: "유튜브나 커뮤니티에 정보가 너무 많아 어떤 것이 진짜 신호(Signal)이고 어떤 것이 소음(Noise)인지 구분하기 힘듭니다."
- **Trend Analyst**: "암호화폐 시장은 기술적 분석보다 커뮤니티의 분위기나 일론 머스크 같은 인플루언서의 한마디에 더 크게 반응합니다. 이를 수치화할 도구가 필요합니다."
- **Strategy Lead**: "변동성이 극심한 시장에서 유저들이 패닉 셀(Panic Sell)을 하지 않도록 심리적 지지선과 팩트 체크를 실시간으로 제공해야 합니다."
- **Tech Architect**: "전 세계 수만 개의 채널에서 쏟아지는 비정형 텍스트 데이터를 실시간으로 크롤링하고 자연어 처리(NLP)하는 파이프라인의 성능이 핵심입니다."

## 3. Global Benchmarking
- **LunarCrush**: 소셜 데이터 분석의 선두주자이나 단순 지표 나열에 그침. -> **Senticrypto-analyzer는 지표에 대한 'Gemini의 심층 해석'으로 차별화.**
- **Glassnode**: 온체인 데이터 분석은 강력하나 대중의 심리 분석 기능은 약함. -> **Senticrypto-analyzer는 온체인과 심리 데이터의 교차 분석 지향.**

## 4. Hyper-Feature Specification

### Tier 1 (Core): 상용 필수 복합 기능
1. **Real-time Global Sentiment Map**: X(Twitter), Reddit, Telegram, 4chan 등 주요 커뮤니티의 키워드 빈도와 감성 점수를 실시간 히트맵으로 제공.
2. **Influencer Impact Tracker**: 특정 인플루언서의 발언 전후 가격 변동과 소셜 반응을 추적하여 '신뢰도 점수' 산출.
3. **Whale-Sentiment Correlation**: 거대 고래들의 자금 흐름(온체인)과 개미 투자자들의 심리(소셜)가 상충하는 구간을 포착하여 반전 신호 알림.
4. **Fact-Check & FUD Filter**: 시장에 떠도는 루머나 자극적인 뉴스를 AI가 팩트 체크하여 신뢰 등급을 매기고 가짜 뉴스(FUD) 알림.
5. **Personal Portfolio Sentiment Health**: 유저가 보유한 코인들에 대한 시장의 시각이 긍정적인지 부정적인지 종합 건강 점수로 환산.

### Tier 2 (AI Evolution): Gemini API 기반 지능형 차별화
1. **Gemini Market Narrator**: 현재 시장 상황을 Gemini가 한 편의 시장 브리핑처럼 요약해주며, "왜 지금 가격이 빠지는지"에 대한 복합적인 이유를 인간적인 언어로 설명.
2. **Predictive Scenario Simulation**: 특정 대형 호재나 악재 발생 시, 과거 유사 사례와 현재의 심리 지수를 결합하여 Gemini가 예상 가격 시나리오(Best/Worst) 제시.
3. **Personalized Investment Mentor**: 유저의 투자 성향(공격/방어)과 현재 포트폴리오를 분석하여 Gemini가 "지금은 탐욕 지수가 너무 높으니 비중을 줄이는 게 어떨까요?"와 같이 1:1 조언.

## 5. Tech Architecture Preview
- **DB Model**: 대규모 텍스트 검색을 위한 ElasticSearch + 실시간 지표 계산을 위한 Apache Flink 및 ClickHouse.
- **API Design**: 고성능 WebSocket API를 통한 초저지연 시그널 전송 및 RESTful 인터페이스.
- **AI Prompt Strategy**: 'Contradictory Analysis' 프롬프트를 통해 낙관론과 비관론을 동시에 분석하여 편향되지 않은 중립적 시각 도출.

## 6. Monetization Strategy
- **Premium Tier (SaaS)**: 실시간 시그널 알림, 심층 AI 리포트, 고래 지갑 추적 기능을 포함한 월 구독 모델.
- **Trading Bot Integration**: 분석 데이터를 기반으로 자동 매매를 수행하는 봇 서비스 및 수익 공유(Profit Sharing) 모델.
- **API Licensing**: 퀀트 투자사나 거래소 대상의 정제된 심리 분석 데이터 피드 유료 제공.
