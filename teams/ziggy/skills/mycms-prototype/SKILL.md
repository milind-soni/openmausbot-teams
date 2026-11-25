---
name: mycms-prototype
description: "建立 MyCMS 頁面原型。觸發：做原型、設計原型、新增原型、prototype、原型頁面、幫我做 * 原型"
metadata:
  author: mycms-project
  version: "4.0"
---

# MyCMS 原型設計技能

> **核心原則：原型只管外觀，不管 Destoon tag 語法。**
> 原型 = 真實感的靜態 HTML，用假資料呈現頁面長相，供後續套版使用。

---

## 觸發條件

使用者說以下任一類指令時啟用本技能：
- 「做原型」、「設計原型」、「幫我做 xxx 原型」
- 「新增原型頁面」、「建立 prototype」
- 「我需要 xxx 頁面的原型」

---

## 共用規範

CSS 黑名單、雙索引搜尋、Metadata 格式、`{php}` 限制、簡繁轉換等規範定義在 `mycms-engineer`（第十三章），做原型時自動生效。

---

## 執行前必讀（每次做原型前都要讀）

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
| **頁面名稱** | 例如 `index`、`my_sell`、`login` |
| **所屬模組** | 例如 `member`、`sell`、`buy`，或全站共用（`header`、`footer`） |
| **頁面用途** | 例如「會員首頁」、「我的發布列表」 |

### 2. 讀取現有模板（了解頁面需要呈現什麼資料）

**從專案內的現有 .htm 模板提取 Destoon 標籤：**

```
主要路徑：mycms/template/default/{module}/{page}.htm
全站共用：mycms/template/default/{page}.htm（header.htm、footer.htm、index.htm）
唯讀參考：destoon-20260310/template/default/{module}/{page}.htm（原版 Destoon，用於對照）
```

**從模板提取的資訊用於：**
- 列表卡片有哪些欄位（title、linkurl、thumb、price 等）
- 頁面有哪些模式（add / edit / list）
- 有哪些統計數字（`$nums[n]`、`$count`）
- 用戶狀態顯示（`$_username`、`$_groupid`）
- `{tag()}` 呼叫了哪些子模板
- `{if}` 條件控制了哪些區塊的顯示/隱藏

**提取時忽略舊佈局 HTML**：只提取花括號 `{}` 內的 Destoon 變數，忽略周圍的 HTML 標籤和舊 CSS class。

| 模板中的舊佈局 | 實際語義 | 原型應做成 |
|---|---|---|
| `<td class="tab">` / `<td class="tab_on">` | 水平分頁標籤 | 水平 pill 導航 |
| `<td class="ts">` | 提示說明文字 | `<p>` 或 alert 提示區塊 |
| `<td class="tl">` | 表單左側標籤 | `<label>` |
| `<td>` / `<tr>` / `<table>` | 舊版 table 佈局 | flex / grid 現代佈局 |
| `class="btn-g/btn/btn-r"` | 舊版按鈕樣式 | Tailwind 按鈕 class |

### ⚠️ 簡體→繁體文字轉換

現有模板中可能有簡體中文（源自 Destoon），原型中必須使用**繁體中文台灣用語**：

```
「添加」→「新增」    「删除选中」→「刪除已選」
「搜 索」→「搜尋」    「发布信息」→「發布資訊」
```

### 3. 讀取品牌設定（從 header.htm 動態讀取）

**不要硬編碼品牌色和 CDN！** 從 `mycms/template/default/header.htm` 讀取：

1. 找到 `<style type="text/tailwindcss">` 區塊 → 提取 `@theme` 色彩定義
2. 找到 Tailwind CDN `<script>` 標籤 → 複製到原型
3. 找到 Google Fonts `<link>` 標籤 → 複製到原型
4. 找到 Alpine.js CDN `<script defer>` 標籤 → 複製到原型

將這些完整複製到原型的 `<head>` 中。

### 4. 讀取同模組現有原型（統一設計語言）

```
路徑：mycms/prototype/*.html
用途：確保新原型與已完成原型的視覺風格一致
```

**重點提取：**
- CSS class 命名風格（Tailwind utility classes）
- 品牌色使用方式（`text-brand-*`、`bg-brand-*`）
- 卡片、按鈕、表單的視覺風格

**⚠️ 參考範圍限制**：參考現有原型的**色彩、元件風格、間距**，但**佈局結構**必須根據模板的功能需求獨立判斷。

---

## 設計系統

### TWP 元件庫

**製作原型前必須先搜尋 TWP 元件（不要從零手寫）**：
```
元件庫（按組分拆，優先使用）：D:\web-project\tailwind-plus\twp-html-v4\
索引檔：D:\web-project\tailwind-plus\twp-html-v4\_index.json
搜尋方式：先讀 _index.json 定位元件所在的組檔案，再讀對應的組 JSON 取得元件 HTML
常用搜尋關鍵字：
  - "table" — 列表/表格        - "card" — 卡片
  - "form" — 表單              - "stat" — 統計數字卡片
  - "empty" — 空狀態            - "pagination" — 分頁
  - "filter" — 篩選器           - "tabs" — 分頁標籤
  - "sidebar" — 側欄佈局        - "navbar" — 導航列
```

**使用規則：**
- 找到合適元件後，提取其 `html` 欄位內容，調整 class 以符合品牌色（brand-*）
- 不要照搬整個元件，根據需求裁剪
- TWP 元件是 v4 版本，可直接搭配使用

### 色彩系統（參考，以 header.htm 讀取結果為準）

```
品牌主色：brand 系列
  - 主要按鈕：bg-brand-600 hover:bg-brand-700
  - 文字強調：text-brand-600
  - 輕量背景：bg-brand-50、bg-brand-100

中性色：
  - 頁面背景：bg-gray-50          - 卡片背景：bg-white
  - 邊框：border-gray-200          - 次要文字：text-gray-500
  - 主要文字：text-gray-900
```

---

## 原型設計流程（Rigid — 嚴格按照順序執行）

### Phase 0：設計決策（是否需要調用視覺技能）

在開始分析模板之前，先判斷頁面類型，決定是否需要額外的設計支援：

```
頁面需要設計決策嗎？（新頁面、行銷頁、風格調整、視覺重設計）
  ├─ 是 → 調用 ui-ux-pro-max 產出 design system（色彩、字型、風格建議）
  │        ↓
  │     需要高度視覺衝擊力嗎？（首頁、landing page、品牌頁、活動頁）
  │       ├─ 是 → 調用 frontend-design 的美學原則（大膽佈局、動畫、質感）
  │       └─ 否 → 跳過（功能頁面不需要）
  ├─ 否 → 跳過（改造既有頁面、功能頁面，直接用 TWP 元件組裝）
  ↓
進入 Phase 1
```

#### 何時調用哪個視覺技能

| 頁面類型 | ui-ux-pro-max | frontend-design | 說明 |
|---------|:---:|:---:|------|
| **首頁**（index） | ✓ | ✓ | 門面頁面，需要設計系統 + 視覺衝擊力 |
| **行銷 / 活動頁** | ✓ | ✓ | 需要獨特風格吸引用戶 |
| **品牌 / 關於頁** | ✓ | 視需求 | 建立品牌形象，可能需要特殊佈局 |
| **功能列表頁**（list） | ✗ | ✗ | 結構明確，直接用 TWP 元件 |
| **詳情頁**（show） | ✗ | ✗ | 結構明確，直接用 TWP 元件 |
| **會員中心頁面** | ✗ | ✗ | 後台功能頁，實用優先 |
| **表單頁**（add/edit） | ✗ | ✗ | 表單結構固定，不需要設計 |
| **風格調整 / 全站改版** | ✓ | ✗ | 需要設計建議，不需要大膽美學 |

#### 調用方式

**ui-ux-pro-max**：產出 design system（色彩方案、字型搭配、風格建議），將建議應用到原型的 Tailwind class 中。

**frontend-design**：參考其美學原則（非對稱佈局、漸層質感、動畫微互動、背景效果），**但所有實作仍必須基於 TWP 元件**。如果需要的視覺效果超出 TWP 元件能力，先在 TWP 中找最接近的元件再調整，禁止完全手寫。

⚠️ **重要**：視覺技能的建議必須透過 TWP 元件實現，不能繞過元件庫直接寫裸 HTML。

### Phase 1：分析現有模板（頁面需要什麼）

讀完現有 .htm 模板後，列出：

```
□ 頁面有幾個模式？（list / add / edit / view）
□ 列表卡片的欄位有哪些？（title、price、thumb、status、createtime...）
□ 頁面有哪些統計數字？（$nums[n]、$count、$pages）
□ 有哪些狀態標籤？（審核中、已發布、已過期...）
□ 有哪些操作按鈕？（編輯、刪除、下架、查看...）
□ 表單有哪些欄位？（text、select、textarea、uploader...）
□ {tag()} 呼叫了哪些子模板？
```

### Phase 2：設計假資料

根據模板欄位，設計**真實感的假資料**：

```
□ 標題：用具體的中文內容（「2026款工業機器人零件採購」而非「商品標題1」）
□ 數字：符合業務邏輯（價格 ¥12,800、庫存 500件、瀏覽 1,234次）
□ 狀態：設計 2-3 種不同狀態的卡片（已發布、審核中、已過期）
□ 圖片：優先使用 placehold.co 佔位圖（標明內容類型和尺寸）
□ 時間：用具體日期（2026-03-15），不要用測試感日期
```

### Phase 3：決定呈現的 UI 狀態

原型應包含至少一種狀態（根據頁面性質選擇）：

```
□ 正常有資料狀態（主要展示）
□ 空狀態（no data，引導用戶操作）
□ 多種卡片狀態混合（不同 status 的視覺差異）
□ 分頁或篩選器（如果模板有 $pages 或篩選邏輯）
```

### Phase 4：雙索引搜尋元件（**必做，不可跳過**）

在開始組合頁面前，**必須執行雙索引搜尋**（見上方「🔍 雙索引搜尋」段落），找到最接近需求的元件。站內已轉換元件優先使用。

### Phase 5：組合頁面

每個原型的 `<body>` 第一個元素必須是**架構圖（Architecture Map）**，套版時移除。

```html
<!DOCTYPE html>
<html lang="zh-TW">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>{頁面標題} — MyCMS</title>
  <!-- 從 header.htm 複製的 CDN 和 @theme（見 Step 3） -->
</head>
<body class="bg-gray-50 font-sans">

  <!--[架構圖 — 套版時移除此區塊]-->
  <div id="arch-map" ...>
    <!-- 見下方「架構圖規範」 -->
  </div>

  <!-- Header（簡化版） -->
  <!-- Main Content -->
  <!-- Footer（簡化版） -->
</body>
</html>
```

#### 架構圖規範（每個原型必帶）

架構圖是原型頂部的除錯輔助區塊，用於展示模板結構對應關係，**套版時移除**。

**必要元素：**

| 元素 | 說明 |
|------|------|
| **標題列** | `{module}/{page}.htm — 頁面中文名`，右側附頁面導覽（可切換同模組其他原型） |
| **收合按鈕** | 用 Alpine.js `x-data="{ show: true }"` + `x-show="show"` 控制 |
| **頁面結構藍圖** | 從 `{template 'header'}` 到 `{template 'footer'}` 的完整結構樹 |
| **元件清單** | 底部網格，列出用到的所有 tag、chip、chip/seo 元件 |

**標籤色碼：**

| 標籤 | 背景色 | 文字色 | 用途 |
|------|--------|--------|------|
| `if` | `bg-gray-200` | `text-gray-600` | 條件控制（`$MOD[page_irec]` 等） |
| `tag` | `bg-emerald-100` | `text-emerald-700` | tag 模板（`list-thumb.htm` 等） |
| `chip` | `bg-yellow-100` | `text-yellow-700` | chip 子模板（`catalog.htm` 等） |
| `chip/seo` | `bg-blue-100` | `text-blue-700` | SEO chip（`jsonld.htm` 等） |
| `loop` | `bg-gray-200` | `text-gray-600` | 資料迴圈（`$mainarea` 等） |
| `new` | `bg-brand-100` | `text-brand-700` | 原型新增的區塊（原版模板沒有的） |

**樣式：**
```
外框：border-b-4 border-brand-600 bg-gray-100 py-6 px-4
內容：mx-auto max-w-3xl
頁面框架：border border-gray-300 rounded-lg bg-white
虛線區塊：border border-dashed border-gray-300 rounded-lg p-3
新增區塊：border border-dashed border-brand-400 rounded-lg p-3 bg-brand-50/30
```

### Phase 6：驗證清單

輸出前確認：

```
□ 架構圖（arch-map）在 <body> 第一個元素，包含結構藍圖 + 元件清單
□ CDN 和 @theme 從 header.htm 讀取（非硬編碼）
□ 品牌色使用 brand-* class（不混用 indigo-* 或其他顏色名）
□ 假資料有真實感（繁體中文、合理數字）
□ 使用了 TWP 元件（非全手寫）
□ RWD 響應式：
  - grid-cols-2 → grid-cols-1 sm:grid-cols-2（手機單欄）
  - grid-cols-3 → grid-cols-1 sm:grid-cols-2 lg:grid-cols-3
  - <main> padding → p-4 sm:p-6
  - 含表格的容器用 overflow-x-auto
  - 搜尋/篩選列有 flex-wrap
□ 表單 submit 按鈕有 name="submit"（Destoon PHP 依賴此屬性）
□ Member 內容頁無 <aside>（子導航用水平 pill，不是二級側欄）
```

---

## ⚠️ 響應式設計規範（RWD）

原型**必須**支援三個斷點：

| 斷點 | 寬度 | Tailwind prefix |
|---|---|---|
| Mobile | < 768px | 無 prefix（預設） |
| Tablet | 768px — 1279px | `md:` |
| Desktop | 1280px+ | `lg:` |

**禁止寫法：**
```
❌ class="w-[800px]"           → 寫死寬度
❌ 列表無響應式換欄              → 手機擠在一行
❌ 表格不包 overflow-x-auto    → 手機水平撐破版面
```

---

## 輸出規則

### 儲存路徑

```
mycms/prototype/{page}.html
例如：mycms/prototype/header.html
      mycms/prototype/index.html
      mycms/prototype/member/login.html
```

### 輸出內容

直接輸出完整 HTML 檔案，然後說明：
1. 設計了哪些 UI 狀態
2. 假資料對應的模板欄位
3. 尚未設計的部分（例如 add/edit 表單模式）

---

## 頁面佈局類型

### 全站前台頁面（index、sell/list、company/show 等）

```
無 sidebar，使用全寬佈局：
  - header：全站導航（max-w-7xl mx-auto）
  - 麵包屑導航
  - 主內容區（max-w-7xl mx-auto px-4 sm:px-6 lg:px-8）
  - footer
```

### Member 會員中心頁面

```
sidebar + main 佈局（sidebar 由 header.htm 提供）：
  - header：含 sidebar toggle
  - sidebar：固定左欄（lg: 顯示，手機 drawer）
  - main：右側主內容
注意：內容頁不能有 <aside>，子導航用水平 pill
```

---

## 特殊情況

### 現有模板不存在的頁面

若 `mycms/template/default/` 無對應 .htm，參考 `destoon-20260310/template/default/` 原版模板，並在原型頂部注解：
```html
<!-- [注意] 此頁面參考原版 Destoon 模板，MyCMS 可能有差異，套版時需確認 -->
```

### 有 add/edit 模式的頁面

若模板有 `{if $action=='add' || $action=='edit'}` 區塊，原型也需設計表單版本。
若工程量較大，先完成 list 版本，並在文末說明表單模式待後續設計。
