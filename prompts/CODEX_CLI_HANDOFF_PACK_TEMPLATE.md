# Codex CLI Handoff Pack Template

## Purpose

Use this template to prepare consistent Codex CLI handoffs and QA packages for Kodmaskin Oskar.

The goal is to reduce manual copy/paste while preserving clear scope, safety, and ChatGPT QA control.

## Handoff Pack

### 1. Sprint name

[Write the sprint name.]

### 2. Sprint type

Use one:

- Read-only analysis
- Handoff-only
- Documentation-only write
- One-file UI/code change
- Bugfix
- Workflow/template update

### 3. Goal

[Write the exact goal in one to three sentences.]

### 4. Current status

[Summarize current project state, recent relevant commits, and what is already verified.]

### 5. Repo context

Project:
Mini-Lovable / Kodmaskin Oskar

Repository:
MELS-projects / mini-lovable

Local path:
C:\Users\ThomasOlsson\Documents\Projects\mini-lovable

Required repo verdict:
CORRECT REPO

### 6. Allowed files

Codex may read/edit only:

- [file or folder]

### 7. Forbidden files

Codex must not edit:

- src/ unless explicitly allowed
- docs/ unless explicitly allowed
- prompts/ unless explicitly allowed
- package.json
- package-lock.json
- index.html
- AGENTS.md
- .env
- .env.local
- .env.production

### 8. Hard limits

- Do not expand scope.
- Do not act as product owner.
- Do not change unrelated functionality.
- Do not refactor broadly.
- Do not add dependencies unless explicitly approved.
- Do not edit package files unless explicitly approved.
- Do not read or edit .env or secrets.
- Do not install anything unless explicitly approved.
- Do not commit unless explicitly approved.
- Do not push unless explicitly approved.
- Do not deploy.
- Do not install Hermes/OpenClaw.
- Do not create a new version or baseline unless explicitly approved.
- Make the smallest safe change.
- GitHub remains the source of truth.
- ChatGPT remains the QA gate.

### 9. Required actions

1. Verify repo context if needed.
2. Capture the working tree status before starting work.
3. Inspect only relevant files.
4. If unexpected modified files are already present before work starts, stop and report them unless ChatGPT explicitly approved them.
5. Make only the requested change if this is an implementation sprint.
6. Preserve existing behavior unless intentionally changed.
7. Run allowed checks only.
8. Capture the working tree status after completing work.
9. Report uncertainty instead of guessing.
10. Stop if the task requires broader access than allowed.

### 10. Expected Codex output

Return:

1. Summary
2. Changed files
3. Exact changes made
4. Files inspected
5. Commands run
6. Working tree status before work
7. Working tree status after work
8. What was tested or checked
9. Git status summary
10. Risks
11. Whether this is ready for ChatGPT QA

### 11. QA package format

Prepare this for ChatGPT QA:

QA package:
- Sprint name:
- Goal:
- Changed files:
- Forbidden files touched:
- Summary of changes:
- Working tree before:
- Working tree after:
- Read-only tests changed no files:
- Implementation/write tests changed only allowed files:
- Test/check result:
- Risk notes:
- Commit message if approved:
- Ready for QA:
- Final Codex verdict:

### 12. Risk summary

Include:

- Scope risk
- File access risk
- Secrets risk
- Dependency risk
- Runtime/UI risk
- Git/GitHub risk
- Bolt preview risk

### 13. Test plan

Include exact test steps.

For documentation/template changes:
1. Run git status.
2. Confirm working tree status before work and after work are both reported.
3. Confirm only allowed files changed.
4. Confirm read-only tests changed no files.
5. Review markdown for formatting and duplication.
6. Confirm no app code changed.

For app/UI changes:
1. Run git status.
2. Confirm working tree status before work and after work are both reported.
3. Confirm only allowed files changed.
4. Confirm implementation/write tests changed only allowed files.
5. Run allowed build/check command if available.
6. Push only after ChatGPT QA approval.
7. Verify in Bolt after push.

### 14. Stop conditions

Stop if:

- Wrong repo.
- Wrong branch or unclear branch.
- Wrong remote.
- Unexpected modified files are present before work starts and were not explicitly approved by ChatGPT.
- Unexpected files are modified.
- A forbidden file must be changed.
- Secrets or .env access is needed.
- Dependency install is needed but not approved.
- Commit/push/deploy is requested without approval.
- The task requires broad refactor.
- The implementation cannot be kept small and safe.

### 15. Suggested commit message

[Write exact commit message.]

### 16. Final verdict options

Use one:

- READY FOR CHATGPT QA
- NEEDS FIX
- STOP

## Template Rules

- No secrets.
- No .env access.
- No package or dependency changes unless explicitly allowed.
- No commit or push by Codex unless explicitly approved.
- No Hermes/OpenClaw installation.
- Report working tree status before and after work in every QA package.
- Confirm read-only tests changed no files.
- Confirm implementation/write tests changed only allowed files.
- Stop if unexpected modified files are present before work starts unless ChatGPT explicitly approved them.
- Keep the workflow aligned to ChatGPT -> Oskar -> Codex -> GitHub -> Bolt -> QA.
- Keep the template practical and copy/paste-ready.
