# KeepAlive trong Vue 3: Tóm tắt Đầy đủ & Dễ hiểu

Bài này đi qua toàn bộ về `<KeepAlive>` trong Vue 3: vì sao cần cache component, cách lọc và giới hạn cache, lifecycle đặc biệt — kèm ví dụ cho từng phần.

---

## 1. `<KeepAlive>` là gì?

Mục này giới thiệu "phòng nghỉ cho component": thay vì sa thải hẳn diễn viên khi rời sân khấu, KeepAlive cho họ vào phòng nghỉ giữ nguyên trang phục — quay lại là diễn tiếp ngay.

`<KeepAlive>` là một component dựng sẵn (built-in) của Vue dùng để **cache (ghi nhớ)** instance của component khi bạn thực hiện chuyển đổi giữa các component động.

👉 **Bình thường:**
- Khi chuyển đổi component → component cũ sẽ bị **unmount** (hủy bỏ).
- Toàn bộ **State** (dữ liệu, nội dung input, giá trị counter...) sẽ bị mất hoàn toàn.

👉 **Với `<KeepAlive>`:**
- Component cũ sẽ không bị destroy.
- Nó chỉ chuyển sang trạng thái **inactive** (ngưng hoạt động) và được lưu trữ trong bộ nhớ.
- Khi quay lại component đó → các trạng thái (State) cũ vẫn được giữ nguyên vẹn.

> **Tóm gọn 1 câu:** `<KeepAlive>` biến "unmount vĩnh viễn" thành "vào phòng nghỉ" — component rời màn hình vẫn giữ nguyên state.

---

## 2. Vấn đề khi KHÔNG dùng `<KeepAlive>`

Mục này dựng lên "bối cảnh trước khi có phòng nghỉ": chứng kiến component cũ bị dọn sạch mỗi lần chuyển trang, dữ liệu người dùng bay theo.

**Dynamic Component cơ bản:**
> 📄 **Code ví dụ:** [`examples/01-2-van-e-khi-khong-dung-keepalive.html`](examples/01-2-van-e-khi-khong-dung-keepalive.html)

**Hành vi mặc định:**
1. Chuyển từ Component A sang Component B.
2. Component A bị unmount khỏi DOM.
3. Khi quay lại Component A → Vue tạo một instance mới hoàn toàn.
4. Mọi dữ liệu đã nhập hoặc thay đổi trong Component A trước đó bị reset về mặc định.

📌 **Hành vi này phù hợp khi:**
- Bạn không cần giữ lại dữ liệu cũ.
- Bạn muốn component luôn được khởi tạo mới mỗi khi người dùng truy cập.

---

## 3. Giải pháp: Bọc bằng `<KeepAlive>`

Mục này là "lắp phòng nghỉ": một cặp thẻ bao ngoài là mọi trạng thái được bảo quản.

**Cách dùng cơ bản:**
> 📄 **Code ví dụ:** [`examples/02-3-giai-phap-boc-bang-keepalive.html`](examples/02-3-giai-phap-boc-bang-keepalive.html)

**Kết quả:**
- Khi chuyển đổi component: Component cũ sẽ được đưa vào bộ nhớ cache thay vì bị tiêu hủy.
- Khi quay lại: Trạng thái và dữ liệu cũ được khôi phục ngay lập tức.

**Ví dụ minh họa:**
- **Component A:** Chứa một bộ đếm (counter).
- **Component B:** Chứa một ô nhập liệu (input).

👉 **Khi dùng `<KeepAlive>`:** Nếu bạn tăng counter ở A, sau đó chuyển sang B nhập văn bản, rồi quay lại A thì giá trị counter vẫn được giữ nguyên như lúc bạn rời đi.

> **Tóm gọn 1 câu:** Bọc `<KeepAlive>` quanh dynamic component là xong — đổi qua đổi lại bao nhiêu lần, counter và input vẫn "nhớ" như chưa rời đi.

---

## 4. Lưu ý khi dùng trong DOM template

Mục này nói về "chi tiết chữ viết": trong DOM template, trình duyệt không phân biệt hoa thường nên phải viết `<keep-alive>` thường có gạch nối.

Nếu bạn viết template trực tiếp trong file HTML (không phải Single File Component - SFC):

> 📄 **Code ví dụ:** [`examples/03-4-luu-y-khi-dung-trong-dom-template.html`](examples/03-4-luu-y-khi-dung-trong-dom-template.html)

> [!IMPORTANT]
> Trình duyệt xử lý các thẻ HTML không phân biệt hoa thường, do đó trong môi trường DOM thực tế, bạn **phải** sử dụng tên thẻ là `<keep-alive>` (viết thường, có gạch nối).

---

## 5. Include / Exclude – Chỉ cache component mong muốn

Mục này nói về "danh sách khách mời": mặc định ai vào phòng nghỉ cũng được, nhưng `include`/`exclude` cho phép chọn người — và điều kiện nhận diện là thuộc tính `name`.

Mặc định, `<KeepAlive>` sẽ cache **tất cả** các component con bên trong nó. Bạn có thể giới hạn điều này bằng hai thuộc tính `include` và `exclude`.

> [!CAUTION]
> **Điều kiện quan trọng:** Vue so sánh dựa trên thuộc tính `name` của component. Nếu component không có `name`, nó sẽ không thể được nhận diện chính xác bởi `include`/`exclude`.
> ```js
> export default {
>   name: 'MyComponent'
> }
> ```

### 5.1 Include – Chỉ cache những component được chỉ định

**a. Chuỗi (ngăn cách bởi dấu phẩy):**
> 📄 **Code ví dụ:** [`examples/04-5-1-include-chi-cache-nhung-component-uoc.html`](examples/04-5-1-include-chi-cache-nhung-component-uoc.html)

**b. Biểu thức chính quy (RegExp):**
> 📄 **Code ví dụ:** [`examples/05-5-1-include-chi-cache-nhung-component-uoc.html`](examples/05-5-1-include-chi-cache-nhung-component-uoc.html)

**c. Mảng (Array):**
> 📄 **Code ví dụ:** [`examples/06-5-1-include-chi-cache-nhung-component-uoc.html`](examples/06-5-1-include-chi-cache-nhung-component-uoc.html)

### 5.2 Exclude – Loại trừ những component không muốn cache

> 📄 **Code ví dụ:** [`examples/07-5-2-exclude-loai-tru-nhung-component-khong.html`](examples/07-5-2-exclude-loai-tru-nhung-component-khong.html)
👉 Component `Login` sẽ luôn bị tiêu hủy (unmount) mỗi khi người dùng chuyển sang component khác.

---

## 6. Max Cached Instances – Giới hạn số lượng cache

Mục này nói về "sức chứa phòng nghỉ": prop `max` giới hạn số chỗ, và cơ chế LRU đuổi người ít dùng nhất để nhường chỗ — như bãi giữ xe đầy thì xe lâu không ai lấy bị dọn trước.

Sử dụng prop `max` để giới hạn số lượng instance tối đa được giữ lại trong bộ nhớ.

> 📄 **Code ví dụ:** [`examples/08-6-max-cached-instances-gioi-han-so-luong.html`](examples/08-6-max-cached-instances-gioi-han-so-luong.html)

**Cơ chế hoạt động:**
- `<KeepAlive>` hoạt động theo thuật toán **LRU (Least Recently Used)**.
- Khi số lượng component vượt quá con số `max`: Instance nào **ít được sử dụng nhất** trong thời gian qua sẽ bị tiêu hủy để nhường chỗ cho instance mới.

📌 **Hữu ích khi:** Ứng dụng có rất nhiều tab hoặc view phức tạp, giúp tránh tiêu tốn quá nhiều bộ nhớ hệ thống.

---

## 7. Lifecycle của component được cache

Mục này nói về "hai hồi chuông riêng" của component trong phòng nghỉ: được gọi ra (`activated`) và được đưa vào (`deactivated`) — luân phiên thay cho mount/unmount.

Component nằm bên trong `<KeepAlive>` sẽ có hai hook vòng đời đặc biệt:

| Trạng thái | Hook tương ứng |
| :--- | :--- |
| Khi được hiển thị lại từ cache | **`activated`** / **`onActivated`** |
| Khi bị ẩn đi và đưa vào cache | **`deactivated`** / **`onDeactivated`** |

> **Cách đọc bảng này:** hai dòng là hai hướng đi — ra khỏi phòng nghỉ và vào phòng nghỉ; mỗi dòng kèm tên hook cho cả Options API lẫn Composition API.

### 7.1 Composition API
> 📄 **Code ví dụ:** [`examples/09-7-1-composition-api.html`](examples/09-7-1-composition-api.html)

### 7.2 Options API
> 📄 **Code ví dụ:** [`examples/10-7-2-options-api.js`](examples/10-7-2-options-api.js)

> [!NOTE]
> - `activated` cũng sẽ được gọi ngay khi component được mount lần đầu tiên.
> - `deactivated` cũng sẽ được gọi khi component chuẩn bị bị unmount hoàn toàn khỏi ứng dụng.
> - Các hook này áp dụng cho cả component gốc trong `<KeepAlive>` và **tất cả các component con** sâu bên trong nó.

---

## 8. Khi nào NÊN và KHÔNG NÊN dùng `<KeepAlive>`

Mục này là "khuyến nghị sử dụng" của bài: cache là quyền lợi có giá — nhớ RAM, và đôi khi bạn lại cần dữ liệu được làm mới.

✅ **NÊN dùng khi:**
- Hệ thống điều hướng dạng Tab.
- Các Form nhập liệu nhiều bước (Wizard form).
- Các component tốn nhiều tài nguyên để render lại từ đầu.
- Khi người dùng thường xuyên chuyển đổi qua lại giữa các màn hình mà cần giữ nguyên trạng thái làm việc.

❌ **KHÔNG NÊN dùng khi:**
- Component chứa các dữ liệu nhạy cảm cần được xóa bỏ khi rời khỏi.
- Khi bạn thực sự muốn dữ liệu được làm mới (reset) hoàn toàn mỗi khi người dùng mở lại.
- Lạm dụng quá nhiều làm tiêu tốn dung lượng bộ nhớ (RAM).

---

---

## 9. Ví dụ thực tế (Live Example)

Mục này là "buổi diễn tổng hợp": dựng nguyên một hệ thống tab dùng KeepAlive để giữ trạng thái Counter và Input.

Dưới đây là cách triển khai một hệ thống tab đơn giản sử dụng `<KeepAlive>` để giữ trạng thái cho Counter và Input.

### Component gốc (`App.vue`)
> 📄 **Code ví dụ:** [`examples/11-component-goc-app-vue.html`](examples/11-component-goc-app-vue.html)

### Component con (`CompA.vue`)
> 📄 **Code ví dụ:** [`examples/12-component-con-compa-vue.html`](examples/12-component-con-compa-vue.html)

---

## 10. Tóm tắt nhanh (Cheat sheet) 🎯

Mục này chốt lại toàn bài bằng năm gạch đầu dòng cần nhớ.

- **`<KeepAlive>`**: Dùng để cache component, tránh unmount.
- **Dùng với**: `<component :is="...">`.
- **`include` / `exclude`**: Lọc các component muốn hoặc không muốn cache.
- **`max`**: Giới hạn số lượng instance trong bộ nhớ (theo cơ chế LRU).
- **Lifecycle đặc biệt**: `activated` (hiện ra) và `deactivated` (ẩn đi).

> **Tóm gọn 1 câu:** `<KeepAlive>` là "phòng nghỉ có giờ giấc": giữ nguyên state giữa các lần đổi màn hình, lọc bằng include/exclude, chật thì LRU đuổi người ít dùng.