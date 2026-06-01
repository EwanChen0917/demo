<template>
  <el-dialog title="是否中仓" v-model="visible" width="420px" @close="visible = false">
    <el-form label-width="100px">
      <el-form-item label="是否中仓">
        <el-switch
          v-model="formData.isCenterWarehouse"
          :active-value="1"
          :inactive-value="0"
          active-text="是"
          inactive-text="否"
        />
      </el-form-item>
    </el-form>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="visible = false">取消</el-button>
        <el-button type="primary" :loading="saveLoading" @click="save">确认</el-button>
      </span>
    </template>
  </el-dialog>
</template>

<script setup lang="ts">
  import { ErpApi, erpApi } from '@/api';
  import { ElMessage } from 'element-plus';

  const emit = defineEmits(['success']);

  const visible = ref(false);
  const saveLoading = ref(false);
  const formData = ref<ErpApi.WarehouseUpdateReq>({
    warehouseId: undefined,
    isCenterWarehouse: 0,
  });

  const open = (row) => {
    formData.value = {
      warehouseId: row.warehouseId,
      isCenterWarehouse: row.isCenterWarehouse ?? 0,
    };
    visible.value = true;
  };

  const save = async () => {
    if (!formData.value.warehouseId) {
      return;
    }
    try {
      saveLoading.value = true;
      await erpApi.luteosErpWarehouseUpdateCenterWarehouse(formData.value);
      ElMessage.success('更新成功');
      emit('success', formData.value.warehouseId);
      visible.value = false;
    } finally {
      saveLoading.value = false;
    }
  };

  defineExpose({
    open,
  });
</script>

<style scoped lang="scss"></style>
