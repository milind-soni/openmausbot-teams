---
name: destoon-prototype
description: "[DEPRECATED] 已棄用，請改用 mycms-prototype。原版 Destoon 原型設計技能。"
metadata:
  author: destoon-project
  version: "1.0"
  deprecated: true
  replacement: mycms-prototype
---

# ⚠️ DEPRECATED — 請改用 `mycms-prototype`

> 此技能已棄用。MyCMS 專案請使用 **`/mycms-prototype`** 技能。
> 新技能改為從專案內讀取模板、原型存放在 `mycmsv1/prototype/`、品牌色從 header.htm 動態讀取。

---

# Destoon 原型設計技能（舊版）

> **核心原則：原型只管外觀，不管 Destoon tag 語法。**
> 原型 = 真實感的靜態 HTML，用假資料呈現頁面長相，供後續套版使用。

---

## 觸發條件

使用者說以下任一類指令時啟用本技能：
- 「做原型」、「設計原型」、「幫我做 xxx 原型」
- 「新增原型頁面」、「建立 prototype」
- 「我需要 xxx 頁面的原型」

---

## 執行前必讀（每次做原型前都要讀）

### 1. 確認輸入資訊

向使用者確認（若尚未提供）：

| 需要確認 | 說明 |
|---|---|
| **頁面名稱** | 例如 `index`、`my_sell`、`login` |
| **所屬模組** | 例如 `member`、`sell`、`buy` |
| **頁面用途** | 例如「會員首頁」、「我的發布列表」 |

### 2. 讀取標籤（了解頁面需要呈現什麼資料）

```
路徑：D:\web-project\my-destoon-tag\00 標籤 Tag\Default\{module}\{page}.htm
      D:\web-project\my-destoon-tag\00 標籤 Tag\Member\{page}.htm（Member 模組獨立目錄）
      D:\web-project\my-destoon-tag\00 標籤 Tag\Install\{page}.tpl.php（安裝頁）
用途：了解頁面有哪些資料欄位、條件分支、列表結構
     原型的假資料要對應標籤的真實欄位名稱
注意：Member 從 Default 獨立出來，因為各自有不同的 header/footer
```

**從標籤提取的資訊用於：**
- 列表卡片有哪些欄位（title、linkurl、thumb、price 等）
- 頁面有哪些模式（add / edit / list）
- 有哪些統計數字（$nums[n]、$count）
- 用戶狀態顯示（$_username、$_groupid）

### ⚠️ dt-tag 舊佈局殘留忽略清單（必讀）

dt-tag 的提取保留了含 Destoon tag 的行，但這些行經常**夾帶舊版佈局 HTML**。
原型設計時**只提取花括號 `{}` 內的 Destoon 變數**，忽略周圍的 HTML 標籤和舊 CSS class。

**必須忽略的舊佈局標籤（不影響原型設計）：**

| dt-tag 殘留 | 實際語義 | 原型應做成 |
|---|---|---|
| `<td class="tab">` / `<td class="tab_on">` | 水平分頁標籤 | 水平 pill 導航 |
| `<td class="ts">` | 提示說明文字 | `<p>` 或 alert 提示區塊 |
| `<td class="tl">` | 表單左側標籤 | `<label>` |
| `<td class="f_gray/f_red/f_blue/f_b">` | 舊 CSS 字體樣式 | Tailwind text-* class |
| `<td>` / `<tr>` / `<table>` | 舊版 table 佈局 | flex / grid 現代佈局 |
| `class="btn-g/btn/btn-r"` | 舊版按鈕樣式 | Tailwind 按鈕 class |
| `class="thumb"` | 舊版縮圖樣式 | Tailwind rounded/border class |
| `class="t"` | 舊版文字連結樣式 | Tailwind text-brand-600 class |

**核心原則**：dt-tag 提供「需要什麼資料」，不提供「怎麼排版」。所有佈局決策由原型獨立完成。

### ⚠️ 簡體→繁體文字轉換

dt-tag 中的固定文字是**簡體中文**（來自 Destoon 預設模板），原型中的假資料和 UI 文字必須使用**繁體中文台灣用語**。

```
dt-tag：「添加」→ 原型：「新增」
dt-tag：「删除选中」→ 原型：「刪除已選」
dt-tag：「搜 索」→ 原型：「搜尋」
dt-tag：「发布信息」→ 原型：「發布資訊」
```

### 3. 讀取同模組現有原型（統一設計語言）

```
路徑：D:\web-project\my-destoon-tag\01 原型 Prototype\{套版名}\{module}\*.html
      例如：D:\web-project\my-destoon-tag\01 原型 Prototype\twp001\member\*.html
用途：確保新原型與同模組頁面的視覺風格一致
```

**重點提取：**
- `<head>` 內的 CDN 連結（完整複製，不要更改）
- sidebar nav 的 HTML 結構和 active 狀態寫法
- header 的 HTML 結構
- CSS class 命名風格（Tailwind utility classes）
- 品牌色使用方式（`text-brand-*`、`bg-brand-*`）

**⚠️ 參考範圍限制**：參考現有原型的**色彩、元件風格、間距**，但**佈局結構**必須根據 dt-tag 的功能需求獨立判斷。不要因為「現有原型用了某種佈局」就照搬——第一個原型的佈局偏差會透過此步驟傳染到後續所有原型。

---

## 設計系統常數（所有模組適用）

### CDN（標準 Tailwind v4，每個原型必須使用）

```html
<script src="https://cdn.jsdelivr.net/npm/@tailwindcss/browser@4"></script>
<link rel="preconnect" href="https://fonts.googleapis.com">
<link href="https://fonts.googleapis.com/css2?family=Noto+Sans+TC:wght@400;500;600;700;900&display=swap" rel="stylesheet">
<link rel="stylesheet" href="https://unpkg.com/aos@2.3.4/dist/aos.css">
<script defer src="https://unpkg.com/alpinejs@3.x.x/dist/cdn.min.js"></script>
<style type="text/tailwindcss">
  @theme {
    --color-brand-50: #eef2ff;
    --color-brand-100: #e0e7ff;
    --color-brand-200: #c7d2fe;
    --color-brand-300: #a5b4fc;
    --color-brand-400: #818cf8;
    --color-brand-500: #6366f1;
    --color-brand-600: #4f46e5;
    --color-brand-700: #4338ca;
    --color-brand-800: #3730a3;
    --color-brand-900: #312e81;
    --color-brand-950: #1e1b4b;
    --font-sans: 'Noto Sans TC', system-ui, sans-serif;
  }
</style>
```

> **注意**：Tailwind v4 使用 `@theme` 定義自訂色彩，不再使用 `tailwind.config`。
> 品牌色使用 `brand-*` class（`bg-brand-600`、`text-brand-600` 等）。

### 色彩系統

```
品牌主色：brand 系列（= indigo hex）
  - 主要按鈕：bg-brand-600 hover:bg-brand-700
  - 文字強調：text-brand-600
  - 側欄 active：border-l-2 border-brand-600 bg-brand-50 text-brand-600
  - 輕量背景：bg-brand-50、bg-brand-100

中性色：
  - 頁面背景：bg-gray-50
  - 卡片背景：bg-white
  - 邊框：border-gray-200
  - 次要文字：text-gray-500
  - 主要文字：text-gray-900
```

### 字體

```css
font-family: 'Noto Sans TC', system-ui, sans-serif;
/* body class: font-sans */
```

### TWP 元件庫

**製作原型前必須先搜尋 TWP 元件（不要從零手寫）**：
```
元件庫（按組分拆）：D:\web-project\tailwind-plus\twp-html-v4\
索引檔：D:\web-project\tailwind-plus\twp-html-v4\_index.json
搜尋方式：用 Grep 工具搜尋元件類型
```

### Member 頁面佈局結構

```html
<body class="bg-gray-50 font-sans">
  <!-- 頂部 header（sticky，h-14） -->
  <header class="sticky top-0 z-50 bg-white border-b border-gray-200 h-14">
    <!-- logo + 右側用戶信息 -->
  </header>

  <div class="flex min-h-screen">
    <!-- 左側 sidebar（固定寬度）— 由 header.htm 提供 -->
    <aside id="member-sidebar" class="w-64 bg-white border-r border-gray-200">
      <!-- nav 列表，active item 有 border-l-2 border-brand-600 bg-brand-50 text-brand-600 -->
    </aside>

    <!-- 右側主內容 -->
    <main class="flex-1 p-6">
      <!-- 頁面內容 -->
    </main>
  </div>
</body>
```

### ⚠️ 禁止雙側欄（Member 模組內容頁）

> **真實失敗案例**：my_sell、trade_* 等 23 個頁面在主側欄旁又加了一個
> `<aside class="w-64">` 二級側欄，造成三欄佈局、內容區被擠壓。
> 原因：dt-tag 中的 `<td class="tab">` 水平分頁標籤被誤判為側欄導航。

**規則：Member 模組的內容頁（非 header/footer）絕對不能有 `<aside>` 元素。**

Member 頁面的側欄**只存在於 header.htm**，內容頁中的子導航必須用**水平 pill 導航**：

```html
<!-- ✅ 正確：水平 pill 子導航（放在 main 區域頂部） -->
<nav class="flex flex-wrap items-center gap-2 mb-6 bg-white rounded-xl shadow-sm px-4 py-3 border border-gray-100">
  <span class="text-xs font-semibold text-gray-400 mr-2">內容管理</span>
  <a href="..." class="px-3 py-1.5 text-sm rounded-lg bg-brand-100 text-brand-700 font-medium">已發布(12)</a>
  <a href="..." class="px-3 py-1.5 text-sm rounded-lg text-gray-600 hover:bg-gray-100">審核中(3)</a>
  <a href="..." class="px-3 py-1.5 text-sm rounded-lg text-gray-600 hover:bg-gray-100">未通過(1)</a>
</nav>

<!-- ❌ 錯誤：在 main 區域內再加一個垂直側欄 -->
<div class="flex">
  <aside class="w-64">...</aside>
  <main>...</main>
</div>
```

**如何判斷**：dt-tag 中若出現 `<td class="tab">` 或 `<td class="tab_on">`，
這些就是**水平分頁標籤**，原型中應設計為水平 pill/tab，不是側欄。

---

## 原型設計流程（Rigid — 嚴格按照順序執行）

### Phase 1：分析 dt-tag（頁面需要什麼）

讀完 dt-tag 後，列出：

```
□ 頁面有幾個模式？（list / add / edit / view）
□ 列表卡片的欄位有哪些？（title、price、thumb、status、createtime...）
□ 頁面有哪些統計數字？（$nums[n]、$count、$pages）
□ 有哪些狀態標籤？（審核中、已發布、已過期...）
□ 有哪些操作按鈕？（編輯、刪除、下架、查看...）
□ 表單有哪些欄位？（text、select、textarea、uploader...）
```

### Phase 2：設計假資料

根據 tagall 欄位，設計**真實感的假資料**：

```
□ 標題：用具體的中文內容，不要用「標題一」「標題二」
   例：「2024款工業機器人零件採購」而非「商品標題1」
□ 數字：用符合業務邏輯的數字
   例：價格 ¥12,800，庫存 500件，瀏覽 1,234次
□ 狀態：設計 2-3 種不同狀態的卡片（已發布、審核中、已過期）
□ 圖片：優先下載來源網站的真實圖檔，存放在原型目錄的 `assets/` 子目錄內
   - 復刻現有網站時：用瀏覽器工具或 WebFetch 下載原站圖片 → 存到 `assets/`
   - 全新設計時（無來源網站）：從免費圖庫下載合適圖片 → 存到 `assets/`
   - 最後手段（無法下載時）：才用 placehold.co 佔位圖
   例：<img src="assets/banner-01.jpg" ...>
   例：<img src="assets/card-product-01.jpg" ...>
□ 時間：用具體日期，不要用「2024-01-01」這種測試感的日期
```

### Phase 3：決定呈現的 UI 狀態

原型應包含以下至少一種狀態（根據頁面性質選擇）：

```
□ 正常有資料狀態（主要展示）
□ 空狀態（no data，引導用戶操作）
□ 多種卡片狀態混合（不同 status 的視覺差異）
□ 分頁或篩選器（如果 tagall 有 $pages 或篩選邏輯）
```

### Phase 4：搜尋 TWP 元件（Tailwind Plus，**必做，不可跳過**）

在開始組合頁面前，**必須先搜尋 TWP**，找到最接近需求的元件，不要從零手寫 HTML：

```
元件庫（按組分拆）：D:\web-project\tailwind-plus\twp-html-v4\
索引檔：D:\web-project\tailwind-plus\twp-html-v4\_index.json
搜尋方式：用 Grep 工具搜尋 "title" 欄位關鍵字
常用搜尋關鍵字：
  - "table" — 列表/表格
  - "card" — 卡片
  - "form" — 表單
  - "stacked" — 堆疊式表單佈局
  - "stat" — 統計數字卡片
  - "empty" — 空狀態
  - "pagination" — 分頁
  - "filter" — 篩選器
  - "tabs" — 分頁標籤
  - "sidebar" — 側欄佈局
  - "navbar" — 導航列
```

**使用規則：**
- 找到合適元件後，提取其 `html` 欄位內容，調整 class 以符合品牌色（brand-*）
- 不要照搬整個元件，根據需求裁剪
- TWP 元件是 v4 版本，可直接搭配使用

### Phase 5：組合頁面

按照以下結構組合：

```html
<!DOCTYPE html>
<html lang="zh-TW">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>{頁面標題} - 會員中心</title>
  <!-- 完整複製現有原型的 CDN 連結 -->
  <style>
    body { font-family: 'Noto Sans TC', sans-serif; }
    /* 其他必要的自訂樣式 */
  </style>
</head>
<body class="bg-gray-50">
  <!-- Header -->
  <!-- Sidebar（member 模組必須有） -->
  <!-- Main Content -->
    <!-- 頁面標題列（含麵包屑或操作按鈕） -->
    <!-- 主要內容區（列表/表單/卡片） -->
    <!-- 分頁（如需要） -->
  <!-- Scripts -->
</body>
</html>
```

### Phase 6：驗證清單

輸出前確認：

```
□ CDN 使用 @tailwindcss/browser@4（不是 cdn.tailwindcss.com）
□ 包含 @theme 自訂 brand 色彩定義
□ 包含 Alpine.js CDN（defer）
□ 品牌色使用 brand-* class（不混用 indigo-* 或其他顏色）
□ 假資料有真實感（中文內容、合理數字）
□ 包含 2-3 種不同狀態的卡片（如有列表）
□ 列表欄位名稱對應 dt-tag 的真實欄位
□ 有空狀態的處理（如有列表）
□ RWD 響應式已按下方規範實作（非全部 Desktop 固定寬度）
□ Sidebar active 狀態標記正確（對應當前頁面的 nav item）
□ 無 console error（特別是 Alpine.js 語法）
□ 使用了 TWP 元件（非全手寫）
□ ⚠️ 含表格的卡片容器用 overflow-x-auto（不是 overflow-hidden）
□ ⚠️ 搜尋/篩選列有 flex-wrap（小螢幕換行）
□ ⚠️ 表單 submit 按鈕有 name="submit"（套版時 Destoon PHP 依賴此屬性）
□ ⚠️ grid-cols-2 → grid-cols-1 sm:grid-cols-2（手機必須單欄）
□ ⚠️ grid-cols-3 → grid-cols-1 sm:grid-cols-2 lg:grid-cols-3
□ ⚠️ col-span-2 → sm:col-span-2（在 grid-cols-1 下裸 col-span-2 會撐出隱式第二欄）
□ ⚠️ <main> padding → p-4 sm:p-6（不要只寫 p-6）
□ ⚠️ Member 內容頁無 <aside> 元素（子導航用水平 pill，不是二級側欄）
□ ⚠️ dt-tag 的 <td class="tab"> 對應水平 pill 導航（不是垂直側欄）
□ ⚠️ 圖片使用本地 assets/ 檔案（非 placehold.co），除非確實無法取得圖片
```

---

## ⚠️ 響應式設計規範（RWD — 必讀）

原型**必須**支援三個斷點，禁止純 Desktop 靜態版：

| 斷點 | 寬度 | Tailwind prefix |
|---|---|---|
| Mobile | 375px — 767px | 無 prefix（預設） |
| Tablet | 768px — 1279px | `md:` |
| Desktop | 1280px+ | `lg:` |

### Member 模組 Sidebar 處理

```html
<!-- Mobile：sidebar 隱藏，頂部 hamburger 按鈕展開 drawer -->
<aside class="fixed inset-y-0 left-0 z-40 w-64 bg-white border-r border-gray-200
              -translate-x-full transition-transform duration-300
              lg:static lg:translate-x-0 lg:flex-shrink-0"
       x-show="sidebarOpen || window.innerWidth >= 1024"
       x-transition>
  <!-- nav 內容 -->
</aside>

<!-- Mobile hamburger（放在 header 左側） -->
<button class="lg:hidden p-2" @click="sidebarOpen = !sidebarOpen">
  <svg class="w-6 h-6" ...><!-- hamburger icon --></svg>
</button>

<!-- Mobile overlay -->
<div class="fixed inset-0 bg-black/30 z-30 lg:hidden" x-show="sidebarOpen"
     @click="sidebarOpen = false"></div>
```

**Alpine.js 初始化（body 或外層 div）：**
```html
<div x-data="{ sidebarOpen: false }">
```

### 卡片列表欄數規則

```
單欄（預設 mobile）→ 雙欄（md:）→ 三欄（lg:）：
class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4"

表格改為 mobile 橫向滾動：
<div class="overflow-x-auto">
  <table class="min-w-full ...">...</table>
</div>
```

### Header Mobile 折疊

```
桌面導航連結（首頁/供應/採購）→ mobile 隱藏：class="hidden md:flex items-center gap-4"
右側用戶工具列精簡：mobile 只顯示鈴鐺和頭像，隱藏文字
```

### 禁止寫法

```
❌ class="w-[800px]"           → 寫死寬度
❌ class="flex gap-4"          → 列表全部單行，無響應式換欄
❌ 省略 lg: prefix 的 sidebar  → Mobile sidebar 永遠顯示擋住內容
❌ 表格不包 overflow-x-auto    → Mobile 水平撐破版面
```

---

## 輸出規則

### 儲存路徑

```
D:\web-project\my-destoon-tag\01 原型 Prototype\{套版名}\{module}\{page}.html
```

### 輸出內容

直接輸出完整 HTML 檔案內容，然後說明：
1. 設計了哪些 UI 狀態
2. 假資料對應的 tagall 欄位
3. 尚未設計的部分（例如 add/edit 表單模式）

---

## 非 Member 模組

若為其他模組（sell、buy、quote 等），調整佈局：

```
Member 模組：sidebar 佈局（左側固定 nav）
其他模組前台頁面：無 sidebar，使用全寬佈局
  - header：含全站導航
  - 麵包屑導航
  - 主內容區（max-w-7xl mx-auto px-4）
  - footer
```

讀取 `prototype/{module}/` 內現有原型確認風格。

---

## 特殊情況

### tagall 不存在的頁面

若 tagall 目錄無對應 .htm，根據頁面名稱推斷資料結構，並在原型頂部注解說明：
```html
<!-- [注意] 此頁面無 tagall 對應，資料欄位為推斷，套版時需手動確認 -->
```

### 有 add/edit 模式的頁面

tagall 若有 `{if $action=='add' || $action=='edit'}` 區塊，原型也需設計表單版本。
若工程量較大，先完成 list 版本，並在文末說明表單模式待後續設計。
