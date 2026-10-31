# Architecture

This starter has an opinionated structure, but it is not a full product
architecture. Auth, purchases and other common integrations are already
connected. Product-specific concepts are not. Add them when your app needs
them.

## Layers

Each folder in `src/` has one responsibility. Keep code in the folder that owns
it.

| Folder             | Responsibility                                                                              |
| ------------------ | ------------------------------------------------------------------------------------------- |
| `src/app/`         | Expo Router routes and navigation. Each file is a route. Do not add other files here.       |
| `src/application/` | App-wide workflows: demo auth, startup, app availability and updates, instrumentation.      |
| `src/features/`    | User-facing flows with their UI and rules, for example `storeRating/`.                      |
| `src/infra/`       | SDK integrations, storage, API scaffolding and runtime configuration.                       |
| `src/shared/`      | Reusable UI, theme, hooks and utilities. No app-wide or feature-specific rules.             |
| `src/assets/`      | Images and other media. Code uses them only through the `Assets` entry point.               |
| `src/domain/`      | Pure models and rules. At this time: the user types and the subscription entitlement check. |
| `src/testing/`     | Jest setup and React Native Testing Library helpers.                                        |

## Import rules

- `domain` does not import React, Expo, `infra` or `shared`.
- `infra` can import types and pure rules from `domain`.
- `shared` does not import `application` or `features`.
- `features` can use `application` workflows. `application` does not import
  `features`.
- Routes in `app/` combine `features`, `application` and `shared`.
- `application` can call `infra` adapters directly.

The last rule is a deliberate exception to strict Clean Architecture. You do
not need a port for each SDK. Start with one local implementation. Add a port
only when you have more than one adapter, a difficult test setup or a rule
that repeats in many places.

Some examples from the current code:

- The home route `src/app/(protected)/(tabs)/(home)/index.tsx` imports
  components from `$features/home` and `Screen` from `$shared/components`.
- The auth provider in `src/application/auth/` imports the `User` type from
  `$domain/entities` and calls the `$infra/purchase` adapter.
- The notification permission hook in `src/features/notifications/` calls
  `$infra/permissions` and `$infra/toaster`.

## Auth and purchases

- The sign-in is a **demo only**. Session restoration and token refresh are
  placeholders. No backend API client is connected. Do not use it as
  production authentication.
- Auth owns the purchase identity. It runs login and logout calls one at a
  time.
- The subscription feature waits for `isPurchaseUserReady` before it reads
  entitlements. It ignores results that are for a previous user.
- If the purchase SDK fails during sign-out, the app logs the error and signs
  the user out locally.
- The maintenance and store-update rules are in `application/appAvailability/`,
  not in shared UI.

## Folder conventions

In a module, put each type of file in its own folder: `components/`,
`contexts/`, `hooks/`, `utils/`, `constants/` and `types/`. Create only the
folders that you need. `application/appAvailability/` is a good reference.

- **Contexts:** keep the context and its provider together in
  `contexts/<contextName>/`. Put the consumer hooks in the module's `hooks/`
  folder.
- **Components:** use a flat `components/` folder for simple components. A
  complex component can have its own subfolder with its tests, stories and
  helpers.
- **Tests and stories:** put `__tests__/` and `stories/` next to the code that
  they test or show.
- **Small packages:** a leaf package such as `shared/uiKit/input/` can keep
  its main component at the package root. A simple SDK adapter can keep its
  implementation and types together.
- **Exports:** add a local `index.ts` for code that other folders import. The
  module root exports only the public API. Code in a module does not import
  from its own module root. Contexts and modules that are sensitive to
  initialization order can use direct imports.
- **UI kit imports:** `shared/uiKit/` has no root `index.ts`. Import each
  component group from its own entry, for example
  `$shared/uiKit/primitives`. A root barrel loads the dependencies of all
  components, such as `expo-router` and `expo-image`, into each test. Biome
  reports an import from `$shared/uiKit`.
- **Mocks:** tests mock module roots such as `$infra/logger`. Import those
  modules from their root, not from a file in the module. A `jest.mock` call
  replaces only the path that it names.
- **Routes:** do not add these folders under `src/app/`. Name route files in
  kebab-case, because they become URL segments.
- **Generated files:** do not edit generated files, for example the icon font
  in `shared/icons/font/`.

Read [UI](ui.md#images-and-media) for the asset rules.
