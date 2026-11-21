// mixins/hoverable.js
export const hoverMixin = {
  data() {
    return { isHover: false }
  },
  methods: {
    onMouseEnter() { this.isHover = true },
    onLeave()      { this.isHover = false },
  },
}
