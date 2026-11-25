---
name: cxssboot-team
description: "Multi-agent parallel code generation for cxssboot backend projects. Leader-Follower pattern: lead decomposes backend task into file-level subtasks, spawns worker agents for parallel generation of independent files, then verifies consistency via verify_convention.py. Absorbs parallel execution semantics — use this instead of a separate parallel toggle."
version: 1.0.0
author: Hermes Agent
license: MIT
metadata:
  hermes:
    tags: [cxssboot, backend, java, multi-agent, team, parallel, code-generation]
    related_skills: [cxssboot-backend, cxssboot-loop, cxssboot-autopilot]
---

# cxssboot-team — 多 Agent 并行代码生成 (Leader-Follower)

This SKILL implements a **Leader-Follower** multi-agent pattern for cxssboot backend code generation. When a task requires generating multiple Java files (e.g., a full CRUD = 7 files), the lead AI decomposes the task into file-level subtasks, assigns them to worker sub-agents for parallel generation, then verifies consistency across all generated files.

> **Absorbs `/cxssboot-parallel`**: Parallel execution is the team's mechanism, not a separate global toggle. Any task that would have used a "parallel" mode now uses `/cxssboot-team`.

---

## Quick Start

```bash
# Spawn 3 workers for a full CRUD in kb module
/cxssboot-team 3 "在 kb 模块新增 KbTag 的完整 CRUD"

# Auto-calculate worker count (default: one per independent file group)
/cxssboot-team "在 kb 模块新增 KbTag 的完整 CRUD"
```

**What happens:**
1. Lead decomposes task into 7 file-level subtasks
2. Lead spawns worker agents (max N, default auto)
3. Workers generate files in parallel waves
4. Lead runs `verify_convention.py` + `mvn compile` + bizcode check
5. Lead shuts down workers

---

## Team Roles

### Lead (主 AI Agent)

| Responsibility | Action |
|---------------|--------|
| **Decompose** | Break task into file-level subtasks with dependencies |
| **Assign** | Create task list, spawn workers with specific file targets |
| **Monitor** | Track worker completion via task status |
| **Verify** | Run `verify_convention.py` across ALL generated files |
| **Shutdown** | Signal completion, terminate workers |

### Worker (子 Agent)

| Responsibility | Action |
|---------------|--------|
| **Generate ONE file** | Receive preamble + file target, generate single Java file |
| **Report** | Mark task complete, return file path + status |
| **Stand by** | Wait for next assignment or shutdown signal |

---

## Task Decomposition


### Full CRUD Decomposition (11 files with tests)

```
Task: 在 kb 模块新增 KbTag 的完整 CRUD (含 TDD 测试)

Decomposition:
├── T1: KbTagDO (Entity)                              [independent]
├── T2: KbTagMapper (Mapper)                          [depends: T1]
├── T3: KbTagService (Service interface)               [depends: T2]
├── T4: KbTagServiceImpl (ServiceImpl)                 [depends: T3]
├── T5: KbTagController (Controller)                   [depends: T4]
├── T6: KbTagAddRequest / KbTagUpdateRequest (Request) [independent]
├── T7: KbTagVO / KbTagPageVO (VO)                    [independent]
├── T8: KbTagServiceImplTest (Service Unit Test)       [depends: T4 — RED phase]
├── T9: KbTagControllerIntegrationTest (Integration Test) [depends: T5 — RED phase]
├── T10: KbTagMapperTest (Mapper Test)                  [depends: T2]
└── T11: KbTagControllerTest (Controller Unit Test)    [depends: T5]
```

### Dependency Graph (with TDD layers)

```
Wave 1 (parallel):  T1 → T6 → T7
Wave 2 (parallel):  T2 → T3
Wave 3 (parallel):  T4
Wave 4 (parallel):  T5 + T8 + T10    ← T8/T10 = RED phase (tests fail, verify failure)
Wave 5 (parallel):  T9 → T11         ← 集成测试
```

**TDD Rule:** Tests (T8-T11) deployed in Wave 4-5 as RED. After code implementation (GREEN), re-verify all tests pass.

**Rule:** Controller MUST wait for ServiceImpl. Entity, VO, Request can run in parallel with Mapper/Service chain.

---

## Parallel Execution Waves

The lead schedules workers in waves to maximize parallelism while respecting dependencies.

### Wave Scheduling

```python
# Pseudo-code for lead's wave scheduler
waves = [
    # Wave 1: Independent files (no dependencies)
    [T1_KbTagDO, T6_Request, T7_VO],
    # Wave 2: Mapper + Service interface (depend on Entity)
    [T2_KbTagMapper, T3_KbTagService],
    # Wave 3: ServiceImpl (depends on Service interface)
    [T4_KbTagServiceImpl],
    # Wave 4: Controller (depends on ServiceImpl)
    [T5_KbTagController]
]

for wave in waves:
    spawn_workers(wave)  # Parallel within wave
    wait_for_completion(wave)  # Barrier before next wave
```

### Worker Count Convention

| Input | Behavior |
|-------|----------|
| `/cxssboot-team 3 "..."` | Spawn exactly 3 workers |
| `/cxssboot-team "..."` | Auto-calculate: one worker per independent file group |

**Auto-calculation:** Count independent file groups in decomposition. For a 7-file CRUD with 3 independent groups (Entity+VO+Request, Mapper+Service, ServiceImpl, Controller), default to 4 workers.

---

## Worker Preamble

Each worker receives this system prompt before generating its file:

```markdown
## Worker Preamble — cxssboot-team

You are a cxssboot backend code generation worker. Generate EXACTLY ONE file.

### Context (injected by lead)
- Module: {module} (e.g., kb, system, rag, base)
- Entity: {Entity} (e.g., KbTag)
- File to generate: {file_type} (e.g., Entity, Mapper, Service, ServiceImpl, Controller, Request, VO)
- Target path: src/main/java/com/cxssboot/{module}/{package}/{FileName}.java

### cxssboot Conventions (MANDATORY)
1. Soft-delete filter: `.eq(DO::getDeleted, DeleteEnum.NOT_DELETE.getCode())`
2. Multi-tenant filter: `.eq(DO::getTenantId, SecurityUtil.getTenantId())`
3. `@PostMapping` only — no GET/PUT/DELETE
4. `@Valid` on `@RequestBody`
5. `CommonResult<T>` always
6. Entity extends `BaseDO`
7. Jakarta validation: `jakarta.validation.constraints.*`
8. `CopyUtil.copy()` — NO BeanUtils.copyProperties
9. Long ID → `@JsonFormat(shape = JsonFormat.Shape.STRING)`
10. `@Transactional(rollbackFor = Exception.class)` on mutations

### Your Task
Generate the {file_type} file for {Entity} following cxssboot conventions.
Return ONLY the file content. No explanations.
```

---

## Consistency Verification

After all workers finish, the lead runs verification across ALL generated files.

### Verification Pipeline

```bash
# 1. Convention check (14 automated checks: CHK01-CHK14)
python3 scripts/verify_convention.py src/main/java/com/cxssboot/{module}/ --json

# 2. Compile check
mvn compile -pl cxssboot-module-{module} -am

# 3. Test verification (RED→GREEN cycle)
mvn test -pl cxssboot-module-{module} -am

# 4. Bizcode collision check (if new bizcodes added)
python3 scripts/pattern_router.py --check-bizcode {new_bizcode}
```

### Verification Checklist

| Check | Command | Pass Condition |
|-------|---------|----------------|
| Convention + Comments | `verify_convention.py` | 0 violations (CHK01-CHK14) |
| Compile | `mvn compile` | Exit 0 |
| Unit + Integration Tests | `mvn test` | Exit 0, 0 failures |
| Bizcode | `--check-bizcode` | No collision |
| Dependencies | Task list review | All tasks completed |

**If any check fails:** Lead reports failures, spawns fix workers, re-verifies.

---

## Shutdown Protocol

1. **All workers complete** — Lead confirms all tasks marked `completed`
2. **Verification passes** — All 3 checks (convention, compile, bizcode) pass
3. **Lead signals shutdown** — Sends completion message to all workers
4. **Workers acknowledge** — Workers confirm shutdown
5. **Final report** — Lead outputs summary:

```markdown
## /cxssboot-team Complete

Generated files:
- src/main/java/com/cxssboot/{module}/entity/KbTagDO.java
- src/main/java/com/cxssboot/{module}/mapper/KbTagMapper.java
- src/main/java/com/cxssboot/{module}/service/KbTagService.java
- src/main/java/com/cxssboot/{module}/service/impl/KbTagServiceImpl.java
- src/main/java/com/cxssboot/{module}/controller/KbTagController.java
- src/main/java/com/cxssboot/{module}/domain/KbTagAddRequest.java
- src/main/java/com/cxssboot/{module}/domain/KbTagVO.java

Verification:
- verify_convention.py: 0 violations
- mvn compile: SUCCESS
- bizcode check: PASS
```

---

## When to Use vs `/cxssboot-loop`

| Command | Use Case | Mechanism |
|---------|----------|-----------|
| `/cxssboot-team` | Multi-file parallel generation (CRUD = 7 files) | Leader-Follower, parallel waves |
| `/cxssboot-loop` | Single-file or iterative fix cycles | Self-referential loop, sequential |

**Decision tree:**
```
Task requires generating multiple files?
├─ YES → /cxssboot-team
└─ NO → /cxssboot-loop (or single agent)
```

**Examples:**
- `/cxssboot-team` — "新增 KbTag 完整 CRUD" (7 files)
- `/cxssboot-loop` — "修复 KbTagController 的权限校验 bug" (1 file, iterative)

---

## Iron Law

When this SKILL is loaded in a cxssboot backend code generation session, the AI MUST:

1. **Detect multi-file tasks** — If the task requires 2+ Java files, invoke team pattern
2. **Decompose with dependencies** — Break into file-level tasks, identify dependencies
3. **Spawn workers in waves** — Parallelize independent files, serialize dependent ones
4. **Verify ALL files** — Run `verify_convention.py` + `mvn compile` + bizcode check
5. **Shutdown cleanly** — Signal completion, terminate workers, report results

> **If you are generating cxssboot Java files sequentially when they could be parallelized, STOP. Use `/cxssboot-team`.**

---

## Anti-Patterns

| ❌ Forbidden | ✅ Required |
|-------------|-----------|
| Sequential generation of independent files | Parallel waves for independent files |
| Controller before ServiceImpl | Respect dependency graph |
| Skip verification after generation | Always run verify_convention.py |
| Leave workers running | Shutdown protocol mandatory |
| Single worker for 7-file CRUD | Auto-calculate or specify N |

---

## References

- `scripts/pattern_router.py` — Intent matching + context generation
- `scripts/verify_convention.py` — 12 automated convention checks
- `references/code-templates.md` — Exact templates for all Java layers
- Parent SKILL: `cxssboot-backend/SKILL.md` — Full architectural DNA
