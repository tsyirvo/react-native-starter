# Plan 005: Reserve domain for pure types and rules

> **Executor**: Read fully; run drift check and complete each substep with its gate. This is an import-heavy move: do not change values or runtime configuration while moving files. STOP on unanticipated cycles or setup failures. Update `plans/README.md` status when done.
>
> **Drift check**: `git diff --stat fcad223..HEAD -- src/domain src/infra/config src/infra/storage src/shared/theme src/shared/uiKit src/testing src/app src/application src/features src/shared index.ts package.json`. Changes from plans 001–004 are expected; compare actual files with the facts below. STOP if another migration changed the location/semantics of config, theme or test setup.

## Status

- Priority P2; effort L; risk MED (mass import updates and module initialization); confidence HIGH; category tech-debt.
- Depends on: plans 001–004. Planned at commit `fcad223`.

## Why

`domain` currently contains Expo configuration, platform probes, UI styling tokens, storage keys and RNTL test utilities. This makes a domain import no indication of business independence. Keep the genuine pure modules (`domain/entities`, `domain/subscription`) and move environment-specific/visual/test modules to their owning areas. This is **file ownership cleanup**, not a redesign of configuration or theming.

## Current state and target map

- `src/domain/constants/config.ts:1-5` loads Expo Constants and `env.js` ClientEnv; `platform.ts:1-14` reads `Platform` and `isLiquidGlassAvailable`. Target: `src/infra/config/config.ts`, `platform.ts`, `index.ts`; retain all names/values. Relative `../../../env.js` is the same depth at target; verify. Current `src/domain/constants/storage.ts:1-18` holds `storageKeys` used only by infrastructure; target: `src/infra/storage/storageKeys.ts`. Do not import it through the storage barrel _from inside_ a storage implementation; prefer `./storageKeys` to avoid initialization cycles.
- `src/domain/constants/dimensions.ts` reads RN Dimensions; `styling.ts` supplies `HIT_SLOP`, `DEFAULT_ICON_SIZE`, `COMPACT_ICON_SIZE`. Target: `src/shared/uiKit/constants/dimensions.ts`, `styling.ts`, `index.ts`; update callers while preserving values.
- `src/domain/theme/{tokens,themes,types,unistyles,index}.ts` configure Unistyles and supply UI tokens/types. Target: `src/shared/theme/` with unchanged internal relative imports. Both `index.ts:1-2` and `package.json` Jest `setupFiles` currently load `src/domain/theme/unistyles.ts`: update **both** to `src/shared/theme/unistyles.ts`. Preserve registration before other UI imports.
- `src/domain/testing/{index,utils,setup}.ts[x]` supplies RNTL render and Jest mocks. Target: `src/testing/` at same nesting depth. Update Jest `setupFiles` in `package.json` and every test import from `$domain/testing` to `$testing`. Do not change the test helper's behavior or add domain dependencies.
- `src/domain/entities/user.model.ts` defines `User` and `UserLogin`; `src/domain/subscription/utils/hasActiveEntitlements.ts` is pure after plan 003. Keep them in domain. `src/domain/contexts` should already be gone after plans 002/003.
- `src/shared/uiKit/button/buttonVariants.ts` demonstrates UI token imports; `src/infra/storage/appStorage.ts` shows the current storage-key dependency. Refer to current `git grep -n -E '\$domain/(constants|theme|testing)' -- src` to enumerate **every** importer; update those import lines only. Project uses `$*` alias for `src/*`, TS strict mode, `export * from './X'` barrels. No documented domain ADR exists yet.

## Commands

- `bun run lint:ts` → exit 0 (no emitted files).
- `bun run lint:ci` and `bun run format:check` → exit 0; fix with `bun run lint`/`bun run format` during execution if needed.
- `bun run test -- --runInBand` → all Jest suites pass.
- `git grep -n -E '\$domain/(constants|theme|testing)' -- src` → exit 1, **no matching lines** on completion.

## Scope

In scope: moved/deleted `src/domain/constants/**`, `src/domain/theme/**`, `src/domain/testing/**`; created `src/infra/config/**`, `src/infra/storage/storageKeys.ts`, `src/shared/theme/**`, `src/shared/uiKit/constants/**`, `src/testing/**`; existing `src/infra/storage/index.ts` if exporting new key; `index.ts`; Jest `setupFiles` entries in `package.json` only; **only import statements** in existing files reported by `git grep -n -E '\$domain/(constants|theme|testing)' -- src` at step start, plus any tests added under those areas in plans 001–004; `plans/README.md` status. Out of scope: `env.js`, `.env*`, app config values, runtime behavior, SDK setup, changing test implementation, dependencies/lockfile, all other lines in importer files. Do not copy secret values into plans or comments.

## Steps

1. Move theme files to `src/shared/theme/`, update `index.ts` side-effect import and Jest theme setup path in `package.json`, then update only theme import statements returned by grep. **Verify**: `bun run lint:ts && bun run test -- --runInBand` → exit 0; `git grep -n '\$domain/theme' -- src` → no matches.
2. Move config/platform into `src/infra/config/` and storage keys into `src/infra/storage/storageKeys.ts`; update importers, including pure type imports (`typeof config`) and storage implementations. Preserve export names. Use local relative import for keys within storage implementations. **Verify**: `bun run lint:ts && bun run test -- --runInBand` → exit 0; `git grep -n -E '\$domain/constants/(config|platform|storage)' -- src` → no matches.
3. Move dimensions/styling into `src/shared/uiKit/constants/` with `index.ts`; update remaining `$domain/constants` and `/styling` importers to either `$infra/config`, `$infra/storage/storageKeys`, or `$shared/uiKit/constants` according to the imported symbol. Remove old domain constants index/files only after imports compile. **Verify**: `bun run lint:ts && bun run test -- --runInBand` → exit 0; `git grep -n '\$domain/constants' -- src` → no matches.
4. Move testing support to `src/testing/`, update tests and the Jest setup path in `package.json`; remove `src/domain/testing`. **Verify**: `bun run lint:ts && bun run test -- --runInBand` → exit 0; `git grep -n '\$domain/testing' -- src` → no matches.
5. Check final ownership and unchanged app behavior via tests. **Verify**: `bun run lint:ts && bun run lint:ci && bun run format:check && bun run test -- --runInBand` → exit 0; `git grep -n -E '\$domain/(constants|theme|testing)' -- src` → no matches (exit 1); `git status --short` → only scoped moves/imports and `plans/README.md`.

## Test plan and done criteria

- [ ] Existing tests pass after setup path updates; no change to theme values, env validation or storage key strings.
- [ ] `domain/` contains only pure user model and entitlement logic (and their barrels/tests); no Expo/React/RevenueCat/Unistyles import in production domain code.
- [ ] Runtime and Jest entrypoints import the new theme registration exactly once each.
- [ ] All four gates pass; grep finds no old imports; no manifest changes beyond the two Jest setup paths.

## STOP conditions

Stop if config move changes runtime env validation, if the theme registration fails before UI initialization, if a storage module cycle appears, if tooling generates routes from a proposed location, if ownership requires rewriting non-import code outside Scope, or if a gate fails twice. Do not paper over an import cycle with a new barrel or type cast.

## Maintenance

Future platform capabilities and API keys belong with `infra/config`; visual tokens with `shared/theme`; test harness under `testing`; pure rules and domain types only under `domain`. A future product may need richer domain modules, but this starter should not invent them prematurely.
