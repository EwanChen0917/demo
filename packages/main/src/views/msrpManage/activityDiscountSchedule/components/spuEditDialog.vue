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
        <el-col :span="24">
          <el-form-item label="SKU" prop="skuCodeList">
            <el-select
              placeholder="请选择"
              v-model="form.skuCodeList"
              multiple
              clearable
              collapse-tags
              collapse-tags-tooltip
              :max-collapse-tags="5"
              @change="handleSkuChange"
            >
              <template #empty>
                <div class="text-center">{{ form?.spuCode ? '暂无SKU' : '请先选择SPU' }}</div>
              </template>
              <el-option label="所有SKU" value="all" v-if="skuList.length > 0" />
              <el-option
                v-for="item in skuList"
                :key="item.code"
                :label="`${item.code}  ${item.name}`"
                :value="item.code"
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
        row-key="code"
        default-expand-all
        max-height="50vh"
        ref="tableRef"
        :tree-props="{
          children: 'activeDiscountSkuBeanList',
        }"
      >
        <el-table-column label="SPU/产品名称" min-width="200" fixed>
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
            <template #default="{ row, $index }">
              <div class="w-100">
                <div class="w-100 d-flex">
                  <el-form-item
                    style="width: 100%"
                    label-width="0"
                    :prop="
                      row?.productType === 1
                        ? 'weekSaleInfoList.' + weekIdx + '.discountTypeList'
                        : 'activeDiscountSkuBeanList.' +
                          ($index - 1) +
                          '.weekSaleInfoList.' +
                          weekIdx +
                          '.discountTypeList'
                    "
                    :rules="getDiscountTypeRule(row?.weekSaleInfoList?.[weekIdx], row)"
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
                  <!--                  <template v-if="!row.activeDiscountSkuBeanList?.length">-->
                  <!--                    <el-button-->
                  <!--                      v-if="canEdit(row?.weekSaleInfoList[weekIdx])"-->
                  <!--                      type="info"-->
                  <!--                      size="small"-->
                  <!--                      class="btn-mini"-->
                  <!--                      @click="handleApprovalClick(row.weekSaleInfoList, weekIdx, row.code)"-->
                  <!--                    >-->
                  <!--                      提交-->
                  <!--                    </el-button>-->
                  <!--                    <el-tooltip-->
                  <!--                      popper-class="action_tool_tip text-gray-600"-->
                  <!--                      placement="top-start"-->
                  <!--                      effect="light"-->
                  <!--                      :content="row.weekSaleInfoList[weekIdx].approveStatusDesc"-->
                  <!--                      v-else-->
                  <!--                    >-->
                  <!--                      <SvgIcon-->
                  <!--                        v-if="row.weekSaleInfoList[weekIdx].approveStatusDesc"-->
                  <!--                        class="svg-icon status-icon"-->
                  <!--                        :icon="svgNameMap[row.weekSaleInfoList[weekIdx].approveStatus]"-->
                  <!--                        @click="handleApprovalClick(row.weekSaleInfoList, weekIdx, row.code)"-->
                  <!--                      />-->
                  <!--                    </el-tooltip>-->
                  <!--                  </template>-->
                </div>
                <div class="w-100 d-flex gap-2">
                  <div>
                    <el-form-item
                      label-width="0"
                      :prop="
                        row?.productType === 1
                          ? 'weekSaleInfoList.' + weekIdx + '.discountRate'
                          : 'activeDiscountSkuBeanList.' +
                            ($index - 1) +
                            '.weekSaleInfoList.' +
                            weekIdx +
                            '.discountRate'
                      "
                      :rules="getDiscountRateRule(row.weekSaleInfoList[weekIdx], row)"
                    >
                      <el-input
                        v-if="row?.productType === 1"
                        placeholder="折扣率"
                        v-model="row.weekSaleInfoList[weekIdx].discountRate"
                        @change="
                          (val) => {
                            handleParentChange(val, row, weekIdx, 'discountRate');
                          }
                        "
                      />
                      <el-input
                        v-else
                        size="small"
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
                      v-if="row?.productType === 2"
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
                      :prop="
                        row?.productType === 1
                          ? 'weekSaleInfoList.' + weekIdx + '.transactionPrice'
                          : 'activeDiscountSkuBeanList.' +
                            ($index - 1) +
                            '.weekSaleInfoList.' +
                            weekIdx +
                            '.transactionPrice'
                      "
                      :rules="gettransactionPriceRule(row.weekSaleInfoList[weekIdx], row)"
                    >
                      <el-input
                        v-if="row?.productType === 1"
                        size="small"
                        placeholder="成交价"
                        v-model="row.weekSaleInfoList[weekIdx].transactionPrice"
                        @change="
                          (val) => {
                            handleParentChange(val, row, weekIdx, 'transactionPrice');
                          }
                        "
                      >
                        <template #append>
                          <el-form-item
                            label-width="0"
                            :prop="
                              row?.productType === 1
                                ? 'weekSaleInfoList.' + weekIdx + '.currencyPrice'
                                : 'activeDiscountSkuBeanList.' +
                                  ($index - 1) +
                                  '.weekSaleInfoList.' +
                                  weekIdx +
                                  '.currencyPrice'
                            "
                            :rules="getcurrencyPriceRule(row.weekSaleInfoList[weekIdx], row)"
                          >
                            <el-select
                              v-model="row.weekSaleInfoList[weekIdx].currencyPrice"
                              placeholder="币种"
                              filterable
                              clearable
                              style="min-width: 85px"
                              @change="
                                (val) => {
                                  handleParentChange(val, row, weekIdx, 'currencyPrice');
                                }
                              "
                            >
                              <el-option
                                v-for="item in currencyOptions"
                                :key="item.currencyCode"
                                :label="item.currencyCode"
                                :value="item.currencyCode"
                              />
                            </el-select>
                          </el-form-item>
                        </template>
                      </el-input>
                      <el-input
                        v-else
                        size="small"
                        placeholder="成交价"
                        v-model="row.weekSaleInfoList[weekIdx].transactionPrice"
                        :disabled="
                          [statusMap.approving, statusMap.approved].includes(
                            row.weekSaleInfoList[weekIdx].approveStatus
                          )
                        "
                        @change="
                          (val) => {
                            handleParentChange(val, row, weekIdx, 'transactionPrice');
                          }
                        "
                      >
                        <template #append>
                          <el-form-item
                            label-width="0"
                            :prop="
                              row?.productType === 1
                                ? 'weekSaleInfoList.' + weekIdx + '.currencyPrice'
                                : 'activeDiscountSkuBeanList.' +
                                  ($index - 1) +
                                  '.weekSaleInfoList.' +
                                  weekIdx +
                                  '.currencyPrice'
                            "
                            :rules="getcurrencyPriceRule(row.weekSaleInfoList[weekIdx], row)"
                          >
                            <el-select
                              v-model="row.weekSaleInfoList[weekIdx].currencyPrice"
                              placeholder="币种"
                              filterable
                              clearable
                              style="min-width: 85px"
                              @change="
                                (val) => {
                                  handleParentChange(val, row, weekIdx, 'currencyPrice');
                                }
                              "
                            >
                              <el-option
                                v-for="item in currencyOptions"
                                :key="item.currencyCode"
                                :label="item.currencyCode"
                                :value="item.currencyCode"
                              />
                            </el-select>
                          </el-form-item>
                        </template>
                      </el-input>
                    </el-form-item>
                  </div>
                  <div>
                    <el-form-item
                      label-width="0"
                      :prop="
                        row?.productType === 1
                          ? 'weekSaleInfoList.' + weekIdx + '.profitRate'
                          : 'activeDiscountSkuBeanList.' +
                            ($index - 1) +
                            '.weekSaleInfoList.' +
                            weekIdx +
                            '.profitRate'
                      "
                      :rules="getprofitRateRule(row.weekSaleInfoList[weekIdx], row)"
                    >
                      <el-input
                        v-if="row?.productType === 1"
                        placeholder="毛利率"
                        v-model="row.weekSaleInfoList[weekIdx].profitRate"
                        @change="
                          (val) => {
                            handleParentChange(val, row, weekIdx, 'profitRate');
                          }
                        "
                      />
                      <el-input
                        v-else
                        maxlength="6"
                        size="small"
                        placeholder="毛利率"
                        v-model="row.weekSaleInfoList[weekIdx].profitRate"
                        :disabled="
                          [statusMap.approving, statusMap.approved].includes(
                            row.weekSaleInfoList[weekIdx].approveStatus
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
    :code="approvalCode"
    @close="handleApprovalClose"
  />
</template>

<script setup lang="ts">
  import { memberApi, productApi } from '@/api';
  import { ElMessage, ElSelect } from 'element-plus';
  import {
    DiscountTypeMap,
    DiscountType,
    discountTypeOptions,
  } from '@/views/msrpManage/activityDiscountSchedule/enum';
  import { isLocalhost } from '@/views/budget/budgetTable/script/variable';
  import ApprovalDialog from './approvalDialog.vue';
  import {
    setValue,
    currencyOptions,
    valuesToRange,
    rangeToValues,
    buildWeekMonth,
    handleEmptyStringValue,
  } from '../util';
  import {
    getDiscountTypeRule,
    getDiscountRateRule,
    gettransactionPriceRule,
    getcurrencyPriceRule,
    getprofitRateRule,
    canEdit,
    scrollToToday,
  } from '../activity';

  const emit = defineEmits(['success']);
  const editScene = ref('');
  const queryCode = ref('');
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

  const handleParentChange = (val, row, weekIdx, field) => {
    // 需要联动的项
    if (field !== 'discountRate' && field !== 'transactionPrice' && field !== 'profitRate') {
      return;
    }

    if (row?.productType === 1 && row.activeDiscountSkuBeanList) {
      let haveChange = false;

      const subValue = parseFloat(val);
      if (!isNaN(subValue)) {
        row?.activeDiscountSkuBeanList?.forEach((item) => {
          // 待提交、审批拒绝，统一修改下面的sku折扣信息
          if (canEdit(item.weekSaleInfoList[weekIdx])) {
            item.weekSaleInfoList[weekIdx][field] = subValue;
            const isHaveChange = correlation(
              item.weekSaleInfoList[weekIdx],
              weekIdx,
              field,
              subValue,
              isLocalhost ? 100 : item.skuSalePrice
            );
            if (!haveChange && isHaveChange) {
              haveChange = true;
            }
          }
        });
        if (haveChange) {
          // 赋值给另一列
          if (field === 'discountRate') {
            correlationToParent(row, weekIdx, 'transactionPrice');
          } else if (field === 'transactionPrice') {
            correlationToParent(row, weekIdx, 'discountRate');
          }
        }
      }
    } else {
      const haveChange = correlation(
        row.weekSaleInfoList[weekIdx],
        weekIdx,
        field,
        val,
        isLocalhost ? 100 : row.skuSalePrice
      );
      const spuItem = findSpuItem(row.parentCode);

      if (spuItem) {
        correlationToParent(spuItem, weekIdx, field);
        if (haveChange) {
          // 赋值给另一列
          if (field === 'discountRate') {
            correlationToParent(spuItem, weekIdx, 'transactionPrice');
          } else if (field === 'transactionPrice') {
            correlationToParent(spuItem, weekIdx, 'discountRate');
          }
        }
      }
    }
  };

  const findSpuItem = (code) => {
    return form.value;
  };

  const correlationToParent = (spuItem, weekIdx, field) => {
    const values = spuItem.activeDiscountSkuBeanList
      .map((skuItem) => {
        return skuItem.weekSaleInfoList[weekIdx][field];
      })
      .filter((x) => x !== null && x !== '' && x !== undefined && Number.isFinite(+x))
      .map((x) => +x);
    if (values.length) {
      const min = Math.min(...values);
      const max = Math.max(...values);
      spuItem.weekSaleInfoList[weekIdx][field] = min === max ? min : `${min}-${max}`;
    } else {
      spuItem.weekSaleInfoList[weekIdx][field] = '';
    }
  };

  const correlation = (skuItem, weekIdx, field, val, skuSalePrice) => {
    if (!+skuSalePrice) {
      return;
    }
    let haveChange = false;
    if (field == 'transactionPrice' && skuItem.hasCorrelation) {
      skuItem.discountRate = setValue(val, skuItem, field, skuSalePrice) || '';
      haveChange = true;
    }
    if (field == 'discountRate' && skuItem.hasCorrelation) {
      skuItem.transactionPrice = setValue(val, skuItem, field, skuSalePrice) || '';
      haveChange = true;
    }
    return haveChange;
  };

  const approvalDialogVisible = ref(false);
  const approvalStatus = ref(0);
  const approvalList = ref([]);
  const approvalCode = ref('');
  const handleApprovalClick = (list, index, code) => {
    const data = list[index];
    approvalStatus.value = data.approveStatus;
    approvalList.value = [];
    approvalCode.value = code;
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
    const params = {
      ...form.value,
      weekSaleInfoList: rangeToValues(form.value.weekSaleInfoList),
    };
    handleEmptyStringValue([params]);
    await productApi.luteosProductMsrpAddActive(params);
  };

  const iconEdit = async () => {
    const weekSaleInfoList = rangeToValues(form.value.weekSaleInfoList);
    await productApi.luteosProductMsrpEditActive({
      code: queryCode.value,
      weekSaleInfoList,
    });
  };

  const loading = ref(false);
  // 编辑获取详情
  const queryDetail = async () => {
    try {
      loading.value = true;
      const spuItem = await productApi.luteosProductMsrpQueryEditActive({
        code: queryCode.value,
      });

      spuItem.weekSaleInfoList = valuesToRange(spuItem.weekSaleInfoList || []);

      buildWeekMonth(spuItem.weekSaleInfoList);

      setTimeout(() => {
        scrollToToday(tableRef.value, 400);
      }, 1500);

      form.value = spuItem;

      querySkuList();
      console.log(form.value);
    } finally {
      loading.value = false;
    }
  };
  const skuList = ref([]);
  const querySkuList = async () => {
    if (!form.value.spuCode) return;
    const res = await productApi.luteosProductSkuQueryProductSkuList({
      keyWord: form.value.spuCode,
      pageNum: 1,
      pageSize: 100,
    });
    skuList.value = res?.productSkuBeanList?.map((item) => {
      return {
        name: item.productTitle,
        code: item.skuCode,
      };
    });
  };
  // 根据选择的sku获取列表数据，更新activeDiscountSkuBeanList
  const querySKuDetail = async () => {
    if (
      !form.value.spuCode ||
      !form.value.countryCode ||
      !form.value.channel ||
      !form.value.skuCodeList.length
    )
      return;
    try {
      loading.value = true;
      const res = await productApi
        .luteosProductMsrpQueryEditActive({
          spuCode: form.value.spuCode,
          countryCode: form.value.countryCode,
          channel: form.value.channel,
          skuCodeList: form.value.skuCodeList.length ? form.value.skuCodeList.join(',') : '',
        })
        .catch(() => {
          form.value.activeDiscountSkuBeanList = [];
          loading.value = false;
        });

      const activeDiscountSkuBeanList = res.activeDiscountSkuBeanList || [];

      form.value.activeDiscountSkuBeanList = activeDiscountSkuBeanList.map((skuItem) => {
        const oldItem = (form.value.activeDiscountSkuBeanList || []).find(
          (o) => o.skuCode === skuItem.skuCode
        );
        return oldItem || skuItem; // 优先使用用户已输入的
      });
      setOffestMap();
    } finally {
      loading.value = false;
    }
  };
  const handleSkuChange = (val) => {
    if (val.includes('all')) {
      form.value.skuCodeList = skuList.value.map((res) => res.code);
    }
    querySKuDetail();
  };
  const offsetMap = ref({});
  const setOffestMap = () => {
    const weekList = form.value?.weekSaleInfoList || [];
    console.log(weekList);
    for (let i = 0; i < weekList?.length; i++) {
      if (i === 0) {
        offsetMap.value[0] = 0;
      } else {
        offsetMap.value[i] = offsetMap.value[i - 1] + 400;
      }
    }
  };
  const getCurrentWeek = () => {
    const now = new Date();
    const year = now.getFullYear();
    // 获取当年1月1日的日期对象
    const firstDay = new Date(year, 0, 1);
    // 计算1月1日是周几（0=周日，1=周一，...，6=周六）
    const firstDayWeek = firstDay.getDay() || 7; // 转换为1-7（1=周一，7=周日）

    // 计算当前日期与1月1日的天数差（毫秒转天）
    const diffTime = now - firstDay;
    const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24)) + 1; // +1是因为包含当天

    // 计算周数（考虑1月1日所在周的偏移）
    const week = Math.ceil((diffDays + firstDayWeek - 1) / 7);
    return week;
  };
  const gtmList = ref<any[]>([]);
  const queryGtmList = async () => {
    const res = await memberApi.luteosMemberQuerySubDeptList({ parentId: 662388969 });
    gtmList.value = res?.deptInfoList;
  };

  const tableRef = ref();

  const checkedColumnsMonth = ref([new Date().getMonth() + 1]);
  const handleOpen = () => {};

  const handleClose = (done) => {
    tableRef.value.setScrollLeft(0);
    visible.value = false;
    done();
  };

  const open = async (code, scene) => {
    queryCode.value = code;
    form.value = {};
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
  :deep(.el-tag) {
    max-width: 76px !important;
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
    font-size: 16px;
  }
  .color-grey {
    color: #999;
  }
  :deep(.el-form-item--default .el-form-item__error) {
    padding-top: 1px;
  }
</style>
