---
name: "castkit-v1"
description: "Castkit v1 — character builder. A skill made by Joey. Builds reusable character reference images, photoreal or animated, for Nano Banana Pro and other image models. Five stations: face lock (a new character's canonical chest-up plate), additions (hair changes, piercings, tattoos, scars, expression sets, re-locks), single-image outfit builds straight onto the locked character, outfit replacement (two-reference swap), and character sheets (3-panel default with headless front, full rear and tight face panel; every panel dead-on, never a three-quarter turn unless asked; 6-panel on request). Every plate renders on a flat 18% neutral gray field, shadowless and with no cast shadow, so no lighting bakes in. Use this skill whenever the user wants to design or lock a character, build a face, turn a photoreal character animated, change hair or markings, put an outfit or garment references on a character, swap a face onto an outfit, make a character sheet, turnaround or model sheet, or any character reference still."
---

# Castkit v1 — Character & Outfit Builder

A character is not one picture. It is a canonical face, a set of identity markers, and a growing wardrobe, all anchored so every later image and video renders the same person. This skill builds those anchors, in photoreal or animated style, with no lighting baked in.

## The five stations

| Station | Use when | Prerequisite |
|---|---|---|
| **0 — Face lock** | The character is being invented. | A locked text spec |
| **1 — Additions** | Something permanent changes on a locked character. | A face lock |
| **2 — Outfit build** | A look goes onto the locked character, as one single full-body image. | A face lock |
| **3 — Outfit replacement** | An outfit exists on someone else; swap the character in. | A character reference |
| **4 — Character sheet** | An approved outfit image becomes a multi-angle reference. | An approved outfit image |

Never skip forward. No outfit on an unlocked face, no sheet before an approved outfit image.

---

## STEP ZERO — THE RENDER FORK

Before anything else, know which world the character lives in. If the user hasn't said, ask once.

| | **Photoreal** | **Animated** |
|---|---|---|
| Reads as | a real person, photographed flat | a character model, rendered flat |
| Skin | pores, peach fuzz, subsurface scattering, flattering ceiling | matte, poreless, form carried by shape, color, and line |
| Hair | strand by strand with flyaways | grouped locks and shapes, with a few drawn strands |
| Cloth | real weave, weight, drape | the highest-fidelity element: real weight and fold behavior |
| Close | Photoreal Flat Close | Animated Flat Close + the style lock |

Everything else — the stations, the pre-prompt check, the flat gray field, the headless cut, the sheet layouts — is identical across both. The render changes; the grammar doesn't.

### The animated style lock

An animated character needs a style stated once and repeated verbatim in every prompt for that character. Let the user describe the style in their own words, mirror it back as a short style lock, and get approval. If they have no preference, offer these three starting points by look, never by studio or title:

**Graphic realism (default).** Realistic human proportions and bone structure, aggressively simplified in execution. Matte poreless skin, one broad soft value shift doing the form work, hard compressed highlights on gloss surfaces with almost no midtone, cloth as the most detailed element, thin drawn line accents on contours and stray hairs, blacks lifted and tinted, one saturated accent.

**Stylized 3D feature.** Appealing pushed proportions — slightly larger eyes, simplified nose and mouth construction, clean readable silhouettes. Soft subsurface-toned skin with no pores, sculpted hair shapes with a few separated strands, rich but controlled color, cloth with real weight.

**2D hand-drawn.** Clean confident linework with variable weight, flat color fills with one tone of shading at most, graphic shape language for hair, eyes designed rather than rendered, cloth indicated by fold lines.

**Photoreal-to-animated translation.** When a photoreal lock already exists, the animated lock is derived from it: attach the photoreal plate and state that the face, bone structure, proportions, hair color and cut, and every identity marker stay identical, and only the rendering changes to the style lock.

---

## CORE PRINCIPLES

### Two axes — keep them separate

**Axis 1 — the subject reads as real (or as a finished character model): fully on.** Photoreal: pores, peach fuzz, subsurface scattering, strand hair, real fabric and metal, eyes with depth. Animated: clean construction, a consistent style, cloth with weight, designed eyes.

**Axis 2 — photographic capture behavior: off on every plate.** No key direction, no shadow side, no cast or contact shadow, no background falloff, no spill, no bokeh, no depth of field, no vignette, no flare, no atmosphere.

A plate is a reference, not a finished frame. Any lighting baked in — a cheek shadow, a shadow under the feet, a warm glow on the background — gets inherited by every later image and fights whatever lighting that scene wants. The plate carries zero lighting; the scene does the lighting later.

### The flattering ceiling (every face, both styles)

Realism never means unflattering. No acne, blemishes, spots, unrequested scars, enlarged or rough pores, or clinical detail. Photoreal texture is fine, soft, and even; matte is the anti-plastic lever and fine-and-even is the flattering lever. Animated faces are clean and appealing within the style. Where anything conflicts, resolve toward a face that looks good.

**Doll-coded photoreal** (only on request): smooth matte skin without visible pores or peach fuzz, still natural, never plastic or waxy.

### Prompt economy

The references carry identity. The prompt tells the model what to do with it.

- Identify a subject by one short visual handle, not a paragraph restating what the attached plate shows.
- Spend words on what only the prompt can say: framing, pose, hands, layering, fit on this body, what's cropped out of a reference.
- Cut any sentence that re-describes something visible in an attached reference, unless it's load-bearing.
- **The exception is Station 0.** The face lock has nothing to lean on, so it gets the longest, most specific description in the skill.

**Reference economy.** Attach the fewest images that carry what's needed. When two or more are attached, state what each governs: *"the face, bone structure, and skin tone come from the character reference; the garment construction comes from the jacket reference."* Otherwise the model averages them.

---

## THE FLAT GRAY FIELD (LOCKED DEFAULT)

**An 18% neutral gray field with a completely flat, shadowless grade is the default** for every face lock, outfit image, garment plate, and sheet, in both styles. White is used only when the user explicitly asks, and the flatness survives the swap.

**Why gray.** Pure white or black backgrounds create maximum edge contrast, which is exactly where image and video models bake in halos and edge instability. Mid-gray lowers that contrast and gives cleaner extraction downstream.

**The field is neutral; the subject is not.** The gray never cools or washes out the subject. Skin and wardrobe render at their true natural color.

**The background is a field, not a room.** Not a photographed seamless, not a surface. No floor, no wall, no corner, no horizon, nothing the figure stands on or in front of. Nothing the figure does touches the field.

### PHOTOREAL FLAT CLOSE — verbatim on every photoreal plate

```
The background is a single flat 18% neutral gray field — one uniform value at every pixel corner to corner, identical directly beside the subject and in the far corners, with no seam line, no gradient, no hotspot, no vignette, and no falloff to lighter or darker anywhere in the frame. It is a flat color field, not a photographed backdrop — no surface, no floor, no wall, no corner, no horizon, and no plane the figure stands on or in front of.

Relight from scratch overriding any reference lighting: completely flat shadowless illumination — one enormous soft frontal source at camera position wrapping the subject evenly, matched equal fill from camera-left and camera-right at identical intensity, matched fill from above and below, so both sides of the face read at exactly the same brightness. No key-and-fill ratio, no modelling, no shadow side, no cheek triangle, no nose shadow, no under-chin shadow, no rim light, no hair light, no kicker, no specular hotspot. Extremely low contrast, even, milky, catalogue-flat. Form is described by bone structure, hair strands, and fabric folds alone, not by light and shadow.

Absolutely zero shadow anywhere outside the subject. No cast shadow, no contact shadow, no floor shadow, no drop shadow, no ambient occlusion where the body meets the background, no soft darkening behind the shoulders or beneath the hem, no halo, no edge darkening, and no rim separating the figure from the field. Shading exists only on the subject and stops cleanly at the silhouette. Absolutely zero light bleed outside the subject — no spill, no glow, no bounce, no reflected color cast thrown from the skin or the wardrobe onto the background, and no brightening anywhere behind the figure.

Skin reads matte and velvety — zero shine on forehead, nose bridge, cheekbones, temples, and chin, no oily T-zone. Skin renders at its true natural skin tone and wardrobe at its true natural color, warmth preserved and natural against the neutral gray, never pale or washed-out or cool-shifted by the background. Real peach fuzz at the jaw and hairline, real soft fine even pore texture, subsurface scattering reading as semi-translucent biology, real hair rendered strand by strand with fine flyaways at the hairline, real fabric weave and drape, real metal surface detail on any jewelry, never plastic, never waxy, never glass-skin, never harsh — fine flattering texture that keeps the face looking good, no acne, no blemishes, no rough pores.

Even sharpness edge to edge across the entire frame. No depth-of-field falloff, no bokeh, no background blur, no lens vignette, no lens distortion, no flare, no bloom, no chromatic aberration, no atmosphere, no air between the subject and the background. Photographed on a 50mm prime, soft natural film grain. Photographed not generated.
```

### ANIMATED FLAT CLOSE — verbatim on every animated plate, style lock first

```
[STYLE LOCK — the approved style paragraph, verbatim.]

The background is a single flat 18% neutral gray field — one uniform value at every pixel corner to corner, identical directly beside the character and in the far corners, with no seam line, no gradient, no hotspot, no vignette, and no falloff anywhere in the frame. It is a flat color field, not a painted environment — no surface, no floor, no wall, no horizon, and no plane the figure stands on or in front of.

Flat model-sheet lighting: the character is lit evenly from the front with no key direction, no shadow side, no rim light, no dramatic value shift across the face, both sides of the face reading at the same brightness. Form is carried by shape, construction, line, and color, and by the folds of the cloth, not by cast light.

Absolutely zero shadow anywhere outside the character — no cast shadow, no contact shadow, no floor shadow, no drop shadow, no halo, no glow, no outline glow, no color bleeding from the character onto the field. The field behind the figure is untouched.

Colors render at their true designed values — skin, hair, and wardrobe exactly as designed, never cooled or muted by the gray. Even clarity edge to edge, no depth of field, no blur, no vignette, no bloom, no atmosphere. A clean finished character model reference, consistent in style across the entire figure.
```

**The five things every flat close carries, both styles:** a flat uniform field that is explicitly not a surface · shadowless, directionless light on the subject · zero shadow outside the subject · zero light bleed onto the field · the subject's realism or style stated in full. Miss one and lighting comes back baked in.

**White exception:** swap only the first sentence for *"The background is a single flat pure white field — one uniform value at every pixel corner to corner, no seam line, no gradient, no hotspot, no vignette."* Everything else stays.

**On sheets:** state the flatness as applying uniformly across every panel.

---

## READING REFERENCES

Extract by visual description only. Never names, never invented detail.

- **Hair** — color with every nuance, length, texture, part, styling, which kind of bangs, accessories
- **Makeup** — finish, brows, eyes, lashes, lips, cheeks; freckles or beauty marks only if visible
- **Wardrobe** — every garment top to bottom: fabric, color, fit, construction, neckline, sleeve, hem, closures, layering, any printed text or graphics described exactly
- **Jewelry and accessories** — every piece, metal, scale
- **Body markers** — piercings and tattoos only if visible, nails
- **Pose and energy** — angle, weight, hands, expression

**No-invention rule.** If something needed isn't in the reference or the spec, ask. A guessed detail that renders becomes canon by accident.

**Material override rule.** When a reference has the right construction in the wrong material, say so: *"the glove reference resolves cut and coverage only; its silver finish is not used."*

**Text and graphics on garments.** When a garment carries real printed words, a logo, or a graphic the user wants to render, write it exactly — the words in quotes, plus shape, color, size, and placement. Naming the thing renders the thing; paraphrase renders mush.

---

## THE PRE-PROMPT CHECK

**Deliver the check as plain chat text, never inside a code block.** Code blocks are for prompts only.

Format:

> Pre-prompt check:
> - References attached: [each by short visual descriptor, and what it governs — or "none, text-only build"]
> - Render: [photoreal / animated — style lock name]
> - Character: [hair, skin, identity markers, expression]
> - Outfit: [head to toe, jewelry — or the baseline camisole / tank]
> - Backdrop: flat 18% neutral gray field
> - Framing: [only if non-default]
> 
> Sound good?

**Iterations skip the check.** Once a prompt is approved in the thread, any tweak (framing, pose, palette, a single wardrobe piece, styling nudge, model swap) ships as the revised full prompt, straight into a code block. Re-check only on a new character, a full new outfit, or a new station.

**Outfit proposals go the other way.** A new outfit always gets a text proposal approved first, and the proposal and the image prompt never ship in the same message.

---

# STATION 0 — FACE LOCK

## Stage 1 — The text spec

Let the user describe the character. Mirror back a locked spec:

- **Apparent register** — by build and bearing, never an age word or number
- **Face** — head shape, bone structure, jaw, chin, cheekbones, brows, eye shape and color, nose, lips
- **Skin** — tone and finish
- **Hair** — color nuance, length, texture, part, styling
- **Body** — build, proportions, posture
- **Default makeup** — if any
- **Default expression and energy**
- **Identity markers** — piercings by position and metal, scars by placement and size, beauty marks, tattoos, signature jewelry
- **Animated only:** the approved style lock

Iterate in text until the user locks it. Fixing a face in text is free; fixing it after twelve outfits is not.

## Stage 2 — The tool fork

Ask once:

> Lock on Nano Banana Pro, GPT-2, or a Soul Cinema test pass first?
> — **Nano Banana Pro (default):** balanced fidelity, handles any framing.
> — **GPT-2:** sharpest read on pores, lashes, and iris, chest-up only, more credits.
> — **Soul Cinema first:** cheap variations of a brand-new face to pick from, then Nano Banana Pro locks the winner.

Mention the GPT-2 credit cost once per conversation. Soul Cinema exists only for exploring a face that has never been generated; never offer it anywhere else. For animated locks, default to Nano Banana Pro and skip the fork unless the user names another tool.

**Baseline wardrobe for every face lock, both styles:** plain black thin-strap camisole for women, plain black ribbed tank for men. No jewelry, no logos, no graphics.

## Step 0.1 — Soul Cinema test (optional, photoreal only)

Essentials only, so the variations actually differ.

```
A [heritage] [woman / man] with a [build], [skin tone and finish], [hair color, length, texture]. [Eye shape and color]. [Only large, dominant markers.] [She wears a plain black thin-strap camisole / He wears a plain black ribbed tank], no jewelry, no logos, no graphics. Body squared to camera, head level, neutral relaxed expression, eyes to camera, lips closed and relaxed. Chest-up framing.

[PHOTOREAL FLAT CLOSE — verbatim]
```

## Step 0.2 — The canonical lock

**The most important image in the character's life.** Set a vertical 3:4 frame in the tool (never write the ratio in the prompt). Forehead to upper chest, face filling most of the frame — a true close-up, never waist-up.

Written in full, in this order: framing · reference anchor (if a test plate exists) · build and heritage · skin · head and face structure · eyes (shape, set, spacing, tilt, lid crease, iris color and variation, limbal ring, under-eye) · brows · lashes · nose · lips (fullness, cupid's bow, philtrum, width, corners, color, texture) · ears · hair (color root to tip, length, texture, part, fall, hairline, baby hairs) · default makeup · every identity marker with exact placement · baseline wardrobe · pose and expression · the flat close.

```
A clean character reference headshot of [the same character as the attached face plate / a character], in a vertical frame from the forehead down to the upper chest with the face filling most of the frame — a true close-up, not a portrait with space around it.

[Build and heritage.] [Skin tone, undertone, finish.] [Head and face structure.] [Eyes in full.] [Brows.] [Lashes.] [Nose.] [Lips.] [Ears.] [Hair in full.] [Default makeup, if any.] [Every identity marker with exact placement against a fixed anatomical landmark.]

[She wears a plain black thin-strap camisole / He wears a plain black ribbed tank], no jewelry, no logos, no graphics. Body squared to camera, head level, neutral relaxed expression, eyes directly to camera, lips closed and relaxed, subtle controlled energy.

[PHOTOREAL FLAT CLOSE or ANIMATED FLAT CLOSE — verbatim]
```

**Animated lock:** the face description is written in the style's own terms — eye design, brow shape, nose and mouth construction, how simplified each is — rather than pores and iris fibers. Skip micro-detail the style doesn't render.

**GPT-2 fidelity paragraph** (photoreal only, inserted before the close):

```
Extreme face fidelity. Real skin texture with visible individual pores, fine peach fuzz along the jawline and upper lip, subtle subsurface scattering across the nose bridge, cheeks, and ear edges. Individual lash separation, upper and lower. Real moisture and reflection in the iris with a visible fibrous pattern radiating from the pupil and a soft limbal ring. Real lip surface texture with fine natural lines. Hair strand by strand at the hairline with baby hairs and flyaways. Visible fabric weave at the collar and shoulder. Micro-expression held in the eye and mouth corners.
```

---

# STATION 1 — ADDITIONS

For permanent changes to a locked character.

| Addition | Re-lock? |
|---|---|
| Hair color, length, or cut | Yes |
| Facial piercing, facial scar, permanent makeup | Yes |
| Body change | Yes |
| Body tattoo, hand tattoo, hidden ear piercing | No — document in the spec and write into outfit prompts |
| Expression set | No — builds its own sheet |
| Aging up or down | Full rebuild from Station 0 |

**The identity firewall — verbatim, adjusted for what's changing:**

```
Everything about the character other than [the specific change] is identical to the attached reference and unchanged — the same head shape, the same bone structure, the same jaw and chin, the same cheekbones, the same eye shape and spacing and tilt, the same iris color, the same brow shape, the same nose, the same lips and mouth width, the same ears, the same skin tone and finish, the same build and proportions, and every existing identity marker in the same position. Only [the specific change] is different.
```

**Addition prompt:**

```
A clean character reference headshot of the same character as the attached reference, in a vertical frame from the forehead down to the upper chest with the face filling most of the frame.

[The change in full — hair: new color root to tip, length, texture, part, fall, hairline. Marking: placement against a fixed landmark, size, orientation, color, finish, raised or flat, line weight for tattoos.]

[Identity firewall — verbatim.]

[Same baseline camisole / tank], no jewelry, no logos, no graphics. Body squared to camera, head level, neutral relaxed expression, eyes directly to camera, lips closed and relaxed.

[FLAT CLOSE for the render — verbatim]
```

**Version the locks** so states don't blur: `lock-01`, `lock-02-red-hair`. Confirm which lock an outfit anchors to.

**Expression sets.** One 3-panel image: neutral, signature expression, one extreme. Same framing, light, and wardrobe in each; only the face changes. Describe muscles, never the emotion word: *"brows drawn together and down at the inner ends, upper lids lowered a fraction, mouth corners pressed level, jaw set."*

---

# STATION 2 — OUTFIT BUILD (SINGLE IMAGE)

## Step 1 — The outfit proposal (text only)

Before any image, write the outfit out and wait for approval: every garment (color, fabric, finish, cut, fit, neckline, sleeve, hem, closures) · layering · structural detail · footwear · jewelry · accessories · nails · hair and makeup if different from default. End with any open decisions as a short numbered list (which hand the single glove goes on, open or strapped back).

## Step 2 — Build it directly on the character

**Direct is the default and covers nearly everything.** Uploaded garment references, a described outfit, or both go straight onto the locked character in one generation. No stand-in model, no test pass, no preemptive garment plates.

**Framing:** full body, a tall vertical frame with the full figure and the footwear entirely inside it (set the ratio in the tool). **Default pose:** weight on one hip, body angled 15–30 degrees from camera, chin level, eyes to camera.

**With garment references, describe less.** Spend words on layering order, how each piece sits on this body, material overrides, which side an asymmetric piece goes on, and anything the reference frame crops out.

```
A full-body character reference of the same [woman / man] as the attached character reference, standing [pose], framed head to toe in a tall vertical frame with the full figure and the footwear entirely within the frame.

[What each attached reference governs, when more than one.]

[Identity in two or three clauses — build, skin, hair, face register.]

[The outfit head to toe — leaning on references for construction and spending words on layering, fit on this body, material overrides, sides, and anything cropped out of a reference.]

[Pose and expression.]

[FLAT CLOSE for the render — verbatim]
```

## Repair only — the invisible mannequin plate

Reached only when a direct build rounded one specific garment toward generic, and only for that garment.

**1. Build the failed piece alone:**

```
A garment reference of a single [garment type] worn on an invisible body, holding its full three-dimensional worn shape.

[The garment in complete detail — color, fabric, finish, cut, collar construction, sleeve, hem, closures, seams, panels, hardware, pockets, print scale and layout, lining if visible.]

There is no head, no neck, no hands, and no body anywhere in the frame — the garment reads as worn by an invisible figure with full volume, natural drape, and real fabric tension across the chest and shoulders, every opening an empty dark hollow looking into the inside of the garment with the inner back faintly visible. No stump, no skin, no cut edge, no anatomy, no mannequin form, no hanger, no stand, not blurred, not faded, no ghosting, no transparency.

[FLAT CLOSE for the render — verbatim]
```

**2. Rebuild the look** with the character reference, the new plate, and references for the pieces that already worked, stating that every garment and the identity stay exactly as shown, then layering, pose, and the flat close.

---

# STATION 3 — OUTFIT REPLACEMENT

Puts the character into the outfit and pose from another image. **Fixed order:** first reference = outfit and pose source; second reference = character. Confirm both roles in the check.

```
Replace the person in the first reference with the character from the second reference. Keep the outfit and pose from the first reference exactly — the same garments, colors, fabrics, cut, fit, hem positions, footwear, jewelry, accessories, body position, and hand placement. Match the face, bone structure, body type, skin tone, hair, and every identity marker from the second reference exactly. Full body framing.

[FLAT CLOSE for the render — verbatim]
```

For an animated character, add one line before the close: *"The result is rendered entirely in the character's style — the outfit translated into that style with its construction intact."* Keep everything else lean; the references carry it.

---

# STATION 4 — CHARACTER SHEETS

Built only from an approved outfit image. One prompt, one image.

**3-panel is the default.** A sheet is one image with a fixed pixel budget; six panels starve the face. Don't ask which format, don't offer the 6-panel.

**References:** the approved outfit image alone is the best source — it already agrees with itself. Add the face lock as a second reference only if identity drifted in the outfit image, the face is obscured or soft, a sheet already returned the wrong face, or the user asks. When both are attached, state what each governs.

## 3-panel layout

1. **LEFT — full body front, headless.** The head is removed from the body, not cropped by the frame. Isolates garment, silhouette, and proportion.
2. **CENTER — full body rear, head attached.** Hair fall, back construction, hem, footwear.
3. **RIGHT — tight chest-up face.** Just above the crown to the collarbones, face filling the panel. Never waist-up.

## Orientation lock — dead-on always

**Every sheet panel is a flat orthographic view: dead-on front, dead-on rear, dead-on face. Never a three-quarter turn unless the user asks for one by name.** A sheet is a measuring tool — a rotated torso hides one side of the garment, foreshortens the shoulder line, and kills the panel's value as a reference.

The outfit image feeding the sheet is almost always shot at an angle (Station 3's default pose is 15–30 degrees off camera). **That angle never carries into the sheet.** State the override explicitly: the sheet re-squares the body no matter how the reference stands. Same for weight — the reference's hip-cocked stance becomes even weight on both feet.

Ship the matching clause verbatim inside each panel block:

**Front (full body):** *"The body faces the camera dead-on — shoulders and hips both square to the lens and level, both sides of the figure equally visible, feet planted parallel and pointing straight at camera, weight even across both feet. This is a flat frontal view regardless of how the figure stands in the reference: no three-quarter turn, no rotation of the torso or hips away from the lens, no twist at the waist, no contrapposto, no weight shifted onto one hip, no shoulder dropped or pushed forward, no foot turned out."*

**Rear (full body):** *"The figure is seen dead-on from directly behind — shoulders and hips square to the lens and level, the spine centered in the panel, feet parallel, weight even. This is a flat rear view: no three-quarter turn, no rotation, no twist at the waist, no weight shifted onto one hip, no glance back over the shoulder."*

**Face (chest-up):** *"The head is dead-on to camera, squared and level, both ears equally visible, the nose centered between the eyes, eyes directly into the lens. This is a flat frontal view: no three-quarter turn, no head rotation, no chin lifted or dropped, no tilt to either side."*

**If the user asks for a three-quarter panel by name,** run it — state the degree of turn and which way the body points on screen, and leave every other panel dead-on.

## The headless cut — chosen by the neckline

**The test: does the garment have a real opening at the top the eye expects a neck to come out of?**
Yes → **Variant A, ghost mannequin** (the neck disappears, the opening is a hollow).
No → **Variant B, clean neck cut** (the neck stays and ends in a flat sculptural edge).

| Neckline | Variant |
|---|---|
| Mock neck, turtleneck, funnel, collar band, crew, shirt or jacket collar, hood | A |
| Ribbed tank, high scoop at the collarbone, keyhole, zip closed to the throat | A |
| Strapless, bandeau, tube, halter, spaghetti strap, thin-strap camisole | B |
| Wide or square scoop, deep cowl, plunge, V below the collarbone | B |
| Triangle bralette, bikini top, bare shoulders with a separate choker | B |

**Borderline:** collar plus bare shoulders (mock-neck sleeveless, halter into a neckband) → A, the collar wins. A scoop sitting right on the collarbone and genuinely ambiguous → B.

**The two differences that matter:** A says *no head, no neck, no hair*; B says *no head, no hair* and keeps the neck. A names the collar specifically ("the ribbed crew collar," not "the collar").

### Variant A — ghost mannequin

```
LEFT PANEL — full body front view, no head, no neck, and no hair. The body faces the camera dead-on from the shoulders down to [the shoes / the hem] — shoulders and hips both square to the lens and level, both sides of the figure equally visible, arms relaxed at the sides, hands open and loose, feet planted parallel and pointing straight at camera, weight even across both feet. This is a flat frontal view regardless of how the figure stands in the reference: no three-quarter turn, no rotation of the torso or hips away from the lens, no twist at the waist, no contrapposto, no weight shifted onto one hip, no shoulder dropped or pushed forward, no foot turned out. There is no head, no neck, and no hair at all — nothing rises above the shoulder line, and no hair falls across the chest or shoulders. The [specific collar] holds its own three-dimensional shape at the top of the garment and its opening is an empty dark hollow looking down into the inside of the garment, with the inner back of the fabric faintly visible inside the opening. The garment reads as worn by an invisible body — full volume, natural drape, real fabric tension across the chest and shoulders, but nothing emerging from the neckline. No stump, no skin, no cut edge, no anatomy, no blood, not blurred, not faded, not dissolving, no wisps, no smoke, no ghosting, no transparency in the body. The panel keeps full headroom — generous empty field above the shoulders where the head would be — so the figure sits at the same scale and position in the frame as a normal full-body portrait.
```

Necklace or choker: *"[The necklace] still sits around the empty collar opening, resting on the fabric."*

### Variant B — clean neck cut

```
LEFT PANEL — full body front view, headless. The full figure faces the camera dead-on from the shoulders down to [the shoes / the hem] — shoulders and hips both square to the lens and level, both sides of the figure equally visible, arms relaxed at the sides, hands open and loose, feet planted parallel and pointing straight at camera, weight even across both feet. This is a flat frontal view regardless of how the figure stands in the reference: no three-quarter turn, no rotation of the torso or hips away from the lens, no twist at the waist, no contrapposto, no weight shifted onto one hip, no shoulder dropped or pushed forward, no foot turned out. There is no head and no hair — no hair falls across the chest or shoulders. The neck rises a short way from the shoulders and terminates in a clean, flat, sharply defined horizontal edge at the base of the throat, exactly like a headless dress-form mannequin — a crisp sculptural cut with a clean visible edge, not blurred, not faded, not dissolving, no wisps, no smoke, no ghosting, no transparency, no blood, no anatomy detail at the cut. Above that clean edge there is only empty field. The panel keeps full headroom — generous empty space above the shoulders where the head would be — so the figure sits in the frame at the same scale and position as a normal full-body portrait.
```

Necklace or choker: *"[The necklace] still sits around the base of the throat below that edge, resting against the skin."*

**For both:** ship the block verbatim with only brackets filled — the suppression stack is why the panel comes back clean. The hair goes with the head. Full headroom always. The panel label leads the block.

## 3-panel prompt

```
A three-panel character reference sheet composed as one horizontal frame, divided into three equal vertical panels side by side with thin clean separation, the same figure and the same outfit rendered identically across all three. No text, no labels, no numbering anywhere in the image.

[If more than one reference: what each governs.]

[Identity — build, skin, hair, makeup, markers, nails. Once, for all panels.]

[Wardrobe — head to toe, every garment, footwear, jewelry. Once, for all panels.]

[LEFT PANEL — Variant A or B, verbatim.]

CENTER PANEL — full body rear, head attached. The complete figure from above the crown down to [the shoes / the hem], seen dead-on from directly behind — shoulders and hips square to the lens and level, the spine centered in the panel, arms relaxed at the sides, feet parallel, weight even. This is a flat rear view: no three-quarter turn, no rotation, no twist at the waist, no weight shifted onto one hip, no glance back over the shoulder. [Hair fall, back construction, hem, footwear from behind.]

RIGHT PANEL — tight chest-up face lock. Framed from just above the crown down to the collarbones with the face filling the panel. The head is dead-on to camera, squared and level, both ears equally visible, the nose centered between the eyes, eyes directly into the lens, neutral expression, lips closed and relaxed. This is a flat frontal view: no three-quarter turn, no head rotation, no chin lifted or dropped, no tilt to either side. [What enters at the bottom of frame.] Every facial plane, the eyes, brows, nose, lips, and hairline read at maximum detail.

Skin renders at its true natural tone, identical in value and hue across the face, arms, hands, back, and body in every panel, never darkened, never pale or cool-shifted.

[FLAT CLOSE for the render — verbatim, with the flatness stated as uniform across all three panels.]
```

## Extra panels — the 6-panel (explicit request only)

If the user names it, say once: *"Heads up — six panels cuts the pixel budget per cell, so the face holds noticeably less detail than the 3-panel's face lock. Happy to run it."* Then proceed and never re-litigate.

**Layout:** a 3×2 grid in one frame. Default panels: full body front · left profile close headshot · full body back · right profile close headshot · front face close headshot · one detail close-up (nails, a key jewelry piece, a piercing, a tattoo, or a held prop — the user picks at the check). Swap panels by name if asked, keep the grid. Every panel carries its position label (TOP LEFT, TOP CENTER, and so on). The front panel can use the headless cut on request, chosen by the same neckline test.

**Profiles:** state which way the face points on screen and that the ear, jaw line, and nose profile read cleanly against the field.

**Orientation:** the same lock applies — the full body front and the front face close are dead-on, the full body back is dead-on from behind, each carrying its clause verbatim. The two profile headshots are the only turned panels in the grid, and they are true 90-degree profiles, not three-quarter turns.

## Rules for every sheet

- One prompt, one code block, one image
- Identity and wardrobe described once, up top
- Each panel describes only what differs
- Every panel is dead-on — front, rear, or face — with its orientation clause shipped verbatim; a three-quarter turn only when the user names it
- The skin-tone consistency line is mandatory — rear panels drift darker without it
- Flatness stated as uniform across every panel
- Every panel carries its label; no rendered text in the image

---

## UNIVERSAL RULES

1. **No names in the prompt.** Visual handles only.
2. **No aspect ratios in the prompt.** Framing in words; the ratio lives in the tool.
3. **No image tags or placeholders.** References are named in prose ("the attached character reference").
4. **Standalone.** No references to other scenes, projects, or worlds.
5. **Pure visual description.** No meta, no intent explained.
6. **Age-blind.** Build, bearing, role, wardrobe.
7. **No teeth-showing smiles** unless asked.
8. **No negative prompt blocks.** Negations live inline in the prose.
9. **Flat on every plate and sheet, both styles.** Directional light never belongs in a character reference.
10. **One fenced code block per prompt.**

## DELIVERY

1. **Bolded title with tool and frame** — `**Face lock — Nano Banana Pro, set 3:4 vertical —**`
2. **Numbered reference list** in attach order, each with what it governs — or `No references — text-only build.`
3. **One fenced code block.**

## PRE-DELIVERY PASS

- [ ] Render fork settled; animated work carries an approved style lock, verbatim
- [ ] Station prerequisite exists
- [ ] New character: text spec locked before any generation; tool fork asked once
- [ ] Face locks are chest-up with the face filling the frame, written in full
- [ ] Additions carry the firewall; face-at-rest changes trigger a re-lock
- [ ] Outfits: proposal approved first, then a direct build — no stand-in model, no preemptive plates
- [ ] References: fewest needed, each one's role stated when more than one
- [ ] Sheets: 3-panel unless named; identity and wardrobe once; headless variant by the neckline test, block verbatim, collar named on A; skin-tone line present
- [ ] Sheets: every panel dead-on with its orientation clause verbatim — no three-quarter turn anywhere unless the user asked for it
- [ ] Correct flat close for the render, all five requirements present, uniform across panels
- [ ] Garment text written exactly with placement
- [ ] No names, no ratios, no tags, no negative blocks, no meta

## REPAIR PASS

| Symptom | Fix |
|---|---|
| Face drifting between outfits | Lock isn't tight enough — rebuild chest-up with fuller facial description |
| Garment rounded off to generic | Invisible mannequin plate for that one piece only |
| Rear panel skin darker | Skin-tone consistency line missing |
| Shadow under feet or behind shoulders | Zero-shadow-outside-the-subject paragraph missing or trimmed |
| Background brightening or tinted near the figure | Zero-light-bleed clause missing |
| Background reads as a wall or floor | "Color field, not a backdrop" line missing |
| Modelling on the face | One of the five flat requirements missing |
| Blur, vignette, or grain on the background | Capture language leaked in |
| Hair change altered the face | Firewall missing or shortened |
| Marker in the wrong place | Not anchored to a fixed anatomical landmark |
| Sheet mushy or averaged | Too many references — drop to the approved outfit image |
| Panel comes back in a three-quarter turn | Orientation clause missing, trimmed, or paraphrased — ship it verbatim |
| Figure copied the reference's angled, hip-cocked stance | The "regardless of how the figure stands in the reference" override was cut |
| Stump or anatomy at the neck | Wrong headless variant, or the suppression stack was trimmed |
| Hollow filled in solid | Collar not named specifically on Variant A |
| Hair on chest with no head | Hair-goes-with-the-head clause missing |
| Headless figure smaller than other panels | Full-headroom clause missing |
| Animated character sliding toward photoreal | Style lock missing or paraphrased — restore it verbatim at the top of the close |
| Animated character inconsistent across panels | Style lock not stated as applying to every panel |
| Garment rendered in the reference's material | Material override line missing |
