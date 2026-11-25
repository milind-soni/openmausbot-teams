---
name: design-video
description: "Plan, make or repair an assigned short book teaser, promo or social video, including shot continuity, voice, editing and final viewing checks. Use the existing creative brief and budget; posting requires its own authorization."
---

## Scope and current authority

Work only on the assigned video, using its approved source, creative direction and budget. Check actual tool availability and current quotes; examples and prices below are dated. Preserve the existing art/voice methods and acceptance rules. Never use Runway under this method.

# Make a release or promo video
Owner: GLOBAL-DESIGN. Written 2026-11-15 by DESIGN-SOPS for GLOBAL-CLAUDE, merged with GLOBAL-DESIGN's draft from the NNF free-week job (Kevin to GLOBAL-DESIGN: "Work with global to create and SOP for you"). Last checked 2026-11-15.

Start to finish for a short book video: a release teaser, a promo, a social clip. Same file for Claude and Codex. Tools: [Design tools](../design-tools/SKILL.md). Parallax steps: [Use Parallax](../use-parallax/SKILL.md). Voice: the elevenlabs-voice skill. This SOP doesn't repeat them.

Standing rules: spending, sign-ins and posting are Kevin's. Quote before every paid make. No deletes. No helpers without Kevin's yes. Never Runway. No em dashes in any on-screen text.

## 1. Read the brief
1. Get from Kevin: which book, which platforms, how long, the date, and a budget if he'll set one.
2. Read his brief in full. Write each shot's must-haves in one line and check them against his words before making anything. (Two misreads on NNF Clip 1 came from skipping this.)
3. Story facts (names, looks, props, scenes): look them up before asking Kevin. TFB: the Bible (`0-TFB/bible/START-HERE.md`, then the index, then the owning page) and the manuscript; search the manuscript for a quoted line to find the scene. Other books: their approved sources (DESIGN.md, Sources). If the Bible and the brief disagree on a prop or fact, the Bible wins; say so in one line.
4. On-screen words come from approved copy (blurb, tagline, free-day dates) and get checked word for word.
5. Write down the book's promo rules. TFB promo: no fangs, gore, bats or romance looks; cut away before any bite; no text made inside the video.

## 2. Plan the shots (the step that was missing)
NNF's five-shot remake looked good shot by shot but was "all over the place" (Kevin), because each shot was made alone. So:
1. **One-shot clip:** a start frame and one prompt is fine.
2. **More than one shot:** write a shot list first. For each shot: action, framing, screen direction, start state, end state, sound, length, words on screen.
3. **Fix screen direction** for the whole scene (she always moves left to right, the truck stays on the right). Keep people on the same side across cuts.
4. **Chain shots:** the last frame of one shot is the start frame of the next. Grab it with:
```text
ffmpeg -sseof -0.1 -i SHOT03.mp4 -frames:v 1 -update 1 SHOT03-last.png
```
5. **Big moves:** give the model a start frame and an end frame (Kling and Veo both take one), so the shot lands where the next one begins.
6. **Continuous action:** fewer, longer takes (Kling up to 15 s, Seedance up to 30 s, Wan 2 to 30 s).
7. A fast move must really happen in the footage, not only in a blur cut.
8. Shape: 9:16 (1080x1920) for TikTok, Reels and Shorts; 1:1 or 16:9 only when asked.
9. Add up the rough cost (step 4 table) and give Kevin the total, in credits and dollars, before making anything.

## 3. Obtain the start frames
1. Reuse an approved cover or still when it meets the shot. For new book-promo imagery, use [create-book-art](../create-book-art/SKILL.md); personalized storybook/Etsy artwork uses [art-making](../art-making/SKILL.md) and its linked art check. Those methods own still creation, tool selection and image inspection.
2. Supply the shot's required action, framing, dimensions, start/end state, protected scene facts, approved identity/style references and output path. Include the accepted scene frame when continuity across shots requires it; identify what each reference must preserve. An unresolved character look follows the art method's approval route before animation.
3. Receive the checked still and its exact source/reference information. Check its fit with the planned sequence: screen direction, composition, character/prop state and space for separately added text. Animate only after this video-specific acceptance; reuse the art maker's completed image checks.

## 4. Animate in Parallax
**Prompt pattern, in this order** (up to 2,500 characters; most good ones are 60 to 120 words):
1. Camera: "Static camera, no cuts, same framing," or one slow move.
2. Place and light: "Night, heavy rain, orange streetlight."
3. One action, start to finish. Describe people by look, not names.
4. Mood and pace: "slow, quiet, realistic."
5. What must not change: "Continue this exact shot," "keep her face exactly the same as the first frame," "she stays strapped down."
6. Sound: "Sound: rain on glass, footsteps, no music, no speech," or turn model sound off when we'll lay our own.
7. What to leave out: "No text, no captions, no gore."

**Which model** (prices seen on the NNF job, 720p):
| Need | Model | Notes |
|---|---|---|
| A main character's face, acting, action | Kling 3.0 Standard | Veo refused face close-ups twice. 5 s with sound 17.7 credits; 3 s silent 7.1 |
| Cheap wides, objects, sound beds | Veo 3.1 Lite | 4 s with sound 5.6; silent 3.4. Filters words like "dead man" and "puncture" |
| Better look on a wide | Veo 3.1 Fast | About twice the Lite price |
| One long take | Seedance 2.5 | Up to 30 s; not tried yet |
| Talking to camera with lip sync | HeyGen Avatar IV | Takes a voice track |
| Music cue | Lyria 3 Clip | About 1.2 credits |

**What we learned:**
- Blood, wounds and puncture marks get filtered: the job fails or comes back empty. Imply instead ("he goes still").
- A start frame can be refused for content. Fix the frame, not the words.
- Spoken lines inside a video model often get filtered. Put voice in with ElevenLabs (step 5).
- Hard action: make two takes. One gurney take had her sit up through a chest strap.
- Kling gives 716x1284 and Veo 720x1280; step 6 makes them match.
- GLOBAL-DESIGN saw refused or failed jobs refunded, and "model busy" not charged: wait and retry.
- The Free plan runs 4 jobs at once.

Always `get_model` for the controls, then `quote`. Record each take's prompt, model, settings and cost in the job's DECISIONS.md.

## 5. Voice and music
- **Voice:** Kevin makes the lines in ElevenLabs from our directions (the elevenlabs-voice skill: text with audio tags, voice, model, settings, file name). Copy his file into the job's `audio/` folder; keep his original.
- **Music, if any:** Lyria 3 Clip. Prompt genre, mood, instruments, tempo, "instrumental." Example: "Dark ambient cue, low strings and slow piano, 70 bpm, tense and quiet, instrumental, 30 seconds." Quote first.

## 6. Cut and put it together
**Easy way:** Clipchamp, when Kevin wants to drive or tweak by hand. Export 1080p.

**Exact way:** ffmpeg (on PATH). Every command here was tested 2026-11-15. Work in the job's `build/` folder. For long filters, save them in a file and run `-/filter_complex FILE.txt`.
1. **Make every clip match** (size, frame rate, sound). One per clip, numbered in order:
```text
ffmpeg -i CLIP.mp4 -vf "scale=1080:1920:force_original_aspect_ratio=increase,crop=1080:1920,fps=30,setsar=1,format=yuv420p" -c:v libx264 -crf 12 -c:a aac -b:a 192k -ar 48000 -ac 2 n01.mp4
```
   A clip with no sound needs a silent track (set `-t` to the clip's length; `-t` is safer than `-shortest`):
```text
ffmpeg -i CLIP.mp4 -f lavfi -i anullsrc=r=48000:cl=stereo -map 0:v -map 1:a -vf "scale=1080:1920:force_original_aspect_ratio=increase,crop=1080:1920,fps=30,setsar=1,format=yuv420p" -c:v libx264 -crf 12 -c:a aac -b:a 192k -t 4 n02.mp4
```
   Trim: put `-ss START -to END` (seconds) after the input name.
2. **Title and end cards:** make each card as a 1080x1920 PNG in Inkscape or GIMP (never text made by the video model), then turn it into a clip with fades:
```text
ffmpeg -loop 1 -t 3 -framerate 30 -i CARD.png -f lavfi -i anullsrc=r=48000:cl=stereo -map 0:v -map 1:a -vf "format=yuv420p,fade=t=in:d=0.5,fade=t=out:st=2.5:d=0.5" -c:v libx264 -crf 12 -c:a aac -b:a 192k -ar 48000 -ac 2 -t 3 c00.mp4
```
   Match the assigned book's current approved cover/brand reference. Use the exact approved title-card and end-card copy for this job, including its current promotion dates; obtain those from the project brief and approved sources in step 1.
3. **Speed:** `-filter_complex "[0:v]setpts=0.5*PTS[v];[0:a]atempo=2.0[a]" -map "[v]" -map "[a]"` plays twice as fast. A rush works best as a speed ramp with motion blur and a whoosh, on footage where the move is really in frame.
4. **Join:** make `list.txt` with one line per clip, `file 'c00.mp4'`, in order, then:
```text
ffmpeg -f concat -safe 0 -i list.txt -c copy master.mp4
```
5. **Voice over the top**, locked to the picture. Find where speech starts and ends with `ffmpeg -i LINE.mp3 -af silencedetect=n=-40dB:d=0.3 -f null -`, then place it (2000 = start in milliseconds; `normalize=0` keeps the clip sound from going quiet):
```text
ffmpeg -i master.mp4 -i LINE.mp3 -filter_complex "[1:a]adelay=2000|2000[v];[0:a][v]amix=inputs=2:duration=first:normalize=0[a]" -map 0:v -map "[a]" -c:v copy -c:a aac -b:a 192k master-voice.mp4
```
   When the picture moves, move the voice by the same amount.
6. **Final export for posting:**
```text
ffmpeg -i master-voice.mp4 -c:v libx264 -crf 20 -preset slow -profile:v high -pix_fmt yuv420p -af loudnorm=I=-14:TP=-1.5:LRA=11 -c:a aac -b:a 192k -ar 48000 -movflags +faststart FINAL.mp4
```
   `loudnorm` sets the volume social apps expect (GLOBAL-DESIGN used -15; either is fine). `+faststart` makes it start quickly online.

## 7. Check it before Kevin sees it
1. **Frame strips** of every shot and the full cut, saved in `qa/`:
```text
ffmpeg -i FINAL.mp4 -vf "fps=2,scale=216:-1,tile=10x1" -frames:v 1 qa/FINAL-strip.png
```
   Look for: a face or clothes that change, impossible actions, wrong side of screen, garbled text, brand marks.
2. **Watch and listen to the whole thing** at full size. Each voice line ends where it must. Sound in sync, nothing cut off. A near-silent cut is a fail: check `ffmpeg -i FINAL.mp4 -af volumedetect -f null -`. If a fade looks off, check brightness per frame with `signalstats` (YAVG).
3. **Words:** every word spelled right against approved copy, no em dashes.
4. **Facts:** `ffprobe -v error -show_entries stream=codec_name,width,height,r_frame_rate,sample_rate -show_entries format=duration -of compact FINAL.mp4`.
5. **Compression quality (VMAF):** free, BSD+Patent licence, built into our ffmpeg as `libvmaf`. Scores 0 to 100 how close the export looks to the master. Export first, master second:
```text
ffmpeg -i FINAL.mp4 -i master-voice.mp4 -lavfi "[0:v]setpts=PTS-STARTPTS[d];[1:v]setpts=PTS-STARTPTS[r];[d][r]libvmaf=log_path=qa/vmaf.json:log_fmt=json" -f null -
```
   Aim for 93 or more (my rule of thumb, not an official line). Lower: drop the `-crf` number and export again. VMAF only checks compression, not whether the video is good.
6. **Size:** files over 30 MB don't reach Kevin's phone. Export smaller (crf 21) or tell him.
7. Call it APPEALING or CORNY and say why (DESIGN.md, How to work). Write down what you checked and what you couldn't.

## 8. Spend and limits
- Quote before any spend and wait for Kevin's yes, in credits and dollars (GLOBAL-DESIGN's figure: about 4 US cents a credit on Treg; not checked by DESIGN-SOPS).
- Parallax's daily cap is `TREG_DAILY_BUDGET_USD` in its `.env.local`. Hitting it shows "Generation is paused for today." Kevin changes it, then Parallax restarts.
- Never open `.env.local` in a chat or show any key.
- Other roles spend from the same balance. Note any drop you can't explain.

## 9. Name, save and accept
- **Where:** TFB books (NNF, HDIG, ECHOES, KALLA) work in `TFB-DESIGN/working/social/<job>/<clip>/` under TFB-DESIGN's own SOP. Other books work in `<Series code>-DESIGN/working/<Book code>/<job-id>/` (DESIGN.md). Kevin's named folder wins.
- **Inside the job folder:** `frames/`, `clips/` (takes copied out of Parallax), `audio/`, `build/`, `qa/`, and the finals.
- **Names** start with the book code: `NNF-TEASER-SHOT03-v2.mp4` for a take, `NNF-TEASER-9x16-v01.mp4` for a final. Never overwrite; raise the number.
- **Acceptance** is Kevin's, in his words. Then copy the exact final, unchanged, to its accepted folder (TFB: `TFB-DESIGN/accepted/short-films/<ID>/`), record its SHA-256, and register it (TFB: `SOCIAL-ASSET-CATALOG.md`). Creative acceptance and public-use state are separate.
- **Log** every decision, asset ID and spend in the job's DECISIONS.md.
- **Posting** is Kevin's, or the social role he names.
