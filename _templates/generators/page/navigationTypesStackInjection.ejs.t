---
inject: true
before: // inject stack types before this
to: src/navigation/navigation.types.ts
---
  <%= h.changeCase.pascalCase(componentName) %>: undefined;