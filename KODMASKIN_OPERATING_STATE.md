# Kodmaskin Operating State

## Current Operating Mode

Manual Daily OS Transport is active. Daily OS must come before Hermes. Current work is text-only unless Nicolas approves otherwise.

## Active Rules

- Complete Block Rule
- Source Required Rule when source packaging is involved
- RECEIVER RESULT default return format
- Approval Operating Mode
- Batch Mode
- Post-CLOSED / PASS Batch-Scope Rule
- Daily OS before Hermes
- GREEN closes directly by Oskar
- YELLOW / RED / unclear goes to Nicolas
- Strategic direction goes to Project Lead
- Codex Text-Packager goes to Nicolas before Codex
- n8n/manual transport goes to Nicolas before setup/action
- STOP creates no new work

## Closed Tracks

- Stage 1 Controlled Text-Only Test Suite: EXECUTED / PASS
- Stage 2 Real Daily OS Complete-Block Dry-Run: EXECUTED / PASS
- Stage 3 First Live-Readiness Approval Package: readiness-only approved with fix
- Manual Daily OS Transport Hardening Batch: CLOSED / PASS WITH FIX
- Inactive n8n Visual Draft: CLOSED / PASS
- Inactive n8n Visual Draft Expansion: PASS
- Manual-trigger dry-run: PASS
- Daily OS Relay Accuracy Trial: PASS
- Post-CLOSED / PASS Batch-Scope Rule: ACTIVE / CLOSED

## WAIT Tracks

- activation
- publishing
- webhook
- endpoint
- credentials/secrets
- external integrations
- repo/GitHub/files beyond approved docs-only file
- dashboard/Bolt
- terminal/PowerShell
- install/deploy
- automation
- automatic sending
- live transport
- Codex execution except this approved docs-only prompt
- Mini-Lovable product repair

## Hermes Status

Hermes remains WAIT. No Hermes setup, tool selection, live transport, endpoint, webhook, automation, or deployment is approved.

## n8n Status

n8n remains inactive unless separately approved. No new n8n execution, activation, publishing, webhook, endpoint, automation, credentials, or external integration is approved by this docs-only sprint.

## Codex Status

Codex is not generally approved. Codex may only perform this exact docs-only task after Nicolas approves the prompt. No app-code, package, config, workflow, dashboard, commit, or push is approved.

## Dashboard Status

Dashboard is not approved and not needed for Sprint OS-1.

## Next Allowed Step

After this file is created or updated, Codex must return only:

1. Diff summary.
2. Safety confirmation.
3. Confirmation that only `KODMASKIN_OPERATING_STATE.md` was created or updated.

Required Codex return format:

CODEX RESULT

Files changed:

* `KODMASKIN_OPERATING_STATE.md`

Diff summary:
Codex must write a short factual summary of the created or updated operating-state content.

Safety confirmation:

* Docs-only: YES
* Only allowed file changed: YES
* No app-code changes: YES
* No repo changes beyond one markdown file: YES
* No n8n/webhook/automation/secrets/deploy: YES
* No dashboard changes: YES
* No commit/push: YES

Next action:
Return result to Oskar.

STOP CONDITIONS

Codex must stop and report instead of editing if:

* any file other than `KODMASKIN_OPERATING_STATE.md` would need to change
* app-code would need to change
* package/config/workflow/dashboard files would need to change
* n8n/webhook/endpoint/automation work is needed
* credentials/secrets are involved
* install/deploy is needed
* commit/push is requested
* source state is unclear
* requested action exceeds docs-only scope
