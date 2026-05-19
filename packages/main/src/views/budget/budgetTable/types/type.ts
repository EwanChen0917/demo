// 办公软件类型枚举
import {
  PresentationFillQueryDetailResp,
  SchemeTemplateDetailColumnBean,
} from '@/api/budget/data-contracts';
import { ComputedRef, Ref } from 'vue';
import {
  BudgetGroup,
  BudgetRole,
  BudgetSource,
  DraftStatusNo,
  NowStepCode,
} from '@/views/budget/enums/enums';
import dayjs from "dayjs";

export enum OfficeType {
  Office,
  Wps,
}

// 单元格类型枚举
export enum CellType {
  Number = 1, // 数字
  Text, // 文本
  Select, // 下拉单选框
  MultipleSelect, // 下拉多选框
  AutoComplete, // 可自定义的下拉框单选框
  Percentage, // 百分比
  SelectCascade, // 下拉级联框
  AutoCompleteCascade, // 可自定义的下拉级联框
}

export enum ImportType {
  None = 0,
  Cover = 1,
  Append = 2,
  Update = 3,
}

export type BudgetCode = string;

export type TableDetail = SchemeTemplateDetailColumnBean;

// 列
export type TableColumn = SchemeTemplateDetailColumnBean & {
  cellDropDownList: string[];
  cellCascadeDownList: Record<string, string[]>;
  childrenColumns: TableColumn | null;
  parentColumn: TableColumn | null;
  __formulaTag: string;
  __formulaIndex: number;
  __tableTag: string;
  __visualTag: string;
  __visualIndex: number;
  columnShowTag: string;
  columnShowIndex: number;
  isExtendColumn: boolean;
  isFixedColumn: boolean;
};

// 行
export type TableRow = {
  __code: string;
  __rowIndex?: number;
  __isOriginRow?: string;
  __updator: string;
  [key: string]: any;
};

// 数据
export type TableData = {
  tableHeader: string;
  importMeta: ImportMeta;
  dataStartRowIndex: number;
  headerRowCount: number;
  statisticsRowIndex: number;
  canAddLine: boolean;
  originalColumns: TableColumn[];
  columns: TableColumn[];
  columnMap: Record<string, TableColumn>;
  columnEnumsListMap: Record<string, string[]>;
  columnEnumsDetailMap: Record<string, Record<string, any>>;
  rows: TableRow[];
};

export type TableLoadingActionItem = {
  label: string;
  cb: () => void;
};

export type EditChangeItem = {
  newValue: any;
  oldValue: any;
  prop: string;
  row: number;
};

export type ValidateMessageItem = {
  rowCode: string;
  prop: string;
  message: string;
  value: any;
};

export enum UserActionNames {
  None = 0,
  OnPaste = 1,
  OnSave = 2,
}

export enum SaveTypes {
  Auto = 0,
  Json = 1,
  OssFile = 2,
}

export type ImportMeta = {
  importTime: string;
  importUser: string;
  fileName: string;
  recordCount: number;
  importType: ImportType;
  ossKey: string;
}

export type BudgetStoreItem = {
  code: BudgetCode;
  tableData: TableData;
  detail: PresentationFillQueryDetailResp;
  tableLoadingMessageIcon: Ref<boolean>;
  tableLoadingMessage: Ref<string>;
  tableLoadingActions: Ref<TableLoadingActionItem[]>;
  tableLoadingMessageStyle: Ref<string | Record<string, any>>;
  setTableLoading: (
    message: string,
    showIcon: boolean,
    actions?: TableLoadingActionItem[],
    textStyle?: string | Record<string, any>
  ) => void;
  clearTableLoading: (delay?: number) => void;
  setTableRef: (el: any) => void;
  getHotInstance: () => any;
  destroyHotInstance: () => void;
  debounceRender: () => void;
  getSelectedLast: () => [number, number, number, number];
  editChanges: Ref<any[]>;
  hasChanges: ComputedRef<boolean>;
  addChanges: (changes: EditChangeItem[]) => void;
  clearChanges: () => void;
  deleteChanges: (rowCode: string) => void;
  importMeta: Ref<ImportMeta | null>;
  setImportState: (importMeta: ImportMeta) => void;
  needSave: ComputedRef<boolean>;
  save: (code: BudgetCode, saveType?: SaveTypes, isAutoSave?: boolean) => Promise<void>;
  getEnumValue: (colName: string, cellValue: string) => any;
  getColumn: (indexOrProp: number | string) => TableColumn | undefined;
  validateMessages: Ref<ValidateMessageItem[]>;
  setValidateMessage: (rowCode: string, prop: string, value: any, message: string) => void;
  getValidateMessage: (rowCode: string, prop: string) => any;
  clearValidateMessages: () => void;
  deleteCellsValidateMessage: (cells: Array<{ rowCode: string; prop: string }>) => void;
  deleteRowValidateMessage: (rowCode: string) => void;
  userAction: { name: UserActionNames; callback: (() => void) | null };
  setUserActionName: (name: UserActionNames, callback?: () => void) => void;
  clearUserActionName: () => void;
  undoLength: Ref<number>;
  redoLength: Ref<number>;
  updateUndoAvailable: (undo: number) => void;
  updateRedoAvailable: (redo: number) => void;
};

export type UrlQueryParams = {
  code: BudgetCode; // 预算表编码
  schemeCode: string; // 预算方案编码
  planYear: number;
  nowStepCode: NowStepCode; // 当前阶段编码，第几稿
  fromStepCode: NowStepCode;
  status: DraftStatusNo;
  source: BudgetSource;
  budgetGroup: BudgetGroup;
  budgetRole: BudgetRole;
};

export enum BatchUpdateTypes {
  BATCH_UPDATE_NONE = 0,
  BATCH_UPDATE_VALUE,
  BATCH_UPDATE_CAN_EDIT,
}

export type TableConfig = {
  [key: string]: any;
};
