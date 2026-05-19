import { debounce } from 'lodash-es';
import { copyFn } from '@/utils/copyFn';
import * as swal from '@/utils/swal';
import { uuid } from '@/utils/aesTils';
import Decimal from 'decimal.js';

import {
  OfficeType,
  CellType,
  TableData,
  TableColumn,
  BudgetCode,
  TableDetail,
  BudgetStoreItem,
  TableConfig,
  TableRow,
  UserActionNames,
  BatchUpdateTypes,
} from '@/views/budget/budgetTable/types/type';
import { initFilter } from '@/views/budget/budgetTable/script/budgetEvent';
import { validateRows } from '@/views/budget/budgetTable/script/budgetValidator';
import { addBatchRenderDataList, RecordItem } from '@/views/budget/budgetTable/script/batchUpdate';
import { runQueryBudgetApi } from '@/views/budget/budgetTable/script/budgetApiMap';
import { useStore } from '@/store/modules/useStore';
import {
  isRenderUpdator,
  isRenderCodeColumn,
  RENDER_OFFSET_X,
  COLUMN_FIXED_LEFT,
  isDevOrTestRole,
  isWebDev,
  isShowHeaderFormula,
  isEditAllColumns,
} from './variable';
import { useBudgetStore } from './budgetStore';
import { applyTint, sleep } from '../util/util';
import { officeThemeColor, wpsThemeColor } from '../util/theme';

const store = useStore();

const HANDSON_TABLE_LICENSE_KEY = 'non-commercial-and-evaluation';
const ROW_HEIGHT = 30;

const isShowHiddenColumns = !!+localStorage.getItem('isShowHiddenColumns');
export const isShowColMapHeaderTag = !!+localStorage.getItem('isShowColMapHeaderTag');
export const isShowExtendFormulaColumn = !!+localStorage.getItem('isShowExtendFormulaColumn');

/**
 * 监听窗口大小变化
 * @param cb 回调
 */

export function getHeight() {
  const mainBox = document.querySelector('.el-main');
  return mainBox?.clientHeight;
}

export function useWindowResized(cb: (height: number) => void) {
  let lastheight = 0;
  const onResized = () => {
    const mainBox = document.querySelector('.el-main');
    if (mainBox && lastheight !== mainBox.clientHeight) {
      lastheight = mainBox.clientHeight;
      cb(mainBox.clientHeight);
    }
  };
  onResized();

  const onResizedDebounce = debounce(onResized, 1000);

  onMounted(() => {
    onResized();
    window.addEventListener('resize', onResizedDebounce);
  });
  onUnmounted(() => {
    window.removeEventListener('resize', onResizedDebounce);
  });
}

/**
 * 从工作表中构建表格数据
 * @param worksheet 工作表
 * @param tableData 表格数据
 * @returns 表格数据
 */
export function buildExcelSheetData(worksheet: any, tableData: TableData) {
  const { columns } = tableData;
  const columnCount = columns.length;
  const columnIndexMap = [];
  columns.forEach((column) => {
    if (column.__formulaIndex >= 0 && column.__visualIndex >= 0) {
      columnIndexMap[column.__formulaIndex + COLUMN_FIXED_LEFT] =
        column.__visualIndex + COLUMN_FIXED_LEFT;
    }
  });
  // console.log('columnIndexMap=', columnIndexMap);

  const rowCount = tableData.headerRowCount;

  const buildCellsValue = () => {
    let rows = [];
    worksheet.eachRow({ includeEmpty: true }, (row, rowIndex) => {
      if (rowIndex - 1 >= rowCount) {
        return;
      }
      const rowData = [];
      if (isRenderUpdator) {
        rowData.push('');
      }
      if (isRenderCodeColumn) {
        rowData.push('');
      }
      row.eachCell({ includeEmpty: true }, (cell, colIndex) => {
        if (colIndex - 1 > columnCount) {
          return;
        }
        rowData.push(cell.value);
      });
      rows.push(rowData);
    });
    // console.log('excel rows=', rows);

    // 值映射
    rows = rows.map((row) => {
      const newRow = [...row];
      row.forEach((cell, colIndex) => {
        const newIndex = columnIndexMap[colIndex];
        if (newIndex >= 0) {
          newRow[newIndex] = cell;
        }
      });
      return newRow;
    });
    // console.log('rows=', rows);
    return rows;
  };
  const buildCellsStyle = () => {
    const mainThemeColors =
      worksheet.themeType === OfficeType.Wps ? wpsThemeColor : officeThemeColor;
    const getOneCellStyle = (cell) => {
      const style = {};
      if (cell.font) {
        // 字体颜色
        if (cell.font.color) {
          // ARGB 格式
          if (cell.font.color.argb) {
            style.color = `#${cell.font.color.argb.slice(2)}`;
          }
          // 主题颜色
          else if (cell.font.color.theme !== undefined) {
            const colorObj = mainThemeColors[cell.font.color.theme];
            if (colorObj) {
              if (cell.font.color.tint) {
                style.color = applyTint(colorObj.r, colorObj.g, colorObj.b, cell.font.color.tint);
              } else {
                style.color = colorObj.color || '';
              }
            }
          }
        }

        // 字体粗细
        if (cell.font.bold) {
          style.fontWeight = 'bold';
        }

        // 字体大小
        if (cell.font.size) {
          style.fontSize = `${cell.font.size}pt`;
        }

        // 字体名称
        if (cell.font.name) {
          style.fontFamily = cell.font.name;
        }
      }

      if (cell.fill) {
        // 背景颜色
        if (cell.fill.fgColor && cell.fill.fgColor) {
          if (cell.fill.fgColor.argb) {
            style.backgroundColor = `#${cell.fill.fgColor.argb.slice(2)}`;
          } else if (cell.fill.fgColor.theme !== undefined) {
            const colorObj = mainThemeColors[cell.fill.fgColor.theme];
            if (colorObj) {
              if (cell.fill.fgColor.tint) {
                style.backgroundColor = applyTint(
                  colorObj.r,
                  colorObj.g,
                  colorObj.b,
                  cell.fill.fgColor.tint
                );
              } else {
                style.backgroundColor = colorObj.color || '';
              }
            }
          }
        }
      }

      if (cell.alignment) {
        // 水平对齐
        if (cell.alignment.horizontal) {
          style.textAlign = cell.alignment.horizontal;
        }

        // 垂直对齐
        if (cell.alignment.vertical) {
          style.verticalAlign = cell.alignment.vertical;
        }
      }

      if (isDevOrTestRole) {
        style.value = cell.value;
      }

      return style;
    };
    const hotStyles = [];
    worksheet.eachRow({ includeEmpty: true }, (row, rowIndex) => {
      if (rowIndex - 1 >= rowCount) {
        return;
      }
      hotStyles[rowIndex - 1] = [];
      if (isRenderUpdator) {
        hotStyles[rowIndex - 1].push({});
      }
      if (isRenderCodeColumn) {
        hotStyles[rowIndex - 1].push({});
      }
      row.eachCell({ includeEmpty: true }, (cell, colIndex) => {
        if (colIndex - 1 > columnCount) {
          return;
        }
        // 只为有样式信息的单元格创建样式对象
        if (cell.font || cell.fill || cell.alignment) {
          if (!hotStyles[rowIndex - 1]) {
            hotStyles[rowIndex - 1] = [];
          }
          // 样式映射
          const realColIndex = columnIndexMap[colIndex - 1 + RENDER_OFFSET_X];
          hotStyles[rowIndex - 1][realColIndex] = getOneCellStyle(cell);
        }
      });
    });

    // console.log('hotStyles=', hotStyles);

    return hotStyles;
  };
  const buildColumnWidths = () => {
    const widths = [];
    if (isRenderUpdator) {
      widths.push(120);
    }
    if (isRenderCodeColumn) {
      widths.push(300);
    }
    for (let i = 0; i < columnCount; i++) {
      widths.push(
        (worksheet._columns[i]?.width || worksheet.properties.defaultColWidth || 9) * 10 || 80
      );
    }

    // 列宽映射
    const newWidths = [...widths];
    widths.forEach((x, i) => {
      const realIndex = columnIndexMap[i];
      if (realIndex >= 0) {
        newWidths[realIndex] = x;
      }
    });

    // 左侧固定列，宽度自适应内容
    // const fixedLength = columns.filter((x) => x.isFixedColumn).length;
    // newWidths.forEach((x, i) => {
    //   if (i < fixedLength) {
    //     newWidths[i] = 200;
    //   }
    // });

    return newWidths;
  };
  const buildMergeCells = () => {
    const mergeCells = [];
    const mergeCellsMap = {};
    Object.values(worksheet._merges).forEach((merge) => {
      const { top, left, bottom, right } = merge || {};
      const rowspan = bottom - top + 1;
      const colspan = right - left + 1;
      const row = top - 1;
      const col = left - 1 + RENDER_OFFSET_X;
      const columnIndexList = new Array(colspan)
        .fill(0)
        .map((x, i) => left - 1 + i + RENDER_OFFSET_X);
      const columnIndexListReal = columnIndexList.map((x) => columnIndexMap[x]);
      columnIndexListReal.sort((a, b) => a - b);

      // 根据 columnIndexListReal 重组合并单元格
      // 将连续的 columnIndexListReal 组合成一个新的 columnIndexListReal

      const groups = [];

      let currentGroup = [];
      columnIndexListReal.forEach((x) => {
        if (currentGroup.length === 0) {
          currentGroup.push(x);
          return;
        }
        if (x === currentGroup[currentGroup.length - 1] + 1) {
          currentGroup.push(x);
        } else {
          groups.push(currentGroup);
          currentGroup = [x];
        }
      });
      if (currentGroup.length > 0) {
        groups.push(currentGroup);
      }

      // console.log('groups=', groups);

      groups.forEach((group) => {
        const mergeArea = {
          row: top - 1,
          // col: group[0] - 1 + RENDER_OFFSET_X,
          col: group[0],
          rowspan,
          colspan: group.length,
          cols: group,
          rows: new Array(rowspan).fill(0).map((_, i) => row + i),
        };
        mergeCells.push(mergeArea);

        const mergeCell = [mergeArea.rowspan, mergeArea.colspan];
        mergeArea.rows.forEach((r) => {
          mergeArea.cols.forEach((c) => {
            mergeCellsMap[`${r}-${c}`] = mergeCell;
          });
        });
      });
    });

    mergeCells.sort((a, b) => a.col - b.col);

    // console.log('mergeCells=', columnIndexMap, mergeCells, mergeCellsMap);

    return { mergeCells, mergeCellsMap };
  };

  const headerValues = buildCellsValue();
  const styles = buildCellsStyle();
  const { mergeCells, mergeCellsMap } = buildMergeCells();
  // 读取列宽
  const columnWidths = buildColumnWidths();

  return {
    headerValues,
    styles,
    mergeCells,
    mergeCellsMap,
    columnWidths,
  };
}

/**
 * 构建表头单元格值
 * @param headerValues
 * @param tableData
 * @param columns
 */
export function buildHeaderCellValues(
  headerValues: any[][],
  tableData: TableData[],
  columns: TableColumn[]
) {
  const headerCount = tableData.headerRowCount;
  const arr = headerValues.slice(0, headerCount).map((row) => {
    const obj = {};
    columns.forEach((col, colIndex) => {
      const prop = col.data;
      if (!prop) {
        return;
      }
      let value = row[colIndex];

      if (value?.richText) {
        value = value.richText
          .map((item) => {
            const color = item.font?.color?.argb?.slice(2);
            const fontWeight = item.font?.bold ? 'bold' : 'normal';
            const fontStyle = item.font?.italic ? 'italic' : 'normal';
            const fontSize = item.font?.size || 12;

            const styles = [
              color && `color:#${color}`,
              fontWeight && `font-weight: ${fontWeight}`,
              fontStyle && `font-style: ${fontStyle}`,
              // fontSize && `font-size: ${fontSize}px`,
              fontSize && `font-size: 1em`,
              fontSize && `line-height: ${fontSize + 2}px`,
            ];
            if (item.text?.trim?.() === '*') {
              styles.push(`font-size: 1.6em`);
              styles.push(`font-weight: bolder`);
              styles.push(`position: relative`);
              styles.push(`top: 2px`);
              styles.push(`left: 2px`);
            }

            return `<span style="${styles.filter(Boolean).join(';')}">${item.text}</span>`;
          })
          .join('');
      }
      obj[prop] = value;
    });
    return obj;
  });
  const data = tableData.data || [];
  if (data.length) {
    arr.push(...data);
  }
  return arr;
}

/**
 * 创建表格配置
 * @param code
 * @param worksheet
 * @param tableData
 * @param tableDetail
 * @param budgetStore
 * @param extOptions
 */
export function buildTableConfig(
  code: BudgetCode,
  worksheet: any,
  tableData: TableData,
  tableDetail: TableDetail,
  budgetStore: BudgetStoreItem,
  extOptions: any
): TableConfig {
  console.time('#time#模板解析');
  const { headerValues, styles, mergeCells, mergeCellsMap, columnWidths } = buildExcelSheetData(
    worksheet,
    tableData
  );
  console.timeEnd('#time#模板解析');
  const isReadOnly = extOptions?.readOnly;
  const canAddLine = tableData?.canAddLine;

  const {
    allColumn: columns,
    hiddenColumns,
    colTags,
    fixColumnCount,
  } = buildColumns(columnWidths, tableData);

  if (isReadOnly) {
    columns.forEach((column) => {
      column.readOnly = true;
    });
  }

  const headerCellValues = buildHeaderCellValues(headerValues, tableData, columns);

  if (canAddLine && !isReadOnly) {
    for (let i = 0; i < 5; i++) {
      tableData.rows.push({});
    }
  }

  const dataCellValues = buildDataCellValues(code, tableData);

  const statisticCellValues = buildStatisticCellValues(
    code,
    tableData,
    headerValues.length + dataCellValues.length + 1
  );

  const cellValues = [...headerCellValues, ...statisticCellValues, ...dataCellValues];

  // updateStatisticRowFormula(code, tableData, cellValues.length);

  // 创建表格实例
  const config = {
    licenseKey: HANDSON_TABLE_LICENSE_KEY, // 添加许可密钥
    themeName: 'ht-theme-main-dark-auto',
    tableCode: code,
    locale: 'zh-CN',

    // 性能优化相关的参数
    renderAllRows: false,
    viewportColumnRenderingOffset: 3,
    viewportRowRenderingOffset: 3,
    outsideClickDeselects: false,
    observeDOMVisibility: false,
    stretchH: 'all',
    rowHeights: ROW_HEIGHT, // new Array(cellValues.length).fill(ROW_HEIGHT),
    // manualColumnMove:[5],
    colHeaders: colTags,
    manualColumnResize: true,
    rowHeaders: true, // 显示行标题

    minSpareRows: 0, // 添加一些空行：但是设置该参数，添加的空白行没有公式。(1) 一旦给这些空白行添加了公式，(2)又会导致新增空白行，然后回到(1)死循环，暂时无解。
    autoWrapRow: false, // 自动换行
    autoWrapCol: false, // 自动换行
    allowInsertRow: !!canAddLine, // 允许插入行
    allowInsertColumn: false, // 禁止插入列
    allowRemoveColumn: false, // 禁止删除列
    autoColumnSize: false, // 列宽自适应, 如果是true，那么大数据两下会计算每个单元格的宽度，卡慢严重
    colWidths: columnWidths,
    autoRowSize: false,
    ariaTags: false, // 辅助功能

    disableVisualSelection: false, // 可视化选择

    columns, // 列定义
    hiddenColumns: {
      columns: hiddenColumns,
      indicators: false, // 显示【隐藏列】指示器
    },
    fixedRowsTop:
      (tableData.headerRowCount || undefined) + (tableData.statisticsRowIndex > 0 ? 1 : 0), // 固定顶部行数
    // fixedColumnsLeft: 1, // 固定左侧列数
    fixedColumnsLeft: isShowHeaderFormula ? 0 : fixColumnCount,
    styles, // 样式定义
    data: cellValues, // 表格模版数据
    mergeCells: {
      // 合并单元格
      virtualized: true, // 虚拟化
      cells: mergeCells, // 合并单元格信息
      mergeCellsMap,
    },
    contextMenu: {
      items: [],
    },

    ...extOptions,
  };

  initFilter(config, tableData, budgetStore);
  // console.log('config=', config);

  budgetStore.config = config;
  return config;
}

export function buildFormulaConfig({ tableCode, tableData, isReadOnly, tableDetail }) {
  return {
    columns: tableData.columns,
    calcStartRow: tableData.dataStartRowIndex,
    statistics:
      tableData.statisticsRowIndex >= 0
        ? {
            rowIndex: 0,
            methodFieldName: 'statistics',
            startRowIndex: tableData.statisticsRowIndex + 1,
            statisticsRowIndex: tableData.statisticsRowIndex,
            afterCalc(list: RecordItem[]) {
              addBatchRenderDataList(tableCode, BatchUpdateTypes.BATCH_UPDATE_VALUE, list);
            },
          }
        : null,
    formulaFieldList: isReadOnly
      ? []
      : [
          {
            isValue: true,
            isTrackChange: true,
            field: 'cellFieldFormula',
            levelField: `cellFieldFormula_level`,
            funcField: `cellFieldFormula_func`,
            depsField: `cellFieldFormula_deps`,
            depMap: {},
            extendArgsNames: [],
            afterCalc(list: RecordItem[]) {
              list.forEach((item) => {
                if (Number.isNaN(item[3])) {
                  item[3] = null;
                }
              });
              // isLocalhost && console.log('after value', row, col.cellFieldName, value);
              addBatchRenderDataList(tableCode, BatchUpdateTypes.BATCH_UPDATE_VALUE, list);
            },
          },
          {
            isValue: false,
            isTrackChange: false,
            field: 'mustFill',
            levelField: `mustFill_level`,
            funcField: `mustFill_func`,
            depsField: `mustFill_deps`,
            depMap: {},
            extendArgsNames: [],
            afterCalc(list: RecordItem[]) {
              // isLocalhost && console.log('after mustFill', row, col.cellFieldName, value);
            },
          },
          {
            isValue: false,
            isTrackChange: false,
            field: 'defaultValue',
            levelField: `defaultValue_level`,
            funcField: `defaultValue_func`,
            depsField: `defaultValue_deps`,
            depMap: {},
            extendArgsNames: [],
            afterCalc(list: RecordItem[]) {
              list.forEach((item) => {
                if (Number.isNaN(item[3])) {
                  item[3] = null;
                }
              });
              // isLocalhost && console.log('after value', row, col.cellFieldName, value);
              addBatchRenderDataList(tableCode, BatchUpdateTypes.BATCH_UPDATE_VALUE, list);
            },
          },
          {
            isValue: false,
            isTrackChange: true,
            field: 'canEdit',
            levelField: `canEdit_level`,
            funcField: `canEdit_func`,
            depsField: `canEdit_deps`,
            depMap: {},
            extendArgsNames: [],
            afterCalc(list: RecordItem[]) {
              // isLocalhost && console.log('after canEdit', row, col.cellFieldName, value);
              addBatchRenderDataList(tableCode, BatchUpdateTypes.BATCH_UPDATE_CAN_EDIT, list);
            },
          },
          {
            isValue: false,
            isTrackChange: false,
            field: 'enumsFilter',
            levelField: `enumsFilter_level`,
            funcField: `enumsFilter_func`,
            depsField: `enumsFilter_deps`,
            depMap: {},
            extendArgsNames: ['value', 'detail'],
            afterCalc(list: RecordItem[]) {
              // isLocalhost && console.log('after canEdit', row, col.cellFieldName, value);
              // addBatchRenderDataList(tableCode, BatchUpdateTypes.BATCH_UPDATE_CAN_EDIT, list);
            },
          },
        ],
    calcCtx: {
      BaseInfo: tableDetail,
      enums: tableData?.columnEnumsDetailMap,
      userInfo: store.userInfo,
      syncQueryApi(queryName, row, col, params) {
        return runQueryBudgetApi(queryName, tableCode, params);
      },
      syncQueryApiCallback(list, queryName, row, col, params, queryResultList) {
        list = list.map((item) => {
          const { key, value } = item;
          return [row, key, value];
        });
        const datamap = this.simpleFormula.getDataMap();
        const changes = [];
        const valueMap = {};
        list.forEach((x) => {
          const row = x[0];
          const prop = x[1];
          const oldValue = datamap[row]?.[prop];
          const newValue = x[2];
          if (oldValue === newValue) {
            return;
          }
          changes.push([row, prop, oldValue, newValue]);
          if (!valueMap[row]) {
            valueMap[row] = {};
          }
          valueMap[row][prop] = newValue;
        });
        // console.log("valueMap=", valueMap)
        if (changes.length) {
          this.simpleFormula.triggerOnChanges(changes, valueMap);
        }
        addBatchRenderDataList(tableCode, BatchUpdateTypes.BATCH_UPDATE_VALUE, list);
      },
    },
  };
}
export function buildFormulaConfigSilence({ tableCode, tableData, tableDetail }) {
  const { rows } = tableData;
  return {
    columns: tableData.columns,
    calcStartRow: 0,
    statistics: null,
    formulaFieldList: [
      {
        isValue: true,
        isTrackChange: true,
        field: 'cellFieldFormula',
        levelField: `cellFieldFormula_level`,
        funcField: `cellFieldFormula_func`,
        depsField: `cellFieldFormula_deps`,
        depMap: {},
        extendArgsNames: [],
        afterCalc(list: RecordItem[]) {
          // console.log('list=', list);
          list.forEach((item) => {
            const [row, key, value] = item;
            if (rows[row]) {
              rows[row][key] = value;
            }
          });
        },
      },
    ],
    calcCtx: {
      BaseInfo: tableDetail,
      enums: tableData?.columnEnumsDetailMap,
      userInfo: store.userInfo,
      syncQueryApi(queryName, row, col, params) {
        return runQueryBudgetApi(queryName, tableCode, params);
      },
      syncQueryApiCallback(list, queryName, row, col, params, queryResultList) {
        list = list.map((item) => {
          const { key, value } = item;
          if (rows[row]) {
            rows[row][key] = value;
          }
          return [row, key, null, value];
        });
        this.simpleFormula.triggerOnChanges(list, {});
      },
    },
  };
}

/**
 * 构建表格列定义
 * @param columnWidths
 * @param tableData
 */
export function buildColumns(columnWidths: number[], tableData: TableData) {
  const { columns, columnEnumsListMap } = tableData;
  const allColumn = columnWidths.slice(0, columns.length).map((_, index) => {
    const column = columns[index] || {};
    return {
      data: column?.cellFieldName,
      readOnly: isEditAllColumns ? false : +column?.canEdit !== 1,
      trimWhitespace: !(
        column.cellType === CellType.Select ||
        column.cellType === CellType.AutoComplete ||
        column.cellType === CellType.SelectCascade ||
        column.cellType === CellType.AutoCompleteCascade
      ),
    };
  });

  const isHidenColumns = !(isDevOrTestRole && isShowHiddenColumns);
  const isHidenExtendColumns = !(isWebDev && isShowExtendFormulaColumn);

  const hiddenColumns = columns
    .map((x, index) => {
      if (isHidenColumns) {
        if (!+x.canView) {
          return index;
        }
      }
      if (isHidenExtendColumns) {
        if (x.isExtendColumn) {
          return index;
        }
      }
      return null;
    })
    .filter((x) => x !== null);

  const colTags = columns.map((x) => x.columnShowTag);
  const fixColumnCount = columns.filter((x) => x.isFixedColumn).length;

  return {
    allColumn,
    hiddenColumns,
    colTags,
    fixColumnCount,
  };
}

export const onPaste = async (
  code: BudgetCode,
  instance: any,
  config: TableConfig,
  cellValues: any[][],
  startRow: number,
  startCol: number,
  endRow: number,
  endCol: number
) => {
  const budgetStore = useBudgetStore(code);
  budgetStore.setUserActionName(UserActionNames.OnPaste);

  const { dataStartRowIndex } = budgetStore.tableData;
  if (startRow < dataStartRowIndex) {
    startRow = dataStartRowIndex;
  }

  // 过滤掉空行
  for (let i = cellValues.length - 1; i >= 0; i--) {
    const row = cellValues[i];
    if (row.every((v) => v === '')) {
      cellValues.splice(i, 1);
    } else {
      break;
    }
  }

  {
    // 矩阵补齐
    const maxCol = Math.max.apply(
      null,
      cellValues.map((row) => row.length)
    );
    cellValues.forEach((row) => {
      if (row.length < maxCol) {
        row.push(...new Array(maxCol - row.length).fill(''));
      }
    });
  }
  {
    // 支持粘贴到多个单元格
    //    若复制的数据尺寸是：(rowCopy,colCopy)
    //    选区的尺寸是：(rowPaste,colPaste)
    //        若：存在 rowN >= 1 使得 rowPaste = rowN * rowCopy，那么按行重复
    //        若：存在 colN >= 1 使得 colPaste = colN * colCopy，那么按列重复
    //        否则：不重复
    const deltaRow = endRow - startRow + 1;
    const deltaCol = endCol - startCol + 1;
    if (deltaRow > 1 || deltaCol > 1) {
      const copyRow = cellValues.length || 0;
      const copyCol = cellValues[0]?.length || 0;
      if (deltaRow > 1 && copyRow >= 1) {
        const repeat = Math.floor(deltaRow / copyRow);
        if (repeat > 1 && +(copyRow * repeat).toFixed(4) === deltaRow) {
          cellValues = new Array(repeat)
            .fill(cellValues)
            .flat(1)
            .map((row) => [...row]);
        }
      }
      if (deltaCol > 1) {
        const repeat = Math.floor(deltaCol / copyCol);
        if (repeat > 1 && +(copyCol * repeat).toFixed(4) === deltaCol) {
          cellValues = cellValues.map((row) => new Array(repeat).fill(row).flat(1));
        }
      }
    }
  }

  // console.log('cellValues=', cellValues);
  const isLargeData = cellValues.length * cellValues[0]?.length > 30;
  if (isLargeData) {
    const rowCount = cellValues.length;
    const colCount = cellValues[0]?.length;
    if (rowCount * colCount > 10000) {
      const isOk = await swal.confirm(
        `粘贴数据量较大(${rowCount}行${colCount}列)，可能粘贴失败，建议分批处理。是否继续？`
      );
      if (!isOk) {
        return;
      }
    }

    budgetStore.setTableLoading('开始粘贴数据');
    await sleep(10);
    const tBodys = document.querySelectorAll('.handsontable tbody');
    tBodys.forEach((tBody) => {
      tBody.style.pointerEvents = 'none';
    });
    try {
      budgetStore.setTableLoading('开始匹配粘贴数据');
      await sleep(10);
      matchValueWhenPaste(code, cellValues, startCol);
      budgetStore.setTableLoading('开始粘贴数据');
      await sleep(10);
      // 现在的数据
      const sourceData = instance.getSourceData();
      const originSourceLength = sourceData.length;

      // 将 cellValues 映射为 rowObj
      const { columns } = budgetStore.tableData;

      const newRows = [];

      const { simpleFormula } = instance;
      const canEditFieldItem = simpleFormula.getFieldConfig('canEdit');

      for (let r = 0; r < cellValues.length; r++) {
        const rowObj = {};
        for (
          let c = 0, col = startCol;
          c < cellValues[r].length && col < columns.length;
          c++, col++
        ) {
          // 跳过隐藏的列
          while (col < columns.length && +columns[col].canView === 0) {
            col++;
          }
          if (col >= columns.length) {
            break;
          }
          const columnMeta = columns[col];
          if (!columnMeta.canEdit || columnMeta.canEdit === '0') {
            continue;
          }
          if (+columnMeta.canEdit) {
            rowObj[columnMeta.cellFieldName] = cellValues[r][c];
          } else if (columnMeta.canEdit?.startsWith?.('=')) {
            const rowIndex = 0; // 这里是0，主要是此时数据还没有插入表格中，无法确定数据，因此公式不能依赖于行的数据。后续需要优化。
            const isCanEdit = simpleFormula.runFormula(
              rowIndex,
              columns[col],
              canEditFieldItem,
              null
            );
            if (isCanEdit) {
              rowObj[columnMeta.cellFieldName] = cellValues[r][c];
            }
          }
        }
        newRows.push(rowObj);
      }
      // console.log('newRows=', sourceData, newRows);

      const changes = []; // 用于保存修改的数据
      let changesForCalc = []; // 用于保存触发公式计算的修改，

      for (let r = 0; r < newRows.length; r++) {
        const visualRow = startRow + r;
        const physicalRow = instance.toPhysicalRow(visualRow);
        if (physicalRow > 0) {
          for (const key in newRows[r]) {
            const oldValue = sourceData[physicalRow][key];
            const newValue = newRows[r][key];
            changes.push([physicalRow, key, oldValue, newValue]);
            changesForCalc.push([visualRow, key, oldValue, newValue]);
          }

          Object.assign(sourceData[physicalRow], newRows[r]);
        } else {
          const row = sourceData.length;
          const newRow = buildRow(code, columns, newRows[r], row);
          sourceData.push(newRow);
          for (const key in newRows[r]) {
            changes.push([row, key, null, newRow[key]]);
          }
        }
      }

      budgetStore.setTableLoading('更新数据');
      await sleep(10);
      instance.updateData(sourceData);

      budgetStore.setTableLoading('公式计算中');
      await sleep(10);

      budgetStore.addChanges(
        changes.map((x) => {
          return {
            newValue: x[3],
            oldValue: x[2],
            prop: x[1],
            row: x[0],
          };
        })
      );
      if (changesForCalc.length) {
        changesForCalc = changesForCalc.map((x) => {
          const physicalRow = instance.toPhysicalRow(x[0]);
          return [physicalRow, x[1], x[2], x[3]];
        });
        instance.simpleFormula.triggerOnChanges(changesForCalc);
      }

      const newSourceLength = instance.countSourceRows();
      if (newSourceLength > originSourceLength) {
        await instance.simpleFormula.calcTableEmptyCells(
          originSourceLength,
          newSourceLength,
          null,
          null
        );
      }
      // 数据校验，不要阻塞用户的交互
      (async () => {
        try {
          const rows = new Array(newRows.length).fill(0).map((_, index) => startRow + index);
          for (const row of rows) {
            validateRows(code, [row]);
            await sleep(10);
          }
        } catch (e) {
          console.log('e=', e);
        }
      })();

      budgetStore.setTableLoading(`粘贴成功`, false);
      budgetStore.clearTableLoading(500);
    } catch (e) {
      console.log('e=', e);
      budgetStore.setTableLoading(`粘贴失败`, false, [], {
        color: 'red',
      });
      budgetStore.clearTableLoading(2000);
    }
    budgetStore.clearUserActionName();
    tBodys.forEach((tBody) => {
      tBody.style.pointerEvents = null;
    });
  } else {
    matchValueWhenPaste(code, cellValues, startCol);
    await setDataToTable(code, instance, config, cellValues, startRow, startCol, (changes) => {
      changes.length && budgetStore.addChanges(changes);
    });
  }
};
const setDataToTable = async (
  code: BudgetCode,
  instance: any,
  config: TableConfig,
  cellValues: any[][],
  rowStart: number,
  colStart: number,
  afterUpdateCb?: (changes) => void
) => {
  // 是否有足够多的行
  const countRows = instance.countRows();
  const maxRowIndex = rowStart + cellValues.length - 1;
  const countAdd = maxRowIndex - countRows + 1;
  if (countAdd > 0 && config.allowInsertRow) {
    for (let i = 0; i < countAdd; i++) {
      instance.alter('insert_row_below', countRows + i - 1);
    }
  }
  await nextTick();
  instance.batchRender(() => {
    if (colStart < 0) {
      colStart = 0;
    }
    if (rowStart < 0) {
      rowStart = 0;
    }
    const cells = [];
    const changes = [];
    // console.log("cellValues=", cellValues)
    const { columns } = useBudgetStore(code).tableData;
    for (let r = rowStart, i = 0; i < cellValues.length; r++, i++) {
      for (let c = colStart, j = 0; j < cellValues[i]?.length && c < columns.length; c++, j++) {
        while (c < columns.length && +columns[c].canView === 0) {
          // 跳过隐藏的列
          c++;
        }
        if (c >= columns.length) {
          break;
        }
        const cellMeta = instance.getCellMeta(r, c);
        // console.log("cellMeta=", cellMeta)
        if (!cellMeta.readOnly) {
          const cellValue = cellValues?.[i]?.[j];
          cells.push([r, c, cellValue]);
          changes.push({
            newValue: cellValue,
            oldValue: instance.getDataAtCell(r, c),
            prop: columns[c].cellFieldName,
            row: r,
          });
        }
      }
    }
    instance.setDataAtCell(cells, 'edit');
    setTimeout(() => {
      afterUpdateCb(changes);
    }, 300);
  });
};
const matchValueWhenPaste = (code: BudgetCode, cellValues: any[][], colStart: number) => {
  const colCount = cellValues?.[0]?.length;
  if (!colCount) {
    return;
  }
  const budgetStore = useBudgetStore(code);
  const { columns } = budgetStore.tableData;
  for (
    let col = colStart, targetCol = 0;
    col < colStart + colCount, targetCol < colCount;
    col++, targetCol++
  ) {
    const column = columns[col];
    if (!column) {
      break;
    }
    if (
      column.cellType === CellType.Select ||
      column.cellType === CellType.AutoComplete ||
      column.cellType === CellType.SelectCascade ||
      column.cellType === CellType.AutoCompleteCascade
    ) {
      const cellDropDownList = column.cellDropDownList || [];
      if (cellDropDownList.length) {
        cellValues.forEach((row) => {
          const value = row[targetCol];
          const result = matchValueFromDropdownList(value, cellDropDownList);
          if (result) {
            row[targetCol] = result;
          }
        });
      }
    } else if (column.cellType === CellType.Number) {
      // 移除 千分位
      cellValues.forEach((row) => {
        let value = row[targetCol];
        if (value) {
          if (typeof value === 'string') {
            value = value.replace(/[,_]/g, '');
            const num = parseFloat(value);
            value = isFinite(num) ? num : value;
            row[targetCol] = value;
          }
        }
      });
    } else if (column.cellType === CellType.Percentage) {
      cellValues.forEach((row) => {
        let value = row[targetCol];
        if (value) {
          if (typeof value === 'string') {
            let num = value.replace(/[,_%]/g, '');
            num = parseFloat(num);
            value = isFinite(num) ? Decimal.div(num, 100).toNumber() : value;
          } else {
            const num = +value;
            value = isFinite(num) ? Decimal.div(num, 100).toNumber() : value;
          }
          row[targetCol] = value;
        }
      });
    }
  }
};

export const matchValueFromDropdownList = (value: any, cellDropDownList: string[]) => {
  if (value === null || value === undefined || value === '') {
    return;
  }
  // 完全匹配(忽略大小写)
  const upperValue = value.toUpperCase();
  let matchValue = cellDropDownList.find((x) => x.toUpperCase() === upperValue);
  if (matchValue) {
    return matchValue;
  }
  // 按照 “ - ”匹配
  matchValue = cellDropDownList.find((x) => {
    const splits = x.toUpperCase().split(' - ');
    return splits.some((x) => x === upperValue);
  });
  if (matchValue) {
    return matchValue;
  }
  // 模糊匹配
  //  index 优先， length 最短优先
  const matchList = [];

  cellDropDownList.forEach((x) => {
    const index = x.toUpperCase().indexOf(upperValue);
    if (index > -1) {
      matchList.push({
        value: x,
        index,
      });
    }
  });
  if (matchList.length) {
    matchList.sort((a, b) => {
      return a.index - b.index || a.value.length - b.value.length;
    });
    return matchList[0].value;
  }
  return null;
};

export const onCopy = async (
  code: BudgetCode,
  instance: any,
  config: TableConfig,
  cellValues: any[][],
  startCol: number,
  endCol: number,
  isIncludeHiddenCell: boolean
) => {
  const budgetStore = useBudgetStore(code);
  if (startCol < COLUMN_FIXED_LEFT) {
    // 一整行复制：
    //  右键复制：colStart = -1
    //  快捷键：colStart = 0
    const deletColCount = COLUMN_FIXED_LEFT - startCol;
    // console.log('deletColCount=', deletColCount);
    cellValues.forEach((row) => {
      // 删除前  COLUMN_FIXED_LEFT 个元素
      row.splice(0, deletColCount);
    });
    startCol = COLUMN_FIXED_LEFT;
  }
  for (let c = startCol, i = 0; c <= endCol; c++, i++) {
    const column = budgetStore.getColumn(c);
    if (column?.cellType === CellType.Percentage) {
      cellValues.forEach((row) => {
        const num = +row[i];
        if (!isNaN(num)) {
          row[i] = `${Decimal.mul(num, 100).toNumber()}%`;
        }
      });
    }
  }
  console.log('start', startCol);
  const { columns } = budgetStore.tableData;

  let isHasHiddenColumn = false;
  for (let col = startCol, c = 0; col <= endCol && c < cellValues[0].length; col++, c++) {
    const column = columns[col];
    if (+column.canView === 0 && !isIncludeHiddenCell) {
      isHasHiddenColumn = true;
      for (let r = 0; r < cellValues.length; r++) {
        cellValues[r][c] = '#UN#';
      }
    }
  }
  if (isHasHiddenColumn) {
    for (let i = 0; i < cellValues.length; i++) {
      cellValues[i] = cellValues[i].filter((x) => x !== '#UN#');
    }
  }
};

export const doCopySelectArea = (
  instance: any,
  budgetStore: BudgetStoreItem,
  isIncludeHiddenCell = false
) => {
  const selected = budgetStore.getSelectedLast();
  if (selected) {
    // console.log('selected=', selected);
    const [_, colStart, __, colEnd] = selected;
    const cellValues = instance.getData(...selected);
    // console.log('cellValues=', cellValues);

    onCopy(
      budgetStore.code,
      instance,
      budgetStore.config,
      cellValues,
      colStart,
      colEnd,
      isIncludeHiddenCell
    );

    const str = cellValues
      .map((row) => {
        return row
          .map((cell) => {
            if(typeof cell === 'string') {
              return cell.replace(/[\t\n]/g, ' ');
            } else {
              return cell;
            }
          })
          .join('\t');
      })
      .join('\n');

    copyFn(str, '');
  }
};

export function getDefaultValueFromColumn(
  simpleFormula: any,
  column: TableColumn,
  row: Partial<TableRow>
) {
  let defaultValue;
  if (column.defaultValue_func) {
    const defaultValueFieldItem = simpleFormula.getFieldConfig('defaultValue');
    defaultValue = simpleFormula.runFormula(row, column, defaultValueFieldItem, null);
  } else if (column.defaultValue) {
    defaultValue = column.defaultValue;
  }
  return defaultValue;
}

/**
 * 构建数据单元格值
 * @param code
 * @param tableData
 */
export function buildDataCellValues(code: BudgetCode, tableData: TableData) {
  // console.log("tableData=", tableData);
  const columns = tableData.columns || [];
  const originRows = tableData.rows || [];
  const newRows = originRows.map((row, index) => {
    const rowIndex = index + tableData.dataStartRowIndex + 1;
    return buildInitRow(code, columns, row, rowIndex);
  });
  return newRows;
}

export function buildStatisticCellValues(
  code: BudgetCode,
  tableData: TableData,
  totalRowCount: number
) {
  if (!(tableData.statisticsRowIndex > 0)) {
    return [];
  }
  const columns = tableData.columns || [];
  const newRow = {};
  columns.forEach((col) => {
    if (col.statistics) {
      // newRow[col.cellFieldName] = `=J_ST("${code}", "${col.cellFieldName}", "${col.statistics}", "list====" & ${col.__tableTag}:${col.__tableTag})`;

      // 这个公式使用了 MAX_ROWS 导致无法新增行，这个是 handsontable 的bug，暂时无法解决
      // newRow[col.cellFieldName] = `=${col.statistics.toUpperCase()}(${col.__tableTag}${
      //   tableData.dataStartRowIndex + 1
      // }:${col.__tableTag}${MAX_ROWS - 1})`;

      newRow[col.cellFieldName] = `=${col.statistics.toUpperCase()}(${col.__tableTag}${
        tableData.dataStartRowIndex + 1
      }:${col.__tableTag}${totalRowCount + 5})`;
    } else {
      newRow[col.cellFieldName] = '';
    }
  });
  newRow.__updator = '合计';
  return [newRow];
}

export function updateStatisticRowFormula(
  code: BudgetCode,
  tableData: TableData,
  totalRowCount: number
) {
  const { statisticsRowIndex } = tableData;
  if (statisticsRowIndex > 0) {
    const newRow = buildStatisticCellValues(code, tableData, totalRowCount)[0];
    const cells = [];
    Object.keys(newRow).forEach((key) => {
      cells.push([statisticsRowIndex, key, newRow[key]]);
    });
    const instance = useBudgetStore(code).getHotInstance?.();
    if (instance && !instance.isDestroyed) {
      instance.setSourceDataAtCell(cells);
    }
  }
}

export function buildInitRow(
  code: BudgetCode,
  columns: TableColumn[],
  data: Partial<TableRow>,
  rowIndex: number
) {
  // console.log('rowIndex=', rowIndex);
  const newRow = {};
  columns.forEach((col) => {
    let value = data[col.cellFieldName];
    // 此时还没有初始化公式引擎，不能做计算
    if (value?.startsWith?.('=')) {
      value = '';
    }
    newRow[col.cellFieldName] = value;
  });
  if (data.__code) {
    newRow.__code = data.__code;
    newRow.__isOriginRow = data.__code;
  } else {
    newRow.__code = uuid();
    newRow.__isOriginRow = null;
  }
  // console.log("newRow=", newRow)
  return newRow;
}

export function initDefaultValue(code, startRow: number, endRow: number, columns: TableColumn[]) {
  const cells = [];
  const budgetStore = useBudgetStore(code);
  const instance = budgetStore.getHotInstance();
  const datamap = instance.getDataMap();
  const { simpleFormula } = instance;

  for (let r = startRow; r < endRow && r < datamap.length; r++) {
    columns.forEach((col) => {
      let value = datamap[r][col.cellFieldName];
      // 设置每行的默认值
      if (value === null || value === undefined || value === '') {
        if (col.defaultValue !== null && col.defaultValue !== undefined) {
          // 是 公式默认值
          if (col.defaultValue_func) {
            value = getDefaultValueFromColumn(simpleFormula, col, r);
          } else {
            value = col.defaultValue;
          }
        }
      }
      if (value?.startsWith?.('=')) {
        value = '';
      }
      if (value !== null && value !== undefined && value !== '') {
        cells.push([r, col.cellFieldName, value]);
      }
    });
  }
  // instance.setSourceDataAtCell(cells);
  instance.setSourceDataAtCellQuickly(cells, true);
}

export function buildRow(
  code: BudgetCode,
  columns: TableColumn[],
  data: Partial<TableRow>,
  rowIndex: number
) {
  // console.log('rowIndex=', rowIndex);
  const newRow = {};
  const instance = useBudgetStore(code)?.getHotInstance?.()?.simpleFormula;
  if (instance && instance.isDestroyed) {
    return;
  }
  columns.forEach((col) => {
    let value = data[col.cellFieldName];
    // 设置每行的默认值
    if (value === null || value === undefined || value === '') {
      if (col.defaultValue !== null && col.defaultValue !== undefined) {
        // 是 公式默认值
        if (col.defaultValue_func) {
          value = getDefaultValueFromColumn(instance, col, rowIndex);
        } else {
          value = col.defaultValue;
        }
      }
    }
    if (value?.startsWith?.('=')) {
      value = '';
    }
    newRow[col.cellFieldName] = value;
  });
  if (data.__code) {
    newRow.__code = data.__code;
    newRow.__isOriginRow = data.__code;
  } else {
    newRow.__code = uuid();
    newRow.__isOriginRow = null;
  }
  // console.log("newRow=", newRow)
  return newRow;
}

export function getValueOrDefaultValue(simpleFormula, column, _row, value) {
  if (column.defaultValue) {
    if (
      value === null ||
      value === undefined ||
      value === '' ||
      value === Infinity ||
      value === -Infinity ||
      Number.isNaN(value)
    ) {
      const defaultValueResult = getDefaultValueFromColumn(simpleFormula, column, _row);
      if (
        defaultValueResult !== null &&
        defaultValueResult !== undefined &&
        defaultValueResult !== ''
      ) {
        return defaultValueResult;
      }
    }
  }
  return value;
}
