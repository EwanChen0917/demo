import { ElMessage } from 'element-plus';
import { erpApi } from '@/api';

interface UseTransferRowSaveOptions {
  listData: any;
  runQuery: () => void | Promise<void>;
  successMessage?: string;
}

export function useTransferRowSave(options: UseTransferRowSaveOptions) {
  const { listData, runQuery, successMessage } = options;

  const handleSave = async (
    row: any,
    val: any,
    type: 'transportName' | 'quantity' | 'remark' | 'toWarehouseId'
  ) => {
    const recordList = listData.value?.recordList as any[] | undefined;
    const item = recordList?.find((it) => it.transferId === row.transferId);
    if (!item) {
      ElMessage.error('未找到对应数据');
      return;
    }

    if (type === 'transportName') {
      item.transportName = val?.label ?? row.transportName;
      item.transportId = val?.value ?? row.transportId;
    } else if (type === 'quantity') {
      const next = val?.target?.value ?? row.quantity ?? 0;
      item.quantity = Number.isNaN(Number(next)) ? 0 : Number(next);
    } else if (type === 'remark') {
      item.remark = val?.target?.value ?? row.remark ?? '';
    } else if (type === 'toWarehouseId') {
      item.toWarehouseId = val ?? row.toWarehouseId;
    }

    const newParams: Record<string, any> = { transferId: item.transferId };
    if (item.quantity !== undefined) newParams.quantity = item.quantity;
    if (item.remark !== undefined) newParams.remark = item.remark;
    if (item.transportId !== undefined) newParams.transportId = item.transportId;
    if (item.transportName !== undefined) newParams.transportName = item.transportName;
    if (item.toWarehouseId !== undefined) newParams.toWarehouseId = item.toWarehouseId;

    await erpApi.luteosErpOrderTransferSave(newParams);
    ElMessage.success(successMessage || '保存成功');
    runQuery();
  };

  return { handleSave };
}

export function useTableSelection<T = any>() {
  const selectedRows = ref<T[] | undefined>();
  const onSelectionChange = (rows: T[]) => {
    selectedRows.value = rows;
  };
  return { selectedRows, onSelectionChange };
}
