<template>
  <div class="ai-history-wrapper">
    <div class="history-height">
      <span>历史对话</span>
      <SvgIcon icon="close" class="close-icon" @click="closeHistory" />
    </div>
    <div class="history-content" v-loading="loading">
      <div
        v-for="item in list"
        :key="item.id"
        class="history-item"
        @click="$emit('view-history', item.id)"
      >
        <span>{{ item.name }}</span>
        <span class="history-time">{{ dayjs(item.created_at * 1000).format('YYYY-MM-DD') }}</span>
      </div>
    </div>
    <div class="history-footer">仅显示最近 10 条对话</div>
  </div>
</template>

<script setup lang="ts">
  import dayjs from 'dayjs';
  import { getHistoryList } from '../api/chat';

  const emit = defineEmits<{
    closeHistory: [];
    viewHistory: [id: string];
  }>();
  const closeHistory = () => {
    emit('closeHistory');
  };

  const list = ref([]);
  const loading = ref(false);
  const initData = async () => {
    loading.value = true;
    // 初始化历史记录数据
    const res = await getHistoryList(10).finally(() => {
      loading.value = false;
    });
    list.value = res.data || [];
  };
  initData();
</script>

<style scoped lang="scss">
  .ai-history-wrapper {
    height: 100%;
    display: flex;
    flex-direction: column;
  }
  .history-height {
    height: 48px;
    line-height: 48px;
    padding: 0 16px;
    font-size: 16px;
    font-weight: 500;
    color: #1f1f1f;
    border-bottom: 1px solid #f0f0f0;
    position: relative;

    .close-icon {
      position: absolute;
      right: 16px;
      top: 50%;
      transform: translateY(-50%);
      cursor: pointer;
      font-size: 18px;
      color: var(--N6, #999);
      &:hover {
        color: var(--N9, #1f1f1f);
      }
    }
  }
  .history-content {
    padding: 15px 0 0;
    min-height: 138px;
    .history-item {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 12px 20px;
      color: var(---N9, #1f1f1f);

      /* 常规/Regular 13 */
      font-family: 'PingFang SC';
      font-size: 13px;
      font-style: normal;
      font-weight: 400;
      line-height: 22px; /* 169.231% */
      cursor: pointer;
      &:hover {
        background: var(---P1, #f0fff6);
        color: var(---P6, #02b96b);
      }
    }
  }
  .history-footer {
    padding: 10px 0 13px;
    text-align: center;
    color: var(---N6, #999);

    /* 较弱/Regular 12 */
    font-family: 'PingFang SC';
    font-size: 12px;
    font-style: normal;
    font-weight: 400;
    line-height: 20px; /* 166.667% */
  }
</style>
