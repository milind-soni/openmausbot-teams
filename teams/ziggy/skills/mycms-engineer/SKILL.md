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
