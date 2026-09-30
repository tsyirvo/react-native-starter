# Plan 002: Give demo authentication one owner and one source of truth

> **Executor**: Read this whole plan and plan 001's test outcomes. Run drift check first; STOP rather than expanding scope. Update `plans/README.md` status when complete.
>
> **Drift check**: `git diff --stat fcad223..HEAD -- src/application/auth src/domain/contexts/authContext src/domain/contexts/index.ts src/shared/hooks/useGetSessionState.ts src/shared/hooks/index.ts src/shared/components/splashscreen/hooks/useBootstrapApp.ts src/infra/store src/app/_layout.tsx src/app/Login.tsx 'src/app/(protected)/(tabs)/(profile)/Profile.tsx' src/domain/contexts/subscriptionContext/SubscriptionContextProvider.tsx`. Plan 001 intentionally adds auth/startup tests; inspect rather than stop for those changes. STOP on unrelated changes that invalidate the excerpts.

## Status

- Priority P1; effort L; risk MED (navigation/session transitions); confidence HIGH; category tech-debt.
- Depends on: `plans/001-characterize-startup-and-session.md`. Planned at commit `fcad223`.

## Why

The demo has an in-memory `user` in the auth provider **and** `isUserLoggedIn` in Zustand; the root navigator reads the latter while downstream modules read the former. Authentication setup is split between `domain`, `application`, and `shared`. In this starter there is no real backend session, so use the provider's `user` as the sole _demo_ authentication state and keep the existing startup query explicitly a placeholder. `application/auth` becomes the owner of orchestration; do not introduce repository ports for nonexistent backend alternatives.

## Current state and conventions

- `src/domain/contexts/authContext/AuthContextProvider.tsx:22-29,57-110`: `const [user, setUser] = useState<User | null>(null)`, `setIsUserLoggedIn(true/false)` in sign-in/out, plus side-effect orchestration for tracking, clear store, query client and tokens. Preserve sign-in's demo delay and returned context interface (`src/domain/contexts/authContext/AuthContext.ts`).
- `src/app/_layout.tsx:58-101`: reads `useAppStore(...isUserLoggedIn)` **above** `<AuthContextProvider>` and feeds `Stack.Protected` guards. Move only the guarded navigator into an inner component rendered inside the provider; call `useAuthContext()` there. Preserve Storybook and bootstrap guards and provider order; do not conditionally mount/unmount the auth provider on login.
- `src/infra/store/store.ts:8-24`, `src/infra/store/types/store.types.ts:1-4`, `src/infra/store/slices/session/session.slice.ts`, `session.types.ts` define a separate non-persisted session flag. Remove that flag and the now-empty session slice; leave app/bootstrap state and persistence intact.
- `src/application/auth/hooks/useGetUserSession.ts:7-22` and `queries/authQueries.keys.ts` are placeholders; keep their public exports. `src/shared/hooks/useGetSessionState.ts:7-44` should move to `src/application/auth/hooks/useGetSessionState.ts`, with export from `application/auth/hooks/index.ts`; change splash bootstrap's import to the new owner. Do not claim `useGetUserSession` restores a `User`—it currently returns fake status fields.
- `src/domain/contexts/subscriptionContext/SubscriptionContextProvider.tsx:13,28` imports `useAuthContext` via a relative path; update it temporarily to the new application import (plan 003 relocates it).
- Public exports use `export * from './X'`, e.g. `src/features/loginForm/index.ts`; keep that convention. Existing auth tests from plan 001 need moving to their new location while preserving assertions except the removed store flag.
- `src/app/Login.tsx:25-31` awaits `signIn` then calls `router.replace('/')`. Leave success/failure semantics unchanged in this structural plan; the SDK is still mocked/demo. Authentication failures are caught inside the provider today—do not silently claim they propagate.

## Commands

`bun run lint:ts` (exit 0); `bun run lint:ci` (exit 0); `bun run format:check` (exit 0); `bun run test -- --runInBand` (all pass). Fix formatting during implementation with `bun run lint` and `bun run format`, then rerun read-only checks. Test E2E manually later; `bun run test:e2e` needs Maestro/dev build and is not a required gate.

## Scope

In scope: `src/application/auth/**`, `src/domain/contexts/authContext/**` (move/delete), `src/domain/contexts/index.ts`, `src/shared/hooks/useGetSessionState.ts` and `index.ts`, `src/shared/components/splashscreen/hooks/useBootstrapApp.ts`, `src/infra/store/store.ts`, `src/infra/store/types/store.types.ts`, `src/infra/store/slices/session/**` (delete), `src/app/_layout.tsx`, `src/app/Login.tsx`, `src/app/(protected)/(tabs)/(profile)/Profile.tsx`, `src/domain/contexts/subscriptionContext/SubscriptionContextProvider.tsx`, and relevant tests added by plan 001; `plans/README.md` status only. Out of scope: backend auth/Convex, new token strategy, feature flags, RevenueCat behavior, splash screen redesign, storage migrations (session flag is already excluded from persisted state).

## Steps

1. Move `AuthContext.ts`, `AuthContextProvider.tsx`, `useAuthContext.ts` and their `index.ts` into `src/application/auth/contexts/authContext/`; add `contexts/index.ts` and re-export from `src/application/auth/index.ts`. Move auth provider characterization tests alongside them. Update type imports to `$domain/entities` and other paths without changing behavior yet. Switch `src/app/Login.tsx`, profile route, root layout and subscription provider to `$application/auth`. Delete obsolete `src/domain/contexts/authContext` and empty barrel exports. **Verify**: `bun run lint:ts && bun run test -- --runInBand` → exit 0; `git grep -n '\$domain/contexts' -- src` → no matches except subscription references scheduled in plan 003 (prefer none).
2. Move `useGetSessionState.ts` and its test from `shared/hooks` into `src/application/auth/hooks/`, remove its shared barrel export, add application hook export, switch splash bootstrap to `$application/auth`. Keep placeholder fetch behavior. **Verify**: `bun run lint:ts && bun run test -- --runInBand` → exit 0; `git grep -n 'shared/hooks/useGetSessionState' -- src` → no matches.
3. Extract the navigator containing `Stack.Protected` in `src/app/_layout.tsx` into a small inner component below `<AuthContextProvider>`; read `user` there and guard with `user === null`/`user !== null`. Remove all `setIsUserLoggedIn` calls/selectors, delete the session slice, remove it from `StoreState` and `create(...)`, and remove `isUserLoggedIn` from `doNotPersist`. Keep `isBootstrappingApplication` and reset behavior. Update auth tests to assert context and navigation guards via appropriate unit/integration probes, not the removed store flag. **Verify**: `bun run lint:ts && bun run test -- --runInBand` → exit 0; `git grep -n -E 'isUserLoggedIn|setIsUserLoggedIn' -- src` → no matches.
4. Run all read-only gates and inspect scope. **Verify**: `bun run lint:ts && bun run lint:ci && bun run format:check && bun run test -- --runInBand` → exit 0; `git status --short` → only scoped files changed.

## Test plan and done criteria

- [ ] Existing plan 001 tests moved with implementation; initial anonymous user, demo sign-in and sign-out still covered.
- [ ] Add/adjust a navigation guard test if route modules can be mocked without globally altering Jest; at minimum test the inner guard decision through a named pure helper or small testable navigator, not a test-only fork of guard logic.
- [ ] Startup query remains explicitly demo-only; cold start never pretends to restore user from a fake query.
- [ ] Exactly one runtime demo-login authority (`AuthContext.user`); no session flag left in Zustand.
- [ ] All four checks above pass and no files outside scope modified.

## STOP conditions

Stop if another consumer of the session flag appears that was not found in the audit, if navigation requires changing router configuration outside the listed files, if the token/credential flow is now real rather than placeholder, or if a gate fails twice after a reasonable correction. Report the conflict instead of adding a second auth authority.

## Maintenance

Review sign-out/identity sequencing carefully: `startTrackingUser` is currently fire-and-forget while `signOut` awaits `stopTrackingUser`; this plan is not a full concurrency redesign. When backend auth is integrated, replace the demo query and choose explicit restored session semantics before persisting any login state. Do not reintroduce a parallel boolean just to make router guards easier.
