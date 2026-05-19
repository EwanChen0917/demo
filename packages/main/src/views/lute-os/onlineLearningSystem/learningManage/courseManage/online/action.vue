<template>
  <div class="course-detail-page">
    <div class="tab-header">
      <div class="tab-item" :class="{ active: currentTab === 1 }" @click="changeTab(1)">
        <span>课程设置</span>
      </div>
      <template v-if="mode !== 'add'">
        <div class="tab-item" :class="{ active: currentTab === 2 }" @click="changeTab(2)">
          <span>课程目录</span>
        </div>
        <div class="tab-item" :class="{ active: currentTab === 3 }" @click="changeTab(3)">
          <span>高级设置</span>
        </div>
        <div class="tab-item" :class="{ active: currentTab === 4 }" @click="changeTab(4)">
          <span>学员设置</span>
        </div>
      </template>
    </div>
    <div class="tab-form">
      <component ref="currentComponent" :mode="mode" :is="currentTabForm" />
    </div>
  </div>
</template>

<script setup lang="ts">
  import * as swal from '@/utils/swal';
  import tab1 from './components/tab1.vue';
  import tab2 from './components/tab2.vue';
  import tab3 from './components/tab3.vue';
  import tab4 from './components/tab4.vue';

  defineProps<{
    mode: 'add' | 'edit' | 'detail';
  }>();
  const currentTab = ref(1);
  const route = useRoute();
  if (route.query.currentTab) {
    currentTab.value = Number(route.query.currentTab as string);
  }
  // if (route.query.courseCode) {
  // }
  // const initDetailData = async () => {
  //   const res = await
  // }
  const tabMap = reactive({
    1: tab1,
    2: tab2,
    3: tab3,
    4: tab4,
  });
  const currentTabForm = computed(() => {
    return tabMap[currentTab.value];
  });
  const currentComponent = ref();
  const changeTab = async (index: number) => {
    if (!currentComponent.value.hasChange()) {
      currentTab.value = index;
    } else {
      const isConfirmed = await swal.confirm('是否保存当前配置？');
      if (isConfirmed) {
        const res = await currentComponent.value?.submit();
        if (res) {
          currentTab.value = index;
        }
      }
    }
    // currentTab.value = index;
  };
</script>

<style scoped lang="scss">
  .course-detail-page {
    background-color: #fff;
    padding: 8px 16px;
    border-radius: 8px;
  }
  .tab-header {
    display: flex;
    gap: 12px;
    border-bottom: 2px solid #eee;
    .tab-item {
      margin: 0 20px;
      height: 40px;
      display: flex;
      align-items: center;
      justify-content: center;
      cursor: pointer;
      position: relative;
      transition: color 0.2s;
      font-size: 14px;
      &:hover {
        color: var(--el-color-primary);
      }
      &:after {
        content: '';
        position: absolute;
        bottom: -2px;
        left: 0;
        right: 0;
        display: block;
        height: 2px;
        background-color: transparent;
        transition: all 0.2s;
      }
      &:first-child {
        margin-left: 0;
      }
      &:last-child {
        margin-right: 0;
      }
      &.active {
        font-weight: bold;
        color: var(--el-color-primary);
        &:after {
          background-color: var(--el-color-primary);
        }
      }
    }
  }
  .tab-form {
    margin-top: 1.75rem;
  }
</style>
