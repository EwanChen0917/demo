<template>
  <el-select
    ref="countrySelectRef"
    v-model="countryCode"
    :placeholder="placeholder"
    :clearable="clearable"
    filterable
    :teleported="teleported"
    :multiple="multiple"
    :max-collapse-tags="maxCollapseTags"
    collapse-tags
    collapse-tags-tooltip
  >
    <el-option
      v-for="item in countryMap"
      :key="item.countryCode"
      :label="item.countryCode + ' - ' + item.countryName"
      :value="item.countryCode"
    />
  </el-select>
</template>

<script setup lang="ts">
  import { dataApi } from '@/api';

  const props = withDefaults(
    defineProps<{
      teleported?: boolean;
      placeholder?: string;
      clearable?: boolean;
      multiple?: boolean;
      scene?: any;
      maxCollapseTags?: number;
    }>(),
    {
      placeholder: '国家',
      clearable: false,
      multiple: false,
      maxCollapseTags: 1,
    }
  );
  const countrySelectRef = ref();
  const countryCode = ref<string>('');
  const countryMap = ref<any[]>([]);
  const getSiteOptions = async () => {
    const res = await dataApi.luteosDataQueryCountryList({
      pageNum: 1,
      pageSize: 500,
      scene: props.scene,
    });
    countryMap.value = res?.countryList || [];
  };
  getSiteOptions();

  defineExpose({
    getSelectedLabel: () => countrySelectRef.value?.selectedLabel,
  });
</script>

<style scoped lang="scss"></style>
