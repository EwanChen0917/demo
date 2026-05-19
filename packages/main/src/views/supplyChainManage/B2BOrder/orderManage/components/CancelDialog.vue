<template>
  <el-dialog
    v-model="dialogVisible"
    title="退出确认"
    :close-on-click-modal="false"
    :close-on-press-escape="false"
    class="custom-dialog custom-comfirm-dialog"
    :class="type"
    :width="384"
  >
    <template #header>
      <div class="d-flex">
        <i v-if="type === 'warning'" class="iconfont icon-zhuyizhuangtai"></i>
        <i v-else-if="type === 'success'" class="iconfont icon-chenggongzhuangtai"></i>
        <i v-else-if="type === 'error'" class="iconfont icon-cuowuzhuangtai"></i>
        <span class="title">{{ props.title ?? '确认' }}</span>
      </div>
    </template>
    {{ props.content }}
    <template #footer>
      <span>
        <el-button @click="close">取消</el-button>
        <slot name="button"></slot>
        <el-button type="primary" @click="save">确定</el-button>
      </span>
    </template>
  </el-dialog>
</template>

<script setup lang="ts">
  const props = defineProps<{
    type?: any;
    title?: any;
    content?: any;
  }>();
  const type = ref(props.type ?? 'warning');
  const emits = defineEmits<{
    (event: 'success'): void;
    (event: 'quit'): void;
  }>();

  const dialogVisible = ref(false);

  const erpCodes = ref([]);
  const open = (codeList) => {
    erpCodes.value = codeList;
    dialogVisible.value = true;
  };

  const close = () => {
    dialogVisible.value = false;
  };

  const saveLoading = ref(false);
  const save = async () => {
    saveLoading.value = false;
    emits('success');
    close();
  };

  defineExpose({
    open,
    close,
  });
</script>

<style lang="scss">
  .custom-comfirm-dialog {
    padding: 20px 24px !important;
    .el-dialog__headerbtn {
      top: 12px;
      right: 12px;
      svg {
        font-size: 20px;
      }
    }
    .el-dialog__header {
      padding: 0 0 10px 0 !important;
      color: var(---N9, #1f1f1f);
      font-family: 'PingFang SC Medium';
      font-size: 16px;
      line-height: 24px;
      i {
        font-size: 24px;
      }
      .title {
        margin-left: 6px;
      }
    }
    .el-dialog__body {
      padding: 0 0 0 30px !important;
      min-height: 44px;
      overflow: hidden;
      color: var(---N8, #666);
      font-size: 14px;
      line-height: 22px;
    }
    .el-dialog__footer {
      padding-top: 16px !important;
      .el-button {
        span {
          font-size: 13px !important;
        }
      }
    }
  }
</style>

<style scoped lang="scss">
  .icon-zhuyizhuangtai {
    color: #ff9f22;
  }
  .icon-cuowuzhuangtai {
    color: #f53f3f;
  }
  .icon-chenggongzhuangtai {
    color: #02b96b;
  }
</style>
