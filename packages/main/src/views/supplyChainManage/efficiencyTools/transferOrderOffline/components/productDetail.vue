<template>
  <el-table ref="productTable" :data="data">
    <el-table-column label="图片" width="80">
      <template #default="{ row }">
        <el-image
          v-if="row.productImageUrl"
          :src="row.productImageUrl"
          style="width: 50px; height: 50px"
          fit="cover"
        />
        <span v-else>-</span>
      </template>
    </el-table-column>
    <el-table-column label="产品名称/产品SKU" prop="productName" min-width="150">
      <template #default="{ row }">
        <span>{{ row.productName }} / {{ row.skuCode }}</span>
      </template>
    </el-table-column>
    <el-table-column label="供应链SKU" prop="supplySku" min-width="120" />
    <el-table-column label="产品类型" prop="productTypeDesc" min-width="100" />
    <el-table-column label="英文报关名" prop="declareNameEn" min-width="120" />
    <el-table-column label="调拨数量" prop="quantity" min-width="120" />
    <el-table-column label="明细备注" prop="remark" min-width="150" />
  </el-table>
</template>

<script setup lang="ts">
  import { unBoxProduct } from '../type';

  const props = defineProps<{
    data: unBoxProduct[];
  }>();
</script>

<style scoped lang="scss"></style>
