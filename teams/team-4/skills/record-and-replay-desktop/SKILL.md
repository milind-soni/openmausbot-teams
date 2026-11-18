---
name: record-and-replay-desktop
description: Record a person's desktop actions, then replay them in order.
---

# Record and Replay Desktop Actions

Turns one manual pass through a desktop workflow into an action sequence (mouse clicks, keystrokes, target window) that can be replayed in the same order. It records the person's real input, not an app feature, and it does not understand the interface — replay drifts when the UI changes or windows move.

## When to Use

- A desktop app has no API and the same clicks and typing have to be repeated.
- The person wants to show the workflow once and have it repeated later.
- You need to check whether a GUI sequence can be automated at all.

## Procedure

1. **Locate the recorder** in the bot's tools folder (for example `<workspace>/tools/omb-macro`). It should contain the recorder source, a PowerShell entry script and a self-test. If the folder is missing, look for a copy under other task workspaces; if none exists, say the tool is gone rather than improvising one.
2. **Before recording, say three things**: recording starts now, press the stop hotkey when finished, and do not type passwords during the recording — every keystroke is captured.
3. **Record** to a timestamped file. Recording blocks until the stop hotkey is pressed or a stop file appears, so allow a generous timeout.
4. **Review the recording before replaying.** Print a description of the actions and check that no password or unrelated step was captured.
5. **Replay** at a modest speed. Replay brings the target window to the foreground and sends the recorded input, offsetting coordinates by the window position. The stop hotkey aborts immediately.
6. **Verify on screen after replay.** Take a screenshot or read the controls; "replayed N actions" is not proof the result is correct. For anything repeated long-term, convert the recording into steps that target controls instead of coordinates.

## Pitfalls

- **It captures passwords.** Recording is global: typing in another window is recorded too. Always review before replaying, and delete any recording that contains secrets.
- Very fast clicks, held-down keys, mouse wheel and IME candidate selection are not captured reliably.
- Replay matches windows by title; a changed title falls back to raw coordinates, which breaks across monitors or resolutions.
- Replay steals focus for a few seconds — do not run it while the person is typing elsewhere.
- Recording while another automation is typing merges both into one file.
- A self-test window must stay on top, otherwise clicks land on whichever app covers it.

## Verification

Run the recorder's self-test once: it should type into its own window and report the expected number of captured actions before you rely on a real recording.
