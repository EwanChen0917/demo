<template>
  <el-table ref="tableRef" :data="list">
    <el-table-column prop="itemTypeDesc" label="类型" />
    <el-table-column prop="punctualityRate" label="准时率">
      <template #default="{ row }">
        <span v-if="row?.punctualityRate">{{ row?.punctualityRate }}%</span>
        <span v-else>--</span>
      </template>
    </el-table-column>
    <el-table-column prop="sumScore" label="总分">
      <template #default="{ row }">
        <span>{{ row?.sumScore || '--' }}</span>
      </template>
    </el-table-column>
    <el-table-column prop="evaluation" label="综合好评度">
      <template #default="{ row }">
        <span v-if="row?.evaluation">{{ row?.evaluation }}%</span>
        <span v-else>--</span>
      </template>
    </el-table-column>
    <el-table-column prop="taskNum" label="完成总任务数">
      <template #default="{ row }">
        <span>{{ row?.taskNum || '--' }}</span>
      </template>
    </el-table-column>
    <!--    <el-table-column prop="splusTaskNum" label="S+级任务数" />-->
    <el-table-column prop="staskNum" label="S级任务数">
      <template #default="{ row }">
        <span>{{ row?.staskNum || '--' }}</span>
      </template>
    </el-table-column>
    <el-table-column prop="ataskNum" label="A级任务数">
      <template #default="{ row }">
        <span>{{ row?.ataskNum || '--' }}</span>
      </template>
    </el-table-column>
    <el-table-column prop="btaskNum" label="B级任务数">
      <template #default="{ row }">
        <span>{{ row?.btaskNum || '--' }}</span>
      </template>
    </el-table-column>
    <el-table-column prop="ctaskNum" label="C级任务数">
      <template #default="{ row }">
        <span>{{ row?.ctaskNum || '--' }}</span>
      </template>
    </el-table-column>
    <el-table-column prop="unYearProjectNum" label="非年规任务数">
      <template #default="{ row }">
        <span>{{ row?.unYearProjectNum || '--' }}</span>
      </template>
    </el-table-column>
  </el-table>
</template>

<script lang="ts" setup>
  defineProps<{
    list: Array<Object>;
  }>();
</script>
