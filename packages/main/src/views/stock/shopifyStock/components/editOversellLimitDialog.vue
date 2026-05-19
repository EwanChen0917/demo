<template>
  <el-dialog
    v-model="visible"
    @close="close"
    width="900px"
    title="编辑最大超售量"
    :close-on-click-modal="false"
  >
    <el-table :data="tableData" border max-height="500">
      <el-table-column prop="msku" label="MSKU" min-width="140" />
      <el-table-column prop="inventoryItemId" label="inventory_item_id" min-width="150" />
      <el-table-column prop="locationCountryCode" label="库存地点" min-width="120" />
      <el-table-column label="最大允许超售量" min-width="180">
        <template #default="{ row }">
          <el-input-number
            v-model="row.oversellLimit"
            :max="200"
            :min="0"
            :precision="0"
            controls-position="right"
            style="width: 100%"
          />
        </template>
      </el-table-column>
    </el-table>
    <template #footer>
      <el-button @click="close">取消</el-button>
      <el-button type="primary" @click="submit" :loading="saveLoading">保存</el-button>
    </template>
  </el-dialog>
</template>

<script setup lang="ts">
  import { ref } from 'vue';
  import { ElMessage } from 'element-plus';
  import { cisApi } from '@/api';

  interface OversellItem {
    msku?: string;
    inventoryItemId?: string;
    locationCountryCode?: string;
    oversellLimit?: number;
    locationId?: string;
  }

  const visible = ref(false);
  const saveLoading = ref(false);
  const tableData = ref<any[]>([]);
  const emit = defineEmits(['success']);

  const resetForm = () => {
    tableData.value = [];
  };

  const open = (data?: OversellItem[]) => {
    resetForm();
    if (data && Array.isArray(data)) {
      tableData.value = data
        .filter((item) => item.inventoryItemId)
        .map((item) => ({
          msku: item.msku || '',
          inventoryItemId: item.inventoryItemId || '',
          locationId: item.locationId || '',
          locationCountryCode: item.locationCountryCode || '',
          oversellLimit: item.oversellLimit ?? 0,
        }));
    }

    visible.value = true;
  };

  const close = () => {
    visible.value = false;
    resetForm();
  };

  const submit = async () => {
    if (saveLoading.value) return;
    try {
      saveLoading.value = true;
      await cisApi.cisInventoryShopifyLevelUpdateOversellLimit({
        saveList: tableData.value,
      });
      ElMessage.success('保存成功');
      emit('success', tableData.value);
      close();
    } catch (error) {
      ElMessage.error('保存失败');
    } finally {
      saveLoading.value = false;
    }
  };

  defineExpose({
    open,
  });
</script>

<style scoped lang="scss"></style>
