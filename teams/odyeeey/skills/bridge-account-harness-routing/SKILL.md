---
name: bridge-account-harness-routing
description: Route a chat bridge across account and harness pools.
---

# Bridge Account × Harness Routing

Adds an account pool and an agent-backend (harness) pool to a chat bridge, with per-conversation bindings resolved at message time and switched from inside the chat. Covers the routing layer, the adapter contract and the proof that routing works; does NOT cover the bridge's transport, reconnect or logging reliability, which belong to the resident-daemon reliability audit.

## When to Use

- "一个飞书账号对接多个 agent harness / 多个账号共用一个后端"
- "加一个 claude-code / codex / hermes / openclaw 后端"
- "随时切换后端，不要重启"
- "切换了但没生效 / 还是走老后端"
- "第二个账号怎么接进来"

## Procedure

1. **Model four tables, not a config blob:** `accounts` (one chat app = one account, bound to one CLI profile), `harnesses` (kind `webhook` | `cli` | `http`, plus a command template or endpoint), `bindings` (account × conversation → harness), `switch_log` (from / to / operator / timestamp). Anything less cannot express many-to-many.
2. **Resolve per inbound message in this order:** exact conversation binding → the account's default → global default → the fallback harness. Resolve on every message; never cache the harness for the life of the process.
3. **One process per account.** The chat CLI's event bus is isolated per app, so each account gets its own process, its own bus and its own supervisor job (`BRIDGE_ACCOUNT=<name>`, `BRIDGE_LARK_PROFILE=<profile>`, `FEISHU_APP_JSON=<path>` or the platform's equivalent). Multiplexing accounts inside one process fights the bus.
4. **Keep the adapter boundary one function wide:** prompt on stdin, answer on stdout, non-zero exit = failure. A `cli` harness is a command template held in config (`claude -p`, `codex exec …`, `openclaw agent …`) so registering a backend is data, not code. Put a timeout on every backend call.
5. **Probe at registration and store the result.** Check the harness binary on PATH (or that the webhook config exists) when it is added; a harness that fails the probe must read as unavailable rather than be selectable and broken.
6. **Fail downward, visibly.** A disabled harness or missing command falls through the chain to the fallback, and the conversation gets an explicit failure line. A hang is a defect, not a slow backend.
7. **Switch from chat with a command** (`/harness use <name>`) that writes the binding for the current conversation only, takes effect on the next message with no restart, and appends to `switch_log`. Read the applied binding back after the switch.
8. **Keep the scope of a switch to one conversation.** Two conversations on the same account, and two accounts on the same harness, must stay independent — the binding key is account × conversation, never account alone.
9. **Ship the pool with its own test file** (`tests/test_pools.py`) covering: two accounts on one harness, two conversations on one account, the switch taking effect on the next message, a disabled harness falling through, and a `switch_log` row being written.
10. **Verify with one real call per new adapter** and record the latency you measured — a registry row saying "available" is not a working backend.
11. **Report what the pool cannot supply.** A second account needs its own App ID/Secret (or a self-created app) from the person; the registry can hold the row but cannot mint the credential. State that as the remaining blocker instead of implying multi-account is live.

## Pitfalls

- Keying a binding on the account alone leaks one switch into every conversation that account owns.
- Resolving the harness once at startup makes `/harness use` look ignored until a restart.
- Registering a harness without probing it turns a config typo into a dropped message at the worst moment.
- A backend that raises instead of falling through converts one bad harness into a total outage.
- One process cannot multiplex two apps' events — one process per account is the design, not a workaround.
- A registry of harnesses is not evidence of routing; drive one message per binding and read `switch_log`.
- Adding an account is a credential task as much as a code task; report the missing credential as the blocker, not as a defect in the pool.

## Verification

Send one message in each bound conversation and read back which harness handled it from `switch_log` plus the bridge log, with the adapter's measured latency; a switch in one conversation leaves every other conversation on its previous harness; a disabled or missing harness produces a visible fallback answer rather than silence.
