---
name: art-making
description: Use when drawing art for Kevin's personalized storybooks or other Etsy picture products (By Her Grace Keepsakes), in any app - locking a child's portrait, drawing pages, or redrawing a failed page. Read it before the first picture. art-check is the matching checklist.
---
_Adapted for every model from dr eggbot's skill (GROK/dr eggbot/ALL SKILLS/art-making.txt, Nov 10, 2026) on Kevin's yes in GLOBAL-CLAUDE: "I want project design to be able to use the skills." The current shared method and app-specific routes are maintained here._

# Art making

## Template art cards

The shared card home is `C:/Users/kehar/Documents/PROJECTS/ETSY/STORYBOOKS/Templates/Template Art Cards/`. Start with [the reference guide](C:/Users/kehar/Documents/PROJECTS/ETSY/STORYBOOKS/Templates/START-HERE.md) and open the actual card that fits the assignment.

- `Grok-Human-Model-Cards-2026-11-10-v4.pdf`: thirteen existing cards, each showing the human reference and three drawing treatments: photo-real heavy colored pencil, in-between cartoon, and fuller cartoon.
- `Maddox-card-APPROVED-2026-11-10.png`: the separately saved approved Maddox card. It is a private family reference, not a public listing asset.

**Card numbers (Kevin, 2026-11-17: "when you do the sample cards, I need the numbers").** The photo on each card is the example, not a number (Kevin: "The photo was the example. The 1, 2, 3."). The three drawing treatments are **1 Photo-real heavy colored pencil, 2 In-between cartoon, 3 Fuller cartoon**. Some card images print the photo as "1."; ignore the printed numbers and use these. Always say the name with the number ("#2 In-between"). Each book's job record names the number Kevin picked, and every sample or style card shown to him is labeled with the number it aims at, so he can answer by number. If no number is recorded, ask him before drawing the sample.

The cards illustrate choices; they do not approve every style for every book or replace the assigned child's locked portrait. Preserve the book's actual approved style and Kevin's choice. These shared cards are reference assets to retain when a production job is cleaned up. Never add customer photos or order-specific likenesses to this collection.

The matching check is [art-check](C:/Users/kehar/.claude/skills/art-check/SKILL.md). Codex and Claude discover this same canonical art-making folder through their local skill links.

How pages for Kevin Harris's personalized children's storybooks (Etsy shop ByHerGraceKeepsakes) get drawn. Draw with the image tool Kevin approved for your app. In Grok, that's Grok itself, never a bot's built-in image tool (Kevin doesn't consider those good enough). In Claude, read [Drawing in Claude](references/claude-drawing.md) for the current OpenAI image API method and its role-owned authority route; that key and budget are Claude's only. For assigned Codex personalization of an existing approved template page, read [Codex storybook personalization](references/codex-drawing.md); other Codex artwork keeps its own approved image tool. The style reference is Hush, Said the Snow (Gracie v05): "exactly the style we are looking for" (Kevin, Nov 10). The Secret Elf art is too cartoony. Check every page with the art-check skill.

## Before drawing
For a storybook, read the brief's age-band section (plus "Every age") of the [audience guide](C:/Users/kehar/Documents/SOPS/STORYBOOKS/AUDIENCE-GUIDE.md) for the art, the cover and text placement; this does not change the face tiers, style target or QC rules.

1. Open the references art-check lists: the style template, the two-tier face PDF, the Hush style-target pages, and the child's approved Tier 1/Tier 2 drawings or locked portrait. Open the Storybook Art Spec too: `C:\Users\kehar\Documents\SOPS\STORYBOOKS\SOP-STORYBOOK-ART-SPEC.md`.
2. Read the book text and art notes. Never invent story facts.
3. Lock the character first. Each child gets one portrait, and Kevin approves it before any page is made. Pets (like the dog Grace) get a locked reference too. Once he approves it, that drawing is the reference for every page of that child.
3a. For a multi-page book, write the continuity card and per-page cast list from [storybook-continuity](C:/Users/kehar/Documents/SOPS/SKILLS/storybook-continuity/SKILL.md) before the first page, and run its contact-sheet drift scan on your pages before the full-size first check.
3b. Before the finished render, use [drawing-proportions](../drawing-proportions/SKILL.md) to bind body/pet/scene scale references and construct the pose/scale guide; self-check the actual drawing against that same plan before handoff.

## Drawing a page
4. Start each page fresh. Draw one page at a time. Claude uses the reference order in [Drawing in Claude](references/claude-drawing.md); Codex personalization uses [its recorded template-page method](references/codex-drawing.md). The order SOP supplies the assignment and approval route. For other fresh-page drawing, give the drawing only:
   - that page's text and art note
   - the locked portrait
   - one style-target picture (Hush)
   - the style words "heavy visible colored-pencil strokes on warm cream paper, never smooth"
   - the page size and aspect ratio
   - the fold and face-safe zones
   - any fix prompt from QC
   Leave out earlier pages and long avoid lists.
5. Prompt words: never write "dust" or "scratches" (Grok draws them as damage); say "visible colored-pencil strokes".

## Fixing a page
6. Redraw the whole page, or the whole figure, with the locked portrait as the reference. Never paste a regenerated face onto an old page, because it looks pasted on. If the page itself is smooth instead of pencil, the page is wrong: redraw it in pencil rather than matching a new face to it.
7. Fix prompts name one to three changes first, naming the exact part ("the left hand holding the cup: five fingers"). Then add one keep sentence that names the skin tone from the portrait in plain words: "Keep the same child, face, [warm medium-brown] skin tone, hair, clothes, angle, crop and pencil style." Make one fix per round. After any edit, compare the skin with the portrait; skin that comes out lighter fails.

## First check (before anyone sees it)
8. Run art-check on every page at full size, next to the locked portrait.
   - Zoom on the face. The mouth fails with tinted or lipstick lips, or a pinched or lopsided smile. The eyes should be calm and normal size. The pencil finish should match the rest of the page, with no seam around the face.
   - Then check fingers, limbs, scale against the house and props, text in the art, and the fold. The child must be easy to find at phone size.
   - Ask: would a parent say "that's him" and "that's a pencil drawing"? If not, it fails.
9. A page gets at most two failed drawings. Kevin, 2026-11-17: "The cap is 2 failures. On the 3rd, we readjust. Not on a whole book, 2 failures of drawing. There is no 3rd." After two misses, don't draw it a third time the same way: stop, work out why it failed, change the approach (prompt, references, composition, size, or where the words go) and tell the coordinator what you changed before drawing it again. If the readjusted page still fails, send it to QC flagged with what's wrong. Don't show Kevin.
10. Return a self-checked page through the assignment's existing QC and acceptance route. Self-check does not replace coordinator review or release the next batch. Kevin sees only QC-passed pages, plus real taste calls (a new child's portrait, a style choice). Never ask Kevin "is this ok?" about a page with a known problem. Only the one holding the work asks him a question.

## Rules
- Customer photos, portraits and personalized art/files stay only in the assigned order's temporary folder and are used only for that order. Follow [the order SOP](C:/Users/kehar/Documents/SOPS/STORYBOOKS/SOP-STORYBOOK-ORDER.md) for physical/digital completion and local cleanup; only Kevin/manual cleanup or separately exact-path-authorized deletion clears them. Keep reusable template masters and approved shared reference cards, never the customer-child version. The shop discloses AI use.
- Never draw brand elf characters (Elf on the Shelf, Scout Elf, Elf Pets, Elf Mates, Elfazon) or trademarked characters (Rudolph, Grinch, Polar Express, Home Alone). Grace the dog stays out of Christmas printables and elf-prop products.
- Say "8.5 x 11 (standard US paper)", never "A4".
- Upscaling and print files belong to print prep, not art making. Storybook PDF layout/export uses [assemble-storybook](../assemble-storybook/SKILL.md).
- Don't spend Meshy, fal, Runway or Canva credits unless Kevin asks. Claude's OpenAI spending follows [PROJECTS-DESIGN's Claude authority](C:/Users/kehar/Documents/PROJECTS/_SYSTEM/workers/PROJECTS-DESIGN/ROLE.md#how-to-draw-in-claude). Don't publish, upload or post.
- Save each page image with its prompt beside it in the assigned output folder. Customer-order work uses the order SOP's temporary folder, never the reusable STORYBOOKS shelf or a Grok work folder. For reusable/template production, Grok uses `C:\Users\kehar\Documents\GROK\<your folder>\<MM-DD>\<BOOK>\`; Claude and Codex use the book's assigned `Art/` folder under PROJECTS/ETSY/STORYBOOKS.
- Show Kevin pages as images or a PDF, never a bare path or .md file. Keep it short; questions are one-line yes/no.
