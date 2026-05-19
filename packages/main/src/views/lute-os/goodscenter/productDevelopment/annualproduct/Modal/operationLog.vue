<template>
  <el-drawer
    title="操作日志"
    v-model="visibility"
    direction="rtl"
    size="600px"
    :destroy-on-close="true"
    :show-close="true"
    :wrapperClosable="true"
    @open="fetchData"
  >
    <el-timeline v-loading="fetchLoading">
      <el-timeline-item
        placement="top"
        v-for="(item, index) in operationLogs"
        :key="index"
        :timestamp="item.operationTime + `&nbsp;&nbsp;&nbsp;&nbsp;更新人：${item.operatorName}`"
      >
        <el-card>
          <h5>更新内容：</h5>
          <el-row v-for="content in item.operationContent" :key="content.field">
            <el-col :span="7">
              <span>【{{ content?.fieldName }}】</span>
            </el-col>
            <el-col :span="8">
              <span>由：{{ content?.oldValue }}</span>
            </el-col>
            <el-col :span="8">
              <span>修改为：{{ content?.newValue }}</span>
            </el-col>
          </el-row>
        </el-card>
      </el-timeline-item>
    </el-timeline>
    <el-empty v-if="!operationLogs.length" description="暂无操作日志" />
  </el-drawer>
</template>

<script setup lang="ts">
  import { pdtApi } from '@/api';

  const props = defineProps<{
    productCode: string;
  }>();
  const emits = defineEmits<{ (e: 'update:modelValue', val: boolean): void }>();
  const visibility = computed({
    get() {
      return props.modelValue;
    },
    set(val: boolean) {
      emits('update:modelValue', val);
    },
  });
  const fetchLoading = ref(false);
  const operationLogs = ref<any[]>([]);
  const fetchData = async () => {
    fetchLoading.value = true;
    operationLogs.value = [];
    const res = await pdtApi
      .luteosPdtQueryOperationLog({
        productCode: props.productCode,
      })
      .finally(() => {
        fetchLoading.value = false;
      });
    operationLogs.value = res.operationRespList?.map((item) => {
      return {
        operationTime: item?.createTime,
        operatorName: item?.operatorName,
        operationContent: JSON.parse(item.itemContent),
      };
    });
    console.log(operationLogs.value);
  };
</script>

<style scoped lang="scss">
  :deep(.el-timeline-item__timestamp) {
    color: var(--bs-text-primary) !important;
  }
</style>
