export function myPiniaPlugin(context) {
  context.pinia    // Instance pinia
  context.app      // Vue app instance
  context.store    // Store hiện tại đang được xử lý
  context.options  // Các options được truyền vào defineStore
}
