<template>
  <el-select
    v-model="supplierCode"
    placeholder="请选择物流商"
    filterable
    :clearable="clearable"
    :remote="true"
    :remote-method="getSuppliers"
    :loading="loading"
    :filter-method="
      (query) => {
        getSuppliers(query);
      }
    "
    :teleported="teleported"
    :multiple="multiple"
    :max-collapse-tags="maxCollapseTags"
    collapse-tags
    collapse-tags-tooltip
  >
    <el-option
      v-for="item in suppliers"
      :key="item.id"
      :label="item.supplierName"
      :value="item.supplierCode"
    />
  </el-select>
</template>

<script setup lang="ts">
  import { ref } from 'vue';
  import { erpApi } from '@/api';

  const props = withDefaults(
    defineProps<{
      placeholder?: string;
      clearable?: boolean;
      multiple?: boolean;
      maxCollapseTags?: number;
      teleported?: boolean;
      valueKey?: string;
    }>(),
    {
      placeholder: '请选择',
      clearable: true,
      multiple: false,
      maxCollapseTags: 1,
      teleported: false,
      valueKey: 'supplierCode',
    }
  );
  const supplierCode = ref();
  const suppliers = ref();
  const loading = ref(false);

  const getSuppliers = async (keyword: string) => {
    loading.value = true;
    const res = await erpApi.luteosErpLogisticsSupplierQueryList({
      pageSize: 100,
      pageNum: 1,
      status: 1,
      supplierName: keyword,
    });
    suppliers.value = res.recordList?.filter((item: any) => item.supplierType === 'supplier_first');
    loading.value = false;
  };

  onMounted(() => {
    getSuppliers('');
  });
</script>

<style scoped lang="scss"></style>
