<template>
  <el-dialog title="设置仓库物流" v-model="visible" @close="visible = false">
    <el-form ref="formRef" :model="form" :rules="rules">
      <el-form-item label="发货仓库" prop="warehouseCode">
        <template v-if="erpCodelist.length > 1">
          <el-col :span="24">
            <OmsWarehouseSelect
              v-model="form.warehouseCode"
              teleported
              @change="form.shippingCode = ''"
            />
          </el-col>
        </template>
        <template v-else>
          <!-- <el-row> -->
          <div class="d-flex w-100">
            <!-- <el-col :span="22"> -->
            <div style="flex: 1">
              <OmsWarehouseSelect
                v-model="form.warehouseCode"
                teleported
                @change="form.shippingCode = ''"
              />
            </div>
            <!-- </el-col> -->
            <!-- <el-col :span="2" style="padding: 0 10px"> -->
            <div style="flex-shrink: 0; width: 90px; padding-left: 8px">
              <el-button type="primary" plain @click="handleShowDetail">仓库明细</el-button>
            </div>
            <!-- </el-col> -->
          </div>
        </template>
        <!-- </el-row> -->
      </el-form-item>
      <el-form-item label="物流渠道" prop="shippingCode">
        <OmsShippingSelect
          v-model="form.shippingCode"
          :warehouse-code="form.warehouseCode"
          teleported
          @sp-change="
            (val) => {
              spCode = val;
            }
          "
        />
      </el-form-item>
    </el-form>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="visible = false">取消</el-button>
        <el-button type="primary" @click="save" v-loading="saveLoading">确认</el-button>
      </span>
    </template>
  </el-dialog>
  <ResultDialog ref="resultDialogRef" />
  <StockDialog
    :searchErpQuotation="true"
    v-if="productDialogVisible"
    :visible="productDialogVisible"
    @close="handleProductDialogClose"
    :selected-rows="form.itemInfoList"
    confirm-text="确认"
    title="仓库明细"
    :sku="selectSku"
    type="supplierSku"
  />
</template>

<script setup lang="ts">
  import { omsApi } from '@/api';
  import { ElMessage } from 'element-plus';
  import StockDialog from '@/views/supplyChainManage/B2BOrder/shopifyOrder/components/stockDialog.vue';
  import ResultDialog from '@/views/supplyChainManage/B2BOrder/orderManage/components/ResultDialog.vue';
  import OmsShippingSelect from '@/views/supplyChainManage/B2BOrder/shopifyOrder/components/omsShippingSelectUnique.vue';

  const props = withDefaults(
    defineProps<{
      sku?: any;
    }>(),
    {}
  );
  const selectSku = ref();

  const emit = defineEmits<{
    (event: 'success'): void;
  }>();

  const productDialogVisible = ref(false);
  const handleShowDetail = (val?) => {
    // console.log('handleShowDetail', val);
    productDialogVisible.value = true;
  };

  // 选择商品
  const handleProductDialogClose = async (selected: boolean, val) => {
    console.log(val, 'val');
    if (selected) {
      productDialogVisible.value = false;
      form.value.warehouseCode = val;
    } else {
      productDialogVisible.value = false;
    }
  };

  const visible = ref(false);
  const formRef = ref();
  const form = ref({
    warehouseCode: '',
    shippingCode: '',
  });
  const rules = ref({
    warehouseCode: [
      {
        required: true,
        message: '请选择仓库',
        trigger: 'change',
      },
    ],
    shippingCode: [
      {
        required: true,
        message: '请选择物流渠道',
        trigger: 'change',
      },
    ],
  });

  const spCode = ref('');
  const erpCodelist = ref([]);
  const resultDialogRef = ref();
  const saveLoading = ref(false);
  const save = async () => {
    const isValid = await formRef.value?.validate().catch(() => false);
    if (!isValid) return;
    try {
      saveLoading.value = true;
      const params = JSON.parse(
        JSON.stringify({
          ...form.value,
          spCode: spCode.value,
          erpCodeList: erpCodelist.value,
        })
      );
      params.shippingCode = params.shippingCode.split(',')?.[1];
      const res = await omsApi.omsFulfillmentOrderUpdateWarehouseLogistics(params);
      if (res?.failList?.length) {
        resultDialogRef.value?.open(res?.failList, '设置仓库物流');
      } else {
        ElMessage.success('设置仓库物流成功');
      }
      emit('success');
      visible.value = false;
    } finally {
      saveLoading.value = false;
    }
  };

  const open = (codeList, row?) => {
    // console.log(codeList, row);
    if (row) {
      selectSku.value = row;
    }
    formRef.value?.resetFields();
    erpCodelist.value = codeList;
    visible.value = true;
  };

  defineExpose({
    open,
  });
</script>

<style scoped lang="scss"></style>
