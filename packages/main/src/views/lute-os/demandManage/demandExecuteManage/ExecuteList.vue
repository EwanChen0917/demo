<template>
  <el-tabs v-model="activeTab">
    <el-tab-pane
      v-for="tab in demandExecuteTabList"
      :key="tab.key"
      :label="`${tab.label}（${tabCountMap[tab.key] || 0}）`"
      :name="tab.key"
    />
  </el-tabs>

  <KeenList :selected-num="0" :selected-list="[]" @resetSearch="reset" @refresh="refreshList">
    <template #search>
      <el-input v-model="search.keyword" placeholder="需求标题/需求内容" clearable />
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
        style="width: 210px"
        v-if="activeTab !== 'notApproved' && activeTab !== 'reviewing'"
        v-model="search.demandHandlerList"
        placeholder="需求执行人"
        multiple
        collapse-tags
        max-collapse-tags="1"
        teleported
      />
      <el-select
        v-model="search.delayFlag"
        placeholder="是否延期"
        clearable
        v-if="!['executing', 'approving', 'notApproved', 'reviewing'].includes(activeTab)"
      >
        <el-option label="是" :value="1" />
        <el-option label="否" :value="0" />
      </el-select>
      <el-select
        v-model="search.implementFlag"
        placeholder="是否落地"
        clearable
        v-if="!['executing', 'approving', 'notApproved', 'reviewing'].includes(activeTab)"
      >
        <el-option label="是" :value="1" />
        <el-option label="否" :value="0" />
      </el-select>
      <el-select
        v-model="search.lowScoreFlag"
        placeholder="是否低于85分"
        clearable
        v-if="activeTab === 'completed'"
      >
        <el-option label="是" :value="1" />
        <el-option label="否" :value="0" />
      </el-select>
    </template>
    <!-- KeenList 内部会自动提供查询和重置按钮，如果您需要额外的按钮，可以放在 #buttons 插槽中 -->
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
      <el-table-column
        label="需求附件"
        prop="demandFile.fileName"
        width="180"
        v-if="activeTab === 'notApproved'"
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
      <el-table-column label="需求类型" prop="demandTypeDesc" width="140">
        <template #default="{ row }">
          <span>{{ DemandTypeMap[row.demandType] || '--' }}</span>
        </template>
      </el-table-column>
      <el-table-column label="需求属性" prop="demandPropertyDesc" width="140">
        <template #default="{ row }">
          <span>{{ DemandPropertyMap[row.demandProperty] || '--' }}</span>
        </template>
      </el-table-column>
      <el-table-column
        label="需求执行人"
        prop="handlerName"
        width="140"
        v-if="activeTab !== 'notApproved' && activeTab !== 'reviewing'"
        show-overflow-tooltip
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
        width="150"
        v-if="activeTab !== 'notApproved' && activeTab !== 'reviewing'"
        sortable="custom"
      />
      <el-table-column
        label="当前审批人"
        prop="approverNames"
        width="150"
        v-if="activeTab === 'reviewing'"
        fixed="right"
      />
      <el-table-column
        label="需求附件"
        prop="demandFile.fileName"
        width="180"
        v-if="activeTab === 'reviewing'"
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
        label="需求状态"
        prop="status"
        width="120"
        v-if="activeTab === 'executing' || activeTab === 'reviewing'"
      >
        <template #default="{ row }">
          <el-tag :type="AuditStatusColorMap[row.status]">{{ row.statusDesc }}</el-tag>
        </template>
      </el-table-column>
      <el-table-column
        label="用研附件"
        prop="userResearchFile.name"
        width="180"
        v-if="activeTab !== 'reviewing' && activeTab !== 'notApproved'"
      >
        <template #default="{ row }">
          <el-tooltip effect="dark" :content="row.userResearchFile?.fileName" placement="top-start">
            <a
              type="primary"
              href="javascript:void(0);"
              @click="handleFileClick(row.userResearchFile)"
              style="cursor: pointer; color: #3e97ff"
            >
              {{ row.userResearchFile?.fileName }}
            </a>
          </el-tooltip>
        </template>
      </el-table-column>
      <!-- completed / toReceive 专属 -->
      <template v-if="['completed'].includes(activeTab)">
        <el-table-column
          label="实际完成时间"
          prop="executionFinishTime"
          width="150"
          sortable="custom"
        />
        <el-table-column label="需求状态" prop="status" width="120">
          <template #default="{ row }">
            <el-tag :type="AuditStatusColorMap[row.status]">{{ row.statusDesc }}</el-tag>
          </template>
        </el-table-column>
        <el-table-column label="时间偏移量" width="120">
          <template #default="{ row }">
            <span v-if="row.timeOffSet > 0" style="color: red">延期{{ row.timeOffSet }}天</span>
            <span v-else-if="row.timeOffSet < 0" style="color: green">
              提前{{ Math.abs(row.timeOffSet) }}天
            </span>
            <span v-else style="color: green">无偏移0天</span>
          </template>
        </el-table-column>
        <el-table-column label="需求累计耗时" width="120">
          <template #default="{ row }">
            {{ formatDuration(row.totalTime) }}
          </template>
        </el-table-column>
        <el-table-column label="需求方评分" prop="score" width="120" />
        <el-table-column label="是否落地" prop="implementFlag" width="120">
          <template #default="{ row }">
            <span>{{ row.implementFlag === 1 ? '是' : '否' }}</span>
          </template>
        </el-table-column>
      </template>
      <el-table-column
        label="预计完成时间"
        prop="planFinishDate"
        width="150"
        v-if="activeTab === 'notApproved'"
        sortable="custom"
      />
      <el-table-column
        label="报告结论"
        prop="reportConclusion"
        width="200"
        show-overflow-tooltip
        v-if="activeTab !== 'notApproved' && activeTab !== 'reviewing'"
      ></el-table-column>
      <template v-if="activeTab === 'notApproved'">
        <el-table-column label="用研附件" prop="userResearchFile.name" width="180">
          <template #default="{ row }">
            <el-tooltip
              effect="dark"
              :content="row.userResearchFile?.fileName"
              placement="top-start"
            >
              <a
                type="primary"
                href="javascript:void(0);"
                @click="handleFileClick(row.userResearchFile)"
                style="cursor: pointer; color: #3e97ff"
              >
                {{ row.userResearchFile?.fileName }}
              </a>
            </el-tooltip>
          </template>
        </el-table-column>
        <el-table-column
          label="需求状态"
          prop="status"
          width="120"
          v-if="activeTab === 'notApproved'"
        >
          <template #default="{ row }">
            <el-tag :type="AuditStatusColorMap[row.status]">{{ row.statusDesc }}</el-tag>
          </template>
        </el-table-column>
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
    ref="filesPreviewRef"
    :fileUrl="fileUrl"
    :key="fileUrl"
    :fileName="fileName"
    :extType="fileName.split('.').pop()"
    @close="previewVisible = false"
  />
  <SurveyFeedback />
</template>

<script lang="ts" setup name="demandExecuteList">
  import useList from '@/views/lute-os/hooks/list/useList';
  import { download } from '@/utils/download';
  import { platformApi, productApi } from '@/api';
  import DeptMember from '@/views/lute-os/components/DeptMember/index.vue';
  import FilesPreview from '@/views/lute-os/components/FilesPreview/index.vue';
  import {
    AuditStatusMap,
    AuditStatusColorMap,
    DemandTypeMap,
    DemandPropertyMap,
  } from '@/views/lute-os/demandManage/constant';
  import SkuSelectFormItem from '@/views/lute-os/demandManage/components/common/skuSelectFormItem.vue';
  import { demandExecuteTabList } from '@/views/lute-os/demandManage/composables/useActiveTab';
  import { useActiveTab } from '@/views/lute-os/demandManage/composables/useActiveTab';
  import { useStore } from '@/store/modules/useStore';
  import { storeToRefs } from 'pinia';
  import { formatDuration } from '@/views/lute-os/demandManage/utils/timeParams';
  import SurveyFeedback from '@/views/lute-os/demandManage/components/SurveyFeedback.vue';
  // const activeTab = ref('completed');
  const router = useRouter();
  const userInfoStore = useStore();
  const { userInfo } = storeToRefs(userInfoStore);
  const { activeTab, tabCountMap, fetchExecuteTabCounts } = useActiveTab();
  // 状态映射关系
  const statusMap = {
    completed: 101, // 已完结
    executing: 3, // 执行中
    reviewing: 1, // 内审中
    notApproved: 5, // 内审未通过
  };
  const PAGE_SIZE = 10;
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
    resetSearch,
    // selectedKeys,
  } = useList({
    searchDefaults: {
      submitManageFlag: 1,
      demandModule: 'user_research',
      menuTag: 'execute_list',
      keyword: '',
      creator: '',
      skuCode: '',
      productLine: '',
      categoryCode: '',
      demandType: '',
      demandProperty: '',
      demandHandlerList: [],
      delayFlag: '',
      implementFlag: '',
      lowScoreFlag: '',
      status: statusMap[activeTab.value],
      orderField: '',
      orderType: '',
    },
    // eslint-disable-next-line no-shadow
    // interceptSearchData: (searchData) => searchData,
    pageSize: PAGE_SIZE,
    service: platformApi.platformDemandV2List,
  });
  function goToDetail(code: string) {
    router.push({
      path: `/demand/detail/${code}`,
      query: { from: 'executeList' },
    });
  }
  const fileUrl = ref('');
  const fileName = ref('');
  const previewVisible = ref(false);
  function handleFileClick(file) {
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
  const reset = () => {
    resetSearch();
    search.status = statusMap[activeTab.value];
  };
  const orderFields = [
    { field: 'demand.expect_finish_time', label: 'expectFinishTime' },
    { field: 'demand.create_time', label: 'createTime' },
    { field: 'ur.planStartDate', label: 'planStartDate' },
    { field: 'ur.plan_finish_date', label: 'planFinishDate' },
    { field: 'ur.execution_finish_time', label: 'executionFinishTime' },
  ];
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
    sessionStorage.setItem(`lastActiveTab_executeList`, activeTab.value);
    next();
  });
  onActivated(() => {
    const pageKey = 'executeList';
    if (sessionStorage.getItem(`backFromDetail_${pageKey}`) === '1') {
      sessionStorage.removeItem(`backFromDetail_${pageKey}`);
      activeTab.value = sessionStorage.getItem(`lastActiveTab_${pageKey}`) || 'completed';
      return;
    }
    activeTab.value = 'completed';
    search.orderField = '';
    search.orderType = '';
    fetchExecuteTabCounts('execute_list');
  });

  watch(
    activeTab,
    (val) => {
      search.status = statusMap[val];
      fetchExecuteTabCounts('execute_list');
    },
    { immediate: true }
  );
</script>

<style lang="scss" scoped>
  @import url('@/views/lute-os/demandManage/style.css');
</style>
