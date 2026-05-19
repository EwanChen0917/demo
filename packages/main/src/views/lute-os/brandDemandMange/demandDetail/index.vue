<template>
  <KeenCard v-loading="pageLoading">
    <el-tabs v-model="activeTab">
      <el-tab-pane label="执行详情" name="executeDetail" v-if="executeDetailModeDisplay">
        <ExecuteDetailTab
          v-model:demandDetail="demandDetail"
          @success="backToList"
          :isEditMode="isEditMode"
          :loading="loading"
          :userInfo="userInfo"
        />
      </el-tab-pane>
      <el-tab-pane name="demandDetailResubmit" label="重新提交" v-if="resubmitMode">
        <Steps :active-index="currentStep" :steps-list="approvalSteps" />
        <DemandDetailTab
          mode="resubmit"
          :rules="scene === 'media_resource' ? mediaRules : expertRules"
          ref="demandResubmitTabRef"
          v-model:form="demandDetail"
          :userInfo="userInfo"
          @success="backToList"
          @resubmit="handleResubmit"
          @query-demand-contact-department="queryDemandContactDepartment"
          :cancelForm="handleCancelForm"
          :loading="btnLoading.resubmit"
          :resourceMatch="resourceMatch"
          :categoryList="categoryList"
          :productCategoryList="productCategoryList"
          :brandCodeList="brandCodeList"
          :expertList="expertList"
          :scene="scene"
        />
      </el-tab-pane>
      <el-tab-pane name="demandDetail" label="需求详情" v-else>
        <Steps :active-index="currentStep" :steps-list="approvalSteps" />
        <DemandDetailTab
          mode="view"
          :isEditMode="isEditMode"
          v-model:form="demandDetail"
          :userInfo="userInfo"
          @passDemand="handlePassDemand"
          @rejectDemand="handleRejectDemand"
          :cancelForm="handleCancelForm"
          :passDemandLoading="btnLoading.pass"
          :resourceMatch="resourceMatch"
          :scene="scene"
          :expertList="expertList"
          :productCategoryList="productCategoryList"
          :brandCodeList="brandCodeList"
          :categoryList="categoryList"
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
  <ResourceMatchDialog
    v-model:visible="resourceMatchDialogVisible"
    :table-data="mediaList"
    mode="view"
    :row-key="scene === 'media_resource' ? 'mediaName' : 'expertName'"
    :initialSelectionKeys="selectedMediaNameList"
    :page-num="mediaPageNum"
    :page-size="mediaPageSize"
    :total="mediaTotal"
    @page-change="handleMediaPageChange"
    @size-change="handleMediaPageSizeChange"
    @select="handleConfirmSelection"
  >
    <!-- 1. 头部内容通过 #header 插槽传入 -->
    <template #header>
      <div>
        <div style="font-weight: bold; font-size: 20px">意向资源</div>
        <div style="font-size: 14px; color: #666; margin-top: 4px">
          <div class="desc" v-if="scene === 'media_resource'">
            媒体资源多维表链接，
            <a :href="linkUrl" target="_blank" class="short-link" :title="linkUrl">点击链接</a>
            查看全部资源
          </div>
        </div>
      </div>
    </template>

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
        <template #default="{ row }">
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

          <!-- 对于没有 slotName 的列，显示默认值 -->
          <span v-else>{{ row[column.prop] }}</span>
        </template>
      </el-table-column>
    </template>
  </ResourceMatchDialog>
  <SurveyFeedback />
</template>

<script setup name="brandDemandDetail">
  import { useRouter, useRoute } from 'vue-router';
  import ExecuteDetailTab from '../components/ExecuteDetailTab.vue';
  import DemandDetailTab from '../components/DemandDetailTab.vue';
  import LogTab from '../components/LogTab.vue';
  import { createDrawer } from '@/views/lute-os/demandManage/components/drawerModalFunc';
  import { platformApi, memberApi, productApi } from '@/api';
  import { useStore } from '@/store/modules/useStore';
  import { storeToRefs } from 'pinia';
  import { onBeforeRouteLeave } from 'vue-router';
  import { ElMessage } from 'element-plus';
  import SurveyFeedback from '@/views/lute-os/demandManage/components/SurveyFeedback.vue';
  import ResourceMatchDialog from '@/views/lute-os/brandDemandMange/components/ResourceMatchDialog.vue';
  import Steps from '@/views/lute-os/brandDemandMange/components/Steps.vue';
  import { useDemandOperation } from '../composables/useDemandOperation';
  import { approvalStepsInitial, resourceOptionsType } from '../constants';
  import {
    columnConfigurations,
    helpers,
  } from '@/views/lute-os/brandDemandMange/components/columnConfig.jsx';
  const userInfoStore = useStore();
  const { userInfo } = storeToRefs(userInfoStore);
  const store = useStore();
  const resourceMatchDialogRef = ref();
  const resourceMatchDialogVisible = ref(false);
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
  const scene = computed(() => route.query.scene || demandDetail.value.resourceType);
  const demandDetail = ref({});
  const isEditMode = computed(() => {
    return demandDetail.value?.auth?.auditFlag === 1 || false;
  });

  const executeDetailModeDisplay = computed(() => {
    return (
      [23, 26, 28].includes(demandDetail.value.status) ||
      route.query.from === 'executeMyDemandList' ||
      (route.query.from === 'submitMyDemand' && route.query.tab === 'toReceive')
    );
  });
  const route = useRoute();
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
          if (value && !demandDetail.value.currencyCode) {
            return callback(new Error('请选择币种'));
          }
          callback();
        },
        trigger: ['blur', 'change'], // 或 'change' 看需求
      },
    ],
    demandContact: [{ required: true, message: '请选择需求对接人', trigger: ['blur', 'change'] }],
    demandContent: [{ required: true, message: '请输入需求内容', trigger: 'blur' }],
    cooperationDesc: [{ required: true, message: '请输入合作类型', trigger: 'blur' }],
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
        demandModule: 'brand_research',
      });
      const detail = {
        ...(res.brandResearch || {}),
        ...res,
      };

      detail.budgetUnit = '【单位：USD】';
      detail.demandFile = toUploadFileArray(detail.demandFileList);
      detail.handleFileList = toUploadFileArray(detail.handleFileList);

      detail.department = detail.department || userInfo.value.deptInfo?.deptId;
      detail.mediaCategoryList = detail.mediaCategoryList.map((item) => item.mediaCategory);
      detail.productOnlineTime = [detail.productOnlineTimeStart, detail.productOnlineTimeEnd];
      detail.sampleDeliveryTime = [detail.sampleDeliveryTimeStart, detail.sampleDeliveryTimeEnd];
      console.log('detail.intentionResource', detail.intentionResource);
      if (!Array.isArray(detail.intentionResource)) {
        detail.intentionResource = [];
      }

      if (
        detail.resourceType === 'expert_resource' ||
        detail.resourceType === 'institution_resource'
      ) {
        detail.expectedCooperationDate = [
          detail.expectedCooperationStartDate,
          detail.expectedCooperationEndDate,
        ];
        detail.cooperationPeriodDate = [
          detail.cooperationPeriodStartDate,
          detail.cooperationPeriodEndDate,
        ];
        console.log(detail.expertTypeList, 'detail.expertTypeList');

        detail.expertTypeList = Array.isArray(detail.expertTypeList) ? detail.expertTypeList : [];
        detail.orgTypeList = Array.isArray(detail.orgTypeList) ? detail.orgTypeList : [];
        console.log(detail.expertTypeList, 'detail.expertTypeList');
        if (Array.isArray(detail.brandCodeList) && detail.brandCodeList.length > 0) {
          detail.brandCodeList = detail.brandCodeList[0];
        } else if (!detail.brandCodeList) {
          detail.brandCodeList = '';
        }
        detail.demandContact = detail.demandContact || '';
        detail.mainProductLink = detail.mainProductLink || '';
        detail.categoryCode = detail.categoryCode || '';
        detail.countryCode = detail.countryCode || '';
        detail.cooperationDesc = detail.cooperationDesc || '';
        detail.cooperationType = detail.cooperationType || '';
      } else {
        if (!Array.isArray(detail.brandCodeList)) {
          detail.brandCodeList = [];
        }
      }
      demandDetail.value = detail;
      if (detail.demandFileList && detail.demandFileList.length > 0) {
        const demandFileUpload = document.querySelector('.demand-file-upload .el-upload');
        if (demandFileUpload) demandFileUpload.style.display = 'none';
      }

      if (detail.handleFileList && detail.handleFileList.length > 0) {
        const handleFileListUpload = document.querySelector('.handle-file-upload .el-upload');
        if (handleFileListUpload) handleFileListUpload.style.display = 'none';
      }
      console.log(demandDetail.value, 'demandDetail');
      await nextTick();
    } catch (e) {
      console.error('加载失败', e);
    } finally {
      pageLoading.value = false;
    }
  };

  const backToList = (message = '操作成功') => {
    const { menuType } = route.query;
    // 跳转回执行端
    if (menuType === '0') {
      router.replace({ name: 'brandDemandApproveExecute' });
    } else if (menuType === '1') {
      // 跳转回提交端
      router.replace({ name: 'brandDemandApprove' });
    } else {
      router.back();
    }
    ElMessage.success(message);
  };
  const { submitOperation } = useDemandOperation();
  const handlePassDemand = async (formData) => {
    btnLoading.pass = true;
    try {
      await submitOperation('approved', { ...formData, demandCode: demandDetail.value.demandCode });
      // fetchDetail();
      backToList();
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
      // fetchDetail();
    } catch (error) {
      console.error('拒绝失败', error);
    } finally {
      btnLoading.pass = false;
      backToList();
    }
  };

  const demandEditTabRef = ref(null);
  const demandResubmitTabRef = ref(null);

  const handleResubmit = async (formData) => {
    const valid = await demandResubmitTabRef.value.formRef.validate().catch(() => {
      return false; // 校验失败返回 false，不继续执行
    });
    if (!valid) return;
    btnLoading.resubmit = true;
    try {
      const params = {
        ...formData,
        demandCode: demandDetail.value.demandCode,
        brandCodeList: Array.isArray(demandDetail.value.brandCodeList)
          ? demandDetail.value.brandCodeList
          : [],
        productNameList: Array.isArray(demandDetail.value.productNameList)
          ? demandDetail.value.productNameList.map((code) => {
              const prod = categoryList.value.find((item) => item.productCode === code);
              return prod?.productTitle || code;
            })
          : [],
        demandTypeList: Array.isArray(demandDetail.value.demandTypeList)
          ? demandDetail.value.demandTypeList.map((item) => item.demandType)
          : [],
        cooperationTypeList: Array.isArray(demandDetail.value.cooperationTypeList)
          ? demandDetail.value.cooperationTypeList.map((item) => item.cooperationType)
          : [],
        sampleDeliveryTimeStart: formData.sampleDeliveryTime[0],
        sampleDeliveryTimeEnd: formData.sampleDeliveryTime[1],
        productOnlineTimeStart: formData.productOnlineTime[0],
        productOnlineTimeEnd: formData.productOnlineTime[1],
        editFlag: 1,
        approveFlag: 1,
      };
      await submitOperation('resubmit', {
        ...formData,
        demandCode: demandDetail.value.demandCode,
        brandCodeList: Array.isArray(demandDetail.value.brandCodeList)
          ? demandDetail.value.brandCodeList
          : [],
        productNameList: Array.isArray(demandDetail.value.productNameList)
          ? demandDetail.value.productNameList.map((code) => {
              const prod = categoryList.value.find((item) => item.productCode === code);
              return prod?.productTitle || code;
            })
          : [],
        demandTypeList: Array.isArray(demandDetail.value.demandTypeList)
          ? demandDetail.value.demandTypeList.map((item) => item.demandType)
          : [],
        cooperationTypeList: Array.isArray(demandDetail.value.cooperationTypeList)
          ? demandDetail.value.cooperationTypeList.map((item) => item.cooperationType)
          : [],
        sampleDeliveryTimeStart: formData.sampleDeliveryTime[0],
        sampleDeliveryTimeEnd: formData.sampleDeliveryTime[1],
        productOnlineTimeStart: formData.productOnlineTime[0],
        productOnlineTimeEnd: formData.productOnlineTime[1],
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
  const mediaPageNum = ref(1);
  const mediaPageSize = ref(10);
  const mediaTotal = ref(0);
  const mediaList = ref([]);
  const linkUrl = `https://alidocs.dingtalk.com/i/nodes/7NkDwLng8ZK644BNCL5GQdE7WKMEvZBY?corpId=ding1a1c6d46f33cfeb735c2f4657eb6378f&utm_medium=im_card&sideCollapsed=true&iframeQuery=viewId%3DfHMld5q%26utm_medium%3Dim_card%26sheetId%3D1mtYdK4%26utm_source%3Dim&utm_scene=person_space&utm_source=im`;

  const activeColumns = computed(() => {
    return columnConfigurations[scene.value] || []; // 如果 scene 无效，返回空数组
  });
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
      try {
        const res = await platformApi.platformDemandMediaList({
          pageNum: mediaPageNum.value,
          pageSize: mediaPageSize.value,
          mediaNameList: demandDetail.value.intentionResource.join(','),
          // mediaNameList: selectedMediaNameList.value.join(',') ?? undefined,
        });
        mediaTotal.value = res?.total || 0;
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
            pageNum: mediaPageNum.value,
            pageSize: mediaPageSize.value,
            expertList: demandDetail.value.intentionResource,
          });
          mediaTotal.value = res?.total || 0;
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
            pageNum: mediaPageNum.value,
            pageSize: mediaPageSize.value,
            agencyList: demandDetail.value.intentionResource,
          });
          total.value = res?.total || 0;
          if (!res?.agencyList?.length) {
            await showNoResourceDialog();
          } else {
            mediaList.value = res.agencyList; // 将数据存入 state
            resourceMatchDialogVisible.value = true;
          }
        } catch (error) {
          console.log(1);
          console.error(error);
          ElMessage.error('获取资源匹配数据失败');
        }
      }
    }
  };
  const sceneDescription = () => {
    if (scene.value === 'media_resource') {
      return '按照您的选项内容，以下媒体符合您的诉求，可以选择您的意向合作媒体，我们将会优先考虑这与些媒体进行合作。可多选，最多选择10个';
    } else if (scene.value === 'expert_resource') {
      return '您选择的专家资源会进入到专家合作表后续对应同事会洽谈专家合作事宜，可多选，最多选择10个';
    } else if (scene.value === 'institution_resource') {
      return '您选择的机构资源会进入到机构合作表后续对应同事会洽谈机构合作事宜，可多选，最多选择10个';
    }
  };
  const currentPage = ref(1);
  const pageSize = ref(100);
  const total = ref(0);
  // 获取日志信息
  const fetchLogs = async () => {
    console.log('fetchLogs');
    const params = {
      itemType: 'demand_brand',
      moduleType: 'demand',
      pageSize: pageSize.value,
      pageNum: currentPage.value,
    };
    const res = await platformApi.platformQueryLog({ ...params, itemCode: route.params.id });
    logList.value = res.logList || [];
    total.value = res.total;
  };
  const currentStep = ref('1');
  const approvalSteps = ref([]);
  const fetchApproveSteps = async () => {
    pageLoading.value = true;
    const { id } = route.params;
    if (!id) return;
    try {
      const res = await platformApi.platformDemandQueryDemandProcessStep({
        demandCode: id,
        demandModule: 'brand_research',
      });
      res.demandProcessStepList?.forEach((item, index) => {
        approvalStepsInitial.forEach((cell) => {
          if ([0, 4].includes(index)) {
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
  const handleMediaPageChange = (page) => {
    mediaPageNum.value = page;
    console.log(mediaPageNum.value, 'mediaPageNum.value');
    resourceMatch();
  };
  const handleMediaPageSizeChange = (size) => {
    mediaPageSize.value = size;
    resourceMatch();
  };
  const handleConfirmSelection = (selectedResources) => {
    resourceMatchDialogVisible.value = false;
    demandDetail.value.intentionResource = selectedResources
      .map((item) => (scene.value === 'media_resource' ? item.mediaName : item.expertName))
      .join('; ');
  };
  const queryDemandContactDepartment = async (memberCode) => {
    if (!memberCode) {
      demandDetail.value.contactDeptId = '';
      demandDetail.value.contactDeptName = '';
      return;
    }
    const res = await memberApi.luteosMemberQueryMemberDetail({
      memberCode,
    });
    demandDetail.value.contactDeptId = res.deptInfo?.deptId;
    demandDetail.value.contactDeptName =
      res.deptInfo?.parentName + ' - > ' + res.deptInfo?.deptName;
  };
  const categoryList = ref([]);
  onMounted(async () => {
    fetchDetail();
    fetchApproveSteps();
    fetchLogs();
    const res = await platformApi.platformDemandQueryProductCnName();
    categoryList.value = res.productList;
    if (route.query.from === 'submitMyDemand' && route.query.resubmit === '1') {
      activeTab.value = 'demandDetailResubmit';
    }
    if (route.query.from === 'dingTalkQueryLog' || route.query.source === 'dingTalkQueryLog') {
      activeTab.value = 'log';
      const menuCode = store.menuCodeMap?.[route?.name];
      await memberApi.luteosMemberSysReport({
        platform: 'OS',
        menuCode,
        eventName: route?.meta?.title + '品牌需求-钉钉查看日志',
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
        eventName: route?.meta?.title + '品牌需求-钉钉详情',
        memberCode: userInfo?.value?.memberCode,
        type: 'button',
        pageUrl: route?.path,
      });

      await memberApi.luteosMemberSaveMenuVisit({
        menuCode,
      });
    }
    if (
      (route.query.from === 'executeMyDemandList' && route.query.tab === 'executing') ||
      (route.query.from === 'submitMyDemand' && route.query.tab === 'toReceive') ||
      (route.query.from === 'dingTalkDetail' && demandDetail.value.status === 23)
    ) {
      activeTab.value = 'executeDetail';
    }
  });
  onActivated(() => {
    fetchDetail();
    fetchApproveSteps();
    fetchLogs();
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
    if (menuType === '0') {
      router.replace({ name: 'brandDemandApproveExecute' });
    } else if (menuType === '1') {
      // 跳转回提交端
      router.replace({ name: 'brandDemandApprove' });
    } else {
      router.back();
    }
  };
  const productCategoryList = ref([]);
  const brandCodeList = ref([]);
  const expertList = ref([]);
  const getExpertList = async () => {
    const res = await platformApi.platformDemandQueryExpertTypeList({
      scene: resourceOptionsType[scene.value],
    });
    expertList.value = res;
  };
  const getProductCategoryList = async () => {
    const res = await productApi.luteosProductAttrQueryCategoryLevelList({
      pageNum: 1,
      pageSize: 100,
    });
    productCategoryList.value = res.categoryLevelBeanList || [];
    console.log(productCategoryList.value, 'productCategoryList.value');
  };
  const getBrandCodeList = async () => {
    const res = await productApi.luteosProductBrandQueryBrandList({
      pageNum: 1,
      pageSize: 100,
    });
    brandCodeList.value = res.brandBeanList || [];
  };

  onBeforeRouteLeave((to, from, next) => {
    const fromList = route.query.from || 'defaultList';
    sessionStorage.setItem(`backFromDetail_${fromList}`, '1');
    next();
  });
  watchEffect(() => {
    if (scene.value === 'expert_resource' || scene.value === 'institution_resource') {
      console.log('expert_resource1');
      Promise.all([getExpertList(), getProductCategoryList(), getBrandCodeList()]);
    }
  });
</script>
<style scoped>
  :deep(.card-body) {
    padding-bottom: 50px;
  }
  :deep(.el-icon.el-select__caret.el-select__icon) {
    display: none;
  }
  :deep(.el-textarea) {
    min-height: 32px;
    .el-textarea__inner {
      min-height: 32px;
      height: auto !important;
    }
  }
</style>
