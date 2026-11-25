---
name: book-market-research
description: Research a book's live niche market (10 comps, covers, blurbs, prices, categories, reader hangouts, and AI-friendly promo sites) and produce 3-5 ranked moves with verified links.
---

# Book Market Research

Goal: learn what is selling right now in one book's exact niche and turn it into 3-5 concrete, ROI-ranked moves. Every factual claim needs a live link verified in this session. No link means it does not go into the report. Complements `fiction-book-marketing` by providing the live research protocol for `Linnea-Scout` and the Marketing specialists (`Fantasy-Marketer`, `Adult-Marketer`, `Other-Marketer`).

*Provenance: Ported and cleaned for OpenMausBot from Kevin's Grok export (2026-11-23).*

## 0. Pin the Book First (Verified Facts Only)

Write one line for each from the brief or live records (never guess):
- Exact subgenre readers actually search (for example, 'dark mafia romance', not 'romance').
- Heat level, tone, and series vs. standalone status.
- Current price, Kindle Unlimited (KU) status, review count, and rating.
- Budget and hard limits (honest AI disclosure, AI-ban screening, faceless pen-name firewall, KU exclusivity).
- AI-assisted status: disclosed to KDP, never advertised in promo copy unless the person says otherwise.

## 1. Find 10 Live Comps

- Inspect Amazon bestseller lists for the book's 2 best-fit categories plus 'Customers also bought' on 2-3 strong matches.
- Keep titles published in the last 3 years ranked under #50,000 overall. Skip mega-celebrity outliers unless they define the niche's visual look.
- Log for each comp: title, live URL, BSR rank, price, KU yes/no, review count, and series length.

## 1a. Hot Right Now (Trend Scan)

Use this when the person asks what is hot, trending, or rising. It does not mean fitting their own series.
- Read the live Amazon Kindle bestseller pages for the genre's 2-3 best-fit categories, plus any paranormal or mystery-romance list that applies. Use agent_browser_read. If it misses the list, use agent_browser_eval to return document.body.innerText around the 'Best Sellers in' heading.
- Log the top 10 to 30 titles per list: rank, title, price, review count, and whether the title is indie or traditionally published.
- Pitfall: searching the person's own series keywords when they asked for trends answers the wrong question. Build the keyword list from the trend titles and tropes found on the lists.
- Pitfall: one category page is one snapshot. Name the page you read and list what you did not check (rank history, velocity, Kindle Unlimited status) before calling a lane open.

## 2. Extract Niche Signals Across the 10 Comps

- **Cover:** dominant colors, people vs. objects, typography, and mood.
- **Blurb:** opening hook shape, named tropes, approximate length, and heat or content notes.
- **Pricing:** standard launch price, typical promo/deal price, and share in KU.
- **Categories & keywords:** exact categories they sit in and recurring terms in titles, subtitles, and blurbs.
- **Reviews:** what readers praise and complain about; pull 3 real quotes each from 3-star and 5-star reviews.

## 3. Map Reader Hangouts & Promo Sites

Check where this niche actually gathers and buys:
- TikTok / Instagram hashtags (observed post counts).
- Facebook reader groups (size and self-promo rules).
- Subreddits (self-promo and AI rules; screen out blanket AI-ban communities).
- Newsletters and promo sites with a matching category (current price, review minimum, content and AI rules).
- Promo-site AI rules: read each site's own submission, guideline, FAQ and terms pages (agent_browser_eval with fetch on those paths, or agent_browser_read). A search snippet or third-party article is not enough.
- Report AI rules as 'no AI wording found on the pages read' and list the sites not checked. Never write that a site accepts AI books; absence on the pages read is not approval.

## 4. Translate Findings Into 3-5 Ranked Moves

Compare Kevin's book against the 10 comps and list real gaps (cover, blurb hook, price, categories, review count). Then list 3-5 moves ranked by impact per dollar:
- Exact action, verified cost, proof URL, and owning OpenMausBot teammate (`Fantasy-Marketer`, `Adult-Marketer`, `Other-Marketer`, `Rudy`, or `Art Studio`).
- Name anything deliberately skipped and why (for example, AI-ban sites or zero-review ad traps).

## 5. Reporting & Hard Rules

- Give Kevin the short answer first (5 lines or fewer): top moves with cost, live link, and any yes/no decision needed.
- When the person asks for the short version or what was learned, answer with the short answer only, then the saved file path. Do not restate the full packet.
- Save the full research packet (CSV or Markdown/PDF) in your current working folder and report its exact path.
- Log approved moves in the campaign spend-vs-return log so outcomes can be audited later.
- Real data only: if a number is not visible, write "unknown" (never estimate sales).
- Re-verify promo prices and rules every run; promo sites change terms frequently.
- Spicy romance is not erotica: never book erotica lists unless the book is erotica.
- Never submit, post, or spend money without Kevin's explicit yes.
- Refresh research before each promo push or at least monthly.

## 6. Reader Sentiment: Why Titles Win or Fail

Use this when the person asks why a series succeeds, why readers drop a genre, or for the recipe of a genre.
1. Open a subreddit search in the signed-in browser with agent_browser_open and tab 'new', for example https://www.reddit.com/r/<subreddit>/search/?q=<terms>&restrict_sr=1&sort=top&t=all.
2. Use agent_browser_eval to list thread links from the results (anchors whose href contains /comments/). Read each with agent_browser_read at maxChars 8000-16000.
3. Read the top-voted threads first. Read at least 6 threads before writing the recipe unless the person asks for less. Record how many were read in full and how many were titles only.
4. Add 1-2 WebSearch queries for analysis pieces, and label them as weaker than threads read in full.
5. Write the recipe as numbered rules, each tied to what readers said, and list the named series readers praised or criticized.
6. Pitfall: writing a recipe from memory or from titles alone. Read the threads, or label the claims as unverified.
7. Pitfall: skipping the AI-authorship check. Look for call-out threads about AI-written books in the genre before recommending AI-assisted drafting, because reader backlash is a direct sales risk.
8. Pitfall: treating one thread as the market. Report vote counts so the person can see how widely a complaint is held.
9. Pitfall: searching a parent genre when the person named a sub-genre. Use the exact genre named (romantasy is not romance), or the recipe answers a different question.
