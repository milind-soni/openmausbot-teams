---
name: onboarding-capability-audit
description: Audit connected apps and rank work to delegate.
---

# First-Meeting Capability Audit

Turns 'let's get to know each other' into a concrete picture of what the person is working on, built from their connected accounts instead of from generic assistant capabilities. It ends with a ranked list of work to hand over, each item stating what the assistant will do and what the person must supply, plus a plain-language restatement of their goals. It does not perform any of the proposed work or change account settings during the audit.

## When to Use

- '先认识一下', '了解我最近在关注什么', '我的工作里有哪些事可以交给你'.
- 'look at my connected apps and tell me what you can do for me', 'what should I hand off to you'.
- A new user asks for a prioritised plan of what to delegate, ranked by time saved.
- The person asks what they have connected or what recent activity you can see.

## Procedure

1. Read the session's memory files first (`read` on the workspace `memory/` folder, e.g. `memory/x.md`) so you do not re-ask what the person already told an earlier turn.
2. Enumerate what is connected: `COMPOSIO_MANAGE_CONNECTIONS` with `{toolkits: [{name, action: 'list'}]}`, or `COMPOSIO_SEARCH_TOOLS` with one `queries` entry per toolkit and `session: {generate_id: true}`. Record toolkit name, account handle and status.
3. Pull recent activity from each connected toolkit, one focused query per app:
   - Gmail: `gmail_search_emails` with `query: "newer_than:45d -category:promotions"` and a generous `max_results`.
   - Calendar: `googlecalendar_list_events` with explicit `time_min` and `time_max` covering both the recent and near-future window.
   - Drive / GitHub / Notion / X: find the action slugs with `COMPOSIO_SEARCH_TOOLS`, call `COMPOSIO_GET_TOOL_SCHEMAS` with those slugs to get the exact argument shape, then run them with `COMPOSIO_MULTI_EXECUTE_TOOL`.
4. Read the evidence, not just the titles: repo names and open issue counts, billing and renewal mail, course and enrolment mail, the names of saved files. These reveal the real projects and deadlines.
5. Persist the inventory with `mcp__agents__memory_update` (`action: 'append'`): accounts and handles, active projects, gaps (empty calendar, an API quota that blocks reads), and which apps the person treats as work versus leisure.
6. Answer in the person's language and in this order:
   1. What is connected, with handles.
   2. What the last weeks show, as specific facts — dates, amounts, repo names, issue counts.
   3. The gaps: an app that is connected but empty or quota-blocked, and what that implies about how they work.
   4. Which apps are work or learning and which are leisure, stated briefly, because that decides what is worth automating.
   5. The delegated-work list, numbered and sorted by time saved, each item with a short bold name and an estimate, one paragraph on how you would do it, and an explicit line saying what you need from them.
   6. A closing section restating their work and goals in your own words: current stage, the parallel tracks, and what they are ultimately moving toward.
7. Keep every proposed item anchored to evidence found in the audit; where the evidence is thin, say what you could not read and what would unlock it.

## Pitfalls

- Do not list generic assistant capabilities; each item must trace to something actually seen in their mail, repos, files or calendar.
- Do not omit the 'what I need from you' half of each item — that omission is what makes a delegation plan unusable.
- Do not read a quiet app as a missing app: an empty calendar or a workspace holding only template pages is a finding about how they plan, and belongs in the answer.
- Do not treat a connected account as readable: an exhausted API quota or a pay-per-use project with no balance returns an error on read, and that belongs under gaps, not under what you can do.
- Do not rank a leisure activity as a time black hole to optimise. Confirm the person's own framing first, and when they say an app is entertainment, drop every filtering or summary item for it and offer at most one optional on-demand service instead (read a shared link, check its claims, save a note).
- When the person restates their priorities after seeing the plan, rewrite the division of labour to match, drop what they did not endorse, and save the new framing to memory instead of defending the earlier ranking.
- Do not re-ask in chat what memory already holds; read the memory files before asking anything.
- If one action inside a multi-toolkit call fails, fetch its schema with `COMPOSIO_GET_TOOL_SCHEMAS` and retry that one, rather than dropping the whole app from the audit.
- Save the inventory to memory in the same turn; the next conversation should not have to re-derive the accounts and projects.

## Verification

The answer names each connected account, says which apps the person treats as work versus leisure, cites at least one concrete recent fact per active app, and every delegated item carries both a delivery method and a line on what the person must provide; the memory append from step 5 is visible in the transcript.
