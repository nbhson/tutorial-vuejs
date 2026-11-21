import { createWebHistory, createWebHashHistory, createMemoryHistory } from 'vue-router'

createRouter({ history: createWebHistory() })   // HTML5 — khuyến nghị
createRouter({ history: createWebHashHistory() }) // Hash — không cần cấu hình server
