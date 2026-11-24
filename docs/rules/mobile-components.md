# Mobile components and hooks

Shared rule: it comes from a shared source, so do not edit it in this repo. Repo rules live in the files that `docs/rules/README.md` lists.

## Components

- A component renders. Business actions, navigation, analytics, async work and complex state transitions live in a hook. Simple UI state, such as a toggle, stays in the component.
- Write arrow function components with a named `Props` interface. Do not use `React.FC`. Derive another component's props with `ComponentProps<typeof X>`.
- React 19 passes `ref` as a prop. Do not add `forwardRef`.
- A component owns its inside, never its outside: it sets no outer margin. The parent places it with padding, gap or a wrapper.
- Compose existing components. Do not add a flag to a component for a behavior that is not its own.
- Map server data to the shape the UI needs before you render it. A component does not read backend types.
- Show each state the data can have: loading, error, empty and content. Keep cached content on screen while it refetches.

## Hooks

- A hook owns one coherent behavior. It exposes the values and the actions the UI needs, never a client or an SDK.
- Feature hooks live in the feature's `hooks/` folder, named `use<Name>`.
- Derive values during render. Use an effect only to sync with an outside system, with honest dependencies and a cleanup.
- Guard each async result against a screen that unmounted or an identity that changed before it arrived.
- Track an analytics event at the business action, in the hook, not in a leaf component. Follow the repo's privacy rule for the payload.
- React Compiler memoizes. Add `useMemo`, `useCallback` or `memo` only where a measured cost or a stable identity needs it.

## Styling

- Define styles with `StyleSheet.create((theme) => ({ … }))` from `react-native-unistyles`, outside the component.
- Take every value from the theme: colors, spacing, radii, font sizes. Add a token to the theme before you use a new value. A named constant for a geometry or animation value is fine.
- Use variants or style functions for dynamic styles, so each style stays in the stylesheet. Combine styles with an array, not a spread.
- Start from the repo's UI kit primitives. Do not add a second styling library or a parallel theme.
- Keep light and dark mode working.
- For a native SwiftUI or Compose control, load the `expo-ui` skill. For animation, gestures and haptics, load the `animate-expo` skill.

## Lists

- Use `LegendList` from `@legendapp/list` for content that grows with data. This holds also when a skill suggests another list.
- Keep `renderItem` and `keyExtractor` at module level, with stable keys. Pass other inputs through `extraData`.
- A bounded control, such as a picker or a carousel that needs snapping or measured layout, may use a local render function.

## Text and accessibility

- Every user-facing string goes through `t()`, with its key in every locale. A key missing in one locale fails the typecheck.
- Format numbers, dates and units with the repo's formatters, which follow the user's settings.
- Give each interactive element a role, a label and its state. An image needs alt text, or is marked decorative.
- Plan for longer text and right-to-left layout. Do not size a box for English text.

## Storybook

A new UI kit component gets a story in a `stories/` folder beside it.

## Enforcement

| Rule                                | Enforced by                                                  |
| ----------------------------------- | ------------------------------------------------------------ |
| Function components                 | Biome `useReactFunctionComponents`                           |
| No `forwardRef`                     | Biome `noReactForwardRef`                                    |
| No literal colors                   | Biome `noReactNativeLiteralColors`                           |
| LegendList for data lists           | Biome `noRestrictedImports` on `@shopify/flash-list`         |
| Raw text outside a text component   | Biome `noReactNativeRawText`                                 |
| Hooks at the top level, honest deps | Biome `useHookAtTopLevel`, `useExhaustiveDependencies`       |
| Compiler-safe code                  | Biome `useReactCompiler`                                     |
| Every key in every locale           | The typecheck, where the locale files are typed from English |
| The rest                            | Review only                                                  |
