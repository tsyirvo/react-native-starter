#!/bin/bash
set -e

mv "$PWD/e2e/builds/android-release/release/app-release.apk" "$PWD/e2e/builds/"
mv "$PWD/e2e/builds/android-release/androidTest/release/app-release-androidTest.apk" "$PWD/e2e/builds/"