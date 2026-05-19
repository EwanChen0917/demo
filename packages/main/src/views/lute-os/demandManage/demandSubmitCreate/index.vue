<template>
  <KeenCard title="需求提交">
    <ApprovalProcess :active-index="currentStep" :steps-list="approvalSteps" />
    <DemandDetailForm
      ref="demandDetailFormRef"
      :form="form"
      :rules="rules"
      :submitForm="submitForm"
      mode="create"
      :submitLoading="submitLoading"
      @saveForm="submitForm(true)"
    />
  </KeenCard>
  <SurveyFeedback />
</template>

<script lang="ts" setup name="demandSubmitCreate">
  import { debounce } from 'lodash-es';
  import { ElMessage } from 'element-plus';
  import DemandDetailForm from '../components/DemandDetailTab.vue';
  import { createDrawer } from '../components/drawerModalFunc';
  import { useStore } from '@/store/modules/useStore';
  import { storeToRefs } from 'pinia';
  import { platformApi, productApi } from '@/api';
  import { useRouter } from 'vue-router';
  import SurveyFeedback from '../components/SurveyFeedback.vue';
  import ApprovalProcess from '@/views/lute-os/demandManage_5.0/modules/common/ApproveStepsV5.vue';
  import dayjs from 'dayjs';
  const router = useRouter();
  const userInfoStore = useStore();
  const { userInfo } = storeToRefs(userInfoStore);
  const demandDetailFormRef = ref();
  const form = reactive({
    creator: '',
    department: '',
    deptNameStr: '',
    demandType: '',
    sampleDeliveryTime: '',
    demandProperty: '',
    relMemberCodeList: [],
    skuCode: '',
    productLine: '',
    productLevel: '',
    demandTitle: '',
    demandBackground: '',
    demandDesc: '',
    expectFinishTime: '',
    demandFile: [] as any[],
    categoryCode: '',
    demandCode: '',
  });
  const submitLoading = ref(false);
  async function saveServerDraft() {
    const draftData = {
      ...form,
      creator: undefined,
      department: undefined,
      deptNameStr: undefined,
    };
    try {
      const res = await platformApi.platformDemandCacheDraftDemand({
        ...draftData,
        operateType: 0,
        department: userInfo.value.deptInfo.deptId,
        demandModule: 'user_research',
        demandCode: form.demandCode,
        skuCode: form.categoryCode === '0' ? '0' : undefined,
        demandFile:
          form.demandFile && form.demandFile.length > 0
            ? {
                fileCode: form.demandFile[0].fileCode ?? '',
                fileKey: form.demandFile[0].ossKey,
                fileName: form.demandFile[0].name.replace(/\.[^/.]+$/, ''),
                extType: form.demandFile[0].name.split('.').pop() || '',
                fileSize: form.demandFile[0].size || 0,
              }
            : null,
      });
      console.log('saveServerDraft');
    } catch (err) {
      console.warn('服务端草稿保存失败', err);
    }
  }
  const fetchApproveSteps = async () => {
    try {
      const res = await platformApi.platformDemandQueryDemandProcessStep({
        demandModule: 'user_research',
      });
      res.demandProcessStepList?.forEach((item, index) => {
        if ([0, 6, 7].includes(index)) {
          console.log(item, 'item');
          item.operator = userInfo.value?.name;
        }
      });
      approvalSteps.value = res.demandProcessStepList;
      currentStep.value = res.order;
    } catch (e) {
      console.error('加载失败', e);
    } finally {
    }
  };
  const debouncedSaveServerDraft = debounce(() => {
    saveServerDraft();
  }, 1000);
  const debouncedSaveDraft = debounce(() => {
    saveDraft();
    debouncedSaveServerDraft();
  }, 1000);
  function toUploadFileArray(val: any) {
    const normalizeOne = (file: any) => {
      const ossKey = file?.ossKey || file?.fileKey || file?.key || '';
      const rawName = file?.name || file?.fileName || '';
      const ext = file?.extType || (rawName.includes('.') ? rawName.split('.').pop() : '');
      const hasExt = rawName.includes('.');
      const name = hasExt ? rawName : ext ? `${rawName}.${ext}` : rawName;

      return {
        ...file,
        ossKey,
        name,
        fileCode: file?.fileCode || '',
        percentage: file?.percentage ?? 100,
      };
    };

    if (Array.isArray(val)) return val.map(normalizeOne);
    if (val && typeof val === 'object') return [normalizeOne(val)];
    return [];
  }

  const checkServerDraft = async () => {
    const res = await platformApi.platformDemandDetail({ demandModule: 'user_research' });
    if (res !== null) {
      const serverDraft = {
        ...res.userResearch,
        ...res,
      };
      serverDraft.demandFile = toUploadFileArray(serverDraft.demandFile);
      return serverDraft;
    }
    return null;
  };

  async function initFormData() {
    try {
      const cachedData = localStorage.getItem('DEMAND_SUB_KEY');
      const localDraft = cachedData ? JSON.parse(cachedData) : null;
      const localTime = localDraft?._localDraftTime ? dayjs(localDraft._localDraftTime) : null;

      const serverDraft = await checkServerDraft();
      const serverTime = serverDraft?.updateTime ? dayjs(serverDraft.updateTime) : null;
      const serverDemandCode = serverDraft?.demandCode;
      // const redisCache = await platformApi.platformDemandQueryCacheDraftDemand({
      //   demandModule: 'user_research',
      // });
      // const redisTime = redisCache?.updateTime ? dayjs(redisCache.updateTime) : null;

      console.log(
        '[草稿] demandCode detail:',
        serverDemandCode,
        'local:',
        localDraft?.demandCode,
        'redis:'
        // redisCache?.demandCode
      );

      if (localTime && serverTime) {
        if (
          localTime.isAfter(serverTime) &&
          localDraft?.demandCode &&
          serverDemandCode &&
          String(localDraft.demandCode) === String(serverDemandCode)
        ) {
          localDraft.demandFile = toUploadFileArray(localDraft.demandFile);
          Object.assign(form, localDraft);
          console.log('form1', form, localDraft);
          ElMessage.success('已读取草稿');
        } else {
          serverDraft.demandFile = toUploadFileArray(serverDraft.demandFile);
          Object.assign(form, serverDraft);
          ElMessage.success('已读取草稿');
        }
        prepareUserInfo();
        return;
      }

      if (localTime && !serverTime) {
        if (
          localDraft?.demandCode &&
          serverDemandCode &&
          String(localDraft.demandCode) === String(serverDemandCode)
        ) {
          localDraft.demandFile = toUploadFileArray(localDraft.demandFile);
          Object.assign(form, localDraft);
          ElMessage.success('已读取草稿');
        } else {
          localDraft.demandFile = toUploadFileArray(localDraft.demandFile);
          Object.assign(form, localDraft);
          ElMessage.success('已读取草稿');
        }
        prepareUserInfo();
        return;
      }

      // if (redisTime && serverTime) {
      //   if (
      //     redisTime.isAfter(serverTime) &&
      //     redisCache?.demandCode &&
      //     serverDemandCode &&
      //     String(redisCache.demandCode) === String(serverDemandCode)
      //   ) {
      //     redisCache.demandFile = toUploadFileArray(redisCache.demandFile);
      //     Object.assign(form, redisCache);
      //     ElMessage.success('已读取草稿');
      //   } else {
      //     serverDraft.demandFile = toUploadFileArray(serverDraft.demandFile);
      //     Object.assign(form, serverDraft);
      //     ElMessage.success('已读取草稿');
      //   }
      //   prepareUserInfo();
      //   return;
      // }

      // if (redisTime && !serverTime) {
      //   redisCache.demandFile = toUploadFileArray(redisCache.demandFile);
      //   Object.assign(form, redisCache);
      //   ElMessage.success('已读取草稿');
      //   prepareUserInfo();
      //   return;
      // }

      // if (!redisTime && serverTime) {
      serverDraft.demandFile = toUploadFileArray(serverDraft.demandFile);
      Object.assign(form, serverDraft);
      ElMessage.success('已读取草稿');
      prepareUserInfo();
      return;
    } catch (error) {
      console.error('初始化表单数据失败:', error);
      prepareUserInfo();
    }
  }

  const currentStep = ref('1');
  const approvalSteps = ref([]);

  onMounted(async () => {
    initFormData();
    fetchIsProductCenter();
    fetchApproveSteps();
  });

  const prepareUserInfo = () => {
    const deptInfo = userInfo.value?.deptInfo || {};
    form.creator = userInfo.value?.memberCode || '';
    const parentName = deptInfo.parentName || '';
    const deptName = deptInfo.deptName || '';
    const deptDisplay = parentName && deptName ? `${parentName} - > ${deptName}` : '-';
    form.deptNameStr = deptDisplay;
  };
  prepareUserInfo();

  function saveDraft() {
    const draftData = {
      ...form,
      creator: undefined,
      department: undefined,
      deptNameStr: undefined,
      _localDraftTime: dayjs().format('YYYY-MM-DD HH:mm:ss'),
    };
    console.log(draftData, 'draftData');
    localStorage.setItem('DEMAND_SUB_KEY', JSON.stringify(toRaw(draftData)));
  }

  function clearDraft() {
    localStorage.removeItem('DEMAND_SUB_KEY');
  }
  watch(
    () => form,
    () => {
      const hasContent = Object.entries(form).some(([key, value]) => {
        if (key === 'creator' || key === 'department' || key === 'deptNameStr') return false;
        if (Array.isArray(value)) return value.length > 0;
        return !!value;
      });

      if (hasContent) {
        console.log('hasContent');
        debouncedSaveDraft();
      }
    },
    { deep: 1 }
  );
  const isProductCenter = ref(true);
  const rules = reactive({
    productLevel: [{ required: true, message: '请选择产品定级', trigger: 'blur' }],
    demandProperty: [{ required: true, message: '请选择需求属性', trigger: 'blur' }],
    productLine: [{ required: true, message: '请选择产品品线', trigger: 'blur' }],
    categoryCode: [{ required: true, message: '请选择产品分类', trigger: 'blur' }],
    demandTitle: [{ required: true, message: '请输入需求标题', trigger: 'blur' }],
    demandDesc: [{ required: true, message: '请输入需求描述', trigger: 'blur' }],
    demandBackground: [{ required: true, message: '请输入需求背景', trigger: 'blur' }],
    demandType: [{ required: true, message: '请选择需求类型', trigger: 'blur' }],
    sampleDeliveryTime: [{ required: true, message: '请选择预计发样时间', trigger: 'blur' }],
  });
  const fetchIsProductCenter = async () => {
    const res = await platformApi.platformDemandIsProductCenterDept();
    isProductCenter.value = Boolean(res.productCenterDeptFlag ?? true);
    rules.categoryCode[0].required = isProductCenter.value;
    rules.productLine[0].required = isProductCenter.value;
  };

  const submitForm = async (isDraft = false) => {
    console.log(isDraft, 'isDraft');
    submitLoading.value = true;
    try {
      if (!(await demandDetailFormRef.value.formRef.validate())) return;
      const payload = {
        ...form,
        operateType: isDraft ? 0 : 1,
        department: userInfo.value.deptInfo.deptId,
        demandModule: 'user_research',
        demandCode: form.demandCode,
        skuCode: form.categoryCode === '0' ? '0' : undefined,
        demandFile:
          form.demandFile && form.demandFile.length > 0
            ? {
                fileCode: form.demandFile[0].fileCode ?? '',
                fileKey: form.demandFile[0].ossKey,
                fileName: form.demandFile[0].name.replace(/\.[^/.]+$/, ''),
                extType: form.demandFile[0].name.split('.').pop() || '',
                fileSize: form.demandFile[0].size || 0,
              }
            : null,
      };

      const { demandCode, unScoreNum } = await platformApi.platformDemandSave(payload);

      if (isDraft && demandCode) {
        form.demandCode = demandCode;
        console.log(form.demandCode, 'form.demandCode写入了');
        saveDraft();
      }
      console.log(demandCode, 'demandCode');
      console.log(unScoreNum, 'unScoreNum');
      if (unScoreNum > 0 && !isDraft) {
        const result = await createDrawer({
          title: '请评分后再提交需求',
          subTitle: '温馨提示：您填写的需求内容已保存；评分后回到本页面即可继续提交需求',
          content: `
        <div class="d-flex align-items-center justify-content-center">
          <span style="margin-right:12px;">
            <svg width="32" height="32" viewBox="0 0 32 32">
              <circle cx="16" cy="16" r="16" fill="#faad14"/>
              <text x="16" y="23" text-anchor="middle" font-size="22" fill="#fff" font-family="Arial" font-weight="bold">!</text>
            </svg>
          </span>
          <span>
            <div>您有未完成评价的需求（共${unScoreNum}个）</div>
            <div>请先完成历史需求评价，再创建新需求</div>
          </span>
        </div>
      `,
          confirmButtonText: '去评分',
          cancelButtonText: '取消',
        });
        if (result === 'confirm') {
          router.push({
            name: 'demandSubmitMyDemand',
            query: { tab: 'waitForReceipt', from: 'submit' },
          });
          return;
        }
      } else {
        if (!isDraft) {
          clearDraft();
          demandDetailFormRef.value.formRef.resetFields();
          form.relMemberCodeList = [];
          form.demandFile = [];
          form.productLine = '';
          form.demandCode = '';
          const result = await createDrawer({
            title: '需求提交成功',
            content: '<div style="text-align:center;">需求提交成功，可查看需求或继续提交</div>',
            confirmButtonText: '查看需求',
            cancelButtonText: '继续提交',
          });
          if (result === 'confirm') {
            router.push({
              name: 'demandSubmitMyDemand',
              query: { tab: 'reviewing', from: 'submit' },
            });
          }
        } else {
          ElMessage.success('草稿已保存至当前提交页面，下次进入后自动带出');
          clearDraft();
        }
      }
    } catch (error) {
      if ((error as any).code === '10005706') {
        clearDraft();
        demandDetailFormRef.value.formRef.resetFields();
        form.relMemberCodeList = [];
        form.demandFile = [];
        form.productLine = '';
        form.demandCode = '';
      }
      submitLoading.value = false;
      console.error('Error submitting demand:', e);
    } finally {
      submitLoading.value = false;
    }
  };
</script>

<style scoped></style>
