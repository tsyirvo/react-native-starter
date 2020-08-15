#!/bin/bash -e

echo no | avdmanager create avd --force -n test  -k "system-images;android-$API;$EMU_FLAVOR;$ABI" -c 10M
emulator -verbose -avd test -no-accel -no-snapshot -no-window -noaudio -camera-back none -camera-front none -selinux permissive -qemu -m 2048 &
android-wait-for-emulator
adb shell input keyevent 82 &