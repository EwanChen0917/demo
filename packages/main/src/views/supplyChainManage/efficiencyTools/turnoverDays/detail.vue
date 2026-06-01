<template>
  <el-form
    ref="formRef"
    label-position="top"
    label-width="150"
    scroll-to-error
    hide-required-asterisk
  >
    <KeenCard :title="detailData.planTurnOver.skuCode" v-loading="loading">
      <el-row :gutter="20">
        <el-col :span="4" :xs="12" :offset="0">
          <el-form-item label="产品名称">{{ detailData.planTurnOver.skuName }}</el-form-item>
        </el-col>
        <el-col :span="4" :xs="12" :offset="0">
          <el-form-item label="渠道">{{ detailData.planTurnOver.channelDesc }}</el-form-item>
        </el-col>
        <el-col :span="4" :xs="12" :offset="0">
          <el-form-item label="站点">{{ detailData.planTurnOver.countryDesc }}</el-form-item>
        </el-col>
        <el-col :span="4" :xs="12" :offset="0">
          <el-form-item label="计划">{{ detailData.planTurnOver.planer }}</el-form-item>
        </el-col>
        <el-col :span="8" :xs="12" :offset="0">
          <el-form-item label="周转状态">
            <Tag :color="statusColorMap[detailData.planTurnOver.status]">
              {{ detailData.planTurnOver.statusDesc }}
            </Tag>
          </el-form-item>
        </el-col>
        <el-col :span="4" :xs="12" :offset="0">
          <el-form-item label="当前周数">{{ detailData.planTurnOver.currentWeek }}</el-form-item>
        </el-col>
        <el-col :span="4" :xs="12" :offset="0">
          <el-form-item label="总供应周期">{{ detailData.planTurnOver.supplyCycle }}</el-form-item>
        </el-col>
        <el-col :span="4" :xs="12" :offset="0">
          <el-form-item label="在线商品编码">
            {{ detailData.planTurnOver.originalPlatformMark }}
          </el-form-item>
        </el-col>
        <el-col :span="4" :xs="12" :offset="0">
          <el-form-item label="运营">{{ detailData.planTurnOver.operator }}</el-form-item>
        </el-col>
      </el-row>

      <el-tabs v-model="tabCurrent">
        <el-tab-pane label="周转天数" :name="0">
          <KeenCard>
            <el-table :data="detailData.weekItemList" max-height="600px">
              <el-table-column prop="week" label="周数" />
              <el-table-column prop="turnoverDay" label="周转天数">
                <template #default="{ row }">
                  <span
                    class="turnoverDayColor"
                    :class="turnoverDayColorMap[row.turnoverDayColorCode]"
                  >
                    {{ row.turnoverDay }}
                  </span>
                </template>
              </el-table-column>
              <el-table-column prop="platformBeginInventory" label="平台期初库存" />
              <el-table-column prop="platformEndInventory" label="平台期末库存" />
              <el-table-column prop="shipmentTransitInventory" label="货件在途库存" />
              <el-table-column prop="shippingCommondWaitSendNum" label="发货指令待发数量" />
              <el-table-column prop="forecastNum" label="预测销量" />
              <el-table-column prop="shipmentNum" label="货件到货数量" />
              <el-table-column prop="shipmentDelayedTransitNum" label="货件在途延期" />
            </el-table>
          </KeenCard>
        </el-tab-pane>
        <el-tab-pane label="近期销量" :name="1">
          <KeenCard>
            <el-row :gutter="20">
              <el-col
                :sm="4"
                :xs="12"
                :offset="0"
                v-for="(item, index) of detailData.recentlySalesVolumeList"
                :key="index"
              >
                <el-form-item :label="item[0]">{{ item[1] }}</el-form-item>
              </el-col>
            </el-row>
          </KeenCard>
        </el-tab-pane>
        <el-tab-pane label="中仓库存" :name="2">
          <KeenCard>
            <el-table :data="detailData.centreInventoryItemList" max-height="600px">
              <el-table-column prop="warehouseName" label="仓库名称" min-width="240" />
              <el-table-column prop="warehouseCode" label="仓库代码" />
              <el-table-column prop="supplySku" label="供应链SKU" />
              <el-table-column prop="inventory" label="中仓库存" />
              <el-table-column prop="transitInventory" label="在途库存" />
            </el-table>
          </KeenCard>
        </el-tab-pane>
      </el-tabs>
    </KeenCard>
  </el-form>

  <!-- <div class="card-footer d-flex justify-content-end py-6 px-9">
    <el-space>
      <el-button @click="router.push({ name: 'turnoverDays' })">取消</el-button>
      <el-button type="primary" @click="deliverDialogRef?.open">发货指令</el-button>
    </el-space>
  </div>
  <DeliverDialog ref="deliverDialogRef" /> -->
</template>

<script setup lang="ts" name="turnoverDaysDetail">
  import { useRouter, useRoute } from 'vue-router';
  import { erpApi } from '@/api';
  import Tag from '@/components/Tag/index.vue';
  import DeliverDialog from './components/deliverDialog.vue';

  const statusColorMap = ref({
    0: 'green',
    1: 'red',
    2: 'yellow',
  });
  const turnoverDayColorMap = ref({
    0: 'black',
    1: 'red',
    2: 'yellow',
    3: 'green',
  });
  const router = useRouter();
  const route = useRoute();
  const tabCurrent = ref(0);
  const deliverDialogRef = ref();
  const detailData = ref<any>({
    centreInventoryItemList: [],
    planTurnOver: { strategy: {} },
    recentlySalesVolumeList: [],
    weekItemList: [],
  });
  const loading = ref(false);
  const getDetailData = async () => {
    loading.value = true;
    const res = await erpApi
      .luteosErpPlanTurnoverQueryDetail({
        code: route.query.code as string,
      })
      .finally(() => {
        loading.value = false;
      });
    detailData.value = res as any;
  };
  onMounted(() => {
    if (route.query.code) {
      getDetailData();
    }
  });
</script>

<style scoped lang="scss">
  .turnoverDayColor {
    // border: none;
    // height: 28px;
    &.red {
      color: #f1416c;
    }

    &.blue {
      color: #009ef7;
    }

    &.yellow {
      color: #ffc700;
    }

    &.green {
      color: #50cd89;
    }

    &.gray {
      color: #dbdfe9;
    }

    &.purple {
      color: #7239ea;
    }

    &.black {
      color: #071437;
    }
  }
</style>
