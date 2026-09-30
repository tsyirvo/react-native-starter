# Repository skills

Skills use the [Agent Skills format](https://agentskills.io/specification):
a named directory with a `SKILL.md` containing `name` and `description`,
plus optional references. This repository's canonical discovery location is
`.agents/skills/`; directory discovery remains client-specific.

## Inventory and provenance

| Skill                    | Purpose                                             | Source                                          |
| ------------------------ | --------------------------------------------------- | ----------------------------------------------- |
| `expo-router`            | Existing Expo Router navigation and routes          | Expo, `plugins/expo/skills/expo-router/`        |
| `expo-data-fetching`     | Native networking and query behavior                | Expo, `plugins/expo/skills/expo-data-fetching/` |
| `expo-upgrade`           | Explicit SDK upgrade tasks                          | Expo, `plugins/expo/skills/expo-upgrade/`       |
| `project-native-testing` | Jest/RNTL with this repository's wrappers and mocks | Repository-authored                             |

The Expo snapshot is pinned to
[expo/skills@`c0dadf355d4caa4e1720de372f0f8766df1a8978`](https://github.com/expo/skills/tree/c0dadf355d4caa4e1720de372f0f8766df1a8978/plugins/expo/skills).
Each skill includes the upstream MIT `LICENSE` and all files from its
`references/` directory. Upstream client-specific `agents/openai.yaml` files are
omitted to keep the vendored skills agent-neutral. No upstream scripts are bundled.

## Local adaptations

- Top-level upstream `version` fields are stored as `metadata.upstream-version`, with source/revision/path metadata.
- Each entry point starts with repository constraints; generic examples cannot replace the current stack, ownership or version policy.
- Router guidance uses `src/app/`, existing naming, route groups and `$...` aliases rather than mandatory kebab-case/new aliases.
- Router sibling-skill routing is replaced with the project's UI guide; missing siblings are not installed automatically.
- External feedback commands are replaced with reporting to the user/maintainers.
- Reference files are unchanged upstream snapshots. Their examples remain advisory and can mention libraries or sibling skills that are not installed.

Root `AGENTS.md` and the task guides define this repository's coding standards.
Inspect current source and tests for implementation details and helper contracts;
skill examples and snapshots are not implementation inventories.
Do not migrate to FlashList/NativeWind/SWR, add auth/offline infrastructure,
enable React Compiler or delete caches just to match a skill example.

## Discovery

Use these skills with any Agent Skills-compatible client. Check whether your
agent discovers `.agents/skills/`; otherwise configure its skill paths or add
a local bridge to that directory. Keep the canonical skills here rather than
maintaining separate copies for each agent.

See [agent setup](../docs/agents/README.md) for the adaptation checklist,
optional client examples, duplicate-name handling and the Windows fallback.

## Maintenance

1. Select an explicit upstream commit; never refresh from a floating branch during normal agent startup.
2. Review the whole skill and referenced resources for relevance, licensing, scripts, telemetry and external/destructive actions.
3. Replace only that skill's snapshot, preserving its license. Reapply and review the adaptations above; record new revision metadata here and in `SKILL.md`.
4. Ensure directory names match frontmatter names and all bundled references exist. Keep descriptions focused enough for on-demand loading.
5. Check discovery and invocation in your chosen agent, run the repository checks, and review the diff through a normal PR.

Prefer a small task-focused inventory. Add scripts only when deterministic
execution earns its complexity; do not introduce a second installation/update
system or vendor whole collections by default.
