<template>
  <AuditHeader :flowName="detailData.flowBaseInfo?.name" :authNodeList="detailData.authNodeList" />
  <KeenCard title="预测信息">
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
    </el-descriptions>
    <el-table max-height="500px" :data="detailData?.groupItemBeanLinkedList" v-if="!isRetail">
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
              <!--              <el-table-column width="140px" prop="skuLabelsDesc" label="在线商品标签" />-->
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
                  v-for="(column, index) of props.row?.recordList[0].salesForecastItemWeekBeanList"
                >
                  <template #default="{ $index }">
                    {{ props.row?.recordList[$index].salesForecastItemWeekBeanList[index]?.value }}
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
      <el-table-column label="预测总数" prop="total" fixed />
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
          v-for="(column, index) of detailData.groupItemBeanLinkedList[0].activeIncrList?.filter(
            (item) => item?.incrName
          )"
        >
          <template #default="{ $index }">
            {{ detailData?.groupItemBeanLinkedList[$index].activeIncrList[index]?.incrValue }}
          </template>
        </el-table-column>
      </template>
    </el-table>
    <el-table v-if="isRetail" :data="detailData?.itemList" row-key="model">
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
          v-for="(column, index) of detailData?.itemList[0].salesForecastItemInventoryMonthBeanList"
        >
          <template #default="{ $index }">
            {{ detailData?.itemList[$index].salesForecastItemInventoryMonthBeanList[index].value }}
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
  </KeenCard>
  <KeenCard title="审核内容">
    <el-row :gutter="20">
      <el-col :span="12" :xs="24" :offset="0">
        <el-form :model="form" ref="formRef">
          <el-form-item
            label="审核结果"
            prop="pass"
            :rules="[{ required: true, message: '请选择审核结果', trigger: 'change' }]"
          >
            <el-radio-group v-model="form.pass">
              <el-radio :label="1">审核通过</el-radio>
              <el-radio :label="0">审核不通过</el-radio>
              <!--              <el-radio :label="2">部分审核通过</el-radio>-->
            </el-radio-group>
          </el-form-item>
          <!--          <el-form-item
            v-if="form.pass === 2"
            label="选择型号"
            prop="modelList"
            :rules="[{ required: true, message: '请选择型号', trigger: 'change' }]"
          >
            <el-select v-model="form.modelList" multiple placeholder="请选择型号">
              <el-option
                v-for="item in detailData.groupItemBeanLinkedList"
                :key="item.model"
                :label="item.modelName"
                :value="item.model"
              />
            </el-select>
          </el-form-item>-->
          <el-form-item label="备注">
            <el-input v-model="form.remark" placeholder="" type="textarea" :rows="4" />
          </el-form-item>
        </el-form>
      </el-col>
    </el-row>
  </KeenCard>
  <div class="card-footer d-flex justify-content-end py-6 px-9">
    <el-space>
      <el-button @click="cancel">取消</el-button>
      <el-button type="primary" @click="confirm" :loading="loading || saveLoading">确认</el-button>
    </el-space>
  </div>
</template>

<script setup lang="ts">
  import { useRouter, useRoute } from 'vue-router';
  import { erpApi } from '@/api';
  import { ElMessage } from 'element-plus';
  import { useTabs } from '@/hooks/tabs';

  const { closeTabAndRefresh } = useTabs();
  const route = useRoute();
  const saleStatusColorMap = ref({
    1: 'green',
    2: 'red',
  });
  const statusColorMap = ref({
    0: 'green',
    1: 'red',
    2: 'yellow',
  });
  const isRetail = computed(() => {
    return route.query.type === '2';
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
    groupItemBeanLinkedList: [],
  });
  const form = ref({
    pass: '',
    remark: '',
    modelList: [],
  });

  const loading = ref(false);
  const getDetailData = async () => {
    try {
      loading.value = true;
      const { code, type } = route.query;
      const api =
        type === '1'
          ? erpApi.luteosErpSaleForecastV2AuditQueryDetail
          : erpApi.luteosErpRetailSaleForecastAuditQueryDetail;
      const res = await api({
        code: code as string,
      });
      if (res.baseInfo.status !== 0) {
        router.push({
          path: '/salesForecastingAudit/detail',
          query: { code: code as string, type: type as string },
        });
      }
      detailData.value = res;
    } finally {
      loading.value = false;
    }
  };

  const formRef = ref();
  const saveLoading = ref(false);
  const confirm = async () => {
    const valid = await formRef.value?.validate().catch(() => {
      return false; // 校验失败返回 false，不继续执行
    });
    if (valid) {
      try {
        saveLoading.value = true;
        await erpApi.luteosErpSaleForecastV2Audit({
          code: detailData.value.baseInfo.code,
          pass: !!form.value.pass,
          remark: form.value.remark,
          modelList: form.value.modelList,
        });
        ElMessage.success('操作成功');
        closeTabAndRefresh('salesForecastingAudit');
        cancel();
      } finally {
        saveLoading.value = false;
      }
    }
  };
  const router = useRouter();
  const cancel = () => {
    router.push({ name: 'salesForecastingAudit' });
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
