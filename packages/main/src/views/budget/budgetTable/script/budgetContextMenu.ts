import {
  BudgetCode,
  TableConfig,
  TableData,
  TableDetail,
} from '@/views/budget/budgetTable/types/type';
import { useBudgetStore } from '@/views/budget/budgetTable/script/budgetStore';
import {
  isDevOrTestRole,
  isLocalhost,
  isWebDev,
  RENDER_OFFSET_X,
} from '@/views/budget/budgetTable/script/variable';
import * as swal from '@/utils/swal';
import {
  doCopySelectArea,
  isShowExtendFormulaColumn,
  onPaste,
} from '@/views/budget/budgetTable/script/budgetTable';

export function useContextMenu(
  code: BudgetCode,
  config: TableConfig,
  tableData: TableData,
  tableDetail: TableDetail,
  { readOnly, onShowColumnProperty, webDevToEditMode, onShowEnum }
) {
  const canEdit = !readOnly;
  const canAddLine = config.allowInsertRow;

  const budgetStore = useBudgetStore(code);

  const itemGroups = [
    [
      canEdit &&
        canAddLine && {
          name: '在上方插入行',
          key: 'row_above',
          disabled() {
            const selected = budgetStore.getSelectedLast();
            if (!selected) {
              return true;
            }
            const [rowStart, colStart, rowEnd, colEnd] = selected;
            // 禁止在表头上方插入行
            if (rowStart < tableData.dataStartRowIndex) {
              return true;
            }
            return false;
          },
          callback(key, selection, clickEvent) {
            const selected = budgetStore.getSelectedLast();
            if (selected) {
              this.alter('insert_row_above', selected[0]);
            }
          },
        },
      canEdit &&
        canAddLine && {
          name: '在下方插入行',
          key: 'row_below',
          disabled() {
            const selected = budgetStore.getSelectedLast();
            if (!selected) {
              return true;
            }
            const [rowStart, colStart, rowEnd, colEnd] = selected;
            // 禁止在表头内部插入行
            if (rowStart < tableData.dataStartRowIndex - 1) {
              return true;
            }
            return false;
          },
          callback(key, selection, clickEvent) {
            const selected = budgetStore.getSelectedLast();
            if (selected) {
              this.alter('insert_row_below', selected[0]);
            }
          },
        },
    ],
    [
      {
        name: '复制(ctl+C)',
        key: 'copy',
        disabled() {
          const selected = budgetStore.getSelectedLast();
          if (!selected) {
            return true;
          }
          const [rowStart, colStart, rowEnd, colEnd] = selected;
          // 禁止复制表头
          if (tableData.statisticsRowIndex >= 0) {
            if (rowStart < tableData.statisticsRowIndex) {
              return true;
            }
          } else if (rowStart < tableData.dataStartRowIndex) {
            return true;
          }
          return false;
        },
        callback(key, selection, clickEvent) {
          doCopySelectArea(this, budgetStore, false);
        },
      },
      isDevOrTestRole &&
        localStorage.getItem('isShowHiddenColumns') && {
          name: '🔺 复制 (含隐藏列)',
          key: 'copyAndHidden',
          disabled() {
            const selected = budgetStore.getSelectedLast();
            if (!selected) {
              return true;
            }
            const [rowStart, colStart, rowEnd, colEnd] = selected;
            // 禁止复制表头
            if (tableData.statisticsRowIndex >= 0) {
              if (rowStart < tableData.statisticsRowIndex) {
                return true;
              }
            } else if (rowStart < tableData.dataStartRowIndex) {
              return true;
            }
            return false;
          },
          callback(key, selection, clickEvent) {
            doCopySelectArea(this, budgetStore, true);
          },
        },

      canEdit && {
        name: '粘贴(ctl+V)',
        key: 'paste',
        disabled() {
          const selected = budgetStore.getSelectedLast();
          if (!selected) {
            return true;
          }
          const [rowStart, colStart, rowEnd, colEnd] = selected;
          // 禁止在表头粘贴
          if (rowStart < tableData.dataStartRowIndex) {
            return true;
          }
          return false;
        },
        async callback(key, selection, clickEvent) {
          const selected = budgetStore.getSelectedLast();
          if (selected) {
            let [rowStart, colStart, rowEnd, colEnd] = selected;
            if (colStart < RENDER_OFFSET_X) {
              colStart = RENDER_OFFSET_X;
            }
            let data = '';
            try {
              data = await navigator.clipboard?.readText?.();
            } catch (e) {
              console.log('e=', e);
            }
            const cellValues = data.split('\n').map((row) => row.split('\t').map((x) => x.trim()));

            onPaste(code, this, config, cellValues, rowStart, colStart, rowEnd, colEnd);
          }
        },
      },
    ],
    [
      canAddLine &&
        canEdit && {
          name: '删除行',
          key: 'row_remove',
          disabled() {
            const selected = budgetStore.getSelectedLast();
            // console.log('selected=', selected);
            if (!selected) {
              return true;
            }
            const [rowStart, colStart, rowEnd, colEnd] = selected;
            // 禁止删除表头行
            if (rowStart < tableData.dataStartRowIndex) {
              return true;
            }
            return false;
          },
          async callback(key, selection, clickEvent) {
            const selected = budgetStore.getSelectedLast();
            if (selected) {
              const [rowStart, colStart, rowEnd, colEnd] = selected;

              const deleteCount = rowEnd - rowStart + 1;
              if (!deleteCount) {
                return;
              }
              const isConfirmed = await swal.confirm(`确定删除${deleteCount}行数据吗？`);
              if (!isConfirmed) {
                return;
              }
              this.alter('remove_row', rowStart, rowEnd - rowStart + 1);
              this.deselectCell();
            }
          },
        },
    ],
    [
      isDevOrTestRole &&
        isWebDev && {
          name: `🔺 ${isShowExtendFormulaColumn ? '隐藏' : '显示'}辅助列`,
          async callback(key, selection, clickEvent) {
            // 刷新页面
            const isConfirmed = await swal.confirm(`即将【刷新】页面，是否继续？`);
            if (!isConfirmed) {
              return;
            }
            localStorage.setItem(
              'isShowExtendFormulaColumn',
              localStorage.getItem('isShowExtendFormulaColumn') ? '' : '1'
            );
            window.location.reload();
          },
        },
      isDevOrTestRole && {
        name: `🔺 ${localStorage.getItem('isShowHiddenColumns') ? '隐藏' : '显示'}【隐藏列】`,
        async callback(key, selection, clickEvent) {
          const isConfirmed = await swal.confirm(`即将【刷新】页面，是否继续？`);
          if (!isConfirmed) {
            return;
          }
          localStorage.setItem(
            'isShowHiddenColumns',
            localStorage.getItem('isShowHiddenColumns') ? '' : '1'
          );
          location.reload();
        },
      },
      isDevOrTestRole && {
        name: `🔺 ${localStorage.getItem('isShowColMapHeaderTag') ? '隐藏' : '显示'}列映射`,
        async callback(key, selection, clickEvent) {
          const isConfirmed = await swal.confirm(`即将【刷新】页面，是否继续？`);
          if (!isConfirmed) {
            return;
          }
          localStorage.setItem(
            'isShowColMapHeaderTag',
            localStorage.getItem('isShowColMapHeaderTag') ? '' : '1'
          );
          location.reload();
        },
      },

      isDevOrTestRole && {
        name: `🔺 ${localStorage.getItem('isShowCodeColumn') ? '隐藏' : '显示'}Code列`,
        async callback(key, selection, clickEvent) {
          const isConfirmed = await swal.confirm(`即将【刷新】页面，是否继续？`);
          if (!isConfirmed) {
            return;
          }
          localStorage.setItem(
            'isShowCodeColumn',
            localStorage.getItem('isShowCodeColumn') ? '' : '1'
          );
          location.reload();
        },
      },

      isDevOrTestRole && {
        name: `🔺 ${localStorage.getItem('isShowHeaderFormula') ? '隐藏' : '显示'}表头公式`,
        async callback(key, selection, clickEvent) {
          const isConfirmed = await swal.confirm(`即将【刷新】页面，是否继续？`);
          if (!isConfirmed) {
            return;
          }
          localStorage.setItem(
            'isShowHeaderFormula',
            localStorage.getItem('isShowHeaderFormula') ? '' : '1'
          );
          location.reload();
        },
      },

      isLocalhost && {
        name: `🔺🔺 ${localStorage.getItem('isEditAllColumns') ? '关闭' : '开启'}编辑全部列`,
        async callback(key, selection, clickEvent) {
          const isConfirmed = await swal.confirm(`即将【刷新】页面，是否继续？`);
          if (!isConfirmed) {
            return;
          }
          localStorage.setItem(
            'isEditAllColumns',
            localStorage.getItem('isEditAllColumns') ? '' : '1'
          );
          location.reload();
        },
      },

      isDevOrTestRole && {
        name: `🔺 公式试运行`,
        disabled() {
          const selected = budgetStore.getSelectedLast();
          // console.log('selected=', selected);
          if (!selected) {
            return true;
          }
          const [rowStart, colStart, rowEnd, colEnd] = selected;
          // 禁止删除表头行
          if (rowStart < tableData.dataStartRowIndex) {
            return true;
          }
          return false;
        },
        async callback(key, selection, clickEvent) {
          const selected = budgetStore.getSelectedLast();
          // console.log('selected=', selected);
          if (!selected) {
            return true;
          }
          const [rowStart, colStart, rowEnd, colEnd] = selected;

          const col = budgetStore.getColumn(colStart);
          if (!col) {
            return;
          }

          const instance = budgetStore.getHotInstance();
          const simple = instance.simpleFormula;
          if (!simple) {
            return;
          }
          const config = simple.getFieldConfig('cellFieldFormula');
          simple.runFormula(rowStart, col, config, null);
        },
      },

      (isLocalhost || isWebDev) && {
        name: '编辑模式(local)',
        async callback(key, selection, clickEvent) {
          webDevToEditMode();
        },
      },
      (isLocalhost || isDevOrTestRole) &&
        false && {
          name: '枚举值详情',
          disabled() {
            return false;
          },
          async callback(key, selection, clickEvent) {
            const selected = budgetStore.getSelectedLast();
            // console.log('selected=', selected);
            if (!selected) {
              return true;
            }
            const [rowStart, colStart, rowEnd, colEnd] = selected;
            const { getColumn } = budgetStore;
            const column = getColumn(colStart);

            onShowEnum(column, rowStart);
          },
        },
      {
        name: '列属性',
        disabled() {
          const selected = budgetStore.getSelectedLast();
          if (!selected) {
            return true;
          }
          const [rowStart, colStart, rowEnd, colEnd] = selected;
          return colStart < 0;
        },
        async callback(key, selection, clickEvent) {
          const selected = budgetStore.getSelectedLast();
          // console.log('selected=', selected);
          if (!selected) {
            return true;
          }
          const [rowStart, colStart, rowEnd, colEnd] = selected;
          const { getColumn } = budgetStore;
          const column = getColumn(colStart);
          // console.log('column=', column);
          const instance = budgetStore.getHotInstance();
          const cellValue = instance?.getDataAtCell?.(rowStart, colStart);
          const cellSourceValue = instance?.getSourceDataAtCell?.(rowStart, colStart);
          const rowCode = instance.getDataAtRowProp(rowStart, '__code');
          const originRowCode = instance.getDataAtRowProp(rowStart, '__isOriginRow');

          const extCellValue = instance.getSourceDataAtCell(rowStart, `EX_${column.cellFieldName}`);

          onShowColumnProperty(column, {
            cellValue,
            cellSourceValue,
            row: rowStart,
            col: colStart,
            rowCode,
            originRowCode,
            extCellValue,
          });
        },
      },
    ],
  ];

  const groups = itemGroups
    .map((group) => {
      return group.filter((x) => x);
    })
    .filter((x) => x.length);
  // 在两两组中间插入 '----'

  config.contextMenu.items = groups
    .map((x, i) => {
      return [...x, i < groups.length - 1 ? '----------' : ''];
    })
    .flat(2)
    .filter((x) => x);
}
