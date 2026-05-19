<template>
  <el-form label-width="180px" label-position="left">
    <div class="d-flex gap-5">
      <KeenCard title="基础信息" class="w-50">
        <el-form-item label="产品图">
          <KeenImageUpload v-if="form.productImage" disabled v-model="form.productImage" />
        </el-form-item>
        <el-form-item label="产品分类：">
          <span>{{ categoryName ? categoryName.join(' / ') : '' }}</span>
        </el-form-item>
        <el-form-item label="产品SPU：" prop="productSpu">
          <span>{{ form?.productSpu }}</span>
        </el-form-item>
        <el-form-item label="产品SPU状态：" prop="state">
          <Tag :color="colorMap[form?.state]">{{ form?.stateDesc }}</Tag>
        </el-form-item>
        <el-form-item label="产品类型：" prop="productTypeDesc">
          <span>{{ form?.productTypeDesc }}</span>
        </el-form-item>
        <el-form-item label="产品级别：" prop="productLevelNew">
          <span>{{ form?.productLevelNew }}</span>
        </el-form-item>
        <el-form-item label="产品中文名：" prop="productTitle">
          <span>{{ form?.name }}</span>
        </el-form-item>
        <el-form-item label="产品英文名：" prop="productTitleEn">
          <span>{{ form?.nameEn }}</span>
        </el-form-item>
        <el-form-item label="产品经理" prop="createBy">
          <span>{{ form?.createByName }}</span>
        </el-form-item>
        <el-form-item label="计划专员" prop="planner">
          <span>{{ form?.plannerName }}</span>
        </el-form-item>
        <el-form-item label="产品品线：" prop="productLine">
          <span>{{ form?.productLineName }}</span>
        </el-form-item>
        <el-form-item label="GTM经理：" prop="gtmName">
          <span>{{ form?.gtmName }}</span>
        </el-form-item>
        <el-form-item label="VOC型号：" prop="vocModel">
          <span>{{ form?.vocModel }}</span>
        </el-form-item>
      </KeenCard>

      <KeenCard title="属性信息" class="w-50">
        <el-table :data="form.attrList" row-key="attrCode">
          <el-table-column label="" width="30" align="center" />
          <el-table-column label="属性" prop="attrName" width="250">
            <template #default="scope">
              <div class="mb-2">
                <span>{{ scope.row?.attrName }}</span>
              </div>
            </template>
          </el-table-column>
          <el-table-column label="属性值">
            <template #default="scope">
              <div class="mb-2">
                <span v-for="(item, index) in scope.row.attrValueCodeList" :key="item">
                  <span>
                    {{
                      attrMap[scope.row.attrCode]?.find((x) => x.attrValueCode === item)
                        ?.attrValueName
                    }}
                  </span>
                  <span class="me-3" v-if="index !== scope.row.attrValueCodeList.length - 1">
                    ,
                  </span>
                </span>
              </div>
            </template>
          </el-table-column>
        </el-table>
      </KeenCard>
    </div>
    <el-radio-group
      class="mb-5"
      v-model="sortType"
      size="small"
      @change="sortByStatus"
      v-if="!isProductGroup"
    >
      <el-radio-button :label="0">所有</el-radio-button>
      <el-radio-button :label="1">未上架</el-radio-button>
      <el-radio-button :label="2">在销售</el-radio-button>
      <el-radio-button :label="3">清仓中</el-radio-button>
      <el-radio-button :label="4">已退市</el-radio-button>
    </el-radio-group>
    <KeenCard title="SKU信息" v-if="!isProductGroup">
      <vxe-table
        v-loading="listLoading"
        :data="
          form.skuList.filter((item) =>
            sortType > 0 ? item.state === sortType && item.activeFlag : item.activeFlag
          )
        "
        show-overflow
        show-header-overflow
        show-footer-overflow
        height="600"
        :cell-config="{ height: 120 }"
        :column-config="{ resizable: true }"
        :scroll-y="{ enabled: true, gt: 0 }"
        :scroll-x="{ enabled: true, gt: 0 }"
      >
        <vxe-column title="属性信息" align="center">
          <template #default="scope">
            <div v-if="Array.isArray(scope.row.attrvalueList)" class="mb-7 w-100">
              <div v-if="scope.row.attrvalueList.length > 1" class="d-flex flex-center flex-wrap">
                <div
                  v-for="(item, index) in scope.row.attrvalueList"
                  :key="index"
                  class="d-flex flex-center flex-nowrap"
                >
                  <div>{{ item.attrValueName }}</div>
                  <SvgIcon
                    v-if="index !== scope.row.attrvalueList.length - 1"
                    class-name="el-input__icon svg-icon-5 mx-3"
                    icon="multiple"
                  />
                </div>
              </div>
              <div v-else class="mb-7">
                {{ scope.row.attrvalueList[0].attrValueName }}
              </div>
            </div>
          </template>
        </vxe-column>
        <vxe-column title="产品SKU" min-width="120">
          <template #default="scope">
            <div>{{ scope.row?.skuCode }}</div>
            <span class="badge" :class="productStatusMap[scope.row.state]?.className">
              {{ productStatusMap[scope.row.state]?.desc ?? '' }}
            </span>
          </template>
        </vxe-column>
        <vxe-column title="产品SKU名称" min-width="180">
          <template #default="scope">
            <div class="pe-6 mw-550px">
              <div>{{ scope.row.productTitle }}</div>
              <div>{{ scope.row.productTitleEn }}</div>
            </div>
          </template>
        </vxe-column>
        <vxe-column title="SKU图片" min-width="230">
          <template #default="scope">
            <div class="d-flex flex-wrap align-items-center gap-10 p-3">
              <KeenImageUpload
                v-model="scope.row.productImageList[0]"
                directory="product/goods"
                tooltip="更改产品图片"
                :size="skuImageSize"
                disabled
              />
              <KeenImageUpload
                v-model="scope.row.productImageList[1]"
                directory="product/goods"
                tooltip="更改产品图片"
                :size="skuImageSize"
                disabled
              />
              <KeenImageUpload
                v-model="scope.row.productImageList[2]"
                directory="product/goods"
                tooltip="更改产品图片"
                :size="skuImageSize"
                disabled
              />
            </div>
          </template>
        </vxe-column>
        <vxe-column title="SKU建议销售价" min-width="100">
          <template #default="scope">
            <div class="w-100 d-flex gap-2">
              <span>{{ scope.row.suggestPrice }}</span>
              <span class="text-gray-500">{{ scope.row.suggestPriceCurrencyCode }}</span>
            </div>
          </template>
        </vxe-column>
        <vxe-column title="型号" min-width="100">
          <template #default="scope">
            <div class="w-100 d-flex gap-2">
              <span>{{ scope.row.modelName }}</span>
            </div>
          </template>
        </vxe-column>
      </vxe-table>
      <!--      <el-table
        :data="
          form.skuList.filter((item) =>
            sortType > 0 ? item.state === sortType && item.activeFlag : item.activeFlag
          )
        "
      >
        <el-table-column label="属性信息" align="center">
          <template #default="scope">
            <div v-if="Array.isArray(scope.row.attrvalueList)" class="mb-7 w-100">
              <div v-if="scope.row.attrvalueList.length > 1" class="d-flex flex-center flex-wrap">
                <div
                  v-for="(item, index) in scope.row.attrvalueList"
                  :key="index"
                  class="d-flex flex-center flex-nowrap"
                >
                  <div>{{ item.attrValueName }}</div>
                  <SvgIcon
                    v-if="index !== scope.row.attrvalueList.length - 1"
                    class-name="el-input__icon svg-icon-5 mx-3"
                    icon="multiple"
                  />
                </div>
              </div>
              <div v-else class="mb-7">
                {{ scope.row.attrvalueList[0].attrValueName }}
              </div>
            </div>
          </template>
        </el-table-column>
        <el-table-column label="产品SKU" min-width="120">
          <template #default="scope">
            &lt;!&ndash;            <el-form-item
              label-width="0"
              :prop="'skuList.' + scope.$index + '.skuCode'"
              class="pe-6"
            >
              <span>{{ scope.row?.skuCode }}</span>
            </el-form-item>&ndash;&gt;
            <div>{{ scope.row?.skuCode }}</div>
            <span class="badge" :class="productStatusMap[scope.row.state]?.className">
              {{ productStatusMap[scope.row.state]?.desc ?? '' }}
            </span>
          </template>
        </el-table-column>
        <el-table-column label="产品SKU名称" min-width="180">
          <template #default="scope">
            <div class="pe-6 mw-550px">
              &lt;!&ndash;              <el-form-item label-width="0" :prop="'skuList.' + scope.$index + '.productTitle'">&ndash;&gt;
              <div>{{ scope.row.productTitle }}</div>
              <div>{{ scope.row.productTitleEn }}</div>
              &lt;!&ndash;              </el-form-item>&ndash;&gt;
              &lt;!&ndash;              <el-form-item label-width="0" :prop="'skuList.' + scope.$index + '.productTitleEn'">
                {{ scope.row.productTitleEn }}
              </el-form-item>&ndash;&gt;
            </div>
          </template>
        </el-table-column>
        <el-table-column label="SKU图片" min-width="230">
          <template #default="scope">
            <div class="d-flex flex-wrap align-items-center gap-10 p-3">
              <KeenImageUpload
                v-model="scope.row.productImageList[0]"
                directory="product/goods"
                tooltip="更改产品图片"
                :size="skuImageSize"
                disabled
              />
              <KeenImageUpload
                v-model="scope.row.productImageList[1]"
                directory="product/goods"
                tooltip="更改产品图片"
                :size="skuImageSize"
                disabled
              />
              <KeenImageUpload
                v-model="scope.row.productImageList[2]"
                directory="product/goods"
                tooltip="更改产品图片"
                :size="skuImageSize"
                disabled
              />
            </div>
          </template>
        </el-table-column>
        <el-table-column label="SKU建议销售价" min-width="100">
          <template #default="scope">
            <div class="w-100 d-flex gap-2">
              <span>{{ scope.row.suggestPrice }}</span>
              <span class="text-gray-500">{{ scope.row.suggestPriceCurrencyCode }}</span>
            </div>
          </template>
        </el-table-column>
        <el-table-column label="型号" min-width="100">
          <template #default="scope">
            <div class="w-100 d-flex gap-2">
              <span>{{ scope.row.modelName }}</span>
            </div>
          </template>
        </el-table-column>
      </el-table>-->

      <el-divider v-if="invalidSkuList?.length > 0">
        <div class="d-flex flex-center cursor-pointer text-gray-600" @click="hideFlag = !hideFlag">
          <span>{{ hideFlag ? '展开' : '收起' }}废弃SKU</span>
          <svgIcon v-if="hideFlag" icon="arrows-arr072" class="svg-icon svg-icon-1" />
          <svgIcon v-else icon="arrows-arr073" class="svg-icon svg-icon-1" />
        </div>
      </el-divider>
      <div v-show="!hideFlag && invalidSkuList?.length > 0">
        <vxe-table
          :data="invalidSkuList.filter((item) => (sortType > 0 ? item.state === sortType : true))"
          :show-header="false"
        >
          <vxe-column title="属性信息" align="center">
            <template #default="scope">
              <div v-if="Array.isArray(scope.row.attrvalueList)" class="mb-7 w-100">
                <div v-if="scope.row.attrvalueList.length > 1" class="d-flex flex-center flex-wrap">
                  <div
                    v-for="(item, index) in scope.row.attrvalueList"
                    :key="index"
                    class="d-flex flex-center flex-nowrap"
                  >
                    <div>{{ item.attrValueName }}</div>
                    <SvgIcon
                      v-if="index !== scope.row.attrvalueList.length - 1"
                      class-name="el-input__icon svg-icon-5 mx-3"
                      icon="multiple"
                    />
                  </div>
                </div>
                <div v-else class="mb-7">
                  {{ scope.row.attrvalueList[0].attrValueName }}
                </div>
              </div>
            </template>
          </vxe-column>
          <vxe-column title="产品SKU" min-width="120">
            <template #default="scope">
              <div>{{ scope.row.skuCode }}</div>
              <div class="badge badge-secondary">废弃</div>
            </template>
          </vxe-column>
          <vxe-column title="产品SKU名称" min-width="180">
            <template #default="scope">
              <div class="mw-550px">
                <div class="mb-5">
                  {{ scope.row.productTitle }}
                </div>

                <div>{{ scope.row.productTitleEn }}</div>
              </div>
            </template>
          </vxe-column>
          <vxe-column title="SKU图片" min-width="230">
            <template #default="scope">
              <div class="d-flex flex-wrap align-items-center gap-10 p-5">
                <KeenImageUpload
                  v-model="scope.row.productImageList[0]"
                  :size="skuImageSize"
                  disabled
                />
                <KeenImageUpload
                  v-model="scope.row.productImageList[1]"
                  :size="skuImageSize"
                  disabled
                />
                <KeenImageUpload
                  v-model="scope.row.productImageList[2]"
                  :size="skuImageSize"
                  disabled
                />
              </div>
            </template>
          </vxe-column>
          <vxe-column title="SKU建议销售价" min-width="100">
            <template #default="scope" class="pe-3">
              <div class="mb-3">
                {{ scope.row.suggestPrice }}
              </div>
              <el-form-item label-width="0">
                <CurrencySelect v-model="scope.row.suggestPriceCurrencyCode" disabled />
              </el-form-item>
            </template>
          </vxe-column>
          <vxe-column title="型号" min-width="100">
            <template #default="scope">
              <div class="w-100 d-flex gap-2">
                <span>{{ scope.row.modelName }}</span>
              </div>
            </template>
          </vxe-column>
        </vxe-table>

        <!--        <el-table
          :data="invalidSkuList.filter((item) => (sortType > 0 ? item.state === sortType : true))"
          :show-header="false"
        >
          <el-table-column label="属性信息" align="center">
            <template #default="scope">
              <div v-if="Array.isArray(scope.row.attrvalueList)" class="mb-7 w-100">
                <div v-if="scope.row.attrvalueList.length > 1" class="d-flex flex-center flex-wrap">
                  <div
                    v-for="(item, index) in scope.row.attrvalueList"
                    :key="index"
                    class="d-flex flex-center flex-nowrap"
                  >
                    <div>{{ item.attrValueName }}</div>
                    <SvgIcon
                      v-if="index !== scope.row.attrvalueList.length - 1"
                      class-name="el-input__icon svg-icon-5 mx-3"
                      icon="multiple"
                    />
                  </div>
                </div>
                <div v-else class="mb-7">
                  {{ scope.row.attrvalueList[0].attrValueName }}
                </div>
              </div>
            </template>
          </el-table-column>
          <el-table-column label="产品SKU" min-width="120">
            <template #default="scope">
              <div class="mb-2">{{ scope.row.skuCode }}</div>
              <div class="badge badge-secondary">废弃</div>
            </template>
          </el-table-column>
          <el-table-column label="产品SKU名称" min-width="180">
            <template #default="scope">
              <div class="mw-550px">
                <div class="mb-5">
                  {{ scope.row.productTitle }}
                </div>

                <div>{{ scope.row.productTitleEn }}</div>
              </div>
            </template>
          </el-table-column>
          <el-table-column label="SKU图片" min-width="230">
            <template #default="scope">
              <div class="d-flex flex-wrap align-items-center gap-10 p-5">
                <KeenImageUpload
                  v-model="scope.row.productImageList[0]"
                  :size="skuImageSize"
                  disabled
                />
                <KeenImageUpload
                  v-model="scope.row.productImageList[1]"
                  :size="skuImageSize"
                  disabled
                />
                <KeenImageUpload
                  v-model="scope.row.productImageList[2]"
                  :size="skuImageSize"
                  disabled
                />
              </div>
            </template>
          </el-table-column>
          <el-table-column label="SKU建议销售价" min-width="100">
            <template #default="scope" class="pe-3">
              <div class="mb-3">
                {{ scope.row.suggestPrice }}
              </div>
              <el-form-item label-width="0">
                <CurrencySelect v-model="scope.row.suggestPriceCurrencyCode" disabled />
              </el-form-item>
            </template>
          </el-table-column>
        </el-table>-->
      </div>
    </KeenCard>

    <KeenCard title="组合SKU信息" v-if="isProductGroup">
      <el-table :data="form.skuList">
        <el-table-column label="组合信息">
          <template #default="scope">
            <el-form-item v-if="Array.isArray(scope.row.skuItemBeanList)" label-width="0">
              <el-row class="w-100" v-for="(item, index) in scope.row.skuItemBeanList" :key="index">
                <el-col :span="16">
                  <span>{{ item?.skuCode }}</span>
                </el-col>
                <el-col :span="8">
                  <div>{{ item?.qty }}</div>
                </el-col>
              </el-row>
            </el-form-item>
          </template>
        </el-table-column>
        <el-table-column label="组合产品SKU" min-width="100">
          <template #default="scope">
            <div>{{ scope.row?.skuCode }}</div>
            <span class="badge" :class="productStatusMap[scope.row.state]?.className">
              {{ productStatusMap[scope.row.state]?.desc ?? '' }}
            </span>
          </template>
        </el-table-column>
        <el-table-column label="产品SKU名称" min-width="180">
          <template #default="scope">
            <div class="pe-6 mw-550px">
              <div>{{ scope.row.productTitle }}</div>
              <div>{{ scope.row.productTitleEn }}</div>
            </div>
          </template>
        </el-table-column>
        <el-table-column label="SKU图片" min-width="230">
          <template #default="scope">
            <div class="d-flex flex-wrap align-items-center gap-10 p-3">
              <KeenImageUpload
                v-model="scope.row.productImageList[0]"
                directory="product/goods"
                tooltip="更改产品图片"
                :size="skuImageSize"
                disabled
              />
              <KeenImageUpload
                v-model="scope.row.productImageList[1]"
                directory="product/goods"
                tooltip="更改产品图片"
                :size="skuImageSize"
                disabled
              />
              <KeenImageUpload
                v-model="scope.row.productImageList[2]"
                directory="product/goods"
                tooltip="更改产品图片"
                :size="skuImageSize"
                disabled
              />
            </div>
          </template>
        </el-table-column>
        <el-table-column label="SKU建议销售价" min-width="100">
          <template #default="scope">
            <div class="w-100 d-flex gap-2">
              <span>{{ scope.row.suggestPrice }}</span>
              <span class="text-gray-500">{{ scope.row.suggestPriceCurrencyCode }}</span>
            </div>
          </template>
        </el-table-column>
        <el-table-column label="型号" min-width="100">
          <template #default="scope">
            <div class="w-100 d-flex gap-2">
              <span>{{ scope.row.modelName }}</span>
            </div>
          </template>
        </el-table-column>
      </el-table>
    </KeenCard>
    <KeenCard title="其他信息">
      <el-form label-width="150" class="mw-600px px-7" label-position="left">
        <el-form-item label="品牌：">
          <span>{{ form.brandName }}</span>
          <!--            <el-select
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
                      </el-select>-->
        </el-form-item>
        <el-form-item label="系列：">
          <span v-for="(item, index) in form.seriesCodeList" :key="item">
            <span class="me-3">
              {{ seriesOptions?.find((x) => x.seriesCode === item)?.seriesName }}
            </span>
            <span class="me-3" v-if="index !== form.seriesCodeList.length - 1">,</span>
          </span>
        </el-form-item>
        <el-form-item label="型号：">
          <span v-for="(item, index) in form.modelCodeList" :key="item">
            <span>
              {{ modelOptions?.find((x) => x.modelCode === item)?.modelName }}
            </span>
            <span class="me-3" v-if="index !== form.modelCodeList.length - 1">,</span>
          </span>
        </el-form-item>
        <!--        <el-form-item label="产品品线：">
          <span>{{ form?.productLineName }}</span>
        </el-form-item>-->
        <el-form-item label="产品标签：">
          <span v-for="(item, index) in form.tagCodeList" :key="item">
            <span class="me-3">
              {{ tagOptions?.find((x) => x.tagCode === item)?.tagName }}
            </span>
            <span class="me-3" v-if="index !== form.tagCodeList.length - 1">,</span>
          </span>
        </el-form-item>
        <el-form-item label="产品卖点：" class="label-top-align">
          <span class="selling-point-text">
            {{ form.sellingPoint }}
          </span>
        </el-form-item>
      </el-form>
    </KeenCard>
  </el-form>
</template>

<script setup lang="ts" name="fiveLevelMenu">
  import { ProductApi, productApi } from '@/api';

  const colorMap = {
    1: 'yellow',
    2: 'green',
    3: 'blue',
    4: 'purple',
  };

  /** activated里用于判断是否进行过第一次请求 */
  const isMountedEnd = ref(false);

  const productStatusMap = {
    null: { desc: '未知', className: 'badge-light-info' },
    1: { desc: '未上架', className: 'badge-light-primary' },
    2: { desc: '在销售', className: 'badge-light-success' },
    3: { desc: '清仓中', className: 'badge-light-warning' },
    4: { desc: '已退市', className: 'badge-light-danger' },
  };

  // 是否组合商品
  const isProductGroup = computed(() => {
    return form.productType === 13;
  });

  const route = useRoute();

  const form = reactive<ProductApi.LuteosProductSaveProduct.RequestBody>({
    /** 品牌编码 */
    brandCode: '',
    brandName: '',
    /** 五级分类编码 */
    categoryCode: [],
    /** 归属人编码 */
    createBy: '',
    createByName: '',
    /** 计划专员 */
    planner:'',
    /** 计划专员名 */
    plannerName:'',
    /** 币种 */
    currencyCode: 'CNY',
    /** 型号信息 */
    modelCodeList: [],
    /** 产品名称 */
    name: '',
    /** 产品名称英文 */
    nameEn: '',
    /**
     * 操作类型 1：保存草稿 2：提交审批
     * @format int32
     * @min 1
     * @exclusiveMin false
     * @max 2
     * @exclusiveMax false
     */
    operateType: '',
    /** 报关/清关信息 */
    productDeclareList: [
      {
        /** 报关/清关信息：申报品名CN */
        declareName: '',
        /** 报关/清关信息：申报品名EN */
        declareNameEn: '',
        /** 报关/清关信息：申报价值 */
        declarePrice: '',
        /** 报关/清关信息：产品材质及成分含量 */
        productMaterialIngredient: '',
        /** 供应链产品产品SKU */
        productSku: '',
        /** 敏感类型 */
        sensitiveTypeCodeList: [],
        /** 产品SKU */
        skuCode: '',
      },
    ],
    productSpecList: [],
    /**
     * 产品id
     * @format int64
     */
    productId: '',
    /** 产品图片 */
    productImage: '',
    /** 供应商信息：供应商信息 */
    productPurchaseList: [],
    productSpec: {
      /** 采购编码 */
      purchaseCode: '',
      /** 采购币种 */
      purchaseCurrencyCode: '',
      /** 采购负责人 */
      purchaseOperator: '',
      /** 采购负责人名称 */
      purchaseOperatorName: '',
      /** 默认采购单价 */
      purchasePrice: '',
      /** 供应商代码 */
      supplierCode: '',
      /** 供应商名称 */
      supplierName: '',
    },
    /** 产品Id,产品SPU，产品spu  */
    productSpu: '',
    /**
     * 产品类型
     * @format int32
     */
    productType: 1,
    productTypeDesc: 1,
    /** 系列信息 */
    seriesCodeList: [],
    /** sku信息 */
    skuList: [],
    invalidSkuList: [],
    /** 建议销售价格 */
    suggestSellPrice: '',
    /** 产品标签 */
    tagCodeList: [],
    /** 产品卖点 */
    sellingPoint: '',
    /** 属性编码 */
    attrList: [],
    state: 0,
    stateDesc: '开发中',
    productStatusRecordList: [],
    purchaseApproveStatus: '',
    declareApproveStatus: '',
    purchaseWorkflowCode: '',
    declareWorkflowCode: '',
    productLevelNew: '',
    productLine: '',
    productLineName: '',
    gtmName: '',
    vocModel: '',
  });

  const offsetWidth = ref<number>(document.body.offsetWidth);
  window.onresize = () => {
    return (() => {
      offsetWidth.value = document.body.offsetWidth;
    })();
  };
  const skuImageSize = computed(() => {
    return offsetWidth.value > 975 ? offsetWidth.value / 25 : offsetWidth.value / 22;
  });

  const invalidSkuList = computed(() => {
    return form.skuList?.filter((item) => !item.activeFlag) || [];
  });

  const sortType = ref<number>(2);
  const sortByStatus = (val) => {
    const defaultSort = [2, 1, 3, 4];
    const curSort = val
      ? defaultSort.sort((a) => {
          return a === val ? -1 : 1;
        })
      : defaultSort;
    form.skuList?.sort((a, b) => {
      return curSort.indexOf(a.state) - curSort.indexOf(b.state);
    });
  };

  const categoryName = ref([]);
  const listLoading = ref(false);
  const getDetailInfo = async (code) => {
    try {
      listLoading.value = true;
      const res = await productApi.luteosProductQueryDetail({
        productSpu: code,
        operationType: 'detail',
      });

      Object.keys(form).forEach((key) => {
        form[key] = res[key] ?? form[key];
      });
      isMountedEnd.value = true;
      console.log(`setismoutend true`);
      let parent = res?.productCategory;
      for (let i = 1; i <= 5; i += 1) {
        form.categoryCode?.push(parent?.categoryCode);
        categoryName.value?.push(parent?.categoryName);
        parent = parent?.productCategory;
      }
      console.log(form.categoryCode);
      getProductAttrList(form.categoryCode[form.categoryCode?.length - 1]);
    } finally {
      listLoading.value = false;
    }
  };

  const productAttrList = ref<any[]>([]);
  const attrMap = reactive({});
  const getProductAttrList = async (val) => {
    const res = await productApi.luteosProductAttrQueryProductAttrList({
      categoryCode: val,
    });
    productAttrList.value = res.productAttrList || [];
    if (productAttrList.value.length > 0) {
      productAttrList.value.forEach((item) => {
        attrMap[item.attrCode] = item.attrValueBeanList;
      });

      console.log('attrMap', attrMap);
    }
  };

  // 获取其他信息options
  const brandOptions = ref([]);
  const modelOptions = ref([]);
  const seriesOptions = ref([]);
  const tagOptions = ref([]);
  const getProductRelationList = async () => {
    const res = await productApi.luteosProductQueryProductRelationList();
    brandOptions.value = res.brandBeanList;
    modelOptions.value = res.modelBeanList;
    seriesOptions.value = res.seriesBeanList;
    tagOptions.value = res.tagBeanList;
  };
  getProductRelationList();

  onMounted(() => {
    getDetailInfo(route.query.code);
  });
  onActivated(() => {
    if (!isMountedEnd.value) return;
    getDetailInfo(route.query.code);
  });
</script>

<style scoped lang="scss">
  .arrows-icon {
    padding: 5px;
    border-radius: 5px;

    &:hover {
      background-color: var(--bs-gray-100);
    }
  }
  :deep(.el-table__row .el-table__cell) {
    padding-top: 5px;
    padding-bottom: 5px;
  }

  :deep(.vxe-cell) {
    max-height: unset !important;
    white-space: unset !important;
  }

  // 产品卖点label顶部对齐样式
  :deep(.label-top-align) {
    .el-form-item__label {
      align-self: flex-start;
      padding-top: 8px;
    }
  }
  .selling-point-text {
    word-wrap: break-word; /* 允许长单词换行 */
    word-break: break-all; /* 强制换行 */
    white-space: pre-wrap; /* 保留空格和换行符 */
    /* 设置行高 */
    max-width: 100%; /* 确保不超出容器 */
    display: inline-block; /* 让span能够正确换行 */
  }
</style>
