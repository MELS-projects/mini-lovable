# Current Project State

This document captures the confirmed working setup for Mini-Lovable.

## Current baseline

Version:
v52.16 GitHub-import working baseline

Status:
Approved working baseline after GitHub import into Bolt.

## Source of Truth

- GitHub is the source of truth for the project.
- Changes should be reviewed against the repository state before they are treated as accepted.
- Documentation-only changes should stay separate from app code changes.

## Build and Preview

- Bolt is the build and preview environment.
- Bolt is where the app should be tested visually and functionally before a change is considered ready.

## Bolt/GitHub Sync Note

- GitHub remains the source of truth.
- Bolt URL import successfully loaded the latest GitHub version.
- Bolt may still show "Error while syncing with GitHub" even when the imported code and preview are correct.
- If normal Bolt sync fails, use URL import or manual GitHub-to-Bolt copy as fallback.

## Roles

- ChatGPT is used for roadmap, QA, and project lead work.
- Codex is used as developer when implementation help is needed.
- Codex should not act as product owner.
- Hermes is planned as workflow coordinator later.

## Model and API Notes

- DeepSeek API is connected and can be evaluated later because it is low cost.
- DeepSeek should be treated as an optional model connection to evaluate, not as the default coding agent.
- Model choice should remain open until quality, reliability, and workflow fit have been reviewed.

## Hermes Status

- Hermes is not installed yet.
- The repository is prepared for Hermes.
- Hermes should not be introduced into the active workflow until the manual GitHub, Bolt, Codex, and ChatGPT process has worked at least once.

## Current Workflow

1. GitHub holds the source of truth.
2. ChatGPT defines roadmap, QA expectations, and project direction.
3. Codex makes implementation or documentation changes when needed.
4. Bolt builds and previews the project.
5. ChatGPT reviews the result before the workflow is expanded or automated.
