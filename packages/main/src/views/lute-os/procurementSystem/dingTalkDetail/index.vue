<template>
  <div class="dingding-detail-container" :style="{ paddingTop: paddingTop + 'px' }">
    <div class="detail-wrapper" v-loading="pageLoading">
      <div class="header" ref="headerRef">
        <div class="title-line">
          <span class="label">采购需求：</span>
          <span class="demand-title">
            【{{ detail.demandTitle || '需求标题' }}】{{ statusMessage }}
          </span>
        </div>
        <a class="detail-link" @click="openDetail">查看详情</a>
      </div>

      <el-descriptions class="detail-descriptions" :column="1" border>
        <el-descriptions-item label="失败原因" v-if="detail.status === 'srmCheckFailed'">
          <pre class="pre-wrap">{{ detail.failureReason || '--' }}</pre>
        </el-descriptions-item>
        <el-descriptions-item label="需求编码">
          {{ detail.demandCode || '--' }}
        </el-descriptions-item>
        <el-descriptions-item label="需求创建人">
          <div class="creator">
            <el-avatar :size="28" :src="detail.createAvatar" />
            <span>{{ detail.creatorName || '--' }}</span>
          </div>
        </el-descriptions-item>
        <el-descriptions-item label="所在部门">
          {{ detail.departmentName || '--' }}
        </el-descriptions-item>
        <el-descriptions-item label="创建时间">
          {{ detail.createTime || '--' }}
        </el-descriptions-item>
        <el-descriptions-item label="需求背景">
          <pre class="pre-wrap">{{ detail.background || '--' }}</pre>
        </el-descriptions-item>
        <el-descriptions-item label="总预算金额">
          {{ detail.totalBudget || '--' }}
        </el-descriptions-item>
        <el-descriptions-item label="期望完成时间">
          {{ detail.expectFinishTime || '--' }}
        </el-descriptions-item>
        <el-descriptions-item label="备注">
          <pre class="pre-wrap">{{ detail.remark || '--' }}</pre>
        </el-descriptions-item>
      </el-descriptions>

      <div class="product-tips">
        <p class="tips-line">
          该采购申请单内有 {{ detail.totalProductCount || 0 }} 条产品采购信息：
        </p>
        <!-- <p class="tips-line warning" v-if="detail.status === 'srmCheckFailed'">
          其中标红的为推送失败的产品信息。
        </p> -->
      </div>

      <ProductLinesTable
        v-if="displayedProducts.length"
        v-model="displayedProducts"
        :use-card="false"
        :addable="false"
        :editable="false"
        :force-product-fields-editable="detail.status === 'srmCheckFailed'"
        :show-header="false"
        :table-props="{ border: true, maxHeight: '420px', rowClassName: lineClassName }"
        :visible-columns="visibleColumns"
      />
      <div v-else class="empty-holder">暂无采购明细</div>

      <div class="view-all" v-if="showViewAll">
        <el-button text type="primary" @click="openViewAll">查看全部</el-button>
      </div>

      <div class="button-box" v-if="actionButtons.length">
        <el-button
          v-for="action in actionButtons"
          :key="action.key"
          :type="action.type || 'default'"
          class="action-btn"
          @click="handleAction(action)"
        >
          {{ action.label }}
        </el-button>
      </div>

      <SubmitProgressDialog
        v-model:visible="repushDialogVisible"
        v-model:status="repushDialogStatus"
        v-model:percent="repushDialogPercent"
        :checking-tip="repushCheckingTip"
        :show-notify-prompt="false"
        :show-checking-message="false"
        :success-tips="repushSuccessTips"
        :failure-tips="repushFailureTips"
        :show-failure-actions="false"
        @notify="handleRepushNotify"
        @dismiss="handleRepushDismiss"
        @confirm="handleRepushConfirm"
        @retry="handleRepush"
      />
    </div>
  </div>
</template>

<script setup lang="ts" name="procurementDingTalkDetail">
  import { useRoute } from 'vue-router';
  import { ElMessage } from 'element-plus';
  import Decimal from 'decimal.js';
  import { cloneDeep } from 'lodash-es';
  import { platformApi } from '@/api';
  import type { DemandDetailResp, DemandPurchaseBean } from '@/api/platform/data-contracts';
  import { PURCHASE_STATUS } from '../constant';
  import ProductLinesTable from '../components/ProductLinesTable.vue';
  import type { ProductLineModel } from '../constant';
  import { useCurrencyLabel } from '../hooks/useCurrencyLabel';
  import SubmitProgressDialog from '../components/PushDialog.vue';
  import { useProcurementRepush } from '../hooks/useProcurementRepush';

  const STATUS_MESSAGE_MAP = {
    srmCheckFailed: 'SRM校验失败！请及时处理',
    approving: '审批中',
    approved: '审批已通过！请及时处理',
  };

  const ACTION_CONFIG = {
    srmCheckFailed: [
      { key: 'retryPush', label: '重新推送', type: 'primary' },
      { key: 'openSystem', label: '系统内打开' },
    ],
    approving: [{ key: 'openSystem', label: '系统内打开' }],
    approved: [
      { key: 'processInSrm', label: '去处理(SRM)', type: 'success' },
      { key: 'openDemand', label: '打开需求系统', type: 'primary' },
    ],
  };

  const route = useRoute();

  const pageLoading = ref(false);
  const headerRef = useTemplateRef('headerRef');
  const paddingTop = ref(56);
  const detail = ref(createDefaultDetail());

  const statusMessage = computed(() => {
    return STATUS_MESSAGE_MAP[detail.value.status] || '待您处理。';
  });

  type ProductLineViewModel = ProductLineModel & { purchaseItemStatus?: number | null };

  const productTableLines = ref<ProductLineViewModel[]>([]);
  const visibleColumns: Array<keyof ProductLineModel | string> = [
    'productType',
    'productInfo',
    'unitPrice',
    'currency',
    'quantity',
    'totalPrice',
  ];

  const displayedProducts = computed<ProductLineViewModel[]>({
    get: () => productTableLines.value.slice(0, 5),
    set: (list) => {
      const next = cloneDeep(productTableLines.value);
      list.forEach((item, index) => {
        next[index] = item;
      });
      productTableLines.value = next;
    },
  });

  const isFailedLine = (line: ProductLineViewModel) => {
    const status = (line as any)?.purchaseLineStatus;
    const itemStatus = (line as any)?.purchaseItemStatus;
    return itemStatus === 1 || status === PURCHASE_STATUS.PURCHASE_PUSH_FAILED;
  };

  const lineClassName = ({ row }: { row: ProductLineViewModel }) =>
    isFailedLine(row) ? 'line-failed' : '';

  const showViewAll = computed(() => {
    if (!Array.isArray(detail.value.productList)) return false;
    return detail.value.productList.length > 5;
  });

  const actionButtons = computed(() => {
    return ACTION_CONFIG[detail.value.status] || [];
  });

  const updatePaddingTop = () => {
    if (headerRef.value) {
      paddingTop.value = headerRef.value.offsetHeight + 12;
    }
  };

  const isDEV = import.meta.env.VITE_ENV === 'DEV';
  const baseHost = computed(() => (isDEV ? 'https://erp.luteos.site' : 'https://erp.luteos.com'));
  const srmHost = computed(() => (isDEV ? 'http://47.119.173.79' : 'https://srm.luteos.com'));

  const buildSystemUrl = (path: string) => `${baseHost.value}${path}`;
  const buildSrmUrl = (code?: string) => {
    if (!code) return '';
    return `${srmHost.value}/srm/demand/PurchaseRequestHeadList?demandCode=${encodeURIComponent(
      code
    )}`;
  };
  const withPushFailedQuery = (url: string) => {
    const params = new URLSearchParams();
    if (detail.value.status === 'srmCheckFailed') {
      params.set('sourceTab', 'pushFailed');
      params.set('from', 'executeMyDemand');
    }
    const query = params.toString();
    return query ? `${url}?${query}` : url;
  };

  const openDetail = () => {
    const code = detail.value.demandCode;
    const url = code
      ? withPushFailedQuery(buildSystemUrl(`/procurement/execute/detail/${code}`))
      : '';
    if (!url) {
      ElMessage.warning('缺少需求编码，无法跳转');
      return;
    }
    window.open(url, '_blank');
  };

  const openViewAll = () => {
    const code = detail.value.demandCode;
    const url = code
      ? withPushFailedQuery(buildSystemUrl(`/procurement/execute/detail/${code}`))
      : '';
    if (!url) {
      ElMessage.warning('缺少需求编码，无法查看全部');
      return;
    }
    window.open(url, '_blank');
  };

  const handleAction = (action) => {
    switch (action.key) {
      case 'retryPush':
        handleRepush();
        break;
      case 'openSystem':
        openSystem();
        break;
      case 'processInSrm':
        openSrm();
        break;
      case 'openDemand':
        openDemandSystem();
        break;
      default:
        ElMessage.info('功能开发中');
    }
  };

  const openSystem = () => {
    const code = detail.value.demandCode;
    const url = code
      ? withPushFailedQuery(buildSystemUrl(`/procurement/execute/detail/${code}`))
      : '';
    if (!url) {
      ElMessage.warning('缺少需求编码，无法跳转');
      return;
    }
    window.open(url, '_blank');
  };

  const openSrm = () => {
    const url = buildSrmUrl(detail.value.demandCode);
    if (!url) {
      ElMessage.warning('缺少需求编码，无法跳转 SRM');
      return;
    }
    window.open(url, '_blank');
  };

  const openDemandSystem = () => {
    const code = detail.value.demandCode;
    const url = code ? buildSystemUrl(`/procurement/execute/detail/${code}`) : '';
    if (!url) {
      ElMessage.warning('请配置需求系统地址');
      return;
    }
    window.open(url, '_blank');
  };

  const STATUS_TO_TODO_STATUS: Record<number | string, string> = {
    [PURCHASE_STATUS.PURCHASE_APPROVAL_ING]: 'approving',
    [PURCHASE_STATUS.PURCHASE_EXECUTION_ING]: 'approved',
    [PURCHASE_STATUS.PURCHASE_WAIT_FOR_RECEIPT]: 'approved',
    [PURCHASE_STATUS.PURCHASE_FINISHED]: 'approved',
  };
  const { formatCurrencyLabel } = useCurrencyLabel();

  const toProductLine = (item: DemandPurchaseBean): ProductLineViewModel => {
    const currency = item.currency || 'CNY';
    const unitPrice = Number.isFinite(Number(item.price)) ? Number(item.price) : null;
    const quantity = Number.isFinite(Number(item.number)) ? Number(item.number) : null;
    const sum =
      item.sumPrice != null && Number.isFinite(Number(item.sumPrice))
        ? Number(item.sumPrice)
        : unitPrice !== null && quantity !== null
        ? unitPrice * quantity
        : null;
    return {
      infoSourceType: item.productType === '0' ? 'custom' : 'srm',
      productType: item.productTypeDesc || item.productType || '',
      productTypeCode: item.productType || '',
      productInfo: item.productName || '',
      productInfoCode: item.productSku || '',
      unitPrice,
      currency,
      quantity,
      totalPrice: sum,
      supplier: item.supplier || '',
      supplierReason: item.assignSupplierReason || '',
      remark: item.remark || '',
      id: item.purchaseItemCode || item.productSku || '',
      demandCode: item.demandCode || '',
      purchaseOrderNo: item.purchaseCode || '',
      purchaseLineNo:
        item.purchaseLine !== undefined && item.purchaseLine !== null
          ? String(item.purchaseLine)
          : '',
      purchaseLineStatus: item.purchaseLineStatus ?? null,
      purchaseLineStatusDesc: item.purchaseLineStatusDesc || '',
      purchaseItemStatus: (item as any)?.purchaseItemStatus ?? null,
      executor: '',
      purchaseQuantity: quantity ?? 0,
      receivedQuantity: 0,
      purchaseItemCode: item.purchaseItemCode || '',
      purchaserList: Array.isArray(item.purchaserList) ? item.purchaserList : [],
    };
  };

  const mapStatus = (status?: number | string, sendStatus?: number | string) => {
    const sendFlag = Number(sendStatus);
    if (sendFlag === 2) return 'srmCheckFailed';
    if (typeof status === 'string' && status) {
      return status;
    }
    if (typeof status === 'number') {
      const mapped = STATUS_TO_TODO_STATUS[status];
      if (mapped) return mapped;
    }
    return 'approving';
  };
  const calculateTotalBudget = (
    list: DemandPurchaseBean[],
    totalAmount?: number | null,
    currencyCode?: string | null
  ) => {
    const amount = (() => {
      if (totalAmount !== null && totalAmount !== undefined) {
        return Number.isFinite(Number(totalAmount)) ? new Decimal(totalAmount) : null;
      }
      if (!Array.isArray(list) || !list.length) return null;
      const sum = list.reduce((acc, item) => acc.plus(Number(item.sumPrice ?? 0)), new Decimal(0));
      return sum.isZero() ? null : sum;
    })();
    if (!amount) return '--';
    const currency =
      currencyCode ||
      list.find((item) => item.currency)?.currency ||
      (list[0]?.currency ?? 'CNY') ||
      'CNY';
    const label = formatCurrencyLabel(currency);
    return `${amount.toDecimalPlaces(2, Decimal.ROUND_HALF_UP).toNumber()} ${label || currency}`;
  };

  const mapDetail = (res: DemandDetailResp) => {
    const { purchase } = res;
    const purchaseList = Array.isArray(purchase?.purchaseItemList)
      ? purchase!.purchaseItemList!
      : [];
    const products = purchaseList.map(toProductLine);
    const failureReason =
      (res as any)?.sendErrorMsg ||
      purchase?.sendErrorMsg ||
      (purchase?.purchaseItemList
        ?.map((item) => (item as any).sendErrorMsg)
        .filter(Boolean)
        .join('\n') as string) ||
      '';
    return {
      demandTitle: res.demandTitle || '',
      status: mapStatus(res.status, (res as any)?.sendStatus, (res as any)?.purchaseSendStatus),
      failureReason,
      demandCode: res.demandCode || '',
      creatorName: res.creatorName || '--',
      createAvatar: res.createAvatar || '',
      departmentName: (res as any)?.deptStr || purchase?.deptNameStr || purchase?.deptName || '--',
      createTime: res.createTime || '--',
      background: res.demandBackground || '--',
      totalBudget: calculateTotalBudget(purchaseList, res.totalAmount, res.currency),
      expectFinishTime: res.expectFinishTime || '--',
      remark: (res as any)?.remark || res.demandDesc || '--',
      totalProductCount: products.length,
      productList: products,
    };
  };

  const fetchDetail = async () => {
    pageLoading.value = true;
    try {
      const todoId = route.params.id;
      if (!todoId) return;
      const detailResp = await platformApi.platformDemandDetail({
        demandCode: String(todoId),
        demandModule: 'purchase',
      });
      const mapped = mapDetail(detailResp);
      detail.value = {
        ...detail.value,
        ...mapped,
      };
      productTableLines.value = mapped.productList;
    } catch (error) {
      console.error('加载采购待办详情失败', error);
      ElMessage.error('加载详情失败，请稍后重试');
    } finally {
      pageLoading.value = false;
    }
  };

  const {
    repushDialogVisible,
    repushDialogStatus,
    repushDialogPercent,
    repushSuccessTips,
    repushFailureTips,
    repushProcessing,
    repushCheckingTip,
    handleRepush,
    handleRepushNotify,
    handleRepushDismiss: baseRepushDismiss,
    handleRepushConfirm: baseRepushConfirm,
  } = useProcurementRepush({
    pushFailReason: computed(() => detail.value.failureReason || ''),
    updateStatus: (status) => {
      detail.value.status = mapStatus(status);
    },
    buildRepushPayload: () => {
      if (!detail.value.demandCode) return null;
      return {
        demandCode: detail.value.demandCode,
        demandModule: 'purchase',
        demandTitle: detail.value.demandTitle,
        demandBackground: detail.value.background,
        demandDesc: detail.value.remark,
        expectFinishTime: detail.value.expectFinishTime,
        demandPurchaseSaveBean: {
          currency: detail.value.productList[0]?.currency || 'CNY',
          purchaseItemList: detail.value.productList.map((item) => ({
            purchaseItemCode: item.purchaseItemCode,
            productType: item.productTypeCode || item.productType || '',
            productName: item.productInfo || '',
            productSku: item.productInfoCode || '',
            price: item.unitPrice ?? 0,
            currency: item.currency || 'CNY',
            number: item.quantity ?? 0,
            sumPrice: item.totalPrice ?? 0,
            purchaseCode: item.purchaseOrderNo,
            purchaseLine: item.purchaseLineNo ? Number(item.purchaseLineNo) : undefined,
            purchaseGroup: item.purchaseGroup || '',
            purchaseGroupName: item.purchaseGroupName || '',
            supplier: item.supplier,
            assignSupplierReason: item.supplierReason,
            remark: item.remark,
            purchaserList: item.purchaserList,
            purchaserCodeList: Array.isArray(item.purchaserList)
              ? item.purchaserList
                  .map((member: any) => member?.memberCode || member?.code || '')
                  .filter(Boolean)
              : [],
          })),
        },
      };
    },
  });

  const handleRepushDismiss = () => {
    repushDialogVisible.value = false;
    fetchDetail();
  };
  const handleRepushConfirm = async () => {
    repushDialogVisible.value = false;
    await fetchDetail();
  };
  watchPostEffect(() => {
    updatePaddingTop();
    detail.value;
  });
  onMounted(() => {
    window.addEventListener('resize', updatePaddingTop);
    updatePaddingTop();
    fetchDetail();
  });

  onUnmounted(() => {
    window.removeEventListener('resize', updatePaddingTop);
  });

  function createDefaultDetail() {
    return {
      demandTitle: '',
      status: 'srmCheckFailed',
      failureReason: '',
      demandCode: '',
      creatorName: '',
      departmentName: '',
      createTime: '',
      background: '',
      totalBudget: '',
      expectFinishTime: '',
      remark: '',
      totalProductCount: 0,
      productList: [],
    };
  }
</script>

<style scoped lang="scss">
  .dingding-detail-container {
    background: #fff;
  }

  .detail-wrapper {
    max-width: 820px;
    margin: 0 auto;
    padding: 0 24px 40px;
  }

  .header {
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
    margin-bottom: 16px;
  }

  .title-line {
    font-size: 16px;
    font-weight: 600;
    color: #1f2d3d;
  }

  .label {
    margin-right: 4px;
  }

  .demand-title {
    font-weight: 500;
  }

  .detail-link {
    font-size: 12px;
    color: #409eff;
    cursor: pointer;
  }

  .detail-descriptions {
    margin-bottom: 16px;
  }

  :deep(.el-descriptions__cell.el-descriptions__label.is-bordered-label) {
    width: 120px;
  }

  .pre-wrap {
    white-space: pre-wrap;
    word-break: break-word;
    margin: 0;
  }

  .product-tips {
    margin: 12px 0;
    font-size: 12px;
    color: #606266;
    line-height: 1.6;
  }

  .tips-line {
    margin: 0;
  }

  .warning {
    color: #ff4d4f;
  }

  :global(.line-failed .el-table__cell) {
    color: #ff4d4f;
  }

  :global(.line-failed .el-select__wrapper),
  :global(.line-failed .el-select .el-input__wrapper),
  :global(.line-failed .el-cascader .el-input__wrapper),
  :global(.line-failed .el-input__wrapper) {
    border-color: #ff4d4f !important;
    box-shadow: 0 0 0 1px #ff4d4f inset;
  }

  :global(.line-failed .el-select__placeholder),
  :global(.line-failed .el-select__selected-item),
  :global(.line-failed .el-select .el-input__inner),
  :global(.line-failed .el-cascader .el-input__inner) {
    color: #ff4d4f;
  }

  .product-table {
    margin-bottom: 12px;
  }

  .creator {
    display: inline-flex;
    align-items: center;
    gap: 8px;
    padding-top: 6px;
  }

  .empty-holder {
    padding: 32px 0;
    text-align: center;
    color: #909399;
  }

  .view-all {
    margin-bottom: 32px;
  }

  .button-box {
    display: flex;
    justify-content: center;
    gap: 24px;
    padding: 16px 0 0;
  }

  .action-btn {
    min-width: 120px;
  }
</style>
