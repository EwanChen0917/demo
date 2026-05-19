<template>
  <div style="width: 100%" :class="{ 'disabled-style': props.disabled }" class="date-range-field">
    <div class="w-100">
      <el-date-picker
        v-model="orderTime"
        type="daterange"
        class="date-range-picker"
        range-separator="~"
        :start-placeholder="startPlaceholder"
        :end-placeholder="endPlaceholder"
        format="YYYY-MM-DD"
        value-format="YYYY-MM-DD"
        :clearable="!props.disabled"
        :disabled="props.disabled"
        :default-time="defaultRangeTime"
      />
    </div>
    <!-- <div class="pad rank-row">
      前
      <NumberInput
        v-model="orderRank"
        :precision="0"
        :min="1"
        :disabled="props.disabled"
        :controls="false"
        class="rank-input"
        placeholder="N"
        size="small"
      />
      名付款的订单（只能填正整数，按付款时间升序排序）
    </div> -->
  </div>
</template>

<script setup lang="ts">
  import { useFormItem } from 'element-plus';
  import { nextTick, watch, onMounted, ref, computed } from 'vue';
  import NumberInput from '@/components/NumberInput/index.vue';

  const { formItem } = useFormItem();

  type DateRangeFieldItem = {
    desc?: string;
    value?: string;
  };

  type OptionsConfig = {
    startPlaceHolder?: string;
    endPlaceHolder?: string;
  };

  interface Props {
    modelValue?: DateRangeFieldItem[];
    /** useRuleData 内为 { startPlaceHolder, endPlaceHolder } */
    options?: OptionsConfig | any[];
    disabled?: boolean;
  }

  const props = defineProps<Props>();

  const emit = defineEmits<{
    'update:modelValue': [value: DateRangeFieldItem[]];
  }>();

  const defaultRangeTime: [Date, Date] = [
    new Date(2000, 0, 1, 0, 0, 0),
    new Date(2000, 0, 1, 23, 59, 59),
  ];

  const startPlaceholder = computed(
    () => (props.options as OptionsConfig | undefined)?.startPlaceHolder ?? '开始时间'
  );
  const endPlaceholder = computed(
    () => (props.options as OptionsConfig | undefined)?.endPlaceHolder ?? '结束时间'
  );

  /** DatePicker 绑定 [start, end] 字符串 或 null */
  const orderTime = ref<string[] | null>(null);
  /** 前 N 名，正整数 */
  const orderRank = ref<number | undefined>(undefined);

  const isSyncingFromParent = ref(false);

  const buildPayload = (): DateRangeFieldItem[] => {
    const range = orderTime.value;
    const start = range?.[0] ?? '';
    const end = range?.[1] ?? '';
    // const n = orderRank.value;
    return [
      { desc: '订购时间(市场)起始时间', value: start },
      { desc: '订购时间(市场)结束时间', value: end },
      // { desc: '前N名付款的订单', value: n != null && n >= 1 ? String(n) : '' },
    ];
  };

  const applyFromModel = (mv?: DateRangeFieldItem[]) => {
    if (!mv?.length) {
      orderTime.value = null;
      orderRank.value = undefined;
      return;
    }
    const a = mv[0]?.value;
    const b = mv[1]?.value;
    if (a && b) {
      orderTime.value = [a, b];
    } else {
      orderTime.value = null;
    }
    // const rawN = mv[2]?.value;
    // if (rawN !== undefined && rawN !== null && String(rawN).trim() !== '') {
    //   const num = Number(rawN);
    //   orderRank.value = !Number.isNaN(num) && num >= 1 ? num : undefined;
    // } else {
    //   orderRank.value = undefined;
    // }
  };

  const pushModel = () => {
    emit('update:modelValue', buildPayload());
    formItem?.validate('change');
  };

  onMounted(() => {
    isSyncingFromParent.value = true;
    applyFromModel(props.modelValue);
    nextTick(() => {
      isSyncingFromParent.value = false;
      formItem?.validate('change');
    });
  });

  watch(
    () => props.modelValue,
    (mv) => {
      isSyncingFromParent.value = true;
      applyFromModel(mv);
      nextTick(() => {
        isSyncingFromParent.value = false;
      });
    },
    { deep: true }
  );

  watch(
    [orderTime, orderRank],
    () => {
      if (isSyncingFromParent.value) return;
      pushModel();
    },
    { deep: true }
  );
</script>

<style scoped lang="scss">
  .date-range-field {
    font-size: 12px;
    color: #1f1f1f;
    :deep(.date-range-picker) {
      width: 100%;
    }
  }

  .pad {
    padding-top: 12px;
  }

  .rank-row {
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    gap: 4px;
    .rank-input {
      width: 100px;
      flex-shrink: 0;
    }
  }

  .disabled-style {
    cursor: not-allowed;
  }
</style>
