---
name: enterprise-network-operations
description: Quy trình thiết kế, cấu hình, vận hành và xử lý sự cố thiết bị mạng doanh nghiệp (Router, Switch, WiFi AP, VLAN, VPN, QoS) cho MSH Group và Megan Holding.
---

# Quy Trình Vận Hành Thiết Bị Mạng & Hạ Tầng Doanh Nghiệp

Sử dụng kỹ năng này để chuẩn hóa quy trình triển khai, cấu hình, kiểm soát và bảo trì hệ thống mạng nội bộ và liên chi nhánh cho doanh nghiệp.

## 1. Quản Trị Router & Định Tuyến (Routing & Gateway)
- **Cấu hình Gateway & Cân bằng tải**: Thiết lập đa đường truyền WAN (Dual WAN / Multi-WAN) với chính sách Failover tự động và Load Balancing (PCC hoặc ECMP) để đảm bảo kết nối internet không gián đoạn.
  - Luôn quản lý các đường mạng ngoài bằng Interface List (ví dụ `WAN`); mọi firewall rules (Filter, NAT, Mangle) bắt buộc trỏ theo `in-interface-list=WAN`, tuyệt đối không gán cứng tên interface đơn lẻ (như `pppoe-out1`) để tránh hở tường lửa khi bổ sung WAN 2 (`pppoe-out2`).
  - Khi thiết lập PCC, phải đồng bộ các nhánh mangle và dọn sạch các route rác rỗng gateway (`gateway=""`).
- **Phân tách mạng (VLAN & Subnetting)**:
  - Phân vùng VLAN rõ ràng: Management VLAN, Internal Staff VLAN, Server/Printer VLAN, Guest WiFi VLAN, IoT/CCTV VLAN.
  - Thiết lập Inter-VLAN routing trên Router/Core Switch kèm tường lửa chặn truy cập trái phép giữa các phân vùng (đặc biệt cô lập Guest và IoT khỏi dữ liệu nội bộ).
  - **Quy trình phân tách VLAN với thiết bị IP tĩnh (Máy chấm công, Máy in, Server nội bộ)**:
    - Kiểm toán trước khi đổi VLAN: Lập danh sách toàn bộ thiết bị đang gán IP tĩnh thủ công (IP, MAC, switch port kết nối và phần mềm phụ thuộc).
    - Cấu hình Inter-VLAN Routing & Mở Firewall ACL chuyên biệt: Mở cổng dịch vụ cho phép VLAN Nhân sự/Kế toán truy cập đến máy chấm công (ví dụ port `4370` TCP/UDP đối với ZKTeco/Ronald Jack, port `80`/`443`/`5005` đối với Hikvision/Dahua) và cổng in mạng (`9100`/RAW/LPR) trước khi kích hoạt cách ly liên VLAN.
    - Ưu tiên chuyển đổi sang DHCP Reservation (Static Binding theo MAC trên Gateway): Thay vì đặt IP tĩnh trực tiếp trên thiết bị phần cứng, gán cố định qua DHCP trên Gateway để dễ dàng quản lý tập trung và tránh mất kết nối khi tái cấu trúc subnet.
- **VPN Doanh nghiệp & Quản trị từ xa**:
  - **Site-to-Site VPN** (IPsec / WireGuard): Kết nối an toàn giữa trụ sở chính MSH Group, Megan Holding và các chi nhánh/văn phòng giao dịch.
  - **Remote Access VPN** (WireGuard / OpenVPN / L2TP over IPsec): Cung cấp quyền truy cập từ xa an toàn cho nhân sự làm việc từ xa (Work From Home) kèm xác thực 2 lớp (2FA/MFA). Ưu tiên chuẩn WireGuard trên RouterOS thay thế L2TP cũ (do macOS các bản mới đã bỏ hỗ trợ L2TP). Đảm bảo mở cổng UDP WireGuard (ví dụ `13231`) trên Firewall Input từ `interface-list=WAN`, tạo đủ Peer/Public Key, và cấp phép cho dải IP VPN truy cập vào cổng quản trị Router (WinBox/SSH) cùng tài nguyên LAN nội bộ.
- **Quy tắc an toàn khi nạp cấu hình Router từ xa (MikroTik RouterOS)**:
  - Luôn xuất bản sao lưu cấu hình (`.backup` và `.rsc`) lưu về máy cục bộ trước khi thao tác.
  - Bắt buộc kích hoạt chế độ **Safe Mode** (`Ctrl + X` trên WinBox/CLI) trong suốt quá trình nạp script từ xa để router tự động rollback ngay lập tức nếu xảy ra lỗi rule hoặc rớt kết nối mạng.
- **QoS & Bandwidth Management**: Ưu tiên băng thông cho các ứng dụng công việc trọng yếu (VoIP, Video Conference, ERP, CRM) và bóp băng thông giải trí (YouTube, mạng xã hội, torrent).

## 2. Quản Trị Hệ Thống WiFi Doanh Nghiệp (Enterprise Wireless / WLAN)
- **Kiến trúc Controller & Access Point (AP)**:
  - Triển khai quản lý tập trung qua Cloud hoặc Hardware Controller (Ruijie Cloud / ReyeeOS, UniFi Controller, Aruba Central, Omada hoặc Ruckus).
  - Quy hoạch kênh (Channel Planning) 2.4GHz (1, 6, 11) và 5GHz/6GHz để triệt tiêu can nhiễu đồng kênh (Co-channel interference).
  - Điều chỉnh công suất phát (Tx Power) và Minimum RSSI để hỗ trợ chuyển vùng liền mạch (Seamless Roaming - 802.11r/k/v).
- **Vận hành & Đồng bộ Ruijie Cloud (ReyeeOS)**:
  - Kiểm toán trạng thái thiết bị tập trung trên Cloud Controller (`Online - Synced`) và đảm bảo 0 cảnh báo active trước và sau mỗi lần nâng cấp hoặc thay đổi cấu hình hạ tầng.
  - Cơ chế cảnh báo sự cố Ruijie Cloud: Nền tảng native chỉ hỗ trợ cảnh báo qua Email quản trị và thông báo đẩy (Push Notification) qua ứng dụng di động Ruijie Reyee. Để tích hợp cảnh báo tức thời về Telegram phòng IT, bắt buộc định tuyến qua n8n webhook hoặc email parser trung gian.
- **Bảo mật mạng không dây**:
  - Tách riêng SSID: SSID nội bộ (WPA2/WPA3 Enterprise sử dụng RADIUS 802.1X xác thực theo tài khoản nhân viên) và SSID Khách (Guest Portal với cách ly Client Isolation, giới hạn băng thông và thời gian phiên).
  - Quét và phát hiện Rogue AP (AP giả mạo).

## 3. Quản Trị Switch & Tầng Truy Cập (Switching & LAN)
- **Loop Prevention & Dự phòng**: Bật RSTP/MSTP chống vòng lặp mạng trên toàn bộ Switch hạ tầng; kích hoạt BPDU Guard trên các cổng Access kết nối thiết bị đầu cuối.
- **Port Security & 802.1X**: Giới hạn số lượng MAC address trên từng cổng switch, cô lập lập tức cổng phát sinh broadcast storm.
- **Quản lý nguồn PoE**: Tính toán công suất PoE budget cho hệ thống Camera, Điện thoại IP và WiFi AP, thiết lập lịch tắt/bật PoE nếu cần tiết kiệm năng lượng.

## 4. Giám Sát Hệ Thống Camera & Lưu Trữ Đám Mây (CCTV Archiving)
- **Nghiên cứu giải pháp mã nguồn mở trước khi giao việc**: Đọc README và cấu hình repo trên GitHub (raw README qua browser) để nắm kiến trúc, biến môi trường và giới hạn thật của giải pháp trước khi phân công cho các chuyên viên.
- **Phân công nghiên cứu theo chuyên môn (chỉ khảo sát, chưa triển khai lên production)**: Network Specialist khảo sát hiện trạng camera (model, IP, VLAN, ONVIF/RTSP, dung lượng ước tính); Security Specialist thiết kế phần lưu trữ đám mây (OAuth rclone headless, chọn tài khoản, rủi ro dữ liệu); bộ phận còn lại soạn runbook tiếng Việt và kế hoạch PoC 1 camera.
- **Chốt với quản lý trước khi thiết kế chi tiết**: số ngày lưu trữ (30/60/90) và tài khoản Google Drive dùng để lưu (đối chiếu quota — tài khoản free 15GB thường không đủ cho nhiều camera lưu dài ngày, cân nhắc Google One hoặc Workspace riêng cho camera), vì hai quyết định này chi phối toàn bộ chi phí và thiết kế.
- **Xây dựng ứng dụng ghi hình & đồng bộ camera lên Google Drive (multi-brand CCTV sync app)**:
  - Kiến trúc khuyến nghị khi yêu cầu mở rộng đa hãng: tách lớp hồ sơ camera (`profiles.py` chứa khối dữ liệu từng hãng: EZVIZ, Hikvision, Dahua/Imou, TP-Link Tapo, Uniview, mục Tuỳ chỉnh dán URL RTSP) khỏi lớp ghi hình (ffmpeg chia đoạn clip) và lớp tải lên (rclone). Thêm hãng mới = thêm một khối dữ liệu, không sửa code ghi hình/tải lên.
  - Nguyên tắc chống nghẽn mạng khi đồng bộ: tải từng clip một, nghỉ giữa các clip, giới hạn tốc độ (ví dụ 6 MB/s), chỉ chạy trong khung giờ cấu hình được (mặc định 22:30–06:30, hỗ trợ qua đêm), tự xoá clip gốc sau khi tải xong, hạn mức ổ đĩa tạm.
  - Giao diện tiếng Việt dạng 4 tab (Camera / Google Drive / Đồng bộ / Nhật ký): kiểm tra kết nối camera hiện ảnh chụp thật để xác nhận mật khẩu; kết nối Drive bằng OAuth trình duyệt + duyệt chọn thư mục trên Drive + ghi thử 1 file; nhật ký riêng cho từng camera.
  - Đóng gói Windows: PyInstaller one-file (`build_windows.bat` tự cài PyInstaller, tự tải `ffmpeg.exe` + `rclone.exe` rồi build ra `dist\CameraSync.exe`); mã hoá mật khẩu camera bằng DPAPI (Windows) để chỉ giải mã trên đúng máy + đúng tài khoản. Vị trí dự án chuẩn: `Downloads/IT Services/Camera/CameraSync`.
  - **Kiểm thử trước khi bàn giao**: chạy kiểm thử lõi (CSDL, hồ sơ camera, bộ máy ghi hình/đồng bộ, parser kết quả rclone) trong sandbox (remote workbench) — không chạy trực tiếp trên máy người dùng để không làm phiền màn hình đang làm việc; kèm bộ selftest (`python tests\\selftest.py`) để chạy trên máy Windows đích trước khi dùng thật.
  - **Lưu mọi bộ test vào repo ngay khi viết**: mọi kịch bản test chạy trong sandbox phải được lưu thành file trong thư mục `tests/` của dự án (cùng selftest.py) trước khi báo cáo kết quả, để quản lý tự chạy và đối chiếu thay vì chỉ tin lời báo cáo.
  - **Khi không có máy Windows để build .exe**: đề xuất 3 lựa chọn cho quản lý — (1) quản lý chạy `build_windows.bat` trên 1 máy Windows và gửi lại màn hình/lỗi; (2) remote vào 1 máy Windows trong LAN để tự build và chụp từng tab; (3) đẩy repo lên GitHub và dùng GitHub Actions build artefact `.exe` cho quản lý tải về.

## 5. Giám Sát & Khắc Phục Sự Cố (Monitoring & Troubleshooting)
- Triển khai công cụ giám sát SNMP/Syslog (Zabbix, PRTG, LibreNMS hoặc Uptime Kuma) để cảnh báo tức thời khi có rớt mạng, quá tải CPU router hoặc suy hao đường truyền.
- Quy trình ứng cứu sự cố mạng (5 bước):
  1. Xác định phạm vi ảnh hưởng (toàn công ty, một phòng ban hay một thiết bị).
  2. Kiểm tra trạng thái vật lý và liên kết (cáp, link light, nguồn, PoE).
  3. Kiểm tra tầng IP/DHCP/DNS và định tuyến (Ping, Traceroute, ARP table).
  4. Phân tích nhật ký lỗi (Log router/switch, syslogs).
  5. Áp dụng giải pháp tạm thời/triệt để và lập báo cáo sự cố (Post-Mortem).
- **Cạm bẫy cần tránh (Pitfalls)**:
  - Không gán cứng interface WAN riêng lẻ vào firewall filter drop/accept mà phải dùng Interface List `WAN`; việc quên add interface WAN phụ vào Interface List sẽ làm hở toàn bộ mạng nội bộ và router ra Internet.
  - Không đổi cổng quản trị Router (như WinBox đổi sang cổng 1234) hoặc siết firewall filter mà quên đưa subnet VPN (WireGuard) vào danh sách cho phép, dẫn đến việc kết nối VPN thành công nhưng bị chặn truy cập quản trị router và tài nguyên LAN.
  - Không nạp script thay đổi firewall/routing trên MikroTik từ xa mà không bật `Safe Mode` (`Ctrl + X`), tránh nguy cơ router ngắt kết nối vĩnh viễn và phải reset vật lý tại chỗ.
  - Không đổi VLAN hoặc IP máy chấm công trước khi cấu hình Inter-VLAN ACL và cập nhật địa chỉ IP mới trên phần mềm chấm công tại máy tính HCNS, vì sẽ gây đứt gãy việc tải dữ liệu điểm danh hàng ngày.
  - Không quét kiểm tra bảng ARP và dải IP trước khi gán IP tĩnh mới để tránh xung đột IP (IP Conflict) với các thiết bị đang hoạt động.
  - Không cấu hình trực tiếp Telegram webhook từ Ruijie Cloud vì portal không hỗ trợ native webhook Telegram; phải định tuyến qua hub trung gian (n8n webhook hoặc email bridge) để tránh mất cảnh báo rớt mạng.
  - Không hứa ghi hình liên tục 24/7 bằng giải pháp ONVIF event-based (chỉ ghi clip khi có chuyển động), vì sẽ sai kỳ vọng của quản lý; làm rõ rằng giải pháp này tăng thời gian LƯU TRỮ, còn ghi 24/7 cần NVR hoặc Frigate.
  - Không tạo OAuth thật hay cài đặt lên server production khi mới ở giai đoạn nghiên cứu, để tránh rủi ro bảo mật và lãng phí công sức làm lại khi phương án chưa được duyệt.
  - Không để danh sách trong giao diện tự làm mới định kỳ mà không tạm dừng refresh khi người dùng đang gõ, vì sẽ xoá mất chữ đang nhập.
  - Không nói quá về mức kiểm chứng: khai báo rõ phần đã kiểm thử trong sandbox, phần chưa chạy thật trên Windows (build .exe cần 1 máy Windows chạy build_windows.bat một lần) để quản lý nắm đúng rủi ro khi nhận bàn giao.
  - Không báo cáo kết quả test mà không có file test tương ứng trong `tests/` của repo, vì báo cáo bằng lời không thể đối chiếu lại và làm mất niềm tin khi quản lý hỏi "đã test chưa" / "đã xong hẳn chưa"; trả lời câu hỏi hoàn thành bằng bảng phân tầng: đã làm gì (mã nguồn, logic đã test), chưa làm gì (.exe, giao diện thật, camera thật, OAuth thật).
  - Không kết luận hay báo cáo hoàn thành công việc khi mới thực hiện xong bước Do (viết code/cấu hình) hoặc Check một phần (mới test sandbox/logic); bắt buộc đối chiếu nghiêm ngặt theo chu trình PDCA, chỉ chốt nghiệm thu khi có bằng chứng thực nghiệm trên môi trường thật (kết quả test, file log, thiết bị/giao diện thật).

## 6. Chuẩn Hóa Vận Hành & Bàn Giao Theo Framework PDCA (Plan - Do - Check - Act)
Áp dụng bắt buộc chu trình PDCA vào toàn bộ quy trình vận hành hạ tầng, triển khai phần mềm và bàn giao kỹ thuật của Phòng IT:
- **Plan (Kế hoạch):** Xác định rõ mục tiêu, tiêu chí hoàn thành (Definition of Done - DoD), đánh giá rủi ro và phương án rollback trước khi can thiệp thiết bị, hệ thống mạng hoặc viết mã. Lập tài liệu kế hoạch/PoC rõ ràng để quản lý phê duyệt.
- **Do (Thực thi):** Triển khai đúng theo phạm vi đã duyệt; bắt buộc thực hiện trên môi trường Lab/PoC/Sandbox trước khi áp dụng diện rộng lên Production. Thực thi có kiểm soát, lưu log chi tiết từng bước.
- **Check (Kiểm tra & Nghiệm thu):** Đo lường, kiểm thử thực tế và đối chiếu minh bạch với DoD ban đầu. Bắt buộc phân tách rõ ràng: viết xong mã nguồn/cấu hình $\neq$ đã kiểm thử; kiểm thử logic trong sandbox $\neq$ kiểm thử đầu-cuối thành công trên môi trường thật. Chỉ xác nhận hoàn thành khi có bằng chứng thực nghiệm đầy đủ (file log, test cases, màn hình giao diện thật, thiết bị kết nối thật). Mọi kịch bản kiểm thử phải được lưu thành file trong thư mục `tests/`.
- **Act (Chuẩn hóa & Cải tiến):** Đóng gói Runbook/SOP, ghi nhận các lỗi phát sinh để xử lý triệt để tận gốc, chuẩn hóa quy trình và kiến trúc cho các chu kỳ triển khai tiếp theo.

## Verification
- Với router và tường lửa: toàn bộ WAN thuộc Interface List `WAN`, cổng WireGuard mở trên Firewall Input, dải IP VPN truy cập được WinBox/LAN, và cấu hình đã được sao lưu (`.backup`, `.rsc`) trước khi bàn giao.
- Với công việc lưu trữ camera: danh sách camera đã kiểm kê khớp hiện trạng thật, phương án dung lượng đã tính theo số ngày lưu, và quản lý đã chốt tài khoản lưu trữ & thời gian lưu trước khi triển khai.
- Với ứng dụng đồng bộ camera: kết quả selftest trên sandbox đạt, toàn bộ bộ test nằm trong `tests/` của repo, selftest trên máy Windows đích đạt, và file `.exe` build thành công kèm ffmpeg + rclone nhúng.
- Với mọi quy trình bàn giao hạ tầng và giải pháp: hoàn tất nghiệm thu đủ 4 bước PDCA với biên bản/bằng chứng thực nghiệm (log, test cases lưu trong repo, trạng thái thiết bị thật) trước khi chuyển giao vận hành.
