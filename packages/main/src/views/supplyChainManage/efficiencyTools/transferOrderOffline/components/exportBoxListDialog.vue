<template>
  <el-dialog title="导出装箱数据" v-model="visible">
    <el-form ref="formRef" :model="form" :rules="rules">
      <el-form-item label="调拨单号" prop="code">
        <el-input
          v-model="form.code"
          type="textarea"
          :rows="10"
          placeholder="请输入调拨单号，支持按回车换行，最多500行"
          @input="handleInput"
          :maxlength="getMaxLength"
        />
        <div class="line-count">
          <span :class="{ 'limit-reached': currentLineCount >= 500 }">
            当前行数: {{ currentLineCount }} / 500
          </span>
        </div>
      </el-form-item>
    </el-form>
    <template #footer>
      <el-button @click="cancel">取消</el-button>
      <el-button type="primary" @click="confirm">确定</el-button>
    </template>
  </el-dialog>
</template>

<script setup lang="ts">
  import { omsApi } from '@/api';
  import router from '@/router';
  import * as swal from '@/utils/swal';
  import { openWindow } from '@/utils';
  import { ElMessage } from 'element-plus';

  interface Props {}

  const props = defineProps<Props>();

  const emit = defineEmits<{
    (event: 'success'): void;
  }>();

  const visible = ref(false);

  const rules = reactive({
    code: [{ required: true, message: '请输入调拨单号', trigger: 'blur' }],
  });

  const formRef = ref();

  const form = reactive({
    code: '',
  });

  const currentLineCount = computed(() => {
    if (!form.code) return 0;
    return form.code.split('\n').length;
  });

  const getMaxLength = computed(() => {
    return 500 * 1000;
  });

  const handleInput = (value: string) => {
    const lines = value.split('\n');
    if (lines.length > 500) {
      form.code = lines.slice(0, 500).join('\n');
    }
  };

  const open = () => {
    visible.value = true;
    reset();
  };

  const close = () => {
    visible.value = false;
    reset();
  };

  defineExpose({
    open,
  });

  const reset = () => {
    form.code = '';
    formRef.value?.clearValidate();
  };

  const submit = async () => {
    if (!formRef.value) return;
    try {
      await formRef.value.validate();

      const codeList = form.code
        .trim()
        .split('\n')
        .map((line) => line.trim())
        .filter((line) => line)
        .join(',');

      const res = await omsApi.omsTransferExport({
        codeKeyWord: codeList,
        exportType: 2,
      });

      const isExportConfirm = await swal.exportConfirm();
      if (isExportConfirm) {
        await nextTick();
        const path = router.resolve({
          path: '/downloadmanage',
          query: {
            app_code: res?.appCode,
            module_code: res?.moduleCode,
            record_type: 2,
          },
        });
        openWindow(path.href);
      }

      emit('success');
      close();
    } catch (e) {
      console.error('导出装箱数据失败:', e);
      ElMessage.error('导出失败，请重试');
    }
  };

  const confirm = async () => {
    await submit();
  };

  const cancel = () => {
    close();
  };
</script>

<style scoped lang="scss">
  .line-count {
    margin-top: 8px;
    font-size: 12px;
    color: #909399;
    text-align: right;
    .limit-reached {
      color: #f56c6c;
    }
  }
</style>
