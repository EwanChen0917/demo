<template>
  <div class="search-line">
    <div class="list-container">
      <slot name="search"></slot>
      <!--        更多筛选-->
      <el-popover
        v-if="$slots['more-filter']"
        ref="filterPopoverRef"
        :offset="4"
        :hide-after="0"
        placement="bottom"
        trigger="click"
        :show-arrow="false"
        :popper-style="{ borderRadius: '10px' }"
      >
        <template #default>
          <el-form label-width="100" label-position="top">
            <div class="more-filter-content">
              <slot name="more-filter"></slot>
            </div>
          </el-form>
        </template>
        <template #reference>
          <el-button style="padding: 9px"><i class="iconfont icon-shaixuan"></i></el-button>
        </template>
      </el-popover>
      <el-button text @click="emits('resetSearch')">重置</el-button>
    </div>
    <div class="actions">
      <div>
        <slot name="left-actions"></slot>
        <el-tooltip content="刷新" placement="top">
          <i class="iconfont icon-shuaxinjiazai" @click="emits('refresh')"></i>
        </el-tooltip>
      </div>
      <div class="divider"></div>
      <div>
        <slot name="right-actions"></slot>
        <el-tooltip :content="fullscreen ? '退出全屏' : '全屏查看'" placement="top">
          <i
            :class="fullscreen ? 'icon-shouqiquanping' : 'icon-quanping'"
            class="iconfont icon-shouqiquanping"
            @click="toggleFullscreen()"
          ></i>
        </el-tooltip>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
  import { useStore } from '@/store/modules/useStore';

  const emits = defineEmits<{
    resetSearch: [];
    refresh: [];
  }>();
  const store = useStore();
  const { toggleFullscreen } = store;
  const fullscreen = computed(() => store.fullscreen);
</script>

<style lang="scss" scoped>
  .search-line {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 10px 16px;
    background-color: #fff;

    .list-container {
      display: flex;
      flex-wrap: wrap;
      align-items: center;
      gap: 8px;
    }

    .actions {
      display: flex;
      align-items: center;
      gap: 16px;
      font-size: 16px;
      color: #666;

      div {
        display: flex;
        align-items: center;

        icon-Root,
        .Root-tyicon {
          cursor: pointer;

          &:hover {
            color: var(---P6, #02b96b);
          }
        }
      }
    }

    .divider {
      width: 1px;
      height: 12px;
      background-color: var(---N4, #dedede);
    }
  }
</style>
