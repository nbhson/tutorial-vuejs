// ❌ Vue 2 — KHÔNG chạy trong Vue 3
{{ message | capitalize }}
{{ price | currency('EUR') }}              <!-- có tham số -->
{{ price | currency | round }}             <!-- chuỗi filter nối nhau -->
