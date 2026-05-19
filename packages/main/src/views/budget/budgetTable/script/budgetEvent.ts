import {
  BudgetStoreItem,
  CellType,
  TableColumn,
  TableConfig,
  TableData,
} from '@/views/budget/budgetTable/types/type';
import { isNumber, validateCells } from '@/views/budget/budgetTable/script/budgetValidator';
import { isLocalhost, isWebDev, RENDER_OFFSET_X } from '@/views/budget/budgetTable/script/variable';
import dayjs from 'dayjs';
import TableEventBus from '@/views/budget/budgetTable/util/event';
import { throttle } from 'lodash-es';
import {
  buildRow, doCopySelectArea,
  getDefaultValueFromColumn,
  getValueOrDefaultValue,
  onCopy,
  onPaste,
  updateStatisticRowFormula,
} from '@/views/budget/budgetTable/script/budgetTable';

export function initFilter(
  config: TableConfig,
  tableData: TableData,
  budgetStore: BudgetStoreItem
) {
  const isFilter = tableData.columns.some((x) => x.filter);
  if (!isFilter) {
    return;
  }
  const showFilterMap = { 0: true };
  tableData.columns.forEach((col, index) => {
    if (col.filter) {
      showFilterMap[index] = true;
    }
  });
  config.filters = true;
  config.dropdownMenu = {
    items: {
      filter_by_value: {
        name: ' ',
        hidden() {
          const { col } = this.getSelectedRangeLast().to;
          return !showFilterMap[col];
        },
      },
      filter_action_bar: {
        hidden() {
          const { col } = this.getSelectedRangeLast().to;
          return !showFilterMap[col];
        },
      },
    },
  };
  // 不支持过滤的列，移除菜单按钮
  config.afterGetColHeader = function (col, th) {
    const isShow = showFilterMap[col];
    if (!isShow) {
      const button = th.querySelector('.changeType');
      if (!button) {
        return;
      }
      button.parentElement.removeChild(button);
    }
  };

  let lastFilters = [];
  config.afterFilter = function (filterList) {
    // console.log("filterList=", filterList)
    budgetStore.setColumnFilters(filterList);

    const filtersPlugin = this.getPlugin('filters');
    const { filtersRowsMap } = filtersPlugin;

    // 设置表头或者末尾统计行不参与过滤。
    for (let row = 0; row < config.fixedRowsTop; row++) {
      filtersRowsMap.setValueAtIndex(row, false);
    }

    const scrollElement = this.view?._wt?._wot?.wtOverlays?.scrollableElement;
    // 记住定位前的位置信息
    const { scrollTop } = scrollElement;
    const { scrollLeft } = scrollElement;

    // 定位到刚才过滤的列
    const currentFilters = filterList.map(
      (x) => `${x.column}-${x.conditions?.[0]?.args?.join?.('/') || ''}`
    );
    const deleteItems = lastFilters.filter((o) => !currentFilters.includes(o));
    const addItems = currentFilters.filter((o) => !lastFilters.includes(o));
    let all = [...deleteItems, ...addItems].map((x) => +x.split('-')[0]);
    all = [...new Set(all)];
    if (all.length === 1) {
      const rowIndex = budgetStore.tableData.dataStartRowIndex - 1;
      const obj = {
        row: rowIndex,
        col: all[0],
        verticalSnap: 'top',
        horizontalSnap: 'start',
      };
      this.scrollViewportTo(obj, () => {
        this.selectCell(rowIndex, all[0]);
      });
    }
    // 处理过滤后表头错位问题
    if (scrollTop === scrollElement.scrollTop && scrollLeft === scrollElement.scrollLeft) {
      // 如果在 scrollViewportTo 中没有触发滚动事件，需要强行滚动1px
      scrollElement.scrollTop += 1;
      scrollElement.scrollLeft += 1;
    }

    lastFilters = currentFilters;

    this.simpleFormula.calcTableStatistics();
  };
  // 自定义hook
  config.customFiltersRows = function (rows) {
    return rows.filter((row) => {
      return row.meta.row >= tableData.dataStartRowIndex;
    });
  };
}

/**
 * 表格事件
 * @param config
 * @param budgetStore
 * @param afterInit
 */
export function addTableEventListener(config: TableConfig, budgetStore: BudgetStoreItem) {
  const { canAddLine } = budgetStore.tableData;
  console.log('canAddLine=', canAddLine);

  // 由于需要使用this，不要使用箭头函数注册事件
  config.beforeChange = function (changes, source) {
    // 初始化时，表头合并单元格，阻止修改原数据。
    if (source === 'MergeCells') {
      return true;
    }
    if (source === 'loadData') {
      return true;
    }

    // 有格式要求的，在保存以后需要及时更新格式
    changes.forEach((x) => {
      let [_row, prop, _oldValue, newValue] = x;
      const column = budgetStore.getColumn(prop);
      if (!column) {
        return;
      }

      const { cellDisplayFormat, cellType, defaultValue } = column;

      // 如果用户输入 50% 那么去掉 %
      if (cellType === CellType.Percentage) {
        // console.log('newValue=', newValue);
        if (typeof newValue === 'string') {
          if (newValue.includes('%')) {
            const percent = newValue.trim().replace('%', '');
            if (isFinite(percent)) {
              newValue = +percent / 100;
            }
          }
        }
      }

      if (
        isNumber(newValue) &&
        (cellType === CellType.Number || cellType === CellType.Percentage) &&
        newValue !== null &&
        newValue !== '' &&
        newValue !== undefined
      ) {
        if (cellDisplayFormat) {
          let fixed = 0;
          if (cellDisplayFormat === '0') {
            fixed = 0;
          } else if (+cellDisplayFormat > 0) {
            fixed = +cellDisplayFormat;
          } else {
            return;
          }
          // 百分比: 保留2位小数，其实是保留4位小数
          if (cellType === CellType.Percentage) {
            fixed += 2;
          }
          newValue = +(+newValue).toFixed(fixed);
          x[3] = newValue;
        }
      }

      // 默认值赋值
      x[3] = getValueOrDefaultValue(
        budgetStore.getHotInstance().simpleFormula,
        column,
        _row,
        newValue
      );
    });
  };

  config.afterChange = function (changes, source) {
    isLocalhost && console.log('afterChange=', changes, source);
    if (source === 'edit') {
      changes = changes.map((x) => {
        return {
          row: x[0],
          prop: x[1],
          oldValue: x[2],
          newValue: x[3],
        };
      });
      // console.log(changes);
      budgetStore.addChanges(
        changes.map((x) => {
          return {
            ...x,
            row: this.toPhysicalRow(x.row),
          };
        })
      );

      // 级联校验后代校验
      let needValidCells = [];

      changes.forEach((change) => {
        const col = budgetStore.getColumn(change.prop);
        if (col.cellType === CellType.SelectCascade) {
          needValidCells.push({ row: change.row, prop: change.prop, value: null });
          const { childrenColumnsAll } = col;
          if (childrenColumnsAll?.length) {
            childrenColumnsAll.forEach((childrenCol) => {
              if (childrenCol.cellType === CellType.SelectCascade) {
                needValidCells.push({
                  row: change.row,
                  prop: childrenCol.cellFieldName,
                  value: null,
                });
              }
            });
          }
        }
      });

      if (needValidCells.length) {
        // 根据 row prop 去重
        const map = {};
        needValidCells = needValidCells.filter((x) => {
          const key = `${x.row}-${x.prop}`;
          if (map[key]) {
            return false;
          }
          map[key] = true;
          return true;
        });

        const datamap = this.getDataMap();
        needValidCells.forEach((x) => {
          x.value = datamap[x.row]?.[x.prop];
        });
        needValidCells = needValidCells.filter((x) => {
          return x.value !== null && x.value !== undefined && x.value !== '';
        });
        validateCells(budgetStore.code, needValidCells);
      }

      // 点击了最后一行
      if (config.allowInsertRow) {
        const lastRowIndex = this.countSourceRows() - 1;
        const isEditLastRow = changes.some((x) => x?.row === lastRowIndex);
        isLocalhost && console.log('isEditLastRow=', isEditLastRow);
        if (isEditLastRow) {
          // 加上两个空行
          this.batchRender(() => {
            for (let i = 0; i < 1; i++) {
              this.alter('insert_row_below');
            }
          });
        }
      }
    }
  };
  config.afterCreateRow = function (index, amount, source) {
    // isLocalhost && console.log('afterCreateRow args=', index, amount, source);
    const { code, tableData } = budgetStore;
    const totalRowCount = this.countSourceRows() + amount;
    this.batchRender(() => {
      // 初始化默认值
      const cells = [];
      const { columns } = tableData;
      for (let i = index; i < index + amount; i++) {
        const newRow = buildRow(code, tableData.columns, {}, i + 1);
        columns.forEach((col) => {
          const { cellFieldName } = col;
          const value = newRow[cellFieldName];
          if (value !== undefined && value !== null && value !== '') {
            cells.push([index, cellFieldName, value]);
          }
        });
        cells.push([index, '__isOriginRow', '']); // 扩展属性
        cells.push([index, '__code', newRow.__code]); // 扩展属性
      }
      // console.log('source=', source);
      this.setDataAtRowProp(cells, 'new-row');

      this.simpleFormula.calcTableAll(index, index + amount);

      if (config.rowHeights.length < totalRowCount) {
        config.rowHeights.push(...Array(totalRowCount - config.rowHeights.length).fill(ROW_HEIGHT));
      }
    });

    updateStatisticRowFormula(code, tableData, totalRowCount);
    return true;
  };
  config.beforePaste = function (cellValues, coords) {
    // 不适用默认的粘贴功能
    if (!coords?.length) {
      return false;
    }
    let { startRow, startCol, endRow, endCol } = coords[0];

    if (startCol < RENDER_OFFSET_X) {
      startCol = RENDER_OFFSET_X;
    }

    const { code } = budgetStore;
    onPaste(code, this, config, cellValues, startRow, startCol, endRow, endCol);
    return false;
  };
  config.beforeCopy = function (data, coords) {
    doCopySelectArea(this, budgetStore, false);
    return false;
  };
  config.beforeRemoveRow = function (_, __, rows) {
    // 删除修改记录、验证信息
    rows
      .map((row) => {
        return this.getSourceDataAtRow(row)?.__code;
      })
      .forEach((__code) => {
        if (__code) {
          budgetStore.deleteRowValidateMessage(__code);
          budgetStore.deleteChanges(__code);
        }
      });
  };
  config.afterScroll = function () {
    closeEditorThrottle(this);
  };
  config.afterOnCellMouseUp = function (ev, { row, col }, td) {
    if (ev.target.tagName === 'I' && ev.target.getAttribute('is-select-arrow') === '1') {
      const editor = this.getActiveEditor();
      if (editor) {
        const value = this.getDataAtCell(row, col);
        editor.beginEditing(value, null);
      }
    }
  };

  config.afterSelectionEnd = function (rowStart, colStart, rowEnd, colEnd) {
    TableEventBus.emit('select-cell', { rowStart, colStart, rowEnd, colEnd });
  };

  const closeEditorThrottle = throttle((instance) => {
    const activeEditor = instance.getActiveEditor();
    if (activeEditor) {
      activeEditor.close();
    }
  }, 500);

  config.afterUndoStackChange = function (_, list) {
    // 这个功能，目前跟公式一起用，体验不好
    budgetStore.updateUndoAvailable(list.length);
  };
  config.afterRedoStackChange = function (_, list) {
    budgetStore.updateRedoAvailable(list.length);
  };
}
