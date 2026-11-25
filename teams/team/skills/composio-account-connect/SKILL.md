---
name: composio-account-connect
description: Connect user accounts to Composio toolkits via auth configs.
---

# Connecting Accounts Through Composio

Guides a user from 'connect my account' to a working Composio toolkit connection, including the custom-credential path when the toolkit has no managed auth. It covers setup and authorization only; it does not design what the tool should do after the account is connected.

## When to Use

- '连接我的 X / Twitter / 推特账号', 'connect my Gmail / Notion / LinkedIn / GitHub'.
- '帮我连上这个应用', '授权一下', or an auth card/link that errors while connecting.
- Any request that needs a Composio toolkit the session has not connected yet.

## Procedure

1. Search for the toolkit and the relevant actions with `COMPOSIO_SEARCH_TOOLS`, passing `queries` with `use_case` (and `known_fields` such as `platform: twitter` when the platform is clear) and `session: {generate_id: true}`. Reuse the returned session id for the whole task.
2. Check current state before starting anything: `COMPOSIO_MANAGE_CONNECTIONS` with `{toolkits: [{name, action: 'list'}], session_id}`. If it is already connected, skip to verification.
3. Initiate with `{toolkits: [{name, action: 'add', alias}], session_id}` and hand the resulting auth card/link to the user. Tell them to click Connect and complete login, then wait; do not re-add while waiting.
4. If the card errors or states the toolkit needs the user's own app credentials, say plainly that this toolkit cannot use managed one-click auth and that the connection requires a custom auth config in the user's own Composio project. Then give numbered, clickable steps:
   1. Before generating credentials, inspect the Composio auth config form to see which scheme it requires, OAuth 1.0a or OAuth 2.0. The field labels dictate which credentials to create; do not generate keys before checking.
   2. Open the platform's developer portal (for X: `developer.x.com`), accept the developer agreement, and choose the free plan unless the user needs paid volume.
   3. Create a project and an app, then open the app's Keys and tokens page.
   4. Match the app settings to the scheme:
      - OAuth 2.0: in User authentication settings, set the app type to Web App, Automated App or Bot, set permissions to read and write, save the callback URL exactly as Composio shows it (for X this is commonly `https://backend.composio.dev/api/v1/auth-apps/add`), then copy the OAuth 2.0 Client ID and Client Secret from Keys and tokens, plus the Application Bearer Token if the form asks for it.
      - OAuth 1.0a: generate the API Key and API Key Secret, set user permissions to read and write, and use the callback URL Composio shows.
   5. In the Composio dashboard go to Auth Configs, choose Create, pick the toolkit, paste the values for the matching scheme, and save.
   6. Ask the user to send back only the generated auth config ID (starts with `ac_`), then re-run step 3 with that config if the tool requires it.
5. If the developer portal demands a use-case or developer-agreement description, draft a truthful 2-4 sentence description from what the user actually asked to do, sized to the field's stated minimum, and let the user submit it.
6. When the user shares a screenshot, read it with `read_image` first, identify the exact menu label or field visible on their screen, and answer with that label and where it sits in the navigation. Reply in the user's language.
7. When the user asks you to solve the connection directly or cannot follow screenshot instructions, stop asking for more diagnostics and drive their browser with the desktop/browser tools (`list_windows`, `get_window_state`, `run_steps`): find the auth window, click the Connect and Authorize controls, complete the provider's consent screen, and return to Composio to check status. Reuse one session id for the whole flow. If authorization still fails after the consent screen, use that same browser session to open the provider's developer portal, fix the app type, callback URL and permissions yourself, regenerate the client credentials, update the Composio auth config, and retry the add.
8. Never ask for, echo, or accept API keys, secrets, or tokens in chat. State explicitly that the keys go only into the Composio dashboard fields.

## Pitfalls

- Do not report a failed auth card as 'X cannot be connected'. Managed auth being unavailable is a credential requirement, not a dead end; the custom auth config path is the way through.
- Do not stop at the error message. Convert it into the numbered credential-setup steps and keep the user moving.
- Do not treat the auth card appearing as success; only a `list` call or a successful toolkit action proves the connection.
- Do not collect secrets in chat even if the user offers them; redirect to the Composio dashboard and continue from the auth config ID.
- Answer with the navigation labels from the user's own screenshot, not generic product names remembered from elsewhere; UI wording differs by locale and version.
- Confirm the auth scheme before creating credentials: OAuth 1.0a API Key/Secret are not interchangeable with OAuth 2.0 Client ID/Secret, and mismatched values fail as authorization or callback errors.
- When a pasted credential pair does not fit the field labels (API Key/Secret offered where Client ID/Client Secret is required), supply the correct-scheme credentials for the Composio auth config and regenerate them at the provider if the secret is no longer visible; do not keep retrying authorization with the mismatched values.
- For X OAuth 2.0, an app with the wrong type or an empty callback URL fails before the consent screen; set Web App, Automated App or Bot, read and write, and save the exact callback first.
- Do not keep requesting screenshots once the user asks you to solve it; take over the browser and finish the flow so the task does not stall.
- Do not call the connection fixed or complete while Composio still shows it as initiated; repaired credentials only mean the next authorization attempt can succeed.
- After changing the provider app's type, permissions or callback, re-copy the client credentials from its Keys page and update the Composio auth config, so the pair stored in Composio matches the app's saved settings.
- A connected account can still reject actions when the provider app sits on a pay-per-use project with zero balance (X returns an API credits depleted error). Report the connection as working and the credit/plan limit as a separate issue; tell the user to move the project to the free tier or add credit, then re-run one harmless read before declaring the toolkit usable. An empty pay-per-use project is the default state of a new X app, so check it as soon as a read fails.
- When the user wants the public content without paying, a quota error blocks the API only: switch to the read-only web-scraping channel (see `social-content-reading`) and keep reading public posts instead of stalling on the plan.

## Verification

Re-run `COMPOSIO_MANAGE_CONNECTIONS` with `action: 'list'` for the toolkit and confirm the account shows connected. Then run one harmless read action to prove the connection is usable, not just present. If that read fails on credits or plan limits, report the account as connected and the provider plan as the blocker, and do not tell the user the toolkit is ready until a read succeeds.
