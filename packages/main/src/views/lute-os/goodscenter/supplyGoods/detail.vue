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
        <el-form-item label="产品中文名称">
          <span>{{ form?.productTitle }}</span>
        </el-form-item>
        <el-form-item label="产品英文名称">
          <span>{{ form?.productTitleEn }}</span>
        </el-form-item>
        <el-form-item label="供应链SKU">
          <span>{{ form?.productSku }}</span>
        </el-form-item>
        <el-form-item label="新供应链SKU">
          <span>{{ form?.productSkuNew }}</span>
        </el-form-item>
        <el-form-item label="产品与供应商映射码" v-if="form?.productInfo?.snCode">
          <span>{{ form?.productInfo?.snCode }}</span>
        </el-form-item>
        <el-form-item label="产品类型" prop="productType">
          <span>{{ productTypeMap[form.productType] }}</span>
        </el-form-item>
        <el-form-item label="产品状态">
          <Tag :color="productStatusMap[form?.productStatus]?.color">
            {{ productStatusMap[form?.productStatus]?.desc }}
          </Tag>
        </el-form-item>
        <el-form-item label="销售状态">
          <Tag :color="saleStatusMap[form?.saleStatus]?.color">
            {{ saleStatusMap[form?.saleStatus]?.desc }}
          </Tag>
        </el-form-item>
        <template v-if="!isMaterial">
          <el-form-item label="线上产品全称：">
            <span>{{ form?.productInfo?.onlineProductFullName || '-' }}</span>
          </el-form-item>
          <el-form-item label="品牌：">
            <span>{{ form?.brandName || '-' }}</span>
          </el-form-item>
          <el-form-item label="型号：">
            <span>{{ form?.productInfo?.modelName || '-' }}</span>
          </el-form-item>
          <el-form-item label="EAN 13码：">
            <span>{{ form?.productInfo?.ean13 || '-' }}</span>
          </el-form-item>
          <el-form-item label="EAN 14码：">
            <span>{{ form?.productInfo?.ean14 || '-' }}</span>
          </el-form-item>
        </template>
      </div>
      <div v-if="!isMaterial">
        <el-form-item label="彩盒内的所有产品及配件：">
          <div class="textarea">{{ form?.productInfo?.colorBoxContents }}</div>
        </el-form-item>
        <el-form-item label="卖点：">
          <div class="textarea">
            {{ form?.productInfo?.sellingPoint }}
          </div>
        </el-form-item>
        <el-form-item label="在线完整产品规格（要点）：">
          <div class="textarea">{{ form?.productInfo?.onlineFullProductSpecs }}</div>
        </el-form-item>
      </div>
    </KeenCard>
    <!--      <KeenCard title="规格信息" class="w-50">
        <SpecificationsInfo
          ref="specificationsInfoFormRef"
          v-model:form="form.specInfo"
          mode="detail"
          type="supplySku"
        />
      </KeenCard>-->
    <KeenCard title="关联产品SKU" v-if="!isMaterial">
      <el-table :data="skuList">
        <el-table-column label="产品信息" min-width="250">
          <template #default="{ row }">
            <GoodsInfo
              :src="row.productImageUrl"
              :title="row.productTitle"
              :subtitle="row.skuCode"
            />
          </template>
        </el-table-column>
        <el-table-column label="建议零售价" min-width="150">
          <template #default="{ row }">
            <span v-if="row?.price">{{ row?.price }}{{ row?.currency }}</span>
          </template>
        </el-table-column>
        <el-table-column label="产品SKU状态" prop="stateDesc" min-width="150" />
      </el-table>
    </KeenCard>
    <div class="d-flex gap-5">
      <KeenCard title="" class="tab-card">
        <el-tabs v-model="tabCurrent">
          <el-tab-pane label="报关信息" :name="0">
            <KeenCard title="">
              <div class="item-grid">
                <el-form-item label="中文报关品名：" prop="declareInfo.declareName">
                  <OverflowTooltip :content="form?.declareInfo?.declareName" :line="1" />
                </el-form-item>
                <el-form-item label="英文报关品名：" prop="declareInfo.declareNameEn">
                  <OverflowTooltip :content="form?.declareInfo?.declareNameEn" :line="1" />
                </el-form-item>
                <el-form-item label="出口申报价值：">
                  <span>{{ form?.declareInfo?.declarePrice }}</span>
                  <span class="ms-3 text-gray-600">{{ form?.declareInfo?.declareCurrency }}</span>
                </el-form-item>
                <el-form-item label="出口海关编码：">
                  <OverflowTooltip :content="form?.declareInfo?.hsCode" :line="1" />
                </el-form-item>
                <el-form-item label="成交单位：">
                  <OverflowTooltip :content="form?.declareInfo?.transactionUnit" :line="1" />
                </el-form-item>
                <el-form-item label="申报要素：">
                  <span>{{ form?.declareInfo?.declareElement }}</span>
                  <OverflowTooltip :content="form?.declareInfo?.declareElement" :line="1" />
                </el-form-item>
                <el-form-item label="境内货源地：">
                  <OverflowTooltip :content="form?.declareInfo?.territoryGoods" :line="1" />
                </el-form-item>
                <el-form-item label="征免：">
                  <OverflowTooltip :content="form?.declareInfo?.taxExemptionDesc" :line="1" />
                </el-form-item>
                <el-form-item label="申报说明：">
                  <OverflowTooltip :content="form?.declareInfo?.declareExplain" :line="1" />
                </el-form-item>
                <el-form-item label="海关属性：">
                  <OverflowTooltip :content="form?.declareInfo?.hsAttrDesc" :line="1" />
                </el-form-item>
                <el-form-item label="中文材质：">
                  <OverflowTooltip :content="form?.declareInfo?.productIngredient" :line="1" />
                </el-form-item>
                <el-form-item label="英文材质：">
                  <OverflowTooltip :content="form?.declareInfo?.productIngredientEn" :line="1" />
                </el-form-item>
                <el-form-item label="中文用途：">
                  <OverflowTooltip :content="form?.declareInfo?.useCn" :line="1" />
                </el-form-item>
                <el-form-item label="英文用途：">
                  <OverflowTooltip :content="form?.declareInfo?.useEn" :line="1" />
                </el-form-item>
              </div>
            </KeenCard>
          </el-tab-pane>
          <el-tab-pane label="清关信息" :name="1">
            <KeenCard title="">
              <el-table :data="form.clearanceInfoList" class-name="table-row-dashed">
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
              <div class="item-grid" v-if="isMaterial">
                <el-form-item label="毛重：" prop="specInfo.productWeight">
                  <span>{{ form.specInfo.productWeight || '-' }}</span>
                </el-form-item>
                <el-form-item label="净重：" prop="specInfo.productNetWeight">
                  <span>{{ form.specInfo.productNetWeight || '-' }}kg</span>
                </el-form-item>
                <el-form-item label="包装尺寸：">
                  <el-space>
                    <span>{{ form.specInfo.productLength || '-' }}cm</span>
                    *
                    <span>{{ form.specInfo.productWidth || '-' }}cm</span>
                    *
                    <span>{{ form.specInfo.productHeight || '-' }}cm</span>
                  </el-space>
                </el-form-item>
                <el-form-item label="净尺寸：" prop="productNetWeight">
                  <el-space>
                    <span>{{ form.specInfo.productNetLength || '-' }}cm</span>
                    *
                    <span>{{ form.specInfo.productNetWidth || '-' }}cm</span>
                    *
                    <span>{{ form.specInfo.productNetHeight || '-' }}cm</span>
                  </el-space>
                </el-form-item>
                <el-form-item label="箱规：">
                  <el-space>
                    <span>{{ form.specInfo.cartonLength || '-' }}cm</span>
                    *
                    <span>{{ form.specInfo.cartonWidth || '-' }}cm</span>
                    *
                    <span>{{ form.specInfo.cartonHeight || '-' }}cm</span>
                  </el-space>
                </el-form-item>
                <el-form-item prop="specInfo.cartonWeight" label="单箱重量：">
                  <span>{{ form.specInfo.cartonWeight || '-' }}kg</span>
                </el-form-item>
                <el-form-item prop="specInfo.cartonNum" label="单箱数量：">
                  <span>{{ form.specInfo.cartonNum || '-' }}套</span>
                </el-form-item>
                <div class="merged-cell">
                  <el-form-item label="物流属性：" prop="specInfo.sensitiveTypeCodeList">
                    <span
                      v-for="(sensitive, index) in form?.specInfo?.sensitiveTypeCodeList"
                      :key="sensitive"
                    >
                      <span>
                        {{ sensitiveTypeList?.find((x) => x.value === sensitive)?.desc }}
                      </span>
                      <span
                        class="me-3"
                        v-if="index !== form?.specInfo?.sensitiveTypeCodeList?.length - 1"
                      >
                        ,
                      </span>
                    </span>
                  </el-form-item>
                </div>
              </div>
              <div class="item-grid" v-else>
                <el-form-item label="材质：">
                  <span>{{ form?.specInfo?.material || '-' }}</span>
                </el-form-item>
                <el-form-item label="产品净重：">
                  <span>{{ form?.specInfo?.productNetWeight || '-' }}kg</span>
                </el-form-item>
                <el-form-item label="产品毛重：">
                  <span>{{ form?.specInfo?.productWeight || '-' }}kg</span>
                </el-form-item>
                <el-form-item label="外箱毛重：">
                  <span>{{ form?.specInfo?.cartonWeight || '-' }}kg</span>
                </el-form-item>
                <el-form-item label="外箱净重：">
                  <span>{{ form?.specInfo?.cartonNetWeight || '-' }}kg</span>
                </el-form-item>
                <el-form-item label="单箱数量：">
                  <span>{{ form?.specInfo?.cartonNum || '-' }}</span>
                </el-form-item>
                <el-form-item label="产品净尺寸：">
                  <el-space>
                    <span>{{ form?.specInfo?.productNetLength || '-' }}cm</span>
                    *
                    <span>{{ form?.specInfo?.productNetWidth || '-' }}cm</span>
                    *
                    <span>{{ form?.specInfo?.productNetHeight || '-' }}cm</span>
                  </el-space>
                </el-form-item>

                <el-form-item label="包装尺寸：">
                  <el-space>
                    <span>{{ form?.specInfo?.productLength || '-' }}cm</span>
                    *
                    <span>{{ form?.specInfo?.productWidth || '-' }}cm</span>
                    *
                    <span>{{ form?.specInfo?.productHeight || '-' }}cm</span>
                  </el-space>
                </el-form-item>

                <el-form-item label="外箱尺寸：">
                  <el-space>
                    <span>{{ form?.specInfo?.cartonLength || '-' }}cm</span>
                    *
                    <span>{{ form?.specInfo?.cartonWidth || '-' }}cm</span>
                    *
                    <span>{{ form?.specInfo?.cartonHeight || '-' }}cm</span>
                  </el-space>
                </el-form-item>
              </div>
            </KeenCard>
          </el-tab-pane>
          <el-tab-pane label="采购信息" :name="10">
            <KeenCard>
              <div class="item-grid">
                <el-form-item label="是否默认采购：">
                  {{ form?.purchaseInfo?.defaultPurchase ? '是' : '否' }}
                </el-form-item>
                <el-form-item label="供应商：">
                  {{ form?.purchaseInfo?.supplierName }}
                </el-form-item>
                <el-form-item label="采购员：">
                  {{ form?.purchaseInfo?.purchaserName }}
                </el-form-item>
                <el-form-item label="采购单价：">
                  {{ form?.purchaseInfo?.purchasePrice }}
                  {{ form?.purchaseInfo?.currencyCode }}
                </el-form-item>
                <el-form-item label="标准LT：">
                  {{ form?.purchaseInfo?.standardLT || '-' }}
                </el-form-item>
                <el-form-item label="最小订单数量：">
                  {{ form?.purchaseInfo?.minQuantity || '-' }}
                </el-form-item>
              </div>
            </KeenCard>
          </el-tab-pane>
          <template v-if="!isMaterial">
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
          </template>
        </el-tabs>
      </KeenCard>
    </div>
  </el-form>
</template>

<script setup lang="ts" name="supplyGoodsDetail">
  import { productApi } from '@/api';
  import SpecificationsInfo from '@/views/lute-os/goodscenter/components/specificationsInfo.vue';
  import { checkPermission } from '@/utils/permission';

  const productTypeMap = {
    1: '产品',
    2: '物料',
    3: '用研产品',
    12: '配件',
    14: '虚拟产品',
    13: '组合产品',
  };

  const productStatusMap = {
    0: {
      desc: '不可用',
      color: 'red',
    },
    1: {
      desc: '可用',
      color: 'green',
    },
    2: {
      desc: '开发产品',
      color: 'blue',
    },
  };

  const saleStatusMap = {
    1: {
      desc: '清仓中',
      color: 'gray',
    },
    2: {
      desc: '在销售',
      color: 'green',
    },
    5: {
      desc: '订制类产品',
      color: 'purple',
    },
    6: {
      desc: '已退市',
      color: 'red',
    },
    16: {
      desc: '停售淘汰',
      color: 'red',
    },
    17: {
      desc: '新品测试',
      color: 'blue',
    },
    18: {
      desc: '待上架',
      color: 'blue',
    },
  };

  const tabCurrent = ref(0);

  const isProduct = computed(() => {
    return form.value.productType === 1;
  });

  const isMaterial = computed(() => {
    return form.value.productType === 2;
  });

  const route = useRoute();

  const form = ref({
    specInfo: {},
  });

  const skuList = ref([]);

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

  const getDetailInfo = async (code) => {
    const res = await productApi.luteosProductSupplySkuQuerySupplySkuDetail({
      productSku: code,
    });
    skuList.value = [
      {
        ...res?.productInfo,
        price: res?.productInfo?.suggestPrice,
        currency: res?.productInfo?.suggestPriceCurrencyCode,
      },
    ];
    form.value = res;
  };

  onMounted(() => {
    getDetailInfo(route.query.code);
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
