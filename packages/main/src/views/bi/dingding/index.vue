<template>
  <div class="bi-dingding" v-loading="loading">
    <vue-markdown class="result-content" :breaks="true" :html="true" :source="chatText" />
    <div class="info">📣 APP端正在加急开发中，很快就会见面～</div>
    <div class="single-url" v-if="singleUrl">
      <a class="view-report" :href="singleUrl" target="_blank">
        <span>去经营BI查看详情 (PC端)</span>
        <svg
          width="16"
          height="16"
          viewBox="0 0 16 16"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M5.33331 13.3327L10.6666 7.99935L5.33331 2.66602"
            stroke="#258DFF"
            stroke-width="1.5"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
        </svg>
      </a>
    </div>
  </div>
</template>

<script setup lang="ts" name="dingdingDecisionAnalysis">
  import { biApi } from '@/api';
  import VueMarkdown from 'vue3-markdown-it';
  import 'highlight.js/styles/github-dark-dimmed.css';

  const chatText = ref('');
  const singleUrl = ref('');
  const loading = ref(true);
  const route = useRoute();
  biApi
    .biSalesQueryCurrMonthAnalysisResult(route.query)
    .then((res) => {
      chatText.value = res.analysisResult.analysisResult || '当前暂无内容';
      singleUrl.value = res.singleUrl || '';
    })
    .finally(() => {
      loading.value = false;
    });
</script>

<style lang="scss" scoped>
  .bi-dingding {
    position: fixed;
    inset: 0;
    z-index: 99;
    overflow: auto;
    max-width: 600px;
    box-sizing: border-box;
    margin: auto;
    padding: 0 24px 0;
    font-size: 14px;
    line-height: 1.6;
    color: #1f1f1f;
    background-color: #fff;
    :deep(img) {
      max-width: 600px;
      margin: auto;
      width: 100%;
      height: auto;
    }
  }
  .header {
    padding: 16px 0;
    color: var(---N9, #1f1f1f);
    /* 重要/Regular 16 */
    font-family: 'PingFang SC';
    font-size: 16px;
    font-style: normal;
    font-weight: 400;
    line-height: 24px; /* 150% */
    @media screen and (max-width: 300px) {
      display: none;
    }
  }
  .result-content {
    padding-top: 20px;
    color: var(---N8, #666);
    :deep(h2) {
      margin-top: 30px;
      margin-bottom: 10px;
      color: #000;
      font-family: 'PingFang SC';
      font-size: 16px;
      font-style: normal;
      font-weight: 500;
      line-height: 24px; /* 150% */
    }
    :deep(strong) {
      color: var(---N9, #1f1f1f);
      font-weight: 500;
    }
    :deep(li + li) {
      margin-top: 8px;
    }
    :deep(img) {
      margin-top: 20px;
    }
  }
  .info {
    padding: 20px 0;
    color: var(---N9, #1f1f1f);
    font-family: 'PingFang SC';
    font-size: 14px;
    font-style: normal;
    font-weight: 400;
    line-height: 22px; /* 157.143% */
  }
  .single-url {
    position: sticky;
    bottom: 0;
    background-color: #fff;
    padding: 20px;
    border-top: 1px solid var(--N3, #ededed);
    .view-report {
      font-size: 14px;
      color: var(---C2, #258dff);
      display: flex;
      column-gap: 6px;
      align-items: center;
    }
  }
</style>
