<template>
  <KeenCard>
    <div class="d-flex">
      <el-tabs v-model="platform">
        <el-tab-pane label="亚马逊" :name="1" v-if="checkPermission('amazonRiskControlRule')">
          <Amazon />
        </el-tab-pane>
        <el-tab-pane label="独立站" :name="2" v-if="checkPermission('stationRiskControlRule')">
          <Station />
        </el-tab-pane>
        <el-tab-pane label="沃尔玛" :name="3" v-if="checkPermission('platformRiskControlRule')">
          <Platform />
        </el-tab-pane>
      </el-tabs>
      <el-button class="mt-2" size="small" type="primary" @click="showLog = true">
        操作日志
      </el-button>
    </div>
  </KeenCard>
  <OperationLog v-model="showLog" :select-type="2" :platform="platform" />
</template>

<script setup lang="ts" name="riskControl">
import Amazon from '@/views/adjustprice/riskControl/amazon.vue';
  import Platform from '@/views/adjustprice/riskControl/platform.vue';
  import Station from '@/views/adjustprice/riskControl/station.vue';
  import OperationLog from '@/views/adjustprice/components/operationLog.vue';
  import { checkPermission } from '@/utils/permission';

  const platform = ref<number>(1);

  const showLog = ref(false);

  onMounted(() => {
    if (checkPermission('amazonRiskControlRule')) {
      platform.value = 1;
    } else if (checkPermission('stationRiskControlRule')) {
      platform.value = 2;
    } else if (checkPermission('platformRiskControlRule')) {
      platform.value = 3;
    }
  });
</script>

<style scoped lang="scss"></style>
