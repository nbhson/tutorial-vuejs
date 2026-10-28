# Pinia — Quản lý state hiện đại cho Vue (2.x & 3.x)

Pinia là thư viện quản lý state **chính thức** của Vue (thay thế Vuex từ Vue 3). Phiên bản 2.x là chuẩn cho Vue 3 trong giai đoạn 2022–2024; **Pinia 3.0 (02/2025)** chỉ bỏ hỗ trợ Vue 2 và các API deprecated, **không có tính năng mới breaking** nên mọi kiến thức trong file này áp dụng cho cả 2.x và 3.x.

> 🔗 Tham khảo chính thức: [pinia.vuejs.org](https://pinia.vuejs.org/)

## 1. Tại sao chuyển từ Vuex sang Pinia?

| Tiêu chí | Vuex 4 | Pinia |
| :--- | :--- | :--- |
| Mutations | Bắt buộc `commit()` mutations | ❌ Không có — sửa state trực tiếp qua actions |
| Modules | Cần `modules`, `namespaced: true` | Không cần modules — nhiều store phẳng |
| TypeScript | Suy luận kiểu yếu | Type inference tự nhiên, viết TS-first |
| Composition API | Hạn chế | `defineStore()` chuẩn Composition API |
| DevTools | Có | Có, tốt hơn (time-travel, editors) |
| SSR / HMR | Hỗ trợ | Hỗ trợ đầy đủ, boilerplate gần như bằng 0 |
| Code splitting | Khó | Tự động — store chỉ nạp khi dùng |

> 👉 Pinia ra đời chính là "Vuex 5" đề xuất của đội Vue — từ 2022 trở đi Pinia là lựa chọn mặc định (khuyến nghị chính thức từ Vue 3). Xem thêm so sánh trong `../8_pinia/VUEX-vs-PINIA.md`.

```bash
npm install pinia
```

```js
// main.js
import { createApp } from 'vue'
import { createPinia } from 'pinia'
import App from './App.vue'

createApp(App).use(createPinia()).mount('#app')
```

## 2. `defineStore()` — định nghĩa store

Pinia có **2 style** khai báo store. Cả hai dùng chung một hàm `defineStore(id, ...)`:

- **Options Stores**: giống Options API của Vue.
- **Setup Stores**: giống `<script setup>` / Composition API.

### a) Options Store

```js
import { defineStore } from 'pinia'

export const useCounterStore = defineStore('counter', {
  // state → như data()
  state: () => ({
    count: 0,
    items: []
  }),
  // getters → như computed
  getters: {
    double: (state) => state.count * 2
  },
  // actions → như methods, có thể async
  actions: {
    increment() {
      this.count++ // sửa state trực tiếp, không cần mutation!
    },
    async fetchItems() {
      this.items = await fetch('/api/items').then(r => r.json())
    }
  }
})
```

### b) Setup Store (Composition API style — khuyến nghị cho logic phức tạp)

```js
import { defineStore } from 'pinia'
import { ref, computed } from 'vue'

export const useCounterStore = defineStore('counter', () => {
  // ref() → state
  const count = ref(0)
  // computed() → getters
  const double = computed(() => count.value * 2)
  // function → actions
  function increment() {
    count.value++
  }
  async function fetchItems() {
    const res = await fetch('/api/items')
    items.value = await res.json()
  }

  // BẮT BUỘC return mọi thứ muốn dùng được trong store
  return { count, double, increment, fetchItems }
})
```

📌 Quy ước đặt tên: `useXxxStore` (kiểu `useCartStore`), id store nên dùng **camelCase** để khớp tên.

### So sánh 2 style

| | Options Store | Setup Store |
| :--- | :--- | :--- |
| Điểm mạnh | Cấu trúc rõ, quen thuộc với Vue, DevTools mapping tốt | Linh hoạt hơn: dùng composables có sẵn, watcher, lifecycle |
| Hạn chế | Không dùng composables/lifecycle bên trong | Phải return đủ mọi thứ; devtools không hiện property ẩn |

👉 Chọn 1 style cho cả project — có thể trộn nhưng đừng lẫn lộn.

## 3. Sử dụng store trong component

```vue
<script setup>
import { useCounterStore } from '@/stores/counter'
import { storeToRefs } from 'pinia'

const store = useCounterStore()

// ❌ destructuring trực tiếp sẽ MẤT reactivity (store là reactive object)
// const { count } = store

// ✅ Dùng storeToRefs() cho state & getters
const { count, double } = storeToRefs(store)
// ✅ actions có thể destructuring trực tiếp
const { increment } = store
</script>

<template>
  <button @click="increment">{{ count }} — x2: {{ double }}</button>
</template>
```

> 🔑 Đây chính là hạn chế "mất reactivity khi destructuring reactive object" đã học trong `../1_essentials/11_reactivity-fundamentals` — Pinia store về bản chất là một object reactive lớn.

## 4. `$patch` — cập nhật nhiều state trong 1 lần

```js
store.$patch({
  count: store.count + 1,
  items: [...store.items, 'new item']
})

// Dạng function — an toàn khi thao tác với collection
store.$patch((state) => {
  state.items.push('new item')
})
```

👉 Gộp nhiều thay đổi → chỉ 1 lần thông báo devtools/subscribe.

## 5. `$reset` — reset về state ban đầu

```js
store.$reset() // state trở về đúng như state() khởi tạo
```

> ⚠️ `$reset()` không tồn tại trong **Setup Store** (vì Pinia không biết state ban đầu). Tự viết `reset()` action nếu dùng setup store:

```js
const reset = () => { count.value = 0; items.value = [] }
```

## 6. `$subscribe` — theo dõi thay đổi store

```js
const store = useCounterStore()

store.$subscribe((mutation, state) => {
  // mutation.type: 'direct' | 'patch object' | 'patch function'
  localStorage.setItem('counter', JSON.stringify(state))
}, { detached: true }) // detached: subscription sống cả khi component unmount
```

Tương tự có `store.$onAction()` để theo dõi actions (log, analytics, toast).

## 7. Plugins & DevTools

### Plugin (mở rộng Pinia)

```js
const pinia = createPinia()
pinia.use(({ store }) => {
  // VD: auto-persist mọi store
  store.$subscribe(() => {
    localStorage.setItem(store.$id, JSON.stringify(store.$state))
  })
})
```

Plugin phổ biến: `pinia-plugin-persistedstate` (lưu localStorage), SSR serialization...

### DevTools Integration

Pinia tích hợp Vue DevTools sẵn:
- Xem toàn bộ stores, state, getters trong tab **Pinia**.
- **Time-travel** với `$patch` (mỗi patch là 1 entry history).
- Chỉnh sửa state trực tiếp, xem actions được gọi với payload & duration.
- HMR cho stores giữ nguyên state.

## 8. Lưu ý phiên bản (2025–2026)

- **Pinia 2.x**: dòng cuối là `2.3.1` (01/2025); 2.2.6+ là bản cuối có tính năng mới.
- **Pinia 3.0 (02/2025)**: bỏ Vue 2, bỏ `PiniaStorePlugin` (dùng `PiniaPlugin`), native `Awaited`. Khỏi migration gì lớn — API giữ nguyên.
- Nuxt: dùng `@pinia/nuxt` tương ứng (0.11.x với Pinia 3).
- 👉 Dự án mới: cài `pinia@^3` — cú pháp `defineStore()` trong tài liệu này dùng được nguyên vẹn.

## 9. Tổng kết

- ✔ Pinia = Vuex không mutations, không modules, TS-native.
- ✔ `defineStore()` 2 style: Options Store & Setup Store.
- ✔ Không destructure store trực tiếp — dùng `storeToRefs()`.
- ✔ `$patch` (batch), `$reset` (options store), `$subscribe` (persist/log).
- ✔ DevTools time-travel + plugins (persistedstate...) mở rộng.

## 🔗 References

- [Pinia Getting Started](https://pinia.vuejs.org/getting-started.html)
- [defineStore — Core Concepts](https://pinia.vuejs.org/core-concepts/)
- [Migrating v2 → v3](https://pinia.vuejs.org/cookbook/migration-v2-v3.html)
- [Pinia Plugins](https://pinia.vuejs.org/core-concepts/plugins.html)
- [Changelog Pinia](https://github.com/vuejs/pinia/blob/v3/packages/pinia/CHANGELOG.md)
