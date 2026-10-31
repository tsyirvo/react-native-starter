#!/bin/sh
# Connects this checkout to Doppler with the project and config in doppler.yaml.
# The post-checkout git hook runs this script, so new worktrees get the setup.
# The script never fails the checkout: it prints a warning and exits with 0.

if ! command -v doppler >/dev/null 2>&1; then
  exit 0
fi

# Doppler keeps the setup per directory. Skip directories that already have it.
if [ -n "$(doppler configure get project --plain 2>/dev/null)" ]; then
  exit 0
fi

if ! doppler setup --no-interactive >/dev/null 2>&1; then
  echo "Warning: Doppler setup failed. Run 'doppler login', then 'doppler setup'." >&2
fi

exit 0
