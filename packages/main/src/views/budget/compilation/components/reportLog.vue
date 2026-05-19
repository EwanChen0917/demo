<template>
  <el-dialog :model-value="visible" @close="visible = false" width="75%">
    <el-table
      max-height="400px"
      ref="tableRef"
      class-name="table-row-dashed"
      v-loading="loading"
      :data="dataList"
      row-key="skuCode"
    >
      <el-table-column type="index" label="序号" width="70px" />
      <el-table-column label="稿件" prop="1" min-width="250">
        <template #default="{ row }">
          <div>{{ nameList[row.nowStepCode] }}</div>
        </template>
      </el-table-column>
      <el-table-column label="操作人" prop="reporterDesc" min-width="250" />
      <el-table-column label="上报时间" prop="reportTime" min-width="250" />
      <el-table-column label="操作" fixed="right">
        <template #default="{ row }">
          <KeenActions
            display-style="buttons"
            :actions="[
              {
                label: '下载',
                key: 'download',
                type: 'primary',
                text: true,
                disabled: !row.downPath,
                row,
              },
            ]"
            @click="handleActions"
          />
        </template>
      </el-table-column>
    </el-table>
    <KeenPagination
      :current="pagination.pageNum"
      :page-size="pagination.pageSize"
      :page-size-option="[10, 20, 50, 100]"
      :total="pagination.total"
      @size-change="handlePageSizeChange"
      @current-change="handleCurrentChange"
      v-if="pagination.total"
    />
  </el-dialog>
</template>

<script lang="ts" setup>
  import { ElMessage, ElTable as ElTableType } from 'element-plus';
  import useList from '@/hooks/list/useList';
  import { budgetApi, BudgetApi } from '@/api/index';
  import { download, urlDownload } from '@/utils/download';

  const emit = defineEmits<{
    (event: 'close', reload?: boolean, val?: any): void;
  }>();
  const visible = ref(false);
  const nameList = ref(['', '一稿', '一稿修订版', '终稿']);
  const tableRef = ref<InstanceType<typeof ElTableType>>();
  const pagination = ref({
    pageNum: 1,
    pageSize: 10,
    total: 0,
  });

  const loading = ref(false);
  const searchData = ref({});
  const dataList = ref<any[]>([]);

  const runQuery = async () => {
    try {
      loading.value = true;
      const params = {
        pageSize: pagination.value.pageSize,
        pageNum: pagination.value.pageNum,
        presentationCode: searchData.value.code,
      };
      // executorName为空是部门
      if (searchData.value.executorName) {
        params.executorName = searchData.value.budgetNode;
      } else {
        params.budgetNode = searchData.value.budgetNode;
      }
      const res = await budgetApi.financeBudgetPresentationReportLogQueryList(params).catch(() => {
        dataList.value = [];
        pagination.value.total = 0;
      });
      if (res) {
        dataList.value = res?.logBeanList || [];
        pagination.value.total = res.total as number;
      } else {
        dataList.value = [];
        pagination.value.total = 0;
      }
    } finally {
      loading.value = false;
    }
  };
  const handlePageSizeChange = (size) => {
    pagination.value.pageSize = size;
    pagination.value.pageNum = 1;
    runQuery();
  };
  const handleCurrentChange = (page) => {
    pagination.value.pageNum = page;
    runQuery();
  };
  const handleActions = async (item) => {
    const { key, row } = item;
    if (key === 'download') {
      download(row.downPath, row.draftName);
    }
  };
  // 取消
  const handleCancel = () => {
    emit('close');
  };

  const open = async (row) => {
    searchData.value = row;
    visible.value = true;
    pagination.value.pageSize = 10;
    pagination.value.pageNum = 1;
    runQuery();
  };

  defineExpose({
    open,
  });
</script>

<style scoped lang="scss"></style>
