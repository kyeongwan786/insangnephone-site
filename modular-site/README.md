# 인생네폰 모듈형 사이트

기존 페이지 파일과 독립된 정적 사이트입니다. 각 화면과 공통 UI, 데이터, API 연결 계층을 분리했습니다.

## 구조

- `src/components/common.js`: 공통 헤더, 푸터, 섹션 제목, 버튼
- `src/components/cards.js`: 재사용 상품·요금제·매장·후기 카드
- `src/pages/home.js`: 홈 화면 조립
- `src/data/home-data.js`: 화면 개발용 기본 데이터
- `src/services/home-service.js`: 백엔드/API 연결 지점 (`data-home-api` 속성에 JSON endpoint 지정)
- `src/styles/`: 디자인 토큰, 기본 스타일, 레이아웃, 컴포넌트, 홈 스타일
- `assets/main-reference.png`: 전달된 화면 참고 이미지
- `assets/home/`: 직접 생성한 히어로·스마트폰·선물·매장 이미지와 재사용 로고 자산

ES module과 `fetch`를 사용하므로 브라우저에서 `file://`로 직접 열기보다 로컬 HTTP 서버로 실행합니다. 예: `cd modular-site && python3 -m http.server 8000` 후 `http://localhost:8000` 접속.
