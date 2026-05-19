<template>
  <el-form
    ref="formRef"
    :model="form"
    :rules="isDetail ? [] : rules"
    label-width="150"
    label-position="left"
    style="max-width: 600px"
    class="px-7"
  >
    <el-form-item label="默认采购员：" prop="purchaseOperator">
      <span v-if="isDetail">{{ form?.purchaseOperatorName }}</span>
      <el-select
        v-else
        v-model="form.purchaseOperator"
        placeholder="请选择默认采购员"
        clearable
        :teleported="false"
        class="w-100"
        filterable
      >
        <el-option
          v-for="item in operatorOptions"
          :key="item.memberCode"
          :label="item.name || ''"
          :value="item.memberCode!"
        />
      </el-select>
    </el-form-item>
    <el-form-item label="默认供应商：" prop="supplierCode">
      <span v-if="isDetail">{{ form?.supplierName }}</span>
      <el-select
        v-else
        v-model="form.supplierCode"
        placeholder="请选择默认供应商"
        clearable
        filterable
        :teleported="false"
        class="w-100"
      >
        <el-option
          v-for="item in supplierOptionsList"
          :key="item.supplierCode"
          :label="`${item.supplierCode}-${item.supplierName}` || ''"
          :value="item.supplierCode!"
        />
      </el-select>
    </el-form-item>
    <el-form-item label="默认采购单价：" :required="!isDetail">
      <div class="w-100 d-flex gap-5">
        <template v-if="isDetail">
          <span>{{ form?.purchasePrice }}</span>
          <span>{{ form?.purchaseCurrencyCode }}</span>
        </template>
        <template v-else>
          <el-form-item prop="purchasePrice" class="w-50 flex-grow-1">
            <el-input v-model="form.purchasePrice" placeholder="请输入默认采购单价" />
          </el-form-item>
          <el-form-item prop="purchaseCurrencyCode">
            <CurrencySelect class="w-100" v-model="form.purchaseCurrencyCode" />
          </el-form-item>
        </template>
      </div>
    </el-form-item>
    <el-form-item label="境内货源地" min-width="180">
      <span v-if="isDetail">{{ form?.territoryGoods }}</span>
      <el-input v-else v-model="form.territoryGoods" />
    </el-form-item>
  </el-form>
</template>

<script setup lang="ts">
  import { FormInstance, FormRules } from 'element-plus';
  import { dataApi, memberApi, productApi } from '@/api';
  import { priceRuleFixed4 } from '@/utils/rulesRegExp';

  const props = defineProps<{
    form: any;
    productManagerCode: string;
    currencyOptions: { desc: string; value: string }[];
    mode?: 'detail | edit';
    operatorOptions?: any[];
    supplierListFilter?: any[];
  }>();

  const isDetail = computed(() => props.mode === 'detail');

  // 表单定义
  const formRef = ref<FormInstance>();

  const rules = reactive<FormRules>({
    supplierCode: [
      {
        required: true,
        message: '请选择默认供应商',
        trigger: ['blur', 'change'],
      },
    ],
    purchasePrice: [
      {
        required: true,
        message: '请输入默认采购单价',
        trigger: ['blur', 'change'],
      },
      {
        pattern: priceRuleFixed4,
        message: '请输入数字',
      },
    ],
    purchaseCurrencyCode: [
      {
        required: true,
        message: '请选择采购币种',
        trigger: ['blur', 'change'],
      },
    ],
    purchaseOperator: [
      {
        required: true,
        message: '请选择默认采购员',
        trigger: ['blur', 'change'],
      },
    ],
  });

  // 获取供应商options
  const supplierOptionsList = ref<any[]>([]);
  const getSupplierOptions = async () => {
    const res = await dataApi.luteosDataQuerySupplierBaseList();
    supplierOptionsList.value = res?.supplierList;
  };
  // const handlePurchaseOperatorChange = (code) => {
  //   props.form.supplierCode = '';
  //   getSupplierOptions(code);
  // };
  getSupplierOptions();

  // 获取采购员options

  const operatorOptions = ref<any[]>([]);
  const getOperatorOptions = async () => {
    const res = await memberApi.luteosMemberQueryDeptMemberList({
      operatorDepartmentCode: 'all_dept',
    });
    operatorOptions.value = res.memberList;
  };
  if (props.operatorOptions && props.operatorOptions?.length > 0) {
    // eslint-disable-next-line vue/no-setup-props-destructure
    operatorOptions.value = props.operatorOptions;
  } else {
    getOperatorOptions();
  }

  defineExpose({
    form: props.form,
    formRef,
  });
</script>

<style scoped lang="scss"></style>
