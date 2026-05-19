import {
  PresentationFillQueryDetailResp,
  PresentationFillRowBean,
  SchemeTemplateDetailColumnBean,
} from '@/api/budget/data-contracts';
import {
  BudgetStoreItem,
  CellType,
  ImportType,
  OfficeType,
  TableColumn,
  TableData,
  TableRow,
} from '@/views/budget/budgetTable/types/type';
import dayjs from 'dayjs';
import {
  COLUMN_FIXED_LEFT,
  isDevOrTestRole,
  isLocalhost,
  isRenderCodeColumn,
  isRenderUpdator,
} from '@/views/budget/budgetTable/script/variable';
import {
  buildExcelColumnHeaderNames,
  fetchExcelStreamByUrl,
  sleep,
} from '@/views/budget/budgetTable/util/util';
import {
  buildFormulaConfigSilence,
  isShowColMapHeaderTag,
} from '@/views/budget/budgetTable/script/budgetTable';
import { loadEnums } from '@/views/budget/budgetTable/util/loadEnum';
import { budgetApi } from '@/api';
import { useStore } from '@/store/modules/useStore';
import { clearBudgetStore, createBudgetStore } from '@/views/budget/budgetTable/script/budgetStore';
import { createSimpleFormula } from '@/views/budget/budgetTable/script/simple-formula';

const store = useStore();

export function useLoadData(tableCode, query, tempStore) {
  let tableDetail = null;
  const tableSheets = shallowRef(null);
  const tableTitle = ref('预算编制表');
  let isReadOnly = true;
  const pageSize = 100;

  const tableData: TableData = {
    tableHeader: '', // 表名
    importMeta: null, // 导入信息
    dataStartRowIndex: 0, // 数据起始行索引
    headerRowCount: 0, // 表头行数
    statisticsRowIndex: 0, // 统计行索引
    canAddLine: false, // 是否可添加行，某些表是关联表，不能手动添加行
    supportImport: false, // 是否支持导入数据到表格
    originalColumns: [], // 原始列
    columns: [], // 表头列
    columnMap: {}, // 列映射
    columnEnumsListMap: {}, // 列枚举列表
    columnEnumsDetailMap: {}, // 列枚举列表详情
    rows: [], // 行数据
  };

  /*
   * 初始化行数据
   * @param rows 行数据
   */
  const initRows = async (rows: PresentationFillRowBean[]) => {
    rows.forEach((x) => {
      x.rowJson.__code = x.code; // 行唯一编码
      x.rowJson.__isOriginRow = x.code; // 表示该行已存在于数据库
      x.rowJson.__updator = `${x.creatorDesc || '-'}/${x.updaterDesc || '-'}`; // 创建人 / 更新人
    });

    tableData.rows = rows.map((x) => {
      return x.rowJson || {};
    });
  };

  /*
   * 初始化列数据
   * @param columns 列数据
   * @param dataRow 数据起始行索引
   * @param isReadonly 是否只读
   * @param detail 表单详情
   */
  const initColumns = async (
    columns: SchemeTemplateDetailColumnBean[],
    dataRow: number,
    isReadonly: boolean,
    detail: PresentationFillQueryDetailResp
  ) => {
    if (isLocalhost) {
      columns = columns.map((x) => {
        if (x.cellFieldName?.startsWith('sell')) {
          // x.canEdit = 1;
          x.canView = 1;
        }
        return x;
      });
    }
    // 保存原始列的顺序
    tableData.originalColumns = [...columns];

    columns.sort((a, b) => (a.sort > b.sort ? 1 : 0));

    columns.forEach((x) => {
      // x.canEdit = '=IF(H3=1,1,0)';
      const { extraInfo } = x;
      if (typeof extraInfo === 'string') {
        try {
          x.extraInfo = JSON.parse(x.extraInfo);
          if (x.extraInfo.desc && x.extraInfo.desc?.includes('{{')) {
            const argsName = [];
            const argsValue = [];

            argsName.push('userInfo');
            argsValue.push(store.userInfo);

            argsName.push('BaseInfo');
            argsValue.push(detail);

            argsName.push('dayjs');
            argsValue.push(dayjs);

            x.extraInfo.descReal = x.extraInfo.desc.replace(/\{\{(.*?)\}\}/g, (_, jsCode) => {
              const func = new Function(...argsName, `return (${jsCode});`);
              try {
                return func.call(null, ...argsValue);
              } catch (e) {
                console.error(e);
                return `{{${jsCode}}`;
              }
            });
          } else {
            x.extraInfo.descReal = x.extraInfo.desc;
          }
        } catch (e) {
          x.extraInfo = {};
        }
      } else {
        x.extraInfo = {};
      }
    });

    if (isReadonly) {
      // 只读状态下，不需要计算公式和默认值
      columns.forEach((x) => {
        x.cellFieldFormula = '';
        x.cellFieldFormulaType = '';
        x.defaultValue = undefined;
      });
    }

    if (isRenderCodeColumn) {
      columns.unshift({
        canEdit: 0,
        canView: 1,
        fixation: 1,
        isExtendFixedLeft: true,
        columnShowTag: 'Code',
        cellType: CellType.Text,
        cellTypeDesc: '文本',
        cellCnName: '编码',
        cellFieldName: '__code',
        sort: 0,
        cellTag: 'CODE',
      });
    }
    if (isRenderUpdator) {
      columns.unshift({
        canEdit: 0,
        canView: 1,
        fixation: 1,
        isExtendColumn: false,
        isExtendFixedLeft: true,
        columnShowTag: '填写人/更新人',
        cellType: CellType.Text,
        cellTypeDesc: '文本',
        cellCnName: '填写人/更新人',
        cellFieldName: '__updator',
        sort: 0,
        cellTag: 'UPDATOR',
      });
    }
    // 添加额外的信息行
    columns.push({
      isExtendColumn: true,
      fixation: 0,
      cellCnName: 'ext__code',
      cellFieldName: '__code',
      sort: columns.length + 200,
      canEdit: false,
      canView: true,
      mustFill: 0,
    });
    columns.push({
      isExtendColumn: true,
      fixation: 0,
      cellCnName: 'ext__isOriginRow',
      cellFieldName: '__isOriginRow',
      sort: columns.length + 200,
      canEdit: false,
      canView: true,
      mustFill: 0,
    });

    const colTagList = buildExcelColumnHeaderNames(columns.length);

    // console.log('colTagList=', colTagList);

    // 设置公式对应的标签
    columns.forEach((col, index) => {
      col.__formulaTag = col.cellTag;
      col.__formulaIndex = index - COLUMN_FIXED_LEFT;
    });

    // 将固定列前移
    const fixeddColumns = [];
    const unfixedColumns = [];
    columns.forEach((col) => {
      if (col.fixation === 1 && col.canView) {
        fixeddColumns.push(col);
        col.isFixedColumn = true;
      } else {
        unfixedColumns.push(col);
      }
    });
    columns = [...fixeddColumns, ...unfixedColumns];

    columns.forEach((col, index) => {
      col.__tableTag = colTagList[index];
      if (col.isExtendFixedLeft) {
        return;
      }
      col.__visualTag = colTagList[index - COLUMN_FIXED_LEFT];
      col.__visualIndex = index - COLUMN_FIXED_LEFT;
      col.columnShowTag =
        (+col.canView ? '' : '隐藏') +
        (isDevOrTestRole && isShowColMapHeaderTag
          ? `${col.__visualTag}/_${col.__formulaTag}/${col.__tableTag}/${col.__visualIndex}`
          : col.__visualTag);
      col.columnShowIndex = index;
    });

    const formulaTagMapToTableColTag = {};
    columns.forEach((col) => {
      if (col.__formulaTag && col.__tableTag) {
        formulaTagMapToTableColTag[col.__formulaTag] = col.__tableTag;
      }
    });

    const columnMap = columns.reduce((obj, current) => {
      obj[current.cellFieldName] = current;
      return obj;
    }, {});

    // 构建级联树
    columns.forEach((x) => {
      if (x.parentCellFieldName) {
        const parentColumn = columnMap[x.parentCellFieldName];
        if (parentColumn) {
          parentColumn.childrenColumns = parentColumn.childrenColumns || [];
          parentColumn.childrenColumns.push(x);
          x.parentColumn = parentColumn;
        }
      }
    });

    const getAllChildrenColumns = (column: TableColumn, list = []) => {
      const { childrenColumns } = column;
      if (childrenColumns?.length) {
        list.push(...childrenColumns);
        childrenColumns.forEach((col) => {
          getAllChildrenColumns(col, list);
        });
      }
      return list;
    };
    // 构建级联后代节点信息
    columns.forEach((col) => {
      if (
        col.cellType === CellType.SelectCascade ||
        col.cellType === CellType.AutoCompleteCascade
      ) {
        col.childrenColumnsAll = getAllChildrenColumns(col);
      }
    });

    tableData.columns = columns;
    tableData.columnMap = columnMap;

    const isHaveStatisticsRow = columns.some((x) => x.statistics);
    const statisticsRowCount = isHaveStatisticsRow ? 1 : 0;

    tableData.dataStartRowIndex = (dataRow - 1 || 0) + statisticsRowCount;
    tableData.statisticsRowIndex = isHaveStatisticsRow ? tableData.dataStartRowIndex - 1 : 0;
    tableData.headerRowCount =
      tableData.dataStartRowIndex > 0
        ? tableData.dataStartRowIndex - (isHaveStatisticsRow ? 1 : 0)
        : 0;
  };

  const initEnums = async (
    columns: SchemeTemplateDetailColumnBean[],
    arrayCellDropDownEnum: { [key: string]: string[] },
    needCellDropDownEnum: number[]
  ) => {
    needCellDropDownEnum = needCellDropDownEnum || [];
    // 加载枚举
    let dropdownIds = Object.values(arrayCellDropDownEnum || {});
    dropdownIds.push(...(needCellDropDownEnum || []));
    dropdownIds = [...new Set(dropdownIds)];
    if (dropdownIds.length) {
      const enumsResult = await loadEnums(query.planYear, dropdownIds, tempStore);

      const columnEnumsMap = enumsResult || {};
      const columnEnumsListMap = {};
      const columnEnumsDetailMap = {};

      Object.keys(arrayCellDropDownEnum).forEach((colName) => {
        const enumId = arrayCellDropDownEnum[colName];
        if (!columnEnumsMap[enumId]) {
          return;
        }
        columnEnumsMap[colName] = columnEnumsMap[enumId] || {};

        const list = Object.entries(columnEnumsMap[enumId]);
        list.sort((a, b) => (a?.[1]?.detail?.id > b?.[1]?.detail?.id ? 1 : -1));
        columnEnumsListMap[enumId] = list.map((x) => x[0]).filter((x) => x !== '');
        columnEnumsListMap[colName] = columnEnumsListMap[enumId];
      });

      Object.entries(columnEnumsMap).forEach(([key, data]) => {
        columnEnumsDetailMap[key] = Object.fromEntries(
          Object.entries(data || {}).map((item) => {
            item[1] = item[1].detail || {};
            return item;
          })
        );
      });

      // 设置下拉框列表
      columns.forEach((col) => {
        if (col.cellDropDownEnum) {
          col.cellDropDownList = columnEnumsListMap[col.cellDropDownEnum];
          col.cellDropDownDetail = columnEnumsDetailMap[col.cellDropDownEnum];
        }
      });
      // 设置级联列表
      columns.forEach((col) => {
        if (
          col.cellType === CellType.SelectCascade ||
          col.cellType === CellType.AutoCompleteCascade
        ) {
          const { parentColumn } = col;
          if (parentColumn) {
            const currentEnumMap = columnEnumsDetailMap[col.cellDropDownEnum];
            const cascadeEnumMap = {};
            if (currentEnumMap) {
              Object.entries(currentEnumMap).forEach(([key, detail]) => {
                let parents = detail?.parent?.split?.(',') || [];
                parents = parents.filter((x) => x);
                parents.forEach((parent) => {
                  cascadeEnumMap[parent] = cascadeEnumMap[parent] || [];
                  cascadeEnumMap[parent].push(key);
                });
              });
            }
            col.cellCascadeDownList = cascadeEnumMap;
          }
        }
      });

      tableData.columnEnumsDetailMap = columnEnumsDetailMap;
      tableData.columnEnumsListMap = columnEnumsListMap;
    } else {
      tableData.columnEnumsDetailMap = [];
      tableData.columnEnumsListMap = [];
    }
  };

  const initHeaderTable = async (templateUrl: string) => {
    const workbook = await fetchExcelStreamByUrl(templateUrl);
    const isWpsTheme = workbook?._themes?.theme1?.includes('name="WPS"') || false;
    const isOfficeTheme = workbook?._themes?.theme1?.includes('name="Office"') || false;
    const themeType = isWpsTheme
      ? OfficeType.Wps
      : isOfficeTheme
      ? OfficeType.Office
      : OfficeType.Office;
    if (themeType === OfficeType.Wps) {
      console.log('表格主题类型 = Wps');
    } else {
      console.log('表格主题类型 = Office');
    }
    const sheets = workbook.worksheets.filter((x) => x._columns?.length);
    for (const sheet of sheets) {
      sheet.themeType = themeType;
    }
    tableSheets.value = sheets;
    // console.log('tableSheets.value=', tableSheets.value);
  };

  const getDataForEdit = async (
    list: TableRow[],
    importType: ImportType,
    importMeta: ImportMeta,
    needChangeStatus = true
  ) => {
    try {
      const { code } = query;
      isReadOnly = false;

      console.log('#time-all#开始加载，当前时间', dayjs().format('YYYY-MM-DD HH:mm:ss.mmm'));
      if (needChangeStatus) {
        await budgetApi.financeBudgetPresentationTableChangeToInProgress({
          presentationCode: code, // 这个code必须有值
        }); // 变更状态为 “在制”
      }

      if (tempStore) {
        tempStore.setTableLoading(`查询页数...`);
      }

      const pageCount = await budgetApi.financeBudgetPresentationTableQueryFillDetailTotalPage({
        code,
        pageSize,
      });

      const loadRemoteDetail = async (pageCount, pageSize) => {
        const isLocalhost = window.location.hostname === 'localhost';
        if (isLocalhost) {
          // pageCount = 20;
          // pageCount = 8;
          pageCount = 1;
          // pageSize = 2;
        }
        if (tempStore) {
          tempStore.setTableLoading(`已加载${0}/${pageCount}页数据...`);
        }

        let settledCount = 0;
        const fetchTargets = Array.from({ length: pageCount }, (_, i) => {
          return budgetApi
            .financeBudgetPresentationTableQueryFillDetail({
              code,
              page: i + 1,
              pageSize,
            })
            .finally(() => {
              settledCount++;
              if (tempStore) {
                tempStore.setTableLoading(`已加载${settledCount}/${pageCount}页数据...`);
              }
            });
        });
        const detailList = await Promise.all(fetchTargets);

        return detailList;
      };

      let detailList = [];
      if (importType === ImportType.Cover) {
        detailList = await loadRemoteDetail(1, 0);
        const detail = detailList[0];
        detail.rows = list;
        tableData.importMeta = importMeta;
      } else if (importType === ImportType.Append) {
        detailList = await loadRemoteDetail(pageCount, pageSize);
        detailList.push({
          rows: list,
        });
        tableData.importMeta = importMeta;
      } else if (importType === ImportType.Update) {
        detailList = await loadRemoteDetail(pageCount, pageSize);
        const rows = detailList.map((x) => x.rows).flat(2);
        tableData.originRows = rows.map((x) => {
          return {
            ...(x.rowJson || {}),
            __code: x.code,
            __isOriginRow: x.code,
          };
        });
        // 将list的 rowJson 合并到 rows 的 rowJson 中
        list.forEach((importRow) => {
          const row = rows.find((x) => importRow.code && x.code === importRow.code);
          if (row) {
            row.rowJson = {
              ...(row.rowJson || {}),
              ...(importRow.rowJson || {}),
            };
          }
        });
        tableData.importMeta = importMeta;
      } else {
        detailList = await loadRemoteDetail(pageCount, pageSize);
      }

      const rows = detailList.map((x) => x.rows).flat(2);
      const detail = detailList[0];
      detail.rows = undefined;
      tableDetail = detail;
      tableTitle.value = detail.tableHeader || detail.templateName || '';
      tableData.tableHeader = tableTitle.value;
      await initRows(rows || []);
      // 加载模板参数
      const tableParams = await budgetApi.financeBudgetPresentationTableQueryFillParams({ code });
      tableData.canAddLine = !!+tableParams.schemeTemplate?.canAddLine;
      tableData.supportImport = !!+tableParams.schemeTemplate?.supportImport;
      await initColumns(
        tableParams.columnBeans || [],
        tableParams.schemeTemplate.dataRow,
        false,
        detail
      );

      await initEnums(
        tableParams.columnBeans,
        tableParams.arrayCellDropDownEnum || {},
        tableParams.needCellDropDownEnum || []
      );

      await initHeaderTable(tableParams.schemeTemplate.url);

      if (tempStore) {
        tempStore.clearTableLoading();
      }
    } catch (e) {
      console.log(e);
      if (tempStore) {
        const msg = e?.response?.data?.message || e?.message || e || '';
        tempStore.setTableLoading(
          `加载失败: ${msg}`,
          false,
          [
            {
              label: '知道了',
              cb: () => {
                tempStore.clearTableLoading();
              },
            },
          ],
          {
            color: 'red',
          }
        );
      }

      return Promise.reject(e);
    }

    const budgetStore: BudgetStoreItem = createBudgetStore(tableCode, tableData, tableDetail, {
      importMeta: tableData.importMeta,
      isReadOnly,
    });

    return {
      tableSheets,
      tableTitle,
      budgetStore,
    };
  };

  const getDataForReadonly = async () => {
    try {
      isReadOnly = true;
      console.time('load');
      const params = {
        code: query.code, // 这个code有可能有值，有可能没有值，后端需要
        budgetGroup: +query.budgetGroup,
        nowStepCode: +query.fromStepCode,
        schemeCode: query.schemeCode,
      };

      if (tempStore) {
        tempStore.setTableLoading(`查询页数...`);
      }

      const pageCount =
        await budgetApi.financeBudgetPresentationTableQueryFillDetailByDeptTotalPage({
          ...params,
          pageSize,
        });

      if (tempStore) {
        tempStore.setTableLoading(`已加载${0}/${pageCount}页数据...`);
      }
      let settledCount = 0;
      const fetchTargets = Array.from({ length: pageCount }, (_, i) => {
        return budgetApi
          .financeBudgetPresentationTableQueryFillDetailByDept({
            ...params,
            pageNum: i + 1,
            pageSize,
          })
          .finally(() => {
            settledCount++;
            if (tempStore) {
              tempStore.setTableLoading(`已加载${settledCount}/${pageCount}页数据...`);
            }
          });
      });

      const detailList = await Promise.all(fetchTargets);

      const detail = detailList[0];
      if (!detail) {
        return;
      }
      tableTitle.value = detail.tableHeader || detail.template?.name || '';
      tableData.tableHeader = tableTitle.value;

      const rows = detailList.map((x) => x.rows).flat(2);
      await initRows(rows);
      await initColumns(detail.columnBeanList, detail.dataRow, true, detail);
      await initEnums({}, {}, []);
      await initHeaderTable(detail?.template?.url);
      if (tempStore) {
        tempStore.clearTableLoading();
      }

      console.timeEnd('load');

      if (tempStore) {
        tempStore.clearTableLoading();
      }
    } catch (e) {
      if (tempStore) {
        const msg = e?.response?.data?.message || e?.message || e || '';
        tempStore.setTableLoading(
          `加载失败: ${msg}`,
          false,
          [
            {
              label: '知道了',
              cb: () => {
                tempStore.clearTableLoading();
              },
            },
          ],
          {
            color: 'red',
          }
        );
      }

      console.log(e);
      return Promise.reject(e);
    }

    const budgetStore: BudgetStoreItem = createBudgetStore(tableCode, tableData, tableDetail, {
      isReadOnly,
    });
    return {
      tableSheets,
      tableTitle,
      isReadOnly,
      budgetStore,
    };
  };

  return {
    getDataForEdit,
    getDataForReadonly,
  };
}

let silenceId = 1;
export async function updateFormulaSilence(query, rowCb) {
  const code = `silence-${silenceId++}`;
  try {
    const { getDataForEdit } = useLoadData(code, query);
    const data = await getDataForEdit(null, ImportType.None, null, false);
    // console.log('data=', data);

    const { rows } = data.budgetStore.tableData;
    if (!rows.length) {
      return;
    }

    const formulaConfig = buildFormulaConfigSilence({
      tableCode: code,
      tableData: data.budgetStore.tableData,
      isReadOnly: false,
      tableDetail: data.budgetStore.detail,
    });

    const simpleFormula = createSimpleFormula(formulaConfig, {
      countRows: () => rows.length,
      getDataMap: () => rows,
      getDefault: (row, col) => {
        const { defaultValue } = col;
        if (defaultValue) {
          if (defaultValue?.startsWith?.('=')) {
            return '';
          }
          return defaultValue;
        }
        return '';
      },
      getStatisticsRows: () => null,
    });

    await simpleFormula.calcTableEmptyCells(
      0,
      rows.length,
      (row, col, value) => {
        // 1. 只读列刷新
        if (col.canEdit === '0' || col.canEdit === 0) {
          return true;
        }

        // 2. 隐藏列刷新，例子：表1-店铺渠道。有的人是隐藏列，但是也不要刷
        // if (col.canView === '0' || col.canView === 0) {
        //   return true;
        // }

        // 3. 空值刷新
        if (value === null || value === undefined || value === '' || value === 0 || value === '0') {
          return true;
        }
        return false;
      },
      async (row, rowData) => {
        await rowCb(row, rowData, rows.length);
      }
    );

    await sleep(10000); // 等待异步公式

    const startIndex = data.budgetStore.tableData.dataStartRowIndex;

    const submitRows = rows.map((row, index) => {
      return {
        cellRowNum: startIndex + index + 1,
        code: row.__code,
        templateCode: data.budgetStore.detail.templateCode,
        rowJson: {
          ...row,
          __code: undefined,
          __updator: undefined,
          __rowIndex: undefined,
          __isChanged: undefined,
        },
      };
    });
    const params = {
      adminRefresh: true, // 是管理员刷新
      code: data.budgetStore.detail.code,
      relevanceCode: data.budgetStore.detail.relevanceCode,
      templateCode: data.budgetStore.detail.templateCode,
      templateVersion: data.budgetStore.detail.templateVersion,
      rows: submitRows,
      // isMock: true,
    };
    // if (isLocalhost) {
    //   console.log('params=', params);
    //   return;
    // }
    await data.budgetStore.saveApi(params);
  } catch (e) {
    clearBudgetStore(code);
  }
}
