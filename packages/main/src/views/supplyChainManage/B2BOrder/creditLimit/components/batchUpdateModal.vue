<template>
  <el-dialog :title="title" :model-value="visible" @close="$emit('close')" align-center>
    <div>{{ isImport ? '请按照模板上传文件' : '请选择导出信息' }}</div>
    <el-radio-group v-model="sceneIndex">
      <div
        class="mt-3 d-flex gap-5 align-items-center w-100"
        v-for="(item, index) in sceneList"
        :key="item.importScene"
        :style="sceneIndex !== index ? 'margin-bottom: 10px' : ''"
      >
        <KeenFileUpload
          ref="upload"
          v-model="item.fileList"
          directory="product"
          v-if="isImport && index === sceneIndex"
        >
          <el-radio :label="index" class="w-350px">{{ item.desc }}</el-radio>
          <el-button type="primary" size="small">选择文件</el-button>
        </KeenFileUpload>
        <el-button
          style="margin-bottom: 10px"
          type="text"
          @click="getTemplate(item.importScene)"
          v-if="isImport && index === sceneIndex"
        >
          下载模板
        </el-button>
        <el-radio v-else :label="index" class="w-50">{{ index + 1 }}.{{ item.desc }}</el-radio>
      </div>
    </el-radio-group>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="emit('close')">取消</el-button>
        <el-button
          type="primary"
          @click="confirmUpload"
          :loading="loading"
          :disabled="sceneList[sceneIndex]?.fileList?.length === 0"
          v-if="isImport"
        >
          确认
        </el-button>
        <el-button v-else type="primary" @click="emit('export', sceneList[sceneIndex]?.exportType)">
          导出
        </el-button>
      </span>
    </template>
  </el-dialog>
</template>

<script setup lang="ts">
  import { erpApi } from '@/api';
  import { urlDownload } from '@/utils/download';
  import { ElMessage } from 'element-plus';
  import { checkPermission } from '@/utils/permission';
  import { openWindow } from '@/utils';
  import * as swal from '@/utils/swal';

  const props = defineProps<{
    visible: boolean;
    title: string;
    type: string;
  }>();
  const emit = defineEmits<{
    (event: 'close', reload?: boolean): void;
    (event: 'export', exportType: number);
  }>();

  const isImport = computed(() => {
    return props.type === 'import';
  });

  const sceneIndex = ref<number>(0);

  const sceneList = ref([]);

  if (isImport.value) {
    if (checkPermission('creditAdd')) {
      sceneList.value.push({
        desc: '新增客户信用额度',
        importScene: 'customer_credit_limit_import',
        fileList: [],
      });
    }
    // if (checkPermission('importVoc')) {
    //   sceneList.value.push({
    //     desc: '导入VOC型号',
    //     importScene: 'product_spu_voc_import',
    //     fileList: [],
    //   });
    // }
  }

  const fileList = ref<any[]>([]);
  const loading = ref(false);
  const confirmUpload = async () => {
    fileList.value = sceneList.value[sceneIndex.value].fileList;
    if (fileList.value.length && fileList.value[0].status === 'success') {
      loading.value = true;
      // const res = await commonApi
      //   .luteosCommonFileImportData({
      const res = await erpApi
        .luteosErpCustomerCreditLimitImportCustomerCreditList({
          importScene: sceneList.value[sceneIndex.value].importScene,
          fileName: fileList.value[0].name,
          ossKey: fileList.value[0].ossKey,
        })
        .finally(() => {
          loading.value = false;
        });
      // ElMessage.info(
      //   `成功${res.succeededCount}条，失败${res.failedCount}条${
      //     res.failedCount > 0 ? '，请到上传日志查看' : ''
      //   }`
      // );
      emit('close', true);
      const isConfirmed = await swal.confirm({
        title: '上传成功，是否去查看上传日志?',
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
    } else {
      ElMessage.error('请先选择文件');
    }
  };
  const getTemplate = async (scene) => {
    // const res = await commonApi.luteosCommonFileQueryImportTemplate({
    const res = await erpApi.luteosErpCustomerCreditLimitDownCreditLimitTemplate().finally(() => {
      // downloadLoading.value = false;
    });
    urlDownload(res as string);
  };
</script>

<style scoped lang="scss"></style>
