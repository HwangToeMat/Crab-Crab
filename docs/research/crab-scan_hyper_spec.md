# Crab-Scan Hyper-Spec: 지능형 시각 분석 및 지식 추출 플랫폼

## 1. Service Identity
**"The Digital Eye of Human Knowledge"**
Crab-Scan은 단순한 스캐너 앱을 넘어, 카메라로 포착된 모든 사물, 문서, 상황을 AI가 실시간으로 인식하고 그 속에 담긴 지식과 맥락을 추출하는 '지능형 시각 분석 플랫폼'입니다. 세상을 '검색 가능한 데이터'로 치환하여 정보 접근성을 극대화합니다.

## 2. Persona Pain Points (CrabTeam 10인 페르소나 그룹)
- **User Persona Group**: "복잡한 설명서나 외국어 표지판을 볼 때, 그냥 사진만 찍으면 바로 이해하기 쉽게 설명해줬으면 좋겠습니다."
- **Tech Architect**: "이미지 내의 텍스트 인식(OCR) 정확도뿐만 아니라, 표(Table)나 수식, 다이어그램의 구조까지 정확히 파악하는 것이 기술적 난제입니다."
- **Consumer Insight Expert**: "쇼핑 중에 본 예쁜 가구 정보를 바로 찾거나, 냉장고 속 재료를 스캔해서 레시피를 바로 얻고 싶어 하는 니즈가 큽니다."
- **QA Specialist**: "저조도 환경이나 흔들린 사진에서도 정확한 분석 결과가 나와야 상용 수준의 품질이라고 할 수 있습니다."

## 3. Global Benchmarking
- **Google Lens**: 범용성은 훌륭하나 특정 도메인(전문 문서, 기술 도면 등)의 심층 분석은 약함. -> **Crab-Scan은 '전문 지식 추출 및 요약'으로 차별화.**
- **Adobe Scan**: 문서 스캔에 특화되어 있으나 내용의 지능적 해석 기능은 부족함. -> **Crab-Scan은 '시각 정보의 지식화'를 지향.**

## 4. Hyper-Feature Specification

### Tier 1 (Core): 상용 필수 복합 기능
1. **Adaptive Multimodal OCR**: 손글씨, 고어, 복잡한 수식 및 프로그래밍 코드를 99.9% 정확도로 인식하고 디지털 텍스트로 변환.
2. **Instant Object Knowledge-base**: 사물을 비추면 위키피디아, 쇼핑 정보, 수리 매뉴얼 등을 결합하여 '사물 정보 카드' 실시간 표시.
3. **Smart Document Structuring**: 종이 문서를 스캔하면 제목, 본문, 표, 이미지를 구분하여 편집 가능한 PDF/Office 파일로 자동 구조화.
4. **Real-time Visual Translation & Overlay**: 외국어 표지판이나 메뉴판 위에 번역된 텍스트를 원래 디자인 그대로 합성하여 보여주는 AR 번역.
5. **Visual Batch Scanning**: 여러 장의 영수증이나 명함을 한 번에 촬영해도 개별적으로 분리하고 데이터를 자동 분류/저장.

### Tier 2 (AI Evolution): Gemini API 기반 지능형 차별화
1. **Gemini Visual Context Interpreter**: 사진 속 상황을 Gemini가 분석하여 "이 식물은 물이 부족해 보여요" 혹은 "이 기계는 A 부품이 마모된 것 같습니다"와 같은 인사이트 제공.
2. **Interactive Diagram-to-Code**: 화이트보드에 그린 아키텍처 다이어그램이나 UI 스케치를 Gemini가 해석하여 실제 작동하는 코드로 변환.
3. **Blind Assist Audio Scene**: 시각 장애인을 위해 주변 풍경이나 상황을 Gemini가 실시간으로 묘사해주고 "앞에 턱이 있으니 조심하세요"와 같이 안내.

## 5. Tech Architecture Preview
- **DB Model**: 이미지 메타데이터용 PostgreSQL + 고성능 이미지 검색을 위한 Vector DB.
- **API Design**: 모바일 엣지 컴퓨팅(On-device AI)과 클라우드 AI를 결합한 하이브리드 추론 API.
- **AI Prompt Strategy**: 'Image-to-Reasoning' 프롬프트를 통해 시각적 특징을 언어적 묘사로 먼저 변환한 뒤, 이를 기반으로 심층 분석을 수행하는 2단계 전략.

## 6. Monetization Strategy
- **Freemium**: 기본 스캔은 무료, AI 심층 분석 및 무제한 클라우드 저장, 전문 문서 변환은 유료 구독.
- **B2B API Licensing**: 물류, 제조, 유통 기업 대상의 사물 인식 및 문서 자동화 솔루션 API 공급.
- **Shopping Affiliate**: 시각 검색을 통해 제품 구매 연결 시 발생하는 판매 수수료 및 브랜드 광고.
