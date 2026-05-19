<template>
  <div v-loading="pageLoading" style="height: 90vh">
    <el-form ref="formRef" :model="form" label-width="180" v-show="!pageLoading">
      <KeenCard title="产品信息">
        <el-row style="max-width: 1440px">
          <el-col :span="8">
            <el-form-item label="SPU" prop="spuCode">
              <!-- <el-button size="small" type="primary" @click="select">选择</el-button> -->
              <!-- <div class="text-break me-2">{{ form?.skuBean.spuCode }}</div> -->
              <div>{{ form?.skuBean.spuCode }}</div>
            </el-form-item>
          </el-col>
          <el-col :span="8" v-if="form?.skuBean.spuCode">
            <el-form-item label="产品名称">
              <div>{{ form?.skuBean.spuName || '-' }}</div>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row style="max-width: 1440px">
          <el-col :span="8">
            <el-form-item label="SKU" prop="skuCodeList">
              {{ form.skuBean.skuCode || '-' }}
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="定价类型" prop="skuBean.priceType">
              {{ form.skuBean.priceType || '-' }}
            </el-form-item>
          </el-col>
        </el-row>
        <el-row
          style="max-width: 1440px"
          v-if="
            form.skuBean.priceType === '线上定价' ||
            (form.skuBean.priceType === '线下定价' && form.skuBean.channel !== 'offline')
          "
        >
          <el-col :span="8">
            <el-form-item label="国家" prop="skuBean.countryCode">
              {{ form.skuBean.countryCode || '-' }}
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="渠道" prop="skuBean.channel">
              {{ form.skuBean.channel || '-' }}
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="运营人员" prop="operator">
              {{ form.skuBean.operatorName || '-' }}
            </el-form-item>
          </el-col>
        </el-row>
        <el-row style="max-width: 1440px" v-else>
          <el-col :span="6">
            <el-form-item label="国家" prop="skuBean.countryCode">
              {{ form.skuBean.countryCode || '-' }}
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="渠道" prop="skuBean.channel">
              {{ form.skuBean.channel || '-' }}
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="细分场景" prop="skuBean.sceneType">
              {{ form.skuBean.sceneType || '-' }}
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="运营人员" prop="operator">
              {{ form.skuBean.operatorName || '-' }}
            </el-form-item>
          </el-col>
        </el-row>
      </KeenCard>
      <div v-if="form.skuBean.priceType === '线上定价'">
        <KeenCard title="定价测算" class="my-card">
          <el-row style="max-width: 1440px" gutter="10">
            <el-col :span="8">
              <el-form-item
                label="MSRP当前价(当地货币)"
                prop="itemBean.calculatePriceLocal"
                label-width="180"
              >
                {{
                  form.itemBean.calculatePriceLocal
                    ? `${form.itemBean.calculatePriceLocal} ${
                        form.itemBean.currencyCodeLocal ? form.itemBean.currencyCodeLocal : ''
                      }`
                    : '-'
                }}
              </el-form-item>
            </el-col>
            <!-- <el-col :span="8">
              <el-form-item label="货币币种" prop="itemBean.currencyCode" label-width="180">
                {{ form.itemBean.currencyCode || '-' }}
              </el-form-item>
            </el-col> -->
            <el-col :span="8">
              <el-form-item
                label="MSRP最终定价(当地货币)"
                prop="itemBean.calculatePriceFinal"
                label-width="180"
              >
                {{
                  form.itemBean.calculatePriceFinal
                    ? `${form.itemBean.calculatePriceFinal} ${
                        form.itemBean.currencyCodeFinal ? form.itemBean.currencyCodeFinal : ''
                      }`
                    : '-'
                }}
              </el-form-item>
            </el-col>
          </el-row>
        </KeenCard>
        <KeenCard title="推广前固定成本" class="my-card">
          <el-row style="max-width: 1440px" gutter="10">
            <el-col :span="8">
              <el-form-item label="采购成本" prop="itemBean.purchaseCost" label-width="180">
                {{
                  form.itemBean.purchaseCost !== null ? `${form.itemBean.purchaseCost} RMB` : '-'
                }}
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="头程费用" prop="itemBean.headCost" label-width="180">
                {{ form.itemBean.headCost !== null ? `${form.itemBean.headCost} RMB` : '-' }}
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="尾程费用" prop="itemBean.endCost" label-width="180">
                {{ form.itemBean.endCost !== null ? `${form.itemBean.endCost} RMB` : '-' }}
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="关税费用" prop="itemBean.tariffCost" label-width="180">
                {{ form.itemBean.tariffCost !== null ? `${form.itemBean.tariffCost} RMB` : '-' }}
              </el-form-item>
            </el-col>
          </el-row>
        </KeenCard>
        <KeenCard title="推广前变动成本(仅线上)" class="my-card">
          <el-row style="max-width: 1440px" gutter="10">
            <el-col :span="8">
              <el-form-item label="退款率(含补发)" prop="itemBean.taxRefundRate" label-width="180">
                {{ form.itemBean.taxRefundRate ? `${form.itemBean.taxRefundRate} %` : '-' }}
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item
                label="平台佣金率/手续费率"
                prop="itemBean.platformCommissionRate"
                label-width="180"
              >
                {{
                  form.itemBean.platformCommissionRate
                    ? `${form.itemBean.platformCommissionRate} %`
                    : '-'
                }}
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="消费税率" prop="itemBean.consumptionRate" label-width="180">
                {{ form.itemBean.consumptionRate ? `${form.itemBean.consumptionRate} %` : '-' }}
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="其他费用率" prop="itemBean.otherRate" label-width="180">
                {{ form.itemBean.otherRate ? `${form.itemBean.otherRate} %` : '-' }}
              </el-form-item>
            </el-col>
          </el-row>
        </KeenCard>
        <KeenCard title="推广费用(仅线上)" class="my-card">
          <el-row style="max-width: 1440px" gutter="10">
            <el-col :span="8">
              <el-form-item label="促销折扣率" prop="itemBean.promotionRate" label-width="180">
                {{ form.itemBean.promotionRate ? `${form.itemBean.promotionRate} %` : '-' }}
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item
                label="渠道广告推广费率"
                prop="itemBean.adPromotionRate"
                label-width="180"
              >
                {{ form.itemBean.adPromotionRate ? `${form.itemBean.adPromotionRate} %` : '-' }}
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="GTM推广费率" prop="itemBean.gtmPromotionRate" label-width="180">
                {{ form.itemBean.gtmPromotionRate ? `${form.itemBean.gtmPromotionRate} %` : '-' }}
              </el-form-item>
            </el-col>
          </el-row>
        </KeenCard>
        <KeenCard title="品线毛利率(仅线上)" class="my-card">
          <el-row style="max-width: 1440px" gutter="10">
            <el-col :span="10">
              <el-form-item
                label="品线毛利率"
                prop="itemBean.productLineGrossMargin"
                label-width="180"
              >
                {{
                  form.itemBean.productLineGrossMargin
                    ? `${form.itemBean.productLineGrossMargin} %`
                    : '-'
                }}
              </el-form-item>
            </el-col>
          </el-row>
        </KeenCard>
      </div>
      <div v-if="form.skuBean.priceType === '线下定价'">
        <KeenCard title="定价基准" class="my-card">
          <el-row style="max-width: 1440px" gutter="10">
            <el-col :span="8">
              <el-form-item
                label="MSRP最终定价(当地货币)"
                prop="itemBean.calculatePriceOffline"
                label-width="180"
              >
                {{
                  form.itemBean.calculatePriceOffline
                    ? `${form.itemBean.calculatePriceOffline} ${
                        form.itemBean.currencyCodeOffline ? form.itemBean.currencyCodeOffline : ''
                      }`
                    : '-'
                }}
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="促销折扣率" prop="itemBean.promotionRate" label-width="210">
                {{
                  form.itemBean.promotionRate !== null ? `${form.itemBean.promotionRate} %` : '-'
                }}
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item
                label="Retail Margin零售毛利率"
                prop="itemBean.retailMargin"
                label-width="210"
              >
                {{ form.itemBean.retailMargin !== null ? `${form.itemBean.retailMargin} %` : '-' }}
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item
                label="Dist Margin经销商毛利率"
                prop="itemBean.distMargin"
                label-width="210"
              >
                {{ form.itemBean.distMargin !== null ? `${form.itemBean.distMargin} %` : '-' }}
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item
                label="Av Sellout Price(折后价)"
                prop="itemBean.selloutPrice"
                label-width="210"
              >
                {{
                  form.itemBean.selloutPrice
                    ? `${form.itemBean.selloutPrice} ${
                        form.itemBean.currencyCodeOffline ? form.itemBean.currencyCodeOffline : ''
                      }`
                    : '-'
                }}
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item
                label="Invoice Price Sell-in价格"
                prop="itemBean.invoicePrice"
                label-width="210"
              >
                {{
                  form.itemBean.invoicePrice
                    ? `${form.itemBean.invoicePrice} ${
                        form.itemBean.currencyCodeOffline ? form.itemBean.currencyCodeOffline : ''
                      }`
                    : '-'
                }}
              </el-form-item>
            </el-col>
          </el-row>
        </KeenCard>
        <KeenCard title="推广前固定成本" class="my-card">
          <el-row style="max-width: 1440px" gutter="10">
            <el-col :span="8">
              <el-form-item label="采购成本" prop="itemBean.purchaseCost" label-width="180">
                {{
                  form.itemBean.purchaseCost !== null ? `${form.itemBean.purchaseCost} RMB` : '-'
                }}
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="头程费用" prop="itemBean.headCost" label-width="180">
                {{ form.itemBean.headCost !== null ? `${form.itemBean.headCost} RMB` : '-' }}
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="尾程费用" prop="itemBean.endCost" label-width="180">
                {{ form.itemBean.endCost !== null ? `${form.itemBean.endCost} RMB` : '-' }}
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="关税费用" prop="itemBean.tariffCost" label-width="180">
                {{ form.itemBean.tariffCost !== null ? `${form.itemBean.tariffCost} RMB` : '-' }}
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="佣金率" prop="itemBean.commissionRate" label-width="180">
                {{
                  form.itemBean.commissionRate !== null ? `${form.itemBean.commissionRate} %` : '-'
                }}
              </el-form-item>
            </el-col>
          </el-row>
        </KeenCard>
        <KeenCard title="MSRP定价测算(仅线下)" class="my-card">
          <el-row style="max-width: 1440px">
            <el-col :span="8">
              <el-form-item label="返点" label-width="220">
                {{ form.itemBean.returnPoint !== null ? `${form.itemBean.returnPoint} %` : '-' }}
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="退货" label-width="180">
                {{ form.itemBean.returnGoods !== null ? `${form.itemBean.returnGoods} %` : '-' }}
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="渠道营销费用率" label-width="180">
                {{
                  form.itemBean.marketingRate !== null ? `${form.itemBean.marketingRate} %` : '-'
                }}
              </el-form-item>
            </el-col>
            <el-col :span="16">
              <el-form-item label="Sell-in Rev(抵扣后) 主营业务收入" label-width="220">
                {{
                  form.itemBean.sellInRev !== null
                    ? `${form.itemBean.sellInRev} ${
                        form.itemBean.currencyCodeOffline ? form.itemBean.currencyCodeOffline : ''
                      }`
                    : '-'
                }}
              </el-form-item>
            </el-col>
            <el-col :span="16">
              <el-form-item label="定价毛利率" label-width="220">
                {{
                  form.itemBean.pricingMargin !== null ? `${form.itemBean.pricingMargin} %` : '-'
                }}
              </el-form-item>
            </el-col>
            <el-col :span="16">
              <el-form-item label="渠道毛利率" label-width="220">
                {{
                  form.itemBean.channelMargin !== null ? `${form.itemBean.channelMargin} %` : '-'
                }}
              </el-form-item>
            </el-col>
          </el-row>
        </KeenCard>
      </div>
    </el-form>
    <div class="card-footer d-flex justify-content-end py-6 px-9">
      <!-- <el-space>
      <el-button @click="visible = false">取消</el-button>
      <el-button type="primary" @click="save" v-loading="saveLoading">确认</el-button>
    </el-space> -->
    </div>
  </div>
</template>

<script setup lang="ts" name="priceCalculateDetail">
  import { productApi } from '@/api';
  import { ElMessage } from 'element-plus';
  // import BindGoods from '@/views/goodscenter/bindGoods/Modal/bindGoods.vue';
  // import currency from 'currency.js';

  const formRef = ref();
  const form = ref<any>({
    itemBean: {
      adPromotionRate: '',
      calculatePrice: '',
      calculatePriceFinal: '',
      calculatePriceLocal: '',
      companyCode: '',
      consumptionRate: '',
      currencyCode: '',
      currencyCodeFinal: '',
      currencyCodeLocal: '',
      currencyCodeRmb: '',
      endCost: '',
      gtmPromotionRate: '',
      headCost: '',
      headId: '',
      mdf: '',
      otherCost: '',
      otherRate: '',
      platformCommissionRate: '',
      productLineGrossMargin: '',
      productLineGrossMarginOffline: '',
      promotionRate: '',
      purchaseCost: '',
      returnGoods: '',
      returnPoint: '',
      sellingPrice: '',
      soaPromotion: '',
      tariffCost: '',
      taxRefundRate: '',
      calculatePriceOffline: '',
      currencyCodeOffline: '',
    },
    skuBean: {
      channel: '',
      countryCode: 'US',
      currencyCode: '',
      operator: '',
      operatorName: '',
      priceType: '线上定价',
      productType: '',
      salePrice: '',
      skuCode: 'FB021-SK13XL',
      skuName: '',
      spuCode: 'SPU002003021028060',
      spuName: '',
      version: '',
    },
  });
  const pageLoading = ref(true);

  const route = useRoute();
  // 查询详情
  const getDetailData = async () => {
    setTimeout(() => {
      pageLoading.value = false;
    }, 8000);
    if (route.query.code) {
      const res: any = await productApi.luteosProductMsrpCalculationQueryDetail({
        id: route.query.code,
      });
      console.log('getDetailData', res);
      form.value = res;
      pageLoading.value = false;
    }
  };
  getDetailData();
</script>

<style scoped lang="scss">
  .table-form-item {
    margin-top: 1.75rem;

    :deep(.el-form-item__content) {
      margin: 0 !important;
      height: 32px !important;
      display: flex;
      column-gap: 10px;
    }
  }

  .el-form-item {
    :deep(.el-select .el-select__wrapper) {
      min-width: 160px;
    }
  }

  .tips {
    color: #8492a6;
    font-size: 12px;
  }

  .my-card {
    margin: 0 !important;
    // padding: 0 0 0 0 !important;
    padding-bottom: 0 !important;
    // :deep(.card-header) {
    //   padding: 0 0 15px 15px !important;
    //   margin: 0 !important;
    // }
    :deep(.card-body) {
      padding-bottom: 0 !important;
    }
  }
  :deep(.el-input-group__append) {
    font-size: 12px !important;
  }
  :deep(.el-table__body) {
    .cell {
      display: flex;
      align-items: center;
    }
  }

  :deep(.el-input-group__append) {
    padding: 0 5px;
  }

  :deep(.el-form-item__content) {
    line-height: 24px;
  }
  .text-break {
    margin-left: 30px;
  }
</style>
