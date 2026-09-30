# Native configuration and releases

## Dependency and native changes

- Read `package.json`, `bun.lock`, `mise.toml`, `app.config.ts`, `eas.json`, Babel and Metro configuration before changing their behavior.
- Use Bun. For Expo-managed packages, use `bunx expo install <package>` so the installed SDK determines compatible versions.
- Load `expo-upgrade` for an explicitly requested SDK upgrade; pick the target deliberately instead of blindly installing latest.
- Preserve existing custom Babel/Metro configuration and required peers.
- Native integrations require development builds, not assumptions based on Expo Go.
- Respect repository ignore rules for generated native projects and build outputs. Do not commit them as an incidental change.
- Do not run `prebuild --clean`, delete caches/dependencies, or remove native projects without explicit approval and a recovery plan.

## Generated assets and environments

Handwritten icons must not be mixed into `src/shared/icons/components/`.
Edit SVG sources under `src/shared/icons/svgs/` and run
`bun run generate:icons` when needed; review the generated diff.

Inspect the existing environment configuration and scripts; use the established
Doppler workflow rather than inventing parallel environment handling. Keep
credentials local. Do not print injected secrets or send them to
MCP/documentation services.

## Release gates

The [README release workflow](../../../README.md#tagging-and-releasing) is the
human-facing source of truth. GitHub Actions live in `.github/workflows/`;
do not replace them with EAS workflows just because a skill suggests one.

- Follow existing conventional commits and the documented branch/release process.
- Inspect release scripts before running them; check their side effects and review generated changes rather than assuming they only update files.
- Cloud builds, paid actions, submissions, release tags, OTA updates and workflow triggers require explicit approval.
- Store approval is a human check. Never infer it from a successful build.
- Local lint/tests do not authorize production publication.

Run quality checks and relevant tests after dependency/configuration changes;
report native verification separately.
