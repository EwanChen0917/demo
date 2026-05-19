<!-- 仓库 -->
<template>
  <el-select
    :modelValue="modelValue"
    :placeholder="placeholder"
    :clearable="clearable"
    filterable
    :teleported="false"
    :multiple="multiple"
    collapse-tags
    collapse-tags-tooltip
    style="width: 210px"
    @change="$emit('update:modelValue', $event)"
  >
    <el-option
      v-for="item in warehouseList"
      :key="item.warehouseCode"
      :label="`${channel ? item.warehouseName : item.warehouseDesc}-${item.warehouseCode}`"
      :value="item.warehouseCode"
    />
  </el-select>
</template>

<script setup lang="ts">
  import { erpApi } from '@/api';

  const props = withDefaults(
    defineProps<{
      warehouseType?: number; // 1:自营仓库 2.供应商仓 3.三方仓 4.平台仓
      warehouseTypes?: any;
      modelValue: string | string[];
      placeholder?: string;
      clearable?: boolean;
      multiple?: boolean;
      channel?: string; // 调仓库渠道
      platformCode?: string; // 平台code
    }>(),
    {
      placeholder: '仓库',
      clearable: false,
      multiple: false,
      channel: undefined, // 默认调仓库资料
    }
  );
  const emit = defineEmits(['update:modelValue']);

  const warehouseList = ref<any[]>([]);
  const getSiteOptions = async () => {
    // luteosErpWarehouseAffiliationQueryList
    if (props.platformCode) {
      const res = await erpApi.luteosErpWarehouseQueryPlatformListByType({
        platformCode: props.platformCode,
        status: 1,
      });
      warehouseList.value = res?.warehouseList || [];
    } else if (props.channel) {
      const res = await erpApi.luteosErpWarehouseAffiliationQueryList({
        pageNum: 1,
        pageSize: 100,
        channel: props.channel,
      });
      warehouseList.value = res?.recordList || [];
    } else {
      const res = await erpApi.luteosErpWarehouseQueryWarehouseListByWarehouseType({
        warehouseTypes: props.warehouseTypes ?? undefined,
      });
      warehouseList.value = res?.warehouseList || [];
    }
  };
  getSiteOptions();
</script>

<style scoped lang="scss"></style>
