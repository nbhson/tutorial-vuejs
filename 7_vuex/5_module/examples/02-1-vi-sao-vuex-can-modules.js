store.state.cart.items            // state — lồng nhau
store.getters['cart/itemCount']   // getter — dấu /
store.commit('cart/add', item)    // mutation — 'module/mutation'
store.dispatch('cart/checkout')   // action
