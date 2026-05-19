<template>
  <el-form
    :model="form"
    label-width="140px"
    class="demand-form mt-5"
    :class="{ 'is-view-mode': props.mode === 'view' }"
    :rules="rules"
    ref="formRef"
    :validate-on-rule-change="false"
    :disabled="loading"
  >
    <el-row :gutter="20">
      <el-col :span="12">
        <el-form-item prop="creator" label="需求创建人">
          <div class="creator-display">
            <el-avatar :src="creatorAvatar" :size="30">
              {{ creatorInitial }}
            </el-avatar>
            <span class="creator-name">{{ creatorName }}</span>
          </div>
        </el-form-item>
        <el-form-item label="所在部门">
          <div class="d-flex align-items-center gap-2" style="height: 32px">
            <el-icon>
              <OfficeBuilding />
            </el-icon>
            <span>{{ departmentLabel }}</span>
          </div>
        </el-form-item>
        <el-form-item prop="createTime" label="创建时间" v-if="props.mode !== 'create'">
          <div v-if="isViewMode" class="detail-readonly-value">{{ formatDisplayDate(form.createTime) }}</div>
          <el-date-picker
            v-else
            v-model="form.createTime"
            type="date"
            value-format="YYYY-MM-DD"
            disabled
            style="width: 100%"
          />
        </el-form-item>
        <el-form-item prop="demandType" label="需求类型">
          <div v-if="isViewMode" class="detail-readonly-value">{{ demandTypeLabel }}</div>
          <el-select
            v-else
            v-model="form.demandType"
            placeholder="请选择需求类型"
            :disabled="props.mode === 'view'"
          >
            <el-option
              v-for="(value, key) in DemandTypeMap"
              :key="key"
              :label="value"
              :value="Number(key)"
            />
          </el-select>
        </el-form-item>
        <el-form-item prop="sampleDeliveryTime" label="预计发样时间" v-if="form.demandType === 2">
          <div v-if="isViewMode" class="detail-readonly-value">
            {{ formatDisplayDate(form.sampleDeliveryTime) }}
          </div>
          <el-date-picker
            v-else
            v-model="form.sampleDeliveryTime"
            type="date"
            placeholder="选择时间"
            value-format="YYYY-MM-DD"
            :disabled-date="disabledDate"
            :disabled="props.mode === 'view'"
          />
        </el-form-item>
        <el-form-item prop="demandProperty" label="需求属性">
          <div v-if="isViewMode" class="detail-readonly-value">{{ demandPropertyLabel }}</div>
          <el-select
            v-else
            v-model="form.demandProperty"
            placeholder="请选择需求属性"
            :disabled="props.mode === 'view'"
          >
            <el-option
              v-for="(value, key) in DemandPropertyMap"
              :key="key"
              :label="value"
              :value="Number(key)"
            />
          </el-select>
        </el-form-item>
        <el-form-item prop="relatedUsers" label="需求核心相关人员">
          <el-tooltip
            content="选择的人员在需求状态变更时，评论时，需求完成时均会收到钉钉通知"
            placement="top"
          >
            <div v-if="isViewMode" class="detail-member-list">
              <div v-if="isEmpty(readonlyMembers)" class="detail-readonly-value">--</div>
              <div v-else v-for="member in readonlyMembers" :key="member.memberCode" class="detail-member-item">
                <el-avatar :src="member.avatar || defaultAvatar" :size="30" />
                <span>{{ member.name }}</span>
              </div>
            </div>
            <DeptMember
              v-else
              v-model="form.relMemberCodeList"
              multiple
              :maxCollapseTags="3"
              :selfMemberCode="userInfo.deptInfo.memberCode"
              :filterSelf="props.mode === 'create'"
              :disabled="props.mode === 'view'"
              deferRenderUntilOptionsLoaded
              placeholder="请选择（多选框可搜索）"
            />
          </el-tooltip>
        </el-form-item>
        <el-form-item prop="categoryCode" label="产品分类">
          <div v-if="isViewMode" class="detail-readonly-value">{{ categoryLabel }}</div>
          <el-select
            v-else
            v-model="form.categoryCode"
            filterable
            clearable
            placeholder="请选产品分类"
            :popper-options="{ placement: 'top-start' }"
            :disabled="props.mode === 'view'"
            :filter-method="handleSearch"
          >
            <el-option
              v-for="item in filteredOptions"
              :value="item.categoryCode"
              :label="item.fullCategoryName"
              :key="item.categoryCode"
            >
              <span>{{ item.categoryName }}</span>
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item prop="productLine" label="产品品线" v-if="form.categoryCode !== '0'">
          <div v-if="isViewMode" class="detail-readonly-value">{{ productLineLabel }}</div>
          <ProductLineSelect
            v-else
            v-model="form.productLine"
            placeholder="请选择产品品线"
            clearable
            filterable
            :disabled="props.mode === 'view'"
          />
        </el-form-item>

        <el-form-item prop="productLevel" label="产品定级" v-if="form.categoryCode === '0'">
          <div v-if="isViewMode" class="detail-readonly-value">{{ productLevelLabel }}</div>
          <el-radio-group v-else v-model="form.productLevel" :disabled="props.mode === 'view'">
            <el-radio label="S" />
            <el-radio label="A" />
            <el-radio label="B" />
            <el-radio label="C" />
            <el-radio label="待定" />
          </el-radio-group>
        </el-form-item>
        <el-form-item>
          <!-- 提交需求模式 -->
          <template v-if="props.mode === 'create'">
            <el-button
              type="primary"
              @click="props.submitForm(false)"
              :loading="props.submitDemandLoading"
              :disabled="props.createActionGroupLoading && !props.submitDemandLoading"
            >
              提交需求
            </el-button>
            <el-button
              @click="saveForm"
              :loading="props.submitDraftLoading"
              :disabled="props.createActionGroupLoading && !props.submitDraftLoading"
            >
              存为草稿
            </el-button>
          </template>
          <!-- 审批 -->
          <template v-else-if="detailViewState.showApproveActions || detailViewState.showEditApproveSubmitAction">
            <el-button
              type="success"
              @click="passDemand"
              :loading="props.passDemandLoading"
              :disabled="props.approveActionGroupLoading && !props.passDemandLoading"
            >
              通过
            </el-button>
            <el-button
              type="danger"
              @click="rejectDemand"
              :loading="props.rejectDemandLoading"
              :disabled="props.approveActionGroupLoading && !props.rejectDemandLoading"
            >
              拒绝
            </el-button>
            <el-button
              v-if="detailViewState.showEditApproveSubmitAction"
              type="success"
              @click="approveAndSubmit"
              :loading="props.approveAndSubmitLoading"
              :disabled="props.approveActionGroupLoading && !props.approveAndSubmitLoading"
            >
              同意并提交
            </el-button>
            <el-button @click="cancelForm">取消</el-button>
          </template>
          <template v-else-if="detailViewState.showResubmitAction">
            <el-button
              type="success"
              @click="resubmitForm"
              :loading="props.resubmitLoading"
              :disabled="props.resubmitGroupLoading && !props.resubmitLoading"
            >
              重新提交
            </el-button>
            <el-button @click="cancelForm">取消</el-button>
          </template>
          <template v-else>
            <!-- <el-button @click="cancelForm">返回</el-button> -->
          </template>
        </el-form-item>
      </el-col>
      <el-col :span="12">
        <el-form-item label="需求标题" prop="demandTitle" required>
          <div v-if="isViewMode" class="detail-readonly-text">{{ form.demandTitle || '--' }}</div>
          <el-input
            v-else
            v-model="form.demandTitle"
            maxlength="50"
            show-word-limit
            placeholder="请输入标题"
            type="textarea"
            :autosize="true"
            :disabled="props.mode === 'view'"
          />
        </el-form-item>
        <el-form-item label="需求背景" prop="demandBackground" required>
          <div v-if="isViewMode" class="detail-readonly-text">{{ form.demandBackground || '--' }}</div>
          <el-input
            v-else
            type="textarea"
            v-model="form.demandBackground"
            maxlength="500"
            show-word-limit
            placeholder="请输入背景"
            :disabled="props.mode === 'view'"
            :rows="3"
            :autosize="true"
          />
        </el-form-item>
        <el-form-item label="需求描述" prop="demandDesc" required>
          <div v-if="isViewMode" class="detail-readonly-text">{{ form.demandDesc || '--' }}</div>
          <el-input
            v-else
            type="textarea"
            v-model="form.demandDesc"
            maxlength="2000"
            show-word-limit
            placeholder="此处可以补充需求内容 & 描述期望得到的结果"
            :rows="5"
            :disabled="props.mode === 'view'"
            :autosize="true"
          />
        </el-form-item>
        <el-form-item label="期望完成时间" prop="expectFinishTime">
          <div v-if="isViewMode" class="detail-readonly-value">
            {{ formatDisplayDate(form.expectFinishTime) }}
          </div>
          <el-date-picker
            v-else
            v-model="form.expectFinishTime"
            type="date"
            placeholder="选择时间"
            value-format="YYYY-MM-DD"
            :disabled="props.mode === 'view'"
            :disabled-date="disabledDate"
          />
        </el-form-item>
        <el-form-item label="上传附件">
          <template #label>
            <span>
              上传附件
              <el-tooltip
                v-if="props.mode === 'create'"
                effect="dark"
                content="如有相关项目资料，可将上传文件拖至这里进行上传，或点击此处选择文件；支持任意格式，请勿超过150MB"
                placement="top"
              >
                <el-icon
                  style="margin-left: 4px; color: #909399; cursor: pointer; vertical-align: middle"
                >
                  <QuestionFilled />
                </el-icon>
              </el-tooltip>
            </span>
          </template>
          <div v-if="isViewMode" class="detail-file-list">
            <div v-if="isEmpty(readonlyDemandFiles)" class="detail-readonly-value">--</div>
            <div
              v-else
              class="detail-file-item"
              v-for="file in readonlyDemandFiles"
              :key="file.uid"
              @click="handlePreviewFile(file)"
            >
              <span class="detail-file-name detail-file-link">{{ file.name }}</span>
              <span class="detail-file-size">{{ file.sizeText }}</span>
            </div>
          </div>
          <KeenFileUpload
            v-else
            ref="upload"
            v-model="form.demandFile"
            directory="fileCenter"
            class="file-upload"
            :disabled="props.mode === 'view'"
            :sizeLimit="157286400"
            :showOperate="true"
          >
            <el-button type="primary" :disabled="props.mode === 'view'">选择文件</el-button>
          </KeenFileUpload>
        </el-form-item>
      </el-col>
    </el-row>
    <!-- 编辑模式 -->
  </el-form>
  <ApproveDialog ref="approveDialogRef" @submit="handleApproveSubmit" :userInfo="userInfo" />
  <RejectDialog ref="rejectDialogRef" @submit="handleRejectSubmit" />
  <FilesPreview
    v-if="previewVisible"
    :key="previewFileUrl"
    :fileUrl="previewFileUrl"
    :fileName="previewFileName"
    :extType="previewFileExtType"
    @close="previewVisible = false"
  />
</template>

<script setup lang="ts">
  import dayjs from 'dayjs';
  import { isEmpty, isNil } from 'lodash-es';
  import ApproveDialog from './common/ApproveDialog.vue';
  import RejectDialog from './common/RejectDialog.vue';
  import { DemandPropertyMap, DemandTypeMap } from '../constant';
  import { useStore } from '@/store/modules/useStore';
  import { useDemandBaseInfoStore } from '../../stores/useDemandBaseInfoStore';
  import { useDemandWorkbenchStore } from '../../stores/useDemandWorkbenchStore';
  import { useDemandDetailViewState } from '../../hooks/useDemandDetailViewState';
  import { storeToRefs } from 'pinia';
  import { useVModel } from '@vueuse/core';
  import DeptMember from '@/views/lute-os/components/DeptMember/index.vue';
  import KeenFileUpload from '@/views/lute-os/components/KeenFileUpload/index.vue';
  import FilesPreview from '@/views/lute-os/components/FilesPreview/index.vue';
  const userInfoStore = useStore();
  const { userInfo } = storeToRefs(userInfoStore);
  const baseInfoStore = useDemandBaseInfoStore();
  const workbenchStore = useDemandWorkbenchStore();
  const formRef = ref();
  const props = defineProps({
    form: { type: Object, default: null },
    rules: { type: Object, required: true },
    mode: { type: String, default: '' },
    submitForm: { type: Function, required: true },
    canApproveCurrentStep: { type: Boolean, default: false },
    cancelForm: { type: Function, required: false },
    submitLoading: { type: Boolean, default: false },
    submitDemandLoading: { type: Boolean, default: false },
    submitDraftLoading: { type: Boolean, default: false },
    createActionGroupLoading: { type: Boolean, default: false },
    resubmitLoading: { type: Boolean, default: false },
    resubmitGroupLoading: { type: Boolean, default: false },
    approveAndSubmitLoading: { type: Boolean, default: false },
    passDemandLoading: { type: Boolean, default: false },
    rejectDemandLoading: { type: Boolean, default: false },
    approveActionGroupLoading: { type: Boolean, default: false },
    skuOptions: { type: Array, default: [] },
    currentStepCode: { type: String, default: '' },
    isFirstApproveNode: { type: Boolean, default: false },
    isCreator: { type: Boolean, default: false },
  });
  const categoryOptions = computed(() => baseInfoStore.categoryOptions);
  function disabledDate(time) {
    // 只允许选择今天及以后
    const today = new Date();
    // 去掉时分秒
    today.setHours(0, 0, 0, 0);
    return time.getTime() < today.getTime();
  }
  const form = useVModel(props, 'form');
  const detailContext = computed(() => ({
    bizTab: workbenchStore.state.bizTab,
    mode: props.mode,
    status: Number(form.value?.status ?? 0),
    currentStepCode: props.currentStepCode,
    canApproveCurrentStep: props.canApproveCurrentStep,
    auditFlag: Number(form.value?.auth?.auditFlag ?? form.value?.auditFlag ?? 0),
    cancelFlag: Number(form.value?.auth?.cancelFlag ?? 0) === 1,
    isFirstApproveNode: props.isFirstApproveNode,
    isCreator: props.isCreator,
  }));
  const detailViewState = useDemandDetailViewState(detailContext);
  const isViewMode = computed(() => props.mode === 'view');
  const defaultAvatar = new URL('@/assets/images/icon/defaultAvatar.png', import.meta.url).href;
  const creatorName = computed(() => {
    if (props.mode === 'create') {
      return userInfo.value?.name || '--';
    }
    return form.value?.creatorName || form.value?.createName || form.value?.creator || '--';
  });
  const creatorAvatar = computed(() => {
    if (props.mode === 'create') {
      return userInfo.value?.avatar || defaultAvatar;
    }
    return form.value?.createAvatar || form.value?.creatorAvatar || defaultAvatar;
  });
  const creatorInitial = computed(() => {
    if (!creatorName.value || creatorName.value === '--') {
      return '创';
    }
    return creatorName.value.slice(-1);
  });
  const departmentLabel = computed(() => {
    if (props.mode === 'create') {
      return form.value?.deptNameStr || '--';
    }
    return form.value?.deptStr || '--';
  });
  const formatDisplayDate = (value: string | number | null | undefined) => {
    if (!value) return '--';
    const parsed = dayjs(value);
    return parsed.isValid() ? parsed.format('YYYY-MM-DD') : String(value);
  };
  const demandTypeLabel = computed(
    () => (DemandTypeMap as Record<string, string>)[`${form.value?.demandType ?? ''}`] || '--'
  );
  const demandPropertyLabel = computed(
    () => (DemandPropertyMap as Record<string, string>)[`${form.value?.demandProperty ?? ''}`] || '--'
  );
  const categoryLabel = computed(() => {
    const categoryCode = `${form.value?.categoryCode ?? ''}`;
    if (categoryCode === '0') {
      return '新品调研';
    }
    const matchedCategory = categoryOptions.value.find(
      (item) => `${item?.categoryCode ?? ''}` === categoryCode
    );
    return (
      form.value?.fullCategoryName ||
      form.value?.categoryName ||
      matchedCategory?.fullCategoryName ||
      matchedCategory?.categoryName ||
      '--'
    );
  });
  const productLineLabel = computed(() => form.value?.productLineStr || '--');
  const productLevelLabel = computed(() => form.value?.productLevel || '--');
  const formatFileSize = (size: number | null | undefined) => {
    if (isNil(size)) return '--';
    if (size < 1024) return `${size}B`;
    if (size < 1024 * 1024) return `${(size / 1024).toFixed(1)}KB`;
    return `${(size / (1024 * 1024)).toFixed(1)}MB`;
  };
  const readonlyDemandFiles = computed(() => {
    const files = form.value?.demandFile;
    const fileArray = Array.isArray(files) ? files : files ? [files] : [];
    return fileArray.map((file, index) => {
      const fileName = file?.name || file?.fileName || '--';
      const fileSize = file?.size ?? file?.fileSize;
      return {
        uid: file?.uid || file?.fileCode || file?.ossKey || `${fileName}-${index}`,
        name: fileName,
        sizeText: formatFileSize(fileSize),
        fileUrl: file?.fileUrl || file?.url || '',
        previewWay: Number(file?.previewWay ?? 1),
        extType: file?.extType || '',
      };
    });
  });
  const previewVisible = ref(false);
  const previewFileUrl = ref('');
  const previewFileName = ref('');
  const previewFileExtType = ref('');
  const handlePreviewFile = (file: {
    fileUrl: string;
    previewWay: number;
    name: string;
    extType: string;
  }) => {
    if (!file.fileUrl) return;
    if (file.previewWay === 2) {
      window.open(file.fileUrl, '_blank');
      return;
    }
    previewFileUrl.value = file.fileUrl;
    previewFileName.value = file.name;
    previewFileExtType.value = file.extType || file.name.split('.').pop() || '';
    previewVisible.value = true;
  };
  const readonlyMembers = computed(() => {
    const memberCodeList = form.value?.relMemberCodeList;
    if (Array.isArray(memberCodeList) && !isEmpty(memberCodeList)) {
      return memberCodeList.map((member) => {
        const memberCode = String(member?.memberCode || member);
        const cachedMember = baseInfoStore.deptMemberMap?.[memberCode] || {};
        if (typeof member === 'string') {
          return {
            memberCode,
            name: cachedMember?.name || memberCode || '--',
            avatar: cachedMember?.avatar || '',
          };
        }
        return {
          memberCode: memberCode || member?.name || '--',
          name: member?.memberName || member?.name || cachedMember?.name || memberCode || '--',
          avatar: member?.avatar || cachedMember?.avatar || '',
        };
      });
    }
    const memberNameList = form.value?.relMemberNameList;
    if (Array.isArray(memberNameList) && !isEmpty(memberNameList)) {
      return memberNameList.map((member) => ({
        memberCode: String(member),
        name: `${member}`,
        avatar: '',
      }));
    }
    const memberList = form.value?.relMemberList;
    if (Array.isArray(memberList) && !isEmpty(memberList)) {
      return memberList.map((member) => {
        if (typeof member === 'string') {
          return {
            memberCode: member,
            name: member,
            avatar: '',
          };
        }
        const memberCode = member?.memberCode || member?.handler || '';
        const cachedMember = baseInfoStore.deptMemberMap?.[memberCode] || {};
        return {
          memberCode: memberCode || member?.name || '--',
          name: member?.memberName || member?.name || memberCode || '--',
          avatar: member?.avatar || cachedMember?.avatar || '',
        };
      });
    }
    return [];
  });

  const resubmitForm = async () => {
    emit('resubmit', form.value);
  };
  const saveForm = async () => {
    emit('saveForm', form.value);
  };
  const approveAndSubmit = async () => {
    emit('approveAndSubmit', form.value);
  };

  const approveDialogRef = ref();
  const rejectDialogRef = ref();
  const emit = defineEmits([
    'passDemand',
    'rejectDemand',
    'approveAndSubmit',
    'resubmit',
    'saveForm',
    'success',
  ]);
  const passDemand = () => {
    if (form.value.auditExecuteInfoFlag === 1) {
      approveDialogRef.value.open();
    } else if (form.value.auditExecuteInfoFlag === 0) {
      emit('passDemand', form.value);
    }
  };

  const rejectDemand = () => {
    if (form.value.auditExecuteInfoFlag === 1) {
      rejectDialogRef.value.open();
    } else if (form.value.auditExecuteInfoFlag === 0) {
      emit('rejectDemand', form.value);
    }
  };
  const handleApproveSubmit = async (formData: any) => {
    emit('passDemand', { ...formData, holdOn: true });
  };
  const handleRejectSubmit = async (formData: any) => {
    emit('rejectDemand', { ...formData, holdOn: true });
  };
  const loading = computed(() => baseInfoStore.loadingMap.categoryOptions);
  const searchKeyword = ref('');
  const filteredOptions = computed(() => {
    if (!searchKeyword.value) {
      return categoryOptions.value;
    }
    const normalizedKeyword = searchKeyword.value.toLowerCase();
    return categoryOptions.value.filter((item) =>
      `${item.categoryName || item.fullCategoryName || ''}`.toLowerCase().includes(normalizedKeyword)
    );
  });
  const handleSearch = (query) => {
    searchKeyword.value = query || '';
  };
  onMounted(() => {
    baseInfoStore.ensureCategoryOptions();
    baseInfoStore.ensureDeptMemberOptions();
  });
  defineExpose({
    formRef,
  });
</script>
<style scoped>
  .creator-display {
    height: 32px;
    display: inline-flex;
    align-items: center;
    gap: 8px;
  }

  .creator-name {
    color: var(--el-text-color-primary);
    line-height: 1;
  }

  .is-view-mode :deep(.el-form-item) {
    margin-bottom: 20px;
  }

  .is-view-mode :deep(.el-form-item__label) {
    color: #64748b;
    font-weight: 500;
  }

  .is-view-mode :deep(.el-input__wrapper.is-disabled),
  .is-view-mode :deep(.el-textarea__inner:disabled),
  .is-view-mode :deep(.el-select .el-select__wrapper.is-disabled),
  .is-view-mode :deep(.el-date-editor.is-disabled),
  .is-view-mode :deep(.el-radio__input.is-disabled + .el-radio__label),
  .is-view-mode :deep(.el-checkbox__input.is-disabled + .el-checkbox__label) {
    color: #0f172a;
    -webkit-text-fill-color: #0f172a;
  }

  .is-view-mode :deep(.el-input__wrapper.is-disabled),
  .is-view-mode :deep(.el-textarea__inner:disabled),
  .is-view-mode :deep(.el-select .el-select__wrapper.is-disabled),
  .is-view-mode :deep(.el-date-editor.is-disabled),
  .is-view-mode :deep(.el-upload-list__item),
  .is-view-mode :deep(.el-tag) {
    background: #f8fafc;
    border-color: #e2e8f0;
  }

  .is-view-mode :deep(.el-input.is-disabled .el-input__inner),
  .is-view-mode :deep(.el-textarea.is-disabled .el-textarea__inner) {
    cursor: default;
    color: #0f172a;
    -webkit-text-fill-color: #0f172a;
  }

  .is-view-mode :deep(.el-textarea__inner:disabled) {
    min-height: 96px !important;
    line-height: 1.6;
  }

  .is-view-mode :deep(.el-radio__input.is-disabled .el-radio__inner),
  .is-view-mode :deep(.el-checkbox__input.is-disabled .el-checkbox__inner) {
    border-color: #94a3b8;
    background: #ffffff;
  }

  .detail-readonly-value {
    min-height: 32px;
    width: 100%;
    display: flex;
    align-items: center;
    padding: 0 12px;
    border: 1px solid #e2e8f0;
    border-radius: 8px;
    background: #f8fafc;
    color: #0f172a;
    line-height: 1.4;
  }

  .detail-readonly-text {
    width: 100%;
    min-height: 96px;
    padding: 10px 12px;
    border: 1px solid #e2e8f0;
    border-radius: 8px;
    background: #f8fafc;
    color: #0f172a;
    white-space: pre-wrap;
    word-break: break-word;
    line-height: 1.6;
  }

  .detail-file-list {
    width: 100%;
    display: flex;
    flex-direction: column;
    gap: 8px;
  }

  .detail-file-item {
    display: flex;
    justify-content: space-between;
    align-items: center;
    min-height: 36px;
    padding: 0 12px;
    border: 1px solid #e2e8f0;
    border-radius: 8px;
    background: #f8fafc;
    color: #0f172a;
    cursor: pointer;
  }

  .detail-file-name {
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    max-width: calc(100% - 90px);
  }

  .detail-file-link {
    color: #409eff;
  }

  .detail-file-size {
    color: #64748b;
    font-size: 12px;
    margin-left: 8px;
    flex-shrink: 0;
  }

  .detail-member-list {
    width: 100%;
    min-height: 32px;
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    gap: 8px;
  }

  .detail-member-item {
    display: inline-flex;
    align-items: center;
    gap: 8px;
    min-height: 32px;
    color: #0f172a;
  }
</style>
