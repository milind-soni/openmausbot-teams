---
name: skill-package-installation
description: Install agent skills from zipped skill packages into the skills directory.
---

# Skill Package Installation

Installs zipped skill packages (e.g. a course-provided agent bundle) into the bot's skills directory so they become usable, and builds the working workspace around them. It does not evaluate or edit the skill's own rules.

## When to Use

- "帮我装这个 agent/技能包", a `.zip` containing a `SKILL.md` is provided.
- Setting up a new content-production line that depends on an installed skill.

## Procedure

1. Inspect the package first without extracting: `unzip -l <zip>` (or `python3` + `zipfile`) to list entries, confirm `SKILL.md` and directory structure exist, and count expected files.
2. Extract with `python3` + `zipfile`, writing each entry to the target directory preserving the zip's own path structure. Do not transcode filenames; read `info.filename` as-is. Skip entries that escape the target directory (`target.resolve()` must stay under it).
3. Flatten one wrapper layer if the zip contains a single top-level folder: `mv <root>/<wrapper>/* <root>/` then `rmdir` the wrapper.
4. Verify: count files vs the zip entry count, list top-level dirs, and spot-check `SKILL.md` frontmatter plus key asset folders (e.g. `assets/kernels`, `assets/products`).
5. Create the work directory for the new line (subfolders per pipeline stage plus a `进度/当前状态.md` linking skill paths and asset indexes).
6. Assign first-batch tasks to the team, then verify deliverables on disk (`ls`, `wc -l`) and append results to the status file before reporting back.

## Pitfalls

- Never transcode zip filenames through `cp437`/`gbk` round-trips; Chinese names can get mangled into `?` and unrecoverable. Extract names as-is; only transcode if the plain extraction is actually wrong.
- `unzip` alone may fail or flatten paths on Chinese-named packages; the `python3 zipfile` loop is the reliable path.
- After extraction, check for an extra wrapper directory before declaring the install done — a skill one level too deep is not loadable.
- Verify by file counts and spot-checks, not by trusting the extraction exit code.

## Verification

- The skills directory contains `SKILL.md` at the skill root, file count matches the zip, and asset subfolders resolve; the first batch of produced work lands in the workspace and is verified on disk.
