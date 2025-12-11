Hướng dẫn tách nền và dùng ảnh làm logo

Mục tiêu:
- Tách nền ảnh (trong attachments) để được ảnh có nền trong suốt (PNG).
- Đặt file vào `public/logo.png` để ứng dụng dùng làm logo (Navbar sẽ hiển thị ảnh nếu có, ngược lại dùng chữ thay thế).

Các cách nhanh (khuyến nghị):
1) Remove.bg (nhanh, tự động)
- Truy cập https://www.remove.bg
- Upload ảnh gốc, tải về chọn định dạng PNG (transparent background).

2) Photopea (online, miễn phí, tương tự Photoshop)
- Truy cập https://www.photopea.com
- Mở ảnh -> chọn Magic Wand / Quick Selection để chọn nền -> Delete -> File › Export As › PNG

3) Photoshop / GIMP / Paint.NET / Paint 3D
- Dùng công cụ chọn nền và xóa, lưu dưới dạng PNG (transparency).

Lưu file:
- Đặt tên file là `logo.png` và đặt vào thư mục `public/` gốc của project.
- Kích thước gợi ý: chiều cao ~ 72–120px cho desktop (tập trung vào chiều cao), nhưng `Navbar` hiện dùng `className="h-12"` (48px). Bạn có thể xuất 2x (logo@2x.png) để retina, nhưng tên mặc định phải là `logo.png`.

Kiểm tra:
- Sau khi đặt file, chạy dev server:

```bash
npm run dev
```

- Mở trang, Navbar sẽ hiển thị ảnh nếu `public/logo.png` tồn tại và tải được. Nếu ảnh không tải được, Navbar sẽ fallback về chữ "PHƯƠNG COSMETICS".

Muốn tôi làm thay bạn?
- Tôi không thể tách nền trực tiếp nếu bạn chưa upload file PNG trong thư mục project. Nếu bạn muốn, upload file PNG (có nền trong suốt) vào `public/logo.png` ở đây, hoặc cho phép tôi truy cập file đính kèm để tạo file, tôi sẽ đưa vào `public/` giúp bạn.

Tùy chọn tinh chỉnh hiển thị (nếu cần tôi chỉnh code):
- Thay `h-12` trong `src/components/Navbar.jsx` để thay đổi chiều cao hiển thị.
- Nếu muốn logo khác cho chế độ tối/trắng, có thể thêm logic tải `logo-white.png` khi `isScrolled` là false.

