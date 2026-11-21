# Reactivity Fundamentals: ref() vs reactive()

Mục này trả lời câu hỏi căn bản nhất của Vue 3: làm sao để Vue "biết" khi dữ liệu thay đổi, và vì sao lại có tới hai công cụ `ref()` và `reactive()` cho cùng một việc đó.

Trong Vue 3, Reactivity (tính phản ứng) là cơ chế giúp Vue tự động cập nhật DOM khi trạng thái ứng dụng thay đổi. Để làm được điều này, Vue cần biết khi nào dữ liệu được đọc và khi nào nó bị thay đổi.

Hãy hình dung reactivity như **hệ thống camera trong kho hàng**: nhân viên (Vue) không phải đi soi từng ngăn (kiểm tra DOM thủ công) — cứ có ai lấy hàng hay đặt thêm hàng, camera báo ngay và hệ thống tự cập nhật bảng tồn kho (DOM).

**Mục đích cốt lõi (Why do they exist?):**
1.  **`reactive()`**: Là cách tiếp cận "tự nhiên" nhất của Vue với Reactivity System dựa trên **JavaScript Proxy**. Nó biến đổi cả một object thành một proxy để Vue có thể can thiệp (intercept) vào mọi thao tác đọc/ghi trên object đó. Mục đích là để **theo dõi sự thay đổi của các cấu trúc dữ liệu phức tạp (Objects, Arrays)**.
2.  **`ref()`**: Giải quyết một hạn chế của JavaScript: các kiểu dữ liệu nguyên thủy (number, string, boolean) được truyền theo giá trị (pass-by-value), không phải tham chiếu (pass-by-reference). Nếu bạn truyền một số `0` đi, Vue sẽ mất dấu nó. `ref()` ra đời với mục đích **tạo ra một "cái wrapper" (lớp vỏ bọc) dạng object** xung quanh giá trị nguyên thủy đó, giúp Vue có thể theo dõi được nó y như một object.

Tóm lại: `reactive` dùng sức mạnh của Proxy cho Objects, còn `ref` là giải pháp "đóng gói" để mang khả năng đó đến cho Primitives.

> **Tóm gọn 1 câu:** Vue cần "camera" theo dõi dữ liệu — `reactive` gắn camera cả căn nhà (object), còn `ref` là đóng gói món đồ lẻ (primitive) vào hộp có gắn camera.

## 1. `ref()`

Mục này nói về công cụ đa năng nhất: bọc **bất kỳ** giá trị nào vào một "hộp" để Vue theo dõi được.

`ref()` được sử dụng để tạo một tham chiếu phản ứng (reactive reference) cho **bất kỳ kiểu dữ liệu nào** (nguyên thủy hoặc đối tượng).

Ví von: `ref` giống như **hộp kính kiệng có khóa số** — đồ của bạn nằm bên trong (`.value`), muốn xem hay đổi đồ thì phải mở hộp (`count.value`), còn trong template thì Vue mở hộp giùm bạn sẵn.

### Đặc điểm:
- **Dữ liệu nguyên thủy (Primitives):** `String`, `Number`, `Boolean`, `null`, `undefined` chỉ có thể dùng `ref()`.
- **Truy cập:** Khi truy cập giá trị của `ref` trong `<script>`, bạn phải dùng `.value`. Trong `<template>`, Vue sẽ tự động "mở gói" (unwrap) nên không cần `.value`.
- **Cơ chế:** `ref` tạo ra một object bao bọc giá trị thực sự bên trong thuộc tính `.value`.

> 📄 **Code ví dụ:** [`examples/01-ac-iem.js`](examples/01-ac-iem.js)

> 📄 **Code ví dụ:** [`examples/02-ac-iem.html`](examples/02-ac-iem.html)

## 2. `reactive()`

Mục này nói về công cụ dành riêng cho object, và quan trọng là hai cái bẫy khiến nó mất reactivity ngay khi bạn vô tình tách rời khỏi "object gốc".

`reactive()` dùng để tạo bản sao phản ứng sâu (deep reactive copy) của một **đối tượng** (Object, Array, Map, Set...).

### Đặc điểm:
- **Chỉ dành cho Object:** Không thể dùng cho dữ liệu nguyên thủy.
- **Truy cập trực tiếp:** Không cần `.value`. Bạn truy cập các thuộc tính trực tiếp như object bình thường.
- **Deep Reactivity:** Mặc định là phản ứng sâu, nghĩa là thay đổi các thuộc tính lồng nhau cũng kích hoạt cập nhật.

### Hạn chế:
- **Mất tính phản ứng khi destructuring:** Nếu bạn destruct một object `reactive`, các biến tách ra sẽ mất tính kết nối phản ứng với object gốc (trừ khi dùng `toRefs`).
- **Thay thế object:** Không thể thay thế toàn bộ object `reactive` bằng một object khác mà vẫn giữ tính phản ứng cho các tham chiếu cũ.

> 📄 **Code ví dụ:** [`examples/03-han-che.js`](examples/03-han-che.js)

> **Tóm gọn 1 câu:** `reactive` chỉ phục vụ object và cũng chỉ trung thành với object gốc — tách thuộc tính ra hay thay cả object là mất kết nối ngay.

## 3. Khi nào dùng cái nào?

Mục này chốt cuộc phân vân kinh điển của người mới: `ref` hay `reactive`? Bảng dưới là câu trả lời gọn nhất.

| Đặc điểm | `ref()` | `reactive()` |
| :--- | :--- | :--- |
| **Kiểu dữ liệu** | Mọi kiểu (Primitives + Objects) | Chỉ Objects (Array, Map, Set...) |
| **Truy cập (Script)** | `.value` | Trực tiếp |
| **Truy cập (Template)** | Trực tiếp (Auto-unwrap) | Trực tiếp |
| **Thay đổi toàn bộ** | Có thể (`ref.value = ...`) | Không nên |
| **Khuyến nghị** | Dùng mặc định cho hầu hết trường hợp | Dùng cho nhóm các state logic liên quan |

> **Cách đọc bảng này:** đọc theo hàng — mỗi hàng là một tiêu chí so sánh giữa hai công cụ. Hàng cuối cùng là "câu trả lời tóm tắt": nếu chỉ nhớ được một dòng, hãy nhớ hàng đó.

**Lời khuyên:** Nếu bạn mới bắt đầu hoặc phân vân, hãy dùng `ref()` vì nó linh hoạt và an toàn hơn.


> **Tóm gọn 1 câu:** Phân vân giữa `ref` và `reactive`? Chọn `ref` — nó chạy được với mọi kiểu dữ liệu và không có cái bẫy mất reactivity.

## 🧠 TÓM TẮT NGAY TỪ ĐẦU (để khỏi rối)

Mục này trả lời thắc mắc khiến nhiều người mới bối rối: "code Options API đâu có xài `ref()` đâu mà UI vẫn cập nhật?" — đáp án nằm ở việc Vue âm thầm làm thay bạn.

❗ Trong **Options API**, `data()` chính là “ref/reactive ngầm”.
❗ Bạn **KHÔNG** dùng `ref()`, nhưng Vue dùng thay bạn.

Hình dung: với Options API, Vue như **người quản gia gói quà sẵn** — bạn chỉ cần đưa món đồ, gói giấy (reactive) và dán nhãn (`this.count`) quản gia lo toàn bộ. Sang Composition API, bạn tự gói quà (`ref()`), nên muốn Vue theo dõi món nào thì phải tự bọc món đó.

### 1️⃣ TẠI SAO code của bạn VẪN UPDATE UI?

Code của bạn:
> 📄 **Code ví dụ:** [`examples/04-1-tai-sao-code-cua-ban-van-update.js`](examples/04-1-tai-sao-code-cua-ban-van-update.js)

Khi Vue khởi tạo component, nó làm việc này (tư duy logic):
> 📄 **Code ví dụ:** [`examples/05-1-tai-sao-code-cua-ban-van-update.js`](examples/05-1-tai-sao-code-cua-ban-van-update.js)

👉 Nghĩa là:
1.  `count` (trong template)
2.  ↓
3.  `reactive proxy` (Vue tạo ra)
4.  ↓
5.  `getter / setter`

🔥 **Không có `ref()` trong code của bạn, nhưng reactivity vẫn tồn tại.**

### 💥 VẬY BẢN CHẤT `data()` LÀ GÌ?

> `data()` ≈ `reactive()` + expose lên `this`

**So sánh trực tiếp:**

| Options API | Composition API (tương đương) |
| :--- | :--- |
| ```javascript data() { return { count: 0 } } ``` | ```javascript const state = reactive({ count: 0 }) ``` |

👉 **KHÔNG** có sự khác biệt về reactivity.

### 2️⃣ VẬY `count++` Ở ĐÂU RA?

> 📄 **Code ví dụ:** [`examples/06-2-vay-count-o-au-ra.html`](examples/06-2-vay-count-o-au-ra.html)

Thực chất Vue dịch thành:
> 📄 **Code ví dụ:** [`examples/07-2-vay-count-o-au-ra.js`](examples/07-2-vay-count-o-au-ra.js)

Setter này:
1.  Trigger reactivity
2.  Báo component render lại
3.  Update DOM

👉 Không phải vì `count` là biến thường.
👉 Mà vì `count` là property của `reactive proxy`.

### 3️⃣ VẬY CÂU HỎI QUAN TRỌNG HƠN 👇

> “Thế thì tại sao cần `ref()`?”

👉 **Trả lời ngắn:** Vì trong Composition API, Vue **KHÔNG** còn chỗ để tự bọc reactivity cho bạn.

**🔁 So sánh 2 bối cảnh:**

#### 🟢 Options API (Vue kiểm soát toàn bộ)
> 📄 **Code ví dụ:** [`examples/08-options-api-vue-kiem-soat-toan-bo.js`](examples/08-options-api-vue-kiem-soat-toan-bo.js)
-   ✔ Vue biết chắc object này là state.
-   ✔ Vue tự wrap reactive.
-   ✔ Bạn không cần ref.

#### 🔴 Composition API (bạn kiểm soát)
> 📄 **Code ví dụ:** [`examples/09-composition-api-ban-kiem-soat.js`](examples/09-composition-api-ban-kiem-soat.js)
-   ❌ Vue không biết biến này dùng để làm gì.
-   ❌ Không thể track.
-   ❌ Không update UI.

👉 Bạn **PHẢI** nói với Vue:
> 📄 **Code ví dụ:** [`examples/10-composition-api-ban-kiem-soat.js`](examples/10-composition-api-ban-kiem-soat.js)

### 4️⃣ SO SÁNH TƯ DUY (CỰC QUAN TRỌNG)

Mục này tổng kết "bản đồ trách nhiệm": việc nào Vue gánh, việc nào rơi về tay bạn.

| Options API (Vue làm) | Composition API (Dev làm) |
| :--- | :--- |
| - tạo component | - tạo biến |
| - gọi `data()` | - tự quyết định cái nào là reactive |
| - wrap `reactive` | - tự dùng `ref` / `reactive` |
| - expose `this.count` | |

> **Cách đọc bảng này:** đọc theo cột — cột trái liệt kê những việc Vue tự lo trong Options API, cột phải là những việc cùng bản chất nhưng bạn phải tự làm trong Composition API. Trống ở cột phải nghĩa là việc đó không tồn tại theo phong cách này.

👉 `ref()` là công cụ cho **developer**, không phải cho Vue.

### 5️⃣ VÌ SAO Vue KHÔNG TỰ LÀM reactive TRONG Composition API?

Ví dụ:
> 📄 **Code ví dụ:** [`examples/11-5-vi-sao-vue-khong-tu-lam-reactive.js`](examples/11-5-vi-sao-vue-khong-tu-lam-reactive.js)

❓ Vue phải đoán:
-   Cái nào là state?
-   Cái nào chỉ là biến tạm?
-   Cái nào dùng cho UI?

👉 Không thể đoán chính xác.
👉 Nên Vue bắt bạn khai báo rõ ràng bằng `ref()`.

### 6️⃣ SO SÁNH 1–1 CHO DỄ NHỚ

| Trường hợp | Ai wrap reactive? |
| :--- | :--- |
| `data()` | Vue |
| `props` | Vue |
| `computed`| Vue |
| `setup()` | ❌ Bạn |
| JS thường | ❌ Không ai |

> **Cách đọc bảng này:** quét cột phải từ trên xuống — chỗ nào ghi "Vue" là bạn khỏi phải `ref()`, chỗ nào ghi "Bạn" hoặc "Không ai" là bắt buộc bạn tự bọc bằng `ref()` nếu muốn reactive.

### 7️⃣ VẬY CÁCH BẠN HIỂU ĐÚNG NÊN LÀ GÌ?

❌ **Sai:**
> “ref là wrapper thay thế cho biến”

✅ **Đúng:**
> “ref là cách khai báo với Vue: cái này là state, hãy theo dõi nó”

## 🧠 MỘT CÂU CHỐT HẠ

> -   Trong Options API: Vue đoán giúp bạn.
> -   Trong Composition API: bạn nói rõ với Vue.

---

## ⚡ Vue 3.4+ / 3.5+: Compiler Macros & Reactive Props Destructure

Mục này nói về các hàm "đi kèm sẵn" trong `<script setup>` mà compiler tự hiểu — không cần import, không cần đăng ký. Đọc để biết từng macro giao việc gì và phiên bản nào bắt đầu dùng được.

> 🔗 Tham khảo chính thức: [Reactivity Fundamentals](https://vuejs.org/guide/essentials/reactivity-fundamentals.html) • [script setup](https://vuejs.org/api/sfc-script-setup.html)

Từ Vue 3.4/3.5, `<script setup>` cung cấp sẵn các **compiler macros** — các hàm do compiler hiểu và dịch ra, **không cần import**:

### 1️⃣ `defineProps()` / `defineEmits()` (compiler macro, không cần import)

> 📄 **Code ví dụ:** [`examples/12-1-defineprops-defineemits-compiler-macro-khong-can-import.vue`](examples/12-1-defineprops-defineemits-compiler-macro-khong-can-import.vue)

📌 Lưu ý:
- `defineProps` và `defineEmits` **chỉ dùng được trong `<script setup>`**.
- Props/emit nhận được luôn là **reactive** (Vue tự wrap reactive giúp bạn — đúng tinh thần "Vue làm thay").

### 2️⃣ `withDefaults()` — default props cho kiểu type-only (Vue 3.3+, dùng được tới hiện tại)

> 📄 **Code ví dụ:** [`examples/13-2-withdefaults-default-props-cho-kieu-type-only.ts`](examples/13-2-withdefaults-default-props-cho-kieu-type-only.ts)

> 👉 Từ **Vue 3.5**, cách gọn hơn là **reactive props destructure** (xem dưới) — không cần `withDefaults` nữa, nhưng nó vẫn hoạt động cho code cũ.

### 3️⃣ `defineModel()` — two-way binding trong 1 dòng (ổn định từ Vue 3.4)

> 📄 **Code ví dụ:** [`examples/14-3-definemodel-two-way-binding-trong-1-dong.vue`](examples/14-3-definemodel-two-way-binding-trong-1-dong.vue)

Trước Vue 3.4 phải viết tay:
> 📄 **Code ví dụ:** [`examples/15-3-definemodel-two-way-binding-trong-1-dong.js`](examples/15-3-definemodel-two-way-binding-trong-1-dong.js)
👉 `defineModel()` gói cả props + emit + đồng bộ 2 chiều.

### 4️⃣ `defineSlots()` / `defineExpose()`

> 📄 **Code ví dụ:** [`examples/16-4-defineslots-defineexpose.ts`](examples/16-4-defineslots-defineexpose.ts)

### 5️⃣ Reactive Props Destructure (ổn định từ Vue 3.5) ⭐

Trước đây, destructure props là **mất reactivity** (giống destructure object `reactive`). Từ Vue 3.5, compiler tự dịch biến destructured thành `props.xxx` nên **vẫn reactive**:

> 📄 **Code ví dụ:** [`examples/17-5-reactive-props-destructure-on-inh-tu-vue.vue`](examples/17-5-reactive-props-destructure-on-inh-tu-vue.vue)

⚠️ **Lưu ý quan trọng** (giống phần hạn chế của `reactive()` ở trên):
- ❌ Không watch trực tiếp biến destructured: `watch(title, ...)` — sai.
- ✅ Phải watch dạng getter: `watch(() => title, ...)`.
- Deconstruct rồi **truyền vào hàm** cũng sẽ mất reactivity nếu truyền giá trị thô: dùng `() => title`.

📌 Kể từ 3.5 không cần bật flag `propsDestructure: true` trong compiler options — tính năng này **bật mặc định**.

### 6️⃣ Bảng tóm tắt macros trong `<script setup>`

| Macro | Phiên bản ổn định | Mục đích |
| :--- | :--- | :--- |
| `defineProps()` | 3.0+ (macro từ đầu) | Khai báo props |
| `defineEmits()` | 3.0+ | Khai báo events |
| `defineExpose()` | 3.0+ | Expose public API qua template refs |
| `withDefaults()` | 3.0+ | Default cho type-only props |
| `defineSlots()` | 3.3+ | Khai báo type cho slots |
| `defineModel()` | **ổn định từ 3.4** | Two-way binding ngắn gọn |
| Reactive props destructure | **ổn định từ 3.5** (mặc định bật) | Destructure props vẫn reactive |

> **Cách đọc bảng này:** mỗi dòng một macro, xếp theo thời điểm ra đời từ trên xuống. Cột "Phiên bản ổn định" cho biết từ version nào dùng được an toàn; cột "Mục đích" trả lời macro đó giao việc gì.

> **Tóm gọn 1 câu:** Macros là "phím tắt do compiler cài sẵn" trong `<script setup>` — không import, chỉ cần nhớ macro nào làm việc gì và ra đời từ version nào.