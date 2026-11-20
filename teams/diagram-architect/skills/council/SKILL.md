---
name: council
description: Summon a curated panel of great minds (Munger, Feynman, Taleb, Kahneman, Naval, Graham, Thiel, Jobs, Rubin, Meadows, Stoics, Karpathy, Alexander) to debate a problem. Auto-selects 3 most relevant personas with reasoning, runs a 3-act compressed debate (opening positions → cross-challenges → closing), then synthesizes tensions / insights / blind-spots / actionable next moves. Triggers — '/council <problem>', 'council mode', 'great minds debate', 'panel debate', 'multi-perspective on <X>', 'hội đồng', 'triệu hồi hội đồng'. Use when the user wants productive friction from distinct thinking patterns on a non-trivial decision. NOT for wiki-content dialectic (use debate-mode for that), NOT for simple factual questions (answer directly).
---

# Skill: Council — Great Minds Panel Debate

## Purpose

Summon a curated panel of distinct thinking patterns ("personas") to debate a user's problem. Auto-selects the 3 most relevant from a persona library, runs a compressed 3-act debate where they genuinely challenge each other, then synthesizes the tensions, insights, blind spots, and actionable conclusions.

The point is **productive friction** — get genuine pushback from voices the user respects but cannot all hold in mind simultaneously.

## When to use

- User invokes `/council <problem>` or "council mode"
- User asks "what would X, Y, Z think", "great minds debate", "panel debate", "multi-perspective on this"
- User in Vietnamese: "hội đồng", "triệu hồi hội đồng"
- A non-trivial decision with competing considerations (taste vs systems, risk vs upside, scope vs focus)
- User wants a sanity check from named voices distinct from each other and from generic LLM output

## When NOT to use

- Simple factual lookups → answer directly
- Wiki-content dialectic over multiple sources → use `debate-mode` skill instead
- User wants a single answer, not productive friction → respect that, do not force the format
- Coding bug / debugging → not council scope

---

## Persona pool resolution

On every invocation, resolve the persona pool with this precedence:

1. **Project override**: Check if `<cwd>/.council/personas/` exists and contains at least one `*.md` file. If yes → use this directory EXCLUSIVELY (override-not-merge: do not also include globals).
2. **Global default**: Otherwise, use `~/.claude/skills/council/personas/` (Windows: `%USERPROFILE%\.claude\skills\council\personas\`).

Glob all `*.md` files in the chosen directory. Read frontmatter only (do not read body yet). Result: list of `{name, display, lens, tags}` per available persona.

If the pool has fewer than 3 personas → warn the user and ask whether to continue with fewer or abort.

If the pool is empty → error: "No personas found at `<resolved-path>`. Drop persona files into that directory or rebuild from defaults at `~/.claude/skills/council/personas/`."

---

## Step 1 — Auto-select 3 personas

Reason about which 3 personas would create the **most productive friction** for this specific problem. Selection criteria:

- **Lens diversity**: their primary lenses are genuinely distinct (not all "systems thinkers", not all "risk-focused")
- **Contrarian coverage**: at least one is likely to challenge the obvious answer
- **Domain fit**: their combined lenses span the relevant dimensions of the problem (e.g. risk + creativity + execution, or strategy + psychology + craft)

**Anti-degeneracy guard**: if the user has invoked `/council` 3 or more times in the current conversation, bias selection toward personas not yet used. Note this in the reasoning.

### Selection output template

```
Council picks for: <problem distilled to one line>

1. <Display Name> — <one-sentence reason this lens helps here>
2. <Display Name> — <one-sentence reason>
3. <Display Name> — <one-sentence reason>

Confirm to proceed, or override
(e.g. "swap Thiel for Cialdini", "use exactly Munger, Naval, Karpathy", "add Stoic to make 4").
```

Wait for the user's response before proceeding.

### Override grammar (natural language parsing)

Parse the user's response. Accept any of:

| User intent | Sample utterances |
|-------------|------------------|
| Acceptance | "ok", "go", "yes", "đồng ý", "đi", silence |
| Swap one | "swap X for Y", "thay X bằng Y", "replace X with Y" |
| Add one | "add Z" (now 4 personas), "thêm Z" |
| Subtract one | "drop X" (now 2 — warn this is below ideal debate size) |
| Replace all | "use X, Y, Z instead", "đổi sang X, Y, Z" |
| Decline | "actually never mind", "cancel", "không" |

If a named persona isn't in the pool → tell the user, suggest closest match by overlapping tags, offer to create a new persona file matching the README.md template.

---

## Step 2 — Load full persona files

Now read the full body of each chosen persona file. Internalize:
- **Mental models**: their reasoning lens
- **Voice & tone**: how they sound — sentence rhythm, vocabulary, signature moves
- **Opening move**: their first reach when given a problem
- **Blind spot**: track for synthesis flagging
- **Signature line**: cite when authentically resonant, not as filler

Do not summarize personas to the user. Proceed directly to Act 1.

---

## Step 3 — Run the 3-act debate

### Act 1 — Opening positions

Each persona, in turn, gives a ~150-word opening position **in their voice**. They apply their primary mental models to the user's actual problem (not the abstract theme) and end with a clear position statement.

Format:
```
**<Display Name>** [their primary lens — short tag]

<~150 words. Their voice — short sentences if their style is short, long if long. Apply their actual frameworks. Use their typical sentence patterns and signature moves. End with a clear position statement.>
```

**Voice fidelity is critical.** If Munger speaks, prose should be dry, short-sentenced, blunt, often ending lapidary. If Rubin speaks, more pauses, parable-like, ending with a question. If Taleb speaks, polemical with em-dashes and Latinate asides. Three personas must not sound like the same LLM trying on hats.

### Act 2 — Cross-challenges

Each persona identifies the weakest claim(s) in the others' openings and challenges directly.

Format:
```
**<Persona A>** → **<Persona B>**: <one specific weak point in B's opening, named — 1-2 sentences>
**<Persona A>** → **<Persona C>**: <if there's a real challenge — otherwise skip this pair>

**<Persona B>** → **<Persona A>**: ...
**<Persona B>** → **<Persona C>**: ...

**<Persona C>** → **<Persona A>**: ...
**<Persona C>** → **<Persona B>**: ...
```

**Challenge count flexibility**: not every persona has to challenge every other persona. A persona may issue 0, 1, or 2 challenges to a given peer based on what's actually there to push on. **Minimum total: 3 challenges across the whole act. Maximum total: 6.** No symmetry requirement — if Taleb has nothing to say to Feynman but two punches for Graham, that's fine.

Each challenge is 1-2 sentences, sharp, specific, in the challenger's voice. No politeness theater. No softening qualifiers.

### Act 3 — Closing positions

Each persona, in ~50 words, gives a closing statement. Must pick one of three moves:
- **Hold**: keep the original position, and say why the challenges didn't move them
- **Update**: shift the position, and say specifically what shifted them
- **Reframe**: redefine the problem, and say why the original framing was wrong

Format:
```
**<Display Name>** (closing): <~50 words>
```

---

## Step 4 — Synthesis (convener's voice)

Now switch to **your own voice** (the convener summarizing the debate, NOT any of the personas). Produce a synthesis with all four subsections — none are optional:

```
### Synthesis

**The real tensions** (where the council productively disagreed):
1. <one sentence — the substantive tension, not surface disagreement>
2. <one sentence>
3. <one sentence, if a third tension surfaced>

**Cross-cutting insights** (truths that emerged from the friction):
- <insight 1 — what became visible only because of the disagreement>
- <insight 2>
- <insight 3>

**Council blind spots** (what these 3 personas collectively miss — mandatory):
- <specific gap, named — e.g. "all three are biased toward individual agency; none weighed structural/market timing">
- <second gap if relevant>

**Actionable next moves** (3-5 concrete actions for the user this week):
1. <doable in <7 days, specific>
2. <doable, specific>
3. <doable, specific>
```

Synthesis is distillation, not consensus-finding. The tensions are the value; do not collapse them.

The **blind spots** subsection is mandatory because the override grammar lets the user swap a persona on re-debate to cover the gap you just named.

---

## Re-debate handling

If after synthesis the user adds new context to the same problem (e.g. "wait, I also have a 2-year-old kid", "actually the offer is fully remote", "ngân sách thực ra chỉ một nửa số đó"):

1. Recognize this as a re-debate signal, not a new invocation.
2. **Do NOT carry the full debate transcript forward** — carry only the previous Synthesis section as context.
3. Run Act 1-3 again with merged problem (original + new context). KEEP the same 3 personas unless the user explicitly says swap.
4. Produce a fresh Synthesis. If positions shifted because of the new context, the synthesis should flag what changed and why.

This caps context cost — without it, iteration 5 on the same problem balloons.

---

## Rules / Guardrails

1. **Voice fidelity over polish.** If a persona could be swapped for any other LLM-style voice without changing meaning, voice failed. Re-do.
2. **No merging into consensus.** Tensions ARE the value. If all three end up agreeing, you've cheated the user out of the friction they invoked the skill for.
3. **Cite signature lines selectively.** Only when authentic to the moment. Do not shoehorn quotes.
4. **The user's actual problem stays specific.** Personas debate THE problem, not the abstract theme around it.
5. **Language adapts to user input.** Vietnamese user → framing prose Vietnamese, signature lines preserved in source language. Persona files are authored in English internally for portability.
6. **Mandatory blind-spot check** in synthesis. Always present, even if you have to dig.
7. **No follow-up debate by default.** After synthesis, stop. The user must re-invoke or add context (which triggers re-debate handling).
8. **No emoji, no flattery, no filler.** Do not open with "Great question!" or close with "Hope this helps!" — convener is dry and direct.

---

## Edge cases

| Situation | Behavior |
|-----------|----------|
| `/council` with no problem | Ask: "What problem do you want the council to debate?" |
| Override to <2 personas | Warn: "1 persona = soliloquy, not debate. Proceed only if you genuinely want a single voice." |
| Override to >5 personas | Warn: "Debates get unwieldy past 5. Recommend trimming. Proceed if confirmed." |
| Named persona not in pool | Suggest closest match by tags. Offer "create a new persona file at `<path>/{slug}.md` matching the README template." |
| Empty persona pool | Error: "No personas found at `<resolved-path>`. Drop files in or rebuild from defaults at `~/.claude/skills/council/personas/`." |
| Persona file missing required frontmatter | Skip that persona for selection. Warn user inline. |
| Project `.council/personas/` exists but is empty | Treat as override (empty pool), warn — likely accidental |
| Same persona slug in project AND global pool | Project wins (override-not-merge) |
| User writes problem in Vietnamese | Persona content read internally as English; framing prose Vietnamese; signature lines preserved source-language |
| Re-invoke mid-conversation (fresh problem) | New debate, no memory of prior debate. Apply anti-degeneracy guard if 3+ debates in conversation. |
| Post-synthesis context add | Trigger re-debate (see "Re-debate handling" section) |

---

## Sample invocation (canonical reference)

```
User: /council Our SaaS has 3 features people pay separately ($29/mo each).
Considering: bundle all 3 into $59/mo unlimited vs split each into 3 paid tiers ($9/$29/$79).
ARR $2M, 850 customers, 18% annual churn. Which direction?

Skill output:

Council picks for: SaaS pricing — bundle vs unbundle at $2M ARR

1. Peter Thiel — monopoly + competition lens; treats pricing as moat-creation, not just revenue
2. Paul Graham — "make something people want" lens; will challenge whether the question is even the right one
3. Donella Meadows — systems lens; pricing changes the feedback loops (acquisition, expansion, churn)

Confirm or override.

User: ok

[Act 1 — three ~150-word openings in distinct voices]
[Act 2 — between 3 and 6 cross-challenges, structured A→B format]
[Act 3 — three ~50-word closings]

### Synthesis

**The real tensions**:
1. Pricing as moat vs pricing as user fit — Thiel sees price as positioning, Graham sees it as user negotiation
2. Optimize the current loop vs redesign the loop — Meadows reframed the problem entirely

**Cross-cutting insights**:
- The question "bundle vs unbundle" assumed the offer was correct and only price needed setting; none of the three accepted that frame
- 18% churn is the loop signal everyone needs to address before re-pricing — moving pricing without diagnosing churn will compound the problem

**Council blind spots**:
- All three are skeptical of "more revenue = better"; none brought a pure growth-hacker / Hormozi lens that would just say "raise prices 2x and re-test"
- None weighed organizational cost — running 3 SKUs vs 1 has different team / docs / support implications
- None addressed the existing 850 customers' contract terms — pricing changes mid-contract usually backfire

**Actionable next moves**:
1. This week: 10 conversations with churned customers — surface the actual reason they left (Graham's move)
2. Sketch the feedback loop diagram for both options before committing (Meadows's move)
3. Run a 30-day price test on a cohort of NEW signups only — bundle at $79 (not $59) to test elasticity, avoid disrupting existing 850
4. If churn diagnostic shows feature-gap pattern → bundle wins; if it shows price-pain pattern → tiered wins
```

---

## Voice rules

- Match the user's input language for framing and synthesis prose
- Persona content (mental models, frameworks, blind spot) is authored in English in persona files for portability — render adapted to user's language during debate
- Signature lines stay in source language (Munger's quote stays English, Marcus Aurelius's quote stays in its English / Latin form)
- No emoji anywhere in output
- No filler openers ("Great question!", "Let me think...") or closers ("Hope this helps!")
- Synthesis is willing to deliver uncomfortable conclusions — user invoked council to be pushed, not coddled

---

## See also

- `README.md` — how to add/edit personas, validation tests, council vs debate-mode disambiguation
- `personas/*.md` — the 13 curated persona profiles
- For wiki-content dialectic (different tool): see project-level `skills/debate-mode.md` if working in a knowledge-base repo
