<template>
  <aside :class="['dm5-sider', { 'is-collapsed': workbenchStore.isCollapsed }]">
    <div class="sider-header">
      <div class="sider-logo-wrapper">
        <div class="logo-box">研</div>
        <div v-show="!workbenchStore.isCollapsed" class="logo-text">
          <div class="title-main">用研需求管理系统</div>
          <div class="title-sub">User Research Management</div>
        </div>
      </div>
      <div class="collapse-btn" @click="workbenchStore.toggleCollapse">
        <el-icon v-if="workbenchStore.isCollapsed"><Expand /></el-icon>
        <el-icon v-else><Fold /></el-icon>
      </div>
    </div>

    <div class="sider-body">
      <button
        v-for="item in visibleMenuOptions"
        :key="item.key"
        :class="['dm5-sider-item', { 'is-active': item.key === activeView }]"
        type="button"
        @mouseenter="hoveredItemKey = item.key"
        @mouseleave="hoveredItemKey = ''"
        @click="emit('change', item.key)"
      >
        <el-icon class="item-icon">
          <component :is="item.icon" />
        </el-icon>
        <span v-show="!workbenchStore.isCollapsed" class="item-label">{{ item.label }}</span>
        <el-button
          v-if="
            !workbenchStore.isCollapsed &&
            item.key === activeView &&
            hoveredItemKey === item.key &&
            isStatsView(item.key)
          "
          type="primary"
          link
          class="item-refresh"
          @click.stop="emit('refresh', item.key)"
          :icon="RefreshRight"
        />
      </button>
    </div>
  </aside>
</template>

<script setup lang="ts">
  import { Expand, Fold, List, PieChart, RefreshRight, User } from '@element-plus/icons-vue';
  import { useDemandWorkbenchStore } from '../stores/useDemandWorkbenchStore';
  import { useStore } from '@/store/modules/useStore';
  import { storeToRefs } from 'pinia';
  import { checkPermission } from '@/utils/permission';
  import type { DemandWorkbenchView } from '../types/workbench';

  defineProps<{
    activeView: DemandWorkbenchView;
  }>();

  const emit = defineEmits<{
    change: [view: DemandWorkbenchView];
    refresh: [view: DemandWorkbenchView];
  }>();

  const workbenchStore = useDemandWorkbenchStore();
  const userStore = useStore();
  const { userInfo } = storeToRefs(userStore);

  const menuOptions = [
    { key: 'list', label: '需求列表', icon: List },
    {
      key: 'personalStats',
      label: '个人数据',
      icon: User,
      permissionCode: 'demand5PersonalStatsMenu',
    },
    { key: 'deptStats', label: '部门数据', icon: PieChart, permissionCode: 'demand5DeptStatsMenu' },
  ] as const;
  const visibleMenuOptions = computed(() =>
    menuOptions.filter((item) => !item.permissionCode || checkPermission(item.permissionCode))
  );
  const hoveredItemKey = ref<DemandWorkbenchView | ''>('');

  const isStatsView = (view: DemandWorkbenchView) => ['personalStats', 'deptStats'].includes(view);
</script>

<style scoped lang="scss">
  .dm5-sider {
    width: 239px;
    height: 100%; // Force full height of parent
    background: #ffffff;

    transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
    display: flex;
    flex-direction: column;
    padding: 16px 12px;
    position: relative;
    z-index: 10;
    flex-shrink: 0;

    &.is-collapsed {
      width: 64px;
      padding: 16px 8px;

      .dm5-sider-item {
        justify-content: center;
        padding: 10px 0;

        .item-icon {
          margin-right: 0;
        }
      }

      .sider-header {
        flex-direction: column;
        align-items: center;
        gap: 16px;
        padding-bottom: 32px;

        .collapse-btn {
          margin-left: 0;
        }
      }

      .sider-footer {
        padding: 16px 0;
        border-top-color: transparent;
        justify-content: center;

        .user-info-wrapper {
          justify-content: center;
          padding: 0;
        }

        .user-avatar {
          margin-right: 0;
        }
      }
    }
  }

  .sider-header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding-bottom: 24px;
    color: #1e293b;

    .sider-logo-wrapper {
      display: flex;
      align-items: center;
      gap: 8px;
      overflow: hidden;

      .logo-box {
        width: 32px;
        height: 32px;
        background: #02b96b;
        border-radius: 8px;
        display: flex;
        align-items: center;
        justify-content: center;
        color: #fff;
        font-weight: 700;
        font-size: 18px;
        flex-shrink: 0;
        box-shadow: 0 4px 10px rgba(2, 185, 107, 0.2);
      }

      .logo-text {
        display: flex;
        flex-direction: column;
        justify-content: center;
        white-space: nowrap;

        .title-main {
          font-size: 15px;
          font-weight: 700;
          color: #0f172a;
          line-height: 1.2;
        }

        .title-sub {
          font-size: 9px;
          color: #94a3b8;
          font-family: 'Inter', system-ui, sans-serif;
          letter-spacing: 0;
        }
      }
    }

    .collapse-btn {
      width: 24px;
      height: 24px;
      display: flex;
      align-items: center;
      justify-content: center;
      cursor: pointer;
      color: #64748b;
      border-radius: 6px;
      transition: all 0.2s;
      margin-left: 4px;

      &:hover {
        background: #f1f5f9;
        color: #02b96b;
      }
    }
  }

  .sider-body {
    flex: 1;
    display: flex;
    flex-direction: column;
    gap: 8px;
  }

  .dm5-sider-item {
    width: 100%;
    border: none;
    background: transparent;
    border-radius: 8px;
    padding: 10px 12px;
    display: flex;
    align-items: center;
    cursor: pointer;
    transition: all 0.2s;
    color: #475569;
    font-size: 14px;
    white-space: nowrap;
    overflow: hidden;
    position: relative;

    .item-icon {
      font-size: 18px;
      margin-right: 12px;
      transition: margin 0.3s;
    }

    .item-label {
      transition: opacity 0.2s;
    }

    .item-refresh {
      margin-left: auto;
      padding: 2px;
      font-size: 14px;
      line-height: 1;
      color: currentColor;
      min-height: auto;

      &:hover {
        opacity: 0.85;
      }
    }

    &:hover {
      background: #f8fafc;
      color: #02b96b;
    }

    &.is-active {
      background: #02b96b;
      color: #fff;
      box-shadow: 0 4px 12px rgba(2, 185, 107, 0.2);
    }
  }

  .sider-footer {
    margin-top: auto;
    padding: 24px 4px 8px;
    border-top: 1px solid #f1f5f9;
    transition: all 0.3s;

    .user-info-wrapper {
      display: flex;
      align-items: center;
      padding: 0 8px;
      transition: all 0.3s;
    }

    .user-avatar {
      flex-shrink: 0;
      margin-right: 12px;
      border: 2px solid #fff;
      box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
      background: #02b96b;
      color: #fff;
      font-weight: 600;
    }

    .user-meta {
      flex: 1;
      min-width: 0;
      display: flex;
      flex-direction: column;
      gap: 2px;
    }

    .meta-row {
      display: flex;
      align-items: center;
      font-size: 12px;
      white-space: nowrap;

      .label {
        color: #94a3b8;
      }

      .value {
        color: #475569;
        font-weight: 500;
        overflow: hidden;
        text-overflow: ellipsis;
      }
    }
  }
</style>
