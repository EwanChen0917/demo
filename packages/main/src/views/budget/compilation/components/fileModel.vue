<template>
  <el-dialog width="900px" title="附件列表" v-model="visible" @close="visible = false" align-center>
    <div class="upload-box" v-if="operatorType == 1 && isShare !== 1">
      <KeenFileUpload
        v-model="receiptFileList"
        :showFileList="false"
        :limit="100"
        :multiple="true"
        accept=".pdf,.xlsx,.xls,.doc,.docx,.png,.jpeg,.bmp,.jpg,.zip"
        :showOperate="false"
        @success="handleUploadSuccess"
        directory="erp/budget"
        ref="uploadRef"
      >
        <el-button type="primary" class="me-4 mb-4">上传</el-button>
      </KeenFileUpload>
    </div>
    <el-table ref="tableRef" :data="listData" row-key="uniqueCode" class-name="table-row-dashed">
      <el-table-column prop="fileName" label="文件名" min-width="200px" />
      <el-table-column prop="fileType" label="文件类型" min-width="100px" />
      <el-table-column prop="creatorName" label="创建人" min-width="120px" />
      <el-table-column prop="uploadTime" label="上传时间" min-width="150px" />
      <el-table-column label="操作" fixed="right" min-width="120">
        <template #default="{ row }">
          <KeenActions
            display-style="buttons"
            :actions="[
              {
                label: '下载',
                key: 'download',
                type: 'primary',
                row: row,
              },
              {
                label: '删除',
                key: 'delete',
                type: 'danger',
                hide: operatorType !== 1 || isShare == 1,
                row: row,
              },
            ]"
            @click="handleActions"
          />
        </template>
      </el-table-column>
    </el-table>
  </el-dialog>
</template>

<script setup lang="ts">
  import useList from '@/hooks/list/useList';
  import { ElMessage } from 'element-plus';
  import { budgetApi, BudgetApi, platformApi } from '@/api/index';
  import * as swal from '@/utils/swal';
  import { download, urlDownload } from '@/utils/download';

  const visible = ref(false);
  const receiptFileList = ref([]);
  const listData = ref([]);
  const tableRef = ref();
  // 上传
  const update = ref(true);
  const uploadRef = ref();
  const handleUploadSuccess = async (key) => {
    if (key && update.value) {
      update.value = false;
      const receiptKeyList = receiptFileList.value.map((item) => {
        return {
          fileName: item.name,
          ossKey: item.ossKey,
          fileType: item.suffix,
          fileSize: item.size,
        };
      });
      const param = {
        businessCode: businessCode.value,
        attachmentUploadItemList: receiptKeyList,
      };
      const res = await budgetApi.financeBudgetAttachmentBatchUpload(param);
      ElMessage.success('上传成功');
      uploadRef.value?.uploadRef.clearFiles();
      getDataList();
      setTimeout(() => {
        update.value = true;
      }, 1000);
      // refreshList();
    }
  };
  // 表格操作
  const handleActions = async (item) => {
    const { key, row } = item;
    if (key === 'download') {
      const res = await platformApi.platformQueryUrl({ ossKey: row.downloadUrl });
      console.log(res);
      if (res) {
        download(res.url, row.fileName);
      } else {
        ElMessage.error(`文件异常，无法下载`);
      }
    } else if (key === 'delete') {
      // 删除
      const isConfirmed = await swal.confirm('确定要删除吗？');
      if (!isConfirmed) return;
      const res = await budgetApi.financeBudgetAttachmentDelete({
        id: row.id,
      });
      if (res) {
        ElMessage.success('删除成功');
        getDataList();
      } else {
        ElMessage.error('删除失败，请稍后再试');
      }
    }
  };
  const operatorType = ref(1);
  const businessCode = ref('');
  const isShare = ref(0);
  // 列表
  const getDataList = async () => {
    const res = await budgetApi.financeBudgetAttachmentList({
      businessCode: businessCode.value,
    });
    listData.value = res.recordList;
  };
  const open = (type, code, share) => {
    businessCode.value = code;
    isShare.value = share;
    getDataList();
    if (type == 'list') {
      operatorType.value = 1;
    } else {
      operatorType.value = 2;
    }
    visible.value = true;
  };

  defineExpose({
    open,
  });
</script>

<style scoped lang="scss">
  .upload-box {
    width: 70px;
    display: inline-block;
    vertical-align: bottom;
  }
</style>
