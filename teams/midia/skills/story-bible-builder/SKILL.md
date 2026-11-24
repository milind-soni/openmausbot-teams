---
name: story-bible-builder
description: "Interview-driven skill that helps AI filmmakers, worldbuilders, and storytellers turn their story into a single dense canon document — the story's bible. Output is a ready-to-install SKILL.md the user drops into Claude as their own custom skill, so every future prompt (image, video, music, dialogue, scene) automatically knows the world, characters, voices, tone, plot, and production rules without eating into the user's 30 memory slots. Covers premise, thesis, timeline, factions, locations, characters with voice and movement locks, ensemble dynamics, plot engines, and production rules. Use whenever a user wants to build a story bible, lock in character consistency, capture their world, define character personality and voice, stop prompt drift, or turn a loose idea into an installable canon skill. Trigger on 'build a bible', 'story bible', 'lock my characters', 'character bible', 'canon doc', 'turn my story into a skill', or any close variant."
---

# Story Bible Builder

An interview-driven skill for building a **single dense canon document** — a story's bible — that ships as an installable SKILL.md the user can drop into Claude as their own custom skill.

The point: instead of burning memory slots on world context, or re-explaining the story every chat, the user gets one file that lives as a skill and auto-loads every time they work on their world.

The output is a locked, opinionated, prompt-ready canon doc. Not a template. Not a workbook. A **bible**.

---

## WHAT THIS SKILL IS FOR

Users bring a story world they're building — a film, a series, a game, an album, an AI-generated universe. This skill interviews them across every dimension of that world and assembles it into a single `SKILL.md` file matching the structure below. They install that file as a skill. Future Claude sessions read it and know their world.

**The output is one file.** Not modular. Not multi-file. One dense, canon SKILL.md — because that's what installs cleanly as a skill and stays under 500 lines.

---

## TWO WAYS THE BIBLE GETS USED

Every bible this skill produces is engineered to work in **both** modes below. Design every output to serve both.

### Mode 1 — Standalone canon reference

The user installs the bible as a skill and uses it on its own. Future Claude sessions read the bible when the user asks for anything set in that world — a scene, a dialogue exchange, a character beat, an outfit, a song lyric, a straight text-to-image prompt, a story pitch, a treatment. The bible provides the context so Claude doesn't have to ask.

For this mode, the bible needs to be **dense, opinionated, and self-contained** — no dependencies on other skills.

### Mode 2 — Context source for a video prompt director skill

Many users pair the bible with a video prompt director skill (like `cinema-worldbuilder-pro-20` or similar). In this pairing, the director skill handles the cinematography grammar, mode selection, frame composition, and prompt syntax. The bible provides the identity, voice, movement, aesthetic era locks, and canon that the director skill can't get from a reference image alone.

The director skill reads uploaded reference images for wardrobe, hair, and identity. It cannot read *voice*, *movement quality*, *stillness*, *what era's aesthetic applies*, or *what production rules are locked for this world*. Those come from the bible.

**When both skills are active in the same session**, the director skill should pull directly from the bible for:
- **Character voice descriptors** (goes into Sound Bed / dialogue direction)
- **Character movement and stillness descriptors** (goes into Subject Lock block)
- **Aesthetic era differentiation** (goes into World Plate / grade selection)
- **Production rules** (locked visual traits that must appear in every render — piercings, scars, permanent hair features, "never" clauses)
- **Ensemble dynamics** (informs Cross-Frame Rules when multiple canonical characters share a shot)

The bible's job is to make every one of those descriptors **copy-paste-ready** — quoted, tight, prompt-facing. If a descriptor in the bible can't be pasted verbatim into a Seedance Sound Bed or Subject Lock block, it's written wrong.

---

## THE STRUCTURE OF THE OUTPUT

Every bible this skill produces follows this section order. Not every section applies to every story — skip cleanly when the user says something doesn't apply.

1. **One-line premise** — the whole story in a sentence
2. **The thesis** — the core question every scene comes back to
3. **The world — timeline** — eras, years, what defines each
4. **Aesthetic era differentiation** — the palette/lighting/texture per era (critical for prompts)
5. **Major factions / powers / entities** — antagonists, protagonist groups, third parties
6. **Bases / locations** — where things happen, with visual specificity
7. **The rules of the world** — technology, magic, social systems, what's normal, what's forbidden
8. **The characters** — one deep section per character (structure below)
9. **Relationships and ensemble dynamics** — who fills silence, who leads what, who watches
10. **Structural engines** — the story shapes chapters can take
11. **Production rules** — locked prompt-facing rules the user has learned about their own work
12. **When this skill is active** — instructions to future Claude on how to use the bible, in both standalone and paired-with-director modes

Reference `references/character-section-format.md` for how each character section is structured. Reference `references/example-bible-excerpts.md` when the user needs to see what a good section looks like.

---

## THE BUILD FLOW

### Step 0 — Scope check (fast)

Ask in one compact block:
- What's the working title of the story?
- How many main characters?
- What genre/vibe? (One or two references — films, shows, games, albums, aesthetic movements)
- Does the world already exist in their head, or are we building parts from scratch?
- Which prompt tools will future scenes use? (Seedance, Banana Pro, Midjourney, Suno, ElevenLabs, etc.)

This shapes pacing, section depth, and what production rules to bake in at the end.

### Step 1 — The spine (premise, thesis, world timeline, aesthetic)

Sections 1–4 of the output. Interview the user through:

- **One-line premise.** Push hard for one sentence. If they give more, help compress. The compression is the value.
- **Thesis.** Not plot. Theme. The question every scene answers. If they can't state it, help them find it by asking "what's your character actually deciding, every time?"
- **Timeline.** Walk era by era. For each, ask: year(s), what defines it, aesthetic differentiation (palette, lighting quality, texture, grain). The aesthetic-per-era block is what keeps future image prompts consistent — push for specificity.

Assistant behavior: never invent. Mark `[TBD]` if the user doesn't know. Push on aesthetic locks — this is where most bibles are weakest. When a user says "dark and moody," ask "what colors specifically?" Reference the demo excerpts in `references/example-bible-excerpts.md` if the user needs to see the level of specificity.

### Step 2 — Factions, locations, world rules (sections 5–7)

Cover these together — they interlock.

- **Factions.** For each: name, what they do, what they believe, how they read visually (uniform, silhouette, color signature), public face vs actual behavior if there's a gap.
- **Locations.** For each: name, what it is, visual tags (three to seven words), function in the story. Push for the visual — "Berlin bunker" is not enough. Concrete walls, monitor light, cable spaghetti, one warm amber pocket — that's a location.
- **World rules.** Ask about: technology tier and access, magic/powers/abilities (and how they LOOK on screen — color, motion, sound), social systems, what's normal here that isn't normal in our world, what's forbidden or dangerous.

Short declarative bullets, not paragraphs. Dense.

### Step 3 — The characters (section 8, the biggest section)

**One character at a time. Never batch.** Each character gets a deep dedicated pass. This is where most of the bible lives.

For each character, run the character interview in `references/character-interview.md`. It covers:

- **Visual lock** — the physical descriptors that must appear in every prompt
- **Function in the story** — what role they play in the overall narrative
- **Backstory beats** — where they came from, what shaped them
- **Present-tense psychology** — where they are RIGHT NOW in the story, what they're carrying
- **Speech pattern** — register, cadence, vocabulary, signature phrases, dialogue prompt-ready descriptor
- **Movement pattern** — how they move, combat if relevant, gestures, tics
- **Stillness pattern** — what they do when they're not moving (often more revealing than movement)
- **Musical voice if music is in scope** — Suno-ready descriptor

After each character is drafted, show the user their section and ask: "Add anything, cut anything, sharpen anything?" Iterate until they lock it. Then move on.

### Step 4 — Relationships and ensemble dynamics (section 9)

Ask: "When these characters are in a room together, what's the shape of the room? Who leads what? Who fills silence? Who watches? Which pairings are calm, which are charged?"

Capture as short declarative sentences. Example: *"Maren and Wren are the quietest room in the house — neither fills space, both notice everything. Owen and Iris cannot be in the same kitchen without one of them leaving."*

This section is short but disproportionately valuable — it's what makes ensemble scenes feel real.

### Step 5 — Structural engines (section 10)

Ask: "What are the recurring chapter shapes your story runs on? Not specific episodes — the shapes. A heist? A rescue? A performance? A confrontation? A flashback?"

List each engine with a one-line description. Note that engines stack (a heist can end in a confrontation, a performance can be interrupted by a rescue). This gives future Claude a menu of story shapes to pull from when the user asks for a new scene.

### Step 6 — Production rules (section 11)

Ask: "What are the rules you've hard-earned about your own work? The stuff that only works in a specific way. Prompt rules, naming rules, canon lock rules, aesthetic rules that can't be broken."

Bake in these defaults for AI-filmmaker users unless the user overrides:
- No character names in image/video/music prompts (models drift on names) — refer by visual description
- Every prompt is standalone (no "matching the previous scene")
- Output prompts in code blocks, no aspect ratio in the prompt body
- Any locked physical traits get restated verbatim in every prompt

Add anything the user has learned from their own prompt work. Copy their exact phrasing where possible — this is a doc of their rules.

### Step 7 — Assembly and "when this skill is active" (section 12)

Assistant now assembles the full SKILL.md. The final section — "When this skill is active" — must instruct future Claude how to use the bible in **both modes**:

**Standalone mode:**
1. When the user asks for anything in this world (scene, dialogue, character beat, outfit, lyric, prompt, treatment), pull relevant character/world context from the bible and use it
2. Stay inside canonical world (year, locations, rules, relationships)
3. Never invent details that conflict with locked canon — ask instead
4. Use the quoted Speech/Movement/Stillness descriptors verbatim when writing prompts

**Paired-with-director-skill mode:**
1. If a video prompt director skill is also active in the session (e.g., `cinema-worldbuilder-pro-20` or similar), the director skill handles cinematography, mode selection, frame composition, and prompt syntax
2. The bible feeds the director skill: character voice → Sound Bed; movement/stillness → Subject Lock; aesthetic era locks → World Plate / grade; production rules → cross-frame rules and locked traits
3. When the user asks for a video prompt in this world, pull the relevant character's voice, movement, and stillness lines and the correct aesthetic era block, and hand them to the director skill's prompt structure
4. Named canonical character references (uploaded reference images the user always attaches) get called out here so the director skill knows to expect them

Ask the user what production companion skills they use (if any) and name them explicitly in this closing section so future Claude knows the paired workflow.

Ship the file with the YAML frontmatter (name + pushy description) and the full canon body. Save to `/mnt/user-data/outputs/[working-title-slug].md` and present.

Offer to zip it as an installable `.skill` file if the user wants that packaging.

---

## HOUSE PRINCIPLES (HOLD THROUGH EVERY INTERVIEW)

1. **Density over prose.** Bibles are working references, not pitch decks. Short declarative sentences. Bold labels. Bullet points. The user should be able to grep this doc.

2. **Never invent.** If the user doesn't know something, mark `[TBD]` in the doc and move on. Invented canon becomes locked canon becomes prompt drift.

3. **Push on the vague.** "Dark and moody" isn't an aesthetic lock. "Cool voice" isn't a voice profile. "Powerful" isn't a description. When the user gives a vague answer, ask the follow-up that makes it prompt-actionable — color specifics, register, movement quality. Reference `references/example-bible-excerpts.md` if the user needs to see the level of specificity.

4. **Locks exclude as much as they include.** When the user locks a physical trait, ask what the wrong-answer drift would be. "Warm fair skin — never pale porcelain, never tan." The "never" clause is what stops model drift over hundreds of future renders.

5. **Character depth matters more than character count.** Better to ship a bible with three deep characters than eight shallow ones. If the user is trying to cram too many characters into the interview, offer to do the deepest three first and hold the rest for a follow-up pass.

6. **The user's voice, not yours.** When they phrase something well, keep their phrasing verbatim. When they name their own rules, quote them. This is their bible.

---

## REFERENCE FILES

- `references/character-section-format.md` — Structure for each character section in the final output
- `references/character-interview.md` — Questions to walk each character through
- `references/example-bible-excerpts.md` — Sample sections at the right density level to reference or show the user

Load each reference only when its step is active.

---

## WHEN THE USER ONLY WANTS PART OF THIS

Common. If they say "I just want to nail down the characters" — skip straight to Step 3. If they want to update an existing bible, ask them to paste it and work from there. The full flow is the default, not a requirement.
