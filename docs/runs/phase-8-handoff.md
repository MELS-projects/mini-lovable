# Kodmaskin Run Handoff — MVP Phase 8

Run id: `kodmachine-phase-8-trace-001`
Trace id: `mini-lovable-phase-8-artifact-executor-report`

## Phase

MVP Phase 8 — Real Handoff Artifact → Executor Run → Report Trace

## Goal

Create and use a real repo-local handoff artifact as input for a Mini-Lovable executor run. The executor must make a practical Mini-Lovable change, verify it with smoke-run/build, and report the result back against this same run id / trace id.

## Allowed files

- `docs/runs/phase-8-handoff.md`
- `src/App.jsx`

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

## Smoke-run requirement

The executor must run:

```bash
npm run smoke-run
```

The run is not approval-ready unless smoke-run reports PASS. `npm run build` is required separately only if smoke-run does not clearly show that build was executed.

## Approval rule

- Commit only after Thomas approval.
- Push only after Thomas explicit push approval.
- If approved, commit + push must happen in the same approval flow.

## Expected return format

The executor report must include:

1. Active profile
2. Summary
3. Files updated
4. Handoff trace
5. Tests/build/smoke
6. Visual verification
7. Fix rounds
8. Later backlog
9. Git status
10. Blockers
11. Next Thomas decision
12. Job status

## Executor instruction

Use this artifact as the source input for the Phase 8 executor run. Update Mini-Lovable so the UI shows a visible run trace:

- run id
- source handoff artifact
- executor result
- smoke-run status
- approval status

Keep the implementation static/demo-based. Do not add real API, DeerFlow, Multica, GitHub, deploy, or secrets integration.
