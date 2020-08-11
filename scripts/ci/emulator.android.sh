#!/bin/bash -e

echo no | android create avd --force -n test -t android-28 --abi default/x86
emulator -avd test -no-audio -no-window &
android-wait-for-emulator
adb shell input keyevent 82 &