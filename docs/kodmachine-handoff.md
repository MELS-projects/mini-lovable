# Kodmaskin Handoff — Planner → Executor → Sandbox

> Detta dokument definierar hur en DeerFlow/Hermes-planner lämnar över en uppgift till
> en executor (Hermes-agent, Codex, eller annan kodningsagent) som sedan verifieras i
> Mini-Lovable-sandlådan.
>
> Syftet är att göra kedjan repeterbar och maskinläsbar, även utan Multica.

---

## 1. Mål

Kedjan ska kunna:

1. Ta en high-level goal från DeerFlow-planner (eller manuellt)
2. Översätta den till en exakt handoff med fil- och fas-scope
3. Låta en executor jobba mot handoffen
4. Verifiera resultatet i Mini-Lovable-sandlådan (smoke-run)
5. Presentera en approval-rapport för mänsklig granskning
6. Efter godkännande: commit + push

---

## 2. Handoff-format

Handoffen skickas som en fil eller JSON-blob med följande fält:

```json
{
  "goal": "Kort beskrivning av vad som ska byggas",
  "phase": "Phase N — beskrivande namn",
  "scope": {
    "allowed_files": ["src/App.jsx", "docs/*.md"],
    "forbidden_files": ["package.json", "Dockerfile", ".env", "*.secret"],
    "max_fix_rounds": 2
  },
  "requirements": {
    "smoke_run": true,
    "build_required": true,
    "approval_gate": true
  },
  "return_format": {
    "summary": true,
    "files_updated": true,
    "test_results": true,
    "fix_rounds": true,
    "blockers": true,
    "git_status": true
  },
  "commit_rule": "commit only after Thomas approval, push only after explicit push approval"
}
```

---

## 3. Flöde (planner → executor → sandbox)

```
[Planner]                         [Executor]                    [Sandbox]
    │                                │                              │
    ├─ goal ────────────────────────►│                              │
    │                                │                              │
    │   (handoff.md läses)           │                              │
    │                                ├─ gör ändringar ────────────►│
    │                                │                              ├─ smoke-run
    │                                │                              ├─ git diff --stat
    │                                │                              ├─ PASS/FAIL
    │                                │◄──── approval report ───────┤
    │                                │                              │
    │◄─── resultat ─────────────────┤                              │
    │                                │                              │
    [Thomas approval]               │                              │
    │                                │                              │
    ├─ commit ─────────────────────►│                              │
    ├─ push ───────────────────────►│                              │
```

---

## 4. Return-format (executor → planner)

Varje körning returnerar en rapport med dessa sektioner:

| Sektion | Krävs | Innehåll |
|---------|-------|----------|
| Sammanfattning | Ja | Vad ändrades, varför MVP-relevant |
| Filer uppdaterade | Ja | Lista över ändrade filer |
| Tester/build/smoke | Ja | Kommandon + PASS/FAIL per steg |
| Fixrundor | Ja | Antal använda, vad fixades |
| Blockerare | Ja | Lista eller "Inga" |
| Git | Ja | Branch, ahead-status, working tree |
| Nästa beslut | Ja | Rekommendation: approve commit+push / approve commit only / ändring / stoppa |

---

## 5. Smoke-run-krav

Kommando: `npm run smoke-run`

Kontrollerar:
- `git status` före
- `npm run build` (eller motsvarande)
- `git diff` / `git diff --stat`
- `git status` efter
- PASS/FAIL-sammanfattning

Om smoke-run failar → max 2 fixrundor → om fortfarande FAIL → rapportera blockerare.

---

## 6. Approval-gate

Innan commit/push:

| Villkor | Krav |
|---------|------|
| working tree clean | Ja |
| build passerar | Ja |
| smoke-run PASS | Ja |
| max 2 fixrundor | Ja |
| Thomas explicit godkännande | Ja |

Approval sker i chatten. Godkännande innebär:
1. Commit görs i samma flöde
2. Push sker först efter explicit push-godkännande

---

## 7. Commit/push-regel

| Åtgärd | När | Vem |
|--------|-----|-----|
| Commit | Efter Thomas approval | Executor |
| Push | Efter explicit push-approval | Executor |
| Branch | Feature-branch eller direkt på main (beroende på fas) | Enligt scope |

Commit-meddelande-format:
```
<repo>: <kort beskrivning>
```

Exempel:
```
mini-lovable: add planner handoff contract
```

---

## 8. Integritetsregler

- Ändra bara Mini-Lovable (detta repo)
- Rör inte Chattis, governance eller andra projekt
- Inga externa tjänster
- Inga secrets
- Ingen deploy
- Ingen riktig DeerFlow/Multica-integration ännu
