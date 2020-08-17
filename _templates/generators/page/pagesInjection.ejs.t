---
inject: true
before: inject pages before this
to: src/routes/pages.ts
---
const <%= h.changeCase.pascalCase(componentName) %> = lazy(() => import('components/<%= h.changeCase.pascalCase(componentName) %>'));