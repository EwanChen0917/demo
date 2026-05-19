<template>
  <el-form
    :model="form"
    label-width="140px"
    class="demand-form mt-5"
    :rules="rules"
    ref="formRef"
    :validate-on-rule-change="false"
    :disabled="loading"
  >
    <el-row :gutter="20">
      <el-col :span="12">
        <el-form-item prop="creator" label="需求创建人">
          <DeptMember v-model="form.creator" :maxCollapseTags="1" disabled />
        </el-form-item>
        <el-form-item label="所在部门">
          <div class="d-flex align-items-center gap-2" style="height: 32px">
            <el-icon>
              <OfficeBuilding />
            </el-icon>
            <span>{{ form.deptNameStr || '--' }}</span>
          </div>
        </el-form-item>
        <el-form-item prop="createTime" label="创建时间" v-if="props.mode !== 'create'">
          <el-date-picker
            v-model="form.createTime"
            type="date"
            value-format="YYYY-MM-DD"
            disabled
            style="width: 100%"
          />
        </el-form-item>
        <el-form-item prop="demandType" label="需求类型">
          <el-select
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
          <el-date-picker
            v-model="form.sampleDeliveryTime"
            type="date"
            placeholder="选择时间"
            value-format="YYYY-MM-DD"
            :disabled-date="disabledDate"
            :disabled="props.mode === 'view'"
          />
        </el-form-item>
        <el-form-item prop="demandProperty" label="需求属性">
          <el-select
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
            <DeptMember
              v-model="form.relMemberCodeList"
              multiple
              :maxCollapseTags="5"
              :selfMemberCode="userInfo.deptInfo.memberCode"
              :filterSelf="props.mode === 'create'"
              :disabled="props.mode === 'view'"
              placeholder="请选择（多选框可搜索）"
              ref="memberSelectRef"
            />
          </el-tooltip>
        </el-form-item>
        <el-form-item prop="categoryCode" label="产品分类">
          <el-select
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
          <ProductLineSelect
            v-model="form.productLine"
            placeholder="请选择产品品线"
            clearable
            filterable
            :disabled="props.mode === 'view'"
          />
        </el-form-item>

        <el-form-item prop="productLevel" label="产品定级" v-if="form.categoryCode === '0'">
          <el-radio-group v-model="form.productLevel" :disabled="props.mode === 'view'">
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
            <el-button type="primary" @click="props.submitForm(false)" :loading="submitLoading">
              提交需求
            </el-button>
            <el-button @click="saveForm" :loading="submitLoading">存为草稿</el-button>
          </template>
          <!-- 审批 -->
          <template v-else-if="canShowAuditButtons">
            <el-button type="success" @click="passDemand" :loading="props.passDemandLoading">
              通过
            </el-button>
            <el-button type="danger" @click="rejectDemand" :loading="props.passDemandLoading">
              拒绝
            </el-button>
            <el-button @click="cancelForm">取消</el-button>
          </template>
          <template v-else-if="props.mode === 'edit' && props.isEditMode && form.status === 1">
            <el-button
              type="success"
              @click="approveAndSubmit"
              :loading="props.approveAndSubmitLoading"
            >
              同意并提交
            </el-button>
            <el-button @click="cancelForm">取消</el-button>
          </template>
          <template v-else-if="props.mode === 'resubmit'">
            <el-button type="success" @click="resubmitForm" :loading="props.resubmitLoading">
              重新提交
            </el-button>
            <el-button @click="cancelForm">取消</el-button>
          </template>
          <template v-else>
            <el-button @click="cancelForm">返回</el-button>
          </template>
        </el-form-item>
      </el-col>
      <el-col :span="12">
        <el-form-item label="需求标题" prop="demandTitle" required>
          <el-input
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
          <el-input
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
          <el-input
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
          <el-date-picker
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
          <KeenFileUpload
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
</template>

<script setup lang="ts">
  import ApproveDialog from './common/ApproveDialog.vue';
  import RejectDialog from './common/RejectDialog.vue';
  import { platformApi } from '@/api';
  import { DemandPropertyMap, DemandTypeMap } from '../constant';
  import { useStore } from '@/store/modules/useStore';
  import { storeToRefs } from 'pinia';
  import { useVModel } from '@vueuse/core';
  import { useRouter } from 'vue-router';
  import { useDemandOperation } from '../composables/useDemandOperation';
  // import CategoryCascader from '@/views/lute-os/demandManage/components/CategoryCascader.vue';
  // import SkuSelectFormItem from '@/views/lute-os/demandManage/components/common/skuSelectFormItem.vue';
  import DeptMember from '@/views/lute-os/components/DeptMember/index.vue';
  import KeenFileUpload from '@/views/lute-os/components/KeenFileUpload/index.vue';
  const { submitOperation, buildPayloadByType } = useDemandOperation();
  import { ElMessage } from 'element-plus';
  const userInfoStore = useStore();
  const { userInfo } = storeToRefs(userInfoStore);
  const formRef = ref();
  const router = useRouter();
  const props = defineProps({
    form: { type: Object, default: null },
    rules: { type: Object, required: true },
    mode: { type: String, default: '' },
    submitForm: { type: Function, required: true },
    isEditMode: { type: Boolean, default: false },
    userInfo: { type: Object, default: null },
    cancelForm: { type: Function, required: false },
    submitLoading: { type: Boolean, default: false },
    resubmitLoading: { type: Boolean, default: false },
    approveAndSubmitLoading: { type: Boolean, default: false },
    passDemandLoading: { type: Boolean, default: false },
    skuOptions: { type: Array, default: [] },
  });
  const categoryOptions = ref<any[]>([]);
  function disabledDate(time) {
    // 只允许选择今天及以后
    const today = new Date();
    // 去掉时分秒
    today.setHours(0, 0, 0, 0);
    return time.getTime() < today.getTime();
  }
  const route = useRoute();
  const form = useVModel(props, 'form');
  const canShowAuditButtons = computed(() => {
    const isAuditMode = ['review', 'view'].includes(props.mode);
    const isApprover =
      Number(form.value?.auth?.auditFlag ?? form.value?.auditFlag ?? 0) === 1 || props.isEditMode;
    const isApprovingStatus = Number(form.value?.status) === 1;
    return isAuditMode && isApprover && isApprovingStatus;
  });

  const resubmitForm = async () => {
    // console.log('resubmitForm', form.value);
    // await submitOperation('resubmit', form.value);
    emit('resubmit', form.value);
  };
  const saveForm = async () => {
    emit('saveForm', form.value);
  };
  const approveAndSubmit = async () => {
    // await submitOperation('save_and_approved', form.value);
    emit('approveAndSubmit', form.value);
  };
  const memberSelectRef = ref();

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
    const executeInfoFlag = Number(form.value.auditExecuteInfoFlag);
    // 如果到第二级审批，则需要弹窗
    if (executeInfoFlag === 1) {
      approveDialogRef.value.open();
    } else if (executeInfoFlag === 0) {
      // 直接通过不弹窗
      // submitOperation('approved', { demandCode: form.value.demandCode });
      emit('passDemand', form.value);
    }
  };

  const rejectDemand = () => {
    const executeInfoFlag = Number(form.value.auditExecuteInfoFlag);
    // 如果到第二级审批，则需要弹窗
    if (executeInfoFlag === 1) {
      rejectDialogRef.value.open();
    } else if (executeInfoFlag === 0) {
      // submitOperation('rejected', { demandCode: form.value.demandCode, remark: form.value.remark });
      emit('rejectDemand', form.value);
    }
  };
  const handleApproveSubmit = async (formData: any) => {
    emit('passDemand', { ...formData, holdOn: true });
  };
  const handleRejectSubmit = async (formData: any) => {
    emit('rejectDemand', { ...formData, holdOn: true });
  };
  function highlightLastTwo(str) {
    if (typeof str !== 'string' || !str) return '';

    if (str.indexOf('>') === -1) return str;

    const parts = str.split('>').map((s) => s.trim());

    if (parts.some((p) => !p)) return str;

    if (parts.length === 2) {
      // 两级：两个都高亮
      return `<span class="highlight-keyword">${parts[0]} &gt; ${parts[1]}</span>`;
    }

    const before = parts.slice(0, -2).join(' > ');
    const lastTwo = parts.slice(-2).join(' > ');

    return `${before} > <span class="highlight-keyword">${lastTwo}</span>`;
  }

  const taskCategory = ref();
  const categorySelectRef = ref();
  const createTaskCategory = async () => {
    const res = await platformApi.platformDemandSaveDemandPdtCategory({
      categoryName: taskCategory.value,
    });
    ElMessage.success('创建成功');
    categoryOptions.value.push({
      categoryCode: res.categoryCode,
      categoryName: res.categoryName,
    });
    form.value.categoryName = res.categoryName;
    form.value.categoryCode = res.categoryCode;
    taskCategory.value = '';
    categorySelectRef.value.blur();
    filteredOptions.value = [...categoryOptions.value];
  };
  const loading = ref(false);
  const getCategoryData = async () => {
    loading.value = true;
    try {
      const res = await platformApi.platformDemandQueryCategoryTree();
      categoryOptions.value = [
        { categoryCode: '0', categoryName: '新品调研' },
        ...(res.categoryDataList ?? []),
      ];
      filteredOptions.value = [...categoryOptions.value];
    } finally {
      loading.value = false;
    }
  };
  const selectedValue = ref('');
  const searchQuery = ref(''); // 存储搜索内容
  const filteredOptions = ref<any[]>([]); // 存储当前过滤后的列表
  const isShowAddCategory = ref<boolean>(false);
  // 处理搜索输入
  const handleSearch = (query) => {
    searchQuery.value = query; // 保存搜索内容
    if (query) {
      filteredOptions.value = categoryOptions.value.filter((item) =>
        item.categoryName.toLowerCase().includes(query.toLowerCase())
      );
    } else {
      filteredOptions.value = [...categoryOptions.value];
    }
    isShowAddCategory.value = !filteredOptions.value?.length;
    if (isShowAddCategory.value) {
      taskCategory.value = query;
    }
  };
  onMounted(() => {
    getCategoryData();
  });
  defineExpose({
    formRef,
  });
</script>
<style>
  .highlight-keyword {
    color: #f40;
    font-weight: bold;
  }
</style>
