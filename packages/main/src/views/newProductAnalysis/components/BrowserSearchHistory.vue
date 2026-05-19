<template>
  <div class="browser-search-history" v-if="searchHistory.length">
    <div
      v-for="item in searchHistory"
      :key="item.id"
      class="search-record-item"
      @click="handleRecordClick(item)"
    >
      <!-- <el-icon class="search-icon">
        <Search />
      </el-icon> -->
      <i class="Root-tyicon icon-Root-tysousuo icon-search"></i>
      <div class="record-title">{{ item.title }}</div>
      <span class="result-count">共{{ item.resultCount }}个结果</span>
      <span class="record-time">{{ item.time }}</span>
    </div>
  </div>

  <Empty v-else description="当前暂无搜索记录" />
</template>

<script setup lang="ts" name="BrowserSearchHistory">
  import { ref } from 'vue';
  import { Search } from '@element-plus/icons-vue';
  import Empty from './Empty.vue';

  interface SearchRecord {
    id: number;
    title: string;
    resultCount: number;
    time: string;
  }

  const emit = defineEmits<{
    (e: 'recordClick', record: SearchRecord): void;
  }>();

  // 预设4条搜索记录
  const searchHistory = ref<SearchRecord[]>([
    {
      id: 1,
      title: '搜索"轻便折叠 高景观 越野避震销售占比 2024"',
      resultCount: 8,
      time: '7月29日 14:35',
    },
    {
      id: 2,
      title: '2024年婴儿手推车市场分析报告.html',
      resultCount: 8,
      time: '7月29日 14:35',
    },
    {
      id: 3,
      title: '搜索"轻便折叠 高景观 越野避震销售占比 2024"',
      resultCount: 8,
      time: '7月29日 14:35',
    },
    {
      id: 4,
      title: '搜索"轻便折叠 高景观 越野避震销售占比 2024"',
      resultCount: 8,
      time: '7月29日 14:35',
    },
    {
      id: 1,
      title: '搜索"轻便折叠 高景观 越野避震销售占比 2024"',
      resultCount: 8,
      time: '7月29日 14:35',
    },
    {
      id: 2,
      title: '2024年婴儿手推车市场分析报告.html',
      resultCount: 8,
      time: '7月29日 14:35',
    },
    {
      id: 3,
      title: '搜索"轻便折叠 高景观 越野避震销售占比 2024"',
      resultCount: 8,
      time: '7月29日 14:35',
    },
    {
      id: 4,
      title: '搜索"轻便折叠 高景观 越野避震销售占比 2024"',
      resultCount: 8,
      time: '7月29日 14:35',
    },
    {
      id: 1,
      title: '搜索"轻便折叠 高景观 越野避震销售占比 2024"',
      resultCount: 8,
      time: '7月29日 14:35',
    },
    {
      id: 2,
      title: '2024年婴儿手推车市场分析报告.html',
      resultCount: 8,
      time: '7月29日 14:35',
    },
    {
      id: 3,
      title: '搜索"轻便折叠 高景观 越野避震销售占比 2024"',
      resultCount: 8,
      time: '7月29日 14:35',
    },
    {
      id: 4,
      title: '搜索"轻便折叠 高景观 越野避震销售占比 2024"',
      resultCount: 8,
      time: '7月29日 14:35',
    },
    {
      id: 1,
      title: '搜索"轻便折叠 高景观 越野避震销售占比 2024"',
      resultCount: 8,
      time: '7月29日 14:35',
    },
    {
      id: 2,
      title: '2024年婴儿手推车市场分析报告.html',
      resultCount: 8,
      time: '7月29日 14:35',
    },
    {
      id: 3,
      title: '搜索"轻便折叠 高景观 越野避震销售占比 2024"',
      resultCount: 8,
      time: '7月29日 14:35',
    },
    {
      id: 4,
      title: '搜索"轻便折叠 高景观 越野避震销售占比 2024"',
      resultCount: 8,
      time: '7月29日 14:35',
    },
    {
      id: 1,
      title: '搜索"轻便折叠 高景观 越野避震销售占比 2024"',
      resultCount: 8,
      time: '7月29日 14:35',
    },
    {
      id: 2,
      title: '2024年婴儿手推车市场分析报告.html',
      resultCount: 8,
      time: '7月29日 14:35',
    },
    {
      id: 3,
      title: '搜索"轻便折叠 高景观 越野避震销售占比 2024"',
      resultCount: 8,
      time: '7月29日 14:35',
    },
    {
      id: 4,
      title: '搜索"轻便折叠 高景观 越野避震销售占比 2024"',
      resultCount: 8,
      time: '7月29日 14:35',
    },
    {
      id: 1,
      title: '搜索"轻便折叠 高景观 越野避震销售占比 2024"',
      resultCount: 8,
      time: '7月29日 14:35',
    },
    {
      id: 2,
      title: '2024年婴儿手推车市场分析报告.html',
      resultCount: 8,
      time: '7月29日 14:35',
    },
    {
      id: 3,
      title: '搜索"轻便折叠 高景观 越野避震销售占比 2024"',
      resultCount: 8,
      time: '7月29日 14:35',
    },
    {
      id: 4,
      title: '搜索"轻便折叠 高景观 越野避震销售占比 2024"',
      resultCount: 8,
      time: '7月29日 14:35',
    },
  ]);

  const handleRecordClick = (record: SearchRecord) => {
    emit('recordClick', record);
  };
</script>

<style scoped lang="scss">
  .browser-search-history {
    padding: 8px 8px 20px;
    height: 100%;
    border: 1px solid #ededed;
    border-radius: 10px;
    overflow-y: auto;
  }

  .search-record-item {
    display: flex;
    align-items: center;
    gap: 8px;
    padding: 10px 12px;
    font-size: 12px;
    background: #ffffff;
    border-radius: 4px;
    cursor: pointer;

    &:hover {
      background: var(---N1);
    }

    .icon-search {
      font-size: 14px;
      color: var(---N6);
      flex-shrink: 0;
    }

    .record-title {
      flex: 1;
      color: var(---N9);
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
      min-width: 0;
    }

    .result-count {
      flex-shrink: 0;
      padding: 0px 4px;
      color: var(---N8);
      white-space: nowrap;
      background-color: var(---N1);
    }

    .record-time {
      color: var(---N8);
      flex-shrink: 0;
      white-space: nowrap;
    }
  }
  .empty-content {
    min-height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    text-align: center;
    border: 1px solid #e4e7ed;
    border-radius: 8px;
  }
</style>
