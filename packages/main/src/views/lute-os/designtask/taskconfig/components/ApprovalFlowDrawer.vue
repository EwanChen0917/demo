<template>
  <el-drawer
    v-model="visible"
    :title="drawerTitle"
    size="980px"
    destroy-on-close
    custom-class="approval-flow-drawer"
  >
    <div ref="scrollContainerRef" v-loading="detailLoading" class="drawer-content">
      <el-form
        ref="formRef"
        :model="form"
        :rules="rules"
        label-width="120px"
        label-position="right"
        class="beautified-form"
      >
        <div class="form-section">
          <div class="section-title">基础信息</div>
          <el-row :gutter="24">
            <el-col :span="12">
              <el-form-item label="任务类型" prop="itemType">
                <el-select
                  v-model="form.itemType"
                  clearable
                  filterable
                  placeholder="请选择任务类型"
                  @change="handleItemTypeChange"
                >
                  <el-option
                    v-for="item in itemTypeOptions"
                    :key="item.type"
                    :label="item.text"
                    :value="item.type"
                  />
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="状态" prop="status">
                <el-radio-group v-model="form.status" class="status-radio-group">
                  <el-radio :label="1">开启</el-radio>
                  <el-radio :label="0">禁止</el-radio>
                </el-radio-group>
              </el-form-item>
            </el-col>
          </el-row>

          <el-form-item label="部门" prop="deptIdList" class="full-width-item">
            <div class="dept-container">
              <div v-if="!form.itemType" class="empty-dept">请先选择任务类型</div>
              <template v-else-if="deptOptions.length">
                <div class="dept-actions">
                  <el-button
                    type="primary"
                    link
                    :disabled="isAllDeptSelected"
                    @click="handleSelectAllDept"
                  >
                    全选
                  </el-button>
                  <el-button
                    type="primary"
                    link
                    :disabled="!form.deptIdList.length"
                    @click="handleClearAllDept"
                  >
                    取消全选
                  </el-button>
                </div>
                <el-checkbox-group v-model="form.deptIdList" class="dept-grid-group">
                  <el-checkbox
                    v-for="item in deptOptions"
                    :key="item.value"
                    :label="item.value"
                    class="dept-checkbox"
                  >
                    {{ item.label }}
                  </el-checkbox>
                </el-checkbox-group>
              </template>
              <div v-else class="empty-dept">该任务类型下暂无可提需求的部门</div>
            </div>
          </el-form-item>
        </div>

        <div class="form-section">
          <div class="section-title">审批规则</div>
          <el-row :gutter="24">
            <el-col :span="12">
              <el-form-item label="审批来源类型" prop="sourceType">
                <el-select
                  v-model="form.sourceType"
                  clearable
                  filterable
                  placeholder="请选择审批来源类型"
                  @change="handleSourceTypeChange"
                >
                  <el-option
                    v-for="sourceType in sourceTypeOptions"
                    :key="sourceType.value"
                    :label="sourceType.label"
                    :value="sourceType.value"
                    :disabled="sourceType.disabled"
                  />
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="审批类型" prop="approveType">
                <el-select v-model="form.approveType" clearable placeholder="请选择审批类型">
                  <!-- 会签还未开发，先禁用 -->
                  <!-- <el-option label="会签" :value="1" disabled /> -->
                  <el-option label="或签" :value="2" />
                </el-select>
              </el-form-item>
            </el-col>
          </el-row>

          <el-form-item
            v-if="form.sourceType === APPROVAL_SOURCE_TYPE_FIXED"
            label="审批来源值"
            prop="sourceMemberCodeList"
            class="full-width-item"
          >
            <el-select-v2
              v-model="form.sourceMemberCodeList"
              :options="memberOptions"
              multiple
              clearable
              filterable
              :max-collapse-tags="3"
              collapse-tags
              placeholder="请选择固定员工"
              :props="memberSelectProps"
              teleported
            />
          </el-form-item>
          <el-form-item
            v-else-if="form.sourceType === APPROVAL_SOURCE_TYPE_DEPT_MANAGER"
            label="审批来源值"
            prop="sourceDeptIdList"
            class="full-width-item"
          >
            <el-cascader
              v-model="form.sourceDeptIdList"
              :props="cascaderProps"
              clearable
              filterable
              separator=" / "
              placeholder="请选择所属部门"
            />
          </el-form-item>
          <el-form-item v-else label="审批来源值" class="full-width-item">
            <el-input model-value="由系统自动判定" disabled />
          </el-form-item>
        </div>
      </el-form>
    </div>
    <div v-show="showScrollToBottomButton" class="scroll-bottom-mask">
      <el-button type="primary" circle class="scroll-bottom-button" @click="scrollToBottom">
        <el-icon><ArrowDown /></el-icon>
      </el-button>
    </div>

    <template #footer>
      <div class="drawer-footer">
        <el-button :disabled="saving" @click="visible = false">取消</el-button>
        <el-button type="primary" :loading="saving" @click="handleSave">保存配置</el-button>
      </div>
    </template>
  </el-drawer>
</template>

<script setup lang="ts">
  import { designApi, memberApi } from '@/api/index';
  import { ElMessage } from 'element-plus';
  import { useResizeObserver, useScroll } from '@vueuse/core';
  import { keyBy, uniqBy } from 'lodash-es';
  import { ArrowDown } from '@element-plus/icons-vue';
  import { AUDIT_SETTING_DEMAND_SOURCE_TYPE } from '@/views/lute-os/auditSettingDemand/constant';

  interface ItemTypeOption {
    text: string;
    type: number;
  }

  defineProps<{
    itemTypeOptions: ItemTypeOption[];
  }>();

  const emit = defineEmits<{
    saved: [];
  }>();

  const APPROVAL_SOURCE_TYPE_FIXED = 1;
  const APPROVAL_SOURCE_TYPE_MANAGER = 2;
  const APPROVAL_SOURCE_TYPE_DEPT_MANAGER = 3;
  const designTaskApi = designApi as any;
  const callDesignTaskApi = (methodName: string, payload?: any) =>
    designTaskApi[methodName](payload);

  const visible = ref(false);
  const isEditMode = ref(false);
  const saving = ref(false);
  const detailLoading = ref(false);
  const approvalConfigId = ref<number | undefined>();
  const formRef = ref();
  const scrollContainerRef = ref<HTMLElement>();
  const hasScrollableContent = ref(false);
  const { arrivedState } = useScroll(scrollContainerRef);

  const form = ref({
    itemType: undefined as number | undefined,
    deptIdList: [] as number[],
    sourceType: APPROVAL_SOURCE_TYPE_FIXED,
    sourceMemberCodeList: [] as string[],
    sourceDeptIdList: [] as number[],
    approveType: 2 as 1 | 2,
    status: 1 as 0 | 1,
  });

  const rules = reactive({
    itemType: [{ required: true, trigger: 'change', message: '请选择任务类型' }],
    deptIdList: [{ required: true, type: 'array', trigger: 'change', message: '请选择部门' }],
    sourceType: [{ required: true, trigger: 'change', message: '请选择审批来源类型' }],
    sourceMemberCodeList: [
      {
        validator: (_: any, value: string[], callback: (error?: Error) => void) => {
          if (form.value.sourceType !== APPROVAL_SOURCE_TYPE_FIXED || value.length) {
            callback();
            return;
          }
          callback(new Error('请选择固定员工'));
        },
        trigger: 'change',
      },
    ],
    sourceDeptIdList: [
      {
        validator: (_: any, value: number[], callback: (error?: Error) => void) => {
          if (form.value.sourceType !== APPROVAL_SOURCE_TYPE_DEPT_MANAGER || value.length) {
            callback();
            return;
          }
          callback(new Error('请选择所属部门'));
        },
        trigger: 'change',
      },
    ],
    approveType: [{ required: true, trigger: 'change', message: '请选择审批类型' }],
    status: [{ required: true, trigger: 'change', message: '请选择状态' }],
  });

  const deptOptions = ref<{ label: string; value: number }[]>([]);
  const memberOptions = ref<{ label: string; value: string; name: string }[]>([]);
  const memberOptionMap = computed(() => keyBy(memberOptions.value, 'value'));
  const memberSelectProps = {
    label: 'label',
    value: 'value',
  };
  const sourceTypeOptions = computed(() => {
    return AUDIT_SETTING_DEMAND_SOURCE_TYPE.map((item) => ({
      ...item,
      value:
        item.value === 'fixed'
          ? APPROVAL_SOURCE_TYPE_FIXED
          : item.value === 'manager'
          ? APPROVAL_SOURCE_TYPE_MANAGER
          : APPROVAL_SOURCE_TYPE_DEPT_MANAGER,
      disabled: item.value !== 'fixed',
    }));
  });
  const isAllDeptSelected = computed(() => {
    return (
      deptOptions.value.length > 0 && form.value.deptIdList.length === deptOptions.value.length
    );
  });
  const handleSelectAllDept = () => {
    form.value.deptIdList = deptOptions.value.map((item) => item.value);
  };
  const handleClearAllDept = () => {
    form.value.deptIdList = [];
  };
  const showScrollToBottomButton = computed(() => {
    return visible.value && hasScrollableContent.value && !arrivedState.bottom;
  });
  const drawerTitle = computed(() => {
    return isEditMode.value ? '编辑审批流' : '新建审批流';
  });

  const updateScrollability = () => {
    const el = scrollContainerRef.value;
    if (!el) {
      hasScrollableContent.value = false;
      return;
    }
    hasScrollableContent.value = el.scrollHeight - el.clientHeight > 4;
  };
  const scrollToBottom = () => {
    const el = scrollContainerRef.value;
    if (!el) {
      return;
    }
    el.scrollTo({
      top: el.scrollHeight,
      behavior: 'smooth',
    });
  };
  useResizeObserver(scrollContainerRef, () => {
    updateScrollability();
  });

  const querySubDeptList = async (parentId: number) => {
    const res: any = await memberApi.luteosMemberQuerySubDeptList({ parentId });
    return res.deptInfoList || [];
  };

  const cascaderProps = {
    expandTrigger: 'hover' as const,
    label: 'deptName',
    value: 'deptId',
    multiple: false,
    checkStrictly: true,
    lazy: true,
    lazyLoad(node: any, resolve: (data: any[]) => void) {
      querySubDeptList(node.value).then((res) => {
        resolve(res);
      });
    },
  };

  const queryDeptOptions = async (itemType?: number) => {
    const res: any = await designApi.luteosDesignQueryDesignTaskOperationGroupList({
      itemType,
    });
    deptOptions.value = uniqBy(
      (res.operationGroupList || []).filter((item: any) => item.deptId),
      'deptId'
    ).map((item: any) => ({
      label: item.name,
      value: item.deptId,
    })) as unknown as { label: string; value: number }[];
  };

  const mergeMemberOptions = (members: { memberCode: string; name: string }[]) => {
    const patchOptions = members.map((item) => ({
      label: item.name,
      value: item.memberCode,
      name: item.name,
    }));
    memberOptions.value = uniqBy([...memberOptions.value, ...patchOptions], 'value');
  };

  const queryMemberOptions = async () => {
    const res: any = await memberApi.luteosMemberQueryDeptMemberList({
      operatorDepartmentCode: 'all_dept',
      searchChildDept: true,
    });
    memberOptions.value = (res.memberList || []).map((item: any) => ({
      label: item.name,
      value: item.memberCode,
      name: item.name,
    }));
  };

  const resetForm = (itemType?: number) => {
    form.value = {
      itemType,
      deptIdList: [],
      sourceType: APPROVAL_SOURCE_TYPE_FIXED,
      sourceMemberCodeList: [],
      sourceDeptIdList: [],
      approveType: 2,
      status: 1,
    };
    approvalConfigId.value = undefined;
  };

  const mapDetailToForm = (detail: any, defaultItemType?: number) => {
    const sourceType = detail.approvalSourceType ?? APPROVAL_SOURCE_TYPE_FIXED;
    const sourceMemberCodeList =
      sourceType === APPROVAL_SOURCE_TYPE_FIXED
        ? (detail.approvalMembers || []).map((item: any) => item.memberCode)
        : [];
    const sourceDeptIdList =
      sourceType === APPROVAL_SOURCE_TYPE_DEPT_MANAGER ? detail.approvalDeptIds || [] : [];
    mergeMemberOptions(detail.approvalMembers || []);

    form.value = {
      itemType: (detail.itemType ?? defaultItemType) as number | undefined,
      deptIdList: detail.deptIds || [],
      sourceType,
      sourceMemberCodeList,
      sourceDeptIdList,
      approveType: detail.approvalType ?? 2,
      status: detail.status ?? 1,
    };
    approvalConfigId.value = detail.id;
  };

  const handleSourceTypeChange = () => {
    form.value.sourceMemberCodeList = [];
    form.value.sourceDeptIdList = [];
    nextTick(() => {
      updateScrollability();
    });
  };

  const handleItemTypeChange = async (itemType?: number) => {
    await queryDeptOptions(itemType);
    form.value.deptIdList = [];
    nextTick(() => {
      updateScrollability();
    });
  };

  const handleSave = async () => {
    const valid = await formRef.value?.validate().catch(() => false);
    if (!valid) {
      return;
    }
    saving.value = true;
    try {
      const sourceValue =
        form.value.sourceType === APPROVAL_SOURCE_TYPE_FIXED ? form.value.sourceMemberCodeList : [];
      await callDesignTaskApi('luteosDesignOperationSaveDesignApprovalConfig', {
        id: approvalConfigId.value,
        itemType: form.value.itemType,
        deptIds: form.value.deptIdList,
        approvalSourceType: form.value.sourceType,
        approvalType: form.value.approveType,
        status: form.value.status,
        approvalMembers: sourceValue.map((memberCode) => {
          return {
            memberCode,
            name: memberOptionMap.value[memberCode]!.name,
          };
        }),
        approvalDeptIds:
          form.value.sourceType === APPROVAL_SOURCE_TYPE_DEPT_MANAGER
            ? form.value.sourceDeptIdList
            : [],
      });
      ElMessage.success('保存成功');
      visible.value = false;
      emit('saved');
    } catch (error) {
      // ElMessage.error((error as Error).message || '保存失败');
    } finally {
      saving.value = false;
    }
  };

  const openDrawer = async (params?: { itemType?: number; id?: number }) => {
    const { itemType, id } = params || {};
    isEditMode.value = Boolean(id);
    resetForm(itemType);
    deptOptions.value = [];
    detailLoading.value = Boolean(id);
    visible.value = true;
    await queryMemberOptions();
    try {
      if (id) {
        const detail: any = await callDesignTaskApi(
          'luteosDesignOperationQueryDesignApprovalConfigDetail',
          {
            id,
          }
        );
        mapDetailToForm(detail, itemType);
      }
      await queryDeptOptions(form.value.itemType);
    } catch (error) {
      ElMessage.error((error as Error).message || '审批配置详情加载失败');
    } finally {
      detailLoading.value = false;
    }
    await nextTick();
    formRef.value?.clearValidate();
    updateScrollability();
  };

  defineExpose({
    openDrawer,
  });
</script>

<style scoped lang="scss">
  .drawer-content {
    height: 100%;
    overflow-y: auto;
    padding: 20px 40px;
    padding-bottom: 32px;
  }

  .beautified-form {
    .form-section {
      background: #fcfcfc;
      border: 1px solid #f0f0f0;
      border-radius: 8px;
      padding: 24px;
      margin-bottom: 24px;
      transition: all 0.3s ease;

      &:hover {
        border-color: var(--el-color-primary-light-7);
        box-shadow: 0 4px 12px rgba(0, 0, 0, 0.02);
      }

      .section-title {
        font-size: 16px;
        font-weight: 600;
        color: #333;
        margin-bottom: 24px;
        position: relative;
        padding-left: 12px;

        &::before {
          content: '';
          position: absolute;
          left: 0;
          top: 4px;
          bottom: 4px;
          width: 4px;
          background: var(--el-color-primary);
          border-radius: 2px;
        }
      }
    }

    :deep(.el-form-item) {
      margin-bottom: 20px;

      &.full-width-item {
        .el-form-item__content {
          width: 100%;
        }
      }

      .el-form-item__label {
        font-weight: 500;
        color: #606266;
      }
    }

    :deep(.el-select),
    :deep(.el-cascader),
    :deep(.el-input) {
      width: 100%;
    }
  }

  .dept-container {
    width: 100%;
    background: #fff;
    border: 1px solid #e4e7ed;
    border-radius: 4px;
    padding: 16px;
    min-height: 80px;

    .dept-grid-group {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
      gap: 12px;
      width: 100%;

      .dept-checkbox {
        margin-right: 0;
        height: 32px;
        display: flex;
        align-items: center;

        :deep(.el-checkbox__label) {
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
          max-width: 180px;
        }
      }
    }

    .empty-dept {
      height: 60px;
      display: flex;
      align-items: center;
      justify-content: center;
      color: #909399;
      font-size: 13px;
    }

    .dept-actions {
      display: flex;
      gap: 8px;
      margin-bottom: 16px;
      justify-content: flex-start;

      :deep(.el-button.is-link) {
        font-size: 12px;
        height: 24px;
        padding: 0 10px;
        background: #f1f5f9;
        color: #64748b;
        border-radius: 12px;
        transition: all 0.2s ease;

        &:hover:not(.is-disabled) {
          background: var(--el-color-primary-light-9);
          color: var(--el-color-primary);
        }

        &.is-disabled {
          background: #f8fafc;
          color: #cbd5e1;
          cursor: not-allowed;
        }

        span {
          font-weight: 500;
        }
      }
    }
  }

  .status-radio-group {
    display: flex;
    align-items: center;
    height: 32px;
  }

  .drawer-footer {
    display: flex;
    justify-content: flex-end;
    gap: 12px;
    padding: 10px 20px;
  }

  .scroll-bottom-mask {
    position: absolute;
    left: 0;
    right: 0;
    bottom: 0px;
    height: 120px;
    background: linear-gradient(to bottom, transparent, rgba(255, 255, 255, 0.95) 80%);
    display: flex;
    justify-content: center;
    align-items: flex-end;
    padding-bottom: 24px;
    z-index: 10;
    pointer-events: none;
    transition: all 0.3s ease;
  }

  .scroll-bottom-button {
    pointer-events: auto;
    width: 44px;
    height: 44px;
    font-size: 18px;
    box-shadow: 0 10px 24px rgba(64, 158, 255, 0.35);
    border: none;
    transition: all 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275);
    animation: bounce 2s infinite;

    &:hover {
      transform: translateY(-4px) scale(1.05);
      box-shadow: 0 14px 28px rgba(64, 158, 255, 0.45);
    }
  }

  @keyframes bounce {
    0%,
    20%,
    50%,
    80%,
    100% {
      transform: translateY(0);
    }
    40% {
      transform: translateY(-8px);
    }
    60% {
      transform: translateY(-4px);
    }
  }

  :deep(.approval-flow-drawer) {
    .el-drawer__body {
      position: relative;
      overflow: hidden;
      padding: 0;
    }

    .el-drawer__header {
      margin-bottom: 0;
      padding: 16px 20px;
      border-bottom: 1px solid #f0f0f0;

      span {
        font-size: 18px;
        font-weight: 600;
        color: #303133;
      }
    }

    .el-drawer__footer {
      border-top: 1px solid #f0f0f0;
      padding: 16px 20px;
    }
  }
</style>
