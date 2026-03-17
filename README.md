# geofrontFR

## Language

- [English](./README.md)
- [한국어](./README_KOR.md)

geofrontFR is a frontend application architecture standard built on top of React, TypeScript, Vite, and TanStack Start.

Its goal is not just to assemble libraries, but to define a consistent application framework for:

- routing
- data fetching
- form handling
- validation
- authentication
- error handling
- SSR/CSR boundaries
- UI composition
- testing conventions

This project aims to provide a practical alternative to monolithic meta-framework workflows by composing a predictable, modular frontend runtime and architecture.

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

---

## Core Goal

geofrontFR is not a collection of libraries.  
It is an application architecture standard.

The objective is to make frontend applications:

- predictable
- modular
- scalable
- easy to reason about
- explicit about boundaries

The framework prioritizes architecture clarity over convenience shortcuts.

---

## Design Principles

- Prefer clear responsibility boundaries over convenience abstractions.
- Treat server state and client state as separate concerns.
- Prefer route-oriented data loading over scattered component fetching.
- Keep global state minimal.
- Keep SSR and CSR boundaries explicit.
- Favor composition over framework magic.
- Standardize error handling, auth flow, and environment parsing.
- Separate primitive UI, common UI, entity UI, and feature UI clearly.
- Do not introduce generic folders with vague responsibilities.
- Make the source of truth explicit for every piece of state.

---

## Server Boundary Rule

geofrontFR uses TanStack Start as an SSR runtime, not as the primary domain backend.

The default server boundary is:

- TanStack Start server: SSR rendering, request-scoped auth resolution, cookie/header reading, private environment access, and minimal server-only orchestration
- External API server: domain business logic, persistent data access, authentication APIs, and business-oriented mutations/queries

Rules:

- Do not move core domain business logic into the TanStack Start server by default.
- Do not treat `server/` as a second full backend application.
- Prefer calling the external API server for business data and mutations.
- Use the TanStack Start server when SSR requires request-aware logic such as auth resolution, protected route decisions, or request-scoped API forwarding.
- Keep the SSR layer thin and explicit.

---

## Asset Placement Rule

Use only these asset locations by default:

- `src/features/seed/images`: assets that belong to the imported `seed` UI
- `src/shared/assets`: shared application assets
- `public`: files that must be served directly by URL without import bundling

Rules:

- Do not introduce `src/assets` as a new default bucket.
- Prefer `src/shared/assets` for non-seed assets unless there is a strong reason to place them elsewhere.
- Keep `seed` assets inside `src/features/seed/images` so ownership and source boundaries remain explicit.
- Use `public` only for files that should remain direct public files such as favicons, robots files, or other static passthrough assets.

---

## Architecture Overview

geofrontFR organizes application code into the following top-level layers:

- `app/`: application runtime assembly
- `routes/`: URL entrypoints and route policies
- `features/`: business use-cases and feature implementation
- `components/`: feature-independent shared UI
- `entities/`: domain models and entity-level representation
- `shared/`: truly cross-cutting utilities and infrastructure
- `server/`: server-only code
- `test/`: shared testing assets

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

Dependency direction:
`[shared] => [entities, components] => [features] => [routes]`, and `app` assembles the whole runtime.

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

Application runtime assembly layer.

Responsibilities:

- provider composition
- router initialization
- QueryClient initialization
- global style imports
- global config wiring
- app-wide UI store
- app bootstrap logic

Rules:

- do not place feature business logic here
- do not place domain-specific UI here
- keep this layer focused on runtime setup

---

### `routes/`

URL entrypoint layer.

Responsibilities:

- route files
- route params
- route-level `beforeLoad`
- route-level data loading
- route-level pending/error composition
- page entry composition

Rules:

- routes are entrypoints, not feature containers
- keep route files thin
- move reusable logic to `features/`, `entities/`, or `shared/`

---

### `features/`

Use-case implementation layer.

Responsibilities:

- feature API calls
- feature hooks
- feature components
- feature validation
- feature-scoped Zustand stores
- feature-specific mappers and helpers

Examples:

- login
- logout
- example list query
- example detail query
- create example
- update example
- search and filtering

Rules:

- features represent behavior and workflows
- feature code may depend on `entities/`, `components/`, and `shared/`
- features should not become global dumping grounds

---

### `components/`

Feature-independent UI layer.

Responsibilities:

- UI primitives
- shared composed UI
- app layout components

Rules:

- components here must not be tightly coupled to a specific feature workflow
- if a component is deeply tied to one use-case, it belongs in `features/*/components`

---

### `entities/`

Domain model layer.

Responsibilities:

- entity types
- entity schemas
- entity parsing and normalization
- entity display rules
- thin entity-specific presentational UI

Rules:

- entities describe the domain object itself
- entities are not workflow containers
- action-heavy UI does not belong here

---

### `shared/`

Cross-cutting infrastructure layer.

Responsibilities:

- shared API infrastructure
- constants
- generic hooks
- utility functions
- library adapters
- common schemas and types

Rules:

- only place code here if it is truly cross-domain
- `shared/` must not become a dumping ground
- if code belongs to a feature or entity, keep it there

---

### `server/`

Server-only layer.

Responsibilities:

- cookie/session access
- server-side auth resolution
- server-only request helpers
- private env access
- SSR-only utilities

Rules:

- code here must never leak into client-only modules
- anything unsafe for browser bundles belongs here

---

### `test/`

Testing support layer.

Responsibilities:

- shared fixtures
- custom render helpers
- mock builders
- e2e helpers
- test-only utilities

Rules:

- production logic does not belong here
- keep testing infrastructure reusable and explicit

---

## Naming Conventions

Rules:

- React component names use `PascalCase`
- files whose primary export is a React component use `PascalCase.tsx`
- hooks and utility function names use `camelCase`
- files for hooks and utility functions use `camelCase.ts` or `camelCase.tsx`
- do not mix multiple naming styles for the same category

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

Global provider composition layer.

Examples:

- QueryClientProvider
- app-level provider composition
- global context providers

Rules:

- compose application-wide providers here
- avoid placing feature-specific runtime logic in this layer

#### `router/`

Application router runtime setup.

Examples:

- router instance creation
- route tree wiring
- router context configuration

Rules:

- this directory is for router initialization, not route screen implementation
- route entry files belong in `routes/`, not here

#### `store/`

Application-wide client state.

Examples:

- theme store
- app shell state
- global UI toggles

Rules:

- only app-wide UI/client state belongs here
- do not duplicate server state here
- feature-scoped stores belong in `features/*/store`

#### `styles/`

Global styling entry layer.

Examples:

- global CSS
- font registration
- Tailwind base style imports

Rules:

- keep this directory focused on application-wide styling
- feature-scoped styles should stay close to their feature when necessary

#### `config/`

Public application configuration layer.

Examples:

- public env parsing
- runtime config mapping
- client-safe configuration values

Rules:

- centralize client/public config access here
- avoid scattering raw environment access across the app

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

URL-oriented entrypoint files.

Examples:

- `__root.tsx`
- `index.tsx`
- `login.tsx`
- `example/index.tsx`
- `example/$exampleId.tsx`

Rules:

- routes define URL entrypoints and route policy
- keep route files thin
- route files may contain `beforeLoad`, route params handling, and route-level composition
- reusable business logic should be moved to `features/`, `entities/`, or `shared/`

#### `__root.tsx`

Application root route.

Responsibilities:

- root layout composition
- top-level error boundaries
- shared route shell structure

Rules:

- keep it focused on root route concerns
- do not turn it into a generic app logic container

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

Use-case oriented implementation units.

Examples:

- `auth/`
- `example/`

Rules:

- each feature directory represents a business capability or workflow
- features own their local UI, API, hooks, schemas, and client state when needed

#### `api/`

Feature-specific endpoint functions.

Examples:

- `login`
- `logout`
- `getExampleList`
- `getExampleDetail`

Rules:

- place endpoint/domain-specific API functions here
- shared transport infrastructure belongs in `shared/api`

#### `components/`

Feature-specific UI components.

Examples:

- `LoginForm`
- `ExampleFilterPanel`
- `ExampleCreateForm`

Rules:

- components here may know the feature workflow
- if a component is generic and reusable across unrelated features, move it to `components/`

#### `hooks/`

Feature-specific hooks.

Examples:

- `useLoginMutation`
- `useExampleListQuery`
- `useExampleFilters`

Rules:

- hooks here should encapsulate feature behavior or feature-facing data access
- generic hooks belong in `shared/hooks`

#### `schemas/`

Feature-level validation and input schemas.

Examples:

- login form schema
- example create form schema
- feature filter/search schema

Rules:

- keep feature-specific validation close to the feature
- entity shape parsing belongs in `entities/*/schemas`

#### `store/`

Feature-scoped Zustand stores.

Examples:

- login step state
- example filter UI state
- feature-local draft state

Rules:

- only client interaction state scoped to the feature belongs here
- do not store server-fetched canonical data here by default

#### `utils/`

Feature-local helper functions.

Examples:

- payload mappers
- feature-specific formatters
- request/response adapters

Rules:

- keep helpers here when they are specific to the feature
- do not promote code to `shared/` too early

````

### `components/`

```txt
components/
  ui/
  common/
  layout/
````

#### `components/ui`

Primitive UI building blocks.

Examples:

- Button
- Input
- Select
- Dialog
- Table
- Badge

Rules:

- no feature knowledge
- no domain knowledge
- no business workflow logic

#### `components/common`

Shared composed UI components.

Examples:

- PageHeader
- EmptyState
- ConfirmDialog
- SearchBar
- LoadingSection
- ErrorFallback

Rules:

- reusable across multiple routes/features
- may compose primitive UI
- should remain domain-agnostic

#### `components/layout`

Layout and shell components.

Examples:

- AppShell
- AuthLayout
- MainLayout
- SidebarLayout
- MobileBottomNav

Rules:

- concerned with structure and placement
- not with feature-specific business behavior

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

Entity type definitions.

#### `schemas/`

Entity validation/parsing schemas.

#### `model/`

Entity-level transformation and interpretation logic.

Examples:

- label mapping
- normalization
- display value computation
- derived domain fields

#### `ui/`

Thin entity representation components only.

Examples:

- `UserAvatar`
- `ExampleStatusBadge`
- `ExampleSummaryCard`

Rules:

- entity UI is allowed only when it is presentation-focused
- forms, dialogs, mutations, and workflow UI do not belong here

### Placement Heuristics: `entities` vs `components` vs `features`

Use these questions when placement feels ambiguous:

- does it primarily represent a domain noun that can be reused across flows? put it in `entities`
- does it contain a use-case, workflow, mutation, form, search, filter, or route-driven behavior? put it in `features`
- is it generic UI without domain-specific behavior? put it in `components`

Quick examples:

- `UserAvatar`, `RoleChip`, `AcademyCard` -> `entities`
- `SigninForm`, `InviteMemberDialog`, `AcademySearchPanel` -> `features`
- `Dialog`, `EmptyState`, `PageHeader` -> `components`

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

Shared HTTP infrastructure.

Examples:

- axios instance
- `get/post/patch/delete` request helpers
- interceptors
- request wrapper
- common error normalization
- response base types

Rules:

- shared HTTP infrastructure belongs here
- actual feature endpoint functions do not
- feature API files should reuse the shared axios client instead of calling `axios.create(...)`
- shared request helpers may unwrap `response.data`, but payload interpretation still belongs to the feature or entity layer
- normalize HTTP errors in shared transport infrastructure before feature hooks or UI consume them
- development-only request/error logging belongs in this layer, not inside feature UI

#### `shared/constants`

App-wide constants.

#### `shared/hooks`

Generic reusable hooks.

Examples:

- `useDebounce`
- `useDisclosure`
- `useMounted`

#### `shared/lib`

Library-oriented setup and adapters.

Examples:

- `cn`
- dayjs setup
- formatter adapters
- zod helpers

#### `shared/schemas`

Cross-feature common schemas.

#### `shared/types`

Cross-feature common types.

#### `shared/utils`

Generic helper functions.

Rules:

- do not move feature-local helpers here just because they are small
- move code to `shared/` only when it is truly generic and reusable

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

Server-only authentication logic.

Examples:

- cookie/session parsing
- auth resolution
- server auth guards

#### `server/api`

Server-only request helpers.

Examples:

- backend-to-backend fetch
- SSR preload helpers

#### `server/config`

Private server environment wiring.

#### `server/utils`

Server-only helper functions.

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

Reusable fake data.

#### `mocks`

Test doubles and mock helpers.

#### `utils`

Custom render/test setup helpers.

#### `e2e`

Playwright helpers and shared E2E assets.

---

## Boundary Rules

This is the most important part of geofrontFR.

### Core separation model

- `app` assembles the application runtime
- `routes` define URL entrypoints and route policy
- `features` implement behavior and use-cases
- `entities` define domain objects and their representation
- `components` provide shared UI
- `shared` provides reusable infrastructure
- `server` isolates server-only logic

### Mental model

- `features` = behavior
- `entities` = domain object
- `components` = shared UI
- `shared` = generic cross-cutting support

### Quick examples

- `ExampleFilterPanel` → `features/example/components`
- `Button` → `components/ui`
- `ConfirmDialog` → `components/common`
- `ExampleStatusBadge` → `entities/example/ui`
- `normalizeExample` → `entities/example/model`
- `axiosInstance` → `shared/api`

---

## Import Direction Rules

Keep dependencies flowing inward and downward in responsibility.

### Recommended dependency direction

- `app` may depend on everything needed for assembly
- `routes` may depend on `features`, `components`, `entities`, and `shared`
- `features` may depend on `entities`, `components`, and `shared`
- `entities` may depend on `shared`
- `components` may depend on `shared`
- `shared` should depend on as little as possible
- `server` may depend on `shared`, but client code must not depend on `server`

### Anti-rules

- `shared` must not import from `features`
- `shared` must not import from `routes`
- `entities` must not import from `features`
- `components/ui` must not import domain-specific feature code
- client-only modules must not import `server/`\*

---

## State Management Rules

geofrontFR uses explicit state ownership.

### Server state

Use **TanStack Query** as the default source of truth for server-fetched data.

Examples:

- current user
- example list
- example detail
- notifications
- dashboard metrics

Rules:

- do not duplicate server state into Zustand unless there is a very explicit reason
- prefer query invalidation/refetch over manual global syncing

### Client state

Use **Zustand** for client-only interaction state.

Examples:

- sidebar open/close
- modal visibility
- filter panel toggle
- wizard step
- draft UI state

Rules:

- keep Zustand scoped by responsibility
- app-wide UI state → `app/store`
- feature-scoped state → `features/*/store`

### Current user rule

The current authenticated user is treated as server state.

Recommended pattern:

- fetch current user with Query
- cache under a stable auth query key
- derive booleans like `isAuthenticated` from query data when possible

---

## Services and Store Directory Policy

geofrontFR does **not** use a generic top-level `services/` directory.

Why:

- `services` is too vague
- it tends to become a dumping ground
- responsibility boundaries become unclear

Instead, place code by responsibility:

- feature-specific API calls → `features/*/api`
- shared HTTP infrastructure → `shared/api`
- domain logic → `entities/*/model`
- feature workflow helpers → `features/*/utils`
- server-only auth/request logic → `server/`\*
- third-party integration helpers → `shared/lib`

geofrontFR also does **not** use a generic top-level `stores/` directory.

Instead:

- app-wide Zustand stores → `app/store`
- feature-scoped Zustand stores → `features/*/store`

---

## Route Design Rules

Routes are URL-oriented entrypoints.

Rules:

- route files should stay thin
- route files may perform route-level loading and guards
- route files should not contain large reusable business logic
- route structure should reflect URL structure, not arbitrary technical grouping

geofrontFR does not require folders like `_protected/` or `_public/` by default.

Authentication is treated as route policy, not as primary URL grouping.

Recommended approach:

- use `beforeLoad` for auth checks and redirects
- use pathless layout routes only when they improve clarity
- keep URL structure centered on user-facing route design

---

## Data Loading Rules

Prefer route-oriented loading and query-based caching.

Rules:

- route entrypoints decide what data a screen needs
- reusable fetching logic belongs in feature hooks or feature query functions
- TanStack Query remains the default cache/source for remote data
- avoid scattered ad hoc fetching deep in the tree unless it is truly local UI data

Recommended separation:

- route decides **when** data is needed
- feature layer defines **how** data is fetched
- Query cache stores the result

---

## API Client Rules

### Shared HTTP layer

Place shared infrastructure in `shared/api`.

Examples:

- axios instance
- interceptors
- common request helpers
- shared error normalization

### Feature API layer

Place endpoint-specific functions in `features/*/api`.

Examples:

- `getExampleList`
- `getExampleDetail`
- `login`
- `logout`

Rules:

- do not put every API function into a single global API directory
- separate transport infrastructure from endpoint/domain usage

---

## Error Handling Rules

Errors must be handled consistently across the framework.

### Categories

- route-level navigation/guard/loading errors
- API request errors
- validation errors
- unexpected runtime errors

### Rules

- route-level failures should use route-aware error boundaries or fallback UI
- request errors should be normalized at the API layer when possible
- user-facing messages should be intentional, not raw server dumps
- global catastrophic failures should have a clear fallback screen
- transient feedback belongs in toast; structural failure belongs in page-level UI

### Form and Mutation UX

- field-level validation errors belong inline near the corresponding input
- authentication failures for forms such as sign-in belong in form-level inline UI, not toast
- network or unknown mutation failures should use `sonner` toast for transient feedback
- do not rely on seed-local toast implementations when project-standard `sonner` feedback is already defined

---

## Auth Rules

Authentication is treated as a framework concern, not a random local pattern.

### Principles

- auth truth comes from the server
- current user is server state
- route access is enforced at the route boundary
- server-only auth helpers stay in `server/auth`

### Rules

- use Query for current user data
- use route guards / `beforeLoad` for protected navigation
- keep auth UI state separate from auth truth
- do not use a giant auth Zustand store as the single source of truth

### Auth Modes

`VITE_AUTH_MODE` supports two external API contracts:

- `cookie`: the external API sets auth cookies and the frontend reuses them
- `bearer`: the external API returns `accessToken` and `refreshToken` in the response body

Current implementation detail:

- in `cookie` mode, auth requests go directly from the frontend runtime to the external API
- in `bearer` mode, auth requests go through TanStack Start BFF handlers
- in `bearer` mode, the browser does **not** store the raw refresh token in `AUTH_SESSION_COOKIE_NAME`
- `AUTH_SESSION_COOKIE_NAME` stores a server session id, and the actual `accessToken` / `refreshToken` stay in a Redis-backed server auth session store

### Current Auth Flow Matrix

| Render mode | `cookie` mode                                                                                                                                                                                                                                                                                                                                                                                  | `bearer` mode                                                                                                                                                                                                                                                                                                                           |
| ----------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| CSR         | Browser calls auth APIs directly with `Query`/mutations. Cookie-based auth is sent to the external API with `withCredentials`. `me` is cached under the auth query key.                                                                                                                                                                                                                        | Browser auth actions still call BFF server functions. The browser sends only the httpOnly session cookie, and the BFF reads the session id from `AUTH_SESSION_COOKIE_NAME`, loads the stored bearer session from Redis, and injects the required headers before calling the external API. `me` is still cached with `Query`.            |
| SSR         | `signin` / `signout` / `refresh` still go from the browser directly to the external API. For SSR protected-route auth resolution, TanStack Start reads the incoming request cookie header and calls external `/auth/me` on the server. Other general data requests usually continue through the normal browser + `Query` flow unless a route explicitly introduces a server-side preload path. | Browser auth requests still enter the same BFF path first. TanStack Start reads `AUTH_SESSION_COOKIE_NAME`, resolves the server-side bearer session from Redis, sends `Authorization` for access-token-based requests such as `/auth/me`, sends `x-refresh-token` for refresh requests, and uses both headers when sign-out needs them. |

### Bearer Mode Notes

The current bearer implementation is SSR-oriented BFF auth:

- sign-in calls the external API login endpoint from the server
- the server stores `accessToken`, `refreshToken`, `tokenType`, and expiry in a Redis-backed server auth session store
- the browser receives only an httpOnly session cookie containing the generated session id
- after sign-in, later auth requests read the session id from the cookie and resolve token data from the Redis-backed server auth session store
- `/auth/me` is resolved on the server with the stored access token via the `Authorization` header
- when `/auth/me` returns `401`, the server refreshes with `x-refresh-token`, updates the Redis-backed server auth session, and retries
- sign-out clears both the upstream auth state and the local Redis-backed server auth session

This means bearer mode is currently designed for SSR + BFF usage, even when the user action starts from CSR UI.

### Redis Session Runtime

Bearer mode expects a Redis-backed auth session store.

Development example:

```bash
docker compose --env-file .env.development -f docker-compose.dev.yml up -d
```

Production example:

```bash
docker compose --env-file .env.production -f docker-compose.prod.yml up -d
```

Recommended env values depend on where the frontend server runs:

- when the app runs on the host machine and Redis runs in Docker, use host-accessible values such as `REDIS_HOST=127.0.0.1`
- when both app and Redis run inside the same Docker network, use the Redis service name such as `REDIS_HOST=redis`

### SPA Mode Notes

TanStack Start also supports SPA mode via `tanstackStart({ spa: { enabled: true } })`.

Official references:

- https://tanstack.com/start/latest/docs/framework/react/guide/spa-mode
- https://tanstack.com/start/v0/docs/framework/react/guide/selective-ssr

Current project impact if SPA mode is enabled without other changes:

- initial route rendering will stop relying on SSR route resolution and move to client-side route resolution after hydration
- the current SSR auth guard path in `_app` route `beforeLoad` and `server/auth/requireUser` will no longer be the primary first-request auth gate
- `cookie` mode will lose its current SSR protected-route `/auth/me` resolution path and will depend more heavily on client `Query` bootstrap
- `bearer` mode can still keep BFF auth handlers, but their role becomes token protection and refresh orchestration rather than SSR-first auth resolution
- protected pages may briefly show pending client state before redirecting because auth is determined after hydration
- server functions and server routes can still be used, but deployment must continue to forward server-function requests correctly

Recommended path to move this project safely to SPA-only:

- enable SPA mode in `vite.config.ts`
- remove the current SSR-only auth branch from route guards and use client-side `ensureCurrentUser(...)` as the primary protected-route check
- keep BFF auth handlers for `bearer` mode so access and refresh tokens remain hidden from the browser
- update the auth-mode documentation so `cookie` mode is described as browser-driven auth resolution rather than SSR-assisted auth resolution
- add explicit pending/loading UX for protected routes to avoid auth flicker during hydration
- verify deployment routing so `/_serverFn/*` and other server-only endpoints still reach the app server correctly
- if a gradual migration is preferred, consider selective SSR reduction first instead of switching the whole app to SPA mode at once

---

## SSR / CSR Boundary Rules

geofrontFR uses TanStack Start, so SSR/CSR boundaries must remain explicit.

### SSR responsibilities

- request-aware logic
- cookie/session access
- private env access
- server-only preloading
- server-only auth resolution

### CSR responsibilities

- user interaction
- client-only UI state
- browser APIs
- visual transitions

### Rules

- server-only logic belongs in `server/`\*
- do not import `server/`\* into client-only UI modules
- make request-aware logic explicit
- avoid hiding server/client boundaries behind vague abstractions

---

## UI Separation Rules

UI is split into four clear categories.

### 1. Primitive UI

Location: `components/ui`

Examples:

- Button
- Input
- Dialog

### 2. Common UI

Location: `components/common`

Examples:

- ConfirmDialog
- EmptyState
- LoadingSection

### 3. Entity UI

Location: `entities/*/ui`

Examples:

- UserAvatar
- ExampleStatusBadge

### 4. Feature UI

Location: `features/*/components`

Examples:

- LoginForm
- ExampleFilterPanel
- ExampleCreateForm

### Rule of thumb

- if it represents a domain object → `entities/*/ui`
- if it drives a use-case/workflow → `features/*/components`
- if it is generic UI → `components/`\*

---

## Environment Management Rules

Environment values must be explicit and validated.

### Goals

- separate public and private configuration
- parse and validate environment values
- avoid untyped environment access scattered across the app

### Recommended split

- client/public config wiring → `app/config`
- server/private config wiring → `server/config`

### Rules

- do not read raw env values everywhere
- centralize environment parsing
- validate critical values early

---

## Testing Rules

Testing is split by responsibility.

### Unit tests

Use **Vitest** for:

- utility functions
- model logic
- isolated hooks
- isolated UI logic

### Component/integration tests

Use **Vitest** with testing utilities for:

- feature component behavior
- interaction logic
- rendering with providers

### E2E tests

Use **Playwright** for:

- auth flow
- route navigation
- real user scenarios
- browser integration behavior

### Rules

- colocate Vitest unit/component tests near source when useful
- keep shared test helpers in `src/test/`\*
- keep Playwright E2E scenarios under `src/test/e2e`
- avoid over-mocking framework boundaries unless necessary
- prioritize behavior over implementation details

### Current baseline

- Vitest samples:
  - `src/shared/api/normalizeApiError.test.ts`
  - `src/features/auth/utils/ensureCurrentUser.test.ts`
  - `src/features/seed/pages/Signin.test.tsx`
- Playwright smoke samples:
  - `src/test/e2e/auth-guest-pages.spec.ts`
- quality scripts:
  - `npm run format`
  - `npm run format:check`
  - `npm run lint`
  - `npm run lint:fix`
  - `npm run test`
  - `npm run test:e2e`
- git hooks:
  - Husky + lint-staged run Prettier and ESLint for staged files on `pre-commit`

---

## Default Source-of-Truth Rules

Always decide the source of truth first.

### Examples

#### Current authenticated user

- source of truth: server + TanStack Query

#### Example list/detail

- source of truth: server + TanStack Query

#### Sidebar open state

- source of truth: Zustand or local component state

#### Dialog visibility

- source of truth: local state or Zustand if globally coordinated

#### Form input

- source of truth: TanStack Form

#### Entity parsing/shape validation

- source of truth: Zod schemas

#### Environment variables

- source of truth: `app/config/public-env.ts` for client-safe values
- source of truth: `server/config/env.ts` for server-only values

Rules:

- never read `process.env` directly in feature, route, component, or shared runtime code
- never read `import.meta.env` directly outside the public env module
- validate env once at the config boundary and export typed values
- separate client-safe env and server-only env explicitly
- only expose `VITE_*` values to the client bundle

---

## Example Module Walkthrough

Use `example` as the reference implementation for the intended layer flow.

### Request / rendering flow

1. `src/routes/example/index.tsx`
   Route entrypoint. Preloads server state with `queryClient.ensureQueryData(...)` and renders the feature page.
2. `src/features/example/hooks/exampleQueries.ts`
   Defines TanStack Query options for list/detail requests.
3. `src/features/example/api/getExampleList.ts`
   Calls the shared API client helper and returns typed feature data.
4. `src/shared/api/apiClient.ts`
   Provides reusable `get/post/patch/delete` helpers that unwrap transport responses.
5. `src/shared/api/axiosInstance.ts`
   Shared HTTP infrastructure. This is where interceptors, base client config, error normalization, and development-only request logging belong.
6. `src/shared/api/normalizeApiError.ts`
   Converts transport/library errors into a stable app-level error shape.
7. `src/entities/example/model/parseExample.ts`
   Parses remote payloads through entity schemas before feature code consumes them.
8. `src/entities/example/ui/ExampleSummaryCard.tsx`
   Thin entity presentation used by the feature page.
9. `src/features/example/components/ExampleListPage.tsx`
   Composes feature behavior: query hook, Zustand filter store, and entity UI.

### Detail flow

1. `src/routes/example/$exampleId.tsx`
   Reads the route param and preloads the detail query.
2. `src/features/example/hooks/useExampleDetailQuery.ts`
   Binds the query options to the feature component.
3. `src/features/example/components/ExampleDetailPage.tsx`
   Renders the feature-level detail screen.

### File ownership guide

- `src/entities/example/types/example.ts`
  Domain type definition.
- `src/entities/example/schemas/exampleSchema.ts`
  Entity validation and parsing schema.
- `src/features/example/schemas/exampleFilterSchema.ts`
  Feature-local filter schema.
- `src/features/example/store/useExampleFilterStore.ts`
  Feature-scoped client state only.
- `src/features/example/utils/filterExamples.ts`
  Feature-local workflow helper.
- `src/shared/api/types.ts`
  App-level API error shape shared across features.
- `src/shared/api/apiClient.ts`
  Thin transport helper for shared HTTP verbs.

If a new developer wants to trace one screen end-to-end, they should start from the route file, then follow the query options, feature API, entity parser, and finally the feature component.

---

## Anti-patterns

Avoid the following:

- generic `services/` dumping ground
- generic top-level `stores/` dumping ground
- duplicating server state into Zustand by default
- placing heavy business logic directly in route files
- moving feature-local helpers into `shared/` too early
- mixing server-only code into client bundles
- mixing primitive UI and workflow UI in one folder
- treating `shared/` as “misc”
- hiding auth truth inside a giant client store
- architecture that makes the source of truth unclear

---

## Summary

geofrontFR is built around explicit boundaries.

The architecture works when each layer keeps its responsibility:

- `app` assembles
- `routes` enter
- `features` execute
- `entities` describe
- `components` present
- `shared` supports
- `server` isolates
- `test` verifies

If responsibility is unclear, the code is probably in the wrong place.

---

## v1 Practical Rule

When unsure where code belongs, ask in this order:

1. Is it app runtime setup?
2. Is it route entry / route policy?
3. Is it a feature workflow?
4. Is it domain-object logic?
5. Is it reusable UI?
6. Is it truly cross-cutting?
7. Is it server-only?
8. Is it test-only?

The first clear answer usually determines the correct directory.

---

## Seed Usage Policy

Use `seed` as a pragmatic UI inventory, not as the primary source of product architecture.

Rules:

- For new requirements, check `seed` first for reusable screens, layout blocks, and presentational components.
- If a suitable `seed` asset exists, reuse it with the smallest reasonable modification.
- If `seed` does not provide the needed UI, build it with the project-standard shared approach such as `components/ui`, `shadcn/ui`, or other approved common primitives.
- If newly built UI starts repeating across multiple features, promote it into reusable shared UI and reduce direct `seed` dependence over time.
- Put real product workflows and domain behavior in `features/<domain>`, not in `seed`.
- Treat `seed` as a fast-start UI inventory, `components/ui` as validated shared UI, and `features/*` as real application code.
- Do not spend roadmap time fully rewriting `seed` into native geofrontFR structure unless repeated product work proves that the migration cost will be recovered.
- If a `seed` page should be preserved but removed from the active router tree, disable the route entry by moving it under a `-` prefixed file or folder inside `src/routes`, such as `src/routes/-legacy/...`.
- Prefer disabling only the route entry file while keeping the underlying page/component implementation intact, so archived template screens remain easy to restore later.

---

## License

All files under `src/features/seed` are owned by [Cruip](https://cruip.com/).

- Do not redistribute those assets without permission.
- Use them only under a valid license purchased from Cruip.

All other source code in this repository is the asset of geo lucason.

- Personal and commercial use is permitted.
- The source reference [https://github.com/GEOkettle/tanstackseed](https://github.com/GEOkettle/tanstackseed) must remain credited in derivative or reused source distributions.
