---
name: bot-team-coordination
description: Create persistent teammate bots and dispatch, verify and rework their work.
---

# Bot Team Coordination

Sets up persistent teammate bots for a production line and drives them through dispatched, verified tasks. It does not cover memory curation or installing skill packages (see `agent-memory-and-skill-curation` and `skill-package-installation`).

## When to Use

- "安排常驻员工", "建几个员工", "派给团队做", "起来工作了".
- Any workflow where the person wants named, persistent staff visible in the team map producing files in a shared workspace.

## Procedure

1. Check what exists first with `list_team_setup` before creating bots, so roles are not duplicated.
2. Create persistent staff with `create_bot` (name, role, instructions). Each bot's instructions must include: its role, the workspace path, the skill/asset paths it depends on, and that deliverables land as files in the workspace.
3. Dispatch work with `coordinate_bots`. Pass `bot_ids` as the UUIDs returned by `list_team_setup`/`create_bot`, never display names. Include in the message: the exact input file paths, the output paths, and a `done_when` clause stating which files must exist on disk.
4. When a deliverable arrives, verify on disk before reporting: `ls`, `wc -l`, and spot-check the content against the acceptance criteria. Append results to the workspace progress file.
5. When the person asks for compliance-sensitive work (marketing/short-video), run a violation-term sweep with `rg` over the deliverable directory before reporting. If violations are found, send a rework dispatch scoped to only the offending files, stating which parts must stay untouched.
6. After rework, re-run the same `rg`/spot-check to confirm the fix and that nothing else changed, then report status with file paths and the next step.

## Pitfalls

- `coordinate_bots` fails when `bot_ids` contains display names like "小王"; always use bot UUIDs.
- A rework dispatch can silently not reach the bot. After sending, verify the change actually landed on disk before telling the person it was fixed; if not, re-dispatch.
- Do not present temporary sub-agent helpers as "常驻员工" — the person cannot see them work and will ask why nothing is moving. If only temp helpers were used, say so plainly, and offer to create persistent bots via `create_bot`.
- Verify every bot deliverable on disk before telling the person it is done; a bot's self-report is not proof.
- Scope rework dispatches narrowly (only the offending files, with a "do not touch the rest" clause) so a fix does not overwrite accepted work.
- A bot failing repeatedly at startup with `provider_error` usually has a wrong MCP endpoint, not a bad task. Probe candidate endpoints with an MCP `initialize` handshake (compare HTTP status and auth response), then fix the endpoint in `~/.openmausbot/config.json` — back the file up before editing — and confirm with a follow-up handshake plus `tools/list` before re-dispatching.

## Verification

- `list_team_setup` shows the persistent bots; the dispatched files exist on disk, pass the violation-term sweep, and the workspace progress file records the round.
