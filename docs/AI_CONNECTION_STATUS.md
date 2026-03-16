# Crab-Nexus AI Connection Status (Audit Report)

본 문서는 Crab-Nexus 생태계 내 19개 서비스의 실제 Gemini AI 연동 여부를 추적합니다.

## 1. AI 연동 완료 서비스 (Real-time AI Enabled)
다음 서비스들은 실제 `GeminiService`를 호출하여 지능형 분석을 수행합니다.

| 서비스 ID | 서비스명 | AI 역할 | 모델 |
| :--- | :--- | :--- | :--- |
| `god-crab` | **God-Crab** | 갓생 인사이트 및 챌린지 가이드 | Gemini 2.0 Flash |
| `crab-finance` | **Crab-Finance** | 지출 카테고리 정밀 분류 및 자산 조언 | Gemini 2.0 Flash |
| `mood-ge` | **Mood-Ge** | 메모 기반 정밀 감정 분석 및 힐링 코칭 | Gemini 2.0 Flash |
| `crab-shield` | **Crab-Shield** | 메시지 위험도 분석 및 스미싱 탐지 | Gemini 2.0 Flash |
| `crab-mind` | **Crab-Mind** | 마음 일기 공감 어드바이스 및 상담 | Gemini 2.0 Flash |
| `crab-soul-care` | **Crab-Soul** | 자아 성찰 문장 분석 및 테라피 추천 | Gemini 2.0 Flash |
| `crab-deep-dream` | **Deep-Dream** | 수면 기록 분석 및 숙면 코칭 | Gemini 2.0 Flash |
| `crab-scan` | **Crab-Scan** | 소비 패턴 스캔 및 절약 가이드 | Gemini 2.0 Flash |
| `crab-crab-care` | **Crab-Care** | 시니어 건강 인사이트 및 돌봄 대화 | Gemini 2.0 Flash |
| `senticrypto-analyzer`| **SentiCrypto** | 암호화폐 시장 감성 지수 분석 | Gemini 2.0 Flash |
| `crab-evolution` | **AI Evolution** | 소스 코드 분석 및 API 문서 자동 생성 | Gemini 2.0 Flash |

## 2. 연동 보류/준비 중 (Logic Only)
다음 서비스들은 현재 비즈니스 로직(알고리즘) 기반으로 동작하며, 추후 AI 연동이 계획되어 있습니다.

- `work-crab`: 태스크 관리 엔진 (현재 상태 기반)
- `crab-mate`: 매칭 알고리즘 기반
- `eco-charge-optimizer`: 에너지 그리드 최적화 수식 기반
- `crab-crab-link`: 데이터 연동 허브
- `nuri-bom`: 커뮤니티 매칭 로직 기반
- `soso-haeng`: 기록 및 리포팅 로직 기반
- `crab-infinity`: 오케스트레이션 로직 기반
- `crab-sentinel`: 시스템 감사 로직 기반

## 3. 최신 패치 내역 (2026-03-15)
- **Crab-Finance**: 단순 키워드 매칭에서 AI 기반 정밀 분류로 업그레이드 (피자 -> 식비 정상 분류 확인).
- **UX**: 모든 AI 연동 서비스에 **네온 펄스 로딩 애니메이션** 추가.
- **Error Handling**: API 실패 시 "에너지 충전 중" 문구로 대체하여 노이즈 제거.
