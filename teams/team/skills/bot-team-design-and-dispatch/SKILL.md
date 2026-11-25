---
name: bot-team-design-and-dispatch
description: Design sub-bots and edit the assistant's own role profile.
---

# Designing Sub-Bots and the Assistant's Role

Turns "make me a bot that does X" or "this is how I want you to work" into a working sub-bot or an updated main-assistant profile: a fixed one-page spec, the creation call, and a dispatch brief that needs no follow-up questions. It also covers editing the person's own SOUL/role form and answering where to find existing templates. It does not grant permissions the platform withholds, and it never applies a role change without showing the proposed text first.

## When to Use

- '可不可以做同款机器人', '帮我建一个机器人', '我想要一个每天帮我 XX 的 bot'.
- '你是我的主要对话窗口，事都找你，再由你转派', '完善一下你的设定 / SOUL', or a screenshot of the profile form.
- '哪里有机器人模板', '有没有现成的模板可以搬', or a request to import one.
- '你帮我打开，我没看到' after a navigation answer, or a template link they cannot find in the app.
- '还没好吗', '做到哪一步了' about a job already delegated to a sub-bot.
- Deciding whether a request should be handled directly, delegated to a sub-bot, or brought back to the person.

## Procedure

1. If the person pasted a bot template link, read the page first (`web_fetch`; if the browser tool cannot open it, retry `web_fetch` and then `curl -sL --max-time 20 -A "<desktop UA>" "<url>"`) and extract what the template actually does and how it is triggered. Then say what can be replicated and what needs their own local install or login.
2. When asked where templates live, give the in-app path first, using the labels actually shown in the person's UI language and the full navigation: in a Chinese UI 设置 → 这台电脑 → 导入与导出 → 导入内容 → 从 Grok Bot 迁移 (English: Settings → This computer → Import & export → Bring things in → Move from Grok Bot). Then the public Grok template directories found by search (a large hosted template site plus an awesome-list style index). Say plainly which ones you opened and which you only saw in search results. State that the import needs a bot file exported from Grok Bot, not a share link. Note that a template is only a stored instruction set, so a one-sentence request plus a spec reaches the same result with more control. If the app's own team-template library fails to load, describe the two working routes instead of announcing that the feature is broken. When they reply that they cannot find it, stop describing and open it for them: `list_windows`, then `get_window_state` (with a `query` per label), `click` on the element token, and report the exact breadcrumb and labels now visible on their screen.
3. State the permission model before promising anything: only the main (chief) assistant holds the create-bot tool. A designer/planner bot gets no create tool, so its job is spec plus handoff, and the chief performs creation. Frame this as a permission grant difference, not as a missing capability.
4. For a bot request whose scope is not settled, ask the five definition questions in one round, never one per turn: the single thing it does, who uses it and how often, which data/tools it may touch, what it must never do, and one concrete example of a good result.
5. If the request already names one clear job, skip the interview and build directly: choose the obvious defaults yourself, then list every default you picked (scope, thresholds, schedule, read-only or not) so the person can correct them in one reply.
6. Emit the fixed spec: name, one-sentence responsibility, tone, three must-do actions, three forbidden actions, required tools, three acceptance examples, and the stop condition (when it hands back instead of guessing).
7. For a recurring monitor, design the gate and the output shape before the checks: an early exit that answers one line when there is nothing to report (for example, one line as long as every local drive still has 20 GB free), and the detailed report only when the gate trips. Tier the findings — safe to delete now, confirm before deleting, never touch — and keep the bot read-only: it produces a list, it never deletes.
8. Create it with `mcp__agents__create_bot` passing `name`, `role`, and `instructions`; put the entire spec into `instructions` and include the rule that it must never claim to have created something only the chief can create.
9. After creating, offer one immediate run. When the person agrees, dispatch it with `mcp__agents__coordinate_bots` passing `bot_ids` and a `done_when` that spells out the exact sections and numbers the report must contain, so acceptance is checkable without a second round.
10. When the person nudges a job that is already delegated ('还没好吗'), check `mcp__agents__assignment_status` with the assignment id and report honestly what is still running and roughly how long. Do not start a second copy of the same scan yourself; the duplicate wastes the turn and gets abandoned.
11. Delegate with a complete brief, never a one-liner: goal, constraints, deliverable, acceptance criteria, and the evidence to return. Check the result against those criteria before passing it on; send it back for rework instead of forwarding a maybe.
12. For a change to the main assistant's own role, read the screenshot of the form field first: `read_image` the attachment; if it cannot be read, copy it into the task workspace and OCR it locally (the PowerShell `BitmapDecoder` + `OcrEngine` recipe in `windows-popup-diagnosis`). Quote the field's current value back before editing.
13. Rebuild the profile from the person's own sentence: keep their wording as the core, add only rules that close a real failure mode (verify before reporting; state who did what and what failed), use plain sentences rather than numbered edicts, then submit with `mcp__agents__propose_profile` using `description`, `reason`, and `soul`.
14. Show the full proposed text back, name each rule added beyond their words and why, and state that the change is reversible and how to revert it. If they say the result feels off, redo the whole text in plainer language instead of patching the tone.
15. Save the confirmed role split, bot roster and delegation boundaries with `mcp__agents__memory_update` so the next conversation starts from the same structure.

## Pitfalls

- Do not answer a template request with "cannot" when the difference is a permission grant; explain the split (designer speculates, chief creates) and the actual impact on the person.
- Do not let a designer bot imply it created the bot; its output must end with a handoff line for the chief.
- Do not interview one question at a time; a single batched round is what makes the designer feel fast.
- Do not ask the designer bot or the person for more detail when the request already settles the job; build directly and list the defaults afterwards.
- Do not replace the person's phrasing with boilerplate; keep their sentence and add the minimum.
- Do not give a navigation path in English product names when the person's app is localized: read the labels on their screen and use those, include every intermediate step such as the '这台电脑 / This computer' level, and when they say they cannot find it, open the page for them rather than repeating the path.
- Do not call a template share link importable; the import flow consumes a bot file exported from Grok Bot.
- Write the SOUL in the person's own plain speech, not as a rulebook: numbered 'iron laws', a 'when to contact me' section and command-voice headings read like regulations and get rejected as feeling strange. Keep their opening sentence, add two rules as ordinary sentences, explain each addition in chat, and offer a rewrite rather than defending the first draft.
- Do not pile rules into a SOUL proposal; two additions explained are better than ten unexplained. The usual two worth adding are acceptance before reporting and truthfulness about who did what.
- Do not apply a role change silently or hide the revert path; the proposal must be shown in full first.
- Do not treat a sub-bot's "done" as verification; check against the acceptance examples.
- Do not duplicate a delegated job locally while it is still running; status first, then wait for its result.
- Do not build a monitor bot that reports every run in full or that deletes anything; gate on a threshold, tier the findings, keep it read-only.
- Do not present unverified template directories as checked; separate what you opened from what search returned.
- When the person asks whether to give details to you or to a specialist bot, answer with a one-line split — domain details to the specialist, decisions and acceptance to the chief — and offer to relay the specialist's questions in one batch.
- Ask the person only for money or account actions, actions only they can perform (login, payment, signature), and directional choices (whether to do it, which option). Decide the rest and state the choice in one line.
- Answer conclusion first: one-sentence conclusion, then the evidence, then at most one next step.

## Verification

The created bot's `instructions` contain the full spec and, for a monitor bot, its gate and three-tier output, and its first run returns either the single all-clear line or the tiered report; a profile change shows the complete proposed text with the added rules and revert path before it applies; a navigation answer uses the labels visible in the person's UI language, or the page was opened for them and the on-screen breadcrumb quoted back; when a delegated job was nudged, its status was checked instead of a duplicate scan being started; and the roster and boundaries are in memory.
