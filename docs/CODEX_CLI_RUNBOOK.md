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

## Workspace-Write Start Workflow

Use this section only for an approved narrow implementation or documentation sprint.

### Repo Path

```text
C:\Users\ThomasOlsson\Documents\Projects\mini-lovable
```

### Start Command

```text
cd C:\Users\ThomasOlsson\Documents\Projects\mini-lovable
```

### Required Pre-Write Checks

Before any edit, confirm:

1. Current working directory
2. Git repo
3. Current branch
4. Remote/origin
5. Working tree status before changes
6. Latest commits
7. Required files exist
8. Approved sprint scope
9. Allowed files for this sprint
10. Forbidden files for this sprint

### Write Scope Rule

Codex may edit only files explicitly listed in the approved sprint prompt. If a needed file is not listed, Codex must stop and ask for ChatGPT QA direction.

### Allowed Commands

```text
cd C:\Users\ThomasOlsson\Documents\Projects\mini-lovable
git status
git branch
git remote -v
git log --oneline -5
git diff
dir
type package.json
safe project checks already approved by the sprint, if any
```

### Forbidden Commands

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
any command outside the approved repo
```

### Working Tree and Diff

Codex must report:

* working tree status before changes
* changed files after changes
* git diff summary after changes
* confirmation that only approved files changed

Codex must inspect the diff before reporting back. If the diff includes any unapproved file, Codex must stop and report it.

### Stop Conditions

Stop immediately if any of the following is true:

* wrong directory
* not a git repo
* wrong branch
* wrong remote
* unexpected modified files before starting
* missing required files
* sprint scope is unclear
* requested file is not listed as allowed
* task requires secrets
* task requires dependency install
* task requires files outside approved repo
* task requires commit/push
* diff contains unapproved files
* tests/checks fail and cause is unclear

### Expected Output Format

Codex must report the following:

1. Current working directory
2. Git repo: yes/no
3. Branch
4. Remote/origin
5. Working tree before
6. Approved sprint scope
7. Allowed files
8. Forbidden files
9. Files changed
10. Working tree after
11. Diff summary
12. Checks/tests run
13. Risks or unclear items
14. Confirmation that only approved files changed
15. Final verdict: `READY FOR CHATGPT QA` / `NEEDS FIX` / `STOP`

### Final Rule

Codex may edit only explicitly approved files. Codex must not commit or push. Thomas or ChatGPT-Nicolas handles QA and later manual Git steps.

## PowerShell Manual Git Runbook

Use this section for the human-approved PowerShell Git flow after ChatGPT QA.

### Repo Path

```text
C:\Users\ThomasOlsson\Documents\Projects\mini-lovable
```

### Start Command

```text
cd C:\Users\ThomasOlsson\Documents\Projects\mini-lovable
```

### Pre-Commit Checks

Before staging or committing, confirm:

* `git status`
* `git diff`
* only ChatGPT-approved files are modified
* no secrets or credentials are visible in the diff
* branch is `main` unless ChatGPT approved another branch
* remote/origin points to `MELS-projects / mini-lovable`

### Safe Staging Rule

Use explicit file staging only. Do not use `git add .` unless ChatGPT explicitly confirms that every changed file is approved.

### Example Staging Command

```text
git add docs/CODEX_CLI_RUNBOOK.md
```

### Commit Command Format

```text
git commit -m "Approved commit message here"
```

### Push Command

```text
git push origin main
```

### Post-Push Check

Run:

```text
git status
```

The expected result is a clean working tree.

### Stop Conditions

Stop immediately if any of the following is true:

* wrong directory
* wrong branch
* wrong remote
* unexpected modified files
* diff contains secrets or credentials
* diff contains files not approved by ChatGPT
* commit message is not approved
* `git status` shows unclear state
* push fails
* any command asks for credentials or permissions unexpectedly

If any stop condition appears, Thomas should return to ChatGPT-Nicolas for QA.

### Do-Not-Run List

Do not run:

```text
git add .
git reset
git clean
git rebase
git merge
git push --force
npm install
npm update
npm audit fix
del
rmdir
any deploy command
any command that reads .env or secrets
```

## Commit/Push Checklist

Use this checklist immediately before committing and pushing approved changes.

* Correct repo: `C:\Users\ThomasOlsson\Documents\Projects\mini-lovable`
* Correct branch: `main`, unless ChatGPT-Nicolas explicitly approved another branch
* Correct remote: `origin` must point to `MELS-projects / mini-lovable`
* Only approved files changed: `git status` shows only files approved by ChatGPT-Nicolas
* Diff reviewed: `git diff` reviewed before staging
* No secrets: diff contains no API keys, tokens, passwords, `.env` values, credentials, private token URLs, or customer/private data
* Explicit staging: stage only approved files by name; do not use `git add .` unless ChatGPT-Nicolas explicitly confirms every changed file is approved
* Approved commit message: use only the commit message approved by ChatGPT-Nicolas
* Push to main: use `git push origin main` only after QA approval and correct staging
* Post-push check: run `git status`; expected result is a clean working tree

Stop if any of these appear:

* wrong repo
* wrong branch
* wrong remote
* unexpected modified files
* unreviewed diff
* secrets found in diff
* unclear commit message
* push fails
* post-push working tree is not clean

## Standard QA Handoff Packet

After every workspace-write sprint, Codex must return this packet.

Return this packet before Thomas sends the result to ChatGPT-Nicolas for QA.

1. Repo context
   * Current working directory
   * Git repo: yes/no
   * Branch
   * Remote/origin
   * Working tree before
   * Working tree after
2. Sprint scope
   * Sprint name
   * Approved goal
   * Allowed files
   * Forbidden files
   * Hard limits
3. Changed files
   * List every changed file
   * State whether each changed file was explicitly approved
4. Exact changes
   * Short plain-English summary of what changed
   * Mention important sections/functions/text changed
5. Diff summary
   * Summarize the diff
   * Confirm no unrelated refactor
   * Confirm no package/dependency changes unless explicitly approved
6. Tests/checks run
   * Commands run
   * Manual checks done
   * Build/test result if applicable
   * If no test was run, explain why
7. Risks
   * Known risks
   * Unclear items
   * Anything ChatGPT-Nicolas should review carefully
8. Stop conditions
   * State whether any stop condition was triggered
   * If yes, stop and report instead of continuing
9. Approved-files confirmation
   * Explicitly state: "Only approved files were changed: YES / NO"
10. Ready-for-QA verdict
   * Use exactly one:
     * READY FOR CHATGPT QA
     * NEEDS FIX
     * STOP

Codex must not claim `READY FOR CHATGPT QA` if:

* wrong repo was used
* branch or remote is wrong
* unapproved files changed
* secrets may be exposed
* tests/checks failed and cause is unclear
* package/dependency files changed without approval
* the sprint scope was expanded
* Codex committed or pushed
