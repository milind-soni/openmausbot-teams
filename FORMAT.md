# Formats

There are two layouts. New submissions use the template folder. The original teams keep the one-file playbook.

## Template folder (BotMRR Markdown v2)

MausBot's Publish sends this folder. You can also make it by hand.

```
teams/<slug>/
  team.md                    # a department; one bot uses bot.md instead (exactly one of the two)
  skills/<name>/SKILL.md     # Agent Skills: frontmatter name + description, body = instructions
  avatars/<key>.webp         # optional, 64 KB at most (png and jpg also work)
  README.md                  # optional, for people browsing GitHub
```

`team.md` or `bot.md` starts with YAML frontmatter. It has `botmrr: 2` and the OpenMausBot package fields (`name`,
`tagline`, `summary`, `category`, `author`, `license`, `outcomes`, `setupMinutes`, `requirements`, `team`, `agents`,
`rooms`, `routines`, `playbooks`). After the frontmatter comes a readable Markdown body. Inside the folder, two fields
point at files:

- `agents[].skills: [name]` reads `skills/<name>/SKILL.md`.
- `agents[].appearance.avatar: avatars/<key>.webp` reads that picture.

The folder name is the slug, and an `id` in the frontmatter is ignored. `bot.md` holds exactly one bot. Routines must
say `enabledAfterInstall: false`. Nothing else may be in the folder.

From the folders, `npm run catalog` builds `catalog.json`, `packages/<slug>.md` (v1, below) and
`teams/<slug>/team.mausteam.json` for older apps. Contributors never edit those files. On main, CI rebuilds them.

## One-file playbook (BotMRR Markdown v1)

The format is intentionally one normal Markdown file.

```md
---
botmrr: 1
id: example-team
release: 1.0.0
name: Example Team
tagline: The outcome in one sentence.
# listing, roles, rooms, playbooks, connections, and paused routines
---

# Example Team

> Give this file to your Chief of Staff.

## Activation
...

## Team
...
```

The frontmatter is required for a playbook published on BotMRR because it powers the listing and optional one-click imports. General-purpose agent products can ignore it completely. The Markdown body is authoritative for people and Chief-of-Staff agents, and must stand on its own when pasted into an agent conversation.

### The proof block (optional)

A playbook whose approach has a public money claim behind it may carry a `proof` block. The figure is always the creator's own claim, and it must link a public source — BotMRR verifies that the post exists, never the revenue.

```yaml
proof:
  amount: "$4,200"        # dollar figure as claimed, e.g. "$4,200" or "$12K"
  period: monthly         # monthly | weekly | daily | total
  source:
    url: https://x.com/handle/status/1234567890
    author: "@handle"
    date: 2026-07-14      # optional, YYYY-MM-DD
    quote: "exact sentence from the post containing the claim"  # optional
  credibility: claimed    # claimed | receipts (screenshots/proof shown in the source)
```

Never publish a proof block without a working public source, and never restate someone's claim as a bigger or rounder number than they used.

Required body sections are `Activation`, `Mission`, `Outcomes`, `Connections`, `Team`, `Chief of Staff`, and `Completion rule`. Add shared rooms, routines, playbooks, and examples only when the team needs them.

Products that cannot create sub-agents should perform each role sequentially and keep the work clearly separated. Products must never treat a connector name as authorization, and routines must stay paused until the user explicitly enables them.
