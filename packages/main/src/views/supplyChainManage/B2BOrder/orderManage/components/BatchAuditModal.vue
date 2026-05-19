<template>
  <el-dialog title="批量审核" :model-value="visible" @close="$emit('close')" align-center>
    <el-form ref="formRef" :model="form" label-width="120px" label-position="left">
      <el-form-item
        v-if="batchAuditType === 'edit'"
        label="导入文件"
        prop="file"
        :rules="[
          { required: true, message: '请上传文件', trigger: ['blur', 'change'], type: 'array' },
        ]"
      >
        <KeenFileUpload
          accept=".xlsx,.xls"
          class="packing-upload"
          v-model="form.file"
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
      </el-form-item>
      <el-form-item label="注意" v-if="batchAuditType === 'edit'">
        <div>
          <div>1、仅支持xls文件</div>
          <div>2、请根据模板字段填写</div>
        </div>
      </el-form-item>
      <el-form-item v-if="batchAuditType === 'edit'" label="说明">
        请注意标黄必填字段，未填写必填字段将上传失败
      </el-form-item>

      <el-form-item
        label="审核结果"
        prop="pass"
        :rules="[{ required: true, message: '请选择审核结果' }]"
      >
        <el-radio-group v-model="form.pass">
          <el-radio :label="true">通过</el-radio>
          <el-radio :label="false">不通过</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item
        label="拆单"
        prop="autoSubOrder"
        :rules="[{ required: true, message: '请选择拆单方式' }]"
      >
        <el-radio-group v-model="form.autoSubOrder">
          <el-radio :label="1">自动拆单</el-radio>
          <el-radio :label="0">手动拆单</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="备注" prop="remark">
        <el-input v-model="form.remark" type="textarea" :rows="6" />
      </el-form-item>
      <el-form-item label="附件">
        <KeenFileUpload
          accept=".pdf,.xlsx,.xls,.doc,.docx,.png,.jpeg,.bmp,.jpg"
          class="packing-upload"
          directory="erp/order/attachment"
          ref="uploadRef"
          v-model="fileList"
          :limit="null"
        >
          <el-button icon="plus" type="primary" size="small" />
        </KeenFileUpload>
        <div v-if="fileList.length === 0" class="ms-5 text-gray-500 fs-7">
          <span>支持上传图片/PDF/EXCEL/WORD文件</span>
        </div>
      </el-form-item>
    </el-form>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="emit('close')">取消</el-button>
        <el-button type="primary" :loading="loading" @click="handleConfirm">确认</el-button>
      </span>
    </template>
  </el-dialog>
</template>

<script setup lang="ts">
  import { ElMessage, FormInstance } from 'element-plus';
  import { erpApi } from '@/api';
  import { urlDownload } from '@/utils/download';
  import { openWindow } from '@/utils';

  const props = defineProps<{
    visible: boolean;
    orderCodeList?: string[];
    params?: any;
    batchAuditType?: string;
  }>();

  const emit = defineEmits<{
    (event: 'close', reload?: boolean): void;
    (event: 'timeOut'): void;
  }>();

  const formRef = ref<FormInstance>();
  const form = ref({
    pass: true,
    autoSubOrder: 1,
    orderCodeList: props.orderCodeList,
    remark: '',
    attachmentInfoList: [],
    file: [],
  });

  watch(
    () => form.value.file,
    () => {
      formRef.value?.validateField('file');
    }
  );

  const fileList = ref([]);
  const loading = ref(false);

  const downloadLoading = ref(false);
  const downloadTemplate = async () => {
    downloadLoading.value = true;
    const res = await erpApi
      .luteosErpOrderDownUpdateAuthTemplate({ codeList: props.orderCodeList, ...props.params })
      .finally(() => {
        downloadLoading.value = false;
      });
    urlDownload(res as string);
  };

  const router = useRouter();
  const handleConfirm = async () => {
    const valid = await formRef.value?.validate().catch(() => {
      return false; // 校验失败返回 false，不继续执行
    });
    if (!valid) return;
    try {
      loading.value = true;
      if (fileList.value.length > 0) {
        form.value.orderAttachmentList = fileList.value.map((item) => {
          return {
            fileUrl: item.ossKey,
            fileName: item.name,
          };
        });
      }
      if (props.batchAuditType === 'edit') {
        console.log('form.value.file', form.value.file);
        form.value.fileName = form.value.file[0].name;
        form.value.ossKey = form.value.file[0].ossKey;
        await erpApi.luteosErpOrderUpdateAuthBatch(form.value);
        ElMessage.success('审核成功');
        emit('close', true);
        setTimeout(() => {
          const path = router.resolve({
            name: 'salesForecastingLog',
          });
          openWindow(path.href);
        }, 1000);
      } else {
        const res = await erpApi.luteosErpOrderBatchUpdate(form.value);
        if (res?.failList.length > 0) {
          const content = res.failList
            .map((item) => {
              return `订单号：${item.orderCode}，失败原因：${item.message}`;
            })
            ?.join('\n');
          ElMessage.error(content);
        } else {
          ElMessage.success('审核成功');
          emit('close', true);
        }
      }
    } finally {
      loading.value = false;
      emit('timeOut');
    }
  };
</script>

<style scoped lang="scss"></style>
