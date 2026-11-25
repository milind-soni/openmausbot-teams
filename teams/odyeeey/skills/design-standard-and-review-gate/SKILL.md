---
name: design-standard-and-review-gate
description: Quantified visual, interaction and motion standards.
---

# Design Standard and Review Gate

Turns "审美要严" into numbered acceptance criteria for visual, interaction and motion, plus a review gate that can reject a delivery. Does NOT write product code or take the place of functional QA.

## When to Use

- "加一个设计负责人 / 设计系统 / 视觉验收关"
- "把组件目录升级成真正的设计系统"
- "交互、动画、动效也要管起来"
- "提高前端的标准，别各写各的"
- "细节苛刻要变成全局一致"
- "按设计和审美看下还有哪些页面该改"
- "IP 形象不对 / 主 IP 到底用哪个 / 这个形象要不要重画"

## Procedure

1. **Harvest brand-agnostic craft rules before writing anything.** The `open-design` repo carries `craft/` (typography, color, animation-discipline, state-coverage, anti-ai-slop, accessibility-baseline, laws-of-ux, form-validation) and `design-systems/` (linear, apple, stripe, cursor). Pull the raw files and keep a local copy as the baseline.
2. **Write the standard as numbers, one file per audience**, e.g. `~/WorkSpace/design-system/视觉标准.md` for reviewers and `前端执行规范.md` for implementers; move the previous version into `archive/`. Every line must be a pass/fail criterion, not advice.
3. **Token tables are mandatory:** radius (≤8; 4 tags, 6 inputs/buttons, 8 cards/modals, 999 only avatar/pill); letter-spacing 0; font scale capped at 6 steps; spacing on a 4-based 8-step scale (4/8/12/16/24/32/48/64 — 5/7/10/18/20 are illegal); one icon family with a fixed stroke width and fixed sizes; max 2 accent uses per screen (links and focus rings count); contrast 4.5:1 body / 3:1 large and control borders.
4. **Component state coverage = 8 states:** default, hover, pressed, focus-visible, disabled, loading, empty, error. Two states is the defect being fixed.
5. **Quantify interaction laws** instead of naming them: 3–5 visible primary options per decision screen (never hide the forward path); 3–4 pricing tiers with one recommended; 6–9 cards on first screen; ≤5 named groups in a settings panel; proximity 8–12 inside a group vs 32–48 between groups; ≤4 parallel groups per screen; celebration once, at the end.
6. **Motion tokens:** durations 100/150/200/300ms only; three easings (enter `cubic-bezier(0.2,0,0,1)`, exit `cubic-bezier(0.4,0,1,1)`, platform spring for displacement); six allowed scenarios (navigation, container expand, progress feedback, gesture tracking, state confirmation, one closing celebration); five forbidden (tutorial demos, decorative loops, hero choreography, "to look premium", any >5s that cannot be paused); animate only `transform`/`opacity`, never `width/height/top/left`; ≥55fps; visual feedback ≤100ms after click; "longer than expected" at 15s; stop animation and switch to error at 60s.
7. **Form state machine:** `pristine → dirty → touched → invalid-after-touched → recovering → submitting → server-error`; validate on first blur, then re-validate on every keystroke after an error; submit with `form.requestSubmit()` (never `form.submit()`, which skips validation).
8. **Insert 视觉与交互验收 as a vetting gate** before release: 开发自测 → 测试验证 → 产品验收 → 视觉与交互验收 → 运维发布. A single failed item rejects the delivery; there is no "fix it next time".
9. **Name who rules on what when visual and technical conflict.** The design owner holds interpretation of tokens, icon size and stroke width, motion parameters, IP visual semantics and component visual specs; their sign-off gates release, so frontend does not ship without it. A visual FAIL blocks design sign-off and release but never overturns a functional verdict. How the spec is met belongs to the tech lead; neither side may trade away performance or accessibility to settle a conflict.
10. **Anchor brand-artifact work to the official file, not to a drawn copy.** Before an IP, mascot, logo or icon is designed or judged, search the asset tree and the components that already consume it (animation JSON, svg, default avatars, hero images), identify the lossless source, pin it by hash and byte size, and freeze it as the single 造型源. Render the reference frame from that frozen file (e.g. lottie-web `goToAndStop(0)` in a headless chromium page) into the evidence directory next to a `FACTS.md` of measured geometry — aspect ratio, eye size, spacing, layer count — so later rounds argue from numbers instead of adjectives.
11. **Layer motion on the official form; never redraw it to express a state.** Fix a per-state whitelist of mutable properties (eye scale, overall opacity, saturation or colour filter) and write into the standard that geometry, outline, ears, ribbon and mouth stay unchanged. A state that seems to need new artwork means the state design is wrong, not the asset.
12. **Make fidelity a gate that can go red.** Render the frozen reference at every size step the component actually ships (e.g. 32/40/96/128) × DPR 1/2/3 into a dedicated baseline directory with a README naming the list, then ship a comparator that takes two same-size PNGs plus the threshold as arguments (difference pixels ≤2%, SSIM ≥0.98) and exits non-zero on breach. Run it against the current implementation first to get the "how far off are we" number as pre-rework baseline evidence, and build the comparison so it fails on the version before the fix. A gate that has never been seen failing is decoration.
13. **Audit the full surface, not the page list you were handed.** "Make it look better" means enumerating every view in the product tree and giving each page a verdict — already has it / should get it / should not — with one line of reasoning; grouping by directory is allowed, but no page may be excused with "other pages are similar" and nothing may be left 待定. Cap the do-now tier to single digits and, for each page in it, fix position, size step, motion (≤300ms, transform/opacity only, reduced-motion fallback), dark form and aria before any code is written.
14. **Fix the evidence format:** 1440/834/390 × light/dark = 6 full-page screenshots, plus 8-state shots for touched components, plus a ≤10s main-flow screen recording (including one overlay open/close) and a reduced-motion recording; for a brand artifact, add the frozen reference frame and its hash. No mockups, no verbal claims.
15. **Give the implementer grep-able rules:** zero raw hex colors in components, zero `transition: all`, zero bare `outline: none`, 8 states present, all durations ≤300ms, reduced-motion tested, keyboard completes the main flow, focus always visible, no horizontal scroll at the three widths, form verified empty / wrong / corrected.
16. **Assign one owner across all product lines**, with a vision-capable model — the reviewer must read screenshots, so a text-only model cannot hold the gate.

## Pitfalls

- CJK must not inherit Latin metrics: negative letter-spacing is forbidden on Chinese text, line-height goes to 1.35–1.7, never 1.2.
- Uniform spacing means no grouping; the inside/between ratio has to be visibly different or the hierarchy does not exist.
- One design owner per line re-creates the divergence you are removing; one owner serving several lines keeps a single source of tokens.
- Keep the standard as a file in a fixed directory, not only inside a bot profile — profiles get blocked or lost, files are greppable and reviewable.
- Number every rule (section.clause) so a review comment can cite it instead of saying "感觉不好看".
- A page count in the request is a hypothesis: count the views in the source tree and check where the visual component is actually referenced before scoping — the real surface is usually several times the named list.
- Spreading a motif onto every screen reads as stickers; holding the capped top tier is what keeps it taste, even under pressure to cover more.
- A rejection without file:line and a measured value can be argued away; a rejection with them cannot.
- A review anchored only to its own spec passes a wrong premise: a full multi-item review with a signed acceptance sheet can still approve a shape nobody in the brand recognises. Fix the anchor — official artifact plus reference-frame comparison — before adding more checklist items.
- The lossless brand asset is usually already in the repo, consumed as a default avatar, a loading animation or a hero image; searching costs minutes and redrawing costs a rework cycle. Treat an invented extra persona as a defect even when it passes every check.
- A raster hero image with the character composited into a scene is not the source: keep looking for the transparent single-body file or the vector animation, and if none exists say so instead of drawing one.
- A single-size reference hides the failure that matters: the small step (32/40) is where the form turns into a white blob, so the baseline set must cover every shipped size before anyone signs.
- A colour change inside a state override (e.g. a `--denied` block) will not show on the state the reviewer names — check whether a later rule re-declares the property before reporting the fix as visible.

## Verification

Run the frontend rule checks on a sample product (raw hex, `transition: all`, bare `outline: none` → 0 hits each) and confirm the 16-point review on one delivered page, with the six screenshots, the main-flow recording and the reduced-motion recording present; for a surface audit, the page count matches the source tree and no entry is left 待定; for a brand-artifact change, the frozen reference frame and its hash sit in the evidence directory, the per-size/DPR comparator exits 0 against the accepted build and non-zero against the prior one, and the comparison has been shown failing before the fix landed.
