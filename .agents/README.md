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
| `expo-ui`                   | Native components with `@expo/ui`                    | Expo, `plugins/expo/skills/expo-ui/`            |
| `expo-native-ui`            | Native-feeling screen layout and visual effects      | Expo, `plugins/expo/skills/expo-native-ui/`     |
| `animate-expo`              | Animation and gesture implementation                 | Emil Kowalski, `skills/animate-expo/`           |
| `argent-react-native-profiler` | Hermes CPU and React commit profiling             | Software Mansion, `packages/skills/skills/argent-react-native-profiler/` |
| `argent-react-native-optimization` | Measurement-led performance investigation     | Software Mansion, `packages/skills/skills/argent-react-native-optimization/` |
| `react-native-best-practices` | Performance diagnosis and optimization references | Callstack Incubator, `skills/react-native-best-practices/` |
| `systematic-debugging`      | Root-cause investigation and regression verification | Obra, `skills/systematic-debugging/`           |
| `react-native-testing`      | Version-specific RNTL APIs and test-writing guidance | Callstack, `skills/react-native-testing/`       |
| `project-native-testing`    | Jest/RNTL with this repository's wrappers and mocks | Repository-authored                             |
| `agent-device`              | Generic agent-device CLI/MCP app automation         | Callstack, `skills/agent-device/`               |
| `dogfood`                   | Exploratory QA on a simulator/emulator              | Callstack, `skills/dogfood/`                    |
| `ios-simulator`             | Verify/debug an app on an iOS Simulator             | Callstack, `skills/ios-simulator/`              |
| `android-emulator`          | Verify/debug an app on an Android Emulator          | Callstack, `skills/android-emulator/`           |
| `project-device-automation` | This app's dev build on a simulator/emulator        | Repository-authored                             |

The Expo skills are installed unmodified with the skills CLI, pinned to
[expo/skills@`d5caf7fdf8b4854351f05841a7e315ac87ad7d24`](https://github.com/expo/skills/tree/d5caf7fdf8b4854351f05841a7e315ac87ad7d24/plugins/expo/skills).
The root `skills-lock.json` records their revision and content hashes. The CLI
includes upstream references and `agents/openai.yaml` metadata; `.agents/skills/`
remains the canonical discovery location. `expo-ui` bundles a reviewed,
read-only `scripts/list-components.js` helper that inspects installed `@expo/ui`
types and prints component/modifier names. It performs no network requests or
writes. Its upstream Node command assumes CommonJS; this repository uses
`"type": "module"`, so use `bun .agents/skills/expo-ui/scripts/list-components.js .`
when needed, or inspect installed types directly.
The upstream MIT notice is kept in
[licenses/expo-skills.LICENSE](licenses/expo-skills.LICENSE), outside the folders
the CLI rewrites.

The Callstack device-automation skills are installed with the [skills CLI](https://github.com/vercel-labs/skills)
from the [`callstack/agent-device`](https://github.com/callstack/agent-device/tree/v0.21.31/skills)
`v0.21.31` tag, the same version as the CLI in `mise.toml`. The root
`skills-lock.json` records each skill's tag and content hash. Their files are
committed unmodified, so the CLI can replace them on update; repository
overrides live in `project-device-automation` instead. The upstream MIT notice is
kept in [licenses/callstack-agent-device.LICENSE](licenses/callstack-agent-device.LICENSE),
outside the skill folders that the CLI rewrites.

`animate-expo` is installed unmodified from
[emilkowalski/skills@`2d228630ba1446365f614a108cb8252f1feda202`](https://github.com/emilkowalski/skills/tree/2d228630ba1446365f614a108cb8252f1feda202/skills/animate-expo).
Its recipe file is included; no scripts are bundled. The upstream MIT notice is
kept in [licenses/emilkowalski-skills.LICENSE](licenses/emilkowalski-skills.LICENSE).

The two Argent skills are installed unmodified from
[software-mansion/argent@`9565991fb18fc9bc1d04dd3c54ba49e697317f85`](https://github.com/software-mansion/argent/tree/9565991fb18fc9bc1d04dd3c54ba49e697317f85/packages/skills/skills),
with references and hashes recorded in `skills-lock.json`. They bundle Markdown
only. The Apache-2.0 license is preserved in
[licenses/argent-skills.LICENSE](licenses/argent-skills.LICENSE).

`react-native-best-practices` is installed unmodified from
[callstackincubator/agent-skills@`59e9d17446a248b21d86f078fcd0bd2d36db1ca4`](https://github.com/callstackincubator/agent-skills/tree/59e9d17446a248b21d86f078fcd0bd2d36db1ca4/skills/react-native-best-practices).
Its references and images are included; its MIT notice is kept in
[licenses/callstack-best-practices.LICENSE](licenses/callstack-best-practices.LICENSE).

`systematic-debugging` is installed unmodified from
[obra/superpowers@`2ce8aa15d05bd57213e6f746f953aafb7ded7a8b`](https://github.com/obra/superpowers/tree/2ce8aa15d05bd57213e6f746f953aafb7ded7a8b/skills/systematic-debugging).
Its supporting techniques, upstream evaluation documents, shell helper and
TypeScript example are included. Its MIT notice is kept in
[licenses/superpowers.LICENSE](licenses/superpowers.LICENSE).
Both skills' revisions and hashes are recorded in `skills-lock.json`.

`react-native-testing` is installed unmodified from
[callstack/react-native-testing-library@`0ecb9c9c0cef163e01abdeae1b4b7c82af40d0b1`](https://github.com/callstack/react-native-testing-library/tree/0ecb9c9c0cef163e01abdeae1b4b7c82af40d0b1/skills/react-native-testing).
It includes Markdown references for RNTL v13/v14 and anti-patterns, with no scripts.
Its revision and hash are recorded in `skills-lock.json`; its MIT notice is kept
in [licenses/react-native-testing-library.LICENSE](licenses/react-native-testing-library.LICENSE).
Use [project-native-testing](skills/project-native-testing/SKILL.md) as the project
entry point; it routes API questions to the matching upstream reference while
preserving the shared test wrapper and repository workflow.

## Repository overrides

Upstream skill folders stay unmodified so the CLI can replace them. Apply these
constraints when using the Expo skills and `animate-expo`:

- Read `src/AGENTS.md` and the task guide routed from root `AGENTS.md` before source work. Repository conventions and installed-version APIs take precedence over upstream examples.
- Keep routes in `src/app/`, preserving naming, route groups and `$...` aliases. Keep UI and policy outside the route tree; follow the UI guide for Unistyles and theme tokens rather than installing sibling skills.
- Reuse the existing TanStack Query client, runtime config and storage adapters. Validate responses and consume cancellation signals where supported. Verify auth and offline capabilities in implementation and tests rather than inferring them from examples or persistence.
- Use Bun equivalents of npm/npx commands. Upgrade only to an explicitly requested target SDK; preserve customized Babel/Metro settings, storage, required peers and navigation. Compiler, styling and storage migrations are separate decisions, not automatic checklist steps.
- Ask before destructive cleanup, dependency/cache deletion, native regeneration or cloud actions. Report stale guidance to the user/maintainers instead of running upstream feedback commands or sending private data externally.
- Use the documented development build, not the upstream Expo Go-first workflow. Keep Unistyles, theme tokens, shared UI primitives, icons and LegendList; adding skills does not authorize replacing controls, lists, storage or navigation.
- Use `expo-ui` for `@expo/ui` component APIs, `expo-native-ui` for surrounding layout/effects, `expo-router` for navigation, and `animate-expo` for custom motion/gestures. Upstream references to the uninstalled `expo-animation` skill do not require installing it. Prefer existing/native controls before custom sheet recipes.
- Verify gesture recipes against the installed Gesture Handler version; v2 builder examples are not v3 API contracts. Reuse existing providers, respect reduced motion and report performance as unverified until exercised on an appropriate device/release build.

For Callstack device-automation skills, `project-device-automation` replaces upstream
`agent-device@latest` install steps with the mise-pinned CLI and adds this app's
identifiers and evidence rules. Reference examples remain advisory and can mention
libraries or sibling skills that are not installed.

For the Argent skills:

- Check that Argent's profiler/debugger tools are available and connected before following runtime steps. Installing skills does not install Argent, configure MCP, or validate profiler compatibility. Report unavailable measurements rather than inventing results; physical iPhone React profiling is unsupported by the pinned skill.
- Keep Biome and existing project checks; use upstream ESLint rules as review prompts rather than installing plugins or creating another lint configuration. Preserve Unistyles, LegendList and React Compiler; verify version-sensitive fix recipes against installed APIs before applying them.
- Follow the project device-automation workflow for reproducible interactions. References to uninstalled Argent native-profiler, device-interaction and E2E skills are optional dependencies, not authorization to install more skills or replace Maestro.
- Keep work within the requested performance scope. Delegate only when authorized by the user or applicable agent instructions; upstream per-file/per-checklist subagent sweeps do not grant that authorization. Require measured before/after evidence for performance claims, and keep profiling artifacts local and free of secrets.

For `react-native-best-practices`:

- Use it for performance references; use Argent for available Argent-specific profiling workflows and the Expo skills for Expo implementation. Verify profiling commands against the mise-pinned agent-device CLI before use; installing guidance does not add tool capabilities.
- Preserve LegendList, Unistyles, Legend State, React Compiler and intentional public `index.ts` APIs. Apply optimization recipes only to measured bottlenecks; generic FlashList, Jotai/Zustand or direct-import examples do not authorize migrations or breaking module boundaries.
- Keep Biome and use Bun/project scripts. Verify bundle, Metro, native and startup recipes against the installed Expo/RN versions; prefer existing instrumentation over adding dependencies just to follow an example. Require before/after evidence for performance claims.

For `systematic-debugging`:

- Use the project's Jest/RNTL helpers and verification commands for reproductions and regression tests. Upstream Superpowers test-driven-development and verification skill references do not require installing the collection.
- Treat `condition-based-waiting-example.ts` as reference only; its Lace imports are not project APIs. In RNTL, prefer existing `findBy`/`waitFor` helpers with assertions rather than copying the generic truthy-predicate polling examples.
- The bundled `find-polluter.sh` runs `npm test` and may execute tests with filesystem side effects. Do not run it unchanged here; inspect suspect tests and use scoped `bun run test -- --runTestsByPath <test-file>` commands, with approval before destructive cleanup. No bundled helper was executed during installation.
- Keep diagnostic output local and redact secrets and personal data. Add validation at relevant trust boundaries rather than duplicating checks at every layer solely because a reference says to; keep fixes scoped to the confirmed root cause.

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

### Check freshness, then deliberately upgrade

From the repository root:

```sh
bun run skills:check
# After reviewing an upstream commit, replace <full-commit-sha>:
bun run skills:upgrade <full-commit-sha> expo-router expo-data-fetching
```

`skills:check` reads `skills-lock.json` and uses read-only `git ls-remote`
requests to compare each recorded commit (or resolved tag) with its source's
default-branch HEAD. It prints revision differences and comparison links without
changing pins, installed skills or the lockfile. A difference is a review signal,
not proof of ancestry or changed skill content; unrelated repository commits can
trigger it. It does not discover newer release tags or validate installed hashes.
Exit status is 0 after successful checks, even with differences, and nonzero for
lookup/lockfile errors. Git and network access are required.

`skills:upgrade` requires a full 40-character lowercase commit SHA and one or more
existing locked skill names, all from the same source. Review the target before
running it: the command delegates installation to the pinned skills CLI, disables
telemetry and limits agent output to `.agents/skills/`. It replaces selected
folders and updates their lock entries; it is not a dry run or an atomic operation.
Inspect partial diffs if installation fails. It does not install new skill names.

Review upstream instructions, references, bundled scripts, licenses and project
compatibility before adoption. Afterwards, update provenance links and external
license notices here as needed, check repository overrides and sibling links,
then run the repository checks and review the diff. Keep managed folders
unmodified. The source-specific notes below describe additional review concerns.
For agent-device, retain the coordinated release/tag workflow below so skills
match the mise-pinned CLI rather than upgrading individual device skills to HEAD.

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

### Expo skills

Select and review an explicit upstream commit, then reinstall just these skills:

```sh
DISABLE_TELEMETRY=1 bunx skills@1.7.4 add 'expo/skills#<commit>' \
  -s expo-router -s expo-data-fetching -s expo-upgrade \
  -s expo-ui -s expo-native-ui -a universal -y
```

Re-running `add` replaces the existing folders; a separate delete is unnecessary.
Review the skill and reference diffs for relevance, licensing, scripts, telemetry
and external/destructive actions. Keep overrides above rather than editing the
installed files, verify the external license notice, and update the revision link
here. Check directory/frontmatter names, references and client discovery, then run
the repository checks and review the diff through a normal PR.

### Animation skill

Review an explicit upstream commit and reinstall only `animate-expo`:

```sh
DISABLE_TELEMETRY=1 bunx skills@1.7.4 add 'emilkowalski/skills#<commit>' \
  -s animate-expo -a universal -y
```

Review both `SKILL.md` and `RECIPES.md`, preserve the external license notice,
and update the revision link above. Keep repository overrides outside the skill.

### Argent performance skills

Review an explicit upstream commit and reinstall only these two skills:

```sh
DISABLE_TELEMETRY=1 bunx skills@1.7.4 add 'software-mansion/argent#<commit>' \
  -s argent-react-native-profiler -s argent-react-native-optimization -a universal -y
```

Review both skill folders and references, preserve the external Apache-2.0
license, and update the revision link above. Keep repository overrides outside
the managed folders. Check sibling-skill references and actual tool availability
before using the runtime workflows; they are not installed by this command.

### Performance references and systematic debugging

Review explicit upstream commits, then reinstall only the requested skills:

```sh
DISABLE_TELEMETRY=1 bunx skills@1.7.4 add 'callstackincubator/agent-skills#<commit>' \
  -s react-native-best-practices -a universal -y
DISABLE_TELEMETRY=1 bunx skills@1.7.4 add 'obra/superpowers#<commit>' \
  -s systematic-debugging -a universal -y
```

Review references, bundled code and evaluation documents as well as `SKILL.md`;
check license notices and update the revision links above. Keep overrides outside
managed folders. Biome excludes the vendored debugging TypeScript example so it
stays unmodified; re-evaluate the exclusion when upstream changes that resource.
Do not execute upstream evaluation prompts or helpers as installation steps.

### React Native Testing Library skill

Review an explicit upstream commit, then reinstall only this skill:

```sh
DISABLE_TELEMETRY=1 bunx skills@1.7.4 add 'callstack/react-native-testing-library#<commit>' \
  -s react-native-testing -a universal -y
```

Review the version-specific API references and anti-patterns, preserve the
external MIT notice, and update the revision link above. Keep project overrides
in `project-native-testing`; verify its sibling link still resolves. Adding or
updating the skill does not authorize a testing-library migration.

### Checking and restoring CLI-managed skills

```sh
DISABLE_TELEMETRY=1 bunx skills@1.7.4 update -p -y
DISABLE_TELEMETRY=1 bunx skills@1.7.4 experimental_install
```

`update -p -y` checks all CLI-managed skills at their recorded refs; it does not
advance pinned commits or tags. Use `skills:check` for the separate upstream
revision comparison and `skills:upgrade` for reviewed commit adoption (or the
coordinated agent-device tag workflow above). The pinned CLI itself has no
separate `check` command. `experimental_install` restores missing skills from
`skills-lock.json`.

Repository-authored `project-native-testing` and `project-device-automation` are
maintained locally and are intentionally absent from the CLI lockfile.

Prefer a small task-focused inventory. Add scripts only when deterministic
execution earns its complexity. Use the skills CLI only for unmodified upstream
skills; do not add another installation/update system or vendor whole
collections by default.
