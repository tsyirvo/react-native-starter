---
inject: true
before: inject screens before this
to: src/routes/routes.tsx
---
<Stack.Screen
  name="<%= h.changeCase.pascalCase(componentName) %>"
  component={Pages.<%= h.changeCase.pascalCase(componentName) %>}
/>