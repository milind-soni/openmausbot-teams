---
name: creative-direction
description: Develop or revise video concepts and audiovisual direction from business goals, content and audience; produce a creative package and review samples against its intent within motion-video-studio.
---

# Creative Direction

Biến mục tiêu kinh doanh, nội dung và khán giả thành trải nghiệm hình–lời–chuyển
động–âm thanh có chủ đích. Dùng khi phát triển hướng mới hoặc sửa ý đồ bản dựng;
không mở lại concept chỉ vì sửa kỹ thuật. Mặc định viết tiếng Việt có dấu.

## Vai trò trong Studio

Đọc case, nguồn, gói đã chọn và feedback trước khi hỏi. Khi sản xuất, dùng
[motion-video-studio](../../../.agents/skills/motion-video-studio/SKILL.md) làm
đầu mối engine, quyền, state, dependencies, QA và nghiệm thu. Skill này không
tạo runtime, director.json hay lịch sử duyệt riêng. Nếu chỉ tư vấn ý tưởng,
trả gói đề xuất và đánh dấu phần chưa xác minh; không init case/render.

Giữ policy case cũ. Case mới sunny-preview-v1: Sunny chọn gói sáng tạo rồi chọn
mẫu chuyển động trước dựng toàn bộ. Personal Windows opt-in sunny-draft-v1:
Sunny duyệt creative/storyboard rồi duyệt đúng draft trước final, không thêm
motion-sample gate. Đọc policy thật từ Studio; không thêm gate brief/concept/beat/storyboard.
Thiết kế hình và âm cùng nhau, nhưng sản xuất theo dependency và đo audio thật
trước khóa timing. Người thật nói giữ nguyên giọng và ý nghĩa nguồn.

## Từ mục tiêu tới ý tưởng

Chỉ nạp module của bước: concept dùng references M khi cần; gói dùng
creative-package; xem mẫu dùng review. Resume đọc checkpoint Studio và quyết định
thật, không tái phát triển toàn gói từ chat. Tái dùng source/brand/script đã pin;
energy/carry là cột trong beat sheet, không thêm file/state/gate riêng.

1. Viết ngắn: vấn đề kinh doanh; người xem và hoàn cảnh xem; họ đang biết/tin/lo
   gì; xem xong cần hiểu/nhớ/cảm thấy/làm gì; một thông điệp; bằng chứng; ưu tiên
   khi phải đánh đổi. Phân biệt mục tiêu truyền thông với kết quả kinh doanh
   chưa đo. Hỏi gộp điều thiếu có ảnh hưởng lớn, không bắt Sunny điền form.
2. Kiểm nguồn claim, giới hạn minh họa và quyền dùng bằng nguồn thật. Không
   suy screenshot thành chứng minh tính năng; giữ source-map hiện có làm nguồn
   sự thật duy nhất. Ẩn dụ không được tạo ra số liệu hay kết quả chưa xác minh.
3. Tìm concept từ hành vi, chất liệu, khoảnh khắc thành công, ngôn ngữ và tài
   sản riêng của chủ thể. Đưa các hướng khác nhau về cơ chế kể khi có đánh đổi
   thật; không ép ba hướng hoặc chấm điểm trọng số giả chính xác. Khuyến nghị
   một hướng, nêu hình mở đầu, diễn biến, điểm nhấn, vai trò âm và tính khả thi.
4. Với product/brand motion, đọc [motionmaxxing.md](references/motionmaxxing.md).
   Kiểm xem thay thương hiệu khác còn hợp không; đây là câu hỏi về độ cụ thể,
   không phải điều kiện fail cho mọi bài giảng, phỏng vấn hay nội dung cộng đồng.

## Thiết kế trải nghiệm và bàn giao

Dùng [creative-package.md](references/creative-package.md) để trình gói dễ xem:
lập luận ngắn, script/VO, storyboard có hình, beat sheet audiovisual, style và
những ý đồ cần giữ. Tái sử dụng file của case, không nhân đôi dữ liệu.
Không gọi mô tả bằng chữ là storyboard có hình. Nếu chưa tạo được hình, ghi gói
chưa đủ để duyệt theo Studio; vẫn đưa nội dung độc lập đã hoàn thành.

Mỗi beat phải giải thích người xem nhận ra gì và hình/âm nào tạo ra điều đó.
Chọn kênh truyền đạt chính; không đọc lại mọi chữ trên hình. Để khoảng nghỉ
khi có ích. VO có/không là lựa chọn sáng tạo trong gói, không là fallback lỗi
provider. Không áp mọi video vào hook–pain–solution hay một vật thể xuyên suốt.

Chốt ý nghĩa và quan hệ nhân quả; timing trước audio là dự kiến. Đề xuất engine
khả thi theo Studio, biết giới hạn công cụ nhưng không thay concept bằng tên
hiệu ứng. Thử cảnh khó đại diện cho ý tưởng, không chỉ cảnh đẹp dễ làm.

## Theo ý đồ đến bản dựng

Đọc [review.md](references/review.md) khi xem mẫu hoặc bản dựng. Kiểm hình/âm
thật đúng phiên bản, khả năng hiểu và sự nhất quán với gói đã chọn. Sửa nguyên
nhân theo thứ tự: sai nội dung → sai ý đồ → mạch kể → phân cấp → timing → polish.
Sửa kỹ thuật trong hướng đã chọn tự xử lý; thay thông điệp, lời, giọng hoặc look
quan trọng quay về quyết định liên quan trong Studio, làm stale dependencies.

Không coi phản hồi persona AI là người xem thật, dự báo retention hay conversion.
Technical PASS không thay Sunny acceptance. Feedback chỉ là tín hiệu theo case;
chỉ Sunny xác nhận lesson đúng scope trong knowledge root, không ghi system memory.
