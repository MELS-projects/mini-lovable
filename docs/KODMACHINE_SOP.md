# Kodmaskin Oskar SOP

## 1. Purpose

This document defines the standard operating procedure for Kodmaskin Oskar.

The goal is to keep the project practical, safe, and repeatable while moving toward higher autonomy.

This SOP should guide how ChatGPT, Oskar, Codex, GitHub, Bolt, and future orchestrator tools work together.

## 2. Project goal

Kodmaskin Oskar is the main project.

The long-term goal is to build a reusable AI coding machine that can help create SaaS products, fullstack apps, prototypes, automation tools, websites, webshops, and live products.

The target is level 5 autonomy over time:

* AI can help plan sprints.
* AI can read approved project context.
* AI can prepare implementation handoffs.
* AI can write code through approved agents.
* AI can test and summarize results.
* AI can prepare branches, commits, PRs, documentation, and releases.
* The human owner mainly approves direction, risk, and final outcomes.

Autonomy must increase gradually and safely.

## 3. Project hierarchy

Kodmaskin Oskar is the main project.

Mini-Lovable is the first validation and training project.

Mini-Lovable should be used to test and improve the Kodmaskin workflow, but Oskar must not be overfitted only to Mini-Lovable.

When priorities conflict:

1. Build and improve Kodmaskin Oskar.
2. Use Mini-Lovable as the first validation project.
3. Avoid unnecessary Mini-Lovable UI polish when the current focus is workflow.

## 4. Operating model

Current proven workflow:

ChatGPT -> Oskar -> Codex -> GitHub -> Bolt -> ChatGPT QA -> Documentation

Current safe default:

* ChatGPT defines direction, sprint scope, architecture, QA criteria, and approval.
* Oskar prepares workflow handoffs and keeps sprint structure consistent.
* Codex performs narrow approved tasks.
* GitHub remains the source of truth.
* Bolt is used for preview and visual testing.
* PowerShell remains a temporary manual bridge for approved Git actions.
* Hermes/OpenClaw remains WAIT until sandboxed and verified.

## Planning-only governance approval rule

When Nicolas approves a planning-only governance sprint, Oskar should only produce the next concrete rule or decision point.

Oskar must not create:

- Codex prompts
- dashboard sprints
- file changes
- app code changes
- Hermes/OpenClaw actions
- VM/WSL/Docker/cloud setup steps

A documentation-only sprint may be recommended only when Oskar states:

1. the exact allowed document
2. the exact placement
3. the exact forbidden areas
4. why documentation is needed
5. confirmation that there will be no app code, no dashboard, and no Codex until Nicolas approves the exact document edit

## n8n Communication Hub v1 read-only operating rule

n8n Communication Hub v1 may operate only as a manual secretary/router.

Allowed:

- Receive one pasted message from Thomas
- Preserve the original message
- Identify receiver using the approved routing priority rule
- Return one ROUTING PACKET
- Add routing metadata only

Routing priority:

1. Explicit "Thomas → [role]" overrides all other routing signals.
2. Explicit "TO: [role]" is second priority.
3. Message type / classification is third priority.
4. If unclear, route to Nicolas for QA.

Forbidden:

- No secrets
- No API keys
- No repo access
- No GitHub read/write
- No Codex automation
- No Bolt automation
- No dashboard update
- No file changes
- No terminal/PowerShell
- No external actions
- No Hermes/OpenClaw
- No VM/WSL/Docker/cloud

Stop condition:

If routing is unclear, unsafe, or suggests implementation, route to Nicolas for QA.

## n8n Communication Hub v1 Simple Input Rule

n8n Communication Hub v1 should only be used with simple manual inputs.

Allowed simple input:

- one explicit receiver
- one task
- no nested wrappers
- no test prompt inside another test prompt
- no mixed Nicolas/Oskar/Thomas instructions
- no Codex request
- no dashboard request
- no file change request
- no external action request

Required input format:

FROM: Thomas
TO: [Oskar / Nicolas]
TYPE: [Planning-only / QA request / Route decision]

MESSAGE:
[one clear message]

If input is unclear, nested, or asks for action outside the secretary/router role, route to Nicolas for QA.

## Oskar Session Start Packet v1

Use this format at the start of a new Kodmaskin/Oskar session.

OSKAR SESSION START PACKET v1

Current status:
[...]

Active route:
[Nicolas / Oskar / Codex / Dashboard / Bolt / PowerShell / Stop]

Forbidden actions:
- No Codex unless Nicolas approved
- No dashboard unless Nicolas approved
- No file changes unless Nicolas approved
- No external actions
- No Hermes/OpenClaw
- No VM/WSL/Docker/cloud
- No secrets/API keys
- No terminal/PowerShell unless explicitly approved

Next decision point:
[...]

Codex needed?
YES / NO / AFTER NICOLAS APPROVES

Dashboard needed?
YES / NO / AFTER NICOLAS APPROVES

Thomas next action:
[one exact action]

## Oskar Daily Operating Loop v1

Use this daily loop for manual Kodmaskin/Oskar work.

1. Start session  
Thomas starts with `Oskar Session Start Packet v1`.

2. Send simple input  
Thomas sends one simple input through n8n:

```text
FROM: Thomas
TO: [Oskar / Nicolas]
TYPE: [Planning-only / QA request / Route decision]

MESSAGE:
[one clear message]
```

3. Route packet
   n8n returns one `ROUTING PACKET`.

4. Oskar decision
   If receiver is Oskar, Oskar returns one next decision point or one Nicolas QA request.

5. Nicolas gate
   If approval is needed, Thomas sends the QA request to Nicolas.

6. Nicolas result
   Nicolas returns `APPROVE`, `APPROVE WITH FIX`, or `STOP`.

7. Stop conditions
   Stop and route to Nicolas if:

* route is unclear
* same receiver repeats
* no new decision exists
* automation is suggested
* Codex, dashboard, GitHub, PowerShell, file changes, secrets, external actions, Hermes/OpenClaw, VM/WSL/Docker/cloud appear without Nicolas approval

## Oskar Workday Closeout Packet v1

Use this format to end each Kodmaskin/Oskar work cycle.

```text
OSKAR WORKDAY CLOSEOUT PACKET v1

Current status:
[...]

Latest commit:
[commit hash / none / unknown]

Repo status:
[clean / dirty / unknown]

Open decisions:
- [...]

Next start point:
[...]

Codex needed?
YES / NO / AFTER NICOLAS APPROVES

Dashboard needed?
YES / NO / AFTER NICOLAS APPROVES

Thomas next action:
[one exact action]
```

## n8n Safety Stop Rules v1

n8n Communication Hub v1 must stop routing and route to Nicolas for QA when a message risks creating loops, repeated routing, or unauthorized escalation.

Stop rules:

1. Max loop count  
If the same message or decision has passed through n8n/Oskar/Nicolas more than 2 times without a new decision, stop and route to Nicolas for QA.

2. Same receiver repeat  
If n8n routes to the same receiver twice in a row with no new instruction, stop and route to Nicolas for QA.

3. No new decision  
If the message only repeats an already approved rule, status, or packet without asking for a new decision, return:
`STOP — no new decision needed.`

4. Forbidden trigger  
If the message suggests Codex, dashboard, GitHub write, PowerShell, file changes, secrets, external actions, Hermes/OpenClaw, VM/WSL/Docker/cloud, or automation escalation without Nicolas approval, stop and route to Nicolas for QA.

5. Human approval gate  
n8n must never convert a routing packet into implementation. It may only route. Any move from planning-only to documentation, Codex, dashboard, Git, PowerShell, Bolt automation, or external action requires explicit Nicolas approval.

## 5. Role model

### Human owner

The human owner is the final authority.

The owner approves:

* direction
* risk level
* commits and pushes
* releases
* autonomy increases
* production access
* high-risk permissions

### ChatGPT

ChatGPT is the project lead, architect, roadmap owner, security reviewer, and QA gate.

ChatGPT decides whether work is:

APPROVE
APPROVE WITH FIX
STOP

ChatGPT must protect the baseline, prevent scope creep, and keep the workflow moving toward safe autonomy.

### Oskar Core

Oskar Core is the orchestrator / AI tech lead layer.

Oskar Core prepares sprint handoffs, checks workflow discipline, coordinates specialist roles, and packages work for ChatGPT QA.

Oskar Core should not become one monolithic super-agent.

### Codex

Codex is the implementation agent.

Codex should make narrow, approved changes only.

Codex must not decide roadmap, product strategy, release readiness, or autonomy level.

### GitHub

GitHub is the source of truth.

Accepted code, documentation, templates, and workflow state must end up in GitHub.

### Bolt

Bolt is the preview and visual test environment.

Bolt is not the source of truth.

### Hermes/OpenClaw

Hermes/OpenClaw may later become a workflow coordinator, but remains WAIT until properly verified and sandboxed.

## 6. Oskar Core + specialist-agent model

Oskar should be built as:

Oskar Core + specialist agents

Oskar Core should act as the orchestrator / AI tech lead.

Specialist roles may include:

* Frontend-Oskar
* Backend-Oskar
* QA-Oskar
* DevOps-Oskar
* Docs-Oskar
* Security-Oskar
* Data/AI-Oskar
* Product-Oskar

Specialists should be introduced gradually.

Each specialist must have:

* clear responsibility
* limited file access
* explicit allowed actions
* explicit forbidden actions
* clear QA criteria
* stop conditions
* ChatGPT QA review

No specialist should receive broad access before passing smaller controlled tests.

## 7. RACI responsibility matrix

| Area | Human owner | ChatGPT | Oskar Core | Specialist agent | Codex | GitHub/Bolt |
| ---- | ----------- | ------- | ---------- | ---------------- | ----- | ----------- |
| Product direction | A | R | C | C | I | I |
| Sprint scope | A | R | C | C | I | I |
| Handoff preparation | I | A | R | C | C | I |
| Code implementation | I | A | C | C | R | I |
| Documentation update | I | A | C | R | R | I |
| QA decision | A | R | C | C | I | I |
| Commit/push approval | A | R | C | I | I | C |
| Preview/testing | C | A | C | C | C | R |
| Security/risk review | A | R | C | C | I | I |
| Autonomy increase | A | R | C | I | I | I |

Legend:

* R = Responsible
* A = Accountable
* C = Consulted
* I = Informed

## 8. Current workflow

Current standard workflow:

1. ChatGPT creates a narrow sprint plan.
2. Oskar prepares a structured handoff.
3. Codex executes only after ChatGPT approves the plan.
4. Codex returns a QA handoff package.
5. ChatGPT reviews the result.
6. ChatGPT returns APPROVE, APPROVE WITH FIX, or STOP.
7. Human owner commits and pushes approved changes.
8. GitHub stores the accepted state.
9. Bolt previews relevant UI/runtime changes.
10. Documentation is updated in a separate sprint when needed.

## 9. Sprint rules

Every sprint must include:

* sprint name
* goal
* allowed files
* forbidden files
* hard limits
* required work
* expected output
* QA criteria
* test plan
* risk summary
* suggested commit message

Default rule:

Small change -> Review -> Test -> Commit -> Document -> Next sprint

Do not combine unrelated changes.

Do not create broad refactors.

Do not create a new version or baseline unless explicitly approved.

## 10. QA rules

Every meaningful sprint result must receive one ChatGPT QA decision:

APPROVE
APPROVE WITH FIX
STOP

### APPROVE

Use when the goal is satisfied, only allowed files changed, no new risk was introduced, and the result is ready for the next step.

### APPROVE WITH FIX

Use when the work is mostly correct but needs a small, clear correction.

### STOP

Use when wrong files were changed, repo context is wrong, scope expanded, secrets may be exposed, or the result cannot be trusted.

Codex and specialist agents must not approve their own work.

## 11. GitHub rules

GitHub is the source of truth.

Rules:

* Do not treat Bolt as source of truth.
* Do not treat local files as accepted until reviewed and committed.
* Do not push without ChatGPT QA approval and human confirmation.
* Do not merge without explicit approval.
* Do not rewrite Git history without explicit approval.
* Always verify repo context before important work.

Correct Mini-Lovable repo:

https://github.com/MELS-projects/mini-lovable.git

Correct local path:

C:\Users\ThomasOlsson\Documents\Projects\mini-lovable

### Roadmap Dashboard Update Rule

The Kodmaskin roadmap dashboard is a GitHub Pages based status view.

Live dashboard URL:
https://mels-projects.github.io/mini-lovable/dashboard/

Dashboard files:

- dashboard/index.html
- dashboard/roadmap-status.json

GitHub remains the source of truth. The dashboard is a visual status layer only.

The dashboard is not automatically updated from commits yet. After relevant approved Kodmaskin or Mini-Lovable sprint changes, ChatGPT must decide whether dashboard/roadmap-status.json should be updated.

Dashboard updates should usually be handled as a separate sprint from app/code changes.

#### Responsibility

ChatGPT is responsible for deciding whether a dashboard update is needed after relevant approved sprint changes.

Codex/Oskar may update dashboard/roadmap-status.json only after ChatGPT approves a specific dashboard update sprint.

ChatGPT QA must review the dashboard JSON change before commit/push.

Thomas performs commit/push through PowerShell/Git unless the workflow changes later.

After push, GitHub Pages updates the live dashboard.

#### When dashboard update is needed

Consider updating dashboard/roadmap-status.json when a sprint affects:

- roadmap position
- current phase
- sprint status
- next sprint
- major workflow status
- Hermes/OpenClaw status
- Codex/Oskar workflow maturity
- dashboard-relevant milestones

#### When dashboard update should be skipped

Skip dashboard updates when a sprint does not affect:

- roadmap position
- phase
- sprint status
- next sprint
- major workflow status

Small documentation-only entries, typo fixes, minor notes, and implementation details should not automatically trigger a dashboard update.

#### Dashboard update workflow

1. ChatGPT decides whether a dashboard update is needed.
2. If needed, ChatGPT creates a narrow dashboard update sprint.
3. Allowed file should normally be:
   - dashboard/roadmap-status.json
4. Codex/Oskar updates only the approved dashboard file.
5. ChatGPT QA reviews the JSON change.
6. Thomas commits and pushes through PowerShell/Git after approval.
7. GitHub Pages updates the live dashboard after push.
8. If the dashboard view needs layout changes, that should be a separate sprint for dashboard/index.html.

#### Safety rules

- Do not update dashboard files inside unrelated app/code sprints unless explicitly approved.
- Do not treat the dashboard as source of truth.
- Do not use GitHub API yet.
- Do not add backend, database, dependencies, or automation without a separate approved sprint.
- Do not create a new product version or baseline from a dashboard-only update.

## 12. Bolt rules

Bolt is used for preview and visual testing.

Bolt should verify:

* app loads
* preview is not blank
* expected UI change is visible
* no obvious layout break
* no runtime error appears
* relevant user flow still works

Bolt sync status is lower-trust than GitHub content and actual preview behavior.

If Bolt sync fails, use the approved fallback order:

1. Try normal sync/refresh.
2. Import from GitHub URL.
3. Manually copy the relevant file from GitHub to Bolt only when needed for visual testing.

## 13. Security rules

Security principles:

* Use least access first.
* Read-only before write access.
* Documentation write before code write.
* Code write before commit automation.
* Commit automation before PR automation.
* PR automation before deployment automation.
* No broad machine access.
* No secrets access unless explicitly approved.
* No production keys in early agent workflows.
* No dependency install without approval.
* No deployment without approval.

Agents must not read or edit:

* .env
* .env.local
* .env.production
* API keys
* tokens
* browser credentials
* private folders
* unrelated repositories
* customer data

If a task requires secrets or broader access, stop and ask for approval.

## 14. Stop conditions

Stop immediately if:

* repo context is wrong or unclear
* branch or remote is wrong
* unexpected files are modified before work starts
* a forbidden file must be changed
* secrets or .env access is needed
* package installation is needed but not approved
* GitHub push/merge is requested without approval
* task requires broad refactor
* agent needs access outside the approved repo
* scope expands beyond the sprint
* Hermes/OpenClaw installation is suggested without explicit approval

## 15. Definition of Done

A sprint is done only when:

* the sprint goal is satisfied
* only allowed files changed
* forbidden files were not touched
* working tree before/after status is reported
* tests/checks are reported
* risks are documented
* ChatGPT QA has approved or given next action
* human owner has committed/pushed if needed
* GitHub contains the accepted state
* Bolt preview is checked when relevant
* sprint documentation is updated when needed

A new product version or baseline is created only when explicitly approved.

## 16. Future Hermes/OpenClaw role

Hermes/OpenClaw remains WAIT.

Future role may be:

* read approved repo documentation
* summarize repo state
* prepare Codex-ready sprint briefs
* package Codex output for ChatGPT QA
* summarize git diff and test results
* prepare sprint log updates
* prepare commit messages
* later coordinate branch/PR workflows

Hermes/OpenClaw must not initially:

* freely edit code
* push to GitHub
* merge branches
* deploy
* read secrets
* access unrelated folders
* install dependencies without approval
* act as product owner
* decide roadmap
* decide release readiness

First Hermes/OpenClaw test must be read-only and sandboxed.

## 17. Current status

Current status:

* Mini-Lovable UI track is paused.
* Kodmaskin workflow is the current focus.
* Codex CLI has passed controlled read-only and limited write tests.
* Handoff and QA templates are being improved.
* GitHub remains source of truth.
* Bolt remains preview/test environment.
* ChatGPT remains project lead and QA gate.
* Hermes/OpenClaw remains WAIT.
