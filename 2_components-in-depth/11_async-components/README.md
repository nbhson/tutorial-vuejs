# Async Components trong Vue 3: Tóm tắt Đầy đủ & Dễ hiểu

Bài này đi qua toàn bộ về **Async Components** (Component bất đồng bộ) trong Vue 3: từ khái niệm, cách định nghĩa, cho đến các chiến lược lazy hydration mới nhất — mỗi phần đều có ví dụ kèm theo.

## 1. Async Component là gì? Dùng để làm gì?

Mục này trả lời câu hỏi nền tảng: vì sao cần "tải sau" thay vì tải hết ngay từ đầu — giống như đi ăn buffet, bạn không bưng cả bàn lên mà gắp món nào ăn món đó.

**Khái niệm:**
Async Component là component được tải (load) từ server chỉ khi thực sự cần thiết, thay vì tải toàn bộ code của chúng ngay từ lúc ứng dụng khởi chạy. Hãy hình dung: thay chất đầy vali trước chuyến đi, bạn cứ đến nơi mới mua thứ cần dùng — hành lý ban đầu nhẹ hẳn.

👉 **Mục tiêu chính:**
- **Giảm dung lượng bundle ban đầu:** Chỉ tải những gì cần cho trang hiện tại.
- **Tăng tốc độ load trang:** Giúp người dùng thấy nội dung nhanh hơn.
- **Tối ưu hóa performance:** Cực kỳ quan trọng đối với các ứng dụng quy mô lớn.

**Ví dụ thực tế:**
- Các trang quản trị (Admin) chỉ load khi user truy cập vào đường dẫn `/admin`.
- Các thành phần nặng như Modal, Popup, Chart chỉ load khi người dùng nhấn nút mở.

> **Tóm gọn 1 câu:** Async Component là "mua trước dùng sau" ngược lại — dùng tới đâu, tải code tới đó, để màn hình đầu tiên hiện càng sớm càng tốt.

## 2. Cách sử dụng cơ bản – `defineAsyncComponent`

Mục này nói về công cụ chính thức của Vue để tạo async component: một hàm nhận "cuộc hẹn tải code" và trả lại component như thường.

**Cú pháp cơ bản:**
> 📄 **Code ví dụ:** [`examples/01-2-cach-su-dung-co-ban-defineasynccomponent.js`](examples/01-2-cach-su-dung-co-ban-defineasynccomponent.js)

� **Giải thích:**
- `defineAsyncComponent` nhận vào một **loader function**.
- Loader function này phải trả về một **Promise**.
- `resolve()` được gọi khi tải thành công, `reject()` khi tải thất bại.

> **Tóm gọn 1 câu:** `defineAsyncComponent` nhận một hàm hứa "sẽ trả lại component" — Vue cầm lời hứa đó và chờ đúng lúc mới đòi.

## 3. Dùng với `import()` (Cách phổ biến nhất)

Mục này nói về cách viết mà bạn sẽ gặp trong 99% dự án thực tế: ghép `defineAsyncComponent` với dynamic import của JavaScript.

Trong thực tế, chúng ta thường kết hợp với tính năng dynamic import của JavaScript để tải các file `.vue`.

**Ví dụ:**
> 📄 **Code ví dụ:** [`examples/02-3-dung-voi-import-cach-pho-bien-nhat.js`](examples/02-3-dung-voi-import-cach-pho-bien-nhat.js)

📌 **Ưu điểm:**
- Code cực kỳ ngắn gọn và dễ hiểu.
- Các công cụ như Vite hay Webpack sẽ tự động thực hiện **Code Splitting** (tách file).
- Component chỉ được tải về máy khách khi nó lần đầu tiên được render trên UI.

> **Tóm gọn 1 câu:** `defineAsyncComponent(() => import('./X.vue'))` — một dòng, Vite/Webpack tự tách file và tải đúng lúc render.

## 4. Sử dụng Async Component như component bình thường

Mục này trấn an bạn: sau khi định nghĩa, async component không phải "hàng đặc biệt" — dùng y như component thường.

Sau khi định nghĩa, `AsyncComp` có thể được sử dụng hoàn toàn giống như bất kỳ component đồng bộ nào khác:
- Nhận dữ liệu qua **props**.
- Chứa nội dung trong **slots**.

**Ví dụ:**
> 📄 **Code ví dụ:** [`examples/03-4-su-dung-async-component-nhu-component-binh.html`](examples/03-4-su-dung-async-component-nhu-component-binh.html)

## 5. Đăng ký Async Component

### 5.1. Đăng ký Global
Sử dụng cho các component cần dùng ở rất nhiều nơi.
> 📄 **Code ví dụ:** [`examples/04-5-1-ang-ky-global.js`](examples/04-5-1-ang-ky-global.js)

### 5.2. Đăng ký Local (Options API)
> 📄 **Code ví dụ:** [`examples/05-5-2-ang-ky-local-options-api.html`](examples/05-5-2-ang-ky-local-options-api.html)

### 5.3. Đăng ký Local (Composition API – `<script setup>`)
> 📄 **Code ví dụ:** [`examples/06-5-3-ang-ky-local-composition-api-script.html`](examples/06-5-3-ang-ky-local-composition-api-script.html)

## 6. Trạng thái Loading & Error

Quá trình tải dữ liệu bất đồng bộ luôn đi kèm với các trạng thái chờ đợi hoặc sai sót.

Vue cho phép tùy biến giao diện cho từng trạng thái cụ thể:
- ⏳ **Loading:** Đang trong quá trình tải.
- ❌ **Error:** Gặp lỗi khi tải (ví dụ: mất mạng).

**Cấu hình nâng cao:**
> 📄 **Code ví dụ:** [`examples/07-6-trang-thai-loading-error.js`](examples/07-6-trang-thai-loading-error.js)

| Tùy chọn | Ý nghĩa |
| :--- | :--- |
| **`loader`** | Hàm thực hiện việc load component |
| **`loadingComponent`** | UI hiển thị trong lúc chờ tải |
| **`delay`** | Tránh việc "nháy" Loading nếu mạng quá nhanh |
| **`errorComponent`** | UI hiển thị khi Promise bị reject hoặc timeout |
| **`timeout`** | Giới hạn thời gian tải tối đa (ms) |

> **Cách đọc bảng này:** mỗi dòng là một "kịch bản" của cuộc tải — `loader` là nhân vật chính, bốn dòng còn lại là màn sân khấu (loading), đồng hồ (delay/timeout) và màn hậu trường (error). Đọc theo thứ tự trên là hiểu đúng thứ tự triển khai.

**Ví dụ Loading Component:**
> 📄 **Code ví dụ:** [`examples/08-6-trang-thai-loading-error.html`](examples/08-6-trang-thai-loading-error.html)

Ví von: giống như gọi món qua app — có màn "đang chuẩn bị" (loading), có cảnh báo nếu bếp quá lâu không đáp (timeout/error), khách không phải đứng đoán mò.

**Ví dụ Error Component:**
> 📄 **Code ví dụ:** [`examples/09-6-trang-thai-loading-error.html`](examples/09-6-trang-thai-loading-error.html)

> **Tóm gọn 1 câu:** Với cấu hình nâng cao, async component tự lo trọn bộ trải nghiệm chờ đợi: spinner có `delay` chống nháy, màn hình lỗi có `timeout` gác giờ.

## 7. Lazy Hydration (Sử dụng cho SSR)

Mục này nói về lớp tối ưu dành riêng cho SSR: HTML có sẵn từ server rồi, nhưng JavaScript sẽ chỉ "đánh thức" (hydrate) từng phần khi thực sự cần — như tắt đèn các phòng không ai ở.

> [!CAUTION]
> Tính năng này (từ Vue 3.5+) chỉ áp dụng khi bạn sử dụng **Server-Side Rendering (SSR)**.

**Lợi ích:**
- Cho phép render HTML từ server để SEO tốt.
- Nhưng không tải JavaScript (Hydrate) ngay lập tức tại máy khách.
- Chỉ thực hiện Hydration (làm cho trang web có khả năng tương tác) khi các điều kiện cụ thể được thỏa mãn.

## 8. Các chiến lược Hydration có sẵn

Mục này là "thực đơn" các điều kiện đánh thức component của Vue 3.5+: theo thời gian rảnh, theo viewport, theo media query hay theo tương tác — chọn món hợp với từng loại component.

### 8.1. Hydrate khi browser rảnh (`hydrateOnIdle`)
Tận dụng thời gian trình duyệt không bận xử lý tác vụ nặng.
> 📄 **Code ví dụ:** [`examples/10-8-1-hydrate-khi-browser-ranh-hydrateonidle.js`](examples/10-8-1-hydrate-khi-browser-ranh-hydrateonidle.js)
📌 Dùng `requestIdleCallback`

### 8.2. Hydrate khi component xuất hiện trong viewport (`hydrateOnVisible`)
Chỉ hydrate khi người dùng cuộn trang tới vị trí của component.
> 📄 **Code ví dụ:** [`examples/11-8-2-hydrate-khi-component-xuat-hien-trong.js`](examples/11-8-2-hydrate-khi-component-xuat-hien-trong.js)
➡️ Dựa vào `IntersectionObserver`

### 8.3. Hydrate theo media query (`hydrateOnMediaQuery`)
Chỉ hydrate khi điều kiện CSS thỏa mãn (ví dụ: trên thiết bị di động).
> 📄 **Code ví dụ:** [`examples/12-8-3-hydrate-theo-media-query-hydrateonmediaquery.js`](examples/12-8-3-hydrate-theo-media-query-hydrateonmediaquery.js)
➡️ Chỉ hydrate khi điều kiện CSS đúng

### 8.4. Hydrate khi có tương tác (`hydrateOnInteraction`)
Chỉ tải JS khi người dùng click, hover hoặc gõ phím vào component.
> 📄 **Code ví dụ:** [`examples/13-8-4-hydrate-khi-co-tuong-tac-hydrateoninteraction.js`](examples/13-8-4-hydrate-khi-co-tuong-tac-hydrateoninteraction.js)
📌 Event gây ra hydration sẽ được replay lại sau khi hydrate

> **Tóm gọn 1 câu:** Bốn chiến lược — rảnh thì đánh thức, cuộn tới thì đánh thức, đúng thiết bị thì đánh thức, chạm vào thì đánh thức — chọn theo hành vi người dùng.

## 9. Custom Hydration Strategy

Mục này nói về cửa sau: nếu bốn chiến lược có sẵn không vừa, bạn tự viết điều kiện hydrate của riêng mình.

Bạn hoàn toàn có thể tự viết logic điều khiển việc hydrate.

**Ví dụ:**
> 📄 **Code ví dụ:** [`examples/14-9-custom-hydration-strategy.ts`](examples/14-9-custom-hydration-strategy.ts)

## 10. Async Component + `<Suspense>`

Mục này nói về người bạn đồng hành sẵn có: bọc async component trong `<Suspense>` để có loading UI tập trung và chuyên nghiệp hơn.

Async Components hoạt động cực kỳ mượt mà khi được bọc trong component đặc biệt `<Suspense>`.

📌 **`<Suspense>` giúp:**
- Quản lý tập trung nhiều async component con cùng lúc.
- Hiển thị nội dung dự phòng (Fallback UI) một cách chuyên nghiệp.

> [!TIP]
> Chi tiết sâu hơn sẽ có trong bài học riêng về **Suspense**.

> **Tóm gọn 1 câu:** Đặt async component trong `<Suspense>` là bạn có sẵn "quầy lễ tân" hiển thị fallback gọn gàng trong lúc tải.

## 11. Tổng kết nhanh

Mục này gói lại bài học thành hai nhóm cần nhớ: async component để làm gì, và các từ khóa phải thuộc.

✅ **Async Component là công cụ đắc lực để:**
- Tối ưu hóa hiệu năng ứng dụng (Performance).
- Thực hiện nạp chồng nội dung trì hoãn (Lazy loading).

✅ **Các từ khóa quan trọng cần nhớ:**
1. `defineAsyncComponent`
2. Dynamic `import()`
3. Giao diện **Loading** & **Error**
4. Kết hợp với `<Suspense>`
5. Chiến lược **Lazy Hydration** (dành cho SSR)

> **Tóm gọn 1 câu:** Async Component là "đặt hàng trước — giao khi cần": code nặng chỉ về máy khi thực sự hiện ra màn hình.
