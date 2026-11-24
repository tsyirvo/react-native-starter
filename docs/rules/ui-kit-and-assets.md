# UI kit, assets and accessibility in this repo

Repo rule: it extends [mobile components](mobile-components.md) and [mobile architecture](mobile-architecture.md) with the UI kit, the asset entry point and the accessibility module of this repo.

## UI kit

- `src/shared/uiKit/` has no root `index.ts`. Import each group from its entry: `$shared/uiKit/primitives` or `$shared/uiKit/button`. A root barrel loads the dependencies of every component into each Jest test, such as `expo-router` and `expo-image`.
- Keep a module-root barrel in `infra/`, `application/`, `features/` and `domain/`. Tests mock those roots with `jest.mock`, and a deep import skips the mock.
- `src/shared/uiKit/input/` is a reference for a leaf component with its hooks, tests and stories.

## Safe areas

- A headerless scrollable screen uses `ScreenScrollView` and no `Screen` `edges`. Its content then scrolls under the system bars.
- A static screen uses `Screen` with `edges`.
- A screen with a native header uses a `ScrollView` with `contentInsetAdjustmentBehavior="automatic"`.

## Assets

- Register each image and media file in the `Assets` entry point, `$assets`, in `src/assets/index.ts`. A component never imports an asset file.
- Each getter uses a lazy `require`. Do not destructure the `Assets` tree at module scope, and keep unused entries out of it.
- Mirror the `components`, `screens` and `shared` layout of the app in `src/assets/`.
- Icons in `src/shared/icons/` are not assets. Render them with `Icon`.

## Accessibility module

`$shared/a11y` owns screen reader behavior.

- Build the accessibility props of a control with the module's prop hooks, or add a hook beside them. VoiceOver and TalkBack differ: VoiceOver ignores the progressbar role and the busy state. Keep platform workarounds in the module's utils, not in components.
- Put translated accessibility strings under the `a11y` key.
- A `Pressable` needs a label and a role. An `Image` needs alt text or `isDecorative`. A section title uses `Text isHeading`.
- When a control reads its visible texts in its own label, hide those texts with `aria-hidden`, as `Input` does.
- Read the reduce motion setting with `useIsReduceMotionEnabled`. It follows changes while the app runs.

## Enforcement

- Biome `noRestrictedImports` in `biome.jsonc` rejects the `$shared/uiKit` root import, `AccessibilityInfo` and Reanimated's `useReducedMotion` outside `$shared/a11y`.
- The rest is review only.
