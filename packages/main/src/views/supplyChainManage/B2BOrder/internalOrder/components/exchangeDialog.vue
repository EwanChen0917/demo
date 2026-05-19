<template>
  <el-dialog title="换货" v-model="visible" @close="visible = false">
    <el-form :model="form" ref="formRef">
      <el-table :data="form.listData">
        <el-table-column label="产品名称" prop="productName" />
        <el-table-column label="供应链SKU" prop="supplySku">
          <template #default="{ row }">
            <div>{{ row?.supplySku }}</div>
            <div class="fs-7">库存：{{ row?.inventory }}</div>
          </template>
        </el-table-column>
        <el-table-column label="换货SKU" prop="exchangeSku">
          <template #default="{ row, $index }">
            <el-form-item>
              <el-select
                v-model="row.productSku"
                filterable
                remote
                clearable
                :remote-method="querySupplySkuList"
                :loading="loading"
                placeholder="请输入换货SKU"
              >
                <el-option
                  v-for="item in supplySkuList"
                  :key="item.productSku"
                  :value="item.productSku"
                  :label="`${item.productSku} 《${item.productTitle}》`"
                />
              </el-select>
            </el-form-item>
          </template>
        </el-table-column>
      </el-table>
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
  import { erpApi, productApi } from '@/api';
  import * as swal from '@/utils/swal';

  const emit = defineEmits('success');

  const visible = ref(false);
  const code = ref();

  const form = ref({
    listData: [],
  });
  const formRef = ref(null);

  const saveLoading = ref(false);
  const save = async () => {
    const isValid = await formRef.value?.validate().catch(() => {
      return false; // 校验失败返回 false，不继续执行
    });
    if (!isValid) return;
    const isConfirmed = await swal.confirm('确定换货吗？');
    if (!isConfirmed) return;
    try {
      saveLoading.value = true;
      await erpApi.luteosErpOrderChangeSku({
        code: code.value,
        itemBeanList: form.value.listData?.map((item) => {
          return {
            ...item,
            supplySku: item.productSku || item.supplySku,
          };
        }),
      });
      emit('success');
      visible.value = false;
    } finally {
      saveLoading.value = false;
    }
  };

  const supplySkuList = ref([]);
  const loading = ref(false);
  const querySupplySkuList = async (query: string) => {
    if (!query) return;
    try {
      loading.value = true;
      const res = await productApi.luteosProductSupplySkuQuerySupplySkuList({
        keyword: query,
      });
      supplySkuList.value = res?.supplySkuList;
    } finally {
      loading.value = false;
    }
  };

  const open = (list, erpCode) => {
    form.value.listData = list?.map((item) => {
      return {
        ...item,
        productSku: '',
      };
    });
    code.value = erpCode;
    visible.value = true;
    formRef.value?.resetFields();
  };

  defineExpose({
    open,
  });
</script>

<style scoped lang="scss"></style>
