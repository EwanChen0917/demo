<template>
  <el-dialog title="上传装托文件" :destroy-on-close="true" v-model="visible" align-center>
    <div>请按照模板上传文件</div>
    <div class="mt-5 d-flex gap-5 align-items-center">
      <KeenFileUpload
        accept=".xlsx,.xls,.csv"
        :showOperate="false"
        ref="upload"
        v-model="fileList"
        directory="product"
      >
        <el-button type="primary" size="small">选择文件</el-button>
      </KeenFileUpload>
      <el-button style="margin-bottom: 10px" type="text" @click="getTemplate">下载模板</el-button>
    </div>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="visible = false">取消</el-button>
        <el-button
          type="primary"
          @click="confirmUpload"
          :loading="loading"
          :disabled="fileList?.length === 0"
        >
          导入
        </el-button>
      </span>
    </template>
  </el-dialog>
</template>

<script setup lang="ts">
  import { erpApi } from '@/api';
  import { urlDownload } from '@/utils/download';
  import { useCache } from '@/hooks/web/useCache';
  import { ElMessage } from 'element-plus';

  const emit = defineEmits<{
    (event: 'close', reload?: boolean): void;
    (event: 'getCustomTemplate'): void;
    (event: 'customUpload', fileList: any[]): void;
  }>();

  const visible = ref(false);
  /**
   * 打开弹窗
   */
  const open = () => {
    visible.value = true;
  };

  const fileList = ref<any[]>([]);
  const loading = ref(false);
  const { wsCache } = useCache('localStorage');
  const route = useRoute();
  const confirmUpload = async () => {
    if (fileList.value.length && fileList.value[0].status === 'success') {
      loading.value = true;
      const res = await erpApi
        .luteosErpPackageUploadPalletOrder({
          recordCode: route.query.recordCode ?? wsCache.get('recordCode') ?? '',
          packageType: route.query.packageType ?? wsCache.get('packageType') ?? 1,
          fileName: fileList.value[0].name,
          ossKey: fileList.value[0].ossKey,
        })
        .finally(() => {
          loading.value = false;
        });
      ElMessage.info(
        `成功${res.succeededCount}条，失败${res.failedCount ?? 0}条${
          (res.failedCount ?? 0) > 0 ? '，请到上传日志查看' : ''
        }`
      );
      emit('close', true);
    } else {
      ElMessage.error('请先选择文件');
    }
  };
  const getTemplate = async () => {
    const res = await erpApi.luteosErpPackageDownLoadPalletTemplate({
      packageType: route.query.packageType ?? wsCache.get('packageType') ?? 1,
      recordCode: route.query.recordCode ?? wsCache.get('recordCode') ?? '',
    });
    return urlDownload(res as string);
  };
  defineExpose({
    open,
  });
</script>

<style scoped lang="scss"></style>
