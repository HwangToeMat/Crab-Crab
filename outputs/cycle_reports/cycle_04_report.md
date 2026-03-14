# Cycle 04 Verification Report: Error & Loading UI

## 1. Persona Feedback Summary
| Persona | Key Feedback |
| :--- | :--- |
| Min-ji (17) | "로딩 중인지 멈춘 건지 모르겠어요. 힙한 로딩 애니메이션이 필요해요." |
| Ji-hoon (28) | "서버 에러 시 빈 화면 대신 구체적인 상태를 알려줘야 효율적입니다." |
| So-yeon (35) | "이동 중 네트워크가 불안정할 때의 대응이 중요해요." |
| Sung-ho (45) | "에러 메시지는 전문 용어 없이 쉽게 설명되어야 신뢰가 갑니다." |
| Young-ok (62) | "에러 문구는 크게, 다시 시도 버튼은 명확하게 보여주세요." |
| Kevin (24) | "글로벌 표준에 맞는 에러 처리와 명확한 메시지가 필요합니다." |
| Ha-eun (29) | "로딩 바나 스피너도 브랜드 아이덴티티(게 캐릭터 등)를 살려주세요." |
| Jung-sik (55) | "운전 중이나 외부에서 한 손으로도 '다시 시도'하기 편해야 합니다." |
| Seo-yun (13) | "에러 났을 때 우는 꽃게 아이콘 같은 게 있으면 덜 속상할 것 같아요." |
| Jin-woo (32) | "스켈레톤 UI 도입과 페치 타임아웃/재시도 로직이 필수입니다." |

## 2. Key Improvements for Cycle 04
- **Loading UI**: 스켈레톤 UI(Skeleton UI) 도입으로 데이터 로딩 중 시각적 피드백 제공.
- **Error Handling**: 네트워크 오류 또는 서버 오류 시 사용자 친화적인 에러 메시지와 '다시 시도' 버튼 구현.
- **Backend Integration**: 실제 백엔드 API와의 통신 로직 강화 및 지연 시간 시뮬레이션.
- **Visual Feedback**: 꽃게 캐릭터를 활용한 로딩/에러 상태 디자인 개선.

## 3. Implementation Details
### Frontend
- `app.js`: `fetchPosts` 함수 추가, 로딩 및 에러 상태 관리 변수 도입.
- `index.html`: 로딩 스켈레톤 템플릿 및 에러 컨테이너 추가.
- `style.css`: 스켈레톤 애니메이션 및 에러 UI 스타일 정의.

### Backend
- `main.py`: 테스트를 위한 인위적 지연(delay) 옵션 및 에러 시뮬레이션 가능성 검토.
