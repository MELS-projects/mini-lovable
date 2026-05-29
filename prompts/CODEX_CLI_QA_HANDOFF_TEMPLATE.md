# Codex CLI QA Handoff Template

## Purpose

Use this template when Codex returns work to ChatGPT for QA.

The goal is to make Codex output easier to review by clearly separating repo status, changed files, tests, risks, and approval readiness.

Codex must not approve its own work. ChatGPT remains the QA gate.

## QA Handoff Package

### 1. Sprint name

[Write the sprint name.]

### 2. Sprint type

Use one:

* Read-only analysis
* Handoff-only
* Documentation-only write
* Workflow/template update
* One-file UI/code change
* Bugfix
* Other: [describe]

### 3. Original goal

[Restate the approved sprint goal.]

### 4. Repo context verification

* Current working directory:
* Git repo: yes / no / unclear
* Branch:
* Remote/origin:
* Required repo verdict: CORRECT REPO / WRONG REPO / UNCLEAR

### 5. Working tree verification

Before work:

* Status:
* Unexpected modified files before work: yes / no
* If yes, list files and stop unless ChatGPT explicitly approved them.

After work:

* Status:
* Working tree changed: yes / no
* Working tree remained unchanged: yes / no
* If changed, list exactly which files changed.

### 6. Files read

List files read during the sprint:

* [file]

### 7. Commands run

List commands run:

* [command]

Do not omit commands.

### 8. Changed files

List all changed files:

* [file]

If no files changed, write:

No files changed.

### 9. Forbidden files touched

Use one:

* No forbidden files touched.
* Forbidden files touched: [list files and explain]

### 10. Exact changes made

Summarize exact changes.

For documentation/template changes, include the sections added or updated.

For code changes, include the functions, components, or UI areas touched.

### 11. Test/check result

Report what was checked.

Examples:

* git status:
* build/check:
* manual UI check:
* markdown review:
* Bolt required after push: yes / no

### 12. Safety checklist

Confirm:

* No app code changed unless explicitly allowed.
* No package files changed unless explicitly allowed.
* No prompt files changed unless explicitly allowed.
* No docs changed unless explicitly allowed.
* No .env or secrets accessed.
* No dependencies installed.
* No Hermes/OpenClaw installation.
* No commit or push made.
* No new version or baseline created.

### 13. Risk summary

Include:

* Scope risk:
* File access risk:
* Secrets risk:
* Dependency risk:
* Runtime/UI risk:
* Git/GitHub risk:
* Bolt preview risk:

### 14. Stop conditions triggered

Use one:

* No stop conditions triggered.
* Stop condition triggered: [explain]

### 15. Suggested QA decision

Codex may suggest one:

* READY FOR CHATGPT QA
* NEEDS FIX
* STOP

Codex must not write APPROVE as the final decision. ChatGPT gives QA approval.

### 16. Suggested commit message if approved

[Write exact commit message.]

### 17. Final Codex verdict

Use one:

* READY FOR CHATGPT QA
* NEEDS FIX
* STOP

## Rules

* Report before and after working-tree status.
* For read-only tests, confirm no files changed.
* For write tests, confirm only allowed files changed.
* Report unexpected pre-existing modified files.
* Never hide forbidden file changes.
* Never claim approval; ChatGPT gives QA approval.
* Do not commit or push unless explicitly approved.

## Expected output

1. Summary
2. Changed files
3. Exact file created
4. Confirmation that no existing files were edited
5. Confirmation that no app code changed
6. Confirmation that no docs changed
7. Confirmation that no package files changed
8. Confirmation that no existing prompt files changed
9. What was checked
10. Git status summary
11. Risks
12. Whether this is ready for ChatGPT QA

## QA criteria

* Only `prompts/CODEX_CLI_QA_HANDOFF_TEMPLATE.md` was created.
* No existing prompt templates changed.
* No app code changed.
* No docs changed.
* No package files changed.
* No `.env` or secrets read or changed.
* No Hermes/OpenClaw installation.
* No dependencies added.
* No commit or push made by Codex.
* No new version or baseline created.
* Template is in English.
* Template includes before/after working-tree verification.
* Template includes changed files and forbidden files touched.
* Template includes commands run and files read.
* Template includes tests/checks.
* Template includes safety checklist.
* Template includes risk summary.
* Template makes clear that ChatGPT remains QA gate.
* Template does not let Codex approve its own work.
* Template includes suggested commit message if approved.
* Existing useful files are preserved.

## Test steps

1. Run `git status`.
2. Confirm only `prompts/CODEX_CLI_QA_HANDOFF_TEMPLATE.md` changed.
3. Review markdown formatting.
4. Confirm no app code changed.
5. Confirm no docs changed.
6. Confirm no package files changed.
7. Confirm no existing prompt templates changed.
8. Do not commit or push.

## Final note

This template is for QA handoff only. It standardizes Codex output for ChatGPT review and does not change product behavior.
