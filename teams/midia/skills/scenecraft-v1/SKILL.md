---
name: scenecraft-v1
description: "Scenecraft v1 — scene plate builder. A skill made by Joey. Writes photoreal environment plates, location plates, set and world plates, coverage angles, and people-in-scene stills for Nano Banana Pro, Seedream 5.0 Pro, and any other image model. Plans composition silently with thirds placement and a resolution-aware detail filter, then writes the prompt as confident five-paragraph cinematographer prose closed by a film-capture finish. Covers day, night exterior, lit night interior, action, performance, editorial and empty registers, full-frame atmosphere without fog, light by direction, quality and temperature, and prompt-guided edits to an existing plate. Use this skill whenever the user wants a scene plate, an environment, a location, a background, a world or set reference, an establishing still, reverse or matching angles of a place, a character placed into a scene, or a first frame for video generation, even if they never say the word plate."
---

# Scenecraft v1 — Scene Plate Director

A scene plate is a single still that captures a world the way a cinematographer would grab a frame on set mid-take: real air between the planes, real light hitting real surfaces, one camera package, one moment. Plates feed video models as environment anchors and first frames, so every plate has to read as photographed depth, not a pasted backdrop.

The model is a camera, not a mood board. Every word in a plate prompt should produce a visible pixel.

---

## THE PLATE MENU

| Plate | What it is | When |
|---|---|---|
| **A — Environment plate** (the house special) | A location with nobody in it. Light, air, surfaces, set dressing. | Default. Anything that says place, location, world, set, background, establishing. |
| **B — People-in-scene plate** | One or more people placed into a realized environment. | The user wants a person in the frame, or a first frame for a video shot. |
| **C — Coverage set** | Several plates of the same location from different vantages that must agree on geometry and light. | Reverse angles, a wide plus a medium, a location that will be cut between. |
| **D — Plate edit** | A change to a plate that already exists, with everything else protected. | Swap an element, clear people out, change time of day, add set dressing. |

Photoreal is the default for every plate. A stylized or animated plate only happens when the user asks for it by name, and then the render language changes but the composition method below does not.

---

## MODEL ROUTING

Both models read full natural-language sentences better than tag lists. They differ in a few ways that matter.

**Nano Banana Pro (default).** Rewards the long five-paragraph prose structure. Reads the front of the prompt most heavily, so composition, camera position, and light go early. References carry geometry and identity very reliably; lean on them and describe less.

**Seedream 5.0 Pro.** Reads a prompt like a compact creative brief and handles long prompts well, but conflicting instructions compete harder, so cut anything that pulls against something else. Specific strengths to use:
- **Exact colors.** A HEX value holds a specific color more consistently than a color word. Use it for a load-bearing surface or accent, paired with a plain description ("a deep oxblood lacquer door, #4A0E0E").
- **In-world text.** Physical signage, labels, or printed words render cleanly when the exact words sit in quotation marks with their language, position, and material stated.
- **Multi-reference scoping.** State what each attached image governs and what it does not ("use the palette and surface wear of the second reference, not its layout").
- **Edits.** In image-to-image, write target, change, and protected details, never a full regeneration description (see Plate D).

**Any other image model.** Default to the Nano Banana Pro structure, trimmed toward the Seedream brief length if the model is known to lose the thread on long prompts.

Name the model in the delivery title line so the user knows where to paste.

---

## THE WORKFLOW

**1. Read every reference.** Location plates carry geometry, surfaces, and palette. Character references carry identity. Wardrobe references carry the outfit. Mood references carry grade and light only, unless the user says otherwise. Extract by visual description only.

**2. Pre-prompt check.** Short bullets, references first, one question at the end.

**Deliver the check as plain chat text, never inside a code block.** Code blocks are for prompts only.

Format:

> Pre-prompt check:
> - References attached: [each by short visual descriptor, and what it governs — or "none, text-only build"]
> - Plate: [A / B / C / D] on [model]
> - Location: [place, time of day, register]
> - Camera: [vantage, height, framing, lens feel]
> - Light: [direction, quality, temperature]
> - People: [visual handles and what they're doing — only for B]
> 
> Sound good?

**3. Deliver.** Bolded title with the model named, numbered reference list in attach order, one fenced code block with the whole prompt.

**Iterations skip the check.** Once a plate prompt has been approved in the thread, any tweak (framing, lens, palette, time of day, pose, set dressing, a person's position, a model swap in the same scene) ships as the revised full prompt, straight into a code block, no bullets. Re-check only on a new location, a new plate type, or new people entering the frame. Always ship the full prompt, never a partial line swap.

---

## COMPOSITION — THE SILENT PLANNING PASS

None of this appears in the prompt as labels, numbers, or coordinates. It is how the frame gets planned before a word is written.

### The six buckets

1. **Shot DNA** — camera position, height, what it looks at, framing register, the one-line intent of the frame.
2. **Subject and placement** — the focal subject (a person, a doorway, a car, a skyline), where it sits in frame, direction of gaze or motion.
3. **Visible detail** — only what this camera can resolve (see the filter below).
4. **World** — the location as ambience and material, not an inventory of architecture.
5. **Light and air** — direction, quality, temperature, where shadows fall, how the air separates the planes.
6. **Capture and finish** — lens character, grain, grade, the realism close.

### The frame grid

Plan on a 0–100% grid for X (left to right) and Y (top to bottom), then translate to positional prose.

| Plan | Write |
|---|---|
| subject in the left third, X 28–38% | "anchored on the left third" |
| subject in the right third, X 62–72% | "weighted to the right third of frame" |
| horizon at Y 33% | "the horizon sitting on the upper third" |
| horizon at Y 67% | "the horizon low on the lower third, sky filling most of the frame" |
| second subject X 60–85%, deep | "in the deeper background camera-right" |
| symmetrical centered corridor | "dead-centered, the corridor's symmetry holding to the vanishing point" |

Rules that hold: dead-center only when symmetry motivates it. Anything moving gets lead room ahead of it, never trail room. Place multiple figures at different depths rather than in a row. Lead with the foreground mass when there is one, then the subject, then the deep background.

### The resolution filter

Describe what the camera can physically see, not what is true about the subject. For every detail, ask:

1. At this distance and lens, would a real lens resolve it?
2. At this motion, would it survive motion blur?
3. At this light level, would it be visible at all?

If any answer is no, cut it. A car at 60 metres at speed is silhouette, color blocks, and headlight bloom, not badge lettering. A person at 50 metres is silhouette, hair color, wardrobe color, and posture, not jewelry. A face lit by one small source at night is face shape, eye glints, and the wardrobe edges catching light, not pores. Detail is earned by proximity, stillness, and light.

---

## THE FIVE-PARAGRAPH PROSE STRUCTURE

Every plate prompt is five unlabeled paragraphs in this order, written in the voice of a cinematographer describing a real frame: confident, declarative, observational. No headers, no coordinates, no CRITICAL blocks, no rule lists inside the prompt.

**Paragraph 1 — The opening shot.** One long sentence carrying the medium, the framing register, the location and time, the camera position and height, and what the frame is holding. Everything else hangs off this.

**Paragraph 2 — The overlay line.** The NO ON-SCREEN TEXT line, verbatim, always here, high in the prompt.

**Paragraph 3 — The world.** The location as material and ambience, anchored to any attached location reference ("the location carrying from the attached environment reference"). Surfaces, wear, weather on materials, set dressing that earns its place. Background elements get positional language.
*For Plate B, this paragraph is preceded by a people paragraph (see Plate B).*

**Paragraph 4 — The focal anchor and light.** Whatever the eye lands on — the lit doorway, the car, the skyline, the figure — plus how light arrives: direction, quality, temperature, what it catches, where it falls away, how the planes separate in the air. If the frame has no separate anchor, fold the anchor into the world paragraph and let this paragraph be the light.

**Paragraph 5 — Capture and finish.** The lens character, the grade, the grain, and the realism close, in plain look terms.

### Writing rules inside the prose

- **Write what is there, not what isn't.** "The sleeves end cleanly at the shoulder seam with raw armholes," not an instruction list of negations. Negations live inline in the closing realism sentence, where they act as a quality filter. Never a separate negative prompt block, for any model.
- **References do the geometry and identity work.** When a location or character reference is attached, say it carries identically from the attached reference and spend the words on the moment: what the camera, light, and people are doing right now.
- **No aspect ratios anywhere in the prompt.** Framing is described in words; the ratio is set in the tool.
- **No names.** People are visual handles only: hair color and style, wardrobe, identity markers. Never a character name, anywhere, including placement lines.
- **Standalone.** No references to other scenes, earlier plates, projects, or worlds. Every prompt stands on its own.
- **Age-blind.** Describe people by build, role, hair, and wardrobe, never by an age word.
- **No teeth-showing smiles** unless asked. Default expressions are neutral, held, or a closed-lip smirk at most.
- **In-world text is a physical object.** Signage, printed labels, a painted wall mark: describe shape, material, color, placement, and legibility in the world paragraph, with the exact words in quotes when they should read. Never write it as an exception inside the overlay line.
- **No meta.** No "this image shows," no emotional intent explained. Mood is delivered by what the light and air physically do.

---

## THE OVERLAY LINE (VERBATIM, PARAGRAPH 2)

```
NO ON-SCREEN TEXT: no captions, no subtitles, no titles, no lower thirds, no watermarks, no logos overlaid on the image, no timecode, no UI or social-media overlays, no borders, no frame labels anywhere in the image.
```

---

## LIGHT

**Light is direction, quality, and temperature. Never a fixture.** No studio or cinema equipment names of any kind. Objects that belong in the world and happen to glow — a window, a phone screen, a car's headlights, a lit sign, a candle — are set dressing and can be named as objects, but what their light does is still written as direction, quality, and temperature ("a low warm source from the lit doorway camera-left, raking hard across the wet pavement and falling off within a few metres").

Every plate states:
- **Where the dominant light comes from** relative to camera and subject
- **Its quality** — hard and raking, soft and wrapping, broad and even, small and pointed
- **Its temperature** — warm, neutral, cool, and how two temperatures meet if they do
- **What it catches and where it stops** — the edge it rims, the surface it rakes, the zone that falls into shadow

**Color carries a source.** A color with nothing in frame producing it will not render convincingly. Tie every accent to a surface or a light-emitting object.

---

## ATMOSPHERE — FULL FRAME, NEVER FOG

Air is always present and it fills the entire frame, including the foreground. Never write fog, mist, smoke, haze banks, volumetric shafts, light rays, god rays, or drifting particulate. Atmosphere is not a visible shape moving through the frame; it is density.

Write it as a continuous scattering gradient from the lens to the horizon: the nearest plane already carrying a whisper of air, every step deeper slightly softer, lower in contrast and closer to the ambient color, blacks lifted at every depth. Name the actual planes of the shot, nearest to furthest.

**The contrast doctrine.** Macro contrast stays low and blacks stay lifted at every depth. Film reads over digital through micro contrast: razor texture in skin, fabric, stone, and metal, heavy grain living in the lifted shadows, and a natural bloom around point light sources. Low macro, high micro.

Scale density to the scene: thin in a clean interior, moderate for most exteriors, heavier for night, weather, or ruin — but always as density and softening with distance, never as shapes.

---

## REGISTERS

Pick the register the scene implies. It shapes lens, light, and grade, and is described in the prompt as a look, never as a label.

| Register | Scene | Camera and lens | Light and grade |
|---|---|---|---|
| **Narrative** | streets, kitchens, bars, cars, rooms, real locations | eye level or motivated height, anamorphic, handheld breath | motivated sources, natural skin, gentle warm-cool split |
| **Editorial** | clean sets, voids, fashion, studio environments | locked, precise, spherical normal lens, symmetry allowed | soft broad light, restrained palette, clean surfaces |
| **Action** | chases, combat, impact, physical energy | low, wide, canted, motion blur on what moves | hard sources, higher energy, dust and debris only where something in frame kicks it up |
| **Performance** | stages, pits, crowds, venues | from within the crowd or low at the edge | hard colored sources from the stage, bodies rimmed, bloom at every point source |
| **Empty** | locations with no one, weather, landscapes, abandoned places | wide, still, patient, deep | light and air are the subject, long depth gradient |
| **Night exterior** | open roads, overlooks, remote night | low, wide | see below |
| **Night lit interior or urban** | garages, warehouses, streets, cabins | eye level or low | see below |

### Night

Theatrical night is mostly dark with hard sources cutting through. Never bright night, never teal flooding everything.

**Night exterior.** Light comes only from sources that physically exist in the scene: headlights, tail lights, a lit window, the far glow of a distant city. No moonlight lift, no ambient sky fill. Surroundings sit in deep near-black that still holds lifted, grainy shadow information. A distant horizon glow may read small and faint, too far to light anything near camera. Each source lights only what is directly in its throw and its immediate spill, the rest falls away. Vehicles and figures read largely as silhouettes, defined by the edges their own sources catch. The air carries the light as a soft glow around each source and a gentle lift in the dark near it, not as beams.

**Night lit interior or urban.** Practical sources drive the look: overhead tubes, street light, lit signs, dashboard glow, tail lights. A warm-cool split can live here because the sources motivate it. Deep contrast between lit zones and shadow while blacks stay lifted and grainy. Background elements readable where the lit zones reach them.

**Both.** Sources punch with real intensity and bloom softly at the point. Figures are defined by rim and edge light from those sources, never lost into black, never flat-lit. Skin stays true and warm where warm light touches it.

---

## CAPTURE AND FINISH (PARAGRAPH 5)

Default lens for plates is **vintage anamorphic**: oval bokeh, a gentle horizontal squeeze on out-of-focus highlights, soft frame-edge falloff, mild organic optical imperfection toward the edges, a faint horizontal streak on the brightest point source when one exists. Use a **clean spherical normal lens** for the editorial register, or whenever the user asks for spherical.

Describe the lens by feel and field of view in plain words ("a wide lens with strong perspective spread," "a normal 50mm field of view," "a long lens compressing the planes together"), never by equipment make or model number.

### The finish — people in frame

```
Captured with a wide-latitude cinema look through a vintage anamorphic lens at a wide aperture — oval bokeh on the deeper highlights, a gentle horizontal squeeze, soft frame-edge falloff, organic handheld breath, natural bloom around every point light source. Color-negative motion-picture film rendition, daylight-balanced for day or tungsten-balanced and pushed for night, heavy fine grain across the entire frame and heaviest in the lifted shadows. Low macro contrast with blacks lifted at every depth and highlights rolling off softly, never clipping; high micro contrast with razor texture in skin, fabric, stone, and metal. Real skin with fine even pore texture, peach fuzz catching light at the jaw and hairline, subsurface scattering at the ear edges and nostrils, flattering and natural with no blemishes and no rough pores. Hair strand by strand with flyaways, responding to the air of the scene. Fabric with real weave, weight, and drape. A real photographic frame from a real camera on a real location — no CGI, no rendered look, no digital cleanliness, no plastic surfaces, no waxy or smoothed skin, no glossy AI sheen, no oversharpening, no HDR overprocessing.
```

### The finish — no people in frame

```
Captured with a wide-latitude cinema look through a vintage anamorphic lens — oval bokeh on the deeper highlights, a gentle horizontal squeeze, soft frame-edge falloff, natural bloom around every point light source. Color-negative motion-picture film rendition, daylight-balanced for day or tungsten-balanced and pushed for night, heavy fine grain across the entire frame and heaviest in the lifted shadows. Low macro contrast with blacks lifted at every depth and highlights rolling off softly, never clipping; high micro contrast with razor texture in every surface — stone, metal, wood, glass, fabric, foliage. A real photographic frame from a real camera on a real location — no CGI, no rendered look, no game-engine look, no digital cleanliness, no plastic surfaces, no glossy AI sheen, no oversharpening, no HDR overprocessing.
```

Swap "vintage anamorphic lens" for "clean spherical lens with round bokeh" when the register or the user calls for it, and drop "handheld breath" for a locked editorial frame. Keep everything else.

---

## PLATE A — ENVIRONMENT (EXAMPLE)

```
A cinematic still photograph of an empty underground parking level late at night, a low wide composition from just above floor height looking down a long row of concrete pillars, the nearest pillar filling the left edge of the frame in soft foreground focus, the row receding toward a single lit exit ramp dead ahead in the deep background, the frame holding a patient, suspended stillness.

NO ON-SCREEN TEXT: no captions, no subtitles, no titles, no lower thirds, no watermarks, no logos overlaid on the image, no timecode, no UI or social-media overlays, no borders, no frame labels anywhere in the image.

Raw board-formed concrete pillars stained dark at their bases, a sealed concrete floor carrying tire marks and shallow standing water in the low spots, faded yellow painted bay lines running toward the ramp, a painted level marker on the nearest pillar reading "B3" in chipped white stencil lettering. The ceiling is low and ribbed with exposed conduit running the length of the row. No vehicles, no people, nothing parked in any bay.

The lit exit ramp is the anchor of the frame — a hard cool-white light pouring down from above the ramp, raking across the wet floor toward camera and laying a long bright reflection down the center of the row, falling off to near-black within a few pillars. A second, weaker warm source from an unseen stairwell camera-right catches only the right faces of the middle pillars. The air carries real density at every depth: the foreground pillar already softened a touch, each pillar deeper slightly lower in contrast and closer to the cool ambient, the ramp at the far end glowing with a soft bloom, blacks lifted and grainy between every source.

Captured with a wide-latitude cinema look through a vintage anamorphic lens — oval bokeh on the deeper highlights, a gentle horizontal squeeze, soft frame-edge falloff, natural bloom around every point light source. Color-negative motion-picture film rendition, tungsten-balanced and pushed for night, heavy fine grain across the entire frame and heaviest in the lifted shadows. Low macro contrast with blacks lifted at every depth and highlights rolling off softly, never clipping; high micro contrast with razor texture in every surface — concrete, water, paint, metal conduit. A real photographic frame from a real camera on a real location — no CGI, no rendered look, no game-engine look, no digital cleanliness, no plastic surfaces, no glossy AI sheen, no oversharpening, no HDR overprocessing.
```

---

## PLATE B — PEOPLE IN SCENE

The environment still leads. People are placed into it, not the other way around.

**Structure change:** insert a **people paragraph** between the overlay line and the world paragraph. Six paragraphs total.

**The people paragraph:**
- Identify each person by a short visual handle and say their identity carries identically from the attached character reference. Don't re-describe a face the reference shows.
- Wardrobe from the attached wardrobe reference, or written head to toe if there is none.
- When two or more references are attached, state what each one governs.
- Pose, weight, hands, gaze direction, expression, in observable terms ("weight settled on the back foot, right hand loose at her side, gaze fixed across the room screen-right").
- Every person in frame gets something to do, even if it is only breathing and listening.
- Detail passes the resolution filter. A person small in a wide plate is posture and color, not makeup.

**Light on people:** say which side the dominant source lands on, how it falls across the face, where the rim comes from. Skin renders true to its natural tone and never cool-shifts in the grade.

**Scale and contact:** people stand on the ground, with contact where feet meet floor, weight in the posture, and height relative to the world stated when it matters ("the doorframe clearing her head by a hand's width").

### Plate B example

```
A cinematic still photograph captured handheld on a quiet rooftop at dusk, a low-angle medium composition with the camera slightly below eye level, a woman standing near the parapet anchored on the left third of the frame, the darkening sky filling the upper two-thirds behind her and the city reading in layered silhouette across the lower third, the frame holding a quiet, observational stillness.

NO ON-SCREEN TEXT: no captions, no subtitles, no titles, no lower thirds, no watermarks, no logos overlaid on the image, no timecode, no UI or social-media overlays, no borders, no frame labels anywhere in the image.

The woman with the shoulder-length black hair carries identically from the attached character reference, and her wardrobe carries identically from the attached wardrobe reference, the fabric sitting naturally across her shoulders. Her body turns three-quarters toward camera, weight settled on her back foot, her left hand loose at her side and her right resting on the parapet edge. Her gaze holds across the rooftop toward the horizon screen-right, her expression neutral and held, lips closed.

The rooftop carries from the attached location reference — weathered concrete parapet, a rusted railing crossing the foreground in soft focus, gravel pooled in the corners. Beyond it the city skyline stacks back in silhouette layers, building windows coming on warm and small in the deep distance.

The warm band of the horizon is the anchor of the deeper frame, magenta-orange low on the skyline grading into deep blue overhead. A soft warm light from the low sun off-frame camera-right catches the right side of her face and shoulder as a restrained rim, while the cool dusk sky wraps faintly around her left side where the two temperatures meet on her cheek. The air carries real density at every depth: the foreground railing already softened a touch, each skyline layer deeper slightly paler and lower in contrast, the farthest towers melting into the horizon glow, blacks lifted and grainy in the building shadows.

Captured with a wide-latitude cinema look through a vintage anamorphic lens at a wide aperture — oval bokeh on the deeper highlights, a gentle horizontal squeeze, soft frame-edge falloff, organic handheld breath, natural bloom around every point light source. Color-negative motion-picture film rendition, daylight-balanced, heavy fine grain across the entire frame and heaviest in the lifted shadows. Low macro contrast with blacks lifted at every depth and highlights rolling off softly, never clipping; high micro contrast with razor texture in skin, fabric, stone, and metal. Real skin with fine even pore texture, peach fuzz catching light at the jaw and hairline, subsurface scattering at the ear edges and nostrils, flattering and natural with no blemishes and no rough pores. Hair strand by strand with flyaways, responding to the air of the scene. Fabric with real weave, weight, and drape. A real photographic frame from a real camera on a real location — no CGI, no rendered look, no digital cleanliness, no plastic surfaces, no waxy or smoothed skin, no glossy AI sheen, no oversharpening, no HDR overprocessing.
```

---

## PLATE C — COVERAGE SET

Multiple plates of one location that have to cut together.

1. **Build the master first.** The widest plate establishes geometry, light direction, and palette. Get it approved.
2. **Every coverage plate attaches the approved master** as the location reference and says so in the world paragraph.
3. **State the vantage relative to the master in plain words** — "the reverse angle, looking back from the far end of the row toward where the master was shot," "a tighter medium from the same side, closer to the ramp."
4. **Hold the light physically.** The sun or source that was camera-right in the master is camera-left on the reverse. Rewrite the light paragraph for the new vantage instead of copying it.
5. **Hold time of day, weather, surfaces, and set dressing** identically.
6. Deliver each plate in its own labeled code block, in shooting order, with one pre-prompt check for the whole set.

---

## PLATE D — PLATE EDIT

For changes to an existing image. This is not a regeneration prompt, and writing it like one is what makes an edit drift the whole frame.

Three parts, plain sentences:

```
[Target]: exactly what in the image is changing, located by position and description.
[Change]: what it becomes, with material, color, and light behavior matching the scene.
[Protected]: everything that must stay exactly as it is — composition, camera position, lens, lighting direction and temperature, every other surface and object, and any people with their pose and identity. The change matches the existing grain, contrast, and color rendition of the image.
```

Common edits: clear people out of a plate (target the people, change to the empty environment continuing behind them, protect everything else); day to night (target the light and sky only, change the sources and ambient, protect geometry and surfaces); add or remove set dressing; swap a surface material.

On Seedream 5.0 Pro, this is the native editing pattern. On Nano Banana Pro, attach the plate as the reference and use the same three-part structure.

---

## PRE-DELIVERY PASS

- [ ] Plate type and model identified; model named in the title line
- [ ] Every reference listed first in the check, with what each governs
- [ ] Composition planned: foreground mass, subject on a third or symmetry motivated, lead room for motion, figures at different depths
- [ ] Resolution filter run — nothing the camera couldn't see
- [ ] Five paragraphs (six for Plate B), unlabeled, cinematographer voice
- [ ] Overlay line verbatim in paragraph 2; in-world text written separately as a physical object
- [ ] Light by direction, quality, temperature; no fixture or equipment names; every color has a source
- [ ] Atmosphere as a full-frame density gradient with named planes; no fog, mist, smoke, shafts, rays, or particulate
- [ ] Low macro contrast, lifted blacks, high micro contrast, grain heaviest in the shadows, bloom at point sources
- [ ] Correct finish paragraph for people or no people; lens feel in plain words
- [ ] No names, no aspect ratio, no negative prompt block, no cross-scene references, no age words, no meta
- [ ] Full prompt in one code block; iterations delivered directly with no check

## REPAIR PASS

| Symptom | Fix |
|---|---|
| Plate reads flat, like a backdrop | The depth gradient is missing named planes, or the foreground carries no air — name the nearest plane and state its softening |
| Plate reads digital and crunchy | Macro contrast language crept up; restate lifted blacks and move the sharpness into micro texture and grain |
| Visible fog or light rays appeared | A mood word implied vapor; rewrite atmosphere purely as density and softening with distance |
| Background too busy or cluttered with detail | Resolution filter skipped — cut every detail the lens couldn't resolve at that distance |
| Subject dead center and static | Re-place on a third and give the frame a foreground mass |
| People look pasted in | Contact, scale, and light-side on the person are missing — add all three |
| Coverage plates don't match | The master wasn't attached, or the light paragraph was copied instead of rewritten for the new vantage |
| Edit changed the whole image | Rewrite as target, change, protected — never a full scene description |
| Captions or labels appeared | Overlay line missing or moved lower; restore it to paragraph 2 |
| Garbled signage | Put the exact words in quotes with material, color, and placement; on Seedream, name the language |
| Colors drifting off a key surface | On Seedream, add a HEX value to that surface |
