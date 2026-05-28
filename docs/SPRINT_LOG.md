# Sprint Log

This file tracks approved Mini-Lovable development work.

## Current baseline

Version:
v52.16

Status:
Approved working baseline after GitHub import into Bolt.

Environment:
- GitHub repo: MELS-projects / mini-lovable
- Bolt project: imported from GitHub
- Branch: main

Notes:
- GitHub is now the source of truth.
- Bolt is the build and preview environment.
- ChatGPT is product owner, roadmap planner, and QA reviewer.
- Codex is developer only.
- Hermes is planned as workflow coordinator later.

## Sprint history

### v52.16 - GitHub import working baseline

Status:
Approved baseline

Summary:
Mini-Lovable v52.16 was uploaded to GitHub, structured as a React/Vite project, imported into Bolt, and successfully previewed.

Important notes:
- App loads in Bolt preview.
- GitHub repo structure is now usable.
- Bolt/GitHub connection is working through the MELS-projects workspace.
- No new product functionality added in this setup step.

Changed/confirmed files:
- src/App.jsx
- src/App.css
- src/main.jsx
- index.html
- package.json
- docs/ROADMAP.md
- docs/CURRENT_STATE.md
- docs/QA_CHECKLIST.md
- docs/GROUND_ZERO.md
- AGENTS.md

Next planned step:
Prepare Hermes workflow documentation and prompt templates.

### Documentation test sprint - workflow validation

Status:
Approved with workflow note

Summary:
Codex created documentation updates for CURRENT_STATE.md, SPRINT_LOG.md, and HERMES_WORKFLOW.md to reflect the confirmed setup.

Important notes:
- Documentation content was useful and mostly correct.
- Codex worked in the wrong local workspace instead of the actual GitHub repository.
- Therefore, the content was manually reviewed before being accepted.
- No app code was changed.
- No product version number was created.

Changed/confirmed files:
- docs/CURRENT_STATE.md
- docs/SPRINT_LOG.md
- docs/HERMES_WORKFLOW.md

QA decision:
APPROVE WITH FIX

Required workflow fix:
Future Codex tasks must be run against the correct GitHub repo or a verified local clone of:
MELS-projects / mini-lovable

Next planned step:
Run the next test sprint only after confirming Codex is working in the correct repo context.

### Manual workflow test - GitHub baseline label

Status:
Approved

Summary:
A minimal one-line UI label change was made in src/App.jsx to confirm that Codex can safely work in the correct repository, ChatGPT can QA the change, GitHub can receive the commit, and Bolt can sync and preview the updated version.

Changed file:
- src/App.jsx

Exact visible change:
- From: v52.16 · contact validator order fix
- To: v52.16 · GitHub baseline verified

Confirmed workflow:
- Codex worked in the correct repo: MELS-projects / mini-lovable
- Codex changed only src/App.jsx
- ChatGPT QA approved the change
- Commit was pushed to GitHub
- Bolt detected external changes
- Bolt updated the codebase
- Bolt preview loaded successfully
- GitHub status showed synced

Important note:
This did not create v52.17. It remains v52.16 GitHub baseline verified.

Next planned step:
Use this confirmed workflow for the next small product improvement sprint before installing Hermes.

### Bolt URL import fallback confirmation

Status:
Approved with workflow note

Summary:
After GitHub sync errors in Bolt, the project was imported again using the GitHub repository URL. The new Bolt import loaded the latest code and previewed the correct baseline/status note, even though Bolt still displayed a sync error toast.

Confirmed:
- GitHub still points to MELS-projects / mini-lovable.
- The GitHub icon in Bolt opens the correct repository.
- Bolt URL import loaded the latest App.jsx.
- Preview showed:
  v52.16 · GitHub baseline verified
  GitHub baseline verified · Bolt preview synced

Workflow note:
Bolt sync status/toast should be treated as lower-trust than the actual GitHub repo and visible preview. If Bolt sync fails, use URL import or manual GitHub-to-Bolt copy as fallback.

Next planned step:
Continue with the next small product improvement sprint using GitHub as source of truth.
