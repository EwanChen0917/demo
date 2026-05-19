<template>
  <el-select
    v-model="currencyCode"
    :placeholder="currencyName?'请选择币种':'币种'"
    filterable
    clearable
    :size="size"
    :class="{'w-140':currencyName,'w-60':!currencyName}"
  >
    <el-option
      v-for="item in currencyOptions"
      :key="item.currencyCode"
      :label="currencyName?`${item.currencyCode}【${item.currencyName}】`:`${item.currencyCode}` || ''"
      :value="item.currencyCode!"
    />
  </el-select>
</template>

<script lang="ts">
  import { ref, computed } from 'vue';
  import { dataApi } from '@/api';

  // 模块级别共享变量，确保多实例共享同一份数据和请求
  let currencyOptionsPromise: Promise<any> | null = null;
  const sharedCurrencyOptions = ref<any[]>([]);
</script>

<script setup lang="ts">
  const EXP_TIME = 60 * 60 * 100;

  const props = withDefaults(
    defineProps<{
      modelValue?: string;
      size?: 'small' | 'medium' | 'large';
      currencyName?: boolean;
    }>(),
    {
      size: 'default',
      currencyName: true,
    }
  );

  const emit = defineEmits(['update:modelValue', 'change']);

  const currencyCode = computed({
    get: () => props.modelValue,
    set: (val) => {
      emit('update:modelValue', val);
      emit('change', val);
    },
  });
  // 直接使用模块级别的共享响应式变量
  const currencyOptions = sharedCurrencyOptions;

  const getCurrencyOptions = async () => {
    // 1. 如果已经有数据了，直接返回
    if (sharedCurrencyOptions.value.length > 0) return;

    // 2. 如果请求正在进行中，直接等待该请求完成
    if (currencyOptionsPromise) {
      await currencyOptionsPromise;
      return;
    }

    // 3. 检查 localStorage
    const expirationTime = localStorage.getItem('expirationTime');
    const cachedData = localStorage.getItem('currencyOptions');
    if (
      expirationTime && 
      new Date().getTime() <= Number(expirationTime) &&
      cachedData
    ) {
      sharedCurrencyOptions.value = JSON.parse(cachedData);
      return;
    }

    // 4. 发起请求
    try {
      currencyOptionsPromise = dataApi.luteosDataQueryCurrencyList();
      const res = await currencyOptionsPromise;
      sharedCurrencyOptions.value = res.currencyList;
      
      // 写入缓存
      localStorage.setItem('expirationTime', String(new Date().getTime() + EXP_TIME));
      localStorage.setItem('currencyOptions', JSON.stringify(res.currencyList));
    } catch (error) {
      console.error('获取币种列表失败:', error);
    } finally {
      // 请求完成后重置 Promise 标记，允许之后可能的重新获取（例如过期后）
      currencyOptionsPromise = null;
    }
  };

  defineExpose({
    getCurrencyOptions,
  });

  getCurrencyOptions();
</script>

<style scoped lang="scss">
 .keen-ui .el-form-item .w-140{
  min-width: 140px
}
.keen-ui .el-form-item .w-60{
  min-width: 60px
}
</style>
