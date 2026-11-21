Bạn nhận xét rất đúng 👌

Bề ngoài `computed` – `watch` – `watchEffect` đều:

🔁 re-run khi dependency thay đổi

Nhưng mục đích thiết kế, cách chạy, và thứ chúng sinh ra hoàn toàn khác nhau.
Mình sẽ giải thích theo tư duy thực tế + ví dụ đời thật, không giáo điều.

# 1️⃣ Điểm giống nhau (để bạn thấy mình không hiểu nhầm)

Cả 3 đều:

- Dựa trên Vue reactivity
- Track dependency
- Re-run khi dependency thay đổi
- Chạy reactive-driven, không cần gọi thủ công

👉 Nên cảm giác “chúng giống nhau” là hoàn toàn hợp lý

# 2️⃣ Sự khác biệt cốt lõi (1 câu mỗi cái)

Mục này chốt "một câu nhận diện" cho từng API — nhớ ba câu này là phân biệt được 80% tình huống.

| API | Bản chất |
| :--- | :--- |
| `computed` | Tạo ra giá trị mới từ state |
| `watch` | Phản ứng khi state thay đổi |
| `watchEffect` | Tự động phản ứng dựa trên những gì nó đọc |

> **Cách đọc bảng này:** đọc cột phải thành ba câu ngắn — "sinh giá trị", "phản ứng có đích", "phản ứng tự do". Ba hàng này là kim chỉ nam cho mọi quyết định chọn API.

# 3️⃣ computed – “Tôi sinh ra GIÁ TRỊ”

Mục này phân tích kỹ công cụ đầu tiên: computed như một "công thức toán" thuần túy.

## Bản chất

- Nhận dependency
- Trả về 1 giá trị
- Pure & không side-effect

Ví von: computed giống **máy bán nước tự động** — bỏ tiền đúng mệnh giá (dependency hợp lệ) là ra nước, nó không bao giờ tự đi pha thêm phụ gia (side-effect).

> 📄 **Code ví dụ:** [`examples/01-ban-chat.js`](examples/01-ban-chat.js)

## Đặc điểm quan trọng

- ✅ Có return
- ✅ Có cache (dependency không đổi → không re-run)
- ❌ Không async
- ❌ Không làm side-effect

> 📌 Tư duy:
>
> "Tôi là công thức toán học"

# 4️⃣ watch – “Khi mày đổi, tao LÀM GÌ ĐÓ”

Mục này phân tích công cụ thứ hai: watch không sinh giá trị, nó "thuê người canh" và giao việc khi có biến động.

## Bản chất

- Lắng nghe 1 dependency cụ thể
- Thực hiện side-effect

Ví von: watch giống như **thợ canh kho thuê theo giờ** — bạn dặn "kho A thay đổi thì gọi điện báo tôi": nó không tạo ra hàng hóa gì, chỉ hành động khi có biến động.

> 📄 **Code ví dụ:** [`examples/02-ban-chat.js`](examples/02-ban-chat.js)

## Đặc điểm

- ✅ Async
- ✅ Có oldValue, newValue
- ✅ Có immediate, once, deep
- ❌ Không trả về giá trị

> 📌 Tư duy:
>
> "Khi X thay đổi → làm hành động Y"

# 5️⃣ watchEffect – “Tao nhìn xem mày dùng gì, tao tự biết”

Mục này phân tích công cụ thứ ba: watchEffect tự phát hiện dependency thay vì được chỉ định — tiện nhưng dễ "rủi ro mất kiểm soát".

## Bản chất

- Không cần khai báo dependency
- Vue tự detect những gì được READ

Ví von: watchEffect giống **người phục vụ tự quan sát** — bạn chưa cần gọi, cứ thấy bạn chạm món gì là nó tự mang lên. Tiện thật, nhưng đôi khi nó mang món bạn chỉ "cầm xem thử".

> 📄 **Code ví dụ:** [`examples/03-ban-chat.js`](examples/03-ban-chat.js)

## Đặc điểm

- ✅ Code ngắn
- ✅ Tự động dependency
- ❌ Khó debug
- ❌ Nguy hiểm với async nếu không hiểu rõ

> 📌 Tư duy:
>
> "Cứ chạy đi, tao tự track"

# 6️⃣ Sự khác biệt THỰC TẾ (rất quan trọng)

## 🔁 Ví dụ giống nhau bề ngoài

> 📄 **Code ví dụ:** [`examples/04-vi-du-giong-nhau-be-ngoai.js`](examples/04-vi-du-giong-nhau-be-ngoai.js)

👉 Nhưng kết quả hoàn toàn khác:

| API | Kết quả |
| :--- | :--- |
| `computed` | Tạo ra giá trị mới |
| `watch` | Không tạo gì, chỉ phản ứng |
| `watchEffect` | Không tạo gì, chỉ chạy |

> **Cách đọc bảng này:** cùng một đoạn code chạy qua 3 API, cột phải là "sản phẩm" thu được — chỉ `computed` sinh ra giá trị, hai anh em còn lại chỉ hành động.

## 💥 Nếu bạn dùng SAI mục đích

❌ Dùng computed để fetch API

> 📄 **Code ví dụ:** [`examples/05-neu-ban-dung-sai-muc-ich.js`](examples/05-neu-ban-dung-sai-muc-ich.js)

→ ❌ sai thiết kế
→ ❌ không cleanup
→ ❌ khó kiểm soát

❌ Dùng watch để sinh giá trị hiển thị

> 📄 **Code ví dụ:** [`examples/06-neu-ban-dung-sai-muc-ich.js`](examples/06-neu-ban-dung-sai-muc-ich.js)

→ ❌ thừa code
→ ❌ mất cache

# 7️⃣ Khi nào dùng cái nào? (Rule of Thumb)

## ✅ Dùng computed khi:

- Bạn muốn giá trị mới
- Dữ liệu đồng bộ
- Không side-effect

## ✅ Dùng watch khi:

- Async / API
- Side-effect
- Cần oldValue
- Cần kiểm soát chính xác

## ✅ Dùng watchEffect khi:

- Nhiều dependency
- Code ngắn
- Không cần quá chính xác dependency

# 8️⃣ Bảng so sánh cuối (rất đáng nhớ)

Bảng dưới đây là "bản tổng kết" gom đủ sáu tiêu chí — khi phân vân giữa ba API, đối chiếu từng hàng.

| Tiêu chí | computed | watch | watchEffect |
| :--- | :--- | :--- | :--- |
| Trả về giá trị | ✅ | ❌ | ❌ |
| Side-effect | ❌ | ✅ | ✅ |
| Async | ❌ | ✅ | ⚠️ |
| Auto track | ✅ | ❌ | ✅ |
| Cache | ✅ | ❌ | ❌ |
| Debug dễ | ✅ | ✅ | ❌ |

> **Cách đọc bảng này:** đọc theo hàng ngang — mỗi hàng là một tiêu chí, so sánh ba cột xem API nào "đạt". Hàng "Trả về giá trị" là phân định quan trọng nhất: chỉ computed trả về giá trị.

# 9️⃣ Cách ghi nhớ đơn giản (1 câu)

- 🧠 `computed` = value
- 🧠 `watch` = reaction
- 🧠 `watchEffect` = auto-reaction

> **Tóm gọn 1 câu:** Ba anh em reactive: `computed` bán hàng (sinh giá trị), `watch` canh kho (phản ứng có đích), `watchEffect` tự phán đoán (phản ứng mọi thứ nó thấy).