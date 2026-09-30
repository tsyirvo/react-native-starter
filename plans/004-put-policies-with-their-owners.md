# Plan 004: Keep app and feature policies out of shared and navigation out of application

> **Executor**: Read the plan fully, check drift and run every gate. Do not make a route file out of a configuration module. Update your status row in `plans/README.md` on completion.
>
> **Drift check**: `git diff --stat fcad223..HEAD -- src/application src/shared/components/splashscreen src/shared/components/index.ts src/shared/hooks src/shared/utils src/features/notifications src/app/_layout.tsx 'src/app/(protected)/(tabs)/_layout.tsx'`. Expected changes from plans 001–003 need inspection, not blind overwrite.

## Status

- Priority P2; effort M; risk MED (startup ordering); confidence HIGH; category tech-debt.
- Depends on: plans 001, 002, 003. Planned at commit `fcad223`.

## Why

`shared` currently contains session/bootstrap policy, OTA startup and permission-specific toast copy, while `application/navigation/tabsConfig.ts` is presentation configuration. After auth and subscription have clear owners, make `shared` genuinely reusable: app-wide startup in `application/bootstrap`, notifications permission flow in its feature, and tab config where it is used. Avoid inventing a feature architecture framework.

## Current state and conventions

- `src/shared/components/splashscreen/Splashscreen.tsx:1-14` is a small `Box` wrapper calling `useBootstrapApp()`. `src/shared/components/splashscreen/hooks/useBootstrapApp.ts:13-70` controls native SplashScreen, runs `bootstrapApp()` and `checkForOtaUpdate()`, waits for the application bootstrap flag/session hook, and skips SDK work in Storybook. As of plan 002, it imports session state from `$application/auth`. Keep the query provider ordering in `src/app/_layout.tsx:72-115`: `<PersistQueryClientProvider>` encloses `<Splashscreen>`.
- `src/shared/utils/checkForOtaUpdate.ts` is called only from that bootstrap hook; move it with its caller. Read its complete code first; do not change OTA semantics.
- `src/shared/hooks/useRequestPermission.ts:1-96` owns translated notification success/error toasts and permission request orchestration. Its only consumer is `src/features/notifications/Notifications.tsx:4-10`. Move to `src/features/notifications/hooks/` with an `index.ts`; preserve `requestPermission` and `requestNotificationPermission` signatures, strings and outcomes.
- `src/application/navigation/tabsConfig.ts:1-41` defines `TABS_CONFIG` with Expo Router icon types and i18next translation keys. It has exactly one consumer: `src/app/(protected)/(tabs)/_layout.tsx:5,42`. Place the type and constant **in that existing `_layout.tsx` file**, not another file under `src/app/` (Expo Router may treat new files as routes). Remove the unused `application/navigation` barrel and directory.
- Existing exports use `export * from './X'`. Keep `features/storeRating` as-is: it is a tiny user-facing store-review behavior, not worth moving solely because it calls an SDK.

## Commands

`bun run lint:ts`, `bun run lint:ci`, `bun run format:check`, `bun run test -- --runInBand` → exit 0; `bun run test:e2e` requires Maestro/dev build and is optional/manual for navigation/startup smoke checks. `bun run lint`/`bun run format` may be used in execution before read-only gates.

## Scope

In scope: `src/application/bootstrap/**` (new), `src/application/navigation/**` (delete), `src/shared/components/splashscreen/**` (move/delete), `src/shared/components/index.ts`, `src/shared/hooks/useRequestPermission.ts`, `src/shared/hooks/index.ts`, `src/shared/utils/checkForOtaUpdate.ts`, `src/shared/utils/index.ts`, `src/features/notifications/**`, `src/app/_layout.tsx`, `src/app/(protected)/(tabs)/_layout.tsx`, relevant tests from plan 001, and `plans/README.md` status. Out of scope: redesigning OTA update policy, notification permission texts, `infra/bootstrap/bootstrap.ts` SDK initialization, other shared hooks, route structure/paths and native E2E configs.

## Steps

1. Move `Splashscreen.tsx`, `useBootstrapApp.ts`, OTA checker and their tests into `src/application/bootstrap/` with an `index.ts` exporting the component. Update local imports, root layout import, and delete obsolete shared re-exports. Keep the root query provider _outside_ the bootstrap component. **Verify**: `bun run lint:ts && bun run test -- --runInBand` → exit 0; `git grep -n -E 'shared/components/splashscreen|shared/utils/checkForOtaUpdate' -- src` → no matches.
2. Move permission hook to `src/features/notifications/hooks/useRequestPermission.ts` and expose it through a local barrel. Switch `Notifications.tsx` to a relative hook import and drop the shared export. Add `src/features/notifications/hooks/__tests__/useRequestPermission.test.ts` for granted, already-granted, blocked/unavailable and rejected permission paths using mocked adapter/toaster; use plan 001's RNTL v13 `renderHook` pattern. **Verify**: focused Jest test and `bun run lint:ts` → exit 0; `git grep -n 'useRequestPermission' -- src/shared` → no matches.
3. Inline `TabConfig` and `TABS_CONFIG` into the tabs `_layout.tsx`, retain exactly the existing config values, remove `application/navigation` and its imports. **Verify**: `bun run lint:ts && bun run test -- --runInBand` → exit 0; `git grep -n '\$application/navigation' -- src` → no matches.
4. Run full static and test gates and inspect status. **Verify**: `bun run lint:ts && bun run lint:ci && bun run format:check && bun run test -- --runInBand` → exit 0; `git status --short` → only scoped files.

## Done criteria

- [ ] Session/startup/OTA policy is under application bootstrap, notification permission policy under its feature, tab configuration in the tab layout.
- [ ] Splash stays beneath QueryClientProvider; existing Storybook bypass and bootstrap readiness behavior unchanged.
- [ ] Notification hook cases and existing startup tests pass; all four gates pass.
- [ ] No new route files under `src/app/` and no obsolete barrels remain.

## STOP conditions

Stop if moving Splashscreen changes provider availability, if another call site is discovered for the permission hook/OTA checker/tab config, if existing tests show intentional differences in startup or notification behavior, or if gates fail twice. Report instead of rewriting SDK behavior.

## Maintenance

`application/bootstrap` is composition for this app's startup, not a generic UI toolkit. Move only behavior that has a single identifiable owner; leave reusable shared UI alone. When replacing demo session with a real one, revisit bootstrap's success/error terminal states independently.
