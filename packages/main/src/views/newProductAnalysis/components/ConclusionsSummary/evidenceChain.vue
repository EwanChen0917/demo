<template>
  <div class="card-title">
    <span class="c-title" v-if="showTitle">{{ props.title || cardInfo.title }}</span>
    <span
      class="c-drawer"
      @click="emit('drawer-click')"
      v-if="!titleList.includes(cardInfo.title as string)"
    >
      <span class="evidence">
        证据链
        <i class="Root-tyicon icon-Root-tyjiantou-you" />
      </span>
    </span>
    <Tag
      v-if="tagMapColor[cardInfo.conclusion as string] && !titleList.includes(cardInfo.title as string)"
      :color="tagMapColor[cardInfo.conclusion as string]"
    >
      {{ tagMapText[cardInfo.conclusion as string] }}
    </Tag>
  </div>
</template>

<script setup lang="ts">
  interface infoType {
    title?: string;
    conclusion?: string;
    evidence_chain?: string;
  }
  const props = withDefaults(
    defineProps<{
      cardInfo: infoType;
      showTitle?: boolean;
      title?: string;
    }>(),
    {
      cardInfo: () => {
        return {};
      },
      showTitle: true,
      title: '',
    }
  );

  const emit = defineEmits<{
    (event: 'drawer-click'): void;
  }>();

  // 采纳 弃用
  const tagMapColor = {
    accept: 'green',
    abandon: 'red',
  };

  const tagMapText = {
    accept: '已采纳',
    abandon: '已弃用',
  };

  const titleList = [
    '执行路线图',
    '功能设计建议',
    '产品名称与核心价值主张',
    '三维交叉验证结论',
    '实证证据库构建',
    'FABE竞争力分析',
    '核心卖点优先级矩阵',
  ];
</script>

<style lang="scss" scoped>
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
    .c-drawer {
      display: flex;
      align-items: center;
      gap: 2px;
      flex: 1 0 0;
      color: var(---P6, var(---P6, #02b96b));
      font-size: 12px;
      font-style: normal;
      font-weight: 400;
      line-height: 20px;
    }
    .evidence {
      display: flex;
      align-items: center;
      &:hover {
        cursor: pointer;
        opacity: 0.8;
      }
    }
  }
</style>
