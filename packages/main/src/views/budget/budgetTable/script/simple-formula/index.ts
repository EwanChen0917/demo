import formulajs from 'formulajs';
import { isLocalhost } from '@/views/budget/budgetTable/script/variable';
import { RecordItem } from '@/views/budget/budgetTable/script/batchUpdate';
import { BatchUpdateTypes } from '@/views/budget/budgetTable/types/type';
import debounce from 'lodash-es/debounce';
import { getValueOrDefaultValue } from '@/views/budget/budgetTable/script/budgetTable';
import { compilerFormula } from './compiler';
import { sleep } from './utils';

export function createSimpleFormula(config, funcs) {
  const { getDataMap, countRows, getDefault, getStatisticsRows } = funcs;

  const { columns, formulaFieldList, calcStartRow, calcCtx, statistics } = config;
  formulaFieldList.forEach((item) => {
    compilerFormula(columns, item.depMap, item.field, item.isValue, item);
  });
  // console.log("formulaFieldList=", formulaFieldList)
  const getFieldConfig = (prop) => {
    return formulaFieldList.find((x) => x.field === prop);
  };

  // console.log('columns=', columns);
  let isCalcSuspend = false;
  const suspendChanges = [];

  const triggerOnChanges = (changes, valueMap) => {
    if (!changes) {
      return;
    }
    changes = changes.filter((x) => x[0] >= calcStartRow && x[2] !== x[3]);
    if (!changes.length) {
      return;
    }
    if (isCalcSuspend) {
      suspendChanges.push(changes);
      return;
    }
    calcByChange(changes, valueMap);
  };

  Object.entries(formulajs).forEach(([name, func]) => {
    calcCtx[`_${name.toUpperCase()}`] = func;
  });

  const calcByChange = (changes, valueMap) => {
    // 计算 value , mustFill 和 canEdit
    const rowResultMap = {};

    for (const item of formulaFieldList) {
      if (!item.isTrackChange) {
        continue;
      }
      const { depMap } = item;
      const { levelField } = item;
      const needCalcMap = {};
      changes.forEach((change) => {
        const [row, prop] = change;
        const cols = depMap[prop];
        if (cols && cols.length) {
          needCalcMap[row] = needCalcMap[row] || [];
          needCalcMap[row].push(...cols);
        }
      });
      for (const row in needCalcMap) {
        let cols = needCalcMap[row];
        cols = [...new Set(cols)];
        cols.sort((a, b) => {
          return b[levelField] - a[levelField];
        });
        if (item.isValue) {
          rowResultMap[row] = calc(row, cols, valueMap?.[row] || {}, item, true, null);
        } else {
          calc(row, cols, rowResultMap[row] || valueMap?.[row], item || {}, false, null);
        }
      }
    }

    calcStatistics();
  };

  const calc = (row, cols, valueMap, formulaField, isValue, args) => {
    const { funcField, depsField, afterCalc, extendArgsNames } = formulaField;
    const datamap = getDataMap()[row] || {};
    const resultArr: RecordItem[] = [];

    if (extendArgsNames.length) {
      // console.log('extendArgsNames=', extendArgsNames.length);
      if (!args) {
        args = new Array(extendArgsNames.length).fill(null);
      } else if (args.length < extendArgsNames.length) {
        args = [...args, ...new Array(extendArgsNames.length - args.length).fill(null)];
      } else if (args.length > extendArgsNames.length) {
        args = args.slice(0, extendArgsNames.length);
      }
    }

    if (!args) {
      args = [];
    }

    cols.forEach((col) => {
      const func = col[funcField];
      const values = col[depsField].map((prop) => {
        if (valueMap?.[prop] !== undefined) {
          return valueMap[prop] ?? '';
        }
        return datamap[prop] ?? '';
      });
      let result;
      try {
        result = func.call(calcCtx, row, ...args, ...values);
        if (
          result === undefined ||
          Number.isNaN(result) ||
          result?.startsWith?.('Error') ||
          result === Infinity ||
          result === -Infinity
        ) {
          result = getDefault(row, col);
        }
      } catch (e) {
        result = getDefault(row, col);
      }
      // 如果是这个标识符，说明需要忽略公式的执行结果
      if (result === '#execute!') {
        return;
      }
      // 用于消除浮点数精度问题
      if (typeof result === 'number') {
        result = +result.toFixed(7);
      }
      if (isValue) {
        valueMap[col.cellFieldName] = result;
      }
      resultArr.push([row, col.cellFieldName, result]);
    });
    afterCalc(resultArr);
    return valueMap;
  };

  const fullCalcItem = (item, rowResultMap, startRow, endRow) => {
    if (!item) {
      return;
    }
    if (!startRow) startRow = calcStartRow;
    if (!endRow) endRow = countRows();

    const { levelField } = item;
    const { funcField } = item;

    const cols = columns.filter((col) => col[funcField]);

    cols.sort((a, b) => {
      return b[levelField] - a[levelField];
    });

    for (let row = startRow; row < endRow; row++) {
      if (item.isValue) {
        rowResultMap[row] = calc(row, cols, {}, item, true, null);
      } else {
        calc(row, cols, rowResultMap[row] || {}, item, false, null);
      }
    }
  };

  const runFormula = (row, col, item, args) => {
    const valueMap = calc(row, [col], {}, item, true, args);
    return valueMap[col.cellFieldName];
  };

  const calcStatistics = debounce(() => {
    if (!statistics) {
      return;
    }
    const statisticsCols = columns.filter((col) => col[statistics.methodFieldName]);
    const datamata = getDataMap();

    const resultArr: RecordItem[] = [];

    const { statisticsRowIndex } = statistics;

    let rows = getStatisticsRows();
    if (!Array.isArray(rows)) {
      const start = statistics.startRowIndex;
      const end = countRows();
      rows = Array.from({ length: end - start + 1 }, (_, i) => i + start);
    } else {
      rows = rows.filter((x) => x >= statistics.startRowIndex);
    }

    statisticsCols.forEach((col) => {
      const method = col[statistics.methodFieldName];
      if (typeof method === 'string') {
        if (method.toUpperCase() === 'SUM') {
          let sum = 0;
          for (const row of rows) {
            const value = datamata[row]?.[col.cellFieldName];
            sum += +value || 0;
          }
          resultArr.push([statisticsRowIndex, col.cellFieldName, sum]);
        }
      }
    });

    if (resultArr.length) {
      statistics.afterCalc(resultArr);
    }
  }, 1000);

  // 计算单个单元格
  const calcTableAll = (startRow, endRow) => {
    console.time('calcTable');
    const rowResultMap = calcTableCells(startRow, endRow);
    calcStatistics();
    console.timeEnd('calcTable');
  };

  // 整表计算
  const calcTableCells = (startRow, endRow) => {
    isLocalhost && console.log('### calcTableCells');
    // 计算 value 和 canEdit
    const tableResultMap = {};
    for (const item of formulaFieldList.filter(
      (x) => x.field === 'cellFieldFormula' || x.field === 'canEdit'
    )) {
      const rowResultMap = {};
      fullCalcItem(item, rowResultMap, startRow, endRow);
      tableResultMap[item.field] = rowResultMap;
    }
    return tableResultMap;
  };
  // 整表空值计算
  const calcTableEmptyCells = async (startRow, endRow, colFilter, rowCb) => {
    isLocalhost && console.log('### calcTableEmptyCells');
    const cols = columns.filter((col) => col.cellFieldFormula_func);
    cols.sort((a, b) => {
      return b.cellFieldFormula_level - a.cellFieldFormula_level;
    });
    if (!startRow) startRow = calcStartRow;
    if (!endRow) endRow = countRows();

    // 计算空值
    const rowResultMap = {};
    const tableDataMap = getDataMap();
    const fieldItem = getFieldConfig('cellFieldFormula');

    console.time('timeof calcTableEmptyCells');
    for (let row = startRow; row < endRow; row++) {
      const needCalcCols = cols.filter((col) => {
        if (colFilter) {
          const value = tableDataMap[row]?.[col.cellFieldName];
          return colFilter(row, col, value);
        }

        // 1. 只读列刷新
        if (col.canEdit === '0' || col.canEdit === 0) {
          return true;
        }

        // 2. 隐藏列刷新
        if (col.canView === '0' || col.canView === 0) {
          return true;
        }

        // 3. 空值刷新
        const value = tableDataMap[row]?.[col.cellFieldName];
        if (value === null || value === undefined || value === '' || value === 0 || value === '0') {
          return true;
        }
        return false;
      });
      // console.log(row);

      // if (row % 300 === 0) {
      //   console.log('row=', row, needCalcCols.length);
      // }
      rowResultMap[row] = calc(row, needCalcCols, {}, fieldItem, true, null);
      // console.log('rowResultMap[row]=', row, rowResultMap[row]);
      if (rowCb) {
        await rowCb?.(row, rowResultMap[row]);
      }
    }
    console.timeEnd('timeof calcTableEmptyCells');
    // await sleep(10);
    // 虽然 只计算空值，但是 canEdit 需要全表计算
    fullCalcItem(getFieldConfig('canEdit'), rowResultMap);

    // await sleep(10);
    calcStatistics();
  };

  const calcTableDefaultValue = () => {
    const defaultValueField = getFieldConfig('defaultValue');
    const startRow = calcStartRow;
    const endRow = countRows();
    const needCalcCols = columns.filter((col) => col.defaultValue_func);
    const datamap = getDataMap();
    for (let row = startRow; row < endRow; row++) {
      const needCalcCurrentCols = needCalcCols.filter((col) => {
        const value = datamap[row]?.[col.cellFieldName];
        if (value === null || value === undefined || value === '') {
          return true;
        }
      });
      calc(row, needCalcCurrentCols, {}, defaultValueField, true, null);
    }
  };

  // 计算统计信息
  const calcTableStatistics = () => {
    calcStatistics();
  };
  // 暂停计算
  const suspendCalcByChanges = () => {
    isCalcSuspend = true;
  };
  // 恢复计算
  const resumeCalcByChanges = () => {
    isCalcSuspend = false;
    const changes = suspendChanges.flat(1);
    if (changes.length) {
      calcByChange(changes);
      suspendChanges.length = 0;
    }
  };
  // 获取暂停计算状态
  const isCalcSuspendStatus = () => {
    return isCalcSuspend;
  };
  // 依赖
  const getDepsLines = (tagName, fieldProp) => {
    const tagColMap = {};
    for (const col of columns) {
      tagColMap[col.cellTag] = col;
    }
    const col = tagColMap[tagName];
    if (!col) {
      return { lines: [] };
    }
    const lines = [];
    const buildLineByNode = (col, line) => {
      const tags = col[`${fieldProp}_tags`];
      if (!tags?.length) {
        return;
      }
      for (const tag of tags) {
        const tagCol = tagColMap[tag];
        const currentLine = [...line];
        currentLine.push(tagCol);
        lines.push(currentLine);
        buildLineByNode(tagCol, currentLine);
      }
    };
    buildLineByNode(col, [col]);

    // console.log('lines=', lines);
    return { lines };
  };

  const simpleFormula = {
    triggerOnChanges,
    formulaFieldList,
    getFieldConfig,
    runFormula,
    calcTableAll,
    calcTableCells,
    calcTableEmptyCells,
    calcTableDefaultValue,
    calcTableStatistics,
    suspendCalcByChanges,
    resumeCalcByChanges,
    isCalcSuspendStatus,
    getDepsLines,
    ...funcs,
  };

  calcCtx.simpleFormula = simpleFormula;
  columns.forEach((col) => {
    col.simpleFormula = simpleFormula;
  });

  return simpleFormula;
}

export function useSimpleFormula(hot, config) {
  const simpleFormula = createSimpleFormula(config, {
    countRows: () => (hot.isDestroyed ? 0 : hot.countRows()),
    getDataMap: () => (hot.isDestroyed ? [] : hot.getDataMap()),
    getDefault: (row, col) => getValueOrDefaultValue(simpleFormula, col, row, null),
    getStatisticsRows: () => hot.rowIndexMapper?.renderablePhysicalIndexesCache,
  });

  hot.simpleFormula = simpleFormula;

  hot.addHook('afterChange', function (changes, source) {
    // console.log('### changes=', source, changes);
    // isLocalhost && console.log('### changes', changes);
    // console.trace("changes");

    if (source === 'MergeCells') {
      return;
    }
    if (source === 'formula') {
      return;
    }
    if (changes?.length) {
      changes = changes.map((x) => {
        const physicalRow = hot.toPhysicalRow(x[0]);
        return [physicalRow, x[1], x[2], x[3]];
      });
      simpleFormula.triggerOnChanges(changes, null);
    }
  });

  return hot.simpleFormula;
}
