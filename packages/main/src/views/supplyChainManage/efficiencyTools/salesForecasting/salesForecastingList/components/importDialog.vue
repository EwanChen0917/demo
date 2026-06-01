<template>
  <el-dialog title="上传更新" v-model="visibility" width="600px" :before-close="close">
    <div class="import-container">
      <p>
        <KeenFileUpload
          accept=".xlsx,.xls"
          class="packing-upload"
          v-model="file"
          directory="erp/template"
          ref="uploadRef"
        >
          <el-button type="primary" size="small">选择文件</el-button>
          <el-button size="small" type="primary" link @click.stop="downloadTemplate">
            下载模板
          </el-button>
        </KeenFileUpload>
      </p>
      <div class="notice">
        <div class="label">注意：</div>
        <div class="value">
          <ul>
            <li>1、仅支持xls文件</li>
            <li>2、请根据模板字段填写</li>
          </ul>
        </div>
      </div>
      <div class="notice">
        <div class="label">说明：</div>
        <div class="value">
          <ul>
            <li>上传用于生成需求建议，请认真检查文件数据</li>
          </ul>
        </div>
      </div>
    </div>

    <template #footer>
      <span>
        <el-button @click="close">取消</el-button>
        <el-button type="primary" :disabled="!file.length" @click="checkOperator">确定</el-button>
      </span>
    </template>
  </el-dialog>
  <el-dialog v-model="confirmVisible" title="确认更新">
    <div>预测更新文件中包含非本人运营的产品，确认要更新吗</div>
    <div class="p-5">
      <el-tooltip placement="top">
        <template #content>
          <div v-for="(item, index) in operatorList" :key="index">{{ item }}</div>
        </template>
        <span class="cursor-pointer text-primary">运营人</span>
      </el-tooltip>
    </div>
    <template #footer>
      <span>
        <el-button @click="confirmVisible = false">取消</el-button>
        <el-button type="primary" @click="confirmUpload">确定</el-button>
      </span>
    </template>
  </el-dialog>
</template>

<script setup lang="ts">
  import { erpApi } from '@/api';
  import { ElMessage } from 'element-plus';
  import { openWindow } from '@/utils';
  import * as swal from '@/utils/swal';
  import axios from 'axios';
  import { useStore } from '@/store/modules/useStore';

  const props = defineProps<{
    searchParams: any;
  }>();
  const router = useRouter();
  const file = ref<any[]>([]);
  const visibility = ref(false);
  const user = useStore();
  const forecastType = ref();

  const downloadTemplate = async () => {
    const res = await erpApi.luteosErpSaleForecastV2DownTemplate({
      neStatus: 1,
      ...props.searchParams,
    });
    const isConfirmed = await swal.confirm({
      title: '下载中，请前往下载任务中心查看。',
      icon: 'success',
      confirmButtonText: '去查看',
      cancelButtonText: '知道了',
      customClass: {
        confirmButton: 'btn btn-success',
        cancelButton: 'btn btn-active-light',
      },
    });
    if (!isConfirmed) return;
    openWindow('/downloadmanage');
  };
  const uploadRef = ref();
  const emits = defineEmits<{
    (success: string);
  }>();

  const confirmVisible = ref(false);
  const operatorList = ref([]);
  const checkOperator = async () => {
    // 检验运营人
    const res = await erpApi.luteosErpSaleForecastV2UploadCheckOperator({
      fileName: file.value[0].name,
      ossKey: file.value[0].ossKey,
      type: forecastType.value,
    });
    // 存在其他运营人
    if (res?.length) {
      console.log(file.value);
      confirmVisible.value = true;
      operatorList.value = res;
    } else confirmUpload();
  };

  const confirmUpload = async () => {
    await erpApi.luteosErpSaleForecastV2Upload({
      fileName: file.value[0].name,
      ossKey: file.value[0].ossKey,
      type: forecastType.value,
    });
    file.value = [];
    emits('success');
    close();
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
      confirmVisible.value = false;
      close();
    }
  };

  const open = (type) => {
    forecastType.value = type;
    visibility.value = true;
  };
  const close = () => {
    uploadRef.value?.uploadRef.clearFiles();
    visibility.value = false;
  };
  defineExpose({ open });
</script>

<style scoped lang="scss">
  .notice {
    display: flex;
    margin-top: 20px;
    color: #888c94;
    font-size: 12px;

    .value {
      flex: 1;
      margin-left: 10px;
    }

    ul {
      list-style: none;
      margin: 0;
      padding: 0;
    }
  }
</style>
