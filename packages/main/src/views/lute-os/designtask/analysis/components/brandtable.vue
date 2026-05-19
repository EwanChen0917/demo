<template>
  <el-table ref="tableRef" :data="list">
    <el-table-column prop="brandName" label="品牌" />
    <el-table-column prop="punctualityRate" label="准时率">
      <template #default="scope">
        <div>{{ scope.row.punctualityRate }}%</div>
      </template>
    </el-table-column>
    <el-table-column prop="sumScore" label="总分" />
    <el-table-column prop="evaluation" label="综合好评度">
      <template #default="scope">
        <div v-if="scope.row.evaluation">{{ scope.row.evaluation }}%</div>
      </template>
    </el-table-column>
    <el-table-column prop="taskNum" label="验收总任务数" />
    <el-table-column prop="splusTaskNum" label="S+级任务数" />
    <el-table-column prop="staskNum" label="S级任务数" />
    <el-table-column prop="ataskNum" label="A级任务数" />
    <el-table-column prop="btaskNum" label="B级任务数" />
    <el-table-column prop="ctaskNum" label="C级任务数" />
  </el-table>
</template>

<script lang="ts" setup>
  defineProps<{
    list: Array<Object>;
  }>();
</script>
