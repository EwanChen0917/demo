<template>
  <slot name="tips"></slot>
  <KeenCard title="供应商信息">
    <el-form
      ref="formRef"
      :model="props"
      :rules="rules"
      label-width="0"
      label-position="left"
      :disabled="props.disabled"
      scroll-to-error
    >
      <el-table row-key="skuCode" :data="listData">
        <el-table-column label="产品SKU" prop="skuCode" min-width="120">
          <template #default="scope">
            <el-form-item>
              <span>{{ scope.row.skuCode }}</span>
            </el-form-item>
          </template>
        </el-table-column>
        <el-table-column label="默认采购员" prop="purchaseOperator" min-width="140">
          <template #default="scope">
            <el-form-item
              :prop="'productPurchaseList.' + scope.$index + '.purchaseOperator'"
              :rules="rules.purchaseOperator"
            >
              <el-select
                style="width: 90%"
                v-model="scope.row.purchaseOperator"
                placeholder="请选择默认采购员"
                clearable
                filterable
              >
                <el-option
                  v-for="item in operatorOptions"
                  :key="item.memberCode"
                  :label="item.name || ''"
                  :value="item.memberCode!"
                />
                <!--                <el-option
                  v-if="
                    oldOperatorList[scope.$index] &&
                    operatorOptions.every((item) => {
                      return item.memberCode !== oldOperatorList[scope.$index].memberCode;
                    })
                  "
                  :label="oldOperatorList[scope.$index].name"
                  :value="oldOperatorList[scope.$index].memberCode"
                  :key="oldOperatorList[scope.$index].memberCode"
                />-->
              </el-select>
            </el-form-item>
          </template>
        </el-table-column>
        <el-table-column label="默认供应商" prop="supplierCode" min-width="200">
          <template #default="scope">
            <el-form-item
              :prop="'productPurchaseList.' + scope.$index + '.supplierCode'"
              :rules="rules.supplierCode"
            >
              <el-select
                v-model="scope.row.supplierCode"
                placeholder="请选择默认供应商"
                clearable
                filterable
                style="width: 90%"
              >
                <el-option
                  v-for="item in supplierOptions"
                  :key="item.supplierCode"
                  :label="`${item.supplierCode}-${item.supplierName}` || ''"
                  :value="item.supplierCode!"
                />
                <!--                <el-option
                  v-if="
                    oldSupplierList[scope.$index] &&
                    (!supplierOptionsMap[scope.row.purchaseOperator] ||
                      supplierOptionsMap[scope.row.purchaseOperator].every((item) => {
                        return item.supplierCode !== oldSupplierList[scope.$index].supplierCode;
                      }))
                  "
                  :label="oldSupplierList[scope.$index].supplierName"
                  :value="oldSupplierList[scope.$index].supplierCode"
                  :key="oldSupplierList[scope.$index].supplierCode"
                />-->
              </el-select>
            </el-form-item>
          </template>
        </el-table-column>
        <el-table-column label="默认采购单价" min-width="180">
          <template #default="scope">
            <div class="d-flex flex-wrap" style="width: 90%">
              <el-form-item
                :prop="'productPurchaseList.' + scope.$index + '.purchasePrice'"
                :rules="rules.purchasePrice"
                class="w-50 flex-grow-1"
              >
                <el-input
                  v-model="scope.row.purchasePrice"
                  placeholder="请输入"
                  suffix-icon="el-icon-date"
                />
              </el-form-item>
              <el-form-item
                class="w-100"
                :prop="'productPurchaseList.' + scope.$index + '.purchaseCurrencyCode'"
                :rules="rules.purchaseCurrencyCode"
              >
                <CurrencySelect class="w-100" v-model="scope.row.purchaseCurrencyCode" />
              </el-form-item>
            </div>
          </template>
        </el-table-column>
        <el-table-column label="境内货源地" min-width="180">
          <template #default="scope">
            <el-form-item>
              <el-input type="textarea" v-model="scope.row.territoryGoods" rows="5" />
            </el-form-item>
          </template>
        </el-table-column>
      </el-table>
    </el-form>
  </KeenCard>
</template>

<script setup lang="ts">
  import { FormInstance, FormRules } from 'element-plus';
  import { dataApi, memberApi, productApi } from '@/api';
  import { priceRuleFixed4 } from '@/utils/rulesRegExp';

  const props = defineProps<{
    productPurchaseList: any;
    createBy: string;
    disabled: boolean;
  }>();
  // 表单定义
  const formRef = ref<FormInstance>();
  const supplierOptions = ref();

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

  const listData = computed(() => props.productPurchaseList?.filter((item) => item.activeFlag));

  // 获取供应商options
  const getSupplierOptions = async () => {
    const res = await dataApi.luteosDataQuerySupplierBaseList();
    supplierOptions.value = res.supplierList;
  };

  // 获取币种options
  const currencyOptions = ref<any[]>([]);
  const getCurrencyOptions = async () => {
    const res = await dataApi.luteosDataQueryCurrencyList();
    currencyOptions.value = res.currencyList;
  };

  // 获取采购员options

  const operatorOptions = ref<any[]>([]);
  const getOperatorOptions = async () => {
    await nextTick();
    if (!props.createBy) return;
    const res = await memberApi.luteosMemberQueryDeptMemberList({
      operatorDepartmentCode: 'all_dept',
    });
    operatorOptions.value = res.memberList;
  };

  /* const handlePurchaseChange = async (row: any) => {
    // scope.row.supplierCode = undefined;
    await getSupplierOptions(row.purchaseOperator);
    if (
      !supplierOptionsMap[row.purchaseOperator].some((item) => {
        return item.supplierCode === row.supplierCode;
      })
    ) {
      row.supplierCode = '';
    }
  }; */

  // const oldOperatorList = [];
  // const oldSupplierList = [];
  /* props.productPurchaseList.forEach((item, index) => {
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
  }); */
  onMounted(async () => {
    await Promise.all([getSupplierOptions(), getOperatorOptions(), getCurrencyOptions()]);
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
