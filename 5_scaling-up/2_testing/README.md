# Testing — Kiểm thử ứng dụng Vue với Vitest và Vue Test Utils

> **Yêu cầu:** Vue 3.5+ · Vite · Vitest 3.x · @vue/test-utils 2.x
> **Bài trước:** [`1_routing`](../1_routing/README.md) · **Bài sau:** [`3_ssr-nuxt`](../3_ssr-nuxt/README.md)

---

## 1. Ba cấp độ kiểm thử trong Vue

| Cấp độ | Kiểm thử gì | Công cụ |
|---|---|---|
| **Unit** | Hàm, composable, store, component đơn lẻ | Vitest + Vue Test Utils |
| **Component** | Component + tương tác người dùng (render, click, emit) | Vitest + Vue Test Utils / Testing Library |
| **E2E** | Cả ứng dụng chạy thật trên trình duyệt | Playwright / Cypress |

> 💡 `npm create vue@latest` có sẵn lựa chọn "Unit Testing" (Vitest) và "E2E Testing" (Playwright/Cypress) khi tạo dự án.

```bash
npm create vue@latest my-app
# ✅ Unit Testing với Vitest
cd my-app && npm install && npm run test:unit
```

---

## 2. Cài đặt thủ công Vitest

```bash
npm install -D vitest @vue/test-utils jsdom
```

```ts
// vitest.config.ts (hoặc thêm vào vite.config.ts)
import { defineConfig } from 'vitest/config'
import vue from '@vitejs/plugin-vue'

export default defineConfig({
  plugins: [vue()],
  test: {
    environment: 'jsdom',       // mô phỏng DOM cho component test
    globals: true,              // dùng describe/it không cần import
  },
})
```

```json
// package.json
{
  "scripts": {
    "test:unit": "vitest",
    "test:unit:run": "vitest run",
    "test:coverage": "vitest run --coverage"
  }
}
```

📌 Quy ước đặt tên file test: cùng thư mục với component (`Button.spec.ts`) hoặc thư mục `tests/` — chọn một và giữ nhất quán. Mẫu của `create-vue` dùng `src/components/__tests__/`.

---

## 3. Unit test đầu tiên — hàm thuần

```ts
// src/utils/format.ts
export function formatCurrency(v: number, currency = 'VND') {
  return new Intl.NumberFormat('vi-VN', { style: 'currency', currency }).format(v)
}
```

```ts
// src/utils/format.spec.ts
import { describe, expect, it } from 'vitest'
import { formatCurrency } from './format'

describe('formatCurrency', () => {
  it('định dạng VND đúng', () => {
    expect(formatCurrency(1_200_000)).toContain('1.200.000')
  })

  it('hỗ trợ USD', () => {
    expect(formatCurrency(99, 'USD')).toContain('$')
  })
})
```

```bash
npx vitest run        # chạy một lần (CI)
npx vitest            # watch mode khi phát triển
```

---

## 4. Test composable

```ts
// src/composables/useCounter.ts
import { ref } from 'vue'
export function useCounter(start = 0) {
  const count = ref(start)
  const inc = () => count.value++
  return { count, inc }
}
```

```ts
// src/composables/useCounter.spec.ts
import { describe, expect, it } from 'vitest'
import { useCounter } from './useCounter'

describe('useCounter', () => {
  it('tăng giá trị', () => {
    const { count, inc } = useCounter(10)
    inc()
    inc()
    expect(count.value).toBe(12)
  })
})
```

> ⚠️ Nếu composable có lifecycle (`onMounted`...) hoặc cần hiệu ứng trong scope, bọc test trong `effectScope()` hoặc test qua component (mục 5).

---

## 5. Test component với Vue Test Utils

```vue
<!-- CounterButton.vue -->
<script setup lang="ts">
const count = defineModel<number>({ required: true })
const emit = defineEmits<{ incremented: [] }>()
</script>

<template>
  <button data-test="counter" @click="count++; emit('incremented')">
    {{ count }}
  </button>
</template>
```

```ts
// src/components/__tests__/CounterButton.spec.ts
import { describe, expect, it } from 'vitest'
import { mount } from '@vue/test-utils'
import CounterButton from '../CounterButton.vue'

describe('CounterButton', () => {
  it('render số ban đầu', () => {
    const wrapper = mount(CounterButton, {
      props: { modelValue: 3 },
    })
    expect(wrapper.get('[data-test="counter"]').text()).toBe('3')
  })

  it('tăng count và emit khi click', async () => {
    const wrapper = mount(CounterButton, {
      props: { modelValue: 0, 'onUpdate:modelValue': (v: number) => wrapper.setProps({ modelValue: v }) },
    })
    await wrapper.get('[data-test="counter"]').trigger('click')
    expect(wrapper.emitted('incremented')).toHaveLength(1)
  })
})
```

**API Test Utils hay dùng nhất:**

| API | Dùng khi |
|---|---|
| `mount` / `shallowMount` | Render component thật / mock component con |
| `wrapper.find`, `wrapper.get` | Tìm phần tử (CSS selector); `get` ném lỗi nếu không thấy |
| `wrapper.findAll` | Danh sách phần tử |
| `trigger('click', {...})` | Mô phỏng sự kiện — **luôn `await`** |
| `setValue`, `setProps` | Đổi input value / props |
| `wrapper.emitted()` | Đọc các sự kiện đã emit |
| `wrapper.text()`, `wrapper.html()` | Kiểm tra nội dung render |

---

## 6. Test Pinia store

```ts
// stores/cart.spec.ts
import { beforeEach, describe, expect, it } from 'vitest'
import { createPinia, setActivePinia } from 'pinia'
import { useCartStore } from '../cart'

describe('cart store', () => {
  beforeEach(() => {
    setActivePinia(createPinia())     // store mới cho mỗi test
  })

  it('thêm sản phẩm', () => {
    const cart = useCartStore()
    cart.add({ id: 1, name: 'Chuột', price: 100 })
    expect(cart.items).toHaveLength(1)
    expect(cart.itemCount).toBe(1)
  })
})
```

> 💡 Store **không cần mount component** — chỉ cần `setActivePinia(createPinia())`. Đây là lợi ích lớn của Pinia so với Vuex khi test.

---

## 7. Mock API với `vi.mock` / MSW

```ts
import { vi, describe, expect, it } from 'vitest'
import { api } from '@/api/client'

vi.mock('@/api/client', () => ({
  api: { get: vi.fn().mockResolvedValue({ data: [{ id: 1, title: 'Bài 1' }] }) },
}))

import { postsApi } from '@/api/posts'

it('list() trả dữ liệu đã mock', async () => {
  const posts = await postsApi.list()
  expect(posts[0].title).toBe('Bài 1')
})
```

Với test **component gọi API thật trong `onMounted`**, cách sạch hơn là mock tầng network bằng **MSW** (Mock Service Worker) — chặn request ở mức trình duyệt/service worker, test gần với thực tế hơn. Cài đặt: `npm i -D msw` và khởi tạo handler trong `setupFiles`.

---

## 8. E2E với Playwright (tổng quan)

```bash
npm i -D @playwright/test
npx playwright install
```

```ts
// e2e/login.spec.ts
import { test, expect } from '@playwright/test'

test('đăng nhập thành công', async ({ page }) => {
  await page.goto('http://localhost:5173/login')
  await page.getByLabel('Email').fill('son@example.com')
  await page.getByLabel('Mật khẩu').fill('secret123')
  await page.getByRole('button', { name: 'Đăng nhập' }).click()
  await expect(page).toHaveURL('/')
  await expect(page.getByText('Xin chào')).toBeVisible()
})
```

---

## 9. Use-cases thực tế

### Test form validation

```ts
it('hiện lỗi khi email không hợp lệ', async () => {
  const wrapper = mount(LoginForm)
  await wrapper.get('[type="email"]').setValue('khong-hople')
  await wrapper.get('form').trigger('submit')
  expect(wrapper.text()).toContain('Email không hợp lệ')
})
```

### Test router trong component (mock)

```ts
const wrapper = mount(ComponentWithLink, {
  global: {
    mocks: { $route: { params: { id: '42' } } },
    stubs: { RouterLink: true },
  },
})
```

> 💡 Với dự án dùng `createRouter` thật, cách tốt hơn: truyền router thật qua `global.plugins: [router]` trong `mount()`.

### Chạy trong CI (GitHub Actions)

```yaml
- run: npm ci
- run: npm run test:unit:run -- --coverage
- run: npx playwright install --with-deps && npm run test:e2e
```

---

## Nguồn tham khảo

- Vitest: https://vitest.dev/
- Vue Test Utils: https://test-utils.vuejs.org/
- Testing Library (Vue): https://testing-library.com/docs/vue-testing-library/intro/
- Playwright: https://playwright.dev/
- Guide chính thức của Vue về testing: https://vuejs.org/guide/scaling-up/testing.html
