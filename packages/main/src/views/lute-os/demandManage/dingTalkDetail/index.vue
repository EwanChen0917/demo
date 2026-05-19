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
        <!-- 需求创建人 -->
        <el-form-item prop="creator" label="需求创建人">
          <DeptMember v-model="form.creator" :maxCollapseTags="1" disabled />
        </el-form-item>
        <el-form-item label="所在部门">
          <div class="d-flex align-items-center gap-2">
            <el-icon>
              <OfficeBuilding />
            </el-icon>
            <span>{{ form.deptNameStr || '--' }}</span>
          </div>
        </el-form-item>
        <el-form-item prop="createTime" label="创建时间" disabled>
          <el-date-picker
            v-model="form.createTime"
            type="date"
            value-format="YYYY-MM-DD"
            disabled
            style="width: 100%"
          />
        </el-form-item>
        <el-form-item label="需求背景" prop="demandBackground">
          <el-input
            type="textarea"
            v-model="form.demandBackground"
            maxlength="500"
            show-word-limit
            placeholder="请输入背景"
            disabled
            :rows="3"
            :autosize="true"
          />
        </el-form-item>
        <el-form-item label="需求描述" prop="demandDesc">
          <el-input
            type="textarea"
            v-model="form.demandDesc"
            maxlength="2000"
            show-word-limit
            placeholder="此处可以补充需求内容 & 描述期望得到的结果"
            :rows="5"
            disabled
            :autosize="true"
          />
        </el-form-item>
        <el-form-item label="期望完成时间" prop="expectFinishTime">
          <el-date-picker
            v-model="form.expectFinishTime"
            type="date"
            placeholder="选择时间"
            value-format="YYYY-MM-DD"
            disabled
            :disabled-date="disabledDate"
          />
        </el-form-item>
        <el-form-item prop="demandType" label="需求类型">
          <el-select v-model="form.demandType" placeholder="请选择需求类型" disabled>
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
            disabled
          />
        </el-form-item>
        <el-form-item prop="demandProperty" label="需求属性">
          <el-select v-model="form.demandProperty" placeholder="请选择需求属性" disabled>
            <el-option
              v-for="(value, key) in DemandPropertyMap"
              :key="key"
              :label="value"
              :value="Number(key)"
            />
          </el-select>
        </el-form-item>
        <el-form-item prop="relatedUsers" label="核心相关人员">
          <el-tooltip
            content="选择的人员在需求状态变更时，评论时，需求完成时均会收到钉钉通知"
            placement="top"
          >
            <DeptMember
              v-model="form.relMemberCodeList"
              multiple
              :maxCollapseTags="5"
              :selfMemberCode="userInfo.deptInfo.memberCode"
              disabled
              placeholder="请选择（多选框可搜索）"
              ref="memberSelectRef"
            />
          </el-tooltip>
        </el-form-item>
        <el-form-item prop="categoryCode" label="产品分类">
          <el-select
            id="categorySelectRef"
            ref="categorySelectRef"
            style="width: 160px"
            v-model="form.categoryCode"
            filterable
            placeholder="请选产品分类"
            disabled
          >
            <el-option
              v-for="item in categoryOptions"
              :value="item.categoryCode"
              :label="item.categoryName"
              :key="item.categoryCode"
            />
          </el-select>
        </el-form-item>
        <el-form-item prop="productLine" label="产品品线" v-if="form.categoryCode !== '0'">
          <ProductLineSelect
            v-model="form.productLine"
            placeholder="请选择产品品线"
            clearable
            filterable
            disabled
          />
        </el-form-item>
        <el-form-item prop="productLevel" label="产品定级" v-if="form.categoryCode === '0'">
          <el-radio-group v-model="form.productLevel" disabled>
            <el-radio label="S" />
            <el-radio label="A" />
            <el-radio label="B" />
            <el-radio label="C" />
            <el-radio label="待定" />
          </el-radio-group>
        </el-form-item>
        <el-form-item label="需求附件">
          <KeenFileUpload
            ref="upload"
            v-model="form.demandFile"
            directory="fileCenter"
            class="file-upload"
            disabled
            :sizeLimit="157286400"
            :showOperate="true"
          ></KeenFileUpload>
        </el-form-item>
      </el-form>
      <div class="button-box">
        <el-button
          v-if="isEditMode && form.status === 1"
          type="primary"
          class="btn-confirm"
          @click="handleApprove"
          :loading="btnLoading"
        >
          同意
        </el-button>
        <el-button
          v-if="isEditMode && form.status === 1"
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
  <ApproveDialog ref="approveDialogRef" @submit="handleApproveSubmit" :userInfo="userInfo" />
  <RejectDialog ref="rejectDialogRef" @submit="handleRejectSubmit" />
</template>

<script setup lang="ts" name="demandDingTalkDetail">
  import { ref, nextTick } from 'vue';
  import DeptMember from '@/views/lute-os/components/DeptMember/index.vue';
  import { DemandTypeMap, DemandPropertyMap } from '../constant';
  import { OfficeBuilding } from '@element-plus/icons-vue';
  import { useRoute } from 'vue-router';
  import ApproveDialog from '@/views/lute-os/demandManage/components/common/ApproveDialog.vue';
  import RejectDialog from '@/views/lute-os/demandManage/components/common/RejectDialog.vue';
  import { useStore } from '@/store/modules/useStore';
  import { storeToRefs } from 'pinia';
  import { platformApi } from '@/api';
  import { useDemandOperation } from '../composables/useDemandOperation';
  import KeenFileUpload from '@/views/lute-os/components/KeenFileUpload/index.vue';
  const { submitOperation } = useDemandOperation();
  const userInfoStore = useStore();
  const { userInfo } = storeToRefs(userInfoStore);
  const route = useRoute();

  const form = ref({
    creator: '',
    deptNameStr: '',
    createTime: '',
    demandTitle: '',
    demandBackground: '',
    demandDesc: '',
    expectFinishTime: '',
    demandType: '',
    sampleDeliveryTime: '',
    categoryCode: '',
    demandFile: [],
    relMemberCodeList: [],
    auditExecuteInfoFlag: '',
    productLine: '',
    productLevel: '',
    auth: '',
    status: 0,
    demandProperty: '',
  });
  const approveDialogRef = ref();
  const rejectDialogRef = ref();
  const headerRef = ref();
  const paddingTop = ref(108);
  function updatePaddingTop() {
    if (headerRef.value) {
      // 取 header 实际高度
      paddingTop.value = headerRef.value.offsetHeight + 20;
    }
  }
  const isEditMode = computed(() => {
    return form.value?.auth?.auditFlag === 1 || false;
  });
  const categoryOptions = ref<any[]>([]);
  const handleApprove = () => {
    // 如果到第二级审批，则需要弹窗
    if (Number(form.value.auditExecuteInfoFlag) === 1) {
      approveDialogRef.value.open();
    } else if (Number(form.value.auditExecuteInfoFlag) === 0) {
      handlePassDemand(form.value);
    }
  };
  const handleReject = () => {
    // 如果到第二级审批，则需要弹窗
    if (Number(form.value.auditExecuteInfoFlag) === 1) {
      rejectDialogRef.value.open();
    } else if (Number(form.value.auditExecuteInfoFlag) === 0) {
      handleRejectDemand(form.value);
    }
  };
  const btnLoading = ref(false);
  const handleApproveSubmit = async (formData: any) => {
    handlePassDemand(formData);
  };
  const handleRejectSubmit = (formData: any) => {
    handleRejectDemand(formData);
  };
  const handlePassDemand = async (formData: any) => {
    btnLoading.value = true;
    try {
      // await submitOperation('approved', form.value);
      await submitOperation('approved', { ...formData, demandCode: form.value.demandCode });
      fetchDetail();
    } catch (error) {
      console.error('通过失败', error);
    } finally {
      btnLoading.value = false;
    }
  };
  const handleRejectDemand = async (formData: any) => {
    btnLoading.value = true;
    try {
      await submitOperation('rejected', { ...formData, demandCode: form.value.demandCode });
      fetchDetail();
    } catch (error) {
      console.error('拒绝失败', error);
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
      const detail = {
        ...res,
        ...res.userResearch,
      };
      detail.demandFile = toUploadFileArray(detail.demandFile);
      detail.department = userInfo.value.deptInfo?.deptId;
      form.value = detail;
      await nextTick();
      updatePaddingTop();
    } catch (e) {
      console.error('加载失败', e);
    } finally {
      pageLoading.value = false;
    }
  };
  function disabledDate(time) {
    // 只允许选择今天及以后
    const today = new Date();
    // 去掉时分秒
    today.setHours(0, 0, 0, 0);
    return time.getTime() < today.getTime();
  }
  const categorySelectRef = ref();
  const loading = ref(false);
  const getCategoryData = async () => {
    loading.value = true;
    try {
      const res = await platformApi.platformDemandQueryCategoryTree();
      categoryOptions.value = [
        { categoryCode: '0', categoryName: '新品调研' },
        ...(res.categoryDataList ?? []),
      ];
    } finally {
      loading.value = false;
    }
  };
  watchEffect(() => {
    nextTick(() => {
      updatePaddingTop();
    });
  });
  onMounted(async () => {
    window.addEventListener('resize', updatePaddingTop);
    updatePaddingTop();
  });
  onUnmounted(() => {
    window.removeEventListener('resize', updatePaddingTop);
  });
  getCategoryData();
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
</style>
