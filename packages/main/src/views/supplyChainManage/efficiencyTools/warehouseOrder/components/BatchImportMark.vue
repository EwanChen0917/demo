<template>
  <el-dialog
    title="批量导入箱唛"
    v-model="visible"
    width="600px"
    :close-on-click-modal="false"
    :before-close="close"
  >
    <div class="import-container">
      <div class="mb-2">箱唛类型:</div>
      <el-select v-model="shippingMarkType" class="mb-2">
        <el-option label="WM-CA" value="WM-CA" />
        <el-option label="WM-US" value="WM-US" />
      </el-select>
      <KeenFileUpload
        accept=".pdf"
        class="packing-upload"
        v-model="fileList"
        directory="erp/template"
        :limit="null"
        multiple
        validSameFile
        :existedFiles="existedFiles"
        ref="uploadRef"
      >
        <el-button type="primary" size="small">选择文件</el-button>
      </KeenFileUpload>
      <div class="notice">
        <div>导入说明:</div>
        <ul>
          <li>仅支持pdf文件</li>
          <li>单个文件小于1M</li>
          <li>WM-CA根据标签 PO 和 WALMART ITEM 自动上传; WM-US根据标签 WALMART ITEM 自动上传</li>
        </ul>
      </div>
    </div>

    <template #footer>
      <span>
        <el-button @click="close">取消</el-button>
        <el-button type="primary" :disabled="!fileList.length" @click="confirm" :loading="loading">
          确定
        </el-button>
      </span>
    </template>
  </el-dialog>
</template>

<script setup lang="ts">
  import { ElMessage } from 'element-plus';
  import { erpApi } from '@/api';

  const shippingMarkType = ref('WM-CA');
  const route = useRoute();
  const code = route.query.code || '';
  const fileList = ref<any[]>([]);
  const existedFiles = ref();
  const visible = ref(false);
  const uploadRef = ref();
  const loading = ref(false);

  const emit = defineEmits<{
    (event: 'success', data: any[]): void;
  }>();

  const confirm = async () => {
    try {
      const chunkSize = 10;
      const total = fileList.value.length;
      // 按10个文件一组发起请求
      const requestList: Promise<any>[] = [];
      loading.value = true;
      for (let i = 0; i < total; i += chunkSize) {
        const chunk = fileList.value.slice(i, i + chunkSize);
        const params = {
          code: code as string,
          shippingMarkType: shippingMarkType.value,
          shippingMarkList: chunk.map((file) => ({
            fileName: file.name,
            fileUrl: file.ossKey,
            ossKey: file.ossKey,
          })),
        };
        requestList.push(erpApi.luteosErpWarehouseOrderShippingMarkParse(params));
      }
      const resList = await Promise.all(requestList);
      loading.value = false;
      const markFiles = resList.reduce((acc, cur) => {
        if (Array.isArray(cur?.result)) {
          acc = acc.concat(cur.result);
        } else if (cur?.result) {
          acc.push(cur.result);
        }
        return acc;
      }, []);
      const successFiles = markFiles.filter((item) => !item.errorMsg && item.ssc);
      ElMessage.info(
        `成功${successFiles.length ?? 0}条，失败${markFiles.length - successFiles.length}条`
      );
      emit('success', successFiles);
      close();
    } catch (error) {
      console.error('上传失败:', error);
    }
  };
  const open = (params) => {
    visible.value = true;
    existedFiles.value = params;
  };
  const close = () => {
    uploadRef.value?.uploadRef.clearFiles();
    visible.value = false;
  };
  defineExpose({ open });
</script>

<style scoped lang="scss">
  .notice {
    ul {
      color: var(---N9, #1f1f1f);
      list-style: decimal;
      padding-left: 16px;
      font-size: 12px;
      li {
        line-height: 20px;
        color: var(---N8, #666);
      }
    }
  }
</style>
