# Provide / Inject trong Vue 3: Tóm tắt Đầy đủ & Dễ hiểu

Bài này giải thích trọn bộ **Provide / Inject** trong Vue 3: từ vấn đề prop drilling, cách provide và inject, cho đến reactivity và best practices — kèm ví dụ cho từng phần.

## 1. Vấn đề: Prop Drilling là gì?

Mục này nói về căn bệnh mà provide/inject sinh ra để chữa: dữ liệu phải "đi kiểm" qua từng tầng component trung gian dù tầng nào cũng chẳng dùng — như chuyển lời chào từ ông tổ đến chắt mà cả nhà đều phải đứng làm bưu tá.

❌ **Prop Drilling** xảy ra khi:
- Dữ liệu cần truyền từ một component cha ở cấp rất cao xuống một component con ở cấp rất sâu.
- Phải truyền props qua nhiều cấp component trung gian, mặc dù các component này hoàn toàn không sử dụng đến dữ liệu đó.

**Hệ quả:**
- Code trở nên rườm rà, lặp lại.
- Khó bảo trì và tái cấu trúc.
- Dễ phát sinh lỗi khi thay đổi tên prop hoặc logic truyền tin.

**Ví dụ về Prop Drilling:**
```text
<App>
 └── Layout (nhận props nhưng không dùng)
     └── Footer (nhận props nhưng không dùng)
         └── DeepChild (cần dùng props thực sự)
```

> **Tóm gọn 1 câu:** Prop drilling là "chuyển tay qua ba người chỉ để một người dùng" — rườm rà, dễ lỗi, khó bảo trì.

## 2. Giải pháp: Provide / Inject là gì?

Mục này giới thiệu phương thuốc: tổ tiên "đưa thẳng" dữ liệu xuống bất kỳ cháu chít nào cần — tầng giữa không phải cầm chuyến nữa.

✅ **Provide / Inject** là cơ chế **Dependency Injection** trong Vue.

**Nó cho phép:**
- Component cha **provide** (cung cấp) dữ liệu cho toàn bộ cây component con của nó.
- Bất kỳ component con nào (dù sâu bao nhiêu) cũng có thể **inject** (nhận) dữ liệu đó.
- Loại bỏ hoàn toàn việc truyền props qua các component trung gian.

> [!IMPORTANT]
> **Nguyên tắc:** Component con chỉ việc “lấy” dữ liệu mình cần, nó không quan tâm dữ liệu đó đến từ tầng nào phía trên.

> **Tóm gọn 1 câu:** Provide/Inject là "hộp thư chung của gia đình" — tổ tiên đặt vào, hậu duệ nào cần thì lấy, tầng giữa không phải làm bưu tá.

## 3. Provide – Cung cấp dữ liệu

Mục này nói về phía "người đặt hàng vào hộp thư": các cách provide từ Composition API đến Options API, và quan trọng nhất là provide dữ liệu reactive.

### 3.1. Provide với Composition API (`<script setup>`)

> 📄 **Code ví dụ:** [`examples/01-3-1-provide-voi-composition-api-script-setup.html`](examples/01-3-1-provide-voi-composition-api-script-setup.html)
- `'message'`: Key định danh.
- `'Hello Vue!'`: Giá trị cung cấp.

📌 Một component có thể gọi `provide()` nhiều lần để cung cấp nhiều bộ dữ liệu khác nhau.

### 3.2. Provide trong `setup()` (không dùng script setup)

> 📄 **Code ví dụ:** [`examples/02-3-2-provide-trong-setup-khong-dung-script.js`](examples/02-3-2-provide-trong-setup-khong-dung-script.js)

> [!WARNING]
> `provide()` phải được gọi đồng bộ bên trong hàm `setup()`.

### 3.3. Provide dữ liệu reactive

> 📄 **Code ví dụ:** [`examples/03-3-3-provide-du-lieu-reactive.js`](examples/03-3-3-provide-du-lieu-reactive.js)
📌 Component nhận (inject) sẽ nhận được chính ref đó, đảm bảo tính reactive được giữ nguyên trên toàn hệ thống.

### 3.4. Provide với Options API

**a. Provide tĩnh:**
> 📄 **Code ví dụ:** [`examples/04-3-4-provide-voi-options-api.js`](examples/04-3-4-provide-voi-options-api.js)

**b. Provide theo từng instance (dùng function):**
> 📄 **Code ví dụ:** [`examples/05-3-4-provide-voi-options-api.js`](examples/05-3-4-provide-voi-options-api.js)

> [!CAUTION]
> Dữ liệu được provide qua Options API mặc định **không reactive** trừ khi bạn sử dụng `computed()` hoặc truyền một object chứa ref.

## 4. App-level Provide (Toàn ứng dụng)

Mục này nâng provide lên cấp cao nhất: đặt dữ liệu vào `main.ts` thì cả ứng dụng đều inject được — như bảng thông báo treo ở sảnh chung thay vì dán trong từng căn hộ.

> 📄 **Code ví dụ:** [`examples/06-4-app-level-provide-toan-ung-dung.js`](examples/06-4-app-level-provide-toan-ung-dung.js)
📌 Tất cả các component bên trong ứng dụng đều có thể inject được dữ liệu này. Rất hữu ích khi viết plugin hoặc cung cấp các cấu hình toàn cục.

## 5. Inject – Nhận dữ liệu

Mục này nói về phía "người lấy hàng": inject ở script setup, setup() hay Options API — Vue luôn tìm provider gần nhất ngược lên trên cây component.

### 5.1. Inject với Composition API

> 📄 **Code ví dụ:** [`examples/07-5-1-inject-voi-composition-api.html`](examples/07-5-1-inject-voi-composition-api.html)
📌 Vue sẽ tìm kiếm provider gần nhất trong cây component ngược lên trên.

### 5.2. Inject trong `setup()`

> 📄 **Code ví dụ:** [`examples/08-5-2-inject-trong-setup.js`](examples/08-5-2-inject-trong-setup.js)

### 5.3. Inject với Options API

> 📄 **Code ví dụ:** [`examples/09-5-3-inject-voi-options-api.js`](examples/09-5-3-inject-voi-options-api.js)

Inject cũng có thể được sử dụng ngay trong phần khởi tạo `data()`:

> 📄 **Code ví dụ:** [`examples/10-5-3-inject-voi-options-api.js`](examples/10-5-3-inject-voi-options-api.js)

> **Tóm gọn 1 câu:** Inject là "mở hộp thư gần nhất" — Vue tìm ngược lên cây component và lấy dữ liệu từ provider đầu tiên gặp được.

## 6. Injection Aliasing (Đổi tên khi inject)

Mục này nói về việc "đổi nhãn hàng khi nhận": giữ nguyên key của provider nhưng đặt tên biến thân thiện hơn trong component của bạn.

Sử dụng khi bạn muốn biến nhúng trong component có tên khác với key mà provider cung cấp.

**Options API:**
> 📄 **Code ví dụ:** [`examples/11-6-injection-aliasing-oi-ten-khi-inject.js`](examples/11-6-injection-aliasing-oi-ten-khi-inject.js)
👉 Cách dùng: `this.localMessage`

## 7. Giá trị mặc định khi inject

Mục này nói về "phương án khi hộp thư trống": nếu không ai provide key đó, inject trả về giá trị dự phòng thay vì `undefined` gây lỗi im lặng.

Đề phòng trường hợp không có component cha nào provide key đó.

### 7.1. Giá trị mặc định đơn giản
> 📄 **Code ví dụ:** [`examples/12-7-1-gia-tri-mac-inh-on-gian.js`](examples/12-7-1-gia-tri-mac-inh-on-gian.js)

### 7.2. Dùng factory function
Dùng khi giá trị mặc định là một object hoặc mảng để tránh tạo lại đối tượng không cần thiết.
> 📄 **Code ví dụ:** [`examples/13-7-2-dung-factory-function.js`](examples/13-7-2-dung-factory-function.js)
- Tham số thứ 3 là `true` báo hiệu rằng tham số thứ 2 là một factory function.

### 7.3. Default trong Options API
> 📄 **Code ví dụ:** [`examples/14-7-3-default-trong-options-api.js`](examples/14-7-3-default-trong-options-api.js)

## 8. Làm việc với Reactivity (RẤT QUAN TRỌNG)

Mục này là phần trọng tâm nhất của bài: dữ liệu provide phải reactive đúng cách, và người nhận không nên tự sửa — muốn đổi phải xin provider, như mượn đồ thì nhờ chủ nhà di chuyển chứ không tự dời.

### 8.1. Khuyến nghị (Best Practice)
- **Hạn chế** việc thay đổi trực tiếp (mutate) state từ phía component nhận (injector).
- Nên cung cấp kèm theo một **function** để cập nhật state từ chính component cung cấp (provider).

### 8.2. Ví dụ chuẩn

**Provider:**
> 📄 **Code ví dụ:** [`examples/15-8-2-vi-du-chuan.html`](examples/15-8-2-vi-du-chuan.html)

**Injector:**
> 📄 **Code ví dụ:** [`examples/16-8-2-vi-du-chuan.html`](examples/16-8-2-vi-du-chuan.html)

### 8.3. Bảo vệ dữ liệu bằng `readonly()`
Nếu bạn muốn đảm bảo dữ liệu không bị thay đổi từ bên dưới:
> 📄 **Code ví dụ:** [`examples/17-8-3-bao-ve-du-lieu-bang-readonly.js`](examples/17-8-3-bao-ve-du-lieu-bang-readonly.js)

> **Tóm gọn 1 câu:** Provide ref + hàm cập nhật từ provider, kèm `readonly()` nếu muốn — người nhận dùng được nhưng không sửa được "trực tiếp".

## 9. Sử dụng Symbol làm key (Dự án lớn)

Mục này nói về "mã hóa tủ đồ" khi nhà quá đông: dùng Symbol thay chuỗi làm key để hai thư viện/component không bao giờ cầm nhầm hộp của nhau.

Để tránh xung đột tên key (naming collisions) khi ứng dụng có quá nhiều `provide` hoặc khi bạn đang viết thư viện cho người khác dùng.

**`keys.js` (Khai báo):**
> 📄 **Code ví dụ:** [`examples/18-9-su-dung-symbol-lam-key-du-an.js`](examples/18-9-su-dung-symbol-lam-key-du-an.js)

**Provider:**
> 📄 **Code ví dụ:** [`examples/19-9-su-dung-symbol-lam-key-du-an.js`](examples/19-9-su-dung-symbol-lam-key-du-an.js)

**Injector:**
> 📄 **Code ví dụ:** [`examples/20-9-su-dung-symbol-lam-key-du-an.js`](examples/20-9-su-dung-symbol-lam-key-du-an.js)

## 10. Tóm tắt nhanh (Cheat Sheet)

Mục này gom toàn bộ quy tắc của bài vào một bảng ôn nhanh.

| Nội dung | Quy tắc ghi nhớ |
| :--- | :--- |
| **Khi nào dùng** | Khi cần tránh tình trạng Prop Drilling |
| **Provide** | Cung cấp dữ liệu từ tổ tiên cho toàn bộ cây con |
| **Inject** | Nhận dữ liệu từ provider gần nhất phía trên |
| **Reactivity** | Luôn dùng `ref`, `computed`, hoặc `readonly` |
| **Update state** | Ưu tiên truyền kèm function xử lý update |
| **App-wide** | Dùng `app.provide()` trong file main |
| **Dự án lớn** | Sử dụng `Symbol` làm key để tránh trùng lặp |

> **Cách đọc bảng này:** cột trái là chủ đề, cột phải là quy tắc một dòng — khi nghi ngờ cách dùng đúng, dò hàng ngang tương ứng thay vì đọc lại cả bài.

> **Tóm gọn 1 câu:** Provide/Inject là "thang máy chở dữ liệu": tổ tiên gửi, hậu duệ nhận ở bất kỳ tầng nào — nhớ reactive, nhớ hàm cập nhật, nhớ Symbol cho dự án lớn.