# Nuri-bom Hyper-Spec: 범용 사회 안전 및 커뮤니티 케어 플랫폼

## 1. Service Identity
**"The Digital Guardian of Our Society"**
Nuri-bom은 '세상을 봄(Watch over the world)'과 '봄(Spring, 따뜻함)'의 중의적 의미를 담아, 공공 데이터와 시민들의 자발적 참여를 AI로 결합하여 사회적 안전망을 구축하고 지역 커뮤니티의 결속력을 강화하는 '범용 사회 케어 플랫폼'입니다. 재난 알림부터 소외 계층 돌봄까지 사회 전반의 온도를 높입니다.

## 2. Persona Pain Points (CrabTeam 10인 페르소나 그룹)
- **User Persona Group**: "동네에 위험한 곳이 어디인지, 오늘 갑자기 뜬 재난 문자가 나에게 얼마나 위험한지 직관적으로 알고 싶습니다."
- **Consumer Insight Expert**: "사회 공헌 서비스는 지속 가능성이 떨어집니다. 보상 체계(Incentive)가 확실해야 사람들이 적극적으로 참여합니다."
- **Global Validator**: "한국 시장을 넘어 글로벌하게 적용되려면 각국의 공공 데이터 규격과 문화를 수용할 수 있는 유연한 아키텍처가 필요합니다."
- **Tech Architect**: "방대한 공공 데이터를 실시간 처리하고, 위급 상황 시 트래픽 폭주를 견딜 수 있는 고가용성 시스템이 필수적입니다."

## 3. Global Benchmarking
- **Citizen (App)**: 미국 내 실시간 범죄 및 안전 알림 서비스로 강력하나, 공포 분위기를 조성한다는 비판이 있음. -> **Nuri-bom은 '따뜻한 돌봄'과 '긍정적 커뮤니티'에 집중.**
- **Nextdoor**: 이웃 간 커뮤니티 툴이나 안전 관련 기능은 부수적임. -> **Nuri-bom은 안전과 커뮤니티의 1:1 결합으로 차별화.**

## 4. Hyper-Feature Specification

### Tier 1 (Core): 상용 필수 복합 기능
1. **Real-time Safety Heatmap**: 범죄 통계, 사고 현황, 실시간 제보를 결합하여 현재 내 위치 주변의 안전도를 시각화하는 히트맵.
2. **AI Community Care-net**: 1인 가구나 노약자의 안부를 IoT 데이터(전력 사용량 등)와 연동하여 자동으로 확인하고, 이상 징후 시 이웃 봉사자에게 알림.
3. **Hyper-Local Disaster Warning**: 정부의 광역 재난 문자를 분석하여, 사용자의 정확한 위치에 따른 맞춤형 행동 지침(가까운 대피소 경로 등) 제공.
4. **Crab-Point Incentive System**: 사회 공헌 활동(위험 신고, 이웃 돕기 등) 참여 시 지역 화폐나 서비스 혜택으로 교환 가능한 포인트 지급.
5. **Universal Accessibility Suite**: 고령자나 장애인도 쉽게 사용할 수 있는 음성 인터페이스 및 고대비/단순화 모드 지원.

### Tier 2 (AI Evolution): Gemini API 기반 지능형 차별화
1. **Gemini Crisis Coordinator**: 다발적인 재난 상황 발생 시 Gemini가 각 상황의 시급성을 판단하여 구조 우선순위를 제안하고 자원을 효율적으로 배분하는 관제 보조.
2. **Contextual Report Analysis**: 텍스트, 사진, 영상 등으로 들어오는 시민 제보를 Gemini가 분석하여 허위 제보를 걸러내고 실제 위협 수준을 즉각 등급화.
3. **Community Conflict Mediator**: 커뮤니티 내 갈등 상황 발생 시 Gemini가 양측의 의견을 분석하여 중립적이고 건설적인 중재안을 제시.

## 5. Tech Architecture Preview
- **DB Model**: 지리 정보 시스템(PostGIS) 기반 공간 DB + 실시간 스트리밍 처리를 위한 Apache Druid.
- **API Design**: 대규모 트래픽 처리를 위한 마이크로서비스 아키텍처(MSA) 및 서버리스(AWS Lambda) 기반 이벤트 처리.
- **AI Prompt Strategy**: 'Situation-Aware Reasoning' 프롬프트를 통해 방대한 공공 데이터 속에서 유저에게 꼭 필요한 정보만 추출하는 필터링 로직.

## 6. Monetization Strategy
- **B2G (Government) Model**: 지자체 대상의 스마트 시티 관제 솔루션 납품 및 운영 대행 서비스.
- **ESG Sponsorship**: 기업들의 사회 공헌 예산을 서비스 내 커뮤니티 프로젝트와 연결하고 수수료를 받는 모델.
- **Premium Safety Package**: 개인화된 상세 안전 알림 및 가족 안심 케어 기능을 포함한 유료 서비스.
