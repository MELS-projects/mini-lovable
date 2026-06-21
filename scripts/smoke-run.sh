#!/usr/bin/env bash
set -euo pipefail

REPO_ROOT="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
cd "$REPO_ROOT"

had_dist=0
if [ -d dist ]; then
  had_dist=1
fi

cleanup() {
  if [ "$had_dist" -eq 0 ] && [ -d dist ]; then
    rm -rf dist
  fi
}

trap cleanup EXIT

printf '=== git status before ===\n'
git status --short

printf '\n=== build ===\n'
npm run build

printf '\n=== git diff --stat ===\n'
git diff --stat

cleanup

printf '\n=== git status after ===\n'
git status --short
