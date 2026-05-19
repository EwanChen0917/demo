<template>
  <div>
    <el-row class="page-top-box">
      <span v-for="(item, index) in statusTotalList" :key="index">
        {{ item.name }}：
        <span :class="`${item.color} text-num`">
          {{ statusTotalData[item.key] }}
          <el-tooltip
            v-if="item.name === '无供应商'"
            popper-class="action_tool_tip text-gray-600"
            placement="top-start"
            effect="light"
            :content="`供应商付款申请的支付对象，在中台找不到对应供应商及其金蝶编码`"
          >
            <QuestionFilled class="question-icon" style="margin-top: -3px; margin-left: 5px" />
          </el-tooltip>
        </span>
        <el-divider direction="vertical" v-if="item.line" class="me-6" />
      </span>
      <div class="w-100 mt-1">
        金蝶单据状态：
        <span v-for="(item, index) in statusJDTotalList" :key="index">
          {{ item.name }}：
          <span :class="`${item.color} text-num`">{{ statusTotalData[item.key] }}</span>
        </span>
      </div>
    </el-row>
    <KeenList
      @refresh="refreshList"
      @reset-search="resetSearch"
      @reset-search-by-key="(key) => (search[key] = undefined)"
    >
      <template #search>
        <el-input
          v-model.trim="search.keyword"
          placeholder="流程名称/申请人/异常信息"
          class="w-300px"
          clearable
        >
          <template #prefix>
            <SvgIconSearch />
          </template>
        </el-input>
        <el-input
          v-model="orderCodes"
          placeholder="审批单号"
          class="ms-3 w-310px"
          clearable
          @change="handleBlur"
          @blur="handleBlur"
        >
          <template #suffix>
            <i class="iconfont icon-sousuo"></i>
          </template>
          <template #append>
            <BatchSearchPopover
              ref="batchSearchRef"
              @search="handleBatchSearch"
              @clear="handleBatchClear"
            />
          </template>
        </el-input>
      </template>
      <template #filters>
        <el-select
          v-model="search.payUnitCodes"
          placeholder="支付单位"
          clearable
          filterable
          :teleported="false"
          multiple
          collapse-tags
          collapse-tags-tooltip
        >
          <el-option
            v-for="item in organizationList"
            :label="item.name"
            :value="item.code"
            :key="item.code"
          />
        </el-select>
        <el-date-picker
          v-model="search.completeDate"
          type="daterange"
          value-format="YYYY-MM-DD"
          range-separator="-"
          start-placeholder="完成开始日期"
          end-placeholder="完成结束日期"
          class="w-310px"
        />
        <el-date-picker
          v-model="search.time"
          type="daterange"
          value-format="YYYY-MM-DD"
          range-separator="-"
          start-placeholder="记账开始日期"
          end-placeholder="记账结束日期"
          class="w-310px"
        />
        <el-input
          v-model.trim="search.amountGe"
          oninput="if(value.length>12)value=value.slice(0,12)"
          type="number"
          class="w-150px"
          placeholder="应付金额"
        />
        _
        <el-input
          v-model.trim="search.amountLe"
          oninput="if(value.length>12)value=value.slice(0,12)"
          type="number"
          class="w-150px"
          placeholder="应付金额"
        />
        <el-select
          class="creator-oa-invoice"
          v-model="search.kingdeePushStatus"
          placeholder="推送状态"
          filterable
          clearable
          multiple
          collapse-tags
          collapse-tags-tooltip
          :max-collapse-tags="1"
        >
          <el-option
            v-for="item in statusList"
            :key="item.code"
            :label="item.name"
            :value="item.code"
          />
        </el-select>
        <el-select
          class="creator-oa-invoice"
          v-model="search.tags"
          placeholder="标识"
          filterable
          clearable
          multiple
          collapse-tags
          collapse-tags-tooltip
          :max-collapse-tags="1"
        >
          <el-option
            v-for="item in tagsList"
            :key="item.code"
            :label="item.name"
            :value="item.code"
          />
        </el-select>
        <el-select
          class="creator-oa-invoice"
          v-model="search.kingdeeStatus"
          placeholder="金蝶单据状态"
          filterable
          clearable
          multiple
          collapse-tags
          collapse-tags-tooltip
          :max-collapse-tags="1"
        >
          <el-option
            v-for="item in statusJdList"
            :key="item.code"
            :label="item.name"
            :value="item.code"
          />
        </el-select>
      </template>
      <template #buttons>
        <el-dropdown @command="handlePushCommand">
          <el-button type="primary" :loading="batchPushLoading">
            推送
            <el-icon class="el-icon--right">
              <arrow-down />
            </el-icon>
          </el-button>
          <template #dropdown>
            <el-dropdown-menu>
              <el-dropdown-item command="batchPush">推送所选</el-dropdown-item>
              <el-dropdown-item command="batchSearchPush">按筛选条件推送</el-dropdown-item>
            </el-dropdown-menu>
          </template>
        </el-dropdown>
        <el-dropdown @command="handlePushCommand">
          <el-button type="primary" :loading="markLoading">
            推送标识
            <el-icon class="el-icon--right">
              <arrow-down />
            </el-icon>
          </el-button>
          <template #dropdown>
            <el-dropdown-menu>
              <el-dropdown-item command="markPush">
                <el-tooltip placement="right" effect="light">
                  <template #content>
                    <div>所选行的推送状态，变更为“无需推送”</div>
                  </template>
                  <div class="w-100">标记所选</div>
                </el-tooltip>
              </el-dropdown-item>
              <el-dropdown-item command="markPushSearch">
                <el-tooltip placement="right" effect="light">
                  <template #content>
                    <div>当前筛选条件下所有数据行，推送状态，变更为“无需推送”</div>
                  </template>
                  <div class="w-100">按筛选条件标记</div>
                </el-tooltip>
              </el-dropdown-item>
              <el-dropdown-item command="cancelMarkPush">
                <el-tooltip placement="right" effect="light">
                  <template #content>
                    <div>所选行的推送状态，变更为“未推送”</div>
                  </template>
                  <div class="w-100">取消标记所选</div>
                </el-tooltip>
              </el-dropdown-item>
              <el-dropdown-item command="cancelMarkPushSearch">
                <el-tooltip placement="right" effect="light">
                  <template #content>
                    <div>当前筛选条件下所有数据行，推送状态，变更为“未推送”</div>
                  </template>
                  <div class="w-100">按筛选条件取消标记</div>
                </el-tooltip>
              </el-dropdown-item>
            </el-dropdown-menu>
          </template>
        </el-dropdown>
        <el-dropdown @command="handlePushCommand">
          <el-button type="primary" :loading="batchPushLoadingJd">
            更新金蝶单据状态
            <el-icon class="el-icon--right">
              <arrow-down />
            </el-icon>
          </el-button>
          <template #dropdown>
            <el-dropdown-menu>
              <el-dropdown-item command="batchPushJd">更新所选</el-dropdown-item>
              <el-dropdown-item command="batchSearchPushJd">按筛选条件更新</el-dropdown-item>
            </el-dropdown-menu>
          </template>
        </el-dropdown>
        <ExportBtn
          :service="financeSystemApi.financeOaPaymentOrderExportList"
          :params="buildQueryParams(search)"
        >
          导出
        </ExportBtn>
      </template>
      <template #tools-prepend>
        <el-tooltip placement="top">
          <template #content>
            <div v-if="store.taskMap[refreshType.OA付款单].apiSync">数据获取并更新中…</div>
            <div v-else>
              <div>
                从钉钉OA拉取付款数据，上次更新时间：{{
                  store.taskMap[refreshType.OA付款单].lastRefreshTime
                }}
              </div>
            </div>
          </template>
          <i
            class="iconfont icon-shujutongbu1"
            :class="{ 'icon-loading': store.taskMap[refreshType.OA付款单].apiSync }"
            @click="handleRefresh(refreshType.OA付款单)"
          ></i>
        </el-tooltip>
      </template>
      <el-table
        ref="tableRef"
        v-loading="listLoading"
        :data="listData?.records"
        row-key="orderCode"
        class-name="table-row-dashed"
        @selection-change="handleSelectionChange"
      >
        <el-table-column type="selection" width="40" reserve-selection fixed />
        <el-table-column label="审批单号" prop="orderCode" width="175" />
        <el-table-column label="流程名称" prop="processName" width="150" />
        <el-table-column label="金蝶单据状态" prop="kingdeeStatusTitle" width="100">
          <template #default="{ row }">
            <Tag
              :color="statusColorMapJd[row?.kingdeeStatus]"
              size="small"
              v-if="row?.kingdeeStatus"
            >
              {{ row?.kingdeeStatusTitle }}
            </Tag>
            <div v-else>{{ row?.kingdeeStatusTitle }}</div>
          </template>
        </el-table-column>
        <el-table-column label="完成日期" prop="completeDate" width="150" />
        <el-table-column label="申请人" prop="applicantName" />
        <el-table-column label="申请部门" prop="departmentNames" min-width="110" />
        <el-table-column label="结算币别" min-width="110">
          <template #default="{ row }">
            <div>{{ row.currencyCode }} {{ row.currencyName ? `[${row.currencyName}]` : '' }}</div>
          </template>
        </el-table-column>
        <el-table-column label="付款币别" min-width="110">
          <template #default="{ row }">
            <div>
              {{ row.payCurrencyCode }} {{ row.payCurrencyName ? `[${row.payCurrencyName}]` : '' }}
            </div>
          </template>
        </el-table-column>
        <el-table-column label="应付金额" prop="totalAmount" />
        <el-table-column label="税额" prop="totalTax" />
        <el-table-column label="手续费" prop="totalFee" />
        <el-table-column label="研发项目" prop="researchProject" />
        <el-table-column label="支付单位" prop="payUnit" min-width="160" />
        <el-table-column label="支付对象" prop="payee" min-width="160" />
        <el-table-column label="标识" prop="tagsNames" min-width="150" />
        <el-table-column label="付款账号" prop="paymentAccount" min-width="150" />
        <el-table-column label="推送状态" prop="kingdeePushBean" width="100">
          <template #default="{ row }">
            <Tag
              :color="statusColorMap[row?.kingdeePushBean?.pushStatus]"
              size="small"
              v-if="
                row?.kingdeePushBean?.pushStatus == 3 ||
                row?.kingdeePushBean?.pushStatus == 0 ||
                row?.kingdeePushBean?.pushStatus == 1 ||
                row?.kingdeePushBean?.pushStatus == 2
              "
            >
              {{ row?.kingdeePushBean?.pushStatusDesc }}
            </Tag>
            <div v-else>{{ row?.kingdeePushBean?.pushStatusDesc }}</div>
          </template>
        </el-table-column>
        <el-table-column label="异常信息" prop="kingdeePushBean" min-width="120">
          <template #default="{ row }">
            <el-tooltip placement="top" effect="light">
              <template #content>
                <div style="max-width: 600px; color: var(--bs-danger)">
                  {{ row?.kingdeePushBean?.failReason }}
                </div>
              </template>
              <div class="text-one">{{ row?.kingdeePushBean?.failReason }}</div>
            </el-tooltip>
          </template>
        </el-table-column>
        <el-table-column label="备注" prop="remark" width="300">
          <template #default="{ row }">
            <div class="remark-box">
              <OverflowTooltip effect="light" :content="row?.remark" :line="2" />
              <el-icon
                style="color: var(--bs-success)"
                :size="20"
                class="icon2"
                @click="remarkChange(row)"
              >
                <Edit />
              </el-icon>
            </div>
          </template>
        </el-table-column>
        <el-table-column label="推送时间" prop="kingdeePushBean" width="150">
          <template #default="{ row }">
            {{ row?.kingdeePushBean?.pushTime }}
          </template>
        </el-table-column>
        <el-table-column label="记账日期" prop="accountDate" width="110" />
        <el-table-column label="操作" fixed="right" width="130">
          <template #default="{ row }">
            <KeenActions
              display-style="buttons"
              :actions="[
                {
                  label: '详情',
                  key: 'detail',
                  type: 'primary',
                  row: row,
                },
                {
                  label: '编辑',
                  key: 'edit',
                  type: 'primary',
                  row: row,
                  disabled: !row.button.canEdit,
                  permissionCode: 'financeOAPaymentBillsEdit',
                },
                {
                  label: '推送',
                  key: 'push',
                  type: 'primary',
                  row: row,
                  disabled: !row.button.canPushKingdee,
                  permissionCode: 'financeOAPaymentBillsPush',
                },
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
    </KeenList>
    <!-- 单据详情 -->
    <detailDialog
      v-if="detailVisible"
      :visible="detailVisible"
      :title="title"
      :code="code"
      @close="detailVisible = false"
      @success="detailEdit"
    />
    <!-- 备注修改 -->
    <remarkDialog ref="remarkDialogRef" @success="refreshList" />
    <FailDialog ref="failDialogRef" />
  </div>
</template>

<script setup lang="ts" name="financeOAPaymentBills">
  import useList from '@/hooks/list/useList';
  import { FinanceSystemApi, financeSystemApi, financeApi } from '@/api/index';
  import * as swal from '@/utils/swal';
  import { ElMessage } from 'element-plus';
  import detailDialog from './components/detailDialog.vue';
  import remarkDialog from './components/remarkDialog.vue';
  import { omit } from 'lodash-es';
  import dayjs from 'dayjs';
  import FailDialog from '@/views/finance/income/incomeAnalysis/components/failDialog.vue';
  import { refreshType } from '@/views/budget/base/enums/enums';
  import { useStore } from '@/store/modules/useStore';
  import useTask from '@/store/modules/task';
  import { financeBudgetRefresh, stopFinanceBudgetRefresh } from '@/worker/controls/notice';

  const route = useRoute();
  const store = useTask();
  const user = useStore();
  const PAGE_SIZE = 10;
  const statusTotalList = [
    { name: '总记录数', key: 'total', color: 'text-bule', line: true },
    { name: '已推送', key: 'totalRelateNumKingdee', color: 'text-green', line: false },
    { name: '无需推送', key: 'totalNotNeedPushingNumKingdee', color: 'text-green', line: false },
    { name: '推送中', key: 'totalPushingNumKingdee', color: 'text-grey', line: false },
    { name: '未推送', key: 'totalNotRelateNumKingdee', color: 'text-grey', line: false },
    { name: '推送失败', key: 'totalFailRelatedNumKingdee', color: 'text-red', line: true },
    { name: '已付', key: 'paidNum', color: 'text-green', line: false },
    { name: '无需支付', key: 'noPaymentRequiredNum', color: 'text-green', line: false },
    { name: '部分已付', key: 'partiallyPaidNum', color: 'text-bule', line: false },
    { name: '多付多预', key: 'overpaidAndPrepaidNum', color: 'text-bule', line: false },
    { name: '售后批量', key: 'bulkAfterSalesNum', color: 'text-bule', line: false },
    { name: '跨期', key: 'crossPeriodNum', color: 'text-bule', line: false },
    { name: '跨币种', key: 'crossCurrencyNum', color: 'text-bule', line: false },
    { name: '无支付信息', key: 'noPaymentInfoNum', color: 'text-red', line: false },
    { name: '无供应商', key: 'noSupplierNum', color: 'text-red', line: false },
    { name: '无付款账号', key: 'noPaymentAccountNum', color: 'text-red', line: false },
  ];
  const statusJDTotalList = [
    { name: '不存在', key: 'kingdeeNotExitsNum', color: 'text-green' },
    { name: '暂存', key: 'kingdeeTemporarySaveNum', color: 'text-green' },
    { name: '已提交', key: 'kingdeeSubmittedNum', color: 'text-green' },
    { name: '已审核', key: 'kingdeeAuditedNum', color: 'text-green' },
    { name: '已付款', key: 'kingdeePaymentProcessedNum', color: 'text-green' },
    { name: '其他', key: 'kingdeeOtherNum', color: 'text-green' },
  ];
  const statusTotalData = ref({
    crossPeriodNum: 0,
    crossCurrencyNum: 0,
    noPaymentAccountNum: 0,
    noPaymentInfoNum: 0,
    noPaymentRequiredNum: 0,
    noSupplierNum: 0,
    paidNum: 0,
    partiallyPaidNum: 0,
    totalFailRelatedNumFbt: 0,
    totalFailRelatedNumKingdee: 0,
    totalNotNeedPushingNumKingdee: 0,
    totalNotRelateNumFbt: 0,
    totalNotRelateNumKingdee: 0,
    totalPushingNumFbt: 0,
    totalPushingNumKingdee: 0,
    totalRelateNumFbt: 0,
    totalRelateNumKingdee: 0,
    overpaidAndPrepaid: 0,
    bulkAfterSalesNum: 0,
    overpaidAndPrepaidNum: 0,
    kingdeeAuditedNum: 0,
    kingdeeNotExitsNum: 0,
    kingdeeOtherNum: 0,
    kingdeePaymentProcessedNum: 0,
    kingdeeSubmittedNum: 0,
    kingdeeTemporarySaveNum: 0,
  });
  const statusList = [
    { name: '已推送', code: 1 },
    { name: '推送失败', code: 2 },
    { name: '未推送', code: 0 },
    { name: '推送中', code: 3 },
    { name: '无需推送', code: 4 },
  ];
  // 0:不存在, A:暂存, B:已提交, C:已审核, D:已付款, E:付款处理中, F:银行退票, G:已退单, H:已作废, I:退款, J:票据处理中
  const statusJdList = [
    { name: '不存在', code: 0 },
    { name: '暂存', code: 'A' },
    { name: '已提交', code: 'B' },
    { name: '已审核', code: 'C' },
    { name: '已付款', code: 'D' },
    { name: '付款处理中', code: 'E' },
    { name: '银行退票', code: 'F' },
    { name: '已退单', code: 'G' },
    { name: '已作废', code: 'H' },
    { name: '退款', code: 'I' },
    { name: '票据处理中', code: 'J' },
  ];
  const statusColorMapJd = {
    0: 'gray',
    A: 'blue',
    B: 'green',
    C: 'green',
    D: 'green',
    E: 'yellow',
    F: 'red',
    G: 'red',
    H: 'red',
    I: 'red',
    J: 'yellow',
  };
  const statusColorMap = {
    0: 'gray',
    1: 'green',
    2: 'red',
    3: 'yellow',
  };
  const tagsList = [
    { name: '跨币种', code: 'cross_currency' },
    { name: '无支付信息', code: 'no_payment_info' },
    { name: '已付', code: 'paid' },
    { name: '部分已付', code: 'partially_paid' },
    { name: '无需支付', code: 'no_payment_required' },
    { name: '无供应商', code: 'no_supplier' },
    { name: '多付多预', code: 'overpaid_and_prepaid' },
    { name: '跨期', code: 'cross_period' },
    { name: '售后批量', code: 'bulk_after_sales' },
    { name: '无付款账号', code: 'no_payment_account' },
  ];
  const detailVisible = ref(false);
  const code = ref('');
  const tableRef = ref();
  const title = ref('详情');
  const timer = ref(null);
  const remarkDialogRef = ref();
  const buildQueryParams = (params) => {
    console.log(params);
    const [start, end] = params.completeDate || [];
    const [startTime, endTime] = params.time || [];
    return {
      ...omit(params, ['completeDate', 'time']),
      completeDateStart: start || undefined,
      completeDateEnd: end || undefined,
      accountStartDate: startTime || undefined,
      accountEndDate: endTime || undefined,
      amountLe: params.amountLe !== '' ? Number(params.amountLe) : undefined,
      amountGe: params.amountGe !== '' ? Number(params.amountGe) : undefined,
    };
  };
  const {
    search,
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
    runQuery,
    resetSearch,
    refreshList,
  } = useList<
    { keyword?: string; pageNum: number; pageSize: number },
    FinanceSystemApi.FinanceOaPaymentOrderQueryList.ResponseBody
  >({
    searchDefaults: {
      amountGe: undefined,
      payUnitCodes: undefined,
      amountLe: undefined,
      completeDateEnd: undefined,
      completeDateStart: undefined,
      completeDate: undefined,
      keyword: undefined,
      kingdeePushStatus: undefined,
      tags: undefined,
      kingdeeStatus: undefined,
      orderCodes: undefined,
      accountStartDate: undefined,
      accountEndDate: undefined,
      time: undefined,
    },
    pageSize: PAGE_SIZE,
    service: (params) => {
      const newParams = buildQueryParams(params);
      return financeSystemApi.financeOaPaymentOrderQueryList(newParams);
    },
    onSuccess: (res) => {
      if (res) {
        statusTotalData.value = Object.assign(
          statusTotalData.value,
          res.statistics,
          res.relateSystemStatics
        );
        statusTotalData.value.total = res.total;
        // 轮询进度
        if (timer.value) clearInterval(timer.value);
        timer.value = setInterval(async () => {
          if (listData.value?.records?.length) {
            const codes = listData.value?.records
              ?.filter((item) => item?.orderCode && item?.kingdeePushBean?.pushStatus === 3)
              ?.map((item) => item?.orderCode);
            if (codes?.length) {
              const res2 = await financeSystemApi.financeOaPaymentOrderQueryList({ codes: codes });
              listData.value.records = listData.value?.records?.map((item) => {
                const newItem = res2?.records?.find((i) => i?.orderCode === item?.orderCode);
                if (newItem) {
                  return { ...item, ...newItem };
                }
                return item;
              });
            }
          }
        }, 5000);
      }
      tableRef.value?.clearSelection();
    },
  });
  const organizationList = ref([]);
  const queryMap = async () => {
    const res = await financeApi.luteosFinanceSettlementOrganizationList({
      pageNum: 1,
      pageSize: 100,
    });
    organizationList.value = res.list || [];
  };
  queryMap();

  const batchSearchRef = ref();
  const orderCodes = ref();
  const handleBlur = (e) => {
    if (e.target?.value) {
      batchSearchRef.value?.clear();
      search.orderCodes = [e.target?.value];
    } else {
      search.orderCodes = undefined;
    }
  };
  const handleBatchClear = (val) => {
    search.orderCodes = undefined;
  };
  const handleBatchSearch = (val) => {
    search.orderCodes = undefined;
    search.orderCodes = val?.replace(/\n/g, ',').split(',');
    search.orderCodes = search.orderCodes.filter((res) => res);
  };
  // 编辑备注
  const remarkChange = (row) => {
    remarkDialogRef.value.open(row);
  };
  // 表格操作
  const handleActions = async (item) => {
    const { key, row } = item;
    if (key === 'push') {
      let text = row.kingdeePushBean.pushStatus == 1 ? '该数据已推送，是否覆盖？' : '确认推送吗？';
      const isConfirm = await swal.confirm(text);
      if (!isConfirm) return;
      const res = await financeSystemApi
        .financeOaPaymentOrderPushList({
          codes: [row.orderCode],
        })
        .catch(() => {
          runQuery();
        });
      if (res) {
        ElMessage.success('推送成功');
        runQuery();
      }
    } else if (key == 'detail') {
      code.value = row.orderCode;
      title.value = '详情';
      detailVisible.value = true;
    } else if (key == 'edit') {
      code.value = row.orderCode;
      title.value = '编辑';
      detailVisible.value = true;
    }
  };
  // 选中行
  const codeList = ref([]);
  const handleSelectionChange = (selection) => {
    codeList.value = selection.map((item) => item.orderCode);
  };
  // 批量推送
  const failDialogRef = ref(null);
  const batchPushLoading = ref(false);
  const batchPushLoadingJd = ref(false);
  const markLoading = ref(false);
  const batchPush = async (params, tip) => {
    try {
      batchPushLoading.value = true;
      const res = await financeSystemApi.financeOaPaymentOrderPushList(params);
      if (res?.failList?.length) {
        failDialogRef.value?.open(res?.failList);
      } else {
        ElMessage.success(`${tip}成功`);
      }
      tableRef.value?.clearSelection();
      refreshList();
    } finally {
      batchPushLoading.value = false;
    }
  };
  const batchPushJd = async (params, tip) => {
    ElMessage.warning(`数据更新中，请稍后刷新查看最新数据`);
    const res = await financeSystemApi.financeBasicPlatformRefresh({
      modelCode: 'oa_payment_kingdee_refresh',
      sleepTime: 1,
      param: { ...params },
    });
  };

  const handlePushCommand = async (command) => {
    switch (command) {
      case 'batchPushJd': {
        if (!codeList.value?.length) {
          ElMessage.warning('请先勾选数据');
          return;
        }
        const isConfirmed = await swal.confirm('确认更新所选吗？');
        if (!isConfirmed) return;
        batchPushJd(
          {
            codes: codeList.value,
          },
          '更新所选'
        );
        break;
      }
      case 'batchSearchPushJd': {
        const isConfirmed = await swal.confirm('确认按筛选条件更新吗？');
        if (!isConfirmed) return;
        batchPushJd(buildQueryParams(search), '按筛选条件更新');
        break;
      }
      case 'batchPush': {
        if (!codeList.value?.length) {
          ElMessage.warning('请先勾选数据');
          return;
        }
        const isConfirmed = await swal.confirm('确认推送所选吗？');
        if (!isConfirmed) return;
        batchPush(
          {
            codes: codeList.value,
          },
          '推送所选'
        );
        break;
      }
      case 'batchSearchPush': {
        const isConfirmed = await swal.confirm('确认按筛选条件推送吗？');
        if (!isConfirmed) return;
        batchPush(buildQueryParams(search), '按筛选条件推送');
        break;
      }
      case 'markPush': {
        if (!codeList.value?.length) {
          ElMessage.warning('请先勾选数据');
          return;
        }
        const isConfirmed = await swal.confirm('确认标记推送数据吗？');
        if (!isConfirmed) return;
        markPushStatus('标记', 1, '');
        break;
      }
      case 'markPushSearch': {
        if (listData.value.total == 0) {
          ElMessage.warning('无操作数据');
          return;
        }
        const isConfirmed = await swal.confirm(
          `请确认是否对${listData.value.total}条数据执行标记操作？`
        );
        if (!isConfirmed) return;
        markPushStatus('标记', 1, 'search');
        break;
      }
      case 'cancelMarkPush': {
        if (!codeList.value?.length) {
          ElMessage.warning('请先勾选数据');
          return;
        }
        const isConfirmed = await swal.confirm('确认取消标记推送数据吗？');
        if (!isConfirmed) return;
        markPushStatus('取消标记', 0, '');
        break;
      }
      case 'cancelMarkPushSearch': {
        if (listData.value.total == 0) {
          ElMessage.warning('无操作数据');
          return;
        }
        const isConfirmed = await swal.confirm(
          `请确认是否对${listData.value.total}条数据执行取消标记操作？`
        );
        if (!isConfirmed) return;
        markPushStatus('取消标记', 0, 'search');
        break;
      }
      default:
        break;
    }
  };
  // 标记推送成功
  const markPushStatus = async (tip, status, type) => {
    try {
      markLoading.value = true;
      let param = {
        markPushSuccess: status == 1,
      };
      if (type) {
        param = Object.assign(param, buildQueryParams(search));
      } else {
        param.codes = codeList.value;
      }
      const res = await financeSystemApi.financeOaPaymentOrderMarkPushStatus(param);
      if (res?.failList?.length) {
        failDialogRef.value?.open(res?.failList);
      } else {
        ElMessage.success(`${tip}成功`);
      }
      tableRef.value?.clearSelection();
      refreshList();
    } finally {
      markLoading.value = false;
    }
  };
  const detailEdit = () => {
    detailVisible.value = false;
    refreshList();
  };
  const handleRefresh = async () => {
    await financeSystemApi.financeBasicPlatformRefresh({
      modelCode: 'syncOaPaymentOrder',
      param: { ...buildQueryParams(search) },
      sleepTime: 1,
    });
    store.taskMap[refreshType.OA付款单].apiSync = true;
    financeBudgetRefresh(user.token as string, refreshType.OA付款单);
  };
  watch(
    () => store.taskMap[refreshType.OA付款单].apiSync,
    (val) => {
      if (!val) refreshList();
    }
  );

  onMounted(() => {
    financeBudgetRefresh(user.token as string, refreshType.OA付款单);
  });

  onBeforeUnmount(() => {
    stopFinanceBudgetRefresh();
  });
  watch(
    () => route.path,
    () => {
      // 组件销毁时清除定时器
      if (timer.value) {
        clearInterval(timer.value);
      }
    }
  );
</script>

<style scoped lang="scss">
  .page-top-box {
    background-color: #fff;
    padding: 16px;
    border-radius: 8px;
    margin-bottom: 12px;

    .text-num {
      font-weight: 500;
      margin-right: 1.25rem;
    }

    .text-bule {
      color: #75a3f4;
    }

    .text-green {
      color: #50cf7e;
    }

    .text-red {
      color: #ef6868;
    }
    .text-grey {
      color: #b6b6b6;
    }
  }
  .text-one {
    white-space: nowrap; /* 防止文本换行 */
    overflow: hidden; /* 隐藏溢出的内容 */
    text-overflow: ellipsis; /* 显示省略号来表示溢出的内容 */
    width: 150px; /* 设置容器的宽度 */
    color: var(--bs-danger);
  }
  .icon-shujutongbu1 {
    color: #666666;
    cursor: pointer;
  }
  .icon-loading {
    color: #666666;
    cursor: pointer;
    animation: rotate 1s linear infinite;
  }
  @keyframes rotate {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(360deg);
    }
  }
  .el-divider--vertical {
    border-left: 1px var(--el-border-color) var(--el-border-style);
  }
  .question-icon {
    width: 15px;
    height: 15px;
    color: var(--el-color-primary);
  }
  .w-100 {
    width: 100%;
  }
  .remark-box {
    width: 100%;
    :deep(.content) {
      width: 250px;
    }
    .icon2 {
      position: absolute;
      cursor: pointer;
      right: 0;
      top: 20px;
    }
  }
</style>
