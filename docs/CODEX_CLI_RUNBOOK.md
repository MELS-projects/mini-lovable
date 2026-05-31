# Codex CLI Read-Only Start Runbook

Use this runbook to start Codex in the Mini-Lovable repo in read-only mode and verify the repo context before any future implementation sprint.

## Repo Path

```text
C:\Users\ThomasOlsson\Documents\Projects\mini-lovable
```

## Start Command

```text
cd C:\Users\ThomasOlsson\Documents\Projects\mini-lovable
```

## Required Read-Only Repo Checks

Run these checks after changing into the repo:

1. Current working directory
2. Git repo check
3. Branch check
4. Remote/origin check
5. Working tree check
6. Latest commits check
7. Required files check

## Allowed Read-Only Commands

```text
cd C:\Users\ThomasOlsson\Documents\Projects\mini-lovable
git status
git branch
git remote -v
git log --oneline -5
dir
type package.json
```

## Forbidden Commands

Do not run:

```text
git add
git commit
git push
git merge
git rebase
git reset
git clean
npm install
npm update
npm audit fix
del
rmdir
move
any deploy command
any command that reads .env or secrets
```

## Stop Conditions

Stop immediately if any of the following is true:

* wrong directory
* not a git repo
* wrong branch
* wrong remote
* unexpected modified files
* missing required files
* command requires write access
* command requires dependency install
* task requires secrets
* task requires files outside the approved repo

## Required Output Format

Codex must report the following:

1. Current working directory
2. Git repo: yes/no
3. Branch
4. Remote/origin
5. Working tree status
6. Latest 5 commits
7. Required files found/missing
8. Files read
9. Risks or unclear items
10. Final verdict: `CORRECT REPO` / `WRONG REPO` / `UNCLEAR`
11. Suggested next safe action

## Rule

Codex must not proceed with implementation unless:

* the repo verdict is `CORRECT REPO`
* ChatGPT has approved a separate implementation sprint

## Notes

* GitHub is the source of truth.
* This workflow is read-only except for `cd`.
* Do not use this runbook for Hermes/OpenClaw work or VM setup.
