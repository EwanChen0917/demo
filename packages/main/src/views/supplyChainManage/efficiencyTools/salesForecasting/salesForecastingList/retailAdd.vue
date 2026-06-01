<template>
  <KeenCard title="添加预测商品" :marginBottom="0">
    <p class="titleTip">
      <el-icon><WarningFilled /></el-icon>
      添加前请先选择客户名称/客户汇总名称、目的仓
    </p>
    <el-form :model="formData" ref="formRef" :inline="true" style="padding-left: 16px; width: 100%">
      <el-form-item
        prop="customerCode"
        :rules="[{ validator: validateCustomer, trigger: 'change' }]"
        style="width: 26%"
      >
        <el-select
          v-model="formData.customerCode"
          placeholder="请选择客户名称"
          filterable
          clearable
          :disabled="formData.customerCollectCode"
          @change="changeCustomer('customerCode')"
        >
          <el-option
            v-for="item in dickbook.customer_list"
            :key="item.code"
            :label="item.name"
            :value="item.code"
          />
        </el-select>
      </el-form-item>
      <el-form-item
        prop="customerCollectCode"
        :rules="[{ validator: validateCustomer, trigger: 'change' }]"
        style="width: 26%"
      >
        <el-select
          v-model="formData.customerCollectCode"
          placeholder="请选择客户汇总名称"
          filterable
          clearable
          :disabled="formData.customerCode"
          @change="changeCustomer('customerCollectCode')"
        >
          <el-option
            v-for="item in dickbook.customer_collect_list"
            :key="item.code"
            :label="item.name"
            :value="item.code"
          />
        </el-select>
      </el-form-item>
      <el-form-item
        label="目的仓:"
        prop="warehouseCode"
        :rules="[{ required: true, message: '请选择目的仓' }]"
        style="width: 26%"
      >
        <WarehouseSelect
          v-model="formData.warehouseCode"
          placeholder="目的仓"
          filterable
          clearable
          @change="changeWarehouseCode"
        />
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="addProductRef.open()" :disabled="!canOpenDialog">
          选择商品
        </el-button>
      </el-form-item>
    </el-form>
  </KeenCard>
  <KeenCard>
    <el-table :data="selectedSkuList || []" row-key="skuCode" max-height="400px">
      <el-table-column type="index" label="序号" width="50">
        <template #default="{ $index }">
          {{ $index + 1 }}
        </template>
      </el-table-column>
      <el-table-column prop="skuCode" label="产品SKU" />
      <el-table-column prop="productTitle" label="产品名称" min-width="200">
        <template #default="{ row }">
          <GoodsInfo
            hide-image
            :title="row.productTitle"
            :subtitle="row.skuCode"
            copy-title
            copy-subtitle
          />
        </template>
      </el-table-column>
      <el-table-column prop="productLineName" label="产品品线" />
      <el-table-column prop="categoryName" label="产品分类" min-width="120" />
      <el-table-column label="操作">
        <template #default="{ row }">
          <el-button type="text" size="small" @click="deleteSelectedSku(row)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
  </KeenCard>
  <div class="card-footer d-flex justify-content-end py-6 px-9">
    <el-space>
      <el-button type="text" @click="close">取消</el-button>
      <el-button
        type="primary"
        @click="submit"
        :disabled="!formData.warehouseCode || selectedSkuList.length === 0"
      >
        确定
      </el-button>
    </el-space>
  </div>
  <AddRetailProDialog
    ref="addProductRef"
    v-model="selectedSkuList"
    :all-add-list="computedAllAddList"
  />
</template>

<script lang="ts" setup>
  import { erpApi, productApi } from '@/api/index';
  import { ElMessage } from 'element-plus';
  import { useRouter } from 'vue-router';
  import WarehouseSelect from '@/views/supplyChainManage/efficiencyTools/salesForecasting/components/warehouseSelect.vue';
  import { useTabs } from '@/hooks/tabs';
  import { useTabbarStore } from '@/store/modules/useTabbar';
  import AddRetailProDialog from './components/addRetailProDialog.vue';

  const tabbarStore = useTabbarStore();
  const { closeTabByKey } = useTabs();

  const route = useRoute();
  const router = useRouter();
  const addProductRef = ref();
  // const selectType=ref('custom'); // 选择的类型，默认为客户名称
  const formRef = ref();
  const formData = ref({
    customerCode: undefined,
    customerCollectCode: undefined,
    warehouseCode: undefined,
  });
  const selectedSkuList = ref<any[]>([]); // 列表展示数据
  const allAddList = ref<any[]>([]); // 已添加过的数据

  const computedAllAddList = computed(() => {
    const { warehouseCode, customerCode, customerCollectCode } = formData.value;
    return allAddList.value.map((item) => {
      return {
        ...item,
        disabled:
          item.warehouseCode === warehouseCode &&
          (item.customerCode === customerCode || item.customerCollectCode === customerCollectCode),
      };
    });
  });

  const dickbook: any = ref({
    model_list: [],
    customer_list: [],
    warehouse_list: [],
    customer_collect_list: [],
  });

  const canOpenDialog = computed(
    () =>
      formData.value.warehouseCode &&
      (formData.value.customerCode || formData.value.customerCollectCode)
  );

  const validateCustomer = (_rule, _value, callback) => {
    if (!formData.value.customerCode && !formData.value.customerCollectCode) {
      callback(new Error('客户名称或客户汇总名称不能为空'));
    } else {
      callback();
    }
  };

  const getCreatorList = async () => {
    const [res1, res2, res3] = await Promise.all([
      productApi.luteosProductModelQueryModelList({
        pageNum: 1,
        pageSize: 500,
      }),
      erpApi.luteosErpBaseB2BClientQueryList({
        pageNum: 1,
        pageSize: 500,
        status: 0,
      }),
      erpApi.luteosErpPlanPsfccQueryList({
        pageNum: 1,
        pageSize: 500,
        status: 0,
      }),
    ]);
    return {
      model_list: res1.modelBeanList,
      customer_list: res2.recordList,
      customer_collect_list: res3.recordList,
    };
  };

  const initDickbook = async () => {
    const memeberList = await getCreatorList();
    dickbook.value = {
      ...memeberList,
    };
  };
  const getAllAddSkuList = async () => {
    const res = await erpApi.luteosErpRetailSaleForecastQueryAllAddSkuList();
    allAddList.value = res || [];
  };

  initDickbook();
  getAllAddSkuList();

  // 客户名称改变时，清空客户汇总名称校验
  const changeCustomer = (type: string) => {
    const item = type === 'customerCode' ? 'customerCollectCode' : 'customerCode';
    formRef.value.clearValidate(item);
    selectedSkuList.value = [];
  };

  // 目的仓改变时
  const changeWarehouseCode = () => {
    selectedSkuList.value = [];
  };

  const deleteSelectedSku = (row) => {
    selectedSkuList.value = selectedSkuList.value.filter((item) => item.skuCode !== row.skuCode);
  };

  const submit = async () => {
    await formRef.value.validateField('warehouseCode');
    // 客户名称、客户汇总二选一校验
    if (!formData.value.customerCode && !formData.value.customerCollectCode) {
      ElMessage.error('客户名称和客户汇总名称必须至少选择一个');
      return;
    }
    const itemList = selectedSkuList.value.map((item) => {
      return {
        ...formData.value,
        skuCode: item.skuCode,
      };
    });
    await erpApi.luteosErpRetailSaleForecastSaveSkus({
      itemList,
    });
    ElMessage.success('添加成功');
    closeTabByKey(route.fullPath);
    tabbarStore.setRefreshRoute('salesForecastingList');
    close();
  };

  onDeactivated(() => {
    formRef.value.resetFields();
    Object.keys(formData.value).forEach((key) => {
      formData.value[key] = undefined;
    });
    selectedSkuList.value = [];
  });

  const close = () => {
    selectedSkuList.value = [];
    formRef.value.resetFields();
    closeTabByKey(route.fullPath);
    router.push({
      name: 'salesForecastingList',
      query: {
        tab: 'retail',
      },
    });
  };
</script>

<style scoped lang="scss">
  .required-dot::before {
    content: '*';
    color: var(--el-color-danger);
    margin-right: -6px;
  }
  .titleTip {
    display: flex;
    align-items: center;
    position: absolute;
    top: 28px;
    left: 130px;
    color: #ababb2;
    margin-bottom: 0;
  }
</style>
