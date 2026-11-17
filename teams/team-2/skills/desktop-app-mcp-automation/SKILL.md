---
name: desktop-app-mcp-automation
description: Batch-drive a local desktop app over MCP reliably and verify writes.
---

# Desktop App MCP Automation

Drives a running local desktop app through its MCP endpoint to batch-create or modify many items (canvas nodes, configs, generation jobs). It does not cover assessing what the app can do (see `desktop-app-capability-review`).

## When to Use

- "把所有镜头/节点都建好", "批量写入画布", "批量触发生成".
- Any loop of dozens of MCP calls against a local app where one slow or stuck call ruins the run.

## Procedure

1. Connect by loading the app's MCP runner once per process (`importlib.util.spec_from_file_location` on the runner script, e.g. `tf_run2.py`) and call operations via `tools/call` → `appOperation` with `{name, parameters}`.
2. Never hardcode a connection/session id: fetch it fresh at batch start via `getAppState` (connections list, pick the one whose state has a `directory`) and re-fetch on any empty/stale response. Connections change when the page reconnects.
3. Before each operation, ensure the app window is visible: `osascript -e 'tell application "System Events" to tell process "<app>" to get value of attribute "AXMinimized" of window 1'`; if `true`, set it to `false` and wait 3s. A minimized window makes calls time out silently.
4. Run batch scripts in the foreground of the shell session, one process handling all items in-process. Background processes get killed by the system mid-run.
5. Time one item first (e.g. `time` two items), then size the remaining batch accordingly. Reuse one process for the whole batch — restarting per call multiplies cost.
6. Verify results against the app's on-disk state files (e.g. the canvas JSON under its data workspace), not only via `findCanvasNodes`-style queries, which can return 0 when the page has not loaded. Count nodes/edges/labels directly from the file (labels may be nested, e.g. `data.label`).
7. After restarting the app (including forced restarts), re-run the MCP `initialize` handshake to get a fresh session id — the old session is invalid and every call fails until you re-handshake — then run `tools/list` and check the tool count before continuing.
8. If the tool count drops to the baseline few (canvas tools missing), a bundled node/tool plugin is failing at startup. Bisect by dropping a `<name>.disabled` file in the plugin directory and restarting; when the full tool count returns, the last disabled plugin was the culprit.
9. The tool list is fixed at app startup. Changing `.disabled` markers, plugin files, or node configs has no effect until the app is fully restarted (`kill -9`, relaunch, re-handshake).
10. `openProject` only accepts directories under the app's configured workspace root (e.g. `/Applications/data/workspaces`). Opening a path elsewhere fails with a misleading `pluginError: Invalid URL`; copy the project into the workspace root and open the copy, leaving the original untouched.
11. When a plugin's startup failure points to an empty config value (e.g. `new URL(e.config.appOrigin)` throwing `Invalid URL`), fix it by writing the missing field into the app's settings store (for toonflow: `nodeConfigs.<PluginName>` in `/Applications/data/settings.json`, key matching the plugin filename) instead of disabling the plugin, so the plugin's tools stay available.

## Pitfalls

- If a probe returns empty or the app seems stuck, check CPU/process state (`ps aux`) before re-issuing; a hung process at CPU 0 needs `kill` and a rewritten single-process script, not another retry of the same call.
- Do not trust a script's own progress log as completion proof; re-count target items from the on-disk state file before reporting done.
- When a per-item call rejects (e.g. balance/credit errors), check the leftover interrupted task on the affected node (`getGenerationStatus`, then `cancelGeneration`) before re-submitting, or the retry can double-submit.
- App updates can revert patched node bundles and provider configs; re-check hardcoded ports/URLs after any update.
- One plugin whose `createTools` fetches a local endpoint at startup can fail and silently drop ALL canvas tools to the baseline set; the error surfaces nowhere useful, so bisect with `.disabled` files instead of chasing the fetch target. Disable only non-essential plugins for the current job and record which ones are off.
- `pluginError` text can be misleading: an out-of-workspace project path surfaces as `Invalid URL` even though no URL is involved — check the project directory against the workspace root before debugging plugin code.
- `kill <pid>` may not stop these app processes; use `kill -9` (parent and child PIDs), then relaunch with `osascript -e 'tell application "<app>" to launch'`.

## Verification

- The on-disk state file shows the expected item count (nodes, edges, prompts), and a single test operation (e.g. generate one item) completes end to end.
