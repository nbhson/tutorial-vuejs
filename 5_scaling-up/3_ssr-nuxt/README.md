# SSR & Nuxt — Render phía server trong hệ sinh thái Vue

> **Yêu cầu:** Vue 3.5+ · hiểu cơ bản Vite · Pinia · Vue Router
> **Bài trước:** [`2_testing`](../2_testing/README.md)

---

## 1. CSR vs SSR vs SSG — chọn gì cho ứng dụng của bạn?

Mục này là "chọn nhà trước khi xây": trước khi code, bạn phải quyết định trang được vẽ ở đâu — trong trình duyệt (CSR), trên server (SSR), hay dựng sẵn lúc build (SSG). Quyết định này ảnh hưởng đến tốc độ, SEO và độ phức tạp của toàn dự án.

Ví von: CSR là nhà cấp 4 tự lát gạch sau khi dọn vào; SSR là khách sạn dọn sẵn phòng trước khi bạn đến; SSG là nhà mẫu in sẵn catalogue.

| Mô hình | Viết tắt | Trình duyệt nhận | Ưu | Nhược |
|---|---|---|---|---|
| Client-Side Rendering | CSR (SPA thuần) | HTML rỗng + JS bundle | Đơn giản, tương tác tức thì sau lần tải | First paint chậm, SEO kém |
| Server-Side Rendering | **SSR** | HTML đã render sẵn | Nhanh đầu trang, SEO tốt | Server phải chạy Node, phức tạp |
| Static Site Generation | SSG | HTML tĩnh dựng lúc build | Rất nhanh, hosting rẻ, SEO tốt | Nội dung đổi phải rebuild |
| Hybrid (Islands / ISR) | — | Kết hợp theo trang | Nuxt 3+ hỗ trợ `nuxt generate`, hybrid rendering | Cần hiểu rõ từng chế độ |

> **Cách đọc bảng này:** đọc theo cột "Trình duyệt nhận" trước — đó là điểm khác nhau cốt lõi (rỗng, render sẵn, hay tĩnh); rồi so "Ưu"/"Nhược" để chọn. Dòng cuối là phương án "lai" của Nuxt.

> 💡 Quy tắc chọn nhanh: **landing/blog/docs** → SSG; **dashboard nội bộ** (đăng nhập, ít SEO) → CSR; **trang bán hàng/nội dung cần SEO + dữ liệu động** → SSR.

> **Tóm gọn 1 câu:** CSR vẽ ở trình duyệt, SSR vẽ trên server, SSG vẽ sẵn lúc build — chọn theo nhu cầu SEO và độ động của nội dung.

---

## 2. SSR "thủ công" với Vue — hiểu cơ chế

Mục này bóc máy SSR ra để xem bên trong có gì — bạn ít khi tự viết SSR thủ công trong dự án thật, nhưng hiểu cơ chế sẽ giúp debug Nuxt không "học vẹt".

Ví von: giống tháo đồng hồ xem bánh răng trước khi mua đồng hồ đeo tay made-in-factory.

Vue 3 có gói `@vue/server-renderer` — render component thành chuỗi HTML phía Node:

> 📄 **Code ví dụ:** [`examples/01-2-ssr-thu-cong-voi-vue-hieu-co.sh`](examples/01-2-ssr-thu-cong-voi-vue-hieu-co.sh)

> 📄 **Code ví dụ:** [`examples/02-2-ssr-thu-cong-voi-vue-hieu-co.js`](examples/02-2-ssr-thu-cong-voi-vue-hieu-co.js)

### Hai khác biệt bắt buộc khi code chạy trên server

1. **`createSSRApp` thay vì `createApp`** — mỗi request cần một **instance mới** (tránh "state chia sẻ giữa user này với user khác" — lỗ hổng bảo mật kinh điển).
2. **Không dùng `window`/`document`** trong code chạy ở server — bọc trong `onMounted` (chỉ chạy trên client) hoặc kiểm tra `import.meta.env.SSR`.

> 📄 **Code ví dụ:** [`examples/03-hai-khac-biet-bat-buoc-khi-code-chay.ts`](examples/03-hai-khac-biet-bat-buoc-khi-code-chay.ts)

### Hydration — "gắn sự sống" vào HTML server gửi

Mục này giải thích bước "tiếp nối" quan trọng nhất của SSR: server đưa HTML tĩnh, client JS phải "nhập hồ" vào đó để trang bắt đầu phản ứng.

Hydration giống như mua đồ IKEA có sẵn khung: HTML server là đồ đã ráp sẵn, JS client chỉ việc vít chốt và gắn tay nắm — không phải đập đi ráp lại. Client bundle chạy và **hyd** vào HTML có sẵn: Vue so khớp DOM server với cây component, **gắn event listener mà không re-render**. Lỗi hydration (server render khác client) gây warning và tối ưu kém — nguyên nhân thường gặp: `Date.now()`, `Math.random()`, `localStorage` đọc lúc render (giống như hai người ráp hai bộ đồ cùng lúc mà có một con ốc cử động — khớp không vào nhau).

> **Tóm gọn 1 câu:** SSR thủ công = render HTML trên server, rồi client "nhập hồ" (hydration) vào HTML đó — nhớ `createSSRApp` và tránh `window`/`document` lúc render.

---

## 3. Nuxt — khung SSR/SSG chính thức của Vue

Mục này giới thiệu "bộ đồ đầy đủ" thay vì tự may từng mảnh: Nuxt gói sẵn SSR, routing, lấy dữ liệu và tối ưu — bạn chỉ việc mặc vào.

Tự dựng SSR thủ công chỉ để **hiểu**. Thực tế, hệ sinh thái Vue dùng **Nuxt** (khung "meta-framework" của Vue, tương tự Next.js với React).

> 📄 **Code ví dụ:** [`examples/04-3-nuxt-khung-ssr-ssg-chinh-thuc-cua.sh`](examples/04-3-nuxt-khung-ssr-ssg-chinh-thuc-cua.sh)

### File-based routing

```text
pages/
├── index.vue          → /
├── about.vue          → /about
└── posts/
    ├── index.vue      → /posts
    └── [id].vue       → /posts/42   (route động, như :id của Vue Router)
```

📌 Không cần `vue-router` thủ công — Nuxt tự sinh routes từ cấu trúc thư mục `pages/`.

### `useFetch` / `useAsyncData` — lấy dữ liệu chạy được cả server lẫn client

> 📄 **Code ví dụ:** [`examples/05-usefetch-useasyncdata-lay-du-lieu-chay-uoc-ca.vue`](examples/05-usefetch-useasyncdata-lay-du-lieu-chay-uoc-ca.vue)

### Auto-imports

Nuxt tự import `ref`, `computed`, `useFetch`... và mọi composable trong `composables/` — không cần dòng `import` lặp đi lặp lại.

---

## 4. Render mode theo từng trang (Nuxt 3+)

Mục này nói về "chế độ riêng cho từng phòng trong khách sạn": một app Nuxt có thể vừa SSG trang tĩnh, vừa SSR trang động, tùy route.

> 📄 **Code ví dụ:** [`examples/06-4-render-mode-theo-tung-trang-nuxt-3.vue`](examples/06-4-render-mode-theo-tung-trang-nuxt-3.vue)

> 📄 **Code ví dụ:** [`examples/07-4-render-mode-theo-tung-trang-nuxt-3.ts`](examples/07-4-render-mode-theo-tung-trang-nuxt-3.ts)

📌 Đây là **hybrid rendering** — điểm mạnh lớn nhất của Nuxt hiện nay: mỗi nhóm đường dẫn dùng chế độ render phù hợp.

> **Tóm gọn 1 câu:** Hybrid rendering cho phép mỗi route tự chọn chế độ render (SSG/SSR/SPA) — tĩnh thì tĩnh, động thì động.

---

## 5. SSR + Pinia — state chia sẻ an toàn

Mục này giải quyết bài toán "server phục vụ nhiều người cùng lúc": state phải tách riêng từng request, như mỗi khách khách sạn có phòng riêng, không ai chui sang phòng ai.

Pinia hỗ trợ SSR tốt: mỗi request tạo một instance Pinia riêng, state serialize về client.

> 📄 **Code ví dụ:** [`examples/08-5-ssr-pinia-state-chia-se-an-toan.ts`](examples/08-5-ssr-pinia-state-chia-se-an-toan.ts)

Trong Nuxt, store được tự cấp phát mỗi request — bạn chỉ cần dùng như thông thường. Chi tiết: [`8_pinia/6_run-outside-of-components`](../8_pinia/6_run-outside-of-components/README.md).

> **Tóm gọn 1 câu:** Với SSR, mỗi request một Pinia instance riêng — user A không bao giờ nhìn thấy giỏ hàng của user B.

---

## 6. SEO với SSR/Nuxt

Mục này trả lời câu hỏi "tại sao chọn SSR": Google bot đọc HTML đầu tiên — SSR/Nuxt đưa nội dung vào ngay từ đó, thay vì để trang trắng chờ JS.

- **Nuxt tự render nội dung** vào HTML đầu tiên — Google thu thập được nội dung ngay cả khi JS không chạy.
- `useSeoMeta` — đặt meta từ component:

> 📄 **Code ví dụ:** [`examples/09-6-seo-voi-ssr-nuxt.vue`](examples/09-6-seo-voi-ssr-nuxt.vue)

- `useHead` cho link/JSON-LD chi tiết hơn.

---

## 7. Lưu ý khi migrate SPA → Nuxt

Mục này là "bản đồ chuyển nhà" từ SPA sang Nuxt: mỗi thói quen cũ tương ứng một cách làm mới. Bảng dưới đối chiếu từng cặp.

| SPA (Vue + Vite) | Nuxt |
|---|---|
| `vue-router` thủ công | File-based routing trong `pages/` |
| `main.ts` (`createApp`) | `nuxt.config.ts` + plugin tự nhiên |
| `axios.get` trong `onMounted` | `useFetch` / `useAsyncData` (SSR-safe) |
| `window` dùng thoải mái | Bọc trong `onMounted` / kiểm tra `import.meta.env.SSR` |
| `document.title` thủ công | `useHead` / `useSeoMeta` |

> **Cách đọc bảng này:** cột trái là "cách làm cũ bạn đang có", cột phải là "nơi Nuxt đặt nó". Đọc theo từng dòng để soi xem dự án của mình vướng cột nào.

### Checklist trước khi chuyển

1. ✅ Toàn bộ code chạm `window`/`document` đã an toàn SSR chưa?
2. ✅ API base URL xử lý cả server (absolute URL khi gọi từ Node)?
3. ✅ State toàn cục (Pinia) không giữ dữ liệu "một user" lúc module-level?
4. ✅ CSS-in-JS hoặc thư viện phụ thuộc có hỗ trợ SSR không?

> **Tóm gọn 1 câu:** Migrate SPA → Nuxt = đối chiếu từng thói quen cũ (router, window, API, title) sang cách làm SSR-safe của Nuxt, rồi chạy checklist 4 câu hỏi trước khi chuyển.

---

## 8. Use-cases thực tế

Mục này dựng ba tình huống gần đời thường: blog tĩnh, form chạy cả hai phía, và API backend nhỏ ngay trong Nuxt.

### Trang blog SSG + cập nhật ISR-style

> 📄 **Code ví dụ:** [`examples/10-trang-blog-ssg-cap-nhat-isr-style.ts`](examples/10-trang-blog-ssg-cap-nhat-isr-style.ts)

### Form đăng ký chạy cả hai phía

> 📄 **Code ví dụ:** [`examples/11-form-ang-ky-chay-ca-hai-phia.vue`](examples/11-form-ang-ky-chay-ca-hai-phia.vue)

### API backend nhẹ ngay trong Nuxt

> 📄 **Code ví dụ:** [`examples/12-api-backend-nhe-ngay-trong-nuxt.ts`](examples/12-api-backend-nhe-ngay-trong-nuxt.ts)

---

## Nguồn tham khảo

- Vue SSR Guide: https://vuejs.org/guide/scaling-up/ssr.html
- Nuxt docs: https://nuxt.com/docs
- Nuxt rendering modes (hybrid): https://nuxt.com/docs/guide/concepts/rendering
- `@vue/server-renderer`: https://www.npmjs.com/package/@vue/server-renderer
- Pinia SSR: https://pinia.vuejs.org/ssr.html
