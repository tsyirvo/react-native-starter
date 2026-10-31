# Releasing

This guide shows how a version of the app goes from `develop` to the stores.
It also shows how to send JavaScript-only fixes as over-the-air (OTA) updates
after the release.

## Concepts

- **Version** (for example `2.3.0`): the version that users see. It comes from
  `package.json`. It identifies a release, not a binary. iOS and Android use
  the same version.
- **Build number** (iOS `CFBundleVersion`, Android `versionCode`): it must
  increase for each upload. EAS manages it remotely, through
  `appVersionSource: remote` and `autoIncrement` in `eas.json`. Do not edit it.
- **Runtime version**: `app.config.ts` uses the `appVersion` policy. An OTA
  update only goes to binaries that have exactly the same version.

If a store rejects a build, upload a **new build of the same version**. Do not
increase the version. Both stores accept a new build for a version that is not
released yet.

## How Release Please makes versions and the changelog

[Release Please](https://github.com/googleapis/release-please) reads the
conventional commits on `develop` since the last release tag. On each push to
`develop`, the **Release** workflow updates one open pull request, the
**release PR** (`chore(develop): release x.y.z`). The release PR contains the
`package.json` version change and the new `CHANGELOG.md` entry.

Pull requests are squash-merged, so the PR title becomes the commit message.
The **PR title** workflow checks that each title uses the conventional commit
format. The `commit-msg` hook checks only local commits.

| Commit                                      | Next version |
| ------------------------------------------- | ------------ |
| `fix:`, `perf:`, `chore:`, `refactor:`, ... | Patch        |
| `feat:`                                     | Minor        |
| `feat!:` or a `BREAKING CHANGE:` footer     | Major        |
| A `Release-As: 3.0.0` footer in the commit  | That version |

Use `Release-As` when the commit types do not give the right version, for
example for a major Expo SDK upgrade. Add the footer to the commit description
in the GitHub squash-merge dialog.

`CHANGELOG.md` groups the entries by commit type: Features, Bug Fixes,
Performance, Reverts and Other Changes.

Do not edit the version in `package.json` or the `CHANGELOG.md` file manually.
Release Please owns both.

### One-time setup

1. Create a fine-grained personal access token (PAT) for this repository. Give
   it read and write access to **Contents**, **Pull requests** and **Issues**
   (for labels).
2. Add the token as the `RELEASE_PLEASE_TOKEN` repository secret.
3. In the repository settings, permit squash merging. Set the default squash
   commit message to start with the PR title.

The workflow needs a PAT because GitHub does not run workflows on pull
requests that `GITHUB_TOKEN` opens. Without a PAT, CI does not run on the
release PR.

With the PAT, only the **PR title** check runs on the release PR. The release
PR changes only the version and the changelog, so other checks are not
necessary:

- **Quality** skips `release-please--*` branches.
- CodeRabbit skips pull requests with a `chore(develop): release` title.

## Release a store version

Merge the release PR **last**, after both stores approve the build.

1. **Freeze `develop`.** Do not merge other pull requests while the stores
   review a version. Release Please makes the release PR again from all of
   `develop`. If you merge a change during the review, the changelog shows it,
   but the binary in review does not contain it.
2. **Build the head commit of the release PR.** Check out the release PR branch
   with `gh pr checkout <number>`. Then `package.json` already has the new
   version. Build both platforms for production. Read
   [Submit to the stores](#submit-to-the-stores).
3. **Submit both builds** for review. Before you submit, enable these settings:

   - **Manually release this version** in App Store Connect.
   - **Managed publishing** in the Play Console.

   With these settings, an approved build waits for you. It does not go live
   when the store approves it.

4. **If a store rejects the build:**
   - For a problem in the metadata, screenshots or reviewer notes, fix it in
     App Store Connect or the Play Console. You do not need a new build.
   - For a problem in the code, merge the fix to `develop` in a normal pull
     request. Release Please updates the same release PR. Usually, the version
     does not change. Build again from the new head commit and submit the new
     build. The build number increases, but the version stays the same.
   - If only one store rejected the build, build and submit again only for that
     platform. If the fix also applies to the other platform, do both.
5. **When both stores approve, merge the release PR.** Release Please then:
   - changes the version in `package.json`,
   - writes `CHANGELOG.md`,
   - adds the `vx.y.z` tag,
   - creates the GitHub release from the approved code.
6. **Publish in the stores.** The settings from step 3 keep both approved
   builds on hold. Publish them together, so both platforms go live at the
   same time.

After the merge, you can merge pull requests into `develop` again.

## Submit to the stores

Production builds run on your computer, with the Doppler `prd` config:

```sh
bun run build:prod:ios       # writes build-<timestamp>.ipa in the repo root
bun run build:prod:android   # writes build-<timestamp>.aab in the repo root
```

Submit the files with the `production` submit profile:

```sh
doppler run --config prd -- env APP_ENV=production EXPO_NO_DOTENV=1 \
  eas submit --platform ios --profile production --path build-<timestamp>.ipa
doppler run --config prd -- env APP_ENV=production EXPO_NO_DOTENV=1 \
  eas submit --platform android --profile production --path build-<timestamp>.aab
```

These commands need Doppler, because EAS CLI reads `app.config.ts`, and
`app.config.ts` checks the environment values. Git ignores the build files.
Delete them after you submit them.

About the `production` submit profile in `eas.json`:

- It sends Android builds to the Play Console **production** track. The EAS
  default is `internal`. With Managed publishing on, the build goes to review
  and waits until you publish it.
- It has no store credentials, so EAS CLI asks for them. To submit without
  questions, add `ascAppId` and `serviceAccountKeyPath` to the profile.
- Google requires you to make the **first** Android upload manually in the
  Play Console. EAS Submit works for the subsequent uploads.

### Use EAS cloud builders

To build in the cloud, first push the `prd` config to the EAS `production`
environment. Read [Environments](environments.md#cloud-builds). Then build and
submit in one step:

```sh
doppler run --config prd -- env APP_ENV=production EXPO_NO_DOTENV=1 \
  eas build --profile production --platform all --auto-submit
```

Cloud builds and submissions use paid EAS resources.

## OTA updates

OTA updates are enabled only for production builds. `updates.enabled` depends
on `APP_ENV=production`. An OTA update sends JavaScript and asset changes to a
store version that users already have, with no store review.

OTA updates are not releases. They do not change the version, add a tag or go
through the release PR.

### When to use an OTA update

Use an OTA update only when **all** of these conditions are true:

- The change contains only JavaScript or assets. These changes need a new
  store build: native code, new or updated native dependencies, config plugins
  and the icon font.
- The target binary is the current store version, for example `2.3.0`.
- The change does not need native code that is in `develop` but not in that
  binary.

### Publish an OTA update

Start from the release tag, not from `develop`. `develop` can contain native
changes that the store binary does not have.

An update replaces the full JavaScript bundle. Thus, each hotfix must contain
all the earlier hotfixes for that version.

- Make the first hotfix branch from the tag.
- Make each subsequent hotfix branch from the last commit of the previous
  hotfix, for example `hotfix/<previous-name>`.

```sh
git switch -c hotfix/<name> v2.3.0   # subsequent hotfixes: hotfix/<previous-name>
bun install --frozen-lockfile        # use the released dependencies
# apply and commit the fix
doppler run --config prd -- env APP_ENV=production EXPO_NO_DOTENV=1 \
  eas update --channel production --environment production \
  --message "fix: <description>"
```

The update gets its runtime version from `package.json` (`2.3.0` on the tag).
Thus, it goes only to `2.3.0` binaries. To send it to a part of the users
first, add `--rollout-percentage <1-100>`.

Then open a pull request from the hotfix branch into `develop`, so the next
store version also contains the fix. The changelog of the next release shows
its commit.

> **Warning:** an update goes to all users of that version immediately. Test it
> on a production build before you publish it. When possible, send it to a
> part of the users first.
