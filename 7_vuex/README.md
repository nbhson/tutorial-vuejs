# 7_vuex — Vuex (⚠️ LEGACY)

> ## ⚠️ THƯ MỤC LỆCH THỜI — VUI LÒNG KHÔNG DÙNG CHO DỰ ÁN MỚI
>
> **Pinia là thư viện quản lý state chính thức của Vue 3** (và cũng được khuyến nghị cho Vue 2).
> Vuex 4 chỉ được **duy trì để tương thích các dự án cũ** — không phát triển tính năng mới.
>
> ## 👉 Hãy học: [`8_pinia`](../8_pinia/README.md)
>
> - Người mới bắt đầu: [`8_pinia/1_defining-a-store`](../8_pinia/1_defining-a-store/README.md) → `2_state` → `3_getters` → `4_actions`.
> - Đang dùng Vuex và muốn chuyển: [`8_pinia/VUEX-vs-PINIA.md`](../8_pinia/VUEX-vs-PINIA.md) — bảng đối chiếu + hướng dẫn migration từng bước.
> - Hệ sinh thái: [`9_vue-ecosystem/pinia-2`](../9_vue-ecosystem/pinia-2/README.md).

---

## Vai trò của thư mục này

Nội dung các bài trong `7_vuex` được **giữ lại làm tài liệu legacy**, phục vụ hai nhu cầu:

1. **Đọc hiểu code cũ** — dự án của bạn vẫn chạy Vuex và cần bảo trì.
2. **Migration Vuex → Pinia** — đối chiếu từng khái niệm (state, getters, mutations, actions, modules).

## Cấu trúc các bài

| Bài | Nội dung | Tương đương trong Pinia |
|---|---|---|
| [`1_state`](1_state/README.md) | State trung tâm của store | `ref()`/`reactive()` trong store — [`8_pinia/2_state`](../8_pinia/2_state/README.md) |
| [`2_getters`](2_getters/README.md) | Giá trị tính từ state, có cache | `computed()` — [`8_pinia/3_getters`](../8_pinia/3_getters/README.md) |
| [`3_mutations`](3_mutations/README.md) | ⚠️ *Bị xóa trong Pinia* — thay đổi state đồng bộ qua `commit` | Sửa state trực tiếp trong action |
| [`4_action`](4_action/README.md) | Logic nghiệp vụ, async, `dispatch` | Actions — [`8_pinia/4_actions`](../8_pinia/4_actions/README.md) |
| [`5_module`](5_module/README.md) | Chia store lớn thành module (`namespaced`) | Nhiều store độc lập theo domain |

## Lộ trình migration nhanh

```
Vuex store
 ├─ state     → ref()/reactive()     (store Pinia)
 ├─ getters   → computed()
 ├─ mutations → XÓA, gộp vào actions
 ├─ actions   → actions Pinia (async tự nhiên)
 └─ modules   → mỗi module = 1 file store riêng
```

Chi tiết từng bước: [`8_pinia/VUEX-vs-PINIA.md`](../8_pinia/VUEX-vs-PINIA.md).

## Tài liệu chính thức

- Vuex 4 (bảo trì): https://vuex.vuejs.org/
- Pinia (chuẩn hiện tại): https://pinia.vuejs.org/
- Tuyên bố của nhóm Vue — Pinia là state management chính thức: https://blog.vuejs.org/posts/vue-3-4#pinia
