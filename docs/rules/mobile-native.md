# Mobile native config, dependencies and releases

Shared rule: it comes from a shared source, so do not edit it in this repo. Repo rules live in the files that `docs/rules/README.md` lists. The repo's release guide holds the commands.

## Dependencies

- Read `package.json`, `bun.lock` and `mise.toml` for versions. Docs never copy a version.
- Install an Expo-managed package with `bun expo install <package>`, so the installed SDK picks the compatible version.
- Add a dependency only when no package in the manifest does the job.
- `bunfig.toml` sets `minimumReleaseAge`. Do not lower it. When a newer version is required, ask, then add only that exact `name@version` to `minimumReleaseAgeExcludes`.
- An SDK upgrade is its own task. Load the `expo-upgrade` skill for it. Do not upgrade as a side effect of another change.

## Native config

- The app runs in a development build, not Expo Go. A native change, a native dependency or a config plugin change needs a new build.
- The native `ios/` and `android/` folders are generated. Change native settings in `app.config.ts`, `expo-build-properties` or a local config plugin, never in the generated folders.
- `expo run` prebuilds only when the native folder is missing. After an `app.config.ts` or plugin change, delete the generated folder of that platform first.
- Do not run `prebuild --clean`, delete caches or remove native folders without approval and a recovery plan.
- Regenerate a generated file with its script. Never edit it by hand.

## Environments and secrets

- Doppler holds every secret. Run a command that needs env through the repo's `doppler run` scripts.
- Do not print an injected secret, and do not send one to an MCP server or a docs service.

## Release gates

- release-please owns the version in `package.json`, `CHANGELOG.md`, the tags and the GitHub releases. Do not edit them by hand or create a tag.
- A pull request title becomes the squash commit and drives the version bump. Pick the type for its effect on users. Use `feat!` or `BREAKING CHANGE` only for a breaking change, and a `Release-As` footer to force a version.
- A store rejection gets a new build of the same version. Never bump the version to resubmit.
- Merge the release pull request only after both stores approve the build. While a version is in review, merge nothing into the default branch without approval.
- An OTA update reaches only binaries of the same version. Publish it from the release tag, and only for JavaScript and asset changes.
- Store approval is a human check. A green build does not prove it.

## Ask first

These actions need explicit approval each time: a cloud or paid build, a build cache upload, a store submission, a release pull request merge, a tag, an OTA update, a workflow dispatch, and a production backend deploy.

## Enforcement

- The `PR title` workflow checks that each pull request title is a conventional commit.
- The rest is review only.
