<template>
  <div v-loading="preparing" class="demand-submit-create">
    <ApprovalProcess :active-index="currentStep" :steps-list="approvalSteps" />
    <DemandDetailForm
      ref="demandDetailFormRef"
      :form="form"
      :rules="rules"
      :submitForm="submitForm"
      mode="create"
      :submitLoading="submitLoading"
      :submitDemandLoading="submitLoading && activeCreateAction === 'submit'"
      :submitDraftLoading="submitLoading && activeCreateAction === 'draft'"
      :createActionGroupLoading="submitLoading"
      @saveForm="submitForm(true)"
    />
    <SurveyFeedback />
  </div>
</template>

<script lang="ts" setup name="demandSubmitCreate">
  import { useDebounceFn } from '@vueuse/core';
  import { ElMessage } from 'element-plus';
  import DemandDetailForm from '../components/DemandDetailTab.vue';
  import { createDrawer } from '../components/drawerModalFunc';
  import { useStore } from '@/store/modules/useStore';
  import { storeToRefs } from 'pinia';
  import { platformApi, productApi } from '@/api';
  import { useRouter } from 'vue-router';
  import SurveyFeedback from '../components/SurveyFeedback.vue';
  import ApprovalProcess from '@/views/lute-os/demandManage_5.0/modules/common/ApproveStepsV5.vue';
  import { useDemandBaseInfoStore } from '../../stores/useDemandBaseInfoStore';
  import { useApiLoadingGroup } from '../../hooks/useApiLoadingGroup';
  import dayjs from 'dayjs';
  const router = useRouter();
  const userInfoStore = useStore();
  const { userInfo } = storeToRefs(userInfoStore);
  const demandBaseInfoStore = useDemandBaseInfoStore();
  const { isLoading, runWithLoading } = useApiLoadingGroup();
  const activeCreateAction = ref('');
  const draftStoragePrefix = 'DEMAND_SUB_KEY';
  const draftStorageKey = computed(() => {
    const memberCode = String(userInfo.value?.memberCode || '').trim();
    return memberCode ? `${draftStoragePrefix}_${memberCode}` : draftStoragePrefix;
  });
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
  const submitLoading = computed(() => isLoading('saveDemand'));
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
  const debouncedSaveServerDraft = useDebounceFn(() => {
    saveServerDraft();
  }, 1000);
  const debouncedSaveDraft = useDebounceFn(() => {
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

  const getLocalDraft = () => {
    const cachedData = localStorage.getItem(draftStorageKey.value);
    if (!cachedData) return null;
    return JSON.parse(cachedData);
  };

  const normalizeDraft = (draft: any) => {
    if (!draft) return null;
    return {
      ...draft,
      demandFile: toUploadFileArray(draft.demandFile),
    };
  };

  const canCompareDemandCode = (localDraft: any, serverDraft: any) =>
    Boolean(localDraft?.demandCode && serverDraft?.demandCode);

  const shouldUseLocalDraft = (localDraft: any, serverDraft: any) => {
    const localTime = localDraft?._localDraftTime ? dayjs(localDraft._localDraftTime) : null;
    const serverTime = serverDraft?.updateTime ? dayjs(serverDraft.updateTime) : null;
    if (!localTime) return false;
    if (!serverTime) return true;

    if (!canCompareDemandCode(localDraft, serverDraft)) return false;
    const isSameDemandCode = String(localDraft.demandCode) === String(serverDraft.demandCode);
    return isSameDemandCode && localTime.isAfter(serverTime);
  };

  const applyDraftToForm = (draft: any, showMessage = true) => {
    const normalizedDraft = normalizeDraft(draft);
    if (!normalizedDraft) return;
    Object.assign(form, normalizedDraft);
    if (showMessage) {
      ElMessage.success('已读取草稿');
    }
  };

  async function initFormData() {
    prepareUserInfo();
    let localDraft: any = null;
    let hasShownDraftMessage = false;
    try {
      localDraft = getLocalDraft();
      if (localDraft) {
        applyDraftToForm(localDraft, true);
        hasShownDraftMessage = true;
      }
    } catch (error) {
      console.error('读取本地草稿失败:', error);
    }

    try {
      const serverDraft = await checkServerDraft();
      if (!serverDraft && !localDraft) return;
      if (!serverDraft && localDraft) return;
      if (!localDraft && serverDraft) {
        applyDraftToForm(serverDraft, !hasShownDraftMessage);
        return;
      }

      if (!shouldUseLocalDraft(localDraft, serverDraft)) {
        applyDraftToForm(serverDraft, !hasShownDraftMessage);
      }
    } catch (error) {
      console.error('初始化表单数据失败:', error);
    } finally {
      prepareUserInfo();
    }
  }

  const currentStep = ref('1');
  const approvalSteps = ref([]);
  const preparing = ref(true);

  onMounted(() => {
    Promise.allSettled([prepareBaseInfo(), initFormData(), fetchApproveSteps()]).finally(() => {
      preparing.value = false;
    });
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
    localStorage.setItem(draftStorageKey.value, JSON.stringify(toRaw(draftData)));
  }

  function clearDraft() {
    localStorage.removeItem(draftStorageKey.value);
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
  const applyProductCenterRules = (flag: boolean) => {
    isProductCenter.value = flag;
    rules.categoryCode[0].required = flag;
    rules.productLine[0].required = flag;
  };
  const prepareBaseInfo = async () => {
    await demandBaseInfoStore.ensureBaseInfo();
    applyProductCenterRules(demandBaseInfoStore.isProductCenter);
  };

  const submitForm = async (isDraft = false) => {
    console.log(isDraft, 'isDraft');
    activeCreateAction.value = isDraft ? 'draft' : 'submit';
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

      const { demandCode, unScoreNum } = await runWithLoading('saveDemand', () =>
        platformApi.platformDemandSave(payload)
      );

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
            name: 'demandSubmitList',
            query: { view: 'list', workTab: 'list', bizTab: 'todo', from: 'submit' },
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
            width: '440px',
            content: '<div style="text-align:center;">需求提交成功，可查看需求或继续提交</div>',
            confirmButtonText: '查看需求',
            cancelButtonText: '继续提交',
          });
          if (result === 'confirm') {
            router.push({
              name: 'demandSubmitList',
              query: { view: 'list', workTab: 'list', bizTab: 'mine', from: 'submit' },
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
      console.error('Error submitting demand:', error);
    } finally {
      activeCreateAction.value = '';
    }
  };
</script>

<style scoped>
  .demand-submit-create {
    min-height: 300px;
  }
</style>
