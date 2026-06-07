# Kodmaskin Next Roadmap

Upcoming roadmap direction for Kodmaskin as GitHub source of truth. This document summarizes the larger path ahead instead of micro-sprints.

## Current Strategic Direction

API-first before full Hermes.

## Current 3-Step API Sprint Path

1. Sprint API-1: API Full Integration Readiness Batch
2. Sprint API-2: Controlled API Worker Dry-Run
3. Sprint API-3: Full API Integration v1

## Status

- API-1 is planning/readiness direction
- API-2 must not start without Nicolas approval
- API-3 must not start without Nicolas and Thomas approval
- Hermes remains WAIT
- n8n remains manual advisory only unless separately approved

## Recommended Next Roadmap Batches

### 1) API Governance/Readiness Hardening

- Goal: make the API path approval-safe before any worker dry-run
- Allowed scope: planning, governance, readiness checks, safety criteria, and source documentation
- Forbidden scope: API-2 execution, API-3 execution, Hermes setup, webhook setup, automation, code edits, and deployment
- Required approval gate: Nicolas QA approval
- Expected output: a ready-to-review API-1 readiness package
- Stop conditions: unclear source state, unexpected files, secrets, or any request to start API-2/API-3
- Historical marker: Backfilled from chat history

### 2) Controlled API Worker Dry-Run

- Goal: test the controlled API worker path without moving into full integration
- Allowed scope: dry-run design, limited read-only testing plan, controlled worker boundaries, and approval notes
- Forbidden scope: full integration, Hermes setup, webhook setup, n8n activation, autonomous actions, deployment, and secrets
- Required approval gate: Nicolas approval, with Thomas awareness if risk expands
- Expected output: a dry-run result package that proves the worker path is still controlled
- Stop conditions: unclear receiver, unclear next action, unexpected scope expansion, or any need for API-3
- Historical marker: Backfilled from chat history

### 3) Full API Integration Approval Package

- Goal: define the approval package needed before API-3
- Allowed scope: integration readiness summary, risk review, routing rules, and approval criteria
- Forbidden scope: live integration, deployment, branch/PR automation, Hermes setup, and autonomous action
- Required approval gate: Nicolas approval and Thomas final approval
- Expected output: a full integration approval package for the API path
- Stop conditions: missing approval gate, secrets exposure, or any push toward live transport
- Historical marker: Backfilled from chat history

### 4) Hermes/n8n Transport Decision After API Path Is Stable

- Goal: decide whether Hermes or n8n can later support transport once the API path is stable
- Allowed scope: decision framing, transport rules, human-review routing, and documentation-only preparation
- Forbidden scope: Hermes setup, n8n publish/activation, webhook setup, automatic sending, and live transport
- Required approval gate: Thomas final approval after Nicolas QA
- Expected output: a transport decision package, not an implementation change
- Stop conditions: any automation request, unclear receiver, or any attempt to bypass the API path
- Historical marker: Backfilled from chat history

### 5) Branch/PR/Autonomy Path After Safety Gates Are Proven

- Goal: define the later path toward branch/PR and autonomy only after safety gates are proven
- Allowed scope: governance planning, access ladder review, approval packaging, and safety review
- Forbidden scope: autonomy increase, branch/PR automation, production deployment, and access expansion before approval
- Required approval gate: Thomas final approval with Nicolas QA
- Expected output: a later-stage governance package, not active automation
- Stop conditions: any attempt to accelerate before the safety gates are proven
- Historical marker: Backfilled from chat history

## Preserved Next Action

Do not start API-2, API-3, Hermes, webhook, automation, Codex, repo/file work, terminal/PowerShell, secrets, or deployment until separately approved.

## Scope Rule

This is a roadmap direction document only. It must not become a sprint log, decision log, role rules file, or safety file.
