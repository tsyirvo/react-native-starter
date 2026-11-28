# Continuous integration

`main` is the default branch. Feature branches start from `main` and merge
back into it through squash-merged pull requests.

## Workflows

| Workflow                          | When it runs                                    | What it does                                                |
| --------------------------------- | ----------------------------------------------- | ----------------------------------------------------------- |
| **Quality**                       | On new and updated pull requests, to any branch | Runs `check`, `typecheck` and `test` as three parallel jobs |
| **PR title**                      | On pull requests                                | Checks that the title is a valid conventional commit        |
| **Release**                       | On pushes to `main`                             | Keeps the release pull request up to date                   |
| **Verify main**                   | On pushes to `main`, and manually               | Runs the full `bun run verify`, then saves the Jest cache   |
| **Build the app for development** | Manually                                        | Starts EAS development builds for iOS and Android           |

**Dependabot** (`.github/dependabot.yml`) also opens one pull request each
week to update the GitHub Actions. The actions are pinned to commit SHAs.
Dependabot ignores releases that are less than 3 days old.

### Quality

- Quality does not run on branch pushes. It runs only on pull requests.
- Quality skips the release PR (`release-please--*` branches). That PR changes
  only the version and the changelog.
- A new push to the same pull request cancels the older run.
- Each gate of `bun run verify` runs in its own job, so the gates do not share
  the CPU of one runner. The jobs are `Verify (check)`, `Verify (typecheck)` and
  `Verify (test)`.
- Each job restores the Jest transform cache. Its key is `ci-` followed by the
  OS and the commit. If there is no exact match, the job uses the most recent
  cache that Verify main saved.

### Verify main

Verify main runs the full `bun run verify` on each push to `main`. It also
saves the Jest cache for the pull request jobs. Pull requests can read only the
caches of the base branch, so the cache exists only after this workflow has run
on `main`. It can also start by hand from the **Actions** tab.

### PR title

Pull requests are squash-merged, so the PR title becomes the commit message.
Release Please reads these messages to calculate the next version. Read
[Releasing](releasing.md).

### Shared setup

The Node and Bun setup and the install step are in
`.github/actions/setup-dependencies/action.yml`. Quality, Verify main and the
development build run it. It installs with `bun install --frozen-lockfile` and
does not cache dependencies.

## Build the development app

This workflow starts EAS cloud builds. Cloud builds use paid EAS resources.

### One-time setup

1. Push the Doppler `dev` config to the EAS `development` environment. Read
   [Environments](environments.md#cloud-builds).
2. Add these repository secrets:
   - `EXPO_TOKEN`: a token with access to the EAS project.
   - `DOPPLER_TOKEN`: a read-only Doppler service token for the project's `dev`
     config.

Do not commit these tokens. Do not add them to the app's Doppler config.

### Run the workflow

1. In the repository, open the **Actions** tab.
2. Select **Build the app for development**.
3. Select **Run workflow**.

The workflow installs the dependencies and Doppler. It reads the local app
configuration with Doppler. Then it submits two builds with the `development`
profile from `eas.json`: an iOS simulator build and an Android APK.

- The remote builders use the EAS variables that you pushed. The workflow does
  not push or change them.
- The workflow uses `--no-wait`. The job stops when EAS accepts the builds.
  Look at the EAS dashboard for the build results.
- The workflow does not publish an update or submit a store release.
