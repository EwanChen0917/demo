<template>
  <el-dialog
    :model-value="props.visible"
    :title="props.title"
    :draggable="props.draggable"
    :fullscreen="props.fullscreen"
    :before-close="handleClose"
    class="ele_add_modal modal-dialog"
    :style="{ width: props.width }"
  >
    <template #header>
      <div class="modal-header">
        <template v-if="$slots.header">
          <slot name="header"></slot>
        </template>
        <h2 class="fw-bold" v-else>{{ props.title }}</h2>
        <div class="btn btn-icon btn-sm btn-active-light-primary ms-2" @click="handleClose">
          <span class="svg-icon svg-icon-1">
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <rect
                opacity="0.5"
                x="6"
                y="17.3137"
                width="16"
                height="2"
                rx="1"
                transform="rotate(-45 6 17.3137)"
                fill="currentColor"
              />
              <rect
                x="7.41422"
                y="6"
                width="16"
                height="2"
                rx="1"
                transform="rotate(45 7.41422 6)"
                fill="currentColor"
              />
            </svg>
          </span>
        </div>
      </div>
    </template>
    <div class="modal-body py-10 px-lg-17">
      <slot name="body"></slot>
    </div>
    <template #footer>
      <div :class="['modal-footer', props.btnAlign === 'center' ? 'flex-center' : 'flex-right']">
        <el-button
          v-if="props.isShowCancel"
          @click="handleClose"
          class="sbtn btn-light me-3 add_footer_btn"
        >
          {{ props.cancelText }}
        </el-button>
        <el-button
          v-if="props.isShowConfirm"
          class="btn btn-primary add_footer_btn"
          @click="handleSave"
        >
          {{ props.confirmText }}
        </el-button>
      </div>
    </template>
  </el-dialog>
</template>

<script setup name="Modal" lang="ts">
  import { ElDialog } from 'element-plus';

  const props = defineProps({
    // 是否展示
    visible: {
      type: Boolean,
      default: () => false,
    },
    // 标题
    title: {
      type: String,
      default: () => '',
    },
    // 是否全屏
    fullscreen: {
      type: Boolean,
      default: () => false,
    },
    // 是否可以拖拽
    draggable: {
      type: Boolean,
      default: () => true,
    },
    width: {
      type: String,
      default: () => '50%',
    },
    cancelText: {
      type: String,
      default: () => '取消',
    },
    confirmText: {
      type: String,
      default: () => '确定',
    },
    isShowCancel: {
      type: Boolean,
      default: () => true,
    },
    isShowConfirm: {
      type: Boolean,
      default: () => true,
    },
    btnAlign: {
      type: String,
      default: () => 'right',
    },
  });

  // 事件声明
  const emit = defineEmits<{
    (event: 'close'): void;
    (event: 'save'): void;
  }>();
  // 取消
  const handleClose = () => {
    emit('close');
  };

  // 保存
  const handleSave = () => {
    emit('save');
  };
</script>

<style scoped>
  .modal-body {
    height: 100%;
    overflow: auto !important;
  }

  .flex-center {
    justify-content: center !important;
    align-items: center !important;
  }

  .flex-right {
    justify-content: flex-end !important;
    align-items: end !important;
  }
</style>
