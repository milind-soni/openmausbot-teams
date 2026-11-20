---
name: capture-intent
description: Convert a product idea, product-level initiative, feature request, bug report, improvement request, ticket, or production incident into a validated and approved `intent.md` that is human-readable and machine-actionable. Use when a user asks to capture, clarify, formalize, document, review, or save product intent; requests an `intent.md`; begins a software change without agreed intent; or wants to start the Plan stage of an AI-native software development lifecycle. Interview the originator, require explicit human approval, validate the canonical structure, record approval metadata, and preserve the artifact's project history.
---

# Capture Intent

Capture the originator's intent once, in their own terms, as a stable proto-spec that a human can review and the next agent can act on.

## Keep the artifact boundary

Use `intent.md` to record what is wanted, why it matters, who or what is affected, and the governing constraints. Do not turn it into a requirements or implementation document.

| Artifact | Record here | Keep out of `intent.md` |
| --- | --- | --- |
| `intent.md` | Problem, proposed outcome, affected users and systems, scope, constraints, success, open questions | Detailed design, file changes, task breakdown, test implementation |
| `spec.md` | Requirements and design decisions | Do not generate unless the user starts the Design stage |
| `plan.md` | Files, work order, implementation risks, proof | Do not generate during intent capture |
| `CLAUDE.md` | Persistent project conventions, commands, architecture, recurring agent corrections | Do not copy general repository knowledge into an individual intent |

Treat a solution proposed by the originator as part of the desired outcome or as a hypothesis, not as settled design, unless it is an explicit constraint.

## Follow the workflow

### 1. Locate the intent home

Identify the active project root without changing files. Inspect any existing `intent/` directory and nearby project guidance. If there is no clear project root or more than one plausible project, ask the user which project to use.

Use the project repository as the default source of truth. If a ticketing or requirements system already owns the authoritative record, ask which system is the source of truth and preserve a source link or record ID in the draft.

### 2. Understand the request in the originator's language

Accept informal input. Classify it as `product`, `feature`, `bug`, `improvement`, or `incident` to choose the right follow-up questions, but retain one canonical artifact structure for every type.

Ask focused questions conversationally until the intent is concrete. Prefer one decisive question at a time or a very small related batch. Cover:

- the current problem or inability;
- affected users and systems;
- the proposed outcome;
- scope and explicit exclusions;
- constraints;
- observable success;
- material unknowns.

Read [intent-template.md](references/intent-template.md) for type-specific interview guidance and the exact output structure.

Do not invent missing facts. Label assumptions explicitly. Preserve unresolved questions instead of silently deciding them. If an unknown would materially change the intended outcome, keep the artifact in `draft` status.

### 3. Check readiness

Before drafting, verify that another product owner or agent could answer these questions from the artifact alone:

- What is wrong or newly possible?
- Why does it matter, and to whom?
- What outcome is wanted without prescribing unnecessary implementation?
- What is inside and outside the change?
- Which constraints must survive the next stage?
- What observable evidence would show success?
- Which decisions remain open?

If the answer to a core question is missing, continue the interview. Do not use polished wording to conceal ambiguity.

### 4. Produce a review draft

Render the complete proposed Markdown in the conversation. Keep the title and headings from the canonical template stable so machines can parse them. Use concise prose and bullets. Use `None identified` rather than deleting an empty required section.

Set `Status: draft`, `Approved by: Pending`, and `Approved at: Pending`. Show the proposed target path as `intent/<slug>/intent.md`. Create a short ASCII kebab-case slug from the intent title; remove Vietnamese diacritics and keep it stable and descriptive.

Do not create a directory, write a file, stage changes, or commit while the draft is under review. Ask the originator to correct misunderstandings or explicitly approve the draft.

### 5. Apply human corrections

Treat requested edits as authoritative unless they contradict each other or erase information required for the next stage. Revise and present the complete draft again after material corrections.

Approval must be explicit, such as `approve`, `approved`, `phê duyệt`, or an equally clear instruction to save and record the artifact. A request for another change is not approval. Do not infer approval from silence or vague positive feedback.

Record a human approver, never the agent itself. Use a reliably known human display name only when it is available in context; otherwise ask for the approver's name before writing the file. Treat approval as authorization to validate, save, and record only this artifact in project history when the project is version-controlled. Do not publish or push project changes unless separately requested.

### 6. Save the accepted artifact

After explicit approval:

1. Recheck the final content against the approved draft.
2. Change `Status: draft` to `Status: accepted`; retain the author and creation date; set `Approved by` to the human approver; and set `Approved at` to the current ISO 8601 timestamp with an explicit timezone.
3. Create `intent/<slug>/intent.md` under the confirmed project root. If the target already exists, do not overwrite it. Show the conflict and ask whether to update that intent or choose a new slug.
4. Run `python3 <skill-directory>/scripts/validate_intent.py <project-root>/intent/<slug>/intent.md`.
5. If validation fails, do not record or advance the artifact. Correct purely structural issues that do not change meaning; return any semantic gap to the originator for review and approval.
6. If the project is version-controlled, inspect its working state, stage only the validated `intent.md`, and commit it with `intent: capture <slug>`. Preserve all unrelated changes and do not push.
7. Verify that the recorded version exactly matches the accepted file. Report its path, validation result, approval metadata, and short revision identifier.

If version control is unavailable or recording fails, still preserve the approved file but explicitly state that the audit trail is incomplete. Never claim the AI-native handoff is complete without a valid artifact and recorded revision history.

Stop after the accepted `intent.md`. State that it is ready for the requirements-and-design pass, but do not generate `spec.md`, `plan.md`, or code unless the user separately requests the next stage.

## Preserve the human gate

The originator owns meaning; the product owner owns acceptance. Never let automation bypass review. The skill may synthesize, question, format, validate, save, and record, but it must not approve its own interpretation.
