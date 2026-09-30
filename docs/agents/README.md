# Agent tooling

Use any coding agent. The shared instructions use
[AGENTS.md](https://agents.md/), and skills use the
[Agent Skills specification](https://agentskills.io/specification). MCP is a
protocol, not a universal configuration filename. Contributors configure their
chosen client's discovery and permissions; the examples below are optional,
not an exclusive list of agents.

## Layout and sources of truth

| Path                 | Responsibility                                                                 |
| -------------------- | ------------------------------------------------------------------------------ |
| `AGENTS.md`          | Essential commands, architectural invariants, safety and task-to-guide routing |
| `src/AGENTS.md`      | Source conventions; explicitly read it before source work                      |
| `CLAUDE.md`          | Claude compatibility import only; do not add a duplicate rule set              |
| `docs/agents/rules/` | Task-specific Markdown guides, loaded explicitly through the routing table     |
| `.agents/skills/`    | Canonical versioned skills and references                                      |
| `.claude/skills`     | Relative symlink to `../.agents/skills`                                        |
| `.mcp.json`          | Context7/Expo definitions; adapt to your client's MCP format if needed         |

There is no cross-client `.rules/` format. These guides have no client-specific
frontmatter and are not all injected at startup. Keep root instructions concise;
load the guide and skill relevant to the task.

## Configure your chosen agent

1. **Instructions:** check whether it loads root `AGENTS.md`. If not, configure its context paths or add a thin client-specific reference/import. Do not duplicate project rules.
2. **Scope:** verify nested instructions are loaded, or explicitly read `src/AGENTS.md` for source work. Read task-specific guides through the root routing table.
3. **Skills:** check discovery of `.agents/skills/`. Configure a skill path or local bridge if another location is required, and verify the inventory is available without duplicate-name collisions. Agents without skill support can read the relevant `SKILL.md` and references explicitly.
4. **MCP:** if desired, use the endpoints in `.mcp.json` with your client's configuration format. Check HTTP transport, environment-variable expansion, OAuth and any required adapter. Clients without MCP can use official documentation instead.
5. **Permissions:** review trust and tool-approval settings. Keep credentials and personal configuration out of version control; add local ignore entries if your agent stores them in the checkout.
6. **Verification:** inspect the instructions, skills and servers actually loaded in your agent. Do not assume that matching filenames mean the client discovered them.

Keep shared content agent-neutral. Add client-specific adapters only where
needed, and consult the chosen client's current documentation for its discovery,
configuration and invocation behavior.

## Example: Pi

1. Install Pi separately from application dependencies.
2. For shared MCP support, install the reviewed adapter version once:

   ```sh
   pi install npm:pi-mcp-adapter@3.3.0
   ```

3. Start `pi` from the repository root and review/accept project-resource and MCP-server trust prompts.
4. Pi loads the root `AGENTS.md` and discovers `.agents/skills/`; invoke a skill with `/skill:project-native-testing` (or another inventory name).
5. Run `/reload` after instruction/skill changes. The adapter reads root `.mcp.json`; use `/mcp-adapter` for status and `/mcp-auth expo` for OAuth.

Use current Pi releases supporting `.agents/skills/`. Pi collects context files
from the working directory and its ancestors, so launching at the root does
not automatically load `src/AGENTS.md`; the root instruction explicitly tells
the agent to read it for source tasks.

Recent Pi also has native MCP support; this example uses `pi-mcp-adapter`
to consume `.mcp.json` directly. Native MCP is an alternative requiring its
own configuration. Avoid duplicate server registrations and do not confuse
the native `pi mcp` command with the adapter's commands. Start from the root
because adapter ancestor-config discovery is off by default.

Configure tool approvals in your personal adapter settings. Keep prompts
enabled and prefer one-time grants; review any per-server overrides.

## Example: Claude Code

1. Start `claude` from the root and review workspace/MCP trust prompts.
2. Root `CLAUDE.md` imports `AGENTS.md` with Claude's `@...` syntax. The import is the only Claude-specific instruction; Pi prefers `AGENTS.md`.
3. The committed `.claude/skills` symlink exposes the canonical skills. Use `/project-native-testing`, `/expo-router`, `/expo-data-fetching` or `/expo-upgrade`.
4. Use `/context` to inspect instruction sources and `/mcp` to inspect approved servers/authenticate Expo. Restart after MCP configuration changes.

New Claude versions can read `AGENTS.md` directly, but the import maintains
compatibility when an existing `CLAUDE.md` would suppress direct discovery.
Always follow the root instruction to read `src/AGENTS.md`; the shim is not
a portable recursive-import mechanism.

### Windows or a checkout without symlinks

The root instruction import is a regular file and works without symlinks.
For skill discovery, prefer Git symlink support (Windows Developer Mode plus
`core.symlinks=true`) before cloning.

If that is unavailable, replace the checkout's one-line `.claude/skills`
placeholder with a local directory copy:

```powershell
Remove-Item .claude/skills
Copy-Item -Recurse .agents/skills .claude/skills
```

Refresh that copy after skill updates. It is not a second source of truth:
copied contents are ignored, and the replaced tracked symlink must not be
committed. Restore it before committing, or contribute from a symlink-capable
checkout. Review `git status` carefully.

## Verify discovery

After reviewing project trust, check your chosen client interactively:

- Root instructions and the four inventory skills are available. For example, Pi exposes `/skill:<name>` and Claude exposes `/<name>`.
- If MCP is configured, `context7` and `expo` are registered. For example, Pi's `/mcp-adapter` and Claude's `/mcp` show server status.
- Inspect loaded context using your client's tools; Claude's `/context` is one example.
- On a source task, the agent reads `src/AGENTS.md` plus only relevant guides.
- Resolve global skills with the same names rather than assuming the repository version wins. Pi reports collisions; do not duplicate this inventory through a global plugin.
- Check Expo authentication separately; a registered server is not proof of a working OAuth session.

No setup step requires a model to modify code, publish an update or start a paid
build. Skill execution and remote tooling remain opt-in to the actual task.

## Personal configuration and maintenance

The included Claude skill bridge is an optional adapter, not a requirement
for other agents. Its personal `settings.local.json`, copied skill contents
and root `CLAUDE.local.md` are ignored. Keep your chosen agent's sessions,
OAuth state and personal overrides out of version control; configure local
ignore rules as needed. Do not add API keys to shared configs or weaken
trust/approval settings to avoid a setup prompt.

See [skill provenance and updates](../../.agents/README.md) and
[MCP setup and permissions](mcp/README.md). Run the root verification commands
after changes; inspect links, frontmatter, resources and client discovery as
well, because Biome does not validate Markdown instructions.
