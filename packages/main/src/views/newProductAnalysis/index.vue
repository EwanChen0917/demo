<template>
  <ManualBackIcon v-if="showDeedBack" @close="showDeedBack = false" />
  <div class="page-container" :class="{ fullscreen: fullscreen, 'page-card': viewMode == 'card' }">
    <div class="statistics-bar" v-if="!fullscreen">
      <div
        v-for="(item, key) in statisticsData"
        :key="key"
        class="statistics-item"
        :class="{ 'statistics-item-clicked': item.clicked }"
        @click="handleStatisticsItemClick(item)"
      >
        <div class="icon-wrapper" :style="{ backgroundColor: item.iconBgColor }">
          <i v-if="item.icon.includes('Root')" :class="`Root-tyicon ${item.icon}`" class="icon"></i>
          <img v-else :src="item.icon" class="icon" alt="icon" />
        </div>
        <div class="content">
          <div class="label">{{ item.label }}</div>
          <div class="value-wrapper">
            <span class="value" :class="{ clicked: item.clicked }">{{ item.value }}</span>
            <span v-if="item.unit" class="unit">{{ item.unit }}</span>
          </div>
        </div>
      </div>
    </div>
    <KeenList
      :resetBtnOptions="{ size: 'small' }"
      @refresh="refreshList"
      @reset-search="resetSearch"
      @reset-search-by-key="(key) => (search[key] = undefined)"
    >
      <template #filters>
        <div class="search-content">
          <el-input
            v-model="search.name"
            placeholder="项目名称"
            clearable
            size="small"
            @input="handleNameSearchReport"
          >
            <template #prefix>
              <SvgIconSearch />
            </template>
          </el-input>
          <el-select
            v-model="search.status"
            style="width: 160px"
            :options="statusOptions"
            multiple
            placeholder="任务状态"
            clearable
            size="small"
            filterable
            collapse-tags
            @change="handleStatusChange"
          />
          <el-date-picker
            v-model="search.time"
            value-format="YYYY-MM-DD"
            type="daterange"
             size="small"
            start-placeholder="开始时间"
            end-placeholder="结束时间"
          />
        </div>
      </template>
      <template #tools-prepend>
        <div class="prepend-tool">
          <el-tooltip content="卡片视图" placement="top">
            <div
              class="icon"
              :class="{ 'view-mode-table': viewMode === 'card' }"
              @click="changeViewMode('card')"
            >
              <i class="iconfont icon-kapian"></i>
            </div>
          </el-tooltip>
          <el-tooltip content="列表视图" placement="top">
            <div
              class="icon"
              :class="{ 'view-mode-card': viewMode === 'table' }"
              @click="changeViewMode('table')"
            >
              <i class="iconfont icon-liebiao"></i>
            </div>
          </el-tooltip>
        </div>
        <span class="split-line"></span>
      </template>
      <template #buttons>
        <el-button ref="buttonRef" type="primary" @click="add">新建分析</el-button>
      </template>
      <!-- 表格视图 -->
      <div v-show="viewMode === 'table'" class="lists-container">
        <el-table
          ref="tableRef"
          v-loading="listLoading"
          :data="listData?.projectList"
          row-key="instanceCode"
        >
          <el-table-column prop="name" min-width="180" fixed="left">
            <template #header><div style="padding-left: 24px">任务信息</div></template>
            <template #default="{ row }">
              <div class="d-flex align-items-center gap-3" style="padding-left: 24px">
                <div class="project-icon">
                  <KeenImagePreview :size="32" :src="pptImage" />
                </div>
                <div class="project-info">
                  <div class="project-name" @click="handleActions({ key: 'view', row })">
                    <!--                <OverflowTooltip :content="row.name" :line="2" color="var(&#45;&#45;el-color-primary)" />-->
                    <OverflowTooltip :content="row.name" :line="2" />
                    <Copy :content="row.name" />
                  </div>
                  <div class="project-id">
                    ID: {{ row.instanceCode }}
                    <Copy :content="row.instanceCode" />
                  </div>
                </div>
              </div>
            </template>
          </el-table-column>
          <!--      <el-table-column label="品类" prop="category" />-->
          <el-table-column label="状态" prop="statusDesc">
            <template #default="{ row }">
              <Tag :color="statusColorMap[row?.status]">{{ row?.statusDesc }}</Tag>
            </template>
          </el-table-column>
          <el-table-column label="创建人" prop="creator">
            <template #default="{ row }">
              <el-tag v-if="row.creatorName" round type="info">
                <el-avatar class="flex-shrink-0" :src="row.creatorAvatar || getImg()" :size="14" />
                <span>{{ row.creatorName }}</span>
              </el-tag>
            </template>
          </el-table-column>
          <el-table-column label="开始时间" prop="beginTime">
            <template #default="{ row }">
              <span v-if="typeof formatCreateTime(row.beginTime) === 'string'">
                {{ formatCreateTime(row.beginTime) || '-' }}
              </span>
              <span v-else class="start-time">
                <span>{{ formatCreateTime(row.beginTime)[0] || '-' }}</span>
                <span>{{ formatCreateTime(row.beginTime)[1] || '-' }}</span>
              </span>
            </template>
          </el-table-column>
          <el-table-column label="平均耗时" prop="workflowAvgRunTime">
            <template #default="{ row }">
              {{ formatTime(row?.workflowAvgRunTime) }}
            </template>
          </el-table-column>
          <el-table-column label="已运行时长">
            <template #default="{ row }">
              <!--          <div v-if="isOutTime(row)" class="out-time">
            <span>{{ formatRunTime(row) }}</span>
            <span>已超时</span>
          </div>
          <span v-else>{{ formatRunTime(row) }}</span>-->
              <span>{{ formatRunTime(row) }}</span>
            </template>
          </el-table-column>
          <el-table-column label="操作" fixed="right" width="100">
            <template #header><div style="padding-right: 24px">操作</div></template>
            <template #default="{ row }">
              <div class="buttons">
                <el-link
                  v-for="(action, index) in getActions(row)?.filter((k) => !k?.hide)"
                  :key="index"
                  :type="action?.type"
                  :underline="false"
                  @click="handleActions(action)"
                >
                  <span class="link-label">{{ action?.label }}</span>
                </el-link>
              </div>
            </template>
          </el-table-column>
        </el-table>
      </div>

      <!-- 卡片视图 -->
      <div
        v-show="viewMode === 'card'"
        class="cards-container"
        ref="cardWrap"
        v-loading="listLoading"
      >
        <div class="cards-grid">
          <div
            v-for="row in listData?.projectList"
            :key="row.instanceCode"
            class="project-card"
            @click="handleCardClick(row)"
          >
            <!-- 卡片头部 -->
            <div class="card-header">
              <div class="header-left">
                <div class="project-avatar">
                  <KeenImagePreview :size="32" :src="pptImage" />
                </div>
                <div class="project-meta">
                  <div class="project-meta-header">
                    <div class="project-id">
                      ID: {{ row.instanceCode }}
                      <Copy :content="row.instanceCode" />
                    </div>
                    <Tag :color="statusColorMap[row?.status]">{{ row?.statusDesc }}</Tag>
                  </div>
                  <h3 class="project-title"><OverflowTooltip :content="row.name" :line="1" /></h3>
                </div>
              </div>
              <div class="header-right" @click.stop>
                <el-popover
                  placement="bottom-end"
                  :width="120"
                  popper-class="action-menu-popover"
                  :offset="4"
                  :show-arrow="false"
                  :teleported="false"
                >
                  <template #reference>
                    <div class="action-menu-trigger">
                      <i class="iconfont icon-piliangsousuo"></i>
                    </div>
                  </template>
                  <div class="action-menu">
                    <div
                      v-if="row.status === 3"
                      class="menu-item"
                      @click="handleActions({ key: 'retry', row })"
                    >
                      <span>重试</span>
                    </div>
                    <div class="menu-item" @click="handleActions({ key: 'del', row })">
                      <span>删除</span>
                    </div>
                  </div>
                </el-popover>
              </div>
            </div>

            <!-- 卡片内容 -->
            <div class="card-body">
              <!-- 卡片底部 -->
              <div class="card-footer">
                <div class="creator-info">
                  <el-avatar
                    :src="row.creatorAvatar || getImg()"
                    :size="20"
                    class="creator-avatar"
                  />
                  <span class="creator-name">{{ row.creatorName }}</span>
                </div>
                <div class="create-time-container">
                  <div class="split-line"></div>
                  <div class="create-time">
                    <el-tooltip v-if="row?.status !== 0" content="开始时间" placement="top">
                      <i class="iconfont icon-shijian"></i>
                    </el-tooltip>
                    <span v-if="typeof formatCreateTime(row.beginTime) === 'string'">
                      {{ formatCreateTime(row.beginTime) || '-' }}
                    </span>
                    <span v-else>{{ `${formatCreateTime(row.beginTime)[0]} ${formatCreateTime(row.beginTime)[1]}` || '-' }}</span>
                  </div>
                </div>
              </div>
              <div class="metrics-grid">
                <div class="metric-item">
                  <div class="metric-label">平均耗时</div>
                  <div class="metric-value">
                    {{ formatTime(row?.workflowAvgRunTime) }}
                  </div>
                </div>
                <div class="split-line"></div>
                <div class="metric-item">
                  <div class="metric-label">已运行时长</div>
                  <span class="metric-value">{{ formatRunTime(row) }}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <KeenPagination
        :class="{ 'card-pagination': viewMode == 'card' }"
        :current="current"
        :page-size="pageSize"
        :page-size-option="pageSizeOption"
        :total="total"
        @size-change="handlePageSizeChange"
        @current-change="handleCurrentChange"
      />
    </KeenList>
    <GuidelineTour ref="guidelineTour" :tour-steps-list="stepsList" />
  </div>

  <AddDialog ref="addDialogRef" @success="handleSuccess" />
  <ConfigDialog ref="configDialogRef" @success="handleSuccess" />
</template>

<script setup lang="ts" name="newProductAnalysis">
  import { ElLoading, ButtonInstance, ElMessage, ElMessageBox, TourInstance } from 'element-plus';
  import useList from '@/hooks/list/useList';
  import { NewProductApi, newProductApi } from '@/api';
  import AddDialog from '@/views/newProductAnalysis/components/addDialog.vue';
  import { omit, debounce } from 'lodash-es';
  import GuidelineTour from '@/components/GuidelineTour/index.vue';
  import * as swal from '@/utils/swal';
  import dayjs from 'dayjs';
  import ConfigDialog from '@/views/newProductAnalysis/components/configDialog.vue';
  import HeaderTitle from '@/views/newProductAnalysis/components/headerTitle.vue';
  import { formatTime } from '@/utils/time';
  import ManualBackIcon from '@/views/newProductAnalysis/components/manualbackIcon.vue';
  import { useStore } from '@/store/modules/useStore';
  import { computed } from 'vue';
  import { useReport } from './hooks/useReport';
  import pptImage from './assets/images/list-ppt.svg';
  import successIcon from './assets/images/success-icon.svg';
  import analysisIcon from './assets/images/analysis-icon.svg';
  import timeIcon from './assets/images/time-icon.svg';
  import successedIcon from './assets/images/successed.svg';

  const { report } = useReport();

  const statusMap = {
    0: '未开始',
    1: '进行中',
    2: '已完成',
    3: '失败',
    4: '数据获取中',
  };

  /**
   * 新手指引
   */
  const stepsList = ref<any>([]);
  const guidelineTour = ref();
  const buttonRef = ref<ButtonInstance>();
  const initGuide = async () => {
    const cardElement = document.querySelectorAll('.statistics-item');
    stepsList.value = [
      {
        targetsList: [cardElement[1], cardElement[0]],
        description: '增加快捷筛选，点击「统计数字」可查询对应状态的任务信息。',
        placement: 'bottom-start',
      },
      {
        target: buttonRef.value?.$el,
        description: '点击「新建分析」，可创建AI分析工作流。 ',
        placement: 'bottom-start',
      },
      {
        target: '.prepend-tool',
        description: '点击切换列表/卡片视图，两种布局随心切换。',
        placement: 'bottom-end',
        nextButtonProps: {
          children: '我知道了',
        },
      },
      // {
      //   target: '.use-handbook',
      //   description: '点击查看《全功能操作指南》，上手轻松无压力。',
      //   placement: 'bottom-end',
      //   nextButtonProps: {
      //     children: '我知道了',
      //   },
      // },
    ];
    await guidelineTour.value?.open(1);
  };

  const statusOptions = computed(() =>
    Object.entries(statusMap).map(([value, label]) => ({
      value: Number(value),
      label: label as string,
    }))
  );

  const statusColorMap = {
    0: 'blue',
    1: 'yellow',
    2: 'green',
    3: 'red',
    4: 'gray',
  };
  const router = useRouter();
  const PAGE_SIZE = 10;
  const showDeedBack = ref(true);
  const viewMode = ref(localStorage.getItem('newProductAnalysisViewMode') || 'table');
  const store = useStore();
  const { toggleFullscreen } = store;
  const fullscreen = computed(() => store.fullscreen);

  const {
    search,
    // searchData,
    pagination: {
      total,
      current,
      pageSize,
      handleCurrentChange,
      pageSizeOption,
      handlePageSizeChange,
    },
    listData,
    listLoading,
    refreshList,
    runQuery,
    resetSearch,
    // selectedKeys,
  } = useList<
    NewProductApi.LuteosAiNpoProjectList.RequestBody,
    NewProductApi.LuteosAiNpoProjectList.ResponseBody
  >({
    searchDefaults: {
      name: undefined,
      status: [] as number[],
      category: undefined,
      time: undefined,
    },
    // eslint-disable-next-line no-shadow
    interceptSearchData: (searchData) => {
      const { time } = searchData;
      return {
        ...omit(searchData, 'time'),
        startTime: time ? time[0] : undefined,
        endTime: time ? time[1] : undefined,
      };
    },
    pageSize: PAGE_SIZE,
    service: newProductApi.luteosAiNpoProjectList,
  });

  const getActions = (row) => {
    return [
      {
        label: row?.status === 0 ? '编辑' : '详情',
        key: 'view',
        type: 'primary',
        permissionCode: '',
        row,
      },
      {
        label: '重试',
        key: 'retry',
        type: 'primary',
        hide: row.status !== 3,
        permissionCode: '',
        row,
      },
      {
        label: '删除',
        key: 'del',
        type: 'danger',
        permissionCode: '',
        row,
      },
    ];
  };

  const statisticsData = ref({
    completedTotal: {
      label: '已完成分析',
      value: '',
      icon: successedIcon,
      iconBgColor: '#02B96B',
      clicked: true,
    },
    inProgressTotal: {
      label: '进行中分析',
      value: '',
      unit: '个项目',
      icon: analysisIcon,
      iconBgColor: '#0CC1E2',
      clicked: true,
    },
    analyzeAverageTime: {
      label: '新品分析平均完成时间',
      value: '',
      unit: '小时',
      icon: timeIcon,
      iconBgColor: '#258DFF',
    },
    analyzeSuccessRate: {
      label: '分析任务成功率',
      value: '',
      unit: '%',
      icon: successIcon,
      iconBgColor: '#A55BF5',
    },
  });
  const queryStatistics = async () => {
    const res = await newProductApi.luteosAiNpoProjectStatistics();
    for (const item in res?.data) {
      if (statisticsData.value[item]) {
        statisticsData.value[item].value =
          item === 'analyzeAverageTime' ? (res?.data[item] / 3600)?.toFixed(2) : res?.data[item];
      }
    }
  };
  queryStatistics();

  const configDialogRef = ref();
  // 表格操作
  const handleActions = async (item) => {
    const { key, row } = item;
    const { memberCode } = store.userInfo;
    // const superAdmin = store.userInfo.superAdmin;
    const { creator } = row;
    switch (key) {
      case 'view': {
        report('click_task_detail', {
          task_id: row.instanceCode,
        });

        if (row?.status === 0) {
          if (memberCode !== creator) {
            ElMessage({ message: '暂无权限', type: 'warning', grouping: true });
            return;
          }

          configDialogRef.value?.open(undefined, row?.name, row?.instanceCode);
          /* router.push({
              path: '/newProductAnalysis/workflowConfig',
              query: {
                instanceCode: row.instanceCode,
              },
            }); */
        } else if (row?.status === 2) {
          router.push({
            path: '/newProductAnalysis/detail', // TODO: 待1030版本完善再修改
            query: {
              instanceCode: row.instanceCode,
            },
          });
        } else {
          router.push({
            path: '/newProductAnalysis/detail',
            query: {
              instanceCode: row.instanceCode,
            },
          });
        }

        break;
      }
      case 'retry': {
        report('click_task_retry', {
          task_id: row.instanceCode,
        });
        const isConfirm = await swal.confirm('确定要重试吗？');
        if (isConfirm) {
          const res = await newProductApi.luteosAiNpoWorkflowRun({
            instanceCode: row?.instanceCode,
            mode: 1,
            inputs: row?.inputVariables,
          });
          ElMessage.success('分析任务已重新启动');
          handleRefreshList();
          queryStatistics();
        }

        break;
      }
      case 'del': {
        report('click_task_delete', {
          task_id: row.instanceCode,
        });

        if (memberCode !== creator) {
          ElMessage({ message: '暂无权限', type: 'warning', grouping: true });
          return;
        }
        const isConfirm = await swal.confirm('确定要删除吗？');
        if (isConfirm) {
          const res = await newProductApi.luteosAiNpoProjectDeleteProject(row.instanceCode);
          ElMessage.success('删除成功');
          handleRefreshList();
          queryStatistics();
        }
        break;
      }
      default:
        break;
    }
  };

  const gettingStateNew = async (instanceCode) => {
    const res = await newProductApi.luteosAiNpoProjectGettingDataState({
      instanceCode,
    });

    // console.log('数据获取中新加的接口GettingDataState res ====>', res);
  };

  // 防止快速点击刷新的控制变量
  const isRefreshing = ref(false);

  const handleRefreshList = async (manually = false) => {
    // 如果是手动刷新且正在刷新中，则直接返回
    if (manually && isRefreshing.value) {
      ElMessage({
        message: '正在刷新中，请稍候...',
        type: 'warning',
        grouping: true,
      });
      return;
    }

    if (manually) {
      isRefreshing.value = true;
      const list = listData.value?.projectList;
      const loading = ElLoading.service({
        target: viewMode.value === 'table' ? '.lists-container' : '.cards-container',
      });
      // 如果工作流的状态为数据获取中（status === 4），则调用 gettingStateNew 方法
      if (list && list.length > 0) {
        const gettingStatePromises = list
          .filter((item) => item.status === 4)
          .map((item) => gettingStateNew(item.instanceCode));

        // 等待所有的 gettingStateNew 执行完毕
        try {
          await Promise.all(gettingStatePromises);
        } catch (error) {
          console.error('Error occurred while executing gettingStateNew:', error);
        }
      }
      loading.close();
    }

    try {
      await refreshList();
    } finally {
      // 确保无论成功或失败都重置刷新状态
      if (manually) {
        isRefreshing.value = false;
      }
    }
  };

  const changeViewMode = (mode) => {
    viewMode.value = mode;
    localStorage.setItem('newProductAnalysisViewMode', mode);
  };

  const addDialogRef = ref(null);
  const add = () => {
    addDialogRef.value?.open();

    report('popup_view_workflow_select');
  };

  // 卡片点击处理
  const handleCardClick = (row) => {
    handleActions({ key: 'view', row });
  };

  const handleSuccess = () => {
    handleRefreshList();
    queryStatistics();
  };

  const getImg = () => {
    return new URL(`@/assets/images/icon/defaultAvatar.png`, import.meta.url).href;
  };

  // 格式化运行时长
  const formatRunTime = (row) => {
    if (!row?.beginTime) return '-';

    const beginTime = dayjs(row?.beginTime);
    const endTime = row?.status === 1 ? dayjs() : dayjs(row.endTime);

    const diffSeconds = endTime.diff(beginTime, 'second');
    return formatTime(diffSeconds);
  };

  // 使用 dayjs 格式化开始时间：今日/昨日，否则 YYYY年MM月DD日 HH:mm
  const formatCreateTime = (beginTime: string) => {
    if (!beginTime) return '';
    const d = dayjs(beginTime);
    if (!d.isValid()) return '';
    const todayStr = dayjs().format('YYYY-MM-DD');
    const yestStr = dayjs().subtract(1, 'day').format('YYYY-MM-DD');
    const dStr = d.format('YYYY-MM-DD');
    const timeStr = d.format('HH:mm');
    if (dStr === todayStr) return `今日 ${timeStr}`;
    if (dStr === yestStr) return `昨日 ${timeStr}`;
    return [d.format('YYYY-MM-DD'), d.format('HH:mm:ss')];
  };

  // 判断是否超时
  const isOutTime = (row) => {
    if (!row?.beginTime) return false;

    const beginTime = dayjs(row?.beginTime);
    const endTime = row?.status === 1 ? dayjs() : dayjs(row.endTime);
    const diffSeconds = endTime.diff(beginTime, 'second');
    return diffSeconds > row.workflowAvgRunTime;
  };

  const handleStatisticsItemClick = (item) => {
    switch (item.label) {
      case '已完成分析':
        search.status = [2];
        break;

      case '进行中分析':
        search.status = [1];
        break;
      default:
        break;
    }
  };

  const cardWrap = ref();

  const setTableHeight = () => {
    requestAnimationFrame(() => {
      const tableTop = cardWrap.value?.getBoundingClientRect?.()?.top;
      const height = window.innerHeight - tableTop - 72 - 12;
      const table = cardWrap.value;
      if (table && viewMode.value == 'card') {
        table.setAttribute('style', `height: ${height}px;overflow: auto`);
      }
    });
  };

  onMounted(() => {
    // 新手引导
    initGuide();

    setTableHeight();

    const container = document.querySelector('.el-main') as HTMLElement;
    const listContainer = document.querySelector('.list-container') as HTMLElement;
    if (!container && !listContainer) return;

    const resizeObserver = new ResizeObserver((entries) => {
      for (const entry of entries) {
        if (entry.target === container || entry.target === listContainer) {
          setTableHeight();
        }
      }
    });

    resizeObserver.observe(container);
    resizeObserver.observe(listContainer);

    onUnmounted(() => {
      resizeObserver.unobserve(container);
      resizeObserver.unobserve(listContainer);
      resizeObserver.disconnect();
    });
  });

  // 项目名称搜索埋点上报（与useList的防抖时间同步：300ms）
  const handleNameSearchReport = debounce((value: string) => {
    report('input_search_task_name', { keyword: value });
  }, 300);

  const handleStatusChange = (value: string) => {
    report('select_task_status_filter', { status_value: value });
  };
</script>

<style scoped lang="scss">
  .statistics-bar {
    display: flex;
    gap: 20px;
    width: 100%;
    padding: 16px 16px 4px;
    background-color: #fff;
    .statistics-item {
      padding: 12px 20px;
      width: 25%;
      border-radius: 8px;
      border: 1px solid var(---N4, #dfe2e6);
      background: #fff;
      display: flex;
      align-items: center;
      gap: 12px;
      height: 76px;
      .icon-wrapper {
        width: 36px;
        height: 36px;
        border-radius: 50%;
        display: flex;
        align-items: center;
        justify-content: center;
        flex-shrink: 0;

        .icon {
          font-size: 20px;
          color: white;
          margin-bottom: 1px;
        }
      }

      .content {
        flex: 1;
        min-width: 0;

        .label {
          color: var(---N9, var(---N9, #1e2226));
          font-size: 12px;
          font-style: normal;
          font-weight: 400;
          line-height: 20px;
        }

        .value-wrapper {
          display: flex;
          align-items: flex-end;
          gap: 8px;
          .value {
            color: var(---N9, var(---N9, #1e2226));
            font-family: 'PingFang SC Medium';
            font-size: 24px;
            font-style: normal;
            font-weight: 500;
            line-height: 32px;
          }
          .clicked {
            color: var(---P6, var(---P6, #02b96b));
          }
          .unit {
            color: var(---N9, var(---N9, #1e2226));
            font-size: 12px;
            font-style: normal;
            font-weight: 400;
            line-height: 20px;
          }
        }
      }
      &.statistics-item-clicked:hover {
        cursor: pointer;
        border-color: #02b96b;
        .value {
          opacity: 0.8;
        }
      }
    }
  }

  .page-container {
    border-radius: 8px;
    height: 100%;

    .list-search-wrapper {
      .search-content {
        :deep(.el-input) {
          width: 250px;
        }
        display: flex;
        gap: 8px;
      }

      .icon-shaixuan {
        color: inherit;
      }
    }

    .head-tools {
      display: flex;
      align-items: center;
      gap: 16px;

      .iconfont,
      .Root-tyicon {
        color: #666666;
        cursor: pointer;
      }

      .split-line {
        width: 1px;
        height: 16px;
        background-color: #dedede;
      }
      .prepend-tool {
        display: flex;
        width: 56px;
        height: 28px;
        box-sizing: border-box;
        .icon {
          width: 28px;
          height: 28px;
          display: flex;
          justify-content: center;
          align-items: center;
          background-color: #fff;
          border-radius: 0 var(---S, 4px) var(---S, 4px) 0;
          border: 1px solid var(---N4, #dfe2e6);
          icon-Root,
          .Root-tyicon {
            color: #666666;
            cursor: pointer;
          }
        }
        .icon:nth-child(1) {
          border-radius: var(---S, 4px) 0 0 var(---S, 4px);
          border-right-color: transparent;
        }
        .icon:nth-child(2) {
          border-left-color: transparent;
        }
        .view-mode-table {
          border-right-color: #02b96b !important;
          border-color: #02b96b;
          .iconfont {
            color: #02b96b;
          }
        }
        .view-mode-card {
          border-left-color: #02b96b !important;
          border-color: #02b96b;
          .iconfont {
            color: #02b96b;
          }
        }
      }
    }
    &.page-card {
      :deep(.list-table) {
        background-color: transparent;
      }
    }
  }
  .fullscreen {
    margin: 0;
    border-radius: 0;
  }

  :deep(.el-tag__content) {
    display: flex;
    align-items: center;
    gap: 4px;
  }

  .page-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 24px 24px 0 24px;
    .use-handbook {
      color: var(--el-color-primary);
      font-size: 14px;
      display: flex;
      align-items: center;
      cursor: pointer;
      :deep(.el-icon) {
        margin-right: 5px;
        font-size: 14px;
      }
    }
  }

  .project-icon {
    width: 32px;
    height: 32px;
    border-radius: 8px;
    overflow: hidden;
    flex-shrink: 0;
    :deep(.el-image) {
      min-width: 32px !important;
      min-height: 32px !important;
    }

    img {
      width: 32px;
      height: 32px;
      object-fit: contain;
    }
  }

  .project-info {
    display: flex;
    flex-direction: column;
    justify-content: center;
  }

  .project-name {
    display: flex;
    align-items: center;
    color: var(---N9, var(---N9, #1e2226));
    font-family: 'PingFang SC Medium';
    font-size: 14px;
    font-style: normal;
    font-weight: 500;
    line-height: 22px;
    margin-bottom: 4px;
    cursor: pointer;
    .content:hover {
      color: var(--el-color-primary) !important;
    }
  }

  .project-id {
    color: var(---N9, var(---N9, #1e2226));
    font-size: 12px;
    font-style: normal;
    font-weight: 400;
    line-height: 20px;
  }

  // 视图切换控件
  .view-controls {
    margin-right: 12px;
  }

  // 卡片容器样式
  .cards-container {
    background-color: transparent;
  }

  .cards-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
    gap: 12px;
  }

  .project-card {
    background: #ffffff;
    border: 1px solid #ebeef5;
    border-radius: 16px;
    padding: 16px;
    cursor: pointer;
    transition: all 0.2s ease;

    &:hover {
      border-color: #02b96b;
      .header-right {
        opacity: 1;
      }
    }
  }

  // 卡片头部
  .card-header {
    display: flex;
    align-items: flex-start;
    gap: 16px;
    margin-bottom: 8px;

    .header-left {
      display: flex;
      align-items: center;
      width: calc(100% - 48px);
      gap: 16px;
      flex: 1;
    }

    .header-right {
      flex-shrink: 0;
      opacity: 0;
    }
  }

  // 操作菜单触发器
  .action-menu-trigger {
    width: 18px;
    height: 18px;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    border-radius: 2px;
    transition: background-color 0.2s ease;

    &:hover {
      background-color: rgba(0, 0, 0, 0.1);
    }

    icon-Root,
    .Root-tyicon {
      font-size: 14px;
      color: #666666;
    }
  }

  // 操作菜单样式
  :deep(.action-menu-popover) {
    padding: 8px 0;
    border-radius: 8px;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
  }

  .action-menu {
    padding: 6px;
    border-radius: 10px;
    box-shadow: 0 6px 36px 0 rgba(6, 8, 27, 0.08);
    .menu-item {
      display: flex;
      align-items: center;
      width: 72px;
      padding: 5px 12px;
      border-radius: 6px;
      cursor: pointer;
      transition: background-color 0.2s ease;
      font-size: 14px;
      color: #1f1f1f;

      &:hover:not(.disabled) {
        background-color: #f5f5f5;
      }

      &.disabled {
        opacity: 0.5;
        cursor: not-allowed;

        &:hover {
          background-color: transparent;
        }
      }

      .iconfont,
      .Root-tyicon {
        font-size: 14px;
        color: #666666;
      }

      span {
        font-family: 'PingFang SC', sans-serif;
        font-weight: 400;
        line-height: 22px;
      }
    }

    .menu-divider {
      height: 1px;
      background: #ebeef5;
      margin: 4px 0;
    }
  }

  .project-avatar {
    width: 32px;
    height: 32px;
    border-radius: 8px;
    overflow: hidden;
    flex-shrink: 0;
    background: #f5f5f5;
    :deep(.el-image) {
      min-width: 32px !important;
      min-height: 32px !important;
    }

    img {
      width: 32px;
      height: 32px;
      object-fit: contain;
    }
  }

  .project-meta {
    width: calc(100% - 32px);
    .project-meta-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 6px;
    }
  }

  // 卡片内容
  .project-title {
    width: 100%;
    font-family: 'PingFang SC Medium', sans-serif;
    font-size: 16px;
    font-weight: 500;
    line-height: 24px;
    color: #1f1f1f;
    margin-bottom: 6px;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
  .card-body {
    margin-left: 32px;

    .metrics-grid {
      display: flex;
      justify-content: center;
      gap: 20px;
      margin-left: 10px;
      .split-line {
        width: 1px;
        height: auto;
        flex-shrink: 0;
        background: var(---N3, #ededed);
      }
    }

    .project-id {
      .project-code {
        font-family: 'PingFang SC', sans-serif;
        font-size: 13px;
        font-weight: 400;
        line-height: 22px;
        color: #1f1f1f;

        &::before {
          content: '项目ID：';
          color: #999999;
        }
      }
    }

    .metric-item {
      display: flex;
      flex-direction: column;
      gap: 6px;
      flex: 1;

      .metric-label {
        color: var(---N9, var(---N9, #1e2226));
        font-size: 12px;
        font-style: normal;
        font-weight: 400;
        line-height: 20px;
      }

      .metric-value {
        color: var(---N9, var(---N9, #1e2226));
        font-family: 'PingFang SC Medium';
        font-size: 16px;
        font-style: normal;
        font-weight: 500;
        line-height: 24px;

        &.creator {
          .el-avatar {
            width: 20px !important;
            height: 20px !important;
          }
        }
      }
    }
  }

  // 分割线
  .card-divider {
    height: 1px;
    background: #ededed;
    margin: 16px 0;
  }

  // 卡片底部
  .card-footer {
    display: flex;
    align-items: center;
    gap: 8px;
    margin-bottom: 8px;
    .create-time-container {
      display: flex;
      align-items: center;
      gap: 8px;
    }

    .creator-info {
      display: flex;
      align-items: center;
      gap: 4px;
      padding: 0 4px;

      .creator-avatar {
        width: 20px;
        height: 20px;
      }

      .creator-name {
        font-family: 'PingFang SC', sans-serif;
        font-size: 12px;
        font-weight: 400;
        line-height: 20px;
        color: #999999;
      }
    }

    .split-line {
      width: 1px;
      height: 10px;
      flex-shrink: 0;
      background: var(---N3, #ededed);
    }

    .create-time {
      display: flex;
      align-items: center;
      gap: 6px;
      color: #999999;
      font-size: 12px;
      line-height: 20px;
      flex: 1;

      .time-icon {
        width: 14px;
        height: 14px;
        opacity: 0.6;
      }
    }

    .action-button {
      margin-left: auto;
      background: transparent !important;
      border: none !important;
      color: #999999 !important;
      padding: 4px 8px !important;
      height: auto !important;
      font-size: 12px !important;

      &:hover {
        background: #f5f5f5 !important;
        color: #1f1f1f !important;
      }

      .action-icon {
        width: 12px;
        height: 12px;
        margin-left: 4px;
      }
    }
  }

  // 响应式设计
  @media (max-width: 768px) {
    .cards-grid {
      grid-template-columns: 1fr;
      gap: 12px;
    }

    .project-card {
      padding: 16px;
    }

    .card-header {
      gap: 12px;
    }

    .project-avatar {
      width: 32px;
      height: 32px;
    }

    .project-meta .project-title {
      font-size: 14px;
      line-height: 20px;
    }
  }

  .out-time {
    display: flex;
    gap: 10px;
    color: var(--el-color-danger);
  }

  :deep(.el-pagination) {
    justify-content: flex-end;
    padding: 12px 16px;
    background-color: #fff;
    border-radius: 10px;
  }

  .start-time {
    display: flex;
    flex-direction: column;
  }

  :deep(.card-pagination.el-pagination) {
    width: calc(100% - 32px);
    position: fixed;
    bottom: 16px;
    // box-shadow: 0 -3px 16px 0 rgba(0, 0, 0, 0.04);
    z-index: 666;
    background-color: transparent;
    padding: 12px 16px;
    border-radius: 10px;
  }

  .buttons {
    display: flex;
    flex-direction: column;
    align-items: start;
    gap: 8px;
    padding-right: 24px;
    .link-label {
      font-size: 12px;
    }
  }
</style>
