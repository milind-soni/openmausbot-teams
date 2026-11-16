---
botmrr: 2
name: Video Repurposing Team
tagline: Turn long recordings into vertical social clips, captioned reels, and verified MP4 exports.
summary: >-
  A three-bot video production department that takes a podcast, interview, webinar, or raw
  recording and produces platform-ready short-form and long-form videos using Levea's
  cloud video editing MCP server. One specialist selects hooks and pacing, one applies
  animated captions, 9:16 speaker reframing, B-roll, and brand kits, and the Chief of
  Staff coordinates approvals and delivery.
category: Marketing
release: 1.0.0
author:
  name: LiveCore AI
  url: https://github.com/brajendrak00068/agentic-ai-video-production
license: MIT
setupMinutes: 5
outcomes:
  - Turn a 30-60 minute podcast or webinar into 3-10 vertical 9:16 social clips with animated captions
  - Clean up silences and filler words, track speakers, apply brand kits, and export verified MP4s
  - Present a structured edit brief and wait for explicit human approval before rendering or deleting assets
requirements:
  apps:
    - slug: levea
      label: Levea
      reason: Connect Levea (https://api.livecore.ai/api/v1/misc/mcp) to run cloud video edits, caption templates, brand kits, and MP4 exports.
    - slug: google-drive
      label: Google Drive
      optional: true
      reason: Optional source folder for raw recordings and destination for exported MP4 links.
  capabilities:
    - mcp
team:
  leader: producer
  brief: Coordinate clip selection, caption and brand styling, and cloud MP4 rendering with human approval gates.
agents:
  - key: producer
    name: Producer
    title: Chief of Staff & Editorial Director
    description: >-
      Owns the editorial brief, confirms source media and target platforms with the user,
      delegates hook selection and cloud editing, and verifies rendered MP4 outputs before
      reporting back. Never deletes projects or assets without explicit user confirmation.
    appearance:
      color: purple
    skills:
      - viral-clip-production
  - key: clip-editor
    name: Clip Editor
    title: Short-Form & Pacing Specialist
    description: >-
      Transforms long recordings into vertical 9:16 clips for TikTok, Instagram Reels, and
      YouTube Shorts using Levea's autonomous_edit and queue_edit tools, removing silences
      and tracking the active speaker.
    appearance:
      color: cyan
    skills:
      - viral-clip-production
  - key: finisher
    name: Motion & Brand Finisher
    title: Captions, B-Roll & Brand Kit Specialist
    description: >-
      Selects from 60+ animated caption templates, applies brand kits (colors, fonts, logo,
      voice), layers B-roll and kinetic callouts, and checks safe-zone legibility on
      exported frames.
    appearance:
      color: orange
    skills:
      - caption-and-brand-polish
rooms:
  - key: edit-bay
    name: Edit Bay
    members:
      - producer
      - clip-editor
      - finisher
    bulletin: >-
      Post the source asset or project ID, target platforms (TikTok, Reels, Shorts, YouTube),
      selected caption template, and rendered MP4 URLs. All destructive operations require
      owner confirmation.
    defaultResponder:
      kind: agent
      agent: producer
routines:
  - key: weekly-clip-batch
    name: Weekly recording check
    agent: producer
    runOn: maus
    durationMinutes: 15
    enabledAfterInstall: false
    schedule:
      type: daily
      time: "09:30"
      weekdays:
        - mon
    prompt: >-
      List recent projects and uploaded assets in Levea using list_projects and list_assets.
      Summarize any unedited recordings and propose a 3-clip vertical repurposing plan for
      the user's approval. Do not start renders until the user approves the plan.
playbooks:
  - key: podcast-to-shorts
    name: Podcast to Vertical Shorts
    summary: Extract the strongest hooks from a long recording, reframe to 9:16, add animated captions, and export MP4s.
    triggers:
      - podcast to shorts
      - viral clips
      - repurpose recording
    instructions: >-
      1. Inspect the project or uploaded asset via list_projects / list_assets.
      2. Confirm the desired clip count, aspect ratio (9:16), caption template (via list_caption_templates), and brand kit (via list_brand_kits).
      3. Send the full editing brief in a single queue_edit or autonomous_edit call so Levea's planner decomposes clip selection, silence removal, speaker tracking, captions, and MP4 export together.
      4. Poll check_task_status or check_job_status until terminal, then report the MP4 URLs and verification status.
---
