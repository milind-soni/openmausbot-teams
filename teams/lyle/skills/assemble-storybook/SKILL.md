---
name: assemble-storybook
description: "Assemble and verify assigned By Her Grace Keepsakes storybook PDFs from approved words and art, including customer digital copies and Lulu print interiors and cover wraps. Use after art acceptance for layout and export; excludes novel editions, new story or art, printer uploads, orders and delivery."
---

# Assemble storybook PDFs

The assigned layout/assembly task performs this method for the [order's named coordinator](C:/Users/kehar/Documents/SOPS/STORYBOOKS/SOP-STORYBOOK-ORDER.md#ownership) or approved product-layout owner. PROJECTS-DESIGN may fill that assignment; its role name is not required merely to apply the skill. The process/role retains Kevin's art acceptance, proof, customer delivery, provider upload/order and cleanup gates. This method builds and checks files; it creates no new builder and confers none of those external actions.

## Inputs and specification owners

Receive the exact approved wording, child name(s), accepted art set, selected editable/personalize source or approved review PDF, requested digital/print formats and assigned output folder. For print work, also receive the exact trim, paper, binding and final interior page count.

Read the [Storybook Art Spec](C:/Users/kehar/Documents/SOPS/STORYBOOKS/SOP-STORYBOOK-ART-SPEC.md) for page/art dimensions, resolution, bleed, safe areas, spread splitting, cover-art placement and permitted enlargement. Use a fresh Lulu template for the exact print combination, from the [Lulu Templates reference home](<C:/Users/kehar/Documents/PROJECTS/ETSY/STORYBOOKS/Templates/Lulu Templates/>). That actual edition's template owns wrap/spine geometry; saved example dimensions are not substitutes. Resolve missing or conflicting inputs through the assignment before dependent layout.

Customer-order work stays in its temporary order folder under the order SOP. Reusable template masters are preserved separately.

## Build the assigned editions

- Keep words separate from the art: editable text set on the art in a quiet area, never in boxes, panels or bands. Wording stays as written except the authorized child's name(s).
- **Digital-only:** export the customer PDF. Lulu-specific print interior and wrap-cover requirements do not apply. Each delivered digital file must be below 20,000,000 bytes; inspect any compressed delivered version as the actual final.
- **Print interior:** build one PDF of single pages, first page on the right, including every interior page, blank and dedication. Use the Art Spec's bleed canvas and print resolution. Embed or outline fonts; no guides or password. The even page count must fit the selected binding's current requirements.
- **Print covers:** use the accepted separate front and back artwork from the Art Spec, then build one wrap PDF per requested binding from that edition's fresh Lulu template. Back on the left, front on the right. Lulu Prep does layout, not new art or redraws.

### Existing worked example

The selected-source example is [The Last Present in the Sleigh](<C:/Users/kehar/Documents/PROJECTS/ETSY/STORYBOOKS/Completed Books/The Last Present in the Sleigh/>). Its `Personalize - build_lulu_v01.py` builds the Lulu interior and covers from the approved review PDF. It contains a specific child's paths and file hash. If adapting it for assigned work, copy it and change those inputs; never edit the original. It is an example, not a universal build command or proof that a different edition was checked.

## Check the actual exported files

Reopen the finished PDFs; do not infer success from the build.

1. Extract the final text and compare wording and name spelling against the approved source/order on every page and cover.
2. Confirm page order and count. Render every page and cover and inspect each actual output, including legibility and layout. Sizes, resolution, safe areas, fold/inside edges and cover barcode/logo clearances must match the owning Art Spec and actual edition template. Check the final font/guide/password requirements too.
3. Apply [design-qc](C:/Users/kehar/.codex/skills/design-qc/SKILL.md) for the assigned final-file checkpoint. Reuse its completed art checks while inspecting changes caused by layout/export. Digital checks apply to the exact delivered customer PDF; print checks apply to the exact interior and each requested cover wrap.

### Existing checker limitation

`C:/Users/kehar/Documents/Codex/2026-10-30/task/art-upscale/validate_current_lulu_template.py` is scoped to the October 30 hardcover batch: its saved preflight hash, cover size, safe text, blank spine and canvas fill. An unchanged run reads that batch's own files; it does not check interiors or establish a new order's readiness. It would have to be pointed at the actual assigned cover files for its result to apply. Keep the rendered-file checks above; Lulu's own file check and preview remain in the order process. This limitation is not an assignment to build another checker.

## Return

Return the exact checked customer PDF or print interior/cover files, their version/source/template identification, actual checks and any unresolved limitation through the existing Design/QC handoff and production record. Self-check does not replace coordinator or Kevin acceptance. The order SOP resumes with proof/provider submission for print, or authorized digital delivery, followed by its customer cleanup rule; this method performs none of those actions.
