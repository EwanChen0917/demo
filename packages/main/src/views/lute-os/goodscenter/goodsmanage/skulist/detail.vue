<template>
  <el-form label-width="180px" label-position="left" class="custom-form">
    <KeenCard title="基础信息">
      <el-form-item label="产品图">
        <KeenImageUpload
          v-if="form.productImageList?.length > 0"
          disabled
          v-model="form.productImageList[0]"
        />
      </el-form-item>
      <div class="item-grid">
        <el-form-item label="产品分类：" prop="categoryNames">
          <span>{{ form?.categoryNames }}</span>
        </el-form-item>
        <el-form-item label="产品SPU：" prop="productSpu">
          <span>{{ form?.productSpu }}</span>
          <router-link
            class="ms-5"
            target="_blank"
            v-if="form.productSpu"
            :to="`/goodslist/detail?code=${form.productSpu}`"
          >
            产品详情
          </router-link>
        </el-form-item>
        <el-form-item label="产品SKU：" prop="skuCode">
          <span>{{ form?.skuCode }}</span>
        </el-form-item>
        <el-form-item label="产品SKU状态：" prop="state">
          <Tag :color="colorMap[form?.state]">{{ form?.stateDesc }}</Tag>
        </el-form-item>
        <el-form-item label="产品SKU属性：" prop="attrValueNames">
          <el-tag v-if="form.attrValueNames">{{ form?.attrValueNames }}</el-tag>
        </el-form-item>
        <el-form-item label="产品类型：" prop="productTypeDesc">
          <span>{{ form?.productTypeDesc }}</span>
        </el-form-item>
        <el-form-item class="group-form-item" label="产品SKU建议销售价：">
          <el-form-item prop="suggestPrice">
            <span>{{ form?.suggestPrice }}</span>
            <span class="ms-3 text-gray-600">{{ form?.suggestPriceCurrencyDesc }}</span>
          </el-form-item>
        </el-form-item>
        <el-form-item label="产品中文名：" prop="productTitle">
          <span>{{ form?.productTitle }}</span>
        </el-form-item>
        <el-form-item label="产品英文名：" prop="productTitleEn">
          <span>{{ form?.productTitleEn }}</span>
        </el-form-item>
        <el-form-item label="线上产品全称：">
          <span>{{ form?.onlineProductFullName }}</span>
        </el-form-item>
        <el-form-item label="产品经理：" prop="createByName">
          <span>{{ form?.createByName }}</span>
        </el-form-item>
        <el-form-item label="品牌：" prop="brandName">
          <span>{{ form?.brandName }}</span>
        </el-form-item>
        <el-form-item label="默认供应链SKU：" prop="supplierName">
          <router-link
            class="ms-5"
            target="_blank"
            v-if="form.defaultProductSku"
            :to="`/supplyGoods?keyword=${form.defaultProductSku}`"
          >
            查看
          </router-link>
        </el-form-item>
        <el-form-item label="型号：" prop="modelName">
          <span>{{ form?.modelName }}</span>
        </el-form-item>
        <el-form-item label="EAN 13码：">
          <span>{{ form?.ean13 }}</span>
        </el-form-item>
        <el-form-item label="EAN 14码：">
          <span>{{ form?.ean14 }}</span>
        </el-form-item>
      </div>
      <el-form-item label="彩盒内的所有产品及配件：">
        <div class="textarea">{{ form?.colorBoxContents }}</div>
      </el-form-item>
      <el-form-item label="卖点：">
        <div class="textarea">
          {{ form?.sellingPoint }}
        </div>
      </el-form-item>
      <el-form-item label="在线完整产品规格（要点）：">
        <div class="textarea">{{ form?.onlineFullProductSpecs }}</div>
      </el-form-item>
    </KeenCard>
    <!--      <KeenCard class="w-50" title="规格信息">
        <SpecificationsInfo
          ref="specificationsInfoFormRef"
          v-model:form="form.productSpec"
          mode="detail"
        />
      </KeenCard>-->
    <KeenCard title="组合信息" v-if="isProductGroup">
      <el-table :data="form.skuItemBeanList">
        <el-table-column label="产品信息" min-width="200">
          <template #default="{ row }">
            <GoodsInfo
              :src="(row.productImageUrl && row.productImageUrl[0]) || ''"
              :title="row.name"
            >
              <template #description>
                <div class="d-flex">
                  <span style="flex: 1">{{ row.skuCode }}</span>
                  <Tag :color="colorMap[row?.state]" style="margin-left: 10px">
                    {{ row?.stateDesc }}
                  </Tag>
                </div>
              </template>
            </GoodsInfo>
          </template>
        </el-table-column>
        <el-table-column label="建议售价（单价）" min-width="100">
          <template #default="{ row }">
            <div class="w-100 d-flex gap-2">
              <span>{{ row?.suggestPrice }}</span>
              <span class="text-gray-500">{{ row?.suggestPriceCurrencyCode }}</span>
            </div>
          </template>
        </el-table-column>
        <el-table-column label="数量" min-width="60">
          <template #default="{ row, $index }">
            <el-input v-model="row.qty" v-if="editIndex === $index" />
            <span v-else>{{ row?.qty }}</span>
          </template>
        </el-table-column>
        <el-table-column label="费用占比" min-width="80">
          <template #default="{ row }">
            <span v-if="row.suggestPrice && row.qty">
              {{ (((row.formatPrice * row.qty) / totalPrice) * 100).toFixed(2) + '%' }}
            </span>
          </template>
        </el-table-column>
        <el-table-column label="类型" prop="typeDesc" min-width="60" />
        <el-table-column label="产品经理" prop="developLuteName" min-width="80" />
      </el-table>
    </KeenCard>
    <div class="d-flex gap-5">
      <KeenCard title="" class="tab-card">
        <el-tabs v-model="tabCurrent">
          <el-tab-pane label="报关信息" :name="0">
            <KeenCard>
              <div class="item-grid">
                <el-form-item label="中文报关品名：" prop="productDeclare.declareName">
                  <OverflowTooltip :content="form?.productDeclare?.declareName" :line="1" />
                </el-form-item>
                <el-form-item label="英文报关品名：" prop="productDeclare.declareNameEn">
                  <OverflowTooltip :content="form?.productDeclare?.declareNameEn" :line="1" />
                </el-form-item>
                <el-form-item label="出口申报价值：" prop="productDeclare.declarePrice">
                  <span>{{ form?.productDeclare?.declarePrice }}</span>
                  <span class="ms-3 text-gray-600">
                    {{ form?.productDeclare?.declareCurrency }}
                  </span>
                </el-form-item>
                <el-form-item label="出口海关编码：">
                  <OverflowTooltip :content="form?.productDeclare?.hsCode" :line="1" />
                </el-form-item>
                <el-form-item label="成交单位：">
                  <OverflowTooltip :content="form?.productDeclare?.transactionUnit" :line="1" />
                </el-form-item>
                <el-form-item label="申报要素：">
                  <OverflowTooltip :content="form?.productDeclare?.declareElement" :line="1" />
                </el-form-item>
                <el-form-item label="境内货源地：">
                  <OverflowTooltip :content="form?.productDeclare?.territoryGoods" :line="1" />
                </el-form-item>
                <el-form-item label="征免：">
                  <OverflowTooltip :content="form?.productDeclare?.taxExemptionDesc" :line="1" />
                </el-form-item>
                <el-form-item label="申报说明：">
                  <OverflowTooltip :content="form?.productDeclare?.declareExplain" :line="1" />
                </el-form-item>
                <el-form-item label="海关属性：">
                  <OverflowTooltip :content="form?.productDeclare?.hsAttrDesc" :line="1" />
                </el-form-item>
                <el-form-item label="中文材质：">
                  <OverflowTooltip
                    :content="form?.productDeclare?.productMaterialIngredient"
                    :line="1"
                  />
                </el-form-item>
                <el-form-item label="英文材质：">
                  <OverflowTooltip
                    :content="form?.productDeclare?.productMaterialIngredientEn"
                    :line="1"
                  />
                </el-form-item>

                <el-form-item label="中文用途：">
                  <OverflowTooltip :content="form?.productDeclare?.useCn" :line="1" />
                </el-form-item>
                <el-form-item label="英文用途：">
                  <span>{{ form?.productDeclare?.useEn }}</span>
                  <OverflowTooltip :content="form?.productDeclare?.useEn" :line="1" />
                </el-form-item>
              </div>
            </KeenCard>
          </el-tab-pane>
          <el-tab-pane label="清关信息" :name="1">
            <KeenCard title="">
              <el-table :data="form.productClearanceList" class-name="table-row-dashed">
                <el-table-column prop="hsImportCode" label="清关编码" />
                <el-table-column prop="hsTariffRate" label="清关税率">
                  <template #default="{ row }">
                    <span v-if="row.hsTariffRate">{{ row.hsTariffRate }}%</span>
                    <span v-else>--</span>
                  </template>
                </el-table-column>
                <el-table-column prop="hsImportPrice" label="申报单价" min-width="150">
                  <template #default="{ row }">
                    <span v-if="row.hsImportPrice">
                      {{ parseFloat(row.hsImportPrice).toFixed(2) }} {{ row.hsImportCurrencyDesc }}
                    </span>
                    <span v-else>--</span>
                  </template>
                </el-table-column>
                <el-table-column prop="countryNames" label="适用国家" />
              </el-table>
            </KeenCard>
          </el-tab-pane>
          <el-tab-pane label="产品包装信息" :name="3">
            <KeenCard>
              <div class="item-grid">
                <el-form-item label="材质：">
                  <span>{{ form?.productSpec?.material || '-' }}</span>
                </el-form-item>
                <el-form-item label="产品净重：">
                  <span>{{ form?.productSpec?.productNetWeight || '-' }}kg</span>
                </el-form-item>
                <el-form-item label="产品毛重：">
                  <span>{{ form?.productSpec?.productWeight || '-' }}kg</span>
                </el-form-item>
                <el-form-item label="外箱毛重：">
                  <span>{{ form?.productSpec?.cartonWeight || '-' }}kg</span>
                </el-form-item>
                <el-form-item label="外箱净重：">
                  <span>{{ form?.productSpec?.cartonNetWeight || '-' }}kg</span>
                </el-form-item>
                <el-form-item label="单箱数量：">
                  <span>{{ form?.productSpec?.cartonNum || '-' }}</span>
                </el-form-item>
                <el-form-item label="产品净尺寸：">
                  <el-space>
                    <span>{{ form?.productSpec?.productNetLength || '-' }}cm</span>
                    *
                    <span>{{ form?.productSpec?.productNetWidth || '-' }}cm</span>
                    *
                    <span>{{ form?.productSpec?.productNetHeight || '-' }}cm</span>
                  </el-space>
                </el-form-item>

                <el-form-item label="包装尺寸：">
                  <el-space>
                    <span>{{ form?.productSpec?.productLength || '-' }}cm</span>
                    *
                    <span>{{ form?.productSpec?.productWidth || '-' }}cm</span>
                    *
                    <span>{{ form?.productSpec?.productHeight || '-' }}cm</span>
                  </el-space>
                </el-form-item>

                <el-form-item label="外箱尺寸：">
                  <el-space>
                    <span>{{ form?.productSpec?.cartonLength || '-' }}cm</span>
                    *
                    <span>{{ form?.productSpec?.cartonWidth || '-' }}cm</span>
                    *
                    <span>{{ form?.productSpec?.cartonHeight || '-' }}cm</span>
                  </el-space>
                </el-form-item>
              </div>
              <el-form-item label="物流属性：" prop="sensitiveTypeCodeList">
                <span
                  v-for="(sensitive, index) in form?.productSpec?.sensitiveTypeCodeList"
                  :key="sensitive"
                >
                  <span>
                    {{ sensitiveTypeList?.find((x) => x.value === sensitive)?.desc }}
                  </span>
                  <span
                    class="me-3"
                    v-if="index !== form?.productSpec?.sensitiveTypeCodeList.length - 1"
                  >
                    ,
                  </span>
                </span>
              </el-form-item>
            </KeenCard>
          </el-tab-pane>
          <el-tab-pane label="硬件参数信息" :name="2">
            <KeenCard>
              <div class="item-grid">
                <el-form-item label="输入：">
                  <span>{{ form?.hardwareParamInfo?.input || '-' }}</span>
                </el-form-item>
                <el-form-item label="输出：">
                  <span>{{ form?.hardwareParamInfo?.output || '-' }}</span>
                </el-form-item>
                <el-form-item label="最大负载功率：">
                  <span>{{ form?.hardwareParamInfo?.maxiLoadPower || '-' }}W</span>
                </el-form-item>
                <el-form-item label="最大负载电流：">
                  <span>{{ form?.hardwareParamInfo?.maxLoadCurrent || '-' }}A</span>
                </el-form-item>
              </div>
            </KeenCard>
          </el-tab-pane>
          <el-tab-pane label="产品回收信息" :name="4">
            <KeenCard>
              <div class="item-grid">
                <el-form-item label="回收总包装（产品包装+外包装）重量（克）：">
                  <span>{{ form?.recycleInfo?.recyclePackagingWeight || '-' }}</span>
                </el-form-item>
                <el-form-item label="回收单位（产品）：塑料重量（克）：">
                  <span>{{ form?.recycleInfo?.recyclePlasticWeight || '-' }}</span>
                </el-form-item>
                <el-form-item label="回收单位：外包装纸板重量（克）：">
                  <span>{{ form?.recycleInfo?.recycleOuterCardboardWeight || '-' }}</span>
                </el-form-item>
                <el-form-item label="回收单位：外包装塑料重量（克）：">
                  <span>{{ form?.recycleInfo?.recycleOuterPlasticWeight || '-' }}</span>
                </el-form-item>
                <el-form-item label="回收单位（产品）：纸板重量（克）：">
                  <span>{{ form?.recycleInfo?.recycleCardboardWeight || '-' }}</span>
                </el-form-item>
              </div>
            </KeenCard>
          </el-tab-pane>
          <el-tab-pane label="装运信息" :name="5">
            <KeenCard>
              <div class="item-grid">
                <el-form-item label="托盘类型：">
                  <span>{{ form?.shipmentInfo?.palletType || '-' }}</span>
                </el-form-item>
                <el-form-item label="托盘高度：">
                  <span>{{ form?.shipmentInfo?.palletHeight || '-' }}m</span>
                </el-form-item>
                <el-form-item label="托盘重量：">
                  <span>{{ form?.shipmentInfo?.palletWeight || '-' }}kg</span>
                </el-form-item>
                <el-form-item label="托盘单层箱数：">
                  <span>{{ form?.shipmentInfo?.palletSingleLayerBoxNum || '-' }}</span>
                </el-form-item>
                <el-form-item label="托盘总层数：">
                  <span>{{ form?.shipmentInfo?.palletLayerNum || '-' }}</span>
                </el-form-item>
                <el-form-item label="托盘单层尺寸（长*宽*高）：">
                  <el-space>
                    <span>{{ form?.shipmentInfo?.palletSingleLayerLength || '-' }}m</span>
                    *
                    <span>{{ form?.shipmentInfo?.palletSingleLayerWidth || '-' }}m</span>
                    *
                    <span>{{ form?.shipmentInfo?.palletSingleLayerHeight || '-' }}m</span>
                  </el-space>
                </el-form-item>
              </div>
            </KeenCard>
          </el-tab-pane>
          <el-tab-pane label="电池信息" :name="6">
            <KeenCard>
              <div class="item-grid">
                <el-form-item label="产品是否含有电池：">
                  <span>{{ form?.batteryInfo?.containsBatteryDesc ?? '-' }}</span>
                </el-form-item>
                <el-form-item label="电池是否内置：">
                  <span>{{ form?.batteryInfo?.batteryContainedDesc ?? '-' }}</span>
                </el-form-item>
                <el-form-item label="电池尺寸：">
                  <span>{{ form?.batteryInfo?.batterySize || '-' }}</span>
                </el-form-item>
                <el-form-item label="电池类型：">
                  <span>{{ form?.batteryInfo?.batteryType || '-' }}</span>
                </el-form-item>
                <el-form-item label="电压：">
                  <span>{{ form?.batteryInfo?.voltage || '-' }}V</span>
                </el-form-item>
                <el-form-item label="电池数量：">
                  <span>{{ form?.batteryInfo?.batteryNum || '-' }}</span>
                </el-form-item>
                <el-form-item label="单电池重量（克）：">
                  <span>{{ form?.batteryInfo?.singleBatteryWeight || '-' }}g</span>
                </el-form-item>
                <el-form-item label="续航（年）：">
                  <span>{{ form?.batteryInfo?.endurance || '-' }}</span>
                </el-form-item>
              </div>
            </KeenCard>
          </el-tab-pane>
          <el-tab-pane label="认证信息" :name="7">
            <KeenCard>
              <div class="item-grid">
                <el-form-item label="认证产品名称（英文）：">
                  <span>{{ form?.certificationInfo?.certificationProductNameEn || '-' }}</span>
                </el-form-item>
                <el-form-item label="认证类型：">
                  <span>{{ form?.certificationInfo?.certificationName || '-' }}</span>
                </el-form-item>
                <el-form-item label="认证地址：">
                  <span>{{ form?.certificationInfo?.certificationAddress || '-' }}</span>
                </el-form-item>
              </div>
            </KeenCard>
          </el-tab-pane>
          <el-tab-pane label="质保信息" :name="8">
            <KeenCard>
              <div class="item-grid">
                <el-form-item label="英国制造商保修（以月为单位）：">
                  <span>{{ form?.warrantyInfo?.ukManufacturerWarranty || '-' }}</span>
                </el-form-item>
                <el-form-item label="英国消费者保修（以月为单位）：">
                  <span>{{ form?.warrantyInfo?.ukConsumerWarranty || '-' }}</span>
                </el-form-item>
                <el-form-item label="求助热线联系方式（电话和电子邮件）：">
                  <span>{{ form?.warrantyInfo?.helplineContact || '-' }}</span>
                </el-form-item>
              </div>
            </KeenCard>
          </el-tab-pane>
          <el-tab-pane label="渠道资料信息" :name="9">
            <KeenCard>
              <el-form-item label="线下渠道资料信息链接：">
                <!--                <span>{{ form?.channelInfo?.offlineChannelInfoLink || '-' }}</span>-->
                <el-link
                  v-if="form?.channelInfo?.offlineChannelInfoLink"
                  size="default"
                  type="primary"
                  target="_blank"
                  :href="form?.channelInfo?.offlineChannelInfoLink"
                  :underline="false"
                >
                  {{ form?.channelInfo?.offlineChannelInfoLink }}
                </el-link>
                <span v-else>-</span>
              </el-form-item>
            </KeenCard>
          </el-tab-pane>
        </el-tabs>
      </KeenCard>
    </div>
  </el-form>
</template>

<script setup lang="ts" name="skuDetail">
  import { productApi, metaApi } from '@/api';
  import SpecificationsInfo from '@/views/lute-os/goodscenter/components/specificationsInfo.vue';
  import { checkPermission } from '@/utils/permission';

  const colorMap = {
    1: 'yellow',
    2: 'green',
    3: 'blue',
    4: 'purple',
  };

  const route = useRoute();
  const tabCurrent = ref(0);

  const form = ref({
    productSpec: {},
  });

  // 是否组合商品
  const isProductGroup = computed(() => {
    return form.value.productType === 13;
  });

  const totalPrice = computed(() => {
    return form.value.skuItemBeanList.reduce((total, item) => {
      return total + item.formatPrice * item.qty;
    }, 0);
  });
  watch(
    () => form.value.skuItemBeanList,
    (list) => {
      if (list.length > 0) {
        list.forEach(async (item) => {
          item.formatPrice =
            item.suggestPriceCurrencyCode === 'USD'
              ? item.suggestPrice
              : await formatPrice(item.suggestPrice, item.suggestPriceCurrencyCode);
        });
      }
    }
  );

  const formatPrice = async (amount, currency) => {
    if (!amount || !currency) return '';
    const res = await metaApi.luteosMetaCurrencyRateConvert({
      amount,
      sourceCurrency: currency,
      targetCurrency: 'USD',
    });
    return res?.amount;
  };

  const getDetailInfo = async (code) => {
    const res = await productApi.luteosProductSkuQueryProductSkuDetail({
      skuCode: code,
      operationType: 'detail',
    });
    if (!res.productImageList || res.productImageList.length === 0) {
      res.productImageList = [''];
    }

    form.value = res;
    form.value.skuItemBeanList = res.skuItemBeanList || [];
  };

  const isDefault = ref(false);
  const defaultProductSpec = ref({});
  const querySkuDefaultSpec = async () => {
    const res = await productApi.luteosProductSkuQuerySkuDefaultSpec({
      skuCode: route.query.code,
    });
    defaultProductSpec.value = res;
  };

  const sensitiveTypeList = ref([]);
  const querySensitiveTypeList = async () => {
    const res = await productApi.luteosProductSensitiveTypeQuerySensitiveTypeList({
      pageSize: 100,
    });
    sensitiveTypeList.value = res.sensitiveTypeBeanList.map((item) => {
      return {
        desc: item.sensitiveTypeName,
        value: item.sensitiveTypeCode,
      };
    });
  };

  onMounted(() => {
    getDetailInfo(route.query.code);
    querySkuDefaultSpec();
    querySensitiveTypeList();
  });
</script>

<style scoped lang="scss">
  .custom-form {
    .w-30 {
      width: 32%;
    }
    .ml-20 {
      margin-left: 20px;
      margin-right: 20px;
    }
    .tab-card {
      background: #fff;
      width: 100%;
    }
    :deep(.el-tabs__content) {
      margin-left: -30px;
    }
  }

  .item-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, 500px);
    gap: 16px;
  }

  .textarea {
    width: 100%;
    height: 115px;
    overflow: scroll;
    border: 1px solid #dcdfe6;
    border-radius: 8px;
    padding: 12px;
    line-height: 1.5;
  }
</style>
