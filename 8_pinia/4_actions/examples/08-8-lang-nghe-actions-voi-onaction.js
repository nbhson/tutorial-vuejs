const unsubscribe = store.$onAction(
  ({ name, args, after, onError }) => {
    const start = Date.now()
    console.log(`Bắt đầu action "${name}" với tham số:`, args)

    after((result) => {
      console.log(`Hoàn thành "${name}" trong ${Date.now() - start}ms`)
    })

    onError((error) => {
      console.error(`Lỗi tại "${name}":`, error)
    })
  }
)

// Để hủy lắng nghe:
// unsubscribe()
