# Crab-Crab Care v2 테스트 가이드

## v2 신규 테스트 항목

### 1. AI 음성 읽어주기 (TTS)
1.  채팅창에서 메시지를 보냅니다.
2.  AI가 답변하면 메시지 옆에 있는 **🔊 (스피커)** 버튼을 누릅니다.
3.  시스템의 음성(한국어)으로 답변을 읽어주는지 확인합니다.

### 2. 주간 건강 트렌드 확인
1.  대시보드 하단의 **'지난 7일간의 변화'** 섹션을 확인합니다.
2.  7일간의 걸음 수 데이터가 막대 그래프 형태로 표시되는지 확인합니다.

### 3. 긴급 상황 및 보호자 알림
1.  심박수가 100을 넘는 경우(랜덤 발생), 상단의 상태 표시가 빨간색으로 깜빡이며 **'상태: Critical'**로 변하는지 확인합니다.
2.  개발자 도구(F12)의 Console 탭에 'CRITICAL ALERT: Family has been notified.' 로그가 찍히는지 확인합니다.

---

## 기본 실행 방법
1.  **백엔드**: `services/crab-crab-care/backend/main.py` 실행.
2.  **프런트엔드**: `services/crab-crab-care/frontend/index.html` 브라우저로 실행.
3.  **API 문서**: `http://localhost:8000/docs`에서 신규 엔드포인트(`/health-trends`, `/caregiver/notification`) 테스트 가능.
