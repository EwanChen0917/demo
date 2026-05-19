// 从响应体中提取结果的工具类型
// 有的方法返回的不再是result，而是result外层，可以使用该方法提取出result的类型
export type ExtractResult<T> = T extends { result?: infer R } ? NonNullable<R> : never;
// 从响应体中提取 recordList 中单个记录的类型
export type ExtractRecordListItem<T> = T extends { recordList?: (infer R)[] }
  ? NonNullable<R>
  : never;
