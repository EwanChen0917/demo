<template>
  <el-dialog
    :title="`SKU明细#${fbaId}`"
    :model-value="visible"
    @close="visible = false"
    width="65%"
  >
    <el-link
      type="primary"
      :underline="false"
      @click="editSkuDialogRef?.open(fbaId, skuDetailList)"
    >
      编辑
    </el-link>
    <el-table :data="skuDetailList" max-height="60vh">
      <el-table-column type="expand">
        <template #default="{ row }">
          <div class="ps-20">
            <el-table :data="row?.cartonList">
              <el-table-column label="箱号" prop="cartonNo" />
              <el-table-column label="数量" prop="quantity" />
              <el-table-column label="长" prop="length" />
              <el-table-column label="宽" prop="width" />
              <el-table-column label="高" prop="height" />
              <el-table-column label="材积" prop="volume" />
              <el-table-column label="实重" prop="weight" />
              <el-table-column label="材积重" prop="volumeWeight" />
              <el-table-column label="体积" prop="volumeInCubicMeter" />
              <el-table-column label="预计计费重" prop="expectedBillingWeight" />
            </el-table>
          </div>
        </template>
      </el-table-column>
      <el-table-column label="供应链SKU" prop="productSku" min-width="160" />
      <el-table-column label="产品名称" prop="productName" min-width="200" />
      <el-table-column label="品线" prop="productLineName" />
      <el-table-column label="箱数" prop="cartonNum" />
      <el-table-column label="单箱重量" prop="singleCartonWeight" />
      <el-table-column label="平台签收数量" prop="receiptQuantity" />
      <el-table-column label="平台签收日期" prop="receiptDate" />
      <!--      <el-table-column label="数量" prop="quantity" />
      <el-table-column label="单行重量" prop="unitWeight" />
      <el-table-column label="长" prop="length" />
      <el-table-column label="宽" prop="width" />
      <el-table-column label="高" prop="height" />
      <el-table-column label="材积" prop="volume" />
      <el-table-column label="实重" prop="actualWeight" />
      <el-table-column label="材积重" prop="volumeWeight" />-->
      <!--动态列-->
      <el-table-column
        width="140px"
        :label="column.uploadDate"
        :key="column.uploadDate"
        v-for="(column, index) of skuDetailList?.[0]?.upLoadBeanList"
      >
        <template #default="{ $index }">
          {{ skuDetailList?.[$index]?.upLoadBeanList[index]?.uploadQty || '' }}
        </template>
      </el-table-column>
    </el-table>
  </el-dialog>
  <EditSkuDialog ref="editSkuDialogRef" @success="queryDetailList(fbaId)" />
</template>

<script setup lang="ts">
  import { erpApi } from '@/api';
  import EditSkuDialog from '@/views/supplyChainManage/efficiencyTools/logisticsTracking/components/editSkuDialog.vue';

  const visible = ref(false);

  const editSkuDialogRef = ref();

  const skuDetailList = ref([]);
  const queryDetailList = async (fbaId) => {
    const res = await erpApi.luteosErpV2FirstLogisticsQuerySkuDetail({ fbaId });
    skuDetailList.value = res?.skuDetailList;
  };

  const fbaId = ref();
  const open = (id) => {
    fbaId.value = id;
    queryDetailList(id);
    visible.value = true;
  };

  defineExpose({
    open,
  });
</script>

<style scoped lang="scss"></style>
