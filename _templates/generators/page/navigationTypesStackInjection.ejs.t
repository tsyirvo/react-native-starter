---
inject: true
before: // inject stack types before this
to: src/core/navigation/navigation.types.ts
---
  <%= h.changeCase.pascalCase(componentName) %>: undefined;