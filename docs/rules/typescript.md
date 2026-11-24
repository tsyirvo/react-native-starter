# TypeScript

Shared rule: it comes from a shared source, so do not edit it in this repo. Repo rules live in the files that `docs/rules/README.md` lists.

## Types

- Make illegal states unrepresentable. Use a discriminated union where two fields depend on each other.
- Parse outside data where it enters: network responses, storage reads, route and deep-link params, SDK results, environment values. Parse it with a Zod schema into a type, then trust the type.
- Derive types from their source: `z.infer` from a schema, `ComponentProps<typeof X>` from a component, the generated backend types from the backend.
- Define a closed set of values once, as an `as const` array or object, and derive its union type from it. Reuse those values in the schemas and the backend validators.
- Use `interface` for object shapes. Use `type` for unions, intersections, mapped types and aliases.
- Narrow `unknown` with a check or a schema. A cast, a non-null assertion or `any` hides a case the code does not handle.

## Functions and errors

- Use arrow functions.
- Use `async` and `await`. Await or return every promise.
- Each failure has one owner. The code either returns a typed result that the caller branches on, or throws to a boundary that reports it.
- Where the codebase has a result type, reuse it. Narrow the error before you read the value.
- Report an unexpected failure through the repo's logger adapter, with context that holds no personal data and no secret. A `catch` that drops the error is a bug.

## Names

- Name each public thing for a reader who does not know the feature. From the name and the signature alone, they can say what it does or holds.
- Name a thing for its role, not its mechanism. `data`, `info`, `handle`, `process`, `manager`, `utils` and `helper` say nothing.
- Use one name for one concept, and the glossary term when the repo has a `GLOSSARY.md`.
- A boolean starts with a prefix that Biome accepts: `is`, `are`, `was`, `were`, `has`, `have`, `can`, `should`, `will`, `did`, `does` or `requires`. A name with one of these prefixes always holds a boolean.

## Comments

Write no comment by default. Make the code clear first: a better name, a smaller function, a type that carries the rule.

A comment stays only for one of these:

- an outside constraint that the code obeys: an API quirk, a platform bug, a protocol rule;
- a race, order or idempotency guard whose reason no line shows;
- a value that looks wrong but is right;
- an algorithm, or a set of cases that each need their own handling.

These never get a comment: a doc comment that restates a name or a type, an obvious interface member, a test helper, a fixture, a test step, a list of the steps that the body shows, and the history of a change. A comment describes the code below it as it is now. It uses short sentences in the present tense and the active voice.

A lint directive such as `biome-ignore` is not a comment. It always gives its reason.

## Enforcement

| Rule                           | Enforced by                                     |
| ------------------------------ | ----------------------------------------------- |
| No `any`                       | Biome `noExplicitAny`                           |
| No non-null assertion          | Biome `noNonNullAssertion`                      |
| No unsafe cast outside tests   | Biome `noUnsafeTypeAssertion`                   |
| No TypeScript `enum`           | Biome `noEnum`                                  |
| `interface` for object shapes  | Biome `useConsistentTypeDefinitions`            |
| Arrow functions                | Biome `useArrowFunction`                        |
| Every promise handled          | Biome `noFloatingPromises`, `noMisusedPromises` |
| Boolean prefixes               | Biome `useConsistentBooleanName`                |
| Parsing at the boundary, names | Review only                                     |
| Comments                       | Review only                                     |
