<template>
  <div
    class="analysis-report-wrapper"
    :class="{ 'full-screen': isFullScreen }"
    :style="{ '--width': width + 'px' }"
  >
    <div class="lt-analysis-report" :class="{ 'full-screen': isFullScreen }" v-loading="apiLoading">
      <Detail
        v-if="reportDetail"
        :reportRow="reportRow"
        :report-detail="reportDetail"
        :isFullScreen="isFullScreen"
        :currentTab="currentTab"
        @back="onBack"
        @edit="onEdit"
        @delete="onDelete"
        @copy="onCopy"
        @toggle-full="handleToggleFull"
      />
      <ReportList
        v-else-if="reportPeriod"
        :isFullScreen="isFullScreen"
        :info="list"
        :currentTab="currentTab"
        @to-detail="onDetail"
        @back="onListBack"
        @delete="onDelete"
        @toggle-full="handleToggleFull"
      />
      <div v-else class="home-content">
        <img class="logo-sign" src="./images/sign.png" alt="" />
        <div class="header-wrap">
          <header>
            <div>
              <div class="title">
                <img src="./images/logo-title.png" alt="" width="20" />
                <span>业务策略分析</span>
              </div>
              <div class="desc">
                好的分析报告，通过深度剖析信息，为决策制定与问题解决提供可靠依据
              </div>
              <div class="btn-add">
                <el-button
                  v-for="btn in btnListByPermission"
                  :key="btn.label"
                  @click="createReport({ reportType: btn.reportType || reportType })"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="14"
                    height="14"
                    viewBox="0 0 14 14"
                    fill="none"
                  >
                    <path
                      d="M2.33337 7H11.6667"
                      stroke="#02B96B"
                      stroke-width="1.2"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    />
                    <path
                      d="M7 11.6667V2.33333"
                      stroke="#02B96B"
                      stroke-width="1.2"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    />
                  </svg>
                  {{ btn.label }}
                </el-button>
              </div>
            </div>
            <div>
              <el-tooltip placement="top" :content="isFullScreen ? '侧边浮窗' : '侧边浮窗吸附'">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  viewBox="0 0 16 16"
                  fill="none"
                  class="icon-full"
                  @click="handleToggleFull"
                >
                  <rect
                    x="1.6"
                    y="1.6"
                    width="12.8"
                    height="12.8"
                    rx="2.4"
                    stroke="currentColor"
                    stroke-width="1.2"
                  />
                  <path
                    v-if="isFullScreen"
                    d="M10.7002 4.40039C11.1971 4.4005 11.5995 4.8029 11.5996 5.2998V10.7002C11.5995 11.1971 11.1971 11.5995 10.7002 11.5996H8.7998C8.3029 11.5995 7.9005 11.1971 7.90039 10.7002V5.2998C7.9005 4.8029 8.3029 4.4005 8.7998 4.40039H10.7002Z"
                    stroke="currentColor"
                    stroke-width="1.2"
                  />
                  <line
                    v-else
                    x1="9.6"
                    y1="2"
                    x2="9.6"
                    y2="14"
                    stroke="currentColor"
                    stroke-width="1.2"
                  />
                </svg>
              </el-tooltip>
            </div>
          </header>
          <nav class="tab-nav">
            <TabSwitch :tabs="tabs" v-model:check-value="currentTab" @change="onTabChange" />
            <div class="action-group">
              <!-- <div class="date-picker" @click="onDatePickerClick">
                <el-date-picker
                  ref="datePickerRef"
                  :model-value="[searchTime.startDate, searchTime.endDate]"
                  type="daterange"
                  range-separator=""
                  start-placeholder="开始时间"
                  end-placeholder="结束时间"
                  size="small"
                  value-format="YYYY-MM-DD"
                  @visible-change="
                    (visible) => {
                      datePickerVisible = visible;
                    }
                  "
                  @update:model-value="
                    (time) => {
                      console.log(time);
                      searchTime.startDate = time[0];
                      searchTime.endDate = time[1];
                      onSearchChange();
                    }
                  "
                />
                <SvgIcon class="calendar-icon" icon="calendar" />
              </div> -->
            </div>
          </nav>
        </div>
        <section class="filter-section" v-if="searchTime.startDate">
          <div class="filter-tag-wrap">
            <div class="filter-tag">
              <span>日期：{{ searchTime.startDate }} ~ {{ searchTime.endDate }}</span>
              <SvgIcon
                class="close-btn"
                icon="close"
                @click="
                  () => {
                    searchTime.startDate = '';
                    searchTime.endDate = '';
                    onSearchChange();
                  }
                "
              />
            </div>
          </div>
          <div class="clear-btn" @click="handleClearAll">清除全部</div>
        </section>
        <main class="report-list-wrapper" @scroll="onScroll">
          <ReportCollection
            v-if="collections.length"
            :list="collections"
            :periodMap="periodMap"
            :currentTab="currentTab"
            @copy-folder="handleCopyFolder"
            @to-list="onList"
            @to-detail="onDetail"
          />
          <div class="list-empty" v-else-if="!loading">
            <EmptyAnimation name="listEmpty" :width="128" :height="128" />
            <div class="empty-tip-1">暂无分析报告</div>
            <div class="empty-tip-2">
              快去写一份属于你的专属业务策略
              <br />
              分析报告吧
            </div>
          </div>
          <div class="loading-footer">
            <div v-if="loading" class="loading-icon">加载中</div>
            <div v-else-if="noMore && collections.length && !reportDetail" class="no-more-tip">
              到底啦
            </div>
          </div>
        </main>
      </div>
      <Create
        class="create-panel"
        ref="createPanelRef"
        v-bind="$attrs"
        @refresh="onRefresh"
        @hide-panel="hidePanel"
        @skip-list="handleSkipList"
      />
    </div>
    <div class="drag-handle" ref="dragHandleRef"></div>
  </div>
</template>

<script setup lang="ts">
  import TabSwitch from '@/views/report/components/LtAnalysisReport/components/TabSwitch.vue';
  import EmptyAnimation from '@/components/EmptyAnimation/index.vue';
  import { WeeklyReportType } from '@/utils/weeklyReportType';
  import { mpcWeeklyReportApi, type MpcWeeklyReportContracts } from '@/api';
  import { debounce } from 'lodash-es';
  import Create from './Create.vue';
  import ReportCollection from './ReportCollection.vue';
  import ReportList from './List.vue';
  import Detail from './Detail.vue';
  import { getWeekList, onDeleteReport } from './utils';

  const props = withDefaults(
    defineProps<{
      reportType: WeeklyReportType;
      btnList?: { label: string; reportType?: WeeklyReportType }[];
      branch: string;
      gtmPlCode?: string;
      getPermission: (option: any) => boolean;
      dateType?: 'week' | 'month';
    }>(),
    {
      btnList: () => [
        {
          label: '创建报告',
          reportType: undefined,
        },
      ],
      reportType: WeeklyReportType.DefaultType,
      branch: '',
      getPermission: () => false,
    }
  );
  provide('dateType', props.dateType === 'month' ? 'month' : 'week');

  const btnListByPermission = computed(() =>
    props.btnList.filter((btn) =>
      props.getPermission?.({ type: 'add', data: { reportRow, reportDetail, btn } })
    )
  );

  provide(
    'branch',
    computed(() => props.branch)
  );
  provide('getPermission', props.getPermission);

  const currentTab = ref<'my' | 'team'>('my');
  const searchText = ref('');
  const loading = ref(false);
  const apiLoading = ref(false);
  const noMore = ref(false);

  const collections: Ref<{ period: string; isSingle?: boolean }[]> = ref([]);
  const list = ref<{
    period: string;
    branch: string;
    reportType: string;
  } | null>(null);
  let periodMap: Record<string, MpcWeeklyReportContracts.MarketWeeklyReportBean[]> =
    Object.create(null);
  const total = ref(0);
  const teamTotal = ref(0);
  const pageIndex = ref(1);
  const reportRow = ref(null);
  const reportPeriod = ref('');
  const reportDetail: Ref<MpcWeeklyReportContracts.MarketWeeklyReportBean | null> = ref(null);
  const createPanelRef = ref();

  const tabs = computed(() => [
    {
      label: '我的报告',
      value: 'my',
      count: total.value,
    },
    {
      label: '团队报告',
      value: 'team',
      count: teamTotal.value,
    },
  ]);

  const width = ref(504);

  const searchTime = reactive({
    startDate: '',
    endDate: '',
  });
  let tick = 0; // 防止快速切换页面导致的数据混乱
  const getData = async (isRefresh: boolean) => {
    if (isRefresh) {
      pageIndex.value = 1;
      collections.value = [];
      noMore.value = false;
    }
    if (noMore.value) {
      return;
    }
    tick++;
    const currentTick = tick;
    loading.value = true;
    let res;
    try {
      if (currentTab.value !== 'my') {
        res = await mpcWeeklyReportApi.luteosMarketWeekReportListTeamReport({
          startDate: searchTime.startDate,
          endDate: searchTime.endDate,
          branch: props.branch,
          reportTitle: searchText.value || '',
          reportTypes:
            props.btnList?.map((btn) => btn.reportType || props.reportType)?.join(',') ||
            props.reportType,
          pageNum: pageIndex.value,
          pageSize: 10,
        });
      } else {
        res = await mpcWeeklyReportApi.luteosMarketWeekReportList({
          startDate: searchTime.startDate,
          endDate: searchTime.endDate,
          branch: props.branch,
          reportTitle: searchText.value || '',
          reportTypes:
            props.btnList
              ?.map((btn) => btn.reportType || props.reportType)
              .concat([7])
              ?.join(',') || `${props.reportType}, 7`,
          pageNum: pageIndex.value,
          pageSize: 10,
        });
      }
    } finally {
      setTimeout(() => {
        loading.value = false;
      }, 500);
    }

    await new Promise((resolve) => {
      setTimeout(resolve, 500);
    });
    if (currentTick !== tick) {
      // 说明已经切换了页面
      return;
    }
    periodMap = { ...periodMap, ...(res.recordMapList || {}) };
    const arr = Object.keys(res.recordMapList || []);
    teamTotal.value = res.reportCount || 0;
    total.value = res.total || 0;
    collections.value.push(
      ...(arr.map((item) => {
        if (periodMap[item].length === 1) {
          return {
            period: item,
            isSingle: true,
          };
        }
        return {
          period: item,
        };
      }) || [])
    );
    if (!arr.length) {
      noMore.value = true;
    }
  };
  const weekList = ref<MpcWeeklyReportContracts.WeekBean[]>([]);
  provide('weekList', weekList);
  getWeekList().then((res) => {
    weekList.value = res || [];
  });
  const onScroll = debounce((ev) => {
    const { target } = ev;
    if (target.scrollTop + target.clientHeight >= target.scrollHeight - 20) {
      pageIndex.value++;
      getData(false);
    }
  }, 500);

  const getDetail = async (reportId) => {
    apiLoading.value = true;
    const res = await mpcWeeklyReportApi
      .luteosMarketWeekReportQueryReportDetail({
        reportId,
      })
      .finally(() => {
        apiLoading.value = false;
      });
    reportDetail.value = res;
  };

  watch(
    () => [currentTab.value, props.branch],
    async () => {
      if (currentTab.value === 'team' && props.gtmPlCode) {
        let host = window.location.origin;
        if (!host.includes('erp')) {
          host = import.meta.env.VITE_BI_HOST;
        } else {
          host = host.replace('erp', 'bi');
        }
        const url = `${host}/weeklyReport?gtmPlCode=${props.gtmPlCode}&branch=${props.branch}`;
        window.open(url, props.branch);
        currentTab.value = 'my';
        return;
      }
      if (props.branch) {
        getData(true);
      }
      reportDetail.value = null;
      reportPeriod.value = '';
      list.value = null;
      createPanelRef.value?.hidePanel(false);
    },
    {
      immediate: true,
    }
  );

  const onSearchChange = () => {
    reportDetail.value = null;
    getData(true);
  };
  const onTabChange = () => {
    reportDetail.value = null;
  };
  const createReport = (row?: any) => {
    createPanelRef.value.showPanel(row || { reportType: props.reportType });
    isFullScreen.value = true;
    width.value = 520;
    minWidth = 520;
    maxWidth = 800;
  };
  const hidePanel = () => {
    width.value = 520;
    minWidth = 412;
    maxWidth = 800;
  };
  const handleCopyFolder = async () => {
    onRefresh();
  };
  let isSingleFlag = false;
  // 列表跳转
  const onList = async (
    payload: {
      period: string;
      branch: string;
      reportType: WeeklyReportType;
    },
    isSingle
  ) => {
    isSingleFlag = isSingle;
    reportDetail.value = null;
    reportPeriod.value = payload.period;
    list.value = payload;
  };
  const onDetail = async (row, isSingle) => {
    isSingleFlag = isSingle;
    reportRow.value = row;
    await getDetail(row.reportId);
    nextTick(() => {
      reportPeriod.value = '';
    });
  };
  // 列表返回
  const onListBack = () => {
    reportPeriod.value = '';
    list.value = null;
    onRefresh();
  };
  // 详情返回
  const onBack = () => {
    reportPeriod.value = isSingleFlag ? '' : reportRow.value?.period || '';
    reportRow.value = null;
    reportDetail.value = null;
    onRefresh();
  };
  const onEdit = (detail) => {
    createReport(detail);
  };
  const onCopy = (detail) => {
    periodMap[reportPeriod.value] = [detail, ...periodMap[reportPeriod.value]];
  };
  const onDelete = async (detail) => {
    await onDeleteReport(
      detail,
      () => {
        if (!reportPeriod.value) {
          return;
        }
        const index = periodMap[reportPeriod.value].findIndex(
          (item) => item.reportId === detail.reportId
        );
        if (index !== -1) {
          periodMap[reportPeriod.value].splice(index, 1);
        }
        reportRow.value = null;
        reportDetail.value = null;
        onRefresh();
      },
      () => {
        if (reportPeriod.value) {
          const index = periodMap[reportPeriod.value].findIndex(
            (item) => item.reportId === detail.reportId
          );
          if (index !== -1) {
            periodMap[reportPeriod.value].splice(index, 0, detail);
          }
        }
        onRefresh();
      }
    );
  };
  const onRefresh = async (isEdit = false) => {
    if (isEdit) {
      if (reportDetail.value?.reportId) {
        getDetail(reportDetail.value.reportId);
      }
    } else {
      // 是添加
      reportDetail.value = null;
    }
    await getData(true);
  };
  const handleSkipList = async (info: { period: string; branch: string; reportType: string }) => {
    const originData = periodMap[info.period];
    const reportTypeSet = originData.reduce((acc, curr) => {
      return acc.add(curr.reportType!);
    }, new Set([info.reportType]));
    const reportTypes = Array.from(reportTypeSet).join(',');
    const res = await mpcWeeklyReportApi.luteosMarketWeekReportListByPeriod({
      period: info.period || '',
      branch: info.branch,
      reportTypes,
      teamReport: currentTab.value === 'team' ? 1 : 0,
    });
    if (res.recordList?.length > 1) {
      reportPeriod.value = info.period || '';
      list.value = {
        period: info.period || '',
        branch: info.branch,
        reportType: reportTypes,
      };
      periodMap[reportPeriod.value] = res.recordList || [];
    }
  };

  const handleClearAll = () => {
    searchTime.startDate = '';
    searchTime.endDate = '';
    onSearchChange();
  };
  const isFullScreen = defineModel('isFullScreen', { type: Boolean, default: false });
  const handleToggleFull = () => {
    width.value = isFullScreen.value ? 504 : 520;
    isFullScreen.value = !isFullScreen.value;
  };
  // 拖动，改变width变量
  const dragHandleRef = useTemplateRef('dragHandleRef');
  const AppDom = document.querySelector('#app') as HTMLElement;
  let dragging = false;
  let startX = 0;
  let startWidth = 0;
  let minWidth = 428;
  let maxWidth = 800;
  const onMouseMove = (ev) => {
    if (!dragging) return;
    document.body.style.cursor = 'ew-resize';
    AppDom.style.userSelect = 'none';
    AppDom.style.pointerEvents = 'none';
    const deltaX = ev.clientX - startX;
    let newWidth = startWidth - deltaX;
    if (newWidth < minWidth) newWidth = minWidth;
    if (newWidth > maxWidth) newWidth = maxWidth;
    width.value = newWidth;
  };
  const onMouseUp = () => {
    dragging = false;
    document.body.style.cursor = 'default';
    AppDom.style.userSelect = 'auto';
    AppDom.style.pointerEvents = 'auto';
    document.removeEventListener('mousemove', onMouseMove);
    document.removeEventListener('mouseup', onMouseUp);
  };
  onMounted(() => {
    dragHandleRef.value?.addEventListener('mousedown', (ev) => {
      ev.preventDefault();
      dragging = true;
      startX = ev.clientX;
      startWidth = width.value;
      document.body.style.cursor = 'ew-resize';
      document.addEventListener('mousemove', onMouseMove);
      document.addEventListener('mouseup', onMouseUp);
    });
  });
  onUnmounted(() => {
    document.removeEventListener('mousemove', onMouseMove);
    document.removeEventListener('mouseup', onMouseUp);
  });

  defineExpose({
    onRefresh,
  });
</script>

<style scoped lang="scss">
  .analysis-report-wrapper {
    width: var(--width, 412px);
    height: 100%;
    transition: width 0.15s linear;
    background-color: transparent;
    position: relative;
    &.full-screen {
      .drag-handle {
        width: 6px;
      }
    }
    .drag-handle {
      width: 0px;
      cursor: ew-resize;
      position: absolute;
      top: 0;
      left: 0;
      bottom: 0;
      z-index: 1001;
    }
  }
  .lt-analysis-report {
    width: var(--width, 412px);
    height: calc(100% - 16px);
    position: relative;
    top: 16px;
    border-radius: 10px;
    background-color: #fff;

    overflow: auto;
    display: flex;
    flex-direction: column;
    &.full-screen {
      position: fixed;
      top: 0;
      right: 0;
      height: 100vh;
      z-index: 1000;
      border-radius: 0;
      box-shadow: 0 6px 36px 0 rgba(6, 8, 27, 0.08);
    }

    img.logo-sign {
      position: absolute;
      right: 60px;
      top: 27px;
      width: 105.5px;
      height: 140.32px;
    }

    .header-wrap {
      padding-bottom: 10px;
    }

    header {
      position: relative;
      padding: 26px 20px;
      display: flex;
      justify-content: space-between;

      .title {
        color: var(---N9, #1f1f1f);
        font-family: 'PingFang SC Medium';
        font-size: 18px;
        font-style: normal;
        font-weight: 500;
        line-height: 26px; /* 144.444% */
        display: flex;
        column-gap: 8px;
        & > img {
          width: 18px;
          object-fit: contain;
          padding-bottom: 1px;
        }
      }

      .desc {
        padding-top: 10px;
        width: 216px;
        color: var(---N6, #999);
        font-family: 'PingFang SC';
        font-size: 12px;
        font-style: normal;
        font-weight: 400;
        line-height: 20px; /* 166.667% */
        column-gap: 8px;
      }

      .btn-add {
        margin-top: 16px;
        color: var(--el-color-primary);
        border-color: var(--el-color-primary);
        :deep(.el-button) {
          --el-text-color-regular: var(--el-color-primary);
          --el-border-color: var(--el-color-primary);
        }
        :deep(svg) {
          margin-right: 4px;
        }
      }
    }

    .tab-nav {
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: 0 20px;

      .search-box {
        width: 106px;
        height: 36px;
        :deep(.el-input__wrapper) {
          height: 36px;
        }
      }
      .action-group {
        display: flex;
        align-items: center;
        column-gap: 8px;
      }
    }

    main {
      min-height: 0;
      flex: 1;
      overflow: auto;

      .list-empty {
        display: flex;
        flex-direction: column;
        align-items: center;
        padding-top: 70px;

        .empty-tip-1 {
          color: var(---N9, #1f1f1f);
          /* 常规/Medium 14 */
          font-family: 'PingFang SC Medium';
          font-size: 14px;
          font-style: normal;
          font-weight: 500;
          line-height: 22px; /* 157.143% */
        }

        .empty-tip-2 {
          color: var(---N6, #999);
          text-align: center;
          /* 较弱/Regular 12 */
          font-family: 'PingFang SC';
          font-size: 12px;
          font-style: normal;
          font-weight: 400;
          line-height: 20px; /* 166.667% */
        }
      }
    }

    .loading-footer {
      height: 60px;

      .loading-icon {
        height: 100%;
        text-align: center;
        display: flex;
        align-items: center;
        justify-content: center;
        color: var(---N6, #999);
      }

      .no-more-tip {
        height: 100%;
        display: flex;
        justify-content: center;
        align-items: center;
        color: var(---N6, #999);
        gap: 10px;
        padding: 0 20px;

        &:before,
        &:after {
          content: '';
          height: 1px;
          flex: 1;
          background: var(---N3, #ededed);
        }
      }
    }

    .create-panel {
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      z-index: 11;

      :deep(.el-loading-spinner) {
        &:after {
          display: none;
        }
      }
    }
  }
  .home-content {
    background-image: url(./images/header-bg.png);
    background-repeat: no-repeat;
    background-size: contain;
    background-position: top;
    background-clip: padding-box;
    height: 100%;
    display: flex;
    flex-direction: column;
    .report-list-wrapper {
      height: 0;
      flex: 1;
      overflow-y: auto;
    }
  }
  .date-picker {
    position: relative;
    width: 36px;
    height: 36px;
    box-sizing: border-box;
    border-radius: 8px;
    border: 1px solid #dedede;
    background: #fff;
    text-align: center;
    display: flex;
    align-items: center;
    justify-content: center;
    color: #666666;
    .calendar-icon {
      cursor: pointer;
      font-size: 16px;
      &:hover {
        color: var(--el-color-primary);
      }
    }
    :deep(.el-date-editor--daterange) {
      position: absolute;
      top: 0;
      left: 0;
      width: 0;
      height: 0;
      padding: 0;
      overflow: hidden;
    }
  }
  .filter-section {
    display: flex;
    align-items: center;
    padding: 10px 20px;
    column-gap: 10px;
  }
  .filter-tag-wrap {
    display: flex;
    align-items: center;
    column-gap: 4px;
    .filter-tag {
      display: flex;
      align-items: center;
      column-gap: 4px;
      padding: 0 4px;
      border-radius: 4px;
      background: var(---P1, #f0fff6);
      color: var(---P6, #02b96b);

      /* 较弱/Regular 12 */
      font-family: 'PingFang SC';
      font-size: 12px;
      font-style: normal;
      font-weight: 400;
      line-height: 20px; /* 166.667% */
    }
  }
  .close-btn {
    font-size: 12px;
    color: #999;
    cursor: pointer;
    &:hover {
      color: #1f1f1f;
    }
  }
  .clear-btn {
    padding: 0 6px;
    border-radius: 4px;
    color: var(---N6, #999);
    font-family: 'PingFang SC';
    font-size: 12px;
    font-style: normal;
    font-weight: 400;
    line-height: 20px; /* 166.667% */
    cursor: pointer;
    &:hover {
      color: #1f1f1f;
    }
  }
  .icon-full {
    width: 16px;
    height: 16px;
    cursor: pointer;
    color: #999999;
    &:hover {
      color: var(--el-color-primary);
    }
  }
</style>
