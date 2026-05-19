<template>
  <KeenList
    custom-height
    auto-custom-fields
    custom-fields-platform="lute_erp"
    :condition-code="conditionCode"
    :custom-fields="customFields"
    :custom-fields-base="customFieldsBase"
    @update:condition-code="(value) => emit('conditionCodeChange', value)"
    @update:custom-fields="(value) => emit('customFieldsChange', value)"
    @refresh="emit('refresh')"
  >
    <template #default="{ tableHeight }">
      <el-table
        ref="tableRef"
        :data="list"
        stripe
        :height="tableHeight"
        v-loading="loading"
        @sort-change="handleSortChange"
      >
        <el-table-column fixed="left" label="需求标题" prop="demandTitle" min-width="220">
          <template #default="{ row }">
            <a class="dm5-link" @click="emit('detail', row.demandCode)">
              {{ row.demandTitle || '--' }}
            </a>
          </template>
        </el-table-column>
        <el-table-column
          v-for="column in columnsWithoutTitle"
          :key="column.key"
          :label="column.label"
          :prop="column.key"
          :min-width="column.minWidth"
          :width="column.width"
          :fixed="column.key === 'statusDesc' ? 'right' : undefined"
          :sortable="column.sortable ? 'custom' : false"
          show-overflow-tooltip
        >
          <template #default="{ row }">
            <el-tag
              v-if="column.key === 'statusDesc'"
              class="dm5-status-tag"
              :class="resolveStatusClass(row)"
              effect="dark"
            >
              {{ resolveStatusText(row) }}
            </el-tag>
            <template v-else>{{ resolveCellText(row, column) }}</template>
          </template>
        </el-table-column>
        <el-table-column fixed="right" label="操作" width="220">
          <template #default="{ row }">
            <el-button
              v-if="bizTab !== 'todo' || [6, 7].includes(Number(row.status))"
              type="primary"
              link
              @click="emit('detail', row.demandCode)"
            >
              查看详情
            </el-button>
            <el-button
              v-if="bizTab === 'todo' && ![6, 7].includes(Number(row.status))"
              type="warning"
              link
              @click="emit('detail', row.demandCode)"
            >
              去处理
            </el-button>
            <el-button
              v-if="Number(row.status) === 6 && isCurrentUserDemand(row)"
              type="primary"
              link
              @click="emit('action', { key: 'score', row })"
            >
              去评分
            </el-button>
            <el-button
              v-if="Number(row.status) === 7 && (isCurrentUserDemand(row) || isCurrentUserInRelMembers(row))"
              type="primary"
              link
              @click="emit('action', { key: 'feedback', row })"
            >
              结果反馈
            </el-button>
            <el-button
              v-if="isLocalhost"
              type="info"
              link
              @click="openLegacyDingTalkDetail(row)"
            >
              待办详情
            </el-button>
            <el-button
              v-if="false"
              type="danger"
              link
              @click="emit('action', { key: 'submitInterAudit', row })"
            >
              提交内审
            </el-button>
            <el-button
              v-if="false"
              type="danger"
              link
              @click="emit('action', { key: 'resubmitInterAudit', row })"
            >
              重新提交
            </el-button>
          </template>
        </el-table-column>
      </el-table>
      <KeenPagination
        :current="pageNum"
        :page-size="pageSize"
        :total="total"
        :page-size-option="[10, 20, 50, 100]"
        @size-change="(value) => emit('pageSizeChange', value)"
        @current-change="(value) => emit('pageNumChange', value)"
      />
    </template>
  </KeenList>
</template>

<script setup lang="ts">
  import { AuditStatusClassMap, AuditStatusMap } from '../../../constants/demandEnums';
  import type { DemandURQueryBean } from '@/api/platform/data-contracts';
  import type { DemandColumnSchema } from '../../../hooks/useDemandColumns';
  import type { DemandWorkbenchBizTab } from '../../../types/workbench';

  const props = defineProps<{
    columns: DemandColumnSchema[];
    list: DemandURQueryBean[];
    loading: boolean;
    total: number;
    pageNum: number;
    pageSize: number;
    bizTab: DemandWorkbenchBizTab;
    currentMemberCode?: string;
    conditionCode?: string;
    customFields?: any[];
    customFieldsBase?: any[];
  }>();

  const emit = defineEmits<{
    detail: [demandCode: string];
    action: [
      payload: {
        key: 'score' | 'feedback' | 'submitInterAudit' | 'resubmitInterAudit';
        row: DemandURQueryBean;
      }
    ];
    refresh: [];
    conditionCodeChange: [value?: string];
    customFieldsChange: [value?: any[]];
    pageNumChange: [pageNum: number];
    pageSizeChange: [pageSize: number];
    sortChange: [payload: { prop: string; order: 'ascending' | 'descending' | null }];
  }>();

  const columnsWithoutTitle = computed(() =>
    props.columns.filter((column) => column.key !== 'demandTitle')
  );
  const tableRef = ref<any>(null);
  const isLocalhost = computed(() => window.location.hostname === 'localhost');

  const resolveCellText = (row: DemandURQueryBean, column: DemandColumnSchema) => {
    if (column.formatter) {
      return column.formatter(row);
    }
    const value = (row as any)[column.key];
    return value === undefined || value === null || value === '' ? '--' : value;
  };

  const resolveStatusClass = (row: DemandURQueryBean) => {
    const status = Number((row as any).status ?? -1) as keyof typeof AuditStatusClassMap;
    return AuditStatusClassMap[status] || '';
  };

  const resolveStatusText = (row: DemandURQueryBean) => {
    const status = Number((row as any).status ?? -1) as keyof typeof AuditStatusMap;
    const text = (row as any).statusDesc || AuditStatusMap[status];
    return text || '--';
  };

  const isCurrentUserDemand = (row: DemandURQueryBean) => {
    const currentMemberCode = `${props.currentMemberCode || ''}`;
    const creatorMemberCode = `${(row as any).creator || ''}`;
    return Boolean(currentMemberCode) && currentMemberCode === creatorMemberCode;
  };

  const isCurrentUserInRelMembers = (row: DemandURQueryBean) => {
    const currentMemberCode = `${props.currentMemberCode || ''}`.trim();
    if (!currentMemberCode) {
      return false;
    }
    const relMemberCodeList = (row as any).relMemberCodeList;
    if (Array.isArray(relMemberCodeList)) {
      return relMemberCodeList.map((item) => `${item || ''}`.trim()).includes(currentMemberCode);
    }
    if (typeof relMemberCodeList === 'string') {
      return relMemberCodeList
        .split(',')
        .map((item) => item.trim())
        .filter(Boolean)
        .includes(currentMemberCode);
    }
    return false;
  };

  const handleSortChange = ({
    prop,
    order,
  }: {
    prop: string;
    order: 'ascending' | 'descending' | null;
  }) => {
    emit('sortChange', { prop, order });
  };

  const clearSort = () => {
    tableRef.value?.clearSort?.();
  };

  const resolveDingTalkEntryScene = (row: DemandURQueryBean) => {
    const status = Number((row as any).status ?? 0);
    if ([3, 4, 5].includes(status) || props.bizTab === 'todo') {
      return 'execute';
    }
    return 'detail';
  };

  const openLegacyDingTalkDetail = (row: DemandURQueryBean) => {
    const demandCode = `${row.demandCode || ''}`;
    if (!demandCode) {
      return;
    }
    const entryScene = resolveDingTalkEntryScene(row);
    const searchParams = new URLSearchParams({
      view: 'list',
      workTab: 'detail',
      bizTab: props.bizTab,
      entryScene,
      demandCode,
    });
    window.open(
      `/demandMangeExecute/dingTalkDetail/${demandCode}?${searchParams.toString()}`,
      '_blank'
    );
  };

  defineExpose({
    clearSort,
  });
</script>

<style scoped lang="scss">
  @use '../../../styles/status-tag.scss' as *;

  .dm5-link {
    color: #02b96b;
    font-weight: 600;
    cursor: pointer;
    text-decoration: none;
  }
</style>
