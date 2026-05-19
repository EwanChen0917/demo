<template>
  <div style="width: 100%" :class="{ 'disabled-style': props.disabled }">
    <div class="w-100">
      <div class="add-product">
        <el-link
          type="primary"
          :underline="false"
          @click="
            selectProductDialogRef?.open(localSelectproductlist, shareDictMap['SHARE_SKU_DICT'])
          "
          :disabled="props.disabled"
        >
          添加产品
        </el-link>
        <span style="color: #4e5969; font-size: 12px">
          （已填写{{ localSelectproductlist?.length }}项）
        </span>
      </div>
      <div>
        <div v-if="localSelectproductlist.length" class="product-list">
          <div
            class="product-item"
            v-for="(product, productIdx) in localSelectproductlist"
            :key="product?.productSku"
          >
            <KeenImagePreview
              :src="product?.productImage"
              :srcList="[product?.productImage]"
              :size="56"
            />
            <div class="info">
              <div class="info-item">
                <span class="title">名称</span>
                <div class="flex-grow-1">
                  <OverflowTooltip
                    :content="product?.productTitle"
                    :line="1"
                    :disabled="props.disabled"
                  />
                </div>
              </div>
              <div class="info-item">
                <span class="title">SKU</span>
                <div class="flex-grow-1">
                  <OverflowTooltip
                    :content="product?.productSku"
                    :line="1"
                    :disabled="props.disabled"
                  />
                </div>
              </div>
            </div>
            <div class="quantity">
              <el-form-item
                v-if="props.quantity"
                label="填写件数"
                label-position="top"
                :prop="`localSelectproductlist[${productIdx}].quantity`"
              >
                <NumberInput
                  v-model="product.quantity"
                  :precision="0"
                  :min="1"
                  :disabled="props.disabled"
                />
              </el-form-item>
            </div>
            <div v-if="!props.disabled" class="product-del" @click="delProduct(productIdx)">
              <el-icon :size="10">
                <Close />
              </el-icon>
            </div>
          </div>
        </div>
        <div
          v-if="!localSelectproductlist.length && !splitProduct"
          class="product-empty product-list"
          @click="
            selectProductDialogRef?.open(localSelectproductlist, shareDictMap['SHARE_SKU_DICT'])
          "
        >
          请选择产品
        </div>
      </div>
    </div>
    <SelectProductDialog ref="selectProductDialogRef" @success="handleSuccess" />
  </div>
</template>

<script setup lang="ts">
  import SelectProductDialog from '@/views/supplyChainManage/B2BOrder/orderRule/components/selectProductDialog.vue';
  import { erpApi } from '@/api/index';
  import { useFormItem } from 'element-plus';
  const { formItem } = useFormItem();

  interface Props {
    modelValue?: any[];
    quantity?: boolean;
    splitProduct?: boolean;
    disabled?: boolean;
  }
  const props = defineProps<Props>();

  const emit = defineEmits<{
    'update:modelValue': [value: any];
  }>();

  interface productType {
    productImage?: string;
    productSku?: string;
    productTitle?: string;
    desc?: string;
    value?: string;
    quantity?: string | number;
  }

  const selectProductDialogRef = ref();
  const shareDictMap = ref([]);
  const localSelectproductlist = ref<Array<productType>>([]);
  watch(
    () => localSelectproductlist.value,
    (newVal) => {
      let handleData: Array<productType> = [];
      if (newVal.length) {
        handleData = newVal.map((item) => {
          // 不同情况 不同字段名
          const params = props.quantity
            ? { sku: item.productSku, num: item?.quantity || 1 }
            : { sku: item.productSku };
          if (props.splitProduct) return { ...params };
          return { desc: item.productTitle, value: item.productSku };
        });
      }
      emit('update:modelValue', handleData);
      formItem?.validate('change');
    },
    {
      deep: true,
    }
  );

  const initField = async () => {
    const res: any = await erpApi.luteosErpBaseFlowQueryTemplate({
      type: 7,
    });
    res?.shareDictMap['SHARE_SKU_DICT'].map((item) => {
      item.desc = item.desc.split('[')?.[0];
      return item;
    });
    shareDictMap.value = res?.shareDictMap;
  };

  onMounted(async () => {
    await initField();
    formItem?.validate('change');
    if (!props.modelValue?.length) return;
    // 处理数据显示
    let handleproductData: Array<any> = await props.modelValue?.map((item) => {
      if (item.sku) item.value = item.sku;
      const findObj = shareDictMap.value['SHARE_SKU_DICT'].find((pro) => pro.value == item.value);
      if (findObj)
        return {
          productImage: findObj.params?.productImages?.split(',')?.[0],
          productSku: findObj.value,
          productTitle: findObj.desc,
          quantity: item.num || 1,
        };
    });
    localSelectproductlist.value = handleproductData;
  });

  // 删除产品
  const delProduct = (index) => {
    localSelectproductlist.value.splice(index, 1);
  };

  // 添加产品
  const handleSuccess = (val) => {
    const newProductList = val?.map((item) => {
      return {
        productImage: item?.params?.productImages?.split(',')?.[0],
        productSku: item.value,
        productTitle: item.desc,
        quantity: item?.quantity || 1,
      };
    });
    localSelectproductlist.value = newProductList;
  };
</script>

<style scoped lang="scss">
  .disabled-style {
    cursor: not-allowed;
    :deep(.el-image) {
      img {
        cursor: not-allowed;
      }
    }
  }
  .add-product {
    margin-bottom: 20px;
    :deep(.el-link) {
      margin-left: 10px;
    }
  }
  .product-list {
    width: 100%;
    border: 1px solid #dadde2;
    border-radius: 4px;
    padding: 8px;
    display: flex;
    gap: 8px;
    flex-wrap: wrap;
    .product-item {
      display: flex;
      align-items: center;
      font-size: 12px;
      width: 330px;
      min-width: 240px;
      // height: 58px;
      padding-right: 24px;
      border: 1px solid #e5e6eb;
      border-radius: 4px;
      position: relative;
      gap: 8px;
      .info {
        display: flex;
        flex-direction: column;
        justify-content: center;
        gap: 8px;
        flex-grow: 1;
        flex-shrink: 1;
        max-width: 146px;
        &-item {
          display: flex;
          column-gap: 8px;
          width: 100%;
          line-height: 1.5715;
          .title {
            color: #86909c;
            flex-shrink: 0;
          }
        }
      }
      .quantity {
        :deep(.el-form-item__label) {
          font-size: 12px;
          line-height: 18px;
          margin-bottom: 0;
        }
        :deep(.el-input--small) {
          .el-input__wrapper {
            height: 30px !important;
            line-height: 30px !important;
            min-height: 30px !important;
          }
        }
        :deep(.el-input__inner) {
          height: 30px;
          line-height: 30px;
        }
      }
      .product-del {
        top: 8px;
        right: 8px;
        display: flex;
        color: #808197;
        position: absolute;
        cursor: pointer;
        padding: 3px;
        border: 1px solid #fff;
        border-radius: 100%;
        &:hover {
          color: #fff;
          background-color: #808197;
        }
      }
    }
  }

  .product-empty {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 126px;
    cursor: pointer;
    color: rgb(169, 174, 184);
    font-size: 12px;
  }
</style>
