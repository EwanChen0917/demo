<template>
  <el-drawer
    title="操作日志"
    v-model="visibility"
    direction="rtl"
    size="500px"
    :destroy-on-close="true"
    :show-close="true"
    :wrapperClosable="true"
    @open="fetchData"
  >
    <el-timeline v-loading="fetchLoading">
      <el-timeline-item
        placement="top"
        v-for="(activity, index) in operationLogs"
        :key="index"
        :timestamp="
          activity.operationTime + `&nbsp;&nbsp;&nbsp;&nbsp;更新人：${activity.operatorName}`
        "
      >
        <el-card>
          <h5>更新内容：</h5>
          <p v-html="activity.operationContent"></p>
        </el-card>
      </el-timeline-item>
    </el-timeline>
    <el-empty v-if="!operationLogs.length" description="暂无操作日志" />
  </el-drawer>
</template>

<script setup lang="ts">
  import { priceApi } from '@/api';

  const props = defineProps<{
    platform: number;
    modelValue: boolean;
    selectType: 1 | 2;
    paCode?: string;
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
    const res = await priceApi
      .luteosPriceQueryPriceRuleOperationLogs({
        platform: props.platform,
        selectType: props.selectType,
        paCode: props.paCode,
      })
      .finally(() => {
        fetchLoading.value = false;
      });
    operationLogs.value = res.operationLogList?.map((item) => {
      return {
        operationTime: item.operationTime,
        operatorName: item.operatorName,
        operationContent: (JSON.parse(item.operationContent as string) as string).replaceAll(
          '\r\n',
          '<br/>'
        ),
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
