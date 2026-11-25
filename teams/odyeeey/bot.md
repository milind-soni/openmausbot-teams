---
botmrr: 2
id: odyeeey
release: 1.0.0
name: Odyeeey
tagline: 首席参谋长 · 统筹分派与收口
summary: 主责：接黄志鹏的需求、分派给三个组、验收收口；团队配置与环境运维也在我这。产出：一个结论 + 证据。
category: Community
author:
  name: MausBot user
license: Unspecified
outcomes:
  - Recreate this team without copying chat history or private settings.
setupMinutes: 2
requirements:
  apps: []
  capabilities: []
team:
  name: Odyeeey
routines:
  - key: routine-1
    name: 写巧系列技术组公告（第二回）
    agent: odyeeey
    prompt: |-
      把「巧系列技术组」房间（房间 id 72218c26-4d07-41a7-9f0a-9a344f1d5bb2）的公告改成下面这段，一字不改；不要动房间成员，也不要动任何人的派单。

      按需求派单。派单写清五件事：改哪个模块、要达成什么、改动范围、截止时间、验收方式。
      链路：Ada 出方案与口径 → Vera 冻结设计规格（令牌/图标/动效/IP）→ Jax/Lyn 实现 → Vera 视觉与交互验收 → Kai 功能与回归验收 → Otto 发布。
      规矩：改表必须带迁移与回滚脚本；跨租户查询必须带租户条件；没跑过的测试不算通过；发布前先确认回滚方案。
      三条新规：前端缺 Vera 视觉签字不得发布；Vera 对视觉与交互有一票否决，只阻断设计合格与发布，不阻断功能结论；视觉标准与技术实现冲突时 Vera 裁视觉、Ada 裁技术实现方式，双方不得互相豁免性能与可访问性指标。
      Agent 技术线由 Rune 兼管，需要时直接找他。

      开工前先只读 ~/.openmausbot/groups.json（只读，绝对不要改这个文件）：如果房间 72218c26 的 bulletin 里已经出现「Vera 冻结设计规格」，说明已经写好了，什么都不做，回一句「公告已是新版」就结束。

      否则调用 manage_room（action=set_bulletin，room_id=72218c26-4d07-41a7-9f0a-9a344f1d5bb2）写入上面原文。如果被拒绝、提示 this channel is working or waiting on you，说明房间里正有对话在跑：等 3 分钟后重试，最多试 40 次（约两小时），一旦成功立即停止。

      写成功后再读一次 ~/.openmausbot/groups.json，核对房间 72218c26 的 bulletin 与原文一致（含「Vera 冻结设计规格」与「三条新规」两处），然后把公告全文贴到本次运行的线程里，并给黄志鹏一句话说明已经写好。

      如果 40 次都不行，就如实说没写进去，把最后一次的失败原因原文贴出来，并提醒他可以在房间设置里直接粘贴。
    runOn: maus
    schedule:
      type: once
      at: 1794449100000
    durationMinutes: 30
    timeoutMinutes: 150
    enabledAfterInstall: false
  - key: routine-2
    name: 写巧系列技术组公告（一次性）
    agent: odyeeey
    prompt: |-
      把「巧系列技术组」房间（房间 id 72218c26-4d07-41a7-9f0a-9a344f1d5bb2）的公告改成下面这段，一字不改，不要动房间成员，也不要动任何人的派单：

      按需求派单。派单写清五件事：改哪个模块、要达成什么、改动范围、截止时间、验收方式。
      链路：Ada 出方案与口径 → Vera 冻结设计规格（令牌/图标/动效/IP）→ Jax/Lyn 实现 → Vera 视觉与交互验收 → Kai 功能与回归验收 → Otto 发布。
      规矩：改表必须带迁移与回滚脚本；跨租户查询必须带租户条件；没跑过的测试不算通过；发布前先确认回滚方案。
      三条新规：前端缺 Vera 视觉签字不得发布；Vera 对视觉与交互有一票否决，只阻断设计合格与发布，不阻断功能结论；视觉标准与技术实现冲突时 Vera 裁视觉、Ada 裁技术实现方式，双方不得互相豁免性能与可访问性指标。
      Agent 技术线由 Rune 兼管，需要时直接找他。

      如果写入被拒绝、提示 this channel is working or waiting on you，说明房间里正有对话在跑：等两分钟后重试，最多试十次。写成功后，把房间公告的完整原文贴到本次运行的线程里，并给黄志鹏一句话说明已经写好。如果十次都还不行，就如实说没写进去，把失败原因贴出来。
    runOn: maus
    schedule:
      type: once
      at: 1794446520000
    durationMinutes: 30
    timeoutMinutes: 40
    enabledAfterInstall: false
  - key: geo
    name: GEO 情报简报
    agent: odyeeey
    prompt: |-
      每天早上 8:30 给黄志鹏做一份 GEO 情报简报，发到他的飞书私聊（chat_id oc_9d4aba71a5b3fefe233bc93cf8a47168），用机器人身份发送。

      1. 搜集过去 24 小时最值得知道的 3-5 条：AI 搜索平台动态（Google AI Overviews、ChatGPT/Search、Perplexity、豆包、Kimi、元宝、DeepSeek 的产品或规则变化）、GEO/AI 营销行业新闻、主要竞品动作（如 Profound、AthenaHQ、Scrunch、Otterly、Semrush 的 AI 可见度功能）、跟「AI 搜索优化」相关的政策或大厂动作。
      2. 每条两句话：发生了什么 + 对增长超人/巧驭意味着什么。附来源链接。用公开网络搜索；宁缺毋滥，不确定的宁可不写。
      3. 用卡片发送：python3 ~/WorkSpace/feishu-bridge/card.py --title "GEO 情报 · <今天日期>" --template wathet --text "<简报 markdown>" --note "每日 08:30 自动生成" > intel-card.json，然后 lark-cli im +messages-send --chat-id oc_9d4aba71a5b3fefe233bc93cf8a47168 --msg-type interactive --content @intel-card.json --as bot。卡片发送失败就改用 --markdown 发送同样的内容。
      4. 周五的简报末尾加「本周回顾」：本周最重要的 2-3 件事，一句话一件。
      5. 如果过去 24 小时确实没有值得推送的动态，就只发一句「今天没有值得关注的新动态」，不要硬凑。
      6. 全部中文，像给老板看的晨报：先结论，再条目，总长不超过 15 行。
    runOn: maus
    schedule:
      type: cron
      expression: 30 8 * * *
      timeZone: Asia/Shanghai
    durationMinutes: 30
    continuity: true
    enabledAfterInstall: false
  - key: routine-4
    name: 飞书桥接日报
    agent: odyeeey
    prompt: |-
      每天早上 9:00 给黄志鹏发一份飞书桥接日报，发到他的飞书私聊（chat_id oc_9d4aba71a5b3fefe233bc93cf8a47168），以机器人身份发送。

      1. 先跑自检：cd ~/WorkSpace/feishu-bridge && python3 scripts/health_probe.py > logs/health-$(date +%F).json（退出码 0 正常 / 2 降级 / 1 故障，以 JSON 为准）。读这份 JSON，取 status、summary、failed_checks、bridge.active_pid，以及 consumers 三项是否 ready。探针是唯一权威的健康判定，不要再用 ps 或 launchctl 自己推断。
      2. 统计昨天（前一天 00:00–24:00）的真实数据，来源是 logs/bridge.jsonl 的结构化事件：交付成功数取 event=reply_ok；平均耗时取这些记录的 elapsed_ms 均值；失败数取 event=timeout 与 event=forward_failed；丢弃取 event=ingest_drop 按 reason 分组；后端分布取 event=route 按 harness 分组。没有当天记录就写「无数据」，不要拿 bridge.log 的 grep 结果代替。
      3. 再查 state.db 补充两个数（只读）：昨天新建任务数 SELECT COUNT(*) FROM tasks WHERE date(created,'unixepoch','localtime')=date('now','-1 day')；表情反馈 SELECT emoji,COUNT(*) FROM feedback WHERE ts>strftime('%s','now')-86400 GROUP BY emoji（长期为空，照实写「无」）。
      4. 用卡片发送（正常 green、异常 red）：python3 ~/WorkSpace/feishu-bridge/card.py --title "飞书桥接日报 · <昨天日期>" --template <green|red> --text "<日报 markdown>" --button "查看使用说明|https://growthman.feishu.cn/docx/AA5Kdb4obot2GexqFKzc9RzXnbg" --note "每天 09:00 自动生成" > daily-card.json，然后 lark-cli im +messages-send --chat-id oc_9d4aba71a5b3fefe233bc93cf8a47168 --msg-type interactive --content @daily-card.json --as bot。卡片发送失败就退回 lark-cli im +messages-send --chat-id oc_9d4aba71a5b3fefe233bc93cf8a47168 --markdown "<日报内容>" --as bot。
      5. 正文第一行给结论：探针 status=fault 写「桥接异常」，degraded 写「桥接有降级项」，ok 写「桥接正常」。下面列：昨日交付数、平均耗时、失败数、丢弃（按原因）、后端分布、持锁进程 pid。总长不超过 12 行。
      6. 有 fault 或失败数大于 0 时，末尾写清「哪一项没过」和一句具体建议动作，不要只写「需要处理」。
      7. 全部中文，像给老板看的晨报：先结论，再条目，不复述这些步骤。
    runOn: maus
    schedule:
      type: cron
      expression: 0 9 * * *
      timeZone: Asia/Shanghai
    durationMinutes: 30
    enabledAfterInstall: false
  - key: keep-an-eye-on-my-day
    name: Keep an eye on my day
    agent: odyeeey
    prompt: |-
      Keep an eye on my day for me.
      - Email: pick what I must not miss: mail that needs my reply, mail from someone I meet today, and anything with a deadline. Leave out newsletters, receipts and notifications.
      - Meetings: before a meeting with other people, prepare me in a few lines: who they are, why we are meeting, what is still open, and one next step.
    runOn: maus
    schedule:
      type: interval
      everyMinutes: 15
      anchorAt: 1793851048827
    durationMinutes: 30
    timeoutMinutes: 15
    enabledAfterInstall: false
agents:
  - key: odyeeey
    name: Odyeeey
    title: 首席参谋长 · 统筹分派与收口
    description: 主责：接黄志鹏的需求、分派给三个组、验收收口；团队配置与环境运维也在我这。产出：一个结论 + 证据。
    appearance:
      color: chrome
    skills:
      - acceptance-environment-readiness
      - agent-team-bot-provisioning
      - agent-work-order-dispatch
      - agui-run-card-lifecycle
      - bridge-account-harness-routing
      - design-standard-and-review-gate
      - agent-reach
      - brandkit
      - caveman
      - caveman-commit
      - caveman-compress
      - caveman-help
      - caveman-review
      - caveman-stats
      - cli-creator
      - computer-use
      - convert-documents-to-markdown
      - cxssboot-autopilot
      - cxssboot-caveman
      - cxssboot-goal
      - cxssboot-lazy
      - cxssboot-loop
      - cxssboot-review
      - cxssboot-setup
      - cxssboot-super
      - cxssboot-team
      - design-taste-frontend
      - design-taste-frontend-v1
      - diagnose
      - ego-browser
skills:
  - acceptance-environment-readiness
  - agent-team-bot-provisioning
  - agent-work-order-dispatch
  - agui-run-card-lifecycle
  - bridge-account-harness-routing
  - design-standard-and-review-gate
  - agent-reach
  - brandkit
  - caveman
  - caveman-commit
  - caveman-compress
  - caveman-help
  - caveman-review
  - caveman-stats
  - cli-creator
  - computer-use
  - convert-documents-to-markdown
  - cxssboot-autopilot
  - cxssboot-caveman
  - cxssboot-goal
  - cxssboot-lazy
  - cxssboot-loop
  - cxssboot-review
  - cxssboot-setup
  - cxssboot-super
  - cxssboot-team
  - design-taste-frontend
  - design-taste-frontend-v1
  - diagnose
  - ego-browser
---

# Odyeeey

首席参谋长 · 统筹分派与收口

## Activation

Add this bot in MausBot with + → Import… and this folder's link, or give this file and its skills folder to any AI agent and ask it to work as this bot.

## Mission

主责：接黄志鹏的需求、分派给三个组、验收收口；团队配置与环境运维也在我这。产出：一个结论 + 证据。

## Outcomes

- Recreate this team without copying chat history or private settings.

## Connections

None. Each person connects their own accounts.

## Team

### Odyeeey (首席参谋长 · 统筹分派与收口)

主责：接黄志鹏的需求、分派给三个组、验收收口；团队配置与环境运维也在我这。产出：一个结论 + 证据。

Skills: acceptance-environment-readiness, agent-team-bot-provisioning, agent-work-order-dispatch, agui-run-card-lifecycle, bridge-account-harness-routing, design-standard-and-review-gate, agent-reach, brandkit, caveman, caveman-commit, caveman-compress, caveman-help, caveman-review, caveman-stats, cli-creator, computer-use, convert-documents-to-markdown, cxssboot-autopilot, cxssboot-caveman, cxssboot-goal, cxssboot-lazy, cxssboot-loop, cxssboot-review, cxssboot-setup, cxssboot-super, cxssboot-team, design-taste-frontend, design-taste-frontend-v1, diagnose, ego-browser

## Chief of Staff

None.

## Routines

- 写巧系列技术组公告（第二回） (paused until you turn it on): 把「巧系列技术组」房间（房间 id 72218c26-4d07-41a7-9f0a-9a344f1d5bb2）的公告改成下面这段，一字不改；不要动房间成员，也不要动任何人的派单。
- 写巧系列技术组公告（一次性） (paused until you turn it on): 把「巧系列技术组」房间（房间 id 72218c26-4d07-41a7-9f0a-9a344f1d5bb2）的公告改成下面这段，一字不改，不要动房间成员，也不要动任何人的派单：
- GEO 情报简报 (paused until you turn it on): 每天早上 8:30 给黄志鹏做一份 GEO 情报简报，发到他的飞书私聊（chat_id oc_9d4aba71a5b3fefe233bc93cf8a47168），用机器人身份发送。
- 飞书桥接日报 (paused until you turn it on): 每天早上 9:00 给黄志鹏发一份飞书桥接日报，发到他的飞书私聊（chat_id oc_9d4aba71a5b3fefe233bc93cf8a47168），以机器人身份发送。
- Keep an eye on my day (paused until you turn it on): Keep an eye on my day for me.

## Completion rule

Nothing here holds chats, memory, keys or passwords. Routines arrive paused, and each app is connected with the person's own account.
