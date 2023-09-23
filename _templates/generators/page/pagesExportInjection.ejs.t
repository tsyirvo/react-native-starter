---
inject: true
before: // inject exports before this
to: src/core/navigation/screens.ts
---
  <%= h.changeCase.pascalCase(componentName) %>,