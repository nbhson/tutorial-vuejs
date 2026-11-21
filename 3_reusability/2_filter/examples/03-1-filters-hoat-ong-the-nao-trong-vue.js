// Vue 2 — khai báo filter toàn cục
Vue.filter('currency', (value, symbol = 'VND') => `${value.toLocaleString()} ${symbol}`)
