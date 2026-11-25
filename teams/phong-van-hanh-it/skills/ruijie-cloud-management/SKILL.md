---
name: ruijie-cloud-management
description: "Quy trình chuẩn quản trị, cấu hình, tối ưu hóa và giám sát hạ tầng mạng doanh nghiệp Ruijie / Reyee (Gateway, Switch, AP) qua nền tảng Ruijie Cloud."
---

# Kỹ năng Quản trị & Vận hành Mạng Ruijie / Reyee trên Ruijie Cloud

## 1. Tổng quan Nền tảng Ruijie Cloud & Hệ sinh thái Reyee
- **Cổng quản trị quốc tế:** `https://cloud-as.ruijienetworks.com/`
- **Các dòng thiết bị tiêu biểu:**
  - **Reyee Gateway:** RG-EG210G-P-V3 (10 cổng, tích hợp PoE), RG-EG310GH-P-E (High-performance PoE Gateway hỗ trợ cân bằng tải đa WAN, cấp nguồn AP trực tiếp).
  - **Reyee Smart Switch:** RG-ES208GC, RG-ES216GC, RG-ES224GC (Switch Gigabit quản lý qua Cloud, hỗ trợ loop prevention, VLAN, port statistics).
  - **Reyee Access Point (Wi-Fi 6):** RG-RAP62 (Wall-plate / In-room Wi-Fi 6 AP), RG-RAP2260(G) / RG-RAP2260(E) (Ceiling AP băng thông cao, roaming 802.11k/v/r).
- **Công nghệ cốt lõi:**
  - **SON (Self-Organizing Network):** Tự động phát hiện thiết bị, tự cấu hình topo (Auto-discovery & Auto-networking).
  - **AI Diagnostics & AI Optimization:** Tự động dò kênh, tối ưu công suất phát, loại bỏ nhiễu chéo Wi-Fi và phát hiện suy hao cáp mạng.

## 2. Quy trình Vận hành & Cấu hình Tiêu chuẩn

### 2.1. Quản lý Mạng diện rộng (Smart WAN & Egress)
- Quản lý đa WAN (Multi-WAN Load Balancing): Hỗ trợ cơ chế chia sẻ tải theo băng thông (Weight-based) hoặc theo phiên kết nối (Session-based).
- Failover tự động: Tự động chuyển tuyến Internet khi đường truyền chính gặp sự cố dựa trên DNS health check / ICMP ping.
- Policy-Based Routing (PBR): Định tuyến theo người dùng, subnet IP hoặc dịch vụ sang từng cổng WAN cụ thể.

### 2.2. Phân hoạch VLAN & Kiểm soát Truy cập (LAN & Access Control)
- **VLAN Phân tách:** Tạo VLAN riêng cho Ban Giám Đốc/Văn phòng, VLAN Khách, VLAN Camera/IoT và VLAN Máy chủ.
- **Port Isolation & Client Isolation:** Bật tính năng cô lập client trên SSID Khách để ngăn ngừa quét mạng nội bộ.
- **Loop Prevention:** Kích hoạt tính năng chống lặp mạng (Loop prevention) trên các switch ES208GC.
- **DHCP Snooping & ARP Inspection:** Ngăn chặn rogue DHCP server và tấn công giả mạo ARP trong mạng nội bộ.

### 2.3. Quản trị Mạng Không dây (SSID, Roaming & QoS)
- **Thiết lập SSID:** Tách biệt SSID Nhân viên (WPA2/WPA3 Personal/Enterprise) và SSID Khách (Open/Captive Portal).
- **Roaming 802.11k/v/r:** Đảm bảo chuyển vùng mượt mà khi di chuyển giữa các phòng ban mà không rớt cuộc gọi thoại/video meeting.
- **Band Steering & Rate Limiting:** Ép thiết bị hỗ trợ sang băng tần 5GHz; giới hạn băng thông download/upload cho từng client mạng khách.

### 2.4. Giám sát & Quản trị Từ xa (Monitoring & Maintenance)
- **eWeb & Web CLI:** Truy cập giao diện quản trị Web GUI hoặc giao tiếp CLI của Gateway/Switch/AP từ xa thông qua Cloud Tunnel mà không cần mở port NAT hay cấu hình VPN phức tạp.
- **Firmware Upgrade:** Kiểm tra phiên bản ReyeeOS định kỳ; đặt lịch nâng cấp tự động vào khung giờ nghỉ (01:00 - 04:00 sáng) để không gián đoạn hoạt động doanh nghiệp.
- **Cloud Alarms & App Alerts:** Cấu hình cảnh báo thiết bị Offline, lỗi loop mạng, lỗi DHCP starvation qua Email và ứng dụng di động Ruijie Reyee App.

### 2.5. Quy trình Nâng cấp Firmware Phân tầng An toàn (Scheduled Upgrade)
1. **Kiểm tra phiên bản khuyến nghị (Stable):** Đối chiếu model thiết bị (RAP, Switch ES, Gateway EG) với danh sách firmware chính hãng khuyến nghị; không dùng bản beta trong môi trường sản xuất.
2. **Điều hướng phân hệ quản lý:** Vào `Project` -> `Delivery Center` -> `Maintenance` -> `Firmware Upgrade` (hoặc truy cập trực tiếp `#/maintenance_upgrade_equipmentUpgrade_menu`).
3. **Thứ tự phân tầng nâng cấp:**
   - **Tầng 1 (Access Layer - APs):** Nâng cấp Access Point trước (khung giờ 01:00 - 02:00).
   - **Tầng 2 (Distribution Layer - Switches):** Nâng cấp Switch sau khi AP hoàn tất (khung giờ 02:00 - 03:00).
   - **Tầng 3 (Core / Egress - Gateway):** Nâng cấp Gateway sau cùng (khung giờ 03:00 - 04:00).
4. **Cài đặt lịch Scheduled Upgrade:**
   - **Xử lý môi trường đa phân vùng mạng (Multi-site / Multi-network):** Nếu dự án phân chia nhiều site/tầng mạng riêng biệt (ví dụ từng tầng hoặc khối văn phòng), phải chuyển đổi lần lượt qua từng site hoặc truy cập từ menu tổng thể để cấu hình, tránh bỏ sót thiết bị ở các nhánh mạng khác.
   - **Xác định ngày trên Date Picker cho khung giờ sau nửa đêm (00:00 - 05:00):** Khi cấu hình vào buổi tối cho khung giờ rạng sáng hôm sau, bắt buộc chọn ngày tiếp theo (D+1) trên lịch để tránh mốc giờ rơi vào quá khứ.
   - Chọn từng nhóm thiết bị theo tầng -> chọn `Scheduled Upgrade` -> kích hoạt switch bật lịch hẹn -> cài đặt ngày và khung giờ chạy tự động -> kiểm tra trạng thái lịch hẹn trên bảng thiết bị.
5. **Kiểm tra hậu nâng cấp (Post-Upgrade Verification):**
   - Truy cập `Monitor Overview` kiểm tra trạng thái thiết bị đã boot lại và đạt `Online - Synced`.
   - Kiểm tra số lượng client đang hoạt động trên từng băng tần (2.4GHz, 5GHz, kết nối dây LAN) để đảm bảo không có rớt kết nối hoặc mất roaming.
   - Quay lại bảng `Firmware Upgrade`, tích chọn bộ lọc `Available for Upgrade` để rà soát chính xác các thiết bị Switch/Gateway còn tồn đọng chưa lên bản mới.

## 3. Các lưu ý & Bẫy lỗi thường gặp (Pitfalls)
- **Tuyệt đối không nâng cấp Gateway trước AP và Switch:** Nếu Gateway khởi động lại trước, đường truyền Internet và Cloud tunnel bị ngắt khiến lệnh nâng cấp và tải firmware của các thiết bị tầng dưới bị đứt đoạn hoặc lỗi.
- **Không nâng cấp đồng loạt toàn bộ thiết bị cùng một lúc:** Nâng cấp đồng thời gây nghẽn băng thông tải bản vá và ngắt hoàn toàn kết nối mạng nếu có sự cố boot; bắt buộc giãn cách tối thiểu 60 phút giữa các tầng thiết bị.
- **Chọn sai ngày khi đặt lịch bảo trì đêm muộn:** Luôn chọn ngày tiếp theo (D+1) trên Date Picker khi cấu hình vào buổi tối cho khung giờ sau 00:00 sáng, vì mốc giờ 01:00 - 04:00 thuộc về ngày hôm sau; chọn ngày hiện tại sẽ khiến lịch rơi vào quá khứ và không được thực thi.
- **Bỏ sót thiết bị ở mô hình dự án chia nhiều site / tầng mạng:** Luôn rà soát danh sách thiết bị trên từng site/tầng mạng trong mục Maintenance thay vì chỉ xem site mặc định, vì Ruijie Cloud phân tách bảng thiết bị theo từng mạng con (Network Site).
- **Xử lý khi kích hoạt nâng cấp tức thì (Instant Upgrade):** Khi nâng cấp trực tiếp ngoài kế hoạch, hệ thống thường hoàn tất lớp AP trước. Phải kiểm tra ngay số lượng client đang làm việc; nếu còn client kết nối, bắt buộc hoãn nâng cấp Switch và Gateway lõi, chuyển phần còn lại sang Scheduled Upgrade ban đêm (01:00 - 04:00) để ngăn ngừa sập mạng diện rộng.
- **Kiểm tra múi giờ hệ thống (Timezone) của Project:** Xác nhận múi giờ đặt tại GMT+7 trước khi thiết lập lịch hẹn nâng cấp để tránh kích hoạt nhầm vào giờ làm việc hành chính.