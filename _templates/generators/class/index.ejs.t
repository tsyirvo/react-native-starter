---
to: src/components/<%= componentName %>/index.ts
---
export { default } from './components/<%= h.changeCase.pascalCase(componentName) %>';

