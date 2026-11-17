---
name: desktop-app-capability-review
description: Assess a locally installed desktop app's capability and integration points.
---

# Desktop App Capability Review

Investigates a locally installed desktop application to determine what it does and how the bot could use it (MCP tools, CLI, config). It answers "what can this app do for us", not how to fix the app.

## When to Use

- "本机刚安装了 X，对我们有什么帮助？" for any `/Applications/*.app`.
- "看看这个软件能怎么接入" / "这个工具有什么用".

## Procedure

1. Locate the app: `ls /Applications/<name>.app/Contents` and `pgrep -fl <name>` to see if it is running.
2. Read the documentation first: `Contents/Resources/app/skills/*/SKILL.md`, `mcp/README.md`, `startup/startup.json`, `version.json`. These usually name the integration surface (MCP tools, ports, tokens) directly — spend your budget here before touching any bundled JavaScript.
3. Find the data/config directory: `ls ~/Library/Application\ Support/<bundle-id>` and `~/Library/WebKit/<bundle-id>`; check for `LocalStorage`, `IndexedDB`, and MCP/token settings.
4. Only if docs are missing, mine the runtime: the MCP/tool registry in Electron-bun apps is typically a small block in `app/bun/index.js` (an object of `{name, description, schema}` entries). Extract tool names with one broad pass, e.g. `grep -n -o -E 'name: ?"[a-zA-Z][a-zA-Z0-9_]{0,30}"' app/bun/index.js | sort -u`, then `sed` the surrounding block to read descriptions.
5. Check supported media/model providers via targeted `grep -o -E` over `providers/media/*.ts` and node bundles — never read whole minified files.
6. Report: what the app does, which provider/tools it exposes, how the bot connects (MCP endpoint/token), and which business line benefits.

## Pitfalls

- Do not grep minified bundles line by line for each guess; that burns dozens of calls. One broad name-extraction pass, then read the registry block in one `sed`.
- Regex over minified code fails repeatedly on shell quoting (nested quotes, backticks). Prefer the simplest pattern (`name: ?"word"`) and single-quoted expressions.
- Token/settings may live in the app's WebKit `WebsiteDataStore`, not `Application Support` — check both.
- If live probing stalls, dispatch sub-tasks to teammates for parallel research and continue reading docs yourself; report which parts are pending.
- Never repeat a failed or empty call — if a grep/find/curl returns nothing or errors, change the pattern, the target, or the probe variables (headers, quoting, session id), or stop and report what is unresolved. Re-running the identical command only loops; cap any probe at two attempts before switching approach.
- When the app's MCP switch is on but no connection config was handed over, ask the person for the endpoint/token (usually in the app's 设置 → MCP panel) instead of hunting for it across the filesystem.

## Verification

- The report names the app's concrete integration surface (MCP tool list or config path) verified from files on disk, not assumptions.