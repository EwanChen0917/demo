<template>
  <el-dialog
    :title="title"
    :model-value="visibility"
    @close="close"
    width="1000px"
    label-position="left"
  >
    <el-form :model="form" ref="formRef" :rules="rules" label-width="160">
      <el-row :gutter="20">
        <el-col :span="12" :offset="0">
          <el-form-item label="交易币种：" prop="transactionCurrency">
            <el-input v-model.trim="form.transactionCurrency" />
          </el-form-item>
        </el-col>
        <el-col :span="12" :offset="0">
          <el-form-item label="公司名称：" prop="companyName">
            <el-input v-model.trim="form.companyName" />
          </el-form-item>
        </el-col>
        <el-col :span="12" :offset="0">
          <el-form-item label="地址：" prop="address">
            <el-input v-model.trim="form.address" />
          </el-form-item>
        </el-col>
        <el-col :span="12" :offset="0">
          <el-form-item label="联系方式：" prop="phone">
            <el-input v-model.trim="form.phone" />
          </el-form-item>
        </el-col>
        <el-col :span="12" :offset="0">
          <el-form-item label="印章：" prop="file">
            <KeenFileUpload
              v-model="form.file"
              :showOperate="false"
              :limit="1"
              accept=".png,.jpeg,.bmp,.jpg"
              directory="erp/customsClearance/subject"
              ref="uploadRef"
              v-if="show"
            >
              <el-link type="primary" :underline="false">选择图片文件</el-link>
            </KeenFileUpload>
          </el-form-item>
        </el-col>
        <el-col :span="12" :offset="0">
          <el-form-item label="口岸编码：" prop="customsCode">
            <el-input v-model.trim="form.customsCode" />
          </el-form-item>
        </el-col>
        <el-col :span="12" :offset="0">
          <el-form-item label="生产销售单位：" prop="producerSeller">
            <el-input v-model.trim="form.producerSeller" />
          </el-form-item>
        </el-col>
        <el-col :span="12" :offset="0">
          <el-form-item label="生产销售单位代码：" prop="producerSellerCode">
            <el-input v-model.trim="form.producerSellerCode" />
          </el-form-item>
        </el-col>
        <el-col :span="12" :offset="0">
          <el-form-item label="境内发货人：" prop="domesticConsignor">
            <el-input v-model.trim="form.domesticConsignor" />
          </el-form-item>
        </el-col>
        <el-col :span="12" :offset="0">
          <el-form-item label="境内发货人代码：" prop="domesticConsignorCode">
            <el-input v-model.trim="form.domesticConsignorCode" />
          </el-form-item>
        </el-col>
        <el-col :span="12" :offset="0">
          <el-form-item label="境外收货人：" prop="foreignConsignee">
            <el-input v-model.trim="form.foreignConsignee" />
          </el-form-item>
        </el-col>
      </el-row>
    </el-form>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="handleFormCancel">取消</el-button>
        <el-button type="primary" @click="handleFormSubmit" :loading="saveLoading">提交</el-button>
      </span>
    </template>
  </el-dialog>
</template>

<script lang="ts" setup>
  import { ElMessage, FormInstance } from 'element-plus';
  import { erpApi } from '@/api';
  import { omit } from 'lodash-es';
  import { download } from '@/utils/download';

  const props = defineProps<{
    code: string;
    visibility: boolean;
  }>();
  const title = ref('新增报关主体');
  // 表单定义
  const formRef = ref<FormInstance>();
  const form = ref({
    transactionCurrency: '',
    companyName: '',
    producerSeller: '',
    producerSellerCode: '',
    domesticConsignor: '',
    domesticConsignorCode: '',
    foreignConsignee: '',
    address: '',
    phone: '',
    file: [],
    customsCode: '',
  });
  const rules = ref({
    transactionCurrency: [{ required: true, message: '请输入交易币种', trigger: ['blur'] }],
    companyName: [{ required: true, message: '请输入公司名称', trigger: ['blur'] }],
    address: [{ required: true, message: '请输入地址', trigger: ['blur'] }],
    phone: [{ required: true, message: '请输入联系方式', trigger: ['blur'] }],
    file: [{ required: true, message: '请输入上传印章', trigger: ['blur'] }],
    customsCode: [{ required: true, message: '请输入口岸编码', trigger: ['blur'] }],
    producerSeller: [{ required: true, message: '请输入生产销售单位', trigger: ['blur'] }],
    producerSellerCode: [{ required: true, message: '请输入生产销售单位代码', trigger: ['blur'] }],
    domesticConsignor: [{ required: true, message: '请输入境内发货人', trigger: ['blur'] }],
    domesticConsignorCode: [{ required: true, message: '请输入境内发货人代码', trigger: ['blur'] }],
    foreignConsignee: [{ required: true, message: '请输入境外收货人', trigger: ['blur'] }],
  });
  const emit = defineEmits<{
    (event: 'close'): void;
    (event: 'success'): void;
  }>();
  // 提交操作
  const saveLoading = ref(false);
  const handleFormSubmit = async () => {
    const valid = await formRef.value?.validate().catch(() => {
      return false; // 校验失败返回 false，不继续执行
    });
    if (valid) {
      // TODO 调接口
      let param = JSON.parse(JSON.stringify(form.value));
      param = {
        ...omit(param, 'file'),
        fileName: form.value.file[0].name,
        fileKey: form.value.file[0].ossKey,
      };
      await erpApi.luteosErpCustomsSaveOrUpdateDeclarationEntity({ ...param });
      const text = props.code ? '编辑成功' : '新增成功';
      ElMessage.success(text);
      emit('success');
      close();
    }
  };

  // 取消操作
  const handleFormCancel = () => {
    close();
  };
  const show = ref(true);
  const getDetailData = async () => {
    if (props.code) {
      title.value = '编辑报关主体';
      const res = await erpApi.luteosErpCustomsQueryDeclarationEntityDetail({ code: props.code });
      if (res) {
        form.value = res.result;
        if (res.result.url) {
          show.value = false;
          form.value.file = [
            {
              name: form.value.fileName,
              ossKey: form.value.fileKey,
              url: form.value.url,
            },
          ];
          setTimeout(() => {
            show.value = true;
          }, 100);
        }
      }
    } else {
      title.value = '新增报关主体';
    }
  };
  getDetailData();
  const close = () => {
    emit('close');
  };
  defineExpose({ open });
</script>
