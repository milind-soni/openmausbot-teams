---
name: "voicesheet-v1"
description: "Voicesheet v1 — walks users through building a speaking video character reference for Seedance: language pangram, emotion tags, ElevenLabs voice clip, black-frame video, two-panel Shotcaller prompt."
---

# Voicesheet v1 — Speaking Character Reference Builder

A skill made by Joey. It walks a user from nothing to a finished **video character reference**: one short Seedance 2.5 clip that locks a character's face, voice, outfit and way of performing dialogue, so every later generation knows how they look, sound and move.

The finished reference is a two-panel clip on a flat gray field:
- **Right panel:** one unbroken close-up of the face, lip-syncing a phonetic pangram in the character's own voice. The head turns naturally through the emotional range, so the model learns the bone structure from several angles and how this person emotes.
- **Left panel:** a montage of full-body turns plus tight inserts of the outfit details.

Optionally, a second **prop scale reference** clip shows the character holding an item (a weapon, a bag, a phone) so later generations know its size against their body.

This skill runs the process. It calls on **Castkit** for character sheets and **Shotcaller** for the Seedance prompt; load those skills when you reach their steps.

---

## HOW TO RUN THIS SKILL

Work through the stages in order. Each stage ends with something the user has in hand before the next one starts. Ask only what the stage needs, one short question at a time, and let the user skip anything they already have (an existing voice clip, an existing sheet).

| Stage | The user ends up with |
|---|---|
| 1. Language and pangram | A phonetic pangram in the character's language |
| 2. Personality and tags | The pangram tagged for this character's emotional range, plus a voice design description |
| 3. Voice clip | A downloaded audio file in the character's voice |
| 4. Voice video | A black-frame video of that audio, whole-second length, 720p |
| 5. Character sheet | A 3-panel character sheet (built with Castkit if they have none) |
| 6. Character intake | Personality confirmed, clip length confirmed |
| 7. The reference prompt | A Seedance 2.5 two-panel prompt, built with Shotcaller |
| 8. Prop scale (optional) | A second prompt locking a held item's size |

If the user arrives mid-way ("I already have my voice clip"), confirm what they have and start at the next stage.

---

## STAGE 1 — LANGUAGE AND PANGRAM

Ask which language the character speaks. The pangram changes per language because every language has its own sound inventory.

### Phonetic, not written

A written pangram uses every letter. A **phonetic** pangram makes every *sound*. They are not the same, and for a voice model the sounds are what matter. Sound changes in connected speech can hide a letter's sound entirely: in Korean, 않다 is pronounced [안타], so its ㄷ is never heard as a plain ㄷ. Always check what is actually pronounced.

### What a good pangram needs

- Every consonant and vowel of the language, including the ones that only show up in speech (aspiration, tense consonants, final consonants, diphthongs, nasals, sound changes at word boundaries).
- Plenty of **closed-lip consonants** (b, p, m and their equivalents). These become visible lip seals in the video and are what make the lip-sync read.
- Short clauses, so each one can carry its own emotion tag.
- Around 2–4 sentences, landing at **8–15 seconds** when spoken.
- Natural, sayable lines. Nonsense strings make voice models stumble.

### Stock pangrams

**Korean (tested):**

```
키스의 고유 조건은 입술끼리 만나야 하고 특별한 기술은 필요치 않다. 얘, 도대체 왜 뛰어? 뭐?! 예쁜 쥐가 내 짬뽕 훔쳐 갔대! 봐, 저기 있네.
```

The first sentence is the classic Korean pangram. The second half was added to fill its phonetic gaps: a clean plain ㄷ (도대체), ㅐ and ㅔ, ㅒ/ㅙ/ㅝ/ㅘ (얘, 왜, 뭐, 봐), ㄸ and ㅟ (뛰어, 쥐), ㅉ, ㅃ and the ㅁ/ㅇ finals (짬뽕), ㅆ and a ㄷ final (갔대).

**English:**

```
The beige hue on the waters of the loch impressed all, including the French queen, before she heard that symphony again, just as young Arthur wanted.
```

This is a widely used phonetic pangram covering the English phonemes, including the rare /ʒ/ in "beige". It is one long sentence, so break it into clauses with tags.

### Any other language (Dutch, Spanish, Japanese, and so on)

Build one, and show your work:
1. List the language's sound inventory: every consonant, vowel and diphthong, plus the sound changes that matter in speech. For Dutch, for example: the throat g/ch, sch, ui, eu, ij/ei, ou/au, oe, uu, long versus short vowels, the schwa, final devoicing, and the v/f and z/s pairs.
2. Write 2–4 natural sentences that hit every item, with lots of closed-lip consonants and a few sharp exclamations for the emotional peaks.
3. Give the user a coverage table: each sound, and the word where it appears.
4. Recommend a native speaker read it once before it goes into the voice model. Don't present a self-built pangram as a known standard.

Once a pangram is chosen, its text is locked for every character in that language. Only the tags change per character.

---

## STAGE 2 — PERSONALITY AND TAGS

Ask who this character is. Not their backstory: how they *come across*. Butch or delicate, timid or aggressive, cool or chaotic, bratty, warm, deadpan. Two or three adjectives is enough.

### Tag the pangram

Tags are ElevenLabs audio tags: English words in square brackets before each clause, telling the voice how to deliver it. Use **Eleven v4**, the latest and most emotional model that reads the tags as of now. If a newer tag-capable model has replaced it by the time the user reads this, use that one. Models without tag support read the brackets aloud or ignore them.

Rules:
- **One tag per clause.** Stacked tags make the voice drift or skip the delivery.
- **Never change the pangram text.** Only add tags.
- **Cover the full emotional range** in one take, so the reference shows every register: something neutral or curious, something playful, a laugh, something quiet or whispered, a surprise or gasp, something loud, and a release (a sigh or a settle).
- **Shape every tag to the personality.** The range stays; the flavour changes. A cool character's "loud" is cold disbelief, not a scream.

The tags here also become the facial acting in Stage 7, so the face and the voice match beat for beat.

### Example: the same Korean pangram, three characters

Default (curious, expressive):
```
[curious] 키스의 고유 조건은... [mischievously] 입술끼리 만나야 하고, [laughs softly] 특별한 기술은 [whispers] 필요치 않다. [gasps] 얘, 도대체 왜 뛰어? [shouting] 뭐?! 예쁜 쥐가 내 짬뽕 훔쳐 갔대! [sighs] 봐, 저기 있네.
```

Cool and controlled:
```
[cool, measured] 키스의 고유 조건은... [long deliberate pause] 입술끼리 만나야 하고, [dry, faintly amused] 특별한 기술은 [flat, unimpressed] 필요치 않다. [sharp, clipped] 얘, 도대체 왜 뛰어? [cold disbelief, still controlled] 뭐?! 예쁜 쥐가 내 짬뽕 훔쳐 갔대! [low, calm, precise] 봐, 저기 있네.
```

Bratty and chaotic:
```
[bratty, teasing, sing-song] 키스의 고유 조건은... [fast, mock-serious] 입술끼리 만나야 하고, [snorting laugh] 특별한 기술은 [cocky, dragging it out] 필요치 않다. [loud, playfully annoyed] 얘, 도대체 왜 뛰어? [dramatic gasp, pitch shooting up] 뭐?! 예쁜 쥐가 내 짬뽕 훔쳐 갔대! [bursting into laughter, fast] 봐, 저기 있네.
```

### Voice design description

Also write a short voice design description the user can paste into ElevenLabs Voice Design (or use to pick a library voice): age register, pitch, texture, pace, attitude, accent, and "recorded close in a quiet room."

```
A Korean woman in her twenties with a cool, clean, smooth mid-register voice. Measured, controlled volume that never rises in anger, surgical precise diction, sentences cut short and exact, long deliberate pauses before key words. Dry and composed, with a faint, private amusement underneath. Native Seoul Korean pronunciation, crisp consonants, recorded close in a quiet room.
```

Deliver the tagged pangram and the voice description each in their own code block. Every character in a cast should get a clearly different voice: different pitch, texture and pace, never two alike.

---

## STAGE 3 — THE VOICE CLIP

Walk the user through it. ElevenLabs is the default; any text-to-speech tool that supports emotion control works the same way.

1. **Get the voice.** Either design one (Voice Design, paste the voice description from Stage 2) or pick one from the voice library, matching gender, age, accent and attitude. Save it.
2. **Open Text to Speech** and select that voice.
3. **Set the model to Eleven v4** (or the newest model with audio-tag support), or the tags won't work.
4. **Paste the tagged pangram** exactly as written, tags included.
5. **Generate several takes** and pick the one where every emotion actually lands and nothing is mispronounced. Regenerate rather than settle.
6. **Download** the audio file.

Check the length. It should land between 5 and 15 seconds. If it runs long, remove a pause tag or regenerate. If it is too short, add a pause.

Menu names in these tools change over time. If a step doesn't match what the user sees, describe the goal (pick a voice, choose the tag-capable model, generate, download) rather than insisting on a button name.

---

## STAGE 4 — THE VOICE VIDEO

Seedance takes the voice as a **video** reference, so the audio goes onto a black frame.

1. Open any video editor (CapCut, Premiere, DaVinci Resolve, iMovie, and so on).
2. Put a **solid black background** on the timeline.
3. Place the audio file over it, starting at zero.
4. Set the sequence length to a **whole number of seconds**, between 5 and 15. Round to the nearest whole second, but never cut off speech: if rounding down would clip the last syllable, round up instead.
5. Export as video. **720p is fine.** MP4, H.264.

That file is the voice reference. Ask the user for its **exact length in seconds**. Every timing in the prompt is built from it.

---

## STAGE 5 — THE CHARACTER SHEET

The prompt needs a 3-panel character sheet of the character in the outfit they'll wear in the reference: a front full-body, a rear full-body and a face close-up, on a plain background.

- **They have one:** ask them to upload a screenshot of it.
- **They don't:** build it with the **Castkit** skill first. Castkit runs face lock, then the outfit image, then the 3-panel sheet, all on a flat shadowless gray field. Come back here once the sheet is approved.

If the user also has the character's canonical face lock, it can go in as a second image reference, scoped to face and bone structure only.

Read the sheet carefully: every garment, hardware detail, hair shape, makeup, jewellery and any identity marks. These become the Asset line and the left-panel inserts.

---

## STAGE 6 — CHARACTER INTAKE

Before writing the prompt, confirm three things with the user:

1. **Who they are.** Restate the personality from Stage 2 in two or three adjectives, and how it shows physically: how they hold their head, how much they move, how big or small their reactions are. A timid character makes small soft turns with downward glances. An aggressive one holds a hard stare and snaps. A cool one barely moves. A bratty one bounces.
2. **The tagged pangram they actually used**, so the facial acting follows the same beats as the voice.
3. **The voice video's length** in whole seconds.

Then send the Shotcaller pre-prompt check as plain chat text (references first, runtime last) and build on approval.

---

## STAGE 7 — THE REFERENCE PROMPT (SHOTCALLER)

Load the **Shotcaller** skill and follow its house rules and delivery: numbered reference list in attach order, a bolded title with runtime, then one English code block. Target **Seedance 2.5**.

### Attach order

1. The 3-panel character sheet (as its Element handle if saved as one, otherwise @Image 1).
2. Optionally, the canonical face lock, scoped to face and bone structure only.
3. The voice video (@Video 1), the sole audio source.

### Timing

The runtime is the voice video's length, T, in whole seconds. Every shot is a whole number of seconds.

- **Right panel:** one continuous shot for all T seconds.
- **Left panel:** n shots, where **n = the smaller of 7 and T ÷ 2 rounded down**. Shots 2 to n run 2 seconds each; **shot 1 takes the rest (T − 2 × (n − 1))**.
- Montage order: full-body turn, full-body back, full-body right profile completing the turn, then tight inserts of outfit details for the remaining shots.

| T | Left shots | Shot 1 |
|---|---|---|
| 5 | 2 | 3s |
| 8 | 4 | 2s |
| 10 | 5 | 2s |
| 12 | 6 | 2s |
| 14 | 7 | 2s |
| 15 | 7 | 3s |

### The head turn

The right panel never holds a fixed angle. The head turns through roughly 15–20 degrees either side of front, so the reference shows the face from several angles, and the soft light travels across the brow, cheekbone and jaw as it turns. The *style* of the turns comes from the personality:

| Personality | How the head moves |
|---|---|
| Timid, sweet | Small, soft, hesitant drifts, downward glances, jumpy on a startle |
| Cool, controlled | Slow, minimal, precise; long holds; one sharp clipped turn at the peak |
| Bratty, chaotic | Quick and bouncy, swaying on the rhythm, snapping on the loud line |
| Aggressive, tough | Chin down, hard eyes, heavy deliberate turns, a forward push on the loud line |
| Warm, open | Easy, generous turns, leaning in, lots of eye contact past the lens |

Map each tag to one movement and one facial beat, in order, so face and voice match.

### Template

Fill every [bracket]. No character names anywhere in the prompt, no aspect ratio, no grain or lens-artifact words, no fog, no negative prompt block.

```
Two side-by-side panels, total [T] seconds. The LEFT panel is a montage of [n] shots with hard cuts inside the left panel only — shot 1 runs [s1] seconds, shots 2 through [n] run 2 seconds each. The RIGHT panel is 1 continuous shot for the full [T] seconds, never cutting. No transitions, no dissolves. All footage real-time, no slow motion, no speed ramping anywhere.
Style: 8K photorealism, high dynamic range, large-format film look. NOT a 3D render, NOT a game engine, NOT a game-cutscene aesthetic, NOT a cartoon.
Operating style: clean studio character-reference capture, in-camera feel, tactile textures, photochemical look.
Texture: matte non-reflective surfaces, [the outfit's real materials], no digital gloss, no plastic sheen.
Skin: pore-level realism, fine vellus hair, natural asymmetry, no smoothing, no retouching.
Technical: real-time 24fps, true 180-degree shutter with a real 1/48 second exposure on every frame, genuine photographic motion blur, each frame blending smoothly into the next. No flicker, no warping, no morphing, no frame interpolation, no frame blending, no ghosting, no high-shutter video crispness.
NO ON-SCREEN TEXT — CRITICAL: no on-screen text of any kind anywhere in frame at any point. No captions, no subtitles, no burned-in dialogue, no auto-captions, no karaoke text, no lower thirds, no titles, no title cards, no credits, no watermarks, no logos, no timecode, no UI overlays, no social-media overlays, no interface elements, no [script of the language] characters. The frame is clean of all overlay graphics from first frame to last.
THE SPEECH IS THE PRIMARY SUBJECT — CRITICAL: in the RIGHT panel the [person] speaks out loud to the attached voice recording in [voice video tag], in [language], every syllable formed on [their] lips in time with it, for its full length. [They are] the speaker of this recording, never mouthing along. The words [they] form, in order: "[the pangram text exactly, tags removed]" Every closed consonant lands as a complete visible lip seal held a beat before releasing — both lips press fully together on [every word with a b, p or m sound, or the language's equivalents]. Open vowels are held open, the jaw working with the phrasing, never lazily half-open or mumbling. [Their] mouth is the focus of the right panel.
THE HEAD TURN AND THE MOUTH — CRITICAL: in the right panel [they turn their] head naturally while speaking, so the camera reads [their] facial expressions and bone structure from several angles. [The head path, beat by beat, in the personality's style: where it starts, where it drifts on the opening lines, where it snaps on the peak, where it settles for the last line.] Every turn stays about fifteen to twenty degrees either side of front. [Their] mouth stays unobstructed and clearly readable in every frame and at every angle. Nothing ever covers it — no hand, no hair, [no collar or accessory that could rise over it].
THE TWO PANELS — CRITICAL: the frame is two equal side-by-side vertical panels on one continuous flat neutral 18% gray field, separated by a thin straight seam of the same gray. Every cut happens inside the LEFT panel only; the RIGHT panel runs unbroken through every left-panel cut, its performance never jumping, resetting, or pausing. Only the right panel speaks — in the left panel [their] face is fully visible and sharp, [their] mouth closed, never forming words, never mouthing along with the recording. The two panels never mirror each other or move in sync. The layout never shifts, resizes, or merges.
ASSETS:
[sheet tag] = identity and wardrobe reference only — its layout, panel arrangement, and framing are never reproduced. [Build and skin, face, eyes, brows, lips, hair, then the outfit one clause per garment, hardware, jewellery, nails, identity marks.] THIS SCENE: standing alone on the gray field. [Their] face identical in both panels. 100% match to the reference.
[If attached: face lock tag = face and bone structure only; its hair, wardrobe, and framing are not used.]
GEOMETRY MAP: LEFT panel — each montage shot centred on [their] body against the bare gray field. RIGHT panel — tight close-up from just above the crown of [their] head to just below [the top of the outfit's neckline], [their] body angled slightly toward camera-left while the head turns on the neck. [They are] sharp in every shot, the gray field behind softly falling off. Nobody else is in either panel.
FIRST FRAME: already in motion in both panels — the left panel already mid-turn, the right panel already drawing [a breath in the personality's style] before the first word. No empty establishing hold, no static frame.
LENS LOCK LEFT, shots 1–3 = 84° (24mm) full body head to [shoe] soles with clear gray margin above and below, kept at distance so proportions stay true, no edge distortion. LENS LOCK LEFT, shots 4–[n] = 12° (180mm) tight detail inserts. LENS LOCK RIGHT = 18° (120mm) — a LONG lens, strong compression, the gray thrown soft, only [their] face sharp. NOT wide-angle, no deep focus. No focal drift within any shot.
CAMERA: locked-off for every shot in both panels, real tripod weight, no movement. The stillness of the frame is the subject.
LIGHT: relight from scratch overriding reference lighting. One broad, very soft diffused key from the front and slightly above, warm-neutral, wrapping evenly, faithful skin, a gentle soft triangle of light on the shadow cheek in the right panel that travels naturally across the face as the head turns, showing the brow, cheekbone, and jaw from each angle. The background is completely shadowless — no cast shadow from [their] body on the field or floor at any point, the gray evenly lit edge to edge. [Soft highlights travelling along any shiny materials or hardware.] Blacks lifted, highlights rolled off softly.
COLOUR: ~[x]% [dominant tones and their sources]; ~[y]% [skin and hair]; ~[z]% [accent color and its source].
ATMOSPHERE: the air carries real density at every depth — a continuous soft scattering gradient from the lens to the gray field, blacks lifted on [the darkest garments], the field falling off gently behind [them]. Low macro contrast; high micro contrast — [the outfit's textures], individual hair strands, skin pores, and hardware. [They move] through the air without disturbing it. No plumes, no wisps, no beams, no rays. Nothing in the air is emitted by anything.
ACTION:
LEFT panel, shot 1, full body: a [personality-style] turn on the spot to [their] OWN left, from front through three-quarter toward profile, [one small character gesture].
LEFT panel, shot 2, full body: [their] back to the lens, weight shifting from one hip to the other — [hair from behind, back of every garment, footwear heels].
LEFT panel, shot 3, full body: [their] right side in profile, completing the turn back to front, settling into [a stance that fits the personality], a [personality-style] glance toward camera-right.
LEFT panel, shot 4, insert: [outfit detail].
[...one insert per remaining shot, each a different detail: top construction, hardware, hands and jewellery, hip and belt, footwear with one heel lifting as they shift.]
RIGHT panel, throughout: [they speak] with the recording while the head turns as described, [their] eyes moving past the lens toward camera-left and back, never into the lens. [How much the shoulders move for this personality]; most of the movement lives in the neck, the jaw, and the face.
Micro-motion: [breathing in the personality's rhythm], hair shifting and settling on every head movement, [fabric creasing or settling]. Nothing in the environment moves.
PHYSICS: real gravity and bodyweight — [footwear] planting and pivoting with weight transfer through the hips, [garments and accessories swinging and settling], hair moving with real weight. [They stand] firmly grounded on the shadowless floor. Nothing floats, nothing slides.
ACTING: RIGHT panel — a [personality] presence, active brows and eyes matched to each line in order: [one facial beat per tag, in order, written as visible muscle — brows, eyes, mouth corners, cheeks, shoulders]. Every expression lives in real facial muscle, never a frozen mask, never dead eyes. LEFT panel — [carriage in the personality's style], a neutral face with natural blinking and small idle shifts of the eyes, never mannequin-stiff.
AUDIO: the attached clip [voice video tag] is the sole and complete audio source for this sequence. Generate no additional audio of any kind — no room tone, no foley, no ambience, no breath, no added dialogue, no music.
LOCKS: two panels held for the full take — the left panel a [n]-shot outfit montage from three full-body angles into [n − 3] detail inserts, the right panel one unbroken close-up speaking with the recording while the head turns through about fifteen to twenty degrees either side of front. Cuts stay inside the left panel. One [person], identical to [sheet tag] throughout — [hair, key garments, hardware, identity marks] unchanged. Only the right panel speaks; the left panel mouth stays closed. Speech applies per THE SPEECH. The background stays completely shadowless and the light stays soft and identical across both panels. The air holds uniform density. Skin reads true cinematic matte — zero shine on forehead, nose bridge, cheekbones, and chin, real fine even pore texture, peach fuzz at the jaw and hairline, light absorbed like true subsurface scattering, rendering true and natural, never plastic. No CGI, no rendered look, no digital cleanliness, no AI smoothness, no frozen posing, no stabilized glide, no high-shutter crispness, no frame interpolation, no dropped frames.
```

### After it renders

Tell the user to save the finished clip as an Element in Higgsfield, and to tell Claude it's a video character reference sheet whenever they tag it. Shotcaller treats a video character reference sheet as the source of the character's look, voice and emotional performance all at once: later scene prompts lock all three to it in one CRITICAL block, and the character's lines come out in the same voice, emoting the same way.

---

## STAGE 8 — PROP SCALE REFERENCE (OPTIONAL)

Offer this when the character will carry something in later scenes: a weapon, an instrument, a bag, a phone, a tool. It's a separate, second prompt. Without it, models guess an object's size and it drifts from shot to shot.

Ask for: a reference image of the item, its real size, and how the character carries it (in one hand, two hands, slung, holstered).

Build it with Shotcaller on the same two-panel gray layout, **with no dialogue and no audio track**:
- **Left panel:** full-body montage of the character holding the item — at rest, carried, raised or presented, a back view showing how it's slung or holstered. The full body and the whole item stay in frame so the proportion reads.
- **Right panel:** one continuous medium close-up of the hands and the item against the torso, turning it slowly so every side reads.
- In the Asset line, state the size in centimetres **and against a body part**: "a 60cm item, reaching from her hand to her elbow."
- Sound: diegetic handling only (fabric, grip, a strap), with the music suppression tail.

Keep weapon handling neutral and display-like: carried, held at rest, presented to the lens. No aiming at anyone, no firing, no strikes. It reads as a prop reference, and it stays clear of moderation filters.

---

## TROUBLESHOOTING

| Symptom | Fix |
|---|---|
| Tags read aloud in the audio | The model doesn't support audio tags; switch to Eleven v4 |
| Emotions all sound the same | Too many tags stacked, or tags too subtle; one strong tag per clause, regenerate |
| Lip-sync drifts | Voice video length doesn't match the prompt's T, or the transcript in THE SPEECH doesn't match the audio exactly |
| Lips mush on b/p/m sounds | Lip seal word list missing or incomplete |
| Head stays frozen at one angle | THE HEAD TURN block missing or too vague; give a beat-by-beat path |
| Head swings too far, face distorts | Restate "fifteen to twenty degrees either side of front" |
| Mouth covered by hair or collar | Name the specific thing in the mouth-visibility line |
| Left panel character talks too | Restate that the left-panel mouth stays closed |
| Captions appear | NO ON-SCREEN TEXT block moved down or carved into |
| Outfit drifts | List every garment in the Asset line; add a dedicated insert for the drifting piece |
| Moderation flag | Rarely about the character's looks. Check the reference images first (blurred faces in a reference can flag), then restructure the wording of the prompt |
| Looks 3D or illustrated | Photoreal lock missing up top, or the sheet itself came out stylised; rebuild the sheet with Castkit |