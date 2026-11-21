cartStore.$subscribe((mutation, state) => {
  // Lưu vào localStorage mỗi khi state thay đổi
  localStorage.setItem('cart', JSON.stringify(state))
})
