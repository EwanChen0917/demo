<template>
  <el-dialog
    v-model="dialogVisible"
    title="修改收件人信息"
    width="900px"
    :close-on-click-modal="false"
    :close-on-press-escape="false"
    destroy-on-close
  >
    <el-form ref="formRef" :model="form" :rules="rules" label-width="120px" class="location-form">
      <el-row>
        <el-col :span="12">
          <el-form-item label="收件人姓名" prop="receiverName">
            <el-input
              v-model="form.receiverName"
              placeholder="请输入"
              clearable
              maxlength="100"
              show-word-limit
            />
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="邮箱" prop="receiverPhone">
            <el-input
              v-model="form.receiverPhone"
              placeholder="请输入"
              clearable
              maxlength="50"
              show-word-limit
            />
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="12">
          <el-form-item label="邮编" prop="receiverAddressPostCode">
            <el-input
              v-model="form.receiverAddressPostCode"
              placeholder="请输入"
              clearable
              maxlength="50"
              show-word-limit
            />
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="收件人电话" prop="receiverPhone">
            <el-input
              v-model="form.receiverPhone"
              placeholder="请输入"
              clearable
              maxlength="50"
              show-word-limit
            />
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="12">
          <el-form-item label="收件人手机" prop="receiverMobilePhone">
            <el-input
              v-model="form.receiverMobilePhone"
              placeholder="请输入"
              clearable
              maxlength="50"
              show-word-limit
            />
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="国家/地区" prop="receiverAddressCountry">
            <CountrySelect v-model="form.receiverAddressCountry" />
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="12">
          <el-form-item label="省/州" prop="receiverAddressState">
            <el-input
              v-model="form.receiverAddressState"
              placeholder="请输入"
              clearable
              maxlength="50"
              show-word-limit
            />
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="城市" prop="receiverAddressCity">
            <el-input
              v-model="form.receiverAddressCity"
              placeholder="请输入"
              clearable
              maxlength="50"
              show-word-limit
            />
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="12">
          <el-form-item label="区/县" prop="receiverAddressArea">
            <el-input
              v-model="form.receiverAddressArea"
              placeholder="请输入"
              clearable
              maxlength="50"
              show-word-limit
            />
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="街道" prop="receiverAddressStreet">
            <el-input
              v-model="form.receiverAddressStreet"
              placeholder="请输入"
              clearable
              maxlength="50"
              show-word-limit
            />
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="12">
          <el-form-item label="门牌号" prop="receiverAddressHouseNumber">
            <el-input
              v-model="form.receiverAddressHouseNumber"
              placeholder="请输入"
              clearable
              maxlength="30"
              show-word-limit
            />
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="24">
          <el-form-item label="详细地址" prop="receiverAddressDetail1">
            <el-input
              v-model="form.receiverAddressDetail1"
              placeholder="请输入"
              clearable
              maxlength="500"
              type="textarea"
              :rows="3"
              show-word-limit
            />
          </el-form-item>
        </el-col>
      </el-row>
    </el-form>

    <template #footer>
      <div class="dialog-footer">
        <el-button @click="handleCancel">取消</el-button>
        <el-button type="primary" @click="handleSubmit" :loading="submitLoading">确定</el-button>
      </div>
    </template>
  </el-dialog>
</template>

<script setup lang="ts">
  import { ref, reactive } from 'vue';
  import type { FormInstance, FormRules } from 'element-plus';
  import { ElMessage } from 'element-plus';
  import CountrySelect from '@/views/msrpManage/priceCalculate/components/countrySelect.vue';
  import { EditLocationInfo } from '../type';
  import { omsApi } from '@/api';

  interface Props {
    visible: boolean;
    info?: Partial<EditLocationInfo>;
  }

  interface Emits {
    (e: 'update:visible', value: boolean): void;
    (e: 'submit', data: EditLocationInfo): void;
  }

  const props = withDefaults(defineProps<Props>(), {
    visible: false,
    info: () => ({}),
  });
  const emit = defineEmits<Emits>();
  // 对话框显示状态
  const dialogVisible = computed({
    get: () => props.visible,
    set: (value) => emit('update:visible', value),
  });
  // 表单引用
  const formRef = ref<FormInstance>();
  // 提交加载状态
  const submitLoading = ref(false);
  // 表单数据
  const form = reactive<EditLocationInfo>({
    orderCode: '',
    receiverAddressArea: '',
    receiverAddressCity: '',
    receiverAddressCountry: '',
    receiverAddressCountryCode: '',
    receiverAddressDetail1: '',
    receiverAddressHouseNumber: '',
    receiverAddressPostCode: '',
    receiverAddressState: '',
    receiverAddressStreet: '',
    receiverMobilePhone: '',
    receiverName: '',
    receiverPhone: '',
  });

  // 表单验证规则
  const rules = reactive<FormRules<EditLocationInfo>>({
    receiverName: [
      { required: true, message: '请输入收件人姓名', trigger: 'blur' },
      { min: 2, max: 50, message: '长度在 2 到 50 个字符', trigger: 'blur' },
    ],
    receiverAddressCountry: [{ required: true, message: '请选择国家/地区', trigger: 'change' }],
    receiverAddressCity: [{ required: true, message: '请输入城市', trigger: 'blur' }],
    receiverAddressDetail1: [
      { required: true, message: '请输入详细地址', trigger: 'blur' },
      { min: 5, max: 200, message: '长度在 5 到 200 个字符', trigger: 'blur' },
    ],
  });

  // 初始化表单数据
  const initForm = () => {
    if (props.info) {
      Object.assign(form, props.info);
    }
  };

  // 重置表单
  const resetForm = () => {
    formRef.value?.resetFields();
    Object.assign(form, {
      orderCode: '',
      receiverAddressArea: '',
      receiverAddressCity: '',
      receiverAddressCountry: '',
      receiverAddressCountryCode: '',
      receiverAddressDetail1: '',
      receiverAddressHouseNumber: '',
      receiverAddressPostCode: '',
      receiverAddressState: '',
      receiverAddressStreet: '',
      receiverMobilePhone: '',
      receiverName: '',
      receiverPhone: '',
    });
  };

  // 取消按钮
  const handleCancel = () => {
    resetForm();
    emit('update:visible', false);
  };

  // 提交表单
  const handleSubmit = async () => {
    if (!formRef.value) return;
    try {
      await formRef.value.validate();
      submitLoading.value = true;
      await omsApi.omsShopifyOrderUpdateReceiveInfo(form);
      ElMessage.success('修改收件人信息成功');
      emit('submit', form);
      dialogVisible.value = false;
      resetForm();
    } catch (error) {
      console.error('表单验证失败:', error);
    } finally {
      submitLoading.value = false;
    }
  };
  watch(
    () => props.info,
    (newVal) => {
      if (newVal) {
        initForm();
      }
    },
    {
      deep: true,
      immediate: true,
    }
  );
  // 暴露方法给父组件
  defineExpose({
    resetForm,
  });
</script>

<style lang="scss" scoped>
  .location-form {
    padding: 20px 20px 0;

    :deep(.el-form-item) {
      margin-bottom: 22px;
    }

    :deep(.el-input),
    :deep(.el-select) {
      width: 100%;
    }

    :deep(.el-textarea) {
      .el-textarea__inner {
        font-family: inherit;
      }
    }
  }

  .dialog-footer {
    display: flex;
    justify-content: flex-end;
    gap: 12px;
  }
</style>
