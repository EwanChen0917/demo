<template>
  <el-select
    v-model="channelCode"
    :placeholder="placeholder"
    :clearable="clearable"
    filterable
    :teleported="teleported"
    :size="size"
    :max-collapse-tags="maxCollapseTags"
    collapse-tags
    collapse-tags-tooltip
  >
    <el-option
      v-for="item in channelMap?.filter((v) => !filters?.includes(v))"
      :key="item"
      :label="item"
      :value="item"
    />
  </el-select>
</template>

<script setup lang="ts">
  import { platformApi, productApi } from '@/api';

  withDefaults(
    defineProps<{
      placeholder?: string;
      clearable?: boolean;
      teleported?: boolean;
      filters?: string[];
      maxCollapseTags?: number;
      size?: 'default' | 'small' | 'large';
    }>(),
    {
      placeholder: '渠道',
      clearable: false,
      teleported: false,
      maxCollapseTags: 1,
      size: 'default',
    }
  );

  const channelCode = ref<string>('');
  const channelMap = ref<any[]>([]);
  const getChannelOptions = async () => {
    /* const res = await platformApi.platformDict({
dictCodes: ['product_channel'],
}); */
    const res = await productApi.luteosProductMsrpCalculationQueryChannel();
    // console.log(res);
    channelMap.value = res || [];
  };
  getChannelOptions();
</script>

<style scoped lang="scss"></style>
