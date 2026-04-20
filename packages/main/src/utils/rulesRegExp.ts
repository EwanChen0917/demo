export const priceRule = /(^[0-9]+$)|(^[0-9]+\.[0-9]{1,2}$)/;
export const priceRuleFixed3 = /(^[0-9]+$)|(^[0-9]+\.[0-9]{1,3}$)/;
export const priceRuleFixed4 = /(^[0-9]+$)|(^[0-9]+\.[0-9]{1,4}$)/;
export const priceRuleFixed6 = /(^[0-9]+$)|(^[0-9]+\.[0-9]{0,6}$)/;
export const rateRuleFixed4 = /(^[-]{0,1}[0-9]+$)|(^[-]{0,1}[0-9]+\.[0-9]{1,4}$)/;
export const integerRule = /^[0-9]*$/;
export const positiveIntegerRule = /^[1-9]\d*$/;

export const includeZero1 = /^0$|^[0-9]\d*(\.\d)?$/; // 包含0,保留一位小数
export const excludeZero1 = /^(?!0(\.0)?$)\d+(\.\d)?$/; // 不包含0,保留一位小数

export const emailRule = /^[a-zA-Z0-9_.-]+@[a-zA-Z0-9-]+(\.[a-zA-Z0-9-]+)*\.[a-zA-Z0-9]{2,6}/; // 邮箱格式
export const phoneRule = /^1[3456789]\d{9}$/; // 手机号格式
