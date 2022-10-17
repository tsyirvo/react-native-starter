#!/bin/bash
set -e

mv "$PWD/e2e/builds/android/release/app-release.apk" "$PWD/e2e/builds/"
mv "$PWD/e2e/builds/android/androidTest/release/app-release-androidTest.apk" "$PWD/e2e/builds/"