---
name: wordpress-backup-management
description: Manage WordPress backups, remote storage, and disk quota.
---

# WordPress Backup Management

Configure, monitor, and recover WordPress backups and remote cloud storage using UpdraftPlus. This covers scheduled retention, remote authentication, and clearing stranded archive chunks when hosting quotas are exceeded. It does not cover server-level database dumps or external hosting migrations.

## When to Use

- "sao lưu website" or "backup WordPress"
- "kết nối Google Drive UpdraftPlus" or "link remote storage"
- "đầy dung lượng hosting do backup" or "dọn dẹp wp-content/updraft"
- "lỗi Disk quota exceeded ZipArchive"

## Procedure

1. Check current disk usage and existing backups:
   - Navigate to `wp-admin/options-general.php?page=updraftplus`.
   - Inspect "Web-server disk space in use by UpdraftPlus" and check the Existing Backups table for stuck or incomplete jobs.
2. Configure remote storage before creating large local archives:
   - Open Settings tab at `wp-admin/options-general.php?page=updraftplus&tab=settings`.
   - Select the remote storage provider (e.g. Google Drive), set the folder path, and save settings.
   - Complete the remote authorization workflow via the generated link.
3. Configure automated retention rules:
   - Set database backup frequency (e.g. Daily, retain 7).
   - If hosting disk quota is constrained, set file backup frequency to Manual to prevent automated background zip archiving from exhausting disk space. Otherwise, set a safe interval (e.g. Weekly, retain 4).
   - Save changes to apply retention rules.
4. Clean stranded chunks from failed or incomplete backups:
   - If a backup halts due to quota limits, locate the incomplete row `(Chưa xong)` in Existing Backups.
   - Click the Delete link on the incomplete backup row.
   - Confirm the UI dialog to remove temporary `.zip` chunks from `wp-content/updraft/` and instantly reclaim disk space.
5. Run a verification backup:
   - Trigger "Backup Now" on the Backups tab. When disk space is tight, uncheck "Include files in the backup" to archive and test only the lightweight database.
   - Ensure the remote destination checkbox is enabled.
   - Monitor progress until remote sync completes and verified remote storage badge appears.

## Pitfalls

- Creating full local backups on a hosting plan close to its quota limit causes `ZipArchive::close(): Write error: Disk quota exceeded`, leaving multi-gigabyte zip chunks stranded on disk.
- Scheduling automated file backups when hosting quota is near limit triggers background archiving of large `uploads/` directories and crashes disk quotas; keep files on Manual and schedule only database backups.
- Leaving incomplete backup jobs unpruned prevents automatic cleanup because UpdraftPlus only deletes local chunks after a complete remote sync.
- Navigating away before confirming UI delete modals leaves orphaned chunk files in `wp-content/updraft/`.
- Form changes on the settings tab trigger browser unload confirmation dialogs that block scripted navigation if unhandled.

## Verification

Confirm on `wp-admin/options-general.php?page=updraftplus` that "Web-server disk space in use by UpdraftPlus" decreases to minimal levels and the latest backup shows the remote storage badge.