<template>
  <div>
    <table>
      <tr
        v-for="(item, index) in data"
        :key="index"
        class="bar-item"
        @click="$emit('item-click', item, index)"
      >
        <td class="rank-icon">
          <slot name="rank" v-bind="{ row: item, index }">
            <RankIcon v-if="index < 3" :index="index" />
            <span v-else class="rank-num" :style="{ color: index < 3 ? '#fff' : '' }">
              {{ index + 1 }}
            </span>
          </slot>
        </td>
        <td class="bar-label">
          <slot name="img" v-bind="{ item, index }">
            {{ item.name }}
          </slot>
        </td>
        <td class="td-progress">
          <div v-if="$slots.name" class="name-slot">
            <slot name="name" v-bind="{ item, index }"></slot>
          </div>
          <div class="bar-progress">
            <div
              class="bar-inner"
              :style="{ width: `${item.percent}%`, backgroundColor: item.color || '#02b96b' }"
            >
              <span class="bar-value" v-if="isShowValue">{{ formatNumber(item.value) }}</span>
            </div>
          </div>
        </td>
        <td class="td-value-placeholder" v-if="isShowValue">
          <span
            class="bar-value"
            :style="{
              color: 'transparent',
              paddingLeft: '20px',
            }"
          >
            {{ formatNumber(item.value) }}
          </span>
        </td>
      </tr>
    </table>
  </div>
</template>

<script setup lang="ts">
  import RankIcon from '@/views/bi/components/RankIcon.vue';
  import { formatNumber } from '../utils/utils';

  interface RankItem {
    name: string;
    value: number;
    percent: number;
    color?: string;
  }

  defineProps<{
    data: RankItem[];
    isShowValue: boolean;
  }>();
  defineEmits<{
    'item-click': [item: RankItem, index: number];
  }>();
</script>

<style scoped lang="scss">
  table {
    width: 100%;
  }

  .bar-item {
    font-size: 13px;

    td {
      padding: 2px 0 10px;

      &.td-progress {
        width: 100%;
        vertical-align: middle;
        > div {
          display: inline-block;
        }
      }

      .name-slot {
        margin-bottom: 6px;
      }

      &.bar-label {
        color: #333;
        text-align: right;
        word-break: break-all;
        vertical-align: middle;
      }

      .bar-progress {
        width: 100%;
        height: 12px;
        margin-right: 12px;
        display: flex;
        gap: 10px;

        .bar-inner {
          height: 100%;
          transition: width 0.3s ease;
          position: relative;
          border-radius: 2px;

          .bar-value {
            position: absolute;
            right: -10px;
            transform: translateX(100%);
            color: var(---N9, #1f1f1f);
            font-family: DIN;
            font-size: 13px;
            font-style: normal;
            font-weight: 400;
            word-break: keep-all;
            line-height: 1;
          }
        }
      }
    }
  }

  .rank-icon {
    width: 20px;
    color: var(---N6, #999);

    /* 较弱/Regular 12 */
    font-family: 'PingFang SC';
    font-size: 12px;
    font-style: normal;
    font-weight: 400;
    vertical-align: middle;

    .rank-num {
      color: var(---N6, #999);
      text-align: right;

      /* 较弱/Regular 12 */
      font-family: 'PingFang SC';
      font-size: 12px;
      font-style: normal;
      font-weight: 400;
      line-height: 20px; /* 166.667% */
    }
  }
</style>
