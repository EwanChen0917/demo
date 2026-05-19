<template>
  <div>
    <KeenList
      @refresh="refreshList"
      @reset-search="resetSearch"
      @reset-search-by-key="(key) => (search[key] = undefined)"
    >
      <template #search>
        <el-input v-model="search.keyWord" placeholder="项目编码/咨询项目名称" clearable>
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
          v-permission="'budgetConsultingProjectImport'"
          @click="uploadFile"
        >
          导入
        </el-button>
        <ExportBtn
          :service="financeSystemApi.financeConsultingProjectExport"
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
        row-key="code"
        class-name="table-row-dashed"
      >
        <el-table-column label="项目编号" prop="code" />
        <el-table-column label="咨询项目名称" prop="name" />
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

<script setup lang="ts" name="budgetConsultingProject">
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
    { keyWord?: string; pageNum: number; pageSize: number },
    FinanceSystemContracts.ProductListQueryResp
  >({
    searchDefaults: {
      keyWord: undefined,
    },
    pageSize: PAGE_SIZE,
    service: financeSystemApi.financeConsultingProjectQueryList,
  });

  // 下载模板
  const downloadLoading = ref(false);
  const downloadTemplate = async () => {
    downloadLoading.value = true;
    const res = await financeSystemApi.financeConsultingProjectDownLoadTemplate().finally(() => {
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
      .financeConsultingProjectImportData({
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
