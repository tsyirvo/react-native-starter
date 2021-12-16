---
inject: true
before: inject pages before this
to: src/navigation/pages.ts
---
import <%= h.changeCase.pascalCase(componentName) %> from '$pages/<%= h.changeCase.pascalCase(componentName) %>';