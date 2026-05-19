<template>
  <el-tabs v-model="curTab" @tab-change="handleTabChange">
    <el-tab-pane label="所有" :name="0" />
    <el-tab-pane label="亚马逊" name="amazon" />
    <el-tab-pane label="独立站" name="shopify" />
  </el-tabs>
  <KeenList
    @refresh="refreshList"
    @reset-search="resetSearch"
    @reset-search-by-key="(key) => (search[key] = undefined)"
  >
    <template #search>
      <div class="keyword-search">
        <el-select class="keyword-search-type" v-model="search.keywordType" style="width: 100px">
          <el-option label="SPU" :value="1" />
          <el-option label="SKU" :value="2" />
          <el-option label="产品名称" :value="3" />
        </el-select>
        <el-input
          class="keyword-search-word"
          v-model="search.keyword"
          placeholder="请输入"
          clearable
        />
      </div>
    </template>
    <template #filters>
      <ProductChannelSelect
        v-model="search.channelList"
        v-if="!['amazon', 'shopify'].includes(curTab)"
        clearable
        multiple
      />
      <CountrySelect v-model="search.countryCodeList" clearable multiple />
      <el-select
        v-model="search.gtmList"
        :options="gtmList"
        :props ="{ label: 'deptName', value: 'deptName' }"
        placeholder="GTM组"
        clearable
        multiple
        filterable
        collapse-tags
        collapse-tags-tooltip
      />
      <DeptMember v-model="search.operatorList" deptId="65717209" placeholder="运营" multiple />
      <el-select
        v-model="month"
        placeholder="月份"
        clearable
        @change="scrollMonthToView(tableRef, month)"
      >
        <el-option :value="1" label="1月" />
        <el-option :value="2" label="2月" />
        <el-option :value="3" label="3月" />
        <el-option :value="4" label="4月" />
        <el-option :value="5" label="5月" />
        <el-option :value="6" label="6月" />
        <el-option :value="7" label="7月" />
        <el-option :value="8" label="8月" />
        <el-option :value="9" label="9月" />
        <el-option :value="10" label="10月" />
        <el-option :value="11" label="11月" />
        <el-option :value="12" label="12月" />
      </el-select>
    </template>
    <template #buttons>
      <el-button type="primary" @click="addDialogRef?.open()">新增</el-button>
      <el-button type="primary" @click="batchUpdateVisible = true">导入</el-button>
      <!-- :disabled="selectedList?.length === 0" -->
      <!-- <el-button type="primary" @click="editDataMore">批量编辑</el-button> -->
      <el-popover
        popper-class="rt_el_pop"
        :offset="0"
        :hide-after="0"
        placement="bottom-end"
        :width="200"
        trigger="click"
      >
        <div class="h-xl-100 p-5">
          <el-checkbox
            v-model="checkAll"
            :indeterminate="isIndeterminate"
            @change="handleCheckAllChange"
          >
            全选
          </el-checkbox>
          <el-checkbox-group v-model="checkedColumns" @change="handleCheckedChange">
            <el-checkbox value="sku" label="SKU/产品名称" />
            <el-checkbox value="msrp" label="MSRP" />
            <el-checkbox value="country" label="国家/渠道" />
            <el-checkbox value="operator" label="运营/GTM组" />
            <!--  <el-checkbox value="monthSale" label="月销售额" />-->
          </el-checkbox-group>
        </div>
        <template #reference>
          <el-button class="button" type="primary">列设置</el-button>
        </template>
      </el-popover>
      <el-popover
        popper-class="rt_el_pop"
        :offset="0"
        :hide-after="0"
        placement="bottom-end"
        :width="200"
        trigger="click"
        v-if="statusEdit"
      >
        <div class="h-xl-100 p-5">
          <el-checkbox-group v-if="false" :max="1" v-model="checkedColumnsMonth">
            <el-checkbox :value="value" :label="`${value}月`" v-for="value in 12" :key="value" />
          </el-checkbox-group>
          <el-radio-group v-model="checkedColumnsMonthIndex" @change="handleCheckedMonthChange">
            <el-radio :label="value" v-for="value in 12" :key="value">{{ value }}月</el-radio>
          </el-radio-group>
        </div>
        <template #reference>
          <el-button class="button" type="primary">编辑列设置</el-button>
        </template>
      </el-popover>
    </template>
    <template #tools-prepend>
      <el-button
        class="button"
        type="primary"
        :loading="loading"
        :disabled="checkedColumnsMonth.length == 0"
        @click="saveData"
        v-if="statusEdit"
      >
        保存
      </el-button>
      <el-button-group class="ml-4">
        <el-button :type="!statusEditValue ? 'primary' : ''" @click="changeStatusEdit(false)">
          看板
        </el-button>
        <el-button :type="!!statusEditValue ? 'primary' : ''" @click="changeStatusEdit(true)">
          编辑
        </el-button>
      </el-button-group>
    </template>

    <el-form
      v-loading="loading"
      ref="formRef"
      :model="listData"
      label-width="80px"
      label-position="left"
      scroll-to-error
    >
      <!-- @selection-change="handleSelectionChange" -->
      <el-table
        ref="tableRef"
        v-loading="listLoading"
        :data="listData?.planSpuBeanList"
        row-key="code"
        border
        class-name="table-row-dashed"
        :tree-props="{ children: 'activeDiscountSkuBeanList' }"
        v-if="tableRefresh"
      >
        <!-- <el-table-column
          type="selection"
          width="40"
          reserve-selection
          :selectable="
            (row) =>
              row?.productType === 1 &&
              (selectedList?.length === 0 || row.countryCode === selectedList?.[0]?.countryCode)
          "
        /> -->
        <el-table-column label="SPU/产品名称" min-width="220" fixed="left">
          <template #default="{ row }">
            <GoodsInfo
              v-if="row?.spuName"
              :title="row.spuCode"
              :subtitle="row.spuName"
              hide-image
            />
          </template>
        </el-table-column>
        <el-table-column
          v-if="checkedColumns.includes('sku')"
          label="SKU/产品名称"
          min-width="160"
          fixed="left"
        >
          <template #default="{ row }">
            <GoodsInfo
              v-if="row?.skuCode"
              :title="row.skuCode"
              :subtitle="row.skuName"
              hide-image
            />
          </template>
        </el-table-column>
        <el-table-column
          v-if="checkedColumns.includes('msrp')"
          label="MSRP"
          prop="msrp"
          width="120"
          fixed="left"
        >
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
        <el-table-column
          v-if="checkedColumns.includes('country')"
          label="国家/渠道"
          width="90"
          fixed="left"
        >
          <template #default="{ row }">
            <div>
              <span style="display: block">{{ row?.countryDesc }}</span>
              <span>{{ row?.channelDesc }}</span>
            </div>
          </template>
        </el-table-column>
        <el-table-column
          v-if="checkedColumns.includes('operator')"
          label="运营/GTM组"
          min-width="120"
          fixed="left"
        >
          <template #default="{ row }">
            <div>
              <div>{{ row?.operatorDesc }}</div>
              <div>{{ row?.gtm }}</div>
            </div>
          </template>
        </el-table-column>
        <!--动态列-->
        <template
          v-for="(week, weekIdx) in listData?.planSpuBeanList?.[0]?.weekSaleInfoList"
          :key="weekIdx"
        >
          <el-table-column
            align="center"
            min-width="400"
            v-if="(statusEdit && isWeekShow(checkedColumnsMonth, week)) || !statusEdit"
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
                <div style="width: 30%">成交价</div>
                <div style="width: 40%">毛利率</div>
              </div>
            </template>
            <template #default="{ row, $index: rowIndex }">
              <!-- 编辑状态 -->
              <div class="w-100" v-if="statusEdit && canEdit(row?.weekSaleInfoList?.[weekIdx])">
                <div class="w-100 mb-2">
                  <el-form-item
                    style="width: 100%"
                    label-width="0"
                    :prop="
                      row.productType !== 1
                        ? `planSpuBeanList[${row.spuIndex}].activeDiscountSkuBeanList[${row.skuIndex}].weekSaleInfoList[${weekIdx}].discountTypeList`
                        : `planSpuBeanList[${row.spuIndex}].weekSaleInfoList[${weekIdx}].discountTypeList`
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
                </div>
                <div class="w-100 d-flex gap-2">
                  <!-- ----------------------------------折扣率 编辑状态--------------------- -->
                  <div>
                    <el-form-item
                      label-width="0"
                      :prop="
                        row.productType !== 1
                          ? `planSpuBeanList[${row.spuIndex}].activeDiscountSkuBeanList[${row.skuIndex}].weekSaleInfoList[${weekIdx}].discountRate`
                          : `planSpuBeanList[${row.spuIndex}].weekSaleInfoList[${weekIdx}].discountRate`
                      "
                      :rules="getDiscountRateRule(row?.weekSaleInfoList?.[weekIdx], row)"
                    >
                      <el-input
                        size="small"
                        placeholder="折扣率"
                        v-model="row.weekSaleInfoList[weekIdx].discountRate"
                        @change="
                          (val) => {
                            changeVal(val, row, weekIdx, 'discountRate');
                          }
                        "
                      >
                        <template #append>%</template>
                      </el-input>
                    </el-form-item>
                  </div>
                  <!-- ----------------------------------成交价 编辑状态--------------------- -->
                  <div style="width: 5%">
                    <el-icon
                      class="link-icon"
                      v-if="row?.productType === 2"
                      :class="{ 'color-grey': !row?.weekSaleInfoList?.[weekIdx].hasCorrelation }"
                      @click="
                        row.weekSaleInfoList[weekIdx].hasCorrelation =
                          +!row?.weekSaleInfoList?.[weekIdx].hasCorrelation
                      "
                    >
                      <Link />
                    </el-icon>
                  </div>
                  <div style="width: 70%">
                    <el-form-item
                      label-width="0"
                      :prop="
                        row.productType !== 1
                          ? `planSpuBeanList[${row.spuIndex}].activeDiscountSkuBeanList[${row.skuIndex}].weekSaleInfoList[${weekIdx}].transactionPrice`
                          : `planSpuBeanList[${row.spuIndex}].weekSaleInfoList[${weekIdx}].transactionPrice`
                      "
                      :rules="gettransactionPriceRule(row?.weekSaleInfoList?.[weekIdx], row)"
                    >
                      <el-input
                        size="small"
                        placeholder="成交价"
                        v-model="row.weekSaleInfoList[weekIdx].transactionPrice"
                        @change="
                          (val) => {
                            changeVal(val, row, weekIdx, 'transactionPrice');
                          }
                        "
                      >
                        <template #append>
                          <el-form-item
                            label-width="0"
                            :prop="
                              row.productType !== 1
                                ? `planSpuBeanList[${row.spuIndex}].activeDiscountSkuBeanList[${row.skuIndex}].weekSaleInfoList[${weekIdx}].currencyPrice`
                                : `planSpuBeanList[${row.spuIndex}].weekSaleInfoList[${weekIdx}].currencyPrice`
                            "
                            :rules="getcurrencyPriceRule(row?.weekSaleInfoList?.[weekIdx], row)"
                          >
                            <el-select
                              v-model="row.weekSaleInfoList[weekIdx].currencyPrice"
                              placeholder="币种"
                              filterable
                              clearable
                              style="min-width: 85px"
                              @change="
                                changeVal(
                                  row?.weekSaleInfoList?.[weekIdx].currencyPrice,
                                  row,
                                  weekIdx,
                                  'currencyPrice'
                                )
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
                  <!-- ----------------------------------毛利率 编辑状态--------------------- -->
                  <div>
                    <el-form-item
                      label-width="0"
                      :prop="
                        row.productType !== 1
                          ? `planSpuBeanList[${row.spuIndex}].activeDiscountSkuBeanList[${row.skuIndex}].weekSaleInfoList[${weekIdx}].profitRate`
                          : `planSpuBeanList[${row.spuIndex}].weekSaleInfoList[${weekIdx}].profitRate`
                      "
                      :rules="getprofitRateRule(row?.weekSaleInfoList?.[weekIdx], row)"
                    >
                      <el-input
                        size="small"
                        maxlength="6"
                        placeholder="毛利率"
                        @change="
                          changeVal(
                            row?.weekSaleInfoList?.[weekIdx].profitRate,
                            row,
                            weekIdx,
                            'profitRate'
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
              <!-- 只读状态 -->
              <div class="w-100 d-flex px-3 fs-7" v-else>
                <!-- ----------------------------------折扣率 查看状态--------------------- -->
                <div style="width: 30%">
                  <div v-if="row?.weekSaleInfoList[weekIdx]?.discountRate">
                    {{ row?.weekSaleInfoList[weekIdx]?.discountRate }}%
                  </div>
                </div>
                <!-- ----------------------------------成交价 查看状态--------------------- -->

                <div style="width: 40%">
                  {{ row?.weekSaleInfoList[weekIdx]?.transactionPrice }}
                  {{ row?.weekSaleInfoList[weekIdx]?.currencyPrice }}
                </div>

                <!-- ----------------------------------毛利率 查看状态--------------------- -->
                <div style="width: 30%">
                  <div v-if="row?.weekSaleInfoList[weekIdx]?.profitRate">
                    {{ row?.weekSaleInfoList[weekIdx]?.profitRate }}%
                  </div>
                </div>
              </div>
              <template v-if="!statusEdit">
                <Tag
                  v-for="(item, tagIndex) in row?.weekSaleInfoList[weekIdx]?.discountTypeList"
                  :key="tagIndex"
                  class="ms-3 mt-1"
                  :color="DiscountTypeColorMap[item]"
                >
                  {{ DiscountTypeMap[item] || '' }}
                </Tag>
                <div
                  class="edit-icon"
                  v-if="
                    !row?.activeDiscountSkuBeanList?.length &&
                    !row?.weekSaleInfoList[weekIdx]?.discountRate &&
                    !row?.weekSaleInfoList[weekIdx]?.transactionPrice &&
                    !row?.weekSaleInfoList[weekIdx]?.profitRate
                  "
                ></div>
                <el-tooltip
                  v-if="
                    !row?.activeDiscountSkuBeanList?.length &&
                    (row?.weekSaleInfoList[weekIdx]?.discountRate ||
                      row?.weekSaleInfoList[weekIdx]?.transactionPrice ||
                      row?.weekSaleInfoList[weekIdx]?.profitRate)
                  "
                  popper-class="action_tool_tip text-gray-600"
                  placement="top-start"
                  effect="light"
                  :content="row?.weekSaleInfoList[weekIdx]?.approveStatusDesc"
                >
                  <SvgIcon
                    class="svg-icon status-icon"
                    v-if="row?.weekSaleInfoList[weekIdx]?.approveStatusDesc"
                    :icon="svgNameMap[row?.weekSaleInfoList[weekIdx]?.approveStatus]"
                  />
                </el-tooltip>
              </template>
            </template>
          </el-table-column>
        </template>

        <el-table-column label="操作" fixed="right" width="100">
          <template #default="{ row }">
            <KeenActions
              display-style="buttons"
              :actions="[
                {
                  label: '编辑',
                  key: 'edit',
                  type: 'primary',
                  permissionCode: '',
                  hide: statusEdit,
                  row,
                },
                {
                  label: '详情',
                  key: 'view',
                  type: 'primary',
                  permissionCode: '',
                  row,
                },
                // {
                //   label: '审批记录',
                //   key: 'approvalLog',
                //   type: 'primary',
                //   permissionCode: '',
                //   row,
                // },
              ]"
              @click="handleActions"
            />
          </template>
        </el-table-column>
      </el-table>
      <KeenPagination
        :current="current"
        :page-size="pageSize"
        :page-size-option="pageSizeOption"
        :total="total"
        @size-change="handlePageSizeChange"
        @current-change="handleCurrentChange"
      />
    </el-form>
  </KeenList>
  <AddDialog ref="addDialogRef" @success="refreshList" />
  <SpuEditDialog ref="spuEditDialogRef" @success="refreshList" />
  <SkuEditDialog ref="skuEditDialogRef" @success="refreshList" />
  <SpuDetailDialog ref="spuDetailDialogRef" />
  <SkuDetailDialog ref="skuDetailDialogRef" />
  <ApprovalLogDialog ref="approvalLogDialogRef" />
  <BatchEditDialog
    ref="batchEditDialogRef"
    @success="
      () => {
        refreshList();
        tableRef?.clearSelection();
      }
    "
  />
  <BatchImportModal
    v-if="batchUpdateVisible"
    :visible="batchUpdateVisible"
    importScene="product_msrp_plan_import"
    title="导入"
    importDesc="活动折扣计划"
    :isAsync="true"
    @close="batchUpdate"
  />
</template>

<script setup lang="ts" name="activityDiscountSchedule">
  import useList from '@/hooks/list/useList';
  import { memberApi, productApi, ProductApi } from '@/api';
  import SkuEditDialog from '@/views/msrpManage/activityDiscountSchedule/components/skuEditDialog.vue';
  import SpuEditDialog from '@/views/msrpManage/activityDiscountSchedule/components/spuEditDialog.vue';
  import SpuDetailDialog from '@/views/msrpManage/activityDiscountSchedule/components/spuDetailDialog.vue';
  import SkuDetailDialog from '@/views/msrpManage/activityDiscountSchedule/components/skuDetailDialog.vue';
  import ApprovalLogDialog from '@/views/msrpManage/activityDiscountSchedule/components/approvalLogDialog.vue';
  import AddDialog from '@/views/msrpManage/activityDiscountSchedule/components/addDialog.vue';
  import BatchEditDialog from '@/views/msrpManage/activityDiscountSchedule/components/batchEditDialog.vue';
  import * as swal from '@/utils/swal';
  import { ElMessage, ElSelect } from 'element-plus';
  import dayjs from 'dayjs';
  import {
    setValue,
    currencyOptions,
    valuesToRange,
    rangeToValues,
    buildWeekMonth,
    handleEmptyStringValue,
  } from './util';
  import { DiscountTypeColorMap, DiscountTypeMap, discountTypeOptions } from './enum';
  import {
    getDiscountTypeRule,
    getDiscountRateRule,
    gettransactionPriceRule,
    getcurrencyPriceRule,
    getprofitRateRule,
    canEdit,
    scrollMonthToView,
    scrollToToday,
    isWeekShow,
  } from './activity';

  /* const discountTypeMap = {
      1: {
        desc: '折扣',
        color: 'blue',
      },
      2: {
        desc: '直降7DD',
        color: 'red',
      },
      3: {
        desc: '直降LD',
        color: 'purple',
      },
    }; */

  const svgNameMap = {
    0: 'approvalRejected',
    1: 'approving',
    2: 'approved',
    3: 'approvalRejected',
  };
  const statusMap = ref({
    waitSubmit: 0, // 待提交
    approving: 1, // 审批中
    approved: 2, // 审核通过
    approvalRejected: 3, // 审核拒绝
  });
  const month = ref();
  const tableRef = ref();
  const PAGE_SIZE = 10;
  const offsetMap = ref({});

  const isLocalhost = location.hostname === 'localhost';

  // localhost
  if (isLocalhost) {
    window.__getListData = () => {
      return { list: listData.value, offsetMap };
    };
  }

  const isIndeterminate = ref(false);
  const statusEdit = ref(!!isLocalhost); // 编辑状态
  const statusEditValue = ref(!!isLocalhost); // 看板状态
  const makeEdit = ref(false); // 是否已编辑过数据
  const loading = ref(false);
  const tableRefresh = ref(true);
  const columnList = ref(['sku', 'msrp', 'country', 'operator', 'monthSale']);
  const checkedColumns = ref(
    localStorage.getItem('checkedColumns')
      ? JSON.parse(localStorage.getItem('checkedColumns'))
      : ['sku', 'msrp', 'country', 'operator', 'monthSale']
  );
  const checkedColumnsMonth = ref(
    localStorage.getItem('checkedColumnsMonth')
      ? JSON.parse(localStorage.getItem('checkedColumnsMonth'))
      : [new Date().getMonth() + 1]
  );

  const checkedColumnsMonthIndex = ref(checkedColumnsMonth.value[0]);

  const checkAll = ref();
  if (checkedColumns.value.length === columnList.value.length) checkAll.value = true;
  const formRef = ref();
  const form = ref({});
  const {
    search,
    // searchData,
    pagination: {
      total,
      current,
      pageSize,
      handleCurrentChange,
      pageSizeOption,
      handlePageSizeChange,
    },
    listData,
    listLoading,
    refreshList,
    runQuery,
    resetSearch,
    // selectedKeys,
  } = useList<
    ProductApi.LuteosProductMsrpQueryPlanList.RequestBody,
    ProductApi.LuteosProductMsrpQueryPlanList.ResponseBody
  >({
    searchDefaults: {
      keyword: isLocalhost ? 'SPU000664' : undefined,
      keywordType: 1,
      channelList: undefined,
      countryCodeList: undefined,
      gtmList: undefined,
      gtmList: undefined,
      operatorList: undefined,
    },
    // eslint-disable-next-line no-shadow
    // interceptSearchData: (searchData) => searchData,
    pageSize: PAGE_SIZE,
    service: async (params) => {
      const res = await productApi.luteosProductMsrpQueryPlanList(params);
      res.planSpuBeanList.forEach((row, spuIndex) => {
        row.spuIndex = spuIndex;
        row.weekSaleInfoList.forEach((week, weekIdx) => {
          week.weekIndex = weekIdx;
          week.spuIndex = spuIndex;
        });
        row.activeDiscountSkuBeanList.forEach((sku, skuIndex) => {
          sku.skuIndex = skuIndex;
          sku.spuIndex = spuIndex;
          sku.parentCode = row.code;
          sku.weekSaleInfoList.forEach((week, weekIdx) => {
            sku.skuIndex = skuIndex;
            sku.spuIndex = spuIndex;
            week.weekIndex = weekIdx;
          });
        });

        row.weekSaleInfoList = valuesToRange(row.weekSaleInfoList || []);

        buildWeekMonth(row.weekSaleInfoList);
      });

      setTimeout(() => {
        setOffestMap();
        scrollToToday(tableRef.value, 400);
      }, 1500);

      return res;
    },
  });
  const setOffestMap = () => {
    const monthList = listData.value?.planSpuBeanList[0]?.weekSaleInfoList || [];
    for (let i = 0; i < monthList?.length; i++) {
      if (i === 0) {
        offsetMap.value[0] = 0;
      } else {
        offsetMap.value[i] = 400 * i;
      }
    }
  };

  // 1. SPU维度的 折扣率、成交价、毛利率 均为所有SKU各数值区间
  // 2. 填写SPU的各数值时，所有SKU的数值自动覆盖该数值。反之，填写SKU的数值时，更新SPU的数值区间
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
    return listData.value?.planSpuBeanList?.find((spuItem) => {
      return spuItem.code === code;
    });
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

  const changeVal = (val, row, weekIdx, field) => {
    // console.log(val, row, weekIdx, field);
    handleParentChange(val, row, weekIdx, field);
    makeEdit.value = true; // 记录已编辑
  };
  const handleCheckedMonthChange = (value) => {
    checkedColumnsMonth.value = [value || new Date().getMonth() + 1];
  };
  const handleCheckedChange = (value) => {
    const checkedCount = value.length;
    checkAll.value = checkedCount === columnList.value.length;
    isIndeterminate.value = checkedCount > 0 && checkedCount < columnList.value.length;
    localStorage.setItem('checkedColumns', JSON.stringify(value));
    setOffestMap();
    scrollMonthToView(tableRef.value, month.value);
  };
  const handleCheckAllChange = (val) => {
    checkedColumns.value = val ? columnList.value : [];
    isIndeterminate.value = false;
    localStorage.setItem('checkedColumns', JSON.stringify(checkedColumns.value));
    setOffestMap();
    scrollMonthToView(tableRef.value, month.value);
    // tableRefresh.value = false
    // setTimeout(()=>{
    //   tableRefresh.value = true
    // },50)
  };

  const curTab = ref(0);
  const handleTabChange = (val) => {
    search.channelList = val ? [val] : [];
  };

  const handleWeekChange = (weekIdx) => {
    tableRef.value.setScrollLeft(offsetMap.value[weekIdx - 1]);
  };

  const addDialogRef = ref();
  const spuEditDialogRef = ref();
  const skuEditDialogRef = ref();
  const spuDetailDialogRef = ref();
  const skuDetailDialogRef = ref();
  const batchEditDialogRef = ref();
  const approvalLogDialogRef = ref();

  const sceneMap = {
    iconEdit: 'iconEdit',
    btnEdit: 'btnEdit',
  };

  // 表格操作
  const handleActions = async (item) => {
    const { key, row } = item;
    if (key === 'edit') {
      if (row?.productType === 1) spuEditDialogRef.value?.open(row?.code, sceneMap.btnEdit);
      else skuEditDialogRef.value?.open(row?.code, sceneMap.btnEdit, row?.parentCode);
    }
    if (key === 'view') {
      if (row?.productType === 1) spuDetailDialogRef.value?.open(row?.code);
      else skuDetailDialogRef.value?.open(row?.code);
    }
    if (key === 'approvalLog') {
      approvalLogDialogRef.value?.open(row?.code);
    }
  };
  // 图标点击编辑
  const handleIconEdit = async (row, index, weekIndex, weekData) => {
    if (row?.productType === 1)
      spuEditDialogRef.value?.open(row?.code, sceneMap.iconEdit, weekData.week - 1);
    else skuEditDialogRef.value?.open(row?.code, sceneMap.iconEdit, weekData.week - 1);
  };

  // 导入
  const batchUpdateVisible = ref<boolean>(false);
  const batchUpdate = (reload) => {
    if (reload) {
      refreshList();
    }
    batchUpdateVisible.value = false;
  };

  // 批量编辑
  const selectedList = ref([]);
  const handleSelectionChange = (list) => {
    selectedList.value = list?.filter((item) => item.productType === 1);
  };
  const editDataMore = () => {
    selectedList.value = listData.value?.planSpuBeanList?.filter((item) => item.productType === 1);
    console.log(selectedList.value);
    batchEditDialogRef.value?.open(selectedList.value?.map((item) => item.code));
  };
  const gtmList = ref<any[]>([]);
  const queryGtmList = async () => {
    const res = await memberApi.luteosMemberQuerySubDeptList({ parentId: 662388969 });
    gtmList.value = res?.deptInfoList;
  };
  queryGtmList();

  // 编辑保存
  const saveData = async () => {
    // console.log(listData.value);
    // formRef.value.clearValidate();
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
      const needSaveWeekIndexList = (listData.value.planSpuBeanList || [])[0].weekSaleInfoList
        .map((week, index) => {
          const isShow = isWeekShow(checkedColumnsMonth.value, week);
          return isShow ? index : null;
        })
        .filter((x) => x !== null);
      console.log('needSaveWeekIndexList=', needSaveWeekIndexList);

      const activeDiscountSpuList = listData.value.planSpuBeanList.map((row) => {
        return {
          ...row,
          activeDiscountSkuBeanList: undefined,
          activeDiscountSkuList: row.activeDiscountSkuBeanList.map((skuItem) => {
            return {
              ...skuItem,
              weekSaleInfoList: skuItem.weekSaleInfoList.filter((_, index) => {
                return needSaveWeekIndexList.includes(index);
              }),
            };
          }),
          weekSaleInfoList: rangeToValues(row.weekSaleInfoList).filter((_, index) => {
            return needSaveWeekIndexList.includes(index);
          }),
        };
      });

      console.log('activeDiscountSpuList=', activeDiscountSpuList);

      handleEmptyStringValue(activeDiscountSpuList);

      loading.value = true;
      await productApi.luteosProductMsrpBatchAddActive({
        activeDiscountSpuList,
      });
      ElMessage.success('保存成功');
      makeEdit.value = false;
    } finally {
      loading.value = false;
    }
  };

  const changeStatusEdit = async (isEdit) => {
    statusEditValue.value = isEdit;
    if (makeEdit.value && statusEdit.value) {
      const isConfirmed = await swal.confirm({
        title: '请确认是否保存，如未保存，切换看板模式会导致已修改内容丢失',
        confirmButtonText: '切换模式',
        cancelButtonText: '取消',
      });
      if (isConfirmed) {
        statusEditValue.value = false;
      } else {
        statusEditValue.value = true;
        return;
      }
    }

    if (!statusEdit.value && statusEditValue.value) {
      // 初始化编辑数据
      refreshList();
      makeEdit.value = false;
    } else {
      refreshList();
    }
    statusEdit.value = statusEditValue.value;
  };
  onBeforeRouteLeave(async (_, __, next) => {
    if (statusEdit.value) {
      const isConfirmed = await swal.confirm({
        title: '目前为编辑状态，离开页面将无法保存已填写的数据请确认是否离开？',
        confirmButtonText: '离开',
        cancelButtonText: '留在当前',
      });
      if (isConfirmed) {
        next();
      }
    } else {
      next();
    }
  });

  onActivated(() => {
    tableRef.value?.clearSelection();
  });
</script>

<style scoped lang="scss">
  .keyword-search {
    display: inline-flex;
    align-items: center;

    .keyword-search-type {
      border-radius: 6px 0px 0px 6px;
      background: #fff;

      :deep(.el-select__wrapper) {
        border-radius: 6px 0px 0px 6px;
        background: #fff;
      }
    }

    .keyword-search-word {
      transform: translateX(-1px);
      width: 150px !important;

      :deep(.el-input__wrapper) {
        border-radius: 0 6px 6px 0;
      }
    }
  }
  :deep(.el-table__body) {
    .cell {
      display: flex;
      align-items: center;
      flex-wrap: wrap;
    }
  }
  .edit-icon {
    cursor: pointer;
    :deep(.el-icon) {
      width: 32px;
      height: 32px;
      margin-top: 5px;
    }
  }
  .status-icon {
    margin-left: 10px;
    margin-top: 10px;
    cursor: pointer;
    :deep(svg) {
      width: 18px !important;
      margin-top: -9px;
      height: 18px !important;
    }
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
