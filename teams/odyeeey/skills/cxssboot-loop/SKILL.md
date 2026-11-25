---
name: cxssboot-loop
description: "PRD-driven verification loop for cxssboot backend code generation. Defines acceptance criteria (verify_convention.py 0 violations + compile + bizcode check), generates code, verifies, fixes, and iterates until all gates pass. Max 10 iterations. Integrates with /cxssboot-caveman and /cxssboot-super for context and reasoning depth."
version: 1.0.0
author: Hermes Agent
license: MIT
metadata:
  hermes:
    tags: [cxssboot, backend, java, verification, loop, code-generation, quality-gate]
    related_skills: [cxssboot-backend, cxssboot-caveman, cxssboot-super, cxssboot-autopilot, cxssboot-goal]
---

# cxssboot-loop — PRD-Driven Verification Loop

> **主文档:** `SKILL.md` §19 Super Mode — 完整五维推理协议、正交矩阵、与 King Mode 的关系映射
> **互补系统:** `/cxssboot-caveman` 控制输出风格，`/cxssboot-super` 控制推理深度。两者正交，可组合。

When invoked via `/cxssboot-loop`, activate the PRD-driven verification loop for cxssboot backend code generation. The loop defines acceptance criteria, generates code, runs verification, fixes violations, and iterates until ALL gates pass or the iteration budget is exhausted.

---

## Quick Start

```bash
# Start a verification loop for a specific task
/cxssboot-loop start "在 kb 模块新增 KbTag 的完整 CRUD"

# Check loop status
/cxssboot-loop status

# Cancel an active loop
/cxssboot-loop cancel
```

**One-liner equivalent:**
```bash
python3 scripts/pattern_router.py "在 kb 模块新增 KbTag 的完整 CRUD" --module kb --loop
```

---

## Loop Phases

```
/cxssboot-loop start "<task>"
  │
  ├─ Phase 1: INIT
  │     ├─ Parse task description
  │     ├─ Load caveman.conf (context depth)
  │     ├─ Load super.conf (reasoning depth)
  │     ├─ Initialize loop-state.json
  │     └─ Define acceptance criteria (verification gate)
  │
  ├─ Phase 2: GENERATE
  │     ├─ Route task through pattern_router.py
  │     ├─ Inject context at configured caveman level
  │     ├─ Activate super mode if configured
  │     └─ Generate code via AI tool delegation
  │
  │     ### Claude Code
  │     claude -p "<task>" --append-system-prompt-file .hermes/agents/cxssboot/ctx.txt --allowedTools 'Read,Write,Edit,Bash' --max-turns 20
  │
  │     ### OpenCode
  │     opencode run --thinking "Context: $(cat .hermes/agents/cxssboot/ctx.txt)
  │
  │     Task: <task>"
  │
  │     ### Codex
  │     codex exec --full-auto "Constraints: $(cat .hermes/agents/cxssboot/ctx.txt)
  │
  │     Task: <task>"
  │
  ├─ Phase 3: VERIFY
  │     ├─ Run verify_convention.py --json
  │     ├─ Parse violations (CHK01-CHK12)
  │     ├─ Run bizcode collision check
  │     └─ Run mvn compile (or gradle build)
  │
  ├─ Phase 4: FIX
  │     ├─ Categorize violations by severity
  │     ├─ Generate minimal fixes (surgical changes)
  │     ├─ Re-run verify_convention.py after each fix batch
  │     └─ Update loop-state.json with current violations
  │
  ├─ Phase 5: REPEAT
  │     ├─ iteration < max_iterations?
  │     │     YES → return to Phase 2 (GENERATE)
  │     │     NO → Phase 6 (FALLBACK)
  │     └─ violations == 0?
  │           YES → Phase 6 (COMPLETE)
  │
  └─ Phase 6: COMPLETE / FALLBACK
        ├─ COMPLETE: All gates green, report success
        └─ FALLBACK: Max iterations reached, escalate to human
```

---

## Loop State Machine

Loop state is persisted to `.hermes/agents/cxssboot/sessions/{session_id}/loop-state.json` (legacy fallback: `.hermes/agents/cxssboot/loop-state.json`, read-only for resume):

```json
{
  "active": true,
  "iteration": 3,
  "max_iterations": 10,
  "task_description": "在 kb 模块新增 KbTag 的完整 CRUD",
  "phase": "verify",
  "current_violations": [
    {
      "check": "CHK03",
      "file": "src/main/java/com/cxssboot/kb/controller/KbTagController.java",
      "line": 15,
      "message": "Missing @Valid on @RequestBody",
      "severity": "HIGH"
    }
  ],
  "session_id": "ses_abc123",
  "started_at": "2026-06-30T04:00:00Z",
  "last_verified_at": "2026-06-30T04:02:30Z"
}
```

**State transitions:**
- `init` → `generate` → `verify` → `fix` → `verify` → ... → `complete` | `fallback`
- `cancel` → `cancelled` (immediate termination, cleanup)

---

## Verification Gate

All checks must pass (exit 0) before declaring completion:

> **NOTE:** The real `verify_convention.py --json` contract: exit 0 = clean (empty JSON array). Exit code = min(1, len(violations)).

---

### 0. TDD Cycle Gate (RED→GREEN→REFACTOR)

**Before generation**, the loop MUST plan TDD cycles:

| Step | Action | Gate |
|------|--------|------|
| RED | Write failing test for each new Service method | Test compiles but fails |
| GREEN | Generate minimal implementation | Test passes |
| REFACTOR | verify_convention.py + optimize | 0 violations + test still passes |

**TDD 验证命令**:
```bash
# 验证 RED 阶段（测试文件存在且编译通过）
mvn test-compile -pl cxssboot-module-{module} -am

# 验证 GREEN 阶段（全部测试通过）
mvn test -pl cxssboot-module-{module} -am
```

---

### 1. Convention Checks (verify_convention.py — 14 automated checks)

| Check | Code | Description | Severity |
|-------|------|-------------|----------|
| Soft-delete filter | CHK01 | `.eq(DO::getDeleted, DeleteEnum.NOT_DELETE.getCode())` on every query | HIGH |
| Multi-tenant filter | CHK02 | `.eq(DO::getTenantId, SecurityUtil.getTenantId())` on every query | HIGH |
| Jakarta validation | CHK03 | `jakarta.validation.constraints.*` imports only (no javax) | HIGH |
| @PostMapping only | CHK04 | No GET/PUT/DELETE mappings | HIGH |
| Entity extends BaseDO | CHK05 | All entities extend `BaseDO` | HIGH |
| @Valid on RequestBody | CHK06 | `@Valid` present on every `@RequestBody` | HIGH |
| CommonResult<T> | CHK07 | Controller returns `CommonResult<T>` | HIGH |
| CopyUtil usage | CHK08 | No `BeanUtils.copyProperties`; use `CopyUtil.copy()` | MEDIUM |
| @JsonFormat on Long IDs | CHK09 | Long IDs annotated with `@JsonFormat(shape = STRING)` | MEDIUM |
| @Transactional rollbackFor | CHK10 | `@Transactional(rollbackFor = Exception.class)` on mutations | HIGH |
| Import order | CHK11 | Java → Spring → Third-party → Common → Module | LOW |
| No javax imports | CHK12 | Zero `javax.*` imports | HIGH |
| Chinese comments | CHK13 | Public classes/methods have Chinese Javadoc; key logic has inline comments | HIGH |
| Test file presence | CHK14 | *ServiceImpl has *ServiceImplTest; *Controller has *IntegrationTest | HIGH |


**Command:**
```bash
python3 scripts/verify_convention.py src/main/java/com/cxssboot/<module>/ --json
```

**Expected output (clean):**
```json
{"status": "clean", "violations": [], "files_checked": 12}
```

**Expected output (violations):**
```json
{
  "status": "violations_found",
  "violations": [
    {
      "check": "CHK03",
      "file": "src/main/java/com/cxssboot/kb/controller/KbTagController.java",
      "line": 15,
      "message": "Missing @Valid on @RequestBody",
      "severity": "HIGH"
    }
  ],
  "files_checked": 12
}
```

### 2. Bizcode Collision Check

```bash
python3 scripts/pattern_router.py --check-bizcode <new_bizcode>
```

**Requirement:** No collision with existing bizcodes in `data/bizcodes.csv`.

### 3. Test Gate

```bash
# Unit tests must pass (GREEN phase)
mvn test -pl cxssboot-module-<module> -am
```

**Requirement:** Exit 0, no test failures.

### 4. Compile Check

```bash
# Maven
mvn compile -pl cxssboot-module-<module> -am -q
```

**Requirement:** Exit 0, no compilation errors.

---

## Integration with Caveman/Super
### Caveman Integration (Context Depth)

**Read from:** `.hermes/agents/cxssboot/caveman.conf`

```json
{
  "default_level": "medium",
  "updated_at": "2026-06-30T04:00:00Z"
}
```

**Effect on loop:**
- `full` → All layers included in context injection (Event, Enum, PageVO, StatusRequest)
- `medium` → Skip Event, Enum, PageVO, StatusRequest (core layers only)
- `minimal` → Controller, Service, ServiceImpl, Entity, Mapper, VO only

**Command to check/set:**
```bash
python3 scripts/pattern_router.py --caveman-status
python3 scripts/pattern_router.py --caveman-set <level>
```

### Super Integration (Reasoning Depth)

**Read from:** `.hermes/agents/cxssboot/super.conf`

```json
{
  "mode": "surface",
  "updated_at": "2026-06-30T04:00:00Z"
}
```

**Effect on loop:**
- `surface` → Standard reasoning (default, faster)
- `deep` → Five-dimension ULTRATHINK protocol (business correctness, concurrency safety, data consistency, scalability, observability)

**Command to check/set:**
```bash
python3 scripts/pattern_router.py --super-status
python3 scripts/pattern_router.py --super-set <mode>
```

### Combined Effect

| Caveman | Super | Use Case |
|---------|-------|----------|
| full | surface | New module, complex feature (default) |
| medium | surface | Standard CRUD, quick iteration |
| minimal | surface | POC, scaffolding |
| full | deep | Security-critical code, complex refactoring |
| medium | deep | Standard CRUD with deep verification |
| minimal | deep | POC with quality gate |

---

## Iteration Budget & Fallback

### Max Iterations: 10

The loop will iterate up to 10 times. After each iteration:

1. **Check violations count:**
   - `violations == 0` → COMPLETE (success)
   - `violations > 0` → Continue to next iteration (if budget remains)

2. **Check iteration count:**
   - `iteration < 10` → Continue loop
   - `iteration == 10` → FALLBACK (human intervention required)

### Fallback Protocol

When max iterations is reached with remaining violations:

```
FALLBACK TRIGGERED
├─ Iteration: 10/10
├─ Remaining violations: 3
│   ├─ CHK03: Missing @Valid on @RequestBody (HIGH)
│   ├─ CHK09: Missing @JsonFormat on Long ID (MEDIUM)
│   └─ CHK11: Import order violation (LOW)
├─ Action: Escalate to human
└─ Output: loop-state.json + violation report + suggested fixes
```

**Human intervention required:**
1. Review remaining violations in `.hermes/agents/cxssboot/loop-state.json`
2. Apply manual fixes or adjust acceptance criteria
3. Re-run loop with `/cxssboot-loop start "<task>"` or resume from last iteration

---

## Sub-commands

### `/cxssboot-loop start "<task_description>"`

Start a new verification loop.

**Arguments:**
- `task_description` (required): Natural language description of the code generation task

**Behavior:**
1. Initialize loop-state.json with task description
2. Set iteration = 0, max_iterations = 10
3. Begin Phase 1 (INIT)
4. Enter loop: GENERATE → VERIFY → FIX → REPEAT

**Example:**
```
/cxssboot-loop start "在 kb 模块新增 KbTag 的完整 CRUD"
```

### `/cxssboot-loop status`

Show current loop status.

**Output:**
```
Loop Status: ACTIVE
├─ Task: 在 kb 模块新增 KbTag 的完整 CRUD
├─ Iteration: 3/10
├─ Phase: verify
├─ Violations: 1 (CHK03: Missing @Valid on @RequestBody)
├─ Started: 2026-06-30T04:00:00Z
└─ Last verified: 2026-06-30T04:02:30Z
```

**If no active loop:**
```
No active loop. Use /cxssboot-loop start "<task>" to begin.
```

### `/cxssboot-loop cancel`

Cancel the active loop immediately.

**Behavior:**
1. Set `active: false` in loop-state.json
2. Set `phase: "cancelled"`
3. Clean up temporary files (if any)
4. Report cancellation to user

**Example:**
```
/cxssboot-loop cancel
✅ Loop cancelled. Iteration 3/10, 1 remaining violation.
```

---

## Iron Law

When this skill is loaded, the agent **MUST NOT** declare completion until the verification gate is fully green:

```
VERIFICATION GATE (ALL MUST PASS):
├─ [ ] verify_convention.py --json → status: "clean" (0 violations)
├─ [ ] bizcode collision check → no collisions
├─ [ ] mvn compile → exit 0
└─ [ ] iteration count < 10
```

**Prohibited actions (will trigger loop continuation or fallback):**
- ❌ Declaring "done" with violations remaining
- ❌ Skipping verify_convention.py because "it's probably fine"
- ❌ Stopping at iteration 5/10 because "it's close enough"
- ❌ Ignoring CHK01/CHK02 (soft-delete/tenant) because "they're minor"
- ❌ Declaring success without running the actual verification commands

**Required actions:**
- ✅ Run `python3 scripts/verify_convention.py <path> --json` after EVERY code generation
- ✅ Parse the JSON output and check `status == "clean"`
- ✅ Fix ALL violations before proceeding to next iteration
- ✅ Re-run verification after each fix batch
- ✅ Only declare completion when ALL gates pass

**Stop-hook enforcement:**
Before emitting any "completion" signal, the agent MUST:
1. Read `.hermes/agents/cxssboot/loop-state.json`
2. Verify `active == true` and `phase == "complete"`
3. Confirm `current_violations` array is empty
4. Confirm `iteration < max_iterations`

If ANY of these conditions fail, the agent MUST continue the loop or trigger fallback.

---

## Formal Stop-Hook Enforcement

```
┌─────────────────────────────────────────────────────────────┐
│                    STOP-HOOK GATE                           │
├─────────────────────────────────────────────────────────────┤
│  Before emitting ANY "completion" signal, verify:           │
│                                                             │
│  1. loop-state.json exists and active == true               │
│  2. phase == "complete"                                     │
│  3. current_violations array is empty                       │
│  4. iteration < max_iterations                              │
│                                                             │
│  If ANY check fails → CONTINUE LOOP or FALLBACK             │
│  If ALL pass → emit completion signal                       │
└─────────────────────────────────────────────────────────────┘
```

**State path:** `.hermes/agents/cxssboot/sessions/{session_id}/loop-state.json`  
**Legacy fallback:** `.hermes/agents/cxssboot/loop-state.json` (read-only resume)

**Stale state TTL:** 2 hours. If `last_verified_at` is older than 2 hours, treat state as stale and re-verify from scratch.

**Cancel detection:** If `phase == "cancelled"` or `active == false`, immediately halt all work and report cancellation to user.

---

## Configuration

### Loop State File

**Location:** `.hermes/agents/cxssboot/loop-state.json`

**Created by:** `/cxssboot-loop start` (Phase 1: INIT)

**Updated by:** Each loop iteration (Phase 3: VERIFY, Phase 4: FIX)

**Deleted by:** `/cxssboot-loop cancel` or loop completion

### Related Configuration Files

| File | Purpose | Managed By |
|------|---------|------------|
| `.hermes/agents/cxssboot/caveman.conf` | Context injection depth | `/cxssboot-caveman` |
| `.hermes/agents/cxssboot/super.conf` | Reasoning depth | `/cxssboot-super` |
| `.hermes/agents/cxssboot/loop-state.json` | Loop state | `/cxssboot-loop` |

### Environment Variables

| Variable | Purpose | Default |
|----------|---------|---------|
| `CXSSBOOT_LOOP_MAX_ITERATIONS` | Override max iterations | `10` |
| `CXSSBOOT_LOOP_VIOLATION_LIMIT` | Stop if violations exceed this count | `50` |
| `CXSSBOOT_LOOP_AUTO_FIX` | Enable automatic fix generation | `true` |

---

## Error Handling

### verify_convention.py Not Found

```
ERROR: verify_convention.py not found at scripts/verify_convention.py
├─ Action: Run from cxssboot-backend root directory
└─ Fallback: Manual verification against §13 checklist
```

### Pattern Router Failure

```
ERROR: pattern_router.py execution failed
├─ Action: Check Python environment, verify scripts/ directory exists
└─ Fallback: Manual code generation with convention context
```

### Compile Failure

```
ERROR: mvn compile failed (exit code 1)
├─ Action: Review compilation errors, fix syntax/type errors
└─ Note: Compile errors do NOT count as convention violations
```

### Max Iterations Reached

```
FALLBACK: Max iterations (10) reached with remaining violations
├─ Remaining violations: 3
├─ Action: Human intervention required
└─ Next step: Review loop-state.json, apply manual fixes, re-run loop
```

---

## Examples

### Example 1: Successful Loop (3 iterations)

```
/cxssboot-loop start "在 kb 模块新增 KbTag 的完整 CRUD"

[Iteration 1]
├─ GENERATE: Code generated via pattern_router.py
├─ VERIFY: verify_convention.py → 5 violations
│   ├─ CHK03: Missing @Valid (2 files)
│   ├─ CHK09: Missing @JsonFormat (1 file)
│   └─ CHK11: Import order (2 files)
├─ FIX: Applied fixes
└─ REPEAT: iteration 2/10

[Iteration 2]
├─ GENERATE: No changes needed (fix-only iteration)
├─ VERIFY: verify_convention.py → 1 violation
│   └─ CHK11: Import order (1 file)
├─ FIX: Fixed import order
└─ REPEAT: iteration 3/10

[Iteration 3]
├─ GENERATE: No changes needed
├─ VERIFY: verify_convention.py → 0 violations ✅
├─ BIZCODE: No collisions ✅
├─ COMPILE: mvn compile → exit 0 ✅
└─ COMPLETE: All gates green ✅
```

### Example 2: Fallback Triggered

```
/cxssboot-loop start "在 system 模块新增 SysUser 的完整 CRUD"

[Iteration 1-10]
├─ GENERATE: Code generated
├─ VERIFY: verify_convention.py → 2 persistent violations
│   ├─ CHK01: Soft-delete filter missing in custom query
│   └─ CHK02: Multi-tenant filter missing in custom query
├─ FIX: Attempted fixes (iterations 2-9)
└─ REPEAT: iteration 10/10

FALLBACK TRIGGERED
├─ Max iterations reached
├─ Remaining violations: 2 (CHK01, CHK02)
├─ Action: Human intervention required
└─ Review: .hermes/agents/cxssboot/loop-state.json
```

---

## References

- **Parent SKILL:** `SKILL.md` — Complete cxssboot-backend convention specification
- **Verification Script:** `scripts/verify_convention.py` — 12 automated convention checks
- **Pattern Router:** `scripts/pattern_router.py` — Intent matching + code generation
- **Goal Command:** `cxssboot-goal/SKILL.md` — Multi-goal persistence workflow
- **Caveman Command:** `cxssboot-caveman/SKILL.md` — Context injection depth control
- **Super Command:** `cxssboot-super/SKILL.md` — ULTRATHINK deep-reasoning protocol
- **Code Templates:** `references/code-templates.md` — Exact templates for all Java layers
- **Naming Dictionary:** `references/naming-dictionary.md` — Complete naming conventions
