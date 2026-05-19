<template>
  <div class="sales-data">
    <div class="sales-data__title">
      下钻分析
      <span class="operation">
        <el-radio-group v-model="type">
          <el-radio-button value="drillDownByArea">多维分析BY区域维度</el-radio-button>
          <el-radio-button value="drillDownByCountry">多维分析BY国家维度</el-radio-button>
          <el-radio-button value="drillDownByPlatform">多维分析BY平台维度</el-radio-button>
          <el-radio-button value="drillDownByCategory">多维分析BY品类维度</el-radio-button>
        </el-radio-group>
      </span>
    </div>
    <div class="table-container">
      <!-- <pre>{{ dataList }}</pre> -->
      <vxe-table
        ref="tableRef"
        :column-config="{ resizable: true }"
        :tree-config="treeConfig"
        :data="dataList"
        size="small"
        :round="true"
        max-height="400px"
      >
        <vxe-column
          min-width="206"
          field="name"
          title="区域/国家/平台/品类/SPU名称"
          tree-node
          fixed="left"
          :class-name="cellClassName"
        >
          <template #header>
            <template v-if="type === 'drillDownByArea'">区域/国家/平台/品类/SPU名称</template>
            <template v-if="type === 'drillDownByCountry'">国家/平台/品类/SPU名称</template>
            <template v-if="type === 'drillDownByPlatform'">平台/品类/SPU名称</template>
            <template v-if="type === 'drillDownByCategory'">品类/SPU名称/区域/国家/平台</template>
          </template>
          <template #default="{ row, level }">
            <div :style="{ paddingLeft: '10px' }" class="d-flex align-items-center gap-1">
              <img
                v-if="isCountry(level) && countryCode[row.name]"
                width="14"
                :src="`https://flagcdn.com/${countryCode[row.name].toLowerCase()}.svg`"
                crossOrigin="anonymous"
                alt=""
              />
              <span>{{ row.name }}</span>
            </div>
          </template>
        </vxe-column>
        <vxe-column
          :class-name="cellClassName"
          min-width="103"
          field="salesAmount"
          title="销售额 (万)"
          align="left"
          sortable
        >
          <template #default="{ row }">
            {{ (row.salesAmount / 10000).toFixed(2) }}
          </template>
        </vxe-column>
        <vxe-column
          :class-name="cellClassName"
          min-width="103"
          field="salesAmountRate"
          title="销售额占比"
          align="left"
          sortable
        >
          <template #default="{ row }">{{ formatPercent(row.salesAmountRate) }}%</template>
        </vxe-column>
        <vxe-column
          :class-name="cellClassName"
          min-width="115"
          field="mainBusinessIncome"
          title="营收收入 (万)"
          align="left"
          sortable
        >
          <template #default="{ row }">
            {{ (row.mainBusinessIncome / 10000).toFixed(2) }}
          </template>
        </vxe-column>
        <vxe-column
          :class-name="cellClassName"
          min-width="115"
          field="mainBusinessIn comeRate"
          title="营收收入占比"
          align="left"
          sortable
        >
          <template #default="{ row }">{{ formatPercent(row.mainBusinessIncomeRate) }}%</template>
        </vxe-column>
        <vxe-column
          :class-name="cellClassName"
          min-width="103"
          field="grossProfitAmount"
          title="毛利额 (万)"
          align="left"
          sortable
        >
          <template #default="{ row }">
            {{ (row.grossProfitAmount / 10000).toFixed(2) }}
          </template>
        </vxe-column>
        <vxe-column
          :class-name="cellClassName"
          min-width="103"
          field="grossProfitAmountRate"
          title="毛利额占比"
          align="left"
          sortable
        >
          <template #default="{ row }">{{ formatPercent(row.grossProfitAmountRate) }}%</template>
        </vxe-column>
        <vxe-column
          :class-name="cellClassName"
          min-width="79"
          field="grossProfitRate"
          title="毛利率"
          align="left"
          sortable
        >
          <template #default="{ row }">{{ formatPercent(row.grossProfitRate) }}%</template>
        </vxe-column>
        <vxe-column
          :class-name="cellClassName"
          min-width="79"
          field="refundAmountRate"
          title="退款率"
          align="left"
          sortable
        >
          <template #default="{ row }">
            <span>{{ formatPercent(row.refundAmountRate) }}%</span>
          </template>
        </vxe-column>
        <vxe-column
          :class-name="cellClassName"
          width="90"
          field="returnRate"
          title="退货率"
          align="left"
          sortable
        >
          <template #default="{ row }">
            <div
              class="returnRate"
              :class="{ disabled: !row.returnRate }"
              @click="handleOpenReturnRate(row)"
            >
              {{ formatPercent(row.returnRate) }}%
              <i
                :style="{
                  fontSize: '12px',
                  color: '#02B96B',
                }"
                class="iconfont icon-youxiu"
                v-if="row.returnRate && row.returnRate <= row.competitiveReturnRate"
              ></i>
              <i
                :style="{
                  fontSize: '12px',
                  color: '#FF9F22',
                }"
                class="iconfont icon-zhongdeng"
                v-if="row.returnRate && row.returnRate > row.competitiveReturnRate"
              ></i>
              <i
                :style="{
                  fontSize: '10px',
                }"
                class="iconfont icon-jiantouxiangyou"
                v-if="row.returnRate"
              ></i>
            </div>
          </template>
        </vxe-column>
        <vxe-column
          :class-name="cellClassName"
          min-width="103"
          field="competitiveReturnRate"
          title="竞品退货率"
          align="left"
          sortable
        >
          <template #default="{ row }">{{ formatPercent(row.competitiveReturnRate) }}%</template>
        </vxe-column>
        <vxe-column
          :class-name="cellClassName"
          min-width="94"
          field="score"
          title="评分"
          align="left"
          sortable
        >
          <template #default="{ row }">
            <div class="score-tag" :class="`score-${ScoreLevel[row.scoreLevel]}`">
              <SvgIcon v-if="row.scoreLevel" :icon="ScoreLevel[row.scoreLevel]" />
              <span class="score-text">
                {{ row.score?.toFixed(1) ?? '-' }}&nbsp;{{ row.scoreLevel }}
              </span>
            </div>
          </template>
        </vxe-column>
        <vxe-column
          :class-name="cellClassName"
          min-width="91"
          field="competitiveScore"
          title="竞对评分"
          align="left"
          sortable
        >
          <template #default="{ row }">
            {{ row.competitiveScore?.toFixed(2) ?? '-' }}
          </template>
        </vxe-column>
        <vxe-column
          :class-name="cellClassName"
          min-width="115"
          field="inventoryTurnoverDays"
          title="库存周转天数"
          align="left"
          sortable
        >
          <template #default="{ row }">
            {{ row.inventoryTurnoverDays?.toFixed(1) ?? '-' }}
          </template>
        </vxe-column>
        <vxe-column
          :class-name="cellClassName"
          min-width="114"
          field="marketShare"
          title="销售额市占率"
          align="left"
          sortable
        >
          <template #default="{ row }">
            {{ typeof row.marketShare === 'number' ? formatPercent(row.marketShare) + '%' : '-' }}
          </template>
        </vxe-column>
      </vxe-table>
    </div>
    <ReturnRate ref="drawerRef" :searchParams="props.searchParams" />
  </div>
</template>

<script setup lang="ts">
  import { useStore } from '@/store/modules/useStore';
  import { memberApi, biApi } from '@/api';
  import { useTemplateRef } from 'vue';
  import * as echarts from 'echarts/core';
  import { PieChart } from 'echarts/charts';
  import { TitleComponent, TooltipComponent } from 'echarts/components';
  // 标签自动布局、全局过渡动画等特性
  import { LabelLayout, UniversalTransition } from 'echarts/features';
  // 引入 Canvas 渲染器，注意引入 CanvasRenderer 或者 SVGRenderer 是必须的一步
  import { CanvasRenderer } from 'echarts/renderers';
  import { VxeTablePropTypes } from 'vxe-table';

  import countryCode from '../country-code.json';
  import { formatPercent } from '../../utils/utils';
  import ReturnRate from '../../returnRateAnalysis/ReturnRate.vue';

  enum ScoreLevel {
    'good' = '优秀',
    '优秀' = 'good',
    'regular' = '良好',
    '良好' = 'regular',
    'poor' = '警惕',
    '警惕' = 'poor',
  }
  echarts.use([
    TitleComponent,
    TooltipComponent,
    PieChart,
    LabelLayout,
    UniversalTransition,
    CanvasRenderer,
  ]);

  const treeConfig = ref<VxeTablePropTypes.TreeConfig<any>>({
    transform: true,
    rowField: 'id',
    parentField: 'parentId',
    lazy: true,
    hasChild: 'hasChild',
    iconOpen: 'vxe-custom--square-plus vxe-custom--square-minus',
    iconClose: 'vxe-custom--square-plus',
    loadMethod({ row }) {
      // 异步加载子节点
      return new Promise((resolve) => {
        getDimensionAnalysis(row).then((res: any) => {
          resolve(res);
        });
      });
    },
  });
  const props = defineProps<{
    searchParams: any;
  }>();
  const type = ref('drillDownByArea');
  const drillDownPath = computed(() => {
    // 区域维度
    if (type.value === 'drillDownByArea') {
      return ['area', 'country', 'platform', 'category', 'spuName'];
    }
    // 国家维度
    if (type.value === 'drillDownByCountry') {
      return ['country', 'platform', 'category', 'spuName'];
    }
    // 平台维度
    if (type.value === 'drillDownByPlatform') {
      return ['platform', 'category', 'spuName'];
    }
    // 品类维度
    if (type.value === 'drillDownByCategory') {
      return ['category', 'spuName', 'area', 'country', 'platform'];
    }
    return [];
  });
  const detailData = inject('detailData', ref<any>({}));
  const dataList = computed(() => {
    return (
      detailData.value?.drillDownAnalysis[type.value].map((item) => {
        // let id = '';
        // let hasChild = false;
        // if (item.dimensionType === 1) {
        //   id = item.area;
        //   hasChild = true;
        // } else if (item.dimensionType === 2) {
        //   id = `${item.area}${item.country}`;
        //   hasChild = true;
        // } else if (item.dimensionType === 3) {
        //   id = `${item.area}${item.country}${item.platform}`;
        //   hasChild = true;
        // } else if (item.dimensionType === 4) {
        //   id = `${item.area}${item.country}${item.platform}${item.category}`;
        //   hasChild = true;
        // } else {
        //   id = `${item.area}${item.country}${item.platform}${item.category}${item.spuName}`;
        //   hasChild = false;
        // }
        return {
          ...item,
          name: item[drillDownPath.value[0]],
          dimensionList: [
            {
              dimension: drillDownPath.value[0],
              dimensionValue: item[drillDownPath.value[0]] ?? '',
            },
          ],
          id: item[drillDownPath.value[0]],
          // level: 1,
          parentId: null,
          hasChild: true,
          children: [],
        };
      }) || []
    );
  });
  const initEcharts = (el: HTMLElement) => {
    const chart = echarts.init(el);
    const option = {
      title: {
        text: '销售额区域占比 Top5',
        left: 'left',
        textStyle: {
          color: '#1F1F1F',
          fontSize: 13,
          fontWeight: '500',
          lineHeight: 20,
        },
      },
      tooltip: {
        trigger: 'item',
      },
      color: ['#02B96B', '#258DFF', '#0CC1E2', '#A55BF5', '#FF9F22', '#EDEDED'],
      series: [
        {
          top: 18,
          name: '销售额',
          type: 'pie',
          radius: ['45%', '70%'], // 环形图
          avoidLabelOverlap: false,
          data: [
            { value: 1048, name: '直接访问' },
            { value: 735, name: '邮件营销' },
            { value: 580, name: '联盟广告' },
            { value: 484, name: '视频广告' },
            { value: 300, name: '搜索引擎' },
            { value: 100, name: '搜索引擎' },
          ],
          label: {
            show: false,
            position: 'center',
          },
          labelLine: {
            show: false,
          },
          emphasis: {
            itemStyle: {
              label: {
                show: true,
                fontSize: 40,
                fontWeight: 'bold',
              },
            },
          },
        },
      ],
    };
    chart.setOption(option);
    return chart;
  };
  // const init = () => {
  //   initEcharts(document.getElementById('sales-area') as HTMLElement);
  //   initEcharts(document.getElementById('sales-counrty') as HTMLElement);
  //   initEcharts(document.getElementById('sales-platform') as HTMLElement);
  // };
  const getDimensionAnalysis = async (row) => {
    const res: any = await biApi.biAnalysisQueryDimensionAnalysis({
      ...props.searchParams,
      dimensionList: row.dimensionList || [],
      dimensionType: row.dimensionType,
    });
    if (res) {
      return (
        res.drillDownAnalysis[type.value].map((item) => {
          const id = `${item.area}${item.country}${item.platform}${item.category}${item.spuName}`;
          let hasChild = true;
          const dimensionList = [
            ...(row.dimensionList || []),
            {
              dimension: drillDownPath.value[row.dimensionList.length],
              dimensionValue: item[drillDownPath.value[row.dimensionList.length]] ?? '',
            },
          ];
          if (dimensionList.length === drillDownPath.value.length) {
            hasChild = false;
          }
          // if (row.level === 1) {
          //   id = `${item.area}${item.country}`;
          //   hasChild = true;
          // } else if (row.level === 2) {
          //   id = `${item.area}${item.country}${item.platform}`;
          //   hasChild = true;
          // } else if (row.level === 3) {
          //   id = `${item.area}${item.country}${item.platform}${item.category}`;
          //   hasChild = true;
          // } else {
          //   id = `${item.area}${item.country}${item.platform}${item.category}${item.spuName}`;
          //   hasChild = false;
          // }
          return {
            ...item,
            id,
            name: item[drillDownPath.value[row.dimensionList.length]],
            dimensionList,
            parentId: row.id,
            hasChild,
            children: [],
          };
        }) || []
      );
    }
    return [];
  };
  const cellClassName = ({ row }) => {
    return row.hasChild ? '' : 'table--tree-node-leaf';
  };
  const drawerRef = useTemplateRef<InstanceType<typeof ReturnRate>>('drawerRef');
  const handleOpenReturnRate = (row) => {
    if (row.returnRate === null || row.returnRate === undefined) {
      return;
    }
    report(`${row.name}-退货率`);
    drawerRef.value?.open(row);
  };
  const store = useStore();
  const route = useRoute();
  const report = (eventName: string) => {
    const menuCode = store.menuCodeMap?.[route!.name! as string] || '';
    memberApi.luteosMemberSysReport({
      platform: 'ERP',
      menuCode,
      eventName,
      memberCode: String(store?.userInfo?.memberCode || ''),
      type: 'core-indicators',
      pageUrl: route?.path,
    });
  };
  const isCountry = (level) => {
    return drillDownPath.value[level] === 'country';
  };
</script>

<style scoped lang="scss">
  .sales-data {
    background: #fff;
    border-radius: 10px;
    padding: 24px;
    .sales-data__title {
      font-family: 'PingFang SC Medium', sans-serif;
      font-size: 16px;
      font-weight: 500;
      color: #1f1f1f;
      margin-bottom: 24px;
      padding-left: 8px;
      display: flex;
      align-items: center;
      &::before {
        content: '';
        display: inline-block;
        width: 4px;
        height: 16px;
        background-color: #02b96b;
        margin-right: 8px;
        border-radius: 15px;
      }
      .operation {
        margin-left: auto;
        display: flex;
        align-items: center;
        font-size: 14px;
        color: #1f1f1f;
      }
    }
    .chart-container {
      width: 100%;
      display: grid;
      gap: 20px;
      grid-template-columns: repeat(3, 1fr);
      .chart-area {
        .pie-chart {
          width: 100%;
          height: 200px;
        }
        .table-chart {
          padding: 0 26px;
        }
      }
    }
    .score-tag {
      padding: 0 4px;
      border-radius: 4px;
      font-size: 0;
      height: 20px;
      box-sizing: border-box;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 12px;
      font-style: normal;
      font-weight: 400;
      gap: 2px;
      .svg-icon {
        font-size: 10px;
        :deep(svg) {
          width: 12px;
          height: 12px;
        }
      }
    }
    .score-regular {
      background: var(---l5, #fffaeb);
      color: var(---C5, #ff9f22);
      --bs-text-muted: #ff9f22;
    }
    .score-good {
      background: var(---l4, #e8fff1);
      color: var(---C4, #02b96b);
      --bs-text-muted: #02b96b;
    }
    .score-poor {
      background: var(---l8, #ffe8f1);
      color: var(---C7, #f53f3f);
      --bs-text-muted: #f53f3f;
    }
    .returnRate:not(.disabled):hover {
      cursor: pointer;
      color: #02b96b;
    }
    .returnRate.disabled {
      cursor: not-allowed;
    }
    :deep(.table--tree-node-leaf) {
      border-bottom: 1px solid var(---N2, #f5f5f5);
      background: var(---N1, #f7f7f7);
    }
  }
</style>
