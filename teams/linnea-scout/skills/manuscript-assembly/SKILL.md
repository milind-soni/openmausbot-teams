---
name: manuscript-assembly
description: Assemble source-bound print interiors, Kindle EPUBs and reader copies for Kevin's books; run report-only mechanics, layout and text-parity checks. Use for assigned interior production, not editorial changes, covers or account actions.
---

# Manuscript assembly
Build only the assigned formats from the exact approved manuscript, approved matter and accepted cover. Preserve wording, order, paragraphs, emphasis and scene breaks. Findings are report-only; the book's owning role lands Kevin-approved fixes, then assembly rebuilds from the new hash.

Bind the book, source approval/path/SHA-256, output destination and completed [house sheet](references/house-sheet-template.md). Missing choices go to Kevin; another book's values are never defaults. Use a fresh stem for each output.

For a novel release, bind the completed CLEAN/separate CHECK and Bible Master dispositions and exact approved source. There is no initial manuscript-proof prerequisite. Finished-PDF proof is after assembly and the relevant layout fixes, distinct from maker QA. Existing runs retain valid source-bound checks; no automatic restart or retrospective new gate. TFB retains its own governed editorial/source route and specialist ownership; this skill does not change its role packs.

Send each stable edition's count and print specifications to the existing design owner through the coordinator/authorized route as soon as available; keep each binding/template basis distinct. Do not hold this for unrelated formats.

## Bind a bounded assembly task

No permanent GLOBAL-ASSEMBLY wrapper is required. The opening supplies book/code, exact approved source/hash and Kevin's approval words or record, formats and destination, house sheet, approved ordered matter, needed accepted EPUB cover and return owner. Bind licensed fonts, trim, paper, styles, scene mark, house rules and name list; never write missing matter or borrow another book's defaults. Reader jobs use their exact authorized reader source and remain labelled reader copies, not approved publication editions.

For a registered novel resolve its exact GLOBAL/shared/BOOKS.md row and BOOK.md and required destination startup; bind book/project/control roots, series and manuscript. The default build home is the parent of Control root, then `<Series code>-KDP/working/<Book code>/<job-id>/`; an explicit destination controls. TFB uses its startup router and TFB-KDP/README.md, then its assigned `TFB-KDP/<BOOK>-ASSEMBLY-<date>/` home with a fresh suffix as needed. Source fixes land only through TFB's authorized lane. Keep one authoritative source, preserved base and fresh output filenames.

Chapter lead-in, every book (Kevin, 2026-10-19: "make it consistent across all of our books. That the first sentence or a couple words is bold or caps or something that makes it stand out... burn it into memory that all of them are going to have that little intro"): set the first four words of every chapter opening, Prologue and Epilogue included, in capitals, in print and Kindle. Layout only, never a manuscript edit; words the source already capitalizes stay as typed. Treatment chosen by GLOBAL-CLAUDE (four words over the whole sentence, which ran up to five lines in caps); Kevin may change it. Record it on the house sheet.

- For current Amazon rules, read [KDP specifications](references/kdp-specs.md), re-check the relevant official pages for each production job and record the date. Send shared-spec changes to management.
- For PDF construction and its job JSON, read [print layout](references/print-layout.md). Use `scripts/build_print.py --config <absolute-job.json>` with the installed ASSEMBLY-TOOLS Python.
- For Kindle, read [ebook layout](references/ebook-layout.md). Use `scripts/build_epub.py`, including approved hash-bound front/back matter in house-sheet order. Its remaining source-format and chapter-break limits still apply.
- For retained build/repair methods, read [production methods](references/production-methods.md). The paperback standard is C:/Users/kehar/Documents/BOOKS/GLOBAL/records/assembly/PAPERBACK-PRODUCTION-SOP-v01.md; reusable production observations are in records/assembly/knowledge/OBSERVATIONS.md under GLOBAL.
- For checks, read [once-over](references/once-over.md). `scripts/once_over.py` writes one findings table and never edits inputs; `scripts/text_parity.py` compares actual outputs to the bound source. No script result substitutes for visual reading.
- Look at every page of each assembled PDF and name the physical pages seen. After approved fixes land, return the rebuilt exact PDF to COMPLETE for its assigned finished-PDF proof task(s); preserve the authorized reader count and coverage. Assembly does not launch a reader or load its report as startup.
- Hand off using the [handoff template](references/handoff-template.md), at most 250 words. KDP keeps the page-by-page Amazon previewer check after upload.

Tools: C:/Users/kehar/Documents/BOOKS/GLOBAL/roles/ASSEMBLY-TOOLS/README.md. Install nothing else without Kevin's yes; no helpers without his yes; delete nothing. TFB follows the same assembly checks within its own startup, job destination and governed fix lane; this skill sets no cross-book queue priority.
Keep DRAFT, KEVIN APPROVED, KEVIN SAVED, PLATFORM ACCEPTED and LIVE VERIFIED distinct. Local scripts, all-page PDF inspection, EPUBCheck, Kindle CLI conversion, Kindle device/size views, Amazon print preview and physical proof are separate evidence. Record omitted/unavailable checks truthfully.

Return the exact source/assets/hashes, completed checks and real gaps to the current owner using the existing handoff. Stable specifications can be sent when needed for the dependent cover through an authorized route. No source wording, Bible, cover or public-copy edits; no login/upload, preview approval, proof order or spending. Do not treat finished-PDF proof, platform preview or physical-proof results as already run. No duplicate ledger, worker closeout, board or automatic self-archive; follow the assigned closure.
