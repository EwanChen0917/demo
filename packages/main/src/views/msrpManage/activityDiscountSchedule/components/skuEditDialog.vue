<template>
  <el-dialog
    width="1200px"
    title="编辑"
    v-model="visible"
    :before-close="handleClose"
    align-center
    :close-on-click-modal="false"
    :close-on-press-escape="false"
    @opened="handleOpen"
  >
    <el-form
      v-loading="loading"
      ref="formRef"
      :model="form"
      :rules="rules"
      style="height: 500px"
      label-width="80px"
      label-position="left"
      scroll-to-error
    >
      <el-row v-if="isBtnEditScene" :gutter="20">
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
          <el-form-item label="运营" prop="operator">
            <DeptMember v-model="form.operator" deptId="65717209" placeholder="运营" />
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="GTM组" prop="gtm">
            <el-select v-model="form.gtm" placeholder="GTM组" clearable filterable>
              <el-option
                v-for="item in gtmList"
                :key="item.deptId"
                :label="item.deptName"
                :value="item.deptName"
              />
            </el-select>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row class="mb-4">
        <el-popover
          popper-class="rt_el_pop"
          :offset="0"
          :hide-after="0"
          placement="bottom-end"
          :width="200"
          trigger="click"
        >
          <div class="h-xl-100 p-5">
            <el-checkbox-group :max="3" v-model="checkedColumnsMonth">
              <el-checkbox :value="value" :label="`${value}月`" v-for="value in 12" :key="value" />
            </el-checkbox-group>
          </div>
          <template #reference>
            <el-button class="button" type="primary">编辑列设置</el-button>
          </template>
        </el-popover>
      </el-row>
      <el-table
        border
        :data="[form]"
        ref="tableRef"
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
          <el-table-column
            align="center"
            min-width="400"
            v-if="checkedColumnsMonth.includes(parseInt(week?.weekTag?.split?.('-')?.[1]))"
          >
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
                <div style="width: 40%">成交价</div>
                <div style="width: 30%">毛利率</div>
              </div>
            </template>
            <template #default="{ row }">
              <div class="w-100">
                <div class="w-100 mb-2 d-flex">
                  <el-form-item
                    label-width="0"
                    :prop="'weekSaleInfoList.' + weekIdx + '.discountTypeList'"
                    :rules="getDiscountTypeRule(row.weekSaleInfoList[weekIdx], row)"
                  >
                    <el-select
                      style="width: 100%"
                      v-model="row.weekSaleInfoList[weekIdx].discountTypeList"
                      clearable
                      filterable
                      multiple
                      collapse-tags
                      collapse-tags-tooltip
                      :max-collapse-tags="4"
                      placeholder="活动类型"
                    >
                      <el-option
                        v-for="item in discountTypeOptions"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value"
                      />
                    </el-select>
                  </el-form-item>
                  <!-- <el-select
                    :id="`weekRef_${weekIdx}`"
                    style="width: 100%"
                    placeholder="活动类型"
                    v-model="row.weekSaleInfoList[weekIdx].discountTypeList"
                    :options="discountTypeOptions"
                    clearable
                    multiple
                    filterable
                    collapse-tags
                    :max-collapse-tags="2"
                    :disabled="
                      [statusMap.approving, statusMap.approved].includes(
                        row.weekSaleInfoList[weekIdx].approveStatus
                      )
                    "
                    @change="
                      (val) => {
                        handleParentChange(val, row, weekIdx, 'discountTypeList');
                      }
                    "
                  /> -->
                  <!--                  <el-button-->
                  <!--                    v-if=" [0, 3].includes(+row.weekSaleInfoList[weekIdx].approveStatus)"-->
                  <!--                    type="info"-->
                  <!--                    size="small"-->
                  <!--                    class="btn-mini"-->
                  <!--                    @click="handleApprovalClick(row.weekSaleInfoList, weekIdx)"-->
                  <!--                  >-->
                  <!--                    提交-->
                  <!--                  </el-button>-->
                  <!--                  <el-tooltip-->
                  <!--                    popper-class="action_tool_tip text-gray-600"-->
                  <!--                    placement="top-start"-->
                  <!--                    effect="light"-->
                  <!--                    :content="row.weekSaleInfoList[weekIdx].approveStatusDesc"-->
                  <!--                    v-else-->
                  <!--                  >-->
                  <!--                    <SvgIcon-->
                  <!--                      class="svg-icon status-icon"-->
                  <!--                      :icon="svgNameMap[row.weekSaleInfoList[weekIdx].approveStatus]"-->
                  <!--                      @click="handleApprovalClick(row.weekSaleInfoList, weekIdx)"-->
                  <!--                    />-->
                  <!--                  </el-tooltip>-->
                </div>
                <div class="w-100 d-flex gap-2">
                  <div>
                    <el-form-item
                      label-width="0"
                      :prop="'weekSaleInfoList.' + weekIdx + '.discountRate'"
                      :rules="getDiscountRateRule(row.weekSaleInfoList[weekIdx], row)"
                    >
                      <el-input
                        size="small"
                        maxlength="6"
                        placeholder="折扣率"
                        v-model="row.weekSaleInfoList[weekIdx].discountRate"
                        :disabled="
                          [statusMap.approving, statusMap.approved].includes(
                            row.weekSaleInfoList[weekIdx].approveStatus
                          )
                        "
                        @change="
                          (val) => {
                            handleParentChange(val, row, weekIdx, 'discountRate');
                          }
                        "
                      >
                        <template #append>%</template>
                      </el-input>
                    </el-form-item>
                  </div>
                  <div style="width: 5%">
                    <el-icon
                      class="link-icon"
                      :class="{ 'color-grey': !row.weekSaleInfoList[weekIdx].hasCorrelation }"
                      @click="
                        row.weekSaleInfoList[weekIdx].hasCorrelation =
                          +!row.weekSaleInfoList[weekIdx].hasCorrelation
                      "
                    >
                      <Link />
                    </el-icon>
                  </div>
                  <div style="width: 70%">
                    <el-form-item
                      label-width="0"
                      :prop="'weekSaleInfoList.' + weekIdx + '.transactionPrice'"
                      :rules="gettransactionPriceRule(row.weekSaleInfoList[weekIdx], row)"
                    >
                      <el-input
                        size="small"
                        placeholder="成交价"
                        maxlength="13"
                        :disabled="
                          [statusMap.approving, statusMap.approved].includes(
                            row.weekSaleInfoList[weekIdx].approveStatus
                          )
                        "
                        v-model="row.weekSaleInfoList[weekIdx].transactionPrice"
                        @change="
                          (val) => {
                            handleParentChange(val, row, weekIdx, 'transactionPrice');
                          }
                        "
                      >
                        <template #append>
                          <el-select
                            v-model="row.weekSaleInfoList[weekIdx].currencyPrice"
                            placeholder="币种"
                            filterable
                            clearable
                            style="min-width: 85px"
                          >
                            <el-option
                              v-for="item in currencyOptions"
                              :key="item.currencyCode"
                              :label="item.currencyCode"
                              :value="item.currencyCode"
                            />
                          </el-select>
                          <!-- <CurrencySelect
                            :currencyName="false"
                            style="width: 90px"
                            v-model="row.currencyPrice"
                          /> -->
                        </template>
                      </el-input>
                    </el-form-item>
                  </div>
                  <div>
                    <el-form-item
                      label-width="0"
                      :prop="'weekSaleInfoList.' + weekIdx + '.profitRate'"
                      :rules="getprofitRateRule(row.weekSaleInfoList[weekIdx], row)"
                    >
                      <el-input
                        maxlength="6"
                        size="small"
                        placeholder="毛利率"
                        :disabled="
                          [statusMap.approving, statusMap.approved].includes(
                            row.weekSaleInfoList[weekIdx].approveStatus
                          )
                        "
                        v-model="row.weekSaleInfoList[weekIdx].profitRate"
                      >
                        <template #append>%</template>
                      </el-input>
                    </el-form-item>
                  </div>
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
  <ApprovalDialog
    v-if="approvalDialogVisible"
    :visible="approvalDialogVisible"
    :status="approvalStatus"
    :approvalList="approvalList"
    :code="queryCode"
    @close="handleApprovalClose"
  />
</template>

<script setup lang="ts">
  import { memberApi, platformApi, productApi } from '@/api';
  import { ElMessage, ElSelect } from 'element-plus';
  import {
    DiscountTypeMap,
    DiscountType,
    discountTypeOptions,
  } from '@/views/msrpManage/activityDiscountSchedule/enum';
  import ApprovalDialog from './approvalDialog.vue';
  import { setValue, currencyOptions, buildWeekMonth, handleEmptyStringValue } from '../util';
  import {
    getDiscountTypeRule,
    getDiscountRateRule,
    gettransactionPriceRule,
    getcurrencyPriceRule,
    getprofitRateRule,
    scrollToToday,
  } from '../activity';

  const emit = defineEmits(['success']);
  const editScene = ref('');
  const queryCode = ref('');
  const parentCode = ref('');
  const isBtnEditScene = computed(() => {
    return editScene.value === 'btnEdit';
  });

  const visible = ref(false);
  const statusMap = ref({
    waitSubmit: 0, // 待提交
    approving: 1, // 审批中
    approved: 2, // 审核通过
    approvalRejected: 3, // 审核拒绝
  });

  const formRef = ref();
  const form = ref({});
  const rules = {
    operator: [{ required: true, message: '请选择运营', trigger: 'change' }],
    gtm: [{ required: true, message: '请选择GTM组', trigger: 'change' }],
  };

  const msrp = ref('');
  const currencyPrice = ref('');

  const regex = /^\d{1,10}(\.\d{1,4})?$/;
  const handlePriceBlur = (e, row) => {
    if (!regex.test(e.target.value)) {
      ElMessage.warning('请输⼊数字，最多保留4位⼩数');
      e.target.value = '';
      return;
    }
    row?.skuBeanList?.forEach((sku) => {
      sku.minSalePrice = e.target.value;
    });
  };

  const handlePriceChange = (val, cur) => {
    const row = form.value.list[0];
    if (!regex.test(val)) {
      ElMessage.warning('请输⼊数字，最多保留4位⼩数');
      cur.minSalePrice = 1;
    }
    let min = row?.skuBeanList?.[0]?.minSalePrice || 0;
    let max = row?.skuBeanList?.[0]?.minSalePrice || 0;

    row?.skuBeanList?.forEach((sku) => {
      if (sku.minSalePrice < min) {
        min = sku.minSalePrice;
      }
      if (sku.minSalePrice > max) {
        max = sku.minSalePrice;
      }
    });
    row.priceRange = min === max ? min : `${min}-${max}`;
    row.minSalePrice = min;
    row.maxSalePrice = max;
  };

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

  const svgNameMap = {
    0: 'approvalRejected',
    1: 'approving',
    2: 'approved',
    3: 'approvalRejected',
  };

  const approvalDialogVisible = ref(false);
  const approvalStatus = ref(0);
  const approvalList = ref([]);
  const handleApprovalClick = (list, index) => {
    const data = list[index];
    approvalStatus.value = data.approveStatus;
    approvalList.value = [];
    // 待提交、审批拒绝
    if ([0, 3].includes(data.approveStatus)) {
      if (
        data.discountTypeList.length &&
        data.discountRate &&
        data.transactionPrice &&
        data.profitRate
      ) {
        approvalList.value = [data];
        list.forEach((item) => {
          if (
            item.week !== data.week &&
            item.discountTypeList.length &&
            item.discountRate &&
            item.transactionPrice &&
            item.profitRate &&
            [0, 3].includes(item.approveStatus)
          ) {
            approvalList.value.push(item);
          }
        });
        approvalDialogVisible.value = true;
      } else {
        ElMessage.warning('请填写本周的折扣计划');
      }
    } else if (data.approveStatus === 1) {
      approvalList.value = [data];
      list.forEach((item) => {
        if (item.discountPlanCode !== data.discountPlanCode && [1].includes(item.approveStatus)) {
          approvalList.value.push(item);
        }
      });

      approvalDialogVisible.value = true;
    }
  };

  const handleApprovalClose = (reload) => {
    if (reload) {
      queryDetail();
      emit('success');
    }
    approvalDialogVisible.value = false;
  };

  const saveLoading = ref(false);
  const save = async () => {
    const isValid = await formRef.value?.validate().catch((err) => {
      const fields = Object.keys(err || {});
      const field = fields[0];
      const error = err[field]?.[0];
      if (error.skuOrSpuItem && error.weekItem) {
        ElMessage.error(
          `产品【${[error.skuOrSpuItem.spuCode, error.skuOrSpuItem.skuCode]
            .filter((x) => x)
            .join(' / ')}】在【${error.weekItem.weekTag}】校验错误`
        );
      } else {
        ElMessage.error(`校验错误`);
      }
      return false; // 校验失败返回 false，不继续执行
    });
    if (!isValid) return;
    try {
      saveLoading.value = true;
      if (isBtnEditScene.value) {
        await btnEditSave();
      } else {
        await iconEdit();
      }
      ElMessage.success('保存成功');
      emit('success');
      visible.value = false;
    } finally {
      saveLoading.value = false;
    }
  };
  const btnEditSave = async () => {
    handleEmptyStringValue([form.value]);
    await productApi.luteosProductMsrpAddSkuActive({
      ...form.value,
      parentCode: parentCode.value,
    });
  };

  const iconEdit = async () => {
    await productApi.luteosProductMsrpEditActive({
      code: queryCode.value,
      weekSaleInfoList: form.value.weekSaleInfoList,
    });
  };

  const loading = ref(false);
  const queryDetail = async () => {
    try {
      loading.value = true;
      const res = await productApi.luteosProductMsrpQuerySkuEditActive({
        code: queryCode.value,
      });

      buildWeekMonth(res.weekSaleInfoList);

      setTimeout(() => {
        scrollToToday(tableRef.value, 400);
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

  const handleParentChange = (val, row, weekIdx, field) => {
    if (
      row?.productType === 2 &&
      field == 'transactionPrice' &&
      row.weekSaleInfoList[weekIdx].hasCorrelation &&
      +row.skuSalePrice
    ) {
      // 填写成本价
      row.weekSaleInfoList[weekIdx].discountRate =
        setValue(val, row.weekSaleInfoList[weekIdx], field, row.skuSalePrice) || '';
    }
    if (
      row?.productType === 2 &&
      field == 'discountRate' &&
      row.weekSaleInfoList[weekIdx].hasCorrelation &&
      +row.skuSalePrice
    ) {
      // 折扣率和成本价联动计算
      // 填写折扣率
      row.weekSaleInfoList[weekIdx].transactionPrice =
        setValue(val, row.weekSaleInfoList[weekIdx], field, row.skuSalePrice) || '';
    }
  };

  // 表格字段关联校验
  const weekIndex = ref(0);
  const tableRef = ref();
  const checkedColumnsMonth = ref([new Date().getMonth() + 1]);
  const handleOpen = () => {};

  const handleClose = (done) => {
    tableRef.value.setScrollLeft(0);
    visible.value = false;
    done();
  };
  const open = async (code, scene, _parentCode) => {
    queryCode.value = code;
    parentCode.value = _parentCode || '';
    await queryDetail();
    queryGtmList();
    editScene.value = scene;
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
    margin-top: 10px;
    margin-left: 12px;
    margin-right: 8px;
    cursor: pointer;
    :deep(svg) {
      width: 20px !important;
      height: 20px !important;
    }
  }
  .btn-mini {
    width: 45px;
    height: 30px !important;
    margin-top: 3px;
    margin-left: 5px;
  }
  .el-input-group--append .el-input-group__append .el-select :deep(.el-select__wrapper) {
    box-shadow: none;
    min-height: 28px;
    padding: 2px 16px;
  }
  .link-icon {
    color: var(--el-color-primary);
    vertical-align: bottom;
    cursor: pointer;
  }
  .color-grey {
    color: #999;
  }
  :deep(.el-form-item--default .el-form-item__error) {
    padding-top: 1px;
  }
</style>
