<template>
  <Transition name="batch-action-bar">
    <div v-if="visible" class="batch-action-bar" :class="{ 'in-drawer': inDrawer }">
      <div class="batch-action-bar__content">
        <!-- 全选复选框 -->
        <el-checkbox
          v-model="isAllSelected"
          :indeterminate="isIndeterminate"
          @change="handleSelectAllChange"
        >
          全选
        </el-checkbox>

        <!-- 已选数量 -->
        <span class="selected-count">已选 {{ selectedCount }} 条</span>

        <!-- SplitVideoList 专用按钮 -->
        <template v-if="type === 'split'">
          <el-button
            type="primary"
            size="small"
            :disabled="addCandidateLoading"
            @click="handleAddToCandidate"
          >
            加入候选
          </el-button>
          <CancelCandidatePopconfirm @confirm="handleRemoveFromCandidate">
            <template #reference>
              <el-button size="small">移出候选</el-button>
            </template>
          </CancelCandidatePopconfirm>
        </template>

        <el-tooltip
          :content="selectedCount > 100 ? '单次下载最多100条' : '导出'"
          :disabled="selectedCount < 100"
        >
          <el-button
            ref="exportBtnRef"
            size="small"
            :disabled="selectedCount > 100"
            :type="type === 'split' ? 'default' : 'primary'"
            @click="handleExportClick"
          >
            导出
          </el-button>
        </el-tooltip>

        <!-- CandidateVideoDrawer 专用按钮 -->
        <template v-if="type === 'candidate'">
          <CancelCandidatePopconfirm @confirm="handleRemove" placement="top-start">
            <template #reference>
              <el-button size="small">移除</el-button>
            </template>
          </CancelCandidatePopconfirm>
        </template>

        <el-button size="small" @click="handleCancel">取消</el-button>
      </div>

      <!-- 导出语言选择弹窗 -->
      <LanguageSelectPopover
        ref="languageSelectRef"
        :trigger-ref="exportBtnElement"
        :selected-list="selectedList"
        :is-candidate="type === 'candidate'"
        @success="handleExportSuccess"
        @close="handleExportClose"
      />
    </div>
  </Transition>
</template>

<script setup lang="ts">
  import { ref, computed, watch } from 'vue';
  import LanguageSelectPopover from './LanguageSelectPopover.vue';
  import CancelCandidatePopconfirm from './CancelCandidatePopconfirm.vue';
  import type { BatchActionVideoItem } from '../types/video';

  /** 组件类型 */
  export type BatchActionBarType = 'split' | 'candidate';

  interface Props {
    /** 组件类型：split-分镜视频列表, candidate-候选视频抽屉 */
    type: BatchActionBarType;
    /** 当前选中的数据列表（跨分页所有选中数据，用于显示总数和执行操作） */
    selectedList: BatchActionVideoItem[];
    /** 总数据列表（当前页数据，用于判断全选状态） */
    totalList: BatchActionVideoItem[];
    /** 当前页选中的数据列表（用于判断当前页全选状态，如未提供则使用 selectedList） */
    currentPageSelection?: BatchActionVideoItem[];
    /** 是否在抽屉中使用 */
    inDrawer?: boolean;
    /** 加入候选按钮 loading 状态 */
    addCandidateLoading?: boolean;
  }

  interface Emits {
    /** 全选/取消全选 */
    (e: 'select-all', isSelectAll: boolean): void;
    /** 取消选择（关闭批量操作栏） */
    (e: 'cancel'): void;
    /** 加入候选（仅 split 类型） */
    (e: 'add-to-candidate', list: BatchActionVideoItem[]): void;
    /** 移出候选（仅 split 类型） */
    (e: 'remove-from-candidate', list: BatchActionVideoItem[]): void;
    /** 移除（仅 candidate 类型） */
    (e: 'remove', list: BatchActionVideoItem[]): void;
    /** 导出 */
    (e: 'export', languages: number[]): void;
  }

  const props = withDefaults(defineProps<Props>(), {
    inDrawer: false,
    currentPageSelection: undefined,
    addCandidateLoading: false,
  });

  /** 用于判断全选状态的当前页选中数据（兼容旧用法） */
  const effectiveCurrentPageSelection = computed(
    () => props.currentPageSelection ?? props.selectedList
  );
  const emit = defineEmits<Emits>();

  // 导出弹窗相关
  const exportBtnRef = ref<{ $el: HTMLElement } | HTMLElement | null>(null);
  const languageSelectRef = ref<InstanceType<typeof LanguageSelectPopover> | null>(null);

  // 获取导出按钮 DOM 元素
  const exportBtnElement = computed(() => {
    const btn = exportBtnRef.value;
    if (!btn) return null;
    // Element Plus 组件实例有 $el 属性
    return '$el' in btn ? btn.$el : btn;
  });

  /** 已选数量 */
  const selectedCount = computed(() => props.selectedList.length);

  /** 组件是否可见（至少选中1项） */
  const visible = computed(() => selectedCount.value > 0);

  /** 是否在抽屉中 */
  const inDrawer = computed(() => props.inDrawer || props.type === 'candidate');

  /** 是否全选（基于当前页的选中状态） */
  const isAllSelected = computed({
    get: () => {
      if (props.totalList.length === 0) return false;
      return effectiveCurrentPageSelection.value.length === props.totalList.length;
    },
    set: (val: boolean) => {
      emit('select-all', val);
    },
  });

  /** 是否为中间状态（基于当前页的选中状态） */
  const isIndeterminate = computed(() => {
    const selectedLen = effectiveCurrentPageSelection.value.length;
    const totalLen = props.totalList.length;
    return selectedLen > 0 && selectedLen < totalLen;
  });

  /** 全选/取消全选 */
  function handleSelectAllChange(val: boolean) {
    emit('select-all', val);
  }

  /** 加入候选 */
  function handleAddToCandidate() {
    emit('add-to-candidate', props.selectedList);
  }

  /** 移出候选 */
  function handleRemoveFromCandidate() {
    emit('remove-from-candidate', props.selectedList);
  }

  /** 移除 */
  function handleRemove() {
    emit('remove', props.selectedList);
  }

  /** 点击导出按钮 */
  function handleExportClick() {
    languageSelectRef.value?.show();
  }

  /** 导出成功 */
  function handleExportSuccess() {
    emit('cancel');
  }

  /** 导出弹窗关闭 */
  function handleExportClose() {
    // 弹窗关闭时的回调，暂时不做处理
  }

  /** 取消选择（关闭批量操作栏） */
  function handleCancel() {
    emit('cancel');
  }
</script>

<style lang="scss" scoped>
  .batch-action-bar {
    position: absolute;
    left: 4px;
    bottom: 4px;
    height: 48px;
    display: flex;
    align-items: center;
    z-index: 100;
    background-color: #fff;
    // padding-left: 24px;

    // 在抽屉中的样式
    &.in-drawer {
      position: absolute;
      left: 23px;
      bottom: 0px;
      // padding-left: 16px;
    }

    &__content {
      display: flex;
      align-items: center;
      gap: 12px;
      background: transparent;
      padding: 8px 16px 8px 8px;
      border-radius: 6px;
      // box-shadow: 0 -2px 8px rgba(0, 0, 0, 0.08);
    }

    .selected-count {
      font-size: 12px;
      color: #585a5a;
      line-height: 20px;
      margin-right: 4px;
    }

    :deep(.el-checkbox) {
      margin-right: 0;

      .el-checkbox__label {
        font-size: 12px;
        color: #262626;
        padding-left: 8px;
      }
    }
    :deep(.el-button) {
      margin-left: 0;
    }
  }

  // 进入/离开动画
  .batch-action-bar-enter-active,
  .batch-action-bar-leave-active {
    transition: all 0.3s ease;
  }

  .batch-action-bar-enter-from,
  .batch-action-bar-leave-to {
    opacity: 0;
    transform: translateY(100%);
  }
</style>
