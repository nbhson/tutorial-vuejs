<!-- ❌ Không nhìn được là isHover từ đâu ra -->
<script>
export default {
  mixins: [hoverMixin],
  template: `<div @mouseenter="onEnter">{{ isHover }}</div>`,
}
</script>
