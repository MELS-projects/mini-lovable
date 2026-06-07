# Kodmaskin Safety Boundaries

Safety boundaries and approval gates as GitHub source of truth.

## Nicolas-Required Actions

- Codex implementation
- repo/file changes
- GitHub edits
- dashboard changes
- terminal/PowerShell
- n8n setup/change
- webhook
- API calls
- automation
- secrets/credentials
- package install
- deployment
- autonomy increase

## Thomas Final Approval Required For

- production deployment
- real secrets/API keys
- billing/cost changes
- external integrations
- branch/PR automation
- access expansion
- live transport

## Forbidden Unless Separately Approved

- API-2 start
- API-3 start
- Hermes setup
- webhook setup
- n8n publish/activation
- Codex implementation
- GitHub write
- repo/file edits
- terminal/PowerShell commands
- secrets handling
- deployment
- autonomous action

## Safe Defaults

- Documentation-only can be considered after Nicolas approval
- n8n is manual advisory only
- Hermes is WAIT
- GitHub is source of truth
- Bolt is preview/test only
- Codex implements only after Nicolas approval

## Stop Conditions

- unclear receiver
- unclear next action
- missing source text
- scope creep
- unexpected files
- secrets appear
- wrong repo
- automation starts without approval

## Access Ladder

- read-only
- documentation write
- limited code write
- commit
- branch/PR
- staging
- production

## Historical Marker

Backfilled from chat history where older safety and approval boundaries were summarized.

## Scope Rule

This is a safety boundary and approval gate document only. It must not become a sprint log, decision log, or roadmap.
