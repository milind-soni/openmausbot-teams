---
name: fiction-ad-test-and-scale
description: Disciplined small-budget testing, kill, scale, and round-by-round learning log system for indie fiction ads (Meta/social). Prevents blank-slate ideation, premature kills, wasted spend, and unlogged rounds. Also guides Linnea-Scout on what evidence to gather after each round.
---

# Fiction Ad Test and Scale

Use this skill whenever planning, running, reviewing, or scaling a round of indie fiction ads. Never spend money or change live ad budgets without Kevin's explicit approval.

## 1. Grounded-Inputs Rule (Refuse Blank-Slate Ad Ideation)

Do not invent ad concepts from vibes or plot summaries alone. Before designing a test round, verify these real inputs are on hand and cite the source for every concept:
1. **Live market evidence** from **Linnea-Scout** (active long-running genre ads, hook patterns, visual grammar).
2. **Real manuscript material** (exact chapters, scenes, dialogue lines, or beats from the book).
3. **Prior round log** (for Round 2+, what passed/failed pre-launch QC and what actually earned clicks/downloads).

If any required input is missing, request it from Linnea-Scout or the manuscript folder before drafting creatives.

## 2. Cold-Traffic "Sell the Click" Rule (Awareness Level)

Cold social feed readers are **unaware** of the author and **genre-aware** at best:
- The ad's **only job** is to earn the click to Amazon (sell the click, not the entire plot or series).
- Do not cram synopsis, worldbuilding, or 4 character bios into the ad. Let one razor-sharp tension hook win the click, and let the Amazon page (verified by `amazon-landing-conversion-audit`) convert the borrow or download.
- Treat the **first ~125 characters** of primary copy (before Meta's "See more" fold) as the entire copy pitch for cold traffic.

## 3. Test Order Hierarchy (Isolate One Lever at a Time)

Test in this order so you learn *why* something worked instead of guessing:
1. **Concept / Angle** (e.g., action-dialogue confrontation vs. murder-board mystery vs. trope/premise reveal)
2. **Hook (Frame 1 / Line 1)** — test 3 distinct hooks against the same angle before abandoning a concept
3. **Visual Format** — validate winning concepts with **low-cost stills first (`$0` video credits)** before investing video credits; for shorts/Reels, render **1 base cut + 3 Frame-1 hook swaps** (`$0` extra video generation)
4. **Primary Body Copy**
5. **CTA / Offer framing**

## 4. Small-Budget Structure & Spend Gate

- **80/20 Pot Separation (Once Winners Exist):** Keep a **~20% testing pot** separate from an **~80% proven-winners pot** so new tests never destabilize winning ad sets. During a cold Round 1 launch, 100% of the approved test budget goes to testing.
- **Spend Gate Before Judging:** Do not kill or declare a winner off 40 impressions. Wait until a creative clears a minimum spend/impression gate before judging:
  - *Initial baseline to calibrate:* **~3x target cost-per-outbound-click** OR **500-1,000 impressions**, whichever comes first.
- **Hit-Rate Realism:** Plan on roughly **5 to 6 tested concepts per real winner** (*B2B baseline — track and replace with our own fiction hit rate after Rounds 1-2*).

## 5. Fiction Metrics & Diagnostic Matrix

Replace B2B lead metrics with indie book economics:
- **Thumb-Stop / 3-Second View Rate** (video)
- **Outbound Link CTR** (clicks going to Amazon — NOT "CTR (all)" which counts likes/expands)
- **Cost per Outbound Click (CPC to Amazon)**
- **Amazon Click-to-Download / Borrow Conversion** (free downloads, sales, or KU borrows)
- **KENP Page Reads** & **Book 2 Read-Through** (once Book 2+ is live)

Use this diagnostic table before making Round 2 changes:
- **Low 3-sec hold / Low Outbound CTR** -> **Creative / Hook problem.** Fix Frame 1, Line 1, or concept angle.
- **Strong Outbound CTR + Weak Amazon downloads/borrows** -> **Landing-Page mismatch.** Stop making new ads and run `amazon-landing-conversion-audit` on the Amazon page.
- **Strong Book 1 downloads/borrows + Weak Book 2 read-through** -> **Book / Back-Matter / Pricing problem.** Flag for editorial or series-funnel pass, not ad creative.

## 6. Live-Campaign Scaling & Hygiene Rules

Only apply with Kevin's explicit budget/launch approval:
- **Never edit a live ad.** Editing resets Meta's learning phase and corrupts test data. Always duplicate into a new ad or launch a clean sibling variant.
- **Scale slowly (+20% ceiling):** Raise budget on a winning ad set by **no more than +20% per step**, waiting **48-72 hours** between increases. Never jump +30% or double overnight.
- **Watch creative fatigue:** Track ad frequency on cold audiences (*initial baseline:* if frequency climbs past **~2.5-3.0** and Outbound CTR drops **>25%**, rotate in a fresh hook or concept instead of raising budget).

## 7. Mandatory Stop-and-Check Round Log (Feeds Linnea-Scout)

At the end of **every round** (including Design-Only Round 1 before any spend), write a compact round log to disk:

| Creative ID | Day / Format | Concept & Source | Hook Variant | Pre-Render Gate Result | Live Metrics (or `NOT RUN`) | Decision (`KEEP` / `ITERATE HOOK` / `KILL` / `FIX LANDING`) | 1-Line Reason |
|---|---|---|---|---|---|---|---|

Below the table, always include two short sections:
1. **Skill / Tool Gaps Found:** Which gate item failed, was ambiguous, or lacked a tool/template?
2. **Next Research Brief for Linnea-Scout:** Exact live pattern, competitor proof, or fiction benchmark to gather before the next round.

## Calibration & Provenance

- **Calibration notice:** Numeric Meta rules above (80/20 pot split, 3x spend gate, +20% scaling ceiling, ~2.5-3.0 fatigue frequency, ~6 tests per winner) originate from B2B/direct-response playbooks and are **initial indie-fiction baselines**. Replace them with Kevin's verified fiction numbers as soon as Rounds 1-2 produce real data.
- **Attribution:**
  - Grounded-inputs rule, concept>hook>visual>body>CTA hierarchy, 80/20 testing/scaling split, spend gate, +20% scaling ceiling, fatigue watch, and no-live-edit rule adapted from Corey Haines's `marketingskills` (`ad-creative` v2.13.5 & `ads` v2.7.9, MIT License, `https://github.com/coreyhaines31/marketingskills`).
  - Cold-traffic Schwartz awareness framing, "sell the click vs. sell the solution", and first-125-character mobile fold discipline adapted from Rob Palmer's `claude-code-copywriting-skills` (`ad-copy`, CC-BY-4.0, `https://github.com/robpalmer99/claude-code-copywriting-skills`).
