<template>
  <el-pagination
    :current-page="current"
    :page-size="pageSize"
    :page-sizes="pageSizeOption"
    :layout="layout || '->, total, sizes, prev, pager, next, jumper'"
    background
    :total="total"
    :pager-count="pagerCount"
    @current-change="(v) => emit('currentChange', v)"
    @size-change="(v) => emit('sizeChange', v)"
    :size="size || 'default'"
  />
</template>

<script lang="ts" setup>
  defineProps<{
    current: number;
    pageSize: number;
    total: number;
    pagerCount?: number;
    pageSizeOption: number[];
    size?: 'default' | 'small' | 'large';
    layout?: string;
  }>();

  const emit = defineEmits<{
    (event: 'sizeChange', val: number): void;
    (event: 'currentChange', val: number): void;
  }>();
</script>

<style lang="scss"></style>
