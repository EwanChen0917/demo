<template>
  <BiCard title="VOC核心指标">
    <div class="core-point-cards">
      <!-- 销量 -->
      <div class="core-point-card">
        <div class="core-point-main">
          <div class="core-point">
            <div class="title">
              <span>销量</span>
              <el-tooltip
                effect="dark"
                content="统计周期内商品销量"
                placement="top"
                popper-style="max-width: 400px"
              >
                <i class="iconfont icon-xianxingtubiaoxunwen"></i>
              </el-tooltip>
            </div>
            <PointValue :data="data.salesQty?.currentValue" />
          </div>
          <div class="point-trend">
            <TrendEcharts
              label="销量"
              :data="normalizeTrendData(data.salesQty?.trendList) || []"
              color="#02B96B"
            />
          </div>
        </div>
        <div class="core-point-footer">
          <div class="core-point-footer-item">
            <span class="label">上期</span>
            <span>{{ formatNumberObj(data.salesQty?.previousValue) }}</span>
          </div>
          <div class="gap"></div>
          <div class="core-point-footer-item">
            <span class="label">环比</span>
            <span>
              {{ formatRate(data.salesQty?.dateOverChange, { maximumFractionDigits: 2 }) }}
            </span>
          </div>
        </div>
      </div>
      <!-- VOC量 -->
      <div class="core-point-card">
        <div class="core-point-main">
          <div class="core-point">
            <div class="title">
              <span>VOC量</span>
              <el-tooltip
                effect="dark"
                content="各平台用户反馈总条数（含评价、投诉、建议等，不限于差评）。"
                placement="top"
                popper-style="max-width: 400px"
              >
                <i class="iconfont icon-xianxingtubiaoxunwen"></i>
              </el-tooltip>
            </div>
            <PointValue :data="data.vocCount?.currentValue" />
          </div>
          <div class="point-trend">
            <TrendEcharts
              label="VOC量"
              :data="normalizeTrendData(data.vocCount?.trendList) || []"
              color="#02B96B"
            />
          </div>
        </div>
        <div class="core-point-footer">
          <div class="core-point-footer-item">
            <span class="label">上期</span>
            <span>{{ formatNumberObj(data.vocCount?.previousValue) }}</span>
          </div>
          <div class="gap"></div>
          <div class="core-point-footer-item">
            <span class="label">环比</span>
            <span>
              {{ formatRate(data.vocCount?.dateOverChange, { maximumFractionDigits: 2 }) }}
            </span>
          </div>
        </div>
      </div>
      <!-- VOC率 -->
      <div class="core-point-card">
        <div class="core-point-main">
          <div class="core-point">
            <div class="title">
              <span>VOC率</span>
              <el-tooltip
                effect="dark"
                content="VOC量与销量的比率"
                placement="top"
                popper-style="max-width: 400px"
              >
                <i class="iconfont icon-xianxingtubiaoxunwen"></i>
              </el-tooltip>
            </div>
            <PointValue :data="data.vocRate?.currentValue" is-rate />
          </div>
          <div class="point-trend">
            <TrendEcharts
              label="VOC率"
              isRate
              :data="normalizeTrendData(data.vocRate?.trendList)"
              color="#02B96B"
            />
          </div>
        </div>
        <div class="core-point-footer">
          <div class="core-point-footer-item">
            <span class="label">上期</span>
            <span>
              {{
                formatRate(data.vocRate?.previousValue, {
                  maximumFractionDigits: 2,
                })
              }}
            </span>
          </div>
          <div class="gap"></div>
          <div class="core-point-footer-item">
            <span class="label">环比差值</span>
            <span>
              {{ formatRate(data.vocRate?.dateOverChange, { maximumFractionDigits: 2 }) }}
            </span>
          </div>
        </div>
      </div>
      <!-- 退货率 -->
      <div class="core-point-card">
        <div class="core-point-main">
          <div class="core-point">
            <div class="title">
              <span>退货率</span>
              <el-tooltip
                effect="dark"
                content="退货的商品数量与销售数量的比率"
                placement="top-start"
                popper-style="max-width: 400px"
              >
                <i class="iconfont icon-xianxingtubiaoxunwen"></i>
              </el-tooltip>
            </div>
            <PointValue :data="data.returnRate?.currentValue" is-rate />
          </div>
          <div class="point-trend">
            <TrendEcharts
              label="退货率"
              isRate
              :data="normalizeTrendData(data.returnRate?.trendList)"
              color="#02B96B"
            />
          </div>
        </div>
        <div class="core-point-footer">
          <div class="core-point-footer-item">
            <span class="label">上期</span>
            <span>
              {{ formatRate(data.returnRate?.previousValue, { maximumFractionDigits: 2 }) }}
            </span>
          </div>
          <div class="gap"></div>
          <div class="core-point-footer-item">
            <span class="label">环比差值</span>
            <span>
              {{ formatRate(data.returnRate?.dateOverChange, { maximumFractionDigits: 2 }) }}
            </span>
          </div>
        </div>
      </div>
      <!-- 期末最新综合评分 -->
      <div class="core-point-card">
        <div class="core-point-main">
          <div class="core-point">
            <div class="title">
              <span>期末最新综合评分</span>
              <el-tooltip
                effect="dark"
                content="统计周期内有过新增评论的每个ASIN，在周期末当天的亚马逊最新整体评分的简单算术平均值。"
                placement="top"
                popper-style="max-width: 400px"
              >
                <i class="iconfont icon-xianxingtubiaoxunwen"></i>
              </el-tooltip>
            </div>
            <div>
              <span class="value">{{ data.overallRating?.currentValue || '-' }}</span>
              <span class="unit" v-if="data.overallRating?.currentValue">分</span>
              <el-rate
                class="star-rating"
                :style="{ marginLeft: '10px' }"
                size="small"
                :model-value="data.overallRating?.currentValue"
                disabled
              />
            </div>
          </div>
          <div class="point-trend">
            <TrendEcharts
              label="星级评分"
              :data="normalizeTrendData(data.overallRating?.trendList)"
              color="#02B96B"
            />
          </div>
        </div>
        <div class="core-point-footer">
          <div class="core-point-footer-item">
            <span class="label">上期</span>
            <span>{{ data.overallRating?.previousValue || '-' }}</span>
          </div>
          <div class="gap"></div>
          <div class="core-point-footer-item">
            <span class="label">环比</span>
            <span>
              {{ formatRate(data.overallRating?.dateOverChange, { maximumFractionDigits: 2 }) }}
            </span>
          </div>
        </div>
      </div>
    </div>
  </BiCard>
</template>

<script lang="ts" setup>
  import type { BiContracts } from '@/api';
  import BiCard from '@/views/bi/components/BiCard.vue';
  import TrendEcharts from '@/views/bi/components/trendEcharts.vue';
  import PointValue from '../components/PointValue.vue';
  import { formatNumberObj, formatRate } from '../../utils/utils';

  const props = defineProps<{
    data: Omit<BiContracts.VocCoreIndicatorResp, 'trendList'>;
  }>();

  const normalizeTrendData = (list: BiContracts.TrendData[] = []) => {
    return (
      list?.map((item) => {
        return {
          month: item.time,
          value: item.value || 0,
        };
      }) || []
    );
  };
</script>

<style lang="scss" scoped>
  .core-point-cards {
    display: grid;
    grid-template-columns: repeat(5, 1fr);
    grid-template-rows: repeat(2, auto);
    column-gap: 15px;
    row-gap: 17px;
  }
  .core-point-card {
    padding: 14px 16px;
    border-radius: 10px;
    border: 1px solid var(---N2, #f5f5f5);
    background: #fafafa;
    .core-point-main {
      display: flex;
      justify-content: space-between;
      align-items: center;
    }
    .core-point {
      display: flex;
      flex-direction: column;
      row-gap: 6px;
      .value {
        font-family: DIN;
        font-size: 24px;
        font-style: normal;
        font-weight: 600;
        line-height: 28px; /* 116.667% */
      }
      .unit {
        margin-left: 4px;
        font-size: 14px;
        font-style: normal;
        font-weight: 400;
        line-height: 22px;
        color: var(---N9, #1f1f1f);
      }
    }
    .title {
      color: var(---N8, var(---N8, #666));

      /* 常规/Regular 13 */
      font-family: 'PingFang SC';
      font-size: 13px;
      font-style: normal;
      font-weight: 400;
      line-height: 22px; /* 169.231% */
      display: flex;
      align-items: center;
      column-gap: 4px;
      .iconfont,
      .Root-tyicon {
        font-size: 13px;
        color: var(---N6, #999);
        cursor: pointer;
      }
    }
    .point-trend {
      width: 70px;
      height: 45px;
    }
  }
  .core-point-footer {
    display: flex;
    justify-content: start;
    align-items: center;
    column-gap: 8px;
    margin-top: 12px;
    .core-point-footer-item {
      display: flex;
      justify-content: start;
      align-items: center;
      column-gap: 4px;
      color: var(---N9, #1f1f1f);
      /* 常规/Regular 13 */
      font-family: 'PingFang SC';
      font-size: 13px;
      font-style: normal;
      font-weight: 400;
      line-height: 22px; /* 169.231% */
    }
    .label {
      color: var(---N6, #999);

      /* 较弱/Regular 12 */
      font-family: 'PingFang SC';
      font-size: 12px;
      font-style: normal;
      font-weight: 400;
      line-height: 20px; /* 166.667% */
    }
    .gap {
      width: 1px;
      height: 12px;
      background: #d9d9d9;
    }
  }
  .star-rating {
    --el-rate-disabled-void-color: var(---N3, #ededed);
    --el-rate-fill-color: var(---C5, #ff9f22);
  }
</style>
