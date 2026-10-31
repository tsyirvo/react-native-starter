# Native configuration and releases

## Dependency and native changes

- Read `package.json`, `bun.lock`, `mise.toml`, `app.config.ts`, `eas.json`, Babel and Metro configuration before changing their behavior.
- Use Bun. For Expo-managed packages, use `bunx expo install <package>` so the installed SDK determines compatible versions.
- `bunfig.toml` blocks package versions younger than 3 days. Do not lower `minimumReleaseAge`; if a newer version is required, explain why and add only that exact `name@version` to `minimumReleaseAgeExcludes` with approval.
- Load `expo-upgrade` for an explicitly requested SDK upgrade; pick the target deliberately instead of blindly installing latest.
- Preserve existing custom Babel/Metro configuration and required peers.
- When React changes, move `test-renderer` to the matching minor line (React 19.3 uses `test-renderer` 1.3) and to the version `jest-expo` installs. Check the React Native Testing Library peer range before you change either package.
- Native integrations require development builds, not assumptions based on Expo Go.
- Respect repository ignore rules for generated native projects and build outputs. Do not commit them as an incidental change.
- Do not run `prebuild --clean`, delete caches/dependencies, or remove native projects without explicit approval and a recovery plan.

## Generated assets and environments

Icons are single-color SVGs in `src/shared/icons/svgs/` (file name = icon name),
compiled into a font via `.nanoicons.json`. Run `bun run generate:icons` and
commit `src/shared/icons/font/`; never edit it by hand. Icon changes need a new
native build: OTA updates render changed icons blank.

Inspect the existing environment configuration and scripts; use the established
Doppler workflow rather than inventing parallel environment handling. Keep
credentials local. Do not print injected secrets or send them to
MCP/documentation services.

## Release gates

The [release guide](../../guides/releasing.md) is the human-facing source of
truth for releases, store submissions and OTA updates. GitHub Actions live in
`.github/workflows/`; do not replace them with EAS workflows just because a
skill suggests one.

- Release Please owns the version in `package.json`, `CHANGELOG.md`, tags and
  GitHub releases. Do not edit them by hand or create tags manually.
- PR titles become squash commits and drive the version bump. Pick the
  conventional type by user-facing impact: `feat!`/`BREAKING CHANGE` only for
  breaking changes, a `Release-As` footer to force a version.
- A store rejection is fixed with a new build of the same version. Never bump
  the version to resubmit.
- The release PR is merged only after both stores approve the build. Never
  merge it, or merge other PRs into `main` while a version is in review,
  without explicit approval.
- OTA updates only reach binaries with the same version (`appVersion` runtime
  policy). Publish them from the release tag, only for JavaScript/asset
  changes; native changes need a store build.
- Cloud builds, paid actions, submissions, release PR merges, tags, OTA updates
  and workflow triggers require explicit approval.
- Store approval is a human check. Never infer it from a successful build.
- Local lint/tests do not authorize production publication.

Run quality checks and relevant tests after dependency/configuration changes;
report native verification separately.
