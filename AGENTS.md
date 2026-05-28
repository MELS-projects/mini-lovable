# AGENTS.md

## Project role

This repository contains Mini-Lovable, a simple AI website generator for non-programmers.

The product should stay focused on:
- premium website generation
- simple React/Vite output
- roadmap-based building
- preview
- review/QA
- export

Do not turn this into a full-stack app builder.

## Agent roles

ChatGPT:
- product owner
- roadmap planner
- QA reviewer
- sprint decision-maker

Codex:
- developer only
- implements narrow code changes
- does not decide product direction

Hermes:
- workflow coordinator
- reads project docs
- prepares sprint briefs
- organizes handoff between ChatGPT, Codex, GitHub, and Bolt
- should not freely rewrite code

Human owner:
- approves or rejects changes
- tests in Bolt
- controls releases

## Core rules

- Make the smallest safe change.
- Do not rewrite unrelated parts.
- Do not add scope unless explicitly requested.
- Preserve the current baseline unless the task says otherwise.
- Keep Mini-Lovable user-facing UI in English.
- Use JavaScript and React/Vite.
- Follow existing code style.
- Avoid unnecessary dependencies.
- Do not add backend features.

## Do not add yet

- auth/login
- database
- payments
- backend workflows
- team collaboration
- one-click deploy
- custom hosting
- advanced file handling
- large agent automation without approval

## Files to respect

Read these before planning or editing:
- docs/ROADMAP.md
- docs/CURRENT_STATE.md
- docs/QA_CHECKLIST.md
- docs/GROUND_ZERO.md

## Development rules

Before code changes:
- inspect relevant files
- explain the minimal plan if the task is not trivial
- identify risk

When coding:
- edit only relevant files
- preserve existing functionality
- avoid broad refactors
- keep changes easy to review

After coding:
- summarize changed files
- summarize test status
- list risks
- recommend whether the change is ready for QA

## Release rule

A version is not accepted until ChatGPT QA gives one of these decisions:

- APPROVE
- APPROVE WITH FIX
- STOP

Only approved versions should become a new baseline.
