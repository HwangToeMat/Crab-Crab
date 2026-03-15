# Design Guide: Work-Crab (워크크랩)

## 1. 디자인 철학 (Design Philosophy)
- **Mindful Focus**: 사용자에게 안정감과 집중력을 제공하는 인터페이스.
- **Friendly Assistance**: 지시하기보다는 제안하는 부드러운 톤의 디자인.
- **Visual Simplicity**: 최소한의 정보로 최대의 효용을 제공.

## 2. 컬러 팔레트 (Color Palette)
- **Primary Blue (Deep Navy)**: `#1A237E` - 안정성과 신뢰.
- **Secondary Orange (Crab Orange)**: `#FF5722` - 활기, 에너제틱, 경고(휴식 권고).
- **Background (Soft White/Gray)**: `#F5F5F5` - 시각적 피로도 최소화.
- **Success Green**: `#4CAF50` - 완료 상태 표시.

## 3. 타이포그래피 (Typography)
- **Font-Family**: "Pretendard" (한국어 가독성이 뛰어난 산세리프 서체).
- **Headings**: Bold, 24px - 32px.
- **Body**: Regular, 14px - 16px.

## 4. 핵심 컴포넌트 (Key Components)
- **Energy Gauge**: 사용자의 현재 활력을 나타내는 반원형 게이지.
- **Priority Cards**: 할 일 목록을 중요도에 따라 색상과 아이콘으로 구분한 카드.
- **Floating Action Button (FAB)**: 신규 작업 추가를 위한 크랩 오렌지 색상의 버튼.

## 5. 사용자 흐름 (User Flow)
1. **온보딩**: 간단한 이름 및 기상/취침 시간 설정.
2. **할 일 입력**: 텍스트 또는 음성으로 오늘 할 일 추가.
3. **AI 추천**: AI가 제안한 우선순위 확인 및 수정.
4. **집중 및 휴식**: 집중 모드 시작 -> 휴식 알림 수신 -> 휴식 수행.
5. **일일 마무리**: 감정 일기 작성 및 오늘 하루 리포트 확인.
