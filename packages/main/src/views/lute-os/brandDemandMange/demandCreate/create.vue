<template>
  <KeenCard title="需求提交">
    <Steps :active-index="currentStep" :steps-list="approvalSteps" />
    <DemandDetailForm
      ref="demandDetailFormRef"
      :form="form"
      :rules="scene === 'media_resource' ? mediaRules : expertRules"
      :submitForm="submitForm"
      mode="create"
      :submitLoading="submitLoading"
      :resourceMatch="resourceMatch"
      :categoryList="categoryList"
      :productCategoryList="productCategoryList"
      :brandCodeList="brandCodeList"
      :scene="scene"
      handleDownloadTemplate
      :expert-list="expertList"
      @query-demand-contact-department="queryDemandContactDepartment"
      @download-template="handleDownloadTemplate"
    />
  </KeenCard>
  <ResourceMatchDialog
    v-model:visible="resourceMatchDialogVisible"
    :table-data="mediaList"
    :row-key="rowKey"
    :initialSelectionKeys="selectedMediaNameList"
    :page-num="pageNum"
    :page-size="pageSize"
    :total="total"
    @page-change="handlePageChange"
    @size-change="handlePageSizeChange"
    @select="handleConfirmSelection"
  >
    <!-- 1. 头部内容通过 #header 插槽传入 -->
    <template #header>
      <div>
        <div style="font-weight: bold; font-size: 20px">选择意向资源</div>
        <div style="font-size: 14px; color: #666; margin-top: 4px">
          <span>{{ sceneDescription() }}</span>
          <div class="desc" v-if="scene === 'media_resource'">
            媒体资源多维表链接，
            <a :href="linkUrl" target="_blank" class="short-link" :title="linkUrl">点击链接</a>
            查看全部资源
          </div>
        </div>
      </div>
    </template>

    <!-- 2. 所有的表格列定义通过默认插槽传入 -->
    <template #default>
      <el-table-column
        v-for="column in activeColumns"
        :key="column.prop"
        :prop="column.prop"
        :label="column.label"
        :width="column.width"
        :align="column.align || 'center'"
        :fixed="column.fixed"
      >
        <!-- 使用一个具名插槽来处理所有需要自定义渲染的列 -->
        <template #default="{ row }">
          <!-- 如果列配置中指定了 slotName，则渲染对应的自定义内容 -->
          <div v-if="column.slotName === 'mediaName'">
            <div style="padding: 10px">
              <el-tag type="primary" size="small">{{ row.mediaName }}</el-tag>
            </div>
          </div>

          <div v-else-if="column.slotName === 'website' || column.slotName === 'webSite'">
            <a :href="row[column.slotName]" target="_blank" class="short-link">
              {{ row[column.slotName] }}
            </a>
          </div>

          <div v-else-if="column.slotName === 'socialMedia'">
            <a :href="row[column.prop]" target="_blank" class="short-link">
              {{ row[column.prop] }}
            </a>
          </div>

          <div v-else-if="column.slotName === 'mediaArea'">
            <el-tag type="info" size="small">{{ row.mediaArea }}</el-tag>
          </div>

          <div v-else-if="column.slotName === 'mediaCategory'">
            <el-tag size="small">
              {{ row.mediaCategoryDesc }}
            </el-tag>
          </div>

          <div v-else-if="column.slotName === 'mediaType'">
            <el-tag type="warning" size="small" v-if="row.mediaTypeDesc">
              {{ row.mediaTypeDesc }}
            </el-tag>
            <el-tag type="info" size="small" v-else>暂无</el-tag>
          </div>

          <div v-else-if="column.slotName === 'mediaVoice'">
            <el-tag type="primary" size="small">{{ row.mediaVoice }}</el-tag>
          </div>

          <div v-else-if="column.slotName === 'mediaWeight'">
            <el-tag type="danger" size="small" v-if="row.mediaWeight">{{ row.mediaWeight }}</el-tag>
            <el-tag type="info" size="small" v-else>暂无</el-tag>
          </div>
          <div v-else-if="column.slotName === 'orgLogo'">
            <el-avatar
              shape="square"
              :size="50"
              fit="cover"
              :src="row.orgLogo"
              v-if="row.orgLogo"
            />
          </div>
          <!-- 对于没有 slotName 的列，显示默认值 -->
          <span v-else>{{ row[column.prop] }}</span>
        </template>
      </el-table-column>
    </template>
  </ResourceMatchDialog>
  <SurveyFeedback />
</template>

<script lang="ts" setup name="brandDemandSubmitCreate">
  import { ElMessage } from 'element-plus';
  import DemandDetailForm from '@/views/lute-os/brandDemandMange/components/DemandDetailTab.vue';
  import { createDrawer } from '@/views/lute-os/demandManage/components/drawerModalFunc';
  import { useStore } from '@/store/modules/useStore';
  import { storeToRefs } from 'pinia';
  import { platformApi, productApi, memberApi } from '@/api';
  import { useRouter } from 'vue-router';
  import SurveyFeedback from '@/views/lute-os/demandManage/components/SurveyFeedback.vue';
  import ResourceMatchDialog from '@/views/lute-os/brandDemandMange/components/ResourceMatchDialog.vue';
  import Steps from '@/views/lute-os/brandDemandMange/components/Steps.vue';
  import { ApprovalStep, approvalStepsInitial, getNameKeyByScene, resourceOptionsType } from '../constants';
  import { MediaCategoryMap, MediaTypeColorMap } from '../constants';
  import {
    columnConfigurations,
    helpers,
  } from '@/views/lute-os/brandDemandMange/components/columnConfig.jsx';
  import { omit } from 'lodash-es';
  import { urlDownload } from '@/utils/download';
  import { ChooseBean } from '@/api/platform/data-contracts';

  const router = useRouter();
  const userInfoStore = useStore();
  const { userInfo } = storeToRefs(userInfoStore);
  const demandDetailFormRef = ref();
  const resourceMatchDialogRef = ref();
  const resourceMatchDialogVisible = ref(false);
  const nameKeyByScene = {
    media_resource: 'mediaName',
    expert_resource: 'expertName',
    institution_resource: 'orgName',
  } as const;
  const scene = computed(() => router.currentRoute.value.query.type || '') as ComputedRef<string>;

  const form = reactive({
    creator: '',
    department: '',
    deptNameStr: '',
    demandTypeList: [],
    sampleDeliveryTime: [],
    relMemberCodeList: ['M16931842146103167'],
    demandTitle: '',
    demandBackground: '',
    demandContent: '',
    demandContact: '',
    demandDesc: '',
    expectFinishTime: '',
    demandFile: [] as any[],
    productNameList: [],
    demandCode: '',
    resourceType: scene.value,
    cooperationType: '',
    cooperationTypeList: [],
    countryCode: '',
    mediaCategoryList: [],
    estimatedBudget: '',
    budgetUnit: '【单位：USD】',
    currencyCode: '',
    brandCodeList: scene.value === 'media_resource' ? [] : '',
    productOnlineTime: [],
    demandProperty: '',
    demandModule: 'brand_research',
    intentionResource: '',
    productName: '',
    expectedCooperationDate: [],
    cooperationPeriodDate: [],
    contactDeptId: '',
    contactDeptName: '',
    mainProductLink: '',
    categoryCode: '',
    cooperationDesc: '',
    expertTypeList: [], //专家类型
    orgTypeList: [], //机构类型
  });
  const categoryList = ref<ChooseBean[]>([]);
  const submitLoading = ref(false);
  const linkUrl = `https://alidocs.dingtalk.com/i/nodes/7NkDwLng8ZK644BNCL5GQdE7WKMEvZBY?corpId=ding1a1c6d46f33cfeb735c2f4657eb6378f&utm_medium=im_card&sideCollapsed=true&iframeQuery=viewId%3DfHMld5q%26utm_medium%3Dim_card%26sheetId%3D1mtYdK4%26utm_source%3Dim&utm_scene=person_space&utm_source=im`;
  onMounted(async () => {
    const res = await platformApi.platformDemandQueryProductCnName();
    if (res.productList) {
      categoryList.value = res.productList;
    }
  });
  onActivated(async () => {});
  const mediaList = ref<any[]>([]); // 3. 新增 state，用于存储从API获取的表格数据
  const pageNum = ref(1);
  const pageSize = ref(10);
  const total = ref(0);
  //获取指定键
  const getNameKey = ()=>
    nameKeyByScene[scene.value as keyof typeof nameKeyByScene] ?? 'expertName'
  
  // const getNameKey = () => nameKeyByScene[scene.value as keyof typeof nameKeyByScene] ?? 'expertName';
  const rowKey = computed(
    () => nameKeyByScene[scene.value as keyof typeof nameKeyByScene] ?? 'expertName'
  );
  // 提取公共的"资源未匹配到"弹窗逻辑
  const showNoResourceDialog = async () => {
    await createDrawer({
      title: '资源未匹配到',
      content: `
        <div class="d-flex align-items-center justify-content-center">
          <span style="margin-right:12px;">
            <svg width="32" height="32" viewBox="0 0 32 32">
              <circle cx="16" cy="16" r="16" fill="#faad14"/>
              <text x="16" y="23" text-anchor="middle" font-size="22" fill="#fff" font-family="Arial" font-weight="bold">!</text>
            </svg>
          </span>
          <span>
            <div>当前资源池中没有符合您要求的资源；当提交需求审批通过后，我们会考虑是否进行资源开发</div>
          </span>
        </div>
      `,
      confirmButtonText: '好的',
      cancelButtonText: '取消',
    });
  };

  const resourceMatch = async () => {
    // 必选投放国家和媒体分类，负责触发校验
    if (scene.value === 'media_resource') {
      if (!form.countryCode || !form.mediaCategoryList || form.mediaCategoryList.length === 0) {
        demandDetailFormRef.value.formRef.clearValidate();
        demandDetailFormRef.value.formRef.validateField('countryCode');
        demandDetailFormRef.value.formRef.validateField('mediaCategoryList');
        return;
      }
      try {
        const res = await platformApi.platformDemandMediaList({
          pageNum: pageNum.value,
          pageSize: pageSize.value,
          country: form.countryCode,
          mediaCategoryList: Array.isArray(form.mediaCategoryList)
            ? form.mediaCategoryList.join(',')
            : form.mediaCategoryList,
          // mediaNameList: selectedMediaNameList.value.join(',') ?? undefined,
        });
        total.value = res?.total || 0;
        if (!res?.mediaList?.length) {
          await showNoResourceDialog();
        } else {
          mediaList.value = res.mediaList; // 将数据存入 state
          resourceMatchDialogVisible.value = true; // 直接控制 v-model 显示对话框
        }
      } catch (error) {
        ElMessage.error('获取资源匹配数据失败');
      }
    } else if (scene.value === 'expert_resource' || scene.value === 'institution_resource') {
      if (scene.value === 'expert_resource') {
        try {
          const res = await platformApi.platformDemandExpertList({
            pageNum: pageNum.value,
            pageSize: pageSize.value,
          });
          total.value = res?.total || 0;
          if (!res?.expertList?.length) {
            await showNoResourceDialog();
          } else {
            mediaList.value = res.expertList; // 将数据存入 state
            resourceMatchDialogVisible.value = true;
          }
        } catch (error) {
          ElMessage.error('获取资源匹配数据失败');
        }
      } else {
        try {
          const res = await platformApi.platformDemandAgencyList({
            pageNum: pageNum.value,
            pageSize: pageSize.value,
          });
          total.value = res?.total || 0;
          if (!res?.agencyList?.length) {
            await showNoResourceDialog();
          } else {
            mediaList.value = res.agencyList; // 将数据存入 state
            resourceMatchDialogVisible.value = true;
          }
        } catch (error) {
          ElMessage.error('获取资源匹配数据失败');
        }
      }
    }
  };
  const sceneDescription = () => {
    if (scene.value === 'media_resource') {
      return '按照您的选项内容，以下媒体符合您的诉求，可以选择您的意向合作媒体，我们将会优先考虑这与些媒体进行合作。可多选，最多选择10个';
    } else if(scene.value === 'expert_resource'){
      return '您选择的专家资源会进入到专家合作表后续对应同事会洽谈专家合作事宜，可多选，最多选择10个';
    } else if(scene.value === 'institution_resource'){
      return '您选择的机构资源会进入到机构合作表后续对应同事会洽谈机构合作事宜，可多选，最多选择10个'
    }
  };
  const currentStep = ref('1');
  const approvalSteps = computed(() => {
    approvalStepsInitial.forEach((item, index) => {
      if ([0, 4].includes(index)) {
        item.operatorDesc = userInfo.value?.name;
        item.status = index === 0 ? 'in_progress' : 'pending';
      }
    });
    return approvalStepsInitial;
  }) as ComputedRef<ApprovalStep[]>;
  const prepareUserInfo = () => {
    form.creator = userInfo.value.memberCode;
    const { parentName, deptName } = userInfo.value.deptInfo;
    form.deptNameStr = `${parentName} - > ${deptName}`;
  };
  prepareUserInfo();
  // const getMediaCategoryColor = (mediaCategoryDesc) => {
  //   // 根据描述找到对应的 key
  //   const mediaTypeKey = Object.keys(MediaCategoryMap).find(
  //     (key) => MediaCategoryMap[key] === mediaCategoryDesc
  //   );
  //   return mediaTypeKey ? MediaTypeColorMap[mediaTypeKey] : '#e7f9fd'; // 默认颜色
  // };
  const mediaRules = {
    productNameList: [{ required: true, message: '请选择推广产品', trigger: 'blur' }],
    demandTitle: [{ required: true, message: '请输入需求标题', trigger: 'blur' }],
    demandDesc: [{ required: true, message: '请输入需求描述', trigger: 'blur' }],
    demandContent: [{ required: true, message: '请输入需求内容', trigger: 'blur' }],
    demandBackground: [{ required: true, message: '请输入需求背景', trigger: 'blur' }],
    demandTypeList: [{ required: true, message: '请选择需求类型', trigger: 'blur' }],
    sampleDeliveryTime: [{ required: true, message: '请选择预计发样时间', trigger: 'blur' }],
    countryCode: [{ required: true, message: '请选择投放国家', trigger: 'change' }],
    mediaCategoryList: [{ required: true, message: '请选择媒体分类', trigger: 'change' }],
    cooperationTypeList: [{ required: true, message: '请选择合作类型', trigger: 'blur' }],
    estimatedBudget: [{ required: true, message: '请输入预估预算', trigger: 'blur' }],
    productOnlineTime: [{ required: true, message: '请选择产品上市时间', trigger: 'blur' }],
    expectFinishTime: [{ required: true, message: '请选择期望完成时间', trigger: 'blur' }],
  };
  const expertRules = {
    demandTitle: [{ required: true, message: '请输入需求标题', trigger: 'blur' }],
    demandBackground: [{ required: true, message: '请输入需求背景', trigger: 'blur' }],
    estimatedBudget: [
      { required: true, message: '请输入预估预算', trigger: 'blur' },
      {
        validator(_, value, callback) {
          // 只有当填写了预算且币种为空时报错
          if (value && !form.currencyCode) {
            return callback(new Error('请选择币种'));
          }
          callback();
        },
        trigger: ['blur','change'], // 或 'change' 看需求
      },
    ],
    demandContact: [{ required: true, message: '请选择需求对接人', trigger: ['blur','change'] }],
    demandContent: [{ required: true, message: '请输入需求内容', trigger: 'blur' }],
    cooperationDesc: [{ required: true, message: '请输入合作类型', trigger: 'blur' }],
  };

  const submitForm = async () => {
    const expert_req =
      scene.value === 'expert_resource' || scene.value === 'institution_resource'
        ? {
            demandContact: form.demandContact,
            mainProductLink: form.mainProductLink,
            categoryCode: form.categoryCode,
            estimatedBudget: form.estimatedBudget,
            demandContent: form.demandContent,
            countryCode: form.countryCode,
            expectedCooperationStartDate: form.expectedCooperationDate[0] ?? '',
            expectedCooperationEndDate: form.expectedCooperationDate[1] ?? '',
            cooperationPeriodStartDate: form.cooperationPeriodDate[0] ?? '',
            cooperationPeriodEndDate: form.cooperationPeriodDate[1] ?? '',
            cooperationType: form.cooperationType,

            cooperationDesc: form.cooperationDesc,
            brandCodeList: [form.brandCodeList],
            resourceType: scene.value,
            contactDeptId: form.contactDeptId,
            contactDeptName: form.contactDeptName,
            currencyCode: form.currencyCode,
            relMemberCodeList: undefined,
            ...(scene.value === 'expert_resource'
              ? { expertTypeList: form.expertTypeList }
              : { orgTypeList: form.orgTypeList }),
          }
        : {};
    console.log(form, 'form');
    console.log(expert_req, 'expert_req');
    if (!(await demandDetailFormRef.value.formRef.validate())) return;
    try {
      submitLoading.value = true;

      const payload = {
        ...omit(form, [
          'demandFile',
          'brandCodeList',
          'categoryCode',
          'cooperationTypeList',
          'estimatedBudget',
          'intentionResource',
          'countryCode',
          'mediaCategoryList',
          'productOnlineTime',
          'sampleDeliveryTime',
          'demandTypeList',
          'budgetUnit',
          'demandContent',
        ]),
        department: userInfo.value.deptInfo.deptId,
        demandModule: 'brand_research',
        demandCode: form.demandCode ? form.demandCode : undefined,
        demandFileList: form.demandFile.map((item) => ({
          fileCode: item.fileCode,
          fileKey: item.ossKey,
          fileName: item.name,
          extType: item.name.split('.').pop() || '',
          fileSize: item.size || 0,
        })),
        brandReq: {
          brandCodeList: form.brandCodeList ?? undefined,
          demandTypeList: form.demandTypeList.map((item) => item.demandType),
          demandContent: form.demandContent,
          categoryCode: form.categoryCode,
          cooperationTypeList: form.cooperationTypeList.map((item) => item.cooperationType),
          estimatedBudget: form.estimatedBudget,
          intentionResource: form.intentionResource.split('; ') || '',
          countryCode: form.countryCode,
          mediaCategoryList: form.mediaCategoryList,
          productOnlineTimeStart: form.productOnlineTime[0],
          productOnlineTimeEnd: form.productOnlineTime[1],
          sampleDeliveryTimeStart: form.sampleDeliveryTime[0],
          sampleDeliveryTimeEnd: form.sampleDeliveryTime[1],
          resourceType: scene.value,
          productNameList: Array.isArray(form.productNameList)
            ? form.productNameList.map((code) => {
                const prod = categoryList.value.find((item) => item.productCode === code);
                return prod?.productTitle || code;
              })
            : [],
          ...expert_req,
        },
      };
      await platformApi.platformDemandSave(payload);
      demandDetailFormRef.value.formRef.resetFields();
      form.relMemberCodeList = ['M16931842146103167'];
      form.currencyCode = ''
      form.demandFile = [];
      form.intentionResource = '';
      selectedMediaNameList.value = [];
      form.productLine = '';
      const result = await createDrawer({
        title: '需求提交成功',
        content: '<div style="text-align:center;">需求提交成功，可查看需求或继续提交</div>',
        confirmButtonText: '查看需求',
        cancelButtonText: '继续提交',
      });
      if (result === 'confirm') {
        router.push({
          name: 'brandDemandMy',
          query: { tab: 'reviewing', from: 'submit' },
        });
      }
    } catch (e) {
      submitLoading.value = false;
      console.error('Error submitting demand:', e);
    } finally {
      submitLoading.value = false;
    }
  };
  //拼接字段
  const resetFormState = () => {
    // 重置 Element Plus 表单
    demandDetailFormRef.value.formRef.resetFields();

    // 重置响应式 form 对象中的特定字段
    if (scene.value === 'media_resource') {
      form.relMemberCodeList = ['M16931842146103167'];
    }
    form.demandFile = [];
    form.intentionResource = '';
    // 重置意向媒体列表
    selectedMediaNameList.value = [];
  };
  const handleDownloadTemplate = async () => {
    try {
      const res = await platformApi.platformDemandDownloadBriefTemplate();
      if (!res) return ElMessage.error('下载失败, url为空');
      urlDownload(res as string);
      ElMessage.success('模板已下载');
    } catch (error) {
      console.error('Error downloading template:', error);
    }
  };
  const selectedMediaNameList = ref([]);
  const activeColumns = computed(() => {
    return columnConfigurations[scene.value] || []; // 如果 scene 无效，返回空数组
  });
  const handleConfirmSelection = (selectedResources) => {
    resourceMatchDialogVisible.value = false;
    const namekey = getNameKeyByScene(scene.value)
    // form.intentionResource = selectedResources
    //   .map((item) => (scene.value === 'media_resource' ? item.mediaName : item.expertName))
    //   .join('; ');
    const names = selectedResources.map((item)=>(
      item?.[namekey]
    ))
    form.intentionResource = names.join('; ');
    selectedMediaNameList.value = names;
    // selectedMediaNameList.value = selectedResources.map((item) =>
    //   scene.value === 'media_resource' ? item.mediaName : item.expertName
    // );
  };
  const handlePageChange = (page) => {
    pageNum.value = page;
    resourceMatch();
  };
  const handlePageSizeChange = (size) => {
    pageSize.value = size;
    resourceMatch();
  };
  onBeforeRouteLeave(() => {
    scene.value = '';
  });
  const expertList = ref<any[]>([]);
  const productCategoryList = ref<any[]>([]);
  const brandCodeList = ref<any[]>([]);
  const queryDemandContactDepartment = async (memberCode) => {
    if (!memberCode) {
      form.contactDeptId = '';
      form.contactDeptName = '';
      return;
    }
    const res = await memberApi.luteosMemberQueryMemberDetail({
      memberCode,
    });
    form.contactDeptId = res.deptInfo?.deptId;
    form.contactDeptName = res.deptInfo?.parentName + ' - > ' + res.deptInfo?.deptName;
  };
  const getExpertList = async () => {
    const res = await platformApi.platformDemandQueryExpertTypeList({
      scene: resourceOptionsType[scene.value],
    });
    expertList.value = res as any;
  };
  const getProductCategoryList = async () => {
    const res = await productApi.luteosProductAttrQueryCategoryLevelList({
      pageNum: 1,
      pageSize: 100,
    });
    productCategoryList.value = res.categoryLevelBeanList || [];
  };
  const getBrandCodeList = async () => {
    const res = await productApi.luteosProductBrandQueryBrandList({
      pageNum: 1,
      pageSize: 100,
    });
    brandCodeList.value = res.brandBeanList || [];
  };
  if (scene.value === 'expert_resource' || scene.value === 'institution_resource') {
    getExpertList();
    getProductCategoryList();
    getBrandCodeList();
  }

  watch(
    () => scene.value,
    () => {
      // 重置表单
      resetFormState();
    }
  );
</script>

<style scoped>
  :deep(.card-body) {
    padding-bottom: 50px;
  }

  .desc {
    font-size: 14px;
    color: #666;
    line-height: 1.6;
    a.short-link {
      color: #02b96b;
      text-decoration: underline;
      cursor: pointer;
      font-weight: 500;
      margin: 0 2px;
      transition: color 0.2s;
    }
    a.short-link:hover {
      color: #02663b;
    }
  }
</style>
