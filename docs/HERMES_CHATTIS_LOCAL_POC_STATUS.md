# Hermes/Chattis Local PoC Status

**Datum:** 2026-06-12
**Status:** Local PoC daily-use ready with notes

---

## Current Local Baseline

Accepted and implemented:

- A1 — heartbeat, log, reprocess protection, 120s UI timeout ✅
- A2 — Windows Task Scheduler `HermesWorkerAutostart` starts worker at login ✅
- B — Command safety guard (blocking rm -rf, shutdown, format, .env_chat_app), heartbeat age in UI, PID/start display, log preview (10 lines), operator guide in UI, self-check command, improved timeout message ✅
- Phase E — Workflow validation: all 5 tests passed, daily-use ready confirmed ✅

---

## What Is Working

| Component | Status |
|---|---|
| Streamlit UI (chat_app.py) on port 8506 | ✅ Running |
| Hermes Worker v9 via Task Scheduler | ✅ PID auto-start at login |
| File bridge (order → status → result → heartbeat → log → PID) | ✅ All files operational |
| Heartbeat every ~30s | ✅ Written to `.hermes_heartbeat.json` |
| Worker log with rotation (1MB, 3 files) | ✅ Written to `.hermes_worker.log` |
| Command safety guard | ✅ Blocks rm -rf, shutdown, format, del /F/S, .env edits, port exposure |
| Self-check command (`/hermes self-check`) | ✅ Returns 10-point health status |
| UI heartbeat indicator (seconds since last beat) | ✅ Shows 🟢/🔴 |
| UI operator guide | ✅ Built-in expander in status panel |
| UI log preview (10 lines) | ✅ Expander in status panel |
| 120s UI timeout with improved message | ✅ Explains why and suggests split |
| Result lifecycle — stale data consumed after UI read | ✅ Old results do not reappear |

---

## Phase F Result

Phase F confirmed the local PoC supports real daily Kodmaskin workflow:

1. **Status synthesis** — Hermes can read runtime files and produce structured status
2. **Next-step recommendation** — Hermes can recommend safe next actions
3. **Handoff creation** — Hermes can produce paste-ready handoffs for Nicolas
4. **Risk classification** — Hermes correctly classified webhook integration as RED
5. **Daily-use simulation** — Hermes produced a practical 4-step daily recommendation

No code changed. No secrets touched. No external exposure.

---

## Known Issue: Repeated Order / Polling Behavior

- Worker polls `.hermes_order.json` every 1 second
- If status is stale (e.g. `waiting_for_hermes` left from a previous session), worker may log the same order multiple times
- This is cosmetic — orders are not re-executed (hash-based reprocess protection prevents this)
- The duplicate log entries can confuse automated log readers
- Fix would require worker hardening (currently frozen)

---

## Known Limit: Worker-Hardening Is Frozen

Unless Thomas explicitly asks, the following are NOT being implemented:

- Worker auto-restart (C1) — requires Nicolas approval
- Command blocking for additional patterns — current patterns are sufficient for local PoC
- Deduplication improvements — current hash-based protection works correctly

---

## Remaining Risks

| Risk | Severity | Status |
|---|---|---|
| Worker does not auto-restart if Hermes restarts | Medium | Requires Nicolas approval (Batch C1) |
| Test artifacts not cleaned (bridge_test/, temperatur.py etc.) | Low | Requires separate approval |
| Duplicate log entries on stale status | Low | Cosmetic — no functional impact |
| No external access | — | By design |
| No production approval | — | Design constraint |

---

## Not Approved

The following are explicitly NOT approved and must not be implemented without discussion with Nicolas:

- ❌ Production deployment
- ❌ Server/migration deployment
- ❌ GitHub automation (CI/CD, workflows)
- ❌ Secrets or API key handling beyond current .env_chat_app
- ❌ Webhook creation
- ❌ External exposure of port 8506 or any service
- ❌ Dashboard integration (Grafana, Datadog, etc.)
- ❌ Any external API integration — classified RED
