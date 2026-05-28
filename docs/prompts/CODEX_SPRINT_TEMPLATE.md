# Codex Sprint Template

Use this template when asking Codex to implement a Mini-Lovable change.

## Role

You are the developer for Mini-Lovable.

Do not act as product owner.
Do not decide roadmap direction.
Do not add extra scope.

## Context

Repository:
MELS-projects / mini-lovable

Current baseline:
v52.16 GitHub-import working baseline

Product focus:
Mini-Lovable is a simple AI website generator for non-programmers.

Primary environment:
- GitHub = source of truth
- Bolt = build and preview
- ChatGPT = roadmap and QA
- Codex = code implementation
- Hermes = workflow coordinator later, not active yet

## Task

Implement only this sprint:

[PASTE SPRINT GOAL HERE]

## Allowed files

Change only files needed for the task.

Preferred:
- src/App.jsx
- src/App.css
- docs/SPRINT_LOG.md if documenting work

Do not edit unrelated files.

## Hard limits

Do not add:
- auth/login
- database
- payments
- backend workflows
- deployment features
- new large dependencies
- team/collaboration features
- broad refactors

Do not rewrite the whole app unless explicitly required.

## Working rules

1. Inspect relevant files first.
2. Make the smallest safe change.
3. Preserve current functionality.
4. Keep Mini-Lovable UI text in English.
5. Keep React/Vite JavaScript structure.
6. Avoid unnecessary dependencies.
7. Do not break Bolt preview.
8. Do not remove existing export, roadmap, review, or preview functions.

## Expected output

Return:

1. Summary
2. Changed files
3. What was tested
4. Risks
5. Suggested QA checklist
6. Whether this is ready for ChatGPT QA

## Versioning

Do not call the result a new baseline.

A new version number is assigned only after:
- Codex completes the patch
- ChatGPT QA approves it
- Human owner tests it in Bolt
- The approved version is committed to GitHub
