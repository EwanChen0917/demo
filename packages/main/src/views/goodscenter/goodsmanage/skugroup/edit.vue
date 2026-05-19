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
        <KeenCard title="产品经理" style="margin-bottom: 0 !important">
          <el-form-item prop="developLuteId" label-width="0">
            <OperatorSelect v-model="form.developLuteId" />
          </el-form-item>
        </KeenCard>
        <KeenCard title="品牌">
          <el-select v-model="form.brandCode" placeholder="请选择品牌" filterable class="w-100">
            <el-option
              v-for="item in brandOptions.value"
              :key="item.brandCode"
              :label="item.brandDesc || ''"
              :value="item.brandCode!"
            />
          </el-select>
        </KeenCard>
      </template>
      <template #fluid>
        <el-tabs v-model="tabCurrent">
          <el-tab-pane label="基础资料" :name="0">
            <KeenCard title="基础信息">
              <div class="mw-800px px-7">
                <el-form-item label="产品分类：">
                  <div class="el-input is-disabled">
                    <div class="el-input__wrapper text-truncate">
                      <div class="el-input__inner text-truncate">
                        {{ categoryName ? categoryName.join(' / ') : '' }}
                      </div>
                    </div>
                  </div>
                </el-form-item>
                <el-form-item label="产品SPU：">
                  <el-input v-model="form.groupProductSpu" placeholder="请输入产品SPU" disabled />
                  <router-link
                    target="_blank"
                    style="position: absolute; right: 12px"
                    v-if="form.groupProductSpu"
                    :to="`/productgroup/detail?code=${form.groupProductSpu}`"
                  >
                    产品详情
                  </router-link>
                </el-form-item>
                <el-form-item label="产品SKU：">
                  <el-input v-model="form.groupSkuCode" placeholder="请输入产品SKU" disabled />
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
              </div>
            </KeenCard>
            <KeenCard title="组合信息">
              <el-table :data="form.skuItemBeanList">
                <el-table-column label="产品信息" min-width="240">
                  <template #default="{ row }">
                    <GoodsInfo :src="row.productImageUrl" :title="row.name">
                      <template #description>
                        <div class="d-flex">
                          <span style="flex: 1">{{ row.skuCode }}</span>
                          <Tag :color="colorMap[row?.state]">{{ row?.stateDesc }}</Tag>
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
                <el-table-column label="操作" min-width="60">
                  <template #default="{ row, $index }">
                    <KeenActions
                      :actions="[
                        {
                          label: '编辑',
                          key: 'edit',
                          type: 'primary',
                          hide: editIndex === $index,
                          disabled: editIndex !== -1,
                          index: $index,
                          row: row,
                        },
                        {
                          label: '删除',
                          key: 'delete',
                          type: 'danger',
                          hide: editIndex === $index,
                          disabled: editIndex !== -1,
                          index: $index,
                        },
                        {
                          label: '取消',
                          key: 'cancel',
                          hide: editIndex !== $index,
                          index: $index,
                        },
                        {
                          label: '确认',
                          key: 'confirm',
                          type: 'primary',
                          hide: editIndex !== $index,
                          index: $index,
                        },
                      ]"
                      @click="handleActions"
                    />
                  </template>
                </el-table-column>
              </el-table>
              <el-button plain type="primary" size="small" @click="visible = true">
                添加SKU
              </el-button>
            </KeenCard>
            <KeenCard title="SKU建议销售价">
              <div class="mw-800px px-7">
                <el-form-item class="group-form-item" label="建议销售价：" required>
                  <el-form-item prop="suggestPrice">
                    <NumberInput v-model="form.suggestPrice" placeholder="请输入" />
                  </el-form-item>
                  <el-form-item prop="suggestPriceCurrencyCode">
                    <CurrencySelect v-model="form.suggestPriceCurrencyCode" placeholder="币种" />
                    <!--                    <el-select v-model="form.suggestPriceCurrencyCode" placeholder="币种">
                      <el-option
                        v-for="item in dickbook.currency_list"
                        :key="item.value"
                        :label="item.desc"
                        :value="item.value"
                      />
                    </el-select>-->
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
                          <el-select v-model="row.currencyCode" placeholder="币种">
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
          </el-tab-pane>
        </el-tabs>
      </template>
    </KeenFlex>
  </el-form>
  <div class="card-footer d-flex justify-content-end py-6 px-9">
    <el-space>
      <el-button @click="handleCancel">取消</el-button>
      <el-button type="primary" :loading="saveLoading" @click="save">保存</el-button>
    </el-space>
  </div>
  <BindSku
    :visible="visible"
    v-if="visible"
    confirm-text="确定"
    @close="handleClose"
    :selected-rows="form.skuItemBeanList"
  />
</template>

<script setup lang="ts" name="skugroupEdit">
  import { ElMessage, FormInstance, FormRules } from 'element-plus';
  import { ProductGroupSkuDetailResp, ProductGroupSkuItemBean } from '@/api/product/data-contracts';
  import { platformApi, PlatformApi, productApi, dataApi, metaApi } from '@/api';
  import { priceRuleFixed4 } from '@/utils/rulesRegExp';
  import { cloneDeep } from 'lodash-es';
  import BindSku from '@/views/goodscenter/bindGoods/Modal/bindSku.vue';
  import { Plus } from '@element-plus/icons-vue';
  import NumberInput from '@/components/NumberInput/index.vue';
  import { IDickbook } from '@/views/goodscenter/goodsmanage/skulist/data';
  import * as swal from '@/utils/swal';

  const colorMap = {
    1: 'blue',
    2: 'green',
    3: 'purple',
    4: 'red',
  };

  const offsetWidth = ref<number>(document.body.offsetWidth);
  window.onresize = () => {
    return (() => {
      offsetWidth.value = document.body.offsetWidth;
    })();
  };

  const labelPosition = computed(() => {
    return offsetWidth.value > 1250 ? 'left' : 'top';
  });

  const tabCurrent = ref(0);
  // 表单定义
  const formRef = ref<FormInstance>();
  const form = reactive<ProductGroupSkuDetailResp>({
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
    /** 组合SKU */
    groupSkuCode: '',
    /** SKU中文名 */
    name: '',
    /** SKU英文名 */
    nameEn: '',
    /** 分类信息 */
    productCategory: '',
    /** 产品图片 */
    productImage: '',
    productImageUrl: '',
    /** 组合SKU Item 信息 */
    skuItemBeanList: [],
    /** 店铺sku销售信息-基础资料下的店铺的关联信息 */
    skuSalesPriceList: [],
    /** 建议销售价币种编码 */
    suggestPriceCurrencyCode: '',
    /** 建议销售价格 */
    suggestPrice: '',
    /**
     * 产品类型
     * @format int32
     */
    type: 1,
    /** 产品类型名称 */
    typeDesc: '',
  });
  const rules = reactive<FormRules>({
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

  const route = useRoute();
  const groupSkuCode = route.query.code as string;
  const categoryName = reactive<string[]>([]);
  // 获取组合SKU详情信息
  const getDetailInfo = async () => {
    if (groupSkuCode) {
      const res = await productApi.luteosProductGroupSkuQueryGroupSkuDetail({
        groupSkuCode,
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
    }
  };
  getDetailInfo();

  const totalPrice = computed(() => {
    return form.skuItemBeanList.reduce((total, item) => {
      return total + item.formatPrice * item.qty;
    }, 0);
  });
  watch(
    () => form.skuItemBeanList,
    (list) => {
      console.log(2222);
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

  const editIndex = ref<number>(-1);
  const oldItem = ref<ProductGroupSkuItemBean>({});
  const handleActions = (item) => {
    const { row, index, key } = item;
    switch (key) {
      case 'edit':
        editIndex.value = index;
        oldItem.value = cloneDeep(row);
        break;
      case 'delete':
        form.skuItemBeanList.splice(index, 1);
        break;
      case 'cancel':
        editIndex.value = -1;
        form.skuItemBeanList[index] = oldItem.value;
        break;
      case 'confirm':
        editIndex.value = -1;
        break;
      default:
        break;
    }
  };

  const visible = ref<boolean>(false);
  const oldList = ref<any[]>([]);
  const handleClose = (reload, list) => {
    if (reload) {
      console.log(list);
      oldList.value = form.skuItemBeanList;
      form.skuItemBeanList = list.map((item) => {
        const lastItem = oldList.value?.find((old) => old.skuCode === item.skuCode);
        return {
          skuCode: item.skuCode,
          name: lastItem?.name || item.productTitle,
          suggestPrice: lastItem?.suggestPrice || item.price,
          suggestPriceCurrencyCode: lastItem?.suggestPriceCurrencyCode || item.currency,
          type: 1,
          typeDesc: '产品',
          productImageUrl: item.productImageUrl,
          developLuteName: lastItem?.developLuteName || item.createByName,
          state: item.state,
          stateDesc: item.stateDesc,
          qty: lastItem?.qty || 1,
        };
      });
      console.log(form.skuItemBeanList);
    }
    visible.value = false;
  };

  // 添加SKU建议销售价
  const addskuSalesPriceList = () => {
    form.skuSalesPriceList?.push({
      actualPrice: undefined,
      actualPriceCurrencyCode: form.suggestPriceCurrencyCode || '',
      channel: '',
      shop: '',
      saleSkuCode: '',
      site: '',
    });
  };
  const removeskuSalesPriceList = (index) => {
    form.skuSalesPriceList?.splice(index, 1);
  };

  const saveLoading = ref<boolean>(false);
  const save = async () => {
    const isValid = await formRef.value?.validate().catch(() => {
      return false; // 校验失败返回 false，不继续执行
    });
    if (!isValid) return;
    try {
      saveLoading.value = true;
      await productApi.luteosProductGroupSkuSaveProductGroupSku({
        ...form,
        categoryCode: form.categoryCode[4],
      });
      ElMessage.success('保存成功');
    } finally {
      saveLoading.value = false;
    }
  };

  const router = useRouter();
  const handleCancel = async () => {
    const isConfirmed = await swal.cancelConfirm();
    if (!isConfirmed) return;

    router.push('/skugroup');
  };

  const dickbook = ref<IDickbook>({
    product_shop: [],
    shop_platform: [],
    product_channel: [],
    product_site: [],
    product_saletype: [],
    product_activity: [],
    currency_list: [],
  });

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
    const currencyList = await getCurrencyOptions();
    dickbook.value = {
      ...(res.dictMap as IDickbook),
      currency_list: currencyList,
    };
  };
  getDickBook();

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

  const brandOptions = reactive([]);
  const getProductRelationList = async () => {
    const res = await productApi.luteosProductQueryProductRelationList();
    brandOptions.value = res.brandBeanList;
  };
  getProductRelationList();
</script>

<style scoped lang="scss">
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
</style>
