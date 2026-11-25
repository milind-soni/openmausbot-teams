---
name: acceptance-environment-readiness
description: Verify a local acceptance environment is actually ready.
---

# Acceptance Environment Readiness

Proves that a locally deployed acceptance instance is actually usable: the artifact runs from a stable copy with the intended datasource, the schema and seeds the product depends on exist, and one real-auth path has been exercised. Does NOT judge whether the feature itself is correct — that belongs to functional QA and the progress assessment. Complements `local-acceptance-deployment`, which owns the shared entry and ports; this covers the run, restart and readiness proof of one service.

## When to Use

- "28092 接口 500 / 返回系统异常"
- "重启一下验收实例" / "换个新包上去"
- "任务跑完了，为什么进去什么都没有 / 菜单看不到"
- "接口 000401 / 权限不对"
- "代码都好了，能开给客户了吗"
- before reporting 可交付 on any packaged backend behind a shared acceptance port

## Procedure

1. **Run a copied artifact, never `target/`.** Copy the built jar into a versioned runtime dir (`<svc>-runtime/<name>-<sha>.jar`) and start that copy. Builds repackage `target/*.jar` in place; a JVM started from there begins failing within milliseconds of the next build — `系统异常` returned at 3ms, list endpoints 500 — with nothing in the log that points at the cause.
2. **Start through a script that owns the full environment.** Keep the java path, heap, profile and every datasource/credential env var (`SPRING_DATASOURCE_URL` and friends) in one start script, and restart with that script. A hand-rebuilt launch command that drops the datasource env silently reconnects to the default cloud schema, where the new tables do not exist, and every new endpoint 500s.
3. **Prove which database the process is on** after each restart: read the datasource from the startup log (or actuator), then query a table that exists only in the intended schema. A healthy `/health` says nothing about which DB was opened.
4. **Smoke the endpoints the UI calls on first load**, not just health — and check the business code (`000000`) plus a non-zero total, not only HTTP 200.
5. **Check migrations in every schema the code will reach** (`SHOW TABLES LIKE '<table>'`). Passing tests on H2 never creates the table in stg, and a missing table usually only fails on the rollback/recovery path that tests do not walk.
6. **Check seeds at all three levels** — permission rows, role grants, plan grants. Menu visibility is a role ⋈ plan inner join: permission rows alone (e.g. 8 of 18) leave the entry blank and every call returns `000401` while code and tests stay green.
7. **Exercise one real-login path.** Under `acceptance.no-auth=true` nothing tests 401/403 or cross-tenant denial; report "authz unverified" rather than "authz passed" until a real token has been refused where it should be.
8. **Report as 代码完成 + the non-code blockers**, each with its measured reading (8/18 permission rows, 0 role grants, table absent in three schemas), and ask for the decisions only the person can make — authorizing writes into the target DB, and which plan/package enables the feature.

## Pitfalls

- Never start a service from `target/`: the artifact is replaced under the running process and the failure looks like a code bug.
- A restart that drops env vars is silent — the app boots healthy against the wrong schema.
- Health 200 does not mean right DB; the datasource has to be read back from the process itself.
- Green tests do not mean a migrated environment; verify each target schema separately.
- Seeding permissions without role and plan grants leaves the menu empty; `000401` on every API is the symptom, not a code defect.
- A `no-auth` acceptance profile makes 401/403 and cross-tenant denial untested — do not fold it into a verified column.
- Killing the old PID and launching the new one in the same breath can leave the port held; check the listener (`lsof -nP -p <pid> | grep LISTEN`) before concluding the new process failed to boot.

## Verification

After the restart, the product's first-load endpoint returns its business code with non-zero data, the process's own startup log/actuator names the intended schema, `SHOW TABLES` for the newest migration returns a row on every target schema, and permission / role-grant / plan-grant counts are all non-zero — every one of those read after the restart, not before it.
