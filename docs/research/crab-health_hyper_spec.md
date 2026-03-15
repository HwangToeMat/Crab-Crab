# Crab-Mate Hyper-Spec: 가치관 기반 지능형 소셜 매칭 및 커뮤니티

## 1. Service Identity
**"Beyond Swipe, Towards Connection"**
Crab-Mate는 외모나 단순 스펙을 넘어, 깊은 가치관, 대화 스타일, 관심사의 공명을 통해 지속 가능한 관계를 연결하는 '지능형 라이프스타일 매칭 플랫폼'입니다. Gemini가 유저의 대화 패턴과 심리 성향을 분석하여 단순한 '만남'이 아닌 '진정한 인연'을 제안합니다.

## 2. Persona Pain Points (CrabTeam 10인 페르소나 그룹)
- **User Persona Group**: "데이팅 앱은 가벼운 만남만 가득합니다. 나랑 말이 잘 통하고 가치관이 비슷한 사람을 찾기가 너무 힘들어요."
- **Consumer Insight Expert**: "유저들은 매칭된 후 첫 마디를 떼는 것을 매우 어려워합니다. 대화를 시작할 수 있는 자연스러운 아이스브레이킹 장치가 필요합니다."
- **QA Specialist**: "허위 프로필이나 유령 회원이 많아 신뢰도가 낮습니다. AI를 통한 철저한 본인 인증과 활동성 검증이 필수적입니다."
- **UI/UX Designer**: "기존 앱들은 유저를 '상품'처럼 나열합니다. 보다 인간적이고 감성적인 연결감을 줄 수 있는 인터페이스가 필요합니다."

## 3. Global Benchmarking
- **Tinder / Bumble**: 스와이프 기반의 직관성은 좋으나 관계의 깊이가 얕음. -> **Crab-Mate는 '가치관 퀘스트'와 'AI 대화 분석'으로 차별화.**
- **Hinge**: 'Designed to be deleted'라는 슬로건 아래 깊은 매칭을 추구하나 AI 활용은 기본적임. -> **Crab-Mate는 Gemini 기반의 1:1 관계 코칭으로 승부.**

## 4. Hyper-Feature Specification

### Tier 1 (Core): 상용 필수 복합 기능
1. **Value-Based Matchmaking Engine**: MBTI, 정치/경제관, 라이프스타일 퀴즈를 통해 도출된 데이터 기반의 다차원 매칭 알고리즘.
2. **AI Profile Assistant**: 유저의 사진과 특징을 입력하면 Gemini가 가장 매력적이면서도 진솔한 프로필 문구를 자동으로 작성.
3. **Safe-Connection Protocol**: 영상 분석 AI를 통한 실시간 본인 인증 및 비매너 행위(욕설, 부적절한 사진) 자동 차단 시스템.
4. **Natural Ice-breaker**: 매칭된 양쪽의 공통 관심사를 바탕으로 AI가 첫 대화 주제(질문 리스트)를 제안하는 기능.
5. **Curated Small-Group Meetup**: 1:1 만남이 부담스러운 유저들을 위해 AI가 취향이 비슷한 4~6명을 매칭하여 오프라인 모임을 기획.

### Tier 2 (AI Evolution): Gemini API 기반 지능형 차별화
1. **Gemini Relationship Coach**: 대화가 끊기거나 어색해질 때 Gemini가 "상대방은 이런 주제를 좋아할 것 같아요"라고 조언하거나 대화 매너를 코칭.
2. **Deep Harmony Analysis**: 두 유저의 대화 데이터를 기반으로 "두 분은 여행 스타일은 잘 맞지만, 경제관은 조율이 필요해 보여요"와 같은 심층 궁합 분석 제공.
3. **Persona-Simulation Pre-match**: 매칭 전, 유저의 페르소나를 복제한 AI와 상대방이 미리 가상 대화를 나눠보고 매칭 의사를 결정하는 'Pre-talk' 기능.

## 5. Tech Architecture Preview
- **DB Model**: 유저 간 관계망 표현을 위한 Graph DB + 프로필 데이터용 PostgreSQL + 실시간 대화용 Firebase.
- **API Design**: 초저지연 채팅 API 및 매칭 알림을 위한 Push Notification 시스템.
- **AI Prompt Strategy**: 'Sociological Matching' 프롬프트를 통해 인구통계학적 데이터와 심리학적 이론을 결합한 매칭 로직 구성.

## 6. Monetization Strategy
- **Freemium Subscription**: 기본 매칭은 무료, 무제한 스와이프, AI 관계 코칭, 프리미엄 뱃지는 유료 구독.
- **Pay-per-Match**: 확실한 매칭 성공을 보장하는 하이엔드 '슈퍼 매칭' 아이템 판매.
- **O2O Partnership**: AI가 매칭해준 장소(레스토랑, 카페) 예약 시 업체로부터 받는 예약 수수료 및 광고 수익.
