// hoverMixin.js — ai dùng mixin này biết gì về nó?
export const hoverMixin = {
  data: () => ({ isHover: false }),
  methods: {
    onEnter() { this.isHover = true },
    onLeave() { this.isHover = false },
  },
}
