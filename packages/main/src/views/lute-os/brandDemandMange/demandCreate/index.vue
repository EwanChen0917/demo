<script setup name="brandDemandCreate">
  import { useRouter } from 'vue-router';
  const router = useRouter();
  const buttonList = [
    {
      title: '专家',
      value: 'expert_resource',
    },
    {
      title: '机构',
      value: 'institution_resource',
    },
    {
      title: '媒体',
      value: 'media_resource',
    },
  ];
  const activeValue = ref('');
  const handleMouseEnter = (value) => {
    activeValue.value = value;
  };
  const handleMouseLeave = (value) => {
    activeValue.value = '';
  };
  const handleClick = (value) => {
    router.push({
      name: 'brandDemandSubmitCreate',
      query: {
        type: value,
      },
    });
  };
</script>

<template>
  <div class="title">选择需求资源类型</div>
  <div class="button-box">
    <div
      class="button-item"
      v-for="item in buttonList"
      :key="item.value"
      :class="{ active: item.value === activeValue }"
      @mouseenter="handleMouseEnter(item.value)"
      @mouseleave="handleMouseLeave(item.value)"
      @click="handleClick(item.value)"
    >
      <span>{{ item.title }}</span>

    </div>
  </div>
</template>

<style scoped lang="scss">
  .title {
    text-align: center;
    margin-top: 100px;
    margin-bottom: 32px;
    font-size: 64px;
    font-weight: 600;
    color: #333;
  }
  .button-box {
    display: flex;
    justify-content: center;
    gap: 48px;
    flex-wrap: wrap;
    .button-item {
      display: flex;
      justify-content: center;
      align-items: center;
      width: 476px;
      height: 278px;
      background-color: #f3f3f3;
      border-radius: 10px;
      box-shadow: 0 0 10px 0 rgba(0, 0, 0, 0.1);
      span {
        font-size: 48px;
        font-weight: 400;
        color: #333;
      }
      &.active {
        cursor: pointer;
        background-color: #276cff !important;
        span {
          color: #fff;
        }
      }
      &.cursor-disabled {
        cursor: not-allowed;
      }
      position: relative;
      flex-direction: column;
      .dev-tip {
        margin-top: 24px;
        color: #488cdc;
        font-size: 24px;
        font-weight: 500;
        letter-spacing: 2px;
      }
    }
  }
</style>
