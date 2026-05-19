<template>
  <el-form
    ref="formRef"
    :model="form"
    :rules="rules"
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
              directory="product/group"
              tooltip="更改产品图片"
            />
          </div>
        </KeenCard>
        <KeenCard title="产品类型" style="margin-bottom: 0 !important">
          <el-form-item label-width="0">
            <el-select model-value="组合" disabled class="w-100" />
          </el-form-item>
        </KeenCard>
        <KeenCard title="产品经理">
          <el-form-item prop="developLuteId" label-width="0">
            <OperatorSelect v-model="form.developLuteId" />
          </el-form-item>
        </KeenCard>
      </template>
      <template #fluid>
        <el-tabs v-model="tabCurrent">
          <el-tab-pane label="基础资料" :name="0">
            <KeenCard title="基础信息">
              <div class="mw-800px px-7">
                <el-form-item label="产品分类：" prop="categoryCode">
                  <div class="el-input is-disabled" v-if="isEdit">
                    <div class="el-input__wrapper text-truncate">
                      <div class="el-input__inner text-truncate">
                        {{ categoryName ? categoryName.join(' / ') : '' }}
                      </div>
                    </div>
                  </div>
                  <CategoryCascader
                    v-else
                    class="w-100"
                    v-model="form.categoryCode"
                    filter-flag="1"
                  />
                </el-form-item>
                <el-form-item label="产品SPU：" prop="groupProductSpu">
                  <el-input
                    v-model="form.groupProductSpu"
                    placeholder="请输入产品SPU"
                    :disabled="isEdit"
                    @blur="
                      (e) => {
                        isExist(e, 1);
                      }
                    "
                  />
                </el-form-item>
                <el-form-item label="产品中文名：" prop="name">
                  <el-input v-model="form.name" placeholder="请输入产品中文名" />
                </el-form-item>
                <el-form-item label="产品英文名：" prop="nameEn">
                  <el-input
                    v-model="form.nameEn"
                    placeholder="请输入产品英文名"
                    suffix-icon="el-icon-date"
                  />
                </el-form-item>
                <el-form-item label="建议销售价：" required>
                  <div class="w-100 d-flex gap-5">
                    <el-form-item prop="suggestSellPrice" class="w-50 flex-grow-1">
                      <el-input v-model="form.suggestSellPrice" placeholder="请输入建议销售价" />
                    </el-form-item>
                    <el-form-item prop="suggestPriceCurrencyCode">
                      <CurrencySelect v-model="form.suggestPriceCurrencyCode" />
                    </el-form-item>
                  </div>
                </el-form-item>
              </div>
            </KeenCard>
          </el-tab-pane>
        </el-tabs>
      </template>
    </KeenFlex>
    <KeenCard title="组合SKU信息">
      <el-table :data="form.groupSkuList">
        <el-table-column label="组合信息">
          <template #default="scope">
            <el-form-item v-if="Array.isArray(scope.row.skuList)" label-width="0">
              <el-row
                class="w-100 mb-1 align-items-center pe-5"
                v-for="(item, index) in scope.row.skuList"
                :key="item.skuCode"
              >
                <el-col :span="4">
                  <button
                    type="button"
                    data-repeater-delete=""
                    class="btn btn-sm btn-icon btn-light-danger w-25px h-25px"
                    @click="removeSku(scope.$index, index)"
                  >
                    <span class="svg-icon svg-icon-3">
                      <SvgIcon icon="remove" />
                    </span>
                  </button>
                </el-col>
                <el-col :span="14" style="text-align: left">
                  <span>{{ item?.skuCode }}</span>
                </el-col>
                <el-col :span="6">
                  <NumberInput v-model="item.qty" placeholder="请输入数量" :precision="0" />
                </el-col>
              </el-row>
            </el-form-item>
            <el-button
              type="primary"
              size="small"
              plain
              @click="addSku(scope.row.skuList, scope.$index)"
            >
              添加SKU
            </el-button>
            <el-form-item
              label-width="0"
              :prop="'groupSkuList[' + scope.$index + '].skuList'"
              :rules="rules.skuList"
            />
          </template>
        </el-table-column>
        <el-table-column label="组合产品SKU">
          <template #default="scope">
            <el-form-item
              label-width="0"
              :prop="'groupSkuList.' + scope.$index + '.groupSkuCode'"
              :rules="rules.groupSkuCode"
              class="pe-6"
            >
              <el-input
                v-model="scope.row.groupSkuCode"
                placeholder="请输入产品SKU"
                clearable
                :disabled="!scope.row.isNew"
                @blur="
                  (e) => {
                    isExist(e, 2);
                  }
                "
              />
            </el-form-item>
          </template>
        </el-table-column>
        <el-table-column label="SKU名称">
          <template #default="scope">
            <div class="pe-6 mw-550px">
              <el-form-item
                label-width="0"
                :prop="'groupSkuList.' + scope.$index + '.name'"
                :rules="rules.name"
              >
                <el-input v-model="scope.row.name" placeholder="请输入中文名称" clearable />
              </el-form-item>
              <el-form-item
                label-width="0"
                :prop="'groupSkuList.' + scope.$index + '.nameEn'"
                :rules="rules.nameEn"
              >
                <el-input v-model="scope.row.nameEn" placeholder="请输入英文名称" clearable />
              </el-form-item>
            </div>
          </template>
        </el-table-column>
        <el-table-column label="组合SKU图片" min-width="50">
          <template #default="scope">
            <div class="d-flex flex-wrap align-items-center gap-10 p-5">
              <KeenImageUpload
                v-model="scope.row.productImageUrl"
                directory="product/group"
                tooltip="更改产品图片"
                :size="skuImageSize"
              />
            </div>
          </template>
        </el-table-column>
        <el-table-column label="建议销售价">
          <template #default="scope">
            <el-form-item
              label-width="0"
              :prop="'groupSkuList.' + scope.$index + '.suggestPrice'"
              :rules="rules.suggestPrice"
            >
              <el-input v-model="scope.row.suggestPrice" placeholder="请输入" clearable />
            </el-form-item>
            <el-form-item
              label-width="0"
              :prop="'groupSkuList.' + scope.$index + '.suggestPriceCurrencyCode'"
              :rules="rules.suggestPriceCurrencyCode"
            >
              <CurrencySelect v-model="scope.row.suggestPriceCurrencyCode" class="w-100" />
            </el-form-item>
          </template>
        </el-table-column>
        <el-table-column label="操作" min-width="20" align="right">
          <template #default="scope">
            <el-link type="danger" :underline="false" @click="del(scope.row, scope.$index)">
              删除
            </el-link>
          </template>
        </el-table-column>
      </el-table>

      <el-divider border-style="dotted" />
      <div class="d-flex flex-center flex-wrap">
        <el-button plain type="primary" @click="addGroup" size="small">新增组合SKU</el-button>
      </div>
    </KeenCard>
    <KeenCard title="其他信息">
      <el-form label-width="150" class="mw-600px px-7" label-position="left">
        <el-form-item label="品牌：" v-if="form.brandName">
          <span>{{ form?.brandName }}</span>
        </el-form-item>
        <el-form-item label="系列：">
          <el-select
            v-model="form.seriesCodeList"
            placeholder="请选择系列"
            clearable
            filterable
            multiple
            class="w-100"
          >
            <el-option
              v-for="item in seriesOptions.value"
              :key="item.seriesCode"
              :label="item.seriesName || ''"
              :value="item.seriesCode!"
            />
          </el-select>
        </el-form-item>
        <el-form-item label="型号：">
          <el-select
            v-model="form.modelCodeList"
            placeholder="请选择型号"
            clearable
            filterable
            multiple
            class="w-100"
          >
            <el-option
              v-for="item in modelOptions.value"
              :key="item.modelCode"
              :label="item.modelName || ''"
              :value="item.modelCode!"
            />
          </el-select>
        </el-form-item>
        <el-form-item label="产品标签：">
          <el-select
            v-model="form.tagCodeList"
            placeholder="请选择标签"
            clearable
            filterable
            multiple
            class="w-100"
          >
            <el-option
              v-for="item in tagOptions.value"
              :key="item.tagCode"
              :label="item.tagName || ''"
              :value="item.tagCode!"
            />
          </el-select>
        </el-form-item>
      </el-form>
    </KeenCard>
  </el-form>

  <div class="card-footer d-flex justify-content-end py-6 px-9">
    <el-space>
      <el-button @click="handleCancel" v-if="showCancel">取消</el-button>
      <el-button type="primary" :loading="saveLoading" @click="save">保存</el-button>
    </el-space>
  </div>
  <BindSku
    :visible="visible"
    v-if="visible"
    confirm-text="确定"
    @close="handleClose"
    :selected-rows="selectedRows"
  />
</template>

<script setup lang="ts" name="productgroupAdd">
  import type { FormInstance, FormRules } from 'element-plus';
  import { productApi } from '@/api';
  import * as swal from '@/utils/swal';
  import { priceRuleFixed4 } from '@/utils/rulesRegExp';
  import { ElMessage } from 'element-plus';
  import { ProductGroupDetailResp } from '@/api/product/data-contracts';
  import BindSku from '@/views/lute-os/goodscenter/bindGoods/Modal/bindSku.vue';

  const route = useRoute();

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

  const showCancel = ref<boolean>(true);
  const tabCurrent = ref(0);
  // 表单定义
  const formRef = ref<FormInstance>();
  const form = reactive<ProductGroupDetailResp>({
    /** 品牌编码 */
    brandCode: '',
    /** 品牌名称 */
    brandName: '',
    /** 产品经理ID */
    developLuteId: '',
    /** 产品经理 */
    developLuteName: '',
    /** 组合产品SPU */
    groupProductSpu: '',
    /** 组合SKU信息 */
    groupSkuList: [],
    /**
     * 组合SPU ID
     * @format int64
     */
    id: '',
    /** 型号信息 */
    modelCodeList: [],
    /** 产品名称 */
    name: '',
    /** 产品名称英文 */
    nameEn: '',
    /** 分类信息 */
    productCategory: '',
    /** 产品图片 */
    productImage: '',
    productImageUrl: '',
    /** 系列信息 */
    seriesCodeList: [],
    /** 建议销售价币种编码 */
    suggestPriceCurrencyCode: 'CNY',
    /** 建议销售价格 */
    suggestSellPrice: '',
    /** 产品标签 */
    tagCodeList: [],
    /**
     * 产品类型
     * @format int32
     */
    type: 1,
    /** 产品类型名称 */
    typeDesc: '',
  });
  const rules = reactive<FormRules>({
    groupProductSpu: [
      {
        required: true,
        message: '请输入产品SPU',
        trigger: ['blur', 'change'],
      },
    ],
    name: [
      {
        required: true,
        message: '请输入中文名',
        trigger: ['blur'],
      },
    ],
    nameEn: [
      {
        required: true,
        message: '请输入英文名',
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
    groupSkuCode: [
      {
        required: true,
        message: '请输入组合产品SKU',
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
    developLuteId: [
      {
        required: true,
        message: '请选择产品经理',
        trigger: ['blur', 'change'],
      },
    ],
    skuList: [
      {
        required: true,
        message: '至少选择一个SKU',
        trigger: ['blur', 'change'],
      },
    ],
  });

  const isEdit = computed(() => {
    return route.fullPath.includes('edit');
  });

  const categoryName = reactive<string[]>([]);

  const groupProductSpu = route.query.code as string;
  console.log('code', groupProductSpu);

  // 获取产品详情信息
  const getDetailInfo = async () => {
    const res = await productApi.luteosProductGroupQueryGroupDetail({
      groupProductSpu,
    });
    Object.keys(form).forEach((key) => {
      form[key] = res[key] ?? form[key];
    });
    form.categoryCode = [];
    let parent = res?.productCategory;
    for (let i = 1; i <= 5; i += 1) {
      form.categoryCode.push(parent?.categoryCode);
      categoryName.push(parent?.categoryName);
      parent = parent?.productCategory;
    }

    if (!form.suggestPriceCurrencyCode) form.suggestPriceCurrencyCode = 'CNY';
  };

  if (isEdit.value) getDetailInfo(groupProductSpu);

  // 获取其他信息options
  const brandOptions = reactive([]);
  const modelOptions = reactive([]);
  const seriesOptions = reactive([]);
  const tagOptions = reactive([]);
  const getProductRelationList = async () => {
    const res = await productApi.luteosProductQueryProductRelationList();
    brandOptions.value = res.brandBeanList;
    modelOptions.value = res.modelBeanList;
    seriesOptions.value = res.seriesBeanList;
    tagOptions.value = res.tagBeanList;
  };
  getProductRelationList();

  const addGroup = () => {
    form.groupSkuList?.push({
      isNew: true,
      suggestPriceCurrencyCode: 'CNY',
    });
  };

  const visible = ref<boolean>(false);
  const selectedRows = ref<any[]>([]);
  const curIndex = ref<number>(0);
  const addSku = (row, index) => {
    visible.value = true;
    selectedRows.value = row;
    curIndex.value = index;
  };

  const oldList = ref<any[]>([]);
  const handleClose = (reload, list) => {
    if (reload) {
      oldList.value = form.groupSkuList[curIndex.value]?.skuList;
      form.groupSkuList[curIndex.value].skuList = list.map((item) => {
        return {
          skuCode: item.skuCode,
          qty: oldList.value?.find((old) => old.skuCode === item.skuCode)?.qty || 1,
        };
      });
      formRef.value.validateField([`groupSkuList[${curIndex.value}].skuList`]);
    }
    visible.value = false;
  };

  const handleCancel = async () => {
    const isConfirmed = await swal.cancelConfirm();
    if (!isConfirmed) return;

    router.back();
  };

  const router = useRouter();
  const saveLoading = ref<boolean>(false);
  const save = async () => {
    const isValid = await formRef.value?.validate().catch(() => {
      return false; // 校验失败返回 false，不继续执行
    });
    if (!isValid) return;
    if (!form.groupSkuList || form.groupSkuList.length === 0) {
      ElMessage.warning('组合SKU信息不能为空');
      return;
    }
    try {
      saveLoading.value = true;
      const res = await productApi.luteosProductGroupSaveProductGroup({
        ...form,
        categoryCode: form.categoryCode[4],
      });
      ElMessage.success('保存成功');
      if (!isEdit.value) {
        router.push({
          name: 'productgroupEdit',
          query: {
            code: res.groupProductSpu,
          },
        });
      } else {
        getDetailInfo();
      }
    } finally {
      saveLoading.value = false;
    }
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
  // 删除组合
  const del = async (row, index) => {
    const isConfirmed = await swal.confirm('确定删除吗');
    if (isConfirmed) {
      form.groupSkuList.splice(index, 1);
    }
  };

  // 删除sku
  const removeSku = async (groupIndex, index) => {
    const isConfirmed = await swal.confirm('确定删除吗');
    if (isConfirmed) {
      form.groupSkuList[groupIndex].skuList?.splice(index, 1);
      formRef.value.validateField([`groupSkuList[${groupIndex}].skuList`]);
    }
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
