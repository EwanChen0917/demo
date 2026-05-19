<template>
  <!-- 基于 Element Plus 的对话框 -->
  <el-dialog
    v-model="visible"
    align-center
    :width="width"
    :append-to-body="true"
    :close-on-click-modal="false"
    :close-on-press-escape="false"
    :show-close="true"
    @close="handleClose"
    @closed="handleClosed"
    class="custom-dialog"
  >
    <!-- 自定义头部 -->
    <template #header>
      <div class="custom-dialog-header">
        <div class="main-title">{{ title }}</div>
        <div class="sub-title" v-if="subTitle">{{ subTitle }}</div>
      </div>
    </template>

    <!-- 对话框内容：支持插槽，也支持字符串 html -->
    <template v-if="hasSlotContent">
      <slot />
    </template>
    <template v-else-if="content">
      <div v-html="content"></div>
    </template>

    <!-- 底部操作按钮 -->
    <template #footer>
      <div class="dialog-footer">
        <el-button type="primary" @click="handleConfirm">{{ confirmButtonText }}</el-button>
        <el-button @click="handleCancel">{{ cancelButtonText }}</el-button>
      </div>
    </template>
  </el-dialog>
</template>

<script setup>
import { ref, useSlots } from 'vue'

const props = defineProps({
  title: { type: String, default: '' },
  subTitle: { type: String, default: '' },
  content: { type: String, default: '' },
  width: { type: String, default: '520px' },
  confirmButtonText: { type: String, default: '确定' },
  cancelButtonText: { type: String, default: '取消' },
  onConfirm: { type: Function },
  onCancel: { type: Function },
  onClose: { type: Function },
  onClosed: { type: Function }
})

const emit = defineEmits(['confirm', 'cancel', 'close'])

const visible = ref(true)

// 检查插槽内容是否存在
const slots = useSlots()
const hasSlotContent = !!slots.default

function handleConfirm() {
  props.onConfirm?.()
  emit('confirm')
  visible.value = false
}

function handleCancel() {
  props.onCancel?.()
  emit('cancel')
  visible.value = false
}

function handleClose() {
  props.onClose?.()
  emit('close')
}

function handleClosed() {
  props.onClosed?.()
}
</script>

<style lang="scss" scoped>
.custom-dialog-header {
  .main-title {
    font-size: 16px;
    font-weight: 700;
    margin-bottom: 3px;
  }

  .sub-title {
    font-size: 14px;
    color: #999;
  }
}
</style>
