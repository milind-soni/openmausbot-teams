---
name: local-video-editing
description: Edit local recordings, tighten speech, source authentic B-roll, and deliver editable timelines, review MP4s, captions, and chapter notes.
compatibility: Requires local file access. FFmpeg and ffprobe are useful. Offline transcription can use an existing whisper.cpp installation and model.
---

# Local video editing

Use this workflow for video editing, review exports, captions, short clips, B-roll, or an assets-first handoff. Carry out the phase requested.

## Inspect and organize

1. Resolve the exact source paths and look for an existing transcript, approved footage, and brand assets. Inspect resolution, frame rate, audio streams, and duration. Record the source filename and timebase.
2. Write edits, exports, captions, and notes to a separate project folder. Keep originals read-only. Confirm that the destination and format fit the handoff.
3. For transcript-based edits, use a supplied transcript or run local transcription. Check names, numbers, and unclear phrases against the audio. Keep word timings when they are available. Use the original audio timebase until cuts are mapped.

## Build the cut

1. Start with the story and the moments the creator wants to keep. Cut excessive dead air, true duplicates, and confirmed false starts. Preserve breaths, emphasis, and natural gaps. Check joins around every speech cut. Ask about ambiguous content only if it changes meaning and cannot be resolved from the recording.
2. Write an edit list of retained source ranges and link it to the original media. Use the recipient's existing editor format when available. Record the exact export version and intended playback format.
3. Place B-roll and graphics on the words they explain. Begin with the creator's footage, real product captures, and verifiable public examples. Keep exact sources and attribution. Mark unsupported claims in the notes and use a neutral visual where useful.
4. Prefer the visible speaker, simple word reveals, and clean cutaways. A short side label can explain an idea. Reserve a full-frame visual for footage or proof that needs room. Protect the face, hands, and subtitle area, and check readability at phone size.
5. Follow the brief's order. An assets-first job ends with editable assets, a preview, and placement timings.

## Export and check

1. Render the agreed review format to a new file. Run local render jobs in the foreground and check their exit codes. Use ffprobe to confirm the output duration, picture, audio, and frame rate.
2. Inspect representative frames and listen at speech joins, transitions, and the end. Check sync, crop, privacy, caption legibility, and any claim that depends on the real picture. Recheck affected areas after a correction.
3. Retiming comes after the cut. Export requested SRT or VTT captions against the review video, and use that version's timestamps for chapters. Keep the transcript and captions aligned when edits move speech.
4. Share the review export, editable project or edit list, captions, and a short note on decisions. Call out material assumptions or checks the creator still needs to make.

A local editing request authorizes local work. Keep private recordings local. Confirm authorization for publishing, external uploads, or messages.
