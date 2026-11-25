---
name: motiondojo-v1
description: "Motiondojo v1 — motion transfer prompt director for Higgsfield Genjutsu. A skill made by Joey. Writes lean Genjutsu prompts that take the movement from an attached motion transfer video and put it on new characters in a new world, with true gravity and bodyweight on every move. Three forms: body copy (characters match the exact motion and the camera matches the video), camera copy (only the video's camera path carries onto a new scene), and body copy with a new camera (exact motion, with a rebuilt handheld camera that moves naturally all around it). Opens every prompt with a hard mouth lock: characters speak only the exact words spoken in the motion video, and mouths stay closed when there is no speech. Covers role assignment, individuality, population locks, and surface-aware physics. Use this skill whenever the user mentions Genjutsu, motion transfer, copying choreography, dance or camera movement from a reference video, or putting characters into someone else's moves."
---

# Motiondojo v1 — Genjutsu Motion Transfer

The motion transfer video is added separately in Genjutsu and is **never tagged** in the prompt. It is always called **"the attached motion transfer video."** Every other reference — characters, location, props — is tagged **`<<<image_N>>>`**, numbered in attach order.

The video teaches movement. It never supplies who the people are, what they wear, where they are, or how it's lit. The prompt says so, then builds the new world with real weight on real ground.

Genjutsu prompts are **lean**. The references carry identity; the prompt carries motion, camera, physics, and the locks. Target roughly 900–1,300 words.

---

## THE THREE FORMS

| Form | The video controls | Built fresh |
|---|---|---|
| **1 — Body Copy** | Every body's motion and timing, and the camera | Characters, wardrobe, location, light |
| **2 — Camera Copy** | Only the camera path | Characters, their action, location, light |
| **3 — Body Copy, New Camera** | Every body's motion and timing | A rebuilt camera that moves naturally around the performance, plus characters, location, light |

Cues: "same moves, same shot" → 1. "use that camera move on my scene" → 2. "same dance but make the camera feel alive / more natural" → 3. Ask if it's genuinely unclear.

---

## THE MOUTH LOCK (HARD — IN THE INTRO PARAGRAPH)

Decide the mouth state before writing. Ask the user if they haven't said.

- **Closed** — no one speaks in the motion transfer video, or there's no mouth movement. Mouths stay closed or parted only for breathing.
- **Exact words** — someone speaks in the video. Characters say **only those exact words**, in the same role, at the same moments. Get the transcript from the user; never guess.
- **Match the mouth** — mouths move to music in the video. Mouths follow the video's mouth movement exactly. Never write lyrics or song references.

The lock goes in the intro paragraph and is enforced again by a CRITICAL block.

---

## WORKFLOW

**1. Read the video.** Count performers, note their screen positions (left, center, right), who is in front, clip length, whether there's speech or mouth movement, what the camera does, and what the ground is.

**2. Pre-prompt check** — references first, runtime last.

**Deliver the check as plain chat text, never inside a code block.** Code blocks are for prompts only.

Format:

> Pre-prompt check:
> - References: motion transfer video (attached separately) — [what happens in it]; <<<image_1>>> [descriptor]; <<<image_2>>> [descriptor]; <<<image_3>>> [location]
> - Form: [1 Body Copy / 2 Camera Copy / 3 Body Copy, New Camera]
> - Roles: [<<<image_2>>> → performer on the LEFT of the video; <<<image_1>>> → RIGHT]
> - Mouth lock: [closed / exact words / match the mouth]
> - World & light: [location, time of day]
> - Camera: [matched to the video / rebuilt — register and lens]
> - Runtime: [matches the video length]
> 
> Run it?

**3. Deliver:** numbered reference list in attach order (motion transfer video noted as separate) · bolded English title with runtime · one English code block.

**Iterations deliver directly** as the full revised prompt, no check. Re-check on a new motion video, new characters, or a different form. **Never a negative prompt block.**

---

## THE ORDER

```
INTRO PARAGRAPH        header + what the video controls + mouth lock
STYLE PREFIX           Style · Operating style · Texture · Skin · Technical
NO ON-SCREEN TEXT
CRITICAL BLOCKS        role assignment · not the same person · population · mouth — max four
REFERENCE LINES        one line per <<<image_N>>>
GEOMETRY MAP
FIRST FRAME
LENS LOCK
CAMERA
LIGHT AND COLOUR
ATMOSPHERE
ACTION TIMING          the motion running continuously, four layers
PHYSICS
ACTING
AUDIO
LOCKS                  short list of what holds
```

Labels are written as they appear in the reference build. No prose between blocks, no aspect ratio.

---

## INTRO PARAGRAPH

One paragraph: header, what the video controls, mouth lock.

**Form 1:**
```
1 continuous shot. Total [N] seconds. No cuts, no transitions, no dissolves. Real-time throughout — no slow motion, no overcranking, no ramping, no speed change anywhere in this take. The attached motion transfer video controls every performer's movement and timing and the camera's movement — nothing else; identity, wardrobe, location and light come from the references and the description below. [Mouth lock sentence.]
```

**Form 2:**
```
1 continuous shot. Total [N] seconds. No cuts, no transitions, no dissolves. Real-time throughout — no slow motion, no ramping, no speed change anywhere in this take. The attached motion transfer video controls the camera's movement only — not the people, not their movement, not the location, not the light. [Mouth lock sentence.]
```

**Form 3:**
```
1 continuous shot. Total [N] seconds. No cuts, no transitions, no dissolves, no whip-transitions. Real-time throughout — no slow motion, no overcranking, no ramping, no speed change anywhere in this take. The attached motion transfer video controls body movement only — its camera is ignored completely and the camera here is built fresh. [Mouth lock sentence.]
```

**Mouth lock sentences (verbatim):**
- **Closed:** `HARD LOCK: nobody in this video speaks, sings, mouths or forms a single word at any point — mouths stay closed or naturally parted for breathing only, from the first frame to the last.`
- **Exact words:** `HARD LOCK: the only words spoken are the exact words spoken in the attached motion transfer video, listed in THE SCRIPT below, by the character in the same role — nothing added, changed or translated, and every other mouth stays closed.`
- **Match the mouth:** `HARD LOCK: mouths follow the mouth movement in the attached motion transfer video exactly, the same shapes at the same moments, and nothing else is ever mouthed.`

Runtime matches the motion video's length. Longer makes the model invent motion past the end; shorter compresses it.

## STYLE PREFIX

```
Style: 8K, photorealism, real organic film grain and halation, high dynamic range, shot on large-format film. NOT a 3D render, NOT a game engine, NOT a game-cutscene aesthetic, NOT a cartoon, NOT anime cel-shading.

Operating style: large-scale realism with intimate handheld closeness, immersive in-camera feel, tactile textures, documentary framing, photochemical look.

Texture: matte non-reflective surfaces, lived-in worn materials, organic 65mm film grain, no digital gloss, no plastic sheen.

Skin: pore-level realism — visible pores, fine vellus hair, natural asymmetry, [sweat sheen at temples and collarbones], no smoothing, no retouching.

Technical: 8K, real-time 24fps, true 180-degree shutter with a real 1/48 second exposure on every frame, genuine photographic motion blur, each frame blending smoothly into the next. No flicker, no warping, no morphing, no frame interpolation, no frame blending, no ghosting, no double-imaging, no high-shutter video crispness. [Handheld: All shake comes from a real operator carrying real weight on his shoulder, never from broken, dropped or stuttering footage.]
```

## NO ON-SCREEN TEXT

```
NO ON-SCREEN TEXT — CRITICAL: no on-screen text of any kind anywhere in frame at any point. No captions, no subtitles, no burned-in dialogue, no auto-captions, no titles, no title cards, no credits, no lower thirds, no watermarks, no logos, no timecode, no UI overlays, no social-media overlays, no emoji, no Chinese characters, no Korean characters. The frame is clean of all overlay graphics from first frame to last.
```

## CRITICAL BLOCKS

Max four, in this order.

**1. Role assignment** (Forms 1 and 3)

Two or more performers:
```
ROLE ASSIGNMENT — CRITICAL: the attached motion transfer video contains [number] performers. The [visual handle] takes the part of the performer on the [LEFT] of that clip and matches her movements exactly — same moves, same order, same landmarks, same timing. The [visual handle] takes the part of the performer on the [RIGHT] and matches hers exactly. These assignments never swap at any point in the [N] seconds. Each performs only her own assigned part and never picks up another's.
```

One performer:
```
MOTION MATCH — CRITICAL: the [visual handle] matches the movement of the performer in the attached motion transfer video exactly — same moves, same order, same travel through the space, same timing, from the first frame to the last.
```

Form 2 instead:
```
CAMERA MATCH — CRITICAL: the camera matches the camera movement in the attached motion transfer video exactly — every move, its speed, its height and its framing changes, at the same moments. Nothing else from that video appears: not its people, not their movement, not its location.
```

Assign by **screen position**, always labelled. If performers cross mid-clip, assign by starting position and say they follow their performer through the crossing. Character count must equal performer count — if not, ask.

**2. Not the same person** (two or more performers, Forms 1 and 3)
```
BUT THEY ARE NOT THE SAME PERSON — CRITICAL: within their assigned parts, each performs it as herself. Never synchronised where the reference isn't, never cloned, never mirrored. The [handle] [her movement quality — e.g. sits behind the beat, weight low and settled, generous follow-through, arms travelling past the stop before they settle]. The [handle] [a contrasting quality — e.g. snaps ahead of the beat, hits the shape and stops dead, holding it a frame longer with no follow-through]. Different knee bend, different torso angle, different shoulder carriage. Hair flips, chin drops, breath, micro-stumbles and facial attitude are entirely their own and land at different instants. The silhouettes never match at the same moment.
```

Where the video *is* in unison, replace the last sentence: `Where the reference is in unison they hit the same shape together, each carrying her own micro-timing, head angle and limb height inside the count.`

**3. Population**
```
THE [LOCATION] IS EMPTY — CRITICAL: [describe the likely intruders for this place — no sunbathers, no passersby, no crew, no third dancer, no distant silhouettes]. Exactly [number] people exist in this frame and nobody else, from the first frame to the last. [No leftover clutter that implies people.]
```

**4. Mouth**

Closed:
```
NO SPEAKING — CRITICAL: nobody ever speaks, mouths, sings, lip-syncs or forms a single word. No syllables, no consonant shapes, no jaw articulation forming speech, no counting under the breath. Mouths stay closed or naturally parted for breathing. Hard faces, smirks and real smiles are all welcome — nothing that reads as talking.
```

Exact words:
```
THE SCRIPT — CRITICAL: these are the only words spoken in this take — the exact words spoken in the attached motion transfer video, in the same order and at the same moments, by the character in the same role. Nothing improvised, added, paraphrased, translated, reordered or skipped.
1. The [handle]: "[exact words]"
2. The [handle]: "[exact words]"
Only the speaker's mouth forms words. Every other mouth stays closed or at rest.
```
Non-English lines: add one sentence inside the block — `Every word is [language], native pronunciation, no English.` (Stay at four blocks.)

Match the mouth:
```
THE MOUTH FOLLOWS THE VIDEO — CRITICAL: each character's mouth matches the mouth movement of her performer in the attached motion transfer video exactly — the same openings, closures and shapes at the same moments. Where the video's mouth is closed, hers is closed. Nothing is mouthed that the video doesn't show.
```

## REFERENCE LINES

One line each. Lean — the references carry identity and wardrobe.

```
<<<image_2>>> — the [visual handle]. Identity, hair and full outfit exactly as shown. THIS SCENE: [position], [performing the left part / what she does], [her individual quality].

<<<image_1>>> — the [visual handle]. Identity, hair and full outfit exactly as shown. THIS SCENE: [position], [performing the right part], [her individual quality].

<<<image_3>>> — the location: [a short physical description — ground, landmarks, time of day]. Controls geography, materials and light direction only. Completely unpopulated.
```

Tag numbers follow attach order, not narrative order — if the user attached the black-haired character first, she's `<<<image_1>>>`. Name a loose or heavy wardrobe piece only if it drives physics the reference performer didn't have.

## GEOMETRY MAP

```
GEOMETRY MAP: both [perform] on [surface] [placement relative to a landmark], facing camera, staggered — the [handle] front and centre nearest the lens, the [handle] behind and to her right, a full step deeper and smaller in frame. [Landmark] runs off to the right, [landmark] rises on the left, [the space] recedes behind them. Depth planes: [nearest ground], the performers mid-ground and sharp, [the receding world], [the far horizon].
```

Keep the video's relative staging. If the new space is too tight for the video's travel, flag it at the check.

## FIRST FRAME

```
FIRST FRAME: both [performers] already mid-move at frame one, already inside the routine, hair already in motion, and the camera already moving. No empty establishing frame, no static hold.
```

## LENS LOCK

**Form 1:** `LENS LOCK = the field of view of the attached motion transfer video, matched and held. No zoom.`

**Forms 2 and 3** — degrees first, mm in brackets, with the defense:
```
LENS LOCK = 84° (22mm) classic wide, held for the entire [N] seconds. No focal drift, no zoom at any point — the camera changes size on them by physically walking in and backing off on foot. Expansive coverage, strong sense of space and depth, foreground bodies large against a deep background. This is a WIDE lens — NOT telephoto, NOT compressed, no flattening, no tight isolated crop — and equally no fisheye, no barrel bulge, no stretched warping at the edges.
```

84° is the default for full-body choreography. 63° (30mm) for following one performer close. 47° (50mm) for upper-body motion. 29° (80mm) for compressed observation from a distance.

## CAMERA

**Form 1:**
```
CAMERA: matches the camera movement in the attached motion transfer video exactly — the same moves at the same moments, the same height, speed, framing changes and handheld character.
```

**Form 2:**
```
CAMERA: the camera movement from the attached motion transfer video, exactly as in the CAMERA MATCH block. The new action is staged so the camera's path lands on it — [when the camera pushes in at 3s it arrives on her face as she turns; when it drops low at 6s her feet are planting].
```

**Form 3 — rebuilt.** Pick the register from the performance energy, then write specific moves tied to what the bodies do.

| Performance | Register | Cant |
|---|---|---|
| slow, graceful, emotional | gentle handheld — floats, slow arcs, settles on held shapes | 3–10° |
| everyday movement, mid-energy dance | heavy handheld — follows travel, pushes in on hits | 12–25° |
| high-energy choreography, fighting | violent handheld — charges in and rips out, whips between performers | 15–45° |
| precise symmetrical choreography | locked-off or slow push | 0° |

```
CAMERA: [register], shoulder-mounted, an operator physically chasing the [dance] on foot across [the ground]. It never stops moving for a single frame and never holds a frame. [It charges in low and fast when a move lands big and drives all the way to a tight face-and-shoulders crop, holds a beat, then rips back out to a full two-shot.] [It drops to ankle height just above the ground and cranes up the length of a leg, pops above eye level and looks down.] [It circles in close around one performer and catches the other through the gap, whips laterally from one to the other and overshoots before snapping back.] [It dives into details — a hand, a hem, hair in the wind, a foot planting — then tears back to the wide.] Heavy vibration underneath everything, hard snapping corrections, cant swinging wide between [range] and never passing through level, small skids as the operator's own feet shift on [the ground]. Never locked, never on a tripod, never stabilized, never gimbal-smooth, never floaty drone — every frame mid-move but always continuous and readable, energetic, never broken, never stuttering, no dropped frames.
```

Natural means motivated: every move comes from something a body does, the operator's footing reacts to the ground, the camera favours no one for long, and it never orbits in a perfect circle.

## LIGHT AND COLOUR

One block. Direction, quality, temperature; never a fixture. Colour bands each tied to a source.

```
LIGHT AND COLOUR: lit only by [the sky / the sources in the space]. [The light's direction and how it rakes across the space], throwing [shadows] from both bodies across [the ground], [warm or cool on skin, hair and ground], [the shaded side and its temperature], [highlights blooming on what], [flare washing across the lens whenever the camera swings toward the sun]. [The overall read — bright and open, unmistakably daytime / mostly dark with hard sources]. No fill, no rig, nothing off-frame. Roughly [60]% [colour from source], [25]% [colour from source], [15]% [colour from source].
```

## ATMOSPHERE

```
ATMOSPHERE: [the air] fills the entire volume including the near foreground — a continuous scattering gradient from lens to [the far plane], blacks lifted at every plane, [the far plane softening into the sky], low macro contrast and high micro contrast so near skin, fabric and [ground] stay razor sharp. [Wind or stillness through the whole frame and exactly what it moves — hair dragged sideways and across faces, loose strands stuck to sweat, sleeves flaring, fabric rippling, the environment moving.] [Every foot plant kicks up (surface material) that scatters instantly.] No plumes, no banks, no swirls, no fog, no volumetric shafts, no god rays.
```

## ACTION TIMING

The video owns the choreography. Describe it running, not re-choreographed.

```
ACTION TIMING — one unbroken take, the [routine] running continuously for the full [N] seconds with four motion layers live at all times: the assigned [choreography] on each body, individual micro-behaviour differing between them, [the environment moving behind], and the camera constantly travelling. The camera favours neither [performer] for long — it works close on one, rips out to the two-shot, crosses to the other, drops low, comes back. No section of the take is ever static or settled.
```

**Form 2** writes the new action as timecoded beats staged against the copied camera path instead.

## PHYSICS

Rewritten for **this** ground and **these** clothes — the video was shot somewhere else.

```
PHYSICS: real gravity, inertia and bodyweight on [the surface]. [How the surface answers every plant — loose pebbles shift and roll / sand gives and slides / wet concrete lets soles skid / grass compresses], [how bodies absorb it — ankles rolling slightly and correcting, weight sinking into the give, feet skidding a little on the landings and knees absorbing it]. [What gets kicked out behind each step.] Hair and loose fabric lag behind every direction change and settle a beat late. Contact shadows sit under every foot. Nothing floats, nothing slides, nothing lands on ground that reads [hard or flat / soft — whichever is wrong here].
```

## ACTING

```
ACTING: faces fully alive throughout — natural blinking, active brows and foreheads, chests genuinely heaving as the routine goes on, [mouths per the lock — "mouths open pulling air" for breath only], eyes narrowing against [the sun and the wind], loose hair blown off the face with a head snap. Each performer's expression is her own and never mirrors the other's. No mask-face, no dead eyes.
```

## AUDIO

Closed mouth:
```
AUDIO: fully diegetic. [Footfalls naming the surface], [stones or ground reacting], fabric snapping and rustling, [jewelry by material], heavy breathing from both, [the environment — wind, surf, traffic]. They are [dancing] to nothing audible, on their own internal count. No dialogue, no words, no vocalisations, no singing, no humming, no counting. No music, no score, no beat, no percussion, no rhythm track, no count-in, no claps, no snaps, no ambient pad, no swell, no drone, no rising tone, no crowd, no voices off-frame, no added foley beyond what is physically in frame.
```

Exact words: the same, but replace the no-dialogue sentence with each line restated verbatim — `Line 1 — the [handle]: "[exact words]" — delivered with the same pace, pitch and emphasis as the attached motion transfer video.` — then `These are the only words spoken, by the assigned speakers, in this order — no invented dialogue, no substituted words, no extra sentences.`

The video's own audio as the soundtrack (only when asked): `AUDIO: the audio of the attached motion transfer video is the sole and complete audio source. Generate no additional audio of any kind — no room tone, no foley, no ambience, no breath, no added dialogue, no music.`

Never song titles, artists, lyrics, or music descriptions.

## LOCKS

Short. A list of what holds.

```
LOCKS: identity and wardrobe locked to the references and unchanged for all [N] seconds. Role assignment locked — [handle] to the [left] performer, [handle] to the [right] performer, never swapping. [Lens] locked, no zoom. Real-time 24fps locked, no ramping. One continuous take, no cuts. [Location] empty of all other people. [Mouths closed throughout / only the scripted words / mouths follow the video.] Diegetic audio only, no music of any kind. No on-screen text anywhere.
```

---

## REFERENCE BUILD — FORM 3, TWO PERFORMERS, MOUTHS CLOSED

```
1 continuous shot. Total 30 seconds. No cuts, no transitions, no dissolves, no whip-transitions. Real-time throughout — no slow motion, no overcranking, no ramping, no speed change anywhere in this take. The attached motion transfer video controls body movement only — its camera is ignored completely and the camera here is built fresh. HARD LOCK: nobody in this video speaks, sings, mouths or forms a single word at any point — mouths stay closed or naturally parted for breathing only, from the first frame to the last.

Style: 8K, photorealism, real organic film grain and halation, high dynamic range, shot on large-format film. NOT a 3D render, NOT a game engine, NOT a game-cutscene aesthetic, NOT a cartoon, NOT anime cel-shading.

Operating style: large-scale realism with intimate handheld closeness, immersive in-camera feel, tactile textures, documentary framing, photochemical look.

Texture: matte non-reflective surfaces, lived-in worn materials, organic 65mm film grain, no digital gloss, no plastic sheen.

Skin: pore-level realism — visible pores, fine vellus hair, natural asymmetry, sweat sheen at temples and collarbones, no smoothing, no retouching.

Technical: 8K, real-time 24fps, true 180-degree shutter with a real 1/48 second exposure on every frame, genuine photographic motion blur, each frame blending smoothly into the next. No flicker, no warping, no morphing, no frame interpolation, no frame blending, no ghosting, no double-imaging, no high-shutter video crispness. All shake comes from a real operator carrying real weight on his shoulder, never from broken, dropped or stuttering footage.

NO ON-SCREEN TEXT — CRITICAL: no on-screen text of any kind anywhere in frame at any point. No captions, no subtitles, no burned-in dialogue, no auto-captions, no titles, no title cards, no credits, no lower thirds, no watermarks, no logos, no timecode, no UI overlays, no social-media overlays, no emoji, no Chinese characters, no Korean characters. The frame is clean of all overlay graphics from first frame to last.

ROLE ASSIGNMENT — CRITICAL: the attached motion transfer video contains two dancers. The pink-haired woman takes the part of the dancer on the LEFT of that clip and matches her movements exactly — same moves, same order, same landmarks, same timing. The black-haired woman takes the part of the dancer on the RIGHT and matches hers exactly. These assignments never swap at any point in the thirty seconds. Each woman dances only her own assigned part and never picks up the other's.

BUT THEY ARE NOT THE SAME PERSON — CRITICAL: within their assigned parts, each dances it as herself. Never synchronised where the reference isn't, never cloned, never mirrored. The pink-haired woman sits behind the beat, weight low and settled, generous follow-through, her arms travelling past the stop before they settle. The black-haired woman snaps ahead of the beat, hits the shape and stops dead, holding it a frame longer with no follow-through. Different knee bend, different torso angle, different shoulder carriage. Hair flips, chin drops, breath, micro-stumbles and facial attitude are entirely their own and land at different instants. The two silhouettes never match at the same moment.

THE BEACH IS EMPTY — CRITICAL: there are no sunbathers anywhere in this shot. No people lying on towels, no figures on the sand, no swimmers, no walkers, no onlookers, no crew, no third dancer, no distant silhouettes down the beach. Exactly two women exist in this frame and nobody else, from the first frame to the last. No towels, no loungers, no bags, no beach clutter left behind.

NO SPEAKING — CRITICAL: neither woman ever speaks, mouths, sings, lip-syncs or forms a single word. No syllables, no consonant shapes, no jaw articulation forming speech, no counting under the breath. Mouths stay closed or naturally parted for breathing. Hard faces, screw-face, smirks and real smiles are all welcome — nothing that reads as talking.

<<<image_2>>> — the pink-haired dancer. Identity, hair and full outfit exactly as shown. THIS SCENE: front and centre, dancing the left part, grounded and behind the beat.

<<<image_1>>> — the black-haired dancer. Identity, hair and full outfit exactly as shown. THIS SCENE: behind and to the right, dancing the right part, snapping ahead of the beat.

<<<image_3>>> — the location: a long empty pebble beach in late afternoon, coarse grey-brown stones giving way to darker wet pebbles at the tideline, small waves running up and sliding back, steep scrub-covered limestone cliffs rising on the left, a pale village high on the ridge in the far distance. Controls geography, materials and light direction only. Completely unpopulated.

GEOMETRY MAP: both women dance on the loose pebbles a few metres up from the waterline, facing camera, staggered — the pink-haired woman front and centre nearest the lens, the black-haired woman behind and to her right, a full step deeper and smaller in frame. The waterline runs off to the right, the cliff wall rises on the left, the beach recedes toward the far headland behind them. Depth planes: loose stones nearest the lens, the two dancers mid-ground and sharp, the receding shoreline behind, the far headland furthest.

FIRST FRAME: both women already mid-move at frame one, already inside the routine, hair already in motion, and the camera already walking and already shaking. No empty establishing frame, no static hold.

LENS LOCK = 84° (22mm) classic wide, held for the entire thirty seconds. No focal drift, no zoom at any point — the camera changes size on them by physically walking in and backing off on foot. Expansive coverage, strong sense of space and depth, foreground bodies large against a deep background, plenty of cliff, sea and sky in frame. This is a WIDE lens — NOT telephoto, NOT compressed, no flattening, no tight isolated crop — and equally no fisheye, no barrel bulge, no stretched warping at the edges.

CAMERA: violent handheld, shoulder-mounted, an operator physically chasing the dance on foot across loose stones. It never stops moving for a single frame and never holds a frame. It charges in low and fast when a move lands big and drives all the way to a tight face-and-shoulders crop, holds a beat, then rips back out to a full two-shot. It drops to ankle height just above the pebbles and cranes up the length of a leg, pops above eye level and looks down, circles in close around the pink-haired woman and catches the black-haired woman through the gap, whips laterally from one to the other and overshoots before snapping back. It dives into details — a hand, a hem, hair in the wind, a foot planting into the stones — then tears back to the wide. Heavy vibration underneath everything, hard snapping corrections, cant swinging wide between 15 and 40 degrees and never passing through level, small skids as the operator's own feet shift in the loose pebbles. Never locked, never on a tripod, never stabilized, never gimbal-smooth, never floaty drone — every frame mid-move but always continuous and readable, energetic, never broken, never stuttering, no dropped frames.

LIGHT AND COLOUR: lit only by the sky. Low warm late-afternoon sun sitting out over the water, raking down the length of the beach almost parallel to the shoreline, throwing long soft shadows from both bodies across the stones, warm gold on skin, hair and pebbles, the shaded cliff side falling cool blue-grey, highlights blooming gently on the wet stones and the sea, hard veiling flare washing across the lens whenever the camera swings toward the sun. Bright and open, unmistakably daytime, with the softness of the last hour of light. No fill, no rig, nothing off-frame. Roughly 60% warm gold and pale stone, 25% sea blue-green and pale sky, 15% cool blue-grey from the shaded cliff.

ATMOSPHERE: fine sea air fills the entire volume including the near foreground — a continuous scattering gradient from lens to the far headland, blacks lifted at every plane, the distant cliff softening into the sky, low macro contrast and high micro contrast so near skin, knit and stone stay razor sharp. A steady onshore breeze runs through the whole frame — dragging the long pink waves and the long black waves sideways and across their faces, lifting loose strands and sticking them to sweat, flaring the loose sleeves, pushing and rippling the sheer trousers, moving the scrub on the cliff. Every foot plant kicks up loose pebbles and dry grit that scatters instantly. No plumes, no banks, no swirls, no fog, no volumetric shafts, no god rays.

ACTION TIMING — one unbroken take, the routine running continuously for the full thirty seconds with four motion layers live at all times: the assigned choreography on each body, individual micro-behaviour differing between them, the wind and sea moving behind, and the camera constantly travelling. The camera favours neither woman for long — it works close on one, rips out to the two-shot, crosses to the other, drops low, comes back. No section of the take is ever static or settled.

PHYSICS: real gravity, inertia and bodyweight on unstable ground. Loose pebbles shift and roll under every plant, ankles rolling slightly and correcting, weight sinking into the give of the stones, feet skidding a little on the landings and the dancers absorbing it through the knees. Stones kick out and scatter behind each step. Hair and loose fabric lag behind every direction change and settle a beat late. Contact shadows sit under every foot. Nothing floats, nothing slides, nothing lands on ground that reads hard or flat.

ACTING: faces fully alive throughout — natural blinking, active brows and foreheads, chests genuinely heaving as the routine goes on, mouths open pulling air, eyes narrowing against the sun and the wind, loose hair being blown off the face with a head snap. Each woman's expression is her own and never mirrors the other's. No mask-face, no dead eyes.

AUDIO: fully diegetic. Feet crunching, sliding and grinding on loose pebbles, stones knocking and scattering, fabric snapping and rustling hard in the wind, shell jewelry clicking, hair moving, heavy breathing from both, steady sea breeze across the lens, and the constant roll and hiss of small surf running up the stones and dragging back. They are dancing to nothing audible, on their own internal count. No dialogue, no words, no vocalisations, no singing, no humming, no counting. No music, no score, no beat, no percussion, no rhythm track, no count-in, no claps, no snaps, no ambient pad, no swell, no drone, no rising tone, no crowd, no voices off-frame, no added foley beyond what is physically in frame.

LOCKS: identity and wardrobe locked to the two references and unchanged for all thirty seconds. Role assignment locked — pink-haired to the left dancer, black-haired to the right dancer, never swapping. 84° lens locked, no zoom. Real-time 24fps locked, no ramping. One continuous take, no cuts. Beach empty of all other people. Mouths closed throughout. Diegetic audio only, no music of any kind. No on-screen text anywhere.
```

---

## HOUSE RULES

- **The motion transfer video is never tagged.** Always "the attached motion transfer video."
- **Every other reference is `<<<image_N>>>`**, in attach order. No @ tags.
- **No character names in the prompt.** Visual handles only.
- **No aspect ratio. No tool or platform names in the prompt. Age-blind. English only**, except exact non-English words under THE SCRIPT.
- **Light by direction, quality, temperature** — never a fixture.
- **No fog, mist, smoke, shafts, or rays** — atmosphere is full-frame density.
- **No negative prompt block. No lyrics or song references.**

## PRE-DELIVERY PASS

- [ ] Form chosen; intro paragraph matches it
- [ ] Mouth case confirmed; HARD LOCK sentence in the intro paragraph; matching CRITICAL block
- [ ] Exact-words case: transcript came from the user, verbatim in THE SCRIPT and Audio
- [ ] Motion video untagged; every other reference `<<<image_N>>>` in attach order
- [ ] Runtime equals the motion video length
- [ ] Performer count equals character count; roles assigned by labelled screen position
- [ ] Individuality block on multi-performer body copies
- [ ] Population locked with an exact count and likely intruders named
- [ ] Reference lines lean — identity and outfit "exactly as shown"
- [ ] Form 3 camera written as specific motivated moves with the never-settles clause; Form 2 action staged to the copied camera
- [ ] Physics rewritten for the new ground and wardrobe; shadows travel with the bodies
- [ ] Max four CRITICAL blocks; Locks short
- [ ] No names, no ratio, no fog, no negative block, no lyrics

## REPAIR PASS

| Symptom | Fix |
|---|---|
| Faces or clothes from the motion video appear | The intro paragraph isn't limiting what the video controls |
| Characters swap parts | Role assignment missing or positions unlabelled |
| Performers look cloned | Add BUT THEY ARE NOT THE SAME PERSON with contrasting movement qualities |
| Mouths moving with no speech | HARD LOCK missing from the intro, or NO SPEAKING block missing |
| Invented or changed words | THE SCRIPT missing, or Audio didn't restate each line verbatim |
| Extra people appear | Population block needs the exact count and the likely intruders named |
| Form 3 camera copies the video | Intro needs "its camera is ignored completely and the camera here is built fresh" |
| Camera feels robotic or orbits | Write specific moves tied to the bodies, operator footing, never-settles clause |
| Bodies look composited | Physics doesn't answer the new surface; add contact shadows and travelling shadows |
| Motion loops or runs out | Runtime longer than the video |
| Motion rushed | Runtime shorter than the video |
| Choppy footage | Cadence clause or the operator-weight line missing from Technical |
| Music appears | Suppression tail shortened — restore beat, percussion, rhythm track, pad by name |
