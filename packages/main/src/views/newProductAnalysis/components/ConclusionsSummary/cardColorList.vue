<template>
  <EvidenceChain v-if="showEvide" :card-info="cardInfo" @drawer-click="emit('drawer-click')" />
  <div class="card-color-list">
    <div v-for="(item, index) in listData" :key="index" :class="direction">
      <!-- header -->
      <div class="list-header" :class="color">
        {{ item.title }}
      </div>
      <!-- content -->
      <div class="list-content">
        <div v-for="(con, ind) in item.content" :key="ind" class="content-item">
          <span class="item-content">{{ con }}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
  import EvidenceChain from './evidenceChain.vue';

  const props = withDefaults(
    defineProps<{
      direction?: string;
      cardInfo: Object;
      showEvide?: boolean;
    }>(),
    {
      direction: 'horizontal',
      cardInfo: () => {
        return {};
      },
      showEvide: false,
    }
  );

  // console.log(props.cardInfo, '9999')

  const emit = defineEmits<{
    (event: 'drawer-click'): void;
  }>();
</script>

<style lang="scss" scoped>
  .card-color-list {
    border: 1px solid var(---N2, #f4f5f5);
    border-radius: 8px;
    width: 100%;
    display: flex;
    flex-direction: column;
    gap: 8px;
    .horizontal {
      display: flex;
      .list-header {
        padding: 16px;
        width: 84px;
      }
      .list-content {
        padding: 12px 16px;
        display: flex;
        flex-direction: column;
        // gap: 8px;
        width: calc(100% - 84px);
        .content-item {
          padding: 0 0 8px;
        }
      }
    }
    .list-header {
      padding: 8px 16px;
      overflow: hidden;
      color: var(---N9, var(---N9, #262626));
      text-overflow: ellipsis;
      font-family: 'PingFang SC Medium';
      font-size: 12px;
      font-style: normal;
      font-weight: 500;
      line-height: 20px;
      border: 8px 0 0 8px;
      &.purple {
        background: #f9f5fd;
        border: 1px solid #f9f5fd;
      }
      &.blue {
        background: #f1f8ff;
        border: 1px solid #f9f5fd;
      }
      &.green {
        background: #eff9f6;
        border: 1px solid #f9f5fd;
      }
      &.yellow {
        background: #fffbf4;
        border: 1px solid #f9f5fd;
      }
    }
    .list-content {
      flex: 1;
      border-radius: 0 8px 8px 0;
      border-top: 1px solid var(---N2, #f4f5f5);
      border-right: 1px solid var(---N2, #f4f5f5);
      border-bottom: 1px solid var(---N2, #f4f5f5);
      background: #fff;
      .content-item {
        display: flex;
        padding: 0;
        flex-direction: column;
        align-items: flex-start;
        // gap: 2px;
        align-self: stretch;
        // border-bottom: 1px solid var(---N2, #f4f5f5);
        .item-name {
          color: var(---N9, var(---N9, #262626));
          font-size: 12px;
          font-style: normal;
          font-weight: 400;
          line-height: 20px;
        }
        .item-content {
          color: var(---N8, var(---N8, #585a5a));
          font-size: 12px;
          font-style: normal;
          font-weight: 400;
          line-height: 20px;
        }
      }
    }
  }
</style>
