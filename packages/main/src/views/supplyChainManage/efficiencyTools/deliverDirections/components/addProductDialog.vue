<template>
  <el-dialog
    title="添加产品"
    v-model="visibility"
    width="800px"
    :before-close="
      () => {
        visibility = false;
      }
    "
  >
    <vxe-table
      ref="table"
      :data="dataList"
      border="inner"
      min-height="40"
      row-id="supplySku"
      @checkbox-change="handleSelectionChange"
      @checkbox-all="handleSelectionChange"
    >
      <vxe-column type="checkbox" width="60" />
      <vxe-column field="supplySku" title="供应链SKU" />
      <vxe-column field="skuCode" title="产品SKU" />
      <vxe-column field="inventory" title="中仓库存" />
      <vxe-column field="maxQty" title="最大发货量" />
    </vxe-table>
    <template #footer>
      <span>
        <el-button @click="visibility = false">取消</el-button>
        <el-button type="primary" @click="confirm">确定</el-button>
      </span>
    </template>
  </el-dialog>
</template>

<script setup lang="ts">
  import { erpApi } from '@/api';
  import { cloneDeep } from 'lodash-es';

  const props = defineProps<{
    selected: any[];
  }>();
  const table = ref();
  const visibility = ref(false);
  const dataList = ref([]);
  const initDataList = async (skuCode: string) => {
    const res: any = await erpApi.luteosErpPlanShipCommandV2QuerySupplySkuList({
      skuCode,
    });
    dataList.value = res.itemInfoList;
  };
  const selectedProduct = ref([]);
  const handleSelectionChange = ({ records }) => {
    selectedProduct.value = records;
  };
  const confirm = () => {
    emits('select', cloneDeep(selectedProduct.value));
    visibility.value = false;
  };
  const emits = defineEmits<{ (event: 'select', data: any[]): void }>();
  const open = () => {
    visibility.value = true;
  };
  watch(
    visibility,
    (val) => {
      if (val) {
        selectedProduct.value = [...(props.selected as [])];
        nextTick(() => {
          if (selectedProduct.value.length) {
            selectedProduct.value.forEach((row) => {
              table.value?.setCheckboxRow(row, true);
            });
          } else {
            table.value?.clearCheckboxRow();
          }
        });
      }
    },
    {
      immediate: true,
    }
  );
  defineExpose({ open, initDataList });
</script>

<style scoped lang="scss"></style>
