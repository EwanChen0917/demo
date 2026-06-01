<template>
  <el-dialog title="编辑" v-model="visible" @close="visible = false">
    <el-form ref="formRef" :model="form" :rules="rules" label-width="130px" label-position="left">
      <el-form-item label="产品SKU">
        <span>{{ form?.skuCode }}</span>
      </el-form-item>
      <el-form-item label="产品名称">
        <span>{{ form?.productName }}</span>
      </el-form-item>
      <el-form-item label="渠道">
        <span>{{ form?.channel }}</span>
      </el-form-item>
      <el-form-item label="站点">
        <span>{{ form?.site }}</span>
      </el-form-item>
      <el-form-item label="默认店铺" prop="shop">
        <el-select v-model="form.shop" placeholder="请选择默认店铺" @change="handleShopChange">
          <el-option
            v-for="item in form.skuShopList"
            :key="item.shop"
            :label="item.shop"
            :value="item.shop"
          />
        </el-select>
      </el-form-item>
      <el-form-item :label="`默认${labelMap[form?.channel]}`" prop="asin">
        <el-select
          v-model="form.asin"
          :placeholder="`请选择默认${labelMap[form?.channel]}`"
          @change="handleAsinChange"
        >
          <el-option
            v-for="item in form.skuShopList?.find((k) => k.shop === form.shop)?.asin"
            :key="item.asin"
            :label="item.asin"
            :value="item.asin"
          />
        </el-select>
      </el-form-item>
      <el-form-item label="默认店铺SKU" prop="sellerSku">
        <el-select v-model="form.sellerSku" placeholder="请选择默认店铺SKU">
          <el-option
            v-for="item in form.skuShopList
              ?.find((k) => k.shop === form.shop)
              ?.asin?.find((k) => k.asin === form.asin)?.sellerSkuList"
            :key="item"
            :label="item"
            :value="item"
          />
        </el-select>
      </el-form-item>
    </el-form>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="visible = false">取消</el-button>
        <el-button type="primary" @click="save" v-loading="saveLoading">确认</el-button>
      </span>
    </template>
  </el-dialog>
</template>

<script setup lang="ts">
  import { erpApi } from '@/api';
  import { ElMessage } from 'element-plus';
  import { cloneDeep } from 'lodash-es';

  const emit = defineEmits(['success']);

  const labelMap = {
    amazon: 'ASIN',
    shopify: 'MSKU',
    walmart: 'Item ID',
    tiktok: 'MSKU',
    mercadocbt: 'MSKU',
  };

  const visible = ref(false);

  const formRef = ref();
  const form = ref({
    shop: '',
    asin: '',
    id: '',
    sellerSku: '',
    skuCode: '',
  });

  const rules = reactive({
    shop: [{ required: true, message: '请选择默认店铺', trigger: 'change' }],
    asin: [{ required: true, message: '请输入默认ASIN', trigger: 'blur' }],
    sellerSku: [{ required: true, message: '请输入默认店铺SKU', trigger: 'blur' }],
  });

  const saveLoading = ref(false);
  const save = async () => {
    const valid = await formRef.value?.validate().catch(() => {
      return false; // 校验失败返回 false，不继续执行
    });
    if (!valid) return;
    try {
      saveLoading.value = true;
      await erpApi.luteosErpPlanPsfpcSaveOrUpdate(form.value);
      ElMessage.success('保存成功');
      emit('success');
      visible.value = false;
    } finally {
      saveLoading.value = false;
    }
  };

  const handleShopChange = (shop) => {
    if (
      !form.value.skuShopList
        ?.find((k) => k.shop === shop)
        ?.asin?.find((k) => k.asin === form.value.asin)
    ) {
      form.value.asin = '';
    }

    if (
      !form.value.skuShopList
        ?.find((k) => k.shop === shop)
        ?.asin?.find((k) => k.asin === form.value.asin)
        ?.sellerSkuList?.find((k) => k.sellerSku === form.value.sellerSku)
    )
      form.value.sellerSku = '';
  };

  const handleAsinChange = (asin) => {
    if (
      !form.value.skuShopList
        ?.find((k) => k.shop === form.value.shop)
        ?.asin?.find((k) => k.asin === asin)
        ?.sellerSkuList?.find((k) => k.sellerSku === form.value.sellerSku)
    )
      form.value.sellerSku = '';
  };

  const open = (row) => {
    visible.value = true;
    formRef.value?.resetFields();
    form.value = {
      ...row,
    };
  };

  defineExpose({
    open,
  });
</script>

<style scoped lang="scss"></style>
