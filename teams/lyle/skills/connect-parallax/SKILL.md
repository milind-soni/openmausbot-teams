---
name: connect-parallax
description: "Set up or troubleshoot Kevin's local Parallax connection for Claude or Codex, including server availability and MCP authentication. Use use-parallax for an already configured generation job; settings changes retain their authorization."
---

# Connect Parallax

Owner: GLOBAL-CLAUDE. Last reviewed: 2026-11-16.

Use this for an assigned connection/setup problem. For an already configured media job use [use-parallax](../use-parallax/SKILL.md). Reading or installing the skill does not start Parallax or change a connector. Preserve existing authorization for settings changes and spending. Accounts and secret entry remain Kevin's; never load or print a key to test a connection. MausBot is retired and must not be recreated.

## Establish the actual route

Check the acting chat's available tools and the observed error. A missing tool, a stopped service and failed authentication are different conditions. Do not infer current account, provider-key or connector state from an old setup note. Read [setup history](references/history.md) only when a dated result or prior installation choice helps diagnose the assigned problem.

The recorded local MCP endpoint is http://127.0.0.1:3000/api/mcp. It requires the local Parallax service and a Parallax API key supplied as a bearer token. The recorded tool set includes list_models, get_model, quote, generate, get_generation, list_generations, list_files and get_balance; use the tools actually exposed now.

## Start the service when the assignment needs it

The recorded launcher is:

    & "C:/Users/kehar/AppData/Local/Programs/node-v26.13.1-win-x64/node.exe" "C:/Users/kehar/AppData/Local/Programs/parallax/run-parallax.cjs" 3000

The recorded Claude launch entry is named parallax. Use the approved launcher available to the acting app; retain its process/session information. Check that the actual launch succeeded before relying on http://127.0.0.1:3000. Service lifetime depends on that launch route. Do not promise that closing or archiving a chat will stop it.

## Account, key and connector setup, only if needed

1. Kevin handles account/password entry at http://127.0.0.1:3000/join and key creation at http://127.0.0.1:3000/developer. The recorded key scopes are read for model/quote/balance operations and generate for generation; choose the scope required by the approved task. Do not create replacement credentials merely because an old note says setup was incomplete.
2. The existing connection helpers are [Claude](C:/Users/kehar/AppData/Local/Programs/parallax/connect-parallax-to-claude.ps1) and [Codex](C:/Users/kehar/AppData/Local/Programs/parallax/connect-parallax-to-codex.ps1). Use the helper appropriate to the assigned app and existing authorization, confirming its supported secret input without displaying a secret. The historical route used PARALLAX_KEY; do not assume that variable currently exists or read its value into chat.
3. Back up the affected settings through the existing workflow before an authorized connector edit. Confirm the installed app's supported configuration format instead of copying an unverified configuration fragment from history.
4. Refresh or reopen the using chat only if the acting app's connector-loading behavior requires it. A new chat was needed in the recorded route; this is not a universal claim about every current app version.

## Verify and hand back

For the actual assigned setup, a successful get_balance or list_models response verifies that operation through the current connector. It does not prove generation permission, provider readiness or paid output. Return the app/route used, the observed result and any remaining limit. Hand generation to [use-parallax](../use-parallax/SKILL.md), which owns model selection, quotes, budget and output checks.

| Observed problem | Next diagnostic |
|---|---|
| Local address does not answer | Check the assigned launch result and endpoint before attributing it to authentication. |
| 401 / invalid API key | Kevin checks the intended key and its validity through the approved secret-handling route. |
| Guest cannot create API keys | Kevin completes the account step if the job requires it. |
| Missing scope | Match the requested operation to the key's approved scope; do not silently expand it. |
| 429 | Respect the returned retry limit; the 2026-11-15 record listed 120 requests/minute per key. |
| 403 / cross-site refusal | Inspect the reported origin/refusal for the actual client rather than assuming every app sends the same headers. |

Provider sample mode, credit conversion and the configured daily cap are not established by connectivity. Historical configuration evidence is in [setup history](references/history.md); it is not a current spend authorization or a tested budget guarantee.
