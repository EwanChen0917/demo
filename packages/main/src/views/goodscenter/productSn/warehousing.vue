<template>
  <KeenList
    @refresh="refreshList"
    @reset-search="resetSearch"
    @reset-search-by-key="(key) => (search[key] = undefined)"
  >
    <template #search>
      <el-input v-model="search.poNumber" placeholder="采购订单号" clearable class="input-search">
        <template #prefix>
          <SvgIconSearch />
        </template>
      </el-input>
    </template>
    <template #filters>
      <el-input
        v-model="search.deliveryNumber"
        placeholder="SRM发货单号"
        clearable
        class="input-search"
      >
        <template #prefix>
          <SvgIconSearch />
        </template>
      </el-input>
      <el-input
        v-model="search.lotNoCode"
        placeholder="积加交货单号"
        clearable
        class="input-search"
      >
        <template #prefix>
          <SvgIconSearch />
        </template>
      </el-input>
      <el-input v-model="search.jjPoCode" placeholder="积加采购单号" clearable class="input-search">
        <template #prefix>
          <SvgIconSearch />
        </template>
      </el-input>
      <el-input
        v-model="search.wmsInboundCode"
        placeholder="积加入库单号"
        clearable
        class="input-search"
      >
        <template #prefix>
          <SvgIconSearch />
        </template>
      </el-input>
      <el-input v-model="search.productSku" placeholder="供应链SKU" clearable class="input-search">
        <template #prefix>
          <SvgIconSearch />
        </template>
      </el-input>
      <el-input v-model="search.snCode" placeholder="产品SN码" clearable class="input-search">
        <template #prefix>
          <SvgIconSearch />
        </template>
      </el-input>
      <el-input v-model="search.uid" placeholder="UID" clearable class="input-search">
        <template #prefix>
          <SvgIconSearch />
        </template>
      </el-input>
    </template>
    <template #buttons>
      <ExportBtn
        ref="exportRef"
        v-permission="'snwarehousingExport'"
        :service="erpApi.luteosErpSnInboundExportList"
        manual
        :params="search"
        @before-export="beforeExport"
      >
        导出
      </ExportBtn>
    </template>
    <el-table
      ref="tableRef"
      v-loading="listLoading"
      :data="listData?.recordList"
      class-name="table-row-dashed"
    >
      <el-table-column label="采购订单号" prop="poNumber" />
      <el-table-column label="SRM发货单号" prop="deliveryNumber" />
      <el-table-column label="积加采购单号" prop="jjPoCode" :width="130" />
      <el-table-column label="积加交货单号" prop="lotNoCode" :width="130" />
      <el-table-column label="积加入库单号" prop="wmsInboundCode" />
      <el-table-column label="供应链SKU" prop="productSku" />
      <el-table-column label="产品名称" prop="productName" />
      <el-table-column label="数量" prop="receiveQty" />
      <el-table-column label="外箱码" prop="outerBoxCode" />
      <el-table-column label="中箱码" prop="centerBoxCode" />
      <el-table-column label="彩盒码" prop="graphicCartonCode" />
      <el-table-column label="产品SN码" prop="snCode" />
      <el-table-column label="UID" prop="uid" />
      <el-table-column label="SID" prop="sid" />
      <el-table-column label="供应商批次" prop="batchNo" />
      <el-table-column label="生产日期" prop="manufactureDate" />
    </el-table>
    <KeenPagination
      :current="current"
      :page-size="pageSize"
      :page-size-option="pageSizeOption"
      :total="total"
      @size-change="handlePageSizeChange"
      @current-change="handleCurrentChange"
    />
  </KeenList>
</template>

<script setup lang="ts" name="snwarehousing">
  import useList from '@/hooks/list/useList';
  import { ErpApi, erpApi, productApi, ProductApi } from '@/api';
  import * as swal from '@/utils/swal';
  import { openWindow } from '@/utils';
  import { ElMessage } from 'element-plus';
  import AddSn from './Modal/addSn.vue';

  const PAGE_SIZE = 10;

  const {
    search,
    // searchData,
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
    runQuery,
    resetSearch,
    // selectedKeys,
  } = useList<
    ErpApi.LuteosErpSnInboundList.RequestBody,
    ErpApi.LuteosErpSnInboundList.ResponseBody
  >({
    searchDefaults: {
      deliveryNumber: undefined,
      jjPoCode: undefined,
      lotNoCode: undefined,
      poNumber: undefined,
      productSku: undefined,
      snCode: undefined,
      uid: undefined,
      wmsInboundCode: undefined,
    },
    pageSize: PAGE_SIZE,
    service: erpApi.luteosErpSnInboundList,
  });
  const exportRef = ref();
  const beforeExport = async () => {
    const isExistSearch = Object.values(search).some(Boolean);
    if (!isExistSearch) {
      ElMessage.warning('请至少输入一个查询条件');
      return;
    }
    const isConfirmed = await swal.confirm('确定要导出吗？');
    if (!isConfirmed) return;
    exportRef.value?.confirmExport();
  };
</script>

<style scoped lang="scss">
  .input-search {
    width: 260px !important;
  }
</style>
