<template>
  <el-dialog width="75%" :title="title" v-model="visible" @close="visible = false" align-center>
    <el-table :data="detailList" max-height="65vh">
      <el-table-column label="商品标题" prop="title" min-width="200" />
      <el-table-column label="产品SKU" prop="skuCode" />
      <el-table-column label="产品名称" prop="skuName" min-width="180" />
      <el-table-column label="MSKU" prop="msku" />
      <el-table-column label="子ASIN" prop="asin" />
      <el-table-column label="父ASIN" prop="parentAsin" />
      <el-table-column label="店铺" prop="shop" />
      <el-table-column label="站点" prop="site" />
      <el-table-column label="销售状态" prop="skuState" />
      <el-table-column label="运营人员" prop="operator" />
      <el-table-column label="gtm小组" prop="gtm" />
    </el-table>
  </el-dialog>
</template>

<script setup lang="ts">
  import { productApi } from '@/api';

  const visible = ref(false);
  const title = ref('明细');

  const detailList = ref([]);
  const queryDetail = async (row) => {
    const res = await productApi.luteosProductAmazonOperatorCheckQueryDetail({
      site: row?.site,
      spuCode: row?.spuCode,
    });
    detailList.value = res || [];
  };

  const open = (row) => {
    queryDetail(row);
    visible.value = true;
  };

  defineExpose({
    open,
  });
</script>

<style scoped lang="scss"></style>
