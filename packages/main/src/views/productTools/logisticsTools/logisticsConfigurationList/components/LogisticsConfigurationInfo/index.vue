<template>
  <el-dialog :title="title" :model-value="visible" @close="handleClose" width="900px">
    <el-form
      :inline="true"
      ref="formRef"
      :model="form"
      :rules="rules"
      label-position="left"
      label-width="140px"
    >
      <el-row :gutter="20">
        <el-col :span="12" :offset="0">
          <el-form-item label="供应链SKU" prop="productSku">
            <div v-if="title === '详情'">{{ form.productSku }}</div>
            <el-input
              :disabled="title !== '新增'"
              v-else
              v-model="form.productSku"
              placeholder="请填写"
            />
          </el-form-item>
        </el-col>
        <el-col :span="12" :offset="0">
          <el-form-item label="单箱的长（cm）" prop="unitContainerLong">
            <div v-if="title === '详情'">{{ form.unitContainerLong }}</div>
            <el-input-number
              v-else
              :controls="false"
              placeholder="请填写"
              v-model="form.unitContainerLong"
              :min="0"
              :max="10000000"
            />
          </el-form-item>
        </el-col>
        <el-col :span="12" :offset="0">
          <el-form-item label="产品名称（中文）" prop="productNameCn">
            <span v-if="title === '详情'">{{ form.productNameCn }}</span>
            <el-input v-else placeholder="请填写" v-model="form.productNameCn" />
          </el-form-item>
        </el-col>
        <el-col :span="12" :offset="0">
          <el-form-item label="单箱的宽（cm）" prop="unitContainerWidth">
            <span v-if="title === '详情'">{{ form.unitContainerWidth }}</span>
            <el-input-number
              v-else
              :controls="false"
              placeholder="请填写"
              v-model="form.unitContainerWidth"
              :min="0"
              :max="10000000"
            />
          </el-form-item>
        </el-col>
        <el-col :span="12" :offset="0">
          <el-form-item label="产品名称（英文）" prop="productNameEn">
            <span v-if="title === '详情'">{{ form.productNameEn }}</span>
            <el-input v-else placeholder="请填写" v-model="form.productNameEn" />
          </el-form-item>
        </el-col>
        <el-col :span="12" :offset="0">
          <el-form-item label="单箱的高（cm）" prop="unitContainerHeight">
            <span v-if="title === '详情'">{{ form.unitContainerHeight }}</span>
            <el-input-number
              v-else
              :controls="false"
              placeholder="请填写"
              v-model="form.unitContainerHeight"
              :min="0"
              :max="10000000"
            />
          </el-form-item>
        </el-col>
        <el-col :span="12" :offset="0">
          <el-form-item label="申报中文名称" prop="declareNameCn">
            <span v-if="title === '详情'">{{ form.declareNameCn }}</span>
            <el-input v-else placeholder="请填写" v-model="form.declareNameCn" />
          </el-form-item>
        </el-col>
        <el-col :span="12" :offset="0">
          <el-form-item label="单箱数量" prop="unitContainerNum">
            <span v-if="title === '详情'">{{ form.unitContainerNum }}</span>
            <el-input-number
              v-else
              :controls="false"
              placeholder="请填写"
              v-model="form.unitContainerNum"
              :min="1"
              :precision="0"
              :max="10000000"
            />
          </el-form-item>
        </el-col>
        <el-col :span="12" :offset="0">
          <el-form-item label="申报英文名称" prop="declareNameEn">
            <span v-if="title === '详情'">{{ form.declareNameEn }}</span>
            <el-input v-else placeholder="请填写" v-model="form.declareNameEn" />
          </el-form-item>
        </el-col>
        <el-col :span="12" :offset="0">
          <el-form-item label="单箱重量（kg）" prop="unitContainerWeight">
            <span v-if="title === '详情'">{{ form.unitContainerWeight }}</span>
            <el-input-number
              v-else
              :controls="false"
              placeholder="请填写"
              v-model="form.unitContainerWeight"
              :min="0"
              :max="10000000"
            />
          </el-form-item>
        </el-col>
        <el-col :span="12" :offset="0">
          <el-form-item label="产品毛重（kg）" prop="grossWeight">
            <span v-if="title === '详情'">{{ form.grossWeight }}</span>
            <el-input-number
              v-else
              :controls="false"
              placeholder="请填写"
              v-model="form.grossWeight"
              :min="0"
              :max="10000000"
            />
          </el-form-item>
        </el-col>
      </el-row>
    </el-form>
    <template v-if="title !== '详情'" #footer>
      <span class="dialog-footer">
        <el-button @click="handleClose">取消</el-button>
        <el-button type="primary" @click="submitFn" :loading="saveLoading">确定</el-button>
      </span>
    </template>
  </el-dialog>
</template>

<script setup lang="ts">
  import { ElMessage } from 'element-plus';
  import { erpApi } from '@/api/index';
  import { LogisticsConfigSaveReq } from '@/api/erp/data-contracts';

  const props = withDefaults(
    defineProps<{
      visible: boolean;
      title: string;
      configCode: string;
      productSku: string;
    }>(),
    {
      visible: false,
      title: '新增',
      configCode: '',
      productSku: '',
    }
  );
  const form = ref<LogisticsConfigSaveReq>({
    productSku: '',
    productNameCn: '',
    productNameEn: '',
    declareNameCn: '',
    declareNameEn: '',
    grossWeight: undefined,
    unitContainerWeight: undefined,
    unitContainerLong: undefined,
    unitContainerWidth: undefined,
    unitContainerHeight: undefined,
    unitContainerNum: undefined,
  });
  const rules = ref({
    productSku: [{ required: true, message: '请填写', trigger: ['blur'] }],
  });
  const formRef = ref();
  const saveLoading = ref(false);
  const submitFn = async () => {
    const valid = await formRef.value?.validate().catch(() => {
      return false; // 校验失败返回 false，不继续执行
    });
    if (valid) {
      const params: typeof form.value & { configCode?: string } = {
        ...form.value,
      };
      if (props.configCode) {
        params.configCode = props.configCode;
      } else {
        delete params.configCode;
      }
      saveLoading.value = true;
      await erpApi
        .luteosErpBaseLogisticsConfigSaveOrUpdate({
          ...params,
        })
        .finally(() => {
          saveLoading.value = false;
        });
      ElMessage.success('保存成功');
      emit('close', true);
    }
  };
  const getDetail = async () => {
    const res = await erpApi.luteosErpBaseLogisticsConfigQueryList({
      keyword: props.productSku,
      pageNum: 1,
      pageSize: 10,
    });
    if (res.code === '200' && res.recordList?.length) {
      form.value = { ...res.recordList[0] };
    }
  };
  const emit = defineEmits<{
    (event: 'close', r?: boolean): void;
  }>();
  const handleClose = () => {
    formRef.value?.resetFields();
    emit('close');
  };
  watch(
    () => props.visible,
    (val) => {
      if (val && props.configCode) {
        getDetail();
      }
    }
  );
</script>

<style lang="scss" scoped>
  :deep(.el-input-number) {
    width: 171px;
    .el-input__inner {
      text-align: left;
    }
  }
  .product-desc {
    width: 100%;
    line-height: 25px;
    margin-top: 10px;
  }
</style>
