<template>
  <el-form ref="formRef" :model="form" label-position="left" label-width="150" scroll-to-error>
    <KeenFlex>
      <template #auto>
        <KeenCard title="产品图片" style="margin-bottom: 0 !important">
          <div class="text-center">
            <KeenImageUpload
              v-model="form.productImageList[0]"
              directory="product/goods"
              tooltip="更改产品图片"
              disabled
            />
          </div>
        </KeenCard>
        <KeenCard title="SKU状态" style="margin-bottom: 0 !important">
          <Tag :color="colorMap[form?.state]">{{ form?.stateDesc }}</Tag>
        </KeenCard>
        <KeenCard title="产品类型" style="margin-bottom: 0 !important">
          <span>{{ form?.productTypeDesc }}</span>
        </KeenCard>
        <KeenCard title="产品经理" style="margin-bottom: 0 !important">
          <span>{{ form?.createByName }}</span>
        </KeenCard>
        <KeenCard title="品牌" style="margin-bottom: 0 !important">
          <span>{{ form?.brandName }}</span>
        </KeenCard>
      </template>
      <template #fluid>
        <el-tabs v-model="tabCurrent" @tab-change="tabChange">
          <el-tab-pane label="基础资料" :name="0">
            <KeenCard title="基础信息">
              <div class="mw-700px px-7">
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
                <el-form-item label="属性：" prop="attrValueNames">
                  <el-tag v-if="form.attrValueNames">{{ form?.attrValueNames }}</el-tag>
                </el-form-item>
                <el-form-item label="产品中文名：" prop="productTitle">
                  <span>{{ form?.productTitle }}</span>
                </el-form-item>
                <el-form-item label="产品英文名：" prop="productTitleEn">
                  <span>{{ form?.productTitleEn }}</span>
                </el-form-item>
              </div>
            </KeenCard>
            <KeenCard title="SKU建议销售价">
              <div class="mw-800px px-7">
                <el-form-item class="group-form-item" label="建议销售价：">
                  <el-form-item prop="suggestPrice">
                    <span>{{ form?.suggestPrice }}</span>
                    <span class="ms-3 text-gray-600">{{ form?.suggestPriceCurrencyCode }}</span>
                  </el-form-item>
                </el-form-item>
              </div>
              <div class="px-7">
                <el-table :data="form.skuSalesPriceList">
                  <el-table-column prop="site" label="站点" min-width="100px">
                    <template #default="{ row, $index }">
                      <el-form-item
                        class="form-table-item"
                        :prop="`skuSalesPriceList[${$index}].site`"
                        :rules="[{ required: true, message: '请选择站点' }]"
                      >
                        <span>{{ row?.siteName }}</span>
                      </el-form-item>
                    </template>
                  </el-table-column>
                  <el-table-column prop="col.id" label="渠道" min-width="100px">
                    <template #default="{ row, $index }">
                      <el-form-item
                        class="form-table-item"
                        :prop="`skuSalesPriceList[${$index}].channel`"
                        :rules="[{ required: true, message: '请选择渠道' }]"
                      >
                        <span>{{ row?.channelName }}</span>
                      </el-form-item>
                    </template>
                  </el-table-column>
                  <el-table-column prop="col.id" label="店铺" min-width="100px">
                    <template #default="{ row, $index }">
                      <el-form-item
                        class="form-table-item"
                        :prop="`skuSalesPriceList[${$index}].shop`"
                        :rules="[{ required: true, message: '请选择店铺' }]"
                      >
                        <span>{{ row?.shopName }}</span>
                      </el-form-item>
                    </template>
                  </el-table-column>
                  <el-table-column prop="col.id" label="活动" min-width="100px">
                    <template #default="{ row, $index }">
                      <el-form-item
                        class="form-table-item"
                        :prop="`skuSalesPriceList[${$index}].activityType`"
                        :rules="[{ required: true, message: '请选择活动' }]"
                      >
                        <span>{{ row?.activityType }}</span>
                      </el-form-item>
                    </template>
                  </el-table-column>
                  <el-table-column prop="col.id" label="实际销售价" min-width="200px">
                    <template #default="{ row, $index }">
                      <el-form-item class="group-form-item" required>
                        <el-form-item
                          :prop="`skuSalesPriceList[${$index}].actualPrice`"
                          :rules="[{ required: true, message: '请输入实际销售价' }]"
                        >
                          <span>{{ row?.actualPrice }}</span>
                        </el-form-item>
                        <el-form-item
                          :prop="`skuSalesPriceList[${$index}].currencyCode`"
                          :rules="[{ required: true, message: '请选择币种' }]"
                        >
                          <span>{{ row?.currencyCode }}</span>
                        </el-form-item>
                      </el-form-item>
                    </template>
                  </el-table-column>
                </el-table>
              </div>
            </KeenCard>
            <KeenCard title="规格信息">
              <SpecificationsInfo
                ref="specificationsInfoFormRef"
                v-model:form="form.productSpec"
                mode="detail"
              />
            </KeenCard>
          </el-tab-pane>
          <el-tab-pane label="供应商信息" :name="1" lazy>
            <!--            <KeenCard title="form">
                          <PurchaseInfo
                            :currencyOptions="(dickbook.currency_list as any[])"
                            :productManagerCode="(form.createBy as string)"
                            v-model:form="form.productSkuPurchase"
                            mode="detail"
                          />
                        </KeenCard>-->
            <KeenCard title="关联供应链SKU">
              <el-table :data="form.productSupplierSkuList">
                <el-table-column prop="productSku" label="供应链SKU">
                  <template #default="{ row }">
                    <div>{{ row?.productSkuNew }}</div>
                    <div class="fs-7 text-gray-500" v-if="row?.productSku !== row?.productSkuNew">
                      {{ row?.productSku }}
                    </div>
                  </template>
                </el-table-column>
                <el-table-column label="供应商信息" prop="supplierName" />
                <el-table-column label="采购员" prop="purchaseOperatorName" />
                <el-table-column label="采购价">
                  <template #default="{ row }">
                    <span>{{ row.purchasePrice }}</span>
                    <span class="ms-3 text-gray-600">{{ row.purchaseCurrencyCode }}</span>
                  </template>
                </el-table-column>
                <el-table-column label="境内货源地" prop="territoryGoods" />
              </el-table>
            </KeenCard>
          </el-tab-pane>
          <el-tab-pane label="报关/清关信息" :name="2" lazy>
            <KeenCard title="清关信息">
              <div class="mw-600px px-7">
                <el-form-item label="申报价值" prop="productDeclare.declarePrice">
                  <span>{{ form?.productDeclare.declarePrice }}</span>
                  <span class="ms-3 text-gray-600">USD</span>
                </el-form-item>
                <el-form-item label="中文报关品名" prop="productDeclare.declareName">
                  <span>{{ form?.productDeclare.declareName }}</span>
                </el-form-item>
                <el-form-item label="英文报关品名" prop="productDeclare.declareNameEn">
                  <span>{{ form?.productDeclare.declareNameEn }}</span>
                </el-form-item>
                <el-form-item label="敏感类型" prop="productDeclare.sensitiveTypeCodeList">
                  <span
                    v-for="(sensitive, index) in form.productDeclare.sensitiveTypeCodeList"
                    :key="sensitive"
                  >
                    <span>
                      {{
                        dickbook?.sensitiveTypeBeanList?.find((x) => x.value === sensitive)?.desc
                      }}
                    </span>
                    <span
                      class="me-3"
                      v-if="index !== form.productDeclare.sensitiveTypeCodeList.length - 1"
                    >
                      ,
                    </span>
                  </span>
                </el-form-item>

                <div
                  v-show="hideFlag"
                  @click="hideFlag = !hideFlag"
                  class="text-center cursor-pointer arrows-icon"
                >
                  <svgIcon icon="arrows-arr082" class="svg-icon svg-icon-1" />
                </div>
                <div v-show="!hideFlag">
                  <el-form-item label="海关申报代码：">
                    <span>{{ form?.productDeclare.hsCode }}</span>
                  </el-form-item>
                  <el-form-item label="申报说明：">
                    <span>{{ form?.productDeclare.declareExplain }}</span>
                  </el-form-item>
                  <el-form-item label="进口申报价值：">
                    <div class="d-flex">
                      <span>{{ form?.productDeclare.hsImportPrice }}</span>
                      <span v-if="form?.productDeclare.hsImportPrice" class="ms-3">USD</span>
                    </div>
                  </el-form-item>
                  <el-form-item label="中文材质：">
                    <span>{{ form?.productDeclare.productMaterialIngredient }}</span>
                  </el-form-item>
                  <el-form-item label="英文材质：">
                    <span>{{ form?.productDeclare.productMaterialIngredientEn }}</span>
                  </el-form-item>
                  <el-form-item label="中文用途：">
                    <span>{{ form?.productDeclare.useCn }}</span>
                  </el-form-item>
                  <el-form-item label="英文用途：">
                    <span>{{ form?.productDeclare.useEn }}</span>
                  </el-form-item>
                  <el-form-item label="海关税率：">
                    <span>{{ form?.productDeclare.hsTariffRate }}</span>
                  </el-form-item>
                  <el-form-item label="海关属性：">
                    <span>{{ form?.productDeclare.hsAttrName }}</span>
                  </el-form-item>
                  <div @click="hideFlag = !hideFlag" class="text-center cursor-pointer arrows-icon">
                    <svgIcon icon="arrows-arr081" class="svg-icon svg-icon-1" />
                  </div>
                </div>
              </div>
            </KeenCard>
            <KeenCard title="报关信息">
              <div class="mw-600px px-7">
                <el-form-item label="创建人：">
                  <span>{{ form?.productClearance.creatorName }}</span>
                </el-form-item>
                <el-form-item label="成交单位：">
                  <span>{{ form?.productClearance.transactionUnit }}</span>
                </el-form-item>
                <el-form-item label="申报价值：">
                  <span>{{ form?.productClearance.declarePrice }}</span>
                </el-form-item>
                <el-form-item label="产品毛重：">
                  <span>{{ form?.productClearance.productGrossWeight }}</span>
                </el-form-item>
                <el-form-item label="海关品名：">
                  <span>{{ form?.productClearance.hsProductName }}</span>
                </el-form-item>
                <el-form-item label="海关编码：">
                  <span>{{ form?.productClearance.hsCode }}</span>
                </el-form-item>
                <el-form-item label="申报要素：">
                  <span>{{ form?.productClearance.declareElement }}</span>
                </el-form-item>
                <el-form-item label="备注：">
                  <span>{{ form?.productClearance.remark }}</span>
                </el-form-item>
              </div>
            </KeenCard>
          </el-tab-pane>
          <!--          <el-tab-pane label="店铺售卖" :name="3" lazy>
            <KeenCard>
              <el-table :data="mskuRelationList" min-height="400px">
                <el-table-column prop="msku" label="店铺SKU" min-width="120px" />
                <el-table-column prop="channel" label="渠道" />
                <el-table-column prop="shop" label="店铺账号" min-width="120px" />
                <el-table-column prop="site" label="站点" />
                <el-table-column prop="productLink" label="链接" min-width="150px">
                  <template #default="{ row }">
                    <a :href="row.productLink" target="_blank">{{ row.productLink }}</a>
                  </template>
                </el-table-column>
                <el-table-column label="实时售价" min-width="120px">
                  <template #default="{ row }">
                    <span>{{ row.price }}</span>
                    <span class="text-gray-500 ms-1">{{ row.currency }}</span>
                  </template>
                </el-table-column>
                <el-table-column prop="bigCategoryRanking" label="大类排名" />
                <el-table-column prop="smallCategoryRanking" label="小类排名" />
                <el-table-column prop="marketShare" label="市占" />
                <el-table-column label="详情" min-width="120" fixed="right" align="right">
                  <template #default="{ row }">
                    <KeenActions
                      display-style="buttons"
                      :actions="[
                        {
                          label: '详情',
                          key: 'detail',
                          type: 'primary',
                          row: row,
                        },
                        {
                          label: 'MSKU销售表现',
                          key: 'msku',
                          type: 'primary',
                          row: row,
                        },
                      ]"
                      @click="handleActions"
                    />
                  </template>
                </el-table-column>
              </el-table>
            </KeenCard>
          </el-tab-pane>

          <el-tab-pane label="产品表现" :name="4" lazy>
            <SkuPerformace />
          </el-tab-pane>-->
        </el-tabs>
      </template>
    </KeenFlex>
  </el-form>
  <AddSkuModal
    v-if="visible"
    :visible="visible"
    title="详情"
    :platformSku="platformSku"
    type="detail"
    :unique-code="uniqueCode"
    @close="visible = false"
  />
</template>

<script setup lang="ts">
  import { type FormInstance, type FormRules } from 'element-plus';
  import { ProductApi, productApi, platformApi, PlatformApi, dataApi, memberApi } from '@/api';
  import AddSkuModal from '@/views/goodscenter/goodsmanage/skulist/components/addSkuModal.vue';
  import SkuPerformace from '@/views/goodscenter/productperformance/sku/components/performance.vue';
  import { encryptByBase64 } from '@/utils/aesTils';
  import SpecificationsInfo from '../../components/specificationsInfo.vue';
  import PurchaseInfo from '../../components/purchaseInfo.vue';
  import type { IDickbook } from './data';

  const colorMap = {
    1: 'yellow',
    2: 'green',
    3: 'blue',
    4: 'purple',
  };

  const router = useRouter();
  const props = defineProps<{
    formDisabled: boolean;
  }>();

  const hideFlag = ref<boolean>(true);

  const route = useRoute();
  const tabCurrent = ref(0);
  // 表单定义
  const formRef = ref<FormInstance>();
  const form = ref<ProductApi.LuteosProductSkuQueryProductSkuDetail.ResponseBody>({
    /** 品牌编码 */
    brandCode: '',
    /** 属性,拼接好的属性值 */
    attrValueNames: '',
    /** 分类名称 */
    categoryNames: '',
    /** 产品经理编码 */
    createBy: '',
    /** 产品经理名称 */
    createByName: '',
    /** 申报信息 */
    productDeclare: {
      sensitiveTypeCodeList: [],
    },
    /** 图片链接 */
    productImageList: [''],
    /** form */
    productSkuPurchase: {},
    /** 规格信息 */
    productSpec: {},
    /** 产品SPU代码 */
    productSpu: '',
    /** 关联供应商SKU */
    productSupplierSkuList: [],
    /** 产品名称中文 */
    productTitle: '',
    /** 产品名称英文 */
    productTitleEn: '',
    /* 产品类型 */
    productType: 0,
    /** 产品类型名称 */
    productTypeDesc: '',
    /** 产品产品SKU */
    skuCode: '',
    /** 店铺sku映射关系 */
    skuCodeRelationList: [],
    /** 店铺sku销售信息-基础资料下的店铺的关联信息 */
    skuSalesPriceList: [],
    /* 产品sku状态 1-未上架 2-在销售 3-清仓中 4-已退市 */
    state: 0,
    /** 产品sku状态名称 */
    stateDesc: '',
    /** 建议销售价格 */
    suggestPrice: 0,
    /** 建议销售价格币种 */
    suggestPriceCurrencyCode: '',
    // 供应链SKU
    productSku: '',
    productClearance: {},
  });

  // 获取产品SKU详情信息
  const getDetailInfo = async (code) => {
    const res = await productApi.luteosProductSkuQueryProductSkuDetail({
      skuCode: code,
      operationType: 'detail',
    });
    if (!res.productImageList || res.productImageList.length === 0) {
      res.productImageList = [''];
    }

    form.value = res;
    await getDickBook();
  };

  // 店铺sku映射关系
  const mskuRelationList = ref([]);
  const getRelationList = async () => {
    const res = await productApi.luteosProductSkuQueryMSkuRelationList({
      skuCode: route.query.code,
      operationType: 'detail',
    });
    mskuRelationList.value = res.mskuRelationList || [];
  };
  getRelationList();

  const dickbook = ref<IDickbook>({
    product_shop: [],
    shop_platform: [],
    product_channel: [],
    product_site: [],
    product_saletype: [],
    product_activity: [],
    supplier_list: [],
    currency_list: [],
    deptMember_list: [],
    sensitiveTypeBeanList: [],
  });
  const getSupplierList = async () => {
    const res: any = await dataApi.luteosDataQuerySupplierBaseList();
    return res.supplierList.map((item) => {
      return {
        value: item.supplierCode,
        desc: item.supplierName,
      };
    });
  };
  // 获取币种options

  const getCurrencyOptions = async () => {
    const res = await dataApi.luteosDataQueryCurrencyList();
    return (res.currencyList as []).map((currency: any) => {
      return {
        value: currency.currencyCode,
        desc: `${currency.currencyCode}【${currency.currencyName}】`,
      };
    });
  };
  const queryDeptMemberList = async () => {
    const res = await memberApi.luteosMemberQueryDeptMemberList({
      deptId: 65717209,
    });
    return res.memberList?.map((item) => {
      return {
        desc: item.name,
        value: item.memberCode,
      };
    });
  };
  const querySensitiveTypeList = async () => {
    const res = await productApi.luteosProductSensitiveTypeQuerySensitiveTypeList({
      pageSize: 100,
    });
    return res.sensitiveTypeBeanList.map((item) => {
      return {
        desc: item.sensitiveTypeName,
        value: item.sensitiveTypeCode,
      };
    });
  };

  const brandOptions = ref([]);
  const getProductRelationList = async () => {
    const res = await productApi.luteosProductQueryProductRelationList();
    brandOptions.value = res.brandBeanList;
  };
  getProductRelationList();

  const getDickBook = async () => {
    const res: PlatformApi.PlatformDict.ResponseBody = await platformApi.platformDict({
      dictCodes: [
        'product_shop',
        'shop_platform',
        'product_channel',
        'product_site',
        'product_saletype',
        'product_activity',
        'hs_attr',
      ],
    });
    const supplierList = await getSupplierList();
    const currencyList = await getCurrencyOptions();
    const deptMemberList = await queryDeptMemberList();
    const sensitiveTypeBeanList = await querySensitiveTypeList();
    dickbook.value = {
      ...(res.dictMap as IDickbook),
      supplier_list: supplierList,
      currency_list: currencyList,
      deptMember_list: deptMemberList,
      sensitiveTypeBeanList,
    };
  };
  const tabsStatusMap = {
    0: {
      selected: true,
      valid: false,
    },
    1: {
      selected: false,
      valid: false,
    },
    2: {
      selected: true,
      valid: true,
    },
    3: {
      selected: false,
      valid: false,
    },
  };
  const tabChange = (name) => {
    tabsStatusMap[name].selected = true;
  };

  const visible = ref(false);
  const uniqueCode = ref('');
  const platformSku = ref('');
  const openDialog = (row) => {
    visible.value = true;
    uniqueCode.value = row.uniqueCode;
    platformSku.value = row.msku;
  };

  const handleActions = (item) => {
    const { key, row } = item;
    if (key === 'msku') {
      router.push({
        name: 'mskuperformance',
        query: {
          code: row.skuCode,
          row: encryptByBase64(
            JSON.stringify({
              ...row,
            })
          ),
        },
      });
    } else if (key === 'detail') {
      openDialog(row);
    }
  };

  onMounted(() => {
    getDetailInfo(route.query.code);
  });
  onUnmounted(() => {
    if (sessionStorage.getItem('goodsSearchInfo')) sessionStorage.removeItem('goodsSearchInfo');
  });
</script>

<style scoped lang="scss">
  :deep(.el-tabs__content) {
    overflow: visible;
  }

  :deep(.el-cascader-menu) {
    max-width: 18vw;
  }

  .form-table-item {
    // margin: 0;
    :deep(.el-form-item__content) {
      margin: 0 !important;
    }
  }

  .group-form-item {
    // margin: 0;
    :deep(.el-form-item__content) {
      margin: 0 !important;
      display: flex;
      column-gap: 10px;

      .el-form-item {
        flex: 1;
      }
    }
  }

  .arrows-icon {
    padding: 5px;
    border-radius: 5px;

    &:hover {
      background-color: var(--bs-gray-100);
    }
  }

  .link {
    color: #1989fa;
    cursor: pointer;
  }
</style>
