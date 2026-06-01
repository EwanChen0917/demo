<template>
  <div v-if="form?.activityPrizeConfigList?.[idx]" class="prize-config-item d-flex gap-7 gap-lg-10">
    <el-form-item :label="form.activityPrizeConfigList[idx].configLevelName">
      <div class="d-flex align-items-center gap-7">
        <el-form-item :prop="['activityPrizeConfigList', `${idx}`, 'startRange']" :rules="rules">
          <el-input-number
            v-model="form.activityPrizeConfigList[idx].startRange"
            :precision="0"
            :controls="false"
            placeholder="请输入订单金额"
            :disabled="form!.activityStarted"
          />
        </el-form-item>
        <span>-</span>
        <el-form-item :prop="['activityPrizeConfigList', `${idx}`, 'endRange']" :rules="rules">
          <el-input-number
            v-model="form.activityPrizeConfigList[idx].endRange"
            placeholder="请输入订单金额"
            :min="form.activityPrizeConfigList[idx].startRange"
            :precision="0"
            :controls="false"
            :disabled="form!.activityStarted"
          />
        </el-form-item>
      </div>
    </el-form-item>
    <el-form-item
      label="抽取数量"
      :prop="['activityPrizeConfigList', `${idx}`, 'prizeCount']"
      :rules="countRules"
      class="long-error-form-item"
    >
      <el-input-number
        v-model="form.activityPrizeConfigList[idx].prizeCount"
        placeholder="请输入"
        :disabled="form!.activityStarted"
        :precision="0"
      />
    </el-form-item>
  </div>
</template>

<script lang="ts" setup>
  import { ActivityContracts } from '@/api/index';

  import type { FormItemRule } from 'element-plus';

  const props = defineProps<{
    idx: number;
    remain: number;
  }>();

  const form = inject<ActivityContracts.ActivitySaveReq & { activityStarted: boolean }>('form');
  const rules = reactive<FormItemRule[]>([
    {
      validator(_, val: number, callback) {
        const item = form?.activityPrizeConfigList?.[props.idx];
        if (!item) return callback('数据错误');

        const hasValue = item.startRange ?? item.endRange ?? item.prizeCount;
        if (hasValue) {
          if (!val && val !== 0) return callback(`不能为空`);
        }
        return true;
      },
    },
    {
      type: 'integer',
      min: 0,
      message: '订单金额不能小于0',
    },
    {
      type: 'integer',
      max: 9999999,
      message: '订单金额不能大于9999999',
    },
  ]);
  const countRules = reactive<FormItemRule[]>([
    {
      validator(_, val: number, callback) {
        const item = form?.activityPrizeConfigList?.[props.idx];
        if (!item) return callback('数据错误');

        const hasValue = item.startRange ?? item.endRange ?? item.prizeCount;
        if (hasValue) {
          if (!val && val !== 0) return callback('不能为空');
          if (props.remain < 0) return callback(`各梯队抽取数量总和不能大于抽奖数量总和`);
        }
        return true;
      },
    },
    {
      type: 'integer',
      min: 0,
      message: '抽取数量不能小于0',
    },
    {
      type: 'integer',
      max: 9999999,
      message: '抽取数量不能大于9999999',
    },
  ]);
</script>

<style lang="scss" scoped>
  .long-error-form-item {
    :deep(.el-form-item__error) {
      width: 250px;
    }
  }
</style>
