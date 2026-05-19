<template>
  <div class="report-list">
    <div class="report-list-header">
      <div class="left">
        <span>{{ currentTab === 'my' ? '我的报告' : '团队报告' }}</span>
        <span class="count">{{ reportList.length }}</span>
      </div>
      <div class="right">
        <div class="card-item-actions">
          <el-tooltip placement="top" content="返回">
            <svg
              class="btn-icon"
              width="16"
              height="16"
              viewBox="0 0 16 16"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              @click.stop="handleBack"
            >
              <path
                d="M4.82353 2.13314L2.1352 4.90293C2.05989 4.98053 2.05989 5.10393 2.1352 5.18152L4.82353 7.95132M5.17647 12.7998L9.76471 12.7998C12.1038 12.7998 14 11.0632 14 8.92102C14 6.77882 12.1038 5.04223 9.76471 5.04223L2.14092 5.04223"
                stroke="currentColor"
                stroke-width="1.2"
                stroke-linecap="round"
              />
            </svg>
          </el-tooltip>
          <span class="gap"></span>
          <el-popover
            v-if="currentTab === 'my' && getPermission?.({ type: 'edit' })"
            v-model:visible="timerPopupVisible"
            trigger="click"
            :show-arrow="false"
          >
            <template #reference>
              <div>
                <el-tooltip placement="top" content="复制">
                  <svg
                    class="btn-icon"
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
                <el-button @click.stop="timerPopupVisible = false">取消</el-button>
                <el-button type="primary" @click.stop="handleCopyFolder">确认</el-button>
              </div>
            </div>
          </el-popover>
          <span v-if="currentTab === 'my' && getPermission?.({ type: 'edit' })" class="gap"></span>
          <el-tooltip placement="top" :content="isFullScreen ? '侧边浮窗' : '侧边浮窗吸附'">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              viewBox="0 0 16 16"
              fill="none"
              class="btn-icon icon-full"
              @click.stop="emit('toggleFull')"
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
      </div>
    </div>
    <div
      v-for="(item, index) in reportList"
      :key="item.id"
      class="report-content"
      @click="toDetail(item)"
    >
      <div class="report-item">
        <div class="title">
          <span class="one-row-ellipsis">{{ item.reportTitle }}</span>
          <div class="actions" v-if="currentTab === 'my' && getPermission?.({ type: 'edit' })">
            <el-tooltip placement="top" content="复制">
              <svg
                class="btn-icon"
                width="16"
                height="16"
                viewBox="0 0 16 16"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                @click.stop="handleCopy(index)"
              >
                <path
                  d="M5.33333 2H12.6667C13.403 2 14 2.59695 14 3.33333V10.6667M10 14H3.33333C2.59695 14 2 13.403 2 12.6667V6C2 5.26362 2.59695 4.66667 3.33333 4.66667H10C10.7364 4.66667 11.3333 5.26362 11.3333 6V12.6667C11.3333 13.403 10.7364 14 10 14Z"
                  stroke="currentColor"
                  stroke-width="1.2"
                  stroke-linecap="round"
                />
              </svg>
            </el-tooltip>
            <el-tooltip placement="top" content="删除">
              <svg
                class="btn-icon"
                width="16"
                height="16"
                viewBox="0 0 16 16"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                @click.stop="handleDelete(index)"
              >
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 16 16"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M12 6C12 13.3333 12 14 8 14C4 14 4 13.3333 4 6"
                    stroke="currentColor"
                    stroke-width="1.2"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                  <path
                    d="M2.66699 4C6.22255 4 9.77813 4 13.3337 4"
                    stroke="currentColor"
                    stroke-width="1.2"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                  <path
                    d="M6.66699 2C9.33366 2 9.66699 2.00001 9.66699 2.00001"
                    stroke="currentColor"
                    stroke-width="1.2"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                  <path
                    d="M6.66699 7.33301V10.6663"
                    stroke="currentColor"
                    stroke-width="1.2"
                    stroke-linecap="round"
                  />
                  <path
                    d="M9.33301 7.33301V10.6663"
                    stroke="currentColor"
                    stroke-width="1.2"
                    stroke-linecap="round"
                  />
                </svg>
              </svg>
            </el-tooltip>
          </div>
        </div>
        <div class="content three-row-ellipsis">{{ getContent(item) }}</div>
        <div class="footer">
          <div class="user">
            <div
              class="avatar"
              :style="{
                backgroundImage: `url(${
                  item.avatar ||
                  'https://lute-public-prod.oss-cn-shenzhen.aliyuncs.com/C00000001/temp/Group%201896.png'
                })`,
              }"
            ></div>
            <span>{{ item.creatorName }}</span>
            <span>-</span>
            <span>{{ item.deptName }}</span>
          </div>
          <span class="gap"></span>
          <div class="time">{{ item.createTime }}</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
  import dayjs from 'dayjs';
  import weekOfYear from 'dayjs/plugin/weekOfYear';
  import advancedFormat from 'dayjs/plugin/advancedFormat';
  import { type MpcWeeklyReportContracts } from '@/api';
  import { ElMessage, type MessageHandler } from 'element-plus';
  import { mpcWeeklyReportApi } from '@/api';
  import { WeeklyReportType } from '@/utils/weeklyReportType';
  import { useReport } from '@/hooks/event/useReport';
  import { copyFolder, onDeleteReport } from './utils';
  import WeekPicker from './components/WeekPicker.vue';

  dayjs.extend(weekOfYear);
  dayjs.extend(advancedFormat);
  const getPermission = inject<(params: { type: string }) => boolean>('getPermission');

  const props = withDefaults(
    defineProps<{
      info: { period: string; branch: string; reportType: string } | null;
      currentTab: 'my' | 'team';
      isFullScreen: boolean;
    }>(),
    {}
  );
  const reportList = ref<Array<MpcWeeklyReportContracts.MarketWeeklyReportBean>>([]);
  const branch = inject<Ref<string>>('branch');

  const initData = async () => {
    const list = await mpcWeeklyReportApi.luteosMarketWeekReportListByPeriod({
      ...props.info,
      reportTypes: props.info?.reportType,
      branch: branch.value,
      teamReport: props.currentTab === 'team' ? 1 : 0,
    });
    reportList.value = list.recordList || [];
  };
  watchEffect(() => {
    initData();
  });
  const emit = defineEmits<{
    back: [];
    edit: [data: any];
    delete: [data: any];
    toggleFull: [];
    toDetail: [item: MpcWeeklyReportContracts.MarketWeeklyReportBean];
  }>();

  const handleBack = () => {
    messageHandler?.close();
    messageHandler = null;
    emit('back');
  };
  const dateType = inject<'week' | 'month'>('dateType', 'week');
  const handleDelete = async (index) => {
    const data = reportList.value[index];
    await onDeleteReport(
      data,
      () => {
        reportList.value.splice(index, 1);
        if (reportList.value.length === 0) {
          emit('back');
        }
      },
      () => {
        reportList.value.splice(index, 0, data);
      }
    );
  };
  const { report } = useReport();
  const toDetail = (item: MpcWeeklyReportContracts.MarketWeeklyReportBean) => {
    emit('toDetail', item);
    nextTick(() => {
      report('viewWeeklyReportDetail', {
        reportId: item.reportId,
      });
    });
  };
  const timerPopupVisible = ref(false);
  const copyWeek = ref('');
  const weekList = inject<Ref<MpcWeeklyReportContracts.WeekBean[]>>('weekList')!;
  let messageHandler: MessageHandler | null = null;
  const handleCopyFolder = async () => {
    const { period: item, reportType, branch } = props.info!;
    if (!item) return;
    await copyFolder(item, copyWeek.value, dateType, weekList.value, reportType, branch);
    messageHandler = ElMessage.success({
      showClose: true,
      message: () =>
        h('div', [
          h('span', '复制成功，报告已为你复制至我的报告页面'),
          h(
            'span',
            {
              style: { color: '#02B96B', cursor: 'pointer', marginLeft: '20px' },
              onClick: () => handleBack(),
            },
            '前往查看'
          ),
        ]),
      duration: 2000,
    });
    timerPopupVisible.value = false;
  };

  const handleCopy = async (index) => {
    timerPopupVisible.value = false;
    const item = reportList.value[index];
    if (!item?.period) return;
    await mpcWeeklyReportApi.luteosMarketWeekReportCopyReport({
      reportId: item.reportId!,
    });
    initData();
  };
  const getContent = (item) => {
    let html = item.detail?.configContent || '-';
    // 匹配 img 标签,替换为 [图片]
    html = html.replace(/<img[^>]*>/g, '[图片]');

    const div = document.createElement('div');
    div.innerHTML = html;
    return div.textContent || div.innerText;
  };
</script>

<style scoped lang="scss">
  .report-list {
    .report-list-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 20px 20px 10px;
      color: var(---N9, #1f1f1f);

      /* 突出/Medium 18 */
      font-family: 'PingFang SC Medium';
      font-size: 18px;
      font-style: normal;
      font-weight: 500;
      line-height: 26px; /* 144.444% */
      position: sticky;
      top: 0;
      z-index: 1;
      background: #fff;
      .left {
        display: flex;
        align-items: center;
        gap: 8px;
      }
      .count {
        color: var(---N6, #999);

        /* 常规/Regular 14 */
        font-family: 'PingFang SC';
        font-size: 14px;
        font-style: normal;
        font-weight: 400;
        line-height: 22px; /* 157.143% */
      }
      .right {
        display: flex;
        align-items: center;
        color: #999;
        .card-item-actions {
          display: flex;
          align-items: center;
          color: currentColor;
          .btn-icon {
            cursor: pointer;
          }
          .icon-full {
            cursor: pointer;
          }
          .gap {
            flex: none;
            margin: 0 10px;
            width: 1px;
            height: 12px;
            background-color: #d9d9d9;
          }
        }
      }
    }
    .report-content {
      margin-top: 6px;
      padding: 0px 20px;
      &:hover {
        background: var(---N1, #f7f7f7);
        .actions {
          visibility: visible;
        }
      }
      .actions {
        display: flex;
        align-items: center;
        gap: 18px;
        color: #999;
        visibility: hidden;
        svg {
          cursor: pointer;
        }
      }
    }
    .report-item {
      padding: 12px 0;
      border-bottom: 1px solid var(---N2, #f5f5f5);
      cursor: pointer;
      position: relative;

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
    justify-content: space-between;
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

      .avatar {
        width: 16px;
        height: 16px;
        flex-shrink: 0;
        border-radius: 12px;
        background-size: cover;
        background-repeat: no-repeat;
      }
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
    cursor: pointer;
    &:hover {
      color: #1f1f1f;
    }
  }
</style>
