---
name: viral-clip-production
description: Plan, queue, and verify end-to-end cloud video edits and vertical viral clips through the Levea MCP server without local ffmpeg.
---

# Viral Clip Production

Use this skill when turning long-form recordings (podcasts, interviews, demos, webinars) into finished videos or short-form vertical clips through the Levea MCP server (`https://api.livecore.ai/api/v1/misc/mcp`).

## Core Rules

1. **Send the complete editing intent in one call:** Do not split silence removal, 9:16 reframing, captions, B-roll, and MP4 export into separate `autonomous_edit` calls. Pass the full user brief verbatim to `queue_edit` (preferred for multi-minute renders) or `autonomous_edit`.
2. **Preserve progress with polling:** When `queue_edit` or `autonomous_edit` returns a `taskId`, `jobId`, or `status: "running"`, poll `check_task_status`, `check_job_status`, or `get_active_task`. Never re-invoke `autonomous_edit` to check progress.
3. **Human approval for destructive or irreversible work:** Set `requirePlanApproval: true` when the user wants to inspect the editing plan before rendering, and always ask for explicit confirmation before calling `delete_project`, `delete_asset`, `delete_brand_kit`, or `delete_caption_template`.

## Workflow

1. Call `list_projects` or `list_assets` to locate the user's source video (or issue a signed upload URL via `asset_upload_url` if the user wants to upload a local recording).
2. If the user specifies a brand or caption style, check available options with `list_brand_kits` and `list_caption_templates`.
3. Dispatch the edit via `queue_edit` (or `autonomous_edit`) with `project_id`, `prompt`, and optional `brandId` or `captionTemplatePreset`.
4. Poll until completion and return the rendered `videoUrl` along with `verificationReport.status` and any `qualityNotes`.
