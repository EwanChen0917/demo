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
              <el-table :data="form?.purchaseInStockDetailInfos">
                <el-table-column prop="lineNumber" label="行号" />
                <el-table-column prop="skuCode" label="产品sku" min-width="120px" />
                <el-table-column prop="supplySku" label="供应链SKU" min-width="120px" />
                <el-table-column prop="productName" label="产品名称" />
                <el-table-column prop="shelvedGoodQuantity" label="入库良品" />
                <el-table-column prop="shelvedDefectiveQuantity" label="入库次品" />
                <el-table-column
                  prop="purchaseInboundQuantity"
                  label="采购入库量"
                  min-width="120px"
                />
                <el-table-column prop="netPrice" label="未税单价" />
                <el-table-column prop="price" label="含税单价" />
                <el-table-column prop="netAmount" label="未税金额" />
                <el-table-column prop="taxAmount" label="含税金额" />
                <el-table-column prop="taxRate" label="税率" />
                <el-table-column prop="freeDesc" label="是否赠品" />
                <el-table-column prop="shelvingTime" label="上架时间" min-width="150px" />
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

  const visible = ref(false);
  const activeName = ref('base');
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
    { label: '状态', key: 'orderStatusDesc' },
    { label: '采购单号', key: 'poCode' },
    { label: '付款条件', key: 'paymentClauseDesc' },
    { label: '送货单号', key: 'deliveryCode' },
    { label: '收货单号', key: 'receiveCode' },
    { label: '采购入库单号', key: 'orderCode' },
  ];

  const getDetailData = async (code) => {
    const res = await financeSystemApi.financePurhcaseQueryPurchaseInStockDetail({
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
