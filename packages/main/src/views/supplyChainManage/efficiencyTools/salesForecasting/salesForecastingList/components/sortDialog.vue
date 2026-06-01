<template>
  <el-dialog title="上传更新" v-model="visibility" width="600px" :before-close="close">
    <div class="import-container">
      <el-form :model="form" ref="formRef" label-position="left" label-width="60px">
        <el-form-item label="渠道" prop="channel" :rules="rules.channel">
          <el-select
            style="width: 160px"
            v-model="form.channel"
            placeholder="请选择渠道"
            filterable
            clearable
            :teleported="false"
          >
            <el-option
              v-for="person of channelList"
              :key="person.value"
              :label="person.desc"
              :value="person.value"
            />
          </el-select>
        </el-form-item>
      </el-form>
      <p>
        <KeenFileUpload
          accept=".xlsx,.xls"
          class="packing-upload"
          v-model="file"
          directory="erp/template"
          ref="uploadRef"
        >
          <el-button type="primary" size="small">选择文件</el-button>
          <el-button
            :loading="downloadLoading"
            size="small"
            type="primary"
            link
            @click.stop="downloadTemplate"
          >
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
            <li>请注意标黄必填字段，未填写必填字段将上传失败</li>
          </ul>
        </div>
      </div>
    </div>

    <template #footer>
      <span>
        <el-button @click="close">取消</el-button>
        <el-button type="primary" :disabled="!file.length" @click="confirmUpload">确定</el-button>
      </span>
    </template>
  </el-dialog>
</template>

<script setup lang="ts">
  import { ref } from 'vue';
  import { erpApi } from '@/api';
  import { ElMessage, ElSelect } from 'element-plus';
  import * as swal from '@/utils/swal';
  import axios from 'axios';
  import { useStore } from '@/store/modules/useStore';
  import { openWindow } from '@/utils';

  const props = defineProps<{
    type: 1 | 2;
    channelList: string[];
    downloadParams?: any;
  }>();

  const form = ref({
    channel: '',
  });
  const formRef = ref();

  const rules = reactive({
    channel: [
      {
        required: true,
        message: '请选择渠道',
        trigger: 'change',
      },
    ],
  });

  const downloadLoading = ref(false);
  const file = ref<any[]>([]);
  const visibility = ref(false);

  const user = useStore();
  const downloadTemplate = async () => {
    const isValidate = await formRef.value?.validate().catch(() => {
      return false; // 校验失败返回 false，不继续执行
    });
    if (!isValidate) return;
    downloadLoading.value = true;
    try {
      const res = await erpApi.luteosErpSaleForecastV2DownTemplate({
        channel: form.value.channel,
        downloadSort: 1,
        type: props.type,
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
    } finally {
      downloadLoading.value = false;
    }
  };

  const uploadRef = ref();
  const emits = defineEmits<{
    (success: string);
  }>();
  const confirmUpload = async () => {
    await erpApi.luteosErpSaleForecastV2UploadSort({
      fileName: file.value[0].name,
      ossKey: file.value[0].ossKey,
      type: props.type, // 预测类型 1-按产品SKU预测 2-按在线商品预测
    });
    file.value = [];
    emits('success');
    close();
  };
  const open = () => {
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
