# UI, styling and internationalization

## Existing design system

- Reuse `src/shared/uiKit/` primitives and components before introducing new UI.
- Use `StyleSheet` from `react-native-unistyles`. Never define inline style objects; use named styles and supported primitive props.
- Use existing theme tokens for colors, spacing, typography and radii. Read the theme configuration before changing adaptive styling.
- Preserve light/dark behavior. Do not introduce NativeWind, a parallel theme or arbitrary hardcoded design scales.
- Pattern example: `src/shared/uiKit/input/Input.tsx`; inspect its current implementation and supporting hooks rather than treating it as a required component design.
- Lists use the installed LegendList where appropriate; generic skill recommendations do not authorize a switch to FlashList.
- Match existing platform-specific implementations and keyboard/safe-area handling. Use development builds for native verification.
- Safe areas: headerless scrollable screens use `ScreenScrollView` without `Screen` `edges`, so content scrolls under the system bars instead of being clipped by padding. Static screens use `Screen` `edges`; screens with a native header use a `ScrollView` with `contentInsetAdjustmentBehavior="automatic"`.

## Components and accessibility

Use arrow components with Props interfaces, deliberate public exports and
React 19 refs-as-props. Compose existing UI rather than adding flags to a
component for unrelated behavior.

Give interactive elements appropriate accessibility roles, names and states.
Check loading, disabled, error and empty states as applicable. Preserve
accessibility with custom pressable wrappers, and test observable behavior.

`$shared/a11y` owns screen reader behavior. Biome blocks direct imports of
`AccessibilityInfo` and Reanimated's `useReducedMotion` outside it.

- Build a control's accessibility props with the module's prop hooks, or add a
  hook beside them. VoiceOver and TalkBack differ (VoiceOver ignores the
  progressbar role and the busy state), so keep platform workarounds in the
  module's utils, not in components.
- Put translated accessibility strings under the `a11y` key.
- `Pressable` requires a label and a role. `Image` requires alt text or
  `isDecorative`. Give section titles `Text isHeading`.
- When a control reads its visible texts in its own label, hide those texts
  with `aria-hidden`, as `Input` does.
- Read the reduce motion setting with `useIsReduceMotionEnabled`. It follows
  changes while the app runs.
- Unit-test the module's utils and hooks. Do not write component tests that
  assert accessibility props: they test the implementation, not what a screen
  reader says. Verify with VoiceOver and TalkBack instead.

## Translations

- User-facing strings belong in `src/infra/i18n/resources/`, not component literals.
- Use English as the translation-key reference; inspect the locale resources and update every locale.
- Preserve translation-key typing and use the existing i18next integration.
- Consider RTL layout and text expansion; do not bake English-specific dimensions into UI.

Add or update colocated stories for reusable UI variants and behavior tests.
Do not treat a Jest mock or a screenshot as proof of native behavior on both platforms.
