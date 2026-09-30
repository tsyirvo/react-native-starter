# Architecture and imports

The [README architecture](../../../README.md#architecture) is the ownership and
folder-layout reference. Preserve that pragmatic design; do not impose a generic
Clean Architecture template.

## Placement and dependency checks

- Routes compose features, application workflows and shared UI; keep policy out of `src/app/`.
- Put app-wide workflows and policy in application. It may call concrete infra adapters, but must not depend on features.
- Features own user-facing flows and their UI/policy. Shared reuse within one feature does not automatically make code globally shared.
- Infra owns concrete SDKs, storage and runtime configuration; it may consume pure domain types/rules.
- Domain must be independent of React, Expo, infra and shared. Shared must not import application or features.
- Add a port only when multiple adapters, repeated policy or difficult test setup justify one.

## Organization and exports

Group components, contexts, hooks, utilities, constants and types by role only
when needed. Keep context definitions/providers together, consumer hooks under
`hooks/`, and standalone helpers under `utils/`. Colocate tests and stories.

Use local `index.ts` exports for code consumed outside its folder. Module-root
barrels expose only the intended public API; internal imports stay local.
Context definitions and initialization-sensitive dependencies can use direct
imports to avoid cycles. Do not replace this with a blanket no-barrels rule.

## Pattern examples

Inspect these examples and their tests for conventions, not fixed module
responsibilities. Follow the current implementation when adapting a pattern.

- `src/application/appAvailability/`: component-and-hook module layout.
- `src/shared/uiKit/input/`: leaf component, supporting hooks, tests and stories.
- `src/app/(protected)/(tabs)/(home)/index.tsx`: thin route composition.
- `src/application/auth/contexts/authContext/AuthContextProvider.tsx`: application workflow calling infra.

For route work, load the vendored `expo-router` skill, adapting examples to
`src/app/`, existing route groups, naming and `$...` aliases. Do not restructure
navigation or migrate tab implementations unless the task calls for it.
