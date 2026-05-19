<template>
  <KeenCard v-loading="pageLoading">
    <el-tabs v-model="activeTab">
      <el-tab-pane
        :label="executeDetailMode ? '执行编辑' : '执行详情'"
        name="executeDetail"
        v-if="executeDetailModeDisplay"
      >
        <ExecuteDetailTab
          v-model:demandDetail="demandDetail"
          @success="backToList"
          :isEditMode="isEditMode"
          :isExecuteMode="executeDetailMode"
          :loading="loading"
        />
      </el-tab-pane>
      <el-tab-pane name="demandDetail" label="需求详情">
        <ApprovalProcess :active-index="currentStep" :steps-list="approvalSteps" />
        <DemandDetailTab
          mode="view"
          :isEditMode="isEditMode"
          :rules="rules"
          :form="demandDetail"
          :userInfo="userInfo"
          @passDemand="handlePassDemand"
          @rejectDemand="handleRejectDemand"
          :cancelForm="handleCancelForm"
          :passDemandLoading="btnLoading.pass"
        />
      </el-tab-pane>
      <el-tab-pane
        name="demandDetailCanEdit"
        label="需求编辑"
        v-if="isEditMode && fromModule === 'submitToApprove'"
      >
        <ApprovalProcess :active-index="currentStep" :steps-list="approvalSteps" />
        <DemandDetailTab
          mode="edit"
          :form="demandDetail"
          :rules="rules"
          ref="demandEditTabRef"
          :isEditMode="isEditMode"
          :userInfo="userInfo"
          @approveAndSubmit="handleApproveAndSubmit"
          @passDemandEdit="handlePassDemandEdit"
          @rejectDemandEdit="handleRejectDemandEdit"
          @success="backToList"
          :cancelForm="handleCancelForm"
          :approveAndSubmitLoading="btnLoading.approveAndSubmit"
        />
      </el-tab-pane>
      <el-tab-pane name="demandDetailResubmit" label="重新提交" v-if="resubmitMode">
        <ApprovalProcess :active-index="currentStep" :steps-list="approvalSteps" />
        <DemandDetailTab
          mode="resubmit"
          :rules="rules"
          ref="demandResubmitTabRef"
          :form="demandDetail"
          :userInfo="userInfo"
          @success="backToList"
          @resubmit="handleResubmit"
          :cancelForm="handleCancelForm"
          :loading="btnLoading.resubmit"
        />
      </el-tab-pane>
      <el-tab-pane :label="`操作日志（${total || logList.length}）`" name="log">
        <LogTab
          :logs="logList"
          @refresh="fetchLogs"
          :demandDetail="demandDetail"
          :total="total"
          :pageSize="pageSize"
          :currentPage="currentPage"
          @page-change="handlePageChange"
          @size-change="handlePageSizeChange"
        />
      </el-tab-pane>
    </el-tabs>
  </KeenCard>
  <SurveyFeedback />
</template>

<script setup name="demandDetail">
  import { useRouter, useRoute } from 'vue-router';
  import ExecuteDetailTab from '../components/ExecuteDetailTab.vue';
  import DemandDetailTab from '../components/DemandDetailTab.vue';
  import LogTab from '../components/LogTab.vue';
  import { platformApi, memberApi, productApi } from '@/api';
  import { useStore } from '@/store/modules/useStore';
  import { storeToRefs } from 'pinia';
  import { useDemandOperation } from '../composables/useDemandOperation';
  import { onBeforeRouteLeave } from 'vue-router';
  import { ElMessage } from 'element-plus';
  import SurveyFeedback from '../components/SurveyFeedback.vue';
  import ApprovalProcess from '../components/common/ApproveSteps.vue';
  import { approvalStepsInitial } from '../demandManageType';
  const { submitOperation } = useDemandOperation();
  const userInfoStore = useStore();
  const { userInfo } = storeToRefs(userInfoStore);
  const store = useStore();
  // 需求创建人提交需求审批时，有且仅有创建人的直接领导可以在需求页面编辑需求，同意后保存编辑内容，并进入下一个审批环节。
  const activeTab = ref('demandDetail');
  const logList = ref([]);
  const btnLoading = reactive({
    resubmit: false,
    pass: false,
    reject: false,
    approveAndSubmit: false,
  });
  const resubmitMode = computed(() => {
    return route.query.resubmit === '1';
  });
  const demandDetail = ref({});
  const isEditMode = computed(() => {
    return demandDetail.value?.auth?.auditFlag === 1 || false;
  });
  const executeDetailMode = computed(() => {
    return (
      (route.query.from === 'executeMyDemandList' && demandDetail.value.status === 3) ||
      demandDetail.value.status === 5
    );
  });
  const executeDetailModeDisplay = computed(() => {
    return (
      (((route.query.from !== 'submitMyDemand' || route.query.tab === 'toReceive') &&
        route.query.from !== 'executeList') ||
        demandDetail.value.status === 7 ||
        demandDetail.value.status === 8 ||
        demandDetail.value.status === 3) &&
      demandDetail.value.status !== 1
    );
  });
  const route = useRoute();
  const isProductCenter = ref(true);
  const rules = reactive({
    categoryCode: [{ required: true, message: '请选择产品分类', trigger: 'blur' }],
    productLine: [{ required: true, message: '请选择产品品线', trigger: 'blur' }],
    productLevel: [{ required: true, message: '请选择产品定级', trigger: 'blur' }],
    demandProperty: [{ required: true, message: '请选择需求属性', trigger: 'blur' }],
    demandTitle: [{ required: true, message: '请输入需求标题', trigger: 'blur' }],
    demandDesc: [{ required: true, message: '请输入需求描述', trigger: 'blur' }],
    demandBackground: [{ required: true, message: '请输入需求背景', trigger: 'blur' }],
    demandType: [{ required: true, message: '请选择需求类型', trigger: 'blur' }],
    sampleDeliveryTime: [{ required: true, message: '请选择预计发样时间', trigger: 'blur' }],
  });
  const currentStep = ref('1');
  const approvalSteps = ref([]);
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
    const { id } = route.params;
    if (!id) return;
    try {
      const res = await platformApi.platformDemandDetail({
        demandCode: id,
        demandModule: 'user_research',
      });
      const detail = {
        ...res.userResearch,
        ...res,
      };
      detail.demandFile = toUploadFileArray(detail.demandFile);
      detail.userResearchFile = toUploadFileArray(detail.userResearchFile);
      detail.department = userInfo.value.deptInfo?.deptId;
      detail.categoryCode = detail.skuCode === '0' ? '0' : detail.categoryCode;
      detail.handlerList = Array.isArray(detail.handlerList)
        ? detail.handlerList.map((handler) => handler.handler)
        : [detail.handler];
      demandDetail.value = detail;
      console.log(demandDetail.value, 'demandDetail');
      // await nextTick();
    } catch (e) {
      console.error('加载失败', e);
    } finally {
      pageLoading.value = false;
    }
  };
  const fetchApproveSteps = async () => {
    pageLoading.value = true;
    const { id } = route.params;
    if (!id) return;
    try {
      const res = await platformApi.platformDemandQueryDemandProcessStep({ demandCode: id });
      res.demandProcessStepList?.forEach((item, index) => {
        approvalStepsInitial.forEach((cell) => {
          if ([0, 6, 7].includes(index)) {
            item.operator = userInfo.value?.name;
          }
          if (item.stepCode === cell.stepCode) {
            item.stepName = cell.stepName;
          }
        });
      });
      approvalSteps.value = res.demandProcessStepList;
      currentStep.value = res.order;
    } catch (e) {
      console.error('加载失败', e);
    } finally {
      pageLoading.value = false;
    }
  };
  const fromModule = computed(() => {
    return route.query.from;
  });
  const backToList = (message = '操作成功') => {
    const { menuType } = route.query;
    // 跳转回执行端
    if (menuType === '0') {
      router.replace({ name: 'demandExecuteList' });
    } else if (menuType === '1') {
      // 跳转回提交端
      router.replace({ name: 'demandSubmitList' });
    } else {
      router.back();
    }
    ElMessage.success(message);
  };
  const handlePassDemand = async (formData) => {
    btnLoading.pass = true;
    try {
      await submitOperation('approved', { ...formData, demandCode: demandDetail.value.demandCode });
      // fetchDetail();
      if (!formData.holdOn) {
        backToList();
      } else {
        fetchDetail();
        fetchApproveSteps();
      }
    } catch (error) {
      console.error('通过失败', error);
    } finally {
      btnLoading.pass = false;
    }
  };
  const handleRejectDemand = async (formData) => {
    btnLoading.pass = true;
    try {
      await submitOperation('rejected', { ...formData, demandCode: demandDetail.value.demandCode });
      if (!formData.holdOn) {
        backToList();
      } else {
        fetchDetail();
        fetchApproveSteps();
      }
    } catch (error) {
      console.error('拒绝失败', error);
    } finally {
      btnLoading.pass = false;
    }
  };
  const handlePassDemandEdit = async (formData) => {
    btnLoading.pass = true;
    try {
      await submitOperation('approved', { ...formData, demandCode: demandDetail.value.demandCode });
      // fetchDetail();
    } catch (error) {
      console.error('通过失败', error);
    } finally {
      btnLoading.pass = false;
      backToList();
    }
  };
  const handleRejectDemandEdit = async (formData) => {
    btnLoading.reject = true;
    try {
      await submitOperation('rejected', { ...formData, demandCode: demandDetail.value.demandCode });
      // fetchDetail();
    } catch (error) {
      console.error('拒绝失败', error);
    } finally {
      btnLoading.reject = false;
      backToList();
    }
  };
  const demandEditTabRef = ref(null);
  const demandResubmitTabRef = ref(null);
  const handleApproveAndSubmit = async (formData) => {
    const valid = await demandEditTabRef.value.formRef.validate();
    if (!valid) return;
    btnLoading.approveAndSubmit = true;
    try {
      await submitOperation('save_and_approved', {
        ...formData,
        skuCode: formData.categoryCode === '0' ? '0' : undefined,
        demandCode: demandDetail.value.demandCode,
      });
      // fetchDetail();
    } catch (error) {
      console.error('同意并提交失败', error);
    } finally {
      btnLoading.approveAndSubmit = false;
      backToList('同意并提交成功');
    }
  };
  const handleResubmit = async (formData) => {
    const valid = await demandResubmitTabRef.value.formRef.validate();
    if (!valid) return;
    btnLoading.resubmit = true;
    try {
      await submitOperation('resubmit', {
        ...formData,
        skuCode: formData.categoryCode === '0' ? '0' : undefined,
        demandCode: demandDetail.value.demandCode,
        editFlag: 1,
        approveFlag: 1,
      });
      // fetchDetail();
    } catch (error) {
      console.error('重新提交失败', error);
    } finally {
      backToList('重新提交成功');
      btnLoading.resubmit = false;
    }
  };
  // const handleResubmit = async (formData) => {
  //   console.log('handleResubmit', formData);
  //   const valid = await demandResubmitTabRef.value.formRef.validate();
  //   if (!valid) return;
  //   console.log('handleResubmit run');
  //   btnLoading.resubmit = true;
  //   await new Promise(res => setTimeout(res, 2000));
  //   btnLoading.resubmit = false;
  // };
  const total = ref(0);
  const pageSize = ref(100);
  const currentPage = ref(1);
  // 获取日志信息
  const fetchLogs = async () => {
    const params = {
      itemType: 'demand_ur',
      moduleType: 'demand',
      pageSize: pageSize.value,
      // pageNum: currentPage.value,
    };
    const res = await platformApi.platformQueryLog({ ...params, itemCode: route.params.id });
    logList.value = res.logList || [];
    total.value = res.total;
  };
  const fetchIsProductCenter = async () => {
    const res = await platformApi.platformDemandIsProductCenterDept();
    isProductCenter.value = Boolean(res.productCenterDeptFlag);
    rules.categoryCode[0].required = isProductCenter.value;
    rules.productLine[0].required = isProductCenter.value;
  };
  onMounted(async () => {
    fetchDetail();
    fetchApproveSteps();
    fetchLogs();
    fetchIsProductCenter();
    if (
      route.query.from === 'executeMyDemandList' &&
      (demandDetail.value.status === 3 || route.query.executeDetail === '1')
    ) {
      activeTab.value = 'executeDetail';
    }
    if (
      (route.query.from === 'execute' || route.query.from === 'executeMyDemandList') &&
      route.query.interaudit === '1'
    ) {
      activeTab.value = 'executeDetail';
    }
    if (route.query.from === 'submitMyDemand' && route.query.resubmit === '1') {
      activeTab.value = 'demandDetailResubmit';
    }
    if (route.query.from === 'dingTalkQueryLog' || route.query.source === 'dingTalkQueryLog') {
      activeTab.value = 'log';
      const menuCode = store.menuCodeMap?.[route?.name];
      await memberApi.luteosMemberSysReport({
        platform: 'OS',
        menuCode,
        eventName: route?.meta?.title + '钉钉查看日志',
        memberCode: userInfo?.value?.memberCode,
        type: 'button',
        pageUrl: route?.path,
      });

      await memberApi.luteosMemberSaveMenuVisit({
        menuCode,
      });
    }
    if (route.query.from === 'dingTalkDetail' || route.query.source === 'dingTalkDetail') {
      activeTab.value = 'demandDetail';
      const menuCode = store.menuCodeMap?.[route?.name];
      await memberApi.luteosMemberSysReport({
        platform: 'OS',
        menuCode,
        eventName: route?.meta?.title + '钉钉详情',
        memberCode: userInfo?.value?.memberCode,
        type: 'button',
        pageUrl: route?.path,
      });

      await memberApi.luteosMemberSaveMenuVisit({
        menuCode,
      });
    }
  });

  const handlePageChange = (page) => {
    currentPage.value = page;
    fetchLogs();
  };
  const handlePageSizeChange = (size) => {
    pageSize.value = size;
    currentPage.value = 1;
    fetchLogs();
  };
  const router = useRouter();
  const handleCancelForm = () => {
    const { menuType } = route.query;
    // 跳转回执行端
    if (menuType === ' 0') {
      router.replace({ name: 'demandExecuteList' });
    } else if (menuType === '1') {
      // 跳转回提交端
      router.replace({ name: 'demandSubmitList' });
    } else {
      router.back();
    }
  };
  onActivated(() => {
    fetchDetail();
    fetchApproveSteps();
    fetchLogs();
    fetchIsProductCenter();
  });
  onBeforeRouteLeave((to, from, next) => {
    const fromList = route.query.from || 'defaultList';
    sessionStorage.setItem(`backFromDetail_${fromList}`, '1');
    next();
  });
</script>
