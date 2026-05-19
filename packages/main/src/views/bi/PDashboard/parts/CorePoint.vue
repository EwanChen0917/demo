<template>
  <BiCard title="核心指标">
    <HorizontalScrollContainer>
      <div class="core-point">
        <!-- 销售额 -->
        <CorePointCard :pointData="salesAmountData">
          <template #footer>
            <div class="footer-section">
              <div class="aim">
                <span class="label">目标</span>
                <span class="value">
                  {{
                    formatNumberObj(salesAmountData.budget, {
                      minimumFractionDigits: 0,
                      maximumFractionDigits: 0,
                    })
                  }}
                </span>
              </div>
              <i class="gap"></i>
              <div class="completed" :class="HealthLevel[data?.salesAmountHealthLevel || '']">
                <div>
                  <span class="label">达成率</span>
                  <span class="value">{{ formatRate(salesAmountData.completionRate) }}</span>
                </div>
                <div class="healthy" v-if="data?.salesAmountHealthLevel">
                  <i class="iconfont" :class="getHealthyIcon(data?.salesAmountHealthLevel)"></i>
                  <span class="label healthy-text">{{ data?.salesAmountHealthLevel }}</span>
                </div>
              </div>
            </div>
          </template>
        </CorePointCard>
        <i class="gap section-gap"></i>
        <!-- 新品 - 销售额 -->
        <CorePointCard :pointData="newProductSalesAmount">
          <template #footer>
            <div class="footer-section">
              <div class="aim">
                <span class="label">目标</span>
                <span class="value">
                  {{
                    formatNumberObj(newProductSalesAmount.budget, {
                      minimumFractionDigits: 0,
                      maximumFractionDigits: 0,
                    })
                  }}
                </span>
              </div>
              <i class="gap"></i>
              <div
                class="completed"
                :class="HealthLevel[data?.newProductSalesAmountHealthLevel || '']"
              >
                <div>
                  <span class="label">达成率</span>
                  <span class="value">
                    {{ formatRate(newProductSalesAmount.completionRate) }}
                  </span>
                </div>
                <div class="healthy" v-if="data?.newProductSalesAmountHealthLevel">
                  <i
                    class="iconfont"
                    :class="getHealthyIcon(data?.newProductSalesAmountHealthLevel)"
                  ></i>
                  <span class="label healthy-text">
                    {{ data?.newProductSalesAmountHealthLevel }}
                  </span>
                </div>
              </div>
            </div>
          </template>
        </CorePointCard>
        <i class="gap section-gap"></i>
        <!-- 毛利率 -->
        <CorePointCard :pointData="gtmGrossProfitRate">
          <template #footer>
            <div class="footer-section">
              <div class="aim">
                <span class="label">目标</span>
                <span class="value">
                  {{
                    formatRate(data?.budgetGtmGrossProfitRate, {
                      minimumFractionDigits: 1,
                      maximumFractionDigits: 1,
                    })
                  }}
                </span>
              </div>
              <i class="gap"></i>
              <div
                class="completed"
                :class="HealthLevel[data?.gtmGrossProfitRateHealthLevel || '']"
              >
                <div>
                  <span class="label">差值</span>
                  <span class="value">
                    {{ formatRate(data?.gtmGrossProfitRateDiff) }}
                  </span>
                </div>
                <div class="healthy" v-if="data?.gtmGrossProfitRateHealthLevel">
                  <i
                    class="iconfont"
                    :class="getHealthyIcon(data?.gtmGrossProfitRateHealthLevel)"
                  ></i>
                  <span class="label healthy-text">{{ data?.gtmGrossProfitRateHealthLevel }}</span>
                </div>
              </div>
            </div>
          </template>
        </CorePointCard>
        <i class="gap section-gap"></i>
        <!-- VOC量 -->
        <CorePointCard :pointData="vocCount">
          <template #action>
            <el-popover
              v-model:visible="vocPopover"
              placement="bottom"
              :teleported="false"
              trigger="click"
            >
              <template #reference>
                <div class="popover-reference">
                  <span>更多</span>
                  <i
                    class="iconfont"
                    :class="vocPopover ? 'icon-jiantouxiangxia' : 'icon-jiantouxiangyou'"
                  ></i>
                </div>
              </template>
              <div class="popover-container">
                <div class="header">VOC量Top3商品</div>
                <RankList
                  :data="normalizeTop3VocCount"
                  :isShowValue="false"
                  @item-click="handleSkip"
                >
                  <template #img="{ item }">
                    <div class="product-img">
                      <el-image :src="item.imgUrl" fit="contain">
                        <template #error>
                          <el-image :src="DefaultImage" fit="contain" />
                        </template>
                        <template #placeholder>
                          <el-image :src="DefaultImage" fit="contain" />
                        </template>
                      </el-image>
                    </div>
                  </template>
                  <template #name="{ item }">
                    <span>{{ item.name }}</span>
                    <span>&nbsp;|&nbsp;</span>
                    <span :style="{ fontFamily: 'DIN' }">{{ formatNumberObj(item.value) }}</span>
                    <span>&nbsp;|&nbsp;</span>
                    <span :style="{ fontFamily: 'DIN' }">
                      {{
                        formatRate(
                          ['month', 'year'].includes(searchParams.dateType!)
                            ? item.cumulativeVocProp
                            : item.vocProp
                        )
                      }}
                    </span>
                  </template>
                </RankList>
              </div>
            </el-popover>
          </template>
          <template #footer>
            <div class="footer-section">
              <div class="aim">
                <span class="label">
                  {{ ['month', 'year'].includes(searchParams.dateType!) ? 'VOC率(年累)' : 'VOC率' }}
                </span>
                <span class="value">
                  {{
                    formatRate(
                      ['month', 'year'].includes(searchParams.dateType!)
                        ? data?.cumulativeVocProp
                        : data?.vocProp
                    )
                  }}
                </span>
              </div>
              <i class="gap"></i>
              <div class="completed">
                <div>
                  <span class="label">上期数值</span>
                  <span class="value">
                    {{ formatNumberObj(data?.vocCountM) }}
                  </span>
                </div>
              </div>
            </div>
          </template>
        </CorePointCard>
        <i class="gap section-gap"></i>
        <!-- 退货率 -->
        <CorePointCard :pointData="returnRate">
          <template #action>
            <el-popover
              v-model:visible="returnPopover"
              placement="bottom"
              :teleported="false"
              trigger="click"
            >
              <template #reference>
                <div class="popover-reference">
                  <span>更多</span>
                  <i
                    class="iconfont"
                    :class="returnPopover ? 'icon-jiantouxiangxia' : 'icon-jiantouxiangyou'"
                  ></i>
                </div>
              </template>
              <div class="popover-container">
                <div class="header">平台退货率Top3</div>
                <RankList :data="normalizeTop3PlatformCount" :isShowValue="false">
                  <template #img="{ item }">
                    <div class="product-img">
                      <el-image :src="item.imgUrl" fit="contain">
                        <template #error>
                          <el-image :src="DefaultImage" fit="contain" />
                        </template>
                        <template #placeholder>
                          <el-image :src="DefaultImage" fit="contain" />
                        </template>
                      </el-image>
                    </div>
                  </template>
                  <template #name="{ item }">
                    <span>{{ item.name }}</span>
                    <span>&nbsp;|&nbsp;</span>
                    <span :style="{ fontFamily: 'DIN' }">{{ formatNumberObj(item.value) }}</span>
                    <span>&nbsp;|&nbsp;</span>
                    <span :style="{ fontFamily: 'DIN' }">{{ formatRate(item.prop) }}</span>
                  </template>
                </RankList>
              </div>
            </el-popover>
          </template>
          <template #footer>
            <div class="footer-section">
              <div class="aim">
                <span class="label">目标</span>
                <span class="value">
                  {{
                    formatRate(data?.budgetReturnRate, {
                      minimumFractionDigits: 1,
                      maximumFractionDigits: 1,
                    })
                  }}
                </span>
              </div>
              <i class="gap"></i>
              <div class="completed" :class="HealthLevel[data?.returnRateHealthLevel || '']">
                <div>
                  <span class="label">差值</span>
                  <span class="value">
                    {{ formatRate(data?.returnRateDiff) }}
                  </span>
                </div>
                <div class="healthy" v-if="data?.returnRateHealthLevel">
                  <i class="iconfont" :class="getHealthyIcon(data?.returnRateHealthLevel)"></i>
                  <span class="label healthy-text">{{ data?.returnRateHealthLevel }}</span>
                </div>
              </div>
            </div>
          </template>
        </CorePointCard>
        <i class="gap section-gap"></i>
        <!-- 退款率 -->
        <CorePointCard :pointData="refundAmountRate">
          <template #action>
            <el-popover
              v-model:visible="refundPopover"
              placement="bottom"
              :teleported="false"
              trigger="click"
            >
              <template #reference>
                <div class="popover-reference">
                  <span>更多</span>
                  <i
                    class="iconfont"
                    :class="refundPopover ? 'icon-jiantouxiangxia' : 'icon-jiantouxiangyou'"
                  ></i>
                </div>
              </template>
              <div class="popover-container">
                <div class="header">平台退款率Top3</div>
                <RankList :data="normalizeTop3PlatformRefundRate" :isShowValue="false">
                  <template #img="{ item }">
                    <div class="product-img">
                      <el-image :src="item.imgUrl" fit="contain">
                        <template #error>
                          <el-image :src="DefaultImage" fit="contain" />
                        </template>
                        <template #placeholder>
                          <el-image :src="DefaultImage" fit="contain" />
                        </template>
                      </el-image>
                    </div>
                  </template>
                  <template #name="{ item }">
                    <span>{{ item.name }}</span>
                    <span>&nbsp;|&nbsp;</span>
                    <span :style="{ fontFamily: 'DIN' }">{{ formatNumberObj(item.value) }}</span>
                    <span>&nbsp;|&nbsp;</span>
                    <span :style="{ fontFamily: 'DIN' }">{{ formatRate(item.prop) }}</span>
                  </template>
                </RankList>
              </div>
            </el-popover>
          </template>
          <template #footer>
            <div class="footer-section">
              <div class="aim">
                <span class="label">目标</span>
                <span class="value">
                  {{
                    formatRate(data?.budgetRefundAmountRate, {
                      minimumFractionDigits: 1,
                      maximumFractionDigits: 1,
                    })
                  }}
                </span>
              </div>
              <i class="gap"></i>
              <div class="completed" :class="HealthLevel[data?.refundAmountRateHealthLevel || '']">
                <div>
                  <span class="label">差值</span>
                  <span class="value">
                    {{ formatRate(data?.refundAmountRateDiff) }}
                  </span>
                </div>
                <div class="healthy" v-if="data?.refundAmountRateHealthLevel">
                  <i
                    class="iconfont"
                    :class="getHealthyIcon(data?.refundAmountRateHealthLevel)"
                  ></i>
                  <span class="label healthy-text">{{ data?.refundAmountRateHealthLevel }}</span>
                </div>
              </div>
            </div>
          </template>
        </CorePointCard>
        <!-- 差评数 -->
        <!-- <CorePointCard :pointData="negativeCount">
          <template #action>
            <el-popover
              v-model:visible="negativePopover"
              placement="bottom"
              :teleported="false"
              trigger="click"
            >
              <template #reference>
                <div class="popover-reference">
                  <span>更多</span>
                  <i
                    class="iconfont"
                    :class="negativePopover ? 'icon-jiantouxiangxia' : 'icon-jiantouxiangyou'"
                  ></i>
                </div>
              </template>
              <div class="popover-container">
                <div class="header">差评数Top3商品</div>
                <RankList :data="normalizeTop3NegativeCount" :isShowValue="false">
                  <template #img="{ item }">
                    <div class="product-img">
                      <el-image :src="item.imgUrl" fit="contain">
                        <template #error>
                          <el-image :src="DefaultImage" fit="contain" />
                        </template>
                        <template #placeholder>
                          <el-image :src="DefaultImage" fit="contain" />
                        </template>
                      </el-image>
                    </div>
                  </template>
                  <template #name="{ item }">
                    <span>{{ item.name }}</span>
                    <span>&nbsp;|&nbsp;</span>
                    <span :style="{ fontFamily: 'DIN' }">{{ formatNumberObj(item.value) }}</span>
                    <span>&nbsp;|&nbsp;</span>
                    <span :style="{ fontFamily: 'DIN' }">{{ formatRate(item.prop) }}</span>
                  </template>
                </RankList>
              </div>
            </el-popover>
          </template>
          <template #footer>
            <div class="footer-section">
              <div class="aim">
                <span class="label">差评率</span>
                <span class="value">{{ formatRate(data?.negativeRate) }}</span>
              </div>
              <i class="gap"></i>
              <div class="completed" :class="HealthLevel[data?.negativeHealthLevel || '']">
                <div>
                  <span class="label">上期数值</span>
                  <span class="value">
                    {{ formatNumberObj(data?.negativeCountM) }}
                  </span>
                </div>
              </div>
            </div>
          </template>
        </CorePointCard> -->
      </div>
    </HorizontalScrollContainer>
  </BiCard>
</template>

<script lang="ts" setup>
  import { type BiContracts } from '@/api';
  import HorizontalScrollContainer from '@/views/personalCenter/components/HorizontalScrollContainer.vue';
  import RankList from '@/views/bi/components/RankList.vue';
  import DefaultImage from '@/assets/images/system/default-img.png';
  import BiCard from '../../components/BiCard.vue';
  import CorePointCard from '../component/CorePointCard.vue';
  import { formatNumberObj, formatRate } from '../../utils/utils';

  const props = defineProps<{
    data?: BiContracts.ProductManagerBaseDO;
    top3NegativeCount?: BiContracts.ProductManagerSpuDO[];
    returnRateTop3Platform?: BiContracts.ProductManagerSpuDO[];
    refundRateTop3Platform?: BiContracts.ProductManagerSpuDO[];
    top3VocCount?: BiContracts.ProductManagerSpuDO[];
    trendList?: BiContracts.ProductManagerTrendDO[];
  }>();

  const emit = defineEmits<{
    skipParticulars: [params: { spuNameList: string[]; vocSource: string[], dataSource: string[] }];
  }>();
  const searchParams = inject<BiContracts.CommonAnalysisReq>('searchParams')!;
  const normalizeTop3VocCount = computed(() => {
    const maxVocCount = Math.max(...(props.top3VocCount?.map((item) => item.vocCount || 0) || []));
    return (
      props.top3VocCount?.map((item) => ({
        name: item.spuName!,
        value: item.vocCount!,
        percent: ((item.vocCount || 0) / maxVocCount) * 100,
        vocProp: item.vocProp,
        cumulativeVocProp: item.cumulativeVocProp,
        imgUrl: item.imgUrl,
        color: '#02B96B',
      })) || []
    );
  });
  const normalizeTop3PlatformCount = computed(() => {
    const maxReturnRate = Math.max(
      ...(props.returnRateTop3Platform?.map((item) => item.returnRate || 0) || [])
    );
    return (
      props.returnRateTop3Platform?.map((item) => ({
        name: item.platform!,
        value: item.returnQty!,
        percent: ((item.returnRate || 0) / maxReturnRate) * 100,
        prop: item.returnRate,
        imgUrl: item.imgUrl,
        color: '#02B96B',
      })) || []
    );
  });
  const normalizeTop3PlatformRefundRate = computed(() => {
    const maxRefundAmountRate = Math.max(
      ...(props.refundRateTop3Platform?.map((item) => item.refundAmountRate || 0) || [])
    );
    return (
      props.refundRateTop3Platform?.map((item) => ({
        name: item.platform!,
        value: item.refundAmount!,
        percent: ((item.refundAmountRate || 0) / maxRefundAmountRate) * 100,
        prop: item.refundAmountRate,
        imgUrl: item.imgUrl,
        color: '#02B96B',
      })) || []
    );
  });
  const normalizeTop3NegativeCount = computed(() => {
    const maxNegativeCount = Math.max(
      ...(props.top3NegativeCount?.map((item) => item.negativeCount || 0) || [])
    );
    return (
      props.top3NegativeCount?.map((item) => ({
        name: item.spuName!,
        value: item.negativeCount!,
        percent: ((item.negativeCount || 0) / maxNegativeCount) * 100,
        prop: item.negativeRate,
        imgUrl: item.imgUrl,
        color: '#02B96B',
      })) || []
    );
  });

  enum HealthLevel {
    '优秀' = 'good',
    '良好' = 'regular',
    '警惕' = 'poor',
    'good' = '优秀',
    'regular' = '良好',
    'poor' = '警惕',
  }
  const getHealthyIcon = (level: string | undefined) => {
    switch (level) {
      case HealthLevel.优秀:
      case HealthLevel.good:
        return 'icon-lianghao';
      case HealthLevel.良好:
      case HealthLevel.regular:
        return 'icon-lianghao';
      case HealthLevel.警惕:
      case HealthLevel.poor:
        return 'icon-jingti';
      default:
        return 'icon-xianxingtubiaoxunwen';
    }
  };

  const salesAmountData = computed(() => ({
    title: '销售额',
    data: props.data?.salesAmount,
    isRate: false,
    mom: props.data?.salesAmountMom,
    yoy: props.data?.salesAmountYoy,
    budget: props.data?.budgetSalesAmount,
    diff: props.data?.salesAmountDiff,
    completionRate: props.data?.salesAmountCompletionRate,
    color: '#02B96B',
    trendList:
      props.trendList?.map((item) => {
        return {
          month: item.period!,
          value: item.salesAmount!,
        };
      }) || [],
  }));
  const newProductSalesAmount = computed(() => ({
    title: '新品-销售额',
    data: props.data?.newProductSalesAmount,
    isRate: false,
    mom: props.data?.newProductSalesAmountMom,
    yoy: props.data?.newProductSalesAmountYoy,
    budget: props.data?.newProductBudgetSalesAmount,
    diff: props.data?.newProductSalesAmountDiff,
    completionRate: props.data?.newProductSalesAmountCompletionRate,
    color: '#02B96B',
    trendList:
      props.trendList?.map((item) => {
        return {
          month: item.period!,
          value: item.newProductSalesAmount!,
        };
      }) || [],
  }));
  const gtmGrossProfitRate = computed(() => ({
    title: '毛利率',
    data: props.data?.gtmGrossProfitRate,
    isRate: true,
    mom: props.data?.gtmGrossProfitRateMom,
    yoy: props.data?.gtmGrossProfitRateYoy,
    color: '#02B96B',
    trendList:
      props.trendList?.map((item) => {
        return {
          month: item.period!,
          value: item.gtmGrossProfitRate!,
        };
      }) || [],
  }));
  const vocCount = computed(() => ({
    title: '产品问题VOC量',
    data: props.data?.vocCount,
    isRate: false,
    mom: props.data?.vocCountMom,
    yoy: props.data?.vocCountYoy,
    color: '#02B96B',
    trendList:
      props.trendList?.map((item) => {
        return {
          month: item.period!,
          value: item.vocCount!,
        };
      }) || [],
  }));
  const returnRate = computed(() => ({
    title: '产品问题退货率',
    data: props.data?.returnRate,
    isRate: true,
    mom: props.data?.returnRateMom,
    yoy: props.data?.returnRateYoy,
    color: '#02B96B',
    trendList:
      props.trendList?.map((item) => {
        return {
          month: item.period!,
          value: item.returnRate!,
        };
      }) || [],
  }));
  const refundAmountRate = computed(() => ({
    title: '产品问题退款率',
    data: props.data?.refundAmountRate,
    isRate: true,
    mom: props.data?.refundAmountRateMom,
    yoy: props.data?.refundAmountRateYoy,
    color: '#02B96B',
    trendList:
      props.trendList?.map((item) => {
        return {
          month: item.period!,
          value: item.refundAmountRate!,
        };
      }) || [],
  }));
  const negativeCount = computed(() => ({
    title: '差评数',
    data: props.data?.negativeCount,
    isRate: false,
    mom: props.data?.negativeCountMom,
    yoy: props.data?.negativeCountYoy,
    color: '#02B96B',
    trendList:
      props.trendList?.map((item) => {
        return {
          month: item.period!,
          value: item.negativeCount!,
        };
      }) || [],
  }));
  const vocPopover = ref(false);
  const returnPopover = ref(false);
  const refundPopover = ref(false);
  const negativePopover = ref(false);
  const handleSkip = (item: { name: string }) => {
    emit('skipParticulars', {
      spuNameList: [item.name!],
      vocSource: ['客服工单'],
      dataSource: ['Zendesk'],
    });
  };
</script>

<style lang="scss" scoped>
  .core-point {
    display: flex;
    column-gap: 26px;
    align-items: center;
    padding: 0 10px;
  }
  .footer-section {
    display: flex;
    align-items: center;
    margin-top: 8px;
    column-gap: 8px;
    .label {
      margin-right: 6px;
      color: var(---N6, #999);
      text-align: right;

      /* 较弱/Regular 12 */
      font-family: 'PingFang SC';
      font-size: 12px;
      font-style: normal;
      font-weight: 400;
      line-height: 20px; /* 166.667% */
    }
    .value {
      color: var(---N9, #1f1f1f);
      text-align: right;

      /* 较弱/Regular 12 */
      font-family: 'PingFang SC';
      font-size: 12px;
      font-style: normal;
      font-weight: 400;
      line-height: 20px; /* 166.667% */
    }
    .completed {
      flex: 1;
      display: flex;
      justify-content: space-between;
      align-items: center;
      .healthy {
        display: flex;
        align-items: center;
        column-gap: 4px;
      }
      .iconfont,
      .Root-tyicon {
        font-size: 14px;
      }
    }
    .good {
      .healthy-text,
      .value,
      .healthy {
        color: var(---C4, #02b96b);
      }
    }
    .regular {
      .healthy-text,
      .value,
      .healthy {
        color: #ff9f22;
      }
    }
    .poor {
      .healthy-text,
      .value,
      .healthy {
        color: var(---C8, #f53f3f);
      }
    }
  }
  .product-img {
    margin: 0 12px;
    width: 34px;
    height: 34px;
    overflow: hidden;
    box-sizing: border-box;
    border-radius: 8px;
    border: 1px solid var(---N3, #ededed);
    background: #f8f8f8;
    .el-image {
      width: 100%;
      height: 100%;
    }
  }
  .gap {
    width: 1px;
    height: 12px;
    background-color: var(---N3, #ededed);
  }
  .section-gap {
    width: 1px;
    height: 30px;
    background-color: var(---N3, #ededed);
  }
  .popover-container {
    width: 343px;
    box-sizing: border-box;
    padding: 20px;
    padding-bottom: 6px;
    .header {
      color: var(---N9, #1f1f1f);

      /* 重要/Medium 16 */
      font-family: 'PingFang SC Medium';
      font-size: 16px;
      font-style: normal;
      font-weight: 500;
      line-height: 24px; /* 150% */
      margin-bottom: 16px;
    }
  }
  .icon-info {
    cursor: pointer;
  }
  .popover-reference {
    font-size: 12px;
    display: flex;
    align-items: center;
    color: var(---P6, #02b96b);
    cursor: pointer;
  }
</style>
