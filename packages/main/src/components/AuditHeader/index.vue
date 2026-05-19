<template>
  <div class="audit-wrap">
    <div :title="flowName" class="audit-card">
      <div class="title">审核规则名称：{{ flowName }}</div>
      <el-steps align-center>
        <el-step title="订单已创建" description="Some description" finish-status="success">
          <template #icon>
            <!-- <el-icon size="28" color="#02B96B"><CircleCheck /></el-icon> -->
            <i class="iconfont icon-xianxingtubiaochenggong"></i>
          </template>
          <template #description>
            <div class="step-desc mt4">{{ baseInfo?.creator }}</div>
            <div class="step-desc-bottom flex-center mt2">{{ baseInfo?.createTime }}</div>
          </template>
        </el-step>
        <!-- 以前的 :icon="processStatus[item.status]"  -->
        <el-step
          :class="processClass[item.status]"
          :description="
            item.status === 0
              ? item.passAuthOperatorNames?.join('、')
              : item.waitAuthOperatorNames?.join('、')
          "
          :title="item.status === 1 || item.status === 4 ? item.name + ' (不通过)' : item.name"
          v-for="item of authNodeList"
          :key="item.code"
        >
          <template #icon v-if="item.status === 0">
            <!-- <el-icon size="28" color="#02B96B"><CircleCheck /></el-icon> -->
            <i class="iconfont icon-xianxingtubiaochenggong"></i>
          </template>
          <template #icon v-else-if="item.status === 1 || item.status === 4">
            <!--  <el-icon size="28" color="#ff2626"><CircleClose /></el-icon> -->
            <i class="iconfont icon-xianxingtubiaocuowu"></i>
          </template>
          <template #description>
            <div class="step-desc mt4">
              {{
                item.status === 0
                  ? item.passAuthOperatorNames?.join('、')
                  : item.waitAuthOperatorNames?.join('、')
              }}
            </div>
            <div class="step-desc-bottom flex-center mt2 wait" v-if="item.status === 2">
              <i class="iconfont icon-shijian shijian"></i>
              <span class="bg">{{ item.type === 1 ? '或签审核中' : '会签审核中' }}</span>
              <el-tooltip
                :content="
                  item.type === 1
                    ? '需要多个审批人同时处理，只需一人审批同意即可'
                    : '需要多个审批人同时处理，并且需所有人审批同意'
                "
                raw-content
                placement="top"
              >
                <i class="iconfont icon-xunwenzhuangtai question"></i>
              </el-tooltip>
            </div>
            <!-- 通过时间 ,没有就显示 statusDesc  -->
            <div
              v-else-if="
                (item.status === 0 || item.status === 1 || item.status === 4) && item.handleTime
              "
              class="step-desc-bottom flex-center mt2"
            >
              <span class="bg">{{ item.handleTime }}</span>
            </div>
            <div v-else class="step-desc-bottom flex-center mt2 wait">
              <i class="iconfont icon-shijian"></i>
              <span class="bg">{{ item.statusDesc ?? '等待审核' }}</span>
            </div>
          </template>
        </el-step>
      </el-steps>
      <!-- <div class="empty" v-else>
        <div class="flex-align flex-center">
          <EmptyAnimation name="noproduct" :width="110" :height="110" :loop="true" />
        </div>
        <div class="text">缺货重审</div>
        <div class="subtext">邓??</div>
      </div> -->
    </div>
  </div>
</template>

<script setup lang="ts">
  // import { CircleClose, InfoFilled, QuestionFilled, SuccessFilled } from '@element-plus/icons-vue';

  const props = defineProps<{
    flowName: string;
    authNodeList: any[];
    baseInfo: any;
  }>();
  // const bsInfoInitial = props.baseInfo;
  // baseInfo "orderStatus": 503,"orderStatusDesc": "第三方系统内缺货

  // status
  // 状态的值   UNKNOW(-1, "未知", null),
  // PASS(0, "通过", true),
  // NO_PASS(1, "不通过", false),
  // AUTHING(2, "审核中", null),
  // WATING(3, "待开始", null),
  // AUTHING_ERROR(4, "审核中(不通过)", null),
  // 审核中 active
  const processClass = {
    0: 'green',
    1: 'red',
    2: 'isActive',
    3: 'gray',
    4: 'yellow',
  };
</script>

<style scoped lang="scss">
  .flex-align {
    display: flex;
    align-items: center;
  }
  .empty {
    text-align: center;
    // padding-top: 60px;
    // padding-bottom: 126px;
    position: relative;
    top: -50px;
    .text {
      font-size: 14px;
      color: #1f1f1f;
      line-height: 22px;
      font-family: 'PingFang SC Medium';
      font-weight: normal;
      position: relative;
      top: -6px;
    }
    .subtext {
      color: #999999;
      font-size: 12px;
      line-height: 20px;
      margin-top: 4px;
    }
  }
  :deep(.el-step) {
    .el-step__head,
    .el-step__title,
    .el-step__description {
      color: #666666;
    }
    .el-step__head {
      height: 28px;
      line-height: 28px;
      .el-step__line {
        height: 1px !important;
        left: 54%;
        right: -46%;
      }
    }
    .el-step.is-horizontal {
      .el-step__line {
        top: 13px;
      }
    }
    .el-icon {
      svg {
        height: 28px !important;
        line-height: 28px;
        font-size: 28px !important;
      }
    }
    .el-step__title {
      color: #1f1f1f;
      font-size: 14px;
      line-height: 22px;
      margin-top: 12px;
      font-family: 'PingFang SC Medium';
      font-weight: normal;
    }
    .el-step__icon.is-text {
      border-width: 1px !important;
      border-color: #ededed !important;
      width: 28px !important;
      height: 28px !important;
      font-size: 14px;
      font-family: 'PingFang SC Medium';
      font-weight: normal;
      color: #666666;
    }
    .step-desc {
      color: #666666;
      font-size: 13px;
      line-height: 22px;
      // max-width: 300px;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }
    .step-desc-bottom {
      line-height: 20px;
      font-size: 12px;
      color: #999999;
      display: flex;
    }
    .wait {
      color: #ff9f22;
      line-height: 20px;
      font-size: 12px;
      .icon-shijian {
        margin-right: 4px;
        font-size: 14px;
      }
      .question {
        color: #c5c5c5;
        margin-left: 4px;
        font-size: 14px;
        // cursor: pointer;
      }
    }
    .el-step__icon.is-icon {
      background-color: transparent;
      i {
        height: 28px !important;
        // width: 28px !important;
        line-height: 28px;
        font-size: 31px !important;
        position: relative;
        top: 3px;
      }
      .icon-xianxingtubiaochenggong {
        color: #02b96b;
      }
      .icon-xianxingtubiaocuowu {
        color: #f53f3f;
      }
    }

    .el-step__line {
      height: 1px !important;
      background: #ededed;
    }
    .el-step__description,
    .mt2 {
      margin-top: 2px;
    }
    // 审核中 active 节点样式
    &.isActive .el-step__head {
      color: #ffc700;
      .el-step__icon.is-text {
        background-color: #02b96b;
        border-color: #02b96b !important;
        .el-step__icon-inner {
          color: white;
          font-size: 14px;
          font-family: 'PingFang SC Medium';
          font-weight: normal;
        }
      }
    }

    &.green .el-step__head {
      color: #02b96b;
    }

    &.red .el-step__head {
      color: #f1416c;
    }
  }

  .mt4 {
    margin-top: 4px;
  }
  .audit-wrap {
    padding: 0 20px;
    background-color: white;
    overflow: hidden;
  }
  .audit-card {
    background-color: #f7f7f7;
    border-radius: 16px;
    padding-top: 20px !important;
    padding-bottom: 20px !important;
    .title {
      color: #1f1f1f;
      font-family: 'PingFang SC Medium';
      font-weight: normal;
      font-size: 16px;
      font-weight: 500;
      line-height: 24px;
      padding-left: 26px;
      padding-bottom: 36px;
    }
  }
</style>
