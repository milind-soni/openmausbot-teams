---
name: "shotcaller-v2"
description: "Shotcaller v2 — Seedance 2.0/2.5 cinema director by Joey; use instead of v1. Adds Element-handle-first tagging, video character reference sheets that lock look, voice and emotion, and lyric-driven music video lipsync."
---

# Shotcaller v2 — Seedance Cinema Director

A skill made by Joey. Use it for any Seedance or video generation prompt: a scene broken into shots, an action sequence, a music video or performance shot, a dialogue or talking scene, a lipsync shot, or a video extension.

**New in v2:** Element handles are the default reference tag, and Claude asks for them first and never invents them. Video character reference sheets lock a character's look, voice and emotional performance together. Music video lipsync requires the lyrics for the exact section, names the mouth shape on each word, and takes the track as a whole-second video tagged @video1.

## UPGRADING FROM V1 — TURN V1 OFF

v2 replaces Shotcaller v1 and carries everything v1 does, plus the new rules. If both are switched on, they compete for the same requests and Claude may load the old one, so **turn v1 off before using v2.**

It's one toggle and takes a few seconds: open the list of skills in Claude's settings, find Shotcaller v1, and switch it off. Nothing is deleted, and it can be switched back on anytime.

**For Claude:** if Shotcaller v1 also appears among the available skills in this session, tell the user once, in one line at the start ("Heads up: Shotcaller v1 is still on — switch it off in your skills settings so it doesn't compete with v2; it's a single toggle."), then carry on with v2.

---

Every prompt is a production document: who is in frame, where they stand in depth, what they do, what they say and how they say it, how gravity acts on them, how it's filmed, what the air does, what's heard, and what must not drift.

**The model is a physics engine, not a mood board.** If a word doesn't produce a visible pixel or an audible sound, cut it.

This is the whole director: action, choreography, product shots, performance, strobe, lipsync, silent scenes, dialogue scenes, and extensions of an existing clip all run on the same spine. Dialogue and extensions each have their own section below; everything else is the spine itself.

---

## STEP ZERO — TARGET VERSION

| | Seedance 2.0 | Seedance 2.5 |
|---|---|---|
| Image references | 9 max | 50 max |
| Runtime | 15s max | 30s max |

If the user hasn't said, ask once, in one line. It holds for the session.

**On 2.0** reference slots are rationed: characters in narrative order, then a shared group wardrobe sheet, then props, then environment, then video or audio last. A prop that only needs to read approximately can live inside a character's Asset line. Anything past 15s becomes two prompts.

**On 2.5** slots stop being scarce: a character can carry front, profile, and detail references; every group member gets their own. Near-duplicate references still average faces — every reference does distinct work. For 16–30s, add anti-drift weight: one anchor reference named across every beat, the lens lock restated at the top of every beat, the Geometry Map restated whenever staging resets, and the full Locks chain.

Runtime available is not runtime required. Two camera vantages on the same action are two prompts on either version.

---

## REFERENCE TAGS — ELEMENTS FIRST

Before the pre-prompt check, **ask the user whether they have Higgsfield Elements** for the characters, locations, and props in the scene, and ask them to list the handles or send screenshots of them.

- **Element handles are the default tag.** Use them inline exactly as the user gives them (`@zara-ref-sheet`, `@zara-lounge`).
- **Never invent an Element handle.** Don't guess one from a character name, a project name, or a pattern in other handles. If a reference has no handle the user has given you, it isn't an Element.
- **Screenshots carry their handles.** When the user uploads screenshots of their Elements and a handle is written on the card (for example "Element • @zara-ref-test"), that written handle is the tag, copied character for character.
- **@image1, @image2… only as the fallback**, for references the user is attaching as plain images rather than Elements. A prompt can mix both: Elements by handle, plain uploads by @imageN in attach order.
- **Video references are always tagged @video1, @video2…** in attach order, unless the user has saved that video as an Element with its own handle.
- The examples in this skill use @image1 as a placeholder; swap in the real handles.

---

## DELIVERY

**1. Pre-prompt check** — references first, runtime last, one question.

**Deliver the check as plain chat text, never inside a code block.** Code blocks are for prompts only.

Format:

> Pre-prompt check:
> - References: each by its Element handle (or @image1, @image2… for plain uploads, @video1 for video references) with a descriptor — mark any video character reference sheet as `(video ref: look + voice + performance)`
> - Version: Seedance [2.0 / 2.5]
> - Scene: [location, who's in it, what happens]
> - Dialogue: [line count, speakers — and any flags from script intake]
> - Camera: [register, lens range]
> - Audio: [diegetic / attached track sole source]
> - Runtime: [total, shot count]
> 
> Run it?

**2. The prompt:**
1. Numbered reference list in attach order (within the version's cap)
2. Bolded English title with runtime — `**Kitchen argument — 3 shots — 10s**`
3. One fenced code block, English only, with references tagged inline — Element handles first, @image1, @image2… for plain image uploads, @video1 for video references

**Iterations deliver directly.** Once a prompt is approved in the thread, any tweak — palette, framing, pose, lens, lighting, wardrobe, staging, duration, a line reading — ships as the revised full prompt, no check. Re-check only on a new scene, a new character set, or a new capture family. Always the full prompt, never a partial swap.

**Split rather than overload.** Past the runtime cap, or two vantages on one action: two prompts, both delivered.

**Never a negative prompt block.** Every negation lives inline in the prose of its slot.

---

## WRITE THE VISIBLE

| Instead of | Write |
|---|---|
| she looks stressed | shoulders lift, jaw locks, exhales through the nose, eyes fix on the door |
| the alley feels dangerous | one weak warm source 30 metres back, wet brick, standing water, no other figures |
| fast chase | carves through traffic at 110 km/h |
| she's taller than him | she stands 183cm to his 168cm |
| heavy mech | five-ton mass, cratering the ground on landing |

Measurables the model reads: km/h · cm · kg or tons · atmosphere as density plus named planes · direction labelled screen-relative or character-relative · emotion in muscle · contact as deformation.

**Every fact lives in one slot.** Wardrobe in Assets, light in slot 10, atmosphere in slot 11. The only sanctioned repetition is dialogue (see the Dialogue System). A four-shot, four-asset prompt lands around 900–1,400 words.

---

## THE SPINE (LOCKED ORDER)

```
1.  HEADER              shots · runtime · timecodes · cut policy · speed policy
2.  STYLE PREFIX        style, operating style, texture, skin, technical cadence
3.  NO ON-SCREEN TEXT   always here
4.  CRITICAL BLOCKS     scene-specific, max 4 — THE SCRIPT first when there's speech
5.  ASSETS              tag = identity + voice + THIS SCENE + fidelity
6.  GEOMETRY MAP        lateral position, depth planes, vertical relationships
7.  FIRST FRAME         what's already happening at frame one
8.  OPTICS              lens lock per shot in FOV degrees
9.  CAMERA              one physical register
10. LIGHT & COLOUR      direction, quality, temperature + three sourced bands
11. ATMOSPHERE          full-frame density gradient, source-bound vapor only
12. ACTION TIMING       timecoded beats, lines bound to bodies, hard cuts inline
13. PHYSICS             mass → contact → deformation → rebound → lag → shadow
14. ACTING              brow, eyes, eyelines, liveness
15. AUDIO               the performance: every line with its delivery, or attached-track lock
16. LOCKS               positive ordered chain + skin protection + closing tail
```

No mode label, no prose between slots, no aspect ratio.

---

## 1 — HEADER

```
3 shots. Total 10 seconds — shot 1 runs 0.0–3.5s, shot 2 runs 3.5–7.0s, shot 3 runs 7.0–10.0s. Hard cuts between them, no transitions, no dissolves. All shots real-time, no slow motion, no speed ramping anywhere.
```

Single take: `1 continuous shot. Total 8 seconds, no cuts. Real-time throughout.`

Timings sum exactly. Pacing guide: 1.5–2.5s per shot for high energy · 2.5–4s for narrative and dialogue · 4–7s for a held line · 8–15s for a oner. Past 15s on 2.5, declare the shot budget (`9 shots across 24 seconds`). Slow motion is carved out by timecode: `brief slow motion on the impact only, 2.0–2.5s; all other footage real-time.` Dialogue scenes add: `cuts fall between lines and never inside a word.`

## 2 — STYLE PREFIX

```
Style: 8K photorealism, real organic film grain and halation, high dynamic range, large-format film look. NOT a 3D render, NOT a game engine, NOT a game-cutscene aesthetic, NOT a cartoon.

Operating style: large-scale realism with intimate handheld closeness, in-camera feel, tactile textures, shallow depth of field on faces, photochemical look.

Texture: matte non-reflective surfaces, lived-in worn materials, organic grain, no digital gloss, no plastic sheen.

Skin: pore-level realism, fine vellus hair, natural asymmetry, no smoothing, no retouching.

Technical: real-time 24fps, true 180-degree shutter with a real 1/48 second exposure on every frame, genuine photographic motion blur, each frame blending smoothly into the next. No flicker, no warping, no morphing, no frame interpolation, no frame blending, no ghosting, no high-shutter video crispness.
```

The render quad is always all four. Add `NOT anime cel-shading` when the material invites it. The cadence clause lives only in Technical. For strobe scenes, append the strobe quarantine (see Strobe).

## 3 — NO ON-SCREEN TEXT

```
NO ON-SCREEN TEXT — CRITICAL: no on-screen text of any kind anywhere in frame at any point. No captions, no subtitles, no burned-in dialogue, no auto-captions, no karaoke text, no lower thirds, no titles, no title cards, no credits, no watermarks, no logos, no timecode, no UI overlays, no social-media overlays, no interface elements. The frame is clean of all overlay graphics from first frame to last.
```

Never carve an exception into this block. Physical text that exists in the world — a garment print, a sign, packaging — is described in Assets or the Geometry Map as a physical object with shape, colour, placement, and legibility. Dialogue scenes need this block most: speech pulls captions straight from social video training.

## 4 — CRITICAL BLOCKS

Anything the model routinely drops gets its own ALL-CAPS block: `THE [THING] — CRITICAL:` plus one exhaustive paragraph. **Max four**, ordered by importance. Downstream slots apply a block; they never restate it.

| Block | Use when |
|---|---|
| `THE SCRIPT` | any generated speech — always first |
| `THE REFERENCE LOCKS LOOK, VOICE AND PERFORMANCE` | a character is tagged with a video character reference sheet — second, right after THE SCRIPT (first when the character doesn't speak) |
| `ONE MOUTH SPEAKS AT A TIME` | two or more people in frame with dialogue |
| `THE SINGING` + `THE MOUTH IS ALWAYS VISIBLE` | attached-track lipsync |
| `THE MICROPHONE PROXIMITY` | speakers hold mics and level must follow distance |
| `THE LANGUAGE` | non-English dialogue |
| `THE GEOMETRY` / `THE STAGING` | a spatial relationship or position must not invert or drift |
| `THE STROBE` / `THE LIGHT CHANGE` | flashing or shifting light |
| `TWO DISTINCT DESIGNS` | two similar characters or objects must not merge |
| `NOBODY ELSE IS IN THE FRAME` | no extras allowed |
| `EVERYONE IS LIVE` | background bodies would freeze |
| `THE TONE` / `THE BEAT` | a comedic, emotional, or reversal point that could be misread |

## 5 — ASSETS

One line per asset: **tag · permanent identity · voice · THIS SCENE · fidelity assertion.** Target 60–110 words per character.

```
@image1 = 177cm, dark bob with blonde balayage ends, centre part, warm fair skin. Navy short-sleeve polo, grey micro-shorts, olive suede wide belt, barefoot. Clean clear face, no beauty marks. Voice: dry mezzo, clipped consonants, speaks fast when annoyed. THIS SCENE: seated centre of the sofa, speaking, irritation sliding into teasing surprise. 100% match to the reference.
```

**Order:** height · build and skin · face · hair · permanent markers · makeup · clean-face negations · wardrobe one clause per garment · jewellery and nails · **voice** · THIS SCENE · fidelity.

**Voice is part of identity** for any character who speaks: register (bass, baritone, tenor, alto, mezzo, soprano), texture (dry, husky, bright, breathy, gravelly), pace habit, accent if any. It stays fixed across prompts. How a specific line is delivered lives in Audio, not here.

**Wardrobe economically:** *a cropped charcoal washed-jersey long-sleeve, high round neck, open back, hem just under the ribcage.*

**Declarations:** permanent features (`the blunt bangs are permanent and present in every frame`) · state-conditional identity with its reason (`no jacket in this scene`) · known drift with inline negation (`BROWN eyes, never blue`) · skin (`rendering true and natural, never cool-shifted, never pale, never tan`).

**Scoping** on non-character references: `@image4 = the location — … Controls geography, materials, and light direction only.`

**Video character reference sheets.** Some character Elements are not stills: they are video character reference sheets — a two-panel clip with a full-body outfit montage on one side and a speaking close-up on the other, the character lip-syncing a pangram in their own voice through a full emotional range. When a tagged Element is one of these (the user says so, or the Element was built as a video reference / pangram sheet), **that reference governs the character's appearance AND their voice AND their emotional performance**:
- **Appearance:** face, hair, outfit, and identity markers come from the reference. The Asset line keeps a short visual handle and the permanent markers that drift; it does not re-describe the outfit garment by garment.
- **Voice:** timbre, register, pitch, texture, pace, accent, and language delivery come from the reference. Do not invent a voice — the Asset's voice clause reads `Voice: exactly the voice heard in the reference.`
- **Emotion and performance:** how this person emotes — how big or small their reactions are, how their brows and eyes move, how they turn their head, how they laugh, whisper, gasp, or shout — comes from the reference. Acting and Audio direct *which* emotion each line carries; the reference decides *how this character* expresses it.
- **Never reproduced:** the reference's panel layout, gray backdrop, framing, montage cuts, and the pangram's words. Only the character carries over.
- Write the lock as a CRITICAL block (see below). Ask in the pre-prompt check whether any tagged character Element is a video reference sheet if it isn't clear.

```
THE REFERENCE LOCKS LOOK, VOICE AND PERFORMANCE — CRITICAL: the attached video character reference @[handle] is the single source of truth for the [visual handle]'s face, hair, outfit, voice, and emotional performance. [Their] outfit matches the reference garment for garment in every shot — nothing added, removed, recoloured, or restyled. [Their] speaking voice is the exact voice heard in the reference — the same timbre, register, pitch, texture, pace, accent, and delivery — on every line [they speak], never replaced, deepened, brightened, or genericized, never drifting toward any other speaker's voice. [They emote] the way [they do] in the reference — the same range and size of expression, the same brow and eye movement, the same head carriage, the same laugh, whisper, gasp, and raised voice. Only the character carries over: the reference's panel layout, gray backdrop, framing, cuts, and spoken words are never reproduced.
```

**Groups:** one shared block with the uniform, the permitted variation range, and the anonymity lock. **Props:** material, finish, how held, and scale against a body part — `a 20cm knife, noticeably shorter than the forearm, reads short, not a sword`.

## 6 — GEOMETRY MAP

```
GEOMETRY MAP: on the green L-sofa — @image2 LEFT, @image1 MIDDLE, @image3 RIGHT. A pouffe front-right in front of @image3. Window wall behind, thrown soft. Depth planes: sofa foreground, doorway mid-ground, window wall background. The door is off-frame camera-left.
```

Every map states: **absolute lateral position** and what's off-frame where · **depth plane per subject** and which planes are sharp · **vertical relationships** where they matter. Label every direction: `she turns to her OWN right` is not `screen-left`. Name who the frame favours when framing is ambiguous. Scatter figures at different depths, never in a row. A relationship that must not invert gets promoted to a CRITICAL block.

**Dialogue scenes:** the map also fixes where each speaker's face is relative to camera so the mouth stays readable — `@image1 three-quarter to camera, @image2 in profile facing her`.

## 7 — FIRST FRAME

```
FIRST FRAME: already mid-conversation, @image1 leaning forward with her mouth closed about to speak, @image2 turned toward her. No empty establishing hold, no static frame before the action starts.
```

When a reference is the opening composition: `open on the composition of @image4 exactly, already in motion`.

## 8 — OPTICS

House default is **spherical large-format**: natural halation, creamy falloff, subtle breathing. No anamorphic streaks, oval bokeh, or fisheye unless asked; anamorphic is opt-in per prompt.

**Degrees first, mm in brackets.** The model snaps to degrees.

| FOV | mm | Use for |
|---|---|---|
| 107° | 14–16 | vast interiors, epic establish |
| 84° | 20–24 | full-body blocking, immersive action |
| 63° | 28–35 | walking alongside, observational |
| 47° | 40–50 | medium, two-shot, waist-up dialogue |
| 34° | 60–70 | compressed group, stacked planes |
| 29° | 75–85 | isolated bust, hands |
| 18° | 100–135 | held emotional close-up |
| 12° | 180–200 | insert, object, texture |
| 8° | 300–400 | far observation |

```
LENS LOCK SHOT 1 = 47° (50mm) eye-level two-shot. LENS LOCK SHOT 2 = 18° (120mm) close on her face. No focal drift mid-shot.
```

**Unusual FOVs get a defense battery:** `This is a LONG lens — strong compression, background pulled close and thrown soft, one face sharp at a time. NOT wide-angle, no deep focus, no edge distortion.` Reverse it for ultra-wide.

## 9 — CAMERA

| Register | Cant | Cuts | Behaviour |
|---|---|---|---|
| **Locked-off** | 0° | oner or 1–2 | tripod weight or an extremely slow push; stillness is the subject |
| **Gentle handheld** | 3–10° | 3–5 at 2.5–4s | floating, riding breath, frames settle and hold |
| **Heavy handheld** | 12–25° | 4–6 at 1.5–2.5s | jolting, snapping corrections, every frame mid-move |
| **Violent handheld** | 25–45° | 4–6 at 1.5–2s | punch-ins, whip-pans, nothing settles |

Deduce from the scene; ask only if genuinely split. **Dialogue that matters defaults to locked-off or gentle** — a moving camera competes with the mouth. Every register except locked-off closes with:

```
never locked, never stabilized, never gimbal-glide, never floaty drone — real shoulder-mounted mass, breath, human over-correction, every frame mid-move but always smooth and continuous in its own travel.
```

Dutch cant is a swinging range: `8–14°, never passing through level`. Roaming coverage names what it snaps to. A still subject inside a violent camera is stated as an explicit split.

## 10 — LIGHT & COLOUR

**Direction, quality, temperature. Never a fixture name, never codec or stock codes.**

```
LIGHT: soft motivated key from the window camera-left and slightly above, wrapping gently, faithful skin. Cool daylight counter-note from the doorway behind. Half-faces rolling through shadow as they turn.

COLOUR: ~70% desaturated green-grey walls and concrete; ~20% warm amber from the table lamp and wood floor; ~10% cool blue from the window.
```

Three bands, roughly 70/20/10, **every band names a source in frame**. State where blacks sit and what blooms.

## 11 — ATMOSPHERE

**Never fog, mist, smoke, haze banks, volumetric shafts, god rays, or drifting particulate as scene dressing.** Air is density, and it fills the entire frame including the foreground.

```
ATMOSPHERE: the air carries real density at every depth — a continuous scattering gradient from the lens to the far wall, blacks lifted at every plane, depth separating in layers: [the actual planes, nearest to furthest, and how each softens]. Low macro contrast; high micro contrast — razor skin and fabric texture, heavy grain inside the lifted shadows, natural bloom at point light sources. Bodies pass through the air without disturbing it. No plumes, no banks, no wisps, no swirls, no rolling shapes, no beams, no rays. Nothing in the air is emitted by anything.
```

**Source rule:** a visible vapor exists only when something in frame makes it — a cigarette ember with a thin ribbon dissipating within 30cm, dust kicked up by a footfall, breath condensing on the exhale, steam off a cup. Name the source, the emission, and nothing else. Clean-air scenes say so: `the air is clean, full clarity to the back wall`.

## 12 — ACTION TIMING

```
0.0–3.5s (SHOT 1, two-shot): @image1 leans in, elbows on the table, and says "You told her." — her eyes stay on his face. @image2 says nothing in this beat: he holds still, jaw tightening, eyes dropping to his coffee.
3.5s HARD CUT
3.5–7.0s (SHOT 2, close on @image2): @image2 exhales through his nose, looks up, and says "She asked." @image1 says nothing in this beat: off-frame left, audible only as a chair creak as she sits back.
7.0s HARD CUT
```

**Every visible body gets an action in every beat.** Silence about a body means it drifts, and silence about a listener means the model gives them words. **Four motion layers**, named even when one is nothing: character · micro (breath, hair, fabric, jewellery) · environment · camera (slot 9). Groups move on their own clocks. Choreography gets the unison lock plus the anti-mannequin clause.

## 13 — PHYSICS

Chain, scaled to the mass: **mass → contact → deformation → rebound → secondary lag → contact shadow → nothing floats, nothing slides.**

```
PHYSICS: real gravity and bodyweight — chairs taking weight and creaking, forearms pressing into the tabletop, the mug sliding a centimetre when the table is knocked, hair and loose sleeves lagging the turns, grounded contact shadows. Nothing floats, nothing slides.
```

Effort, resistance, falling debris, and structures that must hold are all stated physically, never asserted.

## 14 — ACTING

```
ACTING: natural blinking throughout, active forehead and brow micro-expression matched to each line — brows lifting on the questions, drawing down and together on the accusation. No frozen mask-face, no dead eyes. They look at each other, never into the lens.
```

For a character tagged with a video character reference sheet, write which emotion each beat carries and let the reference supply how she expresses it: `her brows lifting with amused disbelief, the way she does in the reference`. Don't overwrite a reserved character's reference with big theatrical faces, or a chaotic one's with stillness, unless the scene asks for it.

Brow matched to the line is the highest-yield acting instruction. Eyelines are stated as targets. Emotional arcs are slides, not states. Physical performance negations where relevant.

## 15 — AUDIO

**Default: diegetic only.** Every sound names a surface or material in frame. Ambience is named and levelled, and it carries the silences.

**For speech, Audio is the performance.** It restates every line verbatim with its delivery attached. See the Dialogue System.

**Music suppression tail — every diegetic prompt closes on it:**

```
No music, no score, no singing, no humming, no laugh track, no ambient pad, no swell, no drone, no rising tone, no added foley beyond what is physically in frame, no voices off-frame beyond the scripted lines.
```

**Never write song titles, artist references, lyrics, or music descriptions** in a prompt. Music, when used, is an attached reference. The one exception: the user-supplied lyrics for a lipsync section, written verbatim inside THE SINGING block and nowhere else (see the Lipsync Protocol).

**Attached-track lock (hard):**

```
AUDIO: the attached clip @video1 is the sole and complete audio source for this sequence. Generate no additional audio of any kind — no room tone, no foley, no ambience, no breath, no added dialogue, no music.
```

The attached clip owns all timing; never impose per-beat timing on it. Non-verbal scenes: `environmental sound and non-verbal effort only — hard breathing, strained grips. No spoken words.`

## 16 — LOCKS

A positive ordered chain of what must hold — not a summary.

```
LOCKS: the exchange runs in order — the accusation, the silence, the answer, the walk-out. Each line belongs only to its assigned speaker. Same identities, same seating, same geography across all cuts. Wardrobe identical to each tagged reference. Light direction and temperature identical across shots. The air holds uniform density throughout.
```

Standard contents: ordered action chain · identity continuity · staging holds · wardrobe identical · permanent markers · environment identical · light and colour consistent · atmosphere uniform. One pointer clause for anything a CRITICAL block already locked.

**Close with skin protection and the tail:**

```
Skin reads true cinematic matte — zero shine on forehead, nose bridge, cheekbones and collarbones, real fine even pore texture, peach fuzz at the jaw and hairline, light absorbed like true subsurface scattering, rendering true and natural, never plastic — no acne, no blemishes, no rough pores, fine flattering texture that keeps every face looking good. No CGI, no rendered look, no digital cleanliness, no AI smoothness, no frozen posing, no stabilized glide, no high-shutter crispness, no frame interpolation, no dropped frames.
```

---

# THE DIALOGUE SYSTEM

**For speech the model generates.** Attached-track speech uses the Lipsync Protocol. They are opposites; never mix them.

Generated dialogue fails in four ways: the model **invents** lines, **paraphrases** them, **gives them to the wrong mouth**, or **delivers them flat or robotic**. The fix separates two things the model otherwise blends: **what is said** (fixed, verbatim, untouchable) and **how it is said** (performance, written per line in Audio).

## Step 1 — Script intake

When the user pastes a script, screenplay, or line list, parse it before writing anything.

| Script element | Goes to |
|---|---|
| Dialogue text | THE SCRIPT, verbatim — the exact characters, punctuation, fillers, stutters, repeats, and casing as written |
| Character cue (the speaker's name) | Mapped to the character's reference tag. Names never enter the prompt. |
| Parenthetical — *(quietly)*, *(sarcastic)*, *(through tears)* | That line's delivery in Audio |
| *(beat)*, *(pause)*, a silence | A timed silence beat with a named ambience |
| Action / stage directions | Action Timing, as observable movement |
| V.O. or O.S. / O.C. | Off-frame speaker: no visible mouth, audio perspective stated in Audio |
| *(CONT'D)*, *(MORE)*, scene headings, transitions | Stripped — never spoken, never rendered |
| Dual dialogue, overlaps, cut-offs marked with — or // | An overlap carve-out, with who cuts in on which word |
| Lines in another language | THE LANGUAGE block, with the line verbatim in its script |

**Verbatim means verbatim.** Don't fix grammar, don't add "um," don't trim a stutter, don't convert contractions, don't swap a word for a synonym. Punctuation is performance data: an ellipsis trails off, a dash is a cut-off, a question mark lifts, and they stay exactly where the writer put them.

**Flag before building** (in the pre-prompt check, not silently):
- **Word budget.** Natural conversation runs about 2.5–3 words per second. Count each speaker's words against the runtime, leaving room for reactions and silences. If the script won't fit, say so and offer to split into two prompts or ask which lines to cut. Never compress speech to make it fit.
- **Names spoken inside a line.** A character's name inside the dialogue itself is flagged; keep it only if the user confirms.
- **Ambiguous pronunciation.** Numbers, years, acronyms, and invented words ("2026," "NASA," "Xyloth") — ask how each is said. If the user gives a pronunciation, write the line the way it's spoken ("twenty twenty-six") and note the change in the check.
- **Unassigned lines** or a speaker with no reference.

## Step 2 — THE SCRIPT (first critical block)

Words only. No delivery notes here — delivery inside this block leaks into the spoken words.

```
THE SCRIPT — CRITICAL: these are the only words spoken in this take, spoken exactly as written, in this order, each by its assigned speaker. Nothing improvised, added, paraphrased, reordered, or skipped. No extra words before or after any line.

1. @image1: "You told her."
2. @image2: "She asked."
   (two seconds of silence — nobody speaks)
3. @image1: "That's— no. That's not how this works."
4. @image2: "Then how does it work?"
```

Number the lines. Silences sit between lines with a duration. Off-frame lines are tagged `@image2 (off-frame):`. Lines spoken in unison are tagged `@image1 and @image2 together:` — and Audio states that both voices land on the same words at the same moment.

## Step 3 — ONE MOUTH SPEAKS AT A TIME (two or more in frame)

```
ONE MOUTH SPEAKS AT A TIME — CRITICAL: each numbered line belongs to exactly one person, and only that person's mouth forms those words. Every listener's mouth stays closed or resting — never mouthing along, never shadowing syllables, never forming the other's words. Breathing, sighing, and small reactions stay allowed on listeners; only word-forming is exclusive.
```

Deliberate overlaps are carved out explicitly: `on line 4, @image1 cuts in on the word "work" with line 5 while @image2 is still finishing — both mouths moving for that half-second, both audible.`

## Step 4 — Action Timing binds each line to a body

Each line appears verbatim once more inside its timecoded beat, tied to what the speaker's body does and what every listener does instead. This is where eyelines, gestures, and the stressed word get a physical anchor. Every non-speaker in every beat gets `says nothing in this beat:` plus an action.

## Step 5 — AUDIO is the performance

This is where **how it's said** lives. Every line, verbatim again, in order, with a delivery spec. Three appearances total — Script, Action Timing, Audio — is correct and overrides the one-slot rule. A fourth form doesn't help.

```
AUDIO: fully diegetic, recorded in a small kitchen with hard surfaces and a short bright reflection.

Line 1 — @image1, 0.6–1.6s: "You told her." — low and flat, controlled anger held under the surface, falling pitch, stress landing on "told," a sharp breath in through the nose before the line, close and present.
Line 2 — @image2, 4.2–5.0s: "She asked." — quiet, tired, almost a mumble, no apology in it, the second word dropping away, mid-distance across the table.
Silence 5.0–7.0s — carried by the refrigerator hum and a mug set down on wood. Nobody speaks.
Line 3 — @image1, 7.0–9.2s: "That's— no. That's not how this works." — starts fast and cuts itself off hard on the dash, a short exhale, then slower and deliberate, each word placed, pitch rising slightly on "works."

These are the only words spoken, by the assigned speakers, in this order — no invented dialogue, no substituted words, no extra sentences, no background voices.

[Music suppression tail.]
```

**Video-reference speakers.** When the speaker is tagged with a video character reference sheet, every Audio line opens with `her reference voice,` (or his / their) and the delivery spec describes only the emotion, pace, volume, stress, and distance for this line — never a new register, timbre, or accent. The reference owns the voice; the line owns the moment.

### The delivery spec — vocabulary

Pick what the line needs; not every field every time.

| Dimension | Examples |
|---|---|
| **Volume** | whispered, murmured, quiet, conversational, raised, shouted |
| **Pace** | slow and deliberate, unhurried, clipped, rushed, words tumbling |
| **Pitch** | low, dropping at the end, lifting into a question, flat, cracking on one word |
| **Stress** | which single word carries the weight — name it in quotes |
| **Emotion in the voice** | through a smile, holding back tears, dry and deadpan, amused, contemptuous, pleading — always audible, never only named |
| **Breath** | a breath in before, an exhale after, out of breath, laughing through the words |
| **Rhythm marks** | trails off on the ellipsis, cuts off on the dash, a hitch before a word |
| **Distance** | close and present, mid-distance, across the room, off-frame and roomy |
| **Room** | the acoustic of the space: dry and close, bright short reflection, large and echoing, outdoor with no reflection |
| **Accent** | stated once in the Asset voice, repeated only if a line departs from it |

**Tone ≠ words.** Never express delivery by changing text: a shouted line isn't written in capitals inside THE SCRIPT; stress is named in Audio. The script stays exactly as the writer wrote it.

**No mouth mechanics for generated speech.** No tongue positions, jaw drops, lip rounding, or closure counts. When the model is producing the speech, those make it overarticulate and robotic. Write the words and the delivery; leave the face to Acting.

### Microphone proximity (when speakers hold mics)

```
THE MICROPHONE PROXIMITY — CRITICAL: voice level follows mouth-to-microphone distance. Close to the lips a voice is warm and present with breath audible; lowered or swung off-axis it goes thin and roomy at once. In this take: [each line that departs from close, and the visible action causing it]. Everything else is close and full. Transitions are immediate, driven by the hand, never a fade.
```

### Dialogue length discipline

Past roughly 1,200 words, a dialogue prompt drowns its own script. Cut restated wardrobe, caveats, and anything that doesn't change a pixel or sound before touching a single scripted word.

---


## Reference build — dialogue inside a product shot

A single 10-second take where the dialogue shares the frame with a hero object in sharp focus. Note what makes it hold: the script is words only and numbered, the unison lines are tagged, the silent beat has a duration and a sound filling it, the language gets its own block, focus and the untouched object each get a CRITICAL block, the printed can text lives in Assets and not in the overlay block, and Audio carries every line again with how it's said.

```
1 continuous shot. Total 10 seconds, no cuts, no transitions. Real-time throughout, no slow motion, no ramping, no speed change anywhere.

Style: 8K photorealism, real organic film grain and halation, high dynamic range, large-format film look. NOT a 3D render, NOT a game engine, NOT a game-cutscene aesthetic, NOT a cartoon.
Operating style: intimate product-hero closeness with a very shallow focus plane, in-camera feel, tactile textures, photochemical look.
Texture: matte non-reflective surfaces, lived-in worn materials, organic grain, no digital gloss, no plastic sheen.
Skin: pore-level realism, fine vellus hair, natural asymmetry, no smoothing, no retouching.
Technical: real-time 24fps, true 180-degree shutter with a real 1/48 second exposure on every frame, genuine photographic motion blur, each frame blending smoothly into the next. No flicker, no warping, no morphing, no frame interpolation, no frame blending, no ghosting, no high-shutter video crispness.

NO ON-SCREEN TEXT — CRITICAL: no on-screen text of any kind anywhere in frame at any point. No captions, no subtitles, no burned-in dialogue, no auto-captions, no karaoke text, no lower thirds, no titles, no credits, no watermarks, no logos, no timecode, no UI overlays, no social-media overlays, no Chinese characters, no Korean characters. The frame is clean of all overlay graphics from first frame to last.

THE SCRIPT — CRITICAL: these are the only words spoken in this take, spoken exactly as written, in this order, each by its assigned speaker. Nothing improvised, added, paraphrased, reordered, or skipped.
1. @image2: "야, 이거 진짜 재밌었다."
2. @image3: "그니까. 우리 광고 하나 찍은 것 같지 않아?"
3. @image2: "완전. 자, 짠."
4. @image2 and @image3 together: "짠."
   (two seconds of silence — both turn away and drink, no words)
5. @image2 and @image3 together: "아, 좋다."
Between and after the lines there is only laughter. No additional lines, no muttering under the dialogue.

THE LANGUAGE — CRITICAL: every word spoken is Korean with natural native pronunciation, rhythm, and intonation. No English words, no accented English, no other language at any point.

THE FOCUS — CRITICAL: the can on the counter is the sharpest thing in frame for every frame of the take. The two women behind it are thrown well out of focus throughout — soft shapes with readable hair colour, wardrobe colour, and body language but no resolved facial detail. The focus never racks, never travels to them, never hunts. The plane of focus sits on the front face of the can.

THE CAN ON THE COUNTER IS UNTOUCHED — CRITICAL: the hero can is closed, full, sealed, and never handled. Neither woman touches it, reaches for it, or knocks it. It stands still on the stone for the entire take, sweating. The cans they open are separate cans held in their own hands, behind it.

ASSETS:
@image1 = a tall slim aluminium beverage can standing upright and sealed, pull tab intact. Vertical butter-yellow gradient dissolving through pale cream into frosted white at the base, the printed label lettering in white heavy condensed uppercase exactly as shown on the reference, the printing physically on the metal. 100% match to the reference — the print never redrawn, restyled, or re-lettered. THIS SCENE: standing sealed and untouched on the stone counter in the sharp foreground, sweating steadily.
@image2 = slim build, warm fair skin rendering true and natural, never cool-shifted. Long soft pink hair worn down and loose. Cropped butter-yellow jersey tee with a slack wide neckline off both shoulders, medium indigo denim shorts with a frayed high hem, white low-top sneakers with slouched crew socks. Small silver hoops. Clean clear face, no markings. Voice: warm, low, easy. THIS SCENE: leaned back against the counter behind the hero can, out of focus, talking, cracking her own can, toasting, turning away to drink, laughing. 100% match to the reference.
@image3 = slim build, warm fair skin rendering true and natural, never cool-shifted. Long jet-black hair in a high ponytail with a blunt fringe level across the brow, permanent and present in every frame. Black ribbed short-sleeve bodysuit, enormously baggy charcoal denim, translucent smoke-grey sneakers. Small silver hoops, a loose chain bracelet on the left wrist. Clean clear face, no markings. Voice: lower register, clean, realistic. THIS SCENE: leaned back against the counter beside the other woman, out of focus, talking, cracking her own can, toasting, turning away to drink, laughing. 100% match to the reference.
@image4 = colour and light reference only — warm dark night-kitchen grade, pale cabinetry, stone counter, worn floorboards. Controls materials, light direction, colour temperature, and grade only.

GEOMETRY MAP: a low camera close to the stone counter top, lens at can height looking slightly upward along the surface. The sealed can stands alone in the FOREGROUND on the LEFT third, clear empty stone around it. Behind and above, both women lean against a second counter several feet deeper — @image2 LEFT, @image3 RIGHT of her, facing each other in three-quarter, cropped at mid-thigh by the bottom of frame. Depth planes: can and stone sharp in the foreground, the women soft in the mid-ground, the back wall dissolved into bloom behind.

FIRST FRAME: already mid-conversation — @image2 already speaking, both holding their own unopened cans at their sides, the hero can already sweating with condensation running. No empty establishing hold.

LENS LOCK = 29° (80mm) portrait compression throughout, wide open, extremely shallow depth of field locked on the front face of the hero can. This is a LONG lens — strong compression, background pulled close and thrown far soft, only the can sharp. NOT wide-angle, no deep focus, no edge distortion. No focal drift, no rack focus.

CAMERA: gentle handheld — floating, riding breath, small organic corrections, the can staying anchored in the left third. Never locked, never stabilized, never gimbal-glide — real shoulder-mounted mass, every frame mid-move but smooth and continuous in its own travel.

LIGHT: warm low source from above and behind the two women, spilling forward onto the counter and skimming the wet shoulder of the can as a soft warm rim down one side. A cool counter-note from off-frame camera-left fills the shadow side of the can and keeps the frosted base clean. The women rim-lit from behind, faces in soft warm shadow. Blacks lifted, highlights rolled off softly.
COLOUR: ~70% warm amber and dark room tone from the light on stone, cabinetry, skin, and hair; ~20% butter yellow from the hero can and the cans in their hands; ~10% cool blue-grey filling the shadow side of the can.

ATMOSPHERE: the air carries real density at every depth — a continuous scattering gradient from the lens to the back wall, blacks lifted at every plane: can and stone razor sharp in front, the women soft in the mid-ground, the back of the room dissolved into bloom. Razor metal, water, and stone texture up close, heavy grain in the lifted shadows, natural bloom at the point sources. Low macro contrast, high micro contrast. No plumes, no wisps, no beams, no rays. Nothing in the air is emitted by anything.

ACTION TIMING:
0.0–2.5s: the can stands sealed, sweating — fine beading on the shoulder, fatter drops merging and running down the barrel, a small ring of moisture pooling at its base. Behind it and soft, @image2 says "야, 이거 진짜 재밌었다." with one hand lifting off the counter in a loose gesture. @image3 says nothing in this beat: she leans back on her elbows, nodding.
2.5–5.0s: @image3 straightens off her elbows and says "그니까. 우리 광고 하나 찍은 것 같지 않아?" Both bring their own cans up and crack them open. @image2 says "완전. 자, 짠." and raises her can. Neither goes near the hero can.
5.0–6.5s: both knock their cans together, and together they say "짠." — the cans rocking in their hands afterward.
6.5–8.5s: no words. Both turn away from each other — @image2 to her OWN left, @image3 to her OWN right — and drink, chins tipping up, throats working. Held for a real beat.
8.5–10.0s: both lower their cans, turn back, and together say "아, 좋다." through easy laughter, shoulders dropping. In the foreground another drop breaks loose and runs the length of the can into the pooled ring.
Motion layers: character motion as above; micro-motion — condensation beading and running, the pool widening, loose pink hair swinging, the ponytail swinging with real decay, hoops moving against jaws; environment — nothing else in the room moves; camera as specified. Nobody else is in frame.

PHYSICS: real gravity and mass. Water beads, merges, and runs down under true gravity, the pool spreading on the stone. The tabs lift against real resistance; the cans rock after the clink and settle. Bodies push off the counter with real weight transfer. Hair lags every head turn and settles through decaying swings. Contact shadows where the can meets the stone and hands meet the counter edge. Nothing floats, nothing slides.

ACTING: natural blinking, active brows on both, no frozen mask-face — readable through the defocus in the carriage of their heads. Brows lift on the question, drop on the agreement, both faces opening into real laughter at the end. They look at each other for the conversation and the toast, never into the lens. The listener nods and shifts her weight throughout.

AUDIO: fully diegetic, recorded in a small hard-surfaced kitchen at night, close and warm with a short bright reflection.
Line 1 — @image2: "야, 이거 진짜 재밌었다." — warm, unhurried, a smile in the voice, the end of the line lifting.
Line 2 — @image3: "그니까. 우리 광고 하나 찍은 것 같지 않아?" — dry agreement on the first word, a small pause, then amused and lifting into the question.
Line 3 — @image2: "완전. 자, 짠." — quick and bright, the last word a playful call to toast.
Line 4 — @image2 and @image3 together: "짠." — both voices on the same word at the same instant as the cans clink.
Silence 6.5–8.5s — carried by two swallows and low night room tone. Nobody speaks.
Line 5 — @image2 and @image3 together: "아, 좋다." — exhaled and satisfied, laughing through it.
Plus two tabs cracking with a short carbonation hiss, the bright clink, aluminium rocking on stone, fabric shifting against the counter edge, a sneaker scuffing floorboard. These are the only words spoken, by the assigned speakers, in this order — no invented dialogue, no substituted words, no extra sentences. No music, no score, no singing, no humming, no laugh track, no ambient pad, no swell, no drone, no rising tone, no voices off-frame, no added foley beyond what is physically in frame.

LOCKS: the sequence runs in order — conversation, both cans cracked, the toast, both turning away to drink in silence, turning back laughing. One continuous take. The hero can stays sharp, still, and untouched in the foreground every frame, and the focus never leaves it. Both women stay soft behind it, two distinct people each identical to her own reference, never merging. The loose pink hair; the black ponytail with the level fringe in every frame. The can print matches its reference exactly. Light direction and temperature identical throughout. The air holds uniform density. Skin reads true cinematic matte — zero shine, real fine even pore texture, peach fuzz at the jaw and hairline, rendering true and natural, never plastic, no blemishes, fine flattering texture. No CGI, no rendered look, no AI smoothness, no frozen posing, no stabilized glide, no frame interpolation, no dropped frames.
```

---

# VIDEO EXTENSION

**For Seedance's extend feature**, where a new clip continues from the end of an existing one. The previous clip is already the source, so nothing needs to be uploaded or tagged for it — the prompt's first job is to tell the model this is a continuation, not a new scene.

## The continuity paragraph (right after the header, always)

```
This continues directly from the end of the attached video. [One sentence naming exactly what is happening in the final frame — who is where, doing what.] Motion picks up unbroken from that final frame — same people, same wardrobe, same location, same light, same weather, same camera operator. No reset, no re-establish, no jump, no new scene. [How the held moment breaks] within the first quarter second and the take runs on from there.
```

Why it works: without it, the model treats the extension as a fresh generation and re-establishes — the camera resets, the people re-pose, the light shifts. Naming the final frame gives it an exact handoff point, and breaking the hold in the first quarter second stops a frozen opening.

## What changes in the spine for an extension

- **Header** — the extension's own runtime, one continuous shot unless the new beat needs a cut.
- **Continuity paragraph** — second, above everything else.
- **Style Prefix and NO ON-SCREEN TEXT** — unchanged, in order.
- **Assets** — shorter. Identity is already on screen, so each character gets a visual handle, the key wardrobe clauses, voice, and THIS SCENE. Restate permanent features that drift (a fringe, a print, a hairstyle). Use reference tags only for references actually attached to this extension; otherwise identify people by visual handle.
- **First Frame** — replaced by the continuity paragraph. Delete it.
- **Camera** — "the same operator, continuing without a break," then what the camera does next. Lens changes are written as a physical transition from the previous lens ("pulling out through 63° to 84° as they close in"), never a jump.
- **Light** — ends with "identical light direction and colour temperature to the attached video, continuous across the join."
- **Atmosphere and weather** — anything that was in motion (wind, rain, a vinyl sheet snapping) is stated as *still* happening.
- **Locks** — adds "continuous with the attached video across the join, no change of identity, wardrobe, location, light, or camera."

## Extension types

| Type | The move | Continuity paragraph breaks with |
|---|---|---|
| **Carry-on** | The same action simply keeps going — the walk continues, the fight continues. | "the motion continues without pause" |
| **Break the hold** | The clip ended on a held pose or freeze; the extension breaks it into something human. | "the pose breaks within the first quarter second" |
| **New beat** | Same moment, but something new happens — a stumble, a reveal, someone enters. | the first physical event of the new beat |
| **Camera move-on** | The action holds but the camera goes somewhere new — pushes in, drifts away, gets grabbed. | "the camera begins to move [direction] within the first quarter second" |
| **Dialogue carry** | A conversation continues. The new clip's lines follow the Dialogue System in full, with THE SCRIPT as the first CRITICAL block. | "the conversation continues, [speaker] already drawing breath to answer" |
| **Ending** | Bring the scene down — laughter settling, the camera tilting away, a walk out of frame. | the first beat of the wind-down, plus how the take ends ("ends on the ground, still moving") |

## Extension rules

- **Never re-describe the world as new.** Scene details are stated as already present, not introduced.
- **Name who is in frame and who isn't.** Extensions invent crew, onlookers, and extra dancers readily: `only these two people are in frame, the operator never seen`.
- **Match the energy at the join.** If the clip ended breathless, the extension opens breathless — chests heaving, hair still settling.
- **Camera contact is physical.** If a character touches or grabs the camera, write real hand-on-camera contact with weight: `her hand grabs the camera body, the whole frame lurching down under her pull, not a tilt`.
- **Chain extensions one at a time.** Each extension names the final frame of the clip it continues, not the original clip.

# THE LIPSYNC PROTOCOL

**Only for an attached track.** The track is the sole audio source and owns timing.

## The track goes in as a video, in whole seconds

- **Always a video reference, never an audio reference.** If the user only has an audio file, they place it over a solid black frame in any video editor and export it as video (720p is fine, MP4).
- **Whole seconds.** The clip is cut to the exact section being generated and trimmed to a whole number of seconds, never cutting a sung or spoken word. Ask the user for its length; the header runtime matches it exactly.
- **Tagged @video1** (@video2 and so on if there are several), unless the user saved it as an Element with its own handle.

## The words are required

**Spoken-word track** (an attached voice recording): the transcript, verbatim, goes in a block titled `THE SPEECH IS THE PRIMARY SUBJECT`.

**Song track (music video lipsync):** before building, ask the user to paste the **lyrics for exactly the section of the track this clip covers** — the lines sung in those seconds, in order, nothing before or after. Don't build a lipsync prompt without them: the written words are what tell the model which mouth shape lands on which syllable. Write them verbatim inside THE SINGING block, in the language they're sung in, with no song title, artist name, or music description anywhere. The lyrics should be the user's own song or one they have the rights to; for a commercially released song by someone else, don't reproduce its lyrics — describe the performance against the attached vocal instead.

In both cases the model is matching audio it already has, so mouth mechanics help here (the opposite of generated dialogue).

**1. Primary-subject block, first:**

```
THE SINGING IS THE PRIMARY SUBJECT — CRITICAL: [visual handle] sings out loud to the attached vocal in @video1, full voice, mouth open and working hard for all [X] seconds, every syllable of the attached vocal formed on [their] lips in time with it. [They are] a singer delivering the vocal, not a performer mouthing along. The words [they sing], in order: "[the user's lyrics for this section, verbatim]" [Their] mouth is the focus of every shot.
```

**2. Mouth shapes, named on the actual words.** Go through the lyrics (or transcript) and name where each shape lands — the specific words, in order. These are the shapes that make a lipsync read:

| Sound | Mouth shape to write |
|---|---|
| P, B, M (ㅂ ㅃ ㅍ ㅁ) | both lips press fully together and seal shut, held a beat before releasing — a P or B releases with a small pop |
| F, V | the upper teeth rest on the lower lip |
| L | the mouth open, the tip of the tongue visibly touching just behind the upper teeth |
| TH | the tip of the tongue between the teeth |
| W, OO, U | the lips pushed forward into a small round |
| O | the lips in an open round |
| EE, I | the lips stretched wide, teeth close |
| AH | the jaw dropped wide open |
| S, Z, SH | the teeth nearly closed, lips slightly parted |

State the closures as a count on named words: *"five hard lip seals across the take, on 'baby,' 'my,' 'promise,' and both syllables of 'maybe.'"* Sustained notes are held open on their vowel shape, the jaw working with the phrasing, never lazily half-open or mumbling.

**3. Mouth visibility block:**

```
THE MOUTH IS ALWAYS VISIBLE AND ALWAYS READABLE — CRITICAL: [their] face turns toward the lens, [their] mouth unobstructed and clearly readable in every frame, through the camera movement and every shift of light. Nothing ever covers it — no hand, no hair, no microphone, no other body.
```

**4. Minimize cuts.** Prefer one continuous take; if cutting, cut in breaths, never mid-word. **Strobe eats closures** — soften it to a fast bright flicker on the singer's face only.

**5. Audio lock:** the attached-track sole-source lock from slot 15, naming @video1.

---

# STROBE

```
THE STROBE IS THE DEFINING FEATURE — CRITICAL: the space is lit by hard white flashes firing on a fast [BPM] pulse — flash, black, flash, black, with occasional double and triple stutters. Each flash is instantaneous and brilliant, freezing the scene hard-edged; each black drops to near-darkness. No fades, every transition a hard snap. Bodies move continuously but appear to jump between frozen positions because they're only visible in the flashes.
```

Always pair with: a dim constant secondary glow so forms read in the black · a continuous-motion clause (`nothing is ever frozen between flashes, only the light stops them`) · this quarantine in Technical:

```
The stepped quality of this sequence comes entirely from the strobe lighting, never from broken footage. Camera motion between flashes stays continuous and smooth.
```

Choppy output with a per-beat light pulse: soften to a slow swell first, then go constant.

---

## HOUSE RULES

- **No character names anywhere in the prompt body** — visual handles and reference tags only, including in staging and dialogue speaker tags. Names may appear only in the reference list above the code block.
- **Element handles first.** Ask for the user's Elements before building; never invent a handle; a handle written on a screenshot is the tag; @imageN only for plain uploads.
- **No aspect ratio.**
- **Standalone** — no references to other scenes, earlier plates, projects, or worlds.
- **No tool or platform names** in the prompt body.
- **No meta-commentary** — every word is visible or audible.
- **Age-blind.**
- **English only in the code block**, except non-English dialogue written verbatim under THE LANGUAGE and lipsync lyrics written verbatim in THE SINGING block.
- **Written text is verbatim and physical** — shape, colour, placement, legibility.
- **Light by direction, quality, temperature.** Never a fixture.
- **No negative prompt block, ever.** Negations stay inline.
- **When a story bible skill is active,** it supplies who and what world (voice, movement, palette, era); this skill supplies how it's shot. Bible material enters only as observable behaviour, never as lore.

## PRE-DELIVERY PASS

- [ ] Version set; references within its cap; runtime within its cap
- [ ] Asked for Elements; every tag is a handle the user gave (or read off their screenshot), @imageN only for plain uploads, @video1 for video references; no invented handles
- [ ] Pre-prompt check sent — references first, runtime last
- [ ] Numbered references, bolded title with runtime, one English code block with inline tags
- [ ] Header timings sum; speed policy stated; cuts between lines on dialogue
- [ ] Style Prefix with render quad and cadence clause; NO ON-SCREEN TEXT third, no carve-out
- [ ] Max four CRITICAL blocks; THE SCRIPT first when there's generated speech
- [ ] Every character has its own slot, Asset line, voice, THIS SCENE, fidelity
- [ ] Any video character reference sheet carries THE REFERENCE LOCKS LOOK, VOICE AND PERFORMANCE; its voice clause defers to the reference; its Audio lines open with "her reference voice"; its layout and backdrop are never reproduced
- [ ] Geometry Map: lateral, depth, vertical; directions labelled; speakers' faces readable
- [ ] First Frame kills the empty hold
- [ ] Lens lock per shot in degrees; unusual FOVs defended
- [ ] One camera register, never-settles clause where needed
- [ ] Three colour bands, all sourced; no fixture names
- [ ] Atmosphere as full-frame density with named planes; no fog or shafts; vapor only with a source
- [ ] Physics chain complete; every body acting in every beat
- [ ] Brow matched to lines; eyeline targets stated
- [ ] **Dialogue:** script parsed; flags raised; lines verbatim in Script, Action Timing, and Audio — identical all three times; each line numbered and assigned; every listener silent per beat; every silence timed and filled; delivery only in Audio; no mouth mechanics; word budget fits the runtime
- [ ] **Extension:** continuity paragraph second, final frame named, hold breaks in the first quarter second, First Frame removed, light continuous across the join
- [ ] **Lipsync:** track attached as a video (never audio-only), whole seconds, tagged @video1, runtime matches it; lyrics or transcript for exactly this section verbatim in the primary-subject block; mouth shapes named on the actual words; closures counted
- [ ] Music suppression tail, or attached-track sole-source lock
- [ ] No song titles, artist references, or music descriptions anywhere; lyrics only inside THE SINGING block for a lipsync section
- [ ] Locks as a positive chain, skin protection and tail close the prompt
- [ ] No names, no aspect ratio, no tool names, no negative block

## REPAIR PASS

| Symptom | Fix |
|---|---|
| Model invents lines | THE SCRIPT isn't first, or Audio didn't restate every line verbatim with the anti-invention clause |
| Words changed or paraphrased | The three appearances don't match character for character, or delivery notes are sitting inside THE SCRIPT |
| Wrong person says the line | Add ONE MOUTH SPEAKS AT A TIME; give each listener "says nothing in this beat" plus an action |
| Listener mouthing along | Same fix, plus state listener mouths closed or resting |
| Delivery flat or robotic | Audio lines are missing delivery specs — add volume, pace, pitch, stressed word, emotion in the voice |
| Overarticulated, chewing words | Mouth mechanics leaked into generated speech — strip them |
| Lines rushed or cut short | Word budget exceeds runtime — split the prompt or cut lines with the user |
| Gaps filled with invented speech | Silences aren't timed or have no named ambience |
| Captions on screen | NO ON-SCREEN TEXT moved lower or given an exception |
| Music or underscore appears | Suppression tail shortened — restore pad, swell, drone, humming by name |
| Wardrobe drifting | Restate every garment in the Asset |
| Choppy output | Cadence clause out of Technical, or a per-beat light pulse — soften it |
| Bodies drifting between cuts | Tighten the Geometry Map with depth planes and a favours line |
| Geometry inverting | Promote to a CRITICAL block |
| Air reads as fog | A vapor has no source — bind it or cut it |
| Figures floating or sliding | Physics chain missing deformation or contact shadow |
| Background bodies frozen | EVERYONE IS LIVE and an action per beat |
| Lens averaging to normal | Add the defense battery |
| Extension resets or re-establishes | Continuity paragraph missing, too low, or doesn't name the final frame |
| Extension opens frozen | The hold-break within the first quarter second is missing |
| Extension changes light or look at the join | Light doesn't state continuity with the attached video |
| Extra people appear in an extension | Add who is and isn't in frame |
| Video-reference character speaks in a generic or wrong voice | THE REFERENCE LOCKS block missing or too low; Asset invented a voice; Audio lines don't open with "her reference voice" |
| Video-reference character emotes off-model | Acting overwrote her range — direct the emotion, let the reference supply the expression |
| Panel layout or gray backdrop appears in the scene | The "never reproduced" clause is missing from the reference lock |
| Lipsync closures missing | Mouth-visibility block, fewer cuts, soften strobe on the face |
| Lipsync mouth shapes wrong or mumbled | Lyrics for the section missing or not verbatim; mouth shapes not named on the actual words |
| Lipsync drifts out of time | Track attached as audio instead of video, not whole seconds, or the runtime doesn't match it |
| Reference ignored or wrong character | A tag doesn't match the user's real Element handle — check it against their list or screenshot |
| Old v1 behaviour showing up (made-up tags, no lyrics request) | Shotcaller v1 is still switched on and got loaded instead — turn it off in skills settings |