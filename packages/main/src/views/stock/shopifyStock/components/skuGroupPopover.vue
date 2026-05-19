<template>
  <el-popover v-if="hasData" placement="bottom-start" :width="300" trigger="click">
    <div style="padding: 12px">
      <el-table :data="tableData" :show-header="false" border max-height="200">
        <el-table-column prop="sku" min-width="220" />
      </el-table>
    </div>
    <template #reference>
      <div style="display: flex; align-items: center; gap: 4px; cursor: pointer">
        <el-icon>
          <ArrowDown />
        </el-icon>
        <span>{{ displayText }}</span>
      </div>
    </template>
  </el-popover>
</template>

<script lang="ts" setup>
  import { computed } from 'vue';
  import { ArrowDown } from '@element-plus/icons-vue';

  interface Props {
    skuGroup?: string[];
  }

  const props = withDefaults(defineProps<Props>(), {
    skuGroup: () => [],
  });

  const tableData = computed(() => {
    return (props.skuGroup || []).map((sku) => ({ sku }));
  });

  const hasData = computed(() => {
    return (props.skuGroup?.length || 0) > 0;
  });

  const displayText = computed(() => {
    return props.skuGroup?.[0] || '无';
  });
</script>

<style scoped lang="scss"></style>
