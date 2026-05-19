<template>
  <div class="demand-list-content">
    <DemandListToolbar
      v-model="filterForm"
      :schemas="schemas"
      :total="total"
      @reset="handleReset"
      @create="handleCreateDemand"
      @keyword-clear="handleKeywordClear"
    />

    <DemandListTable
      ref="demandListTableRef"
      :columns="columns"
      :list="list"
      :loading="loading"
      :total="total"
      :page-num="pageNum"
      :page-size="pageSize"
      :biz-tab="workbenchStore.state.bizTab"
      :current-member-code="currentMemberCode"
      :condition-code="conditionCode"
      :custom-fields="customFieldList"
      :custom-fields-base="customFields"
      @detail="handleOpenDetail"
      @action="handleAction"
      @refresh="refreshAll"
      @condition-code-change="handleConditionCodeChange"
      @custom-fields-change="handleCustomFieldsChange"
      @page-num-change="setPageNum"
      @page-size-change="setPageSize"
      @sort-change="handleSortChange"
    />
    <ResultFeedbackDialog
      ref="resultFeedbackRef"
      @submit="handleResultFeedbackSubmit"
      :loading="operateLoading"
    />
    <ScoreDialog ref="scoreDialogRef" @submit="handleScoreSubmit" :loading="operateLoading" />
    <ResubmitDialog
      ref="interAuditConfirmRef"
      :is-inter-audit="true"
      :loading="interApproveLoading"
      @submit="handleInterAuditConfirmSubmit"
      @modify="onInterAuditConfirmModify"
      @cancel="onInterAuditConfirmCancel"
    />
  </div>
</template>

<script setup lang="ts">
  import { isEmpty } from 'lodash-es';
  import { useRoute, useRouter } from 'vue-router';
  import { useStore } from '@/store/modules/useStore';
  import { storeToRefs } from 'pinia';
  import { useDemandColumns } from '../../../hooks/useDemandColumns';
  import { useDemandFilters } from '../../../hooks/useDemandFilters';
  import { useDemandSort } from '../../../hooks/useDemandSort';
  import { useDemandTableQuery } from '../../../hooks/useDemandTableQuery';
  import { useApiLoadingGroup } from '../../../hooks/useApiLoadingGroup';
  import { useDemandListInterAuditActions } from '../../../hooks/useDemandListInterAuditActions';
  import { useDemandOperation } from '../../../legacy/composables/useDemandOperation';
  import ResultFeedbackDialog from '../../../legacy/components/common/ResultFeedbackDialog.vue';
  import ScoreDialog from '../../../legacy/components/common/ScoreDialog.vue';
  import { useDemandWorkbenchStore } from '../../../stores/useDemandWorkbenchStore';
  import ResubmitDialog from '../../../legacy/components/common/ResubmitDialog.vue';
  import type { DemandURQueryBean } from '@/api/platform/data-contracts';
  import DemandListTable from './DemandListTable.vue';
  import DemandListToolbar from './DemandListToolbar.vue';

  defineOptions({
    name: 'DemandList',
  });

  const emit = defineEmits<{
    detail: [demandCode: string];
  }>();

  const workbenchStore = useDemandWorkbenchStore();
  const userInfoStore = useStore();
  const { userInfo } = storeToRefs(userInfoStore);
  const router = useRouter();
  const route = useRoute();
  const currentMemberCode = computed(() => String(userInfo.value?.memberCode || ''));
  const { submitOperation } = useDemandOperation();
  const { isLoading, runWithLoading } = useApiLoadingGroup();
  const operateLoading = computed(() => isLoading('operate'));
  const interApproveLoading = computed(() => isLoading('interApprove'));
  const conditionCode = ref<string>();
  const customFieldList = ref<any[]>([]);
  const customFields = [
    {
      title: '基础字段',
      propertyArr: [
        { key: 'demandTitle', label: '需求标题', checked: true },
        { key: 'demandDesc', label: '需求描述', checked: true },
        { key: 'creatorName', label: '需求创建人', checked: true },
        { key: 'createTime', label: '需求创建时间', checked: true },
        { key: 'productLineDesc', label: '产品品线', checked: true },
        { key: 'categoryDesc', label: '产品分类', checked: true },
        { key: 'demandTypeDesc', label: '需求类型', checked: true },
        { key: 'demandPropertyDesc', label: '需求属性', checked: true },
        { key: 'handlerName', label: '需求执行人', checked: true },
        { key: 'statusDesc', label: '需求状态', checked: true },
      ],
    },
  ];

  const bizTabRef = computed(() => workbenchStore.state.bizTab);
  const visibleColumnKeys = computed(() => {
    if (isEmpty(customFieldList.value)) {
      return undefined;
    }
    const checkedArrList = customFieldList.value
      .map((item) => item?.checkedArr || [])
      .flat()
      .filter((key) => !!key);
    return isEmpty(checkedArrList) ? undefined : checkedArrList;
  });

  const { columns } = useDemandColumns(bizTabRef, visibleColumnKeys);
  const { schemas } = useDemandFilters(bizTabRef);
  const {
    loading,
    list,
    total,
    pageNum,
    pageSize,
    filterForm,
    runQuery,
    refreshTabCount,
    resetFilters,
    setPageNum,
    setPageSize,
    updateSort,
    refreshAll,
  } = useDemandTableQuery(bizTabRef);

  const { sortState, updateSortByTable } = useDemandSort([
    { field: 'demand.create_time', prop: 'createTime' },
  ]);

  const handleSortChange = async ({
    prop,
    order,
  }: {
    prop: string;
    order: 'ascending' | 'descending' | null;
  }) => {
    updateSortByTable(prop, order);
    await updateSort(sortState.value.orderField, sortState.value.orderType);
  };

  const handleCreateDemand = () => {
    workbenchStore.openSubmit();
    router.push({
      path: '/demand/submit/create',
      query: workbenchStore.toRouteQuery,
    });
  };

  const handleOpenDetail = (demandCode: string) => {
    emit('detail', demandCode);
  };
  const resultFeedbackRef = ref<any>(null);
  const scoreDialogRef = ref<any>(null);
  const interAuditConfirmRef = ref<any>(null);
  const demandListTableRef = useTemplateRef<any>('demandListTableRef');
  const actionRow = ref<DemandURQueryBean | null>(null);
  const {
    onInterAuditActionClick,
    onInterAuditConfirmSubmit,
    onInterAuditConfirmModify,
    onInterAuditConfirmCancel,
  } = useDemandListInterAuditActions({
    runWithLoading,
    refreshAll,
    openDetail: handleOpenDetail,
  });
  const handleInterAuditConfirmSubmit = async (row: DemandURQueryBean) => {
    const success = await onInterAuditConfirmSubmit(row);
    if (success) {
      interAuditConfirmRef.value?.close();
    }
  };
  const handleAction = ({
    key,
    row,
  }: {
    key: 'score' | 'feedback' | 'submitInterAudit' | 'resubmitInterAudit';
    row: DemandURQueryBean;
  }) => {
    actionRow.value = row;
    if (key === 'submitInterAudit') {
      onInterAuditActionClick('submitInterAudit');
      interAuditConfirmRef.value?.open(row);
      return;
    }
    if (key === 'resubmitInterAudit') {
      onInterAuditActionClick('resubmitInterAudit');
      interAuditConfirmRef.value?.open(row);
      return;
    }
    if (key === 'feedback') {
      resultFeedbackRef.value?.open(row);
      return;
    }
    scoreDialogRef.value?.open(row);
  };
  const handleResultFeedbackSubmit = async (row: { implementFlag: number; implementRemark?: string }) => {
    if (!actionRow.value?.demandCode) {
      return;
    }
    await runWithLoading('operate', () =>
      submitOperation('feedback', {
        demandCode: actionRow.value.demandCode,
        implementFlag: row.implementFlag,
        implementRemark: row.implementRemark,
      })
    );
    await refreshAll();
  };
  const handleScoreSubmit = async (row: { score: number; scoreReason?: string }) => {
    if (!actionRow.value?.demandCode) {
      return;
    }
    await runWithLoading('operate', () =>
      submitOperation('score', {
        demandCode: actionRow.value.demandCode,
        score: row.score,
        scoreReason: row.scoreReason,
      })
    );
    await refreshAll();
  };
  const handleConditionCodeChange = (value?: string) => {
    conditionCode.value = value;
  };
  const handleCustomFieldsChange = (value?: any[]) => {
    customFieldList.value = value || [];
  };
  const handleReset = async () => {
    const { keyword: _keyword, ...restQuery } = route.query;
    if (!isEmpty(_keyword)) {
      await router.replace({
        query: restQuery,
      });
    }
    await resetFilters();
    demandListTableRef.value?.clearSort?.();
    await runQuery();
  };
  const handleKeywordClear = async () => {
    const { keyword: _keyword, ...restQuery } = route.query;
    if (isEmpty(_keyword)) {
      return;
    }
    await router.replace({
      path: route.path,
      query: restQuery,
    });
  };

  // Sync data on changes
  watch(
    [() => workbenchStore.state.workTab, bizTabRef],
    async ([workTab, bizTab], [prevWorkTab, prevBizTab]) => {
      if (workTab !== 'list') {
        return;
      }

      const enteringList = prevWorkTab !== 'list';
      if (enteringList) {
        const shouldRefreshAfterDetail = sessionStorage.getItem('backFromDetail_5_0') === '1';
        if (shouldRefreshAfterDetail) {
          sessionStorage.removeItem('backFromDetail_5_0');
          await refreshAll();
          return;
        }
        const isListEmpty = isEmpty(list.value);
        const isCountEmpty = Object.values(workbenchStore.tabCountMap || {}).every(
          (value) => value === undefined
        );
        if (!isListEmpty && !isCountEmpty) {
          return;
        }
        await refreshAll();
        return;
      }

      if (bizTab !== prevBizTab) {
        demandListTableRef.value?.clearSort?.();
        await refreshAll();
      }
    }
  );

  onMounted(async () => {
    if (workbenchStore.state.workTab !== 'list') {
      return;
    }
    const queryKeyword = Array.isArray(route.query.keyword)
      ? route.query.keyword[0]
      : route.query.keyword;
    if (queryKeyword) {
      const keyword = String(queryKeyword);
      filterForm.value.keyword = decodeURIComponent(keyword);
    }

    if (workbenchStore.state.bizTab === 'all') {
      await refreshTabCount();
      const todoCount = Number(workbenchStore.tabCountMap.todo ?? 0);
      const mineCount = Number(workbenchStore.tabCountMap.mine ?? 0);
      const nextBizTab = todoCount > 0 ? 'todo' : mineCount > 0 ? 'mine' : 'all';

      if (nextBizTab !== workbenchStore.state.bizTab) {
        workbenchStore.setBizTab(nextBizTab);
        await router.replace({
          query: {
            ...route.query,
            ...workbenchStore.toRouteQuery,
          },
        });
        return;
      }

      await runQuery();
      return;
    }

    await refreshAll();
  });
</script>

<style scoped lang="scss">
  .demand-list-content {
    display: flex;
    flex-direction: column;
    min-height: 0;
    flex: 1;
  }
</style>
