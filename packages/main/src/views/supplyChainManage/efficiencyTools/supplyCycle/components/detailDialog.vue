<template>
  <el-dialog title="详情" v-model="visibility" width="800px" :before-close="close">
    <el-form :model="detailInfo" ref="formRef" label-position="left" label-width="120px">
      <el-row>
        <el-col :span="24" :offset="0">
          <el-form-item label="供应链SKU">
            {{ detailInfo?.supplySku }}
          </el-form-item>
        </el-col>
        <el-col :span="24" :offset="0">
          <el-form-item label="渠道">
            {{ detailInfo?.channelDesc }}
          </el-form-item>
        </el-col>
        <el-col :span="24" :offset="0">
          <el-form-item label="站点">
            {{ detailInfo?.countryDesc }}
          </el-form-item>
        </el-col>
        <el-col :span="24" :offset="0">
          <el-form-item label="在线商品">
            {{ detailInfo?.originalPlatformMark }}
          </el-form-item>
        </el-col>
        <el-col :span="12" :offset="0">
          <el-form-item label="供应商交期">{{ detailInfo?.supplierHandleOverDay }}天</el-form-item>
        </el-col>
        <el-col :span="12" :offset="0">
          <el-form-item label="订单处理时间">{{ detailInfo?.orderHandleOverDay }}天</el-form-item>
        </el-col>
        <el-col :span="12" :offset="0">
          <el-form-item label="国内运输时间">{{ detailInfo?.domesticShipDay }}天</el-form-item>
        </el-col>
        <el-col :span="12" :offset="0">
          <el-form-item label="验货+入库时间">{{ detailInfo?.qcHandleDay }}天</el-form-item>
        </el-col>
        <el-col :span="12" :offset="0">
          <el-form-item label="海外物流时间">{{ detailInfo?.seaOverDay }}天</el-form-item>
        </el-col>
        <el-col :span="12" :offset="0">
          <el-form-item label="接收上架时间">{{ detailInfo?.receiveListingDay }}天</el-form-item>
        </el-col>
        <el-col :span="12" :offset="0">
          <el-form-item label="周转+安全库存">{{ detailInfo?.trunOverDay }}天</el-form-item>
        </el-col>
        <el-col :span="12" :offset="0">
          <el-form-item label="总供应周期">{{ detailInfo?.totalCycle }}天</el-form-item>
        </el-col>
      </el-row>
    </el-form>
  </el-dialog>
</template>

<script setup lang="ts">
  const visibility = ref(false);

  const detailInfo = ref();
  const open = (data) => {
    detailInfo.value = data;
    visibility.value = true;
  };

  defineExpose({
    open,
  });
</script>

<style scoped lang="scss"></style>
