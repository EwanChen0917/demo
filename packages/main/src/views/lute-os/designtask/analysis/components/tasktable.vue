<template>
  <el-table ref="tableRef" :data="list">
    <el-table-column prop="submit" label="待提交">
      <template #default="{ row }">
        <span>{{ row?.submit ?? '--' }}</span>
      </template>
    </el-table-column>
    <el-table-column prop="approving" label="审批中">
      <template #default="{ row }">
        <span>{{ row?.approving ?? '--' }}</span>
      </template>
    </el-table-column>
    <el-table-column prop="accept" label="待认领">
      <template #default="{ row }">
        <span>{{ row?.accept ?? '--' }}</span>
      </template>
    </el-table-column>
    <el-table-column prop="design" label="设计中">
      <template #default="{ row }">
        <span>{{ row?.design ?? '--' }}</span>
      </template>
    </el-table-column>
    <el-table-column prop="innerCheck" label="待内部验收">
      <template #default="{ row }">
        <span>{{ row?.innerCheck ?? '--' }}</span>
      </template>
    </el-table-column>
    <el-table-column prop="finish" label="待需求方验收">
      <template #default="{ row }">
        <span>{{ row?.finish ?? '--' }}</span>
      </template>
    </el-table-column>
    <el-table-column prop="check" label="已验收">
      <template #default="{ row }">
        <span>{{ row?.check ?? '--' }}</span>
      </template>
    </el-table-column>
  </el-table>
</template>

<script lang="ts" setup>
  defineProps<{
    list: Array<Object>;
  }>();
</script>
