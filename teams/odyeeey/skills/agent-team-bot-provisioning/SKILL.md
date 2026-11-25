---
name: agent-team-bot-provisioning
description: Create, update and decommission OpenMaus team bots.
---

# Agent Team Bot Provisioning

Creates and reconfigures bots (roles, cwd, model, description) and the rooms they work in through the team MCP tools, and leaves durable team memory behind. Also covers dismantling the whole roster and folding its functions into your own skills. Does NOT design the role's standards content — that belongs to the domain skill.

## When to Use

- "新增一个 <角色>" / "把某个角色加进研发组"
- "改这个 bot 的职责 / 模型 / 工作目录"
- "改配置被系统挡住了"
- "attach 这个文件给 bot 失败"
- "房间成员里没有 <角色> / 把设计负责人加进群"
- "改房间公告一直被拒"
- "把所有 agent 全部清除 / 团队收编 / 以后只留你一个"
- "删掉这个 bot"

## Procedure

1. **Read the roster first:** `list_team_setup` then `list_bots` to get current ids, groups and fields. Never create blind.
2. **Write the role's working files before the bot.** Put the standard/reference docs in the bot's target `cwd` so the bot starts with its material in place, not a promise of material.
3. **Create with `propose_team_setup`** using an `operations` array of `create` with `fields` (name, title, cwd, model, description). State the role's scope in one sentence: what it owns, what it explicitly does not do.
4. **One risky update per call.** Split a multi-bot batch so a blocked update (a bot with running work) cannot take down the other operations with it.
5. **On "Stop @<bot>'s work before changing its setup":** check `list_threads` and `list_rooms`. Idle threads do not mean idle bot — the running item can be a room task. Do not stop another bot's running task on your own initiative; ask the user. Meanwhile land the standard as a file plus team memory and enforce it through the reviewer role, then retry the profile update when the bot goes idle.
6. **Record the decision with `propose_team_memory`:** what changed, why, the bot id, and any trade-off deferred (e.g. "profile update pending until the run finishes").
7. **`attach_file` needs a path inside the task workspace.** Copy the file into `~/.openmausbot/task-workspaces/<task-id>/<...>/` first and attach the copy; a path elsewhere in the home directory is rejected.
8. **Room membership is a separate write from the bot profile.** Adding a lead to a working room is done by the agent that owns the room; a supervisor bot acting from inside the room is refused, so don't retry that path and don't read the refusal as a permission bug. `list_room_targets` must afterwards show the new id in the roster — that read-back, not the write's return, is the proof.
9. **A room's own settings cannot be rewritten while a turn is running in it.** The write returns a conflict ("this channel is working or waiting on you — finish that turn first"), and an agent that is itself mid-turn is held from acting, so the same turn can never land it. Schedule a one-off trigger job that retries on a short interval (every 2–3 min, up to ~2 h); on success it must read the room record back and compare with the intended text before reporting done. Give the person the exact text in parallel so they can paste it if they need it live immediately.
10. **Choose the model by what the role must perceive:** a review role that reads screenshots needs a vision-capable model; a text-only model cannot hold a visual gate.
11. **Verify:** `list_bots` shows the new or updated fields, the team memory entry reads back with the intended detail, `list_room_targets` contains the member id, and the room record's bulletin matches the text that was meant to be written.

## Decommissioning a Team

1. **Inventory and back up the definition file before deleting anything.** Read `list_bots` / `list_team_setup`, then copy `~/.openmausbot/bots.json` to `bots.json.bak-<yyyymmdd-HHMMSS>`. The definition file is the only complete record of what each bot was configured with.
2. **Archive each bot's memory before the delete.** Copy `memory/` (soul, MEMORY.md, topic notes) and any self-authored skill into one archive directory under your own workspace (e.g. `memory/收编-bot档案/`). Deleting a bot removes its workspace as well, so build artifacts and screenshots under `~/.openmausbot/workspaces/<bot-id>/` are gone afterwards — decide explicitly what to keep, and tell the person what you judged rebuildable and discarded.
3. **Map every function to a skill you already have, before the delete.** One row per bot: 原职责 → the skill that now carries it. Attach that table as a file so the takeover is checkable rather than asserted; if a function has no skill behind it, the delete is premature.
4. **Delete one bot per `propose_bot_deletion` call, each with a specific reason** (what was archived and where). Many calls in one turn is fine; do not bundle several ids into one call.
5. **Read the roster back:** `list_bots` should report no reachable bots and `bots.json` should list only you. The deletion return is not the proof.
6. **Groups and rooms are not removable through these tools.** Expect empty group shells and rooms where you are the only member; report them and tell the person to remove them in the team map, rather than claiming everything is gone.
7. **Rewrite the skills that still tell a future session to build a team.** A dispatch or orchestration skill that says "recruit N bots and run them" will resurrect the roster you just deleted — patch those to single-operator mode in the same round, then grep the skill library once for other "组队/招募 bot" instructions.
8. **Parallelism does not require bots:** after the cutover, `delegate_task` subagents, Claude Code and Codex dispatch lanes and burst cards cover the fan-out, with different models available through those lanes.

## Pitfalls

- Batching an update for a busy bot with other operations loses the whole batch — isolate it.
- A described change is not an applied change: if the profile write is blocked, say so explicitly and report the file-based fallback, never imply the bot's profile was updated.
- Splitting one discipline across two bots "for coverage" reintroduces divergence; prefer one owner serving several lines and say why.
- Don't stop another agent's live task to unblock a config edit without explicit user approval.
- A room-settings conflict is room state, not permissions: check for a running turn before escalating or falling back to manual paste.
- A retry loop fired from inside the blocked turn can never succeed; the write has to be scheduled into an idle window.
- A bulletin change is not done until the room record reads back the new text — a trigger reporting success is not evidence.
- Member changes belong to the room owner; don't ask a supervisor bot to "just add them" on your behalf.
- Deleting bots without archiving first loses their notes and their workspace in one step; the memory directory is the part worth keeping.
- A deletion return of `applied` says nothing about the roster: read `list_bots` and `bots.json` back.
- Leaving a team-formation skill in place after dismantling the team makes the next session rebuild it.

## Verification

`list_bots` re-read shows the intended name, cwd, model and description for the target id; a fresh team memory entry records the change and any pending item; the room roster and bulletin read back exactly as intended. After a decommission the roster holds only you, `bots.json` matches, the archive directory has one entry per removed bot, and the attached mapping file names a concrete skill for every function that was taken over.
