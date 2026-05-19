import { ref } from 'vue';
import { ElMessage } from 'element-plus';
import { cisApi } from '@/api';
import { useAutoBatchSaver, type ChangeItem } from './useAutoBatchSaver';

/**
 * Shopify 库存设置变更项
 */
export type ShopifyStockChange = ChangeItem<string, number> & {
  locationId: number;
};

/**
 * 后端接口所需的 payload 格式
 */
type ShopifyOversellLimitPayload = {
  inventoryItemId: string;
  locationId: number;
  oversellLimit: number;
}[];

/**
 * 行数据类型（最小约束，兼容 any 行对象）
 */
type StockRow = {
  inventoryItemId: string;
  locationId: number;
  autoSyncStock: number;
  autoSyncStockLoading?: boolean;
  allowBackorder?: number;
  allowBackorderLoading?: boolean;
  tracked?: number;
};

/**
 * Shopify 库存配置批量保存 Hook
 *
 * 提供三类操作：
 * - updateOversellLimit：超卖限制批量防抖提交（1s 防抖 + 5s 最大等待）
 * - updateAutoSyncStock：自动同步库存开关即时提交（含 loading 状态与失败回滚）
 * - updateAllowBackorder：允许继续售卖/缺货下单开关即时提交（含 loading 与失败回滚）
 */
export function useShopifyStockBatchSaver(options?: {
  /** oversellLimit 保存成功后的回调 */
  onSuccess?: () => void;
  /** oversellLimit 保存成功后刷新列表的回调 */
  onRefresh?: () => void;
}) {
  // ========== oversellLimit 批量防抖保存 ==========

  const { pushChange, requestRefresh, ...rest } = useAutoBatchSaver<
    ShopifyStockChange,
    ShopifyOversellLimitPayload
  >({
    delay: 1000,
    maxWait: 5000,
    transform: (batch) =>
      batch.map((item) => ({
        inventoryItemId: item.id,
        locationId: item.locationId,
        oversellLimit: item.value,
      })),
    saveFn: async (payload) => {
      try {
        await cisApi.cisInventoryShopifyLevelUpdateConfig({ saveList: payload } as any);
        ElMessage.success('批量更新成功');
        options?.onSuccess?.();
        // options?.onRefresh?.();
      } catch (error: any) {
        ElMessage.error(error?.message || '批量更新失败');
        throw error;
      }
    },
    onError: (batch, error) => {
      console.error('[useShopifyStockBatchSaver] 批量保存失败:', { batch, error });
    },
    onRefresh: options?.onRefresh,
    refreshDelay: 1000,
  });

  /**
   * 更新单行的超卖限制（防抖批量提交）
   */
  const updateOversellLimit = (
    inventoryItemId: string,
    locationId: number,
    oversellLimit: number
  ) => {
    pushChange({
      id: inventoryItemId,
      field: 'oversellLimit',
      value: oversellLimit,
      locationId,
    });
  };

  // ========== autoSyncStock 即时单条保存 ==========

  const autoSyncStockSaving = ref(false);

  /**
   * 切换行的自动同步库存开关（即时提交，含 loading 与乐观回滚）
   */
  const updateAutoSyncStock = async (row: StockRow, value: boolean) => {
    if (row.autoSyncStockLoading) return;
    if (!row.inventoryItemId || !row.locationId) {
      ElMessage.error('数据不完整，无法修改');
      return;
    }

    const newValue = value ? 1 : 0;
    const prevValue = row.autoSyncStock;

    try {
      row.autoSyncStockLoading = true;
      autoSyncStockSaving.value = true;
      await cisApi.cisInventoryShopifyLevelUpdateConfig({
        saveList: [
          {
            inventoryItemId: Number(row.inventoryItemId),
            locationId: row.locationId,
            autoSyncStock: newValue,
          },
        ],
      });
      row.autoSyncStock = newValue;
      requestRefresh();
      ElMessage.success('修改成功');
    } catch (error: any) {
      row.autoSyncStock = prevValue;
      ElMessage.error(error?.message || '修改失败，请重试');
    } finally {
      row.autoSyncStockLoading = false;
      autoSyncStockSaving.value = false;
    }
  };

  // ========== allowBackorder 即时单条保存 ==========

  const allowBackorderSaving = ref(false);

  /**
   * 切换行的允许继续售卖（缺货下单）开关（即时提交，含 loading 与失败回滚）
   */
  const updateAllowBackorder = async (row: StockRow, value: boolean) => {
    if (row.allowBackorderLoading) return;
    if (!row.inventoryItemId || !row.locationId) {
      ElMessage.error('数据不完整，无法修改');
      return;
    }
    const newValue = value ? 1 : 0;
    const prevValue = row.allowBackorder ?? 0;
    try {
      row.allowBackorderLoading = true;
      allowBackorderSaving.value = true;
      await cisApi.cisInventoryShopifyLevelUpdateConfig({
        saveList: [
          {
            inventoryItemId: Number(row.inventoryItemId),
            locationId: row.locationId,
            allowBackorder: newValue,
          },
        ],
      });
      row.allowBackorder = newValue;
      requestRefresh();
      ElMessage.success('修改成功');
    } catch (error: any) {
      row.allowBackorder = prevValue;
      ElMessage.error(error?.message || '修改失败，请重试');
    } finally {
      row.allowBackorderLoading = false;
      allowBackorderSaving.value = false;
    }
  };

  return {
    /** 更新超卖限制（防抖批量提交） */
    updateOversellLimit,
    /** 切换自动同步库存开关（即时提交） */
    updateAutoSyncStock,
    /** 是否有自动同步请求正在进行 */
    autoSyncStockSaving,
    /** 切换允许继续售卖开关（即时提交） */
    updateAllowBackorder,
    /** 是否有 allowBackorder 请求正在进行 */
    allowBackorderSaving,
    ...rest,
  };
}
