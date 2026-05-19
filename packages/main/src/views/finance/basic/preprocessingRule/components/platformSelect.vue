<template>
  <el-select
    v-model="platform"
    :placeholder="placeholder"
    :clearable="clearable"
    filterable
    :teleported="false"
    :multiple="multiple"
    collapse-tags
    collapse-tags-tooltip
  >
    <el-option
      v-for="item in platformOptions"
      :key="item.value"
      :label="item.desc || ''"
      :value="item.value!"
    />
  </el-select>
</template>

<script setup lang="ts">
  import { platformApi } from '@/api';

  withDefaults(
    defineProps<{
      placeholder?: string;
      clearable?: boolean;
      multiple?: boolean;
    }>(),
    {
      placeholder: '平台',
      clearable: false,
      multiple: false,
    }
  );

  const platform = ref<string>('');
  const platformOptions = ref<any[]>([]);
  const getPlatformOptions = async () => {
    const res = await platformApi.platformDict({
      dictCodes: ['shop_platform'],
    });
    platformOptions.value = res.dictMap?.shop_platform as [];
  };
  getPlatformOptions();
</script>

<style scoped lang="scss"></style>
