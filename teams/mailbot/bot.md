---
botmrr: 2
id: mailbot
release: 1.0.0
name: Mailbot
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
  name: Mailbot
routines:
  - key: draft-replies-to-client-emails-and-my-zoho-desk-
    name: Draft replies to client emails and Zoho Desk tickets
    agent: mailbot
    prompt: |-
      FIRST, CONNECT TO ZOHO. Use your own connected Zoho Mail and Zoho Desk accounts. Find the Zoho tools through your tool search, then use the workbench to call the Zoho APIs directly where no ready tool exists.
      NEVER SKIP A CHECK. If the tools cannot be reached or a call fails, make up to 3 attempts in total, waiting a few seconds between them. Only after 3 failed attempts, report 'ZOHO CHECK FAILED - ' followed by what you tried and the exact error text of each attempt. Never write NOTHING NEW for a run that did not actually check both the inbox and the Desk tickets.

      SIGNATURE. Every draft must end its text with your own HTML signature block (logo, name, title, company, email, phone), placed after the reply text and before the quoted original message. Store the block in a memory file the first time you set this up, or rebuild it from your Zoho Mail signature. The logo must be a public link, never a link that only works when logged in.

      FULL CHAIN QUOTING. Below the signature, quote the customer's message together with the whole earlier conversation, never summarised or retyped. In Desk, use the customer thread's full content and, if it lacks the earlier history, append earlier threads newest first, each under an 'On <date>, <name> wrote' line. In Mail, quote the full original body including its history. After saving, check the saved draft contains the earlier history; if not, delete your own draft and create it again.

      PART 1, EMAIL. Check your Zoho Mail inbox for emails that arrived in the last 60 minutes that have no existing draft or sent reply (also check Drafts and Sent for the same subject). Read your reply-style memory note first if you have one. A client email comes from an outside company, a real person writing about work. Skip colleagues at your own company, newsletters, notifications, alerts, no-reply senders and anything needing no reply. For each, read the full message, then save a REPLY-ALL DRAFT on that exact message so it stays in the same chain (never a new email, never send): reply to the sender, cc all original To and CC people except you, subject 'Re: ' + original subject, html content (reply text, signature, then the full quoted original). Style: 'Hello <FirstName>,', short, polite.

      PART 2, ZOHO DESK. List only tickets assigned to you. For each ticket that is not Closed or Resolved, whose latest thread is incoming from a customer, with no existing draft reply and no later outgoing reply, read the latest thread and save a reply-all draft on the ticket: from your support address, to the customer who wrote, cc everyone else on the latest thread, replying to that thread, html content (reply text, signature, then the customer's full message with its whole history quoted). Never send. Skip automated alerts from no-reply senders.

      For both parts: never invent facts, credentials, IPs or completion status; use [square-bracket placeholders] where the owner must supply an answer. Never repeat passwords found in threads.

      REPORT: if you saved any drafts, start with 'DRAFTS READY' and list each on its own line: 'Email draft: <exact subject> (to <name>)' or 'Desk ticket #<number>: <exact subject> (to <name>)', plus one short line on what the reply says. If you checked both and nothing was new, report only 'NOTHING NEW'. If you could not check after 3 attempts, report 'ZOHO CHECK FAILED - ...'.
    runOn: maus
    schedule:
      type: interval
      everyMinutes: 5
      anchorAt: 1795448543737
    durationMinutes: 30
    continuity: true
    enabledAfterInstall: false
agents:
  - key: mailbot
    name: Mailbot
    appearance:
      color: coral
      mascotBody: cursor
---

# Mailbot

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

### Mailbot

## Chief of Staff

None.

## Routines

- Draft replies to client emails and Zoho Desk tickets (paused until you turn it on): FIRST, CONNECT TO ZOHO. Use your own connected Zoho Mail and Zoho Desk accounts. Find the Zoho tools through your tool search, then use the workbench to call the Zoho APIs directly where no ready tool

## Completion rule

Nothing here holds chats, memory, keys or passwords. Routines arrive paused, and each app is connected with the person's own account.
