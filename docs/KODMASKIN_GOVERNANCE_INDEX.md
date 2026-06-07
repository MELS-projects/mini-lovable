# Kodmaskin Governance Index

Short map for finding the right Kodmaskin governance document quickly. This index is a guide only and does not override the underlying documents.

## Startup Protocol

At session start, agents should check:

1. `docs/KODMASKIN_GOVERNANCE_INDEX.md`
2. `docs/KODMASKIN_OPERATING_STATE.md`
3. `docs/KODMASKIN_NEXT_ROADMAP.md`
4. `docs/KODMASKIN_SAFETY_BOUNDARIES.md`
5. `docs/KODMASKIN_ROLE_RULES.md`
6. `docs/KODMASKIN_DECISION_LOG.md` when checking prior decisions

## Governance Documents

### docs/KODMASKIN_OPERATING_STATE.md
- Purpose: Current operating mode, active rules, closed tracks, WAIT tracks, and next allowed step.
- When to read: At the start of a session or when checking the current operating snapshot.
- Main role: Oskar, Thomas, Nicolas

### docs/KODMASKIN_DECISION_LOG.md
- Purpose: Important Kodmaskin decisions, reasons, affected areas, and preserved next actions.
- When to read: When checking what has already been decided or backfilled from history.
- Main role: Thomas, Project Lead, Nicolas, Oskar

### docs/KODMASKIN_ROLE_RULES.md
- Purpose: Role ownership, boundaries, and routing rules.
- When to read: When confirming who owns strategy, QA, routing, implementation, or approval.
- Main role: Thomas, Project Lead, Oskar, Nicolas, Codex

### docs/KODMASKIN_SAFETY_BOUNDARIES.md
- Purpose: Safety boundaries, approval gates, forbidden actions, access ladder, and escalation rules.
- When to read: Before any sensitive, higher-risk, or approval-gated action.
- Main role: Thomas, Nicolas, Codex, future Hermes/n8n

### docs/KODMASKIN_NEXT_ROADMAP.md
- Purpose: The next major Kodmaskin roadmap direction and large roadmap batches.
- When to read: When planning the next large roadmap path instead of micro-sprints.
- Main role: Thomas, Project Lead, Nicolas, future Hermes/n8n

## Recordkeeping Rule

- Ordinary sprint result -> `docs/SPRINT_LOG.md` or future `KODMASKIN_SPRINT_LOG.md`
- Strategic PASS / STOP / WAIT / APPROVE WITH FIX -> `docs/KODMASKIN_DECISION_LOG.md`
- Current status changes -> `docs/KODMASKIN_OPERATING_STATE.md`

## Current Preserved Next Action

Do not start API-2, API-3, Hermes, webhook, automation, Codex, repo/file work, terminal/PowerShell, secrets, or deployment until separately approved.

## Index Rule

This index is a map only. It must not override the content of the underlying governance documents.

## Historical Marker

Created after 5-log governance backfill chain.
