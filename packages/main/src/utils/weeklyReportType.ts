// 不同的功能模块定义不同的枚举.
// - 新增枚举值前与后端同事确认，枚举是否已存在
export enum WeeklyReportType {
  DefaultType = 0,
  MpcWeeklyReport = 1,
  AmazonDaySummarizeReport = 2,
  AmazonDayReport = 3,
  GtmReport = 4,
  AmazonTaskReport = 5,
  GoalReport = 7,
}
