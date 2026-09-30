# Plan 001: Characterize startup, auth, and subscription behavior

> **Executor**: Read this entire plan before editing. Run its drift check first. Work only within Scope; on a STOP condition report back. Update your row in `plans/README.md` when finished.
>
> **Drift check**: `git diff --stat fcad223..HEAD -- src/domain/contexts src/shared/hooks/useGetSessionState.ts src/shared/components/splashscreen src/infra/store src/application/auth src/domain/testing` (new test files will not appear in the historical diff). Compare the excerpts below with current code if any path changed.

## Status

- Priority P1; effort M; fix risk LOW; confidence HIGH; category tests.
- Depends on: none. Planned at commit `fcad223`.

## Why

The existing 13 Jest suites cover mostly shared UI. Auth, startup, and subscription currently have no tests, yet the subsequent plans change their ownership and imports. Establish tests for **existing demonstrable behavior**, including deliberate placeholders, before restructuring. Do not turn placeholder auth into real auth here.

## Current state and conventions

- `src/domain/contexts/authContext/AuthContextProvider.tsx:22-29,57-110` owns an in-memory `user`, a separate Zustand `isUserLoggedIn` flag, demo `signIn` (`await sleep(150)`), and `signOut` clearing tracking, store, query cache and secure tokens. Both callbacks catch and log errors; preserve current behavior in this plan.
- `src/shared/hooks/useGetSessionState.ts:8-43` consumes `useGetUserSession`; on `isFetched` sets `isBootstrappingApplication` false but has a TODO for restoring authentication.
- `src/domain/contexts/subscriptionContext/SubscriptionContextProvider.tsx:23-113` fetches status when `user` changes, subscribes to customer updates, selects a flag-configured offering and falls back to the current offering.
- `src/shared/components/splashscreen/hooks/useBootstrapApp.ts:25-70` waits for infra and application readiness, runs SDK initialization and OTA check, and hides the splash when ready.
- Existing test patterns: `src/shared/hooks/__tests__/useDebouncedFunction.test.ts` uses Jest and `renderHook` from `$domain/testing`; `src/shared/components/maintenanceMode/__tests__/MaintenanceMode.test.tsx` uses `render` from `$domain/testing`. Project uses RNTL 13.3.3; follow its v13 synchronous-render/async-assertion conventions. `src/domain/testing/utils.tsx` supplies QueryClientProvider and SafeAreaProvider. Use isolated Jest mocks for SDKs; reset mocks/timers between tests. Avoid asserting private implementation details when a public hook/context result is available.
- No domain glossary or architecture ADR currently defines stricter behavior.

## Commands

| Purpose       | Command                                                         | Expected                    |
| ------------- | --------------------------------------------------------------- | --------------------------- |
| Focused tests | `bun run test -- --runInBand --runTestsByPath <test-file-path>` | Exit 0; relevant tests pass |
| Typecheck     | `bun run lint:ts`                                               | Exit 0                      |
| Lint          | `bun run lint:ci`                                               | Exit 0, no fixes            |
| Full suite    | `bun run test -- --runInBand`                                   | Exit 0                      |
| Format check  | `bun run format:check`                                          | Exit 0                      |

Use `bun run lint` and `bun run format` to fix formatting _only in the executor's implementation_, then rerun read-only checks. Never run `bun test` (wrong runner).

## Scope

In scope: create `src/domain/contexts/authContext/__tests__/AuthContextProvider.test.tsx`, `src/domain/contexts/subscriptionContext/__tests__/SubscriptionContextProvider.test.tsx`, `src/shared/hooks/__tests__/useGetSessionState.test.ts`, and, if feasible with current Expo mocks, `src/shared/components/splashscreen/hooks/__tests__/useBootstrapApp.test.ts`. `plans/README.md` status row only. Out of scope: editing production files, package manifest, E2E tests, real network integration, adding mocks to global setup.

## Steps

1. Write auth provider characterization tests with a probe child calling `useAuthContext`, a fresh QueryClientProvider, and mocked `Purchase`, `Analytics`, `ErrorMonitoring`, token storage, and store reset. Assert initial `user === null`; sign-in yields demo `{ id: '1', email }` and sets the store flag; sign-out clears `user`, store, query cache, and tokens. Test the observed async tracking separately; do not assert that sign-in persists a session. **Verify**: `bun run test -- --runInBand --runTestsByPath src/domain/contexts/authContext/__tests__/AuthContextProvider.test.tsx` → exit 0.
2. Write subscription provider tests using an auth context wrapper or mock of `useAuthContext`. Cover no-user status, paying status on authenticated user, listener update and cleanup on unmount, remote-offering selection, missing-offering fallback, and rejected offering fetch (logged, null). Mock RevenueCat adapter and flags; assert observable context values. **Verify**: focused Jest command with `src/domain/contexts/subscriptionContext/__tests__/SubscriptionContextProvider.test.tsx` → exit 0.
3. Test `useGetSessionState` with an isolated mocked query hook and store setter: fetched completion releases bootstrap; pending state does not; first-error branch does not claim restored auth. Optionally test `useBootstrapApp` for Storybook bypass, normal initialization and ready-to-hide transition if mocks allow an isolated test. **Verify**: focused Jest command for each created file → exit 0.
4. Run full checks. **Verify**: `bun run lint:ts && bun run lint:ci && bun run format:check && bun run test -- --runInBand` → exit 0; `git diff --name-only` and `git status --short` show only scoped changes.

## Done criteria

- [ ] Three required new test files exist; auth, subscription and startup paths have asserted outcomes, not just render smoke tests.
- [ ] Optional splash test exists if isolated without modifying production or global setup; otherwise report why omitted in status notes.
- [ ] Typecheck, CI lint, format check and full Jest suite pass.
- [ ] No production behavior changed.

## STOP conditions

Stop if test setup requires a global Jest configuration change or production refactor, if a current-state excerpt differs materially, or if a gate fails twice after a reasonable correction. Report the uncovered path instead of weakening assertions. Future plans should revise characterization expectations _only when intentionally changing the specified behavior_.

## Maintenance

Keep tests at the context/hook seam, not snapshots of implementation. After plan 002/003 moves modules, move these tests alongside their owners and update only expectations deliberately changed by the new canonical auth state.
