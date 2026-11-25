---
name: keyword-volume-research-capped
description: Runs paid keyword-volume lookups under a spend cap.
---

# Keyword Volume Research Under a Spend Cap

Runs keyword-volume checks on a paid research site through the browser tools, keeping total spend under the cap the person set. It reports volume and notes its limits; the person decides which niche to pursue.

## When to Use
- "check search volume for...", "find a hole in Amazon KDP", "keyword research on treg.to"
- Any paid per-call lookup where the person sets a budget.

## Procedure
1. Read the per-keyword price and any cap on the tool page before the first call. Multiply keywords by the price to get the worst-case cost of each batch. When the tool has several lookup types, use the one with the lowest per-call price that answers the question.
2. Run one small batch first to confirm the input works and the price on the page matches what you expected.
3. Open the tool's Manual tab. Use agent_browser_snapshot to find the Body (JSON) field and its ref. If the field is hidden behind a dialog or tab, click the tab with agent_browser_click, then snapshot again.
4. Click the textarea with agent_browser_click, then enter the keyword list as JSON with agent_browser_type. Batch related keywords together and keep each batch within the cap.
5. Click Run with agent_browser_click, then agent_browser_wait for the text 'status' before reading.
6. Read the results with agent_browser_read. If it misses them, use agent_browser_eval to return the open dialog's innerText.
7. After each call, record the charged amount shown on the page and stop before the cap.
8. Save the table and notes as a markdown file in the task workspace with Write.

## Pitfalls
- After any input error, check the charged amount on the page before retrying. A failed call may charge nothing, but confirm it first, because a retry without checking can spend past the cap.
- Read 'no data' as 'the tool does not track this term', not as zero demand. Say so in the report, because a missing term is not proof of an empty market.
- Search volume counts searches across the whole marketplace, not book sales. Label it that way so it is not read as sales.
- Volume alone does not show a niche is open. Say which checks were not done (competitor ranks, ad costs, Kindle Unlimited ranks) so the person knows the gap.
- Do not start the next batch until the current results are read and the spend is recorded, because the running total is what keeps the cap honest.

## Verification
The spend total in the report equals the sum of the charged amounts shown on the tool page, and every keyword requested has either a volume value or a 'no data' note.
