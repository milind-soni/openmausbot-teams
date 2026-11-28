---
botmrr: 2
id: olive
release: 1.0.0
name: Olive
tagline: A bot shared from MausBot.
summary: Shared from MausBot. The bot arrives as a new copy with its skills and routines; routines start paused and chat history never travels.
category: Community
author:
  name: fuzul
license: Unspecified
outcomes:
  - Recreate this team without copying chat history or private settings.
setupMinutes: 2
requirements:
  apps: []
  capabilities: []
team:
  name: Olive
routines:
  - key: routine-1
    name: ثبت ساعتی قیمت طلا، سکه، دلار و یورو
    agent: olive
    prompt: |-
      هر ساعت از ۸ صبح تا ۱۰ شب به وقت تهران، قیمت لحظه‌ای دلار، طلا، سکه و یورو را از دو کانال تلگرامی بخوان و در سند گوگل ثبت کن.

      ۱) در پوشه <workspace> این دستور را اجرا کن (حدود یک تا دو دقیقه طول می‌کشد، چون بین دو کانال ۳۵ ثانیه فاصله لازم است):
      powershell -NoProfile -ExecutionPolicy Bypass -File fetch_prices.ps1
      نتیجه در فایل feeds\prices.json ذخیره می‌شود: ساعت شمسی و آخرین پست‌های کانال se_pz و کانال eurPrice.

      ۲) از کانال se_pz جدیدترین پستی که قیمت دارد را بردار: پستی که در متنش «دلار فردایی تهران» یا «#طلا_گرمی» آمده است. تبلیغات و پیام‌های غیرقیمتی را رد کن. از متن همان پست این عددها را بخوان: دلار خرید، دلار فروش، دلار معامله، #طلا_گرمی، #آبشده_نقدی، #سکه (نقدی یا حواله)، انس، نقره، تتر، و ساعت شمسی که انتهای پست نوشته شده. همه قیمت‌ها به تومان هستند.

      ۳) از کانال eurPrice قیمت یورو را بخوان. اگر خطا داشت یا پست تازه نبود، در بخش همان ساعت بنویس «یورو: در دسترس نبود» و بقیه کار را ادامه بده.

      ۴) یک بخش جدید به انتهای همین سند اضافه کن، بدون پاک کردن بخش‌های قبلی:
      سند: https://docs.google.com/document/d/16hfxRFIG4mJvYZExYvjqV-hnhn1ybcbJZK5V0NKoJpk/edit
      قالب:
      ### ۱۴۰۵/۰۹/۰۴ — ساعت ۱۲:۰۰

      - دلار فردایی تهران: خرید ... · فروش ... · معامله ... تومان
      - طلای گرمی: ... تومان
      - آبشده نقدی: ... تومان
      - سکه: نقدی/حواله ... تومان
      - انس جهانی: ... دلار · نقره: ... دلار
      - تتر: ... تومان
      - یورو: ...

      منبع: [se_pz — پست ساعت ...](لینک پست)

      ۵) اگر آخرین بخش سند همین تاریخ و ساعت را دارد، دوباره ننویس تا تکراری نشود.

      ۶) در پیام پایانی یک خط خلاصه بده: دلار، طلای گرمی، یورو. اگر هر دو کانال در دسترس نبودند، فقط بنویس این ساعت ثبت نشد و چرا.
    runOn: maus
    schedule:
      type: cron
      expression: 0 8-22 * * *
      timeZone: Asia/Tehran
    durationMinutes: 30
    timeoutMinutes: 30
    continuity: true
    enabledAfterInstall: false
agents:
  - key: olive
    name: Olive
    appearance:
      color: blue
      mascotBody: cursor
---

# Olive

A bot shared from MausBot.

## Activation

Add this bot in MausBot with + → Import… and this folder's link, or give this file and its skills folder to any AI agent and ask it to work as this bot.

## Mission

Shared from MausBot. The bot arrives as a new copy with its skills and routines; routines start paused and chat history never travels.

## Outcomes

- Recreate this team without copying chat history or private settings.

## Connections

None. Each person connects their own accounts.

## Team

### Olive

## Chief of Staff

None.

## Routines

- ثبت ساعتی قیمت طلا، سکه، دلار و یورو (paused until you turn it on): هر ساعت از ۸ صبح تا ۱۰ شب به وقت تهران، قیمت لحظه‌ای دلار، طلا، سکه و یورو را از دو کانال تلگرامی بخوان و در سند گوگل ثبت کن.

## Completion rule

Nothing here holds chats, memory, keys or passwords. Routines arrive paused, and each app is connected with the person's own account.
