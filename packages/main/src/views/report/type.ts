export interface ReportTypeMap {
  WEEKLY_ANALYSIS: 1; // 经营分析周报
  VOC: 2; // VOC周报
  AMAZON: 3; // 亚马逊运营周报
}
export type ReportType = ReportTypeMap[keyof ReportTypeMap];
