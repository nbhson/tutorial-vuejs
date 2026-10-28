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

```js
// ❌ Vue 2 — KHÔNG chạy trong Vue 3
{{ message | capitalize }}
{{ price | currency('EUR') }}              <!-- có tham số -->
{{ price | currency | round }}             <!-- chuỗi filter nối nhau -->
```

```js
// Vue 2 — khai báo filter cục bộ
export default {
  filters: {
    capitalize: (v) => v.charAt(0).toUpperCase() + v.slice(1),
  },
}
```

```js
// Vue 2 — khai báo filter toàn cục
Vue.filter('currency', (value, symbol = 'VND') => `${value.toLocaleString()} ${symbol}`)
```

Filters trông "gọn" nhưng có những nhược điểm khiến nhóm Vue quyết định xóa:

| Nhược điểm | Giải thích |
|---|---|
| Chỉ dùng được trong template | Không tái sử dụng được trong JS logic |
| Cú pháp `|` mâu thuẫn với JS bitwise OR | Khó static analysis, dễ hiểu nhầm |
| Khó type-check | Không có kiểu dữ liệu vào/ra |
| Dễ lạm dụng thành "pipe" phức tạp | Chuỗi filter dài rất khó debug |

---

## 2. Thay thế 1 — Computed property (chuẩn, khuyến nghị)

Computed là lựa chọn chính thức thay filter: có kiểu, có cache, dùng được cả trong template lẫn script.

```vue
<script setup>
import { computed } from 'vue'

const price = ref(1_200_000)
const message = ref('xin chào')

const formattedPrice = computed(() =>
  price.value.toLocaleString('vi-VN') + ' VND'
)

const capitalized = computed(() =>
  message.value.charAt(0).toUpperCase() + message.value.slice(1)
)
</script>

<template>
  <p>{{ formattedPrice }}</p>       <!-- "1.200.000 VND" -->
  <p>{{ capitalized }}</p>          <!-- "Xin chào" -->
</template>
```

📌 Khi dữ liệu cần **định dạng để hiển thị cùng một công thức nhiều lần** — computed luôn là lựa chọn đầu tiên. Chi tiết: [`1_essentials/5_computed`](../../1_essentials/5_computed/README.md).

---

## 3. Thay thế 2 — Methods (khi cần tham số hoặc gọi với đối số khác nhau)

```vue
<script setup>
function formatCurrency(value, currency = 'VND') {
  return new Intl.NumberFormat('vi-VN', { style: 'currency', currency }).format(value)
}
</script>

<template>
  <p>{{ formatCurrency(1200000) }}</p>          <!-- 1.200.000 ₫ -->
  <p>{{ formatCurrency(99, 'USD') }}</p>        <!-- $99,00 -->
</template>
```

Khác computed: methods **không cache** — mỗi lần render gọi lại. Với tính toán nặng + dữ liệu lớn, ưu tiên computed.

---

## 4. Thay thế 3 — Hàm định dạng toàn cục (thay "global filter")

Nếu dự án có nhiều component dùng chung cùng định dạng, đưa vào một module:

```ts
// utils/format.ts
export const formatCurrency = (v: number, currency = 'VND') =>
  new Intl.NumberFormat('vi-VN', { style: 'currency', currency }).format(v)

export const formatDate = (d: Date | string) =>
  new Intl.DateTimeFormat('vi-VN', { dateStyle: 'long' }).format(new Date(d))

export const capitalize = (s: string) => s.charAt(0).toUpperCase() + s.slice(1)
```

```vue
<script setup>
import { formatCurrency, formatDate, capitalize } from '@/utils/format'
</script>

<template>
  <p>{{ formatCurrency(order.total) }} — {{ formatDate(order.createdAt) }}</p>
</template>
```

**Ưu điểm so với global filter của Vue 2:** hàm thuần TypeScript, có kiểu, test được bằng Vitest, không phụ thuộc framework.

> 💡 Định dạng ngày tháng/số phức tạp → dùng thư viện: `date-fns` (nhẹ, tree-shakable) thay vì tự viết `formatDate` đầy đủ.

---

## 5. Thay thế 4 — Global Properties (nếu bạn dùng Options API nhiều)

Khi muốn gọi "hàm toàn cục" trong mọi template Options API:

```ts
// main.ts
import { createApp } from 'vue'
import { formatCurrency } from '@/utils/format'

const app = createApp(App)
app.config.globalProperties.$currency = formatCurrency   // ⚠️ chỉ dùng khi cần
app.mount('#app')
```

```vue
<!-- Options API template -->
<p>{{ $currency(1200000) }}</p>
```

> ⚠️ `globalProperties` chỉ là "băng cứu trợ" cho options API — nó không có kiểu trong template và che giấu phụ thuộc. Với dự án `<script setup>`, import trực tiếp như mục 4 vẫn tốt hơn.

---

## 6. Thay thế 5 — Directive nếu cần "định dạng khi hiển thị" theo DOM

Filter Vue 2 chủ yếu dùng trong `{{ }}`. Với việc **định dạng nội dung text** của phần tử (ví dụ auto-định dạng số khi người dùng gõ), custom directive là lựa chọn:

```vue
<script setup>
const vUppercase = {
  mounted: (el) => (el.style.textTransform = 'uppercase'),
}
</script>

<template>
  <p v-uppercase>chữ này sẽ in hoa</p>
</template>
```

Chi tiết custom directive: [`1_custom-directive`](../1_custom-directive/README.md).

---

## 7. Tham chiếu chuyển đổi Vue 2 → Vue 3

| Vue 2 (filter) | Vue 3 (thay thế) |
|---|---|
| `{{ value \| currency }}` | `{{ formatCurrency(value) }}` (method/computed/import) |
| `{{ value \| currency('USD') }}` | `{{ formatCurrency(value, 'USD') }}` |
| `{{ v \| f1 \| f2 }}` | computed phức tạp hơn hoặc gọi nối hàm `f2(f1(v))` |
| `filters: { ... }` trong options | Hết hiệu lực — chuyển sang module hàm thuần |
| `Vue.filter('name', fn)` | Module `utils/format.ts` + import ở từng component |

### Bảng quyết định nhanh

| Tình huống | Chọn |
|---|---|
| Giá trị hiển thị phụ thuộc state, tính nặng | **computed** |
| Định dạng có tham số, dùng thưa | **method** |
| Định dạng dùng chung nhiều component | **module hàm thuần** (`utils/`) |
| Định dạng ngày/số chuyên sâu | **date-fns / Intl API** |
| Định dạng hành vi DOM | **custom directive** |

---

## 8. Sơ đồ migration từ filter cũ

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

```bash
grep -rnE "\|\s*[a-zA-Z_]" src --include="*.vue"    # Đoạn "| tên" trong template
```

---

## Nguồn tham khảo

- Vue 3 migration — Filters removed: https://v3-migration.vuejs.org/breaking-changes/filters.html
- Computed Properties: https://vuejs.org/guide/essentials/computed.html
- Methods & Event Handlers: https://vuejs.org/guide/essentials/event-handling.html
- Custom Directives: https://vuejs.org/guide/reusability/custom-directives.html
- `Intl.NumberFormat` / `Intl.DateTimeFormat`: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl
