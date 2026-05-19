<template>
  <div class="mpc-new-product-analysis" :style="{ height: height }">
    <div class="main-container">
      <main class="content" :class="{ 'full-screen': isFullScreen }">
        <div class="embedded-frame" v-if="!iframeSrc">
          <div class="list-empty">
            <EmptyAnimation name="listEmpty" :width="128" :height="128" />
            <div class="empty-tip">请选择品线</div>
          </div>
        </div>
        <iframe
          v-else
          class="embedded-frame"
          frameborder="0"
          :src="iframeSrc"
          @load="handleLoad"
        ></iframe>
        <div class="toggle-icon" :class="{ 'toggle-icon-active': sidebarVisible }">
          <div
            class="toggle-icon-middle"
            :class="{ 'toggle-icon-middle-deactive': !sidebarVisible }"
            @click="toggleSidebar"
          >
            <el-tooltip placement="top-start" :content="sidebarVisible ? '收起' : '展开'">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="12"
                height="12"
                viewBox="0 0 12 12"
                fill="none"
              >
                <path
                  d="M4 10L8 6L4 2"
                  :stroke="sidebarVisible ? '#999999' : '#fff'"
                  stroke-width="1.5"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
              </svg>
            </el-tooltip>
          </div>
        </div>
        <aside class="sidebar" :style="{ display: sidebarVisible ? 'block' : 'none' }">
          <!-- 业务分析面板 -->
          <div class="analysis-panel">
            <LtAnalysisReport
              ref="analysisReportRef"
              v-model:isFullScreen="isFullScreen"
              :report-type="WeeklyReportType.GoalReport"
              :branch="form.branch"
              :getPermission="getPermission"
              @before-init-columns="onBeforeInitColumns"
            />
          </div>
        </aside>
      </main>
    </div>
  </div>
</template>

<script setup lang="ts" name="retailGoal">
  import { MarketingContracts, mpcWeeklyReportApi, MpcWeeklyReportContracts } from '@/api';
  import LtAnalysisReport from '@/views/report/components/LtAnalysisReport/index.vue';
  import { WeeklyReportType } from '@/utils/weeklyReportType';
  import EmptyAnimation from '@/components/EmptyAnimation/index.vue';
  import { checkPermission } from '@/utils/permission';

  const gtmList = ref<MarketingContracts.GtmOptionBean[]>([]);
  const options = computed<any[]>(() => {
    const cascaderObj =
      gtmList.value.reduce((opts, cur) => {
        // 如果没有parentName，则默认为'0000'，最后抽离到父级
        const parentName = cur.parentName || '0000';
        if (!Reflect.has(opts, parentName)) {
          Reflect.set(opts, parentName, []);
        }
        opts[parentName].push({ ...cur, children: null });
        return opts;
      }, {}) || {};
    return (
      Object.entries(cascaderObj).reduce((prev, [label, children]) => {
        if (label === '0000') {
          return [...prev, ...children];
        }
        return [
          ...prev,
          {
            desc: label,
            value: label,
            children,
          },
        ];
      }, []) || []
    );
  });
  const analysisReportRef = ref<InstanceType<typeof LtAnalysisReport>>();

  const getPermission = ({ type }) => {
    switch (type) {
      case 'view':
      case 'add':
      case 'edit':
      case 'delete':
        return checkPermission('retailGoal-edit');
      default:
        return false;
    }
  };
  const getOptions = async () => {
    const res = await mpcWeeklyReportApi.luteosMarketWeekReportQueryOptions({
      platform: 'lute_erp',
      componentName: 'shopifyGoalOption', // 每个功能模块的标识
    });
    gtmList.value = res?.optionBeanList || [];
  };

  function setBranch(value?: string) {
    if (value) {
      const option = gtmList.value.find((item) => item.value === value);
      form.branch = option?.value || '';
      setIframeSrc(option?.statisticsUrl);
    }
  }

  // getOptions().then(() => {
  //   if (gtmList.value?.[0]?.value) {
  //     setBranch(gtmList.value[0].value);
  //   }
  // });
  const handleChange = async (value: string) => {
    form.branch = value[value.length - 1];
    setBranch(form.branch);
  };
  const form = reactive({
    branch: 'retailGoal',
  });

  const iframeSrc = ref(
    'https://finebi.luteos.com/webroot/decision/v5/design/report/709683f0385047d988ba95d062fb9f67/view'
  );
  const loading = ref(true);
  const handleLoad = () => {
    loading.value = false;
  };
  const setIframeSrc = async (data?: string) => {
    if (!data) return;
    iframeSrc.value = data;
  };

  const sidebarVisible = ref(false);
  const toggleSidebar = () => {
    sidebarVisible.value = !sidebarVisible.value;
    isFullScreen.value = false;
  };

  const onBeforeInitColumns = (
    recordList: MpcWeeklyReportContracts.WeekReportConfigBean[] | undefined,
    reportType: WeeklyReportType
  ) => {
    if (reportType === WeeklyReportType.AmazonDayReport) {
      // 针对 AmazonDayReport 的特殊处理
      recordList[0].defaultContent =
        '<p>1、计划</p><br/><p>2、实施</p><br/><p>3、检查</p><br/><p>4、复盘总结</p><br/>';
    }
  };

  const height = ref('auto');
  // 监听 .el-main 的高度
  const calcHeight = () => {
    const el = document.querySelector('.el-main');
    if (el) {
      height.value = `${el.clientHeight}px`;
    }
  };
  const obs = new ResizeObserver(calcHeight);
  calcHeight();
  onMounted(() => {
    obs.observe(document.querySelector('.el-main'));
    calcHeight();
  });
  onUnmounted(() => {
    obs.disconnect();
  });
  const isFullScreen = ref(false);
</script>

<style scoped lang="scss">
  .mpc-new-product-analysis {
    .main-container {
      height: 100%;
      display: flex;
      flex-direction: column;
      min-height: 0;
      flex: 1;
      overflow: auto;
      padding-bottom: 10px;

      .header {
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 10px 16px;
        background-color: #fff;
        border-radius: 4px;

        .header-left,
        .header-right {
          display: flex;
          align-items: center;
        }
      }

      .content {
        min-height: 0;
        flex: 1;
        display: flex;
        align-items: stretch;
        height: 100%;
        gap: 8px;
        padding: 0 16px;
        &.full-screen {
          padding-right: 0;
        }
        .list-empty {
          display: flex;
          flex-direction: column;
          align-items: center;
          padding-top: 70px;

          .empty-tip {
            color: var(---N9, #1f1f1f);
            /* 常规/Medium 14 */
            font-family: 'PingFang SC';
            font-size: 14px;
            font-style: normal;
            font-weight: 500;
            line-height: 22px; /* 157.143% */
          }
        }

        .embedded-frame {
          width: 0;
          height: 100%;
          flex: 1;
          border-radius: 10px;
          background-color: #fcfcfc;
        }

        .toggle-icon {
          position: relative;
          // right: -8px;
          cursor: pointer;
          width: 0;
          flex: none;
          transform: translateX(4px);

          &.toggle-icon-active {
            // right: -18px;
            transform: translateX(0px);
          }

          .toggle-icon-middle {
            position: absolute;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            width: 22px;
            height: 26px;
            display: flex;
            justify-content: center;
            align-items: center;
            background-color: #fff;
            box-shadow: -2px 0 2px rgba(0, 0, 0, 0.1);
            border-radius: 6px 0 0 6px;
            &.toggle-icon-middle-deactive {
              // right: -9px;
              background-color: var(--el-color-primary);

              svg {
                transform: rotate(180deg);
              }
            }
          }
        }

        .sidebar {
          border-radius: 10px;

          .analysis-panel {
            height: 100%;
          }
        }
      }
    }
  }
</style>
