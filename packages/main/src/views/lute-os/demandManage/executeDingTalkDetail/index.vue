<template>
  <div class="dingding-detail-container" :style="{ paddingTop: paddingTop + 'px' }">
    <div v-loading="pageLoading">
      <div class="header" ref="headerRef">
        <div>
          <span class="title">用研需求：</span>
          <span class="demand-title">【{{ form.demandTitle || '需求标题' }}】等待您审批。</span>
        </div>
        <a type="primary" class="detail-link" @click="openInBrowser">查看详情</a>
      </div>
      <el-form :model="form" class="detail-form" label-width="105px">
        <el-form-item label="需求执行人" prop="handlerList">
          <DeptMember
            v-model="form.handlerList"
            :maxCollapseTags="3"
            multiple
            collapseTags
            disabled
            teleported
          />
        </el-form-item>
        <el-form-item label="预计开始时间" prop="planStartDate">
          <el-date-picker
            v-model="form.planStartDate"
            type="date"
            placeholder="选择时间"
            value-format="YYYY-MM-DD"
            disabled
          />
        </el-form-item>
        <el-form-item label="预计完成时间" prop="planFinishDate">
          <el-date-picker
            v-model="form.planFinishDate"
            type="date"
            placeholder="选择时间"
            value-format="YYYY-MM-DD"
            disabled
            :disabled-date="disablePlanFinishDate"
          />
        </el-form-item>
        <el-form-item label="实际完成时间" prop="executionFinishTime">
          <el-date-picker
            v-model="form.executionFinishTime"
            type="date"
            placeholder="选择时间"
            value-format="YYYY-MM-DD"
            disabled
          />
        </el-form-item>
        <el-form-item v-if="form.changeReason" label="变更原因" prop="changeReason">
          <el-input
            v-model="form.changeReason"
            maxlength="200"
            show-word-limit
            type="textarea"
            placeholder="请描述变更预计完成时间的原因"
            disabled
            :autosize="true"
          />
        </el-form-item>
        <el-form-item label="上传附件" prop="userResearchFile">
          <div @click="handleUploadClick" class="w-100">
            <KeenFileUpload
              ref="upload"
              v-model="form.userResearchFile"
              directory="fileCenter"
              class="file-upload"
              disabled
              :sizeLimit="157286400"
            ></KeenFileUpload>
          </div>
        </el-form-item>
        <el-form-item label="结论" prop="reportConclusion">
          <p class="conclusion-text">
            {{ form.reportConclusion || '-' }}
          </p>
        </el-form-item>
      </el-form>
      <div class="button-box">
        <el-button
          v-if="inetrAuditButtonDisplayCondition"
          type="primary"
          class="btn-confirm"
          @click="handleApprove"
          :loading="btnLoading"
        >
          同意
        </el-button>
        <el-button
          v-if="inetrAuditButtonDisplayCondition"
          type="danger"
          class="btn-reject"
          @click="handleReject"
          :loading="btnLoading"
        >
          拒绝
        </el-button>
        <el-button class="btn-open" @click="openInBrowser">系统内打开</el-button>
      </div>
    </div>
  </div>
  <RejectDialog ref="rejectDialogRef" @submit="handleRejectSubmit" />
</template>

<script setup lang="ts" name="demandExecuteDingTalkDetail">
  import { ref, reactive, nextTick } from 'vue';
  import DeptMember from '@/views/lute-os/components/DeptMember/index.vue';
  import { useRoute } from 'vue-router';
  import RejectDialog from '@/views/lute-os/demandManage/components/common/RejectDialog.vue';
  import { useStore } from '@/store/modules/useStore';
  import { storeToRefs } from 'pinia';
  import { platformApi } from '@/api';
  import { useDemandOperation } from '../composables/useDemandOperation';
  import { ElMessage } from 'element-plus';
  import KeenFileUpload from '@/views/lute-os/components/KeenFileUpload/index.vue';
  const { submitOperation } = useDemandOperation();
  const userInfoStore = useStore();
  const { userInfo } = storeToRefs(userInfoStore);
  const route = useRoute();
  let detail = reactive<any>({});
  const form = ref({
    demandTitle: '',
    handlerList: [],
    planStartDate: '',
    planFinishDate: '',
    changeReason: '',
    userResearchFile: [],
    reportConclusion: '',
    executionFinishTime: '',
  });
  const inetrAuditButtonDisplayCondition = computed(() => {
    return form.value.status === 4 && form.value?.auth?.auditFlag === 1;
  });
  const rejectDialogRef = ref();
  const headerRef = ref();
  const paddingTop = ref(108);
  function updatePaddingTop() {
    if (headerRef.value) {
      // 取 header 实际高度
      paddingTop.value = headerRef.value.offsetHeight + 20;
    }
  }
  const btnLoading = ref(false);
  const handleApprove = async () => {
    btnLoading.value = true;
    try {
      await submitOperation('inner_approved', { demandCode: form.value.demandCode });
      fetchDetail();
    } catch (error) {
      console.error('内审通过失败', error);
    } finally {
      btnLoading.value = false;
    }
  };
  const handleReject = () => {
    rejectDialogRef.value.open();
  };
  const handleRejectSubmit = async (formData) => {
    btnLoading.value = true;
    try {
      await submitOperation('inner_rejected', {
        demandCode: form.value.demandCode,
        innerApproveRemark: formData.reason,
      });
      fetchDetail();
    } catch (error) {
      console.error('内审拒绝失败', error);
    } finally {
      btnLoading.value = false;
    }
  };
  const openInBrowser = () => {
    const isDEV = import.meta.env.VITE_ENV === 'DEV';
    window.open(
      `${isDEV ? 'https://erp.luteos.site' : 'https://erp.luteos.com'}/demand/detail/${
        route.params.id
      }`,
      '_blank'
    );
  };
  function toUploadFileArray(val) {
    if (Array.isArray(val)) {
      return val.map((file) => ({
        ossKey: file.ossKey || file.fileKey || '',
        name: file.name || file.fileName || '',
        fileCode: file.fileCode || '',
        ...file,
      }));
    }
    if (val && typeof val === 'object') {
      return [
        {
          ossKey: val.ossKey || val.fileKey || '',
          name: val.name || val.fileName || '',
          fileCode: val.fileCode || '',
          percentage: val.percentage ?? 100,
          ...val,
        },
      ];
    }
    return [];
  }
  const pageLoading = ref(false);
  const fetchDetail = async () => {
    pageLoading.value = true;
    const id = route.params.id;
    if (!id) return;
    try {
      const res = await platformApi.platformDemandDetail({
        demandCode: id,
        demandModule: 'user_research',
      });
      detail = {
        ...res.userResearch,
        ...res,
      };
      detail.userResearchFile = toUploadFileArray(detail.userResearchFile);
      detail.department = userInfo.value.deptInfo?.deptId;
      detail.handlerList = Array.isArray(detail.handlerList)
        ? detail.handlerList.map((handler) => handler.handler)
        : [detail.handler];
      form.value = detail;
      await nextTick();
      updatePaddingTop();
    } catch (e) {
      console.error('加载失败', e);
    } finally {
      pageLoading.value = false;
    }
  };
  function disablePlanFinishDate(date) {
    if (!form.value.planStartDate) return false;
    return date.getTime() < new Date(form.value.planStartDate).setHours(0, 0, 0, 0);
  }
  function handleUploadClick() {
    ElMessage.warning('请进入系统内预览附件');
  }
  watchPostEffect(() => {
    const uploadContainer = document.querySelector('.el-upload');
    if (uploadContainer) {
      uploadContainer.style.display = 'none';
    }
    updatePaddingTop();
    form.value.handlerList;
  });
  onMounted(() => {
    window.addEventListener('resize', updatePaddingTop);
    updatePaddingTop();
  });
  onUnmounted(() => {
    window.removeEventListener('resize', updatePaddingTop);
  });
  fetchDetail();
</script>

<style scoped lang="scss">
  .dingding-detail-container {
    margin: 0 auto;
    background: #fff;
    padding: 0 0 108px 0;
  }

  .header {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    z-index: 10;
    min-height: 48px;
    background: #fff;
    border-bottom: 1px solid #eee;
    font-size: 16px;
    font-weight: bold;
    padding: 12px 36px;
    margin-bottom: 24px;
    display: flex;
    flex-direction: column;
    gap: 8px;

    .el-link {
      align-self: flex-start;
    }

    .demand-title {
      color: #333;
    }

    .detail-link {
      font-size: 12px;
      cursor: pointer;
    }
  }

  .detail-form {
    background: #fff;
    padding: 0 24px;
  }

  .button-box {
    display: flex;
    justify-content: center;
    gap: 32px;
    padding: 32px 24px 32px 24px;
    position: fixed;
    left: 0;
    bottom: 0;
    width: 100vw;
    background: #fff;
    border-top: 1px solid #eee;
    z-index: 10;
    margin: 0 auto;

    .btn-confirm,
    .btn-reject,
    .btn-open {
      width: 120px;
    }
  }

  .conclusion-text {
    color: #1f1f1f;
    white-space: pre-wrap;
    margin: 0;
    line-height: 1.5;
    word-break: break-all;
    min-height: 32px;
    width: 100%;
  }
</style>
