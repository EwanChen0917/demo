<template>
  <el-dialog width="900px" title="推送详情" v-model="visible" @close="visible = false" align-center>
    <el-form label-position="top">
      <el-row>
        <el-col :span="12">
          <el-form-item label="收款单号">{{ data?.code || '-' }}</el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="金蝶同名转账单号">
            {{ data?.kingdeeTransferOrderCode || '-' }}
          </el-form-item>
        </el-col>
      </el-row>
      <el-form-item label="推送内容">
        <div class="push-content">
          <CodeViwer :content="data?.pushInfo" />
          <pre v-if="false">{{ JSON.stringify(JSON.parse(data?.pushInfo), null, 2) }}</pre>
        </div>
      </el-form-item>
    </el-form>
  </el-dialog>
</template>

<script setup lang="ts">
  import CodeViwer from '@/views/finance/pushMonitor/components/CodeViwer.vue';

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
