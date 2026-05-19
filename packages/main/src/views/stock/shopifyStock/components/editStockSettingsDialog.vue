<template>
  <el-dialog
    v-model="visible"
    @close="close"
    width="1200px"
    title="编辑库存设置"
    :close-on-click-modal="false"
  >
    <el-table :data="tableData" border max-height="500">
      <el-table-column prop="msku" label="MSKU" min-width="140" />
      <el-table-column prop="inventoryItemId" label="inventory_item_id" min-width="150" />
      <el-table-column prop="locationCountryCode" label="库存地点" min-width="120" />
      <el-table-column label="跟踪状态" min-width="140">
        <template #default="{ row }">
          <el-switch
            v-model="row.tracked"
            :active-value="1"
            :inactive-value="0"
            active-text="跟踪"
            inactive-text="不跟踪"
          />
        </template>
      </el-table-column>
      <el-table-column label="最大允许超售量" min-width="160">
        <template #default="{ row }">
          <el-input-number
            v-model="row.oversellLimit"
            :max="200"
            :min="0"
            :precision="0"
            controls-position="right"
            style="width: 100%"
            v-if="row.allowBackorder === 1"
          />
          <span v-else>0</span>
        </template>
      </el-table-column>
      <el-table-column label="缺货售卖" min-width="140">
        <template #default="{ row }">
          <el-switch
            v-model="row.allowBackorder"
            :active-value="1"
            :inactive-value="0"
            active-text="是"
            inactive-text="否"
          />
        </template>
      </el-table-column>
      <el-table-column label="库存同步" min-width="140">
        <template #default="{ row }">
          <el-select v-model="row.autoSyncStock" style="width: 100%">
            <el-option label="是" :value="1" />
            <el-option label="否" :value="0" />
          </el-select>
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

  interface StockSettingItem {
    msku?: string;
    inventoryItemId?: string;
    locationCountryCode?: string;
    locationId?: string;
    shopAccount?: string;
    tracked?: 1 | 0;
    oversellLimit?: number;
    allowBackorder?: 1 | 0;
    autoSyncStock?: 1 | 0;
  }

  const visible = ref(false);
  const saveLoading = ref(false);
  const tableData = ref<StockSettingItem[]>([]);
  const emit = defineEmits<{
    (e: 'success', value: StockSettingItem[]): void;
  }>();

  const resetForm = () => {
    tableData.value = [];
  };

  const open = (data?: StockSettingItem[]) => {
    resetForm();
    if (data && Array.isArray(data)) {
      tableData.value = data
        .filter((item) => item.inventoryItemId)
        .map((item) => ({
          msku: item.msku || '',
          inventoryItemId: item.inventoryItemId || '',
          locationId: item.locationId || '',
          shopAccount: item.shopAccount || '',
          locationCountryCode: item.locationCountryCode || '',
          tracked: item.tracked ?? 1,
          oversellLimit: item.oversellLimit ?? 0,
          allowBackorder: item.allowBackorder ?? 0,
          autoSyncStock: item.autoSyncStock ?? 0,
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
    if (!tableData.value.length) {
      ElMessage.warning('暂无可保存的数据');
      return;
    }
    const saveList = tableData.value.map((item) => ({
      inventoryItemId: item.inventoryItemId ? Number(item.inventoryItemId) : undefined,
      locationId: item.locationId ? Number(item.locationId) : undefined,
      shopAccount: item.shopAccount || undefined,
      oversellLimit: item.oversellLimit && item.allowBackorder ? item.oversellLimit : 0,
      tracked: item.tracked ?? 0,
      allowBackorder: item.allowBackorder ?? 0,
      autoSyncStock: item.autoSyncStock ?? 0,
    }));
    try {
      saveLoading.value = true;
      await cisApi.cisInventoryShopifyLevelUpdateConfig({
        saveList,
      });
      ElMessage.success('保存成功');
      emit('success', tableData.value);
      close();
    } catch (error) {
      /** empty */
    } finally {
      saveLoading.value = false;
    }
  };

  defineExpose({
    open,
  });
</script>

<style scoped lang="scss"></style>
