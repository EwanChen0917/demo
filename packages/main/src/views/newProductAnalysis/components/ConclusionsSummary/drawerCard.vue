<template>
  <div class="text-card">
    <EvidenceChain
      v-if="showEvide"
      :card-info="cardInfo"
      :title="props.title"
      :showTitle="true"
      @drawer-click="emit('drawer-click')"
    />
    <div class="card-content">
      <slot name="content">
        <!-- v-html="cardInfo.chart_data.data?.content" -->
        <pre
          class="content-item pre-item"
          v-if="cardInfo.chart_data.data?.content"
          v-html="formatMarkdown(cardInfo.chart_data.data?.content)"
        ></pre>
        <div class="content-item" v-else>
          <span>趋势分析：</span>
          <span v-if="typeof cardInfo.evidence_chain == 'string'">
            {{ cardInfo.evidence_chain }}
          </span>
          <span v-else>
            <span v-for="(item, index) in cardInfo.evidence_chain" :key="index">{{ item }}</span>
          </span>
        </div>

        <!-- <div v-for="(item, index) in cardInfo.data" :key="index" class="content-item">
          <span>{{ item.label }}：</span>
          <span>{{ item.value }}</span>
        </div> -->
      </slot>
    </div>
  </div>
</template>

<script setup lang="ts">
  import EvidenceChain from './evidenceChain.vue';
  interface infoType {
    title?: string;
    conclusion?: string;
    evidence_chain?: string;
  }

  const props = withDefaults(
    defineProps<{
      cardInfo: infoType;
      title: string;
      showEvide?: boolean;
    }>(),
    {
      cardInfo: () => {
        return {};
      },
      title: '',
      showEvide: false,
    }
  );

  const emit = defineEmits<{
    (event: 'drawer-click'): void;
  }>();

  function formatMarkdown(text) {
    if (typeof text !== 'string') return '';
    return text
      .replace(/### (.+)/g, '<div style="color: #1f1f1f;font-family: \'PingFang SC Medium\';">$1</div>') // 处理标题 ###
      .replace(/\*\*(.+?)\*\*/g, '<span>$1</span>') // 处理粗体 **
      .replace(/\n/g, '<br>')
      .replace(/\n+/g, '\n')
      .replace(/<\/div>\s*<br\s*\/?>/gi, '</div>');
  }
</script>

<style lang="scss" scoped>
  .text-card {
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    gap: 4px;
    align-self: stretch;
    padding: 12px 16px;
    border-radius: 8px;
    border: 1px solid var(---N2, #f5f5f5);
    .card-title {
      display: flex;
      gap: 8px;
      width: 100%;
      .c-title {
        color: var(---N9, var(---N9, #262626));
        font-family: 'PingFang SC Medium';
        font-size: 12px;
        font-style: normal;
        font-weight: 500;
        line-height: 20px;
      }
    }
  }
  .card-content {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: flex-start;
    gap: 4px;
    .content-item {
      color: var(---N8, var(---N8, #585a5a));
      text-align: justify;
      font-size: 12px;
      font-style: normal;
      font-weight: 400;
      line-height: 20px;
      font-family: 'PingFang SC';
    }
    .pre-item {
      margin-bottom: 0;
      line-height: 22px;
      white-space: pre-wrap;
    }
  }
</style>
