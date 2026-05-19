<template>
  <el-tabs v-model="curTab" @tab-change="handleChange">
    <el-tab-pane label="所有任务" name="list" />
    <el-tab-pane label="我创建的" name="creator" />
    <el-tab-pane label="我执行的" name="handler" />
    <el-tab-pane label="我共同执行的" name="coHandler" />
    <el-tab-pane label="我关注的" name="follow" />
    <el-tab-pane v-if="isLeader" label="团队任务分布" name="statistics">
      <Statistics ref="statisticsRef" @search="handleSearch" />
    </el-tab-pane>
    <el-tab-pane label="个人任务分布" name="personalStatistics">
      <PersonalStatistics ref="personalStatisticsRef" @search="handleSearch" />
    </el-tab-pane>
    <List v-if="curTab === 'list'" all :status="status" :isLeader="isLeader" key="list" />
    <List v-if="curTab === 'creator'" creator :isLeader="false" key="creator" />
    <List v-if="curTab === 'handler'" handler :isLeader="false" key="handler" />
    <List v-if="curTab === 'coHandler'" coHandler :isLeader="false" :joinHandlerFlag="true" key="coHandler" />
    <List v-if="curTab === 'follow'" followFlag :isLeader="false" key="follow" />
  </el-tabs>
</template>

<script setup lang="ts" name="taskManage">
  import List from '@/views/lute-os/taskManage/list.vue';
  import Statistics from '@/views/lute-os/taskManage/statistics.vue';
  import PersonalStatistics from '@/views/lute-os/taskManage/personalStatistics.vue';
  import { memberApi } from '@/api';
  import { useStore } from '@/store/modules/useStore';

  const { userInfo } = useStore();

  const curTab = ref('list');

  const statisticsRef = ref();
  const handleChange = (tab: string) => {
    if (tab === 'statistics') statisticsRef.value?.runQuery();
    if (tab === 'personalStatistics') personalStatisticsRef.value?.runQuery();
  };
  const personalStatisticsRef = ref();
  const status = ref();
  const handleSearch = async (val) => {
    curTab.value = 'list';
    await nextTick();
    status.value = val;
  };

  const isLeader = ref(false);
  const queryMemberDetail = async () => {
    const res = await memberApi.luteosMemberQueryMemberDetail({ memberCode: userInfo?.memberCode });
    isLeader.value = !!res?.leader;
    // isLeader.value = true;
  };

  queryMemberDetail();
</script>

<style scoped lang="scss">
  :deep(.el-tabs__active-bar) {
    background-color: rgba(67, 114, 255, 1);
  }
  :deep(.el-tabs__item) {
    font-family: 'PingFang SC';
    font-size: 15.97px;
    font-weight: 400;
    line-height: 23.96px;
    color: rgba(0, 0, 0, 0.85);
    &.is-active {
      color: rgba(67, 114, 255, 1);
    }
    &:hover {
      color: rgba(67, 114, 255, 1);
    }
  }
</style>
