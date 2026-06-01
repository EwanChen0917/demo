<template>
  <div class="column logs">
    <div class="section-title">更新日志</div>
    <div ref="logListRef" class="log-list" v-loading="loading">
      <div v-if="templateVisible && templateLog" class="log-item template-log">
        <div class="log-header">
          <el-avatar :size="28" :src="templateLog.avatar">
            <span v-if="!templateLog.avatar">{{ templateLog.operator?.slice(0, 1) || '用' }}</span>
          </el-avatar>
          <div class="log-meta">
            <div class="operator">更新人：{{ templateLog.operator || '未知用户' }}</div>
            <div class="time">更新时间：{{ templateLog.time || '--' }}</div>
          </div>
        </div>
        <div class="log-body">
          <div v-if="templateLog.added?.length" class="log-tags">
            <span class="log-label success">绑定菜单</span>
            <span
              v-for="tag in displayTags(templateLog.added, 'template-added')"
              :key="`add-${tag}`"
              class="lite-tag lite-tag--success"
              :title="tag"
            >
              {{ tag }}
            </span>
            <el-button
              v-if="shouldCollapse(templateLog.added)"
              text
              size="small"
              type="primary"
              @click="toggleCollapse('template-added')"
            >
              {{ isExpanded('template-added') ? '收起' : '... 展开' }}
            </el-button>
          </div>
          <div v-if="templateLog.removed?.length" class="log-tags">
            <span class="log-label danger">解绑菜单</span>
            <span
              v-for="tag in displayTags(templateLog.removed, 'template-removed')"
              :key="`rm-${tag}`"
              class="lite-tag lite-tag--danger"
              :title="tag"
            >
              {{ tag }}
            </span>
            <el-button
              v-if="shouldCollapse(templateLog.removed)"
              text
              size="small"
              type="primary"
              @click="toggleCollapse('template-removed')"
            >
              {{ isExpanded('template-removed') ? '收起' : '... 展开' }}
            </el-button>
          </div>
          <div v-if="templateLog.content" class="log-text" v-html="templateLog.content"></div>
        </div>
      </div>
      <el-empty v-if="!logs?.length" description="暂无日志" />
      <div v-else class="log-item" v-for="(item, index) in logs" :key="index">
        <div class="log-header">
          <el-avatar :size="28" :src="item.avatar">
            <span v-if="!item.avatar">{{ item.operator?.slice(0, 1) || '用' }}</span>
          </el-avatar>
          <div class="log-meta">
            <div class="operator">{{ item.operator || '未知用户' }}</div>
            <div class="time">{{ item.time }}</div>
          </div>
        </div>
        <div class="log-body">
          <div v-if="item.content" class="log-text" v-html="item.content"></div>
          <div v-if="item.added?.length" class="log-tags">
            <span class="log-label success">绑定菜单</span>
            <span
              v-for="tag in displayTags(item.added, `log-${index}-added`)"
              :key="`add-${tag}`"
              class="lite-tag lite-tag--success"
              :title="tag"
            >
              {{ tag }}
            </span>
            <el-button
              v-if="shouldCollapse(item.added)"
              text
              size="small"
              type="primary"
              @click="toggleCollapse(`log-${index}-added`)"
            >
              {{ isExpanded(`log-${index}-added`) ? '收起' : '... 展开' }}
            </el-button>
          </div>
          <div v-if="item.removed?.length" class="log-tags">
            <span class="log-label danger">解绑菜单</span>
            <span
              v-for="tag in displayTags(item.removed, `log-${index}-removed`)"
              :key="`rm-${tag}`"
              class="lite-tag lite-tag--danger"
              :title="tag"
            >
              {{ tag }}
            </span>
            <el-button
              v-if="shouldCollapse(item.removed)"
              text
              size="small"
              type="primary"
              @click="toggleCollapse(`log-${index}-removed`)"
            >
              {{ isExpanded(`log-${index}-removed`) ? '收起' : '... 展开' }}
            </el-button>
          </div>
        </div>
      </div>
    </div>
    <div v-if="showFooter" class="log-footer">
      <span v-if="loadingMore">加载中...</span>
      <span v-else>没有更多了</span>
    </div>
  </div>
</template>

<script setup>
  import { nextTick, ref, reactive, computed, watch } from 'vue';
  import { useDebounceFn, useScroll } from '@vueuse/core';

  const props = defineProps({
    logs: {
      type: Array,
      default: () => [],
    },
    loading: {
      type: Boolean,
      default: false,
    },
    templateLog: {
      type: Object,
      default: null,
    },
    templateKey: {
      type: String,
      default: '',
    },
    hasMore: {
      type: Boolean,
      default: true,
    },
    loadingMore: {
      type: Boolean,
      default: false,
    },
    page: {
      type: Number,
      default: 1,
    },
    pageSize: {
      type: Number,
      default: 10,
    },
  });
  const showFooter = computed(() => {
    if (props.loadingMore) return true;
    const shouldShowNoMore = !props.hasMore && props.logs?.length && arrivedState.bottom;
    return shouldShowNoMore;
  });
  const emit = defineEmits(['load-more']);

  const logListRef = ref(null);
  const templateVisible = ref(false);
  const collapseState = reactive({});

  const isExpanded = (key) => !!collapseState[key];
  const toggleCollapse = (key) => {
    collapseState[key] = !collapseState[key];
  };
  const shouldCollapse = (list = []) => Array.isArray(list) && list.length > 4;
  const displayTags = (list = [], key) => {
    if (!Array.isArray(list)) return [];
    if (!shouldCollapse(list)) return list;
    return isExpanded(key) ? list : list.slice(0, 4);
  };

  const checkTemplateVisibility = () => {
    if (!props.templateLog) {
      templateVisible.value = false;
      return;
    }
    templateVisible.value = true;
  };

  watch(
    () => [props.templateLog, props.templateKey],
    () => checkTemplateVisibility(),
    { immediate: true }
  );

  const { arrivedState, y } = useScroll(logListRef, {
    offset: { bottom: 70 },
  });

  const triggerLoadMore = useDebounceFn(() => {
    if (!props.hasMore || props.loadingMore || props.loading) return;
    emit('load-more', props.page + 1);
  }, 200);

  watch(
    () => arrivedState.bottom,
    (isBottom) => {
      if (isBottom && y.value > 0) {
        triggerLoadMore();
      }
    }
  );
</script>

<style scoped lang="scss">
  .column {
    background: #fff;
    border: 1px solid #ebeef5;
    border-radius: 8px;
    padding: 12px 12px 16px;
    min-height: 600px;
    box-shadow: 0 1px 3px rgba(0, 0, 0, 0.03);
    display: flex;
    flex-direction: column;
  }

  .section-title {
    font-weight: 600;
    margin-bottom: 12px;
  }

  .logs {
    display: flex;
    flex-direction: column;
    height: 100%;
    min-height: 0;
    .log-list {
      display: flex;
      flex-direction: column;
      gap: 12px;
      flex: 1;
      min-height: 0;
      overflow: auto;
      :deep(.el-empty) {
        flex: 1;
      }
    }
    .log-item {
      border: 1px solid #ebeef5;
      border-radius: 8px;
      padding: 10px;
      display: flex;
      flex-direction: column;
      gap: 8px;
      &.template-log {
        border-color: var(--el-color-primary-light-5);
        background: #f7fbff;
      }
    }
    .log-header {
      display: flex;
      align-items: center;
      gap: 10px;
      .log-meta {
        display: flex;
        flex-direction: column;
        gap: 4px;
        .operator {
          font-weight: 600;
        }
        .time {
          color: #909399;
          font-size: 12px;
        }
      }
    }
    .log-body {
      display: flex;
      flex-direction: column;
      gap: 6px;
      .log-tags {
        display: flex;
        align-items: center;
        gap: 6px;
        flex-wrap: wrap;
      }
      .log-label {
        font-size: 12px;
        &.danger {
          color: var(--el-color-danger);
        }
        &.success {
          color: var(--el-color-success);
        }
      }
      .log-text {
        font-size: 12px;
        color: #606266;
        line-height: 18px;
      }
      .lite-tag {
        display: inline-flex;
        align-items: center;
        height: 20px;
        padding: 0 8px;
        border-radius: 4px;
        font-size: 12px;
        line-height: 20px;
        white-space: nowrap;
        border: 1px solid var(--el-border-color-light);
        background-color: var(--el-fill-color-light);
        color: var(--el-text-color-regular);
      }
      .lite-tag--success {
        border-color: var(--el-color-success-light-7);
        background-color: var(--el-color-success-light-9);
        color: var(--el-color-success);
      }
      .lite-tag--danger {
        border-color: var(--el-color-danger-light-7);
        background-color: var(--el-color-danger-light-9);
        color: var(--el-color-danger);
      }
    }
    .log-footer {
      min-height: 24px;
      display: flex;
      align-items: center;
      justify-content: center;
      color: #909399;
      font-size: 12px;
    }
  }
</style>
