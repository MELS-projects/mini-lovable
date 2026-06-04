# Oskar Codex QA Chain

## Purpose
This document summarizes the approved Oskar → Nicolas → Codex → QA chain for small docs-only Codex sprints.

## Chain
1. Oskar proposes a narrow sprint.
2. Nicolas approves / approves with fix / stops.
3. Codex acts only after Nicolas approval.
4. Codex returns changed file summary.
5. Oskar/Project Lead prepares QA closeout.
6. Nicolas or Project Lead confirms completion when needed.

## Codex Requirements
- Exact allowed file must be defined.
- Forbidden files/actions must be defined.
- Hard limits must be defined.
- Expected output must be defined.
- QA criteria must be defined.
- Commit message must be defined.
- Codex must not commit or push unless explicitly approved.

## Stop Conditions
- File scope unclear.
- Codex asked to edit extra files.
- App code involved.
- Dashboard involved.
- n8n/webhook involved.
- Credentials/secrets involved.
- Terminal/GitHub/external actions involved.
- Risk unclear.

## GREEN Closeout
Recommended route: Stop
Reason: Docs-only Codex sprint completed and approved.
Next task source: Thomas / Project Lead
