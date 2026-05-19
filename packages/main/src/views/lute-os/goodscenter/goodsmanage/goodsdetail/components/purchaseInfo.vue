<template>
  <slot name="tips"></slot>
  <KeenCard title="采购信息">
    <el-form
      ref="formRef"
      :model="props"
      :rules="rules"
      label-width="0"
      label-position="left"
      :disabled="props.disabled"
      scroll-to-error
    >
      <el-table
        row-key="skuCode"
        :data="props.productPurchaseList?.filter((item) => item.activeFlag)"
      >
        <el-table-column label="产品SKU" prop="skuCode" min-width="120">
          <template #default="scope">
            <el-form-item>
              <span>{{ scope.row.skuCode }}</span>
            </el-form-item>
          </template>
        </el-table-column>
        <el-table-column label="默认采购员" prop="purchaseOperator" min-width="180">
          <template #default="scope">
            <el-form-item
              :prop="'productPurchaseList.' + scope.$index + '.purchaseOperator'"
              :rules="rules.purchaseOperator"
            >
              <span>{{ scope.row.purchaseOperatorName }}</span>
            </el-form-item>
          </template>
        </el-table-column>
        <el-table-column label="默认供应商" prop="supplierCode" min-width="200">
          <template #default="scope">
            <el-form-item
              :prop="'productPurchaseList.' + scope.$index + '.supplierCode'"
              :rules="rules.supplierCode"
            >
              <span>{{ scope.row.supplierName }}</span>
            </el-form-item>
          </template>
        </el-table-column>
        <el-table-column label="默认采购单价" min-width="180">
          <template #default="scope">
            <el-space class="d-flex flex-wrap">
              <el-form-item
                :prop="'productPurchaseList.' + scope.$index + '.purchasePrice'"
                :rules="rules.purchasePrice"
                class="w-50 flex-grow-1"
              >
                <span>{{ scope.row.purchasePrice }}</span>
              </el-form-item>
              <el-form-item
                :prop="'productPurchaseList.' + scope.$index + '.purchaseCurrencyCode'"
                :rules="rules.purchaseCurrencyCode"
              >
                <span>{{ scope.row.purchaseCurrencyCode }}</span>
              </el-form-item>
            </el-space>
          </template>
        </el-table-column>
        <el-table-column label="境内货源地" min-width="180">
          <template #default="scope">
            <el-form-item>
              <div>
                <span>{{ scope.row.territoryGoods }}</span>
              </div>
            </el-form-item>
          </template>
        </el-table-column>
      </el-table>
    </el-form>
  </KeenCard>
</template>

<script setup lang="ts">
  import { FormInstance, FormRules } from 'element-plus';
  import { dataApi, productApi } from '@/api';
  import { priceRuleFixed4 } from '@/utils/rulesRegExp';

  const props = defineProps<{
    productPurchaseList: any;
    createBy: string;
    disabled: boolean;
  }>();
  // 表单定义
  const formRef = ref<FormInstance>();
  const supplierOptionsMap = reactive({});

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
  const getSupplierOptions = async (memberCode) => {
    const res = await dataApi.luteosDataQuerySupplierBaseList();
    supplierOptionsMap[memberCode] = res.supplierList;
  };

  // 获取币种options
  const currencyOptions = ref<any[]>([]);
  const getCurrencyOptions = async () => {
    const res = await dataApi.luteosDataQueryCurrencyList();
    currencyOptions.value = res.currencyList;
  };
  getCurrencyOptions();

  // 获取采购员options

  const operatorOptions = ref<any[]>([]);
  const getOperatorOptions = async () => {
    await nextTick();
    if (!props.createBy) return;
    const res = await productApi.luteosProductQueryOperatorList({
      productManagerCode: props.createBy,
    });
    operatorOptions.value = res.memberList;
  };
  getOperatorOptions();

  const handlePurchaseChange = async (row: any) => {
    // scope.row.supplierCode = undefined;
    await getSupplierOptions(row.purchaseOperator);
    if (
      !supplierOptionsMap[row.purchaseOperator].some((item) => {
        return item.supplierCode === row.supplierCode;
      })
    ) {
      row.supplierCode = '';
    }
  };

  const oldOperatorList = [];
  const oldSupplierList = [];
  props.productPurchaseList.forEach((item, index) => {
    if (item.purchaseOperator && item.purchaseOperatorName) {
      oldOperatorList[index] = {
        memberCode: item.purchaseOperator,
        name: item.purchaseOperatorName,
      };
    }
    if (item.supplierCode && item.supplierName) {
      oldSupplierList[index] = { supplierCode: item.supplierCode, supplierName: item.supplierName };
    }
    if (item.purchaseOperator && !supplierOptionsMap[item.purchaseOperator]) {
      getSupplierOptions(item.purchaseOperator);
    }
  });

  defineExpose({
    productPurchaseList: props.productPurchaseList,
    formRef,
    getOperatorOptions,
  });
</script>

<style scoped lang="scss">
  :deep(.el-table__cell) {
    padding-bottom: 0 !important;
  }
</style>
