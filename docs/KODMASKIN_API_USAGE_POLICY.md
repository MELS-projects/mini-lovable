# Kodmaskin API Usage Policy

This policy defines safe OpenAI API usage for Kodmaskin. It is documentation only.

## Platform Roles

- ChatGPT Business remains the main platform for strategy, QA, sprint design, Oskar/Nicolas packages, and architecture.
- OpenAI API usage is billed separately from ChatGPT Business.
- OpenAI API is used only for controlled manual tests, future integrations, and later approved automation.

## Default Model Rule

- Default API model is the cheapest approved mini model visible in OpenAI Platform.
- Stronger API model may be used only when mini is insufficient or the task is quality-critical.

## Test and Budget Rules

- First manual API test max cost is $0.20.
- No retry by default.
- API billing and usage must be checked separately from ChatGPT Business.
- Budget alerts and project limits should be configured before repeated API use.

## Initial API Pilot Budget

* Total starting API budget: $5.
* Default usage: manual OpenAI Platform Playground tests only.
* Default model: cheapest approved mini model visible in OpenAI Platform.
* Max per approved manual call: $0.20.
* No retry by default.
* No automation.
* No n8n.
* No webhook.
* No endpoint.
* At or above $3: review usage before next call.
* At or above $4: pause and ask Nicolas before next call.
* At or above $5: STOP until Thomas approves new budget.
* $5 is expected to be enough for the current manual API pilot/test ladder if mini model and one-call rule are followed.

## Approval and Use Limits

- No automation, n8n, webhook, endpoint, or agent API use without separate Nicolas approval.
- No API keys or secrets may be pasted in chat or committed.
- API tests must stop if model, pricing, selected project, billing, or cost estimate is unclear.

## Safety Boundary

- No API call is run by this document.
- No Playground use is authorized by this document.
- No credentials are created or stored by this document.
- No app code, package files, automation, commit, or push is approved here.

## Historical Marker

Backfilled from chat history where earlier API usage guardrails and cost limits were summarized.

## Scope Rule

This is an API usage policy only. It must not become a sprint log, decision log, role rules file, roadmap, or safety boundary replacement.
