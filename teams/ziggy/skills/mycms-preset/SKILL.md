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
