# Pinia vs Vuex: Lựa chọn Quản lý State cho Vue 3

Dưới đây là bản tóm tắt đầy đủ – chi tiết – dễ hiểu bài học so sánh Pinia và Vuex trong Vue 3, giúp bạn xác định công cụ phù hợp cho dự án của mình. 👇

## 1. Vuex có dùng thay Pinia được không?

Mục này trả lời câu hỏi mở đầu thẳng thắn: được không, và khác nhau ở đâu. Đọc để có cái nhìn tổng quan trước khi đi vào so sánh chi tiết.

Ví von: Vuex và Pinia cùng làm nghề "quản lý kho" — nhưng một người vẫn làm việc tay giấy tờ lộn xộn, người kia đã dùng app điện thoại.

👉 **Có.**
👉 Vuex và Pinia cùng mục tiêu: quản lý state global.

| Tiêu chí | Vuex | Pinia |
| :--- | :--- | :--- |
| **Dùng cho Vue 3** | ⚠️ Có, nhưng đã lỗi thời | ✅ Khuyến nghị |
| **Trạng thái** | Global state | Global state |
| **Reactive** | Có | Có (native) |
| **Dùng được TS** | Khó | Rất tốt |
| **Boilerplate** | Nhiều | Ít |
| **Devtools** | Có | Có (tốt hơn) |

> **Cách đọc bảng này:** mỗi dòng là một tiêu chí tuyển dụng — 3 dòng đầu hai bên ngang nhau, 3 dòng cuối là chỗ Pinia thắng đậm. Đọc từ dưới lên nếu đang phân vân chọn.

> 📌 **Pinia chính là "Vuex thế hệ mới"**

> **Tóm gọn 1 câu:** Vuex và Pinia cùng nghề quản lý state, nhưng Pinia là bản "thế hệ mới" — cùng năng lực, ít giấy tờ, TS mượt hơn.

## 2. So sánh TƯ DUY sử dụng (rất quan trọng)

Mục này nói về khác biệt lớn nhất — không phải cú pháp mà là "tư duy quy trình": Vuex ép đi qua 3 chặng, Pinia cho đi thẳng. Đọc để hiểu tại sao code Pinia ngắn hơn hẳn.

### Vuex (cũ – phức tạp)
`State → Mutation → Action → Commit → State`

Ví von: gửi một lá thư phải qua 3 phòng — viết thư, đóng dấu, mới ra bưu cục.

👉 Mỗi thay đổi phải:
1. Viết **mutation**
2. Rồi **action**
3. Rồi **commit**

### Pinia (mới – trực tiếp & tự nhiên)
`State → Action → State`

Ví von: một phòng làm hết — nhận yêu cầu, sửa, xong.

👉 **Action được phép sửa state trực tiếp.**

> **Tóm gọn 1 câu:** Vuex bắt đi qua 3 chặng (mutation → action → commit), Pinia cho đi thẳng: action sửa state luôn — cùng đích, một nửa đường.

## 3. Ví dụ SO SÁNH cùng 1 chức năng

Mục này "đấu của cùng một bài": tăng `count` — viết bằng Vuex rồi Pinia, đặt cạnh nhau để tự thấy chênh lệch số bước.
🎯 **Mục tiêu:** Tăng giá trị `count`.

### ❌ Vuex

**`store/index.js`**
> 📄 **Code ví dụ:** [`examples/01-vuex.js`](examples/01-vuex.js)

**Component:**
> 📄 **Code ví dụ:** [`examples/02-vuex.html`](examples/02-vuex.html)
⛔ **Quá nhiều bước cho việc rất nhỏ.**

### ✅ Pinia

**`stores/counter.js`**
> 📄 **Code ví dụ:** [`examples/03-pinia.js`](examples/03-pinia.js)

**Component:**
> 📄 **Code ví dụ:** [`examples/04-pinia.html`](examples/04-pinia.html)

✔️ Ngắn | ✔️ Dễ đọc | ✔️ Không mutation

## 4. Vuex và Pinia có TƯƠNG TỰ nhau không?

👉 **Có về ý tưởng:**
- Global state
- Dùng cho nhiều component
- Devtools hỗ trợ

👉 **Nhưng khác rất nhiều về cách dùng:**

| Điểm khác | Vuex | Pinia |
| :--- | :--- | :--- |
| **Mutation** | BẮT BUỘC | ❌ Không |
| **Module** | Phức tạp | Rất đơn giản |
| **TypeScript** | Khó | Native |
| **Tree-shaking** | ❌ | ✅ |
| **Dev DX** | Thấp | Cao |

## 5. Khi nào NÊN dùng Vuex?

Mục này là "danh sách trường hợp ngoại lệ": gần như luôn chọn Pinia, trừ 3 tình huống bị ràng buộc. Đọc để biết mình có nằm trong ngoại lệ không.

Chỉ dùng Vuex khi:
- ✅ Dự án cũ đang dùng Vuex.
- ✅ Bạn phải maintain code legacy.
- ✅ Team chưa migrate được sang Pinia.

❌ **KHÔNG nên:**
- Bắt đầu project Vue 3 mới.
- Dự án học tập.
- App mới cần scale.

## 6. Vuex hiện tại có còn được phát triển không?

👉 **Không còn phát triển tính năng mới.**

**Vue team:**
- ❌ Không thêm feature mới cho Vuex.
- ✅ **Pinia là official state management.**
- 📌 Vuex chỉ ở trạng thái maintenance mode.

## 7. Gợi ý kiến trúc CHUẨN cho bạn (theo lộ trình học)

Mục này là "cẩm nang chọn đồ": từ truyền props đơn giản đến Pinia và Vuex — bảng dưới cho biết mỗi tình huống nên cầm dụng cụ nào.

| Tình huống | Giải pháp |
| :--- | :--- |
| **1–2 cấp component** | `v-model` forwarding |
| **3–4 cấp** | `provide` / `inject` |
| **App nhỏ** | Pinia |
| **App lớn** | Pinia + modules |
| **Project cũ** | Vuex |

> **Cách đọc bảng này:** đọc từ trên xuống theo mức độ "lan rộng" của dữ liệu — càng xuống dưới, dữ liệu càng cần đến nhiều nơi, công cụ càng "nặng ký". Đừng dùng Vuex cho việc chỉ 2 component.

## 8. Kết luận NGẮN GỌN

Mục này chốt lại toàn bộ so sánh trong 3 dòng — chụp lại mang đi là đủ.

- 🔥 **Vuex ≈ Pinia** về mục tiêu.
- ❌ **Vuex < Pinia** về DX & tương lai.
- ✅ **Pinia** = lựa chọn đúng cho Vue 3.

> **Tóm gọn 1 câu:** Pinia = Vuex thế hệ mới: cùng mục tiêu nhưng TS-native, ít boilerplate, và là lựa chọn đúng cho mọi dự án Vue 3 mới.