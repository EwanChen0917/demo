<template>
  <el-form
    ref="formRef"
    :model="props.form"
    :rules="isDetail ? [] : rules"
    label-width="170"
    label-position="left"
    style="max-width: 800px"
    class="mx-7"
  >
    <template v-if="isDetail">
      <el-form-item label="申报价值" prop="declarePrice">
        <span>{{ form?.declarePrice }}</span>
        <span class="ms-3 text-gray-600">USD</span>
      </el-form-item>
      <el-form-item label="中文报关品名" prop="declareName">
        <span>{{ form?.declareName }}</span>
      </el-form-item>
      <el-form-item label="英文报关品名" prop="declareNameEn">
        <span>{{ form?.declareNameEn }}</span>
      </el-form-item>
      <el-form-item label="敏感类型" prop="sensitiveTypeCodeList" v-if="!hideSensitive">
        <span v-for="(sensitive, index) in form.sensitiveTypeCodeList" :key="sensitive">
          <span>
            {{ listData?.sensitiveTypeBeanList?.find((x) => x.value === sensitive)?.desc }}
          </span>
          <span class="me-3" v-if="index !== form.sensitiveTypeCodeList.length - 1">,</span>
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
          <span>{{ form?.hsCode }}</span>
        </el-form-item>
        <el-form-item label="申报说明：">
          <span>{{ form?.declareExplain }}</span>
        </el-form-item>
        <el-form-item label="进口申报价值：">
          <div class="d-flex">
            <span>{{ form?.hsImportPrice }}</span>
            <span v-if="form?.hsImportPrice" class="ms-3">USD</span>
          </div>
        </el-form-item>
        <el-form-item label="中文材质：">
          <span>{{ form?.productMaterialIngredient }}</span>
        </el-form-item>
        <el-form-item label="英文材质：">
          <span>{{ form?.productMaterialIngredientEn }}</span>
        </el-form-item>
        <el-form-item label="中文用途：">
          <span>{{ form?.useCn }}</span>
        </el-form-item>
        <el-form-item label="英文用途：">
          <span>{{ form?.useEn }}</span>
        </el-form-item>
        <el-form-item label="海关税率：">
          <span>{{ form?.hsTariffRate }}</span>
        </el-form-item>
        <el-form-item label="海关属性：">
          <span>{{ form?.hsAttrName }}</span>
        </el-form-item>
        <div @click="hideFlag = !hideFlag" class="text-center cursor-pointer arrows-icon">
          <svgIcon icon="arrows-arr081" class="svg-icon svg-icon-1" />
        </div>
      </div>
    </template>
    <template v-else>
      <el-form-item label="申报价值" prop="declarePrice">
        <NumberInput
          style="max-width: 300px"
          v-model="form.declarePrice"
          placeholder="请输入"
          appendText="USD"
        />
      </el-form-item>
      <el-form-item label="中文报关品名" prop="declareName">
        <el-input v-model="form.declareName" placeholder="请输入" />
      </el-form-item>
      <el-form-item label="英文报关品名" prop="declareNameEn">
        <el-input v-model="form.declareNameEn" placeholder="请输入" />
      </el-form-item>
      <el-form-item label="敏感类型" prop="sensitiveTypeCodeList" v-if="!hideSensitive">
        <el-checkbox-group v-model="form.sensitiveTypeCodeList">
          <el-checkbox
            v-for="item in listData?.sensitiveTypeBeanList"
            :key="item.sensitiveTypeCode"
            :label="item.sensitiveTypeCode"
          >
            {{ item.sensitiveTypeName }}
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
          <el-input v-model="form.hsCode" placeholder="请输入海关申报代码" />
        </el-form-item>
        <el-form-item label="申报说明：">
          <el-input v-model="form.declareExplain" placeholder="请输入申报说明" />
        </el-form-item>
        <el-form-item label="进口申报价值：">
          <div class="d-flex">
            <el-input v-model="form.hsImportPrice" placeholder="请输入" />
            <span class="ms-3">USD</span>
          </div>
        </el-form-item>
        <el-form-item label="中文材质：">
          <el-input v-model="form.productMaterialIngredient" placeholder="请输入中文材质" />
        </el-form-item>
        <el-form-item label="英文材质：">
          <el-input v-model="form.productMaterialIngredientEn" placeholder="请输入英文材质" />
        </el-form-item>
        <el-form-item label="中文用途：">
          <el-input v-model="form.useCn" placeholder="请输入中文用途" />
        </el-form-item>
        <el-form-item label="英文用途：">
          <el-input v-model="form.useEn" placeholder="请输入英文用途" />
        </el-form-item>
        <el-form-item label="海关税率：">
          <el-input v-model="form.hsTariffRate" placeholder="请输入海关税率" />
        </el-form-item>
        <el-form-item label="海关属性：">
          <el-select v-model="form.hsAttr" class="w-100" placeholder="请选择海关属性" filterable>
            <el-option
              v-for="item in hsAttrMap"
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
    </template>
  </el-form>
</template>

<script setup lang="ts">
  import { FormInstance, FormRules } from 'element-plus';
  import useList from '@/hooks/list/useList';
  import { platformApi, productApi, ProductApi } from '@/api';
  import { priceRuleFixed4 } from '@/utils/rulesRegExp';
  import NumberInput from '@/components/NumberInput/index.vue';

  const PAGE_SIZE = 100;
  const props = defineProps<{
    form: any;
    isDetail?: boolean;
    hideSensitive?: boolean;
  }>();
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

  const hideFlag = ref<boolean>(true);

  const { listData } = useList<
    ProductApi.LuteosProductSensitiveTypeQuerySensitiveTypeList.RequestQuery,
    ProductApi.LuteosProductSensitiveTypeQuerySensitiveTypeList.ResponseBody
  >({
    pageSize: PAGE_SIZE,
    service: productApi.luteosProductSensitiveTypeQuerySensitiveTypeList,
  });

  const hsAttrMap = ref();
  const getHsAttrMap = async () => {
    const res = await platformApi.platformDict({
      dictCodes: ['hs_attr'],
    });
    hsAttrMap.value = res?.dictMap?.hs_attr;
  };

  getHsAttrMap();

  defineExpose({
    form: props.form,
    formRef,
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
</style>
