<template>
  <el-form
    ref="formRef"
    :model="form"
    :label-position="labelPosition"
    label-width="150"
    scroll-to-error
  >
    <KeenFlex>
      <template #auto>
        <KeenCard title="产品图片" style="margin-bottom: 0 !important">
          <div class="text-center">
            <KeenImageUpload
              v-model="form.productImage"
              directory="product/goods"
              tooltip="更改产品图片"
              disabled
            />
          </div>
        </KeenCard>
        <KeenCard title="产品类型" style="margin-bottom: 0 !important">
          <el-form-item prop="productType" label-width="0">
            <span>{{ form?.productTypeDesc }}</span>
          </el-form-item>
        </KeenCard>
        <KeenCard title="产品级别" style="margin-bottom: 0 !important">
          <el-form-item prop="productLevelNew" label-width="0">
            <span>{{ form?.productLevelNew }}</span>
          </el-form-item>
        </KeenCard>
        <KeenCard title="产品经理">
          <el-form-item prop="createBy" label-width="0">
            <span>{{ form?.createByName }}</span>
          </el-form-item>
        </KeenCard>
      </template>
      <template #fluid>
        <el-tabs v-model="tabCurrent" @tab-change="tabChange" :before-leave="beforeLeave">
          <el-tab-pane label="基础资料" :name="0">
            <KeenCard title="基础信息">
              <template #operation>
                <div class="d-flex flex-column">
                  <div class="badge fs-9 my-2" :class="stateClassMap[form?.stateDesc]">
                    {{ form?.stateDesc }}
                  </div>
                  <el-popover
                    popper-class="rt_el_pop"
                    :offset="0"
                    :hide-after="0"
                    placement="bottom-end"
                    :width="200"
                    trigger="click"
                  >
                    <div class="py-5 h-xl-100 fs-9">
                      <div
                        v-if="form.productStatusRecordList.length > 0"
                        style="
                          height: calc(100% - 100px);
                          overflow-y: auto;
                          padding-left: 1.75rem;
                          padding-right: 1rem;
                          margin-right: 0.75rem;
                        "
                      >
                        <div
                          v-for="(item, index) in form.productStatusRecordList"
                          :key="index"
                          class="mb-5"
                        >
                          <div class="badge mb-2" :class="stateClassMap[item?.statusName]">
                            {{ item?.statusName }}
                          </div>
                          <div>{{ item?.updateTime }}</div>
                          <div>{{ item?.updateByName }}</div>
                        </div>
                      </div>
                      <div v-else class="text-center text-gray-600">-- 暂无记录 --</div>
                    </div>
                    <template #reference>
                      <a>
                        <span class="fs-8 text-gray-800 text-decoration-underline cursor-pointer">
                          状态记录
                        </span>
                      </a>
                    </template>
                  </el-popover>
                </div>
              </template>
              <div class="mw-800px px-7">
                <el-form-item label="产品分类：" prop="categoryCode">
                  <span>{{ categoryName ? categoryName.join(' / ') : '' }}</span>
                </el-form-item>
                <el-form-item label="产品SPU：" prop="productSpu">
                  <span>{{ form?.productSpu }}</span>
                </el-form-item>
                <el-form-item label="产品中文名：" prop="name">{{ form.name }}</el-form-item>
                <el-form-item label="产品英文名：" prop="nameEn">
                  {{ form.nameEn }}
                </el-form-item>
                <el-form-item label="建议销售价：">
                  <div class="w-100 d-flex gap-2">
                    <span>{{ form.suggestSellPrice }}</span>
                    <span class="text-gray-600">{{ form.currencyCode }}</span>
                  </div>
                </el-form-item>
              </div>
            </KeenCard>
            <div id="attrInfo">
              <KeenCard title="属性信息">
                <template #operation>
                  <div v-if="isAudit" class="d-flex align-items-center text-success fw-bold">
                    <i class="ki-duotone ki-information fs-1 me-1">
                      <i class="path1"></i>
                      <i class="path2"></i>
                      <i class="path3"></i>
                    </i>
                    采购或报关/清关信息正在审批中，暂不能修改。
                  </div>
                </template>
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
                          <span
                            class="me-3"
                            v-if="index !== scope.row.attrValueCodeList.length - 1"
                          >
                            ,
                          </span>
                        </span>
                      </div>
                    </template>
                  </el-table-column>
                </el-table>
              </KeenCard>
            </div>
          </el-tab-pane>
          <el-tab-pane label="规格信息" :name="1" lazy>
            <SpecificationsInfo
              ref="specificationsInfoFormRef"
              v-model:productSpecList="form.productSpecList"
              :disabled="isDetail"
            />
          </el-tab-pane>
          <el-tab-pane label="供应商信息" :name="2" lazy>
            <PurchaseInfo
              ref="purchaseInfoFormRef"
              v-model:productPurchaseList="form.productPurchaseList"
              :create-by="form.createBy"
              :disabled="form.purchaseApproveStatus === 1 || !form.createBy"
            >
              <template #tips>
                <div
                  v-if="form.purchaseApproveStatus === 1"
                  class="d-flex align-items-center text-success fw-bold mb-3"
                >
                  <i class="ki-duotone ki-information fs-1 me-1">
                    <i class="path1"></i>
                    <i class="path2"></i>
                    <i class="path3"></i>
                  </i>
                  供应商信息正在审批中，暂不能修改。
                  <el-button
                    type="text"
                    size="small"
                    @click="toWorkflowDetail(form.purchaseWorkflowCode)"
                    class="p-0 h-20px"
                  >
                    # {{ form.purchaseWorkflowCode }}
                  </el-button>
                </div>
                <div v-if="!form.createBy" class="w-100 d-flex align-items-center text-danger">
                  <span>请先选择产品经理</span>
                </div>
              </template>
            </PurchaseInfo>
          </el-tab-pane>
          <el-tab-pane label="报关/清关信息" :name="3" lazy>
            <DeclareInfo
              ref="declareInfoFormRef"
              v-model:productDeclareList="form.productDeclareList"
              :disabled="form.declareApproveStatus === 1 || isDetail"
            />
            <!--            </KeenCard>-->
          </el-tab-pane>
        </el-tabs>
      </template>
    </KeenFlex>
    <div v-show="tabCurrent === 0">
      <div id="skuInfo">
        <KeenCard title="SKU信息">
          <template #operation>
            <el-radio-group v-model="sortType" size="small" @change="sortByStatus">
              <el-radio-button :label="0">所有</el-radio-button>
              <el-radio-button :label="1">未上架</el-radio-button>
              <el-radio-button :label="2">在销售</el-radio-button>
              <el-radio-button :label="3">清仓中</el-radio-button>
              <el-radio-button :label="4">已退市</el-radio-button>
            </el-radio-group>
          </template>
          <el-table :data="form.skuList.filter((item) => item.activeFlag)">
            <el-table-column label="属性信息" align="center">
              <template #default="scope">
                <div v-if="Array.isArray(scope.row.attrvalueList)" class="mb-7 w-100">
                  <div
                    v-if="scope.row.attrvalueList.length > 1"
                    class="d-flex flex-center flex-wrap"
                  >
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
                <el-form-item
                  label-width="0"
                  :prop="'skuList.' + scope.$index + '.skuCode'"
                  :rules="rules.skuCode"
                  class="pe-6"
                >
                  <span>{{ scope.row?.skuCode }}</span>
                </el-form-item>
                <span class="badge" :class="productStatusMap[scope.row.state]?.className">
                  {{ productStatusMap[scope.row.state]?.desc ?? '' }}
                </span>
              </template>
            </el-table-column>
            <el-table-column label="产品SKU名称" min-width="180">
              <template #default="scope">
                <div class="pe-6 mw-550px">
                  <el-form-item
                    label-width="0"
                    :prop="'skuList.' + scope.$index + '.productTitle'"
                    :rules="rules.productTitle"
                  >
                    {{ scope.row.productTitle }}
                  </el-form-item>
                  <el-form-item
                    label-width="0"
                    :prop="'skuList.' + scope.$index + '.productTitleEn'"
                    :rules="rules.productTitleEn"
                  >
                    {{ scope.row.productTitleEn }}
                  </el-form-item>
                </div>
              </template>
            </el-table-column>
            <el-table-column label="SKU图片" min-width="230">
              <template #default="scope">
                <div class="d-flex flex-wrap align-items-center gap-10 p-5">
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
          </el-table>

          <el-divider v-if="invalidSkuList?.length > 0">
            <div
              class="d-flex flex-center cursor-pointer text-gray-600"
              @click="hideFlag = !hideFlag"
            >
              <span>{{ hideFlag ? '展开' : '收起' }}废弃SKU</span>
              <svgIcon v-if="hideFlag" icon="arrows-arr072" class="svg-icon svg-icon-1" />
              <svgIcon v-else icon="arrows-arr073" class="svg-icon svg-icon-1" />
            </div>
          </el-divider>
          <div v-show="!hideFlag && invalidSkuList?.length > 0">
            <el-table :data="invalidSkuList" :show-header="false">
              <el-table-column label="属性信息" align="center">
                <template #default="scope">
                  <div v-if="Array.isArray(scope.row.attrvalueList)" class="mb-7 w-100">
                    <div
                      v-if="scope.row.attrvalueList.length > 1"
                      class="d-flex flex-center flex-wrap"
                    >
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
              <el-table-column label="操作" min-width="30">
                <template #default="scope">
                  <el-link
                    type="primary"
                    :underline="false"
                    @click="launchSku(scope.row, scope.$index)"
                  >
                    启用
                  </el-link>
                </template>
              </el-table-column>
            </el-table>
          </div>
        </KeenCard>
      </div>
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
          <el-form-item label="产品品线：">
            <span>{{ form.productLineName }}</span>
          </el-form-item>
          <el-form-item label="产品标签：">
            <span v-for="(item, index) in form.tagCodeList" :key="item">
              <span class="me-3">
                {{ tagOptions?.find((x) => x.tagCode === item)?.tagName }}
              </span>
              <span class="me-3" v-if="index !== form.tagCodeList.length - 1">,</span>
            </span>
          </el-form-item>
        </el-form>
      </KeenCard>
    </div>
  </el-form>
</template>

<script setup lang="ts">
  import type { FormInstance, FormRules } from 'element-plus';
  import { ProductApi, productApi } from '@/api';
  import * as swal from '@/utils/swal';
  import { priceRuleFixed4 } from '@/utils/rulesRegExp';
  import { ElMessage } from 'element-plus';
  import { cloneDeep, omit } from 'lodash-es';
  import SpecificationsInfo from './components/specificationsInfo.vue';
  import PurchaseInfo from './components/purchaseInfo.vue';
  import DeclareInfo from './components/declareInfo.vue';

  const hideFlag = ref<boolean>(true);

  const approveStatusMap = {
    0: 'badge-light-info',
    1: 'badge-light-warning',
    2: 'badge-light-success',
    3: 'badge-light-danger',
  };

  const stateClassMap = {
    开发中: 'badge-light-primary',
    可销售: 'badge-light-success',
    待上架: 'badge-light-info',
    已下架: 'badge-light-danger',
  };

  const productStatusMap = {
    null: { desc: '未知', className: 'badge-light-info' },
    1: { desc: '未上架', className: 'badge-light-primary' },
    2: { desc: '在销售', className: 'badge-light-success' },
    3: { desc: '清仓中', className: 'badge-light-warning' },
    4: { desc: '已退市', className: 'badge-light-danger' },
  };

  const route = useRoute();
  const router = useRouter();
  const query = route.query || {};
  // const productSpu = query?.code as string;
  const offsetWidth = ref<number>(document.body.offsetWidth);
  window.onresize = () => {
    return (() => {
      offsetWidth.value = document.body.offsetWidth;
    })();
  };
  const skuImageSize = computed(() => {
    return offsetWidth.value > 975 ? offsetWidth.value / 20 : offsetWidth.value / 15;
  });

  const labelPosition = computed(() => {
    return offsetWidth.value > 1250 ? 'left' : 'top';
  });

  const invalidSkuList = computed(() => {
    return form.skuList?.filter((item) => !item.activeFlag) || [];
  });

  const sortType = ref<number>(0);
  const showCancel = ref<boolean>(true);
  const tabCurrent = ref(0);
  // 表单定义
  const formRef = ref<FormInstance>();
  const specificationsInfoFormRef = ref<FormInstance>();
  const productLevelFormRef = ref<FormInstance>();
  const purchaseInfoFormRef = ref<FormInstance>();
  const declareInfoFormRef = ref<FormInstance>();
  const form = reactive<ProductApi.LuteosProductSaveProduct.RequestBody>({
    /** 品牌编码 */
    brandCode: '',
    brandName: '',
    /** 五级分类编码 */
    categoryCode: [],
    /** 归属人编码 */
    createBy: '',
    createByName: '',
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
  });
  const rules = reactive<FormRules>({
    productSpu: [
      {
        required: true,
        message: '请输入产品SPU',
        trigger: ['blur', 'change'],
      },
    ],
    name: [
      {
        required: true,
        message: '请输入产品中文名',
        trigger: ['blur'],
      },
    ],
    nameEn: [
      {
        required: true,
        message: '请输入产品英文名',
        trigger: ['blur'],
      },
    ],
    suggestSellPrice: [
      {
        required: true,
        message: '请输入建议销售价',
        trigger: ['blur', 'change'],
      },
      {
        pattern: priceRuleFixed4,
        message: '请输入数字',
      },
    ],
    currencyCode: [
      {
        required: true,
        message: '请选择币种',
        trigger: ['blur', 'change'],
      },
    ],
    categoryCode: [
      {
        required: true,
        message: '请选择产品分类',
        trigger: ['blur', 'change'],
      },
    ],
    attrCode: [
      {
        required: true,
        message: '请选择属性',
        trigger: ['blur', 'change'],
      },
    ],
    attrValueCodeList: [
      {
        required: true,
        message: '至少选择一个属性值',
        trigger: ['blur', 'change'],
      },
    ],
    skuCode: [
      {
        required: true,
        message: '请输入产品SKU',
        trigger: ['blur'],
      },
    ],
    productTitle: [
      {
        required: true,
        message: '请输入SKU中文名称',
        trigger: ['blur'],
      },
    ],
    productTitleEn: [
      {
        required: true,
        message: '请输入SKU英文名称',
        trigger: ['blur'],
      },
    ],
    suggestPrice: [
      {
        required: true,
        pattern: priceRuleFixed4,
        message: '请输入数字',
        trigger: ['blur'],
      },
    ],
    suggestPriceCurrencyCode: [
      {
        required: true,
        message: '请选择币种',
        trigger: ['blur'],
      },
    ],
    createBy: [
      {
        required: true,
        message: '请选择产品经理',
        trigger: ['blur', 'change'],
      },
    ],
    productType: [
      {
        required: true,
        message: '请选择产品类型',
        trigger: ['blur', 'change'],
      },
    ],
  });

  const isDetail = computed(() => {
    return route.fullPath.includes('detail');
  });
  // 审批中不允许修改
  const isAudit = computed(() => {
    return form.purchaseApproveStatus === 1 || form.declareApproveStatus === 1;
  });

  const sqlSkuMap = {};
  let sqlSkuList = [];
  const categoryName = reactive<string[]>([]);
  // 获取产品详情信息
  const getDetailInfo = async (code) => {
    const res = await productApi.luteosProductQueryDetail({
      productSpu: code,
      operationType: isDetail.value ? 'detail' : 'update',
    });
    Object.keys(form).forEach((key) => {
      form[key] = res[key] ?? form[key];
    });
    sqlSkuList = cloneDeep(res?.skuList) || [];
    console.log('sqlSkuList', sqlSkuList);
    form.categoryCode = [];
    let parent = res?.productCategory;
    for (let i = 1; i <= 5; i += 1) {
      form.categoryCode.push(parent?.categoryCode);
      categoryName.push(parent?.categoryName);
      parent = parent?.productCategory;
    }
    getProductAttrList(form.categoryCode[form.categoryCode.length - 1]);
    // handleChange(form.categoryCode[form.categoryCode.length - 1]);
    if (!form.currencyCode) form.currencyCode = 'CNY';
    if (form.skuList.length > 0) {
      form.skuList = form.skuList.sort((a, b) => (!a.activeFlag ? 1 : -1));
      form.skuList.forEach((item) => {
        if (item.attrvalueList) {
          sqlSkuMap[
            JSON.stringify(
              item.attrvalueList?.sort((a, b) => (a.attrValueCode > b.attrValueCode ? 1 : -1))
            )
          ] = item.skuCode;
        }
      });
      console.log('form.skuList', form.skuList);
      // 兼容旧数据
      if (!form.productPurchaseList || form.productPurchaseList.length === 0) {
        form.productPurchaseList = [];
        form.skuList.forEach((item) => {
          form.productPurchaseList.push({ skuCode: item.skuCode, purchaseCurrencyCode: 'CNY' });
        });
      }
      if (!form.productDeclareList || form.productDeclareList.length === 0) {
        form.productDeclareList = [];
        form.skuList.forEach((item) => {
          form.productDeclareList.push({ skuCode: item.skuCode });
        });
      }
      if (!form.productSpecList || form.productSpecList.length === 0) {
        form.productSpecList = [];
        form.skuList.forEach((item) => {
          form.productSpecList.push({ skuCode: item.skuCode });
        });
      }
      console.log('form.productPurchaseList', form.productPurchaseList);
    }
  };

  getDetailInfo(query.code);

  /* watchEffect(() => {
if (productSpu) {
getDetailInfo(productSpu);
}
}); */

  // 添加属性按钮禁用
  const disabled = computed(() => {
    return (
      form?.attrList.length === productAttrList.value.length && productAttrList.value.length > 0
    );
  });

  // 属性下拉框禁用选项
  const isDisable = (code) => {
    const res = form.attrList.find((item) => {
      return item.attrCode === code;
    });
    return !!res;
  };

  const toAddAttrFlag = ref<boolean>(false);
  // 添加属性
  const addAttr = async () => {
    if (toAddAttrFlag.value === true) {
      await getProductAttrList(form.categoryCode[form.categoryCode.length - 1]);
      toAddAttrFlag.value = false;
    }
    if (productAttrList.value.length === 0) {
      // 未添加属性、先去添加
      const isConfirmed = await swal.confirm({
        title: '产品分类尚未关联属性',
        confirmButtonText: '去添加',
        cancelButtonText: '知道了',
        customClass: {
          confirmButton: 'btn btn-success',
          cancelButton: 'btn btn-active-light',
        },
      });
      if (isConfirmed) {
        toAddAttrFlag.value = true;
        router.push(`/categorylist/detail?code=${form.categoryCode[form.categoryCode.length - 1]}`);
      }
    } else {
      form.attrList.push({
        attrCode: '',
        attrName: '',
        attrValueCodeList: [],
      });
    }
  };

  // 删除属性
  const deleteAttr = (index) => {
    if (isAudit.value) return;
    form.attrList.splice(index, 1);
    setSkuList();
  };

  const attrCodeChange = (index) => {
    form.attrList[index].attrValueCodeList = [];
    setSkuList();
  };

  const skuUpdateFlag = ref<boolean>(false);
  const setSkuList = () => {
    // 旧产品
    if (form.attrList.length === 0) {
      skuUpdateFlag.value = true;
      return;
    }
    const oldSkuList = form.skuList;
    const skuList = form.state === 1 || form.state === 2 ? cloneDeep(sqlSkuList) : [];
    const list = form.attrList.filter((item) => {
      return !!item.attrCode;
    });
    console.log('list', list);
    // 只选了一个属性
    if (list.length === 1) {
      console.log('只选了一个属性');
      list[0].attrValueCodeList.forEach((item) => {
        const attrvalueList = [
          {
            attrValueCode: item,
            attrValueName: getAttrValueName(list[0].attrCode, item),
          },
        ];
        if (
          !Object.keys(sqlSkuMap)?.includes(
            JSON.stringify(
              attrvalueList?.sort((a, b) => (a.attrValueCode > b.attrValueCode ? 1 : -1))
            )
          ) ||
          ![1, 2].includes(form.state)
        ) {
          skuList.unshift({
            activeFlag: true,
            attrValuecodeList: [item],
            attrvalueList,
            skuCode:
              sqlSkuMap[
                JSON.stringify(
                  attrvalueList?.sort((a, b) => (a.attrValueCode > b.attrValueCode ? 1 : -1))
                )
              ] || '',
            productImageList: [],
            state: 1,
          });
        }
      });
    } else {
      const attrValueCodeList = getCombination(list);
      console.log('attrValueCodeList', attrValueCodeList);
      attrValueCodeList.forEach((item) => {
        const attrvalueList = [];
        for (let i = 0; i < item.length; i += 1) {
          attrvalueList.push({
            attrValueCode: item[i],
            attrValueName: getAttrValueName(list[i].attrCode, item[i]),
          });
        }
        if (
          !Object.keys(sqlSkuMap)?.includes(
            JSON.stringify(
              attrvalueList?.sort((a, b) => (a.attrValueCode > b.attrValueCode ? 1 : -1))
            )
          ) ||
          ![1, 2].includes(form.state)
        ) {
          skuList.unshift({
            activeFlag: true,
            attrValuecodeList: item,
            attrvalueList,
            skuCode:
              sqlSkuMap[
                JSON.stringify(
                  attrvalueList?.sort((a, b) => (a.attrValueCode > b.attrValueCode ? 1 : -1))
                )
              ] || '',
            productImageList: [],
            state: 1,
          });
        }
      });
    }
    console.log('oldlist', oldSkuList);
    console.log('skulist', skuList);
    // 遍历旧列表回显数据
    skuList.forEach((item) => {
      const same = oldSkuList.find((old) => {
        console.log(item.attrvalueList, old.attrvalueList);
        return (
          (old.skuCode && item.skuCode === old.skuCode) ||
          (old.attrvalueList &&
            JSON.stringify(
              item.attrvalueList?.sort((a, b) => (a.attrValueCode > b.attrValueCode ? 1 : -1))
            ) ===
              JSON.stringify(
                old.attrvalueList?.sort((a, b) => (a.attrValueCode > b.attrValueCode ? 1 : -1))
              ))
        );
      });
      if (same) {
        Object.keys(same).forEach((key) => {
          item[key] = same[key];
        });
      }
    });
    skuUpdateFlag.value = true;
    form.skuList = skuList.sort((a, b) => (!b.activeFlag ? -1 : 1));
  };

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

  const getCombination = (array) => {
    let resultArr = [];
    array.forEach((arrItem) => {
      if (resultArr.length === 0) {
        resultArr = arrItem.attrValueCodeList;
      } else {
        const emptyArray = [];
        resultArr.forEach((item) => {
          arrItem.attrValueCodeList.forEach((value) => {
            emptyArray.push([item, value].flat());
          });
        });
        resultArr = emptyArray;
      }
    });
    return resultArr;
  };

  const getAttrValueName = (attrCode, attrValueCode) => {
    return attrMap[attrCode]?.find((item) => {
      return item.attrValueCode === attrValueCode;
    })?.attrValueName;
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
      selected: false,
      valid: false,
    },
    3: {
      selected: false,
      valid: false,
    },
  };
  const tabChange = (name) => {
    tabsStatusMap[name].selected = true;
  };

  const scrollToRef = async (id) => {
    tabCurrent.value = 0;
    await nextTick();
    const info = document.getElementById(id);
    const { offsetTop } = info;
    document.documentElement.scrollTop =
      offsetTop > 0 ? offsetTop - 100 : id === 'attrInfo' ? 388 : 809;
    info.classList.add('active');
    setTimeout(() => {
      info.classList.remove('active');
    }, 1000);
    ElMessage.warning('请先完善sku信息');
  };

  const beforeLeave = async (to, from) => {
    if ([0].includes(from) && [1, 2, 3].includes(to)) {
      try {
        const validSome = [];
        if (form.skuList.length > 0) {
          for (let i = 0; i < form.skuList.length; i += 1) {
            validSome.push(`skuList.${i}.skuCode`);
          }
          await formRef.value.validateField(validSome, (val) => {
            if (!val) throw new Error('skuInfo');
          });
        } else if (form.attrList.length === 0) throw new Error('attrInfo');
        else {
          for (let i = 0; i < form.attrList.length; i += 1) {
            validSome.push(`attrList.${i}.attrCode`);
            validSome.push(`attrList.${i}.attrValueCodeList`);
          }
          await formRef.value.validateField(validSome, (val) => {
            if (!val) throw new Error('attrInfo');
          });
        }
      } catch (e) {
        scrollToRef(e.message);
        return false;
      }
    }
    if (to === 1) {
      setProductSpecList();
    }
    if (to === 2) {
      setProductPurchaseList();
      console.log(form.productPurchaseList);
    }
    if (to === 3) {
      setProductDeclareList();
      console.log(form.productDeclareList);
    }
    return true;
  };

  const setProductPurchaseList = () => {
    const oldList = form.productPurchaseList;
    form.productPurchaseList = form.skuList
      // .filter((item) => item.activeFlag)
      .map((item) => {
        return { skuCode: item.skuCode, purchaseCurrencyCode: 'CNY', activeFlag: item.activeFlag };
      });
    // 遍历旧列表回显数据
    form.productPurchaseList.forEach((item) => {
      const same = oldList.find((old) => {
        return old.skuCode === item.skuCode;
      });
      if (same) {
        Object.keys(same).forEach((key) => {
          if (key !== 'activeFlag') item[key] = same[key];
        });
      }
    });
  };

  const setProductSpecList = () => {
    const oldList = form.productSpecList;
    form.productSpecList = form.skuList
      // .filter((item) => item.activeFlag)
      .map((item) => {
        return { skuCode: item.skuCode, activeFlag: item.activeFlag };
      });
    // 遍历旧列表回显数据
    form.productSpecList.forEach((item) => {
      const same = oldList.find((old) => {
        return old.skuCode === item.skuCode;
      });
      if (same) {
        Object.keys(same).forEach((key) => {
          if (key !== 'activeFlag') item[key] = same[key];
        });
      }
    });
  };
  const setProductDeclareList = () => {
    const oldList = form.productDeclareList;
    console.log('oldList', oldList);
    form.productDeclareList = form.skuList
      // .filter((item) => item.activeFlag)
      .map((item) => {
        return { skuCode: item.skuCode, activeFlag: item.activeFlag };
      });
    // 遍历旧列表回显数据
    form.productDeclareList.forEach((item) => {
      const same = oldList.find((old) => {
        return old.skuCode === item.skuCode;
      });
      if (same) {
        Object.keys(same).forEach((key) => {
          if (key !== 'activeFlag') item[key] = same[key];
        });
      }
    });
    console.log('oldList', oldList);
    console.log('form.productDeclareList', form.productDeclareList);
  };

  const saveLoading = ref<boolean>(false);

  const checkItem = async (tab) => {
    console.log('tab', tab);
    try {
      if (tab === 0) {
        await formRef.value?.validate().catch(() => {
          return false; // 校验失败返回 false，不继续执行
        });
      }
      if (tab === 1) {
        form.productSpecList.forEach((sku) => {
          ['productWeight', 'productLength', 'productWidth', 'productHeight'].forEach((item) => {
            if (!priceRuleFixed4.exec(sku[item])) {
              throw new Error('error');
            }
          });
          ['productNetWeight', 'productNetLength', 'productNetWidth', 'productNetHeight'].forEach(
            (item) => {
              if (sku[item] && !priceRuleFixed4.exec(sku[item])) {
                throw new Error('error');
              }
            }
          );
        });
      } else if (tab === 2) {
        form.productPurchaseList.forEach((item) => {
          if (
            item.activeFlag &&
            (!item.supplierCode ||
              !item.purchaseCurrencyCode ||
              !priceRuleFixed4.exec(item.purchasePrice) ||
              !item.purchaseCurrencyCode)
          ) {
            throw new Error('error');
          }
        });
      } else if (tab === 3) {
        form.productDeclareList.forEach((item) => {
          console.log('item.sensitiveTypeCodeList', item.sensitiveTypeCodeList);
          if (
            item.activeFlag &&
            (!priceRuleFixed4.exec(item.declarePrice) ||
              !item.declareName ||
              !item.declareNameEn ||
              !item.sensitiveTypeCodeList ||
              item.sensitiveTypeCodeList.length === 0)
          ) {
            throw new Error('error');
          }
        });
      }
    } catch (e) {
      return false;
    }
    return true;
  };

  const checkForm = async (operateType) => {
    setProductSpecList();
    setProductPurchaseList();
    setProductDeclareList();
    if (operateType === 1) {
      // 保存草稿只需校验产品SPU和产品分类字段
      // TODO 修改保存草稿校验
      const validSome = [
        'productSpu',
        'categoryCode',
        // 'attrList.0.attrCode',
        // 'attrList.0.attrValueCodeList',
        // 'skuList.0.skuCode',
      ];
      formRef.value.validateField(validSome, (val) => {
        if (val) handleSaveSubmit(operateType);
        else {
          tabCurrent.value = 0;
          if (!form.attrList[0].attrCode) {
            nextTick(() => {
              formRef.value.scrollToField('attrList.0.attrCode');
            });
          } else if (!form.attrList[0].attrValueCodeList) {
            nextTick(() => {
              formRef.value.scrollToField('attrList.0.attrValueCodeList');
            });
          } else if (!form.skuList[0].skuCode) {
            nextTick(() => {
              formRef.value.scrollToField('skuList.0.skuCode');
            });
          }
        }
      });
    } else {
      // 先判断当前选项卡是否通过校验
      switch (tabCurrent.value) {
        case 0:
          tabsStatusMap[tabCurrent.value].valid =
            (form.attrList.length > 0 || form.skuList.length > 0) &&
            (await formRef.value?.validate().catch(() => false));
          break;
        case 1: {
          tabsStatusMap[tabCurrent.value].valid =
            await specificationsInfoFormRef.value.formRef.validate();
          break;
        }
        case 2:
          tabsStatusMap[tabCurrent.value].valid =
            await purchaseInfoFormRef.value.formRef.validate();
          break;
        case 3:
          tabsStatusMap[tabCurrent.value].valid = await declareInfoFormRef.value.formRef.validate();
          break;
        default:
          break;
      }
      console.log('form.attrList', form.attrList);
      for (let i = 0; i <= 3; i += 1) {
        if (i === 0 && form.attrList.length === 0 && form.skuList.length === 0) {
          scrollToRef('attrInfo');
          return;
        }
        // 校验尚未被点击过的选项卡
        if (!tabsStatusMap[i].valid) {
          if (!(await checkItem(i))) {
            tabCurrent.value = i;
            return;
          }
          tabsStatusMap[i].valid = true;
        }
      }
      console.log('校验结果', tabsStatusMap);

      handleSaveSubmit(operateType);
    }
  };
  const handleSaveSubmit = async (operateType) => {
    try {
      saveLoading.value = true;
      // setSkuList();
      form.skuList.forEach((item) => {
        if (item.productImageList.length > 0) {
          item.productImageUrl = item.productImageList[0];
        }
        if (item.attrvalueList && item.attrvalueList.length > 0) {
          const attrValuecodeList = [];
          item.attrvalueList.forEach((item) => {
            attrValuecodeList.push(item.attrValueCode);
          });
          item.attrValuecodeList = attrValuecodeList;
        }
      });
      const data = {
        ...form,
        operateType,
        categoryCode: form.categoryCode[4],
        skuUpdateFlag: true,
      };
      if (specificationsInfoFormRef.value) {
        /* data.productSpec = {
...specificationsInfoFormRef.value.form,
...productLevelFormRef.value.form,
}; */
        data.productSpec = specificationsInfoFormRef.value.form;
      }
      /* if (purchaseInfoFormRef.value) {
data.productPurchaseList = purchaseInfoFormRef.value.productPurchaseList;
}
if (declareInfoFormRef.value) {
data.productDeclareList = declareInfoFormRef.value.productDeclareList;
} */
      console.log('data', data);
      const res = await productApi.luteosProductSaveProduct(omit(data, ['invalidSkuList']));
      swal.success(operateType === 1 ? '保存成功' : '提交成功');
      getDetailInfo(res?.productSpu || form.productSpu);
    } catch (e) {
      console.log(e);
    } finally {
      saveLoading.value = false;
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

  const getChildOperatorOptions = () => {
    if (purchaseInfoFormRef.value) {
      purchaseInfoFormRef.value.getOperatorOptions();
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
  const handleChange = (val) => {
    if (val.categoryCode) {
      getProductAttrList(val.categoryCode);
      form.attrList = [];
      form.skuList = [];
      addAttr();
    }
  };

  const handleCancel = async () => {
    const isConfirmed = await swal.cancelConfirm();
    if (!isConfirmed) return;

    window.close();
  };

  // 校验输入的spu、产品SKU是否已存在
  const isExist = async (e, productType) => {
    console.log(e.target.value);
    if (e.target.value) {
      try {
        await productApi.luteosProductCheckRepeatProduct({
          productType,
          recordCode: e.target.value,
        });
        // eslint-disable-next-line no-shadow
      } catch (error) {
        e.target.value = '';
      }
    }
  };
  // 废弃sku
  const quitSku = async (row, index) => {
    const isConfirmed = await swal.confirm('确定废弃吗');
    if (isConfirmed) {
      row.activeFlag = false;
      // 数据移动到最后
      form.skuList.push(...form.skuList.splice(index, 1));
      hideFlag.value = false;
      form.skuList
        .filter((item) => item.activeFlag)
        .forEach((_, idx) => {
          formRef.value.clearValidate(`skuList.${idx}.skuCode`);
          formRef.value.clearValidate(`skuList.${idx}.productTitle`);
          formRef.value.clearValidate(`skuList.${idx}.productTitleEn`);
          formRef.value.clearValidate(`skuList.${idx}.suggestPrice`);
          formRef.value.clearValidate(`skuList.${idx}.suggestPriceCurrencyCode`);
        });
    }
  };

  // 启用sku
  const launchSku = async (row, index) => {
    // console.log('index', index);
    const isConfirmed = await swal.confirm('确定启用吗');
    if (isConfirmed) {
      row.activeFlag = true;
      // 数据移动到最前
      form.skuList.unshift(
        ...form.skuList.splice(form.skuList.filter((item) => item.activeFlag).length - 1 + index, 1)
      );
      form.skuList
        .filter((item) => item.activeFlag)
        .forEach((_, idx) => {
          formRef.value.clearValidate(`skuList.${idx}.skuCode`);
          formRef.value.clearValidate(`skuList.${idx}.productTitle`);
          formRef.value.clearValidate(`skuList.${idx}.productTitleEn`);
          formRef.value.clearValidate(`skuList.${idx}.suggestPrice`);
          formRef.value.clearValidate(`skuList.${idx}.suggestPriceCurrencyCode`);
        });
      // formRef.value
      console.log('skuList', form.skuList);
    }
  };

  // 监听路由变化
  /* watch(
() => router.currentRoute.value.path,
() => {
query = router.currentRoute.value.query;
if (!query.code) {
resetForm();
tabCurrent.value = 0;
} else {
getDetailInfo(query.code);
}
showCancel.value = !!query.code;
},
{ immediate: true, deep: true }
); */

  const toWorkflowDetail = (code) => {
    router.push(`/workorderlist/detail?code=${code}&type=1`);
  };

  onUnmounted(() => {
    if (sessionStorage.getItem('goodsSearchInfo')) sessionStorage.removeItem('goodsSearchInfo');
  });

  const goBack = () => {
    console.log(11111111);
    router.go(-1);
  };
</script>

<style scoped lang="scss">
  :deep(.el-tabs__content) {
    overflow: visible;
  }

  :deep(.el-cascader-menu) {
    max-width: 18vw;
  }

  :deep(.el-table__cell) {
    padding-bottom: 5px !important;
  }

  #attrInfo.active,
  #skuInfo.active {
    animation: mymove 0.5s ease;
  }

  @keyframes mymove {
    0% {
      transform: scale(1);
    }
    25% {
      transform: scale(1.01);
    }
    50% {
      transform: scale(1);
    }
    75% {
      transform: scale(1.01);
    }
    100% {
      transform: scale(1);
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
