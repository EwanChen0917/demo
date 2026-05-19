<template>
  <el-table ref="tableRef" :data="list">
    <el-table-column prop="designer" label="设计师" />
    <el-table-column prop="punctualityRate" label="准时率">
      <template #default="{ row }">
        <span v-if="row?.punctualityRate !== null">{{ row?.punctualityRate }}%</span>
        <span v-else>--</span>
      </template>
    </el-table-column>
    <el-table-column prop="sumScore" label="总分">
      <template #default="{ row }">
        <span>{{ row?.sumScore ?? '--' }}</span>
      </template>
    </el-table-column>
    <el-table-column prop="evaluation" label="综合好评度">
      <template #default="scope">
        <span v-if="scope.row.evaluation !== null">{{ scope.row.evaluation }}%</span>
        <span v-else>--</span>
      </template>
    </el-table-column>
    <el-table-column prop="taskNum" label="验收总任务数">
      <template #default="{ row }">
        <span>{{ row?.taskNum ?? '--' }}</span>
      </template>
    </el-table-column>
    <el-table-column prop="goingTaskNum" label="设计中任务数">
      <template #default="{ row }">
        <span>{{ row?.goingTaskNum ?? '--' }}</span>
      </template>
    </el-table-column>
    <el-table-column prop="contributionRate" label="团队贡献占比">
      <template #default="scope">
        <div v-if="scope.row.contributionRate !== null">{{ scope.row.contributionRate }}%</div>
        <span v-else>--</span>
      </template>
    </el-table-column>
    <el-table-column prop="selfRate" label="个人任务负荷">
      <template #default="scope">
        <span v-if="scope.row.selfRate !== null">{{ scope.row.selfRate }}%</span>
        <span v-else>--</span>
      </template>
    </el-table-column>
  </el-table>
</template>

<script lang="ts" setup>
  defineProps<{
    list: Array<Object>;
  }>();
</script>
