<template>
  <el-tabs v-model="activeTab" class="tabs">
    <el-tab-pane
      v-for="tab in tabPriorityList"
      :key="tab.key"
      :label="`${tab.label}（${tabCountMap[tab.key] || 0}）`"
      :name="tab.key"
    />
  </el-tabs>

  <KeenList :selected-num="0" :selected-list="[]" @resetSearch="reset" @refresh="runQuery">
    <template #search>
      <el-input
        v-model="search.keyword"
        placeholder="需求标题/需求内容"
        clearable
        style="width: 180px"
      />
    </template>
    <template #filters>
      <DeptMember v-model="search.creator" placeholder="需求提出人" />
      <ProductLineSelect v-model="search.productLine" placeholder="产品品线" clearable filterable />
      <el-select
        id="categorySelectRef"
        ref="categorySelectRef"
        v-model="search.categoryCode"
        filterable
        clearable
        placeholder="请选产品分类"
      >
        <el-option
          v-for="item in categoryOptions"
          :value="item.categoryCode"
          :label="item.categoryName"
          :key="item.categoryCode"
        />
      </el-select>
      <el-select v-model="search.demandType" placeholder="需求类型" clearable>
        <el-option
          v-for="(value, key) in DemandTypeMap"
          :key="key"
          :label="value"
          :value="Number(key)"
        />
      </el-select>
      <el-select v-model="search.demandProperty" placeholder="需求属性" clearable>
        <el-option
          v-for="(value, key) in DemandPropertyMap"
          :key="key"
          :label="value"
          :value="Number(key)"
        />
      </el-select>
      <DeptMember
        style="width: 220px"
        v-model="search.demandHandlerList"
        multiple
        collapse-tags
        max-collapse-tags="1"
        placeholder="需求执行人"
        teleported
        v-if="activeTab !== 'reviewing' && activeTab !== 'rejected'"
      />
      <el-select
        v-model="search.delayFlag"
        placeholder="是否延期"
        clearable
        v-if="activeTab !== 'reviewing' && activeTab !== 'rejected' && activeTab !== 'executing'"
      >
        <el-option label="是" :value="1" />
        <el-option label="否" :value="0" />
      </el-select>
    </template>
    <el-table
      ref="tableRef"
      v-loading="listLoading"
      :data="listData?.demandList"
      :key="activeTab"
      class-name="table-row-dashed"
      @sort-change="onSortChange"
      :height="tableHeight"
    >
      <!-- 公共列 -->
      <el-table-column label="需求标题" prop="demandTitle" fixed="left" width="200">
        <template #default="{ row }">
          <el-tooltip effect="dark" :content="row.demandTitle" placement="top-start">
            <a @click="goToDetail(row.demandCode)" type="primary" class="text-ellipsis">
              {{ row.demandTitle }}
            </a>
          </el-tooltip>
        </template>
      </el-table-column>
      <el-table-column label="需求创建人" prop="creatorName" width="120" />
      <el-table-column label="需求创建时间" prop="createTime" width="150" sortable="custom" />
      <el-table-column label="期望完成时间" prop="expectFinishTime" width="150" sortable="custom" />
      <!-- <el-table-column label="产品中文名" prop="productTitle" width="180">
              <template #default="{ row }">
                <el-tooltip effect="dark" :content="row.productTitle" placement="top-start">
                  <span class="text-ellipsis">{{ row.productTitle }}</span>
                </el-tooltip>
              </template>
            </el-table-column> -->
      <el-table-column label="产品品线" prop="productLineDesc" width="150">
        <template #default="{ row }">
          <el-tooltip effect="dark" :content="row.productLineDesc" placement="top-start">
            <span class="text-ellipsis">{{ row.productLineDesc }}</span>
          </el-tooltip>
        </template>
      </el-table-column>
      <el-table-column label="产品定级" prop="productLevel" width="150">
        <template #default="{ row }">
          <el-tooltip effect="dark" :content="row.productLevel" placement="top-start">
            <span class="text-ellipsis">{{ row.productLevel }}</span>
          </el-tooltip>
        </template>
      </el-table-column>
      <el-table-column label="产品分类" prop="categoryDesc" width="220">
        <template #default="{ row }">
          <el-tooltip effect="dark" :content="row.categoryDesc" placement="top-start">
            <span class="text-ellipsis">{{ row.categoryDesc }}</span>
          </el-tooltip>
        </template>
      </el-table-column>
      <el-table-column label="需求类型" prop="demandTypeDesc" width="140" />
      <el-table-column label="需求属性" prop="demandPropertyDesc" width="140" />
      <el-table-column
        label="需求附件"
        prop="userResearchFile.name"
        width="180"
        v-if="activeTab === 'reviewing' || activeTab === 'rejected'"
      >
        <template #default="{ row }">
          <el-tooltip effect="dark" :content="row.demandFile?.fileName" placement="top-start">
            <a
              type="primary"
              href="javascript:void(0);"
              @click="handleFileClick(row.demandFile)"
              style="cursor: pointer; color: #3e97ff"
            >
              {{ row.demandFile?.fileName }}
            </a>
          </el-tooltip>
        </template>
      </el-table-column>
      <el-table-column
        label="需求执行人"
        prop="handlerName"
        width="140"
        show-overflow-tooltip
        v-if="['toReceive', 'executing', 'feedback'].includes(activeTab)"
      >
        <template #default="{ row }">
          <div
            style="
              padding-right: 36px;
              overflow: hidden;
              white-space: nowrap;
              text-overflow: ellipsis;
            "
          >
            <template
              v-if="Array.isArray(row.demandHandlerList) && row.demandHandlerList.length > 0"
            >
              <span v-for="(item, index) in row.demandHandlerList" :key="index">
                {{ item.handlerName }}
                <span v-if="index < row.demandHandlerList.length - 1">、</span>
              </span>
            </template>

            <span v-else-if="row.handlerName">{{ row.handlerName }}</span>
            <span v-else>--</span>
          </div>
        </template>
      </el-table-column>
      <el-table-column
        label="预计完成时间"
        prop="planFinishDate"
        sortable="custom"
        width="150"
        v-if="displayCondition"
      />
      <el-table-column
        label="实际完成时间"
        prop="executionFinishTime"
        sortable="custom"
        width="150"
        v-if="displayCondition"
      />
      <el-table-column label="需求状态" prop="status" width="120">
        <template #default="{ row }">
          <el-tag :type="AuditStatusColorMap[row.status]">{{ row.statusDesc }}</el-tag>
        </template>
      </el-table-column>
      <el-table-column
        label="时间偏移量"
        width="120"
        v-if="['toReceive', 'feedback'].includes(activeTab)"
      >
        <template #default="{ row }">
          <span v-if="row.timeOffSet > 0" style="color: red">延期{{ row.timeOffSet }}天</span>
          <span v-else-if="row.timeOffSet < 0" style="color: green">
            提前{{ Math.abs(row.timeOffSet) }}天
          </span>
          <span v-else>无偏移0天</span>
        </template>
      </el-table-column>
      <el-table-column label="需求累计耗时" width="120" v-if="displayCondition">
        <template #default="{ row }">
          {{ formatDuration(row.totalTime) }}
        </template>
      </el-table-column>
      <el-table-column
        label="报告结论"
        prop="reportConclusion"
        width="200"
        v-if="displayCondition"
        show-overflow-tooltip
      ></el-table-column>
      <el-table-column
        label="用研报告"
        prop="userResearchFile.name"
        width="180"
        fixed="right"
        v-if="['feedback', 'toReceive'].includes(activeTab)"
      >
        <template #default="{ row }">
          <el-tooltip effect="dark" :content="row.userResearchFile?.fileName" placement="top-start">
            <a type="primary" :href="row.userResearchFile?.fileUrl" target="_blank">
              {{ row.userResearchFile?.fileName }}
            </a>
          </el-tooltip>
        </template>
      </el-table-column>
      <el-table-column
        label="预计完成时间"
        prop="planFinishDate"
        width="150"
        sortable="custom"
        v-if="activeTab === 'executing'"
        fixed="right"
      />
      <el-table-column
        label="当前审批人"
        prop="approverNames"
        width="150"
        v-if="activeTab === 'reviewing'"
        fixed="right"
      />
      <template v-if="activeTab === 'rejected'">
        <el-table-column label="审批拒绝人" prop="rejectorName" width="150" />
        <el-table-column
          label="拒绝原因"
          prop="approveRemark"
          width="150"
          fixed="right"
          show-overflow-tooltip
        />
      </template>
    </el-table>
    <KeenPagination
      :current="current"
      :page-size="pageSize"
      :page-size-option="pageSizeOption"
      :total="total"
      @size-change="handlePageSizeChange"
      @current-change="handleCurrentChange"
    />
  </KeenList>
  <FilesPreview
    v-if="previewVisible"
    :fileUrl="fileUrl"
    :fileName="fileName"
    :key="fileUrl"
    :extType="fileName.split('.').pop()"
    @close="previewVisible = false"
  />
  <SurveyFeedback />
</template>

<script lang="ts" setup name="demandSubmitList">
  import useList from '@/views/lute-os/hooks/list/useList';
  import { download } from '@/utils/download';
  import { platformApi, productApi } from '@/api';
  import {
    AuditStatusMap,
    AuditStatusColorMap,
    DemandTypeMap,
    DemandPropertyMap,
  } from '@/views/lute-os/demandManage/constant';
  import { useActiveTab } from '@/views/lute-os/demandManage/composables/useActiveTab';
  import { useStore } from '@/store/modules/useStore';
  import { storeToRefs } from 'pinia';
  import { formatDuration } from '@/views/lute-os/demandManage/utils/timeParams';
  import SurveyFeedback from '../components/SurveyFeedback.vue';
  import DeptMember from '@/views/lute-os/components/DeptMember/index.vue';
  import FilesPreview from '@/views/lute-os/components/FilesPreview/index.vue';
  const router = useRouter();
  const userInfoStore = useStore();
  const { userInfo } = storeToRefs(userInfoStore);
  const displayCondition = computed(() => {
    return (
      activeTab.value !== 'executing' &&
      activeTab.value !== 'reviewing' &&
      activeTab.value !== 'rejected'
    );
  });
  // 1. 排序字段和映射
  const orderFields = [
    { field: 'demand.expect_finish_time', label: 'expectFinishTime' },
    { field: 'demand.create_time', label: 'createTime' },
    { field: 'ur.planStartDate', label: 'planStartDate' },
    { field: 'ur.plan_finish_date', label: 'planFinishDate' },
    { field: 'ur.execution_finish_time', label: 'executionFinishTime' },
  ];
  const { activeTab, tabCountMap, tabPriorityList, fetchTabCounts, initActiveTabWithData } =
    useActiveTab();
  // initActiveTabWithData('submit_list');
  const PAGE_SIZE = 10;
  // 状态映射关系
  const statusMap = {
    feedback: 7, // 待反馈
    toReceive: 6, // 待查收
    executing: 102, // 执行中
    reviewing: 1, // 审批中
    rejected: 2, // 审批未通过
  };
  const {
    search,
    // searchData,
    pagination: {
      total,
      current,
      pageSize,
      handleCurrentChange,
      pageSizeOption,
      handlePageSizeChange,
    },
    listData,
    listLoading,
    refreshList,
    runQuery,
    resetSearch,
    // selectedKeys,
  } = useList({
    searchDefaults: {
      submitManageFlag: 0,
      demandModule: 'user_research',
      menuTag: 'submit_list',
      keyword: '',
      creator: '',
      skuCode: '',
      productLine: '',
      categoryCode: '',
      demandType: '',
      demandProperty: '',
      demandHandlerList: [],
      delayFlag: '',
      orderField: '',
      status: statusMap[activeTab.value],
      orderBy: '',
      orderType: '',
    },
    // eslint-disable-next-line no-shadow
    // interceptSearchData: (searchData) => searchData,
    pageSize: PAGE_SIZE,
    service: platformApi.platformDemandV2List,
  });

  function onSortChange({ prop, order }) {
    const found = orderFields.find((f) => f.label === prop);
    if (found) {
      search.orderField = found.field;
      search.orderType = order === 'ascending' ? 'asc' : order === 'descending' ? 'desc' : '';
    } else {
      search.orderField = '';
      search.orderType = '';
    }
  }
  const reset = () => {
    resetSearch();
    search.status = statusMap[activeTab.value];
  };
  function goToDetail(code: string, from: 'submit' | 'execute' = 'submit') {
    router.push({
      path: `/demand/detail/${code}`,
      query: { from: 'submitMyDemand', tab: activeTab.value },
    });
  }
  const fileUrl = ref('');
  const fileName = ref('');
  const previewVisible = ref(false);
  async function handleFileClick(file) {
    if (!file) return;
    if (file.previewWay === 2) {
      // 跳转外链
      window.open(file.fileUrl, '_blank');
    } else {
      // 内部文件，预览
      fileUrl.value = file.fileUrl;
      fileName.value = file.fileName;
      previewVisible.value = true;
    }
  }

  const categoryOptions = ref<any[]>([]);
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
  onMounted(() => {
    getCategoryData();
  });
  onBeforeRouteLeave((to, from, next) => {
    sessionStorage.setItem(`lastActiveTab_submitMyDemand`, activeTab.value);
    next();
  });
  onActivated(async () => {
    fetchTabCounts('submit_list');
    const pageKey = 'submitMyDemand';
    if (sessionStorage.getItem(`backFromDetail_${pageKey}`) === '1') {
      sessionStorage.removeItem(`backFromDetail_${pageKey}`);
      activeTab.value = sessionStorage.getItem(`lastActiveTab_${pageKey}`);
      if (!activeTab.value) {
        initActiveTabWithData('submit_list');
      }
      fetchTabCounts('submit_list');
      return;
    }
    search.orderField = '';
    search.orderType = '';
    initActiveTabWithData('submit_list');
    fetchTabCounts('submit_list');
  });
  watch(activeTab, (newTab) => {
    search.status = statusMap[newTab];
    search.orderField = '';
    search.orderType = '';
    fetchTabCounts('submit_list');
    // runQuery();
  });
  // watch(search, runQuery, { deep: true })
</script>

<style lang="scss" scoped>
  @import url('@/views/lute-os/demandManage/style.css');
</style>
