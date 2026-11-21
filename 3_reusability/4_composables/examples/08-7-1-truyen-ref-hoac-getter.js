const url = ref('/posts/1')
useFetch(url)

// Hoặc dùng getter
useFetch(() => `/posts/${props.id}`)
