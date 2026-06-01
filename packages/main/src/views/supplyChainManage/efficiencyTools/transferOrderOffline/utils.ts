import { FormItemRule } from 'element-plus';

export const boxNumberRules: FormItemRule[] = [
  { required: true, message: '请输入箱子数量', trigger: 'blur' },
  {
    validator: (rule, value, callback) => {
      if (!value && value !== 0) {
        callback(new Error('请输入箱子数量'));
      } else if (!Number.isInteger(Number(value)) || Number(value) <= 0) {
        callback(new Error('箱子数量必须为正整数'));
      } else {
        callback();
      }
    },
    trigger: 'blur',
  },
];
// 计算体积函数 (cm³ 转换为 m³)
export const calculateVolume = (length: number, width: number, height: number) => {
  if (!length || !width || !height) {
    return '-';
  }
  // 长宽高单位为cm，计算体积后转换为立方米
  // 1 m³ = 1,000,000 cm³
  const volumeCm3 = length * width * height;
  const volumeM3 = volumeCm3 / 1000000;
  return volumeM3.toFixed(6); // 保留6位小数
};

/**
 * 计算总体积m³
 * @param length 产品长度
 * @param width 产品宽度
 * @param height 产品高度
 * @param quantity 调拨数量
 * @param forSubmit 是否用于提交（true时返回0，false时返回'-'）
 * @returns 总体积，保留4位小数
 */
export const calculateTotalVolume = (
  length: number | null | undefined,
  width: number | null | undefined,
  height: number | null | undefined,
  quantity: number | null | undefined,
  forSubmit = false
): string | number => {
  // 边界处理：如果任一参数无效，返回 '-' 或 0
  const validLength = Number(length) || 0;
  const validWidth = Number(width) || 0;
  const validHeight = Number(height) || 0;
  const validQuantity = Number(quantity) || 0;
  if (validLength === 0 || validWidth === 0 || validHeight === 0 || validQuantity === 0) {
    return forSubmit ? 0 : '-';
  }
  // 计算单个产品体积（假设尺寸单位是cm，转换为m³）
  const singleVolume = (validLength * validWidth * validHeight) / 1000000;
  const totalVolume = singleVolume * validQuantity;
  return forSubmit ? Number(totalVolume.toFixed(4)) : totalVolume.toFixed(4);
};

/**
 * 计算体积重kg
 * @param weight 实物重kg
 * @returns 体积重，保留2位小数
 */
export const calculateVolumeWeight = (
  weight: number | null | undefined | string,
  volumeWeightCoefficient: number
): string => {
  // 边界处理：如果实物重无效，返回 '-'
  const validWeight = Number(weight) || 0;
  const coefficient = volumeWeightCoefficient || 1;
  if (validWeight === 0) {
    return '-';
  }
  // 体积重 = 实物重 / 体积系数
  const volumeWeight = validWeight / coefficient;
  return `${volumeWeight.toFixed(4)}`;
};

/**
 * 计算总实物重
 * @param weight 实物重kg
 * @param quantity 调拨数量
 * @param forSubmit 是否用于提交（true时返回0，false时返回'-'）
 * @returns 总体积重，保留2位小数
 */
export const calculateTotalVolumeWeight = (
  weight: number | null | undefined,
  quantity: number | null | undefined,
  forSubmit = false
): string | number => {
  // 边界处理：如果任一参数无效，返回 '-' 或 0
  const validWeight = Number(weight) || 0;
  const validQuantity = Number(quantity) || 0;
  if (validWeight === 0 || validQuantity === 0) {
    return forSubmit ? 0 : '-';
  }

  const total = validWeight * validQuantity;
  return forSubmit ? Number(total.toFixed(4)) : `${total.toFixed(4)}`;
};

/**
 * 计算总体积重
 * @param weight 实物重kg
 * @param quantity 调拨数量
 * @param forSubmit 是否用于提交（true时返回0，false时返回'-'）
 * @returns 总体积重，保留2位小数
 */
export const calculateTotalVolumeWeightByCoefficient = (
  weight: number | null | undefined | string,
  quantity: number | null | undefined,
  volumeWeightCoefficient = 1
): string | number => {
  console.log(`weight`, weight);
  // 边界处理：如果任一参数无效，返回 '-' 或 0
  const validWeight = Number(weight) || 0;
  const validQuantity = Number(quantity) || 0;
  const coefficient = volumeWeightCoefficient;
  // 单个产品的体积重 = 实物重 / 体积系数
  const singleVolumeWeight = validWeight / coefficient;
  const totalVolumeWeight = singleVolumeWeight * validQuantity;
  return Number(totalVolumeWeight.toFixed(4));
};
