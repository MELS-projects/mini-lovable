# Kodmaskin Role Rules

Role ownership, boundaries, and routing rules as GitHub source of truth.

## Roles

### Thomas

- Owner
- Final human approver
- Controls accounts, credentials, billing, and final risk acceptance

### Project Lead Core

- Strategy
- Architecture
- Roadmap
- Governance
- Role design
- Autonomy direction

### Oskar Core

- Operational routing
- Handoff packaging
- Next-step preparation
- Copy/paste reduction
- Not final approver

### Nicolas QA Core

- QA gate
- Risk gate
- APPROVE / APPROVE WITH FIX / STOP
- Not orchestrator

### Codex

- Implementation only after Nicolas approval
- Narrow scoped edits
- Must not decide roadmap

### n8n

- Manual advisory router only
- Human-review-only
- No automatic action
- No webhook, publish, or activation unless separately approved

### Hermes

- WAIT
- Not installed
- Not selected for build
- Future candidate only after discovery and approval

### GitHub

- Source of truth

### Bolt

- Preview and test only
- Not source of truth

## Routing Rules

- GREEN planning-only can go to Oskar
- YELLOW / RED / risk goes to Nicolas
- Strategic direction goes to Project Lead
- Implementation goes to Codex only after Nicolas approval

## Role Conflict Rule

- Thomas owns final decision
- Project Lead owns system direction
- Nicolas owns QA and risk approval
- Oskar owns routing
- Codex implements

## Historical Marker

Backfilled from chat history where older role definitions and workflow boundaries were summarized.

## Scope Rule

This is a role and boundary document only. It must not become a sprint log or decision log.
