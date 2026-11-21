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
