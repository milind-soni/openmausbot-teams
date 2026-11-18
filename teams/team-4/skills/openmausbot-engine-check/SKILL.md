---
name: openmausbot-engine-check
description: Determine which model a bot is actually running, switch it, and collect a provider key safely.
---

# OpenMausBot Engine Check

Answers "what model is actually running" from OpenMausBot's on-disk config, never from self-report or the channel label in the app. Also covers moving bots onto another provider's model and collecting a provider API key when a channel needs connecting.

## When to Use

- The person asks what model is running, or disputes an earlier answer about it.
- The person wants the default model changed, or a quota/billing error stops the bots.
- A provider channel needs to be connected or restored.
- The person asks for a secure card to submit an API key.

## Procedure

1. **Check config before answering.** Do not name a model from memory or from the channel's label; read the files.
2. **Read engine state** from the OpenMausBot data folder (usually under the user's home directory):
   - `config.json` — the configured default.
   - `providers/engine-status.json` — per-engine active state; this identifies the fallback actually serving a conversation when the primary channel has no key.
   - `providers/engine-models/<engine>.json` — model list per engine.
3. **Resolve the real upstream of a channel.** If a channel looks like one provider but points elsewhere, read that engine's own settings file and report only the base URL and model mapping — never the token. A base URL pointing at another vendor means the channel runs that vendor's model despite its label.
4. **To switch models**, confirm the target id from the model catalog first, then apply the change through the team-setup tool: one update operation per bot with the new model selection. Confirm the result by re-reading the setup.
5. **After a switch**, resend stuck work as a NEW thread with a message restating the exact step where the old run stopped. Changing a default does not rebind existing threads.
6. **To collect a missing key**, request a file-delivery credential card and name the vendor console in the reason. Never ask for a key in chat. Wait for the card before reconnecting the channel.
7. **To probe channel auth**, load the token from the settings file into a variable and send a minimal request; print only the HTTP status or error text, never the token.

## Pitfalls

- The app's channel label is not the truth; verify from the settings files.
- A person insisting on a model name may be describing the configured channel while a fallback serves the conversation — explain both instead of flatly contradicting them.
- Existing threads stay on the old model and keep hitting the old provider's error; only a new thread moves the work.
- A 429 naming quota or insufficient balance is an account condition only the person can fix: say so once and stop.
- The settings panel cannot read provider keys reliably; the files under the providers folder are authoritative.
- Never print or quote an API key or auth token in chat or tool output.

## Verification

The model you report matches `engine-status.json` plus the base URL and model mapping in the engine's settings file; after a switch, the setup view shows the new model and the resumed work runs in a new thread. Any key was delivered through a file card, never in chat.
