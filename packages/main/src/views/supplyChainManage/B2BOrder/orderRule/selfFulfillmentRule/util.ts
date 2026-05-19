/**
 * rightSides 数据转换工具函数
 */

/**
 * 1. TagInput 转换函数
 * 用途：将 formModel 中的 { value, subOp }[] 转换为 TagInput 需要的 string[]
 * 使用场景：receiverProvince, receiverCity, receiverCode, orderMSKU 等
 */
export function tagInputRightSidesToArray(rightSides: any[]): string[] {
  if (!Array.isArray(rightSides)) return [];
  return rightSides
    .map(item => {
      if (typeof item === 'string') return item;
      return item?.value || item;
    })
    .filter(Boolean);
}

/**
 * 将 TagInput 的 string[] 转换回 formModel 需要的 { value, subOp }[]
 */
export function arrayToTagInputRightSides(
  values: string[], 
  originalRightSides?: any[]
): Array<{ value: string; subOp: string | null }> {
  if (!Array.isArray(values)) return [];
  
  return values.map((v, index) => {
    // 如果原数据存在，尝试保留 subOp
    const original = originalRightSides?.[index];
    return {
      value: String(v),
      subOp: original?.subOp || null
    };
  });
}

/**
 * 2. DoubleInput 转换函数
 * 用途：将 formModel 中的 [{ subOp, value }, { subOp, value }] 转换为 DoubleInput 需要的 { min, max }
 * 使用场景：orderDeliveryTime (sorderSellerShipmentRemainTime) 等
 */
export function doubleInputRightSidesToObject(rightSides: any[]): { min: string | number; max: string | number } {
  if (!Array.isArray(rightSides) || rightSides.length < 2) {
    return { min: '', max: '' };
  }
  
  const [minItem, maxItem] = rightSides;
  return {
    min: minItem?.value || '',
    max: maxItem?.value || ''
  };
}

/**
 * 将 DoubleInput 的 { min, max } 转换回 formModel 需要的数组格式
 */
export function objectToDoubleInputRightSides(
  value: { min?: string | number; max?: string | number }
): Array<{ subOp: string; value: string }> {
  return [
    { 
      subOp: '>=', 
      value: String(value.min || '') 
    },
    { 
      subOp: '<=', 
      value: String(value.max || '') 
    }
  ];
}

/**
 * 3. Select 转换函数（如果需要数据清洗）
 * 用途：确保 el-select 使用的 { value, desc }[] 格式正确
 * 使用场景：orderPlatform, orderStore, orderCountry, receiverCountry 等
 */
export function normalizeSelectRightSides(rightSides: any[]): Array<{ value: string; desc: string }> {
  if (!Array.isArray(rightSides)) return [];
  
  return rightSides.map(item => {
    if (typeof item === 'string') {
      return { value: item, desc: item };
    }
    return {
      value: item?.value || '',
      desc: item?.desc || item?.value || ''
    };
  }).filter(item => item.value);
}