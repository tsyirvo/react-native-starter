---
inject: true
before: // inject stack types before this
to: src/routes/routes.types.ts
---
<%= h.changeCase.pascalCase(componentName) %>: undefined;