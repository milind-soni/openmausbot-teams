---
name: caption-and-brand-polish
description: Select and apply animated caption templates, brand kits, 9:16 speaker reframing, and safe-zone-verified motion graphics in Levea.
---

# Caption and Brand Polish

Use this skill to configure caption styling, brand identity, and visual polish for Levea video edits.

## Workflow

1. **Discover Caption Styles:** Call `list_caption_templates` to inspect the 60+ built-in templates (such as `hormozi`, `mrbeast`, `viral-pop`, `karaoke`, `neon-pop`, `subtitle-bar`, `spotlight`) and any user-saved templates.
2. **Discover or Update Brand Kits:** Call `list_brand_kits` and `get_brand_kit` to inspect palette colors, typography, logos, and voice settings, or `create_brand_kit` / `update_brand_kit` when the user provides brand guidelines.
3. **Apply in One Edit:** Pass `brandId` and `captionTemplatePreset` (or include the template and motion-graphics instructions in `prompt`) to `autonomous_edit`, `queue_edit`, or `apply_caption_template`.
4. **Verify Safe Zones:** Check the returned `verificationReport` to confirm captions and motion graphics pass contrast and platform safe-zone checks on the rendered frames.
