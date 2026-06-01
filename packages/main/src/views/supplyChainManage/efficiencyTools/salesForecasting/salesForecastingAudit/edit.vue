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
    <el-form :model="detailData" ref="formRef" scroll-to-error>
      <el-table
        max-height="500px"
        :data="detailData?.groupItemBeanLinkedList"
        row-key="model"
        v-if="!isRetail"
      >
        <el-table-column type="expand">
          <template #default="props">
            <div class="ps-20">
              <el-table :data="props?.row?.recordList">
                <el-table-column label="预测编码" prop="code" min-width="160" />
                <el-table-column label="预测编码" min-width="160">
                  <template #default="{ row }">
                    {{ props.$index }}
                  </template>
                </el-table-column>
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
                <!--                <el-table-column width="140px" prop="skuLabelsDesc" label="在线商品标签" />-->
                <el-table-column prop="channelDesc" label="渠道" />
                <el-table-column prop="country" label="站点" />
                <el-table-column prop="shop" label="店铺账号" />
                <el-table-column prop="operatorName" label="运营" />
                <el-table-column prop="plannerName" label="计划" />
                <el-table-column prop="lastWeekSales" label="上周销量" />
                <template v-if="props.row?.recordList?.length">
                  <!--                <el-table-column
                  width="140px"
                  :label="column.week"
                  :key="column.week + '-' + index"
                  v-for="(column, index) of props.row?.recordList[0].salesForecastItemWeekBeanList"
                >
                  <template #default="{ $index }">
                    {{ props.row?.recordList[$index].salesForecastItemWeekBeanList[index]?.value }}
                  </template>
                </el-table-column>-->

                  <el-table-column
                    width="140px"
                    :label="column.week"
                    :key="column.week + '-' + index"
                    v-for="(column, index) of props.row?.recordList[0]
                      .salesForecastItemWeekBeanList"
                  >
                    <template #default="{ $index }">
                      <el-form-item
                        style="margin: 0"
                        :prop="`groupItemBeanLinkedList[${props.$index}].recordList[${$index}].salesForecastItemWeekBeanList[${index}].value`"
                        :rules="[{ required: true, message: '', trigger: ['blur', 'change'] }]"
                      >
                        <NumberInput
                          v-model="
                            detailData.groupItemBeanLinkedList[props.$index].recordList[$index]
                              .salesForecastItemWeekBeanList[index].value
                          "
                          :precision="0"
                          :min="0"
                          :max="999999"
                        />
                      </el-form-item>
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
                      <el-form-item
                        style="margin: 0"
                        :prop="`groupItemBeanLinkedList[${props.$index}].recordList[${$index}].activeIncrList[${index}].incrValue`"
                        :rules="[{ required: true, message: '', trigger: ['blur', 'change'] }]"
                      >
                        <NumberInput
                          v-model="
                            detailData.groupItemBeanLinkedList[props.$index].recordList[$index]
                              .activeIncrList[index].incrValue
                          "
                          :precision="0"
                          :min="0"
                          :max="999999"
                        />
                      </el-form-item>
                    </template>
                  </el-table-column>
                </template>
                <el-table-column align="left" label="操作" width="80px" fixed="right">
                  <template #default="{ row }">
                    <KeenActions
                      display-style="buttons"
                      :actions="[
                        {
                          label: '自动填充',
                          key: 'autoComplete',
                          type: 'primary',
                          text: true,
                          row,
                        },
                      ]"
                      @click="handleActions"
                    />
                  </template>
                </el-table-column>
              </el-table>
            </div>
          </template>
        </el-table-column>
        <el-table-column label="产品型号" prop="modelName" />
        <el-table-column label="预测总数" prop="total" />
        <el-table-column label="预测周均值" prop="avgTotal" />
        <el-table-column label="八周预测均值" prop="avg4WeekSalesForcast" />
        <el-table-column label="最近四周销量均值" prop="avg4ItemValue" />
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
            v-for="(column, index) of detailData.itemList[0]
              .salesForecastItemInventoryMonthBeanList"
          >
            <template #default="{ $index }">
              <el-form-item
                style="margin: 0"
                :prop="`itemList[${$index}].salesForecastItemInventoryMonthBeanList[${index}].value`"
                :rules="[{ required: true, message: '', trigger: ['blur', 'change'] }]"
              >
                <NumberInput
                  v-model="
                    detailData.itemList[$index].salesForecastItemInventoryMonthBeanList[index].value
                  "
                  :precision="0"
                  :min="0"
                  :max="999999"
                />
              </el-form-item>
            </template>
          </el-table-column>
          <!-- <el-table-column
            width="140px"
            :label="column.desc"
            :key="column.desc"
            v-for="(column, index) of detailData?.itemList[0].salesList"
          >
            <template #default="{ $index }">
              <el-form-item
                style="margin: 0"
                :prop="`detailData.itemList[${$index}].salesList[${index}].value`"
                :rules="[{ required: true, message: '', trigger: ['blur', 'change'] }]"
              >
                <NumberInput
                  v-model="detailData.itemList[$index].salesList[index].value"
                  :precision="0"
                  :min="0"
                  :max="999999"
                />
              </el-form-item>
            </template>
          </el-table-column> -->
          <el-table-column
            width="140px"
            :label="column.week"
            :key="column.week"
            v-for="(column, index) of detailData.itemList[0].salesForecastItemWeekBeanList"
          >
            <template #default="{ $index }">
              <el-form-item
                style="margin: 0"
                :prop="`itemList[${$index}].salesForecastItemWeekBeanList[${index}].value`"
                :rules="[{ required: true, message: '', trigger: ['blur', 'change'] }]"
              >
                <NumberInput
                  v-model="detailData.itemList[$index].salesForecastItemWeekBeanList[index].value"
                  :precision="0"
                  :min="0"
                  :max="999999"
                />
              </el-form-item>
            </template>
          </el-table-column>
          <el-table-column align="left" label="操作" width="80px" fixed="right">
            <template #default="{ row }">
              <KeenActions
                display-style="buttons"
                :actions="[
                  {
                    label: '自动填充',
                    key: 'autoComplete',
                    type: 'primary',
                    text: true,
                    row,
                  },
                ]"
                @click="handleRetailActions"
              />
            </template>
          </el-table-column>
        </template>
      </el-table>
    </el-form>
  </KeenCard>
  <div class="card-footer d-flex justify-content-end py-6 px-9">
    <el-space>
      <el-button @click="cancel">取消</el-button>
      <el-button type="primary" @click="autoComplete">全部自动填充</el-button>
      <el-button type="primary" :loading="confirmLoading" @click="confirm">确定</el-button>
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
  const formRef = ref();
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
  const isRetail = computed(() => {
    return route.query.type === '2';
  });
  const handleActions = (item: any) => {
    const { key, row } = item;
    console.log(row);
    if (key === 'autoComplete') {
      row.salesForecastItemWeekBeanList.forEach((element, index) => {
        if (index > 0) {
          element.value = row.salesForecastItemWeekBeanList[0].value;
        }
      });
      row.activeIncrList.forEach((element, index) => {
        element.incrValue = row.salesForecastItemWeekBeanList[0].value;
      });
    }
  };

  const handleRetailActions = (item: any) => {
    const { key, row } = item;
    if (key === 'autoComplete') {
      row.salesForecastItemWeekBeanList.forEach((element, index) => {
        element.value = row.salesForecastItemWeekBeanList[0].value;
      });
      row.salesForecastItemInventoryMonthBeanList.forEach((element, index) => {
        element.value = row.salesForecastItemWeekBeanList[0].value;
      });
      // row.salesList.forEach((element, index) => {
      //   element.value = row.salesForecastItemWeekBeanList[0].value;
      // });
    }
  };

  const autoComplete = () => {
    /* detailData.value.itemBeanList.forEach((row) => {
      row.salesForecastItemWeekBeanList.forEach((element, index) => {
        if (index > 0) {
          element.value = row.salesForecastItemWeekBeanList[0].value;
        }
      });
    }); */
    if (isRetail.value) {
      detailData.value.itemList.forEach((row) => {
        row.salesForecastItemInventoryMonthBeanList.forEach((item) => {
          item.value = row.salesForecastItemWeekBeanList[0].value;
        });
        row.salesForecastItemWeekBeanList.forEach((item) => {
          item.value = row.salesForecastItemWeekBeanList[0].value;
        });
        // row.salesList.forEach((item) => {
        //   item.value = row.salesForecastItemWeekBeanList[0].value;
        // });
      });
    } else {
      detailData.value.groupItemBeanLinkedList.forEach((row) => {
        row.recordList.forEach((item) => {
          item.salesForecastItemWeekBeanList.forEach((element, index) => {
            if (index > 0) {
              element.value = item.salesForecastItemWeekBeanList[0].value;
            }
          });
          item.activeIncrList.forEach((element, index) => {
            element.incrValue = item.salesForecastItemWeekBeanList[0].value;
          });
        });
      });
    }
  };

  const getDetailData = async () => {
    const { code, type } = route.query;
    const api =
      type === '1'
        ? erpApi.luteosErpSaleForecastV2AuditQueryDetail
        : erpApi.luteosErpRetailSaleForecastAuditQueryDetail;
    const res = await api({
      code: code as string,
    });
    if (![2, 4].includes(res.baseInfo.status)) {
      router.push({
        path: '/salesForecastingAudit/detail',
        query: { code: code as string, type: type as string },
      });
    }
    detailData.value = res;
  };
  const router = useRouter();
  const cancel = () => {
    router.push({ name: 'salesForecastingAudit' });
  };
  const confirmLoading = ref(false);
  const confirm = async () => {
    const valid = await formRef.value?.validate().catch(() => {
      return false; // 校验失败返回 false，不继续执行
    });
    if (valid) {
      confirmLoading.value = true;
      if (isRetail.value) {
        await erpApi
          .luteosErpRetailSaleForecastAuditUpdate({
            code: detailData.value.baseInfo.code,
            itemList: detailData.value.itemList.map((item) => {
              return {
                id: item.id,
                weekBeanList: item.salesForecastItemWeekBeanList,
                salesForecastItemInventoryMonthBeanList:
                  item.salesForecastItemInventoryMonthBeanList,
              };
            }),
          })
          .finally(() => {
            confirmLoading.value = false;
          });
      } else {
        const itemList = [];
        detailData.value.groupItemBeanLinkedList?.forEach((row) => {
          row.recordList?.forEach((record) => {
            itemList.push({
              channel: record.channel,
              country: record.country,
              onlineSkuCode: record.onlineSkuCode,
              skuCode: record.skuCode,
              weekBeanList: record.salesForecastItemWeekBeanList,
              activeIncrList: record.activeIncrList,
            });
          });
        });
        await erpApi
          .luteosErpSaleForecastV2AuditUpdate({
            code: detailData.value.baseInfo.code,
            type: detailData.value.baseInfo.type,
            itemList,
          })
          .finally(() => {
            confirmLoading.value = false;
          });
      }

      ElMessage.success('操作成功');
      closeTabAndRefresh('salesForecastingAudit');
      cancel();
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
