<template>
  <KeenCard>
    <AuditHeader :flowName="form.flowBaseInfo?.name" :authNodeList="form.authNodeList" />
  </KeenCard>
  <el-form :model="form" ref="formRef" label-width="150px">
    <el-tabs v-model="activated" tab-position="top">
      <el-tab-pane label="申购信息" :name="1">
        <KeenCard title="基本信息" position="start">
          <el-row :gutter="20">
            <el-col :md="8" :sm="12" :offset="0">
              <el-form-item label="申购单号：">
                {{ form?.baseInfo.code || '-' }}
              </el-form-item>
            </el-col>
            <el-col :md="8" :sm="12" :offset="0">
              <el-form-item label="采购申请类型：">
                {{ form?.baseInfo.typeDesc || '-' }}
              </el-form-item>
            </el-col>
            <el-col :md="8" :sm="12" :offset="0">
              <el-form-item label="采购仓库：">
                {{ form?.baseInfo.warehouseDesc || '-' }}
              </el-form-item>
            </el-col>
            <el-col :md="8" :sm="12" :offset="0">
              <el-form-item label="采购负责人：">
                {{ form?.baseInfo.purchaserDesc || '-' }}
              </el-form-item>
            </el-col>
            <el-col :md="8" :sm="12" :offset="0">
              <el-form-item label="币别：">
                {{ form?.baseInfo.currencyDesc || '-' }}
              </el-form-item>
            </el-col>
            <el-col :md="8" :sm="12" :offset="0">
              <el-form-item label="申购时间：">
                {{ form?.baseInfo.submitTime || '-' }}
              </el-form-item>
            </el-col>
            <!--            <el-col :md="8" :sm="12" :offset="0">
              <el-form-item label="企企通采购单号：">
                <div v-for="item in form?.baseInfo.srmPoCode || ['-']" :key="item">{{ item }}</div>
              </el-form-item>
            </el-col>
            <el-col :md="8" :sm="12" :offset="0">
              <el-form-item label="易仓采购单号：">
                <div v-for="item in form?.baseInfo.ecPoCode || ['-']" :key="item">{{ item }}</div>
              </el-form-item>
            </el-col>-->
            <el-col :md="8" :sm="12" :offset="0">
              <el-form-item label="备注：">
                {{ form?.baseInfo.remark || '-' }}
              </el-form-item>
            </el-col>
          </el-row>
        </KeenCard>
        <KeenCard title="产品明细">
          <el-table :data="form.itemList" class="mt30">
            <el-table-column prop="productSku" min-width="240px" label="供应链SKU" />
            <el-table-column prop="productName" min-width="240px" label="产品名称" />
            <el-table-column prop="skuCode" min-width="200px" label="产品SKU" />
            <el-table-column prop="supplierName" min-width="240px" label="供应商名称" />
            <el-table-column prop="suggestQty" min-width="240px" label="建议需求数量" />
            <el-table-column prop="qty" min-width="240px" label="申购数量" />
            <el-table-column prop="purchaseIsFisrtDesc" min-width="160px" label="是否首单" />
            <el-table-column prop="deliveryTime" min-width="240px" label="交付时间" />
            <el-table-column label="状态" prop="statusDesc">
              <template #default="{ row }">
                <Tag v-if="row.statusDesc2" :color="statusColorMap[row.statusDesc2]">
                  {{ row.statusDesc2 }}
                </Tag>
                <span v-else>{{ '--' }}</span>
              </template>
            </el-table-column>
            <el-table-column prop="remark" min-width="240px" label="备注" />
          </el-table>
        </KeenCard>
      </el-tab-pane>
      <el-tab-pane label="日志信息" :name="2">
        <vxe-table auto-resize style="background-color: #fff" :data="form.authLogList" class="mt30">
          <vxe-table-column field="name" title="日志名称" />
          <vxe-table-column field="updateTime" title="更新时间" />
          <vxe-table-column field="operatorName" title="操作人" />
          <vxe-table-column field="remark" title="备注" />
        </vxe-table>
      </el-tab-pane>
      <el-tab-pane label="采购订单" :name="3">
        <h4 v-if="form?.baseInfo.code" class="ps-2 mt30">{{ `#${form?.baseInfo.code}` }}</h4>
        <vxe-table auto-resize style="background-color: #fff" :data="form.poDetailItems">
          <vxe-table-column field="srmPoCode" title="企企通采购单号" />
          <vxe-table-column field="ecPoCode" title="易仓采购单号" />
          <vxe-table-column field="productSku" title="供应链SKU" />
          <vxe-table-column field="productName" title="产品名称" />
          <vxe-table-column field="supplierName" title="供应商名称" />
          <vxe-table-column field="skuCode" title="产品SKU" />
        </vxe-table>
      </el-tab-pane>
    </el-tabs>
  </el-form>
</template>

<script setup lang="ts" name="subscriptionDetail">
  import { FormInstance } from 'element-plus';
  import { erpApi } from '@/api';
  import { PrDetailQueryResp } from '@/api/erp/data-contracts';

  const statusColorMap = {
    待订单: 'yellow',
    部分转订单: 'purple',
    未知: 'black',
    全部转订单: 'green',
  };

  const activated = ref(1);
  const route = useRoute();
  const router = useRouter();
  const formRef = ref<FormInstance>();
  const form = ref<PrDetailQueryResp>({
    baseInfo: {},
    itemList: [],
    flowBaseInfo: {},
    pass: undefined,
    remark: undefined,
  });

  const getDetailData = async () => {
    if (route.query.code) {
      form.value = await erpApi.luteosErpPrQueryDetail({
        code: route.query.code as string,
      });
    }
  };
  getDetailData();
</script>

<style scoped lang="scss">
  .mt30 {
    margin-top: 30px;
  }
</style>
