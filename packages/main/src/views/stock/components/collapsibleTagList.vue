<template>
  <div class="collapsible-tag-list">
    <el-tag
      v-for="(item, index) in displayItems"
      :key="`${item.content}-${index}`"
      :type="item.type"
    >
      {{ item.content }}
    </el-tag>
    <el-button v-if="showToggle" type="primary" link class="toggle-btn" @click="toggleExpand">
      <el-icon><component :is="isExpanded ? ArrowUp : ArrowDown" /></el-icon>
    </el-button>
  </div>
</template>

<script setup lang="ts">
  import { ArrowDown, ArrowUp } from '@element-plus/icons-vue';

  type TagType = '' | 'success' | 'warning' | 'info' | 'primary' | 'danger';
  export interface TagItem {
    content: string;
    type?: TagType;
  }

  interface Props {
    items?: TagItem[];
    limit?: number;
  }

  const props = withDefaults(defineProps<Props>(), {
    items: () => [],
    limit: 3,
  });

  const isExpanded = ref(false);

  const showToggle = computed(() => props.items.length > props.limit);

  const displayItems = computed(() => {
    if (isExpanded.value || !showToggle.value) {
      return props.items;
    }
    return props.items.slice(0, props.limit);
  });

  const toggleExpand = () => {
    isExpanded.value = !isExpanded.value;
  };
</script>

<style scoped lang="scss">
  .collapsible-tag-list {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    gap: 4px;
  }

  .toggle-btn {
    padding: 0;
  }
</style>
