# Continuous integration

The GitHub Actions workflows use a Git Flow setup. `develop` is the default
branch.

## Workflows

| Workflow                          | When it runs                                        | What it does                                         |
| --------------------------------- | --------------------------------------------------- | ---------------------------------------------------- |
| **Quality**                       | On new and updated pull requests, to any branch     | Runs TypeScript, Biome and the full Jest suite       |
| **PR title**                      | On pull requests                                    | Checks that the title is a valid conventional commit |
| **Release**                       | On pushes to `develop`                              | Keeps the release pull request up to date            |
| **Cache Bun dependencies**        | On pushes to `develop`, and on changes to its setup | Fills the shared dependency cache                    |
| **Build the app for development** | Manually                                            | Starts EAS development builds for iOS and Android    |

**Dependabot** (`.github/dependabot.yml`) also opens one pull request each
week to update the GitHub Actions. The actions are pinned to commit SHAs.
Dependabot ignores releases that are less than 3 days old.

### Quality

- Quality does not run on branch pushes. It runs only on pull requests.
- Quality skips the release PR (`release-please--*` branches). That PR changes
  only the version and the changelog.
- A new push to the same pull request cancels the older run.
- The Jest transform cache is separate from the dependency cache. Its key uses
  the OS and architecture, the Node major version, the lockfile, the
  Jest/Babel/TypeScript configuration and the commit. If there is no exact
  match, it uses a cache from an earlier commit.

### PR title

Pull requests are squash-merged, so the PR title becomes the commit message.
Release Please reads these messages to calculate the next version. Read
[Releasing](releasing.md).

### Shared setup

The Node and Bun setup, the cache restore and the install steps are in
`.github/actions/setup-dependencies/action.yml`. Quality and the development
build restore the shared cache, and then run `bun install --frozen-lockfile`.

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
