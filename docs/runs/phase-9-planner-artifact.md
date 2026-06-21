# Kodmaskin Planner Artifact — MVP Phase 9

Run id: `kodmachine-phase-9-plan-001`
Phase: Phase 9 — Planner-generated Artifact → Executor Run → Report Artifact

## Goal

Bevisa kedjan: planner skapar faktisk run-artifact → executor läser artifact → executor genomför Mini-Lovable-ändring → smoke-run/build → report-artifact skrivs tillbaka → approval-gate.

## Planner decision

Phase 9 ska lägga till en ny trace-sektion i Mini-Lovable UI som visar hela artifact-kedjan. Detta är nästa nivå efter Phase 8 (som visade en enkel run trace).

Nya trace-sektionen ska visa:
- Planner artifact (docs/runs/phase-9-planner-artifact.md)
- Executor run bekräftar att artifact lästes och följdes
- Report artifact (docs/runs/phase-9-report-artifact.md)
- Smoke-run gate (PASS/FAIL)
- Thomas approval gate (Waiting / Approved)

## Allowed files

- `docs/runs/phase-9-planner-artifact.md`
- `src/App.jsx`
- `docs/runs/phase-9-report-artifact.md`

## Forbidden areas

- Chattis
- Kodmaskin governance files outside Mini-Lovable
- external services
- secrets or credentials
- deploy/release setup
- real GitHub/API integration
- real DeerFlow or Multica integration
- package/dependency changes
- broad refactors

## Test requirements

1. `npm run smoke-run` — must report PASS
2. UI visar Phase 9 artifact-kedjan korrekt i browser
3. `git diff --stat` visar endast tillåtna filer

## Approval rule

- Commit only after Thomas approval
- Push only after Thomas explicit push approval
- If approved, commit + push must happen in the same approval flow

## Expected executor output

1. Phase 9 trace-sektion syns i Mini-Lovable UI
2. Smoke-run PASS
3. Report artifact skapad på docs/runs/phase-9-report-artifact.md
4. Alla ändringar är inom tillåtna filer
