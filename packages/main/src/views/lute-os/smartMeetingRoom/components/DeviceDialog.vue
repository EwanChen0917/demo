<template>
  <el-dialog
    :title="null"
    v-model="visible"
    width="400px"
    align-center
    :class="['device-dialog', { 'custom-dialog': confirmDialog }]"
    append-to-body
    destroy-on-close
  >
    <!-- 标题区域 slot -->
    <template #header>
      <slot name="title">
        <div class="device-dialog-title"></div>
      </slot>
    </template>

    <!-- 主体内容 slot -->
    <div class="device-dialog-body">
      <slot name="form">
        <!-- 父组件传递表单内容 -->
      </slot>
      <slot name="confirmText">
        <!-- 父组件传递确认文本 -->
      </slot>
    </div>

    <!-- 底部操作区 slot -->
    <template #footer>
      <div class="device-dialog-footer">
        <slot name="footer">
          <el-button
            :type="confirmType"
            @click="handleConfirm"
          >{{ confirmText }}</el-button>
          <el-button plain @click="handleCancel">{{ cancelText }}</el-button>
        </slot>
      </div>
    </template>
  </el-dialog>
</template>

<script setup>
const props = defineProps({
  confirmText: {
    type: String,
    default: '确认'
  },
  cancelText: {
    type: String,
    default: '取消'
  },
  confirmType: {
    type: String,
    default: 'primary' // or 'danger'
  },
  confirmDialog: {
    type: Boolean,
    default: false
  }
})
const confirmType = computed(() => props.confirmType)
const visible = defineModel('visible', {
  type: Boolean,
  default: false,
})
const emit = defineEmits(['confirm', 'cancel'])

function handleConfirm() {
  emit('confirm')
}
function handleCancel() {
  emit('cancel')
  visible.value = false
}

</script>

<style lang="scss" scoped>
:global(.device-dialog) {
  .device-dialog-title {
    font-size: 16px;
    font-weight: bold;
    margin-bottom: 12px;
  }
  .device-dialog-body {
    display: flex;
    flex-direction: column;
    padding-top: 8px;
    padding-bottom: 8px;
  }
  .device-dialog-footer {
    display: flex;
    justify-content: center;
    gap: 20px;
    margin-bottom: 10px;
    .el-button {
      min-width: 108px;
    }
  }
}
</style>
