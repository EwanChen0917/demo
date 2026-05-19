<template>
  <div class="data-board-page">
    <div class="sticky-header">
      <el-tabs v-model="search.classification" tab-position="top">
        <el-tab-pane v-for="item in tabList" :key="item.classification" :name="item.code">
          <template #label>
            {{ item.classification }}
          </template>
        </el-tab-pane>
      </el-tabs>
      <div class="filter-section">
        <div v-if="isCustomerTab" class="filters-wrapper">
          <el-date-picker
            v-model="time"
            type="daterange"
            range-separator="-"
            start-placeholder="创建时间"
            end-placeholder="创建时间"
            format="YYYY-MM-DD"
            value-format="YYYY-MM-DD"
            :clearable="false"
            :editable="false"
            @change="handleTimeChange"
            style="width: 250px"
          />
        </div>
        <div v-else class="filters-wrapper">
          <el-date-picker
            v-model="time"
            type="daterange"
            range-separator="-"
            start-placeholder="创建时间"
            end-placeholder="创建时间"
            format="YYYY-MM-DD"
            value-format="YYYY-MM-DD"
            :clearable="false"
            :editable="false"
            @change="handleTimeChange"
            style="width: 250px"
          />
          <el-select
            v-if="search.classification === '社媒'"
            v-model="search.source"
            placeholder="来源"
            clearable
            style="width: 140px"
          >
            <el-option
              v-for="item in sourceOptions"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            />
          </el-select>
          <el-select
            v-model="search.level"
            placeholder="舆情等级"
            clearable
            multiple
            collapse-tags
            :max-collapse-tags="1"
            style="width: 140px"
          >
            <el-option
              v-for="item in levelOptions"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            />
          </el-select>
          <LevelSelector
            v-model="search.category"
            :options="categoryOptions"
            :multiple="true"
            placeholder="问题类别"
            style="width: 160px"
          />
          <el-select
            v-model="search.sentiment"
            placeholder="情感"
            clearable
            multiple
            collapse-tags
            :max-collapse-tags="1"
            style="width: 140px"
          >
            <el-option
              v-for="item in sentimentOptions"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            />
          </el-select>
          <CategoryCascader
            v-model="search.product"
            placeholder="产品类别"
            :multiple="true"
            :emit-path="true"
            value-key="categoryName"
            style="width: 160px"
          />
          <el-select
            v-model="search.country"
            :options="countryOptions"
            multiple
            collapse-tags
            collapse-tags-tooltip
            :max-collapse-tags="1"
            placeholder="国家地区"
            clearable
            class="adaptive-multiple-select"
            style="width: 160px"
            filterable
          />
          <!--          <LtMultiSelect
            v-model="search.country"
            :options="countryOptions"
            label-prop="label"
            value-prop="value"
            collapse-tags
            collapse-tags-tooltip
            placeholder="国家地区"
            clearable
            class="adaptive-multiple-select"
            style="min-width: 140px"
            filterable
          />-->
          <el-button class="filter-reset" @click="handleReset">重置</el-button>
        </div>
        <div class="actions">
          <el-tooltip content="刷新" placement="top">
            <i class="Root-tyicon icon-Root-tyshuaxin" @click="initData"></i>
          </el-tooltip>
          <div class="gap"></div>
          <el-tooltip :content="isFullscreen ? '退出全屏' : '全屏'" placement="top">
            <i
              class="iconfont"
              :class="isFullscreen ? 'icon-shouqiquanping' : 'icon-quanping'"
              @click="toggleFullscreen()"
            ></i>
          </el-tooltip>
        </div>
      </div>
    </div>
    <el-scrollbar class="board-scroll">
      <div v-if="!isCustomerTab" class="dashboard">
        <!-- <div class="alert-banner">
          <i class="Root-tyicon icon-Root-tyzhuyi-mianxing alert-icon"></i>
          <span class="alert-text">
            实时紧急帖：过去8小时新增
            <span class="alert-highlight">{{ alertNewCount }}</span>
            个负面紧急帖，目前待处理紧急帖
            <span class="alert-highlight">{{ alertPendingCount }}</span>
            个
          </span>
        </div> -->

        <div class="dashboard-card monitor-card mb-16-px" v-loading="loading">
          <div class="dashboard-card-head monitor-card-head">
            <span class="dashboard-card-icon"></span>
            <span class="dashboard-card-title">工单实时监测</span>
          </div>
          <div class="monitor-cards">
            <div
              v-for="(card, index) in monitorCards"
              :key="card.key"
              :class="['monitor-card-item', { 'is-static': !card.link }]"
              @click="card.link ? handleMonitorLink(card.key) : null"
            >
              <div class="monitor-card-main">
                <div class="monitor-icon" :style="{ backgroundColor: card.iconBg }">
                  <i class="Root-tyicon" :class="card.iconFont"></i>
                </div>
                <div class="monitor-info">
                  <div class="monitor-title" :class="{ 'is-hoverable': card.key === 'pending' }">
                    <span>{{ card.title }}</span>
                    <span v-if="card.link" class="monitor-link">
                      <i class="iconfont icon-jiantouxiangyou"></i>
                    </span>
                    <el-tooltip :content="card.tooltip" placement="top">
                      <i class="Root-tyicon icon-Root-tyxinxizhuangtai-1"></i>
                    </el-tooltip>
                  </div>
                  <div class="monitor-value">
                    <span class="monitor-number">{{ card.value }}</span>
                    <span class="monitor-unit">{{ card.unit }}</span>
                  </div>
                </div>
              </div>
              <!-- <div class="monitor-footer" :class="{ 'is-danger': card.trendType === 'down' }">
                <span>{{ card.trendLabel }}</span>
                <span class="trend-arrow" :class="`is-${card.trendType}`"></span>
                <span class="trend-value">{{ card.trendValue }}</span>
              </div> -->
              <div v-if="index < monitorCards.length - 1" class="monitor-divider"></div>
            </div>
          </div>
        </div>

        <div class="dashboard-row mb-16-px">
          <ChartSwitch
            class="dashboard-panel chart-switch--pie-only"
            title="舆情等级分布"
            :data="levelData"
            :pie-only="true"
          />
          <ChartSwitch
            class="dashboard-panel chart-switch--pie-only"
            title="舆情来源"
            :data="sourceData"
            :pie-only="true"
          />
          <div class="dashboard-card dashboard-panel dashboard-panel--wide">
            <div class="dashboard-card-head">
              <span class="dashboard-card-icon"></span>
              <span class="dashboard-card-title">工单数量趋势</span>
            </div>
            <div class="dashboard-card-body">
              <div ref="urgentChart" class="chart urgent-chart"></div>
              <div v-if="nonData" class="no-data">暂无数据</div>
            </div>
          </div>
        </div>

        <div class="dashboard-card sentiment-card">
          <div class="dashboard-card-head">
            <span class="dashboard-card-icon"></span>
            <span class="dashboard-card-title">舆情数量</span>
          </div>
          <div class="sentiment-panels">
            <div
              v-for="panel in sentimentPanels"
              :key="panel.key"
              :class="['sentiment-panel', `is-${panel.key}`]"
            >
              <div class="sentiment-panel-head">
                <span class="sentiment-panel-title">
                  <span
                    v-if="panel.canDrill && panel.stack.length"
                    class="sentiment-back"
                    @click="handleDrillBack(panel.key)"
                  ></span>
                  <span>{{ panel.displayTitle }}</span>
                </span>
                <img
                  v-if="!panel.pieOnly"
                  class="sentiment-toggle"
                  :src="panel.view === 'pie' ? chartBarIcon : chartPieIcon"
                  alt=""
                  @click="toggleSentimentView(panel.key)"
                />
              </div>
              <div
                class="sentiment-chart-view"
                :class="{ 'is-pie': panel.view === 'pie', 'is-product': panel.key === 'product' }"
              >
                <div :ref="setChartRef(panel.key)" class="sentiment-chart"></div>
                <div v-if="panel.view === 'pie'" class="sentiment-pie-extra">
                  <div class="sentiment-pie-center">
                    <span class="sentiment-pie-label">总计</span>
                    <span class="sentiment-pie-value">{{ panel.total }}</span>
                  </div>
                  <div class="sentiment-pie-legend">
                    <div v-for="item in panel.pieList" :key="item.name" class="sentiment-pie-item">
                      <span
                        class="sentiment-pie-dot"
                        :style="{ backgroundColor: item.color }"
                      ></span>
                      <span class="sentiment-pie-name">{{ item.name }}</span>
                      <span class="sentiment-pie-percent">{{ item.percent }}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div v-else class="dashboard customer-dashboard">
        <div class="dashboard-card" v-loading="loading">
          <div class="dashboard-card-head">
            <span class="dashboard-card-icon"></span>
            <span class="dashboard-card-title">紧急工单实时监测</span>
          </div>
          <div class="dashboard-card-body">
            <div class="urgent-stats-section">
              <span class="section-icon">
                <i class="iconfont icon-Root-tyzhuyi-mianxing"></i>
              </span>
              <div v-if="customerStats.pendingCount">
                <span>目前待处理紧急工单</span>
                <span class="urgent-number">{{ customerStats.pendingCount }}</span>
                个
              </div>
              <div v-else>
                暂无高风险客服工单（识别为高风险且24小时内客服无法处理的工单，将在此上报）。
              </div>
            </div>

            <div class="state-cards">
              <div
                v-for="(card, index) in customerCardsList"
                :key="card.title"
                class="state-card"
                :class="{ 'has-background': index === 0 }"
                @click="index === 0 ? skipPublicSentiment() : null"
              >
                <div class="card-icon" :style="{ backgroundColor: card.iconBg }">
                  <i class="iconfont" :class="card.iconFont"></i>
                </div>
                <div class="card-content">
                  <div class="card-title">
                    {{ card.title }}
                    <el-tooltip :content="card.tooltip" placement="top">
                      <i class="iconfont icon-Root-tyxinxizhuangtai-1"></i>
                    </el-tooltip>
                  </div>
                  <div class="card-value">
                    <span class="card-number">{{ card.value }}</span>
                    <span class="card-unit">{{ card.unit }}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <section class="d-flex justify-content-between section">
          <div class="dashboard-card" style="flex: 1">
            <div class="dashboard-card-head">
              <span class="dashboard-card-icon"></span>
              <span class="dashboard-card-title">紧急工单趋势</span>
            </div>
            <div class="dashboard-card-body">
              <div ref="urgentChart" class="chart urgent-chart"></div>
              <div v-if="customerNoData" class="no-data">暂无数据</div>
            </div>
          </div>
          <div class="dashboard-card ai-motion-analysis">
            <div class="dashboard-card-head">
              <span class="dashboard-card-icon"></span>
              <span class="dashboard-card-title">客服问题分布</span>
            </div>
            <div class="dashboard-card-body">
              <RankList :data="customerTagCountList" :is-show-value="true">
                <template #img="{ item }">
                  <div class="tag-label">{{ item.name }}</div>
                </template>
              </RankList>
              <div class="empty-status" v-if="customerTagCountList.length === 0">
                <EmptyAnimation name="listEmpty" :width="128" :height="150" />
                暂无数据
              </div>
            </div>
          </div>
        </section>
      </div>
    </el-scrollbar>
  </div>
</template>

<script lang="ts" setup name="dataBoard">
  import * as echarts from 'echarts';
  import 'echarts-wordcloud';
  import { platformApi, statisticalApi } from '@/api';
  import { useFullScreen } from '@/views/publicSentiment/hooks';

  import dayjs from 'dayjs';
  import { cloneDeep, find, maxBy, orderBy, sumBy, uniq } from 'lodash-es';
  import { formatNumberObj } from '@/utils/formatNumberToUnit';

  import EmptyAnimation from '@/components/EmptyAnimation/index.vue';
  import {
    getCategoryDict,
    getProductDict,
  } from '@/views/publicSentiment/api';
  import {
    SENTIMENT_LEVEL_LABELS,
    SENTIMENT_TYPE_LABELS,
    CLASSIFICATION_LABELS,
  } from '@/views/publicSentiment/constants';
  import ChartSwitch from './components/ChartSwitch/index.vue';
  import LevelSelector from './components/LevelSelector/index.vue';
  import CategoryCascader from './components/CategoryCascader/index.vue';
  import { getTooltipBase } from './utils';
  import RankList from '../bi/components/RankList.vue';

  const chartBarIcon = new URL('./assets/svgs/icon-chart-bar.svg', import.meta.url).href;
  const chartPieIcon = new URL('./assets/svgs/icon-chart-pie.svg', import.meta.url).href;

  const { toggleFullscreen, isFullscreen } = useFullScreen();
  const tabList = [
    { code: '社媒', classification: '社媒/新闻' },
    { code: '客服', classification: '客服' },
  ];

  const levelOptions = Object.entries(SENTIMENT_LEVEL_LABELS).map(([key, label]) => ({
    label,
    value: key,
  }));
  const sentimentOptions = Object.entries(SENTIMENT_TYPE_LABELS).map(([key, label]) => ({
    label,
    value: key,
  }));
  const countryOptions = ref([]);
  const sourceOptions = Object.entries(CLASSIFICATION_LABELS).map(([key, label]) => ({
    label,
    value: key,
  }));

  const categoryOptions = ref([]);
  const productOptions = ref([]);

  const buildOptions = (list) =>
    (list || []).map((value) => ({
      label: value,
      value,
    }));
  const buildDictOptions = (list) =>
    (list || []).map((item) => ({
      label: item?.desc || item?.name || item?.label || item?.value || '',
      value: item?.value || item?.label || item?.desc || item?.name || '',
    }));

  const normalizeCategoryTree = (list: any[] = []) =>
    list.map((node) => ({
      ...node,
      label: node?.categoryName ?? node?.label ?? '',
      value: node?.categoryId ?? node?.value ?? '',
      children: node?.children ? normalizeCategoryTree(node.children) : [],
    }));

  const loadDicts = async () => {
    if (isCustomerTab.value) return;
    try {
      const [categories, products, dictRes] = await Promise.all([
        getCategoryDict({ classification: search.classification }),
        getProductDict({ classification: search.classification }),
        platformApi.platformDict({ dictCodes: ['opinion_country'] }),
      ]);
      categoryOptions.value = categories?.tagTreeList || [];
      productOptions.value = normalizeCategoryTree(products?.tagTreeList || []);
      countryOptions.value = buildDictOptions(dictRes?.dictMap?.opinion_country).filter(
        (item) => item.label && item.value
      );
    } catch (e) {
      console.error('加载字典失败', e);
    }
  };

  const charts: Record<string, echarts.ECharts | null> = {
    urgent: null,
  };
  const PRIORITY_KEYS = ['0', '1', '2', '3'];

  const handleTimeChange = (val) => {
    search.startTime = val[0];
    search.endTime = val[1];
  };
  const time = ref<string[]>([
    dayjs().subtract(6, 'day').format('YYYY-MM-DD'),
    dayjs().format('YYYY-MM-DD'),
  ]);

  const search = reactive<any>({
    classification: tabList[0].code,
    startTime: time.value[0],
    endTime: time.value[1],
    source: 'sns',
    level: [],
    category: [],
    sentiment: [],
    product: [],
    country: [],
  });
  const isCustomerTab = computed(() => search.classification === '客服');
  const resetTimeRange = () => [
    dayjs().subtract(6, 'day').format('YYYY-MM-DD'),
    dayjs().format('YYYY-MM-DD'),
  ];

  const handleReset = () => {
    const range = resetTimeRange();
    time.value = range;
    search.startTime = range[0];
    search.endTime = range[1];
    search.source = search.classification === '社媒' ? 'sns' : '';
    search.level = [];
    search.category = [];
    search.sentiment = [];
    search.product = [];
    search.country = [];
  };
  const stats = reactive({
    count: 0,
    pendingCount: 0,
    finishRate: 0,
    processTimelinessRate: 0,
  });
  const customerStats = reactive({
    count: 0,
    pendingCount: 0,
    pendingRate: 0,
  });
  const customerTagCountList = ref<{ name: string; value: number; percent: number }[]>([]);

  const getLeafValues = (value: any) => {
    if (!value) return [];
    if (typeof value === 'string') return [value];
    if (!Array.isArray(value)) return [];
    if (value.some((item) => Array.isArray(item))) {
      return value
        .map((item) => (Array.isArray(item) ? item[item.length - 1] : item))
        .filter(Boolean);
    }
    const last = value[value.length - 1];
    return last ? [last] : [];
  };

  const buildProductLevelPayload = (value) => {
    const paths = Array.isArray(value)
      ? Array.isArray(value[0])
        ? value
        : value.length
        ? [value]
        : []
      : [];
    const levels = [[], [], [], [], []];
    paths.forEach((path) => {
      for (let index = 0; index < levels.length; index += 1) {
        if (path?.[index]) {
          levels[index].push(path[index]);
        }
      }
    });
    return levels.map((list) => uniq(list));
  };

  const resolveClassification = () => {
    if (search.classification === '客服') return '客服';
    if (search.source) {
      return CLASSIFICATION_LABELS[search.source] || search.source;
    }
    return undefined;
  };

  const buildMonitoringQuery = () => {
    const prTagList = getLeafValues(search.category);
    const countryList = Array.isArray(search.country)
      ? search.country.filter(Boolean)
      : search.country
      ? [search.country]
      : [];
    const [productLevel1, productLevel2, productLevel3, productLevel4, productLevel5] =
      buildProductLevelPayload(search.product);
    const levelList = (search.level || [])
      .map((value) => Number(value))
      .filter((level) => Number.isFinite(level));
    const query: Record<string, any> = {
      classification: resolveClassification(),
      createTimeStart: search.startTime || undefined,
      createTimeEnd: search.endTime || undefined,
    };
    if (!query.classification) {
      delete query.classification;
    }
    if (levelList.length) {
      query.levelList = levelList;
    }
    if (search.sentiment?.length) {
      query.sentimentList = search.sentiment;
    }
    if (prTagList.length) {
      query.prTagList = prTagList;
    }
    if (countryList.length) {
      query.countryList = countryList;
    }
    query.productLevel1 = productLevel1;
    query.productLevel2 = productLevel2;
    query.productLevel3 = productLevel3;
    query.productLevel4 = productLevel4;
    query.productLevel5 = productLevel5;
    return query;
  };

  const fetchDrillDistribution = async (key: string, name: string) => {
    const query = buildMonitoringQuery();
    const state = drillStateMap[key];
    const nextLevel = (state?.stack.length || 0) + 2;
    if (key === 'category') {
      const response =
        await statisticalApi.luteosAiAnalyzeOpinionMonitoringQueryOpinionPrTagMonitor({
          ...query,
          prTag: name,
          prTagLevel: nextLevel,
        });
      const list = response.prTagList || [];
      return list.map((item) => ({
        name: item.prTag || '其他',
        value: item.num ?? 0,
        rate: item.rate,
      }));
    }
    const response =
      await statisticalApi.luteosAiAnalyzeOpinionMonitoringQueryOpinionSpuCateMonitor({
        ...query,
        productTag: name,
        productTagLevel: nextLevel,
      });
    const list = response.spuCateList || [];
    return list.map((item) => ({
      name: item.spuCate || '其他',
      value: item.num ?? 0,
      rate: item.rate,
    }));
  };

  const lastUpdatedTime = computed(() => dayjs().format('YYYY-M-D HH:mm'));
  const alertNewCount = computed(() => {
    if (!trendList.value.length) return 0;
    return trendList.value[trendList.value.length - 1]?.count || 0;
  });
  const alertPendingCount = computed(() => stats.pendingCount || 0);
  const monitorCards = computed(() => [
    {
      key: 'pending',
      title: '待处理工单',
      value: stats.pendingCount,
      unit: '个',
      iconFont: 'icon-Root-tydingdan-mianxing',
      iconBg: '#ff9f22',
      tooltip: '周期内状态为 open 的工单数',
      trendLabel: '过去8小时',
      trendValue: Math.max(alertNewCount.value, 0),
      trendType: 'down',
      link: true,
    },
    {
      key: 'total',
      title: '工单数量',
      value: stats.count,
      unit: '个',
      iconFont: 'icon-Root-tyjingyingguanli-mianxing',
      iconBg: '#258dff',
      tooltip: '总工单数量',
      trendLabel: '周环比',
      trendValue: 2,
      trendType: 'up',
      link: true,
    },
    {
      key: 'handleRate',
      title: '工单处理率',
      value: stats.finishRate,
      unit: '%',
      iconFont: 'icon-Root-tywenjuanguanli-mianxing',
      iconBg: '#0cc1e2',
      tooltip: '非 open 状态工单数/工单总数',
      trendLabel: '周环比',
      trendValue: '2.12%',
      trendType: 'up',
    },
    {
      key: 'timelyRate',
      title: '处理及时率',
      value: stats.processTimelinessRate,
      unit: '%',
      iconFont: 'icon-Root-tybingtu',
      iconBg: '#02b96b',
      tooltip: '及时处理工单/(解决+无需解决)工单总数',
      trendLabel: '周环比',
      trendValue: '2.12%',
      trendType: 'up',
    },
  ]);
  const customerCardsList = computed(() => [
    {
      title: '待处理紧急工单',
      value: customerStats.pendingCount,
      unit: '个',
      iconFont: 'icon-Root-tydingdan-mianxing',
      iconBg: '#FF9F22',
      tooltip: '周期内状态为open的工单数',
    },
    {
      title: '紧急工单数量',
      value: customerStats.count,
      unit: '个',
      iconFont: 'icon-Root-tyjingyingguanli-mianxing',
      iconBg: '#258DFF',
      tooltip: '周期内所有紧急工单数',
    },
    {
      title: '紧急工单处理率',
      value: customerStats.pendingRate,
      unit: '%',
      iconFont: 'icon-Root-tywenjuanguanli-mianxing',
      iconBg: '#0CC1E2',
      tooltip: '非open状态工单数/工单总数',
    },
  ]);

  const urgentChart = ref<HTMLDivElement>();

  const initCharts = () => {
    if (urgentChart.value) {
      charts.urgent = echarts.init(urgentChart.value);
    }
  };
  const trendList = ref<{ trendDate: string; count: number }[]>([]);
  const trendDates = ref<string[]>([]);
  const priorityTrendSeries = ref<Record<string, number[]>>({
    '0': [],
    '1': [],
    '2': [],
    '3': [],
  });
  const nonData = ref<boolean>(false);
  const customerTrendList = ref<{ trendDate?: string; count?: number }[]>([]);
  const customerNoData = ref<boolean>(false);

  const levelData = ref<any[]>([]);
  const sourceData = ref<any[]>([]);
  const countryData = ref<any[]>([]);
  const platformData = ref<any[]>([]);
  type DrillItem = {
    name: string;
    value: number;
    rate?: string | number;
    children?: DrillItem[];
  };
  type DrillStackItem = { name: string; data: DrillItem[] };
  type DrillState = { data: DrillItem[]; stack: DrillStackItem[] };
  const drillStateMap = reactive<Record<string, DrillState>>({
    category: { data: [], stack: [] },
    product: { data: [], stack: [] },
  });
  const sentimentViewMap = reactive<Record<string, 'bar' | 'pie'>>({
    category: 'bar',
    product: 'bar',
    country: 'pie',
    sourcePlatform: 'pie',
  });
  const pieColors = [
    '#258dff',
    '#0cc1e2',
    '#02b96b',
    '#ffbf1f',
    '#ff9f22',
    '#ff663e',
    '#f53f3f',
    '#ff4eaf',
    '#a55bf5',
    '#e7e9e8',
  ];
  const buildSentimentList = (list: { name: string; value: number }[]) => {
    if (!list.length) return [];
    const maxValue = maxBy(list, (item) => item.value)?.value || 0;
    return list.map((item) => ({
      ...item,
      ratio: maxValue ? Math.round((item.value / maxValue) * 100) : 0,
    }));
  };
  const buildPieList = (list: { name: string; value: number; rate?: string | number }[]) => {
    if (!list.length) return [];
    const sorted = orderBy(list, ['value'], ['desc']);
    return sorted.map((item, index) => ({
      ...item,
      percent: item.rate !== undefined && item.rate !== null ? `${item.rate}%` : undefined,
      color: pieColors[index % pieColors.length],
    }));
  };
  const sentimentDataMap = computed<Record<string, DrillItem[]>>(() => ({
    category: drillStateMap.category.data,
    product: drillStateMap.product.data,
    country: countryData.value,
    sourcePlatform: platformData.value,
  }));
  const sentimentPanels = computed(() => {
    const categoryStack = drillStateMap.category.stack;
    const productStack = drillStateMap.product.stack;
    return [
      {
        key: 'category',
        title: '问题分布',
        displayTitle: categoryStack.length
          ? categoryStack[categoryStack.length - 1].name
          : '问题分布',
        stack: categoryStack,
        canDrill: true,
        view: sentimentViewMap.category,
        list: buildSentimentList(sentimentDataMap.value.category),
        pieList: buildPieList(sentimentDataMap.value.category),
        total: sumBy(sentimentDataMap.value.category, (item) => item.value || 0),
      },
      {
        key: 'product',
        title: '产品分布',
        displayTitle: productStack.length ? productStack[productStack.length - 1].name : '产品分布',
        stack: productStack,
        canDrill: true,
        view: sentimentViewMap.product,
        list: buildSentimentList(sentimentDataMap.value.product),
        pieList: buildPieList(sentimentDataMap.value.product),
        total: sumBy(sentimentDataMap.value.product, (item) => item.value || 0),
      },
      {
        key: 'country',
        title: '国家分布',
        displayTitle: '国家分布',
        stack: [],
        canDrill: false,
        view: sentimentViewMap.country,
        list: buildSentimentList(sentimentDataMap.value.country),
        pieList: buildPieList(sentimentDataMap.value.country),
        total: sumBy(sentimentDataMap.value.country, (item) => item.value || 0),
      },
      {
        key: 'sourcePlatform',
        title: '来源平台',
        displayTitle: '来源平台',
        stack: [],
        canDrill: false,
        view: sentimentViewMap.sourcePlatform,
        list: buildSentimentList(sentimentDataMap.value.sourcePlatform),
        pieList: buildPieList(sentimentDataMap.value.sourcePlatform),
        total: sumBy(sentimentDataMap.value.sourcePlatform, (item) => item.value || 0),
      },
    ];
  });

  const buildBarOption = (
    list: { name: string; value: number; rate?: string | number }[],
    title = ''
  ) => {
    const sorted = orderBy(list, ['value'], ['desc']);
    const rateMap = new Map(sorted.map((item) => [item.name, item.rate]));
    return {
      tooltip: {
        trigger: 'axis',
        axisPointer: {
          type: 'shadow',
          shadowStyle: {
            color: 'transparent',
          },
        },
        ...getTooltipBase(),
        formatter: (params: any) => {
          const item = params[0];
          const tooltipTitle = title || '舆情数量';
          const rate = rateMap.get(item.name);
          const rateText = rate !== undefined && rate !== null ? `${rate}%` : '';
          return `<div style="display:flex;flex-direction:column;gap:4px;">
              <div style="font-size:12px;line-height:20px;color:#666;">${tooltipTitle}</div>
              <div style="display:flex;align-items:center;gap:6px;">
                <span style="width:8px;height:8px;border-radius:50%;background:${
                  item.color
                };display:inline-block;"></span>
                <span style="font-size:12px;line-height:20px;color:#666;">${item.name}</span>
                <span style="font-size:12px;line-height:20px;color:#666;">：</span>
              <span style="font-size:12px;line-height:20px;color:#1f1f1f;font-family:DIN, sans-serif;font-weight:500;">${
                item.value
              }</span>
                ${
                  rateText
                    ? `<span style="font-size:12px;line-height:20px;color:#999;font-family:DIN, sans-serif;font-weight:500;">${rateText}</span>`
                    : ''
                }
              </div>
            </div>`;
        },
      },
      grid: {
        left: 80,
        right: 48,
        top: 32,
        bottom: 16,
        containLabel: false,
      },
      xAxis: {
        type: 'value',
        position: 'top',
        axisLine: { show: false },
        axisTick: { show: false },
        splitLine: {
          show: true,
          lineStyle: {
            color: '#eff0f0',
            type: 'solid',
          },
        },
        axisLabel: {
          color: '#8a8f8d',
          fontSize: 12,
        },
      },
      yAxis: {
        type: 'category',
        data: sorted.map((item) => item.name).reverse(),
        axisLine: {
          show: true,
          lineStyle: { color: '#eff0f0' },
        },
        axisTick: { show: false },
        axisLabel: {
          color: '#585a5a',
          fontSize: 12,
          formatter: (value: string) => {
            return value.length > 8 ? `${value.slice(0, 7)}...` : value;
          },
        },
      },
      series: [
        {
          name: title,
          type: 'bar',
          data: sorted.map((item) => item.value).reverse(),
          barWidth: 16,
          itemStyle: {
            color: '#02b96b',
            borderRadius: 0,
          },
          emphasis: {
            itemStyle: {
              color: '#02b96b',
            },
          },
          label: {
            show: true,
            position: 'right',
            color: '#262626',
            fontSize: 12,
            fontFamily: 'DIN',
            offset: [4, 0],
          },
        },
      ],
    };
  };

  const buildPieOption = (
    list: {
      name: string;
      value: number;
      color: string;
      percent?: string;
      rate?: string | number;
    }[],
    title = '',
    size: { radius: [string, string]; center: [string, string] } = {
      radius: ['50%', '72%'],
      center: ['50%', '42%'],
    }
  ) => {
    return {
      tooltip: {
        trigger: 'item',
        ...getTooltipBase(),
        formatter: (params: any) => {
          const tooltipTitle = title || params.seriesName || '命中标签';
          const percent =
            params.data?.percent ??
            (params.data?.rate !== undefined && params.data?.rate !== null
              ? `${params.data.rate}%`
              : '');
          return `<div style="display:flex;flex-direction:column;gap:4px;">
            <div style="font-size:12px;line-height:20px;color:#666;">${tooltipTitle}</div>
            <div style="display:flex;align-items:center;gap:6px;">
              <span style="width:8px;height:8px;border-radius:50%;background:${
                params.color
              };display:inline-block;"></span>
              <span style="font-size:12px;line-height:20px;color:#666;">${params.name}</span>
              <span style="font-size:12px;line-height:20px;color:#666;">：</span>
              <span style="font-size:12px;line-height:20px;color:#1f1f1f;font-family:DIN, sans-serif;font-weight:500;">${
                params.value
              }</span>
              ${
                percent
                  ? `<span style="font-size:12px;line-height:20px;color:#999;font-family:DIN, sans-serif;font-weight:500;">${percent}</span>`
                  : ''
              }
            </div>
          </div>`;
        },
      },
      color: list.map((item) => item.color),
      series: [
        {
          name: title || '命中标签',
          type: 'pie',
          radius: size.radius,
          center: size.center,
          avoidLabelOverlap: false,
          itemStyle: {
            borderRadius: 0,
            borderColor: '#fff',
            borderWidth: 2,
          },
          label: {
            show: false,
          },
          labelLine: {
            show: false,
          },
          data: list.map((item) => ({
            name: item.name,
            value: item.value,
            percent: item.percent,
            rate: item.rate,
            itemStyle: {
              color: item.color,
            },
          })),
        },
      ],
    };
  };

  const sentimentChartRefs = ref<Record<string, HTMLDivElement | null>>({});
  const sentimentChartInstances = new Map<string, echarts.ECharts>();

  const setChartRef = (key: string) => (el: HTMLDivElement | null) => {
    if (!el) {
      const chart = sentimentChartInstances.get(key);
      if (chart) {
        chart.dispose();
        sentimentChartInstances.delete(key);
      }
    }
    sentimentChartRefs.value[key] = el;
  };

  const getOrInitSentimentChart = (key: string, el: HTMLDivElement) => {
    const chart = sentimentChartInstances.get(key);
    if (chart) {
      const isDisposed =
        typeof (chart as any).isDisposed === 'function' && (chart as any).isDisposed();
      if (isDisposed) {
        sentimentChartInstances.delete(key);
      } else if (typeof chart.getDom === 'function' && chart.getDom() !== el) {
        chart.dispose();
        sentimentChartInstances.delete(key);
      }
    }
    return sentimentChartInstances.get(key) || echarts.init(el);
  };

  const handleChartClick = (key: string, name: string) => {
    const state = drillStateMap[key];
    if (!state?.data?.length) return;
    const target = find(state.data, (item) => item.name === name);
    if (target) {
      handleDrill(key, target);
    }
  };

  const updateSentimentChart = (key: string) => {
    const el = sentimentChartRefs.value[key];
    if (!el) return;
    const view = sentimentViewMap[key];
    const data = sentimentDataMap.value[key] || [];
    const panel = sentimentPanels.value.find((item) => item.key === key);
    const tooltipTitle = panel?.displayTitle || panel?.title || '舆情数量';

    const chart = getOrInitSentimentChart(key, el);
    const pieSize = { radius: ['60%', '80%'], center: ['50%', '50%'] } as {
      radius: [string, string];
      center: [string, string];
    };
    const option =
      view === 'pie'
        ? buildPieOption(buildPieList(data), tooltipTitle, pieSize)
        : buildBarOption(data, tooltipTitle);

    chart.setOption(option, true);
    const scheduleResize = () => {
      chart.resize();
      requestAnimationFrame(() => chart.resize());
    };
    scheduleResize();
    nextTick(scheduleResize);
    chart.off('click');
    if (drillStateMap[key]) {
      chart.on('click', (params: any) => handleChartClick(key, params?.name));
    }
    sentimentChartInstances.set(key, chart);
  };

  const updateAllSentimentCharts = () => {
    Object.keys(sentimentViewMap).forEach((key) => updateSentimentChart(key));
  };

  const toggleSentimentView = (key: string) => {
    sentimentViewMap[key] = sentimentViewMap[key] === 'bar' ? 'pie' : 'bar';
    nextTick(() => {
      updateSentimentChart(key);
    });
  };

  const handleResize = () => {
    charts.urgent?.resize();
    sentimentChartInstances.forEach((chart) => chart.resize());
  };

  const handleDrill = async (key: string, item: DrillItem) => {
    const state = drillStateMap[key];
    if (!state || item?.name === '其他') return;
    const list = await fetchDrillDistribution(key, item.name);
    if (!list?.length) return;
    state.stack.push({ name: item.name, data: state.data });
    state.data = list;
    nextTick(() => updateSentimentChart(key));
  };

  const handleDrillBack = (key: string) => {
    const state = drillStateMap[key];
    if (!state?.stack?.length) return;
    const last = state.stack.pop();
    if (last) {
      state.data = last.data;
    }
    nextTick(() => updateSentimentChart(key));
  };

  const updateCharts = () => {
    const series = PRIORITY_KEYS.map((priority) => ({
      name: `P${priority}`,
      data: priorityTrendSeries.value[priority] || [],
    }));
    charts.urgent?.setOption({
      tooltip: {
        ...getTooltipBase(),
        trigger: 'axis',
        axisPointer: {
          type: 'line',
          lineStyle: {
            color: '#e7e9e8',
          },
        },
        formatter(params: any) {
          const { name } = params[0] || {};
          const title = name || '工单数量';
          const content = params
            .map((p) => {
              const value = formatNumberObj(p.value).toString();
              return `<div style="display:flex;align-items:center;gap:6px;">
                  <span style="width:8px;height:8px;border-radius:50%;background:${p.color};display:inline-block;"></span>
                  <span style="font-size:12px;line-height:20px;color:#666;">${p.seriesName}</span>
                  <span style="font-size:12px;line-height:20px;color:#666;">：</span>
                  <span style="font-size:12px;line-height:20px;color:#1f1f1f;font-family:DIN, sans-serif;font-weight:500;">${value}</span>
                </div>`;
            })
            .join('');
          return `<div style="display:flex;flex-direction:column;gap:4px;">
            <div style="font-size:12px;line-height:20px;color:#666;">${title}</div>
            ${content}
          </div>`;
        },
      },
      legend: {
        show: true,
        right: 0,
        top: 0,
        textStyle: {
          fontSize: 12,
          color: '#8a8f8d',
        },
        itemWidth: 18,
        itemHeight: 10,
        itemGap: 16,
      },
      grid: {
        top: 32,
        left: 0,
        right: 0,
        bottom: 0,
        height: 'auto',
        containLabel: true,
      },
      color: ['#f53f3f', '#ff9f22', '#02b96b', '#258dff'],
      yAxis: [
        {
          type: 'value',
          name: '帖子数量',
          min: 0,
          max: nonData.value ? 5 : undefined,
          axisLabel: {
            formatter(value) {
              const { value: amount, unit } = formatNumberObj(value);
              return `${amount} ${unit}`;
            },
            color: '#999999',
            fontSize: 12,
          },
          nameTextStyle: {
            fontSize: 12,
            fontWeight: 400,
            color: '#8a8f8d',
            align: 'left',
            padding: [0, 0, 0, -18],
          },
          axisLine: {
            show: false,
            lineStyle: {
              color: '#e7e9e8',
            },
          },
          splitLine: {
            show: true,
            lineStyle: {
              color: '#ededed',
              type: 'dashed',
            },
          },
        },
      ],
      xAxis: {
        type: 'category',
        data: trendDates.value,
        axisLabel: {
          show: true,
          color: '#999999',
          fontSize: 12,
          fontFamily: 'PingFang SC',
        },
        axisLine: {
          show: true,
          onZero: false,
          lineStyle: {
            color: '#e7e9e8',
          },
        },
        axisTick: {
          show: true,
          alignWithLabel: true,
          lineStyle: {
            color: '#ededed',
          },
        },
        splitLine: {
          show: false,
        },
      },
      series: series.map((item) => ({
        name: item.name,
        type: 'line',
        data: item.data,
        symbol: 'circle',
        symbolSize: 7,
        showSymbol: false,
        itemStyle: { borderColor: '#fff', borderWidth: 1 },
        lineStyle: {
          width: 2,
        },
      })),
    });
  };

  const updateCustomerCharts = () => {
    charts.urgent?.setOption({
      tooltip: {
        trigger: 'axis',
        axisPointer: {
          type: 'shadow',
        },
        formatter(params: any) {
          const { name } = params[0] || {};
          const content = params.reduce((html, p) => {
            const value = formatNumberObj(p.value).toString();
            return `${html}<div style="display: flex; align-items: center;">
          <div style="background: ${p.color}; border-radius: 50%; width: 6px; height: 6px; margin-right: 8px;"></div>
          <div style="color: #666; font-size: 12px">${p.seriesName}</div>
          </div>
          <div style="font-family: DIN; color: #1f1f1f; text-align: right">${value}</div>`;
          }, '');
          return `
          <div style="margin-bottom: 6px; font-size: 12px; color: #666;">${name}</div>
        <div style="display: grid; grid-template-columns: repeat(2, auto); column-gap: 10px; row-gap: 3px">${content}</div>
        `;
        },
      },
      legend: {
        show: false,
        bottom: 0,
        textStyle: {
          fontSize: 12,
          color: '#999',
        },
        itemWidth: 18,
        itemHeight: 10,
        itemGap: 26,
      },
      grid: {
        top: 30,
        left: 10,
        right: 10,
        bottom: 6,
        height: 'auto',
        containLabel: true,
      },
      color: ['#F53F3F'],
      yAxis: [
        {
          type: 'value',
          name: '工单数量',
          min: 0,
          max: customerNoData.value ? 5 : undefined,
          axisLabel: {
            formatter(value) {
              const { value: amount, unit } = formatNumberObj(value);
              return `${amount} ${unit}`;
            },
          },
          nameTextStyle: {
            fontSize: 12,
            fontWeight: 400,
            color: '#999',
            align: 'center',
          },
          axisLine: {
            show: false,
            lineStyle: {
              color: '#999',
            },
          },
          splitLine: {
            show: true,
            lineStyle: {
              color: '#E6E6E6',
              type: 'dashed',
            },
          },
        },
      ],
      xAxis: {
        type: 'category',
        data: customerTrendList.value?.map((item) => item.trendDate) || [],
        axisLabel: {
          show: true,
          color: '#999',
          fontSize: 12,
          fontFamily: 'PingFang SC',
        },
        axisLine: {
          show: true,
          onZero: false,
          lineStyle: {
            color: '#E6E6E6',
          },
        },
        axisTick: {
          show: true,
          alignWithLabel: true,
          lineStyle: {
            color: '#EDEDED',
          },
        },
        splitLine: {
          show: false,
        },
      },
      series: {
        id: '1',
        name: '紧急工单数',
        type: 'line',
        data: customerTrendList.value.map((item) => item.count),
        symbol: 'circle',
        symbolSize: 7,
        showSymbol: false,
        barWidth: 21,
        itemStyle: { borderColor: '#fff', borderWidth: 1 },
        areaStyle: {
          color: {
            type: 'linear',
            x: 0,
            y: 0,
            x2: 0,
            y2: 1,
            colorStops: [
              {
                offset: 0.1864,
                color: 'rgba(245, 63, 63, 0.20)',
              },
              {
                offset: 0.8361,
                color: 'rgba(245, 63, 63, 0.00)',
              },
            ],
          },
        },
      },
    });
  };
  const loading = ref<boolean>(false);
  const fillMockTrendData = () => {
    const dates: string[] = [];
    const aggregated: { trendDate: string; count: number }[] = [];
    const newSeries = PRIORITY_KEYS.reduce((acc, key) => {
      acc[key] = [];
      return acc;
    }, {} as Record<string, number[]>);
    for (let i = 6; i >= 0; i--) {
      const date = dayjs().subtract(i, 'day').format('MM-DD');
      dates.push(date);
      const values = PRIORITY_KEYS.map(() => Math.floor(Math.random() * 30));
      PRIORITY_KEYS.forEach((priority, index) => {
        newSeries[priority].push(values[index]);
      });
      const total = values.reduce((sum, value) => sum + value, 0);
      aggregated.push({ trendDate: date, count: total });
    }
    trendDates.value = dates;
    priorityTrendSeries.value = newSeries;
    trendList.value = aggregated;
    nonData.value = aggregated.every((item) => (item.count || 0) === 0);
    updateCharts();
  };

  const updateTrendState = (priorityTrendList: any[] = []) => {
    if (!priorityTrendList.length) {
      trendDates.value = [];
      priorityTrendSeries.value = PRIORITY_KEYS.reduce((acc, key) => {
        acc[key] = [];
        return acc;
      }, {} as Record<string, number[]>);
      trendList.value = [];
      nonData.value = true;
      updateCharts();
      return;
    }
    const isTotalPriority = (value: unknown) =>
      value === -1 || value === '-1' || value === 'all' || value === 'total';
    const dateSet = new Set<string>();
    priorityTrendList.forEach((priority) => {
      priority?.trendList?.forEach((item: { trendDate?: string }) => {
        if (item?.trendDate) {
          dateSet.add(item.trendDate);
        }
      });
    });
    const sortedDates = Array.from(dateSet)
      .filter(Boolean)
      .sort((a, b) => (dayjs(a).isBefore(dayjs(b)) ? -1 : 1));
    const map = PRIORITY_KEYS.reduce((acc, key) => {
      acc[key] = {};
      return acc;
    }, {} as Record<string, Record<string, number>>);
    const totalPriority = priorityTrendList.find((priority) => isTotalPriority(priority?.priority));
    priorityTrendList.forEach((priority) => {
      const rawPriority = priority?.priority;
      if (isTotalPriority(rawPriority)) return;
      const normalized =
        typeof rawPriority === 'string' ? rawPriority.replace(/^P/i, '') : `${rawPriority ?? 0}`;
      if (!PRIORITY_KEYS.includes(normalized)) return;
      const key = normalized;
      const target = map[key] || {};
      priority?.trendList?.forEach((item: { trendDate?: string; count?: number }) => {
        if (item?.trendDate) {
          target[item.trendDate] = item.count ?? 0;
        }
      });
      map[key] = target;
    });
    const newSeries = PRIORITY_KEYS.reduce((acc, key) => {
      acc[key] = sortedDates.map((date) => map[key][date] ?? 0);
      return acc;
    }, {} as Record<string, number[]>);
    const aggregated = totalPriority?.trendList?.length
      ? sortedDates.map((date) => ({
          trendDate: date,
          count: totalPriority.trendList?.find((item) => item?.trendDate === date)?.count ?? 0,
        }))
      : sortedDates.map((date) => ({
          trendDate: date,
          count: PRIORITY_KEYS.reduce((sum, key) => sum + (map[key][date] ?? 0), 0),
        }));
    trendDates.value = sortedDates;
    priorityTrendSeries.value = newSeries;
    trendList.value = aggregated;
    nonData.value = aggregated.every((item) => (item.count || 0) === 0);
    updateCharts();
  };

  const updateCustomerTrendState = (trendListData: any[] = []) => {
    customerTrendList.value = trendListData || [];
    customerNoData.value = customerTrendList.value.filter((item) => item?.count > 0).length === 0;
    updateCustomerCharts();
  };

  const mockChartData = () => {
    const randomData = (labels: string[]) => {
      return labels.map((label) => ({
        name: label,
        value: Math.floor(Math.random() * 500) + 10,
      }));
    };
    const buildChildLabels = (label: string, prefix: string) => {
      return Array.from({ length: 8 }, (_, index) => `${label}${prefix}${index + 1}`);
    };
    const buildDrillTree = (labels: string[], prefix: string) => {
      return labels
        .map((label) => ({
          name: label,
          value: Math.floor(Math.random() * 500) + 10,
          children: randomData(buildChildLabels(label, prefix)).sort((a, b) => b.value - a.value),
        }))
        .sort((a, b) => b.value - a.value);
    };

    levelData.value = randomData(['P0', 'P1', 'P2', 'P3']).sort((a, b) => b.value - a.value);

    drillStateMap.category.data = cloneDeep(
      buildDrillTree(
        ['产品质量', '服务态度', '物流配送', '价格问题', '虚假宣传', '退换货纠纷', '其他'],
        '-二级分类'
      )
    );
    drillStateMap.category.stack = [];

    drillStateMap.product.data = cloneDeep(
      buildDrillTree(
        [
          'Lute Guitar X',
          'Lute Piano Pro',
          'Lute Violin V1',
          'Lute Drum Set',
          'Accessories',
          'Digital Tuner',
        ],
        '-子产品'
      )
    );
    drillStateMap.product.stack = [];

    sourceData.value = randomData([
      '微博',
      '微信',
      '抖音',
      '小红书',
      'Bilibili',
      '知乎',
      '今日头条',
    ]).sort((a, b) => b.value - a.value);

    countryData.value = randomData(['中国', '美国', '日本', '英国', '德国', '法国', '韩国']).sort(
      (a, b) => b.value - a.value
    );
    fillMockTrendData();
  };

  const fetchMonitorSummary = async (query: Record<string, any>) => {
    try {
      const result = await statisticalApi.luteosAiAnalyzeOpinionMonitoringQueryOpinionMonitor(
        query
      );
      stats.count = result.count ?? 0;
      stats.pendingCount = result.pendingCount ?? 0;
      stats.finishRate = result.finishRate ?? 0;
      stats.processTimelinessRate = result.processTimelinessRate ?? 0;
    } catch (error) {
      console.error('加载工单实时监测失败', error);
    }
  };

  const fetchTrendData = async (query: Record<string, any>) => {
    try {
      const response =
        await statisticalApi.luteosAiAnalyzeOpinionMonitoringQueryOpinionTrendMonitor(query);
      updateTrendState(response.priorityTrendList || []);
    } catch (error) {
      console.error('加载工单趋势失败', error);
    }
  };

  const buildCustomerQuery = () => ({
    classification: '客服',
    startTime: search.startTime || undefined,
    endTime: search.endTime || undefined,
  });

  const fetchCustomerSummary = async (query: Record<string, any>) => {
    try {
      const result = await statisticalApi.luteosAiAnalyzeOpinionGetOpinionCount(query);
      customerStats.count = result.count ?? 0;
      customerStats.pendingCount = result.pendingCount ?? 0;
      customerStats.pendingRate = result.pendingRate ?? 0;
    } catch (error) {
      console.error('加载客服工单统计失败', error);
    }
  };

  const fetchCustomerTrend = async (query: Record<string, any>) => {
    try {
      const response = await statisticalApi.luteosAiAnalyzeOpinionGetOpinionTrendCount(query);
      updateCustomerTrendState(response.trendList || []);
    } catch (error) {
      console.error('加载客服趋势失败', error);
    }
  };

  const fetchCustomerTags = async (query: Record<string, any>) => {
    try {
      const response = await statisticalApi.luteosAiAnalyzeOpinionGetOpinionTagCount(query);
      const max = Math.max(...(response.tagList?.map((item) => item.count || 0) || [1]));
      customerTagCountList.value =
        response.tagList?.map((item) => ({
          name: item.tertiaryTag || '其他',
          value: item.count ?? 0,
          percent: ((item.count || 0) / max) * 100,
        })) || [];
    } catch (error) {
      console.error('加载客服问题分布失败', error);
    }
  };

  const fetchLevelDistribution = async (query: Record<string, any>) => {
    try {
      const response =
        await statisticalApi.luteosAiAnalyzeOpinionMonitoringQueryOpinionLevelMonitor(query);
      const list = response.priorityList || [];
      levelData.value = list
        .map((item) => ({
          name: item.priority || '未知',
          value: item.num ?? 0,
        }))
        .sort((a, b) => b.value - a.value);
    } catch (error) {
      console.error('加载舆情等级分布失败', error);
    }
  };

  const fetchClassificationDistribution = async (query: Record<string, any>) => {
    try {
      const response =
        await statisticalApi.luteosAiAnalyzeOpinionMonitoringQueryOpinionClassificationMonitor(
          query
        );
      const list = response.classificationList || [];
      sourceData.value = list
        .map((item) => ({
          name: CLASSIFICATION_LABELS[item.classification] || item.classification,
          value: item.classificationCount,
          rate: item.rate,
        }))
        .sort((a, b) => b.value - a.value);
    } catch (error) {
      console.error('加载舆情来源分布失败', error);
    }
  };

  const fetchProblemDistribution = async (query: Record<string, any>) => {
    try {
      const response =
        await statisticalApi.luteosAiAnalyzeOpinionMonitoringQueryOpinionPrTagMonitor(query);
      const list = response.prTagList || [];
      drillStateMap.category.data = list
        .map((item) => ({
          name: item.prTag || '其他',
          value: item.num ?? 0,
          rate: item.rate,
        }))
        .sort((a, b) => b.value - a.value);
      drillStateMap.category.stack = [];
    } catch (error) {
      console.error('加载问题分布失败', error);
    }
  };

  const fetchProductDistribution = async (query: Record<string, any>) => {
    try {
      const response =
        await statisticalApi.luteosAiAnalyzeOpinionMonitoringQueryOpinionSpuCateMonitor(query);
      const list = response.spuCateList || [];
      drillStateMap.product.data = list
        .map((item) => ({
          name: item.spuCate || '其他',
          value: item.num ?? 0,
          rate: item.rate,
        }))
        .sort((a, b) => b.value - a.value);
      drillStateMap.product.stack = [];
    } catch (error) {
      console.error('加载产品分布失败', error);
    }
  };

  const fetchSmPlatformDistribution = async (query: Record<string, any>) => {
    try {
      const response =
        await statisticalApi.luteosAiAnalyzeOpinionMonitoringQueryOpinionSmPlatformMonitor(query);
      const list = response.platformList || [];
      platformData.value = list
        .map((item) => ({
          name: item.platform || '其他',
          value: item.num ?? 0,
          rate: item.rate,
        }))
        .sort((a, b) => b.value - a.value);
    } catch (error) {
      console.error('加载来源平台分布失败', error);
    }
  };

  const fetchCountryDistribution = async (query: Record<string, any>) => {
    try {
      const response =
        await statisticalApi.luteosAiAnalyzeOpinionMonitoringQueryOpinionCountryMonitor(query);
      const list = response.countryList || [];
      countryData.value = list
        .map((item) => ({
          name: item.country,
          value: item.num,
          rate: item.rate,
        }))
        .sort((a, b) => b.value - a.value);
    } catch (error) {
      console.error('加载国家分布失败', error);
    }
  };

  const initData = async () => {
    loading.value = true;
    const query = buildMonitoringQuery();
    try {
      await Promise.allSettled([
        fetchMonitorSummary(query),
        fetchTrendData(query),
        fetchLevelDistribution(query),
        fetchClassificationDistribution(query),
        fetchProblemDistribution(query),
        fetchProductDistribution(query),
        fetchCountryDistribution(query),
        fetchSmPlatformDistribution(query),
      ]);
    } finally {
      loading.value = false;
    }
  };

  const initCustomerData = async () => {
    loading.value = true;
    const query = buildCustomerQuery();
    try {
      await Promise.allSettled([
        fetchCustomerSummary(query),
        fetchCustomerTrend(query),
        fetchCustomerTags(query),
      ]);
    } finally {
      loading.value = false;
    }
  };

  watch(
    () => search,
    () => {
      if (isCustomerTab.value) {
        initCustomerData();
        return;
      }
      initData();
    },
    { deep: 1, immediate: true }
  );
  watch(
    () => search.classification,
    () => {
      if (!isCustomerTab.value) {
        loadDicts();
      }
    }
  );
  watch(
    () => isCustomerTab.value,
    async () => {
      await nextTick();
      if (urgentChart.value) {
        charts.urgent?.dispose();
        charts.urgent = echarts.init(urgentChart.value);
      }
      if (!isCustomerTab.value) {
        updateAllSentimentCharts();
      }
    }
  );
  watch(
    sentimentDataMap,
    () => {
      updateAllSentimentCharts();
    },
    { deep: true }
  );
  onMounted(async () => {
    loadDicts();
    initCharts();
    await nextTick();
    updateAllSentimentCharts();
    window.addEventListener('resize', handleResize);
  });
  onUnmounted(() => {
    window.removeEventListener('resize', handleResize);
    sentimentChartInstances.forEach((chart) => chart.dispose());
  });
  const router = useRouter();
  const buildWorkOrderBaseQuery = () => {
    const query: Record<string, any> = {};

    if (search.classification === '客服') {
      query.classification = '客服';
    } else if (search.source) {
      query.classification = CLASSIFICATION_LABELS[search.source] || search.source;
    } else if (search.classification) {
      query.classification = search.classification === '社媒' ? '新闻/社媒' : search.classification;
    }

    if (search.startTime) {
      query.publishTimeStart = search.startTime;
    }
    if (search.endTime) {
      query.publishTimeEnd = search.endTime;
    }

    return query;
  };

  const buildPendingWorkOrderQuery = () => ({
    ...buildWorkOrderBaseQuery(),
    status: 0,
  });

  const buildTotalWorkOrderQuery = () => buildWorkOrderBaseQuery();

  const skipPublicSentiment = () => {
    router.push({
      name: 'alarmOrder',
      query: buildPendingWorkOrderQuery(),
    });
  };

  const handleMonitorLink = (key: string) => {
    if (key === 'pending') {
      router.push({
        name: 'alarmOrder',
        query: buildPendingWorkOrderQuery(),
      });
      return;
    }
    if (key === 'total') {
      router.push({
        name: 'alarmOrder',
        query: buildTotalWorkOrderQuery(),
      });
    }
  };
</script>

<style scoped lang="scss">
  :deep(:is([class*='title'], [class*='Title'])) {
    font-family: 'PingFang SC Medium', 'PingFang SC', sans-serif;
    font-weight: 500;
  }

  .mb-16-px {
    margin-bottom: 16px;
  }

  .sticky-header {
    position: sticky;
    top: 0;
    z-index: 10;
    background: #fff;
    padding-bottom: 0px;
    box-shadow: 0 2px 10px rgba(0, 0, 0, 0.05);
    :deep(.el-tabs__header) {
      margin-bottom: 0;
      padding: 0 16px;
      background: #fff;
    }
  }

  .filter-section {
    margin-bottom: 16px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 10px 16px;
    background-color: #fff;
    .filters-wrapper {
      display: flex;
      align-items: center;
      gap: 12px;
      flex-wrap: wrap;
    }
    .filter-reset {
      height: 32px;
      padding: 0 12px;
    }
    .actions {
      display: flex;
      align-items: center;
      gap: 16px;
      margin-left: 20px;
    }
    .gap {
      width: 1px;
      height: 12px;
      background: var(---N4, #dedede);
    }
    icon-Root,
    .Root-tyicon {
      font-size: 16px;
      cursor: pointer;
    }
  }
  .dashboard {
    padding: 0 16px 16px;
    background-color: transparent;
  }

  .customer-dashboard {
    padding: 16px;
    padding-top: 0;
  }

  .alert-banner {
    display: flex;
    align-items: center;
    gap: 6px;
    padding: 12px 16px;
    background: #fffaeb;
    border: 1px solid #ffdd99;
    border-radius: 6px;
    font-size: 14px;
    line-height: 22px;
    color: #1f1f1f;
    margin-bottom: 16px;
  }

  .alert-icon {
    font-size: 20px;
    color: #ff9f22;
  }

  .alert-highlight {
    color: #ff9f22;
    font-weight: 500;
  }

  .dashboard-card {
    padding: 20px 16px 24px;
    background-color: #fff;
    border-radius: 10px;
    box-sizing: border-box;
    .dashboard-card-head {
      display: flex;
      gap: 8px;
      align-items: center;
      margin-bottom: 16px;
      .dashboard-card-icon {
        display: inline-block;
        width: 3px;
        height: 14px;
        background-color: #4263eb;
        border-radius: 15px;
        background: var(---P6, #02b96b);
      }
      .dashboard-card-title {
        color: #262626;

        font-family: 'PingFang SC Medium', 'PingFang SC', sans-serif;
        font-size: 16px;
        font-style: normal;
        font-weight: 500;
        line-height: 24px;
      }
    }
    .dashboard-card-body {
      position: relative;
      height: 100%;
      box-sizing: border-box;
    }
    .no-data {
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      color: #999;
      font-size: 14px;
    }
  }

  .monitor-cards {
    display: flex;
    align-items: stretch;
    min-height: 78px;
  }

  .monitor-card-item {
    flex: 1;
    padding: 16px 20px;
    position: relative;
    border-radius: 10px;
    border: 1px solid transparent;
    transition: background-color 0.2s ease, box-shadow 0.2s ease;
  }

  .monitor-card-main {
    display: flex;
    align-items: center;
    gap: 16px;
  }

  .monitor-icon {
    width: 36px;
    height: 36px;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-shrink: 0;
    .Root-tyicon {
      font-size: 20px;
      color: #fff;
    }
  }

  .monitor-info {
    flex: 1;
  }

  .monitor-title {
    display: flex;
    align-items: center;
    gap: 6px;
    font-size: 13px;
    line-height: 22px;
    color: #585a5a;
    .Root-tyicon {
      font-size: 14px;
      color: #8a8f8d;
    }
  }
  .monitor-card-item:hover {
    background: #f8f8f8;
  }
  .monitor-card-item:hover .monitor-number {
    color: #02b96b;
  }
  .monitor-card-item:not(.is-static):hover {
    cursor: pointer;
  }
  .monitor-card-item.is-static:hover {
    cursor: default;
  }
  .monitor-link {
    display: inline-flex;
    align-items: center;
    cursor: pointer;
    color: #8a8f8d;
  }
  .monitor-link .iconfont {
    font-size: 14px;
  }

  .monitor-value {
    display: flex;
    align-items: flex-end;
    gap: 4px;
    color: #262626;
    margin-top: 8px;
  }

  .monitor-number {
    font-family: DIN, sans-serif;
    font-size: 24px;
    font-weight: 700;
    line-height: 26px;
  }

  .monitor-unit {
    font-size: 14px;
    font-weight: 500;
    line-height: 22px;
  }

  .monitor-footer {
    display: flex;
    align-items: center;
    gap: 4px;
    font-size: 12px;
    line-height: 20px;
    color: #585a5a;
    margin-top: 12px;
    padding-left: 52px;
  }

  .monitor-footer.is-danger {
    color: #585a5a;
  }

  .monitor-footer .trend-value {
    color: #02b96b;
  }

  .monitor-footer.is-danger .trend-value {
    color: #f53f3f;
  }

  .trend-arrow {
    width: 0;
    height: 0;
    border-left: 4px solid transparent;
    border-right: 4px solid transparent;
  }

  .trend-arrow.is-up {
    border-bottom: 6px solid #02b96b;
  }

  .trend-arrow.is-down {
    border-top: 6px solid var(--el-color-danger);
  }

  .monitor-divider {
    position: absolute;
    right: -8px;
    top: 50%;
    transform: translateY(-50%);
    width: 1px;
    height: 40px;
    background: var(--el-border-color-extra-light);
  }

  .dashboard-row {
    display: grid;
    grid-template-columns: 1fr 1fr 2fr;
    gap: 16px;
    height: 360px;
  }

  .customer-dashboard .dashboard-card {
    box-sizing: content-box;
  }

  .customer-dashboard .dashboard-card-head {
    margin-bottom: 0;
  }

  .customer-dashboard .dashboard-card-body {
    padding-top: 20px;
  }

  .dashboard-panel {
    height: 100%;
    min-width: 0;
  }

  .dashboard-panel--wide {
    grid-column: 3;
  }

  .sentiment-card {
    padding-bottom: 20px;
  }

  .sentiment-panels {
    display: flex;
    gap: 16px;
    align-items: stretch;
  }

  .sentiment-panel {
    flex: 1;
    border: 1px solid var(--el-border-color-lighter);
    border-radius: 10px;
    padding: 16px;
    position: relative;
    box-sizing: border-box;
    height: 448px;
  }
  .sentiment-panel.is-country {
    height: auto;
  }

  .sentiment-panel-head {
    display: flex;
    align-items: center;
    justify-content: space-between;
    font-size: 14px;
    line-height: 22px;
    color: var(--el-text-color-primary);
  }

  .sentiment-panel-title {
    display: inline-flex;
    align-items: center;
    font-weight: 500;
  }

  .sentiment-back {
    width: 16px;
    height: 16px;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    margin-right: 4px;
    cursor: pointer;
  }

  .sentiment-back::before {
    content: '';
    width: 6px;
    height: 6px;
    border-left: 2px solid var(--el-text-color-primary);
    border-bottom: 2px solid var(--el-text-color-primary);
    transform: rotate(45deg);
  }

  .sentiment-panel-head .Root-tyicon {
    font-size: 16px;
    color: var(--el-text-color-secondary);
  }

  .sentiment-toggle {
    cursor: pointer;
    width: 16px;
    height: 16px;
  }

  .sentiment-toggle.is-active {
    filter: none;
  }

  .sentiment-axis {
    display: flex;
    justify-content: space-between;
    align-items: center;
    font-size: 12px;
    line-height: 20px;
    color: var(--el-text-color-placeholder);
    padding: 0 16px 0 68px;
    margin-top: 8px;
  }

  .sentiment-list {
    position: relative;
    display: flex;
    flex-direction: column;
    padding: 0 16px 0 0;
    margin-top: 4px;
  }

  .sentiment-list::before {
    content: '';
    position: absolute;
    left: 68px;
    right: 16px;
    top: 8px;
    bottom: 8px;
    background-image: linear-gradient(
      to right,
      var(--el-border-color-extra-light) 1px,
      transparent 1px
    );
    background-size: calc(100% / 7) 100%;
    pointer-events: none;
  }

  .sentiment-item {
    display: flex;
    align-items: center;
    gap: 8px;
    padding: 8px 0;
  }

  .sentiment-item.is-drillable {
    cursor: pointer;
  }

  .sentiment-label {
    width: 60px;
    text-align: right;
    font-size: 12px;
    line-height: 20px;
    color: var(--el-text-color-secondary);
  }

  .sentiment-bar {
    flex: 1;
    height: 16px;
    position: relative;
    z-index: 1;
  }

  .sentiment-bar-fill {
    height: 100%;
    background: var(--el-color-success);
    border-radius: 2px;
  }

  .sentiment-value {
    width: 48px;
    font-family: DIN, sans-serif;
    font-size: 12px;
    line-height: 18px;
    color: var(--el-text-color-primary);
  }

  .sentiment-bars {
    flex: 1;
  }

  .sentiment-chart-view {
    position: relative;
    height: 400px;
    margin-top: 12px;
  }

  .sentiment-chart-view.is-pie {
    height: 380px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-between;
    padding-top: 12px;
  }
  // .sentiment-chart-view.is-pie.is-product {
  //   justify-content: flex-start;
  // }

  .sentiment-panel.is-country .sentiment-chart-view {
    height: 380px;
  }
  .sentiment-panel.is-country .sentiment-chart-view.is-pie {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-between;
    padding-top: 12px;
  }
  .sentiment-panel.is-country .sentiment-chart {
    height: 100%;
  }

  .sentiment-panel.is-country .sentiment-chart-view.is-pie .sentiment-chart {
    width: 210px;
    height: 210px;
    margin: 0 auto;
    flex: 0 0 auto;
  }
  .sentiment-chart-view.is-pie .sentiment-chart {
    width: 210px;
    height: 210px;
    margin: 0 auto;
    flex: 0 0 auto;
  }
  .sentiment-panel.is-country .sentiment-pie-extra {
    width: 100%;
  }
  .sentiment-chart-view.is-pie .sentiment-pie-extra {
    width: 100%;
    min-height: 0;
    display: flex;
    flex-direction: column;
  }
  .sentiment-panel.is-country .sentiment-pie-legend {
    margin-top: 0;
    padding: 0 8px;
  }
  .sentiment-chart-view.is-pie .sentiment-pie-legend {
    margin-top: auto;
    padding: 0 8px;
    min-height: 0;
    overflow-x: hidden;
    overflow-y: auto;
  }

  .sentiment-chart {
    width: 100%;
    height: 100%;
  }

  .sentiment-pie-center {
    position: absolute;
    left: 50%;
    top: 117px;
    transform: translate(-50%, -50%);
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 2px;
    pointer-events: none;
  }

  .sentiment-pie-label {
    font-size: 13px;
    line-height: 22px;
    color: var(--el-text-color-secondary);
  }

  .sentiment-pie-value {
    font-size: 20px;
    line-height: 28px;
    color: var(--el-text-color-primary);
    font-weight: 500;
  }

  .sentiment-pie-legend {
    display: flex;
    flex-wrap: wrap;
    gap: 8px 20px;
    justify-content: center;
    margin-top: 12px;
    padding: 0 8px;
  }

  .sentiment-pie-item {
    display: flex;
    align-items: center;
    gap: 6px;
    font-size: 13px;
    line-height: 22px;
  }

  .sentiment-pie-dot {
    width: 8px;
    height: 8px;
    border-radius: 50%;
  }

  .sentiment-pie-name {
    color: var(--el-text-color-placeholder);
  }

  .sentiment-pie-percent {
    color: var(--el-text-color-primary);
  }
  .chart {
    height: 100%;
    width: 100%;
    box-sizing: border-box;
    padding: 0;
    &.urgent-chart {
      height: 272px;
      width: 100%;
      padding: 0;
      box-sizing: border-box;
    }
  }

  .customer-dashboard .urgent-chart {
    height: 342px;
  }

  .urgent-stats-section {
    display: flex;
    padding: 12px 16px;
    align-items: center;
    gap: 6px;
    border-radius: 6px;
    background: var(---l5, #fffaeb);
    color: var(---N9, #1f1f1f);
    font-size: 14px;
    font-style: normal;
    font-weight: 400;
    line-height: 22px;
    margin-bottom: 16px;
    .section-icon {
      width: 20px;
      height: 20px;
      display: flex;
      justify-content: center;
      align-items: center;
      i {
        color: #ff9f22;
        font-size: 20px;
        background-color: #fff;
        border-radius: 100%;
      }
    }
    .urgent-number {
      color: var(---C5, #ff9f22);
    }
  }

  .state-cards {
    display: flex;
    gap: 12px;
    .state-card {
      flex: 1;
      display: flex;
      align-items: center;
      padding: 16px 16px 16px 32px;
      gap: 16px;
      position: relative;
      &:first-child {
        padding-left: 20px;
        cursor: pointer;
      }
      &::after {
        content: '';
        position: absolute;
        right: -6px;
        top: 50%;
        transform: translateY(-50%);
        width: 1px;
        height: 40px;
        background-color: var(---N3, #ededed);
      }
      &:last-child::after {
        display: none;
      }
      &.has-background {
        background: var(---N1, #fafafa);
        border-radius: 6px;
      }
      .card-icon {
        width: 36px;
        height: 36px;
        border-radius: 50%;
        display: flex;
        align-items: center;
        justify-content: center;
        flex-shrink: 0;
        margin-top: -30px;
        i {
          font-size: 20px;
          color: #fff;
        }
      }
      .card-content {
        flex: 1;
        .card-title {
          display: flex;
          align-items: center;
          gap: 4px;
          margin-bottom: 10px;
          color: var(---N8);
          font-size: 13px;
          font-weight: 400;
          .info-icon {
            font-size: 14px;
            color: var(---N6, #999);
            cursor: pointer;
          }
        }
        .card-value {
          color: var(---N9, #1f1f1f);
          margin-bottom: 10px;
          .card-number {
            font-family: DIN;
            font-size: 24px;
            font-weight: 700;
          }
          .card-unit {
            font-size: 14px;
            font-weight: 500;
            margin-left: 4px;
          }
        }
        .card-compare {
          display: flex;
          align-items: center;
          gap: 4px;
          margin-bottom: 10px;
          color: var(---N8);
          font-size: 12px;
          font-weight: 400;
          .compare-value {
            display: flex;
            align-items: center;
            gap: 2px;
            font-weight: 500;
            &.trend-up {
              color: var(---C7, #f53f3f);
            }
            &.trend-down {
              color: var(---C4, #02b96b);
            }
            .trend-arrow {
              width: 0;
              height: 0;
              margin-right: 2px;
              border-left: 4px solid transparent;
              border-right: 4px solid transparent;
              &.arrow-up {
                border-bottom: 6px solid var(---C7);
              }
              &.arrow-down {
                border-top: 6px solid var(---C4, #02b96b);
              }
            }
          }
        }
      }
    }
  }

  .section {
    margin-top: 20px;
    gap: 16px;
    box-sizing: border-box;
  }

  .ai-motion-analysis {
    width: 0;
    flex: 1;
  }

  .tag-label {
    word-break: keep-all;
    margin-left: 10px;
    margin-right: 10px;
  }

  .empty-status {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    color: #999;
    font-size: 14px;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 12px;
  }
</style>

<style lang="scss">
  .data-board-page {
    padding-bottom: 16px;
    .list-table {
      background-color: transparent !important;
    }
  }
</style>
