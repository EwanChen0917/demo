<template>
  <el-dialog title="新增品牌" :model-value="visible" @close="$emit('close')">
    <el-form ref="formRef" :model="form" :rules="rules" label-position="top">
      <el-form-item label="品牌名称" prop="brandName" required>
        <el-input v-model="form.brandName" />
      </el-form-item>
      <el-form-item label="英文名称" prop="brandNameEn">
        <el-input v-model="form.brandNameEn" />
      </el-form-item>
      <el-form-item label="品牌logo" prop="brandLogo">
        <el-upload
          ref="upload"
          :action="addressOss"
          list-type="picture-card"
          :data="dataOss"
          :auto-upload="false"
          limit="1"
          :on-change="fileChange"
          :on-remove="fileRemove"
          :on-success="handleSuccess"
          :on-error="handleError"
          accept=".pdf,.png,.jpeg,.bmp,.jpg"
        >
          <el-icon><Plus /></el-icon>
        </el-upload>
      </el-form-item>
      <el-form-item label="描述" prop="brandDesc">
        <el-input
          v-model="form.brandDesc"
          type="textarea"
          maxlength="50"
          placeholder="请输入描述(50字以内)"
        />
      </el-form-item>
    </el-form>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="handleFormCancel">取消</el-button>
        <el-button type="primary" @click="handleFormSubmit" :loading="saveLoading">保存</el-button>
      </span>
      <br />
    </template>
  </el-dialog>
</template>

<script lang="ts" setup>
  import { ElMessage } from 'element-plus';
  import type { FormInstance, FormRules } from 'element-plus';
  import { Delete, Download, Plus, ZoomIn } from '@element-plus/icons-vue';
  import { productApi, ProductApi, ProductContracts, platformApi } from '@/api/index';

  const props = defineProps<{
    visible: boolean;
  }>();
  const emit = defineEmits<{
    (event: 'close', reload?: boolean): void;
  }>();

  // 表单定义
  const formRef = ref<FormInstance>();
  const form = reactive<ProductApi.LuteosProductBrandSaveOrUpdateBrand.RequestBody>({
    brandName: '',
    brandNameEn: '',
    brandDesc: '',
    brandLogo: '',
  });
  const rules = reactive<FormRules>({
    brandName: [
      {
        required: true,
        message: '请填写品牌名称',
        trigger: ['blur', 'change'],
      },
    ],
    brandLogo: [
      {
        required: true,
        message: '请选择品牌logo',
        trigger: 'change',
      },
    ],
  });

  const upload = ref();
  const addressOss = ref<string>('');
  const dataOss = reactive({});
  const ossKey = ref<string>('');

  // 提交操作
  const saveLoading = ref(false);
  const handleFormSubmit = async () => {
    if (!formRef.value) return;

    const valid = await formRef.value?.validate().catch(() => {
      return false; // 校验失败返回 false，不继续执行
    });
    if (valid) {
      try {
        saveLoading.value = true;
        const res = await platformApi.platformOssQueryOssTempPolicy({
          directory: 'product/brand',
          filename: form.brandLogo.name,
        });
        addressOss.value = res.host || '';
        ossKey.value = res.key || '';
        dataOss.key = res.key || '';
        dataOss.policy = res.policy || '';
        dataOss.signature = res.signature || '';
        dataOss.ossAccessKeyId = res.ossAccessKeyId || '';
        upload.value.submit();
        console.log('res', dataOss);
      } catch (e) {
        saveLoading.value = false;
      }
    }
  };
  // 图片上传成功
  const handleSuccess = async () => {
    console.log('handleSuccess');
    const { brandName, brandNameEn, brandDesc } = form;

    await productApi.luteosProductBrandSaveOrUpdateBrand({
      brandName,
      brandNameEn,
      brandDesc,
      brandLogo: ossKey.value,
    });

    // FIXME 修改交互
    ElMessage.success({
      message: '创建成功',
      duration: 5 * 1000,
    });
    saveLoading.value = false;
    // 关闭
    emit('close', true);
  };
  // 图片上传失败
  const handleError = (res) => {
    console.log('handleError', res);
    ElMessage.error({
      message: '图片上传失败',
      duration: 5 * 1000,
    });
    saveLoading.value = false;
  };
  // 取消操作
  const handleFormCancel = () => {
    if (!formRef.value) return;

    formRef.value.resetFields();
    emit('close');
  };

  const fileChange = (file, fileList) => {
    if (file) {
      // console.log(file, fileList)
      form.brandLogo = file;
      formRef.value.validateField('brandLogo');
    }
  };
  const fileRemove = () => {
    form.brandLogo = '';
    formRef.value.validateField('brandLogo');
  };
</script>
