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

### Add starter prompt helper note

Status:
Approved

Summary:
A small helper note was added under the main prompt textarea to make it easier for non-programmers to start with a simple idea.

Changed file:
- src/App.jsx

Exact UI text added:
Tip: Start with a simple idea, like “a premium website for a business consultant”.

Confirmed:
- Codex worked in the correct repository.
- Only src/App.jsx was changed during the implementation sprint.
- ChatGPT QA approved the change.
- Commit was pushed to GitHub.
- Bolt preview/code contained the new helper text.
- No generation, DeepSeek, roadmap, reviewer, export, preview, or validator logic was changed.
- No new version number was created.

Commit:
090992e Add starter prompt helper note

Next planned step:
Continue with the next small Kodmaskin-controlled Mini-Lovable product improvement sprint.

### Kodmaskin Learning Checkpoint - 2026-05-28

Status:
Documented learning checkpoint

Summary:
Kodmaskin Oskar has completed another safe learning step through the Mini-Lovable workflow.

Mini-Lovable remains the first validation project and training ground. Kodmaskin Oskar remains the main project. The goal is still to build a reusable coding machine that can later support SaaS products, prototypes, automation tools, websites, webshops, and fullstack apps.

Confirmed learnings:
- Codex read-only repo context test passed.
- Codex can work in the correct Mini-Lovable repository:
  C:\Users\ThomasOlsson\Documents\Projects\mini-lovable
- GitHub remains the source of truth.
- Bolt preview can be unreliable, but the right-side Bolt project currently works.
- The starter prompt helper note sprint was approved, pushed, previewed, and documented.
- Git identity was fixed to the GitHub no-reply email:
  288360395+MELS-projects@users.noreply.github.com
- Hermes/OpenClaw remains WAIT.
- Codex CLI / Codex Cloud is the safer first orchestration path.
- Mini-Lovable is the first test project, not the final goal.
- Kodmaskin Oskar is the main project.

Current workflow state:
The current proven workflow remains:
ChatGPT -> Codex -> GitHub -> Bolt -> ChatGPT QA

PowerShell is still acceptable as a temporary manual Git bridge when needed.

Safety position:
No Hermes/OpenClaw installation has been approved.

The next autonomy step should continue to follow this order:
Read-only access -> Documentation write access -> Limited code write access -> Commit access -> Pull request access

Next recommended action:
Continue with small documentation or handoff-only sprints before granting any broader agent permissions.

### Add example idea chips

Status:
Approved

Summary:
Three small visual example idea chips were added under the main prompt helper note to help non-programmers understand what kind of prompt they can write.

Changed file:
- src/App.jsx

Exact UI text added:
- Premium consultant website
- Local service business
- Product landing page

Confirmed:
- Codex worked in the correct repository.
- Only src/App.jsx was changed during the implementation sprint.
- The chips are visual-only span elements.
- No click behavior was added.
- ChatGPT QA approved the change.
- Commit was pushed to GitHub.
- Bolt preview showed the chips under the prompt helper note.
- No generation, DeepSeek, roadmap, reviewer, export, preview, or validator logic was changed.
- No new version number was created.

Commit:
108983b Add example idea chips

Next planned step:
Continue with the next small Kodmaskin-controlled Mini-Lovable product improvement sprint.

### Output Expectation Note Sprint

Status:
Approved

Summary:
The Output Expectation Note sprint added a small visual helper note above the main idea/prompt input.

The note helps non-programmers understand what Mini-Lovable will generate before they start.

Implemented UI text:
Mini-Lovable will turn your idea into a first premium website draft you can preview and improve.

Changed file:
- src/App.jsx

Confirmed:
- The change was implemented in src/App.jsx.
- The commit was pushed to GitHub:
  89929bd Add output expectation note
- GitHub remains the source of truth.
- Bolt preview was verified.
- The note is visual-only.
- No generation, DeepSeek, roadmap, reviewer, export, preview, or validator logic was changed.
- No Hermes/OpenClaw installation was performed.
- No new version number was created.

QA result:
Approved after GitHub push and Bolt preview verification.

Notes:
This sprint continued the safe Kodmaskin Oskar workflow by using Mini-Lovable as the first test project. The change was intentionally small, low-risk, and limited to a visual onboarding improvement.

Next planned step:
Continue with the next small Kodmaskin-controlled Mini-Lovable product improvement sprint.
