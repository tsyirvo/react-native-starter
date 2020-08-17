---
to: src/components/<%= componentName %>/index.ts
---
import <%= h.changeCase.pascalCase(componentName) %> from './components/<%= h.changeCase.pascalCase(componentName) %>';

export default <%= h.changeCase.pascalCase(componentName) %>;
