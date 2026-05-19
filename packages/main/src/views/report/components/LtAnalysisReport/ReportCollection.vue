<template>
  <div class="report-Collection">
    <div v-for="(item, index) in list" :key="item" class="report-item">
      <div :style="{ flex: 1 }" @click="toDetail(item.period)">
        <div class="title one-row-ellipsis">
          <span>{{ item.period }}</span>
          <template v-if="item.isSingle">
            <span>-{{ periodMap[item.period][0].reportTitle }}</span>
          </template>
        </div>
        <div class="footer">
          <div class="user">
            <AvatarStack :avatars="getAvatar(periodMap[item.period])" :max="5" />
            <span>{{ getCreator(item.period) }}</span>
            <span>-</span>
            <span>{{ getDeptName(item.period) }}</span>
          </div>
          <span class="gap">|</span>
          <div class="time">{{ getUpdateTime(item.period) }}</div>
        </div>
      </div>
      <div class="actions">
        <el-popover
          v-if="currentTab === 'my' && getPermission?.({ type: 'edit' })"
          v-model:visible="timerPopupVisible[index]"
          trigger="click"
          :show-arrow="false"
        >
          <template #reference>
            <div>
              <el-tooltip placement="top" content="复制">
                <svg
                  class="btn-icon icon"
                  width="16"
                  height="16"
                  viewBox="0 0 16 16"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M5.33333 2H12.6667C13.403 2 14 2.59695 14 3.33333V10.6667M10 14H3.33333C2.59695 14 2 13.403 2 12.6667V6C2 5.26362 2.59695 4.66667 3.33333 4.66667H10C10.7364 4.66667 11.3333 5.26362 11.3333 6V12.6667C11.3333 13.403 10.7364 14 10 14Z"
                    stroke="currentColor"
                    stroke-width="1.2"
                    stroke-linecap="round"
                  />
                </svg>
              </el-tooltip>
            </div>
          </template>
          <div class="copy-timepick-popover">
            <div class="copy-popover-title">分析时间</div>
            <WeekPicker v-model="copyWeek" :date-type="dateType" />
            <div class="copy-popover-footer">
              <el-button @click.stop="handleClostePopover(index)">取消</el-button>
              <el-button type="primary" @click.stop="handleCopyFolder(index)">确认</el-button>
            </div>
          </div>
        </el-popover>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
  import dayjs from 'dayjs';
  import weekOfYear from 'dayjs/plugin/weekOfYear';
  import weekYear from 'dayjs/plugin/weekYear';
  import advancedFormat from 'dayjs/plugin/advancedFormat';
  import isoWeek from 'dayjs/plugin/isoWeek';
  import { type MpcWeeklyReportContracts } from '@/api';
  import { useStore } from '@/store/modules/useStore';
  import { ElMessage } from 'element-plus';
  import { WeeklyReportType } from '@/utils/weeklyReportType';
  import { useReport } from '@/hooks/event/useReport';
  import { copyFolder } from './utils';
  import WeekPicker from './components/WeekPicker.vue';
  import AvatarStack from './components/AvatarStack.vue';

  dayjs.extend(weekOfYear);
  dayjs.extend(advancedFormat);
  dayjs.extend(isoWeek);
  dayjs.extend(weekYear);

  const getPermission = inject<(params: { type: string }) => boolean>('getPermission');
  const props = withDefaults(
    defineProps<{
      list: { period: string; isSingle?: boolean }[];
      periodMap: Record<string, MpcWeeklyReportContracts.MarketWeeklyReportBean[]>;
      currentTab: string;
    }>(),
    {
      list: () => [],
      periodMap: () => ({}),
    }
  );
  const emit = defineEmits<{
    toDetail: [report: MpcWeeklyReportContracts.MarketWeeklyReportBean, isSingle: boolean];
    toList: [payload: { period: string; branch: string; reportType: string }, isSingle: boolean];
    onDelete: [string];
    copyFolder: [];
  }>();
  const dateType = inject<'week' | 'month'>('dateType', 'week');

  const timerPopupVisible = reactive<boolean[]>([]);
  // watchEffect(() => {
  //   props.list.forEach((item) => {
  //     if (!(item in timerPopupVisible)) {
  //       timerPopupVisible[item] = false;
  //     }
  //   });
  // });
  const store = useStore();

  const handleClostePopover = (index: number) => {
    timerPopupVisible[index] = false;
  };

  const weekList = inject<Ref<MpcWeeklyReportContracts.WeekBean[]>>('weekList')!;
  const copyWeek = ref(
    dateType === 'month' ? dayjs().format('YYYY-MM') : weekList.value[0]?.week || ''
  );
  const { report } = useReport();
  const toDetail = (item: string) => {
    if (isSingleFile(item)) {
      emit('toDetail', props.periodMap[item][0], true);
    } else {
      const reportList = props.periodMap[item];
      const reportTypeSet = new Set<number>();
      reportList.forEach((report) => {
        reportTypeSet.add(report.reportType || 7);
      });
      emit(
        'toList',
        {
          period: item,
          branch: reportList[0].branch,
          reportType: Array.from(reportTypeSet).join(','),
        },
        false
      );
    }
    nextTick(() => {
      report('viewReportCollection', { period: item });
    });
  };
  const isSingleFile = (period: string) => {
    const reportList = props.periodMap[period];
    return reportList.length === 1;
  };
  const handleCopyFolder = async (index: number) => {
    const item = props.list[index];
    if (!item) return;
    const reportList = props.periodMap[item.period];
    const reportTypeSet = new Set<number>();
    reportList.forEach((report) => {
      reportTypeSet.add(report.reportType!);
    });
    const reportType = Array.from(reportTypeSet).join(',');
    const branch = reportList?.[0]?.branch;
    await copyFolder(
      props.list[index].period,
      copyWeek.value,
      dateType,
      weekList.value,
      reportType,
      branch
    );
    ElMessage.success('复制成功');
    timerPopupVisible[index] = false;
    emit('copyFolder');
  };
  const userInfo = store.getUserInfo();

  const getAvatar = (collections: MpcWeeklyReportContracts.MarketWeeklyReportBean[]) => {
    // 去重
    const set = new Set();
    const result: MpcWeeklyReportContracts.MarketWeeklyReportBean[] = [];
    for (const item of collections) {
      if (!set.has(item.creatorName)) {
        set.add(item.creatorName);
        result.push(item);
      }
    }
    return result;
  };

  const getCreator = (period: string) => {
    const collections = props.periodMap[period] || [];
    return (
      collections.find((creator) => creator === userInfo.memberCode) ||
      collections[collections.length - 1]?.creatorName
    );
  };
  const getDeptName = (period: string) => {
    const collections = props.periodMap[period] || [];
    if (collections.find((creator) => creator === userInfo.memberCode)) {
      return userInfo.deptName || '';
    }
    return collections[collections.length - 1]?.deptName || '';
  };
  const getUpdateTime = (period: string) => {
    const collections = props.periodMap[period] || [];
    return collections[0]?.createTime || '';
  };
</script>

<style scoped lang="scss">
  .report-Collection {
    .report-item {
      border: 1px solid transparent;
      padding: 12px 20px;
      cursor: pointer;
      position: relative;
      display: flex;
      justify-content: space-between;
      align-items: start;

      .actions {
        color: #999;
        visibility: hidden;
        svg {
          cursor: pointer;
        }
      }
      &:hover {
        background: var(---N1, #f7f7f7);
        .actions {
          visibility: visible;
        }
      }

      &:first-child {
        margin-top: 10px;
      }

      &:after {
        position: absolute;
        content: '';
        background: var(---N2, #f5f5f5);
        height: 1px;
        bottom: 0;
        left: 20px;
        right: 20px;
      }

      &:last-child:after {
        display: none;
      }
    }
  }

  .one-row-ellipsis {
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    width: 100%;
  }
  // 三行省略
  .three-row-ellipsis {
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 3;
  }
  .title {
    display: flex;
    justify-content: start;
    align-items: center;
    color: var(---N9, #1f1f1f);
    /* 重要/Medium 16 */
    font-family: 'PingFang SC Medium';
    font-size: 16px;
    font-style: normal;
    font-weight: 500;
    line-height: 24px; /* 150% */
  }

  .content {
    color: var(---N8, #666);
    /* 较弱/Regular 12 */
    font-family: 'PingFang SC';
    font-size: 12px;
    font-style: normal;
    font-weight: 400;
    line-height: 20px; /* 166.667% */
    margin-top: 8px;
  }

  .footer {
    color: var(---N6, #999);
    /* 较弱/Regular 12 */
    font-family: 'PingFang SC';
    font-size: 12px;
    font-style: normal;
    font-weight: 400;
    line-height: 20px; /* 166.667% */
    display: flex;
    align-items: center;
    gap: 8px;
    margin-top: 8px;

    .user {
      display: flex;
      align-items: center;
      gap: 8px;
    }

    .gap {
      color: #d9d9d9;
    }
  }
  .copy-timepick-popover {
    padding: 20px;
    .copy-popover-title {
      font-size: 14px;
      font-weight: 500;
      margin-bottom: 8px;
    }
    .copy-popover-footer {
      display: flex;
      justify-content: flex-end;
      gap: 8px;
      margin-top: 12px;
    }
  }
  .btn-icon {
    &:hover {
      color: #1f1f1f;
    }
  }
</style>
