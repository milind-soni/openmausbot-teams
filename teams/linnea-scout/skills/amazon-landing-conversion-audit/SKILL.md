---
name: amazon-landing-conversion-audit
description: Audit the handoff from a fiction ad to the Amazon product page (promise match, thumbnail cover readability, above-the-fold blurb, Look Inside opening, price/KU clarity, and review gate) before running paid or promo traffic. Also guides Linnea-Scout when auditing top-converting competitor book pages alongside their live ads.
---

# Amazon Landing Conversion Audit

An ad's job is to win the click. The Amazon product page's job is to convert that click into a borrow, free download, or sale. Never send paid traffic (and avoid sending promo traffic) to a product page that breaks the ad's promise.

## Required Inputs

Gather these before auditing (mark any unverified item `UNVERIFIED` rather than guessing):
1. The exact ad(s) driving traffic: Frame 1 / image visual, Line 1 hook, and price/KU offer stated in the ad.
2. Book product page details (live Amazon URL or KDP upload prep): front cover file, title + subtitle, full blurb, first ~300 words of Look Inside / Chapter 1, live price + Kindle Unlimited status, series position, and live review count + average star rating.

## The 8-Point Conversion Handoff Gate

Score every check `PASS`, `FIX`, `BLOCKER`, or `UNVERIFIED` with one concrete reason:

1. **Ad-to-Blurb Promise Match (Biggest Conversion Leak)**
   - Does the ad's core hook, tension, or emotional promise reappear cleanly in **Blurb Line 1** (visible before "Read more")?
   - **FAIL/FIX** if the ad sells dark menace, high-stakes tension, or sharp voice while the blurb opens with a book-report synopsis ("Synopsis Trap") or a different subgenre mood ("Wrong Genre Signal").

2. **Above-the-Fold Blurb Hook (First 3 Lines / ~250-300 Characters)**
   - Before Amazon's "Read more" fold on mobile, does the reader immediately know: (a) who the protagonist is, (b) what went wrong or what the hook premise is, and (c) the subgenre stakes?
   - Zero em dashes in public copy. No vague filler ("In a world where...", "Nothing will ever be the same...").

3. **Thumbnail Cover Test (100px & 300px Wide)**
   - Inspect the front cover shrunk to **100px** (mobile search / Also Boughts) and **300px** (product page).
   - Must pass: title legible without squinting, subgenre unmistakable in 1 second, tone matches the ad's visual world, zero "wrong genre signal" (e.g., noir urban-fantasy ad landing on a cozy or generic cover).
   - Hand off any cover typography, contrast, or crop fixes to **Bram-QC** / **Harlan**.

4. **Price, KU & Book-1 Entry Clarity**
   - Does the Amazon page's live price (`$0.00` Free-Week, `$0.99` launch, or full price) and Kindle Unlimited badge match what the ad promises?
   - Any mismatch between ad offer and live Amazon price = **BLOCKER** until aligned.
   - If the ad's free or discounted window cannot be confirmed on the public page (for example, a KDP-scheduled promo), mark it `UNVERIFIED` and name the KDP check needed. Do not pass it on the ad's word alone.

5. **Look Inside Opening (First ~300 Words)**
   - Does Chapter 1 / Look Inside open in immediate scene tension matching the ad's voice and tone?
   - **FIX / FLAG** if Look Inside opens on lore dump, slow backstory, or detached throat-clearing while the ad promised immediate danger or hooky banter.

6. **Social Proof & Paid-Spend Gate**
   - Record the verified live Amazon review count and average star rating.
   - **BLOCKER for paid ads:** Standing team rule requires baseline reviews before putting paid ad spend behind a book (unless Kevin explicitly waives it for a specific launch test). Free-Week organic / free-promo pushes may proceed with a clear note.
   - Never fabricate or estimate review counts. If the live page was not checked, mark `UNVERIFIED`.

7. **Series Order & Read-Through Visibility**
   - Is Book 1 clearly labeled as Book 1 of its series in title/subtitle/series metadata?
   - If Book 2+ exists, confirm the Amazon series page link and Book 1 back-matter CTA point cleanly to Book 2.

8. **Reader-Trust & AI-Tell Check**
   - Scan blurb copy for obvious AI-slop tells (em dashes, "delve", "tapestry", "echoes", "shadows whisper", repetitive rhythmic triplets).
   - Scan cover at full size and 300px for broken hands, garbled text, or glaring composite artifacts that erode buyer trust on the product page.

## Required Output Format

Return a compact audit containing:
1. **8-Point Gate Table**: Check | Status (`PASS`/`FIX`/`BLOCKER`/`UNVERIFIED`) | Evidence & 1-line fix.
2. **Rewritten Above-the-Fold Blurb (Lines 1-3)**: Required whenever Check #1 or #2 fails, matching the ad's winning hook line and voice (zero em dashes, zero spoilers).
3. **Cover / Visual Handoff Note**: Exact crop, contrast, or title-scale issue to send to Bram-QC / Harlan if Check #3 or #8 fails.
4. **Final Verdict**:
   - `READY FOR PAID TRAFFIC`
   - `READY FOR FREE-WEEK / ORGANIC ONLY` (explain why paid is held)
   - `HOLD - FIX LANDING PAGE FIRST` (list blockers)

## Research Mode (For Linnea-Scout)

When researching winning competitor fiction ads on Meta Ad Library, click through to the advertised book's Amazon page whenever reachable and log:
- How closely the winning ad's Line-1 hook mirrors the Amazon blurb's Line 1
- Cover legibility and genre signaling at 100px
- Price / KU status and review count + star rating
- Whether the Look Inside opening matches the ad's tone

## Provenance

Built from Linnea-Scout's indie fiction funnel audit (2026-11-24). Incorporates the "Synopsis Trap" and "Wrong Genre Signal" diagnostic concepts identified in Linnea's review of `jwynia/agent-skills/book-marketing`.
