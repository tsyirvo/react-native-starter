# Plan 006: Document the starter's architecture and growth rules

> **Executor**: Read this plan and inspect the landed layout before writing. Run drift check first. Do not claim unimplemented authentication or API integration exists. Update `plans/README.md` status on completion.
>
> **Drift check**: `git diff --stat fcad223..HEAD -- README.md CLAUDE.md plans src/application src/domain src/features src/infra src/shared src/testing`. Source changes from plans 001–005 are expected. STOP if those plans were not completed or adopted a different directory layout.

## Status

- Priority P2; effort S; risk LOW; confidence HIGH; category docs.
- Depends on: plans 002–005 (and transitively plan 001). Planned at commit `fcad223`.

## Why

There is currently no architecture/decision document recording the intended separation; folder names alone invited divergent interpretations. A short explicit convention is more valuable for a reusable starter than layer scaffolding that every consuming app must fill. Explain how to grow features when real business behavior arrives, without imposing ports/classes in advance.

## Current state and required vocabulary

- `README.md:13-21` states this is a lightweight starter for varied personal/client apps and emphasizes tooling rather than extensive built-in product UI.
- `CLAUDE.md` currently describes `src/app`, `src/application`, `src/domain`, `src/features`, `src/infra`, `src/shared`; after plans 002–005 update those descriptions to actual ownership and include `src/testing`.
- Target after earlier plans: thin `app/` routes; `application/auth` and `application/bootstrap` own cross-feature/startup workflows; `features/` own user-facing flows and their presentation; `infra/` concrete SDKs, storage and runtime config; `shared/` reusable UI, theme, hooks and utility functions; `domain/` only pure rules/models; `testing/` test helpers. `features/storeRating` stays intentionally tiny. Expo Router files under `src/app/` are routes; do not casually add config files there.
- The session query, token refresh and sign-in are still placeholders (`src/application/auth/hooks/useGetUserSession.ts`, `src/infra/api/token.ts`, auth provider). Do not describe these as secure production auth. No API client is wired up; see current `CLAUDE.md` note.
- Commands already in `CLAUDE.md` and `package.json`: `bun run lint:ts`, `bun run lint:ci`, `bun run format:check`, `bun run test -- --runInBand`; `bun run lint`/`bun run format` write changes. Use `bun`, not bare `bun test`.

## Scope

In scope: `README.md`, `CLAUDE.md`, optionally create `docs/architecture.md` if a short README subsection would otherwise be too long, plus `plans/README.md` status row. Out of scope: source files, package scripts, architecture diagrams that hard-code every import, blanket dependency-injection framework, ADR files (no hard-to-reverse decision is being made), vendor documentation.

## Steps

1. Read landed imports/layout and write a brief `README.md` architecture subsection (or `docs/architecture.md` linked from README) with a directory-to-responsibility table and **three concrete import examples**: a route consumes a feature and shared UI; an application workflow calls infra and uses domain types/rules; a feature calls infra for an SDK capability. State that `domain` must not import React/Expo/infra/shared; `infra` may use domain types/rules; `shared` should not import application or features; and feature-specific UI/policy should not be placed in shared solely for reuse within one screen. Name composition modules in `application` as a pragmatic exception to strict inward-only clean architecture (they call concrete adapters until a real alternative exists). **Verify**: `bun run format:check` → exit 0 and `git diff --check` → exit 0.
2. Explain decision rule: begin with one local implementation; add a seam/port only when multiple adapters, complex test setup, or repeated policy justify it. Explain that app-specific domain concepts and richer workflows are created as a _consuming app_ grows, not prefilled in the starter. Clearly label demo auth/placeholder token/absence of backend and list checks. **Verify**: `bun run format:check && git diff --check` → exit 0; human review confirms all example paths exist in the landed code.
3. Update `CLAUDE.md` project-structure section and any statements contradicting the landed directory layout; link the README architecture subsection instead of duplicating all rules. **Verify**: `bun run lint:ts && bun run lint:ci && bun run format:check && bun run test -- --runInBand && git diff --check` → exit 0.

## Test plan and done criteria

- [ ] README explains intent, ownership, import direction and when _not_ to add abstraction.
- [ ] CLAUDE.md matches the final directory layout; examples refer to actual files.
- [ ] Placeholder auth/backend limitations remain visible; no promise of production-grade auth.
- [ ] Documentation changes only; static checks, full Jest suite and `git diff --check` pass.

## STOP conditions

Stop if prior plans have not landed, or if the landed ownership differs enough that the target examples would be false. Do not write aspirational rules unsupported by the final code; report the divergence first.

## Maintenance

When real backend auth or product domain workflows land, revisit the rules with concrete examples. Do not treat the template's present directory names as immutable product architecture.
