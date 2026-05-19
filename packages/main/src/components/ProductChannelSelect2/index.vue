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
      v-for="item in channelMap?.filter(
        (v) => !(filters?.includes(v.value) || filters?.includes(v.desc))
      )"
      :key="item.luteChannel"
      :label="item.luteChannel"
      :value="item.luteChannel"
    />
  </el-select>
</template>

<script setup lang="ts">
  import { productApi } from '@/api';

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
    // const res = await platformApi.platformAllList();
    const res = await productApi.luteosProductSaleSkuQueryDictSalesChannelList({
      lutePlatform: '新平台',
      pageSize: 100,
    });
    channelMap.value = res.dictSalesChannelList || [];
  };
  getChannelOptions();
</script>

<style scoped lang="scss"></style>
