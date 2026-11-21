// server.js — SSR tối giản (chỉ để hiểu)
import { createSSRApp } from 'vue'
import { renderToString } from 'vue/server-renderer'
import express from 'express'
import App from './App.vue'

const app = express()

app.get('*', async (req, res) => {
  const vueApp = createSSRApp(App)
  const html = await renderToString(vueApp)
  res.send(`
    <!DOCTYPE html>
    <html lang="vi">
      <body>
        <div id="app">${html}</div>
        <script type="module" src="/src/client.js"></script>
      </body>
    </html>
  `)
})

app.listen(3000)
