---
name: cxssboot-lazy
description: "Control lazy intensity for AI code generation — switch between lite/full/ultra lazy levels (YAGNI / standard ladder / extremist). Orthogonal to cxssboot-caveman (which controls context-depth). Trigger: '/cxssboot-lazy', 'set lazy', 'lazy level', '懒人档', '切换懒人档', 'YAGNI mode', '懒人梯档位'."
version: 1.0.0
platforms: [linux, macos]
metadata:
  tags: [cxssboot, lazy, intensity, yagni, ponytail, prompt-optimization]
---

# cxssboot-lazy — Lazy Intensity Control

When invoked via `/cxssboot-lazy`, set the default lazy intensity level for AI code generation in cxssboot projects. Inspired by [ponytail](https://github.com/DietrichGebert/ponytail)'s `/ponytail lite|full|ultra` command.

**与 cxssboot-caveman 正交**：
- caveman 控制**上下文注入深度**（多少层模板被注入 prompt）
- lazy 控制**生成行为懒惰程度**（AI 写代码时多严格走懒人梯）

两者独立组合，例如 `caveman=minimal + lazy=ultra` = 最小上下文 + 极端 YAGNI（适合 POC）。

---

## 执行流程

```
/cxssboot-lazy <level> 被调用
  │
  ├─ 参数: lite | full | ultra | off
  │
  ├─ Step 1: 验证参数
  │     有效值: lite / full / ultra / off
  │     无参数: 显示当前默认值和可用选项
  │
  ├─ Step 2: 持久化设置（v4.1 实现，v4.0.0 仅 session-scoped）
  │     未来: python3 scripts/pattern_router.py --lazy-set <level>
  │     写入 .hermes/agents/cxssboot/lazy.conf
  │     v4.0.0 现状: in-context state，session 内持续生效
  │
  └─ Step 3: 确认
        显示当前档位 + 该档行为契约
```

---

## 档位说明

| Level | 行为 | 适用场景 | 命令 |
|-------|------|---------|------|
| `lite` | 生成被要求的，一句话指出更懒的备选，用户选 | 企业生产代码、明确需求 | `/cxssboot-lazy lite` |
| `full` | **默认**。梯子强制执行。原生/复用优先。最短 diff + 最短说明 | 标准 CRUD、重构、bug 修复 | `/cxssboot-lazy full` 或不指定 |
| `ultra` | YAGNI 极端。先删后加。挑战需求本身，但守红线 | POC、原型、内部工具、技术债清理 | `/cxssboot-lazy ultra` |
| `off` | 完全关闭懒人梯，退回 v3 行为 | 调试 v4 改造影响、对比基线 | `/cxssboot-lazy off` |

### lite — 需求驱动

> 用户说"加 X 字段"，就加 X 字段。但同时一句话指出更懒的备选。

```
用户: "在 {Entity}DO 加一个 status 字段，加 enum"
AI (lite):
  - 加 status 字段 + StatusEnum（按用户要求）
  - 一句话: "已加 StatusEnum。如果 status 只有 2-3 个值且不参与 RPC，
            直接用 Integer + 常量注释可省一个文件。需要改吗？"
```

### full — 默认强制梯子

> 读完代码 → 爬梯子 → 取第 1 个成立梯级 → 写最短可行 diff

```
用户: "在 {Entity}DO 加一个 status 字段，加 enum"
AI (full):
  - 先 grep: the current project 已有 StatusEnum？
  - 已有 StatusEnum (ENABLED/DISABLED) → 复用，不新建
  - Entity 加 Integer status + 中文注释
  - VO 加对应字段
  - 输出: "复用 StatusEnum（梯级 2）。Entity+VO 加字段。
          skipped: StatusEnum 新文件。add when: 出现 ≥3 个项目特有状态。"
```

### ultra — YAGNI 极端

> 先删后加。挑战需求。但红线永在。

```
用户: "给 {Entity} 加一个缓存层"
AI (ultra):
  - 先问: "QPS 数据？没数据 → 不加。JetCache @Cached 是一行，
          手写 TTL 缓存类是 bug farm。你确定要自建？"
  - 用户坚持 → 转 full 行为
  - 用户改主意 → 一行 @Cached 搞定，或什么都不做
```

---

## 企业红线（ultra 不可挑战）

**❌ ultra 永不质疑**（即 AI 不能说"真的需要 X 吗"）：

- 多租户隔离（`tenantId` 过滤）
- 软删除（`deleted` 过滤）
- 鉴权（`@PreAuthorize` / RBAC / 权限旁路禁止）
- 事务（`@Transactional(rollbackFor = Exception.class)`）
- 中文注释（public class/method）
- Jakarta 校验（`@Valid`）
- `@PostMapping` + `CommonResult<T>` 协议
- Entity → `BaseDO` 继承
- `CopyUtil.copy` 使用
- Long ID `@JsonFormat(shape = STRING)`

**✅ ultra 可以挑战**：

- "真的需要新建 enum 吗？"（已有 `StatusEnum`）
- "真的需要事件驱动吗？"（同步调用够用）
- "真的需要 MQ 吗？"（同进程事件够用）
- "真的需要新建 VO 吗？"（Entity 字段直接返回也行）
- "真的需要 7 层吗？"（小工具 3 层够）
- "真的需要缓存吗？"（先 profile）
- "真的需要抽象层吗？"（只有一个实现）
- "真的需要配置化吗？"（值从不变化）

---

## 组合矩阵（caveman × lazy）

| caveman | lazy | 效果 |
|---------|------|------|
| `full` | `full` | **默认**：完整模板上下文 + 标准懒人梯 |
| `minimal` | `ultra` | 最小上下文 + 极端 YAGNI → 快速 POC |
| `medium` | `lite` | 中等上下文 + 需求驱动 → 常规企业迭代 |
| `full` | `ultra` | 完整上下文 + YAGNI 极端 → 技术债清理（看到全貌后激进删减） |
| `minimal` | `off` | 最小上下文 + 无梯子 → 调试 v4 改造影响 |

---

## 使用示例

```
用户: /cxssboot-lazy ultra
AI: ✅ Lazy intensity set to: ultra (session-scoped, v4.0.0)
    行为契约：
    - 先删后加，YAGNI 极端
    - 挑战需求"真的需要 X 吗？" 但守红线
    - 10 项企业红线永不质疑（多租户/软删除/鉴权/事务/中文注释/...）
    适用：POC、原型、技术债清理
    退回：/cxssboot-lazy full 或 /cxssboot-lazy off

用户: /cxssboot-lazy
AI: 🪜 Current lazy intensity: full (default)
    可用: lite | full | ultra | off
    使用 /cxssboot-lazy <level> 切换
    与 /cxssboot-caveman <level> 正交组合

用户: /cxssboot-lazy off
AI: ✅ Lazy intensity: OFF（退回 v3 行为，不爬懒人梯）
    重新启用：/cxssboot-lazy full（或 lite / ultra）
```

---

## 一次性覆盖（不修改 session 默认值）

在 prompt 里直接指定，不影响后续：

```
"用 ultra 档帮我看下这个 Controller，能不能砍掉一半代码"
"这次切到 lite，我明确要 7 层全套，不用提示备选"
```

---

## 持久化（v4.1 路线图，v4.0.0 未实现）

v4.0.0：档位 session-scoped（session 内持续，session 结束回到默认 `full`）。

v4.1 计划：

```bash
python3 scripts/pattern_router.py --lazy-status           # 查询当前档位
python3 scripts/pattern_router.py --lazy-set ultra        # 持久化到 lazy.conf
python3 scripts/pattern_router.py --lazy-set full         # 恢复默认
```

配置文件：`.hermes/agents/cxssboot/lazy.conf`（与 `caveman.conf` 同目录）。

`prompts/cxssboot-executor.md` 里的 `{lazy_level}` 占位符将由 `pattern_router.py` 在注入 prompt 时替换。

---

## 异常处理

| 情况 | 行为 |
|------|------|
| 无效档位（如 `/cxssboot-lazy extreme`） | 报错，显示可用选项（lite/full/ultra/off） |
| 无参数（`/cxssboot-lazy`） | 显示当前档位 + 帮助 + 组合矩阵 |
| `lazy.conf` 不存在 | 使用默认值 `full`，不报错 |
| 用户说 "stop lazy" / "normal mode" | 等价于 `/cxssboot-lazy off` |

---

## 与其他 skill 的关系

| Skill | 控制轴 | 正交? |
|-------|--------|-------|
| `cxssboot-backend`（主） | 加载完整架构 DNA | — |
| `cxssboot-caveman` | 上下文注入深度（full/medium/minimal） | ✅ 正交 |
| `cxssboot-lazy`（本 skill） | 生成行为懒惰程度（lite/full/ultra/off） | ✅ 正交 |
| `cxssboot-super` | 深度推理档（deep/surface） | ✅ 正交 |
| `cxssboot-review` | 代码审查（永远严格，不受 lazy 影响） | 独立 |
| `cxssboot-autopilot` / `-loop` / `-goal` / `-team` | 工作流编排 | 独立 |

---

## 设计来源

- ponytail `/ponytail lite|full|ultra` 命令：[commands/ponytail.toml](https://github.com/DietrichGebert/ponytail/blob/main/commands/ponytail.toml)
- ponytail `## Intensity` 章节：[SKILL.md](https://github.com/DietrichGebert/ponytail/blob/main/.openclaw/skills/ponytail/SKILL.md)
- cxssboot-backend v4.0.0 spec §2 Intensity Levels：`docs/superpowers/specs/2026-07-20-cxssboot-backend-ponytail-optimization-design.md`
- cxssboot-backend v4.0.0 哲学层：`references/philosophy.md` (§2 Intensity Levels)
