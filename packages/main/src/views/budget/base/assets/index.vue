<template>
  <div>
    <KeenList
      @refresh="refreshList"
      @reset-search="resetSearch"
      @reset-search-by-key="(key) => (search[key] = undefined)"
    >
      <template #search>
        <el-input
          class="w-450px"
          v-model="search.keyWord"
          placeholder="资产大类名称/项目名称/资产名称/细项名称/预算费用科目"
          clearable
        >
          <template #prefix>
            <SvgIconSearch />
          </template>
        </el-input>
      </template>
      <template #buttons>
        <el-button
          type="primary"
          :loading="importLoading"
          class="import-btn"
          v-permission="'budgetAssetsImport'"
          @click="uploadFile"
        >
          导入
        </el-button>
        <ExportBtn
          :service="financeSystemApi.financeAssetInfoExport"
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
        :data="listData?.assetInfoList"
        row-key="id"
        class-name="table-row-dashed"
      >
        <el-table-column label="资产大类编码／项目编码" prop="assetCategoryCode" min-width="180" />
        <el-table-column label="资产大类名称/项目名称" prop="assetCategoryName" min-width="180" />
        <el-table-column label="资产编码/细项编码" prop="assetCode" min-width="150" />
        <el-table-column label="资产名称/细项名称" prop="assetName" min-width="150" />
        <el-table-column label="新项目/跨年旧项目" prop="newProject" min-width="150" />
        <el-table-column label="预算费用科目" prop="budgetExpenseItem" min-width="130" />
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

<script setup lang="ts" name="budgetAssets">
  import useList from '@/hooks/list/useList';
  import { financeSystemApi } from '@/api';
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
    { keyWord?: string; pageNum: number; pageSize: number },
    FinanceSystemContracts.ProductListQueryResp
  >({
    searchDefaults: {
      keyWord: undefined,
    },
    pageSize: PAGE_SIZE,
    service: financeSystemApi.financeAssetInfoQueryList,
  });
  // 下载模板
  const downloadLoading = ref(false);
  const downloadTemplate = async () => {
    downloadLoading.value = true;
    const res = await financeSystemApi.financeAssetInfoDownLoadTemplate().finally(() => {
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
      .financeAssetInfoImportData({
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
