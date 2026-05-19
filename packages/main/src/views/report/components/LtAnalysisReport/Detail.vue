<template>
  <div class="report-detail">
    <div class="title">
      <span class="title-text">
        {{ reportDetail.groupAreaId ? `${reportDetail.groupName}-${reportDetail.areaName}-` : ''
        }}{{ reportDetail?.reportTitle }}
      </span>
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
                stroke="#999999"
                stroke-width="1.2"
                stroke-linecap="round"
              />
            </svg>
          </el-tooltip>
          <span class="gap"></span>
          <el-tooltip placement="top" :content="isFullScreen ? '侧边浮窗' : '侧边浮窗吸附'">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              viewBox="0 0 16 16"
              fill="none"
              class="icon-full"
              @click="emit('toggleFull')"
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
    <div class="header">
      <div class="left">
        <div class="user">
          <div
            class="avatar"
            :style="{ backgroundImage: 'url(' + reportDetail?.avatar + ')' }"
          ></div>
          <span>{{ reportDetail?.creatorName }}</span>
        </div>

        <span class="gap">|</span>
        <div class="time">{{ reportDetail?.startDate }} - {{ reportDetail?.endDate }}</div>
      </div>
    </div>
    <div class="content" ref="root">
      <div class="catalog">
        <template v-for="item in reportDetail?.itemList || []" :key="item.title">
          <div
            class="catalog-item"
            :class="{ 'is-active': activeCatalogId === item.title }"
            @click="handleScrollIntoView(item.title)"
          >
            <div class="catalog-item-title">{{ item.title }}</div>
            <div class="catalog-item-placeholder"></div>
          </div>
        </template>
      </div>
      <el-scrollbar>
        <el-collapse class="content-collapse" expand-icon-position="left" :model-value="titleList">
          <el-collapse-item
            :name="item.title"
            v-intersection-observer="[
              onIntersectionObserver,
              { root, rootMargin: '0px 0px -30% 0px' },
            ]"
            :id="item.title"
            v-for="item in reportDetail?.itemList || []"
            :key="item.title"
          >
            <template #title>
              <h3 class="content-title">{{ item.title }}</h3>
            </template>
            <template #icon="{ isActive }">
              <i
                class="collapsed-icon iconfont icon-sanjiaojiantouxiangxia"
                :class="{ 'is-collapsed': !isActive }"
              ></i>
            </template>
            <div class="w-e-text-container">
              <div data-slate-editor @click="onContentClick">
                <div class="content-data" v-html="item.configContent"></div>
              </div>
            </div>
          </el-collapse-item>
        </el-collapse>
      </el-scrollbar>
    </div>
    <div
      class="footer"
      v-if="
        currentTab === 'my' &&
        getPermission?.({ type: 'delete', data: { reportRow, reportDetail } })
      "
    >
      <el-button @click="handleCopy">复制</el-button>
      <el-button @click="handleDelete">删除</el-button>
      <el-button type="primary" @click="handleEdit">编辑报告</el-button>
    </div>
  </div>
  <el-image-viewer
    @close="previewImageUrl = ''"
    v-if="previewImageUrl"
    :url-list="[previewImageUrl]"
  />
</template>

<script setup lang="ts">
  import { mpcWeeklyReportApi, MpcWeeklyReportContracts } from '@/api';
  import { vIntersectionObserver } from '@vueuse/components';
  import '@wangeditor/editor/dist/css/style.css';
  import { ElMessage, MessageHandler } from 'element-plus';

  const getPermission = inject<(params: { type: string }) => boolean>('getPermission');

  const props = withDefaults(
    defineProps<{
      reportRow: any;
      reportDetail: MpcWeeklyReportContracts.MarketWeeklyReportBean;
      isFullScreen: boolean;
      currentTab: string;
    }>(),
    {
      reportRow: null,
      reportDetail: () => ({} as MpcWeeklyReportContracts.MarketWeeklyReportBean),
    }
  );

  const emit = defineEmits<{
    back: [];
    edit: [data: any];
    delete: [data: any];
    copy: [MpcWeeklyReportContracts.MarketWeeklyReportBean];
    toggleFull: [];
  }>();

  let messageHandler: MessageHandler | null = null;
  const handleCopy = async () => {
    const res = await mpcWeeklyReportApi.luteosMarketWeekReportCopyReport({
      reportId: props.reportDetail.reportId!,
    });
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
    emit('copy', res.weeklyReport!);
  };
  const handleBack = () => {
    messageHandler?.close();
    messageHandler = null;
    emit('back');
  };
  const handleEdit = () => {
    emit('edit', props.reportRow);
  };
  const handleDelete = () => {
    emit('delete', props.reportRow);
  };
  const previewImageUrl = ref<string>('');
  const onContentClick = (ev) => {
    if (ev.target?.tagName === 'IMG') {
      previewImageUrl.value = ev.target.src;
    }
  };
  const titleList = computed(() => {
    return props.reportDetail?.itemList?.map((item) => item.title) || [];
  });
  const activeCatalogId = ref<string>();
  onMounted(() => {
    if (props.reportDetail?.itemList?.length > 0) {
      activeCatalogId.value = props.reportDetail.itemList[0].title;
    }
  });
  const handleScrollIntoView = (id: string) => {
    const contentItem = document.getElementById(id);
    if (contentItem) {
      contentItem.scrollIntoView({ behavior: 'smooth', block: 'start' });
      activeCatalogId.value = id;
    }
  };
  // 做目录滚动监听
  const root = useTemplateRef<HTMLDivElement>('root');

  const onIntersectionObserver = (entry: IntersectionObserverEntry[]) => {
    if (entry[0].isIntersecting) {
      // 处理进入视口的逻辑
      activeCatalogId.value = entry[0].target.id;
    }
  };
</script>

<style scoped lang="scss">
  .report-detail {
    height: 100%;
    box-sizing: border-box;
    padding: 16px 0 0;
    display: flex;
    flex-direction: column;
  }

  .title {
    display: flex;
    justify-content: space-between;
    align-items: center;
    column-gap: 24px;
    color: #000;
    /* 重要/Medium 16 */
    font-family: 'PingFang SC Medium';
    font-size: 18px;
    font-style: normal;
    font-weight: 500;
    line-height: 24px; /* 150% */
    padding: 0 20px 0 28px;
    .title-text {
      // 两行省略
      display: -webkit-box;
      -webkit-box-orient: vertical;
      -webkit-line-clamp: 2;
      overflow: hidden;
      word-break: break-all;
    }
    .right {
      display: flex;
      align-items: center;

      .card-item-actions {
        display: flex;
        align-items: center;
        gap: 10px;

        .gap {
          margin-top: 1px;
          height: 12px;
          width: 1px;
          background-color: var(---N4, #dedede);
        }

        .btn-icon {
          cursor: pointer;
        }

        :deep(.el-button) {
          color: var(---N6);
          font-weight: 400;
          padding: 0;

          &:hover {
            color: var(--el-color-primary);
          }
        }
      }
    }
  }

  .gap {
    color: #d9d9d9;
  }

  .header {
    margin-top: 6px;
    padding: 0 20px 8px 28px;

    .left {
      display: flex;
      align-items: center;
      color: var(---N6, #999);
      /* 较弱/Regular 12 */
      font-family: 'PingFang SC';
      font-size: 12px;
      font-style: normal;
      font-weight: 400;
      line-height: 20px; /* 166.667% */
      gap: 8px;

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
    }
  }

  .content {
    position: relative;
    height: 0;
    flex: 1;
    overflow-y: auto;
    padding-top: 10px;
    .content-title {
      margin: 0;
      color: var(---N9, #1f1f1f);
      /* 常规/Medium 14 */
      font-family: 'PingFang SC Medium';
      font-size: 16px;
      font-style: normal;
      font-weight: 500;
      line-height: 24px; /* 157.143% */
    }
    .content-collapse {
      padding: 10px 28px 20px 0;
      --el-collapse-border-color: transparent;
      --el-collapse-header-height: 24px;
    }
    .el-collapse-item {
      padding: 10px 0 10px 8px;
      // border-bottom: 1px solid var(---N2, #f5f5f5);
      &:not(.el-collapse-item:last-of-type)::after {
        content: '';
        width: calc(100% - 28px);
        height: 1px;
        background-color: var(---N2, #f5f5f5);
        display: block;
        box-sizing: border-box;
        margin-left: 28px;
      }
      :deep(.el-collapse-item__header) {
        gap: 4px;
        padding-bottom: 10px;
        border-bottom-color: transparent;
        &:hover {
          .collapsed-icon {
            visibility: visible;
          }
        }
        .collapsed-icon {
          visibility: hidden;
        }
      }
      :deep(.el-collapse-item__content) {
        padding-left: 28px;
        padding-bottom: 10px;
      }
    }
    :deep(.w-e-text-container) {
      padding: 0;
      height: auto;

      [data-slate-editor] {
        padding: 0;
      }
    }
    .content-data {
      color: var(---N8, #666);
      /* 常规/Regular 14 */
      font-family: 'PingFang SC';
      font-size: 14px;
      font-style: normal;
      font-weight: 400;
      line-height: 22px; /* 157.143% */
      word-break: break-all;

      * {
        font-size: 14px;
      }

      :deep(p) {
        color: var(---N8);
        margin-top: 0;
        margin-bottom: 10px;
      }

      :deep(img) {
        max-width: 100%;
        height: auto !important;
      }
    }
  }
  .footer {
    flex: none;
    border-top: 1px solid var(---N3, #ededed);
    padding: 16px 20px;
    display: flex;
    justify-content: flex-end;
    gap: 8px;
    .el-button {
      margin: 0 !important;
    }
  }
  .catalog {
    position: absolute;
    top: 20px;
    right: 12px;
    padding: 6px 0 6px 10px;
    border-radius: 10px;
    z-index: 10;
    display: flex;
    flex-direction: column;
    align-items: end;
    row-gap: 8px;
    transition: width 0.3s;
    &:hover {
      box-shadow: 0 6px 36px 0 rgba(6, 8, 27, 0.08);
      padding: 14px 8px;
      background: #fff;
      align-items: start;
      .catalog-item {
        padding: 5px 12px;
        color: var(---N8, #666);

        /* 常规/Medium 14 */
        font-family: 'PingFang SC Medium';
        font-size: 14px;
        font-style: normal;
        font-weight: 500;
        line-height: 22px; /* 157.143% */
        cursor: pointer;
        &:hover {
          background: var(---N1, #f7f7f7);
        }
      }
      .catalog-item-placeholder {
        background-color: transparent !important;
      }
    }
    .catalog-item {
      width: 100%;
      font-size: 0;
      line-height: 1;
      &.is-active {
        font-weight: 500;
        color: var(---P6, #02b96b);
        .catalog-item-placeholder {
          background-color: var(---N9, #1f1f1f);
        }
      }
      &:first-of-type,
      &:last-of-type {
        .catalog-item-placeholder {
          width: 13px;
        }
      }
    }
    .catalog-item-title {
      max-width: 165px;
      // 一行省略
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }
    .catalog-item-placeholder {
      border-radius: 2px;
      height: 3px;
      width: 8px;
      margin-left: auto;
      background-color: var(---N3, #ededed);
    }
  }
  .collapsed-icon {
    transition: transform 0.3s;
    &.is-collapsed {
      transform: rotate(-90deg);
    }
  }
  .icon-full {
    cursor: pointer;
    width: 14px;
    height: 14px;
    color: var(---N6, #999);
  }
</style>
