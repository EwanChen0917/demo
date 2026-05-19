<template>
  <div class="lead-page">
    <div class="lead-grid">
      <!-- 左侧列表 -->
      <div class="lead-left">
        <KeenList
          :selected-num="0"
          :selected-list="selectedList"
          @resetSearch="handleReset"
          @refresh="refreshList"
          @clearAll="handleReset"
          @resetSearchByKey="handleResetByKey"
        >
          <template #search>
            <el-input
              v-model="search.keyword"
              placeholder="线索编码或需求名称"
              clearable
              style="width: 200px"
            />
          </template>
          <template #filters>
            <el-select
              v-model="search.nodeList"
              placeholder="当前节点"
              multiple
              collapse-tags
              clearable
              style="width: 160px"
            >
              <el-option v-for="opt in LEAD_NODE_FILTER_OPTIONS" :key="opt.code" :label="opt.name" :value="opt.code" />
            </el-select>
            <el-select
              v-model="search.subStatusList"
              placeholder="节点状态"
              multiple
              collapse-tags
              clearable
              style="width: 140px"
            >
              <el-option v-for="opt in LEAD_SUB_STATUS_OPTIONS" :key="opt.code" :label="opt.name" :value="opt.code" />
            </el-select>
            <DeptCascaderTwoLevel v-model="search.deptId" placeholder="业务线" style="width: 200px" />
          </template>
          <template #default="{ tableHeight }">
            <el-table
              ref="tableRef"
              v-loading="listLoading"
              :data="listData || []"
              highlight-current-row
              row-key="leadCode"
              :current-row-key="selectedLeadCode || undefined"
              :height="tableHeight"
              row-class-name="lead-row-clickable"
              @row-click="handleRowClick"
            >
              <el-table-column label="需求标题" prop="demandName" min-width="160">
                <template #default="{ row }">
                  <el-tooltip :content="row.demandName" placement="top" :show-after="300">
                    <div class="lead-name-cell">
                      <div class="lead-name lead-name--ellipsis">{{ row.demandName || '--' }}</div>
                      <div class="lead-code-meta">{{ row.leadCode }}</div>
                    </div>
                  </el-tooltip>
                </template>
              </el-table-column>
              <el-table-column label="当前节点" prop="nodeName" width="130">
                <template #default="{ row }">
                  <el-tag :type="nodeTagType(row.node)" size="small">{{ row.nodeName || '--' }}</el-tag>
                </template>
              </el-table-column>
              <el-table-column label="状态" prop="subStatusName" width="90">
                <template #default="{ row }">
                  <el-tag :type="subStatusTagType(row.subStatus)" size="small">{{ row.subStatusName || '--' }}</el-tag>
                </template>
              </el-table-column>
              <el-table-column label="数字化BP" prop="bpOwnerName" width="100">
                <template #default="{ row }">{{ row.bpOwnerName || '--' }}</template>
              </el-table-column>
              <el-table-column label="提交人" prop="creatorName" width="90" />
            </el-table>
            <div v-if="loadingMore" class="load-more-tip">加载中...</div>
            <div v-else-if="noMore" class="load-more-tip">没有更多了</div>
          </template>
        </KeenList>
      </div>

      <!-- 中间详情 -->
      <div class="lead-middle">
        <el-card class="panel-card detail-card" v-loading="detailLoading">
          <template v-if="detail">
            <div class="detail-header">
              <div class="detail-header-main">
                <div class="detail-title">{{ detail.basicInfo?.demandName || '--' }}</div>
                <div class="detail-meta">
                  <span class="detail-code">{{ detail.leadCode }}</span>
                  <el-tag :type="nodeTagType(detail.node)" size="small">{{ detail.nodeName || '--' }}</el-tag>
                  <el-tag :type="subStatusTagType(detail.subStatus)" size="small">{{ detail.subStatusName || '--' }}</el-tag>
                  <el-tag v-if="detail.reviewInfo?.rating" :type="ratingTagType(detail.reviewInfo.rating)" size="small">{{ detail.reviewInfo.rating }} 级</el-tag>
                </div>
              </div>
            </div>

            <ProcessSteps :steps="detail.processSteps" />

            <div class="info-grid">
              <div class="info-item"><span class="info-label">需求类型</span><span>{{ DEMAND_TYPE_MAP[detail.basicInfo?.demandType ?? ''] || detail.basicInfo?.demandType || '--' }}</span></div>
              <div class="info-item"><span class="info-label">业务线</span><span>{{ detail.basicInfo?.deptPath || '--' }}</span></div>
              <div class="info-item"><span class="info-label">紧急程度</span><span>{{ URGENCY_MAP[detail.basicInfo?.urgency ?? ''] || detail.basicInfo?.urgency || '--' }}</span></div>
              <div class="info-item"><span class="info-label">影响人数</span><span>{{ IMPACT_MAP[detail.basicInfo?.impactPeopleRange ?? ''] || detail.basicInfo?.impactPeopleRange || '--' }}</span></div>
              <div class="info-item"><span class="info-label">预期交付</span><span>{{ detail.basicInfo?.expectDeliveryTime || '--' }}</span></div>
              <div class="info-item"><span class="info-label">提交人</span><span>{{ detail.basicInfo?.creatorName || '--' }}</span></div>
              <div class="info-item"><span class="info-label">提交时间</span><span>{{ detail.basicInfo?.createTime || '--' }}</span></div>
              <div class="info-item"><span class="info-label">数字化BP</span><span>{{ detail.reviewInfo?.bpOwnerName || '--' }}</span></div>
              <div class="info-item"><span class="info-label">IT 产品</span><span>{{ detail.reviewInfo?.productManagerName || '--' }}</span></div>
            </div>

            <div v-if="detail.basicInfo?.demandBackground" class="detail-block">
              <div class="block-label">需求背景</div>
              <div class="block-value pre-wrap">{{ detail.basicInfo.demandBackground }}</div>
            </div>
            <div v-if="detail.basicInfo?.demandContent" class="detail-block">
              <div class="block-label">需求内容</div>
              <div class="block-value pre-wrap">{{ detail.basicInfo.demandContent }}</div>
            </div>
            <div v-if="detail.basicInfo?.demandValue" class="detail-block">
              <div class="block-label">价值评估</div>
              <div class="block-value pre-wrap">{{ detail.basicInfo.demandValue }}</div>
            </div>

            <div v-if="detail.basicInfo?.attachments?.length" class="detail-block">
              <div class="block-label">附件</div>
              <ul class="attachment-list">
                <li v-for="att in detail.basicInfo.attachments" :key="att.ossKey">
                  <a v-if="att.url" :href="att.url" target="_blank" rel="noopener">{{ att.name }}</a>
                  <span v-else>{{ att.name }}</span>
                </li>
              </ul>
            </div>

            <div v-if="detail.reviewInfo?.rating" class="detail-block review-block">
              <div class="block-label">评审结论</div>
              <div class="info-grid">
                <div class="info-item"><span class="info-label">评级</span><el-tag :type="ratingTagType(detail.reviewInfo.rating)" size="small">{{ detail.reviewInfo.rating }}</el-tag></div>
                <div class="info-item"><span class="info-label">结论</span><span>{{ CONCLUSION_MAP[detail.reviewInfo.reviewConclusion ?? ''] || detail.reviewInfo.reviewConclusion }}</span></div>
                <div class="info-item"><span class="info-label">指派 BP</span><span>{{ detail.reviewInfo.bpOwnerName || detail.reviewInfo.productLineOwnerName || '--' }}</span></div>
                <div class="info-item"><span class="info-label">评审时间</span><span>{{ detail.reviewInfo.reviewedAt || '--' }}</span></div>
              </div>
              <div v-if="detail.reviewInfo.reviewOpinion" class="review-opinion pre-wrap">{{ detail.reviewInfo.reviewOpinion }}</div>
            </div>

            <div v-if="detail.reviewInfo?.bpConfirmRemark" class="detail-block review-block">
              <div class="block-label">BP 确认备注</div>
              <div class="block-value pre-wrap">{{ detail.reviewInfo.bpConfirmRemark }}</div>
            </div>

            <div class="detail-block op-log-block">
              <div class="block-label">操作日志</div>
              <div v-loading="opLogLoading">
                <div v-if="!opLogLoading && opLogRecords.length === 0" class="op-log-empty">暂无操作日志</div>
                <ul v-else class="op-log-timeline">
                  <li v-for="(item, idx) in opLogRecords" :key="idx" class="op-log-item">
                    <div class="op-log-dot" />
                    <div class="op-log-content">
                      <div class="op-log-header">
                        <span class="op-log-operator">{{ item.operatorName || item.operator || '系统' }}</span>
                        <span class="op-log-time">{{ item.createTime || '--' }}</span>
                      </div>
                      <div class="op-log-text">{{ item.content || '--' }}</div>
                    </div>
                  </li>
                </ul>
              </div>
            </div>

            <div class="detail-block ai-block">
              <div class="ai-block-header">
                <div class="block-label">AI 价值评估</div>
                <el-tag v-if="detail.assessment?.assessmentStatus !== undefined && detail.assessment?.assessmentStatus !== null" :type="assessmentTagType" size="small">{{ assessmentStatusText }}</el-tag>
                <el-button class="ai-block-action" size="small" type="primary" plain :loading="isAssessing" @click="startAssessment">
                  {{ hasAssessment ? '重新评估' : '发起评估' }}
                </el-button>
              </div>
              <div v-if="detail.assessment?.assessmentMarkdown" class="lead-markdown">
                <Markdown :source="detail.assessment.assessmentMarkdown" />
              </div>
              <el-empty v-else description="暂无评审结果，点击「发起评估」开始生成" :image-size="60" />
              <div v-if="detail.assessment?.assessmentErrorMsg" class="error-tip">
                {{ detail.assessment.assessmentErrorMsg }}
              </div>
            </div>
          </template>
          <el-empty v-else description="请选择左侧线索查看详情" />
        </el-card>
      </div>

      <!-- 右侧操作 -->
      <div class="lead-right">
        <el-card class="panel-card ops-card">
          <template #header>
            <div class="ops-header">
              <span class="ops-title">节点操作</span>
            </div>
          </template>
          <template v-if="detail">
            <!-- 价值评估节点：直接展示评审表单 -->
            <template v-if="detail.node === 'review' && detail.subStatus === 'in_progress'">
              <div class="ops-section-title">价值评估</div>
              <el-form ref="reviewFormRef" :model="reviewForm" :rules="reviewRules" label-width="90px" class="ops-form">
                <el-form-item label="需求评级" prop="rating">
                  <el-select v-model="reviewForm.rating" placeholder="请选择" style="width: 100%">
                    <el-option label="S 级（最高优先级）" value="S" />
                    <el-option label="A 级" value="A" />
                    <el-option label="B 级" value="B" />
                    <el-option label="C 级" value="C" />
                  </el-select>
                </el-form-item>
                <el-form-item label="审核结论" prop="reviewConclusion">
                  <el-select v-model="reviewForm.reviewConclusion" placeholder="请选择" style="width: 100%">
                    <el-option label="通过，分配数字化BP" value="approve" />
                    <el-option label="驳回，退回提报人" value="reject" />
                    <el-option label="取消该提案" value="cancel" />
                  </el-select>
                </el-form-item>
                <el-form-item v-if="reviewForm.reviewConclusion === 'approve'" label="指派 BP" prop="productLineOwner">
                  <DeptMember v-model="reviewForm.productLineOwner" placeholder="请选择数字化BP" style="width: 100%" />
                </el-form-item>
                <el-form-item label="审核意见" prop="reviewOpinion">
                  <el-input v-model="reviewForm.reviewOpinion" type="textarea" :rows="3" placeholder="请填写审核意见" maxlength="500" show-word-limit />
                </el-form-item>
                <el-button type="primary" :loading="reviewLoading" @click="handleReview" style="width: 100%">提交评审</el-button>
              </el-form>
            </template>

            <!-- 数字化BP承接：默认展示确认表单，旁边一个转交按钮 -->
            <template v-else-if="detail.canBpAction">
              <div class="ops-section-title">
                <span>{{ bpFormMode === 'transfer' ? '转交给其他 BP' : '确认评估，分配 IT 产品' }}</span>
                <el-button size="small" plain @click="toggleBpFormMode">
                  {{ bpFormMode === 'transfer' ? '改为确认' : '改为转交' }}
                </el-button>
              </div>
              <el-form v-if="bpFormMode === 'confirm'" ref="confirmFormRef" :model="confirmForm" :rules="confirmRules" label-width="90px" class="ops-form">
                <el-form-item label="IT 产品" prop="productManager">
                  <DeptMember v-model="confirmForm.productManager" placeholder="请选择承接的 IT 产品" style="width: 100%" />
                </el-form-item>
                <el-form-item label="评估备注" prop="remark">
                  <el-input v-model="confirmForm.remark" type="textarea" :rows="3" placeholder="请填写评估备注（可选）" maxlength="200" show-word-limit />
                </el-form-item>
                <el-button type="primary" :loading="confirmLoading" @click="handleConfirm" style="width: 100%">提交确认</el-button>
              </el-form>
              <el-form v-else ref="transferFormRef" :model="transferForm" :rules="transferRules" label-width="90px" class="ops-form">
                <el-form-item label="新 BP" prop="newBpOwner">
                  <DeptMember v-model="transferForm.newBpOwner" placeholder="请选择接手 BP" style="width: 100%" />
                </el-form-item>
                <el-form-item label="转交说明" prop="reason">
                  <el-input v-model="transferForm.reason" type="textarea" :rows="3" placeholder="请填写转交原因（可选）" maxlength="200" show-word-limit />
                </el-form-item>
                <el-button type="primary" :loading="transferLoading" @click="handleTransfer" style="width: 100%">提交转交</el-button>
              </el-form>
            </template>

            <el-empty v-else description="该节点暂无可执行操作" :image-size="80" />
          </template>
          <el-empty v-else description="请选择左侧线索" :image-size="80" />
        </el-card>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts" name="demandLeadValueList">
  import { computed, onMounted, ref, watch } from 'vue';
  import type { FormInstance } from 'element-plus';
  import { ElMessage } from 'element-plus';
  import KeenList from '@/components/KeenList/index.vue';
  import DeptMember from '@/views/lute-os/components/DeptMember/index.vue';
  import DeptCascaderTwoLevel from '@/views/lute-os/components/DeptCascaderTwoLevel/index.vue';
  import ProcessSteps from '@/views/lute-os/components/LeadProcessSteps/index.vue';
  import Markdown from 'vue3-markdown-it';
  import {
    DEMAND_TYPE_OPTIONS,
    DEMAND_TYPE_MAP,
    URGENCY_MAP,
    IMPACT_MAP,
    REVIEW_CONCLUSION_MAP as CONCLUSION_MAP,
    LEAD_NODE_FILTER_OPTIONS,
    LEAD_NODE_NAME,
    LEAD_SUB_STATUS_OPTIONS,
    LEAD_SUB_STATUS_NAME,
    nodeTagType,
    subStatusTagType,
    ratingTagType,
  } from '@/views/lute-os/demandManage/leadConstants';
  import {
    leadValueApi,
    type LeadListItem,
    type LeadDetailResp,
    type LeadOperationLogItem,
    type LeadReviewReq,
    type LeadBpTransferReq,
    type LeadBpConfirmReq,
  } from '@/api/leadValueApi';

  const tableRef = ref();
  const selectedLeadCode = ref('');
  const detail = ref<LeadDetailResp | null>(null);
  const detailLoading = ref(false);
  const isAssessing = ref(false);

  const hasAssessment = computed(() => Boolean(detail.value?.assessment?.assessmentMarkdown));

  const PAGE_SIZE = 20;
  const listData = ref<LeadListItem[]>([]);
  const listLoading = ref(false);
  const loadingMore = ref(false);
  const noMore = ref(false);
  const currentPage = ref(1);
  const search = ref({
    keyword: '',
    demandTypeList: [] as string[],
    nodeList: [] as string[],
    subStatusList: [] as string[],
    deptId: null as string | null,
  });

  async function fetchList(reset = false) {
    if (reset) {
      currentPage.value = 1;
      noMore.value = false;
      listData.value = [];
    }
    if (noMore.value) return;
    if (reset) {
      listLoading.value = true;
    } else {
      loadingMore.value = true;
    }
    try {
      const resp = await leadValueApi.list({
        keyword: search.value.keyword || undefined,
        demandTypeList: search.value.demandTypeList?.length ? search.value.demandTypeList : undefined,
        nodeList: search.value.nodeList?.length ? search.value.nodeList : undefined,
        subStatusList: search.value.subStatusList?.length ? search.value.subStatusList : undefined,
        bizLineList: search.value.deptId ? [search.value.deptId] : undefined,
        pageNum: currentPage.value,
        pageSize: PAGE_SIZE,
      });
      const records = resp?.records || [];
      if (reset) {
        listData.value = records;
      } else {
        listData.value = [...listData.value, ...records];
      }
      noMore.value = records.length < PAGE_SIZE;
      if (records.length > 0) {
        currentPage.value += 1;
      }
      if (reset) {
        const target = listData.value.find((r) => r.leadCode === selectedLeadCode.value) || listData.value[0];
        if (target) loadDetail(target.leadCode);
        else { detail.value = null; selectedLeadCode.value = ''; }
      }
    } catch (err: unknown) {
      ElMessage.error((err as { message?: string })?.message || '加载列表失败');
    } finally {
      listLoading.value = false;
      loadingMore.value = false;
    }
  }

  function refreshList() { fetchList(true); }

  function handleTableScroll(e: Event) {
    const el = e.target as HTMLElement;
    if (!el) return;
    if (el.scrollHeight - el.scrollTop - el.clientHeight < 40) {
      if (!loadingMore.value && !noMore.value) fetchList(false);
    }
  }

  onMounted(() => {
    const wrap = tableRef.value?.$el?.querySelector('.el-scrollbar__wrap');
    if (wrap) wrap.addEventListener('scroll', handleTableScroll);
  });

  fetchList(true);

  const selectedList = computed(() => {
    const result: Array<{ key: string; label: string; value: string }> = [];
    if (search.value.keyword) result.push({ key: 'keyword', label: '关键词', value: search.value.keyword });
    if (search.value.nodeList?.length) {
      result.push({ key: 'nodeList', label: '节点', value: search.value.nodeList.map((v) => LEAD_NODE_NAME[v] || v).join('、') });
    }
    if (search.value.subStatusList?.length) {
      result.push({ key: 'subStatusList', label: '状态', value: search.value.subStatusList.map((v) => LEAD_SUB_STATUS_NAME[v] || v).join('、') });
    }
    if (search.value.deptId) {
      result.push({ key: 'deptId', label: '业务线', value: String(search.value.deptId) });
    }
    return result;
  });

  function handleReset() {
    search.value = { keyword: '', demandTypeList: [], nodeList: [], subStatusList: [], deptId: null };
    fetchList(true);
  }

  function handleResetByKey(key: string) {
    const s = search.value as Record<string, unknown>;
    if (Array.isArray(s[key])) s[key] = [];
    else s[key] = key === 'deptId' ? null : '';
    fetchList(true);
  }

  watch(search, () => fetchList(true), { deep: true });

  const bpFormMode = ref<'confirm' | 'transfer'>('confirm');

  function toggleBpFormMode() {
    bpFormMode.value = bpFormMode.value === 'confirm' ? 'transfer' : 'confirm';
    if (bpFormMode.value === 'transfer') {
      transferForm.value = { leadCode: selectedLeadCode.value, newBpOwner: '', reason: '' };
    } else {
      confirmForm.value = { leadCode: selectedLeadCode.value, productManager: '', remark: '' };
    }
  }

  const reviewFormRef = ref<FormInstance>();
  const reviewLoading = ref(false);
  const reviewForm = ref<LeadReviewReq>({
    leadCode: '',
    rating: '',
    reviewConclusion: '',
    productLineOwner: '',
    reviewOpinion: '',
  });
  const reviewRules = computed(() => ({
    rating: [{ required: true, message: '请选择评级', trigger: 'change' }],
    reviewConclusion: [{ required: true, message: '请选择审核结论', trigger: 'change' }],
    productLineOwner: reviewForm.value.reviewConclusion === 'approve'
      ? [{ required: true, message: '审核通过时必须指派数字化BP', trigger: 'blur' }]
      : [],
    reviewOpinion: [{ required: true, message: '请填写审核意见', trigger: 'blur' }],
  }));

  const transferFormRef = ref<FormInstance>();
  const transferLoading = ref(false);
  const transferForm = ref<LeadBpTransferReq>({ leadCode: '', newBpOwner: '', reason: '' });
  const transferRules = {
    newBpOwner: [{ required: true, message: '请选择接手 BP', trigger: 'change' }],
  };

  const confirmFormRef = ref<FormInstance>();
  const confirmLoading = ref(false);
  const confirmForm = ref<LeadBpConfirmReq>({ leadCode: '', productManager: '', remark: '' });
  const confirmRules = {
    productManager: [{ required: true, message: '请选择 IT 产品', trigger: 'change' }],
  };

  const assessmentStatusText = computed(() => {
    const s = detail.value?.assessment?.assessmentStatus;
    if (s === 0) return '评审中';
    if (s === 1) return '已完成';
    if (s === 2) return '评审失败';
    return '未评审';
  });

  const assessmentTagType = computed((): '' | 'success' | 'warning' | 'danger' | 'info' => {
    const s = detail.value?.assessment?.assessmentStatus;
    if (s === 1) return 'success';
    if (s === 2) return 'danger';
    if (s === 0) return 'warning';
    return 'info';
  });

  async function loadDetail(leadCode: string) {
    detailLoading.value = true;
    try {
      detail.value = await leadValueApi.leadDetail(leadCode);
      selectedLeadCode.value = leadCode;
      loadOpLog(leadCode);
    } catch (err: unknown) {
      detail.value = null;
      ElMessage.error((err as { message?: string })?.message || '加载详情失败');
    } finally {
      detailLoading.value = false;
    }
  }

  const opLogRecords = ref<LeadOperationLogItem[]>([]);
  const opLogLoading = ref(false);

  async function loadOpLog(leadCode: string) {
    opLogRecords.value = [];
    opLogLoading.value = true;
    try {
      const resp = await leadValueApi.operationLogs(leadCode);
      opLogRecords.value = resp?.records || [];
    } catch (err: unknown) {
      console.warn('[leadValue] load op log failed', err);
    } finally {
      opLogLoading.value = false;
    }
  }

  function handleRowClick(row: { leadCode: string }) {
    if (!row?.leadCode || row.leadCode === selectedLeadCode.value) return;
    loadDetail(row.leadCode);
  }

  async function handleReview() {
    if (!reviewFormRef.value) return;
    await reviewFormRef.value.validate(async (valid) => {
      if (!valid) return;
      reviewLoading.value = true;
      try {
        await leadValueApi.review({ ...reviewForm.value, leadCode: selectedLeadCode.value });
        ElMessage.success('评审提交成功');
        refreshList();
        if (selectedLeadCode.value) loadDetail(selectedLeadCode.value);
      } catch (err: unknown) {
        ElMessage.error((err as { message?: string })?.message || '评审提交失败');
      } finally {
        reviewLoading.value = false;
      }
    });
  }

  async function handleTransfer() {
    if (!transferFormRef.value) return;
    await transferFormRef.value.validate(async (valid) => {
      if (!valid) return;
      transferLoading.value = true;
      try {
        await leadValueApi.bpTransfer({ ...transferForm.value, leadCode: selectedLeadCode.value });
        ElMessage.success('转交成功');
        if (selectedLeadCode.value) loadDetail(selectedLeadCode.value);
      } catch (err: unknown) {
        ElMessage.error((err as { message?: string })?.message || '转交失败');
      } finally {
        transferLoading.value = false;
      }
    });
  }

  async function handleConfirm() {
    if (!confirmFormRef.value) return;
    await confirmFormRef.value.validate(async (valid) => {
      if (!valid) return;
      confirmLoading.value = true;
      try {
        await leadValueApi.bpConfirm({ ...confirmForm.value, leadCode: selectedLeadCode.value });
        ElMessage.success('确认成功，已进入需求方案阶段');
        refreshList();
        if (selectedLeadCode.value) loadDetail(selectedLeadCode.value);
      } catch (err: unknown) {
        ElMessage.error((err as { message?: string })?.message || '确认失败');
      } finally {
        confirmLoading.value = false;
      }
    });
  }

  watch(selectedLeadCode, (value) => {
    bpFormMode.value = 'confirm';
    reviewForm.value = { leadCode: value, rating: '', reviewConclusion: '', productLineOwner: '', reviewOpinion: '' };
    transferForm.value = { leadCode: value, newBpOwner: '', reason: '' };
    confirmForm.value = { leadCode: value, productManager: '', remark: '' };
    if (!value || !tableRef.value?.setCurrentRow) return;
    const target = listData.value?.find((r) => r.leadCode === value);
    if (target) tableRef.value.setCurrentRow(target);
  });
</script>

<style scoped lang="scss">
  .lead-page {
    padding: 12px;
    height: calc(100vh - 92px);
    min-height: 620px;
  }

  :deep(.lead-row-clickable) {
    cursor: pointer;
  }

  .ai-block {
    margin-top: 18px;
    padding: 14px 16px;
    background: #fafbfd;
    border-radius: 8px;
    border: 1px solid #edf0f5;
  }

  .ai-block-header {
    display: flex;
    align-items: center;
    gap: 10px;
    margin-bottom: 10px;
  }

  .ai-block-action {
    margin-left: auto;
  }

  .lead-grid {
    display: grid;
    grid-template-columns: 360px minmax(0, 1fr) 320px;
    gap: 16px;
    height: 100%;
  }

  .lead-middle {
    min-height: 0;
    display: flex;
    flex-direction: column;
    height: 100%;
  }

  .lead-middle .panel-card {
    flex: 1;
    min-height: 0;
  }

  .ops-card {
    height: 100%;

    :deep(.el-card__body) {
      padding: 16px;
    }
  }

  .ops-header {
    display: flex;
    align-items: center;
    justify-content: space-between;
  }

  .ops-title {
    font-size: 14px;
    font-weight: 600;
    color: #1f2329;
  }

  .ops-tabs {
    display: flex;
    flex-wrap: wrap;
    gap: 8px;
    margin-bottom: 16px;
  }

  .ops-section-title {
    display: flex;
    align-items: center;
    justify-content: space-between;
    font-size: 13px;
    font-weight: 600;
    color: #1f2329;
    margin-bottom: 12px;
  }

  .ops-form {
    display: flex;
    flex-direction: column;
    gap: 4px;
  }

  .lead-left {
    min-height: 0;
    height: 100%;
    padding-right: 4px;
    border-right: 1px solid #edf0f5;
    display: flex;
    flex-direction: column;

    :deep(.list-container) {
      flex: 1;
      min-height: 0;
      display: flex;
      flex-direction: column;
    }

    :deep(.list-table) {
      flex: 1;
      min-height: 0;
      margin: 0;
      border-radius: 0 0 10px 10px;
    }

    :deep(.list-search-wrapper) {
      border-radius: 8px 8px 0 0;
    }

    :deep(.new-custom) {
      display: none;
    }

    :deep(.icon-Root-tyshuaxin-1),
    :deep(.icon-quanping),
    :deep(.icon-shouqiquanping) {
      display: none;
    }

    :deep(.head-tools) {
      gap: 0;
    }
  }

  .lead-right {
    min-height: 0;
    display: flex;
    flex-direction: column;
    height: 100%;
  }

  .lead-right .panel-card {
    flex: 1;
    min-height: 0;
  }

  .panel-card {
    height: 100%;
    border-radius: 12px;
    overflow: hidden;

    :deep(.el-card__body) {
      height: calc(100% - 24px);
      overflow: auto;
      padding-bottom: 20px;
    }
  }

  .detail-card {
    :deep(.el-card__header) {
      display: none;
    }
    :deep(.el-card__body) {
      height: 100%;
      padding: 16px 20px 24px;
    }
  }

  .detail-header {
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
    gap: 16px;
    margin-bottom: 12px;
  }

  .detail-header-main {
    flex: 1;
    min-width: 0;
  }

  .detail-title {
    font-size: 18px;
    font-weight: 600;
    color: #1f2329;
    line-height: 1.5;
    word-break: break-word;
    margin-bottom: 6px;
  }

  .detail-meta {
    display: flex;
    align-items: center;
    gap: 8px;
    flex-wrap: wrap;
  }

  .detail-code {
    font-size: 12px;
    color: #8a94a6;
  }

  .detail-actions {
    display: flex;
    gap: 8px;
    flex-shrink: 0;
    flex-wrap: wrap;
    justify-content: flex-end;
  }

  .info-grid {
    display: grid;
    grid-template-columns: repeat(2, minmax(0, 1fr));
    gap: 10px 20px;
    margin-bottom: 12px;
  }

  .info-item {
    display: flex;
    gap: 8px;
    align-items: baseline;
    font-size: 13px;
    color: #4e5969;
  }

  .info-label {
    color: #8a94a6;
    flex-shrink: 0;
    font-size: 12px;
  }

  .detail-block {
    margin-top: 14px;
  }

  .block-label {
    font-size: 13px;
    font-weight: 600;
    color: #1f2329;
    margin-bottom: 6px;
  }

  .block-value {
    font-size: 13px;
    color: #4e5969;
    line-height: 1.7;
  }

  .pre-wrap {
    white-space: pre-wrap;
  }

  .review-block {
    padding: 12px 14px;
    background: #f7f9fc;
    border-radius: 8px;
  }

  .review-opinion {
    margin-top: 8px;
    font-size: 13px;
    color: #4e5969;
    line-height: 1.7;
  }

  .panel-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  .panel-title {
    font-size: 14px;
    font-weight: 600;
    color: #1f2329;
  }

  .lead-markdown {
    height: 100%;
    overflow: auto;
  }

  .error-tip {
    margin-top: 10px;
    color: var(--el-color-danger);
    font-size: 12px;
  }

  .lead-name-cell {
    display: flex;
    flex-direction: column;
    gap: 3px;
    min-width: 0;
  }

  .lead-name {
    color: var(--el-color-primary);
    line-height: 1.5;
    word-break: break-word;
  }

  .lead-name--ellipsis {
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
    word-break: normal;
  }

  .lead-code-meta {
    font-size: 11px;
    color: #8a94a6;
    display: block;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
  }

  .muted {
    color: #8a94a6;
    font-size: 12px;
  }

  .load-more-tip {
    text-align: center;
    padding: 8px 0;
    font-size: 12px;
    color: #8a94a6;
  }

  .attachment-list {
    margin: 0;
    padding-left: 0;
    list-style: none;
    display: flex;
    flex-direction: column;
    gap: 4px;
  }

  .attachment-list li a {
    color: var(--el-color-primary);
    text-decoration: none;
    font-size: 13px;
  }

  .attachment-list li a:hover {
    text-decoration: underline;
  }

  .op-log-block {
    margin-top: 18px;
    padding: 14px 16px;
    background: #fafbfd;
    border-radius: 8px;
    border: 1px solid #edf0f5;
  }

  .op-log-empty {
    text-align: center;
    color: #8a94a6;
    font-size: 13px;
    padding: 16px 0;
  }

  .op-log-timeline {
    list-style: none;
    margin: 0;
    padding: 8px 0 8px 16px;
    border-left: 2px solid #edf0f5;
  }

  .op-log-item {
    position: relative;
    padding: 0 0 14px 16px;
  }

  .op-log-item:last-child {
    padding-bottom: 0;
  }

  .op-log-dot {
    position: absolute;
    left: -22px;
    top: 6px;
    width: 10px;
    height: 10px;
    border-radius: 50%;
    background: var(--el-color-primary);
    border: 2px solid #fff;
    box-shadow: 0 0 0 1px var(--el-color-primary);
  }

  .op-log-header {
    display: flex;
    justify-content: space-between;
    align-items: baseline;
    gap: 8px;
    margin-bottom: 4px;
  }

  .op-log-operator {
    font-size: 13px;
    font-weight: 600;
    color: #1f2329;
  }

  .op-log-time {
    font-size: 11px;
    color: #8a94a6;
  }

  .op-log-text {
    font-size: 13px;
    color: #4e5969;
    line-height: 1.5;
  }

  @media (max-width: 1440px) {
    .lead-grid {
      grid-template-columns: 320px minmax(0, 1fr) 280px;
    }
  }

  @media (max-width: 1200px) {
    .lead-grid {
      grid-template-columns: 300px minmax(0, 1fr) 260px;
    }

    .info-grid {
      grid-template-columns: 1fr;
    }
  }
</style>
