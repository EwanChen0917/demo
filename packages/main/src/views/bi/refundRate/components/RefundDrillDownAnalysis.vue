<template>
  <div v-loading="loading">
    <keep-alive>
      <component :is="com" v-bind="$attrs" />
    </keep-alive>
  </div>
</template>

<script setup lang="ts">
  import ExtendTable from '../part/ExpandTable.vue';
  import DimensionTable from '../part/DimensionTable.vue';

  const props = defineProps<{
    hasCategory: boolean;
  }>();
  const com = shallowRef(DimensionTable);
  const loading = ref(false);
  watch(
    () => props.hasCategory,
    (newVal) => {
      loading.value = true;
      // 如果有分类，使用 ExtendTable
      setTimeout(() => {
        com.value = newVal ? ExtendTable : DimensionTable;
        loading.value = false;
      }, 500);
      // 否则使用 DimensionTable
    }
  );
</script>
