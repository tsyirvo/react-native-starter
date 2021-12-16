---
inject: true
before: // inject exports before this
to: src/navigation/pages.ts
---
  <%= h.changeCase.pascalCase(componentName) %>,