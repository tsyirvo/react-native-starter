# Rules

A rule that starts with "Shared rule" comes from a shared source: do not edit it in this repo. A repo rule extends one shared rule for this repo.

## Every change

- [TypeScript](typescript.md): writing any TypeScript.
- [Code design](code-design.md): adding or changing a module, an export, a function signature or a port.
- [Test design](test-design.md): writing, changing or deleting a test.
- [Quality gates](quality-gates.md): a check fails, or you touch a debt file, a base config or a hook.
- [Compatibility](compatibility.md): changing a persisted value, a backend contract, a route, or an analytics or flag name.
- [Agent docs](agent-docs.md): changing an `AGENTS.md`, a rule, `GLOSSARY.md` or a skill.

## Mobile app

- [Architecture](mobile-architecture.md): deciding where code goes; a new screen, feature, adapter or port.
- [Components and hooks](mobile-components.md): UI, hooks, styling, lists, text and accessibility.
- [State and data](mobile-state.md): server data, stores, sessions and sign-out.
- [Testing](mobile-testing.md): Jest and Testing Library tests in the app.
- [Native config and releases](mobile-native.md): dependencies, native config, builds and releases.

## This repo

- [Testing](testing.md): the commands, helpers and reference tests of this repo.
- [UI kit, assets and accessibility](ui-kit-and-assets.md): a UI kit import, a screen's safe areas, an image, or screen reader support.
- [Native config](native.md): Expo and EAS scripts, the Android development build marker, the icon font, `test-renderer` and releases.
- [Agent tooling](agent-tooling.md): driving the app on a simulator, or changing a skill, an MCP server or the edit hook.

## Departures

Code that breaks a shared rule today. Each row is debt to fix, not a pattern to copy: new code follows the shared rule, also in a folder that a row names. A later change removes the rows.

Run each probe from `src/`.

| Shared rule                                         | Where                          | What the code does today                                                                                             | Probe                                                                                                                                                    | Files         |
| --------------------------------------------------- | ------------------------------ | -------------------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------- |
| [Architecture](mobile-architecture.md), layers      | `features/subscription/`       | A feature imports the feature-flag and purchase adapters. The target is `application/`                               | `git grep -lE "from '[$@]/?infra/(store\|database\|analytics\|featureFlags\|purchase\|api\|repositories)" -- 'features/**' ':!**/__tests__/**' \| wc -l` | 1             |
| [Architecture](mobile-architecture.md), layers      | `domain/entities/`             | A grouping folder. The target is one folder for each concept                                                         | `git ls-files -- domain/entities \| wc -l`                                                                                                               | 2             |
| [Architecture](mobile-architecture.md), folders     | `application/auth/queries/`    | Data hooks sit beside their workflow. The target is `application/queries/<domain>/`                                  | `git ls-files -- 'application/*/queries/*' \| wc -l`                                                                                                     | 2             |
| [Architecture](mobile-architecture.md), folders     | `infra/store/app/`             | The store folder is `app/`, with `app.store.ts` and `app.types.ts`. The target is appStore/ with `app.observable.ts` | `git ls-files -- 'infra/store/*/*.store.ts' \| wc -l`                                                                                                    | 1             |
| [Architecture](mobile-architecture.md), files       | `domain/entities/`             | The type file ends in `.model.ts`. The target is `.types.ts`                                                         | `git ls-files -- '*.model.ts' \| wc -l`                                                                                                                  | 1             |
| [Architecture](mobile-architecture.md), files       | `testing/integration/`         | A test outside `__tests__/`, by the rule in [testing](testing.md)                                                    | `git ls-files -- '*.test.ts' '*.test.tsx' \| grep -vc __tests__`                                                                                         | 1             |
| [Architecture](mobile-architecture.md), alias       | Every layer                    | The alias is `$`, so the testing module imports as `$testing`. The target is the `@/` alias and `@/testing`          | `git grep -lE "from '\\$" -- . \| wc -l`                                                                                                                 | 119           |
| [Architecture](mobile-architecture.md), enforcement | `biome.jsonc`                  | No boundary block for `features/`, `shared/`, `application/`, `app/` or `domain/`                                    | `grep -c 'src/features' ../biome.jsonc` prints 0                                                                                                         | Missing check |
| [Components](mobile-components.md), enforcement     | `biome.jsonc`                  | No Biome rule bans `@shopify/flash-list`                                                                             | `grep -c flash-list ../biome.jsonc` prints 0                                                                                                             | Missing check |
| [Testing](mobile-testing.md), enforcement           | `biome.jsonc`                  | No Biome rule bans `@testing-library/react-native` outside the testing module, or the testing module outside tests   | `grep -c testing-library ../biome.jsonc` prints 0                                                                                                        | Missing check |
| [Compatibility](compatibility.md), enforcement      | `infra/storage/storageKeys.ts` | No test pins the persisted storage ids and keys                                                                      | Review only                                                                                                                                              | Missing check |
