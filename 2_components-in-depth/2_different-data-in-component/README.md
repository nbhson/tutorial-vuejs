# Different Data in Component — Dữ liệu khác nhau trong component (one-way data flow)

> **Yêu cầu:** Vue 3.x (khuyến nghị 3.5+) · `<script setup>` · TypeScript
> **Bài trước:** [`1_registration`](../1_registration/README.md) · **Bài sau:** [`3_scoped-style`](../3_scoped-style/README.md)

---

## 1. Vấn đề: mỗi component cần dữ liệu riêng

Cùng một component (`UserCard`, `ProductCard`, `TodoItem`...) được dùng nhiều lần, nhưng **mỗi lần dùng hiển thị dữ liệu khác nhau**. Bạn không thể viết cứng dữ liệu vào component — phải **truyền từ cha xuống con qua props**.

```vue
<!-- Child: UserCard.vue -->
<script setup lang="ts">
defineProps<{
  name: string
  role: 'admin' | 'user'
}>()
</script>

<template>
  <div class="card">
    <strong>{{ name }}</strong>
    <span class="badge">{{ role }}</span>
  </div>
</template>
```

```vue
<!-- Parent: App.vue — mỗi component con nhận dữ liệu khác nhau -->
<script setup lang="ts">
import UserCard from './UserCard.vue'
</script>

<template>
  <UserCard name="Nguyễn Sơn" role="admin" />
  <UserCard name="Lan Anh" role="user" />
  <UserCard name="Minh Tuấn" role="user" />
</template>
```

📌 **Điểm cốt lõi:** component con không "biết" dữ liệu là gì — nó chỉ khai báo **hợp đồng** (`defineProps`) và render theo dữ liệu được truyền vào.

---

## 2. One-way data flow — dòng dữ liệu một chiều

Quy tắc nền tảng của Vue: **props chảy một chiều từ cha xuống con**.

- Cha thay đổi prop → con tự render lại theo giá trị mới.
- Con **KHÔNG được tự sửa** prop.

```vue
<!-- ❌ SAI — cảnh báo runtime: "Set operation on key 'name' failed" -->
<script setup>
defineProps(['name'])
</script>

<template>
  <input v-model="name" />   <!-- v-model ghi vào prop → lỗi -->
</template>
```

### Vì sao Vue cấm?

| Lý do | Giải thích |
|---|---|
| **Dễ đoán** | Dữ liệu chỉ có một nguồn sự thật (cha). Con thay đổi âm thầm → cha không biết |
| **Debug dễ** | Lỗi dữ liệu luôn ở nơi dữ liệu được thay đổi |
| **Render đúng** | Vue re-render con khi prop của cha đổi — bản ghi cục bộ của con sẽ bị **ghi đè** |

---

## 3. Cần chỉnh sửa dữ liệu từ prop? 4 cách đúng

### Cách 1 — State cục bộ khởi tạo từ prop (khi prop là "giá trị ban đầu")

```vue
<script setup>
import { ref } from 'vue'

const props = defineProps(['initialCounter'])

// counter dùng bản sao cục bộ, chỉ khởi tạo 1 lần từ prop
const counter = ref(props.initialCounter)
</script>

<template>
  <button @click="counter++">{{ counter }}</button>
</template>
```

> ⚠️ `counter` sẽ **không tự cập nhật** khi `initialCounter` của cha đổi — nó chỉ là giá trị khởi tạo. Nếu cần đồng bộ tiếp tục, xem cách 4.

### Cách 2 — Computed "biến đổi" prop (không đổi prop)

```vue
<script setup>
import { computed } from 'vue'

const props = defineProps(['fullName'])

// Không sửa fullName, chỉ tạo bản trình diễn khác
const shortName = computed(() => props.fullName.split(' ').slice(-1)[0])
</script>

<template>
  <p>Tên gọi tắt: {{ shortName }}</p>
</template>
```

### Cách 3 — Đưa thay đổi lên cha bằng `emit` (chuẩn nhất)

```vue
<!-- Child: QtyInput.vue -->
<script setup>
const props = defineProps(['modelValue'])
const emit = defineEmits(['update:modelValue'])
</script>

<template>
  <input
    :value="props.modelValue"
    @input="emit('update:modelValue', Number($event.target.value))"
  />
</template>
```

```vue
<!-- Parent — giữ nguồn sự thật -->
<script setup>
import { ref } from 'vue'
import QtyInput from './QtyInput.vue'

const qty = ref(1)
</script>

<template>
  <QtyInput v-model="qty" />   <!-- với 2 chiều, dùng luôn defineModel — xem bên dưới -->
</template>
```

### Cách 4 — `defineModel()` (Vue 3.4+, ổn định — chuẩn hiện nay)

```vue
<!-- Child: QtyInput.vue -->
<script setup lang="ts">
const model = defineModel<number>({ required: true })
</script>

<template>
  <input v-model="model" type="number" />
</template>
```

Cha vẫn giữ quyền sở hữu dữ liệu: `<QtyInput v-model="qty" />`. Chi tiết luồng v-model qua component xem [`10_component-v-model/V-MODEL-FLOW.md`](../10_component-v-model/V-MODEL-FLOW.md).

---

## 4. Reset state khi prop đổi — mẹo dùng `key`

State cục bộ không tự reset khi prop thay đổi (component bị **tái sử dụng** chứ không tái tạo). Muốn component con "bắt đầu lại" mỗi lần dữ liệu khác nhau, ép Vue **tạo lại component** bằng `key`:

```vue
<script setup>
import { ref } from 'vue'
import UserForm from './UserForm.vue'

const userId = ref(1)
</script>

<template>
  <!-- đổi userId → component bị hủy và tạo lại → state khởi tạo lại từ đầu -->
  <UserForm :key="userId" :initial-user-id="userId" />
</template>
```

> 📌 Đây là cách chính thức khuyến nghị trong docs — đơn giản hơn nhiều so với `watch` prop để gán lại state.

---

## 5. Xác nhận prop (runtime validation)

Với Options API / runtime props, bạn có thể khai báo kiểu + validator. Con nhận dữ liệu sai sẽ được cảnh báo ngay khi phát triển:

```js
defineProps({
  status: {
    type: String,
    default: 'active',
    validator: (v) => ['active', 'banned'].includes(v),
  },
})
```

Với TypeScript + `<script setup>`, dùng type-only props (khuyến nghị, đã đề cập trong [`11_reactivity-fundamentals`](../../1_essentials/11_reactivity-fundamentals/README.md)) — validator không có nhưng trình biên dịch chặn ngay lúc build.

---

## 6. Ví dụ tổng hợp: danh sách sản phẩm

```vue
<!-- ProductList.vue -->
<script setup lang="ts">
import { ref } from 'vue'
import ProductCard from './ProductCard.vue'

interface Product {
  id: number
  name: string
  price: number
  inStock: boolean
}

const products = ref<Product[]>([
  { id: 1, name: 'Bàn phím cơ', price: 1_200_000, inStock: true },
  { id: 2, name: 'Chuột không dây', price: 450_000, inStock: false },
])
</script>

<template>
  <ProductCard v-for="p in products" :key="p.id" :product="p" />
</template>
```

```vue
<!-- ProductCard.vue — mỗi instance nhận 1 object khác nhau -->
<script setup lang="ts">
import { computed } from 'vue'

const props = defineProps<{ product: Product }>()
const emit = defineEmits<{ buy: [id: number] }>()

const formattedPrice = computed(() =>
  new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' })
    .format(props.product.price)
)
</script>

<template>
  <article :class="{ sold: !product.inStock }">
    <h3>{{ product.name }}</h3>
    <p>{{ formattedPrice }}</p>
    <button :disabled="!product.inStock" @click="emit('buy', product.id)">
      {{ product.inStock ? 'Mua' : 'Hết hàng' }}
    </button>
  </article>
</template>
```

📌 Điểm mấu chốt: mỗi instance có **props riêng** nhưng dùng chung logic/khuôn render.

---

## 7. Bẫy thường gặp

- **Mutate object prop**: `props.user.name = 'X'` **không báo lỗi** (vì mutate lồng nhau) nhưng phá vỡ nguồn sự thật. Hãy emit lên cha hoặc giữ bản copy trong state cục bộ.
- **Quên `:key` trong `v-for`** khi mỗi item có state riêng → state "dính" sai giữa các item khi danh sách sắp xếp/xóa.
- **Nhầm lẫn giữa "khởi tạo" và "liên kết"**: `ref(props.initialValue)` không tạo liên kết reactive với prop — chỉ lấy giá trị tại thời điểm tạo.
- **Xác nhận kiểu thiếu**: props bắt buộc nên khai báo trong `defineProps<{...}>()`, không để `any`.

---

## Nguồn tham khảo

- One-Way Data Flow: https://vuejs.org/guide/components/props.html#one-way-data-flow
- `defineModel()`: https://vuejs.org/guide/components/v-model.html
- Props: https://vuejs.org/guide/components/props.html
