---
name: agui-run-card-lifecycle
description: Feishu AG-UI run cards that continue in place.
---

# AG-UI Run Card Lifecycle

Builds and debugs Feishu AG-UI run cards where one message carries every round of a run: continuation, per-round progress, button states, folded history, terminal state. Does NOT cover generic Feishu card styling or the bridge's transport layer.

## When to Use

- "结果为什么回写到第一张卡 / 多出一张卡"
- "点了按钮应该原地更新，不要新建 AG-UI 消息"
- "已经完成了，进度为什么不是 100%"
- "步骤数没有跟着按钮变"
- "卡片一直处理中 / 卡在 0%"
- "把卡片这轮的修复也同步到项目里，并用本地 runtime 实测适配"

## Procedure

1. **Classify "卡住 / 停在 0% / 处理中" from timestamps before editing anything.** Three cases with three different fixes: (a) genuinely stuck — no new event and no live process; (b) long single stage with no decomposed steps — events are advancing, but the card cannot render unknown progress so it freezes at 0% and reads as a stall; (c) render/denominator defect — the run finished while the card still shows under 100% or `—`. Answer with the timeline of the run first; a timeline settles "is it stuck" faster than any code change.
2. **One message per run thread.** Every continuation click rewrites the SAME message id. A new round is a new *round* on the old card, never a new card.
3. **Resolve the target id from the click event payload**, not from the original run event's `reply_id`. When the bridge creates a second card while the agent keeps writing to the first card's id, results land in the first card and the second one sits in 处理中 until the watchdog kills it — that split is the root cause, not the timeout.
4. **Preserve completed rounds.** On continuation, collapse the finished round into a fold block labelled `第 N 轮 · <title> · <time> 完成` and keep the newest round's conclusion expanded. Prior content is folded, never deleted.
5. **Reset the progress base on continuation and seed step 1 with the click itself** (e.g. `已接下：<button label>`). The steps cell must never degrade to `—` while a round is active — it must show `0/1` at the instant of the click.
6. **Compute progress per round from that round's own steps.** Denominator = the round's known steps; at close, steps marked 跳过 count toward completeness. Never count only `done`, or a finished round stalls at 4/7 = 57%.
7. **Cap a running round at 99%; render 100% only when the round status is 已完成.** Compute the denominator as the max of known steps so progress cannot go backwards within a round (a 2/2 100% → 2/3 67% drop is a defect).
8. **A round with an empty `plan` array but status 已完成 shows 100% and `— 步骤`**, not 0%. While that same round is still running with no steps yet, the cell must show the live stage and elapsed time (e.g. `正在下载源文件 66MB · 已用 28 分钟`) instead of a static 0% with `—` — an undivided first stage that renders as nothing is indistinguishable from a hang.
9. **Button states on a terminal card:** completed cards lose their executing-period buttons; on click the button enters a pressed/loading state within ~100ms; a form that is empty must not dispatch fabricated content to the agent.
10. **Card writes go through the local lane client queue (write-behind)**, not a synchronous network write per update — measured 1075ms → 59ms per write. Always flush at terminal state so the final render is guaranteed.
11. **Verify by reading the card back**, not by the write returning ok: exactly one message id, prior round folded with its own step count, current round at 100% with 完成, no `—` cell, no second card.
12. **Land a card fix in three places before calling it done:** the running copy, the project repo, and the docs/version that describe the behaviour. Diff the runtime file against the repo file line by line — the only remaining differences should be packaging/import/font paths — commit the same fix to the repo, then exercise the installed runtime through each face it exposes (skill discovery, CLI call, MCP) and re-run the project's own check suite. A version number or doc that still declares "终态不可逆" contradicts in-place continuation and has to be rewritten in the same round.

## Pitfalls

- Two ids for one run (bridge creates card 2, agent writes to card 1's `reply_id`) is the usual cause of "结果进了上一张卡" — fix the id resolution, don't lengthen the watchdog.
- Watchdog timeouts and "卡在处理中" are symptoms; check whether a second card exists before touching timing.
- Do not touch the watchdog, the timeout values or the poll interval on a "0% / 处理中" report until the log shows the run actually stopped; a healthy run inside one long stage is fixed by rendering the stage, not by loosening timers.
- Progress must never be the fraction of *listed* steps; that jumps 100% on the first step and falls back when the next arrives.
- `跳过` steps are part of the round's tally at close-out; excluding them leaves a completed run under 100%.
- Don't add a new card to show a new round, and don't clear the old card's content to make room.
- Fixing only the running copy means the next reinstall silently reverts the behaviour; the repo is the source, the runtime is a copy.
- A README, version string or doc that still documents the old terminal behaviour undoes a correct code fix for every future reader — rewrite it in the same commit.
- The project's own green check suite says nothing about the installed artifact; the real faces (skill discovery / CLI / MCP) have to be driven against the installed version.

## Verification

Run the interaction matrix (34 checks: click-through, fold, step count, progress monotonicity, terminal state, write latency) and re-read the card payload afterwards; a green matrix plus a card at 100% with the previous round folded is the only pass, and a run with no decomposed steps must show a moving stage/elapsed line rather than a frozen 0%. After a sync, the runtime file and the repo file differ only in packaging paths, the project check suite is green, every exposed face (skill / CLI / MCP) has been called on the installed version, and the declared version plus docs describe the new behaviour.