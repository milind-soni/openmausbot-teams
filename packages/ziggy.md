---
# Generated from teams/ziggy/bot.md by scripts/build-catalog.mjs. Edit that folder, not this file.
botmrr: 1
id: ziggy
release: 1.0.0
name: Ziggy
tagline: A bot shared from MausBot.
summary: Shared from MausBot. The bot arrives as a new copy with its skills and routines; routines start paused and chat history never travels.
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
agents:
  - key: ziggy
    name: Ziggy
    title: Specialist
    description: ""
    appearance:
      color: blue
      mascotBody: cursor
    skills:
      - destoon-prototype
      - destoon-template-convert
      - find-skills
      - modura-ui
      - mycms-engineer
      - mycms-preset
      - mycms-prototype
      - mycms-template-convert
      - mycms-template-dev
      - openspec-apply-change
      - openspec-archive-change
      - openspec-explore
      - openspec-propose
      - xampp-index
skills:
  version: 1
  entries:
    - name: destoon-prototype
      description: "[DEPRECATED] 已棄用，請改用 mycms-prototype。原版 Destoon 原型設計技能。"
      instructions: |
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
    - name: destoon-template-convert
      description: "[DEPRECATED] 已棄用，請改用 mycms-template-convert。原版 Destoon 模板套版技能。"
      instructions: |
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
    - name: find-skills
      description: Helps users discover and install agent skills when they ask questions like "how do I do X", "find a skill for X", "is there a skill that can...", or express interest in extending capabilities. This skill should be used when the user is looking for functionality that might exist as an installable skill.
      instructions: "---\r

        name: find-skills\r

        description: Helps users discover and install agent skills when they ask questions like \"how do I do X\", \"find a skill for X\", \"is there a skill that can...\", or express interest in extending capabilities. This skill should be used when the user is looking for functionality that might exist as an installable skill.\r

        ---\r

        \r

        # Find Skills\r

        \r

        This skill helps you discover and install skills from the open agent skills ecosystem.\r

        \r

        ## When to Use This Skill\r

        \r

        Use this skill when the user:\r

        \r

        - Asks \"how do I do X\" where X might be a common task with an existing skill\r

        - Says \"find a skill for X\" or \"is there a skill for X\"\r

        - Asks \"can you do X\" where X is a specialized capability\r

        - Expresses interest in extending agent capabilities\r

        - Wants to search for tools, templates, or workflows\r

        - Mentions they wish they had help with a specific domain (design, testing, deployment, etc.)\r

        \r

        ## What is the Skills CLI?\r

        \r

        The Skills CLI (`npx skills`) is the package manager for the open agent skills ecosystem. Skills are modular packages that extend agent capabilities with specialized knowledge, workflows, and tools.\r

        \r

        **Key commands:**\r

        \r

        - `npx skills find [query]` - Search for skills interactively or by keyword\r

        - `npx skills add <package>` - Install a skill from GitHub or other sources\r

        - `npx skills check` - Check for skill updates\r

        - `npx skills update` - Update all installed skills\r

        \r

        **Browse skills at:** https://skills.sh/\r

        \r

        ## How to Help Users Find Skills\r

        \r

        ### Step 1: Understand What They Need\r

        \r

        When a user asks for help with something, identify:\r

        \r

        1. The domain (e.g., React, testing, design, deployment)\r

        2. The specific task (e.g., writing tests, creating animations, reviewing PRs)\r

        3. Whether this is a common enough task that a skill likely exists\r

        \r

        ### Step 2: Search for Skills\r

        \r

        Run the find command with a relevant query:\r

        \r

        ```bash\r

        npx skills find [query]\r

        ```\r

        \r

        For example:\r

        \r

        - User asks \"how do I make my React app faster?\" → `npx skills find react performance`\r

        - User asks \"can you help me with PR reviews?\" → `npx skills find pr review`\r

        - User asks \"I need to create a changelog\" → `npx skills find changelog`\r

        \r

        The command will return results like:\r

        \r

        ```\r

        Install with npx skills add <owner/repo@skill>\r

        \r

        vercel-labs/agent-skills@vercel-react-best-practices\r

        └ https://skills.sh/vercel-labs/agent-skills/vercel-react-best-practices\r

        ```\r

        \r

        ### Step 3: Present Options to the User\r

        \r

        When you find relevant skills, present them to the user with:\r

        \r

        1. The skill name and what it does\r

        2. The install command they can run\r

        3. A link to learn more at skills.sh\r

        \r

        Example response:\r

        \r

        ```\r

        I found a skill that might help! The \"vercel-react-best-practices\" skill provides\r

        React and Next.js performance optimization guidelines from Vercel Engineering.\r

        \r

        To install it:\r

        npx skills add vercel-labs/agent-skills@vercel-react-best-practices\r

        \r

        Learn more: https://skills.sh/vercel-labs/agent-skills/vercel-react-best-practices\r

        ```\r

        \r

        ### Step 4: Offer to Install\r

        \r

        If the user wants to proceed, you can install the skill for them:\r

        \r

        ```bash\r

        npx skills add <owner/repo@skill> -g -y\r

        ```\r

        \r

        The `-g` flag installs globally (user-level) and `-y` skips confirmation prompts.\r

        \r

        ## Common Skill Categories\r

        \r

        When searching, consider these common categories:\r

        \r

        | Category        | Example Queries                          |\r

        | --------------- | ---------------------------------------- |\r

        | Web Development | react, nextjs, typescript, css, tailwind |\r

        | Testing         | testing, jest, playwright, e2e           |\r

        | DevOps          | deploy, docker, kubernetes, ci-cd        |\r

        | Documentation   | docs, readme, changelog, api-docs        |\r

        | Code Quality    | review, lint, refactor, best-practices   |\r

        | Design          | ui, ux, design-system, accessibility     |\r

        | Productivity    | workflow, automation, git                |\r

        \r

        ## Tips for Effective Searches\r

        \r

        1. **Use specific keywords**: \"react testing\" is better than just \"testing\"\r

        2. **Try alternative terms**: If \"deploy\" doesn't work, try \"deployment\" or \"ci-cd\"\r

        3. **Check popular sources**: Many skills come from `vercel-labs/agent-skills` or `ComposioHQ/awesome-claude-skills`\r

        \r

        ## When No Skills Are Found\r

        \r

        If no relevant skills exist:\r

        \r

        1. Acknowledge that no existing skill was found\r

        2. Offer to help with the task directly using your general capabilities\r

        3. Suggest the user could create their own skill with `npx skills init`\r

        \r

        Example:\r

        \r

        ```\r

        I searched for skills related to \"xyz\" but didn't find any matches.\r

        I can still help you with this task directly! Would you like me to proceed?\r

        \r

        If this is something you do often, you could create your own skill:\r

        npx skills init my-xyz-skill\r

        ```\r\n"
    - name: modura-ui
      description: Modura 前台 UI 開發。觸發：做頁面、寫模板、UI 元件、新增元件、前台頁面、套版、blade 模板、建立頁面、修改頁面、元件庫
      instructions: |
        ---
        name: modura-ui
        description: "Modura 前台 UI 開發。觸發：做頁面、寫模板、UI 元件、新增元件、前台頁面、套版、blade 模板、建立頁面、修改頁面、元件庫"
        ---

        # Modura UI 元件庫使用指南

        Modura 有完整的 TWP 元件庫（55 個元件），所有前台頁面必須用元件組裝，禁止裸寫 HTML。

        ## 工作流程

        建立或修改前台頁面時，依序走完以下流程：

        ```
        用戶需求
          ↓
        ① 頁面需要設計決策嗎？（新頁面、行銷頁、風格調整）
          ├─ 是 → 調用 ui-ux-pro-max 產出 design system
          │        ↓
          │     ② 需要高度視覺衝擊力嗎？（landing page、品牌頁）
          │       ├─ 是 → 參考 frontend-design 的美學原則
          │       └─ 否 → 跳過
          ├─ 否 → 跳過（功能頁面如列表、表單，直接用元件組裝）
          ↓
        ③ 用元件庫組裝頁面（本技能的核心）
          ↓
        ④ npm run build + 瀏覽器驗證
        ```

        ### 何時調用哪個技能

        | 場景 | 調用 | 原因 |
        |------|------|------|
        | 新建行銷/品牌頁面（首頁、關於、landing） | `ui-ux-pro-max` → `frontend-design` → 本技能 | 需要設計決策 + 視覺衝擊力 + 元件組裝 |
        | 新建功能頁面（列表、詳細、表單） | 本技能 | 結構明確，直接組裝 |
        | 調整現有頁面風格/配色 | `ui-ux-pro-max` → 本技能 | 需要設計建議，不需要大膽美學 |
        | 新增/修改元件 | 本技能 | 元件入庫流程 |
        | 修 bug / 微調排版 | 本技能 | 直接修改 |

        ### ui-ux-pro-max 調用方式

        產出 design system（色彩、字型、風格建議）：

        ```bash
        python3 skills/ui-ux-pro-max/scripts/search.py "<產品類型> <關鍵字>" --design-system -p "Modura"
        ```

        取得後，將建議的色彩/字型/風格應用到元件的 Tailwind class 中，但**不能繞過元件庫直接寫裸 HTML**。

        ### frontend-design 調用時機

        當頁面需要：
        - 大膽的視覺風格（不是「乾淨整齊」就好）
        - 獨特的佈局構圖（非對稱、重疊、對角線）
        - 動畫和微互動
        - 背景質感（漸層、紋理、模糊效果）

        參考 `frontend-design` 的美學原則，但**實作時必須用元件庫的元件**。如果需要的視覺效果超出元件能力，先擴充元件再組裝，禁止繞過元件庫。

        ## 鐵律

        1. **頁面只能用 `<x-ui-*>` 和 `<x-cms-*>` 元件組裝**，允許的裸 HTML 僅限 `<main>`、`<section>`、`<div class="grid/flex">`
        2. **UI 原件從 TWP 原封不動取用**，禁止精簡、參考後重寫
        3. **CMS 元件只能用 `<x-ui-*>` 組裝**，不出現裸 HTML
        4. **每個元件必須有 `{{--[ metadata ]--}}` 註解**
        5. **設計技能的建議必須透過元件庫實現**，不能繞過元件庫直接寫 HTML

        ## 找元件

        用 Grep 搜尋 `@keywords`：

        ```bash
        grep -r "@keywords.*表單" resources/views/components/ --include="*.blade.php" -l
        ```

        找到檔案後，讀取 metadata 的 `@props` 和 `@usage` 就知道怎麼用。

        ## 用元件

        讀取元件的 metadata 即可：

        ```blade
        {{--[
          @name: 文字輸入框
          @id: ui-input
          @props: name(string,required), label(string), type(string,text), ...
          @usage: <x-ui-input name="email" label="Email" type="email" required />
        ]--}}
        ```

        直接按 `@usage` 的範例使用。

        ## 新增 UI 原件

        當元件庫沒有需要的元件時：

        1. 搜尋 TWP 索引：`d:\web-project\tailwind-plus\twp-html-v4\_index.json`
        2. 讀取對應的元件 JSON，取得完整 HTML
        3. **原封不動**複製 HTML，只替換動態值為 Blade props/slots
        4. 保留所有 Tailwind class（包含 `dark:` 前綴）
        5. 如果 TWP 用了 `el-dropdown` 等自訂元素，轉為 Alpine.js 但保留所有視覺 class
        6. 加上 `{{--[ metadata ]--}}` 註解
        7. 存放至 `resources/views/components/ui-{name}.blade.php`
        8. **動態 class 必須用 map 對應**，不能用字串插值（Tailwind 掃描不到）

        ### Metadata 格式

        ```blade
        {{--[
          @name: 中文名稱
          @id: ui-xxx
          @type: ui
          @keywords: 中文關鍵字,英文keyword,同義詞
          @description: 用途描述
          @props: name(type,default), ...
          @slots: default, footer 或 -
          @twp: Application UI > Forms > Input Groups > Input with label
          @usage: <x-ui-xxx prop="value" />
          @depends: 依賴的元件或 -
        ]--}}
        ```

        ### 動態 class 的正確寫法

        ```php
        // ❌ 錯誤：Tailwind 掃描不到動態 class
        <div class="sm:grid-cols-{{ $cols }}">

        // ✅ 正確：用 map 對應完整 class name
        @php
        $colsMap = ['2' => 'sm:grid-cols-2', '3' => 'sm:grid-cols-3', '4' => 'sm:grid-cols-4'];
        $colsClass = $colsMap[$cols] ?? 'sm:grid-cols-4';
        @endphp
        <div class="{{ $colsClass }}">
        ```

        ## 新增 CMS 業務元件

        1. 只用 `<x-ui-*>` 組裝，禁止裸 HTML
        2. 存放至 `resources/views/components/cms-{name}.blade.php`
        3. `@depends` 填入使用的 UI 原件

        ## 建立新頁面

        ```blade
        @extends('layouts.app')
        @section('title', '頁面標題 - ' . config('app.name'))

        @section('content')
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <x-cms-breadcrumb :items="[...]" />
            <x-ui-page-heading title="頁面標題" />

            {{-- 用元件組裝頁面內容 --}}
            <x-cms-filter-panel :action="route('xxx.index')">
                <x-ui-input name="keyword" placeholder="搜尋..." />
            </x-cms-filter-panel>

            <x-ui-card>
                內容
            </x-ui-card>
        </div>
        @endsection
        ```

        ## 現有元件清單速查

        ### UI 原件（46 個）

        | 分類 | 元件 |
        |------|------|
        | 表單 | ui-input, ui-select, ui-textarea, ui-checkbox, ui-radio, ui-toggle |
        | 按鈕 | ui-button, ui-button-group |
        | 導航 | ui-navbar, ui-footer, ui-breadcrumb, ui-pagination, ui-tabs, ui-steps |
        | 標題 | ui-page-heading, ui-section-heading, ui-card-heading |
        | 展示 | ui-card, ui-badge, ui-avatar, ui-description-list, ui-stat, ui-divider |
        | 列表 | ui-table, ui-stacked-list, ui-grid-list, ui-list-container, ui-feed, ui-media-object |
        | 互動 | ui-modal, ui-dropdown, ui-drawer, ui-carousel, ui-notification |
        | 佈局 | ui-auth-layout, ui-action-panel |
        | 行銷 | ui-hero, ui-feature-section, ui-cta, ui-faq, ui-testimonial, ui-blog-section, ui-contact-section, ui-banner, ui-404 |

        ### CMS 業務元件（9 個）

        | 元件 | 用途 |
        |------|------|
        | cms-icon | 語意化圖標 |
        | cms-breadcrumb | 麵包屑導航 |
        | cms-status-badge | 狀態徽章 |
        | cms-empty-state | 空狀態 |
        | cms-filter-panel | 篩選面板 |
        | cms-contact-card | 聯絡資訊卡 |
        | cms-gallery | 圖片輪播 |
        | cms-stat-group | 統計數字組 |
        | cms-user-card | 使用者/商家卡片 |

        ## 禁止事項

        - **禁止**在模板中裸寫 `<input>`、`<select>`、`<button>`、`<table>`、`<dl>` 等 HTML
        - **禁止**「參考 TWP 後自己重寫精簡版」
        - **禁止**刪除 TWP 的 `dark:` class 或任何視覺 class
        - **禁止**在模板中直接寫 `<iconify-icon>`，必須用 `<x-cms-icon>`
        - **禁止**設計技能的建議繞過元件庫直接實作
    - name: mycms-engineer
      description: MyCMS 總工程師。觸發：模組開發、新增模組、系統開發、系統架構、常數變數、tag 標籤、資料庫結構、class 類別、模組安裝、模組設定、CRUD、前台頁面、後台頁面、API 開發、模板開發、chip 元件、tag 模板、模板規範、metadata 格式、自訂欄位、搜尋功能、URL 路由、slug、安全架構、CSRF、認證、前端技術、UI 設計、多語系、FAQ、第三方整合
      instructions: |
        ---
        name: mycms-engineer
        description: "MyCMS 總工程師。觸發：模組開發、新增模組、系統開發、系統架構、常數變數、tag 標籤、資料庫結構、class 類別、模組安裝、模組設定、CRUD、前台頁面、後台頁面、API 開發、模板開發、chip 元件、tag 模板、模板規範、metadata 格式、自訂欄位、搜尋功能、URL 路由、slug、安全架構、CSRF、認證、前端技術、UI 設計、多語系、FAQ、第三方整合"
        ---

        # MyCMS 總工程師

        本 Skill 是 MyCMS 系統的**總工程師知識庫**，採用按需載入架構。索引常駐記憶體，detail 檔案按需 Read 載入。

        > 設計新頁面外觀 → `/mycms-prototype`（原型）
        > 原型轉正式模板 → `/mycms-template-convert`（套版流程）
        > 其他所有工程事務 → 本 Skill（一站查完）

        **使用方式**：根據使用者需求，比對下方關鍵字標籤，用 Read 工具載入對應的 detail 檔案。detail 檔案路徑為 `C:~/.claude/skills/mycms-engineer/detail/`。

        ---

        ## 速查表（免載入）

        ### 狀態碼
        `0`=回收站 `1`=已駁回 `2`=待審核 `3`=已發布 `4`=排程發布

        ### 推薦等級
        `0`=普通 `1`=推薦 `2`=置頂

        ### DB 快速參考
        ```php
        DB::insert_p($table, $data)              // 參數化插入
        DB::update_p($table, $data, $where)      // 參數化更新
        DB::delete_p($table, $where)             // 參數化刪除
        DB::count_p($table, $cond, $params)      // 參數化計數
        DB::get_all_p($sql, $params)             // 參數化查詢
        $db->query_p($sql, $params)              // 原始參數化查詢
        $db->get_one("SELECT ...")               // 取單筆
        $db->insert_id()                         // 最後插入 ID
        ```

        ### 表名規則
        ```
        {MC_PRE}{module}_{moduleid}              主表      mycms_article_21
        {MC_PRE}{module}_data_{moduleid}         內容表    mycms_article_data_21
        {MC_PRE}category                         分類表    mycms_category
        {MC_PRE}module                           模組表    mycms_module
        {MC_PRE}setting                          設定表    mycms_setting
        {MC_PRE}member                           會員表    mycms_member
        {MC_PRE}tag                              標籤表    mycms_tag
        {MC_PRE}slugs                            Slug 表   mycms_slugs
        {MC_PRE}slug_redirects                   重定向表  mycms_slug_redirects
        {MC_PRE}fields                           自訂欄位  mycms_fields
        ```

        ### 模板輸出語法
        ```
        {$var}              轉義輸出（安全，預設用這個）
        {!$var}             原始輸出（富文本：content, introduce, detail, pages）
        {func(args)}        函式呼叫
        {CONST}             常數輸出（MC_PATH, MC_STATIC, MC_REFRESH...）
        {$L[key]}           語系字串
        {$MOD[key]}         模組設定值 / 自訂參數
        {$fields[name]}     自訂欄位值
        ```

        ### tag() 基本語法
        ```
        {tag("moduleid=21&condition=status=3&pagesize=10&template=list-article")}
        {tag("moduleid=21&catid=$catid&showpage=1&template=list")}
        {php $tags = tag("moduleid=21&condition=status=3&template=null");}
        ```

        ### chip 引用
        ```
        {template 'breadcrumb', 'chip/ui'}
        {template 'jsonld', 'chip/seo'}
        {template 'contact', 'chip'}
        ```

        ### 安全函式
        ```php
        csrf_token()    csrf_field()    csrf_check()
        encrypt($txt)   decrypt($txt)
        secure_encrypt($txt, $key, $ttl)   secure_decrypt($txt, $key)
        ```

        ### QA/FAQ 模式
        `off`=無 `qa`=互動問答(QAPage) `faq`=商家FAQ(FAQPage) `both`=兩者皆有

        ---

        ## 關鍵字標籤索引

        ### 系統目錄結構
        `目錄` `檔案結構` `系統架構` `module目錄` `file目錄` `api目錄` `template目錄` `lang目錄` `static目錄`
        → `detail/01-system-structure.md`
        完整目錄樹 + 每個目錄/檔案的用途說明

        ### 模組開發
        `模組開發` `新增模組` `複製模組` `class` `CRUD` `install` `uninstall` `fields` `資料表` `admin` `menu` `setting` `config` `Phase` `檢查清單` `pass()` `set()` `add()` `edit()` `delete()` `get_one()` `get_list()` `check()` `reject()`
        → `detail/02-module-development.md`
        模組內部結構、開發 Phase 1-5、核心類別方法、資料表 Schema、設定機制、驗證檢查清單

        ### 常數與全域變數
        `常數` `變數` `MC_ROOT` `MC_PATH` `MC_STATIC` `MC_PRE` `MC_TIME` `MC_KEY` `$CFG` `$MC` `$MOD` `$MODULE` `$_userid` `$_groupid` `$MG` `session` `SEO`
        → `detail/03-constants-variables.md`
        系統常數（控制/路徑/環境/版本）、全域變數（設定/請求/Session/裝置/SEO）

        ### 模板標籤系統
        `模板標籤` `tag()` `{if}` `{loop}` `{template}` `{extends}` `{block}` `{php}` `模板語法` `tag參數` `condition` `showpage` `datetype` `template=null`
        → `detail/04-template-tags.md`
        變數輸出、條件/迴圈、模板引入/繼承、PHP 區塊、函式呼叫、常數、tag() 完整參數表與範例

        ### 全域函式與資料庫
        `全域函式` `DB` `資料庫` `快取` `cache` `encrypt` `decrypt` `get_cookie` `set_cookie` `get_user` `get_group` `send_message` `send_mail` `send_sms` `timetodate` `dsubstr` `slug_register` `tag_sync`
        → `detail/05-global-functions.md`
        加密/使用者/URL/標籤/通訊/工具函式 + DB 操作 + 快取系統

        ### 模板開發規範
        `模板規範` `chip` `CSS黑名單` `TWP` `metadata` `chip搜尋` `雙索引` `重複UI` `status_badge` `簡繁轉換` `禁止事項`
        → `detail/06-template-rules.md`
        chip 優先原則、CSS 黑名單、雙索引搜尋、Metadata 格式、URL 處理、抽取規則、禁止事項

        ### 安全架構
        `安全` `CSRF` `CSP` `加密` `AES` `HKDF` `Cookie` `HttpOnly` `SameSite` `安全標頭` `SQL參數化` `insert_p` `update_p` `富文本` `.env` `工具鏈` `Composer` `PHPUnit`
        → `detail/07-security.md`
        六層防護模型、SQL 參數化新 API、加密函式、CSRF 自動注入、Cookie/CSP/標頭、.env 機制、開發工具鏈

        ### 自訂參數與欄位
        `自訂欄位` `自訂參數` `custom fields` `fields` `{$MOD[key]}` `{$fields[name]}` `fields_html` `表單類型` `mycms_fields`
        → `detail/08-custom-fields.md`
        模組參數 vs 自訂欄位雙軌制、11 種表單類型、4 種資料類型、模板存取語法

        ### 搜尋與篩選
        `搜尋` `全文檢索` `FULLTEXT` `ngram` `match_kw` `AJAX篩選` `job=ajax` `多值URL` `篩選元件`
        → `detail/09-search-system.md`
        MySQL ngram 全文檢索、match_kw() 智慧偵測、AJAX 不重載篩選、多值 URL 語法、Alpine.js 篩選元件

        ### URL 路由與 Slug
        `URL` `路由` `slug` `扁平URL` `route.php` `重定向` `301` `mycms_slugs` `build_linkurl` `.htaccess`
        → `detail/10-url-routing.md`
        扁平 URL 架構、mycms_slugs 全域索引、Slug 重定向扁平化、DB/Setting/Cache 三段同步、生產踩坑

        ### 認證系統
        `認證` `登入` `密碼` `bcrypt` `TOTP` `二步驟` `邀請碼` `invite` `ref` `verify_password`
        → `detail/11-auth-system.md`
        雙模式密碼驗證、TOTP 二步驟、邀請碼系統、驗證層次關係

        ### 前端技術棧與 UI
        `前端` `Tailwind` `Alpine` `TWP` `Iconify` `AOS` `CDN` `build` `色彩` `字型` `間距` `卡片` `按鈕` `網格` `動畫`
        → `detail/12-frontend-stack.md`
        技術棧組成、CDN vs Build 模式、互動框架選擇、載入順序、色彩/字型/間距/卡片/按鈕規範

        ### 多語系與 Schema 升級
        `多語系` `i18n` `語系` `MC_LANG` `lang` `Schema升級` `MC_SCHEMA` `upgrade` `migration`
        → `detail/13-i18n-upgrade.md`
        語系路由、新增語系流程、不用 i18n 框架的理由、MC_SCHEMA 版本追蹤、upgrade.php 流程

        ### 問答與 FAQ 系統
        `FAQ` `QA` `問答` `常見問題` `FAQPage` `QAPage` `JSON-LD` `Schema` `faq_module`
        → `detail/14-qa-faq.md`
        3 種 QA/FAQ 模式、Schema 輸出邏輯、FAQ vs QA 差異、JSON-LD 類型對照

        ### 第三方平台整合
        `Facebook` `LINE` `OG` `Open Graph` `Pixel` `Messaging API` `Notify` `Rich Menu` `LIFF` `QR`
        → `detail/15-third-party.md`
        Facebook OG/Pixel、LINE API vs Notify 分工、Rich Menu VIP、LIFF 情境偵測、QR 追蹤

        ### JS 全域函式
        `JavaScript` `JS` `D-function` `Dd()` `Ds()` `Dwidget()` `DOM ID` `條件載入` `全域變數`
        → `detail/16-js-legacy.md`
        D-function 命名與現代替代、必須保留的 DOM ID、全域變數汙染、頁面類型偵測與條件載入

        ---

        ## 症狀排查

        | 症狀 | 可能原因 | 載入 |
        |------|---------|------|
        | 頁面空白（HTTP 200） | `{php}` 與其他標籤同行；模板花括號語法錯誤 | 04 + 06 |
        | 後台設定頁空白 | `require` 而非 `require_once` 載入 env.func.php | 07 |
        | 部署到共享主機後 install 500（CLI 正常、log 空白） | 主機禁用 `putenv()` 等函式，env.func.php 未防呆 | 07 |
        | `FUNCTION xxx.ANY_VALUE does not exist` | 部分 MariaDB build 不認得 `ANY_VALUE()`，改用 `MAX()` | 07 |
        | MariaDB 10+ 上中文全變 `????`（HEX 卻正確） | `db_mysqli.class.php` 用字串比較版本，`"10.x" > "4.1"` 為 false，SET NAMES 被跳過 | 07 |
        | 後台「儲存成功」但設定值不變 | `cache_read` 用 `include`，OPcache 快取 bytecode，需在 `cache_write` 後加 `opcache_invalidate` | 07 |
        | `Table '[pre]xxx' doesn't exist`（install 完成後） | 共享主機 install 跑到一半超時中斷，table.php 的 228 個 CREATE TABLE 沒全建完 | 07 |
        | 廣告卡片載入後一閃就消失（疊在同一座標） | class 名含 `ad-*`/`ads-*` 被 uBlock 過濾，改用 `.listing-*` | 06 |
        | 模板變數顯示 HTML 原始碼 | 富文本欄位漏用 `{!$var}` | 06 + 07 |
        | 搜尋沒結果 | FULLTEXT 索引未建、match_kw 模式設定為 0 | 09 |
        | CSRF 驗證失敗 | 並行請求 regenerate、POST 欄位名 `_` 開頭 | 07 + 11 |
        | Slug URL 404 | DB / setting / cache 三段不同步 | 10 |
        | 新模組後台打不開 | install.inc.php 的 moduleid 未改、menu.inc.php 未更新 | 02 |
        | 自訂欄位不顯示 | 未清除快取、欄位未加入資料表 | 08 |
        | tag() 沒有輸出 | condition 語法錯誤、moduleid 不對、template 檔不存在 | 04 |
        | 前台樣式跑掉 | 使用了 CSS 黑名單中的 class | 06 + 12 |
        | 登入後被踢出 | ban 快取檔未清、Cookie SameSite 設定 | 07 + 11 |
        | JS 功能失效 | 模板改造中修改了必須保留的 DOM ID | 16 |
        | 模組複製後名稱殘留 | 檔案內容未全部替換舊模組名 | 02 |
        | 加密/解密失敗 | 直接用 MC_KEY 而非 HKDF 衍生金鑰 | 07 |

        ---

        ## 常見組合載入

        | 任務 | 載入檔案 |
        |------|---------|
        | 開發新模組（含模板） | 02 + 04 + 06 |
        | 改造既有模板 | 04 + 06 + 12 |
        | 做搜尋/篩選功能 | 09 + 04 |
        | 安全相關修改 | 07 + 11 |
        | URL / SEO 相關 | 10 + 14 |
        | 前端互動開發 | 12 + 16 |
        | 新增自訂欄位 | 08 + 02 |
        | 第三方整合 | 15 + 07 |
        | 多語系 / 系統升級 | 13 + 03 |
        | 除錯（不確定方向） | 先查症狀排查表 |

        ---

        ## 自我更新規則

        本 Skill 是**活的知識庫**，必須在以下情境主動更新：

        | 觸發情境 | 更新方式 |
        |----------|---------|
        | 踩到新坑（頁面空白、編譯錯誤、資料遺失等） | 更新對應 detail 檔 + 症狀排查表 |
        | 搜尋架構流程後找到答案（3+ 次工具呼叫） | 補充到對應 detail 檔 |
        | 發現未記錄的系統慣例 | 補充到對應 detail 檔 |
        | 新增全域函式或常數 | 更新速查表 + 對應 detail 檔 |
        | 新增模組或功能系統 | 新建 detail 檔 + 更新索引 |

        **原則**：查過一次的東西不應該查第二次。

        **detail 檔案格式**：每個檔案頭部有 frontmatter（topic、related、updated），`related` 列出相關檔案供交叉載入參考。
    - name: mycms-preset
      description: Use when the user wants to create a MyCMS site initialization preset for a specific industry or business type. Triggers - 建立預設方案、新增行業方案、preset、初始化方案、建站方案、幫我做 * 的方案
      instructions: |
        ---
        name: mycms-preset
        description: Use when the user wants to create a MyCMS site initialization preset for a specific industry or business type. Triggers - 建立預設方案、新增行業方案、preset、初始化方案、建站方案、幫我做 * 的方案
        ---

        # MyCMS 站台初始化預設方案產生器

        ## Overview

        根據使用者指定的行業/業務類型，產生完整的 MyCMS 站台初始化 JSON 預設方案。

        ## 輸入

        使用者會提供行業名稱，例如：「寵物美容」「牙醫診所」「瑜珈教室」「餐廳」

        ## 產出

        `mycms/file/preset/<行業英文名>.json`

        ## 產出欄位定義

        每個方案 JSON 必須包含以下區塊：

        ### site（網站 SEO）
        | 欄位 | 說明 |
        |------|------|
        | sitename | 留空（安裝時填） |
        | seo_title | `{sitename} — 一句話品牌標語` |
        | seo_keywords | 6-10 個行業相關關鍵字，逗號分隔 |
        | seo_description | 80-150 字的網站描述 |

        ### modules.provider（供應模組）
        | 欄位 | 說明 |
        |------|------|
        | name | 模組顯示名稱（不要用「供應」，用行業術語如「課程」「服務」「商品」） |
        | inquiry_type | 詢價產品資訊欄位，用 `|` 分隔，8-12 個，符合該行業的報價/詢問需求 |
        | inquiry_ask | 詢價快速提問，4 句常見問題，用 `|` 分隔 |
        | type | 分類，用 `|` 分隔，5-10 個該行業的主要服務/產品分類 |

        ### modules.seeker（求購模組）
        | 欄位 | 說明 |
        |------|------|
        | name | 模組顯示名稱（如「找服務」「找課程」「找店家」） |

        ### member（會員/財務）
        | 欄位 | 說明 |
        |------|------|
        | cash_banks | 提領方式，台灣常用：`銀行轉帳|LINE Pay|PayPal` |
        | pay_banks | 支付方式，前綴 `站內|現金|`，再加常用方式 |
        | send_types | 配送/取件方式，依行業調整（服務業通常 `無需物流|到府服務`） |
        | invoice_types | 台灣發票類型：`電子發票（二聯式）|電子發票（三聯式）|紙本發票|免用統一發票` |
        | money_unit | 固定 `新臺幣` |

        ### company（公司設定）
        | 欄位 | 說明 |
        |------|------|
        | com_type | 公司類型，依行業調整 |
        | com_mode | 經營模式，依行業調整 |
        | com_size | 公司規模，小型服務業建議 `1-5人|6-20人|21-50人|50人以上` |

        ## 步驟

        1. 根據使用者提供的行業名稱，決定英文檔名（kebab-case）
        2. 讀取 `mycms/file/preset/_template.json` 和一個現有方案（如 `home-service.json`）作為格式參考
        3. 根據行業特性填寫所有欄位
        4. 寫入 `mycms/file/preset/<英文名>.json`
        5. 執行 `php mycms/file/preset/apply.php` 確認新方案出現在清單中
        6. 問使用者是否要立即套用

        ## 注意事項

        - 所有文字使用**繁體中文台灣用語**
        - `inquiry_type` 和 `inquiry_ask` 要符合該行業的實際詢價/諮詢場景，不要用通用的 B2B 工業用語
        - `type` 分類要具體，不要用「其他」「一般」等模糊分類
        - `send_types` 服務業通常不需要物流，改用「到府服務」「現場取件」等
        - 如果行業偏向實體商品（如寵物用品），才需要完整的物流選項
    - name: mycms-prototype
      description: 建立 MyCMS 頁面原型。觸發：做原型、設計原型、新增原型、prototype、原型頁面、幫我做 * 原型
      instructions: |
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
    - name: mycms-template-convert
      description: 將原型頁面套版為 MyCMS .htm 模板。觸發：套版、新模板、convert template、模板套版、原型轉模板、幫我做 *.htm
      instructions: |
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
    - name: mycms-template-dev
      description: "[DEPRECATED] 已棄用，模板開發規範已合併至 mycms-engineer。觸發：新增 chip、chip 元件、tag 模板、模板規範、metadata 格式、chip 搜尋"
      instructions: |
        ---
        name: mycms-template-dev
        description: "[DEPRECATED] 已棄用，模板開發規範已合併至 mycms-engineer。觸發：新增 chip、chip 元件、tag 模板、模板規範、metadata 格式、chip 搜尋"
        ---

        # [DEPRECATED] MyCMS 模板開發規範

        本 Skill 已棄用，所有模板開發規範已合併至 `mycms-engineer`（第十三章）。

        請改用 `/mycms-engineer`。
    - name: openspec-apply-change
      description: Implement tasks from an OpenSpec change. Use when the user wants to start implementing, continue implementation, or work through tasks.
      instructions: |
        ---
        name: openspec-apply-change
        description: Implement tasks from an OpenSpec change. Use when the user wants to start implementing, continue implementation, or work through tasks.
        license: MIT
        compatibility: Requires openspec CLI.
        metadata:
          author: openspec
          version: "1.0"
          generatedBy: "1.2.0"
        ---

        Implement tasks from an OpenSpec change.

        **Input**: Optionally specify a change name. If omitted, check if it can be inferred from conversation context. If vague or ambiguous you MUST prompt for available changes.

        **Steps**

        1. **Select the change**

           If a name is provided, use it. Otherwise:
           - Infer from conversation context if the user mentioned a change
           - Auto-select if only one active change exists
           - If ambiguous, run `openspec list --json` to get available changes and use the **AskUserQuestion tool** to let the user select

           Always announce: "Using change: <name>" and how to override (e.g., `/opsx:apply <other>`).

        2. **Check status to understand the schema**
           ```bash
           openspec status --change "<name>" --json
           ```
           Parse the JSON to understand:
           - `schemaName`: The workflow being used (e.g., "spec-driven")
           - Which artifact contains the tasks (typically "tasks" for spec-driven, check status for others)

        3. **Get apply instructions**

           ```bash
           openspec instructions apply --change "<name>" --json
           ```

           This returns:
           - Context file paths (varies by schema - could be proposal/specs/design/tasks or spec/tests/implementation/docs)
           - Progress (total, complete, remaining)
           - Task list with status
           - Dynamic instruction based on current state

           **Handle states:**
           - If `state: "blocked"` (missing artifacts): show message, suggest using openspec-continue-change
           - If `state: "all_done"`: congratulate, suggest archive
           - Otherwise: proceed to implementation

        4. **Read context files**

           Read the files listed in `contextFiles` from the apply instructions output.
           The files depend on the schema being used:
           - **spec-driven**: proposal, specs, design, tasks
           - Other schemas: follow the contextFiles from CLI output

        5. **Show current progress**

           Display:
           - Schema being used
           - Progress: "N/M tasks complete"
           - Remaining tasks overview
           - Dynamic instruction from CLI

        6. **Implement tasks (loop until done or blocked)**

           For each pending task:
           - Show which task is being worked on
           - Make the code changes required
           - Keep changes minimal and focused
           - Mark task complete in the tasks file: `- [ ]` → `- [x]`
           - Continue to next task

           **Pause if:**
           - Task is unclear → ask for clarification
           - Implementation reveals a design issue → suggest updating artifacts
           - Error or blocker encountered → report and wait for guidance
           - User interrupts

        7. **On completion or pause, show status**

           Display:
           - Tasks completed this session
           - Overall progress: "N/M tasks complete"
           - If all done: suggest archive
           - If paused: explain why and wait for guidance

        **Output During Implementation**

        ```
        ## Implementing: <change-name> (schema: <schema-name>)

        Working on task 3/7: <task description>
        [...implementation happening...]
        ✓ Task complete

        Working on task 4/7: <task description>
        [...implementation happening...]
        ✓ Task complete
        ```

        **Output On Completion**

        ```
        ## Implementation Complete

        **Change:** <change-name>
        **Schema:** <schema-name>
        **Progress:** 7/7 tasks complete ✓

        ### Completed This Session
        - [x] Task 1
        - [x] Task 2
        ...

        All tasks complete! Ready to archive this change.
        ```

        **Output On Pause (Issue Encountered)**

        ```
        ## Implementation Paused

        **Change:** <change-name>
        **Schema:** <schema-name>
        **Progress:** 4/7 tasks complete

        ### Issue Encountered
        <description of the issue>

        **Options:**
        1. <option 1>
        2. <option 2>
        3. Other approach

        What would you like to do?
        ```

        **Guardrails**
        - Keep going through tasks until done or blocked
        - Always read context files before starting (from the apply instructions output)
        - If task is ambiguous, pause and ask before implementing
        - If implementation reveals issues, pause and suggest artifact updates
        - Keep code changes minimal and scoped to each task
        - Update task checkbox immediately after completing each task
        - Pause on errors, blockers, or unclear requirements - don't guess
        - Use contextFiles from CLI output, don't assume specific file names

        **Fluid Workflow Integration**

        This skill supports the "actions on a change" model:

        - **Can be invoked anytime**: Before all artifacts are done (if tasks exist), after partial implementation, interleaved with other actions
        - **Allows artifact updates**: If implementation reveals design issues, suggest updating artifacts - not phase-locked, work fluidly
    - name: openspec-archive-change
      description: Archive a completed change in the experimental workflow. Use when the user wants to finalize and archive a change after implementation is complete.
      instructions: |
        ---
        name: openspec-archive-change
        description: Archive a completed change in the experimental workflow. Use when the user wants to finalize and archive a change after implementation is complete.
        license: MIT
        compatibility: Requires openspec CLI.
        metadata:
          author: openspec
          version: "1.0"
          generatedBy: "1.2.0"
        ---

        Archive a completed change in the experimental workflow.

        **Input**: Optionally specify a change name. If omitted, check if it can be inferred from conversation context. If vague or ambiguous you MUST prompt for available changes.

        **Steps**

        1. **If no change name provided, prompt for selection**

           Run `openspec list --json` to get available changes. Use the **AskUserQuestion tool** to let the user select.

           Show only active changes (not already archived).
           Include the schema used for each change if available.

           **IMPORTANT**: Do NOT guess or auto-select a change. Always let the user choose.

        2. **Check artifact completion status**

           Run `openspec status --change "<name>" --json` to check artifact completion.

           Parse the JSON to understand:
           - `schemaName`: The workflow being used
           - `artifacts`: List of artifacts with their status (`done` or other)

           **If any artifacts are not `done`:**
           - Display warning listing incomplete artifacts
           - Use **AskUserQuestion tool** to confirm user wants to proceed
           - Proceed if user confirms

        3. **Check task completion status**

           Read the tasks file (typically `tasks.md`) to check for incomplete tasks.

           Count tasks marked with `- [ ]` (incomplete) vs `- [x]` (complete).

           **If incomplete tasks found:**
           - Display warning showing count of incomplete tasks
           - Use **AskUserQuestion tool** to confirm user wants to proceed
           - Proceed if user confirms

           **If no tasks file exists:** Proceed without task-related warning.

        4. **Assess delta spec sync state**

           Check for delta specs at `openspec/changes/<name>/specs/`. If none exist, proceed without sync prompt.

           **If delta specs exist:**
           - Compare each delta spec with its corresponding main spec at `openspec/specs/<capability>/spec.md`
           - Determine what changes would be applied (adds, modifications, removals, renames)
           - Show a combined summary before prompting

           **Prompt options:**
           - If changes needed: "Sync now (recommended)", "Archive without syncing"
           - If already synced: "Archive now", "Sync anyway", "Cancel"

           If user chooses sync, use Task tool (subagent_type: "general-purpose", prompt: "Use Skill tool to invoke openspec-sync-specs for change '<name>'. Delta spec analysis: <include the analyzed delta spec summary>"). Proceed to archive regardless of choice.

        5. **Perform the archive**

           Create the archive directory if it doesn't exist:
           ```bash
           mkdir -p openspec/changes/archive
           ```

           Generate target name using current date: `YYYY-MM-DD-<change-name>`

           **Check if target already exists:**
           - If yes: Fail with error, suggest renaming existing archive or using different date
           - If no: Move the change directory to archive

           ```bash
           mv openspec/changes/<name> openspec/changes/archive/YYYY-MM-DD-<name>
           ```

        6. **Display summary**

           Show archive completion summary including:
           - Change name
           - Schema that was used
           - Archive location
           - Whether specs were synced (if applicable)
           - Note about any warnings (incomplete artifacts/tasks)

        **Output On Success**

        ```
        ## Archive Complete

        **Change:** <change-name>
        **Schema:** <schema-name>
        **Archived to:** openspec/changes/archive/YYYY-MM-DD-<name>/
        **Specs:** ✓ Synced to main specs (or "No delta specs" or "Sync skipped")

        All artifacts complete. All tasks complete.
        ```

        **Guardrails**
        - Always prompt for change selection if not provided
        - Use artifact graph (openspec status --json) for completion checking
        - Don't block archive on warnings - just inform and confirm
        - Preserve .openspec.yaml when moving to archive (it moves with the directory)
        - Show clear summary of what happened
        - If sync is requested, use openspec-sync-specs approach (agent-driven)
        - If delta specs exist, always run the sync assessment and show the combined summary before prompting
    - name: openspec-explore
      description: Enter explore mode - a thinking partner for exploring ideas, investigating problems, and clarifying requirements. Use when the user wants to think through something before or during a change.
      instructions: |
        ---
        name: openspec-explore
        description: Enter explore mode - a thinking partner for exploring ideas, investigating problems, and clarifying requirements. Use when the user wants to think through something before or during a change.
        license: MIT
        compatibility: Requires openspec CLI.
        metadata:
          author: openspec
          version: "1.0"
          generatedBy: "1.2.0"
        ---

        Enter explore mode. Think deeply. Visualize freely. Follow the conversation wherever it goes.

        **IMPORTANT: Explore mode is for thinking, not implementing.** You may read files, search code, and investigate the codebase, but you must NEVER write code or implement features. If the user asks you to implement something, remind them to exit explore mode first and create a change proposal. You MAY create OpenSpec artifacts (proposals, designs, specs) if the user asks—that's capturing thinking, not implementing.

        **This is a stance, not a workflow.** There are no fixed steps, no required sequence, no mandatory outputs. You're a thinking partner helping the user explore.

        ---

        ## The Stance

        - **Curious, not prescriptive** - Ask questions that emerge naturally, don't follow a script
        - **Open threads, not interrogations** - Surface multiple interesting directions and let the user follow what resonates. Don't funnel them through a single path of questions.
        - **Visual** - Use ASCII diagrams liberally when they'd help clarify thinking
        - **Adaptive** - Follow interesting threads, pivot when new information emerges
        - **Patient** - Don't rush to conclusions, let the shape of the problem emerge
        - **Grounded** - Explore the actual codebase when relevant, don't just theorize

        ---

        ## What You Might Do

        Depending on what the user brings, you might:

        **Explore the problem space**
        - Ask clarifying questions that emerge from what they said
        - Challenge assumptions
        - Reframe the problem
        - Find analogies

        **Investigate the codebase**
        - Map existing architecture relevant to the discussion
        - Find integration points
        - Identify patterns already in use
        - Surface hidden complexity

        **Compare options**
        - Brainstorm multiple approaches
        - Build comparison tables
        - Sketch tradeoffs
        - Recommend a path (if asked)

        **Visualize**
        ```
        ┌─────────────────────────────────────────┐
        │     Use ASCII diagrams liberally        │
        ├─────────────────────────────────────────┤
        │                                         │
        │   ┌────────┐         ┌────────┐        │
        │   │ State  │────────▶│ State  │        │
        │   │   A    │         │   B    │        │
        │   └────────┘         └────────┘        │
        │                                         │
        │   System diagrams, state machines,      │
        │   data flows, architecture sketches,    │
        │   dependency graphs, comparison tables  │
        │                                         │
        └─────────────────────────────────────────┘
        ```

        **Surface risks and unknowns**
        - Identify what could go wrong
        - Find gaps in understanding
        - Suggest spikes or investigations

        ---

        ## OpenSpec Awareness

        You have full context of the OpenSpec system. Use it naturally, don't force it.

        ### Check for context

        At the start, quickly check what exists:
        ```bash
        openspec list --json
        ```

        This tells you:
        - If there are active changes
        - Their names, schemas, and status
        - What the user might be working on

        ### When no change exists

        Think freely. When insights crystallize, you might offer:

        - "This feels solid enough to start a change. Want me to create a proposal?"
        - Or keep exploring - no pressure to formalize

        ### When a change exists

        If the user mentions a change or you detect one is relevant:

        1. **Read existing artifacts for context**
           - `openspec/changes/<name>/proposal.md`
           - `openspec/changes/<name>/design.md`
           - `openspec/changes/<name>/tasks.md`
           - etc.

        2. **Reference them naturally in conversation**
           - "Your design mentions using Redis, but we just realized SQLite fits better..."
           - "The proposal scopes this to premium users, but we're now thinking everyone..."

        3. **Offer to capture when decisions are made**

           | Insight Type | Where to Capture |
           |--------------|------------------|
           | New requirement discovered | `specs/<capability>/spec.md` |
           | Requirement changed | `specs/<capability>/spec.md` |
           | Design decision made | `design.md` |
           | Scope changed | `proposal.md` |
           | New work identified | `tasks.md` |
           | Assumption invalidated | Relevant artifact |

           Example offers:
           - "That's a design decision. Capture it in design.md?"
           - "This is a new requirement. Add it to specs?"
           - "This changes scope. Update the proposal?"

        4. **The user decides** - Offer and move on. Don't pressure. Don't auto-capture.

        ---

        ## What You Don't Have To Do

        - Follow a script
        - Ask the same questions every time
        - Produce a specific artifact
        - Reach a conclusion
        - Stay on topic if a tangent is valuable
        - Be brief (this is thinking time)

        ---

        ## Handling Different Entry Points

        **User brings a vague idea:**
        ```
        User: I'm thinking about adding real-time collaboration

        You: Real-time collab is a big space. Let me think about this...

              COLLABORATION SPECTRUM
              ════════════════════════════════════════════

              Awareness          Coordination         Sync
                  │                   │                 │
                  ▼                   ▼                 ▼
              ┌────────┐         ┌────────┐        ┌────────┐
              │Presence│         │Cursors │        │  CRDT  │
              │  "3    │         │ Multi  │        │Conflict│
              │online" │         │ select │        │  free  │
              └────────┘         └────────┘        └────────┘
                  │                   │                 │
               trivial            moderate           complex

              Where's your head at?
        ```

        **User brings a specific problem:**
        ```
        User: The auth system is a mess

        You: [reads codebase]

             ┌─────────────────────────────────────────────┐
             │              CURRENT AUTH FLOW              │
             └─────────────────────────────────────────────┘
                                │
                  ┌─────────────┼─────────────┐
                  ▼             ▼             ▼
             ┌─────────┐  ┌─────────┐  ┌─────────┐
             │ Google  │  │  GitHub │  │  Email  │
             │  OAuth  │  │  OAuth  │  │  Magic  │
             └────┬────┘  └────┬────┘  └────┬────┘
                  │             │             │
                  └─────────────┼─────────────┘
                                ▼
                          ┌───────────┐
                          │  Session  │
                          └─────┬─────┘
                                │
                                ▼
                          ┌───────────┐
                          │   Perms   │
                          └───────────┘

             I see three tangles. Which one's burning?
        ```

        **User is stuck mid-implementation:**
        ```
        User: /opsx:explore add-auth-system
              The OAuth integration is more complex than expected

        You: [reads change artifacts]

             You're on task 4: "Implement OAuth flow"

             Let me trace what's involved...

             [draws diagram, explores options, suggests paths]

             Want to update the design to reflect this?
             Or add a spike task to investigate?
        ```

        **User wants to compare options:**
        ```
        User: Should we use Postgres or SQLite?

        You: Generic answer is boring. What's the context?

        User: A CLI tool that tracks local dev environments

        You: That changes everything.

             ┌─────────────────────────────────────────────────┐
             │         CLI TOOL DATA STORAGE                  │
             └─────────────────────────────────────────────────┘

             Key constraints:
             • No daemon running
             • Must work offline
             • Single user

                          SQLite          Postgres
             Deployment   embedded ✓      needs server ✗
             Offline      yes ✓           no ✗
             Single file  yes ✓           no ✗

             SQLite. Not even close.

             Unless... is there a sync component?
        ```

        ---

        ## Ending Discovery

        There's no required ending. Discovery might:

        - **Flow into a proposal**: "Ready to start? I can create a change proposal."
        - **Result in artifact updates**: "Updated design.md with these decisions"
        - **Just provide clarity**: User has what they need, moves on
        - **Continue later**: "We can pick this up anytime"

        When it feels like things are crystallizing, you might summarize:

        ```
        ## What We Figured Out

        **The problem**: [crystallized understanding]

        **The approach**: [if one emerged]

        **Open questions**: [if any remain]

        **Next steps** (if ready):
        - Create a change proposal
        - Keep exploring: just keep talking
        ```

        But this summary is optional. Sometimes the thinking IS the value.

        ---

        ## Guardrails

        - **Don't implement** - Never write code or implement features. Creating OpenSpec artifacts is fine, writing application code is not.
        - **Don't fake understanding** - If something is unclear, dig deeper
        - **Don't rush** - Discovery is thinking time, not task time
        - **Don't force structure** - Let patterns emerge naturally
        - **Don't auto-capture** - Offer to save insights, don't just do it
        - **Do visualize** - A good diagram is worth many paragraphs
        - **Do explore the codebase** - Ground discussions in reality
        - **Do question assumptions** - Including the user's and your own
    - name: openspec-propose
      description: Propose a new change with all artifacts generated in one step. Use when the user wants to quickly describe what they want to build and get a complete proposal with design, specs, and tasks ready for implementation.
      instructions: |
        ---
        name: openspec-propose
        description: Propose a new change with all artifacts generated in one step. Use when the user wants to quickly describe what they want to build and get a complete proposal with design, specs, and tasks ready for implementation.
        license: MIT
        compatibility: Requires openspec CLI.
        metadata:
          author: openspec
          version: "1.0"
          generatedBy: "1.2.0"
        ---

        Propose a new change - create the change and generate all artifacts in one step.

        I'll create a change with artifacts:
        - proposal.md (what & why)
        - design.md (how)
        - tasks.md (implementation steps)

        When ready to implement, run /opsx:apply

        ---

        **Input**: The user's request should include a change name (kebab-case) OR a description of what they want to build.

        **Steps**

        1. **If no clear input provided, ask what they want to build**

           Use the **AskUserQuestion tool** (open-ended, no preset options) to ask:
           > "What change do you want to work on? Describe what you want to build or fix."

           From their description, derive a kebab-case name (e.g., "add user authentication" → `add-user-auth`).

           **IMPORTANT**: Do NOT proceed without understanding what the user wants to build.

        2. **Create the change directory**
           ```bash
           openspec new change "<name>"
           ```
           This creates a scaffolded change at `openspec/changes/<name>/` with `.openspec.yaml`.

        3. **Get the artifact build order**
           ```bash
           openspec status --change "<name>" --json
           ```
           Parse the JSON to get:
           - `applyRequires`: array of artifact IDs needed before implementation (e.g., `["tasks"]`)
           - `artifacts`: list of all artifacts with their status and dependencies

        4. **Create artifacts in sequence until apply-ready**

           Use the **TodoWrite tool** to track progress through the artifacts.

           Loop through artifacts in dependency order (artifacts with no pending dependencies first):

           a. **For each artifact that is `ready` (dependencies satisfied)**:
              - Get instructions:
                ```bash
                openspec instructions <artifact-id> --change "<name>" --json
                ```
              - The instructions JSON includes:
                - `context`: Project background (constraints for you - do NOT include in output)
                - `rules`: Artifact-specific rules (constraints for you - do NOT include in output)
                - `template`: The structure to use for your output file
                - `instruction`: Schema-specific guidance for this artifact type
                - `outputPath`: Where to write the artifact
                - `dependencies`: Completed artifacts to read for context
              - Read any completed dependency files for context
              - Create the artifact file using `template` as the structure
              - Apply `context` and `rules` as constraints - but do NOT copy them into the file
              - Show brief progress: "Created <artifact-id>"

           b. **Continue until all `applyRequires` artifacts are complete**
              - After creating each artifact, re-run `openspec status --change "<name>" --json`
              - Check if every artifact ID in `applyRequires` has `status: "done"` in the artifacts array
              - Stop when all `applyRequires` artifacts are done

           c. **If an artifact requires user input** (unclear context):
              - Use **AskUserQuestion tool** to clarify
              - Then continue with creation

        5. **Show final status**
           ```bash
           openspec status --change "<name>"
           ```

        **Output**

        After completing all artifacts, summarize:
        - Change name and location
        - List of artifacts created with brief descriptions
        - What's ready: "All artifacts created! Ready for implementation."
        - Prompt: "Run `/opsx:apply` or ask me to implement to start working on the tasks."

        **Artifact Creation Guidelines**

        - Follow the `instruction` field from `openspec instructions` for each artifact type
        - The schema defines what each artifact should contain - follow it
        - Read dependency artifacts for context before creating new ones
        - Use `template` as the structure for your output file - fill in its sections
        - **IMPORTANT**: `context` and `rules` are constraints for YOU, not content for the file
          - Do NOT copy `<context>`, `<rules>`, `<project_context>` blocks into the artifact
          - These guide what you write, but should never appear in the output

        **Guardrails**
        - Create ALL artifacts needed for implementation (as defined by schema's `apply.requires`)
        - Always read dependency artifacts before creating a new one
        - If context is critically unclear, ask the user - but prefer making reasonable decisions to keep momentum
        - If a change with that name already exists, ask if user wants to continue it or create a new one
        - Verify each artifact file exists after writing before proceeding to next
    - name: xampp-index
      description: XAMPP 站台管理 — 開啟站台、關閉站台、更新首頁。當使用者提到 XAMPP、虛擬主機、本地開發站台、vhosts、開啟站台、關閉站台、更新首頁、mkcert、SSL 憑證、.test 網域，或任何與本地 Apache 虛擬主機管理相關的操作時，務必使用此技能。即使使用者只是問「怎麼新增一個本地網站」或「幫我設定一個 .test 網域」，也應觸發此技能。
      instructions: "---\r

        name: xampp-index\r

        description: XAMPP 站台管理 — 開啟站台、關閉站台、更新首頁。當使用者提到 XAMPP、虛擬主機、本地開發站台、vhosts、開啟站台、關閉站台、更新首頁、mkcert、SSL 憑證、.test 網域，或任何與本地 Apache 虛擬主機管理相關的操作時，務必使用此技能。即使使用者只是問「怎麼新增一個本地網站」或「幫我設定一個 .test 網域」，也應觸發此技能。\r

        ---\r

        \r

        # XAMPP 站台管理\r

        \r

        管理 XAMPP 本地開發環境的站台與首頁。支援「開啟站台」與「更新首頁」兩種操作。\r

        \r

        ## 輸入\r

        \r

        $ARGUMENTS\r

        \r

        （範例：`開啟站台 opencms`、`更新首頁`、`開啟站台 myproject --domain myproject.test`）\r

        \r

        ## 環境常數\r

        \r

        | 項目 | 值 |\r

        |------|------|\r

        | htdocs 路徑 | `D:/xampp/htdocs` |\r

        | vhosts 設定檔 | `D:/xampp/apache/conf/extra/httpd-vhosts.conf` |\r

        | hosts 檔案 | `C:/Windows/System32/drivers/etc/hosts` |\r

        | SSL 憑證 | `D:/xampp/apache/conf/ssl/cert.pem` |\r

        | SSL 金鑰 | `D:/xampp/apache/conf/ssl/key.pem` |\r

        | 首頁檔案 | `D:/xampp/htdocs/index.html` |\r

        \r

        ## 操作判斷\r

        \r

        根據 `$ARGUMENTS` 判斷要執行的操作：\r

        \r

        - 包含「更新首頁」→ 執行 **操作 A：更新首頁**\r

        - 包含「開啟站台」→ 執行 **操作 B：開啟站台**（完成後自動執行操作 A）\r

        - 包含「關閉站台」→ 執行 **操作 C：關閉站台**（完成後自動執行操作 A）\r

        \r

        ---\r

        \r

        ## 操作 A：更新首頁\r

        \r

        掃描 htdocs 目錄與 vhosts 設定，重新生成 `index.html`。\r

        \r

        ### Step 1：收集資訊\r

        \r

        並行執行：\r

        1. 列出 `D:/xampp/htdocs/` 下的所有**目錄**（排除 `xampp-old`、`.`、`..`）\r

        2. 讀取 `httpd-vhosts.conf` 取得所有已設定的站台（ServerName + DocumentRoot）\r

        3. 讀取 `hosts` 檔案取得所有 `.test` 網域對應\r

        \r

        ### Step 2：比對綁定狀態\r

        \r

        對每個 htdocs 子目錄：\r

        - 若其路徑出現在某個 VirtualHost 的 DocumentRoot 中 → 標記為「已綁定」，記錄對應的 ServerName\r

        - 注意 DocumentRoot 可能指向子目錄（如 `opencms/opencms-v1/public`），這種情況下父目錄 `opencms` 應標記為已綁定\r

        \r

        ### Step 3：生成 index.html\r

        \r

        使用以下模板結構生成完整的 `index.html`，寫入 `D:/xampp/htdocs/index.html`：\r

        \r

        **HTML 結構：**\r

        \r

        ```html\r

        <!DOCTYPE html>\r

        <html lang=\"zh-TW\">\r

        <head>\r

        \    <meta charset=\"UTF-8\">\r

        \    <meta name=\"viewport\" content=\"width=device-width, initial-scale=1.0\">\r

        \    <title>XAMPP 本地開發環境</title>\r

        \    <!-- 使用深色主題，GitHub-inspired 風格 -->\r

        </head>\r

        <body>\r

        \    <!-- header: XAMPP 本地開發環境 / 站台管理與專案導覽 -->\r

        \    <!-- section: 站台列表 - 已綁定網域的卡片，顯示 domain、path、protocol(HTTPS) -->\r

        \    <!-- section: 目錄瀏覽 - 所有目錄的格子，已綁定的顯示藍色圖示+「已綁定」badge -->\r

        \    <!-- footer: 由 XAMPP 驅動 + 產生時間 + phpMyAdmin/Dashboard 連結 -->\r

        </body>\r

        </html>\r

        ```\r

        \r

        **設計規範（保持現有風格）：**\r

        - 背景色 `#0f1117`，卡片 `#161b22`，邊框 `#21262d`\r

        - 連結/強調色 `#58a6ff`，hover 邊框 `#388bfd`\r

        - 已綁定 badge 綠色 `#238636`\r

        - 站台卡片連結一律使用 `https://域名/`\r

        - 目錄瀏覽中已綁定的項目：連結指向 `https://域名/`，未綁定的指向 `http://localhost/目錄名/`\r

        - 產生時間使用當天日期（YYYY-MM-DD）\r

        - count badge 顯示各區塊的數量\r

        \r

        完成後告知使用者首頁已更新，列出站台清單摘要。\r

        \r

        ---\r

        \r

        ## 操作 B：開啟站台\r

        \r

        為 htdocs 下的目錄建立虛擬主機。\r

        \r

        ### Step 1：解析參數\r

        \r

        從 `$ARGUMENTS` 中取得：\r

        - **目錄名稱**：必填，htdocs 下的目錄名（如 `opencms`、`myproject`）\r

        - **網域名稱**：選填，以 `--domain` 指定。預設為 `目錄名.test`（底線保留，不轉換）\r

        - **DocumentRoot 子路徑**：選填，以 `--docroot` 指定（如 `public`、`opencms-v1/public`）。預設為目錄本身\r

        \r

        ### Step 2：驗證\r

        \r

        1. 確認目錄 `D:/xampp/htdocs/{目錄名}` 存在\r

        2. 若有指定 `--docroot`，確認子路徑存在\r

        3. 確認該網域尚未在 vhosts 中設定（避免重複）\r

        4. 若驗證失敗，告知使用者並停止\r

        \r

        ### Step 3：設定 Apache VirtualHost\r

        \r

        在 `httpd-vhosts.conf` 末尾**追加**以下內容：\r

        \r

        ```apache\r

        # === {域名} ===\r

        <VirtualHost *:80>\r

        \    DocumentRoot \"D:/xampp/htdocs/{完整docroot路徑}\"\r

        \    ServerName {域名}\r

        \    <Directory \"D:/xampp/htdocs/{完整docroot路徑}\">\r

        \        AllowOverride All\r

        \        Require all granted\r

        \    </Directory>\r

        </VirtualHost>\r

        <VirtualHost *:443>\r

        \    DocumentRoot \"D:/xampp/htdocs/{完整docroot路徑}\"\r

        \    ServerName {域名}\r

        \    SSLEngine on\r

        \    SSLCertificateFile \"D:/xampp/apache/conf/ssl/cert.pem\"\r

        \    SSLCertificateKeyFile \"D:/xampp/apache/conf/ssl/key.pem\"\r

        \    <Directory \"D:/xampp/htdocs/{完整docroot路徑}\">\r

        \        AllowOverride All\r

        \        Require all granted\r

        \    </Directory>\r

        </VirtualHost>\r

        ```\r

        \r

        ### Step 4：設定 hosts 檔案\r

        \r

        在 `C:/Windows/System32/drivers/etc/hosts` 末尾追加：\r

        \r

        ```\r

        127.0.0.1  {域名}\r

        ```\r

        \r

        **注意：** hosts 檔案需要管理員權限。使用以下方式寫入：\r

        ```bash\r

        echo \"127.0.0.1  {域名}\" >> /c/Windows/System32/drivers/etc/hosts\r

        ```\r

        若權限不足，提示使用者手動新增或以管理員身份執行。\r

        \r

        ### Step 5：更新 SSL 憑證\r

        \r

        使用 mkcert 重新產生憑證，涵蓋所有已綁定網域（從 vhosts 中取得所有 ServerName）加上新網域：\r

        ```bash\r

        mkcert -cert-file D:/xampp/apache/conf/ssl/cert.pem -key-file D:/xampp/apache/conf/ssl/key.pem localhost 127.0.0.1 ::1 {所有已綁定域名} {新域名}\r

        ```\r

        mkcert 路徑：`/c/ProgramData/chocolatey/bin/mkcert`，直接執行即可。\r

        \r

        ### Step 6：自動執行操作 A（更新首頁）\r

        \r

        ### Step 7：提示重啟 Apache\r

        \r

        告知使用者：\r

        - 站台已設定完成\r

        - 需要重啟 Apache 才能生效（XAMPP Control Panel → Apache → Stop → Start）\r

        - HTTPS 網址：`https://{域名}/`\r

        \r

        ---\r

        \r

        ## 操作 C：關閉站台\r

        \r

        移除虛擬主機設定。\r

        \r

        ### Step 1：解析參數\r

        \r

        從 `$ARGUMENTS` 取得要關閉的網域名稱。\r

        \r

        ### Step 2：移除 VirtualHost\r

        \r

        從 `httpd-vhosts.conf` 中移除對應的 `# === {域名} ===` 區塊（包含 :80 和 :443 兩個 VirtualHost）。\r

        \r

        ### Step 3：移除 hosts 記錄\r

        \r

        從 hosts 檔案中移除對應的 `127.0.0.1  {域名}` 行。\r

        \r

        ### Step 4：自動執行操作 A（更新首頁）\r

        \r

        ### Step 5：提示\r

        \r

        告知使用者站台已關閉，需重啟 Apache。\r\n"
---

# Ziggy

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

### Ziggy

Skills: destoon-prototype, destoon-template-convert, find-skills, modura-ui, mycms-engineer, mycms-preset, mycms-prototype, mycms-template-convert, mycms-template-dev, openspec-apply-change, openspec-archive-change, openspec-explore, openspec-propose, xampp-index

## Chief of Staff

None.

## Routines

None.

## Completion rule

Nothing here holds chats, memory, keys or passwords. Routines arrive paused, and each app is connected with the person's own account.
