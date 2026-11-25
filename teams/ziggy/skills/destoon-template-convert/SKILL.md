---
name: destoon-template-convert
description: "[DEPRECATED] 已棄用，請改用 mycms-template-convert。原版 Destoon 模板套版技能。"
metadata:
  author: destoon-project
  version: "1.0"
  deprecated: true
  replacement: mycms-template-convert
---

# ⚠️ DEPRECATED — 請改用 `mycms-template-convert`

> 此技能已棄用。MyCMS 專案請使用 **`/mycms-template-convert`** 技能。
> 新技能必須讀現有模板、使用 MC_* 常數、輸出到 mycmsv1/、含部署步驟。

---

# Destoon 模板套版技能（舊版）

> **核心原則：絕對不要開啟或參考 `template/default/` 的任何檔案。**
> 原型 = 外觀，tagall = 功能清單，兩者合併 = 新模板。

---

## 觸發條件

使用者說以下任一類指令時啟用本技能：
- 「套版」、「幫我套版 xxx.htm」
- 「根據原型做新模板」
- 「把 prototype/xxx.html 轉成 Destoon 模板」
- 「新增 / 建立 xxx.htm 模板」

---

## 執行前必讀（每次套版前都要讀）

### 1. 確認輸入資訊

向使用者確認（若尚未提供）：

| 需要確認 | 說明 |
|---|---|
| **頁面名稱** | 例如 `login`、`my_sell`、`list` |
| **模組目錄** | 例如 `member`、`sell`、`buy` |
| **原型路徑** | 例如 `prototype/member/login.html` |

### 2. 讀取三份來源文件

**依序讀取，不可跳過：**

```
Step A：讀取標籤
路徑：D:\web-project\my-destoon-tag\00 標籤 Tag\Default\{module}\{page}.htm
      D:\web-project\my-destoon-tag\00 標籤 Tag\Member\{page}.htm（Member 模組獨立目錄）
      D:\web-project\my-destoon-tag\00 標籤 Tag\Install\{page}.tpl.php（安裝頁）
用途：這是功能清單——頁面需要哪些 tag、條件、迴圈、模板引用
注意：Member 從 Default 獨立出來，因為各自有不同的 header/footer

Step B：讀取原型
路徑：D:\web-project\my-destoon-tag\01 原型 Prototype\{套版名}\{module}\{page}.html（或使用者指定路徑）
用途：這是外觀藍圖——HTML 結構、CSS class、視覺佈局

Step C：讀取模板語法參考（若有不熟悉的語法）
Obsidian：Destoon 筆記/03 模板系統/模板引擎.md
Obsidian：Destoon 筆記/03 模板系統/Tag 標籤完整參考.md
```

---

## ⚠️ 框架頁 vs 內容頁（必讀，違反會造成雙重套版）

套版前，**先判斷頁面類型**，規則完全不同：

| 類型 | 範例 | HTML 結構 | 第一行 / 最後一行 |
|---|---|---|---|
| **框架頁 — header** | `header.htm`、`member/header.htm` | ✅ 必須有完整 `<!DOCTYPE>`+`<head>`+`<body>` | 從 `<!DOCTYPE html>` 開始；不呼叫自己 |
| **框架頁 — footer** | `footer.htm`、`member/footer.htm` | ✅ 必須有 `</body></html>` | 直接關閉 content div；最後一行 `</body></html>` |
| **內容頁** | `login.htm`、`my_sell.htm`、`list.htm` | ❌ 絕對不能有 HTML shell | 第一行 `{template 'header', 'member'}` 或 `{template 'header'}`；最後一行對應 footer |

### 框架頁必要結構清單

**`{模組}/header.htm` 必須包含：**
```
□ <!DOCTYPE html><html lang="zh-TW">
□ <head>：meta charset/viewport、<title>（用 Destoon 動態變數）
□ Tailwind v4 CDN + Google Fonts + Alpine.js（測試期）
□ 模組專屬 CSS/JS（從 dt-tag 對應 header.htm 提取）
□ {dmsg()}
□ 頂部列 HTML（logo、導覽、用戶狀態）
□ Content wrapper 開始 div（含 sidebar，若有）
□ 不呼叫 {template 'header'} — 那會造成無限遞迴！
```

**`{模組}/footer.htm` 必須包含：**
```
□ Content wrapper 結束 </div>
□ 模組專屬底部 JS（從 dt-tag 對應 footer.htm 提取）
□ 最後一行：</body></html>
□ 不呼叫 {template 'footer'} — 同樣是無限遞迴！
```

> **真實失敗案例：** agent 在 `member/header.htm` 第一行放了 `{template 'header'}`，
> 造成每個 member 頁面渲染出兩個 `<html><head><body>`。
> **不管 dt-tag 原始檔怎麼寫，框架頁絕對不呼叫同層 template。**

---

## 套版流程（Rigid — 嚴格按照順序執行）

### Phase 1：分析 dt-tag（功能清單）

讀完 dt-tag 後，列出以下清單：

```
□ 頁面起始：{template 'header'} 或 {template 'header', 'member'}？
□ 頁面結束：{template 'footer'} 或 {template 'footer', 'member'}？
□ 頂層條件分支：有幾個 $action 模式？（例如 add / edit / list）
□ 需要載入的 JS/CSS：{load('...')} 有哪些？
□ 動態資料迴圈：{loop $lists $k $v} 有哪些欄位？
□ 系統功能開關：$DT[...]、$MOD[...]、$MG[...] 控制哪些區塊？
□ 引用的 chip 片段：{template 'xxx', 'chip'} 有哪些？
□ 特殊函式：{ajax_category_select()}、{deditor()}、{fields_html()} 等
□ 使用者狀態：$_userid、$_username、$_groupid 等
□ ⚠️ 表單標籤：有幾個 <form>？每個的 action、id、onsubmit、enctype 各是什麼？
□ ⚠️ Hidden 欄位：<input type="hidden"> 有哪些？（這些是功能性 HTML，必須完整保留）
□ ⚠️ Submit 按鈕：是否有 name="submit"？onsubmit 呼叫的函式名是什麼？（check / Dcheck / Scheck 等）
```

### Phase 2：分析原型（外觀藍圖）

讀完原型後，記錄：

```
□ 整體佈局結構（幾欄、側欄、卡片）
□ 有哪些 UI 狀態（分頁 tab、篩選列、空狀態）
□ 表單元件（input、select、textarea、uploader）
□ 列表卡片的 HTML 結構
□ 靜態假資料的位置（這些要換成動態變數）
□ 使用的 CSS 框架（Tailwind class）
```

### Phase 3：合併（套版核心）

**規則：Destoon tag（花括號 `{}`）從 dt-tag 複製，HTML 結構從原型複製。**

> 這是最關鍵的分工原則。dt-tag 提供「什麼資料」，原型提供「怎麼排版」。
> dt-tag 行裡夾帶的 HTML 標籤（`<td>`、`<tr>`、`<table>`）和舊 CSS class **一律丟棄**，
> 只提取花括號內的 Destoon tag 語法，填入原型的 HTML 結構中。

```
dt-tag 的每一行                     套版處理
───────────────────────────────────────────────────────────
{template 'header', 'member'}     → 保留，原型的 <head> 全部移除
{if $action == 'add'}             → 保留條件判斷，填入原型的表單 HTML
{loop $lists $k $v}               → 保留迴圈，把原型的假卡片 HTML 放進去
  {$v[title]}                     → 替換原型假文字
  {$v[linkurl]}                   → 替換原型假連結 href
<td class="tab">{$nums[3]}</td>   → ⚠️ 丟棄 <td class="tab">，只取 {$nums[3]} 填入原型的 pill
<td class="f_gray">{$v[hits]}</td>→ ⚠️ 丟棄 <td class="f_gray">，只取 {$v[hits]} 填入原型的 <td>
class="btn-g"                     → ⚠️ 替換為原型的 Tailwind 按鈕 class
{template 'footer', 'member'}     → 保留，原型的 </body></html> 移除
```

### ⚠️ dt-tag 舊 CSS class 清除規則（必讀）

dt-tag 行裡的 `class="..."` 是 Destoon 預設模板的舊樣式，**一律替換為原型對應的 Tailwind class**。

| dt-tag 舊 class | 用途 | 替換為（原型的 Tailwind class） |
|---|---|---|
| `class="btn-g"` | 綠色主按鈕 | `class="px-4 py-2 bg-brand-600 text-white rounded-lg ..."` |
| `class="btn"` | 一般按鈕 | `class="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg ..."` |
| `class="btn-r"` | 紅色危險按鈕 | `class="px-4 py-2 bg-red-600 text-white rounded-lg ..."` |
| `class="tab"` / `class="tab_on"` | 水平分頁標籤 | pill 導航 class |
| `class="f_red/f_gray/f_blue/f_b"` | 字體顏色/粗體 | `text-red-500` / `text-gray-500` / `text-blue-500` / `font-bold` |
| `class="t"` | 文字連結 | `text-brand-600 hover:underline` |
| `class="ts"` / `class="tl"` | 表格提示/標籤 | `text-sm text-gray-500` / `font-medium text-gray-700` |
| `class="thumb"` | 縮圖 | `rounded-lg border border-gray-200` |
| `class="dsn"` | display:none | 保留（功能用途） |

**常見靜態 → 動態替換：**

| 原型寫死的東西 | 替換為 |
|---|---|
| 假文字（標題、說明） | `{$v[title]}`、`{$MOD[name]}` 等 |
| 假數字（12、3、1） | `{$nums[3]}`、`{$count}` 等 |
| 假連結 `href="xxx.html"` | `{$v[linkurl]}`、`?mid={$mid}&action=...` |
| 假圖片 `src="..."` | `{$v[thumb]}`、`{$v[pic]}` |
| 硬寫的 OAuth 按鈕 | `{loop $OAUTH $k $v}...{/loop}` |
| 硬寫的分類選單 | `{category_select()}`、`{ajax_category_select()}` |
| `.html` 後綴連結 | 改為 `.php` 或 Destoon 重寫 URL |

### ⚠️ 表單標籤處理規則（必讀 — 違反會導致資料無法存檔）

> **真實失敗案例：** 套版後表單填寫資料按「儲存」毫無反應。
> 原因 1：`<form>` 缺少 `action="?"`、`id="dform"`、`onsubmit="return Dcheck();"`
> 原因 2：submit 按鈕缺少 `name="submit"`
> Destoon PHP 控制器用 `isset($_POST['submit'])` 判斷表單是否提交，
> 缺少任一項都會導致 PHP 忽略整個 POST 請求 → 資料不存檔。

**`<form>` 標籤：功能屬性從 dt-tag 複製，外觀 class 從原型保留**

```
dt-tag 的 form：
  <form method="post" action="?" id="dform" onsubmit="return Dcheck();">

套版後的 form（加上 Tailwind class）：
  <form method="post" action="?" id="dform" onsubmit="return Dcheck();" class="space-y-6 max-w-2xl">
                     ↑ 功能屬性完整複製                                    ↑ 外觀 class 保留
```

**必須完整複製的功能屬性（不可省略、不可改寫）：**

| 屬性 | 作用 | 漏掉的後果 |
|---|---|---|
| `action="?"` | 提交目標（Destoon 慣例用 `?` 表示自身） | PHP 收不到 POST |
| `id="dform"` | JS 驗證函式定位表單 | Dcheck() 找不到表單 |
| `onsubmit="return Dcheck();"` | 提交前驗證（函式名因頁面不同） | 跳過前端驗證 |
| `enctype="multipart/form-data"` | 檔案上傳用 | 上傳功能失效 |
| `name="submit"` (在 submit 按鈕上) | PHP 判斷表單已提交 | **資料完全不存檔** |

**Submit 按鈕：必須有 `name="submit"`**

```html
<!-- ❌ 錯誤：PHP 的 isset($_POST['submit']) 為 false → 資料不存檔 -->
<button type="submit" class="px-6 py-2.5 bg-brand-600 ...">儲存</button>

<!-- ✅ 正確：加上 name="submit" -->
<button type="submit" name="submit" class="px-6 py-2.5 bg-brand-600 ...">儲存</button>

<!-- ✅ 也正確：用 input 元素 -->
<input type="submit" name="submit" value="儲存" class="px-6 py-2.5 bg-brand-600 ..."/>
```

> **注意**：搜尋表單（`id="search"`）的 submit 不需要 `name="submit"`，只有主要資料表單需要。

**Hidden 欄位：完整保留，不可刪除**

```html
<!-- 這些看起來像「純 HTML」，但都是功能必要的 -->
<input type="hidden" name="tab" id="tab" value="{$tab}"/>
<input type="hidden" name="post[catid]" value="{$catid}" id="catid"/>
```

**`</form>` 閉合位置：必須包含所有表單欄位和 submit 按鈕**

### ⚠️ 多表單配對規則（必讀 — 違反會導致功能缺失）

dt-tag 中常有多個 `<form>`，每個用途不同，套版時必須**逐一對應**，不可遺漏或混淆。

**常見模式（以 my_sell.htm 為例，3 個 form）：**

| # | dt-tag 的 form | 用途 | 注意事項 |
|---|---|---|---|
| 1 | `<form method="post" id="dform" action="?" onsubmit="return check();">` | 主表單（add/edit） | 需 `name="submit"` |
| 2 | `<form action="?" id="search">` | 搜尋/篩選 | 不需 `name="submit"` |
| 3 | `<form method="post">` | 批次操作（刪除/刷新） | submit 按鈕帶 `onclick` 設定 `this.form.action` |

**驗證**：套版後的 `<form>` 數量必須與 dt-tag 一致。若不一致，需在注解中說明原因。

### ⚠️ 簡體→繁體文字轉換

dt-tag 中的固定文字是**簡體中文**，套版時必須轉為**繁體中文台灣用語**：

```
dt-tag：「提 交」→ 套版：「送出」或「儲存」
dt-tag：「删除选中」→ 套版：「刪除已選」
dt-tag：「搜 索」→ 套版：「搜尋」
dt-tag：「重 置」→ 套版：「重置」
dt-tag：「请选择」→ 套版：「請選擇」
dt-tag：「关键词」→ 套版：「關鍵詞」
dt-tag：「信息」→ 套版：「資訊」
dt-tag：「发布」→ 套版：「發布」
```

### Phase 4：補齊 tagall 有但原型沒有的功能

原型通常缺少以下項目，套版時必須補上：

**安全功能：**
```
{if $MOD[captcha_login]}{template 'captcha', 'chip'}{/if}
{if $DT[md5_pass]}{load('md5.js')}<script>$(function(){md5_pwd();})</script>{/if}
{if $DT[kb_pass]}{load('keyboard.js')}{/if}
```

**多模式頁面（my_* 系列必查）：**
- 原型通常只設計了「列表」模式
- tagall 裡的 `{if $action=='add' || $action=='edit'}` 區塊需補設計
- 可用 `<!--[ 待設計：新增/編輯表單 ]-->` 標記留待後續設計

**功能開關：**
```
{if $MG[delete]}...刪除按鈕...{/if}
{if $show_limit}...發布限制提示...{/if}
{if $could_elite}...加精選項...{/if}
```

### Phase 5：輸出驗證

**先確認頁面類型，再套用對應清單：**

**框架頁（header.htm / footer.htm）：**
```
□ header：有 <!DOCTYPE html>、<html>、<head>、<body>
□ header：有 <title> 含 Destoon 動態變數（非寫死文字）
□ header：有 Tailwind CDN + Google Fonts + Alpine.js
□ header：有模組專屬 CSS/JS（從 dt-tag 提取）
□ header：有 {dmsg()}
□ header：第一行不是 {template 'header'} 或 {template 'header', 'member'}
□ footer：最後一行是 </body></html>
□ footer：最後一行不是 {template 'footer'} 或 {template 'footer', 'member'}
```

**內容頁（所有其他頁面）：**
```
□ 第一行是 {template 'header'} 或 {template 'header', 'member'}
□ 最後一行是 {template 'footer'} 或 {template 'footer', 'member'}
□ 沒有 <!DOCTYPE>、<html>、<head>、<body> 標籤
□ 沒有 CDN 連結（Tailwind CDN、Google Fonts 等）
```

**所有頁面共用：**
```
□ dt-tag 裡的每一個 {loop} 都有對應的 HTML 結構
□ dt-tag 裡的每一個 {if $MOD[...]} 開關都保留
□ dt-tag 裡的每一個 {load('...')} 都在正確位置
□ dt-tag 裡的每一個 {template 'xxx', 'chip'} 都保留
□ 沒有任何硬寫的假資料（數字、文字、連結）殘留
□ 有多個 $action 模式的頁面，每個模式都有對應的 HTML 區塊
□ 沒有巢狀 <a> 標籤（sidebar 帶次要動作的項目，外層必須是 <div>）
□ ⚠️ Member 內容頁無 <aside> 元素、無 <div class="flex"> 包裹側欄（見下方規則）
```

**⚠️ 禁止雙側欄（Member 模組 — 必讀）：**

> **真實失敗案例**：my_sell、trade_* 等 23 個頁面在主側欄旁又加了
> `<aside class="w-64">` 二級側欄，造成雙導航擠壓內容。

使用 `{template 'header', 'member'}` 的頁面**已經有主側欄**（由 header.htm 提供）。
dt-tag 中的 `<td class="tab">` / `<td class="tab_on">` 是**水平分頁標籤**，
套版時必須轉為**水平 pill 導航**，絕對不能做成垂直側欄。

```html
<!-- ✅ 正確：水平 pill 子導航 -->
<nav class="flex flex-wrap items-center gap-2 mb-6 bg-white rounded-xl shadow-sm px-4 py-3 border border-gray-100">
  <a href="?mid={$mid}" class="px-3 py-1.5 text-sm rounded-lg bg-brand-100 text-brand-700 font-medium">已發布({$nums[3]})</a>
  <a href="?mid={$mid}&status=2" class="px-3 py-1.5 text-sm rounded-lg text-gray-600 hover:bg-gray-100">審核中({$nums[2]})</a>
</nav>

<!-- ❌ 錯誤：在內容頁加垂直側欄（和 header.htm 的主側欄衝突） -->
<div class="flex">
  <aside class="w-64">...</aside>
  <main>...</main>
</div>
```

**⚠️ 表單驗證（有 `<form>` 的頁面必查）：**
```
□ 每個 <form> 的 action、id、onsubmit 屬性與 dt-tag 完全一致
□ 主要資料表單的 submit 按鈕有 name="submit"（搜尋表單除外）
□ 所有 <input type="hidden"> 完整保留（不可因「看不到」而刪除）
□ </form> 閉合位置正確（包含所有欄位和 submit 按鈕）
□ form 數量與 dt-tag 一致（若不一致需註明原因）
□ onsubmit 函式名正確（check / Dcheck / Scheck / Mcheck / Rcheck 等因頁面而異）
```

**RWD 響應式驗證：**
```
□ 含表格的卡片容器用 overflow-x-auto（不是 overflow-hidden）
□ 搜尋/篩選列有 flex-wrap（小螢幕換行）
□ ⚠️ grid-cols-2 必須寫成 grid-cols-1 sm:grid-cols-2（手機單欄）
□ ⚠️ grid-cols-3 必須寫成 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3
□ ⚠️ col-span-2 必須寫成 sm:col-span-2（否則在 grid-cols-1 下會撐出隱式第二欄）
□ ⚠️ <main> 的 padding 用 p-4 sm:p-6（不要只寫 p-6）
□ 表單欄位在手機上能正常顯示（不溢出）
```

---

## 輸出格式

```
{template 'header', 'member'}

<!--[區塊名稱]-->
{if 條件}
<div class="...tailwind classes...">
  {loop $lists $k $v}
  <div class="...">
    <a href="{$v[linkurl]}">{$v[title]}</a>
  </div>
  {/loop}
</div>
{/if}

<!--[腳本邏輯]-->
{if $DT[md5_pass]}{load('md5.js')}<script>$(function(){md5_pwd();})</script>{/if}

{template 'footer', 'member'}
```

---

## 特殊情況處理

### 原型設計了但 tagall 沒有的 UI

保留原型的 HTML，但加上 Destoon 注解說明這是純 UI：
```html
<!--[ 純UI：統計卡片，數據由 $member 提供 ]-->
<div class="...">
  <span>{$member[hits]}</span>
</div>
```

### tagall 有但原型完全沒設計的功能

保留 tag 邏輯，加上注解說明待設計：
```
<!--[ 待設計：員工帳號登入模式 $action==child ]-->
{if $action=='child'}
{/if}
```

### Sidebar 帶次要動作按鈕的正確結構

Sidebar 項目若有主連結 + 次要動作（如「發信」「添加」「預覽」），**絕對不能用巢狀 `<a>`**。
巢狀 `<a>` 是無效 HTML，瀏覽器會將內層 `<a>` 提取到外層，導致次要動作按鈕變成獨立行。

```html
<!-- ❌ 無效 HTML：瀏覽器把內層 <a> 提取出來，次要按鈕變獨立行 -->
<a href="{$MODULE[2][linkurl]}message.php" class="flex items-center justify-between ...">
  <span>站內信件</span>
  <a href="{$MODULE[2][linkurl]}message.php?action=add" class="text-xs ...">發信</a>
</a>

<!-- ✅ 正確：外層改 <div>，主連結和次要動作各自獨立 -->
<div class="flex items-center justify-between px-3 py-2 rounded-lg transition-colors ...">
  <a href="{$MODULE[2][linkurl]}message.php" class="flex-1 min-w-0"><span>站內信件</span></a>
  <a href="{$MODULE[2][linkurl]}message.php?action=add" class="text-xs text-gray-400 hover:text-brand-600 shrink-0 ml-2">發信</a>
</div>
```

> **注意**：每個 `<div>` 必須有對應的 `</div>` 關閉標籤，漏掉會導致後續所有 sidebar 項目全部橫向排列。

### 模板片段不確定放在哪裡

查閱 Obsidian 筆記：
- `Destoon 筆記/12 套版開發參考/chip/` — 了解各 chip 的用途和位置
- `Destoon 筆記/03 模板系統/前台佈局模式.md` — 了解公共片段的呼叫語法

---

## Destoon 雙系統目錄結構（重要）

Destoon 的**模板**與**風格**是兩套完全分離的系統，不可混用：

| 系統 | 根目錄 | 存放內容 | 允許副檔名 |
|---|---|---|---|
| **模板（Template）** | `template/{名稱}/` | .htm 模板檔 | 只有 `.htm` |
| **風格（Skin）** | `static/skin/{名稱}/` | CSS、JS、圖片、圖標、Logo | `.css` `.js` `.jpg` `.png` `.gif` `.bmp` |

```
Destoon 根目錄/
├── template/
│   └── {新模板名}/        ← 只放 .htm 檔
│       ├── header.htm
│       ├── footer.htm
│       ├── member/
│       └── sell/
└── static/
    └── skin/
        └── {新風格名}/    ← 只放靜態資源（CSS/JS/圖片）
            ├── style.css
            ├── logo.png
            └── icons/
```

> ⚠️ **絕對不要把 CSS/JS/圖片放進 `template/` 目錄**，那個目錄只允許 `.htm` 檔。

---

## 輸出後的動作

完成 .htm 檔案後：

1. **模板存放**：`D:\web-project\my-destoon-tag\02 模板 Template\{套版名}\{module}\{page}.htm`
   - 套版名與原型對應，例如 `twp001`
   - 例如：`02 模板 Template\twp001\member\login.htm`

2. **靜態資源存放**：`D:\web-project\my-destoon-tag\03 風格 Skin\{套版名}\`
   - Logo、圖標（SVG/PNG）→ `03 風格 Skin/{套版名}/images/`
   - 自訂 CSS → `03 風格 Skin/{套版名}/style.css`
   - 自訂 JS → `03 風格 Skin/{套版名}/custom.js`
   - 若為 Tailwind build 產出 → `03 風格 Skin/{套版名}/app.css`

3. **在 header.htm 引用靜態資源**：
   ```html
   <!-- 測試期用 Tailwind v4 CDN，正式環境換成 build 產出 -->
   <link rel="stylesheet" href="{$DT_PATH}static/skin/{$CFG[skin]}/app.css">
   <script src="{$DT_PATH}static/skin/{$CFG[skin]}/custom.js"></script>
   ```

4. **Tailwind CSS 處理**：
   - 測試期：在 header.htm 內嵌 CDN（`@tailwindcss/browser@4`）
   - 正式上線：`npm run build` 產出 `app.css` → 放到 `03 風格 Skin/{套版名}/`，移除 CDN

5. **測試**：
   - 後台 → 系統設定 → 模板 → 切換到新模板
   - 後台 → 系統設定 → 風格 → 切換到對應風格
   - 檢查動態資料是否正確輸出
   - 檢查各 $action 模式是否都能正常切換
