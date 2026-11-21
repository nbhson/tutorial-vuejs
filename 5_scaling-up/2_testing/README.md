# Testing — Kiểm thử ứng dụng Vue với Vitest và Vue Test Utils

> **Yêu cầu:** Vue 3.5+ · Vite · Vitest 3.x · @vue/test-utils 2.x
> **Bài trước:** [`1_routing`](../1_routing/README.md) · **Bài sau:** [`3_ssr-nuxt`](../3_ssr-nuxt/README.md)

---

## 1. Ba cấp độ kiểm thử trong Vue

Mục này trả lời câu hỏi đầu tiên của mọi dự án Vue: "test đến đâu là đủ?" — từ test từng mảnh nhỏ (unit), test cả component với người dùng bấm bấm (component), đến test toàn bộ app chạy thật (E2E).

Hãy hình dung như kiểm tra chất lượng một chiếc xe: unit test là kiểm từng con ốc, component test là nổ máy thử từng cục bộ, E2E là lái thử cả xe ngoài đường.

| Cấp độ | Kiểm thử gì | Công cụ |
|---|---|---|
| **Unit** | Hàm, composable, store, component đơn lẻ | Vitest + Vue Test Utils |
| **Component** | Component + tương tác người dùng (render, click, emit) | Vitest + Vue Test Utils / Testing Library |
| **E2E** | Cả ứng dụng chạy thật trên trình duyệt | Playwright / Cypress |

> **Cách đọc bảng này:** mỗi dòng là một "tầng" kiểm thử, xếp từ nhỏ đến lớn; cột "Kiểm thử gì" cho biết phạm vi, cột "Công cụ" cho biết dùng gì để làm. Càng xuống dưới càng chậm nhưng càng gần thực tế.

> 💡 `npm create vue@latest` có sẵn lựa chọn "Unit Testing" (Vitest) và "E2E Testing" (Playwright/Cypress) khi tạo dự án.

> 📄 **Code ví dụ:** [`examples/01-1-ba-cap-o-kiem-thu-trong-vue.sh`](examples/01-1-ba-cap-o-kiem-thu-trong-vue.sh)

> **Tóm gọn 1 câu:** Test Vue chia 3 tầng từ nhỏ đến lớn — unit (hàm), component (component + tương tác), E2E (cả app chạy thật) — càng lên càng thật nhưng càng chậm.

---

## 2. Cài đặt thủ công Vitest

Mục này hướng dẫn tự tay thêm Vitest vào dự án — dùng khi dự án của bạn không tạo bằng `create-vue` hoặc cần tự cấu hình.

> 📄 **Code ví dụ:** [`examples/02-2-cai-at-thu-cong-vitest.sh`](examples/02-2-cai-at-thu-cong-vitest.sh)

> 📄 **Code ví dụ:** [`examples/03-2-cai-at-thu-cong-vitest.ts`](examples/03-2-cai-at-thu-cong-vitest.ts)

> 📄 **Code ví dụ:** [`examples/04-2-cai-at-thu-cong-vitest.json`](examples/04-2-cai-at-thu-cong-vitest.json)

📌 Quy ước đặt tên file test: cùng thư mục với component (`Button.spec.ts`) hoặc thư mục `tests/` — chọn một và giữ nhất quán. Mẫu của `create-vue` dùng `src/components/__tests__/`. Giống như sắp hồ sơ: cứ chọn một ngăn kéo và luôn bỏ vào ngăn đó, đừng đẻ ra hai chỗ.

> **Tóm gọn 1 câu:** Cài Vitest thủ công = thêm package + config một lần, rồi giữ một quy ước đặt tên file test nhất quán xuyên suốt dự án.

---

## 3. Unit test đầu tiên — hàm thuần

Mục này giúp bạn viết test case đầu tiên: bắt từ hàm thuần (pure function) — loại dễ test nhất vì chỉ cần "vào đầu vào nào, ra đầu ra ấy", không đụng gì đến Vue.

Ví von: test hàm thuần như nếm một món ăn trong bếp — đưa nguyên liệu vào, nếm kết quả ra, không cần bày bàn hay mời khách.

> 📄 **Code ví dụ:** [`examples/05-3-unit-test-au-tien-ham-thuan.ts`](examples/05-3-unit-test-au-tien-ham-thuan.ts)

> 📄 **Code ví dụ:** [`examples/06-3-unit-test-au-tien-ham-thuan.ts`](examples/06-3-unit-test-au-tien-ham-thuan.ts)

> 📄 **Code ví dụ:** [`examples/07-3-unit-test-au-tien-ham-thuan.sh`](examples/07-3-unit-test-au-tien-ham-thuan.sh)

> **Tóm gọn 1 câu:** Bắt đầu test từ hàm thuần — cho vào input, so sánh output, chưa cần đụng đến Vue.

---

## 4. Test composable

Mục này nói về cách test composable — hàm dùng chung logic của Vue. Khó hơn test hàm thuần vì composable có thể dính lifecycle và scope của Vue, nên cần "dựng sân khấu" cho nó chạy.

> 📄 **Code ví dụ:** [`examples/08-4-test-composable.ts`](examples/08-4-test-composable.ts)

> 📄 **Code ví dụ:** [`examples/09-4-test-composable.ts`](examples/09-4-test-composable.ts)

> ⚠️ Nếu composable có lifecycle (`onMounted`...) hoặc cần hiệu ứng trong scope, bọc test trong `effectScope()` hoặc test qua component (mục 5).

> **Tóm gọn 1 câu:** Test composable cần "sân khấu" Vue — bọc trong `effectScope()` hoặc test gián tiếp qua một component.

---

## 5. Test component với Vue Test Utils

Mục này là "bếp chính" của bài: dùng Vue Test Utils để mount component thật, giả lập người dùng bấm gõ, rồi kiểm tra kết quả hiển thị — gần nhất với cách component vận hành thực tế.

Hãy hình dung `mount` như dựng một mô hình thu nhỏ của component: bạn xem nó render ra gì, tay "ai đó" bấm vào đâu, và component hét lên (emit) cái gì.

> 📄 **Code ví dụ:** [`examples/10-5-test-component-voi-vue-test-utils.vue`](examples/10-5-test-component-voi-vue-test-utils.vue)

> 📄 **Code ví dụ:** [`examples/11-5-test-component-voi-vue-test-utils.ts`](examples/11-5-test-component-voi-vue-test-utils.ts)

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

> **Cách đọc bảng này:** cột API là "công cụ trong hộp đồ nghề", cột "Dùng khi" là lúc nào moi nó ra. Đọc xuôi từ trên xuống tương ứng với quy trình một test điển hình: mount → tìm phần tử → trigger sự kiện → kiểm tra kết quả.

> **Tóm gọn 1 câu:** Vue Test Utils cho bạn `mount` component như mô hình thu nhỏ, rồi giả lập hành vi người dùng và kiểm tra những gì component render/emit.

---

## 6. Test Pinia store

Mục này là tin vui: store là "lương thực dự trữ" của app, và Pinia cho phép bạn kiểm kho nó mà không cần mở nhà (mount component).

> 📄 **Code ví dụ:** [`examples/12-6-test-pinia-store.ts`](examples/12-6-test-pinia-store.ts)

> 💡 Store **không cần mount component** — chỉ cần `setActivePinia(createPinia())`. Đây là lợi ích lớn của Pinia so với Vuex khi test.

> **Tóm gọn 1 câu:** Test Pinia store cực nhẹ — `setActivePinia(createPinia())` là chạy được, không cần mount component nào.

---

## 7. Mock API với `vi.mock` / MSW

Mục này nói về cách "giả lập server": test không nên gọi API thật (chậm, thay đổi theo dữ liệu, tốn tiền) — thay vào đó chặn request và trả về dữ liệu do bạn định trước.

Ví von: giống diễn viên đóng thế — khán giả (test) thấy cảnh bình thường, nhưng phía sau là người lồng tiếng giả giọng server.

> 📄 **Code ví dụ:** [`examples/13-7-mock-api-voi-vi-mock-msw.ts`](examples/13-7-mock-api-voi-vi-mock-msw.ts)

Với test **component gọi API thật trong `onMounted`**, cách sạch hơn là mock tầng network bằng **MSW** (Mock Service Worker) — chặn request ở mức trình duyệt/service worker, test gần với thực tế hơn. Cài đặt: `npm i -D msw` và khởi tạo handler trong `setupFiles`.

> **Tóm gọn 1 câu:** Mock API bằng `vi.mock` cho tầng module, hoặc MSW để chặn ở tầng network — test nhanh và ổn định mà không cần server thật.

---

## 8. E2E với Playwright (tổng quan)

Mục này cho bạn cái nhìn bao quát về E2E: Playwright mở trình duyệt thật, đi qua app như một người dùng thật — click, nhập, chờ — rồi xác nhận toàn bộ luồng vận hành đúng như mong đợi.

> 📄 **Code ví dụ:** [`examples/14-8-e2e-voi-playwright-tong-quan.sh`](examples/14-8-e2e-voi-playwright-tong-quan.sh)

> 📄 **Code ví dụ:** [`examples/15-8-e2e-voi-playwright-tong-quan.ts`](examples/15-8-e2e-voi-playwright-tong-quan.ts)

> **Tóm gọn 1 câu:** E2E với Playwright là "người dùng robot" — mở trình duyệt thật, đi cả luồng app từ đầu đến cuối và la lên khi đường đi bị gãy.

---

## 9. Use-cases thực tế

Mục này gom ba tình huống hay gặp nhất khi test dự án thật: form validation, mock router, và chạy test trong CI.

### Test form validation

> 📄 **Code ví dụ:** [`examples/16-test-form-validation.ts`](examples/16-test-form-validation.ts)

### Test router trong component (mock)

> 📄 **Code ví dụ:** [`examples/17-test-router-trong-component-mock.ts`](examples/17-test-router-trong-component-mock.ts)

> 💡 Với dự án dùng `createRouter` thật, cách tốt hơn: truyền router thật qua `global.plugins: [router]` trong `mount()`.

### Chạy trong CI (GitHub Actions)

> 📄 **Code ví dụ:** [`examples/18-chay-trong-ci-github-actions.yaml`](examples/18-chay-trong-ci-github-actions.yaml)

> **Tóm gọn 1 câu:** Ba tình huống sống còn: form validation (test lỗi đầu vào), router mock (test điều hướng), CI (test tự chạy mỗi lần push).

---

## Nguồn tham khảo

- Vitest: https://vitest.dev/
- Vue Test Utils: https://test-utils.vuejs.org/
- Testing Library (Vue): https://testing-library.com/docs/vue-testing-library/intro/
- Playwright: https://playwright.dev/
- Guide chính thức của Vue về testing: https://vuejs.org/guide/scaling-up/testing.html
