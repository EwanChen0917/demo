import { ElMessage } from 'element-plus';
import { ref, type ComputedRef, type Ref } from 'vue';
import { platformApi } from '@/api';
import type { DemandPurchaseBean, PurchaserBean } from '@/api/platform/data-contracts';
import type { ReceiveProductItem } from '../components/ReceiveDialog.vue';

type ReceiveDialogMode = 'batch' | 'single';

interface UseReceiveOperationsOptions {
  productList: Ref<Array<Record<string, any>>>;
  demandCode: ComputedRef<string>;
  showBatchReceiveButton: ComputedRef<boolean>;
  extractErrorMessage: (error: unknown, fallback: string) => string;
  normalizeProductRows?: (items: DemandPurchaseBean[], demandCode: string) => Array<Record<string, any>>;
}

interface ReceiveSubmitPayload {
  mode: ReceiveDialogMode;
  products: ReceiveProductItem[];
}

const OPERATE_TYPE_CHECK = 'check';

const buildOperateItemList = (products: ReceiveProductItem[]) =>
  products
    .map((item) => ({
      purchaseItemCode: item.id != null ? String(item.id) : '',
      receiveQuantity: Number(item.currentQuantity ?? 0),
    }))
    .filter((item) => item.purchaseItemCode && item.receiveQuantity > 0);

const normalizeReceiveProducts = (rows: Array<Record<string, any>>): ReceiveProductItem[] =>
  rows
    .map((item) => {
      const purchaseQuantity = Number(item.purchaseQuantity ?? 0);
      const receivedQuantity = Number(item.receivedQuantity ?? 0);
      const purchaseItemCode = item.purchaseItemCode ?? item.id ?? '';
      const enableCheck = Number(item.enableCheckNumber);
      return {
        id: purchaseItemCode ? String(purchaseItemCode) : '',
        productType: item.productType ?? '',
        productInfo: item.productInfo ?? '',
        purchaseQuantity,
        receivedQuantity,
        enableCheckNumber: Number.isFinite(enableCheck) ? enableCheck : undefined,
        currentQuantity: 0,
      };
    })
    .filter(
      (item) =>
        item.id && item.purchaseQuantity > item.receivedQuantity && item.purchaseQuantity > 0
    );

const formatExecutorNames = (list?: PurchaserBean[]) => {
  if (!Array.isArray(list) || !list.length) return '--';
  const names = list.map((item) => item?.name?.trim()).filter((name): name is string => !!name);
  return names.length ? names.join('、') : '--';
};

export const useReceiveOperations = ({
  productList,
  demandCode,
  showBatchReceiveButton,
  extractErrorMessage,
  normalizeProductRows,
}: UseReceiveOperationsOptions) => {
  const loadingDetail = ref(false);
  const selectedCodes = ref<string[]>([]);
  const selectedProducts = ref<Array<Record<string, any>>>([]);
  const receiveDialogVisible = ref(false);
  const receiveDialogMode = ref<ReceiveDialogMode>('batch');
  const receiveProducts = ref<ReceiveProductItem[]>([]);
  const receiveSubmitLoading = ref(false);

  const resolveDemandCode = () => {
    const value = demandCode.value;
    return typeof value === 'string' ? value.trim() : '';
  };

  const resetSelection = () => {
    selectedCodes.value = [];
    selectedProducts.value = [];
  };

  const handleSelectionChange = (rows: Array<Record<string, any>>) => {
    selectedCodes.value = rows.map((row) => row.id);
    selectedProducts.value = rows;
  };

  const handleReceiveProduct = (row: Record<string, any>) => {
    if (!row) return;
    const [product] = normalizeReceiveProducts([row]);
    if (!product) {
      ElMessage.warning('该产品暂无可查收的数量');
      return;
    }
    receiveDialogMode.value = 'single';
    receiveProducts.value = [{ ...product }];
    receiveDialogVisible.value = true;
  };

  const handleBatchReceive = () => {
    if (!showBatchReceiveButton.value) return;
    const hasSelection = selectedProducts.value.length > 0;
    const candidates = hasSelection ? selectedProducts.value : productList.value;
    const products = normalizeReceiveProducts(candidates);
    if (!products.length) {
      ElMessage.warning('暂无可查收的产品');
      return;
    }
    const useSingleMode =
      hasSelection && selectedProducts.value.length === 1 && products.length === 1;
    receiveDialogMode.value = useSingleMode ? 'single' : 'batch';
    receiveProducts.value = products.map((item) => ({ ...item }));
    receiveDialogVisible.value = true;
  };

  const fetchUpdatedProducts = async (code: string) => {
    if (loadingDetail.value) return;
    loadingDetail.value = true;
    try {
      const response = await platformApi.platformDemandDetail({
        demandCode: code,
        demandModule: 'purchase',
      });
      const purchaseList = Array.isArray(response?.purchase?.purchaseItemList)
        ? response!.purchase!.purchaseItemList!
        : [];
      const normalized = normalizeProductRows
        ? normalizeProductRows(purchaseList, code)
        : purchaseList.map((item, index) => {
          const currency = item.currency || 'CNY';
          const quantityValue = Number(item.number ?? 0);
          const purchaseItemCode = item.purchaseItemCode;
          const purchasers = Array.isArray(item.purchaserList) ? (item.purchaserList as PurchaserBean[]) : [];
          const enableCheck = Number((item as Record<string, any>)?.enableCheckNumber);
          return {
          id: purchaseItemCode,
          demandCode: item.demandCode || code || '--',
          purchaseOrderNo: item.purchaseCode || '--',
          purchaseLineNo:
            item.purchaseLine !== undefined && item.purchaseLine !== null
              ? String(item.purchaseLine)
              : '--',
          productType: item.productTypeDesc || item.productType || '--',
          productInfo: item.productName || '--',
          unitPrice: item.price ?? 0,
          currency,
          quantity: quantityValue,
          totalPrice: item.sumPrice ?? 0,
          executor: formatExecutorNames(purchasers),
          assignSupplier: item.supplier || '--',
          assignReason: item.assignSupplierReason || '--',
          remark: item.remark || '--',
            purchaseQuantity: Number.isFinite(quantityValue) ? quantityValue : 0,
            receivedQuantity: Number(item.checkQuantity ?? item.completedQuantity ?? 0),
            enableCheckNumber: Number.isFinite(enableCheck) ? enableCheck : undefined,
            purchaseItemCode,
            purchaserList: purchasers,
          };
      });
      productList.value = normalized;
    } catch (error) {
      console.error('Failed to refresh procurement products after receiving', error);
      ElMessage.error(extractErrorMessage(error, '更新采购产品列表失败，请稍后重试'));
    } finally {
      loadingDetail.value = false;
    }
  };

  const handleReceiveSubmit = async ({ products }: ReceiveSubmitPayload): Promise<boolean> => {
    if (!products?.length) {
      ElMessage.warning('请填写本次需要查收的数量');
      return false;
    }
    const code = resolveDemandCode();
    if (!code) {
      ElMessage.error('缺少需求编码，无法提交查收');
      return false;
    }
    const itemList = buildOperateItemList(products);
    const hasAvailable = products.some((item) => {
      const enable = Number((item as any)?.enableCheckNumber);
      return Number.isFinite(enable) && enable > 0;
    });
    if (!hasAvailable) {
      ElMessage.warning('暂无可查收的产品数量');
      return false;
    }
    if (!itemList.length) {
      ElMessage.warning('请输入本次查收数量');
      return false;
    }

    receiveSubmitLoading.value = true;
    try {
      await platformApi.platformDemandPurchaseOperate({
        demandCode: code,
        operateType: OPERATE_TYPE_CHECK,
        itemList,
      });
      await fetchUpdatedProducts(code);
      ElMessage.success('查收提交成功');
      receiveDialogVisible.value = false;
      receiveProducts.value = [];
    } catch (error) {
      ElMessage.error(extractErrorMessage(error, '查收失败，请稍后重试'));
      return false;
    } finally {
      receiveSubmitLoading.value = false;
    }
    return true;
  };

  return {
    selectedCodes,
    selectedProducts,
    receiveDialogVisible,
    receiveDialogMode,
    receiveProducts,
    receiveSubmitLoading,
    handleSelectionChange,
    handleReceiveProduct,
    handleBatchReceive,
    handleReceiveSubmit,
    resetSelection,
  };
};

export type UseReceiveOperationsReturn = ReturnType<typeof useReceiveOperations>;
