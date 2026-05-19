<template>
  <KeenList>
    <template #search>
      <el-input
        v-model="search.outBoundCode"
        placeholder="出库单号/调拨单号"
        clearable
        class="input-search"
      >
        <template #prefix>
          <SvgIconSearch />
        </template>
      </el-input>
      <el-input v-model="search.keyword" placeholder="订单号" clearable class="input-search">
        <template #prefix>
          <el-select :style="{ width: '105px' }" v-model="search.keyType">
            <el-option label="系统订单号" value="system_code" />
            <el-option label="平台订单号" value="platform_code" />
          </el-select>
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
    </template>
    <template #filters>
      <el-date-picker
        style="width: 280px"
        v-model="outBoundDate"
        start-placeholder="出库日期从"
        end-placeholder="出库日期至"
        type="daterange"
        value-format="YYYY-MM-DD"
        @change="
          (dateArr) => {
            search.outBoundDateStart = dateArr ? dateArr[0] : '';
            search.outBoundDateEnd = dateArr ? dateArr[1] : '';
          }
        "
      />
    </template>
    <template #buttons>
      <el-button class="button" type="primary" @click="resetSearch">重置</el-button>
      <el-button class="button" type="primary" @click="handleDel">删除</el-button>
      <ExportBtn
        :ignore-app-code="true"
        ref="exportRef"
        v-permission="'sndeliveryExport'"
        :service="erpApi.luteosErpSnOutboundExportList"
        manual
        :params="search"
        @before-export="beforeExport"
      >
        导出
      </ExportBtn>
      <el-button
        v-permission="'sndeliveryImport'"
        type="primary"
        plain
        @click="uploadVisible = true"
      >
        导入
      </el-button>
    </template>
    <el-table
      ref="tableRef"
      v-loading="listLoading"
      :data="listData?.recordList"
      row-key="id"
      class-name="table-row-dashed"
      @selection-change="handleSelectionChange"
    >
      <el-table-column type="selection" width="55" />
      <el-table-column label="出库单号/调拨单号" prop="outBoundCode" />
      <el-table-column label="系统订单号" prop="systemCode" />
      <el-table-column label="平台单号" prop="platformCode" :width="130" />
      <el-table-column label="供应链SKU" prop="productSku" :width="130" />
      <el-table-column label="产品名称" prop="productName" />
      <el-table-column label="数量" prop="qty" />
      <el-table-column label="外箱码" prop="outerBoxCode" />
      <el-table-column label="中箱码" prop="centerBoxCode" />
      <el-table-column label="彩盒码" prop="graphicCartonCode" />
      <el-table-column label="产品SN码" prop="snCode" />
      <el-table-column label="UID" prop="uid" />
      <el-table-column label="SID" prop="sid" />
      <el-table-column label="出库日期" prop="outBoundDate" />
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
  <BatchImportModal
    v-if="uploadVisible"
    :visible="uploadVisible"
    importScene="erp_product_sn_outbound_import"
    title="导入"
    :isCustomTemplate="true"
    :isCustomUpload="true"
    @get-custom-template="getCustomTemplate"
    @close="close"
    @custom-upload="customUpload"
  />
</template>

<script setup lang="ts" name="sndelivery">
  import useList from '@/views/lute-os/hooks/list/useList';
  import { type ErpApi, erpApi } from '@/api';
  import * as swal from '@/utils/swal';
  import { ElMessage } from 'element-plus';
  import { ProductSnOutboundQueryListRespItemInfo } from '@/api/erp/data-contracts';
  import { urlDownload } from '@/utils/download';

  const PAGE_SIZE = 10;
  const uploadVisible = ref();
  const outBoundDate = ref('');
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
    ErpApi.LuteosErpSnOutboundList.RequestBody,
    ErpApi.LuteosErpSnOutboundList.ResponseBody
  >({
    searchDefaults: {
      outBoundCode: undefined,
      keyword: undefined,
      outBoundDateStart: undefined,
      outBoundDateEnd: undefined,
      productSku: undefined,
      snCode: undefined,
      keyType: undefined,
    },
    pageSize: PAGE_SIZE,
    service: erpApi.luteosErpSnOutboundList,
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
  // 关闭导入弹窗
  const close = (isConfirm: boolean) => {
    uploadVisible.value = false;
    if (isConfirm) {
      refreshList();
    }
  };
  const selectedRows = ref<ProductSnOutboundQueryListRespItemInfo[]>([]);
  const handleSelectionChange = (selected: ProductSnOutboundQueryListRespItemInfo[]) => {
    selectedRows.value = selected;
  };
  const handleDel = async () => {
    if (selectedRows.value.length === 0) {
      ElMessage.warning('请选择要删除的行');
      return;
    }
    const isConfirmed = await swal.confirm('确定要删除吗？');
    if (!isConfirmed) return;
    const ids = selectedRows.value.map((item) => item.id!);
    try {
      await erpApi.luteosErpSnOutboundBatchDeleted({ idList: ids });
      ElMessage.success('删除成功');
      refreshList();
    } catch (error) {
      console.error(error);
    }
  };
  const getCustomTemplate = async () => {
    const res = await erpApi.luteosErpSnOutboundQueryImportTemplate({
      importScene: 'erp_product_sn_outbound_import',
    });
    return urlDownload(res.templateUrl as string);
  };
  const customUpload = async (fileList) => {
    const res = await erpApi.luteosErpSnOutboundImportData({
      importScene: 'erp_product_sn_outbound_import',
      fileName: fileList[0].name,
      key: fileList[0].ossKey,
    });
    ElMessage.info(
      `成功${res.succeededCount}条，失败${res.failedCount ?? 0}条${
        (res.failedCount ?? 0) > 0 ? '，请到上传日志查看' : ''
      }`
    );
    uploadVisible.value = false;
    refreshList();
  };
</script>

<style scoped lang="scss">
  .input-search {
    margin-right: 6px;
  }
</style>
