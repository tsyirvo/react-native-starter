#!/bin/bash -e

echo fs.inotify.max_user_watches=524288 | sudo tee -a /etc/sysctl.conf && sudo sysctl -p
detox build -c android.emu.ci
detox test -c android.emu.ci -n test -H --cleanup