<template>
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
        style="width: 180px"
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
      <el-select
        v-model="search.demandTypeList"
        placeholder="需求类型"
        multiple
        collapse-tags
        clearable
        style="width: 180px"
      >
        <el-option
          v-for="opt in DEMAND_TYPE_OPTIONS"
          :key="opt.value"
          :label="opt.label"
          :value="opt.value"
        />
      </el-select>
      <DeptCascaderTwoLevel v-model="search.deptId" placeholder="业务线" style="width: 220px" />
    </template>
    <template #search-actions>
      <el-button type="primary" @click="goCreate">提交用户需求提案</el-button>
    </template>
    <template #default="{ tableHeight }">
      <el-table
        v-loading="listLoading"
        :data="listData || []"
        :height="tableHeight"
        class-name="table-row-dashed"
      >
        <el-table-column label="线索编码" prop="leadCode" width="170">
          <template #default="{ row }">
            <el-tooltip :content="row.leadCode" placement="top" :show-after="300">
              <a class="lead-code-link" @click="goDetail(row.leadCode)">{{ row.leadCode }}</a>
            </el-tooltip>
          </template>
        </el-table-column>
        <el-table-column label="需求名称" prop="demandName" min-width="220" show-overflow-tooltip>
          <template #default="{ row }">
            <a class="lead-link" @click="goDetail(row.leadCode)">{{ row.demandName || '--' }}</a>
          </template>
        </el-table-column>
        <el-table-column label="需求类型" prop="demandType" width="140">
          <template #default="{ row }">
            {{ DEMAND_TYPE_MAP[row.demandType] || row.demandType || '--' }}
          </template>
        </el-table-column>
        <el-table-column label="业务线" prop="deptPath" min-width="180" show-overflow-tooltip>
          <template #default="{ row }">
            {{ row.deptPath || '--' }}
          </template>
        </el-table-column>
        <el-table-column label="一级部门长" prop="bizLineDeptOwnerName" width="110">
          <template #default="{ row }">
            {{ row.bizLineDeptOwnerName || '--' }}
          </template>
        </el-table-column>
        <el-table-column label="紧急程度" prop="urgency" width="100">
          <template #default="{ row }">
            {{ URGENCY_MAP[row.urgency] || row.urgency || '--' }}
          </template>
        </el-table-column>
        <el-table-column label="当前节点" prop="nodeName" width="130">
          <template #default="{ row }">
            <el-tag :type="nodeTagType(row.node)" size="small">{{ row.nodeName || '--' }}</el-tag>
          </template>
        </el-table-column>
        <el-table-column label="提案状态" prop="subStatusName" width="100">
          <template #default="{ row }">
            <el-tag :type="subStatusTagType(row.subStatus)" size="small">
              {{ row.subStatusName || '--' }}
            </el-tag>
          </template>
        </el-table-column>
        <el-table-column label="评级" prop="rating" width="80">
          <template #default="{ row }">
            <el-tag v-if="row.rating" :type="ratingTagType(row.rating)" size="small">
              {{ row.rating }}
            </el-tag>
            <span v-else>--</span>
          </template>
        </el-table-column>
        <el-table-column label="数字化BP" prop="bpOwnerName" width="110">
          <template #default="{ row }">{{ row.bpOwnerName || '--' }}</template>
        </el-table-column>
        <el-table-column label="IT 产品" prop="productManagerName" width="110">
          <template #default="{ row }">{{ row.productManagerName || '--' }}</template>
        </el-table-column>
        <el-table-column label="提交人" prop="creatorName" width="100" />
        <el-table-column label="提交时间" prop="createTime" width="170" />
        <el-table-column label="操作" width="160" fixed="right">
          <template #default="{ row }">
            <el-button link type="primary" size="small" @click="goDetail(row.leadCode)">
              查看
            </el-button>
            <el-button link type="primary" size="small" @click="openLogDrawer(row)">日志</el-button>
          </template>
        </el-table-column>
      </el-table>
      <div class="pagination-bar">
        <el-pagination
          v-model:current-page="currentPage"
          v-model:page-size="pageSize"
          :total="total"
          :page-sizes="[10, 20, 50]"
          layout="total, sizes, prev, pager, next, jumper"
          background
          @current-change="fetchList"
          @size-change="onSizeChange"
        />
      </div>
    </template>
  </KeenList>

  <el-drawer
    v-model="logDrawerVisible"
    :title="logDrawerTitle"
    direction="rtl"
    size="480px"
    :destroy-on-close="true"
  >
    <div v-loading="logLoading" class="log-drawer-body">
      <div v-if="logRecords.length === 0 && !logLoading" class="log-empty">暂无操作日志</div>
      <ul v-else class="log-timeline">
        <li v-for="(item, idx) in logRecords" :key="idx" class="log-timeline-item">
          <div class="log-timeline-dot" />
          <div class="log-timeline-content">
            <div class="log-timeline-header">
              <span class="log-operator">{{ item.operatorName || item.operator || '系统' }}</span>
              <span class="log-time">{{ item.createTime || '--' }}</span>
            </div>
            <div class="log-text">{{ item.content || '--' }}</div>
          </div>
        </li>
      </ul>
    </div>
  </el-drawer>
</template>

<script lang="ts" setup name="myDemandLeadList">
  import { computed, onActivated, ref, watch } from 'vue';
  import { useRoute, useRouter } from 'vue-router';
  import { ElMessage } from 'element-plus';
  import KeenList from '@/components/KeenList/index.vue';
  import DeptCascaderTwoLevel from '@/views/lute-os/components/DeptCascaderTwoLevel/index.vue';
  import {
    DEMAND_TYPE_OPTIONS,
    DEMAND_TYPE_MAP,
    URGENCY_MAP,
    LEAD_NODE_FILTER_OPTIONS,
    LEAD_NODE_NAME,
    LEAD_SUB_STATUS_OPTIONS,
    LEAD_SUB_STATUS_NAME,
    nodeTagType,
    subStatusTagType,
    ratingTagType,
  } from '@/views/lute-os/demandManage/leadConstants';
  import { leadValueApi, type LeadListItem, type LeadOperationLogItem } from '@/api/leadValueApi';

  const router = useRouter();
  const route = useRoute();

  const search = ref({
    keyword: '',
    demandTypeList: [] as string[],
    deptId: null as string | null,
    nodeList: [] as string[],
    subStatusList: [] as string[],
  });
  const listData = ref<LeadListItem[]>([]);
  const listLoading = ref(false);
  const currentPage = ref(1);
  const pageSize = ref(20);
  const total = ref(0);

  async function fetchList() {
    listLoading.value = true;
    try {
      const resp = await leadValueApi.list({
        keyword: search.value.keyword || undefined,
        demandTypeList: search.value.demandTypeList?.length
          ? search.value.demandTypeList
          : undefined,
        bizLineList: search.value.deptId ? [search.value.deptId] : undefined,
        nodeList: search.value.nodeList?.length ? search.value.nodeList : undefined,
        subStatusList: search.value.subStatusList?.length ? search.value.subStatusList : undefined,
        onlyMine: true,
        pageNum: currentPage.value,
        pageSize: pageSize.value,
      });
      listData.value = resp?.records || [];
      total.value = resp?.total || 0;
    } catch (err: unknown) {
      ElMessage.error((err as { message?: string })?.message || '加载列表失败');
    } finally {
      listLoading.value = false;
    }
  }

  function refreshList() {
    fetchList();
  }

  function onSizeChange(size: number) {
    pageSize.value = size;
    currentPage.value = 1;
    fetchList();
  }

  watch(
    () => [
      search.value.keyword,
      search.value.demandTypeList,
      search.value.deptId,
      search.value.nodeList,
      search.value.subStatusList,
    ],
    () => {
      currentPage.value = 1;
      fetchList();

      onActivated(() => {
        fetchList();
      });

      watch(
        () => route.query._t,
        (val) => {
          if (val) fetchList();
        }
      );
    },
    { deep: true }
  );

  fetchList();

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
    if (search.value.demandTypeList?.length) {
      result.push({
        key: 'demandTypeList',
        label: '类型',
        value: search.value.demandTypeList.map((v) => DEMAND_TYPE_MAP[v] || v).join('、'),
      });
    }
    if (search.value.deptId) {
      result.push({ key: 'deptId', label: '业务线', value: String(search.value.deptId) });
    }
    return result;
  });

  function handleReset() {
    search.value = {
      keyword: '',
      demandTypeList: [],
      deptId: null,
      nodeList: [],
      subStatusList: [],
    };
    currentPage.value = 1;
    fetchList();
  }

  function handleResetByKey(key: string) {
    const s = search.value as Record<string, unknown>;
    if (Array.isArray(s[key])) s[key] = [];
    else s[key] = key === 'deptId' ? null : '';
  }

  function goCreate() {
    router.push({ name: 'demandLeadCreate' });
  }

  function goDetail(leadCode: string) {
    router.push({ name: 'demandLeadDetail', params: { leadCode } });
  }

  const logDrawerVisible = ref(false);
  const logDrawerTitle = ref('操作日志');
  const logLoading = ref(false);
  const logRecords = ref<LeadOperationLogItem[]>([]);

  async function openLogDrawer(row: LeadListItem) {
    logDrawerTitle.value = `操作日志 - ${row.demandName || row.leadCode}`;
    logRecords.value = [];
    logDrawerVisible.value = true;
    logLoading.value = true;
    try {
      const resp = await leadValueApi.operationLogs(row.leadCode);
      logRecords.value = resp?.records || [];
    } catch (err: unknown) {
      ElMessage.error((err as { message?: string })?.message || '加载操作日志失败');
    } finally {
      logLoading.value = false;
    }
  }
</script>

<style scoped lang="scss">
  .lead-link {
    color: var(--el-table-text-color);
  }

  .lead-code-link {
    color: var(--el-color-primary);
    cursor: pointer;
    display: inline-block;
    max-width: 100%;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    vertical-align: middle;
  }

  .pagination-bar {
    display: flex;
    justify-content: flex-end;
    padding: 12px 16px;
  }

  .log-drawer-body {
    padding: 0 4px;
    min-height: 200px;
  }

  .log-empty {
    text-align: center;
    color: #8a94a6;
    padding: 40px 0;
    font-size: 13px;
  }

  .log-timeline {
    list-style: none;
    margin: 0;
    padding: 8px 0 8px 16px;
    border-left: 2px solid #edf0f5;
  }

  .log-timeline-item {
    position: relative;
    padding: 0 0 18px 16px;
  }

  .log-timeline-item:last-child {
    padding-bottom: 0;
  }

  .log-timeline-dot {
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

  .log-timeline-header {
    display: flex;
    justify-content: space-between;
    align-items: baseline;
    gap: 8px;
    margin-bottom: 4px;
  }

  .log-operator {
    font-size: 13px;
    font-weight: 600;
    color: #1f2329;
  }

  .log-time {
    font-size: 11px;
    color: #8a94a6;
  }

  .log-text {
    font-size: 13px;
    color: #4e5969;
    line-height: 1.5;
  }
</style>
