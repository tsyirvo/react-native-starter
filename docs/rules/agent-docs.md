# Agent docs

Shared rule: it comes from a shared source, so do not edit it in this repo. Repo rules live in the files that `docs/rules/README.md` lists.

Read this rule before you change an `AGENTS.md`, a rule in `docs/rules/`, `GLOSSARY.md` or a skill. When the `writing-for-agents` skill is installed, load it for the writing itself.

## Where guidance lives

| File                          | Holds                                                                             |
| ----------------------------- | --------------------------------------------------------------------------------- |
| Root `AGENTS.md`              | The project line, the scope table, the done gate, the ask-first actions, pointers |
| Scope `AGENTS.md`             | The folder's layers, a code map, task recipes, and which rules to read            |
| `CLAUDE.md` beside each one   | Only `@AGENTS.md`, so Claude Code loads the same text                             |
| Shared rules in `docs/rules/` | The conventions every repo of this kind follows. They start with "Shared rule"    |
| Repo rules in `docs/rules/`   | The conventions of this repo only, and its departures from the shared rules       |
| `GLOSSARY.md`                 | The domain terms                                                                  |
| `docs/adr/`                   | The decisions, with their context and the options rejected                        |
| `.agents/skills/`             | Task workflows. `.claude/skills` links to this folder                             |
| Manifests, configs, workflows | Versions, scripts and settings. Docs link to them and never copy them             |

## Rules

- Keep one source of truth for each meaning. Link to it from other docs. Never copy a rule into a second file.
- An `AGENTS.md` is always loaded, so each line costs context on every turn. Keep in it what every task in that folder needs. Move the rest to a rule, behind a pointer that names when to read it.
- Write what an agent cannot learn by looking: an unwritten convention, the reason for a surprising choice, a gotcha that cost time. Leave out what a manifest, a config or the folder listing already says.
- State the target behavior. Use a prohibition only for a hard guardrail, and pair it with what to do instead.
- Rules state the target, even where the code does not match it yet. Each rule file ends with **Enforcement**: the lint rule, test or hook that checks each rule, or "review only". A check that a repo does not have yet is a departure.
- Code that breaks a shared rule today is a row under **Departures** in `docs/rules/README.md`: the rule, the code it covers, and a probe that counts it. A departure is debt to fix, never a pattern to copy. New code follows the shared rule, also in a folder that a row names. A repo rule never overrides a shared rule.
- In a repo doc, wrap a path in backticks only when it exists. `bun run check` fails on a backticked path that resolves to no file. Shared rules describe the target shape, so the check skips them. A gap between a shared rule and the repo is a departure.

## Loading

- Claude Code loads the `AGENTS.md` above the working folder through each `CLAUDE.md`. It loads a nested one when it reads a file in that folder.
- Pi loads only the `AGENTS.md` files in its working folder and the folders above it.
- So before you edit a folder, read its scope `AGENTS.md` if it is not in context. A change across scopes reads every scope it touches. A change to a shared export also reads the scopes of its consumers.

## After a change to agent docs

1. Follow the root scope table to each scope, and each pointer to its target.
2. Check that each `CLAUDE.md` holds only `@AGENTS.md`.
3. Run `bun run check`: it checks the backticked paths.
4. Compare each command with `package.json` and each API claim with the installed types.

## Enforcement

- `bun run check` fails on a backticked path in an `AGENTS.md` or in a repo doc under `docs/` that does not exist.
- The rest is review only.
