<template>
  <div class="ai-empty-win">
    <div class="ai-image">
      <AiAnimation :autoPlay="true" />
    </div>
    <svg xmlns="http://www.w3.org/2000/svg" width="22" height="4" viewBox="0 0 22 4" fill="none">
      <g filter="url(#filter0_f_14985_12000)">
        <ellipse cx="11" cy="2" rx="10" ry="1" fill="black" fill-opacity="0.04" />
      </g>
      <defs>
        <filter
          id="filter0_f_14985_12000"
          x="0"
          y="0"
          width="22"
          height="4"
          filterUnits="userSpaceOnUse"
          color-interpolation-filters="sRGB"
        >
          <feFlood flood-opacity="0" result="BackgroundImageFix" />
          <feBlend mode="normal" in="SourceGraphic" in2="BackgroundImageFix" result="shape" />
          <feGaussianBlur stdDeviation="0.5" result="effect1_foregroundBlur_14985_12000" />
        </filter>
      </defs>
    </svg>
    <div class="ai-empty-win-text">
      <h3 class="ai-empty-win-title">
        <span>你好，我是路特</span>
        <img class="erp-ai-text" src="/images/erp-ai-text.png" alt="ERP助手" />
      </h3>
      <p class="ai-empty-win-description">我掌握ERP系统完整知识和数据分析技能</p>
    </div>
    <div class="recommended-section">
      <div class="recommended-title">你可以这样问我</div>
      <ul class="ai-empty-win-list">
        <li
          v-for="item in suggestList"
          :key="item.text"
          class="ai-empty-win-list-item"
          @click="handleItemClick(item)"
        >
          <div class="ai-empty-win-list-content">
            <span class="ai-empty-win-list-item-icon">{{ item.icon }}</span>
            <span class="ai-empty-win-list-item-text">{{ item.text }}</span>
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>

<script lang="ts" setup>
  import AiAnimation from './AiAnimation.vue';

  const emit = defineEmits<{
    autoSend: [text: string];
  }>();
  const suggestList = [
    {
      icon: '💰',
      text: '生成一份上月资源投入分析报告',
    },
    {
      icon: '📈',
      text: '最近半年销售费用趋势分析',
    },
    {
      icon: '📊',
      text: '今年各一级科目费用占比情况',
    },
  ];
  const handleItemClick = (item) => {
    emit('autoSend', item.text);
  };
</script>

<style scoped lang="scss">
  .ai-empty-win {
    box-sizing: border-box;
    height: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 24px 20px 0;
  }
  .ai-image {
    width: 62px;
    height: 62px;
    object-fit: contain;
  }
  .ai-empty-win-text {
    margin-top: 20px;
    margin-bottom: 24px;
    text-align: center;
    .ai-empty-win-title {
      color: var(---N9, #1f1f1f);
      font-family: 'PingFang SC Medium';
      font-size: 22px;
      font-style: normal;
      font-weight: 500;
      height: 30px;
      line-height: 30px; /* 136.364% */
      margin-bottom: 8px;
      display: flex;
      align-items: center;
      column-gap: 8px;
      .erp-ai-text {
        height: 22px;
        vertical-align: middle;
      }
    }

    .ai-empty-win-description {
      color: var(---N6, #999);

      /* 常规/Regular 14 */
      font-family: 'PingFang SC';
      font-size: 14px;
      font-style: normal;
      font-weight: 400;
      line-height: 22px; /* 157.143% */
    }
  }
  .recommended-section {
    align-self: start;
    .recommended-title {
      color: var(---N9, #1f1f1f);

      /* 常规/Medium 14 */
      font-family: 'PingFang SC Medium';
      font-size: 14px;
      font-style: normal;
      font-weight: 500;
      line-height: 22px; /* 157.143% */
      margin-bottom: 14px;
    }
  }
  .ai-empty-win-list {
    list-style-type: none;
    padding: 0;
    color: var(---N9, #1f1f1f);

    /* 常规/Regular 14 */
    font-family: 'PingFang SC';
    font-size: 14px;
    font-style: normal;
    font-weight: 400;
    line-height: 22px; /* 157.143% */
    display: flex;
    flex-direction: column;
    gap: 10px;
    .ai-empty-win-list-item {
      display: flex;
      align-items: center;
      justify-content: start;
    }
    .ai-empty-win-list-item-icon {
      margin-right: 4px;
    }
    .ai-empty-win-list-content {
      display: inline-block;
      padding: 7px 16px;
      border-radius: 30px;
      background: var(---N1, #f7f7f7);
      cursor: pointer;
      user-select: none;
    }
  }
</style>
