# Repository skills

Skills use the [Agent Skills format](https://agentskills.io/specification):
a named directory with a `SKILL.md` containing `name` and `description`,
plus optional references. This repository's canonical discovery location is
`.agents/skills/`; directory discovery remains client-specific.

## Inventory and provenance

| Skill                       | Purpose                                             | Source                                          |
| --------------------------- | --------------------------------------------------- | ----------------------------------------------- |
| `expo-router`               | Existing Expo Router navigation and routes          | Expo, `plugins/expo/skills/expo-router/`        |
| `expo-data-fetching`        | Native networking and query behavior                | Expo, `plugins/expo/skills/expo-data-fetching/` |
| `expo-upgrade`              | Explicit SDK upgrade tasks                          | Expo, `plugins/expo/skills/expo-upgrade/`       |
| `project-native-testing`    | Jest/RNTL with this repository's wrappers and mocks | Repository-authored                             |
| `agent-device`              | Generic agent-device CLI/MCP app automation         | Callstack, `skills/agent-device/`               |
| `dogfood`                   | Exploratory QA on a simulator/emulator              | Callstack, `skills/dogfood/`                    |
| `ios-simulator`             | Verify/debug an app on an iOS Simulator             | Callstack, `skills/ios-simulator/`              |
| `android-emulator`          | Verify/debug an app on an Android Emulator          | Callstack, `skills/android-emulator/`           |
| `project-device-automation` | This app's dev build on a simulator/emulator        | Repository-authored                             |

The Expo snapshot is pinned to
[expo/skills@`c0dadf355d4caa4e1720de372f0f8766df1a8978`](https://github.com/expo/skills/tree/c0dadf355d4caa4e1720de372f0f8766df1a8978/plugins/expo/skills).
Each skill includes the upstream MIT `LICENSE` and all files from its
`references/` directory. Upstream client-specific `agents/openai.yaml` files are
omitted to keep the vendored skills agent-neutral. No upstream scripts are bundled.

The Callstack skills are installed with the [skills CLI](https://github.com/vercel-labs/skills)
from the [`callstack/agent-device`](https://github.com/callstack/agent-device/tree/v0.21.31/skills)
`v0.21.31` tag, the same version as the CLI in `mise.toml`. The root
`skills-lock.json` records each skill's tag and content hash. Their files are
committed unmodified, so the CLI can replace them on update; repository
overrides live in `project-device-automation` instead. The upstream MIT notice is
kept in [licenses/callstack-agent-device.LICENSE](licenses/callstack-agent-device.LICENSE),
outside the skill folders that the CLI rewrites.

## Local adaptations

- Top-level upstream `version` fields are stored as `metadata.upstream-version`, with source/revision/path metadata.
- Each entry point starts with repository constraints; generic examples cannot replace the current stack, ownership or version policy.
- Router guidance uses `src/app/`, existing naming, route groups and `$...` aliases rather than mandatory kebab-case/new aliases.
- Router sibling-skill routing is replaced with the project's UI guide; missing siblings are not installed automatically.
- External feedback commands are replaced with reporting to the user/maintainers.
- The adaptations above apply to the Expo snapshot. Callstack skills stay unmodified; `project-device-automation` replaces their `agent-device@latest` install steps with the mise-pinned CLI and adds this app's identifiers and evidence rules.
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

### Callstack agent-device skills

Bump the skills and the CLI together, from the repository root. The skills CLI
version is pinned and its telemetry disabled:

```sh
DISABLE_TELEMETRY=1 bunx skills@1.7.4 add 'callstack/agent-device#v<version>' \
  -s agent-device -s ios-simulator -s android-emulator -s dogfood -a universal -y
```

1. Set the same `<version>` for `npm:agent-device` in `mise.toml`, then run `mise install`.
2. `-a universal` writes only to `.agents/skills/`. Re-running `add` replaces each skill folder, so never edit those files; put overrides in `project-device-automation`.
3. Review the `SKILL.md` and `skills-lock.json` diffs against the release, check the license is unchanged, and update `project-device-automation` if upstream commands changed.
4. `bunx skills@1.7.4 update -p -y` only re-checks the pinned tag. It does not move to a newer release.
5. Run `bunx skills@1.7.4 experimental_install` (same telemetry flag) to restore missing skills from the lockfile.

### Expo and repository skills

1. Select an explicit upstream commit; never refresh from a floating branch during normal agent startup.
2. Review the whole skill and referenced resources for relevance, licensing, scripts, telemetry and external/destructive actions.
3. Replace only that skill's snapshot, preserving its license. Reapply and review the adaptations above; record new revision metadata here and in `SKILL.md`.
4. Ensure directory names match frontmatter names and all bundled references exist. Keep descriptions focused enough for on-demand loading.
5. Check discovery and invocation in your chosen agent, run the repository checks, and review the diff through a normal PR.

Prefer a small task-focused inventory. Add scripts only when deterministic
execution earns its complexity. Use the skills CLI only for unmodified upstream
skills; do not add another installation/update system or vendor whole
collections by default.
