#!/bin/bash
set -e

tar -xf e2e/builds/android-release.tar.gz -C e2e/builds

mv "$PWD/release/app-release.apk" "$PWD/e2e/builds/"
mv "$PWD/androidTest/release/app-release-androidTest.apk" "$PWD/e2e/builds/"

rm -rf "$PWD/e2e/builds/release"
rm -rf "$PWD/e2e/builds/androidTest"
rm -rf "$PWD/e2e/builds/android-release.tar.gz"