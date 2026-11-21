Dưới đây là bản tóm tắt đầy đủ – chi tiết – dễ hiểu bài Watchers (Vue 3), kèm ví dụ minh họa cho từng phần, dựa đúng theo nội dung trang Vue chính thức bạn đang xem.

# 1. Watchers là gì? Dùng khi nào?

Mục này mở bài: watcher là "người canh cửa" của dữ liệu — khi dữ liệu đổi, nó thi hành lệnh bạn dặn sẵn.

## Khái niệm

Watchers dùng để theo dõi sự thay đổi của dữ liệu reactive và thực hiện side effects (tác động phụ) khi dữ liệu đó thay đổi.

Ví von: computed là **người bán hàng** (sinh giá trị), còn watcher là **bảo vệ trực tổng đài** — không sinh ra gì cả, chỉ việc "có biến động thì gọi người, chạy tác vụ".

Side effects thường là:

- Gọi API
- Cập nhật state khác
- Thao tác DOM
- Ghi log, debounce, throttle…

## Khi nào dùng watcher?

- Khi computed không phù hợp (computed chỉ dùng để trả về giá trị).
- Khi bạn cần thực thi logic khi dữ liệu thay đổi (đặc biệt là async).

> **Tóm gọn 1 câu:** Watcher = "bảo vệ trực tổng đài": đứng canh một nguồn dữ liệu, có biến động thì chạy side effect — những việc computed không được phép làm.

# 2. Watcher với Options API (watch option)

## Cách dùng

- Khai báo trong `watch`
- Key là tên biến reactive
- Value là function được gọi khi biến thay đổi

## Ví dụ

> 📄 **Code ví dụ:** [`examples/01-vi-du.js`](examples/01-vi-du.js)

> 📌 newVal: giá trị mới
> 📌 oldVal: giá trị cũ

# 3. Watcher với Composition API (watch())

## Cú pháp

> 📄 **Code ví dụ:** [`examples/02-cu-phap.js`](examples/02-cu-phap.js)

- `source`: ref / reactive / getter / array
- `callback`: hàm chạy khi source đổi

## Ví dụ cơ bản

> 📄 **Code ví dụ:** [`examples/03-vi-du-co-ban.js`](examples/03-vi-du-co-ban.js)

# 4. Các loại Watch Source

## 4.1 Watch một ref

> 📄 **Code ví dụ:** [`examples/04-4-1-watch-mot-ref.js`](examples/04-4-1-watch-mot-ref.js)

## 4.2 Watch bằng getter (phổ biến & an toàn)

> 📄 **Code ví dụ:** [`examples/05-4-2-watch-bang-getter-pho-bien-an.js`](examples/05-4-2-watch-bang-getter-pho-bien-an.js)

❌ Sai (KHÔNG hoạt động):

> 📄 **Code ví dụ:** [`examples/06-4-2-watch-bang-getter-pho-bien-an.js`](examples/06-4-2-watch-bang-getter-pho-bien-an.js)

## 4.3 Watch nhiều nguồn (array)

> 📄 **Code ví dụ:** [`examples/07-4-3-watch-nhieu-nguon-array.js`](examples/07-4-3-watch-nhieu-nguon-array.js)

# 5. Deep Watchers (watch sâu)

Mục này nói về cách canh được cả "từng ngăn kéo bên trong tủ", chứ không chỉ biết tủ bị thay nguyên cái.

## Mặc định

- Watcher chỉ trigger khi object bị thay thế
- ❌ Không trigger khi property bên trong thay đổi

Hình dung: watcher mặc định chỉ "chú ý khi cả chiếc tủ bị khiêng đi" (thay object mới), chứ không biết "ai đó mở ngăn kéo lấy áo" (đổi property bên trong). Deep watcher buộc nó soi cả từng ngăn.

## 5.1 Deep watcher với Options API

> 📄 **Code ví dụ:** [`examples/08-5-1-deep-watcher-voi-options-api.js`](examples/08-5-1-deep-watcher-voi-options-api.js)

## 5.2 Deep watcher với Composition API

> 📄 **Code ví dụ:** [`examples/09-5-2-deep-watcher-voi-composition-api.js`](examples/09-5-2-deep-watcher-voi-composition-api.js)

> ⚠️ Cảnh báo hiệu năng
>
> - Deep watch rất tốn tài nguyên
> - Chỉ dùng khi thật sự cần

# 6. Eager Watchers (immediate)

## Mặc định

Watcher chỉ chạy khi dữ liệu thay đổi

`immediate: true`

Chạy ngay khi component được tạo

> 📄 **Code ví dụ:** [`examples/10-mac-inh.js`](examples/10-mac-inh.js)

> 📌 Thường dùng để:
>
> - Fetch dữ liệu ban đầu
> - Đồng bộ state ngay từ đầu

# 7. Once Watchers (once: true) – Vue 3.4+

Chỉ chạy 1 lần duy nhất

> 📄 **Code ví dụ:** [`examples/11-7-once-watchers-once-true-vue-3-4.js`](examples/11-7-once-watchers-once-true-vue-3-4.js)

# 8. watchEffect()

## Ý tưởng

- Tự động theo dõi dependency
- Không cần chỉ định source

## Ví dụ

> 📄 **Code ví dụ:** [`examples/12-vi-du.js`](examples/12-vi-du.js)

> 📌
>
> - Chạy ngay lập tức
> - Tự động re-run khi dependency thay đổi

## So sánh watch vs watchEffect

| watch | watchEffect |
| :--- | :--- |
| Cần source rõ ràng | Tự động detect |
| Kiểm soát chính xác | Code ngắn gọn |
| Không auto run | Auto run |

> **Cách đọc bảng này:** bảng so cột đối cột — cột trái là ưu điểm của `watch`, cột phải là của `watchEffect`. Chọn theo nhu cầu: cần kiểm soát chặt thì cột trái, cần code ngắn thì cột phải.

🧠 So sánh với watch()

Nếu bạn muốn theo dõi chính xác một biến, hãy dùng watch:

> 📄 **Code ví dụ:** [`examples/13-so-sanh-watch-vs-watcheffect.js`](examples/13-so-sanh-watch-vs-watcheffect.js)

✔ Rõ ràng
✔ Không bị hiểu nhầm dependency
✔ An toàn với async

🔑 Kết luận ngắn gọn

🔹 watchEffect chỉ phụ thuộc vào reactive state được READ
🔹 Trong ví dụ này, dependency duy nhất là id.value
🔹 data.value KHÔNG làm watchEffect re-run

# 9. Cleanup side effects (hủy tác vụ cũ)

Mục này nói về "lỗi đua kết quả" kinh điển của async — và cách Vue cho bạn một cơ chế hủy tác vụ cũ đúng lúc.

## Vấn đề

API cũ trả về sau khi state đã đổi → dữ liệu sai

Ví von: giống như **gọi hai chiếc taxi liên tiếp** — chiếc gọi sau mới là bạn muốn, nhưng chiếc gọi trước (chậm hơn) tới sau và "đón nhầm" bạn.

## Giải pháp với onCleanup

> 📄 **Code ví dụ:** [`examples/14-giai-phap-voi-oncleanup.js`](examples/14-giai-phap-voi-oncleanup.js)

> 📌 Rất quan trọng khi làm async

> **Tóm gọn 1 câu:** Mỗi lần watcher chạy lại, dùng `onCleanup` để "hủy chuyến cũ" — tránh kết quả của request cũ ghi đè lên request mới.

# 10. Thời điểm chạy watcher (flush)

## Mặc định

Chạy trước khi DOM cập nhật

## `flush: 'post'` – sau DOM update

> 📄 **Code ví dụ:** [`examples/15-flush-post-sau-dom-update.js`](examples/15-flush-post-sau-dom-update.js)

## `flush: 'sync'` – chạy ngay lập tức

> 📄 **Code ví dụ:** [`examples/16-flush-sync-chay-ngay-lap-tuc.js`](examples/16-flush-sync-chay-ngay-lap-tuc.js)

> ⚠️ Không batching → dễ gây lag

# 11. $watch() – tạo watcher thủ công

> 📄 **Code ví dụ:** [`examples/17-11-watch-tao-watcher-thu-cong.js`](examples/17-11-watch-tao-watcher-thu-cong.js)

> 📌 Dùng khi:
>
> - Watch có điều kiện
> - Watch theo hành động người dùng

# 12. Dừng Watcher & Memory Leak

## Tự động dừng

- Watch khai báo trong `setup()` → tự dừng khi unmount

## Watch tạo async → phải dừng thủ công

> 📄 **Code ví dụ:** [`examples/18-watch-tao-async-phai-dung-thu-cong.js`](examples/18-watch-tao-async-phai-dung-thu-cong.js)

❌ Không nên:

> 📄 **Code ví dụ:** [`examples/19-watch-tao-async-phai-dung-thu-cong.js`](examples/19-watch-tao-async-phai-dung-thu-cong.js)

# 13. Best Practices (khuyến nghị)

✅ Dùng `watch` khi:

- Cần kiểm soát chính xác
- Logic phức tạp

✅ Dùng `watchEffect` khi:

- Nhiều dependency
- Code ngắn gọn

❌ Tránh:

- Deep watch không cần thiết
- Sync watcher với data lớn