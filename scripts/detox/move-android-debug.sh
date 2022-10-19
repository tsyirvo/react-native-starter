#!/bin/bash
set -e

tar -xf e2e/builds/android-debug.tar.gz -C e2e/builds

mv "$PWD/e2e/builds/debug/app-debug.apk" "$PWD/e2e/builds/"
mv "$PWD/e2e/builds/androidTest/debug/app-debug-androidTest.apk" "$PWD/e2e/builds/"

rm -rf "$PWD/e2e/builds/debug"
rm -rf "$PWD/e2e/builds/androidTest"
rm -rf "$PWD/e2e/builds/android-debug.tar.gz"