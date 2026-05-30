# Codex CLI Runbook

## 1. Purpose

This runbook defines how to safely start and use Codex CLI in the current Kodmaskin workflow.

The goal is to make the ChatGPT → Oskar → Codex → GitHub → QA workflow more stable, repeatable, and safe.

This document does not approve Hermes/OpenClaw installation, VM setup, GitHub automation, or broader agent autonomy.

## 2. Current role of Codex CLI

Codex CLI is the current main implementation path.

Codex may perform narrow, approved tasks after ChatGPT QA approves the sprint plan.

Codex must not act as product owner.

Codex must not decide roadmap, release readiness, autonomy level, deployment strategy, or product direction.

Current strategic status:

* Hermes: WAIT.
* OpenClaw: WAIT / not first.
* Codex CLI: CONTINUE.
* GitHub remains source of truth.
* ChatGPT remains project lead and QA gate.
* Mini-Lovable remains the validation/training project.
* No VM setup is approved yet.
* No Hermes/OpenClaw installation is approved.

## 3. When to use Codex

Use Codex when there is a narrow approved sprint with:

* clear goal
* allowed files
* forbidden files
* hard limits
* expected output
* QA criteria
* test plan
* suggested commit message if approved

Do not use Codex for vague work such as:

* improve the app
* clean up the code
* make it better
* refactor broadly
* decide the next roadmap

## 4. One active Codex sprint at a time

Only one Codex sprint should be active at a time.

Do not start a new Codex sprint until the previous one has one of these outcomes:

* ChatGPT QA approved it.
* ChatGPT QA stopped it.
* ChatGPT QA requested a focused fix.
* The sprint was documented or explicitly deferred.

This prevents overlapping changes, unclear diffs, and confusing QA.

## 5. Required repo context verification

Before important Codex work, verify repo context.

Expected local repo path:

```text
C:\Users\ThomasOlsson\Documents\Projects\mini-lovable
```

Expected GitHub remote:

```text
https://github.com/MELS-projects/mini-lovable.git
```

Codex should report:

* current working directory
* Git repo: yes / no
* current branch
* remote/origin
* relevant required files
* final repo verdict

Final repo verdict must be one of:

```text
CORRECT REPO
WRONG REPO
UNCLEAR
```

Do not proceed unless the verdict is:

```text
CORRECT REPO
```

## 6. Working-tree before/after checks

Every Codex sprint must report working-tree state before and after work.

Codex output must include:

```text
Working tree before work:
[status]

Working tree after work:
[status]

Working tree remained unchanged: yes / no
```

For read-only tests:

* working tree must remain unchanged
* no files may be created
* no files may be edited
* no files may be deleted

For write tests:

* only allowed files may change
* forbidden files must remain untouched
* unexpected modified files before work are a stop condition unless ChatGPT explicitly approved them

## 7. Codex modes

### 7.1 Read-only mode

Use read-only mode for:

* repo context checks
* workflow analysis
* bug analysis
* template verification
* QA-loop checks
* planning support

Allowed:

* read approved files
* inspect repo structure
* run safe read-only commands
* summarize findings
* propose a narrow next sprint

Forbidden:

* edit files
* create files
* delete files
* install packages
* access .env or secrets
* commit
* push
* deploy

### 7.2 Documentation/write mode

Use documentation/write mode for approved documentation-only sprints.

Allowed:

* edit only approved documentation files
* create only approved documentation files
* update sprint log when explicitly approved

Forbidden:

* edit app code
* edit dashboard files unless approved
* edit package files
* edit prompt files unless approved
* access .env or secrets
* commit or push from Codex

### 7.3 Workflow/template sprint mode

Use workflow/template sprint mode for approved template or process files.

Allowed:

* edit only approved workflow/template files
* improve handoff or QA format
* improve repeatability

Forbidden:

* change product behavior
* change app code
* change package files
* broaden agent permissions
* weaken ChatGPT QA gate
* approve Hermes/OpenClaw installation

### 7.4 Limited implementation mode

Use limited implementation mode only when ChatGPT QA approves a narrow implementation sprint.

Allowed:

* edit only explicitly approved implementation files
* make the smallest safe change
* preserve existing behavior unless the sprint explicitly changes it
* report tests/checks and risks

Forbidden:

* broad refactor
* dependency changes
* package changes unless explicitly approved
* auth/payment/database changes
* secrets access
* deployment changes
* commit/push from Codex

## 8. Allowed and forbidden actions

Default allowed read-only commands:

```text
git status
git branch
git remote -v
git log --oneline -10
dir
type [approved file]
```

Default forbidden actions:

* git add
* git commit
* git push
* git merge
* git reset
* git clean
* npm install
* npm update
* npm audit fix
* npx commands
* dependency installation
* global tool installation
* deployment commands
* database migration commands
* GitHub settings changes
* reading .env or secrets
* accessing folders outside the approved repo

## 9. Secrets and .env rules

Codex must not read, edit, print, copy, summarize, or expose:

* .env
* .env.local
* .env.production
* API keys
* GitHub tokens
* deployment tokens
* payment keys
* database passwords
* customer data
* browser credentials
* SSH private keys

If a task appears to require secrets, Codex must stop and report:

* what is needed
* why it is needed
* why it is risky
* what safe alternative exists

## 10. Expected Codex output

Codex should return a QA-ready package.

Required output:

1. Summary
2. Repo context verification
3. Working tree before work
4. Working tree after work
5. Working tree remained unchanged: yes / no
6. Files read
7. Commands run
8. Changed files
9. Forbidden files touched
10. Exact changes made
11. Test/check result
12. Safety checklist
13. Risk summary
14. Stop conditions triggered
15. Suggested commit message if approved
16. Final Codex verdict

Final Codex verdict must be one of:

```text
READY FOR CHATGPT QA
NEEDS FIX
STOP
```

Codex must not write APPROVE as the final decision.

Only ChatGPT gives QA approval.

## 11. Handoff back to ChatGPT QA

After Codex completes work, the full Codex output must be sent back to ChatGPT for QA.

ChatGPT reviews:

* whether the goal was met
* whether only allowed files changed
* whether forbidden files were untouched
* whether the working tree is clean or expected
* whether risks are acceptable
* whether tests/checks are sufficient
* whether commit/push should be allowed

## 12. QA decision model

ChatGPT returns one QA decision:

```text
APPROVE
APPROVE WITH FIX
STOP
```

### APPROVE

Use when the sprint goal is met and the result is safe.

### APPROVE WITH FIX

Use when the sprint is mostly correct but needs a small focused correction.

### STOP

Use when wrong files changed, repo context is wrong, secrets may be exposed, scope expanded, or the result cannot be trusted.

## 13. PowerShell/Git commit bridge after approval

Codex must not commit or push unless explicitly approved in a future workflow stage.

Current safe bridge:

1. ChatGPT QA approves.
2. Human owner uses PowerShell/Git.
3. Only approved files are staged.
4. Commit message uses the approved message.
5. Push goes to the approved GitHub remote.

Recommended PowerShell pattern after approval:

```powershell
cd $env:USERPROFILE\Documents\Projects\mini-lovable
git status
git add [approved files]
git commit -m "[approved commit message]"
git push origin main
```

Do not use:

```powershell
git add .
```

unless ChatGPT explicitly confirms that all modified files are approved.

## 14. Stop conditions

Stop immediately if:

* repo context is wrong
* branch is wrong or unclear
* remote/origin is wrong
* working tree has unexpected changes
* a forbidden file must be edited
* .env or secrets are needed
* dependency installation is needed but not approved
* GitHub write access is requested
* commit/push is requested inside Codex
* task requires broad refactor
* instructions conflict
* Hermes/OpenClaw installation is suggested
* VM setup is suggested without approval
* output would weaken ChatGPT QA gate

When stopped, return:

1. What blocked the task
2. Why it is risky
3. What changed, if anything
4. What approval or information is needed
5. Recommended safe next step

## 15. Definition of Ready

A Codex sprint is ready only when:

* sprint goal is clear
* allowed files are listed
* forbidden files are listed
* hard limits are listed
* expected output is defined
* QA criteria are defined
* test/check steps are defined
* commit message is suggested if relevant
* ChatGPT QA has approved the plan

## 16. Definition of Done

A Codex sprint is done only when:

* Codex returns a complete QA package
* repo context is verified
* working tree before/after is reported
* changed files are clear
* risks are documented
* tests/checks are reported
* ChatGPT QA gives APPROVE, APPROVE WITH FIX, or STOP
* human owner commits/pushes only after approval if needed
* sprint is documented if required

## 17. Current status

Current status:

* Codex CLI remains the main implementation path.
* Hermes/OpenClaw remains WAIT.
* No VM setup has been approved.
* No Hermes/OpenClaw installation has been approved.
* GitHub remains source of truth.
* ChatGPT remains project lead and QA gate.
* Workflow improvement continues before VM/Hermes setup.
