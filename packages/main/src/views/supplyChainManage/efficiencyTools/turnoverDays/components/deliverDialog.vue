<template>
  <el-dialog
    class="deliver-dialog"
    title="发货指令"
    v-model="visibility"
    width="540px"
    :before-close="close"
  >
    <el-form
      :model="form"
      :validate-on-rule-change="false"
      ref="formRef"
      label-position="top"
      scroll-to-error
    >
      <el-row :gutter="20">
        <el-col :span="12" :offset="0">
          <el-form-item label="产品SKU">
            <el-input v-model="form.skuCode" disabled />
          </el-form-item>
        </el-col>
        <el-col :span="12" :offset="0">
          <el-form-item
            label="预计发货时间"
            prop="estimateShipDate"
            :rules="[
              {
                required: true,
                trigger: 'change',
                message: '预计发货时间',
              },
            ]"
          >
            <el-date-picker
              @change="handleEstimateShipDateChange"
              value-format="YYYY-MM-DD"
              v-model="form.estimateShipDate"
              type="date"
              placeholder="选择预计发货时间"
            />
          </el-form-item>
        </el-col>
        <el-col :span="12" :offset="0">
          <el-form-item
            label="物流方式"
            prop="logisticMethod"
            :rules="[
              {
                required: true,
                trigger: 'change',
                message: '请选择物流方式',
              },
            ]"
          >
            <el-select
              v-model="form.logisticMethod"
              filterable
              @change="handlelogisticMethodChange"
            >
              <el-option
                v-for="item in planTurnOverLogisticsList"
                :key="item.code"
                :label="item.name"
                :value="item.code"
              />
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="12" :offset="0">
          <el-form-item
            label="预计到货时间"
            prop="estimateArriveDate"
            :rules="[
              {
                required: true,
                trigger: 'change',
                message: '请选择预计到货时间',
              },
            ]"
          >
            <el-date-picker
              value-format="YYYY-MM-DD"
              @change="handleEstimateArriveDateChange"
              v-model="form.estimateArriveDate"
              type="date"
              placeholder="选择预计到货时间"
            />
          </el-form-item>
        </el-col>
        <!-- <el-col :span="12" :offset="0">
          <el-form-item
            label="供应链SKU"
            prop="supplySku"
            :rules="[
              {
                required: true,
                message: '请选择供应链SKU',
              },
            ]"
          >
            <el-select
              v-model="form.supplySku"
              placeholder=""
              clearable
              filterable
              @change="getEstimateQtyLimit"
            >
              <el-option v-for="item in supplySkuList" :key="item" :label="item" :value="item" />
            </el-select>
          </el-form-item>
        </el-col> -->
        <el-col :span="12" :offset="0">
          <el-form-item
            prop="shipMethod"
            label="发货方式"
            :rules="[
              {
                required: true,
                message: '请选择发货方式',
              },
            ]"
          >
            <el-select v-model="form.shipMethod" placeholder="" clearable filterable>
              <el-option label="中仓发货" value="1" />
              <el-option label="工厂直发" value="2" />
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="12" :offset="0">
          <el-form-item
            label="预计发货数量"
            prop="estimateQty"
            :rules="[
              {
                required: true,
                type: 'number',
                min: 1,
                message: '预计发货数量最少为1',
              },
            ]"
          >
            <Num
              v-model="form.estimateQty"
              :precision="0"
              :max="maxQty"
              :min="1"
              :placeholder="`最大发货量${maxQty}`"
            />
          </el-form-item>
        </el-col>
      </el-row>
    </el-form>
    <template #footer>
      <span>
        <el-button @click="close">取消</el-button>
        <el-button type="primary" @click="confirm(0)">确定</el-button>
        <el-button type="primary" @click="confirm(3)">锁定</el-button>
      </span>
    </template>
  </el-dialog>
</template>

<script setup lang="ts">
  import { ref } from 'vue';
  import { erpApi } from '@/api';
  import { ElMessage } from 'element-plus';
  import Num from '@/components/NumberInput/index.vue';
  import dayjs from 'dayjs';

  const visibility = ref(false);
  const form = ref<any>({
    estimateArriveDate: '',
    estimateQty: undefined,
    estimateShipDate: '',
    logisticMethod: '',
    shipMethod: '',
    supplySku: '',
    channel: '',
    operator: '',
    originalPlatformMark: '',
    planer: '',
    site: '',
    turnoverCode: '',
    skuCode: '',
  });
  const formRef = ref();
  const open = (row) => {
    form.value.skuCode = row.skuCode;
    form.value.originalPlatformMark = row.originalPlatformMark;
    form.value.channel = row.channel;
    form.value.operator = row.operator;
    form.value.planer = row.planer;
    form.value.site = row.site;
    form.value.turnoverCode = row.code;
    initData();
  };
  const planTurnOverLogisticsList = ref<any[]>([]);
  // const supplySkuList = ref<any[]>([]);
  const initData = async () => {
    const { planTurnOverLogisticsList: planTurnOverLogisticsListData }: any =
      await erpApi.luteosErpPlanTurnoverLogisticsQueryList();
    planTurnOverLogisticsList.value = planTurnOverLogisticsListData;
    // const { supplySkuList: supplySkuListData }: any =
    //   await erpApi.luteosErpPlanShipCommandQuerySupplySkuList({ skuCode: form.value.skuCode });
    // supplySkuList.value = supplySkuListData;
    await getEstimateQtyLimit();
    visibility.value = true;
  };
  const maxQty = ref(99999);
  const getEstimateQtyLimit = async () => {
    // const res = await erpApi.luteosErpPlanShipCommandQueryShipMaxQty({ supplySku });
    const res = await erpApi.luteosErpPlanShipCommandV2QueryShipMaxQty({
      skuCode: form.value.skuCode,
    });
    maxQty.value = res.maxQty as number;
    form.value.estimateQty = undefined;
  };
  const confirm = async (handleType) => {
    const valid = await formRef.value?.validate().catch(() => {
      return false; // 校验失败返回 false，不继续执行
    });
    if (valid) {
      await erpApi.luteosErpPlanShipCommandV2Save({
        ...form.value,
        handleType,
      });
      ElMessage.success('操作成功');
      emits('success');
      close();
    }
  };
  const close = () => {
    form.value = {
      estimateArriveDate: '',
      estimateQty: undefined,
      estimateShipDate: '',
      logisticMethod: '',
      shipMethod: '',
      supplySku: '',
      channel: '',
      operator: '',
      originalPlatformMark: '',
      planer: '',
      site: '',
      turnoverCode: '',
      skuCode: '',
    };
    formRef.value.resetFields();
    nextTick(() => {
      visibility.value = false;
    });
  };
  const handlelogisticMethodChange = () => {
    const result = planTurnOverLogisticsList.value.find(
      (item) => item.code === form.value.logisticMethod
    );
    if (!result) {
      return;
    }
    const { day } = result;
    const dayTime = day * 24 * 60 * 60 * 1000;
    if (form.value.estimateArriveDate && form.value.estimateShipDate) {
      form.value.estimateArriveDate = '';
      form.value.estimateShipDate = '';
    }
    if (form.value.estimateArriveDate && !form.value.estimateShipDate) {
      const dateTime = new Date(form.value.estimateArriveDate).getTime();
      form.value.estimateShipDate = dayjs(dateTime - dayTime).format('YYYY-MM-DD');
    }
    if (!form.value.estimateArriveDate && form.value.estimateShipDate) {
      const dateTime = new Date(form.value.estimateShipDate).getTime();
      form.value.estimateArriveDate = dayjs(dateTime + dayTime).format('YYYY-MM-DD');
    }
  };
  const handleEstimateShipDateChange = () => {
    const result = planTurnOverLogisticsList.value.find(
      (item) => item.code === form.value.logisticMethod
    );
    if (!result) {
      return;
    }
    const { day } = result;
    const dayTime = day * 24 * 60 * 60 * 1000;
    const dateTime = new Date(form.value.estimateShipDate).getTime();
    form.value.estimateArriveDate = dayjs(dateTime + dayTime).format('YYYY-MM-DD');
  };
  const handleEstimateArriveDateChange = () => {
    const result = planTurnOverLogisticsList.value.find(
      (item) => item.code === form.value.logisticMethod
    );
    if (!result) {
      return;
    }
    const { day } = result;
    const dayTime = day * 24 * 60 * 60 * 1000;
    const dateTime = new Date(form.value.estimateArriveDate).getTime();
    form.value.estimateShipDate = dayjs(dateTime - dayTime).format('YYYY-MM-DD');
  };
  const emits = defineEmits<{
    (ev: string);
  }>();
  defineExpose({
    open,
  });
</script>

<style scoped lang="scss">
  .logistics-dialog {
    .form-row {
      position: relative;
      .remove-icon {
        position: absolute;
        right: -16px;
        top: 50%;
        transform: translate3d(0, -50%, 0);
        font-size: 0;
        color: #d1d1d1;
        cursor: pointer;
        .el-icon {
          font-size: 18px;
        }
      }
      &:hover {
        .remove-icon {
          color: inherit;
        }
      }
    }
  }
</style>
