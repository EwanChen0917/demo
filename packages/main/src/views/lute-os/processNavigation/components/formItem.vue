<template>
  <template v-if="type === 'TextField'">
    <el-input v-model="value" placeholder="" clearable />
  </template>
  <template v-else-if="type === 'TextareaField'">
    <el-input type="textarea" rows="5" v-model="value" placeholder="" clearable />
  </template>
  <template v-else-if="type === 'NumberField'">
    <Num v-model="value" />
  </template>
  <template v-else-if="type === 'DDSelectField'">
    <el-select v-model="value" placeholder="" clearable filterable>
      <el-option v-for="item in []" :key="item.value" :label="item.label" :value="item.value" />
    </el-select>
  </template>
  <template v-else-if="type === 'DDDateField'">
    <el-date-picker v-model="value" type="date" placeholder="请选择时间" />
  </template>
  <template v-else-if="type === 'DDDateRangeField'">
    <el-date-picker
      v-model="value"
      type="daterange"
      range-separator="~"
      start-placeholder="开始日期"
      end-placeholder="结束日期"
    />
  </template>
</template>

<script setup lang="ts">
  import { computed } from 'vue';
  import Num from '@/components/NumberInput/index.vue';

  const props = defineProps({
    type: {
      type: String,
      default: 'TextField',
    },
    modelValue: {
      type: [Array, String, Number],
      default() {
        return '';
      },
    },
  });
  const emits = defineEmits<{
    (event: 'update:modelValue', val: any): void;
  }>();
  const value = computed({
    get() {
      return props.modelValue;
    },
    set(val) {
      emits('update:modelValue', val);
    },
  });
</script>

<style scoped lang="scss"></style>
