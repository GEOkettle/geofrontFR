---
# 0) 프론트엔드 최종 구현 목표
- 아래를 최종목표 삼아 개발하되 완벽구축에 목매이지 말고 
어느정도 쓸만한 버전을 만들고 실사용하며 추가하는 방식으로 개발한다.
---

# 1) 프론트엔드 프레임워크 체크리스트

## A. 런타임/앱 기반

- [o] 앱 엔트리 구조
- [o] 라우팅 구조
- [o] 레이아웃 시스템
- [|] 에러 바운더리
- [x] 로딩/서스펜스 처리
- [|] 404 / 500 / 점검 페이지
- [|] CSR / SSR / SSG 대응 여부 정의
- [|] hydration 문제 대응 기준
- [|] 환경별 실행 모드(dev/staging/prod) 분리

---

## B. 상태 관리

- [o] 서버 상태 관리 체계
  예: TanStack Query
- [o] 클라이언트 전역 상태 관리 체계
  예: Zustand, Redux
- [o] 폼 상태 관리 체계
  예: TanStack Form, RHF
- [|] URL state 관리 규칙
- [o] 캐시 키 설계 규칙
- [o] invalidate / refetch 규칙
- [x] optimistic update 기준
- [o] 서버 상태와 클라이언트 상태의 책임 분리 원칙

> 이 부분이 없으면 나중에
> **“뭘 zustand에 넣고 뭘 query에 넣지?”**가 매번 흔들린다.

---

## C. 데이터 접근/API 계층

- [o] API 클라이언트 래퍼
- [o] 공통 fetch/axios 인스턴스
- [o] 인증 토큰/쿠키 처리 방식
- [o] request/response 인터셉터
- [o] 에러 응답 정규화
- [|] 재시도 정책
- [x] timeout 정책
- [x] pagination 유틸
- [x] 파일 업로드/download 유틸
- [o] API 모듈 구조(feature별 or domain별)

---

## D. 인증/인가

- [o] 로그인 상태 부트스트랩
- [o] access/refresh 처리 정책
- [o] 세션 만료 처리
- [o] 보호 라우트 처리
- [x] role/permission 기반 화면 제어
- [|] 익명 사용자 허용 화면 기준
- [|] 401 / 403 / 5xx 대응 방식 구분
- [o] 로그아웃 시 캐시 정리 규칙

---

## E. UI 시스템 / 디자인 시스템

- [o] 디자인 토큰(color, spacing, radius, shadow, z-index)
- [|] typography 시스템
- [o] 버튼/인풋/모달/드롭다운 등 기본 컴포넌트
- [|] 폼 컴포넌트 표준
- [o] 피드백 컴포넌트
  예: toast, alert, snackbar, dialog
- [o] 데이터 표시 컴포넌트
  예: table, list, card, empty state
- [|] 로딩 UI 표준
  예: skeleton, spinner
- [o] 다크모드/테마 시스템
- [o] 아이콘 시스템
- [o] 반응형 기준점
- [|] 접근성 규칙(aria, keyboard navigation, focus ring)
- [x] 컴포넌트 문서화 방식

---

## F. 폼/검증

- [o] 폼 라이브러리 선택
- [o] 스키마 검증 라이브러리 선택
- [|] 입력 에러 메시지 표준
- [o] submit 중 상태 처리
- [o] 중복 제출 방지
- [x] 서버 검증 에러 매핑 규칙
- [x] 파일/이미지 입력 처리 규칙
- [|] 날짜/시간 입력 처리 규칙
- [x] 마스킹/포맷팅 규칙

---

## G. 라우팅/네비게이션

- [o] route tree 규칙
- [o] 중첩 라우트 규칙
- [|] 라우트별 loader/prefetch 정책
- [x] breadcrumb 생성 규칙
- [o] 메뉴/사이드바 구조
- [|] deep link 대응
- [x] query param 표준
- [o] route guard 처리 방식

---

## H. 에러 처리

- [|] 전역 에러 처리 전략
- [o] 화면 에러 vs API 에러 구분
- [|] 사용자 메시지 vs 개발자 로그 분리
- [o] 에러 코드 표준화
- [|] fallback UI
- [x] retry UI
- [x] 네트워크 끊김 대응
- [x] 오프라인 상태 대응 여부

---

## I. 성능

- [|] 코드 스플리팅
- [x] lazy loading
- [x] 이미지 최적화 기준
- [x] 번들 크기 점검 기준
- [|] memoization 기준
- [x] 리스트 virtualization 필요 여부
- [|] prefetch 전략
- [o] 캐시 지속시간 기준
- [x] 렌더링 병목 디버깅 기준

---

## J. 개발자 경험(DX)

- [o] 절대경로 alias
- [o] 환경변수 타입 검증
- [o] ESLint 규칙
- [o] Prettier 규칙
- [x] import 정렬 규칙
- [x] husky/lint-staged
- [x] commit convention
- [x] 코드 생성기 여부
- [o] 공통 유틸 구조
- [o] README / 아키텍처 문서
- [o] 예제 페이지 또는 샌드박스 앱

---

## K. 테스트

- [x] unit test
- [x] component test
- [x] integration test
- [x] e2e test
- [x] mocking 전략
- [x] test data factory
- [x] fixture 관리
- [x] accessibility test 여부
- [x] visual regression 여부

---

## L. 모바일/RN까지 고려 시 추가

- [x] 웹/RN 공통 설계 원칙
- [x] 네이티브 권한 처리 체계
- [x] deep linking
- [x] push notification 연동 구조
- [x] app state/background 처리
- [x] 네트워크 불안정 대응
- [x] secure storage 정책
- [x] 웹뷰 연동 규칙
- [x] 플랫폼 분기 기준(iOS/Android/Web)

---

## M. 배포/운영

- [|] 빌드 파이프라인
- [|] env 주입 전략
- [x] 소스맵 관리
- [x] 에러 모니터링 연동
- [x] analytics 연동
- [x] feature flag
- [x] 유지보수용 공지/점검 모드
- [x] CDN/캐시 정책

---

# 2) 프론트/백엔드 공통으로 꼭 있어야 하는 것

이건 따로 빼야 한다. 많은 사람이 여기서 빠진다. ⚠️

## 공통 체크리스트

- [o] 폴더 구조 원칙
- [x] 네이밍 컨벤션
- [o] 에러 코드 체계
- [o] 환경변수 관리 원칙
- [|] 로깅 원칙
- [|] 테스트 전략 문서
- [o] 예제 코드
- [o] README
- [x] 아키텍처 결정 기록(ADR)
- [|] 보안 기본 정책
- [x] 코드 생성 규칙
- [|] 공통 타입/스키마 공유 전략
- [x] 버전 관리 전략
- [x] deprecation 정책
- [|] 확장 포인트 정의

---

# 3) “프레임워크”로 만들려면 추가로 필요한 것

단순 보일러플레이트와 프레임워크의 차이는 여기서 난다.

## 프레임워크 체크리스트

- [|] 새 프로젝트를 빠르게 시작할 수 있는가
- [o] 팀원이 동일한 구조로 기능을 추가할 수 있는가
- [|] 공통 규칙을 코드로 강제하는가
- [|] 예외 상황 처리 방식이 표준화돼 있는가
- [|] 문서 없이도 구조가 예측 가능한가
- [o] 교체 가능한 부분과 고정된 부분이 분명한가
- [x] 코드 생성기나 스캐폴딩이 있는가
- [o] 템플릿 프로젝트/스타터가 있는가
- [o] 샘플 feature가 포함돼 있는가
- [|] 운영 기준까지 포함하는가

---

# 4) 최소 권장 세트

## 프론트엔드 프레임워크 최소 권장

- [o] Router
- [o] Server state
- [o] Client state
- [o] Form + validation
- [o] Auth bootstrap
- [o] API client
- [|] Layout + error page
- [o] Design system base
- [|] ESLint/Prettier/Husky
- [ ] 테스트 기본셋
- [ ] env/config 관리
- [ ] 배포 빌드 기준

---

# 5) 네가 진짜 만들 때 추천하는 우선순위

네가 지금처럼 **“내가 직접 프레임워크를 만든다”** 관점이면 순서는 이렇게 가는 게 맞다.

## 프론트 우선순위

1. 라우팅
2. API 계층
3. 서버 상태/클라이언트 상태 분리
4. 인증 부트스트랩
5. 폼/검증
6. 공통 UI
7. 에러 처리
8. 테스트/DX
9. 성능/운영

---

# 6) 가장 많이 빠지는 항목만 따로 뽑으면

## 프론트에서 자주 빠짐

- [ ] 401/403/500 구분 처리
- [ ] query key 규칙
- [ ] empty/loading/error UI 표준
- [ ] 서버 상태와 zustand 경계
- [ ] env 타입 검증
- [ ] 공통 폼 래퍼
