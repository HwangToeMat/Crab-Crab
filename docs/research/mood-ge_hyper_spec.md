# Mood-ge Hyper-Spec: 초개인화 감정 데이터 엔진 및 라이프 로깅

## 1. Service Identity
**"The Biological Architecture of Your Memories"**
Mood-ge는 단순한 기분 기록 앱을 넘어, 유저의 일상에서 발생하는 텍스트, 음성, 위치, 활동 데이터를 결합하여 감정의 패턴을 분석하고 삶의 질을 개선하는 '초개인화 감정 데이터 엔진'입니다. 기록되지 않은 순간까지 AI가 포착하여 인생의 소중한 맥락을 보존합니다.

## 2. Persona Pain Points (CrabTeam 10인 페르소나 그룹)
- **User Persona Group**: "매번 기분을 선택하는 게 귀찮습니다. 내 사진이나 음악 듣는 패턴만 보고도 내 기분을 알아서 기록해줬으면 좋겠어요."
- **UI/UX Designer**: "기존 앱들은 너무 단순합니다. 내 감정의 변화를 시각적으로 아름답고 직관적으로 보여줄 수 있는 예술적인 데이터 시각화가 필요합니다."
- **Consumer Insight Expert**: "사람들은 자신의 감정이 날씨나 요일, 특정 장소와 어떤 상관관계가 있는지 알고 싶어 합니다. 상관관계 분석 기능이 부족합니다."
- **Trend Analyst**: "단순 기록을 넘어, 감정 데이터를 기반으로 한 맞춤형 콘텐츠(음악, 음식, 장소) 추천으로 확장되어야 합니다."

## 3. Global Benchmarking
- **Day One**: 일기 쓰기의 표준이나 데이터 분석 기능이 약함. -> **Mood-ge는 AI 기반의 '감정 상관관계 분석'으로 차별화.**
- **Moodfit**: 심리 치유에 집중되어 있어 일상의 기록적 측면이 아쉬움. -> **Mood-ge는 라이프 로깅과 심리 케어의 완벽한 결합 지향.**

## 4. Hyper-Feature Specification

### Tier 1 (Core): 상용 필수 복합 기능
1. **Auto-Capturing Life Moments**: 위치 정보, 사진 메타데이터, 캘린더 일정을 조합하여 유저가 직접 쓰지 않아도 하루의 일과를 타임라인으로 자동 초안 작성.
2. **Multi-Modal Emotion Indexing**: 유저가 남긴 짧은 메모나 음성 녹음에서 8단계 세부 감정을 추출하고 강도를 수치화.
3. **Environmental Context Correlation**: 날씨, 미세먼지 지수, 주식 시장 지수 등 외부 데이터와 유저의 기분 사이의 상관관계를 분석하여 리포트 제공.
4. **Interactive Memory Palace**: 기록된 감정 데이터를 3D 공간에 배치하여 과거의 특정 시점으로 '시간 여행'하는 듯한 인터랙티브 UX.
5. **Privacy-First Vault**: 생체 인증 및 영지식 증명(Zero-Knowledge Proof) 기술을 적용하여 가장 민감한 감정 데이터를 완벽하게 보호.

### Tier 2 (AI Evolution): Gemini API 기반 지능형 차별화
1. **Gemini Daily Storyteller**: 하루의 파편화된 기록들을 Gemini가 읽고, 한 편의 아름다운 에세이나 시로 요약하여 매일 밤 배달.
2. **Predictive Mood Warning**: "보통 목요일 오후에 스트레스가 높으시네요. 오늘 퇴근길엔 명상 음악을 들어보시는 건 어떨까요?"와 같이 Gemini가 감정 하락을 선제 예측 및 제안.
3. **Deep Persona Insight**: 1년치 데이터를 기반으로 Gemini가 유저의 가치관, 성향 변화, 행복의 원천을 분석하여 '자아 탐구 보고서' 생성.

## 5. Tech Architecture Preview
- **DB Model**: 시계열 벡터 DB (Pinecone + InfluxDB)를 통해 시간 순서에 따른 감정 벡터 검색 최적화.
- **API Design**: 모바일 중심의 Lightweight REST API 및 실시간 동기화를 위한 GraphQL Subscriptions.
- **AI Prompt Strategy**: 'Narrative Synthesis' 프롬프트를 통해 객관적 사실 데이터에 감성적인 스토리텔링을 입히는 기법 적용.

## 6. Monetization Strategy
- **Premium Subscription**: 고급 분석 리포트, 무제한 미디어 저장, AI 에세이 기능을 포함한 구독 모델.
- **Physical Memory Book**: 1년치 기록을 AI가 편집하여 실제 종이 책으로 인쇄/배송해주는 유료 서비스.
- **Curation Partnership**: 유저의 감정 상태에 맞는 선물, 여행지, 콘텐츠를 추천하고 파트너사로부터 수수료를 받는 제휴 모델.
