# Contributing a BotMRR playbook

Thanks for sharing a useful AI team with every agent community—not just OpenMausBot users.

## Before opening a pull request

The easiest way is **Publish** in MausBot. It opens the pull request for you, and you don't need a GitHub account.

By hand:

1. Add one folder, `teams/<slug>/`, with `team.md` (a department) or `bot.md` (one bot), plus its `skills/<name>/SKILL.md` and optional `avatars/` and `README.md`. See [FORMAT.md](FORMAT.md).
2. Focus the template on one measurable outcome with distinct, practical roles.
3. Explain each connected app in plain language and mark optional connections explicitly.
4. Keep every suggested routine paused (`enabledAfterInstall: false`).
5. Run `npm test`. It builds the catalog and checks everything. Don't commit `catalog.json`, `packages/<slug>.md` or `team.mausteam.json`; CI rebuilds them on main.

Standalone one-file playbooks still go in `packages/<slug>.md` (BotMRR v1).

## Safety rules

Submissions must not include:

- API keys, tokens, cookies, personal data, or example secrets
- executable files or encoded payloads
- instructions to bypass approvals or conceal actions
- destructive actions without explicit user confirmation
- trademark impersonation or unsupported claims of official affiliation

The activation section must say what requires human approval. Playbooks should distinguish evidence from inference and state their expected inputs, process, output, and guardrails.

## Playbook boundaries

One Markdown may describe listing metadata, specialist roles, a Chief of Staff, shared rooms, process playbooks, connector requirements, examples, and suggested routines. It must not contain runtime state such as credentials, OAuth grants, prior conversations, memory, approval history, provider sessions, exact private model ids, or local paths.

## Review expectations

Maintainers may edit titles, descriptions, formatting, or guardrails for clarity. Inclusion in the directory is curated and does not imply endorsement of every recommendation produced by a team.
