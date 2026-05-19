<template>
  <div class="address-detail">
    <el-form label-position="right" label-width="80px">
      <el-form-item label="姓名">
        <span>{{ row?.buyerName || '-' }}</span>
      </el-form-item>
      <el-form-item label="邮箱">
        <span>{{ row?.buyerEmail || '-' }}</span>
      </el-form-item>
      <el-form-item label="电话">
        <span>{{ row?.buyerPhone || '-' }}</span>
      </el-form-item>
      <el-form-item label="手机号">
        <span>{{ row?.buyerMobile || '-' }}</span>
      </el-form-item>
      <el-form-item label="税号">
        <span>{{ row?.taxId || '-' }}</span>
      </el-form-item>
      <el-form-item label="国家/地区">
        <span>{{ row?.buyerCountryDesc || '-' }}</span>
      </el-form-item>
      <el-form-item label="省/州">
        <span>{{ row?.buyerProvince || '-' }}</span>
      </el-form-item>
      <el-form-item label="邮编">
        <span>{{ row?.buyerZipcode || '-' }}</span>
      </el-form-item>
      <el-form-item label="城市">
        <span>{{ row?.buyerCity || '-' }}</span>
      </el-form-item>
      <el-form-item label="区县">
        <span>{{ row?.area || '-' }}</span>
      </el-form-item>
      <el-form-item label="街道">
        <span>{{ row?.buyerStreet || '-' }}</span>
      </el-form-item>
      <el-form-item label="门牌号">
        <span>{{ row?.buyerHouseNumber || '-' }}</span>
      </el-form-item>
      <!-- <el-form-item label="详细地址">
        <span>{{ row?.buyerAddress }}{{ row?.buyerAddress2 }}</span>
      </el-form-item> -->
      <el-form-item label="详细地址1">
        <span>{{ row?.buyerAddress || '-' }}</span>
      </el-form-item>
      <el-form-item label="详细地址2">
        <span>{{ row?.buyerAddress2 || '-' }}</span>
      </el-form-item>
    </el-form>
  </div>
</template>

<script setup lang="ts">
  const props = defineProps<{
    row: any;
  }>();
</script>

<style scoped lang="scss">
  .address-detail {
    padding: 16px;
  }
  :deep(.el-form-item) {
    margin-bottom: 0;
    .el-form-item__label,
    .el-form-item__content {
      height: 20px;
      line-height: 20px;
      font-size: 12px;
    }
    & + .el-form-item {
      margin-top: 4px;
    }
  }
</style>
