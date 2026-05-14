# World Cup History Timeline

## Goal
Chuyển đổi dự án thành một trải nghiệm "Interactive Timeline" (Dòng thời gian tương tác) kể về lịch sử các kỳ World Cup từ 1930 đến 2022, mang phong cách thiết kế cao cấp, hiện đại và tập trung vào nghệ thuật kể chuyện (Storytelling).

## Kiến trúc (Đề xuất)
- **Tech Stack:** Giữ nguyên Vue 3 + Vite + Tailwind CSS v4.
- **Data:** Xây dựng file JSON lưu trữ sự kiện theo từng năm (Năm, Chủ nhà, Nhà vô địch, Vua phá lưới, Tỉ số chung kết, Câu chuyện nổi bật).
- **UI/UX:** Sử dụng hiệu ứng Vertical Scroll (Cuộn dọc) với Sticky Headers cho từng thập kỷ/năm. Không gian màu tối (Dark mode) sang trọng với các điểm nhấn màu Vàng Đồng (Gold) tượng trưng cho cúp vàng.

## Tasks
- [x] Task 1: Dọn dẹp lại code cũ (xóa tính năng Lineup Builder) và tạo cấu trúc dữ liệu `src/data/history.json` chứa thông tin các kỳ World Cup.
- [x] Task 2: Xây dựng component `TimelineList.vue` - trục thời gian dọc để người dùng cuộn xem danh sách các năm tổ chức.
- [x] Task 3: Xây dựng component `TournamentCard.vue` - hiển thị chi tiết thông tin khi người dùng tập trung vào một năm cụ thể (hiển thị cờ, tỉ số, cầu thủ nổi bật).
- [ ] Task 4: Lắp ráp vào `App.vue`, thêm hiệu ứng chuyển động (animations) mượt mà bằng Tailwind (fade-in, slide-up) và hoàn thiện phần credit tác giả (mtdes23).

## Done When
- [ ] Người dùng có thể cuộn từ 1930 đến 2022, xem nhanh được lịch sử của mọi giải đấu với giao diện "wow", mượt mà trên cả Mobile và Desktop.
