export enum fileType {
  主数据分摊前 = '1',
  主数据分摊后 = '0',
  业务字典 = '4',
  取文件位數截取 = '11',
  取文件字符截取 = '12',
  取占比额 = '13',
}

export enum sharedBoundaryType {
  分摊后 = 'after',
  分摊前 = 'before',
}
//用于匹配本地存储的 汇总表字段取值配置list
export enum codeMainType {
  汇总表 = 'masterAllData',
  汇总表名 = '汇总表字段取值配置',
}
export enum logicType {
  或者 = 'OR',
  并且 = 'AND',
}

export const logicTypeMap = {
  [logicType.并且]: '并且',
  [logicType.或者]: '或者',
};

export enum setValueType {
  未知 = -1,
  取文件 = 1, // 取数据
  取业务字典 = 2,
  固定值 = 3,
  计算 = 4,
  币别 = 5,
  取文件_字段名 = 10,
  取文件_字段名位数截取 = 11,
  文件字段名字符截断 = 12,
  取占比额 = 13,
  文本 = 6,
}
