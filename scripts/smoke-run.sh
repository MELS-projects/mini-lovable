#!/usr/bin/env bash
set -u -o pipefail

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

build_status="PASS"
smoke_status="PASS"
failure_step="none"

printf '=== git status before ===\n'
git status --short

printf '\n=== build ===\n'
if ! npm run build; then
  build_status="FAIL"
  smoke_status="FAIL"
  failure_step="build"
fi

printf '\n=== git diff --stat ===\n'
git diff --stat

cleanup

printf '\n=== git status after ===\n'
git status --short

printf '\n=== smoke-run summary ===\n'
printf 'build: %s\n' "$build_status"
printf 'dist cleanup: %s\n' "$([ "$had_dist" -eq 0 ] && printf 'PASS (temporary dist removed)' || printf 'PASS (pre-existing dist preserved)')"
printf 'smoke-run: %s\n' "$smoke_status"

if [ "$smoke_status" != "PASS" ]; then
  printf 'failure step: %s\n' "$failure_step"
  exit 1
fi
