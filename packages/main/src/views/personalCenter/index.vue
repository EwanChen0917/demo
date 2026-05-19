<template>
  <div class="select-page">
    <div class="content">
      <div class="userinfo">
        <div class="avatar">
          <img :src="urlSource" />
        </div>
        <div class="text">
          <div class="name">{{ getTimePeriod() }}好，{{ userInfo?.name }}！</div>
          <div class="tip">
            <span class="tip-text">{{ solarTerm }}</span>
          </div>
        </div>
      </div>
      <div class="home-container">
        <el-row :gutter="16">
          <el-col :span="18" class="container-left">
            <!-- 轮播图 -->
            <el-carousel
              height="200px"
              class="carousel"
              :autoplay="false"
              indicator-position="none"
              arrow="never"
            >
              <el-carousel-item class="carousel-item" v-for="item in carouselList" :key="item.url">
                <img :src="item.url" alt="" />
              </el-carousel-item>
            </el-carousel>
            <!-- 世界时间 -->
            <div class="world-time">
              <div
                class="world-time-item-container"
                v-for="(item, index) in worldTimeList"
                :key="item.zoneId"
              >
                <div class="world-time-item">
                  <img :src="item.icon" alt="" />
                  <span class="world-time-item-city">{{ item.timeZone }}</span>
                  <span class="world-time-item-time">{{ item.currentTime }}</span>
                </div>
                <div v-if="index !== worldTimeList.length - 1" class="split-line"></div>
              </div>
            </div>
            <!-- 个人常用页面 -->
            <div class="common-page">
              <span class="common-page-title" text="2xl">个人常用页面</span>
              <el-skeleton v-if="loading.commonPage" animated>
                <template #template>
                  <div class="common-page-list">
                    <div v-for="item in 8" :key="item" class="common-skeleton-item">
                      <el-skeleton-item variant="text" style="height: 46px" />
                    </div>
                  </div>
                </template>
              </el-skeleton>
              <div class="common-page-list" v-else>
                <div
                  class="common-page-item"
                  v-for="item in commonPageList"
                  :key="item.menuCode"
                  @click="handleCommonPageClick(item)"
                >
                  <i class="iconfont icon-celvejianyi"></i>
                  <OverflowTooltip
                    class="common-page-item-title"
                    :fontSize="12"
                    color="#1E2226"
                    :content="item.displayTitle"
                    :line="1"
                  />
                  <!-- <span class="common-page-item-title">{{ item.displayTitle || getCommonPageTitle(item.title) }}</span> -->
                </div>
              </div>
            </div>
            <!-- 实时汇率 -->
            <div class="exchange-rate">
              <span class="exchange-rate-title">实时汇率（仅供参考）</span>
              <div class="split-line"></div>
              <div
                class="exchange-rate-item"
                v-for="(item, index) in exchangeRateList"
                :key="item.currencyCode"
              >
                <div class="exchange-rate-item-content">
                  <span class="currency-symbol">{{ item.symbol }}</span>
                  <span>{{ item.currencyCode }}</span>
                  <span>{{ item.rate }}</span>
                </div>
                <div v-if="index !== exchangeRateList.length - 1" class="split-line"></div>
              </div>
            </div>
            <!-- 常用工具、路特超脑库 -->
            <div class="common-tool-super-brain-map">
              <el-tabs v-model="activeTab" class="demo-tabs">
                <el-tab-pane label="常用工具" name="first">
                  <el-skeleton animated style="margin-top: 10px" v-if="loading.commonTool">
                    <template #template>
                      <div class="common-tool-list">
                        <div v-for="item in 14" :key="item" class="tool-skeleton-item">
                          <el-skeleton-item variant="text" style="height: 102px" />
                        </div>
                      </div>
                    </template>
                  </el-skeleton>
                  <div class="common-tool-list" v-else-if="toolList.length > 0 && !loading.commonTool">
                    <div
                      class="common-tool-item"
                      v-for="item in toolList"
                      :key="item.title"
                      @click="handleToolClick(item)"
                    >
                      <img :src="item.url" alt="" />
                      <span class="common-tool-item-title">{{ item.title }}</span>
                    </div>
                  </div>
                  <div class="tool-empty" v-else>
                    <EmptyAnimation name="listEmpty" :width="128" :height="128" />
                    暂无常用工具
                  </div>
                </el-tab-pane>
                <el-tab-pane label="路特超脑库" name="second">
                  <div class="super-brain-map-list" v-if="superBrainMapList.length > 0">
                    <div
                      class="super-brain-map-item"
                      v-for="item in superBrainMapList"
                      :key="item.title"
                      @click="handleSuperBrainMapClick(item)"
                    >
                      <img :src="item.url" alt="" />
                      <div class="super-brain-map-item-content">
                        <span>{{ item.title }}</span>
                        <span class="super-brain-map-item-text">{{ item.desc }}</span>
                      </div>
                    </div>
                  </div>
                  <div class="tool-empty" v-else>
                    <EmptyAnimation name="listEmpty" :width="128" :height="128" />
                    暂无路特超脑库
                  </div>
                </el-tab-pane>
              </el-tabs>
            </div>
            <!-- 路特人全业务链路数字化工具 -->
            <div class="digital-tool-list">
              <div class="digital-tool-list-header">
                <span class="digital-tool-list-title">路特人的全业务链路数字化工具</span>
                <span class="digital-tool-list-text">
                  帮助各组织团队降本增效，提升用户服务、保持稳健经营
                </span>
              </div>
              <el-tabs
                type="simple"
                size="default"
                v-model="toolActiveTab"
                class="digital-tool-tabs"
              >
                <el-tab-pane v-for="item in digitalToolList" :label="item.title" :name="item.title">
                  <div class="digital-tool-list-item">
                    <div class="digital-tool-list-item-content">
                      <span class="digital-tool-list-item-title">{{ item.title }}</span>
                      <div
                        v-for="(info, index) in item.textList"
                        :key="index"
                        class="digital-tool-list-item-text"
                      >
                        <span class="digital-tool-list-item-text-title">{{ info.text }}</span>
                        <span class="digital-tool-list-item-text-description">
                          {{ info.description }}
                        </span>
                      </div>
                      <!-- <span><el-button type="primary" size="small" @click="handleMore(item)">立即前往</el-button></span> -->
                    </div>
                    <div class="digital-tool-list-item-image">
                      <KeenImagePreview
                        :src="getImageUrl(item.key)"
                        :src-list="[getImageUrl(item.key)]"
                      />
                    </div>
                  </div>
                </el-tab-pane>
              </el-tabs>
            </div>
          </el-col>
          <el-col :span="6" class="container-right">
            <!-- 路特news -->
            <div class="news-list lu-te-news-content">
              <div class="news-list-header">
                <span class="news-list-title">路特news</span>
                <!-- <span class="news-list-text" @click="handleMore('news')">更多</span> -->
              </div>
              <el-skeleton animated v-if="loading.news">
                <template #template>
                  <div v-for="item in 3" :key="item" class="news-skeleton-item">
                    <el-skeleton-item variant="circle" style="width: 16px; height: 16px" />
                    <div class="news-skeleton-content">
                      <el-skeleton-item variant="text" />
                      <el-skeleton-item variant="text" style="width: 20%" />
                    </div>
                  </div>
                </template>
              </el-skeleton>
              <div class="news-list-content" v-else-if="newsList.length > 0 && !loading.news">
                <div class="news-list-item" v-for="item in newsList" :key="item.title">
                  <img class="news-list-item-icon" src="./images/network.svg" alt="" />
                  <div class="news-list-item-content">
                    <span
                      class="news-list-item-title cursor-pointer"
                      @click="handleNewsClick(item)"
                    >
                      {{ item.title }}
                    </span>
                    <span class="news-list-item-text">{{ item.publishTime.split(' ')[0] }}</span>
                  </div>
                </div>
              </div>
              <div class="tool-empty" v-else>
                <EmptyAnimation name="listEmpty" :width="128" :height="128" />
                暂无路特news
              </div>
            </div>
            <!-- 星图分析 -->
            <div class="news-list lu-te-news-content">
              <div class="news-list-header">
                <span class="news-list-title">星图分析</span>
                <!-- <span class="news-list-text" @click="handleMore('news')">更多</span> -->
              </div>
              <el-skeleton animated v-if="loading.starChart">
                <template #template>
                  <div v-for="item in 3" :key="item" class="news-skeleton-item">
                    <el-skeleton-item variant="circle" style="width: 16px; height: 16px" />
                    <div class="news-skeleton-content">
                      <el-skeleton-item variant="text" style="width: 30%"  />
                      <el-skeleton-item variant="text" />
                    </div>
                  </div>
                </template>
              </el-skeleton>
              <div class="news-list-content" v-else-if="starChartAnalysisList.length > 0 && !loading.starChart">
                <div class="news-list-item" v-for="item in starChartAnalysisList" :key="item.title">
                  <img class="news-list-item-icon" src="./images/network.svg" alt="" />
                  <div class="news-list-item-content">
                    <span
                      class="news-list-item-title cursor-pointer"
                      @click="handleStarClick(item)"
                    >
                      {{ item.title }}
                    </span>
                    <span class="news-list-item-text">{{ item.desc }}</span>
                  </div>
                </div>
              </div>
              <div class="tool-empty" v-else>
                <EmptyAnimation name="listEmpty" :width="128" :height="128" />
                暂无星图分析
              </div>
            </div>
            <!-- 行业资讯 -->
            <div class="news-list industry-news-content">
              <div class="news-list-header">
                <span class="news-list-title">行业资讯</span>
                <!-- <span v-if="industryNewsList.length > 0" class="news-list-text" @click="handleMore('industry')">更多</span> -->
              </div>
              <el-skeleton animated v-if="loading.industryNews">
                <template #template>
                  <div
                    v-for="item in 1"
                    :key="item"
                    class="news-skeleton-item"
                    style="height: 105px"
                  >
                    <el-skeleton-item variant="text" style="width: 16px; height: 16px" />
                    <div class="news-skeleton-content">
                      <el-skeleton-item variant="text" />
                      <el-skeleton-item variant="text" style="width: 20%" />
                      <el-skeleton-item variant="text" style="height: 50px" />
                    </div>
                  </div>
                </template>
              </el-skeleton>
              <div class="news-list-content" v-else-if="industryNewsList.length > 0 && !loading.industryNews">
                <div
                  class="news-list-item flex_between border-bottom"
                  v-for="item in industryNewsList"
                  :key="item.id"
                >
                  <i class="Root-tyicon icon-Root-tygongnengcanshufenxi" />
                  <div class="news-list-item-content">
                    <span
                      class="news-list-item-title"
                      :class="{ 'cursor-pointer': item.link }"
                      @click="handleIndustryNewsClick(item)"
                    >
                      {{ item.title }}
                    </span>
                    <span class="news-list-item-text">{{ item.time.split(' ')[0] }}</span>
                    <div v-if="item.summary" class="news-list-item-summary">
                      <OverflowTooltip
                        :fontSize="12"
                        color="#666"
                        :content="item.summary"
                        :line="2"
                      />
                      <!-- {{ item.summary }} -->
                    </div>
                  </div>
                </div>
              </div>
              <div class="tool-empty" v-else>
                <EmptyAnimation name="listEmpty" :width="128" :height="128" />
                暂无行业资讯
              </div>
            </div>
            <!-- 路小特 -->
            <div class="news-list lu-smart-content">
              <div class="news-list-header lu-smart">
                <span class="news-list-title">路小特</span>
                <span class="news-list-text no-pointer">
                  公司内部 AI 助手 · 输入后在新页面继续对话
                </span>
              </div>
              <div class="news-list-content">
                <el-input
                  v-model="luQuestion"
                  ref="luInputRef"
                  :rows="5"
                  type="textarea"
                  placeholder="向路小特提问..."
                  clearable
                  @keydown.enter.ctrl.exact.prevent="handleLuQuestion"
                  @keydown.enter.exact.prevent="handleLuQuestion"
                ></el-input>
                <div class="send-icon" @click="handleLuQuestion">
                  <img src="./images/send.svg" alt="" />
                </div>
              </div>
            </div>
            <!-- 系统更新 -->
            <div class="news-list system-update-content">
              <div class="news-list-header">
                <span class="news-list-title">系统更新</span>
                <span
                  v-if="systemUpdateList.length > 0"
                  class="news-list-text"
                  @click="handleMore('system')"
                >
                  更多
                </span>
              </div>
              <el-skeleton animated v-if="loading.systemUpdate">
                <template #template>
                  <div class="news-list-content">
                    <div v-for="item in 2" :key="item" class="system-skeleton-item">
                      <el-skeleton-item variant="text" style="width: 30%" />
                      <el-skeleton-item variant="text" style="width: 30%" />
                    </div>
                  </div>
                </template>
              </el-skeleton>
              <div class="news-list-content" v-else-if="systemUpdateList.length > 0 && !loading.systemUpdate">
                <div
                  class="news-list-item flex_between border-bottom"
                  v-for="item in systemUpdateList"
                  :key="item.title"
                >
                  <div class="news-list-item-content">
                    <span class="news-list-item-title">{{ item.title }}</span>
                  </div>
                  <span class="news-list-item-text">{{ item.startTime.split(' ')[0] }}</span>
                </div>
              </div>
              <div class="tool-empty" v-else>
                <EmptyAnimation name="listEmpty" :width="128" :height="128" />
                暂无系统更新
              </div>
            </div>
            <!-- 产品操作说明 -->
            <div class="product-operation" @click="handleMore('product')">
              <img class="product-operation-icon" :src="productIcon" alt="" />
              <div class="product-operation-content">
                <span class="product-operation-title">{{ productOperation.title }}</span>
                <span class="product-operation-text">{{ productOperation.text }}</span>
              </div>
            </div>
          </el-col>
        </el-row>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts" name="personalCenter">
  import { onMounted, onUnmounted, ref, nextTick } from 'vue';
  import { ElMessage } from 'element-plus';
  import { arrayToTree, getAllNodes } from '@/utils/menuTree';
  import { memberApi, commonApi, statisticalApi, zoneConversionApi } from '@/api';
  import { querySentimentList } from '@/views/publicSentiment/api';
  import { useStore } from '@/store/modules/useStore';
  import { getTimePeriod, getWorldTime } from '@/utils/time';
  import { isEmpty } from 'lodash-es';
  import { routeMap } from '@/router';
  import { openWindow } from '@/utils';
  import dayjs from 'dayjs';
  import { encryptByBase64 } from '@/utils/aesTils';
  const { getInfo, getTotalMenus } = useStore();
  const userInfo = getInfo;
  import header from './images/header.jpg';
  import china from './images/china.svg';
  import newYork from './images/new-york.svg';
  import london from './images/london.svg';
  import productIcon from './images/product.svg';
  const router = useRouter();

  const urlSource = computed(() => {
    if (isEmpty(userInfo?.avatar)) {
      return 'https://lute-public-prod.oss-cn-shenzhen.aliyuncs.com/C00000001/temp/Group%201896.png';
    }
    return userInfo?.avatar;
  });

  const getImageUrl = (name: string) => {
    return new URL(`./images/${name}.jpg`, import.meta.url).href;
  };

  const menuList = computed(() => {
    const filterPathMenus = (menus: any[]) => {
      return menus
        ?.filter(
          (item) => ['menu', 'url', 'iframe'].includes(item.menuType) && item.name !== '默认'
        )
        ?.map((item) => {
          let path = '';
          if (item.menuType === 'url') {
            path = item.redirect;
          } else if (item.menuType === 'iframe') {
            path =
              item.componentName && item.componentName !== 'frame'
                ? routeMap[item.componentName]?.path.replace(
                    /:frameUrl$/,
                    encryptByBase64(item.redirect)
                  )
                : `/frame/${item.menuCode}/${encryptByBase64(item.redirect)}`;
          } else {
            path = item.componentName ? routeMap[item.componentName]?.path : '';
          }
          return {
            icon: item.icon,
            name: item.name,
            menuCode: item.menuCode,
            menuType: item.menuType,
            externalLink: item.menuType === 'url',
            path,
            componentName: item.componentName,
            collectFlag: item.collectFlag,
            iconName: item.collectFlag ? 'icon-yishoucang' : 'icon-shoucang',
            activeMenu: item.componentName ? routeMap[item.componentName]?.activeMenu : '',
            children: filterPathMenus(item?.children),
          };
        });
    };
    return filterPathMenus(getTotalMenus);
  });

  const totalNodes = computed(() => {
    return getAllNodes(arrayToTree(menuList.value), (node) => {
      return node?.menuType !== 'button' && node?.path;
    });
  });

  // 节气
  const solarTerm = ref('');
  const getSolarTerm = async () => {
    const res = await zoneConversionApi.luteosAiAreaSolarTerm();
    solarTerm.value = (res as string) || '';
  };

  // 轮播图
  const carouselList = ref<any[]>([
    {
      url: header,
    },
  ]);

  // 世界时间
  const iconMap = {
    'Asia/Shanghai': china,
    'America/New_York': newYork,
    'America/Los_Angeles': newYork,
    'Europe/London': london,
  };
  const worldTimeList = ref<Array<any>>([]);
  let timer: any = null;
  let timer2: any = null;
  const updateExchangeRate = () => {
    getExchangeRateList();
  };
  const updateWorldTime = () => {
    getWordTimeList();
  };
  const getWordTimeList = () => {
    worldTimeList.value =
      getWorldTime().map((item) => ({
        ...item,
        icon: iconMap[item.zoneId],
      })) || [];
  };

  // 汇率
  const exchangeRateList = ref<any[]>([]);
  // const lastUpdate = ref('');
  const getExchangeRateList = async () => {
    const res = await zoneConversionApi.luteosAiAreaExchangeRate();
    // lastUpdate.value = res?.lastUpdate?.split('T')[1]?.split('.')[0] || '';
    exchangeRateList.value = res?.rates || [];
  };

  // 个人常用页面 去掉工作台 luteosMemberQuerySevenDaysMenuVisit
  const commonPageList = ref<any[]>([]);
  const getCommonPageList = async () => {
    const res = await memberApi.luteosMemberQuerySevenDaysMenuVisit();
    const list = res || [];
    commonPageList.value = list
      .map((item: any) => {
        // 路小特 按钮 特殊
        if(getCommonPageTitle(item.menuDesc) == '路小特') return {
          ...item,
          displayTitle: getCommonPageTitle(item.menuDesc),
        }
        // 过滤 menu类型 没有path的菜单
        let targetNode: any = totalNodes.value.find((node: any) => node.menuCode === item?.menuCode);
        if(!targetNode || !targetNode.path) return;
        return {
          ...targetNode,
          displayTitle: getCommonPageTitle(item.menuDesc),
        }
      }).filter((item) => item && item?.displayTitle !== '工作台');
    loading.value.commonPage = false;
  };
  const getCommonPageTitle = (menuDesc: string) => {
    if (menuDesc?.includes('-')) {
      const title = menuDesc.split('-');
      return title[title.length - 1];
    }
    return menuDesc;
  };
  const report = async (item) => {
    await memberApi.luteosMemberSaveMenuVisit({
      menuCode: item.menuCode,
    });
  };
  const handleCommonPageClick = (item: any) => {
    report(item);
    if (item?.displayTitle === '路小特') {
      router.push('/luteAssistantApp');
      return;
    }
    if (item.menuType === 'iframe') {
      router.push(item.path);
    } else if (item.menuType === 'url') {
      openWindow(item.path);
    } else {
      router.push({ name: item.componentName });
    }
  };

  // 常用工具、路特超脑库
  const activeTab = ref('first');
  const toolList = ref<any[]>([]);
  // luteosCommonMaterialQueryMaterialList
  const getToolList = async () => {
    const res = await commonApi.luteosCommonMaterialQueryMaterialList({
      listType: 1,
      scene: 'MS2026032620372270683523',
      model: 'MM2026032620374302104661',
      pageNum: 1,
      pageSize: 100,
    });
    toolList.value = res?.materialList || [];
    loading.value.commonTool = false;
  };
  const handleToolClick = (item: any) => {
    if (item?.linkUrl) {
      window.open(item.linkUrl);
    } else {
      ElMessage({
        message: '该工具暂未开放',
        type: 'warning',
      });
    }
  };

  // 路特超脑库
  const env = import.meta.env.MODE;
  const superBrainMapList = ref<any[]>([]);
  const getSuperBrainMapList = async () => {
    const res = await commonApi.luteosCommonMaterialQueryMaterialList({
      listType: 1,
      scene: 'lute_agent_tools',
      model: env === 'prod' ? 'MM2025051519461870183383' : 'MM2025050912100276089089',
      pageNum: 1,
      pageSize: 100,
      status: 1,
    });
    superBrainMapList.value = res?.materialList || [];
  };

  const handleSuperBrainMapClick = (item: any) => {
    if (item?.linkUrl) {
      window.open(item.linkUrl);
    } else {
      ElMessage({
        message: '该工具暂未开放',
        type: 'warning',
      });
    }
  };

  // 路特人全业务链路数字化工具
  const toolActiveTab = ref('营销');
  const digitalToolList = ref<any[]>([
    {
      title: '营销',
      textList: [
        {
          text: '增长引擎',
          description:
            '打通市场洞察、内容营销与用户转化全链路，形成数据驱动的增长闭环，持续提升流量获取效率与转化能力，驱动业务规模增长。',
        },
        {
          text: '用户资产运营',
          description:
            '构建用户数据沉淀与精细化运营体系，贯穿用户全生命周期管理，提升复购率与用户价值，实现品牌长期稳定增长。',
        },
      ],
      key: 'marketing',
    },
    {
      title: '产品',
      textList: [
        {
          text: '商品全生命周期管理',
          description:
            '覆盖选品立项、研发到版本迭代全流程，统一SKU、供应链及合规数据，保障商品数据一致与高效管理。',
        },
        {
          text: '跨部门协同与风险前置',
          description:
            '打通产品、运营与供应链协同链路，实现版本追溯与变更管理，前置识别风险，提升业务响应与决策效率。',
        },
      ],
      key: 'product',
    },
    {
      title: '销售',
      textList: [
        {
          text: '全渠道销售与订单管理',
          description:
            '打通多平台订单与渠道管理，统一销售目标与履约流程，提升整体运营效率与规模增长能力。',
        },
        {
          text: '销售预测与价格管理',
          description:
            '结合价格策略与销售预测能力，优化定价决策与库存节奏，提升利润空间与经营稳定性。',
        },
      ],
      key: 'sales',
    },
    {
      title: '客服',
      textList: [
        {
          text: '客服诉求一站式响应',
          description:
            '整合客服工单管理工具，打通客户标签与画像，支持全球客服协作，实现问题可追溯、服务可评价，高效响应客户需求，提升品牌口碑。',
        },
        {
          text: '全渠道VOC洞察与闭环管理',
          description:
            '聚合多平台客户评价，基于AI自动打标与问题识别，沉淀结构化洞察，驱动问题跟进与持续优化闭环。',
        },
      ],
      key: 'customerService',
    },
    {
      title: '供应链',
      textList: [
        {
          text: '供需协同与库存优化',
          description:
            '打通采购、供应商与仓储物流链路，实现需求预测与补货策略可视化，降低缺货与库存风险，保障稳定交付。',
        },
        {
          text: '供应商管理与风险可控',
          description:
            '统一供应商绩效与履约管理，实时监控物流与库存状态，异常预警与复盘，提升供应链稳定性与运营效率。',
        },
      ],
      key: 'supplyChain',
    },
    {
      title: '财务',
      textList: [
        {
          text: '业财一体化自动核算',
          description:
            '打通订单、物流与采购数据，自动生成凭证与多币种核算，实现成本与报表自动化，提升资金效率与财税合规。',
        },
        {
          text: '预算管控与决策支撑',
          description:
            '贯通业务与财务数据，支持成本分析与预算管控，自动输出报表与税务数据，提供决策洞察与风险预警。',
        },
      ],
      key: 'finance',
    },
    {
      title: '数据',
      textList: [
        {
          text: '全域数据整合与可视化',
          description:
            '整合营销、销售、供应链与财务数据，构建统一数据视图，通过可视化分析支撑经营决策与风险管控。',
        },
        {
          text: '智能分析与增长洞察',
          description:
            '支持多维数据分析与指标监控，挖掘业务瓶颈与增长机会，驱动企业从经验走向数据驱动决策。',
        },
      ],
      key: 'data',
    },
    {
      title: '协作',
      textList: [
        {
          text: '跨组织流程高效流转',
          description:
            '打通跨部门协同与流程审批，实现任务流转线上化，提升沟通效率，保障业务高效推进。',
        },
        {
          text: '知识沉淀与动态同步',
          description:
            '统一项目进度与协作信息，沉淀多语种知识与经验，减少信息差，支撑快速响应与合规管理。',
        },
      ],
      key: 'collaboration',
    },
  ]);

  // 路特news
  const newsList = ref<any[]>([]);
  const getNewsList = async () => {
    const res = await querySentimentList({
      classification: '新闻',
      publishTimeStart: dayjs().subtract(6, 'day').startOf('day').format('YYYY-MM-DD'),
      publishTimeEnd: dayjs().add(0, 'day').endOf('day').format('YYYY-MM-DD'),
      pageNum: 1,
      pageSize: 100
    })
    newsList.value = res?.opinionDataList || []
    loading.value.news = false;
  };
  const handleNewsClick = (item) => {
    if (item.url) {
      window.open(item.url);
    }
  };

  // 星图分析
  const starChartAnalysisList = ref<any[]>([]);
  const getStarChartAnalysisList = async () => {
    const res = await commonApi.luteosCommonMaterialQueryMaterialList({
      listType: 1,
      scene: 'MS2026032620372270683523',
      model: env === 'prod' ? 'MM2026041320013282898366' : 'MM2026041315511487244909',
      pageNum: 1,
      pageSize: 100,
    });
    starChartAnalysisList.value = res?.materialList || [];
    loading.value.starChart = false;
  };
  const handleStarClick = (item) => {
    if(item.linkUrl) {
      router.push(item.linkUrl);
    }
  }

  // 行业资讯
  const showSummary = ref({});
  const industryNewsList = ref<any[]>([]);
  const getIndustryNewsList = async () => {
    const res = await zoneConversionApi.luteosAiAreaSummaryList({
      pageNum: 1,
      pageSize: 100,
    });
    industryNewsList.value = res?.summaryList || [];
    showSummary.value = industryNewsList.value.reduce((acc, item) => {
      acc[item.title] = false;
      return acc;
    }, {});
  };
  const handleIndustryNewsClick = (item) => {
    if (item.link) {
      window.open(item.link);
    }
  };

  // 路小特
  const luQuestion = ref('');
  const luInputRef = ref<any>(null);
  const handleLuQuestion = (e?: KeyboardEvent) => {
    if (e && e.ctrlKey && e.key === 'Enter') {
      // ctrl + enter 换行
      const textarea = luInputRef.value?.$el.querySelector('textarea');
      if (textarea) {
        const start = textarea.selectionStart;
        const end = textarea.selectionEnd;
        luQuestion.value =
          luQuestion.value.substring(0, start) + '\n' + luQuestion.value.substring(end);
        // 设置光标位置
        nextTick(() => {
          textarea.setSelectionRange(start + 1, start + 1);
          textarea.focus();
        });
      }
      return;
    }

    if (luQuestion.value) {
      // https://erp.luteos.site/luteAssistantApp?questionWords=
      router.push({
        name: 'LuteAssistantApp',
        params: {
          questionWords: luQuestion.value,
        },
      });
    } else {
      ElMessage.warning('请输入问题');
    }
  };

  // 系统更新
  const systemUpdateList = ref<any[]>([]);
  const getSystemUpdateList = async () => {
    const res = await commonApi.luteosCommonMaterialQueryMaterialList({
      listType: 1,
      scene: 'MS2026032620372270683523',
      model: 'MM2026032621120371695576',
      pageNum: 1,
      pageSize: 100,
    });
    systemUpdateList.value = res?.materialList || [];
    loading.value.systemUpdate = false;
  };

  // 更多
  const handleMore = (type) => {
    switch (type) {
      // 系统更新
      case 'system':
        window.open(
          'https://alidocs.dingtalk.com/i/nodes/AR4GpnMqJzYPnny5CqqBAYvOVKe0xjE3?corpId=ding1a1c6d46f33cfeb735c2f4657eb6378f&utm_medium=im_card&iframeQuery=utm_medium%3Dportal_space_create%26utm_source%3Dportal&cid=17763260%3A59400310&utm_scene=team_space&utm_source=im'
        );
        break;
      // 产品操作说明
      case 'product':
        window.open(
          'https://alidocs.dingtalk.com/i/nodes/QOG9lyrgJPj7eeYlcXXr15ZwWzN67Mw4?doc_type=wiki_doc&utm_medium=main_vertical&utm_scene=team_space&utm_source=search'
        );
        break;
      // 行业资讯
      case 'industry':
        // window.open(
        //   'https://alidocs.dingtalk.com/i/nodes/lyQod3RxJKvzLLnbfOEPORoyVkb4Mw9r?cid=74832687232&corpId=ding1a1c6d46f33cfeb735c2f4657eb6378f&doc_type=wiki_doc&iframeQuery=utm_medium=im_card&utm_source=im&utm_medium=im_card&utm_scene=person_space&utm_source=im'
        // );
        break;
      // 路特news
      case 'news':
        // router.push({
        //   path: '/news',
        // });
        break;
      default:
        break;
    }
  };

  // 产品操作说明
  const productOperation = ref<any>({
    title: '产品操作说明',
    text: '跳转至钉钉文档',
    icon: 'https://lute-public-prod.oss-cn-shenzhen.aliyuncs.com/C00000001/temp/Group%201896.png',
  });

  // 监听容器变化，自动重新计算高度
  let resizeObserver: ResizeObserver | null = null;
  const setupResizeObserver = () => {
    const commonPage = document.querySelector('.common-page') as HTMLElement;
    const commonToolSuperBrainMap = document.querySelector(
      '.common-tool-super-brain-map'
    ) as HTMLElement;
    const systemUpdateContent = document.querySelector('.system-update-content') as HTMLElement;

    if (!commonPage && !commonToolSuperBrainMap && !systemUpdateContent) return;

    // 移除旧的观察器
    if (resizeObserver) {
      resizeObserver.disconnect();
    }

    // 创建新的观察器
    resizeObserver = new ResizeObserver(() => {
      calculateIndustryNewsMaxHeight();
    });

    // 监听特定的左侧元素和系统更新内容的变化
    if (commonPage) {
      resizeObserver.observe(commonPage);
    }
    if (commonToolSuperBrainMap) {
      resizeObserver.observe(commonToolSuperBrainMap);
    }
    if (systemUpdateContent) {
      resizeObserver.observe(systemUpdateContent);
    }
  };

  // 动态计算行业资讯最大高度
  const calculateIndustryNewsMaxHeight = () => {
    nextTick(() => {
      const containerRight = document.querySelector('.container-right') as HTMLElement;
      const commonPage = document.querySelector('.common-page') as HTMLElement;
      const commonToolSuperBrainMap = document.querySelector(
        '.common-tool-super-brain-map'
      ) as HTMLElement;
      const systemUpdateContent = document.querySelector('.system-update-content') as HTMLElement;

      if (!containerRight) return;

      // 计算特定左侧元素的高度（个人常用页面 + 路特超脑库）
      let targetLeftHeight = 200 + 40 + 360 + 16 * 5;

      if (commonPage) {
        targetLeftHeight += commonPage.offsetHeight;
      }
      if (commonToolSuperBrainMap) {
        targetLeftHeight += commonToolSuperBrainMap.offsetHeight;
      }

      // 计算右侧其他固定元素的高度（不包括行业资讯）
      const gapHeight = 16 * 5; // gap: 16px × 4
      let otherRightHeight = 232 + 232 + 185 + 48 + gapHeight; // 路特news + 路小特 + 产品操作说明 + 间隙

      if (systemUpdateContent) {
        otherRightHeight += systemUpdateContent.offsetHeight;
      }
      // 右侧容器高度设置为目标左侧高度（个人常用页面 + 路特超脑库）
      containerRight.style.height = `${targetLeftHeight + 16}px`;

      // 行业资讯的最大高度 = 目标左侧高度 - 右侧其他元素高度
      const industryNewsMaxHeight = targetLeftHeight - otherRightHeight;

      // 通过 CSS 变量设置行业资讯最大高度
      containerRight.style.setProperty('--industry-news-max-height', `${industryNewsMaxHeight}px`);
      loading.value.industryNews = false;
    });
  };

  // 加载中
  const loading = ref({
    commonPage: false,
    news: false,
    industryNews: false,
    commonTool: false,
    systemUpdate: false,
    starChart: false,
  });
  onMounted(() => {
    loading.value.commonPage = true;
    loading.value.commonTool = true;
    loading.value.systemUpdate = true;
    loading.value.industryNews = true;
    loading.value.news = true;
    loading.value.starChart = true;
    getSolarTerm();
    getWordTimeList();
    getExchangeRateList();
    getCommonPageList();
    getToolList();
    getNewsList();
    getStarChartAnalysisList();
    getIndustryNewsList();
    getSystemUpdateList();
    getSuperBrainMapList();
    // 所有数据加载完成后，计算行业资讯的最大高度
    calculateIndustryNewsMaxHeight();
    // 设置 ResizeObserver 以监听系统更新内容的大小变化
    setupResizeObserver();
    // 定时器 10分钟更新一次汇率
    timer = setInterval(updateExchangeRate, 1000 * 60 * 10);
    // 定时器 每秒更新时间
    timer2 = setInterval(updateWorldTime, 1000);
  });

  onUnmounted(() => {
    if (timer) {
      clearInterval(timer);
    }
    if (timer2) {
      clearInterval(timer2);
    }
    // 清理 ResizeObserver
    if (resizeObserver) {
      resizeObserver.disconnect();
      resizeObserver = null;
    }
  });

</script>

<style lang="scss" scoped>

  @use 'sass:color';

  .select-page {
    width: 100%;
    height: calc(100vh - 90px);
    overflow: auto;
    scrollbar-width: none;
    background: #f5f7fa;
    // padding: 20px 8%;
    display: flex;
    justify-content: space-between;
    align-items: center;
    flex-direction: column;
    box-sizing: border-box;
    font-family: 'PingFang SC';

    > .content {
      flex: 1;
      // width: 1200px;
      margin: 0 auto;
      height: calc(100vh - 90px);
      background: url(./images/header-top.jpg) no-repeat;
      background-size: 100% auto;
      background-position: center top;
      border-radius: 10px;
      // overflow: auto;
      display: flex;
      flex-direction: column;
      width: 100%;
      // scrollbar-width: none;

      .userinfo {
        padding-top: 33px;
        display: flex;
        align-items: center;
        gap: 16px;
        flex-shrink: 0;
        width: 1400px;
        margin: 0 auto;

        .avatar {
          width: 44px;
          height: 44px;
          flex-shrink: 0;
          border-radius: 50%;
          background-size: cover;

          img {
            height: 100%;
            display: block;
            border-radius: 50%;
          }
        }

        .text {
          flex: 1;
          height: 100%;

          .name {
            font-size: 20px;
            font-size: 18px;
            font-style: normal;
            font-weight: bold;
            line-height: 26px;
            color: $N9;
          }

          .tip {
            display: flex;
            align-items: center;
            flex-wrap: wrap;
            gap: 6px;
            font-size: 13px;
            color: $N6;
            line-height: 22px;
            margin-top: 4px;

            .tip-text {
              color: $N6;
              min-height: 22px;
            }

            .tip-link {
              display: inline-flex;
              align-items: center;
              gap: 4px;
              font-size: 13px;
              color: $P6;
              background: transparent;
              border: none;
              cursor: pointer;
              padding: 0;
              line-height: 1;

              &:hover {
                color: color.adjust($P6, $lightness: -4%);
              }

              &__icon {
                width: 10px;
                height: 10px;
                border: 1px solid currentColor;
                border-left: 0;
                border-top: 0;
                transform: rotate(-45deg);
                display: inline-block;
              }
            }
          }
        }
      }
      .home-container {
        width: 1400px;
        margin: 0 auto;
        min-width: 1200px;
        height: 100%;
        padding-top: 32px;
        .tool-empty {
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
          height: 100%;
          color: var(---N6, var(---N6, #8a9099));
        }
        .container-left,
        .container-right {
          display: flex;
          flex-direction: column;
          gap: 16px;
          min-height: 0;
        }
        .container-right {
          height: 100%;
        }
        .carousel {
          border-radius: 12px;
          .carousel-item {
            border-radius: 12px;
            background: #000711;
            color: #fff;
            img {
              width: 100%;
              height: 100%;
              object-fit: cover;
              image-rendering: -webkit-optimize-contrast;
              backface-visibility: hidden;
            }
          }
        }
        .split-line {
          width: 1px;
          height: 9px;
          flex-shrink: 0;
          background: #b6babf;
        }
        .world-time {
          display: flex;
          gap: 39px;
          padding: 0 12px;
          height: 20px;
          .world-time-item-container {
            display: flex;
            align-items: center;
            gap: 39px;
            flex: 1;
          }
          .world-time-item {
            flex: 1;
            display: flex;
            justify-content: center;
            align-items: center;
            gap: 8px;
            color: var(---N6, var(---N6, #8a9099));
            font-size: 12px;
            font-style: normal;
            font-weight: 400;
            line-height: 20px;
            .world-time-item-time {
              width: 90px;
            }
          }
        }
        .exchange-rate {
          display: flex;
          align-items: center;
          gap: 39px;
          padding: 0 12px;
          .exchange-rate-title {
            color: var(---N9, var(---N9, #1e2226));
            font-size: 12px;
            font-style: normal;
            font-weight: 400;
            line-height: 20px;
            display: flex;
            justify-content: center;
          }
          .exchange-rate-item {
            flex: 1;
            display: flex;
            justify-content: center;
            align-items: center;
            gap: 39px;
            .exchange-rate-item-content {
              flex: 1;
              display: flex;
              justify-content: center;
              align-items: center;
              gap: 8px;
              color: var(---N6, var(---N6, #8a9099));
              font-size: 12px;
              font-style: normal;
              font-weight: 400;
              line-height: 20px;
            }
            .currency-symbol {
              color: #626973;
              font-weight: 600;
            }
          }
        }
        .common-page {
          padding: 16px;
          display: flex;
          flex-direction: column;
          gap: 10px;
          border-radius: 8px;
          background: var(---N0, #fff);
          max-height: 164px;
          .common-page-title {
            color: var(---N9, var(---N9, #1e2226));
            font-size: 12px;
            font-style: normal;
            font-weight: 600;
            line-height: 20px;
          }
          .common-page-list {
            display: grid;
            grid-template-columns: repeat(4, 1fr);
            grid-gap: 10px;
            flex: 1;
            overflow-y: auto;
            scrollbar-width: none;
            align-items: start;
            &::-webkit-scrollbar {
              display: none;
            }
            .common-skeleton-item {
              display: flex;
              align-items: center;
              height: 46px;
            }
          }
          .common-page-item {
            padding: 12px;
            display: flex;
            gap: 10px;
            border-radius: 8px;
            border: 1px solid var(---N4, #dfe2e6);
            align-items: center;
            :is(i) {
              color: var(---P6, #02b96b);
            }
            &:hover {
              border-color: var(---P6, #02b96b);
              cursor: pointer;
            }
            .common-page-item-title {
              color: var(---N9, var(---N9, #1e2226));
              font-size: 12px;
              font-style: normal;
              font-weight: 400;
              line-height: 20px;
              flex: 1;
            }
          }
        }
        .common-tool-super-brain-map {
          padding: 4px 16px 16px;
          border-radius: 8px;
          background: var(---N0, #fff);
          display: flex;
          flex-direction: column;
          gap: 10px;
          max-height: 284px;
          :deep(.el-tabs) {
            height: 100%;
            display: flex;
            flex-direction: column;
            .el-tabs__content {
              flex: 1;
              overflow-y: auto;
              scrollbar-width: none;
              &::-webkit-scrollbar {
                display: none;
              }
              .el-tab-pane {
                height: calc(100% - 10px);
              }
            }
          }
          .common-tool-list {
            display: grid;
            grid-template-columns: repeat(auto-fill, minmax(136px, 1fr));
            grid-gap: 10px;
            margin-top: 10px;
            .tool-skeleton-item {
              height: 102px;
            }
            .common-tool-item {
              padding: 20px 12px;
              display: flex;
              flex-direction: column;
              justify-content: center;
              align-items: center;
              gap: 8px;
              border-radius: 8px;
              border: 1px solid var(---N4, #dfe2e6);
              &:hover {
                border-color: var(---P6, #02b96b);
                cursor: pointer;
              }
              img {
                width: 32px;
                height: 32px;
                aspect-ratio: 1/1;
                border-radius: 8px;
                object-fit: contain;
              }
              .common-tool-item-title {
                color: var(---N9, var(---N9, #1e2226));
                font-size: 12px;
                font-style: normal;
                font-weight: 400;
                line-height: 20px;
              }
            }
          }
          .super-brain-map-list {
            display: grid;
            grid-template-columns: repeat(3, 1fr);
            grid-gap: 10px;
            margin-top: 10px;
            .super-brain-map-item {
              padding: 16px;
              display: flex;
              gap: 12px;
              border-radius: 8px;
              border: 1px solid var(---N4, #dfe2e6);
              &:hover {
                border-color: var(---P6, #02b96b);
                cursor: pointer;
              }
              img {
                width: 24px;
                height: 24px;
                aspect-ratio: 1/1;
                border-radius: 50%;
              }
              .super-brain-map-item-content {
                display: flex;
                flex-direction: column;
                .super-brain-map-item-title {
                  color: var(---N9, var(---N9, #1e2226));
                  font-size: 12px;
                  font-style: normal;
                  font-weight: 400;
                  line-height: 20px;
                }
                .super-brain-map-item-text {
                  color: var(---N6, var(---N6, #8a9099));
                  font-size: 12px;
                  font-style: normal;
                  font-weight: 400;
                  line-height: 20px;
                }
              }
            }
          }
        }
        .digital-tool-list {
          padding: 16px;
          display: flex;
          flex-direction: column;
          gap: 4px;
          border-radius: 8px;
          background: var(---N0, #fff);
          height: 360px;
          margin-bottom: 16px;
          :deep(.el-tabs__header) {
            justify-content: center;
            margin-bottom: 20px;
          }
          .digital-tool-list-header {
            display: flex;
            flex-direction: column;
            align-items: center;
            gap: 2px;
            .digital-tool-list-title {
              color: var(---N9, var(---N9, #1e2226));
              font-size: 16px;
              font-style: normal;
              font-weight: 600;
              line-height: 24px;
            }
            .digital-tool-list-text {
              color: var(---N6, var(---N6, #8a9099));
              font-size: 12px;
              font-style: normal;
              font-weight: 400;
              line-height: 20px;
            }
          }
          .digital-tool-list-item {
            display: flex;
            gap: 20px;
            .digital-tool-list-item-image {
              border-radius: 8px;
              // border: 1px solid var(---N3, #e9ecf0);
              width: 400px;
              height: 220px;
              // object-fit: cover;
              // height: 100%;
              // flex: 1;
              :deep(.el-image) {
                width: 100% !important;
                height: 100% !important;
                img {
                  width: 100%;
                  height: 100%;
                  // object-fit: cover;
                  object-fit: contain !important;
                  image-rendering: -webkit-optimize-contrast; // 针对 Webkit 浏览器（如 Chrome）提高对比度和清晰度
                  backface-visibility: hidden; // 防止渲染时的细微抖动或模糊
                }
              }
            }
            .digital-tool-list-item-content {
              display: flex;
              flex-direction: column;
              gap: 12px;
              flex: 1;
              .digital-tool-list-item-title {
                color: var(---N9, var(---N9, #1e2226));
                font-size: 14px;
                font-style: normal;
                font-weight: 600;
                line-height: 22px;
              }
              .digital-tool-list-item-text {
                display: flex;
                flex-direction: column;
                gap: 4px;
                .digital-tool-list-item-text-title {
                  color: var(---N9, var(---N9, #1e2226));
                  font-size: 12px;
                  font-style: normal;
                  font-weight: 400;
                  line-height: 20px;
                }
                .digital-tool-list-item-text-description {
                  color: var(---N6, var(---N6, #8a9099));
                  font-size: 12px;
                  font-style: normal;
                  font-weight: 400;
                  line-height: 20px;
                }
              }
            }
          }
        }
        .news-list {
          padding: 16px;
          display: flex;
          flex-direction: column;
          gap: 12px;
          border-radius: 8px;
          background: var(---N0, #fff);
          &.lu-te-news-content {
            height: 232px;
          }
          .news-skeleton-item {
            height: 50px;
            margin-bottom: 8px;
            display: flex;
            align-items: flex-start;
            gap: 8px;
            .news-skeleton-content {
              display: flex;
              flex-direction: column;
              flex: 1;
              gap: 8px;
            }
          }
          .news-list-header {
            display: flex;
            justify-content: space-between;
            align-items: center;
            .news-list-title {
              color: var(---N9, var(---N9, #1e2226));
              font-size: 12px;
              font-style: normal;
              font-weight: 600;
              line-height: 20px;
              display: flex;
              align-items: center;
              &::before {
                content: '';
                display: inline-block;
                width: 3px;
                height: 16px;
                background-color: var(---P6, var(---P6, #02b96b));
                border-radius: 2px;
                margin-right: 8px;
              }
            }
            .news-list-text {
              color: var(---N6, var(---N6, #8a9099));
              font-size: 12px;
              font-style: normal;
              font-weight: 400;
              line-height: 20px;
              &:hover {
                color: var(---P6, var(---P6, #02b96b));
                cursor: pointer;
              }
              &.no-pointer {
                color: var(---N6, var(---N6, #8a9099));
                cursor: auto;
              }
            }
            &.lu-smart {
              flex-direction: column;
              align-items: flex-start;
            }
          }
          .news-list-content {
            display: flex;
            flex-direction: column;
            gap: 8px;
            position: relative;
            height: calc(100% - 36px);
            overflow: auto;
            scrollbar-width: none;
            .system-skeleton-item {
              display: flex;
              justify-content: space-between;
              align-items: center;
              height: 29px;
            }
            .send-icon {
              position: absolute;
              right: 8px;
              bottom: 8px;
              cursor: pointer;
              width: 24px;
              height: 24px;
              z-index: 2;
              transition: opacity 0.2s;
              background-color: #1e2226;
              border-radius: 50%;
              color: #fff;
              display: flex;
              align-items: center;
              justify-content: center;
            }
            .news-list-item {
              display: flex;
              gap: 8px;
              align-items: flex-start;
              padding: 4px 0;
              .news-list-item-icon {
                width: 16px;
                height: 16px;
                line-height: 20px;
                margin-top: 2px;
              }
              .news-list-item-content {
                display: flex;
                flex-direction: column;
                width: calc(100% - 24px);
                .news-list-item-title {
                  color: var(---N9, var(---N9, #1e2226));
                  font-size: 12px;
                  font-style: normal;
                  font-weight: 400;
                  line-height: 20px;
                  width: 100%;
                  overflow: hidden;
                  text-overflow: ellipsis;
                  white-space: nowrap;
                  &.cursor-pointer:hover {
                    cursor: pointer;
                    color: var(---P6, var(---P6, #02b96b));
                  }
                  // &.clicked:hover {
                  //   cursor: pointer;
                  //   color: var(---P6, var(---P6, #02b96b));
                  // }
                }
              }
              .news-list-item-text {
                color: #8a9099;
                font-size: 12px;
                font-style: normal;
                font-weight: 400;
                line-height: 20px;
              }   
            }
            .border-bottom {
              border-bottom: 1px solid var(---N3, #e9ecf0);
            }
          }
          &.lu-smart-content {
            height: 185px;
          }
          &.system-update-content {
            .news-list-item-content {
              width: calc(100% - 100px) !important;
            }
          }
          &.industry-news-content {
            flex: 1;
            display: flex;
            flex-direction: column;
            min-height: 0;
            /* 动态计算最大高度，由 calculateIndustryNewsMaxHeight() 方法设置 */
            /* 基于左侧高度 - 其他元素高度，保证右列不超过左列 */
            height: var(--industry-news-max-height);
            overflow: hidden;

            .news-list-content {
              flex: 1;
              min-height: 0;
              overflow: auto;
            }
            .icon-Root-tygongnengcanshufenxi {
              color: var(---N6, #8a9099);
              margin-top: 2px;
            }
            .news-list-item-summary {
              padding: 8px;
              border-radius: 8px;
              background: var(---N2, #f0f2f5);
              color: var(---N8, #666);
              font-size: 12px;
              font-style: normal;
              font-weight: 400;
              line-height: 20px;
            }
          }
        }
        .product-operation {
          padding: 12px 16px;
          border-radius: 8px;
          background: var(---N0, #fff);
          display: flex;
          align-items: center;
          gap: 8px;
          border: 1px solid transparent;
          margin-bottom: 16px;
          &:hover {
            border: 1px solid var(---P6, var(---P6, #02b96b));
            cursor: pointer;
          }
          .product-operation-icon {
            width: 24px;
            height: 24px;
          }
          .product-operation-content {
            display: flex;
            flex-direction: column;
            .product-operation-title {
              color: var(---N9, var(---N9, #1e2226));
              font-size: 12px;
              font-style: normal;
              font-weight: 400;
              line-height: 20px;
            }
            .product-operation-text {
              color: var(---N5, var(---N5, #b6babf));
              font-size: 12px;
              font-style: normal;
              font-weight: 400;
              line-height: 20px;
            }
          }
        }
      }
    }
  }

  // 媒体查询
  @media screen and (max-width: 1536px) {
    .home-container,
    .userinfo {
      width: 1200px !important;
    }
  }

  @media screen and (max-width: 1280px) {
    .home-container,
    .userinfo {
      width: 1200px !important;
    }

    .select-page > .content .home-container .world-time {
      gap: 12px !important;
    }
  }
</style>
