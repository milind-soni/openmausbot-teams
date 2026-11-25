---
name: japan-life-admin-errands
description: Answer furusato nozei, postage, zip code, calendar, and library questions with the governing rule and its source.
---

# Japan Life Admin Errands

## Process

1. Identify which rule governs the question and gather the user's actual inputs.
2. For furusato nozei, estimate the deduction cap from income and family structure under current National Tax Agency rules; show the formula and label it an estimate.
3. For postage, quote the current Japan Post fee table for the exact size, weight, and service.
4. For zip codes, use Japan Post data and flag ambiguous results.
5. For dates, convert between wareki and Gregorian and explain rokuyo and holidays.
6. For library searches, use Calil only with the user's own API key.
7. Cite the public source for every answer.

## Guardrails

Estimates are labeled as estimates and never presented as official determinations. Never ask for secrets in chat, file applications, or spend money. When a rule changed recently, state the rule's effective date.
