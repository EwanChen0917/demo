<template>
  <div :style="{ width: '300px' }">
    <div class="mini-table-header" style="display:flex; font-weight:bold; margin-bottom:8px;">
      <span style="width:180px;">{{ nameTitle }}</span>
      <span style="width:70px;">{{ percentTitle }}</span>
      <span style="width:50px;">{{ valueTitle }}</span>
    </div>
    <div
      v-for="row in data"
      :key="row.name"
      style="display:flex; align-items:center; margin-bottom:4px; font-size:15px;"
    >
      <span style="width:180px; display:flex; align-items:center;">
        <span :style="{
            width:'10px', height:'10px', borderRadius:'50%', display:'inline-block',
            background:row.color, marginRight:'8px'
        }"></span>
        {{ row.name }}
      </span>
      <span style="width:100px;">{{ total ? ((row.value/total)*100).toFixed(2) : '0.00' }}%</span>
      <span style="width:60px;">{{ row.value }}</span>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';

const props = defineProps<{
  data: Array<{ name: string; value: number; color: string }>;
  nameTitle?: string;
  percentTitle?: string;
  valueTitle?: string;
  width?: string;
}>();

const total = computed(() =>
  props.data ? props.data.reduce((sum, d) => sum + (d.value || 0), 0) : 0
);

// 默认表头
const nameTitle = props.nameTitle || '需求状态';
const percentTitle = props.percentTitle || '百分比';
const valueTitle = props.valueTitle || '数量';
const width = props.width || '320px';
</script>
