<template>
  <el-dialog
    :title="`发货日志#${info.code}`"
    :model-value="visible"
    @close="visible = false"
    width="65%"
  >
    <el-table :data="logList">
      <el-table-column label="发货单号" prop="code" />
      <el-table-column label="入库单号" prop="rcode" />
      <el-table-column label="创建时间" prop="codeCreateTime" />
      <el-table-column label="出库时间" prop="codeOutTime" />
      <el-table-column label="预计到货时间" prop="expectedReceiveTime" />
      <el-table-column label="发货数量" prop="sendNum" width="100" />
    </el-table>
  </el-dialog>
</template>

<script setup lang="ts">
  import { erpApi } from '@/api';

  const visible = ref(false);

  const info = ref({});
  const logList = ref([]);
  const querySendLogList = async () => {
    const res = await erpApi.luteosErpFirstVesselTimelinessQuerySendLogList({
      code: info.value.code,
    });
    logList.value = res?.recordList || [];
  };

  const open = (data) => {
    info.value = data;
    querySendLogList();
    visible.value = true;
  };

  defineExpose({
    open,
  });
</script>

<style scoped lang="scss"></style>
