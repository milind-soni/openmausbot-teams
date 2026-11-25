---
name: cxssboot-review
description: 代码审查专用 skill。当用户要求审查 Java 代码、分析 git diff、跑 review pipeline 时使用。对标 ponytail-review。产出 severity-ranked findings + cxssboot 铁律符合性报告 + technical debt with upgrade path 清单。
version: 1.0.0
author: Hermes Agent
license: MIT
platforms: [linux, macos, windows]
metadata:
  hermes:
    tags: [cxssboot, review, code-review, java, spring-boot, ponytail]
    related_skills: [cxssboot-backend, cxssboot-debugger, cxssboot-super]
---

# cxssboot-review — 增长超人后端代码审查

对标 [ponytail-review](https://github.com/DietrichGebert/ponytail/tree/main/.openclaw/skills/ponytail-review)。
**作者/审查者分离**：本 skill 是审查者，不是作者。不要替被审查的代码"找理由"。

---

## 触发词

"审查 / review / diff 分析 / PR review / 代码检查 / 符合性检查 / 查一下这块代码 / 帮我看下这个 PR"

---

## 决策树

```
START: 用户请求 review
  │
  ├─ "审查某个文件/目录" (无 diff)
  │   → python3 scripts/verify_convention.py <path> --json
  │   → 手动 20-point checklist (references/20-point-checklist.md)
  │   → cxssboot: ceiling 注释扫描
  │
  ├─ "分析本次改动" (有 git diff)
  │   → qa/diff-analyzer.sh origin/master  (功能感知风险分析)
  │   → python3 scripts/verify_convention.py <path> --json
  │   → 20-point checklist
  │   → cxssboot: ceiling 注释扫描
  │
  ├─ "审查 PR"
  │   → 上述全跑 + 逐 commit 分析
  │   → 特别关注跨 commit 的累积影响
  │
  └─ "审查业务逻辑正确性"
      → 走 cxssboot-super 5 维深度推理 + 20-point checklist
```

**脚本路径**：从 cxssboot-backend skill root 调用，即 `~/.claude/skills/cxssboot-backend/scripts/` 和 `~/.claude/skills/cxssboot-backend/qa/`。

---

## 输出格式 (对标 ponytail-review)

对每个 finding：

```
<severity>:<file>:<line>: <emoji> <问题>. <修复建议>.
```

**severity 分级**：

| Severity | 含义 | 示例 |
|----------|------|------|
| 🚨 CRITICAL | 安全/数据丢失/铁律违反 | 缺 `@PreAuthorize`、SQL 注入、RBAC 旁路 |
| ⚠️ HIGH | 功能 bug / 性能瓶颈 / 数据完整性 | 缺软删除过滤、缺事务、N+1 查询 |
| 💭 MEDIUM | 可维护性 / 命名 / 注释 | 命名不符规范、缺中文 Javadoc、魔法数 |
| 💭 LOW | 风格 / 微优化 | Imports 顺序、未使用变量 |

按 severity 排序输出（CRITICAL 先）。最多 1 句总评。**不要 feature tour**。

### 输出模板

```
## Review: <审查范围>

### 总评
<一句话总结：N 个 findings (X CRITICAL / Y HIGH / Z MEDIUM / W LOW)>。

### Findings (按 severity 排序)

🚨 CRITICAL:src/main/java/.../{Entity}Controller.java:42: ✋ 缺少 @PreAuthorize.
  加 `@PreAuthorize("@cxss.hasPermission('kb:tag:list')")`.

⚠️ HIGH:src/main/java/.../{Entity}ServiceImpl.java:78: LambdaQueryWrapper 缺软删除过滤.
  加 `.eq({Entity}DO::getDeleted, DeleteEnum.NOT_DELETE.getCode())`.

💭 MEDIUM:src/main/java/.../{Entity}Controller.java:15: 缺中文 Javadoc.
  加 `/** 知识库模块 - 标签控制器 */`.

### Technical Debt with Upgrade Path

（这是**独立于 findings** 的清单，标记的是有意识承担的简化，不是缺陷）

- src/main/java/.../{Entity}ServiceImpl.java:120
  ceiling: 全局锁
  upgrade: 单机 QPS > 500 时改 per-tenant 锁

- src/main/java/.../{Entity}ServiceImpl.java:145
  ceiling: O(n) 扫描
  upgrade: n > 10000 时加索引或改分页
```

---

## cxssboot: Ceiling 注释扫描规则

对每个发现的 `// cxssboot: <ceiling>, <升级路径>` 注释：

- **不当作 finding 报告**（这是已知 debt，不是缺陷）
- **汇总为 "Technical Debt with Upgrade Path" 清单**，独立于 findings 输出
- 每条包含：`file:line` / `ceiling` 描述 / `升级路径`

详见主 skill `references/philosophy.md` (§3 Output Discipline)。

---

## 与主 skill 的关系

- **共享脚本**：`verify_convention.py` / `qa/diff-analyzer.sh`（在 cxssboot-backend/scripts/ 和 qa/）
- **共享铁律**：11 条 + §6.6 中文注释（在 cxssboot-backend/references/global-rules.md）
- **独立**：触发词、输出格式、决策树
- **不依赖**主 SKILL.md 内容——只依赖共享脚本和共享铁律 reference

---

## 不做什么

- **不改代码**（除非用户明确说"顺便改一下"）——审查者分离
- **不写 design doc**（那是 brainstorming/writing-plans 的活）
- **不做 debug**（那是 cxssboot-debugger 的活；需要时转交）
- **不做 5 维深度推理**（那是 cxssboot-super 的活；需要时转交）

---

## 强度档

继承主 skill 的 lazy 档（`  /cxssboot-lazy lite|full|ultra`）。**review 本身不受 lazy 档影响——审查永远严格**。

但 review 输出的 prose 遵守输出纪律：findings + 1 句总评，不写 feature tour，不写长篇分析报告（除非用户明确要 walkthrough）。

---

## 引用

- 20-point checklist: `references/20-point-checklist.md`
- diff-analyzer 使用: `references/diff-analysis.md`
- TDD seam testing: `references/tdd-seam-testing.md`
- 主 skill 铁律: `../references/global-rules.md`
- 主 skill 哲学层（output discipline）: `../references/philosophy.md` (§3)
