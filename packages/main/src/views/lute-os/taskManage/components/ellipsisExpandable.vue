<template>
  <div style="display: inline">
    <div
      ref="contentRef"
      :class="{ 'ellipsis-multiline': !expanded }"
      :style="!expanded ? { WebkitLineClamp: lineClamp } : {}"
      v-html="linkedText"
    ></div>
    <a
      v-if="needExpand"
      @click.stop="expanded = !expanded"
      style="color: #409eff; cursor: pointer"
    >
      {{ expanded ? '收起' : '展开' }}
    </a>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, watch, nextTick } from 'vue'

const props = defineProps({
  text: String,
  lineClamp: { type: Number, default: 2 },
})

const expanded = ref(false)
const needExpand = ref(false)
const contentRef = ref(null)

const linkedText = computed(() => {
  if (!props.text) return ''
  const urlRegex = /(https?:\/\/[^\s]+)/g
  return props.text.replace(
    urlRegex,
    (url) => `<a href="${url}" target="_blank" style="color:#409eff">${url}</a>`
  )
})

const checkOverflow = () => {
  nextTick(() => {
    const el = contentRef.value
    if (!el) return

    const clone = el.cloneNode(true)
    clone.style.visibility = 'hidden'
    clone.style.position = 'fixed'
    clone.style.pointerEvents = 'none'
    clone.style.zIndex = '-1'
    clone.style.width = el.offsetWidth + 'px'

    clone.classList.remove('ellipsis-multiline')
    clone.style.webkitLineClamp = 'unset'

    document.body.appendChild(clone)

    const fullHeight = clone.scrollHeight
    const visibleHeight = el.getBoundingClientRect().height
    needExpand.value = fullHeight - visibleHeight > 4

    document.body.removeChild(clone)
  })
}

onMounted(checkOverflow)
watch(() => props.text, () => {
  expanded.value = false
  checkOverflow()
})
watch(() => props.lineClamp, checkOverflow)
</script>
<style scoped>
.ellipsis-multiline {
  display: -webkit-box;
  -webkit-box-orient: vertical;
  overflow: hidden;
  text-align: left;
  text-overflow: ellipsis;
  word-break: break-all;
}
</style>