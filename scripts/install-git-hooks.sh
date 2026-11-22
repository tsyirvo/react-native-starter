#!/bin/sh
# CI and EAS builds run bun install, so this script never fails the install.

if [ -n "$CI" ] || ! command -v mise >/dev/null 2>&1 || ! git rev-parse --git-dir >/dev/null 2>&1; then
  exit 0
fi

if ! mise x -- hk install --mise; then
  echo "warning: hk install failed, so git hooks are not installed. Run: mise x -- hk install --mise" >&2
fi

exit 0
