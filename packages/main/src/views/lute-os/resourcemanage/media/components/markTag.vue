<template>
  <el-dialog title="标记媒体资源" :model-value="visible" @close="$emit('close')" align-center>
    <el-form :model="form" ref="formRef" label-width="150px">
      <el-form-item prop="mediaType" label="标记媒体类型">
        <el-select
          v-model="form.mediaType"
          placeholder="请选择媒体类型"
          clearable
          filterable
          style="width: 400px"
        >
          <el-option
            v-for="item in dictMap.media_type"
            :key="item.value"
            :label="item.desc"
            :value="item.value"
          />
        </el-select>
      </el-form-item>
      <el-form-item prop="contentType" label="标记内容类型">
        <el-select
          v-model="form.contentType"
          placeholder="请选择内容类型"
          clearable
          filterable
          style="width: 400px"
        >
          <el-option
            v-for="item in dictMap.content_type"
            :key="item.value"
            :label="item.desc"
            :value="item.value"
          />
        </el-select>
      </el-form-item>
      <el-form-item prop="keywords" label="标记媒体关键词">
        <el-input v-model="form.keywords" clearable />
      </el-form-item>
    </el-form>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="handleFormCancel">取消</el-button>
        <el-button
          :disabled="isDisabledBtn"
          type="primary"
          @click="handleFormSubmit"
          :loading="saveLoading"
        >
          保存
        </el-button>
      </span>
    </template>
  </el-dialog>
</template>

<script lang="ts" setup>
  import { ElMessage, FormInstance } from 'element-plus';
  import { mediaApi } from '@/api';

  const props = defineProps<{
    visible: boolean;
    dictMap: Object;
    info: Object;
  }>();

  // 表单定义
  const formRef = ref<FormInstance>();
  const form = ref({
    mediaCode: '',
    mediaType: '',
    keywords: '',
    contentType: '',
  });

  form.value = { ...props.info };

  const emit = defineEmits<{
    (event: 'close', reload?: boolean): void;
  }>();
  const isDisabledBtn = computed(() => {
    return !form.value.mediaType && !form.value.contentType && form.value.keywords === '';
  });

  // 提交操作
  const saveLoading = ref(false);
  const handleFormSubmit = async () => {
    const valid = await formRef.value?.validate().catch(() => {
      return false; // 校验失败返回 false，不继续执行
    });
    if (valid) {
      await mediaApi.luteosMediaOperateMedia({ ...form.value, operateType: 3 });
      ElMessage.success('标记成功');
      emit('close', true);
    }
  };

  // 取消操作
  const handleFormCancel = async () => {
    emit('close');
  };
</script>

<style scoped lang="scss">
  .dialog-footer {
    :deep(.el-button) {
      margin-right: 10px;
    }
  }
</style>
