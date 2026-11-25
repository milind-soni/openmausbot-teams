---
name: cxssboot-setup
description: "Initialize cxssboot-backend SKILL and apply three-layer prompt injection (CLAUDE.md + SKILL.md triggers + settings.json) for the current cxssboot project. Trigger: '/cxssboot-setup', 'setup cxssboot', '初始化cxssboot规范', '安装cxssboot三层注入'."
version: 1.0.0
platforms: [linux, macos]
metadata:
  tags: [cxssboot, setup, skill-init, prompt-injection, claude-code, codex, opencode]
---

# cxssboot-setup — 一键初始化 + 三层注入

When invoked via `/cxssboot-setup`, execute the following workflow automatically.

---

## 执行流程

```
/cxssboot-setup 被调用
  │
  ├─ Step 1: 定位源仓库
  │     SOURCE=~/WorkSpace/IdeaProject/growthman-agent-skill/cxssboot-backend
  │     如果 SOURCE 不存在，报错并提示用户拉取最新代码
  │
  ├─ Step 2: 同步 SKILL 到 Claude Code
  │     rsync -a $SOURCE/ ~/.claude/skills/cxssboot-backend/
  │     (保留 data/ scripts/ references/ SKILL.md)
  │     确保 scripts/setup.py 可执行
  │
  ├─ Step 3: 检测当前项目
  │     如果用户指定了项目路径 → 使用指定路径
  │     否则 → 使用当前工作目录
  │     检查 pom.xml 确认是 Java 项目
  │
  ├─ Step 4: 执行三层注入
  │     python3 ~/.claude/skills/cxssboot-backend/scripts/setup.py \
  │       --project-path <检测到的项目路径> \
  │       --self-heal \
  │       --force
  │
  ├─ Step 5: 验证结果
  │     python3 ~/.claude/skills/cxssboot-backend/scripts/setup.py \
  │       --project-path <项目路径> --diagnose
  │
  └─ Step 6: 报告
        汇总每层的注入状态，列出已应用的文件清单
```

---

## Step 1: 定位源仓库

```bash
SOURCE="~/WorkSpace/IdeaProject/growthman-agent-skill/cxssboot-backend"
if [ ! -d "$SOURCE" ]; then
  echo "❌ 源仓库不存在: $SOURCE"
  echo "请先拉取: cd ~/WorkSpace/IdeaProject/growthman-agent-skill && git pull"
  exit 1
fi
```

**如果源仓库不存在**，提示用户：
```
源仓库未找到。请执行：
  cd ~/WorkSpace/IdeaProject/growthman-agent-skill && git pull
然后重新运行 /cxssboot-setup
```

---

## Step 2: 同步 SKILL 到 Claude Code

将最新的 cxssboot-backend SKILL 从源仓库同步到 Claude Code 的 skills 目录：

```bash
SOURCE="~/WorkSpace/IdeaProject/growthman-agent-skill/cxssboot-backend"
TARGET="$HOME/.claude/skills/cxssboot-backend"

# 确保目标目录存在
mkdir -p "$TARGET"/{data,references,scripts}

# 同步所有文件
rsync -a "$SOURCE/" "$TARGET/" --exclude='__pycache__' --exclude='.git' --exclude='setup/'

# 确保脚本可执行
chmod +x "$TARGET/scripts/"*.py

echo "✅ SKILL 已同步到 $TARGET"
```

**验证**：
```bash
ls -la ~/.claude/skills/cxssboot-backend/scripts/setup.py
```

---

## Step 3: 检测当前项目

```bash
# 使用用户指定的路径，或当前工作目录
PROJECT_PATH="${1:-$(pwd)}"

# 检查是否是 cxssboot 项目
if [ ! -f "$PROJECT_PATH/pom.xml" ]; then
  echo "⚠️  $PROJECT_PATH 下没有 pom.xml，可能不是 Maven 项目"
  echo "继续执行，但如果 setup.py 报错请指定正确的项目路径"
fi

echo "📁 项目路径: $PROJECT_PATH"
```

**如果用户明确指定了路径**（例如用户在 prompt 中说 "在 /path/to/project 执行"），使用该路径。

---

## Step 4: 执行三层注入

```bash
python3 ~/.claude/skills/cxssboot-backend/scripts/setup.py \
  --project-path "$PROJECT_PATH" \
  --self-heal \
  --force
```

`--self-heal` 参数会自动修复常见问题（缺失目录、损坏的 JSON 文件等），然后再应用三层注入。

`--force` 参数确保即使之前已注入过也会重新应用（幂等，不会重复）。

---

## Step 5: 验证结果

```bash
python3 ~/.claude/skills/cxssboot-backend/scripts/setup.py \
  --project-path "$PROJECT_PATH" \
  --diagnose
```

诊断报告会显示：
- 哪些工具被检测到（Claude Code / Codex / OpenCode）
- 每层的注入状态（PRESENT / MISSING）
- 环境信息

---

## Step 6: 报告汇总

输出格式化的汇总报告：

```
╔══════════════════════════════════════════════════════════╗
║        cxssboot-setup — 初始化完成                       ║
╠══════════════════════════════════════════════════════════╣
║  SKILL 同步 : ✅ cxssboot-backend v2.0.0                 ║
║  项目路径   : /path/to/cxssboot-<your-project>            ║
╠══════════════════════════════════════════════════════════╣
║  Layer 2 (指令文件)     : ✅ CLAUDE.md, AGENTS.md        ║
║  Layer 3 (SKILL触发词)  : ✅ 40+ keywords                ║
║  Layer 4 (系统提示词)   : ✅ settings.json, config.toml  ║
╠══════════════════════════════════════════════════════════╣
║  检测到工具: claude-code ✅ | codex ✅ | opencode ✅     ║
║  状态: 全部就绪                                          ║
╚══════════════════════════════════════════════════════════╝
```

---

## 异常处理

### 源仓库不存在
```
❌ 错误: 找不到 cxssboot-backend 源仓库
路径: ~/WorkSpace/IdeaProject/growthman-agent-skill/cxssboot-backend
修复: cd ~/WorkSpace/IdeaProject/growthman-agent-skill && git pull
```

### rsync 失败
```
❌ 错误: SKILL 同步失败
修复: 检查磁盘空间 (df -h) 和权限 (ls -la ~/.claude/skills/)
手动执行: rsync -av <源>/ ~/.claude/skills/cxssboot-backend/
```

### 项目检测失败
```
⚠️  警告: 当前目录不是 cxssboot 项目
如果你在正确的项目目录下，请手动指定:
  /cxssboot-setup /path/to/cxssboot-growthman-college
  /cxssboot-setup /path/to/cxssboot-knowledge-base
```

### setup.py 执行失败
```
❌ 错误: 三层注入失败
请运行诊断: python3 ~/.claude/skills/cxssboot-backend/scripts/setup.py --diagnose
根据诊断结果手动修复，或重新运行 /cxssboot-setup
```

---

## 使用示例

```
用户: /cxssboot-setup
AI: 自动检测项目 → 同步 SKILL → 三层注入 → 报告

用户: /cxssboot-setup /path/to/other-project
AI: 使用指定路径 → 同步 SKILL → 三层注入 → 报告
```

---

## 注意事项

- 本命令会修改项目的 `CLAUDE.md`、`AGENTS.md`、`.claude/settings.json`、`.codex/config.toml`、`.opencode/memory/project.md`
- 所有修改都是幂等的——重复执行不会产生重复内容
- `--force` 确保已存在的铁律块也会被更新到最新版本
- 建议在项目根目录下执行
