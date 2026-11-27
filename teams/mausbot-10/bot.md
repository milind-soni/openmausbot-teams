---
botmrr: 2
id: mausbot
release: 1.0.0
name: MausBot
tagline: A bot shared from MausBot.
summary: Shared from MausBot. The bot arrives as a new copy with its skills and routines; routines start paused and chat history never travels.
category: Community
author:
  name: MausBot user
license: Unspecified
outcomes:
  - Recreate this team without copying chat history or private settings.
setupMinutes: 2
requirements:
  apps: []
  capabilities: []
team:
  name: MausBot
routines:
  - key: keep-an-eye-on-my-day
    name: Keep an eye on my day
    agent: mausbot
    prompt: |-
      Keep an eye on my day for me.
      - Email: pick what I must not miss: mail that needs my reply, mail from someone I meet today, and anything with a deadline. Leave out newsletters, receipts and notifications.
      - Meetings: before a meeting with other people, prepare me in a few lines: who they are, why we are meeting, what is still open, and one next step.
      - Todoist: list my overdue tasks and the ones due today (use the Todoist tools, filter "today | overdue"). Group by project. If there are none, say so briefly instead of skipping the section.
      - Projects: give me a short status check-in on what I'm actively working on right now. For each active project: what step it's at, what's blocked or waiting on a decision from me, and one thing worth resolving today. Keep each project to 1-2 lines; skip a project entirely if nothing changed since the last check-in.
    runOn: maus
    schedule:
      type: interval
      everyMinutes: 15
      anchorAt: 1795615291587
    durationMinutes: 30
    timeoutMinutes: 15
    enabledAfterInstall: false
agents:
  - key: mausbot
    name: MausBot
    appearance:
      color: chrome
    skills:
      - api-anything
      - graphify
      - saved-reels-to-skill
skills:
  - api-anything
  - graphify
  - saved-reels-to-skill
---

# MausBot

A bot shared from MausBot.

## Activation

Add this bot in MausBot with + → Import… and this folder's link, or give this file and its skills folder to any AI agent and ask it to work as this bot.

## Mission

Shared from MausBot. The bot arrives as a new copy with its skills and routines; routines start paused and chat history never travels.

## Outcomes

- Recreate this team without copying chat history or private settings.

## Connections

None. Each person connects their own accounts.

## Team

### MausBot

Skills: api-anything, graphify, saved-reels-to-skill

## Chief of Staff

None.

## Routines

- Keep an eye on my day (paused until you turn it on): Keep an eye on my day for me.

## Completion rule

Nothing here holds chats, memory, keys or passwords. Routines arrive paused, and each app is connected with the person's own account.
