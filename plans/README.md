# Pragmatic architecture implementation plans

Read-only audit findings and executable handoffs for the React Native/Expo **starter**, planned against commit `fcad223`. These are recommendations accepted as defaults by the maintainer, not an instruction to implement a backend or impose textbook Clean Architecture. **No production source has been modified by this planning pass.** Each executor should read the selected plan in full, run its drift check, obey its STOP conditions, and update only its status row below. Do not push or open a PR without operator instruction; use conventional commits (e.g. `refactor(auth): consolidate demo session state`) if asked to commit.

## Assessment

Good: thin route-to-feature composition (`src/app/(protected)/(tabs)/(home)/index.tsx` → `src/features/home`), identifiable SDK adapters (`src/infra/purchase`, `analytics`, `storage`), reusable UI under `src/shared/uiKit`, a working TS/Biome/Jest verification baseline.

| Finding                              | Impact and evidence                                                                                                                                                                                                    | Recommendation                                                         | Confidence |
| ------------------------------------ | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------- | ---------- |
| Domain imports concrete infra        | React auth/subscription providers import infra SDKs, store and logging: `src/domain/contexts/authContext/AuthContextProvider.tsx:5-15`; `src/domain/contexts/subscriptionContext/SubscriptionContextProvider.tsx:5-11` | Move providers to their orchestration owners (002, 003)                | HIGH       |
| Domain acts as catch-all             | Expo config, platform probes, UI theme, test harness and storage keys: `src/domain/constants/config.ts:1-5`, `platform.ts:1-2`, `src/domain/theme/unistyles.ts:1-3`, `src/domain/testing/utils.tsx:1-5`                | Relocate without changing values (005)                                 | HIGH       |
| Application lacks coherent ownership | Placeholder session query and router tab metadata in `src/application`, while session orchestration is in `src/shared/hooks/useGetSessionState.ts`                                                                     | Give auth/bootstrap clear owners; inline one-use tab config (002, 004) | HIGH       |
| Shared owns feature/app policy       | Notification toasts/permission orchestration, splash/OTA bootstrap in `src/shared/hooks/useRequestPermission.ts` and `src/shared/components/splashscreen/hooks/useBootstrapApp.ts`                                     | Place with notification feature and application bootstrap (004)        | HIGH       |
| Two demo auth authorities            | React `user` plus Zustand `isUserLoggedIn` drive different consumers in `src/domain/contexts/authContext/AuthContextProvider.tsx` and `src/app/_layout.tsx`                                                            | One demo user state; no invented session restoration (002)             | HIGH       |
| Refactor safety gap                  | Existing `src/` tests cover mainly shared UI; no provider/bootstrap tests                                                                                                                                              | Characterization first (001)                                           | HIGH       |
| Unwritten rules                      | `README.md` describes starter intent but no architecture contract                                                                                                                                                      | Document actual pragmatic import/ownership rules (006)                 | HIGH       |

These are architectural/verification findings, **not** claims of production security review or native E2E validation. Existing auth/token/query logic is deliberately placeholder; no API client is wired up.

## Execution order and status

| Plan                                           | Result                                                      | Priority | Effort / risk | Depends on | Status |
| ---------------------------------------------- | ----------------------------------------------------------- | -------- | ------------- | ---------- | ------ |
| [001](001-characterize-startup-and-session.md) | Characterize auth, subscription and startup                 | P1       | M / LOW       | —          | DONE   |
| [002](002-consolidate-auth-ownership.md)       | Own demo auth in application; remove parallel login boolean | P1       | L / MED       | 001        | DONE   |
| [003](003-relocate-subscription-workflow.md)   | Put provider in feature, pure rule in domain                | P1       | M / MED       | 001, 002   | DONE   |
| [004](004-put-policies-with-their-owners.md)   | App bootstrap, notifications, tab ownership                 | P2       | M / MED       | 001–003    | DONE   |
| [005](005-make-domain-pure.md)                 | Move runtime/theme/testing concerns out of domain           | P2       | L / MED       | 001–004    | DONE   |
| [006](006-document-pragmatic-layer-rules.md)   | Document actual layout, limits and import rules             | P2       | S / LOW       | 002–005    | DONE   |

Statuses: TODO | IN PROGRESS | DONE | BLOCKED (include reason) | REJECTED (include rationale). Work sequentially: tests protect the moved behavior; auth establishes the provider import for subscription; bootstrap moves after session hook; taxonomy cleanup comes after owners settle; docs describe the landed state rather than an aspiration. If multiple agents implement, each plan must inspect the preceding plans' landed diff and tests first; **do not parallelize plans touching the same source areas**.

## Repository conventions and gates

- Expo Router routes live in `src/app`; `$*` maps to `src/*`; index barrels use `export * from './X'`; React components are TypeScript with extracted Props interfaces. See `CLAUDE.md` for full conventions.
- Run `bun run lint:ts`, `bun run lint:ci`, `bun run format:check`, `bun run test -- --runInBand` after each plan. Baseline at planning: TypeScript and Biome passed; Jest passed **13 suites / 63 tests**. `bun run lint` and `bun run format` are _writing_ fixers for executors, not read-only audit commands. `bun run test:e2e` needs Maestro and a development build; manually smoke-test login/logout, tab navigation, startup and purchase-state UI in a native build before treating the migration as production-safe.
- STOP and report if existing functionality differs from the plan's excerpts or a solution requires files outside its scope. Do not use fake ports or create real-backend flows to make a directory look complete.

## Considered and rejected

- **Strict inward-only dependency enforcement in every layer now**: premature for a broad starter with concrete singleton SDKs and no alternate adapters. `domain` remains pure, but application composition may depend directly on infra until a real seam earns its keep.
- **Relocate `features/storeRating` only because it uses an Expo SDK**: its one user-facing hook (`src/features/storeRating/hooks/useAppStoreReview.ts`) is too small to justify a separate adapter today.
- **Build production login/session restoration as part of this refactor**: no backend is wired up; inventing one or persisting a demo login would conflate architecture cleanup with product design.
- **Remove the second `Purchase.setUser` call during a file move**: auth and subscription currently trigger it on the same identity; removing either without lifecycle tests can query the wrong customer. Investigate separately when real purchase flows exist.
