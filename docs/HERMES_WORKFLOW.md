# Hermes Workflow

Hermes is planned as a workflow coordinator for Mini-Lovable.

Hermes should not replace ChatGPT, Codex, GitHub, or Bolt.

## Roles

ChatGPT:
- product owner
- roadmap planner
- QA reviewer
- final decision-maker

Codex:
- developer
- implements narrow code changes
- returns changed files, summary, tests, and risks

Hermes:
- workflow coordinator
- reads project docs
- prepares sprint briefs
- packages handoffs between ChatGPT and Codex
- updates sprint notes when instructed
- does not decide product direction
- does not freely rewrite code

Bolt:
- build and preview environment
- used for manual testing

GitHub:
- source of truth
- version history
- approved baseline storage

## Safe Hermes access

Hermes should only access the Mini-Lovable repository working copy.

Allowed:
- read project docs
- read source files
- prepare sprint briefs
- prepare QA packages
- suggest next actions

Not allowed without explicit approval:
- editing src/App.jsx
- deleting files
- adding dependencies
- changing product scope
- adding backend/auth/database/payment features
- accessing unrelated folders on the computer
- storing API keys in files

## Standard workflow

1. ChatGPT creates or approves sprint direction.
2. Hermes reads project docs.
3. Hermes prepares a Codex-ready sprint brief.
4. Human owner sends or approves the Codex task.
5. Codex implements the change.
6. Hermes packages changed files, summary, test status, and risks.
7. ChatGPT performs QA.
8. Human owner tests in Bolt.
9. If approved, the change is committed to GitHub as a new baseline.

## First Hermes test

The first Hermes task should be read-only:

Read:
- AGENTS.md
- docs/ROADMAP.md
- docs/CURRENT_STATE.md
- docs/QA_CHECKLIST.md
- docs/GROUND_ZERO.md
- docs/SPRINT_LOG.md

Task:
Create a proposed next sprint brief.

Rules:
- Do not edit code.
- Do not modify src/App.jsx.
- Do not add dependencies.
- Do not change product scope.
- Return only a short sprint brief with goal, scope, risks, and acceptance criteria.

## Decision rule

Hermes may recommend.
ChatGPT decides.
Human owner approves.
Codex codes.
Bolt tests.
GitHub stores the approved version.
