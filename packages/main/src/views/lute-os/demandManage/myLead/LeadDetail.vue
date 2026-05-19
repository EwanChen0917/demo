<template>
  <div class="lead-page">
    <div class="lead-grid">
      <div class="lead-left">
        <KeenList
          :selected-num="0"
          :selected-list="selectedList"
          @resetSearch="handleReset"
          @refresh="refreshList"
          @clearAll="handleReset"
        >
          <template #search>
            <el-input
              v-model="search.keyword"
              placeholder="线索编码或需求名称"
              clearable
              style="width: 220px"
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
              <el-option
                v-for="opt in LEAD_NODE_FILTER_OPTIONS"
                :key="opt.code"
                :label="opt.name"
                :value="opt.code"
              />
            </el-select>
            <el-select
              v-model="search.subStatusList"
              placeholder="提案状态"
              multiple
              collapse-tags
              clearable
              style="width: 140px"
            >
              <el-option
                v-for="opt in LEAD_SUB_STATUS_OPTIONS"
                :key="opt.code"
                :label="opt.name"
                :value="opt.code"
              />
            </el-select>
          </template>
          <template #search-actions>
            <el-button type="primary" @click="goCreate">提交用户需求提案</el-button>
          </template>
          <template #default="{ tableHeight }">
            <el-table
              ref="tableRef"
              v-loading="listLoading"
              :data="listData"
              :height="tableHeight"
              highlight-current-row
              row-key="leadCode"
              :current-row-key="selectedLeadCode || undefined"
              row-class-name="lead-row-clickable"
              @row-click="handleRowClick"
            >
              <el-table-column label="需求标题" prop="demandName" min-width="180">
                <template #default="{ row }">
                  <div class="lead-name-cell">
                    <div class="lead-name lead-name--ellipsis">{{ row.demandName || '--' }}</div>
                    <div class="lead-code-meta">{{ row.leadCode }}</div>
                  </div>
                </template>
              </el-table-column>
              <el-table-column label="节点" prop="nodeName" width="120">
                <template #default="{ row }">
                  <el-tag :type="nodeTagType(row.node)" size="small">
                    {{ row.nodeName || '--' }}
                  </el-tag>
                </template>
              </el-table-column>
              <el-table-column label="状态" prop="subStatusName" width="90">
                <template #default="{ row }">
                  <el-tag :type="subStatusTagType(row.subStatus)" size="small">
                    {{ row.subStatusName || '--' }}
                  </el-tag>
                </template>
              </el-table-column>
            </el-table>
          </template>
        </KeenList>
      </div>

      <div class="lead-right">
        <el-card class="panel-card detail-card" v-loading="detailLoading">
          <template v-if="detail">
            <div class="detail-header">
              <div class="detail-title">{{ detail.basicInfo?.demandName || '--' }}</div>
              <div class="detail-meta">
                <span class="detail-code">{{ detail.leadCode }}</span>
                <el-tag :type="nodeTagType(detail.node)" size="small">
                  {{ detail.nodeName || '--' }}
                </el-tag>
                <el-tag :type="subStatusTagType(detail.subStatus)" size="small">
                  {{ detail.subStatusName || '--' }}
                </el-tag>
                <el-tag
                  v-if="detail.reviewInfo?.rating"
                  :type="ratingTagType(detail.reviewInfo.rating)"
                  size="small"
                >
                  {{ detail.reviewInfo.rating }} 级
                </el-tag>
              </div>
            </div>

            <ProcessSteps :steps="detail.processSteps || []" />

            <el-card class="info-card" shadow="never">
              <template #header><span class="card-title">基础信息</span></template>
              <div class="info-grid">
                <div class="info-item">
                  <span class="info-label">需求类型</span>
                  <span>
                    {{
                      DEMAND_TYPE_MAP[detail.basicInfo?.demandType ?? ''] ||
                      detail.basicInfo?.demandType ||
                      '--'
                    }}
                  </span>
                </div>
                <div class="info-item">
                  <span class="info-label">业务线</span>
                  <span>{{ detail.basicInfo?.deptPath || '--' }}</span>
                </div>
                <div class="info-item">
                  <span class="info-label">紧急程度</span>
                  <span>
                    {{
                      URGENCY_MAP[detail.basicInfo?.urgency ?? ''] ||
                      detail.basicInfo?.urgency ||
                      '--'
                    }}
                  </span>
                </div>
                <div class="info-item">
                  <span class="info-label">影响人数</span>
                  <span>
                    {{
                      IMPACT_MAP[detail.basicInfo?.impactPeopleRange ?? ''] ||
                      detail.basicInfo?.impactPeopleRange ||
                      '--'
                    }}
                  </span>
                </div>
                <div class="info-item">
                  <span class="info-label">预期交付</span>
                  <span>{{ detail.basicInfo?.expectDeliveryTime || '--' }}</span>
                </div>
                <div class="info-item">
                  <span class="info-label">提交人</span>
                  <span>{{ detail.basicInfo?.creatorName || '--' }}</span>
                </div>
                <div class="info-item">
                  <span class="info-label">提交时间</span>
                  <span>{{ detail.basicInfo?.createTime || '--' }}</span>
                </div>
                <div class="info-item">
                  <span class="info-label">数字化BP</span>
                  <span>{{ detail.reviewInfo?.bpOwnerName || '--' }}</span>
                </div>
                <div class="info-item">
                  <span class="info-label">IT 产品</span>
                  <span>{{ detail.reviewInfo?.productManagerName || '--' }}</span>
                </div>
              </div>
            </el-card>

            <el-card class="info-card" shadow="never">
              <template #header><span class="card-title">需求内容</span></template>
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
                    <a v-if="att.url" :href="att.url" target="_blank" rel="noopener">
                      {{ att.name }}
                    </a>
                    <span v-else>{{ att.name }}</span>
                  </li>
                </ul>
              </div>
            </el-card>

            <el-card class="info-card" shadow="never">
              <template #header>
                <div class="feishu-header">
                  <span class="card-title">飞书项目需求</span>
                </div>
              </template>
              <div class="feishu-task-grid">
                <div
                  v-for="(item, idx) in (detail as any).feishuTasks"
                  :key="idx"
                  class="feishu-task-card"
                >
                  <div class="feishu-card-title">
                    {{ item.projectName || '--' }} - {{ item.productManagerName || '--' }}
                  </div>
                  <div class="feishu-card-body">
                    <div class="feishu-field">
                      <div class="feishu-label">飞书任务名称:</div>
                      <div class="feishu-value">{{ item.workItemName || '--' }}</div>
                    </div>
                    <div class="feishu-field">
                      <div class="feishu-label">任务状态:</div>
                      <div class="feishu-value status-highlight">
                        {{ item.currentStatusName || '--' }}
                      </div>
                    </div>
                    <div class="feishu-field">
                      <div class="feishu-label">开发负责人:</div>
                      <div class="feishu-value">{{ item.devOwnerName || '--' }}</div>
                    </div>
                  </div>
                </div>
              </div>
              <el-empty
                v-if="!(detail as any).feishuTasks?.length"
                description="暂无飞书项目需求"
                :image-size="60"
              />
            </el-card>

            <el-card v-if="detail.reviewInfo?.rating" class="info-card" shadow="never">
              <template #header><span class="card-title">评审结论</span></template>
              <div class="info-grid">
                <div class="info-item">
                  <span class="info-label">评级</span>
                  <el-tag :type="ratingTagType(detail.reviewInfo.rating)" size="small">
                    {{ detail.reviewInfo.rating }}
                  </el-tag>
                </div>
                <div class="info-item">
                  <span class="info-label">结论</span>
                  <span>
                    {{
                      CONCLUSION_MAP[detail.reviewInfo.reviewConclusion ?? ''] ||
                      detail.reviewInfo.reviewConclusion ||
                      '--'
                    }}
                  </span>
                </div>
                <div class="info-item">
                  <span class="info-label">评审时间</span>
                  <span>{{ detail.reviewInfo.reviewedAt || '--' }}</span>
                </div>
              </div>
              <div
                v-if="detail.reviewInfo.reviewOpinion"
                class="block-value pre-wrap review-opinion"
              >
                {{ detail.reviewInfo.reviewOpinion }}
              </div>
            </el-card>

            <el-card v-if="detail.reviewInfo?.bpConfirmRemark" class="info-card" shadow="never">
              <template #header><span class="card-title">BP 确认备注</span></template>
              <div class="block-value pre-wrap">{{ detail.reviewInfo.bpConfirmRemark }}</div>
            </el-card>

            <el-card class="info-card" shadow="never">
              <template #header><span class="card-title">操作日志</span></template>
              <div v-loading="opLogLoading">
                <el-empty
                  v-if="!opLogLoading && opLogRecords.length === 0"
                  description="暂无操作日志"
                  :image-size="60"
                />
                <ul v-else class="op-log-timeline">
                  <li v-for="(item, idx) in opLogRecords" :key="idx" class="op-log-item">
                    <div class="op-log-dot" />
                    <div class="op-log-content">
                      <div class="op-log-header">
                        <span class="op-log-operator">
                          {{ item.operatorName || item.operator || '系统' }}
                        </span>
                        <span class="op-log-time">{{ item.createTime || '--' }}</span>
                      </div>
                      <div class="op-log-text">{{ item.content || '--' }}</div>
                    </div>
                  </li>
                </ul>
              </div>
            </el-card>

            <el-card class="info-card" shadow="never">
              <template #header>
                <div class="ai-header">
                  <span class="card-title">AI 价值评估</span>
                  <el-tag
                    v-if="
                      detail.assessment?.assessmentStatus !== undefined &&
                      detail.assessment?.assessmentStatus !== null
                    "
                    :type="assessmentTagType"
                    size="small"
                  >
                    {{ assessmentStatusText }}
                  </el-tag>
                </div>
              </template>
              <div v-if="detail.assessment?.assessmentMarkdown" class="lead-markdown">
                <Markdown :source="detail.assessment.assessmentMarkdown" />
              </div>
              <el-empty v-else description="暂无评审结果" />
              <div v-if="detail.assessment?.assessmentErrorMsg" class="error-tip">
                {{ detail.assessment.assessmentErrorMsg }}
              </div>
            </el-card>
          </template>
          <el-empty v-else-if="!detailLoading" description="请选择左侧线索查看详情" />
        </el-card>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup name="demandLeadDetail">
  import { computed, onMounted, ref, watch } from 'vue';
  import { useRoute, useRouter } from 'vue-router';
  import { ElMessage } from 'element-plus';
  import Markdown from 'vue3-markdown-it';
  import KeenList from '@/components/KeenList/index.vue';
  import ProcessSteps from '@/views/lute-os/components/LeadProcessSteps/index.vue';
  import {
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
    type LeadDetailResp,
    type LeadListItem,
    type LeadOperationLogItem,
  } from '@/api/leadValueApi';

  const route = useRoute();
  const router = useRouter();

  const tableRef = ref();
  const listData = ref<LeadListItem[]>([]);
  const listLoading = ref(false);
  const search = ref({
    keyword: '',
    nodeList: [] as string[],
    subStatusList: [] as string[],
  });
  const PAGE_SIZE = 50;

  const detail = ref<LeadDetailResp | null>(null);
  const detailLoading = ref(false);
  const selectedLeadCode = ref('');

  async function fetchList() {
    listLoading.value = true;
    try {
      const resp = await leadValueApi.list({
        keyword: search.value.keyword || undefined,
        nodeList: search.value.nodeList?.length ? search.value.nodeList : undefined,
        subStatusList: search.value.subStatusList?.length ? search.value.subStatusList : undefined,
        onlyMine: true,
        pageNum: 1,
        pageSize: PAGE_SIZE,
      });
      listData.value = resp?.records || [];
      if (selectedLeadCode.value) return;
      const initial = String(route.params.leadCode || '');
      const target =
        (initial && listData.value.find((r) => r.leadCode === initial)) || listData.value[0];
      if (target) {
        selectedLeadCode.value = target.leadCode;
        loadDetail(target.leadCode);
      }
    } catch (err: unknown) {
      ElMessage.error((err as { message?: string })?.message || '加载列表失败');
    } finally {
      listLoading.value = false;
    }
  }

  function refreshList() {
    fetchList();
  }

  async function loadDetail(leadCode: string) {
    detailLoading.value = true;
    try {
      detail.value = await leadValueApi.leadDetail(leadCode);
      selectedLeadCode.value = leadCode;

      // 获取飞书项目需求数据
      leadValueApi
        .leadDetailByClueCode(leadCode)
        .then((res) => {
          if (detail.value && res?.records) {
            (detail.value as any).feishuTasks = res.records;
          }
        })
        .catch((err) => {
          console.warn('[LeadDetail] fetch feishu tasks failed', err);
        });

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
    } finally {
      opLogLoading.value = false;
    }
  }

  function handleRowClick(row: { leadCode: string }) {
    if (!row?.leadCode || row.leadCode === selectedLeadCode.value) return;
    loadDetail(row.leadCode);
  }

  const selectedList = computed(() => {
    const result: Array<{ key: string; label: string; value: string }> = [];
    if (search.value.keyword)
      result.push({ key: 'keyword', label: '关键词', value: search.value.keyword });
    if (search.value.nodeList?.length) {
      result.push({
        key: 'nodeList',
        label: '节点',
        value: search.value.nodeList.map((v) => LEAD_NODE_NAME[v] || v).join('、'),
      });
    }
    if (search.value.subStatusList?.length) {
      result.push({
        key: 'subStatusList',
        label: '提案状态',
        value: search.value.subStatusList.map((v) => LEAD_SUB_STATUS_NAME[v] || v).join('、'),
      });
    }
    return result;
  });

  function handleReset() {
    search.value = { keyword: '', nodeList: [], subStatusList: [] };
    fetchList();
  }

  watch(search, () => fetchList(), { deep: true });

  watch(selectedLeadCode, (value) => {
    if (!value || !tableRef.value?.setCurrentRow) return;
    const target = listData.value?.find((r) => r.leadCode === value);
    if (target) tableRef.value.setCurrentRow(target);
  });

  function goCreate() {
    router.push({ name: 'demandLeadCreate' });
  }

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

  onMounted(() => {
    fetchList();
  });
</script>

<style scoped lang="scss">
  .lead-page {
    padding: 12px;
    height: calc(100vh - 92px);
    min-height: 620px;
  }

  .lead-grid {
    display: grid;
    grid-template-columns: 380px minmax(0, 1fr);
    gap: 16px;
    height: 100%;
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
    border-radius: 12px;
    overflow: hidden;

    :deep(.el-card__body) {
      height: calc(100% - 24px);
      overflow: auto;
      padding: 16px 20px 24px;
    }
  }

  :deep(.lead-row-clickable) {
    cursor: pointer;
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
  }

  .lead-code-meta {
    font-size: 11px;
    color: #8a94a6;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
  }

  .detail-header {
    margin-bottom: 12px;
  }

  .detail-title {
    font-size: 18px;
    font-weight: 600;
    color: #1f2329;
    line-height: 1.5;
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

  .info-card {
    margin-bottom: 12px;
    border-radius: 8px;
  }

  .card-title {
    font-size: 14px;
    font-weight: 600;
    color: #1f2329;
  }

  .info-grid {
    display: grid;
    grid-template-columns: repeat(3, minmax(0, 1fr));
    gap: 10px 20px;
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
    margin-bottom: 12px;
  }

  .detail-block:last-child {
    margin-bottom: 0;
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

  .review-opinion {
    margin-top: 10px;
    padding: 10px 12px;
    background: #f7f9fc;
    border-radius: 6px;
  }

  .ai-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  .lead-markdown {
    max-height: 600px;
    overflow: auto;
  }

  .error-tip {
    margin-top: 10px;
    color: var(--el-color-danger);
    font-size: 12px;
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

  .feishu-header {
    display: flex;
    align-items: baseline;
    gap: 12px;
  }

  .feishu-header .card-subtitle {
    font-size: 12px;
    color: #8a94a6;
    font-weight: normal;
  }

  .feishu-task-grid {
    display: grid;
    grid-template-columns: repeat(3, minmax(0, 1fr));
    gap: 16px;
  }

  .feishu-task-card {
    background: #f7f9fc;
    border-radius: 8px;
    padding: 16px;
    border: 1px solid #edf0f5;
  }

  .feishu-card-title {
    font-size: 14px;
    font-weight: 600;
    color: #1f2329;
    margin-bottom: 16px;
  }

  .feishu-card-body {
    display: flex;
    flex-direction: column;
    gap: 12px;
  }

  .feishu-field {
    display: flex;
    flex-direction: column;
    gap: 4px;
  }

  .feishu-label {
    font-size: 12px;
    color: #8a94a6;
  }

  .feishu-value {
    font-size: 13px;
    color: #1f2329;
    line-height: 1.5;
  }

  .feishu-value.status-highlight {
    font-weight: 600;
    color: #1f2329;
  }

  @media (max-width: 1580px) {
    .feishu-task-grid {
      grid-template-columns: repeat(2, minmax(0, 1fr));
    }
  }

  @media (max-width: 1280px) {
    .info-grid {
      grid-template-columns: repeat(2, minmax(0, 1fr));
    }
    .feishu-task-grid {
      grid-template-columns: 1fr;
    }
  }
</style>
