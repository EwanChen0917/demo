<template>
  <el-dialog width="1000px" title="详情" v-model="visible" @close="visible = false" align-center>
    <el-form
      v-loading="loading"
      ref="formRef"
      :model="form"
      label-width="80px"
      label-position="left"
    >
      <el-row>
        <el-col :span="24">
          <el-form-item label="产品SPU">
            <span>{{ form?.spuCode }}</span>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="产品名称">
            <div class="text-break">{{ form?.spuName }}</div>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="MSRP">
            <div class="d-flex gap-2">
              <div>{{ form?.salePriceStr }}</div>
              <div class="fs-7 text-gray-600">{{ form?.currencyPrice }}</div>
            </div>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="国家">
            <span>{{ form?.countryDesc }}</span>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="渠道">
            <span>{{ form?.channelDesc }}</span>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="运营">
            <span>{{ form?.operatorName }}</span>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="GTM组">
            <span>{{ form?.gtm }}</span>
          </el-form-item>
        </el-col>
      </el-row>
      <el-table
        ref="tableRef"
        border
        :data="[form]"
        row-key="code"
        default-expand-all
        max-height="50vh"
      >
        <el-table-column label="SKU/产品名称" min-width="200" fixed>
          <template #default="{ row }">
            <div v-if="row?.productType === 1">
              <div>{{ row?.spuCode }}</div>
              <div>{{ row?.spuName }}</div>
            </div>
            <div v-if="row?.productType === 2">
              <div>{{ row?.skuCode }}</div>
              <div>{{ row?.skuName }}</div>
              <div>{{ row?.skuSalePriceStr || row?.skuSalePrice }}</div>
            </div>
          </template>
        </el-table-column>
        <el-table-column label="MSRP" min-width="200" fixed>
          <template #default="{ row }">
            {{
              row.productType === 2
                ? row.skuSalePrice
                  ? `${row.skuSalePrice} ${row.currency || ''}`
                  : ''
                : row.salePriceStr
            }}
          </template>
        </el-table-column>
        <!--动态列-->
        <template v-for="(week, weekIdx) in form?.weekSaleInfoList" :key="weekIdx">
          <el-table-column align="center" min-width="250">
            <template #header>
              <div
                :data-week="week._weekNo"
                :data-month="week._endMonth"
                :data-today="week.isToday ? 1 : 0"
              >
                {{ week.weekTag }}
              </div>
              <div class="d-flex px-3">
                <div style="width: 30%">折扣率</div>
                <div style="width: 30%">成交价</div>
                <div style="width: 40%">毛利率</div>
              </div>
            </template>
            <template #default="{ row }">
              <div class="w-100">
                <div class="w-100 d-flex gap-2">
                  <div style="width: 30%">
                    {{
                      (row?.weekSaleInfoList[weekIdx]?.discountRate &&
                        `${row?.weekSaleInfoList[weekIdx]?.discountRate}%`) ||
                      ''
                    }}
                  </div>
                  <div style="width: 30%">
                    {{ row?.weekSaleInfoList[weekIdx]?.transactionPrice || '' }}
                    {{ row?.weekSaleInfoList[weekIdx]?.currencyPrice || '' }}
                  </div>
                  <div style="width: 30%">
                    {{
                      (row?.weekSaleInfoList[weekIdx]?.profitRate &&
                        `${row?.weekSaleInfoList[weekIdx]?.profitRate}%`) ||
                      ''
                    }}
                  </div>
                </div>
                <div style="float: left">
                  <Tag
                    v-for="(discountType, index) in row?.weekSaleInfoList[weekIdx]
                      ?.discountTypeList"
                    :key="index"
                    class="ms-3 mt-1"
                    :color="DiscountTypeColorMap[discountType]"
                  >
                    {{ DiscountTypeMap[discountType] }}
                  </Tag>
                  <el-tooltip
                    v-if="!row?.activeDiscountSkuBeanList?.length"
                    popper-class="action_tool_tip text-gray-600"
                    placement="top-start"
                    effect="light"
                    :content="row?.weekSaleInfoList[weekIdx].approveStatusDesc"
                  >
                    <SvgIcon
                      class="svg-icon status-icon"
                      :icon="svgNameMap[row.weekSaleInfoList[weekIdx].approveStatus]"
                    />
                  </el-tooltip>
                </div>
              </div>
            </template>
          </el-table-column>
        </template>
      </el-table>
    </el-form>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="visible = false">取消</el-button>
        <el-button type="primary" @click="save" :loading="saveLoading">确认</el-button>
      </span>
    </template>
  </el-dialog>
</template>

<script setup lang="ts">
  import { memberApi, productApi } from '@/api';
  import { ElMessage, ElSelect } from 'element-plus';
  import { buildWeekMonth } from '@/views/msrpManage/activityDiscountSchedule/util';
  import { scrollToToday } from '@/views/msrpManage/activityDiscountSchedule/activity';
  import { DiscountTypeColorMap, DiscountTypeMap } from '../enum';

  const emit = defineEmits(['success']);

  const visible = ref(false);
  const tableRef = ref();

  const svgNameMap = {
    0: 'approvalRejected',
    1: 'approving',
    2: 'approved',
    3: 'approvalRejected',
  };

  const formRef = ref();
  const form = ref({
    list: [{}] as any[],
  });
  const msrp = ref('');
  const currencyPrice = ref('');

  const cover = () => {
    if (!msrp.value || !currencyPrice.value) {
      ElMessage.warning('请填写MSRP和币种');
      return;
    }
    form.value.list.forEach((item) => {
      item.minSalePrice = msrp.value;
      item.currencyPrice = currencyPrice.value;
      item?.skuBeanList?.forEach((sku) => {
        sku.minSalePrice = msrp.value;
        sku.currencyPrice = currencyPrice.value;
      });
    });
    form.value.list[0].minSalePrice = msrp.value;
    form.value.list[0].maxSalePrice = msrp.value;
    form.value.list[0].priceRange = msrp.value;
    form.value.list[0].currencyPrice = currencyPrice.value;
  };

  const saveLoading = ref(false);
  const save = async () => {
    const isValid = await formRef.value?.validate().catch(() => {
      return false; // 校验失败返回 false，不继续执行
    });
    if (!isValid) return;
    try {
      saveLoading.value = true;
      const res = await productApi.luteosProductMsrpAddActive(form.value);
      ElMessage.success('保存成功');
      emit('success');
    } finally {
      saveLoading.value = false;
      visible.value = false;
    }
  };

  const loading = ref(false);
  const queryDetail = async (code) => {
    try {
      loading.value = true;
      const res = await productApi.luteosProductMsrpQuerySkuEditActive({
        code,
      });
      buildWeekMonth(res.weekSaleInfoList);
      setTimeout(() => {
        scrollToToday(tableRef.value, 250);
      }, 1500);

      form.value = res;
    } finally {
      loading.value = false;
    }
  };

  const gtmList = ref<any[]>([]);
  const queryGtmList = async () => {
    const res = await memberApi.luteosMemberQuerySubDeptList({ parentId: 662388969 });
    gtmList.value = res?.deptInfoList;
  };

  const open = (code) => {
    queryDetail(code);
    queryGtmList();
    visible.value = true;
  };

  defineExpose({
    open,
  });
</script>

<style scoped lang="scss">
  :deep(.el-table__body) {
    .cell {
      display: flex;
      align-items: center;
    }
  }

  :deep(.el-input-group__append) {
    padding: 0 5px;
  }

  :deep(.el-form-item__content) {
    line-height: 24px;
  }
  .status-icon {
    margin-left: 10px;
    margin-top: 10px;
    cursor: pointer;
    :deep(svg) {
      width: 18px !important;
      margin-top: 2px;
      height: 18px !important;
    }
  }
</style>
