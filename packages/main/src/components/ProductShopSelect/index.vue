<template>
  <el-select
    :modelValue="modelValue"
    :placeholder="placeholder"
    :clearable="clearable"
    :multiple="multiple"
    filterable
    :teleported="teleported"
    collapse-tags
    collapse-tags-tooltip
    @change="$emit('update:modelValue', $event)"
  >
    <el-option v-for="item in shopMap" :key="item.value" :label="item.desc" :value="item.value" />
  </el-select>
</template>

<script setup lang="ts">
  import { shopApi } from '@/api';

  const props = withDefaults(
    defineProps<{
      modelValue?: any;
      placeholder?: string;
      clearable?: boolean;
      multiple?: boolean;
      teleported?: boolean;
      platform?: string;
      site?: string;
      siteList?: string[];
    }>(),
    {
      placeholder: '店铺',
      clearable: false,
      teleported: false,
    }
  );
  const emit = defineEmits(['update:modelValue']);
  const shopMap = ref<any[]>([]);
  const getShopOptions = async () => {
    const res = await shopApi.luteosShopSelectShopList({
      platform: props.platform,
      site: props.site,
      siteList: props.siteList?.join(','),
    });
    shopMap.value = res || [];
    if (!props.multiple && !shopMap.value?.find((item) => item.value === props.modelValue)) {
      emit('update:modelValue', '');
    }
    if (props.multiple) {
      emit(
        'update:modelValue',
        shopMap.value
          ?.filter((item) => props.modelValue?.includes(item.value))
          ?.map((item) => item.value) || []
      );
    }
  };
  getShopOptions();

  watch(
    () => [props.platform, props.site, props.siteList],
    () => {
      getShopOptions();
    }
  );
</script>

<style scoped lang="scss"></style>
