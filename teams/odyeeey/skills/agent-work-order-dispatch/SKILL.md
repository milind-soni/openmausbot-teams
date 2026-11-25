---
name: agent-work-order-dispatch
description: Dispatch work orders to a multi-agent dev team.
---

# Work Order Dispatch

Writes and routes work orders for a multi-agent dev team through a fixed spec-freeze → implement → visual sign-off → functional QA → release chain, with evidence required at every gate. Does NOT decide the technical solution or perform the acceptance itself.

## When to Use

- "按需求派单" / "派下去" / "发施工单"
- "写返工单 / 复验单 / 收口单"
- "让 <角色> 做 X，写清五件事"
- "按全量方案直接落地，别管排期"
- "全面叫停 / 冻结这一版" — a halt order is a dispatch of its own kind
- "其他的优化项都完成了吗" / "都完成了吗" / "还剩几项没做"
- a release or deployment request that has to go through the team chain
- "团队只剩我一个了，这个任务怎么派"

## Procedure

1. **Read the board before dispatching:** `list_bots`, `list_rooms`, `list_room_targets`, `assignment_status`, `list_threads`. If the work is already assigned, do not send a second order — and if you already sent one, withdraw yours and tell the executor which 口径 governs.
2. **Every order carries five fields, in this order:** 改哪个模块 (module/paths) · 要达成什么 (observable outcome) · 改动范围 (what may and may not change — e.g. 0 行, no commit, no push) · 截止时间 (with timezone) · 验收方式 (the check that decides pass). An order missing one comes back as a question instead of work. The deadline field governs the executor's own sequencing; it is not a promise you repeat back to the person.
3. **Route by role function, not seniority:** requirements and 口径 → design spec freeze (tokens/icons/motion/IP) → implementation → visual and interaction sign-off → functional and regression QA → release. The visual sign-off gates release: no frontend release without it. A visual veto blocks design sign-off and release, never the functional verdict.
4. **Put the evidence bar in the order:** measured values (computed geometry, hashes, exit codes, counts) and file:line for every defect. Self-reported "自测通过" without raw output is not acceptance — say so in the order, not after it fails.
5. **Repeat the standing engineering rules when they apply:** a schema change ships with migration and rollback scripts; a cross-tenant query carries the tenant condition; an unrun test is not a pass; confirm the rollback path before releasing.
6. **A scope correction from the person outranks the current plan.** When they widen a premise (a small page list is only the visible part), re-derive the real surface from the source tree, re-scope the order, and cap the do-now tier rather than forwarding the ask unchanged.
7. **Suspend the in-flight order before re-scoping an overturned premise.** When the person rejects the premise of work already running (wrong asset, wrong page set, wrong direction), tell the implementer to stop first, then re-issue in the same round to every role that has to move: spec owner re-freezes the baseline, tech lead re-states the technical 口径, QA builds the objective check, implementer rolls back or parks whatever depended on the old premise. Reason the wrong premise through once, own it in the order, and never keep building while the new baseline is argued.
8. **Name the source artifact and the comparison in the order.** For asset or visual work, cite the single source-of-truth file and pin it by hash and size, forbid re-drawing or "improving" it, and make 验收方式 an objective comparison against a saved reference. A spec owner approving an implementation that matches their own spec does not close an item whose shape was never checked against the brand's own file.
9. **Keep CI off the critical path of a local-deployment acceptance.** Local deploy + page smoke + a working rollback is the release criterion unless the person says otherwise; a build server nobody asked for must not gate the chain. When CI is asked for, add the gate as its own stage with a positive and a negative reading from a local dry run before pushing it.
10. **Close the loop yourself:** read the delivered commit hash and the acceptance output back. A dispatch is done when the evidence is in hand, not when the order is sent. Any completion number quoted from an earlier report expires the moment a new order lands — re-read the branch HEADs and the newest acceptance files before repeating it. If that re-read contradicts a completion you already stated, open the next report by withdrawing the sentence in one line and restating the verdict; an uncorrected earlier claim keeps propagating as fact.
11. **Every module needs an acceptance report from a role other than the one that built it.** A module delivered and signed off by its own implementer counts as pending, however green its own checks look; say so in the same sentence as the progress number instead of folding it into the done column.
12. **A merged chain is its own gate.** Green per branch is not a pass: a linear chain of feature branches that never met has an unknown conflict surface, so make the integration build a separate order (merge in order, one build, one smoke) and never report the chain as integrated before that build has run.
13. **When the person rejects the schedule framing, switch to full-scope parallel execution.** If they say they don't care about time and want the whole plan landed, drop 排期 / 预计 / 几周 / 里程碑时间 from every report and dispatch every open gap in one round — one order per role, each with its own `done_when` and evidence bar — instead of sequencing work by a calendar. Then report only two states: 已交付 with the evidence, or 卡在哪一项 with the blocker. The gap list comes from the plan document and the acceptance matrix, not from your estimate of what fits in a period.
14. **Split the remaining work into code and non-code before calling anything landed.** Permission and plan seeds, migrations applied to the target schema, a real-login authz path and service health are orders of their own, each routed to the role that owns it. "代码完成" without that split reads as shipped and then has to be walked back; state it as 代码完成 + N 项非代码阻塞, with the measured reading for each, and surface the decisions only the person can make (authorize writing seeds into the target DB, which plan enables the feature).
15. **A halt is its own order type: stop-only, and the seal stays with you.** When the person cancels a product line, send one stop order to every role that could still act — implementers, QA, release, design — bounded exactly: stop all work on that line (no code, no commit, no push, no tag, no branch change, no release, no new acceptance, no new plan document); finish the step already running and open nothing after it; leave branches, worktrees and files exactly as they are; touch no live port and no database. Forbid the roles from tagging or sealing anything and say the freeze is yours. Ask for three lines back: where it stopped / the object sha of the last action / whether the worktree is clean. Confirm nothing is still running (`assignment_status`, rooms, background processes) before the first tag.
16. **An order that changes a gate's object re-registers the gate.** When the dist or the HEAD a gate was written against changes, the order must say the old object constant is now stale and require the gate owner to re-pin it in the same round; leaving a hard-coded sha in a test turns the whole gate red for the wrong reason.
17. **When the roster is empty, the same order goes to a different lane.** In single-operator mode (no bots left) route each order to `delegate_task` subagents, a Claude Code / Codex dispatch lane, or yourself, keeping the identical five fields and evidence bar. The role chain still applies — the spec freeze, the independent acceptance and the visual gate just land on different executors — so an order is never dropped or downgraded to "I'll do it later" because there is no teammate left to receive it.
18. **"都完成了吗" is answered with a per-item ledger, never a yes.** Walk the list the person is actually asking about (the audit's own item numbers, the plan's orders) and give every item exactly one disposition with its evidence: 已完成 (commit + the check that passed) · 未做 (the concrete reason it cannot be done now) · 主动降级 (the measured benefit against the change surface that made it not worth doing) · 说重了已更正 (the earlier claim, withdrawn in one line). Items that can only be proven by a live send or a restart are held into one cutover batch instead of being shipped half-verified. Close with the blockers that are not yours to clear and ask for the single authorization that releases the batch, with its cost ("开窗口", ~90 秒).

## Pitfalls

- Two leads dispatching the same deployment splits the port/endpoint 口径; check the board first, then name the one that governs.
- Re-sending an order the system already marked complete gets bounced — re-issue it as a 返工单 naming the single unmet item and its file:line.
- A subordinate's report is not evidence: re-run the check or read the file before repeating a claim upward.
- Dressing a dispatch as praise or context wastes the executor's turn; the order is a work instruction, and the reasoning goes in the fields, not in thanks.
- A gate owner who cannot read screenshots cannot hold a visual gate — check the reviewer's modality when routing.
- Every gate can be green and the delivery still wrong when no order names the person's actual reference: carry the reference artifact into the order and the comparison into 验收方式, then re-open the spec owner's ruling instead of patching the implementation.
- Re-scoping without suspending the in-flight order leaves the implementer polishing work that is about to be thrown away; suspend first, then re-issue the whole round.
- "Each branch passes" is the most common false-done signal: branching work that is never merged has no integration evidence, and conflicts surface only in the merge, so treat the merge as a deliverable in its own right.
- Batch several `coordinate_bots` calls inside one `tool_call` and they all fail — send one dispatch per call and read each result before sending the next, so one rejected recipient cannot take the rest of the round with it.
- A bot with a turn still running refuses a new order; queue it as a follow-on ("this ticket first, then take this") or hold it for the next round instead of interrupting the live task or re-sending the same call until it stops failing.
- An ETA in a status report reads as a commitment: once the person says they don't track time, every remaining mention of weeks, remaining-person-days or a finish date undoes the correction.
- A green build, a pushed branch and a passing test count do not make a product openable — permission seeds, migrations on the target schema and a real-login path are the usual missing three, and none of them appears in a test report.
- Declaring a plan "fully landed" without walking the plan document's own item list (a blocker-level order still marked unavailable) buys a retraction within the hour; keep that list as the checklist behind every progress number.
- An item that quietly disappears from the ledger reads as done: a downgrade you decided on cost/benefit is a decision the person may disagree with, so state it as 主动降级 with the numbers instead of letting it drop.
- A halt order that also asks for cleanup destroys the evidence the freeze is built on; stop-only means stop-only, and sealing stays with one owner.
- A halt without the "finish the step in flight, then stop" clause comes back as a mid-command abort with an unreadable state.
- A test gate with a hard-coded artifact sha is a gate that fails on the next legitimate build; when the object changes, re-pinning the constant is part of that round's work.
- Checking the roster only after addressing a bot is wasted work in single-operator mode; the first step of every dispatch is `list_bots`, and an empty roster changes the lane, not the order.

## Verification

Every dispatched order shows all five fields, the board holds exactly one open order per item with a named executor and deadline, and each closed item carries the measured acceptance output plus the commit hash it applies to; any order that touched a brand or visual asset also carries the frozen source hash and its comparison result, no item is counted as accepted without an independent acceptance report and, for a branched chain, a completed integration build, the report back to the person separates 代码完成 from non-code blockers with their measured readings and contains no timeline claims, any completion claim that a later re-read contradicts has been explicitly withdrawn, a "都完成了吗" answer carries one disposition per item (including the downgraded and the withdrawn ones) and names the single authorization still needed, after a halt every role has reported its stop line while each repo still sits at the HEAD and dirty state it had when the order landed, and in single-operator mode each order names the lane (`delegate_task` / Claude Code / Codex / self) that actually received it.
