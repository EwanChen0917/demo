<template>
  <div class="card card-flush py-4">
    <div class="card-header">
      <div class="card-title"><h2>中奖用户梯队</h2></div>
    </div>
    <div class="card-body pt-0 px-20">
      <div class="pb-6">活动时间内的付款订单金额：</div>
      <div>
        <ConfigItem
          v-for="(item, idx) in form?.activityPrizeConfigList"
          :key="item.configLevel"
          :idx="idx"
          :remain="total - sum"
        />
      </div>
      <div v-if="sum > 0" class="pt-2">
        总共 {{ total }} 个中奖码，其余
        <span class="text-danger">{{ Math.max(total - sum, 0) }}</span>
        个中奖码随机抽取
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
  import { sumBy } from 'lodash-es';
  import { ActivityContracts } from '@/api/index';

  import { ActivityPrizeType, ActivityPrizeBean } from '@/types/api';
  import ConfigItem from './activityConfigItem.vue';

  const form = inject<
    Omit<ActivityContracts.ActivitySaveReq, 'activityPrizeList'> & {
      activityPrizeList?: ActivityPrizeBean[];
    }
  >('form');
  const sum = computed(() => sumBy(form?.activityPrizeConfigList, (item) => item.prizeCount ?? 0));
  const total = computed(() =>
    sumBy(form?.activityPrizeList, (item) => {
      if (!form?.activityCode && item.prizeType === ActivityPrizeType.积分)
        return sumBy(item.pointPrizes, (pp) => pp.totalCount ?? 0);
      return item.totalCount ?? 0;
    })
  );
</script>
