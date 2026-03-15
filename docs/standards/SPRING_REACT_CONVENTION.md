# CrabTeam Global Code Convention & Architecture Guide

## 1. 개요
본 문서는 CrabTeam 생태계 내 모든 서비스가 준수해야 할 글로벌 표준 기술 스택 및 코드 컨벤션을 정의합니다. 파편화된 기술 스택을 통일하여 유지보수성과 확장성을 극대화하는 것을 목적으로 합니다.

## 2. 글로벌 표준 기술 스택
- **Backend:** Java 17+, Spring Boot 3.x, Spring Data JPA, H2 (개발용) / MySQL (운영용)
- **Frontend:** Node.js, React 18+, Vite, Styled-components / CSS Modules
- **Build Tool:** 백엔드는 Maven 또는 Gradle, 프론트엔드는 npm 또는 yarn.

## 3. 글로벌 디렉토리 구조 표준
각 서비스 폴더(`/services/service-name/`) 내부는 반드시 다음과 같은 구조를 가져야 합니다.

```text
services/service-name/
├── backend/                  # Spring Boot 프로젝트 루트
│   ├── src/main/java/.../    # Application, Controller, Service, Repository, Dto
│   ├── src/main/resources/   # application.yml 등
│   ├── build.gradle / pom.xml
│   └── README.md
├── frontend/                 # React 프로젝트 루트 (Vite 등)
│   ├── src/
│   │   ├── components/       # 재사용 가능한 UI 컴포넌트
│   │   ├── pages/            # 라우팅되는 페이지 단위 컴포넌트
│   │   ├── hooks/            # 커스텀 훅
│   │   ├── api/              # 백엔드 API 연동 모듈 (axios/fetch)
│   │   ├── App.jsx
│   │   └── main.jsx
│   ├── package.json
│   ├── vite.config.js
│   └── README.md
├── docs/                     # PRD, 아키텍처 문서 등
└── docker-compose.yml        # 백엔드/프론트엔드 통합 실행 환경
```

## 4. 백엔드 (Spring Boot) 코드 컨벤션
1. **패키지 구조 (계층형)**: `com.crabteam.{servicename}.{domain}` 형태로 구성하며 도메인 단위 하위에 `controller`, `service`, `repository`, `dto`를 둡니다.
2. **RESTful API 설계**:
   - URL은 명사를 사용하고 소문자 케밥 케이스(`-`)를 적용합니다. (e.g., `/api/v1/user-tasks`)
   - HTTP 메서드(GET, POST, PUT, DELETE)를 정확히 목적에 맞게 사용합니다.
3. **데이터 전달**: Entity 클래스는 데이터베이스 매핑 용도로만 사용하고, 클라이언트와의 통신은 반드시 DTO (Data Transfer Object) 클래스를 거쳐야 합니다.
4. **롬복(Lombok)** 남용 자제: `@Data` 대신 `@Getter`, `@Setter` 등을 필요에 맞게 분리하여 사용합니다.

## 5. 프론트엔드 (React) 코드 컨벤션
1. **함수형 컴포넌트**: 모든 컴포넌트는 함수형으로 작성하며, React Hooks(`useState`, `useEffect` 등)를 적극 활용합니다.
2. **네이밍 규칙**: 
   - 컴포넌트 파일명과 함수명은 파스칼 케이스(PascalCase)를 사용합니다. (e.g., `TaskCard.jsx`)
   - 일반 유틸리티 함수나 변수는 카멜 케이스(camelCase)를 사용합니다.
3. **상태 관리**: 전역 상태는 Context API, Zustand, Redux 등을 활용하되, 가급적 로컬 상태를 우선하여 복잡도를 낮춥니다.
4. **API 호출 분리**: API 호출 로직은 컴포넌트 내부가 아닌 `src/api/` 디렉토리에 별도 파일로 모듈화하여 관리합니다.

---
**제정자:** Architecture Standardizer (CrabTeam)
