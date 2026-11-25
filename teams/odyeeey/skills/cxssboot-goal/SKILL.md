---
name: cxssboot-goal
description: "持久化多模块目标工作流。每个目标作为独立 autopilot 调度，跨 session 恢复。支持 goals.json 状态机 + ledger.jsonl 审计线索。Trigger: '/cxssboot-goal', 'goal mode', '目标模式', 'add goal', '多目标', 'multi-goal'."
version: 1.0.0
author: Hermes Agent
license: MIT
metadata:
  hermes:
    tags: [cxssboot, backend, java, goals, multi-goal, persistence, state-machine]
    related_skills: [cxssboot-backend, cxssboot-autopilot, cxssboot-loop, cxssboot-team, cxssboot-caveman, cxssboot-super]
---

# cxssboot-goal — 持久化多模块目标工作流

> **主文档:** `SKILL.md` — 完整 cxssboot-backend 架构规范
> **调度引擎:** `/cxssboot-autopilot` — 每个目标作为独立 autopilot task 调度
> **质量门:** `/cxssboot-loop` — 每个目标完成后运行 verify+fail/retry 循环
> **状态持久化:** `.hermes/agents/cxssboot/goals/{run_id}/` 下 goals.json + manifest.md + ledger.jsonl
> **跨 session 恢复:** 直接调用 `/cxssboot-goal resume` 或 `next`

When invoked via `/cxssboot-goal`, activate the persistent multi-goal workflow manager. Each goal is an independent autopilot task tracked through a state machine. Every state transition writes to `ledger.jsonl` for full auditability. The workflow survives session restarts via `goals.json` persistence.

---

## Quick Start

```bash
# Add goals to a run
/cxssboot-goal add "在 kb 模块新增 KbTag 的完整 CRUD"
/cxssboot-goal add "在 kb 模块新增 KbCategory 的完整 CRUD"
/cxssboot-goal add "在 system 模块新增 SysConfig 的完整 CRUD"

# List all goals in current run
/cxssboot-goal list

# Start all pending goals sequentially
/cxssboot-goal start

# Dispatch only the next pending goal
/cxssboot-goal next

# Check run status
/cxssboot-goal status

# Resume from last checkpoint
/cxssboot-goal resume

# Cancel active run
/cxssboot-goal cancel

# Manually mark a goal complete (e.g. after manual fix)
/cxssboot-goal complete G001
```

**One-liner quick-start (add + start):**
```bash
/cxssboot-goal add "在 kb 模块新增 KbTag 的完整 CRUD" && \
  /cxssboot-goal add "在 kb 模块新增 KbCategory 的完整 CRUD" && \
  /cxssboot-goal start
```

---

## Goal State Machine

Each goal transitions through this state machine. State is persisted in `goals.json` and every transition emits a `ledger.jsonl` event.

```
pending → in_progress → verify → complete | failed | blocked
                            ↑       ↑         ↑
                            └───────┴─── retry │
                                        └── add blocker goal
```

**Valid transitions:**
- `pending` → `in_progress` (dispatched as autopilot task)
- `in_progress` → `verify` (autopilot completed, quality gate running)
- `verify` → `complete` (all verification gates pass)
- `verify` → `failed` (verification failed, attempts exhausted)
- `verify` → `blocked` (verification failed, dependency on another goal)
- `failed` → `in_progress` (manual retry via `/cxssboot-goal retry <id>`)
- `blocked` → `pending` (blocker goal completed)
- `complete` / `failed` → `terminal` (no further transitions)

---

## Run Artifacts

All artifacts for a run live under `.hermes/agents/cxssboot/goals/{run_id}/`.

### Directory Layout

```
.hermes/agents/cxssboot/goals/{run_id}/
├── goals.json       # State machine: all goals + their status + evidence
├── manifest.md      # Human-readable goal list (title, module, task per goal)
└── ledger.jsonl     # Append-only audit trail (every state transition)
```

### goals.json

```json
{
  "run_id": "r-abc123",
  "created_at": "2026-06-30T08:00:00Z",
  "updated_at": "2026-06-30T08:00:00Z",
  "active_goal_id": "G001",
  "goals": [
    {
      "id": "G001",
      "title": "新增 KbTag 完整 CRUD",
      "status": "in_progress",
      "module": "kb",
      "task": "在 kb 模块新增 KbTag 的完整 CRUD",
      "attempts": 1,
      "autopilot_session_id": "ses_xyz",
      "evidence": []
    },
    {
      "id": "G002",
      "title": "新增 KbCategory 完整 CRUD",
      "status": "pending",
      "module": "kb",
      "task": "在 kb 模块新增 KbCategory 的完整 CRUD",
      "attempts": 0,
      "evidence": []
    }
  ]
}
```

**Field notes:**
- `evidence`: array of verification artifacts (verify_convention.py output path, compile log path)
- `autopilot_session_id`: set when goal is dispatched; used to track and resume the autopilot task
- `attempts`: incremented each time goal enters `in_progress`

### manifest.md

Human-readable summary regenerated on every write. Example:

```markdown
# Goal Run r-abc123
Started: 2026-06-30T08:00:00Z | Updated: 2026-06-30T08:30:00Z

## Goals (3)

| ID | Status | Module | Title |
|----|--------|--------|-------|
| G001 | complete | kb | 新增 KbTag 完整 CRUD |
| G002 | in_progress | kb | 新增 KbCategory 完整 CRUD |
| G003 | pending | system | 新增 SysConfig 完整 CRUD |
```

### ledger.jsonl

Append-only audit trail. One JSON line per state transition (limit 1 KB per entry):

```jsonl
{"ts":"2026-06-30T08:00:00Z","event":"goal_added","goal_id":"G001","title":"新增 KbTag 完整 CRUD","module":"kb"}
{"ts":"2026-06-30T08:00:01Z","event":"goal_added","goal_id":"G002","title":"新增 KbCategory 完整 CRUD","module":"kb"}
{"ts":"2026-06-30T08:00:30Z","event":"goal_started","goal_id":"G001","autopilot_session_id":"ses_xyz"}
{"ts":"2026-06-30T08:15:00Z","event":"goal_completed","goal_id":"G001","evidence":["verify-kb.json","compile-kb.log"]}
{"ts":"2026-06-30T08:15:01Z","event":"goal_started","goal_id":"G002","autopilot_session_id":"ses_abc"}
{"ts":"2026-06-30T08:30:00Z","event":"goal_failed","goal_id":"G002","attempts":1,"reason":"CHK01 violation at KbCategoryController.java:42"}
{"ts":"2026-06-30T08:30:01Z","event":"goal_blocked","goal_id":"G002","blocker_id":"G001","reason":"Dependency on KbTag DO for FK reference"}
{"ts":"2026-06-30T08:35:00Z","event":"goal_retried","goal_id":"G002","attempts":2}
{"ts":"2026-06-30T08:36:00Z","event":"goal_cancelled","goal_id":"G003","reason":"User cancelled run"}
{"ts":"2026-06-30T08:36:01Z","event":"run_completed","run_id":"r-abc123","summary":"2/3 complete, 1 cancelled"}
```

**Event types:**
`goal_added`, `goal_started`, `goal_blocked`, `goal_retried`, `goal_completed`, `goal_failed`, `goal_cancelled`, `run_completed`

---

## Quality Gate (per goal)

Before marking any goal `complete`, run ALL three gates. Any failure → mark `failed` or `blocked`.

### Gate 1: Convention Checks

```bash
python3 scripts/verify_convention.py src/main/java/com/cxssboot/<module>/ --json
```

**Contract:** Exit code 0 = clean. Exit code = min(1, len(violations)). Output is raw JSON array — NOT a wrapper object. If exit code is not 0, the goal is NOT complete.

### Gate 2: Bizcode Collision

```bash
python3 scripts/pattern_router.py --check-bizcode <new_bizcode>
```

**Requirement:** No collision with existing bizcodes in `data/bizcodes.csv`. Only run if the goal introduced new bizcodes.

### Gate 3: Compile Check

```bash
mvn compile -pl cxssboot-module-<module> -am -q
```

**Requirement:** Exit 0, no compilation errors. If compile fails, goal is NOT complete.

---

## Goal Lifecycle

### Phase 1: Create Run

1. Generate `run_id = "r-" + timestamp + "-" + shortuuid`.
2. Create `.hermes/agents/cxssboot/goals/{run_id}/` directory.
3. Write initial `goals.json` (empty goals array, `active_goal_id: null`, timestamps set).
4. Write initial `manifest.md` header.
5. Write `ledger.jsonl` header entry.

### Phase 2: Add Goals

`/cxssboot-goal add "<task>"`

1. Parse task to extract module (kb|system|base|rag) and entity name.
2. Assign `id = "G" + (len(goals) + 1).toString().padStart(3, '0')`.
3. Append to `goals.json` → `goals` array with `status: "pending"`.
4. Write `goal_added` to `ledger.jsonl`.
5. Regenerate `manifest.md`.

### Phase 3: Dispatch Goals

`/cxssboot-goal start` or `/cxssboot-goal next`

1. Read `goals.json`. Find first goal with `status == "pending"`.
2. Set goal `status = "in_progress"`, `active_goal_id = <goal.id>`.
3. Write `goal_started` to `ledger.jsonl`.
4. Dispatch goal as autopilot task using cross-tool invocation block:

```
### Claude Code
claude -p "在 <module> 模块新增 <Entity> 的完整 CRUD" \
  --append-system-prompt-file .hermes/agents/cxssboot/ctx.txt \
  --allowedTools 'Read,Write,Edit,Bash' --max-turns 20

### OpenCode
opencode run --thinking "Context: $(cat .hermes/agents/cxssboot/ctx.txt)
Task: 在 <module> 模块新增 <Entity> 的完整 CRUD"

### Codex
codex exec --full-auto "Constraints: $(cat .hermes/agents/cxssboot/ctx.txt)
Task: 在 <module> 模块新增 <Entity> 的完整 CRUD"
```

5. Record `autopilot_session_id` in goals.json.
6. After autopilot completes, transition goal to `verify` status.
7. Execute **Quality Gate** (3 checks).
8. On pass → mark `complete`, write `goal_completed` to ledger, record evidence paths.
9. On fail with attempts < 3 → mark `failed`, write `goal_failed` to ledger.
10. On fail — optional: check for blocker. If goal failed because it depends on another pending goal → mark `blocked`, write `goal_blocked` with `blocker_id`.
11. For `start` mode: auto-dispatch next pending goal. For `next` mode: stop after one.

### Phase 4: Retry Failed Goals

`/cxssboot-goal retry <id>`

1. Find goal by id, increment `attempts`.
2. Reset `status = "in_progress"`.
3. Write `goal_retried` to ledger.
4. Re-dispatch as autopilot task (Phase 3, step 4+).

### Phase 5: Complete Run

`/cxssboot-goal complete <id>` (manual completion) or auto-complete when all goals are terminal.

1. Verify all goals have `status ∈ {complete, failed, blocked, cancelled}` (no `pending` or `in_progress` or `verify`).
2. Write `run_completed` to ledger.
3. Output run summary: `N/M goals complete (X failed, Y cancelled)`.

---

## Stop-hook Enforcement

Before declaring the run complete, the agent MUST:

1. Read `.hermes/agents/cxssboot/goals/{run_id}/goals.json`.
2. Assert all goals have status in `{complete, failed, blocked, cancelled}`.
3. Assert NO goal has status `pending`, `in_progress`, or `verify`.
4. Assert final `ledger.jsonl` entry is `run_completed`.

**If any goal is pending/in_progress/verify → block completion.** Continue dispatching or report unfinished goals.

**Implementation check (pseudocode):**

```
read goals.json
for each g in goals:
  if g.status not in {complete, failed, blocked, cancelled}:
    BLOCK: goal g.id is still g.status — cannot complete run
read ledger.jsonl last line
if last line.event != "run_completed":
    BLOCK: ledger missing run_completed entry — cannot complete run
proceed: run complete
```

---

## State Contract (condensed)

Full autopilot state schema: `/cxssboot-autopilot` §State Machine (`autopilot-state.json`). Goal run extends autopilot with multi-goal tracking. Cross-tool invocation block: see **Goal Lifecycle → Phase 3** (embedded copy above).

**Verify contract (per goal):**
```bash
python3 scripts/verify_convention.py <path> --json
```
Exit 0 = clean. Exit code = min(1, len(violations)). Output is raw JSON array — NOT a wrapper object. Per-goal bizcode check: `python3 scripts/pattern_router.py --check-bizcode <new_bizcode>`.

---

## Iron Law

When this skill is loaded, the agent **MUST** follow the goal lifecycle for all work:

```
GOAL IRON LAW:
├─ Multi-module task (2+ independent entities)?
│   ├─ YES → /cxssboot-goal add + /cxssboot-goal start
│   └─ NO → /cxssboot-autopilot (single goal = single autopilot)
│
├─ Goal dispatch active?
│   ├─ YES → Each goal as independent autopilot task
│   └─ NO → Start dispatch (/cxssboot-goal start)
│
└─ Run in progress?
    ├─ YES → Continue until all goals terminal
    └─ NO → Start new run (/cxssboot-goal add ...)
```

**Required actions:**
- ✅ Write `ledger.jsonl` on every state transition.
- ✅ Run quality gate (`verify_convention.py` exit 0 + compile + bizcode) before marking goal complete.
- ✅ Persist `goals.json` after every change (add, start, complete, retry, cancel).
- ✅ Regenerate `manifest.md` after every `goals.json` write.
- ✅ Dispatch each goal as a complete autopilot task (Expand→Generate→Verify→Fix→Complete).
- ✅ Only declare run complete when ALL goals are in terminal status.

**Prohibited actions:**
- ❌ Skipping verification because "autopilot already verified".
- ❌ Declaring run done with goals still `pending` or `in_progress`.
- ❌ Inventing API methods or script flags. `pattern_router.py` has no `--goal` or `--multi-goal` flag.
- ❌ Writing `run_completed` to ledger before all goals are terminal.
- ❌ Bypassing the stop-hook check (read goals.json, verify all terminal, verify ledger final entry).
- ❌ Using `verify_convention.py` as a wrapper — the output is raw JSON array, NOT `{"status": "clean", ...}`.

**Stop-hook enforcement:**
Before emitting any "completion" signal for the run, the agent MUST:
1. Read `.hermes/agents/cxssboot/goals/{run_id}/goals.json`.
2. Verify EVERY goal `status ∈ {complete, failed, blocked, cancelled}`.
3. Verify NO goal has `status ∈ {pending, in_progress, verify}`.
4. Verify final `ledger.jsonl` entry is `run_completed`.

If ANY condition fails, the agent MUST continue dispatching or report unfinished goals to the user.

---

## Sub-commands

### `/cxssboot-goal add "<task_description>"`

Creates new run if none active. Parses task for module+entity, appends goal with `status: "pending"`, writes `goal_added` to ledger, regenerates `manifest.md`.

```
/cxssboot-goal add "在 kb 模块新增 KbTag 的完整 CRUD"
✅ Goal G001 added: 新增 KbTag 完整 CRUD (module: kb, status: pending)
```

### `/cxssboot-goal list`

Lists all goals in current run.

```
Run: r-abc123 | Goals: 3 | Complete: 1 | Active: 1 | Pending: 1
├─ [G001] ✅ complete  — 新增 KbTag 完整 CRUD (kb, 1 attempt)
├─ [G002] 🔄 in_progress — 新增 KbCategory 完整 CRUD (kb, ses_abc)
└─ [G003] ⏳ pending  — 新增 SysConfig 完整 CRUD (system)
```

### `/cxssboot-goal start`

Dispatches ALL pending goals sequentially. After each goal completes/fails/blocked, proceeds to next. When all terminal → Phase 5 (Complete Run).

### `/cxssboot-goal next`

Dispatches exactly ONE pending goal. Stops after — no auto-advance.

### `/cxssboot-goal status`

Shows current run status with per-goal detail.

```
Run: r-abc123 | Created: 2026-06-30T08:00:00Z | Active goal: G002
├─ Goals: 3 (1 complete, 1 in_progress, 1 pending)
│   ├─ [G001] ✅ complete  — 新增 KbTag 完整 CRUD
│   ├─ [G002] 🔄 in_progress — 新增 KbCategory 完整 CRUD
│   └─ [G003] ⏳ pending  — 新增 SysConfig 完整 CRUD
└─ Ledger entries: 4
```

### `/cxssboot-goal resume`

Resume from last checkpoint. Reads `goals.json`, finds first non-terminal goal, continues dispatch. If `in_progress` goal has `autopilot_session_id`, attempts autopilot resume first. No active run → "Use /cxssboot-goal add to begin."

```
/cxssboot-goal resume
✅ Resumed run r-abc123. Active goal: G002 (in_progress). Dispatching...
```

### `/cxssboot-goal cancel`

Cancels run: sets all non-terminal goals to `cancelled`, writes `goal_cancelled` + `run_completed` to ledger. Does NOT delete artifacts (preserves audit trail).

### `/cxssboot-goal complete <id>`

Manually marks goal complete (use after manual fix). Writes `goal_completed` to ledger. If all goals now terminal → writes `run_completed`.

### `/cxssboot-goal retry <id>`

Re-dispatches a failed/blocked goal. Increments `attempts`, clears `blocker_id`, resets to `in_progress`, dispatches as autopilot (Phase 3). Only valid for goals in `{failed, blocked}`.

---

## Error Handling

| Error | Action | Recovery |
|-------|--------|----------|
| Autopilot session lost | Re-dispatch goal as new autopilot task | Previous `autopilot-state.json` may be orphaned |
| Verify gate fail (attempt 1-2) | Goal stays `failed`; run `/cxssboot-goal retry <id>` | Tip: `/cxssboot-loop start "<task>"` for iterative fix |
| Verify gate fail (attempt 3/3) | Goal stays `failed`; manual fix required | Fix code, then `/cxssboot-goal complete <id>` |
| Blocked goal (dependency) | Complete blocker goal first, then retry | Reorder goals via `goals.json` if needed |
| Missing artifacts (`goals.json`) | Create new run with `/cxssboot-goal add` | Previous run state lost |

---

## Configuration

### Run Artifacts

| File | Purpose | Managed By |
|------|---------|------------|
| `goals.json` | Goal state machine (all goals + status + evidence) | `/cxssboot-goal` (every operation) |
| `manifest.md` | Human-readable run summary | `/cxssboot-goal` (regenerated on write) |
| `ledger.jsonl` | Append-only audit trail | `/cxssboot-goal` (every state transition) |

### Related Configuration Files

| File | Purpose | Managed By |
|------|---------|------------|
| `.hermes/agents/cxssboot/ctx.txt` | Generated convention context | `/cxssboot-autopilot` (Stage 1) |
| `.hermes/agents/cxssboot/autopilot-state.json` | Per-goal autopilot state | `/cxssboot-autopilot` |
| `.hermes/agents/cxssboot/caveman.conf` | Context injection depth | `/cxssboot-caveman` |
| `.hermes/agents/cxssboot/super.conf` | Reasoning depth | `/cxssboot-super` |
| `.hermes/agents/cxssboot/loop-state.json` | Per-goal verification loop state | `/cxssboot-loop` |

### Environment Variables

| Variable | Purpose | Default |
|----------|---------|---------|
| `CXSSBOOT_GOAL_MAX_ATTEMPTS` | Max retry attempts per goal | `3` |
| `CXSSBOOT_GOAL_RUN_DIR` | Override run artifacts directory | `.hermes/agents/cxssboot/goals/` |
| `CXSSBOOT_GOAL_AUTO_START` | Auto-start dispatch on add | `false` |
| `CXSSBOOT_GOAL_LEDGER_MAX_ENTRY_KB` | Max ledger entry size | `1` |

**Max attempts per goal:** `CXSSBOOT_GOAL_MAX_ATTEMPTS` (default 3). Goals auto-fail on 3rd failed verification. Agent MUST increment `attempts` on each retry; leave as `failed` when exhausted; report "Manual fix required."

---

## References

- **Parent SKILL:** `SKILL.md` — Complete cxssboot-backend architectural DNA and conventions
- **Autopilot SKILL:** `cxssboot-autopilot/SKILL.md` — 5-stage autonomous pipeline (each goal dispatches as autopilot)
- **Loop SKILL:** `cxssboot-loop/SKILL.md` — Verify+Fix iteration engine (post-autopilot verification)
- **Team SKILL:** `cxssboot-team/SKILL.md` — Multi-agent parallel generation (used within autopilot)
- **Caveman Command:** `cxssboot-caveman/SKILL.md` — Context injection depth control
- **Super Command:** `cxssboot-super/SKILL.md` — ULTRATHINK deep-reasoning protocol
- **Pattern Router:** `scripts/pattern_router.py` — Intent matching + context generation
- **Verification Script:** `scripts/verify_convention.py` — 12 automated convention checks (exit 0 = clean, raw JSON array output)
- **Code Templates:** `references/code-templates.md` — Exact templates for all Java layers
- **Naming Dictionary:** `references/naming-dictionary.md` — Complete naming conventions
