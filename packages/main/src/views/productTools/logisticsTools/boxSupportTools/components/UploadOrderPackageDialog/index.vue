<template>
  <el-dialog :model-value="visible" @close="close(step === 2)" title="上传订单装箱" width="600">
    <div v-if="step == 1">
      <div class="mt-5 d-flex gap align-items-center">
        <KeenFileUpload
          accept=".xlsx,.xls,.csv"
          :showOperate="false"
          ref="upload"
          v-model="fileList"
          directory="product"
        >
          <el-button type="primary" size="small">上传装箱清单文件</el-button>
        </KeenFileUpload>
        <el-button style="margin-bottom: 10px" type="text" @click="getTemplate">下载模板</el-button>
      </div>
      <div>
        <h5>注意事项：</h5>
        <p>1.支持导入格式为xlsx的文件;</p>
        <p>2.模板的表头不可更改，位置不能调换，不能删除;</p>
      </div>
    </div>

    <div v-else>
      <p>装箱订单上传成功，编码为：{{ recordCode }}，</p>
      <h5>请填写自定义名称</h5>
      <p style="display: flex; align-items: center">
        <span>自定义名称：</span>
        <el-input style="width: 240px" v-model="recordName" placeholder="请输入" />
      </p>
    </div>
    <template #footer>
      <div v-if="step === 1" class="dialog-footer">
        <el-button @click="close(false)">取消</el-button>
        <el-button
          type="primary"
          @click="confirmUpload"
          :loading="loading"
          :disabled="fileList?.length === 0"
        >
          导入
        </el-button>
      </div>
      <div v-else class="dialog-footer">
        <el-button @click="close(true)">取消</el-button>
        <el-button type="primary" @click="skip2Package">去检验装箱数据</el-button>
      </div>
    </template>
  </el-dialog>
</template>

<script lang="ts" setup>
  import { erpApi } from '@/api';
  import { useCache } from '@/hooks/web/useCache';
  import { urlDownload } from '@/utils/download';
  import { ElMessage } from 'element-plus';

  const fileList = ref<any[]>([]);
  const { wsCache } = useCache('localStorage');
  const recordName = ref<string>('');
  const step = ref<number>(1);
  const loading = ref(false);
  const upload = ref(null);
  const recordCode = ref('');
  const confirmUpload = async () => {
    if (fileList.value.length && fileList.value[0].status === 'success') {
      loading.value = true;
      const res: any = await erpApi
        .luteosErpPackageUploadPackageWithOutOrder({
          fileName: fileList.value[0].name,
          ossKey: fileList.value[0].ossKey,
          creator: wsCache.get('userInfo')?.memberCode,
        })
        .finally(() => {
          loading.value = false;
        });
      ElMessage.info(
        `成功${res.succeededCount ?? 0}条，失败${res.failedCount ?? 0}条${
          (res.failedCount ?? 0) > 0 ? '，请到上传日志查看' : ''
        }`
      );
      if (upload.value) {
        (upload.value as any).clearFile();
      }
      if (res.succeededCount > 0) {
        recordCode.value = res.businessData;
        step.value = 2;
      }
    }
  };
  const emit = defineEmits<{
    (event: 'close', value: boolean): void;
  }>();
  const props = withDefaults(
    defineProps<{
      visible: boolean;
    }>(),
    {
      visible: false,
    }
  );
  const close = (flag: boolean) => {
    fileList.value = [];
    recordName.value = '';
    step.value = 1;
    emit('close', flag);
  };
  const getTemplate = async () => {
    const res = await erpApi.luteosErpPackageDownPackageTemplateWithOutOrder({});
    urlDownload(res as string);
  };
  const router = useRouter();
  const skip2Package = async () => {
    await erpApi.luteosErpPackageUpdatePalletPackageName({
      recordCode: recordCode.value,
      recordName: recordName.value,
    });
    wsCache.set('recordCode', recordCode);
    wsCache.set('packageType', 2);
    emit('close', true);
    router.push({
      path: '/boxSupportTools/combinePack',
      query: { recordCode: recordCode.value, packageType: 2, viewType: 'update' },
    });
  };
</script>

<style scoped lang="scss"></style>
