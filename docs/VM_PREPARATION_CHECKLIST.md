# VM Preparation Checklist

## 1. Purpose

This checklist defines what must be prepared, verified, forbidden, and approved before setting up a local VM for a future Hermes Agent read-only test.

This document is planning-only.

It does not approve:

* Hermes/OpenClaw installation.
* VM setup.
* GitHub write access.
* API key creation.
* .env or secrets access.
* Commit, push, PR, or deployment automation.

Any future setup must be done one step at a time.

## 2. Current decision

Current decision:

* Hermes: WAIT.
* OpenClaw: WAIT / not first.
* Codex CLI: CONTINUE.

Recommended first serious Hermes test environment:

* Local VM.

Direct local Windows installation is rejected as the first step.

No Hermes/OpenClaw installation is approved.

No VM setup is approved yet.

The first Hermes test must be read-only only.

GitHub remains the source of truth.

ChatGPT remains the project lead and QA gate.

## 3. VM goal

The goal of the VM is to create an isolated sandbox for a future Hermes Agent read-only test.

The VM should prevent Hermes from accessing:

* host private folders
* browser credentials
* unrelated repositories
* production secrets
* real .env files
* GitHub write credentials
* deployment credentials

The VM should allow only a controlled Mini-Lovable repo context test.

## 4. VM software options to evaluate

Evaluate these options before setup:

### Hyper-V

Use if the Windows edition supports it and setup is straightforward.

Pros:

* Microsoft-native.
* Strong Windows integration.
* Good isolation.

Cons:

* May require Windows Pro/Education/Enterprise.
* May require enabling virtualization features.

### Oracle VirtualBox

Use as a fallback if Hyper-V is not suitable.

Pros:

* Common VM tool.
* Works on many Windows machines.
* Easier for simple local VM experiments.

Cons:

* May conflict with Hyper-V on some systems.
* Requires separate install.

### VMware Workstation Pro

Use only if Hyper-V and VirtualBox are not suitable.

Pros:

* Mature VM tool.
* Good isolation.

Cons:

* Download/account friction may be higher.
* Still requires install and configuration.

### WSL2

Not the first choice for Hermes sandbox testing.

Reason:

* Useful later, but less isolated than a full VM for a powerful orchestrator.

### Docker

Not the first choice for the first Hermes sandbox test.

Reason:

* Good later, but more technical and may add unnecessary setup complexity.

## 5. Required decisions before VM setup

Before any VM setup, decide:

* Which VM software to evaluate first.
* Whether the Windows edition supports Hyper-V.
* Whether virtualization is enabled in BIOS/UEFI.
* Which guest OS to use.
* Whether the VM should have internet access.
* Whether shared folders should be disabled initially.
* Whether clipboard sharing should be disabled initially.
* Whether the repo should be cloned fresh inside the VM.
* Whether GitHub access should be read-only HTTPS only.
* Whether any test API key is needed later.
* Whether VM snapshot/reset is available.

Default decision until changed:

* Local VM first.
* No Hermes install yet.
* No host folder mounting.
* No real .env.
* No GitHub write token.
* Fresh repo clone inside VM later.
* One-step-at-a-time setup later.

## 6. Required host checks

Before VM setup, check:

* Windows edition.
* Available RAM.
* Available disk space.
* CPU virtualization support.
* Whether virtualization is enabled in BIOS/UEFI.
* Whether Hyper-V is available.
* Whether existing tools conflict with Hyper-V.
* Whether the host has enough resources for a small VM.

No system changes should be made until ChatGPT QA and the human owner approve the exact setup step.

## 7. Guest OS decision

The guest OS must be chosen before setup.

Options:

### Windows guest

Pros:

* Familiar environment.
* Easier for Windows-only workflows.

Cons:

* Heavier resource usage.
* Licensing/setup may be more complex.

### Linux guest

Pros:

* Lightweight.
* Common for agent tooling.
* Easier to reset and automate later.

Cons:

* Requires more Linux comfort.
* Setup must be done one step at a time.

Default recommendation:

* Choose the simplest VM path that the human owner can operate safely.
* Do not assume Linux knowledge.
* If Linux is selected, provide one command or setup action at a time.

## 8. Network/access policy

Initial network policy:

* Internet access may be allowed only if needed to clone the repo or later install approved tooling.
* No production accounts.
* No browser credential sync.
* No password manager sync.
* No cloud drive sync.
* No access to host private folders.
* No shared folders at first.
* No clipboard sharing at first unless explicitly approved.
* No GitHub write credential inside the VM.

If network access is not needed for a specific test, it should be disabled.

## 9. Allowed paths

Allowed future sandbox paths:

Windows VM:

```text
C:\KodmaskinSandbox\mini-lovable
```

Linux VM:

```text
~/kodmaskin-sandbox/mini-lovable
```

Allowed future repo:

```text
https://github.com/MELS-projects/mini-lovable.git
```

Allowed files for first read-only test:

* AGENTS.md
* package.json
* docs/KODMACHINE_SOP.md
* docs/CURRENT_STATE.md
* docs/SPRINT_LOG.md
* docs/HERMES_WORKFLOW.md
* prompts/CODEX_CLI_HANDOFF_PACK_TEMPLATE.md
* prompts/CODEX_CLI_QA_HANDOFF_TEMPLATE.md

## 10. Forbidden paths

Forbidden host paths:

* C:\Users\ThomasOlsson\Desktop
* C:\Users\ThomasOlsson\Downloads
* C:\Users\ThomasOlsson\Documents outside the approved sandbox/repo
* C:\Users\ThomasOlsson\AppData
* browser profile folders
* password manager folders
* cloud sync folders
* accounting files
* bank files
* customer files
* unrelated repositories

Forbidden repo paths for the first Hermes read-only test:

* src/
* dashboard/
* .env
* .env.local
* .env.production
* package-lock.json
* any secrets or credential files

## 11. Secrets/API-key policy

Secrets policy:

* No production secrets.
* No real .env.
* No GitHub write token.
* No deployment token.
* No payment credentials.
* No database credentials.
* No customer credentials.
* No browser credential sharing.
* No host credential folders mounted into the VM.

If Hermes later requires an API key:

* Use a restricted test key only.
* Store the test key only inside the disposable VM.
* Set low usage/spending limits where possible.
* Revoke the test key after the sandbox test if needed.
* Never commit secrets.
* Never print keys in logs.
* Never copy secrets into documentation.

## 12. GitHub access rules

GitHub remains the source of truth.

First VM test GitHub rules:

* Read-only HTTPS clone only.
* No GitHub write token.
* No SSH private key copied into the VM.
* No GitHub Credential Manager copied into the VM.
* No push.
* No branch creation.
* No PR creation.
* No GitHub settings changes.
* No merge.
* No release.
* No deployment.

## 13. First Hermes read-only test outline

Test name:

```text
Hermes VM Read-Only Repo Context Test
```

Goal:

Verify that Hermes can inspect only the approved Mini-Lovable repo inside the VM and produce a useful workflow summary without changing files.

Allowed:

* Read approved repo docs.
* Read approved prompt templates.
* Inspect git status.
* Inspect branch.
* Inspect remote.
* Summarize workflow.
* Propose one next handoff-only sprint.

Forbidden:

* Edit files.
* Create files.
* Delete files.
* Install packages during the test.
* Read .env.
* Read secrets.
* Access host Windows folders.
* Commit.
* Push.
* Create branch.
* Create PR.
* Deploy.

Required output:

1. Current working directory.
2. Git repo status.
3. Branch.
4. Remote/origin.
5. Files read.
6. Current workflow summary.
7. Security rules found.
8. Confirmation no files changed.
9. Confirmation no host folders accessed.
10. Suggested next sprint.
11. Risks or unclear items.
12. Final verdict:

* READY FOR HANDOFF TEST
* NOT READY
* UNCLEAR

## 14. Stop conditions

Stop immediately if:

* VM software choice is unclear.
* Windows edition or virtualization support is unclear.
* VM setup requires risky system changes.
* Hermes install asks for broad host access.
* Hermes requires production secrets.
* Hermes requires real .env.
* Hermes requires GitHub write token.
* Hermes cannot be restricted to the sandbox repo.
* Hermes stores memory/logs in an unclear location.
* Hermes modifies files during read-only test.
* Hermes scans outside the approved path.
* Hermes attempts install, push, commit, branch, PR, or deploy.
* Any instruction conflicts with ChatGPT QA gate.
* Any instruction requires skipping the approved access ladder.

## 15. Rollback/delete plan

Rollback/delete plan:

1. Stop the Hermes process.
2. Revoke any test API key.
3. Delete ~/.hermes or equivalent Hermes config inside the VM.
4. Delete the sandbox repo clone inside the VM.
5. Reset VM snapshot if available.
6. Delete the VM if needed.
7. Remove VM network access if needed.
8. Confirm no host folders were mounted.
9. Confirm no GitHub write token was used.
10. Confirm GitHub repo remains unchanged.

## 16. Approval checklist before VM setup

Before VM setup, ChatGPT QA and the human owner must approve:

* VM software choice.
* Guest OS choice.
* Network policy.
* Shared folder policy.
* Clipboard sharing policy.
* Repo clone method.
* Allowed VM path.
* Forbidden host paths.
* Rollback/delete plan.
* One-step-at-a-time setup order.

No VM setup may start before approval.

## 17. Approval checklist before Hermes install

Before any Hermes installation, ChatGPT QA and the human owner must approve:

* Official Hermes source.
* Official install instructions.
* Exact installation method.
* Required API keys.
* Required permissions.
* Memory/logging behavior.
* Repo restriction method.
* Secrets policy.
* Rollback/delete plan.
* First read-only test prompt.
* Confirmation that no production secrets are used.
* Confirmation that no GitHub write token is used.
* Confirmation that Hermes remains inside the sandbox.

No Hermes/OpenClaw installation is approved by this checklist.

## 18. Definition of Ready

The VM is ready for a future Hermes read-only test only when:

* VM software choice is approved.
* Guest OS choice is approved.
* VM setup steps are approved one at a time.
* No host private folders are mounted.
* No real .env exists in the VM.
* No production secrets exist in the VM.
* No GitHub write token exists in the VM.
* Approved repo path exists inside the VM.
* Repo context is correct.
* Rollback/delete plan is confirmed.
* First Hermes test prompt is approved.
* ChatGPT QA approves moving to the next step.

Until then:

```text
Hermes: WAIT
OpenClaw: WAIT / not first
Codex CLI: CONTINUE
```
