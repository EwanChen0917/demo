<template>
  <AuditHeader :flowName="detailData.flowBaseInfo?.name" :authNodeList="detailData.authNodeList" />
  <el-tabs v-model="activeTab" tab-position="top">
    <el-tab-pane label="预测信息" :name="1">
      <KeenCard>
        <el-descriptions border :column="3">
          <el-descriptions-item label="创建人">
            {{ detailData.baseInfo.creator }}
          </el-descriptions-item>
          <el-descriptions-item label="部门">
            {{ detailData.baseInfo.deptName }}
          </el-descriptions-item>
          <el-descriptions-item label="创建时间">
            {{ detailData.baseInfo.createTime }}
          </el-descriptions-item>
          <el-descriptions-item label="异常原因">
            <template v-if="detailData.baseInfo.errorRemark">
              <div class="text-danger">
                <el-text type="danger">{{ detailData.baseInfo.errorRemark }}</el-text>
              </div>
            </template>
            <span v-else>-</span>
          </el-descriptions-item>
          <el-descriptions-item label="审核结果">
            {{ detailData.baseInfo.auditResult }}
          </el-descriptions-item>
          <!--          <el-descriptions-item label="审核失败型号">
            {{ detailData.baseInfo.noPassModelList?.join(',') }}
          </el-descriptions-item>-->
          <el-descriptions-item label="审核备注">
            {{ detailData.baseInfo.auditRemark }}
          </el-descriptions-item>
        </el-descriptions>
        <el-table
          max-height="500px"
          :data="detailData?.groupItemBeanLinkedList"
          v-loading="listLoading"
          v-if="!isRetail"
        >
          <el-table-column type="expand" fixed>
            <template #default="props">
              <div class="ps-20">
                <el-table :data="props?.row?.recordList">
                  <el-table-column label="预测编码" prop="code" min-width="160" />
                  <el-table-column label="产品名称/产品SKU" prop="productName" min-width="200">
                    <template #default="{ row }">
                      <div>{{ row?.productName }}</div>
                      <div>{{ row?.skuCode }}</div>
                    </template>
                  </el-table-column>
                  <el-table-column width="100px" prop="salesStatusDesc" label="销售状态">
                    <template #default="{ row }">
                      <Tag :color="saleStatusColorMap[row.salesStatus]">
                        {{ row.salesStatusDesc }}
                      </Tag>
                    </template>
                  </el-table-column>
                  <!--                  <el-table-column width="140px" prop="skuLabelsDesc" label="在线商品标签" />-->
                  <el-table-column prop="channelDesc" label="渠道" />
                  <el-table-column prop="country" label="站点" />
                  <el-table-column prop="shop" label="店铺账号" />
                  <el-table-column prop="operatorName" label="运营" />
                  <el-table-column prop="plannerName" label="计划" />
                  <el-table-column prop="lastWeekSales" label="上周销量" />
                  <template v-if="props.row?.recordList?.length">
                    <el-table-column
                      width="140px"
                      :label="column.week"
                      :key="column.week"
                      v-for="(column, index) of props.row?.recordList[0]
                        .salesForecastItemWeekBeanList"
                    >
                      <template #default="{ $index }">
                        {{
                          props.row?.recordList[$index].salesForecastItemWeekBeanList[index]?.value
                        }}
                      </template>
                    </el-table-column>
                    <el-table-column
                      width="140px"
                      :label="column.incrName"
                      :key="column.incrId"
                      v-for="(column, index) of props.row?.recordList[0].activeIncrList?.filter(
                        (item) => item?.incrName
                      )"
                    >
                      <template #default="{ $index }">
                        {{ props.row?.recordList[$index].activeIncrList[index]?.incrValue }}
                      </template>
                    </el-table-column>
                  </template>
                </el-table>
              </div>
            </template>
          </el-table-column>
          <el-table-column label="产品型号" prop="modelName" fixed />
          <el-table-column label="预测总数" prop="total" fixed/>
          <el-table-column label="预测周均值" prop="avgTotal" fixed />
          <el-table-column label="八周预测均值" prop="avg4WeekSalesForcast" fixed />
          <el-table-column label="最近四周销量均值" prop="avg4ItemValue" fixed />
          <template v-if="detailData.groupItemBeanLinkedList?.length">
            <el-table-column
              width="140px"
              :label="column.week"
              :key="column.week"
              v-for="(column, index) of detailData.groupItemBeanLinkedList[0]
                .salesForecastItemWeekBeanList"
            >
              <template #default="{ $index }">
                {{
                  detailData?.groupItemBeanLinkedList[$index].salesForecastItemWeekBeanList[index]
                    ?.value
                }}
              </template>
            </el-table-column>
            <el-table-column
              width="140px"
              :label="column.incrName"
              :key="column.incrId"
              v-for="(
                column, index
              ) of detailData.groupItemBeanLinkedList[0].activeIncrList?.filter(
                (item) => item?.incrName
              )"
            >
              <template #default="{ $index }">
                {{ detailData?.groupItemBeanLinkedList[$index].activeIncrList[index]?.incrValue }}
              </template>
            </el-table-column>
          </template>
        </el-table>
        <el-table v-if="isRetail" :data="detailData.itemList" row-key="model">
          <el-table-column label="产品名称" prop="productName" min-width="160">
            <template #default="{ row }">
              <OverflowTooltip :content="row.productName" :line="2" />
            </template>
          </el-table-column>
          <el-table-column label="产品SKU" prop="skuCode" min-width="120" />
          <el-table-column label="销售状态" prop="salesStatusDesc" min-width="120" />
          <el-table-column label="客户名称/客户汇总名称" prop="customerDesc" min-width="120" />
          <el-table-column label="仓库" prop="warehouseDesc" min-width="160" />
          <el-table-column label="运营" prop="operatorName" min-width="120" />
          <el-table-column label="计划" prop="plannerName" min-width="120" />
          <template v-if="detailData?.itemList?.length">
            <el-table-column
              width="140px"
              :label="column.month"
              :key="column.month"
              v-for="(column, index) of detailData?.itemList[0]
                .salesForecastItemInventoryMonthBeanList"
            >
              <template #default="{ $index }">
                {{
                  detailData?.itemList[$index].salesForecastItemInventoryMonthBeanList[index].value
                }}
              </template>
            </el-table-column>
            <el-table-column
              width="140px"
              :label="column.desc"
              :key="column.desc"
              v-for="(column, index) of detailData?.itemList[0].salesList"
            >
              <template #default="{ $index }">
                {{ detailData?.itemList[$index].salesList[index].value }}
              </template>
            </el-table-column>

            <el-table-column
              width="140px"
              :label="column.week"
              :key="column.week"
              v-for="(column, index) of detailData?.itemList[0].salesForecastItemWeekBeanList"
            >
              <template #default="{ $index }">
                {{ detailData?.itemList[$index].salesForecastItemWeekBeanList[index].value }}
              </template>
            </el-table-column>
          </template>
        </el-table>
        <!--        <el-table max-height="500px" :data="detailData.itemBeanList" class-name="table-row-dashed">
          <el-table-column width="160px" prop="onlineSkuCode" label="在线商品编码" fixed="left" />
          <el-table-column width="240px" prop="productName" label="产品名称" fixed="left">
            <template #default="{ row }">
              <GoodsInfo hide-image :title="row.productName" :subtitle="row.skuCode" />
            </template>
          </el-table-column>
          <el-table-column width="200px" prop="spuCode" label="产品SPU" />
          <el-table-column width="100px" prop="salesStatusDesc" label="销售状态">
            <template #default="{ row }">
              <Tag :color="saleStatusColorMap[row.salesStatus]">{{ row.salesStatusDesc }}</Tag>
            </template>
          </el-table-column>
          <el-table-column width="140px" prop="skuLabelsDesc" label="在线商品标签" />
        </el-table>-->
      </KeenCard>
    </el-tab-pane>
    <el-tab-pane label="日志信息" :name="2">
      <KeenCard>
        <el-table max-height="500px" :data="detailData.authLogList" class-name="table-row-dashed">
          <el-table-column prop="name" label="日志名称" />
          <el-table-column prop="updateTime" label="操作时间" />
          <el-table-column prop="operatorName" label="操作人" />
          <el-table-column prop="remark" label="备注" />
        </el-table>
      </KeenCard>
    </el-tab-pane>
  </el-tabs>
  <!--  <div class="card-footer d-flex justify-content-end py-6 px-9">
      <el-space>
        <el-button type="primary" @click="router.push({ name: 'salesForecastingAudit' })">
          返回
        </el-button>
      </el-space>
    </div>-->
</template>

<script setup lang="ts">
  import { useRouter, useRoute } from 'vue-router';
  import { erpApi } from '@/api';

  const route = useRoute();
  const router = useRouter();
  const saleStatusColorMap = ref({
    1: 'green',
    2: 'red',
  });
  const statusColorMap = ref({
    0: 'green',
    1: 'red',
    2: 'yellow',
  });
  const detailData = ref<any>({
    authLogList: [
      {
        authStatus: 0,
        authTag: '',
        name: '',
        nodeCode: '',
        operator: '',
        operatorName: '',
        remark: '',
        updateTime: '',
      },
    ],
    authNodeList: [
      {
        code: '',
        name: '',
        operatorNames: [],
        operators: [],
        passAuthOperatorNames: [],
        passAuthOperators: [],
        sort: 0,
        status: 0,
        statusDesc: '',
        type: 0,
        waitAuthOperatorNames: [],
        waitAuthOperators: [],
      },
    ],
    baseInfo: {
      code: '',
      createTime: '',
      creator: '',
      creatorCode: '',
      deptId: 0,
      deptName: '',
      errorRemark: '',
      status: 0,
      statusDesc: '',
    },
    flowBaseInfo: {
      code: '',
      creator: '',
      creatorDesc: '',
      name: '',
      nodeNums: 0,
      priority: 0,
      spelExpression: '',
      status: 0,
      statusDesc: '',
      type: 0,
      typeDesc: '',
      updateTime: '',
    },
    headerList: [],
    itemBeanList: [],
  });
  const activeTab = ref(1);
  const listLoading = ref(false);
  const isRetail = computed(() => {
    return route.query.type === '2';
  });
  const getDetailData = async () => {
    try {
      listLoading.value = true;
      const { code, type } = route.query;
      const api =
        type === '1'
          ? erpApi.luteosErpSaleForecastV2AuditQueryDetail
          : erpApi.luteosErpRetailSaleForecastAuditQueryDetail;
      const res = await api({
        code: code as string,
      });
      detailData.value = res;
    } finally {
      listLoading.value = false;
    }
  };
  onMounted(() => {
    if (route.query.code) {
      getDetailData();
    }
  });
</script>

<style scoped lang="scss">
  .detail-wrapper {
    display: flex;
    font-size: 14px;
    margin-bottom: 12px;

    .label {
      flex-basis: 140px;
    }
  }
</style>
