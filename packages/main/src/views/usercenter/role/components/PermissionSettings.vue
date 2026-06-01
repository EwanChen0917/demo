<template>
  <div class="column permission">
    <div class="section-title">角色权限设置</div>
    <div class="permission-body">
      <div class="platform-list" v-loading="platformLoading">
        <div
          v-for="item in platformList"
          :key="item.value"
          class="platform-item"
          :class="{
            active: activePlatform === item.value,
            checked: selectedPlatformList.includes(item.value),
          }"
          @click="emit('toggle-platform', item.value)"
        >
          <el-checkbox
            :model-value="selectedPlatformList.includes(item.value)"
            :indeterminate="platformIndeterminate(item.value)"
            @change="(val) => emit('platform-check', item.value, val)"
            @click.stop
          />
          <span class="label">{{ item.desc }}</span>
        </div>
      </div>
      <div class="menu-tree" v-loading="menuLoading">
        <el-empty v-if="!activePlatform" description="请先选择平台" />
        <template v-else>
          <div class="tree-header">
            <div class="tree-title">当前平台：{{ findPlatformDesc(activePlatform) }}</div>
            <el-button text type="primary" size="small" @click="emit('refresh-tree')">
              重新加载
            </el-button>
          </div>
          <el-tree
            v-if="menuTree.length"
            ref="treeRef"
            class="tree-border"
            :data="menuTree"
            show-checkbox
            node-key="menuCode"
            :props="treeProps"
            :check-strictly="false"
            :expand-on-click-node="false"
            @check="emit('tree-check')"
          >
            <template #default="{ node }">
              <span>{{ node.label }}</span>
            </template>
          </el-tree>
          <el-empty v-else description="暂无菜单数据" />
        </template>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
  const props = defineProps({
    platformList: {
      type: Array,
      default: () => [],
    },
    platformLoading: {
      type: Boolean,
      default: false,
    },
    selectedPlatformList: {
      type: Array,
      default: () => [],
    },
    activePlatform: {
      type: String,
      default: '',
    },
    menuTree: {
      type: Array,
      default: () => [],
    },
    menuLoading: {
      type: Boolean,
      default: false,
    },
    treeProps: {
      type: Object,
      default: () => ({}),
    },
    platformIndeterminate: {
      type: Function,
      default: () => false,
    },
    findPlatformDesc: {
      type: Function,
      default: (platform: string) => platform || '--',
    },
  });

  const emit = defineEmits(['toggle-platform', 'platform-check', 'tree-check', 'refresh-tree']);

  const treeRef = ref();

  defineExpose({
    treeRef,
  });
</script>

<style scoped lang="scss">
  .column {
    background: #fff;
    border: 1px solid #ebeef5;
    border-radius: 8px;
    padding: 12px 12px 16px;
    min-height: 600px;
    box-shadow: 0 1px 3px rgba(0, 0, 0, 0.03);
  }

  .section-title {
    font-weight: 600;
    margin-bottom: 12px;
  }

  .permission-body {
    display: grid;
    grid-template-columns: 220px 1fr;
    gap: 12px;
    height: 97%;
  }

  .platform-list {
    border: 1px solid #ebeef5;
    border-radius: 8px;
    padding: 8px;
    display: flex;
    flex-direction: column;
    max-height: 800px;
    gap: 6px;
    overflow: auto;

    .platform-item {
      display: flex;
      align-items: center;
      gap: 8px;
      padding: 8px 10px;
      border-radius: 6px;
      cursor: pointer;
      transition: all 0.2s;
      border: 1px solid transparent;

      &.active {
        border-color: var(--el-color-primary);
        background: #f0f8ff;
      }
      &.checked:not(.active) {
        border-color: #ebeef5;
        background: #fafafa;
      }
      &:hover {
        background: #f6f8fa;
      }
      .label {
        flex: 1;
      }
    }
  }

  .menu-tree {
    border: 1px solid #ebeef5;
    border-radius: 8px;
    padding: 12px;
    min-height: 560px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    gap: 8px;
    :deep(.el-empty) {
      margin-bottom: auto;
    }
    .tree-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: auto;
      .tree-title {
        font-weight: 600;
      }
    }

    .tree-border {
      flex: 1;
      overflow: auto;
    }
  }
</style>
