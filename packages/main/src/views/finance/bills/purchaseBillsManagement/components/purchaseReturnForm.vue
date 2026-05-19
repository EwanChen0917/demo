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
              <el-table :data="form?.purchaseRefundDetailInfos">
                <el-table-column prop="itemNumber" label="行号" />
                <el-table-column prop="itemStatus" label="行状态">
                  <template #default="{ row }">
                    {{ itemStatusList[Number(row.itemStatus)] }}
                  </template>
                </el-table-column>
                <el-table-column prop="materialNumber" label="产品sku" min-width="120px" />
                <el-table-column prop="productSku" label="供应链SKU" min-width="150px" />
                <el-table-column prop="productName" label="产品名称" min-width="150px" />
                <el-table-column
                  prop="refundsDefectiveQuantity"
                  label="退货次品数量"
                  min-width="120px"
                />
                <el-table-column
                  prop="refundsGoodQuantity"
                  label="退货良品数量"
                  min-width="120px"
                />
                <el-table-column label="退货数量" prop="refundsQuantity" />
                <el-table-column prop="quantity" label="订单数量" />
                <el-table-column prop="purchaseNetPrice" label="未税单价" />
                <el-table-column prop="price" label="含税单价" />
                <el-table-column prop="purchaseNetAmount" label="未税金额" />
                <el-table-column prop="purchaseTaxAmount" label="含税金额" />
                <el-table-column prop="taxRate" label="税率" />
                <el-table-column prop="freeDesc" label="是否赠品" />
                <el-table-column prop="orderNumber" label="采购单号" min-width="150px" />
                <el-table-column prop="orderItemNumber" label="采购单行号" min-width="100px" />
                <el-table-column prop="storageLocation" label="库存地点代码" min-width="120px" />
                <el-table-column prop="materialName" label="物料名称" />
                <el-table-column prop="materialNumber" label="物料编码" />
                <el-table-column prop="netPrice" label="净价" />
                <el-table-column prop="currency" label="币别" />
                <el-table-column prop="taxAmount" label="退货金额" />
                <el-table-column prop="receiveQuantity" label="收货数量" />
                <el-table-column prop="refundsDate" label="退货日期" min-width="150px" />
                <el-table-column prop="refundsDeliveryWayDesc" label="退货方式" />
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
    { label: '采购方名称', key: 'purchaseName' },
    { label: '付款条件', key: 'paymentClauseDesc' },
    { label: '采购出库单', key: 'outStockCode' },
    { label: '送货单号', key: 'deliveryCode' },
    { label: '退货时间', key: 'refundsDeliveryTime' },
    { label: '退货原因', key: 'refundsReason' },
    { label: '退货单号', key: 'orderCode' },
  ];
  const itemStatusList = ['待退货', '部分退货', '全部退货'];
  const getDetailData = async (code) => {
    const res = await financeSystemApi.financePurhcaseQueryPurchaseReturnDetail({
      code,
    });
    if (res && res.constructor === Object) {
      baseInfo.value = { ...res, ...res.purchaseOrderBaseInfo };
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
