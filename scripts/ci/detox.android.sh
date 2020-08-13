#!/bin/bash -e

echo fs.inotify.max_user_watches=524288 | sudo tee -a /etc/sysctl.conf && sudo sysctl -p
npx detox build -c android.emu.ci
npx detox test -c android.emu.ci -n test -H --cleanup