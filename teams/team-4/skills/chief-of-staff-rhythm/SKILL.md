---
name: chief-of-staff-rhythm
description: Run the daily brief, weekly review and monthly cleanup that keep a person's work moving.
---

# Chief of Staff Rhythm

The recurring routines that make a chief-of-staff bot useful after week one: a short daily brief, a weekly review, and a monthly cleanup. Each is small enough to do in one pass and produces one page.

## When to Use

- The person asks for a morning brief, a daily summary, or "what should I do today".
- A scheduled automation fires for the daily or weekly review.
- The person asks what is stuck, what is waiting on them, or what got done this week.
- A month has passed and the automations have not been checked.

## Daily Brief

One page, five blocks, under 200 words. Skip any block that is empty.

```
今天最重要的三件事   — 每件一行，写清为什么是它。
卡住的事             — 卡在哪、卡了多久、下一步找谁。
等你拍板的           — 只有本人能定的，给选项和代价。
今天到期             — 截止日期在今天或明天的。
一句话               — 今天最该先动的那一件。
```

Rules:

- Three items, not ten. If everything is urgent, pick by consequence and say the rest waits.
- "等你拍板" lists decisions with the trade-off, not just the question.
- Never pad with news the person already read; a brief that repeats yesterday is noise.

## Weekly Review

Run once a week, 15 minutes, one page:

1. **Done** — what actually shipped, with evidence (file, link, number), not what was attempted.
2. **Dropped** — what was planned last week and did not happen, and why. No silent deletion.
3. **Decisions** — anything settled this week, one line each with the reason. Append to `DECISIONS.md`.
4. **Next week** — at most three priorities, each with a definition of done.
5. **Memory** — move durable facts into `MEMORY.md` or a topic note; delete entries that expired.

## Monthly Cleanup

- List the active automations; check each one still has a purpose and a working trigger.
- Pause the ones whose goal is met; delete only the ones the person named.
- Prune memory: stale paths, finished projects, superseded preferences.
- Check the bots: any thread stuck for days, any repeated failure, any bot that no longer has a job.
- Report in five lines: what runs, what was paused, what was pruned, what needs a decision, what changed.

## Delegation Brief

Reuse this shape every time work leaves the bot:

```
目标：一句话说清要的结果，不是要的动作。
现状：背景、已有材料、文件绝对路径。
约束：不能碰的东西、必须遵守的格式或口径。
交付物：具体文件/表格/链接，放在哪里。
完成标准：怎么算做完，怎么算没做完。
期限：什么时候要。
```

If the brief cannot be written without guessing, ask the person one question first.

## Memory Hygiene

- One fact per line in `MEMORY.md`, written as a statement about the person or the work, never as an instruction to yourself.
- Anything longer than a couple of lines belongs in `memory/<topic>.md` with title, description and aliases at the top.
- A changed fact supersedes the old entry; do not keep both.
- Never store credentials, one-time codes, chat transcripts or other people's private details.
- Facts that expire within a week stay in the conversation.

## Verification

The brief fits one screen, every "done" item has evidence attached, and the weekly review ends with a decision list and no more than three priorities.
