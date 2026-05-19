<template>
  <el-dialog title="详情" v-model="visible" @close="visible = false" width="65%" align-center>
    <h5>装箱信息</h5>
    <el-table :data="detailInfo?.packageItems" max-height="70vh">
      <el-table-column label="箱号" prop="boxNumber" />
      <el-table-column label="ASIN" prop="asin" />
      <el-table-column label="SellerSKU" prop="sellerSku" />
      <el-table-column label="供应链SKU" prop="warehouseSku" />
      <el-table-column label="产品名称" prop="title" />
      <el-table-column label="数量" prop="warehouseQty" width="80" />
      <el-table-column label="重量（KG）" prop="perBoxWeight" />
      <el-table-column label="尺寸（CM）" prop="boxSize" />
      <el-table-column label="体积（m³）" prop="volume" />
      <template #append>
        <div class="d-flex justify-content-end gap-7">
          <span>
            SKU种类：
            <span class="fw-bold">
              {{ detailInfo?.skuCount }}
            </span>
          </span>
          <span>
            装箱量：
            <span class="fw-bold">
              {{ detailInfo?.totalSkuQty }}
            </span>
          </span>
          <span>总箱数： {{ detailInfo?.totalBoxQty }}</span>
          <span>
            重量（KG）：
            <span class="fw-bold">
              {{ detailInfo?.totalWeight }}
            </span>
          </span>
          <span>
            体积（m³）：
            <span class="fw-bold">
              {{ detailInfo?.totalVolume }}
            </span>
          </span>
        </div>
      </template>
    </el-table>
  </el-dialog>
</template>

<script setup lang="ts">
  const visible = ref(false);

  const detailInfo = ref([]);
  const open = (data) => {
    detailInfo.value = data;
    visible.value = true;
  };

  defineExpose({
    open,
  });
</script>

<style scoped lang="scss"></style>
