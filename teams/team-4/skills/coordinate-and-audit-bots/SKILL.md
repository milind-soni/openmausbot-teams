---
name: coordinate-and-audit-bots
description: Delegate work to other bots and verify their results independently before reporting.
---

# Coordinating and Auditing Other Bots

Hands work to the other bots on the team, then re-checks what comes back before anything reaches the person. It does not cover changing a bot's model or collecting provider keys — see `openmausbot-engine-check` for that.

## When to Use

- The person asks to hand a task to another bot, or to restart a bot's failed or interrupted run.
- A bot returns a result the person will act on: files moved, numbers compiled, a page changed.
- You are asked to keep an eye on the other bots and flag their mistakes.

## Procedure

1. **Survey before dispatching.** List the bots and their current threads; check what is already running so the same job is not sent twice. Note which bot owns which area.
2. **Dispatch with a self-contained brief.** The receiving bot cannot see this conversation, so restate everything: goal, exact paths, constraints, deliverable, and the definition of done. Open a fresh thread for a new job; for a resume, name the precise step where the previous run stopped.
3. **Do not take the completion message as evidence.** A bot's summary is a claim. Open the files, re-run the measurement, or re-read the page yourself.
4. **Recompute, do not re-read.** For numbers, run your own command instead of trusting the reported figure. For file moves, check both directions: the file exists at the destination and no original remains. For long tables, read every row or at minimum a random sample and test each one.
5. **Push back with the exact failure.** Send the owning bot the specific check that failed and ask it to redo that part. Do not silently fix it for them, and do not accept the claim to keep things moving.
6. **Report a review table**, one row per object: what was claimed, how it was checked, pass or fail. State skipped or impossible items explicitly, and whether you accept them.

## Pitfalls

- Totals and "done" statements are where shortcuts hide; re-derive the number from the deliverable.
- One-sided checks pass while duplicates accumulate — always verify both source and destination.
- Compare filenames byte-for-byte (spaces, full-width brackets); an approximated name produces false failures.
- Carry forward what a bot openly could not do instead of dropping the caveat from your report.
- A bot that reports success on the wrong file is worse than one that reports failure; check the path before the content.

## Verification

Every figure and file count you report traces to a command you ran or a table you re-imported, and each failed row has been sent back to the bot that produced it.
