<template>
  <el-row :gutter="20" class="mt-5">
    <!-- 左侧主表单 -->
    <el-col :span="14">
      <el-form
        label-width="120px"
        :model="form"
        :rules="rules"
        ref="formRef"
        :validate-on-rule-change="false"
      >
        <el-form-item label="执行人">
          <DeptMember style="width: 260px" v-model="form.handler" :maxCollapseTags="1" disabled />
        </el-form-item>
        <el-form-item label="预计开始时间" prop="planStartDate">
          <template v-if="disableCondition && !form.planStartDate">
            <span style="color: #999">-</span>
          </template>
          <el-date-picker
            v-else
            style="width: 260px"
            v-model="form.planStartDate"
            type="date"
            placeholder="选择时间"
            value-format="YYYY-MM-DD"
            :disabled="disableCondition"
          />
        </el-form-item>
        <el-form-item label="预计完成时间" prop="planFinishDate">
          <template v-if="disableCondition && !form.planFinishDate">
            <span style="color: #999">-</span>
          </template>
          <el-date-picker
            v-else
            style="width: 260px"
            v-model="form.planFinishDate"
            type="date"
            placeholder="选择时间"
            value-format="YYYY-MM-DD"
            :disabled="disableCondition"
            :disabled-date="disablePlanFinishDate"
          />
        </el-form-item>
        <!-- 上线链接 -->
        <el-form-item label="上线链接" prop="onlineLink">
          <template v-if="disableCondition && !form.onlineLink">
            <span style="color: #999">-</span>
          </template>
          <el-input
            v-else
            v-model="form.onlineLink"
            placeholder="请输入上线链接"
            :disabled="disableCondition"
          />
        </el-form-item>
        <el-form-item label="变更原因" prop="changeReason">
          <template v-if="disableCondition && !form.changeReason">
            <span style="color: #999">-</span>
          </template>
          <el-input
            v-else
            v-model="form.changeReason"
            maxlength="200"
            show-word-limit
            type="textarea"
            placeholder="请描述变更预计完成时间的原因"
            :disabled="disableCondition"
            :autosize="true"
          />
        </el-form-item>
        <el-form-item :label="disableCondition ? '附件' : '上传附件'">
          <KeenFileUpload
            ref="upload"
            v-model="form.handleFileList"
            directory="fileCenter"
            class="file-upload handle-file-upload"
            :disabled="disableCondition"
            showOperate
            multiple
            :limit="5"
            :sizeLimit="157286400"
            drag
            @change="handleFileChange"
          >
            <!-- 选择文件后该区域会消失 -->
            <div class="custom-upload-area" :class="{ 'is-disabled': props.mode === 'view' }">
              <div class="upload-icon-box">
                <el-icon class="upload-cloud-icon"><UploadFilled /></el-icon>
              </div>
              <div class="upload-tip-text">
                在此处上传Brief；拖入文件到此处或者点击上传箭头选择文件进行上传
              </div>
            </div>
          </KeenFileUpload>
          <!-- <span v-if="disableCondition" style="color: #999">-</span> -->
        </el-form-item>
        <el-form-item
          v-if="
            (route.query.from === 'executeMyDemandList' && route.query.tab === 'executing') ||
            (route.query.from === 'dingTalkDetail' && demandDetail.status === 23)
          "
        >
          <el-button type="primary" @click="executeCompleted('completed')">执行完成</el-button>
          <el-button type="primary" @click="executeCompleted('save')">保存</el-button>
        </el-form-item>
        <el-form-item
          v-if="
            (route.query.from === 'submitMyDemand' && route.query.tab === 'toReceive') ||
            (route.query.from === 'dingTalkDetail' && demandDetail.status === 26)
          "
        >
          <el-button type="primary" @click="handleSubmitAudit('approved')">验收通过</el-button>
          <el-button type="danger" @click="handleSubmitAudit('rejected_dialog')">
            验收拒绝
          </el-button>
        </el-form-item>
      </el-form>
    </el-col>
  </el-row>
  <RejectDialog ref="rejectDialogRef" @submit="handleSubmitReject" />
</template>

<script setup>
  import { reactive, ref } from 'vue';
  import { useRoute } from 'vue-router';
  import { platformApi } from '@/api';
  import { useVModel } from '@vueuse/core';
  import { useRouter } from 'vue-router';
  import dayjs from 'dayjs';
  import { ElMessage } from 'element-plus';
  import RejectDialog from '@/views/lute-os/demandManage/components/common/RejectDialog.vue';
  import DeptMember from '@/views/lute-os/components/DeptMember/index.vue';
  import KeenFileUpload from '@/views/lute-os/components/KeenFileUpload/index.vue';
  const router = useRouter();
  const emit = defineEmits(['success']);
  const route = useRoute();
  const props = defineProps({
    demandDetail: {
      type: Object,
      default: () => ({}),
    },
    isEditMode: {
      type: Boolean,
      default: false,
    },
    userInfo: {
      type: Object,
      default: () => ({}),
    },
  });
  function disablePlanFinishDate(date) {
    if (!form.value.planStartDate) return false;
    return date.getTime() < new Date(form.value.planStartDate).setHours(0, 0, 0, 0);
  }
  const form = useVModel(props, 'demandDetail', {
    handler: '',
    onlineLink: '',
    planFinishDate: '',
    planStartDate: '',
    changeReason: '',
    handleFileList: [],
  });

  const rules = reactive({
    onlineLink: [
      { required: true, message: '请输入上线链接', trigger: 'blur' },
      {
        validator: (rule, value, callback) => {
          if (!value) {
            callback();
            return;
          }

          const urlRegex = /^(https?:\/\/)([\w.-]+)\.([a-zA-Z]{2,})(\/\S*)?$/;
          if (!urlRegex.test(value)) {
            callback(new Error('请输入有效的链接地址'));
          } else {
            callback();
          }
        },
        trigger: 'blur',
      },
    ],
    planStartDate: [{ required: true, message: '请选择预计开始时间', trigger: 'change' }],
    planFinishDate: [{ required: true, message: '请选择预计完成时间', trigger: 'change' }],
    // 下面这三项提交审核必填，保存时可不填
    reportConclusion: [],
    handleFileList: [],
    changeReason: [
      {
        validator: (rule, value, callback) => {
          const formDate = dayjs(form.value.planFinishDate).format('YYYY-MM-DD');
          const originDate = dayjs(originalPlanFinishDate.value).format('YYYY-MM-DD');
          console.log(formDate, originDate);
          if (formDate !== originDate) {
            if (!value || !value.trim()) {
              callback(new Error('变更原因必填（请填写200字内）'));
            } else {
              callback();
            }
          } else {
            callback();
          }
        },
        trigger: 'blur',
      },
    ],
  });
  const { demandDetail } = toRefs(props);
  const disableCondition = computed(() => {
    return [26, 28].includes(demandDetail.value.status);
  });
  const originalPlanFinishDate = ref('');
  const formRef = ref();
  const rejectDialogRef = ref();
  const handleSubmitAudit = async (type) => {
    if (!(await formRef.value?.validate())) return;
    if (type === 'rejected_dialog') {
      rejectDialogRef.value.open();
      return;
    }
    try {
      await platformApi.platformDemandCheckReceive({
        demandCode: props.demandDetail.demandCode,
        demandModule: 'brand_research',
        operationType: 1,
        onlineLink: form.value.onlineLink,
      });
      emit('success');
    } catch (e) {
      console.error('操作失败', e);
    }
  };
  const executeCompleted = async (type) => {
    if (!(await formRef.value?.validate())) return;
    try {
      const params = {
        demandCode: props.demandDetail.demandCode,
        demandModule: 'brand_research',
        changeReason: form.value.changeReason,
        isSaveFlag: type === 'save' ? 1 : 0,
        onlineLink: form.value.onlineLink,
        planFinishDate: form.value.planFinishDate,
        planStartDate: form.value.planStartDate,
        handleFileList: form.value.handleFileList.map((item) => ({
          fileCode: item.fileCode,
          fileKey: item.ossKey,
          fileName: item.name,
          extType: item.name.split('.').pop() || '',
          fileSize: item.size || 0,
        })),
      };
      await platformApi.platformDemandExecutionFinishOrSave(params);
      emit('success');
    } catch (e) {
      console.error('操作失败', e);
    }
  };
  const handleSubmitReject = async (formData) => {
    try {
      await platformApi.platformDemandCheckReceive({
        demandCode: props.demandDetail.demandCode,
        demandModule: 'brand_research',
        operationType: 0,
        onlineLink: form.value.onlineLink,
        reason: formData.reason,
      });
      emit('success');
    } catch (e) {
      console.error('操作失败', e);
    }
  };
  // const handleFileChange = (fileList) => {
  //   // 由于需要在选择文件后隐藏el-upload，所以需要获取到el-upload的container，然后隐藏
  //   const uploadContainer = document.querySelector('.el-upload.el-upload--text');
  //   if (fileList?.length > 0) {
  //     if (uploadContainer) {
  //       uploadContainer.style.display = 'none';
  //     }
  //   } else {
  //     if (uploadContainer) {
  //       uploadContainer.style.display = 'block';
  //     }
  //   }
  // };
  function updateChangeReasonRules() {
    const origin = originalPlanFinishDate.value;
    const current = form.value.planFinishDate;

    // 原始为空 ⇒ 首次填写 / 清空都不算变更
    if (!origin) {
      rules.changeReason = [];
      formRef.value?.clearValidate('changeReason');
      return;
    }
    if (!current) {
      rules.changeReason = [];
      formRef.value?.clearValidate('changeReason');
      return;
    }

    const isChanged = dayjs(origin).format('YYYY-MM-DD') !== dayjs(current).format('YYYY-MM-DD');
    rules.changeReason = isChanged
      ? [
          { required: true, message: '变更原因必填（请填写200字内）', trigger: 'blur' },
          {
            validator: (rule, value, cb) =>
              !value?.trim() ? cb(new Error('变更原因必填（请填写200字内）')) : cb(),
            trigger: 'blur',
          },
        ]
      : [];
    if (isChanged) {
      formRef.value?.validateField('changeReason');
    } else {
      formRef.value?.clearValidate('changeReason');
    }
  }

  watch(
    () => form.value.planFinishDate,
    () => {
      console.log('planFinishDate变化了', form.value.planFinishDate);
      updateChangeReasonRules();
      // 主动校验一次，防止校验状态不更新
      formRef.value?.validateField('changeReason');
    }
  );
  const stopWatchOriginal = watch(
    () => props.demandDetail.planFinishDate,
    (val) => {
      if (val) {
        originalPlanFinishDate.value = val;
        stopWatchOriginal();
      }
    },
    { immediate: true }
  );
  onMounted(() => {
    updateChangeReasonRules();
  });
</script>
<style scoped lang="scss">
  @use '../base.scss';
</style>
