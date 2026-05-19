<template>
  <div class="btn-wrap">
    <el-button
      v-for="(select, index) in selectTypeList"
      :key="index"
      :type="select.type === selectType ? 'primary' : ''"
      @click="handleSelectTypeClick(select.type)"
    >
      {{ select.text }}
    </el-button>
  </div>
  <div v-show="selectType === 1">
    <TaskTable />
  </div>
  <div v-show="selectType === 2">
    <UserTable />
  </div>
</template>

<script setup lang="ts" name="analysissatisfaction">
  import TaskTable from './components/task.vue';
  import UserTable from './components/user.vue';

  const selectType = ref(1);
  const selectTypeList = ref([
    {
      text: '任务分析',
      type: 1,
    },
    {
      text: '用户满意度分析',
      type: 2,
    },
  ]);
  const handleSelectTypeClick = (type) => {
    selectType.value = type;
  };
</script>

<style scoped lang="scss">
  .btn-wrap {
    width: 100%;
    background: #fff;
    padding: 20px 0 0 30px;
    margin-bottom: -5px;
    .el-button {
      margin-right: 15px;
      margin-bottom: 5px;
    }
  }
</style>
