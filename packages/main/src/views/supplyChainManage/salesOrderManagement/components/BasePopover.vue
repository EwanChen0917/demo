<!-- BasePopover.vue - 方案B：完全自治的弹窗组件 -->
<template>
  <!-- 弹出内容，teleport 保证悬浮 -->
  <teleport to="body">
    <div v-if="internalVisible" ref="popoverRef" class="popver-box" :style="popoverStyle">
      <slot name="content" />
    </div>
  </teleport>
</template>

<script setup>
import { ref, watch, onBeforeUnmount, nextTick } from 'vue'

const emit = defineEmits(['close'])

// 内部状态管理（不依赖外部 props）
const internalVisible = ref(false)
const triggerElement = ref(null)
const popoverRef = ref(null)
const popoverStyle = ref({})

/**
 * 打开弹窗（外部调用）
 * @param {HTMLElement} trigger - 触发元素
 */
const open = (trigger) => {
  triggerElement.value = trigger
  internalVisible.value = true
}

/**
 * 关闭弹窗
 */
const close = () => {
  internalVisible.value = false
  emit('close')
}

/**
 * 自动定位弹窗（带屏幕边界检测）
 */
const updatePosition = () => {
  const trigger = triggerElement.value
  const popover = popoverRef.value
  if (!trigger || !popover) return

  const triggerRect = trigger.getBoundingClientRect()
  const popoverRect = popover.getBoundingClientRect()
  
  // 获取视口尺寸
  const viewportWidth = window.innerWidth
  const viewportHeight = window.innerHeight
  
  // 默认位置：触发元素下方
  let top = triggerRect.bottom + window.scrollY + 4
  let left = triggerRect.left + window.scrollX
  
  // 检测右边界
  if (triggerRect.left + popoverRect.width > viewportWidth) {
    // 超出右边界，将右边对齐到触发元素右边
    left = triggerRect.right + window.scrollX - popoverRect.width
    // 如果还是超出左边界，则对齐到屏幕左边留一点边距
    if (left < 0) {
      left = 4
    }
  }
  
  // 检测下边界
  if (triggerRect.bottom + popoverRect.height + 4 > viewportHeight) {
    // 超出下边界，尝试放在触发元素上方
    const topPosition = triggerRect.top + window.scrollY - popoverRect.height - 4
    // 确保上方有足够空间
    if (triggerRect.top - popoverRect.height - 4 > 0) {
      top = topPosition
    } else {
      // 上方也不够，则放在视口底部留一点边距
      top = viewportHeight + window.scrollY - popoverRect.height - 4
    }
  }

  popoverStyle.value = {
    position: 'absolute',
    top: `${top}px`,
    left: `${left}px`,
  }
}

/**
 * 点击外部关闭
 */
const handleClickOutside = (e) => {
  if (!internalVisible.value) return

  const trigger = triggerElement.value
  if (
    trigger &&
    !trigger.contains(e.target) &&
    popoverRef.value &&
    !popoverRef.value.contains(e.target)
  ) {
    close()
  }
}

// 监听显示状态，动态添加/移除事件监听器（性能优化）
watch(internalVisible, (isOpen) => {
  if (isOpen) {
    nextTick(() => {
      updatePosition()
      window.addEventListener('scroll', updatePosition, true)
      window.addEventListener('resize', updatePosition)
      document.addEventListener('click', handleClickOutside)
    })
  } else {
    // 关闭时移除监听器，释放资源
    window.removeEventListener('scroll', updatePosition, true)
    window.removeEventListener('resize', updatePosition)
    document.removeEventListener('click', handleClickOutside)
    // 清理触发器引用
    triggerElement.value = null
  }
})

onBeforeUnmount(() => {
  // 组件销毁时确保移除所有监听器
  window.removeEventListener('scroll', updatePosition, true)
  window.removeEventListener('resize', updatePosition)
  document.removeEventListener('click', handleClickOutside)
})

// 只暴露方法，不暴露状态
defineExpose({
  open,
  close
})
</script>

<style scoped lang="scss">
.popver-box {
  position: absolute;
  z-index: 1000;
}
</style>