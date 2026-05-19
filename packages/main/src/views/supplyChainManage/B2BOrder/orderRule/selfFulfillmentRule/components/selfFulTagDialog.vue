<template>
  <el-dialog
    :model-value="visible"
    @update:model-value="handleVisibleChange"
    :title="title"
    width="600px"
    :close-on-click-modal="false"
    destroy-on-close
    class="self-ful-tag-dialog"
    @close="handleClose"
    append-to-body
  >
    <template #header>
      <div class="dialog-header">
        <span class="dialog-title">{{ title }}</span>
        <el-popover
          v-model:visible="createTagPopoverVisible"
          placement="bottom-end"
          :width="432"
          trigger="click"
          :close-on-click-outside="false"
          popper-class="create-tag-popover"
        >
          <template #reference>
            <el-button type="primary" link class="create-btn">创建</el-button>
          </template>
          <CreateTagForm @confirm="handleCreateTagConfirm" @cancel="handleCreateTagCancel" />
        </el-popover>
      </div>
    </template>

    <div class="dialog-content">
      <div class="tag-list-wrapper">
        <el-checkbox-group v-model="innerSelectedTagIds">
          <el-row :gutter="24">
            <el-col :span="12" v-for="tag in tagList" :key="tag.labelCode" class="tag-col">
              <el-checkbox :label="tag.labelCode" class="tag-checkbox">
                <div class="tag-item">
                  <span class="tag-dot" :style="{ backgroundColor: tag.color || '#ccc' }"></span>
                  <span class="tag-name" :title="tag.name">{{ tag.name }}</span>
                </div>
              </el-checkbox>
            </el-col>
          </el-row>
        </el-checkbox-group>
        <div v-if="tagList.length === 0" class="empty-text">暂无标签数据</div>
      </div>
    </div>

    <template #footer>
      <div class="dialog-footer">
        <el-button @click="handleClose">取消</el-button>
        <el-button type="primary" @click="handleConfirm">追加标签</el-button>
      </div>
    </template>
  </el-dialog>
</template>

<script setup lang="ts">
  import { ref, computed, watch } from 'vue';
  import CreateTagForm from './createTagForm.vue';
  import type { CreateTagFormData } from './createTagForm.vue';
  import { omsApi } from '@/api';
  export interface TagItem {
    labelCode: string;
    name: string;
    color?: string;
  }

  // Define the selected tag interface for emit
  export interface SelectedTag {
    labelCode: string;
    name: string;
  }

  const props = defineProps<{
    modelValue?: boolean; // Control visibility via v-model
    selectedIds?: string[]; // Data passed from parent (labelCode array)
    title?: string;
  }>();

  const emit = defineEmits<{
    (event: 'update:modelValue', visible: boolean): void;
    (event: 'confirm', selectedTags: SelectedTag[]): void; // 包含 labelCode 和 name 的数组
    (event: 'create', data: CreateTagFormData): void;
    (event: 'close'): void;
  }>();
  const localVisible = ref(false);
  // 标记是否通过 open 方法打开（用于强制非受控模式）
  const openedByMethod = ref(false);
  const isControlled = computed(() => props.modelValue !== undefined && !openedByMethod.value);
  const tagList = ref<TagItem[]>([]);
  const visible = computed({
    get: () => {
      // 如果通过 open 方法打开，优先使用 localVisible
      if (openedByMethod.value) {
        return localVisible.value;
      }
      return isControlled.value ? !!props.modelValue : localVisible.value;
    },
    set: (val: boolean) => {
      if (isControlled.value && !openedByMethod.value) {
        emit('update:modelValue', val);
      } else {
        localVisible.value = val;
      }
    },
  });

  const innerSelectedTagIds = ref<string[]>([]);
  const title = computed(() => props.title || '标记标签');
  // const tagList = computed(() => props.tagList || []);
  const createTagPopoverVisible = ref(false);

  // Sync selected ids whenever dialog becomes visible
  watch(
    () => visible.value,
    (val) => {
      if (val) {
        // 只有在 innerSelectedTagIds 为空时才从 props 同步，避免覆盖 open 方法传入的值
        if (innerSelectedTagIds.value.length === 0) {
          innerSelectedTagIds.value = props.selectedIds ? [...props.selectedIds] : [];
        }
      }
    }
  );

  /**
   * Handle visible change from el-dialog
   */
  const handleVisibleChange = (val: boolean) => {
    // 如果关闭弹窗，重置 openedByMethod 标志
    if (!val) {
      openedByMethod.value = false;
    }
    visible.value = val;
  };

  /**
   * Close the dialog
   */
  const handleClose = () => {
    // 关闭时重置 openedByMethod 标志
    openedByMethod.value = false;
    visible.value = false;
    emit('close');
  };

  /**
   * Handle create tag form confirm
   */
  const handleCreateTagConfirm = () => {
    // emit('create', data);
    getTaglist()
    createTagPopoverVisible.value = false;
  };

  /**
   * Handle create tag form cancel
   */
  const handleCreateTagCancel = () => {
    createTagPopoverVisible.value = false;
  };

  /**
   * Handle "Append Tags" button click
   */
  const handleConfirm = () => {
    // 根据选中的 labelCode 找到对应的 name，构建包含 labelCode 和 name 的数组
    const selectedTags: SelectedTag[] = innerSelectedTagIds.value
      .map((labelCode) => {
        const tag = tagList.value.find((item) => item.labelCode === labelCode);
        return tag
          ? {
              labelCode: tag.labelCode,
              name: tag.name,
            }
          : null;
      })
      .filter((item): item is SelectedTag => item !== null);
    
    emit('confirm', selectedTags);
    // 关闭时重置 openedByMethod 标志
    openedByMethod.value = false;
    visible.value = false;
  };
  const getTaglist = async () => {
    const res = await omsApi.omsCommonSysQueryLabelList({
      pageNum: 1,
      pageSize: 100,
      module: 'oms_order',
    });

    // 将 API 返回的 LabelInfoBean[] 转换为 TagItem[]
    // API 返回结构为 CommonRespListLabelInfoBean，数据在 result 字段中
    const labelList = (res as any)?.result || (Array.isArray(res) ? res : []);
    tagList.value = labelList.map((item: any) => ({
      labelCode: item.labelCode || '',
      name: item.name || '',
      color: item.color, // 如果 API 返回中没有 color，可以设置默认值或从其他地方获取
    }));
  };
  // Optional: Keep 'open' method for compatibility
  const open = async (ids: string[] = []) => {
    // 先设置选中的标签ID，优先使用传入的 ids，如果没有传入或为空则使用 props.selectedIds
    if (ids && ids.length > 0) {
      innerSelectedTagIds.value = [...ids];
    } else {
      innerSelectedTagIds.value = props.selectedIds ? [...props.selectedIds] : [];
    }
    // 标记为通过 open 方法打开，强制使用非受控模式
    openedByMethod.value = true;
    // 直接设置 localVisible，确保弹窗能打开
    localVisible.value = true;
    getTaglist()
  };

  defineExpose({
    open,
    close: handleClose,
  });
</script>

<style scoped lang="scss">
  .dialog-header {
    display: flex;
    align-items: center;

    .dialog-title {
      font-size: 18px;
      font-weight: bold;
      color: #303133;
      margin-right: 12px;
    }

    .create-btn {
      font-size: 14px;
      padding: 0;
      height: auto;
    }
  }

  .dialog-content {
    padding: 10px 0;
  }

  .tag-list-wrapper {
    background-color: #f5f7fa; // Light background as seen in image
    border-radius: 8px;
    padding: 20px;
    min-height: 200px;
    max-height: 400px;
    overflow-y: auto;
    border: 1px solid #ebeef5;
  }

  .tag-col {
    margin-bottom: 12px;
  }

  .tag-checkbox {
    width: 100%;
    height: auto;
    margin-right: 0;

    :deep(.el-checkbox__label) {
      display: inline-block;
      vertical-align: middle;
      width: calc(100% - 24px); // Adjust for checkbox width
    }
  }

  .tag-item {
    display: flex;
    align-items: center;
    width: 100%;

    .tag-dot {
      display: inline-block;
      width: 8px;
      height: 8px;
      border-radius: 50%;
      margin-right: 8px;
      flex-shrink: 0;
    }

    .tag-name {
      font-size: 14px;
      color: #606266;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
      flex: 1;
    }
  }

  .empty-text {
    text-align: center;
    color: #909399;
    padding: 20px 0;
  }

  .dialog-footer {
    text-align: right;
  }
</style>

<style lang="scss">
  .create-tag-popover {
    .el-popover__title {
      margin-bottom: 16px;
      font-size: 16px;
      font-weight: 500;
    }
  }
</style>
