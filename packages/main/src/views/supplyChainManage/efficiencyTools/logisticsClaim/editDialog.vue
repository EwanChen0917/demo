<template>
  <el-dialog
    v-model="visible"
    :destroy-on-close="true"
    :title="`${row ? '编辑' : '新增'}物流索赔单`"
    width="800px"
    :close-on-click-modal="false"
    @closed="handleClosed"
  >
    <el-form ref="formRef" :model="formData" :rules="rules" label-width="120px">
      <el-row :gutter="20">
        <el-col :span="12">
          <el-form-item label="索赔单号" prop="claimNo">
            <el-input v-model="formData.claimNo" placeholder="" disabled />
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="业务单号" prop="businessNo">
            <el-input v-model="formData.businessNo" placeholder="请输入业务单号" />
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="20">
        <el-col :span="12">
          <el-form-item label="类型" prop="type" required>
            <el-select v-model="formData.type" placeholder="请选择类型">
              <el-option v-for="item in ClaimType" :label="item.label" :value="item.value" />
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="异常分类" prop="abnormalType" required>
            <el-select v-model="formData.abnormalType" placeholder="请选择异常分类">
              <el-option v-for="item in ClaimGroupType" :label="item.label" :value="item.value" />
            </el-select>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="20">
        <el-col :span="12">
          <el-form-item label="索赔标准" prop="claimStandard" required>
            <el-select v-model="formData.claimStandard" placeholder="请选择索赔标准">
              <el-option v-for="item in ClaimStandard" :label="item.label" :value="item.value" />
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="赔偿金额(RMB)" prop="compensationAmount" required>
            <el-input v-model="formData.compensationAmount" placeholder="请输入赔偿金额(RMB)" />
          </el-form-item>
        </el-col>
      </el-row>

      <el-row :gutter="20">
        <el-col :span="12">
          <el-form-item label="异常数量" prop="abnormalQuantity">
            <el-input v-model="formData.abnormalQuantity" placeholder="请输入异常数量" />
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="单位" prop="unit">
            <el-input v-model="formData.unit" placeholder="请输入单位" />
          </el-form-item>
        </el-col>
      </el-row>

      <el-row :gutter="20">
        <el-col :span="24">
          <el-form-item label="举证说明" prop="proofDesc">
            <el-input
              v-model="formData.proofDesc"
              type="textarea"
              rows="5"
              placeholder="请输入举证说明"
              style="word-break: break-all"
            />
          </el-form-item>
        </el-col>
      </el-row>

      <el-row :gutter="20">
        <el-col :span="24">
          <el-form-item label="备注" prop="remark">
            <el-input
              v-model="formData.remark"
              type="textarea"
              rows="5"
              placeholder="请输入备注"
              style="word-break: break-all"
            />
          </el-form-item>
        </el-col>
      </el-row>
    </el-form>

    <template #footer>
      <el-space>
        <el-button @click="visible = false">关闭</el-button>
        <el-button type="primary" @click="handleSubmit">确定</el-button>
      </el-space>
    </template>
  </el-dialog>
</template>

<script setup lang="ts">
  import type { FormInstance, FormRules } from 'element-plus';
  import {
    ClaimGroupType,
    ClaimStandard,
    ClaimType,
  } from '@/views/supplyChainManage/efficiencyTools/logisticsClaim/enums';
  import { erpApi } from '@/api';
  import { ElMessage } from 'element-plus';

  const emit = defineEmits(['success']);

  const row = ref(null);
  const visible = ref(false);
  const formRef = ref<FormInstance>();
  const formData = ref({});

  const rules = reactive<FormRules>({
    type: [{ required: true, message: '请选择类型', trigger: 'blur' }],
    abnormalType: [{ required: true, message: '请选择异常分类', trigger: 'blur' }],
    claimStandard: [{ required: true, message: '请选择索赔标准', trigger: 'blur' }],
    compensationAmount: [
      { required: true, message: '请输入赔偿金额(RMB)', trigger: 'blur' },
      // 保留两位小数的数字
      {
        message: '最多保留两位小数的金额值',
        validator: (rule, value) => {
          const reg = /^[0-9]+(\.[0-9]{1,2})?$/;
          return reg.test(value);
        },
      },
    ],
    abnormalQuantity: [
      {
        message: '请输入整数值',
        validator: (rule, value) => {
          if (value === '' || value === null || value === undefined) {
            return true;
          }
          const reg = /^[0-9]*$/;
          return reg.test(value);
        },
      },
    ],
  });

  const handleSubmit = async () => {
    if (!formRef.value) return;

    await formRef.value?.validate(async (valid) => {
      if (valid) {
        if (formData.value.id) {
          erpApi.luteosErpLogisticsClaimUpdate(formData.value).then(() => {
            ElMessage.success('修改成功');
            emit('success');
            handleClosed();
          });
        } else {
          erpApi.luteosErpLogisticsClaimAdd(formData.value).then(() => {
            ElMessage.success('新增成功');
            emit('success');
            handleClosed();
          });
        }
      }
    });
  };
  const handleClosed = () => {
    visible.value = false;
  };

  const open = (_row) => {
    row.value = _row;
    visible.value = true;
    formData.value = {};
    formRef.value?.resetFields();
    if (_row?.id) {
      erpApi
        .luteosErpLogisticsClaimDetail({
          id: _row.id,
        })
        .then((res) => {
          if (res) {
            formData.value = { ...res };
          }
        });
    } else {
      _row && ElMessage.error('编辑错误，记录缺失id');
    }
  };

  // 暴露方法给父组件使用
  defineExpose({
    open,
  });
</script>

<style scoped></style>
