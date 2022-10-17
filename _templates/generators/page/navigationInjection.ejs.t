---
inject: true
before: inject screens before this
to: src/navigation/navigation.tsx
---
        <Stack.Screen
          component={Pages.<%= h.changeCase.pascalCase(componentName) %>}
          name="<%= h.changeCase.pascalCase(componentName) %>"
        />
