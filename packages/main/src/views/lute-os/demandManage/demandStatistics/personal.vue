<template>
  <div class="demand-stats mt-3">
    <!-- 我的需求与部门需求 -->
    <div class="panel">
      <div class="panel-header">
        <span class="panel-title mb-2">我的需求与部门需求</span>
        <TimeDimensionPicker v-model="myVsDeptTime" :options="timeOptions" @change="handleMyVsDeptTimeChange" />
      </div>
      <div class="d-flex justify-content-between" style="min-width: 0">
        <div ref="myVsDeptChart" class="status-chart"></div>
      </div>
    </div>
    <!-- 我的需求 -->
    <div class="panel">
      <div class="panel-header" style="min-height: 44px;">
        <span class="panel-title">我的需求状态</span>
      </div>
      <div class="d-flex justify-content-between" style="min-width: 0">
        <div ref="myNeedChart" class="status-chart"></div>
      </div>
    </div>
    <!-- 需求评分情况 -->
    <div class="panel">
      <div class="panel-header">
        <span class="panel-title mb-2">需求评分情况</span>
        <TimeDimensionPicker v-model="scoreTime" :options="timeOptions" @change="handleScoreTimeChange" />
      </div>
      <div class="d-flex justify-content-between" style="min-width: 0">
        <div ref="scoreChart" class="status-chart"></div>
      </div>
      <div class="chart-bottom">
        <span>平均分</span>
        <span class="chart-bottom-value">{{ chartData.avgScore }}</span>
      </div>
    </div>
    <!-- 需求落地情况 -->
    <div class="panel">
      <div class="panel-header">
        <span class="panel-title mb-2">需求落地情况</span>
        <TimeDimensionPicker v-model="landTime" :options="timeOptions" @change="handleLandTimeChange"/>
      </div>
      <div class="d-flex justify-content-between" style="min-width: 0">
        <div ref="landChart" class="status-chart"></div>
      </div>
    </div>
    <!-- 及时完成情况 -->
    <div class="panel">
      <div class="panel-header">
        <span class="panel-title mb-2">及时完成情况</span>
        <TimeDimensionPicker v-model="ontimeTime" :options="timeOptions" @change="handleOntimeTimeChange"/>
      </div>
      <div class="d-flex justify-content-between" style="min-width: 0">
        <div ref="ontimeChart" class="status-chart"></div>
      </div>
    </div>
  </div>
  <SurveyFeedback />
</template>

<script setup name="demandStatisticsPersonal">
import * as echarts from 'echarts';
import { platformApi } from '@/api';
import TimeDimensionPicker from '../components/common/TimeDimensionPicker.vue';
import SurveyFeedback from '../components/SurveyFeedback.vue';
import { useRouter } from 'vue-router';
const router = useRouter();
// 时间筛选
const timeOptions = [
  { label: '所有时间', value: 'all' },
  { label: '年', value: 1 },
  { label: '季度', value: 2 },
  { label: '月', value: 3 },
];

const myVsDeptTime = reactive({ timeType: null, startDate: null, endDate: null });
const myNeedTime = reactive({ timeType: null, startDate: null, endDate: null });
const scoreTime = reactive({ timeType: null, startDate: null, endDate: null });
const landTime = reactive({ timeType: null, startDate: null, endDate: null });
const ontimeTime = reactive({ timeType: null, startDate: null, endDate: null });

const myVsDeptChart = ref(null);
const myNeedChart = ref(null);
const scoreChart = ref(null);
const landChart = ref(null);
const ontimeChart = ref(null);

const chartData = reactive({
  myVsDept: [],
  myNeed: [],
  score: [],
  land: [],
  ontime: [],
});

onMounted(() => {
  fetchMyVsDeptData({ timeType: null, startDate: null, endDate: null });
  fetchMyNeedData({ timeType: null, startDate: null, endDate: null });
  fetchScoreData({ timeType: null, startDate: null, endDate: null });
  fetchLandData({ timeType: null, startDate: null, endDate: null });
  fetchOntimeData({ timeType: null, startDate: null, endDate: null });
});
// 渲染函数
function renderDonut(dom, data, title = '', totalQty = 0) {
  const total =
    typeof totalQty === 'number' ? totalQty : data.reduce((acc, cur) => acc + cur.value, 0);
  const chart = echarts.init(dom);
  chart.setOption({
    tooltip: {
      trigger: 'item',
      formatter: (p) => {
        const rate = p.data.rate !== undefined ? p.data.rate : '';
        if (title === '需求落地情况') {
          return `
      <div style="min-width:140px;">
        <div style="display: flex; justify-content: space-between; align-items: center;">
          <b style="color:#d94460;font-size:16px;">总数</b>
          <span style="color:#d94460;font-size:16px;">${total}</span>
        </div>
        <div style="display: flex; justify-content: space-between; align-items: center; margin-top: 4px;">
          <span>${p.data.name}</span>
          <span style="display: flex; gap: 20px; align-items: center;">
            <span>${rate}%</span>
            <span>${p.data.value}</span>
          </span>
        </div>
      </div>
    `;
        }
        if (title === '我的需求') {
          return `
      <div style="min-width:140px;">
        <div style="display: flex; justify-content: space-between; align-items: center;">
          <b style="color:#d94460;font-size:16px;">总数</b>
          <span style="color:#d94460;font-size:16px;">${p.data.total}</span>
        </div>
        <div style="display: flex; justify-content: space-between; align-items: center; margin-top: 4px;">
          <span>${p.data.name}</span>
          <span style="display: flex; gap: 20px; align-items: center;">
            <span style="margin-left: 15px;">${rate}%</span>
            <span>${p.data.value}</span>
          </span>
        </div>
      </div>
    `;
        }
        if (title === '需求评分情况') {
          return `
      <div style="min-width:140px;">
        <div style="display: flex; justify-content: space-between; align-items: center;">
          <b style="color:#d94460;font-size:16px;">总数</b>
          <span style="color:#d94460;font-size:16px;">${total}</span>
        </div>
        <div style="display: flex; justify-content: space-between; align-items: center; margin-top: 4px;">
          <span>${p.data.name}</span>
          <span style="display: flex; gap: 20px; align-items: center;">
            <span>${rate}%</span>
            <span>${p.data.value}</span>
          </span>
        </div>
      </div>
    `;
        }
        if (title === '及时完成情况') {
          return `
      <div style="min-width:140px;">
        <div style="display: flex; justify-content: space-between; align-items: center;">
          <b style="color:#d94460;font-size:16px;">总数</b>
          <span style="color:#d94460;font-size:16px;">${total}</span>
        </div>
        <div style="display: flex; justify-content: space-between; align-items: center; margin-top: 4px;">
          <span>${p.data.name}</span>
          <span style="display: flex; gap: 20px; align-items: center;">
            <span>${rate}%</span>
            <span>${p.data.value}</span>
          </span>
        </div>
      </div>
    `;
        }
        if (title === '我的需求与部门需求') {
          return `
      <div style="min-width:140px;">
        <div style="display: flex; justify-content: space-between; align-items: center;">
          <b style="color:#d94460;font-size:16px;">总数</b>
          <span style="color:#d94460;font-size:16px;">${total}</span>
        </div>
        <div style="display: flex; justify-content: space-between; align-items: center; margin-top: 4px; gap: 20px;">
          <span>${p.data.name}</span>
          <span style="display: flex; gap: 20px; align-items: center;">
            <span>${rate}%</span>
            <span>${p.data.value}</span>
          </span>
        </div>
      </div>
    `;
        }
      },
    },
    legend: {
      orient: 'horizontal',
      icon: 'circle',
      top: 0,
      left: 'center',
    },
    series: [
      {
        name: title,
        type: 'pie',
        radius: ['30%', '82%'],
        center: ['50%', '57%'],
        avoidLabelOverlap: false,
        label: { show: false },
        data,
      },
    ],
  });
  chart.off('click');
  chart.on('click', (params) => {
    if (title === '我的需求') {
      // if (params.data.name === '内审中') return;
      if(['内审中', '待反馈', '待查收'].includes(params.data.name)) return;
      const statusMap = {
        内审未通过: '5',
        已完结: '101',
        执行中: '3',
      };
      router.push({
        name: 'demandExecuteMyDemand',
        query: {
          from: 'demandStatistics',
          status: statusMap[params.data.name],
        },
      });
    }
    if (title === '需求评分情况') {
      const scoreFlag = params.data.name === '≥85分' ? '0' : params.data.name === '<85分' ? '1' : '';
      if(!scoreFlag) return;
      router.push({
        name: 'demandExecuteMyDemand',
        query: {
          from: 'demandStatistics',
          scoreFlag,
        },
      });
    }
    if (title === '需求落地情况') {
      const implementFlag = params.data.name === '已落地' ? '1' : params.data.name === '未落地' ? '0' : '';
      if (params.data.name === '未反馈') return;
      router.push({
        name: 'demandExecuteMyDemand',
        query: {
          from: 'demandStatistics',
          implementFlag,
        },
      });
    }
    if (title === '及时完成情况') {
      router.push({
        name: 'demandExecuteMyDemand',
        query: {
          from: 'demandStatistics',
          delayFlag: params.data.name === '及时交付' ? '0' : '1',
        },
      });
    }
  });
}
const fetchMyVsDeptData = async (params) => {
  const res = await platformApi.platformDemandStaticsQueryPersonMemberStaticsList(params);
  const bean = res.bean || {};
  const colorMap = {
    部门我的需求: '#a6a6a6',
    部门其他需求: '#214679',
  };
  chartData.myVsDept = [
    {
      name: '部门我的需求',
      value: Number(bean.myCount) || 0,
      rate: bean.rate ?? 0,
      itemStyle: { color: colorMap['部门我的需求'] },
    },
    {
      name: '部门其他需求',
      value: Number(bean.otherCount) || 0,
      rate: bean.otherRate ?? 0,
      itemStyle: { color: colorMap['部门其他需求'] },
    },
  ];
  chartData.myVsDeptTotal = Number(bean.totalCount) || 0;
  renderDonut(
    myVsDeptChart.value,
    chartData.myVsDept,
    '我的需求与部门需求',
    chartData.myVsDeptTotal
  );
};

const fetchMyNeedData = async (params) => {
  const res = await platformApi.platformDemandStaticsQueryPersonMemberStatusStaticsList(params);
  const colorMap = {
    内审中: '#AD5F99',
    内审未通过: '#0F4C81',
    已完结: '#6a9721',
    执行中: '#9E7B6B',
    待查收: '#939597',
    待反馈: '#EFC05A',
  };
  chartData.myNeed = (res.statusList || []).map((item) => ({
    name: item.statusDesc,
    value: item.statusCount || 0,
    rate: item.rate || 0,
    total: item.totalCount || 0,
    itemStyle: { color: colorMap[item.statusDesc] || '#AD5F99' },
  }));
  renderDonut(myNeedChart.value, chartData.myNeed, '我的需求', res.totalCount || 0);
};

const fetchScoreData = async (params) => {
  const res = await platformApi.platformDemandStaticsQueryPersonScoreStaticsList(params);
  const list = Array.isArray(res.list) && res.list.length > 0 ? res.list[0] : {};
  const colorMap = {
    '≥85分': '#73b900',
    '<85分': '#c60030',
    未评分: '#a6a6a6',
  };
  chartData.score = [
    {
      name: '≥85分',
      value: list.highScoreQty || 0,
      rate: list.highScoreRate || 0,
      itemStyle: { color: colorMap['≥85分'] },
    },
    {
      name: '<85分',
      value: list.lowScoreQty || 0,
      rate: list.lowScoreRate || 0,
      itemStyle: { color: colorMap['<85分'] },
    },
    {
      name: '未评分',
      value: list.unScoreQty || 0,
      rate: list.unScoreRate || 0,
      itemStyle: { color: colorMap['未评分'] },
    },
  ];
  chartData.avgScore = list.avgScore || 0;
  renderDonut(
    scoreChart.value,
    chartData.score,
    '需求评分情况',
    (list.highScoreQty || 0) + (list.lowScoreQty || 0) + (list.unScoreQty || 0)
  );
};

const fetchLandData = async (params) => {
  const res = await platformApi.platformDemandStaticsQueryPersonLandStaticsList(params);
  const stat =
    Array.isArray(res.list) && res.list.length > 0
      ? res.list[0]
      : {
        landQty: 0,
        landRate: 0,
        unLandQty: 0,
        unLandRate: 0,
        unFeedbackQty: 0,
        unFeedbackRate: 0,
        totalQty: 0,
      };
  const colorMap = {
    已落地: '#EFC05A',
    未落地: '#214679',
    未反馈: '#a6a6a6',
  };
  chartData.land = [
    {
      name: '已落地',
      value: stat.landQty || 0,
      rate: stat.landRate || 0,
      itemStyle: { color: colorMap['已落地'] },
    },
    {
      name: '未落地',
      value: stat.unLandQty || 0,
      rate: stat.unLandRate || 0,
      itemStyle: { color: colorMap['未落地'] },
    },
    {
      name: '未反馈',
      value: stat.unFeedbackQty || 0,
      rate: stat.unFeedbackRate || 0,
      itemStyle: { color: colorMap['未反馈'] },
    },
  ];
  chartData.landTotal = stat.totalQty || 0;
  renderDonut(landChart.value, chartData.land, '需求落地情况', stat.totalQty || 0);
};

const fetchOntimeData = async (params) => {
  const res = await platformApi.platformDemandStaticsQueryPersonOnTimeStaticsList(params);
  const stat =
    Array.isArray(res.list) && res.list.length > 0
      ? res.list[0]
      : {
        onTimeQty: 0,
        lateTimeQty: 0,
        totalQty: 0,
        onTimeRate: 0,
        lateTimeRate: 0,
      };
  const colorMap = {
    及时交付: '#EFC05A',
    超时交付: '#214679',
  };
  chartData.ontime = [
    {
      name: '及时交付',
      value: stat.onTimeQty || 0,
      rate: stat.onTimeRate || 0,
      itemStyle: { color: colorMap['及时交付'] },
    },
    {
      name: '超时交付',
      value: stat.lateTimeQty || 0,
      rate: stat.lateTimeRate || 0,
      itemStyle: { color: colorMap['超时交付'] },
    },
  ];
  chartData.ontimeTotal = stat.totalQty || 0;
  renderDonut(ontimeChart.value, chartData.ontime, '及时完成情况', stat.totalQty || 0);
};

const handleMyVsDeptTimeChange = ({ timeType, startDate, endDate }) => {
  fetchMyVsDeptData({ timeType, startDate, endDate });
};
const handleScoreTimeChange = ({ timeType, startDate, endDate }) => {
  fetchScoreData({ timeType, startDate, endDate });
};
const handleLandTimeChange = ({ timeType, startDate, endDate }) => {
  fetchLandData({ timeType, startDate, endDate });
};
const handleOntimeTimeChange = ({ timeType, startDate, endDate }) => {
  fetchOntimeData({ timeType, startDate, endDate });
};
watch(myVsDeptTime, fetchMyVsDeptData, { deep: true });
watch(myNeedTime, fetchMyNeedData, { deep: true });
watch(scoreTime, fetchScoreData, { deep: true });
watch(landTime, fetchLandData, { deep: true });
watch(ontimeTime, fetchOntimeData, { deep: true });
</script>

<style scoped>
.demand-stats {
  display: flex;
  gap: 24px;
  padding: 8px 0;
}

.panel {
  overflow: visible;
  background: #fff;
  padding: 16px;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  width: 380px;
  min-width: 280px;
  min-height: 415px;
  display: flex;
  flex-direction: column;
}

.panel-header {
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
  align-items: center;
  margin-bottom: 12px;
}

.panel-title {
  font-size: 16px;
  font-weight: bold;
}

.status-chart {
  width: 100%;
  height: 290px;
  margin: 0 auto;
}

.chart-bottom {
  margin-top: 5px;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 12px;
  font-size: 18px;
  font-weight: 400;
}

.chart-bottom-value {
  font-size: 20px;
  font-weight: bold;
  margin-left: 8px;
  color: #c60030;
}
</style>
