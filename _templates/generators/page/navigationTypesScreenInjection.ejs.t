---
inject: true
before: // inject page types before this
to: src/navigation/navigation.types.ts
---
export type <%= h.changeCase.pascalCase(componentName) %>ScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  '<%= h.changeCase.pascalCase(componentName) %>'
>;