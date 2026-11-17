---
name: agent-memory-and-skill-curation
description: Record, forget and curate agent memory and skills.
---

# Agent Memory & Skill Curation

Records durable facts the person asks to remember, turns `/learn` input into reusable skills, and clears memory or files when they ask to start fresh. It decides what goes into memory versus a skill; it does not invent or verify product facts for them.

## When to Use

- `/learn <path or note>`, "记住这个", "remember this folder", "remember our workbench".
- "把前面的记忆清理掉", "重新开始", "忘掉这个", "删掉那个技能".
- "clear the previous stuff", "start fresh", "reset".

## Procedure

1. Inspect before recording. For a path or project, list it and read its README, AGENTS or rules files so the memory entry describes what it is, not just where it lives.
2. Check for collisions before writing: `skills_list` with the candidate name, and read `MEMORY.md`, so nothing is duplicated.
3. Write the fact with `memory_update` (append). If the team shares a memory store, mirror it with `propose_team_memory` using the same key.
4. Choose memory vs skill:
   - A single path, name, account or preference is memory only.
   - A reusable procedure or a kind of recurring work becomes a skill via `skill_manage`, with a class-level name.
   - If the name only fits one folder or one product, it is not a skill; keep it as memory.
5. Forget personal memory with `memory_update` action `forget` and the words to match in `old_text` (see Pitfalls).
6. Remove a learned skill with `skill_manage` action `delete` and `skill_name`.
7. Team memory has no delete action. Re-propose the same key with a retraction detail via `propose_team_memory`; the original is overwritten but the retraction entry remains. Report that, and point the person to settings for a hard delete.
8. On "clear the previous / start fresh": inventory what exists first (`MEMORY.md`, the skills directory, the task workspace), then scope cleanup to artifacts produced in this thread. Log the scope decision with `memory_log`. Preserve unrelated earlier project memory and state which entries were kept and why.
9. Verify after any change: re-read `MEMORY.md`, list the skills directory, and search the workspace for the removed term.

## Pitfalls

- `memory_update` action `forget` matches on `old_text`; passing the term as `text` fails silently. Put the words to remove in `old_text`.
- Do not create a skill to remember a single folder or path. It becomes a narrow skill that has to be deleted later; memory is the right store.
- Do not wipe unrelated earlier project memory when the person says "the previous stuff". Scope to what this conversation produced and report what was kept.
- Never report team memory as fully deleted when only a retraction entry was added.
- Deletion is not undoable. Confirm the resolved target exists and re-read it before removing a skill or editing memory entries.

## Verification

- After remembering: the entry appears in `MEMORY.md` (and in team memory if mirrored).
- After cleanup: searching the workspace for the term returns nothing outside the operation log, and the skills directory no longer contains the removed skill.
