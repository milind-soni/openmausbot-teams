# BotMRR

[BotMRR](https://botmrr.io) is an independent, open-source evidence ledger for the bot economy. It records public bot templates, source-backed outcome claims, and the gaps between what a creator reports and what the available evidence supports.

A public post proves only that a claim was made. A creator-operated dashboard is useful evidence, but it is not a payment-provider connection. BotMRR does not treat either one as verified revenue, and it does not add incomparable claims into a fake total.

This repository also publishes portable AI team playbooks inspired by useful public workflows. Each playbook is an independent, safety-reviewed reconstruction—not the creator's exact bot configuration, private prompts, account state, or demonstrated results.

## Evidence and research

- [`lib/research.ts`](lib/research.ts) contains the curated field notes and public claim reviews shown on the site.
- [`research/grok-bot-seed-2026-08-29.md`](research/grok-bot-seed-2026-08-29.md) is the reviewed 15-source launch pack and monitoring list.
- Every case separates what BotMRR observed from what is still missing.
- Source-only, creator-run-ledger, and publicly challenged records remain visibly distinct.
- Connected revenue verification is not available yet; the site says so plainly.

## Portable playbooks

Every playbook is one ordinary Markdown file. Give it to a Chief of Staff in OpenMausBot, Grok, Claude, ChatGPT, or another agent product. The YAML frontmatter provides an optional import path, while the Markdown body remains readable and provider-neutral.

The original catalog teams are:

| Playbook | Outcome | Bots | Markdown |
| --- | --- | ---: | --- |
| [SEO Growth Team](teams/seo-growth) | Prioritize search work most likely to grow qualified traffic | 4 | [Open](packages/seo-growth.md) |
| [Engineering Team](teams/engineering) | Take a software change from intent to a verified release | 4 | [Open](packages/engineering.md) |
| [100x Marketing Team](teams/100x-marketing) | Launch a focused campaign and make a stop-or-scale decision | 4 | [Open](packages/100x-marketing.md) |
| [Reddit Lead Miner](teams/reddit-lead-miner) | Find qualified Reddit leads with source evidence | 2 | [Open](packages/reddit-lead-miner.md) |
| [Competitor Watch](teams/competitor-watch) | Turn material competitor changes into a decision brief | 2 | [Open](packages/competitor-watch.md) |
| [Inbox Follow-up](teams/inbox-follow-up) | Recover sales conversations where your team owes the next step | 2 | [Open](packages/inbox-follow-up.md) |

### Use a playbook

1. Browse [botmrr.io](https://botmrr.io) and choose an independent workflow.
2. Download or copy the Markdown.
3. Give it to your product's Chief of Staff and ask it to activate the team.

OpenMausBot can install the same Markdown directly, creating the bots, Chief of Staff, rooms, playbooks, connector intent, and paused routines. Other products can follow the readable activation instructions.

Suggested routines always start paused. Connections are requirements, never credentials. A playbook never contains conversations, OAuth grants, approvals, memory, provider sessions, local paths, or secrets.

## Repository structure

- [`packages/`](packages) contains the independent one-file Markdown playbooks.
- [`FORMAT.md`](FORMAT.md) documents the small portable convention.
- [`teams/`](teams) holds template folders (`teams/<slug>/team.md` or `bot.md` with its skills), the way MausBot's Publish sends them, and the original teams' compatibility files.
- [`catalog.json`](catalog.json) indexes the teams. Entries for template folders, their `packages/<slug>.md` and `team.mausteam.json` are built by `npm run catalog`; never edit those by hand.

Pull requests validate every playbook, compatibility manifest, and safety boundary, then build the site.

## Contributing

Read [CONTRIBUTING.md](CONTRIBUTING.md) before proposing a source, correction, or reconstructed playbook. This repository does not accept secrets, generated binary bundles, or executable playbook scripts.

## License

MIT
