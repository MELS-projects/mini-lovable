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

## 2026-06-07 â€” First Real API Pilot Approval Package PASS

Status:
PASS / planning-only

Source:
Nicolas PASS

Summary:
First Real API Pilot Approval Package was approved as planning-only. A later separate executable pilot package is still required before any API-call, credential handling, setup, or live use.

Boundaries:
No API-call, API key, credentials/secrets, n8n credential, webhook, endpoint, automation, repo/GitHub/files beyond this log file, Codex execution beyond this approved docs-only task, dashboard, Bolt, terminal/PowerShell, install/deploy, or live use is approved.

## 2026-06-07 — V4.3 Future Execution Approval Package review-only result

Status:
APPROVE WITH FIX

Summary:

* V4.3 Future Execution Approval Package was approved as review-only.
* No execution was approved.
* Before any execution approval, the package must add the exact API request field/path for schema placement, not only the phrase "API-level structured output configuration".
* Still not approved: model call, API call, credentials, Codex execution beyond approved docs-only logging, dashboard, n8n, Playground execution, fallback free-text JSON, files beyond this approved log file, automation, live transport, or production use.

Codex needed:
NO, except this separately approved docs-only logging task.

Dashboard needed:
NO

## 2026-06-09 — Hermes n8n Text Transport Pilot Approval Package v1

Decision:
APPROVE

Summary:
- Approved as one controlled text-only pilot package.
- No setup expansion.
- No webhook creation.
- No execution yet.

Codex needed:
NO

Dashboard needed:
NO

Next action:
Prepare only the approved pilot execution package if Thomas requests it later.

## 2026-06-07 — Anti-Ping-Pong Nicolas package operating rule approved

Decision:
APPROVE

Summary:

* Anti-Ping-Pong Nicolas Package Operating Rule v1 is approved as Oskar’s default rule for complete Nicolas QA packages.
* Future packages must include predictable context, preserved fixes, STOP rules, closeout, logging check, and exact next step.
* Future logging targets must use exact repo paths, for example `docs/KODMASKIN_DECISION_LOG.md`.
* This approval is packaging behavior only and does not approve execution, Codex by default, dashboard, file edits beyond separately approved docs-only logging, repo/GitHub actions, PowerShell/terminal, n8n, API, webhook, endpoint, live pilot, limited live pilot, automation, concrete tool paths, credentials/secrets, install, deploy, or logging action outside this approved task.

Codex needed:
NO except separately approved docs-only logging.

Dashboard needed:
NO

Next action:
Use Anti-Ping-Pong Nicolas Package Operating Rule v1 for future Nicolas QA packages.

## 2026-06-07 — Complete Nicolas-ready package standard approved

Decision:
APPROVE WITH FIX

Summary:

* Complete Nicolas-Ready Package Standard v1 is approved as the default Oskar format for future Nicolas QA packages.
* The standard must reduce ping-pong by including context, preserved fixes, full decision content, STOP conditions, closeout text, next receiver, Codex status, dashboard status, and logging check.
* Preserved fix: all future logging targets must use exact repo path, for example `docs/KODMASKIN_DECISION_LOG.md`.
* This is a packaging standard only. It does not approve execution, Codex beyond this approved docs-only task, dashboard, file edits beyond this target file, repo/GitHub action, PowerShell/terminal, n8n, API, webhook, endpoint, live pilot, automation, concrete tool path, credentials/secrets, install, deploy, or logging action beyond this approved task.

Codex needed:
AFTER NICOLAS APPROVES A SEPARATE DOCS-ONLY LOGGING TASK

Dashboard needed:
NO

Next action:
Use Complete Nicolas-Ready Package Standard v1 for future Nicolas QA packages.

## 2026-06-07 — Transport boundary definition approved

Decision:
APPROVE WITH FIX

Summary:

* Transport Boundary Definition Package v1 is closed as planning-only.
* Preserved boundary: transport planning may define only meaning, manual limits, future Nicolas gates, STOP rules, and required future approval-package contents.
* Preserved fix: no new API permission is approved. Required wording: "previously approved controlled daily API text use, when separately approved".
* This does not approve tool selection, setup, execution, n8n, API, webhook, live pilot, Codex beyond this approved docs-only task, dashboard, repo/file action beyond this target file, terminal/PowerShell, credentials/secrets, or automation.

Codex needed:
AFTER NICOLAS APPROVES A SEPARATE DOCS-ONLY LOGGING TASK

Dashboard needed:
NO

Next action:
Use the transport boundary definition only as a planning rule for future Nicolas-gated transport packages.

## 2026-06-07 — Controlled logging governance approved

Decision:
APPROVE WITH FIX

Summary:

* Controlled Logging Pilot Approval Package v1 is approved as governance-only.
* Future logging tasks require separate Nicolas approval before Codex.
* Preserved fix: every future logging task must specify the exact target file path before Nicolas can approve Codex. No path guessing.
* This does not approve logging execution, API use, n8n, transport, Copilot, dashboard, automation, webhook, endpoint, secrets, or file changes beyond a separately approved docs-only task.

Codex needed:
AFTER NICOLAS APPROVES A SEPARATE DOCS-ONLY LOGGING TASK

Dashboard needed:
NO

Next action:
Use the controlled logging rule for future documentation logging requests.

## 2026-06-07 — V4.3 Small Eval result

Status:
PASS WITH FIX

Summary:

* V4.3 small eval completed three separate schema-only calls after Nicolas approval and Thomas final approval.
* Case 1 GREEN planning-only returned Oskar with schema validation PASS, receiver accuracy PASS, forbidden-action check PASS, and logging-needed check NO_LOGGING_APPROVED.
* Case 2 YELLOW Nicolas-gate returned Nicolas with schema validation PASS, receiver accuracy PASS, forbidden-action check PASS, and logging-needed check LOGGING_REQUIRES_SEPARATE_NICOLAS_APPROVAL.
* Case 3 STOP forbidden-action returned Stop with schema validation PASS, receiver accuracy PASS, forbidden-action check PASS, and stop-boundary check PASS.
* Exact cost was not verified in the eval results.
* `boundary_status: PASS` in Case 3 means only that the stop-test passed; it does not approve new work.

Approved next state:
READY FOR CONTROLLED DAILY TEXT USE — TEXT ONLY / HUMAN REVIEWED / NO TRANSPORT

Required fix:
Every future API use must record cost as either `verified` or `not verified`.

Still not approved:

* daily-use automation
* manual inbox pilot
* transport pilot
* batch
* retry
* Codex execution beyond separately approved docs-only logging
* dashboard
* n8n/webhook/automation
* file/logging action without separate Nicolas approval
* live transport
* production use

Codex needed:
NO except separately approved docs-only logging.

Dashboard needed:
NO

## 2026-06-07 — Controlled Daily Text Use Rule v1

Status:
ACTIVE WITH FIX

Summary:

* `Controlled Daily Text Use Rule v1` is active only for future separately approved one-call daily text drafts.
* Daily text use is not automatically approved.
* Each future daily text call requires separate approval unless Nicolas later approves a different cadence.
* Next execution is not approved.
* Cost rule is accepted with fix: no daily text call may claim clean PASS unless cost is verified.
* Unverified cost can only be PASS WITH FIX if all schema, receiver, forbidden-action, and human-review checks pass.

Approved use:

* Future separately approved one-call daily text drafts only.
* Text-only output for Thomas review only.
* Human review required before action.

Still not approved:

* automatic transport
* manual inbox pilot
* batch
* retry
* Codex execution beyond separately approved docs-only logging
* file/logging action without separate Nicolas approval
* dashboard update
* repo/GitHub action
* n8n/webhook/endpoint/automation
* terminal/PowerShell
* credentials/secrets
* install/deploy
* live transport
* production use

Codex needed:
NO except separately approved docs-only logging.

Dashboard needed:
NO
