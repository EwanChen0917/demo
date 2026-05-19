<template>
  <el-table ref="tableRef" :data="list">
    <el-table-column prop="deptName" label="部门" />
    <el-table-column prop="punctualityRate" label="准时率">
      <template #default="scope">
        <div v-if="scope.row.punctualityRate !== null">{{ scope.row.punctualityRate }}%</div>
        <span v-else>--</span>
      </template>
    </el-table-column>
    <el-table-column prop="sumScore" label="总分">
      <template #default="scope">
        <div>{{ scope.row.sumScore ?? '--' }}</div>
      </template>
    </el-table-column>
    <el-table-column prop="evaluation" label="综合好评度">
      <template #default="scope">
        <div v-if="scope.row.evaluation">{{ scope.row.evaluation }}%</div>
        <span v-else>--</span>
      </template>
    </el-table-column>
    <el-table-column prop="taskNum" label="验收总任务数">
      <template #default="scope">
        <div>{{ scope.row.taskNum ?? '--' }}</div>
      </template>
    </el-table-column>
    <!--    <el-table-column prop="taskNum" label="设计中任务数">
      <template #default="scope">
        <div>{{ scope.row.taskNum || '&#45;&#45;' }}</div>
      </template>
    </el-table-column>-->
    <el-table-column prop="staskNum" label="S级任务数">
      <template #default="{ row }">
        <span>{{ row?.staskNum ?? '--' }}</span>
      </template>
    </el-table-column>
    <el-table-column prop="ataskNum" label="A级任务数">
      <template #default="{ row }">
        <span>{{ row?.ataskNum ?? '--' }}</span>
      </template>
    </el-table-column>
    <el-table-column prop="btaskNum" label="B级任务数">
      <template #default="{ row }">
        <span>{{ row?.btaskNum ?? '--' }}</span>
      </template>
    </el-table-column>
    <el-table-column prop="ctaskNum" label="C级任务数">
      <template #default="{ row }">
        <span>{{ row?.ctaskNum ?? '--' }}</span>
      </template>
    </el-table-column>
    <el-table-column prop="unYearProjectNum" label="非年规任务数">
      <template #default="{ row }">
        <span>{{ row?.unYearProjectNum ?? '--' }}</span>
      </template>
    </el-table-column>
  </el-table>
</template>

<script lang="ts" setup>
  defineProps<{
    list: Array<Object>;
  }>();
</script>
