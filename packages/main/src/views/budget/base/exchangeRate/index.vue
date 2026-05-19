<template>
  <div>
    <KeenList
      @refresh="refreshList"
      @reset-search="resetSearch"
      @reset-search-by-key="(key) => (search[key] = undefined)"
    >
      <template #search>
        <el-input v-model="search.keyword" placeholder="原币/货币代码" clearable>
          <template #prefix>
            <SvgIconSearch />
          </template>
        </el-input>
      </template>
      <template #filters>
        <el-date-picker
          v-model="search.exchangeRateDate"
          type="year"
          placeholder="汇率日期"
          value-format="YYYY"
          format="YYYY"
          style="width: 288px"
        />
      </template>
      <template #buttons>
        <el-button
          type="primary"
          :loading="importLoading"
          class="import-btn"
          v-permission="'budgetExchangeRateImport'"
          @click="uploadFile"
        >
          导入
        </el-button>
        <ExportBtn
          :service="financeSystemApi.financeBasicExportCurrencyList"
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
        :data="listData?.recordList"
        row-key="uniqueCode"
        class-name="table-row-dashed"
      >
        <el-table-column label="汇率日期" prop="exchangeRateDate" />
        <el-table-column label="原币" prop="originalCurrency" />
        <el-table-column label="货币代码" prop="originalCurrencyCode" />
        <el-table-column label="人民币汇率" prop="rateCny" />
        <el-table-column label="美元汇率" prop="rateUsd" />
        <el-table-column label="数据来源" prop="dataSourceDesc" />
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

<script setup lang="ts" name="budgetExchangeRate">
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
      keyword: undefined,
      exchangeRateDate: undefined,
    },
    pageSize: PAGE_SIZE,
    service: financeSystemApi.financeBasicQueryCurrencyList,
  });

  // 下载模板
  const downloadLoading = ref(false);
  const downloadTemplate = async () => {
    downloadLoading.value = true;
    const res = await financeSystemApi.financeBasicDownloadCurrencyTemplate().finally(() => {
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
      .financeBasicImportCurrencyData({
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
