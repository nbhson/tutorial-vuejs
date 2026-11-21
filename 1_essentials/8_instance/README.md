# 1. Multiple Application Instances (Nhiều ứng dụng Vue trên 1 trang)

Mục này nói về trường hợp "một nhà nhiều hộ": một trang web có thể chạy song song nhiều app Vue độc lập. Đọc để biết khi nào nên tách thành nhiều app thay vì gộp làm một.

## Ý chính
Có thể tạo nhiều ứng dụng Vue độc lập trên cùng một trang web. Mỗi ứng dụng sẽ có:
- Cấu hình riêng.
- Phạm vi (scope) riêng biệt.

Hãy hình dung mỗi Vue app là **một hộp kính riêng**: nước không chảy từ hộp này sang hộp kia — config app A không ảnh hưởng app B, kể cả khi chúng nằm chung một trang. Giống như nhiều cửa hàng nhỏ cùng nằm trong một trung tâm thương mại: chung mái nhà, riêng sổ sách.

## Ví dụ
> 📄 **Code ví dụ:** [`examples/01-vi-du.js`](examples/01-vi-du.js)

**HTML:**
> 📄 **Code ví dụ:** [`examples/02-vi-du.html`](examples/02-vi-du.html)

> 👉 **Trường hợp sử dụng:**
> - Trang web lớn (legacy apps).
> - Chỉ cần tích hợp Vue cho một vài khu vực nhỏ trên giao diện.
> - Phù hợp với server-rendered HTML.

> **Tóm gọn 1 câu:** Nhiều Vue app trên một trang là nhiều "hộp kính" độc lập — riêng config, riêng scope, thích nhúng vào góc nào của trang cũng được.
