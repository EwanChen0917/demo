<template>
  <el-form
    ref="formRef"
    :model="form"
    :rules="rules"
    label-position="left"
    label-width="150"
    scroll-to-error
    :disabled="formDisabled"
  >
    <KeenFlex>
      <template #auto>
        <KeenCard title="产品图片" style="margin-bottom: 0 !important">
          <div class="text-center">
            <KeenImageUpload
              v-model="form.productImageList[0]"
              directory="product/goods"
              tooltip="更改产品图片"
            />
          </div>
        </KeenCard>
        <KeenCard title="SKU状态" style="margin-bottom: 0 !important">
          <!-- <el-input disabled /> -->
          <el-select v-model="form.stateDesc" disabled />
        </KeenCard>
        <KeenCard title="产品类型" style="margin-bottom: 0 !important">
          <el-select v-model="form.productTypeDesc" disabled />
        </KeenCard>
        <KeenCard title="产品经理" style="margin-bottom: 0 !important">
          <OperatorSelect v-model="form.createBy" />
        </KeenCard>
        <KeenCard title="品牌" style="margin-bottom: 0 !important">
          <el-select
            v-model="form.brandCode"
            placeholder="请选择品牌"
            clearable
            filterable
            class="w-100"
          >
            <el-option
              v-for="item in brandOptions"
              :key="item.brandCode"
              :label="item.brandDesc || ''"
              :value="item.brandCode!"
            />
          </el-select>
        </KeenCard>
      </template>
      <template #fluid>
        <el-tabs v-model="tabCurrent" @tab-change="tabChange">
          <el-tab-pane label="基础资料" :name="0">
            <KeenCard title="基础信息">
              <!-- <template #operation>
                <div class="d-flex flex-column">
                  <div class="badge fs-9 my-2" :class="stateClassMap[form?.stateDesc]">
                    {{ form?.stateDesc }}
                  </div>
                </div>
              </template> -->
              <div class="mw-600px px-7">
                <el-form-item label="产品分类：" prop="categoryNames">
                  <el-select style="width: 100%" v-model="form.categoryNames" disabled />
                  <!-- <CategoryCascader
                    class="w-100"
                    v-model="form.categoryCode"
                    @change="handleChange"
                    disabled
                    :filter-flag="1"
                  /> -->
                </el-form-item>
                <el-form-item style="position: relative" label="产品SPU：" prop="productSpu">
                  <el-input v-model="form.productSpu" disabled />
                  <router-link
                    target="_blank"
                    style="position: absolute; right: 12px"
                    v-if="form.productSpu"
                    :to="`/goodslist/detail?code=${form.productSpu}`"
                  >
                    产品详情
                  </router-link>
                </el-form-item>
                <el-form-item label="产品SKU：" prop="skuCode">
                  <el-input v-model="form.skuCode" disabled />
                </el-form-item>
                <el-form-item label="属性：" prop="attrValueNames">
                  <el-tag v-if="form?.attrValueNames">{{ form?.attrValueNames }}</el-tag>
                </el-form-item>
                <el-form-item label="产品中文名：" prop="productTitle">
                  <el-input v-model="form.productTitle" placeholder="请输入" />
                </el-form-item>
                <el-form-item label="产品英文名：" prop="productTitleEn">
                  <el-input v-model="form.productTitleEn" placeholder="请输入" />
                </el-form-item>
              </div>
            </KeenCard>
            <KeenCard title="SKU建议销售价">
              <div class="mw-800px px-7">
                <el-form-item class="group-form-item" label="建议销售价：" required>
                  <el-form-item prop="suggestPrice">
                    <NumberInput v-model="form.suggestPrice" placeholder="请输入" />
                  </el-form-item>
                  <el-form-item prop="suggestPriceCurrencyCode">
                    <el-select
                      v-model="form.suggestPriceCurrencyCode"
                      placeholder="币种"
                      filterable
                    >
                      <el-option
                        v-for="item in dickbook.currency_list"
                        :key="item.value"
                        :label="item.desc"
                        :value="item.value"
                      />
                    </el-select>
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
                        <el-select v-model="row.site" filterable placeholder="请选择">
                          <el-option
                            v-for="item in dickbook.product_site"
                            :key="item.value"
                            :label="item.desc"
                            :value="item.value"
                          />
                        </el-select>
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
                        <el-select v-model="row.channel" filterable placeholder="请选择">
                          <el-option
                            v-for="item in dickbook.product_channel"
                            :key="item.value"
                            :label="item.desc"
                            :value="item.value"
                          />
                        </el-select>
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
                        <el-select v-model="row.shop" filterable placeholder="请选择">
                          <el-option
                            v-for="item in dickbook.product_shop"
                            :key="item.value"
                            :label="item.desc"
                            :value="item.value"
                          />
                        </el-select>
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
                        <el-select v-model="row.activityType" filterable placeholder="请选择">
                          <el-option
                            v-for="item in dickbook.product_activity"
                            :key="item.value"
                            :label="item.desc"
                            :value="item.value"
                          />
                        </el-select>
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
                          <NumberInput v-model="row.actualPrice" placeholder="请输入" />
                        </el-form-item>
                        <el-form-item
                          :prop="`skuSalesPriceList[${$index}].currencyCode`"
                          :rules="[{ required: true, message: '请选择币种' }]"
                        >
                          <CurrencySelect v-model="row.currencyCode" placeholder="币种" />
                        </el-form-item>
                      </el-form-item>
                    </template>
                  </el-table-column>
                  <el-table-column prop="col.id" label="操作" width="60px" align="right">
                    <template #default="{ $index }">
                      <el-button
                        size="small"
                        link
                        @click="removeskuSalesPriceList($index)"
                        type="danger"
                      >
                        删除
                      </el-button>
                    </template>
                  </el-table-column>
                </el-table>
                <p>
                  <el-button
                    plain
                    size="small"
                    :icon="Plus"
                    type="primary"
                    @click="addskuSalesPriceList"
                  >
                    新增
                  </el-button>
                </p>
              </div>
            </KeenCard>
            <KeenCard title="规格信息">
              <SpecificationsInfo
                ref="specificationsInfoFormRef"
                v-model:form="form.productSpec"
                :disabled="formDisabled"
              />
            </KeenCard>
          </el-tab-pane>
          <el-tab-pane label="供应商信息" :name="1" lazy>
            <KeenCard title="供应商信息">
              <PurchaseInfo
                :operator-options="operatorOptions"
                :currencyOptions="(dickbook.currency_list as any[])"
                :productManagerCode="(form.createBy as string)"
                v-model:form="form.productSkuPurchase"
                :disabled="formDisabled"
              />
            </KeenCard>
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
                <el-table-column label="供应商信息">
                  <template #default="{ row, $index }">
                    <el-form-item
                      class="form-table-item"
                      :prop="`productSupplierSkuList[${$index}].supplierCode`"
                      :rules="[{ required: true, message: '请选择供应商' }]"
                    >
                      <el-select v-model="row.supplierCode" filterable>
                        <el-option
                          v-for="item in dickbook.supplier_list"
                          :key="item.value"
                          :label="`${item.value}-${item.desc}` || ''"
                          :value="item.value"
                        />
                      </el-select>
                    </el-form-item>
                  </template>
                </el-table-column>
                <el-table-column label="采购员">
                  <template #default="{ row }">
                    <el-form-item class="form-table-item">
                      <el-select v-model="row.purchaseOperator" clearable class="w-100" filterable>
                        <el-option
                          v-for="item in operatorOptions"
                          :key="item.memberCode"
                          :label="item.name || ''"
                          :value="item.memberCode!"
                        />
                      </el-select>
                    </el-form-item>
                  </template>
                </el-table-column>
                <el-table-column label="采购价">
                  <template #default="{ row, $index }">
                    <el-form-item class="group-form-item">
                      <el-form-item
                        class="form-table-item"
                        :prop="`productSupplierSkuList[${$index}].purchasePrice`"
                        :rules="[{ required: true, message: '请输入采购价' }]"
                      >
                        <NumberInput v-model="row.purchasePrice" placeholder="请输入" />
                      </el-form-item>
                      <el-form-item
                        style="margin: auto"
                        class="form-table-item"
                        :prop="`productSupplierSkuList[${$index}].purchaseCurrencyCode`"
                        :rules="[{ required: true, message: '请选择币种' }]"
                      >
                        <el-select v-model="row.purchaseCurrencyCode" placeholder="币种" filterable>
                          <el-option
                            v-for="item in dickbook.currency_list"
                            :key="item.value"
                            :label="item.desc"
                            :value="item.value"
                          />
                        </el-select>
                      </el-form-item>
                    </el-form-item>
                  </template>
                </el-table-column>
                <el-table-column label="境内货源地">
                  <template #default="{ row }">
                    <el-form-item class="form-table-item">
                      <el-input v-model="row.territoryGoods" />
                    </el-form-item>
                  </template>
                </el-table-column>
                <el-table-column label="操作" width="60px" align="right">
                  <template #default="{ row, $index }">
                    <el-link
                      v-if="!(row.productSku && $index === 0)"
                      type="danger"
                      :underline="false"
                      @click="removeProductSupplierSkuList($index)"
                    >
                      删除
                    </el-link>
                  </template>
                </el-table-column>
              </el-table>
              <p>
                <el-button
                  plain
                  size="small"
                  :icon="Plus"
                  type="primary"
                  @click="addProductSupplierSkuList"
                >
                  新增
                </el-button>
              </p>
            </KeenCard>
          </el-tab-pane>
          <el-tab-pane label="报关/清关信息" :name="2" lazy>
            <KeenCard title="清关信息">
              <div class="mw-600px px-7">
                <el-form-item label="申报价值" prop="productDeclare.declarePrice">
                  <NumberInput
                    style="max-width: 300px"
                    v-model="form.productDeclare.declarePrice"
                    placeholder="请输入"
                    appendText="USD"
                  />
                </el-form-item>
                <el-form-item label="中文报关品名" prop="productDeclare.declareName">
                  <el-input v-model="form.productDeclare.declareName" placeholder="请输入" />
                </el-form-item>
                <el-form-item label="英文报关品名" prop="productDeclare.declareNameEn">
                  <el-input v-model="form.productDeclare.declareNameEn" placeholder="请输入" />
                </el-form-item>
                <el-form-item label="敏感类型" prop="productDeclare.sensitiveTypeCodeList">
                  <el-checkbox-group v-model="form.productDeclare.sensitiveTypeCodeList">
                    <el-checkbox
                      v-for="item in dickbook?.sensitiveTypeBeanList"
                      :key="item.value"
                      :label="item.value"
                    >
                      {{ item.desc }}
                    </el-checkbox>
                  </el-checkbox-group>
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
                    <el-input
                      v-model="form.productDeclare.hsCode"
                      placeholder="请输入海关申报代码"
                    />
                  </el-form-item>
                  <el-form-item label="申报说明：">
                    <el-input
                      v-model="form.productDeclare.declareExplain"
                      placeholder="请输入申报说明"
                    />
                  </el-form-item>
                  <el-form-item label="进口申报价值：">
                    <div class="d-flex">
                      <el-input v-model="form.productDeclare.hsImportPrice" placeholder="请输入" />
                      <span class="ms-3">USD</span>
                    </div>
                  </el-form-item>
                  <el-form-item label="中文材质：">
                    <el-input
                      v-model="form.productDeclare.productMaterialIngredient"
                      placeholder="请输入中文材质"
                    />
                  </el-form-item>
                  <el-form-item label="英文材质：">
                    <el-input
                      v-model="form.productDeclare.productMaterialIngredientEn"
                      placeholder="请输入英文材质"
                    />
                  </el-form-item>
                  <el-form-item label="中文用途：">
                    <el-input v-model="form.productDeclare.useCn" placeholder="请输入中文用途" />
                  </el-form-item>
                  <el-form-item label="英文用途：">
                    <el-input v-model="form.productDeclare.useEn" placeholder="请输入英文用途" />
                  </el-form-item>
                  <el-form-item label="海关税率：">
                    <el-input
                      v-model="form.productDeclare.hsTariffRate"
                      placeholder="请输入海关税率"
                    />
                  </el-form-item>
                  <el-form-item label="海关属性：">
                    <el-select
                      v-model="form.productDeclare.hsAttr"
                      class="w-100"
                      placeholder="请选择海关属性"
                      filterable
                    >
                      <el-option
                        v-for="item in dickbook.hs_attr"
                        :label="item.desc"
                        :value="parseInt(item.value)"
                        :key="item.value"
                      />
                    </el-select>
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
                  <el-select v-model="form.productClearance.creator" filterable clearable>
                    <el-option
                      v-for="item in creatorList"
                      :value="item.value"
                      :label="item.label"
                      :key="item.value"
                    />
                  </el-select>
                </el-form-item>
                <el-form-item label="成交单位：">
                  <el-input v-model="form.productClearance.transactionUnit" />
                </el-form-item>
                <el-form-item label="申报价值：">
                  <el-input v-model="form.productClearance.declarePrice" />
                </el-form-item>
                <el-form-item label="产品毛重：">
                  <el-input v-model="form.productClearance.productGrossWeight" />
                </el-form-item>
                <el-form-item label="海关品名：">
                  <el-input v-model="form.productClearance.hsProductName" />
                </el-form-item>
                <el-form-item label="海关编码：">
                  <el-input v-model="form.productClearance.hsCode" />
                </el-form-item>
                <el-form-item label="申报要素：">
                  <el-input v-model="form.productClearance.declareElement" />
                </el-form-item>
                <el-form-item label="备注：">
                  <el-input v-model="form.productClearance.remark" />
                </el-form-item>
              </div>
            </KeenCard>
          </el-tab-pane>
          <!--          <el-tab-pane label="店铺售卖" :name="3" lazy>
            <KeenCard>
              <el-table :data="form.mskuRelationList" min-height="400px">
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
                <el-table-column label="详情" width="60px" fixed="right" align="right">
                  <template #default="{ row }">
                    <el-button type="text" size="small" @click="openDialog(row)">详情</el-button>
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

  <div class="card-footer d-flex justify-content-end py-6 px-9" v-if="!formDisabled">
    <el-space>
      <el-button @click="handleCancel">取消</el-button>
      <el-button type="primary" :loading="saveLoading" @click="handleSaveSubmit">保存</el-button>
    </el-space>
  </div>
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
  import { Plus } from '@element-plus/icons-vue';
  import NumberInput from '@/components/NumberInput/index.vue';
  import { ElMessage, type FormInstance, type FormRules } from 'element-plus';
  import { ProductApi, productApi, platformApi, PlatformApi, dataApi, memberApi } from '@/api';
  import * as swal from '@/utils/swal';
  import SkuPerformace from '@/views/goodscenter/productperformance/sku/components/performance.vue';
  import AddSkuModal from './components/addSkuModal.vue';
  import SpecificationsInfo from '../../components/specificationsInfo.vue';
  import PurchaseInfo from '../../components/purchaseInfo.vue';
  import DeclareInfo from '../../components/declareInfo.vue';
  import CategoryCascader from '../../components/categoryCascader.vue';
  import type { IDickbook } from './data';

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
    /** 供应商信息 */
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
    /** 店铺sku映射关系(新) */
    mskuRelationList: [],
  });
  const rules = reactive<FormRules>({
    productImageList: [{ required: true, type: 'array', message: '请上传图片' }],
    suggestPrice: [{ required: true, message: '请输入建议销售价' }],
    suggestPriceCurrencyCode: [{ required: true, message: '请选择币种' }],
    productTitle: [{ required: true, message: '请输入SKU中文名' }],
    productTitleEn: [{ required: true, message: '请输入SKU英文名' }],
    productDeclare: {
      declarePrice: [{ required: true, message: '请输入申报价值' }],
      declareName: [{ required: true, message: '请输入中文申报品名' }],
      declareNameEn: [{ required: true, message: '请输入英文申报品名' }],
      productMaterialIngredient: [{ required: true, message: '请输入中文材质' }],
      sensitiveTypeCodeList: [
        { required: true, type: 'array', trigger: 'change', message: '请选择敏感类型' },
      ],
    },
  });

  // 获取产品SKU详情信息
  const getDetailInfo = async (code) => {
    const res = await productApi.luteosProductSkuQueryProductSkuDetail({
      skuCode: code,
      operationType: 'update',
    });
    if (!res.productImageList || res.productImageList.length === 0) {
      res.productImageList = [''];
    }

    form.value = res;
    await getDickBook();
  };

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

  const creatorList = ref<any[]>([]);
  const getCreatorList = async () => {
    const res = await memberApi.luteosMemberQueryDeptMemberList({
      operatorDepartmentCode: 'all_dept',
    });
    creatorList.value = res.memberList!.map((item) => {
      return {
        label: item.name,
        value: item.memberCode,
      };
    });
  };
  getCreatorList();

  const brandOptions = ref([]);
  const getProductRelationList = async () => {
    const res = await productApi.luteosProductQueryProductRelationList();
    brandOptions.value = res.brandBeanList;
  };
  getProductRelationList();

  const operatorOptions = ref<any[]>([]);
  const getOperatorOptions = async () => {
    const res = await memberApi.luteosMemberQueryDeptMemberList({
      operatorDepartmentCode: 'all_dept',
    });
    operatorOptions.value = res.memberList;
  };
  getOperatorOptions();

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
  // 添加SKU建议销售价
  const addskuSalesPriceList = () => {
    form.value.skuSalesPriceList?.push({
      actualPrice: undefined,
      actualPriceCurrencyCode: form.value.suggestPriceCurrencyCode || '',
      channel: '',
      shop: '',
      saleSkuCode: '',
      site: '',
    });
  };
  const removeskuSalesPriceList = (index) => {
    form.value.skuSalesPriceList?.splice(index, 1);
  };
  const addProductSupplierSkuList = () => {
    form.value.productSupplierSkuList?.push({
      productSku: '',
      purchaseCurrencyCode: form.value.productSkuPurchase.purchaseCurrencyCode || '',
      purchaseOperator: '',
      purchaseOperatorName: '',
      purchasePrice: undefined,
      supplierCode: '',
      supplierName: '',
    });
  };
  const removeProductSupplierSkuList = (index) => {
    form.value.productSupplierSkuList?.splice(index, 1);
  };

  const visible = ref(false);
  const uniqueCode = ref('');
  const platformSku = ref('');
  const openDialog = (row) => {
    visible.value = true;
    uniqueCode.value = row.uniqueCode;
    platformSku.value = row.msku;
  };
  const router = useRouter();
  const handleCancel = () => {
    router.push({
      name: 'skulist',
    });
  };
  const handleAddSkuRelation = (data) => {
    const index = form.value?.skuCodeRelationList?.findIndex((item) => {
      return !item.platformSku && item._id === data._id;
    });
    console.log(data, index);
    const row = {
      ...data,
      relType: data.skuList.length > 1 ? 1 : 0,
      quantity: data.skuList[0].quantity,
    };
    if (index === -1) {
      form.value.skuCodeRelationList?.push(row);
    } else {
      form.value.skuCodeRelationList?.splice(index, 1, row);
    }
  };
  const saveLoading = ref<boolean>(false);

  const checkPurchaseData = () => {
    if (
      !form.value.productSkuPurchase?.purchaseOperator ||
      !form.value.productSkuPurchase.purchaseCurrencyCode ||
      !form.value.productSkuPurchase.supplierCode
    ) {
      ElMessage.warning('请完善供应商信息');
      return false;
    }
    const result = form.value.productSupplierSkuList?.some((item) => {
      return !item.purchaseCurrencyCode || !item.supplierCode || !item.purchasePrice;
    });
    if (result) {
      ElMessage.warning('请完善关联供应链SKU');
      return false;
    }
    return true;
  };
  const handleSaveSubmit = async () => {
    const valid = await formRef.value?.validate().catch(() => {
      ElMessage.warning('请完善基础资料');
    });
    if (valid) {
      if (!checkPurchaseData()) {
        return false;
      }
      saveLoading.value = true;
      const params: ProductApi.LuteosProductSkuSaveSku.RequestParams = {
        productImageList: form.value.productImageList,
        productSkuPurchase: form.value.productSkuPurchase,
        productSupplierSkuList: form.value.productSupplierSkuList,
        productTitle: form.value.productTitle,
        productTitleEn: form.value.productTitleEn,
        skuSalesPriceList: form.value.skuSalesPriceList,
        suggestPrice: form.value.suggestPrice,
        suggestPriceCurrencyCode: form.value.suggestPriceCurrencyCode,
        skuCode: form.value.skuCode,
        productSkuDeclare: form.value.productDeclare,
        productSkuClearance: form.value.productClearance,
        productSpec: form.value.productSpec,
        createBy: form.value.createBy,
        brandCode: form.value.brandCode,
      };
      const res = await productApi.luteosProductSkuSaveSku(params).catch(() => {
        saveLoading.value = false;
      });
      if (res) {
        swal.success('保存成功');
        const arr = form.value.skuCodeRelationList?.filter((item) => !item.platformSku);
        const promiseArr = arr.map((data) => {
          return productApi.luteosProductSkuSavePlatformSkuRelation(data);
        });
        Promise.all(promiseArr).finally(() => {
          saveLoading.value = false;
          getDetailInfo(route.query.code);
        });
      }
    }

    // try {
    // saveLoading = true;
    //   setSkuList();
    //   form.skuList.forEach((item) => {
    //     if (item.productImageList.length > 0) {
    //       item.productImageUrl = item.productImageList[0];
    //     }
    //   });
    //   const data = {
    //     ...form,
    //     operateType,
    //     categoryCode: form.categoryCode[4],
    //     skuUpdateFlag: skuUpdateFlag.value,
    //   };
    //   if (specificationsInfoFormRef.value) {
    //     data.productSpec = {
    //       ...specificationsInfoFormRef.value.form,
    //       ...productLevelFormRef.value.form,
    //     };
    //   }
    //   if (purchaseInfoFormRef.value) {
    //     data.productPurchase = purchaseInfoFormRef.value.form;
    //   }
    //   if (declareInfoFormRef.value) {
    //     data.productDeclare = declareInfoFormRef.value.form;
    //   }
    //   const res = await productApi.luteosProductSaveProduct(data);
    //   swal.success(operateType === 1 ? '保存成功' : '提交成功');
    //   isEdit.value = true;
    //   getDetailInfo(res?.productSpu || form.productSpu);
    // } catch (e) {
    //   console.log(e);
    // } finally {
    //   saveLoading = false;
    // }
  };

  // const supplierListFilter = computed(() => {
  //   const supplierMap = {};
  //   form.value.productSupplierSkuList?.forEach((item) => {
  //     if (item.supplierCode) {
  //       supplierMap[item.supplierCode] = item.supplierName || '';
  //     }
  //   });
  //   return supplierMap;
  // });
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
</style>
