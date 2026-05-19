<template>
  <el-dialog
    v-model="visible"
    :destroy-on-close="true"
    :title="`物流索赔单日志`"
    width="900px"
    :close-on-click-modal="false"
    @closed="handleClosed"
  >
    <vxe-table :data="list">
      <vxe-column field="operateType" title="操作类别" width="100"/>
      <vxe-column field="operateContent" title="操作内容">
        <template #default="{ row }">
          <el-tooltip
            placement="top"
            popper-class="logistics-claim-tooltip-wrap"
            :content="row.operateContent"
          >
            <div class="text-tooltip">
              {{ row.operateContent }}
            </div>
          </el-tooltip>
        </template>
      </vxe-column>
      <vxe-column v-if="false" field="operateEntry" title="操作入口"/>
      <vxe-column field="operateTime" title="操作时间"  width="160"/>
      <vxe-column field="operator" title="操作人" width="120"/>
    </vxe-table>
    <template #footer>
      <el-space>
        <el-button @click="visible = false">关闭</el-button>
      </el-space>
    </template>
  </el-dialog>
</template>

<script setup lang="ts">
  import { erpApi } from "@/api";

  const emit = defineEmits(['success']);

  const row = ref(null);
  const visible = ref(false);
  const list = ref([])

  const handleClosed = () => {
    visible.value = false;
  };

  const open = (_row) => {
    row.value = _row;
    visible.value = true;
    list.value = []
    if (_row.id) {
      erpApi.luteosErpLogisticsClaimLogs({ id: _row.id }).then(res => {
        list.value = res
      })
    }
  };

  // 暴露方法给父组件使用
  defineExpose({
    open,
  });
</script>

<style scoped lang="scss">
  .text-tooltip {
    display: -webkit-box;
    -webkit-line-clamp: 3;
    -webkit-box-orient: vertical;
    overflow: hidden;
    text-overflow: ellipsis;
    word-wrap: break-word;
    word-break: break-all;
  }
</style>