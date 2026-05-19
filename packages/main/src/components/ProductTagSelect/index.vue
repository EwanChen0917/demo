<template>
  <el-select
    v-model="tagCode"
    :placeholder="placeholder"
    :clearable="clearable"
    filterable
    :teleported="false"
    :multiple="multiple"
    collapse-tags
    collapse-tags-tooltip
  >
    <el-option
      v-for="item in tagMap"
      :key="item.tagCode"
      :label="item.tagName"
      :value="item.tagCode"
    />
  </el-select>
</template>

<script setup lang="ts">
  import { productApi } from '@/api';

  const props = withDefaults(
    defineProps<{
      placeholder?: string;
      clearable?: boolean;
      multiple?: boolean;
      tagType: string;
    }>(),
    {
      placeholder: '产品标签',
      clearable: false,
      multiple: false,
    }
  );

  const tagCode = ref<string>('');
  const tagMap = ref<any[]>([]);
  const getTagOptions = async () => {
    const res = await productApi.luteosProductTagQueryTagList({
      tagType: props.tagType,
      pageNum: 1,
      pageSize: 500,
    });
    tagMap.value = res?.tagBeanList || [];
  };
  getTagOptions();
</script>

<style scoped lang="scss"></style>
