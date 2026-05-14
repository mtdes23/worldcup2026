# World Cup 2026 Lineup Builder

## Goal
Xây dựng ứng dụng "World Cup 2026 All In One" hiệu năng cao, cho phép người dùng tự do xếp đội hình, lưu trữ lịch sử cá nhân và xuất ảnh chia sẻ mạng xã hội (tích hợp credit tác giả).

## Kiến trúc tự động tối ưu (Đề xuất)
- **Tech Stack:** Vue 3 + Vite + Tailwind CSS (Tận dụng sự quen thuộc của bạn với Vue 3 từ dự án cũ, đảm bảo tốc độ phát triển và hiệu năng).
- **Data:** Sử dụng file JSON tĩnh cho MVP (Tránh chi phí Server/Database, tốc độ tải cực nhanh).
- **Storage:** LocalStorage (Trải nghiệm mượt mà không bắt người dùng phải đăng nhập gây phiền hà).
- **Sharing:** Xuất ảnh Client-side bằng `html2canvas` (Giảm chi phí Server, xuất file ảnh PNG/JPG trực tiếp trên máy người dùng kèm Watermark).

## Tasks
- [x] Task 1: Khởi tạo dự án Vue 3 + Vite + Tailwind CSS, cấu hình thư mục cơ bản → Verify: Chạy `npm run dev` hiển thị trang chủ.
- [x] Task 2: Xây dựng cấu trúc dữ liệu JSON (Mock data đội tuyển & cầu thủ) và Store (Pinia) → Verify: Load thành công danh sách cầu thủ vào State.
- [ ] Task 3: Phát triển UI Sân bóng (Pitch Diagram) và tính năng chọn cầu thủ vào vị trí sơ đồ (VD: 4-3-3, 4-2-3-1) → Verify: Cầu thủ hiển thị đúng vị trí trên sân cỏ.
- [ ] Task 4: Xây dựng tính năng Lưu/Tải lịch sử đội hình bằng LocalStorage → Verify: F5 tải lại trang, đội hình cũ vẫn được phục hồi.
- [ ] Task 5: Tích hợp chức năng Xuất Ảnh (Export to Image) với Watermark "Designed by mtdes23 | www.mtdes23.id.vn" → Verify: Bấm nút "Share", tải xuống thành công ảnh PNG rõ nét.

## Done When
- [ ] Ứng dụng chạy mượt mà trên cả Mobile và Desktop.
- [ ] Người dùng chọn sơ đồ, ghép đủ 11 người, lưu lại thành công và xuất ra ảnh hoàn chỉnh có bản quyền của tác giả.
