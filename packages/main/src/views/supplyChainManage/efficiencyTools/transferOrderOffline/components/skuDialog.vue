<template>
  <el-dialog
    :model-value="visible"
    @close="$emit('close')"
    width="65%"
    align-center
    @opened="handleOpen"
  >
    <template #header><h2>选择产品</h2></template>
    <OmsSkuTable
      @select="handleMaterialSelect"
      :selected-rows="selectedRows"
      :warehouseCode="warehouseCode"
      row-key="productSku"
    />
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="handleCancel">取消</el-button>
        <el-button type="primary" @click="handleSave">{{ confirmText }}</el-button>
      </span>
      <br />
    </template>
  </el-dialog>
</template>

<script lang="ts" setup>
  import { ElMessage, ElTable as ElTableType } from 'element-plus';
  import { ProductContracts } from '@/api/index';
  import OmsSkuTable from './omsSkuTable.vue';

  const props = withDefaults(
    defineProps<{
      warehouseCode: string;
      visible: boolean;
      selectedRow?: ProductContracts.ProductBean;
      selectedRows?: ProductContracts.ProductBean[];
      selectOne?: boolean;
      confirmText?: string;
      type?: string;
      statuses?: string;
      selectedKey?: string;
      // productType?: number;
      productSpu?: string;
    }>(),
    {
      selectOne: false,
      confirmText: '关联产品',
      type: 'sku',
    }
  );

  const emit = defineEmits<{
    (event: 'close', reload?: boolean, val?: any): void;
  }>();

  const materialList = ref<any[]>([]);
  const handleMaterialSelect = (list) => {
    materialList.value = list;
  };
  // 选择产品
  const handleSave = () => {
    if (!materialList.value?.length) {
      ElMessage.warning({
        message: '未选择产品',
        duration: 5 * 100,
      });
      return;
    }
    emit('close', true, materialList.value);
  };
  // 取消
  const handleCancel = () => {
    emit('close');
  };
  const handleOpen = () => {};
</script>

<style scoped lang="scss"></style>
