<template>
  <div v-loading="pageLoading" style="height: 90vh">
    <el-form ref="formRef" :model="form" :rules="rules" label-width="130" v-show="!pageLoading">
      <KeenCard title="产品信息">
        <el-row style="max-width: 1440px">
          <el-col :span="8">
            <el-form-item label="SPU" prop="spuCode" v-if="!isEdit">
              <el-button size="small" type="primary" @click="select" v-if="!isEdit">选择</el-button>
              <div class="text-break me-2">{{ form?.skuBean.spuCode }}</div>
            </el-form-item>
            <el-form-item label="SPU" prop="spuCode" v-else>
              <div>{{ form?.skuBean.spuCode }}</div>
            </el-form-item>
          </el-col>
          <el-col :span="8" v-if="form?.skuBean.spuCode">
            <el-form-item label="产品名称">
              <div>{{ form?.skuBean.spuName }}</div>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row style="max-width: 1440px">
          <el-col :span="16">
            <el-form-item label="SKU" prop="skuCodeList">
              <el-select
                placeholder="请选择"
                v-model="form.skuBean.skuCode"
                clearable
                collapse-tags
                collapse-tags-tooltip
                :max-collapse-tags="5"
                @change="handleSkuChange"
                :disabled="isEdit"
              >
                <template #empty>
                  <div class="text-center">
                    {{ form?.skuBean.spuCode ? '暂无SKU' : '请先选择SPU' }}
                  </div>
                </template>
                <!-- <el-option label="所有SKU" value="all" v-if="skuList.length > 0" /> -->
                <el-option v-for="item in skuList" :key="item" :label="item" :value="item" />
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="定价类型" prop="skuBean.priceType">
              <el-select
                v-model="form.skuBean.priceType"
                :disabled="isEdit"
                @change="handlePriceTypeChange"
              >
                <el-option value="线上定价" label="线上定价" />
                <el-option value="线下定价" label="线下定价" />
              </el-select>
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
              <CountrySelect2
                v-model="form.skuBean.countryCode"
                placeholder="国家"
                @change="handleCountryChange"
                ref="countryRef"
                :disabled="isEdit"
              />
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="渠道" prop="skuBean.channel">
              <!-- clearable -->
              <el-select
                v-model="form.skuBean.channel"
                placeholder="渠道"
                filterable
                @change="handleChannelChange"
                :disabled="isEdit"
              >
                <el-option
                  v-for="item in luteChannelList"
                  :key="item"
                  :label="item"
                  :value="item"
                />
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="运营人员" prop="operator">
              <!-- <DeptMember deptId="65717209" v-model="form.operator" placeholder="请选择运营人员" /> -->
              <DeptMember v-model="form.skuBean.operator" placeholder="运营人员" clearable />
            </el-form-item>
          </el-col>
        </el-row>
        <el-row style="max-width: 1440px" v-else>
          <el-col :span="6">
            <el-form-item label="国家" prop="skuBean.countryCode">
              <CountrySelect2
                v-model="form.skuBean.countryCode"
                placeholder="国家"
                @change="handleCountryChange"
                ref="countryRef"
                :disabled="isEdit"
              />
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="渠道" prop="skuBean.channel">
              <!-- clearable -->
              <el-select
                v-model="form.skuBean.channel"
                placeholder="渠道"
                filterable
                @change="handleChannelChange"
                :disabled="isEdit"
              >
                <el-option
                  v-for="item in luteChannelList"
                  :key="item"
                  :label="item"
                  :value="item"
                />
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="细分场景" prop="skuBean.sceneType">
              <el-select v-model="form.skuBean.sceneType" placeholder="细分场景" filterable>
                <el-option v-for="item in luteSceneList" :key="item" :label="item" :value="item" />
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="运营人员" prop="operator">
              <!-- <DeptMember deptId="65717209" v-model="form.operator" placeholder="请选择运营人员" /> -->
              <DeptMember v-model="form.skuBean.operator" placeholder="运营人员" clearable />
            </el-form-item>
          </el-col>
        </el-row>
      </KeenCard>
      <div v-if="form.skuBean.priceType === '线上定价'">
        <KeenCard title="定价测算" class="my-card">
          <el-row style="max-width: 1440px" gutter="10">
            <!-- <el-col :span="8">
            <el-form-item
              label="MSRP测算价(当地货币)"
              prop="itemBean.calculatePrice"
              label-width="180"
            >
              <el-input
                maxlength="10"
                v-model="form.itemBean.calculatePrice"
                class="w-500px"
                placeholder="请输入具体金额"
                @blur="handlePriceBlur"
                clearable
              >
                <template #append>USD</template>
              </el-input>
            </el-form-item>
          </el-col> -->
            <el-col :span="8">
              <el-form-item
                label="MSRP当前价(当地货币)"
                prop="itemBean.calculatePriceLocal"
                label-width="180"
              >
                <!-- :disabled="hasPirce" -->
                <el-input
                  maxlength="10"
                  v-model="form.itemBean.calculatePriceLocal"
                  class="w-500px"
                  placeholder="MSRP当前价为空"
                  @blur="handlePriceBlur"
                  clearable
                  disabled
                  v-if="form.itemBean.currencyCodeLocal"
                >
                  <template #append>
                    {{ form.itemBean.currencyCodeLocal }}
                  </template>
                </el-input>
                <el-input
                  v-else
                  maxlength="10"
                  v-model="form.itemBean.calculatePriceLocal"
                  class="w-500px"
                  placeholder="MSRP当前价为空"
                  @blur="handlePriceBlur"
                  clearable
                  disabled
                />
              </el-form-item>
            </el-col>
            <!-- <el-col :span="8">
              <el-form-item label="货币币种" prop="itemBean.currencyCode" label-width="180">
                <CurrencySelect
                  v-model="form.itemBean.currencyCode"
                  size="medium"
                  @change="
                    (val) => {
                      handleCurrencyChange(val);
                    }
                  "
                />
              </el-form-item>
            </el-col> -->
            <el-col :span="8">
              <el-form-item
                label="MSRP最终定价(当地货币)"
                prop="itemBean.calculatePriceFinal"
                label-width="180"
              >
                <el-input
                  maxlength="10"
                  v-model="form.itemBean.calculatePriceFinal"
                  class="w-500px"
                  placeholder="请输入具体金额"
                  @blur="handlePriceBlur"
                  clearable
                  v-if="form.itemBean.currencyCodeFinal"
                >
                  <template #append>{{ form.itemBean.currencyCodeFinal }}</template>
                </el-input>
                <el-input
                  maxlength="10"
                  v-model="form.itemBean.calculatePriceFinal"
                  class="w-500px"
                  placeholder="请输入具体金额"
                  @blur="handlePriceBlur"
                  clearable
                  v-else
                />
              </el-form-item>
            </el-col>
          </el-row>
        </KeenCard>
        <KeenCard title="推广前固定成本" class="my-card">
          <el-row style="max-width: 1440px" gutter="10">
            <el-col :span="8">
              <el-form-item label="采购成本" prop="itemBean.purchaseCost" label-width="180">
                <el-input
                  maxlength="10"
                  v-model="form.itemBean.purchaseCost"
                  class="w-500px"
                  placeholder="请输入具体金额"
                  @blur="(e) => handlePriceBlur(e, 'purchaseCost')"
                  clearable
                  :disabled="BIData.purchasePrice !== null"
                >
                  <template #append>RMB</template>
                </el-input>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="头程费用" prop="itemBean.headCost" label-width="180">
                <el-input
                  maxlength="10"
                  v-model="form.itemBean.headCost"
                  class="w-500px"
                  placeholder="请输入具体金额"
                  @blur="(e) => handlePriceBlur(e, 'headCost')"
                  clearable
                  :disabled="BIData.firstPrice !== null"
                >
                  <template #append>RMB</template>
                </el-input>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="尾程费用" prop="itemBean.endCost" label-width="180">
                <el-input
                  maxlength="10"
                  v-model="form.itemBean.endCost"
                  class="w-500px"
                  placeholder="请输入具体金额"
                  @blur="(e) => handlePriceBlur(e, 'endCost')"
                  clearable
                  :disabled="BIData.tailFee !== null"
                >
                  <template #append>RMB</template>
                </el-input>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="关税费用" prop="itemBean.tariffCost" label-width="180">
                <el-input
                  maxlength="10"
                  v-model="form.itemBean.tariffCost"
                  class="w-500px"
                  placeholder="请输入具体金额"
                  @blur="(e) => handlePriceBlur(e, 'tariffCost')"
                  clearable
                  :disabled="BIData.trafficRate !== null"
                >
                  <template #append>RMB</template>
                </el-input>
              </el-form-item>
            </el-col>
          </el-row>
        </KeenCard>
        <KeenCard title="推广前变动成本(仅线上)" class="my-card">
          <el-row style="max-width: 1440px" gutter="10">
            <el-col :span="8">
              <el-form-item label="退款率(含补发)" prop="itemBean.taxRefundRate" label-width="180">
                <!-- @blur="handlePriceBlur2" -->
                <el-input
                  maxlength="10"
                  v-model="form.itemBean.taxRefundRate"
                  class="w-500px"
                  placeholder="请输入比率"
                  @blur="(e) => handlePercentBlur(e, 'taxRefundRate')"
                  clearable
                >
                  <template #append>%</template>
                </el-input>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item
                label="平台佣金率/手续费率"
                prop="itemBean.platformCommissionRate"
                label-width="180"
              >
                <el-input
                  maxlength="10"
                  v-model="form.itemBean.platformCommissionRate"
                  class="w-500px"
                  placeholder="请输入比率"
                  @blur="(e) => handlePercentBlur(e, 'platformCommissionRate')"
                  clearable
                  :disabled="BIData.commissionRate !== null"
                >
                  <template #append>%</template>
                </el-input>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="消费税率" prop="itemBean.consumptionRate" label-width="180">
                <el-input
                  maxlength="10"
                  v-model="form.itemBean.consumptionRate"
                  class="w-500px"
                  placeholder="请输入比率"
                  @blur="(e) => handlePercentBlur(e, 'consumptionRate')"
                  clearable
                  :disabled="BIData.vatRate !== null"
                >
                  <template #append>%</template>
                </el-input>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="其他费用率" prop="itemBean.otherRate" label-width="180">
                <el-input
                  maxlength="10"
                  v-model="form.itemBean.otherRate"
                  class="w-500px"
                  placeholder="请输入比率,预值3%"
                  @blur="(e) => handlePercentBlur(e, 'otherRate')"
                  clearable
                >
                  <template #append>%</template>
                </el-input>
              </el-form-item>
            </el-col>
          </el-row>
        </KeenCard>
        <KeenCard title="推广费用(仅线上)" class="my-card">
          <el-row style="max-width: 1440px" gutter="10">
            <el-col :span="8">
              <el-form-item label="促销折扣率" prop="itemBean.promotionRate" label-width="180">
                <el-input
                  maxlength="10"
                  v-model="form.itemBean.promotionRate"
                  class="w-500px"
                  placeholder="请输入比率"
                  @blur="(e) => handlePercentBlur(e, 'promotionRate')"
                  clearable
                >
                  <template #append>%</template>
                </el-input>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item
                label="渠道广告推广费率"
                prop="itemBean.adPromotionRate"
                label-width="180"
              >
                <el-input
                  maxlength="10"
                  v-model="form.itemBean.adPromotionRate"
                  class="w-500px"
                  placeholder="请输入比率"
                  @blur="(e) => handlePercentBlur(e, 'adPromotionRate')"
                  clearable
                >
                  <template #append>%</template>
                </el-input>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="GTM推广费率" prop="itemBean.gtmPromotionRate" label-width="180">
                <el-input
                  maxlength="10"
                  v-model="form.itemBean.gtmPromotionRate"
                  class="w-500px"
                  placeholder="请输入比率"
                  @blur="(e) => handlePercentBlur(e, 'gtmPromotionRate')"
                  clearable
                >
                  <template #append>%</template>
                </el-input>
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
                <el-input
                  maxlength="10"
                  v-model="form.itemBean.productLineGrossMargin"
                  class="w-500px"
                  placeholder="品线毛利率=1-推广前成本率(固定+变动)-推广费用率"
                  disabled
                >
                  <template #append>%</template>
                </el-input>
              </el-form-item>
            </el-col>
          </el-row>
        </KeenCard>
      </div>
      <div v-if="form.skuBean.priceType === '线下定价'">
        <KeenCard title="定价基准" class="my-card">
          <el-row style="max-width: 1440px" gutter="10">
            <el-col :span="8">
              <!-- <el-form-item label="MSRP USD" prop="itemBean.msrpUsd" label-width="210">
                <el-input
                  maxlength="10"
                  v-model="form.itemBean.msrpUsd"
                  class="w-500px"
                  placeholder="请输入具体金额"
                  @blur="handlePriceBlur"
                  clearable
                />
              </el-form-item> -->
              <el-form-item
                label="MSRP最终定价(当地货币)"
                prop="itemBean.calculatePriceOffline"
                label-width="210"
              >
                <el-input
                  maxlength="10"
                  v-model="form.itemBean.calculatePriceOffline"
                  class="w-500px"
                  placeholder="请输入具体金额"
                  @blur="handlePriceBlur"
                  clearable
                >
                  <template #append v-if="form.itemBean.currencyCodeOffline">
                    {{ form.itemBean.currencyCodeOffline }}
                  </template>
                </el-input>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="促销折扣率" prop="itemBean.promotionRate" label-width="210">
                <el-input
                  maxlength="10"
                  :max="99.999"
                  v-model="form.itemBean.promotionRate"
                  class="w-500px"
                  placeholder="请输入比率"
                  @blur="(e) => handlePercentBlur(e, 'promotionRate')"
                  clearable
                >
                  <template #append>%</template>
                </el-input>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item
                label="Retail Margin零售毛利率"
                prop="itemBean.retailMargin"
                label-width="210"
              >
                <el-input
                  maxlength="10"
                  v-model="form.itemBean.retailMargin"
                  class="w-500px"
                  placeholder="请输入具体比率"
                  @blur="(e) => handlePercentBlur(e, 'retailMargin')"
                  clearable
                >
                  <template #append>%</template>
                </el-input>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item
                label="Dist Margin经销商毛利率"
                prop="itemBean.distMargin"
                label-width="210"
              >
                <el-input
                  maxlength="10"
                  v-model="form.itemBean.distMargin"
                  class="w-500px"
                  placeholder="请输入具体比率"
                  @blur="(e) => handlePercentBlur(e, 'distMargin')"
                  clearable
                >
                  <template #append>%</template>
                </el-input>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item
                label="Av Sellout Price(折后价)"
                prop="itemBean.selloutPrice"
                label-width="210"
              >
                <el-input
                  maxlength="10"
                  v-model="form.itemBean.selloutPrice"
                  class="w-500px"
                  placeholder="MSRP*(1-促销折扣率)"
                  @blur="handlePriceBlur"
                  clearable
                  disabled
                >
                  <template #append v-if="form.itemBean.currencyCodeOffline">
                    {{ form.itemBean.currencyCodeOffline }}
                  </template>
                </el-input>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item
                label="Invoice Price Sell-in价格"
                prop="itemBean.invoicePrice"
                label-width="210"
              >
                <el-input
                  maxlength="10"
                  v-model="form.itemBean.invoicePrice"
                  class="w-500px"
                  placeholder="折后价*(1-零售毛利率)*(1-经销商毛利率)"
                  @blur="handlePriceBlur"
                  clearable
                  disabled
                >
                  <template #append v-if="form.itemBean.currencyCodeOffline">
                    {{ form.itemBean.currencyCodeOffline }}
                  </template>
                </el-input>
              </el-form-item>
            </el-col>
          </el-row>
        </KeenCard>
        <KeenCard title="推广前固定成本" class="my-card">
          <el-row style="max-width: 1440px" gutter="10">
            <el-col :span="8">
              <el-form-item label="采购成本" prop="itemBean.purchaseCost" label-width="180">
                <el-input
                  maxlength="10"
                  v-model="form.itemBean.purchaseCost"
                  class="w-500px"
                  placeholder="请输入具体金额"
                  @blur="(e) => handlePriceBlur(e, 'purchaseCost')"
                  clearable
                  :disabled="BIData.purchasePrice !== null"
                >
                  <template #append>RMB</template>
                </el-input>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="头程费用" prop="itemBean.headCost" label-width="180">
                <el-input
                  maxlength="10"
                  v-model="form.itemBean.headCost"
                  class="w-500px"
                  placeholder="请输入具体金额"
                  @blur="(e) => handlePriceBlur(e, 'headCost')"
                  clearable
                  :disabled="BIData.firstPrice !== null"
                >
                  <template #append>RMB</template>
                </el-input>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="尾程费用" prop="itemBean.endCost" label-width="180">
                <el-input
                  maxlength="10"
                  v-model="form.itemBean.endCost"
                  class="w-500px"
                  placeholder="请输入具体金额"
                  @blur="(e) => handlePriceBlur(e, 'endCost')"
                  clearable
                  :disabled="BIData.tailFee !== null"
                >
                  <template #append>RMB</template>
                </el-input>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="关税费用" prop="itemBean.tariffCost" label-width="180">
                <el-input
                  maxlength="10"
                  v-model="form.itemBean.tariffCost"
                  class="w-500px"
                  placeholder="请输入具体金额"
                  @blur="(e) => handlePriceBlur(e, 'tariffCost')"
                  clearable
                  :disabled="BIData.trafficRate !== null"
                >
                  <template #append>RMB</template>
                </el-input>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="佣金率" prop="itemBean.commissionRate" label-width="180">
                <el-input
                  maxlength="10"
                  v-model="form.itemBean.commissionRate"
                  class="w-500px"
                  placeholder="请输入比率"
                  @blur="(e) => handlePercentBlur(e, 'commissionRate')"
                  clearable
                >
                  <template #append>%</template>
                </el-input>
              </el-form-item>
            </el-col>
          </el-row>
        </KeenCard>
        <KeenCard title="MSRP定价测算(仅线下)" class="my-card">
          <el-row style="max-width: 1440px" gutter="10">
            <el-col :span="8">
              <el-form-item label="返点" prop="itemBean.returnPoint" label-width="220">
                <el-input
                  maxlength="10"
                  v-model="form.itemBean.returnPoint"
                  class="w-500px"
                  placeholder="请输入具体比率"
                  @blur="(e) => handlePercentBlur(e, 'returnPoint')"
                >
                  <template #append>%</template>
                </el-input>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="退货" prop="itemBean.returnGoods" label-width="180">
                <el-input
                  maxlength="10"
                  v-model="form.itemBean.returnGoods"
                  class="w-500px"
                  placeholder="请输入具体比率"
                  @blur="(e) => handlePercentBlur(e, 'returnGoods')"
                >
                  <template #append>%</template>
                </el-input>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="渠道营销费用率" prop="itemBean.marketingRate" label-width="180">
                <el-input
                  maxlength="10"
                  v-model="form.itemBean.marketingRate"
                  class="w-500px"
                  placeholder="请输入比率"
                  @blur="(e) => handlePercentBlur(e, 'marketingRate')"
                >
                  <template #append>%</template>
                </el-input>
              </el-form-item>
            </el-col>
            <el-col :span="16">
              <el-form-item label="Sell-in Rev(抵扣后) 主营业务收入" label-width="220">
                <el-input
                  maxlength="10"
                  v-model="form.itemBean.sellInRev"
                  placeholder="Invoice Price *(1-返点-退货)"
                  disabled
                >
                  <template #append v-if="form.itemBean.currencyCodeOffline">
                    {{ form.itemBean.currencyCodeOffline }}
                  </template>
                </el-input>
              </el-form-item>
            </el-col>
            <el-col :span="16">
              <el-form-item label="定价毛利率" label-width="220">
                <el-input
                  maxlength="10"
                  v-model="form.itemBean.pricingMargin"
                  placeholder="(主营业务收入-佣金-尾程费用-头程费用-关税-采购成本)/主营业务收入"
                  disabled
                >
                  <template #append>%</template>
                </el-input>
              </el-form-item>
            </el-col>
            <el-col :span="16">
              <el-form-item label="渠道毛利率" label-width="220">
                <el-input
                  maxlength="10"
                  v-model="form.itemBean.channelMargin"
                  placeholder="定价毛利率-渠道营销费用率"
                  disabled
                >
                  <template #append>%</template>
                </el-input>
              </el-form-item>
            </el-col>
          </el-row>
        </KeenCard>
      </div>
    </el-form>
    <div class="card-footer d-flex justify-content-end py-6 px-9">
      <el-space>
        <el-button @click="cancel">取消</el-button>
        <el-button type="primary" @click="save" v-loading="saveLoading">提交测算</el-button>
      </el-space>
    </div>
    <BindGoods
      ref="selectSpuDialogRef"
      v-if="bindGoodsVisible"
      :visible="bindGoodsVisible"
      @close="handleBindGoodsClose"
      :selected-row="{ productSpu: form.spuCode }"
      :selected-key="form.spuCode"
      select-one
      confirmText="确认"
    />
  </div>
</template>

<script setup lang="ts" name="priceCalculateAdd">
  import { productApi } from '@/api';
  import { ElMessage, ElSelect } from 'element-plus';
  import BindGoods from '@/views/goodscenter/bindGoods/Modal/bindGoods.vue';
  import CountrySelect2 from '@/views/msrpManage/priceCalculate/components/countrySelect.vue';
  import { useTabs } from '@/hooks/tabs';
  import productChannelSelect from './components/productChannelSelect.vue';
  // import currency from 'currency.js';
  const pageLoading = ref(false);
  const router = useRouter();
  const emit = defineEmits(['success']);

  const visible = ref(false);

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
      // countryCode: 'US',
      countryCode: '',
      currencyCode: '',
      operator: '',
      operatorName: '',
      priceType: '线上定价',
      productType: '',
      salePrice: '',
      skuCode: '',
      skuName: '',
      spuCode: '',
      spuName: '',
      version: '',
    },
  });
  const currencyData = ref<any>();
  // 获取 货币汇率
  const queryCurrency = async () => {
    const res = await productApi.luteosProductMsrpCalculationQueryCurrency();
    // console.log('获取汇率 ', res);
    currencyData.value = res;
  };

  // 币种变化
  const handleCurrencyChange = (val, row?) => {
    // console.log('币种变化 ', val);
    if (!val) {
      return;
    }
    if (currencyData.value) {
      const ckeys = Object.keys(currencyData.value);
      if (ckeys.includes(val)) {
        // console.log(ckeys);
        const info = currencyData.value[val];
        exchangeRate.value = info.rateCny;
        // console.log('汇率 ', info.rateCny);
        calculateBiData();
      } else {
        ElMessage.warning('没有查到币种对应汇率!');
      }
    }
  };
  const allEu: any = ref([]);
  const queryAllEuSite = async () => {
    // console.log('queryAllEuSite');
    const res: any = await productApi.luteosProductMsrpCalculationQueryAllEuSite({});
    // console.log('queryAllEuSite ', res);
    allEu.value = res;
  };
  const isEu = ref(false);
  const isUs = ref(false);
  watchEffect(() => {
    if (form.value.skuBean.countryCode) {
      if (
        form.value.skuBean.countryCode === 'US' ||
        form.value.skuBean.countryCode === 'UM' ||
        form.value.skuBean.countryCode === 'UU'
      ) {
        isUs.value = true;
        isEu.value = false;
      } else if (allEu.value.includes(form.value.skuBean.countryCode)) {
        isUs.value = false;
        isEu.value = true;
      } else {
        isUs.value = false;
        isEu.value = false;
      }
    }
    // console.log(allEu.value, form.value.skuBean.countryCode);
    // console.log('是美国', isUs.value);
    // console.log('是欧洲', isEu.value);
  });

  const BIData: any = ref({});
  const queryBiData = async () => {
    resetBiData();
    if (
      form.value.skuBean.spuCode &&
      form.value.skuBean.channel &&
      form.value.skuBean.countryCode &&
      form.value.skuBean.skuCode
    ) {
      const res: any = await productApi.luteosProductMsrpCalculationQueryCalculateBaseData({
        spuCode: form.value.skuBean.spuCode,
        channel: form.value.skuBean.channel,
        countryCode: form.value.skuBean.countryCode,
        skuCode: form.value.skuBean.skuCode,
      });
      // console.log('BI 返回数据', res);
      BIData.value = res;
      if (res.vatRate) {
        form.value.itemBean.vatRate = res.vatRate;
      }
      if (res) {
        calculateBiData();
      }
    }
  };
  // 获取线上 促销折扣率
  const queryOnlinePromotionRate = async () => {
    // console.log(form.value.skuBean.priceType);
    if (
      form.value.skuBean.spuCode &&
      form.value.skuBean.channel &&
      form.value.skuBean.countryCode &&
      form.value.skuBean.skuCode
    ) {
      if (form.value.skuBean.priceType === '线下定价') {
        const res: any = await productApi.luteosProductMsrpCalculationGetOnlinePromotionRate({
          spuCode: form.value.skuBean.spuCode,
          channel: form.value.skuBean.channel,
          countryCode: form.value.skuBean.countryCode,
          skuCode: form.value.skuBean.skuCode,
        });
        // console.log('促销折扣率 返回:', res);
        if (res.promotionRate) {
          form.value.itemBean.promotionRate = res.promotionRate;
        } else {
          form.value.itemBean.promotionRate = '';
        }
      } else {
        form.value.itemBean.promotionRate = '';
      }
    }
  };
  const hasPirce = ref(false);
  // 获取当前价
  const queryCurrentPrice = async () => {
    if (
      form.value.skuBean.spuCode &&
      form.value.skuBean.countryCode &&
      form.value.skuBean.skuCode
    ) {
      const res: any = await productApi.luteosProductMsrpQueryOneSkuDetail({
        spuCode: form.value.skuBean.spuCode,
        countryCode: form.value.skuBean.countryCode,
        skuCode: form.value.skuBean.skuCode,
      });
      if (res?.currencyCode) {
        form.value.itemBean.currencyCodeLocal = res.currencyCode;
      } else {
        form.value.itemBean.currencyCodeLocal = '';
      }
      // console.log('当前价 单位', form.value.itemBean.currencyCodeLocal);
      if (res?.minSalePrice) {
        form.value.itemBean.calculatePriceLocal = res.minSalePrice;
        // console.log('获取当前价 res.minSalePrice', res.minSalePrice);
      } else {
        form.value.itemBean.calculatePriceLocal = '';
      }
    }
  };
  // queryCurrentPrice();
  // 汇率
  const exchangeRate = ref<any>(1);

  const resetBiData = () => {
    // console.log('resetBiData');
    form.value.itemBean.purchaseCost = '';
    form.value.itemBean.headCost = '';
    form.value.itemBean.endCost = '';
    form.value.itemBean.tariffCost = '';
    form.value.itemBean.consumptionRate = '';
    form.value.itemBean.platformCommissionRate = '';
  };
  const calculateBiData = () => {
    // console.log('计算 Bi数据 -----');
    if (
      BIData.value.purchasePrice !== null &&
      BIData.value.purchasePrice !== undefined &&
      BIData.value.purchasePrice >= 0
    ) {
      form.value.itemBean.purchaseCost = BIData.value.purchasePrice.toFixed(2) ?? '';
    }
    if (
      BIData.value.firstPrice !== null &&
      BIData.value.firstPrice !== undefined &&
      BIData.value.firstPrice >= 0
    ) {
      form.value.itemBean.headCost = BIData.value.firstPrice.toFixed(2) ?? '';
    }
    if (
      BIData.value.tailFee !== null &&
      BIData.value.tailFee !== undefined &&
      BIData.value.tailFee >= 0
    ) {
      form.value.itemBean.endCost = BIData.value.tailFee.toFixed(2) ?? '';
    }

    if (
      BIData.value.vatRate !== null &&
      BIData.value.vatRate !== undefined &&
      BIData.value.vatRate >= 0
    ) {
      form.value.itemBean.consumptionRate = (BIData.value.vatRate * 100).toFixed(2);
    }
    if (
      BIData.value.commissionRate !== null &&
      BIData.value.commissionRate !== undefined &&
      BIData.value.commissionRate >= 0
    ) {
      form.value.itemBean.platformCommissionRate =
        (BIData.value.commissionRate * 100).toFixed(2) ?? '';
    }
  };
  const isNumber = (value) => {
    return !isNaN(value) && !isNaN(parseFloat(value));
  };
  // 线上
  watchEffect(() => {
    // console.log('开始计算关税 ', BIData.value.trafficRate, isUs.value, isEu.value);
    if (isNumber(BIData.value.trafficRate)) {
      if (isUs.value) {
        // 美国  关税税率
        form.value.itemBean.tariffCost = (
          BIData.value.purchasePrice *
          1.05 *
          BIData.value.trafficRate
        ).toFixed(2);
      } else if (isEu.value) {
        // 欧洲 msrp * 关税税率
        // 判断是线上定价 , 还是 线下定价
        if (form.value.skuBean.priceType === '线上定价') {
          form.value.itemBean.tariffCost = '';
          if (isNumber(form.value.itemBean.calculatePriceFinal)) {
            form.value.itemBean.tariffCost = (
              form.value.itemBean.calculatePriceFinal *
              exchangeRate.value *
              BIData.value.trafficRate
            ).toFixed(2);
          }
        } else {
          form.value.itemBean.tariffCost = '';
          if (isNumber(form.value.itemBean.calculatePriceOffline)) {
            form.value.itemBean.tariffCost = (
              form.value.itemBean.calculatePriceOffline *
              exchangeRate.value *
              BIData.value.trafficRate
            ).toFixed(2);
          }
        }
      } else {
        form.value.itemBean.tariffCost = 0;
      }
      // console.log('关税费用 ', form.value.skuBean.priceType, form.value.itemBean.tariffCost);
    }
    if (
      isNumber(form.value.itemBean.purchaseCost) &&
      isNumber(form.value.itemBean.headCost) &&
      isNumber(form.value.itemBean.endCost) &&
      isNumber(form.value.itemBean.tariffCost) &&
      isNumber(form.value.itemBean.calculatePriceFinal) &&
      isNumber(form.value.itemBean.taxRefundRate) &&
      isNumber(form.value.itemBean.platformCommissionRate) &&
      isNumber(form.value.itemBean.consumptionRate) &&
      isNumber(form.value.itemBean.otherRate) &&
      isNumber(form.value.itemBean.promotionRate) &&
      isNumber(form.value.itemBean.adPromotionRate) &&
      isNumber(form.value.itemBean.gtmPromotionRate) &&
      exchangeRate.value
    ) {
      // console.log('计算线上毛利率 ');
      form.value.itemBean.productLineGrossMargin = (
        100 -
        ((form.value.itemBean.purchaseCost * 1 +
          form.value.itemBean.headCost * 1 +
          form.value.itemBean.endCost * 1 +
          form.value.itemBean.tariffCost * 1) /
          (form.value.itemBean.calculatePriceFinal * exchangeRate.value)) *
          100 -
        (form.value.itemBean.taxRefundRate * 1 +
          form.value.itemBean.platformCommissionRate * 1 +
          form.value.itemBean.consumptionRate * 1 +
          form.value.itemBean.otherRate * 1) -
        (form.value.itemBean.promotionRate * 1 +
          form.value.itemBean.adPromotionRate * 1 +
          form.value.itemBean.gtmPromotionRate * 1)
      ).toFixed(2);
    }
    // else {
    //   // console.log('清空线上毛利率');
    //   form.value.itemBean.productLineGrossMargin = '';
    // }
  });

  // 线下
  watchEffect(() => {
    if (
      isNumber(form.value.itemBean.calculatePriceOffline) &&
      isNumber(form.value.itemBean.promotionRate) &&
      isNumber(form.value.itemBean.retailMargin) &&
      isNumber(form.value.itemBean.distMargin)
    ) {
      // console.log(
      //   form.value.itemBean.calculatePriceOffline,
      //   (form.value.itemBean.calculatePriceOffline * form.value.itemBean.consumptionRate) / 100
      // );
      form.value.itemBean.selloutPrice = (
        form.value.itemBean.calculatePriceOffline *
        (1 - form.value.itemBean.promotionRate / 100)
      ).toFixed(2);
      // console.log('sellingPrice', form.value.itemBean.sellingPrice);
      form.value.itemBean.invoicePrice = (
        form.value.itemBean.selloutPrice *
        (1 - form.value.itemBean.retailMargin / 100) *
        (1 - form.value.itemBean.distMargin / 100)
      ).toFixed(2);
    }
    if (
      isNumber(form.value.itemBean.invoicePrice) &&
      isNumber(form.value.itemBean.returnPoint) &&
      isNumber(form.value.itemBean.returnGoods)
    ) {
      form.value.itemBean.sellInRev = (
        form.value.itemBean.invoicePrice *
        (1 - form.value.itemBean.returnPoint / 100 - form.value.itemBean.returnGoods / 100)
      ).toFixed(2);
    }
    if (
      isNumber(form.value.itemBean.sellInRev) &&
      parseInt(form.value.itemBean.sellInRev, 10) !== 0 &&
      isNumber(form.value.itemBean.purchaseCost) &&
      isNumber(form.value.itemBean.headCost) &&
      isNumber(form.value.itemBean.endCost) &&
      isNumber(form.value.itemBean.tariffCost) &&
      isNumber(form.value.itemBean.commissionRate)
    ) {
      // console.log('汇率', exchangeRate.value);
      // console.log('主营业务收入* 汇率 ', form.value.itemBean.sellInRev * exchangeRate.value);
      // console.log(
      //   '推广前固定成本 ',
      //   form.value.itemBean.purchaseCost * 1 +
      //     form.value.itemBean.headCost * 1 +
      //     form.value.itemBean.endCost * 1 +
      //     form.value.itemBean.tariffCost * 1
      // );
      // console.log(
      //   '佣金* 汇率 ',
      //   form.value.itemBean.calculatePriceOffline *
      //     (form.value.itemBean.commissionRate / 100) *
      //     exchangeRate.value
      // );
      // console.log(
      //   '定价毛利 ',
      //   form.value.itemBean.sellInRev * exchangeRate.value -
      //     form.value.itemBean.purchaseCost -
      //     form.value.itemBean.headCost -
      //     form.value.itemBean.endCost -
      //     form.value.itemBean.tariffCost -
      //     form.value.itemBean.calculatePriceOffline *
      //       (form.value.itemBean.commissionRate / 100) *
      //       exchangeRate.value
      // );
      // 定价毛利率
      form.value.itemBean.pricingMargin = (
        ((form.value.itemBean.sellInRev * exchangeRate.value -
          form.value.itemBean.purchaseCost -
          form.value.itemBean.headCost -
          form.value.itemBean.endCost -
          form.value.itemBean.tariffCost -
          form.value.itemBean.calculatePriceOffline *
            (form.value.itemBean.commissionRate / 100) *
            exchangeRate.value) /
          (form.value.itemBean.sellInRev * exchangeRate.value)) *
        100
      ).toFixed(2);
    } else {
      form.value.itemBean.pricingMargin = '';
    }
    // 渠道毛利率
    if (
      isNumber(form.value.itemBean.pricingMargin) &&
      isNumber(form.value.itemBean.marketingRate)
    ) {
      // console.log(form.value.itemBean.pricingMargin, form.value.itemBean.marketingRate);
      form.value.itemBean.channelMargin = (
        form.value.itemBean.pricingMargin - form.value.itemBean.marketingRate
      ).toFixed(2);
    } else {
      form.value.itemBean.channelMargin = '';
    }
  });

  const rules = reactive({
    'skuBean.spuCode': [
      {
        required: true,
        message: '请选择商品',
        trigger: 'change',
      },
    ],
    'skuBean.countryCode': [
      {
        required: true,
        message: '请选择国家',
        trigger: 'change',
      },
    ],
    'skuBean.channel': [
      {
        required: true,
        message: '请选择渠道',
        trigger: 'change',
      },
    ],
    'skuBean.sceneType': [
      {
        required: true,
        message: '请选择细分场景',
        trigger: 'change',
      },
    ],
    'skuBean.operator': [
      {
        required: true,
        message: '请选择运营人员',
        trigger: 'change',
      },
    ],
    'skuBean.priceType': [
      {
        required: true,
        message: '请输入定价类型',
        trigger: ['blur'],
      },
    ],
    currencyCode: [
      {
        required: true,
        message: '请选择币种',
        trigger: 'change',
      },
    ],
    'itemBean.adPromotionRate': [
      {
        required: true,
        message: '请输入',
        trigger: ['blur'],
      },
    ],
    'itemBean.calculatePrice': [
      {
        required: true,
        message: '请输入',
        trigger: ['blur'],
      },
    ],
    'itemBean.calculatePriceFinal': [
      {
        required: true,
        message: '请输入',
        trigger: ['blur'],
      },
    ],
    'itemBean.calculatePriceLocal': [
      {
        required: false,
        message: '请输入',
        trigger: ['blur'],
      },
    ],
    'itemBean.companyCode': [
      {
        required: true,
        message: '请输入',
        trigger: ['blur'],
      },
    ],
    'itemBean.consumptionRate': [
      {
        required: true,
        message: '请输入',
        trigger: ['blur'],
      },
    ],
    'itemBean.currencyCode': [
      {
        required: true,
        message: '请选择',
        trigger: ['blur'],
      },
    ],
    'itemBean.currencyCodeFinal': [
      {
        required: true,
        message: '请输入',
        trigger: ['blur'],
      },
    ],
    'itemBean.currencyCodeLocal': [
      {
        required: true,
        message: '请输入',
        trigger: ['blur'],
      },
    ],
    'itemBean.currencyCodeRmb': [
      {
        required: true,
        message: '请输入',
        trigger: ['blur'],
      },
    ],
    'itemBean.endCost': [
      {
        required: true,
        message: '请输入',
        trigger: ['blur'],
      },
    ],
    'itemBean.gtmPromotionRate': [
      {
        required: true,
        message: '请输入',
        trigger: ['blur'],
      },
    ],
    'itemBean.headCost': [
      {
        required: true,
        message: '请输入',
        trigger: ['blur'],
      },
    ],
    'itemBean.mdf': [
      {
        required: true,
        message: '请输入',
        trigger: ['blur'],
      },
    ],
    'itemBean.otherCost': [
      {
        required: true,
        message: '请输入',
        trigger: ['blur'],
      },
    ],
    'itemBean.otherRate': [
      {
        required: true,
        message: '请输入',
        trigger: ['blur'],
      },
    ],
    'itemBean.platformCommissionRate': [
      {
        required: true,
        message: '请输入',
        trigger: ['blur'],
      },
    ],
    'itemBean.calculatePriceOffline': [
      {
        required: true,
        message: '请输入',
        trigger: ['blur'],
      },
    ],
    'itemBean.promotionRate': [
      {
        required: true,
        message: '请输入',
        trigger: ['blur'],
      },
    ],
    'itemBean.retailMargin': [
      {
        required: true,
        message: '请输入',
        trigger: ['blur'],
      },
    ],
    'itemBean.distMargin': [
      {
        required: true,
        message: '请输入',
        trigger: ['blur'],
      },
    ],
    'itemBean.commissionRate': [
      {
        required: true,
        message: '请输入',
        trigger: ['blur'],
      },
    ],
    'itemBean.returnPoint': [
      {
        required: true,
        message: '请输入',
        trigger: ['blur'],
      },
    ],
    'itemBean.returnGoods': [
      {
        required: true,
        message: '请输入',
        trigger: ['blur'],
      },
    ],
    'itemBean.marketingRate': [
      {
        required: true,
        message: '请输入',
        trigger: ['blur'],
      },
    ],
    'itemBean.purchaseCost': [
      {
        required: true,
        message: '请输入',
        trigger: ['blur'],
      },
    ],
    'itemBean.tariffCost': [
      {
        required: true,
        message: '请输入',
        trigger: ['blur'],
      },
    ],
    'itemBean.taxRefundRate': [
      {
        required: true,
        message: '请输入',
        trigger: ['blur'],
      },
    ],
  });

  const luteChannelList: any = ref([]);
  const luteSceneList: any = ref(['Dropship-DDP', 'Reatil-DDP', 'Dist-DDP', 'Dist-FOB SZ']);
  // const lutePlatformList: any = ref([]);
  const queryOptions = async () => {
    // const res = await productApi.luteosProductSaleSkuQueryLuteChannelList();
    // luteChannelList.value = res?.luteChannelList;
    const res = await productApi.luteosProductMsrpCalculationQueryChannel();
    luteChannelList.value = res || [];
    // lutePlatformList.value = res?.lutePlatformList;
  };
  queryOptions();
  // 选择商品
  const selectSpuDialogRef = ref();
  const bindGoodsVisible = ref(false);
  const select = async () => {
    bindGoodsVisible.value = true;
    await nextTick();
    selectSpuDialogRef.value?.open();
  };
  const handleBindGoodsClose = async (reload = false, val) => {
    if (reload) {
      form.value.skuBean.spuCode = val?.productSpu;
      form.value.skuBean.spuName = val?.name;
      formRef.value?.validateField('spuCode');
      querySkuList();
      form.value.skuBean.skuCode = '';
    }
    bindGoodsVisible.value = false;
  };

  // const regex = /^[1-9]\d{1,9}(\.\d{1,2})?$/;
  const regex = /^(?!0+(?:\.0+)?$)(?:[1-9]\d*|0)(?:\.\d{1,2})?$/;
  const regex2 = /^\d{1,10}(\.\d{1,2})?$/;
  const handlePriceBlur = (e, key?) => {
    // console.log('e.target', e.target);
    const inputEle = e.target.querySelector('.el-input__inner');
    // console.log('inputEle', inputEle, inputEle?.disabled);
    if (inputEle?.disabled) {
      return;
    }
    if (e.target.value === '') {
      return;
    }
    // if (!regex.test(e.target.value)) {
    //   ElMessage.warning('请输⼊正数，最多保留2位⼩数');
    //   if (key) {
    //     form.value.itemBean[key] = '';
    //   }
    //   e.target.value = '';
    // }
    if (!regex2.test(e.target.value)) {
      ElMessage.warning('请输⼊非负数，最多保留2位⼩数');
      if (key) {
        form.value.itemBean[key] = '';
      }
      e.target.value = '';
    }
  };
  // 校验 百分比
  const handlePercentBlur = (e, key?) => {
    if (e.target.value === '') {
      return;
    }
    if (!regex2.test(e.target.value)) {
      ElMessage.warning('请输⼊非负数，最多保留2位⼩数');
      if (key) {
        form.value.itemBean[key] = '';
      }
      e.target.value = '';
    }
    if (e.target.value > 100) {
      ElMessage.warning('比率不能超过100,请重新输⼊');
      if (key) {
        form.value.itemBean[key] = '';
      }
      e.target.value = '';
    }
  };
  const handlePriceBlur2 = (e) => {
    if (e.target.value === '') {
      return;
    }
    if (!regex2.test(e.target.value)) {
      ElMessage.warning('请输⼊非负数，最多保留2位⼩数');
      e.target.value = '';
    }
  };

  const handlePriceChange = (val, cur) => {
    const row = form.value.saveBeanList[0];
    if (!regex.test(val)) {
      ElMessage.warning('请输⼊数字，最多保留2位⼩数');
      cur.minSalePrice = 1;
    }
    let min = row?.skuBeanList?.[0]?.minSalePrice || 0;
    let max = row?.skuBeanList?.[0]?.minSalePrice || 0;

    row?.skuBeanList?.forEach((sku) => {
      if (sku.minSalePrice && sku.minSalePrice < min) {
        min = sku.minSalePrice;
      }
      if (sku.minSalePrice && sku.minSalePrice > max) {
        max = sku.minSalePrice;
      }
    });
    row.priceRange = min === max ? min : `${min}-${max}`;
    row.minSalePrice = min;
    row.maxSalePrice = max;
  };

  const saveLoading = ref(false);

  const { closeTabAndRefresh } = useTabs();
  const save = async () => {
    const isValid = await formRef.value?.validate().catch(() => {
      return false; // 校验失败返回 false，不继续执行
    });
    if (!isValid) return;
    // if (!form.value?.saveBeanList?.length) {
    //   ElMessage.warning('暂无可提交数据');
    //   return;
    // }
    try {
      saveLoading.value = true;
      // console.log('form.value ', form.value);
      // return;
      const res = await productApi.luteosProductMsrpCalculationSave(form.value);
      ElMessage.success('保存成功');
      resetFormData();
      emit('success');
      closeTabAndRefresh('priceCalculate');
      router.push({
        name: 'priceCalculate',
      });
    } finally {
      saveLoading.value = false;
    }
  };
  const cancel = () => {
    // visible.value = false;
    // if (!isEdit.value) {
    //   resetFormData();
    // }
    closeTabAndRefresh('priceCalculate');
    router.push({
      name: 'priceCalculate',
    });
  };
  const isAdd = computed(() => {
    return route.fullPath.includes('/add');
  });
  const isEdit = computed(() => {
    return route.fullPath.includes('/edit');
  });

  onMounted(async () => {
    // console.log('onMounted ---------- ');
    // 获取全欧洲 国家
    queryAllEuSite();
    // 获取汇率
    queryCurrency();
    // 每次进来 ,如果是复制, 请求数据 , 编辑重新查询 最新 BI 数据 ,交互 待确认------------
    if (route.query.code) {
      await getDetailData();
      queryCurrentPrice();
      resetBiData();
      queryBiData();
      queryOnlinePromotionRate();
      handleCurrencyChange(form.value.itemBean.currencyCodeFinal);
      // console.log('汇率 ', form.value.itemBean.currencyCodeFinal, exchangeRate.value);
    }
    // resetFormData();
  });
  // onUnmounted(() => {
  //   // console.log('onUnmounted 222');
  //   resetFormData();
  // });

  const route = useRoute();
  // 查询详情
  const getDetailData = async () => {
    pageLoading.value = true;
    setTimeout(() => {
      pageLoading.value = false;
    }, 8000);
    // console.log('开始查详情');
    if (route.query.code) {
      const res: any = await productApi.luteosProductMsrpCalculationQueryDetail({
        id: route.query.code,
      });
      // console.log('详情 ', res);
      form.value = res;
      pageLoading.value = false;
    }
  };
  // onActivated(() => {
  //   // resetFormData();
  // // console.log('onActivated -----------');
  // });

  // onDeactivated(() => {
  // // console.log('onDeactivated ---------');
  // });
  const countryRef: any = ref('');
  const getCurrency = (countryCode?) => {
    // console.log('获取货币单位 ', countryRef.value.getCurreny());
    // form.value.itemBean.currencyCode = countryRef.value.getCurreny();
    form.value.itemBean.currencyCodeFinal = countryRef.value.getCurreny();
    form.value.itemBean.currencyCodeOffline = countryRef.value.getCurreny();
    return form.value.itemBean.currencyCodeFinal;
  };

  const loading = ref(false);
  const handleCountryChange = async () => {
    // console.log('国家改变', form.value.skuBean.countryCode);
    // 国家 去找 货币单位
    getCurrency();
    // 货币单位 去找 对应汇率
    handleCurrencyChange(form.value.itemBean.currencyCodeFinal);
    queryCurrentPrice();
    resetBiData();
    queryBiData();
    queryOnlinePromotionRate();
  };
  const handleChannelChange = async () => {
    // console.log('handleChannelChange');
    resetBiData();
    queryBiData();
    queryOnlinePromotionRate();
  };
  const handlePriceTypeChange = async () => {
    // console.log('handlePriceTypeChange');
    queryOnlinePromotionRate();
  };

  const skuList = ref([]);
  const querySkuList = async () => {
    if (!form.value.skuBean.spuCode) return;
    const res = await productApi.luteosProductSkuQueryProductSkuList({
      keyWord: form.value.skuBean.spuCode,
      pageNum: 1,
      pageSize: 100,
    });
    skuList.value = res?.productSkuBeanList?.map((item) => item.skuCode);
  };

  const handleSkuChange = (val) => {
    // resetBiData();
    handleCountryChange();
  };
  const resetFormData = () => {
    form.value.skuBean = {
      channel: '',
      // countryCode: 'US',
      countryCode: '',
      currencyCode: '',
      operator: '',
      operatorName: '',
      priceType: '线上定价',
      productType: '',
      salePrice: '',
      skuCode: '',
      skuName: '',
      spuCode: '',
      spuName: '',
      version: '',
    };
    formRef.value?.resetFields();
  };
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
