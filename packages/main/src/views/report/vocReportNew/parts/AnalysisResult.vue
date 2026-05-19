<template>
  <div class="analysis-results">
    <div class="analysis-content">
      <div class="analysis-switch-header">
        <!-- 开关 -->
        <label for="filter" class="switch analysis-switch">
          <input type="checkbox" id="filter" @change="filterEnabled = !filterEnabled" />
          <span>路小特智能分析</span>
          <span>业务策略分析</span>
        </label>
      </div>
      <div class="switch-content">
        <keep-alive>
          <component
            :is="filterEnabled ? ReportList : AiAnalysis"
            :originAnalysisResults="analysisResult"
          />
        </keep-alive>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
  import 'highlight.js/styles/github-dark-dimmed.css';
  import { BiContracts } from '@/api';
  import AiAnalysis from '../components/AiAnalysis.vue';
  import ReportList from '../components/report/ReportList.vue';

  const props = defineProps<{
    originAnalysisResults: BiContracts.BiAnalysisResultBean[];
  }>();

  const filterEnabled = ref(false);
  const analysisResult = computed(() => {
    return props.originAnalysisResults.filter((item) => {
      return filterEnabled.value
        ? item.analysisType === 'by_business_strategy'
        : item.analysisType === 'by_lute_ai';
    });
  });
</script>

<style lang="scss" scoped>
  .analysis-results {
    border-radius: 10px;
    min-height: 100%;
    display: flex;
    flex-direction: column;
    box-sizing: border-box;
    .analysis-content {
      border-radius: 10px;
      // background: url('@/assets/images/decisionAnalysis/analysis-header-bg.png') no-repeat top;
      // background-size: contain;
      border: 1px solid rgb(245, 245, 245);
      border-top: 0;
      flex: 1;
      min-height: 100%;
      display: flex;
      flex-direction: column;
    }
    .analysis-switch-header {
      background: url('@/assets/images/decisionAnalysis/analysis-header-bg.png') no-repeat top;
      background-size: cover;
      border-radius: 10px 10px 0px 0px;
      width: 100%;
      height: 82px;
      padding: 8px 19px 11px 20px;
      box-sizing: border-box;
      display: flex;
      column-gap: 12px;
      align-items: center;
      justify-content: start;
      position: sticky;
      top: 0;
      z-index: 1;
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
    .switch-content {
      flex: 1;
      display: flex;
      flex-direction: column;
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
  /* From Uiverse.io by cbolson */
  .switch {
    --_switch-bg-clr: #fff;
    --_switch-padding: 0; /* padding around button*/
    --_slider-bg-clr: #000; /* slider color unchecked */
    --_slider-bg-clr-on: #000; /* slider color checked */
    --_slider-txt-clr: #ffffff;
    --_label-padding: 7px 23px; /* padding around the labels -  this gives the switch it's global width and height */
    --_switch-easing: cubic-bezier(0.47, 1.64, 0.41, 0.8); /* easing on toggle switch */
    color: var(---N8, #666);
    border-radius: 39px;
    cursor: pointer;
    display: grid;
    grid-template-columns: repeat(2, minmax(0, 1fr));
    position: relative;
    isolation: isolate;
    width: 260px;
    margin: auto;
    font-family: 'PingFang SC';
    font-size: 14px;
    font-style: normal;
    font-weight: 500;
    line-height: 22px; /* 157.143% */
    white-space: nowrap;
    opacity: 1;
  }

  .switch input[type='checkbox'] {
    position: absolute;
    width: 1px;
    height: 1px;
    padding: 0;
    margin: -1px;
    overflow: hidden;
    clip: rect(0, 0, 0, 0);
    white-space: nowrap;
    border-width: 0;
  }
  .switch > span {
    display: grid;
    place-content: center;
    transition: opacity 300ms ease-in-out 150ms;
    padding: var(--_label-padding);
  }
  .switch::before,
  .switch::after {
    content: '';
    position: absolute;
    border-radius: inherit;
    transition: inset 150ms ease-in-out;
  }
  /* switch slider */
  .switch::before {
    background-color: var(--_slider-bg-clr);
    inset: var(--_switch-padding) 50% var(--_switch-padding) var(--_switch-padding);
    transition: inset 500ms var(--_switch-easing), background-color 500ms ease-in-out;
    z-index: -1;
  }
  /* switch bg color */
  .switch::after {
    background-color: var(--_switch-bg-clr);
    inset: 0;
    z-index: -2;
  }

  /* checked - move slider to right */
  .switch:has(input:checked)::before {
    background-color: var(--_slider-bg-clr-on);
    inset: var(--_switch-padding) var(--_switch-padding) var(--_switch-padding) 50%;
  }
  .switch span:first-of-type {
    color: #fff;
  }
  .switch > input:checked + span:first-of-type {
    color: var(---N8, #666);
  }
  .switch > input:checked ~ span:last-of-type {
    color: #fff;
  }
</style>
