<template>
  <el-form>
    <KeenCard>
      <div class="d-flex justify-content-between">
        <el-row class="me-10 flex-grow-1">
          <el-col :md="12" :lg="8" style="min-width: max-content">
            <el-form-item label="RPE仓配单号：">
              <span>{{ baseInfo?.woCode }}</span>
            </el-form-item>
          </el-col>
          <el-col :md="12" :lg="8" style="min-width: max-content">
            <el-form-item label="仓配系统销售单号：">
              <span>{{ baseInfo?.systemSaleCode }}</span>
            </el-form-item>
          </el-col>
          <el-col :md="12" :lg="8" style="min-width: max-content">
            <el-form-item label="仓配系统订单号：">
              <span>{{ baseInfo?.systemCode }}</span>
            </el-form-item>
          </el-col>
        </el-row>
        <el-button
          v-if="baseInfo?.status === 300"
          type="primary"
          size="small"
          @click="downloadDetail"
        >
          下载拣货单文件
        </el-button>
      </div>

      <el-steps :active="curStep" finish-status="success">
        <el-step title="创建" :description="baseInfo?.createTime" />
        <el-step title="待处理" :description="baseInfo?.handleTime" />
        <el-step title="待出库" :description="baseInfo?.outTime" />
        <el-step title="已出库" :description="baseInfo?.finishTime" />
      </el-steps>
    </KeenCard>
    <KeenCard title="客户信息">
      <el-row>
        <el-col :md="12" :lg="8">
          <el-form-item label="收件人：">
            <span>{{ customerInfo?.receiveName }}</span>
          </el-form-item>
        </el-col>
        <el-col :md="12" :lg="8">
          <el-form-item label="收件人号码：">
            <span>{{ customerInfo?.receivePhone }}</span>
          </el-form-item>
        </el-col>
        <el-col :md="12" :lg="8">
          <el-form-item label="邮编：">
            <span>{{ customerInfo?.receiveZipCode }}</span>
          </el-form-item>
        </el-col>
        <el-col :md="24" :lg="24">
          <el-form-item label="收件人地址：">
            <span>{{ customerInfo?.receiveAddress }}</span>
          </el-form-item>
        </el-col>
      </el-row>
    </KeenCard>
    <KeenCard title="订单信息">
      <el-row>
        <el-col :md="12" :lg="8">
          <el-form-item label="创建时间：">
            <span>{{ baseInfo?.saleOrderCreateTime }}</span>
          </el-form-item>
        </el-col>
        <el-col :md="12" :lg="8">
          <el-form-item label="货代：">
            <span>{{ baseInfo?.freightForwarding || '-' }}</span>
          </el-form-item>
        </el-col>
        <el-col :md="12" :lg="8">
          <el-form-item label="渠道：">
            <span>{{ baseInfo?.freightForwardingChannelDesc || '-' }}</span>
          </el-form-item>
        </el-col>
        <el-col :md="12" :lg="8">
          <el-form-item label="物流跟踪号：">
            <span>{{ baseInfo?.trackingNum || '-' }}</span>
          </el-form-item>
        </el-col>
        <el-col :md="12" :lg="8">
          <el-form-item label="产品品数项：">
            <span>{{ baseInfo?.itemCount || '-' }}</span>
          </el-form-item>
        </el-col>
        <el-col :md="12" :lg="8">
          <el-form-item label="产品总数量：">
            <span>{{ baseInfo?.skuCount || '-' }}</span>
          </el-form-item>
        </el-col>
        <el-col :md="24" :lg="24">
          <el-form-item label="发货需求：">
            <span>{{ baseInfo?.sendDemand || '-' }}</span>
          </el-form-item>
        </el-col>
      </el-row>
    </KeenCard>
    <KeenCard title="产品信息">
      <el-table :data="itemInfoList">
        <el-table-column type="index" label="序号" width="70px" />
        <el-table-column label="产品名称" prop="productName" min-width="180" />
        <el-table-column label="产品SKU" prop="skuCode" min-width="120" />
        <el-table-column label="供应链SKU" prop="productSku" min-width="130" />
        <el-table-column label="数量" prop="qty" />
        <el-table-column label="UPC码" prop="upc" min-width="120" />
        <el-table-column label="UPC码文件" min-width="140">
          <template #default="{ row }">
            <el-link
              style="word-break: break-all"
              type="primary"
              :underline="false"
              :href="row?.upcAttachment?.fileUrl"
              target="_blank"
            >
              {{ row?.upcAttachment?.fileName }}
            </el-link>
          </template>
        </el-table-column>
        <el-table-column label="EAN码" prop="ean" min-width="120" />
        <el-table-column label="EAN码文件" min-width="140">
          <template #default="{ row }">
            <el-link
              style="word-break: break-all"
              type="primary"
              :underline="false"
              :href="row?.eanAttachment?.fileUrl"
              target="_blank"
            >
              {{ row?.eanAttachment?.fileName }}
            </el-link>
          </template>
        </el-table-column>
      </el-table>
    </KeenCard>
    <KeenCard title="附件信息">
      <el-row>
        <el-col :md="12" :lg="8">
          <el-form-item label="物流文件：">
            <div class="w-100" v-for="item in baseInfo?.logisticsAtt" :key="item?.ossKey">
              <el-link type="primary" :underline="false" :href="item?.fileUrl" target="_blank">
                {{ item?.fileName }}
              </el-link>
            </div>
          </el-form-item>
        </el-col>
        <el-col :md="12" :lg="8" v-if="baseInfo?.packingAtt?.length">
          <el-form-item label="装箱单文件：">
            <div class="w-100" v-for="item in baseInfo?.packingAtt" :key="item?.ossKey">
              <el-link type="primary" :underline="false" :href="item?.fileUrl" target="_blank">
                {{ item?.fileName }}
              </el-link>
            </div>
          </el-form-item>
        </el-col>
        <el-col :md="12" :lg="8">
          <el-form-item label="备注：">
            <span>{{ baseInfo.remark }}</span>
          </el-form-item>
        </el-col>
      </el-row>
    </KeenCard>
  </el-form>
</template>

<script setup lang="ts" name="selfFulfilledOrderDetail">
  import { erpApi } from '@/api';
  import { openWindow } from '@/utils';
  import { ElMessage } from 'element-plus';

  const route = useRoute();
  const baseInfo = ref({});
  const customerInfo = ref({});
  const itemInfoList = ref([]);
  const curStep = ref(1);
  const stepMap = {
    200: 1,
    300: 2,
    400: 4,
  };
  const queryDetail = async () => {
    const res = await erpApi.luteosErpOdoQueryDetail({
      code: route.query?.code as string,
    });
    baseInfo.value = res?.detailResp?.baseInfo;
    customerInfo.value = res?.detailResp?.customerInfo;
    itemInfoList.value = res?.detailResp?.itemInfoList;
    curStep.value = stepMap[baseInfo.value?.status];
  };

  queryDetail();

  const downloadDetail = async () => {
    const res = await erpApi.luteosErpOdoDownDetail({
      code: route.query?.code as string,
    });
    if (res) {
      openWindow(res);
    } else {
      ElMessage.error('下载失败');
    }
  };
</script>

<style scoped lang="scss">
  :deep(.el-step__icon-inner.is-status) {
    transform: translateY(0);
  }
</style>
