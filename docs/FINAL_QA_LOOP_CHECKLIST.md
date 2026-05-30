# Final QA-Loop Checklist

## 1. Purpose

This checklist defines the final QA-loop that should run after important Kodmaskin sprints before moving to the next sprint.

The goal is to confirm that the repo, documentation, changed files, tests, risks, and next action are clear before continuing.

This checklist supports the current ChatGPT → Oskar → Codex → GitHub → QA workflow.

This document does not approve Hermes/OpenClaw installation, VM setup, deployment automation, GitHub automation, or broader agent autonomy.

## 2. When to use this checklist

Use this checklist after important sprints such as:

* new documentation files
* workflow templates
* dashboard changes
* runbook changes
* implementation sprints
* recovery/fix sprints
* major repo-state checkpoints

Use it before:

* starting a new sprint
* documenting a completed sprint
* changing roadmap status
* testing a new workflow stage
* increasing agent autonomy

## 3. Current workflow position

Current strategic status:

* Codex CLI remains the main implementation path.
* Hermes/OpenClaw remains WAIT.
* No VM setup has been approved.
* No Hermes/OpenClaw installation has been approved.
* GitHub remains source of truth.
* ChatGPT remains project lead and QA gate.
* Workflow improvement continues before VM/Hermes setup.

## 4. Repo context verification

Verify the repo context before trusting any sprint result.

Expected local repo path:

```text
C:\Users\ThomasOlsson\Documents\Projects\mini-lovable
```

Expected GitHub remote:

```text
https://github.com/MELS-projects/mini-lovable.git
```

Check and report:

* current working directory
* Git repo: yes / no
* repo name
* branch
* remote/origin
* final repo verdict

Final repo verdict must be one of:

```text
CORRECT REPO
WRONG REPO
UNCLEAR
```

Do not continue if repo verdict is not:

```text
CORRECT REPO
```

## 5. Branch check

Check current branch.

Expected default branch:

```text
main
```

Report:

* current branch
* whether branch is expected
* whether any branch change is needed

Do not create, rename, or switch branches unless explicitly approved.

## 6. Remote/origin check

Check Git remote.

Expected remote:

```text
https://github.com/MELS-projects/mini-lovable.git
```

Report:

* origin URL
* whether origin is correct
* whether any remote mismatch exists

Stop if remote/origin is wrong or unclear.

## 7. Working tree check

Check working tree before and after the QA-loop.

Required reporting:

```text
Working tree before check:
[status]

Working tree after check:
[status]

Working tree remained unchanged: yes / no
```

Expected result:

* clean before check
* clean after check
* no untracked or unexpected modified files

If unexpected changes exist, stop and identify them.

## 8. Latest commits check

Review recent commits.

Report:

* latest 5–10 commits
* latest known sprint commit
* whether the expected commit appears
* whether the commit history matches the sprint status

Do not rewrite history.

Do not run destructive Git commands.

## 9. Changed files review

For completed write sprints, review changed files.

Report:

* changed files
* newly created files
* deleted files
* whether changes match allowed files
* whether any unexpected file changed

For read-only checks, confirm:

```text
No files changed.
No files created.
No files deleted.
```

## 10. Forbidden files review

Confirm forbidden files were not touched.

Common forbidden areas:

* src/ unless explicitly allowed
* dashboard/ unless explicitly allowed
* prompts/ unless explicitly allowed
* package.json
* package-lock.json
* index.html
* .env
* .env.local
* .env.production
* secrets or credential files
* files outside the approved repo

If any forbidden file changed, stop.

## 11. Documentation status check

Check whether the sprint has been documented when needed.

Report:

* whether docs/SPRINT_LOG.md contains the completed sprint
* whether new documentation files exist
* whether existing docs were edited only when approved
* whether documentation uses the required status format

Required status format for approved sprint log entries:

```text
Status:
Approved
```

Exception:

```text
STOPPED AND REVERTED
```

Use the exception only when ChatGPT QA explicitly marks a sprint as stopped and reverted.

## 12. Dashboard/roadmap-status check

Use this section only when the sprint affects dashboard or roadmap status.

Check:

* dashboard/index.html exists if relevant
* dashboard/roadmap-status.json exists if relevant
* roadmap-status.json is valid JSON if checked
* dashboard status matches current workflow state
* dashboard runtime preview status is known
* dashboard updates were done only through approved sprint

If dashboard is not relevant, write:

```text
Dashboard/roadmap-status check: not relevant for this sprint.
```

## 13. Test/check results review

Review what was tested or checked.

Report:

* commands run
* files read
* tests performed
* preview result if relevant
* Bolt result if relevant
* local HTTP/static preview result if relevant
* unresolved test gaps

Do not claim a runtime or preview test passed unless it was actually performed.

## 14. Risk review

Review and report risks.

Include:

* scope risk
* file access risk
* secrets risk
* dependency risk
* runtime/UI risk
* Git/GitHub risk
* documentation drift risk
* next-step risk

If risk is low, still state why.

## 15. Commit/push confirmation

For completed sprints, confirm:

* commit hash
* commit message
* branch pushed to
* remote pushed to
* whether push completed successfully
* whether GitHub remains source of truth

Codex must not commit or push unless a future workflow stage explicitly approves it.

Current bridge:

1. ChatGPT QA approves.
2. Human owner commits and pushes through PowerShell/Git.
3. GitHub becomes the accepted source of truth.

## 16. Post-push clean working tree

After push, verify:

```text
git status
```

Expected result:

```text
working tree clean
```

Report:

```text
Post-push working tree clean: yes / no
```

If not clean, stop and identify remaining files.

## 17. Next safe action decision

End each final QA-loop with one recommended next safe action.

Use one:

```text
Document completed sprint
Start next read-only check
Start next documentation sprint
Start next narrow implementation sprint
Update dashboard status through approved sprint
Hold / wait
STOP
```

The next action must be narrow and safe.

## 18. Stop conditions

Stop immediately if:

* repo context is wrong
* branch is wrong or unclear
* remote/origin is wrong
* working tree has unexpected changes
* expected commit is missing
* forbidden files changed
* .env or secrets were accessed
* dependency installation occurred without approval
* app code changed without approval
* dashboard files changed without approval
* package files changed without approval
* prompt files changed without approval
* documentation status is missing or inconsistent
* commit/push status is unclear
* Hermes/OpenClaw installation is suggested
* VM setup is suggested without approval
* ChatGPT QA gate is weakened

## 19. Final QA-loop output format

Use this output format:

```text
Final QA-loop result

1. Summary
2. Repo context verdict
3. Branch
4. Remote/origin
5. Working tree before check
6. Working tree after check
7. Working tree remained unchanged: yes / no
8. Latest commits reviewed
9. Expected commit found: yes / no / not applicable
10. Changed files review
11. Forbidden files review
12. Documentation status
13. Dashboard/roadmap-status status
14. Test/check results
15. Risk review
16. Commit/push confirmation
17. Post-push clean working tree: yes / no / not applicable
18. Recommended next safe action
19. Final verdict:
   READY FOR CHATGPT QA
   NEEDS FIX
   STOP
```

Codex must not write APPROVE as the final decision.

Only ChatGPT gives QA approval.
