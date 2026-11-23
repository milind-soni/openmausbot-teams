---
name: model-routing-setup
description: Connect AI model sources, routing, and check vendor free tiers.
---

# Model Source and Routing Setup

Walks a user through pointing MausBot's non-chat models (decision/judgment models used for room routing and inbox triage) at a source, through swapping the bot's own chat model, and through checking whether a vendor's free tier actually lets them do it. It also explains how a configured decision model behaves at runtime. It does NOT cover writing prompts, tuning routing quality, or debugging a model that is already configured and answering badly.

## When to Use

- "How do I connect the decision model?" / "决策模型如何接入"
- "Which model decides who answers in a room?"
- "Where do I put my OpenRouter key?"
- "How do I change the bot's chat model?"
- "I have two decision models configured — which one is deciding?" / "决策模型使用原理是什么"
- "How much free quota does <vendor> have?" / "<vendor> 的免费额度有多少" or any question about whether a model source is free to use.
- Any request to set up, switch, or remove a model source or a routing/extraction purpose.
- Any request to plug a specific vendor model or endpoint (base URL + model name + path) into the decision model.

## Procedure

1. **Separate the two model roles before answering.** The decision model only judges (room routing, inbox triage, answering judgment questions with options) and never appears in chat replies. The bot's own conversational model is changed under the bot name → Settings → Model. State this distinction early; users routinely assume one setting covers both.
2. **Decide which question you are answering.** If the user asks how the decision model works or which of several saved sources is active, do not walk the setup flow — read the current routing/extraction settings and go to "Explaining Decision-Model Behavior". If the user asks what a source costs or whether it is free, go to "Checking Vendor Free Tier and Pricing".
3. **Confirm advanced mode is on.** The routing/extraction page is behind advanced settings. If the user cannot find it, have them enable advanced mode rather than hunting for the page.
4. **Send them to Settings → AI → Routing and extraction.**
5. **Pick the source with them using this table:**

   | Source | What the user supplies | Notes |
   | --- | --- | --- |
   | Jev | nothing | Built-in default, works with no key. Best first suggestion. |
   | OpenRouter | OpenRouter key + model choice | The model can be pointed at the chat or the decisions interface. |
   | Custom endpoint | Service URL + model name + key | The key is entered only on that settings page. |

6. **Set the purposes on the same page.** Room routing and inbox triage are separate toggles; a purpose left unchecked does not use this model. Ask which purposes the user actually wants instead of enabling both by default.
7. **Save.** Changes take effect immediately and the card offers an undo, so tell the user they can revert without re-entering anything.
8. **Handle keys through the secure card.** Never ask the user to paste a key into chat. Offer the secure input card and let them type it there. When the user asks for the card, send it in that same reply together with the one step that follows it, then do the remaining settings work yourself after they save — do not make them re-walk the flow or re-state what they already gave.
9. **Close with a concrete next action.** Ask for source + model name (and purposes) and offer to do the setup, rather than ending on the explanation.

## Custom Endpoint Setup

When the user hands over a vendor model spec (model name, POST path, request body, response field), translate it into the app's fields instead of repeating the spec back:

1. **Map the vendor path to a protocol option.** Open the routing/extraction settings and read which protocols the app offers and which route each one derives. Match the app's option to the vendor path (e.g. a vendor `/v1/systemone` endpoint maps to the "System One" protocol option). Do not save on a guessed protocol.
2. **Enter the base URL at the vendor root, not the full route.** If the app appends the protocol path itself, the base is the vendor's `/v1` root and the app adds the route. Say this explicitly so the user does not double the suffix.
3. **Fill the model name exactly as the vendor gives it**, including any version suffix.
4. **Check the purposes**, then save.
5. **Point at the key field by name.** The custom-endpoint key lives in the endpoint key field under the other-keys area of that same page; the user pastes it there (or you offer to bring the window to the foreground once so they can), and the fast-decisions toggle for the endpoint must be on.
6. **Report the split.** List what is already configured and the single step only the user can do, in two short blocks, instead of one paragraph of instructions.
7. **Prove connectivity with one live call once the key is in.** Send a minimal yes/no judgment question through the configured endpoint — a short state text plus one naming question object in the body — and read the vendor's result field (e.g. `answers`) for a plausible probability near 0 or 1. Only then report the setup as working; a saved form alone is not proof the key and derived route are right.
8. **If the user wants to call the model from their own code**, give the raw call instead of the settings path: POST to the full vendor URL, `Authorization: Bearer <key>`, the body fields the vendor specified, and the response field that carries the result (e.g. `answers`).

## Explaining Decision-Model Behavior

When the user asks how the decision model works, or has several sources saved and wants to know which one is deciding, answer from the live settings, not from memory:

1. **Open with the conclusion.** The decision model only judges; it never writes the reply. Two sources saved does not mean two sources decide.
2. **State the precedence rule first:** the source currently selected on the routing/extraction page is the only one doing the judgment; every other saved key sits idle for judgment purposes. A secondary source can still be doing a different job (e.g. the extraction assistant that turns mail bodies into sender/subject/summary/points) — name that residual role so the user does not think it is wasted.
3. **Show a small table** of configured source → what it is capable of → what it is actually doing now, before the flow. This is what resolves the confusion fastest.
4. **Then walk one judgment as a numbered flow:**
   - Trigger: a room set to Auto reply with a new message that @-mentions no one, or a new inbox mail.
   - Inputs: room name, member list with each member's bio, the last few messages, the new message; for mail, the extractor first condenses the body and passes sender, subject, summary, points and recently ignored senders.
   - Scoring: the model returns a probability per candidate. A single candidate above the routing threshold (~0.6) answers; "multiple people" above it makes everyone answer; if nothing clears the threshold, the room's original primary bot answers as if no decision model were set.
   - Boundaries: only the choice is delegated — the picked bot still runs its full turn on its own chat model; the judgment has a short budget (~1.5 s); timeout, error or an invalid answer is treated as "no decision model" and never blocks the conversation.
   - Observability: the chosen reply carries a *Picked by your decision endpoint · N%* badge, and each call writes a log line with latency, probability and success, so the claim can be checked rather than asserted.
5. **Close with the one switch that changes the outcome:** to make a different saved source decide, select it on the same page; nothing else needs re-entering.

## Checking Vendor Free Tier and Pricing

When the user asks how much free quota a vendor gives, or whether a model is worth plugging in as a source:

1. **Answer the current policy, not the remembered one.** Read the vendor's own pricing, limits and changelog pages live; free tiers are the single most stale fact in this domain and are withdrawn or restructured without notice.
2. **Separate the three things called "free":** free chat apps or a web UI, a free API tier, and trial credits that expire. Only a free API tier lets the user add the model as a source without paying.
3. **Check whether an API key can even be created.** Many vendors now require billing to be enabled or a prepaid balance before the key page unlocks — a plan that produces no API usage is not a usable source, whatever it is called.
4. **Give a concrete cost for the cheap models** (price per million input and output tokens) and name the model that price belongs to, so the user can judge the cost of trying it.
5. **Lead with the bottom line in bold** ("no free API quota any more", "still free up to N"), support it with a short bullet list, then close with what it means for their setup: can it be plugged in today, and what must be paid or enabled first.
6. **Say when the exact number is private.** If the vendor only shows limits inside a console, say that instead of inventing a figure, and point at the console page.

## Pitfalls

- Do not present the decision model as the bot's brain or as something that writes replies; that misreading makes users change the wrong setting.
- Do not treat routing and triage as one switch — they are independent toggles, and a "model isn't being used" report often means the purpose was never checked.
- Do not imply that several saved sources all participate in judgment; only the selected one does, and saying otherwise leaves the user unable to reason about which model produced a decision.
- Do not let a key appear in the transcript; route it through the secure card even when the user offers to paste it.
- Do not paste the vendor's full route into the base URL field when the app appends that route itself; the derived URL ends up doubled and every call fails.
- Do not assume a protocol option exists because the vendor docs imply one; confirm the option in the settings list before telling the user the setup is done.
- Do not leave the endpoint's own key field or its fast-decisions toggle unmentioned — a source with no key silently falls back and looks like the model is ignored.
- Do not announce a custom endpoint as "connected" from the saved form alone; a mistyped key or a doubled route only surfaces in the first real judgment call, so test before claiming success.
- Do not repeat widely copied third-party figures for a free tier without checking the vendor's own page; most such articles describe a discontinued plan and planning on them wastes the user's time. When a vendor page will not load, retry the direct pricing/limits URL or a second search rather than falling back to a blog post as the source of the number.
- Do not treat a vendor's free chat apps as a free API or as a substitute quota; they are unrelated products.
- Do not stop at "it isn't free" — give the cheapest per-token price and the precondition (billing enabled, prepaid balance) needed to use the API at all.
- Do not quote routing thresholds, time budgets or fallback behavior from memory when explaining the decision flow; read them from the installed routing code and the call log, because they change between versions.
- Answer in the language the user asked in, and keep the answer to the numbered steps plus the one distinction that prevents misuse; no preamble about what you looked up.

## Verification

After saving, the routing/extraction card shows the chosen source and offers undo. For a custom endpoint, confirm the derived request URL (base + protocol route) matches the vendor's documented path exactly, then run one live judgment call and read the probability from the vendor's result field — a plausible near-0/near-1 value proves the key, route, and protocol option are all correct. Report which purposes are enabled and confirm the chat model setting is untouched. When explaining behavior, verify the stated active source against the routing/extraction page and the call log before saying which model decided. For a pricing answer, confirm every figure traced to the vendor's own page and that the reply states whether a key can be created today and what billing it requires.