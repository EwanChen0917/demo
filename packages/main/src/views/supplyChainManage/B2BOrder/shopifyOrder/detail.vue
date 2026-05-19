<template>
  <el-drawer
    class="detail-drawer"
    v-model="showDetail"
    direction="rtl"
    :size="drawerWid"
    :show-close="false"
    :close-on-click-modal="true"
    :close-on-press-escape="false"
    @opened="handleDrawerOpened"
    @closed="handleDrawerClosed"
    @close="handleDrawerBeforeClosed"
  >
    <template #header>
      <div class="detail-title">
        <div class="t1">订单详情</div>
        <div class="table-item-header">
          <div class="item ml20">
            <span class="header-label">平台单号：</span>
            {{ form.baseInfo.refNo || '-' }}
            <Copy :content="form.baseInfo.refNo" style="color: #999999" />
          </div>
          <div class="item pl16">
            <span class="header-label">订单号：</span>
            {{ form.baseInfo.erpCode || '-' }}
            <Copy :content="form.baseInfo.erpCode" style="color: #999999" />
          </div>
          <Tag
            v-if="form.baseInfo?.orderStatusDesc"
            :color="tagColor(form.baseInfo.orderStatus)"
            class="ml20"
          >
            {{ form.baseInfo?.orderStatusDesc }}
          </Tag>
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
    <div>
      <!-- <div class="step-list" v-if="form.baseInfo.statusInfoList?.length">
        <el-steps :space="200" :active="1" finish-status="finish" align-center>
          <el-step
            v-for="item in form.baseInfo.statusInfoList"
            :key="item.sort"
            :status="item.nodeStatus"
            :icon="item.nodeStatus == 'finish' ? 'Check' : ''"
            :title="item.statusDesc"
            :description="item.handleTime"
          />
        </el-steps>
      </div> -->
      <el-form :model="form" ref="formRef" label-width="150px">
        <el-tabs v-model="activated" class="sticky" tab-position="top" @tab-click="tabClick">
          <el-tab-pane v-for="item in tabs" :key="item.id" :label="item.label" :name="item.id" />
        </el-tabs>
        <div class="tabwrap">
          <div
            v-for="(list, title) in allInfoMap"
            :key="title"
            class="wrap1"
            :class="{ nobd: title == '产品信息' }"
            :id="titleIdMap[title]"
          >
            <template v-if="title !== '产品信息'">
              <div class="detail-title3" id="b1ase">{{ title }}</div>
              <el-row>
                <el-col
                  :span="item.label == '买家留言' || title == '物流信息' ? 12 : 6"
                  class="flexbox"
                  v-for="item in list"
                  :key="item.prop"
                >
                  <ItemLabel
                    v-if="typeof item.prop == 'string'"
                    :fontSize="13"
                    :label="item.label"
                    :value="unitValue(form[item.prevParent]?.[item.prop], item.showUnit)"
                    :tips="item.tips"
                  />
                  <ItemLabel
                    v-else
                    :fontSize="13"
                    :label="item.label"
                    :value="
                      groupValue(
                        form[item.prevParent]?.[item.prop[0]],
                        form[item.prevParent]?.[item.prop[1]],
                        item.connector
                      )
                    "
                  />
                </el-col>
              </el-row>
            </template>
            <template v-else>
              <div class="detail-title3" id="b1ase">
                {{ title }}
                <span
                  v-if="form.itemInfoList.length"
                  style="color: var(--el-color-primary); margin-left: 5px"
                >
                  {{ form.itemInfoList.length }}
                </span>
              </div>
              <div class="tablewrap" v-if="form.itemInfoList.length">
                <div v-for="(item, index) in form.itemInfoList" :key="item.id" class="product-item">
                  <div class="item-base">
                    <div class="product-img">
                      <KeenImagePreview
                        v-if="item?.productImageUrl"
                        :src="item?.productImageUrl"
                        :srcList="[item?.productImageUrl]"
                        :size="56"
                      />
                      <img v-else src="@/assets/images/system/empty.png" alt="" />
                      <img
                        v-if="item?.gift === 1"
                        class="giftStock"
                        :src="getImg('giftStock')"
                        alt=""
                      />
                    </div>
                    <div class="item-area">
                      <OverflowTooltip :content="item?.productName" :line="2" />
                      <div class="item-area">
                        <ItemLabel :fontSize="13" label="产品SKU" :value="item.skuCode ?? ''" />
                        <ItemLabel :fontSize="13" label="MSKU" :value="item.sellerSku ?? ''" />
                        <ItemLabel :fontSize="13" label="三方仓SKU" :value="item.supplySku ?? ''" />
                        <div class="item-remark" v-if="index == form.itemInfoList.length - 1">
                          <span class="item-label">备注：</span>
                          <OverflowTooltip
                            :content="form.orderRemarkList?.[0]?.remark ?? '-'"
                            :line="2"
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                  <div class="item-area item-detail">
                    <ItemLabel :fontSize="13" label="itemID" :value="item.itemId ?? ''" />
                    <ItemLabel :fontSize="13" label="预估重量" :value="item.weight ?? ''" />
                    <ItemLabel :fontSize="13" label="预估体积" :value="item.volume ?? ''" />
                    <ItemLabel
                      :fontSize="13"
                      label="客选物流"
                      :value="item.buyerChooseLogistics ?? ''"
                    />
                  </div>
                  <div class="item-area item-detail">
                    <ItemLabel :fontSize="13" label="数量" :value="item.num ?? ''" />
                  </div>
                  <div class="item-area item-detail">
                    <ItemLabel
                      :fontSize="13"
                      label="商品单价（不含税）"
                      :value="unitValue(item.price, true)"
                    />
                    <ItemLabel
                      :fontSize="13"
                      label="商品售价（不含税）"
                      :value="unitValue(item.totalPrice, true)"
                    />
                    <ItemLabel
                      :fontSize="13"
                      label="商品折扣"
                      :value="unitValue(item.discountAmount, true)"
                    />
                    <ItemLabel :fontSize="13" label="商品积分" :value="item.integral ?? ''" />
                    <ItemLabel
                      :fontSize="13"
                      label="商品税金"
                      :value="unitValue(item.taxes, true)"
                    />
                    <ItemLabel
                      :fontSize="13"
                      label="商品买家支付运费"
                      :value="unitValue(item.salesFreightAmount, true)"
                    />
                    <ItemLabel
                      :fontSize="13"
                      label="商品其他费用"
                      :value="unitValue(item.otherAmount, true)"
                    />
                  </div>
                </div>
                <!-- 标签 -->
                <div class="product-tag">
                  <div class="tag">
                    <div class="tag-content">
                      标签（{{ form.baseInfo.orderLabelList?.length ?? 0 }}）：
                      <ShopifyLabelList :labelList="form.baseInfo.orderLabelList" />
                    </div>
                  </div>
                  <div class="remark">
                    客服备注：
                    <span class="tag-info">{{ form.baseInfo.customRemark ?? '-' }}</span>
                  </div>
                </div>
              </div>
              <div v-else class="empty">
                <div class="flex-align flex-center">
                  <EmptyAnimation name="emptyInfo" :width="128" :height="128" :loop="true" />
                </div>
                <div class="text">暂无数据</div>
              </div>
            </template>
          </div>
          <div class="wrap1" id="log">
            <div class="detail-title3">
              <div class="text">操作日志</div>
              <div class="d-flex operate">
                <el-select
                  v-model="searchType"
                  style="width: 110px; margin-right: 10px"
                  placeholder="选择类型"
                  @change="handleSelectLogChange"
                  clearable
                  size="small"
                >
                  <el-option
                    v-for="item in searchTypeMap"
                    :value="item.key"
                    :label="item.label"
                    :key="item.key"
                  />
                </el-select>
                <el-date-picker
                  size="small"
                  v-model="time"
                  type="daterange"
                  style="width: 238px"
                  range-separator="-"
                  start-placeholder="开始日期"
                  end-placeholder="结束日期"
                  value-format="YYYY-MM-DD HH:mm:ss"
                  @change="handleTimeChange"
                  :shortcuts="shortcuts"
                  clearable
                  :popper-options="{
                    modifiers: [
                      {
                        name: 'flip',
                        options: {
                          fallbackPlacements: ['top', 'bottom'],
                          allowedAutoPlacements: ['top', 'bottom'],
                        },
                      },
                    ],
                  }"
                />
              </div>
            </div>
            <LogItem
              :log-type-arr="logTypeArr"
              @download-file="handleDownload"
              @handle-delete="handleDelete"
              :fileProgress="fileProgress"
            />
          </div>
        </div>
      </el-form>
    </div>
  </el-drawer>
</template>

<script setup lang="ts">
  import { ElMessage, ElLoading } from 'element-plus';
  import { omsApi, erpApi } from '@/api';
  import Tag from '@/components/Tag/index.vue';
  import * as swal from '@/utils/swal';
  import axios from 'axios';
  import dayjs from 'dayjs';
  import LogItem from '@/views/supplyChainManage/B2BOrder/orderManage/components/LogItem.vue';
  import ShopifyLabelList from '@/views/supplyChainManage/B2BOrder/shopifyOrder/components/shopifyLabelList.vue';
  import ItemLabel from '@/views/supplyChainManage/B2BOrder/orderManage/components/ItemLabel.vue';

  const detailLoading = ref();

  const statusColorMap = {
    100: 'blue',
    101: 'gray',
    102: 'blue',
    200: 'orange',
    201: 'purple',
    202: 'yellow',
    300: 'blue',
    400: 'green',
    500: 'red',
    501: 'red',
    502: 'red',
    503: 'red',
    504: 'red',
    505: 'red',
    506: 'red',
    507: 'red',
    508: 'red',
    600: 'gray',
  };
  const tagColor = (status: any) => {
    if (statusColorMap[status]) {
      return statusColorMap[status];
    }
    if (status > 500 && status < 600) {
      return 'red';
    }
    return '';
  };

  const groupValue = computed(() => (value1, value2, connector) => {
    if (value1 && value2 && connector != '()') return `${value1}${connector}${value2}`;
    if (value1 && value2 && connector == '()') return `${value1}（${value2}）`;
    if (value1 && !value2) return value1;
    if (!value1 && value2) return value2;
    return '';
  });

  const unitValue = computed(() => (value, showUnit) => {
    if (value == 0) return `${value}`;
    if (value && showUnit) return `${value}${form.value.baseInfo.currencyCode}`;
    if (value && !showUnit) return value;
    return '';
  });

  const activated = ref('base');
  const showDetail = ref(false);
  const isFull = ref(false);
  const drawerWid: any = ref(1200);
  const erpCode = ref('');
  const searchType = ref();

  // 1:客服备注 ,2:上传附件,3:订单备注
  const searchTypeMap = [
    {
      key: 2,
      label: '上传附件',
    },
    {
      key: 3,
      label: '订单备注',
    },
    {
      key: 1,
      label: '客服备注',
    },
    {
      key: 4,
      label: '操作记录',
    },
  ];
  const shortcuts = [
    {
      text: '今天',
      value: () => {
        const end = new Date();
        const start = new Date();
        start.setHours(0, 0, 0, 0);
        end.setHours(23, 59, 59, 999);
        return [start, end];
      },
    },
    {
      text: '昨天',
      value: () => {
        const end = new Date();
        const start = new Date();
        start.setDate(start.getDate() - 1);
        end.setDate(end.getDate() - 1);
        // 设置时间范围
        start.setHours(0, 0, 0, 0);
        end.setHours(23, 59, 59, 999);
        return [start, end];
      },
    },
    {
      text: '最近7天',
      value: () => {
        const end = new Date();
        const start = new Date();
        start.setTime(start.getTime() - 3600 * 1000 * 24 * 7);
        return [start, end];
      },
    },
    {
      text: '最近30天',
      value: () => {
        const end = new Date();
        const start = new Date();
        start.setTime(start.getTime() - 3600 * 1000 * 24 * 30);
        return [start, end];
      },
    },
    {
      text: '最近60天',
      value: () => {
        const end = new Date();
        const start = new Date();
        start.setTime(start.getTime() - 3600 * 1000 * 24 * 60);
        return [start, end];
      },
    },
    {
      text: '最近90天',
      value: () => {
        const end = new Date();
        const start = new Date();
        start.setTime(start.getTime() - 3600 * 1000 * 24 * 90);
        return [start, end];
      },
    },
    {
      text: '本月',
      value: () => {
        const end = new Date();
        const start = new Date();
        start.setDate(1); // 本月第一天
        start.setHours(0, 0, 0, 0);
        end.setMonth(end.getMonth() + 1); // 下个月
        end.setDate(0); // 当月最后一天
        end.setHours(23, 59, 59, 999);
        return [start, end];
      },
    },
    {
      text: '上月',
      value: () => {
        return [
          dayjs().subtract(1, 'month').startOf('month').format('YYYY-MM-DD HH:mm:ss'),
          dayjs().subtract(1, 'month').endOf('month').format('YYYY-MM-DD HH:mm:ss'),
        ];
      },
    },
    {
      text: '最近半年',
      value: () => {
        const end = new Date();
        end.setHours(23, 59, 59, 999);
        const start = new Date();
        start.setMonth(start.getMonth() - 6); // 半年前
        start.setHours(0, 0, 0, 0);
        return [start, end];
      },
    },
    {
      text: '今年',
      value: () => {
        const start = new Date(new Date().getFullYear(), 0, 1); // 元旦
        start.setHours(0, 0, 0, 0);
        const end = new Date(new Date().getFullYear(), 11, 31); // 年末
        end.setHours(23, 59, 59, 999);
        return [start, end];
      },
    },
  ];

  const logTypeArr = ref<any>([]);
  const tabs = [
    { label: '基础信息', id: 'base' },
    { label: '买家信息', id: 'sender' },
    { label: '收件人信息', id: 'reciever' },
    { label: '产品信息', id: 'product' },
    { label: '物流信息', id: 'deliver' },
    { label: '金额信息', id: 'money' },
    { label: '操作日志', id: 'log' },
  ];

  const titleIdMap = {
    基础信息: 'base',
    买家信息: 'sender',
    收件人信息: 'reciever',
    产品信息: 'product',
    物流信息: 'deliver',
    金额信息: 'money',
  };

  interface infoMapType {
    label: string;
    prop: string;
    prevParent: string;
    type?: string;
    connector?: string;
    showUnit?: boolean;
  }

  // 信息map
  const allInfoMap = {
    基础信息: [
      { label: '平台', prop: 'channel', prevParent: 'baseInfo' },
      { label: '店铺/站点', prop: ['shopAccount', 'site'], prevParent: 'baseInfo', connector: ':' },
      { label: '订购时间', prop: 'orderingTime', prevParent: 'baseInfo' },
      { label: '付款时间', prop: 'payTime', prevParent: 'baseInfo' },
    ] as infoMapType[],
    买家信息: [
      { label: '姓名', prop: 'userChannel', prevParent: 'receiveInfo' },
      { label: '邮箱', prop: 'userChannelEmail', prevParent: 'receiveInfo' },
      { label: '买家留言', prop: 'buyerRemark', prevParent: 'receiveInfo' },
    ] as infoMapType[],
    收件人信息: [
      { label: '姓名', prop: 'name', prevParent: 'receiveInfo' },
      { label: '邮箱', prop: 'email', prevParent: 'receiveInfo' },
      { label: '电话', prop: 'phone', prevParent: 'receiveInfo' },
      { label: '手机号', prop: 'mobilePhone', prevParent: 'receiveInfo' },
      { label: '税号', prop: 'taxId', prevParent: 'receiveInfo' },
      {
        label: '国家/地区',
        prop: ['countryDesc', 'countryCode'],
        prevParent: 'receiveInfo',
        connector: '()',
      },
      { label: '省/州', prop: 'province', prevParent: 'receiveInfo' },
      { label: '邮编', prop: 'zipcode', prevParent: 'receiveInfo' },
      { label: '城市', prop: 'city', prevParent: 'receiveInfo' },
      { label: '区/县', prop: 'area', prevParent: 'receiveInfo' },
      { label: '街道', prop: 'street', prevParent: 'receiveInfo' },
      { label: '门牌号', prop: 'houseNumber', prevParent: 'receiveInfo' },
      { label: '详细地址1', prop: 'address', prevParent: 'receiveInfo' },
      { label: '详细地址2', prop: 'address2', prevParent: 'receiveInfo' },
      {
        label: '短地址',
        prop: 'shortAddress',
        prevParent: 'receiveInfo',
        type: 'tips',
        tips: '当收件人国家为沙特阿拉伯时，短地址必填',
      },
    ] as infoMapType[],
    产品信息: [],
    物流信息: [
      { label: '发货仓库', prop: 'warehouseDesc', prevParent: 'baseInfo' },
      { label: '物流承运商', prop: 'spName', prevParent: 'baseInfo' },
      { label: '物流渠道', prop: 'shippingDesc', prevParent: 'baseInfo' },
      { label: '运单号', prop: 'waybillNo', prevParent: 'baseInfo' },
      { label: '跟踪号', prop: 'trackOrderCode', prevParent: 'baseInfo' },
      { label: '出库单号', prop: 'outboundCode', prevParent: 'baseInfo' },
    ] as infoMapType[],
    金额信息: [
      {
        label: '订单售价（不含税）',
        prop: 'sumTotalPrice',
        prevParent: 'baseInfo',
        showUnit: true,
      },
      { label: '订单折扣', prop: 'discountAmount', prevParent: 'baseInfo', showUnit: true },
      { label: '订单积分', prop: 'integral', prevParent: 'baseInfo' },
      { label: '订单税金', prop: 'taxes', prevParent: 'baseInfo', showUnit: true },
      {
        label: '订单买家支付运费',
        prop: 'salesFreightAmount',
        prevParent: 'baseInfo',
        showUnit: true,
      },
      { label: '订单其他费用', prop: 'otherAmount', prevParent: 'baseInfo', showUnit: true },
    ] as infoMapType[],
  };

  const handleTimeChange = (val) => {
    if (time.value?.length === 2) {
      const end = new Date(time.value[1]);
      end.setHours(23, 59, 59); // 设置结束时间为当天的23:59:59
      time.value[1] = dayjs(end).format('YYYY-MM-DD HH:mm:ss');
    }
    // console.log('TimeChange ~~', time.value);
    let tmp;
    if (val) {
      tmp = threeArr.filter(
        (item) =>
          new Date(item.updateTime).getTime() >= new Date(time.value[0]).getTime() &&
          new Date(item.updateTime).getTime() <= new Date(time.value[1]).getTime()
      );
      if (searchType.value) {
        tmp = tmp.filter((item) => item.type === searchType.value);
      }
      logTypeArr.value = tmp;
    } else {
      tmp = threeArr;
      if (searchType.value) {
        tmp = threeArr.filter((item) => item.type === searchType.value);
      }
      logTypeArr.value = tmp;
    }
  };

  const handleDownload = (item?: any) => {
    downloadFile(item.fileUrl, item.fileName, item);
  };

  const sections = ref<any>([]); // 每个分区 顶部偏移

  const time = ref<any>([]);
  // 查看
  const open = async (code: any) => {
    showDetail.value = true;
    erpCode.value = code;
    await getDetailData();
    nextTick(() => {
      initSections();
    });
  };
  let contentSection;
  // 初始化获取所有内容区域
  const initSections = () => {
    sections.value = [];
    for (let i = 0; i < tabs.length; i += 1) {
      const section = document.getElementById(tabs[i].id);
      if (section) {
        sections.value.push({
          id: tabs[i].id,
          offsetTop: section.offsetTop,
        });
      }
    }
  };
  const startLoading = () => {
    const draw: any = document.querySelector('.detail-drawer');
    detailLoading.value = ElLoading.service({ target: draw }); // 全屏加载效果
    setTimeout(() => {
      detailLoading.value?.close();
    }, 5000);
  };
  const handleDrawerOpened = () => {
    contentSection = document.querySelector('.detail-drawer .el-drawer__body');
    if (contentSection) {
      contentSection.addEventListener('scroll', handleScroll);
    }
    nextTick(() => {
      initSections();
    });
    window.addEventListener('resize', initSections);
  };

  const handleDrawerClosed = () => {
    contentSection?.scrollTo({ top: 0 });
    activated.value = 'base';
    if (contentSection) {
      contentSection.removeEventListener('scroll', handleScroll);
    }
    window.removeEventListener('resize', initSections);
    detailLoading.value?.close();
  };
  const handleDrawerBeforeClosed = () => {
    contentSection?.scrollTo({ top: 0 });
    activated.value = 'base';
    searchType.value = '';
    time.value = [];
  };

  let threeArr: any[];
  // 1:客服备注 ,2:上传附件,3:订单备注 4:操作记录
  const handleSelectLogChange = (val) => {
    // console.log('handleSelectLogChange todo~~', val, typeof val);
    // threeArr.sort((a, b) => b.updateTime - a.updateTime);
    let tmp;
    if (val) {
      tmp = threeArr.filter((item) => item.type === val);
      if (time.value && time.value.length > 0) {
        tmp = tmp.filter(
          (item) =>
            new Date(item.updateTime).getTime() >= new Date(time.value[0]).getTime() &&
            new Date(item.updateTime).getTime() <= new Date(time.value[1]).getTime()
        );
      }
      logTypeArr.value = tmp;
    } else {
      tmp = threeArr;
      if (time.value && time.value.length > 0) {
        tmp = tmp.filter(
          (item) =>
            new Date(item.updateTime).getTime() >= new Date(time.value[0]).getTime() &&
            new Date(item.updateTime).getTime() <= new Date(time.value[1]).getTime()
        );
      }
      logTypeArr.value = tmp;
    }
  };

  const headerHeight = 98;
  let clickIndex;
  let isClick = false;
  const endScroll = () => {
    if (isClick) {
      isClick = false;
      // activated.value = clickIndex;
      setTimeout(() => {
        activated.value = clickIndex;
      }, 20);
    }
  };
  const tabClick = (tab: any) => {
    clickIndex = tab.paneName;
    isClick = true;
    const section = document.getElementById(tab.paneName);
    if (section) {
      // 计算Sticky头部高度
      const top = section.offsetTop - headerHeight;
      contentSection?.scrollTo({ top, behavior: 'smooth' });
      contentSection.addEventListener('scrollend', endScroll);
    }
  };
  let scrollTimeout;
  // 处理滚动事件
  const handleScroll = (event) => {
    if (scrollTimeout) {
      // clearTimeout
      return;
    }
    scrollTimeout = setTimeout(() => {
      //  更新当前活动Tab
      if (sections.value.length > 0) {
        const scrollPosition = event.target.scrollTop + headerHeight;
        // 找到当前可见区域
        for (let i = sections.value.length - 1; i >= 0; i -= 1) {
          const section = sections.value[i];
          if (scrollPosition >= section.offsetTop) {
            activated.value = sections.value[i].id;
            break;
          }
        }
      }
      scrollTimeout = null;
    }, 20);
  };

  // 上一条
  const queryPrev = () => {
    const codeArr = props.listData.map((item) => item.erpCode);
    let index = 0;
    for (let i = 0; i < codeArr.length; i += 1) {
      if (erpCode.value === codeArr[i]) {
        index = i;
        break;
      }
    }
    if (index > 0) {
      index -= 1;
      erpCode.value = codeArr[index];
      getDetailData();
    } else {
      ElMessage.warning('已经到第一条了!');
    }
  };
  const queryNext = () => {
    const codeArr = props.listData.map((item) => item.erpCode);
    let index = codeArr.length - 1;
    for (let i = 0; i < codeArr.length; i += 1) {
      if (erpCode.value === codeArr[i]) {
        index = i;
        break;
      }
    }
    if (index < codeArr.length - 1) {
      index += 1;
      erpCode.value = codeArr[index];
      getDetailData();
    } else {
      ElMessage.warning('已经到最后一条了!');
    }
  };
  // 全屏操作
  const fullScreen = () => {
    if (isFull.value) {
      drawerWid.value = 1200;
    } else {
      drawerWid.value = '100%';
    }
    isFull.value = !isFull.value;
  };
  const refresh = () => {
    getDetailData();
  };
  const quit = () => {
    showDetail.value = false;
  };

  const props = defineProps<{
    listData?: any;
  }>();

  interface productItemType {
    productName?: string;
    itemId?: string;
    num?: number;
    price?: number;
    skuCode?: string;
    weight?: number;
    totalPrice?: number;
    sellerSku?: string;
    volume?: number;
    discountAmount?: string;
    supplySku?: string;
    remark?: string;
    taxes?: number;
    salesFreightAmount?: number;
    otherAmount?: number;
    productImageUrl?: string;
    id?: number;
    buyerChooseLogistics?: string;
    integral?: string | number;
  }

  interface baseInfoType {
    channel?: string;
    site?: string;
    shopAccount?: string;
    createTime?: string;
    orderLabelList?: Array<{ labelCode: string; labelName: string }>;
    orderStatus?: number;
    orderStatusDesc?: string;
    refNo?: string;
    erpCode?: string;
    flowName?: string;
    shippingCode?: string | number;
    warehouseCode?: string;
    warehouseDesc?: string;
    waybillNo?: string;
    spCode?: string;
    spDesc?: string;
    trackOrderCode?: string;
    sendTime?: string;
    customerName?: string;
    email?: string;
    currencyCode?: string;
    customRemark?: string;
    statusInfoList?: Array<{
      handleTime: string;
      sort: number;
      status: number;
      statusDesc: string;
      nodeStatus: string;
    }>;
  }

  const form = ref({
    baseInfo: { orderLabelList: [], statusInfoList: [] } as baseInfoType,
    authNodeList: [],
    itemInfoList: [] as productItemType[],
    orderRemarkList: [] as Array<{ remark: string }>,
    receiveInfo: {
      shortAddress: '',
      address: '',
      address2: '',
      area: '',
      city: '',
      countryCode: '',
      email: '',
      houseNumber: '',
      name: '',
      phone: '',
      province: '',
      customerCode: '',
      zipcode: '',
      customerDesc: '',
      countryDesc: '',
      organizationDeptName: '',
    },
    customerInfoBean: {} as baseInfoType,
    pass: undefined,
  });

  const getDetailData = async () => {
    if (erpCode.value) {
      startLoading();
      const res: any = await omsApi.omsOrderQueryDetail({
        erpCode: erpCode.value as string,
        searchEdit: false,
      });
      if (!res.orderCustomsRemarkList) {
        res.orderCustomsRemarkList = [];
      }
      if (!res.receiveInfo.organizationDeptName) {
        res.receiveInfo.organizationDeptName = '';
      }
      form.value = res;
      form.value.baseInfo.statusInfoList?.map((item, index) => {
        if (index !== (form.value.baseInfo.statusInfoList?.length as number) - 1)
          item.nodeStatus = 'finish';
        else item.nodeStatus = 'process';
        return item;
      });
      res.orderCustomsRemarkList.forEach((item) => {
        item.type = 1;
      });
      res.orderAttachmentList.forEach((item) => {
        item.type = 2;
        // 获取最后的 . 文件后缀
        const tmp = item.fileName.split('.');
        if (tmp.length >= 2) {
          item.suffix = tmp[tmp.length - 1];
        } else {
          item.suffix = 'unknown';
        }
      });
      res.orderRemarkList.forEach((item) => {
        item.type = 3;
      });
      // const filterArr = res.authLogList;
      const filterArr = res.authLogList.filter((item) => {
        // 先过滤审核节点 todo
        return (
          item.operationType !== null &&
          item.operationType !== 'auth' &&
          item.operationType !== 'to_auth'
        );
      });
      filterArr.forEach((item) => {
        item.type = 4;
      });
      // console.log('操作信息 过滤后', filterArr);
      // const twoArr = res.authLogList.concat(res.orderCustomsRemarkList, res.orderAttachmentList,res.orderRemarkList);
      threeArr = [];
      // todo 合并 客服备注列表
      threeArr = filterArr.concat(
        res.orderCustomsRemarkList,
        res.orderAttachmentList,
        res.orderRemarkList
      );
      threeArr.forEach((item, index) => {
        item.index = index;
      });
      // console.log(JSON.parse(JSON.stringify(threeArr)));
      threeArr.sort((a, b) => new Date(b.updateTime).getTime() - new Date(a.updateTime).getTime());
      // console.log(threeArr);
      logTypeArr.value = threeArr;
      detailLoading.value?.close();
    }
  };

  const fileProgress: any = ref({});
  // 下载附件
  const downloadFile = async (fileUrl, fileName, file?: any) => {
    const res = await axios.get(fileUrl, {
      responseType: 'blob',
      onDownloadProgress: (progressEvent: any) => {
        if (progressEvent.total) {
          fileProgress.value = Object.assign(fileProgress.value, {
            [file.ossKey]: Math.round((progressEvent.loaded * 100) / progressEvent.total),
          });
          // console.log(fileProgress.value);
        }
      },
    });
    const blob = new Blob([res.data], { type: 'application/octet-stream' });
    const url = window.URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = fileName;
    document.body.appendChild(link);
    link.click();
    fileProgress.value = Object.assign(fileProgress.value, {
      [file.ossKey]: 100,
    });
    // console.log(fileProgress.value);
    setTimeout(() => {
      window.URL.revokeObjectURL(url); // 释放内存
      document.body.removeChild(link);
    }, 0);
  };

  const handleDelete = async (row) => {
    // todo 删除附件
    const isConfirm = await swal.confirm('确定删除该附件？');
    if (isConfirm) {
      await erpApi.luteosErpOrderDeleteAtt({
        // id: row.attachId,
        id: row.id,
      });
      ElMessage.success('删除成功');
      getDetailData();
    }
  };
  const getImg = (name) => {
    return new URL(`/src/assets/images/icon/${name}.svg`, import.meta.url).href;
  };
  defineExpose({
    open,
  });
</script>

<style scoped lang="scss">
  .iconfont {
    cursor: pointer;
  }

  .step-list {
    margin: 0 20px 26px;
    background-color: #f8f8f8;
    border-radius: 16px;
    padding: 18px 32px;
    :deep(.el-steps) {
      display: flex;
      width: 100%;
      .el-step {
        flex: 1;
        .el-step__title {
          color: #1f1f1f;
          line-height: 22px;
          font-size: 14px;
          margin: 12px 0 4px;
        }
        .el-step__description {
          color: #999;
        }
        .el-step__icon {
          width: 28px;
          height: 28px;
          border-width: 1px;
        }
        .el-step__line {
          top: 13px;
          height: 1px;
          left: 56%;
          right: -44%;
        }
      }
      .is-finish {
        .el-step__line {
          background-color: var(--el-color-primary);
        }
        .el-step__icon {
          border-radius: 50%;
          border: 1px solid var(--el-color-primary);
          svg {
            width: 18px;
            height: 18px;
          }
        }
      }
      .is-process {
        .el-step__icon {
          border-color: var(--el-color-primary);
          background-color: var(--el-color-primary);
          color: #fff;
        }
      }
    }
  }

  .product-tag {
    display: flex;
    align-items: center;
    line-height: 22px;
    font-size: 13px;
    border-top: 1px solid #f8f8f8;
    box-sizing: border-box;
    height: 46px;
    .tag {
      display: flex;
      align-items: center;
      color: #999;
      padding: 13px 20px;
      border-right: 1px solid #f4f5f5;
      height: 46px;
      .tag-content {
        line-height: 22px;
      }
    }
    .tag-info {
      color: #1f1f1f;
    }
    .remark {
      padding: 13px 20px;
      color: var(--el-color-primary);
    }
  }

  .empty {
    text-align: center;
    border-bottom: 1px solid #f5f5f5;
    padding-bottom: 14px;
    .text {
      font-size: 14px;
      color: #999999;
      line-height: 22px;
    }
  }
  .tablewrap {
    border: 1px solid #f4f5f5;
    border-radius: 10px;
    overflow: hidden;
    .product-item {
      display: grid;
      grid-template-columns: 436px 260px 204px 266px;
      margin-bottom: 10px;
      .item-area {
        display: flex;
        flex-direction: column;
        .item-remark {
          display: flex;
          align-items: center;
          .item-label {
            color: #999;
          }
        }
        > div {
          line-height: 22px;
        }
      }
      .item-base {
        display: flex;
        align-items: flex-start;
        padding: 14px 12px;
        .product-img {
          width: 36px;
          height: 36px;
          border-radius: 8px;
          margin: 3px 10px 0 8px;
          position: relative;
          .giftStock {
            width: 20px;
            position: absolute;
            top: -15px;
            right: -5px;
          }
          :deep(.el-image) {
            border-radius: 8px !important;
            min-width: 36px !important;
            width: 36px !important;
            min-height: 36px !important;
            height: 36px !important;
          }
          img {
            width: 100%;
            height: 100%;
            border-radius: 8px;
          }
        }
      }
      .item-detail {
        padding: 14px 12px;
      }
    }
  }
  :deep(.el-select) {
    height: 26px !important;
    .el-select__wrapper {
      min-height: 24px !important;
    }
  }
  :deep(.el-date-editor) {
    height: 26px !important;
  }

  :deep(.el-form) {
    // margin-top: 26px;
  }

  .detail-drawer {
    :deep(.el-picker-panel.el-date-range-picker.has-sidebar) {
      color: #1f1f1f;
      font-size: 13px;
      width: 639px !important;
    }
    :deep(.el-picker-panel__shortcut) {
      text-align: center !important;
      padding: 0;
      color: #1f1f1f;
      font-size: 13px;
      line-height: 32px;
    }
    :deep(.el-picker-panel__sidebar) {
      width: 87px !important;
    }
    :deep(.el-picker-panel__shortcut:hover) {
      background-color: #e8fff1;
    }
    :deep(.el-picker-panel__sidebar + .el-picker-panel__body) {
      margin-left: 87px !important;
    }
    :deep(.el-date-table-cell__text) {
      font-size: 13px;
    }
  }

  .pl16 {
    padding-left: 16px;
  }
  .pl20 {
    padding-left: 20px;
  }
  .ml16 {
    margin-left: 16px;
  }
  .audit-wrap {
    padding-bottom: 10px;
    height: 210px;
  }
  .ml20 {
    margin-left: 20px;
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
  .detail-title2 {
    color: #1f1f1f;
    font-family: 'PingFang SC Medium';
    font-size: 16px;
    line-height: 24px;
    padding: 26px 20px 7px;
    background-color: white;
  }
  .wrap1 {
    padding-bottom: 14px;
    border-bottom: solid 1px #f5f5f5;
  }
  .wrap1:last-child {
    padding-bottom: 40px;
  }
  .nobd {
    border: none;
  }
  .container {
    height: 600px;
    overflow: auto;
  }
  .tabwrap {
    padding: 0 20px;
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
  .detail-title3 {
    color: #1f1f1f;
    font-size: 14px;
    font-family: 'PingFang SC Medium';
    line-height: 22px;
    padding: 20px 0 12px;
    display: flex;
    .text {
      flex: 1;
    }
    .operate {
      height: 24px;
      position: relative;
      top: -1px;
    }
    .action {
      font-weight: normal;
      font-size: 12px;
      height: 22px;
      line-height: 22px;
      vertical-align: top;
      overflow: hidden;
      display: flex;
      align-items: center;
      cursor: pointer;
      color: #666666 !important;
      .info {
        margin-left: 6px;
        font-size: 12px;
        color: #666666 !important;
      }
    }
  }
  .flexbox {
    display: flex;
    font-size: 13px;
    line-height: 22px;
    padding-bottom: 6px;
    color: #1f1f1f;
    .left {
      flex-shrink: 0;
      color: #999999;
    }
    .right {
      flex: 1;
      flex-shrink: 0;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
      color: #1f1f1f;
    }
  }
  .sticky {
    position: sticky;
    top: 0px;
    z-index: 1000;
    padding-left: 5px;
  }

  .flex-center {
    display: flex;
    align-items: center;
  }
</style>

<style lang="scss">
  .detail-drawer {
    .el-drawer__header {
      padding: 0 !important;
      margin: 0 !important;
    }
    .el-drawer__body {
      padding: 0 !important;
      // margin: 0 !important;
    }
    :deep(.el-picker-panel) {
      color: #1f1f1f;
      font-size: 13px;
    }
    :deep(.el-picker-panel__shortcut) {
      text-align: center !important;
      padding: 0;
      color: #1f1f1f;
      font-size: 13px;
      line-height: 32px;
    }
    :deep(.el-picker-panel__sidebar) {
      width: 87px !important;
    }
    :deep(.el-picker-panel__shortcut:hover) {
      background-color: #e8fff1;
    }
    .el-picker-panel__sidebar + .el-picker-panel__body {
      margin-left: 87px;
    }
  }
</style>
