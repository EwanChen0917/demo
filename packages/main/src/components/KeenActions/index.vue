<template>
  <div class="action-btns">
    <template v-for="item in actions" :key="item.key">
      <el-link
        v-if="
          ((item.permissionCode && checkPermission(item.permissionCode)) || !item.permissionCode) &&
          !item.hide &&
          !item?.isMore
        "
        :type="item.type || 'primary'"
        :disabled="item.disabled"
        :underline="item.underline || 'never'"
        @click="emit('click', item)"
      >
        <span class="link-label">{{ item.label }}</span>
        <el-icon v-if="item.icon" class="ms-1">
          <component :is="item.icon" />
        </el-icon>
      </el-link>
    </template>

    <slot name="more"></slot>
    <el-popover
      v-if="moreList?.length"
      placement="bottom"
      :offset="4"
      :show-arrow="false"
      :popper-style="{ padding: '4px' }"
    >
      <template #default>
        <div class="batch-list">
          <div v-for="item in moreList" :key="item.key">
            <div
              v-if="!item?.hide"
              class="batch-list-item"
              @click="emit('click', item)"
              :class="{ 'is-danger': item?.type === 'danger' }"
            >
              {{ item.label }}
            </div>
          </div>
        </div>
      </template>
      <template #reference>
        <el-link type="primary" underline="never">
          <span class="link-label">更多</span>
          <i class="iconfont icon-jiantouxiangxia"></i>
        </el-link>
      </template>
    </el-popover>
  </div>
</template>

<script lang="ts" setup>
  import { checkPermission } from '@/utils/permission';

  type ActionItem = {
    label: string;
    key: string;
    type?: 'default' | 'text' | 'success' | 'warning' | 'info' | 'primary' | 'danger';
    disabled?: boolean;
    hide?: boolean;
    underline?: boolean;
    permissionCode?: string;
    [key: string]: any;
    icon?: string;
  };

  const props = defineProps<{
    actions: ActionItem[];
  }>();

  const moreList = computed(() => {
    return props.actions?.filter(
      (k) =>
        k?.isMore &&
        ((k.permissionCode && checkPermission(k.permissionCode)) || !k.permissionCode) &&
        !k.hide
    );
  });

  const emit = defineEmits<{
    (event: 'click', item: ActionItem): void;
  }>();
</script>

<style lang="scss">
  .action-btns {
    display: flex;
    flex-wrap: wrap;
    gap: 8px;
    .link-label {
      font-size: 12px;
    }
  }

  .keen-actions {
    .el-space__item:last-child {
      margin-right: 0 !important;
    }
  }

  .batch-list {
    min-width: 132px;

    &-item {
      padding: 6px 8px;
      font-size: 12px;
      line-height: 22px;
      cursor: pointer;

      &:hover {
        color: var(--el-color-primary);
        background-color: var(--el-color-primary-light-9);
      }
    }
  }

  .icon-jiantouxiangxia {
    font-size: 12px;
  }

  .is-danger {
    color: #f53f3f;
  }
</style>
