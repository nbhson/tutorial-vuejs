# Vuex — Actions (⚠️ LEGACY — Pinia đã thay thế Vuex)

> ## ⚠️ TÀI LIỆU LEGACY
>
> **Pinia là thư viện state management chính thức của Vue 3.** Vuex chỉ được duy trì cho dự án cũ.
>
> Trong Pinia, **actions giữ vai trò của cả mutations lẫn actions của Vuex** — và được phép `async` tự nhiên. Nếu bạn đang viết dự án mới, hãy học thẳng: [`8_pinia/4_actions`](../8_pinia/4_actions/README.md).
>
> Nội dung Vuex bên dưới giúp bạn đọc hiểu code cũ và thực hiện migration (đối chiếu chi tiết: [`8_pinia/VUEX-vs-PINIA.md`](../8_pinia/VUEX-vs-PINIA.md)).

---

## 1. Action là gì? Khác mutation ở đâu?

- **Mutation** — hàm **đồng bộ** thay đổi state, gọi qua `commit`.
- **Action** — hàm **chứa logic nghiệp vụ**, thường **bất đồng bộ** (gọi API...), khi cần thay state thì `commit` mutation. Gọi qua `dispatch`.

```js
// ❌ Vuex 4 — legacy
import { createStore } from 'vuex'

export default createStore({
  state: () => ({ posts: [], loading: false }),
  mutations: {
    setPosts(state, posts) { state.posts = posts },
    setLoading(state, v)   { state.loading = v },
  },
  actions: {
    // context có: commit, dispatch, state, rootState, rootGetters...
    async fetchPosts({ commit }) {
      commit('setLoading', true)
      try {
        const res = await fetch('/api/posts')
        commit('setPosts', await res.json())
      } finally {
        commit('setLoading', false)
      }
    },
  },
})
```

```js
// Gọi từ component
store.dispatch('fetchPosts')
```

📌 **Nguyên tắc cũ của Vuex:** logic async nằm trong action; mutation chỉ làm việc gán state thuần (sync). Mọi điều kiện/lỗi xử lý trong action.

## 2. Truyền tham số cho action

```js
// legacy
actions: {
  async createPost({ commit }, payload) {
    const res = await fetch('/api/posts', {
      method: 'POST',
      body: JSON.stringify(payload),
    })
    commit('addPost', await res.json())
  },
}
```

```js
await store.dispatch('createPost', { title: 'Bài mới', body: 'Nội dung' })
```

Lưu ý: nếu cần **nhiều** tham số, Vuex chỉ nhận một "payload" — bọc chúng vào object.

## 3. Action gọi action khác

```js
// legacy
actions: {
  async login({ dispatch }, credentials) {
    await dispatch('auth/requestToken', credentials, { root: true })
    await dispatch('loadProfile')
  },
  async loadProfile({ commit }) { /* ... */ },
}
```

Đối chiếu Pinia — store khác chỉ cần import và gọi như hàm thường:

```ts
// ✅ Pinia
const auth = useAuthStore()
await auth.requestToken(credentials)
await this.loadProfile()
```

## 4. Xử lý lỗi trong action

```js
// legacy
actions: {
  async fetchPosts({ commit }) {
    try {
      const res = await fetch('/api/posts')
      if (!res.ok) throw new Error(`HTTP ${res.status}`)
      commit('setPosts', await res.json())
    } catch (e) {
      commit('setError', 'Không tải được danh sách bài')
      // ⚠️ Hãy re-throw nếu component cần biết để hiển thị UI lỗi riêng
      throw e
    }
  },
}
```

Đối chiếu Pinia — dễ hơn vì action là hàm JS thông thường:

```ts
// ✅ Pinia
async function fetchPosts() {
  try {
    posts.value = await postsApi.list()
  } catch (e) {
    error.value = 'Không tải được danh sách bài'
    throw e
  }
}
```

## 5. Action + Composable / Pinia hiện đại

Pinia không cần "mutation/commit/dispatch" nữa — bạn **gọi thẳng hàm của store**:

| Vuex | Pinia |
|---|---|
| `store.dispatch('fetchPosts')` | `const store = usePostStore(); store.fetchPosts()` |
| `commit('setPosts', data)` | `posts.value = data` (trong action) |
| Context `{ commit, dispatch, state }` | `this` (Options store) hoặc closure (Setup store) |
| Action sync phải qua mutation | Action sync/async đều viết trực tiếp |

Chi tiết đầy đủ: [`8_pinia/4_actions`](../8_pinia/4_actions/README.md).

## 6. Migration action Vuex → action Pinia

```
Vuex action
  │
  ├─ commit('setX', ...)        → gán trực tiếp state trong action Pinia
  ├─ dispatch('otherAction')    → import store khác, gọi hàm
  ├─ rootState / rootGetters    → import store khác (Pinia hỗ trợ tham chiếu chéo)
  └─ async logic                → giữ nguyên, action Pinia hỗ trợ async tự nhiên
```

Mẹo khi migration từng bước: giữ tên action Vuex ở Pinia (tên hàm trùng) để nơi gọi (`dispatch('fetchPosts')` → `store.fetchPosts()`) chỉ cần đổi cách gọi, không đổi logic.

## 7. Khi nào đọc tiếp phần Vuex legacy?

- ✅ Code cũ có `store.dispatch(...)` và bạn cần bảo trì/migrate.
- ✅ Hiểu "tại sao Pinia bỏ mutations" — qua so sánh với action Vuex.
- ❌ Dự án mới: học Pinia (đường dẫn ở banner đầu bài).

## Nguồn tham khảo

- Vuex actions: https://vuex.vuejs.org/guide/actions.html
- Pinia actions: https://pinia.vuejs.org/core-concepts/actions.html
- Pinia vs Vuex: https://pinia.vuejs.org/introduction.html#comparison-with-vuex
