<template>
  <el-dialog title="单据详情" :model-value="visible" @close="visible = false" width="70%">
    <div class="tab-box">
      <el-tabs v-model="activeName" type="card" class="demo-tabs" @tab-click="handleClick">
        <el-tab-pane label="基本信息" name="base">
          <el-form label-position="top">
            <KeenCard title="">
              <el-row :gutter="20">
                <el-col :span="6" :offset="0" v-for="(item, index) in basicList" :key="index">
                  <el-form-item :label="`${item.label}：`">
                    <span class="text-style">{{ baseInfo[item.key] || '-' }}</span>
                  </el-form-item>
                </el-col>
              </el-row>
            </KeenCard>
          </el-form>
          <el-tabs v-model="activeName_" type="card" class="demo-tabs">
            <el-tab-pane label="详情信息" name="orderDetail">
              <el-table :data="form?.purchaseOrderDetailInfos">
                <el-table-column prop="itemNumber" label="订单行号" />
                <el-table-column prop="productSku" label="产品sku" />
                <el-table-column prop="supplySku" label="供应链SKU" min-width="120px" />
                <el-table-column prop="materialName" label="物料名称" min-width="150px" />
                <el-table-column prop="qty" label="数量" />
                <el-table-column prop="netPrice" label="未税单价" />
                <el-table-column prop="price" label="含税单价" />
                <el-table-column prop="netAmount" label="未税金额" />
                <el-table-column prop="taxAmount" label="含税金额" />
                <el-table-column prop="taxRate" label="税率" />
                <el-table-column prop="freeDesc" label="是否赠品" />
                <el-table-column prop="requireDate" label="交期" min-width="150px" />
                <el-table-column prop="purchaseUnit" label="采购单位" />
                <el-table-column prop="currency" label="币种" />
              </el-table>
            </el-tab-pane>
          </el-tabs>
        </el-tab-pane>
        <el-tab-pane label="推送信息" name="push">
          <el-form label-position="top">
            <KeenCard title="">
              <el-row :gutter="20">
                <el-col :span="12" :offset="0">
                  <el-form-item label="推送金蝶状态：">
                    {{ form?.kingdeePushInfo?.pushStatusDesc || '-' }}
                    <span v-if="form?.kingdeePushInfo?.pushStatus == 2">
                      {{ `：${form?.kingdeePushInfo?.failReason}` }}
                    </span>
                  </el-form-item>
                </el-col>
                <el-col :span="8" :offset="0">
                  <el-form-item label="推送时间：">
                    {{ form?.kingdeePushInfo?.pushTime || '-' }}
                  </el-form-item>
                </el-col>
              </el-row>
            </KeenCard>
          </el-form>
        </el-tab-pane>
      </el-tabs>
    </div>
  </el-dialog>
</template>

<script setup lang="ts">
  import { financeSystemApi } from '@/api';
  import type { TabsPaneContext } from 'element-plus';

  const activeName = ref('base');
  const visible = ref(false);
  const activeName_ = ref('orderDetail');

  const handleClick = (tab: TabsPaneContext, event: Event) => {
    console.log(tab, event);
  };

  const emit = defineEmits<{
    (event: 'close'): void;
  }>();

  const form = ref({});
  const baseInfo = ref({
    code: '',
  });
  const basicList = [
    { label: '单据类型', key: 'orderTypeDesc' },
    { label: '采购组织', key: 'purchaseOrgName' },
    { label: '采购仓库', key: 'purchaseWarehouseName' },
    { label: '供应商名称', key: 'supplierName' },
    { label: '供应商ERP编码', key: 'supplierCode' },
    { label: '订单状态', key: 'orderStatusDesc' },
    { label: '付款条件', key: 'paymentClauseDesc' },
    { label: '订单日期', key: 'orderDate' },
    { label: '订单类型', key: 'sourceOrderTypeDesc' },
    { label: '发货类型', key: 'deliveryTypeDesc' },
    { label: '结算方式', key: 'accountTypeDesc' },
    { label: '订单号', key: 'poCode' },
  ];
  const getDetailData = async (code) => {
    const res = await financeSystemApi.financePurhcaseQueryPurchaseDetail({
      code,
    });
    if (res && res.constructor === Object) {
      baseInfo.value = { ...res.purchaseOrderBaseInfo };
      form.value = res;
    }
  };
  const open = (code) => {
    activeName.value = 'base';
    if (code) {
      getDetailData(code);
      visible.value = true;
    }
  };

  defineExpose({
    open,
  });
</script>

<style scoped lang="scss">
  :deep(.el-form-item__content) {
    line-height: 30px;
  }
</style>
