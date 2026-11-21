# Suspense trong Vue 3: Tóm tắt Đầy đủ & Dễ hiểu

Bài này đi qua toàn bộ về `<Suspense>` trong Vue 3: cách quản lý tập trung trạng thái chờ của nhiều tác vụ bất đồng bộ — kèm ví dụ cho từng phần.

---

## 1. `<Suspense>` là gì?

Mục này giới thiệu "lễ tân tập trung": thay vì mỗi async component tự treo một biển "đang tải", Suspense đứng ra chờ hết cả đoàn rồi mở cửa một lần — màn hình không nhảy loạn spinner.

`<Suspense>` là một component dựng sẵn (built-in) của Vue 3, được dùng để quản lý các tác vụ bất đồng bộ (async) trong cây component.

**Mục đích chính:**
- Hiển thị trạng thái chờ (loading state) một cách tập trung.
- Đợi nhiều async component hoặc async `setup()` hoàn thành trước khi hiển thị giao diện chính.

> [!CAUTION]
> **Experimental:** Tính năng này hiện vẫn đang trong giai đoạn thử nghiệm (experimental) và API có thể thay đổi trong tương lai.

👉 **Vấn đề giải quyết:** Không cần mỗi component phải tự xử lý logic hiển thị spinner riêng lẻ, giúp tránh tình trạng giao diện bị "nhảy" hoặc quá nhiều spinner xuất hiện lộn xộn.

> **Tóm gọn 1 câu:** `<Suspense>` là "lễ tân tập trung" — chờ trọn bộ async xong rồi mới mở cửa, thay vì từng phòng tự treo biển đang tải.

---

## 2. Async Dependencies (Phụ thuộc bất động bộ)

Mục này nói về "tầm soát toàn cây": Suspense quét mọi async dependency ở mọi tầng lồng nhau và chờ tất cả xong mới đổi trạng thái.

`<Suspense>` sẽ theo dõi và đợi tất cả các "phụ thuộc bất đồng bộ" bên trong cây component của nó hoàn thành trước khi chuyển từ trạng thái fallback sang trạng thái hiển thị chính.

**Ví dụ cấu trúc cây component:**
```text
<Suspense>
 └─ <Dashboard>
    ├─ <Profile>
    │  └─ <FriendStatus> (async setup)
    └─ <Content>
       ├─ <ActivityFeed> (async component)
       └─ <Stats> (async component)
```
➡️ Nếu bất kỳ component con nào ở bất kỳ cấp độ nào là async, `<Suspense>` sẽ chờ cho đến khi tất cả chúng sẵn sàng.

---

## 3. Async setup()

Mục này trả lời "cái gì được tính là async dependency": component có `setup()` async hoặc top-level `await` trong `<script setup>` đều được.

### 3.1 `setup()` dạng async (Composition API)
Khi sử dụng Options API hoặc hàm `setup()` truyền thống, bạn có thể định nghĩa nó là một hàm `async`.

> 📄 **Code ví dụ:** [`examples/01-3-1-setup-dang-async-composition-api.js`](examples/01-3-1-setup-dang-async-composition-api.js)
➡️ Component này sẽ tự động được coi là một async dependency của `<Suspense>`.

### 3.2 `<script setup>` với `await` (Tự động async)
Trong `<script setup>`, bạn có thể sử dụng `await` trực tiếp ở cấp cao nhất (top-level await).

> 📄 **Code ví dụ:** [`examples/02-3-2-script-setup-voi-await-tu-ong.html`](examples/02-3-2-script-setup-voi-await-tu-ong.html)

---

## 4. Async Components

Mục này nói về quan hệ giữa `<Suspense>` và async component: mặc định Suspense "nuốt trọn" quyền điều khiển loading, trừ khi bạn từ chối bằng `suspensible: false`.

### 4.1 Mặc định bị `<Suspense>` kiểm soát
Khi sử dụng `defineAsyncComponent`, component tải chậm này sẽ mặc định được `<Suspense>` quản lý nếu nó nằm trong cây component của Suspense.

> 📄 **Code ví dụ:** [`examples/03-4-1-mac-inh-bi-suspense-kiem-soat.js`](examples/03-4-1-mac-inh-bi-suspense-kiem-soat.js)
➡️ Trạng thái loading riêng của component này sẽ bị bỏ qua, nhường quyền điều khiển cho `<Suspense>`.

### 4.2 Thoát khỏi sự kiểm soát (`suspensible: false`)
Nếu muốn component tự xử lý trạng thái loading của chính nó thay vì đợi cùng `<Suspense>`, hãy đặt `suspensible: false`.

> 📄 **Code ví dụ:** [`examples/04-4-2-thoat-khoi-su-kiem-soat-suspensible.js`](examples/04-4-2-thoat-khoi-su-kiem-soat-suspensible.js)

---

## 5. Loading State (Default & Fallback Slot)

Mục này nói về "hai cánh cửa" của Suspense: `#default` là sân khấu chính, `#fallback` là tấm màn che trong lúc chờ.

`<Suspense>` hoạt động dựa trên 2 slot chính:
- **`#default`**: Nội dung chính của ứng dụng (nơi chứa các tasks async).
- **`#fallback`**: Giao diện hiển thị trong lúc chờ đợi (Loading UI).

> [!IMPORTANT]
> Mỗi slot bên trong `<Suspense>` chỉ được phép chứa **một node gốc duy nhất**.

**Ví dụ cơ bản:**
> 📄 **Code ví dụ:** [`examples/05-5-loading-state-default-fallback-slot.html`](examples/05-5-loading-state-default-fallback-slot.html)

**Cơ chế hoạt động:**
1. Render nội dung trong `#default` vào bộ nhớ đệm.
2. Nếu gặp async dependency → Chuyển sang trạng thái **pending**.
3. Hiển thị nội dung trong `#fallback`.
4. Khi tất cả async tasks hoàn tất → Hiển thị nội dung `#default` ra màn hình.

---

## 6. Events của `<Suspense>`

Mục này nói về "hệ thống báo tin": Suspense phát ra ba sự kiện để bạn theo dõi tiến trình từ chờ đến xong.

`<Suspense>` phát ra các sự kiện để bạn có thể theo dõi tiến trình:

| Event | Khi nào xảy ra |
| :--- | :--- |
| **`pending`** | Bắt đầu quá trình tải (vào trạng thái pending) |
| **`resolve`** | Tất cả nội dung trong `#default` đã tải xong |
| **`fallback`** | Nội dung `#fallback` bắt đầu được hiển thị |

> **Cách đọc bảng này:** đọc theo trình tự thời gian của một lần tải — pending → fallback → resolve, cột phải mô tả đúng thời điểm từng sự kiện kêu.

**Ví dụ:**
> 📄 **Code ví dụ:** [`examples/06-6-events-cua-suspense.html`](examples/06-6-events-cua-suspense.html)

---

## 7. Error Handling (Xử lý lỗi)

Mục này nói về "điểm mù" của Suspense: nó không bắt lỗi async — muốn bắt phải gắn `onErrorCaptured` ở component cha, như lễ tân không xử lý được thì báo bảo vệ.

> [!WARNING]
> Bản thân `<Suspense>` **không xử lý lỗi** xảy ra bên trong các tác vụ async.

Để xử lý lỗi (ví dụ API lỗi), bạn cần sử dụng:
- Hook `onErrorCaptured()` (Composition API).
- Hoặc Options `errorCaptured` (Options API).

**Ví dụ:**
> 📄 **Code ví dụ:** [`examples/07-7-error-handling-xu-ly-loi.js`](examples/07-7-error-handling-xu-ly-loi.js)

---

## 8. Kết hợp với các Built-in Components khác

Mục này nói về "trình tự diễu hành" khi Suspense đi chung Transition, KeepAlive và RouterView — thứ tự lồng nhau quyết định hành vi.

Khi sử dụng chung với `Transition`, `KeepAlive` và `RouterView`, thứ tự lồng nhau cực kỳ quan trọng:

> 📄 **Code ví dụ:** [`examples/08-8-ket-hop-voi-cac-built-in-components.html`](examples/08-8-ket-hop-voi-cac-built-in-components.html)

---

## 9. Nested `<Suspense>` (Vue 3.3+)

Mục này nói về "lễ tân trong lễ tân": Suspense lồng nhau với `suspensible` giúp đồng bộ trạng thái cha–con, tránh màn hình nhảy loạn nhiều fallback.

Dùng khi bạn có các `Suspense` lồng nhau. Thuộc tính `suspensible` giúp component con đồng bộ trạng thái với component `Suspense` cha.

> 📄 **Code ví dụ:** [`examples/09-9-nested-suspense-vue-3-3.html`](examples/09-9-nested-suspense-vue-3-3.html)
👉 **Lợi ích:** Tránh việc hiển thị quá nhiều fallback cùng lúc và giúp quá trình cập nhật DOM mượt mà hơn.

---

## 10. Tổng kết nhanh (Cheat Sheet) 🎯

Mục này gom cả bài vào một bảng ghi nhớ cuối cùng.

| Nội dung | Quy tắc ghi nhớ |
| :--- | :--- |
| **Mục đích** | Quản lý trạng thái chờ của nhiều async tasks cùng lúc |
| **Async setup** | Sử dụng `async setup()` hoặc top-level `await` trong `<script setup>` |
| **Slots** | Gồm 2 phần: `default` (nội dung) và `fallback` (loading) |
| **Events** | Theo dõi qua `pending`, `resolve`, `fallback` |
| **Xử lý lỗi** | Bắt buộc dùng `onErrorCaptured` ở component cha |
| **Trạng thái** | Hiện tại vẫn là tính năng **Experimental** |

> **Cách đọc bảng này:** dò theo hàng ngang — cần cấu hình gì, nghe sự kiện nào, bắt lỗi ra sao đều có một hàng riêng; hàng cuối nhắc bạn nhớ tư cách experimental trước khi đưa vào production.

> **Tóm gọn 1 câu:** `<Suspense>` gom mọi async thành một lần chờ duy nhất — `#default` chờ mở màn, `#fallback` che màn, còn lỗi thì phải nhờ `onErrorCaptured`.