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
          <el-form
            ref="createTagFormRef"
            :model="createTagForm"
            :rules="createTagRules"
            label-width="80px"
            class="create-tag-form"
            label-position="top"
          >
            <el-row :gutter="16">
              <el-col :span="16">
                <el-form-item label="标签名称" prop="name" required>
                  <el-input
                    v-model="createTagForm.name"
                    placeholder="请输入"
                    maxlength="15"
                    show-word-limit
                    clearable
                  />
                </el-form-item>
              </el-col>
            </el-row>
            <div class="form-footer">
              <el-button @click="handleCreateTagCancel">取消</el-button>
              <el-button type="primary" @click="handleCreateTagConfirm">确认</el-button>
            </div>
          </el-form>
        </el-popover>
        <el-popover
          v-model:visible="editTagPopoverVisible"
          placement="bottom-end"
          :width="432"
          trigger="manual"
          :hide-after="0"
          :close-on-click-outside="false"
          popper-class="create-tag-popover"
          :teleported="true"
        >
          <template #reference>
            <div ref="editTagTriggerRef" class="hidden-trigger"></div>
          </template>
          <el-form
            ref="editTagFormRef"
            :model="editTagForm"
            :rules="createTagRules"
            label-width="80px"
            class="create-tag-form"
            label-position="top"
          >
            <el-row :gutter="16">
              <el-col :span="16">
                <el-form-item label="标签名称" prop="name" required>
                  <el-input
                    v-model="editTagForm.name"
                    placeholder="请输入"
                    maxlength="15"
                    show-word-limit
                    clearable
                  />
                </el-form-item>
              </el-col>
            </el-row>
            <div class="form-footer">
              <el-button @click="handleEditTagCancel">取消</el-button>
              <el-button type="primary" @click="handleEditTagConfirm">确认</el-button>
            </div>
          </el-form>
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
                  <div class="tag-actions" @click.stop.prevent>
                    <i
                      class="iconfont icon-bianji tag-action-icon"
                      @click.stop.prevent="handleEditTag(tag, $event)"
                      title="编辑"
                    ></i>
                    <i
                      class="iconfont icon-shanchu tag-action-icon"
                      @click.stop.prevent="handleDeleteTag(tag)"
                      title="删除"
                    ></i>
                  </div>
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
        <el-button v-if="type === 'batch'" @click="handleRemoveTag">移除标签</el-button>
        <el-button v-if="type === 'batch'" type="primary" @click="handleConfirmMulti">
          追加标签
        </el-button>
        <el-button v-if="type === 'singleTag'" type="primary" @click="handleConfirm">
          确认
        </el-button>
      </div>
    </template>
  </el-dialog>
</template>

<script setup lang="ts">
  import { ref, computed, watch, reactive, nextTick } from 'vue';
  import type { FormInstance, FormRules } from 'element-plus';
  import { ElMessage, ElMessageBox } from 'element-plus';
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

  export interface CreateTagFormData {
    color: string;
    name: string;
  }

  export interface OpenParams {
    erpcode: string;
    labellist?: SelectedTag[] | string[];
  }

  const props = defineProps<{
    modelValue?: boolean; // Control visibility via v-model
    selectedIds?: string[]; // Data passed from parent (labelCode array)
    title?: string;
  }>();

  const emit = defineEmits<{
    (event: 'update:modelValue', visible: boolean): void;
    (event: 'confirm', value: { erpcode: string; labelList: SelectedTag[] }): void; // 包含 labelCode 和 name 的数组
    (event: 'confirmMulti', value: { erpcode: string; labelList: SelectedTag[] }): void;
    (event: 'removeTag', value: { erpcode: string; labelList: SelectedTag[] }): void;
    (event: 'create', data: CreateTagFormData): void;
    (event: 'close'): void;
  }>();
  const localVisible = ref(false);
  // 标记是否通过 open 方法打开（用于强制非受控模式）
  const openedByMethod = ref(false);
  const type = ref<string>('singleTag');
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
  const currentErpCode = ref<string>('');
  const createTagFormRef = ref<FormInstance>();
  const createTagForm = reactive<CreateTagFormData>({
    color: '',
    name: '',
  });
  const createTagRules: FormRules = {
    name: [
      { required: true, message: '请输入标签名称', trigger: 'blur' },
      { min: 1, max: 15, message: '标签名称长度为1-15个字符', trigger: 'blur' },
    ],
  };
  const editTagPopoverVisible = ref(false);
  const editTagFormRef = ref<FormInstance>();
  const editTagForm = reactive<CreateTagFormData>({
    color: '',
    name: '',
  });
  const editingTag = ref<TagItem | null>(null);
  const editTagTriggerRef = ref<HTMLElement>();

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

  const handleCreateTagConfirm = async () => {
    if (!createTagFormRef.value) return;
    const valid = await createTagFormRef.value.validate().catch(() => false);
    if (!valid) return;

    await omsApi.omsCommonSysSaveLabelInfo({
      name: createTagForm.name,
      labelType: 2,
      module: 'oms_order',
    });

    emit('create', { ...createTagForm });
    getTaglist();
    resetCreateTagForm();
    createTagPopoverVisible.value = false;
  };

  const handleCreateTagCancel = () => {
    resetCreateTagForm();
    createTagPopoverVisible.value = false;
  };

  const resetCreateTagForm = () => {
    createTagFormRef.value?.resetFields();
    createTagForm.color = '';
    createTagForm.name = '';
  };

  const handleEditTag = async (tag: TagItem, event: MouseEvent) => {
    event.stopPropagation();
    event.preventDefault();
    editingTag.value = tag;
    editTagForm.name = tag.name;
    editTagForm.color = tag.color || '';

    await nextTick();
    if (editTagTriggerRef.value) {
      const target = event.currentTarget as HTMLElement;
      const rect = target.getBoundingClientRect();
      const trigger = editTagTriggerRef.value as HTMLElement;
      trigger.style.position = 'fixed';
      trigger.style.left = `${rect.right}px`;
      trigger.style.top = `${rect.top}px`;
      trigger.style.width = '1px';
      trigger.style.height = '1px';
      trigger.style.opacity = '0';
      trigger.style.pointerEvents = 'none';
      trigger.style.zIndex = '2000';
    }
    await nextTick();
    editTagPopoverVisible.value = true;
  };

  const handleEditTagConfirm = async () => {
    if (!editTagFormRef.value || !editingTag.value) return;
    const valid = await editTagFormRef.value.validate().catch(() => false);
    if (!valid) return;

    await omsApi.omsCommonSysSaveLabelInfo({
      labelCode: editingTag.value.labelCode,
      name: editTagForm.name,
      labelType: 2,
      module: 'oms_order',
    } as any);

    ElMessage.success('编辑成功');
    getTaglist();
    resetEditTagForm();
    editTagPopoverVisible.value = false;
  };

  const handleEditTagCancel = () => {
    resetEditTagForm();
    editTagPopoverVisible.value = false;
  };

  const resetEditTagForm = () => {
    editTagFormRef.value?.resetFields();
    editTagForm.color = '';
    editTagForm.name = '';
    editingTag.value = null;
  };

  const handleDeleteTag = async (tag: TagItem, event?: MouseEvent) => {
    if (event) {
      event.stopPropagation();
      event.preventDefault();
    }
    try {
      await ElMessageBox.confirm(`确定要删除标签"${tag.name}"吗？`, '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
      });

      await omsApi.omsCommonSysDeleteLabelInfo({
        labelCode: tag.labelCode,
      });

      ElMessage.success('删除成功');
      getTaglist();
    } catch (error) {
      // 用户取消删除
    }
  };

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

    emit('confirm', {
      erpcode: currentErpCode.value,
      labelList: selectedTags,
    });
    // 关闭时重置 openedByMethod 标志
    openedByMethod.value = false;
    visible.value = false;
  };
  const getTaglist = async () => {
    const res = await omsApi.omsCommonSysQueryLabelList({
      pageNum: 1,
      pageSize: 100,
      module: 'oms_order',
      noShowNames: ['Shopify-高风险订单', 'Shopify-中风险订单'],
    });
    const labelList = (res as any)?.result || (Array.isArray(res) ? res : []);
    tagList.value = labelList.map((item: any) => ({
      labelCode: item.labelCode || '',
      name: item.name || '',
      color: item.color, // 如果 API 返回中没有 color，可以设置默认值或从其他地方获取
    }));
  };

  const open = async (params: OpenParams, typeParam = 'singleTag') => {
    currentErpCode.value = params.erpcode || '';
    type.value = typeParam;

    // 批量模式不进行数据回显
    if (typeParam === 'batch') {
      innerSelectedTagIds.value = [];
    } else {
      // 单标签模式保持原有回显逻辑
      // eslint-disable-next-line no-lonely-if
      if (params.labellist && params.labellist.length > 0) {
        if (typeof params.labellist[0] === 'string') {
          // 如果是 string[]，直接使用
          innerSelectedTagIds.value = [...(params.labellist as string[])];
        } else {
          // 如果是 SelectedTag[]，提取 labelCode
          innerSelectedTagIds.value = (params.labellist as SelectedTag[]).map(
            (tag) => tag.labelCode
          );
        }
      } else {
        innerSelectedTagIds.value = props.selectedIds ? [...props.selectedIds] : [];
      }
    }

    // 标记为通过 open 方法打开，强制使用非受控模式
    openedByMethod.value = true;
    // 直接设置 localVisible，确保弹窗能打开
    localVisible.value = true;
    getTaglist();
  };
  const handleConfirmMulti = () => {
    // 追加标签：将选中的标签信息传递给外部
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
    emit('confirmMulti', {
      erpcode: currentErpCode.value,
      labelList: selectedTags,
    });

    // 关闭时重置 openedByMethod 标志
    openedByMethod.value = false;
    visible.value = false;
  };

  const handleRemoveTag = () => {
    // 移除标签：将选中的标签信息传递给外部
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
    emit('removeTag', {
      erpcode: currentErpCode.value,
      labelList: selectedTags,
    });

    // 关闭时重置 openedByMethod 标志
    openedByMethod.value = false;
    visible.value = false;
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
    position: relative;

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

    .tag-actions {
      display: flex;
      align-items: center;
      gap: 8px;
      margin-left: 8px;
      opacity: 0;
      transition: opacity 0.2s;

      .tag-action-icon {
        font-size: 14px;
        color: #909399;
        cursor: pointer;
        transition: color 0.2s;

        &:hover {
          color: #409eff;
        }

        &.icon-shanchu:hover {
          color: #f56c6c;
        }
      }
    }

    &:hover .tag-actions {
      opacity: 1;
    }
  }

  .hidden-trigger {
    position: fixed;
    width: 1px;
    height: 1px;
    opacity: 0;
    pointer-events: none;
    z-index: 2000;
    overflow: hidden;
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

  .create-tag-form {
    width: 400px;
    padding: 16px;

    :deep(.el-form-item__label) {
      &::before {
        content: '*';
        color: #f56c6c;
        margin-right: 4px;
      }
    }

    .form-footer {
      display: flex;
      justify-content: flex-end;
      gap: 12px;
      margin-top: 16px;
    }
  }
</style>
