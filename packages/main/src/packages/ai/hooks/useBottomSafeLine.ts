import { nextTick, onBeforeUnmount, ref } from 'vue'

export default function useBottomSafeLine(parentRef: any) {
  const isScrolledToBottom = ref(true) // 是否滚动到底部
  const bottomLineRef = ref<HTMLElement | null>(null) // 底部安全线ref
  const observer: IntersectionObserver = new IntersectionObserver(
    entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          isScrolledToBottom.value = true // 滚动到底部
        } else {
          isScrolledToBottom.value = false // 滚动到底部
        }
      })
    },
    {
      root: parentRef.value, // 设置观察器的根元素
      rootMargin: '25px' // 设置根元素的边距
    }
  ) // 观察器
  nextTick(() => {
    // 定义一个观察器
    observer.observe(bottomLineRef.value!) // 观察底部安全线
    // 销毁前取消观察
  })
  onBeforeUnmount(() => {
    observer?.disconnect()
  })
  return {
    isScrolledToBottom,
    bottomLineRef
  }
}
