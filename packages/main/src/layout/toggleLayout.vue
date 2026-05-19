<template>
  <el-popover
    ref="toggleLayoutPopover"
    :placement="placement"
    trigger="click"
    :offset="offset"
    width="auto"
    :show-arrow="false"
    popper-class="toggle-layout-popover"
    virtual-triggering
    :virtual-ref="iconRef"
    @show="etpRef.hide()"
  >
    <div>
      <h4 class="toggle-layout-title">切换导航布局</h4>
      <div class="toggle-layout-list">
        <div
          class="toggle-item"
          :class="{ activated: !store.menuCollapse }"
          @click="toggleLayout(false)"
        >
          <img class="normal" src="@/layout/images/layout-top.svg" alt="" />
          <img class="active" src="@/layout/images/layout-top-active.svg" alt="" />
          顶部导航
        </div>
        <div
          class="toggle-item"
          :class="{ activated: store.menuCollapse }"
          @click="toggleLayout(true)"
        >
          <img class="normal" src="@/layout/images/layout-left.svg" alt="" />
          <img class="active" src="@/layout/images/layout-left-active.svg" alt="" />
          侧边导航
        </div>
      </div>
    </div>
    <!-- <template #reference></template> -->
  </el-popover>
  <el-tooltip ref="etpRef" :offset="22" content="导航切换" :placement="placement" effect="dark">
    <i ref="iconRef" class="iconfont icon-qiehuandaohang toggle-icon"></i>
  </el-tooltip>
</template>

<script setup lang="ts">
  import { useStore } from '@/store/modules/useStore';

  defineProps<{
    placement: string;
    offset: number | string;
  }>();
  const etpRef = ref();
  const iconRef = ref();
  const store = useStore();
  const toggleLayoutPopover = ref();
  const toggleLayout = (collapse: boolean) => {
    toggleLayoutPopover.value.hide();
    nextTick(() => {
      if (collapse !== store.menuCollapse) {
        store.toggleMenuCollapse();
      }
    });
  };
</script>

<style>
  .toggle-layout-popover.el-popover.el-popper {
    padding: 20px;
    box-shadow: 0px 6px 36px 0px rgba(6, 8, 27, 0.08);
    border-radius: 10px;
  }
</style>

<style scoped lang="scss">
  .toggle-icon {
    cursor: pointer;
  }
  .toggle-layout-title {
    font-weight: 600;
    font-size: 16px;
    line-height: 24px;
    margin-bottom: 20px;
    color: #1c1c1c;
  }
  .toggle-layout-list {
    display: flex;
    gap: 16px;
    text-align: center;
    font-weight: 600;
    font-size: 13px;
    line-height: 22px;

    .toggle-item {
      color: #1c1c1c;
      &:hover {
        img {
          box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.1);
        }
      }
      &.activated {
        color: #02b96b;
        .active {
          display: block;
        }
        .normal {
          display: none;
        }
      }
      cursor: pointer;
      img {
        display: block;
        margin-bottom: 16px;
        transition: all 0.2s;
        border-radius: 6px;
      }
      .active {
        display: none;
      }
    }
  }
</style>
