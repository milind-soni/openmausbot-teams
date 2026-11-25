---
name: wordpress-fleet-management
description: Quản trị, kiểm toán và bảo mật hệ thống website WordPress.
---

# Quy Trình Quản Trị & Kiểm Toán Hệ Thống Website WordPress

Kỹ năng này chuẩn hóa quy trình rà soát, kiểm toán kỹ thuật, bảo mật, tối ưu hóa và xử lý sự cố cho hệ sinh thái website WordPress doanh nghiệp. Kỹ năng không bao gồm việc trực tiếp chỉnh sửa mã nguồn nghiệp vụ hoặc thay đổi giao diện front-end mà không có phê duyệt staging.

## When to Use
- Khi tiếp nhận bàn giao, kiểm tra hoặc đánh giá hiện trạng một website WordPress mới ("kiểm tra và đánh giá tình hình", "audit website").
- Khi thực hiện bảo trì định kỳ, cập nhật core/theme/plugin hoặc kiểm toán bảo mật và hiệu năng định kỳ.
- Khi kiểm tra rác, phân tích và tối ưu hóa dung lượng lưu trữ hosting và cơ sở dữ liệu ("kiểm tra phần hosting xem rác có nhiều ko", "dọn dẹp dung lượng hosting").
- Khi phát hiện cảnh báo mã độc, nghẽn tài nguyên bộ nhớ hoặc sự cố xung đột giao diện/plugin.
- Khi thiết lập cơ chế cảnh báo tự động, giám sát sức khỏe VPS/hosting hoặc kết nối kênh thông báo sự cố qua Telegram/Webhook ("có hỗ trợ cảnh báo ko", "kết nối trực tiếp để có sự cố còn biết xử lý").

## Procedure

### 1. Quy Trình Kiểm Toán & Đánh Giá Hiện Trạng Website (Site Audit)
1. **Phân công & Điều phối Kỹ thuật (Delegation)**: Ngay khi tiếp nhận thông tin bàn giao website và hạ tầng máy chủ, Trưởng phòng IT phân bổ và giao việc ngay cho các chuyên viên chuyên trách (`@WordPress Webmaster` rà soát website/plugin/theme; `@Security Specialist` kiểm toán an ninh hosting/server) thay vì tự kiểm tra và xử lý độc lập toàn bộ.
2. **Rà soát Core & Cập nhật**: Truy cập `/wp-admin/update-core.php`. Xác định phiên bản WordPress Core hiện tại, số bản cập nhật phụ bị trễ và trạng thái bật/tắt tự động cập nhật.
3. **Kiểm tra Môi trường Máy chủ & Site Health**: Truy cập `/wp-admin/site-health.php?tab=debug`. Kiểm tra web server (LiteSpeed/Nginx/Apache), phiên bản PHP, OPcache, `WP_MEMORY_LIMIT`, và giới hạn upload/post size.
4. **Kiểm toán Giao diện & Bản quyền Theme**: Truy cập `/wp-admin/themes.php`. Kiểm tra trạng thái license key, thời hạn ân hạn (grace period) của theme thương mại và đảm bảo có sẵn theme mặc định (Twenty Twenty-Four/Twenty Twenty-Three) làm fallback.
5. **Rà soát Plugin & Lỗ hổng An ninh**: Truy cập `/wp-admin/plugins.php`. Lập danh sách plugin chưa cập nhật (đặc biệt các plugin xử lý file/SVG như Safe SVG), plugin bị bỏ hoang, plugin chưa kích hoạt license và plugin bảo mật.
6. **Kiểm tra Tình trạng Scanner & Tường lửa (Wordfence/WAF)**: Truy cập trang quản trị scanner (`/wp-admin/admin.php?page=Wordfence` và `WordfenceScan`). Kiểm tra nhật ký brute force, các file/path bị bỏ qua quét và phát hiện tiến trình quét nền bị treo (hơn 3 giờ).

### 2. Gia Cố Bảo Mật Website (WordPress Hardening)
- **Bảo vệ Cổng Quản Trị & Đăng Nhập**:
  - Đổi đường dẫn đăng nhập mặc định (`/wp-admin`, `/wp-login.php`) sang URL riêng biệt.
  - Bắt buộc xác thực 2 lớp (2FA) cho toàn bộ tài khoản cấp Administrator và Editor.
  - Giới hạn số lần đăng nhập sai (Limit Login Attempts) và chặn Brute Force bằng reCAPTCHA v3 / Cloudflare Turnstile.
  - Vô hiệu hóa tính năng `XML-RPC` và ẩn thông tin phiên bản WordPress trong mã nguồn.
- **Tường Lửa Ứng Dụng Web (WAF) & Quét Mã Độc**:
  - Triển khai Cloudflare WAF phía trước (bật DDoS protection, Bot Fight Mode, Rate Limiting).
  - Cài đặt plugin bảo mật chuyên sâu (Wordfence hoặc iThemes Security) ở chế độ chặn thời gian thực.
  - Thiết lập phân quyền file chuẩn (Files: 644, Folders: 755, `wp-config.php`: 400 hoặc 440) và vô hiệu hóa chức năng File Editing trực tiếp trong Dashboard (`DISALLOW_FILE_EDIT`).

### 3. Quy Trình Cập Nhật An Toàn (Safe Staging & Updates)
1. **Kết nối hạ tầng Hosting/Server**: Tiếp nhận thông tin portal nhà cung cấp hosting, đăng nhập SSO vào bảng điều khiển (cPanel/DirectAdmin/CloudPanel/aaPanel), kiểm tra công cụ sao lưu (JetBackup 5 / cPanel Backup) và phiên bản PHP (PHP Selector) để sẵn sàng rollback nếu phát sinh lỗi trắng trang (WSOD).
2. **Tạo Full Backup cấp máy chủ**: Xuất và tải bản sao lưu toàn diện gồm mã nguồn (`public_html`) và cơ sở dữ liệu (`.sql.gz`) lưu trữ an toàn trước khi thao tác nâng cấp.
3. Đồng bộ mã nguồn sang môi trường Staging/Testing.
4. Cập nhật và kiểm tra tính tương thích, giao diện, form liên hệ và luồng thanh toán (nếu có WooCommerce).
5. Triển khai lên Production trong khung giờ thấp điểm (off-peak hours) và giám sát trạng thái 15 phút sau cập nhật.

### 4. Kiểm Toán Rác & Quản Trị Dung Lượng Hosting (Disk & Database Cleanup)
1. **Kiểm tra Hạn ngạch & Phân bổ Dung lượng cPanel (Disk Usage)**: Truy cập công cụ Disk Usage (`/frontend/jupiter/diskusage/index.html`) và MySQL Management (`/frontend/jupiter/sql/index.html`). Đối soát dung lượng sử dụng thực tế với quota gói hosting; cảnh báo đỏ tức thì nếu dung lượng chạm mốc kịch trần (>= 95-100%).
2. **Rà soát & Dọn dẹp Rác Mã nguồn (Source Code Cleanup)**:
   - Quét và xóa các file `error_log` tại `public_html` và các thư mục con khi dung lượng phình to (tích tụ log lỗi PHP lâu ngày).
   - Kiểm tra và dọn sạch thư mục thùng rác ẩn `/.trash` trong tài khoản hosting.
   - Rà soát các file backup cũ (`.bk`, `.zip`, `.tar.gz`) và các thư mục landing page/sub-site nằm lẫn trong `public_html` gây chiếm dụng dung lượng và trùng lặp tài nguyên đa phương tiện.
   - Dọn dẹp thư mục sao lưu cục bộ (`wp-content/updraft/`): Sau khi bản sao lưu qua UpdraftPlus đã hoàn tất đồng bộ 100% lên Google Drive hoặc Cloud Storage độc lập, xóa các tệp nén sao lưu cục bộ trên hosting để thu hồi tức thì dung lượng đĩa.
   - Quét thư mục `wp-content/uploads` để loại bỏ các kích thước ảnh thumbnail thừa không còn sử dụng bằng công cụ chuyên dụng; tuyệt đối giữ nguyên file gốc và cấu trúc URL để bảo toàn link ảnh trong bài viết.
3. **Rà soát & Dọn dẹp Rác Cơ sở Dữ liệu (Database Junk Audit)**:
   - Thống kê dung lượng từng database trên cPanel.
   - Dọn sạch các bản ghi dữ liệu tạm (transients cache), lịch sử bản nháp bài viết (post revisions), log thống kê truy cập cũ và các bảng dữ liệu thừa do plugin đã gỡ bỏ để lại.

### 5. Tối Ưu Hiệu Năng & Tài Nguyên (Performance & Caching)
- **Tầng Caching & Database**:
  - Tối ưu Caching cấp máy chủ (LiteSpeed Cache hoặc Nginx FastCGI Cache + Redis Object Cache).
  - Bật OPcache trên máy chủ PHP để giảm thời gian biên dịch script.
  - Tối ưu hóa Database định kỳ: Dọn dẹp revisions, transient options, spam comments và tối ưu bảng dữ liệu MySQL.
- **Tối ưu Tài nguyên Giao diện**:
  - Nâng `WP_MEMORY_LIMIT` trong `wp-config.php` lên tối thiểu 256M để tránh lỗi cạn bộ nhớ ở frontend.
  - Chuyển đổi định dạng ảnh sang WebP/AVIF và bật nén ảnh tự động; thiết lập Lazy Loading cho media.
  - Minify và gộp CSS/JavaScript, trì hoãn tải JavaScript không thiết yếu (Defer/Async JS).
  - Tích hợp CDN (Cloudflare) để phân phối static assets toàn cầu với độ trễ thấp.

### 6. Sao Lưu Định Kỳ & Giám Sát Uptime (Backup & Monitoring)
- Thiết lập sao lưu tự động hàng ngày (Database hàng ngày, Full files hàng tuần), lưu trữ trực tiếp lên Cloud Storage độc lập (Google Drive, AWS S3 hoặc Wasabi).
- Khi liên kết UpdraftPlus với Google Drive: Đảm bảo hoàn tất xác thực tài khoản Google, kích hoạt đồng bộ đám mây và chỉ thực hiện dọn dẹp các tệp lưu trữ tạm ở thư mục `/wp-content/updraft/` sau khi tiến trình upload lên Google Drive đạt 100%.
- Giám sát thời gian thực (Uptime Monitor với chu kỳ 1 phút, kiểm tra SSL expiry, cảnh báo tức thời qua Telegram/Slack khi phát sinh lỗi 5xx hoặc downtime).
- **Cơ chế Cảnh báo & Ứng cứu Khép kín Cấp Máy chủ (Server Alerting & Incident Response)**:
  - Cấu hình Notification module trên bảng điều khiển hosting/aaPanel kết nối trực tiếp qua Telegram Bot hoặc Webhook đẩy về nhóm kỹ thuật vận hành.
  - Thiết lập ngưỡng kích hoạt cảnh báo khẩn: Tài nguyên chạm trần (CPU > 90%, RAM > 90%, Ổ đĩa > 85%), dịch vụ cốt lõi dừng đột ngột (Nginx, MySQL, PHP-FPM, SSH), cảnh báo tấn công dò quét (Fail2Ban chặn IP hàng loạt) và chứng chỉ SSL sắp hết hạn (trước 30 ngày).
  - Quy trình ứng cứu khép kín: Khi bot tiếp nhận thông báo sự cố qua Telegram/Webhook, Trưởng phòng IT và chuyên viên chuyên trách (`@Security Specialist`, `@WordPress Webmaster`) chủ động truy cập máy chủ để kiểm tra tiến trình nghẽn, phục hồi dịch vụ sập hoặc dọn dẹp đĩa tràn và báo cáo tức thời kết quả khắc phục.

## Pitfalls
- Không tự làm kỹ thuật độc lập khi có nhân sự chuyên trách: Khi tiếp nhận hạ tầng hoặc website mới, phải phân công ngay cho các chuyên viên chuyên trách (`@WordPress Webmaster` xử lý website/plugin/theme, `@Security Specialist` xử lý bảo mật máy chủ/hosting) cùng phối hợp thực hiện thay vì Trưởng phòng IT tự kiểm tra và thao tác đơn lẻ.
- Bắt buộc phải chờ bản backup hoàn tất 100% lên Cloud Storage trước khi xử lý các hạng mục rủi ro hoặc can thiệp dọn dẹp sâu: Nếu chưa hoàn tất sao lưu lên Google Drive/S3, hệ thống sẽ thiếu chốt an toàn phục hồi (Rollback point), dẫn đến nguy cơ mất dữ liệu vĩnh viễn khi xảy ra lỗi phát sinh.
- Không tự ý xóa file media gốc hoặc thay đổi đường dẫn thư mục `wp-content/uploads` khi dọn rác dung lượng: Thao tác can thiệp thô bạo vào thư mục uploads sẽ làm đứt gãy đường dẫn (gây lỗi 404/mất ảnh) trong các bài viết đã xuất bản; chỉ dọn dẹp các ảnh thumbnail thừa thông qua công cụ chuyên dụng và luôn đối soát liên kết trong bài viết.
- Khi gặp lỗi 'Safety entrance error! Ingress verification failed' trên aaPanel: Không tiếp tục gửi request đăng nhập qua web vì sẽ bị tường lửa khóa IP; cần truy cập SSH root vào máy chủ và chạy lệnh `bt 14` để lấy chính xác đường dẫn lối vào an toàn (Safe entrance path) và thông tin đăng nhập.
- Không đổi cổng quản trị hosting/aaPanel hoặc siết tường lửa mà chưa kiểm tra độ thông suốt của cổng mới từ bên ngoài: Trước khi đóng cổng cũ hoặc kích hoạt tường lửa, bắt buộc phải dùng công cụ kiểm tra cổng (`nc -zv <host> <port>` hoặc `curl`) để xác nhận cổng mới đã mở và dịch vụ phản hồi, tránh tình trạng bị ngắt kết nối và khóa toàn bộ quyền truy cập quản trị.
- Không để bảng điều khiển hosting/máy chủ hoạt động mà thiếu cấu hình cảnh báo tài nguyên và dịch vụ qua Telegram/Webhook: Khi ổ đĩa chạm ngưỡng tràn hoặc dịch vụ MySQL sập đột ngột, việc thiếu kênh cảnh báo tức thì sẽ khiến website bị downtime kéo dài mà đội ngũ kỹ thuật không hề hay biết để can thiệp kịp thời.
- Không can thiệp cập nhật lớn nếu chưa có quyền truy cập hosting: Nếu chỉ có quyền WP-Admin, khi phát sinh lỗi Fatal Error làm sập giao diện quản trị (WSOD) sẽ không thể can thiệp File Manager để ngắt plugin/theme lỗi tức thì.
- Không tự ý kích hoạt gửi OTP đăng nhập portal dịch vụ khi chưa hỏi người dùng: Khi nhà cung cấp yêu cầu 2FA (SMS hoặc Email), cần hỏi rõ người dùng muốn nhận mã qua kênh nào trước khi bấm gửi.
- Đối với giao diện xác thực OTP dạng nhiều ô rời (segmented inputs / `.otp-box`): Không điền toàn bộ chuỗi ký tự OTP vào một ô duy nhất vì form sẽ từ chối; cần điền từng chữ số vào từng ô tương ứng hoặc duyệt gán giá trị qua script để đảm bảo gửi mã thành công.
- Không khởi chạy full backup khi dung lượng hosting đã chạm ngưỡng kịch trần (>= 100% quota): Tiến trình nén file backup sẽ tạo file tạm làm tràn đĩa (Disk Full), khiến tiến trình backup đứt gãy, database bị khóa ghi hoặc sập website; cần kiểm tra cPanel Disk Usage và dọn dẹp các tệp `error_log`, `.trash` trước khi chạy nén.
- Không để các thư mục sub-site hoặc landing page độc lập nằm lẫn trong `public_html` mà không kiểm soát tài nguyên: Các source này chứa media trùng lặp, database phụ và error log không được bảo trì làm cạn kiệt dung lượng hosting của toàn bộ hệ thống; cần quy hoạch tách riêng subdomain/add-on domain hoặc dọn dẹp thường xuyên.
- Không để hệ thống chỉ có một Theme duy nhất: Luôn cài sẵn một default theme chính thức của WordPress (như Twenty Twenty-Four) làm fallback, vì nếu theme chính gặp Fatal Error hệ thống sẽ sập hoàn toàn không thể tự phục hồi.
- Không bỏ qua thời hạn ân hạn (grace period) của theme/builder: Khi builder (Thrive Suite, Elementor Pro) hết hạn license, quyền chỉnh sửa và cập nhật bảo mật sẽ bị khóa gây gián đoạn vận hành.
- Không để `WP_MEMORY_LIMIT` ở mức mặc định (40M): Dù PHP memory limit của server là 512M, WordPress vẫn giới hạn frontend ở 40M trừ khi được khai báo tường minh trong `wp-config.php`.
- Không để tiến trình quét Wordfence bị treo vô thời hạn: Quá trình scan bị kẹt do timeout background cron sẽ khiến các file mới nhiễm mã độc không được phát hiện; cần hủy scan bị kẹt và điều chỉnh bộ nhớ/thời gian thực thi tối đa.

## Verification
- Truy cập `/wp-admin/site-health.php` đạt trạng thái "Good" không có lỗi critical, dung lượng đĩa hosting dưới ngưỡng cảnh báo an toàn (< 85%), trang chủ tải dưới 2 giây, tiến trình quét bảo mật Wordfence hoàn tất 100% không bị treo, và các kênh cảnh báo sự cố Telegram/Webhook được xác nhận hoạt động bình thường.
