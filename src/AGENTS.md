# App

Applies to `src/`, with the root `AGENTS.md`, routes included. Read [architecture](../docs/rules/mobile-architecture.md), [components](../docs/rules/mobile-components.md), [state](../docs/rules/mobile-state.md), [testing](../docs/rules/mobile-testing.md) and [native config](../docs/rules/mobile-native.md) for the task.

## Layers

`$` maps to `src/`: write `$infra/logger`, `$shared/uiKit/primitives`. Use relative imports inside one module. Biome has no boundary block for the layers yet, so a review checks the imports: see the departures in `docs/rules/README.md`.

Biome `noRestrictedImports` in `biome.jsonc` enforces these imports:

| Import                                             | Rule                                          |
| -------------------------------------------------- | --------------------------------------------- |
| `@legendapp/state`                                 | Only `infra/store/` imports it: use its hooks |
| `$shared/uiKit`                                    | Import a component group entry, not the root  |
| `AccessibilityInfo`, Reanimated `useReducedMotion` | Only `shared/a11y/` imports them              |

The infra wrappers here are `config`, `logger`, `toaster`, `haptics`, `date`, `i18n`, `monitoring` and `permissions`.

## Where things live

| Need                            | Path                                                                                                      |
| ------------------------------- | --------------------------------------------------------------------------------------------------------- |
| App config and build variants   | `app.config.ts`, `eas.json`, `env.js` at the repo root                                                    |
| Jest and Babel config           | `jest.config.mjs` on `jest.base.mjs`, `babel.config.js`, `__mocks__/` at the repo root                    |
| Testing module                  | `testing/`, imported as `$testing`: `setup.ts` for the Jest setup, `utils.tsx` for `render`               |
| Logger                          | `infra/logger/`, imported from `$infra/logger`                                                            |
| Runtime config                  | `infra/config/config.ts`, imported from `$infra/config`                                                   |
| Platform constants              | `infra/config/platform.ts`                                                                                |
| Theme tokens                    | `shared/theme/tokens.ts` and `shared/theme/themes.ts`; the Unistyles setup in `shared/theme/unistyles.ts` |
| UI kit                          | `shared/uiKit/`, with no root barrel: see [UI kit](../docs/rules/ui-kit-and-assets.md)                    |
| Icons                           | `shared/icons/`; `bun run generate:icons` writes `shared/icons/font/`                                     |
| List primitive                  | `LegendList` from `@legendapp/list`                                                                       |
| Screen reader support           | `shared/a11y/`                                                                                            |
| Translations                    | `infra/i18n/resources/en/messages.ts` and `infra/i18n/resources/fr/messages.ts`                           |
| Analytics event names           | `AnalyticsType.EventNames` in `infra/analytics/analytics.types.ts`                                        |
| Routes                          | `app/`; the root layout is `app/_layout.tsx`                                                              |
| Data hooks and the query client | `application/auth/queries/`; the client in `infra/api/queryClient.ts`                                     |
| Stores                          | `infra/store/`; the sign-out reset is `resetStore` in `infra/store/utils/resetStore.ts`                   |
| Assets                          | `assets/`, through the `Assets` entry point in `assets/index.ts`                                          |
| Feature flags                   | `infra/featureFlags/`                                                                                     |
| Purchases                       | `infra/purchase/`                                                                                         |

A file that holds the reference pattern of a layer: `application/appAvailability/` for a module with components and hooks, and `app/(protected)/(tabs)/(home)/index.tsx` for a thin route.

## Recipes

Add a screen:

1. Add the route file in `app/`, in kebab-case. It reads its params and renders the feature.
2. Add the feature folder in `features/<name>/` and export the screen from its `index.ts`.
3. Add the user-facing text as translation keys.

Add a translation key:

1. Add the key to `infra/i18n/resources/en/messages.ts`.
2. Add the same key to `infra/i18n/resources/fr/messages.ts`. The typecheck fails until French has it.

Add an analytics event:

1. Add the name to `AnalyticsType.EventNames` in `infra/analytics/analytics.types.ts`.
2. Track it at the business action, in a hook.

Add a store value:

1. Add the value to a slice in `infra/store/app/app.store.ts`. Keep persisted and transient values in separate observables.
2. Export a hook that reads it with `useValue`, and a function that sets it.
3. Reset it in the function that `registerStoreReset` registers, so sign-out clears it.

Add an icon:

1. Add the single-color SVG to `shared/icons/svgs/`. The file name is the icon name.
2. Run `bun run generate:icons` and commit `shared/icons/font/`.

## Read for the task

| Task                                                | Rules                                                                                  |
| --------------------------------------------------- | -------------------------------------------------------------------------------------- |
| A UI kit import, safe areas, assets, screen readers | [UI kit, assets and accessibility](../docs/rules/ui-kit-and-assets.md)                 |
| Tests                                               | [Mobile testing](../docs/rules/mobile-testing.md), [testing](../docs/rules/testing.md) |
| Dependencies, native config, builds                 | [Native config](../docs/rules/native.md)                                               |
| Routes                                              | The `expo-router` skill, adapted to `app/` and its route groups                        |
| Server data or networking                           | [State](../docs/rules/mobile-state.md); the `expo-data-fetching` skill                 |
| Driving the running app                             | The `project-device-automation` skill                                                  |
