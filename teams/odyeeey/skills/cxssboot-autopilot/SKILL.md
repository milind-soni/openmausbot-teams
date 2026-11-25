---
name: cxssboot-autopilot
description: "5-stage autonomous pipeline for cxssboot backend code generation. Stages: Expand(pattern match)→Generate(AI tool delegation)→Verify(convention+compile)→Fix(iterative repair)→Complete(cleanup). Composes /cxssboot-loop as the Verify+Fix engine and /cxssboot-team for multi-file parallel generation. State persists across sessions via .hermes/agents/cxssboot/sessions/{session_id}/autopilot-state.json (legacy: .hermes/agents/cxssboot/autopilot-state.json)."
version: 1.0.0
author: Hermes Agent
license: MIT
metadata:
  hermes:
    tags: [cxssboot, backend, java, autopilot, pipeline, autonomous, code-generation, verification]
    related_skills: [cxssboot-backend, cxssboot-loop, cxssboot-team, cxssboot-caveman, cxssboot-super, cxssboot-goal]
---

# cxssboot-autopilot — 5-Stage Autonomous Pipeline

> **主文档:** `SKILL.md` — 完整 cxssboot-backend 架构规范
> **互补系统:** `/cxssboot-loop` 提供 Verify+Fix 迭代引擎，`/cxssboot-team` 提供多文件并行生成能力。
> **状态持久化:** `.hermes/agents/cxssboot/sessions/{session_id}/autopilot-state.json`（遗留路径只读：`.hermes/agents/cxssboot/autopilot-state.json`）支持跨 session 恢复。

When invoked via `/cxssboot-autopilot`, activate the 5-stage autonomous pipeline for cxssboot backend code generation. The pipeline composes pattern matching, AI tool delegation, automated verification, iterative fixing, and cleanup into a single hands-off workflow.

---

## Quick Start

```bash
# Start autopilot for a new task
/cxssboot-autopilot "在 kb 模块新增 KbTag 的完整 CRUD"

# Resume from last checkpoint
/cxssboot-autopilot resume

# Check current status
/cxssboot-autopilot status

# Cancel active pipeline
/cxssboot-autopilot cancel
```

**One-liner equivalent:**
```bash
python3 scripts/pattern_router.py "在 kb 模块新增 KbTag 的完整 CRUD" --module kb --format prompt
```

---

## Guard Pipeline

The 5-stage pipeline is wrapped in guard-transform-observe semantics:

```
GUARD  ──┐  Entry preflight: module dir exists, pom.xml present,
          │  no conflicting active run with same module.
          │  REJECT → guard_rejected halt, no state mutation.
          │
TRANSFORM │  Stages 1-4. Can modify files + state.
          │
OBSERVE ──┘  Stage 5. Log-only, writes report, never mutates code.
             Emits observe_checkpoint + run_completed.
```

### 5-Stage Pipeline

```
/cxssboot-autopilot "<task>"
  │
  ├─ Stage 1: EXPAND
  │     ├─ Run pattern_router.py "<task>" --module <module> --format prompt
  │     ├─ Output: .hermes/agents/cxssboot/ctx.txt (complete convention context)
  │     └─ Signal: EXPAND_COMPLETE
  │
  ├─ Stage 2: GENERATE
  │     ├─ Single file → delegate to AI tool of choice (3 variants — see §Stage 2)
  │     ├─ Multi-file (3+) → invoke /cxssboot-team semantics (parallel workers)
  │     ├─ Uses context from Stage 1
  │     └─ Signal: GENERATE_COMPLETE
  │
  ├─ Stage 3: VERIFY
  │     ├─ verify_convention.py src/main/java/com/cxssboot/<module>/ --json → expect exit 0
  │     ├─ pattern_router.py --check-bizcode <new_code> → no collision
  │     ├─ mvn compile -pl cxssboot-module-<module> -am -q → BUILD SUCCESS
  │     └─ Signal: VERIFY_COMPLETE (all pass) or VERIFY_FAILED
  │
  ├─ Stage 4: FIX
  │     ├─ Parse verify_convention.py --json output → CHK codes + file:line
  │     ├─ For each violation: delegate fix to sub-agent (exact file+line+rule)
  │     ├─ Re-run verify; max 5 fix rounds
  │     └─ Signal: FIX_COMPLETE (verify passes) or FIX_EXHAUSTED (>5 rounds)
  │
  └─ Stage 5: COMPLETE (OBSERVE — log-only, write report, never mutate code)
        ├─ Run final full verification
        ├─ Write completion summary
        └─ Clear autopilot-state.json (set active=false, phase=complete)
```

### Stage 1: Expand

**Purpose:** Match task intent to cxssboot pattern, generate complete convention context.

**Input:** Natural language task description + module name.

**Actions:**
1. Parse task description to extract entity name, module, and scenario domain.
2. Run `python3 scripts/pattern_router.py "<task>" --module <module> --format prompt`.
3. Write generated context to `.hermes/agents/cxssboot/ctx.txt`.
4. Update autopilot-state.json: `phase = "expand"`, `expand.context_generated = true`.
5. Emit `stage_entered` → `stage_exited` to ledger.

**Output:** `ctx.txt` with full convention context at configured caveman level.

**Signal:** `EXPAND_COMPLETE`

### Stage 2: Generate

**Purpose:** Delegate code generation to appropriate AI tool(s). Supports all 3 tool variants.

**Input:** `ctx.txt` from Stage 1 + task description.

**Actions:**
1. Determine generation mode:
   - Single file → delegate to AI tool (choose from 3 variants below).
   - Multi-file (3+) → `/cxssboot-team` semantics: decompose into file-level tasks, spawn parallel workers.
2. Inject context at configured caveman level (read from `.hermes/agents/cxssboot/caveman.conf`).
3. Activate super mode if configured (read from `.hermes/agents/cxssboot/super.conf`).
4. Generate code files using one of the following tool variants:

```
### Claude Code (single-file / precision work)
claude -p "<task>" --append-system-prompt-file .hermes/agents/cxssboot/ctx.txt --allowedTools 'Read,Write,Edit,Bash' --max-turns 20

### OpenCode (reasoning-heavy / architecture)
opencode run --thinking "Context: $(cat .hermes/agents/cxssboot/ctx.txt)

Task: <task>"

### Codex (batch CRUD / quick multi-file)
codex exec --full-auto "Constraints: $(cat .hermes/agents/cxssboot/ctx.txt)

Task: <task>"
```

5. For multi-file (3+) generation:
   - **Claude Code variant:** Decompose task → spawn parallel workers via `/cxssboot-team` Leader-Follower pattern.
   - **Codex variant:** Use `exec --full-auto` with file list in task description.
   - **OpenCode variant:** Use `run --thinking` with decomposed sub-tasks.
6. Update autopilot-state.json: `phase = "generate"`, `generate.files_generated = [...]`.
7. Emit `generate_dispatched` → `generate_completed` to ledger.

**Output:** Generated Java files in `src/main/java/com/cxssboot/<module>/`.

**Signal:** `GENERATE_COMPLETE`

### Stage 3: Verify

**Purpose:** Run all verification gates; determine if pipeline can complete or must fix.

**Input:** Generated files from Stage 2.

1. Run `python3 scripts/verify_convention.py src/main/java/com/cxssboot/<module>/ --json` (CHK01-CHK14).
2. Parse JSON output; extract violations array. Exit code = min(1, len(violations)).
3. Run `python3 scripts/pattern_router.py --check-bizcode <new_bizcode>` if new bizcodes were added.
4. Run `mvn compile -pl cxssboot-module-<module> -am -q`.
5. Run `mvn test -pl cxssboot-module-<module> -am` (TDD GREEN phase verification).
6. Evaluate results:
   - All gates pass (convention + compile + test) → `VERIFY_COMPLETE`, proceed to Stage 5.
   - Any gate fails → `VERIFY_FAILED`, proceed to Stage 4.
7. Update autopilot-state.json: `phase = "verify"`, `verify.* = results`.
8. Emit `verify_result` to ledger with violations count, compile status, exit code.

**Output:** Verification report (violations list + compile status + bizcode status).

**Signal:** `VERIFY_COMPLETE` or `VERIFY_FAILED`

### Stage 4: Fix

**Purpose:** Iteratively repair violations until all gates pass or iteration budget exhausted.

**Input:** Violations from Stage 3.

**Actions:**
1. Parse violations; group by file and check type.
2. For each violation, delegate fix to sub-agent with exact context:
   - File path, line number, check code (CHK01-CHK12), rule description.
3. Apply fixes surgically (minimal changes).
4. Re-run Stage 3 verification.
5. Repeat up to 5 fix rounds.
6. If all violations cleared → `FIX_COMPLETE`, proceed to Stage 5.
7. If 5 rounds exhausted with remaining violations → `FIX_EXHAUSTED`, escalate to human.
8. Update autopilot-state.json: `phase = "fix"`, `fix.rounds = N`, `fix.violations_fixed = [...]`.
9. Emit `fix_applied` to ledger per round with before/after violation counts.

**Output:** Fixed files + verification report.

**Signal:** `FIX_COMPLETE` or `FIX_EXHAUSTED`

### Stage 5: Complete (OBSERVE)

**Purpose:** Final verification, cleanup, and reporting. Log-only phase — never mutates code.

**Input:** Verified clean codebase from Stage 4 or Stage 3.

**Actions:**
1. Run final full verification (all 3 gates).
2. Write completion summary to `.hermes/agents/cxssboot/sessions/{session_id}/autopilot-report.md`.
3. Finalize autopilot-state.json (set `active = false`, `phase = "complete"`).
4. Emit `observe_checkpoint` (total duration, iterations) → `run_completed` to ledger.
5. Report results to user.

**Output:** Clean codebase + completion report.

**Signal:** `COMPLETE`

---

## State Machine

State file: `.hermes/agents/cxssboot/sessions/{session_id}/autopilot-state.json`
Legacy fallback (read-only): `.hermes/agents/cxssboot/autopilot-state.json`

Read order: session-scoped → legacy → fresh-init. On first write, migrate legacy → session path.

```json
{
  "active": true,
  "phase": "expand|generate|verify|fix|complete|failed",
  "iteration": 0,
  "max_iterations": 15,
  "task_description": "...",
  "module": "kb|system|base|rag",
  "session_id": "...",
  "expand": {
    "context_generated": false,
    "ctx_path": null
  },
  "generate": {
    "files_generated": [],
    "total_files": 0
  },
  "verify": {
    "exit_code": null,
    "violations": [],
    "compile_passed": false,
    "test_passed": false
  },
  "fix": {
    "rounds": 0,
    "max_rounds": 5,
    "violations_fixed": [],
    "violations_remaining": []
  },
  "started_at": "...",
  "completed_at": null,
  "phase_durations": {}
}
```

### Phase Transition Rules

```
INIT → EXPAND → GENERATE → VERIFY → FIX → VERIFY → ... → COMPLETE
                                    │                    │
                                    │                    └─ (all gates pass)
                                    │
                                    └─ (violations remain, rounds < 5)
                                          │
                                          └─ (rounds >= 5) → FAILED
```

**Valid transitions:**
- `init` → `expand`
- `expand` → `generate`
- `generate` → `verify`
- `verify` → `fix` (if violations found)
- `verify` → `complete` (if all gates pass)
- `fix` → `verify` (after applying fixes)
- `fix` → `failed` (if max rounds exhausted)
- `complete` → `terminal` (pipeline done)
- `failed` → `terminal` (human intervention required)

---

## Integration with Loop + Team

Autopilot composes `/cxssboot-loop` and `/cxssboot-team` into a unified pipeline.

### How Autopilot Uses Loop

| Autopilot Stage | Loop Phase | Purpose |
|-----------------|------------|---------|
| Stage 3: Verify | Phase 3: VERIFY | Run verify_convention.py, parse violations, compile check |
| Stage 4: Fix | Phase 4: FIX | Iterative repair with max iteration budget |

**Loop provides:**
- Verification gate logic (12 CHK checks + bizcode + compile)
- Fix iteration protocol (max 10 iterations in loop, max 5 rounds in autopilot fix)
- State persistence pattern (loop-state.json → autopilot-state.json)

### How Autopilot Uses Team

| Autopilot Stage | Team Mechanism | Purpose |
|-----------------|----------------|---------|
| Stage 2: Generate | Leader-Follower pattern | Multi-file parallel generation |

**Team provides:**
- Task decomposition (7-file CRUD → file-level subtasks)
- Parallel worker spawning (waves respecting dependencies)
- Worker preamble with cxssboot conventions
- Consistency verification across all generated files

### When to Use Which

| Scenario | Primary Skill | Why |
|----------|--------------|-----|
| Full autonomous pipeline | `/cxssboot-autopilot` | End-to-end: expand → generate → verify → fix → complete |
| Iterative fix cycle only | `/cxssboot-loop` | Already have code, need verification + repair loop |
| Multi-file parallel generation | `/cxssboot-team` | Generate 3+ files in parallel, then verify |
| Single file quick fix | `/cxssboot-loop` or manual | Overhead of autopilot not justified |

**Decision tree:**
```
User asks for new feature / CRUD / module?
├─ YES → /cxssboot-autopilot (full pipeline)
└─ NO → Existing code needs fixing?
      ├─ YES → /cxssboot-loop (verify + fix loop)
      └─ NO → Manual generation or /cxssboot-team (parallel only)
```

---

## Resume

Autopilot supports cross-session recovery via `autopilot-state.json`.

### Resume Protocol

```bash
# Check if active pipeline exists
/cxssboot-autopilot status

# Resume from last checkpoint
/cxssboot-autopilot resume
```

**Resume logic:**
1. Read state (session-scoped path first, legacy fallback): `.hermes/agents/cxssboot/sessions/{session_id}/autopilot-state.json`.
2. If `active == true` and `phase != "complete"`:
   - Resume from the recorded `phase`.
   - Continue pipeline from that stage.
3. If `active == false` or file missing:
   - Start fresh pipeline (Stage 1: Expand).

**Resume by phase:**
- `expand` → Re-run Stage 1 (regenerate ctx.txt if missing).
- `generate` → Re-run Stage 2 (regenerate files if missing).
- `verify` → Re-run Stage 3 (re-verify current files).
- `fix` → Re-run Stage 4 (continue fix rounds from recorded count).
- `complete` / `failed` → Terminal states; start new pipeline.

---

## Phase Skipping

Autopilot optimizes by skipping stages when preconditions are met.

### Skip Expand

**Condition:** `.hermes/agents/cxssboot/ctx.txt` exists and is recent (< 1 hour old).

**Action:** Skip Stage 1; use existing ctx.txt.

**Override:** `/cxssboot-autopilot --force-expand "<task>"` to regenerate context.

### Skip Generate

**Condition:** `generate.files_generated` array is non-empty and files exist on disk.

**Action:** Skip Stage 2; reuse existing generated files.

**Override:** `/cxssboot-autopilot --force-generate` to regenerate files.

### Skip Fix

**Condition:** Stage 3 verification passes (0 violations, compile success, no bizcode collisions).

**Action:** Skip Stage 4; proceed directly to Stage 5 (Complete).

### Skip Complete

**Never skip Stage 5.** Complete handles cleanup and reporting.

---

## Error Handling & Fallback

### Max Iterations

**Global limit:** 15 pipeline iterations (across all stages).

**Per-phase limits:**
- Fix rounds: 5 max (within Stage 4).
- Verify retries: unlimited (until fix rounds exhausted).

### Timeouts

| Phase | Timeout | Action on Timeout |
|-------|---------|-------------------|
| Expand | 30s | Fail pipeline; report pattern_router.py error |
| Generate | 300s (5min) | Fail pipeline; report generation error |
| Verify | 60s | Fail pipeline; report verification error |
| Fix | 120s per round | Continue to next round or exhaust budget |

### Escalation to Human

Escalate when:
1. Max fix rounds (5) exhausted with remaining violations.
2. Max pipeline iterations (15) reached.
3. Compile errors that cannot be auto-fixed (syntax errors in generated code).
4. Pattern router fails to match task to known domain.
5. User cancels pipeline via `/cxssboot-autopilot cancel`.

**Escalation output:**
```markdown
## /cxssboot-autopilot FAILED

Task: <task_description>
Module: <module>
Phase: <phase>
Iteration: <N>/15

Remaining violations:
- CHK03: <file>:<line> — <message>
- CHK09: <file>:<line> — <message>

Action: Human intervention required.
Review: .hermes/agents/cxssboot/sessions/{session_id}/autopilot-state.json
```

### Recovery from Failure

```bash
# Review failure state
/cxssboot-autopilot status

# Fix manually, then resume
/cxssboot-autopilot resume

# Or start fresh
/cxssboot-autopilot "在 kb 模块新增 KbTag 的完整 CRUD"
```

---

## Sub-commands

### `/cxssboot-autopilot "<task_description>"`

Start a new autonomous pipeline.

**Arguments:**
- `task_description` (required): Natural language description of the code generation task.

**Behavior:**
1. Initialize autopilot-state.json.
2. Begin Stage 1 (Expand).
3. Execute pipeline through all 5 stages.
4. Report completion or failure.

**Example:**
```
/cxssboot-autopilot "在 kb 模块新增 KbTag 的完整 CRUD"
```

### `/cxssboot-autopilot resume`

Resume from last checkpoint.

**Behavior:**
1. Read autopilot-state.json from session-scoped path (legacy fallback).
2. If active and incomplete, resume from recorded phase.
3. If terminal or missing, prompt to start fresh.

**Example:**
```
/cxssboot-autopilot resume
✅ Resumed from phase: verify (iteration 3/15)
```

### `/cxssboot-autopilot status`

Show current pipeline status.

**Output:**
```
Autopilot Status: ACTIVE
├─ Task: 在 kb 模块新增 KbTag 的完整 CRUD
├─ Module: kb
├─ Phase: verify
├─ Iteration: 3/15
├─ Fix rounds: 1/5
├─ Violations: 2
│   ├─ CHK03: Missing @Valid (KbTagController.java:15)
│   └─ CHK09: Missing @JsonFormat (KbTagVO.java:12)
├─ Started: 2026-06-30T04:00:00Z
└─ Last update: 2026-06-30T04:03:00Z
```

**If no active pipeline:**
```
No active autopilot pipeline. Use /cxssboot-autopilot "<task>" to begin.
```

### `/cxssboot-autopilot cancel`

Cancel the active pipeline immediately.

**Behavior:**
1. Set `active: false` in autopilot-state.json.
2. Set `phase: "cancelled"`.
3. Clean up temporary files (ctx.txt, partial outputs).
4. Report cancellation to user.

**Example:**
```
/cxssboot-autopilot cancel
✅ Pipeline cancelled. Phase: verify, 2 violations remaining.
```

---

## Iron Law

When this skill is loaded, the agent **MUST** follow the 5-stage pipeline for non-trivial tasks:

```
AUTOPILOT IRON LAW:
├─ Non-trivial task (new CRUD, new module, 3+ files)?
│   ├─ YES → MUST run full 5-stage pipeline
│   └─ NO → Single file fix → /cxssboot-loop or manual
│
└─ Pipeline active?
    ├─ YES → MUST continue until COMPLETE or FAILED
    └─ NO → Start new pipeline
```

**Required actions:**
- ✅ Run `pattern_router.py` to generate context before any code generation.
- ✅ Delegate generation to AI tool with injected context.
- ✅ Run `verify_convention.py` after EVERY generation phase.
- ✅ Fix ALL violations before declaring completion.
- ✅ Persist state to autopilot-state.json after each stage.
- ✅ Only declare completion when ALL verification gates pass.

**Prohibited actions:**
- ❌ Generating code without context injection.
- ❌ Skipping verification because "it's probably correct".
- ❌ Declaring completion with violations remaining.
- ❌ Ignoring compile failures.
- ❌ Stopping before Stage 5 (Complete).

**Stop-hook enforcement:**
Before emitting any "completion" signal, the agent MUST:
1. Read `autopilot-state.json` from session-scoped path: `.hermes/agents/cxssboot/sessions/{session_id}/autopilot-state.json` (legacy fallback read-only).
2. Verify `active == true` and `phase == "complete"`.
3. Confirm `verify.violations` array is empty.
4. Confirm `verify.compile_passed == true`.
5. Confirm `iteration < max_iterations`.
6. Confirm `python3 scripts/verify_convention.py <path> --json` returns exit code 0 (real verify — violations array is raw JSON, exit code = min(1, len(violations))).

If ANY of these conditions fail, the agent MUST continue the pipeline or trigger fallback.

---

## Configuration

### State File

**Primary path:** `.hermes/agents/cxssboot/sessions/{session_id}/autopilot-state.json`

**Legacy fallback (read-only):** `.hermes/agents/cxssboot/autopilot-state.json`

**Read strategy:** session-scoped → legacy → fresh-init. On first write during a session, migrate legacy state to session-scoped path if legacy exists and is still active.

**Created by:** `/cxssboot-autopilot "<task>"` (Stage 1: Expand).

**Updated by:** Each stage transition.

**Cleared by:** Stage 5 (Complete) or `/cxssboot-autopilot cancel`.

### Related Configuration Files

| File | Purpose | Managed By |
|------|---------|------------|
| `.hermes/agents/cxssboot/caveman.conf` | Context injection depth | `/cxssboot-caveman` |
| `.hermes/agents/cxssboot/super.conf` | Reasoning depth | `/cxssboot-super` |
| `.hermes/agents/cxssboot/ctx.txt` | Generated convention context | `/cxssboot-autopilot` (Stage 1) |
| `.hermes/agents/cxssboot/sessions/{session_id}/autopilot-state.json` | Pipeline state (primary) | `/cxssboot-autopilot` |
| `.hermes/agents/cxssboot/autopilot-state.json` | Legacy state (read-only) | `/cxssboot-autopilot` (migrated) |
| `.hermes/agents/cxssboot/sessions/{session_id}/ledger.jsonl` | Append-only audit trail | `/cxssboot-autopilot` (all stages) |

### Environment Variables

| Variable | Purpose | Default |
|----------|---------|---------|
| `CXSSBOOT_AUTOPILOT_MAX_ITERATIONS` | Max pipeline iterations | `15` |
| `CXSSBOOT_AUTOPILOT_FIX_ROUNDS` | Max fix rounds in Stage 4 | `5` |
| `CXSSBOOT_AUTOPILOT_TIMEOUT` | Default timeout per stage (seconds) | `300` |

---

## State Contract

This contract is AUTHORITATIVE for autopilot, loop, and goal pipelines. Changes here apply across all 3 files.

### 1. Session-Scoped State Paths

- **New (primary):** `.hermes/agents/cxssboot/sessions/{session_id}/autopilot-state.json`
- **Legacy fallback (read-only):** `.hermes/agents/cxssboot/autopilot-state.json`
- **Read:** session-scoped → legacy → fresh-init. On first write, migrate legacy → session path.

### 2. Ledger Trail (ledger.jsonl)

Append-only audit trail at `.hermes/agents/cxssboot/sessions/{session_id}/ledger.jsonl`.

#### Ledger Schema

```jsonl
{"ts":"2026-06-30T08:00:00Z","event":"run_started","run_id":"r-001","session_id":"ses_abc","tool":"claude-code","phase":"init","detail":{}}
{"ts":"2026-06-30T08:00:05Z","event":"stage_entered","run_id":"r-001","phase":"expand","detail":{}}
{"ts":"2026-06-30T08:00:10Z","event":"stage_exited","run_id":"r-001","phase":"expand","detail":{"ctx_size_bytes":12450}}
{"ts":"2026-06-30T08:00:11Z","event":"generate_dispatched","run_id":"r-001","tool":"claude-code","phase":"generate","detail":{"files":["KbTagController.java","KbTagService.java"]}}
{"ts":"2026-06-30T08:02:00Z","event":"generate_completed","run_id":"r-001","phase":"generate","detail":{"duration_ms":109000}}
{"ts":"2026-06-30T08:02:01Z","event":"verify_result","run_id":"r-001","phase":"verify","detail":{"violations":2,"compile":"pass","bizcode":"pass","exit_code":2}}
{"ts":"2026-06-30T08:02:02Z","event":"fix_applied","run_id":"r-001","phase":"fix","detail":{"round":1,"before":2,"after":1,"file":"KbTagController.java:15","check":"CHK06","fix":"Added @Valid"}}
{"ts":"2026-06-30T08:04:00Z","event":"verify_result","run_id":"r-001","phase":"verify","detail":{"violations":0,"compile":"pass","bizcode":"pass","exit_code":0}}
{"ts":"2026-06-30T08:04:01Z","event":"observe_checkpoint","run_id":"r-001","phase":"complete","detail":{"total_duration_ms":241000,"iterations":1}}
{"ts":"2026-06-30T08:04:02Z","event":"run_completed","run_id":"r-001","phase":"complete","detail":{}}
```

**Event vocabulary:** `run_started`, `run_resumed`, `run_completed`, `run_failed`, `run_cancelled`, `stage_entered`, `stage_exited`, `guard_passed`, `guard_rejected`, `generate_dispatched`, `generate_completed`, `verify_result`, `fix_applied`, `observe_checkpoint`.

#### Ledger Events per Stage

| Stage | Events Emitted |
|-------|---------------|
| **GUARD** (entry) | `guard_passed` (proceed) or `guard_rejected` (halt) |
| **Stage 1: EXPAND** | `stage_entered`(expand) → `stage_exited`(expand) |
| **Stage 2: GENERATE** | `generate_dispatched` (tool + file list) → `generate_completed` (duration) |
| **Stage 3: VERIFY** | `verify_result` (violations count, compile status, exit code) |
| **Stage 4: FIX** | `fix_applied` (per round: before/after counts, file, check code) |
| **Stage 5: OBSERVE** | `observe_checkpoint` (total duration, iterations) → `run_completed` |
| **Failure paths** | `run_failed` (max rounds / max iterations exhausted) or `run_cancelled` (user cancel) |

### 3. Cross-Tool Invocation Block

This block is authoritative for all pipeline skills (autopilot, loop, goal). All 3 tool variants MUST be supported.

```
### Claude Code
claude -p "<task>" --append-system-prompt-file .hermes/agents/cxssboot/ctx.txt --allowedTools 'Read,Write,Edit,Bash' --max-turns 20

### OpenCode
opencode run --thinking "Context: $(cat .hermes/agents/cxssboot/ctx.txt)

Task: <task>"

### Codex
codex exec --full-auto "Constraints: $(cat .hermes/agents/cxssboot/ctx.txt)

Task: <task>"
```

### 4. verify_convention.py Contract

```bash
python3 scripts/verify_convention.py <path> --json
```

- **Exit 0** = no violations = clean. Exit code = `min(1, len(violations))`.
- **Violations output** is a raw JSON array. Do NOT wrap in `{status, violations, files_checked}`.
- **Checks (CHK01–CHK12):** soft-delete, tenant filter, @PostMapping, @Valid, CommonResult, BaseDO, jakarta, CopyUtil, @JsonFormat, @Transactional, imports order, audit fields.

---

## References

- **Parent SKILL:** `cxssboot-backend/SKILL.md` — Complete architectural DNA and conventions
- **Loop SKILL:** `cxssboot-loop/SKILL.md` — Verify+Fix iteration engine
- **Team SKILL:** `cxssboot-team/SKILL.md` — Multi-agent parallel generation
- **Goal SKILL:** `cxssboot-goal/SKILL.md` — Long-horizon goal persistence and checkpoint tracking
- **Caveman Command:** `cxssboot-caveman/SKILL.md` — Context injection depth control
- **Super Command:** `cxssboot-super/SKILL.md` — ULTRATHINK deep-reasoning protocol
- **Pattern Router:** `scripts/pattern_router.py` — Intent matching + context generation
- **Verification Script:** `scripts/verify_convention.py` — 12 automated convention checks
- **Code Templates:** `references/code-templates.md` — Exact templates for all Java layers
- **Naming Dictionary:** `references/naming-dictionary.md` — Complete naming conventions
