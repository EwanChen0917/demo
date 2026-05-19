<template>
  <div class="budget-table-wrap" ref="tableWrapRef">
    <header>
      <div class="left">
        <el-space>
          <el-badge :is-dot="!!budgetStore.needSave" class="item" v-if="!isReadOnly">
            <el-button type="primary" :disabled="isLoading" @click="onSave">保存</el-button>
          </el-badge>
          <el-button v-if="!isReadOnly" type="primary" :disabled="isLoading" @click="onReport">
            上报
          </el-button>
          <el-button
            type="primary"
            v-if="!isReadOnly && (tableData.supportImport || isLocalhost)"
            :disabled="isLoading"
            @click="onImport"
          >
            导入
          </el-button>

          <el-button type="primary" :disabled="isLoading" @click="onExport">导出</el-button>

          <el-popover v-if="budgetStore.columnFilters?.length">
            <div style="max-width: 60vw; padding: 16px">
              <el-space wrap>
                <el-tag
                  v-for="item in budgetStore.columnFilters"
                  :key="item.column"
                  closable
                  @close="onRemoveColumnFilter(item)"
                >
                  {{ item?.columnMeta?.cellCnName }}
                </el-tag>
                <el-tag type="danger" style="cursor: pointer" @click="onClearColumnFilter(null)">
                  清空
                </el-tag>
              </el-space>
            </div>
            <template #reference>
              <el-button
                v-if="budgetStore.columnFilters?.length"
                type="warning"
                :disabled="isLoading"
              >
                过滤({{ budgetStore.columnFilters?.length }})
              </el-button>
            </template>
          </el-popover>

          <template v-if="!isReadOnly">
            <el-button-group>
              <!-- 撤销 -->
              <el-button :disabled="!budgetStore.undoLength" @click="onUndo">
                <i class="iconfont icon-chexiao" :class="{ disabled: !budgetStore.undoLength }"></i>
              </el-button>
              <!-- 重做 -->
              <el-button :disabled="!budgetStore.redoLength" @click="onRedo">
                <i
                  class="iconfont icon-zhongzuo"
                  :class="{ disabled: !budgetStore.redoLength }"
                ></i>
              </el-button>
            </el-button-group>
          </template>

          <el-button
            type="danger"
            plain
            v-if="budgetStore.validateMessages.length"
            @click="showValidateErrorPanel"
          >
            数据校验异常（{{ budgetStore.validateMessages.length }}）
          </el-button>

          <el-button v-if="isDevOrTestRole" type="danger" plain @click="onValidateCurrentTable">
            校验
          </el-button>
          <el-button
            v-if="isDevOrTestRole"
            type="danger"
            plain
            @click="onRefresh"
            title="仅刷新页面"
          >
            刷新
          </el-button>
          <el-button
            v-if="isDevOrTestRole"
            type="danger"
            plain
            @click="onRefreshClearCache"
            title="清除前后端枚举缓存"
          >
            清枚举缓存
          </el-button>
          <div>
            <!--    测试功能        -->
            <jump-column :budget-store="budgetStore" :table-data="tableData" />
          </div>
        </el-space>
      </div>
      <div class="center">
        <div @click="onClickTitle">
          <el-badge :is-dot="!!budgetStore.needSave" class="item">
            {{ tableTitle }}
          </el-badge>
        </div>
      </div>
      <div class="right" style="width: 128px"></div>
    </header>
    <div ref="tableBoxRef"></div>
  </div>
  <ValidateError ref="validateError" @view-to="onViewToCell" />
  <ColumnProperty ref="columnProperty" />
  <BudgetImport ref="budgetImport" @success="onImportSuccess" />
  <AboutEnum ref="aboutEnum" />
</template>

<script setup lang="ts">
  import { ElMessage } from 'element-plus';
  import { budgetApi } from '@/api';
  import ValidateError from '@/views/budget/budgetTable/components/ValidateError.vue';
  import ColumnProperty from '@/views/budget/budgetTable/components/ColumnProperty.vue';
  import { download } from '@/utils/download';
  import dayjs from 'dayjs';
  import {
    useColumnValidation,
    validateRequireCell,
    validateRows,
    validateTable,
  } from '@/views/budget/budgetTable/script/budgetValidator';
  import { computed } from 'vue';
  import {
    isDevOrTestRole,
    isLocalhost,
    isWebDev,
  } from '@/views/budget/budgetTable/script/variable';
  import * as swal from '@/utils/swal';
  import JumpColumn from '@/views/budget/budgetTable/components/JumpColumn.vue';
  import {
    BudgetCode,
    BudgetStoreItem,
    TableColumn,
    TableData,
    SaveTypes,
    ImportType,
    TableRow,
    BatchUpdateTypes,
  } from '@/views/budget/budgetTable/types/type';
  import { PresentationFillQueryDetailResp } from '@/api/budget/data-contracts';
  import BudgetImport from '@/views/budget/budgetTable/components/BudgetImport.vue';
  import {
    addBatchRenderDataList,
    RecordItem,
    syncUpdateDataImmediate,
  } from '@/views/budget/budgetTable/script/batchUpdate';
  import { useCustomRenderer } from '@/views/budget/budgetTable/script/budgetRender';
  import { useContextMenu } from '@/views/budget/budgetTable/script/budgetContextMenu';
  import { addTableEventListener } from '@/views/budget/budgetTable/script/budgetEvent';
  import { exportTableTemplate } from '@/views/budget/budgetTable/script/budgetExport';
  import { useSimpleFormula } from '@/views/budget/budgetTable/script/simple-formula';
  import { useStore } from '@/store/modules/useStore';
  import { runQueryBudgetApi } from '@/views/budget/budgetTable/script/budgetApiMap';
  import { sleep } from '@/views/budget/budgetTable/util/util';
  import { clearBudgetEnums } from '@/views/budget/budgetTable/util/loadEnum';
  import { BudgetSource } from '@/views/budget/enums/enums';
  import AboutEnum from '@/views/budget/budgetTable/components/AboutEnum.vue';
  import {
    buildFormulaConfig,
    buildTableConfig,
    getHeight,
    initDefaultValue,
    useWindowResized,
  } from './script/budgetTable';
  import { clearBudgetStore, createBudgetStore, useBudgetStore } from './script/budgetStore';

  const router = useRouter();
  const store = useStore();

  const emit = defineEmits<{
    (e: 'refresh'): void;
    (e: 'resetData', list: TableRow[], importType: ImportType): void;
  }>();

  const props = withDefaults(
    defineProps<{
      code: BudgetCode;
      worksheet: any[];
      tableTitle: string;
      budgetStoreItem: BudgetStoreItem;
    }>(),
    {
      code: '',
      worksheet: null,
      tableTitle: '',
    }
  );

  const budgetStore = props.budgetStoreItem;
  const { tableData } = budgetStore;
  const { detail: tableDetail } = budgetStore;
  const { isReadOnly } = budgetStore;

  const isTableLoaded = ref(false);

  onUnmounted(() => {
    budgetStore.destroyHotInstance();
    clearBudgetStore(props.code);
  });

  const isLoading = computed(() => {
    return !!budgetStore.tableLoadingMessage;
  });
  const canAddLine = computed(() => {
    return tableData.canAddLine;
  });

  const tableWrapRef = ref(null);

  onBeforeUnmount(() => {
    clearBudgetStore(props.code);
  });

  const save = async (code: BudgetCode, saveType: SaveTypes, isAutoSave: boolean) => {
    await budgetStore.save(code, saveType, isAutoSave);
  };

  const tableBoxRef = ref(null);

  // 监听窗口大小变化
  useWindowResized((height) => {
    const instance = budgetStore.getHotInstance();
    const tableHeight = height - 60;

    if (instance) {
      instance.updateSettings({
        height: tableHeight,
      });
    }
  });

  onMounted(async () => {
    // 从 Excel 的数据，创建 HandsonTable 的配置对象
    const config = buildTableConfig(
      props.code,
      props.worksheet,
      tableData,
      tableDetail,
      budgetStore,
      {
        readOnly: isReadOnly,
      }
    );
    const tableInitHeight = getHeight();
    if (tableInitHeight) {
      config.height = tableInitHeight - 60;
    }

    useContextMenu(props.code, config, tableData, tableDetail, {
      readOnly: isReadOnly,
      onShowColumnProperty,
      webDevToEditMode,
      onShowEnum,
    });

    // 监听表格的事件
    addTableEventListener(config, budgetStore);

    // 自定义渲染器
    useCustomRenderer(config, tableData);

    // 校验器
    useColumnValidation(tableData.columns, config, budgetStore);

    budgetStore.setTableLoading('表格渲染...');

    const instance = Handsontable(tableBoxRef.value, config);
    budgetStore.setTableRef(instance);

    const formulaConfig = buildFormulaConfig({
      tableCode: props.code,
      tableData,
      isReadOnly,
      tableDetail,
    });

    const simple = useSimpleFormula(instance, formulaConfig);

    instance.simpleFormula = simple;

    await sleep(10);
    if (!isReadOnly) {
      budgetStore.setTableLoading('计算默认值...');

      await sleep(10);

      initDefaultValue(
        props.code,
        tableData.dataStartRowIndex,
        instance.countRows(),
        tableData.columns
      );
    }

    budgetStore.setTableLoading('公式计算中...');

    await sleep(10);

    if (isReadOnly) {
      simple.calcTableStatistics();
    } else {
      console.time('初始化的公式计算');
      simple.calcTableEmptyCells(undefined, undefined, null, null);
      console.timeEnd('初始化的公式计算');

      console.time('立即同步公式计算结果到table1');
      syncUpdateDataImmediate(true);
      console.timeEnd('立即同步公式计算结果到table1');

      console.time('赋值默认值');
      simple.calcTableDefaultValue();
      console.timeEnd('赋值默认值');

      budgetStore.setTableLoading('计算结果渲染中...');
      await sleep(10);

      console.time('立即同步公式计算结果到table2');
      syncUpdateDataImmediate(true);
      console.timeEnd('立即同步公式计算结果到table2');
    }

    if (budgetStore.importMeta) {
      budgetStore.setTableLoading('导入数据校验中...');
      validateCurrentTable();
    }
    budgetStore.clearTableLoading(200);

    isTableLoaded.value = true;
  });

  const validateCurrentTable = async () => {
    const instance = useBudgetStore(props.code).getHotInstance();
    const startRow = tableData.dataStartRowIndex;
    const endRow = instance?.countRows?.() || 0;
    for (let row = startRow; row < endRow; row++) {
      validateRows(budgetStore.code, [row]);
      await sleep(5);
    }
  };
  const onValidateCurrentTable = async () => {
    budgetStore.setTableLoading('数据校验中...');
    await validateCurrentTable();
    budgetStore.clearTableLoading(200);
  };

  const route = useRoute();

  const query = computed(() => {
    return route.query;
  });
  const onSave = () => {
    save(props.code, SaveTypes.Auto, false);
  };
  const budgetImport = ref(null);
  const onImport = () => {
    if (budgetStore.needSave) {
      ElMessage.error('请先保存');
      return;
    }
    budgetImport.value.showModal(props.code, tableData, buildExportParams);
  };
  const onImportSuccess = (list: TableRow[], type: ImportType, importMeta: ImportMeta) => {
    budgetStore.setImportState(importMeta);
    emit('resetData', list, type, importMeta);
  };

  const buildExportParams = () => {
    return {
      code: query.value.code,
      budgetGroup: query.value.budgetGroup,
      nowStepCode: query.value.fromStepCode || query.value.nowStepCode,
      schemeCode: query.value.schemeCode,
      pageNum: 1,
      pageSize: 1e6,
    };
  };

  const onExport = async () => {
    try {
      const { schemeCode } = query.value;
      if (schemeCode) {
        const res = await budgetApi.financeBudgetPresentationTableDetailExportFileAsync(
          buildExportParams()
        );
        const isConfirmedSwitch = await swal.confirm({
          title: '导出成功，具体请前往下载中心查看',
          icon: 'success',
          confirmButtonText: '去查看',
          cancelButtonText: '知道了',
        });
        if (isConfirmedSwitch) {
          router.push({
            path: '/downloadmanage',
            query: {
              app_code: res?.appCode,
              module_code: res?.moduleCode,
              record_type: 2,
            },
          });
        }
      } else {
        ElMessage.error('导出失败');
      }
    } catch (e) {
      ElMessage.error('导出失败');
    }
  };
  const onClearColumnFilter = () => {
    const instance = budgetStore.getHotInstance();
    if (!instance) {
      return;
    }
    const filterPlugin = instance.getPlugin('Filters');
    if (!filterPlugin) {
      return;
    }
    filterPlugin.clearConditions?.();
    filterPlugin.filter();

    const newFilterList = filterPlugin.exportConditions();
    budgetStore.setColumnFilters(newFilterList);
  };
  const onRemoveColumnFilter = (item) => {
    if (!item.column) {
      return;
    }
    const instance = budgetStore.getHotInstance();
    if (!instance) {
      return;
    }
    const filterPlugin = instance.getPlugin('Filters');
    if (!filterPlugin) {
      return;
    }
    filterPlugin.removeConditions?.(item.column);
    filterPlugin.filter();

    const newFilterList = filterPlugin.exportConditions();
    budgetStore.setColumnFilters(newFilterList);
    // instance.render();
  };

  const onUndo = () => {
    budgetStore.getHotInstance()?.undo?.();
  };
  const onRedo = () => {
    budgetStore.getHotInstance()?.redo?.();
  };

  const onRefresh = async () => {
    await sleep(500);
    emit('refresh');
  };

  const onRefreshClearCache = async () => {
    ElMessage.warning('请稍等...');
    // 清空后端枚举缓存
    await budgetApi.financeBudgetPresentationTableRefreshFillEnums();
    // 清空前端枚举缓存
    clearBudgetStore(props.code);
    ElMessage.success('已清空缓存');
  };

  const onReport = async () => {
    if (!isTableLoaded.value) {
      ElMessage.error('请等待数据加载完成');
      return;
    }
    const instance = budgetStore.getHotInstance();
    const { data: allRows } = budgetStore.getTableDataList();

    const { columns } = budgetStore.tableData;

    let invalidCell = validateRequireCell(budgetStore.code, allRows, columns);
    if (!invalidCell) {
      // 数据校验
      invalidCell = validateTable(allRows, columns);
    }
    if (invalidCell) {
      const { col, rowIndex, message } = invalidCell;
      ElMessage.error(message);

      instance.scrollViewportTo(
        {
          row: rowIndex,
          col: instance.propToCol(col),
          verticalSnap: 'center',
          horizontalSnap: 'center',
        },
        () => {
          instance.selectCell(rowIndex, instance.propToCol(col));
        }
      );
      return;
    }

    if (budgetStore.needSave) {
      ElMessage.error('请先保存');
      return;
    }
    const isConfirmed = await swal.reportConfirm(
      '预算表单上报后，不可撤销修改。若需修改，仅可由分发人打回。是否确认上报？'
    );
    if (!isConfirmed) return;
    const { code } = props;
    const res = await budgetApi.financeBudgetPresentationSubmit({
      codeList: [code],
      remark: document.getElementById('report_reason').value,
      requestEntrance: 2, // 请求入口 0-预算方案 1-预算编制 2-预算编制台
    });
    if (res) {
      ElMessage.success('上报成功');
      // url中的 status 改为3 ，然后刷新页面
      router.replace({
        query: {
          ...query.value,
          status: 3,
        },
      });
    }
  };

  const validateError = ref(null);
  const showValidateErrorPanel = () => {
    validateError.value.showDrawer(props.code);
  };

  const onViewToCell = (row: number, prop: string) => {
    const instance = budgetStore.getHotInstance();
    const visualRow = instance.toVisualRow(row);
    instance.scrollViewportTo(
      {
        row: visualRow,
        col: instance.propToCol(prop),
        verticalSnap: 'top',
        horizontalSnap: 'start',
      },
      () => {
        instance.selectCell(visualRow, instance.propToCol(prop));
      }
    );
  };
  const columnProperty = ref(null);

  function onShowColumnProperty(column: TableColumn, cell: any) {
    columnProperty.value.showDrawer(props.code, column, cell);
  }

  const aboutEnum = ref(null);
  function onShowEnum(column: TableColumn, _row?: number) {
    aboutEnum.value.showDrawer(props.code, column, _row);
  }

  // 开发模式使用
  function webDevToEditMode() {
    router.replace({
      query: {
        ...query.value,
        source: BudgetSource.预算编制台,
        status: 2,
      },
    });
  }

  async function onClickTitle(ev: MouseEvent) {
    if (ev.shiftKey) {
      const isConfirmed = await swal.confirm(
        `${isDevOrTestRole ? '退出' : '进入'}调试模式，即将【刷新】页面，是否继续？`
      );
      if (!isConfirmed) {
        return;
      }
      localStorage.setItem('isDevOrTestRole', isDevOrTestRole ? '' : '1');
      location.reload();
    }
    if (ev.shiftKey && ev.altKey && ev.ctrlKey) {
      const isConfirmed = await swal.confirm(
        `${isWebDev ? '退出' : '进入'}开发模式，即将【刷新】页面，是否继续？`
      );
      if (!isConfirmed) {
        return;
      }

      localStorage.setItem('isDevOrTestRole', isWebDev ? '' : '1');
      localStorage.setItem('isWebDev', isWebDev ? '' : '1');

      location.reload();
    }
  }
</script>

<style lang="scss">
  .htFiltersMenuValue {
    .htUIMultipleSelectHot {
      min-height: 150px !important;
      height: auto !important;
    }
  }
</style>

<style scoped lang="scss">
  .budget-table-wrap {
    height: 100%;
    display: flex;
    flex-direction: column;
    position: relative;

    :deep(.ht-theme-main-dark-auto) {
      --border-color: #c4c4c4;

      --ht-border-color: var(--border-color) !important;
      --ht-cell-horizontal-border-color: var(--border-color) !important;
      --ht-cell-vertical-border-color: var(--border-color) !important;
    }

    > header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 6px 10px;

      .left {
        .icon-chexiao,
        .icon-zhongzuo {
          font-weight: bolder;
          color: #222;

          &.disabled {
            color: #ccc;
          }
        }
      }

      .center {
        font-size: 16px;
        font-weight: 500;
        text-align: center;
      }
    }

    :deep(td) {
      border-radius: 0 !important;
      word-break: keep-all;
      white-space: nowrap;
      text-overflow: ellipsis;
    }

    :deep(.disable-select-merge-cell) {
      pointer-events: none;
    }
  }

  :deep(.wtHolder) {
    --color-scrollbar: #a0a0a0;
    --color-scrollbar-hover: #000000;
    // 滚动条滑块样式
    &::-webkit-scrollbar-thumb {
      background-color: var(--color-scrollbar) !important;

      &:hover {
        background-color: var(--color-scrollbar-hover) !important;
      }
    }

    // 滚动条轨道样式
    &::-webkit-scrollbar {
      width: 12px;
      height: 12px;
    }

    // Firefox滚动条
    scrollbar-color: var(--color-scrollbar) transparent !important;
    scrollbar-width: thin !important;
    // 其他浏览器
    -ms-overflow-style: none !important;
  }

  :deep(.icon-qa) {
    width: 14px;
    height: 14px;
    font-style: normal;
    font-size: 12px;
    display: inline-flex;
    margin-left: 6px;
    align-items: center;
    justify-content: center;
    border-radius: 50%;
    background-color: var(--el-color-primary);
    color: #fff;
    cursor: pointer;
  }

  // 自定义插件的样式
  .htSelectEditor {
    /*
* This hack enables to change <select> dimensions in WebKit browsers
*/
    -webkit-appearance: menulist-button !important;
    position: absolute;
    width: auto;
    z-index: 300;
  }

  :deep(.htAutocompleteArrow) {
    display: none;
  }

  :deep(.autocompleteEditor) {
    min-width: 150px;

    .wtHider {
      min-width: 150px !important;
      width: unset !important;

      .rowHeader {
        min-width: 140px !important;
      }
    }
  }

  :deep(.htFiltersActive) {
    .changeType {
      background-color: var(--el-color-primary);

      &:before {
        color: #fff;
      }
    }
  }

  //$fixed-border: 1px solid #d5d5d5;
  //
  //:deep(.ht_clone_inline_start.ht_clone_left.handsontable) {
  //  table {
  //    border-right: $fixed-border;
  //  }
  //}
  //:deep(.ht_clone_top_inline_start_corner.ht_clone_top_left_corner.handsontable) {
  //  table {
  //    border-right: $fixed-border;
  //  }
  //}

  :deep(.must-fill-icon) {
    color: red;
    padding: 0 0 0 4px;
    font-size: 20px;
    position: relative;
    top: 2px;
  }

  :deep(.select-arrow-icon-box) {
    display: flex;
    justify-content: space-between;
    align-content: center;
    gap: 6px;

    span {
      min-width: 0;
      flex: 1;
      overflow: hidden;
      text-overflow: ellipsis;
    }

    i {
      padding: 0 5px;
      color: #a5a5a5;
      font-size: 9px;
      cursor: pointer;
      position: relative;
      right: -5px;
      border-radius: 3px;

      &:hover {
        color: var(--el-color-primary);
        background-color: var(--el-color-primary-light-9);
      }
    }
  }
</style>
