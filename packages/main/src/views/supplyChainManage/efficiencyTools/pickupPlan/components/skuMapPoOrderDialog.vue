<template>
  <el-dialog title="选择数据" v-model="visible" align-center width="980px">
    <KeenList @reset-search="resetSearch" :selectedNum="resultSelection.length">
      <template #search>
        <el-input
          v-model="search.keyword"
          placeholder="请输入物料编码/物料名称"
          clearable
          @blur="fetchData"
        />
      </template>
      <el-table
        ref="tableRef"
        v-loading="listLoading"
        :data="listData?.recordList || []"
        :row-key="(row) => row.materialNumber"
        @selection-change="handleSelectionChange"
        max-height="350px"
      >
        <el-table-column type="selection" width="40" reserve-selection />
        <el-table-column prop="materialNumber" label="物料编码" min-width="100" />
        <el-table-column prop="materialName" label="物料名称" min-width="140" />
        <el-table-column prop="notDeliveryQuantity" label="可发总量" min-width="100" />
        <el-table-column prop="orderNumber" label="关联PO" min-width="140">
          <template #default="{ row }">
            <OverflowTooltip :content="row.orderNumber" :line="1" />
          </template>
        </el-table-column>
      </el-table>
    </KeenList>
    <template #footer>
      <el-button type="text" @click="close">取消</el-button>
      <el-button type="primary" @click="selectOk" :disabled="!resultSelection?.length">
        确定
      </el-button>
    </template>
  </el-dialog>
</template>

<script lang="ts" setup>
  import { erpApi } from '@/api/index';
  import { useRequest } from 'vue-request';
  import { reactive, ref, nextTick } from 'vue';

  interface SkuItem {
    materialNumber: string;
    [key: string]: any;
  }

  interface Props {
    modelValue: SkuItem[];
  }

  const props = withDefaults(defineProps<Props>(), {
    //allAddList: () => [],
  });

  const emit = defineEmits<{ (e: 'update:modelValue', val: SkuItem[]): void }>();

  const visible = ref(false);
  const tableRef = ref(null);
  const search = reactive({
    keyword: '',
    supplierCode: '',
  });

  const {
    loading: listLoading,
    data: listData,
    run: getPoList,
  } = useRequest(erpApi.luteosErpPlanPickupGetMaterialPurchaseSummary, {
    manual: true,
  });

  const resultSelection = ref<SkuItem[]>([]);

  const handleSelectionChange = (val: SkuItem[]) => {
    resultSelection.value = val;
  };

  const selectOk = () => {
    if (props.modelValue?.length) {
      props.modelValue.forEach((item) => {
        const index = resultSelection.value.findIndex(
          (row) => row.materialNumber === item.materialNumber
        );
        if (index !== -1) {
          resultSelection.value[index] = item;
        }
      });
    }
    emit('update:modelValue', resultSelection.value);
    visible.value = false;
  };
  // 移除 watch，改为在 blur 时触发请求
  const fetchData = async () => {
    await getPoList({
      supplierCode: search.supplierCode,
      keyword: search.keyword,
    });

    nextTick(() => {
      if (tableRef.value && listData.value?.recordList) {
        tableRef.value.clearSelection();

        const currentSelection = props.modelValue.map((item) => item.materialNumber);

        const rowsToSelect = listData.value.recordList.filter((row) =>
          currentSelection.includes(row.materialNumber)
        );
        rowsToSelect.forEach((row) => {
          tableRef.value.toggleRowSelection(row, true);
        });
        resultSelection.value = rowsToSelect;
      }
    });
  };

  const open = (supplierCode: string) => {
    visible.value = true;
    search.supplierCode = supplierCode;
    resultSelection.value = [...props.modelValue];
    fetchData();
  };

  const resetSearch = () => {
    search.keyword = '';
    fetchData();
  };

  const close = () => {
    visible.value = false;
  };

  defineExpose({ open });
</script>

<style scoped lang="scss"></style>
