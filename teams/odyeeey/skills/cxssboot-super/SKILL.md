---
name: cxssboot-super
description: "Activate ULTRATHINK deep-reasoning protocol for cxssboot code generation. Five-dimension analysis: business correctness, concurrency safety, data consistency, scalability, observability. Trigger: '/cxssboot-super', '/cxssboot-ultrathink', 'super mode', '深度推理', 'king mode', 'ULTRATHINK'."
version: 1.0.0
platforms: [linux, macos]
metadata:
  tags: [cxssboot, super, ultrathink, deep-reasoning, king-mode, code-quality, architecture]
---

# cxssboot-super — ULTRATHINK Deep-Reasoning Protocol

> **来源:** 基于 [broterki/gemini3-king-mode](https://github.com/broterki/gemini3-king-mode) 的 ULTRATHINK 协议，深度改造为 cxssboot 后端工程语境。
> **主文档:** `SKILL.md` §19 Super Mode — 完整五维推理协议、正交矩阵、与 King Mode 的关系映射
> **互补系统:** `/cxssboot-caveman` 控制输出风格，`/cxssboot-super` 控制推理深度。两者正交，可组合。

When invoked via `/cxssboot-super`, activate the five-dimension ULTRATHINK protocol for all subsequent Java code generation, modification, review, or refactoring.

---

## 执行流程

```
/cxssboot-super <level> 被调用
  │
  ├─ 参数: deep | surface | status | off
  │     deep: 激活五维推理
  │     surface: 默认模式
  │     status: 显示当前状态
  │     off: 等同于 surface
  │     无参数: 切换 deep ↔ surface
  │
  ├─ Step 1: 判断当前状态
  │     读取持久化状态文件（如有）或默认 surface
  │
  ├─ Step 2: 持久化设置
  │     ✅ Implemented — `python3 scripts/pattern_router.py --super-set <level>`
  │     写入 `.hermes/agents/cxssboot/super.conf`（跨 session 持久化）
  │
  └─ Step 3: 确认 + 能力提示
        显示当前模式 + 五维框架速查 + 响应模板
```

---

## 五维推理框架（cxssboot 适配版）

> **禁止表面推理。** 每个维度必须深挖到不可辩驳的证据层。如果推理过程感觉"轻松"，则挖掘不够深。

### ① 业务正确性

| 检查点 | 深度要求 |
|--------|---------|
| 全 CRUD 场景覆盖 | 新增/查询/修改/删除/批量/状态变更 — 每种操作是否完整 |
| 边界条件 | 空参数 / null / 越界 / 重复 / 并发冲突 — 每一类是否有防御 |
| 状态机完整性 | 枚举状态是否闭环？非法状态转换是否被拦截？ |
| 权限模型 | @PreAuthorize 是否正确？租户隔离是否完整？ |

**禁止:** 只考虑"正常路径"。必须同时考虑每个操作的失败模式。

### ② 并发与事务安全

| 检查点 | 深度要求 |
|--------|---------|
| 事务边界 | @Transactional(rollbackFor=Exception.class) 是否覆盖所有写操作？嵌套事务是否正确传播？ |
| 锁策略 | 乐观锁（version 字段）vs 悲观锁（SELECT FOR UPDATE）— 选择依据是什么？ |
| 读已提交 | 多表查询是否存在读写不一致窗口？是否需要加锁或使用数据库约束？ |
| 幂等性 | 重复请求是否产生副作用？是否有防重机制？ |

**禁止:** 假设单线程执行。每个 SQL 都要问"如果此时另一个请求同时执行会怎样？"

### ③ 数据一致性

| 检查点 | 深度要求 |
|--------|---------|
| 软删除完整性 | 每一条 LambdaQueryWrapper 是否包含 `.eq(DO::getDeleted, DeleteEnum.NOT_DELETE.getCode())` |
| 租户隔离 | 是否包含 `.eq(DO::getTenantId, SecurityUtil.getTenantId())` |
| 多表事务 | 跨表操作是否在同一事务边界内？失败时是否全部回滚？ |
| 审计字段 | updatePersonId / updatePerson / updateDate 是否在每次部分更新时设置？ |

**禁止:** 跳过任何全局规则（§6 10 条铁律）。Super 模式下每条规则必须逐条验证。

### ④ 可扩展性与性能

| 检查点 | 深度要求 |
|--------|---------|
| 单一职责 | Service 方法是否只做一件事？是否有隐式的副作用？ |
| N+1 查询 | 批量操作是否使用批量查询而非循环单条？是否存在隐藏的 N+1？ |
| 索引覆盖 | 查询条件是否被索引覆盖？ORDER BY 字段是否在索引中？ |
| 分页正确性 | PageRequest 是否正确继承？total 计算是否准确？ |
| API 契约 | 接口变更是否破坏向后兼容？VO 结构是否需要版本管理？ |

**禁止:** "暂时能用就行"。Super 模式下必须考虑 10x 数据量下的行为。

### ⑤ 可观测性

| 检查点 | 深度要求 |
|--------|---------|
| 日志完整性 | 关键操作是否有 `log.info("描述：{}", var)` 埋点？异常是否含上下文？ |
| traceId 传播 | 跨服务调用时 traceId 是否完整传递？ |
| 异常处理 | 异常是被正确抛出还是被吞？BizException 的 code 是否正确？ |
| 关键指标 | 是否需要添加耗时统计或计数器？ |

**禁止:** `try {} catch (Exception e) {}` 空处理。每个异常处理必须明确其目的。

---

## 响应格式模板

### Surface（默认）— 当前行为

```
[Rationale] 一行说明
[Code] 严格按 cxssboot 规范 + verify_convention.py 自检
```

### Deep（/cxssboot-super deep）— 五维推理

```
[Deep Reasoning Chain]
  ① 业务正确性: [分析每个操作路径的覆盖度 + 边界条件]
  ② 并发与事务安全: [事务边界分析 + 锁策略 + 幂等性]
  ③ 数据一致性: [软删除/租户/审计字段逐条验证 + 多表事务边界]
  ④ 可扩展性与性能: [N+1 检测 + 索引分析 + 10x 数据量评估]
  ⑤ 可观测性: [日志埋点 + traceId + 异常不被吞]
  ⚡ 推理深度: [自评是否触及不可辩驳层。如果某维度过浅，标注"需深挖"]

[Edge Cases]
  - [边界条件1]: [预防方案]
  - [边界条件2]: [预防方案]

[Verifiable Success Criteria]
  - [ ] verify_convention.py 0 violations（硬门槛）
  - [ ] 全局规则 §6 逐条通过
  - [ ] 五维自检全部通过
  - [ ] 代码可直接合并

[Code]
  [严格按 cxssboot 规范]
```

---

## 正交矩阵（Super × Caveman）

```
                Caveman (输出风格)         Super (推理深度)
                ────────────────          ────────────────
                full  │ ultra │ off       surface │ deep

日常 CRUD:      full + surface           ← 当前默认
最简快速:      ultra + surface          ← POC / 脚手架
复杂重构:      full + deep              ← /cxssboot-super deep
架构决战:      off + deep              ← /cxssboot-super deep（不受限输出）
安全审计:      full + deep              ← 安全关键代码
```

| 组合 | 适用场景 | 预期 Token |
|------|---------|-----------|
| `full + surface` | 日常 CRUD、简单 bug 修复 | 基准（1x） |
| `ultra + surface` | POC、脚手架生成 | 0.25x |
| `full + deep` | 复杂重构、新模块 | 3-5x |
| `off + deep` | 架构决策、安全关键 | 4-6x |

---

## Auto-Surface 自动降级

Super deep 模式下，以下场景自动降级到 surface（输出简化，但推理仍深度）：

- 🔴 **安全警告 / 不可逆操作** — 输出用完整正常语言
- 🟡 **用户困惑 / 重复提问** — 先澄清再恢复 deep
- 🟢 **简单确认性问题** — "是否要加这个字段？" — 不需要完整五维分析

**恢复:** 问题澄清后自动恢复 deep 模式。

---

## 使用示例

```
用户: /cxssboot-super deep
AI: ✅ Super mode: DEEP
    五维推理已激活。所有代码生成将包含:
    ① 业务正确性 ② 并发事务安全 ③ 数据一致性
    ④ 可扩展性性能 ⑤ 可观测性
    verify_convention.py 0 violations 为硬门槛

用户: 在 system 模块新增 SystemUser 的完整 CRUD
AI: [Deep Reasoning Chain]
    ① 业务正确性: SystemUser 需要记录 username + role + status...
    ② 并发与事务安全: 写入操作在 @Transactional 内，但需考虑与 SysRole
       表的关联一致性...
    ...（完整五维分析）
    [Edge Cases] ...
    [Verifiable Success Criteria] ...
    [Code] ...

用户: /cxssboot-super status
AI: 🧠 Super mode: DEEP (persisted)
    可用: deep | surface | off
    使用 /cxssboot-super <level> 切换

用户: /cxssboot-super surface
AI: ✅ Super mode: SURFACE（默认）
    已恢复标准推理深度
```

---

## 异常处理

| 情况 | 行为 |
|------|------|
| 无效参数 | 显示可用选项 |
| 无参数 | 切换 deep ↔ surface（toggle） |
| 持久化文件不可写 | 本次 session 生效，报 warning |
| 与 Caveman 同时使用 | 合法。Super 管思考深度，Caveman 管输出压缩。两者正交 |
