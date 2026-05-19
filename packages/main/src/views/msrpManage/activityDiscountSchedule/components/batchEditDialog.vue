<template>
  <el-dialog
    width="1100px"
    title="批量编辑"
    v-model="visible"
    @close="visible = false"
    align-center
  >
    <el-form
      v-loading="loading"
      ref="formRef"
      :model="form"
      :rules="rules"
      label-width="80px"
      label-position="left"
      scroll-to-error
      max-height="70vh"
    >
      <el-table
        ref="tableRef"
        :data="form?.activeDiscountSpuList"
        row-key="code"
        default-expand-all
        max-height="50vh"
        :tree-props="{
          children: 'activeDiscountSkuList',
        }"
        @scroll="handleTableScroll"
      >
        <el-table-column label="产品信息" min-width="250" fixed>
          <template #default="{ row }">
            <div v-if="row?.productType === 1">
              <div>{{ row?.spuCode }}</div>
              <div>{{ row?.spuName }}</div>
            </div>
            <div v-if="row?.productType === 2">
              <div>{{ row?.skuCode }}</div>
              <div>{{ row?.skuName }}</div>
            </div>
          </template>
        </el-table-column>
        <el-table-column label="MSRP" min-width="200" fixed>
          <template #default="{ row }">
            <div class="d-flex gap-2">
              <div>{{ row?.minSalePrice }}</div>
              <div class="fs-7 text-gray-600">{{ row?.currencyPrice }}</div>
              <div v-if="row?.maxSalePrice && row?.maxSalePrice !== row?.minSalePrice">-</div>
            </div>
            <div
              v-if="row?.maxSalePrice && row?.maxSalePrice !== row?.minSalePrice"
              class="d-flex gap-2"
            >
              <div>{{ row?.maxSalePrice }}</div>
              <div
                class="fs-7 text-gray-600"
                v-if="row?.minSalePrice !== null && row?.minSalePrice !== ''"
              >
                {{ row?.currencyPrice }}
              </div>
            </div>
          </template>
        </el-table-column>
        <!--动态列-->
        <template
          v-for="(week, weekIdx) in form?.activeDiscountSpuList?.[0]?.weekSaleInfoList"
          :key="weekIdx"
        >
          <el-table-column align="center" min-width="400">
            <template #header>
              <div>{{ week.weekTag }}</div>
              <div class="d-flex px-3">
                <div style="width: 30%">折扣率</div>
                <div style="width: 30%">成交价</div>
                <div style="width: 40%">毛利率</div>
              </div>
            </template>
            <template #default="{ row, $index }">
              <div class="w-100">
                <div class="w-100 mb-2 d-flex">
                  <el-select
                    style="width: 100%"
                    placeholder="活动类型"
                    v-model="row.weekSaleInfoList[weekIdx].discountTypeList"
                    :options="discountTypeOptions"
                    clearable
                    filterable
                    multiple
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
                  />
                  <template v-if="!row.activeDiscountSkuList?.length">
                    <el-button
                      v-if="[0, 3].includes(+row.weekSaleInfoList[weekIdx].approveStatus)"
                      type="info"
                      size="small"
                      class="btn-mini"
                      @click="handleApprovalClick(row.weekSaleInfoList, weekIdx, row.code)"
                    >
                      提交
                    </el-button>
                    <el-tooltip
                      popper-class="action_tool_tip text-gray-600"
                      placement="top-start"
                      effect="light"
                      :content="row.weekSaleInfoList[weekIdx].approveStatusDesc"
                      v-else
                    >
                      <SvgIcon
                        v-if="row.weekSaleInfoList[weekIdx].approveStatusDesc"
                        class="svg-icon status-icon"
                        :icon="svgNameMap[row.weekSaleInfoList[weekIdx].approveStatus]"
                        @click="handleApprovalClick(row.weekSaleInfoList, weekIdx, row.code)"
                      />
                    </el-tooltip>
                  </template>
                </div>
                <div class="w-100 d-flex gap-2">
                  <div>
                    <el-form-item
                      label-width="0"
                      :prop="getProp(row, weekIdx, 'discountRate')"
                      :rules="getDiscountRateRule(row, weekIdx)"
                    >
                      <el-input
                        size="small"
                        placeholder="折扣率"
                        v-model="row.weekSaleInfoList[weekIdx].discountRate"
                        :disabled="
                          [statusMap.approving, statusMap.approved].includes(
                            row?.weekSaleInfoList[weekIdx].approveStatus
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
                  <div style="width: 75%">
                    <el-form-item
                      label-width="0"
                      :prop="getProp(row, weekIdx, 'transactionPrice')"
                      :rules="gettransactionPriceRule(row, weekIdx)"
                    >
                      <el-input
                        size="small"
                        placeholder="成交价"
                        v-model="row.weekSaleInfoList[weekIdx].transactionPrice"
                        :disabled="
                          [statusMap.approving, statusMap.approved].includes(
                            row?.weekSaleInfoList[weekIdx].approveStatus
                          ) || row?.weekSaleInfoList[weekIdx]?.discountTypeList.includes(2)
                        "
                        @change="
                          (val) => {
                            handleParentChange(val, row, weekIdx, 'transactionPrice');
                          }
                        "
                      >
                        <template #append>
                          <CurrencySelect
                            :currencyName="false"
                            style="width: 90px"
                            v-model="row.currencyPrice"
                          />
                        </template>
                      </el-input>
                    </el-form-item>
                  </div>
                  <div>
                    <el-form-item
                      label-width="0"
                      :prop="getProp(row, weekIdx, 'profitRate')"
                      :rules="getprofitRateRule(row, weekIdx)"
                    >
                      <el-input
                        maxlength="6"
                        size="small"
                        placeholder="毛利率"
                        v-model="row.weekSaleInfoList[weekIdx].profitRate"
                        :disabled="
                          [statusMap.approving, statusMap.approved].includes(
                            row?.weekSaleInfoList[weekIdx].approveStatus
                          )
                        "
                        @change="
                          (val) => {
                            handleParentChange(val, row, weekIdx, 'profitRate');
                          }
                        "
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
      <div
        v-if="form?.activeDiscountSpuList?.length"
        class="d-flex justify-content-between align-items-center mt-4"
      >
        <div style="width: 250px; text-align: center">
          <div class="text-danger">全部填充</div>
          <div class="text-danger">！此操作将填充所有产品折扣信息</div>
        </div>
        <div
          ref="coverRef"
          class="d-flex"
          style="width: 752.5px; overflow-x: scroll"
          @scroll="handleCoverScroll"
        >
          <div
            style="width: 250px"
            class="flex-shrink-0"
            v-for="(week, weekIdx) in form?.activeDiscountSpuList?.[0]?.weekSaleInfoList"
            :key="weekIdx"
          >
            <div class="w-100 d-flex gap-2" style="padding-right: 12px">
              <el-input
                size="small"
                placeholder="折扣率"
                v-model="coverList[weekIdx].discountRate"
                @change="
                  (val) => {
                    handleCoverChange(val, weekIdx, 'discountRate');
                  }
                "
              >
                <template #append>%</template>
              </el-input>
              <el-input
                size="small"
                placeholder="成交价"
                v-model="coverList[weekIdx].transactionPrice"
                @change="
                  (val) => {
                    handleCoverChange(val, weekIdx, 'transactionPrice');
                  }
                "
              >
                <template #append>
                  <CurrencySelect
                    :currencyName="false"
                    style="width: 90px"
                    v-model="coverList[weekIdx].currencyPrice"
                  />
                </template>
              </el-input>
              <el-input
                maxlength="10"
                size="small"
                placeholder="毛利率"
                v-model="coverList[weekIdx].profitRate"
                @change="
                  (val) => {
                    handleCoverChange(val, weekIdx, 'profitRate');
                  }
                "
              >
                <template #append>%</template>
              </el-input>
            </div>
          </div>
        </div>
      </div>
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
  import { memberApi, productApi } from '@/api';
  import { ElMessage, ElSelect } from 'element-plus';
  import { integerRule, priceRule, priceRuleFixed4 } from '@/utils/rulesRegExp';
  import {
    DiscountTypeMap,
    DiscountType,
    discountTypeOptions,
  } from '@/views/msrpManage/activityDiscountSchedule/enum';
  import ApprovalDialog from './approvalDialog.vue';

  const emit = defineEmits(['success']);

  const tableRef = ref();
  const coverRef = ref();

  const visible = ref(false);
  const queryCodeList = ref([]);
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

  const coverList = ref([]);

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

  // 滚动条和批量填充同步滚动
  const handleTableScroll = ({ scrollLeft }) => {
    coverRef.value.scrollLeft = scrollLeft;
  };
  const handleCoverScroll = ({ target }) => {
    const { scrollLeft } = target;
    tableRef.value.setScrollLeft(scrollLeft);
  };

  const svgNameMap = {
    0: 'approvalRejected',
    1: 'approving',
    2: 'approved',
    3: 'approvalRejected',
  };

  const handleParentChange = (val, row, weekIdx, field) => {
    const data = row.weekSaleInfoList[weekIdx];
    if (field === 'discountTypeList' && val.includes(2)) {
      data.transactionPrice = 100;
    }

    if (row?.productType === 1 && row.activeDiscountSkuList) {
      row?.activeDiscountSkuList?.forEach((item) => {
        // 待提交、审批拒绝，统一修改下面的sku折扣信息
        if ([0, 3].includes(item.weekSaleInfoList[weekIdx].approveStatus)) {
          item.weekSaleInfoList[weekIdx][field] = val;
          if (item.weekSaleInfoList[weekIdx]?.discountTypeList.includes(2)) {
            item.weekSaleInfoList[weekIdx].transactionPrice = 100;
          }
        }
      });
    }
  };

  const handleCoverChange = (val, weekIdx, field) => {
    form.value.activeDiscountSpuList.forEach((item) => {
      if ([0, 3].includes(+item.weekSaleInfoList[weekIdx].approveStatus)) {
        item.weekSaleInfoList[weekIdx][field] = val;
        if (
          field === 'transactionPrice' &&
          item.weekSaleInfoList[weekIdx]?.discountTypeList.includes(2)
        ) {
          item.weekSaleInfoList[weekIdx].transactionPrice = 100;
        }
        item?.activeDiscountSkuList?.forEach((sku) => {
          if ([0, 3].includes(+sku.weekSaleInfoList[weekIdx].approveStatus)) {
            sku.weekSaleInfoList[weekIdx][field] = val;
            if (
              field === 'transactionPrice' &&
              sku.weekSaleInfoList[weekIdx]?.discountTypeList.includes(2)
            ) {
              sku.weekSaleInfoList[weekIdx].transactionPrice = 100;
            }
          }
        });
      }
    });
  };

  const approvalDialogVisible = ref(false);
  const approvalStatus = ref(0);
  const approvalList = ref([]);
  const queryCode = ref('');
  const handleApprovalClick = (list, index, code) => {
    const data = list[index];
    queryCode.value = code;
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
    const isValid = await formRef.value?.validate().catch(() => {
      return false; // 校验失败返回 false，不继续执行
    });
    if (!isValid) return;
    try {
      saveLoading.value = true;
      const res = await productApi.luteosProductMsrpBatchAddActive(form.value);
      ElMessage.success('保存成功');
      emit('success');
      visible.value = false;
    } finally {
      saveLoading.value = false;
    }
  };

  const loading = ref(false);
  const queryDetail = async () => {
    try {
      loading.value = true;
      const res = await productApi.luteosProductMsrpQueryBatchActive({
        codeList: queryCodeList.value,
      });
      form.value = res;
      coverList.value = form.value?.activeDiscountSpuList?.[0]?.weekSaleInfoList?.map((item) => {
        return {
          discountRate: '',
          transactionPrice: '',
          profitRate: '',
        };
      });
    } finally {
      loading.value = false;
    }
  };

  const gtmList = ref<any[]>([]);
  const queryGtmList = async () => {
    const res = await memberApi.luteosMemberQuerySubDeptList({ parentId: 662388969 });
    gtmList.value = res?.deptInfoList;
  };

  // 表格字段关联校验
  const getDiscountRateRule = (row, weekIdx) => {
    return [
      {
        pattern: priceRule,
        message: '非法输入',
        trigger: ['blur', 'change'],
      },
      {
        required: true,
        validator: (rule, value, callback) => {
          if (value > 100) {
            callback(new Error('不能大于100'));
          } else if (
            !value &&
            (row?.weekSaleInfoList[weekIdx]?.transactionPrice ||
              row?.weekSaleInfoList[weekIdx]?.profitRate)
          ) {
            callback(new Error('请输入'));
          } else {
            callback();
          }
        },
      },
    ];
  };

  const gettransactionPriceRule = (row, weekIdx) => {
    return [
      {
        pattern: priceRule,
        message: '非法输入',
        trigger: ['blur', 'change'],
      },
      {
        required: true,
        validator: (rule, value, callback) => {
          if (value > 100) {
            callback(new Error('不能大于100'));
          } else if (
            !value &&
            (row?.weekSaleInfoList[weekIdx]?.discountRate ||
              row?.weekSaleInfoList[weekIdx]?.profitRate)
          ) {
            callback(new Error('请输入'));
          } else {
            callback();
          }
        },
      },
    ];
  };

  const getprofitRateRule = (row, weekIdx) => {
    return [
      {
        pattern: integerRule,
        message: '非法输入',
        trigger: ['blur', 'change'],
      },
      {
        required: true,
        validator: (rule, value, callback) => {
          if (
            !value &&
            (row?.weekSaleInfoList[weekIdx]?.discountRate ||
              row?.weekSaleInfoList[weekIdx]?.transactionPrice)
          ) {
            callback(new Error('请输入'));
          } else {
            callback();
          }
        },
      },
    ];
  };

  const getProp = (row, weekIdx, field) => {
    if (row?.productType === 1) {
      const index = form.value?.activeDiscountSpuList?.findIndex((item) => item.code === row?.code);
      return `activeDiscountSpuList.${index}.weekSaleInfoList.${weekIdx}.${field}`;
    }

    for (let i = 0; i < form.value?.activeDiscountSpuList.length; i++) {
      const skuIdx = form.value?.activeDiscountSpuList[i]?.activeDiscountSkuList?.findIndex(
        (item) => item.code === row?.code
      );
      if (skuIdx > -1) {
        return `activeDiscountSpuList.${i}.activeDiscountSkuList.${skuIdx}.weekSaleInfoList.${weekIdx}.${field}`;
      }
    }
    return '';
  };

  const open = (codeList) => {
    form.value = {};
    queryCodeList.value = codeList;
    queryDetail();
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
      //flex-wrap: wrap;
    }
  }

  :deep(.el-input-group__append) {
    padding: 0 5px;
  }

  :deep(.el-form-item__content) {
    line-height: 24px;
  }

  :deep(.el-table__indent) {
    box-sizing: border-box;
  }
  :deep(.el-table__placeholder) {
    box-sizing: border-box;
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
</style>
