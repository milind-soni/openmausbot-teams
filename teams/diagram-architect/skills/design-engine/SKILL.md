---
name: design-engine
description: "Generate social graphic artifacts (banner, quote card, carousel) from a design DNA template. Wizard-driven workflow for marketers and designers. Phase 1 dogfood: banner multi-platform from image-gen route."
risk: unknown
source: me.sunny
date_added: "2026-05-26"
phase: 1
---

# Design Logic Engine

A 4-beat engine that translates aesthetic templates into reusable design DNA, then generates new social graphics that inherit the template's visual identity.

## When to use this skill

- User invokes `/design-engine` directly.
- User asks for a social graphic (banner, quote card, carousel) for a post they are writing.
- User says "make me a banner", "thiết kế banner", "vẽ banner cho post X", or similar in any language.

## When NOT to use this skill

- User wants a logo, brand identity, or product UI mockup — these are out of scope.
- User wants to edit an existing image — this skill renders new artifacts, it does not edit.
- User wants a generic image with no brand consistency — use a plain text-to-image tool instead.

## Prerequisites before running

1. At least one DNA file must exist at `templates/design/_engine/dna/<slug>.dna.md` with `rules_approved: true`. Phase 1 starting DNA: `ameeri-logistics-premium`.
2. Workspace AGENTS.md must permit writes to `outputs/design/` (added 2026-05-26).
3. User has access to an image generation tool (GPT-image, Gemini Image, Nano Banana, or similar) and will run the final prompt in their preferred interface.

## The 4-beat flow

### Beat 1 — Wizard (5 questions, sequential)

Ask these 5 questions one at a time. After each answer, save it to working state and ask the next.

**Q1 — Which DNA template?**
List all DNA files found at `templates/design/_engine/dna/*.dna.md` with their `display_name` and `mood_keywords`. User selects by number or slug.

**Q2 — Which use case?**
Options: (1) Banner đăng title, (2) Quote card, (3) Carousel. Phase 1 only banner is fully supported; flag the others as "Phase 2 — limited support".

**Q3 — Content text?**
User pastes the headline + optional sub-info. Vietnamese is the default language.

**Q4 — Project slug?**
A kebab-case English slug identifying the post/campaign this graphic belongs to (e.g. `co-may-3-tram`, `tickup-launch`). This becomes the folder name under `outputs/design/`.

**Q5 — Which platforms?**
Multi-select: Facebook, Threads, LinkedIn, Instagram. In Phase 1 minimal, render Facebook only (1080×1080). Phase 2 adds the other 3 with composition adapted per aspect.

**Q6 — Footer text (left + right)?**
The footer appears at bottom of every poster, split left and right. Different jobs may belong to different brands (me.sunny, TickUp, client X, etc.), so do not hardcode.

Ask:
- Footer LEFT (typically website/contact): default `me.sunny.vn` — user types to override (e.g. `tickup.vn`, a phone number, an email).
- Footer RIGHT (typically social handle): default `@sunny.chunin` — user types to override (e.g. `@tickup`, another handle, leave empty).

Either side may be empty if the user wants a single-side footer. If both are empty, omit the footer block entirely.

Whatever values the user provides become the EXACT strings the prompt template instructs the image-gen tool to render — the anti-drift guard prevents the AI from inventing alternative phone numbers or handles.

### Beat 2 — Load context

Read these files into working memory:

- The chosen DNA file (`templates/design/_engine/dna/<slug>.dna.md`).
- The voice profile (`identity/VOICE_PROFILE.md`) — to check that the proposed mood matches the user's writing tone.
- The use-case spec (`templates/design/_engine/use-cases/<use-case>.md`) — Phase 2.

If any file is missing, stop and ask the user how to proceed (do not fall back silently).

### Beat 3 — Clarifier (Phase 2)

Phase 1: SKIP this beat to keep the loop short. Use DNA defaults directly.

Phase 2: ask 4 feeling-based questions (mood, color shift, hero metaphor, language) each with option (e) Khác. See `_engine/prompts/nip3-clarify.md`.

### Beat 4 — Render

Read `render_route` from the DNA file.

**If `render_route: image-gen` (Phase 1 supported):**

1. Load the **prompt template** companion file: `templates/design/_engine/dna/<dna-slug>.prompt.md`. This is a Sunny-validated full English prompt with `${PLACEHOLDER}` slots. If the companion file is missing, STOP and tell the user — do not build an ad-hoc prompt (this caused footer drift in v1).
2. Fill every `${...}` placeholder from the appropriate source:
   - `${PROJECT_NAME}` ← wizard Q4 answer.
   - `${BRAND_NAME}` ← default `me.sunny`; ask the user if the project is for a different brand (e.g. `TickUp`).
   - `${WEBSITE}` ← wizard Q6 LEFT answer (default suggest `me.sunny.vn`, user may override per job).
   - `${SOCIAL_HANDLE}` ← wizard Q6 RIGHT answer (default suggest `@sunny.chunin`, user may override per job).
   - `${HEADLINE_VI}` ← wizard Q3 headline.
   - `${SUB_HEADLINE_VI}` ← wizard Q3 sub (empty string if user gave none).
   - `${HERO_METAPHOR}` ← propose from DNA mood + user content (one paragraph describing a single concept-driven object). Phase 1: engine proposes, user accepts/edits in chat. Phase 2: Clarifier handles this.
   - `${PRIMARY_COLOR_HEX}` ← `dna.tokens.palette.primary`.
   - `${ACCENT_COLOR_HEX}` ← `dna.tokens.palette.accent[0]`.
   - `${ASPECT_RATIO}` ← derived from wizard Q5 channel: Facebook=1:1, Threads=9:16, LinkedIn=16:9, Instagram-feed=1:1, Instagram-story=9:16.
   - `${CANVAS_SIZE}` ← derived from aspect ratio (1:1=1080x1080, 9:16=1080x1920, 16:9=1200x628, 4:5=1080x1350).
3. Output the FULLY FILLED prompt to the user with reference image paths listed at the bottom. The user runs this in their preferred image-gen tool (GPT-image, Gemini, Nano Banana).
4. Wait for the user to paste the resulting image path or upload it. Read the image with the Read tool to verify it exists and rough-check headline text against the input (Vietnamese diacritic safeguard — see Edge Case 1). Also verify footer text matches `${WEBSITE}` and `${SOCIAL_HANDLE}` exactly — if the image-gen invented different footer text, regen with the same prompt (the anti-drift guard in the prompt template will catch it on retry) or fall back to hybrid composite.

**If `render_route: code-render` (Phase 2):**

Defer — implemented in Tuần 3 of the Implementation Roadmap.

**If `render_route: hybrid` (Phase 2):**

Defer — implemented as fallback when Vietnamese diacritics fail in image-gen.

### Beat 5 — Persist output

1. Move the generated image to `outputs/design/<project-slug>/<channel>/banner-YYYY-MM-DD.png`.
2. If a file with that name already exists, append `-v2`, `-v3`, etc. (do not overwrite).
3. Write `outputs/design/<project-slug>/_meta.json` with:
   ```json
   {
     "project": "<slug>",
     "renders": [
       {
         "date": "YYYY-MM-DD",
         "dna": "<dna-slug>",
         "use_case": "banner",
         "channels": ["facebook"],
         "files": ["facebook/banner-YYYY-MM-DD.png"],
         "headline": "<input text>",
         "prompt_used": "<final prompt>",
         "render_route": "image-gen",
         "errors": []
       }
     ]
   }
   ```
   On subsequent runs for the same project, append to `renders[]`.
4. Append a row to `outputs/design/_kpi.md` (create file if missing) with columns: Date, Project, DNA, Use case, Time-to-output, `Sunny dùng output?` (leave blank for user to fill), Note.
5. Append an entry to `log.md` at workspace root:
   ```
   ## [YYYY-MM-DD] session | design-engine <use-case> <project-slug>
   
   DNA: <dna-slug>. Output: <count> file(s) in outputs/design/<project>/<channel>/. Render route: <route>.
   ```

### Beat 6 — Safeguard (Vietnamese text soát)

After persisting, preview the image inline in chat and ask the user:

> "Mình đã ghi <count> file vào `outputs/design/<project>/`. Sunny soát giúp:
> 1. Text tiếng Việt có đúng chữ và đúng dấu không?
> 2. Composition có bám DNA không?
> Nếu OK, mình đánh dấu `Sunny dùng output? = yes` trong `_kpi.md`. Nếu sai, mình regen 1 lần — sau đó nếu vẫn sai sẽ fallback hybrid (gen background + composite text)."

Wait for user response before closing the loop.

## Output destination

- Artifacts: `outputs/design/<project-slug>/<channel>/<file>.png`
- Metadata: `outputs/design/<project-slug>/_meta.json`
- KPI tracking: `outputs/design/_kpi.md`
- Append: `log.md` at workspace root

## Conventions

- All file/folder names: lower-case, hyphenated, no spaces, no Vietnamese diacritics (per AGENTS.md mục 9).
- All DNA files and engine internal prompts: English (per Decision Log item 6).
- User chat interaction: Vietnamese unless user writes in another language.
- Never overwrite existing PNG artifacts — auto-version with `-v2`, `-v3` suffix.

## Phase 1 limitations (acknowledge upfront)

- Only Facebook 1080×1080 fully implemented. Threads, LinkedIn, Instagram added Tuần 2.
- Only image-gen render route. Code-render and hybrid added Tuần 3-4.
- Clarifier skipped — uses DNA defaults. Added Tuần 2.
- No automated quality check; user soát text manually.

## Implementation roadmap reference

Full 4-week Phase 1 plan: `sessions/outputs/2026-05-25_design-logic-engine-spec.md` section 10.

Exit gate Phase 1: ≥80% of jobs have `Sunny dùng output? = yes` in `_kpi.md` after 4 weeks. If <80%, stop and refactor before adding more DNA or use cases.

## Council guardrail

Per `COUNCIL_REPORT.md` Ưu tiên 0 and Ưu tiên 2: this engine is a dogfood project. The 4-week budget for it should not exceed 30% of Sunny's working hours; the other 70% goes to outreach for Trạm 3 customers. If the engine starts consuming more time than that, flag it before continuing.
