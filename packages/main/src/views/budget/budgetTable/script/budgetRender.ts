import { CellType, TableConfig, TableData } from '@/views/budget/budgetTable/types/type';
import { addNumberCommas } from '@/views/budget/budgetTable/util/util';
import { useBudgetStore } from '@/views/budget/budgetTable/script/budgetStore';
import { CustomTextEditor } from '@/views/budget/budgetTable/plugins/customTextEditor';
import { CustomNumberEditor } from '@/views/budget/budgetTable/plugins/customNumberEditor';
import { CustomPercentEditor } from '@/views/budget/budgetTable/plugins/customPercentEditor';
import { CustomSelectEditor } from '@/views/budget/budgetTable/plugins/customSelectEditor';
import { CustomAutoCompleteEditor } from '@/views/budget/budgetTable/plugins/customAutoCompleteEditor';
import { isShowHeaderFormula } from '@/views/budget/budgetTable/script/variable';

/**
 * 自定义渲染
 * @param config
 */
export function useCustomRenderer(config: TableConfig, tableData: TableData) {
  const styles = config.styles || [];
  // console.log('config=', config, tableData);
  const {
    dataStartRowIndex,
    headerRowCount,
    statisticsRowIndex,
    columns,
    columnMap,
    columnEnumsListMap,
    rows,
  } = tableData;

  const minWidthMap = {};
  // customRender 函数：渲染单元格样式
  const headerRenderer = (instance, td, row, col, prop, value, cellProperties) => {
    const columnMeta = columnMap[prop] || {};
    td.oTitle = td.title = value;
    if (value === null || value === undefined || value === '') {
      td.innerHTML = '';
    } else {
      if (columnMeta.extraInfo?.descReal) {
        value = `<div title="${columnMeta.extraInfo?.descReal}">${value}<i class="icon-qa">?</i></div>`;
      }

      td.innerHTML = value;
      const text = td.innerText;
      if (text) {
        // len * fontSize + padding
        const minWidth = minWidthMap[text];
        if (!minWidth) {
          if (text.includes('\n')) {
            const arr = text.split('\n');
            const maxLen = Math.max(...arr.map((item) => item.length));
            minWidthMap[text] = maxLen * 14 + 16;
          } else {
            minWidthMap[text] = String(text).length * 14 + 16;
          }
        }
        td.style.minWidth = `${minWidth}px`;
      } else {
        td.style.minWidth = '';
      }
    }

    if (isShowHeaderFormula) {
      td.innerHTML += `

<div style="text-align: left">字段: ${columnMeta.cellFieldName || ''}</div>
<div style="text-align: left">公式 ${columnMeta.cellFieldFormula || ''}</div>
<div style="text-align: left">mustFill: ${columnMeta.mustFill || ''}</div>
<div style="text-align: left">canEdit: ${columnMeta.canEdit || ''}</div>
<div style="text-align: left">defaultValue: ${columnMeta.defaultValue || ''}</div>
<div style="text-align: left">统计: ${columnMeta.statistics || ''}</div>

`;
    }

    if (config.mergeCells.mergeCellsMap[`${row}-${col}`]?.[1] > 1) {
      // 合并单元格不让点击：对于超长的固定行合并单元格，用户点击会出现固定行与非固定行的错位。
      td.classList.add('disable-select-merge-cell');
    }

    // 目前只有头部有样式
    const style = styles[row]?.[col];
    if (style) {
      td.style.backgroundColor = style.backgroundColor;
      td.style.color = style.color;
      td.style.fontWeight = style.fontWeight;
      td.style.fontSize = style.fontSize;
      td.style.fontFamily = style.fontFamily;
      td.style.textAlign = style.textAlign;
      td.style.verticalAlign = style.verticalAlign;
    }
    if (!style?.backgroundColor) {
      td.classList.add('o-read');
    }
  };

  const defaultRenderer = (instance, td, row, col, prop, value, cellProperties) => {
    // 如果是空值，就渲染空字符串
    // 如果不可见，那么也渲染空字符串
    if (value === null || value === undefined || value === '' || value?.startsWith?.('=')) {
      td.innerHTML = '';
      td.title = '';
    } else {
      td.innerHTML = value;
      td.oTitle = td.title = value;
    }

    const columnMeta = columnMap[prop] || {};
    if (!+columnMeta.canEdit) {
      td.classList.add('o-read');
    }
    showInvalidStyle(instance, td, row, col, prop, value, cellProperties);
    showReadOnlyStyle(instance, td, row, col, prop, value, cellProperties);
  };
  const renderPercentage = (instance, td, row, col, prop, value, cellProperties) => {
    if (value === null || value === undefined || value === '' || value?.startsWith?.('=')) {
      td.innerHTML = '';
    } else if (isFinite(value)) {
      const columnMeta = columnMap[prop] || {};
      if (
        (columnMeta.cellDisplayFormat === 0 ||
          columnMeta.cellDisplayFormat === '0' ||
          columnMeta.cellDisplayFormat) &&
        +columnMeta.cellDisplayFormat >= 0
      ) {
        td.innerHTML = `${addNumberCommas((value * 100).toFixed(+columnMeta.cellDisplayFormat))}%`;
      } else {
        td.innerHTML = `${addNumberCommas((value * 100).toFixed(2))}%`;
      }
    } else {
      td.innerHTML = value;
    }
    td.oTitle = td.title = td.innerHTML;
    td.style.textAlign = 'right';
    showInvalidStyle(instance, td, row, col, prop, value, cellProperties);
    showReadOnlyStyle(instance, td, row, col, prop, value, cellProperties);
  };
  const renderNumber = (instance, td, row, col, prop, value, cellProperties) => {
    if (value === null || value === undefined || value === '' || value?.startsWith?.('=')) {
      td.innerHTML = '';
    } else if (isFinite(value)) {
      const columnMeta = columnMap[prop] || {};
      if (
        (columnMeta.cellDisplayFormat === 0 ||
          columnMeta.cellDisplayFormat === '0' ||
          columnMeta.cellDisplayFormat) &&
        +columnMeta.cellDisplayFormat >= 0
      ) {
        td.innerHTML = addNumberCommas((+value).toFixed(+columnMeta.cellDisplayFormat));
      } else {
        td.innerHTML = addNumberCommas(String(value));
      }
    } else {
      td.innerHTML = value;
    }
    td.oTitle = td.title = td.innerHTML;
    td.style.textAlign = 'right';
    showInvalidStyle(instance, td, row, col, prop, value, cellProperties);
    showReadOnlyStyle(instance, td, row, col, prop, value, cellProperties);
  };

  const renderSelect = (instance, td, row, col, prop, value, cellProperties) => {
    if (value === null || value === undefined || value === '' || value?.startsWith?.('=')) {
      value = '';
    }
    td.oTitle = td.title = value;
    td.innerHTML = `<div class="select-arrow-icon-box"><span>${value}</span><i is-select-arrow="1">▼</i></div>`;
    if (value) {
      showInvalidStyle(instance, td, row, col, prop, value, cellProperties);
      showReadOnlyStyle(instance, td, row, col, prop, value, cellProperties);
    }
  };

  const renderCanNotView = (instance, td, row, col, prop, value, cellProperties) => {
    if (row >= tableData.dataStartRowIndex) {
      td.innerHTML = '';
      td.classList.add('htDimmed');
      showInvalidStyle(instance, td, row, col, prop, value, cellProperties);
      showReadOnlyStyle(instance, td, row, col, prop, value, cellProperties);
    } else {
      defaultRenderer(instance, td, row, col, prop, value, cellProperties);
    }
  };

  const useCustomDisplayFormatRenderer = (columnMeta) => {
    let format = columnMeta.cellDisplayFormat;
    if (format === null || format === '' || format === undefined) {
      return defaultRenderer;
    }
    if (!columnMeta.__renderer) {
      if (format === '0' || +format > 0) {
        // 如果是数字，那就是保留几位小数
        format = +format;
        columnMeta.__renderer = (instance, td, row, col, prop, value, cellProperties) => {
          if (value === null || value === '' || value === undefined || value?.startsWith?.('=')) {
            td.innerHTML = '';
          } else if (isFinite(+value)) {
            td.innerHTML = (+value).toFixed(format);
          } else {
            td.innerHTML = value;
          }
          td.oTitle = td.title = td.innerHTML;
          showInvalidStyle(instance, td, row, col, prop, value, cellProperties);
          showReadOnlyStyle(instance, td, row, col, prop, value, cellProperties);
        };
      } else {
        return defaultRenderer;
      }
    }
    return columnMeta.__renderer;
  };

  const budgetStore = useBudgetStore(config.tableCode);

  const showInvalidStyle = (instance, td, row, col, prop, value, cellProperties) => {
    if (!instance.tableCode) {
      return;
    }
    // if(prop === 'shenqingguojia' && value){
    //   debugger
    // }
    const physicalRow = instance.toPhysicalRow(row);
    const rowCode = instance.getDataMap()[physicalRow].__code;
    const msg = budgetStore.getValidateMessage?.(rowCode, prop);
    if (msg) {
      td.classList.add('htInvalid');
      td.title = msg.message;
    } else {
      td.classList.remove('htInvalid');
      td.title = td.oTitle || '';
    }
  };
  const showReadOnlyStyle = (instance, td, row, col, prop, value, cellProperties) => {
    if (cellProperties.readOnly) {
      td.classList.add('o-read');
    } else {
      td.classList.remove('o-read');
    }
  };

  config.renderer = defaultRenderer;

  const editorMap = {
    [CellType.Text]: CustomTextEditor,
    [CellType.Number]: CustomNumberEditor,
    [CellType.Percentage]: CustomPercentEditor,
    [CellType.Select]: CustomSelectEditor,
    [CellType.AutoComplete]: CustomAutoCompleteEditor,
    [CellType.SelectCascade]: CustomSelectEditor,
    [CellType.AutoCompleteCascade]: CustomAutoCompleteEditor,
  };

  // const arr = [];

  // 单元格相关的行为交互控制
  config.cells = function (row, col, prop) {
    // arr.push(`${row}-${col}`);
    // console.log('in cells');
    const obj = {};

    if (row < headerRowCount) {
      // 表头
      obj.readOnly = true;
      obj.renderer = headerRenderer;
      return obj;
    }
    if (statisticsRowIndex && row === statisticsRowIndex) {
      // 统计行
      obj.readOnly = true;
      this.readOnly = true;
    }

    // 数据行
    const columnMeta = columnMap[prop] || {};
    const { cellType } = columnMeta;
    obj.columnMeta = columnMeta;

    if (columnMeta.canView === 0) {
      // console.log('prop in cell render=', prop);
      obj.type = 'text';
      obj.readOnly = true;
      obj.renderer = renderCanNotView;
    } else {
      if (!this.readOnly) {
        const editor = editorMap[cellType];
        if (editor) {
          obj.editor = editor;
        } else {
          obj.readOnly = true;
        }
        obj.validator = columnMeta.validatorFunc;
      }
      if (cellType === CellType.Percentage) {
        obj.renderer = renderPercentage;
      } else if (cellType === CellType.Number) {
        obj.renderer = renderNumber;
      } else if (
        !this.readOnly &&
        (cellType === CellType.Select ||
          cellType === CellType.AutoComplete ||
          cellType === CellType.SelectCascade ||
          cellType === CellType.AutoCompleteCascade)
      ) {
        obj.renderer = renderSelect;
      }
      if (columnMeta.cellDisplayFormat && !obj.renderer) {
        // console.log("cellCnName=", col, columnMeta.cellCnName);
        obj.renderer = useCustomDisplayFormatRenderer(columnMeta);
      }
    }
    return obj;
  };
}
