<template>
  <el-dialog
    title="创建产品与供应商映射码"
    :model-value="visible"
    @close="handleClose"
    width="700px"
  >
    <el-form ref="formRef" :model="form" :rules="rules" label-position="left" label-width="120px">
      <el-form-item label="产品SKU：" prop="skuCodeList">
        <el-button type="primary" @click="addGoods" size="small">选择商品</el-button>
        <div class="product-desc" v-if="productListDesc">{{ productListDesc }}</div>
      </el-form-item>
      <el-form-item label="供应商代码：" prop="supplierCode">
        <el-select v-model="form.supplierCode" filterable placeholder="请选择供应商代码">
          <el-option
            v-for="supplier in supplierList"
            :key="supplier.supplierCode"
            :label="`${supplier.supplierCode}-${supplier.supplierName}`"
            :value="supplier.supplierCode"
          />
        </el-select>
      </el-form-item>
    </el-form>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="handleClose">取消</el-button>
        <el-button type="primary" @click="submitFn" :loading="saveLoading">确定</el-button>
      </span>
    </template>
  </el-dialog>

  <BindSku
    v-if="bindGoodsVisible"
    ref="bindGoodsRef"
    :visible="bindGoodsVisible"
    @close="handleBindGoodsClose"
    :selected-rows="productBeanList"
    confirmText="确认"
  />
</template>

<script setup lang="ts">
  import { productApi, supplierApi } from '@/api/index';
  import { ElMessage } from 'element-plus';
  import BindSku from '@/views/goodscenter/bindGoods/Modal/bindSku.vue';

  const props = withDefaults(
    defineProps<{
      visible: boolean;
    }>(),
    {
      visible: false,
    }
  );
  const form = ref({
    skuCodeList: [],
    supplierCode: '',
  });

  const rules = ref({
    skuCodeList: [{ required: true, message: '请选择产品SKU', trigger: ['blur', 'change'] }],
    supplierCode: { required: true, message: '请选择供应商代码', trigger: ['blur', 'change'] },
  });

  const supplierList = ref([]);
  const querySupplierList = () => {
    supplierApi.luteosSupplierQuerySupplierList({}).then((res) => {
      supplierList.value = res.encryptSupplierList || [];
    });
  };
  querySupplierList();

  // 选择商品
  const bindGoodsRef = ref();
  const addGoods = () => {
    bindGoodsVisible.value = true;
    nextTick(() => {
      bindGoodsRef.value.open();
    });
  };
  const bindGoodsVisible = ref(false);
  const productBeanList = ref([]);

  const handleBindGoodsClose = async (reload = false, val) => {
    if (reload) {
      form.value.skuCodeList = val.map((item) => item.skuCode);
      productBeanList.value = val;
    }
    bindGoodsVisible.value = false;
    formRef.value.validateField('skuCodeList');
  };
  //  关联商品描述
  const productListDesc = computed(() => {
    if (productBeanList.value && productBeanList.value.length) {
      let desc = '';
      productBeanList.value.forEach((item, index) => {
        desc += `${item.productTitle}`;
        if (index !== productBeanList.value.length - 1) {
          desc += '、';
        }
      });
      return desc;
    }
  });

  const formRef = ref();
  const saveLoading = ref(false);
  const submitFn = async () => {
    const valid = await formRef.value?.validate().catch(() => {
      return false; // 校验失败返回 false，不继续执行
    });
    if (valid) {
      saveLoading.value = true;
      await productApi
        .luteosProductSkuSnSaveSkuSn({
          ...form.value,
        })
        .finally(() => {
          saveLoading.value = false;
        });
      ElMessage.success('保存成功');
      emit('close', true);
    }
  };

  const emit = defineEmits<{
    (event: 'close', r?: boolean): void;
  }>();

  const handleClose = () => {
    emit('close');
  };
</script>

<style lang="scss" scoped>
  .product-desc {
    width: 100%;
    line-height: 25px;
    margin-top: 10px;
  }
</style>
