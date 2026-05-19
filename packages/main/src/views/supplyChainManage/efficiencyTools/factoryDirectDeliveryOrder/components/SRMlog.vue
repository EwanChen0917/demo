<template>
  <el-table class="" :data="localData" border style="width: 700px">
    <el-table-column prop="createByName" label="操作人" width="120" />
    <el-table-column prop="operationContent" label="日志内容" />
    <el-table-column prop="createTime" label="操作时间" width="220" />
  </el-table>
</template>

<script lang="ts" setup>
  interface Props {
    data?: any[];
  }
  const props = defineProps<Props>();
  const localData = ref<any>(props.data);
  watch(
    () => props.data,
    (newV) => {
      localData.value = newV;
    }
  );
</script>

<style scoped lang="scss"></style>
