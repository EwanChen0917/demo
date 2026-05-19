<template>
  <el-dialog title="添加货件" :model-value="visible" width="600px" @close="$emit('close')">
    <el-form ref="form" label-position="top" :inline="false">
      <el-form-item label="发货指令单号">
        <el-select
          class="w-100"
          v-model="planCommandCode"
          filterable
          remote
          reserve-keyword
          :remote-method="querySelectPlanListV2"
        >
          <el-option
            v-for="item in planListV2"
            :key="item.planCommandCode"
            :label="item.planCommandCode"
            :value="item.planCommandCode"
          />
        </el-select>
      </el-form-item>
      <el-form-item label="易仓头程计划单号">
        <el-select
          class="w-100"
          v-model="shippingPlanCodeList"
          multiple
          filterable
          remote
          reserve-keyword
          :remote-method="querySelectPlanList"
        >
          <el-option
            v-for="item in planList"
            :key="item.shippingPlanCode"
            :label="item.shippingPlanCode"
            :value="item.shippingPlanCode"
          />
        </el-select>
      </el-form-item>
    </el-form>

    <template #footer>
      <span>
        <el-button @click="handleCancel">取消</el-button>
        <el-button type="primary" @click="handleSave">确定</el-button>
      </span>
    </template>
  </el-dialog>
</template>

<script setup lang="ts">
  import { erpApi } from '@/api';
  import { ElMessage } from 'element-plus';
  import { PlanShipCommandItem, PlanShipmentItem } from '@/api/erp/data-contracts';

  const props = defineProps<{
    visible: boolean;
    commandCode?: string;
  }>();

  const emit = defineEmits<{
    (event: 'close', reload?: boolean, val?: any): void;
  }>();
  const planCommandCode = ref<string>(props.commandCode as string);
  const shippingPlanCodeList = ref<string[]>([]);
  /* const form = reactive({
planCommandCode: '',
shippingPlanCode: '',
}); */

  const handleSave = async () => {
    if (planCommandCode.value && shippingPlanCodeList.value.length > 0) {
      await erpApi.luteosErpPlanShipmentSave({
        planCommandCode: planCommandCode.value,
        shippingPlanCodeList: shippingPlanCodeList.value,
      });
      ElMessage.success('添加成功');
      emit('close');
    } else {
      ElMessage.warning('请完善表单');
    }
  };
  const handleCancel = () => {
    emit('close');
  };

  const planList = ref<PlanShipmentItem[]>([]);
  const planListV2 = ref<PlanShipCommandItem[]>([]);
  const querySelectPlanListV2 = async (val) => {
    const res = await erpApi.luteosErpPlanShipCommandV2QuerySelectPlanList({
      keyword: val,
      filterHasPlanCode: true,
      pageNum: 1,
      pageSize: 100,
    });
    planListV2.value = res?.recordList || [];
  };
  const querySelectPlanList = async (val) => {
    const res = await erpApi.luteosErpPlanShipmentQuerySelectPlanList({
      keyword: val,
      filterHasPlanCode: false,
      pageNum: 1,
      pageSize: 100,
    });
    planList.value = res?.recordList || [];
  };
  onMounted(() => {
    querySelectPlanList();
    querySelectPlanListV2();
  });
</script>

<style scoped lang="scss"></style>
