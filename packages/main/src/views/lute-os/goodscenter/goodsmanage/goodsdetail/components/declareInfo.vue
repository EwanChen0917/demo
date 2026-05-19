<template>
  <slot name="tips"></slot>
  <el-form
    ref="formRef"
    :model="props"
    label-width="170"
    label-position="left"
    :disabled="props.disabled"
    scroll-to-error
  >
    <KeenCard
      v-for="(item, index) in props.productDeclareList?.filter((item) => item.activeFlag)"
      :key="item.skuCode"
      :title="item.skuCode"
    >
      <div class="mx-7 mw-800px">
        <el-form-item label="申报价值：" :prop="'productDeclareList.' + index + '.declarePrice'">
          <div class="d-flex">
            <span>{{ item.declarePrice }}</span>
            <span class="ms-3 text-gray-600">USD</span>
          </div>
        </el-form-item>
        <el-form-item label="中文报关品名：" :prop="'productDeclareList.' + index + '.declareName'">
          <span>{{ item.declareName }}</span>
        </el-form-item>
        <el-form-item
          label="英文报关品名："
          :prop="'productDeclareList.' + index + '.declareNameEn'"
        >
          <span>{{ item.declareNameEn }}</span>
        </el-form-item>
        <el-form-item
          label="敏感类型："
          :prop="'productDeclareList.' + index + '.sensitiveTypeCodeList'"
        >
          <span v-for="(sensitive, index) in item.sensitiveTypeCodeList" :key="sensitive">
            <span>
              {{
                listData?.sensitiveTypeBeanList?.find((x) => x.sensitiveTypeCode === sensitive)
                  ?.sensitiveTypeName
              }}
            </span>
            <span class="me-3" v-if="index !== item.sensitiveTypeCodeList.length - 1">,</span>
          </span>
        </el-form-item>
        <div
          v-show="hideFlagList[index]"
          @click="reverseFlag(index)"
          class="text-center cursor-pointer arrows-icon"
        >
          <svgIcon icon="arrows-arr082" class="svg-icon svg-icon-1" />
        </div>

        <div v-show="!hideFlagList[index]">
          <el-form-item label="海关申报代码：">
            <span>{{ item.hsCode }}</span>
          </el-form-item>
          <el-form-item label="申报说明：">
            <span>{{ item.declareExplain }}</span>
          </el-form-item>
          <el-form-item label="进口申报价值：">
            <div class="d-flex">
              <span>{{ item.hsImportPrice }}</span>
              <span class="ms-3 text-gray-600" v-if="item.hsImportPrice">USD</span>
            </div>
          </el-form-item>
          <el-form-item
            label="中文材质："
            :prop="'productDeclareList.' + index + '.productMaterialIngredient'"
          >
            <span>{{ item.productMaterialIngredient }}</span>
          </el-form-item>
          <el-form-item label="英文材质：">
            <span>{{ item.productMaterialIngredientEn }}</span>
          </el-form-item>
          <el-form-item label="中文用途：">
            <span>{{ item.useCn }}</span>
          </el-form-item>
          <el-form-item label="英文用途：">
            <span>{{ item.useEn }}</span>
          </el-form-item>
          <el-form-item label="海关税率：">
            <span>{{ item.hsTariffRate }}</span>
          </el-form-item>
          <el-form-item label="海关属性：">
            <span class="me-3">
              {{ hsAttrMap?.find((x) => parseInt(x.value) === item.hsAttr)?.desc }}
            </span>
            <!--            <el-select v-model="item.hsAttr" class="w-100" placeholder="请选择海关属性" filterable>
                          <el-option
                            v-for="item in hsAttrMap"
                            :label="item.desc"
                            :value="parseInt(item.value)"
                            :key="item.value"
                          />
                        </el-select>-->
          </el-form-item>
          <div @click="reverseFlag(index)" class="text-center cursor-pointer arrows-icon">
            <svgIcon icon="arrows-arr081" class="svg-icon svg-icon-1" />
          </div>
        </div>
      </div>
    </KeenCard>
  </el-form>
</template>

<script setup lang="ts">
  import { FormInstance } from 'element-plus';
  import useList from '@/views/lute-os/hooks/list/useList';
  import { platformApi, productApi, ProductApi } from '@/api';

  const PAGE_SIZE = 100;
  const props = defineProps<{
    productDeclareList: any;
    disabled: boolean;
  }>();
  const hideFlagList = reactive<boolean[]>(Array(props.productDeclareList.length).fill(true));

  // 表单定义
  const formRef = ref<FormInstance>();

  const { listData } = useList<
    ProductApi.LuteosProductSensitiveTypeQuerySensitiveTypeList.RequestQuery,
    ProductApi.LuteosProductSensitiveTypeQuerySensitiveTypeList.ResponseBody
  >({
    pageSize: PAGE_SIZE,
    service: productApi.luteosProductSensitiveTypeQuerySensitiveTypeList,
  });

  const reverseFlag = (index) => {
    hideFlagList[index] = !hideFlagList[index];
  };

  const hsAttrMap = ref();
  const getHsAttrMap = async () => {
    const res = await platformApi.platformDict({
      dictCodes: ['hs_attr'],
    });
    hsAttrMap.value = res?.dictMap?.hs_attr;
  };

  getHsAttrMap();

  defineExpose({
    productDeclareList: props.productDeclareList,
    formRef,
  });
</script>

<style scoped lang="scss">
  .arrows-icon {
    padding: 3px;
    border-radius: 5px;

    &:hover {
      background-color: var(--bs-gray-100);
    }
  }
</style>
