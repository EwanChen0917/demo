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
      :poolCode="poolCode"
      :warehouseMapName="warehouseMapName"
      :poolCodeName="poolCodeName"
      :multiple="multiple"
      :columnsConfig="columnsConfig"
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
  import { type columnsConfig } from '../type';

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
      productSpu?: string;
      poolCode?: string;
      warehouseMapName?: string;
      poolCodeName?: string;
      multiple?: boolean;
      columnsConfig?: columnsConfig;
    }>(),
    {
      selectOne: false,
      confirmText: '确定',
      type: 'sku',
      multiple: true,
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
        message: '请先选择产品信息',
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
  const handleOpen = () => {
    console.log(props.poolCode);
  };
</script>

<style scoped lang="scss"></style>
