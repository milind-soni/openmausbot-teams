---
name: mycms-template-convert
description: "將原型頁面套版為 MyCMS .htm 模板。觸發：套版、新模板、convert template、模板套版、原型轉模板、幫我做 *.htm"
metadata:
  author: mycms-project
  version: "4.0"
---

# MyCMS 模板套版技能

> **核心原則：必須讀取現有模板，了解需要保留的功能。**
> 原型 = 外觀，現有模板 = 功能清單，兩者合併 = 新模板。

---

## 觸發條件

使用者說以下任一類指令時啟用本技能：
- 「套版」、「幫我套版 xxx.htm」
- 「根據原型做新模板」
- 「把原型轉成模板」
- 「新增 / 建立 xxx.htm 模板」

---

## 共用規範

CSS 黑名單、雙索引搜尋、Metadata 格式、`{php}` 限制、簡繁轉換等規範定義在 `mycms-engineer`（第十三章），套版時自動生效。

套版輸出 `tag/*.htm` 或 `chip/*.htm` 時，必須帶完整 metadata（格式見 `mycms-engineer` 第十三章）。

---

## 執行前必讀（每次套版前都要讀）

### 0. 讀取設計規範與模板指南

**必須先讀取以下兩份文件，了解全站設計語言和模板架構：**

```
MyCMS設計規範.md     — 色彩系統、卡片、按鈕、標籤、佈局、動畫等 UI 規範
MyCMS模板開發指南.md — 三層架構（頁面框架→tag→chip）、模板語法、開發規範
```

### 1. 確認輸入資訊

向使用者確認（若尚未提供）：

| 需要確認 | 說明 |
|---|---|
| **頁面名稱** | 例如 `login`、`my_sell`、`list` |
| **模組目錄** | 例如 `member`、`sell`、`buy`，或根目錄（`header`、`footer`、`index`） |
| **原型路徑** | 例如 `mycms/prototype/header.html` |

### 2. 讀取三份來源文件

**依序讀取，不可跳過：**

```
Step A：讀取現有模板（必做！）
路徑：mycms/template/default/{module}/{page}.htm
      mycms/template/default/{page}.htm（全站共用）
用途：了解需要保留的 Destoon 標籤、表單、JS/CSS、功能開關
備用：若 mycmsv1 沒有，參考 destoon-20260310/template/default/

Step B：讀取原型
路徑：mycms/prototype/{page}.html（或使用者指定路徑）
用途：這是外觀藍圖——HTML 結構、CSS class、視覺佈局

Step C：讀取模板語法參考（若有不熟悉的語法）
Obsidian：Destoon 筆記/03 模板系統/模板引擎.md
Obsidian：Destoon 筆記/03 模板系統/Tag 標籤完整參考.md
```

---

## ⚠️ 框架頁 vs 內容頁（必讀，違反會造成雙重套版）

套版前，**先判斷頁面類型**：

| 類型 | 範例 | HTML 結構 | 第一行 / 最後一行 |
|---|---|---|---|
| **框架頁 — header** | `header.htm` | ✅ 有完整 `<!DOCTYPE>`+`<head>`+`<body>` | 從 `<!doctype html>` 開始 |
| **框架頁 — footer** | `footer.htm` | ✅ 有 `</body></html>` | 最後一行 `</body></html>` |
| **內容頁** | `login.htm`、`index.htm` | ❌ 絕對不能有 HTML shell | 第一行 `{template 'header'}`；最後一行 `{template 'footer'}` |

> **框架頁絕對不呼叫自己**：header.htm 不能有 `{template 'header'}`，footer.htm 不能有 `{template 'footer'}`。

---

## 常數使用規範

### MyCMS 常數（正式用法）

模板中使用 `MC_*` 常數和 `$MC[...]` 變數：

| 常數/變數 | 用途 |
|---|---|
| `{MC_PATH}` | 站台根路徑 URL |
| `{MC_SKIN}` | 風格目錄路徑 |
| `{MC_STATIC}` | 靜態資源路徑 |
| `{MC_TIME}` | 當前時間戳 |
| `{MC_REFRESH}` | 快取版本字串 |
| `{MC_LANG}` | 語言代碼 |
| `{MC_DEBUG}` | 偵錯模式開關 |
| `$MC[sitename]` | 站台名稱 |
| `$MC[copyright]` | 版權文字 |
| `$MC[logo]` | Logo 路徑 |

### ⚠️ 過渡期相容

`common.inc.php` 中有向後相容別名，所以 `{DT_PATH}`、`$DT[...]` 目前也可以用。
但**新建模板應使用 `MC_*`**，逐步淘汰 `DT_*`。

---

## 套版流程（Rigid — 嚴格按照順序執行）

### Phase 1：分析現有模板（功能清單）

讀完現有 .htm 模板後，列出：

```
□ 頁面起始：{template 'header'} 或 {template 'header', 'member'}？
□ 頁面結束：{template 'footer'} 或 {template 'footer', 'member'}？
□ 頂層條件分支：有幾個 $action 模式？（例如 add / edit / list）
□ 需要載入的 JS/CSS：{load('...')} 有哪些？
□ 動態資料迴圈：{loop $lists $k $v} 有哪些欄位？
□ 系統功能開關：$MC[...]、$MOD[...]、$MG[...] 控制哪些區塊？
□ 引用的 chip 片段：{template 'xxx', 'chip'} 有哪些？
□ 特殊函式：{ajax_category_select()}、{deditor()}、{fields_html()} 等
□ ⚠️ 表單：<form> 數量、action、id、onsubmit、enctype
□ ⚠️ Hidden 欄位：<input type="hidden"> 完整清單
□ ⚠️ Submit 按鈕：name="submit" 是否存在
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

**規則：Destoon tag 從現有模板複製，HTML 結構從原型複製。**

```
現有模板的每一行                     套版處理
───────────────────────────────────────────────────────────
{template 'header'}               → 保留
{if $action == 'add'}             → 保留條件，填入原型的表單 HTML
{loop $lists $k $v}               → 保留迴圈，把原型的假卡片放進去
  {$v[title]}                     → 替換原型假文字
  {$v[linkurl]}                   → 替換原型假連結 href
<td class="tab">{$nums[3]}</td>   → ⚠️ 丟棄 <td class="tab">，只取 {$nums[3]}
class="btn-g"                     → ⚠️ 替換為 Tailwind 按鈕 class
```

### ⚠️ 舊 CSS class 清除規則

現有模板中的 `class="..."` 是舊樣式，**一律替換為原型對應的 Tailwind class**：

| 舊 class | 替換為 |
|---|---|
| `class="btn-g"` | `class="px-4 py-2 bg-brand-600 text-white rounded-lg ..."` |
| `class="btn"` | `class="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg ..."` |
| `class="btn-r"` | `class="px-4 py-2 bg-red-600 text-white rounded-lg ..."` |
| `class="f_red/f_gray"` | `text-red-500` / `text-gray-500` |
| `class="tab"` / `class="tab_on"` | pill 導航 class |

### ⚠️ 表單標籤處理規則（必讀）

> **真實失敗案例：** 套版後表單按「儲存」毫無反應。
> 原因：submit 按鈕缺少 `name="submit"`，PHP 的 `isset($_POST['submit'])` 為 false。

**`<form>` 標籤：功能屬性從現有模板複製，外觀 class 從原型保留**

```html
<!-- 現有模板的 form 屬性完整保留 -->
<form method="post" action="?" id="dform" onsubmit="return Dcheck();" class="space-y-6">
```

**必須完整複製的功能屬性：**
- `action="?"` — 提交目標
- `id="dform"` — JS 驗證定位
- `onsubmit="return Dcheck();"` — 前端驗證
- `enctype="multipart/form-data"` — 檔案上傳用
- `name="submit"` — **在 submit 按鈕上，PHP 依賴此屬性**

**Hidden 欄位：完整保留，不可刪除**
```html
<input type="hidden" name="tab" id="tab" value="{$tab}"/>
```

### ⚠️ 簡體→繁體文字轉換

（對照表見 `mycms-engineer` 第十三章）

### Phase 4：補齊現有模板有但原型沒有的功能

原型通常缺少的項目，套版時必須補上：

- **安全功能**：captcha、md5_pass、kb_pass
- **多模式頁面**：`{if $action=='add' || $action=='edit'}` 區塊
- **功能開關**：`{if $MG[delete]}`、`{if $show_limit}` 等

### Phase 5：輸出驗證

**內容頁驗證：**
```
□ 第一行是 {template 'header'} 或 {template 'header', 'member'}
□ 最後一行是對應的 {template 'footer'}
□ 沒有 <!DOCTYPE>、<html>、<head>、<body>
□ 沒有 CDN 連結
```

**框架頁驗證（header.htm）：**
```
□ 有 <!DOCTYPE html>、<html lang="zh-TW">、<head>、<body>
□ 有 Tailwind CDN + Google Fonts + Alpine.js
□ 有 {dmsg()}
□ 不呼叫 {template 'header'}
```

**所有頁面共用驗證：**
```
□ 現有模板的每一個 {loop} 都有對應 HTML 結構
□ 現有模板的每一個 {if} 開關都保留
□ 現有模板的每一個 {load()} 在正確位置
□ 現有模板的每一個 {template 'xxx', 'chip'} 都保留
□ 沒有硬寫的假資料殘留
□ ⚠️ 表單數量與現有模板一致
□ ⚠️ submit 按鈕有 name="submit"
□ ⚠️ 所有 hidden 欄位保留
□ ⚠️ RWD: grid-cols 有響應式斷點
□ ⚠️ RWD: 含表格的容器有 overflow-x-auto
□ ⚠️ Member 內容頁無 <aside>（子導航用水平 pill）
```

---

## 輸出與部署

### 輸出路徑

```
mycms/template/default/{module}/{page}.htm
例如：mycms/template/default/header.htm
      mycms/template/default/member/login.htm
```

### 部署至運行站台

套版完成後執行：

```bash
# 1. 複製到運行站台
cp mycms/template/default/{path}.htm mycms/mycms/template/default/{path}.htm

# 2. 清除對應的模板快取（只刪 tpl/ 下的 .php）
find mycms/mycms/file/cache/tpl/ -name "*.php" -path "*{對應路徑}*" -delete

# 3. 驗證頁面渲染
curl -s "https://mycms.test/{page}" --insecure | wc -c
# 應回傳數千位元組，若 < 500 表示有 PHP 錯誤
```

**⚠️ 注意：不要刪除 `file/cache/` 根目錄下的系統快取（module.php、area.php 等），只清除 `file/cache/tpl/` 下的模板快取。**

---

## 特殊情況

### 現有模板有但原型完全沒設計的功能

保留 tag 邏輯，加注解說明待設計：
```
<!--[ 待設計：員工帳號登入模式 $action==child ]-->
{if $action=='child'}
{/if}
```

### 模板語法不確定

查閱 Obsidian：
- `Destoon 筆記/03 模板系統/` — 模板引擎、Tag 標籤參考
- `Destoon 筆記/12 套版開發參考/` — chip 片段用途
