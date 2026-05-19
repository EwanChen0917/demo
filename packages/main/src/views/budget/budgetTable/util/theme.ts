// Wps 表格主题色
export const wpsThemeColor = toColorObject([
  '#FFFFFF',
  '#000000',
  '#E7E6E6',
  '#44546A',
  '#4874CB',
  '#EE822F',
  '#F2BA02',
  '#75BD42',
  '#30C0B4',
  '#E54C5E',
]);

//  office 表格主题色
export const officeThemeColor = toColorObject([
  '#FFFFFF',
  '#000000',
  '#E7E6E6',
  '#44546A',
  '#4472C4',
  '#ED7D31',
  '#A5A5A5',
  '#FFC000',
  '#5B9BD5',
  '#70AD47',
]);

/*
 * 将16进制颜色列表转换为对象列表
 * @param {Array<string>} list 16进制颜色列表
 */
function toColorObject(list: string[]) {
  return list.map((color) => {
    return {
      color,
      r: parseInt(color.slice(1, 3), 16),
      g: parseInt(color.slice(3, 5), 16),
      b: parseInt(color.slice(5, 7), 16),
    };
  });
}
