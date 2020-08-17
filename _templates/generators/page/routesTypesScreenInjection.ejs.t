---
inject: true
before: // inject page types before this
to: src/routes/routes.types.ts
---
export type <%= h.changeCase.pascalCase(componentName) %>ScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  '<%= h.changeCase.pascalCase(componentName) %>'
>;