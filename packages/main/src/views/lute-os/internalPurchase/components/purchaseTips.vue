<script setup lang="ts">
import { computed } from 'vue'
import { purchaseTips } from '../constant'

interface Props {
  /** 提示类型，对应 purchaseTips 的 key */
  type?: keyof typeof purchaseTips
  /** 自定义前缀标题，如 "温馨提示"、"注意事项" */
  label?: string
  /** 是否隐藏 label，仅展示内容 */
  hideLabel?: boolean
  /** 背景色（传入后才生效） */
  bgColor?: string
  /** 左边竖线颜色（可选） */
  borderColor?: string
}

const props = withDefaults(defineProps<Props>(), {
  type: '温馨提示',
  hideLabel: false,
})

const tipContent = computed(() => purchaseTips[props.type] || '')

/** 动态样式 */
const wrapperStyle = computed(() => {
  if (!props.bgColor) return {}
  return {
    backgroundColor: props.bgColor,
    borderLeft: props.borderColor ? `3px solid ${props.borderColor}` : undefined,
    padding: '8px 12px',
    borderRadius: '4px',
  }
})
</script>

<template>
  <div class="purchase-tip" :style="wrapperStyle">
    <template v-if="!hideLabel">
      <strong class="label">{{ props.label || props.type }}：</strong>
    </template>
    <span class="content">{{ tipContent }}</span>
  </div>
</template>

<style scoped>
.purchase-tip {
  color: #999;
  font-size: 13px;
  line-height: 20px;
}

.label {
  color: red;
  font-weight: 600;
}

.content {
  color: red;
  font-weight: 600;
}
</style>
