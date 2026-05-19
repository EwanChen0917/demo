<template>
  <KeenCard>
    <h4 class="title">
      {{ `指令信息#${detailData.baseInfo.commandCode}` }}
      <Tag size="large" :color="colorMap[detailData.baseInfo.commandStatus]">
        {{ detailData.baseInfo.commandStatusDesc }}
      </Tag>
    </h4>
    <!-- <el-form label-position="top">
      <h5 class="title">基础信息</h5>
      <el-row :gutter="20">
        <el-col :span="4" :offset="0">
          <el-form-item label="供应链SKU">
            {{ detailData.supplySku }}
          </el-form-item>
        </el-col>
        <el-col :span="4" :offset="0">
          <el-form-item label="产品SKU">{{ detailData.skuCode }}</el-form-item>
        </el-col>
        <el-col :span="4" :offset="0">
          <el-form-item label="发货方式">{{ detailData.shipMethod }}</el-form-item>
        </el-col>
        <el-col :span="4" :offset="0">
          <el-form-item label="预计发货数量">{{ detailData.estimateQty }}</el-form-item>
        </el-col>
        <el-col :span="8" :offset="0">
          <el-form-item label="物流方式">{{ detailData.logisticMethod }}</el-form-item>
        </el-col>
        <el-col :span="4" :offset="0">
          <el-form-item label="预计发货时间">{{ detailData.estimateShipDate }}</el-form-item>
        </el-col>
        <el-col :span="4" :offset="0">
          <el-form-item label="预计到货时间">{{ detailData.estimateArriveDate }}</el-form-item>
        </el-col>
        <el-col :span="4" :offset="0">
          <el-form-item label="在线商品编码">{{ detailData.originalPlatformMark }}</el-form-item>
        </el-col>
        <el-col :span="4" :offset="0">
          <el-form-item label="渠道">{{ detailData.channel }}</el-form-item>
        </el-col>
        <el-col :span="8" :offset="0">
          <el-form-item label="站点">{{ detailData.site }}</el-form-item>
        </el-col>
        <el-col :span="4" :offset="0">
          <el-form-item label="计划">{{ detailData.planner }}</el-form-item>
        </el-col>
        <el-col :span="4" :offset="0">
          <el-form-item label="运营">{{ detailData.operator }}</el-form-item>
        </el-col>
      </el-row>
      <h5 class="title" style="margin-top: 20px">发货信息</h5>
      <el-row :gutter="20">
        <el-col :span="4" :offset="0">
          <el-form-item label="物流方式">
            {{ detailData.logisticMethod }}
          </el-form-item>
        </el-col>
        <el-col :span="4" :offset="0">
          <el-form-item label="实际发货数量">{{ detailData.actualShipQty }}</el-form-item>
        </el-col>
        <el-col :span="4" :offset="0">
          <el-form-item label="易仓头程计划单号">{{ detailData.planCode }}</el-form-item>
        </el-col>
        <el-col :span="4" :offset="0">
          <el-form-item label="货件编号">{{ detailData.shipmentId }}</el-form-item>
        </el-col>
        <el-col :span="8" :offset="0">
          <el-form-item label="货件追踪编号">{{ detailData.trackingCode }}</el-form-item>
        </el-col>
        <el-col :span="4" :offset="0">
          <el-form-item label="目的仓代码">{{ detailData.destinationCode }}</el-form-item>
        </el-col>
        <el-col :span="4" :offset="0">
          <el-form-item label="配送地址/收货人信息">
            {{ detailData.shipAddress }}
          </el-form-item>
        </el-col>
        <el-col :span="24" :offset="0">
          <el-form-item label="备注">{{ detailData.remark }}</el-form-item>
        </el-col>
      </el-row>
    </el-form> -->
    <el-descriptions :column="3" size="large" border>
      <el-descriptions-item label="产品SKU">{{ detailData.baseInfo.skuCode }}</el-descriptions-item>
      <el-descriptions-item label="产品名称">
        {{ detailData.baseInfo.productName }}
      </el-descriptions-item>
      <el-descriptions-item label="发货方式">
        {{ detailData.baseInfo.shipMethodDesc }}
      </el-descriptions-item>
      <el-descriptions-item label="预计发货数量">
        {{ detailData.baseInfo.estimateQty }}
      </el-descriptions-item>
      <el-descriptions-item label="物流方式">
        {{ detailData.baseInfo.logisticMethodDesc }}
      </el-descriptions-item>
      <el-descriptions-item label="预计发货时间">
        {{ detailData.baseInfo.estimateShipDate }}
      </el-descriptions-item>
      <el-descriptions-item label="预计到货时间">
        {{ detailData.baseInfo.estimateArriveDate }}
      </el-descriptions-item>
      <el-descriptions-item label="在线商品编码">
        {{ detailData.baseInfo.originalPlatformMark }}
      </el-descriptions-item>
      <el-descriptions-item label="渠道">
        {{ detailData.baseInfo.channelDesc }}
      </el-descriptions-item>
      <el-descriptions-item label="站点">{{ detailData.baseInfo.siteDesc }}</el-descriptions-item>
      <el-descriptions-item label="计划">{{ detailData.baseInfo.planer }}</el-descriptions-item>
      <el-descriptions-item label="运营">{{ detailData.baseInfo.operator }}</el-descriptions-item>
    </el-descriptions>
  </KeenCard>
  <KeenCard>
    <h4 class="title">产品明细</h4>
    <vxe-table :data="detailData.itemInfoList" min-height="100px" border="inner">
      <vxe-column field="supplySku" title="供应链SKU" />
      <vxe-column field="skuCode" title="产品SKU" />
      <vxe-column field="maxEstimateQty" title="最大发货数量" />
      <vxe-column field="inventory" title="中仓库存" />
      <vxe-column field="estimateQty" title="预计发货数量" />
    </vxe-table>
  </KeenCard>
  <KeenCard style="margin: 0 !important">
    <h4 class="title">发货信息</h4>
    <vxe-table :data="detailData.shippingInfoList" border="inner">
      <vxe-column field="shippingPlanCode" title="计划单号/货件单号" min-width="100px">
        <template #default="{ row }">
          <p>
            <a target="_blank" :href="row.shippingPlanCodeJumpUrl">{{ row.shippingPlanCode }}</a>
          </p>
          <p>
            <a target="_blank" :href="row.shippingPlanCodeJumpUrl">{{ row.shippingCode }}</a>
          </p>
        </template>
      </vxe-column>
      <vxe-column field="skuTypeCount" title="SKU种类">
        <template #default="{ row }">
          <el-button type="primary" link @click="showSkuDialog(row.shippingInfoItemList)">
            {{ row.skuTypeCount }}
          </el-button>
        </template>
      </vxe-column>
      <vxe-column field="logisticMethodDesc" title="物流方式" />
      <vxe-column field="actualShipQty" title="实际发货数量" />
      <vxe-column field="trackingCode" title="货件追踪编号" />
      <vxe-column field="destinationCode" title="目的仓代码" />
      <vxe-column field="arriveDate" title="到货时间" />
      <vxe-column field="isTransportDesc" title="是否贴透明标签" />
      <vxe-column field="shipAddress" title="配送地址/收货人信息" />
    </vxe-table>
  </KeenCard>
  <SkuDialog ref="skuDialogRef" :data-list="shippingInfoItemList" />
</template>

<script setup lang="ts" name="deliverDirectionsDetail">
  import { useRouter, useRoute } from 'vue-router';
  import { erpApi } from '@/api';
  import Tag from '@/components/Tag/index.vue';
  import SkuDialog from './components/skuDialog.vue';

  const colorMap = {
    0: 'blue',
    1: 'green',
    2: 'gray',
    3: 'yellow',
    4: 'black',
  };
  const router = useRouter();
  const route = useRoute();
  const detailData = ref<any>({
    baseInfo: {},
    shippingInfoList: [],
    itemInfoList: [],
  });
  const loading = ref(false);
  const getDetailData = async () => {
    loading.value = true;
    const res = await erpApi
      .luteosErpPlanShipCommandV2QueryDetail({
        commandCode: route.query.code as string,
      })
      .finally(() => {
        loading.value = false;
      });
    detailData.value = res as any;
  };
  const shippingInfoItemList = ref([]);
  const skuDialogRef = ref();
  const showSkuDialog = (list: []) => {
    shippingInfoItemList.value = list;
    skuDialogRef.value.open();
  };
  onMounted(() => {
    if (route.query.code) {
      getDetailData();
    }
  });
</script>

<style scoped lang="scss">
  h4.title {
    margin: 6px 0 18px;
  }

  a {
    color: #3e97ff;
  }
</style>
