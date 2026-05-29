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

### Codex CLI QA Handoff Template Sprint

Status:
Approved

#### Summary

The Codex CLI QA handoff template sprint created a reusable template for returning Codex output to ChatGPT QA.

The template standardizes how Codex reports completed work, changed files, files read, commands run, before/after working-tree status, test/check results, risks, stop conditions, and suggested commit messages.

This was a Kodmaskin workflow-template sprint, not Mini-Lovable UI work.

#### Git history

* Commit: b2e7ff2 Create Codex CLI QA handoff template

#### Changed files

* prompts/CODEX_CLI_QA_HANDOFF_TEMPLATE.md

#### Workflow result

The new QA handoff template makes Codex output easier for ChatGPT to review.

The template includes:

* Before/after working-tree verification.
* Files read.
* Commands run.
* Changed files.
* Forbidden files touched.
* Test/check results.
* Risk summary.
* Stop conditions.
* Suggested commit message if approved.
* Final Codex verdict.

#### Safety checks

* ChatGPT remains the QA gate.
* Codex must not approve its own work.
* No app code was changed.
* No docs were changed during implementation.
* No package files were changed.
* No .env or secrets were accessed.
* No Hermes/OpenClaw installation was performed.
* No new version or baseline was created.
* Mini-Lovable UI track remains paused.

#### Notes

Hermes/OpenClaw remains WAIT.

Next focus remains Kodmaskin workflow improvement, especially reducing manual copy/paste between Oskar, Codex, and ChatGPT QA.

### Codex CLI Handoff Pack Read-Only Test

Status:
Approved

#### Summary

The Codex CLI Handoff Pack Read-Only Test verified that the new handoff pack template can be used to prepare workflow-focused QA and handoff packages without changing files.

This was a Kodmaskin workflow test, not Mini-Lovable UI work.

#### Template used

- prompts/CODEX_CLI_HANDOFF_PACK_TEMPLATE.md

#### Test result

- Codex CLI completed the read-only handoff pack test.
- Repo context was verified.
- The working tree was clean before and after the test.
- No files were changed.
- No files were created.
- No files were deleted.
- Final verdict from Codex: READY FOR CHATGPT QA.

#### Safety checks

- No app code was changed.
- No package files were changed.
- No prompt files were changed.
- No .env or secrets were accessed.
- No commit or push was made by Codex.
- No new version or baseline was created.
- Hermes/OpenClaw remains WAIT.

#### Workflow result

The test confirmed that the Codex CLI handoff pack template is useful for preparing more consistent workflow handoffs and QA packages.

#### Improvement noted

Before/after working-tree verification should be standard in future handoff packages.

#### Notes

Next focus remains Kodmaskin workflow improvement, not Mini-Lovable UI polish.

### Working-Tree Verification Template Update

Status:
Approved

#### Summary

The working-tree verification template update improved the Codex CLI handoff pack template for Kodmaskin Oskar.

The template now requires Codex to report working-tree status before and after work, making future handoffs easier to QA and reducing the risk of unnoticed file changes.

This was a Kodmaskin workflow-template sprint, not Mini-Lovable UI work.

#### Git history

- Commit: 784d0f6 Add working-tree verification to handoff template

#### Changed files

- prompts/CODEX_CLI_HANDOFF_PACK_TEMPLATE.md

#### Workflow result

The handoff pack template now requires:

- Working-tree verification before work starts.
- Working-tree verification after work is completed.
- Read-only tests to confirm that no files changed.
- Write or implementation tests to confirm that only allowed files changed.
- Unexpected modified files before work to be treated as a stop condition unless ChatGPT explicitly approved them.

#### Safety checks

- No app code was changed.
- No docs were changed during implementation.
- No package files were changed.
- No .env or secrets were accessed.
- No Hermes/OpenClaw installation was performed.
- No new version or baseline was created.
- Mini-Lovable UI track remains paused.

#### QA result

ChatGPT QA result: Approved for documentation.

#### Notes

Hermes/OpenClaw remains WAIT.

Next focus remains Kodmaskin workflow improvement, with stronger handoff quality and safer before/after repo-state verification.

### Updated Handoff Template Working-Tree Verification Read-Only Test

Status:
Approved

#### Summary

The Updated Handoff Template Working-Tree Verification Read-Only Test verified that the updated Codex CLI handoff pack template now causes Codex to include before/after working-tree verification in read-only workflow handoff packages.

This was a Kodmaskin workflow test, not Mini-Lovable UI work.

#### Template used

* prompts/CODEX_CLI_HANDOFF_PACK_TEMPLATE.md

#### Test result

* Codex CLI completed the read-only test.
* Repo context was verified.
* Working tree before work: clean.
* Working tree after work: clean.
* No files were changed.
* No files were created.
* No files were deleted.
* Final verdict from Codex: READY FOR CHATGPT QA.

#### Template verification result

Codex confirmed that the updated template requires before/after working-tree reporting.

Codex also confirmed that nothing material was missing or unclear.

#### Safety checks

* No app code was changed.
* No package files were changed.
* No prompt files were changed.
* No .env or secrets were accessed.
* No commit or push was made by Codex.
* No new version or baseline was created.
* Hermes/OpenClaw remains WAIT.

#### Workflow result

The updated handoff template is now verified for read-only workflow testing and should continue to require before/after working-tree verification in future Codex handoff packages.

#### Notes

Next focus remains Kodmaskin workflow improvement, not Mini-Lovable UI polish.

### Codex CLI Handoff Pack Template Sprint

Status:
Approved

#### Summary

The Codex CLI handoff pack template sprint created a reusable workflow template for Kodmaskin Oskar.

The template standardizes how Oskar/Codex prepares sprint handoffs, QA packages, risk summaries, allowed files, forbidden files, stop conditions, test plans, and suggested commit messages.

This was a Kodmaskin workflow sprint, not a Mini-Lovable UI or product change.

#### Git history

- Commit: e4b2b65 Create Codex CLI handoff pack template

#### Changed files

- prompts/CODEX_CLI_HANDOFF_PACK_TEMPLATE.md

#### Safety checks

- No app code was changed.
- No docs were changed during implementation.
- No package files were changed.
- No .env or secrets were accessed.
- No Hermes/OpenClaw installation was performed.
- No new version or baseline was created.
- Mini-Lovable UI track remains paused.

#### Workflow result

The new template supports the ChatGPT → Oskar → Codex → GitHub → Bolt → QA workflow by making future handoffs more consistent and easier to review.

#### Notes

Hermes/OpenClaw remains WAIT.

Next focus remains Kodmaskin workflow improvement, not additional Mini-Lovable UI polish.

### Make Example Idea Chips Clickable Sprint

Status:
Approved

Summary:
The Make example idea chips clickable sprint improved the Mini-Lovable onboarding flow by making the existing example idea chips interactive.

Clicking an example chip now fills the main prompt field with a starter idea, helping non-programmers begin faster without needing to write from scratch.

Git history:

* Commit: 728a12c Make example idea chips clickable

Bolt test result:
Bolt preview was verified.

Clicking each example chip filled the prompt field correctly.

Clicking a chip did not auto-start generation.

The user can still edit the prompt manually after selecting a chip.

Safety checks:

* No generation was started automatically by chip clicks.
* No DeepSeek API configuration was changed.
* No model/provider logic was changed.
* No new generation logic was added.
* No roadmap, reviewer, export, preview, or validation logic was intentionally changed.
* No new version or baseline was created.

QA result:
ChatGPT QA result: APPROVED FOR DOCUMENTATION

Notes:
This was the final Mini-Lovable UI sprint before returning focus to the Kodmaskin Oskar workflow.

Next focus:
Kodmaskin workflow, not additional Mini-Lovable UI polish.

### Codex CLI One-File Workspace-Write UI Test

Status:
Approved

Summary:
The Codex CLI one-file workspace-write UI test was completed successfully.

Codex CLI changed only src/App.jsx and added a small owner-facing UI note near the existing baseline/status area.

Exact UI text added:
Codex CLI workspace-write verified

Git history:
- Commit: b2a527b Add Codex CLI workspace-write status note

Bolt test result:
Bolt was re-imported from GitHub and preview verified that the text is visible.

This was a Kodmaskin / Codex CLI workflow checkpoint, not a Mini-Lovable product version change.

Safety checks:
- Only src/App.jsx was changed in the implementation sprint.
- No app logic was changed.
- No generation logic was changed.
- No DeepSeek logic was changed.
- No roadmap, reviewer, export, preview, or validator behavior was changed.
- No package files were changed.
- No docs or prompts were changed during the implementation sprint.
- No .env or secrets were accessed.
- No new version or baseline was created.
- Hermes/OpenClaw remains WAIT.

Workflow significance:
This confirms that Codex CLI can perform a narrow one-file workspace-write task after passing read-only, handoff-only, and documentation-only write tests.

Next safe step:
Continue with small controlled Codex CLI tasks only. Do not expand to broad workspace-write, commit automation, PR automation, or Hermes/OpenClaw installation yet.

### Codex CLI Documentation-Only Write Test

Status:
Approved for ChatGPT QA

Summary:
The Codex CLI documentation-only write test was completed as the next controlled access step for Kodmaskin Oskar.

This test follows the approved progression:
- Read-only repo context test
- Handoff-only test
- Documentation-only write test

This was a workflow checkpoint, not a Mini-Lovable product change.

Allowed scope:
- docs/SPRINT_LOG.md only

Safety checks:
- No app code should be changed.
- No package files should be changed.
- No prompt files should be changed.
- No .env or secrets should be accessed.
- No commit or push should be made by Codex.
- No new version or baseline should be created.
- Hermes/OpenClaw remains WAIT.

Workflow significance:
This confirms that Codex CLI can perform a narrow documentation-only write task after passing read-only and handoff-only tests.

Next safe step:
After ChatGPT QA and human push, continue with controlled Codex CLI documentation-only or one-file low-risk UI tests before considering broader workspace-write permissions.

### Codex CLI Handoff-Only Test

Status:
Approved

Summary:
The Codex CLI handoff-only test was completed successfully for Kodmaskin Oskar using the Mini-Lovable repository.

Codex CLI prepared a next-sprint handoff package without editing files. This confirms that Codex CLI can support workflow coordination tasks before being granted workspace-write permissions.

This was a Kodmaskin / Codex CLI workflow checkpoint, not a Mini-Lovable product change.

Test environment:
- Model: gpt-5.4-mini medium
- Sandbox: read-only
- Approval mode: untrusted
- Local repository path: C:\Users\ThomasOlsson\Documents\Projects\mini-lovable
- Branch: main
- Remote: https://github.com/MELS-projects/mini-lovable.git

Test result:
Codex CLI prepared a handoff-only sprint package and returned:
READY FOR CHATGPT QA

Safety checks:
- No files were changed.
- No app code was changed.
- No package files were changed.
- No prompt files were changed.
- No .env or secrets were accessed.
- No commit or push was made by Codex.
- No new version or baseline was created.
- Hermes/OpenClaw remains WAIT.

Workflow significance:
This confirms that Codex CLI can help reduce manual coordination by preparing sprint handoff material while staying read-only.

Next safe step:
Continue with controlled Codex CLI read-only or documentation-only tests before considering workspace-write access.

### Codex CLI Read-Only Repo Context Test

Status:
Approved

Summary:
The first Codex CLI read-only repo context test was completed successfully for Kodmaskin Oskar using the Mini-Lovable repository.

This was a Kodmaskin / Codex CLI checkpoint, not a Mini-Lovable product change.

Test environment:

* Codex CLI version: codex-cli 0.135.0
* Model: gpt-5.4-mini medium
* Sandbox: read-only
* Approval mode: untrusted
* Local repository path: C:\Users\ThomasOlsson\Documents\Projects\mini-lovable
* Branch: main
* Remote: https://github.com/MELS-projects/mini-lovable.git

Test result:
Codex CLI confirmed the correct repository context.

Final verdict from Codex:
CORRECT REPO

The working tree was clean before and after the test.

Safety checks:

* No files were changed.
* No app code was changed.
* No package files were changed.
* No prompt files were changed.
* No .env or secrets were accessed.
* No commit or push was made by Codex.
* No new version or baseline was created.
* Hermes/OpenClaw remains WAIT.

Workflow significance:
This confirms that Codex CLI can be used as the first safer orchestration path for Kodmaskin Oskar in read-only mode before granting any workspace-write permissions.

Next safe step:
Continue with controlled Codex CLI tests before considering workspace-write access or any Hermes/OpenClaw installation.

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

### Selected Roadmap Step CTA Sprint

Status:
STOPPED AND REVERTED

Summary:
The Add selected roadmap step CTA sprint added a CTA after the roadmap output with the text: Build selected roadmap step.

The sprint was implemented and pushed, but it did not pass QA after Bolt testing.

Git history:
- Implemented commit: 5b66f94 Add selected roadmap step CTA
- Revert commit: 269fb09 Revert "Add selected roadmap step CTA"

Bolt test result:
Bolt preview confirmed that the CTA was visible and clickable.

However, clicking the CTA caused the app to get stuck after a contact-form / generation warning modal.

QA decision:
ChatGPT QA decision: STOP

The CTA must not be counted as an approved baseline.

Current interpretation:
The issue appears to be in the existing generation / contact-form validation flow, not necessarily in the CTA rendering itself.

The CTA rendered correctly and could be clicked, but the continuation flow did not complete safely.

Safety decision:
The sprint was reverted.

No new Mini-Lovable baseline should be created from this sprint.

Next safe step:
Run a read-only bug analysis sprint on the generation / contact-form warning flow before attempting another CTA, build-flow improvement, or Planner to Build enhancement.

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

### Add Inline Generation Recovery Path Sprint

Status:
Approved

Summary:
The Add inline generation recovery path sprint improved the generation/contact-form warning recovery flow.

The previous alert-only warning path still made the app feel like a dead-end. This sprint added a clearer inline recovery/status path so the user can continue after the warning instead of feeling stuck.

Git history:

* Commit: 4e1bf2a Add inline generation recovery path

Bolt test result:
Bolt preview was verified.

The Build / Improve Step flow generated a website successfully after the fix.

The previous dead-end after the contact-form / generation warning appears to be resolved.

Safety checks:

* No roadmap CTA was reintroduced.
* The text Build selected roadmap step was not reintroduced.
* Contact-form validation was not intentionally bypassed.
* Validation safety gates should remain intact.
* No DeepSeek API configuration was changed.
* No model/provider logic was changed.
* No export, reviewer, or preview logic was intentionally changed.
* No new version or baseline was created.

QA result:
ChatGPT QA result: APPROVED FOR DOCUMENTATION

Notes:
This sprint is a meaningful workflow improvement because it fixed the blocking user experience before attempting any new Planner to Build CTA or roadmap continuation feature.

Next safe step:
Continue with small, Bolt-testable Mini-Lovable improvements only after this recovery flow remains stable.
