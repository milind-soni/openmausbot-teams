---
name: enterprise-cybersecurity-operations
description: Quy trình triển khai chính sách bảo mật, quản trị tường lửa (Firewall), phòng chống mã độc, chiến lược sao lưu 3-2-1 và ứng cứu sự cố an ninh thông tin cho MSH Group và Megan Holding.
---

# Quy Trình Bảo Mật Hệ Thống & An Ninh Mạng Doanh Nghiệp

Sử dụng kỹ năng này để thiết lập hàng rào phòng thủ đa lớp, bảo vệ tài sản số và dữ liệu kinh doanh của MSH Group, Megan Holding. Kỹ năng không bao gồm việc can thiệp cấu hình phá vỡ tính sẵn sàng của dịch vụ đang vận hành trên production mà chưa có kế hoạch dự phòng.

## When to Use
- Khi tiếp nhận bàn giao máy chủ, VPS hoặc hệ thống web panel (aaPanel, CloudPanel, Coolify, cPanel) cần rà soát an ninh.
- Khi kiểm toán bảo mật hệ thống định kỳ, quét cổng dịch vụ mở (port scanning) và cấu hình tường lửa.
- Khi xử lý các cảnh báo kiểm toán an ninh hệ điều hành (aaPanel Security Center / Sysguard, Lynis, CVE phần mềm, phân quyền tệp, core dump).
- Khi thiết lập chính sách phân quyền truy cập, xác thực đa yếu tố (MFA) hoặc chiến lược sao lưu chống ransomware.
- Khi phát hiện rủi ro mở cổng quản trị CSDL ra Internet hoặc xử lý các cảnh báo an ninh thông tin.

## 1. Quản Trị Tường Lửa & Phòng Thủ Biên Giới (Firewall & Perimeter Defense)
- **Kiến trúc Tường lửa (Next-Generation Firewall - NGFW)**:
  - Thiết lập chính sách Default Deny (mặc định từ chối toàn bộ traffic vào/ra, chỉ mở các port/service được cấp phép cụ thể).
  - Kích hoạt IPS/IDS (Intrusion Prevention/Detection System) để ngăn chặn các nỗ lực khai thác lỗ hổng mạng (exploit payloads, brute force).
  - Cấu hình Geo-IP Filtering: Chặn truy cập từ các quốc gia không có giao dịch thương mại hoặc có nguy cơ tấn công mạng cao.
  - Lọc nội dung Web (Web & DNS Filtering): Chặn truy cập các trang web độc hại, phishing, cờ bạc, nội dung xấu và hạn chế tải file nguy hiểm (.exe, .bat, .scr).
- **Phân tách vùng bảo mật (Network DMZ & Segmentation)**:
  - Đặt các máy chủ công khai (Web, Mail, VPN) trong vùng DMZ, tách biệt hoàn toàn khỏi mạng nội bộ (LAN) chứa cơ sở dữ liệu và máy trạm nhân viên.
- **Bảo Vệ Cổng Dịch Vụ Máy Chủ & Cơ Sở Dữ Liệu (Server & Database Hardening)**:
  - Nghiêm cấm mở công khai các cổng dịch vụ cơ sở dữ liệu (`3306` MySQL, `5432` PostgreSQL) và cổng công cụ quản trị web database (`888` phpMyAdmin, Adminer) ra toàn bộ Internet (`0.0.0.0/0`).
  - Cấu hình tường lửa chỉ cho phép kết nối nội bộ (`localhost` / `127.0.0.1`) hoặc whitelist IP tĩnh đích danh của máy chủ ứng dụng web được phép truy vấn.
  - Khi tiếp nhận máy chủ VPS có Web Panel (aaPanel, CloudPanel, Coolify), ưu tiên truy cập và rà soát tình trạng qua giao diện web trước để nắm bắt tổng quan tài nguyên, phiên bản dịch vụ và danh sách database/website trước khi can thiệp lệnh hệ thống.
- **Kiểm tra Tình trạng Tường lửa & Cổng SSH Thực tế (Zero-Lockout Firewall Activation)**:
  - Khi kiểm tra máy chủ, không mặc định SSH ở cổng 22 hay 2222; luôn quét hoặc kiểm tra cấu hình sshd để xác định chính xác cổng SSH tùy biến (ví dụ cổng `2204`).
  - Kiểm tra trạng thái kích hoạt của tường lửa hệ thống (UFW/Firewall service): Nếu tường lửa đang tắt (`status: false`), các cổng nhạy cảm như MySQL 3306 và phpMyAdmin 888 đang phơi ra ngoài Internet dù giao diện panel hiển thị trạng thái an toàn.
  - Quy tắc kích hoạt tường lửa an toàn (Zero-Lockout): Trước khi bật UFW/tường lửa, BẮT BUỘC khai báo đầy đủ các rule cho phép (Allow Rules) cho toàn bộ dịch vụ thiết yếu: cổng Web (`80`, `443`), cổng SSH thực tế đang lắng nghe, cổng Web Panel quản trị hiện hành (`7800`), cổng container dịch vụ (như n8n `5678`) và IP whitelist kết nối CSDL (`3306`). Tuyệt đối không kích hoạt tường lửa khi chưa thêm cổng SSH hiện hành vào whitelist.
- **Phân công & Phối hợp Vận hành Bảo mật**:
  - Chuyên viên Bảo mật (`@Security Specialist`): Trực tiếp thực thi cấu hình kỹ thuật an ninh (rule firewall, đổi cổng quản trị, cấu hình Fail2ban, siết quyền tệp tin).
  - Trưởng phòng IT (`@IT`): Trực tiếp điều phối quy trình, duy trì phiên Web Panel độc lập dự phòng, liên tục kiểm tra tính sẵn sàng của các website/dịch vụ (`curl -sI` trả về HTTP 200 OK) và sẵn sàng kích hoạt phương án khôi phục (rollback) ngay nếu có gián đoạn.

## 2. Kiểm Soát Danh Tính & Quyền Truy Cập (Identity & Access Management)
- **Nguyên tắc Đặc quyền tối thiểu (Least Privilege)**: Phân quyền tài khoản theo đúng vai trò công việc; giới hạn nghiêm ngặt tài khoản quản trị Domain Admin / Enterprise Admin.
- **Bắt buộc Xác thực đa yếu tố (MFA/2FA)**: Áp dụng trên toàn bộ điểm truy cập từ xa (VPN, Remote Desktop, Email, Portal quản trị, Cloud Services).
- **Quản lý mật khẩu & Endpoint Protection**: Triển khai giải pháp EDR / Antivirus tập trung (CrowdStrike, SentinelOne, Kaspersky Endpoint hoặc Microsoft Defender for Business) trên 100% máy trạm và máy chủ.

## 3. Chiến Lược Sao Lưu & Chống Ransomware (3-2-1 Backup Strategy)
- **Quy tắc sao lưu 3-2-1**:
  - Lưu trữ ít nhất 3 bản sao dữ liệu quan trọng.
  - Sử dụng 2 loại phương tiện lưu trữ khác nhau (NAS nội bộ + Cloud Object Storage S3/Wasabi).
  - Ít nhất 1 bản sao lưu được lưu trữ Off-site hoặc ở trạng thái Bất biến (Immutable Backup / Air-gapped) để bảo vệ tuyệt đối trước mã độc tống tiền (Ransomware).
- **Diễn tập khôi phục (Disaster Recovery Testing)**: Định kỳ hàng quý kiểm tra tính toàn vẹn của bản sao lưu và diễn tập quy trình khôi phục hệ thống (RTO < 2 giờ, RPO < 24 giờ).
- **Khảo sát dung lượng đĩa trước khi sao lưu & dọn dẹp**: Trước khi lập kế hoạch dọn dẹp đĩa hoặc sao lưu, bắt buộc kiểm tra đối soát phân bổ dung lượng thực tế qua lệnh terminal (`du -sh /* 2>/dev/null | sort -rh`) hoặc qua giao diện/API Web Panel nếu SSH bị chặn; tuyệt đối không nhầm lẫn giữa dung lượng trống hiện tại (Free space) và dung lượng mục tiêu sau dọn dẹp. Khi rà soát máy chủ Linux/aaPanel, tập trung bóc tách các nguồn dữ liệu rác phổ biến: thư mục mã nguồn biên dịch sót lại (`/www/server/mysql/src` & `.tar.gz`), dữ liệu cache quét bảo mật (`/www/server/panel/data/hids_data`), các bản sao lưu cục bộ cũ tích tụ (`/www/backup/wordpress`, `/www/backup/panel`) và file SQLite theo dõi hệ thống (`system.db`). Khi ổ đĩa chạm ngưỡng nguy hiểm (> 90-95%, dung lượng trống < 5 GB), cấm chạy dump hàng loạt CSDL vào thư mục local vì sẽ làm tràn đĩa gây sập dịch vụ (MySQL, Nginx, Panel); phải dùng cơ chế dump từng CSDL, nén và đẩy trực tiếp lên Cloud (rclone/Google Drive/S3) rồi xóa file tạm ngay lập tức.
- **Yêu cầu Snapshot máy chủ trước khi triển khai**: Trước khi thực hiện bất kỳ thay đổi nào về tường lửa, đổi cổng quản trị, tối ưu dịch vụ hay nâng cấp bảo mật hệ điều hành, bắt buộc phải chụp snapshot toàn bộ VPS từ nhà cung cấp cloud làm điểm phục hồi an toàn (rollback point).
- **Rà soát tài khoản FTP & Docker tồn dư**: Kiểm tra danh sách tài khoản FTP để ngăn chặn việc cấp quyền bao trùm toàn bộ web root (`/www/wwwroot/`) của mọi website; kiểm tra các container và interface Docker cũ (`docker ps -a`, `docker system df`) để dọn dẹp tài nguyên và triệt tiêu bề mặt tấn công ẩn.

## 4. Ứng Cứu Sự Cố & Nhật Ký Kiểm Toán (Incident Response & Auditing)
- **Quản lý Log tập trung**: Thu thập và lưu trữ Syslog từ Router, Switch, Firewall, Server vào hệ thống tập trung phục vụ điều tra số (Forensics).
- **Quy trình ứng cứu sự cố 6 bước (NIST SP 800-61)**:
  1. Chuẩn bị (Preparation).
  2. Phát hiện & Phân tích (Detection & Analysis).
  3. Cô lập sự cố (Containment - ngắt kết nối mạng thiết bị nhiễm độc ngay lập tức).
  4. Triệt tiêu mối đe dọa (Eradication - quét mã độc, vá lỗ hổng).
  5. Khôi phục hoạt động (Recovery).
  6. Bài học kinh nghiệm & Cải tiến hệ thống (Post-Incident Review).

## 5. Chuẩn Hóa & Gia Cố Hệ Điều Hành Máy Chủ (OS & Web Panel Hardening)
- **Vá lỗ hổng phần mềm an toàn**: Khi công cụ kiểm toán cảnh báo CVE trên các gói dịch vụ (OpenSSL, Nginx, Curl, Python), chỉ cập nhật bản vá bảo mật cho gói bị ảnh hưởng (`apt --only-upgrade install <package>`) thay vì nâng cấp đại trà toàn bộ hệ thống để tránh phá vỡ tương thích ứng dụng.
- **Giới hạn Core Dump chống lộ bí mật bộ nhớ**: Ngăn chặn rò rỉ dữ liệu nhạy cảm (mật khẩu CSDL, session tokens trong RAM khi tiến trình crash) bằng cách cấu hình `ulimit -c 0` trong `/etc/security/limits.conf` và gán `fs.suid_dumpable = 0` trong `/etc/sysctl.conf`.
- **Siết phân quyền tệp tin hệ thống (Least Privilege)**: Đảm bảo các tệp và thư mục nhạy cảm được bảo vệ nghiêm ngặt: `chmod 600 /etc/shadow`, `chmod 644 /etc/passwd`, `chmod 600 /etc/ssh/sshd_config`.
- **Kiểm soát phiên nhàn rỗi (Session Idle Timeout)**: Thiết lập tự động ngắt kết nối SSH sau 5 phút nhàn rỗi bằng cách khai báo `export TMOUT=300` trong `/etc/profile` và đặt `ClientAliveInterval 300`, `ClientAliveCountMax 0` trong `sshd_config`.
- **Bí danh an toàn cho thao tác tệp (Safe Aliases)**: Khai báo `alias rm='rm -i'` trong profile hệ thống để bắt buộc xác nhận trước khi xóa tệp, ngăn ngừa rủi ro mất mát dữ liệu do gõ nhầm lệnh.
- **Quy trình đổi cổng & lối vào Web Panel an toàn (Zero-Lockout Protocol)**: Khi thay đổi cổng dịch vụ hoặc đường dẫn an toàn (Safety Entrance):
  1. Mở trước cổng quản trị mới trên tường lửa (UFW / Firewall).
  2. Cấu hình cổng hoặc URL mới trong Web Panel và khởi động lại dịch vụ panel.
  3. Mở tab trình duyệt ẩn danh kiểm tra đăng nhập thành công trên cổng/URL mới.
  4. Đóng cổng cũ trên tường lửa sau khi đã xác nhận truy cập thông suốt.

## Pitfalls
- Không mở công khai cổng CSDL (MySQL 3306) và phpMyAdmin (888) ra Internet: Kẻ tấn công có thể quét cổng và thực hiện brute-force mật khẩu hoặc khai thác lỗ hổng để chiếm quyền truy cập toàn bộ dữ liệu; phải cấu hình tường lửa chỉ cho phép kết nối localhost hoặc whitelist IP máy chủ ứng dụng.
- Không kích hoạt tường lửa (UFW) khi chưa khai báo cổng SSH thực tế và cổng Web Panel vào danh sách cho phép (Allow Rules): Khi tường lửa đang ở trạng thái tắt, việc bật tường lửa ngay lập tức sẽ áp dụng chính sách Default Deny và khóa toàn bộ kết nối từ xa kể cả SSH và Panel, gây cô lập hoàn toàn máy chủ; bắt buộc phải xác định cổng SSH thực tế (có thể là cổng tùy biến như `2204` thay vì 22) và thêm đầy đủ các cổng dịch vụ thiết yếu trước khi kích hoạt tường lửa.
- Khi thay đổi cổng quản trị hoặc đường dẫn an toàn (Safety Entrance) trên Web Panel: Không đóng cổng cũ trên firewall trước khi xác minh đăng nhập thành công ở cổng mới; phải tuân thủ quy trình Zero-Lockout (mở cổng mới -> đổi cấu hình -> xác nhận kết nối -> đóng cổng cũ) để tránh bị cô lập mất quyền điều khiển máy chủ.
- Không để mặc định tính năng Core Dump và phiên SSH không giới hạn thời gian chờ: Tiến trình crash có thể ghi dữ liệu bộ nhớ chứa secret/token ra ổ đĩa và phiên SSH bỏ quên tạo kẽ hở cho tấn công leo thang đặc quyền; cần cấu hình `ulimit -c 0`, `fs.suid_dumpable = 0` và `TMOUT=300`.
- Không bỏ qua giao diện Web Panel khi tiếp nhận máy chủ mới: Luôn truy cập qua giao diện web trước để khảo sát trực quan tình trạng tài nguyên, phiên bản dịch vụ và danh sách database/website trước khi can thiệp qua SSH hay terminal.
- Không tự ý thực hiện rà soát an ninh hoặc cấu hình kỹ thuật độc lập khi có nhân sự chuyên trách: Trưởng phòng IT phân công chuyên viên chuyên trách (`@Security Specialist`) trực tiếp cấu hình kỹ thuật an ninh (firewall, port, fail2ban), đồng thời Trưởng phòng IT giữ phiên giám sát, kiểm thử dịch vụ và chủ động phương án rollback.
- Không khẳng định hoặc cam kết dung lượng có thể giải phóng trên máy chủ khi chưa phân tích chi tiết phân bổ dung lượng và không nhầm lẫn dung lượng trống (Free Space) với dung lượng sau dọn dẹp: Đa số dung lượng có thể nằm ở CSDL và tệp web production không thể xóa; nếu SSH bị chặn, phải kiểm toán qua giao diện/API Web Panel để bóc tách chính xác các nguồn rác thừa (mã nguồn build MySQL sót lại, HIDS cache, file sao lưu panel/web cũ, log SQLite) trước khi cam kết con số giải phóng đĩa.
- Không chạy full backup lưu trên ổ đĩa local khi dung lượng đĩa trống dưới 5-10%: Quá trình dump CSDL và nén tệp sẽ lấp đầy dung lượng còn lại khiến MySQL không ghi được socket và web server bị sập; phải sao lưu từng phần và đẩy thẳng lên Cloud Storage kèm xóa tệp tạm ngay lập tức.
- Không thực hiện siết tường lửa hoặc thay đổi cấu hình hệ thống máy chủ mà không có Snapshot VPS: Khi xảy ra sự cố mất kết nối hoặc hỏng gói phần mềm ngoài dự kiến, bản snapshot cấp hạ tầng là chốt chặn khôi phục an toàn duy nhất.

## Verification
- Kiểm tra kết nối cổng mạng từ ngoài Internet (nmap/curl): Các cổng 3306 và 888 ở trạng thái Closed/Filtered đối với IP công cộng, giao diện Web Panel bảo vệ bằng SSL/đường dẫn an toàn, toàn bộ dịch vụ CSDL chỉ phản hồi kết nối từ IP được cấp phép, và kết quả quét kiểm toán an ninh hệ thống (Sysguard) không còn cảnh báo High/Critical về lỗ hổng phần mềm hay lỏng quyền truy cập.
