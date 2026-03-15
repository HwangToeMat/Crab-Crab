# Soso-haeng Hyper-Spec: 소확행 루틴 관리 및 라이프스타일 디자인

## 1. Service Identity
**"The Architect of Your Small Joys"**
Soso-haeng(소소하지만 확실한 행복)은 거창한 목표가 아닌, 일상의 작은 성취와 기쁨을 설계하고 습관화하는 '라이프스타일 디자인 플랫폼'입니다. AI가 유저의 취향과 라이프 사이클을 분석하여 스트레스를 줄이고 도파민을 건강하게 생성하는 최적의 루틴을 제안합니다.

## 2. Persona Pain Points (CrabTeam 10인 페르소나 그룹)
- **User Persona Group**: "갓생(God-생) 살기는 너무 힘들고, 그냥 하루하루 즐겁게 살고 싶습니다. 너무 빡빡한 일정표가 아닌, 나에게 맞는 작은 재미를 찾아줬으면 좋겠어요."
- **Growth Marketing**: "기존 습관 형성 앱들은 이탈률이 높습니다. 유저가 지속적으로 재미를 느낄 수 있는 게임화(Gamification) 요소와 커뮤니티의 자극이 필요합니다."
- **UI/UX Designer**: "성취감을 극대화할 수 있는 시각적 보상(뱃지, 캐릭터 진화 등)과 부드러운 애니메이션 인터랙션이 핵심입니다."
- **Consumer Insight Expert**: "사람들은 자신이 무엇을 할 때 행복한지 의외로 잘 모릅니다. 취향을 발견해주고 기록해주는 과정이 필요합니다."

## 3. Global Benchmarking
- **Habitica**: 게임 형식의 습관 툴이나 디자인이 복고풍이고 진입장벽이 있음. -> **Soso-haeng은 현대적이고 감성적인 UI와 AI 기반의 '취향 저격 루틴'으로 차별화.**
- **Fabulous**: 과학적 접근은 좋으나 콘텐츠가 고정적임. -> **Soso-haeng은 Gemini를 통해 매일 다른 맞춤형 미션을 생성.**

## 4. Hyper-Feature Specification

### Tier 1 (Core): 상용 필수 복합 기능
1. **Micro-Habit Designer**: "아침에 물 한 잔", "하늘 한 번 보기"와 같은 5분 이내의 소소한 루틴 설정 및 관리.
2. **Serendipity Recommendation**: 유저의 현재 위치, 날씨, 시간을 고려하여 "지금 근처 공원에서 산책하면 딱 좋은 온도예요"와 같은 우연한 행복 추천.
3. **Visual Happiness Calendar**: 내가 달성한 소확행들을 색상과 아이콘으로 시각화하여 한 달의 행복도를 한눈에 보여주는 캘린더.
4. **Social Joy-sharing**: 이웃이나 친구들과 서로의 소확행을 응원하고 인증샷을 공유하는 소규모 커뮤니티 공간.
5. **Dopamine Detox Mode**: 숏폼 영상 시청 등 중독적인 활동을 줄이고, 대체할 수 있는 건강한 소확행 활동으로 유도하는 알림 기능.

### Tier 2 (AI Evolution): Gemini API 기반 지능형 차별화
1. **Gemini Lifestyle Stylist**: 유저의 취향 데이터(좋아하는 음식, 영화, 장소 등)를 기반으로 Gemini가 일주일 단위의 '행복 라이프스타일 플랜' 자동 구성.
2. **Adaptive Goal Setting**: 유저의 성취율이 낮아지면 Gemini가 대화를 시도하여 부담을 줄인 '초미세 단계'로 목표를 하향 조정하거나 동기를 부여.
3. **Meaning-making Diary**: 단순히 "커피 마심"이라고 기록해도 Gemini가 그 행동이 유저에게 어떤 긍정적 의미가 있는지 인문학적/심리학적으로 해석해주는 코멘트 기능.

## 5. Tech Architecture Preview
- **DB Model**: NoSQL (Firestore) 기반의 유연한 사용자 데이터 저장 + 추천 엔진을 위한 Redis 캐시 레이어.
- **API Design**: 실시간 동기화와 빠른 응답을 위한 AppSync(GraphQL) 기반 아키텍처.
- **AI Prompt Strategy**: 'Positive Psychology' 프롬프트를 적용하여 유저에게 항상 긍정적이고 지지적인 피드백을 주도록 설계된 AI 페르소나.

## 6. Monetization Strategy
- **Freemium**: 기본 루틴 관리는 무료, 무제한 AI 추천 및 심화 분석 리포트는 월 구독료.
- **Affiliate Commerce**: 추천된 소확행 활동과 관련된 제품(차, 책, 운동기구 등) 구매 연결 시 발생하는 판매 수수료.
- **Branded Missions**: 특정 브랜드와 협업하여 "OO 커피 마시기"와 같은 미션을 제공하고 광고 수익 창출.
