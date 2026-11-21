const AsyncComp = defineAsyncComponent({
  // Hàm loader chính
  loader: () => import('./Foo.vue'),

  // Component hiển thị khi đang tải
  loadingComponent: LoadingComponent,
  // Thời gian trễ trước khi hiện LoadingComponent (mặc định 200ms)
  delay: 200,

  // Component hiển thị khi có lỗi
  errorComponent: ErrorComponent,
  // Thời gian chờ tối đa (nếu quá sẽ báo lỗi)
  timeout: 3000
})
