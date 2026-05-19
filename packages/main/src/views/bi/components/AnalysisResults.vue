<template>
  <div class="analysis-results">
    <div class="analysis-content">
      <header class="analysis-header">
        <div class="year">{{ dayjs(searchParams.startMonth).format('YYYY年MM月') }}</div>
      </header>
      <main class="analysis-body">
        <section
          class="analysis-section"
          v-for="result in originAnalysisResults"
          :key="result.rootDeptName"
        >
          <div class="analysis-result">
            <div class="result-header">
              <span class="dept">{{ result.analysisTypeDesc }}</span>
              <span class="name">
                <img class="avatar" :src="result.avatar || userImg" alt="用户图像" />
                <span>{{ result.rootDeptName }}-{{ result.name }}</span>
              </span>
            </div>
            <div
              v-if="result.analysisResult"
              class="result-content"
              v-html="result.analysisResult"
            ></div>
            <div v-else class="empty-content">
              <SvgIcon icon="empty" />
              <p>当前暂无内容</p>
            </div>
          </div>
        </section>
        <div v-if="!originAnalysisResults.length" class="empty-content">
          <SvgIcon icon="empty" />
          <p>当前暂无内容</p>
        </div>
      </main>
    </div>
  </div>
</template>

<script lang="ts" setup>
  import { BiContracts } from '@/api';
  import dayjs from 'dayjs';
  import userImg from '@/assets/svgs/defaultUser.svg';

  const props = withDefaults(
    defineProps<{
      originAnalysisResults?: BiContracts.BiAnalysisResultBean[];
      searchParams: BiContracts.ManageAnalysisReq;
    }>(),
    {
      originAnalysisResults: () => [],
    }
  );
</script>

<style lang="scss" scoped>
  .analysis-results {
    padding: 16px 20px 26px;
    min-height: 100%;
    display: flex;
    overflow: hidden;
    .analysis-content {
      min-height: 100%;
      display: flex;
      flex-direction: column;
      border-radius: 10px 10px 0px 0px;
      background: url('@/assets/images/decisionAnalysis/analysis-header-bg.png') no-repeat top;
      background-size: contain;
    }
    .analysis-header {
      border-radius: 10px 10px 0px 0px;
      width: 375px;
      height: 54px;
      padding-bottom: 5px;
      justify-content: center;
      align-items: center;
      padding: 19px 19px 11px 20px;
      box-sizing: border-box;
    }
    .year {
      color: var(---N9, #1f1f1f);
      font-size: 14px;
      font-style: normal;
      font-weight: 600;
      line-height: 22px; /* 157.143% */
    }
    .month-tags {
      display: flex;
      gap: 18px;
      margin-top: 16px;
      .month-tag {
        flex: 1;
        display: inline-flex;
        justify-content: center;
        align-items: center;
        border-radius: 20px;
        background: var(---N10, #000);
        color: var(---N0, #fff);
        font-size: 13px;
        font-style: normal;
        font-weight: 400;
        line-height: 22px; /* 169.231% */
      }
    }
    .result-header {
      padding: 7px 0;
      display: flex;
      justify-content: space-between;
      .dept {
        color: var(---N9, #1f1f1f);
        /* 常规/Medium 14 */
        font-family: 'PingFang SC Medium', sans-serif;
        font-size: 14px;
        font-style: normal;
        font-weight: 500;
        line-height: 22px; /* 157.143% */
      }
      .name {
        color: var(---N6, #999);
        font-size: 12px;
        font-style: normal;
        font-weight: 400;
        line-height: 20px; /* 166.667% */
        display: flex;
        align-items: center;
        gap: 6px;
      }
      .avatar {
        width: 16px;
        height: 16px;
        border-radius: 50%;
      }
    }
    .analysis-body {
      flex: 1;
      width: 100%;
      border: 1px solid var(---N2, #f5f5f5);
      border-top: 0;
      border-radius: 0 0 10px 10px;
      .analysis-section {
        border-bottom: 1px solid var(---N2, #f5f5f5);
        padding-bottom: 20px;
        & + .analysis-section {
          padding-top: 20px;
        }
      }
      .analysis-result {
        padding: 0 20px;
      }
    }
    .result-content {
      overflow: hidden;
      margin-top: 10px;
      :deep(h2) {
        color: var(---N9, #1f1f1f);
        font-family: 'PingFang SC Medium', sans-serif;
        font-size: 13px;
        font-style: normal;
        font-weight: 500;
        line-height: 22px; /* 169.231% */
      }
      :deep(h2 ~ h2) {
        margin-top: 30px;
      }
      :deep(h3) {
        color: var(---N9, #1f1f1f);
        font-family: 'PingFang SC Medium';
        font-size: 13px;
        font-style: normal;
        font-weight: 500;
        line-height: 22px; /* 169.231% */
      }
      :deep(p) {
        margin: 10px 0;
        color: var(---N8, #666);

        /* 较弱/Regular 12 */
        font-family: 'PingFang SC';
        font-size: 12px;
        font-style: normal;
        font-weight: 400;
        line-height: 20px; /* 166.667% */
      }
      :deep(ul) {
        padding-left: 0;
        margin-bottom: 10px;
        list-style: none;
        color: #1f1f1f;
        font-family: 'PingFang SC', sans-serif;
        font-size: 12px;
        font-style: normal;
        font-weight: 400;
        line-height: 22px; /* 183.333% */
      }
      :deep(strong) {
        color: var(---N9, #1f1f1f);

        /* 较弱/Medium 12 */
        font-family: 'PingFang SC Medium', sans-serif;
        font-size: 12px;
        font-style: normal;
        font-weight: 500;
        line-height: 20px; /* 166.667% */
      }
    }
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
