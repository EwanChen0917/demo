<template>
  <el-dialog
    v-model="visible"
    :title="title"
    :width="width"
    :close-on-click-modal="closeOnClickModal"
    :close-on-press-escape="closeOnPressEscape"
    @close="handleClose"
  >
    <el-form
      ref="formRef"
      :model="form"
      label-width="120px"
      style="width: 100%"
      label-position="top"
    >
      <el-alert type="info" :closable="false" style="margin-bottom: 20px">
        <template #default>
          <span>本次批量转FBA已选择1个订单，其中1个订单可转FBA</span>
          <el-link type="primary" :underline="false" @click="handleGoToView">前往查看</el-link>
        </template>
      </el-alert>
      <div class="fba-content">
        <el-form-item label="店铺/站点">
          <el-select />
        </el-form-item>
        <el-form-item label="订单产品" />
        <el-form-item label="配送速度">
          <el-radio-group>
            <el-radio label="Standard">Standard</el-radio>
            <el-radio label="Expedited">Expedited</el-radio>
            <el-radio label="Priority">Priority</el-radio>
          </el-radio-group>
        </el-form-item>
      </div>
    </el-form>
    <template #footer>
      <el-button @click="handleClose">取消</el-button>
      <el-button type="primary" @click="handleConfirm">确定</el-button>
    </template>
  </el-dialog>
</template>

<script setup lang="ts">
  interface Props {
    title?: string;
    width?: string | number;
    closeOnClickModal?: boolean;
    closeOnPressEscape?: boolean;
  }

  const props = withDefaults(defineProps<Props>(), {
    title: 'FBA订单',
    width: '600px',
    closeOnClickModal: true,
    closeOnPressEscape: true,
  });

  const emit = defineEmits<{
    (event: 'close'): void;
    (event: 'confirm'): void;
  }>();
  const form = ref<{}>({});
  const visible = ref(false);

  const open = () => {
    visible.value = true;
  };

  const close = () => {
    visible.value = false;
  };

  const handleClose = () => {
    close();
    emit('close');
  };

  const handleConfirm = () => {
    emit('confirm');
  };

  const handleGoToView = () => {
    // 前往查看逻辑
  };

  defineExpose({
    open,
    close,
  });
</script>

<style lang="scss" scoped>
  .fba-order-content {
    min-height: 100px;
  }
</style>
