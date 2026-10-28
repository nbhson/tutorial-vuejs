# Reactivity Fundamentals: ref() vs reactive()

Trong Vue 3, Reactivity (tính phản ứng) là cơ chế giúp Vue tự động cập nhật DOM khi trạng thái ứng dụng thay đổi. Để làm được điều này, Vue cần biết khi nào dữ liệu được đọc và khi nào nó bị thay đổi.

**Mục đích cốt lõi (Why do they exist?):**
1.  **`reactive()`**: Là cách tiếp cận "tự nhiên" nhất của Vue với Reactivity System dựa trên **JavaScript Proxy**. Nó biến đổi cả một object thành một proxy để Vue có thể can thiệp (intercept) vào mọi thao tác đọc/ghi trên object đó. Mục đích là để **theo dõi sự thay đổi của các cấu trúc dữ liệu phức tạp (Objects, Arrays)**.
2.  **`ref()`**: Giải quyết một hạn chế của JavaScript: các kiểu dữ liệu nguyên thủy (number, string, boolean) được truyền theo giá trị (pass-by-value), không phải tham chiếu (pass-by-reference). Nếu bạn truyền một số `0` đi, Vue sẽ mất dấu nó. `ref()` ra đời với mục đích **tạo ra một "cái wrapper" (lớp vỏ bọc) dạng object** xung quanh giá trị nguyên thủy đó, giúp Vue có thể theo dõi được nó y như một object.

Tóm lại: `reactive` dùng sức mạnh của Proxy cho Objects, còn `ref` là giải pháp "đóng gói" để mang khả năng đó đến cho Primitives.

## 1. `ref()`

`ref()` được sử dụng để tạo một tham chiếu phản ứng (reactive reference) cho **bất kỳ kiểu dữ liệu nào** (nguyên thủy hoặc đối tượng).

### Đặc điểm:
- **Dữ liệu nguyên thủy (Primitives):** `String`, `Number`, `Boolean`, `null`, `undefined` chỉ có thể dùng `ref()`.
- **Truy cập:** Khi truy cập giá trị của `ref` trong `<script>`, bạn phải dùng `.value`. Trong `<template>`, Vue sẽ tự động "mở gói" (unwrap) nên không cần `.value`.
- **Cơ chế:** `ref` tạo ra một object bao bọc giá trị thực sự bên trong thuộc tính `.value`.

```javascript
import { ref } from 'vue'

const count = ref(0)
console.log(count.value) // 0

count.value++
console.log(count.value) // 1
```

```html
<template>
  <button @click="count++">Count is: {{ count }}</button>
</template>
```

## 2. `reactive()`

`reactive()` dùng để tạo bản sao phản ứng sâu (deep reactive copy) của một **đối tượng** (Object, Array, Map, Set...).

### Đặc điểm:
- **Chỉ dành cho Object:** Không thể dùng cho dữ liệu nguyên thủy.
- **Truy cập trực tiếp:** Không cần `.value`. Bạn truy cập các thuộc tính trực tiếp như object bình thường.
- **Deep Reactivity:** Mặc định là phản ứng sâu, nghĩa là thay đổi các thuộc tính lồng nhau cũng kích hoạt cập nhật.

### Hạn chế:
- **Mất tính phản ứng khi destructuring:** Nếu bạn destruct một object `reactive`, các biến tách ra sẽ mất tính kết nối phản ứng với object gốc (trừ khi dùng `toRefs`).
- **Thay thế object:** Không thể thay thế toàn bộ object `reactive` bằng một object khác mà vẫn giữ tính phản ứng cho các tham chiếu cũ.

```javascript
import { reactive } from 'vue'

const state = reactive({
  count: 0,
  user: {
    name: 'Son'
  }
})

state.count++
```

## 3. Khi nào dùng cái nào?

| Đặc điểm | `ref()` | `reactive()` |
| :--- | :--- | :--- |
| **Kiểu dữ liệu** | Mọi kiểu (Primitives + Objects) | Chỉ Objects (Array, Map, Set...) |
| **Truy cập (Script)** | `.value` | Trực tiếp |
| **Truy cập (Template)** | Trực tiếp (Auto-unwrap) | Trực tiếp |
| **Thay đổi toàn bộ** | Có thể (`ref.value = ...`) | Không nên |
| **Khuyến nghị** | Dùng mặc định cho hầu hết trường hợp | Dùng cho nhóm các state logic liên quan |

**Lời khuyên:** Nếu bạn mới bắt đầu hoặc phân vân, hãy dùng `ref()` vì nó linh hoạt và an toàn hơn.


## 🧠 TÓM TẮT NGAY TỪ ĐẦU (để khỏi rối)

❗ Trong **Options API**, `data()` chính là “ref/reactive ngầm”.
❗ Bạn **KHÔNG** dùng `ref()`, nhưng Vue dùng thay bạn.

### 1️⃣ TẠI SAO code của bạn VẪN UPDATE UI?

Code của bạn:
```javascript
const app = createApp({
  data() {
    return {
      count: 0
    }
  }
})
```

Khi Vue khởi tạo component, nó làm việc này (tư duy logic):
```javascript
const rawData = { count: 0 }
const reactiveData = reactive(rawData)

this.count = reactiveData.count
```

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

```html
<button @click="count++">{{ count }}</button>
```

Thực chất Vue dịch thành:
```javascript
this.count++   // setter
```

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
```javascript
data() {
  return { count: 0 }
}
```
-   ✔ Vue biết chắc object này là state.
-   ✔ Vue tự wrap reactive.
-   ✔ Bạn không cần ref.

#### 🔴 Composition API (bạn kiểm soát)
```javascript
const count = 0
```
-   ❌ Vue không biết biến này dùng để làm gì.
-   ❌ Không thể track.
-   ❌ Không update UI.

👉 Bạn **PHẢI** nói với Vue:
```javascript
const count = ref(0)
```

### 4️⃣ SO SÁNH TƯ DUY (CỰC QUAN TRỌNG)

| Options API (Vue làm) | Composition API (Dev làm) |
| :--- | :--- |
| - tạo component | - tạo biến |
| - gọi `data()` | - tự quyết định cái nào là reactive |
| - wrap `reactive` | - tự dùng `ref` / `reactive` |
| - expose `this.count` | |

👉 `ref()` là công cụ cho **developer**, không phải cho Vue.

### 5️⃣ VÌ SAO Vue KHÔNG TỰ LÀM reactive TRONG Composition API?

Ví dụ:
```javascript
const a = 1
const b = a + 1
const c = Math.random()
```

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

> 🔗 Tham khảo chính thức: [Reactivity Fundamentals](https://vuejs.org/guide/essentials/reactivity-fundamentals.html) • [script setup](https://vuejs.org/api/sfc-script-setup.html)

Từ Vue 3.4/3.5, `<script setup>` cung cấp sẵn các **compiler macros** — các hàm do compiler hiểu và dịch ra, **không cần import**:

### 1️⃣ `defineProps()` / `defineEmits()` (compiler macro, không cần import)

```vue
<script setup lang="ts">
// ❌ Không cần: import { defineProps, defineEmits } from 'vue'
// ✅ Compiler tự biết đây là macro

// Kiểu "type-only" — TypeScript-only, hiệu năng tốt hơn (Vue 3.3+)
const props = defineProps<{
  title: string
  likes?: number
}>()

const emit = defineEmits<{
  (e: 'change', id: number): void
  (e: 'update', value: string): void
}>()
</script>
```

📌 Lưu ý:
- `defineProps` và `defineEmits` **chỉ dùng được trong `<script setup>`**.
- Props/emit nhận được luôn là **reactive** (Vue tự wrap reactive giúp bạn — đúng tinh thần "Vue làm thay").

### 2️⃣ `withDefaults()` — default props cho kiểu type-only (Vue 3.3+, dùng được tới hiện tại)

```ts
const props = withDefaults(
  defineProps<{ title?: string; items?: string[] }>(),
  { title: 'Hello', items: () => [] }
)
```

> 👉 Từ **Vue 3.5**, cách gọn hơn là **reactive props destructure** (xem dưới) — không cần `withDefaults` nữa, nhưng nó vẫn hoạt động cho code cũ.

### 3️⃣ `defineModel()` — two-way binding trong 1 dòng (ổn định từ Vue 3.4)

```vue
<script setup>
const model = defineModel() // thay cho props + emit('update:modelValue')
</script>

<template>
  <input v-model="model" />
</template>
```

Trước Vue 3.4 phải viết tay:
```js
const props = defineProps(['modelValue'])
const emit = defineEmits(['update:modelValue'])
```
👉 `defineModel()` gói cả props + emit + đồng bộ 2 chiều.

### 4️⃣ `defineSlots()` / `defineExpose()`

```ts
// defineSlots() — khai báo type cho slots (Vue 3.3+)
const slots = defineSlots<{
  default(props: { item: string }): any
  header?: (props: Record<string, never>) => any
}>()

// defineExpose() — chủ động expose property cho parent (dùng với template refs)
defineExpose({ publicMethod, publicData })
```

### 5️⃣ Reactive Props Destructure (ổn định từ Vue 3.5) ⭐

Trước đây, destructure props là **mất reactivity** (giống destructure object `reactive`). Từ Vue 3.5, compiler tự dịch biến destructured thành `props.xxx` nên **vẫn reactive**:

```vue
<script setup>
// Vue 3.5+: destructured props giữ nguyên tính phản ứng
const { title, likes = 0 } = defineProps(['title', 'likes'])

watchEffect(() => {
  // Vue 3.5+: tự dịch thành props.title — vẫn reactive ✅
  console.log(title)
})
</script>
```

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