---
name: xampp-index
description: XAMPP 站台管理 — 開啟站台、關閉站台、更新首頁。當使用者提到 XAMPP、虛擬主機、本地開發站台、vhosts、開啟站台、關閉站台、更新首頁、mkcert、SSL 憑證、.test 網域，或任何與本地 Apache 虛擬主機管理相關的操作時，務必使用此技能。即使使用者只是問「怎麼新增一個本地網站」或「幫我設定一個 .test 網域」，也應觸發此技能。
---

# XAMPP 站台管理

管理 XAMPP 本地開發環境的站台與首頁。支援「開啟站台」與「更新首頁」兩種操作。

## 輸入

$ARGUMENTS

（範例：`開啟站台 opencms`、`更新首頁`、`開啟站台 myproject --domain myproject.test`）

## 環境常數

| 項目 | 值 |
|------|------|
| htdocs 路徑 | `D:/xampp/htdocs` |
| vhosts 設定檔 | `D:/xampp/apache/conf/extra/httpd-vhosts.conf` |
| hosts 檔案 | `C:/Windows/System32/drivers/etc/hosts` |
| SSL 憑證 | `D:/xampp/apache/conf/ssl/cert.pem` |
| SSL 金鑰 | `D:/xampp/apache/conf/ssl/key.pem` |
| 首頁檔案 | `D:/xampp/htdocs/index.html` |

## 操作判斷

根據 `$ARGUMENTS` 判斷要執行的操作：

- 包含「更新首頁」→ 執行 **操作 A：更新首頁**
- 包含「開啟站台」→ 執行 **操作 B：開啟站台**（完成後自動執行操作 A）
- 包含「關閉站台」→ 執行 **操作 C：關閉站台**（完成後自動執行操作 A）

---

## 操作 A：更新首頁

掃描 htdocs 目錄與 vhosts 設定，重新生成 `index.html`。

### Step 1：收集資訊

並行執行：
1. 列出 `D:/xampp/htdocs/` 下的所有**目錄**（排除 `xampp-old`、`.`、`..`）
2. 讀取 `httpd-vhosts.conf` 取得所有已設定的站台（ServerName + DocumentRoot）
3. 讀取 `hosts` 檔案取得所有 `.test` 網域對應

### Step 2：比對綁定狀態

對每個 htdocs 子目錄：
- 若其路徑出現在某個 VirtualHost 的 DocumentRoot 中 → 標記為「已綁定」，記錄對應的 ServerName
- 注意 DocumentRoot 可能指向子目錄（如 `opencms/opencms-v1/public`），這種情況下父目錄 `opencms` 應標記為已綁定

### Step 3：生成 index.html

使用以下模板結構生成完整的 `index.html`，寫入 `D:/xampp/htdocs/index.html`：

**HTML 結構：**

```html
<!DOCTYPE html>
<html lang="zh-TW">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>XAMPP 本地開發環境</title>
    <!-- 使用深色主題，GitHub-inspired 風格 -->
</head>
<body>
    <!-- header: XAMPP 本地開發環境 / 站台管理與專案導覽 -->
    <!-- section: 站台列表 - 已綁定網域的卡片，顯示 domain、path、protocol(HTTPS) -->
    <!-- section: 目錄瀏覽 - 所有目錄的格子，已綁定的顯示藍色圖示+「已綁定」badge -->
    <!-- footer: 由 XAMPP 驅動 + 產生時間 + phpMyAdmin/Dashboard 連結 -->
</body>
</html>
```

**設計規範（保持現有風格）：**
- 背景色 `#0f1117`，卡片 `#161b22`，邊框 `#21262d`
- 連結/強調色 `#58a6ff`，hover 邊框 `#388bfd`
- 已綁定 badge 綠色 `#238636`
- 站台卡片連結一律使用 `https://域名/`
- 目錄瀏覽中已綁定的項目：連結指向 `https://域名/`，未綁定的指向 `http://localhost/目錄名/`
- 產生時間使用當天日期（YYYY-MM-DD）
- count badge 顯示各區塊的數量

完成後告知使用者首頁已更新，列出站台清單摘要。

---

## 操作 B：開啟站台

為 htdocs 下的目錄建立虛擬主機。

### Step 1：解析參數

從 `$ARGUMENTS` 中取得：
- **目錄名稱**：必填，htdocs 下的目錄名（如 `opencms`、`myproject`）
- **網域名稱**：選填，以 `--domain` 指定。預設為 `目錄名.test`（底線保留，不轉換）
- **DocumentRoot 子路徑**：選填，以 `--docroot` 指定（如 `public`、`opencms-v1/public`）。預設為目錄本身

### Step 2：驗證

1. 確認目錄 `D:/xampp/htdocs/{目錄名}` 存在
2. 若有指定 `--docroot`，確認子路徑存在
3. 確認該網域尚未在 vhosts 中設定（避免重複）
4. 若驗證失敗，告知使用者並停止

### Step 3：設定 Apache VirtualHost

在 `httpd-vhosts.conf` 末尾**追加**以下內容：

```apache
# === {域名} ===
<VirtualHost *:80>
    DocumentRoot "D:/xampp/htdocs/{完整docroot路徑}"
    ServerName {域名}
    <Directory "D:/xampp/htdocs/{完整docroot路徑}">
        AllowOverride All
        Require all granted
    </Directory>
</VirtualHost>
<VirtualHost *:443>
    DocumentRoot "D:/xampp/htdocs/{完整docroot路徑}"
    ServerName {域名}
    SSLEngine on
    SSLCertificateFile "D:/xampp/apache/conf/ssl/cert.pem"
    SSLCertificateKeyFile "D:/xampp/apache/conf/ssl/key.pem"
    <Directory "D:/xampp/htdocs/{完整docroot路徑}">
        AllowOverride All
        Require all granted
    </Directory>
</VirtualHost>
```

### Step 4：設定 hosts 檔案

在 `C:/Windows/System32/drivers/etc/hosts` 末尾追加：

```
127.0.0.1  {域名}
```

**注意：** hosts 檔案需要管理員權限。使用以下方式寫入：
```bash
echo "127.0.0.1  {域名}" >> /c/Windows/System32/drivers/etc/hosts
```
若權限不足，提示使用者手動新增或以管理員身份執行。

### Step 5：更新 SSL 憑證

使用 mkcert 重新產生憑證，涵蓋所有已綁定網域（從 vhosts 中取得所有 ServerName）加上新網域：
```bash
mkcert -cert-file D:/xampp/apache/conf/ssl/cert.pem -key-file D:/xampp/apache/conf/ssl/key.pem localhost 127.0.0.1 ::1 {所有已綁定域名} {新域名}
```
mkcert 路徑：`/c/ProgramData/chocolatey/bin/mkcert`，直接執行即可。

### Step 6：自動執行操作 A（更新首頁）

### Step 7：提示重啟 Apache

告知使用者：
- 站台已設定完成
- 需要重啟 Apache 才能生效（XAMPP Control Panel → Apache → Stop → Start）
- HTTPS 網址：`https://{域名}/`

---

## 操作 C：關閉站台

移除虛擬主機設定。

### Step 1：解析參數

從 `$ARGUMENTS` 取得要關閉的網域名稱。

### Step 2：移除 VirtualHost

從 `httpd-vhosts.conf` 中移除對應的 `# === {域名} ===` 區塊（包含 :80 和 :443 兩個 VirtualHost）。

### Step 3：移除 hosts 記錄

從 hosts 檔案中移除對應的 `127.0.0.1  {域名}` 行。

### Step 4：自動執行操作 A（更新首頁）

### Step 5：提示

告知使用者站台已關閉，需重啟 Apache。
