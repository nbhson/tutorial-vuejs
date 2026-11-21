# Filters — Bộ lọc (⚠️ ĐÃ BỊ LOẠI BỎ trong Vue 3)

> **Yêu cầu:** Vue 3.x
> **Bài trước:** [`1_custom-directive`](../1_custom-directive/README.md) · **Bài sau:** [`3_mixins`](../3_mixins/README.md)

---

## ⚠️ Bài học về tính năng ĐÃ XÓA

> **Filters (`{{ value | currency }}`) đã bị LOẠI BỎ khỏi Vue 3.**
>
> Vue 2 cho phép đặt "bộ lọc" vào cuối biểu thức interpolation để định dạng hiển thị. Vue 3 xóa hẳn cú pháp `|` — khi bạn viết `{{ price | currency }}` trong Vue 3, biên dịch sẽ hiểu `currency` là **phép OR bit trên một biến** chứ không phải filter → kết quả sai ngầm, khó phát hiện.
>
> **Thay thế chính thức:** **computed properties** (khuyến nghị) hoặc **methods**. Với định dạng toàn cục, dùng phương thức toàn cục hoặc thư viện chuyên dụng.

---

## 1. Filters hoạt động thế nào trong Vue 2? (bối cảnh lịch sử)

Mục này là "ngăn kỷ vật": xem filter từng chạy ra sao trong Vue 2 để khi gặp code cũ bạn hiểu ngay nó đang làm gì.

> 📄 **Code ví dụ:** [`examples/01-1-filters-hoat-ong-the-nao-trong-vue.js`](examples/01-1-filters-hoat-ong-the-nao-trong-vue.js)

> 📄 **Code ví dụ:** [`examples/02-1-filters-hoat-ong-the-nao-trong-vue.js`](examples/02-1-filters-hoat-ong-the-nao-trong-vue.js)

> 📄 **Code ví dụ:** [`examples/03-1-filters-hoat-ong-the-nao-trong-vue.js`](examples/03-1-filters-hoat-ong-the-nao-trong-vue.js)

Filters trông "gọn" nhưng có những nhược điểm khiến nhóm Vue quyết định xóa:

| Nhược điểm | Giải thích |
|---|---|
| Chỉ dùng được trong template | Không tái sử dụng được trong JS logic |
| Cú pháp `|` mâu thuẫn với JS bitwise OR | Khó static analysis, dễ hiểu nhầm |
| Khó type-check | Không có kiểu dữ liệu vào/ra |
| Dễ lạm dụng thành "pipe" phức tạp | Chuỗi filter dài rất khó debug |

> **Cách đọc bảng này:** cột trái là "căn bệnh", cột phải là "hậu quả" — bốn căn bệnh này cộng lại khiến nhóm Vue quyết định mổ xóa filter khỏi Vue 3.

> **Tóm gọn 1 câu:** Filter Vue 2 là "ống lồng cắm ngoài template" — nhìn gọn nhưng không tái sử dụng, không có kiểu, và dễ va cú pháp OR bitwise.

---

## 2. Thay thế 1 — Computed property (chuẩn, khuyến nghị)

Mục này nói về "người thừa kế chính thức": computed làm đúng việc filter từng làm — biến đổi dữ liệu để hiển thị — nhưng có cache, có kiểu và dùng được cả trong script.

Computed là lựa chọn chính thức thay filter: có kiểu, có cache, dùng được cả trong template lẫn script.

> 📄 **Code ví dụ:** [`examples/04-2-thay-the-1-computed-property-chuan-khuyen.vue`](examples/04-2-thay-the-1-computed-property-chuan-khuyen.vue)

📌 Khi dữ liệu cần **định dạng để hiển thị cùng một công thức nhiều lần** — computed luôn là lựa chọn đầu tiên. Chi tiết: [`1_essentials/5_computed`](../../1_essentials/5_computed/README.md).

> **Tóm gọn 1 câu:** Filter cũ thay bằng computed: cùng công thức hiển thị, nhưng có cache, có kiểu và gọi được cả trong script.

---

## 3. Thay thế 2 — Methods (khi cần tham số hoặc gọi với đối số khác nhau)

Mục này nói về phương án linh hoạt hơn: khi mỗi lần định dạng cần tham số khác nhau, method thay filter "có đối số".

> 📄 **Code ví dụ:** [`examples/05-3-thay-the-2-methods-khi-can-tham.vue`](examples/05-3-thay-the-2-methods-khi-can-tham.vue)

Khác computed: methods **không cache** — mỗi lần render gọi lại. Với tính toán nặng + dữ liệu lớn, ưu tiên computed.

> **Tóm gọn 1 câu:** Cần tham số khác nhau mỗi lần gọi thì dùng method — nhớ đánh đổi: không cache, tính nặng dễ ì.

---

## 4. Thay thế 3 — Hàm định dạng toàn cục (thay "global filter")

Mục này nói về cách thay "global filter" của Vue 2 bằng cách làm chuẩn industry: một module hàm thuần TypeScript, component nào cần thì import.

Nếu dự án có nhiều component dùng chung cùng định dạng, đưa vào một module:

> 📄 **Code ví dụ:** [`examples/06-4-thay-the-3-ham-inh-dang-toan.ts`](examples/06-4-thay-the-3-ham-inh-dang-toan.ts)

> 📄 **Code ví dụ:** [`examples/07-4-thay-the-3-ham-inh-dang-toan.vue`](examples/07-4-thay-the-3-ham-inh-dang-toan.vue)

**Ưu điểm so với global filter của Vue 2:** hàm thuần TypeScript, có kiểu, test được bằng Vitest, không phụ thuộc framework.

> 💡 Định dạng ngày tháng/số phức tạp → dùng thư viện: `date-fns` (nhẹ, tree-shakable) thay vì tự viết `formatDate` đầy đủ.

---

## 5. Thay thế 4 — Global Properties (nếu bạn dùng Options API nhiều)

Mục này nói về "cầu tạm" cho ai còn ở Options API: gắn hàm lên `globalProperties` để gọi trong mọi template — tiện nhưng có giá.

Khi muốn gọi "hàm toàn cục" trong mọi template Options API:

> 📄 **Code ví dụ:** [`examples/08-5-thay-the-4-global-properties-neu-ban.ts`](examples/08-5-thay-the-4-global-properties-neu-ban.ts)

> 📄 **Code ví dụ:** [`examples/09-5-thay-the-4-global-properties-neu-ban.vue`](examples/09-5-thay-the-4-global-properties-neu-ban.vue)

> ⚠️ `globalProperties` chỉ là "băng cứu trợ" cho options API — nó không có kiểu trong template và che giấu phụ thuộc. Với dự án `<script setup>`, import trực tiếp như mục 4 vẫn tốt hơn.

---

## 6. Thay thế 5 — Directive nếu cần "định dạng khi hiển thị" theo DOM

Mục này nói về trường hợp đặc biệt: định dạng đụng trực tiếp DOM (ví dụ định dạng số ngay khi người dùng gõ) thì directive mới là công cụ phù hợp.

Filter Vue 2 chủ yếu dùng trong `{{ }}`. Với việc **định dạng nội dung text** của phần tử (ví dụ auto-định dạng số khi người dùng gõ), custom directive là lựa chọn:

> 📄 **Code ví dụ:** [`examples/10-6-thay-the-5-directive-neu-can-inh.vue`](examples/10-6-thay-the-5-directive-neu-can-inh.vue)

Chi tiết custom directive: [`1_custom-directive`](../1_custom-directive/README.md).

---

## 7. Tham chiếu chuyển đổi Vue 2 → Vue 3

Mục này là "cuốn từ điển dịch" filter cũ sang cú pháp mới — khi refactor, dò từng dòng để thay thế.

| Vue 2 (filter) | Vue 3 (thay thế) |
|---|---|
| `{{ value \| currency }}` | `{{ formatCurrency(value) }}` (method/computed/import) |
| `{{ value \| currency('USD') }}` | `{{ formatCurrency(value, 'USD') }}` |
| `{{ v \| f1 \| f2 }}` | computed phức tạp hơn hoặc gọi nối hàm `f2(f1(v))` |
| `filters: { ... }` trong options | Hết hiệu lực — chuyển sang module hàm thuần |
| `Vue.filter('name', fn)` | Module `utils/format.ts` + import ở từng component |

> **Cách đọc bảng này:** cột trái là cú pháp cũ bạn gặp trong code Vue 2, cột phải là bản dịch sang Vue 3 — dò từng dòng khi refactor, không cần học thuộc.

### Bảng quyết định nhanh

Mục này trả lời "vậy chọn cái nào?" — mỗi tình huống một phương án tối ưu.

| Tình huống | Chọn |
|---|---|
| Giá trị hiển thị phụ thuộc state, tính nặng | **computed** |
| Định dạng có tham số, dùng thưa | **method** |
| Định dạng dùng chung nhiều component | **module hàm thuần** (`utils/`) |
| Định dạng ngày/số chuyên sâu | **date-fns / Intl API** |
| Định dạng hành vi DOM | **custom directive** |

> **Cách đọc bảng này:** cột trái mô tả tình huống của bạn, cột phải là công cụ nên cầm — dò hàng ngang, chọn xong quay lại section tương ứng xem cách làm.

> **Tóm gọn 1 câu:** Filter đã chết, thay thế có năm người: computed, method, module hàm thuần, thư viện chuyên dụng, và directive — chọn theo tình huống trong bảng quyết định.

---

## 8. Sơ đồ migration từ filter cũ

Mục này là "sơ đồ chỉ đường" cho cả một đợt refactor: nhìn tổng thể filter cũ nằm ở đâu để chọn đường chuyển đúng.

```
Dự án Vue 2 có filter
        │
        ├─ Filter chỉ dùng trong 1 component?
        │     → computed hoặc method trong component đó
        │
        ├─ Filter dùng chung nhiều component?
        │     → đưa vào utils/format.ts, import ở từng nơi
        │
        └─ Filter thao tác trực tiếp DOM/attribute?
              → custom directive
```

Trong khi refactor, tìm nhanh chỗ dùng filter cũ:

> 📄 **Code ví dụ:** [`examples/11-8-so-o-migration-tu-filter-cu.sh`](examples/11-8-so-o-migration-tu-filter-cu.sh)

---

## Nguồn tham khảo

- Vue 3 migration — Filters removed: https://v3-migration.vuejs.org/breaking-changes/filters.html
- Computed Properties: https://vuejs.org/guide/essentials/computed.html
- Methods & Event Handlers: https://vuejs.org/guide/essentials/event-handling.html
- Custom Directives: https://vuejs.org/guide/reusability/custom-directives.html
- `Intl.NumberFormat` / `Intl.DateTimeFormat`: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl
