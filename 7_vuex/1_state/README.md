# Vuex — State (⚠️ LEGACY — Vuex đã bị thay thế bởi Pinia)

> ## ⚠️ CẢNH BÁO: VUI LÒNG ĐỌC KỸ PHẦN NÀY
>
> **Vuex không còn là thư viện quản lý state chính thức của Vue 3.**
>
> - **Pinia** là thư viện state management **chính thức** từ Vue 3 (được nhóm Vue khuyến nghị, kể cả Vue 2.x hiện nay).
> - Vuex 4 chỉ tồn tại để **duy trì tương thích** các dự án cũ; nhóm phát triển không phát triển tính năng mới cho Vuex.
> - Bài này giữ lại nội dung Vuex làm **tài liệu tham khảo legacy** — để bạn đọc hiểu code cũ hoặc migration.
>
> 👉 **Dự án mới: hãy dùng Pinia** — bắt đầu từ [`8_pinia/1_defining-a-store`](../8_pinia/1_defining-a-store/README.md), và xem bảng đối chiếu [`8_pinia/VUEX-vs-PINIA.md`](../8_pinia/VUEX-vs-PINIA.md).

---

## 1. Store là gì? (khái niệm vẫn đúng với Pinia)

Mục này giải thích khái niệm "store" — phần cốt lõi còn nguyên giá trị dù Vuex đã legacy. Đọc để hiểu vì sao app lớn cần một chỗ dữ liệu trung tâm.

Khi ứng dụng lớn lên, nhiều component cùng cần chung một dữ liệu (user đang đăng nhập, giỏ hàng, theme...). Truyền props qua nhiều tầng (prop drilling) rất rối. **Store** là chỗ dữ liệu trung tâm — mọi component đều truy cập được.

Hãy hình dung như tủ hồ sơ chung của công ty: thay vì mỗi phòng giữ một bản photo tự sao chép tay qua tay (prop drilling), ai cần hồ sơ gì cứ đến tủ chung lấy — chỉ một nguồn sự thật duy nhất.

```
┌────────────┐     ┌──────────────────────────┐
│ Component A│ ──▶ │                          │
├────────────┤     │   STORE (state chung)    │
│ Component B│ ──▶ │  user · cart · settings  │
├────────────┤     │                          │
│ Component C│ ──▶ │                          │
└────────────┘     └──────────────────────────┘
```

## 2. Cài đặt Vuex (chỉ khi làm việc với dự án cũ)

> 📄 **Code ví dụ:** [`examples/01-2-cai-at-vuex-chi-khi-lam-viec.sh`](examples/01-2-cai-at-vuex-chi-khi-lam-viec.sh)

> 📄 **Code ví dụ:** [`examples/02-2-cai-at-vuex-chi-khi-lam-viec.ts`](examples/02-2-cai-at-vuex-chi-khi-lam-viec.ts)

> 📄 **Code ví dụ:** [`examples/03-2-cai-at-vuex-chi-khi-lam-viec.ts`](examples/03-2-cai-at-vuex-chi-khi-lam-viec.ts)

Đối chiếu với **Pinia** (mới): không cần root store, không cần `use()`:

> 📄 **Code ví dụ:** [`examples/04-2-cai-at-vuex-chi-khi-lam-viec.ts`](examples/04-2-cai-at-vuex-chi-khi-lam-viec.ts)

## 3. Truy cập state trong component (Vuex)

> 📄 **Code ví dụ:** [`examples/05-3-truy-cap-state-trong-component-vuex.vue`](examples/05-3-truy-cap-state-trong-component-vuex.vue)

Options API + `mapState` (thân thuộc với code cũ):

> 📄 **Code ví dụ:** [`examples/06-3-truy-cap-state-trong-component-vuex.js`](examples/06-3-truy-cap-state-trong-component-vuex.js)

## 4. So sánh nhanh state Vuex vs Pinia

Mục này đối chiếu "cùng một việc, hai ngôn ngữ": bảng dưới giúp bạn dịch từ code Vuex cũ sang tư duy Pinia (và ngược lại khi đọc code cũ).

| Vuex 4 | Pinia 3 | Ghi chú |
|---|---|---|
| `state: { count: 0 }` (root store duy nhất) | Nhiều store, mỗi store tự định nghĩa | Pinia không có "root" — mọi store độc lập |
| `store.state.count` | `counter.count` (không cần `.state`) | Pinia gọn hơn khi dùng trong component |
| `mapState(['count'])` | `storeToRefs(counter)` | Pinia có helper riêng |
| Chỉ khởi tạo state qua plain object | Hàm trả object, hỗ trợ tốt SSR | Khái niệm giống nhau |

> **Cách đọc bảng này:** mỗi dòng là một hành động quen thuộc (khai báo, đọc, map vào component); cột Vuex là cách nói cũ, cột Pinia là cách nói mới — dùng như từ điển hai chiều khi migrate.

> 💡 Nội dung chi tiết từng khía cạnh state của Pinia: [`8_pinia/2_state`](../8_pinia/2_state/README.md).

> **Tóm gọn 1 câu:** Store là "tủ hồ sơ trung tâm" của app — một nguồn sự thật thay vì truyền props qua từng tầng; cách cài Vuex chỉ cần khi chạm code cũ.

## 5. Khi nào đọc tiếp phần Vuex legacy?

Mục này là "biển chỉ dẫn" giúp bạn quyết có đi tiếp hay rẽ: học từ đầu thì rẽ sang Pinia ngay, có code cũ thì đi tiếp.

- ✅ Bạn **nhận code cũ** dùng Vuex và cần bảo trì/tìm hiểu.
- ✅ Bạn cần **migration** Vuex → Pinia (xem [`8_pinia/VUEX-vs-PINIA.md`](../8_pinia/VUEX-vs-PINIA.md)).
- ❌ Bạn đang **học từ đầu** — bỏ qua mục này, học Pinia ngay.

## Nguồn tham khảo

- Vuex 4 docs (bảo trì, không phát triển mới): https://vuex.vuejs.org/
- Pinia — state management chính thức: https://pinia.vuejs.org/
- So sánh Vuex vs Pinia (Pinia docs): https://pinia.vuejs.org/introduction.html#comparison-with-vuex
