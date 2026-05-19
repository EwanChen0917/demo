<template>
  <el-dialog v-model="visible" title="单据详情" width="75%" @close="handleClose">
    <el-form ref="formRef" :model="formData" label-width="90px" :rules="rules">
      <el-row :gutter="20">
        <el-col :span="20">
          <el-form-item label="单据类型">
            {{ formData.processTypeDesc }}
          </el-form-item>
        </el-col>
        <el-col :span="20">
          <el-form-item label="单据名称">
            {{ formData.processName }}
          </el-form-item>
        </el-col>
        <el-col :span="20">
          <el-form-item label="申请时间">
            {{ formData.applyTime }}
          </el-form-item>
        </el-col>
        <el-col :span="20">
          <el-form-item label="申请金额">
            {{ formData.applyAmount }}
          </el-form-item>
        </el-col>
        <el-col :span="20">
          <el-form-item label="剩余金额" v-if="formData.processType == 'before'">
            {{ formData.remainingAmount }}
          </el-form-item>
        </el-col>
      </el-row>
      <KeenCard title="明细">
        <!-- 事前单据 -->
        <el-table
          ref="tableRef"
          :data="formData.exeItems"
          row-key="id"
          class-name="table-row-dashed"
          v-if="formData.processType == 'before'"
        >
          <el-table-column label="发生时间" prop="businessTime" />
          <el-table-column label="关联单据" prop="relevanceCode" />
          <el-table-column label="变动金额" prop="exeAmount" />
          <el-table-column label="变动原因" prop="exeOperateTypeDesc" />
        </el-table>
        <!-- 事后单据 -->
        <el-table
          ref="tableRef"
          :data="formData.exeItems"
          row-key="id"
          class-name="table-row-dashed"
          v-if="formData.processType == 'after'"
        >
          <el-table-column label="支付时间" prop="businessTime" />
          <el-table-column label="关联付款单据" prop="relevanceCode" />
          <el-table-column label="待支付金额" prop="exeAfterAmount" />
          <el-table-column label="已支付金额" prop="exeAmount" />
          <el-table-column label="已作废金额" prop="invalidatedAmount" />
          <el-table-column label="支付结果" prop="exeOperateTypeDesc" />
        </el-table>
      </KeenCard>
    </el-form>
  </el-dialog>
</template>

<script setup lang="ts">
  import { ref, defineEmits } from 'vue';
  import { budgetApi } from '@/api';
  import { ElMessage } from 'element-plus';
  import { omit } from 'lodash-es';

  const emit = defineEmits(['success']);

  const formRef = ref();
  const formData = ref({
    applyAmount: '',
    applyTime: '',
    exeItems: [],
    processName: '',
    processTypeDesc: '',
  });
  const listData = ref([]);
  const visible = ref(false);

  const getDetail = async (flowCode) => {
    const res = await budgetApi.financeBudgetExeQueryDetail({ code: flowCode });
    formData.value = res;
  };
  const open = (flowCode) => {
    console.log(flowCode);
    visible.value = true;
    getDetail(flowCode);
  };
  const handleClose = () => {
    visible.value = false;
  };

  defineExpose({
    open,
  });
</script>

<style scoped>
  .el-dialog__footer {
    text-align: right;
  }
  .radio-box {
    margin-bottom: 10px;
    span {
      font-size: 14px;
      color: var(---N6, #999);
      vertical-align: text-top;
    }
  }
</style>
