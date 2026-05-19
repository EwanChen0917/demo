<template>
  <el-dialog title="发货" v-model="visibility" width="800px" :before-close="close">
    <el-form :model="form" :validate-on-rule-change="false" ref="formRef" label-position="top">
      <el-row :gutter="20">
        <el-col :span="12" :offset="0">
          <el-form-item
            label="供应链SKU"
            prop="supplySku"
            :rules="[
              {
                required: true,
                message: '请输入供应链SKU',
              },
            ]"
          >
            <el-input disabled v-model="form.supplySku" placeholder="" clearable />
          </el-form-item>
        </el-col>
        <el-col :span="12" :offset="0">
          <el-form-item
            label="产品SKU"
            prop="skuCode"
            :rules="[
              {
                required: true,
                message: '请输入产品SKU',
              },
            ]"
          >
            <el-input disabled v-model="form.skuCode" placeholder="" clearable />
          </el-form-item>
        </el-col>
        <el-col :span="12" :offset="0">
          <el-form-item
            label="在线商品编码"
            prop="originalPlatformMark"
            :rules="[
              {
                required: true,
                message: '请输入在线商品编码',
              },
            ]"
          >
            <el-input disabled v-model="form.originalPlatformMark" placeholder="" clearable />
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
              style="width: 100%"
              v-model="form.logisticMethod"
              placeholder=""
              clearable
              filterable
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
            label="实际发货数量"
            prop="actualQty"
            :rules="[
              {
                required: true,
                message: '请输入实际发货数量',
              },
            ]"
          >
            <Num v-model="form.actualQty" :precision="0" :min="0" />
          </el-form-item>
        </el-col>
        <el-col :span="12" :offset="0">
          <el-form-item
            label="易仓头程计划单号"
            prop="planCode"
            :rules="[
              {
                required: true,
                message: '请输入易仓头程计划单号',
              },
            ]"
          >
            <el-input v-model="form.planCode" placeholder="" clearable maxlength="100" />
          </el-form-item>
        </el-col>
        <el-col :span="12" :offset="0">
          <el-form-item
            label="货件编号"
            prop="shipmentId"
            :rules="[
              {
                required: true,
                message: '请输入货件编号',
              },
            ]"
          >
            <el-input v-model="form.shipmentId" placeholder="" clearable maxlength="100" />
          </el-form-item>
        </el-col>
        <el-col :span="12" :offset="0">
          <el-form-item
            label="货件追踪编号"
            prop="trackingCode"
            :rules="[
              {
                required: true,
                message: '请输入货件追踪编号',
              },
            ]"
          >
            <el-input v-model="form.trackingCode" placeholder="" clearable maxlength="100" />
          </el-form-item>
        </el-col>
        <el-col :span="12" :offset="0">
          <el-form-item
            label="配送地址/收货人信息"
            prop="shipAddress"
            :rules="[
              {
                required: true,
                message: '请输入配送地址/收货人信息',
              },
            ]"
          >
            <el-input v-model="form.shipAddress" placeholder="" clearable maxlength="100" />
          </el-form-item>
        </el-col>
        <el-col :span="12" :offset="0">
          <el-form-item
            label="目的仓仓库代码"
            prop="destinationWarehouse"
            :rules="[
              {
                required: true,
                message: '请输入目的仓仓库代码',
              },
            ]"
          >
            <el-input
              v-model="form.destinationWarehouse"
              placeholder=""
              clearable
              maxlength="100"
            />
          </el-form-item>
        </el-col>
        <el-col :span="12" :offset="0">
          <el-form-item
            label="是否贴透明计划标签"
            prop="isTransport"
            :rules="[
              {
                required: true,
                message: '请选择是否贴透明计划标签',
              },
            ]"
          >
            <el-select style="width: 100%" v-model="form.isTransport" clearable filterable>
              <el-option label="否" :value="0" />
              <el-option label="是" :value="1" />
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="24" :offset="0">
          <el-form-item
            label="备注"
            prop="remark"
            :rules="[
              {
                required: true,
                message: '请输入预测数据',
              },
            ]"
          >
            <el-input
              v-model="form.remark"
              type="textarea"
              :rows="3"
              placeholder=""
              clearable
              maxlength="100"
            />
          </el-form-item>
        </el-col>
      </el-row>
    </el-form>
    <template #footer>
      <span>
        <el-button @click="close">取消</el-button>
        <el-button type="primary" @click="confirm">确定</el-button>
      </span>
    </template>
  </el-dialog>
</template>

<script setup lang="ts">
  import { ref } from 'vue';
  import { erpApi } from '@/api';
  import { ElMessage } from 'element-plus';
  import Num from '@/components/NumberInput/index.vue';
  import { useRouter } from 'vue-router';

  const router = useRouter();
  defineProps({
    dickbook: {
      type: Object,
      default() {
        return {
          warehouse_channel: [],
        };
      },
    },
  });
  const visibility = ref(false);
  const form = ref<any>({
    actualQty: undefined,
    destinationWarehouse: '',
    isTransport: '',
    logisticMethod: '',
    originalPlatformMark: '',
    planCode: '',
    remark: '',
    shipAddress: '',
    shipmentId: '',
    skuCode: '',
    supplySku: '',
    trackingCode: '',
    commandCode: '',
  });
  const formRef = ref();
  const open = (row) => {
    form.value.supplySku = row.supplySku;
    form.value.originalPlatformMark = row.originalPlatformMark;
    form.value.skuCode = row.skuCode;
    form.value.commandCode = row.commandCode;
    form.value.logisticMethod = row.logisticMethod;
    form.value.actualQty = row.estimateQty;
    initData();
  };

  const planTurnOverLogisticsList = ref<any[]>([]);
  const initData = async () => {
    const { planTurnOverLogisticsList: planTurnOverLogisticsListData }: any =
      await erpApi.luteosErpPlanTurnoverLogisticsQueryList();
    planTurnOverLogisticsList.value = planTurnOverLogisticsListData;
    visibility.value = true;
  };
  const confirm = async () => {
    const valid = await formRef.value?.validate().catch(() => {
      return false; // 校验失败返回 false，不继续执行
    });
    if (valid) {
      await erpApi.luteosErpPlanShipCommandShip({
        ...form.value,
      });
      ElMessage.success('操作成功');
      emits('success');
      close();
    }
  };
  const close = () => {
    form.value = {
      actualQty: undefined,
      destinationWarehouse: '',
      isTransport: '',
      logisticMethod: '',
      originalPlatformMark: '',
      planCode: '',
      remark: '',
      shipAddress: '',
      shipmentId: '',
      skuCode: '',
      supplySku: '',
      trackingCode: '',
      commandCode: '',
    };
    formRef.value.resetFields();
    nextTick(() => {
      visibility.value = false;
    });
  };
  const emits = defineEmits<{
    (ev: string);
  }>();
  onMounted(() => {});
  defineExpose({
    open,
  });
</script>

<style scoped lang="scss"></style>
