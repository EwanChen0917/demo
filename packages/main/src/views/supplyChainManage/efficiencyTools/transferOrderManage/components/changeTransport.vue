<template>
  <el-dialog
    title="批量修改物流方式"
    width="400"
    :model-value="visible"
    :close-on-click-modal="false"
    @close="visible = false"
    class="custom-dialog"
  >
    <el-space :size="10">
      <span>物流方式</span>
      <TransportSelect
        v-model="batchTransportCode"
        :query-source="true"
        clearable
        teleported
        style="width: 200px"
        @change-with-label="batchTransportCode = $event"
      />
    </el-space>
    <template #footer>
      <el-button @click="visible = false">取消</el-button>
      <el-button type="primary" @click="updateTransport" :loading="loading">确定</el-button>
    </template>
  </el-dialog>
</template>

<script lang="ts" setup>
  import { ElMessage } from 'element-plus';
  import { erpApi } from '@/api';
  import TransportSelect from '@/views/supplyChainManage/efficiencyTools/logisticsChannel/components/TransportSelect.vue';

  const emit = defineEmits<{
    (event: 'updateTransport'): void;
  }>();

  const visible = ref(false);
  const batchTransportCode = ref();
  const totalList = ref<any[]>([]);
  const loading = ref(false);
  const updateTransport = async () => {
    try {
      if (!batchTransportCode.value) {
        ElMessage.warning('请选择物流方式');
        return;
      }
      loading.value = true;
      const params = totalList.value.map((item) => {
        return {
          transportName: batchTransportCode.value.label,
          transportId: batchTransportCode.value.value,
          transferId: item.transferId,
        };
      });

      await erpApi.luteosErpOrderTransferUpdateTransport(params);
      visible.value = false;
      ElMessage.success('批量修改物流方式成功');
      emit('updateTransport');
    } finally {
      loading.value = false;
    }
  };
  const open = (val) => {
    batchTransportCode.value = undefined;
    visible.value = true;
    totalList.value = val;
  };

  defineExpose({
    open,
  });
</script>
