<template>
  <el-dialog :title="bomInfo.title" :model-value="visible" @close="handleClose">
    <el-form
      :model="form"
      ref="formRef"
      class="form-data"
      label-width="120px"
      label-position="left"
      scroll-to-error
    >
      <el-form-item
        :label="bomInfo.subtitle"
        prop="propertyName"
        :rules="[{ required: true, message: '请输入', trigger: ['blur', 'change'] }]"
      >
        <el-input v-model="form.propertyName" placeholder="请输入" maxlength="100" />
      </el-form-item>

      <el-form-item prop="imageKey" label="上传图片">
        <KeenImageUpload v-model="form.imageKey" directory="sop/template" />
      </el-form-item>

      <el-form-item prop="fileList" label="附件">
        <KeenFileUpload
          ref="upload"
          v-model="fileList"
          directory="sop/template"
          limit="1"
          :showOperate="true"
          class="file-upload"
          :isValidateFileName="true"
        >
          <el-button type="primary" size="small">点击上传附件</el-button>
        </KeenFileUpload>
      </el-form-item>
    </el-form>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="handleClose">取消</el-button>
        <el-button type="primary" @click="submitFn" :loading="saveLoading">保存</el-button>
      </span>
      <br />
    </template>
  </el-dialog>
</template>

<script setup lang="ts">
  import { ref } from 'vue';
  import { sopApi } from '@/api/index';
  import { ElMessage } from 'element-plus';

  const props = withDefaults(
    defineProps<{
      visible: boolean;
      bomInfo: Object;
    }>(),
    {
      visible: false,
    }
  );

  const formRef = ref();
  const form: any = ref({
    fileList: '',
    propertyName: '',
    imageKey: '',
  });
  const fileList = ref([]);

  const saveLoading = ref(false);
  const submitFn = () => {
    formRef.value
      ?.validate(async (isValid) => {
        if (isValid) {
          saveLoading.value = true;
          // 设置文件信息
          if (fileList.value?.length) {
            fileList.value.forEach((file: any) => {
              const fileName = file.name.split('.')[0];
              form.value.attachmentName = fileName.substring(0, 500);
              form.value.attachmentKey = file.ossKey;
            });
          }
          const data = {
            ...form.value,
            ...props.bomInfo,
          };
          delete data.fileList;
          delete data.title;
          delete data.subtitle;
          const res: any = await sopApi
            .luteosSopOperateMaterialProperty({
              materialProperty: data,
              operateType: 'save',
            })
            .finally(() => {
              saveLoading.value = false;
            });

          ElMessage.success('保存成功');
          emit('closeModal', 'reload');
        }
      })
      .catch(() => false);
  };

  const emit = defineEmits<{
    (event: 'closeModal', r?: 'reload', val?: any): void;
  }>();

  const handleClose = () => {
    formRef.value.resetFields();
    emit('closeModal');
  };
</script>

<style lang="scss" scoped></style>
