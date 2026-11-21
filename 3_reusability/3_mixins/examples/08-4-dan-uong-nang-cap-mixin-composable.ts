// Trước: mixins/fetch-user.js
export default {
  data: () => ({ user: null, loading: false }),
  created() { this.fetchUser(this.$route.params.id) },
  methods: {
    async fetchUser(id) {
      this.loading = true
      this.user = await fetchUserById(id)
      this.loading = false
    },
  },
}
