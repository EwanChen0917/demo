<template>
  <div class="demand-stats mt-5">
    <!-- 各状态需求数量统计 -->
    <div class="panel">
      <div class="panel-header pt-3">
        <span class="panel-title">各状态需求数量统计</span>
      </div>
      <div class="d-flex justify-content-between" style="min-width: 0">
        <div ref="statusChart" class="status-chart"></div>
        <MiniStatTable :data="statusDataArr" class="status-chart-table mt-3" />
      </div>
    </div>

    <!-- 各部门需求数量统计 -->
    <div class="panel">
      <div class="panel-header">
        <span class="panel-title">各部门需求数量统计</span>
        <TimeDimensionPicker
          v-model="deptParams"
          :options="timeOptions"
          @change="handleDeptTimeChange"
          style="margin-left: auto"
        />
      </div>
      <div class="d-flex justify-content-between" style="min-width: 0">
        <div ref="deptChart" class="status-chart"></div>
        <MiniStatTable :data="deptDataArr" nameTitle="提需部门" class="status-chart-table" />
      </div>
    </div>

    <!-- 各品线需求数量统计 -->
    <div class="panel">
      <div class="panel-header">
        <span class="panel-title">各品线需求数量统计</span>
        <el-select
          v-model="productXAxisInterval"
          :clearable="false"
          placeholder="x轴刻度"
          style="width: 90px; margin-left: auto; margin-right: 8px"
        >
          <el-option
            v-for="item in xAxisIntervalOptions"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          />
        </el-select>
        <TimeDimensionPicker
          v-model="productParams"
          :options="timeOptions"
          @change="handleProductTimeChange"
          style="margin-left: auto"
        />
      </div>
      <div ref="productChart" class="chart-container"></div>
    </div>

    <!-- 已完结情况统计 -->
    <div class="panel col-span-2">
      <div class="panel-header">
        <span class="panel-title">已完结情况统计</span>
        <el-select
          v-model="finishYAxisInterval"
          :clearable="false"
          placeholder="y轴刻度"
          style="width: 90px; margin-left: auto"
        >
          <el-option
            v-for="item in yAxisIntervalOptions"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          />
        </el-select>
        <TimeDimensionPicker
          v-model="finishParams"
          :options="timeOptionsWithoutDate"
          @change="handleFinishTimeChange"
          style="margin-left: 8px"
        />
      </div>
      <div ref="finishChart" class="chart-container mt-10"></div>
    </div>

    <!-- 需求评分统计 -->
    <div class="panel">
      <div class="panel-header">
        <span class="panel-title">需求评分统计</span>
        <el-select
          v-model="ratingYAxisInterval"
          :options="ratingYAxisIntervalOptions"
          style="width: 90px; margin-left: auto"
        >
          <el-option
            v-for="item in ratingYAxisIntervalOptions"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          />
        </el-select>
        <TimeDimensionPicker
          v-model="ratingParams"
          :options="timeOptionsWithoutDate"
          @change="handleRatingTimeChange"
          style="margin-left: auto"
        />
      </div>
      <div>
        <span>平均分：</span>
        <span id="avgScore" style="color: #a63855; font-weight: bold; font-size: 32px"></span>
        <span style="margin-left: 40px">需求数：</span>
        <span id="totalNeedCount" style="color: #a63855; font-weight: bold; font-size: 32px"></span>
      </div>
      <div ref="ratingChart" class="chart-container mt-10"></div>
    </div>

    <!-- 成员需求完成情况统计 -->
    <div class="panel col-span-3">
      <div class="panel-header">
        <span class="panel-title">成员需求完成情况统计</span>
        <el-select
          v-model="memberYAxisInterval"
          :options="memberYAxisIntervalOptions"
          style="width: 90px; margin-left: auto"
        >
          <el-option
            v-for="item in memberYAxisIntervalOptions"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          />
        </el-select>
        <TimeDimensionPicker
          v-model="memberParams"
          :options="timeOptions"
          @change="handleMemberTimeChange"
          style="margin-left: 8px"
        />
      </div>
      <div ref="memberChart" class="chart-container"></div>
    </div>
  </div>
  <SurveyFeedback />
</template>

<script setup name="demandStatistics">
  import * as echarts from 'echarts';
  import { platformApi } from '@/api';
  import MiniStatTable from '../components/common/MiniStatTable.vue';
  import TimeDimensionPicker from '../components/common/TimeDimensionPicker.vue';
  import SurveyFeedback from '../components/SurveyFeedback.vue';
  // 时间维度枚举
  const timeOptions = [
    { label: '所有时间', value: 'all' },
    { label: '年', value: 1 },
    { label: '季度', value: 2 },
    { label: '月', value: 3 },
    { label: '日', value: 4 },
  ];
  const timeOptionsWithoutDate = timeOptions.filter((o) => o.value !== 4 && o.value !== 'all');
  const statusParams = reactive({
    timeType: null,
    date: null, // 用于年、月、日
    year: null, // 用于季度
    quarter: null, // 用于季度
  });
  const deptParams = reactive({ timeType: null });
  const productParams = reactive({ timeType: null, date: null });
  const finishParams = reactive({ timeType: 1 });
  const ratingParams = reactive({ timeType: 1 });
  const memberParams = reactive({ timeType: 1 });

  // ECharts 实例引用
  const statusChart = ref(null);
  const deptChart = ref(null);
  const productChart = ref(null);
  const finishChart = ref(null);
  const ratingChart = ref(null);
  const memberChart = ref(null);
  const colorMap = {
    3: '#9E7B6B', // 执行中
    4: '#AD5F99', // 内审中
    5: '#939597', // 内审未通过
    6: '#0F4C81', // 待查收
    7: '#EFC05A', // 待反馈
    8: '#87B04B', // 已完结
  };
  // const departmentColorMap = {
  //   产品中心: '#be3455',
  //   品牌中心: '#939597',
  //   全球营销服务中心: '#9e7b6b',
  //   CDX创意设计体验中心: '#ad5f99',
  //   零售与渠道营销中心: '#0f4c81',
  //   AIOT研究院: '#efc05a',
  //   创新研究院: '#87b04b',
  // };
  let statusEchart, deptEchart, productEchart, finishEchart, ratingEchart, memberEchart;

  onMounted(() => {
    // 初始化图表实例
    statusEchart = echarts.init(statusChart.value, null, { devicePixelRatio: 2 });
    deptEchart = echarts.init(deptChart.value, null, { devicePixelRatio: 2 });
    productEchart = echarts.init(productChart.value, null, { devicePixelRatio: 2 });
    finishEchart = echarts.init(finishChart.value, null, { devicePixelRatio: 2 });
    ratingEchart = echarts.init(ratingChart.value, null, { devicePixelRatio: 2 });
    memberEchart = echarts.init(memberChart.value, null, { devicePixelRatio: 2 });

    // 首次加载
    fetchStatusData();
    fetchDeptData();
    fetchProductData();
    fetchFinishData();
    fetchRatingData();
    fetchMemberData();
  });

  const statusData = ref([]);
  const statusDataArr = computed(() =>
    statusData.value.map((d, i) => ({
      name: d.statusDesc,
      value: d.statusCount,
      color: colorMap[d.status],
    }))
  );
  async function fetchStatusData() {
    const res = await platformApi.platformDemandStaticsQueryStatusList();
    const list = res.list || [];
    statusData.value = list;
    const totalCount = list.reduce((acc, curr) => acc + curr.statusCount, 0);
    statusEchart.setOption({
      title: {
        text: totalCount.toString(),
        left: '38%',
        top: '55%',
        textAlign: 'center',
        textVerticalAlign: 'middle',
        textStyle: {
          fontSize: 36,
          fontWeight: 'bold',
          color: '#b71c1c',
        },
      },
      tooltip: { trigger: 'item', formatter: '{b}<br/>数量：{c}<br/>占比：{d}%' },
      series: [
        {
          name: '各状态需求数量',
          type: 'pie',
          radius: ['40%', '75%'],
          center: ['40%', '55%'],
          label: { show: false },
          data: list.map((item) => ({
            name: item.statusDesc,
            value: item.statusCount,
            itemStyle: {
              color: colorMap[item.status],
            },
          })),
        },
      ],
    });
  }
  const deptData = ref([]);
  const deptColors = [
    '#6667AB',
    '#939597',
    '#9E7B6B',
    '#AD5F99',
    '#0F4C81',
    '#EFC05A',
    '#87B04B',
    '#939597',
  ];
  const deptDataArr = computed(() =>
    (deptData.value || []).map((item, idx) => ({
      name: item.deptName,
      value: item.statusCount,
      color: deptColors[idx % deptColors.length],
      percent: item.rate,
    }))
  );
  async function fetchDeptData(params) {
    const res = await platformApi.platformDemandStaticsQueryDeptStatusList(params);
    const list = res.list || [];
    deptData.value = list;

    deptEchart.setOption({
      tooltip: {
        trigger: 'item',
        confine: true,
        backgroundColor: '#fff',
        borderWidth: 0,
        textStyle: { color: '#333', fontSize: 14 },
        formatter(params) {
          const dept = list[params.dataIndex];
          const color = params.color || deptColors[params.dataIndex % deptColors.length];

          let html = `
    <div style="padding:4px 8px;">
      <div style="font-weight:bold;margin-bottom:8px;color:${color};font-size:16px;">
        ${dept.deptName}
        <span style="margin:0 8px;">${dept.rate || '0.00'}%</span>
        ${dept.statusCount}
      </div>
      <div style="min-width: 160px;">
  `;

          (dept.statusList || []).forEach((status) => {
            html += `
      <div style="display:flex;align-items:center;margin-bottom:2px;">
        <span style="flex:1;">${status.statusDesc}</span>
        <span style="width:54px;text-align:right;">
          ${status.rate != null ? status.rate : '0.00'}%
        </span>
        <span style="width:36px;text-align:right;">
          ${status.statusCount}
        </span>
      </div>
    `;
          });

          html += '</div></div>';
          return html;
        },
      },
      series: [
        {
          name: '各部门需求数量',
          type: 'pie',
          radius: '75%',
          center: ['40%', '50%'],
          data: list.map((d, i) => ({
            name: d.deptName,
            value: d.statusCount,
            itemStyle: { color: deptColors[i % deptColors.length] },
          })),
          label: { show: false },
        },
      ],
    });
  }

  const STATUS = [
    { key: 'executing', name: '执行中', status: 3 },
    { key: 'internalAuditing', name: '内审中', status: 4 },
    { key: 'internalAuditNotPass', name: '内审未通过', status: 5 },
    { key: 'waitForReceipt', name: '待查收', status: 6 },
    { key: 'waitForFeedback', name: '待反馈', status: 7 },
    { key: 'end', name: '已完结', status: 8 },
  ];
  const xAxisIntervalOptions = [
    { label: '15', value: 15 },
    { label: '30', value: 30 },
    { label: '50', value: 50 },
    { label: '100', value: 100 },
  ];
  const productXAxisInterval = ref(15);
  const productChartData = ref([]);
  async function fetchProductData(params) {
    const res = await platformApi.platformDemandStaticsQueryProductStatusList(params);
    productChartData.value = res.list || [];
    renderProductChart(productChartData.value);
  }
  const yAxisIntervalOptions = [
    { label: '15', value: 15 },
    { label: '30', value: 30 },
    { label: '50', value: 50 },
    { label: '100', value: 100 },
  ];
  const perLineHeight = 40;
  const minProductChartHeight = 300;
  const productChartHeight = computed(() =>
    Math.max(minProductChartHeight, perLineHeight * (productChartData.value.length || 1))
  );
  const renderProductChart = (list) => {
    const names = list.map((item) => item.productLineName);

    const statusData = {};
    STATUS.forEach((s) => (statusData[s.key] = Array(names.length).fill(0)));

    list.forEach((item, i) => {
      STATUS.forEach((s) => {
        const statusItem = item.statusList.find((v) => v.status === s.status);
        if (statusItem) {
          statusData[s.key][i] = statusItem.statusCount || 0;
        }
      });
    });
    const maxValue = Math.max(
      ...list.map((item) => {
        return STATUS.reduce(
          (sum, s) => sum + (item.statusList.find((v) => v.status === s.status)?.statusCount || 0),
          0
        );
      })
    );
    const interval = productXAxisInterval.value;
    const axisMax = Math.ceil(maxValue / interval) * interval || interval;
    // 先算 totalCountArr
    const totalCountArr = list.map((item) => {
      if (!item.statusList) return 0;
      return item.statusList.reduce((sum, s) => sum + (s.totalCount || 0), 0);
    });
    const series = STATUS.map((s, idx) => {
      const serie = {
        name: s.name,
        type: 'bar',
        stack: 'total',
        data: statusData[s.key],
        barMaxWidth: 30,
        itemStyle: { color: colorMap[s.status] || '#ccc' },
      };
      if (idx === STATUS.length - 1) {
        serie.label = {
          show: true,
          position: 'right',
          formatter: (params) => totalCountArr[params.dataIndex] || '',
          color: '#000',
          fontSize: 14,
        };
      }
      return serie;
    });
    productEchart.resize({ height: productChartHeight.value });
    productEchart.setOption({
      grid: {
        left: 5,
        right: 40,
        top: 30,
        bottom: 30,
        containLabel: true,
      },
      dataZoom: [
        {
          type: 'slider',
          yAxisIndex: 0,
          start: 0,
          end: Math.min(100, (10 / names.length) * 100), // 默认显示10条
          orient: 'vertical',
          show: names.length > 10,
          right: 0,
          width: 16,
          handleSize: 30,
        },
      ],
      tooltip: {
        trigger: 'item',
        confine: true,
        formatter(params) {
          const productIndex = params.dataIndex;
          const productName = params.name;
          const total = STATUS.reduce((sum, s) => sum + (statusData[s.key][productIndex] || 0), 0);
          let html = `<span style="color:#d94460;font-weight:bold;">${productName}  ${total}</span><br/>`;
          STATUS.forEach((s) => {
            const value = statusData[s.key][productIndex] || 0;
            if (s.name === params.seriesName) {
              // 只有 hover 状态用 colorMap
              const color = colorMap[s.status] || '#1976d2';
              html += `<span style="font-weight:bold;color:${color};">${s.name}  ${value}</span><br/>`;
            } else {
              // 其它全部黑色
              html += `<span>${s.name}  ${value}</span><br/>`;
            }
          });
          return html;
        },
      },
      xAxis: {
        type: 'value',
        min: 0,
        max: axisMax,
        interval,
        axisLabel: {
          show: true,
          formatter: (value) => value,
          hideOverlap: false,
        },
        axisTick: { show: true },
        splitLine: { show: true },
      },
      yAxis: { type: 'category', data: names },
      series,
    });
  };
  const finishYAxisInterval = ref(15);
  const finishChartData = ref([]);
  async function fetchFinishData(params = { timeType: 1 }) {
    const res = await platformApi.platformDemandStaticsQueryFinishStaticsList(params);
    finishChartData.value = res.list || [];
    renderFinishChart(finishChartData.value);
  }
  function renderFinishChart(list) {
    const x = list.map((i) => i.timeIntDesc || `${i.timeInt}月`);
    const interval = finishYAxisInterval.value;
    const maxValue = Math.max(...list.map((i) => i.totalQty || 0), 0);
    const yAxisMax = Math.ceil(maxValue / interval) * interval || interval;
    finishEchart.setOption({
      grid: {
        top: 60,
        left: 60,
        right: 40,
        bottom: x.length === 0 ? 30 : 10,
        containLabel: true,
      },
      tooltip: {
        trigger: 'item',
        confine: true,
        formatter(params) {
          if (params.seriesType !== 'line') return '';
          const i = params.dataIndex;
          const d = list[i];

          if (params.seriesName === '及时交付率') {
            return `
      <b>总数</b> <span style="color:#be3455">${d.totalQty || 0}</span><br/>
      <div style="margin-top:4px;">
        及时交付
        <span style="display:inline-block; width: 48px; text-align:right; margin-left:12px;">${
          d.onTimeRate || 0
        }%</span>
        <span style="display:inline-block; width: 32px; text-align:right; margin-left:12px;">${
          d.onTimeQty || 0
        }</span>
      </div>
      <div style="margin-top:2px;">
        超时交付
        <span style="display:inline-block; width: 48px; text-align:right; margin-left:12px;">${
          d.lateTimeRate || 0
        }%</span>
        <span style="display:inline-block; width: 32px; text-align:right; margin-left:12px;">${
          d.lateTimeQty || 0
        }</span>
      </div>
    `;
          } else if (params.seriesName === '落地率') {
            return `
      <b>总数</b> <span style="color:#be3455">${d.totalQty || 0}</span><br/>
      <div style="margin-top:4px;">
        已落地
        <span style="display:inline-block; width: 48px; text-align:right; margin-left:12px;">${
          d.landRate || 0
        }%</span>
        <span style="display:inline-block; width: 32px; text-align:right; margin-left:12px;">${
          d.landQty || 0
        }</span>
      </div>
      <div style="margin-top:2px;">
        未落地
        <span style="display:inline-block; width: 48px; text-align:right; margin-left:12px;">${
          d.unLandRate || 0
        }%</span>
        <span style="display:inline-block; width: 32px; text-align:right; margin-left:12px;">${
          d.unLandQty || 0
        }</span>
      </div>
      <div style="margin-top:2px;">
        未反馈
        <span style="display:inline-block; width: 48px; text-align:right; margin-left:12px;">${
          d.unFeedbackRate || 0
        }%</span>
        <span style="display:inline-block; width: 32px; text-align:right; margin-left:12px;">${
          d.unFeedbackQty || 0
        }</span>
      </div>
    `;
          }
          return '';
        },
      },
      legend: { top: 20 },
      xAxis: { type: 'category', data: x },
      yAxis: [
        {
          type: 'value',
          min: 0,
          max: yAxisMax,
          interval: interval,
          splitLine: { show: false },
          axisLabel: {
            formatter: function (value) {
              // 只显示 interval 的倍数
              return value % interval === 0 ? value : '';
            },
          },
        },
        {
          type: 'value',
          name: '',
          axisLabel: { formatter: '{value}%' },
        },
      ],
      graphic: [
        {
          type: 'text',
          left: 52,
          top: 20,
          style: {
            text: '数量',
            fill: '#70727b',
          },
        },
        {
          type: 'text',
          right: 40,
          top: 20,
          style: {
            text: '百分比',
            fill: '#70727b',
          },
        },
      ],
      series: [
        {
          name: '需求数量',
          type: 'bar',
          data: list.map((i) => i.totalQty),
          yAxisIndex: 0,
          itemStyle: { color: '#be3455' },
          barWidth: 18,
          label: {
            show: true,
            position: 'top',
            color: '#222',
            fontSize: 10,
            formatter: '{c}',
            position: 'top',
          },
          tooltip: { show: false },
        },
        {
          name: '及时交付率',
          type: 'line',
          data: list.map((i) => i.onTimeRate),
          yAxisIndex: 1,
          itemStyle: { color: '#87b04b' },
          smooth: true,
          tooltip: { show: true },
        },
        {
          name: '落地率',
          type: 'line',
          data: list.map((i) => i.landRate),
          yAxisIndex: 1,
          itemStyle: { color: '#efc05a' },
          smooth: true,
          tooltip: { show: true },
        },
      ],
    });
  }
  const ratingYAxisInterval = ref(15);
  const ratingYAxisIntervalOptions = [
    { label: '15', value: 15 },
    { label: '30', value: 30 },
    { label: '50', value: 50 },
    { label: '100', value: 100 },
  ];
  async function fetchRatingData(params = { timeType: 1 }) {
    const res = await platformApi.platformDemandStaticsQueryOntimeAvgStaticsList(params);
    const { avgScore = 0, totalNeedCount = 0, list = [] } = res || {};

    const x = list.map((i) => i.timeIntDesc || '');
    const interval = ratingYAxisInterval.value;
    const maxValue = Math.max(...list.map((i) => i.needCount ?? 0), 0);
    const yAxisMax = Math.ceil(maxValue / interval) * interval || interval;
    document.querySelector('#avgScore').textContent = avgScore;
    document.querySelector('#totalNeedCount').textContent = totalNeedCount;

    ratingEchart.setOption({
      grid: { top: 60, left: 60, right: 40, containLabel: true },
      tooltip: {
        trigger: 'axis',
        confine: true,
        formatter(params) {
          const i = params[0].dataIndex;
          const d = list[i];
          let html = `平均分 ${d.avgScore ?? 0}<br/>`;
          html += `及时交付 ${d.onTimeQty ?? 0} ${(d.onTimeRate ?? 0) * 100}%<br/>`;
          return html;
        },
      },
      legend: { top: 10, right: 20 },
      xAxis: { type: 'category', data: x },
      yAxis: [
        {
          type: 'value',
          name: '',
          min: 0,
          max: yAxisMax,
          interval: interval,
          splitLine: { show: true },
        },
        {
          type: 'value',
          name: '',
          axisLabel: { formatter: '{value}%' },
          splitLine: { show: false },
        },
      ],
      series: [
        {
          name: '及时交付率',
          type: 'bar',
          data: list.map((i) => (i.onTimeRate ?? 0) * 100),
          yAxisIndex: 1,
          barGap: 0,
          barWidth: 8,
          itemStyle: { color: '#a7cc76' },
          label: { show: false },
        },
        {
          name: '需求数量',
          type: 'bar',
          data: list.map((i) => i.needCount ?? 0),
          yAxisIndex: 0,
          barWidth: 8,
          itemStyle: { color: '#a63855' },
          label: { show: false },
        },
      ],
    });
  }
  const memberYAxisInterval = ref(15);
  const memberYAxisIntervalOptions = [
    { label: '15', value: 15 },
    { label: '30', value: 30 },
    { label: '50', value: 50 },
    { label: '100', value: 100 },
  ];
  async function fetchMemberData(params) {
    const res = await platformApi.platformDemandStaticsQueryMemberFinishStaticsList(params);
    const list = res.list || [];
    const names = list.map((i) => i.memberName);
    const interval = memberYAxisInterval.value;
    const maxValue = Math.max(...list.map((i) => i.totalQty ?? 0), 0);
    const yAxisMax = Math.ceil(maxValue / interval) * interval || interval;
    memberEchart.setOption({
      tooltip: {
        trigger: 'item',
        confine: true,
        borderWidth: 0,
        padding: 10,
        backgroundColor: '#fff',
        textStyle: { color: '#333' },
        formatter(p) {
          const i = p.dataIndex;
          const d = list[i];
          const { seriesName } = p;

          // 指标名
          const labelStyle = 'color:#666;flex:0 0 86px;';
          // 百分比
          const rateStyle = 'color:#222;flex:0 0 54px;text-align:right;white-space:nowrap;';
          // 数量，加大左间隔
          const qtyStyle = 'color:#222;flex:0 0 36px;text-align:left;margin-left:14px;';

          let html = `<b><span style="color:#be3455;">${d.memberName}</span></b><br/>`;

          // 需求总数
          html += `<div style="display:flex;align-items:center;">
    <span style="color:#be3455;${labelStyle};">需求总数</span>
    <span style="${rateStyle}"></span>
    <span style="color:#be3455;${qtyStyle};">${d.totalQty ?? 0}</span>
  </div>`;

          const row = (label, rate, qty) =>
            `<div style="display:flex;align-items:center;">
      <span style="${labelStyle}">${label}</span>
      <span style="${rateStyle}">${rate}</span>
      <span style="${qtyStyle}">${qty}</span>
    </div>`;

          switch (seriesName) {
            case '及时率':
              html += row('及时交付率', `${d.onTimeRate ?? 0}%`, d.onTimeQty ?? 0);
              html += row('超时交付率', `${d.lateTimeRate ?? 0}%`, d.lateTimeQty ?? 0);
              break;
            case '落地率':
              html += row('已落地', `${d.landRate ?? 0}%`, d.landQty ?? 0);
              html += row('未落地', `${d.unLandRate ?? 0}%`, d.unLandQty ?? 0);
              html += row('未反馈', `${d.unFeedbackRate ?? 0}%`, d.unFeedbackQty ?? 0);
              break;
            case '数量':
              html += row('平均分', '', d.avgScore ?? 0);
              html += row('&lt; 85分', `${d.lowScoreRate ?? 0}%`, d.lowScoreQty ?? 0);
              html += row('≥ 85分', `${d.highScoreRate ?? 0}%`, d.highScoreQty ?? 0);
              html += row('未评分', `${d.unScoreRate ?? 0}%`, d.unScoreQty ?? 0);
              break;
          }
          return html;
        },
      },

      legend: { top: 0 },
      xAxis: { type: 'category', data: names },
      yAxis: [
        {
          type: 'value',
          name: '',
          min: 0,
          max: yAxisMax,
          interval: interval,
          splitLine: { show: true },
        },
        {
          type: 'value',
          name: '',
          axisLabel: { formatter: '{value}%' },
          max: 100,
          splitLine: { show: false },
        },
      ],
      graphic: [
        {
          type: 'text',
          left: 130,
          top: 20,
          style: {
            text: '数量',
            fill: '#70727b',
          },
        },
        {
          type: 'text',
          right: 124,
          top: 20,
          style: {
            text: '百分比',
            fill: '#70727b',
          },
        },
      ],
      series: [
        {
          name: '数量',
          type: 'bar',
          data: list.map((i) => i.totalQty ?? 0),
          yAxisIndex: 0,
          barWidth: 20,
          itemStyle: { color: '#be3455' },
          label: { show: true, position: 'top', fontSize: 10 },
        },
        {
          name: '及时率',
          type: 'bar',
          data: list.map((i) => i.onTimeRate ?? 0),
          yAxisIndex: 1,
          barWidth: 20,
          itemStyle: { color: '#87b04b' },
          label: {
            show: true,
            position: 'top',
            fontSize: 10,
            // formatter: (params) => `${params.value}%`,
          },
        },
        {
          name: '落地率',
          type: 'bar',
          data: list.map((i) => i.landRate ?? 0),
          yAxisIndex: 1,
          barWidth: 20,
          itemStyle: { color: '#0f4c81' },
          label: {
            show: true,
            position: 'top',
            fontSize: 10,
            // formatter: (params) => `${params.value}%`,
          },
        },
      ],
    });
  }
  function handleDeptTimeChange({ timeType, startDate, endDate }) {
    console.log('handleDeptTimeChange', { timeType, startDate, endDate });
    fetchDeptData({ timeType, startDate, endDate });
  }
  function handleProductTimeChange({ timeType, startDate, endDate }) {
    fetchProductData({ timeType, startDate, endDate });
  }
  function handleFinishTimeChange({ timeType, startDate, endDate }) {
    let monthStart = startDate ?? null;
    let monthEnd = endDate ?? null;
    fetchFinishData({ timeType, startTime: monthStart, endTime: monthEnd });
  }
  function handleRatingTimeChange({ timeType, startDate, endDate }) {
    let monthStart = startDate ?? null;
    let monthEnd = endDate ?? null;
    fetchRatingData({ timeType, startTime: monthStart, endTime: monthEnd });
  }
  function handleMemberTimeChange({ timeType, startDate, endDate }) {
    fetchMemberData({ timeType, startDate, endDate });
  }
  watch([productParams], fetchProductData, { deep: true });
  watch([finishParams], fetchFinishData, { deep: true });
  watch(finishYAxisInterval, () => {
    renderFinishChart(finishChartData.value);
  });
  watch(ratingYAxisInterval, () => {
    fetchRatingData();
  });
  watch(memberYAxisInterval, () => {
    fetchMemberData();
  });
  watch(productXAxisInterval, () => {
    renderProductChart(productChartData.value);
  });
  watch(ratingParams, fetchRatingData, { deep: true });
  watch(memberParams, fetchMemberData, { deep: true });
</script>

<style scoped>
  .demand-stats {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 24px;
  }

  .panel {
    overflow: auto;
    background: #fff;
    padding: 16px;
    border-radius: 8px;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
    /* min-width: 0; */
  }

  .col-span-2 {
    grid-column: span 2;
  }

  .col-span-3 {
    grid-column: span 3;
  }

  .panel-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 12px;
  }

  .panel-title {
    font-size: 16px;
    font-weight: bold;
  }

  .chart-container {
    width: 100%;
    height: 300px;
  }

  .status-chart {
    width: 80%;
    height: 320px;
    min-width: 0;
    max-width: 100%;
  }

  .status-chart-table {
    max-width: 220px;
  }
</style>
