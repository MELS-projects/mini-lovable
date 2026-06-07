# Kodmaskin Decision Log

Source-of-truth log for important Kodmaskin decisions. Older entries are backfilled from chat history and repo docs.

## Important Decisions

### 1) PASS - GitHub baseline v52.16 approved
- Date: UNKNOWN
- Decision type: PASS
- Decision title: Approved working baseline after GitHub import into Bolt
- Affected area: GitHub, Bolt, Governance, Safety, Oskar
- Source: Backfilled from chat history; `docs/SPRINT_LOG.md`
- Summary: The v52.16 React/Vite baseline was uploaded to GitHub, imported into Bolt, and accepted as the working baseline.
- Status: Approved baseline
- Next action: Continue with the next small approved sprint.
- Reason: The imported baseline loaded correctly and previewed successfully.

### 2) APPROVE WITH FIX - Documentation test sprint needed correct repo context
- Date: UNKNOWN
- Decision type: APPROVE WITH FIX
- Decision title: Documentation test sprint required correct repo context
- Affected area: Codex, Governance, Safety
- Source: Backfilled from chat history; `docs/SPRINT_LOG.md`
- Summary: The documentation updates were useful, but Codex had used the wrong local workspace. Future tasks must use the verified `MELS-projects / mini-lovable` repo.
- Status: Approved with fix
- Next action: Use the verified repo context for future Codex work.
- Reason: Wrong workspace was a workflow risk.

### 3) PASS - Codex CLI read-only repo context test passed
- Date: UNKNOWN
- Decision type: PASS
- Decision title: Correct repo context confirmed
- Affected area: Codex, Governance, Safety
- Source: Backfilled from chat history; `docs/SPRINT_LOG.md`
- Summary: The repo path, branch, and remote were confirmed and the working tree stayed clean.
- Status: Correct repo confirmed
- Next action: Continue with controlled Codex CLI tests only.
- Reason: The repo context matched the expected `MELS-projects / mini-lovable` setup.

### 4) PASS - Codex CLI handoff-only test passed
- Date: UNKNOWN
- Decision type: PASS
- Decision title: Read-only handoff package prepared
- Affected area: Codex, Nicolas, Governance
- Source: Backfilled from chat history; `docs/SPRINT_LOG.md`
- Summary: Codex prepared a sprint handoff package without editing files.
- Status: Approved
- Next action: Continue with controlled read-only or documentation-only tests.
- Reason: The handoff-only workflow stayed within safe limits.

### 5) PASS - Codex CLI documentation-only write test passed
- Date: UNKNOWN
- Decision type: PASS
- Decision title: Documentation-only write verified
- Affected area: Codex, Governance, Safety
- Source: Backfilled from chat history; `docs/SPRINT_LOG.md`
- Summary: Codex successfully completed a narrow docs-only write task.
- Status: Approved for ChatGPT QA
- Next action: Continue with small docs-only or one-file low-risk tests.
- Reason: The change remained narrow and safe.

### 6) STOP - Reviewer/quality-score clarity sprint was reverted
- Date: UNKNOWN
- Decision type: STOP
- Decision title: Reviewer/quality-score clarity sprint stopped and reverted
- Affected area: Mini-Lovable, Safety, QA
- Source: Backfilled from chat history; `docs/SPRINT_LOG.md`
- Summary: Bolt testing showed a critical generation regression, so the sprint was reverted.
- Status: STOPPED AND REVERTED
- Next action: Stabilize the generation/recovery baseline before retrying reviewer work.
- Reason: The app could not generate a website reliably during the test.

### 7) STOP - Export/copy/save workflow clarity sprint was reverted
- Date: UNKNOWN
- Decision type: STOP
- Decision title: Export/copy/save workflow clarity sprint stopped and reverted
- Affected area: Mini-Lovable, Safety, QA
- Source: Backfilled from chat history; `docs/SPRINT_LOG.md`
- Summary: Export/copy/save changes were found to be too coupled to central app state and were reverted.
- Status: STOPPED AND REVERTED
- Next action: Keep the export/copy/save track paused until generation/recovery is stable.
- Reason: The area was not isolated enough for a safe medium implementation sprint.

### 8) STOP - Add selected roadmap step CTA sprint was reverted
- Date: UNKNOWN
- Decision type: STOP
- Decision title: Build selected roadmap step CTA stopped and reverted
- Affected area: Mini-Lovable, Safety, QA
- Source: Backfilled from chat history; `docs/SPRINT_LOG.md`
- Summary: The CTA was visible and clickable, but the continuation flow got stuck after a warning modal.
- Status: STOPPED AND REVERTED
- Next action: Run a read-only bug analysis on the generation/contact-form warning flow.
- Reason: The continuation flow did not complete safely.

### 9) WAIT - Hermes/OpenClaw remains WAIT
- Date: UNKNOWN
- Decision type: WAIT
- Decision title: Hermes/OpenClaw is not approved
- Affected area: Hermes, Governance, Safety
- Source: Backfilled from chat history; `docs/HERMES_WORKFLOW.md`, `docs/KODMACHINE_SOP.md`
- Summary: Hermes/OpenClaw is prepared for future workflow-coordinator testing only after sandboxing and verification.
- Status: WAIT
- Next action: Keep Hermes out of the active workflow until explicitly approved.
- Reason: The project still requires sandboxed verification before Hermes can be introduced.

### 10) WAIT - n8n remains inactive
- Date: UNKNOWN
- Decision type: WAIT
- Decision title: n8n is not approved for active execution
- Affected area: n8n, Governance, Safety
- Source: Backfilled from chat history; `docs/KODMACHINE_SOP.md`
- Summary: n8n may not run, publish, or connect integrations unless separately approved.
- Status: WAIT
- Next action: No n8n execution until an explicit approval sprint exists.
- Reason: Automation and external integration work stay outside the approved scope.

### 11) WAIT - Codex is limited to approved narrow tasks
- Date: UNKNOWN
- Decision type: WAIT
- Decision title: Codex is not generally approved
- Affected area: Codex, Governance, Safety
- Source: Backfilled from chat history; `docs/KODMACHINE_SOP.md`
- Summary: Codex may only work inside approved prompts and narrow scopes; it is not the product owner.
- Status: WAIT
- Next action: Use only approved prompts and keep Codex tasks narrow.
- Reason: The workflow must stay controlled and approval-gated.

### 12) WAIT - Dashboard is not approved for Sprint OS-1
- Date: UNKNOWN
- Decision type: WAIT
- Decision title: Dashboard not needed for Sprint OS-1
- Affected area: Governance, Dashboard
- Source: Backfilled from chat history; `docs/KODMASKIN_OPERATING_STATE.md`
- Summary: The operating-state snapshot does not require a dashboard change.
- Status: WAIT
- Next action: None unless a separate dashboard sprint is approved.
- Reason: This sprint is docs-only.

### 13) WAIT - Daily OS transport comes before Hermes
- Date: UNKNOWN
- Decision type: WAIT
- Decision title: Manual Daily OS Transport is active
- Affected area: Oskar, Hermes, Governance, Safety
- Source: Backfilled from chat history; `docs/KODMASKIN_OPERATING_STATE.md`
- Summary: Daily OS transport is the active path and Hermes must stay behind it until approved.
- Status: WAIT
- Next action: Keep current work text-only unless Nicolas approves otherwise.
- Reason: Daily OS must come before Hermes.

### 14) PASS - Controlled API-Assisted Workflow v1 / Sprint 3 strategic reference
- Date: UNKNOWN
- Decision type: PASS
- Decision title: Controlled API-Assisted Workflow v1 / Sprint 3
- Affected area: API, Nicolas, Thomas, Codex, Governance, Safety
- Source: Backfilled from chat history; `docs/SPRINT_LOG.md`
- Summary: Controlled API-Assisted Workflow v1 / Sprint 3 is a PASS / planning-only design reference only. No live API integration is approved. Provider path is OpenAI-first, DeepSeek is later routine-packaging test only, hybrid is deferred, input is manual/n8n-controlled text input only, output is manual inbox first, human review is required after every API output, Nicolas gate is required for YELLOW / RED / STOP / UNCLEAR or any file/log/workflow change, and Thomas final approval is required before real use beyond draft review.
- Status: PASS / planning-only
- Next action: Keep the design reference only until a separate approval is granted.
- Reason: The workflow is intentionally limited to planning, review, and safety-gated future direction.

## 2026-06-07 — First Real API Pilot Approval Package PASS

Status:
PASS / planning-only

Source:
Nicolas PASS

Summary:
First Real API Pilot Approval Package was approved as planning-only. A later separate executable pilot package is still required before any API-call, credential handling, setup, or live use.

Boundaries:
No API-call, API key, credentials/secrets, n8n credential, webhook, endpoint, automation, repo/GitHub/files beyond this log file, Codex execution beyond this approved docs-only task, dashboard, Bolt, terminal/PowerShell, install/deploy, or live use is approved.
