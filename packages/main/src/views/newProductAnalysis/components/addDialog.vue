<template>
  <el-dialog width="1050px" v-model="visible" @close="handleDialogClose">
    <template #header>
      <div class="dialog-header">
        <div class="header-title">工作流选择面板</div>
        <div class="header-tour" v-if="tourVisible">
          点击对应卡片，进入对应分析工作流
          <el-icon><Close /></el-icon>
        </div>
      </div>
    </template>
    <div class="workflow-list">
      <div
        v-for="item in workflowList"
        :key="item?.workflowCode"
        class="item-card"
        @click="toWorkflowConfig(item?.workflowCode, item?.name)"
      >
        <div class="card-icon">
          <img v-if="item?.icon" :src="item?.icon" alt="" />
          <img v-else src="@/assets/images/system/empty.png" alt="" />
        </div>
        <div class="card-content">
          <div class="header">
            <h3 class="title"><OverflowTooltip :content="item?.name" :line="1" /></h3>
            <div class="version-tag">{{ item?.version }}</div>
          </div>
          <p class="description">
            <OverflowTooltip :content="item?.description" :line="2" color="#666666" />
          </p>
          <div class="stats">
            <div class="stat-item">
              <i class="iconfont icon-shijian"></i>
              <span>平均耗时 {{ formatTime(item?.avgRunTime) }}</span>
            </div>
            <div class="stat-item">
              <i class="iconfont icon-huomiao"></i>
              <span>总运行 {{ item?.runNum }} 次</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </el-dialog>
  <ConfigDialog ref="configDialogRef" @success="handleSuccess" @back="visible = true" />
</template>

<script setup lang="ts">
  import { newProductApi, memberApi } from '@/api';
  import ConfigDialog from '@/views/newProductAnalysis/components/configDialog.vue';
  import { formatTime } from '@/utils/time';
  import { useReport } from '../hooks/useReport';

  const { report } = useReport();

  const emit = defineEmits<{
    (event: 'success'): void;
  }>();

  const visible = ref(false);
  // 标记是否应该跳过关闭埋点上报（用于选择工作流、路由切换等场景）
  const shouldSkipCloseReport = ref(false);

  const workflowList = ref([]);
  const queryWorkflowList = async () => {
    const res = await newProductApi.luteosAiNpoWorkflowList({
      pageNum: 1,
      pageSize: 100,
    });
    workflowList.value = res?.workflowList;
  };

  const configDialogRef = ref();
  const toWorkflowConfig = async (workflowCode: string, name: string) => {
    shouldSkipCloseReport.value = true; // 用户选择了工作流，不上报关闭埋点
    visible.value = false;
    configDialogRef.value?.open(workflowCode, name);

    const getWorkflowId = () => {
      if (name.startsWith('新品机会洞察')) {
        return 'XPJH';
      } else if (name.startsWith('数据爬取')) {
        return 'SJPQ';
      } else {
        return workflowCode.substring(0, 4);
      }
    };
    report('click_select_workflow', { workflow_id: getWorkflowId(), workflow_name: name });
    handleClose();
  };

  const handleSuccess = () => {
    emit('success');
    shouldSkipCloseReport.value = true; // 成功后关闭，不上报关闭埋点
    visible.value = false;
  };

  const handleDialogClose = () => {
    visible.value = false;
    handleClose();
  };

  const open = () => {
    queryWorkflowList();
    shouldSkipCloseReport.value = false; // 打开弹窗时重置标记
    visible.value = true;
    Guideline();
  };

  // 监听 visible 变化，在弹窗关闭时处理埋点上报
  watch(visible, (newVal, oldVal) => {
    // 从 true 变为 false 表示弹窗关闭
    if (oldVal === true && newVal === false) {
      // 只有在用户主动点击关闭按钮时才上报埋点（不包括选择工作流、路由切换等场景）
      if (!shouldSkipCloseReport.value) {
        report('click_close_workflow_popup');
      }
      // 重置标记
      shouldSkipCloseReport.value = false;
    }
  });

  // 监听组件失活(路由切换时),在弹窗打开状态下标记跳过埋点
  onDeactivated(() => {
    if (visible.value) {
      shouldSkipCloseReport.value = true;
    }
  });

  // 监听组件销毁(组件真正卸载时),在弹窗打开状态下标记跳过埋点
  onBeforeUnmount(() => {
    if (visible.value) {
      shouldSkipCloseReport.value = true;
    }
  });
  // 确保新手指引只出现一次
  const tourVisible = ref(false);
  const Guideline = async () => {
    // 1-新品机会列表新手指引  2-新品机会参数配置 新手指引 3-新品机会运行与结果详情新手指引
    const result = await memberApi.luteosMemberQueryLastVersionSync({
      platform: 'lute_erp',
      refreshType: 2,
    });
    tourVisible.value = !result.isSync;
  };

  const handleClose = async () => {
    tourVisible.value = false;
    // 标记是否更新
    await memberApi.luteosMemberSyncLastVersion({
      platform: 'lute_erp',
      refreshType: 2,
    });
  };

  defineExpose({
    open,
  });
</script>

<style scoped lang="scss">
  .dialog-header {
    display: flex;
    align-items: center;
    height: 28px;
    .header-title {
      font-size: 16px;
      color: #1f1f1f;
      font-weight: 500;
    }
    .header-tour {
      display: flex;
      align-items: center;
      font-size: 14px;
      padding: 10px 12px;
      background-color: rgba(0, 0, 0, 0.75);
      color: #fff;
      border-radius: 10px;
      margin-left: 10px;
      .el-icon {
        width: 20px;
        height: 20px;
        font-size: 18px;
        margin-left: 5px;
        &:hover {
          cursor: pointer;
        }
      }
    }
  }
  .workflow-list {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
    gap: 14px;

    .item-card {
      width: 100%;
      height: 140px;
      background-color: #f5f5f5;
      border: 1px solid #f5f5f5;
      border-radius: 10px;
      overflow: hidden;
      position: relative;
      display: flex;
      cursor: pointer;

      &:hover {
        background-color: #ffffff;
        border: 1px solid #02b96b;
        //box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
      }

      .card-icon {
        width: 40px;
        height: 40px;
        position: absolute;
        left: 18px;
        top: 23px;
        overflow: hidden;

        img {
          width: 28px;
          height: 28px;
          position: absolute;
          left: 50%;
          top: 50%;
          transform: translate(-50%, -50%);
        }
      }

      .card-content {
        flex: 1;
        padding: 18px 0 0 69px;
        position: relative;

        .header {
          display: flex;
          align-items: center;
          gap: 10px;
          margin-bottom: 6px;

          .title {
            font-family: 'PingFang SC Medium';
            max-width: 174px;
            font-size: 16px;
            font-weight: 500;
            line-height: 24px;
            color: #1f1f1f;
            margin: 0;
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;
            flex-shrink: 0;
          }

          .version-tag {
            background-color: #f0fff6;
            color: #02b96b;
            font-family: 'PingFang SC', sans-serif;
            font-size: 12px;
            font-weight: 400;
            line-height: 20px;
            padding: 0 4px;
            border-radius: 4px;
            height: 20px;
            display: flex;
            align-items: center;
            justify-content: center;
            flex-shrink: 0;
          }
        }

        .description {
          font-family: 'PingFang SC', sans-serif;
          font-size: 12px;
          font-weight: 400;
          line-height: 20px;
          color: #666666;
          text-align: justify;
          width: 239px;
          margin: 0 0 20px 0;
        }

        .stats {
          position: absolute;
          bottom: 18px;
          left: 69px;
          display: flex;
          align-items: center;
          gap: 16px;

          .stat-item {
            display: inline-grid;
            grid-template-columns: max-content;
            grid-template-rows: max-content;
            place-items: start;
            position: relative;

            span {
              font-family: 'PingFang SC', sans-serif;
              font-size: 12px;
              font-weight: 400;
              line-height: 20px;
              color: #999999;
              white-space: nowrap;
              margin-left: 19px;
              grid-area: 1 / 1;
            }

            .icon-shijian,
            .icon-huomiao {
              font-size: 14px;
              color: #999999;
              margin-top: 3px;
              grid-area: 1 / 1;
              background-size: contain;
              background-repeat: no-repeat;
              background-position: center;
            }
          }
        }
      }

      .card-footer {
        position: absolute;
        right: 18px;
        top: 18px;
        display: none;

        .run-button {
          font-size: 12px;
          height: 28px;
          padding: 0 12px;
        }
      }

      &:hover .card-footer {
        display: block;
      }
    }
  }
</style>
