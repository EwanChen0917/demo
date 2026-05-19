<template>
  <section class="dm5-workbench-container">
    <header class="dm5-workbench-header">
      <!-- Main Work View Switcher -->
      <div class="work-view-selector">
        <div
          v-for="item in visibleWorkTabOptions"
          :key="item.key"
          class="work-view-item"
          :class="{ active: workbenchStore.state.workTab === item.key }"
          @click="handleWorkTabChange(item.key)"
        >
          <span class="dot"></span>
          {{ item.label }}
        </div>
      </div>

      <!-- Sub-Tabs for List View ONLY -->
      <div v-if="workbenchStore.state.workTab === 'list'" class="biz-tab-selector">
        <el-tabs
          :model-value="workbenchStore.state.bizTab"
          class="dm5-biz-inner-tabs"
          @update:model-value="handleBizTabChange"
        >
          <el-tab-pane
            v-for="item in demandWorkbenchBizTabOptions"
            :key="item.key"
            :name="item.key"
            :label="resolveBizTabLabel(item.key, item.label)"
          />
        </el-tabs>
      </div>
    </header>

    <main class="dm5-workbench-main">
      <DemandListContent
        v-show="workbenchStore.state.workTab === 'list'"
        class="sub-page-wrapper"
        @detail="handleOpenDetail"
      />
      <DemandSubmitPage
        v-if="mountedWorkTabs.submit"
        v-show="workbenchStore.state.workTab === 'submit'"
        class="sub-page-wrapper"
      />
      <DemandDetailPage
        v-if="mountedWorkTabs.detail"
        v-show="workbenchStore.state.workTab === 'detail'"
        :demand-code="workbenchStore.state.demandCode"
        class="sub-page-wrapper"
      />
    </main>
    <SurveyFeedback />
  </section>
</template>

<script setup lang="ts">
  import { isNil } from 'lodash-es';
  import { useRouter } from 'vue-router';
  import {
    demandWorkbenchBizTabOptions,
    demandWorkbenchWorkTabOptions,
  } from '../../constants/demandEnums';
  import { useDemandWorkbenchStore } from '../../stores/useDemandWorkbenchStore';
  import type { DemandWorkbenchBizTab, DemandWorkbenchWorkTab } from '../../types/workbench';
  import DemandDetailPage from '../detail/DemandDetailPage.vue';
  import DemandSubmitPage from '../submit/DemandSubmitPage.vue';
  import SurveyFeedback from '../../legacy/components/SurveyFeedback.vue';
  import DemandListContent from './components/DemandListContent.vue';

  defineOptions({
    name: 'DemandListPage',
  });

  const workbenchStore = useDemandWorkbenchStore();
  const router = useRouter();
  const mountedWorkTabs = reactive({
    submit: false,
    detail: false,
  });
  const visibleWorkTabOptions = computed(() =>
    demandWorkbenchWorkTabOptions.filter(
      (item) => item.key === 'list' || item.key === workbenchStore.state.workTab
    )
  );

  const resolveBizTabLabel = (key: DemandWorkbenchBizTab, label: string) => {
    const count = workbenchStore.tabCountMap[key];
    if (isNil(count)) {
      return `${label}(-)`;
    }
    return `${label}(${count})`;
  };

  const handleWorkTabChange = (workTab: DemandWorkbenchWorkTab) => {
    if (workTab === 'list') {
      workbenchStore.openList();
      router.push({
        path: '/demand/submit/list',
        query: workbenchStore.toRouteQuery,
      });
      return;
    }

    if (workTab === 'submit') {
      workbenchStore.openSubmit();
      router.push({
        path: '/demand/submit/create',
        query: workbenchStore.toRouteQuery,
      });
      return;
    }

    workbenchStore.setWorkTab(workTab);
  };

  const handleBizTabChange = (bizTab: any) => {
    workbenchStore.setBizTab(bizTab as DemandWorkbenchBizTab);
    router.replace({
      path: '/demand/submit/list',
      query: workbenchStore.toRouteQuery,
    });
  };

  const handleOpenDetail = (demandCode: string) => {
    workbenchStore.openDetail(demandCode);
    router.push({
      path: `/demand/detail/${demandCode}`,
      query: workbenchStore.toRouteQuery,
    });
  };

  watch(
    () => workbenchStore.state.workTab,
    (tab) => {
      if (tab === 'submit') {
        mountedWorkTabs.submit = true;
      }
      if (tab === 'detail') {
        mountedWorkTabs.detail = true;
      }
    },
    { immediate: true }
  );
</script>

<style scoped lang="scss">
  .dm5-workbench-container {
    background: #ffffff;
    box-shadow: 0 4px 25px rgba(0, 0, 0, 0.05);
    border-left: 1px solid #f0f2f5;
    display: flex;
    flex-direction: column;
    overflow: hidden;
    flex: 1;
    height: calc(100% - 32px);
  }

  .dm5-workbench-header {
    padding: 16px 24px 0;
    background: #ffffff;

    .work-view-selector {
      display: flex;
      gap: 32px;
      margin-bottom: 0;

      .work-view-item {
        padding: 0 0 8px 16px;
        font-size: 16px;
        color: #94a3b8;
        cursor: pointer;
        display: flex;
        align-items: center;
        position: relative;
        transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);

        .dot {
          position: absolute;
          left: 0;
          top: 8px;
          width: 6px;
          height: 6px;
          border-radius: 50%;
          background: transparent;
          transition: all 0.3s ease;
        }

        &:hover {
          color: #02b96b;
        }

        &.active {
          color: #111827;
          font-weight: 600;

          .dot {
            background: #02b96b;
            box-shadow: 0 0 0 4px rgba(2, 185, 107, 0.1);
          }
        }
      }
    }

    .biz-tab-selector {
      border-top: 1px solid #f8fafc;

      :deep(.dm5-biz-inner-tabs) {
        .el-tabs__header {
          margin: 0 !important;
          padding: 0 !important;
          border: none;
        }
        .el-tabs__nav-wrap {
          margin: 0 !important;
          padding: 0 !important;
          &::after {
            display: none;
          }
        }
        .el-tabs__nav-scroll {
          padding: 0 !important;
        }
        .el-tabs__nav {
          padding: 0 !important;
          margin: 0 !important;
        }

        .el-tabs__item {
          height: 40px;
          line-height: 40px;
          font-size: 14px;
          color: #64748b;
          padding: 0 16px;
          transition: all 0.2s;

          &:first-child {
            padding-left: 16px !important;
          }

          &.is-active {
            color: #02b96b;
            font-weight: 600;
          }

          &:hover {
            color: #02b96b;
          }
        }
        .el-tabs__active-bar {
          background-color: #02b96b;
          height: 2px;
          border-radius: 2px;
        }
      }
    }
  }

  .dm5-workbench-main {
    padding: 0 24px 24px;
    display: flex;
    flex-direction: column;
    background: #ffffff;
    min-height: 0;
  }

  .table-container {
    display: flex;
    flex-direction: column;
    min-height: 0;
    margin-top: 8px;
  }

  .sub-page-content {
    flex: 1;
    padding-top: 0;
  }
</style>
