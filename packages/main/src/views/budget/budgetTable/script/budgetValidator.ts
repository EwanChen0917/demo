// value === null || value === undefined || value === '' || value?.trim() === '';

import { debounce } from 'lodash-es';
import { debounceRender } from '@/views/budget/budgetTable/script/batchUpdate';
import {
  BudgetCode,
  BudgetStoreItem,
  CellType,
  TableColumn,
  TableRow,
} from '@/views/budget/budgetTable/types/type';
import { useBudgetStore } from '@/views/budget/budgetTable/script/budgetStore';

/**
 * 是否空值
 */
export function isEmpty(value: any): boolean {
  return value === null || value === undefined || value === '' || value?.trim?.() === '';
}

/**
 * 严格校验是否为数字（不进行类型转换）
 */
export function isNumber(value: any): boolean {
  if (isEmpty(value)) {
    return false;
  }
  if (typeof value === 'string') {
    value = value.toLowerCase();
    // 不要科学计数法、其他进制数
    if (value.includes('e') || value.includes('x') || value.includes('o') || value.includes('b')) {
      return false;
    }
    value = Number(value);
  }
  if (typeof value === 'number') {
    return !isNaN(value) && isFinite(value);
  }
  return false;
}

/**
 * 严格校验是否为整数（不进行类型转换）
 */
export function isInteger(value: string | number): boolean {
  if (!isNumber(value)) {
    return false;
  }
  return Number.isInteger(+value);
}

/**
 * 0-100的百分比数值
 */
export function isPercentage(value: string | number): boolean {
  return isNumber(value) && +value >= 0 && +value <= 100;
}

const typeValidators = {
  [CellType.Number](value: any, column: TableColumn, row, instance): string | undefined {
    if (!isNumber(value)) {
      return '输入非数字';
    }
    return '';
  },
  [CellType.Percentage](value: any, column: TableColumn, row, instance): string | undefined {
    if (!isNumber(value)) {
      return '输入非数字';
    }
    return '';
  },
  [CellType.Select](value: any, column: TableColumn, row, instance): string | undefined {
    const { cellDropDownList } = column;
    if (value === '' || value === null || value === undefined) {
      return;
    }
    value = value.toString().replace(/\s+/g, ' ');
    if (!cellDropDownList?.includes?.(value)) {
      // 尝试进行忽略大小写匹配
      if (typeof value === 'string' && typeof cellDropDownList?.[0] === 'string') {
        value = value.toLowerCase();
        for (const item of cellDropDownList) {
          if (item.toLowerCase().includes(value)) {
            return;
          }
        }
      }
      return '输入值不在可选列表中';
    }
  },
  [CellType.SelectCascade](value: any, column: TableColumn, row, instance): string | undefined {
    const { cellDropDownList, cellCascadeDownList, parentColumn } = column;
    if (value === '' || value === null || value === undefined) {
      return;
    }
    value = value.toString().replace(/\s+/g, ' ');
    let list;
    if (parentColumn) {
      const parentValue = instance.getDataAtRowProp(row, parentColumn.cellFieldName);
      list = cellCascadeDownList?.[parentValue] || [];
    } else {
      // root 节点
      list = cellDropDownList;
    }
    if (!list?.includes?.(value)) {
      // 尝试进行忽略大小写匹配
      if (typeof value === 'string' && typeof list?.[0] === 'string') {
        value = value.toLowerCase();
        for (const item of list) {
          if (item.toLowerCase().includes(value)) {
            return;
          }
        }
      }
      return '输入值不在可选列表中';
    }
  },
};

const customRuleValidator = (
  value: any,
  column: TableColumn,
  row,
  instance
): string | undefined => {
  const { cellValidationRule, cellValidationMessage } = column;
  if (!cellValidationRule) {
    return;
  }
  // 值校验
  const paramNames = ['value'];
  const paramValues = [value];
  try {
    // console.log("paramNames=", paramNames, paramValues, cellValidationRule);
    const func = new Function(...paramNames, `return (${cellValidationRule});`);
    const result = func.call(null, ...paramValues);
    return result ? undefined : cellValidationMessage || '数据校验失败';
  } catch (e) {
    console.log('e=', e);
    return '数据校验失败';
  }
};

export const errorNames = [
  '#CYCLE!',
  '#DIV/0!',
  '#ERROR!',
  '#N/A',
  '#NAME?',
  '#NUM!',
  '#REF!',
  '#SPILL!',
  '#VALUE!',
];

export function useColumnValidation(
  columns: TableColumn[],
  config: any,
  budgetStore: BudgetStoreItem
) {
  columns.forEach((column) => {
    const { cellType, cellValidationRule, canView } = column;
    const funcs = [];
    const typeFunc = typeValidators[cellType];
    if (typeFunc) {
      funcs.push(typeFunc);
    }
    if (cellValidationRule) {
      funcs.push(customRuleValidator);
    }
    const configColumn = config.columns.find((c) => c.data === column.cellFieldName);
    const { dataStartRowIndex } = budgetStore.tableData;
    if (funcs.length > 0) {
      const validateFunc = function (value, cb) {
        if (!+column.canView || column.isExtendColumn || this.row < dataStartRowIndex) {
          cb && cb(true);
          return;
        }
        let errMsg;

        const instance = budgetStore.getHotInstance();
        // EXCEL 公式错误类型 也算是通过校验的数据
        if (value !== undefined && value !== null && value !== '' && !errorNames.includes(value)) {
          for (const func of funcs) {
            const msg = func(value, column, this.row, instance);
            if (msg) {
              errMsg = msg;
              break;
            }
          }
        }
        cb && cb(!errMsg);
        const rowCode = instance.getSourceDataAtCell(this.row, '__code');
        // console.log("rowCode=", rowCode, this.prop, errMsg, column);
        budgetStore.setValidateMessage(rowCode, this.prop, value, errMsg);
        budgetStore.debounceRender();
        return errMsg;
      };
      configColumn.validator = validateFunc;
      column.validatorFunc = validateFunc;
    }
  });
}

export function validateTable(rows: TableRow[], columns: TableColumn[]) {
  for (const column of columns) {
    if (column.validatorFunc) {
      for (const row of rows) {
        const value = row[column.cellFieldName];
        const message = column.validatorFunc.call(
          { row: row.__rowIndex, prop: column.cellFieldName },
          value,
          null
        );
        if (message) {
          return {
            code: row.__code,
            col: column.cellFieldName,
            rowIndex: row.__rowIndex,
            message: `第${row.__rowIndex + 1}行${column.__visualTag}列的【${
              column.cellCnName
            }】${message}`,
          };
        }
      }
    }
  }
}

export function validateCells(
  code: BudgetCode,
  cells: Array<{ row: number; prop: string; value: any }>
) {
  const budgetStore = useBudgetStore(code);
  cells.forEach((cell) => {
    const { row, prop, value } = cell;
    const column = budgetStore.getColumn(prop);
    if (column && column.validatorFunc) {
      column.validatorFunc.call({ row, prop }, value, null);
    }
  });
}

export function validateRows(code: BudgetCode, rows: number[]) {
  const budgetStore = useBudgetStore(code);
  let { columns } = budgetStore.tableData;
  columns = columns.filter((c) => c.canView && c.validatorFunc);
  const datamap = budgetStore.getHotInstance().getDataMap();

  rows.forEach((row) => {
    columns.forEach((column) => {
      const { cellFieldName: prop } = column;
      const value = datamap?.[row]?.[prop];
      column.validatorFunc.call({ row, prop }, value, null);
    });
  });

  // cells.forEach((cell) => {
  //   const { row, prop, value } = cell;
  //   const column = budgetStore.getColumn(prop);
  //   if (column && column.validatorFunc) {
  //     column.validatorFunc.call({ row, prop }, value, null);
  //   }
  // });
}

export function validateRequireCell(
  tableCode: BudgetCode,
  rows: TableRow[],
  columns: TableColumn[]
) {
  const instance = useBudgetStore(tableCode).getHotInstance();
  const { simpleFormula } = instance;
  const mustFillFieldItem = simpleFormula.getFieldConfig('mustFill');
  for (const col of columns) {
    const { mustFill, canView, isExtendColumn } = col;
    if (isExtendColumn || !+canView) {
      continue;
    }
    if (col.mustFill_func) {
      // console.log('mustFillReal=', mustFillReal);
      for (const row of rows) {
        const value = row[col.cellFieldName];
        const rowIndex = row.__rowIndex;
        if (
          value === null ||
          value === undefined ||
          value === '' ||
          (typeof value === 'string' && value.trim() === '')
        ) {
          const isMustFill = simpleFormula.runFormula(rowIndex, col, mustFillFieldItem,null);
          if (isMustFill === 1 || isMustFill === '1') {
            return {
              code: row.__code,
              col: col.cellFieldName,
              rowIndex,
              message: `第${rowIndex + 1}行${col.__visualTag}列的【${col.cellCnName}】不能为空`,
            };
          }
        }
      }
    } else if (+mustFill === 1) {
      for (const row of rows) {
        const value = row[col.cellFieldName];
        if (
          value === null ||
          value === undefined ||
          value === '' ||
          (typeof value === 'string' && value.trim() === '')
        ) {
          return {
            code: row.__code,
            col: col.cellFieldName,
            rowIndex: row.__rowIndex,
            message: `第${row.__rowIndex + 1}行${col.__visualTag}列的【${col.cellCnName}】不能为空`,
          };
        }
      }
    }
  }
  return null;
}
