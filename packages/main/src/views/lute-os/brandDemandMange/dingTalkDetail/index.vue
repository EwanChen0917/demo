<template>
  <div class="dingding-detail-container" :style="{ paddingTop: paddingTop + 'px' }">
    <div v-loading="pageLoading">
      <div class="header" ref="headerRef">
        <div class="w-100">
          <span class="title">品牌需求：</span>
          <span class="demand-title">【{{ form.demandTitle || '需求标题' }}】等您审批。</span>
        </div>
        <a type="primary" class="detail-link" @click="openInBrowser">查看详情</a>
      </div>

      <el-descriptions class="detail-descriptions" title="" :column="1" border>
        <el-descriptions-item label="意向资源">
          {{ formatArrayDisplay(form.intentionResource) }}
        </el-descriptions-item>

        <el-descriptions-item label="需求标题" :span="3">
          {{ form.demandTitle || '--' }}
        </el-descriptions-item>
        <el-descriptions-item label="需求背景" :span="3">
          <pre class="pre-wrap">{{ form.demandBackground || '--' }}</pre>
        </el-descriptions-item>
        <el-descriptions-item label="需求创建人">
          {{ form.creatorName || '--' }}
        </el-descriptions-item>
        <el-descriptions-item label="所在部门">
          <div class="d-flex align-items-center gap-2">
            <el-icon><OfficeBuilding /></el-icon>
            <span>{{ form.deptNameStr || '--' }}</span>
          </div>
        </el-descriptions-item>

        <!-- 专家资源场景 (resourceType === 'expert_resource') -->
        <template
          v-if="
            form.resourceType === 'expert_resource' || form.resourceType === 'institution_resource'
          "
        >
          <el-descriptions-item label="需求对接人">
            {{ form.demandContactDesc || '--' }}
          </el-descriptions-item>
          <el-descriptions-item label="需求所属部门">
            <div class="d-flex align-items-center gap-2">
              <el-icon><OfficeBuilding /></el-icon>
              <span>{{ form.contactDeptName || '--' }}</span>
            </div>
          </el-descriptions-item>
          <el-descriptions-item label="品牌名称">
            {{ formatArrayDisplay(form.brandNameList) }}
          </el-descriptions-item>
          <el-descriptions-item label="主推产品">
            {{ form.mainProductLink || '--' }}
          </el-descriptions-item>
          <el-descriptions-item label="产品分类">
            {{ form.categoryCodeDesc || '--' }}
          </el-descriptions-item>
          <el-descriptions-item label="预估预算">
            {{
              form.estimatedBudget
                ? `${form.estimatedBudget} ${form.currencyCode}（${form.currencyCodeDesc}）`
                : '--'
            }}
          </el-descriptions-item>
          <el-descriptions-item label="投放国家">
            {{ form.countryCodeDesc || '--' }}
          </el-descriptions-item>
          <el-descriptions-item label="合作类型">
            {{ form.cooperationTypeDesc || '--' }}
            <template v-if="form.cooperationType === 'COOP_OTHER' && form.cooperationDesc">
              （{{ form.cooperationDesc }}）
            </template>
          </el-descriptions-item>
          <el-descriptions-item label="专家类型" v-if="form.resourceType === 'expert_resource'">
            {{ formatArrayDisplay(form.expertTypeNameList) }}
          </el-descriptions-item>
          <el-descriptions-item
            label="机构类型"
            v-if="form.resourceType === 'institution_resource'"
          >
            {{ formatArrayDisplay(form.orgTypeNameList) }}
          </el-descriptions-item>
          <el-descriptions-item label="期望合作时间">
            {{ form.expectedCooperationStartDate || '--' }} 至
            {{ form.expectedCooperationEndDate || '--' }}
          </el-descriptions-item>
          <el-descriptions-item label="合作周期">
            {{ form.cooperationPeriodStartDate || '--' }} 至
            {{ form.cooperationPeriodEndDate || '--' }}
          </el-descriptions-item>
          <el-descriptions-item label="产品可寄样时间">
            {{ form.sampleDeliveryTimeStart || '--' }} 至
            {{ form.sampleDeliveryTimeEnd || '--' }}
          </el-descriptions-item>
          <el-descriptions-item label="需求内容" :span="3">
            <pre class="pre-wrap">{{ form.demandContent || '--' }}</pre>
          </el-descriptions-item>
        </template>

        <!-- 媒体资源场景 (resourceType === 'media_resource') -->
        <template v-if="form.resourceType === 'media_resource'">
          <el-descriptions-item label="资源类型">
            <el-tag type="info" size="small">
              {{ ResourceTypeMap[form.resourceType] || '--' }}
            </el-tag>
          </el-descriptions-item>
          <el-descriptions-item label="需求类型">
            {{ formatMultipleSelection(form.demandTypeList, 'demandTypeDesc') }}
          </el-descriptions-item>
          <el-descriptions-item label="合作类型">
            {{ formatMultipleSelection(form.cooperationTypeList, 'cooperationTypeDesc') }}
          </el-descriptions-item>
          <el-descriptions-item label="媒体分类">
            <el-tag type="info" v-for="item in form.mediaCategoryList" :key="item.mediaCategory">
              {{ item.mediaCategoryDesc }}
            </el-tag>
          </el-descriptions-item>
          <el-descriptions-item label="投放国家">
            {{ form.countryCodeDesc || '--' }}
          </el-descriptions-item>
          <el-descriptions-item label="预估预算">
            {{ form.estimatedBudget ? `${form.estimatedBudget} ${form.currencyCodeDesc}` : '--' }}
          </el-descriptions-item>
          <el-descriptions-item label="预计发样时间">
            {{ form.sampleDeliveryTimeStart || '--' }} 至
            {{ form.sampleDeliveryTimeEnd || '--' }}
          </el-descriptions-item>
          <el-descriptions-item label="推广产品" :span="3">
            {{ formatArrayDisplay(form.productNameList) }}
          </el-descriptions-item>
          <el-descriptions-item label="产品所属品牌" :span="3">
            {{ formatArrayDisplay(form.brandCodeList) }}
          </el-descriptions-item>
          <el-descriptions-item label="产品上市时间">
            {{ form.productOnlineTimeStart || '--' }} 至
            {{ form.productOnlineTimeEnd || '--' }}
          </el-descriptions-item>
          <el-descriptions-item label="期望完成时间">
            {{ form.expectFinishTime || '--' }}
          </el-descriptions-item>
          <el-descriptions-item label="需求描述" :span="3">
            <pre class="pre-wrap">{{ form.demandDesc || '--' }}</pre>
          </el-descriptions-item>
          <el-descriptions-item label="需求相关人员" :span="3">
            {{ formatArrayDisplay(form.relMemberList) }}
          </el-descriptions-item>
        </template>

        <!-- 上传附件 (文件列表，需要遍历显示) -->
        <el-descriptions-item label="附件" :span="3">
          <div v-if="form.demandFileList && form.demandFileList.length">
            <div
              v-for="file in form.demandFileList"
              :key="file.fileCode"
              @click="handleFileClick()"
            >
              <a style="cursor: pointer" :href="file.fileUrl" target="_blank">
                {{ file.fileName }}
              </a>
            </div>
          </div>
          <span v-else>--</span>
        </el-descriptions-item>
      </el-descriptions>

      <div class="button-box">
        <el-button
          type="primary"
          class="btn-confirm"
          @click="handleApprove"
          v-if="form?.auth?.auditFlag === 1"
        >
          同意
        </el-button>
        <el-button
          type="danger"
          class="btn-reject"
          @click="handleReject"
          v-if="form?.auth?.auditFlag === 1"
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

<script setup lang="ts" name="brandDemandDingTalkDetail">
  import { ref, onMounted, onUnmounted, watchPostEffect } from 'vue'; // 引入 ref, onMounted, onUnmounted, watchPostEffect
  import {
    CooperationTypeMap,
    CountryMap,
    DemandTypeMap,
    MediaCategoryMap,
    ResourceTypeMap,
    ExpertCooperationType, // 引入 ExpertCooperationType
  } from '../constants'; // 确保路径正确
  import { OfficeBuilding } from '@element-plus/icons-vue';
  import { useRoute } from 'vue-router';
  import ApproveDialog from '@/views/lute-os/brandDemandMange/components/ApproveDialog.vue'; // 确保路径正确
  import RejectDialog from '@/views/lute-os/demandManage/components/common/RejectDialog.vue'; // 确保路径正确
  import { useStore } from '@/store/modules/useStore'; // 确保路径正确
  import { storeToRefs } from 'pinia';
  import { platformApi } from '@/api'; // 确保路径正确
  import { ElMessage } from 'element-plus';

  const userInfoStore = useStore();
  const { userInfo } = storeToRefs(userInfoStore);
  const route = useRoute();
  const headerRef = ref();
  const paddingTop = ref(108);
  const form = ref<any>({}); // 确保 form 是响应式的

  // -- 以下是辅助函数，用于格式化显示 --

  /**
   * 格式化多选对象数组
   * @param {Array} list - 例如 [{... demandTypeDesc: '类型A'}]
   * @param {String} key - 要提取的属性名
   */
  const formatMultipleSelection = (list: any[], key: string) => {
    if (!Array.isArray(list) || !list.length) return '--';
    return list.map((item) => item[key]).join('、');
  };
  const formatArrayDisplay = (arr, separator = ', ', fallback = '--') => {
    if (!Array.isArray(arr) || arr.length === 0) {
      return fallback;
    }
    return arr.join(separator);
  };
  /**
   * 格式化多选键值数组
   * @param {Array} keys - 例如 ['key1', 'key2']
   * @param {Object} map - 例如 { key1: '值1', key2: '值2' }
   */
  const formatMultipleKeys = (keys: any[], map: { [key: string]: string }) => {
    if (!Array.isArray(keys) || !keys.length) return '--';
    return keys.map((key) => map[key] || key).join('、');
  };

  const approveDialogRef = ref();
  const rejectDialogRef = ref();
  function updatePaddingTop() {
    if (headerRef.value) {
      paddingTop.value = headerRef.value.offsetHeight + 20;
    }
  }

  const handleApprove = () => {
    // 如果到第二级审批，则需要弹窗
    if (form.value.auditExecuteInfoFlag === 1) {
      approveDialogRef.value.open();
    } else if (form.value.auditExecuteInfoFlag === 0) {
      // 直接通过不弹窗
      handleApproveSubmit({}); // 调用实际的提交逻辑
    }
  };

  const handleReject = () => {
    // 如果到第二级审批，则需要弹窗
    if (form.value.auditExecuteInfoFlag === 1) {
      rejectDialogRef.value.open();
    } else if (form.value.auditExecuteInfoFlag === 0) {
      handleRejectSubmit({}); // 调用实际的提交逻辑
    }
  };

  const handleApproveSubmit = async (formData: any) => {
    try {
      await platformApi.platformDemandOperate({
        demandCode: route.params.id as string,
        operateType: 'approved',
        demandModule: 'brand_research',
        approveInfo: {
          operator: formData.operator,
          planFinishDate: formData.planFinishDate,
          planStartDate: formData.planStartDate,
          remark: formData.reason,
        },
      });
      ElMessage.success('操作成功');
      fetchDetail();
    } catch (e) {
      console.error('通过失败', e);
      ElMessage.error('操作失败');
    }
  };

  const handleRejectSubmit = async (formData: any) => {
    try {
      await platformApi.platformDemandOperate({
        demandCode: route.params.id as string,
        operateType: 'rejected',
        demandModule: 'brand_research',
        approveInfo: {
          remark: formData.reason,
        },
      });
      ElMessage.success('操作成功');
      fetchDetail();
    } catch (e) {
      console.error('拒绝失败', e);
      ElMessage.error('操作失败');
    }
  };

  const openInBrowser = () => {
    const isDEV = import.meta.env.VITE_ENV === 'DEV';
    window.open(
      `${isDEV ? 'https://erp.luteos.site' : 'https://erp.luteos.com'}/brand/demand/detail/${
        route.params.id
      }`,
      '_blank'
    );
  };

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
      detail.budgetUnit = 'USD';
      form.value = detail;
    } catch (e) {
      console.error('加载失败', e);
      ElMessage.error('加载详情失败');
    } finally {
      pageLoading.value = false;
    }
  };

  const handleFileClick = (file: any) => {
    ElMessage.warning('请进入系统内附件预览');
  };

  watchPostEffect(() => {
    updatePaddingTop();
    form.value.demandTitle;
  });

  onMounted(() => {
    window.addEventListener('resize', updatePaddingTop);
    updatePaddingTop();
    fetchDetail(); // 在组件挂载时获取详情数据
  });

  onUnmounted(() => {
    window.removeEventListener('resize', updatePaddingTop);
  });
</script>

<style scoped lang="scss">
  * {
    font-family: 'PingFang SC', 'Microsoft YaHei', 'Helvetica Neue', 'Helvetica', 'Arial',
      sans-serif !important;
  }
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
      word-break: break-all;
      white-space: normal;
      line-height: 1.5;
      max-width: 100%;
      overflow: hidden;
      text-overflow: ellipsis;
    }

    .detail-link {
      font-size: 12px;
      cursor: pointer;
    }
  }

  // 为 el-descriptions 添加外边距
  .detail-descriptions {
    padding: 0 24px;
  }

  // 用于保留文本域中的换行和空格
  .pre-wrap {
    white-space: pre-wrap;
    word-break: break-all;
    margin: 0; // 重置默认的 p 或 pre 标签样式
    font-family: inherit; // 继承父级字体
  }

  .button-box {
    display: flex;
    justify-content: center;
    gap: 32px;
    padding: 20px;
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
  :deep(.el-descriptions__label) {
    min-width: 140px;
  }
</style>
