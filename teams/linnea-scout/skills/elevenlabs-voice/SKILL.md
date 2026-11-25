---
name: elevenlabs-voice
description: Make voice audio in ElevenLabs for any job (release videos, storybooks, apps, audiobooks). Covers writing lines with audio tags for expression, picking the model and settings, finding or designing character voices (free in ElevenReader), generating through the ElevenLabs connector or website, file naming, and credit cost. Use whenever a chat needs spoken lines or a new voice.
---

# ElevenLabs voice

Credits are spending. Estimate the requested lines and takes against the actual job's approved budget and account-action scope. Reuse authorization already given for that work; resolve an uncovered spend or larger scope before generation. Act in his ElevenLabs account only as far as the job permits. Facts checked against the ElevenLabs docs on 2026-11-15; anything marked (unconfirmed) is not in the current docs. Links and the checked list: [references/sources.md](references/sources.md).

## 1. Pick the model

| Model (API id) | Use it for | Tags |
|---|---|---|
| Eleven v4 (`eleven_v4`) | Default. Character lines, audiobooks, storybooks, video voiceover. Most expressive. Up to 10,000 characters per request. | Yes |
| Eleven v4 Turbo (`eleven_v4_turbo`) | Live or in-app speech where speed matters (about 100 ms). | Yes |
| Eleven v3 (`eleven_v3`) | Older expressive model. Try it when v4 gets a voice wrong; the docs say designed voices may perform better on earlier models. 5,000 characters. | Yes |
| Multilingual v2, Flash v2.5 | Plain steady narration, or cheap and fast (Flash is half price per character on the API). | No (unconfirmed for current versions) |

## 2. Settings that matter

Eleven v4 has only two sliders:
- **Stability.** Lower gives more varied, expressive delivery and follows tags more closely. Higher is steadier and flatter. Default 0.5.
- **Similarity.** Higher stays closer to the original voice but can sound less natural.
- **Clone Strength** shows only for Professional Voice Clones. The docs say start at 0%.
- v4 has no Style or Speed slider and no SSML. Pace comes from the text itself (section 3).

Starting points (mine, not the docs): acted character lines, Stability about 0.3 to 0.4. Narration and audiobooks, about 0.5 to 0.6. If a take hallucinates, mumbles or drifts, raise Stability. If it sounds flat and ignores tags, lower it.
Eleven v3 shows Stability as three presets instead: Creative (most expressive, can go off script), Natural (balanced), Robust (steady, least responsive to tags). Use Creative or Natural for tagged lines. (From the earlier v3 guide; not on the current page.)

## 3. Write the line with expression

Audio tags are short directions in square brackets. They are not read aloud. v4 takes free text, so any plain direction can work, but these are the ones the docs show:
- **Emotion:** `[happy]` `[sad]` `[angry]` `[annoyed]` `[excited]` `[curious]` `[sarcastic]` `[thoughtful]` `[surprised]` `[appalled]` `[mischievously]` `[dismissive]`
- **Delivery:** `[whispers]` `[whispering]` `[shouting]` `[under his breath]` `[measured]` `[casual]` `[gradually building energy]`
- **Non-verbal sounds:** `[laughs]` `[chuckles]` `[soft chuckle]` `[giggle]` `[sighs]` `[exhales]` `[exhales sharply]` `[inhales deeply]` `[clears throat]` `[gulps]` `[swallows]` `[crying]` `[snorts]`
- **Pauses:** `[short pause]` `[long pause]`, or a mixed one like `[pause, dry amusement]`
- **Special (test first):** `[strong X accent]`, `[sings]`, sound effects such as `[applause]`. Keep sound effects out of voice lines.

Plain directions like `[quietly]` or `[softly]` are not on the docs' lists (unconfirmed), but v4 follows free text. Test them.

**Placing tags**
- Put the tag right before the words it colors. Put a reaction tag (a laugh, a sigh) right after the words that cause it.
- One clear cue per clause. Two tags on one line is plenty for a short line.
- Make the words carry the feeling too. A tag fights the text if the words say the opposite.
- For lip-sync (HeyGen and the like), keep long laughs and sighs at the start or end of a line so the mouth has words to match (my advice, unconfirmed).

**Punctuation and pace**
- Ellipses (...) add a pause and weight.
- CAPITALS add stress to one word. Use it once, not on whole sentences.
- Commas and full stops set the rhythm. Short sentences land harder.
- Question and exclamation marks change the pitch. No SSML `<break>` tags; they do not work.

**What breaks it or overdoes it**
- Too many tags. The line turns into a performance of tags. Cut back to one per clause.
- A tag the voice can't do. A calm, serious voice may ignore `[giggles]` or do it badly. Match tags to the voice.
- A tag read as a sound effect instead of a direction. Describe the voice instead, for example `[low, gravelly voice]`.
- Stage directions written without brackets get spoken aloud.
- Each take comes out different. Make two or three takes of an important line and pick one.
- In the website, the Enhance button adds tags for you without changing the words. Useful as a first pass; check it did not overdo it.

## 4. Choose or make the voice

- **Kevin's voices first.** Check [references/voices.md](references/voices.md) for character voices already chosen, with their voice IDs. Add a row there when a new one is picked.
- **ElevenReader (free).** Kevin designs new character voices in the ElevenReader app at no cost, and they appear in his ElevenLabs account under My Voices. For a new character, suggest this first and give him a short voice description to type in.
- **Voice Design in ElevenLabs.** In the website, Voices, then create a voice by description. Describe age, gender, accent, tone, pace, personality and recording quality in plain words, for example: "Woman in her late 20s, soft Southern US accent, warm but guarded, slow and careful, close and intimate, clean studio sound." It returns a few previews; save the best to My Voices. It costs credits (amount unconfirmed). The docs say designed voices may be less performative on v4, so test them on v3 too.

## 5. Make the file

**Through the connector.** Kevin's standing yes lets a chat turn the ElevenLabs connector on when the job needs it and off when done. In Claude its tools only appear on the turn after it is turned on. List its tools then and use its text to speech and voice tools (the connector's exact tool names are unconfirmed; check each time). Note where it puts the audio and move it into the job folder.

**Through the website.** Kevin generates there when needed. Hand him one ready block per line:
```
Voice: <name> (<voice id>)   Model: Eleven v4   Stability: 0.35   Similarity: default
Text:  [exhales] I told you... [quietly] it was never about the money.
Save as: NNF-PENELOPE-L02-v1.mp3  in  <job folder>/audio/
```
In the website: Text to Speech, pick the voice and model, set the sliders, paste the text exactly, generate, download.

**Naming and saving.** Save in the job's own folder, in an `audio` subfolder. Name files `<JOB>-<CHARACTER>-<line id>-v<take>.mp3`, for example `NNF-PENELOPE-L02-v2.mp3`. Never overwrite an earlier take; raise the take number. Keep a short note beside the files with the exact tagged text, voice, model and settings of the chosen take.

**Cost.** ElevenLabs charges credits by the characters you send, tags included. Count the characters, times the number of takes, and say that number before generating. Exact credits per character for v4 are unconfirmed; check the account's usage page or the connector's balance tool. Use the actual estimated cost, takes and remaining approved budget to decide whether the job is covered. Character or file-count examples are planning aids, not additional permission gates.

## 6. Worked example

Plain:
```
I kept every letter you sent. I just never opened them.
```
Tagged for Eleven v4, Stability about 0.35:
```
[quietly] I kept every letter you sent. [short pause] I just... never opened them. [exhales]
```
Why it works: one quiet cue sets the mood, the pause and ellipsis give the confession its weight, and the breath lands after the words so it reads as a reaction. Too much would be `[sad] [crying] [whispers] I kept EVERY LETTER...`, which fights itself and sounds staged.
