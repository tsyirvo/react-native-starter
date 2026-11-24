# Agent tooling

Repo rule: it extends [agent docs](agent-docs.md) with the app facts, skills, MCP servers and hooks of this repo.

## App

| Build       | iOS bundle id and Android package   |
| ----------- | ----------------------------------- |
| Development | `com.tsyirvo.rnstarter.development` |
| Staging     | `com.tsyirvo.rnstarter.staging`     |
| Production  | `com.tsyirvo.rnstarter`             |

- Build and install the development build: `bun run ios "<simulator name>"` or `bun run android "<emulator name>"`. Always pass the device name. These scripts upload a local build to the EAS cache: ask first. Without approval, build on a simulator with `APP_ENV=development doppler run -- xcodebuild -workspace ios/Dev.xcworkspace -scheme Dev -configuration Debug -destination id=<udid> -derivedDataPath <dir> build`, then `xcrun simctl install <udid> <dir>/Build/Products/Debug-iphonesimulator/Dev.app`. Without `doppler run`, the build fails at the "Generate app.config" phase. Rebuild only after a native, dependency, config plugin or icon font change.
- Metro: `bun run dev`. It needs Doppler access and serves the dev client on port 8081. Pass `--port <port>` after `--` when 8081 is busy.
- First launch: open `com.tsyirvo.rnstarter.development://expo-development-client/?url=http%3A%2F%2Flocalhost%3A<port>`. The first link on a simulator shows the iOS prompt "Open in Dev?": press Open. A LogBox overlay about RevenueCat offerings can cover the screen: dismiss it with `react-native dismiss-overlay`. When the dev launcher stays, Metro is not connected: fix Metro.
- A check that needs no other process: open the app with `--relaunch`, then `wait text "React Native Template"`. For a tap check, fill `id="LoginFormPasswordInput"` with any value and press `id="LoginFormSubmitButton"`. Then `wait text "Features"` passes on the tab bar.

## Skills

- Repo skills live in `.agents/skills/`, and `.claude/skills` links to that folder.
- `project-device-automation` runs the app on a simulator, with `agent-device`, `ios-simulator`, `android-emulator` and `dogfood`.

## MCP servers

Servers, permissions and client setup are in [MCP setup and permissions](../agents/mcp/README.md).

`.pi/mcp.json` is made from `.mcp.json`, with the `agent-device` server off: Pi drives the app through the CLI. After each change to `.mcp.json`, run `jq '.mcpServers["agent-device"].enabled = false' .mcp.json > .pi/mcp.json`.

The local `agent-device` server runs the version that `mise.toml` pins, so no update arrives unchosen. Move the pin in `mise.toml` in the same change as the skills.

## Hooks

After each `Edit`, `Write` or `MultiEdit`, Claude Code runs `scripts/agent-hooks/format-edited-file.ts`. It runs `biome check --write` on the file, and returns the diagnostics that remain. It cannot undo the edit.

## Enforcement

- `.claude/settings.json` runs the hook on each edit.
- The rest is review only.
