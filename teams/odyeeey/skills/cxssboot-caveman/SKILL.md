---
name: cxssboot-caveman
description: "Control context simplification for AI code generation — switch between full/medium/minimal caveman levels. Trigger: '/cxssboot-caveman', 'set caveman', 'caveman level', 'context simplification', '压缩上下文'."
version: 1.0.0
platforms: [linux, macos]
metadata:
  tags: [cxssboot, caveman, context-simplification, prompt-optimization]
---

# cxssboot-caveman — Context Simplification Control

When invoked via `/cxssboot-caveman`, set the default caveman level for context injection into AI coding tools.

---

## 执行流程

```
/cxssboot-caveman <level> 被调用
  │
  ├─ 参数: full | medium | minimal
  │
  ├─ Step 1: 验证参数
  │     有效值: full / medium / minimal
  │     无参数: 显示当前默认值和可用选项 (--caveman-status)
  │
  ├─ Step 2: 持久化设置
  │     python3 scripts/pattern_router.py --caveman-set <level>
  │     写入 .hermes/agents/cxssboot/caveman.conf
  │
  └─ Step 3: 确认
        显示当前默认值，提示下次 pattern_router 调用将自动使用此级别
```

---

## 级别说明

| Level | Layers | Description | When to Use |
|-------|--------|-------------|-------------|
| `full` | All layers (default) | 完整上下文 — 所有 patterns、anti-patterns、decision rules | 新模块、复杂功能、生产代码 |
| `medium` | Skip Event/Enum/PageVO/StatusRequest | 保留核心结构 + 规则，跳过高阶可选层 | 标准 CRUD、快速原型 |
| `minimal` | Controller, Service, ServiceImpl, Entity, Mapper, VO (6 layers) | 仅骨架 — 类名、关键规则，无模板 | POC、脚手架生成 |

---

## 使用示例

```
用户: /cxssboot-caveman medium
AI: ✅ Default caveman set to: medium
    下次调用 pattern_router 时将自动跳过 Event/Enum/PageVO/StatusRequest

用户: /cxssboot-caveman
AI: 🏕 Current default: full
    可用: full | medium | minimal
    使用 /cxssboot-caveman <level> 切换
```

---

## 一次性覆盖（不修改默认值）

```bash
python3 scripts/pattern_router.py "新增CRUD" --module system --caveman minimal
# or: --module kb --caveman minimal  (any cxssboot module works)
python3 scripts/pattern_router.py --caveman-status
```

---

## 异常处理

| 情况 | 行为 |
|------|------|
| 无效级别 | 报错，显示可用选项 |
| 无参数 | 显示当前默认值 + 帮助 |
| pattern_router.py 不可用 | 提示路径错误 |
