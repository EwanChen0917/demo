<template>
  <el-dialog
    title="收款条件-新增"
    :model-value="visible"
    @close="$emit('close')"
    label-position="left"
  >
    <el-form :model="form" ref="formRef" label-width="140">
      <el-form-item label="名称：" required>
        <el-input v-model="name" disabled />
      </el-form-item>
      <el-form-item
        prop="settlementMethod"
        label="结算方式："
        required
        :rules="[{ required: true, message: '结算方式不能为空', trigger: ['blur'] }]"
      >
        <el-select
          v-model="form.settlementMethod"
          clearable
          @change="changeSettlementMethod"
          placeholder="请选择结算方式"
        >
          <el-option
            v-for="item in settlementMethodList"
            :key="item.code"
            :label="item.name"
            :value="item.code"
          />
        </el-select>
      </el-form-item>
      <el-form-item
        prop="settlementPeriod"
        label="结算周期（天）："
        :required="form.settlementMethod === 0"
        :rules="[
          {
            required: form.settlementMethod === 0 ? true : false,
            message: '结算周期（天）不能为空',
            trigger: ['blur'],
          },
        ]"
      >
        <!-- 1、当结算方式为账期时，该字段必录，录入值需为整数且在[1，10000]区间范围内，若为空，点击保存时，保存失败，提示：结算方式为账期 时，结算周期（天）不能为空。
      2、当结算方式非账期时，则该字段的输入框灰显，不可录入，结算方式由账期切换到其他结算方式时，原输入框录入的结算周期需清空且输入框置灰。 -->
        <NumberInput
          v-model="form.settlementPeriod"
          :precision="0"
          :min="1"
          :max="10000"
          :disabled="form.settlementMethod !== 0"
          controls-position="right"
          v-if="form.settlementMethod === 0"
        />
        <el-input v-model="form.settlementPeriod" disabled v-else />
      </el-form-item>
    </el-form>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="handleFormCancel">取消</el-button>
        <el-button type="primary" @click="handleFormSubmit" :loading="saveLoading">保存</el-button>
      </span>
    </template>
  </el-dialog>
</template>

<script lang="ts" setup>
  import { ElMessage, FormInstance } from 'element-plus';
  import { FinanceSystemApi, financeSystemApi } from '@/api';
  import type { ReceiptConditionDetailReq } from '@/api/financeSystem/data-contracts';

  const props = defineProps<{
    visible: boolean;
  }>();
  // 表单定义
  const formRef = ref<FormInstance>();
  const form = ref<Required<ReceiptConditionDetailReq>>({
    settlementMethod: '',
    settlementPeriod: '',
  });
  const name = ref('');
  const settlementMethodList = [
    // 结算方式: 0-账期 1-款到发货 2-货到付款 3-阿里结算
    { name: '账期', code: 0 },
    { name: '款到发货', code: 1 },
    { name: '货到付款', code: 2 },
    { name: '阿里结算', code: 3 },
  ];

  const emit = defineEmits<{
    (event: 'close', reload?: boolean): void;
  }>();
  // 切换结算方式
  //  根据结算方式和结算周期的名称组合带出，置灰，不可编辑，比如结算方式选择为：账期，结算周期为：10天，在名称默认显示为：账期，10（天）；
  //  若结算方式选择为款到发货，由于款到发货不需要选择账期，所以收款条件名称显示为：款到发货。
  const changeSettlementMethod = async () => {
    form.value.settlementPeriod = '';
    if (form.value.settlementMethod == 0) {
      const num = form.value.settlementMethod;
      name.value = `账期${num ? `，${num}（天）` : ''}`;
    } else {
      const result = settlementMethodList.find((res: any) => {
        return res.code == form.value.settlementMethod;
      });
      console.log(result);
      if (result) {
        name.value = result.name;
      }
    }
  };
  // 提交操作
  const saveLoading = ref(false);
  const handleFormSubmit = async () => {
    const valid = await formRef.value?.validate().catch(() => {
      return false; // 校验失败返回 false，不继续执行
    });
    if (valid) {
      await financeSystemApi.financeReceiptConditionAdd({ ...form.value });
      ElMessage.success('新增成功');
      emit('close', true);
    }
  };

  // 取消操作
  const handleFormCancel = async () => {
    emit('close');
  };
</script>
