---
name: system-health-cleanup
description: Run a bot health self-check and clear stale caches safely.
---

# System Health Check and Safe Cleanup

Runs a structured self-check of the bot and removes stale temporary artifacts without touching live data or user work. It reports health, cleanup, and what was deliberately kept. It does not repair a broken installation, reconfigure models or voice, or delete project files.

## When to Use

- The user asks for a system self-check, health check, or whether everything is working.
- The user asks to delete useless caches, temporary files, or unused skills.
- Disk space is low or the bot directory has grown after repeated troubleshooting.
- Setup or provider changes were just made and the user wants confirmation nothing regressed.

## Procedure

1. Establish scope before touching anything. Identify the install root, bot data directory, loaded skill library, OS temp or scratch area, and automatic config-backup folder. Inventory read-only first: paths, file counts, sizes, and last-write times.
2. Run the built-in diagnostics first and record results: app version and startup diagnostics, current chat model and fallback count, decision-model connectivity, voice providers and saved keys, call mode, bot/automation/thread counts, memory notes and logs, free disk space, and free RAM. Use the settings screens and startup diagnostic output rather than guessing from files alone.
3. Inventory cleanup candidates separately from live data. Group stale temporary browser profiles, one-off scripts, screenshots, exports, and old config backups by size and age. Explicitly exclude active caches, databases, messages, logs, avatars, attachments, and user project directories.
4. Audit skills as their own category. Count loaded skills, read their descriptions, and note whether each was used recently. Do not reduce the count just to satisfy a cleanup request. A skill that was configured or used the same day is cheaper to keep than to rebuild.
5. Distinguish the loaded skill library from project folders that happen to be named skills. Project skill folders are user work and data, not disposable bot configuration. Leave them untouched and say so in the report.
6. Delete in ascending risk. Remove stale temporary browser profiles and one-off artifacts from prior sessions first. Keep files created today while troubleshooting is still open. Then prune automatic config backups to the latest one or two, never to zero.
7. Re-run the diagnostics and size measurements after cleanup. Confirm configured chat, decision, and voice keys still show as saved, and that startup diagnostics still pass.
8. Report in the user's language with a short headline, a compact table of checks and statuses, a cleanup detail listing counts and reclaimed size, and a kept-items section explaining what was not touched and why. Mention remaining old errors only with their current impact.

## Pitfalls

- Do not delete before inventorying, because a cache directory may belong to a running process or hold the only copy of a recent diagnostic artifact.
- Do not treat every file in a temp directory as disposable; keep same-day files from an in-progress troubleshooting session until the issue is closed.
- Do not equate unused with deletable for skills. If only a few skills exist and they cover active setup, deleting them forces the user to reconfigure providers.
- Do not delete project directories named skills; they are user work, not bot configuration.
- Do not touch messages, run databases, logs, avatars, or attachments during cache cleanup; they are records, not cache.
- Do not clear an application's active rotating cache; let it rotate normally and report its size instead.
- Do not call the system healthy from a file listing alone; check startup diagnostics and the live model and voice settings.
- Do not prune configuration backups to nothing; keep at least the most recent one so a bad cleanup can be reversed.
- Do not bury the outcome in raw command output; summarize the health table, reclaimed space, and kept items so the user can act on it.

## Verification

Run the same inventory and diagnostics again: startup diagnostics pass, reclaimed space is measured, configured chat, decision, and voice keys still show as saved, config backups are at most two, and no loaded skill or project file was removed. If a check fails, restore from the retained backup and report the failure instead of declaring success.