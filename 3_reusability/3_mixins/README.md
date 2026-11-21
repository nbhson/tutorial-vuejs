# Mixins — Trộn logic dùng chung (⚠️ legacy — khuyến nghị Composables)

> **Yêu cầu:** Vue 3.x
> **Bài trước:** [`2_filter`](../2_filter/README.md) · **Bài sau:** [`4_composables`](../4_composables/README.md)

---

## 📌 Tư cách của pattern này

> **Mixins vẫn hoạt động trong Vue 3 nhưng KHÔNG còn được khuyến nghị.**
>
> Tài liệu chính thức của Vue (Style Guide + trang Migration) gọi mixins là pattern khó bảo trì và khuyến nghị thay bằng **Composables** (Composition API). Bài này:
>
> 1. Giải thích mixins hoạt động ra sao — để bạn **đọc hiểu code cũ**;
> 2. Chỉ cách **nâng cấp** sang composables;
> 3. Liệt kê các bẫy của mixins để tránh đưa pattern này vào code mới.
>
> 👉 Nếu bạn đang viết tính năng mới, hãy đọc thẳng [`4_composables`](../4_composables/README.md).

---

## 1. Mixin là gì?

Mục này định nghĩa "món trộn": mixin là gói tùy chọn component được nhào vào nhiều component — như nêm sẵn gia vị chung cho nhiều nồi, tiện nhưng không ai nhìn ra món nào được nêm gì.

**Mixin** là một object chứa tùy chọn component (`data`, `methods`, `computed`, lifecycle hooks...) được **"trộn" vào** nhiều component dùng chung.

> 📄 **Code ví dụ:** [`examples/01-1-mixin-la-gi.js`](examples/01-1-mixin-la-gi.js)

> 📄 **Code ví dụ:** [`examples/02-1-mixin-la-gi.vue`](examples/02-1-mixin-la-gi.vue)

Vấn đề ngay lập tức nhìn thấy: component dùng `isHover`/`onHover` mà **không khai báo ở đâu cả** — chúng đến từ mixin, "tàng hình" với người đọc code.

> **Tóm gọn 1 câu:** Mixin là "gia vị nêm sẵn" — logic có mặt ở khắp nơi nhưng nguồn gốc thì tàng hình.

---

## 2. Quy tắc trộn (merge strategy)

Mục này nói về "luật chia tài sản" khi component và mixin cùng có một tùy chọn: ai thắng, ai chạy trước đều có quy ước rõ ràng.

Khi component và mixin có cùng tùy chọn, Vue quy ước:

| Tùy chọn | Hành vi khi trùng |
|---|---|
| `data` | Đệ quy gộp; **component thắng** khi trùng key |
| Lifecycle hooks | **Chạy cả hai**, mixin hook chạy **trước** hook của component |
| `methods` / `computed` / `components` | Gộp object; **component thắng** khi trùng tên |
| `watch` | Các watcher cùng tên đều chạy |

> **Cách đọc bảng này:** cột trái là tùy chọn bị trùng, cột phải là phán quyết của Vue — nhớ quy tắc chung: hầu hết các trường hợp component thắng, riêng lifecycle thì cả hai cùng chạy.

> **Tóm gọn 1 câu:** Khi trùng tên, component luôn thắng trừ lifecycle — cả hai hook cùng chạy, mixin chạy trước.

> 📄 **Code ví dụ:** [`examples/03-2-quy-tac-tron-merge-strategy.js`](examples/03-2-quy-tac-tron-merge-strategy.js)

📌 **Dấu hiệu nhận biết khi đọc code cũ:** một component "tự nhiên" có method/hook bạn không thấy khai báo ở đâu → nghi ngờ mixin. Tìm `mixins: [...]` trong file và mở mixin đó ra.

---

## 3. Bẫy của mixins — vì sao bị "ghét"

Mục này điểm danh năm "tội" khiến mixins bị ghi danh thành legacy — mỗi bẫy là một lần bạn ngồi debug mà không tìm ra nguồn gốc code.

| Bẫy | Mô tả |
|---|---|
| **Nguồn ẩn** | Biến/method trong mixin không thấy trong component — tìm kiếm "trên máy" không ra |
| **Xung đột tên** | Hai mixin cùng khai `formatDate` → im lặng ghi đè nhau theo thứ tự |
| **Phụ thuộc chéo** | Mixin dùng `this.title` nhưng không component nào khai báo nó rõ ràng |
| **Không có kiểu** | TypeScript không suy luận được dữ liệu mixin cung cấp |
| **Khó tái sử dụng có chọn lọc** | Không thể "lấy mỗi `formatter()` của mixin" — nhận cả xà lách |

> **Cách đọc bảng này:** năm hàng là năm cách mixin "gài bẫy" — cột Mô tả nói rõ nó biểu hiện ra sao khi bạn đọc code; đọc từ trên xuống sẽ thấy chúng đều xuất phát từ một gốc: nguồn logic không tường minh.

Cùng một logic "hover" viết theo 2 cách để so sánh:

### Mixin (cũ)

> 📄 **Code ví dụ:** [`examples/04-mixin-cu.js`](examples/04-mixin-cu.js)

> 📄 **Code ví dụ:** [`examples/05-mixin-cu.vue`](examples/05-mixin-cu.vue)

### Composable tương đương

> 📄 **Code ví dụ:** [`examples/06-composable-tuong-uong.ts`](examples/06-composable-tuong-uong.ts)

> 📄 **Code ví dụ:** [`examples/07-composable-tuong-uong.vue`](examples/07-composable-tuong-uong.vue)

> **Tóm gọn 1 câu:** So sánh hai đoạn code là thấy ngay: cùng một logic hover, composable để lại dấu vết rõ ràng còn mixin để lại "vết ma" trong component.

---

## 4. Dẫn đường nâng cấp mixin → composable

Mục này là "sổ tay phẫu thuật": chuyển từng bộ phận của mixin (data, computed, methods, hooks) sang hình thái tương ứng của composable.

Quy trình từng bước cho một mixin điển hình:

```
mixins/fetch-user.js  (Vue 2)
        │
        ├── 1. Xác định "state" trong mixin (data)      → biến ref/reactive
        ├── 2. Xác định "computed" trong mixin          → computed()
        ├── 3. Xác định "methods"                        → hàm thường
        └── 4. Lifecycle hooks (mounted/unmounted...)    → onMounted/onUnmounted
              │
              ▼
composables/useFetchUser.ts (Vue 3)
```

> 📄 **Code ví dụ:** [`examples/08-4-dan-uong-nang-cap-mixin-composable.ts`](examples/08-4-dan-uong-nang-cap-mixin-composable.ts)

> 📄 **Code ví dụ:** [`examples/09-4-dan-uong-nang-cap-mixin-composable.ts`](examples/09-4-dan-uong-nang-cap-mixin-composable.ts)

> 📄 **Code ví dụ:** [`examples/10-4-dan-uong-nang-cap-mixin-composable.vue`](examples/10-4-dan-uong-nang-cap-mixin-composable.vue)

📌 Lợi ích thấy ngay khi refactor: composable trả về **đúng những gì component cần** — không còn "trôi" data/method thừa, đồng thời có type và auto-complete.

> **Tóm gọn 1 câu:** Nâng cấp mixin là "tháo đồ khỏi thùng chung, chia từng hộp có nhãn": data → ref, computed → computed(), methods → hàm, hooks → onMounted/onUnmounted.

---

## 5. Bảng tổng hợp — mixins vs composables

Mục này là "phiên tòa cuối cùng" so sánh hai pattern qua sáu tiêu chí — đọc xong bạn sẽ hiểu vì sao Vue chính thức chuyển hướng.

| Tiêu chí | Mixin | Composable |
|---|---|---|
| Nguồn logic | Ẩn (nạp từ object) | Tường minh qua import + destructure |
| Đặt tên trùng | Xung đột, im lặng | Có thể đổi tên lúc gọi |
| Truyền tham số | Khó (chỉ qua props/data) | Tham số hàm bình thường |
| TypeScript | Gần như không hỗ trợ | Suy kiểu tự nhiên |
| Tái sử dụng chọn lọc | Không | Có — gọi đúng hàm cần |
| Tư cách trong Vue 3 | Hoạt động, **không khuyến nghị** | ✅ Khuyến nghị chính thức |

> **Cách đọc bảng này:** so sánh theo cột — mỗi dòng là một tiêu chí, nhìn sang cột Composable sẽ thấy mọi nhược điểm của mixin đều được hóa giải; đọc từ trên xuống là một màn trình diễn "mixin thua từng hiệp".

---

## 6. Trường hợp "mixins vẫn ổn"?

Mục này là góc ngoại lệ: hai tình huống hiếm hoi mà giữ mixin tạm thời là quyết định hợp lý — và cách chuyển dần an toàn.

Trong thực tế hiếm khi cần giữ mixin, trừ khi:

- Dự án viết thuần Options API và chưa sẵn sàng chuyển sang Composition API (nên cân nhắc: mixins vẫn hợp lệ).
- Code cũ rất lớn, chưa kịp refactor — **giữ nguyên mixin, tài liệu hóa, lên kế hoạch chuyển dần**. Đừng sửa một lúc cả nghìn dòng.

Quy tắc thực chiến: **tính năng mới không dùng mixin nữa**; mixin cũ chỉ chạm vào khi sửa chức năng liên quan, mỗi lần chạm thì chuyển dần sang composable.

> **Tóm gọn 1 câu:** Mixin cũ như đồ đạc cũ trong nhà — không vội đập bỏ hết, nhưng mua sắm mới thì nhất định mua kiểu composable.

---

## Nguồn tham khảo

- Composables (thay thế khuyến nghị): https://vuejs.org/guide/reusability/composables.html
- Vue 3 migration — Mixins vẫn hoạt động nhưng khuyến nghị composables: https://v3-migration.vuejs.org/
- Style Guide — custom directives/composables ưu tiên: https://vuejs.org/style-guide/
- So sánh chi tiết mixin vs composable: https://vuejs.org/guide/reusability/composables.html#vs-mixins
