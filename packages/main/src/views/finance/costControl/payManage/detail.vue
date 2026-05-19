<template>
  <el-drawer
    header-class="pay-manage-detail-drawer-header"
    body-class="pay-manage-detail-drawer-body"
    v-model="visible"
    direction="rtl"
    :size="drawerWidth"
    :show-close="false"
    :close-on-click-modal="true"
    :close-on-press-escape="false"
    @closed="handleDrawerClosed"
  >
    <template #header>
      <div class="detail-title">
        <div class="t1">付款单详情</div>
        <div class="table-item-header">
          <div class="item pl16">
            <span class="header-label">付款单号：{{ row.code }}</span>
            <Copy :content="row.code" style="color: #999999" />
          </div>
        </div>
        <div class="tool">
          <el-tooltip content="上一条" placement="top">
            <i @click="queryPrev" class="iconfont icon-jiantouxiangshang cursor-pointer"></i>
          </el-tooltip>
          <span class="linebd"></span>
          <el-tooltip content="下一条" placement="top">
            <i @click="queryNext" class="iconfont icon-jiantouxiangxia cursor-pointer"></i>
          </el-tooltip>
          <span class="linebd"></span>
          <el-tooltip v-if="!isFull" content="全屏查看" placement="top">
            <i @click="fullScreen" class="iconfont icon-quanping cursor-pointer"></i>
          </el-tooltip>
          <el-tooltip v-else content="退出全屏" placement="top">
            <i @click="fullScreen" class="iconfont icon-shouqiquanping cursor-pointer item"></i>
          </el-tooltip>
          <span class="linebd"></span>
          <el-tooltip content="刷新" placement="top">
            <i @click="refresh" class="iconfont icon-shuaxinjiazai cursor-pointer"></i>
          </el-tooltip>
          <span class="linebd"></span>
          <el-tooltip content="关闭" placement="top">
            <i @click="quit" class="iconfont icon-guanbi cursor-pointer"></i>
          </el-tooltip>
        </div>
      </div>
    </template>
    <div class="detail-body-wrap">
      <el-tabs v-model="activated" class="sticky" tab-position="top" @tab-click="tabClick">
        <el-tab-pane v-for="item in tabs" :key="item.id" :label="item.label" :name="item.id" />
      </el-tabs>
      <div class="tabwrap">
        <div class="base" id="pay-detail--base">
          <div class="block-title">基础信息</div>
          <el-row v-for="(fieldRow, rowIndex) in baseInfoFields" :key="rowIndex">
            <el-col
              v-for="(field, colIndex) in fieldRow"
              :key="colIndex"
              :span="field.span || 6"
              class="field-item"
            >
              <ItemLabel
                :fontSize="13"
                :label="field.label"
                :slotName="field.value"
                :value="detail.detailBean?.[field.value] || '-'"
              >
                <template v-if="field.value === 'statusDesc'" #statusDesc>
                  <el-tag
                    v-if="detail.detailBean?.status === payOrderStatusEnum.付款中"
                    type="warning"
                  >
                    付款中
                  </el-tag>
                  <el-tag
                    v-else-if="detail.detailBean?.status === payOrderStatusEnum.已付款"
                    type="success"
                  >
                    已付款
                  </el-tag>
                  <el-tag
                    v-else-if="detail.detailBean?.status === payOrderStatusEnum.已作废"
                    type="danger"
                  >
                    已作废
                  </el-tag>
                </template>
                <template
                  v-if="field.value === 'paymentSlipUrl' && detail.detailBean?.paymentSlipUrl"
                  #paymentSlipUrl
                >
                  <el-image
                    v-for="url in detail.detailBean.paymentSlipUrl.split(',').filter((x) => x)"
                    :key="url"
                    :src="url"
                    :preview-src-list="detail.detailBean.paymentSlipUrl.split(',').filter((x) => x)"
                    style="width: 80px; height: 80px; margin-right: 10px; border-radius: 10px"
                  />
                </template>
              </ItemLabel>
            </el-col>
          </el-row>
        </div>
        <div class="log" id="pay-detail--log">
          <div class="block-title">操作日志</div>
          <el-timeline v-if="detail.logBeanList?.length">
            <el-timeline-item v-for="item in detail.logBeanList" :key="item.id" placement="top">
              <template #dot>
                <el-avatar v-if="item.avatar" class="user-avatar" :src="item.avatar" />
                <el-avatar class="user-avatar" v-else>
                  {{ item.operatorName?.slice?.(0, 1) || 'U' }}
                </el-avatar>
              </template>
              <div class="timeline-title">
                <div class="user-name">
                  {{ item.operatorName }}
                </div>
                <div class="op-name">
                  {{ item.remark }}
                </div>
                <div class="op-time">
                  {{ item.createTime }}
                </div>
              </div>
              <div class="timeline-detail">
                <template v-if="item.attachmentInfoList?.length">
                  <el-image
                    v-for="url in getLogImgs(item)"
                    :key="url"
                    :src="url"
                    :preview-src-list="getLogImgs(item)"
                    style="width: 80px; height: 80px; margin-right: 10px; border-radius: 10px"
                  />
                </template>
                <pre v-if="false">{{ getContent(item.itemContent) }}</pre>
              </div>
            </el-timeline-item>
          </el-timeline>
          <div v-else>
            <el-empty size="small" :image-size="70" description="暂无日志" />
          </div>
        </div>
      </div>
    </div>
  </el-drawer>
</template>

<script setup lang="ts" name="PayManageDetail">
  import { financeSystemApi } from '@/api';
  import { ElMessage } from 'element-plus';
  import { payOrderStatusEnum } from '@/views/finance/costControl/payManage/enums';
  import ItemLabel from './components/ItemLabel.vue';

  const activated = ref('base');
  const visible = ref(false);
  const isFull = ref(false);
  const drawerWidth: any = ref(1200);

  const tabs = [
    { label: '基础信息', id: 'base' },
    { label: '操作日志', id: 'log' },
  ];

  const baseInfoFields = [
    [
      { label: '付款单号', value: 'code' },
      { label: 'OA审批编号', value: 'approvalCode' },
      { label: 'OA审批单状态', value: 'approvalStatusDesc' },
      { label: '付款状态', value: 'statusDesc' },
    ],
    [
      { label: '付款组织', value: 'paymentOrgName' },
      { label: '是否CBS付款', value: 'isCbsDesc' },
      { label: '完成审批日期', value: 'approvalDate' },
      { label: '完成付款日期', value: 'paymentDate' },
    ],
    [
      { label: '银行流水单号', value: 'paymentSlipCode' },

      { label: '付款币种', value: 'paymentCurrency' },
      { label: '付款金额', value: 'paymentAmount' },
    ],
    [
      { label: '收款账户名称', value: 'payeeAccountName' },
      { label: '申请人', value: 'proposer' },
      { label: '推送金蝶状态', value: 'isPushDesc' },
      { label: '单据更新日期', value: 'updateTime' },
    ],
    [
      { label: '收款单位类型', value: 'payeeType' },
      { label: '收款单位编码', value: 'payeeCode' },
      { label: '摘要', value: 'description' },
      { label: '单据类型', value: 'billType' },
    ],
    [
      { label: '结算方式', value: 'settlementMode' },
      { label: '付款账号', value: 'paymentAccount' },
      { label: '收款账号', value: 'payeeAccount' },
      { label: '收款账户联行号', value: 'payeeAccountNumber' },
    ],
    [
      { label: '收款账户开户行', value: 'payeeAccountBank' },
      { label: '备注', value: 'remark' },
      { label: '往来单位类型', value: 'businessUnitType' },
      { label: '往来单位编码', value: 'businessUnitCode' },
    ],
    [
      { label: '资金用途', value: 'fundUtilization' },
      { label: '费用项目', value: 'expenseItem' },
      { label: '结算组织', value: 'settlementOrg' },
      { label: '结算币种', value: 'settlementCurrency' },
    ],
    [
      { label: '费用承担部门', value: 'costBearingDept' },
      { label: 'SPU名称', value: 'spuName' },
      { label: '广告账户', value: 'advertisingAccount' },
      { label: '营销费用类型', value: 'marketExpenseType' },
    ],
    [
      { label: '推广产品', value: 'promotionProduct' },
      { label: '平台', value: 'platform' },
      { label: '国家', value: 'country' },
      { label: '费用GTM归属品线', value: 'gtm' },
    ],
    [
      { label: '三级类目', value: 'thirdLevel' },
      { label: '付款次数', value: 'paymentCount' },
      { label: '发起退款类型', value: 'refundType' },
      { label: '订单号', value: 'orderNumber' },
    ],
    [
      { label: '供应链SKU', value: 'supplyChainSku' },
      { label: '数量', value: 'quantity' },
      { label: '月结方式', value: 'monthlySettlement' },
      { label: '合同结束时间', value: 'contractEndTime' },
    ],
    [
      { label: '合同开始日期', value: 'contractStartDate' },
      { label: '合同金额', value: 'contractAmount' },
      { label: '是否摊销', value: 'amortizedDesc' },
      { label: '是否首款', value: 'firstPaymentDesc' },
    ],
    [{ label: '费用预算管理部门', value: 'budgetDept' }],
    [{ label: '付款水单截图', value: 'paymentSlipUrl', span: 24 }],
  ];

  const detail = ref({});
  const row = ref({});
  const list = ref([]);

  const open = (_row, _list) => {
    visible.value = true;
    row.value = _row;
    list.value = _list;
    currentIndex.value = list.value.findIndex((item) => item.code === _row.code);
    getDetail(_row);
  };

  const getDetail = async (_row) => {
    row.value = _row;
    detail.value = {
      detailBean: {},
      logBeanList: [],
    };
    const res = await financeSystemApi.financeExpensePaymentDetail({ code: _row.code });
    if (row.value?.code !== _row?.code) {
      return;
    }
    detail.value = res || {
      detailBean: {},
      logBeanList: [],
    };
  };

  const handleDrawerClosed = () => {};

  const tabClick = (tab) => {
    const { name } = tab.props;
    const id = `pay-detail--${name}`;
    const dom = document.getElementById(id);
    if (dom) {
      dom.scrollIntoView({
        behavior: 'smooth',
        block: 'start',
        inline: 'start',
      });
    }
  };
  // 上一条
  const currentIndex = ref();
  const queryPrev = () => {
    if (currentIndex.value > 0) {
      currentIndex.value--;
      getDetail(list.value[currentIndex.value]);
    } else {
      ElMessage.warning('已经是第一条了');
    }
  };
  const queryNext = () => {
    if (currentIndex.value < list.value.length - 1) {
      currentIndex.value++;
      getDetail(list.value[currentIndex.value]);
    } else {
      ElMessage.warning('已经是最后一条了');
    }
  };
  // 全屏操作
  const fullScreen = () => {
    if (isFull.value) {
      drawerWidth.value = 1200;
    } else {
      drawerWidth.value = '100%';
    }
    isFull.value = !isFull.value;
  };
  const refresh = () => {
    getDetail(row.value);
  };
  const quit = () => {
    visible.value = false;
  };

  const getContent = (content) => {
    // json 美化
    try {
      return JSON.stringify(JSON.parse(content), null, 2);
    } catch (error) {
      return content;
    }
  };

  const getLogImgs = (log) => {
    if (!log.itemContent) {
      return;
    }
    try {
      const itemContent = JSON.parse(log.itemContent);
      return itemContent?.fileUrl?.split?.(',').filter((x) => x) || [];
    } catch (error) {
      return [];
    }
  };

  defineExpose({
    open,
  });
</script>

<style lang="scss">
  .pay-manage-detail-drawer-header {
    padding: 0 !important;
    margin-bottom: 0 !important;
  }
  .pay-manage-detail-drawer-body {
    padding: 0;
  }
</style>

<style scoped lang="scss">
  .block-title {
    margin: 20px 0 20px 0;
  }
  .log {
    :deep(.el-timeline) {
      padding-left: 1rem;
    }
    .timeline-title {
      position: relative;
      top: -5px;
      display: flex;

      .user-name {
        color: #444;
      }

      .op-name {
        margin-left: 16px;
        color: #000;
      }

      .op-time {
        margin-left: 16px;
        color: #777;
      }
    }
    .timeline-detail {
      margin-top: 10px;
      padding: 10px;
      border-radius: 6px;
    }
  }
  .detail-title {
    height: 56px;
    background-color: #fff;
    line-height: 56px;
    padding: 0 20px;
    display: flex;
    color: #1f1f1f;

    .t1 {
      color: #1f1f1f;
      font-size: 16px;
      font-family: 'PingFang SC Medium';
    }
    .table-item-header {
      flex: 1;
      display: flex;
      align-items: center;
      // line-height: 20px;
      font-size: 12px;
      margin-left: 10px;
      .header-label {
        color: #999999;
      }
      .item {
        display: flex;
        align-items: center;

        .el-tag {
          margin-left: 11px;
        }
      }
    }
    .tool {
      line-height: 54px;
      color: #999999;
      .nouse {
        cursor: not-allowed;
      }
      i {
        font-size: 16px;
        &:hover {
          color: #02b96b !important;
        }
      }
      .linebd {
        display: inline-block;
        width: 1px;
        height: 10px;
        background: #dedede;
        margin: 0 10px;
      }
    }
  }
  .tabwrap {
    padding: 10px 20px;
    overflow: auto;
  }

  :deep(.el-tabs) {
    padding: 0 20px !important;
    .el-tabs__active-bar {
      color: #02b96b;
      height: 2px;
    }
    .el-tabs__header {
      background-color: white;
      padding-left: 0 !important;
    }
    .el-tabs__item {
      padding: 9px 15px;
      line-height: 40px;
      height: 42px;
      font-size: 13px;
      color: #666666;
      &:hover {
        color: #02b96b;
      }
      &.is-active {
        font-family: 'PingFang SC Medium';
        color: #02b96b;
      }
    }
    .el-tabs__nav-wrap {
      &::after {
        background-color: #f5f5f5 !important;
        height: 1px !important;
      }
    }
  }
  .field-item {
    margin-bottom: 10px;
  }
  .detail-body-wrap {
    height: 100%;
    display: flex;
    flex-direction: column;
  }
  .user-avatar {
    background-color: var(--el-color-primary);
    width: 30px;
    height: 30px;
    position: relative;
    left: -9px;
  }
</style>

<style lang="scss"></style>
