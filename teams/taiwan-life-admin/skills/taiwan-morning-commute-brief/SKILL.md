---
name: taiwan-morning-commute-brief
description: Turn CWA weather, YouBike availability, and garbage collection schedules into a plain-language brief for one area.
---

# Taiwan Morning Commute Brief

## Process

1. Confirm the user's area, saved YouBike stations, and garbage collection point.
2. Pull current CWA forecasts and rain information, real-time YouBike availability, and the city-issued collection schedule; record retrieval times.
3. Translate the data into plain guidance: umbrella, bike versus transit, whether the bin goes out tonight.
4. Garbage collection varies by district and route; if the exact route cannot be verified from a public source, say so instead of guessing.
5. Return one short brief with sources and timestamps.

## Guardrails

Use official or operator sources only. Keep warnings and advisories exact, never guess unverifiable collection times, and do not message anyone else.
