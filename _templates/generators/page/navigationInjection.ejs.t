---
inject: true
before: inject screens before this
to: src/core/navigation/navigation.tsx
---
        <Stack.Screen
          component={screens.<%= h.changeCase.pascalCase(componentName) %>}
          name="<%= h.changeCase.pascalCase(componentName) %>"
        />
