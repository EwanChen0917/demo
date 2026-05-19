import { ElMessage } from 'element-plus';
import type { ProductLineModel } from '../constant';

export type ProductLineFieldKey =
  | 'productType'
  | 'productInfo'
  | 'unitPrice'
  | 'currency'
  | 'quantity'
  | 'supplier'
  | 'supplierReason';

type ProductLinesTableRef = { showError: (index: number, field: ProductLineFieldKey) => void } | null;

type UseProductLinesValidationOptions = {
  products: Ref<ProductLineModel[]>;
  tableRef?: Ref<ProductLinesTableRef>;
  maxUnitPrice?: number;
  maxQuantity?: number;
};

export const useProductLinesValidation = (options: UseProductLinesValidationOptions) => {
  const maxUnitPrice = options.maxUnitPrice ?? 10_000_000;
  const maxQuantity = options.maxQuantity ?? 10_000;

  const showError = (index: number, field: ProductLineFieldKey) => {
    options.tableRef?.value?.showError(index, field);
  };

  const validateProductLines = () => {
    const lines = options.products.value;
    for (let i = 0; i < lines.length; i += 1) {
      const line = lines[i];
      const rowText = `第 ${i + 1} 行`;

      if (!line.productType?.trim()) {
        ElMessage.error(`${rowText}的采购产品类型不能为空`);
        showError(i, 'productType');
        return false;
      }
      if (!line.productInfo?.trim()) {
        ElMessage.error(`${rowText}的采购产品信息不能为空`);
        showError(i, 'productInfo');
        return false;
      }

      const price = Number(line.unitPrice ?? 0);
      if (!(price > 0)) {
        ElMessage.error(`${rowText}的采购单价需大于0`);
        showError(i, 'unitPrice');
        return false;
      }

      if (!line.currency) {
        ElMessage.error(`${rowText}的币种不能为空`);
        showError(i, 'currency');
        return false;
      }

      const quantity = Number(line.quantity ?? 0);
      if (!(quantity > 0)) {
        ElMessage.error(`${rowText}的采购数量需大于0`);
        showError(i, 'quantity');
        return false;
      }
      if (price >= maxUnitPrice) {
        ElMessage.error(`${rowText}的采购单价最多8位数字，请输入小于 10000000 的金额`);
        showError(i, 'unitPrice');
        return false;
      }
      if (quantity > maxQuantity) {
        ElMessage.error(`${rowText}的采购数量最多5位数字，请输入不超过 10000 的数量`);
        showError(i, 'quantity');
        return false;
      }

      const supplier = line.supplier?.trim() ?? '';
      const supplierReason = line.supplierReason?.trim() ?? '';
      if (supplier && !supplierReason) {
        ElMessage.error(`${rowText}填写了指定供应商，请填写指定供应商原因`);
        showError(i, 'supplierReason');
        return false;
      }
      if (!supplier && supplierReason) {
        ElMessage.error(`${rowText}填写了指定供应商原因，请填写指定供应商`);
        showError(i, 'supplier');
        return false;
      }

      line.totalPrice = Number((price * quantity).toFixed(2));
    }

    return true;
  };

  return {
    validateProductLines,
  };
};
