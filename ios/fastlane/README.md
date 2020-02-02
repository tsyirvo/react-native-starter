fastlane documentation
================
# Installation

Make sure you have the latest version of the Xcode command line tools installed:

```
xcode-select --install
```

Install _fastlane_ using
```
[sudo] gem install fastlane -NV
```
or alternatively using `brew cask install fastlane`

# Available Actions
## iOS
### ios incrementBuildNumber
```
fastlane ios incrementBuildNumber
```
Increment the app build number
### ios incrementVersionNumber
```
fastlane ios incrementVersionNumber
```
Increment the app version number
### ios commitBumpAndAddTag
```
fastlane ios commitBumpAndAddTag
```
Commit the version bump and add a tag for the current release
### ios matchPull
```
fastlane ios matchPull
```
Pull the app necessary certificates & profiles
### ios buildApp
```
fastlane ios buildApp
```
Build the app
### ios beta
```
fastlane ios beta
```
Push a new beta build to TestFlight

----

This README.md is auto-generated and will be re-generated every time [fastlane](https://fastlane.tools) is run.
More information about fastlane can be found on [fastlane.tools](https://fastlane.tools).
The documentation of fastlane can be found on [docs.fastlane.tools](https://docs.fastlane.tools).
