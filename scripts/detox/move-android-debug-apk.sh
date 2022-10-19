#!/bin/bash
set -e

mv "$PWD/e2e/builds/android-debug/debug/app-debug.apk" "$PWD/e2e/builds/"
mv "$PWD/e2e/builds/android-debug/androidTest/debug/app-debug-androidTest.apk" "$PWD/e2e/builds/"