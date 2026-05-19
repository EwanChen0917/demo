<template>
  <div class="budget-table-index" :style="{ height: height }">
    <div v-if="loading"></div>
    <div class="budget-table-main" v-else-if="data.tableSheets?.value?.[0]">
      <Table
        v-if="!loading"
        :code="code"
        :key="data.budgetStore?.storeTick"
        :worksheet="data.tableSheets.value[0]"
        :tableTitle="data.tableTitle.value"
        :budgetStoreItem="data.budgetStore"
        @refresh="getData"
        @reset-data="onResetData"
      />
    </div>
    <div v-else class="table-empty" @click="toDevEditMode">
      <EmptyAnimation name="listEmpty" :width="128" :height="128" />
      <div class="table-empty-tip">表格加载错误！</div>
    </div>
    <div v-if="data?.budgetStore?.tableLoadingMessage" class="table-loading">
      <div v-if="data.budgetStore.tableLoadingMessageIcon" class="loading-icon"></div>
      <div :style="data.budgetStore.tableLoadingMessageStyle">
        {{ data.budgetStore.tableLoadingMessage }}
      </div>
      <div v-if="data.budgetStore.tableLoadingActions.length" class="actions">
        <el-button
          v-for="item in data.budgetStore.tableLoadingActions"
          :key="item.label"
          :type="item.type || 'primary'"
          @click="item.cb()"
        >
          {{ item.label }}
        </el-button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts" name="budgetTable">
  // eslint-disable-next-line import/extensions
  import './handsontable/handsontable.full.js';
  import './handsontable/handsontable.css';
  import './handsontable/ht-theme-main.css';
  import {
    clearBudgetStore,
    createBudgetStore,
    useBudgetStore,
  } from '@/views/budget/budgetTable/script/budgetStore';
  import { BudgetRole, BudgetSource, DraftStatusNo, NowStepCode } from '@/views/budget/enums/enums';
  import { useWindowResized } from '@/views/budget/budgetTable/script/budgetTable';
  import * as swal from '@/utils/swal';

  import {
    ImportType,
    SaveTypes,
    TableRow,
    UrlQueryParams,
  } from '@/views/budget/budgetTable/types/type';
  import { useLoadData } from '@/views/budget/budgetTable/script';
  import { isLocalhost, isWebDev } from './script/variable';
  import Table from './Table.vue';
  import './plugins/custom-plugin.scss';

  // Handsontable.registerAllModules();
  const router = useRouter();
  const route = useRoute();
  const loading = ref(false);
  const data = shallowRef({
    budgetStore: null,
  });

  const query = computed<UrlQueryParams>(() => {
    return route.query;
  });

  const code = computed(() => {
    return query.value.code || query.value.schemeCode;
  });

  const getData = async () => {
    const tempStore = createBudgetStore('temp', {}, {}, {});
    data.value.budgetStore = tempStore;
    const { getDataForReadonly, getDataForEdit } = useLoadData(code.value, query.value, tempStore);
    loading.value = true;
    try {
      const source = +query.value.source;
      const status = +query.value.status;
      const parentStatus = +query.value.rootStatus;
      const nowStepCode = +query.value.nowStepCode;
      const fromStepCode = +query.value.fromStepCode;
      const budgetRole = +query.value.budgetRole;
      if (source === BudgetSource.预算方案) {
        data.value = await getDataForReadonly();
      } else if (source === BudgetSource.预算方案进度详情) {
        if (nowStepCode === NowStepCode.一稿) {
          if (status === DraftStatusNo.已上报) {
            data.value = await getDataForReadonly();
          } else if (budgetRole === BudgetRole.个人) {
            data.value = await getDataForEdit(null, ImportType.None, null, true);
          } else {
            data.value = await getDataForReadonly();
          }
        } else if (nowStepCode === NowStepCode.二稿) {
          if (status === DraftStatusNo.未开始 || status === DraftStatusNo.已上报) {
            data.value = await getDataForReadonly();
          } else if (fromStepCode === NowStepCode.一稿) {
            data.value = await getDataForReadonly();
          } else if (budgetRole === BudgetRole.个人) {
            data.value = await getDataForEdit(null, ImportType.None, null, true);
          } else {
            data.value = await getDataForReadonly();
          }
        } else if (nowStepCode === NowStepCode.三稿) {
          if (status === DraftStatusNo.未开始 || status === DraftStatusNo.已上报) {
            data.value = await getDataForReadonly();
          } else if (fromStepCode === NowStepCode.一稿 || fromStepCode === NowStepCode.二稿) {
            data.value = await getDataForReadonly();
          } else if (budgetRole === BudgetRole.个人) {
            data.value = await getDataForEdit(null, ImportType.None, null, true);
          } else {
            data.value = await getDataForReadonly();
          }
        }
      } else if (source === BudgetSource.预算编制管理) {
        data.value = await getDataForReadonly();
      } else if (source === BudgetSource.预算编制管理进度详情) {
        if (nowStepCode === NowStepCode.一稿) {
          if (parentStatus === DraftStatusNo.已上报) {
            data.value = await getDataForReadonly();
          } else if (status === DraftStatusNo.未开始) {
            data.value = await getDataForReadonly();
          } else if (budgetRole === BudgetRole.个人) {
            data.value = await getDataForEdit(null, ImportType.None, null, true);
          } else {
            data.value = await getDataForReadonly();
          }
        } else if (nowStepCode === NowStepCode.二稿) {
          if (parentStatus === DraftStatusNo.未开始 || parentStatus === DraftStatusNo.已上报) {
            data.value = await getDataForReadonly();
          } else if (status === DraftStatusNo.未开始) {
            data.value = await getDataForReadonly();
          } else if (fromStepCode === NowStepCode.一稿) {
            data.value = await getDataForReadonly();
          } else if (budgetRole === BudgetRole.个人) {
            data.value = await getDataForEdit(null, ImportType.None, null, true);
          } else {
            data.value = await getDataForReadonly();
          }
        } else if (nowStepCode === NowStepCode.三稿) {
          if (parentStatus === DraftStatusNo.未开始 || parentStatus === DraftStatusNo.已上报) {
            data.value = await getDataForReadonly();
          } else if (status === DraftStatusNo.未开始) {
            data.value = await getDataForReadonly();
          } else if (fromStepCode === NowStepCode.一稿 || fromStepCode === NowStepCode.二稿) {
            data.value = await getDataForReadonly();
          } else if (budgetRole === BudgetRole.个人) {
            data.value = await getDataForEdit(null, ImportType.None, null, true);
          } else {
            data.value = await getDataForReadonly();
          }
        }
      } else if (source === BudgetSource.预算编制台) {
        if (status === DraftStatusNo.已上报) {
          data.value = await getDataForReadonly();
        } else {
          data.value = await getDataForEdit(null, ImportType.None, null, true);
        }
      }
    } catch (e) {
      console.log('e=', e);
    }
    loading.value = false;
  };

  const onResetData = async (list: TableRow[], type: ImportType, importMeta: ImportMeta) => {
    const tempStore = createBudgetStore('temp', {}, {}, {});
    data.value.budgetStore = tempStore;
    const { getDataForReadonly, getDataForEdit } = useLoadData(code.value, query.value, tempStore);
    loading.value = true;
    data.value = await getDataForEdit(list, type, importMeta, true);
    loading.value = false;
  };

  onMounted(() => {
    getData();
  });

  const height = ref('auto');
  useWindowResized((h) => {
    height.value = `${h - 16}px`;
  });

  onUnmounted(() => {
    clearBudgetStore();
  });

  onBeforeRouteLeave(async (_, __, next) => {
    const budgetStore = useBudgetStore(code.value);
    if (budgetStore.needSave) {
      budgetStore.save(code.value, SaveTypes.Auto, true);
      const isConfirmed = await swal.confirm({
        title: '请确认数据已保存，是否继续离开？',
        confirmButtonText: '离开',
        cancelButtonText: '取消',
      });
      if (isConfirmed) {
        next();
      }
    } else {
      next();
    }
  });

  const toDevEditMode = async () => {
    if (isLocalhost || isWebDev) {
      const isConfirmed = await swal.confirm(
        `仅在Localhost生效的功能：进入编辑模式。是否刷新页面？`
      );
      if (!isConfirmed) {
        return;
      }
      router.replace({
        query: {
          ...query.value,
          source: BudgetSource.预算编制台,
          status: 2,
        },
      });
    }
  };
</script>

<style scoped lang="scss">
  .budget-table-index {
    background: #fff;
    display: flex;
    flex-direction: column;
    position: relative;
    .table-loading {
      position: absolute;
      z-index: 9999;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      min-width: 200px;
      min-height: 100px;
      background-color: #fff;
      border-radius: 10px;
      border: 1px solid var(--el-color-primary);
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      color: var(--el-color-primary);
      padding: 10px;

      .loading-icon {
        width: 100px;
        height: 50px;
        background-image: url(/src/assets/images/icon/loading.webp);
        background-size: 58px 27px;
        background-repeat: no-repeat;
        background-position: center;
        z-index: 99999999;
      }

      .actions {
        margin-top: 10px;
      }
    }
  }

  .budget-table-main {
    min-height: 0;
    flex: 1;
  }

  :deep(.o-read) {
    background-color: #f7f7f7 !important;
  }

  .table-empty {
    height: 80vh;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;

    .table-empty-tip {
      margin-top: -20px;
      color: rgb(153, 153, 153);
      font-size: 14px;
    }
  }
</style>
