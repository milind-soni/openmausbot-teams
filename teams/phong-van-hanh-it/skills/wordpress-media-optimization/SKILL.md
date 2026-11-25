---
name: wordpress-media-optimization
description: Optimize WordPress media and clean unused images.
---

# WordPress Media Optimization

Optimize image storage, convert uploads to WebP, and safely prune unused media files using WordPress media optimization plugins and Action Scheduler. This covers background queue execution, WebP conversion, and safe review workflows for unused images. It does not cover server-level CLI image transcoding or direct filesystem modifications over SSH.

## When to Use

- "tối ưu ảnh WordPress" or "optimize WordPress images"
- "chuyển ảnh sang WebP" or "convert images to WebP"
- "dọn dẹp ảnh rác" or "clean unused images"
- "chạy tối ưu ảnh khi tắt máy tính" or "run image optimization in background"

## Procedure

1. Review media library footprint:
   - Check total media attachment counts and storage usage in `wp-admin/upload.php` or within the optimization plugin dashboard.
2. Configure WebP conversion parameters:
   - Navigate to conversion settings (e.g. `wp-admin/admin.php?page=thumbpress#/settings` or `#/convert-to-webp`).
   - Choose required thumbnail sizes to convert and maintain original backup settings if quota allows.
3. Select background execution for unattended processing:
   - Choose "Convert in background" or "Detect in background" rather than interactive browser AJAX ("Convert Now" / "Detect Now").
   - Background modes dispatch tasks into the WordPress Action Scheduler queue (`wp-admin/tools.php?page=action-scheduler`), allowing the server to process batches independently without keeping the client browser open or machine running.
4. Scan and stage unused images:
   - Run the unused media scanner in background mode (`#/unused-images`). Check whether background detection or bulk cleanup requires a Pro plugin tier; if locked, prioritize WebP conversion for immediate storage reduction.
   - Wait for the scanner to populate the staged list of candidates.
   - Inspect staged images before deletion to ensure images referenced directly in theme templates, custom CSS, or landing page builders are not falsely flagged.
5. Execute verified pruning and monitor progress:
   - Delete confirmed unreferenced images in batches to reclaim disk space.
   - Verify queue completion and check for stuck jobs under `wp-admin/tools.php?page=action-scheduler`.

## Pitfalls

- Running interactive browser AJAX operations ("Convert Now" / "Detect Now") aborts mid-process when the client computer sleeps, network disconnects, or browser tab closes; always select background queue processing for large media collections.
- Deleting detected unused images immediately without staging review breaks assets hardcoded in theme files, stylesheets, or external page builder shortcodes that lack post attachment metadata.
- Relying on automated background cleanup for unused images in freemium optimization plugins fails when feature tiers restrict bulk background detection or deletion behind Pro licenses; inspect license requirements before committing to unattended pruning workflows.
- Queueing large batches when WP-Cron or Action Scheduler is disabled stalls background conversion indefinitely; verify scheduled actions runner is active at `wp-admin/tools.php?page=action-scheduler`.

## Verification

Check `wp-admin/tools.php?page=action-scheduler` to confirm conversion and detection tasks transition to Complete, and inspect frontend image delivery to verify WebP output.
