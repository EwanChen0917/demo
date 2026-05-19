import ExcelJS from 'exceljs';
import { ElMessage } from 'element-plus';
import { TableColumn, TableData, TableRow } from '@/views/budget/budgetTable/types/type';
import { budgetApi } from '@/api';
import { fetchExcelStreamByUrl } from '@/views/budget/budgetTable/util/util';
import { useStore } from '@/store/modules/useStore';

const { userInfo } = useStore();

// console.log("userInfo=", userInfo)
export async function exportTableTemplate(
  tableData: TableData,
  params: any,
  isHaveRowCode: boolean,
  checkedColumns: TableColumn[],
  list: TableRow[]
) {
  const { originalColumns } = tableData;

  const templateUrl = await budgetApi.financeBudgetPresentationTableDetailExportFile({
    ...params,
    blank: true,
  });
  if (!templateUrl) {
    ElMessage.error('模板下载失败');
    return;
  }
  const templateWorkbook = await fetchExcelStreamByUrl(templateUrl);
  // console.log('templateWorkbook=', templateWorkbook);
  const worksheet = templateWorkbook.worksheets[0];

  const rows = [];

  // 插入 field 行
  rows.push(
    originalColumns.map((x) => {
      return {
        field: x.cellFieldName,
        value: x.cellFieldName,
        style: {},
        mergeCount: 0,
      };
    })
  );
  const { headerRowCount } = tableData;
  worksheet.eachRow({ includeEmpty: true }, (row, rowIndex) => {
    if (rowIndex > headerRowCount) {
      return;
    }
    const rowData = [];
    row.eachCell({ includeEmpty: true }, (cell, colIndex) => {
      const column = originalColumns[colIndex - 1] || {};
      rowData.push({
        field: column?.cellFieldName,
        mustFill: column.mustFill,
        value: cell.value,
        style: cell.style,
        mergeCount: cell._mergeCount,
      });
    });
    rows.push(rowData);
  });

  {
    rows.forEach((row, rowIndex) => {
      row.forEach((cell, colIndex) => {
        cell.oldRowIndex = rowIndex;
        cell.oldColIndex = colIndex;
      });
    });

    let oldMergeGroupId = 1;

    for (const row of rows) {
      let c = 0;
      for (c = 0; c < row.length; c++) {
        if (row[c].mergeCount >= 1) {
          const groupId = oldMergeGroupId++;
          row[c].oldMergeGroupId = groupId;
          for (let i = row[c].mergeCount; i > 0; i--) {
            c++;
            if (row[c]) {
              row[c].oldMergeGroupId = groupId;
            }
          }
        }
      }
    }

    let oldMergeGroups = {};
    for (const row of rows) {
      for (const cell of row) {
        if (cell.oldMergeGroupId) {
          if (!oldMergeGroups[cell.oldMergeGroupId]) {
            oldMergeGroups[cell.oldMergeGroupId] = {
              cells: [],
            };
          }
          oldMergeGroups[cell.oldMergeGroupId].cells.push(cell);
        }
      }
    }
    // console.log('oldMergeGroups=', oldMergeGroups);
    oldMergeGroups = Object.values(oldMergeGroups).filter((g) => g.cells.length > 1);

    oldMergeGroups.forEach((g) => {
      const rows = g.cells.map((x) => x.oldRowIndex);
      const cols = g.cells.map((x) => x.oldColIndex);
      const minRow = Math.min(...rows);
      const maxRow = Math.max(...rows);
      const minCol = Math.min(...cols);
      const maxCol = Math.max(...cols);
      g.startRow = minRow;
      g.startCol = minCol;
      g.endRow = maxRow;
      g.endCol = maxCol;
      const baseCell = g.cells.find(
        (x) => x.oldRowIndex === g.startRow && x.oldColIndex === g.startCol
      );
      // 合并单元格的样式使用第一个单元格的样式
      g.cells.forEach((cell) => {
        cell.style = baseCell.style;
      });
    });
  }

  // 处理 merge 信息
  let mergeGroupId = 1;
  for (const row of rows) {
    let c = 0;
    for (c = 0; c < row.length; c++) {
      if (row[c].mergeCount >= 1) {
        const groupId = mergeGroupId++;
        row[c].mergeGroupId = groupId;
        for (let i = row[c].mergeCount; i > 0; i--) {
          c++;
          if (row[c]) {
            row[c].mergeGroupId = groupId;
          }
        }
      }
    }
  }

  const keepColumns = checkedColumns?.length
    ? checkedColumns.map((x) => x.cellFieldName)
    : originalColumns
        .filter((x, i) => {
          // 模版需要保留的列
          // 1. 可编辑 && 可见
          // 2. 没有公式的
          // 3. 用户的 一级部门=零售与渠道营销中心时，保留 “店铺渠道”  “sell in单价”
          let isKeep = +x.canEdit === 1 && +x.canView === 1 && !x.cellFieldFormula;
          if (isKeep === false) {
            if (userInfo.deptInfo?.firstDeptName === '零售与渠道营销中心') {
              if (
                x.cellFieldName === 'qudao_dianpuqudao' ||
                x.cellFieldName?.startsWith?.('sell indanjia_')
              ) {
                isKeep = true;
              }
            }
          }

          return isKeep;
        })
        .map((x) => x.cellFieldName);

  const newRows = rows.map((row) => {
    return row.filter((x) => {
      return keepColumns.includes(x.field);
    });
  });

  // 行列编号
  newRows.forEach((row, rowIndex) => {
    row.forEach((cell, colIndex) => {
      cell.rowIndex = rowIndex;
      cell.colIndex = colIndex;
    });
  });

  // console.log('newRows=', rows, newRows);

  const newWorkbook = new ExcelJS.Workbook();
  const newSheet = newWorkbook.addWorksheet('Sheet1');

  if (isHaveRowCode) {
    // 向每一行前面插入 code 列
    newRows.forEach((row, rowIndex) => {
      row.unshift({
        field: '__code',
        value: rowIndex === 0 ? '__code' : '',
        style: {},
        mergeCount: 0,
        rowIndex,
        colIndex: 0,
      });
      // 把其他列的 colIndex 加 1
      row.forEach((cell, colIndex) => {
        cell.colIndex += 1;
      });
    });
    if (list?.length) {
      const fieldList = newRows[0].map((x) => x.field);
      const startRowIndex = newRows.length;
      const emptyStyle = {};
      list.forEach((data, r) => {
        const rowIndex = startRowIndex + r;
        const row = fieldList.map((field, colIndex) => {
          return {
            colIndex,
            field,
            mergeCount: 0,
            rowIndex,
            style: emptyStyle,
            value: data[field] ?? '',
          };
        });
        newRows.push(row);
      });
    }

    // 将第一行中不支持编辑的列的field去掉
    const firstRow = newRows[0];
    firstRow.forEach((cell, colIndex) => {
      const selectColumn = checkedColumns.find((col) => col.cellFieldName === cell.field);
      if (!selectColumn?.canImport && cell.field !== '__code') {
        cell.value = '';
      }
    });
  }

  newRows.forEach((row, rowIndex) => {
    row.forEach((cell, colIndex) => {
      const excelCell = newSheet.getCell(rowIndex + 1, colIndex + 1);
      excelCell.value = cell.value;
      excelCell.style = cell.style;
    });
  });
  {
    let mergeGroups = {};
    for (const row of newRows) {
      for (const cell of row) {
        if (cell.mergeGroupId) {
          if (!mergeGroups[cell.mergeGroupId]) {
            mergeGroups[cell.mergeGroupId] = {
              cells: [],
            };
          }
          mergeGroups[cell.mergeGroupId].cells.push(cell);
        }
      }
    }

    mergeGroups = Object.values(mergeGroups).filter((g) => g.cells.length > 1);

    mergeGroups.forEach((g) => {
      const rows = g.cells.map((x) => x.rowIndex);
      const cols = g.cells.map((x) => x.colIndex);
      const minRow = Math.min(...rows);
      const maxRow = Math.max(...rows);
      const minCol = Math.min(...cols);
      const maxCol = Math.max(...cols);
      g.startRow = minRow;
      g.startCol = minCol;
      g.endRow = maxRow;
      g.endCol = maxCol;

      newSheet.mergeCells(minRow + 1, minCol + 1, maxRow + 1, maxCol + 1);
    });

    // console.log('mergeGroups=', mergeGroups);
  }

  // 下载模板
  const file = await newWorkbook.xlsx.writeBuffer();
  const downloadUrl = URL.createObjectURL(
    new Blob([file], {
      type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
    })
  );

  if (!downloadUrl) {
    ElMessage.error('模板下载失败');
    return;
  }
  const elink = document.createElement('a'); // 创建a标签
  // 过滤非文件名字符
  elink.download = `${tableData.tableHeader.replace(
    /[/\\:*?"<>|]/g,
    '_'
  )}-${Date.now()}-导入模板.xlsx`;

  elink.style.display = 'none';
  elink.href = downloadUrl;
  document.body.appendChild(elink);
  elink.click();
  document.body.removeChild(elink);
}
