<template>
  <el-dialog
    title="选择产品"
    :model-value="visible"
    @close="$emit('close')"
    width="70%"
    align-center
  >
    <KeenList
      @refresh="refreshList"
      @reset-search="resetSearch"
      @reset-search-by-key="(key) => (search[key] = undefined)"
    >
      <template #search>
        <el-input
          v-model="search.keyword"
          placeholder="产品名称/产品SKU/供应链SKU/供应商/供应商代码"
          class="w-450px"
        >
          <template #prefix>
            <SvgIconSearch />
          </template>
        </el-input>
      </template>
      <!-- <template #buttons>
        <el-button type="primary" @click="runQuery">查询</el-button>
      </template> -->
      <vxe-table border="inner" :data="listData?.recordList" max-height="450">
        <vxe-column type="checkbox" width="60" />
        <vxe-column field="supplySku" title="供应链SKU" />
        <vxe-column field="supplierDesc" title="供应商名称" />
        <vxe-column field="skuCode" title="产品SKU" />
        <vxe-column field="productName" title="产品名称" />
        <vxe-column field="purchaseWaitPickQty" title="采购未交数量" />
      </vxe-table>
      <KeenPagination
        :current="current"
        :page-size="pageSize"
        :page-size-option="pageSizeOption"
        :total="total"
        @size-change="handlePageSizeChange"
        @current-change="handleCurrentChange"
      />
    </KeenList>
    <template #footer>
      <el-button @click="$emit('close')">取消</el-button>
      <el-button type="primary">确定</el-button>
    </template>
  </el-dialog>
</template>

<script setup lang="ts">
  import useList from '@/hooks/list/useList';
  import { erpApi, ErpApi } from '@/api';

  const props = defineProps<{
    /** 是否可见 */
    visible: boolean;
  }>();
  const emit = defineEmits<{
    (event: 'close', reload?: boolean, val?: any): void;
  }>();

  const PAGE_SIZE = 10;
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
    ErpApi.LuteosErpPlanBillLadingQueryProduct.RequestQuery,
    ErpApi.LuteosErpPlanBillLadingQueryProduct.ResponseBody
  >({
    searchDefaults: {
      keyword: '',
    },

    pageSize: PAGE_SIZE,
    service: erpApi.luteosErpPlanBillLadingQueryProduct,
  });
</script>

<style scoped lang="scss"></style>
