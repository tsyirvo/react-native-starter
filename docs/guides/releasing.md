# Releases, store submissions and OTA updates

This guide covers how a version of the app goes from `develop` to the stores,
and how to ship JavaScript-only fixes over the air afterwards.

## Concepts

- **Version** (`2.3.0`): the user-facing version, read from `package.json`.
  It names a release, not a binary. It is the same on iOS and Android.
- **Build number** (iOS `CFBundleVersion`, Android `versionCode`): must
  increase with every upload. EAS manages it remotely
  (`appVersionSource: remote` and `autoIncrement` in `eas.json`), so you never
  edit it.
- **Runtime version**: `app.config.ts` uses the `appVersion` policy, so an OTA
  update only reaches binaries with exactly the same version.

A store rejection is fixed by uploading a **new build of the same version**,
never by bumping the version. Both stores accept a new build for a version that
is not yet released.

## How versions and the changelog are produced

[Release Please](https://github.com/googleapis/release-please) reads the
conventional commits on `develop` since the last release tag. The **Release**
workflow keeps one open release PR (`chore(develop): release x.y.z`) up to date on every
push to `develop`. It contains the `package.json` bump and the new
`CHANGELOG.md` entry.

PRs are squash-merged, and the PR title becomes the commit message. The
**PR title** workflow checks that titles follow the conventional commit format.
The `commit-msg` hook only checks local commits.

| Commit                                      | Next version |
| ------------------------------------------- | ------------ |
| `fix:`, `perf:`, `chore:`, `refactor:`, ... | Patch        |
| `feat:`                                     | Minor        |
| `feat!:` or a `BREAKING CHANGE:` footer     | Major        |
| A `Release-As: 3.0.0` footer in the commit  | That version |

Use `Release-As` when the commit types do not express the intent, for example a
major Expo SDK upgrade. Add the footer to the commit description in GitHub's
squash-merge dialog. `CHANGELOG.md` groups entries by commit type: Features,
Bug Fixes, Performance, Reverts and Other Changes.

Do not edit the version in `package.json` or `CHANGELOG.md` by hand. Release
Please owns both.

### One-time setup

1. Create a fine-grained personal access token for this repository with
   read/write access to **Contents**, **Pull requests** and **Issues** (labels).
2. Add it as the `RELEASE_PLEASE_TOKEN` repository secret.
3. In the repository settings, allow squash merging and set the default squash
   commit message to start with the PR title.

A PAT is required because GitHub does not run workflows on PRs opened with
`GITHUB_TOKEN`, so the release PR would get no CI. Only the **PR title** check
runs on it: **Quality** skips `release-please--*` branches and CodeRabbit skips
`chore(develop): release` titles, since the PR only bumps the version and
changelog.

## Releasing a store version

The release PR is merged **last**, once both stores have approved the build.

1. **Freeze `develop`.** Do not merge other PRs while a version is in review.
   Release Please rebuilds the release PR from all of `develop`, so anything
   merged during review would appear in the changelog without being in the
   binary under review.
2. **Build the release PR's head commit.** Check out the release PR branch
   (`gh pr checkout <number>`) so `package.json` already has the new version,
   then build both platforms for production (see
   [Store submissions](#store-submissions)).
3. **Submit both builds** and request review. Before submitting, enable
   **Manually release this version** in App Store Connect and **Managed
   publishing** in the Play Console, so an approved build waits for you instead
   of going live on approval.
4. **If a store rejects the build:**
   - Metadata, screenshots or reviewer notes: fix them in App Store Connect or
     the Play Console. No new build is needed.
   - Code: merge the fix to `develop` as a normal PR. Release Please updates
     the same release PR, and the version normally stays the same. Rebuild from
     the new head commit and resubmit it. The build number increases, and the
     version does not change.
   - If only one store rejected the build, rebuild and resubmit only that
     platform, unless the fix also applies to the other one.
5. **When both stores approve, merge the release PR.** Release Please then
   bumps `package.json`, writes `CHANGELOG.md`, tags `vx.y.z` and creates the
   GitHub release from the approved code.
6. **Publish in the stores.** Manual release and Managed publishing (enabled in
   step 3) keep both approved builds waiting. Publish them together, so both
   platforms go live at the same time.

After the merge, `develop` is open again.

## Store submissions

Production builds run locally, with the Doppler `prd` config:

```sh
bun run build:prod:ios       # writes build-<timestamp>.ipa in the repo root
bun run build:prod:android   # writes build-<timestamp>.aab in the repo root
```

Submit the generated files with the `production` submit profile:

```sh
doppler run --config prd -- env APP_ENV=production EXPO_NO_DOTENV=1 \
  eas submit --platform ios --profile production --path build-<timestamp>.ipa
doppler run --config prd -- env APP_ENV=production EXPO_NO_DOTENV=1 \
  eas submit --platform android --profile production --path build-<timestamp>.aab
```

Doppler is needed because EAS CLI evaluates `app.config.ts`, which validates
the environment. The build files are gitignored; delete them after submission.

The `production` submit profile in `eas.json` sends Android builds to the
Play Console **production** track (EAS defaults to `internal`). With Managed
publishing on, the build goes to review and waits there until you publish it.
The profile has no store credentials, so EAS CLI asks for them interactively.
Add `ascAppId` and `serviceAccountKeyPath` to it to submit non-interactively. Google requires the **first** Android upload to
be made manually in the Play Console; EAS Submit works for the later ones.

To use EAS cloud builders instead, sync the `prd` config to the EAS
`production` environment first (see the README), then build and submit in one
step:

```sh
doppler run --config prd -- env APP_ENV=production EXPO_NO_DOTENV=1 \
  eas build --profile production --platform all --auto-submit
```

Cloud builds and submissions use paid EAS resources.

## OTA updates

OTA updates are only enabled for production builds (`updates.enabled` is tied
to `APP_ENV=production`). They ship JavaScript and asset changes to an existing
store version, without store review. They are separate from releases: they do
not change the version, create a tag or go through the release PR.

Use an OTA update only when **all** of these are true:

- The change is JavaScript or assets only. Native changes, new or updated
  native dependencies, config plugin changes and icon font changes need a new
  store build.
- The target binary is the current store version, for example `2.3.0`.
- The change does not depend on native code that is in `develop` but not in
  that binary.

Publish from the release tag, not from `develop`, because `develop` can contain
native changes that the store binary does not have:

An update replaces the whole JavaScript bundle, so each hotfix must contain all
earlier ones. Branch the first hotfix from the tag. Branch each later hotfix
from the previous hotfix's last commit (for example `hotfix/<previous-name>`):

```sh
git switch -c hotfix/<name> v2.3.0   # later hotfixes: hotfix/<previous-name>
bun install --frozen-lockfile        # match the released dependencies
# apply and commit the fix
doppler run --config prd -- env APP_ENV=production EXPO_NO_DOTENV=1 \
  eas update --channel production --environment production \
  --message "fix: <description>"
```

The update's runtime version comes from `package.json` (`2.3.0` on the tag), so
it only reaches `2.3.0` binaries. Add `--rollout-percentage <1-100>` to roll it
out gradually.

Then open a PR from the hotfix branch into `develop`, so the fix is also in the
next store version. Its commit appears in the next release's changelog.

Publishing an update affects every user on that version immediately. Check it
on a production build before publishing, and roll it out gradually when
possible.
