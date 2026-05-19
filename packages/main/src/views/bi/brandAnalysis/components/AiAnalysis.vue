<template>
  <header class="analysis-header">
    <img class="avatar" src="@/assets/images/logos/aiAvatar.png" alt="ai图像" />
    <div>路小特智能分析</div>
  </header>
  <main class="analysis-body">
    <section class="chat-box" v-for="result in originAnalysisResults" :key="result.rootDeptName">
      <div class="user" ref="userChat">
        <div class="question">
          {{ query }}
        </div>
      </div>
      <div class="robot">
        <div>
          <div class="answer" v-if="result.analysisResult">
            <!-- 处理正常状态，但是没有返回数据 -->
            <vue-markdown class="result-content" :breaks="true" :html="true" :source="chatText" />
            <img v-if="status === 'pending'" class="await-icon" src="/images/chat.webp" />
          </div>
          <div v-else class="empty-content">
            <SvgIcon icon="empty" />
            <p>当前暂无内容</p>
          </div>
        </div>
      </div>
    </section>
    <div v-if="!originAnalysisResults.length" class="empty-content">
      <SvgIcon icon="empty" />
      <p>当前暂无内容</p>
    </div>
  </main>
</template>

<script lang="ts" setup>
  import VueMarkdown from 'vue3-markdown-it';
  import 'highlight.js/styles/github-dark-dimmed.css';
  import { BiContracts } from '@/api';
  import { useTypewriter } from '@/utils/adaptiveTypewriter';
  import { useTemplateRef } from 'vue';

  const props = defineProps<{
    originAnalysisResults: BiContracts.BiAnalysisResultBean[];
  }>();
  const query = 'Hello，路小特～ 请帮我输出本月的经营分析报告';
  const analysisResults = computed(() => {
    const dpseek =
      '路小特正在深度思考中 \n\n > 好的，首先，我需要了解如何生成经营分析报告 \n\n > 1、提炼核心洞察结论 \n\n > 2、按平台、区域、品类等维度分析经营数据 \n\n ';
    return dpseek + (props.originAnalysisResults[0]?.analysisResult || '');
  });
  const { chatText, status, start, reset } = useTypewriter();
  const userChatRef = useTemplateRef<HTMLDivElement | null>('userChat');
  watch(
    analysisResults,
    () => {
      reset();
      if (!props.originAnalysisResults?.length) {
        return;
      }
      userChatRef.value?.[0]?.classList.add('flicker');
      setTimeout(() => start(analysisResults.value), 800);
      setTimeout(() => {
        userChatRef.value?.[0]?.classList.remove('flicker');
      }, 1000);
    },
    { immediate: true }
  );
</script>

<style lang="scss" scoped>
  .analysis-results {
    padding: 16px 20px 26px;
    min-height: 100%;
    flex: 1;
    display: flex;
    flex-direction: column;
    .analysis-content {
      border-radius: 10px 10px 0px 0px;
      background: url('@/assets/images/decisionAnalysis/analysis-header-bg.png') no-repeat top;
      background-size: contain;
      border-top: 0;
      flex: 1;
      min-height: 100%;
    }
    .analysis-header {
      border-radius: 10px 10px 0px 0px;
      width: 375px;
      padding-bottom: 5px;
      justify-content: center;
      align-items: center;
      padding: 0 19px 11px 20px;
      box-sizing: border-box;
      display: flex;
      column-gap: 12px;
      align-items: center;
      justify-content: start;
    }
    .avatar {
      width: 40px;
      height: 40px;
      color: var(---N9, #1f1f1f);
      font-size: 14px;
      font-style: normal;
      font-weight: 600;
      line-height: 22px; /* 157.143% */
    }
    .analysis-body {
      padding: 10px 20px;
      border-radius: 0 0 10px 10px;
      .chat-box {
        display: flex;
        flex-direction: column;
        gap: 10px;
        margin-bottom: 16px;
      }
      .user {
        align-self: end;
        width: 335px;
        padding: 10px 18px;
        box-sizing: border-box;
        color: var(---N9, #1f1f1f);
        font-family: 'PingFang SC';
        font-size: 12px;
        font-style: normal;
        font-weight: 400;
        line-height: 22px; /* 183.333% */
        border-radius: 8px;
        background: #fafafa;
      }
      .robot {
        margin-top: 20px;
      }
      .deepseek {
        color: var(---N6, #999);
        font-family: 'PingFang SC Medium';
        font-size: 12px;
        font-style: normal;
        font-weight: 400;
        line-height: 20px; /* 166.667% */
      }
      .await-icon {
        width: 36px;
        height: 36px;
        img {
          width: 100%;
          height: 100%;
        }
      }
    }
    .result-content {
      overflow: hidden;
      font-family: 'PingFang SC Medium';
      :deep(blockquote) {
        margin: 0;
        padding: 0 10px;
        border-left: 2px solid #dcdcdc;
        overflow: hidden;
        p,
        li {
          margin: 0;
          color: var(---N8, #666);
          font-family: 'PingFang SC';
          font-size: 12px;
          font-style: normal;
          font-weight: 400;
          line-height: 20px; /* 166.667% */
        }
        ol {
          margin: 0;
          padding-left: 1.25em;
        }
      }
      :deep(h1) {
        color: #000;
        font-size: 14px;
        font-style: normal;
        font-weight: 500;
        line-height: 22px; /* 157.143% */
        margin: 0;
        margin-top: 20px;
      }
      :deep(h2) {
        color: var(---N9, #1f1f1f);
        font-size: 13px;
        font-style: normal;
        font-weight: 500;
        line-height: 22px; /* 169.231% */
        margin: 0;
        margin-top: 10px;
      }
      :deep(h3) {
        color: var(---N9, #1f1f1f);
        font-size: 13px;
        font-style: normal;
        font-weight: 500;
        line-height: 22px; /* 169.231% */
        margin: 0;
      }
      :deep(p) {
        margin: 5px 0;
        color: var(---N8, #666);
        font-size: 12px;
        font-style: normal;
        font-weight: 400;
        line-height: 20px; /* 166.667% */
      }
      :deep(ol),
      :deep(ul) {
        color: var(---N8, #666);
        font-size: 12px;
        font-style: normal;
        font-weight: 400;
        line-height: 20px; /* 166.667% */
        padding-left: 1.25em;
        margin: 0;
        margin-top: 10px;
      }
      :deep(table) {
        border-collapse: collapse;
        width: 100%;
        thead {
          background: var(---N1, #f7f7f7);
          border-bottom: 1px solid var(---N3, #ededed);
        }
        th {
          color: var(---N9, #1f1f1f);
          /* 较弱/Medium 12 */
          font-family: 'PingFang SC';
          font-size: 12px;
          font-style: normal;
          font-weight: 500;
          line-height: 20px; /* 166.667% */
        }
        tbody {
          tr {
            border-bottom: 1px solid var(---N2, #f5f5f5);
            background: #fff;
            color: var(---N9, #1f1f1f);
            text-align: right;

            /* 较弱/Regular 12 */
            font-family: 'PingFang SC';
            font-size: 12px;
            font-style: normal;
            font-weight: 400;
            line-height: 20px; /* 166.667% */
          }
        }
      }
    }
  }
  @keyframes flicker {
    0% {
      opacity: 0;
    }
    50% {
      opacity: 0.5;
    }
    100% {
      opacity: 1;
    }
  }
  .flicker {
    animation: flicker 1s 1;
  }
  .empty-content {
    min-height: 244px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: 21.8px;
    color: var(---N6, #999);
    text-align: center;

    /* 常规/Regular 14 */
    font-family: 'PingFang SC';
    font-size: 14px;
    font-style: normal;
    font-weight: 400;
    line-height: 22px; /* 157.143% */
    .svg-icon {
      font-size: 100px;
      height: 100px;
      width: 100px;
      :deep(svg) {
        width: 100%;
        height: 100%;
      }
    }
  }
</style>
