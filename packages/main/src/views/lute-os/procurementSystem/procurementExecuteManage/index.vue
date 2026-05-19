<template>
  <DemandManageWrapper>
    <el-tabs v-model="activeTab">
      <el-tab-pane
        v-for="tab in EXECUTE_TABS"
        :key="tab.key"
        :name="tab.key"
        :label="`${tab.label}（${tabCountMap[tab.key] ?? 0}）`"
      />
    </el-tabs>

    <KeenList
      :selected-num="selectedCount"
      :selected-list="selectedCodes"
      @refresh="handleRefresh"
      @reset-search="handleResetSearch"
    >
      <template #search>
        <div class="search-bar">
          <el-input
            v-model="search.keyword"
            placeholder="需求标题 / 需求背景 / 需求编码"
            clearable
            style="width: 220px"
          />
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
        <DeptFilterSelect v-if="viewMode === 'demand'" v-model="search.deptIdList" />
        <el-select
          v-if="viewMode === 'product' && showPurchaseOrderColumns"
          v-model="search.purchaseReq.purchaseLineStatusList"
          placeholder="采购订单行状态"
          clearable
          multiple
          collapse-tags
          collapse-tags-tooltip
          style="width: 220px"
        >
          <el-option
            v-for="item in PURCHASE_LINE_STATUS_ITEMS"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          />
        </el-select>
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
          storage-key="executeManage"
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
              <el-link type="primary" @click="handleViewDetail(row)">{{ row.code }}</el-link>
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
              <OverflowTooltip class="dept-tooltip" :content="row.departmentName" :line="1" />
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
          <el-table-column label="需求状态" width="140">
            <template #default="{ row }">
              <el-tag :type="getStatusTag(row.status)">
                {{ row.statusDesc }}
              </el-tag>
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
          <el-table-column v-if="showFailReasonColumn" label="推送失败原因" min-width="220">
            <template #default="{ row }">
              <OverflowTooltip v-if="row.pushFailReason" :content="row.pushFailReason" />
              <span v-else class="fail-reason">--</span>
            </template>
          </el-table-column>
          <el-table-column label="操作" width="120" fixed="right">
            <template #default="{ row }">
              <span class="text-button" @click="handleViewDetail(row)">详情</span>
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
              <el-link type="primary" @click="handleViewDetail(row)">{{ row.code }}</el-link>
            </template>
          </el-table-column>
          <el-table-column label="需求标题" min-width="220">
            <template #default="{ row }">
              <OverflowTooltip :content="row.title" :line="2" />
            </template>
          </el-table-column>
          <el-table-column prop="departmentName" label="需求所属部门" min-width="200">
            <template #default="{ row }">
              <OverflowTooltip class="dept-tooltip" :content="row.departmentName" :line="1" />
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
          <el-table-column prop="productType" label="采购产品类型" min-width="160">
            <template #default="{ row }">
              {{ renderProductType(row.productType, row.productTypeCode) }}
            </template>
          </el-table-column>
          <el-table-column
            v-if="activeTab === PURCHASE_STATUS.PURCHASE_WAIT_FOR_RECEIPT"
            prop="unCheckNumber"
            label="待查收数量"
            width="140"
          >
            <template #default="{ row }">
              {{ row.unCheckNumber ?? '--' }}
            </template>
          </el-table-column>
          <el-table-column
            v-if="activeTab === PURCHASE_STATUS.PURCHASE_WAIT_FOR_RECEIPT"
            prop="checkNumber"
            label="已查收数量"
            width="140"
          >
            <template #default="{ row }">
              {{ row.checkNumber ?? '--' }}
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
          <el-table-column prop="purchaseGroupName" label="采购组" width="140">
            <template #default="{ row }">
              {{ row.purchaseGroupName || '--' }}
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
          <el-table-column v-if="showFailReasonColumn" label="推送失败原因" min-width="220">
            <template #default="{ row }">
              <el-tag v-if="row.pushFailReason" type="danger" effect="light">
                {{ row.pushFailReason }}
              </el-tag>
              <span v-else class="fail-reason">--</span>
            </template>
          </el-table-column>
          <el-table-column label="操作" width="120" fixed="right">
            <template #default="{ row }">
              <span class="text-button" @click="handleViewDetail(row)">详情</span>
            </template>
          </el-table-column>
        </template>
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
  </DemandManageWrapper>
</template>

<script setup lang="ts" name="procurementExecuteManage">
  import { ElMessage } from 'element-plus';
  import { useRouter } from 'vue-router';
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
  } from '@/api/platform/data-contracts';
  import {
    EXECUTE_TABS,
    VIEW_MODES,
    PURCHASE_STATUS,
    PURCHASE_STATUS_LABEL_MAP,
    PURCHASE_LINE_STATUS_ITEMS,
    type PurchaseStatus,
  } from '../constant';
  import ViewModeToggle from '../components/ViewModeToggle.vue';
  import MemberSelect from '../components/MemberSelect.vue';
  import PurchaseCategorySelect from '../components/PurchaseCategorySelect.vue';
  import PurchaseMaterialSelect from '../components/PurchaseMaterialSelect.vue';
  import DeptFilterSelect from '../components/DeptFilterSelect.vue';
  import DemandManageWrapper from '@/views/lute-os/demandManage/DemandManageWrapper.vue';
  import { useProcurementActiveTab } from '../hooks/useActiveTab';
  import { useProductTypeLabel } from '../hooks/useProductTypeLabel';
  import { useCurrencyLabel } from '../hooks/useCurrencyLabel';
  import useList from '@/views/lute-os/hooks/list/useList';
  const PAGE_SIZE = 10;
  type ViewMode = (typeof VIEW_MODES)[number]['value'];
  type ExecuteStatus = PurchaseStatus | (typeof PURCHASE_STATUS)['PURCHASE_PUSH_FAILED'];
  type ExecuteTabKey = ExecuteStatus;

  type ExecuteListQueryReq = DemandListQueryReq & {
    purchaseReq?: DemandPurchaseListQueryReq & {
      purchaseLineStatusList?: string[];
      productTypeList?: string[];
    };
    menuTag?: string;
    pushStatus?: string;
    purchaseKeyword?: string;
    purchaseType?: string;
    creator?: string;
    executorList?: string[];
    productInfo?: string;
    productInfoList?: string[];
    deptIdList?: string[];
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

  interface ExecuteProductLine {
    id: string;
    productType: string;
    productInfo: string;
    planQuantityDisplay: string;
    planPriceDisplay: string;
    planUnitPrice?: number | null;
    productTypeCode?: string;
    purchaseOrderNo?: string;
    purchaseLineNo?: string;
    purchaseLineStatus?: string;
    purchaseLineStatusDesc?: string;
    pushFailReason?: string;
    purchaseItemCode?: string;
    currency?: string;
    purchaserList?: PurchaserBean[];
    purchaseGroupName?: string;
    checkNumber?: number | string;
    unCheckNumber?: number | string;
    enableCheckNumber?: number;
  }

  interface ExecuteDemandRow {
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
    status: ExecuteStatus;
    statusDesc?: string;
    executor: PersonInfo;
    pushFailReason?: string;
    productTypeCode?: string;
    products: ExecuteProductLine[];
    raw: DemandPurchaseQueryBean;
  }

  interface ExecuteProductRow extends ExecuteProductLine {
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
    status: ExecuteStatus;
    statusDesc?: string;
    executor: PersonInfo;
    pushFailReason?: string;
    purchaseCode?: string;
    demandCode?: string;
  }

  type ExecuteTableRow = ExecuteDemandRow | ExecuteProductRow;

  const router = useRouter();
  const executeTabConfig = [
    { key: PURCHASE_STATUS.PURCHASE_FINISHED, countField: 'finishedCount' },
    { key: PURCHASE_STATUS.PURCHASE_WAIT_FOR_RECEIPT, countField: 'checkingCount' },
    { key: PURCHASE_STATUS.PURCHASE_EXECUTION_ING, countField: 'executingCount' },
    { key: PURCHASE_STATUS.PURCHASE_APPROVAL_ING, countField: 'approvingCount' },
    { key: PURCHASE_STATUS.PURCHASE_SRM_CLOSED, countField: 'srmClosedCount' },
    { key: PURCHASE_STATUS.PURCHASE_PUSH_FAILED, countField: 'sendFailCount' },
  ] as const;
  const executePriorityKeys: ExecuteTabKey[] = [
    PURCHASE_STATUS.PURCHASE_PUSH_FAILED,
    PURCHASE_STATUS.PURCHASE_WAIT_FOR_RECEIPT,
    PURCHASE_STATUS.PURCHASE_EXECUTION_ING,
    PURCHASE_STATUS.PURCHASE_APPROVAL_ING,
    PURCHASE_STATUS.PURCHASE_SRM_CLOSED,
    PURCHASE_STATUS.PURCHASE_FINISHED,
  ];
  const {
    activeTab,
    tabCountMap,
    syncCounts: syncExecuteTabCounts,
    initActiveTabByCounts: initExecuteActiveTab,
  } = useProcurementActiveTab<DemandPurchaseCountBean, ExecuteTabKey>(
    executeTabConfig,
    undefined,
    executePriorityKeys
  );
  const viewMode = ref<ViewMode>(VIEW_MODES[0].value);
  const hasInitActiveTab = ref(false);
  const { renderProductType } = useProductTypeLabel();

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

  const { formatCurrencyLabel } = useCurrencyLabel();

  const normalizeProductLine = (
    item: PurchaseItemBean,
    index: number,
    demandCode: string,
    pushFailReason?: string
  ): ExecuteProductLine => {
    const quantity = Number(item.number ?? 0);
    const price = item.price ?? undefined;
    const enableCheck = Number((item as Record<string, any>)?.enableCheckNumber);
    return {
      id: item.purchaseItemCode ?? item.productSku ?? `${demandCode || 'item'}-${index}`,
      productType: item.productTypeDesc ?? '',
      productInfo: item.productName ?? '',
      planQuantityDisplay: Number.isFinite(quantity) && quantity !== 0 ? String(quantity) : '--',
      planPriceDisplay: price !== undefined ? formatCurrency(price, item.currency ?? 'CNY') : '--',
      planUnitPrice: Number.isFinite(Number(price)) ? Number(price) : null,
      purchaseOrderNo: item.purchaseCode ?? '',
      purchaseLineNo: item.purchaseLine != null ? String(item.purchaseLine) : '--',
      purchaseLineStatus: '--',
      purchaseLineStatusDesc: (item as any)?.purchaseLineStatusDesc || '--',
      pushFailReason,
      purchaseItemCode: item.purchaseItemCode ?? '',
      currency: item.currency ?? 'CNY',
      productTypeCode: (item as Record<string, any>)?.productType ?? '',
      purchaseGroupName: (item as any)?.purchaseGroupName ?? '',
      checkNumber: (item as any)?.checkNumber ?? undefined,
      unCheckNumber: (item as any)?.unCheckNumber ?? undefined,
      enableCheckNumber: Number.isFinite(enableCheck) ? enableCheck : undefined,
      purchaserList: Array.isArray((item as any).purchaserList)
        ? ((item as any).purchaserList as PurchaserBean[])
        : [],
    };
  };

  const extractExecutor = (
    bean: DemandPurchaseQueryBean,
    productLines: ExecuteProductLine[]
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
      if (p.avatar) avatarList.push(p.avatar);
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

  const createDemandRow = (bean: DemandPurchaseQueryBean): ExecuteDemandRow => {
    const failReason = bean.sendErrorMsg ?? '';
    const products = (bean.demandPurchaseSaveBean?.purchaseItemList ?? []).map((line, index) =>
      normalizeProductLine(line, index, bean.demandCode ?? '', failReason)
    );
    const currency = products[0]?.currency || (bean as Record<string, any>)?.currency || 'CNY';
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
      status: (bean.status ?? PURCHASE_STATUS.PURCHASE_DRAFT) as ExecuteStatus,
      statusDesc: (bean as Record<string, any>)?.statusDesc || '',
      executor: extractExecutor(bean, products),
      pushFailReason: failReason || undefined,
      productTypeCode: products[0]?.productTypeCode ?? '',
      products,
      raw: bean,
    };
  };

  const toProductRow = (line: ExecuteProductLine, parent: ExecuteDemandRow): ExecuteProductRow => ({
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
    pushFailReason: line.pushFailReason ?? parent.pushFailReason,
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
  } = useList<ExecuteListQueryReq, DemandListQueryResp>({
    pageSize: PAGE_SIZE,
    searchDefaults: {
      pageNum: 1,
      pageSize: PAGE_SIZE,
      demandModule: 'purchase',
      submitManageFlag: 1,
      menuTag: 'execute_list',
      viewType: 0,
      keyword: '',
      purchaseReq: {
        demandModule: 'purchase',
        viewType: viewMode.value === 'product' ? 2 : 1,
        menuTag: 'execute_list',
        keyword: '',
        status: activeTab.value,
        purchaseLineStatusList: [] as string[],
        productTypeList: [] as string[],
      },
      pushStatus: '',
      purchaseKeyword: '',
      creator: '',
      executorList: [] as string[],
      productInfoList: [] as string[],
      deptIdList: [] as string[],
    },
    watchSearchKeys: [
      'keyword',
      'pushStatus',
      'purchaseKeyword',
      'creator',
      'executorList',
      'productInfoList',
      'deptIdList',
      'purchaseReq',
    ],
    service: (params) => {
      const { purchaseKeyword, ...rest } = params;
      const purchaseLineStatusList =
        Array.isArray((params.purchaseReq as any)?.purchaseLineStatusList) &&
        (params.purchaseReq as any).purchaseLineStatusList.length
          ? ((params.purchaseReq as any).purchaseLineStatusList as string[])
          : [];
      const productTypeList =
        Array.isArray((params.purchaseReq as any)?.productTypeList) &&
        (params.purchaseReq as any).productTypeList.length
          ? ((params.purchaseReq as any).productTypeList as string[])
          : [];
      const purchaseReq = {
        ...(params.purchaseReq ?? {}),
        demandModule: 'purchase',
        viewType: viewMode.value === 'product' ? 2 : 1,
        menuTag: 'execute_list',
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
        purchaseLineStatusList,
      };
      return platformApi.platformDemandV2List({
        ...rest,
        purchaseReq,
      });
    },
    onSuccess: (data) => updateTabCounts(data?.demandPurchaseCountBean),
  });

  // const demandRows = computed<ExecuteDemandRow[]>(() =>
  //   (listData.value?.demandPurchaseList ?? []).map(createDemandRow)
  // );

  // const productRows = computed<ExecuteProductRow[]>(() => {
  //   const fromDemand = demandRows.value.flatMap((row) =>
  //     row.products.map((line) => toProductRow(line, row))
  //   );
  //   console.log('fromDemand', fromDemand);
  //   if (fromDemand.length) return fromDemand;
  //   const fallback = listData.value?.demandPurchaseViewList ?? [];
  //   return fallback
  //     .map(createDemandRow)
  //     .flatMap((row) => row.products.map((line) => toProductRow(line, row)));
  // });

  const tableData = computed<ExecuteTableRow[]>(() => {
    if (!listData.value) return [];

    if (viewMode.value === 'demand') {
      const demandList = listData.value.demandPurchaseList ?? [];
      return demandList.map(createDemandRow);
    }

    const viewList = listData.value.demandPurchaseViewList ?? [];

    return viewList.map((bean) => {
      const productLine = normalizeProductLine(bean, 0, bean.demandCode ?? '', bean.sendErrorMsg);
      const pseudoParent: ExecuteDemandRow = {
        viewType: 'demand',
        code: bean.demandCode ?? '--',
        title: bean.demandTitle ?? '--',
        background: bean.demandBackground ?? '--',
        creator: toPersonInfo(bean.creatorName, bean.creatorAvatar),
        approver: extractApprover(bean),
        departmentName: joinDeptNames(bean.deptList) || bean.deptName || '--',
        createdAt: bean.createTime ?? '--',
        expectFinishTime: bean.expectFinishTime ?? '--',
        totalBudgetAmount: bean.sumPrice ?? null,
        totalBudgetCurrency: productLine.currency ?? bean.currency ?? 'CNY',
        status: bean.status ?? PURCHASE_STATUS.PURCHASE_DRAFT,
        statusDesc: (bean as Record<string, any>)?.statusDesc || '',
        executor: extractExecutor(bean, [productLine]),
        pushFailReason: bean.sendErrorMsg ?? undefined,
        products: [productLine],
        raw: bean, // 兼容结构
      };
      return toProductRow(productLine, pseudoParent);
    });
  });

  const selectedCodes = ref<string[]>([]);
  const selectedCount = computed(() => selectedCodes.value.length);
  const showApproverColumn = computed(
    () =>
      activeTab.value === PURCHASE_STATUS.PURCHASE_APPROVAL_ING ||
      activeTab.value === PURCHASE_STATUS.PURCHASE_APPROVAL_NOT_PASS
  );
  const showFailReasonColumn = computed(
    () => activeTab.value === PURCHASE_STATUS.PURCHASE_PUSH_FAILED && viewMode.value === 'demand'
  );
  const showPurchaseOrderColumns = computed(
    () =>
      activeTab.value !== PURCHASE_STATUS.PURCHASE_APPROVAL_ING &&
      activeTab.value !== PURCHASE_STATUS.PURCHASE_PUSH_FAILED
  );
  onMounted(() => {
    syncSearchStatus(); // 同步 activeTab 和 viewMode
    // runQuery(true); // 主动触发一次加载
  });
  const updateTabCounts = (counts?: DemandPurchaseCountBean) => {
    if (!hasInitActiveTab.value) {
      initExecuteActiveTab(counts);
      hasInitActiveTab.value = true;
      return;
    }
    syncExecuteTabCounts(counts);
  };

  const syncSearchStatus = () => {
    search.purchaseReq = {
      ...(search.purchaseReq ?? {}),
      status: activeTab.value,
      viewType: viewMode.value === 'product' ? 2 : 1,
      demandModule: 'purchase',
      menuTag: 'execute_list',
    };
  };

  function handleViewModeChange(mode: ViewMode) {
    if (viewMode.value !== mode) {
      viewMode.value = mode;
    }
    syncSearchStatus();
  }

  watch([activeTab, viewMode], () => {
    syncSearchStatus();
    // runQuery(true);
  });

  watch(tableData, () => {
    selectedCodes.value = [];
  });

  function handleSelectionChange(rows: ExecuteTableRow[]) {
    selectedCodes.value = rows.map((row) => row.code);
  }

  function handleRefresh() {
    refreshList();
  }

  function handleResetSearch() {
    resetSearchForm();
    syncSearchStatus();
  }

  const handlePurchaseCategoryChange = (nodes?: any) => {
    search.productInfoList = [];
  };

  function handleViewDetail(row: ExecuteTableRow) {
    const targetCode = row.code;
    if (!targetCode) {
      ElMessage.warning('缺少需求编码，无法跳转详情');
      return;
    }
    const query: Record<string, string> = {};

    if (activeTab.value === PURCHASE_STATUS.PURCHASE_EXECUTION_ING) {
      query.sourceTab = 'executing';
    } else if (activeTab.value === PURCHASE_STATUS.PURCHASE_APPROVAL_ING) {
      query.sourceTab = 'approving';
    } else if (activeTab.value === PURCHASE_STATUS.PURCHASE_PUSH_FAILED) {
      query.sourceTab = 'pushFailed';
    }

    router.push({
      name: 'procurementExecuteDetail',
      params: { id: targetCode },
      query,
    });
  }
</script>

<style scoped lang="scss">
  @use '../common.scss';
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

  .fail-reason {
    color: #f56c6c;
    white-space: pre-wrap;
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

  .text-button {
    color: var(--el-color-primary);
    cursor: pointer;
    padding: 0 4px;
    line-height: 1.4;
    user-select: none;
  }

  .dept-tooltip {
    max-width: 260px;
    display: block;
  }
</style>
