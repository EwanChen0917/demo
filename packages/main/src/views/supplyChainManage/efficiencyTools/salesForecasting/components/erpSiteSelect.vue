<template>
  <el-select
    :modelValue="modelValue"
    :placeholder="placeholder"
    :clearable="clearable"
    filterable
    :teleported="teleported"
    :multiple="multiple"
    collapse-tags
    collapse-tags-tooltip
    :no-data-text="!channel ? '请先选择渠道' : '暂无数据'"
    @change="$emit('update:modelValue', $event)"
  >
    <el-option
      v-for="item in siteMap"
      :key="item.id"
      :label="item.site"
      :value="item.site"
      :disabled="disableList?.includes(item.site)"
    />
  </el-select>
</template>

<script setup lang="ts">
  import { erpApi } from '@/api';

  const props = withDefaults(
    defineProps<{
      modelValue?: any;
      placeholder?: string;
      clearable?: boolean;
      multiple?: boolean;
      channel: string;
      onlineGoods?: boolean;
      teleported?: boolean;
      disableList?: any;
    }>(),
    {
      placeholder: '站点',
      clearable: false,
      multiple: false,
      teleported: false,
      disableList: [],
    }
  );

  const emit = defineEmits(['update:modelValue']);
  const siteMap = ref<any[]>([]);
  const getSiteOptions = async () => {
    if (!props.channel) {
      emit('update:modelValue', '');
      siteMap.value = [];
      return;
    }
    const res = await erpApi.luteosErpBaseSiteQueryList({
      pageNum: 1,
      pageSize: 500,
      channel: props.channel,
    });
    siteMap.value = res?.recordList || [];

    if (!props.multiple && !siteMap.value?.find((item) => item.site === props.modelValue)) {
      emit('update:modelValue', '');
    }
    if (props.multiple) {
      emit(
        'update:modelValue',
        siteMap.value
          ?.filter((item) => props.modelValue?.includes(item.site))
          ?.map((item) => item.site) || []
      );
    }
  };
  getSiteOptions();

  watch(
    () => props.channel,
    () => {
      getSiteOptions();
    }
  );
</script>

<style scoped lang="scss"></style>
