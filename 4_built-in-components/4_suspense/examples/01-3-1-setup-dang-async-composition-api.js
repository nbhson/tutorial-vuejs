export default {
  async setup() {
    const res = await fetch('https://api.example.com/posts')
    const posts = await res.json()

    return { posts }
  }
}
