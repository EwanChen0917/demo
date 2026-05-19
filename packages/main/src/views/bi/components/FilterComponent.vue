<template>
  <div class="header-section">
    <div class="bi-filter-section">
      <div class="filter-section">
        <slot></slot>
      </div>
      <div class="actions-section">
        <div class="show-label" v-if="dataFlat">
          <span class="label">数据平铺</span>
          <el-switch v-model="showDataFlat" size="small" @change="cachePageSetting" />
        </div>
        <div class="gap"></div>
        <div class="deal-time">
          <i class="iconfont icon-shijian"></i>
          <span class="label">数据截止日期：</span>
          <span class="date">{{ updateDate }}</span>
        </div>
        <div class="gap"></div>
        <slot name="actions"></slot>
        <IconTooltip @click="handleRefresh" icon-class="icon-shuaxinjiazai" content="刷新" />
        <div class="gap"></div>
        <slot name="common"></slot>
        <IconTooltip
          :icon-class="isFullscreen ? 'icon-shouqiquanping' : 'icon-quanping'"
          :content="isFullscreen ? '退出全屏' : '全屏'"
          @click="toggleFullscreen()"
        />
      </div>
    </div>
    <div class="more-filter-section">
      <slot name="more-filters"></slot>
    </div>
    <slot name="catalog"></slot>
  </div>
</template>

<script lang="ts" setup>
  import { useStore } from '@/store/modules/useStore';
  import IconTooltip from './IconTooltip.vue';

  defineProps<{
    updateDate?: string;
    dataFlat?: boolean;
  }>();

  const emit = defineEmits<{
    reset: [];
    refresh: [];
  }>();

  const handleRefresh = () => {
    emit('refresh');
  };

  const showDataFlat = defineModel<boolean>('showDataFlat', {
    default: false,
  });

  const store = useStore();
  const { toggleFullscreen } = store;
  const isFullscreen = computed(() => store.fullscreen);

  const route = useRoute();
  const readPageSetting = () => {
    const { memberCode } = useStore().userInfo;
    const namespace = route.name;
    const pageSettingStr = localStorage.getItem('pageSetting');
    if (pageSettingStr) {
      const pageSetting = JSON.parse(pageSettingStr);
      const setting = pageSetting[namespace as string]?.[memberCode as string];
      if (setting) {
        nextTick(() => {
          showDataFlat.value = setting.showDataFlat === 1;
        });
      }
    }
  };
  readPageSetting();

  const cachePageSetting = (val) => {
    const { memberCode } = store.userInfo;
    const namespace = route.name;
    const pageSetting = {
      [namespace as string]: {
        [memberCode as string]: { showDataFlat: val ? 1 : 0 },
      },
    };
    localStorage.setItem('pageSetting', JSON.stringify(pageSetting));
  };
</script>

<style lang="scss" scoped>
  .header-section {
    margin-bottom: 16px;
  }
  .bi-filter-section {
    flex: none;
    width: 100%;
    display: flex;
    justify-content: space-between;
    align-items: start;
    padding: 10px 16px;
    background-color: #fff;

    .filter-section {
      display: flex;
      align-items: center;
      column-gap: 8px;
      :deep(.el-select) {
        width: unset;
        .el-select__placeholder {
          width: unset;
          position: initial;
          transform: initial;
        }
        .el-tag {
          max-width: unset !important;
        }
      }
    }

    .actions-section {
      flex: none;
      display: flex;
      align-items: center;
      column-gap: 16px;
      height: 32px;
      .show-label {
        display: flex;
        align-items: center;
        column-gap: 10px;
      }
      .label {
        font-size: 12px;
        color: var(---N6, #999);
      }
      .value {
        color: var(---N9, #1f1f1f);
      }
      .el-switch {
        --el-border-color: var(---N3, #ededed);
      }
      .iconfont,
      .Root-tyicon {
        cursor: pointer;
        font-size: 16px;
        color: var(---N8, #666);
        &:hover {
          color: var(---N9, #1f1f1f);
        }
      }
      .icon-shijian {
        cursor: initial;
        font-size: 14px;
        margin-right: 4px;
        color: var(---N6, #999);
        line-height: 20px;
      }
      .deal-time {
        display: flex;
        align-items: center;
        white-space: nowrap;
      }
    }
  }
  .more-filter-section {
    background: #fff;
    padding: 0 16px;
  }
  .gap {
    width: 1px;
    height: 12px;
    background-color: var(---N4, #dedede);
  }
</style>
