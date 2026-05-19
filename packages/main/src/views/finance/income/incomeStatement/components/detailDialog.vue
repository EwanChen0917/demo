<template>
  <el-dialog width="900px" title="推送详情" v-model="visible" @close="visible = false" align-center>
    <el-form label-position="top">
      <el-row>
        <el-col :span="12">
          <el-form-item label="结算单号">{{ data?.code || '-' }}</el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="金蝶销售出库单号">
            {{ data?.kingdeeOutStockCode || '-' }}
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="金蝶应收单号">
            {{ data?.kingdeeBillReceivableCode || '-' }}
          </el-form-item>
        </el-col>
      </el-row>
      <el-form-item label="推送内容">
        <div class="push-content">
          <pre>{{ JSON.stringify(JSON.parse(data?.pushInfo), null, 2) }}</pre>
        </div>
      </el-form-item>
    </el-form>
  </el-dialog>
</template>

<script setup lang="ts">
  const visible = ref(false);

  const data = ref();
  const open = (row) => {
    data.value = row;
    visible.value = true;
  };

  defineExpose({
    open,
  });
</script>

<style scoped lang="scss">
  .push-content {
    width: 100%;
    max-height: 45vh;
    overflow-y: auto;
  }
</style>
