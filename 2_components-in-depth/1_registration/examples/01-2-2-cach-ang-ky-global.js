import { createApp } from 'vue'

const app = createApp({})

app.component(
  'MyComponent', // tên component
  {
    template: '<div>Hello Global Component</div>'
  }
)
