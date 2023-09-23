---
inject: true
before: inject pages before this
to: src/core/navigation/screens.ts
---
import { <%= h.changeCase.pascalCase(componentName) %> } from '$screens/<%= h.changeCase.pascalCase(componentName) %>';