# Plan 003: Move subscription orchestration out of domain

> **Executor**: Read this entire plan; run drift check, follow step gates, and STOP on scope drift. Update only your row in `plans/README.md` when complete.
>
> **Drift check**: `git diff --stat fcad223..HEAD -- src/domain/contexts/subscriptionContext src/domain/subscription src/infra/purchase/purchase.ts src/app/_layout.tsx src/application/auth src/features/subscription`. Changes made by plans 001/002 are expected; inspect their current contents. STOP if provider behavior or purchase adapter interface has changed beyond those plans.

## Status

- Priority P1; effort M; risk MED (purchase state); confidence HIGH; category tech-debt.
- Depends on: plans 001 and 002. Planned at commit `fcad223`.

## Why

`domain/contexts/subscriptionContext/SubscriptionContextProvider.tsx` owns UI-facing React state, feature flag selection and RevenueCat calls. That is a user-facing subscription workflow, not independent domain logic. Move it into `features/subscription` while leaving only the pure entitlement check in `domain/subscription`; then strip RevenueCat's type out of that pure function's interface.

## Current state and conventions

- `src/domain/contexts/subscriptionContext/SubscriptionContext.ts` stores `isPayingUser`, `offeringToDisplay: PurchasesOffering | null` and `handleSetIsPayingUser`.
- `SubscriptionContextProvider.tsx:23-113` reads auth user, calls `Purchase.setUser()` then `isPayingUser()` on user changes, subscribes via `Purchase.customerListener`, and chooses a remote offering with fallback to `offering.current`. Preserve the existing order and error fallbacks; this is a relocation, not new billing semantics.
- `src/domain/subscription/utils/hasActiveEntitlements.ts:1-4` currently takes the entire `CustomerInfo` from `react-native-purchases` solely to read `customerInfo.entitlements.active`. Its only consumers are the provider and `src/infra/purchase/purchase.ts:59-61`. Change its interface to `hasActiveEntitlements(activeEntitlements: Record<string, unknown>): boolean`, using `Object.keys(activeEntitlements).length > 0`; adapt those two call sites to pass `customerInfo.entitlements.active`. This pure function should not import RevenueCat. If actual SDK types are not assignable to that record, STOP rather than casting.
- `src/app/_layout.tsx:20,87` imports/mounts the provider under auth. `src/domain/contexts/subscriptionContext/index.ts` exports provider and hook. Match the local index-barrel convention (e.g. `src/features/loginForm/index.ts`).
- Plan 001 created provider behavior tests; plan 002 changed the auth hook path. Preserve both.

## Commands

`bun run lint:ts` → exit 0; `bun run lint:ci` → exit 0; `bun run format:check` → exit 0; `bun run test -- --runInBand` → all suites pass. For focused tests use `bun run test -- --runInBand --runTestsByPath <path>`. Use `bun run lint` and `bun run format` during implementation, then run read-only checks.

## Scope

In scope: `src/domain/contexts/subscriptionContext/**` (move/delete), `src/domain/subscription/utils/hasActiveEntitlements.ts`, `src/features/subscription/**` (new), `src/infra/purchase/purchase.ts`, `src/app/_layout.tsx`, corresponding tests from plan 001, and `plans/README.md` status. Out of scope: `src/infra/purchase` billing methods other than the entitlement call-site argument, auth/tracking sequence, offering schema, new purchase screens, RevenueCat initialization.

## Steps

1. Move the context, provider, hook and tests to `src/features/subscription/` (keep existing `context/` grouping if useful). Export the provider/hook via a feature index and update root layout import. Change relative auth import to `$application/auth` if plan 002 has landed. Remove old context directory. **Verify**: `bun run lint:ts && bun run test -- --runInBand` → exit 0; `git grep -n '\$domain/contexts/subscriptionContext' -- src` → no matches.
2. Narrow the pure entitlement function's input to `Record<string, unknown>` of active entitlements; update provider listener and purchase adapter call sites to supply `.entitlements.active`. Write a focused pure unit test under `src/domain/subscription/utils/__tests__/hasActiveEntitlements.test.ts` for empty vs one active entitlement. **Verify**: `bun run test -- --runInBand --runTestsByPath src/domain/subscription/utils/__tests__/hasActiveEntitlements.test.ts` and `bun run lint:ts` → exit 0; `git grep -n 'react-native-purchases' -- src/domain` → no matches.
3. Rerun moved subscription tests, full suite and static checks. **Verify**: `bun run lint:ts && bun run lint:ci && bun run format:check && bun run test -- --runInBand` → exit 0; `git status --short` shows scoped files only.

## Done criteria

- [ ] No React provider or SDK type is left under `src/domain/contexts/subscriptionContext` or `src/domain/subscription`.
- [ ] Offering selection/fallback, listener cleanup, no-user/error paths stay covered and passing.
- [ ] Domain entitlement test covers empty/nonempty active entitlements.
- [ ] Typecheck, lint, format check and full suite pass.

## STOP conditions

Stop if plan 002 did not land, SDK entitlement type is not compatible with a record without unsafe casting, another consumer needs a different interpretation of entitlement, or a gate fails twice. Do not change purchase authentication sequencing speculatively: both auth and subscription currently call `Purchase.setUser`; eliminating one without a coordinated identity lifecycle can query the wrong customer.

## Maintenance

When a real subscription experience exists, consider whether its context interface should hide RevenueCat's `PurchasesOffering` type behind an app-specific offering type. One adapter alone does not justify an additional interface today. Review eventual async identity races separately, with tests; they are not repaired by a folder move.
