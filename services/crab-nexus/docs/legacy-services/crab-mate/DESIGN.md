# DESIGN: 꽃게메이트 (Crab-Mate) - 비주얼 아이덴티티 및 사용자 경험 설계

## 1. 디자인 컨셉 (Visual Identity)
- **키워드**: 따뜻함(Warmth), 신뢰(Trust), 연결(Connection), 활기(Vibrancy).
- **톤앤매너**: 사용자의 감정을 포근하게 감싸는 파스텔톤과 꽃게의 활발함을 상징하는 비비드한 오렌지색의 조화.

## 2. 디자인 토큰 (Design Tokens)
### 2.1 Colors
- **Primary**: `#FF7E5F` (Crab Orange) - 에너지와 활기를 주는 메인 색상.
- **Secondary**: `#50A7C2` (Serene Blue) - 차분함과 정서적 안정을 주는 보조 색상.
- **Accent**: `#FEB47B` (Soft Sunset) - 따뜻한 위로와 응원의 포인트 색상.
- **Background**: `#F9FAFB` (Clean White) - 깔끔하고 가독성 좋은 배경색.
- **Text**: `#374151` (Deep Gray) - 눈의 피로를 최소화하는 텍스트 색상.

### 2.2 Typography
- **Font Family**: 'Pretendard', -apple-system, sans-serif.
- **Scales**:
  - H1: 24px, Bold (페이지 제목)
  - H2: 20px, Semi-Bold (섹션 제목)
  - Body: 16px, Regular (본문)
  - Caption: 12px, Regular (부가 정보)

## 3. 핵심 컴포넌트 (Core Components)
- **무드 카드 (Mood Card)**: 사용자의 현재 감정을 이모지와 색상으로 표현하는 카드.
- **액티비티 버블 (Activity Bubble)**: 추천 활동을 동그란 말풍선 형태로 나열하여 클릭을 유도.
- **꽃게의 메시지 (Crab's Message)**: 꽃게 캐릭터 아이콘과 함께 나타나는 다이얼로그 박스.

## 4. 사용자 여정 (User Journey)
1. **진입**: 앱 실행 시 꽃게 캐릭터가 "오늘 기분은 어때요?"라며 인사.
2. **무드 입력**: 사용자가 짧은 문장을 입력하거나 감정 이모지 선택.
3. **분석 및 위로**: AI가 감정을 분석하고 따뜻한 위로의 한마디 제공.
4. **추천 및 연결**: 현재 무드에 최적화된 3가지 활동 제안 및 '무드 매칭' 버튼 활성화.
5. **참여 및 기록**: 활동 완료 후 소감을 기록하여 감정 변화를 트래킹.

## 5. UI 가이드라인 (UI Principles)
- **심플함**: 한 화면에 너무 많은 정보를 담지 않고, 핵심 액션(추천 클릭)에 집중하도록 유도.
- **부드러운 인터랙션**: 버튼 클릭이나 화면 전환 시 부드러운 애니메이션을 사용하여 정서적 안정감 제공.
- **익명성 보호**: 매칭 서비스에서 사용자의 개인정보 노출을 최소화하는 디자인 설계.
