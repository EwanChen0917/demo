<template>
  <el-dialog
    v-model="visible"
    title="生成应付单"
    width="500px"
    @close="close"
    :destroy-on-close="true"
  >
    <el-form :model="form" label-width="150px" ref="formRef">
      <el-form-item
        label="物流商"
        prop="logisticsSupplier"
        required
        :rules="[{ required: true, message: '请选择物流商' }]"
      >
        <el-select
          v-model="form.logisticsSupplier"
          placeholder="请选择物流商"
          style="width: 240px"
          filterable
          :remote="true"
          :remote-method="getSuppliers"
          :loading="suppliersLoading"
        >
          <el-option
            v-for="item in suppliers"
            :key="item.id"
            :label="item.supplierName"
            :value="item.supplierCode"
          />
        </el-select>
      </el-form-item>
      <el-form-item
        label="兴运物流单添加时间"
        prop="logisticsOrderAddTime"
        required
        :rules="[{ required: true, message: '请选择兴运物流单添加时间' }]"
      >
        <el-date-picker
          v-model="form.logisticsOrderAddTime"
          type="daterange"
          range-separator="-"
          start-placeholder="开始日期"
          end-placeholder="结束日期"
          value-format="YYYY-MM-DD"
          clearable
          style="width: 240px"
          @change="
            (val) => {
              if (val) {
                form.createDateStart = dayjs(val[0]).format('YYYY-MM-DD');
                form.createDateEnd = dayjs(val[1]).format('YYYY-MM-DD');
              }
            }
          "
        />
      </el-form-item>
    </el-form>
    <template #footer>
      <el-button @click="close">取消</el-button>
      <el-button type="primary" @click="handleSubmit" :loading="submitLoading">确定</el-button>
    </template>
  </el-dialog>
</template>
<script setup lang="ts">
  import { ref } from 'vue';
  import { erpApi } from '@/api';
  import dayjs from 'dayjs';
  import { omit } from 'lodash-es';
  import { ElMessage } from 'element-plus/es';

  const emit = defineEmits(['success']);
  const visible = ref(false);
  const form = ref({
    logisticsSupplier: '',
    logisticsOrderAddTime: [],
    createDateStart: '',
    createDateEnd: '',
  });

  const suppliers = ref<any>([]);
  const suppliersLoading = ref(false);
  const getSuppliers = async (keyword: string) => {
    suppliersLoading.value = true;
    const res = await erpApi.luteosErpLogisticsSupplierQueryList({
      pageSize: 100,
      pageNum: 1,
      status: 1,
      supplierName: keyword,
    });
    suppliers.value = res.recordList?.filter((item: any) => item.supplierType === 'supplier_first');
    suppliersLoading.value = false;
  };
  getSuppliers('');

  const submitLoading = ref(false);
  const handleSubmit = async () => {
    const params = omit(form.value, ['logisticsOrderAddTime']);
    try {
      submitLoading.value = true;
      await erpApi.luteosErpLogisticsReconciliationGeneratePayable(params);
      ElMessage.success('生成应付单成功');
      emit('success');
      close();
    } finally {
      submitLoading.value = false;
    }
  };

  const open = () => {
    form.value = {
      logisticsSupplier: '',
      logisticsOrderAddTime: [],
      createDateStart: '',
      createDateEnd: '',
    };
    visible.value = true;
  };
  const close = () => {
    visible.value = false;
  };
  defineExpose({
    open,
  });
</script>
<style scoped lang="scss"></style>
