<template>
  <div class="browser-search-result">
    <!-- 头部标题和返回按钮 -->
    <!-- <div class="result-header">
      <el-icon class="back-icon" @click="handleBack">
        <ArrowLeft />
      </el-icon>
      <div class="header-content">
        <span class="search-title">{{ searchTitle }}</span>
        <span class="result-count">共{{ resultList.length }}个结果</span>
      </div>
    </div> -->

    <!-- 搜索结果列表 -->
    <div class="result-list-wrapper">
      <div class="result-list" v-if="resultList.length">
        <div
          v-for="item in resultList"
          :key="item.title"
          class="result-item"
          @click="handleOpenUrl(item)"
        >
          <div class="result-header-row">
            <div class="result-title">{{ item.title }}</div>
          </div>
          <div class="result-snippet">{{ item.snippet }}</div>
          <div class="result-footer">
            <div class="result-link">
              <!-- <img :src="getPlatformIcon(item.platform)" class="platform-icon" /> -->
              <i class="Root-tyicon icon-Root-tywangluo"></i>
              <span class="link-text">来源：{{ item.link }}</span>
            </div>
          </div>
        </div>
      </div>
      <Empty v-else description="当前暂无记录" />
    </div>
  </div>
</template>

<script setup lang="ts" name="BrowserSearchResult">
  import Empty from './Empty.vue';
  import { useReport } from '../hooks/useReport';

  const { report } = useReport();

  interface SearchResultItem {
    title: string;
    snippet: string;
    link: string;
  }

  interface Props {
    searchTitle?: string;
    instanceCode?: string;
    resultList?: SearchResultItem[];
  }

  const props = withDefaults(defineProps<Props>(), {
    searchTitle: '搜索"轻便折叠 高景观 越野避震销售占比 2024"',
    resultList: () => [],
  });

  const emit = defineEmits<{
    (e: 'back'): void;
  }>();

  const handleBack = () => {
    emit('back');
  };

  const handleOpenUrl = (item: SearchResultItem) => {
    window.open(item.link);

    report('page_view_result', {
      task_id: props.instanceCode,
      file_name: item.title,
      file_type: '网页检索链接',
    });
  };
</script>

<style scoped lang="scss">
  .browser-search-result {
    display: flex;
    flex-direction: column;
    height: 100%;
    background: #fff;
    overflow: hidden;
  }

  .result-header {
    display: flex;
    align-items: center;
    gap: 10px;
    padding: 10px 0;
    flex-shrink: 0;
    color: var(---N9);

    .back-icon {
      font-size: 16px;
      cursor: pointer;
    }

    .header-content {
      flex: 1;
      display: flex;
      align-items: center;
      gap: 12px;
      overflow: hidden;

      .search-title {
        font-size: 14px;
        font-weight: 600;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
      }

      .result-count {
        font-size: 12px;
        color: var(---N6);
        padding: 0px 4px;
        background-color: var(---N1);
        flex-shrink: 0;
      }
    }
  }

  .result-list-wrapper {
    flex: 1;
    overflow-y: auto;
    padding: 8px;
    display: flex;
    justify-content: center;
    border: 1px solid #e4e7ed;
    border-radius: 10px;
  }

  .result-list {
    width: 100%;
    max-width: 640px;
  }

  .result-item {
    padding: 16px 20px;
    cursor: pointer;
    line-height: 22px;
    border-radius: 6px;

    &:last-child {
      border-bottom: none;
    }

    &:hover {
      background: var(---N1);
    }

    .result-title {
      font-size: 14px;
      color: var(---N9);
      font-weight: 600;
    }

    .result-snippet {
      display: -webkit-box;
      padding: 10px 0;
      box-orient: vertical;
      line-clamp: 2;
      overflow: hidden;
      font-size: 13px;
      color: var(---N8);
      text-overflow: ellipsis;
    }

    .result-footer {
      display: flex;
      align-items: center;
      justify-content: space-between;
    }

    .result-link {
      display: flex;
      align-items: center;
      width: 100%;
      overflow: hidden;
      gap: 6px;
      font-size: 12px;
      color: var(---N6);

      .link-text {
        text-overflow: ellipsis;
        white-space: nowrap;
        overflow: hidden;
      }
    }
  }
</style>
