<template>
  <KeenList
    @reset-search-by-key="resetSearchByKey"
    @reset-search="resetSearch"
    @refresh="refreshList"
  >
    <template #search>
      <SupplierSelect v-model="search.supplierCode" placeholder="请选择物流商" clearable />
    </template>
    <template #filters>
      <el-select v-model="search.transportType" placeholder="请选择运输方式" clearable>
        <el-option label="海运" value="海运" />
        <el-option label="空运" value="空运" />
        <el-option label="陆运" value="陆运" />
      </el-select>
      <el-select v-model="search.status" placeholder="请选择使用状态" clearable>
        <el-option label="启用" :value="1" />
        <el-option label="禁用" :value="0" />
      </el-select>
    </template>
    <template #buttons>
      <el-button class="button" type="primary" plain @click="importVisible = true">导入</el-button>
    </template>
    <el-table ref="tableRef" v-loading="listLoading" :data="listData?.recordList" row-key="id">
      <el-table-column label="物流商类型" prop="supplierTypeDesc" />
      <el-table-column label="物流商名称" prop="supplierName" />
      <el-table-column label="物流商编码" prop="supplierCode" />
      <el-table-column label="运输方式" prop="transportType" />
      <el-table-column label="配额比例" prop="quoteRadio" />
      <el-table-column label="预警配额比例" prop="notifyRadio" />
      <el-table-column label="使用状态" prop="statusDesc" />
      <el-table-column label="创建人" prop="creator" />
      <el-table-column label="创建时间" prop="createTime" />
      <el-table-column label="修改人" prop="updator" />
      <el-table-column label="修改时间" prop="updateTime" />
    </el-table>
    <KeenPagination
      :current="current"
      :page-size="pageSize"
      :page-size-option="pageSizeOption"
      :total="total"
      size="small"
      @size-change="handlePageSizeChange"
      @current-change="handleCurrentChange"
    />
  </KeenList>
  <BatchImportModal
    ref="importModalRef"
    v-if="importVisible"
    :visible="importVisible"
    title="导入"
    :isCustomTemplate="true"
    :isCustomUpload="true"
    @get-custom-template="getCustomTemplate"
    @close="close"
    @custom-upload="customUpload"
  />
</template>

<script setup lang="ts" name="logisticsQuotaWarning">
  import { TmsApi, tmsApi } from '@/api';
  import useList from '@/hooks/list/useList';
  import { urlDownload } from '@/utils/download';
  import { ElMessage } from 'element-plus';

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
    runQuery,
    resetSearch,
    refreshList,
  } = useList<
    TmsApi.TmsErpLogisticsChannelNotifyConfigQueryList.RequestBody,
    TmsApi.TmsErpLogisticsChannelNotifyConfigQueryList.ResponseBody
  >({
    searchDefaults: {
      supplierCode: undefined,
      status: undefined,
      transportType: undefined,
    },
    pageSize: 10,
    service: tmsApi.tmsErpLogisticsChannelNotifyConfigQueryList,
  });
  const importVisible = ref(false);
  const importModalRef = ref();
  const resetSearchByKey = (key: string) => {
    search[key] = undefined;
  };
  const getCustomTemplate = async () => {
    const res = await tmsApi.tmsCommonFileQueryImportTemplate({
      importScene: 'logistics_channel_notify_config_import',
    });
    return res?.templateUrl ? urlDownload(res?.templateUrl as string) : '';
  };
  const close = () => {
    importVisible.value = false;
  };
  const customUpload = async (fileList: any[]) => {
    importModalRef.value.loading = true;
    try {
      const res = await tmsApi.tmsCommonFileImportData({
        importScene: 'logistics_channel_notify_config_import',
        fileName: fileList[0].name,
        key: fileList[0].ossKey,
      });
      if (res) {
        ElMessage.success('导入成功');
        refreshList();
      }
    } finally {
      importModalRef.value.loading = false;
      importVisible.value = false;
    }
  };
</script>
