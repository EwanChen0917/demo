import { FormInstance } from 'element-plus';
import { baseBox, unBoxProduct } from '../type';

export interface boxFormValidatorResult {
  validatorRes: boolean;
  errMsg: string[];
}
/**
 * 一些三种装箱模式通用的文件
 * @returns
 */
export const useBoxForm = () => {
  const boxDialogRef = ref<FormInstance>();
  const boxValidator = async () => {
    if (!boxDialogRef.value) {
      return false;
    }
    return await boxDialogRef.value.validate().catch(() => false);
  };
  /**
   * 计算当前row的装箱量
   */
  const completelyBox = (row: unBoxProduct) => {
    if (!row?.cartonList || !row.quantity) {
      return 0;
    }
    const totalCount = row.cartonList.reduce((last, current: baseBox) => {
      return last + (current.boxNum || 0) * (current.perProductBoxCount || 1);
    }, 0);
    return totalCount;
  };
  /**
   * 装箱数量文本
   * @param row
   * @returns
   */
  const boxSpan = (row: unBoxProduct) => {
    if (!row?.cartonList || !row.quantity) {
      return h('span', '0');
    }
    const totalCount = completelyBox(row);
    const isOverInventory = totalCount < row.quantity;
    return h(
      'span',
      {
        style: {
          color: isOverInventory ? 'red' : '',
        },
      },
      totalCount.toString()
    );
  };
  /**
   * 校验表单是否合规
   */
  const checkParamsValidatorCustom = async (localData): Promise<boxFormValidatorResult> => {
    try {
      const res: boxFormValidatorResult = {
        validatorRes: true,
        errMsg: [],
      };

      const isBoxValid = await boxValidator();
      if (!isBoxValid) {
        return {
          validatorRes: false,
          errMsg: ['有字段为空，请检查！'],
        };
      }
      const errorResult: any[] = [];
      localData.forEach((e, index) => {
        const totalCount = completelyBox(e);
        if (!e.quantity) {
          errorResult.push(`存在供应链SKU序号${index + 1}无每箱商品数量，请检查！`);
        }
        if (totalCount !== e.quantity) {
          errorResult.push(`存在供应链SKU序号${index + 1}其装箱数量不等于调拨数量，请检查!`);
        }
      });
      if (errorResult.length === 0) {
        return {
          validatorRes: true,
          errMsg: [],
        };
      }
      return {
        validatorRes: false,
        errMsg: errorResult,
      };
    } catch (error) {
      return {
        validatorRes: false,
        errMsg: [error instanceof Error ? error.message : String(error)],
      };
    }
  };
  return {
    boxDialogRef,
    boxValidator,
    completelyBox,
    boxSpan,
    checkParamsValidatorCustom,
  };
};
