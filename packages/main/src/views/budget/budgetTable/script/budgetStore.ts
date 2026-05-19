import { computed, reactive, ref } from 'vue';
import { ElMessage } from 'element-plus';
import { budgetApi } from '@/api';
import { debounce } from 'lodash-es';
import dayjs from 'dayjs';
import axios from 'axios';
import { getCookieToken } from '@/hooks/web/useCookie';
import { useStore } from '@/store/modules/useStore';
import { sleep, uploadFileToOss } from '@/views/budget/budgetTable/util/util';
import { isLocalhost } from '@/views/budget/budgetTable/script/variable';
import {
  BudgetCode,
  BudgetStoreItem,
  EditChangeItem,
  SaveTypes,
  TableColumn,
  TableData,
  TableLoadingActionItem,
  UserActionNames,
  ValidateMessageItem,
} from '@/views/budget/budgetTable/types/type';
import { PresentationFillQueryDetailResp } from '@/api/budget/data-contracts';
import { isEmpty } from './budgetValidator';

const store = useStore();
const storeMap: Record<BudgetCode, BudgetStoreItem> = reactive({});

window.__getStoreMap = () => {
  return storeMap;
};

export function createBudgetStore(
  code: BudgetCode,
  tableData: TableData,
  detail: PresentationFillQueryDetailResp,
  initOptions
): BudgetStoreItem {
  const storeTick = Math.random();
  const tableLoadingMessageIcon = ref(true);
  const tableLoadingMessage = ref('');
  const tableLoadingMessageStyle = ref('');
  const tableLoadingActions = ref<TableLoadingActionItem[]>([]);

  const setTableLoading = (
    message: string,
    showIcon: boolean,
    actions: TableLoadingActionItem[] = [],
    textStyle: string | Record<string, any> = null
  ) => {
    tableLoadingMessage.value = message;
    tableLoadingActions.value = actions;
    tableLoadingMessageStyle.value = textStyle || null;
    tableLoadingMessageIcon.value = showIcon !== false;
  };
  const clearTableLoading = (delay = 0) => {
    if (delay) {
      setTimeout(() => {
        tableLoadingMessage.value = '';
      }, delay);
    } else {
      tableLoadingMessage.value = '';
    }
  };

  let instance = null;

  const setTableRef = (el: any) => {
    instance = el || null;
    if (instance) {
      instance.tableCode = code;
    }
  };
  const getHotInstance = () => {
    return instance;
  };
  const destroyHotInstance = () => {
    if (instance) {
      console.log('destroyHotInstance', code);
      instance.destroy();
      instance = null;
    }
  };
  const debounceRender = debounce(() => {
    // console.log('in render');
    if (instance?.isDestroyed) {
      return;
    }
    instance?.render();
  }, 500);
  const getSelectedLast = (): [number, number, number, number] => {
    let [rowStart, colStart, rowEnd, colEnd] = instance.getSelectedLast();
    if (rowStart > rowEnd) {
      [rowStart, rowEnd] = [rowEnd, rowStart];
    }
    if (colStart > colEnd) {
      [colStart, colEnd] = [colEnd, colStart];
    }
    return [rowStart, colStart, rowEnd, colEnd];
  };

  if (isLocalhost) {
    window.__hot = () => instance;
    window.__formula = () => instance.getPlugin('Formulas')?.engine;
    window.__list = () => instance.getSourceData();
    window.__tb = () => tableData;
    window.__columns = () => tableData.columns;
  }

  const getTableDataList = () => {
    // console.log("instance=", instance)
    // 将列和数据映射起来
    let { columns } = tableData;

    columns = columns.filter((x) => !x.isExtendColumn);

    // console.log("indexMaps=", indexMaps, columns)
    // 根据列索引映射
    const dataStartRowIndex = tableData.dataStartRowIndex || 0;
    let tableRenderSource = instance?.getSourceData?.() || [];

    tableRenderSource.forEach((row, index) => {
      row.__rowIndex = index;
    });

    tableRenderSource = tableRenderSource.slice(dataStartRowIndex);

    const changeIdMap = {};
    editChanges.value.forEach((change) => {
      changeIdMap[change.__code] = true;
    });

    tableRenderSource = tableRenderSource.filter((row, index) => {
      // 从接口返回的行，直接保存
      if (row.__isOriginRow) {
        return true;
      }
      // 没有修改记录的行，直接丢弃
      if (!changeIdMap[row.__code]) {
        return false;
      }

      for (let c = 0; c < columns.length; c++) {
        const column = columns[c];
        if (!column.canView || !+column.canEdit) {
          continue;
        }
        const value = row[column.cellFieldName];
        // 是空值
        if (isEmpty(value)) {
          continue;
        }
        // 取的是默认值，用户没有修改过
        if (value === column.defaultValue) {
          continue;
        }
        // 用户录入了有效的内容
        return true;
      }
      // 是空行
      return false;
    });
    return { data: tableRenderSource };
  };
  const getTableChangeDataList = () => {
    const { data } = getTableDataList();
    const originData = tableData.originRows || tableData.rows;
    // console.log('originData=', data, originData);
    let { columns } = tableData;
    columns = columns.filter((x) => !x.isExtendColumn);
    const rows = data
      .map((newRow, index) => {
        const oldRow = originData[index];
        if (!oldRow) {
          return newRow;
        }
        const resultRow = {};
        let hasChanged = false;
        columns.forEach((column) => {
          if (column.isExtendColumn) {
            return;
          }
          const oldValue = oldRow[column.cellFieldName];
          const newValue = newRow[column.cellFieldName];
          if (isEmpty(oldValue) && isEmpty(newValue)) {
            return;
          }
          if (oldValue !== newValue) {
            resultRow[column.cellFieldName] = newValue;
            hasChanged = true;
          }
        });
        if (hasChanged) {
          resultRow.__code = newRow.__code;
          resultRow.__rowIndex = index + tableData.dataStartRowIndex;
          resultRow.__isOriginRow = newRow.__isOriginRow;
          return resultRow;
        }
        return null;
      })
      .filter((x) => x);
    return rows;
  };

  const getColumn = (indexOrProp: number | string): TableColumn | undefined => {
    // index or prop
    const { columns } = tableData;
    if (typeof indexOrProp === 'number') {
      return columns[indexOrProp];
    }
    return columns.find((column) => column.cellFieldName === indexOrProp);
  };

  const editChanges = ref<EditChangeItem[]>([]);
  const hasChanges = computed(() => editChanges.value.length > 0);
  const addChanges = (changes: EditChangeItem[]) => {
    changes = changes.filter((x) => {
      const isOldEmpty = isEmpty(x.oldValue);
      const isNewEmpty = isEmpty(x.newValue);
      if (isOldEmpty && isNewEmpty) {
        return false;
      }
      if (x.oldValue === x.newValue) {
        return false;
      }
      return true;
    });
    // console.log('changes=', changes);
    if (!changes.length) {
      return;
    }
    changes.forEach((item) => {
      const sourceRow = instance.getSourceDataAtRow(item.row);
      if (!sourceRow) {
        return;
      }
      const sourceCode = sourceRow.__code;

      const changeItemIndex = editChanges.value.findIndex(
        (x) => x.__code === sourceCode && x.prop === item.prop
      );
      item.__code = sourceCode;
      const changeItem = editChanges.value[changeItemIndex];
      if (changeItem) {
        changeItem.newValue = item.newValue;
        if (
          changeItem.oldValue === changeItem.newValue ||
          (isEmpty(changeItem.oldValue) && isEmpty(changeItem.newValue))
        ) {
          // console.log('remove changeItem=', changeItem);
          editChanges.value.splice(changeItemIndex, 1);
        }
      } else {
        editChanges.value.push(item);
      }
    });
    if (isLocalhost) {
      // 本地不需要自动保存
    } else {
      autoSave();
    }
  };
  const clearChanges = () => {
    editChanges.value = [];
  };
  const deleteChanges = (rowCode: string) => {
    editChanges.value = editChanges.value.filter((x) => x.__code !== rowCode);
  };

  const importMeta = ref<ImportMeta | null>(initOptions.importMeta);
  const setImportState = (_importMeta: ImportMeta | null) => {
    importMeta.value = _importMeta;
  };

  const initNeedSave = ref(false); // 公式计算导致的表单修改
  const setNeedSave = (needSave: boolean) => {
    initNeedSave.value = needSave;
  };

  const needSave = computed(() => {
    return hasChanges.value || importMeta.value || initNeedSave.value;
  });

  let timer = null;
  const autoSave = () => {
    if (timer) {
      return;
    }
    timer = setTimeout(
      async () => {
        clearTimeout(timer);
        timer = null;
        if (!hasChanges.value) {
          return;
        }
        try {
          await save(code, SaveTypes.Auto, true);
          ElMessage.success('自动保存成功');
        } catch (error) {
          ElMessage.error(`自动保存失败：${error}`);
        }
        // ElMessage.success('自动保存成功');
      },
      isLocalhost ? 10000 : 60 * 1000
    );
  };

  let isSaving = false;
  const save = async (code: BudgetCode, saveType = SaveTypes.Auto, isAutoSave = false) => {
    const isNotAutoSave = !isAutoSave;
    if (code) {
      if (isSaving) {
        if (isAutoSave) {
          return;
        }
      }
      isSaving = true;

      isNotAutoSave && setTableLoading('正在保存', true);
      await sleep(300);
      const dataStartRowIndex = tableData.dataStartRowIndex || 0;
      const { data: renderRows } = getTableDataList();

      try {
        let submitRows = [];

        // 对于不能新增行的表格，只传修改的行
        if (!tableData.canAddLine) {
          const changeRows = getTableChangeDataList();
          submitRows = changeRows.map((row) => {
            return {
              cellRowNum: row.__rowIndex,
              code: row.__code,
              templateCode: detail.templateCode,
              rowJson: {
                ...row,
                __code: undefined,
                __updator: undefined,
                __rowIndex: undefined,
                __isChanged: undefined,
              },
            };
          });
        } else {
          submitRows = renderRows.map((row, index) => {
            const rowIndex = index + dataStartRowIndex + 1;
            return {
              cellRowNum: rowIndex,
              code: row.__code,
              templateCode: detail.templateCode,
              rowJson: {
                ...row,
                __code: undefined,
                __updator: undefined,
                __rowIndex: undefined,
                __isChanged: undefined,
              },
            };
          });
        }
        const params = {
          adminRefresh: false,
          code: detail.code,
          relevanceCode: detail.relevanceCode,
          templateCode: detail.templateCode,
          templateVersion: detail.templateVersion,
          rows: submitRows,
        };

        await saveApi(params);

        clearChanges();

        // importTime: string;
        // importUser: string;
        // fileName: string;
        // recordCount: number;
        // importType: ImportType;

        if (importMeta.value) {
          const meta = importMeta.value;
          // not await
          budgetApi.financeBudgetPresentationTableUpdateFileRecord({
            recordCode: meta.recordCode,
          });
        }

        setImportState(null);

        const codeIdsMap = submitRows
          .map((x) => x.code)
          .reduce((acc, cur) => {
            acc[cur] = true;
            return acc;
          }, {});
        const datamap = instance.getDataMap();
        datamap.forEach((row) => {
          if (!row.__isOriginRow && codeIdsMap[row.__code]) {
            row.__isOriginRow = row.__code;
          }
        });
        await sleep(500);
        isNotAutoSave && setTableLoading(`保存成功`, false);
        isNotAutoSave && clearTableLoading(1000);

        isSaving = false;
      } catch (e) {
        console.log('e=', e);
        const msg = e?.message || e;
        isNotAutoSave &&
          setTableLoading(
            `保存失败${msg ? `：${msg}` : ''}`,
            false,
            [
              {
                label: '知道了',
                cb: () => {
                  setTableLoading('');
                },
              },
            ],
            {
              color: 'red',
            }
          );

        isSaving = false;
        return Promise.reject(e);
      }
    }
  };

  const saveApi = async (params) => {
    if (isLocalhost) {
      console.log('params=', params);
    }
    if (params.isMock) {
      console.log('params=', params);
      return;
    }
    // console.log('params=', params);
    const buildFile = async () => {
      const jsonString = JSON.stringify(params);
      const blob = new Blob([jsonString], { type: 'application/text' });
      const userName = store?.userInfo?.name;
      // 替换点文件名字中的特殊字符
      const fileName = `预算编制表_${userName}_${detail.code}_${dayjs().format(
        'YYYYMMDDHHmmss'
      )}.json`.replace(/[\\/:*?"<>|]/g, '');
      const file = new File([blob], fileName, { type: 'application/text' });

      return { file, fileName };
    };

    const byJson = async () => {
      await budgetApi.financeBudgetPresentationTableSaveFillDetail(params);
    };
    const byFile = async () => {
      const { fileName, file } = await buildFile();
      const { jobId } = await uploadFileToOss({
        isSaveBudget: true,
        fileName,
        file,
        directory: '财务-预算编制表',
      });
      if (!jobId) {
        return Promise.reject('保存失败');
      }
      await new Promise(async (resolve, reject) => {
        while (1) {
          await sleep(2000);
          const token = getCookieToken();
          const res = await axios.get(
            `/api/finance/budget/presentation/table/saveFillDetailFileResult?saveJobId=${jobId}`,
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }
          );
          const code = res?.data?.code;
          if (+code === 200) {
            // 保存成功
            resolve();
            return;
          }
          if (+code === 11002001) {
            // 保存中
          } else {
            // 失败
            if (res.data?.message) {
              ElMessage.error(res.data?.message);
            } else {
              ElMessage.error('保存失败');
            }
            reject();
            return;
          }
        }
      });
    };
    if (params.rows.length >= 200) {
      await byFile();
    } else {
      await byJson();
    }
  };

  const getEnumValue = (colName: string, cellValue: any) => {
    return tableData.columnEnumsDetailMap[colName]?.[cellValue];
  };

  const validateMessages = ref<ValidateMessageItem[]>([]);

  const setValidateMessage = (rowCode: string, prop: string, value: any, message: string) => {
    if (!rowCode) {
      return;
    }
    const index = validateMessages.value.findIndex(
      (item) => item.rowCode === rowCode && item.prop === prop
    );
    if (!message) {
      if (index >= 0) {
        validateMessages.value.splice(index, 1);
      }
    } else if (index >= 0) {
      validateMessages.value[index].message = message;
      validateMessages.value[index].value = value;
    } else {
      validateMessages.value.push({ rowCode, prop, message, value });
    }
  };

  const getValidateMessage = (rowCode: string, prop: string) => {
    return validateMessages.value.find((item) => item.rowCode === rowCode && item.prop === prop);
  };

  const deleteCellsValidateMessage = (cells: Array<{ rowCode: string; prop: string }>) => {
    for (const cell of cells) {
      const index = validateMessages.value.findIndex(
        (item) => item.rowCode === cell.rowCode && item.prop === cell.prop
      );
      if (index >= 0) {
        validateMessages.value.splice(index, 1);
      }
    }
  };

  const deleteRowValidateMessage = (rowCode: string) => {
    validateMessages.value = validateMessages.value.filter((item) => item.rowCode !== rowCode);
  };

  const clearValidateMessages = () => {
    validateMessages.value = [];
  };

  const columnFilters = ref([]);

  const setColumnFilters = (filters) => {
    columnFilters.value = (filters || []).map((x) => {
      return {
        ...x,
        columnMeta: getColumn(x.column),
      };
    });
  };

  const userAction: BudgetStoreItem['userAction'] = {
    name: UserActionNames.None,
    callback: null,
  };
  const setUserActionName = (
    name: UserActionNames,
    callback: BudgetStoreItem['userAction']['callback']
  ) => {
    userAction.name = name;
    userAction.callback = callback;
  };

  const clearUserActionName = () => {
    userAction.name = UserActionNames.None;
    userAction.callback = null;
  };

  const undoLength = ref(0);
  const redoLength = ref(0);

  const updateUndoAvailable = (undo: number) => {
    undoLength.value = undo;
  };
  const updateRedoAvailable = (redo: number) => {
    redoLength.value = redo;
  };

  storeMap[code] = {
    code,
    _storeId: dayjs().format('YYYY-MM-DD HH:mm:ss'),
    tableData,
    detail,
    tableLoadingMessageIcon,
    tableLoadingMessage,
    tableLoadingActions,
    tableLoadingMessageStyle,
    setTableLoading,
    clearTableLoading,
    setTableRef,
    getHotInstance,
    destroyHotInstance,
    debounceRender,
    getSelectedLast,
    editChanges,
    hasChanges,
    addChanges,
    clearChanges,
    deleteChanges,
    importMeta,
    setImportState,
    setNeedSave,
    getTableChangeDataList,
    getTableDataList,
    needSave,
    save,
    saveApi,
    autoSave,
    getEnumValue,
    getColumn,
    validateMessages,
    storeTick,
    setValidateMessage,
    getValidateMessage,
    clearValidateMessages,
    deleteCellsValidateMessage,
    deleteRowValidateMessage,
    userAction,
    setUserActionName,
    clearUserActionName,
    undoLength,
    redoLength,
    updateUndoAvailable,
    updateRedoAvailable,
    columnFilters,
    setColumnFilters,
    isReadOnly: initOptions.isReadOnly,
  };
  return storeMap[code];
}

export function useBudgetStore(code: string): BudgetStoreItem {
  return storeMap[code] || {};
}

export function clearBudgetStore(code?: string) {
  console.log('clear store', code);
  if (code) {
    delete storeMap[code];
  } else {
    for (const key in storeMap) {
      storeMap[key] = null;
    }
  }
}
