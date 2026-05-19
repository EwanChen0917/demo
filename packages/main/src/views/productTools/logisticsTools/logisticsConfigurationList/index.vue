<template>
  <KeenList
    @refresh="refreshList"
    @reset-search="resetSearch"
    @reset-search-by-key="(key) => (search[key] = undefined)"
  >
    <template #search>
      <el-input v-model="search.keyword" clearable placeholder="供应链SKU/产品名称">
        <template #prefix>
          <SvgIconSearch />
        </template>
      </el-input>
    </template>
    <template #buttons>
      <el-button
        class="button"
        @click="handleAdd"
        type="primary"
        v-permission="'logisticsConfigurationListAdd'"
      >
        新增
      </el-button>

      <el-button
        type="primary"
        v-permission="'logisticsConfigurationListImport'"
        @click="uploadVisible = true"
        class="import-btn"
      >
        导入
      </el-button>
      <ExportBtn
        :service="erpApi.luteosErpBaseLogisticsConfigExport"
        :params="{
          ...search,
          downLoadSync: false,
          pageNum: pagination.current.value,
          pageSize: pagination.pageSize.value,
        }"
        :plain="false"
      >
        导出
      </ExportBtn>
    </template>

    <el-table
      ref="tableRef"
      v-loading="listLoading"
      :data="listData?.recordList"
      row-key="configCode"
      class-name="table-row-dashed"
    >
      <el-table-column label="序号">
        <template #default="{ $index }">
          {{ pageSize * (current - 1) + $index + 1 }}
        </template>
      </el-table-column>
      <el-table-column prop="productSku" label="供应链SKU" />
      <el-table-column prop="productNameCn" label="产品名称（中文）" />
      <el-table-column prop="productNameEn" label="产品名称（英文）" />
      <el-table-column prop="declareNameCn" label="申报中文名称" />
      <el-table-column prop="declareNameEn" label="申报英文名称" />
      <el-table-column prop="grossWeight" label="产品毛重（kg）" />
      <el-table-column prop="unitContainerLong" label="单箱的长（cm）" />
      <el-table-column prop="unitContainerWidth" label="单箱的宽（cm）" />
      <el-table-column prop="unitContainerHeight" label="单箱的高（cm）" />
      <el-table-column prop="unitContainerNum" label="单箱数量" />
      <el-table-column prop="unitContainerWeight" label="单箱重量（kg）" />
      <el-table-column label="操作" fixed="right" width="90px">
        <template #default="{ row }">
          <KeenActions
            display-style="buttons"
            :actions="[
              {
                label: '详情',
                key: 'view',
                type: 'primary',
                text: true,
                configCode: row.configCode,
                productSku: row.productSku,
                permissionCode: 'logisticsConfigurationListDetail',
              },
              {
                label: '修改',
                key: 'update',
                type: 'primary',
                text: true,
                configCode: row.configCode,
                productSku: row.productSku,
                permissionCode: 'logisticsConfigurationListUpdate',
              },
            ]"
            @click="handleActions"
          />
        </template>
      </el-table-column>
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
    importScene="logistics_config_import"
    title="导入"
    :isCustomTemplate="true"
    :isCustomUpload="true"
    @close="batchUpdate"
    @get-custom-template="getTemplate"
    @custom-upload="customUpload"
    ref="batchImportModal"
  />
  <LogisticsConfigurationInfo
    @close="closeDialog"
    :configCode="configCode"
    :productSku="productSku"
    :visible="visible"
    :title="title"
  />
</template>

<script lang="ts" setup name="logisticsConfigurationList">
  import { ElMessage, ElTable as ElTableType } from 'element-plus';
  import useList from '@/hooks/list/useList';
  import LogisticsConfigurationInfo from '@/views/productTools/logisticsTools/logisticsConfigurationList/components/LogisticsConfigurationInfo/index.vue';
  import { erpApi, ErpApi } from '@/api/index';
  import { urlDownload } from '@/utils/download';

  const PAGE_SIZE = 10;
  const tableRef = ref<InstanceType<typeof ElTableType>>();
  const title = ref('新增');
  const configCode = ref('');
  const productSku = ref('');
  const uploadVisible = ref(false);
  const visible = ref(false);
  const batchImportModal = ref<any>(null);
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
    resetSearch,
    runQuery,
    pagination,
  } = useList<
    ErpApi.LuteosErpBaseLogisticsConfigQueryList.RequestBody,
    ErpApi.LuteosErpBaseLogisticsConfigQueryList.ResponseBody
  >({
    searchDefaults: {
      keyword: undefined,
    },
    pageSize: PAGE_SIZE,
    service: erpApi.luteosErpBaseLogisticsConfigQueryList,
  });
  const handleAdd = () => {
    title.value = '新增';
    configCode.value = '';
    productSku.value = '';
    visible.value = true;
  };
  const closeDialog = (reload: boolean) => {
    if (reload) {
      refreshList();
    }
    visible.value = false;
  };
  const batchUpdate = (reload: boolean) => {
    if (reload) {
      runQuery();
    }
    uploadVisible.value = false;
  };
  const handleActions = (operate: {
    key: 'view' | 'update';
    configCode: string;
    productSku: string;
  }) => {
    title.value = operate.key === 'view' ? '详情' : '修改';
    visible.value = true;
    configCode.value = operate.configCode;
    productSku.value = operate.productSku;
  };
  const getTemplate = async () => {
    const res = await erpApi.luteosErpBaseLogisticsConfigImportTemplateUrl();
    urlDownload(res as string);
  };
  const customUpload = async (fileList: any[]) => {
    batchImportModal.value.loading = true;
    const res = await erpApi
      .luteosErpBaseLogisticsConfigImport({
        fileName: fileList[0].name,
        ossKey: fileList[0].ossKey,
      })
      .finally(() => {
        batchImportModal.value.loading = false;
      });
    ElMessage.info(
      `成功${(res as any)?.succeededCount}条，失败${(res as any)?.failedCount ?? 0}条${
        ((res as any)?.failedCount ?? 0) > 0 ? '，请到上传日志查看' : ''
      }`
    );
    if ((res as any).succeededCount) {
      refreshList();
    }
    uploadVisible.value = false;
  };
</script>

<style scoped lang="scss"></style>
