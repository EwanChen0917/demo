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
    <div>
      <el-input
        style="width: 325px; margin-right: 12px"
        v-model="search.keyword"
        placeholder="采购单号/供应链SKU/产品名称"
      />
      <el-button
        type="primary"
        size="default"
        @click="
          () => {
            runQuery();
          }
        "
      >
        查询
      </el-button>
    </div>
    <vxe-table
      ref="table"
      :data="dataList"
      border="inner"
      min-height="40"
      row-id="ppCode"
      @checkbox-change="handleSelectionChange"
      @checkbox-all="handleSelectionChange"
    >
      <vxe-column type="checkbox" width="60" />
      <vxe-column field="purchaseOrderCode" title="采购单号" />
      <vxe-column field="productSku" title="供应链SKU" />
      <vxe-column field="productSku" title="供应商名称" />
      <vxe-column field="title" title="产品名称" />
      <vxe-column field="futureArriveQty" title="采购未交数量" />
    </vxe-table>
    <KeenPagination
      :current="current"
      :page-size="pageSize"
      :page-size-option="pageSizeOption"
      :total="total"
      @size-change="handlePageSizeChange"
      @current-change="handleCurrentChange"
    />
    <template #footer>
      <span>
        <el-button @click="visibility = false">取消</el-button>
        <el-button type="primary" @click="confirm">确定</el-button>
      </span>
    </template>
  </el-dialog>
</template>

<script setup lang="ts">
  import { erpApi, ErpApi } from '@/api';
  import { cloneDeep } from 'lodash-es';
  import useList from '@/hooks/list/useList';

  const props = defineProps<{
    selected: any[];
  }>();
  const table = ref();
  const visibility = ref(false);
  const dataList = ref([]);
  const {
    search,
    pagination: {
      total,
      current,
      pageSize,
      handleCurrentChange,
      pageSizeOption,
      handlePageSizeChange,
    },
    listData,
    listLoading,
    refreshList,
    resetSearch,
    runQuery,
  } = useList<
    ErpApi.LuteosErpPlanPrebookInboundQueryInboundProduct.RequestQuery,
    ErpApi.LuteosErpPlanPrebookInboundQueryInboundProduct.ResponseBody
  >({
    searchDefaults: {
      keyword: '',
    },
    pageSize: 10,
    service: erpApi.luteosErpPlanPrebookInboundQueryInboundProduct,
  });
  // const initDataList = async (skuCode: string) => {
  //   const res: any = await erpApi.luteosErpPlanPrebookInboundQueryInboundProduct({});
  //   dataList.value = res.itemInfoList;
  // };
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
  defineExpose({ open, initDataList: runQuery });
</script>

<style scoped lang="scss"></style>
