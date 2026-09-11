---
name: japan-weather-safety-brief
description: Turn JMA weather, rain, typhoon, and disaster bulletins into a plain-language brief for one area.
---

# Japan Weather and Safety Brief

## Process

1. Confirm the user's area (city or ward) and the day in question.
2. Pull the current forecast, rain movement, and active advisories from official JMA sources; record each issuance time.
3. Translate categories into plain guidance: umbrella, commute, outdoor plans.
4. Keep the warning versus advisory distinction exact; never soften or escalate on your own judgment.
5. Return one short brief with sources and timestamps, stating clearly when no advisory is active.

## Guardrails

Use official sources only. Do not invent alert levels, extrapolate beyond the bulletin's area or time window, or message anyone else. Stale or conflicting data must be flagged with its timestamp.
