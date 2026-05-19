<template>
  <div class="core-indicators no-padding" v-loading="loading">
    <div class="core-indicators__cards">
      <!-- 销售额 -->
      <div
        class="core-indicators__card"
        :class="detailData.coreIndicator.salesAmount.amount ? 'hover' : 'disabled'"
        @click="
          () => {
            report('销售额');
            saleAnalysisVisible = true;
            saleAnalysisType = 'salesAmountTrends';
          }
        "
      >
        <div class="card-header-content">
          <div>
            <div class="card-header">
              <span class="card-title">销售额</span>
              <el-popover trigger="hover" placement="top" :max-width="600">
                <template #reference>
                  <i class="iconfont icon-xianxingtubiaoxunwen metric-tip-icon" @click.stop />
                </template>
                <div class="metric-tip-content">
                  <div>1.指标定义：{{ getMetricField('销售额').metricDefinition }}</div>
                  <div>2.数据来源：{{ getMetricField('销售额').dataSource }}</div>
                  <div>3.更新频次：{{ getMetricField('销售额').updateFreq }}</div>
                </div>
              </el-popover>
            </div>
            <div class="card-value">
              {{ formatMoneyObj(detailData.coreIndicator.salesAmount?.amount).value }}
              <span class="card-unit">
                {{ formatMoneyObj(detailData.coreIndicator.salesAmount?.amount).unit }}
              </span>
            </div>
          </div>
          <div class="card-trend">
            <CoreDataEchart
              v-if="detailData.coreIndicator.salesAmount?.trendList"
              :data="detailData.coreIndicator.salesAmount.trendList"
              color="#02B96B"
            />
          </div>
        </div>
        <div class="card-compare">
          <span>环比</span>
          <svg
            class="arrow"
            :class="[detailData.coreIndicator.salesAmount?.monthlyGrowth >= 0 ? 'up' : 'down']"
            width="12"
            height="12"
            viewBox="0 0 12 12"
          >
            <polygon points="6,2 10,8 2,8" fill="currentColor" />
          </svg>
          <span
            class="rate"
            :class="[detailData.coreIndicator.salesAmount?.monthlyGrowth >= 0 ? 'up' : 'down']"
          >
            {{ formatPercent(detailData.coreIndicator.salesAmount?.monthlyGrowth) }}%
          </span>
          <span class="divider"></span>
          <span>同比</span>
          <svg
            class="arrow"
            :class="[detailData.coreIndicator.salesAmount?.yearlyGrowth >= 0 ? 'up' : 'down']"
            width="12"
            height="12"
            viewBox="0 0 12 12"
          >
            <polygon points="6,2 10,8 2,8" fill="currentColor" />
          </svg>
          <span
            class="rate"
            :class="[detailData.coreIndicator.salesAmount?.yearlyGrowth >= 0 ? 'up' : 'down']"
          >
            {{ formatPercent(detailData.coreIndicator.salesAmount?.yearlyGrowth) }}%
          </span>
        </div>
        <el-progress
          class="card-achieve-circle"
          :percentage="
            Math.min(100, detailData.coreIndicator.salesAmount?.completionRate * 100 || 0)
          "
          :stroke-width="6"
          :color="getColor(detailData.coreIndicator.salesAmount?.healthLevel)"
          :show-text="false"
        />
        <div
          class="card-healthy"
          :class="HealthLevel[detailData.coreIndicator.salesAmount?.healthLevel]"
        >
          <div class="card-header">
            <span :style="{ color: '#999' }">销售额达成率&nbsp;</span>
            <el-popover trigger="hover" placement="top" :max-width="600">
              <template #reference>
                <i class="iconfont icon-xianxingtubiaoxunwen metric-tip-icon" @click.stop />
              </template>
              <div class="metric-tip-content">
                <div>1.指标定义：{{ getMetricField('销售额达成率').metricDefinition }}</div>
                <div>2.数据来源：{{ getMetricField('销售额达成率').dataSource }}</div>
                <div>3.更新频次：{{ getMetricField('销售额达成率').updateFreq }}</div>
              </div>
            </el-popover>
            <span>
              {{
                detailData.coreIndicator.salesAmount?.completionRate?.toLocaleString('zh-CN', {
                  style: 'percent',
                  minimumFractionDigits: 2,
                  maximumFractionDigits: 2,
                }) || '--'
              }}
            </span>
          </div>
          <span
            v-if="detailData.coreIndicator.salesAmount?.healthLevel"
            class="card-healthy-content"
          >
            <SvgIcon :icon="HealthLevel[detailData.coreIndicator.salesAmount?.healthLevel]" />
            <span>
              {{ detailData.coreIndicator.salesAmount?.healthLevel }}
            </span>
          </span>
        </div>
      </div>
      <!-- 营收收入 -->
      <div
        class="core-indicators__card"
        :class="detailData.coreIndicator.revenueAmount.amount ? 'hover' : 'disabled'"
        @click="
          () => {
            report('营收收入');
            saleAnalysisVisible = true;
            saleAnalysisType = 'mainBusinessIncomeTrends';
          }
        "
      >
        <div class="card-header-content">
          <div>
            <div class="card-header">
              <span class="card-title">营收收入</span>
              <el-popover trigger="hover" placement="top" :max-width="600">
                <template #reference>
                  <i class="iconfont icon-xianxingtubiaoxunwen metric-tip-icon" @click.stop />
                </template>
                <div class="metric-tip-content">
                  <div>1.指标定义：{{ getMetricField('营收收入').metricDefinition }}</div>
                  <div>2.数据来源：{{ getMetricField('营收收入').dataSource }}</div>
                  <div>3.更新频次：{{ getMetricField('营收收入').updateFreq }}</div>
                </div>
              </el-popover>
            </div>
            <div class="card-value">
              {{ formatMoneyObj(detailData.coreIndicator.revenueAmount?.amount).value }}
              <span class="card-unit">
                {{ formatMoneyObj(detailData.coreIndicator.revenueAmount?.amount).unit }}
              </span>
            </div>
          </div>
          <div class="card-trend">
            <CoreDataEchart
              v-if="detailData.coreIndicator.revenueAmount?.trendList"
              :data="detailData.coreIndicator.revenueAmount.trendList"
              color="#FF9F22"
            />
          </div>
        </div>
        <div class="card-compare">
          <span>环比</span>
          <svg
            class="arrow"
            :class="[detailData.coreIndicator.revenueAmount?.monthlyGrowth >= 0 ? 'up' : 'down']"
            width="12"
            height="12"
            viewBox="0 0 12 12"
          >
            <polygon points="6,2 10,8 2,8" fill="currentColor" />
          </svg>
          <span
            class="rate"
            :class="[detailData.coreIndicator.revenueAmount?.monthlyGrowth >= 0 ? 'up' : 'down']"
          >
            {{ formatPercent(detailData.coreIndicator.revenueAmount?.monthlyGrowth) }}%
          </span>
          <span class="divider"></span>
          <span>同比</span>
          <svg
            class="arrow"
            :class="[detailData.coreIndicator.revenueAmount?.yearlyGrowth >= 0 ? 'up' : 'down']"
            width="12"
            height="12"
            viewBox="0 0 12 12"
          >
            <polygon points="6,2 10,8 2,8" fill="currentColor" />
          </svg>
          <span
            class="rate"
            :class="[detailData.coreIndicator.revenueAmount?.yearlyGrowth >= 0 ? 'up' : 'down']"
          >
            {{ formatPercent(detailData.coreIndicator.revenueAmount?.yearlyGrowth) }}%
          </span>
        </div>
        <el-progress
          :percentage="
            Math.min(100, detailData.coreIndicator.revenueAmount?.completionRate * 100 || 0)
          "
          class="card-achieve-circle"
          :stroke-width="6"
          :show-text="false"
          :color="getColor(detailData.coreIndicator.revenueAmount?.healthLevel)"
        >
          <template #default>
            <div class="card-achieve-text">
              <div class="percentage-value">
                {{ formatPercent(detailData.coreIndicator.revenueAmount?.completionRate) }}%
              </div>
              <div class="percentage-label">达成率</div>
            </div>
          </template>
        </el-progress>
        <div
          class="card-healthy"
          :class="HealthLevel[detailData.coreIndicator.revenueAmount?.healthLevel]"
        >
          <div class="card-header">
            <span :style="{ color: '#999' }">营收收入达成率&nbsp;</span>
            <el-popover trigger="hover" placement="top" :max-width="600">
              <template #reference>
                <i class="iconfont icon-xianxingtubiaoxunwen metric-tip-icon" @click.stop />
              </template>
              <div class="metric-tip-content">
                <div>1.指标定义：{{ getMetricField('营收收入达成率').metricDefinition }}</div>
                <div>2.数据来源：{{ getMetricField('营收收入达成率').dataSource }}</div>
                <div>3.更新频次：{{ getMetricField('营收收入达成率').updateFreq }}</div>
              </div>
            </el-popover>
            <span>
              {{
                detailData.coreIndicator.revenueAmount?.completionRate?.toLocaleString('zh-CN', {
                  style: 'percent',
                  minimumFractionDigits: 2,
                  maximumFractionDigits: 2,
                }) || '--'
              }}
            </span>
          </div>
          <span
            v-if="detailData.coreIndicator.revenueAmount?.healthLevel"
            class="card-healthy-content"
          >
            <SvgIcon :icon="HealthLevel[detailData.coreIndicator.revenueAmount?.healthLevel]" />
            <span>
              {{ detailData.coreIndicator.revenueAmount?.healthLevel }}
            </span>
          </span>
        </div>
      </div>
      <!-- 毛利额 -->
      <div
        class="core-indicators__card"
        :class="detailData.coreIndicator.grossProfitAmount.amount ? 'hover' : 'disabled'"
        @click="
          () => {
            report('毛利额');
            saleAnalysisVisible = true;
            saleAnalysisType = 'grossProfitAmountTrends';
          }
        "
      >
        <div class="card-header-content">
          <div>
            <div class="card-header">
              <span class="card-title">毛利额</span>
              <el-popover trigger="hover" placement="top" :max-width="600">
                <template #reference>
                  <i class="iconfont icon-xianxingtubiaoxunwen metric-tip-icon" @click.stop />
                </template>
                <div class="metric-tip-content">
                  <div>1.指标定义：{{ getMetricField('毛利额').metricDefinition }}</div>
                  <div>2.数据来源：{{ getMetricField('毛利额').dataSource }}</div>
                  <div>3.更新频次：{{ getMetricField('毛利额').updateFreq }}</div>
                </div>
              </el-popover>
            </div>
            <div class="card-value">
              {{ formatMoneyObj(detailData.coreIndicator.grossProfitAmount?.amount).value }}
              <span class="card-unit">
                {{ formatMoneyObj(detailData.coreIndicator.grossProfitAmount?.amount).unit }}
              </span>
            </div>
          </div>
          <div class="card-trend">
            <CoreDataEchart
              v-if="detailData.coreIndicator.grossProfitAmount?.trendList"
              :data="detailData.coreIndicator.grossProfitAmount.trendList"
              color="#FF9F22"
            />
          </div>
        </div>
        <div class="card-compare">
          <span>环比</span>
          <svg
            class="arrow"
            :class="[
              detailData.coreIndicator.grossProfitAmount?.monthlyGrowth >= 0 ? 'up' : 'down',
            ]"
            width="12"
            height="12"
            viewBox="0 0 12 12"
          >
            <polygon points="6,2 10,8 2,8" fill="currentColor" />
          </svg>
          <span
            class="rate"
            :class="[
              detailData.coreIndicator.grossProfitAmount?.monthlyGrowth >= 0 ? 'up' : 'down',
            ]"
          >
            {{ formatPercent(detailData.coreIndicator.grossProfitAmount?.monthlyGrowth) }}%
          </span>
          <span class="divider"></span>
          <span>同比</span>
          <svg
            class="arrow"
            :class="[detailData.coreIndicator.grossProfitAmount?.yearlyGrowth >= 0 ? 'up' : 'down']"
            width="12"
            height="12"
            viewBox="0 0 12 12"
          >
            <polygon points="6,2 10,8 2,8" fill="currentColor" />
          </svg>
          <span
            class="rate"
            :class="[detailData.coreIndicator.grossProfitAmount?.yearlyGrowth >= 0 ? 'up' : 'down']"
          >
            {{ formatPercent(detailData.coreIndicator.grossProfitAmount?.yearlyGrowth) }}%
          </span>
        </div>
        <el-progress
          :percentage="
            Math.min(100, detailData.coreIndicator.grossProfitAmount?.completionRate * 100 || 0)
          "
          class="card-achieve-circle"
          :stroke-width="6"
          :show-text="false"
          :color="getColor(detailData.coreIndicator.grossProfitAmount?.healthLevel)"
        />
        <div
          class="card-healthy"
          :class="HealthLevel[detailData.coreIndicator.grossProfitAmount?.healthLevel]"
        >
          <div class="card-header">
            <span :style="{ color: '#999' }">毛利额达成率&nbsp;</span>
            <el-popover trigger="hover" placement="top" :max-width="600">
              <template #reference>
                <i class="iconfont icon-xianxingtubiaoxunwen metric-tip-icon" @click.stop />
              </template>
              <div class="metric-tip-content">
                <div>1.指标定义：{{ getMetricField('毛利额达成率').metricDefinition }}</div>
                <div>2.数据来源：{{ getMetricField('毛利额达成率').dataSource }}</div>
                <div>3.更新频次：{{ getMetricField('毛利额达成率').updateFreq }}</div>
              </div>
            </el-popover>
            <span>
              {{
                detailData.coreIndicator.grossProfitAmount?.completionRate?.toLocaleString(
                  'zh-CN',
                  {
                    style: 'percent',
                    minimumFractionDigits: 2,
                    maximumFractionDigits: 2,
                  }
                ) || '--'
              }}
            </span>
          </div>
          <span
            v-if="detailData.coreIndicator.grossProfitAmount?.healthLevel"
            class="card-healthy-content"
          >
            <SvgIcon :icon="HealthLevel[detailData.coreIndicator.grossProfitAmount?.healthLevel]" />
            <span>
              {{ detailData.coreIndicator.grossProfitAmount?.healthLevel }}
            </span>
          </span>
        </div>
      </div>
      <!-- 毛利率 -->
      <div
        class="core-indicators__card"
        :class="detailData.coreIndicator.grossProfitRate.rate ? 'hover' : 'disabled'"
        @click="
          () => {
            report('毛利率');
            saleAnalysisVisible = true;
            saleAnalysisType = 'grossProfitRateTrends';
          }
        "
      >
        <div class="card-header-content">
          <div>
            <div class="card-header">
              <span class="card-title">毛利率</span>
              <el-popover trigger="hover" placement="top" :max-width="600">
                <template #reference>
                  <i class="iconfont icon-xianxingtubiaoxunwen metric-tip-icon" @click.stop />
                </template>
                <div class="metric-tip-content">
                  <div>1.指标定义：{{ getMetricField('毛利率').metricDefinition }}</div>
                  <div>2.数据来源：{{ getMetricField('毛利率').dataSource }}</div>
                  <div>3.更新频次：{{ getMetricField('毛利率').updateFreq }}</div>
                </div>
              </el-popover>
            </div>
            <div class="card-value">
              {{ formatPercent(detailData.coreIndicator.grossProfitRate?.rate) }}
              <span class="card-unit">%</span>
            </div>
          </div>
          <div class="card-trend">
            <CoreDataEchart
              v-if="detailData.coreIndicator.grossProfitRate?.trendList"
              :data="detailData.coreIndicator.grossProfitRate.trendList"
              color="#F53F3F"
            />
          </div>
        </div>
        <div class="card-compare">
          <span>环比</span>
          <svg
            class="arrow"
            :class="[detailData.coreIndicator.grossProfitRate?.monthlyGrowth >= 0 ? 'up' : 'down']"
            width="12"
            height="12"
            viewBox="0 0 12 12"
          >
            <polygon points="6,2 10,8 2,8" fill="currentColor" />
          </svg>
          <span
            class="rate"
            :class="[detailData.coreIndicator.grossProfitRate?.monthlyGrowth >= 0 ? 'up' : 'down']"
          >
            {{ formatPercent(detailData.coreIndicator.grossProfitRate?.monthlyGrowth) }}%
          </span>
          <span class="divider"></span>
          <span>同比</span>
          <svg
            class="arrow"
            :class="[detailData.coreIndicator.grossProfitRate?.yearlyGrowth >= 0 ? 'up' : 'down']"
            width="12"
            height="12"
            viewBox="0 0 12 12"
          >
            <polygon points="6,2 10,8 2,8" fill="currentColor" />
          </svg>
          <span
            class="rate"
            :class="[detailData.coreIndicator.grossProfitRate?.yearlyGrowth >= 0 ? 'up' : 'down']"
          >
            {{ formatPercent(detailData.coreIndicator.grossProfitRate?.yearlyGrowth) }}%
          </span>
        </div>
        <div class="card-footer">
          <div class="card-compare">
            <span>目标&nbsp;</span>
            <span class="rate">
              {{ formatPercent(detailData.coreIndicator.grossProfitRate?.budgetRate) }}%
            </span>
            <span class="divider"></span>
            <span>差值</span>
            <svg
              class="arrow"
              :class="[detailData.coreIndicator.grossProfitRate?.diff >= 0 ? 'up' : 'down']"
              width="12"
              height="12"
              viewBox="0 0 12 12"
            >
              <polygon points="6,2 10,8 2,8" fill="currentColor" />
            </svg>
            <span
              class="rate"
              :class="[detailData.coreIndicator.grossProfitRate?.diff >= 0 ? 'up' : 'down']"
            >
              {{ formatPercent(detailData.coreIndicator.grossProfitRate?.diff) }}%
            </span>
          </div>
          <div
            v-if="detailData.coreIndicator.grossProfitRate?.healthLevel"
            class="card-healthy"
            :class="HealthLevel[detailData.coreIndicator.grossProfitRate?.healthLevel]"
          >
            <span class="card-healthy-content">
              <SvgIcon :icon="HealthLevel[detailData.coreIndicator.grossProfitRate?.healthLevel]" />
              <span>
                {{ detailData.coreIndicator.grossProfitRate?.healthLevel }}
              </span>
            </span>
          </div>
        </div>
      </div>
      <!-- 退款率 -->
      <div
        class="core-indicators__card"
        :class="detailData.coreIndicator.refundRate.rate ? 'hover' : 'disabled'"
        @click="
          () => {
            report('退款率');
            refundRateVisible = true;
          }
        "
      >
        <div class="card-header-content">
          <div>
            <div class="card-header">
              <span class="card-title">退款率</span>
              <el-popover trigger="hover" placement="top" :max-width="600">
                <template #reference>
                  <i class="iconfont icon-xianxingtubiaoxunwen metric-tip-icon" @click.stop />
                </template>
                <div class="metric-tip-content">
                  <div>1.指标定义：{{ getMetricField('退款率').metricDefinition }}</div>
                  <div>2.数据来源：{{ getMetricField('退款率').dataSource }}</div>
                  <div>3.更新频次：{{ getMetricField('退款率').updateFreq }}</div>
                </div>
              </el-popover>
            </div>
            <div class="card-value">
              {{ formatPercent(detailData.coreIndicator.refundRate?.rate) }}
              <span class="card-unit">%</span>
            </div>
          </div>
          <div class="card-trend">
            <CoreDataEchart
              v-if="detailData.coreIndicator.refundRate?.trendList"
              :data="detailData.coreIndicator.refundRate.trendList"
              color="#02B96B"
            />
          </div>
        </div>
        <div class="card-compare">
          <span>环比</span>
          <svg
            class="arrow"
            :class="[detailData.coreIndicator.refundRate?.monthlyGrowth >= 0 ? 'up' : 'down']"
            width="12"
            height="12"
            viewBox="0 0 12 12"
          >
            <polygon points="6,2 10,8 2,8" fill="currentColor" />
          </svg>
          <span
            class="rate"
            :class="[detailData.coreIndicator.refundRate?.monthlyGrowth >= 0 ? 'up' : 'down']"
          >
            {{ formatPercent(detailData.coreIndicator.refundRate?.monthlyGrowth) }}%
          </span>
          <span class="divider"></span>
          <span>同比</span>
          <svg
            class="arrow"
            :class="[detailData.coreIndicator.refundRate?.yearlyGrowth >= 0 ? 'up' : 'down']"
            width="12"
            height="12"
            viewBox="0 0 12 12"
          >
            <polygon points="6,2 10,8 2,8" fill="currentColor" />
          </svg>
          <span
            class="rate"
            :class="[detailData.coreIndicator.refundRate?.yearlyGrowth >= 0 ? 'up' : 'down']"
          >
            {{ formatPercent(detailData.coreIndicator.refundRate?.yearlyGrowth) }}%
          </span>
        </div>
        <div class="card-footer">
          <div class="card-compare">
            <span>目标&nbsp;</span>
            <span class="rate">
              {{ formatPercent(detailData.coreIndicator.refundRate?.budgetRate) }}%
            </span>
            <span class="divider"></span>
            <span>差值</span>
            <svg
              class="arrow"
              :class="[detailData.coreIndicator.refundRate?.diff >= 0 ? 'up' : 'down']"
              width="12"
              height="12"
              viewBox="0 0 12 12"
            >
              <polygon points="6,2 10,8 2,8" fill="currentColor" />
            </svg>
            <span
              class="rate"
              :class="[detailData.coreIndicator.refundRate?.diff >= 0 ? 'up' : 'down']"
            >
              {{ formatPercent(detailData.coreIndicator.refundRate?.diff) }}%
            </span>
          </div>
          <div
            v-if="detailData.coreIndicator.refundRate?.healthLevel"
            class="card-healthy"
            :class="HealthLevel[detailData.coreIndicator.refundRate?.healthLevel]"
          >
            <span class="card-healthy-content">
              <SvgIcon :icon="HealthLevel[detailData.coreIndicator.refundRate?.healthLevel]" />
              <span>
                {{ detailData.coreIndicator.refundRate?.healthLevel }}
              </span>
            </span>
          </div>
        </div>
      </div>
      <!-- 客单价 -->
      <div class="core-indicators__card">
        <div class="card-header-content">
          <div>
            <div class="card-header">
              <span class="card-title">客单价</span>
              <el-popover trigger="hover" placement="top" :max-width="600">
                <template #reference>
                  <i class="iconfont icon-xianxingtubiaoxunwen metric-tip-icon" @click.stop />
                </template>
                <div class="metric-tip-content">
                  <div>1.指标定义：{{ getMetricField('客单价').metricDefinition }}</div>
                  <div>2.数据来源：{{ getMetricField('客单价').dataSource }}</div>
                  <div>3.更新频次：{{ getMetricField('客单价').updateFreq }}</div>
                </div>
              </el-popover>
            </div>
            <div class="card-value">
              {{
                [undefined, null].includes(detailData.coreIndicator.averageOrderAmount?.amount)
                  ? '-'
                  : Math.ceil(detailData.coreIndicator.averageOrderAmount.amount)
              }}
              <span class="card-unit">元</span>
            </div>
          </div>
          <div class="card-trend">
            <CoreDataEchart
              v-if="detailData.coreIndicator.averageOrderAmount?.trendList"
              :data="detailData.coreIndicator.averageOrderAmount.trendList"
              color="#FF9F22"
            />
          </div>
        </div>
        <div class="card-compare">
          <span>环比</span>
          <svg
            class="arrow"
            :class="[
              detailData.coreIndicator.averageOrderAmount?.monthlyGrowth >= 0 ? 'up' : 'down',
            ]"
            width="12"
            height="12"
            viewBox="0 0 12 12"
          >
            <polygon points="6,2 10,8 2,8" fill="currentColor" />
          </svg>
          <span
            class="rate"
            :class="[
              detailData.coreIndicator.averageOrderAmount?.monthlyGrowth >= 0 ? 'up' : 'down',
            ]"
          >
            {{ formatPercent(detailData.coreIndicator.averageOrderAmount?.monthlyGrowth) }}%
          </span>
          <span class="divider"></span>
          <span>同比</span>
          <svg
            class="arrow"
            :class="[
              detailData.coreIndicator.averageOrderAmount?.yearlyGrowth >= 0 ? 'up' : 'down',
            ]"
            width="12"
            height="12"
            viewBox="0 0 12 12"
          >
            <polygon points="6,2 10,8 2,8" fill="currentColor" />
          </svg>
          <span
            class="rate"
            :class="[
              detailData.coreIndicator.averageOrderAmount?.yearlyGrowth >= 0 ? 'up' : 'down',
            ]"
          >
            {{ formatPercent(detailData.coreIndicator.averageOrderAmount?.yearlyGrowth) }}%
          </span>
        </div>
      </div>
      <!-- 复购率 -->
      <div
        class="core-indicators__card"
        :class="detailData.coreIndicator.repurchaseRate.rate ? 'hover' : 'disabled'"
        @click="
          () => {
            brandAnalysisVisible = true;
            report('复购率');
          }
        "
      >
        <div class="card-header-content">
          <div>
            <div class="card-header">
              <span class="card-title">复购率</span>
              <el-popover trigger="hover" placement="top" :max-width="600">
                <template #reference>
                  <i class="iconfont icon-xianxingtubiaoxunwen metric-tip-icon" @click.stop />
                </template>
                <div class="metric-tip-content">
                  <div>1.指标定义：{{ getMetricField('复购率').metricDefinition }}</div>
                  <div>2.数据来源：{{ getMetricField('复购率').dataSource }}</div>
                  <div>3.更新频次：{{ getMetricField('复购率').updateFreq }}</div>
                </div>
              </el-popover>
            </div>
            <div class="card-value">
              {{ formatPercent(detailData.coreIndicator.repurchaseRate?.rate) }}
              <span class="card-unit">%</span>
            </div>
          </div>
          <div class="card-trend">
            <CoreDataEchart
              v-if="detailData.coreIndicator.repurchaseRate?.trendList"
              :data="detailData.coreIndicator.repurchaseRate.trendList"
              color="#02B96B"
            />
          </div>
        </div>
        <div class="card-compare">
          <span>环比</span>
          <svg
            class="arrow"
            :class="[detailData.coreIndicator.repurchaseRate?.monthlyGrowth >= 0 ? 'up' : 'down']"
            width="12"
            height="12"
            viewBox="0 0 12 12"
          >
            <polygon points="6,2 10,8 2,8" fill="currentColor" />
          </svg>
          <span
            class="rate"
            :class="[detailData.coreIndicator.repurchaseRate?.monthlyGrowth >= 0 ? 'up' : 'down']"
          >
            {{ formatPercent(detailData.coreIndicator.repurchaseRate?.monthlyGrowth) }}%
          </span>
          <span class="divider"></span>
          <span>同比</span>
          <svg
            class="arrow"
            :class="[detailData.coreIndicator.repurchaseRate?.yearlyGrowth >= 0 ? 'up' : 'down']"
            width="12"
            height="12"
            viewBox="0 0 12 12"
          >
            <polygon points="6,2 10,8 2,8" fill="currentColor" />
          </svg>
          <span
            class="rate"
            :class="[detailData.coreIndicator.repurchaseRate?.yearlyGrowth >= 0 ? 'up' : 'down']"
          >
            {{ formatPercent(detailData.coreIndicator.repurchaseRate?.yearlyGrowth) }}%
          </span>
        </div>
      </div>
      <!-- 库存周转天数 -->
      <div
        class="core-indicators__card"
        :class="detailData.coreIndicator.inventoryTurnoverDays.amount ? 'hover' : 'disabled'"
        @click="
          () => {
            drawerVisible = true;
            report('库存周转天数');
          }
        "
      >
        <div class="card-header-content">
          <div>
            <div class="card-header">
              <span class="card-title">库存周转天数</span>
              <el-popover trigger="hover" placement="top" :max-width="600">
                <template #reference>
                  <i class="iconfont icon-xianxingtubiaoxunwen metric-tip-icon" @click.stop />
                </template>
                <div class="metric-tip-content">
                  <div>1.指标定义：{{ getMetricField('库存周转天数').metricDefinition }}</div>
                  <div>2.数据来源：{{ getMetricField('库存周转天数').dataSource }}</div>
                  <div>3.更新频次：{{ getMetricField('库存周转天数').updateFreq }}</div>
                </div>
              </el-popover>
            </div>
            <div class="card-value">
              {{ formatNumber(detailData.coreIndicator.inventoryTurnoverDays?.amount, 1) }}
            </div>
          </div>
          <div class="card-trend">
            <CoreDataEchart
              v-if="detailData.coreIndicator.inventoryTurnoverDays?.trendList"
              :data="detailData.coreIndicator.inventoryTurnoverDays.trendList"
              color="#02B96B"
            />
          </div>
        </div>
        <div class="card-compare">
          <span>环比</span>
          <svg
            class="arrow"
            :class="[
              detailData.coreIndicator.inventoryTurnoverDays?.monthlyGrowth >= 0 ? 'up' : 'down',
            ]"
            width="12"
            height="12"
            viewBox="0 0 12 12"
          >
            <polygon points="6,2 10,8 2,8" fill="currentColor" />
          </svg>
          <span
            class="rate"
            :class="[
              detailData.coreIndicator.inventoryTurnoverDays?.monthlyGrowth >= 0 ? 'up' : 'down',
            ]"
          >
            {{ formatPercent(detailData.coreIndicator.inventoryTurnoverDays?.monthlyGrowth) }}%
          </span>
          <span class="divider"></span>
          <span>同比</span>
          <svg
            class="arrow"
            :class="[
              detailData.coreIndicator.inventoryTurnoverDays?.yearlyGrowth >= 0 ? 'up' : 'down',
            ]"
            width="12"
            height="12"
            viewBox="0 0 12 12"
          >
            <polygon points="6,2 10,8 2,8" fill="currentColor" />
          </svg>
          <span
            class="rate"
            :class="[
              detailData.coreIndicator.inventoryTurnoverDays?.yearlyGrowth >= 0 ? 'up' : 'down',
            ]"
          >
            {{ formatPercent(detailData.coreIndicator.inventoryTurnoverDays?.yearlyGrowth) }}%
          </span>
        </div>
      </div>
      <!-- 品牌声量 -->
      <div
        class="core-indicators__card"
        :class="detailData.coreIndicator.brandVoiceCount.count ? 'hover' : 'disabled'"
        @click="
          () => {
            brandAnalysisVisible = true;
            report('品牌声量');
          }
        "
      >
        <div class="card-header-content">
          <div>
            <div class="card-header">
              <span class="card-title">品牌声量</span>
              <el-popover trigger="hover" placement="top" :max-width="600">
                <template #reference>
                  <i class="iconfont icon-xianxingtubiaoxunwen metric-tip-icon" @click.stop />
                </template>
                <div class="metric-tip-content">
                  <div>1.指标定义：{{ getMetricField('品牌声量').metricDefinition }}</div>
                  <div>2.数据来源：{{ getMetricField('品牌声量').dataSource }}</div>
                  <div>3.更新频次：{{ getMetricField('品牌声量').updateFreq }}</div>
                </div>
              </el-popover>
            </div>
            <div class="card-value">
              {{ formatNumber(detailData.coreIndicator.brandVoiceCount?.count) }}
            </div>
          </div>
          <div class="card-trend">
            <CoreDataEchart
              v-if="detailData.coreIndicator.brandVoiceCount?.trendList"
              :data="detailData.coreIndicator.brandVoiceCount.trendList"
              color="#02B96B"
            />
          </div>
        </div>
        <div class="card-compare">
          <span>环比</span>
          <svg
            class="arrow"
            :class="[detailData.coreIndicator.brandVoiceCount?.monthlyGrowth >= 0 ? 'up' : 'down']"
            width="12"
            height="12"
            viewBox="0 0 12 12"
          >
            <polygon points="6,2 10,8 2,8" fill="currentColor" />
          </svg>
          <span
            class="rate"
            :class="[detailData.coreIndicator.brandVoiceCount?.monthlyGrowth >= 0 ? 'up' : 'down']"
          >
            {{ formatPercent(detailData.coreIndicator.brandVoiceCount?.monthlyGrowth) }}%
          </span>
          <span class="divider"></span>
          <span>同比</span>
          <svg
            class="arrow"
            :class="[detailData.coreIndicator.brandVoiceCount?.yearlyGrowth >= 0 ? 'up' : 'down']"
            width="12"
            height="12"
            viewBox="0 0 12 12"
          >
            <polygon points="6,2 10,8 2,8" fill="currentColor" />
          </svg>
          <span
            class="rate"
            :class="[detailData.coreIndicator.brandVoiceCount?.yearlyGrowth >= 0 ? 'up' : 'down']"
          >
            {{ formatPercent(detailData.coreIndicator.brandVoiceCount?.yearlyGrowth) }}%
          </span>
        </div>
      </div>
      <!-- 品牌注册用户数 -->
      <div
        class="core-indicators__card"
        :class="detailData.coreIndicator.customerCount.count ? 'hover' : 'disabled'"
        @click="
          () => {
            brandAnalysisVisible = true;
            report('品牌注册用户数');
          }
        "
      >
        <div class="card-header-content">
          <div>
            <div class="card-header">
              <span class="card-title">新增品牌注册用户数</span>
              <el-popover trigger="hover" placement="top" :max-width="600">
                <template #reference>
                  <i class="iconfont icon-xianxingtubiaoxunwen metric-tip-icon" @click.stop />
                </template>
                <div class="metric-tip-content">
                  <div>1.指标定义：{{ getMetricField('新增品牌注册用户数').metricDefinition }}</div>
                  <div>2.数据来源：{{ getMetricField('新增品牌注册用户数').dataSource }}</div>
                  <div>3.更新频次：{{ getMetricField('新增品牌注册用户数').updateFreq }}</div>
                </div>
              </el-popover>
            </div>
            <div class="card-value">
              {{ formatNumber(detailData.coreIndicator.customerCount.count) }}
            </div>
          </div>
          <div class="card-trend">
            <CoreDataEchart
              v-if="detailData.coreIndicator.customerCount?.trendList"
              :data="detailData.coreIndicator.customerCount.trendList"
              color="#02B96B"
            />
          </div>
        </div>
        <div class="card-compare">
          <span>环比</span>
          <svg
            class="arrow"
            :class="[detailData.coreIndicator.customerCount?.monthlyGrowth >= 0 ? 'up' : 'down']"
            width="12"
            height="12"
            viewBox="0 0 12 12"
          >
            <polygon points="6,2 10,8 2,8" fill="currentColor" />
          </svg>
          <span
            class="rate"
            :class="[detailData.coreIndicator.customerCount?.monthlyGrowth >= 0 ? 'up' : 'down']"
          >
            {{ formatPercent(detailData.coreIndicator.customerCount?.monthlyGrowth) }}%
          </span>
          <span class="divider"></span>
          <span>同比</span>
          <svg
            class="arrow"
            :class="[detailData.coreIndicator.customerCount?.yearlyGrowth >= 0 ? 'up' : 'down']"
            width="12"
            height="12"
            viewBox="0 0 12 12"
          >
            <polygon points="6,2 10,8 2,8" fill="currentColor" />
          </svg>
          <span
            class="rate"
            :class="[detailData.coreIndicator.customerCount?.yearlyGrowth >= 0 ? 'up' : 'down']"
          >
            {{ formatPercent(detailData.coreIndicator.customerCount?.yearlyGrowth) }}%
          </span>
        </div>
      </div>
    </div>
    <InventoryTurnoverDays
      v-if="drawerVisible"
      v-model="drawerVisible"
      :searchParams="searchParams"
    />
    <RefundRate v-if="refundRateVisible" v-model="refundRateVisible" :searchParams="searchParams" />
    <SaleAnalysis
      v-if="saleAnalysisVisible"
      v-model="saleAnalysisVisible"
      :type="saleAnalysisType"
      :searchParams="searchParams"
    />
    <BrandAnalysis
      v-if="brandAnalysisVisible"
      v-model="brandAnalysisVisible"
      :searchParams="searchParams"
    />
  </div>
</template>

<script setup lang="ts">
  import { useStore } from '@/store/modules/useStore';
  import { biApi, memberApi } from '@/api';
  import { formatNumber, formatMoneyObj, formatPercent } from '../../utils/utils';
  import { HealthLevel } from '../types';
  import InventoryTurnoverDays from '../../inventoryAnalysis/InventoryTurnoverDays.vue';
  import CoreDataEchart from '../../components/trendEcharts.vue';
  import RefundRate from '../../refundRate/RefundRate.vue';
  import SaleAnalysis from '../../saleAnalysis/SaleAnalysis.vue';
  import BrandAnalysis from '../../brandAnalysis/BrandAnalysis.vue';

  const props = defineProps<{
    searchParams: Record<string, any>;
  }>();
  const drawerVisible = ref(false);
  const refundRateVisible = ref(false);
  const saleAnalysisVisible = ref(false);
  const brandAnalysisVisible = ref(false);
  // 销售分析类型
  const saleAnalysisType = ref<string>('salesAmountTrends');
  const detailData: any = inject('detailData');
  const loading = inject('loading', ref(false));
  const metricMap = ref<Record<string, Record<string, string>>>({});

  const colorMap = {
    red: '#F53F3F',
    green: '#02B96B',
    origin: '#FF9F22',
  };
  const getColor = (num: string) => {
    switch (num) {
      case HealthLevel.good:
        return colorMap.green;
      case HealthLevel.poor:
        return colorMap.red;
      case HealthLevel.regular:
      default:
        return colorMap.origin;
    }
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

  const buildMetricMap = (metricList: Record<string, any>[] = []) => {
    const nextMap: Record<string, Record<string, string>> = {};
    metricList.forEach((item) => {
      const metricName = item?.metric;
      if (!metricName) return;
      nextMap[metricName] = {
        metricDefinition: item?.metricDefinition || '',
        dataSource: item?.dataSource || '',
        updateFreq: item?.updateFreq || '',
      };
    });
    metricMap.value = nextMap;
  };

  const getMetricField = (metricName: string) => {
    const metricInfo = metricMap.value[metricName] || {};
    return metricInfo;
  };

  onMounted(() => {
    biApi.biCommonQueryMetric({ page: '经营驾驶舱' }).then((res) => {
      buildMetricMap(res?.metricDefinitionList || []);
    });
  });
</script>

<style scoped lang="scss">
  .core-indicators {
    background: #fff;
    border-radius: 10px;
    padding: 24px;
    &.no-padding {
      padding: 0;
      background-color: transparent;
    }
    .core-indicators__title {
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
    }
    .core-indicators__cards {
      display: grid;
      grid-template-columns: repeat(5, 1fr);
      flex-wrap: wrap;
      gap: 17px;
    }
    .core-indicators__card {
      background: #fafafa;
      border-radius: 10px;
      padding: 14px 20px;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      position: relative;
      background-color: #ffffff;
      box-sizing: border-box;
      position: relative;
      overflow: hidden;
      &.hover:hover {
        cursor: pointer;
        box-shadow: 0px 6px 36px 0px rgba(6, 8, 27, 0.08);
        &::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 3px;
          background: var(---P6, #02b96b);
          border-radius: 10px;
        }
      }
      &.disabled {
        cursor: not-allowed;
        opacity: 0.6;
        pointer-events: none;
      }
      .card-header-content {
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-bottom: 12px;
      }
      .card-header {
        display: flex;
        align-items: center;
        .card-title {
          font-size: 13px;
          color: #666;
          margin-right: 4px;
          line-height: 22px;
        }
        .metric-tip-icon {
          color: #999;
          font-size: 15px;
          cursor: pointer;
          margin-right: 4px;
        }
      }
      .card-trend {
        flex: none;
        width: 83px;
        height: 51px;
      }
      .card-value {
        font-family: DIN Blod;
        font-size: 24px;
        line-height: 26px;
        font-weight: 400;
        color: var(---N9, #1f1f1f);
        margin-top: 8px;
        .card-unit {
          font-family: 'PingFang SC Medium';
          font-size: 14px;
          line-height: 22px;
          color: var(---N9, #1f1f1f);
          font-weight: 500;
        }
      }
      .card-footer {
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-top: 10px;
      }
      .card-compare {
        display: flex;
        align-items: center;
        font-size: 12px;
        line-height: 20px;
        font-weight: 400;
        color: #666;
        white-space: nowrap;
        .arrow {
          margin: 0 2px;
          &.up {
            margin-top: 2px;
            color: #f53f3f;
          }
          &.down {
            color: #02b96b;
            transform: rotate(180deg);
          }
        }
        .rate {
          &.up {
            color: #f53f3f;
          }
          &.down {
            color: #02b96b;
          }
        }
        .divider {
          width: 1px;
          height: 12px;
          background: #d9d9d9;
          margin: 0 8px;
        }
      }

      .card-process {
        height: 6px;
        background: #ededed;
        border-radius: 29px;
        margin-bottom: 10px;
        position: relative;
        display: none;
        &::before {
          position: absolute;
          content: '';
          display: block;
          width: var(--bar-width, 0%);
          height: 100%;
          background-color: var(--bar-color, transparent);
          border-radius: 29px;
          top: 0;
          transition: width 0.3s ease;
        }
      }
      .card-healthy {
        color: var(---N6, #999);
        font-size: 12px;
        font-style: normal;
        font-weight: 400;
        line-height: 20px; /* 166.667% */
        display: flex;
        align-items: center;
        justify-content: space-between;
        &.good {
          color: #02b96b;
          --bs-text-muted: #02b96b;
        }
        &.regular {
          color: #ff9f22;
          --bs-text-muted: #ff9f22;
        }
        &.poor {
          color: #f53f3f;
          --bs-text-muted: #f53f3f;
        }
        .card-healthy-content {
          display: flex;
          align-items: center;
          column-gap: 4px;
        }
      }
      .card-achieve {
        display: flex;
        font-size: 12px;
        line-height: 20px;
        color: #999;
        .achieve-value {
          color: #ff9f22;
          margin: 0 6px;
        }
        .status {
          flex: 1;
          justify-content: end;
          display: flex;
          align-items: center;
          font-weight: 500;
          gap: 4px;
          svg {
            margin-right: 2px;
          }
        }
      }
      .card-achieve-circle {
        margin-top: 10px;
        margin-bottom: 8px;
        .card-achieve-text {
          color: var(---N9, #1f1f1f);
          font-size: 10px;
          font-style: normal;
          font-weight: 400;
          line-height: 18px; /* 180% */
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
        }
      }
    }
  }
</style>
<style lang="scss">
  .metric-tip-content {
    font-size: 13px;
    line-height: 22px;
    color: #666;
  }
</style>