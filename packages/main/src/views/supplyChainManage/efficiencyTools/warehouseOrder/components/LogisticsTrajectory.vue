/** * 物流轨迹组件 */

<template>
  <KeenCard>
    <div class="d-flex align-items-center justify-content-end">
      <el-tooltip content="1、数据源为谷仓订单数 2、数据实时更新" placement="top">
        <QuestionFilled class="question-icon cursor-pointer" />
      </el-tooltip>
      <el-tooltip content="刷新" placement="top">
        <i class="iconfont icon-shuaxinjiazai cursor-pointer" @click="emit('refresh')"></i>
      </el-tooltip>
    </div>
    <el-table :data="data" row-key="trackingNumber" v-loading="loading" :show-header="false">
      <el-table-column type="expand" fixed>
        <template #default="{ row }">
          <el-timeline>
            <el-timeline-item
              v-for="(activity, index) in row.itemList"
              :key="index"
              :type="'primary'"
              hollow
              :timestamp="activity.dateTimeStr"
            >
              <p class="d-flex align-items-center gap-7">
                <b>{{ activity.codeInfo }}</b>
                <span class="d-flex align-items-center" v-if="activity.location">
                  <el-icon><Location /></el-icon>
                  <span>{{ activity.location }}</span>
                </span>
              </p>
              <p>{{ activity.info }}</p>
            </el-timeline-item>
          </el-timeline>
        </template>
      </el-table-column>
      <el-table-column>
        <template #default="{ row }">
          <el-space class="d-flex align-items-center gap-20">
            <strong>跟踪号：{{ row.trackingNumber }}</strong>
            <b style="color: var(--bs-success)">
              <el-tag type="success">{{ row.latestCodeInfo }}</el-tag>
            </b>
            <strong class="d-flex align-items-center">
              <el-icon><Location /></el-icon>
              <span>{{ row.latestLocation }}</span>
            </strong>
          </el-space>
        </template>
      </el-table-column>
    </el-table>
  </KeenCard>
</template>
<script setup lang="ts" name="LogisticsTrajectory">
  import { ref } from 'vue';
  import { erpApi } from '@/api';

  const props = defineProps({
    orderCode: {
      type: String,
      default: '',
    },
  });
  const emit = defineEmits<{
    (event: 'refresh'): void;
  }>();
  const data = ref<any>([]);
  const loading = ref(false);
  const getLogisticsTrajectoryList = async () => {
    try {
      loading.value = true;
      const res = await erpApi.luteosErpWarehouseOrderQueryLogisticsTrajectoryList({
        orderCode: props.orderCode,
      });
      data.value = res?.recordList || [];
    } finally {
      loading.value = false;
    }
  };
  watch(
    () => props.orderCode,
    (orderCode) => {
      if (orderCode) {
        getLogisticsTrajectoryList();
      }
    },
    { immediate: true }
  );
  defineExpose({
    getLogisticsTrajectoryList,
  });
</script>
<style scoped lang="scss">
  .question-icon {
    width: 16px;
    height: 16px;
    margin-right: 5px;
    color: var(--bs-success);
  }
  ::deep(.el-timeline-item__content) {
    padding: 10px 0;
  }
</style>
