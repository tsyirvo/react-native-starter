# Mobile architecture

Shared rule: it comes from a shared source, so do not edit it in this repo. Repo rules live in the files that `docs/rules/README.md` lists. The mobile `AGENTS.md` names this app's code map and its departures.

The app in `src/` has six layers. Each layer has one job. Code goes in the lowest layer that can hold it. [Code design](code-design.md) holds the module rules that apply inside each layer.

## Layers

| Layer          | Holds                                                                                     | Imports                                                  |
| -------------- | ----------------------------------------------------------------------------------------- | -------------------------------------------------------- |
| `app/`         | Expo Router routes and layouts. A route reads its params, calls a feature and renders it. | Any layer                                                |
| `features/`    | One folder per user-facing flow: its screens, components and hooks.                       | `application/`, `domain/`, `shared/`, the infra wrappers |
| `application/` | App-wide workflows, the data hooks for server state, and the composition of adapters.     | `domain/`, `infra/`, `shared/`                           |
| `domain/`      | Pure types, schemas, rules, constants and ports.                                          | `domain/` only                                           |
| `infra/`       | One adapter for each SDK, backend client, storage or device API.                          | `domain/`, other `infra/` adapters                       |
| `shared/`      | Reusable UI, hooks and utilities with no business knowledge.                              | `domain/`, `shared/`, the infra wrappers                 |

- `domain/` imports no React, React Native, Expo, backend client or SDK. It unit-tests without a mock.
- Import another layer through the `@/` alias, which maps to `src/`: `@/features/<name>`, `@/infra/<name>`.
- `src/testing/` is the testing module. It is outside the six layers: it may import any layer, and only test files and the Jest setup import it, as `@/testing`.
- The **infra wrappers** are adapters with no app state and no backend: the logger, the toaster, haptics, dates, i18n, monitoring, permissions, platform constants and runtime config. Features and shared code may import them.
- Every other adapter has app state, a backend or a user identity: stores, repositories, analytics, feature flags, purchases, auth. Features reach it only through `application/`.
- `application/` never imports `features/`. `shared/` never imports `application/` or `features/`.
- A feature imports another feature only through its public `index.ts`. Code that two features share moves down: to `application/` when it holds state or data, to `shared/` when it is UI or a pure helper.
- Each SDK has one adapter in `infra/`, and only that adapter imports the SDK. Platform code branches on the platform constants from the adapter, not on `Platform.OS`.

## Ports

- Start with one adapter and no port. `application/` calls the adapter directly.
- Add a port when a second adapter exists: a test fake, a second provider, an offline copy. The port is an `interface` in `domain/` for a data source, or in `application/` for an app service. The adapter in `infra/` is typed as the port.
- Where the app has a composition module in `application/`, it is the only file that picks the adapter for a port. Tests mock that module.

## Where new code goes

- **A screen**: a route file in `app/`, and a folder in `features/<name>/`.
- **A feature folder**: the screen component at its root, then only the subfolders it needs: `components/`, `hooks/`, `utils/`, `__tests__/`. Its `index.ts` exports what `app/` and other features use.
- **Server data**: a hook in `application/queries/<domain>/`. Features call the hook, never the backend client. See [state](mobile-state.md).
- **App-wide or persisted client state**: a store. See [state](mobile-state.md).
- **A business rule or a formatter**: a pure function in `domain/<concept>/`, with a unit test.
- **A new SDK**: an adapter in `infra/<name>/` that exports a small, app-shaped interface. When tests need a fake, write an in-memory adapter beside it.
- **A reusable component**: `shared/` when two features use it. Until then, it stays in its feature.

## Folder names

Name a folder for the general concept that it holds, with the glossary term. Do not name it for a vendor or a mechanism. These concepts have a fixed home:

| Concept                                | Folder                            |
| -------------------------------------- | --------------------------------- |
| The data hooks for server data         | `application/queries/<domain>/`   |
| A store                                | `infra/store/<name>Store/`        |
| The backend client                     | `infra/database/`                 |
| The HTTP client for the Worker         | `infra/api/`                      |
| Runtime config                         | `infra/config/`                   |
| Ports                                  | `domain/ports/`                   |
| The design-system primitives           | `shared/uiKit/`                   |
| Reusable components built from them    | `shared/components/`              |
| The tokens and the Unistyles setup     | `shared/theme/`                   |
| The testing module                     | `src/testing/`                    |
| Ambient declarations and backend types | `src/types/`                      |
| Signed-in routes, the tab bar          | `app/(protected)/`, `app/(tabs)/` |

- Each other folder takes the name of its concept: an adapter in `infra/<capability>/`, such as `analytics` and not the vendor's name; a business concept in `domain/<concept>/`; an app-wide workflow in `application/<workflow>/`.
- A layer has no grouping folder, such as `libs`, `core` or `services` in `infra/`, or `entities` or `contexts` in `domain/`. The types, schemas and rules of a concept live in the concept's folder.
- The theme is UI, not a business rule, so it stays out of `domain/`.
- A concept keeps one name in every layer.

## File names

A file that holds one role of a module ends with that role: `<name>.<role>.ts`.

| Suffix                                                     | Holds                                                    |
| ---------------------------------------------------------- | -------------------------------------------------------- |
| `.types.ts`                                                | Types and interfaces, also the types of a domain concept |
| `.constants.ts`                                            | Constants                                                |
| `.schema.ts`                                               | Zod schemas                                              |
| `.utils.ts`                                                | Pure helpers of one module                               |
| `.observable.ts`                                           | A store's private observables                            |
| `.port.ts`, `.adapter.ts`                                  | A port and its adapter                                   |
| `.queries.ts`, `.mutations.ts`, `.requests.ts`, `.keys.ts` | The data hooks of a domain: see [state](mobile-state.md) |

- A feature's constants and types are files at its root, `<name>.constants.ts` and `<name>.types.ts`, not folders.
- A test lives in the `__tests__/` folder beside its code, as `<name>.test.ts` or `<name>.test.tsx`.

## Routes

- Route files hold no logic beyond reading params and composing a feature.
- Name route files and segments in kebab-case: they become URL segments and deep links. Other files keep PascalCase for components and camelCase for the rest.
- Put no file other than a route or a layout under `app/`.

## Enforcement

- The layer imports: the repo's `biome.jsonc` boundary overrides, one block per layer. The mobile `AGENTS.md` names the blocks.
- Biome `useFilenamingConvention` checks the file name case.
- dependency-cruiser rejects import cycles.
- Ports, placement, the folder names, the file suffixes and the wrapper list are review only.
