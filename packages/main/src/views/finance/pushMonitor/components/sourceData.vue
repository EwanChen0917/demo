<!-- src/views/finance/pushMonitor/components/sourceData.vue -->
<template>
  <div class="target-data-container">
    <CodeEditor
      v-if="props.detail?.sourceData"
      ref="editorRef"
      :content="props.detail.sourceData"
    />
    <div v-else class="no-data">
      <EmptyAnimation name="listEmpty" :width="128" :height="128" :loop="true" />

      <div class="text">暂无源数据</div>
    </div>
  </div>
</template>

<script setup lang="ts">
  import CodeEditor from './CodeViwer.vue';
  import EmptyAnimation from '@/components/EmptyAnimation/index.vue';

  const props = withDefaults(
    defineProps<{
      detail: { sourceData: string };
    }>(),
    {
      detail: () => ({ sourceData: '' }),
    }
  );

  const editorRef = ref();
</script>

<style scoped lang="scss">
  .target-data-container {
    text-align: left;

    .no-data {
      padding: 100px;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      color: rgb(153, 153, 153);
      font-size: 12px;
    }
  }
</style>