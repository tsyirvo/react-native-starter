---
name: project-device-automation
description: Drive this starter's development app on an iOS Simulator or Android Emulator with agent-device (MCP tools or CLI) to verify a change, reproduce a bug, follow a manual QA script or collect runtime evidence. Use for live in-app verification; not for Jest tests or for authoring Maestro E2E flows.
compatibility: Requires the agent-device version pinned in mise.toml, a development build installed on a booted simulator/emulator and, for JS changes, a running Metro server.
metadata:
  author: react-native-starter
---

# Project device automation

1. Read the root `AGENTS.md` and `docs/agents/rules/testing.md` (paths relative to the repository root). Read `src/AGENTS.md` too if you will change source code.
2. Use the `agent-device` MCP tools when the server is connected. Otherwise run the CLI from the repository root as `mise exec npm:agent-device -- agent-device <command>`. A plain `agent-device` can resolve to a different global install. Tools mirror CLI commands, and CLI flags become camelCase properties (`--settle` → `settle: true`). If neither is available, stop and ask the user to run `mise install`. Never install, upgrade or run `npx -y agent-device@latest`.
3. Check the prerequisites below. Ask before doing anything slow or stateful that the user did not request: native builds, starting Metro, booting, erasing or shutting down devices, and installing or uninstalling the app.
4. Open the app straight away, then work through the loop in [Driving the app](#driving-the-app). Do not probe first with `devices`, `apps`, `snapshot` or `screenshot`.
5. Close the session, then report which platform and device you used and what you verified. Name any evidence files and list the steps you could not run.

## Prerequisites

- **App identity:** the development build is `com.tsyirvo.rnstarter.development`, both as the iOS bundle id and as the Android package. Staging builds add `.staging`, and production builds have no suffix (see `env.js`). Do not invent other ids: if the app is missing, run `apps` and ask the user.
- **Native build:** build it with `bun run build:dev:ios` or `bun run build:dev:android`. These are local EAS builds through Doppler. They write an artifact (an iOS simulator `.tar.gz` or an Android `.apk`) but do not install it. Before opening the app, install that artifact on the selected simulator or emulator with `mise exec npm:agent-device -- agent-device install com.tsyirvo.rnstarter.development <artifact-path> --platform <ios|android>` (or `reinstall` to replace an existing build). Rebuild only after native, dependency, config-plugin or icon-font changes. JS-only changes do not need a rebuild.
- **Metro:** start it with `bun run start:dev`. It needs Doppler access and serves the dev client on port 8081 by default. A sandboxed `curl localhost:8081/status` that fails does not prove Metro is down; check from the host that owns the server. If the Android app cannot reach the dev server, follow `mise exec npm:agent-device -- agent-device help react-native` instead of guessing.
- **Dev client:** the build hides the dev menu and tools button at launch, so the first screen is the app itself. If the dev launcher appears, Metro is not connected: fix Metro rather than tapping through the launcher.

## Driving the app

```sh
mise exec npm:agent-device -- agent-device open com.tsyirvo.rnstarter.development --platform ios --foreground --relaunch
```

- Use `--platform android` for the emulator. Pass `--relaunch` whenever the flow must start from a fresh state.
- Act with `press`/`fill`/`scroll ... --settle`, and continue from the settled diff. To reach off-screen targets, use `scroll <direction> --until <selector>`.
- Verify each expectation with `wait text`, `wait <selector>`, `wait absent`, `is`, `get` or `find`. A bare screenshot does not count as verification.
- Prefer fresh `@refs`, then `id="..."` selectors. Screens expose React Native `testID`s (for example `LoginForm`, `LoginFormSubmitButton`, `ProfileIcon`). Reuse the ids already in `e2e/` and in the components rather than coordinates.
- Authenticated screens need a login first. `e2e/authenticateUser.yaml` shows the current flow; use throwaway values, never real credentials or Doppler secrets.
- After a JS edit, run `metro reload` (not `reload`). After a native change, rebuild, then `open --relaunch`.
- For a LogBox or RedBox overlay, run `react-native dismiss-overlay` and mention the overlay in your report. Do not tap the warning text.
- Keep mutating commands against one session serial, and always `close`.

For specialized work, read the installed help: `mise exec npm:agent-device -- agent-device help react-native`, `manual-qa`, `debugging`, `react-devtools`, `cdp` or `validate`. With MCP, use the `help` tool. Load `ios-simulator` or `android-emulator` for platform-specific guidance, `dogfood` for open-ended exploratory QA, and `agent-device` for general CLI guidance.

## Upstream agent-device skills

`agent-device`, `ios-simulator`, `android-emulator` and `dogfood` are unmodified
Callstack skills, pinned in `skills-lock.json`. This skill overrides them for
this repository:

- When they say to install `agent-device@latest` or call a bare `agent-device`, use the mise-pinned CLI or MCP server instead (step 2).
- Use the app identifiers and prerequisites above instead of asking for or guessing an app id.
- Keep the evidence boundaries below. `dogfood` reports go to the user only; do not file issues or upload captures unless asked.

## Evidence and boundaries

- Capture screenshots, logs, traces, recordings and `.ad` replay scripts only when they add evidence. Write them to a temporary directory outside the checkout, and do not commit them unless asked.
- Captures can contain personal data or tokens from the running app. Do not upload them to external services.
- Maestro flows in `e2e/` remain the committed regression suite (`bun run test:e2e`). Turn an agent-device finding into a Maestro flow or a Jest test only when asked.
- A passing agent-device run verifies one device and one build. It does not prove the other platform, release builds or production SDK behavior.
