import { erpApi } from '@/api';
import { ElMessage } from 'element-plus';

// 获取po单分配列表
export const getPickupItemList = async (params) => {
  const { materialNumber, requireQuantity, supplierCode, deliveryDate } = params;
  return erpApi.luteosErpPlanPickupAllocateOrderNumberList({
    supplierCode,
    materialNumber,
    requireQuantity,
    deliveryDate,
  });
};

export const validPoQty = (skuRow) => {
  return [
    {
      required: true,
      validator: (rule, value, callback) => {
        const { pickupQuantity, pickupItemList } = skuRow;
        const sumRequireQuantity = pickupItemList.reduce(
          (pre, cur) => pre + cur.requireQuantity,
          0
        );
        if (!value) {
          callback(new Error('请输入有效数量'));
        } else if (value > pickupQuantity) {
          callback(new Error(`不可大于提货总数量`));
        } else if (sumRequireQuantity > pickupQuantity) {
          callback(new Error(`数量汇总不能大于${pickupQuantity}`));
        } else {
          callback();
        }
      },
    },
  ];
};

export const validQty = (row) => {
  return [
    {
      required: true,
      validator: (rule, value, callback) => {
        if (!value) {
          callback(new Error('请输入有效数量'));
        } else if (value > row.notDeliveryQuantity) {
          row.pickupItemList = [];
          callback(new Error(`当前提货可发总数为${row.notDeliveryQuantity}，超出无法分配`));
        } else {
          callback();
        }
      },
    },
  ];
};
