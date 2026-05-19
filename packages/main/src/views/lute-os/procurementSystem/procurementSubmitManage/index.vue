<template>
  <DemandManageWrapper>
    <el-tabs v-model="activeTab">
      <el-tab-pane
        v-for="tab in SUBMIT_TABS"
        :key="tab.key"
        :name="tab.key"
        :label="`${tab.label}（${tabCountMap[tab.key] ?? 0}）`"
      />
    </el-tabs>

    <KeenList
      class="procurement-keen-list"
      :selected-num="selectedCount"
      :selected-list="selectedCodes"
      @refresh="refreshList"
      @reset-search="handleResetSearch"
    >
      <template #search>
        <div class="search-bar">
          <el-input
            v-model="search.keyword"
            placeholder="需求标题 / 需求背景 / 需求编码 "
            clearable
            style="width: 220px"
          />
          <!-- <el-date-picker
          v-model="search.submitRange"
          type="daterange"
          start-placeholder="提交开始"
          end-placeholder="提交结束"
          style="width: 260px"
          unlink-panels
          format="YYYY-MM-DD"
          value-format="YYYY-MM-DD"
        /> -->
        </div>
      </template>

      <template #filters>
        <el-input
          v-if="viewMode === 'product' && showPurchaseOrderColumns"
          v-model="search.purchaseKeyword"
          placeholder="采购订单号 / 采购行号"
          clearable
          style="width: 260px"
        />
        <MemberSelect
          v-model="search.creator"
          placeholder="需求创建人"
          :demand-member-type="1"
          style="width: 200px"
        />
        <PurchaseCategorySelect
          v-if="viewMode === 'product'"
          v-model="search.purchaseReq.productTypeList"
          class="filter-category-select"
          placeholder="采购产品类型"
          multiple
          :check-strictly="true"
          @change="(_, nodes) => handlePurchaseCategoryChange(nodes)"
        />
        <PurchaseMaterialSelect
          v-if="viewMode === 'product'"
          v-model="search.productInfoList"
          placeholder="采购产品信息"
          multiple
          :require-category="false"
          style="width: 220px"
        />
        <DeptFilterSelect v-if="viewMode === 'demand'" v-model="search.deptIdList" />
        <MemberSelect
          v-if="viewMode === 'product'"
          v-model="search.executorList"
          placeholder="采购执行人"
          style="width: 220px"
          multiple
        />
      </template>

      <template #tools-prepend>
        <ViewModeToggle
          v-model="viewMode"
          storage-key="submitManage"
          @change="handleViewModeChange"
        />
      </template>

      <el-table
        :data="tableData"
        class="table-row-dashed"
        v-loading="listLoading"
        @selection-change="handleSelectionChange"
      >
        <template v-if="viewMode === 'demand'">
          <el-table-column prop="code" label="需求编码" width="160" fixed="left">
            <template #default="{ row }">
              <el-link type="primary" @click="handleViewDetail(row.code)">{{ row.code }}</el-link>
            </template>
          </el-table-column>
          <el-table-column label="需求标题" min-width="220">
            <template #default="{ row }">
              <OverflowTooltip :content="row.title" :line="2" />
            </template>
          </el-table-column>
          <el-table-column prop="background" label="需求背景" min-width="260">
            <template #default="{ row }">
              <OverflowTooltip :content="row.background" :line="2" />
            </template>
          </el-table-column>
          <el-table-column prop="creator" label="需求创建人" width="180">
            <template #default="{ row }">
              <div class="cell-with-avatar">
                <el-avatar :size="24" :src="row.creator.avatar"></el-avatar>
                <span class="cell-text">{{ row.creator.name }}</span>
              </div>
            </template>
          </el-table-column>
          <el-table-column prop="departmentName" label="需求所属部门" min-width="220">
            <template #default="{ row }">
              <OverflowTooltip class="dept-tooltip" :content="row.departmentName" line="1" />
            </template>
          </el-table-column>
          <el-table-column prop="createdAt" label="需求创建时间" width="170" />
          <el-table-column prop="expectFinishTime" label="期望完成时间" width="160" />
          <el-table-column prop="totalBudgetAmount" label="预算总金额" width="150">
            <template #default="{ row }">
              <div class="amount-cell">
                <span class="amount-number">{{ formatAmount(row.totalBudgetAmount) }}</span>
                <span class="amount-currency">
                  {{ formatCurrencyLabel(row.totalBudgetCurrency) }}
                </span>
              </div>
            </template>
          </el-table-column>
          <el-table-column
            v-if="showApproverColumn"
            prop="approver"
            label="当前审批人"
            min-width="220"
          >
            <template #default="{ row }">
              <div v-if="row.approver.items?.length" class="approver-list">
                <div v-for="(item, idx) in row.approver.items" :key="idx" class="approver-chip">
                  <el-avatar :size="24" :src="item.avatar" />
                  <span class="cell-text">{{ item.name }}</span>
                </div>
              </div>
              <div v-else class="cell-with-avatar">
                <div class="avatar-stack">
                  <el-avatar
                    v-for="(avt, idx) in row.approver.avatarList?.length
                      ? row.approver.avatarList
                      : row.approver.avatar
                      ? [row.approver.avatar]
                      : []"
                    :key="idx"
                    :size="24"
                    :src="avt"
                  />
                </div>
                <span class="cell-text">{{ row.approver.name }}</span>
              </div>
            </template>
          </el-table-column>
          <el-table-column label="需求状态" width="140">
            <template #default="{ row }">
              <el-tag :type="getStatusTag(row.status)">
                {{ row.statusDesc }}
              </el-tag>
            </template>
          </el-table-column>
        </template>

        <template v-else>
          <el-table-column
            v-if="showPurchaseOrderColumns"
            prop="purchaseOrderNo"
            label="采购订单号"
            width="200"
            fixed="left"
          >
            <template #default="{ row }">
              {{ row.purchaseOrderNo || '--' }}
            </template>
          </el-table-column>
          <el-table-column
            v-if="showPurchaseOrderColumns"
            prop="purchaseLineNo"
            label="采购行号"
            width="120"
          />
          <el-table-column
            v-if="showPurchaseOrderColumns"
            prop="purchaseLineStatusDesc"
            label="采购订单行状态"
            min-width="160"
          >
            <template #default="{ row }">
              {{ row.purchaseLineStatusDesc || '--' }}
            </template>
          </el-table-column>
          <el-table-column prop="code" label="需求编码" width="160">
            <template #default="{ row }">
              <el-link type="primary" @click="handleViewDetail(row.code)">{{ row.code }}</el-link>
            </template>
          </el-table-column>
          <el-table-column label="需求标题" min-width="220">
            <template #default="{ row }">
              <OverflowTooltip :content="row.title" :line="2" />
            </template>
          </el-table-column>
          <el-table-column prop="createdAt" label="需求创建时间" width="170" />
          <el-table-column prop="creator" label="需求创建人" width="180">
            <template #default="{ row }">
              <div class="cell-with-avatar">
                <el-avatar :size="24" :src="row.creator.avatar"></el-avatar>
                <span class="cell-text">{{ row.creator.name }}</span>
              </div>
            </template>
          </el-table-column>
          <el-table-column prop="expectFinishTime" label="期望完成时间" width="160" />
          <el-table-column prop="productType" label="采购产品类型" min-width="160">
            <template #default="{ row }">
              {{ renderProductType(row.productType, row.productTypeCode) }}
            </template>
          </el-table-column>
          <el-table-column prop="productInfo" label="采购产品信息" min-width="240" />
          <el-table-column prop="planQuantityDisplay" label="拟采购数量" width="140" />
          <el-table-column prop="planPriceDisplay" label="拟采购单价" width="150">
            <template #default="{ row }">
              <div class="amount-cell">
                <span class="amount-number">{{ formatAmount(row.planUnitPrice) }}</span>
                <span class="amount-currency">
                  {{ formatCurrencyLabel(row.currency) }}
                </span>
              </div>
            </template>
          </el-table-column>
          <el-table-column prop="executor" label="采购执行人" width="180">
            <template #default="{ row }">
              <div class="cell-with-avatar">
                <div class="avatar-stack">
                  <el-avatar
                    v-for="(avt, idx) in row.executor.avatarList?.length
                      ? row.executor.avatarList
                      : row.executor.avatar
                      ? [row.executor.avatar]
                      : []"
                    :key="idx"
                    :size="24"
                    :src="avt"
                  />
                </div>
                <span class="cell-text">{{ row.executor.name }}</span>
              </div>
            </template>
          </el-table-column>
          <el-table-column label="需求状态" width="140">
            <template #default="{ row }">
              <el-tag :type="getStatusTag(row.status)">
                {{ row.statusDesc }}
              </el-tag>
            </template>
          </el-table-column>
        </template>
        <el-table-column label="操作" width="160" fixed="right">
          <template #default="{ row }">
            <span class="text-button" @click="handleViewDetail(row.code)">详情</span>
            <span v-if="showReceiveAction" class="text-button" @click="handleReceive(row)">
              查收
            </span>
          </template>
        </el-table-column>
        <template #empty>
          <div class="flex-align flex-center">
            <EmptyAnimation name="listEmpty" :width="128" :height="128" :loop="true" />
          </div>
          <div class="text">暂无数据</div>
        </template>
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

    <ReceiveDialog
      v-model:visible="receiveDialogVisible"
      :mode="receiveDialogMode"
      :products="receiveProducts"
      :submit-loading="receiveSubmitLoading"
      @submit="handleReceiveSubmit"
    />
  </DemandManageWrapper>
</template>

<script setup lang="ts" name="procurementSubmitManage">
  import { ElMessage } from 'element-plus';
  import { useRoute, useRouter } from 'vue-router';
  import useList from '@/views/lute-os/hooks/list/useList';
  import { memberApi, platformApi } from '@/api';
  import type {
    DemandListQueryReq,
    DemandListQueryResp,
    DemandPurchaseQueryBean,
    DemandPurchaseCountBean,
    DemandPurchaseListQueryReq,
    PurchaseItemBean,
    PurchaserBean,
    MemberBean,
    DeptBean,
    MemberContracts,
  } from '@/api/platform/data-contracts';
  import {
    SUBMIT_TABS,
    VIEW_MODES,
    PURCHASE_STATUS,
    PURCHASE_STATUS_LABEL_MAP,
    PROCUREMENT_DEMAND_MODULE,
    type PurchaseStatus,
  } from '../constant';
  import ReceiveDialog, { type ReceiveProductItem } from '../components/ReceiveDialog.vue';
  import ViewModeToggle from '../components/ViewModeToggle.vue';
  import MemberSelect from '../components/MemberSelect.vue';
  import PurchaseCategorySelect from '../components/PurchaseCategorySelect.vue';
  import PurchaseMaterialSelect from '../components/PurchaseMaterialSelect.vue';
  import { useReceiveOperations } from '../hooks/useReceiveOperations';
  import { useProductTypeLabel } from '../hooks/useProductTypeLabel';
  import DemandManageWrapper from '@/views/lute-os/demandManage/DemandManageWrapper.vue';
  import { useProcurementActiveTab } from '../hooks/useActiveTab';
  import { useCurrencyLabel } from '../hooks/useCurrencyLabel';
  import DeptFilterSelect from '../components/DeptFilterSelect.vue';

  const PAGE_SIZE = 10;
  type ViewMode = (typeof VIEW_MODES)[number]['value'];
  type SubmitStatus = PurchaseStatus;
  type SubmitCountBean = DemandPurchaseCountBean & { draftCount?: number };

  type PurchaseListQueryReq = DemandListQueryReq & {
    purchaseReq?: DemandPurchaseListQueryReq & { productTypeList?: string[] };
    menuTag?: string;
    submitRange?: string[];
    purchaseKeyword?: string;
    productInfoList?: string[];
    executorList?: string[];
    deptIdList?: string[];
    creator?: string;
    keyword?: string;
  };

  const statusLabelMap = PURCHASE_STATUS_LABEL_MAP;
  const statusTagMap: Record<number, 'success' | 'warning' | 'primary' | 'danger' | 'info'> = {
    [PURCHASE_STATUS.PURCHASE_DRAFT]: 'info',
    [PURCHASE_STATUS.PURCHASE_APPROVAL_ING]: 'warning',
    [PURCHASE_STATUS.PURCHASE_APPROVAL_NOT_PASS]: 'danger',
    [PURCHASE_STATUS.PURCHASE_EXECUTION_ING]: 'primary',
    [PURCHASE_STATUS.PURCHASE_SRM_CLOSED]: 'info',
    [PURCHASE_STATUS.PURCHASE_WAIT_FOR_RECEIPT]: 'warning',
    [PURCHASE_STATUS.PURCHASE_FINISHED]: 'success',
    [PURCHASE_STATUS.PURCHASE_PUSH_FAILED]: 'danger',
  };

  const getStatusLabel = (status: number) => statusLabelMap[status as PurchaseStatus] ?? '--';
  const getStatusTag = (status: number) => statusTagMap[status] ?? 'info';

  interface PersonInfo {
    name: string;
    avatar?: string;
    avatarList?: string[];
    items?: { name: string; avatar?: string }[];
  }

  interface SubmitProductLine extends ReceiveProductItem {
    purchaseOrderNo?: string;
    purchaseLineNo?: string;
    purchaseLineStatus?: string;
    purchaseLineStatusDesc?: string;
    planQuantityDisplay?: string;
    planPriceDisplay?: string;
    planUnitPrice?: number | null;
    currency?: string;
    supplier?: string;
    supplierReason?: string;
    remark?: string;
    purchaseItemCode?: string;
    purchaserList?: PurchaserBean[];
    productTypeCode?: string;
  }

  interface SubmitDemandRow {
    viewType: 'demand';
    code: string;
    title: string;
    background: string;
    creator: PersonInfo;
    approver: PersonInfo;
    departmentName: string;
    createdAt: string;
    expectFinishTime: string;
    totalBudgetAmount: number | null;
    totalBudgetCurrency: string;
    status: SubmitStatus;
    statusDesc?: string;
    executor: PersonInfo;
    productLines: SubmitProductLine[];
    raw: DemandPurchaseQueryBean;
  }

  interface SubmitProductRow extends SubmitProductLine {
    viewType: 'product';
    code: string;
    title: string;
    background: string;
    creator: PersonInfo;
    approver: PersonInfo;
    departmentName: string;
    createdAt: string;
    expectFinishTime: string;
    totalBudgetAmount: number | null;
    totalBudgetCurrency: string;
    status: SubmitStatus;
    statusDesc?: string;
    executor: PersonInfo;
  }

  type SubmitTableRow = SubmitDemandRow | SubmitProductRow;

  const router = useRouter();
  const route = useRoute();
  const submitTabConfig = [
    { key: PURCHASE_STATUS.PURCHASE_DRAFT, countField: 'draftCount' },
    { key: PURCHASE_STATUS.PURCHASE_FINISHED, countField: 'finishedCount' },
    { key: PURCHASE_STATUS.PURCHASE_WAIT_FOR_RECEIPT, countField: 'checkingCount' },
    { key: PURCHASE_STATUS.PURCHASE_EXECUTION_ING, countField: 'executingCount' },
    { key: PURCHASE_STATUS.PURCHASE_SRM_CLOSED, countField: 'srmClosedCount' },
    { key: PURCHASE_STATUS.PURCHASE_APPROVAL_ING, countField: 'approvingCount' },
    { key: PURCHASE_STATUS.PURCHASE_APPROVAL_NOT_PASS, countField: 'approveNotPassCount' },
  ] as const;
  const submitPriorityKeys: SubmitStatus[] = [
    PURCHASE_STATUS.PURCHASE_WAIT_FOR_RECEIPT,
    PURCHASE_STATUS.PURCHASE_EXECUTION_ING,
    PURCHASE_STATUS.PURCHASE_APPROVAL_NOT_PASS,
    PURCHASE_STATUS.PURCHASE_DRAFT,
    PURCHASE_STATUS.PURCHASE_SRM_CLOSED,
    PURCHASE_STATUS.PURCHASE_FINISHED,
    PURCHASE_STATUS.PURCHASE_APPROVAL_ING,
  ];

  const {
    activeTab,
    tabCountMap,
    syncCounts: syncSubmitTabCounts,
    initActiveTabByCounts: initSubmitActiveTab,
  } = useProcurementActiveTab<SubmitCountBean, SubmitStatus>(
    submitTabConfig,
    undefined,
    submitPriorityKeys
  );

  const viewMode = ref<ViewMode>(VIEW_MODES[0].value);
  const hasInitActiveTab = ref(false);
  const { renderProductType } = useProductTypeLabel();
  const parseStatusFromQuery = () => {
    const statusParam = route.query.status ?? route.query.tab;
    const value = Array.isArray(statusParam) ? statusParam[0] : statusParam;
    const parsed = typeof value === 'string' ? Number(value) : Number(value);
    if (Number.isFinite(parsed) && SUBMIT_TABS.some((tab) => tab.key === parsed)) {
      return parsed as SubmitStatus;
    }
    return null;
  };
  const initialTabFromQuery = parseStatusFromQuery();
  if (initialTabFromQuery !== null) {
    activeTab.value = initialTabFromQuery;
    hasInitActiveTab.value = true;
  }

  const formatCurrency = (value?: number, currency = 'CNY') => {
    if (value === null || value === undefined) return '--';
    try {
      return new Intl.NumberFormat('zh-CN', {
        style: 'currency',
        currency,
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
      }).format(value);
    } catch {
      return `${currency} ${value.toFixed(2)}`;
    }
  };

  const formatAmount = (value?: number | null) => {
    if (value === null || value === undefined) return '--';
    return Number.isFinite(value)
      ? Number(value).toLocaleString('zh-CN', {
          minimumFractionDigits: 2,
          maximumFractionDigits: 2,
        })
      : '--';
  };

  const { formatCurrencyLabel } = useCurrencyLabel();

  const formatDateTime = (value?: string) => value ?? '--';
  const toPersonInfo = (name?: string, avatar?: string): PersonInfo => ({
    name: name || '--',
    avatar: avatar ?? '',
  });
  const pickMember = (members?: MemberBean[]) => {
    const member = members?.[0];
    return member ? toPersonInfo(member.memberName, member.avatar) : undefined;
  };
  const joinDeptNames = (depts?: DeptBean[]) =>
    depts
      ?.map((item) => item.deptName ?? '')
      .filter(Boolean)
      .join('、') || '--';

  const normalizeProductLine = (
    item: PurchaseItemBean,
    index: number,
    demandCode: string
  ): SubmitProductLine => {
    const quantity = Number(item.number ?? 0);
    const price = item.price ?? undefined;
    const enableCheck = Number((item as Record<string, any>)?.enableCheckNumber);
    const receivedQuantity = Number((item as Record<string, any>)?.checkNumber ?? 0);
    return {
      id: item.purchaseItemCode ?? item.productSku ?? `${demandCode || 'item'}-${index}`,
      productType: item.productTypeDesc ?? '',
      productTypeCode: (item as Record<string, any>)?.productType ?? '',
      productInfo: item.productName ?? '',
      purchaseQuantity: Number.isFinite(quantity) ? quantity : 0,
      receivedQuantity: Number.isFinite(receivedQuantity) ? receivedQuantity : 0,
      currentQuantity: 0,
      enableCheckNumber: Number.isFinite(enableCheck) ? enableCheck : undefined,
      purchaseOrderNo: item.purchaseCode ?? '',
      purchaseLineNo: item.purchaseLine != null ? String(item.purchaseLine) : '--',
      purchaseLineStatus: '--',
      purchaseLineStatusDesc: (item as any)?.purchaseLineStatusDesc || '--',
      planQuantityDisplay: Number.isFinite(quantity) && quantity !== 0 ? String(quantity) : '--',
      planPriceDisplay: price !== undefined ? formatCurrency(price, item.currency ?? 'CNY') : '--',
      planUnitPrice: Number.isFinite(Number(price)) ? Number(price) : null,
      currency: item.currency ?? 'CNY',
      supplier: item.supplier ?? '',
      supplierReason: item.assignSupplierReason ?? '',
      remark: item.remark ?? '',
      purchaseItemCode: item.purchaseItemCode ?? '',
      purchaserList: Array.isArray((item as any).purchaserList)
        ? ((item as any).purchaserList as PurchaserBean[])
        : [],
    };
  };

  const extractExecutor = (
    bean: DemandPurchaseQueryBean,
    productLines: SubmitProductLine[]
  ): PersonInfo => {
    const fromBean =
      ((bean as Record<string, any>)?.purchaserList as PurchaserBean[] | undefined) ?? [];
    const fromLines = productLines.flatMap(
      (line) => (line.purchaserList as PurchaserBean[] | undefined) ?? []
    );
    const all = [...fromBean, ...fromLines].filter((p) => p && (p.name || p.memberCode));
    const seen = new Set<string>();
    const names: string[] = [];
    const avatarList: string[] = [];
    all.forEach((p) => {
      const key = p.memberCode || p.name;
      if (!key || seen.has(key)) return;
      seen.add(key);
      names.push(p.name || p.memberCode || '');
      if (p.avatar) {
        avatarList.push(p.avatar);
      }
    });
    if (!names.length) return toPersonInfo();
    return { name: names.join('、') || '--', avatarList, avatar: avatarList[0] };
  };

  const extractApprover = (bean: DemandPurchaseQueryBean): PersonInfo => {
    const list = ((bean as Record<string, any>)?.approverList as PurchaserBean[] | undefined) ?? [];
    const items = list
      .map((p) => ({
        name: (p?.memberName || p?.name || p?.memberCode || '').trim(),
        avatar: p?.avatar || '',
      }))
      .filter((item) => item.name);
    const avatarList = items.map((p) => p.avatar).filter((v) => !!v);
    const name = items.map((p) => p.name).join('、') || '--';
    return { name, avatarList, avatar: avatarList[0] || '', items };
  };

  const createDemandRow = (bean: DemandPurchaseQueryBean): SubmitDemandRow => {
    const productLines = (bean.demandPurchaseSaveBean?.purchaseItemList ?? []).map((line, index) =>
      normalizeProductLine(line, index, bean.demandCode ?? '')
    );
    const currency = productLines[0]?.currency || (bean as Record<string, any>)?.currency || 'CNY';
    return {
      viewType: 'demand',
      code: bean.demandCode ?? '--',
      title: bean.demandTitle ?? '--',
      background: bean.demandBackground ?? '--',
      creator:
        pickMember(bean.creatorList ?? []) ?? toPersonInfo(bean.creatorName, bean.creatorAvatar),
      approver: extractApprover(bean),
      departmentName: joinDeptNames(bean.deptList),
      createdAt: formatDateTime(bean.createTime),
      expectFinishTime: bean.expectFinishTime ?? '--',
      totalBudgetAmount: bean.sumPrice ?? null,
      totalBudgetCurrency: currency,
      status: (bean.status ?? PURCHASE_STATUS.PURCHASE_DRAFT) as SubmitStatus,
      statusDesc: (bean as Record<string, any>)?.statusDesc || '',
      executor: extractExecutor(bean, productLines),
      productLines,
      raw: bean,
    };
  };

  const toProductRow = (line: SubmitProductLine, parent: SubmitDemandRow): SubmitProductRow => ({
    viewType: 'product',
    code: parent.code,
    title: parent.title,
    background: parent.background,
    creator: parent.creator,
    approver: parent.approver,
    departmentName: parent.departmentName,
    createdAt: parent.createdAt,
    expectFinishTime: parent.expectFinishTime,
    totalBudgetAmount: parent.totalBudgetAmount,
    totalBudgetCurrency: parent.totalBudgetCurrency,
    status: parent.status,
    statusDesc: parent.statusDesc,
    executor: parent.executor,
    ...line,
  });

  const {
    search,
    listData,
    listLoading,
    runQuery,
    resetSearch: resetSearchForm,
    refreshList,
    pagination: {
      total,
      current,
      pageSize,
      pageSizeOption,
      handleCurrentChange,
      handlePageSizeChange,
    },
  } = useList<PurchaseListQueryReq, DemandListQueryResp>({
    pageSize: PAGE_SIZE,
    searchDefaults: {
      pageNum: 1,
      pageSize: PAGE_SIZE,
      demandModule: 'purchase',
      menuTag: 'submit_mine',
      viewType: 1,
      keyword: '',
      purchaseReq: {
        demandModule: 'purchase',
        viewType: viewMode.value === 'product' ? 2 : 1,
        menuTag: 'submit_mine',
        keyword: '',
        status: activeTab.value,
        productTypeList: [] as string[],
      },
      submitRange: [],
      purchaseKeyword: '',
      creator: '',
      productInfoList: [] as string[],
      executorList: [] as string[],
      deptIdList: [] as string[],
    },
    watchSearchKeys: [
      'keyword',
      'creator',
      'purchaseKeyword',
      'productInfoList',
      'executorList',
      'deptIdList',
      'purchaseReq',
    ],
    service: (params) => {
      const { purchaseKeyword, ...rest } = params;
      const productTypeList =
        Array.isArray((params.purchaseReq as any)?.productTypeList) &&
        (params.purchaseReq as any).productTypeList.length
          ? ((params.purchaseReq as any).productTypeList as string[])
          : [];
      const purchaseReq = {
        ...(params.purchaseReq ?? {}),
        demandModule: 'purchase',
        viewType: viewMode.value === 'product' ? 2 : 1,
        menuTag: 'submit_mine',
        keyword: params.keyword ?? '',
        status: activeTab.value,
        creator: params.creator,
        productTypeList,
        productSkuList: Array.isArray(params.productInfoList)
          ? params.productInfoList
          : [params.productInfoList].filter(Boolean),
        purchaserCodeList: Array.isArray(params.executorList)
          ? params.executorList
          : [params.executorList].filter(Boolean),
        purchaseKeyword,
        deptIdList: params.deptIdList,
      };
      return platformApi.platformDemandV2List({
        ...rest,
        purchaseReq,
      });
    },
    onSuccess: (data) => updateTabCounts(data?.demandPurchaseCountBean),
  });
  const createProductRowFromBean = (bean: any): SubmitProductRow => {
    const productLine = normalizeProductLine(bean, 0, bean.demandCode ?? '');
    const parent: SubmitDemandRow = {
      viewType: 'demand',
      code: bean.demandCode ?? '--',
      title: bean.demandTitle ?? '--',
      background: bean.demandBackground ?? '--',
      creator: toPersonInfo(bean.creatorName, bean.creatorAvatar),
      approver: extractApprover(bean),
      departmentName: bean.deptName ?? '--',
      createdAt: bean.createTime ?? '--',
      expectFinishTime: bean.expectFinishTime ?? '--',
      totalBudgetAmount: bean.sumPrice ?? null,
      totalBudgetCurrency: bean.currency ?? productLine.currency ?? 'CNY',
      status: (bean.status ?? PURCHASE_STATUS.PURCHASE_DRAFT) as SubmitStatus,
      statusDesc: (bean as Record<string, any>)?.statusDesc || '',
      executor: extractExecutor(bean, [productLine]),
      productLines: [productLine],
      raw: bean,
    };
    return toProductRow(productLine, parent);
  };
  const tableData = computed<SubmitTableRow[]>(() => {
    if (!listData.value) return [];

    if (viewMode.value === 'demand') {
      const demandList = listData.value.demandPurchaseList ?? [];
      return demandList.map(createDemandRow);
    }

    const productList = listData.value.demandPurchaseViewList ?? [];
    return productList.map(createProductRowFromBean);
  });

  const deptTreeData = ref<MemberContracts.DeptInfoBean[]>([]);
  const deptTree = computed(() => {
    const mapNode = (item: MemberContracts.DeptInfoBean) => ({
      value: item.deptId,
      label: item.deptName,
      leaf: !item.children?.length,
      children: item.children?.map((child) => mapNode(child)),
    });
    return deptTreeData.value?.map((item) => mapNode(item)) ?? [];
  });

  const fetchDeptTree = async () => {
    try {
      const res = await memberApi.luteosMemberQueryDeptTree();
      deptTreeData.value = res.deptInfoList || [];
    } catch (error) {
      console.error('Failed to fetch dept tree', error);
    }
  };

  const selectedCodes = ref<string[]>([]);
  const selectedCount = computed(() => selectedCodes.value.length);
  const showReceiveAction = computed(
    () => activeTab.value === PURCHASE_STATUS.PURCHASE_WAIT_FOR_RECEIPT
  );
  const showApproverColumn = computed(
    () =>
      activeTab.value === PURCHASE_STATUS.PURCHASE_APPROVAL_ING ||
      activeTab.value === PURCHASE_STATUS.PURCHASE_APPROVAL_NOT_PASS
  );
  const showPurchaseOrderColumns = computed(() =>
    [
      PURCHASE_STATUS.PURCHASE_FINISHED,
      PURCHASE_STATUS.PURCHASE_WAIT_FOR_RECEIPT,
      PURCHASE_STATUS.PURCHASE_EXECUTION_ING,
    ].includes(activeTab.value)
  );

  const updateTabCounts = (counts?: SubmitCountBean) => {
    if (!hasInitActiveTab.value) {
      initSubmitActiveTab(counts);
      hasInitActiveTab.value = true;
      return;
    }
    syncSubmitTabCounts(counts);
  };

  const syncStatusAndViewToSearch = () => {
    search.purchaseReq = {
      ...(search.purchaseReq ?? {}),
      status: activeTab.value,
      viewType: viewMode.value === 'product' ? 2 : 1,
      demandModule: 'purchase',
      menuTag: 'submit_mine',
    };
  };

  function handleViewModeChange(mode: ViewMode, reset = true) {
    if (viewMode.value !== mode) {
      viewMode.value = mode;
    }
    syncStatusAndViewToSearch();
  }

  watch(activeTab, () => {
    syncStatusAndViewToSearch();
  });

  watch(tableData, () => {
    selectedCodes.value = [];
  });

  function handleSelectionChange(rows: SubmitTableRow[]) {
    selectedCodes.value = rows.map((row) => row.code);
  }

  function handleResetSearch() {
    resetSearchForm();
    syncStatusAndViewToSearch();
  }

  const handlePurchaseCategoryChange = (nodes?: any) => {
    search.productInfoList = [];
  };

  function extractErrorMessage(error: unknown, fallback: string) {
    if (!error) return fallback;
    const maybe =
      (error as any)?.response?.data?.message ??
      (error as any)?.message ??
      (error instanceof Error ? error.message : '');
    return maybe || fallback;
  }

  const receiveSourceList = ref<ReceiveProductItem[]>([]);
  const receiveDemandCode = ref('');

  const {
    receiveDialogVisible,
    receiveDialogMode,
    receiveProducts,
    receiveSubmitLoading,
    handleReceiveSubmit: submitReceiveInternal,
  } = useReceiveOperations({
    productList: receiveSourceList,
    demandCode: computed(() => receiveDemandCode.value),
    showBatchReceiveButton: computed(() => showReceiveAction.value),
    extractErrorMessage,
  });

  watch(receiveDialogVisible, (visible) => {
    if (!visible) {
      receiveDemandCode.value = '';
      receiveSourceList.value = [];
      receiveProducts.value = [];
    }
  });

  const handleReceiveSubmit = async (payload: {
    mode: 'batch' | 'single';
    products: ReceiveProductItem[];
  }) => {
    await submitReceiveInternal(payload);
    if (!receiveDialogVisible.value) {
      receiveDemandCode.value = '';
      receiveSourceList.value = [];
      runQuery(true);
    }
  };

  const toReceiveProduct = (line: SubmitProductLine): ReceiveProductItem => {
    const productId = line.purchaseItemCode ?? line.id;
    const enableCheck = Number(line.enableCheckNumber ?? (line as any)?.checkNumber);
    return {
      id: productId != null ? String(productId) : '',
      productType: line.productType ?? '',
      productTypeCode: line.productTypeCode ?? '',
      productInfo: line.productInfo ?? '',
      purchaseQuantity: Number(line.purchaseQuantity ?? 0),
      receivedQuantity: Number(line.receivedQuantity ?? 0),
      enableCheckNumber: Number.isFinite(enableCheck) ? enableCheck : undefined,
      currentQuantity: 0,
    };
  };

  const buildReceiveProductsFromDetail = async (code: string) => {
    if (!code) return [];
    const detail = await platformApi.platformDemandDetail({
      demandCode: code,
      demandModule: PROCUREMENT_DEMAND_MODULE,
    });
    const lines = Array.isArray(detail.purchase?.purchaseItemList)
      ? detail.purchase!.purchaseItemList
      : [];
    return lines.map((item, index) => ({
      id: item.purchaseItemCode ?? `${code}-${index}`,
      productType: item.productTypeDesc ?? '',
      productTypeCode: (item as Record<string, any>)?.productType ?? '',
      productInfo: item.productName || '',
      purchaseQuantity: Number(item.number ?? 0),
      receivedQuantity: Number(
        (item as Record<string, any>)?.checkNumber ??
          (item as Record<string, any>)?.checkQuantity ??
          (item as Record<string, any>)?.completedQuantity ??
          0
      ),
      enableCheckNumber: Number.isFinite(Number((item as Record<string, any>)?.enableCheckNumber))
        ? Number((item as Record<string, any>)?.enableCheckNumber)
        : undefined,
      currentQuantity: 0,
    }));
  };

  async function handleReceive(row: SubmitTableRow) {
    receiveDemandCode.value = row.code ?? '';
    let products: ReceiveProductItem[] = [];
    if (row.viewType === 'product') {
      const product = toReceiveProduct(row);
      if (!product.purchaseQuantity) {
        product.purchaseQuantity = 0;
      }
      receiveDialogMode.value = 'single';
      products = [{ ...product }];
    } else {
      receiveDialogMode.value = 'batch';
      try {
        products = await buildReceiveProductsFromDetail(row.code || '');
      } catch (error) {
        console.error('Failed to load demand detail for receive', error);
        ElMessage.error('获取需求详情失败，无法查收');
        return;
      }
      if (!products.length) {
        ElMessage.warning('暂无可查收的产品');
        return;
      }
    }
    if (!products.length) {
      ElMessage.warning('暂无可查收的产品');
      return;
    }
    receiveSourceList.value = products;
    receiveProducts.value = products.map((item) => ({ ...item }));
    receiveDialogVisible.value = true;
  }

  const getSubmitSourceTab = (status: SubmitStatus) => {
    if (status === PURCHASE_STATUS.PURCHASE_WAIT_FOR_RECEIPT) return 'submitWaitReceipt';
    if (status === PURCHASE_STATUS.PURCHASE_APPROVAL_NOT_PASS) return 'submitReject';
    if (status === PURCHASE_STATUS.PURCHASE_DRAFT) return 'submitDraft';
    return undefined;
  };

  function handleViewDetail(code: string) {
    if (!code) {
      ElMessage.warning('未找到需求编码，无法跳转详情');
      return;
    }
    const query: Record<string, string> = {};
    const sourceTab = getSubmitSourceTab(activeTab.value);
    if (sourceTab) {
      query.sourceTab = sourceTab;
    }
    router.push({ name: 'procurementExecuteDetail', params: { id: code }, query });
  }
</script>

<style scoped lang="scss">
  @use '../common.scss';

  .procurement-submit-manage {
    display: flex;
    flex-direction: column;
    gap: 16px;
    padding: 16px 0 32px;
  }

  .status-tabs {
    background: #fff;
    padding: 12px 16px 0;
    border-radius: 8px;
  }

  .search-bar {
    display: flex;
    align-items: center;
    gap: 12px;
  }

  :deep(.procurement-list .actions .head-tools) {
    align-items: center !important;
  }

  .cell-with-avatar {
    display: inline-flex;
    align-items: center;
    gap: 8px;
  }

  .avatar-stack {
    display: flex;
    align-items: center;
    gap: 4px;
  }

  .cell-text {
    white-space: nowrap;
  }

  .approver-list {
    display: flex;
    flex-wrap: wrap;
    gap: 10px 12px;
    align-items: center;
  }

  .approver-chip {
    display: inline-flex;
    align-items: center;
    gap: 6px;
  }

  .amount-cell {
    display: flex;
    flex-direction: column;
    line-height: 1.2;
    gap: 4px;
  }

  .amount-number {
    font-weight: 600;
  }

  .amount-currency {
    color: #909399;
  }

  .dept-tooltip {
    max-width: 260px;
    display: block;
  }

  .text-button {
    color: var(--el-color-primary);
    cursor: pointer;
    padding: 0 4px;
    line-height: 1.4;
    user-select: none;
  }
</style>
