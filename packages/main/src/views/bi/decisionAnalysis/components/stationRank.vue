<template>
  <div class="sales-data">
    <div class="sales-data__title">
      独立站排行分析
      <span class="operation">
        <!-- <el-select
          style="width: 140px; margin-right: 8px"
          v-model="type"
          placeholder="按转化率排序"
        >
          <el-option label="按转化率排序" value="1" />
          <el-option label="按销售额排序" value="2" />
          <el-option label="按毛利额排序" value="3" />
        </el-select> -->
        <el-select style="width: 80px" v-model="type" placeholder="区域">
          <el-option v-for="item of typeOptions" :label="item" :value="item" :key="item" />
        </el-select>
      </span>
    </div>
    <!-- <div class="station-overview">
      <dl>
        <dt><img src="../image/icon1.png" alt="" /></dt>
        <dd>
          <div>独立站总数</div>
          <div>174</div>
          <div>本月新增 +42</div>
        </dd>
      </dl>
      <dl>
        <dt><img src="../image/icon2.png" alt="" /></dt>
        <dd>
          <div>月活跃站点</div>
          <div>174</div>
          <div>活跃率 70.6%</div>
        </dd>
      </dl>
      <dl>
        <dt><img src="../image/icon3.png" alt="" /></dt>
        <dd>
          <div>优质站点</div>
          <div>174</div>
          <div>转化率 >3%</div>
        </dd>
      </dl>
      <dl>
        <dt><img src="../image/icon4.png" alt="" /></dt>
        <dd>
          <div>头部站点</div>
          <div>9</div>
          <div>月销售额 >50万</div>
        </dd>
      </dl>
    </div> -->
    <div class="table-container">
      <vxe-table
        :row-class-name="rowClassName"
        ref="tableRef"
        :column-config="{ resizable: false }"
        :data="dataList"
        size="mini"
      >
        <vxe-column field="categoryRankNew" title="品类排名" width="70" align="center" fixed="left">
          <template #default="{ row }">
            <span
              class="rank-tag"
              :class="{
                rank1: row.categoryRankNew === 1,
                rank2: row.categoryRankNew === 2,
                rank3: row.categoryRankNew === 3,
              }"
            >
              {{ row.categoryRankNew }}
            </span>
          </template>
        </vxe-column>
        <vxe-column min-width="180" field="domain" title="域名" fixed="left">
          <template #default="{ row }">
            <a class="domain-link" :href="`//${row.domain}`" target="_blank">{{ row.domain }}</a>
          </template>
        </vxe-column>
        <vxe-column field="countryRank" title="国家排名" min-width="70" />
        <vxe-column field="allTrafficVisits" title="月访问量(万)" min-width="110">
          <template #default="{ row }">{{ formatNumber(row.allTrafficVisits / 10000) }}</template>
        </vxe-column>
        <vxe-column field="desktopUniqueVisitors" title="独立访客(万)" min-width="100">
          <template #default="{ row }">
            {{ formatNumber((row.desktopUniqueVisitors + row.mobileUniqueVisitors) / 10000) }}
          </template>
        </vxe-column>
        <vxe-column field="占比" title="桌面与移动" min-width="80">
          <template #default="{ row }">
            <el-popover placement="top" trigger="hover">
              <template #reference>
                <div class="device-percent">
                  <span
                    class="desktop"
                    :style="{ flex: row.desktopUniqueVisitors, backgroundColor: '#02B96B' }"
                  >
                    <!-- {{ row.desktopUniqueVisitors }} -->
                  </span>
                  <span
                    class="mobile"
                    :style="{ flex: row.mobileUniqueVisitors, backgroundColor: '#FF9F22' }"
                  >
                    <!-- {{ row.mobileUniqueVisitors }} -->
                  </span>
                </div>
              </template>
              <div>
                <div>桌面：{{ formatNumber(row.desktopUniqueVisitors) }}</div>
                <div>移动：{{ formatNumber(row.mobileUniqueVisitors) }}</div>
              </div>
            </el-popover>
          </template>
        </vxe-column>
        <vxe-column field="allTrafficAverageVisitDuration" title="访问持续时间" min-width="100">
          <template #default="{ row }">
            {{ formatTime(row.allTrafficAverageVisitDuration) }}
          </template>
        </vxe-column>
        <vxe-column field="allTrafficPagesPerVisit" title="页面数/访问" min-width="90">
          <template #default="{ row }">{{ row.allTrafficPagesPerVisit.toFixed(1) }}页/次</template>
        </vxe-column>
        <vxe-column field="allTrafficBounceRate" title="跳出率" min-width="70">
          <template #default="{ row }">{{ formatPercent(row.allTrafficBounceRate) }}%</template>
        </vxe-column>
      </vxe-table>
    </div>
  </div>
</template>

<script setup lang="ts">
  import * as echarts from 'echarts/core';
  import { PieChart } from 'echarts/charts';
  import { TitleComponent, TooltipComponent } from 'echarts/components';
  // 标签自动布局、全局过渡动画等特性
  import { LabelLayout, UniversalTransition } from 'echarts/features';
  // 引入 Canvas 渲染器，注意引入 CanvasRenderer 或者 SVGRenderer 是必须的一步
  import { CanvasRenderer } from 'echarts/renderers';
  import { VxeTablePropTypes } from 'vxe-table';
  import { formatNumber, formatPercent, formatTime } from '../../utils/utils';

  echarts.use([
    TitleComponent,
    TooltipComponent,
    PieChart,
    LabelLayout,
    UniversalTransition,
    CanvasRenderer,
  ]);
  const detailData = inject('detailData', ref<any>({}));
  const dataList = computed(() => {
    // 将momcozy.com放到第一个
    const list = detailData.value.trafficAnalysis.countryRankingMap[type.value] || [];
    const index = list.findIndex((item) => item.domain === 'momcozy.com');
    if (index !== -1) {
      const [item] = list.splice(index, 1);
      list.unshift(item);
    }
    return list;
  });
  const props = defineProps({
    stationCountry: {
      type: String,
      default: '美国',
    },
  });
  const typeOptions = computed(() => {
    return Object.keys(detailData.value.trafficAnalysis.countryRankingMap);
  });
  const emits = defineEmits(['update:stationCountry']);
  const type = computed({
    get: () => props.stationCountry,
    set: (val) => {
      emits('update:stationCountry', val);
    },
  });
  const rowClassName = (params) => {
    if (params.row.domain === 'momcozy.com') {
      return 'highlight-row';
    }
    return '';
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
      margin-bottom: 20px;
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
    .station-overview {
      display: grid;
      grid-template-columns: repeat(4, 1fr);
      dl {
        display: flex;
        margin: 0 0 20px;
        gap: 20px;
        padding: 12px 24px;
        dt {
          margin: 0;
          padding-top: 10px;
          img {
            width: 36px;
            height: 36px;
            display: block;
          }
        }
        dd {
          margin: 0;
          div:nth-child(1) {
            font-size: 13px;
            font-weight: 400;
            line-height: 22px;
            color: #666666;
            margin-bottom: 6px;
          }
          div:nth-child(2) {
            font-size: 20px;
            font-weight: 700;
            line-height: 24px;
            font-family: 'DIN Blod';
            color: #000;
            margin-bottom: 10px;
          }
          div:nth-child(3) {
            font-size: 12px;
            font-weight: 400;
            line-height: 20px;
            color: #02b96b;
          }
        }
      }
    }
    .device-percent {
      width: 100%;
      height: 6px;
      display: flex;
      gap: 2px;
      padding: 2px 0;
      box-sizing: content-box;
    }
    .rank-tag {
      color: #1f1f1f;
      display: inline-block;
      padding: 4px 6px 6px 5px;
      &.rank1 {
        background: url(../image/rank1.png) no-repeat left center;
        font-family: 'DingTalk Sans';
        background-size: contain;
        color: transparent;
      }
      &.rank2 {
        background: url(../image/rank2.png) no-repeat left center;
        font-family: 'DingTalk Sans';
        background-size: contain;
        color: transparent;
      }
      &.rank3 {
        background: url(../image/rank3.png) no-repeat left center;
        font-family: 'DingTalk Sans';
        background-size: contain;
        color: transparent;
      }
    }
    .table-container {
      :deep(.vxe-body--row) {
        --vxe-table-column-padding-mini: 4px 0;
      }
    }
    .domain-link {
      color: var(---N9, #1f1f1f);
      text-decoration: none;
      &:hover {
        color: var(---P6, #02b96b);
        text-decoration: underline !important;
      }
    }
    :deep(.highlight-row) {
      .vxe-body--column {
        border-top: 1px solid var(---P6, #02b96b);
        border-bottom: 1px solid var(---P6, #02b96b);
        &:first-child {
          border-left: 1px solid var(---P6, #02b96b);
          box-shadow: 1px 0 0 0 var(---P6, #02b96b) inset;
        }
        &:last-child {
          border-right: 1px solid var(---P6, #02b96b);
        }
      }
      background: #f7fffa;
    }
  }
</style>
