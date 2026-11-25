---
name: kdp-upload-prep
description: Prepare KDP listing values, step-by-step upload packets with SHA-256 hashes, previewer screenshot audits, and signed-out 72-hour live Amazon checks — preparation only, Kevin performs every account action.
---

# KDP Upload Prep

Prepares KDP listing metadata tables, click-order upload packets, previewer screenshot checks, and signed-out live-page checks for Kevin's novels. Complements `novel-release-kdp` (which covers finished-PDF visual proofing and cover-wrap adaptation). **Preparation only: Kevin executes every KDP sign-in, upload, save, preview approval, publish/submit click, price/royalty change, KDP Select enrollment, proof order, and spend.**

*Provenance: Ported and cleaned for OpenMausBot from Kevin's Grok export (2026-11-23).*

## Non-Negotiable Rules

- Never sign into KDP, upload files, click publish, change pricing, or order proofs — even if requested via another bot.
- Never write or silently edit a blurb inside upload prep. Copy Kevin's exact approved blurb word for word from `C:\Users\kehar\Documents\BOOKS\Blurbs\<CODE>.md`.
- **Kevin's standing Kindle defaults:** DRM ON, KDP Select ON, auto-renewal ON. Carry these forward without re-asking unless a genuine conflict arises.
- Re-verify any Amazon/KDP policy a decision depends on against the official KDP Help pages on the day of prep and record the date checked.
- Track each format independently (**Kindle, Paperback, Hardcover**): one format's pass never certifies another.
- Keep lifecycle states strictly separate: `DRAFT`, `KEVIN APPROVED`, `KEVIN SAVED`, `AMAZON ACCEPTED`, `LIVE VERIFIED`.

## 1. Listing Values Sheet

Start from the book's prior production record if one exists and produce `LISTING-<BOOK>-<date>.md` (one column per format) covering:
- Title, subtitle, author/pen name (verify faceless firewall), series name & number, edition, language.
- Approved description (exact verbatim copy), categories, 7 backend keywords, ISBN/ASIN, imprint, rights & territories, audience & content notes.
- AI-disclosure answers (from Kevin's verified answers, never guessed; books are honestly disclosed).
- Price, print royalty math (`rate * list price - print cost`; verify current KDP calculator formulas — historically US paperback `$1.00 + $0.012 * pages`, hardcover `$5.65 + $0.012 * pages`), DRM / KDP Select / renewal, and release type.
- Tag every field **carries over**, **changed**, or **Kevin to decide**.
- **Update vs. New Edition:** check KDP's current "Update Your Book" guidance. Minor text fixes can usually be uploaded as an update while the book stays live; major structural or story changes may require a new edition. Present the verified facts and a clear recommendation for Kevin's call.

## 2. Step-by-Step Upload Packet

Produce `KDP-PACKET-<BOOK>-<date>` (saved in your working folder with exact path) with one section per format in Kevin's exact click order:
1. Exact upload files: full local path, filename, and freshly computed **SHA-256 hash** for both interior/EPUB and cover.
2. Bookshelf -> format -> Edit details / Edit content: exact text to paste for changed fields and confirmation of unchanged fields.
3. Content upload order: interior first, then cover, plus settings to verify (trim, paper, ink, bleed, cover finish).
4. Launch Previewer: exact pages to screenshot for review.
5. Pricing & final check: confirm unchanged pricing, inspect Content page for stray drafts or unintended price shifts, and note that nothing goes live until Kevin explicitly clicks Publish/Submit per format.

## 3. Previewer Check (From Kevin's Screenshots/Exports)

Inspect every provided page in order for:
- Page numbers, chapter openings, and Table of Contents links/entries.
- Gutter/margin warnings or clipped text.
- Cover alignment against trim and spine; for Kindle, cover display, TOC links, and chapter breaks.
Write `PREVIEW-CHECK-<BOOK>-<format>-<date>.md` explicitly listing every page inspected and any page not seen. Never certify a format from a partial screenshot set.

## 4. Live Verification (~72 Hours Post-Submit)

Check public Amazon product pages **signed out** (never using Kevin's account/session; never buy or borrow to check):
- Title, author/pen name, series name & number, cover, price, word-for-word description match against approved blurb, format linking across Kindle/PB/HC (allow ~7 days before flagging unlinked formats), and Look Inside sample if live.
Write `LIVE-CHECK-<BOOK>-<date>.md` with exact URLs and observed values; mark anything still propagating as `not yet` with a re-check date.
