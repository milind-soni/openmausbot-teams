---
name: copywriting-upgrade
description: "Tactical copywriting using the 6 Masters framework (Hopkins, Collier, Caples, Ogilvy, Schwartz, Halbert). Triggers: 'copywriting-upgrade', '/copy-up', 'viết copy bậc thầy', 'copy 6 masters', 'copy nâng cấp'. Use when user explicitly invokes this skill name to test against the basic copywriting skill. Adds diagnostic questions, awareness levels, market sophistication, and master-level mental models. Vietnamese-aware via Sunny's ABOUT_ME."
risk: low
source: doracomms-workbook + 6-masters-framework
date_added: "2026-04-29"
---

# Copywriting — Upgrade (6 Masters Edition)

## Purpose

Bản nâng cấp của skill `copywriting`. Khác biệt cốt lõi: **không bắt đầu từ formula** — bắt đầu từ **diagnostic** để chọn đúng "bậc thầy" làm primary, rồi blend các master còn lại làm tactical layer.

Khi user yêu cầu copy tiếng Việt → đọc `D:\sunny project\me.Sunny\ABOUT_ME.md` (compact, AI-optimized — source of truth voice duy nhất). Áp dụng 3 hard rules: không emoji, không negative parallelism, không em-dash.

---

## Bước 0 — Diagnostic (BẮT BUỘC, không skip)

Hỏi user 6 câu trước khi viết. Nếu user đã cung cấp một phần, suy luận phần còn lại từ context và confirm lại.

**1. Awareness level** — audience đang ở đâu trên thang nhận thức?
- **Unaware**: chưa biết mình có vấn đề
- **Problem-aware**: biết đau nhưng chưa biết có giải pháp
- **Solution-aware**: biết có giải pháp nhưng chưa biết sản phẩm cụ thể
- **Product-aware**: biết sản phẩm nhưng chưa mua
- **Most-aware**: sẵn sàng mua, chỉ cần offer đúng

**2. Market sophistication** — thị trường đã nghe claim này bao lần?
- **Stage 1 — Virgin**: claim trực tiếp ("Lose 20 pounds")
- **Stage 2 — Early**: enlarge claim ("Lose 20 pounds in 30 days")
- **Stage 3 — Mature**: thêm mechanism ("...with the Keto method")
- **Stage 4 — Sophisticated**: enhance mechanism ("...advanced Keto, no hunger")
- **Stage 5 — Exhausted**: chuyển sang identification ("For women 40+ who tried everything")

**3. Desired action** — chính xác user muốn người đọc làm gì? (chỉ 1)

**4. Emotional state** — reader đang thấy gì TRƯỚC khi đọc copy? (frustrated/hopeful/skeptical/urgent/curious/unaware)

**5. Trust level** — mối quan hệ với brand? (cold/warm/hot)

**6. Format & constraints** — headline / ad / landing page / email / sales letter? Length, platform?

---

## Bước 1 — Decision Logic: chọn PRIMARY master

```
IF awareness = unaware OR problem-aware:
    PRIMARY = Schwartz (channel mass desire)
    SUPPORT = Collier (enter their mental conversation)

IF awareness = solution-aware AND market = mature/exhausted:
    PRIMARY = Hopkins (proof + specificity cuts skepticism)
    SUPPORT = Schwartz (unique mechanism)

IF awareness = product-aware AND trust = cold/warm:
    PRIMARY = Hopkins (proof beats objections)
    SUPPORT = Halbert (urgency drives action)

IF awareness = most-aware AND trust = hot:
    PRIMARY = Halbert (direct, urgent, personal)
    SUPPORT = Caples (headline for the offer)

IF format = headline OR short-form ad:
    PRIMARY = Caples
    SUPPORT = Schwartz (match awareness in hook)

IF format = email:
    PRIMARY = Halbert (one-reader mentality)
    SUPPORT = Collier (inbox mental state)

IF format = brand / long-term content:
    PRIMARY = Ogilvy
    SUPPORT = Hopkins (research-backed)

IF market = exhausted AND reader = skeptical:
    PRIMARY = Hopkins (undeniable proof)
    SUPPORT = Ogilvy (rebuild trust)

IF emotional_state = frustrated:
    PRIMARY = Collier (meet them in frustration)
    SUPPORT = Schwartz (redirect to new mechanism)
```

**Blending roles:**
- **Schwartz** → quyết điểm START (awareness)
- **Collier** → quyết OPENING (mental state matching)
- **Caples** → quyết HEADLINE
- **Hopkins** → quyết PROOF
- **Ogilvy** → quyết TONE & RESEARCH
- **Halbert** → quyết VOICE & URGENCY

---

## Bước 2 — 6 Masters mental models

### Hopkins — Testing & Proof
"Advertising is salesmanship in print." Mọi claim phải có **reason-why**.
- Vague → Specific: "Saves money" → "Saves $47/month average"
- **Preemptive claim**: nói trước cái mà ngành ai cũng làm nhưng chưa ai claim (Schlitz beer purification).
- **Risk reversal**: guarantee cụ thể, đo được.
- **Test**: claim của tôi có specific đến mức cảm giác đo được, không bịa? Có "vì sao"? Có proof bên ngoài lời tôi nói? Skeptical reader có chọc được lỗ?

### Collier — Reader Psychology
"Enter the conversation already happening in their head." Sequence: **MATCH → BRIDGE → LEAD**.
- Mismatched temperature = scam vibe. Reader cynical + copy enthusiastic = thua.
- **Picture-painting**: không tả benefit trừu tượng, vẽ cảnh cụ thể sau khi dùng sản phẩm.
- "**You** > we": đếm "bạn/anh/chị" vs "chúng tôi". "We" nhiều hơn → viết lại.
- **Test**: reader đang nghĩ gì TRƯỚC khi đọc? Mở bằng tôi hay họ? Đã vẽ after-picture cụ thể? Họ có cảm giác được hiểu?

### Caples — Headline Mastery
"5 lần nhiều người đọc headline hơn body." Headline thua = mọi thứ thua.
- **Self-interest** > clever: "How to Cut Your Electric Bill in Half" > "Introducing Model X"
- **News value**: "New", "Announcing", "At last", "Finally"
- **Curiosity + clarity**: "What Nobody Tells You **About Negotiating Salary**" — không phải "What Nobody Tells You" (rỗng).
- **Tested patterns**:
  - "How to [outcome]"
  - "The secret of [outcome]"
  - "[Number] ways to [outcome]"
  - "Why [unexpected]"
  - "Who else wants [outcome]?"
  - "Warning: [consequence]"
  - "Do you make these mistakes?"
  - "[Story hook]" — "They laughed when I sat down at the piano..."
- **Method**: viết 25 headline trước khi chọn 1.
- **Test**: có dừng scroll được không? Benefit specific hay vague? Có promise rõ điều gì sẽ get nếu đọc tiếp?

### Ogilvy — Brand + Research
"The consumer isn't a moron. She's your wife."
- **Research-first**: dùng sản phẩm, đọc previous ads, nghiên cứu audience, tìm 1 differentiating fact mà competitor không claim được.
- **Big Idea**: concept trung tâm trụ được nhiều năm. Rolls-Royce: "At 60mph the loudest noise is the electric clock."
- **Respect intelligence**: long copy OK nếu interesting; facts > claims; confident not arrogant.
- **Long-term brand asset**: mỗi copy phải hỏi "build hay erode brand?"
- **Test**: research đủ để viết với authority? Big idea là gì? Intelligent adult cảm thấy được tôn trọng? Specifics hay vague?

### Schwartz — Desire & Awareness
"You cannot create desire. Mass desire already exists. Find it, channel it."
- **Mass desire** không phải "weight loss" — sâu hơn: "feel attractive again", "have energy for kids", "prove doubters wrong".
- **5 Awareness Levels** — quyết toàn bộ approach (xem Bước 0).
- **Sophistication stages** — quyết tone của claim (xem Bước 0).
- **Unique Mechanism**: trong thị trường bão hoà, tên riêng cho "vì sao nó work" = vũ khí. "Activates FGF21 hormone, dormant since your 20s" >> "helps you lose weight".
- **Test**: mass desire nào tôi đang channel? Awareness level đúng chưa? Có unique mechanism?

### Halbert — Raw Persuasion
"One person talking to another about something that matters."
- **One-reader mentality**: không viết cho "phụ nữ 35-54", viết cho "Susan, 47, mới phát hiện nếp nhăn, sợ chồng mất hứng".
- **A-pile vs B-pile**: thư cá nhân (A) vs bulk mail (B). Copy phải ở A-pile.
- **Greased slide**: mỗi câu kéo người đọc qua câu kế. Đọc to — chỗ tôi tự dừng = leak.
- Techniques: short paragraphs, open loops, cliff-hangers, questions demanding answers.
- **Real urgency**: deadline thật, capacity thật. Fake "Only 3 left!" = chết uy tín.
- **Test**: viết cho 1 người cụ thể? Bạn thân có viết thế này? Mỗi câu earn câu sau? Cảm giác A-pile? Urgency thật và explained?

---

## Bước 3 — Workflow viết

1. **Diagnostic** (6 câu, không skip)
2. **Choose primary + supporting** masters từ decision logic
3. **Write với primary master mindset** — dùng mental models của master đó làm trục
4. **Layer in supporting**:
   - Caples → headline (viết 10–25 phương án)
   - Hopkins → mọi claim cần specific + reason-why
   - Collier → opening match emotional state
   - Halbert → voice + real urgency
   - Ogilvy → research depth + big idea
   - Schwartz → awareness calibration
5. **Review với test questions** của mọi master đã dùng
6. **Read aloud** — tìm leak trong greased slide

---

## Common Scenarios cheat sheet

| Tình huống | Primary | Support | Move chính |
|---|---|---|---|
| Cold landing page online course | Schwartz | Caples + Hopkins | Unique mechanism, specific outcome, headline mạnh |
| Email cho customer cũ (sản phẩm mới) | Halbert | Hopkins | Personal voice, real urgency, quick proof |
| Brand homepage | Ogilvy | Collier + Schwartz | Big idea, facts, segmented paths theo awareness |
| Facebook ad cold audience | Schwartz | Caples + Collier | Hook mass desire, ngắn-mạnh, curiosity-driven |
| B2B audience skeptical | Hopkins | Ogilvy | Undeniable proof, case studies, respect intelligence |

---

## Voice rules tiếng Việt (lấy từ Sunny ABOUT_ME)

Khi viết tiếng Việt:
- **Cấm emoji**, cấm format PowerPoint trang trí.
- **Cấm negative parallelism**: "Không phải X. Là Y" — dấu hiệu AI #1. Xóa vế phủ định.
- **Cấm em-dash (—)**. Dùng phẩy, chấm, ngoặc đơn, hai chấm.
- **Không hype**, không bịa số.
- **Filter 3 cửa**: Rõ? Hành động được? Không hiển nhiên? Trượt 1 → cắt.

---

## Output format

```
DIAGNOSTIC:
- Awareness: …
- Sophistication: …
- Action: …
- Emotional state: …
- Trust: …
- Format: …

CHOSEN MASTERS:
- Primary: [name + lý do 1 câu]
- Supporting: [names + roles]

HEADLINE (Caples — 3-5 phương án):
1. …
2. …

BODY (theo primary master):
[text]

CTA:
- Direct: …
- A/B variant: …

PROOF/SPECIFICS (Hopkins audit):
- [list claim → specific version]

TEST QUESTIONS PASSED:
- [primary master test]: ✓/✗
- [supporting]: ✓/✗
```

Nếu user muốn copy hoàn chỉnh không cần show metadata, bỏ block — vẫn audit nội bộ trước khi giao.
