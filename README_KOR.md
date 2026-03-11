# geofrontFR

## Language

- [English](./README.md)
- [한국어](./README_KOR.md)

geofrontFR는 React, TypeScript, Vite, TanStack Start를 기반으로 한 프론트엔드 애플리케이션 아키텍처 표준이다.

이 프로젝트의 목표는 단순히 라이브러리를 조합하는 것이 아니라, 아래 항목들에 대해 일관된 프레임워크 규약을 정의하는 것이다.

- 라우팅
- 데이터 페칭
- 폼 처리
- 검증
- 인증
- 에러 처리
- SSR/CSR 경계
- UI 구성
- 테스트 규약

geofrontFR는 예측 가능하고, 모듈화되어 있으며, 경계가 명확한 프론트엔드 런타임과 구조를 조합함으로써, 단일 거대 메타 프레임워크에 대한 실용적인 대안을 지향한다.

---

## Required Library v1

- UI library: React + TypeScript
- Build tool: Vite
- Meta framework / SSR: TanStack Start
- Router: TanStack Router
- Server state: TanStack Query
- Client state: Zustand
- Form: TanStack Form
- Validation: Zod
- Environment variables: dotenv
- API client: Axios
- UI components: shadcn/ui
- Styling: Tailwind CSS
- Icons: lucide-react
- Toast: sonner
- Animation: framer-motion
- Unit test: Vitest
- E2E test: Playwright
- Git hooks: Husky
- Lint: ESLint
- Format: Prettier

> API mocking은 v1에서 의도적으로 제외한다.  
> geofrontFR는 기본적으로 실제 개발 서버가 연결된 환경을 전제로 한다.

---

## Core Goal

geofrontFR는 라이브러리 모음이 아니다.  
이것은 애플리케이션 아키텍처 표준이다.

목표는 프론트엔드 애플리케이션을 다음과 같은 상태로 만드는 것이다.

- 예측 가능하게
- 모듈화되게
- 확장 가능하게
- 이해하기 쉽게
- 경계가 명확하게

이 프레임워크는 편의성 중심의 축약보다, 구조적 명확성을 우선한다.

---

## Design Principles

- 편의성보다 책임 경계를 우선한다.
- 서버 상태와 클라이언트 상태를 서로 다른 문제로 본다.
- 흩어진 컴포넌트 내부 fetch보다 route 중심 데이터 로딩을 선호한다.
- 전역 상태는 최소화한다.
- SSR과 CSR의 경계를 명시적으로 유지한다.
- 프레임워크 마법보다 조합 가능한 구조를 선호한다.
- 에러 처리, 인증 흐름, 환경 변수 파싱을 표준화한다.
- primitive UI, common UI, entity UI, feature UI를 명확히 분리한다.
- 역할이 모호한 범용 폴더를 만들지 않는다.
- 모든 상태에 대해 source of truth를 명확히 정한다.

---

## Asset Placement Rule

기본 자산 위치는 아래 세 곳만 사용한다.

- `src/features/seed/images`: 이식된 `seed` UI에 속하는 자산
- `src/shared/assets`: 애플리케이션 공용 자산
- `public`: import 번들링 없이 URL로 직접 서빙되어야 하는 파일

규칙:

- 기본 자산 버킷으로 `src/assets`를 새로 만들지 않는다.
- `seed`가 아닌 자산은 특별한 이유가 없으면 `src/shared/assets`를 우선 사용한다.
- `seed` 자산은 `src/features/seed/images` 안에 유지해서 소유권과 출처 경계를 명확히 한다.
- `public`은 favicon, robots 파일, 기타 정적 passthrough 파일처럼 직접 공개되어야 하는 자산에만 사용한다.


---

## Architecture Overview

geofrontFR는 애플리케이션 코드를 다음 최상위 레이어로 구성한다.

- `app/`: 애플리케이션 런타임 조립
- `routes/`: URL 진입점 및 route 정책
- `features/`: 비즈니스 유스케이스와 기능 구현
- `components/`: feature 비종속 공통 UI
- `entities/`: 도메인 모델과 엔티티 표현
- `shared/`: 진짜 범용 공통 유틸/인프라
- `server/`: 서버 전용 코드
- `test/`: 테스트 공통 자산

---

## Top-level Structure

```txt
src/
  app/
  routes/
  features/
  components/
  entities/
  shared/
  server/
  test/
```

의존 방향:
`[shared] => [entities, components] => [features] => [routes]`, 그리고 `app`은 전체 런타임을 조립한다.

### Expanded Structure

```txt
src/
  app/
    providers/
    router/
    store/
    styles/
    config/

  routes/
    __root.tsx
    index.tsx
    login.tsx
    example/
      index.tsx
      $exampleId.tsx

  features/
    auth/
      api/
      components/
      hooks/
      schemas/
      store/
      utils/
    example/
      api/
      components/
      hooks/
      schemas/
      store/
      utils/

  components/
    ui/
    common/
    layout/

  entities/
    example/
      model/
      types/
      schemas/
      ui/
    user/
      model/
      types/
      schemas/
      ui/

  shared/
    api/
    constants/
    hooks/
    lib/
    schemas/
    types/
    utils/

  server/
    auth/
    api/
    config/
    utils/

  test/
    fixtures/
    mocks/
    utils/
    e2e/
```

---

## Layer Responsibilities

### `app/`

애플리케이션 런타임을 조립하는 레이어.

주요 책임:

- provider 조합
- router 초기화
- QueryClient 초기화
- 전역 스타일 import
- 전역 config 연결
- 앱 전역 UI store
- 앱 부팅 로직

규칙:

- feature 비즈니스 로직을 두지 않는다
- 도메인 전용 UI를 두지 않는다
- 런타임 조립에만 집중한다

---

### `routes/`

URL 진입점 레이어.

주요 책임:

- route 파일
- route params
- route-level `beforeLoad`
- route-level 데이터 로딩
- route-level pending/error 구성
- 페이지 엔트리 조립

규칙:

- routes는 진입점이지 feature 구현 본체가 아니다
- route 파일은 얇게 유지한다
- 재사용 가능한 로직은 `features/`, `entities/`, `shared/`로 이동한다

---

### `features/`

유스케이스 구현 레이어.

주요 책임:

- feature API 호출
- feature hooks
- feature components
- feature validation
- feature 범위 Zustand store
- feature 전용 mapper 및 helper

예시:

- 로그인
- 로그아웃
- example 목록 조회
- example 상세 조회
- example 생성
- example 수정
- 검색/필터링

규칙:

- features는 행동과 워크플로우를 표현한다
- feature 코드는 `entities/`, `components/`, `shared/`에 의존할 수 있다
- feature가 전역 잡동사니 폴더가 되어선 안 된다

---

### `components/`

feature 비종속 UI 레이어.

주요 책임:

- UI primitive
- 공통 조합 UI
- 앱 레이아웃 컴포넌트

규칙:

- 여기 있는 컴포넌트는 특정 feature 워크플로우에 강하게 결합되면 안 된다
- 특정 유스케이스에 깊게 묶인 컴포넌트는 `features/*/components`에 둔다

---

### `entities/`

도메인 모델 레이어.

주요 책임:

- 엔티티 타입
- 엔티티 스키마
- 엔티티 파싱/정규화
- 엔티티 표시 규칙
- 얇은 entity 전용 표현 UI

규칙:

- entities는 도메인 대상 자체를 설명한다
- entities는 워크플로우 컨테이너가 아니다
- 액션이 많은 UI는 여기 두지 않는다

---

### `shared/`

범용 공통 인프라 레이어.

주요 책임:

- 공통 API 인프라
- constants
- generic hooks
- utility functions
- 라이브러리 adapter
- 공통 schemas와 types

규칙:

- 정말 범용적인 코드만 둔다
- `shared/`는 잡동사니 폴더가 되어선 안 된다
- 특정 feature/entity에 속하면 그쪽에 둔다

---

### `server/`

서버 전용 레이어.

주요 책임:

- cookie/session 접근
- 서버 사이드 auth 해석
- 서버 전용 request helper
- private env 접근
- SSR 전용 유틸

규칙:

- 여기의 코드는 client-only 모듈로 새어 나가면 안 된다
- 브라우저 번들에 들어가면 안 되는 코드는 전부 여기 둔다

---

### `test/`

테스트 지원 레이어.

주요 책임:

- 공통 fixtures
- custom render helpers
- mock builders
- e2e helpers
- test-only utilities

규칙:

- 프로덕션 로직은 여기 두지 않는다
- 테스트 인프라는 재사용 가능하고 명시적으로 유지한다

---

## Naming Conventions

규칙:

- React component 이름은 `PascalCase`를 사용한다
- 주 export가 React component인 파일은 `PascalCase.tsx`를 사용한다
- hook과 utility function 이름은 `camelCase`를 사용한다
- hook/utility 파일명은 `camelCase.ts` 또는 `camelCase.tsx`를 사용한다
- 같은 범주 안에서 여러 네이밍 스타일을 섞지 않는다

---

## Subdirectory Conventions

### `app/`

```txt
app/
  providers/
  router/
  store/
  styles/
  config/
```

#### `providers/`

전역 Provider 조합 레이어.

예시:

- QueryClientProvider
- 앱 전역 provider 조합
- global context provider

규칙:

- 애플리케이션 전역 provider 조합은 여기서 처리한다
- feature 전용 런타임 로직은 여기 두지 않는다

#### `router/`

애플리케이션 라우터 런타임 설정 레이어.

예시:

- router instance 생성
- route tree 연결
- router context 설정

규칙:

- 이 디렉터리는 라우터 초기화용이다
- 실제 route 화면 파일은 `routes/`에 둔다

#### `store/`

앱 전역 클라이언트 상태 레이어.

예시:

- theme store
- app shell state
- 전역 UI toggle 상태

규칙:

- 앱 전역 UI/클라이언트 상태만 여기에 둔다
- 서버 상태를 여기 중복 저장하지 않는다
- feature 범위 store는 `features/*/store`에 둔다

#### `styles/`

전역 스타일 진입 레이어.

예시:

- global CSS
- font 등록
- Tailwind base style import

규칙:

- 애플리케이션 전역 스타일만 관리한다
- feature 전용 스타일은 필요 시 해당 feature 가까이에 둔다

#### `config/`

공개 가능한 애플리케이션 설정 레이어.

예시:

- public env 파싱
- runtime config 매핑
- 클라이언트에 노출 가능한 설정값

규칙:

- 클라이언트/public config 접근을 중앙화한다
- 앱 곳곳에서 raw env를 직접 읽지 않는다

---

### `routes/`

```txt
routes/
  __root.tsx
  index.tsx
  login.tsx
  example/
    index.tsx
    $exampleId.tsx
```

#### Route entry files

URL 기준 진입점 파일.

예시:

- `__root.tsx`
- `index.tsx`
- `login.tsx`
- `example/index.tsx`
- `example/$exampleId.tsx`

규칙:

- routes는 URL 진입점과 route 정책을 정의한다
- route 파일은 얇게 유지한다
- route 파일에는 `beforeLoad`, route params 처리, route-level 조립 정도만 둔다
- 재사용 가능한 비즈니스 로직은 `features/`, `entities/`, `shared/`로 이동한다

#### `__root.tsx`

애플리케이션 루트 라우트.

주요 책임:

- 루트 레이아웃 조립
- 최상위 에러 바운더리
- 공통 route shell 구조

규칙:

- 루트 route 역할에만 집중한다
- 앱 전체 잡동사니 로직 컨테이너로 만들지 않는다

---

### `features/`

```txt
features/
  auth/
    api/
    components/
    hooks/
    schemas/
    store/
    utils/
  example/
    api/
    components/
    hooks/
    schemas/
    store/
    utils/
```

#### Feature directories

유스케이스 중심 구현 단위.

예시:

- `auth/`
- `example/`

규칙:

- 각 feature 디렉터리는 하나의 비즈니스 기능 또는 워크플로우를 나타낸다
- feature는 자신만의 UI, API, hooks, schemas, client state를 가질 수 있다

#### `api/`

feature 전용 엔드포인트 함수.

예시:

- `login`
- `logout`
- `getExampleList`
- `getExampleDetail`

규칙:

- 엔드포인트/도메인 전용 API 함수는 여기에 둔다
- 공통 transport 인프라는 `shared/api`에 둔다

#### `components/`

feature 전용 UI 컴포넌트.

예시:

- `LoginForm`
- `ExampleFilterPanel`
- `ExampleCreateForm`

규칙:

- 여기 있는 컴포넌트는 feature 워크플로우를 알아도 된다
- 범용으로 재사용 가능한 컴포넌트라면 `components/`로 이동한다

#### `hooks/`

feature 전용 hook.

예시:

- `useLoginMutation`
- `useExampleListQuery`
- `useExampleFilters`

규칙:

- feature의 행동이나 feature 관점 데이터 접근을 감싸는 hook을 둔다
- 범용 hook은 `shared/hooks`에 둔다

#### `schemas/`

feature 수준 검증 및 입력 스키마.

예시:

- 로그인 폼 schema
- example 생성 폼 schema
- feature filter/search schema

규칙:

- feature 전용 검증은 feature 가까이에 둔다
- 엔티티 형태 자체를 파싱하는 schema는 `entities/*/schemas`에 둔다

#### `store/`

feature 범위 Zustand store.

예시:

- 로그인 단계 상태
- example 필터 UI 상태
- feature 내부 draft 상태

규칙:

- 해당 feature 범위의 클라이언트 상호작용 상태만 둔다
- 서버에서 가져온 canonical 데이터는 기본적으로 여기에 저장하지 않는다

#### `utils/`

feature 내부 helper 함수.

예시:

- payload mapper
- feature 전용 formatter
- request/response adapter

규칙:

- feature에 특화된 helper는 여기 둔다
- 아직 feature-local인 코드를 너무 빨리 `shared/`로 올리지 않는다

### `components/`

```txt
components/
  ui/
  common/
  layout/
```

#### `components/ui`

가장 기본적인 UI primitive.

예시:

- Button
- Input
- Select
- Dialog
- Table
- Badge

규칙:

- feature 지식을 가지지 않는다
- domain 지식을 가지지 않는다
- 비즈니스 워크플로우 로직을 넣지 않는다

#### `components/common`

공통 조합 UI 컴포넌트.

예시:

- PageHeader
- EmptyState
- ConfirmDialog
- SearchBar
- LoadingSection
- ErrorFallback

규칙:

- 여러 route/feature에서 재사용 가능해야 한다
- primitive UI를 조합할 수 있다
- 특정 도메인에 묶이지 않아야 한다

#### `components/layout`

레이아웃/쉘 컴포넌트.

예시:

- AppShell
- AuthLayout
- MainLayout
- SidebarLayout
- MobileBottomNav

규칙:

- 구조와 배치에 집중한다
- 특정 feature 비즈니스 동작을 품지 않는다

---

### `entities/`

```txt
entities/
  example/
    model/
    types/
    schemas/
    ui/
  user/
    model/
    types/
    schemas/
    ui/
```

#### `types/`

엔티티 타입 정의.

#### `schemas/`

엔티티 검증/파싱 스키마.

#### `model/`

엔티티 수준의 해석/가공 로직.

예시:

- label mapping
- normalization
- display value computation
- derived domain fields

#### `ui/`

얇은 엔티티 표현 컴포넌트만 허용.

예시:

- `UserAvatar`
- `ExampleStatusBadge`
- `ExampleSummaryCard`

규칙:

- entity UI는 표현 중심일 때만 허용
- form, dialog, mutation, workflow UI는 두지 않는다

---

### `shared/`

```txt
shared/
  api/
  constants/
  hooks/
  lib/
  schemas/
  types/
  utils/
```

#### `shared/api`

공통 HTTP 인프라.

예시:

- axios instance
- `get/post/patch/delete` request helper
- interceptors
- request wrapper
- 공통 error normalization
- response base types

규칙:

- 공통 HTTP 인프라는 여기 둔다
- 실제 feature endpoint 함수는 여기 두지 않는다
- feature API 파일은 `axios.create(...)`를 직접 만들지 말고 shared axios client를 재사용한다
- shared request helper는 `response.data`까지만 unwrap할 수 있고, payload 해석은 feature 또는 entity 레이어에 둔다
- feature hook이나 UI가 사용하기 전에 shared transport layer에서 HTTP error를 앱 공통 에러 형태로 normalize한다
- development 전용 request/error logging은 feature UI가 아니라 이 레이어에 둔다

#### `shared/constants`

앱 전역 상수.

#### `shared/hooks`

범용 reusable hook.

예시:

- `useDebounce`
- `useDisclosure`
- `useMounted`

#### `shared/lib`

라이브러리 연결/설정 계층.

예시:

- `cn`
- dayjs setup
- formatter adapters
- zod helpers

#### `shared/schemas`

feature 간 공통 schema.

#### `shared/types`

feature 간 공통 type.

#### `shared/utils`

범용 helper 함수.

규칙:

- 작다고 해서 feature-local helper를 여기로 옮기지 않는다
- 진짜 generic할 때만 `shared/`로 승격한다

---

### `server/`

```txt
server/
  auth/
  api/
  config/
  utils/
```

#### `server/auth`

서버 전용 인증 로직.

예시:

- cookie/session parsing
- auth resolution
- server auth guards

#### `server/api`

서버 전용 request helper.

예시:

- backend-to-backend fetch
- SSR preload helpers

#### `server/config`

비공개 서버 환경 변수 조립.

#### `server/utils`

서버 전용 helper 함수.

---

### `test/`

```txt
test/
  fixtures/
  mocks/
  utils/
  e2e/
```

#### `fixtures`

재사용 가능한 가짜 데이터.

#### `mocks`

테스트용 mock/helper.

#### `utils`

custom render/test setup helper.

#### `e2e`

Playwright helper 및 공통 E2E 자산.

---

## Boundary Rules

이 섹션은 geofrontFR에서 가장 중요하다.

### 핵심 분리 모델

- `app`은 애플리케이션 런타임을 조립한다
- `routes`는 URL 진입점과 route 정책을 정의한다
- `features`는 행동과 유스케이스를 구현한다
- `entities`는 도메인 대상과 그 표현을 정의한다
- `components`는 공통 UI를 제공한다
- `shared`는 범용 인프라를 제공한다
- `server`는 서버 전용 로직을 격리한다

### 사고 모델

- `features` = 행동
- `entities` = 도메인 대상
- `components` = 공통 UI
- `shared` = 범용 지원 계층

### 빠른 예시

- `ExampleFilterPanel` → `features/example/components`
- `Button` → `components/ui`
- `ConfirmDialog` → `components/common`
- `ExampleStatusBadge` → `entities/example/ui`
- `normalizeExample` → `entities/example/model`
- `axiosInstance` → `shared/api`

---

## Import Direction Rules

의존성은 책임 기준으로 안쪽/아래 방향으로만 흐르게 유지한다.

### 권장 의존 방향

- `app`은 조립에 필요한 모든 레이어를 의존할 수 있다
- `routes`는 `features`, `components`, `entities`, `shared`를 의존할 수 있다
- `features`는 `entities`, `components`, `shared`를 의존할 수 있다
- `entities`는 `shared`를 의존할 수 있다
- `components`는 `shared`를 의존할 수 있다
- `shared`는 가능한 한 최소한만 의존해야 한다
- `server`는 `shared`를 의존할 수 있지만, client 코드는 `server`를 의존하면 안 된다

### 금지 규칙

- `shared`는 `features`를 import하지 않는다
- `shared`는 `routes`를 import하지 않는다
- `entities`는 `features`를 import하지 않는다
- `components/ui`는 domain/feature 전용 코드를 import하지 않는다
- client-only 모듈은 `server/*`를 import하지 않는다

---

## State Management Rules

geofrontFR는 상태의 소유권을 명시적으로 관리한다.

### Server state

서버에서 가져온 데이터의 기본 source of truth는 **TanStack Query**다.

예시:

- current user
- example list
- example detail
- notifications
- dashboard metrics

규칙:

- 아주 명확한 이유가 없다면 서버 상태를 Zustand에 중복 저장하지 않는다
- 수동 전역 sync보다 query invalidation/refetch를 우선한다

### Client state

클라이언트 상호작용 상태는 **Zustand**를 사용한다.

예시:

- sidebar open/close
- modal visibility
- filter panel toggle
- wizard step
- draft UI state

규칙:

- Zustand는 범위 기준으로 나눈다
- 앱 전역 UI 상태 → `app/store`
- feature 전용 상태 → `features/*/store`

### Current user rule

현재 로그인 사용자 정보는 서버 상태로 취급한다.

권장 패턴:

- Query로 현재 사용자 fetch
- 안정적인 auth query key에 캐시
- 가능하면 `isAuthenticated` 같은 값은 query data에서 derive

---

## Services and Store Directory Policy

geofrontFR는 최상단 generic `services/` 디렉터리를 사용하지 않는다.

이유:

- `services`는 의미가 너무 넓다
- 결국 잡동사니 폴더가 되기 쉽다
- 책임 경계가 흐려진다

대신 책임에 맞춰 배치한다.

- feature-specific API calls → `features/*/api`
- shared HTTP infrastructure → `shared/api`
- domain logic → `entities/*/model`
- feature workflow helpers → `features/*/utils`
- server-only auth/request logic → `server/`*
- third-party integration helpers → `shared/lib`

geofrontFR는 generic 최상단 `stores/` 디렉터리도 사용하지 않는다.

대신:

- 앱 전역 Zustand store → `app/store`
- feature 범위 Zustand store → `features/*/store`

---

## Route Design Rules

Routes는 URL 중심 진입점이다.

규칙:

- route 파일은 얇게 유지한다
- route 파일은 route-level loading과 guard를 가질 수 있다
- 큰 재사용 비즈니스 로직은 route 내부에 두지 않는다
- route 구조는 기술적 분류가 아니라 사용자 기준 URL 구조를 반영한다

geofrontFR는 기본적으로 `_protected/`, `_public/` 같은 폴더를 강제하지 않는다.

인증은 URL 구조가 아니라 route 정책으로 다룬다.

권장 방식:

- auth check와 redirect는 `beforeLoad` 사용
- pathless layout route는 가독성이 좋아질 때만 사용
- URL 구조는 사용자 관점 라우트 설계를 중심으로 유지

---

## Data Loading Rules

route 중심 로딩과 query 기반 캐싱을 선호한다.

규칙:

- 어떤 화면이 어떤 데이터를 필요로 하는지는 route entrypoint가 결정한다
- 재사용 가능한 fetch 로직은 feature hooks 또는 feature query 함수에 둔다
- 원격 데이터의 기본 캐시/source는 TanStack Query다
- 아주 로컬한 UI 데이터가 아니라면 깊은 트리 내부에서 즉흥적으로 fetch를 흩뿌리지 않는다

권장 분리:

- route는 **언제** 데이터가 필요한지 결정한다
- feature는 **어떻게** 데이터를 가져오는지 정의한다
- Query cache가 결과를 저장한다

---

## API Client Rules

### Shared HTTP layer

공통 인프라는 `shared/api`에 둔다.

예시:

- axios instance
- interceptors
- 공통 request helper
- 공통 error normalization

### Feature API layer

엔드포인트별 함수는 `features/*/api`에 둔다.

예시:

- `getExampleList`
- `getExampleDetail`
- `login`
- `logout`

규칙:

- 모든 API 함수를 하나의 전역 API 폴더에 몰아넣지 않는다
- transport 인프라와 endpoint/domain 사용 코드를 분리한다

---

## Error Handling Rules

에러 처리는 프레임워크 전체에서 일관되어야 한다.

### 분류

- route-level navigation/guard/loading errors
- API request errors
- validation errors
- unexpected runtime errors

### 규칙

- route-level 실패는 route-aware error boundary 또는 fallback UI를 사용한다
- request 에러는 가능하면 API 계층에서 정규화한다
- 사용자에게 보이는 메시지는 의도적으로 설계하며, 서버 raw dump를 그대로 노출하지 않는다
- 전역 치명적 실패에는 명확한 fallback 화면이 있어야 한다
- 일시적인 피드백은 toast, 구조적 실패는 page-level UI로 처리한다

---

## Auth Rules

인증은 로컬 패턴이 아니라 프레임워크 차원의 관심사다.

### 원칙

- auth truth는 서버에 있다
- 현재 사용자 정보는 서버 상태다
- route 접근 제어는 route 경계에서 수행한다
- 서버 전용 auth helper는 `server/auth`에 둔다

### 규칙

- 현재 사용자 정보는 Query를 사용한다
- 보호 라우트는 route guard / `beforeLoad`로 처리한다
- auth UI 상태와 auth truth를 분리한다
- 거대한 auth Zustand store 하나를 source of truth로 삼지 않는다

---

## SSR / CSR Boundary Rules

geofrontFR는 TanStack Start를 사용하므로 SSR/CSR 경계를 명시적으로 유지해야 한다.

### SSR 책임

- request-aware logic
- cookie/session access
- private env access
- server-only preloading
- server-only auth resolution

### CSR 책임

- 사용자 인터랙션
- client-only UI state
- browser APIs
- 시각적 전환/애니메이션

### 규칙

- server-only 로직은 `server/`*에 둔다
- client-only UI 모듈에서 `server/*`를 import하지 않는다
- request-aware 로직은 명시적으로 드러나야 한다
- server/client 경계를 모호한 추상화로 숨기지 않는다

---

## UI Separation Rules

UI는 네 가지 범주로 나눈다.

### 1. Primitive UI

위치: `components/ui`

예시:

- Button
- Input
- Dialog

### 2. Common UI

위치: `components/common`

예시:

- ConfirmDialog
- EmptyState
- LoadingSection

### 3. Entity UI

위치: `entities/*/ui`

예시:

- UserAvatar
- ExampleStatusBadge

### 4. Feature UI

위치: `features/*/components`

예시:

- LoginForm
- ExampleFilterPanel
- ExampleCreateForm

### 판단 기준

- 도메인 대상을 표현하면 → `entities/*/ui`
- 유스케이스/워크플로우를 수행하면 → `features/*/components`
- 범용 UI면 → `components/*`

---

## Environment Management Rules

환경 변수는 명시적이고 검증 가능해야 한다.

### 목표

- public/private config 분리
- 환경 변수 파싱 및 검증
- 앱 곳곳에서 raw env 접근 금지

### 권장 분리

- client/public config → `app/config`
- server/private config → `server/config`

### 규칙

- raw env 값을 여기저기서 직접 읽지 않는다
- 환경 변수 파싱을 중앙화한다
- 중요한 값은 초기에 검증한다

---

## Testing Rules

테스트는 책임 기준으로 나눈다.

### Unit tests

**Vitest** 사용 대상:

- utility functions
- model logic
- isolated hooks
- isolated UI logic

### Component/integration tests

**Vitest** + testing utilities 사용 대상:

- feature component behavior
- interaction logic
- provider가 필요한 렌더링 테스트

### E2E tests

**Playwright** 사용 대상:

- auth flow
- route navigation
- 실제 사용자 시나리오
- 브라우저 통합 동작

### 규칙

- 필요하면 테스트 파일은 소스 근처에 배치한다
- 공통 테스트 헬퍼는 `test/`*에 둔다
- 필요 이상으로 프레임워크 경계를 과하게 mocking하지 않는다
- 구현 세부보다 동작을 검증한다

---

## Default Source-of-Truth Rules

모든 상태는 먼저 source of truth를 정한다.

### 예시

#### Current authenticated user

- source of truth: server + TanStack Query

#### Example list/detail

- source of truth: server + TanStack Query

#### Sidebar open state

- source of truth: Zustand 또는 local component state

#### Dialog visibility

- source of truth: local state 또는 필요 시 Zustand

#### Form input

- source of truth: TanStack Form

#### Entity parsing/shape validation

- source of truth: Zod schemas

#### Environment variables

- source of truth: client-safe 값은 `app/config/public-env.ts`
- source of truth: server-only 값은 `server/config/env.ts`

규칙:

- feature, route, component, shared runtime 코드에서 `process.env`를 직접 읽지 않는다
- public env module 바깥에서 `import.meta.env`를 직접 읽지 않는다
- config 경계에서 한 번만 검증하고 typed value를 export한다
- client-safe env와 server-only env를 명시적으로 분리한다
- client bundle에는 `VITE_*` 값만 노출한다

---

## Example Module Walkthrough

의도한 레이어 흐름은 `example` 모듈을 기준으로 보면 된다.

### 요청 / 렌더링 흐름

1. `src/routes/example/index.tsx`
   route 진입점이다. `queryClient.ensureQueryData(...)`로 서버 상태를 미리 적재하고 feature page를 렌더링한다.
2. `src/features/example/hooks/exampleQueries.ts`
   목록/상세 요청에 대한 TanStack Query 옵션을 정의한다.
3. `src/features/example/api/getExampleList.ts`
   shared API client helper를 호출하고 typed feature data를 반환한다.
4. `src/shared/api/apiClient.ts`
   재사용 가능한 `get/post/patch/delete` helper를 제공하고 transport 응답을 unwrap한다.
5. `src/shared/api/axiosInstance.ts`
   공통 HTTP 인프라다. interceptor, base client 설정, error normalization, development 전용 로깅은 여기 둔다.
6. `src/shared/api/normalizeApiError.ts`
   transport/library error를 안정적인 앱 공통 에러 형태로 변환한다.
7. `src/entities/example/model/parseExample.ts`
   feature code가 사용하기 전에 원격 payload를 entity schema로 파싱한다.
8. `src/entities/example/ui/ExampleSummaryCard.tsx`
   feature page가 사용하는 얇은 entity presentation이다.
9. `src/features/example/components/ExampleListPage.tsx`
   query hook, Zustand filter store, entity UI를 조합하는 feature 화면이다.

### 상세 화면 흐름

1. `src/routes/example/$exampleId.tsx`
   route param을 읽고 detail query를 preload한다.
2. `src/features/example/hooks/useExampleDetailQuery.ts`
   query options를 feature component에 연결한다.
3. `src/features/example/components/ExampleDetailPage.tsx`
   feature 수준의 detail screen을 렌더링한다.

### 파일 책임 가이드

- `src/entities/example/types/example.ts`
  도메인 타입 정의.
- `src/entities/example/schemas/exampleSchema.ts`
  entity 검증 및 파싱 스키마.
- `src/features/example/schemas/exampleFilterSchema.ts`
  feature-local filter schema.
- `src/features/example/store/useExampleFilterStore.ts`
  feature 범위의 client state 전용.
- `src/features/example/utils/filterExamples.ts`
  feature-local workflow helper.
- `src/shared/api/types.ts`
  feature들이 공유하는 앱 공통 API 에러 타입.
- `src/shared/api/apiClient.ts`
  shared HTTP verb를 감싸는 얇은 transport helper.

새 개발자가 화면 하나를 end-to-end로 따라가려면 route 파일에서 시작해서 query options, feature API, entity parser, 마지막으로 feature component 순서로 보면 된다.

---

## Anti-patterns

다음 패턴은 피한다.

- generic `services/` dumping ground
- generic top-level `stores/` dumping ground
- 서버 상태를 기본값처럼 Zustand에 중복 저장하기
- 무거운 비즈니스 로직을 route 파일에 직접 작성하기
- 아직 feature-local인 helper를 너무 빨리 `shared/`로 올리기
- 서버 전용 코드를 client bundle에 섞기
- primitive UI와 workflow UI를 한 폴더에 섞기
- `shared/`를 misc 폴더처럼 쓰기
- auth truth를 거대한 client store 안에 숨기기
- source of truth가 불분명한 아키텍처

---

## Summary

geofrontFR는 명시적인 경계를 중심으로 설계된다.

각 레이어가 자기 책임을 지킬 때 구조가 유지된다.

- `app`은 조립한다
- `routes`는 진입한다
- `features`는 실행한다
- `entities`는 설명한다
- `components`는 표현한다
- `shared`는 지원한다
- `server`는 격리한다
- `test`는 검증한다

책임이 불분명하다면, 그 코드는 대체로 잘못된 위치에 있을 가능성이 높다.

---

## v1 Practical Rule

코드를 어디 둘지 애매하면 다음 순서로 자문한다.

1. 앱 런타임 조립인가?
2. route 진입 / route 정책인가?
3. feature 워크플로우인가?
4. 도메인 대상 로직인가?
5. 재사용 UI인가?
6. 진짜 범용 공통 코드인가?
7. 서버 전용 코드인가?
8. 테스트 전용 코드인가?

가장 먼저 명확하게 해당하는 답이, 대체로 올바른 디렉터리를 결정한다.

---


## Seed Usage Policy

`seed`는 제품 아키텍처의 기준점이 아니라, 빠르게 활용할 수 있는 UI 자산 인벤토리로 취급한다.

규칙:

- 새 요구사항이 들어오면 먼저 `seed`에서 재사용 가능한 화면, 레이아웃 블록, 표현용 컴포넌트를 찾는다.
- 적절한 `seed` 자산이 있으면 가능한 최소 수정만 해서 재사용한다.
- `seed`에 필요한 UI가 없으면 `components/ui`, `shadcn/ui`, 또는 현재 프로젝트의 공용 UI 방식으로 새로 만든다.
- 새로 만든 UI가 여러 feature에서 반복되기 시작하면 공용 컴포넌트로 승격하고 `seed` 직접 의존은 점차 줄인다.
- 실제 제품 워크플로우와 도메인 동작은 `features/<domain>`에 쌓고, `seed`에는 넣지 않는다.
- `seed`는 빠른 시작용 UI inventory, `components/ui`는 검증된 공용 UI, `features/*`는 실제 제품 코드로 본다.
- 반복되는 제품 요구가 충분히 쌓여서 리팩터링 비용 회수가 명확해지기 전까지는, `seed`를 geofrontFR 구조로 전면 재작성하는 작업을 우선순위로 잡지 않는다.
- `seed` 페이지를 보관만 하고 현재 라우터 트리에서는 빼고 싶다면, route entry 파일을 `src/routes/-legacy/...` 같은 `-` prefix 파일/폴더 아래로 옮겨 비활성화한다.
- 이 경우 실제 페이지/컴포넌트 구현은 유지하고 route entry만 비활성화하는 방식을 우선해서, 보관한 템플릿 화면을 나중에 쉽게 다시 붙일 수 있게 한다.

---

## License

`src/features/seed` 아래의 모든 파일에 대한 권리는 [Cruip](https://cruip.com/)에 있다.

- 해당 자산은 무단 재배포를 금한다.
- Cruip에서 정식 라이선스를 구매한 조건에서만 사용해야 한다.

이 저장소의 그 외 모든 소스 코드는 geo lucason의 자산이다.

- 개인적 이용과 상업적 이용을 허용한다.
- 파생 소스 또는 재사용 소스에는 출처로 [https://github.com/GEOkettle/tanstackseed](https://github.com/GEOkettle/tanstackseed)를 남겨야 한다.
