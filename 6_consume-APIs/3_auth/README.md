# Auth — Xác thực và phân quyền trong Vue (JWT, token, guard)

> **Yêu cầu:** Vue 3.5+ · axios · Vue Router 4 · Pinia
> **Bài trước:** [`2_intercepter`](../2_intercepter/README.md)

---

## 1. Tổng quan kiến trúc auth ở phía Vue

Mục này vẽ bản đồ toàn bài: front-end không "xác thực" — việc đó là của server. Vue app chỉ làm 5 việc quanh token: gửi thông tin đăng nhập, nhận token, lưu, gắn vào request, và điều hướng theo trạng thái đăng nhập.

Ví von: Vue app là lễ tân khách sạn — nhận thẻ phòng từ quầy (server), đưa khách cầm, và chặn ai không có thẻ vào khu riêng; còn quyết định ai được cấp thẻ là của quản lý (backend).

Front-end không "xác thực" — xác thực diễn ra ở **server**. Vue app chỉ:

1. Gửi thông tin đăng nhập (email + mật khẩu) qua HTTPS.
2. Nhận **token** (thường là JWT) hoặc **cookie phiên** từ server.
3. **Lưu** token an toàn nhất có thể.
4. **Gắn** token vào mỗi request (interceptor — xem bài trước).
5. **Điều hướng** dựa trên trạng thái đăng nhập (route guard).

```
┌─────────┐  POST /login   ┌──────────┐
│ Vue app │ ─────────────▶ │  Server  │ ── trả { accessToken, refreshToken }
│         │ ◀───────────── │          │
└────┬────┘   JSON token   └──────────┘
     │ lưu token + interceptor
     ▼
  mọi request: Authorization: Bearer <accessToken>
```

> ⚠️ **Mật khẩu chỉ gửi qua HTTPS.** Front-end chỉ là lớp hiển thị — mọi kiểm tra quyền thực sự phải có ở backend.

---

## 2. Auth store với Pinia — nguồn sự thật

Mục này dựng "căn cước trung tâm" của app: một store Pinia giữ trạng thái đăng nhập (user, token) để mọi nơi hỏi một chỗ, khỏi tự đoán mỗi nơi một kiểu.

Ví von: như bảng thông tin công ty — ai cần biết "ông khách còn ở đây không" thì nhìn bảng, không đi hỏi từng phòng.

> 📄 **Code ví dụ:** [`examples/01-2-auth-store-voi-pinia-nguon-su-that.ts`](examples/01-2-auth-store-voi-pinia-nguon-su-that.ts)

Chi tiết Pinia: [`8_pinia/1_defining-a-store`](../../8_pinia/1_defining-a-store/README.md).

---

## 3. Lưu token — lựa chọn và rủi ro

Mục này là bài "cất chìa khóa": token để đâu thì quyết định độ an toàn với XSS. Đọc để chọn đúng ngăn kéo cho access token và refresh token.

| Cách lưu | Ưu | Nhược |
|---|---|---|
| `localStorage` | Đơn giản, sống sót qua refresh | ❌ Đọc được bằng **mọi JS trên trang** — XSS đọc trộm được |
| **`httpOnly` cookie** (server set) | ⭐ JS không đọc được — an toàn nhất với XSS | Cần cấu hình backend `SameSite`, `CSRF` |
| State trong memory (Pinia) | Không lưu bền | Mất khi refresh trang |

> **Cách đọc bảng này:** mỗi dòng là một "ngăn cất chìa" xếp từ tiện nhất đến an toàn nhất; cột Nhược là giá phải trả. Đọc xuôi để hiểu trade-off, rồi chọn theo ràng buộc dự án.

**Khuyến nghị thực chiến:**

- **Access token ngắn hạn** (5–15 phút): lưu trong memory, hoặc cookie httpOnly do server phát hành.
- **Refresh token dài hạn**: chỉ trong **httpOnly cookie** (server đảm nhiệm), front-end không chạm vào.
- Nếu dự án đơn giản dùng `localStorage`: hiểu rõ rủi ro XSS và giữ các thư viện phụ thuộc kiểm soát (audit `npm audit`).

> **Tóm gọn 1 câu:** Token càng giá trị cao càng cất chỗ kín (httpOnly cookie, memory) — `localStorage` tiện nhưng XSS đọc được, chỉ dùng khi hiểu rõ rủi ro.

---

## 4. Trang đăng nhập

Mục này dựng "cửa vào" của app: form login gọi API, xử lý lỗi, và dọn mật khẩu khỏi bộ nhớ ngay khi xong việc.

> 📄 **Code ví dụ:** [`examples/02-4-trang-ang-nhap.vue`](examples/02-4-trang-ang-nhap.vue)

📌 Không tự đặt mật khẩu trong state lâu hơn cần; sau `login()` thành công, xóa `password.value` khỏi bộ nhớ component. Giống như xé giấy ghi mật khẩu ngay khi gõ xong vào điện thoại — đừng giữ mảnh giấy trong túi.

> **Tóm gọn 1 câu:** Trang đăng nhập = gọi API login, xử lý lỗi, và xóa mật khẩu khỏi bộ nhớ ngay khi thành công.

---

## 5. Bảo vệ route — Navigation Guard

Mục này dựng "chốt gác" của app: trước khi người dùng bước vào trang nào đó, guard kiểm tra thẻ (đã đăng nhập chưa, đủ quyền chưa) và chặn hoặc cho qua.

Ví von: như chốt an ninh ở sảnh khu vực riêng — không ai tự bấm thang máy vào tầng VIP được.

> 📄 **Code ví dụ:** [`examples/03-5-bao-ve-route-navigation-guard.ts`](examples/03-5-bao-ve-route-navigation-guard.ts)

Chi tiết navigation guards: [`9_vue-ecosystem/vue-router-4`](../../9_vue-ecosystem/vue-router-4/README.md).

> 💡 Sau login thành công với query `redirect`, quay lại đúng trang user định vào:
> `router.push(route.query.redirect ?? '/')`.

---

## 6. Refresh token — tự động đổi token khi 401

Mục này nói về cơ chế "gia hạn thẻ tự động": access token hết hạn thì interceptor dùng refresh token đổi thẻ mới rồi gửi lại request — người dùng không thấy gì. Đọc để hiểu hai bẫy kỹ thuật quan trọng của cơ chế này.

> 📄 **Code ví dụ:** [`examples/04-6-refresh-token-tu-ong-oi-token-khi.ts`](examples/04-6-refresh-token-tu-ong-oi-token-khi.ts)

📌 Hai điểm kỹ thuật quan trọng:

- **`refreshing ??=`** — nếu 3 request đồng thời nhận 401, chỉ một request `/auth/refresh` được gửi; hai request còn lại chờ dùng chung token mới. Ví von: cả nhà hết tiền lẻ, chỉ một người ra quầy đổi — những người kia đứng chờ nhận lại, chứ không ai đứng xếp ba hàng.
- **Kiểm tra URL** để không refresh vô hạn khi chính endpoint refresh trả 401.

> **Tóm gọn 1 câu:** Refresh token tự động = nhận 401, đổi token mới đúng một lần (bằng `refreshing ??=`), gửi lại request — và chặn vòng lặp vô hạn bằng cách kiểm tra URL.

---

## 7. Phân quyền trong UI (v-show/permission)

Mục này nói về "màn trình diễn" phân quyền: ẩn nút theo vai trò để trải nghiệm đẹp — nhưng nhớ đây chỉ là lớp trang điểm, không phải kính vạn năng an toàn.

Ẩn/hiện nút theo vai trò — nhưng nhớ **UI không phải bảo mật**, chỉ là trải nghiệm:

> 📄 **Code ví dụ:** [`examples/05-7-phan-quyen-trong-ui-v-show-permission.vue`](examples/05-7-phan-quyen-trong-ui-v-show-permission.vue)

Cách gọn hơn — đăng ký directive toàn cục `v-permission`:

> 📄 **Code ví dụ:** [`examples/06-7-phan-quyen-trong-ui-v-show-permission.ts`](examples/06-7-phan-quyen-trong-ui-v-show-permission.ts)

---

## 8. Khôi phục phiên khi F5 — bootstrapping

Mục này giải quyết bài toán "nhà mất điện": F5 là state Pinia bay hết — cần "bật lại nguồn" bằng cách đọc token và lấy thông tin user trước khi app chạy tiếp.

Ví von: mất điện lúc đang xem TV — có điện lại thì phải đăng nhập lại hộp cáp (tự động, không phải bấm tay).

Sau khi refresh trang, Pinia state rỗng → đọc lại token và lấy thông tin user:

> 📄 **Code ví dụ:** [`examples/07-8-khoi-phuc-phien-khi-f5-bootstrapping.ts`](examples/07-8-khoi-phuc-phien-khi-f5-bootstrapping.ts)

📌 Hoặc dùng `router.beforeEach` để gọi `fetchProfile()` lần đầu khi cần — tránh treo trang nếu `/me` chậm.

---

## 9. Use-cases thực tế

### Đăng ký tài khoản

> 📄 **Code ví dụ:** [`examples/08-ang-ky-tai-khoan.ts`](examples/08-ang-ky-tai-khoan.ts)

### Đổi mật khẩu (yêu cầu đang đăng nhập)

> 📄 **Code ví dụ:** [`examples/09-oi-mat-khau-yeu-cau-ang-ang-nhap.ts`](examples/09-oi-mat-khau-yeu-cau-ang-ang-nhap.ts)

### Bảo vệ route của admin (chi tiết)

> 📄 **Code ví dụ:** [`examples/10-bao-ve-route-cua-admin-chi-tiet.ts`](examples/10-bao-ve-route-cua-admin-chi-tiet.ts)

### Đăng nhập xã hội (OAuth)

> 📄 **Code ví dụ:** [`examples/11-ang-nhap-xa-hoi-oauth.ts`](examples/11-ang-nhap-xa-hoi-oauth.ts)

---

## 10. Checklist bảo mật auth front-end

Mục này là "danh sách soát vé trước khi mở cửa" — đọc để chấm từng dòng trước khi release auth lên production.

- ✅ **HTTPS** bắt buộc cho mọi request.
- ✅ Token trong **httpOnly cookie** nếu có thể (hợp tác backend), không tự lưu trong `localStorage` nếu có cookie.
- ✅ Access token ngắn hạn + **refresh token** tự động (interceptor, bài trước).
- ✅ Mọi route nhạy cảm có `meta.requiresAuth` + guard.
- ✅ Mọi kiểm tra quyền quan trọng **phải lặp lại ở backend** (UI chỉ để trải nghiệm).
- ✅ Logout dọn dẹp sạch: token, store, header mặc định, cache của interceptor (`refreshing = null`).
- ❌ Không nhúng mật khẩu hay secret trong bundle (`VITE_` env là **công khai**!).

> **Tóm gọn 1 câu:** Auth front-end = HTTPS bắt buộc, token kín trong httpOnly, refresh tự động, guard ở route nhạy cảm — và backend luôn kiểm tra lại lần cuối.

---

## Nguồn tham khảo

- JWT best practices: https://jwt.io/introduction
- OWASP Authentication Cheat Sheet: https://cheatsheetseries.owasp.org/cheatsheets/Authentication_Cheat_Sheet.html
- Navigation Guards: https://router.vuejs.org/guide/advanced/navigation-guards.html
- Pinia (auth store): https://pinia.vuejs.org/
- axios interceptors: https://axios-http.com/docs/interceptors
