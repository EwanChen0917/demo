<template>
  <div>
    <KeenList
      @refresh="refreshList"
      @reset-search="resetSearch"
      @reset-search-by-key="(key) => (search[key] = undefined)"
    >
      <template #filters>
        <el-select
          v-model="search.countryCodeList"
          :options="countryMap.map(item=>{
            return {
              label: item.countryCode + ' - ' + item.countryName,
              value: item.countryCode
            }
          })"
          multiple
          clearable
          filterable
          collapse-tags
          collapse-tags-tooltip
          :max-collapse-tags="1"
          placeholder="国家"
        />
        <el-select
          v-model="search.customerTypeList"
          :options="customerTypeLists"
          :props = "{label: 'name', value: 'code'}"
          multiple
          clearable
          filterable
          collapse-tags
          collapse-tags-tooltip
          :max-collapse-tags="1"
          placeholder="渠道"
        />
      </template>
      <template #buttons>
        <el-button
          type="primary"
          :loading="importLoading"
          class="import-btn"
          v-permission="'budgetSellInUnitPriceImport'"
          @click="uploadFile"
        >
          导入
        </el-button>
        <ExportBtn
          :service="financeSystemApi.financeSellInExport"
          :params="{
            ...search,
          }"
        >
          导出
        </ExportBtn>
        <el-button type="primary" plain @click="downloadTemplate" :loading="downloadLoading">
          下载模板
        </el-button>
      </template>
      <el-table
        ref="tableRef"
        v-loading="listLoading"
        :data="listData?.sellInList"
        row-key="id"
        class-name="table-row-dashed"
      >
        <el-table-column label="SKU" prop="sku" />
        <el-table-column label="店铺渠道" prop="customerName" />
        <el-table-column label="渠道" prop="customerType" />
        <el-table-column label="国家名称" prop="country" />
        <el-table-column label="国家编码" prop="countryCode" />
        <el-table-column label="币种" prop="currency" />
        <el-table-column label="Sell In单价" prop="sellInUnitPrice" />
        <el-table-column label="数据来源" prop="dataSource" />
      </el-table>
      <KeenPagination
        :current="current"
        :page-size="pageSize"
        :page-size-option="[20, 50, 100, 200, 500]"
        :total="total"
        @size-change="handlePageSizeChange"
        @current-change="handleCurrentChange"
      />
    </KeenList>
    <UploadFileModal
      v-if="uploadVisible"
      :visible="uploadVisible"
      @close="
        () => {
          uploadVisible = false;
        }
      "
      @save="handleUploadSuccess"
    />
  </div>
</template>

<script setup lang="ts" name="budgetSellInUnitPrice">
  import useList from '@/hooks/list/useList';
  import { financeSystemApi, dataApi } from '@/api';
  import type { FinanceSystemContracts } from '@/api';
  import { urlDownload } from '@/utils/download';
  import { ElMessage } from 'element-plus';
  import * as swal from '@/utils/swal';
  import { openWindow } from '@/utils';
  import UploadFileModal from '../components/UploadFileModal.vue';

  const PAGE_SIZE = 20;
  const {
    search,
    pagination: { total, current, pageSize, handleCurrentChange, handlePageSizeChange },
    listData,
    listLoading,
    runQuery,
    resetSearch,
    refreshList,
  } = useList<
    { keyword?: string; pageNum: number; pageSize: number },
    FinanceSystemContracts.ProductListQueryResp
  >({
    searchDefaults: {
      countryCodeList: undefined,
      customerTypeList: undefined,
    },
    pageSize: PAGE_SIZE,
    service: financeSystemApi.financeSellInQueryList,
  });
  const countryMap = ref<any[]>([]);
  const getSiteOptions = async () => {
    const res = await dataApi.luteosDataQueryCountryList({
      pageNum: 1,
      pageSize: 500,
    });
    countryMap.value = res?.countryList || [];
  };
  getSiteOptions();
  const customerTypeLists = ref([]);
  const getChanneleList = async () => {
    const res = await financeSystemApi.financeBasicQueryChannelSelect({
      pageNum: 1,
      pageSize: 1000,
    });
    customerTypeLists.value = res;
  };
  getChanneleList();
  // 下载模板
  const downloadLoading = ref(false);
  const downloadTemplate = async () => {
    downloadLoading.value = true;
    const res = await financeSystemApi.financeSellInDownLoadTemplate().finally(() => {
      downloadLoading.value = false;
    });
    urlDownload(res as string);
  };
  const importLoading = ref(false);
  const uploadVisible = ref<boolean>(false);
  const uploadFile = () => {
    uploadVisible.value = true;
  };
  const handleUploadSuccess = (files) => {
    uploadVisible.value = false;
    // 获取文件信息
    const file = files[files.length - 1];
    importLoading.value = true;
    // 导入
    financeSystemApi
      .financeSellInImportData({
        fileName: file.name,
        ossKey: file.ossKey,
      })
      .then(async (res: any) => {
        // 导入成功处理
        importLoading.value = false;
        runQuery();
        const isConfirmed = await swal.confirm({
          title: '文件已上传，是否去查看最终处理结果?',
          icon: 'success',
          confirmButtonText: '去查看',
          cancelButtonText: '知道了',
          customClass: {
            confirmButton: 'btn btn-success',
            cancelButton: 'btn btn-active-light',
          },
        });
        if (isConfirmed) {
          openWindow('/salesForecastingLog');
        }
      })
      .finally(() => {
        importLoading.value = false;
        uploadVisible.value = false;
      });
  };
</script>

<style scoped lang="scss"></style>
