#!/bin/sh
# Connects this checkout to Doppler with the project and config in doppler.yaml.
# The post-checkout git hook runs this script, so new worktrees get the setup.
# The script never fails the checkout: it prints a warning and exits with 0.

if ! command -v doppler >/dev/null 2>&1; then
  exit 0
fi

# Doppler keeps the setup per directory, and a directory inherits the setup of its parents.
# Skip only a directory that has its own project, so a nested worktree still gets doppler.yaml.
dir=$(pwd -P)
scopes=$(doppler configure --json 2>/dev/null)
own=${scopes#*"\"$dir\":{"}
if [ "$own" != "$scopes" ]; then
  case ${own%%\}*} in
    *'"enclave.project"'*) exit 0 ;;
  esac
fi

if ! doppler setup --no-interactive >/dev/null 2>&1; then
  echo "Warning: Doppler setup failed. Run 'doppler login', then 'doppler setup'." >&2
fi

exit 0
