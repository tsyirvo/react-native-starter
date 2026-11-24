# Native config in this repo

Repo rule: it extends [native config and releases](mobile-native.md) with the build quirks of this repo. The [release guide](../guides/releasing.md) holds the commands.

## Commands and builds

- Run Expo and EAS as `bun expo …` and `bun eas …`. These scripts run the CLI with `doppler run`, which supplies the values that `app.config.ts` checks.
- The `ios` and `android` scripts use the EAS build cache provider. They can download a matching build, and they upload each new local build to EAS. An upload changes an outside service: ask first.
- `plugins/withDevClientBuildMarker.js` adds assets/EXDevMenuApp.android.js to debug Android builds. EAS recognizes an uploaded APK as a development build only with that file, and SDK 58 no longer ships it. Keep the plugin until eas-cli stops checking for the file.
- Change a native setting in `app.config.ts`, with `expo-build-properties` or with a plugin in `plugins/`, such as the Gradle JVM heap.

## Dependencies

- When React changes, move `test-renderer` to the matching minor line: React 19.3 uses `test-renderer` 1.3. Use the version that `jest-expo` installs. Check the peer range of React Native Testing Library before you change either package.

## Icon font

- Icons are single-color SVGs in `src/shared/icons/svgs/`. The file name is the icon name. `.nanoicons.json` compiles them into a font.
- Run `bun run generate:icons` and commit `src/shared/icons/font/`. An icon change needs a new native build: an OTA update renders a changed icon blank.

## Releases

- GitHub Actions in `.github/workflows/` run the releases. Do not replace them with EAS workflows because a skill suggests one.
- OTA updates use the `appVersion` runtime policy.
- Local lint and tests do not authorize a production publication.

## Enforcement

- Review only.
