---

# 1) 프론트엔드 프레임워크 체크리스트

## A. 런타임/앱 기반

* [ ] 앱 엔트리 구조
* [ ] 라우팅 구조
* [ ] 레이아웃 시스템
* [ ] 에러 바운더리
* [ ] 로딩/서스펜스 처리
* [ ] 404 / 500 / 점검 페이지
* [ ] CSR / SSR / SSG 대응 여부 정의
* [ ] hydration 문제 대응 기준
* [ ] 환경별 실행 모드(dev/staging/prod) 분리

---

## B. 상태 관리

- [ ] 서버 상태 관리 체계
      예: TanStack Query
- [ ] 클라이언트 전역 상태 관리 체계
      예: Zustand, Redux
- [ ] 폼 상태 관리 체계
      예: TanStack Form, RHF
- [ ] URL state 관리 규칙
- [ ] 캐시 키 설계 규칙
- [ ] invalidate / refetch 규칙
- [ ] optimistic update 기준
- [ ] 서버 상태와 클라이언트 상태의 책임 분리 원칙

> 이 부분이 없으면 나중에
> **“뭘 zustand에 넣고 뭘 query에 넣지?”**가 매번 흔들린다.

---

## C. 데이터 접근/API 계층

- [ ] API 클라이언트 래퍼
- [ ] 공통 fetch/axios 인스턴스
- [ ] 인증 토큰/쿠키 처리 방식
- [ ] request/response 인터셉터
- [ ] 에러 응답 정규화
- [ ] 재시도 정책
- [ ] timeout 정책
- [ ] pagination 유틸
- [ ] 파일 업로드/download 유틸
- [ ] API 모듈 구조(feature별 or domain별)

---

## D. 인증/인가

- [ ] 로그인 상태 부트스트랩
- [ ] access/refresh 처리 정책
- [ ] 세션 만료 처리
- [ ] 보호 라우트 처리
- [ ] role/permission 기반 화면 제어
- [ ] 익명 사용자 허용 화면 기준
- [ ] 401 / 403 / 5xx 대응 방식 구분
- [ ] 로그아웃 시 캐시 정리 규칙

---

## E. UI 시스템 / 디자인 시스템

- [ ] 디자인 토큰(color, spacing, radius, shadow, z-index)
- [ ] typography 시스템
- [ ] 버튼/인풋/모달/드롭다운 등 기본 컴포넌트
- [ ] 폼 컴포넌트 표준
- [ ] 피드백 컴포넌트
      예: toast, alert, snackbar, dialog
- [ ] 데이터 표시 컴포넌트
      예: table, list, card, empty state
- [ ] 로딩 UI 표준
      예: skeleton, spinner
- [ ] 다크모드/테마 시스템
- [ ] 아이콘 시스템
- [ ] 반응형 기준점
- [ ] 접근성 규칙(aria, keyboard navigation, focus ring)
- [ ] 컴포넌트 문서화 방식

---

## F. 폼/검증

- [ ] 폼 라이브러리 선택
- [ ] 스키마 검증 라이브러리 선택
- [ ] 입력 에러 메시지 표준
- [ ] submit 중 상태 처리
- [ ] 중복 제출 방지
- [ ] 서버 검증 에러 매핑 규칙
- [ ] 파일/이미지 입력 처리 규칙
- [ ] 날짜/시간 입력 처리 규칙
- [ ] 마스킹/포맷팅 규칙

---

## G. 라우팅/네비게이션

- [ ] route tree 규칙
- [ ] 중첩 라우트 규칙
- [ ] 라우트별 loader/prefetch 정책
- [ ] breadcrumb 생성 규칙
- [ ] 메뉴/사이드바 구조
- [ ] deep link 대응
- [ ] query param 표준
- [ ] route guard 처리 방식

---

## H. 에러 처리

- [ ] 전역 에러 처리 전략
- [ ] 화면 에러 vs API 에러 구분
- [ ] 사용자 메시지 vs 개발자 로그 분리
- [ ] 에러 코드 표준화
- [ ] fallback UI
- [ ] retry UI
- [ ] 네트워크 끊김 대응
- [ ] 오프라인 상태 대응 여부

---

## I. 성능

- [ ] 코드 스플리팅
- [ ] lazy loading
- [ ] 이미지 최적화 기준
- [ ] 번들 크기 점검 기준
- [ ] memoization 기준
- [ ] 리스트 virtualization 필요 여부
- [ ] prefetch 전략
- [ ] 캐시 지속시간 기준
- [ ] 렌더링 병목 디버깅 기준

---

## J. 개발자 경험(DX)

- [ ] 절대경로 alias
- [ ] 환경변수 타입 검증
- [ ] ESLint 규칙
- [ ] Prettier 규칙
- [ ] import 정렬 규칙
- [ ] husky/lint-staged
- [ ] commit convention
- [ ] 코드 생성기 여부
- [ ] 공통 유틸 구조
- [ ] README / 아키텍처 문서
- [ ] 예제 페이지 또는 샌드박스 앱

---

## K. 테스트

- [ ] unit test
- [ ] component test
- [ ] integration test
- [ ] e2e test
- [ ] mocking 전략
- [ ] test data factory
- [ ] fixture 관리
- [ ] accessibility test 여부
- [ ] visual regression 여부

---

## L. 모바일/RN까지 고려 시 추가

- [ ] 웹/RN 공통 설계 원칙
- [ ] 네이티브 권한 처리 체계
- [ ] deep linking
- [ ] push notification 연동 구조
- [ ] app state/background 처리
- [ ] 네트워크 불안정 대응
- [ ] secure storage 정책
- [ ] 웹뷰 연동 규칙
- [ ] 플랫폼 분기 기준(iOS/Android/Web)

---

## M. 배포/운영

- [ ] 빌드 파이프라인
- [ ] env 주입 전략
- [ ] 소스맵 관리
- [ ] 에러 모니터링 연동
- [ ] analytics 연동
- [ ] feature flag
- [ ] 유지보수용 공지/점검 모드
- [ ] CDN/캐시 정책

---

# 2) 백엔드 프레임워크 체크리스트

## A. 앱 기본 구조

- [ ] 엔트리포인트
- [ ] 모듈 시스템
- [ ] feature 단위 구조
- [ ] 공통 shared 모듈
- [ ] bootstrap 로직 분리
- [ ] 환경별 startup 분기
- [ ] graceful shutdown

---

## B. 아키텍처 계층

- [ ] presentation 계층
      controller, route, resolver
- [ ] application 계층
      use case, service orchestration
- [ ] domain 계층
      entity, value object, domain rule
- [ ] infrastructure 계층
      DB, cache, queue, mail, storage
- [ ] port / adapter 구조 여부
- [ ] framework 의존성을 domain 바깥으로 밀어내는 기준
- [ ] feature-first vs layer-first 결정

---

## C. API 계층

- [ ] REST / GraphQL / gRPC 전략
- [ ] DTO 구조
- [ ] request validation
- [ ] response serialization
- [ ] pagination 규약
- [ ] filtering/sorting 규약
- [ ] versioning 전략
- [ ] OpenAPI/Swagger 문서화
- [ ] 공통 응답 포맷
- [ ] API 에러 포맷

---

## D. 인증/인가

- [ ] 인증 방식 결정
      JWT / session / cookie / oauth
- [ ] access/refresh 정책
- [ ] session 저장 전략
- [ ] role/permission 모델
- [ ] guard / policy / permission checker
- [ ] current user context 주입
- [ ] logout / revoke 처리
- [ ] 비밀번호 재설정
- [ ] 이메일 인증
- [ ] 소셜 로그인 확장성

---

## E. 데이터베이스

- [ ] ORM/Query Builder 선택
- [ ] repository 추상화
- [ ] read/write 분리 여부
- [ ] migration
- [ ] seed
- [ ] transaction boundary
- [ ] soft delete 기준
- [ ] audit field(createdAt, updatedAt, deletedAt 등)
- [ ] 다중 DB 대응 여부
- [ ] index / unique / FK 설계 기준
- [ ] common code / enum 관리 원칙

---

## F. 캐시

- [ ] Redis 등 캐시 저장소 연동
- [ ] cache-aside 전략
- [ ] TTL 정책
- [ ] key naming convention
- [ ] invalidation 규칙
- [ ] stampede 방지 여부
- [ ] session/cache 역할 분리

---

## G. 비동기 처리

- [ ] queue 시스템
- [ ] worker 프로세스 구조
- [ ] retry / backoff
- [ ] dead-letter 처리
- [ ] idempotency 기준
- [ ] scheduled jobs / cron
- [ ] event bus / pub-sub
- [ ] outbox pattern 여부
- [ ] webhook 재시도 전략

---

## H. 파일/외부 스토리지

- [ ] 파일 업로드 인터페이스
- [ ] local / S3 추상화
- [ ] presigned URL 지원 여부
- [ ] 파일 검증(mime, size, extension)
- [ ] 이미지/문서 후처리 파이프라인
- [ ] 업로드 권한 제어
- [ ] 바이러스 검사 필요 여부

---

## I. 에러 처리

- [ ] AppError 베이스 클래스
- [ ] Validation / Auth / Forbidden / Conflict / NotFound 구분
- [ ] global exception filter
- [ ] 에러 코드 시스템
- [ ] 사용자 메시지 vs 내부 로그 메시지 분리
- [ ] 외부 API 에러 매핑 규칙
- [ ] DB 에러 매핑 규칙

---

## J. 보안

- [ ] CORS 정책
- [ ] Helmet/security header
- [ ] CSRF 정책
- [ ] rate limiting / throttling
- [ ] brute force 대응
- [ ] password hashing 정책
- [ ] input sanitization
- [ ] file upload 보안
- [ ] secret 관리
- [ ] webhook signature 검증
- [ ] 민감정보 마스킹
- [ ] 감사 로그 필요 여부

---

## K. 설정/config

- [ ] 환경변수 로딩
- [ ] config schema validation
- [ ] typed config
- [ ] env별 config 분리
- [ ] secret manager 연동 가능성
- [ ] feature flag
- [ ] 운영/개발 설정 차이 명확화

---

## L. 관측성(Observability)

- [ ] 구조화 로그
- [ ] request id / correlation id
- [ ] trace id
- [ ] metrics
- [ ] health endpoint
- [ ] readiness/liveness endpoint
- [ ] error monitoring(Sentry 등)
- [ ] tracing(OpenTelemetry 등)
- [ ] audit log
- [ ] 외부 서비스 latency 측정

---

## M. 테스트

- [ ] unit test
- [ ] integration test
- [ ] e2e test
- [ ] repository test
- [ ] contract test
- [ ] fixture/factory
- [ ] test DB 전략
- [ ] mock vs real dependency 기준
- [ ] queue/worker 테스트 전략
- [ ] auth 테스트 전략

---

## N. 운영/배포

- [ ] Dockerfile
- [ ] docker-compose 또는 dev stack
- [ ] CI 파이프라인
- [ ] migration 실행 전략
- [ ] zero-downtime 고려 여부
- [ ] 로그 수집 파이프라인
- [ ] 환경별 배포 전략
- [ ] 롤백 전략
- [ ] 백업/복구 전략
- [ ] PM2/systemd/k8s 운영 기준

---

## O. 개발자 경험(DX)

- [ ] lint / format
- [ ] import alias
- [ ] generator/CLI 템플릿
- [ ] 코드 컨벤션 문서
- [ ] 아키텍처 문서
- [ ] 예제 모듈
- [ ] onboarding 문서
- [ ] local dev bootstrap 스크립트
- [ ] git hooks
- [ ] commit / branch convention

---

# 3) 프론트/백엔드 공통으로 꼭 있어야 하는 것

이건 따로 빼야 한다. 많은 사람이 여기서 빠진다. ⚠️

## 공통 체크리스트

- [ ] 폴더 구조 원칙
- [ ] 네이밍 컨벤션
- [ ] 에러 코드 체계
- [ ] 환경변수 관리 원칙
- [ ] 로깅 원칙
- [ ] 테스트 전략 문서
- [ ] 예제 코드
- [ ] README
- [ ] 아키텍처 결정 기록(ADR)
- [ ] 보안 기본 정책
- [ ] 코드 생성 규칙
- [ ] 공통 타입/스키마 공유 전략
- [ ] 버전 관리 전략
- [ ] deprecation 정책
- [ ] 확장 포인트 정의

---

# 4) “프레임워크”로 만들려면 추가로 필요한 것

단순 보일러플레이트와 프레임워크의 차이는 여기서 난다.

## 프레임워크 체크리스트

- [ ] 새 프로젝트를 빠르게 시작할 수 있는가
- [ ] 팀원이 동일한 구조로 기능을 추가할 수 있는가
- [ ] 공통 규칙을 코드로 강제하는가
- [ ] 예외 상황 처리 방식이 표준화돼 있는가
- [ ] 문서 없이도 구조가 예측 가능한가
- [ ] 교체 가능한 부분과 고정된 부분이 분명한가
- [ ] 코드 생성기나 스캐폴딩이 있는가
- [ ] 템플릿 프로젝트/스타터가 있는가
- [ ] 샘플 feature가 포함돼 있는가
- [ ] 운영 기준까지 포함하는가

---

# 5) 최소 권장 세트

## 프론트엔드 프레임워크 최소 권장

- [ ] Router
- [ ] Server state
- [ ] Client state
- [ ] Form + validation
- [ ] Auth bootstrap
- [ ] API client
- [ ] Layout + error page
- [ ] Design system base
- [ ] ESLint/Prettier/Husky
- [ ] 테스트 기본셋
- [ ] env/config 관리
- [ ] 배포 빌드 기준

## 백엔드 프레임워크 최소 권장

- [ ] Module structure
- [ ] Controller + use case + repository 분리
- [ ] DTO + validation
- [ ] Auth + authorization
- [ ] DB + migration + seed
- [ ] Global error system
- [ ] Config validation
- [ ] Logging
- [ ] Swagger/OpenAPI
- [ ] Test base
- [ ] Docker + CI
- [ ] Health check

---

# 6) 네가 진짜 만들 때 추천하는 우선순위

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

## 백엔드 우선순위

1. 모듈/계층 구조
2. DTO/검증/응답 규약
3. 인증/인가
4. DB/repository/migration
5. 에러 시스템
6. config/logging
7. queue/cron/cache
8. observability
9. 운영/보안 강화

---

# 7) 가장 많이 빠지는 항목만 따로 뽑으면

## 프론트에서 자주 빠짐

- [ ] 401/403/500 구분 처리
- [ ] query key 규칙
- [ ] empty/loading/error UI 표준
- [ ] 서버 상태와 zustand 경계
- [ ] env 타입 검증
- [ ] 공통 폼 래퍼

## 백엔드에서 자주 빠짐

- [ ] transaction boundary
- [ ] 에러 코드 체계
- [ ] request id / correlation id
- [ ] queue retry / idempotency
- [ ] health/readiness 분리
- [ ] config schema validation
- [ ] 파일 업로드 보안
