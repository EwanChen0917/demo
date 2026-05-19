<template>
  <slot name="tips"></slot>
  <el-form
    ref="formRef"
    :model="props"
    :rules="rules"
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
        <el-form-item
          label="申报价值："
          :prop="'productDeclareList.' + index + '.declarePrice'"
          :rules="rules.declarePrice"
        >
          <div class="d-flex">
            <el-input v-model="item.declarePrice" placeholder="请输入申报价值" />
            <span class="ms-3">USD</span>
          </div>
        </el-form-item>
        <el-form-item
          label="中文报关品名："
          :prop="'productDeclareList.' + index + '.declareName'"
          :rules="rules.declareName"
        >
          <el-input v-model="item.declareName" placeholder="请输入中文报关品名" />
        </el-form-item>
        <el-form-item
          label="英文报关品名："
          :prop="'productDeclareList.' + index + '.declareNameEn'"
          :rules="rules.declareNameEn"
        >
          <el-input v-model="item.declareNameEn" placeholder="请输入英文报关品名" />
        </el-form-item>
        <el-form-item
          label="敏感类型："
          :prop="'productDeclareList.' + index + '.sensitiveTypeCodeList'"
          :rules="rules.sensitiveTypeCodeList"
        >
          <el-checkbox-group v-model="item.sensitiveTypeCodeList">
            <el-checkbox
              v-for="sensitive in listData?.sensitiveTypeBeanList"
              :key="sensitive.sensitiveTypeCode"
              :label="sensitive.sensitiveTypeCode"
            >
              {{ sensitive.sensitiveTypeName }}
            </el-checkbox>
          </el-checkbox-group>
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
            <el-input v-model="item.hsCode" placeholder="请输入海关申报代码" />
          </el-form-item>
          <el-form-item label="申报说明：">
            <el-input v-model="item.declareExplain" placeholder="请输入申报说明" />
          </el-form-item>
          <el-form-item label="进口申报价值：">
            <div class="d-flex">
              <el-input v-model="item.hsImportPrice" placeholder="请输入" />
              <span class="ms-3">USD</span>
            </div>
          </el-form-item>
          <el-form-item
            label="中文材质："
            :prop="'productDeclareList.' + index + '.productMaterialIngredient'"
          >
            <el-input v-model="item.productMaterialIngredient" placeholder="请输入中文材质" />
          </el-form-item>
          <el-form-item label="英文材质：">
            <el-input v-model="item.productMaterialIngredientEn" placeholder="请输入英文材质" />
          </el-form-item>
          <el-form-item label="中文用途：">
            <el-input v-model="item.useCn" placeholder="请输入中文用途" />
          </el-form-item>
          <el-form-item label="英文用途：">
            <el-input v-model="item.useEn" placeholder="请输入英文用途" />
          </el-form-item>
          <el-form-item label="海关税率：">
            <el-input v-model="item.hsTariffRate" placeholder="请输入海关税率" />
          </el-form-item>
          <el-form-item label="海关属性：">
            <el-select v-model="item.hsAttr" class="w-100" placeholder="请选择海关属性" filterable>
              <el-option
                v-for="item in hsAttrMap"
                :label="item.desc"
                :value="parseInt(item.value)"
                :key="item.value"
              />
            </el-select>
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
  import { FormInstance, FormRules } from 'element-plus';
  import useList from '@/hooks/list/useList';
  import { platformApi, productApi, ProductApi } from '@/api';
  import { priceRuleFixed4 } from '@/utils/rulesRegExp';

  const PAGE_SIZE = 100;
  const props = defineProps<{
    productDeclareList: any;
    disabled: boolean;
  }>();
  const hideFlagList = reactive<boolean[]>(Array(props.productDeclareList.length).fill(true));

  // 表单定义
  const formRef = ref<FormInstance>();

  const rules = reactive<FormRules>({
    declarePrice: [
      {
        required: true,
        message: '请输入申报价值',
        trigger: ['blur', 'change'],
      },
      {
        pattern: priceRuleFixed4,
        message: '请输入数字',
      },
    ],
    declareName: [
      {
        required: true,
        message: '请输入中文申报品名',
        trigger: ['blur', 'change'],
      },
    ],
    declareNameEn: [
      {
        required: true,
        message: '请输入英文申报品名',
        trigger: ['blur', 'change'],
      },
    ],
    productMaterialIngredient: [
      {
        required: true,
        message: '请输入中文材质',
        trigger: ['blur', 'change'],
      },
    ],
    sensitiveTypeCodeList: [
      {
        required: true,
        message: '至少选择一个敏感类型',
        trigger: ['blur', 'change'],
      },
    ],
  });

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
