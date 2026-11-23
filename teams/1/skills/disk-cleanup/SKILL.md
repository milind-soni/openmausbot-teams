---
name: disk-cleanup
description: Cross-platform disk space analysis and cleanup — Windows/macOS/Linux with role-based scanning strategies
---

# Disk Cleanup Skill

## Core Principles

- **Never auto-delete** — All cleanup actions require explicit user confirmation before execution
- **Soft-delete by default** — Files are moved to `~/.disk-cleanup-stash/` for 7 days; recoverable if deleted by mistake
- **Batch scanning** — 3–5 commands per batch to avoid permission prompt spam; use timeouts for large directories
- **Suggest, don't push** — Present a checklist for users to review; no nagging or auto-selection

## Four-Step Workflow

```
Step 1: Detect OS → Disk overview (with >80% pressure warning)
Step 2: Batched scans (Quick → Cache → Deep)
Step 3: Interactive checklist → User selects items → Confirm summary
Step 4: Execute deletions → Verify & compare → Report → Stash management
```

---

## Step 1: Detect OS + Disk Overview

### 1.1 OS Detection

```bash
uname -s   # MINGW* = win | Darwin = macos | Linux = linux
echo "$HOME"
```

Store the result in the `OS` variable. On Windows, prefer Git Bash paths (`/c/Users/...`). Fall back to PowerShell when `df` is unavailable.

### 1.2 Disk Overview

**Windows:**
```bash
df -h /c /d /e /f /g 2>/dev/null || powershell -Command "Get-PSDrive -PSProvider FileSystem | Select Name,Used,Free | ft -AutoSize"
```

**macOS:**
```bash
df -h / && df -h | grep -E '^/dev/'
```

**Linux:**
```bash
df -h -t ext4 -t xfs -t btrfs -t zfs 2>/dev/null || df -h
```

### 1.3 Select Target Drives

After showing the disk overview and pressure levels, **prompt the user to choose scan scope** (this is critical for performance — avoid wasting time on irrelevant drives):

```
C:  134G total, 84G used (63%) 🟡
D:  167G total, 80G used (48%) 🟢
E:  176G total, 3.9G used (3%) 🟢

Select drives to scan:
1. C: only (system drive — caches, configs, temp files)
2. D: / E: only (data drives — large files, downloads, VMs)
3. All drives
4. Custom (enter drive letters, e.g. C D)
```

**Default recommendation**: If C: >80% → option 1; if data drives >80% → option 2; if all high → option 3.

Store selected drives in `SCAN_DRIVES` set (e.g. `{C}`, `{C,D}`, `{D,E}`). All subsequent scan commands are scoped to these drives only. For full scans, set `timeout: 300000` and inform the user it may take a few minutes.

### 1.4 Identify User Roles

Ask the user which roles apply (multi-select; `general` is always enabled):

| Tag | Role | Priority scan targets |
|------|------|----------------------|
| `dev` | Developer | IDE caches, build artifacts, Docker, package managers, SDKs |
| `design` | Designer | Adobe/Blender/Figma caches, exported assets |
| `game` | Gamer | Steam/Epic install directories, Unity caches, recordings |
| `data` | Data/ML | Conda environments, pip cache, model files, datasets |
| `general` | General (default) | Browser caches, downloads, temp files, recycle bin |

Store selected roles as `ROLES`. During scanning: directories tagged with a role in the reference file are **only scanned and shown if the user has that role**. Untagged directories are always scanned.

---

## Step 2: Batched Scanning

### 2.1 Read OS Reference File

**Use the Read tool to load the ref file from the same directory as this SKILL.md:**

```
Read: <skill-base-dir>/ref-win.md     # OS = win
Read: <skill-base-dir>/ref-macos.md   # OS = macos
Read: <skill-base-dir>/ref-linux.md   # OS = linux
```

`<skill-base-dir>` is the absolute path to the directory containing this SKILL.md.

The reference file provides **scan commands, cleanup classification tables, and protection lists** for the detected OS. Read it and proceed with the three batches below.

### 2.2 Batch 1: Quick Scan (4 parallel commands, <30s)

Scan user directory top-level + recycle bin + cache top-level + **only known large directories on selected `SCAN_DRIVES`**.

Get exact commands from the reference file **「Quick Scan」** section. **Only execute for drives in `SCAN_DRIVES`** (e.g. if user chose C: only, skip D:/E: commands).

### 2.3 Batch 2: Cache Scan (5 parallel commands, <60s)

Scan IDE caches/logs, browser caches, package manager caches, AI assistants, role-specific directories.

Get exact commands from the reference file **「Cache Scan」** section. Based on `ROLES` from Step 1.4, **skip irrelevant directories** (e.g. if `ROLES` doesn't include `dev`, skip Gradle/Maven/Docker).

**Progressive scan rules** (triggered automatically in Batch 2):
- **Tencent subdirectories**: If `~/AppData/Roaming/Tencent` overall >500M (Windows), automatically follow up with `du -sh ~/AppData/Roaming/Tencent/*` to break it down. Classify `xwechat` as 🚫, `QQLive`/`QQMusic`/`WeMeet` as ⚠️ by role, `WeGame` only for game role.
- **pip cache**: When `dev` is in `ROLES`, use `pip cache info` to get the size. Results directly match the ✅ safe table (`pip cache purge`).
- **`~/.gradle/caches`**: When `dev` is in `ROLES`, scan this subdirectory separately (not just `~/.gradle` overall) to match the ✅ safe table.

### 2.4 Batch 3: Deep Scan (3 sequential commands, 120s each)

Large files, duplicate files, old downloads — these three take longer. Run sequentially and report progress.

```bash
# === Large files (>100MB, skip protected directories) ===
# Use ls -l instead of find -printf for macOS BSD find compatibility
find ~/ -type f -size +100M \
  \( -path '*/.git/*' -o -path '*/node_modules/*' -o -path '*/Windows/*' -o -path '*/Program Files/*' -o -path '*/AppData/*' -o -path '*/.vscode/*' -o -path '*/.cursor/*' -o -path '*/.jdks/*' \) -prune \
  -o -type f -size +100M -exec ls -lh {} \; 2>/dev/null | sort -k5 -rh | head -60

# === Old downloads (>30 days) ===
find ~/Downloads -type f -mtime +30 -exec ls -lh {} \; 2>/dev/null | sort -k5 -rh | head -40

# === Duplicate detection (by name + size, within limits) ===
find ~/Downloads ~/Desktop ~/Documents -type f -size +1M \
  \( -path '*/.git/*' -o -path '*/node_modules/*' \) -prune \
  -o -type f -size +1M -exec ls -l {} \; 2>/dev/null | \
  awk '{name=$NF; size=$5; gsub(/.*\//,"",name); key=name":"size;
    if(key in seen){if(!p[key]++)print "\nDuplicate:"name"("size"B)"; print "  "seen[key]; print "  "$NF}
    else seen[key]=$NF}' | head -40
```

> Deep scan on partitions with many large files may take 1–2 minutes. Set `timeout: 180000`.
>
> **Note**: In C:-only / dev-role scenarios, most large-file results will fall under `AppData`, `.vscode`, `.cursor`, `.jdks` etc. — directories already covered by Batch 2 or blocked by 🚫 rules. Low yield from deep scan in these cases is expected, not a bug.

### 2.5 Scan Output Format

After each batch, summarize results:

```
--- Batch 1: Quick Scan ---
C:\Users\xxx\.lingna            5.1G  [AI Assistant]
C:\Users\xxx\.gradle            2.3G  [Dev Cache]
D:\$RECYCLE.BIN                 4.8G  [Recycle Bin]
...
```

---

## Step 3: Generate Interactive Checklist

### 3.1 Build the Checklist (execution steps)

**Input**: Scan results (`du` output lines: `size path`) + the three sub-tables in the ref file's cleanup classification table (✅/⚠️/🚫)

**Step A: Parse scan results**

Each result extracts two fields: `size_raw` (e.g. `5.1G`, `512M`) and `full_path` (absolute path).

**Step B: Match against classification table**

For each scan result, match in this priority order against the ref file's classification tables:

1. Extract the tail (last 2 path components) from `full_path`, e.g. `/c/Users/xxx/.lingma` → `.lingma`
2. Normalize: replace `$HOME` or `~` with the actual home path prefix
3. Search the ✅ Safe, ⚠️ Confirm, 🚫 Forbidden tables **in order** using substring match (`full_path` contains the table path pattern, or tail name equals)
4. Matching rules:
   - Paths with `*` in the table → glob match (e.g. `JetBrains/*/log` matches `JetBrains/IntelliJIdea2024/log`)
   - Paths without `*` → suffix match (`full_path` ends with that path)
   - Prefer longest match (more specific paths win)

**Step C: Assign classification and default action**

| Matched table | Classification | Default | Description |
|---------------|---------------|---------|-------------|
| ✅ Safe | safe | `Y` | Pre-selected, user can deselect |
| ⚠️ Confirm | confirm | `n` | Skipped by default, user picks y/d |
| 🚫 Forbidden | forbidden | — | Not selectable, display only |
| No match | unknown | `n` | Marked "unrecognized", user decides |

**Step D: Add special entries for large/duplicate files**

For Batch 3 large file results:
- Extensions `.iso` `.exe` `.msi` `.zip` `.tar.*` `.dmg` `.mp4` `.avi` `.mkv` → classify confirm, tag 🟢, note "Installer/media file, safe to delete if not needed"
- Extensions `.bak` `.old` `.tmp` or path contains `backup` `cache` or extension `.log` → classify confirm, tag 🟡, note "Backup/cache/log"
- Everything else → classify confirm, tag 🔴, note "Unknown large file, review carefully"

For duplicate file groups:
- Auto-classify one copy (shallowest path) as forbidden "keep this copy"
- Classify remaining copies as confirm "safe to remove", note "Duplicate — kept {path of kept copy}"

**Step E: Filter by role**

For ⚠️ Confirm items, check the role tag from the ref table:
- Tag matches any role in `ROLES` → show
- No tag (untagged) → show
- Tag has no overlap with `ROLES` → downgrade to forbidden, note "Not in your role scope"

**Step F: Format output**

Use the 3.2 checklist format. Sort order:
1. Safe items first (by size descending)
2. Confirm items in the middle (by size descending)
3. Forbidden items last (by size descending)

### 3.2 Checklist Format

```
==================== Disk Cleanup Checklist ====================

🟢 Safe to Clean (recommended, all pre-selected Y — enter number to deselect):

  [Y] 1. C:\Users\xxx\AppData\Local\Temp         1.2G  Windows temp files
  [Y] 2. D:\$RECYCLE.BIN                         4.8G  Recycle bin contents
  [Y] 3. C:\Users\xxx\.gradle\caches             1.8G  Gradle download cache
  [Y] 4. C:\Users\xxx\Chrome\Cache               0.4G  Browser cache
  [Y] 5. pip cache                               0.2G  pip download cache

  Safe items subtotal: 8.4G

🟡 Needs Confirmation (enter: y = soft-delete / d = delete permanently / n = skip):

  [n] 6. .lingma                           5.1G  Tongyi Lingma AI assistant (safe to remove if unused)
  [n] 7. .codegeex                         0.8G  CodeGeeX AI assistant
  [n] 8. .android/avd                      4.2G  Android emulator images
  [n] 9. Downloads/win11.iso               5.2G  🟢 Installer ISO — safe to delete after installation
  [n] 10. Downloads/old_project.zip        0.5G  🟡 Old backup
  [n] 11. Duplicate: report.pdf (2 copies)  0.1G  Keep one, delete one

  Confirmable items potential reclaim: 0 – 15.9G

🔴 Protected (for reference only, no action available):

       C:\Users\xxx\.cursor               2.1G  Cursor editor (currently in use)
       C:\Users\xxx\.m2                   1.5G  Maven local repository
       C:\Users\xxx\Documents            12.3G  User documents

===============================================================
Enter your choices (e.g.: safe -3 -5 to deselect, confirm 6y 7n 8d):
```

### 3.3 Interaction Rules

1. Safe items are **all pre-selected Y**; user can deselect (e.g. `-3 -5`)
2. Confirm items **default to n**; user picks y/d/n per item
3. After input, **echo a confirmation summary**: "You selected 6 items totaling 10.2G (5 soft-delete + 1 permanent), skipping 5 items. Confirm execution?"
4. Once confirmed, proceed to Step 4 — **no further prompts during execution**

---

## Step 4: Execute and Verify

### 4.1 Create Stash Directory

```bash
STASH=~/.disk-cleanup-stash/$(date +%Y-%m-%d_%H-%M-%S) && mkdir -p "$STASH"
```

### 4.2 Execute by Mode

**Soft-delete (default):**
```bash
mv "/path/to/item" "$STASH/" 2>/dev/null
```

**Permanent delete (user explicitly chose d):**
```bash
rm -rf "/path/to/item"
```

- For cross-drive mv of large files, warn: "Moving across drives will copy+delete and take longer. Switch to permanent delete instead?"
- File in use → skip and notify the user
- Report status per item: ✅ / ❌ (reason)

### 4.3 Verify

```bash
# Same OS-specific command from Step 1
df -h /c /d /e        # Windows
df -h /               # macOS / Linux
```

Output comparison table:

```
| Drive | Before            | After             | Freed  |
|-------|-------------------|-------------------|--------|
| C     | 180G/256G (70%)   | 150G/256G (59%)   | 30G    |
| D     | 450G/512G (88%)   | 440G/512G (86%)   | 10G    |
Total freed: 40G
```

### 4.4 Report + Stash Reminder

Save the checklist summary + execution results + before/after comparison to `$STASH/report.txt`.

```
Report saved: ~/.disk-cleanup-stash/2026-01-15_14-30-00/report.txt
Stash kept for 7 days. Restore: mv ~/.disk-cleanup-stash/<timestamp>/item /original/path/
Next run of this skill will remind you to clean up expired stashes.
```

---

## Safety Constraints

### 🚫 Permanently Skipped (never scan, never suggest deletion)

**Windows:** `C:\Windows` `C:\Program Files` `C:\Program Files (x86)` `C:\ProgramData`
**macOS:** `/System` `/Library` (system-level) `/Applications` `/usr` `/bin` `/sbin`
**Linux:** `/etc` `/usr` `/bin` `/sbin` `/lib` `/boot` `/proc` `/sys` `/dev`

All `find` commands must `-prune` the above paths.

### 🔒 Sensitive Content Filtering

Auto-skip: `.git/` `node_modules/` `.venv/` `__pycache__/` `target/` `.env` `*.pem` `*.key` `id_rsa` `*.db` `*.sqlite`
Never scan file contents (avoids reading credentials from log files).

### User Document Protection

`~/Documents` `~/Desktop` `~/Pictures` `~/Movies` `~/Music` — only report top-level directory sizes; do not deep-scan or suggest cleanup of contents.

---

## Follow-up

After cleanup, ask:

> Need anything else?
> 1. Deep-dive into a specific large directory (see what's inside)
> 2. Generate a scheduled auto-cleanup script (Task Scheduler / cron / launchd)
> 3. Browse stash directory and restore deleted items
> 4. Purge expired stashes to free up space
> 5. Done

---

## Notes

- All `find` commands use `-exec ls -l {} \;` (not `-printf`), for macOS BSD find compatibility
- Skip the `claude*` subdirectory inside `AppData/Local/Temp` — it belongs to the current process
- Linux package manager caches use dedicated tools (`apt-get clean` / `pacman -Sc`), never raw `rm`
- Conda environments use `conda clean --all`, never delete `pkgs/` directly
- Docker uses `docker system prune -a`, never delete the data directory directly
- Reference files (`ref-*.md`) are only read in Step 2 and released from context immediately after
